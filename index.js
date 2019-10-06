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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTableExtensions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.css");

var _ui = require("./ui");

var _utilities = require("./utilities");

var _export = require("./export");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DataTableExtensions =
/*#__PURE__*/
function (_Component) {
  _inherits(DataTableExtensions, _Component);

  function DataTableExtensions(props) {
    var _this;

    _classCallCheck(this, DataTableExtensions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataTableExtensions).call(this, props));
    var columns = props.columns,
        data = props.data;
    _this.state = {
      dropdown: false,
      columns: columns,
      data: data,
      constData: data
    };
    _this.raw = {
      header: [],
      data: []
    };
    return _this;
  }

  _createClass(DataTableExtensions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var columns = this.state.columns; // column properties and select fields to export

      columns.forEach(function (element) {
        if (element["export"] !== false) {
          _this2.raw.header.push(element);
        }
      });
    }
  }, {
    key: "onDataRender",
    value: function onDataRender() {
      var _this3 = this;

      var data = this.state.data; // get and render data

      data.forEach(function (element) {
        var row = [];

        _this3.raw.header.forEach(function (header, index) {
          // cell: render component and get innerText
          if (header.cell) {
            var div = document.createElement('div');
            (0, _reactDom.render)(header.cell(element), div);
            row.push(div.innerText);
            (0, _reactDom.unmountComponentAtNode)(div);
          } else {
            // get property
            row.push((0, _utilities.getProperty)(element, header.selector, header.format));
          }
        });

        _this3.raw.data.push(row);
      });
    }
  }, {
    key: "onExport",
    value: function onExport(e, type) {
      this.onDataRender();
      var exportHeaders = this.props.exportHeaders;
      var _this$raw = this.raw,
          data = _this$raw.data,
          header = _this$raw.header;

      var exportData = _export.ExportMethod[type](data, exportHeaders ? header : null);

      (0, _utilities.download)(exportData);
      this.setState({
        dropdown: false
      });
      e.preventDefault();
    }
  }, {
    key: "onFilter",
    value: function onFilter(e) {
      var value = (0, _utilities.lower)(e.target.value);
      var constData = this.state.constData;
      var filtered = constData;

      if (value.length > 1) {
        this.onDataRender();
        filtered = (0, _utilities.filter)(value, constData, this.raw.data);
      }

      this.setState({
        data: filtered
      });
    }
  }, {
    key: "onPrint",
    value: function onPrint() {
      this.onDataRender();
      var _this$raw2 = this.raw,
          data = _this$raw2.data,
          header = _this$raw2.header;

      var table = _export.ExportMethod['print'](data, header);

      (0, _utilities.print)(table);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          dropdown = _this$state.dropdown,
          columns = _this$state.columns,
          data = _this$state.data;
      var _this$props = this.props,
          filter = _this$props.filter,
          print = _this$props.print;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
        className: "data-table-extensions"
      }, filter && _react["default"].createElement(_ui.Filter, {
        onChange: function onChange(e) {
          return _this4.onFilter(e);
        }
      }), _react["default"].createElement("div", {
        className: "data-table-extensions-action"
      }, this.props["export"] && _react["default"].createElement(_ui.Export, {
        className: dropdown && 'drop',
        onDropdown: function onDropdown() {
          return _this4.setState(function (prevState) {
            return {
              dropdown: !prevState.dropdown
            };
          });
        },
        onExport: function onExport(e, type) {
          return _this4.onExport(e, type);
        }
      }), print && _react["default"].createElement(_ui.Print, {
        onClick: function onClick() {
          return _this4.onPrint();
        }
      }))), _react["default"].cloneElement(this.props.children, {
        columns: columns,
        data: data
      }));
    }
  }]);

  return DataTableExtensions;
}(_react.Component);

exports.DataTableExtensions = DataTableExtensions;
DataTableExtensions.propTypes = {
  columns: _propTypes["default"].array,
  data: _propTypes["default"].array,
  filter: _propTypes["default"].bool,
  "export": _propTypes["default"].bool,
  print: _propTypes["default"].bool,
  exportHeaders: _propTypes["default"].bool,
  fileName: _propTypes["default"].string
};
DataTableExtensions.defaultProps = {
  columns: [],
  data: [],
  filter: true,
  "export": true,
  print: true,
  exportHeaders: false,
  fileName: null
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Print = exports.Export = exports.Filter = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Filter = function Filter(props) {
  return _react["default"].createElement("div", {
    className: "data-table-extensions-filter"
  }, _react["default"].createElement("label", {
    htmlFor: "filterDataTable",
    className: "icon"
  }), _react["default"].createElement("input", {
    type: "text",
    name: "filterDataTable",
    className: "filter-text",
    placeholder: "Filter Table",
    onChange: function onChange(e) {
      return props.onChange(e);
    }
  }));
};

exports.Filter = Filter;

var Export = function Export(props) {
  var className = props.className,
      onDropdown = props.onDropdown,
      onExport = props.onExport;
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("button", {
    type: "button",
    className: "download ".concat(className),
    onClick: function onClick() {
      return onDropdown();
    }
  }), _react["default"].createElement("div", {
    className: "dropdown ".concat(className)
  }, _react["default"].createElement("a", {
    href: "#csv",
    onClick: function onClick(e) {
      return onExport(e, 'csv');
    }
  }, "Csv File"), _react["default"].createElement("a", {
    href: "#excel",
    onClick: function onClick(e) {
      return onExport(e, 'excel');
    }
  }, "Excel File")));
};

exports.Export = Export;

var Print = function Print(props) {
  return _react["default"].createElement("button", {
    type: "button",
    className: "print",
    onClick: function onClick(e) {
      return props.onClick();
    }
  });
};

exports.Print = Print;
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
