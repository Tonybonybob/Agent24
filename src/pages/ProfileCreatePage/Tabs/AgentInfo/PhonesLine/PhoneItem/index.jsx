import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';
import { connect } from 'react-redux';

import { checkPhoneAsyncAction, checkSmsTokenAsyncAction, setFormPhoneCheckAction } from '../../../../../../store/actions/auth';
import { getSmsToken } from '../../../../../../store/reducers/auth';
import TextField from '../../../../../../components/common/TextField';
import PureRadioButton from '../../../../../../components/common/PureRadioButton';
import WhatsappIcon from '../../../../../../assets/Whatsapp';
import TelegramIcon from '../../../../../../assets/Telegram';
import ViberIcon from '../../../../../../assets/Viber';
import PlusIcon from '../../../../../../assets/Plus';
import TrashIcon from '../../../../../../assets/Trash';
import CodeField from '../../../../../../components/common/CodeField';
import './style.scss';
const phoneInitial = {
  phone: '',
  isViber: false,
  isTelegram: false,
  isWhatsApp: false,
  isMain: false,
  isConfirmed: false,
};

class PhoneItem extends Component {
  constructor(props) {
    super(props);

    this.handleAddPhone = this.handleAddPhone.bind(this);
  }
  handleChange(phone) {
    const { fields } = this.props;

    const fieldsCopy = [...fields.getAll()];
    fields.removeAll();
    fieldsCopy.forEach(el => fields.push({ ...el, isMain: el.phone === phone.phone }));
  }

  handleAddPhone() {
    const { fields } = this.props;

    fields.push(phoneInitial);
  }

  handleDelete(phone, id) {
    const { fields } = this.props;

    if (phone.isMain) {
      const fieldsCopy = [...fields.getAll()];
      fields.removeAll();
      fieldsCopy.forEach((el, key) => {
        if (el.phone === phone.phone) return false;

        if (id === 0) {
          fields.push({ ...el, isMain: key === 1 });
          return false;
        }
        fields.push({ ...el, isMain: key === 0 });
        return false;
      });
    } else {
      fields.remove(id);
    }
  }

  render() {
    const { fields, getOTP, setFormPhoneData, checkOTP } = this.props;

    return (
      <div className="editLine editLine_phones">
        {fields.map((phoneField, id) => {
          const phoneMask = createTextMask({
            pattern: '+380      99 999 9999',
            placeholder: ' ',
            guide: false,
            onCompletePattern: value => {console.log(getOTP); getOTP({ phone: '+380'.concat(value), index: id, type: 'CONFIRM_PHONE' })},
          });

          const phone = fields.get(id);

          const iconList = [
            {
              icon: <ViberIcon />,
              className: `viber ${phone.isViber ? 'editLinePhone__icon_active' : ''}`,
            },
            {
              icon: <TelegramIcon />,
              className: `telegram ${phone.isTelegram ? 'editLinePhone__icon_active' : ''}`,
            },
            {
              icon: <WhatsappIcon />,
              className: `whatsapp ${phone.isWhatsApp ? 'editLinePhone__icon_active' : ''}`,
            },
          ];

          return (
            <div className="editLine__phone editLinePhone">
              <TextField
                name={`${phoneField}.phone`}
                label="Телефон"
                disabled={phone.toCheck}
                {...phoneMask}
              />
              {phone.tokenIsValid
                ? (
                  <Fragment>
                    <div className="editLinePhone__icons">
                      {iconList.map(icon => (
                        <div className={`editLinePhone__icon editLinePhone__${icon.className}`}>
                          {icon.icon}
                        </div>
                      ))}
                      {fields.length > 1 && (
                        <div
                          className="editLinePhone__icon editLinePhone__delete"
                          onClick={() => this.handleDelete(phone, id)}
                        >
                          <TrashIcon />
                        </div>
                      )}
                      {id === fields.length - 1 && (
                        <div
                          className="editLinePhone__icon editLinePhone__add"
                          onClick={this.handleAddPhone}
                        >
                          <PlusIcon />
                        </div>
                      )}
                    </div>
                    <PureRadioButton
                      checked={phone.isMain}
                      label={phone.isMain && 'Основной телефон'}
                      onChange={() => this.handleChange(phone)}
                    />
                  </Fragment>
                ) : (
                  phone.toCheck && (
                    <div className="editLinePhone__code">
                      <span onClick={() => setFormPhoneData({ toCheck: false, index: id })}>
                        change
                      </span>
                      <CodeField
                        code={phone.code}
                        phone={phone.phone}
                        smsToken={phone.toCheck}
                        checkPhone={getOTP}
                        isTokenValid={phone.tokenIsValid}
                        setSmsToken={value => setFormPhoneData({ toCheck: value, index: id })}
                        setTokenValid={value => setFormPhoneData({ tokenIsValid: value, index: id })}
                        checkSmsToken={value => checkOTP({ phone: value, index: id, type: 'CONFIRM_PHONE', otp: phone.code })}
                        checkPhoneValue={{
                          phone: '380'.concat(phone.phone),
                          type: 'CONFIRM_PHONE',
                          index: id,
                        }}
                      />
                    </div>
                  )
                )}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  smsToken: getSmsToken(state),
});

const mapDispatchToProps = dispatch => ({
  getOTP: data => dispatch(checkPhoneAsyncAction(data)),
  setFormPhoneData: data => dispatch(setFormPhoneCheckAction(data)),
  checkOTP: data => dispatch(checkSmsTokenAsyncAction(data)),
});

PhoneItem.propTypes = {
  fields: PropTypes.shape({
    phone: PropTypes.string,
    isViber: PropTypes.bool,
    isTelegram: PropTypes.bool,
    isWhatsApp: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneItem);
