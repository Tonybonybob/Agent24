import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import AutoComplete from '../../../components/common/AutoComplete';
import SearchIcon from '../../../assets/SearchIcon';
import ExtendInfo from '../../../assets/ExtendInfo';
import ShrinkInfo from '../../../assets/ShrinkInfo';
import Plus from '../../../assets/Plus';
import Close from '../../../assets/BigClose';
import { getCommonAddressSuggest, getAdminAreas, getMicrodistricts } from '../../../store/reducers/filters';
import { getAddressAsyncAction } from '../../../store/actions/filters';
import './style.scss';
class AddressAutocomplete extends Component {
  static propTypes = {
    getAddress: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.number,
    })).isRequired,
    adminAreas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.number,
    })).isRequired,
    microdistricts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.number,
    })).isRequired,
    reduxFormAdminAreas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.number,
    })).isRequired,
    reduxFormMicrodistricts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.number,
    })).isRequired,
  }


  constructor(props) {
    super(props);

    const { adminAreas, reduxFormAdminAreas, reduxFormMicrodistricts } = props;

    const filteredAdminAreas = adminAreas.map((adminArea) => {
      const isFilled = reduxFormAdminAreas.some(formAdminArea => formAdminArea.id === adminArea.id);

      const newMicrodistricts = adminArea.microdistricts.map((microdistrict) => {
        const isMicrodistrictFilled = reduxFormMicrodistricts
          .some(formMicrodistrict => formMicrodistrict.id === microdistrict.id);

        return { ...microdistrict, isFilled: isMicrodistrictFilled };
      });

      return { ...adminArea, isFilled, microdistricts: newMicrodistricts };
    });

    this.state = {
      addressName: '',
      isInputUntouched: false,
      adminAreasTouched: [],
      adminAreas: filteredAdminAreas,
    };

    this.inputRef = React.createRef();
    this.pseudoSuggestRef = React.createRef();

    this.handleSelect = this.handleSelect.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleClearField = this.handleClearField.bind(this);

    this.focusInput = this.focusInput.bind(this);
    this.handleAreaTouched = this.handleAreaTouched.bind(this);
    this.handleAddMicrodistrict = this.handleAddMicrodistrict.bind(this);
  }

  componentDidMount() {
    const { getAddress } = this.props;

    getAddress('');
  }

  componentDidUpdate(prevProps) {
    const { adminAreas, reduxFormAdminAreas, reduxFormMicrodistricts } = this.props;

    if (
      prevProps.adminAreas !== adminAreas
      || prevProps.reduxFormAdminAreas !== reduxFormAdminAreas
      || prevProps.reduxFormMicrodistricts !== reduxFormMicrodistricts
    ) {
      const filteredAdminAreas = adminAreas.map((adminArea) => {
        const isFilled = reduxFormAdminAreas
          .some(formAdminArea => formAdminArea.id === adminArea.id);

        const newMicrodistricts = adminArea.microdistricts.map((microdistrict) => {
          const isMicrodistrictFilled = reduxFormMicrodistricts
            .some(formMicrodistrict => formMicrodistrict.id === microdistrict.id);

          return { ...microdistrict, isFilled: isMicrodistrictFilled };
        });

        return { ...adminArea, isFilled, microdistricts: newMicrodistricts };
      });
      // eslint-disable-next-line
      this.setState({
        adminAreas: filteredAdminAreas,
      });
    }
  }

  handleSelect(event, { suggestion }) {
    const { array, filterData } = this.props;

    if (!suggestion.adminAreaId) { // it's adminAreaId
      array.push('adminAreas', { name: suggestion.name, id: suggestion.id });
    } else if (!suggestion.microdistrictId) { // it's microdisctricts
      array.push('micridistricts', { name: suggestion.name, id: suggestion.id });
    } else {
      array.push('streetHouses', { street: { name: suggestion.name, id: suggestion.id }, houses: [''] });
    }

    this.setState({
      addressName: suggestion.name,
    });

    filterData();
  }


  handleBlur(event) {
    if (this.pseudoSuggestRef.current
      && this.pseudoSuggestRef.current.contains(event.relatedTarget)) {
      event.preventDefault();
      return false;
    }
    this.setState({
      isInputUntouched: false,
    });

    return true;
  }

  handleChange(event, { newValue }) {
    const { getAddress } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const value = typeof newValue !== 'undefined' ? newValue : '';

    this.setState({
      addressName: value,
    });

    getAddress(value);
    return true;
  }

  handleFocus() {
    this.setState({
      isInputUntouched: true,
    });
  }

  handleClearField() {
    const { getAddress } = this.props;

    this.setState({
      addressName: '',
    });

    getAddress('');
  }

  handleAreaTouched(event) {
    const index = event.currentTarget.getAttribute('data-index');

    this.setState(prevState => ({
      adminAreasTouched: [
        ...prevState.adminAreasTouched.slice(0, index - 1),
        !prevState.adminAreasTouched[index],
        ...prevState.adminAreasTouched.slice(index + 1),
      ],
    }));
  }

  handleAddMicrodistrict(event) {
    const { array, reduxFormAdminAreas, reduxFormMicrodistricts, filterData } = this.props;
    
    const { adminAreas } = this.state;

    const index = event.currentTarget.getAttribute('data-microdistrictindex');
    const adminAreaIndex = Number(event.currentTarget.getAttribute('data-adminindex'));

    // eslint-disable-next-line
    if (isNaN(index)) { // want to push adminArea
        const newAdminArea = { ...adminAreas[adminAreaIndex] };
        
        console.log('aaaareaaa', newAdminArea)
        newAdminArea.isTouched = true;
        
        if (newAdminArea.isFilled) {
          const newAdminAreas = reduxFormAdminAreas.filter(admArea => admArea.id !== newAdminArea.id);

          array.splice('adminAreas', 0, 100, ...newAdminAreas);
        } else {
          array.push('adminAreas', newAdminArea);
          const newMicrodistricts = reduxFormMicrodistricts.filter(microdistrict => (
            microdistrict.adminAreaId !== newAdminArea.id
          ));

          array.splice('microdistricts', 0, 100, ...newMicrodistricts);  
        }

    } else {
        const newAdminArea = { ...adminAreas[adminAreaIndex] };

        const newMicrodistrict = newAdminArea.microdistricts[Number(index)];

        if (newAdminArea.isFilled) {
          const newAdminAreas = reduxFormAdminAreas.filter(admArea => admArea.id !== newAdminArea.id);

          array.splice('adminAreas', 0, 100, ...newAdminAreas);

          const newMicrodistricts = newAdminArea.microdistricts.filter(microdistrict => (
            microdistrict.id !== newMicrodistrict.id
          ));
          
          console.log(newMicrodistricts);

          array.push('microdistricts', ...newMicrodistricts);  
        } else {
          newMicrodistrict.isFilled = !newMicrodistrict.isFilled;
          newMicrodistrict.isTouched = true;

          newAdminArea.isFilled = newAdminArea.microdistricts
            .every(microdistrict => microdistrict.isFilled);

          if (newAdminArea.isFilled) {
            array.push('adminAreas', newAdminArea);
            newAdminArea.isTouched = true;
            const newMicrodistricts = reduxFormMicrodistricts.filter(microdistrict => (
              microdistrict.adminAreaId !== newAdminArea.id
            ));
            array.splice('microdistricts', 0, 100, ...newMicrodistricts);
          } else {
            const newMicrodistricts = reduxFormMicrodistricts.filter(md => md.id !== newMicrodistrict.id);
            console.log('newmd', newMicrodistricts);
            if (reduxFormMicrodistricts.length > 0 ? newMicrodistricts.length !== reduxFormMicrodistricts.length : false) {
              array.splice('microdistricts', 0, 100, ...newMicrodistricts);
            } else {
              array.push('microdistricts', newMicrodistrict);
            }
          }
        }
    }
    filterData();
  }

  focusInput() {
    setTimeout(this.inputRef.current.focus());
  }

  renderInput(inputProps) {
    const { addressName } = this.state;

    return (
      <div className="searchBar" onClick={this.handleFocus}>
        <input
          onFocus={this.handleFocus}
          {...inputProps}
          ref={this.inputRef}
          className="searchBar__input"
        />
        <span className="searchBar__icon">
          { addressName
            ? <Close onClick={this.handleClearField} />
            : <SearchIcon />
          }
        </span>
      </div>
    );
  }

  static renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div" className="xd">
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )))}
        <span className="addressAutocomplete__area">
          {!suggestion.adminAreaId
            ? 'адм. район'
            : !suggestion.microdistrictId
              ? 'микрорайон'
              : 'улица'
          }
        </span>
      </MenuItem>
    );
  }

  renderFakeSuggest() {
    const { reduxFormAdminAreas } = this.props;

    const {
      isInputUntouched, adminAreasTouched, addressName, adminAreas,
    } = this.state;

    return (
      isInputUntouched && addressName === '' && adminAreas.length > 0 && (
        <div onClick={this.focusInput} className="addressAutocomplete__pseudoSuggest" tabIndex="0" ref={this.pseudoSuggestRef}>
          {adminAreas.map((adminArea, index) => (
            <Fragment>
              <div
                className="filters__blockWithSvg"
                key={adminArea.name}
                data-index={index}
                onClick={this.handleAreaTouched}
              >
                {adminArea.name}
                {adminAreasTouched[index]
                  ? <ShrinkInfo />
                  : <ExtendInfo />
                }
              </div>
              {adminAreasTouched[index] && (
              <Fragment>
                <div
                  className={`filters__blockWithSvg filters__blockWithSvg_microdistrict
                    ${adminArea.isFilled ? 'filters__blockWithSvg_active' : ''}`
                  }
                  data-adminindex={index}
                  data-microdistrictindex="all"
                  onClick={this.handleAddMicrodistrict}
                >
                  <strong>Весь адм. район</strong>
                  <Plus className="addressAutocomplete__add" />
                </div>
                {adminArea.microdistricts.map((microdistrict, microdistrictIndex) => (
                  <div
                    className={`filters__blockWithSvg filters__blockWithSvg_microdistrict
                      ${microdistrict.isFilled || adminArea.isFilled ? 'filters__blockWithSvg_active' : ''}`
                    }
                    data-adminindex={index}
                    data-microdistrictindex={microdistrictIndex}
                    onClick={this.handleAddMicrodistrict}
                  >
                    {microdistrict.name}
                    <Plus className="addressAutocomplete__add" />
                  </div>
                ))}
              </Fragment>
            )}
            </Fragment>
          ))}
        </div>
    ));
  }

  render() {
    const { addressName } = this.state;

    const { suggestions, reduxFormAdminAreas, reduxFormMicrodistricts, reduxFormStreets } = this.props;
    
    const filteredSuggestions = suggestions.filter(suggestion => (
      !reduxFormAdminAreas.some(adminArea => (
        adminArea.id === suggestion.id // that's a chosen adm area
        || ((adminArea.id === suggestion.adminAreaId) && !suggestion.microdistrictId) // that's a microdistrict under chosen adm area, which is not street!
      ))
      && !reduxFormMicrodistricts.some(microdistrict => microdistrict.id === suggestion.id)
      && !reduxFormStreets.some(street => street.street.id === suggestion.id)
    ))
    
    console.log(filteredSuggestions);
    return (
      
      <ClickAwayListener onClickAway={this.handleBlur}>
        <div className="addressAutocomplete">
          <AutoComplete
            suggestions={addressName ? filteredSuggestions : []}
            handleSelect={this.handleSelect}
            handleChange={this.handleChange}
            renderInput={this.renderInput}
            renderSuggestion={AddressAutocomplete.renderSuggestion}
            handleBlur={this.handleBlur}
            value={addressName}
            label="Город"
          />
          {this.renderFakeSuggest()}
        </div>
      </ClickAwayListener>
    );
  }
}

const selector = formValueSelector('DescriptionFiltersForm');

const mapStateToProps = state => ({
  suggestions: getCommonAddressSuggest(state),
  adminAreas: getAdminAreas(state),
  reduxFormAdminAreas: selector(state, 'adminAreas'),
  reduxFormMicrodistricts: selector(state, 'microdistricts'),
  reduxFormStreets: selector(state, 'streetHouses'),
});

const mapDispatchToProps = dispatch => ({
  getAddress: data => dispatch(getAddressAsyncAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressAutocomplete);
