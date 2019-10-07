import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
import { DataTableExtensions } from '../index';
import { columns, data } from './ignore/constants';

it('renders without crashing: null data', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataTableExtensions><DataTable /></DataTableExtensions>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders without crashing: test data', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DataTableExtensions
      columns={columns}
      data={data}
    >
      <DataTable />
    </DataTableExtensions>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing: filter extensions disabled', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DataTableExtensions
      columns={columns}
      data={data}
      filter={false}
      print={false}
      export={false}
    >
      <DataTable />
    </DataTableExtensions>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
