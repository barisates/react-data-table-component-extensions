"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactDom = require("react-dom");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var download = function download(props) {
  var content = props.content,
      type = props.type,
      name = props.name;
  var file = new Blob(["\uFEFF", content], {
    type: type
  });
  var link = document.createElement('a');
  link.id = "_export_datatable_".concat(name);
  link.download = name;
  link.href = window.URL.createObjectURL(file);
  document.body.appendChild(link);
  link.click();
  document.getElementById(link.id).remove();
};

var print = function print(table) {
  var printWindow = window.open();
  printWindow.document.write(table);
  printWindow.print();
  printWindow.close();
};

var lower = function lower(value) {
  return value.toString().toLowerCase();
};

var objectValues = function objectValues(item) {
  return Object.values(item).map(function (obj) {
    return _typeof(obj) === 'object' && obj !== null ? objectValues(obj) : obj;
  });
};

var filter = function filter(search, constant, data, filterHidden) {
  return constant.filter(function (item, index) {
    var value = (filterHidden ? objectValues(item) : Object.values(data[index])).join();
    var searchSplit = search.split(' ').filter(function (filterItem) {
      return filterItem !== '';
    });
    return searchSplit.filter(function (filterItem) {
      return lower(value).indexOf(filterItem.trim()) !== -1;
    }).length === searchSplit.length; // return (lower(value).indexOf(search.trim()) !== -1);
    // const found = data[index].filter(f => (lower(f).indexOf(search) !== -1));
    // return (found.length > 0);
  });
};

var getProperty = function getProperty(row, selector, format) {
  if (typeof selector !== 'string') {
    throw new Error('selector must be a . delimted string eg (my.property)');
  }

  if (format && typeof format === 'function') {
    return format(row);
  }

  return selector.split('.').reduce(function (acc, part) {
    if (!acc) {
      return null;
    } // O(n2) when querying for an array (e.g. items[0].name)
    // Likely, the object depth will be reasonable enough that performance is not a concern


    var arr = part.match(/[^\]\\[.]+/g);

    if (arr.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (var i = 0; i < arr.length; i++) {
        return acc[arr[i]][arr[i + 1]];
      }
    }

    return acc[part];
  }, row);
};

var dataRender = function dataRender(data, header) {
  var rawData = []; // get and render data

  data.forEach(function (element) {
    var row = [];
    header.forEach(function (head) {
      // Export Cell
      if (head.cellExport) {
        var exportData = head.cellExport(element);
        row.push(exportData); // row.push(`<table><tbody>${Object.keys(exportData).map(key => `<tr><td>${key}</td><td>${exportData[key].toString()}</td></tr>`).join('')}</tbody></table>`);
      } else if (head.cell) {
        // cell: render component and get innerText
        var div = document.createElement('div');
        (0, _reactDom.render)(head.cell(element), div);
        row.push(div.innerText);
        (0, _reactDom.unmountComponentAtNode)(div);
      } else {
        // get property
        row.push(getProperty(element, head.selector, head.format));
      }
    });
    rawData.push(row);
  });
  return rawData;
};

var concat = {
  csv: function csv(row) {
    var items = [];
    row.forEach(function (item) {
      if (_typeof(item) === 'object' && item !== null) {
        items.push(Object.keys(item).map(function (key) {
          return "".concat(key, ": ").concat(item[key]);
        }).join(';'));
      } else {
        items.push(item);
      }
    });
    return items.join(';');
  },
  excel: function excel(row) {
    var items = [];
    row.forEach(function (item) {
      if (_typeof(item) === 'object' && item !== null) {
        items.push("<table><tbody>".concat(Object.keys(item).map(function (key) {
          return "<tr><td>".concat(key, "</td><td>").concat(item[key], "</td></tr>");
        }).join(''), "</tbody></table>"));
      } else {
        items.push(item);
      }
    });
    return "<tr style=\"border-bottom:1px solid #000;\"><td style=\"border-right:1px solid #000;\">".concat(items.join('</td><td style="border-right:1px solid #000;">'), "</td></tr>");
  }
};
var Utilities = {
  download: download,
  print: print,
  filter: filter,
  getProperty: getProperty,
  lower: lower,
  dataRender: dataRender,
  concat: concat
};
var _default = Utilities;
exports["default"] = _default;