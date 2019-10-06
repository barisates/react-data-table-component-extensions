"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportMethod = void 0;

var csv = function csv(data, header) {
  var contentHeader = header ? "".concat(header.map(function (e) {
    return e.name;
  }).join(';'), "\n") : '';
  var content = "".concat(contentHeader).concat(data.map(function (e) {
    return e.join(';');
  }).join('\n'));
  return {
    content: content,
    type: 'text/csv',
    name: "".concat(document.title, ".csv")
  };
};

var excel = function excel(data, header) {
  var contentHeader = header ? "<thead><tr><td>".concat(header.map(function (e) {
    return e.name;
  }).join('</td><td>'), "</td><tr></thead>") : '';
  var contentBody = data.map(function (e) {
    return "<tr><td>".concat(e.join('</td><td>'), "</td></tr>");
  });
  var content = "<table>".concat(contentHeader, "<tbody>").concat(contentBody.join(''), "</tbody></table>");
  return {
    content: content,
    type: 'application/vnd.ms-excel',
    name: "".concat(document.title, ".xls")
  };
};

var print = function print(data, header) {
  var content = excel(data, header).content;
  var style = '\
    body, table { \
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; \
        font-size:12px \
    }\
    table {\
        width: 100%;\
    }\
    thead {\
        font-weight: bold;\
    }';
  return "<style>".concat(style, "</style>").concat(content);
};

var ExportMethod = {
  csv: csv,
  excel: excel,
  print: print
};
exports.ExportMethod = ExportMethod;