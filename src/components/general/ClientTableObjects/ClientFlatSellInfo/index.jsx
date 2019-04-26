import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { Button } from '../../Button';
import Tabs from '../../../common/Tabs';
import Tooltip from '../../../common/Tooltip';
// import Photos from '../../../../pages/DatabasePage/Photos';
import CharacteristicsInfo from '../../../../pages/DatabasePage/CharacteristicsInfo/FlatSell';
import AdditionalInfo from '../../../../pages/DatabasePage/AdditionalInfo/FlatSell';
import CommonComments from '../../../common/Comments';
import Comments from '../../../../pages/DatabasePage/Messages';
import SelectButton from '../../../common/SelectButton';
import IconClose from '../../../../assets/ArrowDownStroke';
import IconBurn from '../../../../assets/Burn';
// import Slider from '../../../../pages/DatabasePage/DatabaseSlider';
import IconEdit from '../../../../assets/Pencil';
import Gallery from '../../../common/Gallery';
import LinkToModal from '../../../common/LinkToModal';
import { setCommentFormValueAction, clientLoadObjectItemDatabase } from '../../../../store/actions/client';
import { getFullObject } from '../../../../store/reducers/client';
import { addModalFieldAction } from '../../../../store/actions/modal';
import { withSizes } from '../../../../utils';
import DefaultAvatar from '../../../../assets/DefaultAvatar';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class ClientFlatSellInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };

    this.infoLinks = [
      { label: 'Описание', value: 'description' },
      { label: 'Доп. параметры', value: 'additional' },
      { label: 'Совладельцы', value: 'coowners' },
    ];

    this.moreButtonOptions = [
      { value: 'realtor', label: 'ЭТО РИЕЛТОР', className: 'customOption', onClick: () => console.log('это риелтор') },
      { value: 'error', label: 'ОШИБКА', className: 'customOption customOption_borderBottom', onClick: () => console.log('ошибка') },
      { value: 'setView', label: 'НАЗНАЧИТЬ ПРОСМОТР', className: 'customOption', onClick: () => console.log('назначить просмотр') },
      { value: 'suggestExclusive', label: 'ПРЕДЛОЖИТЬ ЭКСК', className: 'customOption', onClick: () => console.log('предложить экск') },
      { value: 'viewThroughAN', label: 'ПОКАЗ ЧЕРЕЗ АН', className: 'customOption', onClick: () => console.log('показ через ан') },
    ];

    this.historyButtonOptions = [
      { value: 'impacts', label: 'ВОЗДЕЙСТВИЙ', className: 'customOption', onClick: () => console.log('вогздействий') },
      { value: 'changes', label: 'ИЗМЕНЕНИЙ', className: 'customOption', onClick: () => console.log('изменений') },
    ];

    this.closeSell = this.closeSell.bind(this);
    this.editSell = this.editSell.bind(this);
  }

  componentDidMount() {
    const { loadFullObject, id, isTablet, match } = this.props;

    loadFullObject(id || match.params.id);

    const isNewOrEditRequest = ['new', 'edit'].includes(match.params.id);

    if (!isTablet && !isNewOrEditRequest) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidUpdate(prevProps) {
    const {
      loadFullObject, id, object, addModalField, isTablet,
    } = this.props;
    console.log('clientFlatSellInfo');

    if (id !== prevProps.id) {
      loadFullObject(id);
    }
    if (object.id !== prevProps.object.id) {
      addModalField({
        contactId: object.contactId,
        objectId: object.id,
        objectType: object.type.toLowerCase(),
      });
    }

    if (prevProps.isTablet && !isTablet) {
      document.body.style.overflow = 'hidden';
    } else if (!prevProps.isTablet && isTablet) {
      document.body.style.overflow = '';
    }
  }

  componentWillUnmount() {
    const { isTablet } = this.props;

    if (!isTablet) {
      document.body.style.overflow = '';
    }
  }

  closeSell() {
    const { history, location } = this.props;

    const path = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/');

    history.push(path);
  }

  editSell() {
    const { history, location } = this.props;

    const path = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/');

    history.push(`${path}/edit`);
  }

  renderDescription() {
    const { object } = this.props;

    return (
      <div className="d-flex">
        <div>
          <Tooltip
            text="Очень важная подсказка"
          />
        </div>
        <p>
          {object.description}
        </p>
      </div>
    );
  }

  renderCoOwners() {
    const { object } = this.props;

    const tempArr = [1, 2, 3];
    return (
      <ul className="clientSellInfoOwners">
        {tempArr.map(() => (
          <li className="clientSellInfoOwners__peopleItem">
            <img className="clientSellInfoOwners__photo" src="http://api.agent24.pro/fupload/tmp/ec32495a1ad749d51ffd09926b651ac0" alt="" />
            <div className="clientSellInfoOwners__content">
              <div className="clientSellInfoOwners__firstline">
                <span className="clientSellInfoOwners__name">
                  Molly
                </span>
                <span className="clientSellInfoOwners__id">
                  #2456
                </span>
              </div>
              <div className="clientSellInfoOwners__phone">
                +38067435456
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  renderComments(fieldName) {
    const { object, setCommentValue } = this.props;

    if (fieldName) {
      return (
        <CommonComments
          isClient
          global={fieldName === 'communityComment'}
          comments={fieldName === 'communityComment' ? object.communityComments : object.groupComments}
          setCommentValue={setCommentValue}
          fieldName={fieldName || null}
        />
      );
    }
    return (
      <Comments
        isClient
        communityMessages={object.communityComments}
        messages={object.groupComments}
        setCommentValue={setCommentValue}
        fieldName={fieldName || null}
      />
    );
  }

  render() {
    const { activeTab } = this.state;
    const { object, setCommentValue, isTablet } = this.props;

    // const fakeImages = [
    //   'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg',
    //   'data:image/jpeg;base64,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',
    //   'data:image/jpeg;base64,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',
    //   'https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg',
    // ];
    const infoLinks = isTablet
      ? this.infoLinks
      : [
        ...this.infoLinks,
        { label: 'Коментарии сообщества', value: 'communityComments' },
        { label: 'Коментарии аккаунта', value: 'groupComments' },
      ];

    const date = moment(object.createdDate, 'YYYY-MM-DD HH:mm').format('DD MMM YYYY');
    return (
      <div className="clientSellInfo">
        {!isTablet && (
          <div className="clientSellInfo__mobileHeader">
            <div className="clientSellInfo__mobileCloseButton" onClick={this.closeSell}>
              <IconClose />
              <span>
                Назад
              </span>
            </div>
          </div>
        )}
        <div className="clientSellInfo__innerHolder">
          {!isTablet && (
            <div className="clientSellInfo__clientInfo">
              <div className="clientSellInfo__clientPhoto">
                <DefaultAvatar />
              </div>
              <div className="clientSellInfo__clientContent">
                <div className="clientSellInfo__clientFirstLine">
                  <span className="clientSellInfo__clientName">
                    Валентин
                  </span>
                  <span className="clientSellInfo__clientPhone">
                    {object.phones && object.phones[0].phone}
                  </span>
                </div>
                <div className="clientSellInfo__clientSecondLine">
                  {object.sourceInfo && object.sourceInfo}
                </div>
              </div>
            </div>
          )}
          <div className="clientSellInfo__section clientSellInfo_photos">
            <Gallery images={object && object.photos ? object.photos.map(el => el.photoId) : []} />
          </div>
          <div className="clientSellInfo__section clientSellMainInfo">
            {isTablet && (
              <Fragment>
                <h2 className="clientSellMainInfo__title">
                  Продажа
                  {' '}
                  {object.status === 'BURNING' && <IconBurn />}
                </h2>
                <div className="clientSellMainInfo__date">
                  #235436 от
                  {' '}
                  {date}
                </div>
              </Fragment>
            )}
            <CharacteristicsInfo object={object} />
          </div>
          {isTablet && (
            <div className="clientSellInfo__section clientSellInfo_comments">
              {this.renderComments()}
            </div>
          )}
          <div className="clientSellInfo__section clientSellInfo_addInfo">
            <Tabs
              activeTab={activeTab}
              fullWidth={false}
              change={(event, value) => this.setState({ activeTab: value })}
              navLinks={infoLinks}
            />
            {activeTab === 0 && this.renderDescription()}
            {activeTab === 1 && <AdditionalInfo additional={object.extra} />}
            {activeTab === 2 && this.renderCoOwners()}
            {!isTablet && (
              <Fragment>
                {activeTab === 3 && this.renderComments('communityComment')}
                {activeTab === 4 && this.renderComments('comment')}
              </Fragment>
            )}
          </div>
          <div className="clientSellInfo__section clientSellInfo_buttons">
            <Button full size="small" buttonType="secondary" className="clientSellInfo_buttonsItem">
              АВТОПОИСК
            </Button>
            <SelectButton
              className="clientSellInfo_selectButton"
              options={this.historyButtonOptions}
              placeholder="ИСТОРИЯ"
            />
          </div>
          <div className="clientSellInfo__section clientSellInfo_buttons">
            {isTablet && (
              <LinkToModal queryParam="realtorClosed" className="clientSellInfo_buttonsItem">
                <Button full size="small" buttonType="secondary">
                  ЗАКРЫТЬ
                </Button>
              </LinkToModal>
            )}
            <SelectButton
              className="clientSellInfo_selectButton"
              options={this.moreButtonOptions}
              placeholder="ЕЩЕ"
            />
          </div>
          {isTablet && (
            <Fragment>
              <div className="clientSellInfo__edit" onClick={this.editSell}>
                <IconEdit />
              </div>
              <div className="clientSellInfo__close" onClick={this.closeSell}>
                <IconClose />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

ClientFlatSellInfo.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number,
  }),
  handleChangeSliderIndex: PropTypes.func.isRequired,
  handleOpenSlider: PropTypes.func.isRequired,
  currentSlideIndex: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.func,
  }).isRequired,
  setCommentValue: PropTypes.func.isRequired,
  handleCloseSlider: PropTypes.func.isRequired,
  isSliderOpen: PropTypes.bool.isRequired,
  loadFullObject: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

ClientFlatSellInfo.defaultProps = {
  object: {},
};

const mapStateToProps = state => ({
  object: getFullObject(state),
});

const mapDispatchToProps = dispatch => ({
  setCommentValue: data => dispatch(setCommentFormValueAction(data)),
  loadFullObject: id => dispatch(clientLoadObjectItemDatabase(id)),
  addModalField: data => dispatch(addModalFieldAction(data)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'ClientsObjectInfoCommentsForm',
  }),
  withSizes,
)(ClientFlatSellInfo);
