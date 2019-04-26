import React, { Component } from 'react';

import PureSelect from '../../PureSelect';
import PureTextField from '../../PureTextField';
import Row from '../../../Grid/Row';
import Col from '../../../Grid/Col';
import { Button } from '../../../general/Button';
import './style.scss';

class ProfileTariff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tariffNumber: 3,
      agencyPlan: 259,
    };

    this.handleChangeTariffNumber = this.handleChangeTariffNumber.bind(this);
    this.handleChangeAgencyPlan = this.handleChangeAgencyPlan.bind(this);
  }

  handleChangeTariffNumber(event) {
    const tariffNumber = !event.target.value && event.target.value === ''
      ? event.target.value
      : Number(event.target.value) || '';
    let agencyPlan;
    if (tariffNumber >= 200) {
      agencyPlan = 209;
    } else if (tariffNumber >= 100) {
      agencyPlan = 219;
    } else if (tariffNumber >= 50) {
      agencyPlan = 229;
    } else if (tariffNumber >= 30) {
      agencyPlan = 239;
    } else if (tariffNumber >= 10) {
      agencyPlan = 249;
    } else if (tariffNumber >= 3) {
      agencyPlan = 259;
    } else agencyPlan = '';

    this.setState({
      tariffNumber,
      agencyPlan,
    });
  }

  handleChangeAgencyPlan(event) {
    const agencyPlan = Number(event.target.value);

    this.setState((prevState) => {
      if (prevState.agencyPlan === agencyPlan) {
        this.setState({
          agencyPlan,
        });
      } else {
        let tariffNumber;
        if (agencyPlan === 259) {
          tariffNumber = 9;
        } else if (agencyPlan === 249) {
          tariffNumber = 29;
        } else if (agencyPlan === 239) {
          tariffNumber = 49;
        } else if (agencyPlan === 229) {
          tariffNumber = 99;
        } else if (agencyPlan === 219) {
          tariffNumber = 199;
        } else {
          tariffNumber = 200;
        }
        this.setState({
          agencyPlan,
          tariffNumber,
        });
      }
    });
  }

  render() {
    const { isBeginner, isAdvanced, isAgency, isActive, isReferalled } = this.props;

    const { tariffNumber, agencyPlan } = this.state;

    const offers = [
      { name: 'Ведение базы клиентов', isActive: true },
      { name: 'Автопоиск', isActive: true },
      { name: 'Автопоиск в сообщество', isActive: isAdvanced || isAgency },
      { name: 'ПарсерБаза 1', isActive: isAdvanced || isAgency },
      { name: 'Мое АН', isActive: isAgency },
    ]

    return (
      <div className="profileTariff">
        <div className="profileTariff__content">
          <h4 className="profileTariff__title">
            {isBeginner && 'Начальный'}
            {isAdvanced && 'Индивидуальный'}
            {isAgency && 'Агентство'}
          </h4>
          <h6 className="profileTariff__subtitle">
            {isBeginner && 'Любой пользователь'}
            {isAdvanced && '1 частник / ФЛП'}
            {isAgency && '1 частник / ФЛП + сотрудники'}
          </h6>
          <div className={`profileTariff__description ${isAgency ? 'profileTariff__description_select' : ''}`}>
            {isBeginner && 'Возможности тестирования базового функционала'}
            {isAdvanced && 'Лучший выбор для частного агента'}
            {isAgency && (
              <Row>
                <Col default={{ col: 9 }}>
                  <PureSelect
                    items={[
                      { value: 259, name: (
                        <span className="profileTariff__tariffPrice">
                          3-9 по 259 ₴
                          <span className="profileTariff__discount">
                            -10 ₴
                          </span>
                        </span>
                      )},
                      { value: 249, name: (
                        <span className="profileTariff__tariffPrice">
                          10-29 по 249 ₴
                          <span className="profileTariff__discount">
                            -20 ₴
                          </span>
                        </span>
                      )},
                      { value: 239, name: (
                        <span className="profileTariff__tariffPrice">
                          30-49 по 239 ₴
                          <span className="profileTariff__discount">
                            -30 ₴
                          </span>
                        </span>
                      )},
                      { value: 229, name: (
                        <span className="profileTariff__tariffPrice">
                          50-99 по 229 ₴
                          <span className="profileTariff__discount">
                            -40 ₴
                          </span>
                        </span>
                      )},
                      { value: 219, name: (
                        <span className="profileTariff__tariffPrice">
                          100-199 по 219 ₴
                          <span className="profileTariff__discount">
                            -50 ₴
                          </span>
                        </span>
                      )},
                      { value: 209, name: (
                        <span className="profileTariff__tariffPrice">
                          200+ по 209 ₴
                          <span className="profileTariff__discount">
                            -60 ₴
                          </span>
                        </span>
                      )},
                    ]}
                    value={agencyPlan}
                    onChange={this.handleChangeAgencyPlan}
                  />
                </Col>
                <Col default={{ col: 3 }}>
                  <PureTextField value={tariffNumber} onChange={this.handleChangeTariffNumber} />
                </Col>
              </Row>
            )}
          </div>
          <div>
            {isBeginner && (
              <h5 className="profileTariff__forever">
                бесплатно навсегда
              </h5>
            )}
            {isAdvanced && (
              <div>
                <div className="servicesCard__priceWrapper">
                  <span className="servicesCard__price">
                    269₴
                  </span>
                  <span className="servicesCard__date">
                    /мес.
                  </span>
                </div>
                <PureTextField value="" />
                <p className="profileTariff__additionalCodeInfo">
                  Вводи промо-код при оформлении заказа и получай тариф на месяц
                  <span className="profileTariff__free">
                    {' '}
                    бесплатно
                  </span>
                </p>
              </div>
            )}
            {isAgency && (
              <div>
                <div className="servicesCard__priceWrapper">
                  <span className="servicesCard__price">
                    {agencyPlan * tariffNumber}
                    ₴
                  </span>
                  <span className="servicesCard__date">
                    /мес.
                  </span>
                </div>
                <PureTextField value="" />
                <p className="profileTariff__additionalCodeInfo">
                  Введи промо-код и пользуйся сервисом
                  <span className="profileTariff__free">
                    {' '}
                    бесплатно
                    {' '}
                  </span>
                  месяц с любым количеством сотрудников
                </p>
              </div>
            )}
          </div>

          <div className="profileTariff__bottom">
            <div className="profileTariff__offers profileTariffOffers">
              {offers.map(offer => (
                <div className="profileTariffOffers__item">
                  <span className={`profileTariffOffers__name ${offer.isActive ? '' : 'profileTariffOffers__name_blocked'}`}>
                    {offer.name}
                  </span>
                  <span className="profileTariffOffers__question">
                    ?
                  </span>
                </div>
              ))}
            </div>
            <span className="profileTariff__fullDescription">
              Полное описание
            </span>
          </div>
        </div>
        <div className="profileTariff__bottom profileTariff__order">
          {isActive ? (
            <span className="profileTariff__isActive">
              Активен
            </span>
          ) : (
            <Button className="servicesCard__order" full>
              Заказать
              {isReferalled ? ' бесплатно' : ' сейчас'}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileTariff;