import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import AutosizeInput from 'react-input-autosize';

import PureTextField from '../PureTextField';
import './style.scss';
class AutoComplete extends Component {
  static propTypes = {
    handleSelect: PropTypes.func,
    handleChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    handleBlur: PropTypes.func,
    suggestions: PropTypes.array,
    suggestionsFetchRequested: PropTypes.func,
    suggestionsClearRequested: PropTypes.func,
    renderSuggestion: PropTypes.func,
    renderInput: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    shouldRenderSuggestions: PropTypes.func,
    resizableInput: PropTypes.bool,
  };

  static defaultProps = {
    handleSelect: () => {},
    handleChange: () => {},
    onKeyDown: () => {},
    handleBlur: () => {},
    suggestions: [],
    suggestionsFetchRequested: () => {},
    suggestionsClearRequested: () => {},
    shouldRenderSuggestions: () => true,
    value: '',
    label: '',
    placeholder: '',
    resizableInput: false,
  };

  constructor(props) {
    super(props);

    this.autoCompleteRef = React.createRef();

    this.renderInput = this.renderInput.bind(this);
  }

  static getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  static renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  renderInput(inputProps) {
    const { overflow } = this.props;

    const {
      ref,
      label,
      placeholder,
      resizableInput,
      error,
      ...other
    } = inputProps;

    return resizableInput ? (
      <div className="resizeInputHolder">
        <AutosizeInput
          placeholder={placeholder}
          inputRef={ref}
          className={`resizeInput ${error ? 'resizeInput_error' : ''}`}
          {...other}
        />
        {error && <span className="resizeInput__errorText">Обязательно</span>}
      </div>
    ) : (
      <PureTextField
        label={label}
        placeholder={placeholder}
        fullWidth
        error={error}
        helperText={error && 'Обязательно'}
        inputProps={{ autoComplete: 'xd', className: 'autoComplete__input' }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          inputRef: ref,
          ...other,
        }}
        overflow={overflow}
      />
    );
  }

  static renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem
        selected={isHighlighted}
        component="div"
        className="autoComplete__item"
      >
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
        </div>
      </MenuItem>
    );
  }

  render() {
    const {
      handleSelect,
      suggestions,
      suggestionsFetchRequested,
      pattern,
      type,
      suggestionsClearRequested,
      label,
      value,
      handleChange,
      onKeyDown,
      resizableInput,
      handleBlur,
      renderSuggestion,
      renderInput,
      placeholder,
      error,
      ...other
    } = this.props;
    return (
      <Autosuggest
        ref={this.autoCompleteRef}
        theme={{
          container: 'autoComplete',
          suggestionsContainerOpen: 'autoComplete__suggestionsContainerOpen',
          suggestionsList: 'autoComplete__suggestionsList',
          suggestion: 'autoComplete__suggestion',
        }}
        renderInputComponent={renderInput || this.renderInput}
        suggestions={suggestions || []}
        onSuggestionsFetchRequested={suggestionsFetchRequested}
        onSuggestionsClearRequested={suggestionsClearRequested}
        renderSuggestionsContainer={AutoComplete.renderSuggestionsContainer}
        onSuggestionSelected={handleSelect}
        getSuggestionValue={AutoComplete.getSuggestionValue}
        renderSuggestion={renderSuggestion || AutoComplete.renderSuggestion}
        inputProps={{
          error,
          placeholder,
          label,
          value,
          onChange: handleChange,
          onKeyDown: onKeyDown,
          onBlur: handleBlur,
          pattern,
          type,
          resizableInput,
        }}
        {...other}
      />
    );
  }
}

export default AutoComplete;
