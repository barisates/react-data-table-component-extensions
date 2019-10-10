import { render, unmountComponentAtNode } from 'react-dom';

const download = props => {
  const { content, type, name } = props;

  const file = new Blob(['\ufeff', content], { type });

  const link = document.createElement('a');

  link.id = `_export_datatable_${name}`;
  link.download = name;
  link.href = window.URL.createObjectURL(file);

  document.body.appendChild(link);

  link.click();

  document.getElementById(link.id).remove();
};

const print = table => {
  const printWindow = window.open();
  printWindow.document.write(table);
  printWindow.print();
  printWindow.close();
};

const lower = value => (value.toString().toLowerCase());

const filter = (search, constant, data) =>
  (constant.filter((item, index) => {
    const found = data[index].filter(f => (lower(f).indexOf(search) !== -1));
    return (found.length > 0);
  }));

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

const dataRender = (data, header) => {
  const rawData = [];
  // get and render data
  data.forEach(element => {
    const row = [];
    header.forEach(head => {
      // Export Cell
      if (head.cellExport) {
        const exportData = head.cellExport(element);
        row.push(exportData);
        // row.push(`<table><tbody>${Object.keys(exportData).map(key => `<tr><td>${key}</td><td>${exportData[key].toString()}</td></tr>`).join('')}</tbody></table>`);
      } else if (head.cell) { // cell: render component and get innerText
        const div = document.createElement('div');
        render(head.cell(element), div);
        row.push(div.innerText);
        unmountComponentAtNode(div);
      } else { // get property
        row.push(getProperty(element, head.selector, head.format));
      }
    });

    rawData.push(row);
  });
  return rawData;
};

const concat = {
  csv: row => {
    const items = [];

    row.forEach(item => {
      if (typeof item === 'object') {
        items.push(Object.keys(item).map(key => `${key}: ${item[key]}`).join(';'));
      } else {
        items.push(item);
      }
    });

    return items.join(';');
  },
  excel: row => {
    const items = [];

    row.forEach(item => {
      if (typeof item === 'object') {
        items.push(`<table><tbody>${Object.keys(item).map(key => `<tr><td>${key}</td><td>${item[key]}</td></tr>`).join('')}</tbody></table>`);
      } else {
        items.push(item);
      }
    });

    return `<tr style="border-bottom:1px solid #000;"><td style="border-right:1px solid #000;">${items.join('</td><td style="border-right:1px solid #000;">')}</td></tr>`;
  },
};

const Utilities = {
  download,
  print,
  filter,
  getProperty,
  lower,
  dataRender,
  concat,
};

export default Utilities;
