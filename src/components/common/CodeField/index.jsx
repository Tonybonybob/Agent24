import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';
import TextField from '../TextField';

class CodeField extends Component {
  static propTypes = {
    checkPhoneValue: PropTypes.shape({
      phone: PropTypes.string,
      type: PropTypes.string,
    }),
    phone: PropTypes.string.isRequired,
    checkSmsToken: PropTypes.func.isRequired,
    showCallAgain: PropTypes.bool,
    smsToken: PropTypes.bool,
    code: PropTypes.string,
    setSmsToken: PropTypes.func.isRequired,
    checkPhone: PropTypes.func,
    setTokenValid: PropTypes.func.isRequired,
    isTokenValid: PropTypes.bool,
  }

  static defaultProps = {
    showCallAgain: false,
    smsToken: false,
    code: '',
    isTokenValid: false,
    checkPhone: undefined,
    checkPhoneValue: {},
  }

  constructor(props) {
    super(props);

    
    this.codeMask = createTextMask({
      pattern: '9  9   9  9',
      guide: false,
      onCompletePattern: (value) => {
        props.checkSmsToken({
          phone: '380'.concat(props.phone),
          otp: value,
        });
      },
    });

    this.state = {
      sendAgainAfter: 0,
    };

    this.reduceSendAgainTime = this.reduceSendAgainTime.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { smsToken } = this.props;

    if (!prevProps.smsToken && smsToken) {
      this.setState({
        sendAgainAfter: 60000,
      });
      this.reduceSendAgainTime();
    } else if (prevProps.smsToken && !smsToken) {
      this.setState({
        sendAgainAfter: 0,
      });
    }
  }

  reduceSendAgainTime() {
    this.setState((prevState) => {
      const sendAgainAfter = prevState.sendAgainAfter > 0 ? prevState.sendAgainAfter - 1000 : prevState.sendAgainAfter;
      if (sendAgainAfter > 0) {
        setTimeout(this.reduceSendAgainTime, 1000);
      }
      return {
        sendAgainAfter,
      };
    });
  }

  handleChangePhone() {
    const { setSmsToken, setTokenValid } = this.props;

    setSmsToken(false);
    setTokenValid(false);
  }

  render() {
    const { smsToken, isTokenValid, code, showCallAgain, checkPhone, checkPhoneValue } = this.props;

    const { sendAgainAfter } = this.state;

    return (
      smsToken && (
        <div className="smsToken__wrapper">
          <div className="validate__smsToken smsToken">
            <div className="smsToken__item">
              <TextField
                name="code"
                data-index={0}
                required={false}
                placeholder="4 значный код"
                // onFocus={() => this.handleCurrentIndexChange(0)}
                // onChange={this.handleCodeChange}
                // inputRef={this.codeRef0}
                {...this.codeMask}
              />
            </div>
            <span className={`smsToken__icon ${code.length === 4 ? isTokenValid ? 'smsToken__icon_good' : 'smsToken__icon_bad' : ''}`} />
          </div>
          <div>
            {showCallAgain && !isTokenValid && (
              sendAgainAfter > 0
                ? (
                  <span className="smsToken__sendAgainTimer">
                    {'Отправить код заново через '}
                    {sendAgainAfter / 1000}
                    {' cек.'}
                  </span>
                ) : (
                  <span className="smsToken__sendAgainClick" onClick={() => checkPhone(checkPhoneValue)}>
                    Отправить код заново
                  </span>
                )
            )}
          </div>
        </div>
      )
    );
  }
}

export default CodeField;
