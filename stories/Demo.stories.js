import React from 'react';
import DataTable from 'react-data-table-component';
import data from './constants/test-data';
import './css/demo.css';
import { DataTableExtensions } from '../src';

export default {
  title: 'Demo',
};

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Director',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Genres',
    selector: 'genres',
    sortable: true,
    cell: d => <span>{d.genres.join(', ')}</span>,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];


export const Demo = () => {
  const tableData = {
    columns,
    data,
  };

  return (
    <DataTableExtensions
      {...tableData}
    >
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
  );
};
