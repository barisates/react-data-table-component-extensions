import React from 'react';
import PropTypes from 'prop-types';

export const Filter = props => (
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
      placeholder="Filter Table"
      onChange={e => props.onChange(e)}
    />
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func,
};

Filter.defaultProps = {
  onChange: null,
};

export const Export = props => {
  const { className, onDropdown, onExport } = props;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={`download ${className}`}
        onClick={() => onDropdown()}
      />
      <div className={`dropdown ${className}`}>
        <a href="#csv" onClick={e => onExport(e, 'csv')}>Csv File</a>
        <a href="#excel" onClick={e => onExport(e, 'excel')}>Excel File</a>
      </div>
    </>
  );
};

Export.propTypes = {
  className: PropTypes.string,
  onDropdown: PropTypes.func,
  onExport: PropTypes.func,
};

Export.defaultProps = {
  className: '',
  onDropdown: null,
  onExport: null,
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
