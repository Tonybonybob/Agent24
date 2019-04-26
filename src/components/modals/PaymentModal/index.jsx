import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PureTextField from '../../common/PureTextField';
import { Button } from '../../general/Button';
import Tabs from '../../common/Tabs';
import Close from '../../../assets/Close';
import SearchIcon from '../../../assets/SearchIcon';
import PrivatBank from '../../../assets/PrivatBank';
import './style.scss';
class PaymentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moneyAdded: '',
      moneySent: '',
      activeBank: 0,
    };

    this.handleChangeMoneyAdded = this.handleChangeMoneyAdded.bind(this);
    this.handleChangeMoneySent = this.handleChangeMoneySent.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePaymentMethodChange = this.handlePaymentMethodChange.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    const state = history && history.location && history.location.state;

    if (state) {
      this.setState({
        activeTab: 0,
        ...state,
      });
    }
  }

  handleChangeMoneySent(event) {
    const { money } = this.props;

    const newMoney = Number(event.target.value);
    const initialMoney = Number(money);

    if (newMoney > initialMoney) {
      this.setState({
        moneySent: initialMoney,
      });
    } else {
      this.setState({
        moneySent: newMoney,
      });
    }
  }

  handlePhoneChange(event) {
    const newValue = event.target.value;

    this.setState({
      phoneReceiver: newValue.length > 9 ? newValue.slice(0, 9) : newValue,
    });
  }

  handleChangeMoneyAdded(event) {
    const newMoney = Number(event.target.value);

    this.setState({
      moneyAdded: newMoney,
    });
  }

  handlePaymentMethodChange(event) {
    const activeBank = Number(event.currentTarget.getAttribute('data-bankIndex'));

    console.log(activeBank);

    this.setState({
      activeBank,
    });
  }

  renderTabs() {
    const { activeTab } = this.state;

    const navLinks = [
      {
        label: 'ПОПОЛНИТЬ',
        value: 'add',
      },
      {
        label: 'ПЕРЕВЕСТИ',
        value: 'send',
      },
    ];


    return (
      <Tabs
        fullWidth={false}
        activeTab={activeTab}
        change={(event, value) => this.setState({ activeTab: value })}
        navLinks={navLinks}
      />
    );
  }

  render() {
    const { activeTab, moneyAdded, moneySent, activeBank, phoneReceiver } = this.state;

    const { money } = this.state;

    console.log(activeTab);
    return (
      <div className="paymentModal">
        {this.renderTabs()}
        <div className="paymentModal__content">
          {activeTab === 0 && (
            <div>
              <figure
                className={`paymentModal__bank paymentBank ${activeBank === 0 ? 'paymentBank_active' : ''}`}
                data-bankIndex="0"
                onClick={this.handlePaymentMethodChange}
              > 
                <img alt="" />
                <figcaption className="paymentBank__description">
                  <h5 className="paymentBank__name">
                    Visa / MasterCard
                  </h5>
                  <h6 className="paymentBank__description">
                    Зачисление 1 - 3 банковских дня
                  </h6>
                </figcaption>
              </figure>
              <figure
                className={`paymentModal__bank paymentBank ${activeBank === 1 ? 'paymentBank_active' : ''}`}
                data-bankIndex="1"
                onClick={this.handlePaymentMethodChange}
              >
                <PrivatBank className="paymentBank__photo" />
                <figcaption className="paymentBank__description">
                  <h5 className="paymentBank__name">
                    Приват 24
                  </h5>
                  <h6 className="paymentBank__description">
                    Зачисление Моментально
                  </h6>
                </figcaption>
              </figure>
              <PureTextField
                value={moneyAdded}
                onChange={this.handleChangeMoneyAdded}
                label="Сумма пополнения"
              />
              <Button buttonType="primary" full disabled={!moneyAdded}>
                ПОПОЛНИТЬ
              </Button>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <div className="paymentModal__sendField">
                <PureTextField
                  value={moneySent}
                  onChange={this.handleChangeMoneySent}
                  label="Сумма пополнения"
                />
                <span className="paymentModal__moneyAvailable">
                  у вас
                  <span className="paymentModal__moneyAvailable_money">
                    {money}
                    ₴
                  </span>
                </span>
              </div>
              <div className="searchBar" onClick={this.handleFocus}>
                <input className="searchBar__input" onChange={this.handlePhoneChange} />
                <span className="searchBar__icon">
                  { phoneReceiver
                    ? <Close onClick={this.handleClearField} />
                    : <SearchIcon />
                  }
                </span>
              </div>
              <Button buttonType="primary" full disabled={!moneySent}>
                ПОПОЛНИТЬ
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default withRouter(PaymentModal);
