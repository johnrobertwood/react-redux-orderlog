import React, { PropTypes } from 'react';

const SelectAuthor = ({name, label, onChange, defaultOption, value, options}) => {
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
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={Math.random()} value={option.value}>{option.text}</option>;
          })
          }
        </select>
      </div>
     </div> 
  );
};

SelectAuthor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectAuthor;