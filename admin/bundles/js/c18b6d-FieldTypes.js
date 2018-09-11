require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Example options:

// flags: 'progressive'
// flags: ['progressive']
// quality: 80
// crop: 'fit', 'fill'
// gravity: 'face'
// fetch_format: 'auto'
// width: 300
// height: 300
// effect: blur:200

var TYPES = [{ name: 'crop', prefix: 'c' }, { name: 'effect', prefix: 'e' }, { name: 'fetch_format', prefix: 'f' }, { name: 'flags', prefix: 'fl' }, { name: 'gravity', prefix: 'g' }, { name: 'height', prefix: 'h' }, { name: 'radius', prefix: 'r' }, { name: 'quality', prefix: 'q' }, { name: 'width', prefix: 'w' }];

module.exports = function (id, options) {
  if (!options) options = {};

  var scheme = options.secure ? 'https' : 'http';
  var cloud_name = options.cloud_name;
  if (!cloud_name) throw Error('Missing required options.cloud_name');

  var params = [];

  for (var i = 0; i < TYPES.length; i++) {
    var name = TYPES[i].name;
    var prefix = TYPES[i].prefix;

    if (Array.isArray(options[name])) {
      options[name].forEach(function (opt) {
        params.push(prefix + '_' + opt);
      });
    } else if (options[name] != null) {
      params.push(prefix + '_' + options[name]);
    }
  }

  var urlParams = params.length ? params.join(',') + '/' : '';
  return scheme + '://res.cloudinary.com/' + encodeURIComponent(options.cloud_name) + '/image/upload/' + urlParams + encodeURIComponent(id);
};

},{}],2:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.alert.color.danger,
	error: _theme2.default.alert.color.danger,
	info: _theme2.default.alert.color.info,
	success: _theme2.default.alert.color.success,
	warning: _theme2.default.alert.color.warning
};

},{"../../../theme":80}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// clone children if a class exists for the tagname
var cloneWithClassnames = function cloneWithClassnames(c) {
	var type = c.type && c.type.displayName ? c.type.displayName : c.type || null;

	if (!type || !_styles2.default[type]) return c;

	return (0, _react.cloneElement)(c, {
		className: (0, _glamor.css)(_styles2.default[type])
	});
};

function Alert(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    color = _ref.color,
	    Component = _ref.component,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'color', 'component']);

	props.className = (0, _glamor.css)(_styles2.default.alert, _styles2.default[color], className);
	props.children = _react.Children.map(children, cloneWithClassnames);

	return _react2.default.createElement(Component, _extends({}, props, { 'data-alert-type': color }));
};

Alert.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)).isRequired,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string])
};
Alert.defaultProps = {
	component: 'div'
};

module.exports = Alert;

},{"./colors":2,"./styles":4,"glamor":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	colorVariants[color] = {
		backgroundColor: _colors2.default[color].background,
		borderColor: _colors2.default[color].border,
		color: _colors2.default[color].text
	};
});

// Prepare headings
var headingTagnames = {};
['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function (tag) {
	headingTagnames[tag] = { color: 'inherit' };
});

var linkStyles = {
	color: 'inherit',
	textDecoration: 'underline',

	':hover': { color: 'inherit' },
	':focus': { color: 'inherit' }
};

module.exports = _extends({
	alert: {
		borderColor: 'transparent',
		borderRadius: _theme2.default.alert.borderRadius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.alert.borderWidth,
		margin: _theme2.default.alert.margin,
		padding: _theme2.default.alert.padding
	},

	// tagnames
	a: linkStyles,
	Link: linkStyles,
	strong: {
		fontWeight: 500
	}

}, headingTagnames, colorVariants);

},{"../../../theme":80,"./colors":2}],5:[function(require,module,exports){
'use strict';

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function BlankState(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    heading = _ref.heading,
	    Component = _ref.component,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'heading', 'component']);

	props.className = (0, _glamor.css)(classes.container, className);

	return _react2.default.createElement(
		Component,
		props,
		!!heading && _react2.default.createElement(
			'h2',
			{ 'data-e2e-blank-state-heading': true, className: (0, _glamor.css)(classes.heading) },
			heading
		),
		children
	);
};

BlankState.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	heading: _react.PropTypes.string
};
BlankState.defaultProps = {
	component: 'div'
};

/* eslint quote-props: ["error", "as-needed"] */

var classes = {
	container: {
		backgroundColor: _theme2.default.blankstate.background,
		borderRadius: _theme2.default.blankstate.borderRadius,
		color: _theme2.default.blankstate.color,
		paddingBottom: _theme2.default.blankstate.paddingVertical,
		paddingLeft: _theme2.default.blankstate.paddingHorizontal,
		paddingRight: _theme2.default.blankstate.paddingHorizontal,
		paddingTop: _theme2.default.blankstate.paddingVertical,
		textAlign: 'center'
	},

	heading: {
		color: 'inherit',

		':last-child': {
			marginBottom: 0
		}
	}
};

module.exports = BlankState;

},{"../../../theme":80,"glamor":undefined,"react":undefined}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commonClasses = _styles2.default.common;
var stylesheetCache = {};
function getStyleSheet(variant, color) {
	var cacheKey = variant + '-' + color;
	if (!stylesheetCache[cacheKey]) {
		var variantStyles = _styles2.default[variant](color);
		stylesheetCache[cacheKey] = variantStyles;
	}
	return stylesheetCache[cacheKey];
}

var BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
var BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
var BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];

// NOTE must NOT be functional component to allow `refs`

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    active = _props.active,
			    aphroditeStyles = _props.aphroditeStyles,
			    block = _props.block,
			    className = _props.className,
			    color = _props.color,
			    Tag = _props.component,
			    disabled = _props.disabled,
			    size = _props.size,
			    variant = _props.variant,
			    props = _objectWithoutProperties(_props, ['active', 'aphroditeStyles', 'block', 'className', 'color', 'component', 'disabled', 'size', 'variant']);

			// get the styles


			var variantClasses = getStyleSheet(variant, color);
			props.className = _glamor.css.apply(undefined, [commonClasses.base, commonClasses[size], variantClasses.base, block ? commonClasses.block : null, disabled ? commonClasses.disabled : null, active ? variantClasses.active : null].concat(_toConsumableArray(aphroditeStyles)));
			if (className) {
				props.className += ' ' + className;
			}

			// return an anchor or button
			if (!Tag) {
				Tag = props.href ? 'a' : 'button';
			}
			// Ensure buttons don't submit by default
			if (Tag === 'button' && !props.type) {
				props.type = 'button';
			}

			return _react2.default.createElement(Tag, props);
		}
	}]);

	return Button;
}(_react.Component);

;

Button.propTypes = {
	active: _react.PropTypes.bool,
	aphroditeStyles: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	})),
	block: _react.PropTypes.bool,
	color: _react.PropTypes.oneOf(BUTTON_COLORS),
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	disabled: _react.PropTypes.bool,
	href: _react.PropTypes.string,
	size: _react.PropTypes.oneOf(BUTTON_SIZES),
	variant: _react.PropTypes.oneOf(BUTTON_VARIANTS)
};
Button.defaultProps = {
	aphroditeStyles: [],
	color: 'default',
	variant: 'fill'
};

module.exports = Button;

},{"./styles":7,"glamor":undefined,"react":undefined}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Button
// ==============================

var _css = require('../../../utils/css');

var _color = require('../../../utils/color');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Common Styles
// ----------------

exports.common = {
	// Base Button
	// ----------------
	base: {
		'appearance': 'none',
		'background': 'none',
		'borderWidth': _theme2.default.button.borderWidth,
		'borderStyle': 'solid',
		'borderColor': 'transparent',
		'borderRadius': _theme2.default.button.borderRadius,
		'cursor': 'pointer',
		'display': 'inline-block',
		'fontWeight': _theme2.default.button.font.weight,
		'height': _theme2.default.component.height,
		'lineHeight': _theme2.default.component.lineHeight,
		'marginBottom': 0,
		'padding': '0 ' + _theme2.default.button.paddingHorizontal,
		'outline': 0,
		'textAlign': 'center',
		'touchAction': 'manipulation',
		'userSelect': 'none',
		'verticalAlign': 'middle',
		'whiteSpace': 'nowrap',

		':hover': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		},
		':focus': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		}
	},
	// Block Display
	// ----------------
	block: {
		display: 'block',
		width: '100%'
	},
	// Disabled
	// ----------------
	disabled: {
		opacity: 0.4,
		pointerEvents: 'none'
	},
	// Sizes
	// ----------------
	large: {
		fontSize: _theme2.default.font.size.large
	},
	default: {
		fontSize: _theme2.default.font.size.default
	},
	small: {
		fontSize: _theme2.default.font.size.small
	},
	xsmall: {
		fontSize: _theme2.default.font.size.xsmall,
		lineHeight: '1.9',
		paddingLeft: '.66em',
		paddingRight: '.66em'
	}
};

// Fill Variant
// ----------------
function buttonFillVariant(textColor, bgColor) {
	var hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: (0, _color.darken)(bgColor, 5) + ' ' + (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 15),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: textColor,
		outline: 'none'
	});
	var focusStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: (0, _color.darken)(bgColor, 5) + ' ' + (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 15),
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(bgColor, 25),
		color: textColor,
		outline: 'none'
	});
	var activeStyles = {
		backgroundColor: (0, _color.darken)(bgColor, 10),
		backgroundImage: 'none',
		borderColor: (0, _color.darken)(bgColor, 25) + ' ' + (0, _color.darken)(bgColor, 15) + ' ' + (0, _color.darken)(bgColor, 10),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 5), (0, _color.darken)(bgColor, 10), bgColor), {
			'borderColor': (0, _color.darken)(bgColor, 10) + ' ' + (0, _color.darken)(bgColor, 20) + ' ' + (0, _color.darken)(bgColor, 25),
			'boxShadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
			'color': textColor,
			'fontWeight': 400,
			'textShadow': '0 -1px 0 rgba(0, 0, 0, 0.25)',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}
// TODO: This is pretty hacky, needs to be consolidated with the Variant() method
// above (needs more theme variables to be implemented though)
function buttonFillDefault() {
	var borderColor = _theme2.default.input.border.color.default;
	var hoverStyles = _extends({}, (0, _css.gradientVertical)('#fff', '#eee'), {
		borderColor: (0, _color.darken)(borderColor, 5) + ' ' + (0, _color.darken)(borderColor, 5) + ' ' + (0, _color.darken)(borderColor, 10),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: _theme2.default.color.text
	});
	var focusStyles = {
		borderColor: _theme2.default.color.primary,
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(_theme2.default.color.primary, 10),
		color: _theme2.default.color.text,
		outline: 'none'
	};
	var activeStyles = {
		background: '#e6e6e6',
		borderColor: (0, _color.darken)(borderColor, 10),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: _theme2.default.color.text
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)('#fafafa', '#eaeaea'), {
			'borderColor': borderColor + ' ' + (0, _color.darken)(borderColor, 6) + ' ' + (0, _color.darken)(borderColor, 12),
			'color': _theme2.default.color.text,
			'textShadow': '0 1px 0 white',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),

		// gross hack
		active: _extends({}, activeStyles, {

			':hover': activeStyles,
			':focus': _extends({}, activeStyles, focusStyles, {
				boxShadow: '0 0 0 3px ' + (0, _color.fade)(_theme2.default.color.primary, 10) + ', inset 0 1px 2px rgba(0, 0, 0, 0.1)'
			}),
			':active': activeStyles
		})
	};
}
exports.fill = function (color) {
	switch (color) {
		case 'default':
			return buttonFillDefault();
		case 'cancel':
		case 'delete':
			return buttonFillVariant('white', _theme2.default.button.danger.bgColor);
		default:
			return buttonFillVariant('white', _theme2.default.button[color].bgColor);
	}
};

// Hollow Variant
// ----------------
function buttonHollowVariant(textColor, borderColor) {
	var focusAndHoverStyles = {
		backgroundImage: 'none',
		backgroundColor: (0, _color.fade)(borderColor, 15),
		borderColor: (0, _color.darken)(borderColor, 15),
		boxShadow: 'none',
		color: textColor,
		outline: 'none'
	};
	var focusOnlyStyles = {
		boxShadow: '0 0 0 3px ' + (0, _color.fade)(borderColor, 10)
	};
	var activeStyles = {
		backgroundColor: (0, _color.fade)(borderColor, 35),
		borderColor: (0, _color.darken)(borderColor, 25),
		boxShadow: 'none'
	};

	return {
		base: {
			'background': 'none',
			'borderColor': borderColor,
			'color': textColor,

			':hover': focusAndHoverStyles,
			':focus ': _extends({}, focusAndHoverStyles, focusOnlyStyles),
			':active': activeStyles
		},
		active: activeStyles
	};
};
exports.hollow = function (color) {
	// TODO: better handling of cancel and delete colors
	if (color === 'cancel' || color === 'delete') color = 'danger';

	return buttonHollowVariant(_theme2.default.button[color].bgColor, _theme2.default.button[color].borderColor);
};

// Link Variant
// ----------------
function buttonLinkVariant(textColor, hoverColor) {
	var hoverStyles = {
		color: hoverColor,
		textDecoration: 'underline'
	};
	return {
		base: {
			'background': 'none',
			'border': 0,
			'boxShadow': 'none',
			'color': textColor,
			'fontWeight': 'normal',
			'outline': 'none',

			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': hoverStyles
		},
		active: hoverStyles
	};
};
function buttonLinkDelete() {
	var styles = buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
	var hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(_theme2.default.color.danger, 10), (0, _color.darken)(_theme2.default.color.danger, 10)), {
		backgroundColor: _theme2.default.color.danger,
		borderColor: (0, _color.darken)(_theme2.default.color.danger, 4) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 12),
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: 'white',
		textDecoration: 'none'
	});
	var activeStyles = {
		backgroundColor: (0, _color.darken)(_theme2.default.color.danger, 4),
		backgroundImage: 'none',
		borderColor: (0, _color.darken)(_theme2.default.color.danger, 12) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8) + ' ' + (0, _color.darken)(_theme2.default.color.danger, 8),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: 'white'
	};
	return {
		base: _extends({}, styles.base, {
			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}

exports.link = function (color) {
	switch (color) {
		case 'default':
			return buttonLinkVariant(_theme2.default.color.link, _theme2.default.color.linkHover);
		case 'cancel':
			return buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
		case 'delete':
			return buttonLinkDelete();
		default:
			return buttonLinkVariant(_theme2.default.color[color], _theme2.default.color[color]);
	}
};

},{"../../../theme":80,"../../../utils/color":83,"../../../utils/css":85}],8:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Center(_ref) {
	var className = _ref.className,
	    Component = _ref.component,
	    height = _ref.height,
	    style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'height', 'style']);

	props.className = (0, _glamor.css)(_styles2.default.center, className);
	props.style = _extends({ height: height }, style);

	return _react2.default.createElement(Component, props);
};
Center.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
Center.defaultProps = {
	component: 'div',
	height: 'auto'
};

module.exports = Center;

},{"./styles":9,"glamor":undefined,"react":undefined}],9:[function(require,module,exports){
'use strict';

// ==============================
// Center
// ==============================

module.exports = {
	center: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

},{}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseColors = {};
['danger', 'info', 'primary', 'success', 'warning'].forEach(function (color) {
	baseColors[color] = {
		background: (0, _color.fade)(_theme2.default.color[color], 10),
		backgroundActive: (0, _color.fade)(_theme2.default.color[color], 20),
		backgroundHover: (0, _color.fade)(_theme2.default.color[color], 15),
		text: _theme2.default.color[color]
	};
});
var invertedColors = {};
['danger', 'info', 'primary', 'success', 'warning'].forEach(function (color) {
	invertedColors[color + '__inverted'] = {
		background: _theme2.default.color[color],
		backgroundActive: (0, _color.lighten)(_theme2.default.color[color], 5),
		backgroundHover: (0, _color.lighten)(_theme2.default.color[color], 15),
		text: 'white'
	};
});

module.exports = _extends({
	default: {
		background: _theme2.default.color.gray10,
		backgroundActive: _theme2.default.color.gray20,
		backgroundHover: _theme2.default.color.gray15,
		text: _theme2.default.color.gray60
	}
}, baseColors, {

	// inverted
	default__inverted: {
		background: _theme2.default.color.gray60,
		backgroundActive: (0, _color.lighten)(_theme2.default.color.gray60, 5),
		backgroundHover: (0, _color.lighten)(_theme2.default.color.gray60, 15),
		text: 'white'
	}
}, invertedColors);

},{"../../../theme":80,"../../../utils/color":83}],11:[function(require,module,exports){
'use strict';

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Chip(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    color = _ref.color,
	    inverted = _ref.inverted,
	    label = _ref.label,
	    onClear = _ref.onClear,
	    onClick = _ref.onClick,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'color', 'inverted', 'label', 'onClear', 'onClick']);

	props.className = (0, _glamor.css)(_styles2.default.chip, className);
	var labelClassName = (0, _glamor.css)(_styles2.default.button, _styles2.default.label, _styles2.default['button__' + color + (inverted ? '__inverted' : '')]);
	var clearClassName = (0, _glamor.css)(_styles2.default.button, _styles2.default.clear, _styles2.default['button__' + color + (inverted ? '__inverted' : '')]);

	return _react2.default.createElement(
		'div',
		props,
		_react2.default.createElement(
			'button',
			{ type: 'button', onClick: onClick, className: labelClassName },
			label,
			children
		),
		!!onClear && _react2.default.createElement(
			'button',
			{ type: 'button', onClick: onClear, className: clearClassName },
			'\xD7'
		)
	);
};

Chip.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)).isRequired,
	inverted: _react.PropTypes.bool,
	label: _react2.default.PropTypes.string.isRequired,
	onClear: _react2.default.PropTypes.func,
	onClick: _react2.default.PropTypes.func
};
Chip.defaultProps = {
	color: 'default'
};

module.exports = Chip;

},{"./colors":10,"./styles":12,"glamor":undefined,"react":undefined}],12:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _css = require('../../../utils/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	var hoverStyles = {
		backgroundColor: _colors2.default[color].backgroundHover
	};

	colorVariants['button__' + color] = {
		backgroundColor: _colors2.default[color].background,
		color: _colors2.default[color].text,

		':hover': hoverStyles,
		':focus': hoverStyles,
		':active': {
			backgroundColor: _colors2.default[color].backgroundActive
		}
	};
});

module.exports = _extends({
	chip: {
		display: 'inline-block',
		fontSize: _theme2.default.font.size.small,
		fontWeight: 500,
		marginRight: '0.5em',
		overflow: 'hidden',
		lineHeight: '2.2em'
	},

	// tagnames
	button: {
		appearance: 'none',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		display: 'block',
		float: 'left',
		padding: '0 .9em',
		outline: 'none',

		// make pills - exaggerate the padding toward the radii so it looks even
		':first-child': _extends({}, (0, _css.borderLeftRadius)('3em'), {
			paddingLeft: '1.1em'
		}),
		':last-child': _extends({}, (0, _css.borderRightRadius)('3em'), {
			paddingRight: '1.1em'
		})
	},

	// provide separation between the label and clear buttons
	// floating stops the margins from collapsing into eaching

	label: { marginRight: 1 },
	clear: { marginLeft: 1 }

}, colorVariants);

},{"../../../theme":80,"../../../utils/css":85,"./colors":10}],13:[function(require,module,exports){
'use strict';

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Container(_ref) {
	var className = _ref.className,
	    clearFloatingChildren = _ref.clearFloatingChildren,
	    Component = _ref.component,
	    width = _ref.width,
	    props = _objectWithoutProperties(_ref, ['className', 'clearFloatingChildren', 'component', 'width']);

	props.className = (0, _glamor.css)(_styles2.default.container, _styles2.default[width], clearFloatingChildren ? _styles2.default.clearfix : null);
	props.className = props.className + ' ' + className;
	return _react2.default.createElement(Component, props);
};

Container.propTypes = {
	clearFloatingChildren: _react.PropTypes.bool,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	width: _react.PropTypes.oneOf(Object.keys(_sizes2.default)).isRequired
};
Container.defaultProps = {
	component: 'div',
	width: 'large'
};

module.exports = Container;

},{"./sizes":14,"./styles":15,"glamor":undefined,"react":undefined}],14:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.container.size.small,
	medium: _theme2.default.container.size.medium,
	large: _theme2.default.container.size.large
};

},{"../../../theme":80}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Container
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare sizes
var sizeVariants = {};
Object.keys(_sizes2.default).forEach(function (size) {
	sizeVariants[size] = {
		maxWidth: _sizes2.default[size]
	};
});

/*
	Micro clearfix hack
	1.	The space content is one way to avoid an Opera bug when the
			contenteditable attribute is included anywhere else in the document.
			Otherwise it causes space to appear at the top and bottom of elements
			that are clearfixed.
	2.	The use of `table` rather than `block` is only necessary if using
			`:before` to contain the top-margins of child elements.
*/
var clearfixStyles = {
	clear: 'both',
	content: '" "', // 1
	display: 'table' // 2
};

module.exports = _extends({
	container: {
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingLeft: _theme2.default.container.gutter,
		paddingRight: _theme2.default.container.gutter
	},

	// clear floating children
	clearfix: {
		':before': clearfixStyles,
		':after': clearfixStyles
	}

}, sizeVariants);

},{"../../../theme":80,"./sizes":14}],16:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function DropdownButton(_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		_Button2.default,
		props,
		children,
		_react2.default.createElement('span', { className: (0, _glamor.css)(classes.arrow) })
	);
};

// NOTE
// 1: take advantage of `currentColor` by leaving border top color undefined
// 2: even though the arrow is vertically centered, visually it appears too low
//    because of lowercase characters beside it
var classes = {
	arrow: {
		borderLeft: '0.3em solid transparent',
		borderRight: '0.3em solid transparent',
		borderTop: '0.3em solid', // 1
		display: 'inline-block',
		height: 0,
		marginTop: '-0.125em', // 2
		verticalAlign: 'middle',
		width: 0,

		// add spacing
		':first-child': {
			marginRight: '0.5em'
		},
		':last-child': {
			marginLeft: '0.5em'
		}
	}
};

module.exports = DropdownButton;

},{"../Button":6,"glamor":undefined,"react":undefined}],17:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _FormLabel = require('../FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormField = function (_Component) {
	_inherits(FormField, _Component);

	function FormField() {
		_classCallCheck(this, FormField);

		var _this = _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this));

		_this.formFieldId = generateId();
		return _this;
	}

	_createClass(FormField, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				formFieldId: this.formFieldId
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _context = this.context,
			    _context$formLayout = _context.formLayout,
			    formLayout = _context$formLayout === undefined ? 'basic' : _context$formLayout,
			    labelWidth = _context.labelWidth;

			var _props = this.props,
			    aphroditeStyles = _props.aphroditeStyles,
			    children = _props.children,
			    className = _props.className,
			    cropLabel = _props.cropLabel,
			    htmlFor = _props.htmlFor,
			    label = _props.label,
			    offsetAbsentLabel = _props.offsetAbsentLabel,
			    props = _objectWithoutProperties(_props, ['aphroditeStyles', 'children', 'className', 'cropLabel', 'htmlFor', 'label', 'offsetAbsentLabel']);

			props.className = (0, _glamor.css)(_styles2.default.FormField, _styles2.default['FormField--form-layout-' + formLayout], offsetAbsentLabel ? _styles2.default['FormField--offset-absent-label'] : null, aphroditeStyles);
			if (className) {
				props.className += ' ' + className;
			}
			if (offsetAbsentLabel && labelWidth) {
				props.style = _extends({
					paddingLeft: labelWidth
				}, props.style);
			}

			// elements
			var componentLabel = label ? _react2.default.createElement(
				_FormLabel2.default,
				{ htmlFor: htmlFor, cropText: cropLabel },
				label
			) : null;

			return _react2.default.createElement(
				'div',
				_extends({}, props, { htmlFor: htmlFor }),
				componentLabel,
				children
			);
		}
	}]);

	return FormField;
}(_react.Component);

;

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormField.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
FormField.childContextTypes = {
	formFieldId: _react.PropTypes.string
};
FormField.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	children: _react.PropTypes.node,
	cropLabel: _react.PropTypes.bool,
	htmlFor: _react2.default.PropTypes.string,
	label: _react2.default.PropTypes.string,
	offsetAbsentLabel: _react2.default.PropTypes.bool
};

function generateId() {
	return Math.random().toString(36).substr(2, 9);
};

module.exports = FormField;

},{"../FormLabel":22,"./styles":18,"glamor":undefined,"react":undefined}],18:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // ==============================
// Form Field
// ==============================

module.exports = {
	'FormField': {
		marginBottom: '1em',
		position: 'relative'
	},

	// when inside a horizontal form

	'FormField--form-layout-horizontal': _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
		display: 'table',
		tableLayout: 'fixed',
		width: '100%'
	}),

	// inside horizontal form
	// typically for use with submit button inside
	'FormField--offset-absent-label': {
		paddingLeft: _theme2.default.form.label.width
	},

	// when inside an inline form

	'FormField--form-layout-inline': {
		'display': 'inline-block',
		'paddingLeft': '0.25em',
		'paddingRight': '0.25em',
		'verticalAlign': 'top',

		':first-child': { paddingLeft: 0 },
		':last-child': { paddingRight: 0 }
	}
};

},{"../../../theme":80}],19:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _concatClassnames = require('../../../utils/concatClassnames');

var _concatClassnames2 = _interopRequireDefault(_concatClassnames);

var _noedit = require('./noedit');

var _noedit2 = _interopRequireDefault(_noedit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// NOTE must NOT be functional component to allow `refs`

var FormInput = function (_Component) {
	_inherits(FormInput, _Component);

	function FormInput() {
		_classCallCheck(this, FormInput);

		return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).apply(this, arguments));
	}

	_createClass(FormInput, [{
		key: 'blur',
		value: function blur() {
			this.target.blur();
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.target.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    aphroditeStyles = _props.aphroditeStyles,
			    className = _props.className,
			    disabled = _props.disabled,
			    id = _props.id,
			    multiline = _props.multiline,
			    noedit = _props.noedit,
			    size = _props.size,
			    props = _objectWithoutProperties(_props, ['aphroditeStyles', 'className', 'disabled', 'id', 'multiline', 'noedit', 'size']);

			// NOTE return a different component for `noedit`


			if (noedit) return _react2.default.createElement(_noedit2.default, this.props);

			var _context = this.context,
			    formFieldId = _context.formFieldId,
			    formLayout = _context.formLayout;


			props.id = id || formFieldId;
			props.className = _glamor.css.apply(undefined, [_styles2.default.FormInput, _styles2.default['FormInput__size--' + size], disabled ? _styles2.default['FormInput--disabled'] : null, formLayout ? _styles2.default['FormInput--form-layout-' + formLayout] : null].concat(_toConsumableArray((0, _concatClassnames2.default)(aphroditeStyles))));
			if (className) {
				props.className += ' ' + className;
			}

			var setRef = function setRef(n) {
				return _this2.target = n;
			};
			var Tag = multiline ? 'textarea' : 'input';

			return _react2.default.createElement(Tag, _extends({
				ref: setRef,
				disabled: props.disabled
			}, props));
		}
	}]);

	return FormInput;
}(_react.Component);

;

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormInput.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	multiline: _react.PropTypes.bool,
	size: _react.PropTypes.oneOf(['default', 'small', 'large']),
	type: _react.PropTypes.string
};
FormInput.defaultProps = {
	size: 'default',
	type: 'text'
};
FormInput.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: _react.PropTypes.string
};

module.exports = FormInput;

},{"../../../utils/concatClassnames":84,"./noedit":20,"./styles":21,"glamor":undefined,"react":undefined}],20:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint quote-props: ["error", "as-needed"] */

function FormInputNoedit(_ref) {
	var className = _ref.className,
	    Component = _ref.component,
	    cropText = _ref.cropText,
	    multiline = _ref.multiline,
	    noedit = _ref.noedit,
	    type = _ref.type,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'cropText', 'multiline', 'noedit', 'type']);

	props.className = (0, _glamor.css)(classes.noedit, cropText ? classes.cropText : null, multiline ? classes.multiline : null, props.href || props.onClick ? classes.anchor : null, className);

	return _react2.default.createElement(Component, props);
};

FormInputNoedit.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	cropText: _react.PropTypes.bool
};
FormInputNoedit.defaultProps = {
	component: 'span'
};

var anchorHoverAndFocusStyles = {
	backgroundColor: (0, _color.fade)(_theme2.default.color.link, 10),
	borderColor: (0, _color.fade)(_theme2.default.color.link, 10),
	color: _theme2.default.color.link,
	outline: 'none',
	textDecoration: 'underline'
};

var classes = {
	noedit: {
		appearance: 'none',
		backgroundColor: _theme2.default.input.background.noedit,
		backgroundImage: 'none',
		borderColor: _theme2.default.input.border.color.noedit,
		borderRadius: _theme2.default.input.border.radius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.input.border.width,
		color: _theme2.default.color.gray80,
		display: 'inline-block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight,
		padding: '0 ' + _theme2.default.input.paddingHorizontal,
		transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		verticalAlign: 'middle',

		// prevent empty inputs from collapsing by adding content
		':empty:before': {
			color: _theme2.default.color.gray40,
			content: '"(no value)"'
		}
	},

	multiline: {
		display: 'block',
		height: 'auto',
		lineHeight: '1.4',
		paddingBottom: '0.6em',
		paddingTop: '0.6em'
	},

	// indicate clickability when using an anchor
	anchor: {
		backgroundColor: (0, _color.fade)(_theme2.default.color.link, 5),
		borderColor: (0, _color.fade)(_theme2.default.color.link, 10),
		color: _theme2.default.color.link,
		marginRight: 5,
		minWidth: 0,
		textDecoration: 'none',

		':hover': anchorHoverAndFocusStyles,
		':focus': anchorHoverAndFocusStyles
	}
};

module.exports = FormInputNoedit;

},{"../../../theme":80,"../../../utils/color":83,"glamor":undefined,"react":undefined}],21:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	'FormInput': {
		'appearance': 'none',
		'backgroundColor': _theme2.default.input.background.default,
		'backgroundImage': 'none',
		'borderColor': _theme2.default.input.border.color.default,
		'borderRadius': _theme2.default.input.border.radius,
		'borderStyle': 'solid',
		'borderWidth': _theme2.default.input.border.width,
		'boxShadow': _theme2.default.input.boxShadow,
		'color': 'inherit', // FIXME
		'display': 'block',
		'height': _theme2.default.input.height,
		'lineHeight': _theme2.default.input.lineHeight,
		'padding': '0 ' + _theme2.default.input.paddingHorizontal,
		'transition': 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		'width': '100%',

		':hover': {
			borderColor: _theme2.default.input.border.color.hover,
			outline: 0
		},
		':focus': {
			borderColor: _theme2.default.input.border.color.focus,
			boxShadow: _theme2.default.input.boxShadowFocus,
			outline: 0
		}
	},
	'FormInput--disabled': {
		backgroundColor: _theme2.default.input.background.disabled,
		pointerEvents: 'none'
	},

	// sizes
	'FormInput__size--small': {
		fontSize: _theme2.default.font.size.small
	},
	'FormInput__size--large': {
		fontSize: _theme2.default.font.size.large
	}
}; // ==============================
// Form Input
// ==============================

},{"../../../theme":80}],22:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FormLabel(_ref, _ref2) {
	var formFieldId = _ref2.formFieldId,
	    formLayout = _ref2.formLayout,
	    labelWidth = _ref2.labelWidth;

	var aphroditeStyles = _ref.aphroditeStyles,
	    className = _ref.className,
	    Component = _ref.component,
	    cropText = _ref.cropText,
	    htmlFor = _ref.htmlFor,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'className', 'component', 'cropText', 'htmlFor']);

	props.htmlFor = htmlFor || formFieldId;
	props.className = (0, _glamor.css)(_styles2.default.FormLabel, formLayout ? _styles2.default['FormLabel--form-layout-' + formLayout] : null, cropText ? _styles2.default['FormLabel--crop-text'] : null, aphroditeStyles);
	if (className) {
		props.className += ' ' + className;
	}
	if (labelWidth) {
		props.style = _extends({
			width: labelWidth
		}, props.style);
	}

	return _react2.default.createElement(Component, props);
};

var stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormLabel.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	cropText: _react.PropTypes.bool
};
FormLabel.defaultProps = {
	component: 'label'
};
FormLabel.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: _react.PropTypes.string,
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

module.exports = FormLabel;

},{"./styles":23,"glamor":undefined,"react":undefined}],23:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // ==============================
// Form Label
// ==============================

module.exports = {
	'FormLabel': {
		color: _theme2.default.form.label.color,
		fontSize: _theme2.default.form.label.fontSize,
		fontWeight: _theme2.default.form.label.fontWeight,
		display: 'inline-block',
		marginBottom: '0.5em'
	},

	// when inside a horizontal form

	'FormLabel--form-layout-horizontal': _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
		display: 'table-cell',
		lineHeight: _theme2.default.component.lineHeight, // fix
		marginBottom: 0,
		paddingRight: 5,
		verticalAlign: 'top',
		width: _theme2.default.form.label.width
	}),

	// crop long text

	'FormLabel--crop-text': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	}
};

},{"../../../theme":80}],24:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FormNote(_ref) {
	var className = _ref.className,
	    children = _ref.children,
	    Component = _ref.component,
	    html = _ref.html,
	    props = _objectWithoutProperties(_ref, ['className', 'children', 'component', 'html']);

	props.className = (0, _glamor.css)(_styles2.default.note, className);

	// Property Violation
	if (children && html) {
		console.error('Warning: FormNote cannot render `children` and `html`. You must provide one or the other.');
	}

	return html ? _react2.default.createElement(Component, _extends({}, props, { dangerouslySetInnerHTML: { __html: html } })) : _react2.default.createElement(
		Component,
		props,
		children
	);
};
FormNote.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	html: _react.PropTypes.string
};
FormNote.defaultProps = {
	component: 'div'
};

module.exports = FormNote;

},{"./styles":25,"glamor":undefined,"react":undefined}],25:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	note: {
		color: _theme2.default.form.note.color,
		fontSize: _theme2.default.form.note.fontSize,
		marginTop: _theme2.default.spacing.small
	}
}; // ==============================
// Form Note
// ==============================

},{"../../../theme":80}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormSelect = function (_Component) {
	_inherits(FormSelect, _Component);

	function FormSelect() {
		_classCallCheck(this, FormSelect);

		return _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).apply(this, arguments));
	}

	_createClass(FormSelect, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    id = _props.id,
			    options = _props.options,
			    props = _objectWithoutProperties(_props, ['children', 'id', 'options']);

			var formFieldId = this.context.formFieldId;


			props.className = (0, _glamor.css)(_styles2.default.select, props.disabled ? _styles2.default['select--disabled'] : null);
			props.id = id || formFieldId;

			// Property Violation
			if (options && children) {
				console.error('Warning: FormSelect cannot render `children` and `options`. You must provide one or the other.');
			}

			return _react2.default.createElement(
				'div',
				{ className: (0, _glamor.css)(_styles2.default.container) },
				options ? _react2.default.createElement(
					'select',
					props,
					options.map(function (opt) {
						return _react2.default.createElement(
							'option',
							{ key: opt.value, value: opt.value },
							opt.label
						);
					})
				) : _react2.default.createElement(
					'select',
					props,
					children
				),
				_react2.default.createElement(
					'span',
					{ className: (0, _glamor.css)(_styles2.default.arrows, props.disabled ? _styles2.default['arrows--disabled'] : null) },
					_react2.default.createElement('span', { className: (0, _glamor.css)(_styles2.default.arrow, _styles2.default.arrowTop) }),
					_react2.default.createElement('span', { className: (0, _glamor.css)(_styles2.default.arrow, _styles2.default.arrowBottom) })
				)
			);
		}
	}]);

	return FormSelect;
}(_react.Component);

;

FormSelect.contextTypes = {
	formFieldId: _react.PropTypes.string
};
FormSelect.propTypes = {
	onChange: _react.PropTypes.func.isRequired,
	options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		label: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	})),
	value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

module.exports = FormSelect;

},{"./styles":27,"glamor":undefined,"react":undefined}],27:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==============================
// Form Select
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

module.exports = {
	container: {
		position: 'relative'
	},

	// select node
	select: {
		appearance: 'none',
		backgroundColor: _theme2.default.input.background.default,
		backgroundImage: 'none',
		borderColor: _theme2.default.input.border.color.default,
		borderBottomColor: (0, _color.darken)(_theme2.default.input.border.color.default, 4),
		borderTopColor: (0, _color.lighten)(_theme2.default.input.border.color.default, 4),
		borderRadius: _theme2.default.input.border.radius,
		borderStyle: 'solid',
		borderWidth: _theme2.default.input.border.width,
		boxShadow: _theme2.default.select.boxShadow,
		color: 'inherit', // FIXME
		display: 'block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight,
		padding: '0 ' + _theme2.default.input.paddingHorizontal,
		transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
		width: '100%',

		':hover': {
			borderColor: _theme2.default.input.border.color.hover,
			outline: 0
		},
		':focus': {
			borderColor: _theme2.default.input.border.color.focus,
			boxShadow: _theme2.default.input.boxShadowFocus,
			outline: 0
		}
	},
	'select--disabled': {
		backgroundColor: _theme2.default.input.background.disabled,
		pointerEvents: 'none'
	},

	// arrows
	arrows: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		height: _theme2.default.input.height,
		justifyContent: 'center',
		pointerEvents: 'none',
		position: 'absolute',
		right: 0,
		top: 0,
		width: _theme2.default.input.height
	},
	arrow: {
		borderLeft: '0.3em solid transparent',
		borderRight: '0.3em solid transparent',
		display: 'inline-block',
		height: 0,
		verticalAlign: 'middle',
		width: 0,
		zIndex: 1
	},
	arrowTop: {
		borderBottom: '0.3em solid',
		marginBottom: '0.1em'
	},
	arrowBottom: {
		borderTop: '0.3em solid',
		marginTop: '0.1em'
	}
};

},{"../../../theme":80,"../../../utils/color":83}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
	_inherits(Form, _Component);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
	}

	_createClass(Form, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				formLayout: this.props.layout,
				labelWidth: this.props.labelWidth
			};
		}
	}, {
		key: 'render',
		value: function render() {
			// NOTE `labelWidth` is declared to remove it from `props`, though never used
			var _props = this.props,
			    className = _props.className,
			    Component = _props.component,
			    labelWidth = _props.labelWidth,
			    layout = _props.layout,
			    props = _objectWithoutProperties(_props, ['className', 'component', 'labelWidth', 'layout']);

			props.className = (0, _glamor.css)(_styles2.default.Form, _styles2.default['Form__' + layout], className);

			return _react2.default.createElement(Component, props);
		}
	}]);

	return Form;
}(_react.Component);

;

Form.childContextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
Form.propTypes = {
	children: _react.PropTypes.node.isRequired,
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	layout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline'])
};
Form.defaultProps = {
	component: 'form',
	layout: 'basic'
};

module.exports = Form;

},{"./styles":29,"glamor":undefined,"react":undefined}],29:[function(require,module,exports){
"use strict";

// ==============================
// Form
// ==============================

module.exports = {
	Form: {}
};

},{}],30:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Glyph = require('../Glyph');

var _Glyph2 = _interopRequireDefault(_Glyph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function GlyphButton(_ref) {
	var children = _ref.children,
	    glyph = _ref.glyph,
	    glyphColor = _ref.glyphColor,
	    glyphSize = _ref.glyphSize,
	    glyphStyle = _ref.glyphStyle,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['children', 'glyph', 'glyphColor', 'glyphSize', 'glyphStyle', 'position']);

	var isDefault = position === 'default';
	var isLeft = position === 'left';
	var isRight = position === 'right';

	var offset = {};
	if (isLeft) offset.marginRight = '0.5em';
	if (isRight) offset.marginLeft = '0.5em';

	var glyphStyles = _extends({}, offset, glyphStyle);

	var icon = _react2.default.createElement(_Glyph2.default, {
		aphroditeStyles: classes.glyph,
		color: glyphColor,
		name: glyph,
		size: glyphSize,
		style: glyphStyles
	});

	return _react2.default.createElement(
		_Button2.default,
		props,
		(isDefault || isLeft) && icon,
		children,
		isRight && icon
	);
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
GlyphButton.propTypes = {
	glyph: _react.PropTypes.string,
	glyphColor: _react.PropTypes.string,
	glyphSize: _react.PropTypes.string,
	glyphStyle: _react.PropTypes.object,
	position: _react.PropTypes.oneOf(['default', 'left', 'right'])
};
GlyphButton.defaultProps = {
	glyphStyle: {},
	position: 'default' // no margin, assumes no children
};

var classes = {
	glyph: {
		display: 'inline-block',
		marginTop: '-0.125em', // fix icon alignment
		verticalAlign: 'middle'
	}
};

module.exports = GlyphButton;

},{"../Button":6,"../Glyph":33,"react":undefined}],31:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Glyph = require('../Glyph');

var _Glyph2 = _interopRequireDefault(_Glyph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

function GlyphField(_ref) {
	var children = _ref.children,
	    glyph = _ref.glyph,
	    glyphColor = _ref.glyphColor,
	    glyphSize = _ref.glyphSize,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['children', 'glyph', 'glyphColor', 'glyphSize', 'position']);

	var isLeft = position === 'left';
	var isRight = position === 'right';

	var glyphStyles = {};
	if (isLeft) glyphStyles.marginRight = '0.5em';
	if (isRight) glyphStyles.marginLeft = '0.5em';

	var icon = _react2.default.createElement(_Glyph2.default, {
		aphroditeStyles: classes.glyph,
		color: glyphColor,
		name: glyph,
		size: glyphSize,
		style: glyphStyles
	});

	return _react2.default.createElement(
		_FormField2.default,
		_extends({ aphroditeStyles: classes.wrapper }, props),
		isLeft && icon,
		children,
		isRight && icon
	);
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
GlyphField.propTypes = {
	glyph: _react.PropTypes.string,
	glyphColor: _react.PropTypes.string,
	glyphSize: _react.PropTypes.string,
	position: _react.PropTypes.oneOf(['left', 'right'])
};
GlyphField.defaultProps = {
	position: 'left'
};

var classes = {
	wrapper: {
		alignItems: 'center',
		display: 'flex'
	},
	glyph: {
		display: 'inline-block',
		marginTop: '-0.125em', // fix icon alignment
		verticalAlign: 'middle'
	}
};

module.exports = GlyphField;

},{"../FormField":17,"../Glyph":33,"react":undefined}],32:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.glyph.color.danger,
	inherit: _theme2.default.glyph.color.inherit,
	inverted: _theme2.default.glyph.color.inverted,
	primary: _theme2.default.glyph.color.primary,
	success: _theme2.default.glyph.color.success,
	warning: _theme2.default.glyph.color.warning
};

},{"../../../theme":80}],33:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _octicons = require('./octicons');

var _octicons2 = _interopRequireDefault(_octicons);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// FIXME static octicon classes leaning on Elemental to avoid duplicate
// font and CSS; inflating the project size

function Glyph(_ref) {
	var aphroditeStyles = _ref.aphroditeStyles,
	    className = _ref.className,
	    color = _ref.color,
	    Component = _ref.component,
	    name = _ref.name,
	    size = _ref.size,
	    style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'className', 'color', 'component', 'name', 'size', 'style']);

	var colorIsValidType = Object.keys(_colors2.default).includes(color);
	props.className = (0, _glamor.css)(_styles2.default.glyph, colorIsValidType && _styles2.default['color__' + color], _styles2.default['size__' + size], aphroditeStyles) + (' ' + _octicons2.default[name]);
	if (className) {
		props.className += ' ' + className;
	}

	// support random color strings
	props.style = _extends({
		color: !colorIsValidType ? color : null
	}, style);

	return _react2.default.createElement(Component, props);
};

Glyph.propTypes = {
	aphroditeStyles: _react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	}),
	color: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(Object.keys(_colors2.default)), _react.PropTypes.string] // support random color strings
	),
	name: _react.PropTypes.oneOf(Object.keys(_octicons2.default)).isRequired,
	size: _react.PropTypes.oneOf(Object.keys(_sizes2.default))
};
Glyph.defaultProps = {
	component: 'i',
	color: 'inherit',
	size: 'small'
};

module.exports = Glyph;

},{"./colors":32,"./octicons":34,"./sizes":35,"./styles":36,"glamor":undefined,"react":undefined}],34:[function(require,module,exports){
'use strict';

/* eslint quote-props: ["error", "as-needed"] */

module.exports = {
	alert: 'octicon octicon-alert',
	'arrow-down': 'octicon octicon-arrow-down',
	'arrow-left': 'octicon octicon-arrow-left',
	'arrow-right': 'octicon octicon-arrow-right',
	'arrow-small-down': 'octicon octicon-arrow-small-down',
	'arrow-small-left': 'octicon octicon-arrow-small-left',
	'arrow-small-right': 'octicon octicon-arrow-small-right',
	'arrow-small-up': 'octicon octicon-arrow-small-up',
	'arrow-up': 'octicon octicon-arrow-up',
	microscope: 'octicon octicon-microscope',
	beaker: 'octicon octicon-beaker',
	bell: 'octicon octicon-bell',
	book: 'octicon octicon-book',
	bookmark: 'octicon octicon-bookmark',
	briefcase: 'octicon octicon-briefcase',
	broadcast: 'octicon octicon-broadcast',
	browser: 'octicon octicon-browser',
	bug: 'octicon octicon-bug',
	calendar: 'octicon octicon-calendar',
	check: 'octicon octicon-check',
	checklist: 'octicon octicon-checklist',
	'chevron-down': 'octicon octicon-chevron-down',
	'chevron-left': 'octicon octicon-chevron-left',
	'chevron-right': 'octicon octicon-chevron-right',
	'chevron-up': 'octicon octicon-chevron-up',
	'circle-slash': 'octicon octicon-circle-slash',
	'circuit-board': 'octicon octicon-circuit-board',
	clippy: 'octicon octicon-clippy',
	clock: 'octicon octicon-clock',
	'cloud-download': 'octicon octicon-cloud-download',
	'cloud-upload': 'octicon octicon-cloud-upload',
	code: 'octicon octicon-code',
	'color-mode': 'octicon octicon-color-mode',
	'comment-add': 'octicon octicon-comment-add',
	comment: 'octicon octicon-comment',
	'comment-discussion': 'octicon octicon-comment-discussion',
	'credit-card': 'octicon octicon-credit-card',
	dash: 'octicon octicon-dash',
	dashboard: 'octicon octicon-dashboard',
	database: 'octicon octicon-database',
	clone: 'octicon octicon-clone',
	'desktop-download': 'octicon octicon-desktop-download',
	'device-camera': 'octicon octicon-device-camera',
	'device-camera-video': 'octicon octicon-device-camera-video',
	'device-desktop': 'octicon octicon-device-desktop',
	'device-mobile': 'octicon octicon-device-mobile',
	diff: 'octicon octicon-diff',
	'diff-added': 'octicon octicon-diff-added',
	'diff-ignored': 'octicon octicon-diff-ignored',
	'diff-modified': 'octicon octicon-diff-modified',
	'diff-removed': 'octicon octicon-diff-removed',
	'diff-renamed': 'octicon octicon-diff-renamed',
	ellipsis: 'octicon octicon-ellipsis',
	'eye-unwatch': 'octicon octicon-eye-unwatch',
	'eye-watch': 'octicon octicon-eye-watch',
	eye: 'octicon octicon-eye',
	'file-binary': 'octicon octicon-file-binary',
	'file-code': 'octicon octicon-file-code',
	'file-directory': 'octicon octicon-file-directory',
	'file-media': 'octicon octicon-file-media',
	'file-pdf': 'octicon octicon-file-pdf',
	'file-submodule': 'octicon octicon-file-submodule',
	'file-symlink-directory': 'octicon octicon-file-symlink-directory',
	'file-symlink-file': 'octicon octicon-file-symlink-file',
	'file-text': 'octicon octicon-file-text',
	'file-zip': 'octicon octicon-file-zip',
	flame: 'octicon octicon-flame',
	fold: 'octicon octicon-fold',
	gear: 'octicon octicon-gear',
	gift: 'octicon octicon-gift',
	gist: 'octicon octicon-gist',
	'gist-secret': 'octicon octicon-gist-secret',
	'git-branch-create': 'octicon octicon-git-branch-create',
	'git-branch-delete': 'octicon octicon-git-branch-delete',
	'git-branch': 'octicon octicon-git-branch',
	'git-commit': 'octicon octicon-git-commit',
	'git-compare': 'octicon octicon-git-compare',
	'git-merge': 'octicon octicon-git-merge',
	'git-pull-request-abandoned': 'octicon octicon-git-pull-request-abandoned',
	'git-pull-request': 'octicon octicon-git-pull-request',
	globe: 'octicon octicon-globe',
	graph: 'octicon octicon-graph',
	heart: 'octicon octicon-heart',
	history: 'octicon octicon-history',
	home: 'octicon octicon-home',
	'horizontal-rule': 'octicon octicon-horizontal-rule',
	hubot: 'octicon octicon-hubot',
	inbox: 'octicon octicon-inbox',
	info: 'octicon octicon-info',
	'issue-closed': 'octicon octicon-issue-closed',
	'issue-opened': 'octicon octicon-issue-opened',
	'issue-reopened': 'octicon octicon-issue-reopened',
	jersey: 'octicon octicon-jersey',
	key: 'octicon octicon-key',
	keyboard: 'octicon octicon-keyboard',
	law: 'octicon octicon-law',
	'light-bulb': 'octicon octicon-light-bulb',
	link: 'octicon octicon-link',
	'link-external': 'octicon octicon-link-external',
	'list-ordered': 'octicon octicon-list-ordered',
	'list-unordered': 'octicon octicon-list-unordered',
	location: 'octicon octicon-location',
	'gist-private': 'octicon octicon-gist-private',
	'mirror-private': 'octicon octicon-mirror-private',
	'git-fork-private': 'octicon octicon-git-fork-private',
	lock: 'octicon octicon-lock',
	'logo-github': 'octicon octicon-logo-github',
	mail: 'octicon octicon-mail',
	'mail-read': 'octicon octicon-mail-read',
	'mail-reply': 'octicon octicon-mail-reply',
	'mark-github': 'octicon octicon-mark-github',
	markdown: 'octicon octicon-markdown',
	megaphone: 'octicon octicon-megaphone',
	mention: 'octicon octicon-mention',
	milestone: 'octicon octicon-milestone',
	'mirror-public': 'octicon octicon-mirror-public',
	mirror: 'octicon octicon-mirror',
	'mortar-board': 'octicon octicon-mortar-board',
	mute: 'octicon octicon-mute',
	'no-newline': 'octicon octicon-no-newline',
	octoface: 'octicon octicon-octoface',
	organization: 'octicon octicon-organization',
	package: 'octicon octicon-package',
	paintcan: 'octicon octicon-paintcan',
	pencil: 'octicon octicon-pencil',
	'person-add': 'octicon octicon-person-add',
	'person-follow': 'octicon octicon-person-follow',
	person: 'octicon octicon-person',
	pin: 'octicon octicon-pin',
	plug: 'octicon octicon-plug',
	'repo-create': 'octicon octicon-repo-create',
	'gist-new': 'octicon octicon-gist-new',
	'file-directory-create': 'octicon octicon-file-directory-create',
	'file-add': 'octicon octicon-file-add',
	plus: 'octicon octicon-plus',
	'primitive-dot': 'octicon octicon-primitive-dot',
	'primitive-square': 'octicon octicon-primitive-square',
	pulse: 'octicon octicon-pulse',
	question: 'octicon octicon-question',
	quote: 'octicon octicon-quote',
	'radio-tower': 'octicon octicon-radio-tower',
	'repo-delete': 'octicon octicon-repo-delete',
	repo: 'octicon octicon-repo',
	'repo-clone': 'octicon octicon-repo-clone',
	'repo-force-push': 'octicon octicon-repo-force-push',
	'gist-fork': 'octicon octicon-gist-fork',
	'repo-forked': 'octicon octicon-repo-forked',
	'repo-pull': 'octicon octicon-repo-pull',
	'repo-push': 'octicon octicon-repo-push',
	rocket: 'octicon octicon-rocket',
	rss: 'octicon octicon-rss',
	ruby: 'octicon octicon-ruby',
	'screen-full': 'octicon octicon-screen-full',
	'screen-normal': 'octicon octicon-screen-normal',
	'search-save': 'octicon octicon-search-save',
	search: 'octicon octicon-search',
	server: 'octicon octicon-server',
	settings: 'octicon octicon-settings',
	shield: 'octicon octicon-shield',
	'log-in': 'octicon octicon-log-in',
	'sign-in': 'octicon octicon-sign-in',
	'log-out': 'octicon octicon-log-out',
	'sign-out': 'octicon octicon-sign-out',
	squirrel: 'octicon octicon-squirrel',
	'star-add': 'octicon octicon-star-add',
	'star-delete': 'octicon octicon-star-delete',
	star: 'octicon octicon-star',
	stop: 'octicon octicon-stop',
	'repo-sync': 'octicon octicon-repo-sync',
	sync: 'octicon octicon-sync',
	'tag-remove': 'octicon octicon-tag-remove',
	'tag-add': 'octicon octicon-tag-add',
	tag: 'octicon octicon-tag',
	telescope: 'octicon octicon-telescope',
	terminal: 'octicon octicon-terminal',
	'three-bars': 'octicon octicon-three-bars',
	thumbsdown: 'octicon octicon-thumbsdown',
	thumbsup: 'octicon octicon-thumbsup',
	tools: 'octicon octicon-tools',
	trashcan: 'octicon octicon-trashcan',
	'triangle-down': 'octicon octicon-triangle-down',
	'triangle-left': 'octicon octicon-triangle-left',
	'triangle-right': 'octicon octicon-triangle-right',
	'triangle-up': 'octicon octicon-triangle-up',
	unfold: 'octicon octicon-unfold',
	unmute: 'octicon octicon-unmute',
	versions: 'octicon octicon-versions',
	watch: 'octicon octicon-watch',
	'remove-close': 'octicon octicon-remove-close',
	x: 'octicon octicon-x',
	zap: 'octicon octicon-zap'
};

},{}],35:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.glyph.size.small,
	medium: _theme2.default.glyph.size.medium,
	large: _theme2.default.glyph.size.large
};

},{"../../../theme":80}],36:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Glyph
// ==============================

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	colorVariants['color__' + color] = {
		color: _colors2.default[color]
	};
});

// Prepare sizes
var sizeVariants = {};
Object.keys(_sizes2.default).forEach(function (size) {
	sizeVariants['size__' + size] = {
		fontSize: _sizes2.default[size]
	};
});

module.exports = _extends({
	glyph: {}

}, colorVariants, sizeVariants);

},{"./colors":32,"./sizes":35}],37:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WIDTHS = {
	'one-whole': '100%',
	'one-half': '50%',
	'one-third': '33.33%',
	'two-thirds': '66.66%',
	'one-quarter': '25%',
	'three-quarters': '75%',

	'one-fifth': '20%',
	'two-fifths': '40%',
	'three-fifths': '60%',
	'four-fifths': '80%',

	'one-sixth': '16.66%',
	'five-sixths': '83.33%'
};

var GridCol = function GridCol(props, context) {
	var gutter = props.gutter || context.gutter;
	var xsmall = props.xsmall || context.xsmall;
	var small = props.small || context.small;
	var medium = props.medium || context.medium;
	var large = props.large || context.large;

	var className = (0, _glamor.css)(classes['xsmall-' + xsmall], classes['small-' + small], classes['medium-' + medium], classes['large-' + large]);

	var componentClassName = '' + className + (props.className ? ' ' + props.className : '');
	var componentStyles = gutter ? {
		paddingLeft: gutter / 2,
		paddingRight: gutter / 2
	} : {};

	return _react2.default.createElement(
		'div',
		{ className: componentClassName, style: componentStyles },
		props.children
	);
};

GridCol.contextTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridCol.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

var classes = _extends({}, prepareWidths('xsmall', WIDTHS), prepareWidths('small', WIDTHS), prepareWidths('medium', WIDTHS), prepareWidths('large', WIDTHS));

/* eslint-disable guard-for-in */
function prepareWidths(prefix, obj) {
	var classes = {};
	switch (prefix) {
		case 'small':
			for (var prop in obj) {
				classes[prefix + '-' + prop] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletPortraitMin + ')', {
					width: obj[prop]
				});
			}
			break;
		case 'medium':
			for (var _prop in obj) {
				classes[prefix + '-' + _prop] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.tabletLandscapeMin + ')', {
					width: obj[_prop]
				});
			}
			break;
		case 'large':
			for (var _prop2 in obj) {
				classes[prefix + '-' + _prop2] = _defineProperty({}, '@media (min-width: ' + _theme2.default.breakpoint.desktopMin + ')', {
					width: obj[_prop2]
				});
			}
			break;
		default:
			for (var _prop3 in obj) {
				classes[prefix + '-' + _prop3] = {
					width: obj[_prop3]
				};
			}

	}

	return classes;
};

module.exports = GridCol;

},{"../../../theme":80,"glamor":undefined,"react":undefined}],38:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRow = function (_Component) {
	_inherits(GridRow, _Component);

	function GridRow() {
		_classCallCheck(this, GridRow);

		return _possibleConstructorReturn(this, (GridRow.__proto__ || Object.getPrototypeOf(GridRow)).apply(this, arguments));
	}

	_createClass(GridRow, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				gutter: this.props.gutter,
				xsmall: this.props.xsmall,
				small: this.props.small,
				medium: this.props.medium,
				large: this.props.large
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    gutter = _props.gutter,
			    _props$styles = _props.styles,
			    styles = _props$styles === undefined ? {} : _props$styles;


			var componentClassName = '' + (0, _glamor.css)(classes.grid) + (className ? ' ' + className : '');
			var componentStyles = _extends(styles, {
				marginLeft: gutter / -2,
				marginRight: gutter / -2
			});

			return _react2.default.createElement(
				'div',
				{ className: componentClassName, style: componentStyles },
				children
			);
		}
	}]);

	return GridRow;
}(_react.Component);

;

GridRow.childContextTypes = {
	gutter: _react.PropTypes.number,
	xsmall: _react.PropTypes.string,
	small: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	large: _react.PropTypes.string
};

GridRow.propTypes = {
	gutter: _react.PropTypes.number,
	large: _react.PropTypes.string,
	medium: _react.PropTypes.string,
	small: _react.PropTypes.string,
	xsmall: _react.PropTypes.string
};

GridRow.defaultProps = {
	gutter: 0,
	xsmall: 'one-whole'
};

var classes = {
	grid: {
		display: 'flex',
		flexWrap: 'wrap'
	}
};

module.exports = GridRow;

},{"glamor":undefined,"react":undefined}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = exports.Col = undefined;

var _GridCol = require('../GridCol');

var _GridCol2 = _interopRequireDefault(_GridCol);

var _GridRow = require('../GridRow');

var _GridRow2 = _interopRequireDefault(_GridRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Col = _GridCol2.default;
exports.Row = _GridRow2.default;

},{"../GridCol":37,"../GridRow":38}],40:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE: Inline Group Section accepts a single child

function InlineGroupSection(_ref) {
	var active = _ref.active,
	    aphroditeStyles = _ref.aphroditeStyles,
	    children = _ref.children,
	    className = _ref.className,
	    contiguous = _ref.contiguous,
	    grow = _ref.grow,
	    position = _ref.position,
	    props = _objectWithoutProperties(_ref, ['active', 'aphroditeStyles', 'children', 'className', 'contiguous', 'grow', 'position']);

	// evaluate position
	var separate = position === 'last' || position === 'middle';

	// A `contiguous` section must manipulate it's child directly
	// A separate (default) section just wraps the child
	return contiguous ? (0, _react.cloneElement)(children, _extends({
		aphroditeStyles: [_styles2.default.contiguous, _styles2.default['contiguous__' + position], active ? _styles2.default.active : null, grow ? _styles2.default.grow : null, aphroditeStyles]
	}, props)) : _react2.default.createElement(
		'div',
		_extends({ className: (0, _glamor.css)(!!grow && _styles2.default.grow, !!separate && _styles2.default.separate, aphroditeStyles) }, props),
		children
	);
};

InlineGroupSection.propTypes = {
	active: _react.PropTypes.bool, // buttons only
	children: _react.PropTypes.element.isRequired,
	contiguous: _react.PropTypes.bool,
	grow: _react.PropTypes.bool,
	position: _react.PropTypes.oneOf(['first', 'last', 'middle', 'only'])
};

module.exports = InlineGroupSection;

},{"./styles":41,"glamor":undefined,"react":undefined}],41:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	// pull active elements up
	active: {
		position: 'relative'
	},

	// stretch to fill available width
	grow: {
		flex: '1 1 0'
	},

	// separate applicable non-contiguous elements
	separate: {
		paddingLeft: '0.75em'
	},

	// Contiguous: manipulate children directly

	// pull focused contiguous elements up
	contiguous: {
		':focus': {
			position: 'relative',
			zIndex: 1
		}
	},

	// position
	contiguous__middle: {
		borderRadius: 0,
		marginLeft: _theme2.default.button.borderWidth * -1
	},
	contiguous__first: {
		borderBottomRightRadius: '0 !important',
		borderTopRightRadius: '0 !important'
	},
	contiguous__last: {
		borderBottomLeftRadius: '0 !important',
		borderTopLeftRadius: '0 !important',
		marginLeft: _theme2.default.button.borderWidth * -1
	}
}; // ==============================
// Inline Group: Section
// ==============================

// Takes only FormInput and Button as children, rendering them as a
// tidy inline array

},{"../../../theme":80}],42:[function(require,module,exports){
'use strict';

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE: only accepts InlineGroupSection as a single child

function InlineGroup(_ref) {
	var aphroditeStyles = _ref.aphroditeStyles,
	    block = _ref.block,
	    children = _ref.children,
	    className = _ref.className,
	    Component = _ref.component,
	    contiguous = _ref.contiguous,
	    props = _objectWithoutProperties(_ref, ['aphroditeStyles', 'block', 'children', 'className', 'component', 'contiguous']);

	// prepare group className
	props.className = (0, _glamor.css)(classes.group, !!block && classes.block, aphroditeStyles);
	if (className) {
		props.className += ' ' + className;
	}

	// convert children to an array and filter out falsey values
	var buttons = _react.Children.toArray(children).filter(function (i) {
		return i;
	});

	// normalize the count
	var count = buttons.length - 1;

	// clone children and apply classNames that aphrodite can target
	props.children = buttons.map(function (c, idx) {
		if (!c) return null;

		var isOnlyChild = !count;
		var isFirstChild = !isOnlyChild && idx === 0;
		var isLastChild = !isOnlyChild && idx === count;
		var isMiddleChild = !isOnlyChild && !isFirstChild && !isLastChild;

		var position = void 0;
		if (isOnlyChild) position = 'only';
		if (isFirstChild) position = 'first';
		if (isLastChild) position = 'last';
		if (isMiddleChild) position = 'middle';

		return (0, _react.cloneElement)(c, {
			contiguous: contiguous,
			position: position
		});
	});

	return _react2.default.createElement(Component, props);
};

InlineGroup.propTypes = {
	aphroditeStyles: _react.PropTypes.shape({
		_definition: _react.PropTypes.object,
		_name: _react.PropTypes.string
	}),
	block: _react.PropTypes.bool,
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	contiguous: _react.PropTypes.bool
};
InlineGroup.defaultProps = {
	component: 'div'
};

var classes = {
	group: {
		display: 'inline-flex'
	},
	block: {
		display: 'flex'
	}
};

module.exports = InlineGroup;

},{"glamor":undefined,"react":undefined}],43:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function LabelledControl(_ref) {
	var className = _ref.className,
	    inline = _ref.inline,
	    label = _ref.label,
	    title = _ref.title,
	    props = _objectWithoutProperties(_ref, ['className', 'inline', 'label', 'title']);

	var labelClassName = (0, _glamor.css)(_styles2.default.wrapper, inline && _styles2.default.wrapper__inline, className);

	return _react2.default.createElement(
		'label',
		{ title: title, className: labelClassName },
		_react2.default.createElement('input', _extends({}, props, { className: (0, _glamor.css)(_styles2.default.control) })),
		_react2.default.createElement(
			'span',
			{ className: (0, _glamor.css)(_styles2.default.label) },
			label
		)
	);
};

LabelledControl.propTypes = {
	inline: _react.PropTypes.bool,
	title: _react.PropTypes.string,
	type: _react.PropTypes.oneOf(['checkbox', 'radio']).isRequired
};

module.exports = LabelledControl;

},{"./styles":44,"glamor":undefined,"react":undefined}],44:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	wrapper: {
		display: 'block',
		height: _theme2.default.input.height,
		lineHeight: _theme2.default.input.lineHeight
	},
	wrapper__inline: {
		display: 'inline'
	},

	// checkbox or radio
	control: {
		marginRight: '0.5em'
	}
}; // ==============================
// Alert
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

},{"../../../theme":80}],45:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function LoadingButton(_ref) {
	var children = _ref.children,
	    loading = _ref.loading,
	    props = _objectWithoutProperties(_ref, ['children', 'loading']);

	// determine the correct variant for the spinner,
	// fill is the default variant on Button
	var variant = props.variant || 'fill';

	// determine the correct color for the spinner,
	// cancel and delete alias to "danger"
	var color = void 0;
	if (props.color === 'cancel' || props.color === 'delete') color = 'danger';

	// merge all the variant/color together
	var formattedColor = variant === 'fill' && props.color !== 'default' ? 'inverted' : color;

	// render the spinner if required
	var spinner = loading && _react2.default.createElement(_Spinner2.default, {
		size: 'small',
		color: formattedColor
	});

	// slide the spinner in and out of view
	var spinnerStyles = {
		width: loading ? _theme2.default.spinner.size.small * 5 + _theme2.default.spacing.small : 0
	};

	// render all that shit
	return _react2.default.createElement(
		_Button2.default,
		props,
		_react2.default.createElement(
			'span',
			{ className: (0, _glamor.css)(classes.spinner), style: spinnerStyles },
			spinner
		),
		children
	);
};

LoadingButton.propTypes = {
	loading: _react.PropTypes.bool
};
LoadingButton.defaultProps = {
	loading: false
};

var classes = {
	spinner: {
		display: 'inline-block',
		overflow: 'hidden',
		textAlign: 'left',
		transition: 'width 200ms ease-out',
		verticalAlign: 'middle'
	}
};

module.exports = LoadingButton;

},{"../../../theme":80,"../Button":6,"../Spinner":62,"glamor":undefined,"react":undefined}],46:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalBody(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	return _react2.default.createElement('div', _extends({
		className: (0, _glamor.css)(classes.body, className)
	}, props));
};

var classes = {
	body: {
		paddingBottom: _theme2.default.modal.padding.body.vertical,
		paddingLeft: _theme2.default.modal.padding.body.horizontal,
		paddingRight: _theme2.default.modal.padding.body.horizontal,
		paddingTop: _theme2.default.modal.padding.body.vertical
	}
};

module.exports = ModalBody;

},{"../../../theme":80,"glamor":undefined,"react":undefined}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _ScrollLock = require('../ScrollLock');

var _ScrollLock2 = _interopRequireDefault(_ScrollLock);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ModalDialog = function (_Component) {
	_inherits(ModalDialog, _Component);

	function ModalDialog() {
		_classCallCheck(this, ModalDialog);

		var _this = _possibleConstructorReturn(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this));

		_this.handleBackdropClick = _this.handleBackdropClick.bind(_this);
		_this.handleKeyboardInput = _this.handleKeyboardInput.bind(_this);
		return _this;
	}

	_createClass(ModalDialog, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				onClose: this.props.onClose
			};
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!canUseDom) return;

			// add event listeners
			if (nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}

		// ==============================
		// Methods
		// ==============================

	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 27) this.props.onClose();

			return false;
		}
	}, {
		key: 'handleBackdropClick',
		value: function handleBackdropClick(e) {
			if (e.target !== this.refs.container) return;

			this.props.onClose();
		}

		// ==============================
		// Renderers
		// ==============================

	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _props = this.props,
			    backdropClosesModal = _props.backdropClosesModal,
			    children = _props.children,
			    isOpen = _props.isOpen,
			    width = _props.width;


			if (!isOpen) return _react2.default.createElement('span', { key: 'closed' });

			return _react2.default.createElement(
				'div',
				{
					className: (0, _glamor.css)(classes.container),
					key: 'open',
					ref: 'container',
					onClick: !!backdropClosesModal && this.handleBackdropClick,
					onTouchEnd: !!backdropClosesModal && this.handleBackdropClick
				},
				_react2.default.createElement(
					'div',
					{ className: (0, _glamor.css)(classes.dialog), style: { width: width }, 'data-screen-id': 'modal-dialog' },
					children
				),
				_react2.default.createElement(_ScrollLock2.default, null)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Portal2.default,
				null,
				this.renderDialog()
			);
		}
	}]);

	return ModalDialog;
}(_react.Component);

;

ModalDialog.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	enableKeyboardInput: _react.PropTypes.bool,
	isOpen: _react.PropTypes.bool,
	onClose: _react.PropTypes.func.isRequired,
	width: _react.PropTypes.number
};
ModalDialog.defaultProps = {
	enableKeyboardInput: true,
	width: 768
};
ModalDialog.childContextTypes = {
	onClose: _react.PropTypes.func.isRequired
};

var classes = {
	container: {
		alignItems: 'center',
		backgroundColor: _theme2.default.modal.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: _theme2.default.modal.zIndex
	},
	dialog: {
		maxHeight: '90%',
		overflow: 'scroll',
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		paddingBottom: _theme2.default.modal.padding.dialog.vertical,
		paddingLeft: _theme2.default.modal.padding.dialog.horizontal,
		paddingRight: _theme2.default.modal.padding.dialog.horizontal,
		paddingTop: '5px',
		position: 'relative'
	}
};

exports.default = ModalDialog;

},{"../../../theme":80,"../Portal":54,"../ScrollLock":57,"glamor":undefined,"react":undefined}],48:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalFooter(_ref) {
	var align = _ref.align,
	    className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['align', 'className']);

	return _react2.default.createElement('div', _extends({}, props, { className: (0, _glamor.css)(classes.footer, classes['align__' + align], className) }));
};

ModalFooter.propTypes = {
	align: _react.PropTypes.oneOf(['center', 'left', 'right']),
	children: _react.PropTypes.node,
	onClose: _react.PropTypes.func,
	showCloseButton: _react.PropTypes.bool,
	text: _react.PropTypes.string
};
ModalFooter.defaultProps = {
	align: 'left'
};

var classes = {
	footer: {
		borderTop: '2px solid ' + _theme2.default.color.gray10,
		display: 'flex',
		paddingBottom: _theme2.default.modal.padding.footer.vertical,
		paddingLeft: _theme2.default.modal.padding.footer.horizontal,
		paddingRight: _theme2.default.modal.padding.footer.horizontal,
		paddingTop: _theme2.default.modal.padding.footer.vertical
	},

	// alignment
	align__left: {
		justifyContent: 'flex-start'
	},
	align__center: {
		justifyContent: 'center'
	},
	align__right: {
		justifyContent: 'flex-end'
	}
};

module.exports = ModalFooter;

},{"../../../theme":80,"glamor":undefined,"react":undefined}],49:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _GlyphButton = require('../GlyphButton');

var _GlyphButton2 = _interopRequireDefault(_GlyphButton);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModalHeader(_ref, _ref2) {
	var onClose = _ref2.onClose;

	var children = _ref.children,
	    className = _ref.className,
	    showCloseButton = _ref.showCloseButton,
	    text = _ref.text,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'showCloseButton', 'text']);

	// Property Violation
	if (children && text) {
		console.error('Warning: ModalHeader cannot render `children` and `text`. You must provide one or the other.');
	}

	return _react2.default.createElement(
		'div',
		_extends({}, props, { className: (0, _glamor.css)(classes.header, className) }),
		_react2.default.createElement(
			'div',
			{ className: (0, _glamor.css)(classes.grow) },
			text ? _react2.default.createElement(
				'h4',
				{ className: (0, _glamor.css)(classes.text) },
				text
			) : children
		),
		!!onClose && showCloseButton && _react2.default.createElement(_GlyphButton2.default, {
			aphroditeStyles: classes.close,
			color: 'cancel',
			glyph: 'x',
			onClick: onClose,
			variant: 'link'
		})
	);
};

ModalHeader.propTypes = {
	children: _react.PropTypes.node,
	onClose: _react.PropTypes.func,
	showCloseButton: _react.PropTypes.bool,
	text: _react.PropTypes.string
};
ModalHeader.contextTypes = {
	onClose: _react.PropTypes.func.isRequired
};

var classes = {
	header: {
		alignItems: 'center',
		borderBottom: '2px solid ' + _theme2.default.color.gray10,
		display: 'flex',
		paddingBottom: _theme2.default.modal.padding.header.vertical,
		paddingLeft: _theme2.default.modal.padding.header.horizontal,
		paddingRight: _theme2.default.modal.padding.header.horizontal,
		paddingTop: _theme2.default.modal.padding.header.vertical
	},

	// fill space to push the close button right
	grow: {
		flexGrow: 1
	},

	// title text
	text: {
		color: 'inherit',
		fontSize: 18,
		fontWeight: 500,
		lineHeight: 1,
		margin: 0
	}
};

module.exports = ModalHeader;

},{"../../../theme":80,"../GlyphButton":30,"glamor":undefined,"react":undefined}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Header = exports.Footer = exports.Dialog = exports.Body = undefined;

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Body = _body2.default;
exports.Dialog = _dialog2.default;
exports.Footer = _footer2.default;
exports.Header = _header2.default;

},{"./body":46,"./dialog":47,"./footer":48,"./header":49}],51:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
	_inherits(Pagination, _Component);

	function Pagination() {
		_classCallCheck(this, Pagination);

		return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
	}

	_createClass(Pagination, [{
		key: 'renderCount',
		value: function renderCount() {
			var count = '';
			var _props = this.props,
			    currentPage = _props.currentPage,
			    pageSize = _props.pageSize,
			    plural = _props.plural,
			    singular = _props.singular,
			    total = _props.total;

			if (!total) {
				count = 'No ' + (plural || 'records');
			} else if (total > pageSize) {
				var start = pageSize * (currentPage - 1) + 1;
				var end = Math.min(start + pageSize - 1, total);
				count = 'Showing ' + start + ' to ' + end + ' of ' + total;
			} else {
				count = 'Showing ' + total;
				if (total > 1 && plural) {
					count += ' ' + plural;
				} else if (total === 1 && singular) {
					count += ' ' + singular;
				}
			}
			return _react2.default.createElement(
				'div',
				{ className: (0, _glamor.css)(classes.count), 'data-e2e-pagination-count': true },
				count
			);
		}
	}, {
		key: 'renderPages',
		value: function renderPages() {
			var _props2 = this.props,
			    currentPage = _props2.currentPage,
			    limit = _props2.limit,
			    onPageSelect = _props2.onPageSelect,
			    pageSize = _props2.pageSize,
			    total = _props2.total;


			if (total <= pageSize) return null;

			var pages = [];
			var totalPages = Math.ceil(total / pageSize);
			var minPage = 1;
			var maxPage = totalPages;

			if (limit && limit < totalPages) {
				var rightLimit = Math.floor(limit / 2);
				var leftLimit = rightLimit + limit % 2 - 1;
				minPage = currentPage - leftLimit;
				maxPage = currentPage + rightLimit;

				if (minPage < 1) {
					maxPage = limit;
					minPage = 1;
				}
				if (maxPage > totalPages) {
					minPage = totalPages - limit + 1;
					maxPage = totalPages;
				}
			}
			if (minPage > 1) {
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_start', onClick: function onClick() {
							return onPageSelect(1);
						} },
					'...'
				));
			}

			var _loop = function _loop(page) {
				var selected = page === currentPage;
				/* eslint-disable no-loop-func */
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_' + page, selected: selected, onClick: function onClick() {
							return onPageSelect(page);
						} },
					page
				));
				/* eslint-enable */
			};

			for (var page = minPage; page <= maxPage; page++) {
				_loop(page);
			}
			if (maxPage < totalPages) {
				pages.push(_react2.default.createElement(
					_page2.default,
					{ key: 'page_end', onClick: function onClick() {
							return onPageSelect(totalPages);
						} },
					'...'
				));
			}
			return _react2.default.createElement(
				'div',
				{ className: (0, _glamor.css)(classes.list) },
				pages
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var className = (0, _glamor.css)(classes.container, this.props.className);
			return _react2.default.createElement(
				'div',
				{ className: className, style: this.props.style },
				this.renderCount(),
				this.renderPages()
			);
		}
	}]);

	return Pagination;
}(_react.Component);

;

var classes = {
	container: {
		display: 'block',
		lineHeight: _theme2.default.component.lineHeight,
		marginBottom: '2em'
	},
	count: {
		display: 'inline-block',
		marginRight: '1em',
		verticalAlign: 'middle'
	},
	list: {
		display: 'inline-block',
		verticalAlign: 'middle'
	}
};

Pagination.propTypes = {
	className: _react.PropTypes.string,
	currentPage: _react.PropTypes.number.isRequired,
	limit: _react.PropTypes.number,
	onPageSelect: _react.PropTypes.func,
	pageSize: _react.PropTypes.number.isRequired,
	plural: _react.PropTypes.string,
	singular: _react.PropTypes.string,
	style: _react.PropTypes.object,
	total: _react.PropTypes.number.isRequired
};

module.exports = Pagination;

},{"../../../theme":80,"./page":52,"glamor":undefined,"react":undefined}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Page(_ref) {
	var disabled = _ref.disabled,
	    selected = _ref.selected,
	    props = _objectWithoutProperties(_ref, ['disabled', 'selected']);

	props.className = (0, _glamor.css)(classes.page, !!disabled && classes.disabled, !!selected && classes.selected);
	return _react2.default.createElement('button', props);
};

Page.propTypes = {
	disabled: _react.PropTypes.bool,
	onClick: _react.PropTypes.func.isRequired,
	selected: _react.PropTypes.bool
};

/* eslint quote-props: ["error", "as-needed"] */

var selectedStyle = {
	backgroundColor: _theme2.default.pagination.selected.background,
	borderColor: _theme2.default.pagination.selected.border,
	color: _theme2.default.pagination.selected.color,
	cursor: 'default',
	zIndex: 2
};
var pseudoStyle = {
	backgroundColor: _theme2.default.pagination.hover.background,
	borderColor: _theme2.default.pagination.hover.border,
	color: _theme2.default.pagination.hover.color,
	outline: 'none'
};

var classes = {
	page: {
		appearance: 'none',
		background: 'none',
		border: '1px solid transparent',
		borderRadius: _theme2.default.borderRadius.default,
		color: _theme2.default.pagination.color,
		cursor: 'pointer',
		display: 'inline-block',
		float: 'left', // Collapse white-space
		marginRight: '0.25em',
		padding: '0 .7em',
		position: 'relative',
		textDecoration: 'none',

		// handle hover and focus
		':hover': pseudoStyle,
		':focus': pseudoStyle
	},

	// selected page
	selected: _extends({}, selectedStyle, {

		':hover': selectedStyle,
		':focus': selectedStyle
	}),

	// disabled page

	disabled: {
		backgroundColor: _theme2.default.pagination.disabled.background,
		borderColor: _theme2.default.pagination.disabled.background,
		color: _theme2.default.pagination.disabled.color,
		cursor: 'default'
	}
};

exports.default = Page;

},{"../../../theme":80,"glamor":undefined,"react":undefined}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Pass the Lightbox context through to the Portal's descendents
// StackOverflow discussion http://goo.gl/oclrJ9

var PassContext = function (_Component) {
	_inherits(PassContext, _Component);

	function PassContext() {
		_classCallCheck(this, PassContext);

		return _possibleConstructorReturn(this, (PassContext.__proto__ || Object.getPrototypeOf(PassContext)).apply(this, arguments));
	}

	_createClass(PassContext, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react.Children.only(this.props.children);
		}
	}]);

	return PassContext;
}(_react.Component);

;

PassContext.propTypes = {
	context: _react.PropTypes.object.isRequired
};
PassContext.childContextTypes = {
	onClose: _react.PropTypes.func
};

exports.default = PassContext;

},{"react":undefined}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactDom = require('react-dom');

var _PassContext = require('../PassContext');

var _PassContext2 = _interopRequireDefault(_PassContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = function (_Component) {
	_inherits(Portal, _Component);

	function Portal() {
		_classCallCheck(this, Portal);

		var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

		_this.portalElement = null;
		return _this;
	}

	_createClass(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var p = document.createElement('div');
			document.body.appendChild(p);
			this.portalElement = p;
			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// Animate fade on mount/unmount
			var duration = 200;
			var styles = '\n\t\t\t\t.fade-enter { opacity: 0.01; }\n\t\t\t\t.fade-enter.fade-enter-active { opacity: 1; transition: opacity ' + duration + 'ms; }\n\t\t\t\t.fade-leave { opacity: 1; }\n\t\t\t\t.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity ' + duration + 'ms; }\n\t\t';
			(0, _reactDom.render)(_react2.default.createElement(
				_PassContext2.default,
				{ context: this.context },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'style',
						null,
						styles
					),
					_react2.default.createElement(_reactAddonsCssTransitionGroup2.default, _extends({
						component: 'div',
						transitionName: 'fade',
						transitionEnterTimeout: duration,
						transitionLeaveTimeout: duration
					}, this.props))
				)
			), this.portalElement);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeChild(this.portalElement);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Portal;
}(_react.Component);

exports.default = Portal;


Portal.contextTypes = {
	onClose: _react.PropTypes.func
};

},{"../PassContext":53,"react":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Using window.innerWidth and state instead of CSS media breakpoints
// because we want to render null rather than an empty span. Allowing for
// CSS pseudo classes like :only-child to behave as expected.

// Return true if window + document
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ResponsiveText = function (_Component) {
	_inherits(ResponsiveText, _Component);

	function ResponsiveText() {
		_classCallCheck(this, ResponsiveText);

		var _this = _possibleConstructorReturn(this, (ResponsiveText.__proto__ || Object.getPrototypeOf(ResponsiveText)).call(this));

		_this.handleResize = _this.handleResize.bind(_this);
		_this.state = {
			windowWidth: canUseDOM ? window.innerWidth : 0
		};
		return _this;
	}

	_createClass(ResponsiveText, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (canUseDOM) {
				window.addEventListener('resize', this.handleResize);
				this.handleResize();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (canUseDOM) {
				window.removeEventListener('resize', this.handleResize);
			}
		}
	}, {
		key: 'handleResize',
		value: function handleResize() {
			this.setState({
				windowWidth: canUseDOM ? window.innerWidth : 0
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    Component = _props.component,
			    hiddenLG = _props.hiddenLG,
			    hiddenMD = _props.hiddenMD,
			    hiddenSM = _props.hiddenSM,
			    hiddenXS = _props.hiddenXS,
			    visibleLG = _props.visibleLG,
			    visibleMD = _props.visibleMD,
			    visibleSM = _props.visibleSM,
			    visibleXS = _props.visibleXS,
			    props = _objectWithoutProperties(_props, ['component', 'hiddenLG', 'hiddenMD', 'hiddenSM', 'hiddenXS', 'visibleLG', 'visibleMD', 'visibleSM', 'visibleXS']);

			var windowWidth = this.state.windowWidth;


			var text = void 0;

			// set text value from breakpoint; attempt XS --> LG
			if (windowWidth < _theme2.default.breakpointNumeric.mobile) {
				text = visibleXS || hiddenSM || hiddenMD || hiddenLG;
			} else if (windowWidth < _theme2.default.breakpointNumeric.tabletPortrait) {
				text = hiddenXS || visibleSM || hiddenMD || hiddenLG;
			} else if (windowWidth < _theme2.default.breakpointNumeric.tabletLandscape) {
				text = hiddenXS || hiddenSM || visibleMD || hiddenLG;
			} else {
				text = hiddenXS || hiddenSM || hiddenMD || visibleLG;
			}

			return text ? _react2.default.createElement(
				Component,
				props,
				text
			) : null;
		}
	}]);

	return ResponsiveText;
}(_react.Component);

;

ResponsiveText.propTypes = {
	hiddenLG: _react.PropTypes.string,
	hiddenMD: _react.PropTypes.string,
	hiddenSM: _react.PropTypes.string,
	hiddenXS: _react.PropTypes.string,
	visibleLG: _react.PropTypes.string,
	visibleMD: _react.PropTypes.string,
	visibleSM: _react.PropTypes.string,
	visibleXS: _react.PropTypes.string
};
ResponsiveText.defaultProps = {
	component: 'span'
};

module.exports = ResponsiveText;

},{"../../../theme":80,"react":undefined}],56:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ScreenReaderOnly(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _glamor.css)(classes.srOnly, className);

	return _react2.default.createElement('span', props);
};

var classes = {
	srOnly: {
		border: 0,
		clip: 'rect(0,0,0,0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		width: 1
	}
};

module.exports = ScreenReaderOnly;

},{"glamor":undefined,"react":undefined}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollLock = function (_Component) {
	_inherits(ScrollLock, _Component);

	function ScrollLock() {
		_classCallCheck(this, ScrollLock);

		var _this = _possibleConstructorReturn(this, (ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call(this));

		_this.lockCount = 0;
		return _this;
	}

	_createClass(ScrollLock, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof window === 'undefined') return;

			this.lockCount++;
			if (this.lockCount > 1) return;

			//	FIXME iOS ignores overflow on body
			try {
				var scrollBarWidth = window.innerWidth - document.body.clientWidth;

				var target = document.body;

				target.style.paddingRight = scrollBarWidth + 'px';
				target.style.overflowY = 'hidden';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (typeof window === 'undefined' || this.lockCount === 0) return;

			this.lockCount--;
			if (this.lockCount > 0) return; // Still locked

			//	FIXME iOS ignores overflow on body
			try {
				var target = document.body;

				target.style.paddingRight = '';
				target.style.overflowY = '';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return ScrollLock;
}(_react.Component);

exports.default = ScrollLock;

},{"react":undefined}],58:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	danger: _theme2.default.color.danger,
	default: _theme2.default.color.gray80,
	error: _theme2.default.color.danger,
	info: _theme2.default.color.info,
	primary: _theme2.default.color.primary,
	success: _theme2.default.color.success,
	warning: _theme2.default.color.warning
};

},{"../../../theme":80}],59:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function SegmentedControl(_ref) {
	var className = _ref.className,
	    color = _ref.color,
	    cropText = _ref.cropText,
	    equalWidthSegments = _ref.equalWidthSegments,
	    inline = _ref.inline,
	    onChange = _ref.onChange,
	    options = _ref.options,
	    value = _ref.value,
	    props = _objectWithoutProperties(_ref, ['className', 'color', 'cropText', 'equalWidthSegments', 'inline', 'onChange', 'options', 'value']);

	props.className = (0, _glamor.css)(_styles2.default.control, inline ? _styles2.default.control__inline : null, className);

	return _react2.default.createElement(
		'div',
		props,
		options.map(function (opt) {
			var buttonClassName = (0, _glamor.css)(_styles2.default.button, opt.disabled ? _styles2.default.button__disabled : null, opt.value === value ? _styles2.default['button__' + color] : null, cropText ? _styles2.default.button__cropText : null, equalWidthSegments ? _styles2.default.button__equalWidth : null);

			return _react2.default.createElement(
				'button',
				{
					className: buttonClassName,
					key: opt.value,
					onClick: !opt.disabled && function () {
						return onChange(opt.value);
					},
					type: 'button',
					title: cropText ? opt.label : null,
					tabIndex: opt.disabled ? '-1' : ''
				},
				opt.label
			);
		})
	);
};

var valuePropShape = [_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string];

SegmentedControl.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)),
	cropText: _react.PropTypes.bool, // when `inline && equalWidthSegments` crops to the next largest option length
	equalWidthSegments: _react.PropTypes.bool, // only relevant when `inline === false`
	inline: _react.PropTypes.bool,
	onChange: _react.PropTypes.func.isRequired,
	options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		disabled: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		value: _react.PropTypes.oneOfType(valuePropShape)
	})).isRequired,
	value: _react.PropTypes.oneOfType(valuePropShape)
};
SegmentedControl.defaultProps = {
	color: 'default'
};

module.exports = SegmentedControl;

},{"./colors":58,"./styles":60,"glamor":undefined,"react":undefined}],60:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Segmented Control
// ==============================

/* eslint quote-props: ["error", "as-needed"] */

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
Object.keys(_colors2.default).forEach(function (color) {
	var pseudoStyles = {
		backgroundColor: _colors2.default[color],
		color: 'white'
	};
	colorVariants['button__' + color] = {
		backgroundColor: _colors2.default[color],
		color: 'white',

		':hover': pseudoStyles,
		':focus': pseudoStyles,
		':active': pseudoStyles
	};
});

module.exports = _extends({
	control: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: _theme2.default.input.border.color.default,
		borderRadius: '0.4em',
		display: 'flex',
		fontSize: _theme2.default.font.size.small,
		paddingLeft: 1,
		paddingRight: 1
	},
	control__inline: {
		display: 'inline-flex'
	},

	// buttons
	button: {
		background: 'none',
		border: 0,
		borderRadius: '0.25em',
		flexGrow: 1,
		margin: '2px 1px',
		padding: '0.3em 0.9em',
		outline: 0,

		':hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
		':focus': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
		':active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
	},
	button__equalWidth: {
		flex: '1 1 0'
	},
	button__cropText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	button__disabled: {
		opacity: 0.6,
		pointerEvents: 'none'
	}

}, colorVariants);

},{"../../../theme":80,"./colors":58}],61:[function(require,module,exports){
'use strict';

module.exports = ['danger', 'default', 'inverted', 'primary', 'success', 'warning'];

},{}],62:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _ScreenReaderOnly = require('../ScreenReaderOnly');

var _ScreenReaderOnly2 = _interopRequireDefault(_ScreenReaderOnly);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Spinner(_ref) {
	var className = _ref.className,
	    size = _ref.size,
	    color = _ref.color,
	    props = _objectWithoutProperties(_ref, ['className', 'size', 'color']);

	props.className = (0, _glamor.css)(_styles2.default.base, _styles2.default[size], className);

	return _react2.default.createElement(
		'div',
		props,
		_react2.default.createElement('span', { className: '' + (0, _glamor.css)(_styles2.default.dot, _styles2.default['size__' + size], _styles2.default['color__' + color], _styles2.default.dot__first) }),
		_react2.default.createElement('span', { className: '' + (0, _glamor.css)(_styles2.default.dot, _styles2.default['size__' + size], _styles2.default['color__' + color], _styles2.default.dot__second) }),
		_react2.default.createElement('span', { className: '' + (0, _glamor.css)(_styles2.default.dot, _styles2.default['size__' + size], _styles2.default['color__' + color], _styles2.default.dot__third) }),
		_react2.default.createElement(
			_ScreenReaderOnly2.default,
			null,
			'Loading...'
		)
	);
};

Spinner.propTypes = {
	color: _react.PropTypes.oneOf(_colors2.default),
	size: _react.PropTypes.oneOf(_sizes2.default)
};
Spinner.defaultProps = {
	size: 'medium',
	color: 'default'
};

module.exports = Spinner;

},{"../ScreenReaderOnly":56,"./colors":61,"./sizes":63,"./styles":64,"glamor":undefined,"react":undefined}],63:[function(require,module,exports){
'use strict';

module.exports = ['small', 'medium', 'large'];

},{}],64:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Spinner
// ==============================

var _glamor = require('glamor');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _sizes = require('./sizes');

var _sizes2 = _interopRequireDefault(_sizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare variants
var colorVariants = {};
_colors2.default.forEach(function (color) {
	colorVariants['color__' + color] = {
		backgroundColor: _theme2.default.spinner.color[color]
	};
});

// Prepare sizes
var sizeVariants = {};
_sizes2.default.forEach(function (size) {
	sizeVariants['size__' + size] = {
		fontSize: _theme2.default.spinner.size[size]
	};
});

// Declare animation keyframes

var keyframes = _glamor.compose.keyframes('pulse', {
	'0%, 80%, 100%': { opacity: 0 },
	'40%': { opacity: 1 }
});

module.exports = _extends({
	base: {
		display: 'inline-block',
		lineHeight: 1,
		textAlign: 'center',
		verticalAlign: 'middle',
		width: '5em'
	},
	small: { fontSize: 4 },
	medium: { fontSize: 8 },
	large: { fontSize: 16 },

	// text
	text: {
		border: 0,
		clip: 'rect(0,0,0,0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		width: 1
	},

	// dots
	dot: {
		animationName: keyframes,
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		borderRadius: '1em',
		display: 'inline-block',
		height: '1em',
		verticalAlign: 'top',
		width: '1em'
	},
	dot__second: {
		animationDelay: '160ms',
		marginLeft: '1em'
	},
	dot__third: {
		animationDelay: '320ms',
		marginLeft: '1em'
	}

}, colorVariants, sizeVariants);

},{"../../../theme":80,"./colors":61,"./sizes":63,"glamor":undefined}],65:[function(require,module,exports){
'use strict';

module.exports = {
	Alert: require('./Alert'),
	BlankState: require('./BlankState'),
	Button: require('./Button'),
	Center: require('./Center'),
	Chip: require('./Chip'),
	Container: require('./Container'),
	DropdownButton: require('./DropdownButton'),
	Form: require('./Form'),
	FormField: require('./FormField'),
	FormInput: require('./FormInput'),
	FormLabel: require('./FormLabel'),
	FormNote: require('./FormNote'),
	FormSelect: require('./FormSelect'),
	Glyph: require('./Glyph'),
	GlyphButton: require('./GlyphButton'),
	GlyphField: require('./GlyphField'),
	Grid: require('./Grid'),
	InlineGroup: require('./InlineGroup'),
	InlineGroupSection: require('./InlineGroupSection'),
	LabelledControl: require('./LabelledControl'),
	LoadingButton: require('./LoadingButton'),
	Modal: require('./Modal'),
	Pagination: require('./Pagination'),
	ResponsiveText: require('./ResponsiveText'),
	ScreenReaderOnly: require('./ScreenReaderOnly'),
	SegmentedControl: require('./SegmentedControl'),
	Spinner: require('./Spinner')
};

},{"./Alert":3,"./BlankState":5,"./Button":6,"./Center":8,"./Chip":11,"./Container":13,"./DropdownButton":16,"./Form":28,"./FormField":17,"./FormInput":19,"./FormLabel":22,"./FormNote":24,"./FormSelect":26,"./Glyph":33,"./GlyphButton":30,"./GlyphField":31,"./Grid":39,"./InlineGroup":42,"./InlineGroupSection":40,"./LabelledControl":43,"./LoadingButton":45,"./Modal":50,"./Pagination":51,"./ResponsiveText":55,"./ScreenReaderOnly":56,"./SegmentedControl":59,"./Spinner":62}],66:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../elemental');

var _string = require('../../utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This renders alerts for API success and error responses.
 *   Error format: {
 *     error: 'validation errors' // The unique error type identifier
 *     detail: { ... } // Optional details specific to that error type
 *   }
 *   Success format: {
 *     success: 'item updated', // The unique success type identifier
 *     details: { ... } // Optional details specific to that success type
 *   }
 *   Eventually success and error responses should be handled individually
 *   based on their type. For example: validation errors should be displayed next
 *   to each invalid field and signin errors should promt the user to sign in.
 */
var AlertMessages = _react2.default.createClass({
	displayName: 'AlertMessages',
	propTypes: {
		alerts: _react2.default.PropTypes.shape({
			error: _react2.default.PropTypes.Object,
			success: _react2.default.PropTypes.Object
		})
	},
	getDefaultProps: function getDefaultProps() {
		return {
			alerts: {}
		};
	},
	renderValidationErrors: function renderValidationErrors() {
		var errors = this.props.alerts.error.detail;
		if (errors.name === 'ValidationError') {
			errors = errors.errors;
		}
		var errorCount = Object.keys(errors).length;
		var alertContent = void 0;
		var messages = Object.keys(errors).map(function (path) {
			if (errorCount > 1) {
				return _react2.default.createElement(
					'li',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			} else {
				return _react2.default.createElement(
					'div',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			}
		});

		if (errorCount > 1) {
			alertContent = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					null,
					'There were ',
					errorCount,
					' errors creating the new item:'
				),
				_react2.default.createElement(
					'ul',
					null,
					messages
				)
			);
		} else {
			alertContent = messages;
		}

		return _react2.default.createElement(
			_elemental.Alert,
			{ color: 'danger' },
			alertContent
		);
	},
	render: function render() {
		var _props$alerts = this.props.alerts,
		    error = _props$alerts.error,
		    success = _props$alerts.success;

		if (error) {
			// Render error alerts
			switch (error.error) {
				case 'validation errors':
					return this.renderValidationErrors();
				case 'error':
					if (error.detail.name === 'ValidationError') {
						return this.renderValidationErrors();
					} else {
						return _react2.default.createElement(
							_elemental.Alert,
							{ color: 'danger' },
							(0, _string.upcase)(error.error)
						);
					}
				default:
					return _react2.default.createElement(
						_elemental.Alert,
						{ color: 'danger' },
						(0, _string.upcase)(error.error)
					);
			}
		}

		if (success) {
			// Render success alerts
			return _react2.default.createElement(
				_elemental.Alert,
				{ color: 'success' },
				(0, _string.upcase)(success.success)
			);
		}

		return null; // No alerts, render nothing
	}
});

module.exports = AlertMessages;

},{"../../utils/string":87,"../elemental":65,"react":undefined}],67:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _AlertMessages = require('./AlertMessages');

var _AlertMessages2 = _interopRequireDefault(_AlertMessages);

var _FieldTypes = require('FieldTypes');

var _InvalidFieldType = require('./InvalidFieldType');

var _InvalidFieldType2 = _interopRequireDefault(_InvalidFieldType);

var _elemental = require('../elemental');

var _IframeContent = require('./IframeContent');

var _IframeContent2 = _interopRequireDefault(_IframeContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The form that's visible when "Create <ItemName>" is clicked on either the
 * List screen or the Item screen
 */

var CreateForm = _react2.default.createClass({
	displayName: 'CreateForm',
	propTypes: {
		err: _react2.default.PropTypes.object,
		isOpen: _react2.default.PropTypes.bool,
		list: _react2.default.PropTypes.object,
		onCancel: _react2.default.PropTypes.func,
		onCreate: _react2.default.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			err: null,
			isOpen: false
		};
	},
	getInitialState: function getInitialState() {
		var _this = this;

		// Set the field values to their default values when first rendering the
		// form. (If they have a default value, that is)
		var values = {};
		Object.keys(this.props.list.fields).forEach(function (key) {
			var field = _this.props.list.fields[key];
			var FieldComponent = _FieldTypes.Fields[field.type];
			values[field.path] = FieldComponent.getDefaultValue(field);
		});
		return {
			values: values,
			alerts: {},
			showIframe: false
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.list.link.create) {
			this.setState({
				showIframe: true
			});
		} else {
			document.body.addEventListener('keyup', this.handleKeyPress, false);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (!this.state.showIframe) {
			document.body.removeEventListener('keyup', this.handleKeyPress, false);
		}
	},
	handleKeyPress: function handleKeyPress(evt) {
		if (_vkey2.default[evt.keyCode] === '<escape>') {
			this.props.onCancel();
		}
	},

	// Handle input change events
	handleChange: function handleChange(event) {
		var values = (0, _objectAssign2.default)({}, this.state.values);
		values[event.path] = event.value;
		this.setState({
			values: values
		});
	},

	// Set the props of a field
	getFieldProps: function getFieldProps(field) {
		var props = (0, _objectAssign2.default)({}, field);
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},

	// Create a new item when the form is submitted
	submitForm: function submitForm(event) {
		var _this2 = this;

		event.preventDefault();
		var createForm = event.target;
		var formData = new FormData(createForm);
		this.props.list.createItem(formData, function (err, data) {
			if (data) {
				if (_this2.props.onCreate) {
					_this2.props.onCreate(data);
				} else {
					// Clear form
					_this2.setState({
						values: {},
						alerts: {
							success: {
								success: 'Item created'
							}
						}
					});
				}
			} else {
				if (!err) {
					err = {
						error: 'connection error'
					};
				}
				// If we get a database error, show the database error message
				// instead of only saying "Database error"
				if (err.error === 'database error') {
					err.error = err.detail.errmsg;
				}
				_this2.setState({
					alerts: {
						error: err
					}
				});
			}
		});
	},

	// Render the form itself
	renderForm: function renderForm() {
		var _this3 = this;

		if (!this.props.isOpen) return;

		var form = [];
		var list = this.props.list;
		var nameField = this.props.list.nameField;
		var focusWasSet;

		// If the name field is an initial one, we need to render a proper
		// input for it
		if (list.nameIsInitial) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.autoFocus = focusWasSet = true;
			if (nameField.type === 'text') {
				nameFieldProps.className = 'item-name-field';
				nameFieldProps.placeholder = nameField.label;
				nameFieldProps.label = '';
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[nameField.type], nameFieldProps));
		}

		// Render inputs for all initial fields
		Object.keys(list.initialFields).forEach(function (key) {
			var field = list.fields[list.initialFields[key]];
			// If there's something weird passed in as field type, render the
			// invalid field type component
			if (typeof _FieldTypes.Fields[field.type] !== 'function') {
				form.push(_react2.default.createElement(_InvalidFieldType2.default, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			// Get the props for the input field
			var fieldProps = _this3.getFieldProps(field);
			// If there was no focusRef set previously, set the current field to
			// be the one to be focussed. Generally the first input field, if
			// there's an initial name field that takes precedence.
			if (!focusWasSet) {
				fieldProps.autoFocus = focusWasSet = true;
			}
			form.push(_react2.default.createElement(_FieldTypes.Fields[field.type], fieldProps));
		});

		return _react2.default.createElement(
			_elemental.Form,
			{ layout: 'horizontal', onSubmit: this.submitForm },
			_react2.default.createElement(_elemental.Modal.Header, {
				text: 'Create a new ' + list.singular,
				showCloseButton: true
			}),
			_react2.default.createElement(
				_elemental.Modal.Body,
				null,
				_react2.default.createElement(_AlertMessages2.default, { alerts: this.state.alerts }),
				form
			),
			_react2.default.createElement(
				_elemental.Modal.Footer,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ color: 'success', type: 'submit', 'data-button-type': 'submit' },
					'Create'
				),
				_react2.default.createElement(
					_elemental.Button,
					{
						variant: 'link',
						color: 'cancel',
						'data-button-type': 'cancel',
						onClick: this.props.onCancel
					},
					'Cancel'
				)
			)
		);
	},
	renderContent: function renderContent() {
		var showIframe = this.state.showIframe;

		var iframeURL = '' + Keystone.externalHost + this.props.list.link.create;

		return showIframe && this.props.isOpen ? _react2.default.createElement(_IframeContent2.default, { src: iframeURL, show: this.props.isOpen, onCancel: this.props.onCancel, onSave: this.props.onCreate, className: "full-screen" }) : _react2.default.createElement(
			_elemental.Modal.Dialog,
			{ isOpen: this.props.isOpen, onClose: this.props.onCancel, backdropClosesModal: true },
			this.renderForm()
		);
	},
	render: function render() {
		return this.renderContent();
	}
});

module.exports = CreateForm;

},{"../elemental":65,"./AlertMessages":66,"./IframeContent":68,"./InvalidFieldType":69,"FieldTypes":"FieldTypes","object-assign":127,"react":undefined,"vkey":undefined}],68:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IframeContent = _react2.default.createClass({
	displayName: 'IframeContent',
	propTypes: {
		show: _react2.default.PropTypes.bool,
		src: _react2.default.PropTypes.string,
		className: _react2.default.PropTypes.string,
		onCancel: _react2.default.PropTypes.func,
		onSave: _react2.default.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			show: false
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("message", this.handleFrameTasks, this);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("message", this.handleFrameTasks, this);
	},
	handleFrameTasks: function handleFrameTasks(e) {
		try {
			var message = JSON.parse(e.data);
			switch (message.type) {
				case 'contentUpdate':
					this.setState({
						contentHeight: message.data
					});
					break;
				case 'onSave':
					if (this.props.onSave) {
						this.props.onSave(message.data);
					}
					break;
				case 'onCancel':
					if (this.props.onCancel) {
						this.props.onCancel();
					}
					break;
			}
		} catch (err) {
			console.error(err);
		}
	},
	renderContent: function renderContent() {
		var _this = this;

		var _props = this.props,
		    src = _props.src,
		    show = _props.show,
		    _props$className = _props.className,
		    className = _props$className === undefined ? '' : _props$className;

		var iframeURL = src + '?token=' + Keystone.user.token;
		return show ? _react2.default.createElement('iframe', { className: 'content-frame ' + className, style: { height: this.state.contentHeight }, ref: function ref(f) {
				return _this.ifr = f;
			}, src: iframeURL }) : _react2.default.createElement('div', null);
	},
	render: function render() {
		return this.renderContent();
	}
}); /**
     * The form that's visible when "Create <ItemName>" is clicked on either the
     * List screen or the Item screen
     */

module.exports = IframeContent;

},{"react":undefined}],69:[function(require,module,exports){
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidFieldType = function InvalidFieldType(props) {
	return _react2.default.createElement(
		"div",
		{ className: "alert alert-danger" },
		"Invalid field type ",
		_react2.default.createElement(
			"strong",
			null,
			props.type
		),
		" at path ",
		_react2.default.createElement(
			"strong",
			null,
			props.path
		)
	);
}; /**
    * Renders an "Invalid Field Type" error
    */

InvalidFieldType.propTypes = {
	path: _react2.default.PropTypes.string,
	type: _react2.default.PropTypes.string
};

module.exports = InvalidFieldType;

},{"react":undefined}],70:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render the body of a popout
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutBody = _react2.default.createClass({
	displayName: 'PopoutBody',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		scrollable: _react2.default.PropTypes.bool
	},
	render: function render() {
		var className = (0, _classnames2.default)('Popout__body', {
			'Popout__scrollable-area': this.props.scrollable
		}, this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className', 'scrollable');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutBody;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],71:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUTTON_BASE_CLASSNAME = 'Popout__footer__button Popout__footer__button--'; /**
                                                                                * Render a footer for a popout
                                                                                */

var PopoutFooter = _react2.default.createClass({
	displayName: 'PopoutFooter',
	propTypes: {
		children: _react2.default.PropTypes.node,
		primaryButtonAction: _react2.default.PropTypes.func,
		primaryButtonIsSubmit: _react2.default.PropTypes.bool,
		primaryButtonLabel: _react2.default.PropTypes.string,
		secondaryButtonAction: _react2.default.PropTypes.func,
		secondaryButtonLabel: _react2.default.PropTypes.string
	},
	// Render a primary button
	renderPrimaryButton: function renderPrimaryButton() {
		if (!this.props.primaryButtonLabel) return null;

		return _react2.default.createElement(
			'button',
			{
				type: this.props.primaryButtonIsSubmit ? 'submit' : 'button',
				className: BUTTON_BASE_CLASSNAME + 'primary',
				onClick: this.props.primaryButtonAction
			},
			this.props.primaryButtonLabel
		);
	},

	// Render a secondary button
	renderSecondaryButton: function renderSecondaryButton() {
		if (!this.props.secondaryButtonAction || !this.props.secondaryButtonLabel) return null;

		return _react2.default.createElement(
			'button',
			{
				type: 'button',
				className: BUTTON_BASE_CLASSNAME + 'secondary',
				onClick: this.props.secondaryButtonAction
			},
			this.props.secondaryButtonLabel
		);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'Popout__footer' },
			this.renderPrimaryButton(),
			this.renderSecondaryButton(),
			this.props.children
		);
	}
});

module.exports = PopoutFooter;

},{"react":undefined}],72:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render a header for a popout
 */

var PopoutHeader = _react2.default.createClass({
	displayName: 'PopoutHeader',
	propTypes: {
		leftAction: _react2.default.PropTypes.func,
		leftIcon: _react2.default.PropTypes.string,
		title: _react2.default.PropTypes.string.isRequired,
		transitionDirection: _react2.default.PropTypes.oneOf(['next', 'prev'])
	},
	render: function render() {
		// If we have a left action and a left icon, render a header button
		var headerButton = this.props.leftAction && this.props.leftIcon ? _react2.default.createElement('button', {
			key: 'button_' + this.props.transitionDirection,
			type: 'button',
			className: 'Popout__header__button octicon octicon-' + this.props.leftIcon,
			onClick: this.props.leftAction
		}) : null;
		// If we have a title, render it
		var headerTitle = this.props.title ? _react2.default.createElement(
			'span',
			{
				key: 'title_' + this.props.transitionDirection,
				className: 'Popout__header__label'
			},
			this.props.title
		) : null;

		return _react2.default.createElement(
			'div',
			{ className: 'Popout__header' },
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'Popout__header__button',
					transitionEnterTimeout: 200,
					transitionLeaveTimeout: 200
				},
				headerButton
			),
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'Popout__pane-' + this.props.transitionDirection,
					transitionEnterTimeout: 360,
					transitionLeaveTimeout: 360
				},
				headerTitle
			)
		);
	}
});

module.exports = PopoutHeader;

},{"react":undefined,"react-addons-css-transition-group":undefined}],73:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list. Can also use PopoutListItem and PopoutListHeading
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutList = _react2.default.createClass({
	displayName: 'PopoutList',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string
	},
	render: function render() {
		var className = (0, _classnames2.default)('PopoutList', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutList;

// expose the child to the top level export
module.exports.Item = require('./PopoutListItem');
module.exports.Heading = require('./PopoutListHeading');

},{"./PopoutListHeading":74,"./PopoutListItem":75,"blacklist":undefined,"classnames":undefined,"react":undefined}],74:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list heading
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutListHeading = _react2.default.createClass({
	displayName: 'PopoutListHeading',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string
	},
	render: function render() {
		var className = (0, _classnames2.default)('PopoutList__heading', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className');

		return _react2.default.createElement('div', _extends({ className: className }, props));
	}
});

module.exports = PopoutListHeading;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],75:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout list item
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutListItem = _react2.default.createClass({
	displayName: 'PopoutListItem',
	propTypes: {
		icon: _react2.default.PropTypes.string,
		iconHover: _react2.default.PropTypes.string,
		isSelected: _react2.default.PropTypes.bool,
		label: _react2.default.PropTypes.string.isRequired,
		onClick: _react2.default.PropTypes.func
	},
	getInitialState: function getInitialState() {
		return {
			hover: false
		};
	},
	hover: function hover() {
		this.setState({ hover: true });
	},
	unhover: function unhover() {
		this.setState({ hover: false });
	},

	// Render an icon
	renderIcon: function renderIcon() {
		if (!this.props.icon) return null;
		var icon = this.state.hover && this.props.iconHover ? this.props.iconHover : this.props.icon;
		var iconClassname = (0, _classnames2.default)('PopoutList__item__icon octicon', 'octicon-' + icon);

		return _react2.default.createElement('span', { className: iconClassname });
	},
	render: function render() {
		var itemClassname = (0, _classnames2.default)('PopoutList__item', {
			'is-selected': this.props.isSelected
		});
		var props = (0, _blacklist2.default)(this.props, 'className', 'icon', 'iconHover', 'isSelected', 'label');
		return _react2.default.createElement(
			'button',
			_extends({
				type: 'button',
				title: this.props.label,
				className: itemClassname,
				onFocus: this.hover,
				onBlur: this.unhover,
				onMouseOver: this.hover,
				onMouseOut: this.unhover
			}, props),
			this.renderIcon(),
			_react2.default.createElement(
				'span',
				{ className: 'PopoutList__item__label' },
				this.props.label
			)
		);
	}
});

module.exports = PopoutListItem;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],76:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout pane, calls props.onLayout when the component mounts
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutPane = _react2.default.createClass({
	displayName: 'PopoutPane',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		onLayout: _react2.default.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			onLayout: function onLayout() {}
		};
	},
	componentDidMount: function componentDidMount() {
		this.props.onLayout(this.refs.el.offsetHeight);
	},
	render: function render() {
		var className = (0, _classnames2.default)('Popout__pane', this.props.className);
		var props = (0, _blacklist2.default)(this.props, 'className', 'onLayout');

		return _react2.default.createElement('div', _extends({ ref: 'el', className: className }, props));
	}
});

module.exports = PopoutPane;

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],77:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZES = {
	arrowHeight: 12,
	arrowWidth: 16,
	horizontalMargin: 20
}; /**
    * A Popout component.
    * One can also add a Header (Popout/Header), a Footer
    * (Popout/Footer), a Body (Popout/Body) and a Pan (Popout/Pane).
    */

var Popout = _react2.default.createClass({
	displayName: 'Popout',
	propTypes: {
		isOpen: _react2.default.PropTypes.bool,
		onCancel: _react2.default.PropTypes.func,
		onSubmit: _react2.default.PropTypes.func,
		relativeToID: _react2.default.PropTypes.string.isRequired,
		width: _react2.default.PropTypes.number
	},
	getDefaultProps: function getDefaultProps() {
		return {
			width: 320
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (!this.props.isOpen && nextProps.isOpen) {
			window.addEventListener('resize', this.calculatePosition);
			this.calculatePosition(nextProps.isOpen);
		} else if (this.props.isOpen && !nextProps.isOpen) {
			window.removeEventListener('resize', this.calculatePosition);
		}
	},
	getPortalDOMNode: function getPortalDOMNode() {
		return this.refs.portal.getPortalDOMNode();
	},
	calculatePosition: function calculatePosition(isOpen) {
		if (!isOpen) return;
		var posNode = document.getElementById(this.props.relativeToID);

		var pos = {
			top: 0,
			left: 0,
			width: posNode.offsetWidth,
			height: posNode.offsetHeight
		};
		while (posNode.offsetParent) {
			pos.top += posNode.offsetTop;
			pos.left += posNode.offsetLeft;
			posNode = posNode.offsetParent;
		}

		var leftOffset = Math.max(pos.left + pos.width / 2 - this.props.width / 2, SIZES.horizontalMargin);
		var topOffset = pos.top + pos.height + SIZES.arrowHeight;

		var spaceOnRight = window.innerWidth - (leftOffset + this.props.width + SIZES.horizontalMargin);
		if (spaceOnRight < 0) {
			leftOffset = leftOffset + spaceOnRight;
		}

		var arrowLeftOffset = leftOffset === SIZES.horizontalMargin ? pos.left + pos.width / 2 - SIZES.arrowWidth / 2 - SIZES.horizontalMargin : null;

		var newStateAvaliable = this.state.leftOffset !== leftOffset || this.state.topOffset !== topOffset || this.state.arrowLeftOffset !== arrowLeftOffset;

		if (newStateAvaliable) {
			this.setState({
				leftOffset: leftOffset,
				topOffset: topOffset,
				arrowLeftOffset: arrowLeftOffset
			});
		}
	},
	renderPopout: function renderPopout() {
		if (!this.props.isOpen) return null;

		var width = this.props.width;
		var _state = this.state,
		    arrowLeftOffset = _state.arrowLeftOffset,
		    left = _state.leftOffset,
		    top = _state.topOffset;


		var arrowStyles = arrowLeftOffset ? { left: 0, marginLeft: arrowLeftOffset } : null;

		return _react2.default.createElement(
			'div',
			{ className: 'Popout', style: { left: left, top: top, width: width } },
			_react2.default.createElement('span', { className: 'Popout__arrow', style: arrowStyles }),
			_react2.default.createElement(
				'div',
				{ className: 'Popout__inner' },
				this.props.children
			)
		);
	},
	renderBlockout: function renderBlockout() {
		if (!this.props.isOpen) return;
		return _react2.default.createElement('div', { className: 'blockout', onClick: this.props.onCancel });
	},
	render: function render() {
		return _react2.default.createElement(
			_Portal2.default,
			{ className: 'Popout-wrapper', ref: 'portal' },
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionEnterTimeout: 200,
					transitionLeaveTimeout: 200,
					transitionName: 'Popout'
				},
				this.renderPopout()
			),
			this.renderBlockout()
		);
	}
});

module.exports = Popout;

// expose the child to the top level export
module.exports.Header = require('./PopoutHeader');
module.exports.Body = require('./PopoutBody');
module.exports.Footer = require('./PopoutFooter');
module.exports.Pane = require('./PopoutPane');

},{"../Portal":78,"./PopoutBody":70,"./PopoutFooter":71,"./PopoutHeader":72,"./PopoutPane":76,"react":undefined,"react-addons-css-transition-group":undefined}],78:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used by the Popout component and the Lightbox component of the fields for
 * popouts. Renders a non-react DOM node.
 */

module.exports = _react2.default.createClass({
	displayName: 'Portal',
	portalElement: null, // eslint-disable-line react/sort-comp
	componentDidMount: function componentDidMount() {
		var el = document.createElement('div');
		document.body.appendChild(el);
		this.portalElement = el;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		_reactDom2.default.render(_react2.default.createElement('div', this.props), this.portalElement);
	},
	getPortalDOMNode: function getPortalDOMNode() {
		return this.portalElement;
	},
	render: function render() {
		return null;
	}
});

},{"react":undefined,"react-dom":undefined}],79:[function(require,module,exports){
'use strict';

/**
 * Constants
 */

// breakpoints
exports.breakpoint = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200
};

// border radii
exports.borderRadius = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 16,
	xl: 32
};

// color
exports.color = {
	appDanger: '#d64242',
	appInfo: '#56cdfc',
	appPrimary: '#1385e5',
	appSuccess: '#34c240',
	appWarning: '#fa9f47'
};

// spacing
exports.spacing = {
	xs: 5,
	sm: 10,
	md: 20,
	lg: 40,
	xl: 80
};

// table constants

exports.TABLE_CONTROL_COLUMN_WIDTH = 26; // icon + padding
exports.NETWORK_ERROR_RETRY_DELAY = 500; // in ms

},{}],80:[function(require,module,exports){
'use strict';

/* eslint-disable key-spacing */
var theme = {};

var _require = require('./utils/color'),
    blend = _require.blend,
    darken = _require.darken,
    fade = _require.fade,
    lighten = _require.lighten;

// ==============================
// COMMON
// ==============================

// breakpoint

theme.breakpointNumeric = {
	mobile: 480,
	tabletPortrait: 768,
	tabletLandscape: 992,
	desktop: 1200
};
theme.breakpoint = {
	tabletPortraitMin: theme.breakpointNumeric.mobile + 1 + 'px',
	tabletLandscapeMin: theme.breakpointNumeric.tabletPortrait + 1 + 'px',
	desktopMin: theme.breakpointNumeric.tabletLandscape + 1 + 'px',
	desktopLargeMin: theme.breakpointNumeric.desktop + 1 + 'px',

	mobileMax: theme.breakpointNumeric.mobile + 'px',
	tabletPortraitMax: theme.breakpointNumeric.tabletPortrait + 'px',
	tabletLandscapeMax: theme.breakpointNumeric.tabletLandscape + 'px',
	desktopMax: theme.breakpointNumeric.desktop + 'px'
};

// container

theme.container = {
	gutter: 20,
	size: {
		small: 750,
		medium: 970,
		large: 1170
	}
};

// color

theme.color = {
	body: '#fafafa',
	link: '#1385e5',
	linkHover: lighten('#1385e5', 10),
	text: '#1A1A1A',

	// contextual
	success: '#34c240',
	create: '#34c240', // alias for success
	primary: '#1385e5',
	info: '#1385e5', // alias for primary
	warning: '#FA3',
	danger: '#d64242',
	error: '#d64242', // alias for danger

	// neutrals
	gray90: '#1A1A1A',
	gray80: '#333',
	gray70: '#4D4D4D',
	gray60: '#666',
	gray50: '#7F7F7F',
	gray40: '#999',
	gray30: '#B3B3B3',
	gray20: '#CCC',
	gray15: '#D9D9D9',
	gray10: '#E5E5E5',
	gray05: '#F2F2F2',

	// social
	facebook: '#3B5998',
	google: '#DC4E41',
	instagram: '#3f729b',
	pinterest: '#bd081c',
	tumblr: '#35465c',
	twitter: '#55ACEE',
	youtube: '#cd201f',
	vimeo: '#1ab7ea'
};

// border radii

theme.borderRadius = {
	small: '0.125rem',
	default: '0.3rem',
	large: '0.5rem'
};

// spacing

theme.spacing = {
	xsmall: 5,
	small: 10,
	default: 20,
	large: 30,
	xlarge: 40,
	xxlarge: 60
};

// ==============================
// ELEMENTAL SPECIFIC
// ==============================

// button

theme.button = {
	borderRadius: theme.borderRadius.default,
	borderWidth: 1,
	font: {
		weight: 500
	},
	paddingHorizontal: '1em',
	default: {
		bgColor: theme.color.primary,
		borderColor: blend(theme.color.primary, theme.color.body, 60),
		textColor: theme.color.primary
	},
	primary: {
		bgColor: theme.color.primary,
		borderColor: blend(theme.color.primary, theme.color.body, 60),
		textColor: theme.color.primary
	},
	success: {
		bgColor: theme.color.success,
		borderColor: blend(theme.color.success, theme.color.body, 60),
		textColor: theme.color.success
	},
	warning: {
		bgColor: theme.color.warning,
		borderColor: blend(theme.color.warning, theme.color.body, 60),
		textColor: theme.color.warning
	},
	danger: {
		bgColor: theme.color.danger,
		borderColor: blend(theme.color.danger, theme.color.body, 60),
		textColor: theme.color.danger
	}
};

// blank state

theme.blankstate = {
	background: darken(theme.color.body, 4),
	borderRadius: theme.borderRadius.default,
	color: theme.color.gray40,
	paddingHorizontal: '2em',
	paddingVertical: '4em'
};

// font

theme.font = {
	family: {
		mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
		sansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
		serif: 'Georgia, Times New Roman, Times, serif'
	},
	size: {
		xxsmall: '0.65rem',
		xsmall: '0.75rem',
		small: '0.85rem',
		default: '1rem',
		medium: '1.2rem',
		large: '1.6rem',
		xlarge: '2.4rem',
		xxlarge: '3.2rem'
	}
};

// form

theme.form = {
	label: {
		color: theme.color.gray50,
		fontSize: '1rem',
		fontWeight: 'normal',
		width: 180
	},
	note: {
		color: theme.color.gray40,
		fontSize: '0.9em'
	}
};

// component

theme.component = {
	lineHeight: '2.3em',
	height: '2.4em',
	padding: '1em'
};

// input

theme.input = {
	background: {
		default: 'white',
		disabled: '#fafafa',
		noedit: darken(theme.color.body, 2)
	},
	placeholderColor: '#aaa',
	lineHeight: theme.component.lineHeight,
	height: theme.component.height,
	border: {
		color: {
			default: '#ccc',
			focus: theme.color.info,
			hover: '#bbb',
			noedit: darken(theme.color.body, 8)
		},
		radius: theme.borderRadius.default,
		width: 1
	},
	boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
	boxShadowFocus: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px ' + fade(theme.color.info, 10),
	paddingHorizontal: '.75em'
};

// select

theme.select = {
	boxShadow: '0 1px 1px rgba(0, 0, 0, 0.075)'
};

// alert

theme.alert = {
	padding: '0.75em  1em',
	margin: '0 0 1em',
	borderWidth: 1,
	borderRadius: theme.borderRadius.default,

	color: {
		danger: {
			background: fade(theme.color.danger, 10),
			border: fade(theme.color.danger, 10),
			text: theme.color.danger
		},
		info: {
			background: fade(theme.color.primary, 10),
			border: fade(theme.color.primary, 10),
			text: theme.color.primary
		},
		success: {
			background: fade(theme.color.success, 10),
			border: fade(theme.color.success, 10),
			text: theme.color.success
		},
		warning: {
			background: fade(theme.color.warning, 10),
			border: fade(theme.color.warning, 10),
			text: theme.color.warning
		}
	}
};

// glyph

theme.glyph = {
	color: {
		danger: theme.color.danger,
		inherit: 'inherit',
		inverted: 'white',
		primary: theme.color.primary,
		success: theme.color.success,
		warning: theme.color.warning
	},
	size: {
		small: 16,
		medium: 32,
		large: 64
	}
};

// modal

theme.modal = {
	background: 'rgba(0, 0, 0, 0.8)',
	zIndex: 100,
	padding: {
		dialog: {
			horizontal: '1em',
			vertical: 0
		},
		body: {
			horizontal: 0,
			vertical: '1em'
		},
		footer: {
			horizontal: 0,
			vertical: '1em'
		},
		header: {
			horizontal: 0,
			vertical: '0.6em'
		}
	}
};

// pagination

theme.pagination = {
	color: theme.color.gray60,

	hover: {
		background: 'white',
		border: 'rgba(0, 0, 0, 0.1)',
		color: theme.color.gray60
	},
	selected: {
		background: 'rgba(0, 0, 0, 0.05)',
		border: 'transparent',
		color: theme.color.gray60
	},
	disabled: {
		background: 'transparent',
		color: theme.color.gray40
	}
};

// spinner

theme.spinner = {
	color: {
		danger: theme.color.danger,
		default: theme.color.gray40,
		inverted: 'white',
		primary: theme.color.primary,
		success: theme.color.success,
		warning: theme.color.warning
	},
	size: {
		small: 4,
		medium: 8,
		large: 16
	}
};

module.exports = theme;

},{"./utils/color":83}],81:[function(require,module,exports){
'use strict';

/**
 * Helper method to handle List operations, e.g. creating items, deleting items,
 * getting information about those lists, etc.
 */

var listToArray = require('list-to-array');
var qs = require('qs');
var xhr = require('xhr');
var assign = require('object-assign');
// Filters for truthy elements in an array
var truthy = function truthy(i) {
	return i;
};

/**
 * Get the columns of a list, structured by fields and headings
 *
 * @param  {Object} list The list we want the columns of
 *
 * @return {Array}       The columns
 */
function getColumns(list) {
	return list.uiElements.map(function (col) {
		if (col.type === 'heading') {
			return { type: 'heading', content: col.content };
		} else {
			var field = list.fields[col.field];
			return field ? { type: 'field', field: field, title: field.label, path: field.path } : null;
		}
	}).filter(truthy);
}

/**
 * Make an array of filters an object keyed by the filtering path
 *
 * @param  {Array} filterArray The array of filters
 *
 * @return {Object}            The corrected filters, keyed by path
 */
function getFilters(filterArray) {
	var filters = {};
	filterArray.forEach(function (filter) {
		filters[filter.field.path] = filter.value;
	});
	return filters;
};

/**
 * Get the sorting string for the URI
 *
 * @param  {Array} sort.paths The paths we want to sort
 *
 * @return {String}           All the sorting queries we want as a string
 */
function getSortString(sort) {
	return sort.paths.map(function (i) {
		// If we want to sort inverted, we prefix a "-" before the sort path
		return i.invert ? '-' + i.path : i.path;
	}).filter(truthy).join(',');
};

/**
 * Build a query string from a bunch of options
 */
function buildQueryString(options) {
	var query = {};
	if (options.search) query.search = options.search;
	if (options.filters.length) query.filters = JSON.stringify(getFilters(options.filters));
	if (options.columns) query.fields = options.columns.map(function (i) {
		return i.path;
	}).join(',');
	if (options.page && options.page.size) query.limit = options.page.size;
	if (options.page && options.page.index > 1) query.skip = (options.page.index - 1) * options.page.size;
	if (options.sort) query.sort = getSortString(options.sort);
	query.expandRelationshipFields = true;

	// Custom Filter to Fetch all Records While Selecting Manage All

	if (options.filters.fetch_all_data) {
		query.limit = options.filters.item_count;
	}

	return '?' + qs.stringify(query);
};

/**
 * The main list helper class
 *
 * @param {Object} options
 */
var List = function List(options) {
	// TODO these options are possibly unused
	assign(this, options);
	this.columns = getColumns(this);
	this.expandedDefaultColumns = this.expandColumns(this.defaultColumns);
	this.defaultColumnPaths = this.expandedDefaultColumns.map(function (i) {
		return i.path;
	}).join(',');
};

/**
 * Create an item via the API
 *
 * @param  {FormData} formData The submitted form data
 * @param  {Function} callback Called after the API call
 */
List.prototype.createItem = function (formData, callback) {
	xhr({
		url: Keystone.adminPath + '/api/' + this.path + '/create',
		responseType: 'json',
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		body: formData
	}, function (err, resp, data) {
		if (err) callback(err);
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			// NOTE: xhr callback will be called with an Error if
			//  there is an error in the browser that prevents
			//  sending the request. A HTTP 500 response is not
			//  going to cause an error to be returned.
			callback(data, null);
		}
	});
};

/**
 * Update a specific item
 *
 * @param  {String}   id       The id of the item we want to update
 * @param  {FormData} formData The submitted form data
 * @param  {Function} callback Called after the API call
 */
List.prototype.updateItem = function (id, formData, callback) {
	xhr({
		url: Keystone.adminPath + '/api/' + this.path + '/' + id,
		responseType: 'json',
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		body: formData
	}, function (err, resp, data) {
		if (err) return callback(err);
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

List.prototype.expandColumns = function (input) {
	var _this = this;

	var nameIncluded = false;
	var cols = listToArray(input).map(function (i) {
		var split = i.split('|');
		var path = split[0];
		var width = split[1];
		if (path === '__name__') {
			path = _this.namePath;
		}
		var field = _this.fields[path];
		if (!field) {
			// TODO: Support arbitary document paths
			if (!_this.hidden) {
				if (path === _this.namePath) {
					console.warn('List ' + _this.key + ' did not specify any default columns or a name field');
				} else {
					console.warn('List ' + _this.key + ' specified an invalid default column: ' + path);
				}
			}
			return;
		}
		if (path === _this.namePath) {
			nameIncluded = true;
		}
		return {
			field: field,
			label: field.label,
			path: field.path,
			type: field.type,
			width: width
		};
	}).filter(truthy);
	if (!nameIncluded) {
		cols.unshift({
			type: 'id',
			label: 'ID',
			path: 'id'
		});
	}
	return cols;
};

List.prototype.expandSort = function (input) {
	var _this2 = this;

	var sort = {
		rawInput: input || this.defaultSort,
		isDefaultSort: false
	};
	sort.input = sort.rawInput;
	if (sort.input === '__default__') {
		sort.isDefaultSort = true;
		sort.input = this.sortable ? 'sortOrder' : this.namePath;
	}
	sort.paths = listToArray(sort.input).map(function (path) {
		var invert = false;
		if (path.charAt(0) === '-') {
			invert = true;
			path = path.substr(1);
		} else if (path.charAt(0) === '+') {
			path = path.substr(1);
		}
		var field = _this2.fields[path];
		if (!field) {
			// TODO: Support arbitary document paths
			console.warn('Invalid Sort specified:', path);
			return;
		}
		return {
			field: field,
			type: field.type,
			label: field.label,
			path: field.path,
			invert: invert
		};
	}).filter(truthy);
	return sort;
};

/**
 * Load a specific item via the API
 *
 * @param  {String}   itemId   The id of the item we want to load
 * @param  {Object}   options
 * @param  {Function} callback
 */
List.prototype.loadItem = function (itemId, options, callback) {
	if (arguments.length === 2 && typeof options === 'function') {
		callback = options;
		options = null;
	}
	var url = Keystone.adminPath + '/api/' + this.path + '/' + itemId;
	var query = qs.stringify(options);
	if (query.length) url += '?' + query;
	xhr({
		url: url,
		responseType: 'json'
	}, function (err, resp, data) {
		if (err) return callback(err);
		// Pass the data as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

/**
 * Load all items of a list, optionally passing objects to build a query string
 * for sorting or searching
 *
 * @param  {Object}   options
 * @param  {Function} callback
 */
List.prototype.loadItems = function (options, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + buildQueryString(options);
	xhr({
		url: url,
		responseType: 'json'
	}, function (err, resp, data) {
		if (err) callback(err);
		// Pass the data as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, data);
		} else {
			callback(data);
		}
	});
};

/**
 * Constructs a download URL to download a list with the current sorting, filtering,
 * selection and searching options
 *
 * @param  {Object} options
 *
 * @return {String}         The download URL
 */
List.prototype.getDownloadURL = function (options) {
	var url = Keystone.adminPath + '/api/' + this.path;
	var parts = [];
	if (options.format !== 'json') {
		options.format = 'csv';
	}
	parts.push(options.search ? 'search=' + options.search : '');
	parts.push(options.filters.length ? 'filters=' + JSON.stringify(getFilters(options.filters)) : '');
	parts.push(options.columns ? 'select=' + options.columns.map(function (i) {
		return i.path;
	}).join(',') : '');
	parts.push(options.sort ? 'sort=' + getSortString(options.sort) : '');
	parts.push('expandRelationshipFields=true');
	return url + '/export.' + options.format + '?' + parts.filter(truthy).join('&');
};

/**
 * Delete a specific item via the API
 *
 * @param  {String}   itemId   The id of the item we want to delete
 * @param  {Function} callback
 */
List.prototype.deleteItem = function (itemId, callback) {
	this.deleteItems([itemId], callback);
};

/**
 * Delete multiple items at once via the API
 *
 * @param  {Array}   itemIds  An array of ids of items we want to delete
 * @param  {Function} callback
 */
List.prototype.deleteItems = function (itemIds, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + '/delete';
	xhr({
		url: url,
		method: 'POST',
		headers: assign({}, Keystone.csrf.header),
		json: {
			ids: itemIds
		}
	}, function (err, resp, body) {
		if (err) return callback(err);
		// Pass the body as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, body);
		} else {
			callback(body);
		}
	});
};

List.prototype.reorderItems = function (item, oldSortOrder, newSortOrder, pageOptions, callback) {
	var url = Keystone.adminPath + '/api/' + this.path + '/' + item.id + '/sortOrder/' + oldSortOrder + '/' + newSortOrder + '/' + buildQueryString(pageOptions);
	xhr({
		url: url,
		method: 'POST',
		headers: assign({}, Keystone.csrf.header)
	}, function (err, resp, body) {
		if (err) return callback(err);
		try {
			body = JSON.parse(body);
		} catch (e) {
			console.log('Error parsing results json:', e, body);
			return callback(e);
		}
		// Pass the body as result or error, depending on the statusCode
		if (resp.statusCode === 200) {
			callback(null, body);
		} else {
			callback(body);
		}
	});
};

module.exports = List;

},{"list-to-array":undefined,"object-assign":127,"qs":undefined,"xhr":undefined}],82:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cloudinaryMicrourl = require('cloudinary-microurl');

var _cloudinaryMicrourl2 = _interopRequireDefault(_cloudinaryMicrourl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOUD_NAME = window.Keystone.cloudinary.cloud_name;

/*
	Take a cloudinary public id + options object
	and return a url
*/
function cloudinaryResize(publicId) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (!publicId || !CLOUD_NAME) return false;

	return (0, _cloudinaryMicrourl2.default)(publicId, _extends({
		cloud_name: CLOUD_NAME, // single cloud for the admin UI
		quality: 80 }, options));
};

module.exports = cloudinaryResize;

},{"cloudinary-microurl":1}],83:[function(require,module,exports){
'use strict';

/**
	Validate Hex
	==============================

	@param {String} hex

	1. remove hash if present
	2. convert from 3 to 6 digit color code & ensure valid hex
*/

function validateHex(color) {
	var hex = color.replace('#', '');

	if (hex.length === 3) {
		return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid color value provided: "' + color + '"');
	}

	return hex;
};

/**
	Fade Color
	==============================

	Takes a hexidecimal color, converts it to RGB and applies an alpha value.

	@param {String} color
	@param {Number} opacity (0-100)

	1. convert hex to RGB
	2. combine and add alpha channel
*/

function fade(color) {
	var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

	var decimalFraction = opacity / 100;
	var hex = validateHex(color);

	// 1.
	var r = parseInt(hex.substring(0, 2), 16);
	var g = parseInt(hex.substring(2, 4), 16);
	var b = parseInt(hex.substring(4, 6), 16);

	// 2.
	var result = 'rgba(' + r + ',' + g + ',' + b + ',' + decimalFraction + ')';

	return result;
};

/**
	Shade Color
	==============================

	Takes a hexidecimal color, converts it to RGB and lightens or darkens

	@param {String} color
	@param {Number} opacity (0-100)

	1. do fancy RGB bitwise operations
	2. combine back into a hex value
*/

function shade(color, percent) {
	var decimalFraction = percent / 100;
	var hex = validateHex(color);

	// 1.
	var f = parseInt(hex, 16);
	var t = decimalFraction < 0 ? 0 : 255;
	var p = decimalFraction < 0 ? decimalFraction * -1 : decimalFraction;

	var R = f >> 16;
	var G = f >> 8 & 0x00FF;
	var B = f & 0x0000FF;

	// 2.
	return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

// shade helpers
var lighten = shade;
function darken(color, percent) {
	return shade(color, percent * -1);
};

/**
	Blend Color
	==============================

	Takes two hexidecimal colors and blend them together

	@param {String} color1
	@param {String} color2
	@param {Number} percent (0-100)

	1. do fancy RGB bitwise operations
	2. combine back into a hex value
*/

function blend(color1, color2, percent) {
	var decimalFraction = percent / 100;
	var hex1 = validateHex(color1);
	var hex2 = validateHex(color2);

	// 1.
	var f = parseInt(hex1, 16);
	var t = parseInt(hex2, 16);

	var R1 = f >> 16;
	var G1 = f >> 8 & 0x00FF;
	var B1 = f & 0x0000FF;

	var R2 = t >> 16;
	var G2 = t >> 8 & 0x00FF;
	var B2 = t & 0x0000FF;

	// 2.
	return '#' + (0x1000000 + (Math.round((R2 - R1) * decimalFraction) + R1) * 0x10000 + (Math.round((G2 - G1) * decimalFraction) + G1) * 0x100 + (Math.round((B2 - B1) * decimalFraction) + B1)).toString(16).slice(1);
}

module.exports = {
	blend: blend,
	darken: darken,
	fade: fade,
	lighten: lighten
};

},{}],84:[function(require,module,exports){
"use strict";

// ======================
// Concatenate Classnames
// ======================
//
// Support className as an array:
// force classname prop into an array (possibly of arrays) then flatten

/*
	// To use spread the new array into aphrodite's `css` function

	function Component ({ className, ...props }) {
		props.className = css(
			classes.component,
			...concatClassnames(className)
		);

		return <Component {...props} />;
	};
*/

module.exports = function concatClassnames(className) {
	return [className].reduce(function (a, b) {
		return a.concat(b);
	}, []);
};

},{}],85:[function(require,module,exports){
'use strict';

/**
	Linear Gradient
	==============================

	Short-hand helper for adding a linear gradient to your component.

	- @param {String} sideOrCorner
	- @param {String} top
	- @param {String} bottom
	- @param {String} base (optional)
	- @returns {Object} css linear gradient declaration

	Spread the declaration into your component class:
	------------------------------

	myComponentClass: {
		...linearGradient(red, blue),
	}
*/

function linearGradient(direction, top, bottom) {
	var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	return {
		background: 'linear-gradient(' + direction + ', ' + top + ' 0%, ' + bottom + ' 100%) ' + base
	};
}

// Vertical Gradient
function gradientVertical(top, bottom, base) {
	return linearGradient('to bottom', top, bottom, base);
}

// Horizontal Gradient
function gradientHorizontal(top, bottom, base) {
	return linearGradient('to right', top, bottom, base);
}

/**
	Border Radius
	==============================

	Short-hand helper for border radii
*/

// top
function borderTopRadius(radius) {
	return {
		borderTopLeftRadius: radius,
		borderTopRightRadius: radius
	};
}

// right
function borderRightRadius(radius) {
	return {
		borderBottomRightRadius: radius,
		borderTopRightRadius: radius
	};
}

// bottom
function borderBottomRadius(radius) {
	return {
		borderBottomLeftRadius: radius,
		borderBottomRightRadius: radius
	};
}

// left
function borderLeftRadius(radius) {
	return {
		borderBottomLeftRadius: radius,
		borderTopLeftRadius: radius
	};
}

// Return

module.exports = {
	borderTopRadius: borderTopRadius,
	borderRightRadius: borderRightRadius,
	borderBottomRadius: borderBottomRadius,
	borderLeftRadius: borderLeftRadius,

	gradientHorizontal: gradientHorizontal,
	gradientVertical: gradientVertical
};

},{}],86:[function(require,module,exports){
'use strict';

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.listsByKey = {}; /**
                          * Exports an object of lists, keyed with their key instead of their name and
                          * wrapped with the List helper (./List.js)
                          */

exports.listsByPath = {};

for (var key in Keystone.lists) {
	// Guard for-ins
	if ({}.hasOwnProperty.call(Keystone.lists, key)) {
		var list = new _List2.default(Keystone.lists[key]);
		exports.listsByKey[key] = list;
		exports.listsByPath[list.path] = list;
	}
}

},{"./List":81}],87:[function(require,module,exports){
'use strict';

var _i = require('i');

var _i2 = _interopRequireDefault(_i);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays the singular or plural of a string based on a number
 * or number of items in an array.
 *
 * If arity is 1, returns the plural form of the word.
 *
 * @param {String} count
 * @param {String} singular string
 * @param {String} plural string
 * @return {String} singular or plural, * is replaced with count
 * @api public
 */

/**
 * A few helper methods for strings
 */

exports.plural = function (count, sn, pl) {
  if (arguments.length === 1) {
    return _i2.default.pluralize(count);
  }
  if (typeof sn !== 'string') sn = '';
  if (!pl) {
    pl = _i2.default.pluralize(sn);
  }
  if (typeof count === 'string') {
    count = Number(count);
  } else if (typeof count !== 'number') {
    count = (0, _lodash.size)(count);
  }
  return (count === 1 ? sn : pl).replace('*', count);
};

/**
 * Converts the first letter in a string to uppercase
 *
 * @param {String} str
 * @return {String} Str
 * @api public
 */

exports.upcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

/**
 * Converts the first letter in a string to lowercase
 *
 * @param {String} Str
 * @return {String} str
 * @api public
 */

exports.downcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

/**
 * Converts a string to title case
 *
 * @param {String} str
 * @return {String} Title Case form of str
 * @api public
 */

exports.titlecase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  var parts = str.split(/\s|_|\-/);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
      parts[i] = exports.upcase(parts[i]);
    }
  }
  return (0, _lodash.compact)(parts).join(' ');
};

/**
 * Converts a string to camel case
 *
 * @param {String} str
 * @param {Boolean} lowercaseFirstWord
 * @return {String} camel-case form of str
 * @api public
 */

exports.camelcase = function (str, lc) {
  return _i2.default.camelize(str, !lc);
};

},{"i":undefined,"lodash":undefined}],88:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color = require('../../admin/client/utils/color');

var _constants = require('../../admin/client/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = _react2.default.createClass({
	displayName: 'Checkbox',
	propTypes: {
		checked: _react2.default.PropTypes.bool,
		component: _react2.default.PropTypes.node,
		onChange: _react2.default.PropTypes.func,
		readonly: _react2.default.PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			component: 'button'
		};
	},
	getInitialState: function getInitialState() {
		return {
			active: null,
			focus: null,
			hover: null
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('mouseup', this.handleMouseUp, false);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('mouseup', this.handleMouseUp, false);
	},
	getStyles: function getStyles() {
		var _props = this.props,
		    checked = _props.checked,
		    readonly = _props.readonly;
		var _state = this.state,
		    active = _state.active,
		    focus = _state.focus,
		    hover = _state.hover;


		var checkedColor = '#3999fc';

		var background = checked && !readonly ? checkedColor : 'white';
		var borderColor = checked && !readonly ? 'rgba(0,0,0,0.15) rgba(0,0,0,0.1) rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3) rgba(0,0,0,0.2) rgba(0,0,0,0.15)';
		var boxShadow = checked && !readonly ? '0 1px 0 rgba(255,255,255,0.33)' : 'inset 0 1px 0 rgba(0,0,0,0.06)';
		var color = checked && !readonly ? 'white' : '#bbb';
		var textShadow = checked && !readonly ? '0 1px 0 rgba(0,0,0,0.2)' : null;

		// pseudo state
		if (hover && !focus && !readonly) {
			borderColor = checked ? 'rgba(0,0,0,0.1) rgba(0,0,0,0.15) rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.35) rgba(0,0,0,0.3) rgba(0,0,0,0.25)';
		}
		if (active) {
			background = checked && !readonly ? (0, _color.darken)(checkedColor, 20) : '#eee';
			borderColor = checked && !readonly ? 'rgba(0,0,0,0.25) rgba(0,0,0,0.3) rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.4) rgba(0,0,0,0.35) rgba(0,0,0,0.3)';
			boxShadow = checked && !readonly ? '0 1px 0 rgba(255,255,255,0.33)' : 'inset 0 1px 3px rgba(0,0,0,0.2)';
		}
		if (focus && !active) {
			borderColor = checked && !readonly ? 'rgba(0,0,0,0.25) rgba(0,0,0,0.3) rgba(0,0,0,0.35)' : checkedColor;
			boxShadow = checked && !readonly ? '0 0 0 3px ' + (0, _color.fade)(checkedColor, 15) : 'inset 0 1px 2px rgba(0,0,0,0.15), 0 0 0 3px ' + (0, _color.fade)(checkedColor, 15);
		}

		// noedit
		if (readonly) {
			background = 'rgba(255,255,255,0.5)';
			borderColor = 'rgba(0,0,0,0.1)';
			boxShadow = 'none';
			color = checked ? checkedColor : '#bbb';
		}

		return {
			alignItems: 'center',
			background: background,
			border: '1px solid',
			borderColor: borderColor,
			borderRadius: _constants2.default.borderRadius.sm,
			boxShadow: boxShadow,
			color: color,
			display: 'inline-block',
			fontSize: 14,
			height: 16,
			lineHeight: '15px',
			outline: 'none',
			padding: 0,
			textAlign: 'center',
			textShadow: textShadow,
			verticalAlign: 'middle',
			width: 16,

			msTransition: 'all 120ms ease-out',
			MozTransition: 'all 120ms ease-out',
			WebkitTransition: 'all 120ms ease-out',
			transition: 'all 120ms ease-out'
		};
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode !== 32) return;
		this.toggleActive(true);
	},
	handleKeyUp: function handleKeyUp() {
		this.toggleActive(false);
	},
	handleMouseOver: function handleMouseOver() {
		this.toggleHover(true);
	},
	handleMouseDown: function handleMouseDown() {
		this.toggleActive(true);
		this.toggleFocus(true);
	},
	handleMouseUp: function handleMouseUp() {
		this.toggleActive(false);
	},
	handleMouseOut: function handleMouseOut() {
		this.toggleHover(false);
	},
	toggleActive: function toggleActive(pseudo) {
		this.setState({ active: pseudo });
	},
	toggleHover: function toggleHover(pseudo) {
		this.setState({ hover: pseudo });
	},
	toggleFocus: function toggleFocus(pseudo) {
		this.setState({ focus: pseudo });
	},
	handleChange: function handleChange() {
		this.props.onChange(!this.props.checked);
	},
	render: function render() {
		var _this = this;

		var _props2 = this.props,
		    checked = _props2.checked,
		    readonly = _props2.readonly;


		var props = (0, _blacklist2.default)(this.props, 'checked', 'component', 'onChange', 'readonly');
		props.style = this.getStyles();
		props.ref = 'checkbox';
		props.className = (0, _classnames2.default)('octicon', {
			'octicon-check': checked,
			'octicon-x': typeof checked === 'boolean' && !checked && readonly
		});
		props.type = readonly ? null : 'button';

		props.onKeyDown = this.handleKeyDown;
		props.onKeyUp = this.handleKeyUp;

		props.onMouseDown = this.handleMouseDown;
		props.onMouseUp = this.handleMouseUp;
		props.onMouseOver = this.handleMouseOver;
		props.onMouseOut = this.handleMouseOut;

		props.onClick = readonly ? null : this.handleChange;
		props.onFocus = readonly ? null : function () {
			return _this.toggleFocus(true);
		};
		props.onBlur = readonly ? null : function () {
			return _this.toggleFocus(false);
		};

		var node = readonly ? 'span' : this.props.component;

		return _react2.default.createElement(node, props);
	}
});

module.exports = Checkbox;

},{"../../admin/client/constants":79,"../../admin/client/utils/color":83,"blacklist":undefined,"classnames":undefined,"react":undefined}],89:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE marginBottom of 1px stops things jumping around
// TODO find out why this is necessary

function CollapsedFieldLabel(_ref) {
	var style = _ref.style,
	    props = _objectWithoutProperties(_ref, ['style']);

	var __style__ = _extends({
		marginBottom: 1,
		paddingLeft: 0,
		paddingRight: 0
	}, style);

	return _react2.default.createElement(_elemental.Button, _extends({ variant: 'link', style: __style__ }, props));
};

module.exports = CollapsedFieldLabel;

},{"../../admin/client/App/elemental":65,"react":undefined}],90:[function(require,module,exports){
'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Popout = require('../../admin/client/App/shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _elemental = require('../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastId = 0;

module.exports = _react2.default.createClass({
	displayName: 'DateInput',
	propTypes: {
		format: _react2.default.PropTypes.string,
		name: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			format: 'YYYY-MM-DD'
		};
	},
	getInitialState: function getInitialState() {
		var id = ++lastId;
		var month = new Date();
		var _props = this.props,
		    format = _props.format,
		    value = _props.value;

		if ((0, _moment2.default)(value, format, true).isValid()) {
			month = (0, _moment2.default)(value, format).toDate();
		}
		return {
			id: '_DateInput_' + id,
			month: month,
			pickerIsOpen: false,
			inputValue: value
		};
	},
	componentDidMount: function componentDidMount() {
		this.showCurrentMonth();
	},

	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (newProps.value === this.props.value) return;
		this.setState({
			month: (0, _moment2.default)(newProps.value, this.props.format).toDate(),
			inputValue: newProps.value
		}, this.showCurrentMonth);
	},
	focus: function focus() {
		if (!this.refs.input) return;
		(0, _reactDom.findDOMNode)(this.refs.input).focus();
	},
	handleInputChange: function handleInputChange(e) {
		var value = e.target.value;

		this.setState({ inputValue: value }, this.showCurrentMonth);
	},
	handleKeyPress: function handleKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// If the date is strictly equal to the format string, dispatch onChange
			if ((0, _moment2.default)(this.state.inputValue, this.props.format, true).isValid()) {
				this.props.onChange({ value: this.state.inputValue });
				// If the date is not strictly equal, only change the tab that is displayed
			} else if ((0, _moment2.default)(this.state.inputValue, this.props.format).isValid()) {
				this.setState({
					month: (0, _moment2.default)(this.state.inputValue, this.props.format).toDate()
				}, this.showCurrentMonth);
			}
		}
	},
	handleDaySelect: function handleDaySelect(e, date, modifiers) {
		if (modifiers && modifiers.disabled) return;

		var value = (0, _moment2.default)(date).format(this.props.format);

		this.props.onChange({ value: value });
		this.setState({
			pickerIsOpen: false,
			month: date,
			inputValue: value
		});
	},
	showPicker: function showPicker() {
		this.setState({ pickerIsOpen: true }, this.showCurrentMonth);
	},
	showCurrentMonth: function showCurrentMonth() {
		if (!this.refs.picker) return;
		this.refs.picker.showMonth(this.state.month);
	},
	handleFocus: function handleFocus(e) {
		if (this.state.pickerIsOpen) return;
		this.showPicker();
	},
	handleCancel: function handleCancel() {
		this.setState({ pickerIsOpen: false });
	},
	handleBlur: function handleBlur(e) {
		var rt = e.relatedTarget || e.nativeEvent.explicitOriginalTarget;
		var popout = this.refs.popout.getPortalDOMNode();
		while (rt) {
			if (rt === popout) return;
			rt = rt.parentNode;
		}
		this.setState({
			pickerIsOpen: false
		});
	},
	render: function render() {
		var _this = this;

		var selectedDay = this.props.value;
		// react-day-picker adds a class to the selected day based on this
		var modifiers = {
			selected: function selected(day) {
				return (0, _moment2.default)(day).format(_this.props.format) === selectedDay;
			}
		};

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_elemental.FormInput, {
				autoComplete: 'off',
				id: this.state.id,
				name: this.props.name,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleFocus,
				onKeyPress: this.handleKeyPress,
				placeholder: this.props.format,
				ref: 'input',
				value: this.state.inputValue
			}),
			_react2.default.createElement(
				_Popout2.default,
				{
					isOpen: this.state.pickerIsOpen,
					onCancel: this.handleCancel,
					ref: 'popout',
					relativeToID: this.state.id,
					width: 260
				},
				_react2.default.createElement(_reactDayPicker2.default, {
					modifiers: modifiers,
					onDayClick: this.handleDaySelect,
					ref: 'picker',
					tabIndex: -1
				})
			)
		);
	}
});

},{"../../admin/client/App/elemental":65,"../../admin/client/App/shared/Popout":77,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],91:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

var _color = require('../../admin/client/utils/color');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FileChangeMessage(_ref) {
	var style = _ref.style,
	    color = _ref.color,
	    props = _objectWithoutProperties(_ref, ['style', 'color']);

	var styles = _extends({
		marginRight: 10,
		minWidth: 0
	}, style);

	if (color !== 'default') {
		styles.backgroundColor = (0, _color.fade)(_theme2.default.color[color], 10);
		styles.borderColor = (0, _color.fade)(_theme2.default.color[color], 30);
		styles.color = _theme2.default.color[color];
	}

	return _react2.default.createElement(_elemental.FormInput, _extends({
		noedit: true,
		style: styles
	}, props));
};

FileChangeMessage.propTypes = {
	color: _react.PropTypes.oneOf(['danger', 'default', 'success'])
};
FileChangeMessage.defaultProps = {
	color: 'default'
};

module.exports = FileChangeMessage;

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":80,"../../admin/client/utils/color":83,"react":undefined}],92:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
	Expose internal ref to parent
	=============================

	Field.create({
		triggerFileBrowser () {
			this.refs.fileInput.clickDomNode();
		},
		render () {
			<HiddenFileInput ref="fileInput" />
		}
	});
*/

var HiddenFileInput = function (_Component) {
	_inherits(HiddenFileInput, _Component);

	function HiddenFileInput() {
		_classCallCheck(this, HiddenFileInput);

		var _this = _possibleConstructorReturn(this, (HiddenFileInput.__proto__ || Object.getPrototypeOf(HiddenFileInput)).call(this));

		_this.clearValue = _this.clearValue.bind(_this);
		_this.clickDomNode = _this.clickDomNode.bind(_this);
		_this.hasValue = _this.hasValue.bind(_this);
		return _this;
	}

	_createClass(HiddenFileInput, [{
		key: 'clearValue',
		value: function clearValue() {
			this.target.value = '';
		}
	}, {
		key: 'clickDomNode',
		value: function clickDomNode() {
			this.target.click();
		}
	}, {
		key: 'hasValue',
		value: function hasValue() {
			return !!this.target.value;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    style = _props.style,
			    props = _objectWithoutProperties(_props, ['style']);

			var setRef = function setRef(n) {
				return _this2.target = n;
			};
			var styles = _extends({
				left: -9999,
				position: 'absolute'
			}, style);

			return _react2.default.createElement('input', _extends({}, props, {
				style: styles,
				ref: setRef,
				tabIndex: '-1',
				type: 'file'
			}));
		}
	}]);

	return HiddenFileInput;
}(_react.Component);

;

HiddenFileInput.propTypes = {
	onChange: _react.PropTypes.func.isRequired
};

module.exports = HiddenFileInput;

},{"react":undefined}],93:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glamor = require('glamor');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../admin/client/App/elemental');

var _theme = require('../../admin/client/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// FIXME static octicon classes leaning on Elemental to avoid duplicate
// font and CSS; inflating the project size

var ICON_MAP = {
	loading: '',
	remove: 'mega-octicon octicon-trashcan',
	upload: 'mega-octicon octicon-cloud-upload'
};

function ImageThumbnail(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    component = _ref.component,
	    mask = _ref.mask,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'component', 'mask']);

	var maskUI = mask ? _react2.default.createElement(
		'div',
		{ className: (0, _glamor.css)(classes.mask) + (' ' + ICON_MAP[mask]) },
		mask === 'loading' ? _react2.default.createElement(_elemental.Spinner, { color: 'inverted' }) : null
	) : null;

	// apply hover and focus styles only when using an anchor
	props.className = (0, _glamor.css)(classes.base, component === 'a' ? classes.anchor : null, className);

	// append the mask UI to children
	props.children = [].concat(children, [maskUI]);

	return _react2.default.createElement(component, props);
};

ImageThumbnail.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	mask: _react.PropTypes.oneOf(['loading', 'remove', 'upload'])
};
ImageThumbnail.defaultProps = {
	component: 'span'
};

/* eslint quote-props: ["error", "as-needed"] */
var GUTTER_WIDTH = 4;
var hoverAndFocusStyles = {
	borderColor: _theme2.default.input.border.color.focus,
	outline: 'none'
};
var classes = {
	base: {
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		border: '1px solid ' + _theme2.default.input.border.color.default,
		display: 'inline-block',
		height: 'auto',
		lineHeight: '1',
		maxWidth: '100%',
		padding: GUTTER_WIDTH,
		position: 'relative'
	},
	anchor: {
		':hover': hoverAndFocusStyles,
		':focus': _extends({}, hoverAndFocusStyles, {
			boxShadow: _theme2.default.input.boxShadowFocus
		})
	},

	// mask
	mask: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		bottom: GUTTER_WIDTH,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		left: GUTTER_WIDTH,
		lineHeight: 90,
		overflow: 'hidden',
		position: 'absolute',
		right: GUTTER_WIDTH,
		textAlign: 'center',
		top: GUTTER_WIDTH
	}
};

module.exports = ImageThumbnail;

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":80,"glamor":undefined,"react":undefined}],94:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ItemsTableCell(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _classnames2.default)('ItemList__col', className);

	return _react2.default.createElement('td', props);
};

module.exports = ItemsTableCell;

},{"classnames":undefined,"react":undefined}],95:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ItemsTableValue(_ref) {
	var className = _ref.className,
	    component = _ref.component,
	    empty = _ref.empty,
	    exterior = _ref.exterior,
	    field = _ref.field,
	    href = _ref.href,
	    interior = _ref.interior,
	    padded = _ref.padded,
	    to = _ref.to,
	    truncate = _ref.truncate,
	    props = _objectWithoutProperties(_ref, ['className', 'component', 'empty', 'exterior', 'field', 'href', 'interior', 'padded', 'to', 'truncate']);

	// TODO remove in the next release
	if (href) {
		console.warn('ItemsTableValue: `href` will be deprecated in the next release, use `to`.');
	}
	var linkRef = to || href;
	var Component = linkRef ? _reactRouter.Link : component;

	props.className = (0, _classnames2.default)('ItemList__value', field ? 'ItemList__value--' + field : null, {
		'ItemList__link--empty': empty,
		'ItemList__link--exterior': linkRef && exterior,
		'ItemList__link--interior': linkRef && interior,
		'ItemList__link--padded': linkRef && padded,
		'ItemList__value--truncate': truncate
	}, className);
	props.to = linkRef;
	props.title = props.children;

	return _react2.default.createElement(Component, props);
};

ItemsTableValue.propTypes = {
	component: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func]),
	empty: _react.PropTypes.bool,
	exterior: _react.PropTypes.bool, // FIXME this should be "external" e.g. an external link
	field: _react.PropTypes.string,
	href: _react.PropTypes.string, // TODO remove in next release
	interior: _react.PropTypes.bool, // FIXME this should be "internal" e.g. an internal link
	padded: _react.PropTypes.bool,
	to: _react.PropTypes.string,
	truncate: _react.PropTypes.bool
};
ItemsTableValue.defaultProps = {
	component: 'div',
	truncate: true
};

module.exports = ItemsTableValue;

},{"classnames":undefined,"react":undefined,"react-router":undefined}],96:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGE_SIZE = 18;

var linkStyle = {
	marginRight: 8
};
var boxStyle = {
	borderRadius: 3,
	display: 'inline-block',
	height: IMAGE_SIZE,
	overflow: 'hidden',
	verticalAlign: 'middle',
	width: IMAGE_SIZE
};
var imageStyle = {
	display: 'block',
	height: IMAGE_SIZE,
	left: '50%',
	position: 'relative',

	WebkitTransform: 'translateX(-50%)',
	MozTransform: 'translateX(-50%)',
	msTransform: 'translateX(-50%)',
	transform: 'translateX(-50%)'
};
var textStyle = {
	color: '#888',
	display: 'inline-block',
	fontSize: '.8rem',
	marginLeft: 8,
	verticalAlign: 'middle'
};

var CloudinaryImageSummary = _react2.default.createClass({
	displayName: 'CloudinaryImageSummary',
	propTypes: {
		image: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.oneOf(['dimensions', 'publicId'])
	},
	renderLabel: function renderLabel() {
		if (!this.props.label) return;

		var _props = this.props,
		    label = _props.label,
		    image = _props.image;


		var text = void 0;
		if (label === 'dimensions') {
			text = image.width + ' \xD7 ' + image.height;
		} else {
			text = image.public_id + '.' + image.format;
		}

		return _react2.default.createElement(
			'span',
			{ style: textStyle },
			text
		);
	},
	renderImageThumbnail: function renderImageThumbnail() {
		if (!this.props.image) return;
		var url = this.props.image.url.replace(/image\/upload/, 'image/upload/c_thumb,g_face,h_' + IMAGE_SIZE + ',w_' + IMAGE_SIZE);
		return _react2.default.createElement('img', { src: url, style: imageStyle, className: 'img-load' });
	},
	render: function render() {
		return _react2.default.createElement(
			'span',
			{ style: linkStyle },
			_react2.default.createElement(
				'span',
				{ style: boxStyle },
				this.renderImageThumbnail()
			),
			this.renderLabel()
		);
	}
});

module.exports = CloudinaryImageSummary;

},{"react":undefined}],97:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdColumn = _react2.default.createClass({
	displayName: 'IdColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.id;
		if (!value) return null;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ padded: true, interior: true, title: value, to: Keystone.adminPath + '/' + this.props.list.path + '/' + value, field: this.props.col.type },
			value
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = IdColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],98:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidColumn = _react2.default.createClass({
	displayName: 'InvalidColumn',
	propTypes: {
		col: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			'(Invalid Type: ',
			this.props.col.type,
			')'
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = InvalidColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],99:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _evalDependsOn = require('../utils/evalDependsOn.js');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../admin/client/App/elemental');

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _CollapsedFieldLabel = require('../components/CollapsedFieldLabel');

var _CollapsedFieldLabel2 = _interopRequireDefault(_CollapsedFieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(arg) {
	return Object.prototype.toString.call(arg) === '[object Object]';
}

function validateSpec(spec) {
	if (!spec) spec = {};
	if (!isObject(spec.supports)) {
		spec.supports = {};
	}
	if (!spec.focusTargetRef) {
		spec.focusTargetRef = 'focusTarget';
	}
	return spec;
}

var Base = module.exports.Base = {
	getInitialState: function getInitialState() {
		return {};
	},
	getDefaultProps: function getDefaultProps() {
		return {
			adminPath: Keystone.adminPath,
			inputProps: {},
			labelProps: {},
			valueProps: {},
			size: 'full'
		};
	},
	getInputName: function getInputName(path) {
		// This correctly creates the path for field inputs, and supports the
		// inputNamePrefix prop that is required for nested fields to work
		return this.props.inputNamePrefix ? this.props.inputNamePrefix + '[' + path + ']' : path;
	},
	valueChanged: function valueChanged(event) {
		this.props.onChange({
			path: this.props.path,
			value: event.target.value
		});
	},
	shouldCollapse: function shouldCollapse() {
		return this.props.collapse && !this.props.value;
	},
	shouldRenderField: function shouldRenderField() {
		if (this.props.mode === 'create') return true;
		return !this.props.noedit;
	},
	focus: function focus() {
		if (!this.refs[this.spec.focusTargetRef]) return;
		(0, _reactDom.findDOMNode)(this.refs[this.spec.focusTargetRef]).focus();
	},
	renderNote: function renderNote() {
		if (!this.props.note) return null;

		return _react2.default.createElement(_elemental.FormNote, { html: this.props.note });
	},
	renderField: function renderField() {
		var _props = this.props,
		    autoFocus = _props.autoFocus,
		    value = _props.value,
		    inputProps = _props.inputProps;

		return _react2.default.createElement(_elemental.FormInput, _extends({}, inputProps, {
			autoFocus: autoFocus,
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			value: value
		}));
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.props.value
		);
	},
	renderUI: function renderUI() {
		var wrapperClassName = (0, _classnames2.default)('field-type-' + this.props.type, this.props.className, { 'field-monospace': this.props.monospace });
		return _react2.default.createElement(
			_elemental.FormField,
			{ htmlFor: this.props.path, label: this.props.label, className: wrapperClassName, cropLabel: true },
			_react2.default.createElement(
				'div',
				{ className: 'FormField__inner field-size-' + this.props.size },
				this.shouldRenderField() ? this.renderField() : this.renderValue()
			),
			this.renderNote()
		);
	}
};

var Mixins = module.exports.Mixins = {
	Collapse: {
		componentWillMount: function componentWillMount() {
			this.setState({
				isCollapsed: this.shouldCollapse()
			});
		},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			if (prevState.isCollapsed && !this.state.isCollapsed) {
				this.focus();
			}
		},
		uncollapse: function uncollapse() {
			this.setState({
				isCollapsed: false
			});
		},
		renderCollapse: function renderCollapse() {
			if (!this.shouldRenderField()) return null;
			return _react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(
					_CollapsedFieldLabel2.default,
					{ onClick: this.uncollapse },
					'+ Add ',
					this.props.label.toLowerCase()
				)
			);
		}
	}
};

module.exports.create = function (spec) {

	spec = validateSpec(spec);

	var field = {
		spec: spec,
		displayName: spec.displayName,
		mixins: [Mixins.Collapse],
		statics: {
			getDefaultValue: function getDefaultValue(field) {
				return field.defaultValue || '';
			}
		},
		render: function render() {
			if (this.props.hidden) {
				return null;
			}
			if (!(0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
				return null;
			}
			if (this.state.isCollapsed) {
				return this.renderCollapse();
			}
			return this.renderUI();
		}
	};

	if (spec.statics) {
		_extends(field.statics, spec.statics);
	}

	var excludeBaseMethods = {};
	if (spec.mixins) {
		spec.mixins.forEach(function (mixin) {
			Object.keys(mixin).forEach(function (name) {
				if (Base[name]) {
					excludeBaseMethods[name] = true;
				}
			});
		});
	}

	_extends(field, (0, _blacklist2.default)(Base, excludeBaseMethods));
	_extends(field, (0, _blacklist2.default)(spec, 'mixins', 'statics'));

	if (Array.isArray(spec.mixins)) {
		field.mixins = field.mixins.concat(spec.mixins);
	}

	return _react2.default.createClass(field);
};

},{"../../admin/client/App/elemental":65,"../components/CollapsedFieldLabel":89,"../utils/evalDependsOn.js":126,"blacklist":undefined,"classnames":undefined,"react":undefined,"react-dom":undefined}],100:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanColumn = _react2.default.createClass({
	displayName: 'BooleanColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ truncate: false, field: this.props.col.type },
			_react2.default.createElement(_Checkbox2.default, { readonly: true, checked: this.props.data.fields[this.props.col.path] })
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = BooleanColumn;

},{"../../components/Checkbox":88,"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],101:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Checkbox = require('../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOOP = function NOOP() {};

module.exports = _Field2.default.create({
	displayName: 'BooleanField',
	statics: {
		type: 'Boolean'
	},
	propTypes: {
		indent: _react2.default.PropTypes.bool,
		label: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string.isRequired,
		value: _react2.default.PropTypes.bool
	},

	valueChanged: function valueChanged(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	renderFormInput: function renderFormInput() {
		if (!this.shouldRenderField()) return;

		return _react2.default.createElement('input', {
			name: this.getInputName(this.props.path),
			type: 'hidden',
			value: !!this.props.value
		});
	},
	renderUI: function renderUI() {
		var _props = this.props,
		    indent = _props.indent,
		    value = _props.value,
		    label = _props.label,
		    path = _props.path;


		return _react2.default.createElement(
			'div',
			{ 'data-field-name': path, 'data-field-type': 'boolean' },
			_react2.default.createElement(
				_elemental.FormField,
				{ offsetAbsentLabel: indent },
				_react2.default.createElement(
					'label',
					{ style: { height: '2.3em' } },
					this.renderFormInput(),
					_react2.default.createElement(_Checkbox2.default, {
						checked: value,
						onChange: this.shouldRenderField() && this.valueChanged || NOOP,
						readonly: !this.shouldRenderField()
					}),
					_react2.default.createElement(
						'span',
						{ style: { marginLeft: '.75em' } },
						label
					)
				),
				this.renderNote()
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/Checkbox":88,"../Field":99,"react":undefined}],102:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALUE_OPTIONS = [{ label: 'Is Checked', value: true }, { label: 'Is NOT Checked', value: false }];

function getDefaultValue() {
	return {
		value: true
	};
}

var BooleanFilter = _react2.default.createClass({
	displayName: 'BooleanFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			value: _react2.default.PropTypes.bool
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	updateValue: function updateValue(value) {
		this.props.onChange({ value: value });
	},
	render: function render() {
		return _react2.default.createElement(_elemental.SegmentedControl, { equalWidthSegments: true, options: VALUE_OPTIONS, value: this.props.filter.value, onChange: this.updateValue });
	}
});

module.exports = BooleanFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],103:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CloudinaryImageSummary = require('../../components/columns/CloudinaryImageSummary');

var _CloudinaryImageSummary2 = _interopRequireDefault(_CloudinaryImageSummary);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CloudinaryImageColumn = _react2.default.createClass({
	displayName: 'CloudinaryImageColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !Object.keys(value).length) return;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			_react2.default.createElement(_CloudinaryImageSummary2.default, { label: 'dimensions', image: value })
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = CloudinaryImageColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"../../components/columns/CloudinaryImageSummary":96,"react":undefined}],104:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _cloudinaryResize = require('../../../admin/client/utils/cloudinaryResize');

var _cloudinaryResize2 = _interopRequireDefault(_cloudinaryResize);

var _elemental = require('../../../admin/client/App/elemental');

var _ImageThumbnail = require('../../components/ImageThumbnail');

var _ImageThumbnail2 = _interopRequireDefault(_ImageThumbnail);

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

var _HiddenFileInput = require('../../components/HiddenFileInput');

var _HiddenFileInput2 = _interopRequireDefault(_HiddenFileInput);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
TODO: CloudinaryImageType actally supports 'remove' and 'reset' actions, but
this field will only submit `""` when 'remove' is clicked. @jossmac we need to
work out whether we're going to support deleting through the UI.
*/

var SUPPORTED_TYPES = ['image/*', 'application/pdf', 'application/postscript'];
var SUPPORTED_REGEX = new RegExp(/^image\/|application\/pdf|application\/postscript/g);

var uploadInc = 1000;

var buildInitialState = function buildInitialState(props) {
	return {
		removeExisting: false,
		uploadFieldPath: 'CloudinaryImage-' + props.path + '-' + ++uploadInc,
		userSelectedFile: null
	};
};

module.exports = _Field2.default.create({
	propTypes: {
		collapse: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		note: _react.PropTypes.string,
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.shape({
			format: _react.PropTypes.string,
			height: _react.PropTypes.number,
			public_id: _react.PropTypes.string,
			resource_type: _react.PropTypes.string,
			secure_url: _react.PropTypes.string,
			signature: _react.PropTypes.string,
			url: _react.PropTypes.string,
			version: _react.PropTypes.number,
			width: _react.PropTypes.number
		})
	},
	displayName: 'CloudinaryImageField',
	statics: {
		type: 'CloudinaryImage',
		getDefaultValue: function getDefaultValue() {
			return {};
		}
	},
	getInitialState: function getInitialState() {
		return buildInitialState(this.props);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		// console.log('CloudinaryImageField nextProps:', nextProps);
	},
	componentWillUpdate: function componentWillUpdate(nextProps) {
		// Reset the action state when the value changes
		// TODO: We should add a check for a new item ID in the store
		if (this.props.value.public_id !== nextProps.value.public_id) {
			this.setState({
				removeExisting: false,
				userSelectedFile: null
			});
		}
	},


	// ==============================
	// HELPERS
	// ==============================

	hasLocal: function hasLocal() {
		return !!this.state.userSelectedFile;
	},
	hasExisting: function hasExisting() {
		return !!(this.props.value && this.props.value.url);
	},
	hasImage: function hasImage() {
		return this.hasExisting() || this.hasLocal();
	},
	getFilename: function getFilename() {
		var _props$value = this.props.value,
		    format = _props$value.format,
		    height = _props$value.height,
		    public_id = _props$value.public_id,
		    width = _props$value.width;


		return this.state.userSelectedFile ? this.state.userSelectedFile.name : public_id + '.' + format + ' (' + width + '\xD7' + height + ')';
	},
	getImageSource: function getImageSource() {
		var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

		// TODO: This lets really wide images break the layout
		var src = void 0;
		if (this.hasLocal()) {
			src = this.state.dataUri;
		} else if (this.hasExisting()) {
			src = (0, _cloudinaryResize2.default)(this.props.value.public_id, {
				crop: 'fit',
				height: height,
				format: 'jpg'
			});
		}

		return src;
	},


	// ==============================
	// METHODS
	// ==============================

	triggerFileBrowser: function triggerFileBrowser() {
		this.refs.fileInput.clickDomNode();
	},
	handleFileChange: function handleFileChange(event) {
		var userSelectedFile = event.target.files[0];

		this.setState({ userSelectedFile: userSelectedFile });
	},


	// Toggle the lightbox
	openLightbox: function openLightbox(event) {
		event.preventDefault();
		this.setState({
			lightboxIsVisible: true
		});
	},
	closeLightbox: function closeLightbox() {
		this.setState({
			lightboxIsVisible: false
		});
	},


	// Handle image selection in file browser
	handleImageChange: function handleImageChange(e) {
		var _this = this;

		if (!window.FileReader) {
			return alert('File reader not supported by browser.');
		}

		var reader = new FileReader();
		var file = e.target.files[0];
		if (!file) return;

		if (!file.type.match(SUPPORTED_REGEX)) {
			return alert('Unsupported file type. Supported formats are: GIF, PNG, JPG, BMP, ICO, PDF, TIFF, EPS, PSD, SVG');
		}

		reader.readAsDataURL(file);

		reader.onloadstart = function () {
			_this.setState({
				loading: true
			});
		};
		reader.onloadend = function (upload) {
			_this.setState({
				dataUri: upload.target.result,
				loading: false,
				userSelectedFile: file
			});
			_this.props.onChange({ file: file });
		};
	},


	// If we have a local file added then remove it and reset the file field.
	handleRemove: function handleRemove(e) {
		var state = {};

		if (this.state.userSelectedFile) {
			state.userSelectedFile = null;
		} else if (this.hasExisting()) {
			state.removeExisting = true;
		}

		this.setState(state);
	},
	undoRemove: function undoRemove() {
		this.setState(buildInitialState(this.props));
	},


	// ==============================
	// RENDERERS
	// ==============================

	renderLightbox: function renderLightbox() {
		var value = this.props.value;


		if (!value || !value.public_id) return;

		return _react2.default.createElement(_reactImages2.default, {
			currentImage: 0,
			images: [{ src: this.getImageSource(600) }],
			isOpen: this.state.lightboxIsVisible,
			onClose: this.closeLightbox,
			showImageCount: false
		});
	},
	renderImagePreview: function renderImagePreview() {
		var value = this.props.value;

		// render icon feedback for intent

		var mask = void 0;
		if (this.hasLocal()) mask = 'upload';else if (this.state.removeExisting) mask = 'remove';else if (this.state.loading) mask = 'loading';

		var shouldOpenLightbox = value.format !== 'pdf';

		return _react2.default.createElement(
			_ImageThumbnail2.default,
			{
				component: 'a',
				href: this.getImageSource(600),
				onClick: shouldOpenLightbox && this.openLightbox,
				mask: mask,
				target: '__blank',
				style: { float: 'left', marginRight: '1em' }
			},
			_react2.default.createElement('img', { src: this.getImageSource(), style: { height: 90 } })
		);
	},
	renderFileNameAndOptionalMessage: function renderFileNameAndOptionalMessage() {
		var showChangeMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		return _react2.default.createElement(
			'div',
			null,
			this.hasImage() ? _react2.default.createElement(
				_FileChangeMessage2.default,
				null,
				this.getFilename()
			) : null,
			showChangeMessage && this.renderChangeMessage()
		);
	},
	renderChangeMessage: function renderChangeMessage() {
		if (this.state.userSelectedFile) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'success' },
				'Save to Upload'
			);
		} else if (this.state.removeExisting) {
			return _react2.default.createElement(
				_FileChangeMessage2.default,
				{ color: 'danger' },
				'Save to Remove'
			);
		} else {
			return null;
		}
	},


	// Output [cancel/remove/undo] button
	renderClearButton: function renderClearButton() {
		var clearText = this.hasLocal() ? 'Cancel' : 'Remove Image';

		return this.state.removeExisting ? _react2.default.createElement(
			_elemental.Button,
			{ variant: 'link', onClick: this.undoRemove },
			'Undo Remove'
		) : _react2.default.createElement(
			_elemental.Button,
			{ variant: 'link', color: 'cancel', onClick: this.handleRemove },
			clearText
		);
	},
	renderImageToolbar: function renderImageToolbar() {
		return _react2.default.createElement(
			'div',
			{ key: this.props.path + '_toolbar', className: 'image-toolbar' },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.triggerFileBrowser },
				this.hasImage() ? 'Change' : 'Upload',
				' Image'
			),
			this.hasImage() ? this.renderClearButton() : null
		);
	},
	renderFileInput: function renderFileInput() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement(_HiddenFileInput2.default, {
			accept: SUPPORTED_TYPES.join(),
			ref: 'fileInput',
			name: this.state.uploadFieldPath,
			onChange: this.handleImageChange
		});
	},
	renderActionInput: function renderActionInput() {
		if (!this.shouldRenderField()) return null;

		if (this.state.userSelectedFile || this.state.removeExisting) {
			var value = this.state.userSelectedFile ? 'upload:' + this.state.uploadFieldPath : '';
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				type: 'hidden',
				value: value
			});
		} else {
			return null;
		}
	},
	renderUI: function renderUI() {
		var _props = this.props,
		    label = _props.label,
		    note = _props.note,
		    path = _props.path;


		var imageContainer = _react2.default.createElement(
			'div',
			{ style: this.hasImage() ? { marginBottom: '1em' } : null },
			this.hasImage() && this.renderImagePreview(),
			this.hasImage() && this.renderFileNameAndOptionalMessage(this.shouldRenderField())
		);

		var toolbar = this.shouldRenderField() ? this.renderImageToolbar() : _react2.default.createElement(_elemental.FormInput, { noedit: true });

		return _react2.default.createElement(
			_elemental.FormField,
			{ label: label, className: 'field-type-cloudinaryimage', htmlFor: path },
			imageContainer,
			toolbar,
			!!note && _react2.default.createElement(_elemental.FormNote, { note: note }),
			this.renderLightbox(),
			this.renderFileInput(),
			this.renderActionInput()
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../../admin/client/utils/cloudinaryResize":82,"../../components/FileChangeMessage":91,"../../components/HiddenFileInput":92,"../../components/ImageThumbnail":93,"../Field":99,"react":undefined,"react-images":undefined}],105:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = [{ label: 'Is Set', value: true }, { label: 'Is NOT Set', value: false }];

function getDefaultValue() {
	return {
		exists: true
	};
}

var CloudinaryImageFilter = _react2.default.createClass({
	displayName: 'CloudinaryImageFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			exists: _react2.default.PropTypes.oneOf(OPTIONS.map(function (i) {
				return i.value;
			}))
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	toggleExists: function toggleExists(value) {
		this.props.onChange({ exists: value });
	},
	render: function render() {
		var filter = this.props.filter;


		return _react2.default.createElement(_elemental.SegmentedControl, {
			equalWidthSegments: true,
			onChange: this.toggleExists,
			options: OPTIONS,
			value: filter.exists
		});
	}
});

module.exports = CloudinaryImageFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],106:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateColumn = _react2.default.createClass({
	displayName: 'DateColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return null;

		var format = this.props.col.type === 'datetime' ? 'MMMM Do YYYY, h:mm:ss a' : 'MMMM Do YYYY';
		return (0, _moment2.default)(value).format(format);
	},
	render: function render() {
		var value = this.getValue();
		var empty = !value && this.props.linkTo ? true : false;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type, to: this.props.linkTo, empty: empty },
				value
			)
		);
	}
});

module.exports = DateColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"moment":undefined,"react":undefined}],107:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

var MODE_OPTIONS = [{ label: 'On', value: 'on' }, { label: 'After', value: 'after' }, { label: 'Before', value: 'before' }, { label: 'Between', value: 'between' }];

var DayPickerIndicator = function DayPickerIndicator(_ref) {
	var activeInputField = _ref.activeInputField;

	var style = activeInputField === 'before' ? { left: '11rem' } : null;

	return _react2.default.createElement(
		'span',
		{ className: 'DayPicker-Indicator', style: style },
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__border' }),
		_react2.default.createElement('span', { className: 'DayPicker-Indicator__bg' })
	);
};

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		inverted: INVERTED_OPTIONS[0].value,
		value: (0, _moment2.default)(0, 'HH').format(),
		before: (0, _moment2.default)(0, 'HH').format(),
		after: (0, _moment2.default)(0, 'HH').format()
	};
}

var DateFilter = _react2.default.createClass({
	displayName: 'DateFilter',
	propTypes: {
		filter: _react.PropTypes.shape({
			mode: _react.PropTypes.oneOf(MODE_OPTIONS.map(function (i) {
				return i.value;
			})),
			inverted: _react.PropTypes.boolean
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			format: 'DD-MM-YYYY',
			filter: getDefaultValue(),
			value: (0, _moment2.default)().startOf('day').toDate()
		};
	},
	getInitialState: function getInitialState() {
		return {
			activeInputField: 'after',
			month: new Date() // The month to display in the calendar
		};
	},
	componentDidMount: function componentDidMount() {
		this.__isMounted = true;
	},
	componentWillUnmount: function componentWillUnmount() {
		this.__isMounted = false;
	},


	// ==============================
	// METHODS
	// ==============================

	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	toggleInverted: function toggleInverted(value) {
		this.updateFilter({ inverted: value });
		this.setFocus(this.props.filter.mode);
	},
	selectMode: function selectMode(e) {
		var mode = e.target.value;
		this.updateFilter({ mode: mode });
		this.setFocus(mode);
	},
	setFocus: function setFocus(mode) {
		var _this = this;

		// give the UI a moment to render
		if (mode === 'between') {
			setTimeout(function () {
				(0, _reactDom.findDOMNode)(_this.refs[_this.state.activeInputField]).focus();
			}, 50);
		} else {
			setTimeout(function () {
				_this.refs.input.focus();
			}, 50);
		}
	},
	handleInputChange: function handleInputChange(e) {
		// TODO @jedwatson
		// Entering virtually any value will return an "Invalid date", so I'm
		// temporarily disabling user entry. This entire component needs review.

		// const { value } = e.target;
		// let { month } = this.state;
		// // Change the current month only if the value entered by the user is a valid
		// // date, according to the `L` format
		// if (moment(value, 'L', true).isValid()) {
		// 	month = moment(value, 'L').toDate();
		// }
		// this.updateFilter({ value: value });
		// this.setState({ month }, this.showCurrentDate);
	},
	setActiveField: function setActiveField(field) {
		this.setState({
			activeInputField: field
		});
	},
	switchBetweenActiveInputFields: function switchBetweenActiveInputFields(e, day, modifiers) {
		var _this2 = this;

		if (modifiers && modifiers.disabled) return;

		var activeInputField = this.state.activeInputField;

		var send = {};
		var newActiveField = activeInputField === 'before' ? 'after' : 'before';
		send[activeInputField] = day;
		this.updateFilter(send);
		this.setState({ activeInputField: newActiveField }, function () {
			(0, _reactDom.findDOMNode)(_this2.refs[newActiveField]).focus();
		});
	},
	selectDay: function selectDay(e, day, modifiers) {
		if (modifiers && modifiers.disabled) return;
		this.updateFilter({ value: day });
	},
	showCurrentDate: function showCurrentDate() {
		var _this3 = this;

		// give the UI a moment to render
		setTimeout(function () {
			_this3.refs.daypicker.showMonth(_this3.state.month);
		}, 50);
	},


	// ==============================
	// RENDERERS
	// ==============================

	renderToggle: function renderToggle() {
		var filter = this.props.filter;

		return _react2.default.createElement(
			'div',
			{ style: { marginBottom: '1em' } },
			_react2.default.createElement(_elemental.SegmentedControl, {
				equalWidthSegments: true,
				onChange: this.toggleInverted,
				options: INVERTED_OPTIONS,
				value: filter.inverted
			})
		);
	},
	renderControls: function renderControls() {
		var _this4 = this;

		var controls = void 0;
		var activeInputField = this.state.activeInputField;
		var _props = this.props,
		    field = _props.field,
		    filter = _props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		var placeholder = field.label + ' is ' + mode.label.toLowerCase() + '...';

		// DayPicker Modifiers - Selected Day
		var modifiers = filter.mode === 'between' ? {
			selected: function selected(day) {
				return (0, _moment2.default)(filter[activeInputField]).isSame(day);
			}
		} : {
			selected: function selected(day) {
				return (0, _moment2.default)(filter.value).isSame(day);
			}
		};

		if (mode.value === 'between') {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(
						_elemental.Grid.Row,
						{ xsmall: 'one-half', gutter: 10 },
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, {
								autoFocus: true,
								ref: 'after',
								placeholder: 'From',
								onChange: this.handleInputChange,
								onFocus: function onFocus() {
									return _this4.setActiveField('after');
								},
								value: (0, _moment2.default)(filter.after).format(this.props.format)
							})
						),
						_react2.default.createElement(
							_elemental.Grid.Col,
							null,
							_react2.default.createElement(_elemental.FormInput, {
								ref: 'before',
								placeholder: 'To',
								onChange: this.handleInputChange,
								onFocus: function onFocus() {
									return _this4.setActiveField('before');
								},
								value: (0, _moment2.default)(filter.before).format(this.props.format)
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.switchBetweenActiveInputFields
					}),
					_react2.default.createElement(DayPickerIndicator, { activeInputField: activeInputField })
				)
			);
		} else {
			controls = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: { marginBottom: '1em' } },
					_react2.default.createElement(_elemental.FormInput, {
						autoFocus: true,
						ref: 'input',
						placeholder: placeholder,
						value: (0, _moment2.default)(filter.value).format(this.props.format),
						onChange: this.handleInputChange,
						onFocus: this.showCurrentDate
					})
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					_react2.default.createElement(_reactDayPicker2.default, {
						ref: 'daypicker',
						modifiers: modifiers,
						className: 'DayPicker--chrome',
						onDayClick: this.selectDay
					}),
					_react2.default.createElement(DayPickerIndicator, null)
				)
			);
		}

		return controls;
	},
	render: function render() {
		var filter = this.props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		return _react2.default.createElement(
			'div',
			null,
			this.renderToggle(),
			_react2.default.createElement(
				'div',
				{ style: { marginBottom: '1em' } },
				_react2.default.createElement(_elemental.FormSelect, {
					options: MODE_OPTIONS,
					onChange: this.selectMode,
					value: mode.value
				})
			),
			this.renderControls()
		);
	}
});

module.exports = DateFilter;

},{"../../../admin/client/App/elemental":65,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],108:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateColumn');

},{"../date/DateColumn":106}],109:[function(require,module,exports){
'use strict';

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'DatetimeField',
	statics: {
		type: 'Datetime'
	},

	focusTargetRef: 'dateInput',

	// default input formats
	dateInputFormat: 'YYYY-MM-DD',
	timeInputFormat: 'h:mm:ss a',
	tzOffsetInputFormat: 'Z',

	// parse formats (duplicated from lib/fieldTypes/datetime.js)
	parseFormats: ['YYYY-MM-DD', 'YYYY-MM-DD h:m:s a', 'YYYY-MM-DD h:m a', 'YYYY-MM-DD H:m:s', 'YYYY-MM-DD H:m'],

	getInitialState: function getInitialState() {
		return {
			dateValue: this.props.value && this.moment(this.props.value).format(this.dateInputFormat),
			timeValue: this.props.value && this.moment(this.props.value).format(this.timeInputFormat),
			tzOffsetValue: this.props.value ? this.moment(this.props.value).format(this.tzOffsetInputFormat) : this.moment().format(this.tzOffsetInputFormat)
		};
	},
	getDefaultProps: function getDefaultProps() {
		return {
			formatString: 'Do MMM YYYY, h:mm:ss a'
		};
	},
	moment: function moment() {
		if (this.props.isUTC) return _moment3.default.utc.apply(_moment3.default, arguments);else return _moment3.default.apply(undefined, arguments);
	},


	// TODO: Move isValid() so we can share with server-side code
	isValid: function isValid(value) {
		return this.moment(value, this.parseFormats).isValid();
	},


	// TODO: Move format() so we can share with server-side code
	format: function format(value, _format) {
		_format = _format || this.dateInputFormat + ' ' + this.timeInputFormat;
		return value ? this.moment(value).format(_format) : '';
	},
	handleChange: function handleChange(dateValue, timeValue, tzOffsetValue) {
		var value = dateValue + ' ' + timeValue;
		var datetimeFormat = this.dateInputFormat + ' ' + this.timeInputFormat;

		// if the change included a timezone offset, include that in the calculation (so NOW works correctly during DST changes)
		if (typeof tzOffsetValue !== 'undefined') {
			value += ' ' + tzOffsetValue;
			datetimeFormat += ' ' + this.tzOffsetInputFormat;
		}
		// if not, calculate the timezone offset based on the date (respect different DST values)
		else {
				this.setState({ tzOffsetValue: this.moment(value, datetimeFormat).format(this.tzOffsetInputFormat) });
			}

		this.props.onChange({
			path: this.props.path,
			value: this.isValid(value) ? this.moment(value, datetimeFormat).toISOString() : null
		});
	},
	dateChanged: function dateChanged(_ref) {
		var value = _ref.value;

		this.setState({ dateValue: value });
		this.handleChange(value, this.state.timeValue);
	},
	timeChanged: function timeChanged(evt) {
		this.setState({ timeValue: evt.target.value });
		this.handleChange(this.state.dateValue, evt.target.value);
	},
	setNow: function setNow() {
		var dateValue = this.moment().format(this.dateInputFormat);
		var timeValue = this.moment().format(this.timeInputFormat);
		var tzOffsetValue = this.moment().format(this.tzOffsetInputFormat);
		this.setState({
			dateValue: dateValue,
			timeValue: timeValue,
			tzOffsetValue: tzOffsetValue
		});
		this.handleChange(dateValue, timeValue, tzOffsetValue);
	},
	renderNote: function renderNote() {
		if (!this.props.note) return null;
		return _react2.default.createElement(_elemental.FormNote, { note: this.props.note });
	},
	renderUI: function renderUI() {
		var input;
		if (this.shouldRenderField()) {
			input = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.InlineGroup,
					null,
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_DateInput2.default, {
							format: this.dateInputFormat,
							name: this.getInputName(this.props.paths.date),
							onChange: this.dateChanged,
							ref: 'dateInput',
							value: this.state.dateValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						{ grow: true },
						_react2.default.createElement(_elemental.FormInput, {
							autoComplete: 'off',
							name: this.getInputName(this.props.paths.time),
							onChange: this.timeChanged,
							placeholder: 'HH:MM:SS am/pm',
							value: this.state.timeValue
						})
					),
					_react2.default.createElement(
						_elemental.InlineGroupSection,
						null,
						_react2.default.createElement(
							_elemental.Button,
							{ onClick: this.setNow },
							'Now'
						)
					)
				),
				_react2.default.createElement('input', {
					name: this.getInputName(this.props.paths.tzOffset),
					type: 'hidden',
					value: this.state.tzOffsetValue
				})
			);
		} else {
			input = _react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true },
				this.format(this.props.value, this.props.formatString)
			);
		}
		return _react2.default.createElement(
			_elemental.FormField,
			{ label: this.props.label, className: 'field-type-datetime', htmlFor: this.getInputName(this.props.path) },
			input,
			this.renderNote()
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":90,"../Field":99,"moment":undefined,"react":undefined}],110:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateFilter');

},{"../date/DateFilter":107}],111:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailColumn = _react2.default.createClass({
	displayName: 'EmailColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ to: 'mailto:' + value, padded: true, exterior: true, field: this.props.col.type },
			value
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = EmailColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],112:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	TODO:
	- gravatar
	- validate email address
 */

module.exports = _Field2.default.create({
	displayName: 'EmailField',
	propTypes: {
		path: _react.PropTypes.string.isRequired,
		value: _react.PropTypes.string
	},
	statics: {
		type: 'Email'
	},
	renderField: function renderField() {
		return _react2.default.createElement(_elemental.FormInput, {
			name: this.getInputName(this.props.path),
			ref: 'focusTarget',
			value: this.props.value,
			onChange: this.valueChanged,
			autoComplete: 'off',
			type: 'email'
		});
	},
	renderValue: function renderValue() {
		return this.props.value ? _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true, component: 'a', href: 'mailto:' + this.props.value },
			this.props.value
		) : _react2.default.createElement(_elemental.FormInput, { noedit: true });
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],113:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":125}],114:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

var _displayName = require('display-name');

var _displayName2 = _interopRequireDefault(_displayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NameColumn = _react2.default.createClass({
	displayName: 'NameColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.first && !value.last) return '(no name)';
		return (0, _displayName2.default)(value.first, value.last);
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ to: this.props.linkTo, padded: true, interior: true, field: this.props.col.type },
				this.renderValue()
			)
		);
	}
});

module.exports = NameColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"display-name":undefined,"react":undefined}],115:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME_SHAPE = {
	first: _react.PropTypes.string,
	last: _react.PropTypes.string
};

module.exports = _Field2.default.create({
	displayName: 'NameField',
	statics: {
		type: 'Name',
		getDefaultValue: function getDefaultValue() {
			return {
				first: '',
				last: ''
			};
		}
	},
	propTypes: {
		onChange: _react.PropTypes.func.isRequired,
		path: _react.PropTypes.string.isRequired,
		paths: _react.PropTypes.shape(NAME_SHAPE).isRequired,
		value: _react.PropTypes.shape(NAME_SHAPE).isRequired
	},

	valueChanged: function valueChanged(which, event) {
		var _props = this.props,
		    _props$value = _props.value,
		    value = _props$value === undefined ? {} : _props$value,
		    path = _props.path,
		    onChange = _props.onChange;

		onChange({
			path: path,
			value: _extends({}, value, _defineProperty({}, which, event.target.value))
		});
	},
	changeFirst: function changeFirst(event) {
		return this.valueChanged('first', event);
	},
	changeLast: function changeLast(event) {
		return this.valueChanged('last', event);
	},
	renderValue: function renderValue() {
		var inputStyle = { width: '100%' };
		var _props$value2 = this.props.value,
		    value = _props$value2 === undefined ? {} : _props$value2;


		return _react2.default.createElement(
			_elemental.Grid.Row,
			{ small: 'one-half', gutter: 10 },
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true, style: inputStyle },
					value.first
				)
			),
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true, style: inputStyle },
					value.last
				)
			)
		);
	},
	renderField: function renderField() {
		var _props2 = this.props,
		    _props2$value = _props2.value,
		    value = _props2$value === undefined ? {} : _props2$value,
		    paths = _props2.paths,
		    autoFocus = _props2.autoFocus;

		return _react2.default.createElement(
			_elemental.Grid.Row,
			{ small: 'one-half', gutter: 10 },
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoFocus: autoFocus,
					autoComplete: 'off',
					name: this.getInputName(paths.first),
					onChange: this.changeFirst,
					placeholder: 'First name',
					value: value.first
				})
			),
			_react2.default.createElement(
				_elemental.Grid.Col,
				null,
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(paths.last),
					onChange: this.changeLast,
					placeholder: 'Last name',
					value: value.last
				})
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],116:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":125}],117:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordColumn = _react2.default.createClass({
	displayName: 'PasswordColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		return value ? '********' : '';
	},
	render: function render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ field: this.props.col.type },
				this.renderValue()
			)
		);
	}
});

module.exports = PasswordColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],118:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'PasswordField',
	statics: {
		type: 'Password'
	},

	getInitialState: function getInitialState() {
		return {
			passwordIsSet: this.props.value ? true : false,
			showChangeUI: this.props.mode === 'create' ? true : false,
			password: '',
			confirm: ''
		};
	},
	valueChanged: function valueChanged(which, event) {
		var newState = {};
		newState[which] = event.target.value;
		this.setState(newState);
	},
	showChangeUI: function showChangeUI() {
		var _this = this;

		this.setState({
			showChangeUI: true
		}, function () {
			return _this.focus();
		});
	},
	onCancel: function onCancel() {
		var _this2 = this;

		this.setState({
			showChangeUI: false
		}, function () {
			return _this2.focus();
		});
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.props.value ? 'Password Set' : ''
		);
	},
	renderField: function renderField() {
		return this.state.showChangeUI ? this.renderFields() : this.renderChangeButton();
	},
	renderFields: function renderFields() {
		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ block: true },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(this.props.path),
					onChange: this.valueChanged.bind(this, 'password'),
					placeholder: 'New password',
					ref: 'focusTarget',
					type: 'password',
					value: this.state.password
				})
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_elemental.FormInput, {
					autoComplete: 'off',
					name: this.getInputName(this.props.paths.confirm),
					onChange: this.valueChanged.bind(this, 'confirm'),
					placeholder: 'Confirm new password', value: this.state.confirm,
					type: 'password'
				})
			),
			this.state.passwordIsSet ? _react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.onCancel },
					'Cancel'
				)
			) : null
		);
	},
	renderChangeButton: function renderChangeButton() {
		var label = this.state.passwordIsSet ? 'Change Password' : 'Set Password';

		return _react2.default.createElement(
			_elemental.Button,
			{ ref: 'focusTarget', onClick: this.showChangeUI },
			label
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":99,"react":undefined}],119:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXISTS_OPTIONS = [{ label: 'Is Set', value: true }, { label: 'Is NOT Set', value: false }];

function getDefaultValue() {
	return {
		exists: true
	};
}

var PasswordFilter = _react2.default.createClass({
	displayName: 'PasswordFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			exists: _react2.default.PropTypes.oneOf(EXISTS_OPTIONS.map(function (i) {
				return i.value;
			}))
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	toggleExists: function toggleExists(value) {
		this.props.onChange({ exists: value });
	},
	render: function render() {
		var filter = this.props.filter;


		return _react2.default.createElement(_elemental.SegmentedControl, {
			equalWidthSegments: true,
			onChange: this.toggleExists,
			options: EXISTS_OPTIONS,
			value: filter.exists
		});
	}
});

module.exports = PasswordFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined}],120:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moreIndicatorStyle = {
	color: '#bbb',
	fontSize: '.8rem',
	fontWeight: 500,
	marginLeft: 8
};

var RelationshipColumn = _react2.default.createClass({
	displayName: 'RelationshipColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderMany: function renderMany(value) {
		if (!value || !value.length) return;
		var refList = this.props.col.field.refList;
		var items = [];
		for (var i = 0; i < 3; i++) {
			if (!value[i]) break;
			if (i) {
				items.push(_react2.default.createElement(
					'span',
					{ key: 'comma' + i },
					', '
				));
			}
			items.push(_react2.default.createElement(
				_ItemsTableValue2.default,
				{ interior: true, truncate: false, key: 'anchor' + i, to: Keystone.adminPath + '/' + refList.path + '/' + value[i].id },
				value[i].name
			));
		}
		if (value.length > 3) {
			items.push(_react2.default.createElement(
				'span',
				{ key: 'more', style: moreIndicatorStyle },
				'[...',
				value.length - 3,
				' more]'
			));
		}
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			items
		);
	},
	renderValue: function renderValue(value) {
		if (!value) return;
		var refList = this.props.col.field.refList;
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ to: Keystone.adminPath + '/' + refList.path + '/' + value.id, padded: true, interior: true, field: this.props.col.type },
			value.name
		);
	},
	render: function render() {
		var value = this.props.data.fields[this.props.col.path];
		var many = this.props.col.field.many;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			many ? this.renderMany(value) : this.renderValue(value)
		);
	}
});

module.exports = RelationshipColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],121:[function(require,module,exports){
'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _lists = require('../../../admin/client/utils/lists');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _elemental = require('../../../admin/client/App/elemental');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compareValues(current, next) {
	var currentLength = current ? current.length : 0;
	var nextLength = next ? next.length : 0;
	if (currentLength !== nextLength) return false;
	for (var i = 0; i < currentLength; i++) {
		if (current[i] !== next[i]) return false;
	}
	return true;
}

module.exports = _Field2.default.create({

	displayName: 'RelationshipField',
	statics: {
		type: 'Relationship'
	},

	getInitialState: function getInitialState() {
		return {
			value: null,
			createIsOpen: false
		};
	},
	componentDidMount: function componentDidMount() {
		this._itemsCache = {};
		this.loadValue(this.props.value);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var _this = this;

		if (nextProps.value === this.props.value || nextProps.many && compareValues(this.props.value, nextProps.value)) {
			if (this.props.filters) {
				for (var key in this.props.filters) {
					if (this.props.filters.hasOwnProperty(key)) {
						if (this.props.values[key] !== nextProps.values[key]) {
							this.setState({
								createIsOpen: true
							}, function () {
								setTimeout(function () {
									_this.setState({ createIsOpen: false, value: null });
								}, 10);
							});

							return;
						}
					}
				}
			}
			return;
		}
		this.loadValue(nextProps.value);
	},
	shouldCollapse: function shouldCollapse() {
		if (this.props.many) {
			// many:true relationships have an Array for a value
			return this.props.collapse && !this.props.value.length;
		}
		return this.props.collapse && !this.props.value;
	},
	buildFilters: function buildFilters() {
		var _this2 = this;

		var filters = {};

		_lodash2.default.forEach(this.props.filters, function (value, key) {
			if (typeof value === 'string' && value[0] === ':') {
				var fieldName = value.slice(1);

				var val = _this2.props.values[fieldName];
				if (val) {
					filters[key] = val;
					return;
				}

				// check if filtering by id and item was already saved
				if (fieldName === ':_id' && Keystone.item) {
					filters[key] = Keystone.item.id;
					return;
				}
			} else {
				filters[key] = value;
			}
		}, this);

		var parts = [];

		_lodash2.default.forEach(filters, function (val, key) {
			parts.push('filters[' + key + '][value]=' + encodeURIComponent(val));
		});

		return parts.join('&');
	},
	cacheItem: function cacheItem(item) {
		item.href = Keystone.adminPath + '/' + this.props.refList.path + '/' + item.id;
		this._itemsCache[item.id] = item;
	},
	loadValue: function loadValue(values) {
		var _this3 = this;

		if (!values) {
			return this.setState({
				loading: false,
				value: null
			});
		};
		values = Array.isArray(values) ? values : values.split(',');
		var cachedValues = values.map(function (i) {
			return _this3._itemsCache[i];
		}).filter(function (i) {
			return i;
		});
		if (cachedValues.length === values.length) {
			this.setState({
				loading: false,
				value: this.props.many ? cachedValues : cachedValues[0]
			});
			return;
		}
		this.setState({
			loading: true,
			value: null
		});
		_async2.default.map(values, function (value, done) {
			(0, _xhr2.default)({
				url: Keystone.adminPath + '/api/' + _this3.props.refList.path + '/' + value + '?basic',
				responseType: 'json'
			}, function (err, resp, data) {
				if (err || !data) return done(err);
				_this3.cacheItem(data);
				done(err, data);
			});
		}, function (err, expanded) {
			if (!_this3.isMounted()) return;
			_this3.setState({
				loading: false,
				value: _this3.props.many ? expanded : expanded[0]
			});
		});
	},


	// NOTE: this seems like the wrong way to add options to the Select
	loadOptionsCallback: {},
	loadOptions: function loadOptions(input, callback) {
		var _this4 = this;

		// NOTE: this seems like the wrong way to add options to the Select
		this.loadOptionsCallback = callback;
		var filters = this.buildFilters();
		(0, _xhr2.default)({
			url: Keystone.adminPath + '/api/' + this.props.refList.path + '?basic&search=' + input + '&' + filters,
			responseType: 'json'
		}, function (err, resp, data) {
			if (err) {
				console.error('Error loading items:', err);
				return callback(null, []);
			}
			data.results.forEach(_this4.cacheItem);
			callback(null, {
				options: data.results,
				complete: data.results.length === data.count
			});
		});
	},
	valueChanged: function valueChanged(value) {
		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	openCreate: function openCreate() {
		this.setState({
			createIsOpen: true
		});
	},
	closeCreate: function closeCreate() {
		this.setState({
			createIsOpen: false
		});
	},
	onCreate: function onCreate(item) {
		var _this5 = this;

		this.cacheItem(item);
		if (Array.isArray(this.state.value)) {
			// For many relationships, append the new item to the end
			var values = this.state.value.map(function (item) {
				return item.id;
			});
			values.push(item.id);
			this.valueChanged(values.join(','));
		} else {
			this.valueChanged(item.id);
		}

		// NOTE: this seems like the wrong way to add options to the Select
		this.loadOptionsCallback(null, {
			complete: true,
			options: Object.keys(this._itemsCache).map(function (k) {
				return _this5._itemsCache[k];
			})
		});
		this.closeCreate();
	},
	renderSelect: function renderSelect(noedit) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('input', { type: 'text', style: { position: 'absolute', width: 1, height: 1, zIndex: -1, opacity: 0 }, tabIndex: '-1' }),
			!this.state.createIsOpen && _react2.default.createElement(_reactSelect2.default.Async, {
				multi: this.props.many,
				disabled: noedit,
				loadOptions: this.loadOptions,
				labelKey: 'name',
				name: this.getInputName(this.props.path),
				onChange: this.valueChanged,
				cache: false,
				simpleValue: true,
				value: this.state.value,
				valueKey: 'id'
			})
		);
	},
	renderInputGroup: function renderInputGroup() {
		// TODO: find better solution
		//   when importing the CreateForm using: import CreateForm from '../../../admin/client/App/shared/CreateForm';
		//   CreateForm was imported as a blank object. This stack overflow post suggested lazilly requiring it:
		// http://stackoverflow.com/questions/29807664/cyclic-dependency-returns-empty-object-in-react-native
		// TODO: Implement this somewhere higher in the app, it breaks the encapsulation of the RelationshipField component
		var CreateForm = require('../../../admin/client/App/shared/CreateForm');
		return _react2.default.createElement(
			_elemental.InlineGroup,
			{ block: true },
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				this.renderSelect()
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.openCreate },
					'+'
				)
			),
			_react2.default.createElement(CreateForm, {
				list: _lists.listsByKey[this.props.refList.key],
				isOpen: this.state.createIsOpen,
				onCreate: this.onCreate,
				onCancel: this.closeCreate })
		);
	},
	renderValue: function renderValue() {
		var many = this.props.many;
		var value = this.state.value;

		var props = {
			children: value ? value.name : null,
			component: value ? 'a' : 'span',
			href: value ? value.href : null,
			noedit: true
		};

		return many ? this.renderSelect(true) : _react2.default.createElement(_elemental.FormInput, props);
	},
	renderField: function renderField() {
		if (this.props.createInline) {
			return this.renderInputGroup();
		} else {
			return this.renderSelect();
		}
	}
});

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/CreateForm":67,"../../../admin/client/utils/lists":86,"../Field":99,"async":undefined,"lodash":undefined,"react":undefined,"react-select":undefined,"xhr":undefined}],122:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _elemental = require('../../../admin/client/App/elemental');

var _PopoutList = require('../../../admin/client/App/shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Linked To', value: false }, { label: 'NOT Linked To', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		value: []
	};
}

var RelationshipFilter = _react2.default.createClass({
	displayName: 'RelationshipFilter',

	propTypes: {
		field: _react2.default.PropTypes.object,
		filter: _react2.default.PropTypes.shape({
			inverted: _react2.default.PropTypes.bool,
			value: _react2.default.PropTypes.array
		}),
		onHeightChange: _react2.default.PropTypes.func
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	getInitialState: function getInitialState() {
		return {
			searchIsLoading: false,
			searchResults: [],
			searchString: '',
			selectedItems: [],
			valueIsLoading: true
		};
	},
	componentDidMount: function componentDidMount() {
		this._itemsCache = {};
		this.loadSearchResults(true);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.filter.value !== this.props.filter.value) {
			this.populateValue(nextProps.filter.value);
		}
	},
	isLoading: function isLoading() {
		return this.state.searchIsLoading || this.state.valueIsLoading;
	},
	populateValue: function populateValue(value) {
		var _this = this;

		_async2.default.map(value, function (id, next) {
			if (_this._itemsCache[id]) return next(null, _this._itemsCache[id]);
			(0, _xhr2.default)({
				url: Keystone.adminPath + '/api/' + _this.props.field.refList.path + '/' + id + '?basic',
				responseType: 'json'
			}, function (err, resp, data) {
				if (err || !data) return next(err);
				_this.cacheItem(data);
				next(err, data);
			});
		}, function (err, items) {
			if (err) {
				// TODO: Handle errors better
				console.error('Error loading items:', err);
			}
			_this.setState({
				valueIsLoading: false,
				selectedItems: items || []
			}, function () {
				(0, _reactDom.findDOMNode)(_this.refs.focusTarget).focus();
			});
		});
	},
	cacheItem: function cacheItem(item) {
		this._itemsCache[item.id] = item;
	},
	buildFilters: function buildFilters() {
		var filters = {};
		_lodash2.default.forEach(this.props.field.filters, function (value, key) {
			if (value[0] === ':') return;
			filters[key] = value;
		}, this);

		var parts = [];
		_lodash2.default.forEach(filters, function (val, key) {
			parts.push('filters[' + key + '][value]=' + encodeURIComponent(val));
		});

		return parts.join('&');
	},
	loadSearchResults: function loadSearchResults(thenPopulateValue) {
		var _this2 = this;

		var searchString = this.state.searchString;
		var filters = this.buildFilters();
		(0, _xhr2.default)({
			url: Keystone.adminPath + '/api/' + this.props.field.refList.path + '?basic&search=' + searchString + '&' + filters,
			responseType: 'json'
		}, function (err, resp, data) {
			if (err) {
				// TODO: Handle errors better
				console.error('Error loading items:', err);
				_this2.setState({
					searchIsLoading: false
				});
				return;
			}
			data.results.forEach(_this2.cacheItem);
			if (thenPopulateValue) {
				_this2.populateValue(_this2.props.filter.value);
			}
			if (searchString !== _this2.state.searchString) return;
			_this2.setState({
				searchIsLoading: false,
				searchResults: data.results
			}, _this2.updateHeight);
		});
	},
	updateHeight: function updateHeight() {
		if (this.props.onHeightChange) {
			this.props.onHeightChange(this.refs.container.offsetHeight);
		}
	},
	toggleInverted: function toggleInverted(inverted) {
		this.updateFilter({ inverted: inverted });
	},
	updateSearch: function updateSearch(e) {
		this.setState({ searchString: e.target.value }, this.loadSearchResults);
	},
	selectItem: function selectItem(item) {
		var value = this.props.filter.value.concat(item.id);
		this.updateFilter({ value: value });
	},
	removeItem: function removeItem(item) {
		var value = this.props.filter.value.filter(function (i) {
			return i !== item.id;
		});
		this.updateFilter({ value: value });
	},
	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	renderItems: function renderItems(items, selected) {
		var _this3 = this;

		var itemIconHover = selected ? 'x' : 'check';

		return items.map(function (item, i) {
			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'item-' + i + '-' + item.id,
				icon: 'dash',
				iconHover: itemIconHover,
				label: item.name,
				onClick: function onClick() {
					if (selected) _this3.removeItem(item);else _this3.selectItem(item);
				}
			});
		});
	},
	render: function render() {
		var _this4 = this;

		var selectedItems = this.state.selectedItems;
		var searchResults = this.state.searchResults.filter(function (i) {
			return _this4.props.filter.value.indexOf(i.id) === -1;
		});
		var placeholder = this.isLoading() ? 'Loading...' : 'Find a ' + this.props.field.label + '...';
		return _react2.default.createElement(
			'div',
			{ ref: 'container' },
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, { equalWidthSegments: true, options: INVERTED_OPTIONS, value: this.props.filter.inverted, onChange: this.toggleInverted })
			),
			_react2.default.createElement(
				_elemental.FormField,
				{ style: { borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '1em' } },
				_react2.default.createElement(_elemental.FormInput, { autoFocus: true, ref: 'focusTarget', value: this.state.searchString, onChange: this.updateSearch, placeholder: placeholder })
			),
			selectedItems.length ? _react2.default.createElement(
				_PopoutList2.default,
				null,
				_react2.default.createElement(
					_PopoutList2.default.Heading,
					null,
					'Selected'
				),
				this.renderItems(selectedItems, true)
			) : null,
			searchResults.length ? _react2.default.createElement(
				_PopoutList2.default,
				null,
				_react2.default.createElement(
					_PopoutList2.default.Heading,
					{ style: selectedItems.length ? { marginTop: '2em' } : null },
					'Items'
				),
				this.renderItems(searchResults)
			) : null
		);
	}
});

module.exports = RelationshipFilter;

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Popout/PopoutList":73,"async":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined,"xhr":undefined}],123:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextColumn = _react2.default.createClass({
	displayName: 'TextColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		// cropping text is important for textarea, which uses this column
		var value = this.props.data.fields[this.props.col.path];
		return value ? value.substr(0, 100) : null;
	},
	render: function render() {
		var value = this.getValue();
		var empty = !value && this.props.linkTo ? true : false;
		var className = this.props.col.field.monospace ? 'ItemList__value--monospace' : undefined;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			_react2.default.createElement(
				_ItemsTableValue2.default,
				{ className: className, to: this.props.linkTo, empty: empty, padded: true, interior: true, field: this.props.col.type },
				value
			)
		);
	}
});

module.exports = TextColumn;

},{"../../components/ItemsTableCell":94,"../../components/ItemsTableValue":95,"react":undefined}],124:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'TextField',
	statics: {
		type: 'Text'
	}
});

},{"../Field":99}],125:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

var MODE_OPTIONS = [{ label: 'Contains', value: 'contains' }, { label: 'Exactly', value: 'exactly' }, { label: 'Begins with', value: 'beginsWith' }, { label: 'Ends with', value: 'endsWith' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		inverted: INVERTED_OPTIONS[0].value,
		value: ''
	};
}

var TextFilter = _react2.default.createClass({
	displayName: 'TextFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(function (i) {
				return i.value;
			})),
			inverted: _react2.default.PropTypes.boolean,
			value: _react2.default.PropTypes.string
		})
	},
	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	updateFilter: function updateFilter(value) {
		this.props.onChange(_extends({}, this.props.filter, value));
	},
	selectMode: function selectMode(e) {
		var mode = e.target.value;
		this.updateFilter({ mode: mode });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	toggleInverted: function toggleInverted(inverted) {
		this.updateFilter({ inverted: inverted });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	updateValue: function updateValue(e) {
		this.updateFilter({ value: e.target.value });
	},
	render: function render() {
		var _props = this.props,
		    field = _props.field,
		    filter = _props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		var placeholder = field.label + ' ' + mode.label.toLowerCase() + '...';

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.SegmentedControl, {
					equalWidthSegments: true,
					onChange: this.toggleInverted,
					options: INVERTED_OPTIONS,
					value: filter.inverted
				})
			),
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectMode,
					options: MODE_OPTIONS,
					value: mode.value
				})
			),
			_react2.default.createElement(_elemental.FormInput, {
				autoFocus: true,
				onChange: this.updateValue,
				placeholder: placeholder,
				ref: 'focusTarget',
				value: this.props.filter.value
			})
		);
	}
});

module.exports = TextFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],126:[function(require,module,exports){
'use strict';

var ExMatch = require('expression-match'); // Matches objects with expressions

/**
 * Checks if something is an object
 *
 * @param  {Any} arg   The something we want to check the type of
 * @return {Boolean} If arg is an object or not
 */
function isObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Object]';
};

/**
 * Evaluates the visibility of a field based on its dependencies and their values
 *
 * @param  {Object|Any} dependsOn The dependsOn variable we get from the field
 * @param  {Object}		values    The values currently in the fields
 * @return {Boolean}			  If the current field should be displayed based
 *                          	  on it's dependencies and their values
 */
module.exports = function evalDependsOn(dependsOn, values) {
  if (!isObject(dependsOn) || !Object.keys(dependsOn).length) {
    return true;
  }

  // Checks if the current field should be displayed, based on the values of
  // other fields and the dependsOn configuration of this field
  var Match = new ExMatch(dependsOn, values, false);
  return Match.match();
};

},{"expression-match":undefined}],127:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],"FieldTypes":[function(require,module,exports){
"use strict";

exports.Columns = {
  text: require("../../fields/types/text/TextColumn"),
  datetime: require("../../fields/types/datetime/DatetimeColumn"),
  relationship: require("../../fields/types/relationship/RelationshipColumn"),
  name: require("../../fields/types/name/NameColumn"),
  email: require("../../fields/types/email/EmailColumn"),
  password: require("../../fields/types/password/PasswordColumn"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageColumn"),
  boolean: require("../../fields/types/boolean/BooleanColumn"),
  id: require("../../fields/components/columns/IdColumn"),
  __unrecognised__: require("../../fields/components/columns/InvalidColumn")
};
exports.Fields = {
  text: require("../../fields/types/text/TextField"),
  datetime: require("../../fields/types/datetime/DatetimeField"),
  relationship: require("../../fields/types/relationship/RelationshipField"),
  name: require("../../fields/types/name/NameField"),
  email: require("../../fields/types/email/EmailField"),
  password: require("../../fields/types/password/PasswordField"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageField"),
  boolean: require("../../fields/types/boolean/BooleanField")
};
exports.Filters = {
  text: require("../../fields/types/text/TextFilter"),
  datetime: require("../../fields/types/datetime/DatetimeFilter"),
  relationship: require("../../fields/types/relationship/RelationshipFilter"),
  name: require("../../fields/types/name/NameFilter"),
  email: require("../../fields/types/email/EmailFilter"),
  password: require("../../fields/types/password/PasswordFilter"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageFilter"),
  boolean: require("../../fields/types/boolean/BooleanFilter")
};

},{"../../fields/components/columns/IdColumn":97,"../../fields/components/columns/InvalidColumn":98,"../../fields/types/boolean/BooleanColumn":100,"../../fields/types/boolean/BooleanField":101,"../../fields/types/boolean/BooleanFilter":102,"../../fields/types/cloudinaryimage/CloudinaryImageColumn":103,"../../fields/types/cloudinaryimage/CloudinaryImageField":104,"../../fields/types/cloudinaryimage/CloudinaryImageFilter":105,"../../fields/types/datetime/DatetimeColumn":108,"../../fields/types/datetime/DatetimeField":109,"../../fields/types/datetime/DatetimeFilter":110,"../../fields/types/email/EmailColumn":111,"../../fields/types/email/EmailField":112,"../../fields/types/email/EmailFilter":113,"../../fields/types/name/NameColumn":114,"../../fields/types/name/NameField":115,"../../fields/types/name/NameFilter":116,"../../fields/types/password/PasswordColumn":117,"../../fields/types/password/PasswordField":118,"../../fields/types/password/PasswordFilter":119,"../../fields/types/relationship/RelationshipColumn":120,"../../fields/types/relationship/RelationshipField":121,"../../fields/types/relationship/RelationshipFilter":122,"../../fields/types/text/TextColumn":123,"../../fields/types/text/TextField":124,"../../fields/types/text/TextFilter":125}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL2Nsb3VkaW5hcnktbWljcm91cmwvdXJsLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0FsZXJ0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0JsYW5rU3RhdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQnV0dG9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9DZW50ZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9DaGlwL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Ecm9wZG93bkJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtRmllbGQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9ub2VkaXQuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUxhYmVsL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybU5vdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaEJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhGaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvb2N0aWNvbnMuanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0dyaWRDb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWRSb3cvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXBTZWN0aW9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTGFiZWxsZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvTG9hZGluZ0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvYm9keS5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZGlhbG9nLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9mb290ZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2hlYWRlci5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vcGFnZS5qcyIsIkFwcC9lbGVtZW50YWwvUGFzc0NvbnRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BvcnRhbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvUmVzcG9uc2l2ZVRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NjcmVlblJlYWRlck9ubHkvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Njcm9sbExvY2svaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NlZ21lbnRlZENvbnRyb2wvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvU3Bpbm5lci9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc2l6ZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvQWxlcnRNZXNzYWdlcy5qcyIsIkFwcC9zaGFyZWQvQ3JlYXRlRm9ybS5qcyIsIkFwcC9zaGFyZWQvSWZyYW1lQ29udGVudC5qcyIsIkFwcC9zaGFyZWQvSW52YWxpZEZpZWxkVHlwZS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEJvZHkuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRGb290ZXIuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRIZWFkZXIuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0LmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0TGlzdEhlYWRpbmcuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0SXRlbS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dFBhbmUuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvUG9ydGFsLmpzIiwiY29uc3RhbnRzLmpzIiwidGhlbWUuanMiLCJ1dGlscy9MaXN0LmpzIiwidXRpbHMvY2xvdWRpbmFyeVJlc2l6ZS5qcyIsInV0aWxzL2NvbG9yLmpzIiwidXRpbHMvY29uY2F0Q2xhc3NuYW1lcy5qcyIsInV0aWxzL2Nzcy5qcyIsInV0aWxzL2xpc3RzLmpzIiwidXRpbHMvc3RyaW5nLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvQ2hlY2tib3guanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9Db2xsYXBzZWRGaWVsZExhYmVsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvRGF0ZUlucHV0LmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvRmlsZUNoYW5nZU1lc3NhZ2UuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9IaWRkZW5GaWxlSW5wdXQuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9JbWFnZVRodW1ibmFpbC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9DbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5LmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL2NvbHVtbnMvSW52YWxpZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9GaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5Db2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvbmFtZS9OYW1lQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0Q29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy91dGlscy9ldmFsRGVwZW5kc09uLmpzIiwiLi4vLi4vLi4vb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIl9zdHJlYW1fMC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLFFBQVEsQ0FDVixFQUFDLE1BQU0sTUFBUCxFQUFlLFFBQU8sR0FBdEIsRUFEVSxFQUVWLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFGVSxFQUdWLEVBQUMsTUFBTSxjQUFQLEVBQXVCLFFBQU8sR0FBOUIsRUFIVSxFQUlWLEVBQUMsTUFBTSxPQUFQLEVBQWdCLFFBQU8sSUFBdkIsRUFKVSxFQUtWLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sR0FBekIsRUFMVSxFQU1WLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFOVSxFQU9WLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFQVSxFQVFWLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sR0FBekIsRUFSVSxFQVNWLEVBQUMsTUFBTSxPQUFQLEVBQWdCLFFBQU8sR0FBdkIsRUFUVSxDQUFaOztBQVlBLE9BQU8sT0FBUCxHQUFpQixVQUFTLEVBQVQsRUFBYSxPQUFiLEVBQXNCO0FBQ3JDLE1BQUksQ0FBQyxPQUFMLEVBQWMsVUFBVSxFQUFWOztBQUVkLE1BQUksU0FBUyxRQUFRLE1BQVIsR0FBaUIsT0FBakIsR0FBMkIsTUFBeEM7QUFDQSxNQUFJLGFBQWEsUUFBUSxVQUF6QjtB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Z0JBQWMsUUFBUSxtREFBUixDQUhHO0FBSWpCLFFBQU0sUUFBUSxtQ0FBUixDQUpXO0FBS2pCLFNBQU8sUUFBUSxxQ0FBUixDQUxVO0FBTWpCLFlBQVUsUUFBUSwyQ0FBUixDQU5PO0FBT2pCLG1CQUFpQixRQUFRLHlEQUFSLENBUEE7QUFRakIsV0FBUyxRQUFRLHlDQUFSO0FBUlEsQ0FBakI7QUFVQSxRQUFRLE9BQVIsR0FBa0I7QUFDbEIsUUFBTSxRQUFRLG9DQUFSLENBRFk7QUFFbEIsWUFBVSxRQUFRLDRDQUFSLENBRlE7QUFHbEIsZ0JBQWMsUUFBUSxvREFBUixDQUhJO0FBSWxCLFFBQU0sUUFBUSxvQ0FBUixDQUpZO0FBS2xCLFNBQU8sUUFBUSxzQ0FBUixDQUxXO0FBTWxCLFlBQVUsUUFBUSw0Q0FBUixDQU5RO0FBT2xCLG1CQUFpQixRQUFRLDBEQUFSLENBUEM7QUFRbEIsV0FBUyxRQUFRLDBDQUFSO0FBUlMsQ0FBbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBFeGFtcGxlIG9wdGlvbnM6XG5cbi8vIGZsYWdzOiAncHJvZ3Jlc3NpdmUnXG4vLyBmbGFnczogWydwcm9ncmVzc2l2ZSddXG4vLyBxdWFsaXR5OiA4MFxuLy8gY3JvcDogJ2ZpdCcsICdmaWxsJ1xuLy8gZ3Jhdml0eTogJ2ZhY2UnXG4vLyBmZXRjaF9mb3JtYXQ6ICdhdXRvJ1xuLy8gd2lkdGg6IDMwMFxuLy8gaGVpZ2h0OiAzMDBcbi8vIGVmZmVjdDogYmx1cjoyMDBcblxudmFyIFRZUEVTID0gW1xuICB7bmFtZTogJ2Nyb3AnLCBwcmVmaXg6J2MnfSxcbiAge25hbWU6ICdlZmZlY3QnLCBwcmVmaXg6J2UnfSxcbiAge25hbWU6ICdmZXRjaF9mb3JtYXQnLCBwcmVmaXg6J2YnfSxcbiAge25hbWU6ICdmbGFncycsIHByZWZpeDonZmwnfSxcbiAge25hbWU6ICdncmF2aXR5JywgcHJlZml4OidnJ30sXG4gIHtuYW1lOiAnaGVpZ2h0JywgcHJlZml4OidoJ30sXG4gIHtuYW1lOiAncmFkaXVzJywgcHJlZml4OidyJ30sXG4gIHtuYW1lOiAncXVhbGl0eScsIHByZWZpeDoncSd9LFxuICB7bmFtZTogJ3dpZHRoJywgcHJlZml4Oid3J30sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gIHZhciBzY2hlbWUgPSBvcHRpb25zLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIHZhciBjbG91ZF9uYW1lID0gb3B0aW9ucy5jbG91ZF9uYW1lO1xuICBpZiAoIWNsb3VkX25hbWUpIHRocm93IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIG9wdGlvbnMuY2xvdWRfbmFtZScpO1xuICBcbiAgdmFyIHBhcmFtcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgVFlQRVMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmFtZSA9IFRZUEVTW2ldLm5hbWU7XG4gICAgdmFyIHByZWZpeCA9IFRZUEVTW2ldLnByZWZpeDtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnNbbmFtZV0pKSB7XG4gICAgICBvcHRpb25zW25hbWVdLmZvckVhY2goZnVuY3Rpb24ob3B0KSB7cGFyYW1zLnB1c2gocHJlZml4ICsgJ18nICsgb3B0KX0pO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMucHVzaChwcmVmaXggKyAnXycgKyBvcHRpb25zW25hbWVdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdXJsUGFyYW1zID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtcy5qb2luKCcsJykgKyAnLycgOiAnJztcbiAgcmV0dXJuIHNjaGVtZSArICc6Ly9yZXMuY2xvdWRpbmFyeS5jb20vJ1xuICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuY2xvdWRfbmFtZSlcbiAgICArICcvaW1hZ2UvdXBsb2FkLycgKyB1cmxQYXJhbXNcbiAgICArIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG59O1xuXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5hbGVydC5jb2xvci5kYW5nZXIsXHJcblx0ZXJyb3I6IHRoZW1lLmFsZXJ0LmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5hbGVydC5jb2xvci5pbmZvLFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmFsZXJ0LmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuYWxlcnQuY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4sIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbi8vIGNsb25lIGNoaWxkcmVuIGlmIGEgY2xhc3MgZXhpc3RzIGZvciB0aGUgdGFnbmFtZVxyXG5jb25zdCBjbG9uZVdpdGhDbGFzc25hbWVzID0gKGMpID0+IHtcclxuXHRjb25zdCB0eXBlID0gYy50eXBlICYmIGMudHlwZS5kaXNwbGF5TmFtZVxyXG5cdFx0PyBjLnR5cGUuZGlzcGxheU5hbWVcclxuXHRcdDogYy50eXBlIHx8IG51bGw7XHJcblxyXG5cdGlmICghdHlwZSB8fCAhY2xhc3Nlc1t0eXBlXSkgcmV0dXJuIGM7XHJcblxyXG5cdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0Y2xhc3NOYW1lOiBjc3MoY2xhc3Nlc1t0eXBlXSksXHJcblx0fSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBBbGVydCAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5hbGVydCxcclxuXHRcdGNsYXNzZXNbY29sb3JdLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHRwcm9wcy5jaGlsZHJlbiA9IENoaWxkcmVuLm1hcChjaGlsZHJlbiwgY2xvbmVXaXRoQ2xhc3NuYW1lcyk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gZGF0YS1hbGVydC10eXBlPXtjb2xvcn0gLz47XHJcbn07XHJcblxyXG5BbGVydC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKS5pc1JlcXVpcmVkLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkFsZXJ0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbGVydDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGNvbG9yc1tjb2xvcl0uYm9yZGVyLFxyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0udGV4dCxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgaGVhZGluZ3NcclxuY29uc3QgaGVhZGluZ1RhZ25hbWVzID0ge307XHJcblsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXS5mb3JFYWNoKHRhZyA9PiB7XHJcblx0aGVhZGluZ1RhZ25hbWVzW3RhZ10gPSB7IGNvbG9yOiAnaW5oZXJpdCcgfTtcclxufSk7XHJcblxyXG5jb25zdCBsaW5rU3R5bGVzID0ge1xyXG5cdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG5cclxuXHQnOmhvdmVyJzogeyBjb2xvcjogJ2luaGVyaXQnIH0sXHJcblx0Jzpmb2N1cyc6IHsgY29sb3I6ICdpbmhlcml0JyB9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWxlcnQ6IHtcclxuXHRcdGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5hbGVydC5ib3JkZXJSYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5hbGVydC5ib3JkZXJXaWR0aCxcclxuXHRcdG1hcmdpbjogdGhlbWUuYWxlcnQubWFyZ2luLFxyXG5cdFx0cGFkZGluZzogdGhlbWUuYWxlcnQucGFkZGluZyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGE6IGxpbmtTdHlsZXMsXHJcblx0TGluazogbGlua1N0eWxlcyxcclxuXHRzdHJvbmc6IHtcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHR9LFxyXG5cclxuXHQvLyBoZWFkaW5nc1xyXG5cdC4uLmhlYWRpbmdUYWduYW1lcyxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIEJsYW5rU3RhdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0aGVhZGluZyxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7ISFoZWFkaW5nICYmIDxoMiBkYXRhLWUyZS1ibGFuay1zdGF0ZS1oZWFkaW5nIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuaGVhZGluZyl9PntoZWFkaW5nfTwvaDI+fVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5cclxuQmxhbmtTdGF0ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKS5pc1JlcXVpcmVkLFxyXG5cdGhlYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkJsYW5rU3RhdGUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5ibGFua3N0YXRlLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJsYW5rc3RhdGUuYm9yZGVyUmFkaXVzLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmJsYW5rc3RhdGUuY29sb3IsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdWZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nVmVydGljYWwsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdH0sXHJcblxyXG5cdGhlYWRpbmc6IHtcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsXHJcblxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5Cb3R0b206IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJsYW5rU3RhdGU7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jb25zdCBjb21tb25DbGFzc2VzID0gc3R5bGVzLmNvbW1vbjtcclxuY29uc3Qgc3R5bGVzaGVldENhY2hlID0ge307XHJcbmZ1bmN0aW9uIGdldFN0eWxlU2hlZXQgKHZhcmlhbnQsIGNvbG9yKSB7XHJcblx0Y29uc3QgY2FjaGVLZXkgPSBgJHt2YXJpYW50fS0ke2NvbG9yfWA7XHJcblx0aWYgKCFzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldKSB7XHJcblx0XHRjb25zdCB2YXJpYW50U3R5bGVzID0gc3R5bGVzW3ZhcmlhbnRdKGNvbG9yKTtcclxuXHRcdHN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV0gPSB2YXJpYW50U3R5bGVzO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XTtcclxufVxyXG5cclxuY29uc3QgQlVUVE9OX1NJWkVTID0gWydsYXJnZScsICdtZWRpdW0nLCAnc21hbGwnLCAneHNtYWxsJ107XHJcbmNvbnN0IEJVVFRPTl9WQVJJQU5UUyA9IFsnZmlsbCcsICdob2xsb3cnLCAnbGluayddO1xyXG5jb25zdCBCVVRUT05fQ09MT1JTID0gWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlcicsICdjYW5jZWwnLCAnZGVsZXRlJ107XHJcblxyXG4vLyBOT1RFIG11c3QgTk9UIGJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRvIGFsbG93IGByZWZzYFxyXG5cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0dmFyIHtcclxuXHRcdFx0YWN0aXZlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGJsb2NrLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbG9yLFxyXG5cdFx0XHRjb21wb25lbnQ6IFRhZyxcclxuXHRcdFx0ZGlzYWJsZWQsXHJcblx0XHRcdHNpemUsXHJcblx0XHRcdHZhcmlhbnQsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBnZXQgdGhlIHN0eWxlc1xyXG5cdFx0Y29uc3QgdmFyaWFudENsYXNzZXMgPSBnZXRTdHlsZVNoZWV0KHZhcmlhbnQsIGNvbG9yKTtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y29tbW9uQ2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRjb21tb25DbGFzc2VzW3NpemVdLFxyXG5cdFx0XHR2YXJpYW50Q2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRibG9jayA/IGNvbW1vbkNsYXNzZXMuYmxvY2sgOiBudWxsLFxyXG5cdFx0XHRkaXNhYmxlZCA/IGNvbW1vbkNsYXNzZXMuZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRhY3RpdmUgPyB2YXJpYW50Q2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHQuLi5hcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyByZXR1cm4gYW4gYW5jaG9yIG9yIGJ1dHRvblxyXG5cdFx0aWYgKCFUYWcpIHtcclxuXHRcdFx0VGFnID0gcHJvcHMuaHJlZiA/ICdhJyA6ICdidXR0b24nO1xyXG5cdFx0fVxyXG5cdFx0Ly8gRW5zdXJlIGJ1dHRvbnMgZG9uJ3Qgc3VibWl0IGJ5IGRlZmF1bHRcclxuXHRcdGlmIChUYWcgPT09ICdidXR0b24nICYmICFwcm9wcy50eXBlKSB7XHJcblx0XHRcdHByb3BzLnR5cGUgPSAnYnV0dG9uJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPFRhZyB7Li4ucHJvcHN9IC8+O1xyXG5cdH1cclxufTtcclxuXHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pKSxcclxuXHRibG9jazogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fQ09MT1JTKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fU0laRVMpLFxyXG5cdHZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fVkFSSUFOVFMpLFxyXG59O1xyXG5CdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogW10sXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxuXHR2YXJpYW50OiAnZmlsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEJ1dHRvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGdyYWRpZW50VmVydGljYWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jc3MnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5cclxuLy8gQ29tbW9uIFN0eWxlc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5leHBvcnRzLmNvbW1vbiA9IHtcclxuXHQvLyBCYXNlIEJ1dHRvblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRiYXNlOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlcldpZHRoJzogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoLFxyXG5cdFx0J2JvcmRlclN0eWxlJzogJ3NvbGlkJyxcclxuXHRcdCdib3JkZXJDb2xvcic6ICd0cmFuc3BhcmVudCcsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuYnV0dG9uLmJvcmRlclJhZGl1cyxcclxuXHRcdCdjdXJzb3InOiAncG9pbnRlcicsXHJcblx0XHQnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0J2ZvbnRXZWlnaHQnOiB0aGVtZS5idXR0b24uZm9udC53ZWlnaHQsXHJcblx0XHQnaGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsXHJcblx0XHQnbWFyZ2luQm90dG9tJzogMCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5idXR0b24ucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdCdvdXRsaW5lJzogMCxcclxuXHRcdCd0ZXh0QWxpZ24nOiAnY2VudGVyJyxcclxuXHRcdCd0b3VjaEFjdGlvbic6ICdtYW5pcHVsYXRpb24nLFxyXG5cdFx0J3VzZXJTZWxlY3QnOiAnbm9uZScsXHJcblx0XHQndmVydGljYWxBbGlnbic6ICdtaWRkbGUnLFxyXG5cdFx0J3doaXRlU3BhY2UnOiAnbm93cmFwJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uLmRlZmF1bHQudGV4dENvbG9yLFxyXG5cdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b24uZGVmYXVsdC50ZXh0Q29sb3IsXHJcblx0XHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0Ly8gQmxvY2sgRGlzcGxheVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRibG9jazoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0fSxcclxuXHQvLyBEaXNhYmxlZFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0b3BhY2l0eTogMC40LFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblx0Ly8gU2l6ZXNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0bGFyZ2U6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmRlZmF1bHQsXHJcblx0fSxcclxuXHRzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHR9LFxyXG5cdHhzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS54c21hbGwsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS45JyxcclxuXHRcdHBhZGRpbmdMZWZ0OiAnLjY2ZW0nLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAnLjY2ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG5cclxuLy8gRmlsbCBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uRmlsbFZhcmlhbnQgKHRleHRDb2xvciwgYmdDb2xvcikge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDEwKSwgZGFya2VuKGJnQ29sb3IsIDUpKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgMTApLCBkYXJrZW4oYmdDb2xvciwgNSkpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCA1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9YCxcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUoYmdDb2xvciwgMjUpfWAsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBkYXJrZW4oYmdDb2xvciwgMTApLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDI1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9YCxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDUpLCBkYXJrZW4oYmdDb2xvciwgMTApLCBiZ0NvbG9yKSxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYCR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMjApfSAke2RhcmtlbihiZ0NvbG9yLCAyNSl9YCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHRcdFx0J2ZvbnRXZWlnaHQnOiA0MDAsXHJcblx0XHRcdCd0ZXh0U2hhZG93JzogJzAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4yNSknLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogZm9jdXNTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn1cclxuLy8gVE9ETzogVGhpcyBpcyBwcmV0dHkgaGFja3ksIG5lZWRzIHRvIGJlIGNvbnNvbGlkYXRlZCB3aXRoIHRoZSBWYXJpYW50KCkgbWV0aG9kXHJcbi8vIGFib3ZlIChuZWVkcyBtb3JlIHRoZW1lIHZhcmlhYmxlcyB0byBiZSBpbXBsZW1lbnRlZCB0aG91Z2gpXHJcbmZ1bmN0aW9uIGJ1dHRvbkZpbGxEZWZhdWx0ICgpIHtcclxuXHRjb25zdCBib3JkZXJDb2xvciA9IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0O1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZmZicsICcjZWVlJyksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJvcmRlckNvbG9yLCA1KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDUpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgMTApfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzU3R5bGVzID0ge1xyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX1gLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiAnI2U2ZTZlNicsXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxMCksXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZhZmFmYScsICcjZWFlYWVhJyksXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGAke2JvcmRlckNvbG9yfSAke2Rhcmtlbihib3JkZXJDb2xvciwgNil9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCAxMil9YCxcclxuXHRcdFx0J2NvbG9yJzogdGhlbWUuY29sb3IudGV4dCxcclxuXHRcdFx0J3RleHRTaGFkb3cnOiAnMCAxcHggMCB3aGl0ZScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBmb2N1c1N0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGdyb3NzIGhhY2tcclxuXHRcdGFjdGl2ZToge1xyXG5cdFx0XHQuLi5hY3RpdmVTdHlsZXMsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRcdC4uLmFjdGl2ZVN0eWxlcyxcclxuXHRcdFx0XHQuLi5mb2N1c1N0eWxlcyxcclxuXHRcdFx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX0sIGluc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSlgLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5leHBvcnRzLmZpbGwgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxEZWZhdWx0KCk7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxWYXJpYW50KCd3aGl0ZScsIHRoZW1lLmJ1dHRvbi5kYW5nZXIuYmdDb2xvcik7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbFZhcmlhbnQoJ3doaXRlJywgdGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gSG9sbG93IFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25Ib2xsb3dWYXJpYW50ICh0ZXh0Q29sb3IsIGJvcmRlckNvbG9yKSB7XHJcblx0Y29uc3QgZm9jdXNBbmRIb3ZlclN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3hTaGFkb3c6ICdub25lJyxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c09ubHlTdHlsZXMgPSB7XHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKGJvcmRlckNvbG9yLCAxMCl9YCxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZShib3JkZXJDb2xvciwgMzUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMjUpLFxyXG5cdFx0Ym94U2hhZG93OiAnbm9uZScsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGJvcmRlckNvbG9yLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogZm9jdXNBbmRIb3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyAnOiBPYmplY3QuYXNzaWduKHt9LCBmb2N1c0FuZEhvdmVyU3R5bGVzLCBmb2N1c09ubHlTdHlsZXMpLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59O1xyXG5leHBvcnRzLmhvbGxvdyA9IChjb2xvcikgPT4ge1xyXG5cdC8vIFRPRE86IGJldHRlciBoYW5kbGluZyBvZiBjYW5jZWwgYW5kIGRlbGV0ZSBjb2xvcnNcclxuXHRpZiAoY29sb3IgPT09ICdjYW5jZWwnIHx8IGNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0cmV0dXJuIGJ1dHRvbkhvbGxvd1ZhcmlhbnQodGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yLCB0aGVtZS5idXR0b25bY29sb3JdLmJvcmRlckNvbG9yKTtcclxufTtcclxuXHJcblxyXG4vLyBMaW5rIFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25MaW5rVmFyaWFudCAodGV4dENvbG9yLCBob3ZlckNvbG9yKSB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHRjb2xvcjogaG92ZXJDb2xvcixcclxuXHRcdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0XHQnYm9yZGVyJzogMCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdub25lJyxcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cdFx0XHQnZm9udFdlaWdodCc6ICdub3JtYWwnLFxyXG5cdFx0XHQnb3V0bGluZSc6ICdub25lJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogaG92ZXJTdHlsZXMsXHJcblx0fTtcclxufTtcclxuZnVuY3Rpb24gYnV0dG9uTGlua0RlbGV0ZSAoKSB7XHJcblx0Y29uc3Qgc3R5bGVzID0gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLCBkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMCkpLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgNCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDQpLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfWAsXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uc3R5bGVzLmJhc2UsXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnRzLmxpbmsgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmxpbmssIHRoZW1lLmNvbG9yLmxpbmtIb3Zlcik7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtEZWxldGUoKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvcltjb2xvcl0sIHRoZW1lLmNvbG9yW2NvbG9yXSk7XHJcblx0fVxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBDZW50ZXIgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aGVpZ2h0LFxyXG5cdHN0eWxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jZW50ZXIsIGNsYXNzTmFtZSk7XHJcblx0cHJvcHMuc3R5bGUgPSB7IGhlaWdodCwgLi4uc3R5bGUgfTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuQ2VudGVyLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGhlaWdodDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuQ2VudGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdGhlaWdodDogJ2F1dG8nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDZW50ZXI7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDZW50ZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjZW50ZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5jb25zdCBiYXNlQ29sb3JzID0ge307XHJcblsnZGFuZ2VyJywgJ2luZm8nLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRiYXNlQ29sb3JzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxMCksXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMjApLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5jb25zdCBpbnZlcnRlZENvbG9ycyA9IHt9O1xyXG5bJ2RhbmdlcicsICdpbmZvJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ10uZm9yRWFjaChjb2xvciA9PiB7XHJcblx0aW52ZXJ0ZWRDb2xvcnNbY29sb3IgKyAnX19pbnZlcnRlZCddID0ge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvcltjb2xvcl0sIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yLmdyYXkxMCxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IHRoZW1lLmNvbG9yLmdyYXkyMCxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogdGhlbWUuY29sb3IuZ3JheTE1LFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0Li4uYmFzZUNvbG9ycyxcclxuXHJcblx0Ly8gaW52ZXJ0ZWRcclxuXHRkZWZhdWx0X19pbnZlcnRlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvci5ncmF5NjAsIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yLmdyYXk2MCwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9LFxyXG5cdC4uLmludmVydGVkQ29sb3JzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gQ2hpcCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRjb2xvcixcclxuXHRpbnZlcnRlZCxcclxuXHRsYWJlbCxcclxuXHRvbkNsZWFyLFxyXG5cdG9uQ2xpY2ssXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY2hpcCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblx0Y29uc3QgbGFiZWxDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdGNsYXNzZXMubGFiZWwsXHJcblx0XHRjbGFzc2VzWydidXR0b25fXycgKyBjb2xvciArIChpbnZlcnRlZCA/ICdfX2ludmVydGVkJyA6ICcnKV1cclxuXHQpO1xyXG5cdGNvbnN0IGNsZWFyQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRjbGFzc2VzLmNsZWFyLFxyXG5cdFx0Y2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3IgKyAoaW52ZXJ0ZWQgPyAnX19pbnZlcnRlZCcgOiAnJyldXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPXtsYWJlbENsYXNzTmFtZX0+XHJcblx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHRcdHshIW9uQ2xlYXIgJiYgKFxyXG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xlYXJ9IGNsYXNzTmFtZT17Y2xlYXJDbGFzc05hbWV9PlxyXG5cdFx0XHRcdFx0JnRpbWVzO1xyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQpfVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkNoaXAucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSkuaXNSZXF1aXJlZCxcclxuXHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRvbkNsZWFyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxufTtcclxuQ2hpcC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hpcDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGJvcmRlckxlZnRSYWRpdXMsIGJvcmRlclJpZ2h0UmFkaXVzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3NzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmRIb3ZlcixcclxuXHR9O1xyXG5cclxuXHRjb2xvclZhcmlhbnRzWydidXR0b25fXycgKyBjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZCxcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLnRleHQsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0JzphY3RpdmUnOiB7XHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kQWN0aXZlLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNoaXA6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0bGluZUhlaWdodDogJzIuMmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAnbm9uZScsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRmbG9hdDogJ2xlZnQnLFxyXG5cdFx0cGFkZGluZzogJzAgLjllbScsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblxyXG5cdFx0Ly8gbWFrZSBwaWxscyAtIGV4YWdnZXJhdGUgdGhlIHBhZGRpbmcgdG93YXJkIHRoZSByYWRpaSBzbyBpdCBsb29rcyBldmVuXHJcblx0XHQnOmZpcnN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJMZWZ0UmFkaXVzKCczZW0nKSxcclxuXHRcdFx0cGFkZGluZ0xlZnQ6ICcxLjFlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJSaWdodFJhZGl1cygnM2VtJyksXHJcblx0XHRcdHBhZGRpbmdSaWdodDogJzEuMWVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHByb3ZpZGUgc2VwYXJhdGlvbiBiZXR3ZWVuIHRoZSBsYWJlbCBhbmQgY2xlYXIgYnV0dG9uc1xyXG5cdC8vIGZsb2F0aW5nIHN0b3BzIHRoZSBtYXJnaW5zIGZyb20gY29sbGFwc2luZyBpbnRvIGVhY2hpbmdcclxuXHJcblx0bGFiZWw6IHsgbWFyZ2luUmlnaHQ6IDEgfSxcclxuXHRjbGVhcjogeyBtYXJnaW5MZWZ0OiAxIH0sXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuZnVuY3Rpb24gQ29udGFpbmVyICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNsZWFyRmxvYXRpbmdDaGlsZHJlbixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHR3aWR0aCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc2VzW3dpZHRoXSxcclxuXHRcdGNsZWFyRmxvYXRpbmdDaGlsZHJlbiA/IGNsYXNzZXMuY2xlYXJmaXggOiBudWxsXHJcblx0KTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XHJcblx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLmlzUmVxdWlyZWQsXHJcblx0d2lkdGg6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhzaXplcykpLmlzUmVxdWlyZWQsXHJcbn07XHJcbkNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHR3aWR0aDogJ2xhcmdlJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmNvbnRhaW5lci5zaXplLnNtYWxsLFxyXG5cdG1lZGl1bTogdGhlbWUuY29udGFpbmVyLnNpemUubWVkaXVtLFxyXG5cdGxhcmdlOiB0aGVtZS5jb250YWluZXIuc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRhaW5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKHNpemVzKS5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tzaXplXSA9IHtcclxuXHRcdG1heFdpZHRoOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8qXHJcblx0TWljcm8gY2xlYXJmaXggaGFja1xyXG5cdDEuXHRUaGUgc3BhY2UgY29udGVudCBpcyBvbmUgd2F5IHRvIGF2b2lkIGFuIE9wZXJhIGJ1ZyB3aGVuIHRoZVxyXG5cdFx0XHRjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlIGlzIGluY2x1ZGVkIGFueXdoZXJlIGVsc2UgaW4gdGhlIGRvY3VtZW50LlxyXG5cdFx0XHRPdGhlcndpc2UgaXQgY2F1c2VzIHNwYWNlIHRvIGFwcGVhciBhdCB0aGUgdG9wIGFuZCBib3R0b20gb2YgZWxlbWVudHNcclxuXHRcdFx0dGhhdCBhcmUgY2xlYXJmaXhlZC5cclxuXHQyLlx0VGhlIHVzZSBvZiBgdGFibGVgIHJhdGhlciB0aGFuIGBibG9ja2AgaXMgb25seSBuZWNlc3NhcnkgaWYgdXNpbmdcclxuXHRcdFx0YDpiZWZvcmVgIHRvIGNvbnRhaW4gdGhlIHRvcC1tYXJnaW5zIG9mIGNoaWxkIGVsZW1lbnRzLlxyXG4qL1xyXG5jb25zdCBjbGVhcmZpeFN0eWxlcyA9IHtcclxuXHRjbGVhcjogJ2JvdGgnLFxyXG5cdGNvbnRlbnQ6ICdcIiBcIicsIC8vIDFcclxuXHRkaXNwbGF5OiAndGFibGUnLCAvLyAyXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdG1hcmdpbkxlZnQ6ICdhdXRvJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnYXV0bycsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHR9LFxyXG5cclxuXHQvLyBjbGVhciBmbG9hdGluZyBjaGlsZHJlblxyXG5cdGNsZWFyZml4OiB7XHJcblx0XHQnOmJlZm9yZSc6IGNsZWFyZml4U3R5bGVzLFxyXG5cdFx0JzphZnRlcic6IGNsZWFyZml4U3R5bGVzLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcblxyXG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbiAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdyl9IC8+XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gTk9URVxyXG4vLyAxOiB0YWtlIGFkdmFudGFnZSBvZiBgY3VycmVudENvbG9yYCBieSBsZWF2aW5nIGJvcmRlciB0b3AgY29sb3IgdW5kZWZpbmVkXHJcbi8vIDI6IGV2ZW4gdGhvdWdoIHRoZSBhcnJvdyBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkLCB2aXN1YWxseSBpdCBhcHBlYXJzIHRvbyBsb3dcclxuLy8gICAgYmVjYXVzZSBvZiBsb3dlcmNhc2UgY2hhcmFjdGVycyBiZXNpZGUgaXRcclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyVG9wOiAnMC4zZW0gc29saWQnLCAvLyAxXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogMCxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gMlxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogMCxcclxuXHJcblx0XHQvLyBhZGQgc3BhY2luZ1xyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5MZWZ0OiAnMC41ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bkJ1dHRvbjtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgRm9ybUxhYmVsIGZyb20gJy4uL0Zvcm1MYWJlbCc7XHJcblxyXG5jbGFzcyBGb3JtRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmZvcm1GaWVsZElkID0gZ2VuZXJhdGVJZCgpO1xyXG5cdH1cclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUZpZWxkSWQ6IHRoaXMuZm9ybUZpZWxkSWQsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmb3JtTGF5b3V0ID0gJ2Jhc2ljJywgbGFiZWxXaWR0aCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGNoaWxkcmVuLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNyb3BMYWJlbCxcclxuXHRcdFx0aHRtbEZvcixcclxuXHRcdFx0bGFiZWwsXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm1GaWVsZCxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybUZpZWxkLS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0sXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsID8gY2xhc3Nlc1snRm9ybUZpZWxkLS1vZmZzZXQtYWJzZW50LWxhYmVsJ10gOiBudWxsLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdGlmIChvZmZzZXRBYnNlbnRMYWJlbCAmJiBsYWJlbFdpZHRoKSB7XHJcblx0XHRcdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0XHRcdHBhZGRpbmdMZWZ0OiBsYWJlbFdpZHRoLFxyXG5cdFx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGVsZW1lbnRzXHJcblx0XHRjb25zdCBjb21wb25lbnRMYWJlbCA9IGxhYmVsID8gKFxyXG5cdFx0XHQ8Rm9ybUxhYmVsIGh0bWxGb3I9e2h0bWxGb3J9IGNyb3BUZXh0PXtjcm9wTGFiZWx9PlxyXG5cdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0PC9Gb3JtTGFiZWw+XHJcblx0XHQpIDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHsuLi5wcm9wc30gaHRtbEZvcj17aHRtbEZvcn0+XHJcblx0XHRcdFx0e2NvbXBvbmVudExhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUZpZWxkLmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtRmllbGQuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1GaWVsZC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcblx0Y3JvcExhYmVsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRodG1sRm9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG9mZnNldEFic2VudExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlSWQgKCkge1xyXG5cdHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1GaWVsZDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gRmllbGRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1GaWVsZCc6IHtcclxuXHRcdG1hcmdpbkJvdHRvbTogJzFlbScsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhIGhvcml6b250YWwgZm9ybVxyXG5cclxuXHQnRm9ybUZpZWxkLS1mb3JtLWxheW91dC1ob3Jpem9udGFsJzoge1xyXG5cdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0ZGlzcGxheTogJ3RhYmxlJyxcclxuXHRcdFx0dGFibGVMYXlvdXQ6ICdmaXhlZCcsXHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIGluc2lkZSBob3Jpem9udGFsIGZvcm1cclxuXHQvLyB0eXBpY2FsbHkgZm9yIHVzZSB3aXRoIHN1Ym1pdCBidXR0b24gaW5zaWRlXHJcblx0J0Zvcm1GaWVsZC0tb2Zmc2V0LWFic2VudC1sYWJlbCc6IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5mb3JtLmxhYmVsLndpZHRoLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGFuIGlubGluZSBmb3JtXHJcblxyXG5cdCdGb3JtRmllbGQtLWZvcm0tbGF5b3V0LWlubGluZSc6IHtcclxuXHRcdCdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcblx0XHQncGFkZGluZ0xlZnQnOiAnMC4yNWVtJyxcclxuXHRcdCdwYWRkaW5nUmlnaHQnOiAnMC4yNWVtJyxcclxuXHRcdCd2ZXJ0aWNhbEFsaWduJzogJ3RvcCcsXHJcblxyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHsgcGFkZGluZ0xlZnQ6IDAgfSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHsgcGFkZGluZ1JpZ2h0OiAwIH0sXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb25jYXRDbGFzc25hbWVzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmNhdENsYXNzbmFtZXMnO1xyXG5pbXBvcnQgSW5wdXROb2VkaXQgZnJvbSAnLi9ub2VkaXQnO1xyXG5cclxuLy8gTk9URSBtdXN0IE5PVCBiZSBmdW5jdGlvbmFsIGNvbXBvbmVudCB0byBhbGxvdyBgcmVmc2BcclxuXHJcbmNsYXNzIEZvcm1JbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Ymx1ciAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5ibHVyKCk7XHJcblx0fVxyXG5cdGZvY3VzICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmZvY3VzKCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRkaXNhYmxlZCxcclxuXHRcdFx0aWQsXHJcblx0XHRcdG11bHRpbGluZSxcclxuXHRcdFx0bm9lZGl0LFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gTk9URSByZXR1cm4gYSBkaWZmZXJlbnQgY29tcG9uZW50IGZvciBgbm9lZGl0YFxyXG5cdFx0aWYgKG5vZWRpdCkgcmV0dXJuIDxJbnB1dE5vZWRpdCB7Li4udGhpcy5wcm9wc30gLz47XHJcblxyXG5cdFx0Y29uc3QgeyBmb3JtRmllbGRJZCwgZm9ybUxheW91dCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdHByb3BzLmlkID0gaWQgfHwgZm9ybUZpZWxkSWQ7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybUlucHV0LFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtSW5wdXRfX3NpemUtLScgKyBzaXplXSxcclxuXHRcdFx0ZGlzYWJsZWQgPyBjbGFzc2VzWydGb3JtSW5wdXQtLWRpc2FibGVkJ10gOiBudWxsLFxyXG5cdFx0XHRmb3JtTGF5b3V0ID8gY2xhc3Nlc1snRm9ybUlucHV0LS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0gOiBudWxsLFxyXG5cdFx0XHQuLi5jb25jYXRDbGFzc25hbWVzKGFwaHJvZGl0ZVN0eWxlcylcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzZXRSZWYgPSAobikgPT4gKHRoaXMudGFyZ2V0ID0gbik7XHJcblx0XHRjb25zdCBUYWcgPSBtdWx0aWxpbmUgPyAndGV4dGFyZWEnIDogJ2lucHV0JztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8VGFnXHJcblx0XHRcdFx0cmVmPXtzZXRSZWZ9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtSW5wdXQucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0bXVsdGlsaW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ3NtYWxsJywgJ2xhcmdlJ10pLFxyXG5cdHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ2RlZmF1bHQnLFxyXG5cdHR5cGU6ICd0ZXh0JyxcclxufTtcclxuRm9ybUlucHV0LmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUlucHV0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmZ1bmN0aW9uIEZvcm1JbnB1dE5vZWRpdCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRtdWx0aWxpbmUsXHJcblx0bm9lZGl0LCAvLyBOT1RFIG5vdCB1c2VkLCBqdXN0IHJlbW92ZWQgZnJvbSBwcm9wc1xyXG5cdHR5cGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMubm9lZGl0LFxyXG5cdFx0Y3JvcFRleHQgPyBjbGFzc2VzLmNyb3BUZXh0IDogbnVsbCxcclxuXHRcdG11bHRpbGluZSA/IGNsYXNzZXMubXVsdGlsaW5lIDogbnVsbCxcclxuXHRcdChwcm9wcy5ocmVmIHx8IHByb3BzLm9uQ2xpY2spID8gY2xhc3Nlcy5hbmNob3IgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkZvcm1JbnB1dE5vZWRpdC5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkZvcm1JbnB1dE5vZWRpdC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnc3BhbicsXHJcbn07XHJcblxyXG5jb25zdCBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzID0ge1xyXG5cdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0Ym9yZGVyQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxuXHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdG5vZWRpdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLm5vZWRpdCxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ub2VkaXQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTgwLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cclxuXHRcdC8vIHByZXZlbnQgZW1wdHkgaW5wdXRzIGZyb20gY29sbGFwc2luZyBieSBhZGRpbmcgY29udGVudFxyXG5cdFx0JzplbXB0eTpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRcdGNvbnRlbnQ6ICdcIihubyB2YWx1ZSlcIicsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdG11bHRpbGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0bGluZUhlaWdodDogJzEuNCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiAnMC42ZW0nLFxyXG5cdFx0cGFkZGluZ1RvcDogJzAuNmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBpbmRpY2F0ZSBjbGlja2FiaWxpdHkgd2hlbiB1c2luZyBhbiBhbmNob3JcclxuXHRhbmNob3I6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCA1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdFx0bWFyZ2luUmlnaHQ6IDUsXHJcblx0XHRtaW5XaWR0aDogMCxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtSW5wdXROb2VkaXQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIElucHV0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtSW5wdXQnOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kQ29sb3InOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHQnYmFja2dyb3VuZEltYWdlJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlckNvbG9yJzogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdCdib3JkZXJTdHlsZSc6ICdzb2xpZCcsXHJcblx0XHQnYm9yZGVyV2lkdGgnOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHQnYm94U2hhZG93JzogdGhlbWUuaW5wdXQuYm94U2hhZG93LFxyXG5cdFx0J2NvbG9yJzogJ2luaGVyaXQnLCAvLyBGSVhNRVxyXG5cdFx0J2Rpc3BsYXknOiAnYmxvY2snLFxyXG5cdFx0J2hlaWdodCc6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0J3RyYW5zaXRpb24nOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdCd3aWR0aCc6ICcxMDAlJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmhvdmVyLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0J0Zvcm1JbnB1dC0tZGlzYWJsZWQnOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGlzYWJsZWQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc2l6ZXNcclxuXHQnRm9ybUlucHV0X19zaXplLS1zbWFsbCc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0fSxcclxuXHQnRm9ybUlucHV0X19zaXplLS1sYXJnZSc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybUxhYmVsICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRodG1sRm9yLFxyXG5cdC4uLnByb3BzXHJcbn0sXHJcbntcclxuXHRmb3JtRmllbGRJZCxcclxuXHRmb3JtTGF5b3V0LFxyXG5cdGxhYmVsV2lkdGgsXHJcbn0pIHtcclxuXHRwcm9wcy5odG1sRm9yID0gaHRtbEZvciB8fCBmb3JtRmllbGRJZDtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLkZvcm1MYWJlbCxcclxuXHRcdGZvcm1MYXlvdXQgPyBjbGFzc2VzWydGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSA6IG51bGwsXHJcblx0XHRjcm9wVGV4dCA/IGNsYXNzZXNbJ0Zvcm1MYWJlbC0tY3JvcC10ZXh0J10gOiBudWxsLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cdGlmIChsYWJlbFdpZHRoKSB7XHJcblx0XHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdFx0d2lkdGg6IGxhYmVsV2lkdGgsXHJcblx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1MYWJlbC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuRm9ybUxhYmVsLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdsYWJlbCcsXHJcbn07XHJcbkZvcm1MYWJlbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUxhYmVsO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBMYWJlbFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUxhYmVsJzoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubGFiZWwuY29sb3IsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9ybS5sYWJlbC5mb250U2l6ZSxcclxuXHRcdGZvbnRXZWlnaHQ6IHRoZW1lLmZvcm0ubGFiZWwuZm9udFdlaWdodCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMC41ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGEgaG9yaXpvbnRhbCBmb3JtXHJcblxyXG5cdCdGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LWhvcml6b250YWwnOiB7XHJcblx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRkaXNwbGF5OiAndGFibGUtY2VsbCcsXHJcblx0XHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LCAvLyBmaXhcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAwLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IDUsXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnLFxyXG5cdFx0XHR3aWR0aDogdGhlbWUuZm9ybS5sYWJlbC53aWR0aCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gY3JvcCBsb25nIHRleHRcclxuXHJcblx0J0Zvcm1MYWJlbC0tY3JvcC10ZXh0Jzoge1xyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybU5vdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aHRtbCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMubm90ZSwgY2xhc3NOYW1lKTtcclxuXHJcblx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0aWYgKGNoaWxkcmVuICYmIGh0bWwpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IEZvcm1Ob3RlIGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYGh0bWxgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gaHRtbCA/IChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGh0bWwgfX0gLz5cclxuXHQpIDogKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5Gb3JtTm90ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRodG1sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtTm90ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybU5vdGU7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIE5vdGVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubm90ZS5jb2xvcixcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb3JtLm5vdGUuZm9udFNpemUsXHJcblx0XHRtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcuc21hbGwsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY2xhc3MgRm9ybVNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGlkLCBvcHRpb25zLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgZm9ybUZpZWxkSWQgfSA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuc2VsZWN0LFxyXG5cdFx0XHRwcm9wcy5kaXNhYmxlZCA/IGNsYXNzZXNbJ3NlbGVjdC0tZGlzYWJsZWQnXSA6IG51bGxcclxuXHRcdCk7XHJcblx0XHRwcm9wcy5pZCA9IGlkIHx8IGZvcm1GaWVsZElkO1xyXG5cclxuXHRcdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdFx0aWYgKG9wdGlvbnMgJiYgY2hpbGRyZW4pIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogRm9ybVNlbGVjdCBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGBvcHRpb25zYC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfT5cclxuXHRcdFx0XHR7b3B0aW9ucyA/IChcclxuXHRcdFx0XHRcdDxzZWxlY3Qgey4uLnByb3BzfT57b3B0aW9ucy5tYXAob3B0ID0+IChcclxuXHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XHJcblx0XHRcdFx0XHRcdFx0e29wdC5sYWJlbH1cclxuXHRcdFx0XHRcdFx0PC9vcHRpb24+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdCkgOiA8c2VsZWN0IHsuLi5wcm9wc30+e2NoaWxkcmVufTwvc2VsZWN0Pn1cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93cywgcHJvcHMuZGlzYWJsZWQgPyBjbGFzc2VzWydhcnJvd3MtLWRpc2FibGVkJ10gOiBudWxsKX0+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93LCBjbGFzc2VzLmFycm93VG9wKX0gLz5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3csIGNsYXNzZXMuYXJyb3dCb3R0b20pfSAvPlxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkZvcm1TZWxlY3QuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtU2VsZWN0LnByb3BUeXBlcyA9IHtcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdH0pXHJcblx0KSxcclxuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVNlbGVjdDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gU2VsZWN0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZGFya2VuLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzZWxlY3Qgbm9kZVxyXG5cdHNlbGVjdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdGJvcmRlckJvdHRvbUNvbG9yOiBkYXJrZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyVG9wQ29sb3I6IGxpZ2h0ZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0Ym94U2hhZG93OiB0aGVtZS5zZWxlY3QuYm94U2hhZG93LFxyXG5cdFx0Y29sb3I6ICdpbmhlcml0JywgLy8gRklYTUVcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ob3ZlcixcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCdzZWxlY3QtLWRpc2FibGVkJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRpc2FibGVkLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGFycm93c1xyXG5cdGFycm93czoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRyaWdodDogMCxcclxuXHRcdHRvcDogMCxcclxuXHRcdHdpZHRoOiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0fSxcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IDAsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0ekluZGV4OiAxLFxyXG5cdH0sXHJcblx0YXJyb3dUb3A6IHtcclxuXHRcdGJvcmRlckJvdHRvbTogJzAuM2VtIHNvbGlkJyxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzAuMWVtJyxcclxuXHR9LFxyXG5cdGFycm93Qm90dG9tOiB7XHJcblx0XHRib3JkZXJUb3A6ICcwLjNlbSBzb2xpZCcsXHJcblx0XHRtYXJnaW5Ub3A6ICcwLjFlbScsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUxheW91dDogdGhpcy5wcm9wcy5sYXlvdXQsXHJcblx0XHRcdGxhYmVsV2lkdGg6IHRoaXMucHJvcHMubGFiZWxXaWR0aCxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHQvLyBOT1RFIGBsYWJlbFdpZHRoYCBpcyBkZWNsYXJlZCB0byByZW1vdmUgaXQgZnJvbSBgcHJvcHNgLCB0aG91Z2ggbmV2ZXIgdXNlZFxyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRsYWJlbFdpZHRoLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcblx0XHRcdGxheW91dCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtLFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtX18nICsgbGF5b3V0XSxcclxuXHRcdFx0Y2xhc3NOYW1lXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcblx0fVxyXG59O1xyXG5cclxuRm9ybS5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtLnByb3BUeXBlcyA9IHtcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcbn07XHJcbkZvcm0uZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2Zvcm0nLFxyXG5cdGxheW91dDogJ2Jhc2ljJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm1cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRGb3JtOiB7fSxcclxufTtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgR2x5cGggZnJvbSAnLi4vR2x5cGgnO1xyXG5cclxuZnVuY3Rpb24gR2x5cGhCdXR0b24gKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRnbHlwaFN0eWxlLFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBpc0RlZmF1bHQgPSBwb3NpdGlvbiA9PT0gJ2RlZmF1bHQnO1xyXG5cdGNvbnN0IGlzTGVmdCA9IHBvc2l0aW9uID09PSAnbGVmdCc7XHJcblx0Y29uc3QgaXNSaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnO1xyXG5cclxuXHRjb25zdCBvZmZzZXQgPSB7fTtcclxuXHRpZiAoaXNMZWZ0KSBvZmZzZXQubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBvZmZzZXQubWFyZ2luTGVmdCA9ICcwLjVlbSc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge1xyXG5cdFx0Li4ub2Zmc2V0LFxyXG5cdFx0Li4uZ2x5cGhTdHlsZSxcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpY29uID0gKFxyXG5cdFx0PEdseXBoXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5nbHlwaH1cclxuXHRcdFx0Y29sb3I9e2dseXBoQ29sb3J9XHJcblx0XHRcdG5hbWU9e2dseXBofVxyXG5cdFx0XHRzaXplPXtnbHlwaFNpemV9XHJcblx0XHRcdHN0eWxlPXtnbHlwaFN0eWxlc31cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0eyhpc0RlZmF1bHQgfHwgaXNMZWZ0KSAmJiBpY29ufVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdHtpc1JpZ2h0ICYmIGljb259XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRnbHlwaDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ2xlZnQnLCAncmlnaHQnXSksXHJcbn07XHJcbkdseXBoQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRnbHlwaFN0eWxlOiB7fSxcclxuXHRwb3NpdGlvbjogJ2RlZmF1bHQnLCAvLyBubyBtYXJnaW4sIGFzc3VtZXMgbm8gY2hpbGRyZW5cclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z2x5cGg6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyBmaXggaWNvbiBhbGlnbm1lbnRcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoQnV0dG9uO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRm9ybUZpZWxkJztcclxuaW1wb3J0IEdseXBoIGZyb20gJy4uL0dseXBoJztcclxuXHJcbmZ1bmN0aW9uIEdseXBoRmllbGQgKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgaXNMZWZ0ID0gcG9zaXRpb24gPT09ICdsZWZ0JztcclxuXHRjb25zdCBpc1JpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge307XHJcblx0aWYgKGlzTGVmdCkgZ2x5cGhTdHlsZXMubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBnbHlwaFN0eWxlcy5tYXJnaW5MZWZ0ID0gJzAuNWVtJztcclxuXHJcblx0Y29uc3QgaWNvbiA9IChcclxuXHRcdDxHbHlwaFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuZ2x5cGh9XHJcblx0XHRcdGNvbG9yPXtnbHlwaENvbG9yfVxyXG5cdFx0XHRuYW1lPXtnbHlwaH1cclxuXHRcdFx0c2l6ZT17Z2x5cGhTaXplfVxyXG5cdFx0XHRzdHlsZT17Z2x5cGhTdHlsZXN9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8RmllbGQgYXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLndyYXBwZXJ9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtpc0xlZnQgJiYgaWNvbn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHR7aXNSaWdodCAmJiBpY29ufVxyXG5cdFx0PC9GaWVsZD5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoRmllbGQucHJvcFR5cGVzID0ge1xyXG5cdGdseXBoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxyXG59O1xyXG5HbHlwaEZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRwb3NpdGlvbjogJ2xlZnQnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHR9LFxyXG5cdGdseXBoOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gZml4IGljb24gYWxpZ25tZW50XHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaEZpZWxkO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5nbHlwaC5jb2xvci5kYW5nZXIsXHJcblx0aW5oZXJpdDogdGhlbWUuZ2x5cGguY29sb3IuaW5oZXJpdCxcclxuXHRpbnZlcnRlZDogdGhlbWUuZ2x5cGguY29sb3IuaW52ZXJ0ZWQsXHJcblx0cHJpbWFyeTogdGhlbWUuZ2x5cGguY29sb3IucHJpbWFyeSxcclxuXHRzdWNjZXNzOiB0aGVtZS5nbHlwaC5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmdseXBoLmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgb2N0aWNvbnMgZnJvbSAnLi9vY3RpY29ucyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbi8vIEZJWE1FIHN0YXRpYyBvY3RpY29uIGNsYXNzZXMgbGVhbmluZyBvbiBFbGVtZW50YWwgdG8gYXZvaWQgZHVwbGljYXRlXHJcbi8vIGZvbnQgYW5kIENTUzsgaW5mbGF0aW5nIHRoZSBwcm9qZWN0IHNpemVcclxuXHJcbmZ1bmN0aW9uIEdseXBoICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRuYW1lLFxyXG5cdHNpemUsXHJcblx0c3R5bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGNvbG9ySXNWYWxpZFR5cGUgPSBPYmplY3Qua2V5cyhjb2xvcnMpLmluY2x1ZGVzKGNvbG9yKTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdseXBoLFxyXG5cdFx0Y29sb3JJc1ZhbGlkVHlwZSAmJiBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSxcclxuXHRcdGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCkgKyBgICR7b2N0aWNvbnNbbmFtZV19YDtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBzdXBwb3J0IHJhbmRvbSBjb2xvciBzdHJpbmdzXHJcblx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRjb2xvcjogIWNvbG9ySXNWYWxpZFR5cGUgPyBjb2xvciA6IG51bGwsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuR2x5cGgucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZywgLy8gc3VwcG9ydCByYW5kb20gY29sb3Igc3RyaW5nc1xyXG5cdF0pLFxyXG5cdG5hbWU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhvY3RpY29ucykpLmlzUmVxdWlyZWQsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKHNpemVzKSksXHJcbn07XHJcbkdseXBoLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdpJyxcclxuXHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdHNpemU6ICdzbWFsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhbGVydDogJ29jdGljb24gb2N0aWNvbi1hbGVydCcsXHJcblx0J2Fycm93LWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LWRvd24nLFxyXG5cdCdhcnJvdy1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1sZWZ0JyxcclxuXHQnYXJyb3ctcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXJpZ2h0JyxcclxuXHQnYXJyb3ctc21hbGwtZG93bic6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtZG93bicsXHJcblx0J2Fycm93LXNtYWxsLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLWxlZnQnLFxyXG5cdCdhcnJvdy1zbWFsbC1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtcmlnaHQnLFxyXG5cdCdhcnJvdy1zbWFsbC11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtdXAnLFxyXG5cdCdhcnJvdy11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctdXAnLFxyXG5cdG1pY3Jvc2NvcGU6ICdvY3RpY29uIG9jdGljb24tbWljcm9zY29wZScsXHJcblx0YmVha2VyOiAnb2N0aWNvbiBvY3RpY29uLWJlYWtlcicsXHJcblx0YmVsbDogJ29jdGljb24gb2N0aWNvbi1iZWxsJyxcclxuXHRib29rOiAnb2N0aWNvbiBvY3RpY29uLWJvb2snLFxyXG5cdGJvb2ttYXJrOiAnb2N0aWNvbiBvY3RpY29uLWJvb2ttYXJrJyxcclxuXHRicmllZmNhc2U6ICdvY3RpY29uIG9jdGljb24tYnJpZWZjYXNlJyxcclxuXHRicm9hZGNhc3Q6ICdvY3RpY29uIG9jdGljb24tYnJvYWRjYXN0JyxcclxuXHRicm93c2VyOiAnb2N0aWNvbiBvY3RpY29uLWJyb3dzZXInLFxyXG5cdGJ1ZzogJ29jdGljb24gb2N0aWNvbi1idWcnLFxyXG5cdGNhbGVuZGFyOiAnb2N0aWNvbiBvY3RpY29uLWNhbGVuZGFyJyxcclxuXHRjaGVjazogJ29jdGljb24gb2N0aWNvbi1jaGVjaycsXHJcblx0Y2hlY2tsaXN0OiAnb2N0aWNvbiBvY3RpY29uLWNoZWNrbGlzdCcsXHJcblx0J2NoZXZyb24tZG93bic6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1kb3duJyxcclxuXHQnY2hldnJvbi1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLWxlZnQnLFxyXG5cdCdjaGV2cm9uLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLXJpZ2h0JyxcclxuXHQnY2hldnJvbi11cCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi11cCcsXHJcblx0J2NpcmNsZS1zbGFzaCc6ICdvY3RpY29uIG9jdGljb24tY2lyY2xlLXNsYXNoJyxcclxuXHQnY2lyY3VpdC1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tY2lyY3VpdC1ib2FyZCcsXHJcblx0Y2xpcHB5OiAnb2N0aWNvbiBvY3RpY29uLWNsaXBweScsXHJcblx0Y2xvY2s6ICdvY3RpY29uIG9jdGljb24tY2xvY2snLFxyXG5cdCdjbG91ZC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tY2xvdWQtZG93bmxvYWQnLFxyXG5cdCdjbG91ZC11cGxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWNsb3VkLXVwbG9hZCcsXHJcblx0Y29kZTogJ29jdGljb24gb2N0aWNvbi1jb2RlJyxcclxuXHQnY29sb3ItbW9kZSc6ICdvY3RpY29uIG9jdGljb24tY29sb3ItbW9kZScsXHJcblx0J2NvbW1lbnQtYWRkJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWFkZCcsXHJcblx0Y29tbWVudDogJ29jdGljb24gb2N0aWNvbi1jb21tZW50JyxcclxuXHQnY29tbWVudC1kaXNjdXNzaW9uJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWRpc2N1c3Npb24nLFxyXG5cdCdjcmVkaXQtY2FyZCc6ICdvY3RpY29uIG9jdGljb24tY3JlZGl0LWNhcmQnLFxyXG5cdGRhc2g6ICdvY3RpY29uIG9jdGljb24tZGFzaCcsXHJcblx0ZGFzaGJvYXJkOiAnb2N0aWNvbiBvY3RpY29uLWRhc2hib2FyZCcsXHJcblx0ZGF0YWJhc2U6ICdvY3RpY29uIG9jdGljb24tZGF0YWJhc2UnLFxyXG5cdGNsb25lOiAnb2N0aWNvbiBvY3RpY29uLWNsb25lJyxcclxuXHQnZGVza3RvcC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tZGVza3RvcC1kb3dubG9hZCcsXHJcblx0J2RldmljZS1jYW1lcmEnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1jYW1lcmEnLFxyXG5cdCdkZXZpY2UtY2FtZXJhLXZpZGVvJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtY2FtZXJhLXZpZGVvJyxcclxuXHQnZGV2aWNlLWRlc2t0b3AnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1kZXNrdG9wJyxcclxuXHQnZGV2aWNlLW1vYmlsZSc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLW1vYmlsZScsXHJcblx0ZGlmZjogJ29jdGljb24gb2N0aWNvbi1kaWZmJyxcclxuXHQnZGlmZi1hZGRlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1hZGRlZCcsXHJcblx0J2RpZmYtaWdub3JlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1pZ25vcmVkJyxcclxuXHQnZGlmZi1tb2RpZmllZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1tb2RpZmllZCcsXHJcblx0J2RpZmYtcmVtb3ZlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1yZW1vdmVkJyxcclxuXHQnZGlmZi1yZW5hbWVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLXJlbmFtZWQnLFxyXG5cdGVsbGlwc2lzOiAnb2N0aWNvbiBvY3RpY29uLWVsbGlwc2lzJyxcclxuXHQnZXllLXVud2F0Y2gnOiAnb2N0aWNvbiBvY3RpY29uLWV5ZS11bndhdGNoJyxcclxuXHQnZXllLXdhdGNoJzogJ29jdGljb24gb2N0aWNvbi1leWUtd2F0Y2gnLFxyXG5cdGV5ZTogJ29jdGljb24gb2N0aWNvbi1leWUnLFxyXG5cdCdmaWxlLWJpbmFyeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1iaW5hcnknLFxyXG5cdCdmaWxlLWNvZGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtY29kZScsXHJcblx0J2ZpbGUtZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLWRpcmVjdG9yeScsXHJcblx0J2ZpbGUtbWVkaWEnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtbWVkaWEnLFxyXG5cdCdmaWxlLXBkZic6ICdvY3RpY29uIG9jdGljb24tZmlsZS1wZGYnLFxyXG5cdCdmaWxlLXN1Ym1vZHVsZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zdWJtb2R1bGUnLFxyXG5cdCdmaWxlLXN5bWxpbmstZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN5bWxpbmstZGlyZWN0b3J5JyxcclxuXHQnZmlsZS1zeW1saW5rLWZpbGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3ltbGluay1maWxlJyxcclxuXHQnZmlsZS10ZXh0JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXRleHQnLFxyXG5cdCdmaWxlLXppcCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS16aXAnLFxyXG5cdGZsYW1lOiAnb2N0aWNvbiBvY3RpY29uLWZsYW1lJyxcclxuXHRmb2xkOiAnb2N0aWNvbiBvY3RpY29uLWZvbGQnLFxyXG5cdGdlYXI6ICdvY3RpY29uIG9jdGljb24tZ2VhcicsXHJcblx0Z2lmdDogJ29jdGljb24gb2N0aWNvbi1naWZ0JyxcclxuXHRnaXN0OiAnb2N0aWNvbiBvY3RpY29uLWdpc3QnLFxyXG5cdCdnaXN0LXNlY3JldCc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1zZWNyZXQnLFxyXG5cdCdnaXQtYnJhbmNoLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1jcmVhdGUnLFxyXG5cdCdnaXQtYnJhbmNoLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1kZWxldGUnLFxyXG5cdCdnaXQtYnJhbmNoJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoJyxcclxuXHQnZ2l0LWNvbW1pdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWNvbW1pdCcsXHJcblx0J2dpdC1jb21wYXJlJzogJ29jdGljb24gb2N0aWNvbi1naXQtY29tcGFyZScsXHJcblx0J2dpdC1tZXJnZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LW1lcmdlJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdC1hYmFuZG9uZWQnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1wdWxsLXJlcXVlc3QtYWJhbmRvbmVkJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LXB1bGwtcmVxdWVzdCcsXHJcblx0Z2xvYmU6ICdvY3RpY29uIG9jdGljb24tZ2xvYmUnLFxyXG5cdGdyYXBoOiAnb2N0aWNvbiBvY3RpY29uLWdyYXBoJyxcclxuXHRoZWFydDogJ29jdGljb24gb2N0aWNvbi1oZWFydCcsXHJcblx0aGlzdG9yeTogJ29jdGljb24gb2N0aWNvbi1oaXN0b3J5JyxcclxuXHRob21lOiAnb2N0aWNvbiBvY3RpY29uLWhvbWUnLFxyXG5cdCdob3Jpem9udGFsLXJ1bGUnOiAnb2N0aWNvbiBvY3RpY29uLWhvcml6b250YWwtcnVsZScsXHJcblx0aHVib3Q6ICdvY3RpY29uIG9jdGljb24taHVib3QnLFxyXG5cdGluYm94OiAnb2N0aWNvbiBvY3RpY29uLWluYm94JyxcclxuXHRpbmZvOiAnb2N0aWNvbiBvY3RpY29uLWluZm8nLFxyXG5cdCdpc3N1ZS1jbG9zZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLWNsb3NlZCcsXHJcblx0J2lzc3VlLW9wZW5lZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtb3BlbmVkJyxcclxuXHQnaXNzdWUtcmVvcGVuZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLXJlb3BlbmVkJyxcclxuXHRqZXJzZXk6ICdvY3RpY29uIG9jdGljb24tamVyc2V5JyxcclxuXHRrZXk6ICdvY3RpY29uIG9jdGljb24ta2V5JyxcclxuXHRrZXlib2FyZDogJ29jdGljb24gb2N0aWNvbi1rZXlib2FyZCcsXHJcblx0bGF3OiAnb2N0aWNvbiBvY3RpY29uLWxhdycsXHJcblx0J2xpZ2h0LWJ1bGInOiAnb2N0aWNvbiBvY3RpY29uLWxpZ2h0LWJ1bGInLFxyXG5cdGxpbms6ICdvY3RpY29uIG9jdGljb24tbGluaycsXHJcblx0J2xpbmstZXh0ZXJuYWwnOiAnb2N0aWNvbiBvY3RpY29uLWxpbmstZXh0ZXJuYWwnLFxyXG5cdCdsaXN0LW9yZGVyZWQnOiAnb2N0aWNvbiBvY3RpY29uLWxpc3Qtb3JkZXJlZCcsXHJcblx0J2xpc3QtdW5vcmRlcmVkJzogJ29jdGljb24gb2N0aWNvbi1saXN0LXVub3JkZXJlZCcsXHJcblx0bG9jYXRpb246ICdvY3RpY29uIG9jdGljb24tbG9jYXRpb24nLFxyXG5cdCdnaXN0LXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtcHJpdmF0ZScsXHJcblx0J21pcnJvci1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1taXJyb3ItcHJpdmF0ZScsXHJcblx0J2dpdC1mb3JrLXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1mb3JrLXByaXZhdGUnLFxyXG5cdGxvY2s6ICdvY3RpY29uIG9jdGljb24tbG9jaycsXHJcblx0J2xvZ28tZ2l0aHViJzogJ29jdGljb24gb2N0aWNvbi1sb2dvLWdpdGh1YicsXHJcblx0bWFpbDogJ29jdGljb24gb2N0aWNvbi1tYWlsJyxcclxuXHQnbWFpbC1yZWFkJzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlYWQnLFxyXG5cdCdtYWlsLXJlcGx5JzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlcGx5JyxcclxuXHQnbWFyay1naXRodWInOiAnb2N0aWNvbiBvY3RpY29uLW1hcmstZ2l0aHViJyxcclxuXHRtYXJrZG93bjogJ29jdGljb24gb2N0aWNvbi1tYXJrZG93bicsXHJcblx0bWVnYXBob25lOiAnb2N0aWNvbiBvY3RpY29uLW1lZ2FwaG9uZScsXHJcblx0bWVudGlvbjogJ29jdGljb24gb2N0aWNvbi1tZW50aW9uJyxcclxuXHRtaWxlc3RvbmU6ICdvY3RpY29uIG9jdGljb24tbWlsZXN0b25lJyxcclxuXHQnbWlycm9yLXB1YmxpYyc6ICdvY3RpY29uIG9jdGljb24tbWlycm9yLXB1YmxpYycsXHJcblx0bWlycm9yOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvcicsXHJcblx0J21vcnRhci1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tbW9ydGFyLWJvYXJkJyxcclxuXHRtdXRlOiAnb2N0aWNvbiBvY3RpY29uLW11dGUnLFxyXG5cdCduby1uZXdsaW5lJzogJ29jdGljb24gb2N0aWNvbi1uby1uZXdsaW5lJyxcclxuXHRvY3RvZmFjZTogJ29jdGljb24gb2N0aWNvbi1vY3RvZmFjZScsXHJcblx0b3JnYW5pemF0aW9uOiAnb2N0aWNvbiBvY3RpY29uLW9yZ2FuaXphdGlvbicsXHJcblx0cGFja2FnZTogJ29jdGljb24gb2N0aWNvbi1wYWNrYWdlJyxcclxuXHRwYWludGNhbjogJ29jdGljb24gb2N0aWNvbi1wYWludGNhbicsXHJcblx0cGVuY2lsOiAnb2N0aWNvbiBvY3RpY29uLXBlbmNpbCcsXHJcblx0J3BlcnNvbi1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbi1hZGQnLFxyXG5cdCdwZXJzb24tZm9sbG93JzogJ29jdGljb24gb2N0aWNvbi1wZXJzb24tZm9sbG93JyxcclxuXHRwZXJzb246ICdvY3RpY29uIG9jdGljb24tcGVyc29uJyxcclxuXHRwaW46ICdvY3RpY29uIG9jdGljb24tcGluJyxcclxuXHRwbHVnOiAnb2N0aWNvbiBvY3RpY29uLXBsdWcnLFxyXG5cdCdyZXBvLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1jcmVhdGUnLFxyXG5cdCdnaXN0LW5ldyc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1uZXcnLFxyXG5cdCdmaWxlLWRpcmVjdG9yeS1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtZGlyZWN0b3J5LWNyZWF0ZScsXHJcblx0J2ZpbGUtYWRkJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWFkZCcsXHJcblx0cGx1czogJ29jdGljb24gb2N0aWNvbi1wbHVzJyxcclxuXHQncHJpbWl0aXZlLWRvdCc6ICdvY3RpY29uIG9jdGljb24tcHJpbWl0aXZlLWRvdCcsXHJcblx0J3ByaW1pdGl2ZS1zcXVhcmUnOiAnb2N0aWNvbiBvY3RpY29uLXByaW1pdGl2ZS1zcXVhcmUnLFxyXG5cdHB1bHNlOiAnb2N0aWNvbiBvY3RpY29uLXB1bHNlJyxcclxuXHRxdWVzdGlvbjogJ29jdGljb24gb2N0aWNvbi1xdWVzdGlvbicsXHJcblx0cXVvdGU6ICdvY3RpY29uIG9jdGljb24tcXVvdGUnLFxyXG5cdCdyYWRpby10b3dlcic6ICdvY3RpY29uIG9jdGljb24tcmFkaW8tdG93ZXInLFxyXG5cdCdyZXBvLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1kZWxldGUnLFxyXG5cdHJlcG86ICdvY3RpY29uIG9jdGljb24tcmVwbycsXHJcblx0J3JlcG8tY2xvbmUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tY2xvbmUnLFxyXG5cdCdyZXBvLWZvcmNlLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9yY2UtcHVzaCcsXHJcblx0J2dpc3QtZm9yayc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1mb3JrJyxcclxuXHQncmVwby1mb3JrZWQnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9ya2VkJyxcclxuXHQncmVwby1wdWxsJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXB1bGwnLFxyXG5cdCdyZXBvLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tcHVzaCcsXHJcblx0cm9ja2V0OiAnb2N0aWNvbiBvY3RpY29uLXJvY2tldCcsXHJcblx0cnNzOiAnb2N0aWNvbiBvY3RpY29uLXJzcycsXHJcblx0cnVieTogJ29jdGljb24gb2N0aWNvbi1ydWJ5JyxcclxuXHQnc2NyZWVuLWZ1bGwnOiAnb2N0aWNvbiBvY3RpY29uLXNjcmVlbi1mdWxsJyxcclxuXHQnc2NyZWVuLW5vcm1hbCc6ICdvY3RpY29uIG9jdGljb24tc2NyZWVuLW5vcm1hbCcsXHJcblx0J3NlYXJjaC1zYXZlJzogJ29jdGljb24gb2N0aWNvbi1zZWFyY2gtc2F2ZScsXHJcblx0c2VhcmNoOiAnb2N0aWNvbiBvY3RpY29uLXNlYXJjaCcsXHJcblx0c2VydmVyOiAnb2N0aWNvbiBvY3RpY29uLXNlcnZlcicsXHJcblx0c2V0dGluZ3M6ICdvY3RpY29uIG9jdGljb24tc2V0dGluZ3MnLFxyXG5cdHNoaWVsZDogJ29jdGljb24gb2N0aWNvbi1zaGllbGQnLFxyXG5cdCdsb2ctaW4nOiAnb2N0aWNvbiBvY3RpY29uLWxvZy1pbicsXHJcblx0J3NpZ24taW4nOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24taW4nLFxyXG5cdCdsb2ctb3V0JzogJ29jdGljb24gb2N0aWNvbi1sb2ctb3V0JyxcclxuXHQnc2lnbi1vdXQnOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24tb3V0JyxcclxuXHRzcXVpcnJlbDogJ29jdGljb24gb2N0aWNvbi1zcXVpcnJlbCcsXHJcblx0J3N0YXItYWRkJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWFkZCcsXHJcblx0J3N0YXItZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWRlbGV0ZScsXHJcblx0c3RhcjogJ29jdGljb24gb2N0aWNvbi1zdGFyJyxcclxuXHRzdG9wOiAnb2N0aWNvbiBvY3RpY29uLXN0b3AnLFxyXG5cdCdyZXBvLXN5bmMnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tc3luYycsXHJcblx0c3luYzogJ29jdGljb24gb2N0aWNvbi1zeW5jJyxcclxuXHQndGFnLXJlbW92ZSc6ICdvY3RpY29uIG9jdGljb24tdGFnLXJlbW92ZScsXHJcblx0J3RhZy1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXRhZy1hZGQnLFxyXG5cdHRhZzogJ29jdGljb24gb2N0aWNvbi10YWcnLFxyXG5cdHRlbGVzY29wZTogJ29jdGljb24gb2N0aWNvbi10ZWxlc2NvcGUnLFxyXG5cdHRlcm1pbmFsOiAnb2N0aWNvbiBvY3RpY29uLXRlcm1pbmFsJyxcclxuXHQndGhyZWUtYmFycyc6ICdvY3RpY29uIG9jdGljb24tdGhyZWUtYmFycycsXHJcblx0dGh1bWJzZG93bjogJ29jdGljb24gb2N0aWNvbi10aHVtYnNkb3duJyxcclxuXHR0aHVtYnN1cDogJ29jdGljb24gb2N0aWNvbi10aHVtYnN1cCcsXHJcblx0dG9vbHM6ICdvY3RpY29uIG9jdGljb24tdG9vbHMnLFxyXG5cdHRyYXNoY2FuOiAnb2N0aWNvbiBvY3RpY29uLXRyYXNoY2FuJyxcclxuXHQndHJpYW5nbGUtZG93bic6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtZG93bicsXHJcblx0J3RyaWFuZ2xlLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLWxlZnQnLFxyXG5cdCd0cmlhbmdsZS1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtcmlnaHQnLFxyXG5cdCd0cmlhbmdsZS11cCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtdXAnLFxyXG5cdHVuZm9sZDogJ29jdGljb24gb2N0aWNvbi11bmZvbGQnLFxyXG5cdHVubXV0ZTogJ29jdGljb24gb2N0aWNvbi11bm11dGUnLFxyXG5cdHZlcnNpb25zOiAnb2N0aWNvbiBvY3RpY29uLXZlcnNpb25zJyxcclxuXHR3YXRjaDogJ29jdGljb24gb2N0aWNvbi13YXRjaCcsXHJcblx0J3JlbW92ZS1jbG9zZSc6ICdvY3RpY29uIG9jdGljb24tcmVtb3ZlLWNsb3NlJyxcclxuXHR4OiAnb2N0aWNvbiBvY3RpY29uLXgnLFxyXG5cdHphcDogJ29jdGljb24gb2N0aWNvbi16YXAnLFxyXG59O1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmdseXBoLnNpemUuc21hbGwsXHJcblx0bWVkaXVtOiB0aGVtZS5nbHlwaC5zaXplLm1lZGl1bSxcclxuXHRsYXJnZTogdGhlbWUuZ2x5cGguc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEdseXBoXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbYGNvbG9yX18ke2NvbG9yfWBdID0ge1xyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhzaXplcykuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbYHNpemVfXyR7c2l6ZX1gXSA9IHtcclxuXHRcdGZvbnRTaXplOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGdseXBoOiB7fSxcclxuXHJcblx0Ly8gQ29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxuXHJcblx0Ly8gU2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNvbnN0IFdJRFRIUyA9IHtcclxuXHQnb25lLXdob2xlJzogJzEwMCUnLFxyXG5cdCdvbmUtaGFsZic6ICc1MCUnLFxyXG5cdCdvbmUtdGhpcmQnOiAnMzMuMzMlJyxcclxuXHQndHdvLXRoaXJkcyc6ICc2Ni42NiUnLFxyXG5cdCdvbmUtcXVhcnRlcic6ICcyNSUnLFxyXG5cdCd0aHJlZS1xdWFydGVycyc6ICc3NSUnLFxyXG5cclxuXHQnb25lLWZpZnRoJzogJzIwJScsXHJcblx0J3R3by1maWZ0aHMnOiAnNDAlJyxcclxuXHQndGhyZWUtZmlmdGhzJzogJzYwJScsXHJcblx0J2ZvdXItZmlmdGhzJzogJzgwJScsXHJcblxyXG5cdCdvbmUtc2l4dGgnOiAnMTYuNjYlJyxcclxuXHQnZml2ZS1zaXh0aHMnOiAnODMuMzMlJyxcclxufTtcclxuXHJcbmNvbnN0IEdyaWRDb2wgPSAocHJvcHMsIGNvbnRleHQpID0+IHtcclxuXHRjb25zdCBndXR0ZXIgPSBwcm9wcy5ndXR0ZXIgfHwgY29udGV4dC5ndXR0ZXI7XHJcblx0Y29uc3QgeHNtYWxsID0gcHJvcHMueHNtYWxsIHx8IGNvbnRleHQueHNtYWxsO1xyXG5cdGNvbnN0IHNtYWxsID0gcHJvcHMuc21hbGwgfHwgY29udGV4dC5zbWFsbDtcclxuXHRjb25zdCBtZWRpdW0gPSBwcm9wcy5tZWRpdW0gfHwgY29udGV4dC5tZWRpdW07XHJcblx0Y29uc3QgbGFyZ2UgPSBwcm9wcy5sYXJnZSB8fCBjb250ZXh0LmxhcmdlO1xyXG5cclxuXHRjb25zdCBjbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzWyd4c21hbGwtJyArIHhzbWFsbF0sXHJcblx0XHRjbGFzc2VzWydzbWFsbC0nICsgc21hbGxdLFxyXG5cdFx0Y2xhc3Nlc1snbWVkaXVtLScgKyBtZWRpdW1dLFxyXG5cdFx0Y2xhc3Nlc1snbGFyZ2UtJyArIGxhcmdlXVxyXG5cdCk7XHJcblxyXG5cdGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0ke3Byb3BzLmNsYXNzTmFtZSA/ICgnICcgKyBwcm9wcy5jbGFzc05hbWUpIDogJyd9YDtcclxuXHRjb25zdCBjb21wb25lbnRTdHlsZXMgPSBndXR0ZXIgPyB7XHJcblx0XHRwYWRkaW5nTGVmdDogZ3V0dGVyIC8gMixcclxuXHRcdHBhZGRpbmdSaWdodDogZ3V0dGVyIC8gMixcclxuXHR9IDoge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0e3Byb3BzLmNoaWxkcmVufVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkdyaWRDb2wuY29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZENvbC5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ3hzbWFsbCcsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnc21hbGwnLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ21lZGl1bScsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnbGFyZ2UnLCBXSURUSFMpLFxyXG59O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbmZ1bmN0aW9uIHByZXBhcmVXaWR0aHMgKHByZWZpeCwgb2JqKSB7XHJcblx0bGV0IGNsYXNzZXMgPSB7fTtcclxuXHRzd2l0Y2ggKHByZWZpeCkge1xyXG5cdFx0Y2FzZSAnc21hbGwnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0UG9ydHJhaXRNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdtZWRpdW0nOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbGFyZ2UnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQuZGVza3RvcE1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiBjbGFzc2VzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29sO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5jbGFzcyBHcmlkUm93IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z3V0dGVyOiB0aGlzLnByb3BzLmd1dHRlcixcclxuXHRcdFx0eHNtYWxsOiB0aGlzLnByb3BzLnhzbWFsbCxcclxuXHRcdFx0c21hbGw6IHRoaXMucHJvcHMuc21hbGwsXHJcblx0XHRcdG1lZGl1bTogdGhpcy5wcm9wcy5tZWRpdW0sXHJcblx0XHRcdGxhcmdlOiB0aGlzLnByb3BzLmxhcmdlLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgZ3V0dGVyLCBzdHlsZXMgPSB7fSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBgJHtjc3MoY2xhc3Nlcy5ncmlkKX0ke2NsYXNzTmFtZSA/ICgnICcgKyBjbGFzc05hbWUpIDogJyd9YDtcclxuXHRcdGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IE9iamVjdC5hc3NpZ24oc3R5bGVzLCB7XHJcblx0XHRcdG1hcmdpbkxlZnQ6IGd1dHRlciAvIC0yLFxyXG5cdFx0XHRtYXJnaW5SaWdodDogZ3V0dGVyIC8gLTIsXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5HcmlkUm93LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZFJvdy5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkUm93LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRndXR0ZXI6IDAsXHJcblx0eHNtYWxsOiAnb25lLXdob2xlJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z3JpZDoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleFdyYXA6ICd3cmFwJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkUm93O1xyXG4iLCJpbXBvcnQgQ29sIGZyb20gJy4uL0dyaWRDb2wnO1xyXG5pbXBvcnQgUm93IGZyb20gJy4uL0dyaWRSb3cnO1xyXG5cclxuZXhwb3J0IHsgQ29sLCBSb3cgfTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG4vLyBOT1RFOiBJbmxpbmUgR3JvdXAgU2VjdGlvbiBhY2NlcHRzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cFNlY3Rpb24gKHtcclxuXHRhY3RpdmUsXHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb250aWd1b3VzLFxyXG5cdGdyb3csXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIGV2YWx1YXRlIHBvc2l0aW9uXHJcblx0Y29uc3Qgc2VwYXJhdGUgPSBwb3NpdGlvbiA9PT0gJ2xhc3QnIHx8IHBvc2l0aW9uID09PSAnbWlkZGxlJztcclxuXHJcblx0Ly8gQSBgY29udGlndW91c2Agc2VjdGlvbiBtdXN0IG1hbmlwdWxhdGUgaXQncyBjaGlsZCBkaXJlY3RseVxyXG5cdC8vIEEgc2VwYXJhdGUgKGRlZmF1bHQpIHNlY3Rpb24ganVzdCB3cmFwcyB0aGUgY2hpbGRcclxuXHRyZXR1cm4gY29udGlndW91cyA/IGNsb25lRWxlbWVudChjaGlsZHJlbiwge1xyXG5cdFx0YXBocm9kaXRlU3R5bGVzOiBbXHJcblx0XHRcdGNsYXNzZXMuY29udGlndW91cyxcclxuXHRcdFx0Y2xhc3Nlc1snY29udGlndW91c19fJyArIHBvc2l0aW9uXSxcclxuXHRcdFx0YWN0aXZlID8gY2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHRncm93ID8gY2xhc3Nlcy5ncm93IDogbnVsbCxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XSxcclxuXHRcdC4uLnByb3BzLFxyXG5cdH0pIDogKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhcclxuXHRcdFx0ISFncm93ICYmIGNsYXNzZXMuZ3JvdyxcclxuXHRcdFx0ISFzZXBhcmF0ZSAmJiBjbGFzc2VzLnNlcGFyYXRlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCl9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5JbmxpbmVHcm91cFNlY3Rpb24ucHJvcFR5cGVzID0ge1xyXG5cdGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsIC8vIGJ1dHRvbnMgb25seVxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxyXG5cdGNvbnRpZ3VvdXM6IFByb3BUeXBlcy5ib29sLFxyXG5cdGdyb3c6IFByb3BUeXBlcy5ib29sLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydmaXJzdCcsICdsYXN0JywgJ21pZGRsZScsICdvbmx5J10pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVHcm91cFNlY3Rpb247XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBJbmxpbmUgR3JvdXA6IFNlY3Rpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBUYWtlcyBvbmx5IEZvcm1JbnB1dCBhbmQgQnV0dG9uIGFzIGNoaWxkcmVuLCByZW5kZXJpbmcgdGhlbSBhcyBhXHJcbi8vIHRpZHkgaW5saW5lIGFycmF5XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Ly8gcHVsbCBhY3RpdmUgZWxlbWVudHMgdXBcclxuXHRhY3RpdmU6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHN0cmV0Y2ggdG8gZmlsbCBhdmFpbGFibGUgd2lkdGhcclxuXHRncm93OiB7XHJcblx0XHRmbGV4OiAnMSAxIDAnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlcGFyYXRlIGFwcGxpY2FibGUgbm9uLWNvbnRpZ3VvdXMgZWxlbWVudHNcclxuXHRzZXBhcmF0ZToge1xyXG5cdFx0cGFkZGluZ0xlZnQ6ICcwLjc1ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnRpZ3VvdXM6IG1hbmlwdWxhdGUgY2hpbGRyZW4gZGlyZWN0bHlcclxuXHJcblx0Ly8gcHVsbCBmb2N1c2VkIGNvbnRpZ3VvdXMgZWxlbWVudHMgdXBcclxuXHRjb250aWd1b3VzOiB7XHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0ekluZGV4OiAxLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBwb3NpdGlvblxyXG5cdGNvbnRpZ3VvdXNfX21pZGRsZToge1xyXG5cdFx0Ym9yZGVyUmFkaXVzOiAwLFxyXG5cdFx0bWFyZ2luTGVmdDogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoICogLTEsXHJcblx0fSxcclxuXHRjb250aWd1b3VzX19maXJzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdH0sXHJcblx0Y29udGlndW91c19fbGFzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdG1hcmdpbkxlZnQ6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCAqIC0xLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuLCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyBOT1RFOiBvbmx5IGFjY2VwdHMgSW5saW5lR3JvdXBTZWN0aW9uIGFzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRibG9jayxcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y29udGlndW91cyxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gcHJlcGFyZSBncm91cCBjbGFzc05hbWVcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdyb3VwLFxyXG5cdFx0ISFibG9jayAmJiBjbGFzc2VzLmJsb2NrLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBjb252ZXJ0IGNoaWxkcmVuIHRvIGFuIGFycmF5IGFuZCBmaWx0ZXIgb3V0IGZhbHNleSB2YWx1ZXNcclxuXHRjb25zdCBidXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikuZmlsdGVyKGkgPT4gaSk7XHJcblxyXG5cdC8vIG5vcm1hbGl6ZSB0aGUgY291bnRcclxuXHRjb25zdCBjb3VudCA9IGJ1dHRvbnMubGVuZ3RoIC0gMTtcclxuXHJcblx0Ly8gY2xvbmUgY2hpbGRyZW4gYW5kIGFwcGx5IGNsYXNzTmFtZXMgdGhhdCBhcGhyb2RpdGUgY2FuIHRhcmdldFxyXG5cdHByb3BzLmNoaWxkcmVuID0gYnV0dG9ucy5tYXAoKGMsIGlkeCkgPT4ge1xyXG5cdFx0aWYgKCFjKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpc09ubHlDaGlsZCA9ICFjb3VudDtcclxuXHRcdGNvbnN0IGlzRmlyc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IDA7XHJcblx0XHRjb25zdCBpc0xhc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IGNvdW50O1xyXG5cdFx0Y29uc3QgaXNNaWRkbGVDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiAhaXNGaXJzdENoaWxkICYmICFpc0xhc3RDaGlsZDtcclxuXHJcblx0XHRsZXQgcG9zaXRpb247XHJcblx0XHRpZiAoaXNPbmx5Q2hpbGQpIHBvc2l0aW9uID0gJ29ubHknO1xyXG5cdFx0aWYgKGlzRmlyc3RDaGlsZCkgcG9zaXRpb24gPSAnZmlyc3QnO1xyXG5cdFx0aWYgKGlzTGFzdENoaWxkKSBwb3NpdGlvbiA9ICdsYXN0JztcclxuXHRcdGlmIChpc01pZGRsZUNoaWxkKSBwb3NpdGlvbiA9ICdtaWRkbGUnO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0XHRjb250aWd1b3VzOiBjb250aWd1b3VzLFxyXG5cdFx0XHRwb3NpdGlvbixcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuSW5saW5lR3JvdXAucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0YmxvY2s6IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0Y29udGlndW91czogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbklubGluZUdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRncm91cDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1mbGV4JyxcclxuXHR9LFxyXG5cdGJsb2NrOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5saW5lR3JvdXA7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIExhYmVsbGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRpbmxpbmUsXHJcblx0bGFiZWwsXHJcblx0dGl0bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGxhYmVsQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy53cmFwcGVyLFxyXG5cdFx0aW5saW5lICYmIGNsYXNzZXMud3JhcHBlcl9faW5saW5lLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxsYWJlbCB0aXRsZT17dGl0bGV9IGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9PlxyXG5cdFx0XHQ8aW5wdXQgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRyb2wpfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmxhYmVsKX0+e2xhYmVsfTwvc3Bhbj5cclxuXHRcdDwvbGFiZWw+XHJcblx0KTtcclxufTtcclxuXHJcbkxhYmVsbGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0aW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR0eXBlOiBQcm9wVHlwZXMub25lT2YoWydjaGVja2JveCcsICdyYWRpbyddKS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbGxlZENvbnRyb2w7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdH0sXHJcblx0d3JhcHBlcl9faW5saW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjaGVja2JveCBvciByYWRpb1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vU3Bpbm5lcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uICh7IGNoaWxkcmVuLCBsb2FkaW5nLCAuLi5wcm9wcyB9KSB7XHJcblx0Ly8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHZhcmlhbnQgZm9yIHRoZSBzcGlubmVyLFxyXG5cdC8vIGZpbGwgaXMgdGhlIGRlZmF1bHQgdmFyaWFudCBvbiBCdXR0b25cclxuXHRjb25zdCB2YXJpYW50ID0gcHJvcHMudmFyaWFudCB8fCAnZmlsbCc7XHJcblxyXG5cdC8vIGRldGVybWluZSB0aGUgY29ycmVjdCBjb2xvciBmb3IgdGhlIHNwaW5uZXIsXHJcblx0Ly8gY2FuY2VsIGFuZCBkZWxldGUgYWxpYXMgdG8gXCJkYW5nZXJcIlxyXG5cdGxldCBjb2xvcjtcclxuXHRpZiAocHJvcHMuY29sb3IgPT09ICdjYW5jZWwnIHx8IHByb3BzLmNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0Ly8gbWVyZ2UgYWxsIHRoZSB2YXJpYW50L2NvbG9yIHRvZ2V0aGVyXHJcblx0Y29uc3QgZm9ybWF0dGVkQ29sb3IgPSB2YXJpYW50ID09PSAnZmlsbCcgJiYgcHJvcHMuY29sb3IgIT09ICdkZWZhdWx0J1xyXG5cdFx0PyAnaW52ZXJ0ZWQnXHJcblx0XHQ6IGNvbG9yO1xyXG5cclxuXHQvLyByZW5kZXIgdGhlIHNwaW5uZXIgaWYgcmVxdWlyZWRcclxuXHRjb25zdCBzcGlubmVyID0gbG9hZGluZyAmJiAoXHJcblx0XHQ8U3Bpbm5lclxyXG5cdFx0XHRzaXplPVwic21hbGxcIlxyXG5cdFx0XHRjb2xvcj17Zm9ybWF0dGVkQ29sb3J9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdC8vIHNsaWRlIHRoZSBzcGlubmVyIGluIGFuZCBvdXQgb2Ygdmlld1xyXG5cdGNvbnN0IHNwaW5uZXJTdHlsZXMgPSB7XHJcblx0XHR3aWR0aDogbG9hZGluZ1xyXG5cdFx0XHQ/ICh0aGVtZS5zcGlubmVyLnNpemUuc21hbGwgKiA1ICsgdGhlbWUuc3BhY2luZy5zbWFsbClcclxuXHRcdFx0OiAwLFxyXG5cdH07XHJcblxyXG5cdC8vIHJlbmRlciBhbGwgdGhhdCBzaGl0XHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5zcGlubmVyKX0gc3R5bGU9e3NwaW5uZXJTdHlsZXN9PlxyXG5cdFx0XHRcdHtzcGlubmVyfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG5Mb2FkaW5nQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuTG9hZGluZ0J1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0bG9hZGluZzogZmFsc2UsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHNwaW5uZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dEFsaWduOiAnbGVmdCcsXHJcblx0XHR0cmFuc2l0aW9uOiAnd2lkdGggMjAwbXMgZWFzZS1vdXQnLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9hZGluZ0J1dHRvbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsQm9keSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXZcclxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5ib2R5LCBjbGFzc05hbWUpfVxyXG5cdFx0XHR7Li4ucHJvcHN9XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGJvZHk6IHtcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5Lmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkudmVydGljYWwsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxCb2R5O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xuaW1wb3J0IFNjcm9sbExvY2sgZnJvbSAnLi4vU2Nyb2xsTG9jayc7XG5pbXBvcnQgUG9ydGFsIGZyb20gJy4uL1BvcnRhbCc7XG5cbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XG5cbmNvbnN0IGNhblVzZURvbSA9ICEhKFxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuXHQmJiB3aW5kb3cuZG9jdW1lbnRcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2sgPSB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQuYmluZCh0aGlzKTtcblx0fVxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvbkNsb3NlOiB0aGlzLnByb3BzLm9uQ2xvc2UsXG5cdFx0fTtcblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRpZiAoIWNhblVzZURvbSkgcmV0dXJuO1xuXG5cdFx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHRcdGlmICghbmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNZXRob2RzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRoYW5kbGVCYWNrZHJvcENsaWNrIChlKSB7XG5cdFx0aWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuY29udGFpbmVyKSByZXR1cm47XG5cblx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJlcnNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRiYWNrZHJvcENsb3Nlc01vZGFsLFxuXHRcdFx0Y2hpbGRyZW4sXG5cdFx0XHRpc09wZW4sXG5cdFx0XHR3aWR0aCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghaXNPcGVuKSByZXR1cm4gPHNwYW4ga2V5PVwiY2xvc2VkXCIgLz47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdlxuXHRcdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9XG5cdFx0XHRcdGtleT1cIm9wZW5cIlxuXHRcdFx0XHRyZWY9XCJjb250YWluZXJcIlxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0XHRvblRvdWNoRW5kPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZGlhbG9nKX0gc3R5bGU9e3sgd2lkdGggfX0gZGF0YS1zY3JlZW4taWQ9XCJtb2RhbC1kaWFsb2dcIj5cblx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8U2Nyb2xsTG9jayAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8UG9ydGFsPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn07XG5cbk1vZGFsRGlhbG9nLnByb3BUeXBlcyA9IHtcblx0YmFja2Ryb3BDbG9zZXNNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpc09wZW46IFByb3BUeXBlcy5ib29sLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5Nb2RhbERpYWxvZy5kZWZhdWx0UHJvcHMgPSB7XG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXG5cdHdpZHRoOiA3NjgsXG59O1xuTW9kYWxEaWFsb2cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBjbGFzc2VzID0ge1xuXHRjb250YWluZXI6IHtcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1vZGFsLmJhY2tncm91bmQsXG5cdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHRvcDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdHpJbmRleDogdGhlbWUubW9kYWwuekluZGV4LFxuXHR9LFxuXHRkaWFsb2c6IHtcblx0XHRtYXhIZWlnaHQ6ICc5MCUnLFxuXHRcdG92ZXJmbG93OiAnc2Nyb2xsJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy52ZXJ0aWNhbCxcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1RvcDogJzVweCcsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbERpYWxvZztcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEZvb3RlciAoe1xyXG5cdGFsaWduLFxyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmZvb3RlciwgY2xhc3Nlc1snYWxpZ25fXycgKyBhbGlnbl0sIGNsYXNzTmFtZSl9IC8+XHJcblx0KTtcclxufTtcclxuXHJcbk1vZGFsRm9vdGVyLnByb3BUeXBlcyA9IHtcclxuXHRhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxGb290ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGFsaWduOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGZvb3Rlcjoge1xyXG5cdFx0Ym9yZGVyVG9wOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gYWxpZ25tZW50XHJcblx0YWxpZ25fX2xlZnQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXHJcblx0fSxcclxuXHRhbGlnbl9fY2VudGVyOiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxuXHRhbGlnbl9fcmlnaHQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsRm9vdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgR2x5cGhCdXR0b24gZnJvbSAnLi4vR2x5cGhCdXR0b24nO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxIZWFkZXIgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0c2hvd0Nsb3NlQnV0dG9uLFxyXG5cdHRleHQsXHJcblx0Li4ucHJvcHNcclxufSwge1xyXG5cdG9uQ2xvc2UsXHJcbn0pIHtcclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgdGV4dCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogTW9kYWxIZWFkZXIgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgdGV4dGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkZXIsIGNsYXNzTmFtZSl9PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZ3Jvdyl9PlxyXG5cdFx0XHRcdHt0ZXh0ID8gKFxyXG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMudGV4dCl9PlxyXG5cdFx0XHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0XHRcdDwvaDQ+XHJcblx0XHRcdFx0KSA6IGNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0eyEhb25DbG9zZSAmJiBzaG93Q2xvc2VCdXR0b24gJiYgKFxyXG5cdFx0XHRcdDxHbHlwaEJ1dHRvblxyXG5cdFx0XHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmNsb3NlfVxyXG5cdFx0XHRcdFx0Y29sb3I9XCJjYW5jZWxcIlxyXG5cdFx0XHRcdFx0Z2x5cGg9XCJ4XCJcclxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XHJcblx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEhlYWRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxIZWFkZXIuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGhlYWRlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRib3JkZXJCb3R0b206IGAycHggc29saWQgJHt0aGVtZS5jb2xvci5ncmF5MTB9YCxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHR9LFxyXG5cclxuXHQvLyBmaWxsIHNwYWNlIHRvIHB1c2ggdGhlIGNsb3NlIGJ1dHRvbiByaWdodFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRpdGxlIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdFx0Zm9udFNpemU6IDE4LFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogMCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEhlYWRlcjtcclxuIiwiaW1wb3J0IEJvZHkgZnJvbSAnLi9ib2R5JztcclxuaW1wb3J0IERpYWxvZyBmcm9tICcuL2RpYWxvZyc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJztcclxuXHJcbmV4cG9ydCB7XHJcblx0Qm9keSxcclxuXHREaWFsb2csXHJcblx0Rm9vdGVyLFxyXG5cdEhlYWRlcixcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyQ291bnQgKCkge1xyXG5cdFx0bGV0IGNvdW50ID0gJyc7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBwYWdlU2l6ZSwgcGx1cmFsLCBzaW5ndWxhciwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAoIXRvdGFsKSB7XHJcblx0XHRcdGNvdW50ID0gJ05vICcgKyAocGx1cmFsIHx8ICdyZWNvcmRzJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRvdGFsID4gcGFnZVNpemUpIHtcclxuXHRcdFx0bGV0IHN0YXJ0ID0gKHBhZ2VTaXplICogKGN1cnJlbnRQYWdlIC0gMSkpICsgMTtcclxuXHRcdFx0bGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgcGFnZVNpemUgLSAxLCB0b3RhbCk7XHJcblx0XHRcdGNvdW50ID0gYFNob3dpbmcgJHtzdGFydH0gdG8gJHtlbmR9IG9mICR7dG90YWx9YDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvdW50ID0gJ1Nob3dpbmcgJyArIHRvdGFsO1xyXG5cdFx0XHRpZiAodG90YWwgPiAxICYmIHBsdXJhbCkge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHBsdXJhbDtcclxuXHRcdFx0fSBlbHNlIGlmICh0b3RhbCA9PT0gMSAmJiBzaW5ndWxhcikge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHNpbmd1bGFyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY291bnQpfSBkYXRhLWUyZS1wYWdpbmF0aW9uLWNvdW50Pntjb3VudH08L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlclBhZ2VzICgpIHtcclxuXHRcdGNvbnN0IHsgY3VycmVudFBhZ2UsIGxpbWl0LCBvblBhZ2VTZWxlY3QsIHBhZ2VTaXplLCB0b3RhbCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAodG90YWwgPD0gcGFnZVNpemUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGxldCBwYWdlcyA9IFtdO1xyXG5cdFx0bGV0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XHJcblx0XHRsZXQgbWluUGFnZSA9IDE7XHJcblx0XHRsZXQgbWF4UGFnZSA9IHRvdGFsUGFnZXM7XHJcblxyXG5cdFx0aWYgKGxpbWl0ICYmIChsaW1pdCA8IHRvdGFsUGFnZXMpKSB7XHJcblx0XHRcdGxldCByaWdodExpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCAvIDIpO1xyXG5cdFx0XHRsZXQgbGVmdExpbWl0ID0gcmlnaHRMaW1pdCArIChsaW1pdCAlIDIpIC0gMTtcclxuXHRcdFx0bWluUGFnZSA9IGN1cnJlbnRQYWdlIC0gbGVmdExpbWl0O1xyXG5cdFx0XHRtYXhQYWdlID0gY3VycmVudFBhZ2UgKyByaWdodExpbWl0O1xyXG5cclxuXHRcdFx0aWYgKG1pblBhZ2UgPCAxKSB7XHJcblx0XHRcdFx0bWF4UGFnZSA9IGxpbWl0O1xyXG5cdFx0XHRcdG1pblBhZ2UgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtYXhQYWdlID4gdG90YWxQYWdlcykge1xyXG5cdFx0XHRcdG1pblBhZ2UgPSB0b3RhbFBhZ2VzIC0gbGltaXQgKyAxO1xyXG5cdFx0XHRcdG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAobWluUGFnZSA+IDEpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX3N0YXJ0XCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KDEpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHBhZ2UgPSBtaW5QYWdlOyBwYWdlIDw9IG1heFBhZ2U7IHBhZ2UrKykge1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWQgPSAocGFnZSA9PT0gY3VycmVudFBhZ2UpO1xyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9eydwYWdlXycgKyBwYWdlfSBzZWxlY3RlZD17c2VsZWN0ZWR9IG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdChwYWdlKX0+e3BhZ2V9PC9QYWdlPik7XHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgKi9cclxuXHRcdH1cclxuXHRcdGlmIChtYXhQYWdlIDwgdG90YWxQYWdlcykge1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT1cInBhZ2VfZW5kXCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KHRvdGFsUGFnZXMpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5saXN0KX0+XHJcblx0XHRcdFx0e3BhZ2VzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jb250YWluZXIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb3VudCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclBhZ2VzKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMmVtJyxcclxuXHR9LFxyXG5cdGNvdW50OiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMWVtJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcblx0bGlzdDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxuUGFnaW5hdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGN1cnJlbnRQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0b25QYWdlU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdHBsdXJhbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaW5ndWxhcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHR0b3RhbDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdpbmF0aW9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gUGFnZSAoe1xyXG5cdGRpc2FibGVkLFxyXG5cdHNlbGVjdGVkLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLnBhZ2UsXHJcblx0XHQhIWRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsXHJcblx0XHQhIXNlbGVjdGVkICYmIGNsYXNzZXMuc2VsZWN0ZWRcclxuXHQpO1xyXG5cdHJldHVybiAoXHJcblx0XHQ8YnV0dG9uIHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxuUGFnZS5wcm9wVHlwZXMgPSB7XHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0c2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuY29sb3IsXHJcblx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0ekluZGV4OiAyLFxyXG59O1xyXG5jb25zdCBwc2V1ZG9TdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuY29sb3IsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRwYWdlOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsIC8vIENvbGxhcHNlIHdoaXRlLXNwYWNlXHJcblx0XHRtYXJnaW5SaWdodDogJzAuMjVlbScsXHJcblx0XHRwYWRkaW5nOiAnMCAuN2VtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQvLyBoYW5kbGUgaG92ZXIgYW5kIGZvY3VzXHJcblx0XHQnOmhvdmVyJzogcHNldWRvU3R5bGUsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0ZWQgcGFnZVxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHQuLi5zZWxlY3RlZFN0eWxlLFxyXG5cclxuXHRcdCc6aG92ZXInOiBzZWxlY3RlZFN0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHNlbGVjdGVkU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gZGlzYWJsZWQgcGFnZVxyXG5cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuY29sb3IsXHJcblx0XHRjdXJzb3I6ICdkZWZhdWx0JyxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcclxuIiwiaW1wb3J0IHsgQ2hpbGRyZW4sIENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gUGFzcyB0aGUgTGlnaHRib3ggY29udGV4dCB0aHJvdWdoIHRvIHRoZSBQb3J0YWwncyBkZXNjZW5kZW50c1xyXG4vLyBTdGFja092ZXJmbG93IGRpc2N1c3Npb24gaHR0cDovL2dvby5nbC9vY2xySjlcclxuXHJcbmNsYXNzIFBhc3NDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29udGV4dDtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xyXG5cdH1cclxufTtcclxuXHJcblBhc3NDb250ZXh0LnByb3BUeXBlcyA9IHtcclxuXHRjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbn07XHJcblBhc3NDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFzc0NvbnRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBhc3NDb250ZXh0IGZyb20gJy4uL1Bhc3NDb250ZXh0JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBudWxsO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHQvLyBBbmltYXRlIGZhZGUgb24gbW91bnQvdW5tb3VudFxyXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAyMDA7XHJcblx0XHRjb25zdCBzdHlsZXMgPSBgXHJcblx0XHRcdFx0LmZhZGUtZW50ZXIgeyBvcGFjaXR5OiAwLjAxOyB9XHJcblx0XHRcdFx0LmZhZGUtZW50ZXIuZmFkZS1lbnRlci1hY3RpdmUgeyBvcGFjaXR5OiAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZSB7IG9wYWNpdHk6IDE7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZS5mYWRlLWxlYXZlLWFjdGl2ZSB7IG9wYWNpdHk6IDAuMDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxyXG5cdFx0YDtcclxuXHRcdHJlbmRlcihcclxuXHRcdFx0PFBhc3NDb250ZXh0IGNvbnRleHQ9e3RoaXMuY29udGV4dH0+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxzdHlsZT57c3R5bGVzfTwvc3R5bGU+XHJcblx0XHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0XHRjb21wb25lbnQ9XCJkaXZcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtkdXJhdGlvbn1cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHsuLi50aGlzLnByb3BzfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9QYXNzQ29udGV4dD4sXHJcblx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxyXG5cdFx0KTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5Qb3J0YWwuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBVc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBhbmQgc3RhdGUgaW5zdGVhZCBvZiBDU1MgbWVkaWEgYnJlYWtwb2ludHNcclxuLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHJlbmRlciBudWxsIHJhdGhlciB0aGFuIGFuIGVtcHR5IHNwYW4uIEFsbG93aW5nIGZvclxyXG4vLyBDU1MgcHNldWRvIGNsYXNzZXMgbGlrZSA6b25seS1jaGlsZCB0byBiZWhhdmUgYXMgZXhwZWN0ZWQuXHJcblxyXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3aW5kb3cgKyBkb2N1bWVudFxyXG5jb25zdCBjYW5Vc2VET00gPSAhIShcclxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxyXG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XHJcbik7XHJcblxyXG5jbGFzcyBSZXNwb25zaXZlVGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuc3RhdGUgPSB7XHJcblx0XHRcdHdpbmRvd1dpZHRoOiBjYW5Vc2VET00gPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDAsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmIChjYW5Vc2VET00pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuXHRcdH1cclxuXHR9XHJcblx0aGFuZGxlUmVzaXplICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRoaWRkZW5MRyxcclxuXHRcdFx0aGlkZGVuTUQsXHJcblx0XHRcdGhpZGRlblNNLFxyXG5cdFx0XHRoaWRkZW5YUyxcclxuXHRcdFx0dmlzaWJsZUxHLFxyXG5cdFx0XHR2aXNpYmxlTUQsXHJcblx0XHRcdHZpc2libGVTTSxcclxuXHRcdFx0dmlzaWJsZVhTLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IHdpbmRvd1dpZHRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cclxuXHRcdC8vIHNldCB0ZXh0IHZhbHVlIGZyb20gYnJlYWtwb2ludDsgYXR0ZW1wdCBYUyAtLT4gTEdcclxuXHRcdGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSkge1xyXG5cdFx0XHR0ZXh0ID0gdmlzaWJsZVhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0KSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCB2aXNpYmxlU00gfHwgaGlkZGVuTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlKSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCBoaWRkZW5TTSB8fCB2aXNpYmxlTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgaGlkZGVuTUQgfHwgdmlzaWJsZUxHO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0ZXh0ID8gPENvbXBvbmVudCB7Li4ucHJvcHN9Pnt0ZXh0fTwvQ29tcG9uZW50PiA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxuUmVzcG9uc2l2ZVRleHQucHJvcFR5cGVzID0ge1xyXG5cdGhpZGRlbkxHOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlbk1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblhTOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVMRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTUQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZVNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVYUzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuUmVzcG9uc2l2ZVRleHQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zaXZlVGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmZ1bmN0aW9uIFNjcmVlblJlYWRlck9ubHkgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuc3JPbmx5LCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHNwYW4gey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3JPbmx5OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUmVhZGVyT25seTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsTG9jayBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9ja0NvdW50ID0gMDtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubG9ja0NvdW50Kys7XHJcblx0XHRpZiAodGhpcy5sb2NrQ291bnQgPiAxKSByZXR1cm47XHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5sb2NrQ291bnQgPT09IDApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudC0tO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMCkgcmV0dXJuOyAvLyBTdGlsbCBsb2NrZWRcclxuXHJcblx0XHQvL1x0RklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICcnO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRkZWZhdWx0OiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0ZXJyb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gU2VnbWVudGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjcm9wVGV4dCxcclxuXHRlcXVhbFdpZHRoU2VnbWVudHMsXHJcblx0aW5saW5lLFxyXG5cdG9uQ2hhbmdlLFxyXG5cdG9wdGlvbnMsXHJcblx0dmFsdWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udHJvbCxcclxuXHRcdGlubGluZSA/IGNsYXNzZXMuY29udHJvbF9faW5saW5lIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdHtvcHRpb25zLm1hcCgob3B0KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYnV0dG9uQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRcdFx0XHRvcHQuZGlzYWJsZWQgPyBjbGFzc2VzLmJ1dHRvbl9fZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRcdFx0b3B0LnZhbHVlID09PSB2YWx1ZSA/IGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yXSA6IG51bGwsXHJcblx0XHRcdFx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuYnV0dG9uX19jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHMgPyBjbGFzc2VzLmJ1dHRvbl9fZXF1YWxXaWR0aCA6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2J1dHRvbkNsYXNzTmFtZX1cclxuXHRcdFx0XHRcdFx0a2V5PXtvcHQudmFsdWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eyFvcHQuZGlzYWJsZWQgJiYgKCgpID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRcdFx0dGl0bGU9e2Nyb3BUZXh0ID8gb3B0LmxhYmVsIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9e29wdC5kaXNhYmxlZCA/ICctMScgOiAnJ31cclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSl9XHJcblx0XHQ8L2Rpdj4pO1xyXG59O1xyXG5cclxuY29uc3QgdmFsdWVQcm9wU2hhcGUgPSBbXHJcblx0UHJvcFR5cGVzLmJvb2wsXHJcblx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5dO1xyXG5cclxuU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZW4gYGlubGluZSAmJiBlcXVhbFdpZHRoU2VnbWVudHNgIGNyb3BzIHRvIHRoZSBuZXh0IGxhcmdlc3Qgb3B0aW9uIGxlbmd0aFxyXG5cdGVxdWFsV2lkdGhTZWdtZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIG9ubHkgcmVsZXZhbnQgd2hlbiBgaW5saW5lID09PSBmYWxzZWBcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG5cdFx0fSlcclxuXHQpLmlzUmVxdWlyZWQsXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG59O1xyXG5TZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50ZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2VnbWVudGVkIENvbnRyb2xcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IHBzZXVkb1N0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHBzZXVkb1N0eWxlcyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdGJvcmRlcldpZHRoOiAxLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcwLjRlbScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDEsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDEsXHJcblx0fSxcclxuXHRjb250cm9sX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHJcblx0Ly8gYnV0dG9uc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC4yNWVtJyxcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdFx0bWFyZ2luOiAnMnB4IDFweCcsXHJcblx0XHRwYWRkaW5nOiAnMC4zZW0gMC45ZW0nLFxyXG5cdFx0b3V0bGluZTogMCxcclxuXHJcblx0XHQnOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyB9LFxyXG5cdFx0Jzpmb2N1cyc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6YWN0aXZlJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMSknIH0sXHJcblx0fSxcclxuXHRidXR0b25fX2VxdWFsV2lkdGg6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Nyb3BUZXh0OiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNixcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnaW52ZXJ0ZWQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgU2NyZWVuUmVhZGVyT25seSBmcm9tICcuLi9TY3JlZW5SZWFkZXJPbmx5JztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIFNwaW5uZXIgKHsgY2xhc3NOYW1lLCBzaXplLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNsYXNzZXNbc2l6ZV0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX2ZpcnN0KX1gfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX3NlY29uZCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X190aGlyZCl9YH0gLz5cclxuXHRcdFx0PFNjcmVlblJlYWRlck9ubHk+TG9hZGluZy4uLjwvU2NyZWVuUmVhZGVyT25seT5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5TcGlubmVyLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKGNvbG9ycyksXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKHNpemVzKSxcclxufTtcclxuU3Bpbm5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ21lZGl1bScsXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZSddO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3Bpbm5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbmNvbG9ycy5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3Bpbm5lci5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLnNwaW5uZXIuc2l6ZVtzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIERlY2xhcmUgYW5pbWF0aW9uIGtleWZyYW1lc1xyXG5cclxuY29uc3Qga2V5ZnJhbWVzID0gY29tcG9zZS5rZXlmcmFtZXMoJ3B1bHNlJywge1xyXG5cdCcwJSwgODAlLCAxMDAlJzogeyBvcGFjaXR5OiAwIH0sXHJcblx0JzQwJSc6IHsgb3BhY2l0eTogMSB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAnNWVtJyxcclxuXHR9LFxyXG5cdHNtYWxsOlx0eyBmb250U2l6ZTogNCB9LFxyXG5cdG1lZGl1bTpcdHsgZm9udFNpemU6IDggfSxcclxuXHRsYXJnZTpcdHsgZm9udFNpemU6IDE2IH0sXHJcblxyXG5cdC8vIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHJcblx0Ly8gZG90c1xyXG5cdGRvdDoge1xyXG5cdFx0YW5pbWF0aW9uTmFtZToga2V5ZnJhbWVzLFxyXG5cdFx0YW5pbWF0aW9uRHVyYXRpb246ICcxcycsXHJcblx0XHRhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogJzFlbScsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdHdpZHRoOiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fc2Vjb25kOiB7XHJcblx0XHRhbmltYXRpb25EZWxheTogJzE2MG1zJyxcclxuXHRcdG1hcmdpbkxlZnQ6ICcxZW0nLFxyXG5cdH0sXHJcblx0ZG90X190aGlyZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICczMjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QWxlcnQ6IHJlcXVpcmUoJy4vQWxlcnQnKSxcclxuXHRCbGFua1N0YXRlOiByZXF1aXJlKCcuL0JsYW5rU3RhdGUnKSxcclxuXHRCdXR0b246IHJlcXVpcmUoJy4vQnV0dG9uJyksXHJcblx0Q2VudGVyOiByZXF1aXJlKCcuL0NlbnRlcicpLFxyXG5cdENoaXA6IHJlcXVpcmUoJy4vQ2hpcCcpLFxyXG5cdENvbnRhaW5lcjogcmVxdWlyZSgnLi9Db250YWluZXInKSxcclxuXHREcm9wZG93bkJ1dHRvbjogcmVxdWlyZSgnLi9Ecm9wZG93bkJ1dHRvbicpLFxyXG5cdEZvcm06IHJlcXVpcmUoJy4vRm9ybScpLFxyXG5cdEZvcm1GaWVsZDogcmVxdWlyZSgnLi9Gb3JtRmllbGQnKSxcclxuXHRGb3JtSW5wdXQ6IHJlcXVpcmUoJy4vRm9ybUlucHV0JyksXHJcblx0Rm9ybUxhYmVsOiByZXF1aXJlKCcuL0Zvcm1MYWJlbCcpLFxyXG5cdEZvcm1Ob3RlOiByZXF1aXJlKCcuL0Zvcm1Ob3RlJyksXHJcblx0Rm9ybVNlbGVjdDogcmVxdWlyZSgnLi9Gb3JtU2VsZWN0JyksXHJcblx0R2x5cGg6IHJlcXVpcmUoJy4vR2x5cGgnKSxcclxuXHRHbHlwaEJ1dHRvbjogcmVxdWlyZSgnLi9HbHlwaEJ1dHRvbicpLFxyXG5cdEdseXBoRmllbGQ6IHJlcXVpcmUoJy4vR2x5cGhGaWVsZCcpLFxyXG5cdEdyaWQ6IHJlcXVpcmUoJy4vR3JpZCcpLFxyXG5cdElubGluZUdyb3VwOiByZXF1aXJlKCcuL0lubGluZUdyb3VwJyksXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uOiByZXF1aXJlKCcuL0lubGluZUdyb3VwU2VjdGlvbicpLFxyXG5cdExhYmVsbGVkQ29udHJvbDogcmVxdWlyZSgnLi9MYWJlbGxlZENvbnRyb2wnKSxcclxuXHRMb2FkaW5nQnV0dG9uOiByZXF1aXJlKCcuL0xvYWRpbmdCdXR0b24nKSxcclxuXHRNb2RhbDogcmVxdWlyZSgnLi9Nb2RhbCcpLFxyXG5cdFBhZ2luYXRpb246IHJlcXVpcmUoJy4vUGFnaW5hdGlvbicpLFxyXG5cdFJlc3BvbnNpdmVUZXh0OiByZXF1aXJlKCcuL1Jlc3BvbnNpdmVUZXh0JyksXHJcblx0U2NyZWVuUmVhZGVyT25seTogcmVxdWlyZSgnLi9TY3JlZW5SZWFkZXJPbmx5JyksXHJcblx0U2VnbWVudGVkQ29udHJvbDogcmVxdWlyZSgnLi9TZWdtZW50ZWRDb250cm9sJyksXHJcblx0U3Bpbm5lcjogcmVxdWlyZSgnLi9TcGlubmVyJyksXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCB7IHVwY2FzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogVGhpcyByZW5kZXJzIGFsZXJ0cyBmb3IgQVBJIHN1Y2Nlc3MgYW5kIGVycm9yIHJlc3BvbnNlcy5cclxuICogICBFcnJvciBmb3JtYXQ6IHtcclxuICogICAgIGVycm9yOiAndmFsaWRhdGlvbiBlcnJvcnMnIC8vIFRoZSB1bmlxdWUgZXJyb3IgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWw6IHsgLi4uIH0gLy8gT3B0aW9uYWwgZGV0YWlscyBzcGVjaWZpYyB0byB0aGF0IGVycm9yIHR5cGVcclxuICogICB9XHJcbiAqICAgU3VjY2VzcyBmb3JtYXQ6IHtcclxuICogICAgIHN1Y2Nlc3M6ICdpdGVtIHVwZGF0ZWQnLCAvLyBUaGUgdW5pcXVlIHN1Y2Nlc3MgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWxzOiB7IC4uLiB9IC8vIE9wdGlvbmFsIGRldGFpbHMgc3BlY2lmaWMgdG8gdGhhdCBzdWNjZXNzIHR5cGVcclxuICogICB9XHJcbiAqICAgRXZlbnR1YWxseSBzdWNjZXNzIGFuZCBlcnJvciByZXNwb25zZXMgc2hvdWxkIGJlIGhhbmRsZWQgaW5kaXZpZHVhbGx5XHJcbiAqICAgYmFzZWQgb24gdGhlaXIgdHlwZS4gRm9yIGV4YW1wbGU6IHZhbGlkYXRpb24gZXJyb3JzIHNob3VsZCBiZSBkaXNwbGF5ZWQgbmV4dFxyXG4gKiAgIHRvIGVhY2ggaW52YWxpZCBmaWVsZCBhbmQgc2lnbmluIGVycm9ycyBzaG91bGQgcHJvbXQgdGhlIHVzZXIgdG8gc2lnbiBpbi5cclxuICovXHJcbnZhciBBbGVydE1lc3NhZ2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQWxlcnRNZXNzYWdlcycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRhbGVydHM6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGVycm9yOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0XHRzdWNjZXNzOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxlcnRzOiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRyZW5kZXJWYWxpZGF0aW9uRXJyb3JzICgpIHtcclxuXHRcdGxldCBlcnJvcnMgPSB0aGlzLnByb3BzLmFsZXJ0cy5lcnJvci5kZXRhaWw7XHJcblx0XHRpZiAoZXJyb3JzLm5hbWUgPT09ICdWYWxpZGF0aW9uRXJyb3InKSB7XHJcblx0XHRcdGVycm9ycyA9IGVycm9ycy5lcnJvcnM7XHJcblx0XHR9XHJcblx0XHRsZXQgZXJyb3JDb3VudCA9IE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoO1xyXG5cdFx0bGV0IGFsZXJ0Q29udGVudDtcclxuXHRcdGxldCBtZXNzYWdlcyA9IE9iamVjdC5rZXlzKGVycm9ycykubWFwKChwYXRoKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8bGkga2V5PXtwYXRofT5cclxuXHRcdFx0XHRcdFx0e3VwY2FzZShlcnJvcnNbcGF0aF0uZXJyb3IgfHwgZXJyb3JzW3BhdGhdLm1lc3NhZ2UpfVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IGtleT17cGF0aH0+XHJcblx0XHRcdFx0XHRcdHt1cGNhc2UoZXJyb3JzW3BhdGhdLmVycm9yIHx8IGVycm9yc1twYXRoXS5tZXNzYWdlKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoND5UaGVyZSB3ZXJlIHtlcnJvckNvdW50fSBlcnJvcnMgY3JlYXRpbmcgdGhlIG5ldyBpdGVtOjwvaDQ+XHJcblx0XHRcdFx0XHQ8dWw+e21lc3NhZ2VzfTwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSBtZXNzYWdlcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e2FsZXJ0Q29udGVudH08L0FsZXJ0PjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRsZXQgeyBlcnJvciwgc3VjY2VzcyB9ID0gdGhpcy5wcm9wcy5hbGVydHM7XHJcblx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0Ly8gUmVuZGVyIGVycm9yIGFsZXJ0c1xyXG5cdFx0XHRzd2l0Y2ggKGVycm9yLmVycm9yKSB7XHJcblx0XHRcdFx0Y2FzZSAndmFsaWRhdGlvbiBlcnJvcnMnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdGNhc2UgJ2Vycm9yJzpcclxuXHRcdFx0XHRcdGlmIChlcnJvci5kZXRhaWwubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cImRhbmdlclwiPnt1cGNhc2UoZXJyb3IuZXJyb3IpfTwvQWxlcnQ+O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e3VwY2FzZShlcnJvci5lcnJvcil9PC9BbGVydD47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHQvLyBSZW5kZXIgc3VjY2VzcyBhbGVydHNcclxuXHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cInN1Y2Nlc3NcIj57dXBjYXNlKHN1Y2Nlc3Muc3VjY2Vzcyl9PC9BbGVydD47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7IC8vIE5vIGFsZXJ0cywgcmVuZGVyIG5vdGhpbmdcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRNZXNzYWdlcztcclxuIiwiLyoqXHJcbiAqIFRoZSBmb3JtIHRoYXQncyB2aXNpYmxlIHdoZW4gXCJDcmVhdGUgPEl0ZW1OYW1lPlwiIGlzIGNsaWNrZWQgb24gZWl0aGVyIHRoZVxyXG4gKiBMaXN0IHNjcmVlbiBvciB0aGUgSXRlbSBzY3JlZW5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IEFsZXJ0TWVzc2FnZXMgZnJvbSAnLi9BbGVydE1lc3NhZ2VzJztcclxuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnRmllbGRUeXBlcyc7XHJcbmltcG9ydCBJbnZhbGlkRmllbGRUeXBlIGZyb20gJy4vSW52YWxpZEZpZWxkVHlwZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSwgTW9kYWwgfSBmcm9tICcuLi9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IElmcmFtZUNvbnRlbnQgZnJvbSAnLi9JZnJhbWVDb250ZW50JztcclxuXHJcbmNvbnN0IENyZWF0ZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGVGb3JtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGVycjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25DcmVhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycjogbnVsbCxcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Ly8gU2V0IHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMgd2hlbiBmaXJzdCByZW5kZXJpbmcgdGhlXHJcblx0XHQvLyBmb3JtLiAoSWYgdGhleSBoYXZlIGEgZGVmYXVsdCB2YWx1ZSwgdGhhdCBpcylcclxuXHRcdHZhciB2YWx1ZXMgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMucHJvcHMubGlzdC5maWVsZHMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dmFyIGZpZWxkID0gdGhpcy5wcm9wcy5saXN0LmZpZWxkc1trZXldO1xyXG5cdFx0XHR2YXIgRmllbGRDb21wb25lbnQgPSBGaWVsZHNbZmllbGQudHlwZV07XHJcblx0XHRcdHZhbHVlc1tmaWVsZC5wYXRoXSA9IEZpZWxkQ29tcG9uZW50LmdldERlZmF1bHRWYWx1ZShmaWVsZCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlczogdmFsdWVzLFxyXG5cdFx0XHRhbGVydHM6IHt9LFxyXG5cdFx0XHRzaG93SWZyYW1lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGlmKHRoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzaG93SWZyYW1lOiB0cnVlXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYoIXRoaXMuc3RhdGUuc2hvd0lmcmFtZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGV2dCkge1xyXG5cdFx0aWYgKHZrZXlbZXZ0LmtleUNvZGVdID09PSAnPGVzY2FwZT4nKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdC8vIEhhbmRsZSBpbnB1dCBjaGFuZ2UgZXZlbnRzXHJcblx0aGFuZGxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0dmFyIHZhbHVlcyA9IGFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xyXG5cdFx0dmFsdWVzW2V2ZW50LnBhdGhdID0gZXZlbnQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFNldCB0aGUgcHJvcHMgb2YgYSBmaWVsZFxyXG5cdGdldEZpZWxkUHJvcHMgKGZpZWxkKSB7XHJcblx0XHR2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGZpZWxkKTtcclxuXHRcdHByb3BzLnZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZXNbZmllbGQucGF0aF07XHJcblx0XHRwcm9wcy52YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlcztcclxuXHRcdHByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5tb2RlID0gJ2NyZWF0ZSc7XHJcblx0XHRwcm9wcy5rZXkgPSBmaWVsZC5wYXRoO1xyXG5cdFx0cmV0dXJuIHByb3BzO1xyXG5cdH0sXHJcblx0Ly8gQ3JlYXRlIGEgbmV3IGl0ZW0gd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcclxuXHRzdWJtaXRGb3JtIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGNyZWF0ZUZvcm0gPSBldmVudC50YXJnZXQ7XHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjcmVhdGVGb3JtKTtcclxuXHRcdHRoaXMucHJvcHMubGlzdC5jcmVhdGVJdGVtKGZvcm1EYXRhLCAoZXJyLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMub25DcmVhdGUpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJvcHMub25DcmVhdGUoZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIENsZWFyIGZvcm1cclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHR2YWx1ZXM6IHt9LFxyXG5cdFx0XHRcdFx0XHRhbGVydHM6IHtcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiAnSXRlbSBjcmVhdGVkJyxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghZXJyKSB7XHJcblx0XHRcdFx0XHRlcnIgPSB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiAnY29ubmVjdGlvbiBlcnJvcicsXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJZiB3ZSBnZXQgYSBkYXRhYmFzZSBlcnJvciwgc2hvdyB0aGUgZGF0YWJhc2UgZXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRcdC8vIGluc3RlYWQgb2Ygb25seSBzYXlpbmcgXCJEYXRhYmFzZSBlcnJvclwiXHJcblx0XHRcdFx0aWYgKGVyci5lcnJvciA9PT0gJ2RhdGFiYXNlIGVycm9yJykge1xyXG5cdFx0XHRcdFx0ZXJyLmVycm9yID0gZXJyLmRldGFpbC5lcnJtc2c7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0YWxlcnRzOiB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBlcnIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciB0aGUgZm9ybSBpdHNlbGZcclxuXHRyZW5kZXJGb3JtICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHJcblx0XHR2YXIgZm9ybSA9IFtdO1xyXG5cdFx0dmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3Q7XHJcblx0XHR2YXIgbmFtZUZpZWxkID0gdGhpcy5wcm9wcy5saXN0Lm5hbWVGaWVsZDtcclxuXHRcdHZhciBmb2N1c1dhc1NldDtcclxuXHJcblx0XHQvLyBJZiB0aGUgbmFtZSBmaWVsZCBpcyBhbiBpbml0aWFsIG9uZSwgd2UgbmVlZCB0byByZW5kZXIgYSBwcm9wZXJcclxuXHRcdC8vIGlucHV0IGZvciBpdFxyXG5cdFx0aWYgKGxpc3QubmFtZUlzSW5pdGlhbCkge1xyXG5cdFx0XHR2YXIgbmFtZUZpZWxkUHJvcHMgPSB0aGlzLmdldEZpZWxkUHJvcHMobmFtZUZpZWxkKTtcclxuXHRcdFx0bmFtZUZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHRpZiAobmFtZUZpZWxkLnR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmNsYXNzTmFtZSA9ICdpdGVtLW5hbWUtZmllbGQnO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLnBsYWNlaG9sZGVyID0gbmFtZUZpZWxkLmxhYmVsO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmxhYmVsID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9ybS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGRzW25hbWVGaWVsZC50eXBlXSwgbmFtZUZpZWxkUHJvcHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW5kZXIgaW5wdXRzIGZvciBhbGwgaW5pdGlhbCBmaWVsZHNcclxuXHRcdE9iamVjdC5rZXlzKGxpc3QuaW5pdGlhbEZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgZmllbGQgPSBsaXN0LmZpZWxkc1tsaXN0LmluaXRpYWxGaWVsZHNba2V5XV07XHJcblx0XHRcdC8vIElmIHRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkIHBhc3NlZCBpbiBhcyBmaWVsZCB0eXBlLCByZW5kZXIgdGhlXHJcblx0XHRcdC8vIGludmFsaWQgZmllbGQgdHlwZSBjb21wb25lbnRcclxuXHRcdFx0aWYgKHR5cGVvZiBGaWVsZHNbZmllbGQudHlwZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRmb3JtLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChJbnZhbGlkRmllbGRUeXBlLCB7IHR5cGU6IGZpZWxkLnR5cGUsIHBhdGg6IGZpZWxkLnBhdGgsIGtleTogZmllbGQucGF0aCB9KSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEdldCB0aGUgcHJvcHMgZm9yIHRoZSBpbnB1dCBmaWVsZFxyXG5cdFx0XHR2YXIgZmllbGRQcm9wcyA9IHRoaXMuZ2V0RmllbGRQcm9wcyhmaWVsZCk7XHJcblx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBmb2N1c1JlZiBzZXQgcHJldmlvdXNseSwgc2V0IHRoZSBjdXJyZW50IGZpZWxkIHRvXHJcblx0XHRcdC8vIGJlIHRoZSBvbmUgdG8gYmUgZm9jdXNzZWQuIEdlbmVyYWxseSB0aGUgZmlyc3QgaW5wdXQgZmllbGQsIGlmXHJcblx0XHRcdC8vIHRoZXJlJ3MgYW4gaW5pdGlhbCBuYW1lIGZpZWxkIHRoYXQgdGFrZXMgcHJlY2VkZW5jZS5cclxuXHRcdFx0aWYgKCFmb2N1c1dhc1NldCkge1xyXG5cdFx0XHRcdGZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcm0ucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEZpZWxkc1tmaWVsZC50eXBlXSwgZmllbGRQcm9wcykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm0gbGF5b3V0PVwiaG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19PlxyXG5cdFx0XHRcdDxNb2RhbC5IZWFkZXJcclxuXHRcdFx0XHRcdHRleHQ9eydDcmVhdGUgYSBuZXcgJyArIGxpc3Quc2luZ3VsYXJ9XHJcblx0XHRcdFx0XHRzaG93Q2xvc2VCdXR0b25cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxNb2RhbC5Cb2R5PlxyXG5cdFx0XHRcdFx0PEFsZXJ0TWVzc2FnZXMgYWxlcnRzPXt0aGlzLnN0YXRlLmFsZXJ0c30gLz5cclxuXHRcdFx0XHRcdHtmb3JtfVxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuXHRcdFx0XHQ8TW9kYWwuRm9vdGVyPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBjb2xvcj1cInN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCIgZGF0YS1idXR0b24tdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0XHRDcmVhdGVcclxuXHRcdFx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdFx0ZGF0YS1idXR0b24tdHlwZT1cImNhbmNlbFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdENhbmNlbFxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0PC9Nb2RhbC5Gb290ZXI+XHJcblx0XHRcdDwvRm9ybT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250ZW50KCkge1xyXG5cdFx0Y29uc3Qge3Nob3dJZnJhbWV9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IGlmcmFtZVVSTCA9IGAke0tleXN0b25lLmV4dGVybmFsSG9zdH0ke3RoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZX1gO1xyXG5cclxuXHRcdHJldHVybiAoc2hvd0lmcmFtZSAmJiB0aGlzLnByb3BzLmlzT3BlbikgP1xyXG5cdFx0XHQ8SWZyYW1lQ29udGVudCBzcmM9e2lmcmFtZVVSTH0gc2hvdz17dGhpcy5wcm9wcy5pc09wZW59IG9uQ2FuY2VsPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBvblNhdmU9e3RoaXMucHJvcHMub25DcmVhdGV9IGNsYXNzTmFtZT17XCJmdWxsLXNjcmVlblwifS8+IDpcclxuXHRcdFx0PE1vZGFsLkRpYWxvZyBpc09wZW49e3RoaXMucHJvcHMuaXNPcGVufSBvbkNsb3NlPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBiYWNrZHJvcENsb3Nlc01vZGFsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckZvcm0oKX1cclxuXHRcdFx0PC9Nb2RhbC5EaWFsb2c+XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVGb3JtO1xyXG4iLCIvKipcclxuICogVGhlIGZvcm0gdGhhdCdzIHZpc2libGUgd2hlbiBcIkNyZWF0ZSA8SXRlbU5hbWU+XCIgaXMgY2xpY2tlZCBvbiBlaXRoZXIgdGhlXHJcbiAqIExpc3Qgc2NyZWVuIG9yIHRoZSBJdGVtIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJZnJhbWVDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWZyYW1lQ29udGVudCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvdzogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuaGFuZGxlRnJhbWVUYXNrcywgdGhpcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVGcmFtZVRhc2tzLCB0aGlzKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZyYW1lVGFza3MoZSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcblx0XHRcdHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdjb250ZW50VXBkYXRlJzogXHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhlaWdodDogbWVzc2FnZS5kYXRhXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25TYXZlJzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2F2ZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2F2ZShtZXNzYWdlLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25DYW5jZWwnOlxyXG5cdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlckNvbnRlbnQoKSB7XHJcblx0XHRjb25zdCB7c3JjLCBzaG93LCBjbGFzc05hbWUgPSAnJ30gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaWZyYW1lVVJMID0gYCR7c3JjfT90b2tlbj0ke0tleXN0b25lLnVzZXIudG9rZW59YFxyXG5cdFx0cmV0dXJuIHNob3cgP1xyXG5cdFx0XHQ8aWZyYW1lIGNsYXNzTmFtZT17J2NvbnRlbnQtZnJhbWUgJyArIGNsYXNzTmFtZX0gc3R5bGU9e3toZWlnaHQ6IHRoaXMuc3RhdGUuY29udGVudEhlaWdodH19IHJlZj17KGYpID0+IHRoaXMuaWZyID0gZiB9IHNyYz17aWZyYW1lVVJMfSAvPiA6IDxkaXYgLz5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElmcmFtZUNvbnRlbnQ7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXJzIGFuIFwiSW52YWxpZCBGaWVsZCBUeXBlXCIgZXJyb3JcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgSW52YWxpZEZpZWxkVHlwZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPlxyXG5cdFx0XHRJbnZhbGlkIGZpZWxkIHR5cGUgPHN0cm9uZz57cHJvcHMudHlwZX08L3N0cm9uZz4gYXQgcGF0aCA8c3Ryb25nPntwcm9wcy5wYXRofTwvc3Ryb25nPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkludmFsaWRGaWVsZFR5cGUucHJvcFR5cGVzID0ge1xyXG5cdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZEZpZWxkVHlwZTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciB0aGUgYm9keSBvZiBhIHBvcG91dFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0Qm9keSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dEJvZHknLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRzY3JvbGxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRfX2JvZHknLCB7XHJcblx0XHRcdCdQb3BvdXRfX3Njcm9sbGFibGUtYXJlYSc6IHRoaXMucHJvcHMuc2Nyb2xsYWJsZSxcclxuXHRcdH0sIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnc2Nyb2xsYWJsZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dEJvZHk7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBmb290ZXIgZm9yIGEgcG9wb3V0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IEJVVFRPTl9CQVNFX0NMQVNTTkFNRSA9ICdQb3BvdXRfX2Zvb3Rlcl9fYnV0dG9uIFBvcG91dF9fZm9vdGVyX19idXR0b24tLSc7XHJcblxyXG5jb25zdCBQb3BvdXRGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRGb290ZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxyXG5cdFx0cHJpbWFyeUJ1dHRvbkFjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRwcmltYXJ5QnV0dG9uSXNTdWJtaXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0cHJpbWFyeUJ1dHRvbkxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0c2Vjb25kYXJ5QnV0dG9uQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHNlY29uZGFyeUJ1dHRvbkxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIGEgcHJpbWFyeSBidXR0b25cclxuXHRyZW5kZXJQcmltYXJ5QnV0dG9uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uTGFiZWwpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHR0eXBlPXt0aGlzLnByb3BzLnByaW1hcnlCdXR0b25Jc1N1Ym1pdCA/ICdzdWJtaXQnIDogJ2J1dHRvbid9XHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtCVVRUT05fQkFTRV9DTEFTU05BTUUgKyAncHJpbWFyeSd9XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uQWN0aW9ufVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMucHJpbWFyeUJ1dHRvbkxhYmVsfVxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHQvLyBSZW5kZXIgYSBzZWNvbmRhcnkgYnV0dG9uXHJcblx0cmVuZGVyU2Vjb25kYXJ5QnV0dG9uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25BY3Rpb24gfHwgIXRoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uTGFiZWwpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRjbGFzc05hbWU9e0JVVFRPTl9CQVNFX0NMQVNTTkFNRSArICdzZWNvbmRhcnknfVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uQWN0aW9ufVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uTGFiZWx9XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9fZm9vdGVyXCI+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyUHJpbWFyeUJ1dHRvbigpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclNlY29uZGFyeUJ1dHRvbigpfVxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dEZvb3RlcjtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIGhlYWRlciBmb3IgYSBwb3BvdXRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuY29uc3QgUG9wb3V0SGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0SGVhZGVyJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGxlZnRBY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0bGVmdEljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dHJhbnNpdGlvbkRpcmVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnbmV4dCcsICdwcmV2J10pLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdC8vIElmIHdlIGhhdmUgYSBsZWZ0IGFjdGlvbiBhbmQgYSBsZWZ0IGljb24sIHJlbmRlciBhIGhlYWRlciBidXR0b25cclxuXHRcdHZhciBoZWFkZXJCdXR0b24gPSAodGhpcy5wcm9wcy5sZWZ0QWN0aW9uICYmIHRoaXMucHJvcHMubGVmdEljb24pID8gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0a2V5PXsnYnV0dG9uXycgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0Y2xhc3NOYW1lPXsnUG9wb3V0X19oZWFkZXJfX2J1dHRvbiBvY3RpY29uIG9jdGljb24tJyArIHRoaXMucHJvcHMubGVmdEljb259XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5sZWZ0QWN0aW9ufVxyXG5cdFx0XHQvPlxyXG5cdFx0KSA6IG51bGw7XHJcblx0XHQvLyBJZiB3ZSBoYXZlIGEgdGl0bGUsIHJlbmRlciBpdFxyXG5cdFx0dmFyIGhlYWRlclRpdGxlID0gdGhpcy5wcm9wcy50aXRsZSA/IChcclxuXHRcdFx0PHNwYW5cclxuXHRcdFx0XHRrZXk9eyd0aXRsZV8nICsgdGhpcy5wcm9wcy50cmFuc2l0aW9uRGlyZWN0aW9ufVxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cIlBvcG91dF9faGVhZGVyX19sYWJlbFwiXHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KSA6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJQb3BvdXRfX2hlYWRlclwiPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cIlBvcG91dF9faGVhZGVyX19idXR0b25cIlxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHtoZWFkZXJCdXR0b259XHJcblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT17J1BvcG91dF9fcGFuZS0nICsgdGhpcy5wcm9wcy50cmFuc2l0aW9uRGlyZWN0aW9ufVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MzYwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MzYwfVxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHtoZWFkZXJUaXRsZX1cclxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0SGVhZGVyO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QuIENhbiBhbHNvIHVzZSBQb3BvdXRMaXN0SXRlbSBhbmQgUG9wb3V0TGlzdEhlYWRpbmdcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuY29uc3QgUG9wb3V0TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3QnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRMaXN0O1xyXG5cclxuLy8gZXhwb3NlIHRoZSBjaGlsZCB0byB0aGUgdG9wIGxldmVsIGV4cG9ydFxyXG5tb2R1bGUuZXhwb3J0cy5JdGVtID0gcmVxdWlyZSgnLi9Qb3BvdXRMaXN0SXRlbScpO1xyXG5tb2R1bGUuZXhwb3J0cy5IZWFkaW5nID0gcmVxdWlyZSgnLi9Qb3BvdXRMaXN0SGVhZGluZycpO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QgaGVhZGluZ1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0TGlzdEhlYWRpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRMaXN0SGVhZGluZycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0X19oZWFkaW5nJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3RIZWFkaW5nO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QgaXRlbVxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0TGlzdEl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRMaXN0SXRlbScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0aWNvbkhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0aXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0b25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aG92ZXI6IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGhvdmVyICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBob3ZlcjogdHJ1ZSB9KTtcclxuXHR9LFxyXG5cdHVuaG92ZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiBmYWxzZSB9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciBhbiBpY29uXHJcblx0cmVuZGVySWNvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaWNvbikgcmV0dXJuIG51bGw7XHJcblx0XHRjb25zdCBpY29uID0gdGhpcy5zdGF0ZS5ob3ZlciAmJiB0aGlzLnByb3BzLmljb25Ib3ZlciA/IHRoaXMucHJvcHMuaWNvbkhvdmVyIDogdGhpcy5wcm9wcy5pY29uO1xyXG5cdFx0Y29uc3QgaWNvbkNsYXNzbmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2l0ZW1fX2ljb24gb2N0aWNvbicsICgnb2N0aWNvbi0nICsgaWNvbikpO1xyXG5cclxuXHRcdHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc25hbWV9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGl0ZW1DbGFzc25hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0X19pdGVtJywge1xyXG5cdFx0XHQnaXMtc2VsZWN0ZWQnOiB0aGlzLnByb3BzLmlzU2VsZWN0ZWQsXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnaWNvbicsICdpY29uSG92ZXInLCAnaXNTZWxlY3RlZCcsICdsYWJlbCcpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLmxhYmVsfVxyXG5cdFx0XHRcdGNsYXNzTmFtZT17aXRlbUNsYXNzbmFtZX1cclxuXHRcdFx0XHRvbkZvY3VzPXt0aGlzLmhvdmVyfVxyXG5cdFx0XHRcdG9uQmx1cj17dGhpcy51bmhvdmVyfVxyXG5cdFx0XHRcdG9uTW91c2VPdmVyPXt0aGlzLmhvdmVyfVxyXG5cdFx0XHRcdG9uTW91c2VPdXQ9e3RoaXMudW5ob3Zlcn1cclxuXHRcdFx0XHR7Li4ucHJvcHN9XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJJY29uKCl9XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiUG9wb3V0TGlzdF9faXRlbV9fbGFiZWxcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmVsfVxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRMaXN0SXRlbTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIHBvcG91dCBwYW5lLCBjYWxscyBwcm9wcy5vbkxheW91dCB3aGVuIHRoZSBjb21wb25lbnQgbW91bnRzXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRQYW5lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0UGFuZScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uTGF5b3V0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRvbkxheW91dDogKCkgPT4ge30sXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkxheW91dCh0aGlzLnJlZnMuZWwub2Zmc2V0SGVpZ2h0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRfX3BhbmUnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJywgJ29uTGF5b3V0Jyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiByZWY9XCJlbFwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRQYW5lO1xyXG4iLCIvKipcclxuICogQSBQb3BvdXQgY29tcG9uZW50LlxyXG4gKiBPbmUgY2FuIGFsc28gYWRkIGEgSGVhZGVyIChQb3BvdXQvSGVhZGVyKSwgYSBGb290ZXJcclxuICogKFBvcG91dC9Gb290ZXIpLCBhIEJvZHkgKFBvcG91dC9Cb2R5KSBhbmQgYSBQYW4gKFBvcG91dC9QYW5lKS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUG9ydGFsIGZyb20gJy4uL1BvcnRhbCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBTSVpFUyA9IHtcclxuXHRhcnJvd0hlaWdodDogMTIsXHJcblx0YXJyb3dXaWR0aDogMTYsXHJcblx0aG9yaXpvbnRhbE1hcmdpbjogMjAsXHJcbn07XHJcblxyXG52YXIgUG9wb3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRvblN1Ym1pdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRyZWxhdGl2ZVRvSUQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoOiAzMjAsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuaXNPcGVuKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKTtcclxuXHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbihuZXh0UHJvcHMuaXNPcGVuKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc09wZW4gJiYgIW5leHRQcm9wcy5pc09wZW4pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Z2V0UG9ydGFsRE9NTm9kZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWZzLnBvcnRhbC5nZXRQb3J0YWxET01Ob2RlKCk7XHJcblx0fSxcclxuXHRjYWxjdWxhdGVQb3NpdGlvbiAoaXNPcGVuKSB7XHJcblx0XHRpZiAoIWlzT3BlbikgcmV0dXJuO1xyXG5cdFx0bGV0IHBvc05vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnByb3BzLnJlbGF0aXZlVG9JRCk7XHJcblxyXG5cdFx0Y29uc3QgcG9zID0ge1xyXG5cdFx0XHR0b3A6IDAsXHJcblx0XHRcdGxlZnQ6IDAsXHJcblx0XHRcdHdpZHRoOiBwb3NOb2RlLm9mZnNldFdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHBvc05vZGUub2Zmc2V0SGVpZ2h0LFxyXG5cdFx0fTtcclxuXHRcdHdoaWxlIChwb3NOb2RlLm9mZnNldFBhcmVudCkge1xyXG5cdFx0XHRwb3MudG9wICs9IHBvc05vZGUub2Zmc2V0VG9wO1xyXG5cdFx0XHRwb3MubGVmdCArPSBwb3NOb2RlLm9mZnNldExlZnQ7XHJcblx0XHRcdHBvc05vZGUgPSBwb3NOb2RlLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbGVmdE9mZnNldCA9IE1hdGgubWF4KHBvcy5sZWZ0ICsgKHBvcy53aWR0aCAvIDIpIC0gKHRoaXMucHJvcHMud2lkdGggLyAyKSwgU0laRVMuaG9yaXpvbnRhbE1hcmdpbik7XHJcblx0XHRsZXQgdG9wT2Zmc2V0ID0gcG9zLnRvcCArIHBvcy5oZWlnaHQgKyBTSVpFUy5hcnJvd0hlaWdodDtcclxuXHJcblx0XHR2YXIgc3BhY2VPblJpZ2h0ID0gd2luZG93LmlubmVyV2lkdGggLSAobGVmdE9mZnNldCArIHRoaXMucHJvcHMud2lkdGggKyBTSVpFUy5ob3Jpem9udGFsTWFyZ2luKTtcclxuXHRcdGlmIChzcGFjZU9uUmlnaHQgPCAwKSB7XHJcblx0XHRcdGxlZnRPZmZzZXQgPSBsZWZ0T2Zmc2V0ICsgc3BhY2VPblJpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGFycm93TGVmdE9mZnNldCA9IGxlZnRPZmZzZXQgPT09IFNJWkVTLmhvcml6b250YWxNYXJnaW5cclxuXHRcdFx0PyBwb3MubGVmdCArIChwb3Mud2lkdGggLyAyKSAtIChTSVpFUy5hcnJvd1dpZHRoIC8gMikgLSBTSVpFUy5ob3Jpem9udGFsTWFyZ2luXHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRjb25zdCBuZXdTdGF0ZUF2YWxpYWJsZSA9IHRoaXMuc3RhdGUubGVmdE9mZnNldCAhPT0gbGVmdE9mZnNldFxyXG5cdFx0XHR8fCB0aGlzLnN0YXRlLnRvcE9mZnNldCAhPT0gdG9wT2Zmc2V0XHJcblx0XHRcdHx8IHRoaXMuc3RhdGUuYXJyb3dMZWZ0T2Zmc2V0ICE9PSBhcnJvd0xlZnRPZmZzZXQ7XHJcblxyXG5cdFx0aWYgKG5ld1N0YXRlQXZhbGlhYmxlKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxlZnRPZmZzZXQ6IGxlZnRPZmZzZXQsXHJcblx0XHRcdFx0dG9wT2Zmc2V0OiB0b3BPZmZzZXQsXHJcblx0XHRcdFx0YXJyb3dMZWZ0T2Zmc2V0OiBhcnJvd0xlZnRPZmZzZXQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyUG9wb3V0ICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHsgd2lkdGggfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IGFycm93TGVmdE9mZnNldCwgbGVmdE9mZnNldDogbGVmdCwgdG9wT2Zmc2V0OiB0b3AgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3QgYXJyb3dTdHlsZXMgPSBhcnJvd0xlZnRPZmZzZXRcclxuXHRcdFx0PyB7IGxlZnQ6IDAsIG1hcmdpbkxlZnQ6IGFycm93TGVmdE9mZnNldCB9XHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dFwiIHN0eWxlPXt7IGxlZnQsIHRvcCwgd2lkdGggfX0+XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiUG9wb3V0X19hcnJvd1wiIHN0eWxlPXthcnJvd1N0eWxlc30gLz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9faW5uZXJcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJCbG9ja291dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm47XHJcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJibG9ja291dFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQb3J0YWwgY2xhc3NOYW1lPVwiUG9wb3V0LXdyYXBwZXJcIiByZWY9XCJwb3J0YWxcIj5cclxuXHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9XCJQb3BvdXRcIlxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclBvcG91dCgpfVxyXG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJCbG9ja291dCgpfVxyXG5cdFx0XHQ8L1BvcnRhbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dDtcclxuXHJcbi8vIGV4cG9zZSB0aGUgY2hpbGQgdG8gdGhlIHRvcCBsZXZlbCBleHBvcnRcclxubW9kdWxlLmV4cG9ydHMuSGVhZGVyID0gcmVxdWlyZSgnLi9Qb3BvdXRIZWFkZXInKTtcclxubW9kdWxlLmV4cG9ydHMuQm9keSA9IHJlcXVpcmUoJy4vUG9wb3V0Qm9keScpO1xyXG5tb2R1bGUuZXhwb3J0cy5Gb290ZXIgPSByZXF1aXJlKCcuL1BvcG91dEZvb3RlcicpO1xyXG5tb2R1bGUuZXhwb3J0cy5QYW5lID0gcmVxdWlyZSgnLi9Qb3BvdXRQYW5lJyk7XHJcbiIsIi8qKlxyXG4gKiBVc2VkIGJ5IHRoZSBQb3BvdXQgY29tcG9uZW50IGFuZCB0aGUgTGlnaHRib3ggY29tcG9uZW50IG9mIHRoZSBmaWVsZHMgZm9yXHJcbiAqIHBvcG91dHMuIFJlbmRlcnMgYSBub24tcmVhY3QgRE9NIG5vZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcnRhbCcsXHJcblx0cG9ydGFsRWxlbWVudDogbnVsbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBlbDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xyXG5cdFx0UmVhY3RET00ucmVuZGVyKDxkaXYgey4uLnRoaXMucHJvcHN9IC8+LCB0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH0sXHJcblx0Z2V0UG9ydGFsRE9NTm9kZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3J0YWxFbGVtZW50O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCIvKipcclxuICogQ29uc3RhbnRzXHJcbiAqL1xyXG5cclxuLy8gYnJlYWtwb2ludHNcclxuZXhwb3J0cy5icmVha3BvaW50ID0ge1xyXG5cdHhzOiA0ODAsXHJcblx0c206IDc2OCxcclxuXHRtZDogOTkyLFxyXG5cdGxnOiAxMjAwLFxyXG59O1xyXG5cclxuLy8gYm9yZGVyIHJhZGlpXHJcbmV4cG9ydHMuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHhzOiAyLFxyXG5cdHNtOiA0LFxyXG5cdG1kOiA4LFxyXG5cdGxnOiAxNixcclxuXHR4bDogMzIsXHJcbn07XHJcblxyXG4vLyBjb2xvclxyXG5leHBvcnRzLmNvbG9yID0ge1xyXG5cdGFwcERhbmdlcjogJyNkNjQyNDInLFxyXG5cdGFwcEluZm86ICcjNTZjZGZjJyxcclxuXHRhcHBQcmltYXJ5OiAnIzEzODVlNScsXHJcblx0YXBwU3VjY2VzczogJyMzNGMyNDAnLFxyXG5cdGFwcFdhcm5pbmc6ICcjZmE5ZjQ3JyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuZXhwb3J0cy5zcGFjaW5nID0ge1xyXG5cdHhzOiA1LFxyXG5cdHNtOiAxMCxcclxuXHRtZDogMjAsXHJcblx0bGc6IDQwLFxyXG5cdHhsOiA4MCxcclxufTtcclxuXHJcbi8vIHRhYmxlIGNvbnN0YW50c1xyXG5cclxuZXhwb3J0cy5UQUJMRV9DT05UUk9MX0NPTFVNTl9XSURUSCA9IDI2OyAgLy8gaWNvbiArIHBhZGRpbmdcclxuZXhwb3J0cy5ORVRXT1JLX0VSUk9SX1JFVFJZX0RFTEFZID0gNTAwOyAvLyBpbiBtc1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBrZXktc3BhY2luZyAqL1xyXG5jb25zdCB0aGVtZSA9IHt9O1xyXG5jb25zdCB7IGJsZW5kLCBkYXJrZW4sIGZhZGUsIGxpZ2h0ZW4gfSA9IHJlcXVpcmUoJy4vdXRpbHMvY29sb3InKTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDT01NT05cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBicmVha3BvaW50XHJcblxyXG50aGVtZS5icmVha3BvaW50TnVtZXJpYyA9IHtcclxuXHRtb2JpbGU6ICAgICAgICAgICA0ODAsXHJcblx0dGFibGV0UG9ydHJhaXQ6ICAgNzY4LFxyXG5cdHRhYmxldExhbmRzY2FwZTogIDk5MixcclxuXHRkZXNrdG9wOiAgICAgICAgICAxMjAwLFxyXG59O1xyXG50aGVtZS5icmVha3BvaW50ID0ge1xyXG5cdHRhYmxldFBvcnRyYWl0TWluOiAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSArIDEpICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNaW46ICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTWluOiAgICAgICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAxKSArICdweCcsXHJcblx0ZGVza3RvcExhcmdlTWluOiAgICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMuZGVza3RvcCArIDEpICsgJ3B4JyxcclxuXHJcblx0bW9iaWxlTWF4OiAgICAgICAgICAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgJ3B4JyxcclxuXHR0YWJsZXRQb3J0cmFpdE1heDogICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCArICdweCcsXHJcblx0dGFibGV0TGFuZHNjYXBlTWF4OiAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlICsgJ3B4JyxcclxuXHRkZXNrdG9wTWF4OiAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgJ3B4JyxcclxufTtcclxuXHJcbi8vIGNvbnRhaW5lclxyXG5cclxudGhlbWUuY29udGFpbmVyID0ge1xyXG5cdGd1dHRlcjogMjAsXHJcblx0c2l6ZToge1xyXG5cdFx0c21hbGw6ICA3NTAsXHJcblx0XHRtZWRpdW06IDk3MCxcclxuXHRcdGxhcmdlOiAxMTcwLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb2xvclxyXG5cclxudGhlbWUuY29sb3IgPSB7XHJcblx0Ym9keTogICAgICAgICAgICAgICAgJyNmYWZhZmEnLFxyXG5cdGxpbms6ICAgICAgICAgICAgICAgICcjMTM4NWU1JyxcclxuXHRsaW5rSG92ZXI6ICAgICAgICAgICBsaWdodGVuKCcjMTM4NWU1JywgMTApLFxyXG5cdHRleHQ6ICAgICAgICAgICAgICAgICcjMUExQTFBJyxcclxuXHJcblx0Ly8gY29udGV4dHVhbFxyXG5cdHN1Y2Nlc3M6ICAgICAgICAgICAgICcjMzRjMjQwJyxcclxuXHRjcmVhdGU6ICAgICAgICAgICAgICAnIzM0YzI0MCcsIC8vIGFsaWFzIGZvciBzdWNjZXNzXHJcblx0cHJpbWFyeTogICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGluZm86ICAgICAgICAgICAgICAgICcjMTM4NWU1JywgLy8gYWxpYXMgZm9yIHByaW1hcnlcclxuXHR3YXJuaW5nOiAgICAgICAgICAgICAnI0ZBMycsXHJcblx0ZGFuZ2VyOiAgICAgICAgICAgICAgJyNkNjQyNDInLFxyXG5cdGVycm9yOiAgICAgICAgICAgICAgICcjZDY0MjQyJywgLy8gYWxpYXMgZm9yIGRhbmdlclxyXG5cclxuXHQvLyBuZXV0cmFsc1xyXG5cdGdyYXk5MDogICAgICAgICAgICAgICcjMUExQTFBJyxcclxuXHRncmF5ODA6ICAgICAgICAgICAgICAnIzMzMycsXHJcblx0Z3JheTcwOiAgICAgICAgICAgICAgJyM0RDRENEQnLFxyXG5cdGdyYXk2MDogICAgICAgICAgICAgICcjNjY2JyxcclxuXHRncmF5NTA6ICAgICAgICAgICAgICAnIzdGN0Y3RicsXHJcblx0Z3JheTQwOiAgICAgICAgICAgICAgJyM5OTknLFxyXG5cdGdyYXkzMDogICAgICAgICAgICAgICcjQjNCM0IzJyxcclxuXHRncmF5MjA6ICAgICAgICAgICAgICAnI0NDQycsXHJcblx0Z3JheTE1OiAgICAgICAgICAgICAgJyNEOUQ5RDknLFxyXG5cdGdyYXkxMDogICAgICAgICAgICAgICcjRTVFNUU1JyxcclxuXHRncmF5MDU6ICAgICAgICAgICAgICAnI0YyRjJGMicsXHJcblxyXG5cdC8vIHNvY2lhbFxyXG5cdGZhY2Vib29rOiAgICAgICAgICAgICcjM0I1OTk4JyxcclxuXHRnb29nbGU6ICAgICAgICAgICAgICAnI0RDNEU0MScsXHJcblx0aW5zdGFncmFtOiAgICAgICAgICAgJyMzZjcyOWInLFxyXG5cdHBpbnRlcmVzdDogICAgICAgICAgICcjYmQwODFjJyxcclxuXHR0dW1ibHI6ICAgICAgICAgICAgICAnIzM1NDY1YycsXHJcblx0dHdpdHRlcjogICAgICAgICAgICAgJyM1NUFDRUUnLFxyXG5cdHlvdXR1YmU6ICAgICAgICAgICAgICcjY2QyMDFmJyxcclxuXHR2aW1lbzogICAgICAgICAgICAgICAnIzFhYjdlYScsXHJcbn07XHJcblxyXG4vLyBib3JkZXIgcmFkaWlcclxuXHJcbnRoZW1lLmJvcmRlclJhZGl1cyA9IHtcclxuXHRzbWFsbDogJzAuMTI1cmVtJyxcclxuXHRkZWZhdWx0OiAnMC4zcmVtJyxcclxuXHRsYXJnZTogJzAuNXJlbScsXHJcbn07XHJcblxyXG4vLyBzcGFjaW5nXHJcblxyXG50aGVtZS5zcGFjaW5nID0ge1xyXG5cdHhzbWFsbDogICAgICA1LFxyXG5cdHNtYWxsOiAgICAgICAxMCxcclxuXHRkZWZhdWx0OiAgICAgMjAsXHJcblx0bGFyZ2U6ICAgICAgIDMwLFxyXG5cdHhsYXJnZTogICAgICA0MCxcclxuXHR4eGxhcmdlOiAgICAgNjAsXHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRUxFTUVOVEFMIFNQRUNJRklDXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gYnV0dG9uXHJcblxyXG50aGVtZS5idXR0b24gPSB7XHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRib3JkZXJXaWR0aDogMSxcclxuXHRmb250OiB7XHJcblx0XHR3ZWlnaHQ6IDUwMCxcclxuXHR9LFxyXG5cdHBhZGRpbmdIb3Jpem9udGFsOiAnMWVtJyxcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnByaW1hcnksIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHR9LFxyXG5cdHByaW1hcnk6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0c3VjY2Vzczoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5zdWNjZXNzLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0fSxcclxuXHR3YXJuaW5nOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLndhcm5pbmcsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdGRhbmdlcjoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLmRhbmdlciwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGJsYW5rIHN0YXRlXHJcblxyXG50aGVtZS5ibGFua3N0YXRlID0ge1xyXG5cdGJhY2tncm91bmQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCA0KSxcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcyZW0nLFxyXG5cdHBhZGRpbmdWZXJ0aWNhbDogJzRlbScsXHJcbn07XHJcblxyXG4vLyBmb250XHJcblxyXG50aGVtZS5mb250ID0ge1xyXG5cdGZhbWlseToge1xyXG5cdFx0bW9ubzogJ01lbmxvLCBNb25hY28sIENvbnNvbGFzLCBcIkNvdXJpZXIgTmV3XCIsIG1vbm9zcGFjZScsXHJcblx0XHRzYW5zU2VyaWY6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxyXG5cdFx0c2VyaWY6ICdHZW9yZ2lhLCBUaW1lcyBOZXcgUm9tYW4sIFRpbWVzLCBzZXJpZicsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHR4eHNtYWxsOiAnMC42NXJlbScsXHJcblx0XHR4c21hbGw6ICcwLjc1cmVtJyxcclxuXHRcdHNtYWxsOiAnMC44NXJlbScsXHJcblx0XHRkZWZhdWx0OiAnMXJlbScsXHJcblx0XHRtZWRpdW06ICcxLjJyZW0nLFxyXG5cdFx0bGFyZ2U6ICcxLjZyZW0nLFxyXG5cdFx0eGxhcmdlOiAnMi40cmVtJyxcclxuXHRcdHh4bGFyZ2U6ICczLjJyZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBmb3JtXHJcblxyXG50aGVtZS5mb3JtID0ge1xyXG5cdGxhYmVsOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTUwLFxyXG5cdFx0Zm9udFNpemU6ICcxcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG5cdFx0d2lkdGg6IDE4MCxcclxuXHR9LFxyXG5cdG5vdGU6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRmb250U2l6ZTogJzAuOWVtJyxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gY29tcG9uZW50XHJcblxyXG50aGVtZS5jb21wb25lbnQgPSB7XHJcblx0bGluZUhlaWdodDogJzIuM2VtJyxcclxuXHRoZWlnaHQ6ICcyLjRlbScsXHJcblx0cGFkZGluZzogJzFlbScsXHJcbn07XHJcblxyXG4vLyBpbnB1dFxyXG5cclxudGhlbWUuaW5wdXQgPSB7XHJcblx0YmFja2dyb3VuZDoge1xyXG5cdFx0ZGVmYXVsdDogJ3doaXRlJyxcclxuXHRcdGRpc2FibGVkOiAnI2ZhZmFmYScsXHJcblx0XHRub2VkaXQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCAyKSxcclxuXHR9LFxyXG5cdHBsYWNlaG9sZGVyQ29sb3I6ICcjYWFhJyxcclxuXHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRoZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5oZWlnaHQsXHJcblx0Ym9yZGVyOiB7XHJcblx0XHRjb2xvcjoge1xyXG5cdFx0XHRkZWZhdWx0OiAnI2NjYycsXHJcblx0XHRcdGZvY3VzOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdFx0XHRob3ZlcjogJyNiYmInLFxyXG5cdFx0XHRub2VkaXQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCA4KSxcclxuXHRcdH0sXHJcblx0XHRyYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG5cdGJveFNoYWRvd0ZvY3VzOiBgaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLmluZm8sIDEwKX1gLFxyXG5cdHBhZGRpbmdIb3Jpem9udGFsOiAnLjc1ZW0nLFxyXG59O1xyXG5cclxuLy8gc2VsZWN0XHJcblxyXG50aGVtZS5zZWxlY3QgPSB7XHJcblx0Ym94U2hhZG93OiAnMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpJyxcclxufTtcclxuXHJcbi8vIGFsZXJ0XHJcblxyXG50aGVtZS5hbGVydCA9IHtcclxuXHRwYWRkaW5nOiAnMC43NWVtICAxZW0nLFxyXG5cdG1hcmdpbjogJzAgMCAxZW0nLFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblxyXG5cdGNvbG9yOiB7XHJcblx0XHRkYW5nZXI6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHR9LFxyXG5cdFx0aW5mbzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3Iuc3VjY2VzcywgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3Iuc3VjY2VzcywgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0fSxcclxuXHRcdHdhcm5pbmc6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci53YXJuaW5nLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci53YXJuaW5nLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBnbHlwaFxyXG5cclxudGhlbWUuZ2x5cGggPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0aW5oZXJpdDogJ2luaGVyaXQnLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogMTYsXHJcblx0XHRtZWRpdW06IDMyLFxyXG5cdFx0bGFyZ2U6IDY0LFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBtb2RhbFxyXG5cclxudGhlbWUubW9kYWwgPSB7XHJcblx0YmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC44KScsXHJcblx0ekluZGV4OiAxMDAsXHJcblx0cGFkZGluZzoge1xyXG5cdFx0ZGlhbG9nOiB7XHJcblx0XHRcdGhvcml6b250YWw6ICcxZW0nLFxyXG5cdFx0XHR2ZXJ0aWNhbDogMCxcclxuXHRcdH0sXHJcblx0XHRib2R5OiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMWVtJyxcclxuXHRcdH0sXHJcblx0XHRmb290ZXI6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGhlYWRlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzAuNmVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHBhZ2luYXRpb25cclxuXHJcbnRoZW1lLnBhZ2luYXRpb24gPSB7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHJcblx0aG92ZXI6IHtcclxuXHRcdGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcblx0XHRib3JkZXI6ICdyZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHR9LFxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjA1KScsXHJcblx0XHRib3JkZXI6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBzcGlubmVyXHJcblxyXG50aGVtZS5zcGlubmVyID0ge1xyXG5cdGNvbG9yOiB7XHJcblx0XHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGRlZmF1bHQ6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGludmVydGVkOiAnd2hpdGUnLFxyXG5cdFx0cHJpbWFyeTogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdHN1Y2Nlc3M6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0c2l6ZToge1xyXG5cdFx0c21hbGw6XHQ0LFxyXG5cdFx0bWVkaXVtOlx0OCxcclxuXHRcdGxhcmdlOlx0MTYsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGhlbWU7XHJcbiIsIi8qKlxyXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGhhbmRsZSBMaXN0IG9wZXJhdGlvbnMsIGUuZy4gY3JlYXRpbmcgaXRlbXMsIGRlbGV0aW5nIGl0ZW1zLFxyXG4gKiBnZXR0aW5nIGluZm9ybWF0aW9uIGFib3V0IHRob3NlIGxpc3RzLCBldGMuXHJcbiAqL1xyXG5cclxuY29uc3QgbGlzdFRvQXJyYXkgPSByZXF1aXJlKCdsaXN0LXRvLWFycmF5Jyk7XHJcbmNvbnN0IHFzID0gcmVxdWlyZSgncXMnKTtcclxuY29uc3QgeGhyID0gcmVxdWlyZSgneGhyJyk7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuLy8gRmlsdGVycyBmb3IgdHJ1dGh5IGVsZW1lbnRzIGluIGFuIGFycmF5XHJcbmNvbnN0IHRydXRoeSA9IChpKSA9PiBpO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29sdW1ucyBvZiBhIGxpc3QsIHN0cnVjdHVyZWQgYnkgZmllbGRzIGFuZCBoZWFkaW5nc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGxpc3QgVGhlIGxpc3Qgd2Ugd2FudCB0aGUgY29sdW1ucyBvZlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICAgVGhlIGNvbHVtbnNcclxuICovXHJcbmZ1bmN0aW9uIGdldENvbHVtbnMobGlzdCkge1xyXG5cdHJldHVybiBsaXN0LnVpRWxlbWVudHMubWFwKChjb2wpID0+IHtcclxuXHRcdGlmIChjb2wudHlwZSA9PT0gJ2hlYWRpbmcnKSB7XHJcblx0XHRcdHJldHVybiB7IHR5cGU6ICdoZWFkaW5nJywgY29udGVudDogY29sLmNvbnRlbnQgfTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBmaWVsZCA9IGxpc3QuZmllbGRzW2NvbC5maWVsZF07XHJcblx0XHRcdHJldHVybiBmaWVsZCA/IHsgdHlwZTogJ2ZpZWxkJywgZmllbGQ6IGZpZWxkLCB0aXRsZTogZmllbGQubGFiZWwsIHBhdGg6IGZpZWxkLnBhdGggfSA6IG51bGw7XHJcblx0XHR9XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYWtlIGFuIGFycmF5IG9mIGZpbHRlcnMgYW4gb2JqZWN0IGtleWVkIGJ5IHRoZSBmaWx0ZXJpbmcgcGF0aFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gZmlsdGVyQXJyYXkgVGhlIGFycmF5IG9mIGZpbHRlcnNcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIFRoZSBjb3JyZWN0ZWQgZmlsdGVycywga2V5ZWQgYnkgcGF0aFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RmlsdGVycyhmaWx0ZXJBcnJheSkge1xyXG5cdHZhciBmaWx0ZXJzID0ge307XHJcblx0ZmlsdGVyQXJyYXkuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XHJcblx0XHRmaWx0ZXJzW2ZpbHRlci5maWVsZC5wYXRoXSA9IGZpbHRlci52YWx1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZmlsdGVycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNvcnRpbmcgc3RyaW5nIGZvciB0aGUgVVJJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSBzb3J0LnBhdGhzIFRoZSBwYXRocyB3ZSB3YW50IHRvIHNvcnRcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgQWxsIHRoZSBzb3J0aW5nIHF1ZXJpZXMgd2Ugd2FudCBhcyBhIHN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U29ydFN0cmluZyhzb3J0KSB7XHJcblx0cmV0dXJuIHNvcnQucGF0aHMubWFwKGkgPT4ge1xyXG5cdFx0Ly8gSWYgd2Ugd2FudCB0byBzb3J0IGludmVydGVkLCB3ZSBwcmVmaXggYSBcIi1cIiBiZWZvcmUgdGhlIHNvcnQgcGF0aFxyXG5cdFx0cmV0dXJuIGkuaW52ZXJ0ID8gJy0nICsgaS5wYXRoIDogaS5wYXRoO1xyXG5cdH0pLmZpbHRlcih0cnV0aHkpLmpvaW4oJywnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBhIHF1ZXJ5IHN0cmluZyBmcm9tIGEgYnVuY2ggb2Ygb3B0aW9uc1xyXG4gKi9cclxuZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvcHRpb25zKSB7XHJcblx0Y29uc3QgcXVlcnkgPSB7fTtcclxuXHRpZiAob3B0aW9ucy5zZWFyY2gpIHF1ZXJ5LnNlYXJjaCA9IG9wdGlvbnMuc2VhcmNoO1xyXG5cdGlmIChvcHRpb25zLmZpbHRlcnMubGVuZ3RoKSBxdWVyeS5maWx0ZXJzID0gSlNPTi5zdHJpbmdpZnkoZ2V0RmlsdGVycyhvcHRpb25zLmZpbHRlcnMpKTtcclxuXHRpZiAob3B0aW9ucy5jb2x1bW5zKSBxdWVyeS5maWVsZHMgPSBvcHRpb25zLmNvbHVtbnMubWFwKGkgPT4gaS5wYXRoKS5qb2luKCcsJyk7XHJcblx0aWYgKG9wdGlvbnMucGFnZSAmJiBvcHRpb25zLnBhZ2Uuc2l6ZSkgcXVlcnkubGltaXQgPSBvcHRpb25zLnBhZ2Uuc2l6ZTtcclxuXHRpZiAob3B0aW9ucy5wYWdlICYmIG9wdGlvbnMucGFnZS5pbmRleCA+IDEpIHF1ZXJ5LnNraXAgPSAob3B0aW9ucy5wYWdlLmluZGV4IC0gMSkgKiBvcHRpb25zLnBhZ2Uuc2l6ZTtcclxuXHRpZiAob3B0aW9ucy5zb3J0KSBxdWVyeS5zb3J0ID0gZ2V0U29ydFN0cmluZyhvcHRpb25zLnNvcnQpO1xyXG5cdHF1ZXJ5LmV4cGFuZFJlbGF0aW9uc2hpcEZpZWxkcyA9IHRydWU7XHJcblxyXG5cdC8vIEN1c3RvbSBGaWx0ZXIgdG8gRmV0Y2ggYWxsIFJlY29yZHMgV2hpbGUgU2VsZWN0aW5nIE1hbmFnZSBBbGxcclxuXHJcblx0aWYgKG9wdGlvbnMuZmlsdGVycy5mZXRjaF9hbGxfZGF0YSkge1xyXG5cdFx0cXVlcnkubGltaXQgPSBvcHRpb25zLmZpbHRlcnMuaXRlbV9jb3VudDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAnPycgKyBxcy5zdHJpbmdpZnkocXVlcnkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIGxpc3QgaGVscGVyIGNsYXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqL1xyXG5jb25zdCBMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHQvLyBUT0RPIHRoZXNlIG9wdGlvbnMgYXJlIHBvc3NpYmx5IHVudXNlZFxyXG5cdGFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuXHR0aGlzLmNvbHVtbnMgPSBnZXRDb2x1bW5zKHRoaXMpO1xyXG5cdHRoaXMuZXhwYW5kZWREZWZhdWx0Q29sdW1ucyA9IHRoaXMuZXhwYW5kQ29sdW1ucyh0aGlzLmRlZmF1bHRDb2x1bW5zKTtcclxuXHR0aGlzLmRlZmF1bHRDb2x1bW5QYXRocyA9IHRoaXMuZXhwYW5kZWREZWZhdWx0Q29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtGb3JtRGF0YX0gZm9ybURhdGEgVGhlIHN1Ym1pdHRlZCBmb3JtIGRhdGFcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB0aGUgQVBJIGNhbGxcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiAoZm9ybURhdGEsIGNhbGxiYWNrKSB7XHJcblx0eGhyKHtcclxuXHRcdHVybDogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9hcGkvJHt0aGlzLnBhdGh9L2NyZWF0ZWAsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHRib2R5OiBmb3JtRGF0YSxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSBjYWxsYmFjayhlcnIpO1xyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gTk9URTogeGhyIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHdpdGggYW4gRXJyb3IgaWZcclxuXHRcdFx0Ly8gIHRoZXJlIGlzIGFuIGVycm9yIGluIHRoZSBicm93c2VyIHRoYXQgcHJldmVudHNcclxuXHRcdFx0Ly8gIHNlbmRpbmcgdGhlIHJlcXVlc3QuIEEgSFRUUCA1MDAgcmVzcG9uc2UgaXMgbm90XHJcblx0XHRcdC8vICBnb2luZyB0byBjYXVzZSBhbiBlcnJvciB0byBiZSByZXR1cm5lZC5cclxuXHRcdFx0Y2FsbGJhY2soZGF0YSwgbnVsbCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlIGEgc3BlY2lmaWMgaXRlbVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gdXBkYXRlXHJcbiAqIEBwYXJhbSAge0Zvcm1EYXRhfSBmb3JtRGF0YSBUaGUgc3VibWl0dGVkIGZvcm0gZGF0YVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHRoZSBBUEkgY2FsbFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uIChpZCwgZm9ybURhdGEsIGNhbGxiYWNrKSB7XHJcblx0eGhyKHtcclxuXHRcdHVybDogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9hcGkvJHt0aGlzLnBhdGh9LyR7aWR9YCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGJvZHk6IGZvcm1EYXRhLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soZGF0YSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5leHBhbmRDb2x1bW5zID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0bGV0IG5hbWVJbmNsdWRlZCA9IGZhbHNlO1xyXG5cdGNvbnN0IGNvbHMgPSBsaXN0VG9BcnJheShpbnB1dCkubWFwKGkgPT4ge1xyXG5cdFx0Y29uc3Qgc3BsaXQgPSBpLnNwbGl0KCd8Jyk7XHJcblx0XHRsZXQgcGF0aCA9IHNwbGl0WzBdO1xyXG5cdFx0bGV0IHdpZHRoID0gc3BsaXRbMV07XHJcblx0XHRpZiAocGF0aCA9PT0gJ19fbmFtZV9fJykge1xyXG5cdFx0XHRwYXRoID0gdGhpcy5uYW1lUGF0aDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbcGF0aF07XHJcblx0XHRpZiAoIWZpZWxkKSB7XHJcblx0XHRcdC8vIFRPRE86IFN1cHBvcnQgYXJiaXRhcnkgZG9jdW1lbnQgcGF0aHNcclxuXHRcdFx0aWYgKCF0aGlzLmhpZGRlbikge1xyXG5cdFx0XHRcdGlmIChwYXRoID09PSB0aGlzLm5hbWVQYXRoKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYExpc3QgJHt0aGlzLmtleX0gZGlkIG5vdCBzcGVjaWZ5IGFueSBkZWZhdWx0IGNvbHVtbnMgb3IgYSBuYW1lIGZpZWxkYCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTGlzdCAke3RoaXMua2V5fSBzcGVjaWZpZWQgYW4gaW52YWxpZCBkZWZhdWx0IGNvbHVtbjogJHtwYXRofWApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAocGF0aCA9PT0gdGhpcy5uYW1lUGF0aCkge1xyXG5cdFx0XHRuYW1lSW5jbHVkZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmllbGQ6IGZpZWxkLFxyXG5cdFx0XHRsYWJlbDogZmllbGQubGFiZWwsXHJcblx0XHRcdHBhdGg6IGZpZWxkLnBhdGgsXHJcblx0XHRcdHR5cGU6IGZpZWxkLnR5cGUsXHJcblx0XHRcdHdpZHRoOiB3aWR0aCxcclxuXHRcdH07XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcblx0aWYgKCFuYW1lSW5jbHVkZWQpIHtcclxuXHRcdGNvbHMudW5zaGlmdCh7XHJcblx0XHRcdHR5cGU6ICdpZCcsXHJcblx0XHRcdGxhYmVsOiAnSUQnLFxyXG5cdFx0XHRwYXRoOiAnaWQnLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJldHVybiBjb2xzO1xyXG59O1xyXG5cclxuTGlzdC5wcm90b3R5cGUuZXhwYW5kU29ydCA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cdGNvbnN0IHNvcnQgPSB7XHJcblx0XHRyYXdJbnB1dDogaW5wdXQgfHwgdGhpcy5kZWZhdWx0U29ydCxcclxuXHRcdGlzRGVmYXVsdFNvcnQ6IGZhbHNlLFxyXG5cdH07XHJcblx0c29ydC5pbnB1dCA9IHNvcnQucmF3SW5wdXQ7XHJcblx0aWYgKHNvcnQuaW5wdXQgPT09ICdfX2RlZmF1bHRfXycpIHtcclxuXHRcdHNvcnQuaXNEZWZhdWx0U29ydCA9IHRydWU7XHJcblx0XHRzb3J0LmlucHV0ID0gdGhpcy5zb3J0YWJsZSA/ICdzb3J0T3JkZXInIDogdGhpcy5uYW1lUGF0aDtcclxuXHR9XHJcblx0c29ydC5wYXRocyA9IGxpc3RUb0FycmF5KHNvcnQuaW5wdXQpLm1hcChwYXRoID0+IHtcclxuXHRcdGxldCBpbnZlcnQgPSBmYWxzZTtcclxuXHRcdGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJy0nKSB7XHJcblx0XHRcdGludmVydCA9IHRydWU7XHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cigxKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhdGguY2hhckF0KDApID09PSAnKycpIHtcclxuXHRcdFx0cGF0aCA9IHBhdGguc3Vic3RyKDEpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1twYXRoXTtcclxuXHRcdGlmICghZmllbGQpIHtcclxuXHRcdFx0Ly8gVE9ETzogU3VwcG9ydCBhcmJpdGFyeSBkb2N1bWVudCBwYXRoc1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ0ludmFsaWQgU29ydCBzcGVjaWZpZWQ6JywgcGF0aCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpZWxkOiBmaWVsZCxcclxuXHRcdFx0dHlwZTogZmllbGQudHlwZSxcclxuXHRcdFx0bGFiZWw6IGZpZWxkLmxhYmVsLFxyXG5cdFx0XHRwYXRoOiBmaWVsZC5wYXRoLFxyXG5cdFx0XHRpbnZlcnQ6IGludmVydCxcclxuXHRcdH07XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcblx0cmV0dXJuIHNvcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9hZCBhIHNwZWNpZmljIGl0ZW0gdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIGl0ZW1JZCAgIFRoZSBpZCBvZiB0aGUgaXRlbSB3ZSB3YW50IHRvIGxvYWRcclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9wdGlvbnNcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5sb2FkSXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdGNhbGxiYWNrID0gb3B0aW9ucztcclxuXHRcdG9wdGlvbnMgPSBudWxsO1xyXG5cdH1cclxuXHRsZXQgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArICcvJyArIGl0ZW1JZDtcclxuXHRjb25zdCBxdWVyeSA9IHFzLnN0cmluZ2lmeShvcHRpb25zKTtcclxuXHRpZiAocXVlcnkubGVuZ3RoKSB1cmwgKz0gJz8nICsgcXVlcnk7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHQvLyBQYXNzIHRoZSBkYXRhIGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGFsbCBpdGVtcyBvZiBhIGxpc3QsIG9wdGlvbmFsbHkgcGFzc2luZyBvYmplY3RzIHRvIGJ1aWxkIGEgcXVlcnkgc3RyaW5nXHJcbiAqIGZvciBzb3J0aW5nIG9yIHNlYXJjaGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb3B0aW9uc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmxvYWRJdGVtcyA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyBidWlsZFF1ZXJ5U3RyaW5nKG9wdGlvbnMpO1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIGNhbGxiYWNrKGVycik7XHJcblx0XHQvLyBQYXNzIHRoZSBkYXRhIGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgZG93bmxvYWQgVVJMIHRvIGRvd25sb2FkIGEgbGlzdCB3aXRoIHRoZSBjdXJyZW50IHNvcnRpbmcsIGZpbHRlcmluZyxcclxuICogc2VsZWN0aW9uIGFuZCBzZWFyY2hpbmcgb3B0aW9uc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgIFRoZSBkb3dubG9hZCBVUkxcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmdldERvd25sb2FkVVJMID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoO1xyXG5cdGNvbnN0IHBhcnRzID0gW107XHJcblx0aWYgKG9wdGlvbnMuZm9ybWF0ICE9PSAnanNvbicpIHtcclxuXHRcdG9wdGlvbnMuZm9ybWF0ID0gJ2Nzdic7XHJcblx0fVxyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5zZWFyY2ggPyAnc2VhcmNoPScgKyBvcHRpb25zLnNlYXJjaCA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuZmlsdGVycy5sZW5ndGggPyAnZmlsdGVycz0nICsgSlNPTi5zdHJpbmdpZnkoZ2V0RmlsdGVycyhvcHRpb25zLmZpbHRlcnMpKSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuY29sdW1ucyA/ICdzZWxlY3Q9JyArIG9wdGlvbnMuY29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuc29ydCA/ICdzb3J0PScgKyBnZXRTb3J0U3RyaW5nKG9wdGlvbnMuc29ydCkgOiAnJyk7XHJcblx0cGFydHMucHVzaCgnZXhwYW5kUmVsYXRpb25zaGlwRmllbGRzPXRydWUnKTtcclxuXHRyZXR1cm4gdXJsICsgJy9leHBvcnQuJyArIG9wdGlvbnMuZm9ybWF0ICsgJz8nICsgcGFydHMuZmlsdGVyKHRydXRoeSkuam9pbignJicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBhIHNwZWNpZmljIGl0ZW0gdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIGl0ZW1JZCAgIFRoZSBpZCBvZiB0aGUgaXRlbSB3ZSB3YW50IHRvIGRlbGV0ZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmRlbGV0ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbUlkLCBjYWxsYmFjaykge1xyXG5cdHRoaXMuZGVsZXRlSXRlbXMoW2l0ZW1JZF0sIGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYXQgb25jZSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gICBpdGVtSWRzICBBbiBhcnJheSBvZiBpZHMgb2YgaXRlbXMgd2Ugd2FudCB0byBkZWxldGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5kZWxldGVJdGVtcyA9IGZ1bmN0aW9uIChpdGVtSWRzLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyAnL2RlbGV0ZSc7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGpzb246IHtcclxuXHRcdFx0aWRzOiBpdGVtSWRzLFxyXG5cdFx0fSxcclxuXHR9LCAoZXJyLCByZXNwLCBib2R5KSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGJvZHkgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBib2R5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGJvZHkpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuTGlzdC5wcm90b3R5cGUucmVvcmRlckl0ZW1zID0gZnVuY3Rpb24gKGl0ZW0sIG9sZFNvcnRPcmRlciwgbmV3U29ydE9yZGVyLCBwYWdlT3B0aW9ucywgY2FsbGJhY2spIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgJy8nICsgaXRlbS5pZCArICcvc29ydE9yZGVyLycgKyBvbGRTb3J0T3JkZXIgKyAnLycgKyBuZXdTb3J0T3JkZXIgKyAnLycgKyBidWlsZFF1ZXJ5U3RyaW5nKHBhZ2VPcHRpb25zKTtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdH0sIChlcnIsIHJlc3AsIGJvZHkpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ym9keSA9IEpTT04ucGFyc2UoYm9keSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvciBwYXJzaW5nIHJlc3VsdHMganNvbjonLCBlLCBib2R5KTtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gUGFzcyB0aGUgYm9keSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGJvZHkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soYm9keSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMaXN0O1xyXG4iLCJpbXBvcnQgdXJsIGZyb20gJ2Nsb3VkaW5hcnktbWljcm91cmwnO1xyXG5jb25zdCBDTE9VRF9OQU1FID0gd2luZG93LktleXN0b25lLmNsb3VkaW5hcnkuY2xvdWRfbmFtZTtcclxuXHJcbi8qXHJcblx0VGFrZSBhIGNsb3VkaW5hcnkgcHVibGljIGlkICsgb3B0aW9ucyBvYmplY3RcclxuXHRhbmQgcmV0dXJuIGEgdXJsXHJcbiovXHJcbmZ1bmN0aW9uIGNsb3VkaW5hcnlSZXNpemUgKHB1YmxpY0lkLCBvcHRpb25zID0ge30pIHtcclxuXHRpZiAoIXB1YmxpY0lkIHx8ICFDTE9VRF9OQU1FKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB1cmwocHVibGljSWQsIHtcclxuXHRcdGNsb3VkX25hbWU6IENMT1VEX05BTUUsIC8vIHNpbmdsZSBjbG91ZCBmb3IgdGhlIGFkbWluIFVJXHJcblx0XHRxdWFsaXR5OiA4MCwgLy8gODAlIHF1YWxpdHksIHdoaWNoIH5oYWx2ZXMgaW1hZ2UgZG93bmxvYWQgc2l6ZVxyXG5cdFx0Li4ub3B0aW9ucyxcclxuXHR9KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xvdWRpbmFyeVJlc2l6ZTtcclxuIiwiLyoqXHJcblx0VmFsaWRhdGUgSGV4XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBoZXhcclxuXHJcblx0MS4gcmVtb3ZlIGhhc2ggaWYgcHJlc2VudFxyXG5cdDIuIGNvbnZlcnQgZnJvbSAzIHRvIDYgZGlnaXQgY29sb3IgY29kZSAmIGVuc3VyZSB2YWxpZCBoZXhcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSGV4IChjb2xvcikge1xyXG5cdGNvbnN0IGhleCA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblxyXG5cdGlmIChoZXgubGVuZ3RoID09PSAzKSB7XHJcblx0XHRyZXR1cm4gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xyXG5cdH1cclxuXHRpZiAoaGV4Lmxlbmd0aCAhPT0gNikge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbG9yIHZhbHVlIHByb3ZpZGVkOiBcIiR7Y29sb3J9XCJgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBoZXg7XHJcbn07XHJcblxyXG4vKipcclxuXHRGYWRlIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIGEgaGV4aWRlY2ltYWwgY29sb3IsIGNvbnZlcnRzIGl0IHRvIFJHQiBhbmQgYXBwbGllcyBhbiBhbHBoYSB2YWx1ZS5cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBjb252ZXJ0IGhleCB0byBSR0JcclxuXHQyLiBjb21iaW5lIGFuZCBhZGQgYWxwaGEgY2hhbm5lbFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gZmFkZSAoY29sb3IsIG9wYWNpdHkgPSAxMDApIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBvcGFjaXR5IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpO1xyXG5cdGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XHJcblx0Y29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcclxuXHJcblx0Ly8gMi5cclxuXHRjb25zdCByZXN1bHQgPSAncmdiYSgnXHJcblx0XHQrIHIgKyAnLCdcclxuXHRcdCsgZyArICcsJ1xyXG5cdFx0KyBiICsgJywnXHJcblx0XHQrIGRlY2ltYWxGcmFjdGlvblxyXG5cdFx0KyAnKSc7XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0U2hhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBsaWdodGVucyBvciBkYXJrZW5zXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvclxyXG5cdEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBzaGFkZSAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRsZXQgZiA9IHBhcnNlSW50KGhleCwgMTYpO1xyXG5cdGxldCB0ID0gZGVjaW1hbEZyYWN0aW9uIDwgMCA/IDAgOiAyNTU7XHJcblx0bGV0IHAgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gZGVjaW1hbEZyYWN0aW9uICogLTEgOiBkZWNpbWFsRnJhY3Rpb247XHJcblxyXG5cdGNvbnN0IFIgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQiA9IGYgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIFIpICogcCkgKyBSKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBHKSAqIHApICsgRykgKiAweDEwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEIpICogcCkgKyBCKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLy8gc2hhZGUgaGVscGVyc1xyXG5jb25zdCBsaWdodGVuID0gc2hhZGU7XHJcbmZ1bmN0aW9uIGRhcmtlbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRyZXR1cm4gc2hhZGUoY29sb3IsIHBlcmNlbnQgKiAtMSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0QmxlbmQgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgdHdvIGhleGlkZWNpbWFsIGNvbG9ycyBhbmQgYmxlbmQgdGhlbSB0b2dldGhlclxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IxXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yMlxyXG5cdEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBibGVuZCAoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleDEgPSB2YWxpZGF0ZUhleChjb2xvcjEpO1xyXG5cdGNvbnN0IGhleDIgPSB2YWxpZGF0ZUhleChjb2xvcjIpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IGYgPSBwYXJzZUludChoZXgxLCAxNik7XHJcblx0Y29uc3QgdCA9IHBhcnNlSW50KGhleDIsIDE2KTtcclxuXHJcblx0Y29uc3QgUjEgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcxID0gZiA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIxID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHRjb25zdCBSMiA9IHQgPj4gMTY7XHJcblx0Y29uc3QgRzIgPSB0ID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjIgPSB0ICYgMHgwMDAwRkY7XHJcblxyXG5cdC8vIDIuXHJcblx0cmV0dXJuICcjJyArICgweDEwMDAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKFIyIC0gUjEpICogZGVjaW1hbEZyYWN0aW9uKSArIFIxKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEcyIC0gRzEpICogZGVjaW1hbEZyYWN0aW9uKSArIEcxKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChCMiAtIEIxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBCMSkpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YmxlbmQsXHJcblx0ZGFya2VuLFxyXG5cdGZhZGUsXHJcblx0bGlnaHRlbixcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb25jYXRlbmF0ZSBDbGFzc25hbWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gU3VwcG9ydCBjbGFzc05hbWUgYXMgYW4gYXJyYXk6XHJcbi8vIGZvcmNlIGNsYXNzbmFtZSBwcm9wIGludG8gYW4gYXJyYXkgKHBvc3NpYmx5IG9mIGFycmF5cykgdGhlbiBmbGF0dGVuXHJcblxyXG4vKlxyXG5cdC8vIFRvIHVzZSBzcHJlYWQgdGhlIG5ldyBhcnJheSBpbnRvIGFwaHJvZGl0ZSdzIGBjc3NgIGZ1bmN0aW9uXHJcblxyXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5jb21wb25lbnQsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoY2xhc3NOYW1lKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH07XHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNhdENsYXNzbmFtZXMgKGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBbY2xhc3NOYW1lXS5yZWR1Y2UoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhLmNvbmNhdChiKTtcclxuXHR9LCBbXSk7XHJcbn07XHJcbiIsIi8qKlxyXG5cdExpbmVhciBHcmFkaWVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYWRkaW5nIGEgbGluZWFyIGdyYWRpZW50IHRvIHlvdXIgY29tcG9uZW50LlxyXG5cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBzaWRlT3JDb3JuZXJcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSB0b3BcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBib3R0b21cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBiYXNlIChvcHRpb25hbClcclxuXHQtIEByZXR1cm5zIHtPYmplY3R9IGNzcyBsaW5lYXIgZ3JhZGllbnQgZGVjbGFyYXRpb25cclxuXHJcblx0U3ByZWFkIHRoZSBkZWNsYXJhdGlvbiBpbnRvIHlvdXIgY29tcG9uZW50IGNsYXNzOlxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRteUNvbXBvbmVudENsYXNzOiB7XHJcblx0XHQuLi5saW5lYXJHcmFkaWVudChyZWQsIGJsdWUpLFxyXG5cdH1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGxpbmVhckdyYWRpZW50IChkaXJlY3Rpb24sIHRvcCwgYm90dG9tLCBiYXNlID0gJycpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2RpcmVjdGlvbn0sICR7dG9wfSAwJSwgJHtib3R0b219IDEwMCUpICR7YmFzZX1gLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIFZlcnRpY2FsIEdyYWRpZW50XHJcbmZ1bmN0aW9uIGdyYWRpZW50VmVydGljYWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byBib3R0b20nLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8vIEhvcml6b250YWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRIb3Jpem9udGFsICh0b3AsIGJvdHRvbSwgYmFzZSkge1xyXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudCgndG8gcmlnaHQnLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8qKlxyXG5cdEJvcmRlciBSYWRpdXNcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0U2hvcnQtaGFuZCBoZWxwZXIgZm9yIGJvcmRlciByYWRpaVxyXG4qL1xyXG5cclxuLy8gdG9wXHJcbmZ1bmN0aW9uIGJvcmRlclRvcFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gcmlnaHRcclxuZnVuY3Rpb24gYm9yZGVyUmlnaHRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBib3R0b21cclxuZnVuY3Rpb24gYm9yZGVyQm90dG9tUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBsZWZ0XHJcbmZ1bmN0aW9uIGJvcmRlckxlZnRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gUmV0dXJuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRib3JkZXJUb3BSYWRpdXMsXHJcblx0Ym9yZGVyUmlnaHRSYWRpdXMsXHJcblx0Ym9yZGVyQm90dG9tUmFkaXVzLFxyXG5cdGJvcmRlckxlZnRSYWRpdXMsXHJcblxyXG5cdGdyYWRpZW50SG9yaXpvbnRhbCxcclxuXHRncmFkaWVudFZlcnRpY2FsLFxyXG59O1xyXG4iLCIvKipcclxuICogRXhwb3J0cyBhbiBvYmplY3Qgb2YgbGlzdHMsIGtleWVkIHdpdGggdGhlaXIga2V5IGluc3RlYWQgb2YgdGhlaXIgbmFtZSBhbmRcclxuICogd3JhcHBlZCB3aXRoIHRoZSBMaXN0IGhlbHBlciAoLi9MaXN0LmpzKVxyXG4gKi9cclxuXHJcbmltcG9ydCBMaXN0IGZyb20gJy4vTGlzdCc7XHJcblxyXG5leHBvcnRzLmxpc3RzQnlLZXkgPSB7fTtcclxuZXhwb3J0cy5saXN0c0J5UGF0aCA9IHt9O1xyXG5cclxuZm9yIChjb25zdCBrZXkgaW4gS2V5c3RvbmUubGlzdHMpIHtcclxuXHQvLyBHdWFyZCBmb3ItaW5zXHJcblx0aWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoS2V5c3RvbmUubGlzdHMsIGtleSkpIHtcclxuXHRcdHZhciBsaXN0ID0gbmV3IExpc3QoS2V5c3RvbmUubGlzdHNba2V5XSk7XHJcblx0XHRleHBvcnRzLmxpc3RzQnlLZXlba2V5XSA9IGxpc3Q7XHJcblx0XHRleHBvcnRzLmxpc3RzQnlQYXRoW2xpc3QucGF0aF0gPSBsaXN0O1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQSBmZXcgaGVscGVyIG1ldGhvZHMgZm9yIHN0cmluZ3NcclxuICovXHJcblxyXG5pbXBvcnQgaW5mbGVjdCBmcm9tICdpJztcclxuaW1wb3J0IHsgY29tcGFjdCwgc2l6ZSB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBvZiBhIHN0cmluZyBiYXNlZCBvbiBhIG51bWJlclxyXG4gKiBvciBudW1iZXIgb2YgaXRlbXMgaW4gYW4gYXJyYXkuXHJcbiAqXHJcbiAqIElmIGFyaXR5IGlzIDEsIHJldHVybnMgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSB3b3JkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY291bnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNpbmd1bGFyIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGx1cmFsIHN0cmluZ1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHNpbmd1bGFyIG9yIHBsdXJhbCwgKiBpcyByZXBsYWNlZCB3aXRoIGNvdW50XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5wbHVyYWwgPSBmdW5jdGlvbiAoY291bnQsIHNuLCBwbCkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRyZXR1cm4gaW5mbGVjdC5wbHVyYWxpemUoY291bnQpO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIHNuICE9PSAnc3RyaW5nJykgc24gPSAnJztcclxuXHRpZiAoIXBsKSB7XHJcblx0XHRwbCA9IGluZmxlY3QucGx1cmFsaXplKHNuKTtcclxuXHR9XHJcblx0aWYgKHR5cGVvZiBjb3VudCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdGNvdW50ID0gTnVtYmVyKGNvdW50KTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBjb3VudCAhPT0gJ251bWJlcicpIHtcclxuXHRcdGNvdW50ID0gc2l6ZShjb3VudCk7XHJcblx0fVxyXG5cdHJldHVybiAoY291bnQgPT09IDEgPyBzbiA6IHBsKS5yZXBsYWNlKCcqJywgY291bnQpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgbGV0dGVyIGluIGEgc3RyaW5nIHRvIHVwcGVyY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gU3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy51cGNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHJldHVybiAoc3RyLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBsZXR0ZXIgaW4gYSBzdHJpbmcgdG8gbG93ZXJjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBTdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBzdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLmRvd25jYXNlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdGlmIChzdHIgJiYgc3RyLnRvU3RyaW5nKSBzdHIgPSBzdHIudG9TdHJpbmcoKTtcclxuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycgfHwgIXN0ci5sZW5ndGgpIHJldHVybiAnJztcclxuXHRyZXR1cm4gKHN0ci5zdWJzdHIoMCwgMSkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHIoMSkpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byB0aXRsZSBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBUaXRsZSBDYXNlIGZvcm0gb2Ygc3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy50aXRsZWNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEgJDInKTtcclxuXHR2YXIgcGFydHMgPSBzdHIuc3BsaXQoL1xcc3xffFxcLS8pO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChwYXJ0c1tpXSAmJiAhL15bQS1aMC05XSskLy50ZXN0KHBhcnRzW2ldKSkge1xyXG5cdFx0XHRwYXJ0c1tpXSA9IGV4cG9ydHMudXBjYXNlKHBhcnRzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGNvbXBhY3QocGFydHMpLmpvaW4oJyAnKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gY2FtZWwgY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbG93ZXJjYXNlRmlyc3RXb3JkXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gY2FtZWwtY2FzZSBmb3JtIG9mIHN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMuY2FtZWxjYXNlID0gZnVuY3Rpb24gKHN0ciwgbGMpIHtcclxuXHRyZXR1cm4gaW5mbGVjdC5jYW1lbGl6ZShzdHIsICEobGMpKTtcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgZGFya2VuLCBmYWRlIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2NvbG9yJztcclxuaW1wb3J0IEUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L2NvbnN0YW50cyc7XHJcblxyXG52YXIgQ2hlY2tib3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDaGVja2JveCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRyZWFkb25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29tcG9uZW50OiAnYnV0dG9uJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWN0aXZlOiBudWxsLFxyXG5cdFx0XHRmb2N1czogbnVsbCxcclxuXHRcdFx0aG92ZXI6IG51bGwsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLCBmYWxzZSk7XHJcblx0fSxcclxuXHRnZXRTdHlsZXMgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGVja2VkLCByZWFkb25seSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgYWN0aXZlLCBmb2N1cywgaG92ZXIgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3QgY2hlY2tlZENvbG9yID0gJyMzOTk5ZmMnO1xyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGNoZWNrZWRDb2xvciA6ICd3aGl0ZSc7XHJcblx0XHRsZXQgYm9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4xNSkgcmdiYSgwLDAsMCwwLjEpIHJnYmEoMCwwLDAsMC4wNSknIDogJ3JnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMikgcmdiYSgwLDAsMCwwLjE1KSc7XHJcblx0XHRsZXQgYm94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICcwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4zMyknIDogJ2luc2V0IDAgMXB4IDAgcmdiYSgwLDAsMCwwLjA2KSc7XHJcblx0XHRsZXQgY29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3doaXRlJyA6ICcjYmJiJztcclxuXHRcdGNvbnN0IHRleHRTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjIpJyA6IG51bGw7XHJcblxyXG5cdFx0Ly8gcHNldWRvIHN0YXRlXHJcblx0XHRpZiAoaG92ZXIgJiYgIWZvY3VzICYmICFyZWFkb25seSkge1xyXG5cdFx0XHRib3JkZXJDb2xvciA9IChjaGVja2VkKSA/ICdyZ2JhKDAsMCwwLDAuMSkgcmdiYSgwLDAsMCwwLjE1KSByZ2JhKDAsMCwwLDAuMiknIDogJ3JnYmEoMCwwLDAsMC4zNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4yNSknO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZSkge1xyXG5cdFx0XHRiYWNrZ3JvdW5kID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGRhcmtlbihjaGVja2VkQ29sb3IsIDIwKSA6ICcjZWVlJztcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4yNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4zNSknIDogJ3JnYmEoMCwwLDAsMC40KSByZ2JhKDAsMCwwLDAuMzUpIHJnYmEoMCwwLDAsMC4zKSc7XHJcblx0XHRcdGJveFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuMzMpJyA6ICdpbnNldCAwIDFweCAzcHggcmdiYSgwLDAsMCwwLjIpJztcclxuXHRcdH1cclxuXHRcdGlmIChmb2N1cyAmJiAhYWN0aXZlKSB7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICdyZ2JhKDAsMCwwLDAuMjUpIHJnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMzUpJyA6IGNoZWNrZWRDb2xvcjtcclxuXHRcdFx0Ym94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGAwIDAgMCAzcHggJHtmYWRlKGNoZWNrZWRDb2xvciwgMTUpfWAgOiBgaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4xNSksIDAgMCAwIDNweCAke2ZhZGUoY2hlY2tlZENvbG9yLCAxNSl9YDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBub2VkaXRcclxuXHRcdGlmIChyZWFkb25seSkge1xyXG5cdFx0XHRiYWNrZ3JvdW5kID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC41KSc7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gJ3JnYmEoMCwwLDAsMC4xKSc7XHJcblx0XHRcdGJveFNoYWRvdyA9ICdub25lJztcclxuXHRcdFx0Y29sb3IgPSBjaGVja2VkID8gY2hlY2tlZENvbG9yIDogJyNiYmInO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0XHRiYWNrZ3JvdW5kOiBiYWNrZ3JvdW5kLFxyXG5cdFx0XHRib3JkZXI6ICcxcHggc29saWQnLFxyXG5cdFx0XHRib3JkZXJDb2xvcjogYm9yZGVyQ29sb3IsXHJcblx0XHRcdGJvcmRlclJhZGl1czogRS5ib3JkZXJSYWRpdXMuc20sXHJcblx0XHRcdGJveFNoYWRvdzogYm94U2hhZG93LFxyXG5cdFx0XHRjb2xvcjogY29sb3IsXHJcblx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRmb250U2l6ZTogMTQsXHJcblx0XHRcdGhlaWdodDogMTYsXHJcblx0XHRcdGxpbmVIZWlnaHQ6ICcxNXB4JyxcclxuXHRcdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdFx0XHRwYWRkaW5nOiAwLFxyXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdFx0XHR0ZXh0U2hhZG93OiB0ZXh0U2hhZG93LFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdFx0d2lkdGg6IDE2LFxyXG5cclxuXHRcdFx0bXNUcmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdFx0TW96VHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHRcdFdlYmtpdFRyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0XHR0cmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRoYW5kbGVLZXlEb3duIChlKSB7XHJcblx0XHRpZiAoZS5rZXlDb2RlICE9PSAzMikgcmV0dXJuO1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUodHJ1ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVLZXlVcCAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZShmYWxzZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZU92ZXIgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVIb3Zlcih0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlRG93biAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZSh0cnVlKTtcclxuXHRcdHRoaXMudG9nZ2xlRm9jdXModHJ1ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZVVwICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKGZhbHNlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlT3V0ICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlSG92ZXIoZmFsc2UpO1xyXG5cdH0sXHJcblx0dG9nZ2xlQWN0aXZlIChwc2V1ZG8pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBhY3RpdmU6IHBzZXVkbyB9KTtcclxuXHR9LFxyXG5cdHRvZ2dsZUhvdmVyIChwc2V1ZG8pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBob3ZlcjogcHNldWRvIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlRm9jdXMgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGZvY3VzOiBwc2V1ZG8gfSk7XHJcblx0fSxcclxuXHRoYW5kbGVDaGFuZ2UgKCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSghdGhpcy5wcm9wcy5jaGVja2VkKTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoZWNrZWQsIHJlYWRvbmx5IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjaGVja2VkJywgJ2NvbXBvbmVudCcsICdvbkNoYW5nZScsICdyZWFkb25seScpO1xyXG5cdFx0cHJvcHMuc3R5bGUgPSB0aGlzLmdldFN0eWxlcygpO1xyXG5cdFx0cHJvcHMucmVmID0gJ2NoZWNrYm94JztcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ29jdGljb24nLCB7XHJcblx0XHRcdCdvY3RpY29uLWNoZWNrJzogY2hlY2tlZCxcclxuXHRcdFx0J29jdGljb24teCc6ICh0eXBlb2YgY2hlY2tlZCA9PT0gJ2Jvb2xlYW4nKSAmJiAhY2hlY2tlZCAmJiByZWFkb25seSxcclxuXHRcdH0pO1xyXG5cdFx0cHJvcHMudHlwZSA9IHJlYWRvbmx5ID8gbnVsbCA6ICdidXR0b24nO1xyXG5cclxuXHRcdHByb3BzLm9uS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bjtcclxuXHRcdHByb3BzLm9uS2V5VXAgPSB0aGlzLmhhbmRsZUtleVVwO1xyXG5cclxuXHRcdHByb3BzLm9uTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd247XHJcblx0XHRwcm9wcy5vbk1vdXNlVXAgPSB0aGlzLmhhbmRsZU1vdXNlVXA7XHJcblx0XHRwcm9wcy5vbk1vdXNlT3ZlciA9IHRoaXMuaGFuZGxlTW91c2VPdmVyO1xyXG5cdFx0cHJvcHMub25Nb3VzZU91dCA9IHRoaXMuaGFuZGxlTW91c2VPdXQ7XHJcblxyXG5cdFx0cHJvcHMub25DbGljayA9IHJlYWRvbmx5ID8gbnVsbCA6IHRoaXMuaGFuZGxlQ2hhbmdlO1xyXG5cdFx0cHJvcHMub25Gb2N1cyA9IHJlYWRvbmx5ID8gbnVsbCA6ICgpID0+IHRoaXMudG9nZ2xlRm9jdXModHJ1ZSk7XHJcblx0XHRwcm9wcy5vbkJsdXIgPSByZWFkb25seSA/IG51bGwgOiAoKSA9PiB0aGlzLnRvZ2dsZUZvY3VzKGZhbHNlKTtcclxuXHJcblx0XHRjb25zdCBub2RlID0gcmVhZG9ubHkgPyAnc3BhbicgOiB0aGlzLnByb3BzLmNvbXBvbmVudDtcclxuXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChub2RlLCBwcm9wcyk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vLyBOT1RFIG1hcmdpbkJvdHRvbSBvZiAxcHggc3RvcHMgdGhpbmdzIGp1bXBpbmcgYXJvdW5kXHJcbi8vIFRPRE8gZmluZCBvdXQgd2h5IHRoaXMgaXMgbmVjZXNzYXJ5XHJcblxyXG5mdW5jdGlvbiBDb2xsYXBzZWRGaWVsZExhYmVsICh7IHN0eWxlLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3QgX19zdHlsZV9fID0ge1xyXG5cdFx0bWFyZ2luQm90dG9tOiAxLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDAsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDAsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB2YXJpYW50PVwibGlua1wiIHN0eWxlPXtfX3N0eWxlX199IHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb2xsYXBzZWRGaWVsZExhYmVsO1xyXG4iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBEYXlQaWNrZXIgZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBvcG91dCBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9Qb3BvdXQnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5sZXQgbGFzdElkID0gMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUlucHV0JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZvcm1hdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRcdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Y29uc3QgaWQgPSArK2xhc3RJZDtcclxuXHRcdGxldCBtb250aCA9IG5ldyBEYXRlKCk7XHJcblx0XHRjb25zdCB7IGZvcm1hdCwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAobW9tZW50KHZhbHVlLCBmb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRtb250aCA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGlkOiBgX0RhdGVJbnB1dF8ke2lkfWAsXHJcblx0XHRcdG1vbnRoOiBtb250aCxcclxuXHRcdFx0cGlja2VySXNPcGVuOiBmYWxzZSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogdmFsdWUsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5zaG93Q3VycmVudE1vbnRoKCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV3UHJvcHMpIHtcclxuXHRcdGlmIChuZXdQcm9wcy52YWx1ZSA9PT0gdGhpcy5wcm9wcy52YWx1ZSkgcmV0dXJuO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdG1vbnRoOiBtb21lbnQobmV3UHJvcHMudmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0KS50b0RhdGUoKSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogbmV3UHJvcHMudmFsdWUsXHJcblx0XHR9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlZnMuaW5wdXQpIHJldHVybjtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5pbnB1dCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChlKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiB2YWx1ZSB9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGUpIHtcclxuXHRcdGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdC8vIElmIHRoZSBkYXRlIGlzIHN0cmljdGx5IGVxdWFsIHRvIHRoZSBmb3JtYXQgc3RyaW5nLCBkaXNwYXRjaCBvbkNoYW5nZVxyXG5cdFx0XHRpZiAobW9tZW50KHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlIH0pO1xyXG5cdFx0XHQvLyBJZiB0aGUgZGF0ZSBpcyBub3Qgc3RyaWN0bHkgZXF1YWwsIG9ubHkgY2hhbmdlIHRoZSB0YWIgdGhhdCBpcyBkaXNwbGF5ZWRcclxuXHRcdFx0fSBlbHNlIGlmIChtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRtb250aDogbW9tZW50KHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQpLnRvRGF0ZSgpLFxyXG5cdFx0XHRcdH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZURheVNlbGVjdCAoZSwgZGF0ZSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdHZhciB2YWx1ZSA9IG1vbWVudChkYXRlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpO1xyXG5cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZSB9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRwaWNrZXJJc09wZW46IGZhbHNlLFxyXG5cdFx0XHRtb250aDogZGF0ZSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3dQaWNrZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBpY2tlcklzT3BlbjogdHJ1ZSB9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0c2hvd0N1cnJlbnRNb250aCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVmcy5waWNrZXIpIHJldHVybjtcclxuXHRcdHRoaXMucmVmcy5waWNrZXIuc2hvd01vbnRoKHRoaXMuc3RhdGUubW9udGgpO1xyXG5cdH0sXHJcblx0aGFuZGxlRm9jdXMgKGUpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlLnBpY2tlcklzT3BlbikgcmV0dXJuO1xyXG5cdFx0dGhpcy5zaG93UGlja2VyKCk7XHJcblx0fSxcclxuXHRoYW5kbGVDYW5jZWwgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBpY2tlcklzT3BlbjogZmFsc2UgfSk7XHJcblx0fSxcclxuXHRoYW5kbGVCbHVyIChlKSB7XHJcblx0XHRsZXQgcnQgPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS5uYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0O1xyXG5cdFx0Y29uc3QgcG9wb3V0ID0gdGhpcy5yZWZzLnBvcG91dC5nZXRQb3J0YWxET01Ob2RlKCk7XHJcblx0XHR3aGlsZSAocnQpIHtcclxuXHRcdFx0aWYgKHJ0ID09PSBwb3BvdXQpIHJldHVybjtcclxuXHRcdFx0cnQgPSBydC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHBpY2tlcklzT3BlbjogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBzZWxlY3RlZERheSA9IHRoaXMucHJvcHMudmFsdWU7XHJcblx0XHQvLyByZWFjdC1kYXktcGlja2VyIGFkZHMgYSBjbGFzcyB0byB0aGUgc2VsZWN0ZWQgZGF5IGJhc2VkIG9uIHRoaXNcclxuXHRcdGNvbnN0IG1vZGlmaWVycyA9IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChkYXkpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCkgPT09IHNlbGVjdGVkRGF5LFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRpZD17dGhpcy5zdGF0ZS5pZH1cclxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cclxuXHRcdFx0XHRcdG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxyXG5cdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5oYW5kbGVLZXlQcmVzc31cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmZvcm1hdH1cclxuXHRcdFx0XHRcdHJlZj1cImlucHV0XCJcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLmlucHV0VmFsdWV9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8UG9wb3V0XHJcblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUucGlja2VySXNPcGVufVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e3RoaXMuaGFuZGxlQ2FuY2VsfVxyXG5cdFx0XHRcdFx0cmVmPVwicG9wb3V0XCJcclxuXHRcdFx0XHRcdHJlbGF0aXZlVG9JRD17dGhpcy5zdGF0ZS5pZH1cclxuXHRcdFx0XHRcdHdpZHRoPXsyNjB9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdG1vZGlmaWVycz17bW9kaWZpZXJzfVxyXG5cdFx0XHRcdFx0XHRvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheVNlbGVjdH1cclxuXHRcdFx0XHRcdFx0cmVmPVwicGlja2VyXCJcclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9ey0xfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L1BvcG91dD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCB7IGZhZGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIEZpbGVDaGFuZ2VNZXNzYWdlICh7IHN0eWxlLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdG1hcmdpblJpZ2h0OiAxMCxcclxuXHRcdG1pbldpZHRoOiAwLFxyXG5cdFx0Li4uc3R5bGUsXHJcblx0fTtcclxuXHJcblx0aWYgKGNvbG9yICE9PSAnZGVmYXVsdCcpIHtcclxuXHRcdHN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IgPSBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTApO1xyXG5cdFx0c3R5bGVzLmJvcmRlckNvbG9yID0gZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDMwKTtcclxuXHRcdHN0eWxlcy5jb2xvciA9IHRoZW1lLmNvbG9yW2NvbG9yXTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdG5vZWRpdFxyXG5cdFx0XHRzdHlsZT17c3R5bGVzfVxyXG5cdFx0XHR7Li4ucHJvcHN9XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5GaWxlQ2hhbmdlTWVzc2FnZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihbJ2RhbmdlcicsICdkZWZhdWx0JywgJ3N1Y2Nlc3MnXSksXHJcbn07XHJcbkZpbGVDaGFuZ2VNZXNzYWdlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWxlQ2hhbmdlTWVzc2FnZTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLypcclxuXHRFeHBvc2UgaW50ZXJuYWwgcmVmIHRvIHBhcmVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEZpZWxkLmNyZWF0ZSh7XHJcblx0XHR0cmlnZ2VyRmlsZUJyb3dzZXIgKCkge1xyXG5cdFx0XHR0aGlzLnJlZnMuZmlsZUlucHV0LmNsaWNrRG9tTm9kZSgpO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlciAoKSB7XHJcblx0XHRcdDxIaWRkZW5GaWxlSW5wdXQgcmVmPVwiZmlsZUlucHV0XCIgLz5cclxuXHRcdH1cclxuXHR9KTtcclxuKi9cclxuXHJcbmNsYXNzIEhpZGRlbkZpbGVJbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmNsZWFyVmFsdWUgPSB0aGlzLmNsZWFyVmFsdWUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2xpY2tEb21Ob2RlID0gdGhpcy5jbGlja0RvbU5vZGUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFzVmFsdWUgPSB0aGlzLmhhc1ZhbHVlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdGNsZWFyVmFsdWUgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQudmFsdWUgPSAnJztcclxuXHR9XHJcblx0Y2xpY2tEb21Ob2RlICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmNsaWNrKCk7XHJcblx0fVxyXG5cdGhhc1ZhbHVlICgpIHtcclxuXHRcdHJldHVybiAhIXRoaXMudGFyZ2V0LnZhbHVlO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBzdHlsZSwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBzZXRSZWYgPSAobikgPT4gKHRoaXMudGFyZ2V0ID0gbik7XHJcblx0XHRjb25zdCBzdHlsZXMgPSB7XHJcblx0XHRcdGxlZnQ6IC05OTk5LFxyXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdFx0Li4uc3R5bGUsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0XHRzdHlsZT17c3R5bGVzfVxyXG5cdFx0XHRcdHJlZj17c2V0UmVmfVxyXG5cdFx0XHRcdHRhYkluZGV4PVwiLTFcIlxyXG5cdFx0XHRcdHR5cGU9XCJmaWxlXCJcclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuSGlkZGVuRmlsZUlucHV0LnByb3BUeXBlcyA9IHtcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGlkZGVuRmlsZUlucHV0O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3RoZW1lJztcclxuXHJcbi8vIEZJWE1FIHN0YXRpYyBvY3RpY29uIGNsYXNzZXMgbGVhbmluZyBvbiBFbGVtZW50YWwgdG8gYXZvaWQgZHVwbGljYXRlXHJcbi8vIGZvbnQgYW5kIENTUzsgaW5mbGF0aW5nIHRoZSBwcm9qZWN0IHNpemVcclxuXHJcbmNvbnN0IElDT05fTUFQID0ge1xyXG5cdGxvYWRpbmc6ICcnLFxyXG5cdHJlbW92ZTogJ21lZ2Etb2N0aWNvbiBvY3RpY29uLXRyYXNoY2FuJyxcclxuXHR1cGxvYWQ6ICdtZWdhLW9jdGljb24gb2N0aWNvbi1jbG91ZC11cGxvYWQnLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gSW1hZ2VUaHVtYm5haWwgKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgY29tcG9uZW50LCBtYXNrLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3QgbWFza1VJID0gbWFzayA/IChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5tYXNrKSArIGAgJHtJQ09OX01BUFttYXNrXX1gfT5cclxuXHRcdFx0e21hc2sgPT09ICdsb2FkaW5nJ1xyXG5cdFx0XHRcdD8gPFNwaW5uZXIgY29sb3I9XCJpbnZlcnRlZFwiIC8+XHJcblx0XHRcdFx0OiBudWxsfVxyXG5cdFx0PC9kaXY+XHJcblx0KSA6IG51bGw7XHJcblxyXG5cdC8vIGFwcGx5IGhvdmVyIGFuZCBmb2N1cyBzdHlsZXMgb25seSB3aGVuIHVzaW5nIGFuIGFuY2hvclxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNvbXBvbmVudCA9PT0gJ2EnID8gY2xhc3Nlcy5hbmNob3IgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0Ly8gYXBwZW5kIHRoZSBtYXNrIFVJIHRvIGNoaWxkcmVuXHJcblx0cHJvcHMuY2hpbGRyZW4gPSBbXS5jb25jYXQoY2hpbGRyZW4sIFttYXNrVUldKTtcclxuXHJcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn07XHJcblxyXG5JbWFnZVRodW1ibmFpbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRtYXNrOiBQcm9wVHlwZXMub25lT2YoWydsb2FkaW5nJywgJ3JlbW92ZScsICd1cGxvYWQnXSksXHJcbn07XHJcbkltYWdlVGh1bWJuYWlsLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuY29uc3QgR1VUVEVSX1dJRFRIID0gNDtcclxuY29uc3QgaG92ZXJBbmRGb2N1c1N0eWxlcyA9IHtcclxuXHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxufTtcclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRiYXNlOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHR9YCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMScsXHJcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxyXG5cdFx0cGFkZGluZzogR1VUVEVSX1dJRFRILFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHRhbmNob3I6IHtcclxuXHRcdCc6aG92ZXInOiBob3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Li4uaG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gbWFza1xyXG5cdG1hc2s6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcclxuXHRcdGJvdHRvbTogR1VUVEVSX1dJRFRILFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0XHRsZWZ0OiBHVVRURVJfV0lEVEgsXHJcblx0XHRsaW5lSGVpZ2h0OiA5MCxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0cmlnaHQ6IEdVVFRFUl9XSURUSCxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR0b3A6IEdVVFRFUl9XSURUSCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbWFnZVRodW1ibmFpbDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5mdW5jdGlvbiBJdGVtc1RhYmxlQ2VsbCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjbGFzc25hbWVzKCdJdGVtTGlzdF9fY29sJywgY2xhc3NOYW1lKTtcclxuXHJcblx0cmV0dXJuIDx0ZCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1RhYmxlQ2VsbDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5cclxuZnVuY3Rpb24gSXRlbXNUYWJsZVZhbHVlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudCxcclxuXHRlbXB0eSxcclxuXHRleHRlcmlvcixcclxuXHRmaWVsZCxcclxuXHRocmVmLFxyXG5cdGludGVyaW9yLFxyXG5cdHBhZGRlZCxcclxuXHR0byxcclxuXHR0cnVuY2F0ZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gVE9ETyByZW1vdmUgaW4gdGhlIG5leHQgcmVsZWFzZVxyXG5cdGlmIChocmVmKSB7XHJcblx0XHRjb25zb2xlLndhcm4oJ0l0ZW1zVGFibGVWYWx1ZTogYGhyZWZgIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiB0aGUgbmV4dCByZWxlYXNlLCB1c2UgYHRvYC4nKTtcclxuXHR9XHJcblx0Y29uc3QgbGlua1JlZiA9IHRvIHx8IGhyZWY7XHJcblx0Y29uc3QgQ29tcG9uZW50ID0gbGlua1JlZiA/IExpbmsgOiBjb21wb25lbnQ7XHJcblxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ0l0ZW1MaXN0X192YWx1ZScsIChcclxuXHRcdGZpZWxkID8gYEl0ZW1MaXN0X192YWx1ZS0tJHtmaWVsZH1gIDogbnVsbFxyXG5cdCksIHtcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tZW1wdHknOiBlbXB0eSxcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tZXh0ZXJpb3InOiBsaW5rUmVmICYmIGV4dGVyaW9yLFxyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1pbnRlcmlvcic6IGxpbmtSZWYgJiYgaW50ZXJpb3IsXHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLXBhZGRlZCc6IGxpbmtSZWYgJiYgcGFkZGVkLFxyXG5cdFx0J0l0ZW1MaXN0X192YWx1ZS0tdHJ1bmNhdGUnOiB0cnVuY2F0ZSxcclxuXHR9LCBjbGFzc05hbWUpO1xyXG5cdHByb3BzLnRvID0gbGlua1JlZjtcclxuXHRwcm9wcy50aXRsZSA9IHByb3BzLmNoaWxkcmVuO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuSXRlbXNUYWJsZVZhbHVlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGVtcHR5OiBQcm9wVHlwZXMuYm9vbCxcclxuXHRleHRlcmlvcjogUHJvcFR5cGVzLmJvb2wsIC8vIEZJWE1FIHRoaXMgc2hvdWxkIGJlIFwiZXh0ZXJuYWxcIiBlLmcuIGFuIGV4dGVybmFsIGxpbmtcclxuXHRmaWVsZDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBUT0RPIHJlbW92ZSBpbiBuZXh0IHJlbGVhc2VcclxuXHRpbnRlcmlvcjogUHJvcFR5cGVzLmJvb2wsIC8vIEZJWE1FIHRoaXMgc2hvdWxkIGJlIFwiaW50ZXJuYWxcIiBlLmcuIGFuIGludGVybmFsIGxpbmtcclxuXHRwYWRkZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdHRvOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHRydW5jYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuSXRlbXNUYWJsZVZhbHVlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdHRydW5jYXRlOiB0cnVlLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1RhYmxlVmFsdWU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJTUFHRV9TSVpFID0gMTg7XHJcblxyXG5jb25zdCBsaW5rU3R5bGUgPSB7XHJcblx0bWFyZ2luUmlnaHQ6IDgsXHJcbn07XHJcbmNvbnN0IGJveFN0eWxlID0ge1xyXG5cdGJvcmRlclJhZGl1czogMyxcclxuXHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRoZWlnaHQ6IElNQUdFX1NJWkUsXHJcblx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdHdpZHRoOiBJTUFHRV9TSVpFLFxyXG59O1xyXG5jb25zdCBpbWFnZVN0eWxlID0ge1xyXG5cdGRpc3BsYXk6ICdibG9jaycsXHJcblx0aGVpZ2h0OiBJTUFHRV9TSVpFLFxyXG5cdGxlZnQ6ICc1MCUnLFxyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cclxuXHRXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRNb3pUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRtc1RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG59O1xyXG5jb25zdCB0ZXh0U3R5bGUgPSB7XHJcblx0Y29sb3I6ICcjODg4JyxcclxuXHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRmb250U2l6ZTogJy44cmVtJyxcclxuXHRtYXJnaW5MZWZ0OiA4LFxyXG5cdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG59O1xyXG5cclxudmFyIENsb3VkaW5hcnlJbWFnZVN1bW1hcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGltYWdlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnZGltZW5zaW9ucycsICdwdWJsaWNJZCddKSxcclxuXHR9LFxyXG5cdHJlbmRlckxhYmVsICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5sYWJlbCkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgbGFiZWwsIGltYWdlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cdFx0aWYgKGxhYmVsID09PSAnZGltZW5zaW9ucycpIHtcclxuXHRcdFx0dGV4dCA9IGAke2ltYWdlLndpZHRofSDDlyAke2ltYWdlLmhlaWdodH1gO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCA9IGAke2ltYWdlLnB1YmxpY19pZH0uJHtpbWFnZS5mb3JtYXR9YDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBzdHlsZT17dGV4dFN0eWxlfT5cclxuXHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckltYWdlVGh1bWJuYWlsICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pbWFnZSkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgdXJsID0gdGhpcy5wcm9wcy5pbWFnZS51cmwucmVwbGFjZSgvaW1hZ2VcXC91cGxvYWQvLCBgaW1hZ2UvdXBsb2FkL2NfdGh1bWIsZ19mYWNlLGhfJHtJTUFHRV9TSVpFfSx3XyR7SU1BR0VfU0laRX1gKTtcclxuXHRcdHJldHVybiA8aW1nIHNyYz17dXJsfSBzdHlsZT17aW1hZ2VTdHlsZX0gY2xhc3NOYW1lPVwiaW1nLWxvYWRcIiAvPjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBzdHlsZT17bGlua1N0eWxlfT5cclxuXHRcdFx0XHQ8c3BhbiBzdHlsZT17Ym94U3R5bGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVySW1hZ2VUaHVtYm5haWwoKX1cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTGFiZWwoKX1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2xvdWRpbmFyeUltYWdlU3VtbWFyeTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBJZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0lkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuaWQ7XHJcblx0XHRpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHBhZGRlZCBpbnRlcmlvciB0aXRsZT17dmFsdWV9IHRvPXtLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyB0aGlzLnByb3BzLmxpc3QucGF0aCArICcvJyArIHZhbHVlfSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJZENvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBJbnZhbGlkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSW52YWxpZENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHQoSW52YWxpZCBUeXBlOiB7dGhpcy5wcm9wcy5jb2wudHlwZX0pXHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkQ29sdW1uO1xyXG4iLCJpbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IGV2YWxEZXBlbmRzT24gZnJvbSAnLi4vdXRpbHMvZXZhbERlcGVuZHNPbi5qcyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUZpZWxkLCBGb3JtSW5wdXQsIEZvcm1Ob3RlIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBDb2xsYXBzZWRGaWVsZExhYmVsIGZyb20gJy4uL2NvbXBvbmVudHMvQ29sbGFwc2VkRmllbGRMYWJlbCc7XHJcblxyXG5mdW5jdGlvbiBpc09iamVjdCAoYXJnKSB7XHJcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVTcGVjIChzcGVjKSB7XHJcblx0aWYgKCFzcGVjKSBzcGVjID0ge307XHJcblx0aWYgKCFpc09iamVjdChzcGVjLnN1cHBvcnRzKSkge1xyXG5cdFx0c3BlYy5zdXBwb3J0cyA9IHt9O1xyXG5cdH1cclxuXHRpZiAoIXNwZWMuZm9jdXNUYXJnZXRSZWYpIHtcclxuXHRcdHNwZWMuZm9jdXNUYXJnZXRSZWYgPSAnZm9jdXNUYXJnZXQnO1xyXG5cdH1cclxuXHRyZXR1cm4gc3BlYztcclxufVxyXG5cclxudmFyIEJhc2UgPSBtb2R1bGUuZXhwb3J0cy5CYXNlID0ge1xyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWRtaW5QYXRoOiBLZXlzdG9uZS5hZG1pblBhdGgsXHJcblx0XHRcdGlucHV0UHJvcHM6IHt9LFxyXG5cdFx0XHRsYWJlbFByb3BzOiB7fSxcclxuXHRcdFx0dmFsdWVQcm9wczoge30sXHJcblx0XHRcdHNpemU6ICdmdWxsJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbnB1dE5hbWUgKHBhdGgpIHtcclxuXHRcdC8vIFRoaXMgY29ycmVjdGx5IGNyZWF0ZXMgdGhlIHBhdGggZm9yIGZpZWxkIGlucHV0cywgYW5kIHN1cHBvcnRzIHRoZVxyXG5cdFx0Ly8gaW5wdXROYW1lUHJlZml4IHByb3AgdGhhdCBpcyByZXF1aXJlZCBmb3IgbmVzdGVkIGZpZWxkcyB0byB3b3JrXHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dE5hbWVQcmVmaXhcclxuXHRcdFx0PyBgJHt0aGlzLnByb3BzLmlucHV0TmFtZVByZWZpeH1bJHtwYXRofV1gXHJcblx0XHRcdDogcGF0aDtcclxuXHR9LFxyXG5cdHZhbHVlQ2hhbmdlZCAoZXZlbnQpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3VsZENvbGxhcHNlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlO1xyXG5cdH0sXHJcblx0c2hvdWxkUmVuZGVyRmllbGQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubW9kZSA9PT0gJ2NyZWF0ZScpIHJldHVybiB0cnVlO1xyXG5cdFx0cmV0dXJuICF0aGlzLnByb3BzLm5vZWRpdDtcclxuXHR9LFxyXG5cdGZvY3VzICgpIHtcclxuXHRcdGlmICghdGhpcy5yZWZzW3RoaXMuc3BlYy5mb2N1c1RhcmdldFJlZl0pIHJldHVybjtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1t0aGlzLnNwZWMuZm9jdXNUYXJnZXRSZWZdKS5mb2N1cygpO1xyXG5cdH0sXHJcblx0cmVuZGVyTm90ZSAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMubm90ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIDxGb3JtTm90ZSBodG1sPXt0aGlzLnByb3BzLm5vdGV9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0Y29uc3QgeyBhdXRvRm9jdXMsIHZhbHVlLCBpbnB1dFByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dCB7Li4ue1xyXG5cdFx0XHRcdC4uLmlucHV0UHJvcHMsXHJcblx0XHRcdFx0YXV0b0ZvY3VzLFxyXG5cdFx0XHRcdGF1dG9Db21wbGV0ZTogJ29mZicsXHJcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKSxcclxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy52YWx1ZUNoYW5nZWQsXHJcblx0XHRcdFx0cmVmOiAnZm9jdXNUYXJnZXQnLFxyXG5cdFx0XHRcdHZhbHVlLFxyXG5cdFx0XHR9fSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiA8Rm9ybUlucHV0IG5vZWRpdD57dGhpcy5wcm9wcy52YWx1ZX08L0Zvcm1JbnB1dD47XHJcblx0fSxcclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHR2YXIgd3JhcHBlckNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXHJcblx0XHRcdCdmaWVsZC10eXBlLScgKyB0aGlzLnByb3BzLnR5cGUsXHJcblx0XHRcdHRoaXMucHJvcHMuY2xhc3NOYW1lLFxyXG5cdFx0XHR7ICdmaWVsZC1tb25vc3BhY2UnOiB0aGlzLnByb3BzLm1vbm9zcGFjZSB9XHJcblx0XHQpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1GaWVsZCBodG1sRm9yPXt0aGlzLnByb3BzLnBhdGh9IGxhYmVsPXt0aGlzLnByb3BzLmxhYmVsfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9IGNyb3BMYWJlbD5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J0Zvcm1GaWVsZF9faW5uZXIgZmllbGQtc2l6ZS0nICsgdGhpcy5wcm9wcy5zaXplfT5cclxuXHRcdFx0XHRcdHt0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkgPyB0aGlzLnJlbmRlckZpZWxkKCkgOiB0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTm90ZSgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufTtcclxuXHJcbnZhciBNaXhpbnMgPSBtb2R1bGUuZXhwb3J0cy5NaXhpbnMgPSB7XHJcblx0Q29sbGFwc2U6IHtcclxuXHRcdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGlzQ29sbGFwc2VkOiB0aGlzLnNob3VsZENvbGxhcHNlKCksXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbXBvbmVudERpZFVwZGF0ZSAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuXHRcdFx0aWYgKHByZXZTdGF0ZS5pc0NvbGxhcHNlZCAmJiAhdGhpcy5zdGF0ZS5pc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVuY29sbGFwc2UgKCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc0NvbGxhcHNlZDogZmFsc2UsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlckNvbGxhcHNlICgpIHtcclxuXHRcdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8Q29sbGFwc2VkRmllbGRMYWJlbCBvbkNsaWNrPXt0aGlzLnVuY29sbGFwc2V9PisgQWRkIHt0aGlzLnByb3BzLmxhYmVsLnRvTG93ZXJDYXNlKCl9PC9Db2xsYXBzZWRGaWVsZExhYmVsPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gKHNwZWMpIHtcclxuXHJcblx0c3BlYyA9IHZhbGlkYXRlU3BlYyhzcGVjKTtcclxuXHJcblx0dmFyIGZpZWxkID0ge1xyXG5cdFx0c3BlYzogc3BlYyxcclxuXHRcdGRpc3BsYXlOYW1lOiBzcGVjLmRpc3BsYXlOYW1lLFxyXG5cdFx0bWl4aW5zOiBbTWl4aW5zLkNvbGxhcHNlXSxcclxuXHRcdHN0YXRpY3M6IHtcclxuXHRcdFx0Z2V0RGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmllbGQuZGVmYXVsdFZhbHVlIHx8ICcnO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHJlbmRlciAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnByb3BzLmhpZGRlbikge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghZXZhbERlcGVuZHNPbih0aGlzLnByb3BzLmRlcGVuZHNPbiwgdGhpcy5wcm9wcy52YWx1ZXMpKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNDb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb2xsYXBzZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzLnJlbmRlclVJKCk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdGlmIChzcGVjLnN0YXRpY3MpIHtcclxuXHRcdE9iamVjdC5hc3NpZ24oZmllbGQuc3RhdGljcywgc3BlYy5zdGF0aWNzKTtcclxuXHR9XHJcblxyXG5cdHZhciBleGNsdWRlQmFzZU1ldGhvZHMgPSB7fTtcclxuXHRpZiAoc3BlYy5taXhpbnMpIHtcclxuXHRcdHNwZWMubWl4aW5zLmZvckVhY2goZnVuY3Rpb24gKG1peGluKSB7XHJcblx0XHRcdE9iamVjdC5rZXlzKG1peGluKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRcdFx0aWYgKEJhc2VbbmFtZV0pIHtcclxuXHRcdFx0XHRcdGV4Y2x1ZGVCYXNlTWV0aG9kc1tuYW1lXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0T2JqZWN0LmFzc2lnbihmaWVsZCwgYmxhY2tsaXN0KEJhc2UsIGV4Y2x1ZGVCYXNlTWV0aG9kcykpO1xyXG5cdE9iamVjdC5hc3NpZ24oZmllbGQsIGJsYWNrbGlzdChzcGVjLCAnbWl4aW5zJywgJ3N0YXRpY3MnKSk7XHJcblxyXG5cdGlmIChBcnJheS5pc0FycmF5KHNwZWMubWl4aW5zKSkge1xyXG5cdFx0ZmllbGQubWl4aW5zID0gZmllbGQubWl4aW5zLmNvbmNhdChzcGVjLm1peGlucyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlQ2xhc3MoZmllbGQpO1xyXG5cclxufTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2hlY2tib3gnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEJvb2xlYW5Db2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdCb29sZWFuQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRydW5jYXRlPXtmYWxzZX0gZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdDxDaGVja2JveCByZWFkb25seSBjaGVja2VkPXt0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdfSAvPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb29sZWFuQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DaGVja2JveCc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE5PT1AgPSAoKSA9PiB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Jvb2xlYW5GaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ0Jvb2xlYW4nLFxyXG5cdH0sXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpbmRlbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRcdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHJlbmRlckZvcm1JbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0dHlwZT1cImhpZGRlblwiXHJcblx0XHRcdFx0dmFsdWU9eyEhdGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHRjb25zdCB7IGluZGVudCwgdmFsdWUsIGxhYmVsLCBwYXRoIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgZGF0YS1maWVsZC1uYW1lPXtwYXRofSBkYXRhLWZpZWxkLXR5cGU9XCJib29sZWFuXCI+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBvZmZzZXRBYnNlbnRMYWJlbD17aW5kZW50fT5cclxuXHRcdFx0XHRcdDxsYWJlbCBzdHlsZT17eyBoZWlnaHQ6ICcyLjNlbScgfX0+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckZvcm1JbnB1dCgpfVxyXG5cdFx0XHRcdFx0XHQ8Q2hlY2tib3hcclxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXt2YWx1ZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSAmJiB0aGlzLnZhbHVlQ2hhbmdlZCkgfHwgTk9PUH1cclxuXHRcdFx0XHRcdFx0XHRyZWFkb25seT17IXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJy43NWVtJyB9fT5cclxuXHRcdFx0XHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJOb3RlKCl9XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IFZBTFVFX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0lzIENoZWNrZWQnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5cdHsgbGFiZWw6ICdJcyBOT1QgQ2hlY2tlZCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0dmFsdWU6IHRydWUsXHJcblx0fTtcclxufVxyXG5cclxudmFyIEJvb2xlYW5GaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0c3RhdGljczoge1xyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdH07XHJcblx0fSxcclxuXHR1cGRhdGVWYWx1ZSAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gPFNlZ21lbnRlZENvbnRyb2wgZXF1YWxXaWR0aFNlZ21lbnRzIG9wdGlvbnM9e1ZBTFVFX09QVElPTlN9IHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlci52YWx1ZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9IC8+O1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb29sZWFuRmlsdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbHVtbnMvQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQ2xvdWRpbmFyeUltYWdlQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUgfHwgIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHQ8Q2xvdWRpbmFyeUltYWdlU3VtbWFyeSBsYWJlbD1cImRpbWVuc2lvbnNcIiBpbWFnZT17dmFsdWV9IC8+XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VDb2x1bW47XHJcbiIsIi8qXHJcblRPRE86IENsb3VkaW5hcnlJbWFnZVR5cGUgYWN0YWxseSBzdXBwb3J0cyAncmVtb3ZlJyBhbmQgJ3Jlc2V0JyBhY3Rpb25zLCBidXRcclxudGhpcyBmaWVsZCB3aWxsIG9ubHkgc3VibWl0IGBcIlwiYCB3aGVuICdyZW1vdmUnIGlzIGNsaWNrZWQuIEBqb3NzbWFjIHdlIG5lZWQgdG9cclxud29yayBvdXQgd2hldGhlciB3ZSdyZSBnb2luZyB0byBzdXBwb3J0IGRlbGV0aW5nIHRocm91Z2ggdGhlIFVJLlxyXG4qL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IGNsb3VkaW5hcnlSZXNpemUgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2Nsb3VkaW5hcnlSZXNpemUnO1xyXG5pbXBvcnQgeyBCdXR0b24sIEZvcm1GaWVsZCwgRm9ybUlucHV0LCBGb3JtTm90ZSB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCBJbWFnZVRodW1ibmFpbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ltYWdlVGh1bWJuYWlsJztcclxuaW1wb3J0IEZpbGVDaGFuZ2VNZXNzYWdlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRmlsZUNoYW5nZU1lc3NhZ2UnO1xyXG5pbXBvcnQgSGlkZGVuRmlsZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGlkZGVuRmlsZUlucHV0JztcclxuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XHJcblxyXG5jb25zdCBTVVBQT1JURURfVFlQRVMgPSBbJ2ltYWdlLyonLCAnYXBwbGljYXRpb24vcGRmJywgJ2FwcGxpY2F0aW9uL3Bvc3RzY3JpcHQnXTtcclxuY29uc3QgU1VQUE9SVEVEX1JFR0VYID0gbmV3IFJlZ0V4cCgvXmltYWdlXFwvfGFwcGxpY2F0aW9uXFwvcGRmfGFwcGxpY2F0aW9uXFwvcG9zdHNjcmlwdC9nKTtcclxuXHJcbmxldCB1cGxvYWRJbmMgPSAxMDAwO1xyXG5cclxuY29uc3QgYnVpbGRJbml0aWFsU3RhdGUgPSAocHJvcHMpID0+ICh7XHJcblx0cmVtb3ZlRXhpc3Rpbmc6IGZhbHNlLFxyXG5cdHVwbG9hZEZpZWxkUGF0aDogYENsb3VkaW5hcnlJbWFnZS0ke3Byb3BzLnBhdGh9LSR7Kyt1cGxvYWRJbmN9YCxcclxuXHR1c2VyU2VsZWN0ZWRGaWxlOiBudWxsLFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbGxhcHNlOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0bm90ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHZhbHVlOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0cHVibGljX2lkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRyZXNvdXJjZV90eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRzZWN1cmVfdXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRzaWduYXR1cmU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHVybDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmVyc2lvbjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdGRpc3BsYXlOYW1lOiAnQ2xvdWRpbmFyeUltYWdlRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdDbG91ZGluYXJ5SW1hZ2UnLFxyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiAoKSA9PiAoe30pLFxyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiBidWlsZEluaXRpYWxTdGF0ZSh0aGlzLnByb3BzKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ0Nsb3VkaW5hcnlJbWFnZUZpZWxkIG5leHRQcm9wczonLCBuZXh0UHJvcHMpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzKSB7XHJcblx0XHQvLyBSZXNldCB0aGUgYWN0aW9uIHN0YXRlIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXNcclxuXHRcdC8vIFRPRE86IFdlIHNob3VsZCBhZGQgYSBjaGVjayBmb3IgYSBuZXcgaXRlbSBJRCBpbiB0aGUgc3RvcmVcclxuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLnB1YmxpY19pZCAhPT0gbmV4dFByb3BzLnZhbHVlLnB1YmxpY19pZCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRyZW1vdmVFeGlzdGluZzogZmFsc2UsXHJcblx0XHRcdFx0dXNlclNlbGVjdGVkRmlsZTogbnVsbCxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gSEVMUEVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRoYXNMb2NhbCAoKSB7XHJcblx0XHRyZXR1cm4gISF0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGU7XHJcblx0fSxcclxuXHRoYXNFeGlzdGluZyAoKSB7XHJcblx0XHRyZXR1cm4gISEodGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLnByb3BzLnZhbHVlLnVybCk7XHJcblx0fSxcclxuXHRoYXNJbWFnZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNFeGlzdGluZygpIHx8IHRoaXMuaGFzTG9jYWwoKTtcclxuXHR9LFxyXG5cdGdldEZpbGVuYW1lICgpIHtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCBoZWlnaHQsIHB1YmxpY19pZCwgd2lkdGggfSA9IHRoaXMucHJvcHMudmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZVxyXG5cdFx0XHQ/IHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZS5uYW1lXHJcblx0XHRcdDogYCR7cHVibGljX2lkfS4ke2Zvcm1hdH0gKCR7d2lkdGh9w5cke2hlaWdodH0pYDtcclxuXHR9LFxyXG5cdGdldEltYWdlU291cmNlIChoZWlnaHQgPSA5MCkge1xyXG5cdFx0Ly8gVE9ETzogVGhpcyBsZXRzIHJlYWxseSB3aWRlIGltYWdlcyBicmVhayB0aGUgbGF5b3V0XHJcblx0XHRsZXQgc3JjO1xyXG5cdFx0aWYgKHRoaXMuaGFzTG9jYWwoKSkge1xyXG5cdFx0XHRzcmMgPSB0aGlzLnN0YXRlLmRhdGFVcmk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaGFzRXhpc3RpbmcoKSkge1xyXG5cdFx0XHRzcmMgPSBjbG91ZGluYXJ5UmVzaXplKHRoaXMucHJvcHMudmFsdWUucHVibGljX2lkLCB7XHJcblx0XHRcdFx0Y3JvcDogJ2ZpdCcsXHJcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHQsXHJcblx0XHRcdFx0Zm9ybWF0OiAnanBnJyxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNyYztcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHRyaWdnZXJGaWxlQnJvd3NlciAoKSB7XHJcblx0XHR0aGlzLnJlZnMuZmlsZUlucHV0LmNsaWNrRG9tTm9kZSgpO1xyXG5cdH0sXHJcblx0aGFuZGxlRmlsZUNoYW5nZSAoZXZlbnQpIHtcclxuXHRcdGNvbnN0IHVzZXJTZWxlY3RlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHVzZXJTZWxlY3RlZEZpbGUgfSk7XHJcblx0fSxcclxuXHJcblx0Ly8gVG9nZ2xlIHRoZSBsaWdodGJveFxyXG5cdG9wZW5MaWdodGJveCAoZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bGlnaHRib3hJc1Zpc2libGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNsb3NlTGlnaHRib3ggKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGxpZ2h0Ym94SXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIEhhbmRsZSBpbWFnZSBzZWxlY3Rpb24gaW4gZmlsZSBicm93c2VyXHJcblx0aGFuZGxlSW1hZ2VDaGFuZ2UgKGUpIHtcclxuXHRcdGlmICghd2luZG93LkZpbGVSZWFkZXIpIHtcclxuXHRcdFx0cmV0dXJuIGFsZXJ0KCdGaWxlIHJlYWRlciBub3Qgc3VwcG9ydGVkIGJ5IGJyb3dzZXIuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHR2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG5cdFx0aWYgKCFmaWxlKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCFmaWxlLnR5cGUubWF0Y2goU1VQUE9SVEVEX1JFR0VYKSkge1xyXG5cdFx0XHRyZXR1cm4gYWxlcnQoJ1Vuc3VwcG9ydGVkIGZpbGUgdHlwZS4gU3VwcG9ydGVkIGZvcm1hdHMgYXJlOiBHSUYsIFBORywgSlBHLCBCTVAsIElDTywgUERGLCBUSUZGLCBFUFMsIFBTRCwgU1ZHJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblxyXG5cdFx0cmVhZGVyLm9ubG9hZHN0YXJ0ID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsb2FkaW5nOiB0cnVlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHRyZWFkZXIub25sb2FkZW5kID0gKHVwbG9hZCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRkYXRhVXJpOiB1cGxvYWQudGFyZ2V0LnJlc3VsdCxcclxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR1c2VyU2VsZWN0ZWRGaWxlOiBmaWxlLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IGZpbGU6IGZpbGUgfSk7XHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdC8vIElmIHdlIGhhdmUgYSBsb2NhbCBmaWxlIGFkZGVkIHRoZW4gcmVtb3ZlIGl0IGFuZCByZXNldCB0aGUgZmlsZSBmaWVsZC5cclxuXHRoYW5kbGVSZW1vdmUgKGUpIHtcclxuXHRcdHZhciBzdGF0ZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUpIHtcclxuXHRcdFx0c3RhdGUudXNlclNlbGVjdGVkRmlsZSA9IG51bGw7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaGFzRXhpc3RpbmcoKSkge1xyXG5cdFx0XHRzdGF0ZS5yZW1vdmVFeGlzdGluZyA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcblx0fSxcclxuXHR1bmRvUmVtb3ZlICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoYnVpbGRJbml0aWFsU3RhdGUodGhpcy5wcm9wcykpO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIFJFTkRFUkVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRyZW5kZXJMaWdodGJveCAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmICghdmFsdWUgfHwgIXZhbHVlLnB1YmxpY19pZCkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaWdodGJveFxyXG5cdFx0XHRcdGN1cnJlbnRJbWFnZT17MH1cclxuXHRcdFx0XHRpbWFnZXM9e1t7IHNyYzogdGhpcy5nZXRJbWFnZVNvdXJjZSg2MDApIH1dfVxyXG5cdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzVmlzaWJsZX1cclxuXHRcdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XHJcblx0XHRcdFx0c2hvd0ltYWdlQ291bnQ9e2ZhbHNlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckltYWdlUHJldmlldyAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIHJlbmRlciBpY29uIGZlZWRiYWNrIGZvciBpbnRlbnRcclxuXHRcdGxldCBtYXNrO1xyXG5cdFx0aWYgKHRoaXMuaGFzTG9jYWwoKSkgbWFzayA9ICd1cGxvYWQnO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZykgbWFzayA9ICdyZW1vdmUnO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5zdGF0ZS5sb2FkaW5nKSBtYXNrID0gJ2xvYWRpbmcnO1xyXG5cclxuXHRcdGNvbnN0IHNob3VsZE9wZW5MaWdodGJveCA9IHZhbHVlLmZvcm1hdCAhPT0gJ3BkZic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEltYWdlVGh1bWJuYWlsXHJcblx0XHRcdFx0Y29tcG9uZW50PVwiYVwiXHJcblx0XHRcdFx0aHJlZj17dGhpcy5nZXRJbWFnZVNvdXJjZSg2MDApfVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3Nob3VsZE9wZW5MaWdodGJveCAmJiB0aGlzLm9wZW5MaWdodGJveH1cclxuXHRcdFx0XHRtYXNrPXttYXNrfVxyXG5cdFx0XHRcdHRhcmdldD1cIl9fYmxhbmtcIlxyXG5cdFx0XHRcdHN0eWxlPXt7IGZsb2F0OiAnbGVmdCcsIG1hcmdpblJpZ2h0OiAnMWVtJyB9fVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0PGltZyBzcmM9e3RoaXMuZ2V0SW1hZ2VTb3VyY2UoKX0gc3R5bGU9e3sgaGVpZ2h0OiA5MCB9fSAvPlxyXG5cdFx0XHQ8L0ltYWdlVGh1bWJuYWlsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckZpbGVOYW1lQW5kT3B0aW9uYWxNZXNzYWdlIChzaG93Q2hhbmdlTWVzc2FnZSA9IGZhbHNlKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgPyAoXHJcblx0XHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdFx0XHRcdHt0aGlzLmdldEZpbGVuYW1lKCl9XHJcblx0XHRcdFx0XHQ8L0ZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHRcdHtzaG93Q2hhbmdlTWVzc2FnZSAmJiB0aGlzLnJlbmRlckNoYW5nZU1lc3NhZ2UoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQ2hhbmdlTWVzc2FnZSAoKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbGVDaGFuZ2VNZXNzYWdlIGNvbG9yPVwic3VjY2Vzc1wiPlxyXG5cdFx0XHRcdFx0U2F2ZSB0byBVcGxvYWRcclxuXHRcdFx0XHQ8L0ZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbGVDaGFuZ2VNZXNzYWdlIGNvbG9yPVwiZGFuZ2VyXCI+XHJcblx0XHRcdFx0XHRTYXZlIHRvIFJlbW92ZVxyXG5cdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBPdXRwdXQgW2NhbmNlbC9yZW1vdmUvdW5kb10gYnV0dG9uXHJcblx0cmVuZGVyQ2xlYXJCdXR0b24gKCkge1xyXG5cdFx0Y29uc3QgY2xlYXJUZXh0ID0gdGhpcy5oYXNMb2NhbCgpID8gJ0NhbmNlbCcgOiAnUmVtb3ZlIEltYWdlJztcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZyA/IChcclxuXHRcdFx0PEJ1dHRvbiB2YXJpYW50PVwibGlua1wiIG9uQ2xpY2s9e3RoaXMudW5kb1JlbW92ZX0+XHJcblx0XHRcdFx0VW5kbyBSZW1vdmVcclxuXHRcdFx0PC9CdXR0b24+XHJcblx0XHQpIDogKFxyXG5cdFx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgY29sb3I9XCJjYW5jZWxcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZX0+XHJcblx0XHRcdFx0e2NsZWFyVGV4dH1cclxuXHRcdFx0PC9CdXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckltYWdlVG9vbGJhciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGtleT17dGhpcy5wcm9wcy5wYXRoICsgJ190b29sYmFyJ30gY2xhc3NOYW1lPVwiaW1hZ2UtdG9vbGJhclwiPlxyXG5cdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy50cmlnZ2VyRmlsZUJyb3dzZXJ9PlxyXG5cdFx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/ICdDaGFuZ2UnIDogJ1VwbG9hZCd9IEltYWdlXHJcblx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/IHRoaXMucmVuZGVyQ2xlYXJCdXR0b24oKSA6IG51bGx9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWxlSW5wdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxIaWRkZW5GaWxlSW5wdXRcclxuXHRcdFx0XHRhY2NlcHQ9e1NVUFBPUlRFRF9UWVBFUy5qb2luKCl9XHJcblx0XHRcdFx0cmVmPVwiZmlsZUlucHV0XCJcclxuXHRcdFx0XHRuYW1lPXt0aGlzLnN0YXRlLnVwbG9hZEZpZWxkUGF0aH1cclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbWFnZUNoYW5nZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQWN0aW9uSW5wdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUgfHwgdGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZykge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZVxyXG5cdFx0XHRcdD8gYHVwbG9hZDoke3RoaXMuc3RhdGUudXBsb2FkRmllbGRQYXRofWBcclxuXHRcdFx0XHQ6ICcnO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHRjb25zdCB7IGxhYmVsLCBub3RlLCBwYXRoIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IGltYWdlQ29udGFpbmVyID0gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt0aGlzLmhhc0ltYWdlKCkgPyB7IG1hcmdpbkJvdHRvbTogJzFlbScgfSA6IG51bGx9PlxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgJiYgdGhpcy5yZW5kZXJJbWFnZVByZXZpZXcoKX1cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpICYmIHRoaXMucmVuZGVyRmlsZU5hbWVBbmRPcHRpb25hbE1lc3NhZ2UodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cclxuXHRcdGNvbnN0IHRvb2xiYXIgPSB0aGlzLnNob3VsZFJlbmRlckZpZWxkKClcclxuXHRcdFx0PyB0aGlzLnJlbmRlckltYWdlVG9vbGJhcigpXHJcblx0XHRcdDogPEZvcm1JbnB1dCBub2VkaXQgLz47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1GaWVsZCBsYWJlbD17bGFiZWx9IGNsYXNzTmFtZT1cImZpZWxkLXR5cGUtY2xvdWRpbmFyeWltYWdlXCIgaHRtbEZvcj17cGF0aH0+XHJcblx0XHRcdFx0e2ltYWdlQ29udGFpbmVyfVxyXG5cdFx0XHRcdHt0b29sYmFyfVxyXG5cdFx0XHRcdHshIW5vdGUgJiYgPEZvcm1Ob3RlIG5vdGU9e25vdGV9IC8+fVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckxpZ2h0Ym94KCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyRmlsZUlucHV0KCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQWN0aW9uSW5wdXQoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE9QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0lzIFNldCcsIHZhbHVlOiB0cnVlIH0sXHJcblx0eyBsYWJlbDogJ0lzIE5PVCBTZXQnLCB2YWx1ZTogZmFsc2UgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGV4aXN0czogdHJ1ZSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRleGlzdHM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0c3RhdGljczoge1xyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdH07XHJcblx0fSxcclxuXHR0b2dnbGVFeGlzdHMgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgZXhpc3RzOiB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U2VnbWVudGVkQ29udHJvbFxyXG5cdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUV4aXN0c31cclxuXHRcdFx0XHRvcHRpb25zPXtPUFRJT05TfVxyXG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXIuZXhpc3RzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2xvdWRpbmFyeUltYWdlRmlsdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgRGF0ZUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1hdCA9ICh0aGlzLnByb3BzLmNvbC50eXBlID09PSAnZGF0ZXRpbWUnKSA/ICdNTU1NIERvIFlZWVksIGg6bW06c3MgYScgOiAnTU1NTSBEbyBZWVlZJztcclxuXHRcdHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0gdG89e3RoaXMucHJvcHMubGlua1RvfSBlbXB0eT17ZW1wdHl9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0ZUNvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBEYXlQaWNrZXIgZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnB1dCxcclxuXHRGb3JtU2VsZWN0LFxyXG5cdEdyaWQsXHJcblx0U2VnbWVudGVkQ29udHJvbCxcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBJTlZFUlRFRF9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdNYXRjaGVzJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ0RvZXMgTk9UIE1hdGNoJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmNvbnN0IE1PREVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnT24nLCB2YWx1ZTogJ29uJyB9LFxyXG5cdHsgbGFiZWw6ICdBZnRlcicsIHZhbHVlOiAnYWZ0ZXInIH0sXHJcblx0eyBsYWJlbDogJ0JlZm9yZScsIHZhbHVlOiAnYmVmb3JlJyB9LFxyXG5cdHsgbGFiZWw6ICdCZXR3ZWVuJywgdmFsdWU6ICdiZXR3ZWVuJyB9LFxyXG5dO1xyXG5cclxuY29uc3QgRGF5UGlja2VySW5kaWNhdG9yID0gKHsgYWN0aXZlSW5wdXRGaWVsZCB9KSA9PiB7XHJcblx0Y29uc3Qgc3R5bGUgPSBhY3RpdmVJbnB1dEZpZWxkID09PSAnYmVmb3JlJyA/IHsgbGVmdDogJzExcmVtJyB9IDogbnVsbDtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JcIiBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19ib3JkZXJcIiAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19iZ1wiIC8+XHJcblx0XHQ8L3NwYW4+XHJcblx0KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1vZGU6IE1PREVfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHRcdGJlZm9yZTogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdFx0YWZ0ZXI6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgRGF0ZUZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVGaWx0ZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRtb2RlOiBQcm9wVHlwZXMub25lT2YoTU9ERV9PUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdFx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sZWFuLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXQ6ICdERC1NTS1ZWVlZJyxcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdFx0dmFsdWU6IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhY3RpdmVJbnB1dEZpZWxkOiAnYWZ0ZXInLFxyXG5cdFx0XHRtb250aDogbmV3IERhdGUoKSwgLy8gVGhlIG1vbnRoIHRvIGRpc3BsYXkgaW4gdGhlIGNhbGVuZGFyXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5fX2lzTW91bnRlZCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR0aGlzLl9faXNNb3VudGVkID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTUVUSE9EU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkOiB2YWx1ZSB9KTtcclxuXHRcdHRoaXMuc2V0Rm9jdXModGhpcy5wcm9wcy5maWx0ZXIubW9kZSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHR0aGlzLnNldEZvY3VzKG1vZGUpO1xyXG5cdH0sXHJcblx0c2V0Rm9jdXMgKG1vZGUpIHtcclxuXHRcdC8vIGdpdmUgdGhlIFVJIGEgbW9tZW50IHRvIHJlbmRlclxyXG5cdFx0aWYgKG1vZGUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbdGhpcy5zdGF0ZS5hY3RpdmVJbnB1dEZpZWxkXSkuZm9jdXMoKTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XHJcblx0XHRcdH0sIDUwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChlKSB7XHJcblx0XHQvLyBUT0RPIEBqZWR3YXRzb25cclxuXHRcdC8vIEVudGVyaW5nIHZpcnR1YWxseSBhbnkgdmFsdWUgd2lsbCByZXR1cm4gYW4gXCJJbnZhbGlkIGRhdGVcIiwgc28gSSdtXHJcblx0XHQvLyB0ZW1wb3JhcmlseSBkaXNhYmxpbmcgdXNlciBlbnRyeS4gVGhpcyBlbnRpcmUgY29tcG9uZW50IG5lZWRzIHJldmlldy5cclxuXHJcblx0XHQvLyBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuXHRcdC8vIGxldCB7IG1vbnRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Ly8gLy8gQ2hhbmdlIHRoZSBjdXJyZW50IG1vbnRoIG9ubHkgaWYgdGhlIHZhbHVlIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgYSB2YWxpZFxyXG5cdFx0Ly8gLy8gZGF0ZSwgYWNjb3JkaW5nIHRvIHRoZSBgTGAgZm9ybWF0XHJcblx0XHQvLyBpZiAobW9tZW50KHZhbHVlLCAnTCcsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0Ly8gXHRtb250aCA9IG1vbWVudCh2YWx1ZSwgJ0wnKS50b0RhdGUoKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0Ly8gdGhpcy5zZXRTdGF0ZSh7IG1vbnRoIH0sIHRoaXMuc2hvd0N1cnJlbnREYXRlKTtcclxuXHR9LFxyXG5cdHNldEFjdGl2ZUZpZWxkIChmaWVsZCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGFjdGl2ZUlucHV0RmllbGQ6IGZpZWxkLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzd2l0Y2hCZXR3ZWVuQWN0aXZlSW5wdXRGaWVsZHMgKGUsIGRheSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgYWN0aXZlSW5wdXRGaWVsZCB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IHNlbmQgPSB7fTtcclxuXHRcdGNvbnN0IG5ld0FjdGl2ZUZpZWxkID0gYWN0aXZlSW5wdXRGaWVsZCA9PT0gJ2JlZm9yZSdcclxuXHRcdFx0PyAnYWZ0ZXInXHJcblx0XHRcdDogJ2JlZm9yZSc7XHJcblx0XHRzZW5kW2FjdGl2ZUlucHV0RmllbGRdID0gZGF5O1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoc2VuZCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKFxyXG5cdFx0XHR7IGFjdGl2ZUlucHV0RmllbGQ6IG5ld0FjdGl2ZUZpZWxkIH0sXHJcblx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbbmV3QWN0aXZlRmllbGRdKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0c2VsZWN0RGF5IChlLCBkYXksIG1vZGlmaWVycykge1xyXG5cdFx0aWYgKG1vZGlmaWVycyAmJiBtb2RpZmllcnMuZGlzYWJsZWQpIHJldHVybjtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IGRheSB9KTtcclxuXHR9LFxyXG5cdHNob3dDdXJyZW50RGF0ZSAoKSB7XHJcblx0XHQvLyBnaXZlIHRoZSBVSSBhIG1vbWVudCB0byByZW5kZXJcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZnMuZGF5cGlja2VyLnNob3dNb250aCh0aGlzLnN0YXRlLm1vbnRoKTtcclxuXHRcdH0sIDUwKTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBSRU5ERVJFUlNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0cmVuZGVyVG9nZ2xlICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0b3B0aW9ucz17SU5WRVJURURfT1BUSU9OU31cclxuXHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQ29udHJvbHMgKCkge1xyXG5cdFx0bGV0IGNvbnRyb2xzO1xyXG5cdFx0Y29uc3QgeyBhY3RpdmVJbnB1dEZpZWxkIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyBpcyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0Ly8gRGF5UGlja2VyIE1vZGlmaWVycyAtIFNlbGVjdGVkIERheVxyXG5cdFx0bGV0IG1vZGlmaWVycyA9IGZpbHRlci5tb2RlID09PSAnYmV0d2VlbicgPyB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyW2FjdGl2ZUlucHV0RmllbGRdKS5pc1NhbWUoZGF5KSxcclxuXHRcdH0gOiB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyLnZhbHVlKS5pc1NhbWUoZGF5KSxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1vZGUudmFsdWUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8R3JpZC5Sb3cgeHNtYWxsPVwib25lLWhhbGZcIiBndXR0ZXI9ezEwfT5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZWY9XCJhZnRlclwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiRnJvbVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUZpZWxkKCdhZnRlcicpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci5hZnRlcikuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZj1cImJlZm9yZVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiVG9cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0b25Gb2N1cz17KCkgPT4gdGhpcy5zZXRBY3RpdmVGaWVsZCgnYmVmb3JlJyl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLmJlZm9yZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0PC9HcmlkLlJvdz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG1vZGlmaWVycz17bW9kaWZpZXJzfVxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIkRheVBpY2tlci0tY2hyb21lXCJcclxuXHRcdFx0XHRcdFx0XHRvbkRheUNsaWNrPXt0aGlzLnN3aXRjaEJldHdlZW5BY3RpdmVJbnB1dEZpZWxkc31cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlckluZGljYXRvciBhY3RpdmVJbnB1dEZpZWxkPXthY3RpdmVJbnB1dEZpZWxkfSAvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwiaW5wdXRcIlxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci52YWx1ZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLnNob3dDdXJyZW50RGF0ZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdHJlZj1cImRheXBpY2tlclwiXHJcblx0XHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiRGF5UGlja2VyLS1jaHJvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuc2VsZWN0RGF5fVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VySW5kaWNhdG9yIC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29udHJvbHM7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVG9nZ2xlKCl9XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQ29udHJvbHMoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlRmlsdGVyO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUNvbHVtbicpO1xyXG4iLCJpbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGF0ZUlucHV0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1Ob3RlLFxyXG5cdElubGluZUdyb3VwIGFzIEdyb3VwLFxyXG5cdElubGluZUdyb3VwU2VjdGlvbiBhcyBTZWN0aW9uLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdEYXRldGltZUZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRGF0ZXRpbWUnLFxyXG5cdH0sXHJcblxyXG5cdGZvY3VzVGFyZ2V0UmVmOiAnZGF0ZUlucHV0JyxcclxuXHJcblx0Ly8gZGVmYXVsdCBpbnB1dCBmb3JtYXRzXHJcblx0ZGF0ZUlucHV0Rm9ybWF0OiAnWVlZWS1NTS1ERCcsXHJcblx0dGltZUlucHV0Rm9ybWF0OiAnaDptbTpzcyBhJyxcclxuXHR0ek9mZnNldElucHV0Rm9ybWF0OiAnWicsXHJcblxyXG5cdC8vIHBhcnNlIGZvcm1hdHMgKGR1cGxpY2F0ZWQgZnJvbSBsaWIvZmllbGRUeXBlcy9kYXRldGltZS5qcylcclxuXHRwYXJzZUZvcm1hdHM6IFsnWVlZWS1NTS1ERCcsICdZWVlZLU1NLUREIGg6bTpzIGEnLCAnWVlZWS1NTS1ERCBoOm0gYScsICdZWVlZLU1NLUREIEg6bTpzJywgJ1lZWVktTU0tREQgSDptJ10sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkYXRlVmFsdWU6IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5tb21lbnQodGhpcy5wcm9wcy52YWx1ZSkuZm9ybWF0KHRoaXMuZGF0ZUlucHV0Rm9ybWF0KSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMubW9tZW50KHRoaXMucHJvcHMudmFsdWUpLmZvcm1hdCh0aGlzLnRpbWVJbnB1dEZvcm1hdCksXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUgPyB0aGlzLm1vbWVudCh0aGlzLnByb3BzLnZhbHVlKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KSA6IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmc6ICdEbyBNTU0gWVlZWSwgaDptbTpzcyBhJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0bW9tZW50ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmlzVVRDKSByZXR1cm4gbW9tZW50LnV0Yy5hcHBseShtb21lbnQsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlIHJldHVybiBtb21lbnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgaXNWYWxpZCgpIHNvIHdlIGNhbiBzaGFyZSB3aXRoIHNlcnZlci1zaWRlIGNvZGVcclxuXHRpc1ZhbGlkICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHZhbHVlLCB0aGlzLnBhcnNlRm9ybWF0cykuaXNWYWxpZCgpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgZm9ybWF0KCkgc28gd2UgY2FuIHNoYXJlIHdpdGggc2VydmVyLXNpZGUgY29kZVxyXG5cdGZvcm1hdCAodmFsdWUsIGZvcm1hdCkge1xyXG5cdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuZGF0ZUlucHV0Rm9ybWF0ICsgJyAnICsgdGhpcy50aW1lSW5wdXRGb3JtYXQ7XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB0aGlzLm1vbWVudCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCkgOiAnJztcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVDaGFuZ2UgKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKSB7XHJcblx0XHR2YXIgdmFsdWUgPSBkYXRlVmFsdWUgKyAnICcgKyB0aW1lVmFsdWU7XHJcblx0XHR2YXIgZGF0ZXRpbWVGb3JtYXQgPSB0aGlzLmRhdGVJbnB1dEZvcm1hdCArICcgJyArIHRoaXMudGltZUlucHV0Rm9ybWF0O1xyXG5cclxuXHRcdC8vIGlmIHRoZSBjaGFuZ2UgaW5jbHVkZWQgYSB0aW1lem9uZSBvZmZzZXQsIGluY2x1ZGUgdGhhdCBpbiB0aGUgY2FsY3VsYXRpb24gKHNvIE5PVyB3b3JrcyBjb3JyZWN0bHkgZHVyaW5nIERTVCBjaGFuZ2VzKVxyXG5cdFx0aWYgKHR5cGVvZiB0ek9mZnNldFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR2YWx1ZSArPSAnICcgKyB0ek9mZnNldFZhbHVlO1xyXG5cdFx0XHRkYXRldGltZUZvcm1hdCArPSAnICcgKyB0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHQvLyBpZiBub3QsIGNhbGN1bGF0ZSB0aGUgdGltZXpvbmUgb2Zmc2V0IGJhc2VkIG9uIHRoZSBkYXRlIChyZXNwZWN0IGRpZmZlcmVudCBEU1QgdmFsdWVzKVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyB0ek9mZnNldFZhbHVlOiB0aGlzLm1vbWVudCh2YWx1ZSwgZGF0ZXRpbWVGb3JtYXQpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmlzVmFsaWQodmFsdWUpID8gdGhpcy5tb21lbnQodmFsdWUsIGRhdGV0aW1lRm9ybWF0KS50b0lTT1N0cmluZygpIDogbnVsbCxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGRhdGVDaGFuZ2VkICh7IHZhbHVlIH0pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBkYXRlVmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIHRoaXMuc3RhdGUudGltZVZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHR0aW1lQ2hhbmdlZCAoZXZ0KSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgdGltZVZhbHVlOiBldnQudGFyZ2V0LnZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlVmFsdWUsIGV2dC50YXJnZXQudmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHNldE5vdyAoKSB7XHJcblx0XHR2YXIgZGF0ZVZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy5kYXRlSW5wdXRGb3JtYXQpO1xyXG5cdFx0dmFyIHRpbWVWYWx1ZSA9IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudGltZUlucHV0Rm9ybWF0KTtcclxuXHRcdHZhciB0ek9mZnNldFZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRkYXRlVmFsdWU6IGRhdGVWYWx1ZSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aW1lVmFsdWUsXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHR6T2Zmc2V0VmFsdWUsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJOb3RlICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5ub3RlKSByZXR1cm4gbnVsbDtcclxuXHRcdHJldHVybiA8Rm9ybU5vdGUgbm90ZT17dGhpcy5wcm9wcy5ub3RlfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHR2YXIgaW5wdXQ7XHJcblx0XHRpZiAodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSB7XHJcblx0XHRcdGlucHV0ID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHRcdFx0PERhdGVJbnB1dFxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0PXt0aGlzLmRhdGVJbnB1dEZvcm1hdH1cclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMuZGF0ZSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5kYXRlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlZj1cImRhdGVJbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5kYXRlVmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLnRpbWUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudGltZUNoYW5nZWR9XHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkhIOk1NOlNTIGFtL3BtXCJcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnRpbWVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5zZXROb3d9Pk5vdzwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdFx0PGlucHV0XHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMudHpPZmZzZXQpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudHpPZmZzZXRWYWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnB1dCA9IChcclxuXHRcdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdD5cclxuXHRcdFx0XHRcdHt0aGlzLmZvcm1hdCh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdFN0cmluZyl9XHJcblx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGxhYmVsPXt0aGlzLnByb3BzLmxhYmVsfSBjbGFzc05hbWU9XCJmaWVsZC10eXBlLWRhdGV0aW1lXCIgaHRtbEZvcj17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX0+XHJcblx0XHRcdFx0e2lucHV0fVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUZpbHRlcicpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEVtYWlsQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRW1haWxDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXsnbWFpbHRvOicgKyB2YWx1ZX0gcGFkZGVkIGV4dGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVtYWlsQ29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vKlxyXG5cdFRPRE86XHJcblx0LSBncmF2YXRhclxyXG5cdC0gdmFsaWRhdGUgZW1haWwgYWRkcmVzc1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ0VtYWlsRmllbGQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRW1haWwnLFxyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdHR5cGU9XCJlbWFpbFwiXHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMudmFsdWUgPyAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IGNvbXBvbmVudD1cImFcIiBocmVmPXsnbWFpbHRvOicgKyB0aGlzLnByb3BzLnZhbHVlfT5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHQpIDogKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdCAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuaW1wb3J0IGRpc3BsYXlOYW1lIGZyb20gJ2Rpc3BsYXktbmFtZSc7XHJcblxyXG52YXIgTmFtZUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ05hbWVDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHZhciB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlIHx8ICghdmFsdWUuZmlyc3QgJiYgIXZhbHVlLmxhc3QpKSByZXR1cm4gJyhubyBuYW1lKSc7XHJcblx0XHRyZXR1cm4gZGlzcGxheU5hbWUodmFsdWUuZmlyc3QsIHZhbHVlLmxhc3QpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXt0aGlzLnByb3BzLmxpbmtUb30gcGFkZGVkIGludGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQ29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnB1dCxcclxuXHRHcmlkLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE5BTUVfU0hBUEUgPSB7XHJcblx0Zmlyc3Q6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFzdDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ05hbWVGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ05hbWUnLFxyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiAoKSA9PiAoe1xyXG5cdFx0XHRmaXJzdDogJycsXHJcblx0XHRcdGxhc3Q6ICcnLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aHM6IFByb3BUeXBlcy5zaGFwZShOQU1FX1NIQVBFKS5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zaGFwZShOQU1FX1NIQVBFKS5pc1JlcXVpcmVkLFxyXG5cdH0sXHJcblxyXG5cdHZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKHdoaWNoLCBldmVudCkge1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSA9IHt9LCBwYXRoLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdG9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aCxcclxuXHRcdFx0dmFsdWU6IHtcclxuXHRcdFx0XHQuLi52YWx1ZSxcclxuXHRcdFx0XHRbd2hpY2hdOiBldmVudC50YXJnZXQudmFsdWUsXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNoYW5nZUZpcnN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlZCgnZmlyc3QnLCBldmVudCk7XHJcblx0fSxcclxuXHRjaGFuZ2VMYXN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlZCgnbGFzdCcsIGV2ZW50KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IGlucHV0U3R5bGUgPSB7IHdpZHRoOiAnMTAwJScgfTtcclxuXHRcdGNvbnN0IHsgdmFsdWUgPSB7fSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZC5Sb3cgc21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IHN0eWxlPXtpbnB1dFN0eWxlfT5cclxuXHRcdFx0XHRcdFx0e3ZhbHVlLmZpcnN0fVxyXG5cdFx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdCBzdHlsZT17aW5wdXRTdHlsZX0+XHJcblx0XHRcdFx0XHRcdHt2YWx1ZS5sYXN0fVxyXG5cdFx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0PC9HcmlkLlJvdz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlID0ge30sIHBhdGhzLCBhdXRvRm9jdXMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZC5Sb3cgc21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0YXV0b0ZvY3VzPXthdXRvRm9jdXN9XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHBhdGhzLmZpcnN0KX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlRmlyc3R9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZS5maXJzdH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHBhdGhzLmxhc3QpfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VMYXN0fVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkxhc3QgbmFtZVwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZS5sYXN0fVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHQ8L0dyaWQuUm93PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBQYXNzd29yZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRyZXR1cm4gdmFsdWUgPyAnKioqKioqKionIDogJyc7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3N3b3JkQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdQYXNzd29yZCcsXHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHBhc3N3b3JkSXNTZXQ6IHRoaXMucHJvcHMudmFsdWUgPyB0cnVlIDogZmFsc2UsXHJcblx0XHRcdHNob3dDaGFuZ2VVSTogdGhpcy5wcm9wcy5tb2RlID09PSAnY3JlYXRlJyA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0cGFzc3dvcmQ6ICcnLFxyXG5cdFx0XHRjb25maXJtOiAnJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh3aGljaCwgZXZlbnQpIHtcclxuXHRcdHZhciBuZXdTdGF0ZSA9IHt9O1xyXG5cdFx0bmV3U3RhdGVbd2hpY2hdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0NoYW5nZVVJICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IHRydWUsXHJcblx0XHR9LCAoKSA9PiB0aGlzLmZvY3VzKCkpO1xyXG5cdH0sXHJcblxyXG5cdG9uQ2FuY2VsICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IGZhbHNlLFxyXG5cdFx0fSwgKCkgPT4gdGhpcy5mb2N1cygpKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gPEZvcm1JbnB1dCBub2VkaXQ+e3RoaXMucHJvcHMudmFsdWUgPyAnUGFzc3dvcmQgU2V0JyA6ICcnfTwvRm9ybUlucHV0PjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zaG93Q2hhbmdlVUkgPyB0aGlzLnJlbmRlckZpZWxkcygpIDogdGhpcy5yZW5kZXJDaGFuZ2VCdXR0b24oKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZHMgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIGJsb2NrPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMsICdwYXNzd29yZCcpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk5ldyBwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLmNvbmZpcm0pfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWQuYmluZCh0aGlzLCAnY29uZmlybScpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkNvbmZpcm0gbmV3IHBhc3N3b3JkXCIgdmFsdWU9e3RoaXMuc3RhdGUuY29uZmlybX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdHt0aGlzLnN0YXRlLnBhc3N3b3JkSXNTZXQgPyAoXHJcblx0XHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5DYW5jZWw8L0J1dHRvbj5cclxuXHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQ2hhbmdlQnV0dG9uICgpIHtcclxuXHRcdHZhciBsYWJlbCA9IHRoaXMuc3RhdGUucGFzc3dvcmRJc1NldFxyXG5cdFx0XHQ/ICdDaGFuZ2UgUGFzc3dvcmQnXHJcblx0XHRcdDogJ1NldCBQYXNzd29yZCc7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEJ1dHRvbiByZWY9XCJmb2N1c1RhcmdldFwiIG9uQ2xpY2s9e3RoaXMuc2hvd0NoYW5nZVVJfT57bGFiZWx9PC9CdXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IFNlZ21lbnRlZENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBFWElTVFNfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgU2V0JywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIFNldCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZXhpc3RzOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBQYXNzd29yZEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZXhpc3RzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoRVhJU1RTX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHRvZ2dsZUV4aXN0cyAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBleGlzdHM6IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlRXhpc3RzfVxyXG5cdFx0XHRcdG9wdGlvbnM9e0VYSVNUU19PUFRJT05TfVxyXG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXIuZXhpc3RzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG5jb25zdCBtb3JlSW5kaWNhdG9yU3R5bGUgPSB7XHJcblx0Y29sb3I6ICcjYmJiJyxcclxuXHRmb250U2l6ZTogJy44cmVtJyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0bWFyZ2luTGVmdDogOCxcclxufTtcclxuXHJcbnZhciBSZWxhdGlvbnNoaXBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdSZWxhdGlvbnNoaXBDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlck1hbnkgKHZhbHVlKSB7XHJcblx0XHRpZiAoIXZhbHVlIHx8ICF2YWx1ZS5sZW5ndGgpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0Y29uc3QgaXRlbXMgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblx0XHRcdGlmICghdmFsdWVbaV0pIGJyZWFrO1xyXG5cdFx0XHRpZiAoaSkge1xyXG5cdFx0XHRcdGl0ZW1zLnB1c2goPHNwYW4ga2V5PXsnY29tbWEnICsgaX0+LCA8L3NwYW4+KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgaW50ZXJpb3IgdHJ1bmNhdGU9e2ZhbHNlfSBrZXk9eydhbmNob3InICsgaX0gdG89e0tleXN0b25lLmFkbWluUGF0aCArICcvJyArIHJlZkxpc3QucGF0aCArICcvJyArIHZhbHVlW2ldLmlkfT5cclxuXHRcdFx0XHRcdHt2YWx1ZVtpXS5uYW1lfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlLmxlbmd0aCA+IDMpIHtcclxuXHRcdFx0aXRlbXMucHVzaCg8c3BhbiBrZXk9XCJtb3JlXCIgc3R5bGU9e21vcmVJbmRpY2F0b3JTdHlsZX0+Wy4uLnt2YWx1ZS5sZW5ndGggLSAzfSBtb3JlXTwvc3Bhbj4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e2l0ZW1zfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAodmFsdWUpIHtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgcmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUuaWR9IHBhZGRlZCBpbnRlcmlvciBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e3ZhbHVlLm5hbWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRjb25zdCBtYW55ID0gdGhpcy5wcm9wcy5jb2wuZmllbGQubWFueTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7bWFueSA/IHRoaXMucmVuZGVyTWFueSh2YWx1ZSkgOiB0aGlzLnJlbmRlclZhbHVlKHZhbHVlKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlbGF0aW9uc2hpcENvbHVtbjtcclxuIiwiaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IHsgbGlzdHNCeUtleSB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9saXN0cyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZVZhbHVlcyAoY3VycmVudCwgbmV4dCkge1xyXG5cdGNvbnN0IGN1cnJlbnRMZW5ndGggPSBjdXJyZW50ID8gY3VycmVudC5sZW5ndGggOiAwO1xyXG5cdGNvbnN0IG5leHRMZW5ndGggPSBuZXh0ID8gbmV4dC5sZW5ndGggOiAwO1xyXG5cdGlmIChjdXJyZW50TGVuZ3RoICE9PSBuZXh0TGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50TGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChjdXJyZW50W2ldICE9PSBuZXh0W2ldKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnUmVsYXRpb25zaGlwRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdSZWxhdGlvbnNoaXAnLFxyXG5cdH0sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZSA9IHt9O1xyXG5cdFx0dGhpcy5sb2FkVmFsdWUodGhpcy5wcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAobmV4dFByb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlIHx8IG5leHRQcm9wcy5tYW55ICYmIGNvbXBhcmVWYWx1ZXModGhpcy5wcm9wcy52YWx1ZSwgbmV4dFByb3BzLnZhbHVlKSkge1xyXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMudmFsdWVzW2tleV0gIT09IG5leHRQcm9wcy52YWx1ZXNba2V5XSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBjcmVhdGVJc09wZW46IGZhbHNlLCB2YWx1ZTogbnVsbCB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sIDEwKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZFZhbHVlKG5leHRQcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvdWxkQ29sbGFwc2UgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubWFueSkge1xyXG5cdFx0XHQvLyBtYW55OnRydWUgcmVsYXRpb25zaGlwcyBoYXZlIGFuIEFycmF5IGZvciBhIHZhbHVlXHJcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlO1xyXG5cdH0sXHJcblxyXG5cdGJ1aWxkRmlsdGVycyAoKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpbHRlcnMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlWzBdID09PSAnOicpIHtcclxuXHRcdFx0XHR2YXIgZmllbGROYW1lID0gdmFsdWUuc2xpY2UoMSk7XHJcblxyXG5cdFx0XHRcdHZhciB2YWwgPSB0aGlzLnByb3BzLnZhbHVlc1tmaWVsZE5hbWVdO1xyXG5cdFx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbDtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGZpbHRlcmluZyBieSBpZCBhbmQgaXRlbSB3YXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0XHRcdGlmIChmaWVsZE5hbWUgPT09ICc6X2lkJyAmJiBLZXlzdG9uZS5pdGVtKSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJzW2tleV0gPSBLZXlzdG9uZS5pdGVtLmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmaWx0ZXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblxyXG5cdFx0Xy5mb3JFYWNoKGZpbHRlcnMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG5cdFx0XHRwYXJ0cy5wdXNoKCdmaWx0ZXJzWycgKyBrZXkgKyAnXVt2YWx1ZV09JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcmJyk7XHJcblx0fSxcclxuXHJcblx0Y2FjaGVJdGVtIChpdGVtKSB7XHJcblx0XHRpdGVtLmhyZWYgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyB0aGlzLnByb3BzLnJlZkxpc3QucGF0aCArICcvJyArIGl0ZW0uaWQ7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9LFxyXG5cclxuXHRsb2FkVmFsdWUgKHZhbHVlcykge1xyXG5cdFx0aWYgKCF2YWx1ZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHR2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiB2YWx1ZXMuc3BsaXQoJywnKTtcclxuXHRcdGNvbnN0IGNhY2hlZFZhbHVlcyA9IHZhbHVlcy5tYXAoaSA9PiB0aGlzLl9pdGVtc0NhY2hlW2ldKS5maWx0ZXIoaSA9PiBpKTtcclxuXHRcdGlmIChjYWNoZWRWYWx1ZXMubGVuZ3RoID09PSB2YWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLm1hbnkgPyBjYWNoZWRWYWx1ZXMgOiBjYWNoZWRWYWx1ZXNbMF0sXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bG9hZGluZzogdHJ1ZSxcclxuXHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHR9KTtcclxuXHRcdGFzeW5jLm1hcCh2YWx1ZXMsICh2YWx1ZSwgZG9uZSkgPT4ge1xyXG5cdFx0XHR4aHIoe1xyXG5cdFx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUgKyAnP2Jhc2ljJyxcclxuXHRcdFx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmIChlcnIgfHwgIWRhdGEpIHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0dGhpcy5jYWNoZUl0ZW0oZGF0YSk7XHJcblx0XHRcdFx0ZG9uZShlcnIsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sIChlcnIsIGV4cGFuZGVkKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5wcm9wcy5tYW55ID8gZXhwYW5kZWQgOiBleHBhbmRlZFswXSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0bG9hZE9wdGlvbnNDYWxsYmFjazoge30sXHJcblx0bG9hZE9wdGlvbnMgKGlucHV0LCBjYWxsYmFjaykge1xyXG5cdFx0Ly8gTk9URTogdGhpcyBzZWVtcyBsaWtlIHRoZSB3cm9uZyB3YXkgdG8gYWRkIG9wdGlvbnMgdG8gdGhlIFNlbGVjdFxyXG5cdFx0dGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIGlucHV0ICsgJyYnICsgZmlsdGVycyxcclxuXHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIHtcclxuXHRcdFx0XHRvcHRpb25zOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdFx0Y29tcGxldGU6IGRhdGEucmVzdWx0cy5sZW5ndGggPT09IGRhdGEuY291bnQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0b3BlbkNyZWF0ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VDcmVhdGUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGNyZWF0ZUlzT3BlbjogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvbkNyZWF0ZSAoaXRlbSkge1xyXG5cdFx0dGhpcy5jYWNoZUl0ZW0oaXRlbSk7XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnZhbHVlKSkge1xyXG5cdFx0XHQvLyBGb3IgbWFueSByZWxhdGlvbnNoaXBzLCBhcHBlbmQgdGhlIG5ldyBpdGVtIHRvIHRoZSBlbmRcclxuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5zdGF0ZS52YWx1ZS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpO1xyXG5cdFx0XHR2YWx1ZXMucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy52YWx1ZUNoYW5nZWQodmFsdWVzLmpvaW4oJywnKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0XHR0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sobnVsbCwge1xyXG5cdFx0XHRjb21wbGV0ZTogdHJ1ZSxcclxuXHRcdFx0b3B0aW9uczogT2JqZWN0LmtleXModGhpcy5faXRlbXNDYWNoZSkubWFwKChrKSA9PiB0aGlzLl9pdGVtc0NhY2hlW2tdKSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jbG9zZUNyZWF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclNlbGVjdCAobm9lZGl0KSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHsvKiBUaGlzIGlucHV0IGVsZW1lbnQgZm9vbHMgU2FmYXJpJ3MgYXV0b2NvcnJlY3QgaW4gY2VydGFpbiBzaXR1YXRpb25zIHRoYXQgY29tcGxldGVseSBicmVhayByZWFjdC1zZWxlY3QgKi99XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHpJbmRleDogLTEsIG9wYWNpdHk6IDAgfX0gdGFiSW5kZXg9XCItMVwiLz5cclxuXHRcdFx0XHR7IXRoaXMuc3RhdGUuY3JlYXRlSXNPcGVuICYmIDxTZWxlY3QuQXN5bmNcclxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnByb3BzLm1hbnl9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17bm9lZGl0fVxyXG5cdFx0XHRcdFx0bG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnN9XHJcblx0XHRcdFx0XHRsYWJlbEtleT1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdGNhY2hlPXtmYWxzZX1cclxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXHJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuXHRcdFx0XHRcdHZhbHVlS2V5PVwiaWRcIlxyXG5cdFx0XHRcdC8+fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySW5wdXRHcm91cCAoKSB7XHJcblx0XHQvLyBUT0RPOiBmaW5kIGJldHRlciBzb2x1dGlvblxyXG5cdFx0Ly8gICB3aGVuIGltcG9ydGluZyB0aGUgQ3JlYXRlRm9ybSB1c2luZzogaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvQ3JlYXRlRm9ybSc7XHJcblx0XHQvLyAgIENyZWF0ZUZvcm0gd2FzIGltcG9ydGVkIGFzIGEgYmxhbmsgb2JqZWN0LiBUaGlzIHN0YWNrIG92ZXJmbG93IHBvc3Qgc3VnZ2VzdGVkIGxhemlsbHkgcmVxdWlyaW5nIGl0OlxyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTgwNzY2NC9jeWNsaWMtZGVwZW5kZW5jeS1yZXR1cm5zLWVtcHR5LW9iamVjdC1pbi1yZWFjdC1uYXRpdmVcclxuXHRcdC8vIFRPRE86IEltcGxlbWVudCB0aGlzIHNvbWV3aGVyZSBoaWdoZXIgaW4gdGhlIGFwcCwgaXQgYnJlYWtzIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSBSZWxhdGlvbnNoaXBGaWVsZCBjb21wb25lbnRcclxuXHRcdGNvbnN0IENyZWF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9DcmVhdGVGb3JtJyk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgYmxvY2s+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNlbGVjdCgpfVxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5vcGVuQ3JlYXRlfT4rPC9CdXR0b24+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxDcmVhdGVGb3JtXHJcblx0XHRcdFx0XHRsaXN0PXtsaXN0c0J5S2V5W3RoaXMucHJvcHMucmVmTGlzdC5rZXldfVxyXG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmNyZWF0ZUlzT3Blbn1cclxuXHRcdFx0XHRcdG9uQ3JlYXRlPXt0aGlzLm9uQ3JlYXRlfVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e3RoaXMuY2xvc2VDcmVhdGV9IC8+XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHsgbWFueSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRjb25zdCBwcm9wcyA9IHtcclxuXHRcdFx0Y2hpbGRyZW46IHZhbHVlID8gdmFsdWUubmFtZSA6IG51bGwsXHJcblx0XHRcdGNvbXBvbmVudDogdmFsdWUgPyAnYScgOiAnc3BhbicsXHJcblx0XHRcdGhyZWY6IHZhbHVlID8gdmFsdWUuaHJlZiA6IG51bGwsXHJcblx0XHRcdG5vZWRpdDogdHJ1ZSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1hbnkgPyB0aGlzLnJlbmRlclNlbGVjdCh0cnVlKSA6IDxGb3JtSW5wdXQgey4uLnByb3BzfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5jcmVhdGVJbmxpbmUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVySW5wdXRHcm91cCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyU2VsZWN0KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB4aHIgZnJvbSAneGhyJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCBQb3BvdXRMaXN0IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0JztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0xpbmtlZCBUbycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdOT1QgTGlua2VkIFRvJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IFtdLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBSZWxhdGlvbnNoaXBGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWVsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0aW52ZXJ0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0fSksXHJcblx0XHRvbkhlaWdodENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRzZWFyY2hSZXN1bHRzOiBbXSxcclxuXHRcdFx0c2VhcmNoU3RyaW5nOiAnJyxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczogW10sXHJcblx0XHRcdHZhbHVlSXNMb2FkaW5nOiB0cnVlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHRoaXMuX2l0ZW1zQ2FjaGUgPSB7fTtcclxuXHRcdHRoaXMubG9hZFNlYXJjaFJlc3VsdHModHJ1ZSk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmIChuZXh0UHJvcHMuZmlsdGVyLnZhbHVlICE9PSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBvcHVsYXRlVmFsdWUobmV4dFByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc0xvYWRpbmcgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc2VhcmNoSXNMb2FkaW5nIHx8IHRoaXMuc3RhdGUudmFsdWVJc0xvYWRpbmc7XHJcblx0fSxcclxuXHRwb3B1bGF0ZVZhbHVlICh2YWx1ZSkge1xyXG5cdFx0YXN5bmMubWFwKHZhbHVlLCAoaWQsIG5leHQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zQ2FjaGVbaWRdKSByZXR1cm4gbmV4dChudWxsLCB0aGlzLl9pdGVtc0NhY2hlW2lkXSk7XHJcblx0XHRcdHhocih7XHJcblx0XHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5maWVsZC5yZWZMaXN0LnBhdGggKyAnLycgKyBpZCArICc/YmFzaWMnLFxyXG5cdFx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGVyciB8fCAhZGF0YSkgcmV0dXJuIG5leHQoZXJyKTtcclxuXHRcdFx0XHR0aGlzLmNhY2hlSXRlbShkYXRhKTtcclxuXHRcdFx0XHRuZXh0KGVyciwgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgKGVyciwgaXRlbXMpID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdC8vIFRPRE86IEhhbmRsZSBlcnJvcnMgYmV0dGVyXHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtczonLCBlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHZhbHVlSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWxlY3RlZEl0ZW1zOiBpdGVtcyB8fCBbXSxcclxuXHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNhY2hlSXRlbSAoaXRlbSkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0fSxcclxuXHRidWlsZEZpbHRlcnMgKCkge1xyXG5cdFx0dmFyIGZpbHRlcnMgPSB7fTtcclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpZWxkLmZpbHRlcnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0XHRcdGlmICh2YWx1ZVswXSA9PT0gJzonKSByZXR1cm47XHJcblx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRfLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcblx0XHRcdHBhcnRzLnB1c2goJ2ZpbHRlcnNbJyArIGtleSArICddW3ZhbHVlXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyYnKTtcclxuXHR9LFxyXG5cdGxvYWRTZWFyY2hSZXN1bHRzICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0Y29uc3Qgc2VhcmNoU3RyaW5nID0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmc7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMuZmllbGQucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIHNlYXJjaFN0cmluZyArICcmJyArIGZpbHRlcnMsXHJcblx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGVycm9ycyBiZXR0ZXJcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGlmICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMucG9wdWxhdGVWYWx1ZSh0aGlzLnByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHNlYXJjaFN0cmluZyAhPT0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmcpIHJldHVybjtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0c2VhcmNoSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWFyY2hSZXN1bHRzOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdH0sIHRoaXMudXBkYXRlSGVpZ2h0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlSGVpZ2h0ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uSGVpZ2h0Q2hhbmdlKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25IZWlnaHRDaGFuZ2UodGhpcy5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKGludmVydGVkKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlU2VhcmNoIChlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgc2VhcmNoU3RyaW5nOiBlLnRhcmdldC52YWx1ZSB9LCB0aGlzLmxvYWRTZWFyY2hSZXN1bHRzKTtcclxuXHR9LFxyXG5cdHNlbGVjdEl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuY29uY2F0KGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbW92ZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuZmlsdGVyKGkgPT4geyByZXR1cm4gaSAhPT0gaXRlbS5pZDsgfSk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlckl0ZW1zIChpdGVtcywgc2VsZWN0ZWQpIHtcclxuXHRcdGNvbnN0IGl0ZW1JY29uSG92ZXIgPSBzZWxlY3RlZCA/ICd4JyA6ICdjaGVjayc7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxQb3BvdXRMaXN0Lkl0ZW1cclxuXHRcdFx0XHRcdGtleT17YGl0ZW0tJHtpfS0ke2l0ZW0uaWR9YH1cclxuXHRcdFx0XHRcdGljb249XCJkYXNoXCJcclxuXHRcdFx0XHRcdGljb25Ib3Zlcj17aXRlbUljb25Ib3Zlcn1cclxuXHRcdFx0XHRcdGxhYmVsPXtpdGVtLm5hbWV9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZCkgdGhpcy5yZW1vdmVJdGVtKGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHRlbHNlIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcclxuXHRcdFx0XHRcdH19XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkSXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSXRlbXM7XHJcblx0XHRjb25zdCBzZWFyY2hSZXN1bHRzID0gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmZpbHRlcihpID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmluZGV4T2YoaS5pZCkgPT09IC0xO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuaXNMb2FkaW5nKCkgPyAnTG9hZGluZy4uLicgOiAnRmluZCBhICcgKyB0aGlzLnByb3BzLmZpZWxkLmxhYmVsICsgJy4uLic7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHJlZj1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbCBlcXVhbFdpZHRoU2VnbWVudHMgb3B0aW9ucz17SU5WRVJURURfT1BUSU9OU30gdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLmludmVydGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVJbnZlcnRlZH0gLz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzFweCBkYXNoZWQgcmdiYSgwLDAsMCwwLjEpJywgcGFkZGluZ0JvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0IGF1dG9Gb2N1cyByZWY9XCJmb2N1c1RhcmdldFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFN0cmluZ30gb25DaGFuZ2U9e3RoaXMudXBkYXRlU2VhcmNofSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmc+U2VsZWN0ZWQ8L1BvcG91dExpc3QuSGVhZGluZz5cclxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySXRlbXMoc2VsZWN0ZWRJdGVtcywgdHJ1ZSl9XHJcblx0XHRcdFx0XHQ8L1BvcG91dExpc3Q+XHJcblx0XHRcdFx0KSA6IG51bGx9XHJcblx0XHRcdFx0e3NlYXJjaFJlc3VsdHMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmcgc3R5bGU9e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8geyBtYXJnaW5Ub3A6ICcyZW0nIH0gOiBudWxsfT5JdGVtczwvUG9wb3V0TGlzdC5IZWFkaW5nPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJdGVtcyhzZWFyY2hSZXN1bHRzKX1cclxuXHRcdFx0XHRcdDwvUG9wb3V0TGlzdD5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWxhdGlvbnNoaXBGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgVGV4dENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdC8vIGNyb3BwaW5nIHRleHQgaXMgaW1wb3J0YW50IGZvciB0ZXh0YXJlYSwgd2hpY2ggdXNlcyB0aGlzIGNvbHVtblxyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0cmV0dXJuIHZhbHVlID8gdmFsdWUuc3Vic3RyKDAsIDEwMCkgOiBudWxsO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5tb25vc3BhY2UgPyAnSXRlbUxpc3RfX3ZhbHVlLS1tb25vc3BhY2UnIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHRvPXt0aGlzLnByb3BzLmxpbmtUb30gZW1wdHk9e2VtcHR5fSBwYWRkZWQgaW50ZXJpb3IgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGV4dENvbHVtbjtcclxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1RleHQnLFxyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybVNlbGVjdCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ01hdGNoZXMnLCB2YWx1ZTogZmFsc2UgfSxcclxuXHR7IGxhYmVsOiAnRG9lcyBOT1QgTWF0Y2gnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdDb250YWlucycsIHZhbHVlOiAnY29udGFpbnMnIH0sXHJcblx0eyBsYWJlbDogJ0V4YWN0bHknLCB2YWx1ZTogJ2V4YWN0bHknIH0sXHJcblx0eyBsYWJlbDogJ0JlZ2lucyB3aXRoJywgdmFsdWU6ICdiZWdpbnNXaXRoJyB9LFxyXG5cdHsgbGFiZWw6ICdFbmRzIHdpdGgnLCB2YWx1ZTogJ2VuZHNXaXRoJyB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogJycsXHJcblx0fTtcclxufVxyXG5cclxudmFyIFRleHRGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdG1vZGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihNT0RFX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0XHRpbnZlcnRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHVwZGF0ZUZpbHRlciAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4udmFsdWUgfSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR1cGRhdGVWYWx1ZSAoZSkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17ZmlsdGVyLmludmVydGVkfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2VsZWN0TW9kZX1cclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX1cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlci52YWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRGaWx0ZXI7XHJcbiIsInZhciBFeE1hdGNoID0gcmVxdWlyZSgnZXhwcmVzc2lvbi1tYXRjaCcpOyAvLyBNYXRjaGVzIG9iamVjdHMgd2l0aCBleHByZXNzaW9uc1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBzb21ldGhpbmcgaXMgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSAge0FueX0gYXJnICAgVGhlIHNvbWV0aGluZyB3ZSB3YW50IHRvIGNoZWNrIHRoZSB0eXBlIG9mXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IElmIGFyZyBpcyBhbiBvYmplY3Qgb3Igbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdCAoYXJnKSB7XHJcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFdmFsdWF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgYSBmaWVsZCBiYXNlZCBvbiBpdHMgZGVwZW5kZW5jaWVzIGFuZCB0aGVpciB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fEFueX0gZGVwZW5kc09uIFRoZSBkZXBlbmRzT24gdmFyaWFibGUgd2UgZ2V0IGZyb20gdGhlIGZpZWxkXHJcbiAqIEBwYXJhbSAge09iamVjdH1cdFx0dmFsdWVzICAgIFRoZSB2YWx1ZXMgY3VycmVudGx5IGluIHRoZSBmaWVsZHNcclxuICogQHJldHVybiB7Qm9vbGVhbn1cdFx0XHQgIElmIHRoZSBjdXJyZW50IGZpZWxkIHNob3VsZCBiZSBkaXNwbGF5ZWQgYmFzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIFx0ICBvbiBpdCdzIGRlcGVuZGVuY2llcyBhbmQgdGhlaXIgdmFsdWVzXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2YWxEZXBlbmRzT24gKGRlcGVuZHNPbiwgdmFsdWVzKSB7XHJcblx0aWYgKCFpc09iamVjdChkZXBlbmRzT24pIHx8ICFPYmplY3Qua2V5cyhkZXBlbmRzT24pLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZmllbGQgc2hvdWxkIGJlIGRpc3BsYXllZCwgYmFzZWQgb24gdGhlIHZhbHVlcyBvZlxyXG5cdC8vIG90aGVyIGZpZWxkcyBhbmQgdGhlIGRlcGVuZHNPbiBjb25maWd1cmF0aW9uIG9mIHRoaXMgZmllbGRcclxuXHR2YXIgTWF0Y2ggPSBuZXcgRXhNYXRjaChkZXBlbmRzT24sIHZhbHVlcywgZmFsc2UpO1xyXG5cdHJldHVybiBNYXRjaC5tYXRjaCgpO1xyXG59O1xyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiZXhwb3J0cy5Db2x1bW5zID0ge1xudGV4dDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRDb2x1bW5cIiksXG5kYXRldGltZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtblwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwQ29sdW1uXCIpLFxubmFtZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9uYW1lL05hbWVDb2x1bW5cIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbENvbHVtblwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkQ29sdW1uXCIpLFxuY2xvdWRpbmFyeWltYWdlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW5cIiksXG5ib29sZWFuOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkNvbHVtblwiKSxcbmlkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtblwiKSxcbl9fdW5yZWNvZ25pc2VkX186IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0ludmFsaWRDb2x1bW5cIiksXG59O1xuZXhwb3J0cy5GaWVsZHMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWVsZFwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmllbGRcIiksXG5uYW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpZWxkXCIpLFxuZW1haWw6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWVsZFwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmllbGRcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZFwiKSxcbn07XG5leHBvcnRzLkZpbHRlcnMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpbHRlclwiKSxcbmRhdGV0aW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyXCIpLFxucmVsYXRpb25zaGlwOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXJcIiksXG5uYW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpbHRlclwiKSxcbmVtYWlsOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmlsdGVyXCIpLFxucGFzc3dvcmQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRGaWx0ZXJcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpbHRlclwiKSxcbmJvb2xlYW46IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyXCIpLFxufTtcbiJdfQ==
