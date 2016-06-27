/*!
 * OpenLayers 3 map scale control with scale string.
 * 
 * @package ol3-mapscale
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.1.1
 * @licence MIT https://opensource.org/licenses/MIT
 *          Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
 * @copyright (c) 2016, Vladimir Vershinin <ghettovoice@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("openlayers"));
	else if(typeof define === 'function' && define.amd)
		define(["openlayers"], factory);
	else if(typeof exports === 'object')
		exports["MapScale"] = factory(require("openlayers"));
	else
		root["ol"] = root["ol"] || {}, root["ol"]["control"] = root["ol"]["control"] || {}, root["ol"]["control"]["MapScale"] = factory(root["ol"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _control = __webpack_require__(1);

	var _control2 = _interopRequireDefault(_control);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * OpenLayers 3 map scale control.
	 * A map scale control with scale string.
	 *
	 * @author Vladimir Vershinin <ghettovoice@gmail.com>
	 * @licence MIT https://opensource.org/licenses/MIT
	 *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
	 * @copyright (c) 2016, Vladimir Vershinin
	 */
	exports.default = _control2.default;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _openlayers = __webpack_require__(4);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _util = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @typedef {Object} ControlOptions
	 * @property {Element | string | undefined} target Specify a target if you want the control to be rendered outside of the map's viewport.
	 * @property {string | string[] | undefined} className Custom class name of the control container element. Default is `ol-mapscale`.
	 * @property {string | string[] | undefined} scaleLineClassName Custom class name of the scale line container element. Default is `ol-scale-line`.
	 * @property {string | string[] | undefined} scaleValueClassName Custom class name of the scale value container element. Default is `ol-scale-value`.
	 * @property {boolean | undefined} scaleLine Show/hide scale line control. Default is true.
	 * @property {string[] | undefined} units Array of scale value units. Default is `['k', 'M', 'G']`.
	 * @property {number | undefined} digits The number of digits to appear after the decimal point. Default is 0.
	 */
	var ControlOptions;

	var DOTS_PER_INCH = 96;
	var INCHES_PER_METER = 39.37;

	/**
	 * MapScale control class.
	 *
	 * @class
	 * @extends {ol.control.Control}
	 * @author Vladimir Vershinin
	 */

	var Control = function (_ol$control$Control) {
	  _inherits(Control, _ol$control$Control);

	  /**
	   * @param {ControlOptions} options
	   */

	  function Control() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Control);

	    var className = options.className || 'ol-mapscale';
	    var scaleLineClassName = options.scaleLineClassName || "ol-scale-line";
	    var scaleValueClassName = options.scaleLineClassName || "ol-scale-value";
	    var render = Control.render;
	    var target = options.target;

	    var element = (0, _util.createElement)('div', className);

	    /**
	     * @type {string[]}
	     * @private
	     */

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Control).call(this, {
	      element: element,
	      render: render,
	      target: target
	    }));

	    _this.units_ = options.units;
	    /**
	     * @type {number}
	     * @private
	     */
	    _this.digits_ = options.digits;
	    /**
	     * @type {Element}
	     * @private
	     */
	    _this.scaleValueElement_ = (0, _util.createElement)('div', scaleValueClassName);
	    element.appendChild(_this.scaleValueElement_);

	    /**
	     * @private
	     * @type {olx.ViewState}
	     */
	    _this.viewState_ = undefined;

	    /**
	     * @type {ol.control.ScaleLine}
	     * @protected
	     */
	    _this.scaleLine_ = undefined;
	    if (options.scaleLine === undefined || options.scaleLine) {
	      var scaleLineElement = (0, _util.createElement)('div', 'ol-scale-line-target');
	      element.appendChild(scaleLineElement);

	      _this.scaleLine_ = new _openlayers2.default.control.ScaleLine({
	        target: scaleLineElement,
	        className: scaleLineClassName
	      });

	      _this.scaleLine_.on("change:units", _this.handleUnitsChanged_.bind(_this));
	    }
	    return _this;
	  }

	  /**
	   * @param {ol.MapEvent} mapEvent
	   * @this {Control}
	   */


	  _createClass(Control, [{
	    key: 'setMap',


	    /**
	     * @param {ol.Map} map
	     */
	    value: function setMap(map) {
	      this.scaleLine_ && this.scaleLine_.setMap(map);
	      _get(Object.getPrototypeOf(Control.prototype), 'setMap', this).call(this, map);
	    }

	    /**
	     * @private
	     */

	  }, {
	    key: 'handleUnitsChanged_',
	    value: function handleUnitsChanged_() {
	      this.updateElement_();
	    }

	    /**
	     * @private
	     */

	  }, {
	    key: 'updateElement_',
	    value: function updateElement_() {
	      var viewState = this.viewState_;

	      if (viewState) {
	        var resolution = viewState.resolution;
	        var projection = viewState.projection;
	        var pointResolution = projection.getMetersPerUnit() * resolution;
	        var scale = Math.round(pointResolution * DOTS_PER_INCH * INCHES_PER_METER);

	        this.scaleValueElement_.innerHTML = "1 : " + (0, _util.formatNumber)(scale, this.digits_, this.units_);
	      }
	    }
	  }], [{
	    key: 'render',
	    value: function render(mapEvent) {
	      var frameState = mapEvent.frameState;

	      if (frameState == null) {
	        this.viewState_ = null;
	      } else {
	        this.viewState_ = frameState.viewState;
	      }

	      this.updateElement_();
	    }
	  }]);

	  return Control;
	}(_openlayers2.default.control.Control);

	exports.default = Control;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createElement = createElement;
	exports.calculateDPI = calculateDPI;
	exports.formatNumber = formatNumber;
	/**
	 * @param {string} tagName
	 * @param {string|string[]} [classes]
	 * @returns {Element}
	 */
	function createElement(tagName, classes) {
	    var elem = document.createElement(tagName);

	    if (classes) {
	        elem.classList.add.apply(elem.classList, typeof classes === 'string' ? classes.split(' ') : classes);
	    }

	    return elem;
	}

	/**
	 * Calculates screen DPI based on css style.
	 *
	 * @returns {number|undefined}
	 */
	function calculateDPI() {
	    if (!document) {
	        return;
	    }

	    var inch = document.createElement("div");

	    inch.style.width = "1in";
	    inch.style.height = "1in";
	    inch.style.position = "fixed";
	    inch.style.left = "-100%";

	    document.body.appendChild(inch);

	    var dpi = inch.offsetWidth;
	    document.body.removeChild(inch);

	    return dpi;
	}

	/**
	 * Formats number.
	 *
	 * @param {number} num
	 * @param {number} digits
	 * @param {string[]} units
	 * @returns {string}
	 */
	function formatNumber(num) {
	    var digits = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var units = arguments.length <= 2 || arguments[2] === undefined ? ['k', 'M', 'G'] : arguments[2];

	    for (var i = units.length - 1; i >= 0; i--) {
	        var decimal = Math.pow(1000, i + 1);

	        if (num <= -decimal || num >= decimal) {
	            return parseFloat(num / decimal).toFixed(digits) + units[i];
	        }
	    }

	    return num;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;