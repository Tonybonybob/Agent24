import React from 'react';
import PropTypes from 'prop-types';
import { createNumberMask } from 'redux-form-input-masks';

import LineFromTill from '../LineFromTill';
import Plus from '../../../../assets/Plus';
import Close from '../../../../assets/Close';
import TextField from '../../../../components/common/TextField';

const FromTillComponent = ({
  values, ending, onAdd, onRemove, name, Component
}) => {
  const isActive = (Number(values[values.length - 1].from) && Number(values[values.length - 1].to))
    ? Number((values[values.length - 1].to) >= Number(values[values.length - 1].from))
    : (Number(values[values.length - 1].from) || Number(values[values.length - 1].to));
    
  const numbersMask = createNumberMask({
      allowEmpty: true,
    });

  console.log(values[values.length - 1].to, Number((values[values.length - 1].to) >= Number(values[values.length - 1].from)));
  return (
    <div>
      {values.map((value, index) => (
        (index !== values.length - 1) && (
          <LineFromTill
            prop={value}
            ending={ending}
            remove={event => onRemove(event, name, index)}
          />
        )
      ))}
      <div className="filters__addWrapper">
        <div className="filters__textfield">
          <Component
            name={`${name}[${values.length - 1}].from`}
            required={false}
            {...numbersMask}
            label="от"
          />
        </div>
        <div className="filters__textfield">
          <Component
            name={`${name}[${values.length - 1}].to`}
            required={false}
            {...numbersMask}
            label="до"
          />
        </div>
        <span>
          <Plus
            className="filters__plus"
            onClick={event => onAdd(
              event,
              name,
              isActive,
              {},
            )}
            fill={isActive ? '#0097A7' : '#D0D8DC'}
          />
        </span>
      </div>
    </div>
  );
};

FromTillComponent.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    till: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
  ending: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  Component: PropTypes.node,
};

FromTillComponent.defaultProps = {
  values: [{}],
  onAdd: () => { },
  onRemove: () => { },
  Component: TextField,
};

export default FromTillComponent;
