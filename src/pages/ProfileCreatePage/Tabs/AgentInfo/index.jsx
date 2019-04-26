import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import Container from '../../../../components/Grid/Container';
import TextField from '../../../../components/common/TextField';
import { Button } from '../../../../components/general/Button';
import CroppableDropbox from '../../../../components/general/EditFormComponents/CroppableDropBox';
import FullNameLine from '../../../../components/general/EditFormComponents/FullNameLine';
import CityWithBirthdayLine from '../../../../components/general/EditFormComponents/CityWithBirthdayLine';
import Select from '../../../../components/common/Select';
import PhonesLine from './PhonesLine';
import { loadCitySuggestions } from '../../../../store/actions/newRequest';
import { setAgentEditFormValuesAction, agentUploadProfilePhoto } from '../../../../store/actions/agent';
import { getCities } from '../../../../store/reducers/newRequest';
import AreaSegments from '../../../../components/general/EditFormComponents/AreaSegments';
import './style.scss';
moment.locale('ru');

// eslint-disable-next-line
class AgentInfo extends Component {static propTypes = {
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
    const { goNextTab, valid, citySuggestions, cityName, cityId, photo } = this.props;

    const { segments } = this.state;

    const objectOperation = [
      { name: 'Продажа', value: 'sell' },
      { name: 'Покупка', value: 'buy' },
    ];

    const objectType = [
      { name: 'Квартира', value: 'flat' },
      { name: 'Дом', value: 'house' },
      { name: 'Земля', value: 'land' },
    ]

    return (
      <div className="agentInfo">
        <div className="agentInfo__mainInfo">
          <CroppableDropbox
            onDrop={this.handleAddPhoto}
            deletePhoto={this.handleDeletePhoto}
            photo={photo}
          />
          <div className="agentInfo__nameWithCity">
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
        <PhonesLine />
        <Row>
          <Col
            default={{
              col: 12,
            }}
            lg={{
              col: 3,
            }}
          >
            <TextField name="email" label="Email" />
          </Col>
          <Col
            default={{
              col: 12,
            }}
            lg={{
              col: 3,
            }}
          >
            <TextField name="password1" label="Пароль" />
          </Col>
          <Col
            default={{
              col: 12,
            }}
            lg={{
              col: 3,
            }}
          >
            <TextField name="password2" label="Подтверждение пароля" />
          </Col>
        </Row>
        <hr />
        <h2 className="agentEdit__title">
          Сегменты рынка
        </h2>
        <AreaSegments addSegment={this.handleAddSegment} segments={segments} />
        <div className="profileCreate__buttons">
          <Button buttonType="primary" disabled={!valid} onClick={goNextTab}>
            Далее
          </Button>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('AgentEditForm');

const mapStateToProps = state => ({
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
  reduxForm({
    form: 'AgentInfoForm',
    initialValues: {
      phones: [{}],
      birthDay: parseInt(moment().format('D'), 10),
      birthMonth: parseInt(moment().format('MM'), 10),
      birthYear: 2000,
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(AgentInfo);
