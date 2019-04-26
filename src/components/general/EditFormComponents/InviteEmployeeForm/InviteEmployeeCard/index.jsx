import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';

import DefaultAvatar from '../../../../../assets/DefaultAvatar';
import Close from '../../../../../assets/BigClose';
import AutoComplete from '../../../../common/AutoComplete';
import TextField from '../../../../common/TextField';
import Row from '../../../../Grid/Row';
import Col from '../../../../Grid/Col';
import Select from '../../../../common/Select';
import Checkbox from '../../../../common/Checkbox';
import '../style.scss';
class Worker extends Component {
  static propTypes = {
    workers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }

  static defaultProps = {
    workers: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      workerPhoneIsWritten: false,
      phoneValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleClearField = this.handleClearField.bind(this);
  }

  handleSelect(event, { suggestion }) {
    this.setState({
      phoneValue: suggestion.value,
      workerPhoneIsWritten: true,
    });
  }

  handleClearField() {
    this.setState({ phoneValue: '' });
  }

  handleChange(event, { newValue }) {
    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const value = typeof newValue !== 'undefined' ? newValue : '';
    if (newValue.length < 14) {
      this.setState({
        phoneValue: value.split(' ').join(''),
      });
    }
    return true;
  }

  renderInput(inputProps) {
    const { phoneValue, workerPhoneIsWritten } = this.state;

    return (
      <div className="searchBar" style={{ width: '100%' }} onClick={this.handleFocus}>
        <input
          onFocus={this.handleFocus}
          {...inputProps}
          ref={this.inputRef}
          className="searchBar__input"
          disabled={workerPhoneIsWritten}
        />
        <span className="searchBar__icon">
          {phoneValue && workerPhoneIsWritten
            ? (
              <span
                className="searchBar__changeText"
                onClick={() => this.setState({ workerPhoneIsWritten: false })}
              >
                изменить
              </span>
            )
            : <Close onClick={this.handleClearField} />
          }
          {/* {!phoneValue && <SearchIcon />} */}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line
  renderSuggestion(suggestion, { query, isHighlighted }) {

    return (
      <MenuItem selected={isHighlighted} component="div" className="xd">
        <div className="agencyWorkerAutocomplete">
          {suggestion.photoId
            ? <img className="agencyWorkerAutocomplete__photo" src={suggestion.photoId} alt="" />
            : (
              <span className="agencyWorkerAutocomplete__photo">
                <DefaultAvatar />
              </span>
            )}
          <div className="agencyWorkerAutocomplete__description">
            {suggestion.name
              ? (
                <div>
                  <div className="agencyWorkerAutocomplete__name">
                    {suggestion.name}
                  </div>
                  <div className="agencyWorkerAutocomplete__type">
                    {suggestion.type}
                  </div>
                </div>
              ) : (
                <div className="agencyWorkerAutocomplete__name">
                  {`${suggestion.value}`}
                </div>
              )}
          </div>
          <div className="agencyWorkerAutocomplete__add">
            +
            {suggestion.name ? 'ПРИГЛАСИТЬ' : 'СОЗДАТЬ'}
          </div>
        </div>
      </MenuItem>
    );
  }

  render() {
    const { worker, workers, toSwap } = this.props;
    const { workerPhoneIsWritten, phoneValue } = this.state;

    const agencyWorkers = [...workers, ...(phoneValue.length === 13 ? [{ value: phoneValue }] : [])];

    return (
      <div>
        <Row className="mb-20">
          <Col default={{ col: 12 }} lg={{ col: 4 }}>
            <AutoComplete
              suggestions={agencyWorkers}
              handleSelect={this.handleSelect}
              handleChange={this.handleChange}
              renderInput={this.renderInput}
              renderSuggestion={this.renderSuggestion}
              value={phoneValue}
              label="Город"
            />
          </Col>
        </Row>
        {workerPhoneIsWritten && (
          <Row>
            <Col default={{ col: 11 }} lg={{ col: 3 }}>
              <TextField name={`${worker}.name`} label="Имя" />
            </Col>
            <Col default={{ col: 11 }} lg={{ col: 3 }}>
              <TextField name={`${worker}.secondName`} label="Фамилия" />
            </Col>
            <Col default={{ col: 11 }} lg={{ col: 3 }}>
              <TextField name={`${worker}.thirdName`} label="Отчество" />
            </Col>
            <Col default={{ col: 11 }} lg={{ col: 3 }}>
              <TextField name={`${worker}.email`} label="Email" />
            </Col>
            <Col default={{ col: 11 }} lg={{ col: 3 }}>
              <Select
                name={`${worker}.role`}
                items={[{ value: 'realtor', name: 'Риелтор' }]}
                label="Роль"
              />
            </Col>
            {toSwap && (
              <Col default={{ col: 11 }} lg={{ col: 3 }}>
                <Checkbox
                  name="swapDatas"
                  label="Заменить контактные данные на корпоративные"
                />
              </Col>
            )}
          </Row>
        )}
      </div>
    );
  }
}

export default Worker;
