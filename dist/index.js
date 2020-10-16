"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("./ui");

var _utilities = _interopRequireDefault(require("./utilities"));

var _export = _interopRequireDefault(require("./export"));

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
      constData: data,
      filter: ''
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props = this.props,
          columns = _this$props.columns,
          data = _this$props.data;
      var filter = this.state.filter;

      if (prevProps.columns !== columns || prevProps.data !== data) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          columns: columns,
          data: data,
          constData: data
        }, function () {
          _this3.checkHeader();

          if (filter.length > 2) {
            _this3.onFilter(filter);
          }
        });
      }
    }
  }, {
    key: "onDataRender",
    value: function onDataRender() {
      var constData = this.state.constData; // get and render data

      this.raw.data = _utilities["default"].dataRender(constData, this.raw.header);
    }
  }, {
    key: "onExport",
    value: function onExport(e, type) {
      this.onDataRender();
      var exportHeaders = this.props.exportHeaders;
      var _this$raw = this.raw,
          data = _this$raw.data,
          header = _this$raw.header;

      var exportData = _export["default"][type](data, exportHeaders ? header : null);

      _utilities["default"].download(exportData);

      this.setState({
        dropdown: false
      });
      e.preventDefault();
    }
  }, {
    key: "onFilter",
    value: function onFilter(text) {
      var value = _utilities["default"].lower(text);

      var constData = this.state.constData;
      var filterHidden = this.props.filterHidden;
      var filtered = constData;

      if (value.length > 2) {
        if (!filterHidden) {
          this.onDataRender();
        }

        filtered = _utilities["default"].filter(value, constData, this.raw.data, filterHidden);
      }

      this.setState({
        data: filtered,
        filter: value
      });
    }
  }, {
    key: "onPrint",
    value: function onPrint() {
      this.onDataRender();
      var _this$raw2 = this.raw,
          data = _this$raw2.data,
          header = _this$raw2.header;

      var table = _export["default"].print(data, header);

      _utilities["default"].print(table);
    }
  }, {
    key: "checkHeader",
    value: function checkHeader() {
      var _this4 = this;

      var columns = this.state.columns;

      if (columns.length !== this.raw.header.length) {
        this.raw.header = [];
        columns.forEach(function (element) {
          if (element["export"] !== false) {
            _this4.raw.header.push(element);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          dropdown = _this$state.dropdown,
          columns = _this$state.columns,
          data = _this$state.data;
      var _this$props2 = this.props,
          filter = _this$props2.filter,
          print = _this$props2.print,
          children = _this$props2.children,
          filterPlaceholder = _this$props2.filterPlaceholder;
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
        className: "data-table-extensions"
      }, filter && _react["default"].createElement(_ui.Filter, {
        onChange: function onChange(e) {
          return _this5.onFilter(e.target.value);
        },
        placeholder: filterPlaceholder
      }), _react["default"].createElement("div", {
        className: "data-table-extensions-action"
      }, this.props["export"] && _react["default"].createElement(_ui.Export, {
        className: dropdown ? 'drop' : '',
        onDropdown: function onDropdown() {
          return _this5.setState(function (prevState) {
            return {
              dropdown: !prevState.dropdown
            };
          });
        },
        onClick: function onClick(e, type) {
          return _this5.onExport(e, type);
        }
      }), print && _react["default"].createElement(_ui.Print, {
        onClick: function onClick() {
          return _this5.onPrint();
        }
      }))), _react["default"].cloneElement(children, {
        columns: columns,
        data: data
      }));
    }
  }]);

  return DataTableExtensions;
}(_react.Component);

DataTableExtensions.propTypes = {
  columns: _propTypes["default"].array,
  data: _propTypes["default"].array,
  filter: _propTypes["default"].bool,
  filterPlaceholder: _propTypes["default"].string,
  "export": _propTypes["default"].bool,
  print: _propTypes["default"].bool,
  exportHeaders: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  filterHidden: _propTypes["default"].bool
};
DataTableExtensions.defaultProps = {
  columns: [],
  data: [],
  filter: true,
  "export": true,
  print: true,
  exportHeaders: false,
  children: null,
  filterHidden: true,
  filterPlaceholder: 'Filter Table'
};
var _default = DataTableExtensions;
exports["default"] = _default;