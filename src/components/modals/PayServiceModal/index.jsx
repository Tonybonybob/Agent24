import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from '../../general/Button';
import PrivatBank from '../../../assets/PrivatBank';
import './style.scss';
class PayServiceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBank: 0,
    };
  }

  handlePaymentMethodChange = event => {
    const activeBank = Number(
      event.currentTarget.getAttribute('data-bankIndex')
    );

    this.setState({
      activeBank,
    });
  };

  render() {
    const { history } = this.props;

    const { activeBank } = this.state;

    const service =
      history &&
      history.location &&
      history.location.state &&
      history.location.state.service;

    return !service ? null : (
      <div className="payServiceModal">
        <div className="payServiceModal__header">
          Оплата
          {' «'}
          {service.name}
          {'» '}
          {service.quantity && (
            <Fragment>
              {service.quantity}
              {' шт.'}
            </Fragment>
          )}
        </div>
        <div className="payServiceModal__content">
          <figure
            className={`paymentModal__bank paymentBank ${
              activeBank === 0 ? 'paymentBank_active' : ''
            }`}
            data-bankIndex="0"
            onClick={this.handlePaymentMethodChange}
          >
            <div className="payServiceModal__currency paymentBank__photo">
              ₴
            </div>
            <figcaption className="paymentBank__description paymentBank__description_flex">
              <h5 className="paymentBank__name">С личного счета</h5>
              <span
                className={`
                  payServiceModal__moneyAvailable
                  ${
                    Number(service.price) > Number(service.moneyAvailable)
                      ? 'payServiceModal__moneyAvailable_good'
                      : 'payServiceModal__moneyAvailable_bad'
                  }`}
              >
                {service.moneyAvailable}
              </span>
            </figcaption>
          </figure>
          <figure
            className={`paymentModal__bank paymentBank ${
              activeBank === 1 ? 'paymentBank_active' : ''
            }`}
            data-bankIndex="1"
            onClick={this.handlePaymentMethodChange}
          >
            <img
              alt=""
              src="../../assets/Visa.png"
              className="paymentBank__photo"
            />
            <figcaption className="paymentBank__description">
              <h5 className="paymentBank__name">Visa / MasterCard</h5>
              <h6 className="paymentBank__description">
                Зачисление 1 - 3 банковских дня
              </h6>
            </figcaption>
          </figure>
          <figure
            className={`paymentModal__bank paymentBank ${
              activeBank === 2 ? 'paymentBank_active' : ''
            }`}
            data-bankIndex="2"
            onClick={this.handlePaymentMethodChange}
          >
            <PrivatBank className="paymentBank__photo" />
            <figcaption className="paymentBank__description">
              <h5 className="paymentBank__name">Приват 24</h5>
              <h6 className="paymentBank__description">
                Зачисление Моментально
              </h6>
            </figcaption>
          </figure>
          <Button full>ОПЛАТИТЬ</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(PayServiceModal);
