const csv = (data, header) => {
  const contentHeader = (header ? `${header.map(e => e.name).join(';')}\n` : '');
  const content = `${contentHeader}${data.map(e => e.join(';')).join('\n')}`;

  return {
    content,
    type: 'text/csv',
    name: `${document.title}.csv`,
  };
};

const excel = (data, header) => {
  const contentHeader = (header ? `<thead><tr><td>${header.map(e => e.name).join('</td><td>')}</td><tr></thead>` : '');
  const contentBody = data.map(e => `<tr><td>${e.join('</td><td>')}</td></tr>`);
  const content = `<table>${contentHeader}<tbody>${contentBody.join('')}</tbody></table>`;

  return {
    content,
    type: 'application/vnd.ms-excel',
    name: `${document.title}.xls`,
  };
};

const print = (data, header) => {
  const { content } = excel(data, header);

  const style = '\n' +
    'body, table { \n' +
    'font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; \n' +
    'font-size:12px \n' +
    '}\n' +
    'table {\n' +
    'width: 100%;\n' +
    '}\n' +
    'thead {\n' +
    'font-weight: bold;\n' +
    '}';
  return `<style>${style}</style>${content}`;
};

export const ExportMethod = {
  csv,
  excel,
  print,
};
