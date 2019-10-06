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