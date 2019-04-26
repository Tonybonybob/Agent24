import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import { connect } from 'react-redux';

import Row from '../../../../../components/Grid/Row';
import Col from '../../../../../components/Grid/Col';
import TextField from '../../../../../components/common/TextField';
import MultipleSourceWithLink from '../../../../../components/common/FormComponents/MultipleSourceWithLink';
import MultipleEmails from '../../../../../components/common/FormComponents/MultipleEmails';
import OnePhotoHolder from '../../../../../components/common/OnePhotoHolder';
import CroppableDropbox from '../../../../../components/general/EditFormComponents/CroppableDropBox';
import {
  addRegistrationLogoAsyncAction, addRegistrationLogo, setAuthCreateAgencyFormValuesAction, loadStreetsAsyncAction,
} from '../../../../../store/actions/auth';
import { getRegistrationLogo } from '../../../../../store/reducers/auth';
import AutoComplete from '../../../../../components/common/AutoComplete';
import './style.scss';
class Branch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
    };
  }

  handleAddPhoto = (photo) => {
    console.log(1);
    const { addRegistrationLogo, addTemporaryRegistrationLogo } = this.props;

    console.log(photo);

    addRegistrationLogo(photo);
    addTemporaryRegistrationLogo({ logo: photo });
  }

  handleDeletePhoto = () => {
    const { addTemporaryRegistrationLogo } = this.props;

    addTemporaryRegistrationLogo({ logo: '' });
  }

  handleStreetChange(event, { newValue }, index) {
    const { loadStreets, setAuthCreateAgencyFormValues, fields } = this.props;

    const fieldsCopy = [...fields.getAll()];

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const value = typeof newValue !== 'undefined' ? newValue : '';

    this.setState({
      isChosen: false,
    });

    console.log(index);
    
    fields.removeAll();
    fieldsCopy.forEach((el, fieldIndex) => fields.push({ ...el, streetName: index === fieldIndex ? value : '' }));

    loadStreets({ value, index });
    return true;
  }
  
  handleStreetSelect(event, { suggestion }, index) {
    const { setAuthCreateAgencyFormValues } = this.props;

    console.log(suggestion);

    const values = {
      streetName: suggestion.name,
      streetId: suggestion.id,
      index,
    };

    this.setState({
      isChosen: true,
    });

    setAuthCreateAgencyFormValues(values);
  }

  handleStreetBlur(event, _, index) {
    const { isChosen } = this.state;

    const { setAuthCreateAgencyFormValues } = this.props;

    if (isChosen) {
      event.preventDefault();
      return false;
    }

    console.log(index);

    setAuthCreateAgencyFormValues({
      streetName: '',
      streetId: '',
      index,
    });
    return true;
  }

  render() {
    const { fields, logo } = this.props;

    return (
      fields.map((branch, index) => {
        const branchInfo = fields.get(index);
    
        return (
          <div>
            {index !== 0 && <hr />}
            <Row className="branch">
              {branchInfo.isMain && (
                <div className="branch__photo">
                  <CroppableDropbox
                    onDrop={this.handleAddPhoto}
                    deletePhoto={this.handleDeletePhoto}
                    photo={logo}
                  />
                </div>
              )}
              <Col
                default={{
                  col: 12,
                }}
                lg={{
                  col: 10,
                }}
              >
                <Row>
                  <Col
                    default={{
                      col: 12,
                    }}
                    lg={{
                      col: 4,
                    }}
                  >
                    <TextField
                      name={`${branch}.name`}
                      label="Название"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    default={{
                      col: 12,
                    }}
                    lg={{
                      col: 7,
                    }}
                  >
                    <AutoComplete
                      suggestions={branchInfo.suggestions && branchInfo.suggestions.slice(0, 4)}
                      handleSelect={(...data) => this.handleStreetSelect(...data, index)}
                      handleChange={(...data) => this.handleStreetChange(...data, index)}
                      handleBlur={(...data) => this.handleStreetBlur(...data, index)}
                      value={branchInfo.streetName || ''}
                      label="Адрес"
                    />
                  </Col>
                  <Col
                    default={{
                      col: 3,
                    }}
                    lg={{
                      col: 1,
                    }}
                  >
                    <TextField
                      name={`${branch}.house`}
                      label="дом"
                    />
                  </Col>
                  <Col
                    default={{
                      col: 3,
                    }}
                    lg={{
                      col: 1,
                    }}
                  >
                    <TextField
                      name={`${branch}.office`}
                      label="офис"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <FieldArray name={`${branch}.links`} component={MultipleSourceWithLink} />
            <FieldArray name={`${branch}.emails`} component={MultipleEmails} />
            <Row>
              <Col
                default={{
                  col: 11,
                }}
                lg={{
                  col: 3,
                }}
              >
                <TextField name={`${branch}.contactPerson`} label="Контактное лицо" />
              </Col>
            </Row>
          </div>
        );
      })
    );
  }
}

const mapStateToProps = state => ({
  logo: getRegistrationLogo(state),
});

const mapDispatchToProps = dispatch => ({
  addRegistrationLogo: data => dispatch(addRegistrationLogoAsyncAction(data)),
  addTemporaryRegistrationLogo: data => dispatch(addRegistrationLogo(data)),
  setAuthCreateAgencyFormValues: data => dispatch(setAuthCreateAgencyFormValuesAction(data)),
  loadStreets: data => dispatch(loadStreetsAsyncAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
