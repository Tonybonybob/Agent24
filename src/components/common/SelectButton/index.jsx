import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import LinkToModal from '../LinkToModal';
import IconArrowDown from '../../../assets/ArrowDownStroke';
import './style.scss';
const Option = (props) => {
  const { setValue, children, data } = props;
  
  return (
    data.isLink ? (
      <LinkToModal
        className={`selectButton__CustomOption ${data.className}`}
        onClick={() => {
          setValue('');
        }}
        queryParam={data.to}
      >
        {children}
      </LinkToModal>
    ) : (
      <div
        className={`selectButton__CustomOption ${data.className}`}
        onClick={() => {
          setValue('');
          data.onClick();
        }}
      >
        {children}
      </div>
    )
  );
};

const SelectButton = ({
  selected, onChange, options, className, placeholder,
}) => (
  <Select
    components={{ Option }}
    placeholder={(
      <span>
        {placeholder}
        <IconArrowDown />
      </span>
    )}
    isSearchable={false}
    className={`${className} selectButton`}
    classNamePrefix="selectButton"
    options={options}
    value={selected}
    onChange={onChange}
  />
);

SelectButton.propTypes = {
  selected: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

SelectButton.defaultProps = {
  className: '',
};

export default SelectButton;
