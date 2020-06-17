import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ onChange, placeholder }) => (
  <div className="data-table-extensions-filter">
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <label
      htmlFor="filterDataTable"
      className="icon"
    />
    <input
      type="text"
      name="filterDataTable"
      className="filter-text"
      placeholder={placeholder}
      onChange={e => onChange(e)}
    />
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

Filter.defaultProps = {
  onChange: null,
};

export const Export = props => {
  const { className, onDropdown, onClick } = props;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={`download ${className}`}
        onClick={() => onDropdown()}
      />
      <div className={`dropdown ${className}`}>
        <button type="button" onClick={e => onClick(e, 'csv')}>Csv File</button>
        <button type="button" onClick={e => onClick(e, 'excel')}>Excel File</button>
      </div>
    </>
  );
};

Export.propTypes = {
  className: PropTypes.string,
  onDropdown: PropTypes.func,
  onClick: PropTypes.func,
};

Export.defaultProps = {
  className: '',
  onDropdown: null,
  onClick: null,
};

export const Print = props => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button type="button" className="print" onClick={() => props.onClick()} />
);

Print.propTypes = {
  onClick: PropTypes.func,
};

Print.defaultProps = {
  onClick: null,
};
