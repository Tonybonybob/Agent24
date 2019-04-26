import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  Checkbox,
  // RadioGroup,
  Select,
  TextField,
  // Switch
} from 'redux-form-material-ui';
import './style.scss';

class ProfileEditForm extends React.Component {
  static phoneFormatter = (number) => {
    if (!number) return '';
    // NN NNN NNNN
    if (number.trim().length <= 2) {
      return number.trim();
    }
    if ((number.trim().length <= 5) && (number.trim().length > 3)) {
      return `${number.trim().slice(0, 2).trim()} ${number.trim().slice(2, 5).trim()}`;
    }
    return `${number.trim().slice(0, 2).trim()} ${number.trim().slice(2, 5).trim()} ${number.trim().slice(5, 9).trim()}`;
  };

  static propTypes = {
    initialValues: PropTypes.shape({
      firstName: PropTypes.string,
    }).isRequired,
    phones: PropTypes.arrayOf(
      PropTypes.shape({
        countryCode: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    phones: [{
      countryCode: '+380',
      phoneNumber: '',
    }],
  }

  static renderSelectMonthItems() {
    return [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ].map((month, index) => (
      <MenuItem key={month} value={index}>
        {month}
      </MenuItem>
    ));
  }

  static renderPhonesBlock(phones) {
    console.log('phooones', phones);
    return phones.map(phone => (
      <div key={phone.phoneNumber}>
        {ProfileEditForm.renderPhoneInput(phone)}
        <span className="icon-bin" />
        <div>
          <span className="icon-viber" />
          <span className="icon-telegram" />
          <span className="icon-whatsapp" />
        </div>
      </div>
    ));
  }

  static renderPhoneInput(phone) {
    console.log('phoneNumberrrr', `${phone.countryCode}`);
    return (
      <FormControl className="input number">
        <Field
          label="Телефон"
          className="c-text-field number__first"
          name={`${phone}.countryCode`}
          disabled
          component={TextField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field
          // component={NumberFormat}
          // customInput={TextField}
          component={TextField}
          name={`${phone}.phoneNumber`}
          className="c-text-field number__second"
          normalize={ProfileEditForm.phoneFormatter}
        />
      </FormControl>
    );
  }

  renderSelectDateItems(startingDate, finishingDate) {
    if (startingDate > finishingDate) return false;
    return (
      [
        <MenuItem key={startingDate} value={startingDate}>
          {startingDate}
        </MenuItem>,
        ...this.renderSelectDateItems(startingDate + 1, finishingDate),
      ]
    );
  }


  render() {
    console.log('prrrr', this.props);

    const { initialValues, phones } = this.props;

    const { accountYear } = initialValues;

    const dayItems = this.renderSelectDateItems(1, 31);
    const yearItems = this.renderSelectDateItems(1920, accountYear);
    const monthItems = ProfileEditForm.renderSelectMonthItems();

    console.log('phones', phones);
    const phonesBlock = (
      <FieldArray
        name="phones"
        component={() => ProfileEditForm.renderPhonesBlock(phones)}
      />
    );

    console.log(phonesBlock);

    return (
      <form className="profileForm">
        {/* <div className="photoEdit">
          <Field
            accept="image/*"
            component={Dropzone}
            multiple={false}
            name="photo"
            className="dropZone"
            style={{
              background: photo ? `url(${photo}) no-repeat` : 'rgba(18, 18, 18, 0.32)',
                backgroundSize: 'contain'
            }}
          />
          <span className="icon-arrow-up" />
          <p>Загрузить фото</p>
          <div className="c-slider-wrapper">
            <Slider min={0} value={3} max={6} step={1} />
          </div>
        </div> */}
        <div className="inputFields">
          <Field
            type="text"
            label="Имя"
            component={TextField}
            className="c-text-field input"
            name="firstName"
          />
          <Field
            type="text"
            className="c-text-field input"
            label="Фамилия"
            component={TextField}
            name="lastName"
          />
          <Field
            type="text"
            className="c-text-field input"
            label="Отчество"
            component={TextField}
            name="middleName"
          />
          <Field
            type="text"
            className="c-text-field input"
            component={TextField}
            label="Город"
            name="city"
          />
          <div>
            <FormControlLabel
              control={(
                <Field
                  name="isRieltor"
                  component={Checkbox}
                  color="primary"
                />
              )}
              label="Риелтор"
            />
          </div>
          <Field
            component={Select}
            name="accountType"
            className="input"
            value="accountType"
            label="Тип аккаунта"
          >
            <MenuItem value="agency">
              Агентство
            </MenuItem>
            <MenuItem value="private">
              Частник
            </MenuItem>
          </Field>
          <Field
            type="text"
            label="Название агенства"
            className="c-text-field input"
            component={TextField}
            name="agencyName"
          />

          <FormControl className="input">
            <InputLabel className="c-label" htmlFor="account-day">
              Дата рождения
            </InputLabel>
            <div className="selectGroup">
              <Field
                name="accountDay"
                component={Select}
              >
                {dayItems}
              </Field>
              <Field
                name="accountMonth"
                component={Select}
              >
                {monthItems}
              </Field>
              <Field
                name="accountYear"
                component={Select}
              >
                {yearItems}
              </Field>
            </div>
          </FormControl>
          <Field
            type="email"
            label="Email"
            className="c-text-field input"
            name="email"
            component={TextField}
          />
          <FormControl className="input">
            <InputLabel className="c-label" htmlFor="account-type">
              Тип аккаунта
            </InputLabel>
            <Field
              name="source"
              component={Select}
            >
              <MenuItem value="Сайт">
                Сайт
              </MenuItem>
              <MenuItem value="Что-то">
                Что-то
              </MenuItem>
            </Field>
          </FormControl>

          {phonesBlock}
        </div>
      </form>
    );
  }
}


export default reduxForm({
  form: 'ProfileEdit',
})(ProfileEditForm);
