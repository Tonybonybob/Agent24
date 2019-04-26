import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import AutoComplete from '../../AutoComplete';
import {
  getMicrodistrictSuggestions, getNewRequest,
} from '../../../../store/reducers/newRequest';
import {
  setNewRequestFormValuesAction, loadMicroDistrictSuggestions, setNewRequestNamesAction,
} from '../../../../store/actions/newRequest';

class MicrodistrictAutoSuggest extends PureComponent {
  constructor(props) {
    super(props);

    this.autoSuggestRef = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { adminAreaId, microdistrictId } = this.props;

    if (!isNaN(adminAreaId) && adminAreaId && !microdistrictId) {
      this.autoSuggestRef.current.autoCompleteRef.current.input.focus();
    }
  }

  handleChange(event, { newValue }) {
    const {
      loadMicrodistrict, cityId, setNewRequestNames,
      setNewRequestFormValues, microdistrictId,
    } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    loadMicrodistrict(newValue, cityId || null);

    setNewRequestNames({
      microdistrictName: newValue,
      microdistrictChosen: false,
    });

    if (microdistrictId) {
      setNewRequestFormValues({ microdistrictId: null });
    }
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { setNewRequestFormValues, setNewRequestNames } = this.props;

    setNewRequestNames({
      microdistrictName: suggestion.name,
      microdistrictChosen: true,
    });

    setNewRequestFormValues({
      microdistrictId: suggestion.id,
    });
  }

  handleBlur(event) {
    const { setNewRequestNames, microdistrictChosen } = this.props;

    if (!microdistrictChosen) {
      setNewRequestNames({
        microdistrictName: '',
        microdistrictChosen: false,
        microdistrictTouched: true,
      });
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const {
      microdistrictName, microdistrictSuggestions, microdistrictChosen, microdistrictTouched,
    } = this.props;

    const suggestions = microdistrictChosen
      ? []
      : microdistrictSuggestions;

    return (
      <AutoComplete
        ref={this.autoSuggestRef}
        suggestions={suggestions}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        error={microdistrictTouched && !microdistrictName}
        value={microdistrictName}
        placeholder="Микрорайон"
        resizableInput
      />
    );
  }
}

MicrodistrictAutoSuggest.propTypes = {
  microdistrictName: PropTypes.string,
  microdistrictChosen: PropTypes.bool,
  microdistrictSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  setNewRequestFormValues: PropTypes.func.isRequired,
  adminAreaId: PropTypes.number,
  loadMicrodistrict: PropTypes.func.isRequired,
  setNewRequestNames: PropTypes.func.isRequired,
  cityId: PropTypes.number,
  microdistrictId: PropTypes.number,
  microdistrictTouched: PropTypes.bool,
};

MicrodistrictAutoSuggest.defaultProps = {
  cityId: '',
  microdistrictName: '',
  microdistrictId: '',
  adminAreaId: '',
  microdistrictChosen: false,
  microdistrictTouched: false,
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  microdistrictSuggestions: getMicrodistrictSuggestions(state),
  cityId: selector(state, 'cityId'),
  adminAreaId: selector(state, 'adminAreaId'),
  microdistrictId: selector(state, 'microdistrictId'),
  microdistrictName: getNewRequest(state).microdistrictName,
  microdistrictChosen: getNewRequest(state).microdistrictChosen,
  microdistrictTouched: getNewRequest(state).microdistrictTouched,
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data => dispatch(setNewRequestFormValuesAction(data)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadMicrodistrict: (...args) => dispatch(loadMicroDistrictSuggestions(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MicrodistrictAutoSuggest);
