import React, { PropTypes } from 'react';

const SelectStatus = ({name, label, onChange, value, options}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        {/*Note, value is set here rather than on the option*/}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-contrl">
          {options.map((option) => {
            return <option key={Math.random()} value={option.value}>{option.text}</option>;
          })
          }
        </select>
      </div>
     </div> 
  );
};

SelectStatus.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectStatus;