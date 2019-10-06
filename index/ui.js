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