"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperty = exports.filter = exports.lower = exports.print = exports.download = void 0;

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

exports.download = download;

var print = function print(table) {
  var printWindow = window.open();
  printWindow.document.write(table);
  printWindow.print();
  printWindow.close();
};

exports.print = print;

var lower = function lower(value) {
  return value.toString().toLowerCase();
};

exports.lower = lower;

var filter = function filter(search, constant, data) {
  return constant.filter(function (item, index) {
    var found = data[index].filter(function (filter) {
      return lower(filter).indexOf(search) !== -1;
    });
    return found.length > 0;
  });
};

exports.filter = filter;

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

exports.getProperty = getProperty;