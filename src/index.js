import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './index.css'

const getProperty = (row, selector, format) => {
  if (typeof selector !== 'string') {
    throw new Error('selector must be a . delimted string eg (my.property)');
  }

  if (format && typeof format === 'function') {
    return format(row);
  }

  return selector.split('.').reduce((acc, part) => {
    if (!acc) {
      return null;
    }

    // O(n2) when querying for an array (e.g. items[0].name)
    // Likely, the object depth will be reasonable enough that performance is not a concern
    const arr = part.match(/[^\]\\[.]+/g);
    if (arr.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arr.length; i++) {
        return acc[arr[i]][arr[i + 1]];
      }
    }

    return acc[part];
  }, row);
};

export class DataTableExtensions extends Component {
  constructor(props) {
    super(props);

    const { columns, data } = props;

    this.state = {
      dropdown: false,
      columns: columns,
      data: data,
      lockedData: data
    };

    this.ExportHelper = {
      fileName: ext => (props.FileName ? `${props.FileName}.${ext}` : `${document.title}.${ext}`),
      download: (content, type, fileName) => {
        const file = new Blob(['\ufeff', content], { type });
        const link = document.createElement('a');

        link.id = `_export_datatable_${fileName}`;
        link.download = fileName;
        link.href = window.URL.createObjectURL(file);

        document.body.appendChild(link);

        link.click();
        document.getElementById(link.id).remove();
      },
    };

    this.ExportFile = {
      csv: (data, header) => {
        const contentHeader = (header ? `${header.map(e => e.name).join(';')}\n` : '');
        const content = `${contentHeader}${data.map(e => e.join(';')).join('\n')}`;

        this.ExportHelper.download(content, 'text/csv', this.ExportHelper.fileName('csv'));
      },
      excel: (data, header) => {
        const contentHeader = (header ? `<thead><tr><td>${header.map(e => e.name).join('</td><td>')}</td><tr></thead>` : '');
        const contentBody = data.map(e => `<tr><td>${e.join('</td><td>')}</td></tr>`);
        const table = `<table>${contentHeader}<tbody>${contentBody.join('')}</tbody></table>`;

        this.ExportHelper.download(table, 'application/vnd.ms-excel', this.ExportHelper.fileName('xls'));
      },
    };

    this.raw = {
      header: [],
      data: []
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
    const { data } = this.state;
    // get and render data
    data.forEach(element => {
      const row = [];
      this.raw.header.forEach((header, index) => {

        // cell: render component and get innerText
        if (header.cell) {
          const div = document.createElement('div');

          render(header.cell(element), div);

          row.push(div.innerText);
        } else { // get property
          row.push(getProperty(element, header.selector, header.format));
        }
      });

      this.raw.data.push(row);
    });
  }

  onExport(e, type) {

    const { Header } = this.props;

    this.onDataRender();

    // download file
    this.ExportFile[type](this.raw.data, (Header ? this.raw.header : null));

    this.setState({ dropdown: false });
    e.preventDefault();
  }
  onFilter(e) {

    const value = e.target.value.toString().toLowerCase();

    const { lockedData } = this.state;

    if (value.length > 1) {

      this.onDataRender();

      const filteredData = lockedData.filter((item, index) => {

        const rawData = this.raw.data[index];
        const indexs = rawData.filter(filter => (filter.toString().toLowerCase().indexOf(value) != -1))

        return (indexs.length > 0);

      });

      this.setState({ data: filteredData });

    } else {
      this.setState({ data: lockedData });
    }


  }
  render() {
    const { dropdown, columns, data } = this.state;
    const { ButtonTitle } = this.props;
    return (
      <Fragment>
        <div className="data-table-extensions">
          <div className="data-table-extensions-filter">
            <label htmlFor="filterDataTable" className="icon" />
            <input type="text" name="filterDataTable" className="filter-text" placeholder="Filter Table" onChange={(e) => this.onFilter(e)} />
          </div>
          <div className="data-table-extensions-action">
            <button type="button" className={"download " + (dropdown && 'drop')} onClick={() => this.setState(prevState => ({ dropdown: !prevState.dropdown }))}></button>
            <div className={"dropdown " + (dropdown && 'drop')}>
              <a href="#csv" onClick={e => this.onExport(e, 'csv')}>Csv File</a>
              <a href="#excel" onClick={e => this.onExport(e, 'excel')}>Excel File</a>
            </div>
            <button type="button" className="print"></button>
          </div>
        </div>
        {React.cloneElement(this.props.children, { columns, data })}
      </Fragment>

    );
  }
}

DataTableExtensions.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  Header: PropTypes.bool,
  FileName: PropTypes.string,
  ButtonTitle: PropTypes.string
};

DataTableExtensions.defaultProps = {
  columns: [],
  data: [],
  Header: false,
  FileName: null,
  ButtonTitle: "Export Table"
};