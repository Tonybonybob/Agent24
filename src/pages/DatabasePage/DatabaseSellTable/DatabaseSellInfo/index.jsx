import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { getFullObject } from '../../../../store/reducers/database';
import {
  getFullObjectAsyncAction,
  setObjectLabelAsyncAction,
  setCommentFormValueAction,
} from '../../../../store/actions/database';
import { addModalFieldAction } from '../../../../store/actions/modal';
import { normalizeDate } from '../../../../utils/databaseToText';
import Slider from '../../DatabaseSlider';
import { withSizes } from '../../../../utils';
import ArrowBack from '../../../../assets/ArrowBack';
import { Button } from '../../../../components/general/Button';
import LinkToModal from '../../../../components/common/LinkToModal';
import Gallery from '../../../../components/common/Gallery';
import Characteristics from '../../CharacteristicsInfo/FlatSell';
import Messages from '../../Messages';
import ObjectInfoTabs from '../../TabsInfo/FlatSell';
import IconClose from '../../../../assets/ArrowDownStroke';
import SelectButton from '../../../../components/common/SelectButton';
import './style.scss';
moment.locale('ru');

const turnToNumber = number =>
  `${number.slice(0, 4)} ${number.slice(4, 6)} ${number.slice(
    6,
    9
  )} ${number.slice(7)}`;

class DatabaseObjectInfo extends Component {
  static propTypes = {
    object: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    getFullObject: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.handleSetLabel = this.handleSetLabel.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);

    this.moreButtonOptions = [
      {
        value: 'realtor',
        label: 'ЭТО РИЕЛТОР',
        className: 'customOption',
        isLink: true,
        to: 'realtorIsRealtor',
      },
      {
        value: 'error',
        label: 'ОШИБКА',
        className: 'customOption customOption_borderBottom',
        isLink: true,
        to: 'realtorError',
      },
      {
        value: 'setView',
        label: 'НАЗНАЧИТЬ ПРОСМОТР',
        className: 'customOption',
        isLink: true,
        to: 'realtorClosed',
      },
    ];
  }

  componentDidMount() {
    const {
      getFullObject,
      match,
      isTablet,
      addModalField,
      contactId,
    } = this.props;

    addModalField({
      contactId,
      objectId: match.params.id,
      objectType: 'flat',
    });

    if (!isTablet) {
      document.body.style.overflow = 'hidden';
    }

    getFullObject(match.params.id);

    this.setState({
      isActive: true,
    });
  }

  componentDidUpdate(prevProps) {
    const { isTablet } = this.props;

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

  handleSetLabel(event) {
    const { setLabel, object } = this.props;

    const label = event.target.getAttribute('data-label');

    setLabel({ id: object.id, label });
  }

  handleGoBack() {
    const { location, history } = this.props;
    history.push({
      pathname: '/database',
      search: location.search,
    });
  }

  render() {
    const {
      isTablet,
      isSliderOpen,
      currentSlideIndex,
      handleCloseSlider,
      handleChangeSliderIndex,
      object,
      setCommentValue,
      isMobile,
    } = this.props;

    const { isActive } = this.state;

    return (
      <Fragment>
        {isSliderOpen && (
          <Slider
            images={object.photos}
            close={handleCloseSlider}
            index={currentSlideIndex}
            click={handleChangeSliderIndex}
          />
        )}
        {object && (
          <div className="objectInfo__wrapper">
            <div
              className={`objectInfo ${isActive ? 'objectInfo__active' : ''}`}
            >
              {!isTablet && (
                <div className="objectInfo__goBack" onClick={this.handleGoBack}>
                  <ArrowBack />
                  <span style={{ marginLeft: '5px' }}>Назад</span>
                </div>
              )}
              <div className="objectInfo__owner ownerInfo">
                <div className="ownerInfo__photo">
                  {object.image ? (
                    <img
                      alt="owner"
                      src={object.image}
                      className="ownerInfo__photo"
                    />
                  ) : (
                    <img
                      height="40"
                      width="40"
                      src="https://randomuser.me/api/portraits/men/52.jpg"
                    />
                  )}
                </div>
                <div className="ownerInfo__description">
                  <div>
                    {object.name && (
                      <span className="ownerInfo__name">
                        {object.name.split(' ')[0]}
                      </span>
                    )}
                    <span className="ownerInfo__phone">
                      {turnToNumber(object.phones[0].phone)}
                    </span>
                  </div>
                  <span className="ownerInfo__role">
                    {!isMobile
                      ? `Источник: ${object.sourceInfo}`
                      : object.phones[1] &&
                        turnToNumber(object.phones[1].phone)}
                  </span>
                </div>
                {isMobile && (
                  <div className="ownerInfo__source">
                    Источник: {object.sourceInfo}
                  </div>
                )}
              </div>
              <div className="ownerInfo__close" onClick={this.handleGoBack}>
                <IconClose />
              </div>
              <div className="objectInfo__content">
                <div className="objectInfo__images">
                  {/* <Photos images={object.photos} openSlider={handleOpenSlider} slideChange={handleChangeSliderIndex} slideIndex={currentSlideIndex} /> */}
                  <Gallery
                    images={object.photos.map(photo => photo.photoId) || []}
                  />
                  <span className="objectInfo__id">
                    #{object.id}
                    &nbsp; от &nbsp;
                    {normalizeDate(object.createdDate) +
                      ' ' +
                      moment(object.createdDate).format('YYYY')}
                  </span>
                  {isTablet && (
                    <div className="objectInfo__buttons">
                      <div className="objectInfo__button">
                        <Link
                          to={`/client/${object.contactId}/requests/${
                            object.id
                          }`}
                        >
                          <Button full size="small" buttonType="secondary">
                            карточка объекта
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {!isTablet && (
                  <div className="objectInfo__characteristics">
                    <Characteristics object={object} objectDatabase />
                  </div>
                )}
                <div className="objectInfo__text objectInfoText">
                  <ObjectInfoTabs
                    object={object}
                    objectDatabase
                    setCommentValue={setCommentValue}
                  />
                  <div className="objectInfo__buttons">
                    {!isTablet ? (
                      <Fragment>
                        <div className="objectInfo__button">
                          <Link
                            to={`/client/${object.contactId}/requests/${
                              object.id
                            }`}
                          >
                            <Button full size="small" buttonType="secondary">
                              карточка объекта
                            </Button>
                          </Link>
                        </div>
                        <SelectButton
                          className="clientSellInfo_selectButton"
                          options={this.moreButtonOptions}
                          placeholder="ЕЩЕ"
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="objectInfo__button">
                          <LinkToModal queryParam="realtorError">
                            <Button full size="small" buttonType="secondary">
                              ОШИБКА
                            </Button>
                          </LinkToModal>
                        </div>
                        <div className="objectInfo__button">
                          <LinkToModal queryParam="realtorIsRealtor">
                            <Button full size="small" buttonType="secondary">
                              ЭТО РИЕЛТОР
                            </Button>
                          </LinkToModal>
                        </div>
                        <div className="objectInfo__button objectInfo__button_last">
                          <LinkToModal queryParam="realtorClosed">
                            <Button full size="small" buttonType="secondary">
                              ЗАКРЫТь
                            </Button>
                          </LinkToModal>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
                <div className="objectInfo__messages objectInfoMessages">
                  <Messages
                    communityMessages={object.communityComments}
                    messages={object.groupComments}
                    setCommentValue={setCommentValue}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  object: getFullObject(state),
});

const mapDispatchToProps = dispatch => ({
  getFullObject: id => dispatch(getFullObjectAsyncAction(id)),
  setLabel: data => dispatch(setObjectLabelAsyncAction(data)),
  setCommentValue: data => dispatch(setCommentFormValueAction(data)),
  addModalField: data => dispatch(addModalFieldAction(data)),
});

export default compose(
  withRouter,
  withSizes,
  reduxForm({
    form: 'ObjectInfoCommentsForm',
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DatabaseObjectInfo);
