import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';

import TextField from '../../../../common/TextField';
import ViberIcon from '../../../../../assets/Viber';
import TelegramIcon from '../../../../../assets/Telegram';
import WhatsappIcon from '../../../../../assets/Whatsapp';
import TrashIcon from '../../../../../assets/Trash';
import PlusIcon from '../../../../../assets/Plus';
import PureRadioButton from '../../../../common/PureRadioButton';
import './style.scss';
const phoneMask = createTextMask({
  pattern: '+380      99 999 9999',
  placeholder: ' ',
  guide: false,
});
const phoneInitial = {
  phone: '',
  isViber: false,
  isTelegram: false,
  isWhatsApp: false,
  isMain: false,
};

class PhoneItem extends Component {
  handleChange(phone, id) {
    const { fields } = this.props;

    if (phone.phone) {
      const fieldsCopy = [...fields.getAll()];

      fields.removeAll();
      fieldsCopy.forEach((el, index) => fields.push({ ...el, isMain: index === id }));
    }
  }

  handleDelete(phone, id) {
    const { fields } = this.props;

    if (phone.isMain) {
      const fieldsCopy = [...fields.getAll()];
      fields.removeAll();
      fieldsCopy.forEach((el, key) => {
        if (key === id) return false;

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
    const { fields } = this.props;

    return (
      <div className="editLine editLine_phones">
        {fields.map((phoneField, id) => {
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
                {...phoneMask}
              />
              <div className="editLinePhone__icons">
                {iconList.map(icon => (
                  <div className={`editLinePhone__icon editLinePhone__${icon.className}`}>
                    {icon.icon}
                  </div>
                ))}
                <div
                  className={`editLinePhone__icon editLinePhone__delete ${fields.length > 1 ? '' : 'editLine__placeholder'}`}
                  onClick={() => this.handleDelete(phone, id)}
                >
                  <TrashIcon />
                </div>
                <div
                  className={`editLinePhone__icon editLinePhone__add ${id === fields.length - 1 ? '' : 'editLine__placeholder'}`}
                  onClick={() => fields.push(phoneInitial)}
                >
                  <PlusIcon />
                </div>
              </div>
              <PureRadioButton
                checked={phone.isMain}
                label={phone.isMain && 'Основной телефон'}
                onChange={() => this.handleChange(phone, id)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

PhoneItem.propTypes = {
  fields: PropTypes.shape({
    phone: PropTypes.string,
    isViber: PropTypes.bool,
    isTelegram: PropTypes.bool,
    isWhatsApp: PropTypes.bool,
  }).isRequired,
};

export default PhoneItem;
