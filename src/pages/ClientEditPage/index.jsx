import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { Link } from 'react-router-dom';

import GeneralLayout from '../../layouts/GeneralLayout';
import authGuard from '../../guards/AuthGuard';
import FullNameLine from '../../components/general/EditFormComponents/FullNameLine';
import CroppableDropBox from '../../components/general/EditFormComponents/CroppableDropBox';
import CityWithBirthday from '../../components/general/EditFormComponents/CityWithBirthdayLine';
import RealtorLine from '../../components/general/EditFormComponents/RealtorLine';
import EmailWithSourceLine from '../../components/general/EditFormComponents/EmailWithSourceLine';
import PhonesLine from '../../components/general/EditFormComponents/PhonesLine';
import SocialNetworksLine from '../../components/general/EditFormComponents/SocialNetworksLine';
import BoundedContacts from '../../components/general/EditFormComponents/BoundedContacts';
import { Button } from '../../components/general/Button';
import {
  clientCreateEditAsyncAction, setClientEditFormValuesAction, clientUploadProfilePhoto,
} from '../../store/actions/client';
import { loadAgencySuggestions, loadCitySuggestions } from '../../store/actions/newRequest';
import { getCities, getAgencies } from '../../store/reducers/newRequest';
import { getClientInfo } from '../../store/reducers/client';

import './style.scss';
class ClientEditPage extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleAgencyChange = this.handleAgencyChange.bind(this);
    this.handleAgencySelect = this.handleAgencySelect.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
    this.handleAddBoundedContact = this.handleAddBoundedContact.bind(this);
  }

  handleAddPhoto(photo) {
    const { setClientEditFormValues, uploadPhoto } = this.props;

    console.log(photo);

    setClientEditFormValues({
      photo: photo.preview,
    });
    uploadPhoto(photo);
  }

  handleDeletePhoto() {
    const { setClientEditFormValues } = this.props;

    setClientEditFormValues({ photo: '' });
  }

  handleCityChange(newCity) {
    const { loadCities, setClientEditFormValues } = this.props;

    if (newCity !== null) {
      loadCities(newCity);
      setClientEditFormValues({ cityName: newCity, cityId: null });
    } else {
      setClientEditFormValues({ cityName: null });
    }
  }

  handleCitySelect(city) {
    const { setClientEditFormValues } = this.props;

    const cityWithoutState = city.name.split(' (')[0];
    setClientEditFormValues({
      cityId: city.id,
      cityName: cityWithoutState,
    });
  }

  handleAgencyChange(newAgency) {
    const { loadAgencies, setClientEditFormValues } = this.props;

    if (newAgency !== null) {
      loadAgencies({ name: newAgency });
      setClientEditFormValues({ agencyName: newAgency, agencyId: null });
    } else {
      setClientEditFormValues({ agencyName: null });
    }
  }

  handleAgencySelect(agency) {
    const { setClientEditFormValues } = this.props;

    const agencyWithoutState = agency.name.split(' (')[0];
    setClientEditFormValues({
      agencyId: agency.id,
      agencyName: agencyWithoutState,
    });
  }

  handleAddBoundedContact(contact) {
    const { array } = this.props;

    array.push('relationsContacts', {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      photoLink: contact.img,
      img: contact.img,
    });
  }

  handleFormSubmit(values) {
    const { createClient } = this.props;

    const { birthDay, birthMonth, birthYear, phones, ...restValues } = values;

    const mainPhone = phones.find(el => el.isMain);

    const makeTwoNumbers = val => (String(val).length === 1 ? `0${val}` : val);

    const sendValues = {
      birthday: `${birthYear}-${makeTwoNumbers(birthMonth)}-${makeTwoNumbers(birthDay)}`,
      phone: mainPhone.phone,
      isViber: mainPhone.isViber,
      isTelegram: mainPhone.isTelegram,
      isWhatsApp: mainPhone.isWhatsApp,
      phones: phones.filter(el => !el.isMain),
      ...restValues,
    };

    console.log('creating client', sendValues);
    createClient(sendValues);
  }

  render() {
    const {
      handleSubmit, citySuggestions, cityName, cityId,
      agencyName, agencySuggestions, isRealtor, type,
      history, photo,
    } = this.props;

    return (
      <GeneralLayout>
        <div className="clientEdit">
          <h2 className="clientEdit__mainTitle">
            Редактирование карточки клиента
          </h2>
          <h3 className="clientEdit__secondaryTitle">
            Основная информация
          </h3>
          <div className="clientEdit__content">
            <div className="clientEdit__line">
              <CroppableDropBox
                onDrop={this.handleAddPhoto}
                deletePhoto={this.handleDeletePhoto}
                photo={photo}
              />
              <div className="flex-grow">
                <FullNameLine />
                <CityWithBirthday
                  onCityChange={this.handleCityChange}
                  onCitySelect={this.handleCitySelect}
                  citySuggestions={citySuggestions.slice(0, 4)}
                  cityValue={cityName || ''}
                  cityChosen={cityId}
                />
                <RealtorLine
                  isRealtor={isRealtor}
                  type={type}
                  onAgencyChange={this.handleAgencyChange}
                  onAgencySelect={this.handleAgencySelect}
                  agencySuggestions={agencySuggestions.slice(0, 4)}
                  agencyValue={agencyName || ''}
                />
              </div>
            </div>
            <div className="clientEdit__line">
              <EmailWithSourceLine />
            </div>
            <div className="clientEdit__line">
              <PhonesLine showMessengers />
            </div>
          </div>
          <hr />
          <h3 className="clientEdit__secondaryTitle">
            Социальные сети
          </h3>
          <div className="clientEdit__content">
            <div className="clientEdit__line">
              <SocialNetworksLine />
            </div>
          </div>
          <hr />
          <h3 className="clientEdit__secondaryTitle">
            Связанные контакты
          </h3>
          <div className="clientEdit__content">
            <div className="clientEdit__line">
              <BoundedContacts
                addContact={this.handleAddBoundedContact}
              />
            </div>
          </div>
          <div className="clientEdit__buttons">
            <Button onClick={() => history.goBack()}>
              Отмена
            </Button>
            <Button onClick={handleSubmit(this.handleFormSubmit)}>
              Сохранить
            </Button>
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

ClientEditPage.propTypes = {
  createClient: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setClientEditFormValues: PropTypes.func.isRequired,
  loadCities: PropTypes.func.isRequired,
  loadAgencies: PropTypes.func.isRequired,
  cityName: PropTypes.string,
  cityId: PropTypes.number,
  agencyName: PropTypes.string,
  citySuggestions: PropTypes.array,
  agencySuggestions: PropTypes.array,
  isRealtor: PropTypes.bool,
  type: PropTypes.string,
};

ClientEditPage.defaultProps = {
  cityName: '',
  cityId: null,
  agencyName: '',
  type: '',
  isRealtor: false,
  citySuggestions: [],
  agencySuggestions: [],
};

const selector = formValueSelector('ClientEditPageForm');

const mapStateToProps = state => ({
  citySuggestions: getCities(state),
  cityName: selector(state, 'cityName'),
  cityId: selector(state, 'cityId'),
  agencyName: selector(state, 'agencyName'),
  isRealtor: selector(state, 'isRealtor'),
  type: selector(state, 'type'),
  agencySuggestions: getAgencies(state),
  clientInfo: getClientInfo(state),
  photo: selector(state, 'photo'),
});

const mapDispatchToProps = dispatch => ({
  createClient: data => dispatch(clientCreateEditAsyncAction(data)),
  loadCities: city => dispatch(loadCitySuggestions(city)),
  loadAgencies: data => dispatch(loadAgencySuggestions(data)),
  setClientEditFormValues: data => dispatch(setClientEditFormValuesAction(data)),
  uploadPhoto: photo => dispatch(clientUploadProfilePhoto(photo)),
});

const initialValues = {
  birthDay: parseInt(moment().format('D'), 10),
  birthMonth: parseInt(moment().format('MM'), 10),
  birthYear: 2000,
  phones: [
    {
      phone: '',
      isViber: false,
      isTelegram: false,
      isWhatsApp: false,
      isMain: true,
    },
  ],
  socialNetworks: [{}],
  relationsContacts: [],
};

export default compose(
  authGuard({ redirectTo: '/signin' }),
  reduxForm({
    form: 'ClientEditPageForm',
    initialValues,
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ClientEditPage);
