"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = _interopRequireDefault(require("./utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var csv = function csv(data, header) {
  var contentHeader = header ? "".concat(header.map(function (e) {
    return e.name;
  }).join(';'), "\n") : '';
  var content = "".concat(contentHeader).concat(data.map(function (e) {
    return _utilities["default"].concat.csv(e);
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
    return _utilities["default"].concat.excel(e);
  });
  var content = "<table>".concat(contentHeader, "<tbody>").concat(contentBody.join(''), "</tbody></table>");
  return {
    content: content,
    type: 'application/vnd.ms-excel',
    name: "".concat(document.title, ".xls")
  };
};

var print = function print(data, header) {
  var _excel = excel(data, header),
      content = _excel.content;

  var style = '\n' + 'body, table { \n' + 'font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; \n' + 'font-size:12px \n' + '}\n' + 'table {\n' + 'width: 100%;\n' + '}\n' + 'thead {\n' + 'font-weight: bold;\n' + '}';
  return "<style>".concat(style, "</style>").concat(content);
};

var ExportMethod = {
  csv: csv,
  excel: excel,
  print: print
};
var _default = ExportMethod;
exports["default"] = _default;