"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Print = exports.Export = exports.Filter = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
Filter.propTypes = {
  onChange: _propTypes["default"].func
};
Filter.defaultProps = {
  onChange: null
};

var Export = function Export(props) {
  var className = props.className,
      onDropdown = props.onDropdown,
      onExport = props.onExport;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("button", {
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
Export.propTypes = {
  className: _propTypes["default"].string,
  onDropdown: _propTypes["default"].func,
  onExport: _propTypes["default"].func
};
Export.defaultProps = {
  className: '',
  onDropdown: null,
  onExport: null
};

var Print = function Print(props) {
  return (// eslint-disable-next-line jsx-a11y/control-has-associated-label
    _react["default"].createElement("button", {
      type: "button",
      className: "print",
      onClick: function onClick() {
        return props.onClick();
      }
    })
  );
};

exports.Print = Print;
Print.propTypes = {
  onClick: _propTypes["default"].func
};
Print.defaultProps = {
  onClick: null
};