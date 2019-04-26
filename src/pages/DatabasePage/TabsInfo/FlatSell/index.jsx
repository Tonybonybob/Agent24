import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import Comments from '../../../../components/common/Comments';
import Additional from '../../AdditionalInfo/FlatSell';
import Characteristics from '../../CharacteristicsInfo/FlatSell';
import Tabs from '../../../../components/common/Tabs';
import Tooltip from '../../../../components/common/Tooltip';
import Info from '../../../../assets/Info';
import { withSizes } from '../../../../utils';
import './style.scss';
class FlatSellInfoTabs extends Component {
  static propTypes = {
    object: PropTypes.shape({
      owner: PropTypes.string,
    }).isRequired,
    isDesktop: PropTypes.bool.isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isDesktop && state.activeInfoTab === 3) {
      return {
        activeInfoTab: 2,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      activeInfoTab: 0,
    };

    this.handleMessageSend = this.handleMessageSend.bind(this);
  }


  handleMessageSend(name, value) {
    console.log(name);
    console.log(value);
  }

  render() {
    const { activeInfoTab } = this.state;

    const {
      object, isDesktop, comment, communityComment, setCommentValue, isTablet,
      objectDatabase
    } = this.props;


    const infoLinks = [
      {
        label: 'Описание',
        value: 'description',
      },
      {
        label: 'Доп. параметры',
        value: 'additional',
      },
    ];

    const infoContent = [
      <div className="objectInfoTextTabs__description objectDescription">
        <div>
          <Tooltip
            text="Очень важная подсказка"
          />
        </div>
        {object.description}
      </div>,
      <div className="objectInfoTextTabs__additional objectAdditional">
        <Additional additional={object.extra} />
      </div>,
    ];
    if (!isDesktop) {
      infoLinks.push(
        {
          value: 'CommunityMessages',
          label: 'Комментарии сообщества',
        },
        {
          value: 'messages',
          label: 'Аккаунта',
        },
      );
      infoContent.push(
        <div className="objectInfoMessages__messages">
          <Comments
            comments={object.communityComments}
            setCommentValue={setCommentValue}
            global
            isClient={false}
            fieldName="communityComment"
          />
        </div>,
        <div className="objectInfoMessages__messages">
          <Comments
            comments={object.groupComments}
            setCommentValue={setCommentValue}
            isClient={false}
            global={false}
            fieldName="comment"
          />
        </div>,
      );
    }
    if (isTablet) {
      infoLinks.unshift({
        label: 'Характеристики',
        value: 'characteristrics',
      });
      infoContent.unshift(
        <div className="objectInfoTextTabs__characteristics objectCharacteristics">
          <Characteristics objectDatabase={objectDatabase} object={object} />
        </div>,
      );
    }

    return (
      <div className="objectInfoTextTabs">
        <Tabs
          activeTab={activeInfoTab}
          fullWidth={false}
          change={(event, value) => this.setState({ activeInfoTab: value })}
          navLinks={infoLinks}
        />
        <div className="objectInfoTextTabs__tabContent objectCharacteristics">
          {infoContent[activeInfoTab]}
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('ObjectInfoCommentsForm');

const mapStateToProps = state => ({
  comment: selector(state, 'comment'),
  communityComment: selector(state, 'communityComment'),
});

export default compose(
  connect(mapStateToProps),
  withSizes,
)(FlatSellInfoTabs);
