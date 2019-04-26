import React, { Component } from 'react';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import GeneralLayout from '../../layouts/GeneralLayout';
import { Button } from '../../components/general/Button';
import CroppableDropBox from '../../components/general/EditFormComponents/CroppableDropBox';
import FullNameLine from '../../components/general/EditFormComponents/FullNameLine';
import CityWithBirthdayLine from '../../components/general/EditFormComponents/CityWithBirthdayLine';
import PhonesLine from '../../components/general/EditFormComponents/PhonesLine';
import SocialNetworksLine from '../../components/general/EditFormComponents/SocialNetworksLine';
import Row from '../../components/Grid/Row';
import Col from '../../components/Grid/Col';
import TextField from '../../components/common/TextField';
import { loadCitySuggestions } from '../../store/actions/newRequest';
import { setAgentEditFormValuesAction, agentUploadProfilePhoto } from '../../store/actions/agent';
import { getCities } from '../../store/reducers/newRequest';
import AreaSegments from '../../components/general/EditFormComponents/AreaSegments';

import './style.scss';
class AgentEditPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }).isRequired,
    setAgentEditFormValues: PropTypes.func.isRequired,
    loadCities: PropTypes.func.isRequired,
    cityName: PropTypes.string,
    cityId: PropTypes.number,
    citySuggestions: PropTypes.array,
  };

  static defaultProps = {
    cityName: '',
    cityId: null,
    citySuggestions: [],
  }

  state = {
    segments: [],
  };

  handleAddPhoto = (photo) => {
    const { setAgentEditFormValues, uploadPhoto } = this.props;

    console.log(photo);

    setAgentEditFormValues({
      photo: photo.preview,
    });
    uploadPhoto(photo);
  }

  handleDeletePhoto = () => {
    const { setAgentEditFormValues } = this.props;

    setAgentEditFormValues({ photo: '' });
  }

  handleCityChange = (newCity) => {
    const { loadCities, setAgentEditFormValues } = this.props;

    if (newCity !== null) {
      loadCities(newCity);
      setAgentEditFormValues({ cityName: newCity, cityId: null });
    } else {
      setAgentEditFormValues({ cityName: null });
    }
  }

  handleCitySelect = (city) => {
    const { setAgentEditFormValues } = this.props;

    const cityWithoutState = city.name.split(' (')[0];
    setAgentEditFormValues({
      cityId: city.id,
      cityName: cityWithoutState,
    });
  }

  handleAddSegment = segment => {
    this.setState(prevState => ({
      segments: [...prevState.segments, segment],
    }));
  }

  render() {
    const { segments } = this.state;

    const { history, password1, password2, citySuggestions, cityName, cityId, photo } = this.props;

    const phonesAreEqual = () => password1 === password2 ? undefined : 'Пароли должны совпадать';

    console.log(segments);
  
    return (
      <GeneralLayout>
        <div className="agentEdit">
          <h2 className="agentEdit__title">
            Информация об агенте
          </h2>
          <div className="agentEdit__mainInfo">
            <CroppableDropBox
              onDrop={this.handleAddPhoto}
              deletePhoto={this.handleDeletePhoto}
              photo={photo}
            />
            <div className="agentEdit__nameWithCity">
              <FullNameLine />
              <CityWithBirthdayLine
                onCityChange={this.handleCityChange}
                onCitySelect={this.handleCitySelect}
                citySuggestions={citySuggestions.slice(0, 4)}
                cityValue={cityName || ''}
                cityChosen={cityId}
              />
            </div>
          </div>
          <Row className="agentEdit__description">
            <Col default={{ col: 12 }} lg={{ col: 8 }}>
              <Row>
                <Col default={{ col: 10 }} lg={{ col: 4}}>
                  <TextField name="email" label="Email" />
                </Col>
              </Row>
              <SocialNetworksLine />
              <PhonesLine />
            </Col>
            <Col default={{ col: 10 }} lg={{ col: 4 }}>
              <TextField name="oldPassword" placeholder="Старый пароль" label="Изменить пароль" InputLabelProps={{ shrink: true }} />
              <TextField name="password1" label="Новый пароль" />
              <TextField name="password2" label="Повторите пароль" validate={phonesAreEqual} />
            </Col>
          </Row>
          <hr />
          <h2 className="agentEdit__title">
            Сегменты рынка
          </h2>
          <AreaSegments addSegment={this.handleAddSegment} segments={segments} />
          <div className="agentEdit__buttons">
            <Button buttonType="add" noBorder onClick={() => history.goBack()}>
              ОТМЕНА
            </Button>
            <Button>
              СОХРАНИТЬ
            </Button>
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

const selector = formValueSelector('AgentEditForm');

const mapStateToProps = state => ({
  password1: selector(state, 'password1'),
  password2: selector(state, 'password2'),
  citySuggestions: getCities(state),
  cityName: selector(state, 'cityName'),
  cityId: selector(state, 'cityId'),
  photo: selector(state, 'photo'),
});

const mapDispatchToProps = dispatch => ({
  loadCities: city => dispatch(loadCitySuggestions(city)),
  setAgentEditFormValues: data => dispatch(setAgentEditFormValuesAction(data)),
  uploadPhoto: photo => dispatch(agentUploadProfilePhoto(photo)),
});

export default compose(
  withRouter,
  reduxForm({
    form: 'AgentEditForm',
    initialValues: {
      phones: [{}],
      socialNetworks: [{}],
      birthDay: parseInt(moment().format('D'), 10),
      birthMonth: parseInt(moment().format('MM'), 10),
      birthYear: 2000,
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(AgentEditPage);
