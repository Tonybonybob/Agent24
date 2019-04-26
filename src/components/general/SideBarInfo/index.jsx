import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import DefaultAvatar from '../../../assets/DefaultAvatar';
import ViberIcon from '../../../assets/Viber';
import TelegramIcon from '../../../assets/Telegram';
import WhatsappIcon from '../../../assets/Whatsapp';
import PlusIcon from '../../../assets/Plus';
import TriangleIcon from '../../../assets/Triangle';
import ExtendInfoIcon from '../../../assets/ExtendInfo';
import ArrowDownIcon from '../../../assets/ArrowDownStroke';
import PencilIcon from '../../../assets/Pencil';
import EmailIcon from '../../../assets/Email';
import FacebookIcon from '../../../assets/Facebook';
import InstagramIcon from '../../../assets/Instagram';
import LocationIcon from '../../../assets/Location';
import ClientRequests from '../ClientRequests';
import SmallPersonBlock from '../SmallPersonBlock';
import { withSizes } from '../../../utils';
import TypeCard from './TypeCard';
import './style.scss';
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlocked: false,
      showRepresentatives: false,
      showMobileMore: false,
    };
  }

  renderPeople() {
    const people = [
      {
        img: 'https://randomuser.me/api/portraits/men/52.jpg',
        name: 'Константин',
        id: '#1232',
        phone: '+380 50 123 4567',
      },
    ];

    return people.map(person => (
      <li key={person.img}>
        <SmallPersonBlock person={person} />
      </li>
    ));
  }

  renderDrops() {
    const { showBlocked, showRepresentatives } = this.state;

    const drops = [
      {
        title: 'В черном списке у (2)',
        className: showBlocked ? 'sidebarDrop__button_opened' : '',
        isShown: showBlocked,
        toggle: () => this.setState({ showBlocked: !showBlocked }),
      },
      {
        title: 'Представители (2)',
        className: showRepresentatives ? 'sidebarDrop__button_opened' : '',
        isShown: showRepresentatives,
        toggle: () =>
          this.setState({ showRepresentatives: !showRepresentatives }),
      },
    ];
    return drops.map((drop, index) => (
      <Fragment key={index}>
        <hr className="sidebar__divider" />
        <div className="sidebarDrop">
          <div
            className={`sidebarDrop__button ${drop.className}`}
            onClick={drop.toggle}
          >
            <span>{drop.title}</span>
            <TriangleIcon />
          </div>
          {drop.isShown && (
            <ul className="sidebarDrop__people">
              {this.renderPeople()}
              <li className="sidebarDrop__add">
                <PlusIcon />
              </li>
            </ul>
          )}
        </div>
      </Fragment>
    ));
  }

  renderSlidingContent() {
    const { user, isDesktop, profileType } = this.props;
    console.log(user, profileType);
    return (
      <Fragment>
        <ul className="sidebar__phones">
          <li className="sidebar__phoneItem">
            <span>{user.phone}</span>
            <div className="sidebar__social">
              {user.isViber && <ViberIcon />}
              {user.isTelegram && <TelegramIcon />}
              {user.WhatsApp && <WhatsappIcon />}
            </div>
          </li>
          {user.phones.map(phone => (
            <Fragment key={phone}>
              <li className="sidebar__phoneItem">
                <span>{phone.phone}</span>
                <div className="sidebar__social">
                  {phone.isViber && <ViberIcon />}
                  {phone.isTelegram && <TelegramIcon />}
                  {phone.WhatsApp && <WhatsappIcon />}
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
        <div className="sidebar__networks">
          <div className="sidebar__networkItem">
            <EmailIcon />
            {user.email}
          </div>
          <div className="sidebar__networkItem">
            <FacebookIcon />
            /100000724357133
          </div>
          <div className="sidebar__networkItem">
            <InstagramIcon />
            @ilya_zdorik
          </div>
          <div className="sidebar__networkItem">
            <LocationIcon />
            {user.cityName}
          </div>
        </div>
        {profileType === 'client' && !isDesktop && (
          <ClientRequests requests={user && user.requests} />
        )}
        {this.renderDrops()}
      </Fragment>
    );
  }

  render() {
    const { showMobileMore } = this.state;
    const { profileType, user, isDesktop } = this.props;

    return (
      <Fragment>
        <div className={`sidebar sidebar_${showMobileMore ? '' : 'less'}`}>
          <div className="sidebar__image">
            <DefaultAvatar />
            <Link
              to={`/client-edit/${user.id}`}
              className="sidebar__editButton"
            >
              <PencilIcon />
            </Link>
          </div>
          <TypeCard
            renderHeader={() => <span>Частник</span>}
            subText="В Агент24 с 21.02.2018"
            type="green"
          />
          <div className="sidebar__content">
            <div className="sidebar__name">{user.name}</div>
            {isDesktop && (
              <div className="sidebar__contact">
                <Button className="sidebar__sendMessage">Cообщение</Button>
                <div className="sidebar__extendButton">
                  <ExtendInfoIcon />
                </div>
              </div>
            )}
            {isDesktop ? (
              this.renderSlidingContent()
            ) : (
              <div className="sidebar__slidingContent">
                {this.renderSlidingContent()}
              </div>
            )}
          </div>

          {!isDesktop && (
            <Fragment>
              <div className="sidebar__contact">
                <Button className="sidebar__sendMessage">
                  Написать Cообщение
                </Button>
              </div>
              <div
                className={`sidebar__${
                  showMobileMore ? 'showMore' : 'showLess'
                }`}
                onClick={() =>
                  this.setState({
                    showMobileMore: !showMobileMore,
                    showBlocked: false,
                    showRepresentatives: false,
                  })
                }
              >
                <ArrowDownIcon />
              </div>
            </Fragment>
          )}
        </div>
        {profileType === 'client' && isDesktop && (
          <ClientRequests requests={user && user.requests} />
        )}
      </Fragment>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    birthday: PropTypes.string,
    isFlp: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    isViber: PropTypes.bool,
    isTelegram: PropTypes.bool,
    isWhatsApp: PropTypes.bool,
    phones: PropTypes.arrayOf(PropTypes.string),
    balance: PropTypes.number,
    cityId: PropTypes.number,
    areaId: PropTypes.number,
    countRegerralId: PropTypes.number,
    myReferralName: PropTypes.string,
    myReferralId: PropTypes.number,
    photo: PropTypes.string,
    bonus: PropTypes.number,
  }),
  profileType: PropTypes.string, // "user" for user profile and "client" for others
  isSmallMobile: PropTypes.bool.isRequired,
};

SideBar.defaultProps = {
  profileType: 'client',
  user: {
    phones: [],
  },
};

export default withSizes(SideBar);
