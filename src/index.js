import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Filter, Export, Print } from './ui';
import Utilities from './utilities';
import ExportMethod from './export';

class DataTableExtensions extends Component {
  constructor(props) {
    super(props);

    const { columns, data, filterDigit } = props;

    this.state = {
      dropdown: false,
      columns,
      data,
      constData: data,
      filter: '',
      filterDigit,
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

  componentDidUpdate(prevProps) {
    const { columns, data, filterDigit } = this.props;
    const { filter } = this.state;

    if (prevProps.columns !== columns || prevProps.data !== data) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        columns,
        data,
        filterDigit,
        constData: data,
      }, () => {
        this.checkHeader();

        if (filter.length > filterDigit) {
          this.onFilter(filter);
        }
      });
    }
  }

  onDataRender() {
    const { constData } = this.state;
    // get and render data
    this.raw.data = Utilities.dataRender(constData, this.raw.header);
  }

  onExport(e, type) {
    this.onDataRender();

    const { exportHeaders, fileName } = this.props;
    const { data, header } = this.raw;

    const exportData = ExportMethod[type](data, (exportHeaders ? header : null), fileName);

    Utilities.download(exportData);

    this.setState({ dropdown: false });

    e.preventDefault();
  }

  onFilter(text) {
    const value = Utilities.lower(text);

    const { constData, filterDigit } = this.state;
    const { filterHidden } = this.props;

    let filtered = constData;
    if (value.length > filterDigit) {
      if (!filterHidden) {
        this.onDataRender();
      }
      filtered = Utilities.filter(value, constData, this.raw.data, filterHidden);
    }

    this.setState({ data: filtered, filter: value });
  }

  onPrint() {
    this.onDataRender();

    const { data, header } = this.raw;
    const table = ExportMethod.print(data, header);

    Utilities.print(table);
  }

  checkHeader() {
    const { columns } = this.state;
    if (columns.length !== this.raw.header.length) {
      this.raw.header = [];
      columns.forEach(element => {
        if (element.export !== false) {
          this.raw.header.push(element);
        }
      });
    }
  }

  render() {
    const { dropdown, columns, data } = this.state;
    const { filter, print, children, filterPlaceholder } = this.props;
    return (
      <>
        <div className="data-table-extensions">
          {filter && <Filter onChange={e => this.onFilter(e.target.value)} placeholder={filterPlaceholder} />}
          <div className="data-table-extensions-action">
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {this.props.export && (
              <Export
                className={(dropdown ? 'drop' : '')}
                onDropdown={() => this.setState(prevState => ({ dropdown: !prevState.dropdown }))}
                onClick={(e, type) => this.onExport(e, type)}
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
  filterPlaceholder: PropTypes.string,
  export: PropTypes.bool,
  print: PropTypes.bool,
  exportHeaders: PropTypes.bool,
  children: PropTypes.node,
  filterHidden: PropTypes.bool,
  filterDigit: PropTypes.number,
  fileName: PropTypes.string,
};

DataTableExtensions.defaultProps = {
  columns: [],
  data: [],
  filter: true,
  export: true,
  print: true,
  exportHeaders: false,
  children: null,
  filterHidden: true,
  filterPlaceholder: 'Filter Table',
  filterDigit: 2,
  fileName: document.title,
};

export default DataTableExtensions;
