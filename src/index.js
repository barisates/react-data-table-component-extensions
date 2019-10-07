import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Filter, Export, Print } from './ui';
import Utilities from './utilities';
import ExportMethod from './export';

export class DataTableExtensions extends Component {
  constructor(props) {
    super(props);

    const { columns, data } = props;

    this.state = {
      dropdown: false,
      columns,
      data,
      constData: data,
    };

    this.raw = {
      header: [],
      data: [],
    };
  }

  componentDidMount() {
    const { columns } = this.state;

    // column properties and select fields to export
    columns.forEach(element => {
      if (element.export !== false) {
        this.raw.header.push(element);
      }
    });
  }

  onDataRender() {
    const { constData } = this.state;
    // get and render data
    this.raw.data = Utilities.dataRender(constData, this.raw.header);
  }

  onExport(e, type) {
    this.onDataRender();

    const { exportHeaders } = this.props;
    const { data, header } = this.raw;

    const exportData = ExportMethod[type](data, (exportHeaders ? header : null));

    Utilities.download(exportData);

    this.setState({ dropdown: false });

    e.preventDefault();
  }

  onFilter(e) {
    const value = Utilities.lower(e.target.value);

    const { constData } = this.state;

    let filtered = constData;

    if (value.length > 1) {
      this.onDataRender();

      filtered = Utilities.filter(value, constData, this.raw.data);
    }

    this.setState({ data: filtered });
  }

  onPrint() {
    this.onDataRender();

    const { data, header } = this.raw;
    const table = ExportMethod.print(data, header);

    Utilities.print(table);
  }

  render() {
    const { dropdown, columns, data } = this.state;
    const { filter, print, children } = this.props;
    return (
      <>
        <div className="data-table-extensions">
          {filter && <Filter onChange={e => this.onFilter(e)} />}
          <div className="data-table-extensions-action">
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {this.props.export && (
              <Export
                className={(dropdown ? 'drop' : '')}
                onDropdown={() => this.setState(prevState => ({ dropdown: !prevState.dropdown }))}
                onExport={(e, type) => this.onExport(e, type)}
              />
            )}
            {print && <Print onClick={() => this.onPrint()} />}
          </div>
        </div>
        {React.cloneElement(children, { columns, data })}
      </>

    );
  }
}

DataTableExtensions.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  filter: PropTypes.bool,
  export: PropTypes.bool,
  print: PropTypes.bool,
  exportHeaders: PropTypes.bool,
  children: PropTypes.node,
};

DataTableExtensions.defaultProps = {
  columns: [],
  data: [],
  filter: true,
  export: true,
  print: true,
  exportHeaders: false,
  children: null,
};
