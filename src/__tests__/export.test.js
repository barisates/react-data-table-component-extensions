import { columns, data } from './ignore/constants';
import Utilities from '../utilities';
import ExportMethod from '../export';

const raw = {
  header: [],
  data: [],
};

const render = () => {
  // column properties and select fields to export
  columns.forEach(element => {
    if (element.export !== false) {
      raw.header.push(element);
    }
  });

  // get and render data
  raw.data = Utilities.dataRender(data, raw.header);
};

it('export without crashing: excel', () => {
  render();

  const excelData = ExportMethod.excel(raw.data, raw.header);

  if (excelData === null) {
    throw new Error();
  }
});

it('export without crashing: csv', () => {
  render();

  const csvData = ExportMethod.csv(raw.data, raw.header);

  if (csvData === null) {
    throw new Error();
  }
});

it('export without crashing: print', () => {
  render();

  const printData = ExportMethod.print(raw.data, raw.header);

  if (printData === null) {
    throw new Error();
  }
});
