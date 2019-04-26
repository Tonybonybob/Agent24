import React, { Component } from 'react';
import './style.scss';
class Profile extends Component {
    render() {
      return (
        <div
          className="profile"
        >
          <div
            className="row"
          >
            <div
              className="row__col row__col_3 profile__imageWrapper"
            >
              <div
                className="profile__image"
                style={{backgroundImage:'url(https://randomuser.me/api/portraits/men/52.jpg)'}}
              >
              </div>
              <div className="profile__join">
                #1232, в системе с 21.02.2018
              </div>
            </div>
            <div
              className="row__col">
                <div
                  className="row"
                >
                  <div
                    className="row__col row__col_12 row__col_smauto row__col_lg12"
                  >
                    <div
                      className="profile__name"
                    >
                      Константин Константинович Константинопольский
                    </div>
                    <div
                      className="profile__rieltorStatus"
                    >
                      Риелтор АН Синий Квадрат
                    </div>
                    <div
                      className="profile__infoItem profile__infoItem_phone"
                    >
                      <a 
                        className="profile__phone"
                        href="tel:+380677654321"
                      >
                        +38 0 67 765 43 21
                      </a>
                      <span 
                        className="profile__phoneMessangers"
                      >
                        
                      </span>
                    </div>
                    <div
                      className="profile__infoItem"
                    >
                      sample@mail.com
                    </div>
                    <div
                      className="profile__infoItem"
                    >
                      Днепр
                    </div>
                    <div
                      className="profile__infoItem"
                    >
                      21 августа 1983
                    </div>
                    <div
                      className="profile__infoItem"
                    >
                      <span className="profile__sourceLabel">Источник:</span> сайт
                    </div>
                  </div>
                  <div
                    className="row__col row__col_12 profile__systemInfo"
                  >
                    Инфа системная
                  </div>
                </div>
            </div>
            <div
              className="row__col row__col_12"
            >
              Написать сообщение
            </div>
          </div>
        </div>
      );
    }
}

export default Profile;