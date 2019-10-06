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

const Utilities = {
  download,
  print,
  filter,
  getProperty,
  lower,
};

export default Utilities;
