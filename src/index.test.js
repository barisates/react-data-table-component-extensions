import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
import { DataTableExtensions } from './index';

it('renders without crashing with null data', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataTableExtensions><DataTable /></DataTableExtensions>, div);
  ReactDOM.unmountComponentAtNode(div);
});
