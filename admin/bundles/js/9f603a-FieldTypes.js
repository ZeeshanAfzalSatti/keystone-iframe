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

},{"../../../theme":81}],3:[function(require,module,exports){
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

},{"../../../theme":81,"./colors":2}],5:[function(require,module,exports){
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

},{"../../../theme":81,"glamor":undefined,"react":undefined}],6:[function(require,module,exports){
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

},{"../../../theme":81,"../../../utils/color":84,"../../../utils/css":86}],8:[function(require,module,exports){
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

},{"../../../theme":81,"../../../utils/color":84}],11:[function(require,module,exports){
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

},{"../../../theme":81,"../../../utils/css":86,"./colors":10}],13:[function(require,module,exports){
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

},{"../../../theme":81}],15:[function(require,module,exports){
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

},{"../../../theme":81,"./sizes":14}],16:[function(require,module,exports){
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

},{"../../../theme":81}],19:[function(require,module,exports){
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

},{"../../../utils/concatClassnames":85,"./noedit":20,"./styles":21,"glamor":undefined,"react":undefined}],20:[function(require,module,exports){
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

},{"../../../theme":81,"../../../utils/color":84,"glamor":undefined,"react":undefined}],21:[function(require,module,exports){
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

},{"../../../theme":81}],22:[function(require,module,exports){
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

},{"../../../theme":81}],24:[function(require,module,exports){
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

},{"../../../theme":81}],26:[function(require,module,exports){
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

},{"../../../theme":81,"../../../utils/color":84}],28:[function(require,module,exports){
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

},{"../../../theme":81}],33:[function(require,module,exports){
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

},{"../../../theme":81}],36:[function(require,module,exports){
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

},{"../../../theme":81,"glamor":undefined,"react":undefined}],38:[function(require,module,exports){
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

},{"../../../theme":81}],42:[function(require,module,exports){
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

},{"../../../theme":81}],45:[function(require,module,exports){
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

},{"../../../theme":81,"../Button":6,"../Spinner":62,"glamor":undefined,"react":undefined}],46:[function(require,module,exports){
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

},{"../../../theme":81,"glamor":undefined,"react":undefined}],47:[function(require,module,exports){
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

},{"../../../theme":81,"../Portal":54,"../ScrollLock":57,"glamor":undefined,"react":undefined}],48:[function(require,module,exports){
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

},{"../../../theme":81,"glamor":undefined,"react":undefined}],49:[function(require,module,exports){
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

},{"../../../theme":81,"../GlyphButton":30,"glamor":undefined,"react":undefined}],50:[function(require,module,exports){
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

},{"../../../theme":81,"./page":52,"glamor":undefined,"react":undefined}],52:[function(require,module,exports){
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

},{"../../../theme":81,"glamor":undefined,"react":undefined}],53:[function(require,module,exports){
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

},{"../../../theme":81,"react":undefined}],56:[function(require,module,exports){
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

},{"../../../theme":81}],59:[function(require,module,exports){
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

},{"../../../theme":81,"./colors":58}],61:[function(require,module,exports){
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

},{"../../../theme":81,"./colors":61,"./sizes":63,"glamor":undefined}],65:[function(require,module,exports){
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

},{"../../utils/string":88,"../elemental":65,"react":undefined}],67:[function(require,module,exports){
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

},{"../elemental":65,"./AlertMessages":66,"./IframeContent":68,"./InvalidFieldType":69,"FieldTypes":"FieldTypes","object-assign":141,"react":undefined,"vkey":undefined}],68:[function(require,module,exports){
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var _theme = require('../../theme');

var _theme2 = _interopRequireDefault(_theme);

var _color = require('../../utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Kbd(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	props.className = (0, _glamor.css)(classes.kbd);

	return _react2.default.createElement('kbd', props);
};

var classes = {
	kbd: {
		backgroundColor: _theme2.default.color.body,
		borderRadius: 3,
		border: '1px solid #ccc',
		borderBottomColor: (0, _color.darken)('#ccc', 4),
		borderTopColor: (0, _color.lighten)('#ccc', 4),
		boxShadow: '0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset',
		display: 'inline-block',
		fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
		fontSize: '0.85em',
		fontWeight: 700,
		lineHeight: 'inherit',
		padding: '1px 4px',
		whiteSpace: 'nowrap',

		// little hack to tweak "visual-middle" alignment
		position: 'relative',
		top: -1
	}
};

module.exports = Kbd;

},{"../../theme":81,"../../utils/color":84,"glamor":undefined,"react":undefined}],71:[function(require,module,exports){
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

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],72:[function(require,module,exports){
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

},{"react":undefined}],73:[function(require,module,exports){
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

},{"react":undefined,"react-addons-css-transition-group":undefined}],74:[function(require,module,exports){
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

},{"./PopoutListHeading":75,"./PopoutListItem":76,"blacklist":undefined,"classnames":undefined,"react":undefined}],75:[function(require,module,exports){
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

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],76:[function(require,module,exports){
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

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],77:[function(require,module,exports){
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

},{"blacklist":undefined,"classnames":undefined,"react":undefined}],78:[function(require,module,exports){
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

},{"../Portal":79,"./PopoutBody":71,"./PopoutFooter":72,"./PopoutHeader":73,"./PopoutPane":77,"react":undefined,"react-addons-css-transition-group":undefined}],79:[function(require,module,exports){
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

},{"react":undefined,"react-dom":undefined}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./utils/color":84}],82:[function(require,module,exports){
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

},{"list-to-array":undefined,"object-assign":141,"qs":undefined,"xhr":undefined}],83:[function(require,module,exports){
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

},{"cloudinary-microurl":1}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./List":82}],88:[function(require,module,exports){
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

},{"i":undefined,"lodash":undefined}],89:[function(require,module,exports){
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

},{"../../admin/client/constants":80,"../../admin/client/utils/color":84,"blacklist":undefined,"classnames":undefined,"react":undefined}],90:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"react":undefined}],91:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../../admin/client/App/shared/Popout":78,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],92:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":81,"../../admin/client/utils/color":84,"react":undefined}],93:[function(require,module,exports){
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

},{"react":undefined}],94:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../../admin/client/theme":81,"glamor":undefined,"react":undefined}],95:[function(require,module,exports){
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

},{"classnames":undefined,"react":undefined}],96:[function(require,module,exports){
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

},{"classnames":undefined,"react":undefined,"react-router":undefined}],97:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrayColumn = _react2.default.createClass({
	displayName: 'ArrayColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.length) return null;

		return value.join(', ');
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

module.exports = ArrayColumn;

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],98:[function(require,module,exports){
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

},{"react":undefined}],99:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],100:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],101:[function(require,module,exports){
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var Button = require('elemental').Button;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;

var lastId = 0;
var ENTER_KEYCODE = 13;

function newItem(value) {
	lastId = lastId + 1;
	return { key: 'i' + lastId, value: value };
}

function getValueAsArray(values) {
	return values && _lodash2.default.isArray(values) ? values : [];
}

function reduceValues(values) {
	return getValueAsArray(values).map(function (i) {
		return i.value;
	});
}

module.exports = {
	getInitialState: function getInitialState() {
		return {
			values: Array.isArray(this.props.value) ? this.props.value.map(newItem) : []
		};
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (getValueAsArray(nextProps.value).join('|') !== reduceValues(this.state.values).join('|')) {
			this.setState({
				values: nextProps.value.map(newItem)
			});
		}
	},

	addItem: function addItem() {
		var _this = this;

		var newValues = this.state.values.concat(newItem(''));
		this.setState({
			values: newValues
		}, function () {
			if (!_this.state.values.length) return;
			(0, _reactDom.findDOMNode)(_this.refs['item_' + _this.state.values.length]).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	removeItem: function removeItem(i) {
		var newValues = _lodash2.default.without(this.state.values, i);
		this.setState({
			values: newValues
		}, function () {
			(0, _reactDom.findDOMNode)(this.refs.button).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	updateItem: function updateItem(i, event) {
		var updatedValues = this.state.values;
		var updateIndex = updatedValues.indexOf(i);
		var newValue = event.value || event.target.value;
		updatedValues[updateIndex].value = this.cleanInput ? this.cleanInput(newValue) : newValue;
		this.setState({
			values: updatedValues
		});
		this.valueChanged(reduceValues(updatedValues));
	},

	valueChanged: function valueChanged(values) {
		this.props.onChange({
			path: this.props.path,
			value: values
		});
	},

	renderField: function renderField() {
		return React.createElement(
			'div',
			null,
			this.state.values.map(this.renderItem),
			React.createElement(
				Button,
				{ ref: 'button', onClick: this.addItem },
				'Add item'
			)
		);
	},

	renderItem: function renderItem(item, index) {
		var Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		var value = this.processInputValue ? this.processInputValue(item.value) : item.value;
		return React.createElement(
			FormField,
			{ key: item.key },
			React.createElement(Input, { ref: 'item_' + (index + 1), name: this.getInputName(this.props.path), value: value, onChange: this.updateItem.bind(this, item), onKeyDown: this.addItemOnEnter, autoComplete: 'off' }),
			React.createElement(
				Button,
				{ type: 'link-cancel', onClick: this.removeItem.bind(this, item), className: 'keystone-relational-button' },
				React.createElement('span', { className: 'octicon octicon-x' })
			)
		);
	},

	renderValue: function renderValue() {
		var _this2 = this;

		var Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		return React.createElement(
			'div',
			null,
			this.state.values.map(function (item, i) {
				var value = _this2.formatValue ? _this2.formatValue(item.value) : item.value;
				return React.createElement(
					'div',
					{ key: i, style: i ? { marginTop: '1em' } : null },
					React.createElement(Input, { noedit: true, value: value })
				);
			})
		);
	},

	// Override shouldCollapse to check for array length
	shouldCollapse: function shouldCollapse() {
		return this.props.collapse && !this.props.value.length;
	},

	addItemOnEnter: function addItemOnEnter(event) {
		if (event.keyCode === ENTER_KEYCODE) {
			this.addItem();
			event.preventDefault();
		}
	}
};

},{"elemental":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined}],102:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../components/CollapsedFieldLabel":90,"../utils/evalDependsOn.js":140,"blacklist":undefined,"classnames":undefined,"react":undefined,"react-dom":undefined}],103:[function(require,module,exports){
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

},{"../../components/Checkbox":89,"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],104:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/Checkbox":89,"../Field":102,"react":undefined}],105:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],106:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"../../components/columns/CloudinaryImageSummary":98,"react":undefined}],107:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/utils/cloudinaryResize":83,"../../components/FileChangeMessage":92,"../../components/HiddenFileInput":93,"../../components/ImageThumbnail":94,"../Field":102,"react":undefined,"react-images":undefined}],108:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],109:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"moment":undefined,"react":undefined}],110:[function(require,module,exports){
'use strict';

var _DateInput = require('../../components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
TODO: Implement yearRange Prop, or deprecate for max / min values (better)
*/

var DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD';
var DEFAULT_FORMAT_STRING = 'Do MMM YYYY';

module.exports = _Field2.default.create({
	displayName: 'DateField',
	statics: {
		type: 'Date'
	},
	propTypes: {
		formatString: _react2.default.PropTypes.string,
		inputFormat: _react2.default.PropTypes.string,
		label: _react2.default.PropTypes.string,
		note: _react2.default.PropTypes.string,
		onChange: _react2.default.PropTypes.func,
		path: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			formatString: DEFAULT_FORMAT_STRING,
			inputFormat: DEFAULT_INPUT_FORMAT
		};
	},
	valueChanged: function valueChanged(_ref) {
		var value = _ref.value;

		this.props.onChange({
			path: this.props.path,
			value: value
		});
	},
	toMoment: function toMoment(value) {
		if (this.props.isUTC) {
			return _moment2.default.utc(value);
		} else {
			return (0, _moment2.default)(value);
		}
	},
	isValid: function isValid(value) {
		return this.toMoment(value, this.inputFormat).isValid();
	},
	format: function format(value) {
		return value ? this.toMoment(value).format(this.props.formatString) : '';
	},
	setToday: function setToday() {
		this.valueChanged({
			value: this.toMoment(new Date()).format(this.props.inputFormat)
		});
	},
	renderValue: function renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.format(this.props.value)
		);
	},
	renderField: function renderField() {
		var dateAsMoment = this.toMoment(this.props.value);
		var value = this.props.value && dateAsMoment.isValid() ? dateAsMoment.format(this.props.inputFormat) : this.props.value;

		return _react2.default.createElement(
			_elemental.InlineGroup,
			null,
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				{ grow: true },
				_react2.default.createElement(_DateInput2.default, {
					format: this.props.inputFormat,
					name: this.getInputName(this.props.path),
					onChange: this.valueChanged,
					ref: 'dateInput',
					value: value
				})
			),
			_react2.default.createElement(
				_elemental.InlineGroupSection,
				null,
				_react2.default.createElement(
					_elemental.Button,
					{ onClick: this.setToday },
					'Today'
				)
			)
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":91,"../Field":102,"moment":undefined,"react":undefined}],111:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],112:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateColumn');

},{"../date/DateColumn":109}],113:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":91,"../Field":102,"moment":undefined,"react":undefined}],114:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateFilter');

},{"../date/DateFilter":111}],115:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],116:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":102,"react":undefined}],117:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":132}],118:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberColumn = _react2.default.createClass({
	displayName: 'NumberColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue: function renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || isNaN(value)) value = 0.00;

		var formattedValue = this.props.col.path === 'money' ? (0, _numeral2.default)(value).format('$0,0.00') : value;

		return formattedValue;
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

module.exports = NumberColumn;

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"numeral":undefined,"react":undefined}],119:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'NumberField',
	statics: {
		type: 'Number'
	},
	valueChanged: function valueChanged(event) {
		var newValue = event.target.value;
		if (/^-?\d*\.?\d*$/.test(newValue)) {
			this.props.onChange({
				path: this.props.path,
				value: newValue
			});
		}
	},
	renderField: function renderField() {
		return _react2.default.createElement(_elemental.FormInput, {
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			value: this.props.value
		});
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":102,"react":undefined}],120:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODE_OPTIONS = [{ label: 'Exactly', value: 'equals' }, { label: 'Greater Than', value: 'gt' }, { label: 'Less Than', value: 'lt' }, { label: 'Between', value: 'between' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		value: ''
	};
}

var NumberFilter = _react2.default.createClass({
	displayName: 'NumberFilter',

	statics: {
		getDefaultValue: getDefaultValue
	},
	getDefaultProps: function getDefaultProps() {
		return {
			filter: getDefaultValue()
		};
	},
	componentDidMount: function componentDidMount() {
		// focus the text input
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	handleChangeBuilder: function handleChangeBuilder(type) {
		var self = this;
		return function handleChange(e) {
			var _self$props = self.props,
			    filter = _self$props.filter,
			    onChange = _self$props.onChange;


			switch (type) {
				case 'minValue':
					onChange({
						mode: filter.mode,
						value: {
							min: e.target.value,
							max: filter.value.max
						}
					});
					break;
				case 'maxValue':
					onChange({
						mode: filter.mode,
						value: {
							min: filter.value.min,
							max: e.target.value
						}
					});
					break;
				case 'value':
					onChange({
						mode: filter.mode,
						value: e.target.value
					});
			}
		};
	},

	// Update the props with this.props.onChange
	updateFilter: function updateFilter(changedProp) {
		this.props.onChange(_extends({}, this.props.filter, changedProp));
	},

	// Update the filter mode
	selectMode: function selectMode(e) {
		var _this = this;

		this.updateFilter({ mode: e.target.value });

		// focus on next tick
		setTimeout(function () {
			(0, _reactDom.findDOMNode)(_this.refs.focusTarget).focus();
		}, 0);
	},
	renderControls: function renderControls(mode) {
		var controls = void 0;
		var field = this.props.field;

		var placeholder = field.label + ' is ' + mode.label.toLowerCase() + '...';

		if (mode.value === 'between') {
			controls = _react2.default.createElement(
				_elemental.Grid.Row,
				{ xsmall: 'one-half', gutter: 10 },
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.handleChangeBuilder('minValue'),
						placeholder: 'Min.',
						ref: 'focusTarget',
						type: 'number'
					})
				),
				_react2.default.createElement(
					_elemental.Grid.Col,
					null,
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.handleChangeBuilder('maxValue'),
						placeholder: 'Max.',
						type: 'number'
					})
				)
			);
		} else {
			controls = _react2.default.createElement(_elemental.FormInput, {
				onChange: this.handleChangeBuilder('value'),
				placeholder: placeholder,
				ref: 'focusTarget',
				type: 'number'
			});
		}

		return controls;
	},
	render: function render() {
		var filter = this.props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];

		return _react2.default.createElement(
			_elemental.Form,
			{ component: 'div' },
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectMode,
					options: MODE_OPTIONS,
					value: mode.value
				})
			),
			this.renderControls(mode)
		);
	}
});

module.exports = NumberFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],121:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],122:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":102,"react":undefined}],123:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],124:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],125:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/CreateForm":67,"../../../admin/client/utils/lists":87,"../Field":102,"async":undefined,"lodash":undefined,"react":undefined,"react-select":undefined,"xhr":undefined}],126:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Popout/PopoutList":74,"async":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined,"xhr":undefined}],127:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectColumn = _react2.default.createClass({
	displayName: 'SelectColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object,
		linkTo: _react2.default.PropTypes.string
	},
	getValue: function getValue() {
		var value = this.props.data.fields[this.props.col.path];
		var option = this.props.col.field.ops.filter(function (i) {
			return i.value === value;
		})[0];

		return option ? option.label : null;
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

module.exports = SelectColumn;

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],128:[function(require,module,exports){
'use strict';

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Custom path support
 */

module.exports = _Field2.default.create({

	displayName: 'SelectField',
	statics: {
		type: 'Select'
	},

	valueChanged: function valueChanged(newValue) {
		// TODO: This should be natively handled by the Select component
		if (this.props.numeric && typeof newValue === 'string') {
			newValue = newValue ? Number(newValue) : undefined;
		}
		this.props.onChange({
			path: this.props.path,
			value: newValue
		});
	},
	renderValue: function renderValue() {
		var _props = this.props,
		    ops = _props.ops,
		    value = _props.value;

		var selected = ops.find(function (opt) {
			return opt.value === value;
		});

		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			selected ? selected.label : null
		);
	},
	renderField: function renderField() {
		var _props2 = this.props,
		    numeric = _props2.numeric,
		    ops = _props2.ops,
		    path = _props2.path,
		    val = _props2.value;

		// TODO: This should be natively handled by the Select component

		var options = numeric ? ops.map(function (i) {
			return { label: i.label, value: String(i.value) };
		}) : ops;
		var value = typeof val === 'number' ? String(val) : val;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('input', { type: 'text', style: { position: 'absolute', width: 1, height: 1, zIndex: -1, opacity: 0 }, tabIndex: '-1' }),
			_react2.default.createElement(_reactSelect2.default, {
				simpleValue: true,
				name: this.getInputName(path),
				value: value,
				options: options,
				onChange: this.valueChanged
			})
		);
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":102,"react":undefined,"react-select":undefined}],129:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _elemental = require('../../../admin/client/App/elemental');

var _PopoutList = require('../../../admin/client/App/shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _Kbd = require('../../../admin/client/App/shared/Kbd');

var _Kbd2 = _interopRequireDefault(_Kbd);

var _bindFunctions = require('../../utils/bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INVERTED_OPTIONS = [{ label: 'Matches', value: false }, { label: 'Does NOT Match', value: true }];

function getDefaultValue() {
	return {
		inverted: INVERTED_OPTIONS[0].value,
		value: []
	};
}

var FilterOption = function (_Component) {
	_inherits(FilterOption, _Component);

	function FilterOption() {
		_classCallCheck(this, FilterOption);

		var _this = _possibleConstructorReturn(this, (FilterOption.__proto__ || Object.getPrototypeOf(FilterOption)).call(this));

		_bindFunctions2.default.call(_this, ['handleClick']);
		return _this;
	}

	_createClass(FilterOption, [{
		key: 'handleClick',
		value: function handleClick() {
			var _props = this.props,
			    option = _props.option,
			    selected = _props.selected;

			this.props.onClick(option, selected);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    option = _props2.option,
			    selected = _props2.selected;

			return _react2.default.createElement(_PopoutList2.default.Item, {
				icon: selected ? 'check' : 'dash',
				isSelected: selected,
				label: option.label,
				onClick: this.handleClick
			});
		}
	}]);

	return FilterOption;
}(_react.Component);

var SelectFilter = function (_Component2) {
	_inherits(SelectFilter, _Component2);

	function SelectFilter() {
		_classCallCheck(this, SelectFilter);

		var _this2 = _possibleConstructorReturn(this, (SelectFilter.__proto__ || Object.getPrototypeOf(SelectFilter)).call(this));

		_bindFunctions2.default.call(_this2, ['detectOS', 'handleClick', 'handleKeyDown', 'handleKeyUp', 'removeOption', 'selectOption', 'toggleAllOptions', 'toggleInverted', 'updateFilter']);

		_this2.state = { metaDown: false };
		return _this2;
	}

	_createClass(SelectFilter, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.detectOS();
			document.body.addEventListener('keydown', this.handleKeyDown, false);
			document.body.addEventListener('keyup', this.handleKeyUp, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeEventListener('keydown', this.handleKeyDown);
			document.body.removeEventListener('keyup', this.handleKeyUp);
		}

		// ==============================
		// METHODS
		// ==============================

		// TODO this should probably be moved to the main App component and stored
		// in context for other components to subscribe to when required

	}, {
		key: 'detectOS',
		value: function detectOS() {
			var osName = 'Unknown OS';

			if (navigator.appVersion.includes('Win')) osName = 'Windows';
			if (navigator.appVersion.includes('Mac')) osName = 'MacOS';
			if (navigator.appVersion.includes('X11')) osName = 'UNIX';
			if (navigator.appVersion.includes('Linux')) osName = 'Linux';

			this.setState({ osName: osName });
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {
			if (_vkey2.default[e.keyCode] !== '<meta>') return;

			this.setState({ metaDown: true });
		}
	}, {
		key: 'handleKeyUp',
		value: function handleKeyUp(e) {
			if (_vkey2.default[e.keyCode] !== '<meta>') return;

			this.setState({ metaDown: false });
		}
	}, {
		key: 'toggleInverted',
		value: function toggleInverted(inverted) {
			this.updateFilter({ inverted: inverted });
		}
	}, {
		key: 'toggleAllOptions',
		value: function toggleAllOptions() {
			var _props3 = this.props,
			    field = _props3.field,
			    filter = _props3.filter;


			if (filter.value.length < field.ops.length) {
				this.updateFilter({ value: field.ops.map(function (i) {
						return i.value;
					}) });
			} else {
				this.updateFilter({ value: [] });
			}
		}
	}, {
		key: 'selectOption',
		value: function selectOption(option) {
			var value = this.state.metaDown ? this.props.filter.value.concat(option.value) : [option.value];

			this.updateFilter({ value: value });
		}
	}, {
		key: 'removeOption',
		value: function removeOption(option) {
			var value = this.state.metaDown ? this.props.filter.value.filter(function (i) {
				return i !== option.value;
			}) : [option.value];

			this.updateFilter({ value: value });
		}
	}, {
		key: 'handleClick',
		value: function handleClick(option, selected) {
			selected ? this.removeOption(option) : this.selectOption(option);
		}
	}, {
		key: 'updateFilter',
		value: function updateFilter(value) {
			this.props.onChange(_extends({}, this.props.filter, value));
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var _this3 = this;

			return this.props.field.ops.map(function (option, i) {
				var selected = _this3.props.filter.value.indexOf(option.value) > -1;
				return _react2.default.createElement(FilterOption, {
					key: 'item-' + i + '-' + option.value,
					option: option,
					selected: selected,
					onClick: _this3.handleClick
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    field = _props4.field,
			    filter = _props4.filter;

			var indeterminate = filter.value.length < field.ops.length;

			var metaKeyLabel = this.state.osName === 'MacOS' ? 'cmd' : 'ctrl';

			var fieldStyles = {
				alignItems: 'center',
				borderBottom: '1px dashed rgba(0,0,0,0.1)',
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: '1em',
				paddingBottom: '1em'
			};

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
					'div',
					{ style: fieldStyles },
					_react2.default.createElement(
						_elemental.Button,
						{ size: 'xsmall', onClick: this.toggleAllOptions, style: { padding: 0, width: 50 } },
						indeterminate ? 'All' : 'None'
					),
					_react2.default.createElement(
						_elemental.FormNote,
						{ style: { margin: 0 } },
						'Hold ',
						_react2.default.createElement(
							_Kbd2.default,
							null,
							metaKeyLabel
						),
						' to select multiple options'
					)
				),
				this.renderOptions()
			);
		}
	}]);

	return SelectFilter;
}(_react.Component);

;

SelectFilter.propTypes = {
	field: _react.PropTypes.object,
	filter: _react.PropTypes.shape({
		inverted: _react.PropTypes.boolean,
		value: _react.PropTypes.array
	})
};
SelectFilter.getDefaultValue = getDefaultValue;
SelectFilter.defaultProps = {
	filter: getDefaultValue()
};

module.exports = SelectFilter;

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Kbd":70,"../../../admin/client/App/shared/Popout/PopoutList":74,"../../utils/bindFunctions":139,"react":undefined,"vkey":undefined}],130:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],131:[function(require,module,exports){
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

},{"../Field":102}],132:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],133:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextColumn');

},{"../text/TextColumn":130}],134:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'TextareaField',
	statics: {
		type: 'Textarea'
	},
	renderValue: function renderValue() {
		var height = this.props.height;


		var styles = {
			height: height,
			whiteSpace: 'pre-wrap',
			overflowY: 'auto'
		};
		return _react2.default.createElement(
			_elemental.FormInput,
			{ multiline: true, noedit: true, style: styles },
			this.props.value
		);
	},
	renderField: function renderField() {
		var _props = this.props,
		    height = _props.height,
		    path = _props.path,
		    style = _props.style,
		    value = _props.value;


		var styles = _extends({
			height: height
		}, style);
		return _react2.default.createElement(_elemental.FormInput, {
			autoComplete: 'off',
			multiline: true,
			name: this.getInputName(path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			style: styles,
			value: value
		});
	}
});

},{"../../../admin/client/App/elemental":65,"../Field":102,"react":undefined}],135:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":132}],136:[function(require,module,exports){
'use strict';

module.exports = require('../../components/columns/ArrayColumn');

},{"../../components/columns/ArrayColumn":97}],137:[function(require,module,exports){
'use strict';

var _ArrayField = require('../../mixins/ArrayField');

var _ArrayField2 = _interopRequireDefault(_ArrayField);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({
	displayName: 'TextArrayField',
	statics: {
		type: 'TextArray'
	},
	mixins: [_ArrayField2.default]
});

},{"../../mixins/ArrayField":101,"../Field":102}],138:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODE_OPTIONS = [{ label: 'Contains', value: 'contains' }, { label: 'Exactly', value: 'exactly' }, { label: 'Begins with', value: 'beginsWith' }, { label: 'Ends with', value: 'endsWith' }];

var PRESENCE_OPTIONS = [{ label: 'At least one element', value: 'some' }, { label: 'No element', value: 'none' }];

function getDefaultValue() {
	return {
		mode: MODE_OPTIONS[0].value,
		presence: PRESENCE_OPTIONS[0].value,
		value: ''
	};
}

var TextArrayFilter = _react2.default.createClass({
	displayName: 'TextArrayFilter',

	propTypes: {
		filter: _react2.default.PropTypes.shape({
			mode: _react2.default.PropTypes.oneOf(MODE_OPTIONS.map(function (i) {
				return i.value;
			})),
			presence: _react2.default.PropTypes.oneOf(PRESENCE_OPTIONS.map(function (i) {
				return i.value;
			})),
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
	selectPresence: function selectPresence(e) {
		var presence = e.target.value;
		this.updateFilter({ presence: presence });
		(0, _reactDom.findDOMNode)(this.refs.focusTarget).focus();
	},
	updateValue: function updateValue(e) {
		this.updateFilter({ value: e.target.value });
	},
	render: function render() {
		var filter = this.props.filter;

		var mode = MODE_OPTIONS.filter(function (i) {
			return i.value === filter.mode;
		})[0];
		var presence = PRESENCE_OPTIONS.filter(function (i) {
			return i.value === filter.presence;
		})[0];
		var beingVerb = mode.value === 'exactly' ? ' is ' : ' ';
		var placeholder = presence.label + beingVerb + mode.label.toLowerCase() + '...';

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(_elemental.FormSelect, {
					onChange: this.selectPresence,
					options: PRESENCE_OPTIONS,
					value: presence.value
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

module.exports = TextArrayFilter;

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],139:[function(require,module,exports){
"use strict";

/*
	Tidier binding for component methods to Classes
	===============================================

	constructor() {
		super();
		bindFunctions.call(this, ['handleClick', 'handleOther']);
	}
*/
module.exports = function bindFunctions(functions) {
	var _this = this;

	functions.forEach(function (f) {
		return _this[f] = _this[f].bind(_this);
	});
};

},{}],140:[function(require,module,exports){
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

},{"expression-match":undefined}],141:[function(require,module,exports){
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
  email: require("../../fields/types/email/EmailColumn"),
  select: require("../../fields/types/select/SelectColumn"),
  password: require("../../fields/types/password/PasswordColumn"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageColumn"),
  boolean: require("../../fields/types/boolean/BooleanColumn"),
  date: require("../../fields/types/date/DateColumn"),
  number: require("../../fields/types/number/NumberColumn"),
  textarea: require("../../fields/types/textarea/TextareaColumn"),
  textarray: require("../../fields/types/textarray/TextArrayColumn"),
  id: require("../../fields/components/columns/IdColumn"),
  __unrecognised__: require("../../fields/components/columns/InvalidColumn")
};
exports.Fields = {
  text: require("../../fields/types/text/TextField"),
  datetime: require("../../fields/types/datetime/DatetimeField"),
  relationship: require("../../fields/types/relationship/RelationshipField"),
  email: require("../../fields/types/email/EmailField"),
  select: require("../../fields/types/select/SelectField"),
  password: require("../../fields/types/password/PasswordField"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageField"),
  boolean: require("../../fields/types/boolean/BooleanField"),
  date: require("../../fields/types/date/DateField"),
  number: require("../../fields/types/number/NumberField"),
  textarea: require("../../fields/types/textarea/TextareaField"),
  textarray: require("../../fields/types/textarray/TextArrayField")
};
exports.Filters = {
  text: require("../../fields/types/text/TextFilter"),
  datetime: require("../../fields/types/datetime/DatetimeFilter"),
  relationship: require("../../fields/types/relationship/RelationshipFilter"),
  email: require("../../fields/types/email/EmailFilter"),
  select: require("../../fields/types/select/SelectFilter"),
  password: require("../../fields/types/password/PasswordFilter"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageFilter"),
  boolean: require("../../fields/types/boolean/BooleanFilter"),
  date: require("../../fields/types/date/DateFilter"),
  number: require("../../fields/types/number/NumberFilter"),
  textarea: require("../../fields/types/textarea/TextareaFilter"),
  textarray: require("../../fields/types/textarray/TextArrayFilter")
};

},{"../../fields/components/columns/IdColumn":99,"../../fields/components/columns/InvalidColumn":100,"../../fields/types/boolean/BooleanColumn":103,"../../fields/types/boolean/BooleanField":104,"../../fields/types/boolean/BooleanFilter":105,"../../fields/types/cloudinaryimage/CloudinaryImageColumn":106,"../../fields/types/cloudinaryimage/CloudinaryImageField":107,"../../fields/types/cloudinaryimage/CloudinaryImageFilter":108,"../../fields/types/date/DateColumn":109,"../../fields/types/date/DateField":110,"../../fields/types/date/DateFilter":111,"../../fields/types/datetime/DatetimeColumn":112,"../../fields/types/datetime/DatetimeField":113,"../../fields/types/datetime/DatetimeFilter":114,"../../fields/types/email/EmailColumn":115,"../../fields/types/email/EmailField":116,"../../fields/types/email/EmailFilter":117,"../../fields/types/number/NumberColumn":118,"../../fields/types/number/NumberField":119,"../../fields/types/number/NumberFilter":120,"../../fields/types/password/PasswordColumn":121,"../../fields/types/password/PasswordField":122,"../../fields/types/password/PasswordFilter":123,"../../fields/types/relationship/RelationshipColumn":124,"../../fields/types/relationship/RelationshipField":125,"../../fields/types/relationship/RelationshipFilter":126,"../../fields/types/select/SelectColumn":127,"../../fields/types/select/SelectField":128,"../../fields/types/select/SelectFilter":129,"../../fields/types/text/TextColumn":130,"../../fields/types/text/TextField":131,"../../fields/types/text/TextFilter":132,"../../fields/types/textarea/TextareaColumn":133,"../../fields/types/textarea/TextareaField":134,"../../fields/types/textarea/TextareaFilter":135,"../../fields/types/textarray/TextArrayColumn":136,"../../fields/types/textarray/TextArrayField":137,"../../fields/types/textarray/TextArrayFilter":138}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL2Nsb3VkaW5hcnktbWljcm91cmwvdXJsLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0FsZXJ0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0JsYW5rU3RhdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQnV0dG9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9DZW50ZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9DaGlwL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Ecm9wZG93bkJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtRmllbGQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9ub2VkaXQuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUxhYmVsL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybU5vdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaEJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhGaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvb2N0aWNvbnMuanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0dyaWRDb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWRSb3cvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXBTZWN0aW9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTGFiZWxsZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvTG9hZGluZ0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvYm9keS5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZGlhbG9nLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9mb290ZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2hlYWRlci5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vcGFnZS5qcyIsIkFwcC9lbGVtZW50YWwvUGFzc0NvbnRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BvcnRhbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvUmVzcG9uc2l2ZVRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NjcmVlblJlYWRlck9ubHkvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Njcm9sbExvY2svaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NlZ21lbnRlZENvbnRyb2wvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvU3Bpbm5lci9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc2l6ZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvQWxlcnRNZXNzYWdlcy5qcyIsIkFwcC9zaGFyZWQvQ3JlYXRlRm9ybS5qcyIsIkFwcC9zaGFyZWQvSWZyYW1lQ29udGVudC5qcyIsIkFwcC9zaGFyZWQvSW52YWxpZEZpZWxkVHlwZS5qcyIsIkFwcC9zaGFyZWQvS2JkLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0Qm9keS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEZvb3Rlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEhlYWRlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0SGVhZGluZy5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3RJdGVtLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0UGFuZS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L2luZGV4LmpzIiwiQXBwL3NoYXJlZC9Qb3J0YWwuanMiLCJjb25zdGFudHMuanMiLCJ0aGVtZS5qcyIsInV0aWxzL0xpc3QuanMiLCJ1dGlscy9jbG91ZGluYXJ5UmVzaXplLmpzIiwidXRpbHMvY29sb3IuanMiLCJ1dGlscy9jb25jYXRDbGFzc25hbWVzLmpzIiwidXRpbHMvY3NzLmpzIiwidXRpbHMvbGlzdHMuanMiLCJ1dGlscy9zdHJpbmcuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9DaGVja2JveC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0NvbGxhcHNlZEZpZWxkTGFiZWwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9EYXRlSW5wdXQuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9GaWxlQ2hhbmdlTWVzc2FnZS5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0hpZGRlbkZpbGVJbnB1dC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0ltYWdlVGh1bWJuYWlsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0FycmF5Q29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9DbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5LmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL2NvbHVtbnMvSW52YWxpZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy9taXhpbnMvQXJyYXlGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9GaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5Db2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvbnVtYmVyL051bWJlckNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvbnVtYmVyL051bWJlckZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0RmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHRhcmVhL1RleHRhcmVhQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHRhcmVhL1RleHRhcmVhRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFycmF5L1RleHRBcnJheUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJyYXkvVGV4dEFycmF5RmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFycmF5L1RleHRBcnJheUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiLi4vLi4vZmllbGRzL3V0aWxzL2V2YWxEZXBlbmRzT24uanMiLCIuLi8uLi8uLi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiX3N0cmVhbV8wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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RFc7QUFFakIsWUFBVSxRQUFRLDJDQUFSLENBRk87QUFHakIsZ0JBQWMsUUFBUSxtREFBUixDQUhHO0FBSWpCLFNBQU8sUUFBUSxxQ0FBUixDQUpVO0FBS2pCLFVBQVEsUUFBUSx1Q0FBUixDQUxTO0FBTWpCLFlBQVUsUUFBUSwyQ0FBUixDQU5PO0FBT2pCLG1CQUFpQixRQUFRLHlEQUFSLENBUEE7QUFRakIsV0FBUyxRQUFRLHlDQUFSLENBUlE7QUFTakIsUUFBTSxRQUFRLG1DQUFSLENBVFc7QUFVakIsVUFBUSxRQUFRLHVDQUFSLENBVlM7QUFXakIsWUFBVSxRQUFRLDJDQUFSLENBWE87QUFZakIsYUFBVyxRQUFRLDZDQUFSO0FBWk0sQ0FBakI7QUFjQSxRQUFRLE9BQVIsR0FBa0I7QUFDbEIsUUFBTSxRQUFRLG9DQUFSLENBRFk7QUFFbEIsWUFBVSxRQUFRLDRDQUFSLENBRlE7QUFHbEIsZ0JBQWMsUUFBUSxvREFBUixDQUhJO0FBSWxCLFNBQU8sUUFBUSxzQ0FBUixDQUpXO0FBS2xCLFVBQVEsUUFBUSx3Q0FBUixDQUxVO0FBTWxCLFlBQVUsUUFBUSw0Q0FBUixDQU5RO0FBT2xCLG1CQUFpQixRQUFRLDBEQUFSLENBUEM7QUFRbEIsV0FBUyxRQUFRLDBDQUFSLENBUlM7QUFTbEIsUUFBTSxRQUFRLG9DQUFSLENBVFk7QUFVbEIsVUFBUSxRQUFRLHdDQUFSLENBVlU7QUFXbEIsWUFBVSxRQUFRLDRDQUFSLENBWFE7QUFZbEIsYUFBVyxRQUFRLDhDQUFSO0FBWk8sQ0FBbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBFeGFtcGxlIG9wdGlvbnM6XG5cbi8vIGZsYWdzOiAncHJvZ3Jlc3NpdmUnXG4vLyBmbGFnczogWydwcm9ncmVzc2l2ZSddXG4vLyBxdWFsaXR5OiA4MFxuLy8gY3JvcDogJ2ZpdCcsICdmaWxsJ1xuLy8gZ3Jhdml0eTogJ2ZhY2UnXG4vLyBmZXRjaF9mb3JtYXQ6ICdhdXRvJ1xuLy8gd2lkdGg6IDMwMFxuLy8gaGVpZ2h0OiAzMDBcbi8vIGVmZmVjdDogYmx1cjoyMDBcblxudmFyIFRZUEVTID0gW1xuICB7bmFtZTogJ2Nyb3AnLCBwcmVmaXg6J2MnfSxcbiAge25hbWU6ICdlZmZlY3QnLCBwcmVmaXg6J2UnfSxcbiAge25hbWU6ICdmZXRjaF9mb3JtYXQnLCBwcmVmaXg6J2YnfSxcbiAge25hbWU6ICdmbGFncycsIHByZWZpeDonZmwnfSxcbiAge25hbWU6ICdncmF2aXR5JywgcHJlZml4OidnJ30sXG4gIHtuYW1lOiAnaGVpZ2h0JywgcHJlZml4OidoJ30sXG4gIHtuYW1lOiAncmFkaXVzJywgcHJlZml4OidyJ30sXG4gIHtuYW1lOiAncXVhbGl0eScsIHByZWZpeDoncSd9LFxuICB7bmFtZTogJ3dpZHRoJywgcHJlZml4Oid3J30sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gIHZhciBzY2hlbWUgPSBvcHRpb25zLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIHZhciBjbG91ZF9uYW1lID0gb3B0aW9ucy5jbG91ZF9uYW1lO1xuICBpZiAoIWNsb3VkX25hbWUpIHRocm93IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIG9wdGlvbnMuY2xvdWRfbmFtZScpO1xuICBcbiAgdmFyIHBhcmFtcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgVFlQRVMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmFtZSA9IFRZUEVTW2ldLm5hbWU7XG4gICAgdmFyIHByZWZpeCA9IFRZUEVTW2ldLnByZWZpeDtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnNbbmFtZV0pKSB7XG4gICAgICBvcHRpb25zW25hbWVdLmZvckVhY2goZnVuY3Rpb24ob3B0KSB7cGFyYW1zLnB1c2gocHJlZml4ICsgJ18nICsgb3B0KX0pO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMucHVzaChwcmVmaXggKyAnXycgKyBvcHRpb25zW25hbWVdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdXJsUGFyYW1zID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtcy5qb2luKCcsJykgKyAnLycgOiAnJztcbiAgcmV0dXJuIHNjaGVtZSArICc6Ly9yZXMuY2xvdWRpbmFyeS5jb20vJ1xuICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuY2xvdWRfbmFtZSlcbiAgICArICcvaW1hZ2UvdXBsb2FkLycgKyB1cmxQYXJhbXNcbiAgICArIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG59O1xuXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5hbGVydC5jb2xvci5kYW5nZXIsXHJcblx0ZXJyb3I6IHRoZW1lLmFsZXJ0LmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5hbGVydC5jb2xvci5pbmZvLFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmFsZXJ0LmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuYWxlcnQuY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4sIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbi8vIGNsb25lIGNoaWxkcmVuIGlmIGEgY2xhc3MgZXhpc3RzIGZvciB0aGUgdGFnbmFtZVxyXG5jb25zdCBjbG9uZVdpdGhDbGFzc25hbWVzID0gKGMpID0+IHtcclxuXHRjb25zdCB0eXBlID0gYy50eXBlICYmIGMudHlwZS5kaXNwbGF5TmFtZVxyXG5cdFx0PyBjLnR5cGUuZGlzcGxheU5hbWVcclxuXHRcdDogYy50eXBlIHx8IG51bGw7XHJcblxyXG5cdGlmICghdHlwZSB8fCAhY2xhc3Nlc1t0eXBlXSkgcmV0dXJuIGM7XHJcblxyXG5cdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0Y2xhc3NOYW1lOiBjc3MoY2xhc3Nlc1t0eXBlXSksXHJcblx0fSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBBbGVydCAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5hbGVydCxcclxuXHRcdGNsYXNzZXNbY29sb3JdLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHRwcm9wcy5jaGlsZHJlbiA9IENoaWxkcmVuLm1hcChjaGlsZHJlbiwgY2xvbmVXaXRoQ2xhc3NuYW1lcyk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gZGF0YS1hbGVydC10eXBlPXtjb2xvcn0gLz47XHJcbn07XHJcblxyXG5BbGVydC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKS5pc1JlcXVpcmVkLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkFsZXJ0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbGVydDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGNvbG9yc1tjb2xvcl0uYm9yZGVyLFxyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0udGV4dCxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgaGVhZGluZ3NcclxuY29uc3QgaGVhZGluZ1RhZ25hbWVzID0ge307XHJcblsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXS5mb3JFYWNoKHRhZyA9PiB7XHJcblx0aGVhZGluZ1RhZ25hbWVzW3RhZ10gPSB7IGNvbG9yOiAnaW5oZXJpdCcgfTtcclxufSk7XHJcblxyXG5jb25zdCBsaW5rU3R5bGVzID0ge1xyXG5cdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG5cclxuXHQnOmhvdmVyJzogeyBjb2xvcjogJ2luaGVyaXQnIH0sXHJcblx0Jzpmb2N1cyc6IHsgY29sb3I6ICdpbmhlcml0JyB9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWxlcnQ6IHtcclxuXHRcdGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5hbGVydC5ib3JkZXJSYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5hbGVydC5ib3JkZXJXaWR0aCxcclxuXHRcdG1hcmdpbjogdGhlbWUuYWxlcnQubWFyZ2luLFxyXG5cdFx0cGFkZGluZzogdGhlbWUuYWxlcnQucGFkZGluZyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGE6IGxpbmtTdHlsZXMsXHJcblx0TGluazogbGlua1N0eWxlcyxcclxuXHRzdHJvbmc6IHtcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHR9LFxyXG5cclxuXHQvLyBoZWFkaW5nc1xyXG5cdC4uLmhlYWRpbmdUYWduYW1lcyxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIEJsYW5rU3RhdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0aGVhZGluZyxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7ISFoZWFkaW5nICYmIDxoMiBkYXRhLWUyZS1ibGFuay1zdGF0ZS1oZWFkaW5nIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuaGVhZGluZyl9PntoZWFkaW5nfTwvaDI+fVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5cclxuQmxhbmtTdGF0ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKS5pc1JlcXVpcmVkLFxyXG5cdGhlYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkJsYW5rU3RhdGUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5ibGFua3N0YXRlLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJsYW5rc3RhdGUuYm9yZGVyUmFkaXVzLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmJsYW5rc3RhdGUuY29sb3IsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdWZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nVmVydGljYWwsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdH0sXHJcblxyXG5cdGhlYWRpbmc6IHtcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsXHJcblxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5Cb3R0b206IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJsYW5rU3RhdGU7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jb25zdCBjb21tb25DbGFzc2VzID0gc3R5bGVzLmNvbW1vbjtcclxuY29uc3Qgc3R5bGVzaGVldENhY2hlID0ge307XHJcbmZ1bmN0aW9uIGdldFN0eWxlU2hlZXQgKHZhcmlhbnQsIGNvbG9yKSB7XHJcblx0Y29uc3QgY2FjaGVLZXkgPSBgJHt2YXJpYW50fS0ke2NvbG9yfWA7XHJcblx0aWYgKCFzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldKSB7XHJcblx0XHRjb25zdCB2YXJpYW50U3R5bGVzID0gc3R5bGVzW3ZhcmlhbnRdKGNvbG9yKTtcclxuXHRcdHN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV0gPSB2YXJpYW50U3R5bGVzO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XTtcclxufVxyXG5cclxuY29uc3QgQlVUVE9OX1NJWkVTID0gWydsYXJnZScsICdtZWRpdW0nLCAnc21hbGwnLCAneHNtYWxsJ107XHJcbmNvbnN0IEJVVFRPTl9WQVJJQU5UUyA9IFsnZmlsbCcsICdob2xsb3cnLCAnbGluayddO1xyXG5jb25zdCBCVVRUT05fQ09MT1JTID0gWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlcicsICdjYW5jZWwnLCAnZGVsZXRlJ107XHJcblxyXG4vLyBOT1RFIG11c3QgTk9UIGJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRvIGFsbG93IGByZWZzYFxyXG5cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0dmFyIHtcclxuXHRcdFx0YWN0aXZlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGJsb2NrLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbG9yLFxyXG5cdFx0XHRjb21wb25lbnQ6IFRhZyxcclxuXHRcdFx0ZGlzYWJsZWQsXHJcblx0XHRcdHNpemUsXHJcblx0XHRcdHZhcmlhbnQsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBnZXQgdGhlIHN0eWxlc1xyXG5cdFx0Y29uc3QgdmFyaWFudENsYXNzZXMgPSBnZXRTdHlsZVNoZWV0KHZhcmlhbnQsIGNvbG9yKTtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y29tbW9uQ2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRjb21tb25DbGFzc2VzW3NpemVdLFxyXG5cdFx0XHR2YXJpYW50Q2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRibG9jayA/IGNvbW1vbkNsYXNzZXMuYmxvY2sgOiBudWxsLFxyXG5cdFx0XHRkaXNhYmxlZCA/IGNvbW1vbkNsYXNzZXMuZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRhY3RpdmUgPyB2YXJpYW50Q2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHQuLi5hcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyByZXR1cm4gYW4gYW5jaG9yIG9yIGJ1dHRvblxyXG5cdFx0aWYgKCFUYWcpIHtcclxuXHRcdFx0VGFnID0gcHJvcHMuaHJlZiA/ICdhJyA6ICdidXR0b24nO1xyXG5cdFx0fVxyXG5cdFx0Ly8gRW5zdXJlIGJ1dHRvbnMgZG9uJ3Qgc3VibWl0IGJ5IGRlZmF1bHRcclxuXHRcdGlmIChUYWcgPT09ICdidXR0b24nICYmICFwcm9wcy50eXBlKSB7XHJcblx0XHRcdHByb3BzLnR5cGUgPSAnYnV0dG9uJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPFRhZyB7Li4ucHJvcHN9IC8+O1xyXG5cdH1cclxufTtcclxuXHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pKSxcclxuXHRibG9jazogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fQ09MT1JTKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fU0laRVMpLFxyXG5cdHZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fVkFSSUFOVFMpLFxyXG59O1xyXG5CdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogW10sXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxuXHR2YXJpYW50OiAnZmlsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEJ1dHRvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGdyYWRpZW50VmVydGljYWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jc3MnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5cclxuLy8gQ29tbW9uIFN0eWxlc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5leHBvcnRzLmNvbW1vbiA9IHtcclxuXHQvLyBCYXNlIEJ1dHRvblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRiYXNlOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlcldpZHRoJzogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoLFxyXG5cdFx0J2JvcmRlclN0eWxlJzogJ3NvbGlkJyxcclxuXHRcdCdib3JkZXJDb2xvcic6ICd0cmFuc3BhcmVudCcsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuYnV0dG9uLmJvcmRlclJhZGl1cyxcclxuXHRcdCdjdXJzb3InOiAncG9pbnRlcicsXHJcblx0XHQnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0J2ZvbnRXZWlnaHQnOiB0aGVtZS5idXR0b24uZm9udC53ZWlnaHQsXHJcblx0XHQnaGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsXHJcblx0XHQnbWFyZ2luQm90dG9tJzogMCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5idXR0b24ucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdCdvdXRsaW5lJzogMCxcclxuXHRcdCd0ZXh0QWxpZ24nOiAnY2VudGVyJyxcclxuXHRcdCd0b3VjaEFjdGlvbic6ICdtYW5pcHVsYXRpb24nLFxyXG5cdFx0J3VzZXJTZWxlY3QnOiAnbm9uZScsXHJcblx0XHQndmVydGljYWxBbGlnbic6ICdtaWRkbGUnLFxyXG5cdFx0J3doaXRlU3BhY2UnOiAnbm93cmFwJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uLmRlZmF1bHQudGV4dENvbG9yLFxyXG5cdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b24uZGVmYXVsdC50ZXh0Q29sb3IsXHJcblx0XHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0Ly8gQmxvY2sgRGlzcGxheVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRibG9jazoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0fSxcclxuXHQvLyBEaXNhYmxlZFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0b3BhY2l0eTogMC40LFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblx0Ly8gU2l6ZXNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0bGFyZ2U6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmRlZmF1bHQsXHJcblx0fSxcclxuXHRzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHR9LFxyXG5cdHhzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS54c21hbGwsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS45JyxcclxuXHRcdHBhZGRpbmdMZWZ0OiAnLjY2ZW0nLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAnLjY2ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG5cclxuLy8gRmlsbCBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uRmlsbFZhcmlhbnQgKHRleHRDb2xvciwgYmdDb2xvcikge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDEwKSwgZGFya2VuKGJnQ29sb3IsIDUpKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgMTApLCBkYXJrZW4oYmdDb2xvciwgNSkpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCA1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9YCxcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUoYmdDb2xvciwgMjUpfWAsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBkYXJrZW4oYmdDb2xvciwgMTApLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDI1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9YCxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDUpLCBkYXJrZW4oYmdDb2xvciwgMTApLCBiZ0NvbG9yKSxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYCR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMjApfSAke2RhcmtlbihiZ0NvbG9yLCAyNSl9YCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHRcdFx0J2ZvbnRXZWlnaHQnOiA0MDAsXHJcblx0XHRcdCd0ZXh0U2hhZG93JzogJzAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4yNSknLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogZm9jdXNTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn1cclxuLy8gVE9ETzogVGhpcyBpcyBwcmV0dHkgaGFja3ksIG5lZWRzIHRvIGJlIGNvbnNvbGlkYXRlZCB3aXRoIHRoZSBWYXJpYW50KCkgbWV0aG9kXHJcbi8vIGFib3ZlIChuZWVkcyBtb3JlIHRoZW1lIHZhcmlhYmxlcyB0byBiZSBpbXBsZW1lbnRlZCB0aG91Z2gpXHJcbmZ1bmN0aW9uIGJ1dHRvbkZpbGxEZWZhdWx0ICgpIHtcclxuXHRjb25zdCBib3JkZXJDb2xvciA9IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0O1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZmZicsICcjZWVlJyksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJvcmRlckNvbG9yLCA1KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDUpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgMTApfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzU3R5bGVzID0ge1xyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX1gLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiAnI2U2ZTZlNicsXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxMCksXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZhZmFmYScsICcjZWFlYWVhJyksXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGAke2JvcmRlckNvbG9yfSAke2Rhcmtlbihib3JkZXJDb2xvciwgNil9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCAxMil9YCxcclxuXHRcdFx0J2NvbG9yJzogdGhlbWUuY29sb3IudGV4dCxcclxuXHRcdFx0J3RleHRTaGFkb3cnOiAnMCAxcHggMCB3aGl0ZScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBmb2N1c1N0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGdyb3NzIGhhY2tcclxuXHRcdGFjdGl2ZToge1xyXG5cdFx0XHQuLi5hY3RpdmVTdHlsZXMsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRcdC4uLmFjdGl2ZVN0eWxlcyxcclxuXHRcdFx0XHQuLi5mb2N1c1N0eWxlcyxcclxuXHRcdFx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX0sIGluc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSlgLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5leHBvcnRzLmZpbGwgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxEZWZhdWx0KCk7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxWYXJpYW50KCd3aGl0ZScsIHRoZW1lLmJ1dHRvbi5kYW5nZXIuYmdDb2xvcik7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbFZhcmlhbnQoJ3doaXRlJywgdGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gSG9sbG93IFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25Ib2xsb3dWYXJpYW50ICh0ZXh0Q29sb3IsIGJvcmRlckNvbG9yKSB7XHJcblx0Y29uc3QgZm9jdXNBbmRIb3ZlclN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3hTaGFkb3c6ICdub25lJyxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c09ubHlTdHlsZXMgPSB7XHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKGJvcmRlckNvbG9yLCAxMCl9YCxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZShib3JkZXJDb2xvciwgMzUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMjUpLFxyXG5cdFx0Ym94U2hhZG93OiAnbm9uZScsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGJvcmRlckNvbG9yLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogZm9jdXNBbmRIb3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyAnOiBPYmplY3QuYXNzaWduKHt9LCBmb2N1c0FuZEhvdmVyU3R5bGVzLCBmb2N1c09ubHlTdHlsZXMpLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59O1xyXG5leHBvcnRzLmhvbGxvdyA9IChjb2xvcikgPT4ge1xyXG5cdC8vIFRPRE86IGJldHRlciBoYW5kbGluZyBvZiBjYW5jZWwgYW5kIGRlbGV0ZSBjb2xvcnNcclxuXHRpZiAoY29sb3IgPT09ICdjYW5jZWwnIHx8IGNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0cmV0dXJuIGJ1dHRvbkhvbGxvd1ZhcmlhbnQodGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yLCB0aGVtZS5idXR0b25bY29sb3JdLmJvcmRlckNvbG9yKTtcclxufTtcclxuXHJcblxyXG4vLyBMaW5rIFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25MaW5rVmFyaWFudCAodGV4dENvbG9yLCBob3ZlckNvbG9yKSB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHRjb2xvcjogaG92ZXJDb2xvcixcclxuXHRcdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0XHQnYm9yZGVyJzogMCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdub25lJyxcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cdFx0XHQnZm9udFdlaWdodCc6ICdub3JtYWwnLFxyXG5cdFx0XHQnb3V0bGluZSc6ICdub25lJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogaG92ZXJTdHlsZXMsXHJcblx0fTtcclxufTtcclxuZnVuY3Rpb24gYnV0dG9uTGlua0RlbGV0ZSAoKSB7XHJcblx0Y29uc3Qgc3R5bGVzID0gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLCBkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMCkpLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgNCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDQpLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfWAsXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uc3R5bGVzLmJhc2UsXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnRzLmxpbmsgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmxpbmssIHRoZW1lLmNvbG9yLmxpbmtIb3Zlcik7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtEZWxldGUoKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvcltjb2xvcl0sIHRoZW1lLmNvbG9yW2NvbG9yXSk7XHJcblx0fVxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBDZW50ZXIgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aGVpZ2h0LFxyXG5cdHN0eWxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jZW50ZXIsIGNsYXNzTmFtZSk7XHJcblx0cHJvcHMuc3R5bGUgPSB7IGhlaWdodCwgLi4uc3R5bGUgfTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuQ2VudGVyLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGhlaWdodDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuQ2VudGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdGhlaWdodDogJ2F1dG8nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDZW50ZXI7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDZW50ZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjZW50ZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5jb25zdCBiYXNlQ29sb3JzID0ge307XHJcblsnZGFuZ2VyJywgJ2luZm8nLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRiYXNlQ29sb3JzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxMCksXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMjApLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5jb25zdCBpbnZlcnRlZENvbG9ycyA9IHt9O1xyXG5bJ2RhbmdlcicsICdpbmZvJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ10uZm9yRWFjaChjb2xvciA9PiB7XHJcblx0aW52ZXJ0ZWRDb2xvcnNbY29sb3IgKyAnX19pbnZlcnRlZCddID0ge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvcltjb2xvcl0sIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yLmdyYXkxMCxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IHRoZW1lLmNvbG9yLmdyYXkyMCxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogdGhlbWUuY29sb3IuZ3JheTE1LFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0Li4uYmFzZUNvbG9ycyxcclxuXHJcblx0Ly8gaW52ZXJ0ZWRcclxuXHRkZWZhdWx0X19pbnZlcnRlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvci5ncmF5NjAsIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yLmdyYXk2MCwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9LFxyXG5cdC4uLmludmVydGVkQ29sb3JzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gQ2hpcCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRjb2xvcixcclxuXHRpbnZlcnRlZCxcclxuXHRsYWJlbCxcclxuXHRvbkNsZWFyLFxyXG5cdG9uQ2xpY2ssXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY2hpcCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblx0Y29uc3QgbGFiZWxDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdGNsYXNzZXMubGFiZWwsXHJcblx0XHRjbGFzc2VzWydidXR0b25fXycgKyBjb2xvciArIChpbnZlcnRlZCA/ICdfX2ludmVydGVkJyA6ICcnKV1cclxuXHQpO1xyXG5cdGNvbnN0IGNsZWFyQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRjbGFzc2VzLmNsZWFyLFxyXG5cdFx0Y2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3IgKyAoaW52ZXJ0ZWQgPyAnX19pbnZlcnRlZCcgOiAnJyldXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPXtsYWJlbENsYXNzTmFtZX0+XHJcblx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHRcdHshIW9uQ2xlYXIgJiYgKFxyXG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xlYXJ9IGNsYXNzTmFtZT17Y2xlYXJDbGFzc05hbWV9PlxyXG5cdFx0XHRcdFx0JnRpbWVzO1xyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQpfVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkNoaXAucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSkuaXNSZXF1aXJlZCxcclxuXHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRvbkNsZWFyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxufTtcclxuQ2hpcC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hpcDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGJvcmRlckxlZnRSYWRpdXMsIGJvcmRlclJpZ2h0UmFkaXVzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3NzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmRIb3ZlcixcclxuXHR9O1xyXG5cclxuXHRjb2xvclZhcmlhbnRzWydidXR0b25fXycgKyBjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZCxcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLnRleHQsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0JzphY3RpdmUnOiB7XHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kQWN0aXZlLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNoaXA6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0bGluZUhlaWdodDogJzIuMmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAnbm9uZScsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRmbG9hdDogJ2xlZnQnLFxyXG5cdFx0cGFkZGluZzogJzAgLjllbScsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblxyXG5cdFx0Ly8gbWFrZSBwaWxscyAtIGV4YWdnZXJhdGUgdGhlIHBhZGRpbmcgdG93YXJkIHRoZSByYWRpaSBzbyBpdCBsb29rcyBldmVuXHJcblx0XHQnOmZpcnN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJMZWZ0UmFkaXVzKCczZW0nKSxcclxuXHRcdFx0cGFkZGluZ0xlZnQ6ICcxLjFlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJSaWdodFJhZGl1cygnM2VtJyksXHJcblx0XHRcdHBhZGRpbmdSaWdodDogJzEuMWVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHByb3ZpZGUgc2VwYXJhdGlvbiBiZXR3ZWVuIHRoZSBsYWJlbCBhbmQgY2xlYXIgYnV0dG9uc1xyXG5cdC8vIGZsb2F0aW5nIHN0b3BzIHRoZSBtYXJnaW5zIGZyb20gY29sbGFwc2luZyBpbnRvIGVhY2hpbmdcclxuXHJcblx0bGFiZWw6IHsgbWFyZ2luUmlnaHQ6IDEgfSxcclxuXHRjbGVhcjogeyBtYXJnaW5MZWZ0OiAxIH0sXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuZnVuY3Rpb24gQ29udGFpbmVyICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNsZWFyRmxvYXRpbmdDaGlsZHJlbixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHR3aWR0aCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc2VzW3dpZHRoXSxcclxuXHRcdGNsZWFyRmxvYXRpbmdDaGlsZHJlbiA/IGNsYXNzZXMuY2xlYXJmaXggOiBudWxsXHJcblx0KTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XHJcblx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLmlzUmVxdWlyZWQsXHJcblx0d2lkdGg6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhzaXplcykpLmlzUmVxdWlyZWQsXHJcbn07XHJcbkNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHR3aWR0aDogJ2xhcmdlJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmNvbnRhaW5lci5zaXplLnNtYWxsLFxyXG5cdG1lZGl1bTogdGhlbWUuY29udGFpbmVyLnNpemUubWVkaXVtLFxyXG5cdGxhcmdlOiB0aGVtZS5jb250YWluZXIuc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRhaW5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKHNpemVzKS5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tzaXplXSA9IHtcclxuXHRcdG1heFdpZHRoOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8qXHJcblx0TWljcm8gY2xlYXJmaXggaGFja1xyXG5cdDEuXHRUaGUgc3BhY2UgY29udGVudCBpcyBvbmUgd2F5IHRvIGF2b2lkIGFuIE9wZXJhIGJ1ZyB3aGVuIHRoZVxyXG5cdFx0XHRjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlIGlzIGluY2x1ZGVkIGFueXdoZXJlIGVsc2UgaW4gdGhlIGRvY3VtZW50LlxyXG5cdFx0XHRPdGhlcndpc2UgaXQgY2F1c2VzIHNwYWNlIHRvIGFwcGVhciBhdCB0aGUgdG9wIGFuZCBib3R0b20gb2YgZWxlbWVudHNcclxuXHRcdFx0dGhhdCBhcmUgY2xlYXJmaXhlZC5cclxuXHQyLlx0VGhlIHVzZSBvZiBgdGFibGVgIHJhdGhlciB0aGFuIGBibG9ja2AgaXMgb25seSBuZWNlc3NhcnkgaWYgdXNpbmdcclxuXHRcdFx0YDpiZWZvcmVgIHRvIGNvbnRhaW4gdGhlIHRvcC1tYXJnaW5zIG9mIGNoaWxkIGVsZW1lbnRzLlxyXG4qL1xyXG5jb25zdCBjbGVhcmZpeFN0eWxlcyA9IHtcclxuXHRjbGVhcjogJ2JvdGgnLFxyXG5cdGNvbnRlbnQ6ICdcIiBcIicsIC8vIDFcclxuXHRkaXNwbGF5OiAndGFibGUnLCAvLyAyXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdG1hcmdpbkxlZnQ6ICdhdXRvJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnYXV0bycsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHR9LFxyXG5cclxuXHQvLyBjbGVhciBmbG9hdGluZyBjaGlsZHJlblxyXG5cdGNsZWFyZml4OiB7XHJcblx0XHQnOmJlZm9yZSc6IGNsZWFyZml4U3R5bGVzLFxyXG5cdFx0JzphZnRlcic6IGNsZWFyZml4U3R5bGVzLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcblxyXG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbiAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdyl9IC8+XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gTk9URVxyXG4vLyAxOiB0YWtlIGFkdmFudGFnZSBvZiBgY3VycmVudENvbG9yYCBieSBsZWF2aW5nIGJvcmRlciB0b3AgY29sb3IgdW5kZWZpbmVkXHJcbi8vIDI6IGV2ZW4gdGhvdWdoIHRoZSBhcnJvdyBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkLCB2aXN1YWxseSBpdCBhcHBlYXJzIHRvbyBsb3dcclxuLy8gICAgYmVjYXVzZSBvZiBsb3dlcmNhc2UgY2hhcmFjdGVycyBiZXNpZGUgaXRcclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyVG9wOiAnMC4zZW0gc29saWQnLCAvLyAxXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogMCxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gMlxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogMCxcclxuXHJcblx0XHQvLyBhZGQgc3BhY2luZ1xyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5MZWZ0OiAnMC41ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bkJ1dHRvbjtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgRm9ybUxhYmVsIGZyb20gJy4uL0Zvcm1MYWJlbCc7XHJcblxyXG5jbGFzcyBGb3JtRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmZvcm1GaWVsZElkID0gZ2VuZXJhdGVJZCgpO1xyXG5cdH1cclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUZpZWxkSWQ6IHRoaXMuZm9ybUZpZWxkSWQsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmb3JtTGF5b3V0ID0gJ2Jhc2ljJywgbGFiZWxXaWR0aCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGNoaWxkcmVuLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNyb3BMYWJlbCxcclxuXHRcdFx0aHRtbEZvcixcclxuXHRcdFx0bGFiZWwsXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm1GaWVsZCxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybUZpZWxkLS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0sXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsID8gY2xhc3Nlc1snRm9ybUZpZWxkLS1vZmZzZXQtYWJzZW50LWxhYmVsJ10gOiBudWxsLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdGlmIChvZmZzZXRBYnNlbnRMYWJlbCAmJiBsYWJlbFdpZHRoKSB7XHJcblx0XHRcdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0XHRcdHBhZGRpbmdMZWZ0OiBsYWJlbFdpZHRoLFxyXG5cdFx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGVsZW1lbnRzXHJcblx0XHRjb25zdCBjb21wb25lbnRMYWJlbCA9IGxhYmVsID8gKFxyXG5cdFx0XHQ8Rm9ybUxhYmVsIGh0bWxGb3I9e2h0bWxGb3J9IGNyb3BUZXh0PXtjcm9wTGFiZWx9PlxyXG5cdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0PC9Gb3JtTGFiZWw+XHJcblx0XHQpIDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHsuLi5wcm9wc30gaHRtbEZvcj17aHRtbEZvcn0+XHJcblx0XHRcdFx0e2NvbXBvbmVudExhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUZpZWxkLmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtRmllbGQuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1GaWVsZC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcblx0Y3JvcExhYmVsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRodG1sRm9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG9mZnNldEFic2VudExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlSWQgKCkge1xyXG5cdHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1GaWVsZDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gRmllbGRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1GaWVsZCc6IHtcclxuXHRcdG1hcmdpbkJvdHRvbTogJzFlbScsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhIGhvcml6b250YWwgZm9ybVxyXG5cclxuXHQnRm9ybUZpZWxkLS1mb3JtLWxheW91dC1ob3Jpem9udGFsJzoge1xyXG5cdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0ZGlzcGxheTogJ3RhYmxlJyxcclxuXHRcdFx0dGFibGVMYXlvdXQ6ICdmaXhlZCcsXHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIGluc2lkZSBob3Jpem9udGFsIGZvcm1cclxuXHQvLyB0eXBpY2FsbHkgZm9yIHVzZSB3aXRoIHN1Ym1pdCBidXR0b24gaW5zaWRlXHJcblx0J0Zvcm1GaWVsZC0tb2Zmc2V0LWFic2VudC1sYWJlbCc6IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5mb3JtLmxhYmVsLndpZHRoLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGFuIGlubGluZSBmb3JtXHJcblxyXG5cdCdGb3JtRmllbGQtLWZvcm0tbGF5b3V0LWlubGluZSc6IHtcclxuXHRcdCdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcblx0XHQncGFkZGluZ0xlZnQnOiAnMC4yNWVtJyxcclxuXHRcdCdwYWRkaW5nUmlnaHQnOiAnMC4yNWVtJyxcclxuXHRcdCd2ZXJ0aWNhbEFsaWduJzogJ3RvcCcsXHJcblxyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHsgcGFkZGluZ0xlZnQ6IDAgfSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHsgcGFkZGluZ1JpZ2h0OiAwIH0sXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb25jYXRDbGFzc25hbWVzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmNhdENsYXNzbmFtZXMnO1xyXG5pbXBvcnQgSW5wdXROb2VkaXQgZnJvbSAnLi9ub2VkaXQnO1xyXG5cclxuLy8gTk9URSBtdXN0IE5PVCBiZSBmdW5jdGlvbmFsIGNvbXBvbmVudCB0byBhbGxvdyBgcmVmc2BcclxuXHJcbmNsYXNzIEZvcm1JbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Ymx1ciAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5ibHVyKCk7XHJcblx0fVxyXG5cdGZvY3VzICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmZvY3VzKCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRkaXNhYmxlZCxcclxuXHRcdFx0aWQsXHJcblx0XHRcdG11bHRpbGluZSxcclxuXHRcdFx0bm9lZGl0LFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gTk9URSByZXR1cm4gYSBkaWZmZXJlbnQgY29tcG9uZW50IGZvciBgbm9lZGl0YFxyXG5cdFx0aWYgKG5vZWRpdCkgcmV0dXJuIDxJbnB1dE5vZWRpdCB7Li4udGhpcy5wcm9wc30gLz47XHJcblxyXG5cdFx0Y29uc3QgeyBmb3JtRmllbGRJZCwgZm9ybUxheW91dCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdHByb3BzLmlkID0gaWQgfHwgZm9ybUZpZWxkSWQ7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybUlucHV0LFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtSW5wdXRfX3NpemUtLScgKyBzaXplXSxcclxuXHRcdFx0ZGlzYWJsZWQgPyBjbGFzc2VzWydGb3JtSW5wdXQtLWRpc2FibGVkJ10gOiBudWxsLFxyXG5cdFx0XHRmb3JtTGF5b3V0ID8gY2xhc3Nlc1snRm9ybUlucHV0LS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0gOiBudWxsLFxyXG5cdFx0XHQuLi5jb25jYXRDbGFzc25hbWVzKGFwaHJvZGl0ZVN0eWxlcylcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzZXRSZWYgPSAobikgPT4gKHRoaXMudGFyZ2V0ID0gbik7XHJcblx0XHRjb25zdCBUYWcgPSBtdWx0aWxpbmUgPyAndGV4dGFyZWEnIDogJ2lucHV0JztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8VGFnXHJcblx0XHRcdFx0cmVmPXtzZXRSZWZ9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtSW5wdXQucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0bXVsdGlsaW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ3NtYWxsJywgJ2xhcmdlJ10pLFxyXG5cdHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ2RlZmF1bHQnLFxyXG5cdHR5cGU6ICd0ZXh0JyxcclxufTtcclxuRm9ybUlucHV0LmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUlucHV0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmZ1bmN0aW9uIEZvcm1JbnB1dE5vZWRpdCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRtdWx0aWxpbmUsXHJcblx0bm9lZGl0LCAvLyBOT1RFIG5vdCB1c2VkLCBqdXN0IHJlbW92ZWQgZnJvbSBwcm9wc1xyXG5cdHR5cGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMubm9lZGl0LFxyXG5cdFx0Y3JvcFRleHQgPyBjbGFzc2VzLmNyb3BUZXh0IDogbnVsbCxcclxuXHRcdG11bHRpbGluZSA/IGNsYXNzZXMubXVsdGlsaW5lIDogbnVsbCxcclxuXHRcdChwcm9wcy5ocmVmIHx8IHByb3BzLm9uQ2xpY2spID8gY2xhc3Nlcy5hbmNob3IgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkZvcm1JbnB1dE5vZWRpdC5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkZvcm1JbnB1dE5vZWRpdC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnc3BhbicsXHJcbn07XHJcblxyXG5jb25zdCBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzID0ge1xyXG5cdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0Ym9yZGVyQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxuXHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdG5vZWRpdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLm5vZWRpdCxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ub2VkaXQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTgwLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cclxuXHRcdC8vIHByZXZlbnQgZW1wdHkgaW5wdXRzIGZyb20gY29sbGFwc2luZyBieSBhZGRpbmcgY29udGVudFxyXG5cdFx0JzplbXB0eTpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRcdGNvbnRlbnQ6ICdcIihubyB2YWx1ZSlcIicsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdG11bHRpbGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0bGluZUhlaWdodDogJzEuNCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiAnMC42ZW0nLFxyXG5cdFx0cGFkZGluZ1RvcDogJzAuNmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBpbmRpY2F0ZSBjbGlja2FiaWxpdHkgd2hlbiB1c2luZyBhbiBhbmNob3JcclxuXHRhbmNob3I6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCA1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdFx0bWFyZ2luUmlnaHQ6IDUsXHJcblx0XHRtaW5XaWR0aDogMCxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtSW5wdXROb2VkaXQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIElucHV0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtSW5wdXQnOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kQ29sb3InOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHQnYmFja2dyb3VuZEltYWdlJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlckNvbG9yJzogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdCdib3JkZXJTdHlsZSc6ICdzb2xpZCcsXHJcblx0XHQnYm9yZGVyV2lkdGgnOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHQnYm94U2hhZG93JzogdGhlbWUuaW5wdXQuYm94U2hhZG93LFxyXG5cdFx0J2NvbG9yJzogJ2luaGVyaXQnLCAvLyBGSVhNRVxyXG5cdFx0J2Rpc3BsYXknOiAnYmxvY2snLFxyXG5cdFx0J2hlaWdodCc6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0J3RyYW5zaXRpb24nOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdCd3aWR0aCc6ICcxMDAlJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmhvdmVyLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0J0Zvcm1JbnB1dC0tZGlzYWJsZWQnOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGlzYWJsZWQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc2l6ZXNcclxuXHQnRm9ybUlucHV0X19zaXplLS1zbWFsbCc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0fSxcclxuXHQnRm9ybUlucHV0X19zaXplLS1sYXJnZSc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybUxhYmVsICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRodG1sRm9yLFxyXG5cdC4uLnByb3BzXHJcbn0sXHJcbntcclxuXHRmb3JtRmllbGRJZCxcclxuXHRmb3JtTGF5b3V0LFxyXG5cdGxhYmVsV2lkdGgsXHJcbn0pIHtcclxuXHRwcm9wcy5odG1sRm9yID0gaHRtbEZvciB8fCBmb3JtRmllbGRJZDtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLkZvcm1MYWJlbCxcclxuXHRcdGZvcm1MYXlvdXQgPyBjbGFzc2VzWydGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSA6IG51bGwsXHJcblx0XHRjcm9wVGV4dCA/IGNsYXNzZXNbJ0Zvcm1MYWJlbC0tY3JvcC10ZXh0J10gOiBudWxsLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cdGlmIChsYWJlbFdpZHRoKSB7XHJcblx0XHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdFx0d2lkdGg6IGxhYmVsV2lkdGgsXHJcblx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1MYWJlbC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuRm9ybUxhYmVsLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdsYWJlbCcsXHJcbn07XHJcbkZvcm1MYWJlbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUxhYmVsO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBMYWJlbFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUxhYmVsJzoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubGFiZWwuY29sb3IsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9ybS5sYWJlbC5mb250U2l6ZSxcclxuXHRcdGZvbnRXZWlnaHQ6IHRoZW1lLmZvcm0ubGFiZWwuZm9udFdlaWdodCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMC41ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGEgaG9yaXpvbnRhbCBmb3JtXHJcblxyXG5cdCdGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LWhvcml6b250YWwnOiB7XHJcblx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRkaXNwbGF5OiAndGFibGUtY2VsbCcsXHJcblx0XHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LCAvLyBmaXhcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAwLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IDUsXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnLFxyXG5cdFx0XHR3aWR0aDogdGhlbWUuZm9ybS5sYWJlbC53aWR0aCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gY3JvcCBsb25nIHRleHRcclxuXHJcblx0J0Zvcm1MYWJlbC0tY3JvcC10ZXh0Jzoge1xyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybU5vdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aHRtbCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMubm90ZSwgY2xhc3NOYW1lKTtcclxuXHJcblx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0aWYgKGNoaWxkcmVuICYmIGh0bWwpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IEZvcm1Ob3RlIGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYGh0bWxgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gaHRtbCA/IChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGh0bWwgfX0gLz5cclxuXHQpIDogKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5Gb3JtTm90ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRodG1sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtTm90ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybU5vdGU7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIE5vdGVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubm90ZS5jb2xvcixcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb3JtLm5vdGUuZm9udFNpemUsXHJcblx0XHRtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcuc21hbGwsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY2xhc3MgRm9ybVNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGlkLCBvcHRpb25zLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgZm9ybUZpZWxkSWQgfSA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuc2VsZWN0LFxyXG5cdFx0XHRwcm9wcy5kaXNhYmxlZCA/IGNsYXNzZXNbJ3NlbGVjdC0tZGlzYWJsZWQnXSA6IG51bGxcclxuXHRcdCk7XHJcblx0XHRwcm9wcy5pZCA9IGlkIHx8IGZvcm1GaWVsZElkO1xyXG5cclxuXHRcdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdFx0aWYgKG9wdGlvbnMgJiYgY2hpbGRyZW4pIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogRm9ybVNlbGVjdCBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGBvcHRpb25zYC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfT5cclxuXHRcdFx0XHR7b3B0aW9ucyA/IChcclxuXHRcdFx0XHRcdDxzZWxlY3Qgey4uLnByb3BzfT57b3B0aW9ucy5tYXAob3B0ID0+IChcclxuXHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XHJcblx0XHRcdFx0XHRcdFx0e29wdC5sYWJlbH1cclxuXHRcdFx0XHRcdFx0PC9vcHRpb24+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdCkgOiA8c2VsZWN0IHsuLi5wcm9wc30+e2NoaWxkcmVufTwvc2VsZWN0Pn1cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93cywgcHJvcHMuZGlzYWJsZWQgPyBjbGFzc2VzWydhcnJvd3MtLWRpc2FibGVkJ10gOiBudWxsKX0+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93LCBjbGFzc2VzLmFycm93VG9wKX0gLz5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3csIGNsYXNzZXMuYXJyb3dCb3R0b20pfSAvPlxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkZvcm1TZWxlY3QuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtU2VsZWN0LnByb3BUeXBlcyA9IHtcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdH0pXHJcblx0KSxcclxuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVNlbGVjdDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gU2VsZWN0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZGFya2VuLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzZWxlY3Qgbm9kZVxyXG5cdHNlbGVjdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdGJvcmRlckJvdHRvbUNvbG9yOiBkYXJrZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyVG9wQ29sb3I6IGxpZ2h0ZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0Ym94U2hhZG93OiB0aGVtZS5zZWxlY3QuYm94U2hhZG93LFxyXG5cdFx0Y29sb3I6ICdpbmhlcml0JywgLy8gRklYTUVcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ob3ZlcixcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCdzZWxlY3QtLWRpc2FibGVkJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRpc2FibGVkLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGFycm93c1xyXG5cdGFycm93czoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRyaWdodDogMCxcclxuXHRcdHRvcDogMCxcclxuXHRcdHdpZHRoOiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0fSxcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IDAsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0ekluZGV4OiAxLFxyXG5cdH0sXHJcblx0YXJyb3dUb3A6IHtcclxuXHRcdGJvcmRlckJvdHRvbTogJzAuM2VtIHNvbGlkJyxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzAuMWVtJyxcclxuXHR9LFxyXG5cdGFycm93Qm90dG9tOiB7XHJcblx0XHRib3JkZXJUb3A6ICcwLjNlbSBzb2xpZCcsXHJcblx0XHRtYXJnaW5Ub3A6ICcwLjFlbScsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUxheW91dDogdGhpcy5wcm9wcy5sYXlvdXQsXHJcblx0XHRcdGxhYmVsV2lkdGg6IHRoaXMucHJvcHMubGFiZWxXaWR0aCxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHQvLyBOT1RFIGBsYWJlbFdpZHRoYCBpcyBkZWNsYXJlZCB0byByZW1vdmUgaXQgZnJvbSBgcHJvcHNgLCB0aG91Z2ggbmV2ZXIgdXNlZFxyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRsYWJlbFdpZHRoLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcblx0XHRcdGxheW91dCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtLFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtX18nICsgbGF5b3V0XSxcclxuXHRcdFx0Y2xhc3NOYW1lXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcblx0fVxyXG59O1xyXG5cclxuRm9ybS5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtLnByb3BUeXBlcyA9IHtcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcbn07XHJcbkZvcm0uZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2Zvcm0nLFxyXG5cdGxheW91dDogJ2Jhc2ljJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm1cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRGb3JtOiB7fSxcclxufTtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgR2x5cGggZnJvbSAnLi4vR2x5cGgnO1xyXG5cclxuZnVuY3Rpb24gR2x5cGhCdXR0b24gKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRnbHlwaFN0eWxlLFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBpc0RlZmF1bHQgPSBwb3NpdGlvbiA9PT0gJ2RlZmF1bHQnO1xyXG5cdGNvbnN0IGlzTGVmdCA9IHBvc2l0aW9uID09PSAnbGVmdCc7XHJcblx0Y29uc3QgaXNSaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnO1xyXG5cclxuXHRjb25zdCBvZmZzZXQgPSB7fTtcclxuXHRpZiAoaXNMZWZ0KSBvZmZzZXQubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBvZmZzZXQubWFyZ2luTGVmdCA9ICcwLjVlbSc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge1xyXG5cdFx0Li4ub2Zmc2V0LFxyXG5cdFx0Li4uZ2x5cGhTdHlsZSxcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpY29uID0gKFxyXG5cdFx0PEdseXBoXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5nbHlwaH1cclxuXHRcdFx0Y29sb3I9e2dseXBoQ29sb3J9XHJcblx0XHRcdG5hbWU9e2dseXBofVxyXG5cdFx0XHRzaXplPXtnbHlwaFNpemV9XHJcblx0XHRcdHN0eWxlPXtnbHlwaFN0eWxlc31cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0eyhpc0RlZmF1bHQgfHwgaXNMZWZ0KSAmJiBpY29ufVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdHtpc1JpZ2h0ICYmIGljb259XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRnbHlwaDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ2xlZnQnLCAncmlnaHQnXSksXHJcbn07XHJcbkdseXBoQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRnbHlwaFN0eWxlOiB7fSxcclxuXHRwb3NpdGlvbjogJ2RlZmF1bHQnLCAvLyBubyBtYXJnaW4sIGFzc3VtZXMgbm8gY2hpbGRyZW5cclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z2x5cGg6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyBmaXggaWNvbiBhbGlnbm1lbnRcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoQnV0dG9uO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRm9ybUZpZWxkJztcclxuaW1wb3J0IEdseXBoIGZyb20gJy4uL0dseXBoJztcclxuXHJcbmZ1bmN0aW9uIEdseXBoRmllbGQgKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgaXNMZWZ0ID0gcG9zaXRpb24gPT09ICdsZWZ0JztcclxuXHRjb25zdCBpc1JpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge307XHJcblx0aWYgKGlzTGVmdCkgZ2x5cGhTdHlsZXMubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBnbHlwaFN0eWxlcy5tYXJnaW5MZWZ0ID0gJzAuNWVtJztcclxuXHJcblx0Y29uc3QgaWNvbiA9IChcclxuXHRcdDxHbHlwaFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuZ2x5cGh9XHJcblx0XHRcdGNvbG9yPXtnbHlwaENvbG9yfVxyXG5cdFx0XHRuYW1lPXtnbHlwaH1cclxuXHRcdFx0c2l6ZT17Z2x5cGhTaXplfVxyXG5cdFx0XHRzdHlsZT17Z2x5cGhTdHlsZXN9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8RmllbGQgYXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLndyYXBwZXJ9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtpc0xlZnQgJiYgaWNvbn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHR7aXNSaWdodCAmJiBpY29ufVxyXG5cdFx0PC9GaWVsZD5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoRmllbGQucHJvcFR5cGVzID0ge1xyXG5cdGdseXBoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxyXG59O1xyXG5HbHlwaEZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRwb3NpdGlvbjogJ2xlZnQnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHR9LFxyXG5cdGdseXBoOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gZml4IGljb24gYWxpZ25tZW50XHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaEZpZWxkO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5nbHlwaC5jb2xvci5kYW5nZXIsXHJcblx0aW5oZXJpdDogdGhlbWUuZ2x5cGguY29sb3IuaW5oZXJpdCxcclxuXHRpbnZlcnRlZDogdGhlbWUuZ2x5cGguY29sb3IuaW52ZXJ0ZWQsXHJcblx0cHJpbWFyeTogdGhlbWUuZ2x5cGguY29sb3IucHJpbWFyeSxcclxuXHRzdWNjZXNzOiB0aGVtZS5nbHlwaC5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmdseXBoLmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgb2N0aWNvbnMgZnJvbSAnLi9vY3RpY29ucyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbi8vIEZJWE1FIHN0YXRpYyBvY3RpY29uIGNsYXNzZXMgbGVhbmluZyBvbiBFbGVtZW50YWwgdG8gYXZvaWQgZHVwbGljYXRlXHJcbi8vIGZvbnQgYW5kIENTUzsgaW5mbGF0aW5nIHRoZSBwcm9qZWN0IHNpemVcclxuXHJcbmZ1bmN0aW9uIEdseXBoICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRuYW1lLFxyXG5cdHNpemUsXHJcblx0c3R5bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGNvbG9ySXNWYWxpZFR5cGUgPSBPYmplY3Qua2V5cyhjb2xvcnMpLmluY2x1ZGVzKGNvbG9yKTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdseXBoLFxyXG5cdFx0Y29sb3JJc1ZhbGlkVHlwZSAmJiBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSxcclxuXHRcdGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCkgKyBgICR7b2N0aWNvbnNbbmFtZV19YDtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBzdXBwb3J0IHJhbmRvbSBjb2xvciBzdHJpbmdzXHJcblx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRjb2xvcjogIWNvbG9ySXNWYWxpZFR5cGUgPyBjb2xvciA6IG51bGwsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuR2x5cGgucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZywgLy8gc3VwcG9ydCByYW5kb20gY29sb3Igc3RyaW5nc1xyXG5cdF0pLFxyXG5cdG5hbWU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhvY3RpY29ucykpLmlzUmVxdWlyZWQsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKHNpemVzKSksXHJcbn07XHJcbkdseXBoLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdpJyxcclxuXHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdHNpemU6ICdzbWFsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhbGVydDogJ29jdGljb24gb2N0aWNvbi1hbGVydCcsXHJcblx0J2Fycm93LWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LWRvd24nLFxyXG5cdCdhcnJvdy1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1sZWZ0JyxcclxuXHQnYXJyb3ctcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXJpZ2h0JyxcclxuXHQnYXJyb3ctc21hbGwtZG93bic6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtZG93bicsXHJcblx0J2Fycm93LXNtYWxsLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLWxlZnQnLFxyXG5cdCdhcnJvdy1zbWFsbC1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtcmlnaHQnLFxyXG5cdCdhcnJvdy1zbWFsbC11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtdXAnLFxyXG5cdCdhcnJvdy11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctdXAnLFxyXG5cdG1pY3Jvc2NvcGU6ICdvY3RpY29uIG9jdGljb24tbWljcm9zY29wZScsXHJcblx0YmVha2VyOiAnb2N0aWNvbiBvY3RpY29uLWJlYWtlcicsXHJcblx0YmVsbDogJ29jdGljb24gb2N0aWNvbi1iZWxsJyxcclxuXHRib29rOiAnb2N0aWNvbiBvY3RpY29uLWJvb2snLFxyXG5cdGJvb2ttYXJrOiAnb2N0aWNvbiBvY3RpY29uLWJvb2ttYXJrJyxcclxuXHRicmllZmNhc2U6ICdvY3RpY29uIG9jdGljb24tYnJpZWZjYXNlJyxcclxuXHRicm9hZGNhc3Q6ICdvY3RpY29uIG9jdGljb24tYnJvYWRjYXN0JyxcclxuXHRicm93c2VyOiAnb2N0aWNvbiBvY3RpY29uLWJyb3dzZXInLFxyXG5cdGJ1ZzogJ29jdGljb24gb2N0aWNvbi1idWcnLFxyXG5cdGNhbGVuZGFyOiAnb2N0aWNvbiBvY3RpY29uLWNhbGVuZGFyJyxcclxuXHRjaGVjazogJ29jdGljb24gb2N0aWNvbi1jaGVjaycsXHJcblx0Y2hlY2tsaXN0OiAnb2N0aWNvbiBvY3RpY29uLWNoZWNrbGlzdCcsXHJcblx0J2NoZXZyb24tZG93bic6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1kb3duJyxcclxuXHQnY2hldnJvbi1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLWxlZnQnLFxyXG5cdCdjaGV2cm9uLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLXJpZ2h0JyxcclxuXHQnY2hldnJvbi11cCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi11cCcsXHJcblx0J2NpcmNsZS1zbGFzaCc6ICdvY3RpY29uIG9jdGljb24tY2lyY2xlLXNsYXNoJyxcclxuXHQnY2lyY3VpdC1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tY2lyY3VpdC1ib2FyZCcsXHJcblx0Y2xpcHB5OiAnb2N0aWNvbiBvY3RpY29uLWNsaXBweScsXHJcblx0Y2xvY2s6ICdvY3RpY29uIG9jdGljb24tY2xvY2snLFxyXG5cdCdjbG91ZC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tY2xvdWQtZG93bmxvYWQnLFxyXG5cdCdjbG91ZC11cGxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWNsb3VkLXVwbG9hZCcsXHJcblx0Y29kZTogJ29jdGljb24gb2N0aWNvbi1jb2RlJyxcclxuXHQnY29sb3ItbW9kZSc6ICdvY3RpY29uIG9jdGljb24tY29sb3ItbW9kZScsXHJcblx0J2NvbW1lbnQtYWRkJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWFkZCcsXHJcblx0Y29tbWVudDogJ29jdGljb24gb2N0aWNvbi1jb21tZW50JyxcclxuXHQnY29tbWVudC1kaXNjdXNzaW9uJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWRpc2N1c3Npb24nLFxyXG5cdCdjcmVkaXQtY2FyZCc6ICdvY3RpY29uIG9jdGljb24tY3JlZGl0LWNhcmQnLFxyXG5cdGRhc2g6ICdvY3RpY29uIG9jdGljb24tZGFzaCcsXHJcblx0ZGFzaGJvYXJkOiAnb2N0aWNvbiBvY3RpY29uLWRhc2hib2FyZCcsXHJcblx0ZGF0YWJhc2U6ICdvY3RpY29uIG9jdGljb24tZGF0YWJhc2UnLFxyXG5cdGNsb25lOiAnb2N0aWNvbiBvY3RpY29uLWNsb25lJyxcclxuXHQnZGVza3RvcC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tZGVza3RvcC1kb3dubG9hZCcsXHJcblx0J2RldmljZS1jYW1lcmEnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1jYW1lcmEnLFxyXG5cdCdkZXZpY2UtY2FtZXJhLXZpZGVvJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtY2FtZXJhLXZpZGVvJyxcclxuXHQnZGV2aWNlLWRlc2t0b3AnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1kZXNrdG9wJyxcclxuXHQnZGV2aWNlLW1vYmlsZSc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLW1vYmlsZScsXHJcblx0ZGlmZjogJ29jdGljb24gb2N0aWNvbi1kaWZmJyxcclxuXHQnZGlmZi1hZGRlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1hZGRlZCcsXHJcblx0J2RpZmYtaWdub3JlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1pZ25vcmVkJyxcclxuXHQnZGlmZi1tb2RpZmllZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1tb2RpZmllZCcsXHJcblx0J2RpZmYtcmVtb3ZlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1yZW1vdmVkJyxcclxuXHQnZGlmZi1yZW5hbWVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLXJlbmFtZWQnLFxyXG5cdGVsbGlwc2lzOiAnb2N0aWNvbiBvY3RpY29uLWVsbGlwc2lzJyxcclxuXHQnZXllLXVud2F0Y2gnOiAnb2N0aWNvbiBvY3RpY29uLWV5ZS11bndhdGNoJyxcclxuXHQnZXllLXdhdGNoJzogJ29jdGljb24gb2N0aWNvbi1leWUtd2F0Y2gnLFxyXG5cdGV5ZTogJ29jdGljb24gb2N0aWNvbi1leWUnLFxyXG5cdCdmaWxlLWJpbmFyeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1iaW5hcnknLFxyXG5cdCdmaWxlLWNvZGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtY29kZScsXHJcblx0J2ZpbGUtZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLWRpcmVjdG9yeScsXHJcblx0J2ZpbGUtbWVkaWEnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtbWVkaWEnLFxyXG5cdCdmaWxlLXBkZic6ICdvY3RpY29uIG9jdGljb24tZmlsZS1wZGYnLFxyXG5cdCdmaWxlLXN1Ym1vZHVsZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zdWJtb2R1bGUnLFxyXG5cdCdmaWxlLXN5bWxpbmstZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN5bWxpbmstZGlyZWN0b3J5JyxcclxuXHQnZmlsZS1zeW1saW5rLWZpbGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3ltbGluay1maWxlJyxcclxuXHQnZmlsZS10ZXh0JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXRleHQnLFxyXG5cdCdmaWxlLXppcCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS16aXAnLFxyXG5cdGZsYW1lOiAnb2N0aWNvbiBvY3RpY29uLWZsYW1lJyxcclxuXHRmb2xkOiAnb2N0aWNvbiBvY3RpY29uLWZvbGQnLFxyXG5cdGdlYXI6ICdvY3RpY29uIG9jdGljb24tZ2VhcicsXHJcblx0Z2lmdDogJ29jdGljb24gb2N0aWNvbi1naWZ0JyxcclxuXHRnaXN0OiAnb2N0aWNvbiBvY3RpY29uLWdpc3QnLFxyXG5cdCdnaXN0LXNlY3JldCc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1zZWNyZXQnLFxyXG5cdCdnaXQtYnJhbmNoLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1jcmVhdGUnLFxyXG5cdCdnaXQtYnJhbmNoLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1kZWxldGUnLFxyXG5cdCdnaXQtYnJhbmNoJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoJyxcclxuXHQnZ2l0LWNvbW1pdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWNvbW1pdCcsXHJcblx0J2dpdC1jb21wYXJlJzogJ29jdGljb24gb2N0aWNvbi1naXQtY29tcGFyZScsXHJcblx0J2dpdC1tZXJnZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LW1lcmdlJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdC1hYmFuZG9uZWQnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1wdWxsLXJlcXVlc3QtYWJhbmRvbmVkJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LXB1bGwtcmVxdWVzdCcsXHJcblx0Z2xvYmU6ICdvY3RpY29uIG9jdGljb24tZ2xvYmUnLFxyXG5cdGdyYXBoOiAnb2N0aWNvbiBvY3RpY29uLWdyYXBoJyxcclxuXHRoZWFydDogJ29jdGljb24gb2N0aWNvbi1oZWFydCcsXHJcblx0aGlzdG9yeTogJ29jdGljb24gb2N0aWNvbi1oaXN0b3J5JyxcclxuXHRob21lOiAnb2N0aWNvbiBvY3RpY29uLWhvbWUnLFxyXG5cdCdob3Jpem9udGFsLXJ1bGUnOiAnb2N0aWNvbiBvY3RpY29uLWhvcml6b250YWwtcnVsZScsXHJcblx0aHVib3Q6ICdvY3RpY29uIG9jdGljb24taHVib3QnLFxyXG5cdGluYm94OiAnb2N0aWNvbiBvY3RpY29uLWluYm94JyxcclxuXHRpbmZvOiAnb2N0aWNvbiBvY3RpY29uLWluZm8nLFxyXG5cdCdpc3N1ZS1jbG9zZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLWNsb3NlZCcsXHJcblx0J2lzc3VlLW9wZW5lZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtb3BlbmVkJyxcclxuXHQnaXNzdWUtcmVvcGVuZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLXJlb3BlbmVkJyxcclxuXHRqZXJzZXk6ICdvY3RpY29uIG9jdGljb24tamVyc2V5JyxcclxuXHRrZXk6ICdvY3RpY29uIG9jdGljb24ta2V5JyxcclxuXHRrZXlib2FyZDogJ29jdGljb24gb2N0aWNvbi1rZXlib2FyZCcsXHJcblx0bGF3OiAnb2N0aWNvbiBvY3RpY29uLWxhdycsXHJcblx0J2xpZ2h0LWJ1bGInOiAnb2N0aWNvbiBvY3RpY29uLWxpZ2h0LWJ1bGInLFxyXG5cdGxpbms6ICdvY3RpY29uIG9jdGljb24tbGluaycsXHJcblx0J2xpbmstZXh0ZXJuYWwnOiAnb2N0aWNvbiBvY3RpY29uLWxpbmstZXh0ZXJuYWwnLFxyXG5cdCdsaXN0LW9yZGVyZWQnOiAnb2N0aWNvbiBvY3RpY29uLWxpc3Qtb3JkZXJlZCcsXHJcblx0J2xpc3QtdW5vcmRlcmVkJzogJ29jdGljb24gb2N0aWNvbi1saXN0LXVub3JkZXJlZCcsXHJcblx0bG9jYXRpb246ICdvY3RpY29uIG9jdGljb24tbG9jYXRpb24nLFxyXG5cdCdnaXN0LXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtcHJpdmF0ZScsXHJcblx0J21pcnJvci1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1taXJyb3ItcHJpdmF0ZScsXHJcblx0J2dpdC1mb3JrLXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1mb3JrLXByaXZhdGUnLFxyXG5cdGxvY2s6ICdvY3RpY29uIG9jdGljb24tbG9jaycsXHJcblx0J2xvZ28tZ2l0aHViJzogJ29jdGljb24gb2N0aWNvbi1sb2dvLWdpdGh1YicsXHJcblx0bWFpbDogJ29jdGljb24gb2N0aWNvbi1tYWlsJyxcclxuXHQnbWFpbC1yZWFkJzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlYWQnLFxyXG5cdCdtYWlsLXJlcGx5JzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlcGx5JyxcclxuXHQnbWFyay1naXRodWInOiAnb2N0aWNvbiBvY3RpY29uLW1hcmstZ2l0aHViJyxcclxuXHRtYXJrZG93bjogJ29jdGljb24gb2N0aWNvbi1tYXJrZG93bicsXHJcblx0bWVnYXBob25lOiAnb2N0aWNvbiBvY3RpY29uLW1lZ2FwaG9uZScsXHJcblx0bWVudGlvbjogJ29jdGljb24gb2N0aWNvbi1tZW50aW9uJyxcclxuXHRtaWxlc3RvbmU6ICdvY3RpY29uIG9jdGljb24tbWlsZXN0b25lJyxcclxuXHQnbWlycm9yLXB1YmxpYyc6ICdvY3RpY29uIG9jdGljb24tbWlycm9yLXB1YmxpYycsXHJcblx0bWlycm9yOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvcicsXHJcblx0J21vcnRhci1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tbW9ydGFyLWJvYXJkJyxcclxuXHRtdXRlOiAnb2N0aWNvbiBvY3RpY29uLW11dGUnLFxyXG5cdCduby1uZXdsaW5lJzogJ29jdGljb24gb2N0aWNvbi1uby1uZXdsaW5lJyxcclxuXHRvY3RvZmFjZTogJ29jdGljb24gb2N0aWNvbi1vY3RvZmFjZScsXHJcblx0b3JnYW5pemF0aW9uOiAnb2N0aWNvbiBvY3RpY29uLW9yZ2FuaXphdGlvbicsXHJcblx0cGFja2FnZTogJ29jdGljb24gb2N0aWNvbi1wYWNrYWdlJyxcclxuXHRwYWludGNhbjogJ29jdGljb24gb2N0aWNvbi1wYWludGNhbicsXHJcblx0cGVuY2lsOiAnb2N0aWNvbiBvY3RpY29uLXBlbmNpbCcsXHJcblx0J3BlcnNvbi1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbi1hZGQnLFxyXG5cdCdwZXJzb24tZm9sbG93JzogJ29jdGljb24gb2N0aWNvbi1wZXJzb24tZm9sbG93JyxcclxuXHRwZXJzb246ICdvY3RpY29uIG9jdGljb24tcGVyc29uJyxcclxuXHRwaW46ICdvY3RpY29uIG9jdGljb24tcGluJyxcclxuXHRwbHVnOiAnb2N0aWNvbiBvY3RpY29uLXBsdWcnLFxyXG5cdCdyZXBvLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1jcmVhdGUnLFxyXG5cdCdnaXN0LW5ldyc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1uZXcnLFxyXG5cdCdmaWxlLWRpcmVjdG9yeS1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtZGlyZWN0b3J5LWNyZWF0ZScsXHJcblx0J2ZpbGUtYWRkJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWFkZCcsXHJcblx0cGx1czogJ29jdGljb24gb2N0aWNvbi1wbHVzJyxcclxuXHQncHJpbWl0aXZlLWRvdCc6ICdvY3RpY29uIG9jdGljb24tcHJpbWl0aXZlLWRvdCcsXHJcblx0J3ByaW1pdGl2ZS1zcXVhcmUnOiAnb2N0aWNvbiBvY3RpY29uLXByaW1pdGl2ZS1zcXVhcmUnLFxyXG5cdHB1bHNlOiAnb2N0aWNvbiBvY3RpY29uLXB1bHNlJyxcclxuXHRxdWVzdGlvbjogJ29jdGljb24gb2N0aWNvbi1xdWVzdGlvbicsXHJcblx0cXVvdGU6ICdvY3RpY29uIG9jdGljb24tcXVvdGUnLFxyXG5cdCdyYWRpby10b3dlcic6ICdvY3RpY29uIG9jdGljb24tcmFkaW8tdG93ZXInLFxyXG5cdCdyZXBvLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1kZWxldGUnLFxyXG5cdHJlcG86ICdvY3RpY29uIG9jdGljb24tcmVwbycsXHJcblx0J3JlcG8tY2xvbmUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tY2xvbmUnLFxyXG5cdCdyZXBvLWZvcmNlLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9yY2UtcHVzaCcsXHJcblx0J2dpc3QtZm9yayc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1mb3JrJyxcclxuXHQncmVwby1mb3JrZWQnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9ya2VkJyxcclxuXHQncmVwby1wdWxsJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXB1bGwnLFxyXG5cdCdyZXBvLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tcHVzaCcsXHJcblx0cm9ja2V0OiAnb2N0aWNvbiBvY3RpY29uLXJvY2tldCcsXHJcblx0cnNzOiAnb2N0aWNvbiBvY3RpY29uLXJzcycsXHJcblx0cnVieTogJ29jdGljb24gb2N0aWNvbi1ydWJ5JyxcclxuXHQnc2NyZWVuLWZ1bGwnOiAnb2N0aWNvbiBvY3RpY29uLXNjcmVlbi1mdWxsJyxcclxuXHQnc2NyZWVuLW5vcm1hbCc6ICdvY3RpY29uIG9jdGljb24tc2NyZWVuLW5vcm1hbCcsXHJcblx0J3NlYXJjaC1zYXZlJzogJ29jdGljb24gb2N0aWNvbi1zZWFyY2gtc2F2ZScsXHJcblx0c2VhcmNoOiAnb2N0aWNvbiBvY3RpY29uLXNlYXJjaCcsXHJcblx0c2VydmVyOiAnb2N0aWNvbiBvY3RpY29uLXNlcnZlcicsXHJcblx0c2V0dGluZ3M6ICdvY3RpY29uIG9jdGljb24tc2V0dGluZ3MnLFxyXG5cdHNoaWVsZDogJ29jdGljb24gb2N0aWNvbi1zaGllbGQnLFxyXG5cdCdsb2ctaW4nOiAnb2N0aWNvbiBvY3RpY29uLWxvZy1pbicsXHJcblx0J3NpZ24taW4nOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24taW4nLFxyXG5cdCdsb2ctb3V0JzogJ29jdGljb24gb2N0aWNvbi1sb2ctb3V0JyxcclxuXHQnc2lnbi1vdXQnOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24tb3V0JyxcclxuXHRzcXVpcnJlbDogJ29jdGljb24gb2N0aWNvbi1zcXVpcnJlbCcsXHJcblx0J3N0YXItYWRkJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWFkZCcsXHJcblx0J3N0YXItZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWRlbGV0ZScsXHJcblx0c3RhcjogJ29jdGljb24gb2N0aWNvbi1zdGFyJyxcclxuXHRzdG9wOiAnb2N0aWNvbiBvY3RpY29uLXN0b3AnLFxyXG5cdCdyZXBvLXN5bmMnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tc3luYycsXHJcblx0c3luYzogJ29jdGljb24gb2N0aWNvbi1zeW5jJyxcclxuXHQndGFnLXJlbW92ZSc6ICdvY3RpY29uIG9jdGljb24tdGFnLXJlbW92ZScsXHJcblx0J3RhZy1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXRhZy1hZGQnLFxyXG5cdHRhZzogJ29jdGljb24gb2N0aWNvbi10YWcnLFxyXG5cdHRlbGVzY29wZTogJ29jdGljb24gb2N0aWNvbi10ZWxlc2NvcGUnLFxyXG5cdHRlcm1pbmFsOiAnb2N0aWNvbiBvY3RpY29uLXRlcm1pbmFsJyxcclxuXHQndGhyZWUtYmFycyc6ICdvY3RpY29uIG9jdGljb24tdGhyZWUtYmFycycsXHJcblx0dGh1bWJzZG93bjogJ29jdGljb24gb2N0aWNvbi10aHVtYnNkb3duJyxcclxuXHR0aHVtYnN1cDogJ29jdGljb24gb2N0aWNvbi10aHVtYnN1cCcsXHJcblx0dG9vbHM6ICdvY3RpY29uIG9jdGljb24tdG9vbHMnLFxyXG5cdHRyYXNoY2FuOiAnb2N0aWNvbiBvY3RpY29uLXRyYXNoY2FuJyxcclxuXHQndHJpYW5nbGUtZG93bic6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtZG93bicsXHJcblx0J3RyaWFuZ2xlLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLWxlZnQnLFxyXG5cdCd0cmlhbmdsZS1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtcmlnaHQnLFxyXG5cdCd0cmlhbmdsZS11cCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtdXAnLFxyXG5cdHVuZm9sZDogJ29jdGljb24gb2N0aWNvbi11bmZvbGQnLFxyXG5cdHVubXV0ZTogJ29jdGljb24gb2N0aWNvbi11bm11dGUnLFxyXG5cdHZlcnNpb25zOiAnb2N0aWNvbiBvY3RpY29uLXZlcnNpb25zJyxcclxuXHR3YXRjaDogJ29jdGljb24gb2N0aWNvbi13YXRjaCcsXHJcblx0J3JlbW92ZS1jbG9zZSc6ICdvY3RpY29uIG9jdGljb24tcmVtb3ZlLWNsb3NlJyxcclxuXHR4OiAnb2N0aWNvbiBvY3RpY29uLXgnLFxyXG5cdHphcDogJ29jdGljb24gb2N0aWNvbi16YXAnLFxyXG59O1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmdseXBoLnNpemUuc21hbGwsXHJcblx0bWVkaXVtOiB0aGVtZS5nbHlwaC5zaXplLm1lZGl1bSxcclxuXHRsYXJnZTogdGhlbWUuZ2x5cGguc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEdseXBoXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbYGNvbG9yX18ke2NvbG9yfWBdID0ge1xyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhzaXplcykuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbYHNpemVfXyR7c2l6ZX1gXSA9IHtcclxuXHRcdGZvbnRTaXplOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGdseXBoOiB7fSxcclxuXHJcblx0Ly8gQ29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxuXHJcblx0Ly8gU2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNvbnN0IFdJRFRIUyA9IHtcclxuXHQnb25lLXdob2xlJzogJzEwMCUnLFxyXG5cdCdvbmUtaGFsZic6ICc1MCUnLFxyXG5cdCdvbmUtdGhpcmQnOiAnMzMuMzMlJyxcclxuXHQndHdvLXRoaXJkcyc6ICc2Ni42NiUnLFxyXG5cdCdvbmUtcXVhcnRlcic6ICcyNSUnLFxyXG5cdCd0aHJlZS1xdWFydGVycyc6ICc3NSUnLFxyXG5cclxuXHQnb25lLWZpZnRoJzogJzIwJScsXHJcblx0J3R3by1maWZ0aHMnOiAnNDAlJyxcclxuXHQndGhyZWUtZmlmdGhzJzogJzYwJScsXHJcblx0J2ZvdXItZmlmdGhzJzogJzgwJScsXHJcblxyXG5cdCdvbmUtc2l4dGgnOiAnMTYuNjYlJyxcclxuXHQnZml2ZS1zaXh0aHMnOiAnODMuMzMlJyxcclxufTtcclxuXHJcbmNvbnN0IEdyaWRDb2wgPSAocHJvcHMsIGNvbnRleHQpID0+IHtcclxuXHRjb25zdCBndXR0ZXIgPSBwcm9wcy5ndXR0ZXIgfHwgY29udGV4dC5ndXR0ZXI7XHJcblx0Y29uc3QgeHNtYWxsID0gcHJvcHMueHNtYWxsIHx8IGNvbnRleHQueHNtYWxsO1xyXG5cdGNvbnN0IHNtYWxsID0gcHJvcHMuc21hbGwgfHwgY29udGV4dC5zbWFsbDtcclxuXHRjb25zdCBtZWRpdW0gPSBwcm9wcy5tZWRpdW0gfHwgY29udGV4dC5tZWRpdW07XHJcblx0Y29uc3QgbGFyZ2UgPSBwcm9wcy5sYXJnZSB8fCBjb250ZXh0LmxhcmdlO1xyXG5cclxuXHRjb25zdCBjbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzWyd4c21hbGwtJyArIHhzbWFsbF0sXHJcblx0XHRjbGFzc2VzWydzbWFsbC0nICsgc21hbGxdLFxyXG5cdFx0Y2xhc3Nlc1snbWVkaXVtLScgKyBtZWRpdW1dLFxyXG5cdFx0Y2xhc3Nlc1snbGFyZ2UtJyArIGxhcmdlXVxyXG5cdCk7XHJcblxyXG5cdGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0ke3Byb3BzLmNsYXNzTmFtZSA/ICgnICcgKyBwcm9wcy5jbGFzc05hbWUpIDogJyd9YDtcclxuXHRjb25zdCBjb21wb25lbnRTdHlsZXMgPSBndXR0ZXIgPyB7XHJcblx0XHRwYWRkaW5nTGVmdDogZ3V0dGVyIC8gMixcclxuXHRcdHBhZGRpbmdSaWdodDogZ3V0dGVyIC8gMixcclxuXHR9IDoge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0e3Byb3BzLmNoaWxkcmVufVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkdyaWRDb2wuY29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZENvbC5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ3hzbWFsbCcsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnc21hbGwnLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ21lZGl1bScsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnbGFyZ2UnLCBXSURUSFMpLFxyXG59O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbmZ1bmN0aW9uIHByZXBhcmVXaWR0aHMgKHByZWZpeCwgb2JqKSB7XHJcblx0bGV0IGNsYXNzZXMgPSB7fTtcclxuXHRzd2l0Y2ggKHByZWZpeCkge1xyXG5cdFx0Y2FzZSAnc21hbGwnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0UG9ydHJhaXRNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdtZWRpdW0nOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbGFyZ2UnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQuZGVza3RvcE1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiBjbGFzc2VzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29sO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5jbGFzcyBHcmlkUm93IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z3V0dGVyOiB0aGlzLnByb3BzLmd1dHRlcixcclxuXHRcdFx0eHNtYWxsOiB0aGlzLnByb3BzLnhzbWFsbCxcclxuXHRcdFx0c21hbGw6IHRoaXMucHJvcHMuc21hbGwsXHJcblx0XHRcdG1lZGl1bTogdGhpcy5wcm9wcy5tZWRpdW0sXHJcblx0XHRcdGxhcmdlOiB0aGlzLnByb3BzLmxhcmdlLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgZ3V0dGVyLCBzdHlsZXMgPSB7fSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBgJHtjc3MoY2xhc3Nlcy5ncmlkKX0ke2NsYXNzTmFtZSA/ICgnICcgKyBjbGFzc05hbWUpIDogJyd9YDtcclxuXHRcdGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IE9iamVjdC5hc3NpZ24oc3R5bGVzLCB7XHJcblx0XHRcdG1hcmdpbkxlZnQ6IGd1dHRlciAvIC0yLFxyXG5cdFx0XHRtYXJnaW5SaWdodDogZ3V0dGVyIC8gLTIsXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5HcmlkUm93LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZFJvdy5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkUm93LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRndXR0ZXI6IDAsXHJcblx0eHNtYWxsOiAnb25lLXdob2xlJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z3JpZDoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleFdyYXA6ICd3cmFwJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkUm93O1xyXG4iLCJpbXBvcnQgQ29sIGZyb20gJy4uL0dyaWRDb2wnO1xyXG5pbXBvcnQgUm93IGZyb20gJy4uL0dyaWRSb3cnO1xyXG5cclxuZXhwb3J0IHsgQ29sLCBSb3cgfTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG4vLyBOT1RFOiBJbmxpbmUgR3JvdXAgU2VjdGlvbiBhY2NlcHRzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cFNlY3Rpb24gKHtcclxuXHRhY3RpdmUsXHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb250aWd1b3VzLFxyXG5cdGdyb3csXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIGV2YWx1YXRlIHBvc2l0aW9uXHJcblx0Y29uc3Qgc2VwYXJhdGUgPSBwb3NpdGlvbiA9PT0gJ2xhc3QnIHx8IHBvc2l0aW9uID09PSAnbWlkZGxlJztcclxuXHJcblx0Ly8gQSBgY29udGlndW91c2Agc2VjdGlvbiBtdXN0IG1hbmlwdWxhdGUgaXQncyBjaGlsZCBkaXJlY3RseVxyXG5cdC8vIEEgc2VwYXJhdGUgKGRlZmF1bHQpIHNlY3Rpb24ganVzdCB3cmFwcyB0aGUgY2hpbGRcclxuXHRyZXR1cm4gY29udGlndW91cyA/IGNsb25lRWxlbWVudChjaGlsZHJlbiwge1xyXG5cdFx0YXBocm9kaXRlU3R5bGVzOiBbXHJcblx0XHRcdGNsYXNzZXMuY29udGlndW91cyxcclxuXHRcdFx0Y2xhc3Nlc1snY29udGlndW91c19fJyArIHBvc2l0aW9uXSxcclxuXHRcdFx0YWN0aXZlID8gY2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHRncm93ID8gY2xhc3Nlcy5ncm93IDogbnVsbCxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XSxcclxuXHRcdC4uLnByb3BzLFxyXG5cdH0pIDogKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhcclxuXHRcdFx0ISFncm93ICYmIGNsYXNzZXMuZ3JvdyxcclxuXHRcdFx0ISFzZXBhcmF0ZSAmJiBjbGFzc2VzLnNlcGFyYXRlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCl9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5JbmxpbmVHcm91cFNlY3Rpb24ucHJvcFR5cGVzID0ge1xyXG5cdGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsIC8vIGJ1dHRvbnMgb25seVxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxyXG5cdGNvbnRpZ3VvdXM6IFByb3BUeXBlcy5ib29sLFxyXG5cdGdyb3c6IFByb3BUeXBlcy5ib29sLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydmaXJzdCcsICdsYXN0JywgJ21pZGRsZScsICdvbmx5J10pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVHcm91cFNlY3Rpb247XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBJbmxpbmUgR3JvdXA6IFNlY3Rpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBUYWtlcyBvbmx5IEZvcm1JbnB1dCBhbmQgQnV0dG9uIGFzIGNoaWxkcmVuLCByZW5kZXJpbmcgdGhlbSBhcyBhXHJcbi8vIHRpZHkgaW5saW5lIGFycmF5XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Ly8gcHVsbCBhY3RpdmUgZWxlbWVudHMgdXBcclxuXHRhY3RpdmU6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHN0cmV0Y2ggdG8gZmlsbCBhdmFpbGFibGUgd2lkdGhcclxuXHRncm93OiB7XHJcblx0XHRmbGV4OiAnMSAxIDAnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlcGFyYXRlIGFwcGxpY2FibGUgbm9uLWNvbnRpZ3VvdXMgZWxlbWVudHNcclxuXHRzZXBhcmF0ZToge1xyXG5cdFx0cGFkZGluZ0xlZnQ6ICcwLjc1ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnRpZ3VvdXM6IG1hbmlwdWxhdGUgY2hpbGRyZW4gZGlyZWN0bHlcclxuXHJcblx0Ly8gcHVsbCBmb2N1c2VkIGNvbnRpZ3VvdXMgZWxlbWVudHMgdXBcclxuXHRjb250aWd1b3VzOiB7XHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0ekluZGV4OiAxLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBwb3NpdGlvblxyXG5cdGNvbnRpZ3VvdXNfX21pZGRsZToge1xyXG5cdFx0Ym9yZGVyUmFkaXVzOiAwLFxyXG5cdFx0bWFyZ2luTGVmdDogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoICogLTEsXHJcblx0fSxcclxuXHRjb250aWd1b3VzX19maXJzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdH0sXHJcblx0Y29udGlndW91c19fbGFzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdG1hcmdpbkxlZnQ6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCAqIC0xLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuLCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyBOT1RFOiBvbmx5IGFjY2VwdHMgSW5saW5lR3JvdXBTZWN0aW9uIGFzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRibG9jayxcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y29udGlndW91cyxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gcHJlcGFyZSBncm91cCBjbGFzc05hbWVcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdyb3VwLFxyXG5cdFx0ISFibG9jayAmJiBjbGFzc2VzLmJsb2NrLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBjb252ZXJ0IGNoaWxkcmVuIHRvIGFuIGFycmF5IGFuZCBmaWx0ZXIgb3V0IGZhbHNleSB2YWx1ZXNcclxuXHRjb25zdCBidXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikuZmlsdGVyKGkgPT4gaSk7XHJcblxyXG5cdC8vIG5vcm1hbGl6ZSB0aGUgY291bnRcclxuXHRjb25zdCBjb3VudCA9IGJ1dHRvbnMubGVuZ3RoIC0gMTtcclxuXHJcblx0Ly8gY2xvbmUgY2hpbGRyZW4gYW5kIGFwcGx5IGNsYXNzTmFtZXMgdGhhdCBhcGhyb2RpdGUgY2FuIHRhcmdldFxyXG5cdHByb3BzLmNoaWxkcmVuID0gYnV0dG9ucy5tYXAoKGMsIGlkeCkgPT4ge1xyXG5cdFx0aWYgKCFjKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpc09ubHlDaGlsZCA9ICFjb3VudDtcclxuXHRcdGNvbnN0IGlzRmlyc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IDA7XHJcblx0XHRjb25zdCBpc0xhc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IGNvdW50O1xyXG5cdFx0Y29uc3QgaXNNaWRkbGVDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiAhaXNGaXJzdENoaWxkICYmICFpc0xhc3RDaGlsZDtcclxuXHJcblx0XHRsZXQgcG9zaXRpb247XHJcblx0XHRpZiAoaXNPbmx5Q2hpbGQpIHBvc2l0aW9uID0gJ29ubHknO1xyXG5cdFx0aWYgKGlzRmlyc3RDaGlsZCkgcG9zaXRpb24gPSAnZmlyc3QnO1xyXG5cdFx0aWYgKGlzTGFzdENoaWxkKSBwb3NpdGlvbiA9ICdsYXN0JztcclxuXHRcdGlmIChpc01pZGRsZUNoaWxkKSBwb3NpdGlvbiA9ICdtaWRkbGUnO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0XHRjb250aWd1b3VzOiBjb250aWd1b3VzLFxyXG5cdFx0XHRwb3NpdGlvbixcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuSW5saW5lR3JvdXAucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0YmxvY2s6IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0Y29udGlndW91czogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbklubGluZUdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRncm91cDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1mbGV4JyxcclxuXHR9LFxyXG5cdGJsb2NrOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5saW5lR3JvdXA7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIExhYmVsbGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRpbmxpbmUsXHJcblx0bGFiZWwsXHJcblx0dGl0bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGxhYmVsQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy53cmFwcGVyLFxyXG5cdFx0aW5saW5lICYmIGNsYXNzZXMud3JhcHBlcl9faW5saW5lLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxsYWJlbCB0aXRsZT17dGl0bGV9IGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9PlxyXG5cdFx0XHQ8aW5wdXQgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRyb2wpfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmxhYmVsKX0+e2xhYmVsfTwvc3Bhbj5cclxuXHRcdDwvbGFiZWw+XHJcblx0KTtcclxufTtcclxuXHJcbkxhYmVsbGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0aW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR0eXBlOiBQcm9wVHlwZXMub25lT2YoWydjaGVja2JveCcsICdyYWRpbyddKS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbGxlZENvbnRyb2w7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdH0sXHJcblx0d3JhcHBlcl9faW5saW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjaGVja2JveCBvciByYWRpb1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vU3Bpbm5lcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uICh7IGNoaWxkcmVuLCBsb2FkaW5nLCAuLi5wcm9wcyB9KSB7XHJcblx0Ly8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHZhcmlhbnQgZm9yIHRoZSBzcGlubmVyLFxyXG5cdC8vIGZpbGwgaXMgdGhlIGRlZmF1bHQgdmFyaWFudCBvbiBCdXR0b25cclxuXHRjb25zdCB2YXJpYW50ID0gcHJvcHMudmFyaWFudCB8fCAnZmlsbCc7XHJcblxyXG5cdC8vIGRldGVybWluZSB0aGUgY29ycmVjdCBjb2xvciBmb3IgdGhlIHNwaW5uZXIsXHJcblx0Ly8gY2FuY2VsIGFuZCBkZWxldGUgYWxpYXMgdG8gXCJkYW5nZXJcIlxyXG5cdGxldCBjb2xvcjtcclxuXHRpZiAocHJvcHMuY29sb3IgPT09ICdjYW5jZWwnIHx8IHByb3BzLmNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0Ly8gbWVyZ2UgYWxsIHRoZSB2YXJpYW50L2NvbG9yIHRvZ2V0aGVyXHJcblx0Y29uc3QgZm9ybWF0dGVkQ29sb3IgPSB2YXJpYW50ID09PSAnZmlsbCcgJiYgcHJvcHMuY29sb3IgIT09ICdkZWZhdWx0J1xyXG5cdFx0PyAnaW52ZXJ0ZWQnXHJcblx0XHQ6IGNvbG9yO1xyXG5cclxuXHQvLyByZW5kZXIgdGhlIHNwaW5uZXIgaWYgcmVxdWlyZWRcclxuXHRjb25zdCBzcGlubmVyID0gbG9hZGluZyAmJiAoXHJcblx0XHQ8U3Bpbm5lclxyXG5cdFx0XHRzaXplPVwic21hbGxcIlxyXG5cdFx0XHRjb2xvcj17Zm9ybWF0dGVkQ29sb3J9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdC8vIHNsaWRlIHRoZSBzcGlubmVyIGluIGFuZCBvdXQgb2Ygdmlld1xyXG5cdGNvbnN0IHNwaW5uZXJTdHlsZXMgPSB7XHJcblx0XHR3aWR0aDogbG9hZGluZ1xyXG5cdFx0XHQ/ICh0aGVtZS5zcGlubmVyLnNpemUuc21hbGwgKiA1ICsgdGhlbWUuc3BhY2luZy5zbWFsbClcclxuXHRcdFx0OiAwLFxyXG5cdH07XHJcblxyXG5cdC8vIHJlbmRlciBhbGwgdGhhdCBzaGl0XHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5zcGlubmVyKX0gc3R5bGU9e3NwaW5uZXJTdHlsZXN9PlxyXG5cdFx0XHRcdHtzcGlubmVyfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG5Mb2FkaW5nQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuTG9hZGluZ0J1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0bG9hZGluZzogZmFsc2UsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHNwaW5uZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dEFsaWduOiAnbGVmdCcsXHJcblx0XHR0cmFuc2l0aW9uOiAnd2lkdGggMjAwbXMgZWFzZS1vdXQnLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9hZGluZ0J1dHRvbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsQm9keSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXZcclxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5ib2R5LCBjbGFzc05hbWUpfVxyXG5cdFx0XHR7Li4ucHJvcHN9XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGJvZHk6IHtcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5Lmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkudmVydGljYWwsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxCb2R5O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xuaW1wb3J0IFNjcm9sbExvY2sgZnJvbSAnLi4vU2Nyb2xsTG9jayc7XG5pbXBvcnQgUG9ydGFsIGZyb20gJy4uL1BvcnRhbCc7XG5cbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XG5cbmNvbnN0IGNhblVzZURvbSA9ICEhKFxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuXHQmJiB3aW5kb3cuZG9jdW1lbnRcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2sgPSB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQuYmluZCh0aGlzKTtcblx0fVxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvbkNsb3NlOiB0aGlzLnByb3BzLm9uQ2xvc2UsXG5cdFx0fTtcblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRpZiAoIWNhblVzZURvbSkgcmV0dXJuO1xuXG5cdFx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHRcdGlmICghbmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNZXRob2RzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRoYW5kbGVCYWNrZHJvcENsaWNrIChlKSB7XG5cdFx0aWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuY29udGFpbmVyKSByZXR1cm47XG5cblx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJlcnNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRiYWNrZHJvcENsb3Nlc01vZGFsLFxuXHRcdFx0Y2hpbGRyZW4sXG5cdFx0XHRpc09wZW4sXG5cdFx0XHR3aWR0aCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghaXNPcGVuKSByZXR1cm4gPHNwYW4ga2V5PVwiY2xvc2VkXCIgLz47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdlxuXHRcdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9XG5cdFx0XHRcdGtleT1cIm9wZW5cIlxuXHRcdFx0XHRyZWY9XCJjb250YWluZXJcIlxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0XHRvblRvdWNoRW5kPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZGlhbG9nKX0gc3R5bGU9e3sgd2lkdGggfX0gZGF0YS1zY3JlZW4taWQ9XCJtb2RhbC1kaWFsb2dcIj5cblx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8U2Nyb2xsTG9jayAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8UG9ydGFsPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn07XG5cbk1vZGFsRGlhbG9nLnByb3BUeXBlcyA9IHtcblx0YmFja2Ryb3BDbG9zZXNNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpc09wZW46IFByb3BUeXBlcy5ib29sLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5Nb2RhbERpYWxvZy5kZWZhdWx0UHJvcHMgPSB7XG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXG5cdHdpZHRoOiA3NjgsXG59O1xuTW9kYWxEaWFsb2cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBjbGFzc2VzID0ge1xuXHRjb250YWluZXI6IHtcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1vZGFsLmJhY2tncm91bmQsXG5cdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHRvcDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdHpJbmRleDogdGhlbWUubW9kYWwuekluZGV4LFxuXHR9LFxuXHRkaWFsb2c6IHtcblx0XHRtYXhIZWlnaHQ6ICc5MCUnLFxuXHRcdG92ZXJmbG93OiAnc2Nyb2xsJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy52ZXJ0aWNhbCxcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1RvcDogJzVweCcsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbERpYWxvZztcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEZvb3RlciAoe1xyXG5cdGFsaWduLFxyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmZvb3RlciwgY2xhc3Nlc1snYWxpZ25fXycgKyBhbGlnbl0sIGNsYXNzTmFtZSl9IC8+XHJcblx0KTtcclxufTtcclxuXHJcbk1vZGFsRm9vdGVyLnByb3BUeXBlcyA9IHtcclxuXHRhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxGb290ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGFsaWduOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGZvb3Rlcjoge1xyXG5cdFx0Ym9yZGVyVG9wOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gYWxpZ25tZW50XHJcblx0YWxpZ25fX2xlZnQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXHJcblx0fSxcclxuXHRhbGlnbl9fY2VudGVyOiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxuXHRhbGlnbl9fcmlnaHQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsRm9vdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgR2x5cGhCdXR0b24gZnJvbSAnLi4vR2x5cGhCdXR0b24nO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxIZWFkZXIgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0c2hvd0Nsb3NlQnV0dG9uLFxyXG5cdHRleHQsXHJcblx0Li4ucHJvcHNcclxufSwge1xyXG5cdG9uQ2xvc2UsXHJcbn0pIHtcclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgdGV4dCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogTW9kYWxIZWFkZXIgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgdGV4dGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkZXIsIGNsYXNzTmFtZSl9PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZ3Jvdyl9PlxyXG5cdFx0XHRcdHt0ZXh0ID8gKFxyXG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMudGV4dCl9PlxyXG5cdFx0XHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0XHRcdDwvaDQ+XHJcblx0XHRcdFx0KSA6IGNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0eyEhb25DbG9zZSAmJiBzaG93Q2xvc2VCdXR0b24gJiYgKFxyXG5cdFx0XHRcdDxHbHlwaEJ1dHRvblxyXG5cdFx0XHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmNsb3NlfVxyXG5cdFx0XHRcdFx0Y29sb3I9XCJjYW5jZWxcIlxyXG5cdFx0XHRcdFx0Z2x5cGg9XCJ4XCJcclxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XHJcblx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEhlYWRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxIZWFkZXIuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGhlYWRlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRib3JkZXJCb3R0b206IGAycHggc29saWQgJHt0aGVtZS5jb2xvci5ncmF5MTB9YCxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHR9LFxyXG5cclxuXHQvLyBmaWxsIHNwYWNlIHRvIHB1c2ggdGhlIGNsb3NlIGJ1dHRvbiByaWdodFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRpdGxlIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdFx0Zm9udFNpemU6IDE4LFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogMCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEhlYWRlcjtcclxuIiwiaW1wb3J0IEJvZHkgZnJvbSAnLi9ib2R5JztcclxuaW1wb3J0IERpYWxvZyBmcm9tICcuL2RpYWxvZyc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJztcclxuXHJcbmV4cG9ydCB7XHJcblx0Qm9keSxcclxuXHREaWFsb2csXHJcblx0Rm9vdGVyLFxyXG5cdEhlYWRlcixcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyQ291bnQgKCkge1xyXG5cdFx0bGV0IGNvdW50ID0gJyc7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBwYWdlU2l6ZSwgcGx1cmFsLCBzaW5ndWxhciwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAoIXRvdGFsKSB7XHJcblx0XHRcdGNvdW50ID0gJ05vICcgKyAocGx1cmFsIHx8ICdyZWNvcmRzJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRvdGFsID4gcGFnZVNpemUpIHtcclxuXHRcdFx0bGV0IHN0YXJ0ID0gKHBhZ2VTaXplICogKGN1cnJlbnRQYWdlIC0gMSkpICsgMTtcclxuXHRcdFx0bGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgcGFnZVNpemUgLSAxLCB0b3RhbCk7XHJcblx0XHRcdGNvdW50ID0gYFNob3dpbmcgJHtzdGFydH0gdG8gJHtlbmR9IG9mICR7dG90YWx9YDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvdW50ID0gJ1Nob3dpbmcgJyArIHRvdGFsO1xyXG5cdFx0XHRpZiAodG90YWwgPiAxICYmIHBsdXJhbCkge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHBsdXJhbDtcclxuXHRcdFx0fSBlbHNlIGlmICh0b3RhbCA9PT0gMSAmJiBzaW5ndWxhcikge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHNpbmd1bGFyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY291bnQpfSBkYXRhLWUyZS1wYWdpbmF0aW9uLWNvdW50Pntjb3VudH08L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlclBhZ2VzICgpIHtcclxuXHRcdGNvbnN0IHsgY3VycmVudFBhZ2UsIGxpbWl0LCBvblBhZ2VTZWxlY3QsIHBhZ2VTaXplLCB0b3RhbCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAodG90YWwgPD0gcGFnZVNpemUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGxldCBwYWdlcyA9IFtdO1xyXG5cdFx0bGV0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XHJcblx0XHRsZXQgbWluUGFnZSA9IDE7XHJcblx0XHRsZXQgbWF4UGFnZSA9IHRvdGFsUGFnZXM7XHJcblxyXG5cdFx0aWYgKGxpbWl0ICYmIChsaW1pdCA8IHRvdGFsUGFnZXMpKSB7XHJcblx0XHRcdGxldCByaWdodExpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCAvIDIpO1xyXG5cdFx0XHRsZXQgbGVmdExpbWl0ID0gcmlnaHRMaW1pdCArIChsaW1pdCAlIDIpIC0gMTtcclxuXHRcdFx0bWluUGFnZSA9IGN1cnJlbnRQYWdlIC0gbGVmdExpbWl0O1xyXG5cdFx0XHRtYXhQYWdlID0gY3VycmVudFBhZ2UgKyByaWdodExpbWl0O1xyXG5cclxuXHRcdFx0aWYgKG1pblBhZ2UgPCAxKSB7XHJcblx0XHRcdFx0bWF4UGFnZSA9IGxpbWl0O1xyXG5cdFx0XHRcdG1pblBhZ2UgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtYXhQYWdlID4gdG90YWxQYWdlcykge1xyXG5cdFx0XHRcdG1pblBhZ2UgPSB0b3RhbFBhZ2VzIC0gbGltaXQgKyAxO1xyXG5cdFx0XHRcdG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAobWluUGFnZSA+IDEpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX3N0YXJ0XCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KDEpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHBhZ2UgPSBtaW5QYWdlOyBwYWdlIDw9IG1heFBhZ2U7IHBhZ2UrKykge1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWQgPSAocGFnZSA9PT0gY3VycmVudFBhZ2UpO1xyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9eydwYWdlXycgKyBwYWdlfSBzZWxlY3RlZD17c2VsZWN0ZWR9IG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdChwYWdlKX0+e3BhZ2V9PC9QYWdlPik7XHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgKi9cclxuXHRcdH1cclxuXHRcdGlmIChtYXhQYWdlIDwgdG90YWxQYWdlcykge1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT1cInBhZ2VfZW5kXCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KHRvdGFsUGFnZXMpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5saXN0KX0+XHJcblx0XHRcdFx0e3BhZ2VzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jb250YWluZXIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb3VudCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclBhZ2VzKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMmVtJyxcclxuXHR9LFxyXG5cdGNvdW50OiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMWVtJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcblx0bGlzdDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxuUGFnaW5hdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGN1cnJlbnRQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0b25QYWdlU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdHBsdXJhbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaW5ndWxhcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHR0b3RhbDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdpbmF0aW9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gUGFnZSAoe1xyXG5cdGRpc2FibGVkLFxyXG5cdHNlbGVjdGVkLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLnBhZ2UsXHJcblx0XHQhIWRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsXHJcblx0XHQhIXNlbGVjdGVkICYmIGNsYXNzZXMuc2VsZWN0ZWRcclxuXHQpO1xyXG5cdHJldHVybiAoXHJcblx0XHQ8YnV0dG9uIHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxuUGFnZS5wcm9wVHlwZXMgPSB7XHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0c2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuY29sb3IsXHJcblx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0ekluZGV4OiAyLFxyXG59O1xyXG5jb25zdCBwc2V1ZG9TdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuY29sb3IsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRwYWdlOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsIC8vIENvbGxhcHNlIHdoaXRlLXNwYWNlXHJcblx0XHRtYXJnaW5SaWdodDogJzAuMjVlbScsXHJcblx0XHRwYWRkaW5nOiAnMCAuN2VtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQvLyBoYW5kbGUgaG92ZXIgYW5kIGZvY3VzXHJcblx0XHQnOmhvdmVyJzogcHNldWRvU3R5bGUsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0ZWQgcGFnZVxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHQuLi5zZWxlY3RlZFN0eWxlLFxyXG5cclxuXHRcdCc6aG92ZXInOiBzZWxlY3RlZFN0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHNlbGVjdGVkU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gZGlzYWJsZWQgcGFnZVxyXG5cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuY29sb3IsXHJcblx0XHRjdXJzb3I6ICdkZWZhdWx0JyxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcclxuIiwiaW1wb3J0IHsgQ2hpbGRyZW4sIENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gUGFzcyB0aGUgTGlnaHRib3ggY29udGV4dCB0aHJvdWdoIHRvIHRoZSBQb3J0YWwncyBkZXNjZW5kZW50c1xyXG4vLyBTdGFja092ZXJmbG93IGRpc2N1c3Npb24gaHR0cDovL2dvby5nbC9vY2xySjlcclxuXHJcbmNsYXNzIFBhc3NDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29udGV4dDtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xyXG5cdH1cclxufTtcclxuXHJcblBhc3NDb250ZXh0LnByb3BUeXBlcyA9IHtcclxuXHRjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbn07XHJcblBhc3NDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFzc0NvbnRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBhc3NDb250ZXh0IGZyb20gJy4uL1Bhc3NDb250ZXh0JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBudWxsO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHQvLyBBbmltYXRlIGZhZGUgb24gbW91bnQvdW5tb3VudFxyXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAyMDA7XHJcblx0XHRjb25zdCBzdHlsZXMgPSBgXHJcblx0XHRcdFx0LmZhZGUtZW50ZXIgeyBvcGFjaXR5OiAwLjAxOyB9XHJcblx0XHRcdFx0LmZhZGUtZW50ZXIuZmFkZS1lbnRlci1hY3RpdmUgeyBvcGFjaXR5OiAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZSB7IG9wYWNpdHk6IDE7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZS5mYWRlLWxlYXZlLWFjdGl2ZSB7IG9wYWNpdHk6IDAuMDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxyXG5cdFx0YDtcclxuXHRcdHJlbmRlcihcclxuXHRcdFx0PFBhc3NDb250ZXh0IGNvbnRleHQ9e3RoaXMuY29udGV4dH0+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxzdHlsZT57c3R5bGVzfTwvc3R5bGU+XHJcblx0XHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0XHRjb21wb25lbnQ9XCJkaXZcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtkdXJhdGlvbn1cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHsuLi50aGlzLnByb3BzfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9QYXNzQ29udGV4dD4sXHJcblx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxyXG5cdFx0KTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5Qb3J0YWwuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBVc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBhbmQgc3RhdGUgaW5zdGVhZCBvZiBDU1MgbWVkaWEgYnJlYWtwb2ludHNcclxuLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHJlbmRlciBudWxsIHJhdGhlciB0aGFuIGFuIGVtcHR5IHNwYW4uIEFsbG93aW5nIGZvclxyXG4vLyBDU1MgcHNldWRvIGNsYXNzZXMgbGlrZSA6b25seS1jaGlsZCB0byBiZWhhdmUgYXMgZXhwZWN0ZWQuXHJcblxyXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3aW5kb3cgKyBkb2N1bWVudFxyXG5jb25zdCBjYW5Vc2VET00gPSAhIShcclxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxyXG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XHJcbik7XHJcblxyXG5jbGFzcyBSZXNwb25zaXZlVGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuc3RhdGUgPSB7XHJcblx0XHRcdHdpbmRvd1dpZHRoOiBjYW5Vc2VET00gPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDAsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmIChjYW5Vc2VET00pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuXHRcdH1cclxuXHR9XHJcblx0aGFuZGxlUmVzaXplICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRoaWRkZW5MRyxcclxuXHRcdFx0aGlkZGVuTUQsXHJcblx0XHRcdGhpZGRlblNNLFxyXG5cdFx0XHRoaWRkZW5YUyxcclxuXHRcdFx0dmlzaWJsZUxHLFxyXG5cdFx0XHR2aXNpYmxlTUQsXHJcblx0XHRcdHZpc2libGVTTSxcclxuXHRcdFx0dmlzaWJsZVhTLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IHdpbmRvd1dpZHRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cclxuXHRcdC8vIHNldCB0ZXh0IHZhbHVlIGZyb20gYnJlYWtwb2ludDsgYXR0ZW1wdCBYUyAtLT4gTEdcclxuXHRcdGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSkge1xyXG5cdFx0XHR0ZXh0ID0gdmlzaWJsZVhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0KSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCB2aXNpYmxlU00gfHwgaGlkZGVuTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlKSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCBoaWRkZW5TTSB8fCB2aXNpYmxlTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgaGlkZGVuTUQgfHwgdmlzaWJsZUxHO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0ZXh0ID8gPENvbXBvbmVudCB7Li4ucHJvcHN9Pnt0ZXh0fTwvQ29tcG9uZW50PiA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxuUmVzcG9uc2l2ZVRleHQucHJvcFR5cGVzID0ge1xyXG5cdGhpZGRlbkxHOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlbk1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblhTOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVMRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTUQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZVNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVYUzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuUmVzcG9uc2l2ZVRleHQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zaXZlVGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmZ1bmN0aW9uIFNjcmVlblJlYWRlck9ubHkgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuc3JPbmx5LCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHNwYW4gey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3JPbmx5OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUmVhZGVyT25seTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsTG9jayBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9ja0NvdW50ID0gMDtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubG9ja0NvdW50Kys7XHJcblx0XHRpZiAodGhpcy5sb2NrQ291bnQgPiAxKSByZXR1cm47XHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5sb2NrQ291bnQgPT09IDApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudC0tO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMCkgcmV0dXJuOyAvLyBTdGlsbCBsb2NrZWRcclxuXHJcblx0XHQvL1x0RklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICcnO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRkZWZhdWx0OiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0ZXJyb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gU2VnbWVudGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjcm9wVGV4dCxcclxuXHRlcXVhbFdpZHRoU2VnbWVudHMsXHJcblx0aW5saW5lLFxyXG5cdG9uQ2hhbmdlLFxyXG5cdG9wdGlvbnMsXHJcblx0dmFsdWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udHJvbCxcclxuXHRcdGlubGluZSA/IGNsYXNzZXMuY29udHJvbF9faW5saW5lIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdHtvcHRpb25zLm1hcCgob3B0KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYnV0dG9uQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRcdFx0XHRvcHQuZGlzYWJsZWQgPyBjbGFzc2VzLmJ1dHRvbl9fZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRcdFx0b3B0LnZhbHVlID09PSB2YWx1ZSA/IGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yXSA6IG51bGwsXHJcblx0XHRcdFx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuYnV0dG9uX19jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHMgPyBjbGFzc2VzLmJ1dHRvbl9fZXF1YWxXaWR0aCA6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2J1dHRvbkNsYXNzTmFtZX1cclxuXHRcdFx0XHRcdFx0a2V5PXtvcHQudmFsdWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eyFvcHQuZGlzYWJsZWQgJiYgKCgpID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRcdFx0dGl0bGU9e2Nyb3BUZXh0ID8gb3B0LmxhYmVsIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9e29wdC5kaXNhYmxlZCA/ICctMScgOiAnJ31cclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSl9XHJcblx0XHQ8L2Rpdj4pO1xyXG59O1xyXG5cclxuY29uc3QgdmFsdWVQcm9wU2hhcGUgPSBbXHJcblx0UHJvcFR5cGVzLmJvb2wsXHJcblx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5dO1xyXG5cclxuU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZW4gYGlubGluZSAmJiBlcXVhbFdpZHRoU2VnbWVudHNgIGNyb3BzIHRvIHRoZSBuZXh0IGxhcmdlc3Qgb3B0aW9uIGxlbmd0aFxyXG5cdGVxdWFsV2lkdGhTZWdtZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIG9ubHkgcmVsZXZhbnQgd2hlbiBgaW5saW5lID09PSBmYWxzZWBcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG5cdFx0fSlcclxuXHQpLmlzUmVxdWlyZWQsXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG59O1xyXG5TZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50ZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2VnbWVudGVkIENvbnRyb2xcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IHBzZXVkb1N0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHBzZXVkb1N0eWxlcyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdGJvcmRlcldpZHRoOiAxLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcwLjRlbScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDEsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDEsXHJcblx0fSxcclxuXHRjb250cm9sX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHJcblx0Ly8gYnV0dG9uc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC4yNWVtJyxcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdFx0bWFyZ2luOiAnMnB4IDFweCcsXHJcblx0XHRwYWRkaW5nOiAnMC4zZW0gMC45ZW0nLFxyXG5cdFx0b3V0bGluZTogMCxcclxuXHJcblx0XHQnOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyB9LFxyXG5cdFx0Jzpmb2N1cyc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6YWN0aXZlJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMSknIH0sXHJcblx0fSxcclxuXHRidXR0b25fX2VxdWFsV2lkdGg6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Nyb3BUZXh0OiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNixcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnaW52ZXJ0ZWQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgU2NyZWVuUmVhZGVyT25seSBmcm9tICcuLi9TY3JlZW5SZWFkZXJPbmx5JztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIFNwaW5uZXIgKHsgY2xhc3NOYW1lLCBzaXplLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNsYXNzZXNbc2l6ZV0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX2ZpcnN0KX1gfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX3NlY29uZCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X190aGlyZCl9YH0gLz5cclxuXHRcdFx0PFNjcmVlblJlYWRlck9ubHk+TG9hZGluZy4uLjwvU2NyZWVuUmVhZGVyT25seT5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5TcGlubmVyLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKGNvbG9ycyksXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKHNpemVzKSxcclxufTtcclxuU3Bpbm5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ21lZGl1bScsXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZSddO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3Bpbm5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbmNvbG9ycy5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3Bpbm5lci5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLnNwaW5uZXIuc2l6ZVtzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIERlY2xhcmUgYW5pbWF0aW9uIGtleWZyYW1lc1xyXG5cclxuY29uc3Qga2V5ZnJhbWVzID0gY29tcG9zZS5rZXlmcmFtZXMoJ3B1bHNlJywge1xyXG5cdCcwJSwgODAlLCAxMDAlJzogeyBvcGFjaXR5OiAwIH0sXHJcblx0JzQwJSc6IHsgb3BhY2l0eTogMSB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAnNWVtJyxcclxuXHR9LFxyXG5cdHNtYWxsOlx0eyBmb250U2l6ZTogNCB9LFxyXG5cdG1lZGl1bTpcdHsgZm9udFNpemU6IDggfSxcclxuXHRsYXJnZTpcdHsgZm9udFNpemU6IDE2IH0sXHJcblxyXG5cdC8vIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHJcblx0Ly8gZG90c1xyXG5cdGRvdDoge1xyXG5cdFx0YW5pbWF0aW9uTmFtZToga2V5ZnJhbWVzLFxyXG5cdFx0YW5pbWF0aW9uRHVyYXRpb246ICcxcycsXHJcblx0XHRhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogJzFlbScsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdHdpZHRoOiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fc2Vjb25kOiB7XHJcblx0XHRhbmltYXRpb25EZWxheTogJzE2MG1zJyxcclxuXHRcdG1hcmdpbkxlZnQ6ICcxZW0nLFxyXG5cdH0sXHJcblx0ZG90X190aGlyZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICczMjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QWxlcnQ6IHJlcXVpcmUoJy4vQWxlcnQnKSxcclxuXHRCbGFua1N0YXRlOiByZXF1aXJlKCcuL0JsYW5rU3RhdGUnKSxcclxuXHRCdXR0b246IHJlcXVpcmUoJy4vQnV0dG9uJyksXHJcblx0Q2VudGVyOiByZXF1aXJlKCcuL0NlbnRlcicpLFxyXG5cdENoaXA6IHJlcXVpcmUoJy4vQ2hpcCcpLFxyXG5cdENvbnRhaW5lcjogcmVxdWlyZSgnLi9Db250YWluZXInKSxcclxuXHREcm9wZG93bkJ1dHRvbjogcmVxdWlyZSgnLi9Ecm9wZG93bkJ1dHRvbicpLFxyXG5cdEZvcm06IHJlcXVpcmUoJy4vRm9ybScpLFxyXG5cdEZvcm1GaWVsZDogcmVxdWlyZSgnLi9Gb3JtRmllbGQnKSxcclxuXHRGb3JtSW5wdXQ6IHJlcXVpcmUoJy4vRm9ybUlucHV0JyksXHJcblx0Rm9ybUxhYmVsOiByZXF1aXJlKCcuL0Zvcm1MYWJlbCcpLFxyXG5cdEZvcm1Ob3RlOiByZXF1aXJlKCcuL0Zvcm1Ob3RlJyksXHJcblx0Rm9ybVNlbGVjdDogcmVxdWlyZSgnLi9Gb3JtU2VsZWN0JyksXHJcblx0R2x5cGg6IHJlcXVpcmUoJy4vR2x5cGgnKSxcclxuXHRHbHlwaEJ1dHRvbjogcmVxdWlyZSgnLi9HbHlwaEJ1dHRvbicpLFxyXG5cdEdseXBoRmllbGQ6IHJlcXVpcmUoJy4vR2x5cGhGaWVsZCcpLFxyXG5cdEdyaWQ6IHJlcXVpcmUoJy4vR3JpZCcpLFxyXG5cdElubGluZUdyb3VwOiByZXF1aXJlKCcuL0lubGluZUdyb3VwJyksXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uOiByZXF1aXJlKCcuL0lubGluZUdyb3VwU2VjdGlvbicpLFxyXG5cdExhYmVsbGVkQ29udHJvbDogcmVxdWlyZSgnLi9MYWJlbGxlZENvbnRyb2wnKSxcclxuXHRMb2FkaW5nQnV0dG9uOiByZXF1aXJlKCcuL0xvYWRpbmdCdXR0b24nKSxcclxuXHRNb2RhbDogcmVxdWlyZSgnLi9Nb2RhbCcpLFxyXG5cdFBhZ2luYXRpb246IHJlcXVpcmUoJy4vUGFnaW5hdGlvbicpLFxyXG5cdFJlc3BvbnNpdmVUZXh0OiByZXF1aXJlKCcuL1Jlc3BvbnNpdmVUZXh0JyksXHJcblx0U2NyZWVuUmVhZGVyT25seTogcmVxdWlyZSgnLi9TY3JlZW5SZWFkZXJPbmx5JyksXHJcblx0U2VnbWVudGVkQ29udHJvbDogcmVxdWlyZSgnLi9TZWdtZW50ZWRDb250cm9sJyksXHJcblx0U3Bpbm5lcjogcmVxdWlyZSgnLi9TcGlubmVyJyksXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCB7IHVwY2FzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogVGhpcyByZW5kZXJzIGFsZXJ0cyBmb3IgQVBJIHN1Y2Nlc3MgYW5kIGVycm9yIHJlc3BvbnNlcy5cclxuICogICBFcnJvciBmb3JtYXQ6IHtcclxuICogICAgIGVycm9yOiAndmFsaWRhdGlvbiBlcnJvcnMnIC8vIFRoZSB1bmlxdWUgZXJyb3IgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWw6IHsgLi4uIH0gLy8gT3B0aW9uYWwgZGV0YWlscyBzcGVjaWZpYyB0byB0aGF0IGVycm9yIHR5cGVcclxuICogICB9XHJcbiAqICAgU3VjY2VzcyBmb3JtYXQ6IHtcclxuICogICAgIHN1Y2Nlc3M6ICdpdGVtIHVwZGF0ZWQnLCAvLyBUaGUgdW5pcXVlIHN1Y2Nlc3MgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWxzOiB7IC4uLiB9IC8vIE9wdGlvbmFsIGRldGFpbHMgc3BlY2lmaWMgdG8gdGhhdCBzdWNjZXNzIHR5cGVcclxuICogICB9XHJcbiAqICAgRXZlbnR1YWxseSBzdWNjZXNzIGFuZCBlcnJvciByZXNwb25zZXMgc2hvdWxkIGJlIGhhbmRsZWQgaW5kaXZpZHVhbGx5XHJcbiAqICAgYmFzZWQgb24gdGhlaXIgdHlwZS4gRm9yIGV4YW1wbGU6IHZhbGlkYXRpb24gZXJyb3JzIHNob3VsZCBiZSBkaXNwbGF5ZWQgbmV4dFxyXG4gKiAgIHRvIGVhY2ggaW52YWxpZCBmaWVsZCBhbmQgc2lnbmluIGVycm9ycyBzaG91bGQgcHJvbXQgdGhlIHVzZXIgdG8gc2lnbiBpbi5cclxuICovXHJcbnZhciBBbGVydE1lc3NhZ2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQWxlcnRNZXNzYWdlcycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRhbGVydHM6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGVycm9yOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0XHRzdWNjZXNzOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxlcnRzOiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRyZW5kZXJWYWxpZGF0aW9uRXJyb3JzICgpIHtcclxuXHRcdGxldCBlcnJvcnMgPSB0aGlzLnByb3BzLmFsZXJ0cy5lcnJvci5kZXRhaWw7XHJcblx0XHRpZiAoZXJyb3JzLm5hbWUgPT09ICdWYWxpZGF0aW9uRXJyb3InKSB7XHJcblx0XHRcdGVycm9ycyA9IGVycm9ycy5lcnJvcnM7XHJcblx0XHR9XHJcblx0XHRsZXQgZXJyb3JDb3VudCA9IE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoO1xyXG5cdFx0bGV0IGFsZXJ0Q29udGVudDtcclxuXHRcdGxldCBtZXNzYWdlcyA9IE9iamVjdC5rZXlzKGVycm9ycykubWFwKChwYXRoKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8bGkga2V5PXtwYXRofT5cclxuXHRcdFx0XHRcdFx0e3VwY2FzZShlcnJvcnNbcGF0aF0uZXJyb3IgfHwgZXJyb3JzW3BhdGhdLm1lc3NhZ2UpfVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IGtleT17cGF0aH0+XHJcblx0XHRcdFx0XHRcdHt1cGNhc2UoZXJyb3JzW3BhdGhdLmVycm9yIHx8IGVycm9yc1twYXRoXS5tZXNzYWdlKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoND5UaGVyZSB3ZXJlIHtlcnJvckNvdW50fSBlcnJvcnMgY3JlYXRpbmcgdGhlIG5ldyBpdGVtOjwvaDQ+XHJcblx0XHRcdFx0XHQ8dWw+e21lc3NhZ2VzfTwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSBtZXNzYWdlcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e2FsZXJ0Q29udGVudH08L0FsZXJ0PjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRsZXQgeyBlcnJvciwgc3VjY2VzcyB9ID0gdGhpcy5wcm9wcy5hbGVydHM7XHJcblx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0Ly8gUmVuZGVyIGVycm9yIGFsZXJ0c1xyXG5cdFx0XHRzd2l0Y2ggKGVycm9yLmVycm9yKSB7XHJcblx0XHRcdFx0Y2FzZSAndmFsaWRhdGlvbiBlcnJvcnMnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdGNhc2UgJ2Vycm9yJzpcclxuXHRcdFx0XHRcdGlmIChlcnJvci5kZXRhaWwubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cImRhbmdlclwiPnt1cGNhc2UoZXJyb3IuZXJyb3IpfTwvQWxlcnQ+O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e3VwY2FzZShlcnJvci5lcnJvcil9PC9BbGVydD47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHQvLyBSZW5kZXIgc3VjY2VzcyBhbGVydHNcclxuXHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cInN1Y2Nlc3NcIj57dXBjYXNlKHN1Y2Nlc3Muc3VjY2Vzcyl9PC9BbGVydD47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7IC8vIE5vIGFsZXJ0cywgcmVuZGVyIG5vdGhpbmdcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRNZXNzYWdlcztcclxuIiwiLyoqXHJcbiAqIFRoZSBmb3JtIHRoYXQncyB2aXNpYmxlIHdoZW4gXCJDcmVhdGUgPEl0ZW1OYW1lPlwiIGlzIGNsaWNrZWQgb24gZWl0aGVyIHRoZVxyXG4gKiBMaXN0IHNjcmVlbiBvciB0aGUgSXRlbSBzY3JlZW5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IEFsZXJ0TWVzc2FnZXMgZnJvbSAnLi9BbGVydE1lc3NhZ2VzJztcclxuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnRmllbGRUeXBlcyc7XHJcbmltcG9ydCBJbnZhbGlkRmllbGRUeXBlIGZyb20gJy4vSW52YWxpZEZpZWxkVHlwZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSwgTW9kYWwgfSBmcm9tICcuLi9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IElmcmFtZUNvbnRlbnQgZnJvbSAnLi9JZnJhbWVDb250ZW50JztcclxuXHJcbmNvbnN0IENyZWF0ZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGVGb3JtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGVycjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25DcmVhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycjogbnVsbCxcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Ly8gU2V0IHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMgd2hlbiBmaXJzdCByZW5kZXJpbmcgdGhlXHJcblx0XHQvLyBmb3JtLiAoSWYgdGhleSBoYXZlIGEgZGVmYXVsdCB2YWx1ZSwgdGhhdCBpcylcclxuXHRcdHZhciB2YWx1ZXMgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMucHJvcHMubGlzdC5maWVsZHMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dmFyIGZpZWxkID0gdGhpcy5wcm9wcy5saXN0LmZpZWxkc1trZXldO1xyXG5cdFx0XHR2YXIgRmllbGRDb21wb25lbnQgPSBGaWVsZHNbZmllbGQudHlwZV07XHJcblx0XHRcdHZhbHVlc1tmaWVsZC5wYXRoXSA9IEZpZWxkQ29tcG9uZW50LmdldERlZmF1bHRWYWx1ZShmaWVsZCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlczogdmFsdWVzLFxyXG5cdFx0XHRhbGVydHM6IHt9LFxyXG5cdFx0XHRzaG93SWZyYW1lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGlmKHRoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzaG93SWZyYW1lOiB0cnVlXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYoIXRoaXMuc3RhdGUuc2hvd0lmcmFtZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGV2dCkge1xyXG5cdFx0aWYgKHZrZXlbZXZ0LmtleUNvZGVdID09PSAnPGVzY2FwZT4nKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdC8vIEhhbmRsZSBpbnB1dCBjaGFuZ2UgZXZlbnRzXHJcblx0aGFuZGxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0dmFyIHZhbHVlcyA9IGFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xyXG5cdFx0dmFsdWVzW2V2ZW50LnBhdGhdID0gZXZlbnQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFNldCB0aGUgcHJvcHMgb2YgYSBmaWVsZFxyXG5cdGdldEZpZWxkUHJvcHMgKGZpZWxkKSB7XHJcblx0XHR2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGZpZWxkKTtcclxuXHRcdHByb3BzLnZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZXNbZmllbGQucGF0aF07XHJcblx0XHRwcm9wcy52YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlcztcclxuXHRcdHByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5tb2RlID0gJ2NyZWF0ZSc7XHJcblx0XHRwcm9wcy5rZXkgPSBmaWVsZC5wYXRoO1xyXG5cdFx0cmV0dXJuIHByb3BzO1xyXG5cdH0sXHJcblx0Ly8gQ3JlYXRlIGEgbmV3IGl0ZW0gd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcclxuXHRzdWJtaXRGb3JtIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGNyZWF0ZUZvcm0gPSBldmVudC50YXJnZXQ7XHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjcmVhdGVGb3JtKTtcclxuXHRcdHRoaXMucHJvcHMubGlzdC5jcmVhdGVJdGVtKGZvcm1EYXRhLCAoZXJyLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMub25DcmVhdGUpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJvcHMub25DcmVhdGUoZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIENsZWFyIGZvcm1cclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHR2YWx1ZXM6IHt9LFxyXG5cdFx0XHRcdFx0XHRhbGVydHM6IHtcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiAnSXRlbSBjcmVhdGVkJyxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghZXJyKSB7XHJcblx0XHRcdFx0XHRlcnIgPSB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiAnY29ubmVjdGlvbiBlcnJvcicsXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJZiB3ZSBnZXQgYSBkYXRhYmFzZSBlcnJvciwgc2hvdyB0aGUgZGF0YWJhc2UgZXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRcdC8vIGluc3RlYWQgb2Ygb25seSBzYXlpbmcgXCJEYXRhYmFzZSBlcnJvclwiXHJcblx0XHRcdFx0aWYgKGVyci5lcnJvciA9PT0gJ2RhdGFiYXNlIGVycm9yJykge1xyXG5cdFx0XHRcdFx0ZXJyLmVycm9yID0gZXJyLmRldGFpbC5lcnJtc2c7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0YWxlcnRzOiB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBlcnIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciB0aGUgZm9ybSBpdHNlbGZcclxuXHRyZW5kZXJGb3JtICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHJcblx0XHR2YXIgZm9ybSA9IFtdO1xyXG5cdFx0dmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3Q7XHJcblx0XHR2YXIgbmFtZUZpZWxkID0gdGhpcy5wcm9wcy5saXN0Lm5hbWVGaWVsZDtcclxuXHRcdHZhciBmb2N1c1dhc1NldDtcclxuXHJcblx0XHQvLyBJZiB0aGUgbmFtZSBmaWVsZCBpcyBhbiBpbml0aWFsIG9uZSwgd2UgbmVlZCB0byByZW5kZXIgYSBwcm9wZXJcclxuXHRcdC8vIGlucHV0IGZvciBpdFxyXG5cdFx0aWYgKGxpc3QubmFtZUlzSW5pdGlhbCkge1xyXG5cdFx0XHR2YXIgbmFtZUZpZWxkUHJvcHMgPSB0aGlzLmdldEZpZWxkUHJvcHMobmFtZUZpZWxkKTtcclxuXHRcdFx0bmFtZUZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHRpZiAobmFtZUZpZWxkLnR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmNsYXNzTmFtZSA9ICdpdGVtLW5hbWUtZmllbGQnO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLnBsYWNlaG9sZGVyID0gbmFtZUZpZWxkLmxhYmVsO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmxhYmVsID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9ybS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGRzW25hbWVGaWVsZC50eXBlXSwgbmFtZUZpZWxkUHJvcHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW5kZXIgaW5wdXRzIGZvciBhbGwgaW5pdGlhbCBmaWVsZHNcclxuXHRcdE9iamVjdC5rZXlzKGxpc3QuaW5pdGlhbEZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgZmllbGQgPSBsaXN0LmZpZWxkc1tsaXN0LmluaXRpYWxGaWVsZHNba2V5XV07XHJcblx0XHRcdC8vIElmIHRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkIHBhc3NlZCBpbiBhcyBmaWVsZCB0eXBlLCByZW5kZXIgdGhlXHJcblx0XHRcdC8vIGludmFsaWQgZmllbGQgdHlwZSBjb21wb25lbnRcclxuXHRcdFx0aWYgKHR5cGVvZiBGaWVsZHNbZmllbGQudHlwZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRmb3JtLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChJbnZhbGlkRmllbGRUeXBlLCB7IHR5cGU6IGZpZWxkLnR5cGUsIHBhdGg6IGZpZWxkLnBhdGgsIGtleTogZmllbGQucGF0aCB9KSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEdldCB0aGUgcHJvcHMgZm9yIHRoZSBpbnB1dCBmaWVsZFxyXG5cdFx0XHR2YXIgZmllbGRQcm9wcyA9IHRoaXMuZ2V0RmllbGRQcm9wcyhmaWVsZCk7XHJcblx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBmb2N1c1JlZiBzZXQgcHJldmlvdXNseSwgc2V0IHRoZSBjdXJyZW50IGZpZWxkIHRvXHJcblx0XHRcdC8vIGJlIHRoZSBvbmUgdG8gYmUgZm9jdXNzZWQuIEdlbmVyYWxseSB0aGUgZmlyc3QgaW5wdXQgZmllbGQsIGlmXHJcblx0XHRcdC8vIHRoZXJlJ3MgYW4gaW5pdGlhbCBuYW1lIGZpZWxkIHRoYXQgdGFrZXMgcHJlY2VkZW5jZS5cclxuXHRcdFx0aWYgKCFmb2N1c1dhc1NldCkge1xyXG5cdFx0XHRcdGZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcm0ucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEZpZWxkc1tmaWVsZC50eXBlXSwgZmllbGRQcm9wcykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm0gbGF5b3V0PVwiaG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19PlxyXG5cdFx0XHRcdDxNb2RhbC5IZWFkZXJcclxuXHRcdFx0XHRcdHRleHQ9eydDcmVhdGUgYSBuZXcgJyArIGxpc3Quc2luZ3VsYXJ9XHJcblx0XHRcdFx0XHRzaG93Q2xvc2VCdXR0b25cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxNb2RhbC5Cb2R5PlxyXG5cdFx0XHRcdFx0PEFsZXJ0TWVzc2FnZXMgYWxlcnRzPXt0aGlzLnN0YXRlLmFsZXJ0c30gLz5cclxuXHRcdFx0XHRcdHtmb3JtfVxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuXHRcdFx0XHQ8TW9kYWwuRm9vdGVyPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBjb2xvcj1cInN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCIgZGF0YS1idXR0b24tdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0XHRDcmVhdGVcclxuXHRcdFx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdFx0ZGF0YS1idXR0b24tdHlwZT1cImNhbmNlbFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdENhbmNlbFxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0PC9Nb2RhbC5Gb290ZXI+XHJcblx0XHRcdDwvRm9ybT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250ZW50KCkge1xyXG5cdFx0Y29uc3Qge3Nob3dJZnJhbWV9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IGlmcmFtZVVSTCA9IGAke0tleXN0b25lLmV4dGVybmFsSG9zdH0ke3RoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZX1gO1xyXG5cclxuXHRcdHJldHVybiAoc2hvd0lmcmFtZSAmJiB0aGlzLnByb3BzLmlzT3BlbikgP1xyXG5cdFx0XHQ8SWZyYW1lQ29udGVudCBzcmM9e2lmcmFtZVVSTH0gc2hvdz17dGhpcy5wcm9wcy5pc09wZW59IG9uQ2FuY2VsPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBvblNhdmU9e3RoaXMucHJvcHMub25DcmVhdGV9IGNsYXNzTmFtZT17XCJmdWxsLXNjcmVlblwifS8+IDpcclxuXHRcdFx0PE1vZGFsLkRpYWxvZyBpc09wZW49e3RoaXMucHJvcHMuaXNPcGVufSBvbkNsb3NlPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBiYWNrZHJvcENsb3Nlc01vZGFsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckZvcm0oKX1cclxuXHRcdFx0PC9Nb2RhbC5EaWFsb2c+XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVGb3JtO1xyXG4iLCIvKipcclxuICogVGhlIGZvcm0gdGhhdCdzIHZpc2libGUgd2hlbiBcIkNyZWF0ZSA8SXRlbU5hbWU+XCIgaXMgY2xpY2tlZCBvbiBlaXRoZXIgdGhlXHJcbiAqIExpc3Qgc2NyZWVuIG9yIHRoZSBJdGVtIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJZnJhbWVDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWZyYW1lQ29udGVudCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvdzogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuaGFuZGxlRnJhbWVUYXNrcywgdGhpcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVGcmFtZVRhc2tzLCB0aGlzKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZyYW1lVGFza3MoZSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcblx0XHRcdHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdjb250ZW50VXBkYXRlJzogXHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhlaWdodDogbWVzc2FnZS5kYXRhXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25TYXZlJzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2F2ZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2F2ZShtZXNzYWdlLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25DYW5jZWwnOlxyXG5cdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlckNvbnRlbnQoKSB7XHJcblx0XHRjb25zdCB7c3JjLCBzaG93LCBjbGFzc05hbWUgPSAnJ30gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaWZyYW1lVVJMID0gYCR7c3JjfT90b2tlbj0ke0tleXN0b25lLnVzZXIudG9rZW59YFxyXG5cdFx0cmV0dXJuIHNob3cgP1xyXG5cdFx0XHQ8aWZyYW1lIGNsYXNzTmFtZT17J2NvbnRlbnQtZnJhbWUgJyArIGNsYXNzTmFtZX0gc3R5bGU9e3toZWlnaHQ6IHRoaXMuc3RhdGUuY29udGVudEhlaWdodH19IHJlZj17KGYpID0+IHRoaXMuaWZyID0gZiB9IHNyYz17aWZyYW1lVVJMfSAvPiA6IDxkaXYgLz5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElmcmFtZUNvbnRlbnQ7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXJzIGFuIFwiSW52YWxpZCBGaWVsZCBUeXBlXCIgZXJyb3JcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgSW52YWxpZEZpZWxkVHlwZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPlxyXG5cdFx0XHRJbnZhbGlkIGZpZWxkIHR5cGUgPHN0cm9uZz57cHJvcHMudHlwZX08L3N0cm9uZz4gYXQgcGF0aCA8c3Ryb25nPntwcm9wcy5wYXRofTwvc3Ryb25nPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkludmFsaWRGaWVsZFR5cGUucHJvcFR5cGVzID0ge1xyXG5cdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZEZpZWxkVHlwZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZGFya2VuLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuZnVuY3Rpb24gS2JkICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLmtiZCk7XHJcblxyXG5cdHJldHVybiA8a2JkIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGtiZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvci5ib2R5LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAzLFxyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICNjY2NgLFxyXG5cdFx0Ym9yZGVyQm90dG9tQ29sb3I6IGRhcmtlbignI2NjYycsIDQpLFxyXG5cdFx0Ym9yZGVyVG9wQ29sb3I6IGxpZ2h0ZW4oJyNjY2MnLCA0KSxcclxuXHRcdGJveFNoYWRvdzogYDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDJweCAwIDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpIGluc2V0YCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0Zm9udEZhbWlseTogJ0NvbnNvbGFzLCBcIkxpYmVyYXRpb24gTW9ub1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnLFxyXG5cdFx0Zm9udFNpemU6ICcwLjg1ZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogNzAwLFxyXG5cdFx0bGluZUhlaWdodDogJ2luaGVyaXQnLFxyXG5cdFx0cGFkZGluZzogJzFweCA0cHgnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblxyXG5cdFx0Ly8gbGl0dGxlIGhhY2sgdG8gdHdlYWsgXCJ2aXN1YWwtbWlkZGxlXCIgYWxpZ25tZW50XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdHRvcDogLTEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gS2JkO1xyXG4iLCIvKipcclxuICogUmVuZGVyIHRoZSBib2R5IG9mIGEgcG9wb3V0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRCb2R5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0Qm9keScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHNjcm9sbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dF9fYm9keScsIHtcclxuXHRcdFx0J1BvcG91dF9fc2Nyb2xsYWJsZS1hcmVhJzogdGhpcy5wcm9wcy5zY3JvbGxhYmxlLFxyXG5cdFx0fSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScsICdzY3JvbGxhYmxlJyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0Qm9keTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIGZvb3RlciBmb3IgYSBwb3BvdXRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgQlVUVE9OX0JBU0VfQ0xBU1NOQU1FID0gJ1BvcG91dF9fZm9vdGVyX19idXR0b24gUG9wb3V0X19mb290ZXJfX2J1dHRvbi0tJztcclxuXHJcbmNvbnN0IFBvcG91dEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dEZvb3RlcicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXHJcblx0XHRwcmltYXJ5QnV0dG9uQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHByaW1hcnlCdXR0b25Jc1N1Ym1pdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRwcmltYXJ5QnV0dG9uTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRzZWNvbmRhcnlCdXR0b25BY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0c2Vjb25kYXJ5QnV0dG9uTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHQvLyBSZW5kZXIgYSBwcmltYXJ5IGJ1dHRvblxyXG5cdHJlbmRlclByaW1hcnlCdXR0b24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLnByaW1hcnlCdXR0b25MYWJlbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9e3RoaXMucHJvcHMucHJpbWFyeUJ1dHRvbklzU3VibWl0ID8gJ3N1Ym1pdCcgOiAnYnV0dG9uJ31cclxuXHRcdFx0XHRjbGFzc05hbWU9e0JVVFRPTl9CQVNFX0NMQVNTTkFNRSArICdwcmltYXJ5J31cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLnByaW1hcnlCdXR0b25BY3Rpb259XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uTGFiZWx9XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciBhIHNlY29uZGFyeSBidXR0b25cclxuXHRyZW5kZXJTZWNvbmRhcnlCdXR0b24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLnNlY29uZGFyeUJ1dHRvbkFjdGlvbiB8fCAhdGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25MYWJlbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdGNsYXNzTmFtZT17QlVUVE9OX0JBU0VfQ0xBU1NOQU1FICsgJ3NlY29uZGFyeSd9XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25BY3Rpb259XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25MYWJlbH1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0X19mb290ZXJcIj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJQcmltYXJ5QnV0dG9uKCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyU2Vjb25kYXJ5QnV0dG9uKCl9XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0Rm9vdGVyO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgaGVhZGVyIGZvciBhIHBvcG91dFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBQb3BvdXRIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRIZWFkZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0bGVmdEFjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRsZWZ0SWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR0cmFuc2l0aW9uRGlyZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyduZXh0JywgJ3ByZXYnXSksXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhIGxlZnQgYWN0aW9uIGFuZCBhIGxlZnQgaWNvbiwgcmVuZGVyIGEgaGVhZGVyIGJ1dHRvblxyXG5cdFx0dmFyIGhlYWRlckJ1dHRvbiA9ICh0aGlzLnByb3BzLmxlZnRBY3Rpb24gJiYgdGhpcy5wcm9wcy5sZWZ0SWNvbikgPyAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHRrZXk9eydidXR0b25fJyArIHRoaXMucHJvcHMudHJhbnNpdGlvbkRpcmVjdGlvbn1cclxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRjbGFzc05hbWU9eydQb3BvdXRfX2hlYWRlcl9fYnV0dG9uIG9jdGljb24gb2N0aWNvbi0nICsgdGhpcy5wcm9wcy5sZWZ0SWNvbn1cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLmxlZnRBY3Rpb259XHJcblx0XHRcdC8+XHJcblx0XHQpIDogbnVsbDtcclxuXHRcdC8vIElmIHdlIGhhdmUgYSB0aXRsZSwgcmVuZGVyIGl0XHJcblx0XHR2YXIgaGVhZGVyVGl0bGUgPSB0aGlzLnByb3BzLnRpdGxlID8gKFxyXG5cdFx0XHQ8c3BhblxyXG5cdFx0XHRcdGtleT17J3RpdGxlXycgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiUG9wb3V0X19oZWFkZXJfX2xhYmVsXCJcclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpIDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9faGVhZGVyXCI+XHJcblx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPVwiUG9wb3V0X19oZWFkZXJfX2J1dHRvblwiXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e2hlYWRlckJ1dHRvbn1cclxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XHJcblx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPXsnUG9wb3V0X19wYW5lLScgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXszNjB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXszNjB9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e2hlYWRlclRpdGxlfVxyXG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRIZWFkZXI7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdC4gQ2FuIGFsc28gdXNlIFBvcG91dExpc3RJdGVtIGFuZCBQb3BvdXRMaXN0SGVhZGluZ1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5jb25zdCBQb3BvdXRMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0TGlzdCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3Q7XHJcblxyXG4vLyBleHBvc2UgdGhlIGNoaWxkIHRvIHRoZSB0b3AgbGV2ZWwgZXhwb3J0XHJcbm1vZHVsZS5leHBvcnRzLkl0ZW0gPSByZXF1aXJlKCcuL1BvcG91dExpc3RJdGVtJyk7XHJcbm1vZHVsZS5leHBvcnRzLkhlYWRpbmcgPSByZXF1aXJlKCcuL1BvcG91dExpc3RIZWFkaW5nJyk7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdCBoZWFkaW5nXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRMaXN0SGVhZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3RIZWFkaW5nJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2hlYWRpbmcnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0TGlzdEhlYWRpbmc7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdCBpdGVtXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRMaXN0SXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3RJdGVtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRpY29uSG92ZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRob3ZlcjogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aG92ZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiB0cnVlIH0pO1xyXG5cdH0sXHJcblx0dW5ob3ZlciAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgaG92ZXI6IGZhbHNlIH0pO1xyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIGFuIGljb25cclxuXHRyZW5kZXJJY29uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pY29uKSByZXR1cm4gbnVsbDtcclxuXHRcdGNvbnN0IGljb24gPSB0aGlzLnN0YXRlLmhvdmVyICYmIHRoaXMucHJvcHMuaWNvbkhvdmVyID8gdGhpcy5wcm9wcy5pY29uSG92ZXIgOiB0aGlzLnByb3BzLmljb247XHJcblx0XHRjb25zdCBpY29uQ2xhc3NuYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdF9faXRlbV9faWNvbiBvY3RpY29uJywgKCdvY3RpY29uLScgKyBpY29uKSk7XHJcblxyXG5cdFx0cmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzbmFtZX0gLz47XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgaXRlbUNsYXNzbmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2l0ZW0nLCB7XHJcblx0XHRcdCdpcy1zZWxlY3RlZCc6IHRoaXMucHJvcHMuaXNTZWxlY3RlZCxcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScsICdpY29uJywgJ2ljb25Ib3ZlcicsICdpc1NlbGVjdGVkJywgJ2xhYmVsJyk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMubGFiZWx9XHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtpdGVtQ2xhc3NuYW1lfVxyXG5cdFx0XHRcdG9uRm9jdXM9e3RoaXMuaG92ZXJ9XHJcblx0XHRcdFx0b25CbHVyPXt0aGlzLnVuaG92ZXJ9XHJcblx0XHRcdFx0b25Nb3VzZU92ZXI9e3RoaXMuaG92ZXJ9XHJcblx0XHRcdFx0b25Nb3VzZU91dD17dGhpcy51bmhvdmVyfVxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckljb24oKX1cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJQb3BvdXRMaXN0X19pdGVtX19sYWJlbFwiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFiZWx9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3RJdGVtO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IHBhbmUsIGNhbGxzIHByb3BzLm9uTGF5b3V0IHdoZW4gdGhlIGNvbXBvbmVudCBtb3VudHNcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxudmFyIFBvcG91dFBhbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRQYW5lJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25MYXlvdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG9uTGF5b3V0OiAoKSA9PiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uTGF5b3V0KHRoaXMucmVmcy5lbC5vZmZzZXRIZWlnaHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dF9fcGFuZScsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnb25MYXlvdXQnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHJlZj1cImVsXCIgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dFBhbmU7XHJcbiIsIi8qKlxyXG4gKiBBIFBvcG91dCBjb21wb25lbnQuXHJcbiAqIE9uZSBjYW4gYWxzbyBhZGQgYSBIZWFkZXIgKFBvcG91dC9IZWFkZXIpLCBhIEZvb3RlclxyXG4gKiAoUG9wb3V0L0Zvb3RlciksIGEgQm9keSAoUG9wb3V0L0JvZHkpIGFuZCBhIFBhbiAoUG9wb3V0L1BhbmUpLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi4vUG9ydGFsJztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuXHJcbmNvbnN0IFNJWkVTID0ge1xyXG5cdGFycm93SGVpZ2h0OiAxMixcclxuXHRhcnJvd1dpZHRoOiAxNixcclxuXHRob3Jpem9udGFsTWFyZ2luOiAyMCxcclxufTtcclxuXHJcbnZhciBQb3BvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aXNPcGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU3VibWl0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHJlbGF0aXZlVG9JRDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6IDMyMCxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5pc09wZW4pIHtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24pO1xyXG5cdFx0XHR0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKG5leHRQcm9wcy5pc09wZW4pO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmlzT3BlbiAmJiAhbmV4dFByb3BzLmlzT3Blbikge1xyXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbik7XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRQb3J0YWxET01Ob2RlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlZnMucG9ydGFsLmdldFBvcnRhbERPTU5vZGUoKTtcclxuXHR9LFxyXG5cdGNhbGN1bGF0ZVBvc2l0aW9uIChpc09wZW4pIHtcclxuXHRcdGlmICghaXNPcGVuKSByZXR1cm47XHJcblx0XHRsZXQgcG9zTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucHJvcHMucmVsYXRpdmVUb0lEKTtcclxuXHJcblx0XHRjb25zdCBwb3MgPSB7XHJcblx0XHRcdHRvcDogMCxcclxuXHRcdFx0bGVmdDogMCxcclxuXHRcdFx0d2lkdGg6IHBvc05vZGUub2Zmc2V0V2lkdGgsXHJcblx0XHRcdGhlaWdodDogcG9zTm9kZS5vZmZzZXRIZWlnaHQsXHJcblx0XHR9O1xyXG5cdFx0d2hpbGUgKHBvc05vZGUub2Zmc2V0UGFyZW50KSB7XHJcblx0XHRcdHBvcy50b3AgKz0gcG9zTm9kZS5vZmZzZXRUb3A7XHJcblx0XHRcdHBvcy5sZWZ0ICs9IHBvc05vZGUub2Zmc2V0TGVmdDtcclxuXHRcdFx0cG9zTm9kZSA9IHBvc05vZGUub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5tYXgocG9zLmxlZnQgKyAocG9zLndpZHRoIC8gMikgLSAodGhpcy5wcm9wcy53aWR0aCAvIDIpLCBTSVpFUy5ob3Jpem9udGFsTWFyZ2luKTtcclxuXHRcdGxldCB0b3BPZmZzZXQgPSBwb3MudG9wICsgcG9zLmhlaWdodCArIFNJWkVTLmFycm93SGVpZ2h0O1xyXG5cclxuXHRcdHZhciBzcGFjZU9uUmlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIChsZWZ0T2Zmc2V0ICsgdGhpcy5wcm9wcy53aWR0aCArIFNJWkVTLmhvcml6b250YWxNYXJnaW4pO1xyXG5cdFx0aWYgKHNwYWNlT25SaWdodCA8IDApIHtcclxuXHRcdFx0bGVmdE9mZnNldCA9IGxlZnRPZmZzZXQgKyBzcGFjZU9uUmlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgYXJyb3dMZWZ0T2Zmc2V0ID0gbGVmdE9mZnNldCA9PT0gU0laRVMuaG9yaXpvbnRhbE1hcmdpblxyXG5cdFx0XHQ/IHBvcy5sZWZ0ICsgKHBvcy53aWR0aCAvIDIpIC0gKFNJWkVTLmFycm93V2lkdGggLyAyKSAtIFNJWkVTLmhvcml6b250YWxNYXJnaW5cclxuXHRcdFx0OiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IG5ld1N0YXRlQXZhbGlhYmxlID0gdGhpcy5zdGF0ZS5sZWZ0T2Zmc2V0ICE9PSBsZWZ0T2Zmc2V0XHJcblx0XHRcdHx8IHRoaXMuc3RhdGUudG9wT2Zmc2V0ICE9PSB0b3BPZmZzZXRcclxuXHRcdFx0fHwgdGhpcy5zdGF0ZS5hcnJvd0xlZnRPZmZzZXQgIT09IGFycm93TGVmdE9mZnNldDtcclxuXHJcblx0XHRpZiAobmV3U3RhdGVBdmFsaWFibGUpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bGVmdE9mZnNldDogbGVmdE9mZnNldCxcclxuXHRcdFx0XHR0b3BPZmZzZXQ6IHRvcE9mZnNldCxcclxuXHRcdFx0XHRhcnJvd0xlZnRPZmZzZXQ6IGFycm93TGVmdE9mZnNldCxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXJQb3BvdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgeyB3aWR0aCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgYXJyb3dMZWZ0T2Zmc2V0LCBsZWZ0T2Zmc2V0OiBsZWZ0LCB0b3BPZmZzZXQ6IHRvcCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBhcnJvd1N0eWxlcyA9IGFycm93TGVmdE9mZnNldFxyXG5cdFx0XHQ/IHsgbGVmdDogMCwgbWFyZ2luTGVmdDogYXJyb3dMZWZ0T2Zmc2V0IH1cclxuXHRcdFx0OiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0XCIgc3R5bGU9e3sgbGVmdCwgdG9wLCB3aWR0aCB9fT5cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJQb3BvdXRfX2Fycm93XCIgc3R5bGU9e2Fycm93U3R5bGVzfSAvPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0X19pbm5lclwiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckJsb2Nrb3V0ICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJsb2Nrb3V0XCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz47XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFBvcnRhbCBjbGFzc05hbWU9XCJQb3BvdXQtd3JhcHBlclwiIHJlZj1cInBvcnRhbFwiPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cIlBvcG91dFwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyUG9wb3V0KCl9XHJcblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckJsb2Nrb3V0KCl9XHJcblx0XHRcdDwvUG9ydGFsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0O1xyXG5cclxuLy8gZXhwb3NlIHRoZSBjaGlsZCB0byB0aGUgdG9wIGxldmVsIGV4cG9ydFxyXG5tb2R1bGUuZXhwb3J0cy5IZWFkZXIgPSByZXF1aXJlKCcuL1BvcG91dEhlYWRlcicpO1xyXG5tb2R1bGUuZXhwb3J0cy5Cb2R5ID0gcmVxdWlyZSgnLi9Qb3BvdXRCb2R5Jyk7XHJcbm1vZHVsZS5leHBvcnRzLkZvb3RlciA9IHJlcXVpcmUoJy4vUG9wb3V0Rm9vdGVyJyk7XHJcbm1vZHVsZS5leHBvcnRzLlBhbmUgPSByZXF1aXJlKCcuL1BvcG91dFBhbmUnKTtcclxuIiwiLyoqXHJcbiAqIFVzZWQgYnkgdGhlIFBvcG91dCBjb21wb25lbnQgYW5kIHRoZSBMaWdodGJveCBjb21wb25lbnQgb2YgdGhlIGZpZWxkcyBmb3JcclxuICogcG9wb3V0cy4gUmVuZGVycyBhIG5vbi1yZWFjdCBET00gbm9kZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9ydGFsJyxcclxuXHRwb3J0YWxFbGVtZW50OiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcclxuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IGVsO1xyXG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHRSZWFjdERPTS5yZW5kZXIoPGRpdiB7Li4udGhpcy5wcm9wc30gLz4sIHRoaXMucG9ydGFsRWxlbWVudCk7XHJcblx0fSxcclxuXHRnZXRQb3J0YWxET01Ob2RlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnBvcnRhbEVsZW1lbnQ7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxufSk7XHJcbiIsIi8qKlxyXG4gKiBDb25zdGFudHNcclxuICovXHJcblxyXG4vLyBicmVha3BvaW50c1xyXG5leHBvcnRzLmJyZWFrcG9pbnQgPSB7XHJcblx0eHM6IDQ4MCxcclxuXHRzbTogNzY4LFxyXG5cdG1kOiA5OTIsXHJcblx0bGc6IDEyMDAsXHJcbn07XHJcblxyXG4vLyBib3JkZXIgcmFkaWlcclxuZXhwb3J0cy5ib3JkZXJSYWRpdXMgPSB7XHJcblx0eHM6IDIsXHJcblx0c206IDQsXHJcblx0bWQ6IDgsXHJcblx0bGc6IDE2LFxyXG5cdHhsOiAzMixcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcbmV4cG9ydHMuY29sb3IgPSB7XHJcblx0YXBwRGFuZ2VyOiAnI2Q2NDI0MicsXHJcblx0YXBwSW5mbzogJyM1NmNkZmMnLFxyXG5cdGFwcFByaW1hcnk6ICcjMTM4NWU1JyxcclxuXHRhcHBTdWNjZXNzOiAnIzM0YzI0MCcsXHJcblx0YXBwV2FybmluZzogJyNmYTlmNDcnLFxyXG59O1xyXG5cclxuLy8gc3BhY2luZ1xyXG5leHBvcnRzLnNwYWNpbmcgPSB7XHJcblx0eHM6IDUsXHJcblx0c206IDEwLFxyXG5cdG1kOiAyMCxcclxuXHRsZzogNDAsXHJcblx0eGw6IDgwLFxyXG59O1xyXG5cclxuLy8gdGFibGUgY29uc3RhbnRzXHJcblxyXG5leHBvcnRzLlRBQkxFX0NPTlRST0xfQ09MVU1OX1dJRFRIID0gMjY7ICAvLyBpY29uICsgcGFkZGluZ1xyXG5leHBvcnRzLk5FVFdPUktfRVJST1JfUkVUUllfREVMQVkgPSA1MDA7IC8vIGluIG1zXHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGtleS1zcGFjaW5nICovXHJcbmNvbnN0IHRoZW1lID0ge307XHJcbmNvbnN0IHsgYmxlbmQsIGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9ID0gcmVxdWlyZSgnLi91dGlscy9jb2xvcicpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENPTU1PTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIGJyZWFrcG9pbnRcclxuXHJcbnRoZW1lLmJyZWFrcG9pbnROdW1lcmljID0ge1xyXG5cdG1vYmlsZTogICAgICAgICAgIDQ4MCxcclxuXHR0YWJsZXRQb3J0cmFpdDogICA3NjgsXHJcblx0dGFibGV0TGFuZHNjYXBlOiAgOTkyLFxyXG5cdGRlc2t0b3A6ICAgICAgICAgIDEyMDAsXHJcbn07XHJcbnRoZW1lLmJyZWFrcG9pbnQgPSB7XHJcblx0dGFibGV0UG9ydHJhaXRNaW46ICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgMSkgKyAncHgnLFxyXG5cdHRhYmxldExhbmRzY2FwZU1pbjogKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgMSkgKyAncHgnLFxyXG5cdGRlc2t0b3BNaW46ICAgICAgICAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTGFyZ2VNaW46ICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgMSkgKyAncHgnLFxyXG5cclxuXHRtb2JpbGVNYXg6ICAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUgKyAncHgnLFxyXG5cdHRhYmxldFBvcnRyYWl0TWF4OiAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNYXg6ICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAncHgnLFxyXG5cdGRlc2t0b3BNYXg6ICAgICAgICAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLmRlc2t0b3AgKyAncHgnLFxyXG59O1xyXG5cclxuLy8gY29udGFpbmVyXHJcblxyXG50aGVtZS5jb250YWluZXIgPSB7XHJcblx0Z3V0dGVyOiAyMCxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogIDc1MCxcclxuXHRcdG1lZGl1bTogOTcwLFxyXG5cdFx0bGFyZ2U6IDExNzAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcblxyXG50aGVtZS5jb2xvciA9IHtcclxuXHRib2R5OiAgICAgICAgICAgICAgICAnI2ZhZmFmYScsXHJcblx0bGluazogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGxpbmtIb3ZlcjogICAgICAgICAgIGxpZ2h0ZW4oJyMxMzg1ZTUnLCAxMCksXHJcblx0dGV4dDogICAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cclxuXHQvLyBjb250ZXh0dWFsXHJcblx0c3VjY2VzczogICAgICAgICAgICAgJyMzNGMyNDAnLFxyXG5cdGNyZWF0ZTogICAgICAgICAgICAgICcjMzRjMjQwJywgLy8gYWxpYXMgZm9yIHN1Y2Nlc3NcclxuXHRwcmltYXJ5OiAgICAgICAgICAgICAnIzEzODVlNScsXHJcblx0aW5mbzogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLCAvLyBhbGlhcyBmb3IgcHJpbWFyeVxyXG5cdHdhcm5pbmc6ICAgICAgICAgICAgICcjRkEzJyxcclxuXHRkYW5nZXI6ICAgICAgICAgICAgICAnI2Q2NDI0MicsXHJcblx0ZXJyb3I6ICAgICAgICAgICAgICAgJyNkNjQyNDInLCAvLyBhbGlhcyBmb3IgZGFuZ2VyXHJcblxyXG5cdC8vIG5ldXRyYWxzXHJcblx0Z3JheTkwOiAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cdGdyYXk4MDogICAgICAgICAgICAgICcjMzMzJyxcclxuXHRncmF5NzA6ICAgICAgICAgICAgICAnIzRENEQ0RCcsXHJcblx0Z3JheTYwOiAgICAgICAgICAgICAgJyM2NjYnLFxyXG5cdGdyYXk1MDogICAgICAgICAgICAgICcjN0Y3RjdGJyxcclxuXHRncmF5NDA6ICAgICAgICAgICAgICAnIzk5OScsXHJcblx0Z3JheTMwOiAgICAgICAgICAgICAgJyNCM0IzQjMnLFxyXG5cdGdyYXkyMDogICAgICAgICAgICAgICcjQ0NDJyxcclxuXHRncmF5MTU6ICAgICAgICAgICAgICAnI0Q5RDlEOScsXHJcblx0Z3JheTEwOiAgICAgICAgICAgICAgJyNFNUU1RTUnLFxyXG5cdGdyYXkwNTogICAgICAgICAgICAgICcjRjJGMkYyJyxcclxuXHJcblx0Ly8gc29jaWFsXHJcblx0ZmFjZWJvb2s6ICAgICAgICAgICAgJyMzQjU5OTgnLFxyXG5cdGdvb2dsZTogICAgICAgICAgICAgICcjREM0RTQxJyxcclxuXHRpbnN0YWdyYW06ICAgICAgICAgICAnIzNmNzI5YicsXHJcblx0cGludGVyZXN0OiAgICAgICAgICAgJyNiZDA4MWMnLFxyXG5cdHR1bWJscjogICAgICAgICAgICAgICcjMzU0NjVjJyxcclxuXHR0d2l0dGVyOiAgICAgICAgICAgICAnIzU1QUNFRScsXHJcblx0eW91dHViZTogICAgICAgICAgICAgJyNjZDIwMWYnLFxyXG5cdHZpbWVvOiAgICAgICAgICAgICAgICcjMWFiN2VhJyxcclxufTtcclxuXHJcbi8vIGJvcmRlciByYWRpaVxyXG5cclxudGhlbWUuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHNtYWxsOiAnMC4xMjVyZW0nLFxyXG5cdGRlZmF1bHQ6ICcwLjNyZW0nLFxyXG5cdGxhcmdlOiAnMC41cmVtJyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuXHJcbnRoZW1lLnNwYWNpbmcgPSB7XHJcblx0eHNtYWxsOiAgICAgIDUsXHJcblx0c21hbGw6ICAgICAgIDEwLFxyXG5cdGRlZmF1bHQ6ICAgICAyMCxcclxuXHRsYXJnZTogICAgICAgMzAsXHJcblx0eGxhcmdlOiAgICAgIDQwLFxyXG5cdHh4bGFyZ2U6ICAgICA2MCxcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBFTEVNRU5UQUwgU1BFQ0lGSUNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBidXR0b25cclxuXHJcbnRoZW1lLmJ1dHRvbiA9IHtcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGZvbnQ6IHtcclxuXHRcdHdlaWdodDogNTAwLFxyXG5cdH0sXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcxZW0nLFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0cHJpbWFyeToge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5wcmltYXJ5LCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0fSxcclxuXHRzdWNjZXNzOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR9LFxyXG5cdHdhcm5pbmc6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3Iud2FybmluZywgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0ZGFuZ2VyOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IuZGFuZ2VyLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gYmxhbmsgc3RhdGVcclxuXHJcbnRoZW1lLmJsYW5rc3RhdGUgPSB7XHJcblx0YmFja2dyb3VuZDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDQpLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJzJlbScsXHJcblx0cGFkZGluZ1ZlcnRpY2FsOiAnNGVtJyxcclxufTtcclxuXHJcbi8vIGZvbnRcclxuXHJcbnRoZW1lLmZvbnQgPSB7XHJcblx0ZmFtaWx5OiB7XHJcblx0XHRtb25vOiAnTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlJyxcclxuXHRcdHNhbnNTZXJpZjogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXHJcblx0XHRzZXJpZjogJ0dlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmJyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHh4c21hbGw6ICcwLjY1cmVtJyxcclxuXHRcdHhzbWFsbDogJzAuNzVyZW0nLFxyXG5cdFx0c21hbGw6ICcwLjg1cmVtJyxcclxuXHRcdGRlZmF1bHQ6ICcxcmVtJyxcclxuXHRcdG1lZGl1bTogJzEuMnJlbScsXHJcblx0XHRsYXJnZTogJzEuNnJlbScsXHJcblx0XHR4bGFyZ2U6ICcyLjRyZW0nLFxyXG5cdFx0eHhsYXJnZTogJzMuMnJlbScsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGZvcm1cclxuXHJcbnRoZW1lLmZvcm0gPSB7XHJcblx0bGFiZWw6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NTAsXHJcblx0XHRmb250U2l6ZTogJzFyZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogJ25vcm1hbCcsXHJcblx0XHR3aWR0aDogMTgwLFxyXG5cdH0sXHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGZvbnRTaXplOiAnMC45ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnRcclxuXHJcbnRoZW1lLmNvbXBvbmVudCA9IHtcclxuXHRsaW5lSGVpZ2h0OiAnMi4zZW0nLFxyXG5cdGhlaWdodDogJzIuNGVtJyxcclxuXHRwYWRkaW5nOiAnMWVtJyxcclxufTtcclxuXHJcbi8vIGlucHV0XHJcblxyXG50aGVtZS5pbnB1dCA9IHtcclxuXHRiYWNrZ3JvdW5kOiB7XHJcblx0XHRkZWZhdWx0OiAnd2hpdGUnLFxyXG5cdFx0ZGlzYWJsZWQ6ICcjZmFmYWZhJyxcclxuXHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDIpLFxyXG5cdH0sXHJcblx0cGxhY2Vob2xkZXJDb2xvcjogJyNhYWEnLFxyXG5cdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdGhlaWdodDogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRib3JkZXI6IHtcclxuXHRcdGNvbG9yOiB7XHJcblx0XHRcdGRlZmF1bHQ6ICcjY2NjJyxcclxuXHRcdFx0Zm9jdXM6IHRoZW1lLmNvbG9yLmluZm8sXHJcblx0XHRcdGhvdmVyOiAnI2JiYicsXHJcblx0XHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDgpLFxyXG5cdFx0fSxcclxuXHRcdHJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG5cdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScsXHJcblx0Ym94U2hhZG93Rm9jdXM6IGBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IuaW5mbywgMTApfWAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcuNzVlbScsXHJcbn07XHJcblxyXG4vLyBzZWxlY3RcclxuXHJcbnRoZW1lLnNlbGVjdCA9IHtcclxuXHRib3hTaGFkb3c6ICcwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG59O1xyXG5cclxuLy8gYWxlcnRcclxuXHJcbnRoZW1lLmFsZXJ0ID0ge1xyXG5cdHBhZGRpbmc6ICcwLjc1ZW0gIDFlbScsXHJcblx0bWFyZ2luOiAnMCAwIDFlbScsXHJcblx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdH0sXHJcblx0XHRpbmZvOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR9LFxyXG5cdFx0d2FybmluZzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGdseXBoXHJcblxyXG50aGVtZS5nbHlwaCA9IHtcclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRpbmhlcml0OiAnaW5oZXJpdCcsXHJcblx0XHRpbnZlcnRlZDogJ3doaXRlJyxcclxuXHRcdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOiAxNixcclxuXHRcdG1lZGl1bTogMzIsXHJcblx0XHRsYXJnZTogNjQsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIG1vZGFsXHJcblxyXG50aGVtZS5tb2RhbCA9IHtcclxuXHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjgpJyxcclxuXHR6SW5kZXg6IDEwMCxcclxuXHRwYWRkaW5nOiB7XHJcblx0XHRkaWFsb2c6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogJzFlbScsXHJcblx0XHRcdHZlcnRpY2FsOiAwLFxyXG5cdFx0fSxcclxuXHRcdGJvZHk6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzFlbScsXHJcblx0XHR9LFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMC42ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gcGFnaW5hdGlvblxyXG5cclxudGhlbWUucGFnaW5hdGlvbiA9IHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cclxuXHRob3Zlcjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3doaXRlJyxcclxuXHRcdGJvcmRlcjogJ3JnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0c2VsZWN0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyxcclxuXHRcdGJvcmRlcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHNwaW5uZXJcclxuXHJcbnRoZW1lLnNwaW5uZXIgPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDpcdDQsXHJcblx0XHRtZWRpdW06XHQ4LFxyXG5cdFx0bGFyZ2U6XHQxNixcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcclxuIiwiLyoqXHJcbiAqIEhlbHBlciBtZXRob2QgdG8gaGFuZGxlIExpc3Qgb3BlcmF0aW9ucywgZS5nLiBjcmVhdGluZyBpdGVtcywgZGVsZXRpbmcgaXRlbXMsXHJcbiAqIGdldHRpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhvc2UgbGlzdHMsIGV0Yy5cclxuICovXHJcblxyXG5jb25zdCBsaXN0VG9BcnJheSA9IHJlcXVpcmUoJ2xpc3QtdG8tYXJyYXknKTtcclxuY29uc3QgcXMgPSByZXF1aXJlKCdxcycpO1xyXG5jb25zdCB4aHIgPSByZXF1aXJlKCd4aHInKTtcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG4vLyBGaWx0ZXJzIGZvciB0cnV0aHkgZWxlbWVudHMgaW4gYW4gYXJyYXlcclxuY29uc3QgdHJ1dGh5ID0gKGkpID0+IGk7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb2x1bW5zIG9mIGEgbGlzdCwgc3RydWN0dXJlZCBieSBmaWVsZHMgYW5kIGhlYWRpbmdzXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gbGlzdCBUaGUgbGlzdCB3ZSB3YW50IHRoZSBjb2x1bW5zIG9mXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICBUaGUgY29sdW1uc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29sdW1ucyhsaXN0KSB7XHJcblx0cmV0dXJuIGxpc3QudWlFbGVtZW50cy5tYXAoKGNvbCkgPT4ge1xyXG5cdFx0aWYgKGNvbC50eXBlID09PSAnaGVhZGluZycpIHtcclxuXHRcdFx0cmV0dXJuIHsgdHlwZTogJ2hlYWRpbmcnLCBjb250ZW50OiBjb2wuY29udGVudCB9O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGZpZWxkID0gbGlzdC5maWVsZHNbY29sLmZpZWxkXTtcclxuXHRcdFx0cmV0dXJuIGZpZWxkID8geyB0eXBlOiAnZmllbGQnLCBmaWVsZDogZmllbGQsIHRpdGxlOiBmaWVsZC5sYWJlbCwgcGF0aDogZmllbGQucGF0aCB9IDogbnVsbDtcclxuXHRcdH1cclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1ha2UgYW4gYXJyYXkgb2YgZmlsdGVycyBhbiBvYmplY3Qga2V5ZWQgYnkgdGhlIGZpbHRlcmluZyBwYXRoXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSBmaWx0ZXJBcnJheSBUaGUgYXJyYXkgb2YgZmlsdGVyc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgVGhlIGNvcnJlY3RlZCBmaWx0ZXJzLCBrZXllZCBieSBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlckFycmF5KSB7XHJcblx0dmFyIGZpbHRlcnMgPSB7fTtcclxuXHRmaWx0ZXJBcnJheS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcclxuXHRcdGZpbHRlcnNbZmlsdGVyLmZpZWxkLnBhdGhdID0gZmlsdGVyLnZhbHVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBmaWx0ZXJzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc29ydGluZyBzdHJpbmcgZm9yIHRoZSBVUklcclxuICpcclxuICogQHBhcmFtICB7QXJyYXl9IHNvcnQucGF0aHMgVGhlIHBhdGhzIHdlIHdhbnQgdG8gc29ydFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICBBbGwgdGhlIHNvcnRpbmcgcXVlcmllcyB3ZSB3YW50IGFzIGEgc3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTb3J0U3RyaW5nKHNvcnQpIHtcclxuXHRyZXR1cm4gc29ydC5wYXRocy5tYXAoaSA9PiB7XHJcblx0XHQvLyBJZiB3ZSB3YW50IHRvIHNvcnQgaW52ZXJ0ZWQsIHdlIHByZWZpeCBhIFwiLVwiIGJlZm9yZSB0aGUgc29ydCBwYXRoXHJcblx0XHRyZXR1cm4gaS5pbnZlcnQgPyAnLScgKyBpLnBhdGggOiBpLnBhdGg7XHJcblx0fSkuZmlsdGVyKHRydXRoeSkuam9pbignLCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIGEgcXVlcnkgc3RyaW5nIGZyb20gYSBidW5jaCBvZiBvcHRpb25zXHJcbiAqL1xyXG5mdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9wdGlvbnMpIHtcclxuXHRjb25zdCBxdWVyeSA9IHt9O1xyXG5cdGlmIChvcHRpb25zLnNlYXJjaCkgcXVlcnkuc2VhcmNoID0gb3B0aW9ucy5zZWFyY2g7XHJcblx0aWYgKG9wdGlvbnMuZmlsdGVycy5sZW5ndGgpIHF1ZXJ5LmZpbHRlcnMgPSBKU09OLnN0cmluZ2lmeShnZXRGaWx0ZXJzKG9wdGlvbnMuZmlsdGVycykpO1xyXG5cdGlmIChvcHRpb25zLmNvbHVtbnMpIHF1ZXJ5LmZpZWxkcyA9IG9wdGlvbnMuY29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKTtcclxuXHRpZiAob3B0aW9ucy5wYWdlICYmIG9wdGlvbnMucGFnZS5zaXplKSBxdWVyeS5saW1pdCA9IG9wdGlvbnMucGFnZS5zaXplO1xyXG5cdGlmIChvcHRpb25zLnBhZ2UgJiYgb3B0aW9ucy5wYWdlLmluZGV4ID4gMSkgcXVlcnkuc2tpcCA9IChvcHRpb25zLnBhZ2UuaW5kZXggLSAxKSAqIG9wdGlvbnMucGFnZS5zaXplO1xyXG5cdGlmIChvcHRpb25zLnNvcnQpIHF1ZXJ5LnNvcnQgPSBnZXRTb3J0U3RyaW5nKG9wdGlvbnMuc29ydCk7XHJcblx0cXVlcnkuZXhwYW5kUmVsYXRpb25zaGlwRmllbGRzID0gdHJ1ZTtcclxuXHJcblx0Ly8gQ3VzdG9tIEZpbHRlciB0byBGZXRjaCBhbGwgUmVjb3JkcyBXaGlsZSBTZWxlY3RpbmcgTWFuYWdlIEFsbFxyXG5cclxuXHRpZiAob3B0aW9ucy5maWx0ZXJzLmZldGNoX2FsbF9kYXRhKSB7XHJcblx0XHRxdWVyeS5saW1pdCA9IG9wdGlvbnMuZmlsdGVycy5pdGVtX2NvdW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICc/JyArIHFzLnN0cmluZ2lmeShxdWVyeSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIG1haW4gbGlzdCBoZWxwZXIgY2xhc3NcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICovXHJcbmNvbnN0IExpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdC8vIFRPRE8gdGhlc2Ugb3B0aW9ucyBhcmUgcG9zc2libHkgdW51c2VkXHJcblx0YXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cdHRoaXMuY29sdW1ucyA9IGdldENvbHVtbnModGhpcyk7XHJcblx0dGhpcy5leHBhbmRlZERlZmF1bHRDb2x1bW5zID0gdGhpcy5leHBhbmRDb2x1bW5zKHRoaXMuZGVmYXVsdENvbHVtbnMpO1xyXG5cdHRoaXMuZGVmYXVsdENvbHVtblBhdGhzID0gdGhpcy5leHBhbmRlZERlZmF1bHRDb2x1bW5zLm1hcChpID0+IGkucGF0aCkuam9pbignLCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpdGVtIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0Zvcm1EYXRhfSBmb3JtRGF0YSBUaGUgc3VibWl0dGVkIGZvcm0gZGF0YVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHRoZSBBUEkgY2FsbFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuY3JlYXRlSXRlbSA9IGZ1bmN0aW9uIChmb3JtRGF0YSwgY2FsbGJhY2spIHtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiBgJHtLZXlzdG9uZS5hZG1pblBhdGh9L2FwaS8ke3RoaXMucGF0aH0vY3JlYXRlYCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGJvZHk6IGZvcm1EYXRhLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIGNhbGxiYWNrKGVycik7XHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBOT1RFOiB4aHIgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBFcnJvciBpZlxyXG5cdFx0XHQvLyAgdGhlcmUgaXMgYW4gZXJyb3IgaW4gdGhlIGJyb3dzZXIgdGhhdCBwcmV2ZW50c1xyXG5cdFx0XHQvLyAgc2VuZGluZyB0aGUgcmVxdWVzdC4gQSBIVFRQIDUwMCByZXNwb25zZSBpcyBub3RcclxuXHRcdFx0Ly8gIGdvaW5nIHRvIGNhdXNlIGFuIGVycm9yIHRvIGJlIHJldHVybmVkLlxyXG5cdFx0XHRjYWxsYmFjayhkYXRhLCBudWxsKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgYSBzcGVjaWZpYyBpdGVtXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICBUaGUgaWQgb2YgdGhlIGl0ZW0gd2Ugd2FudCB0byB1cGRhdGVcclxuICogQHBhcmFtICB7Rm9ybURhdGF9IGZvcm1EYXRhIFRoZSBzdWJtaXR0ZWQgZm9ybSBkYXRhXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdGhlIEFQSSBjYWxsXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24gKGlkLCBmb3JtRGF0YSwgY2FsbGJhY2spIHtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiBgJHtLZXlzdG9uZS5hZG1pblBhdGh9L2FwaS8ke3RoaXMucGF0aH0vJHtpZH1gLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdFx0Ym9keTogZm9ybURhdGEsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbkxpc3QucHJvdG90eXBlLmV4cGFuZENvbHVtbnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRsZXQgbmFtZUluY2x1ZGVkID0gZmFsc2U7XHJcblx0Y29uc3QgY29scyA9IGxpc3RUb0FycmF5KGlucHV0KS5tYXAoaSA9PiB7XHJcblx0XHRjb25zdCBzcGxpdCA9IGkuc3BsaXQoJ3wnKTtcclxuXHRcdGxldCBwYXRoID0gc3BsaXRbMF07XHJcblx0XHRsZXQgd2lkdGggPSBzcGxpdFsxXTtcclxuXHRcdGlmIChwYXRoID09PSAnX19uYW1lX18nKSB7XHJcblx0XHRcdHBhdGggPSB0aGlzLm5hbWVQYXRoO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1twYXRoXTtcclxuXHRcdGlmICghZmllbGQpIHtcclxuXHRcdFx0Ly8gVE9ETzogU3VwcG9ydCBhcmJpdGFyeSBkb2N1bWVudCBwYXRoc1xyXG5cdFx0XHRpZiAoIXRoaXMuaGlkZGVuKSB7XHJcblx0XHRcdFx0aWYgKHBhdGggPT09IHRoaXMubmFtZVBhdGgpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTGlzdCAke3RoaXMua2V5fSBkaWQgbm90IHNwZWNpZnkgYW55IGRlZmF1bHQgY29sdW1ucyBvciBhIG5hbWUgZmllbGRgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBMaXN0ICR7dGhpcy5rZXl9IHNwZWNpZmllZCBhbiBpbnZhbGlkIGRlZmF1bHQgY29sdW1uOiAke3BhdGh9YCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmIChwYXRoID09PSB0aGlzLm5hbWVQYXRoKSB7XHJcblx0XHRcdG5hbWVJbmNsdWRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWVsZDogZmllbGQsXHJcblx0XHRcdGxhYmVsOiBmaWVsZC5sYWJlbCxcclxuXHRcdFx0cGF0aDogZmllbGQucGF0aCxcclxuXHRcdFx0dHlwZTogZmllbGQudHlwZSxcclxuXHRcdFx0d2lkdGg6IHdpZHRoLFxyXG5cdFx0fTtcclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxuXHRpZiAoIW5hbWVJbmNsdWRlZCkge1xyXG5cdFx0Y29scy51bnNoaWZ0KHtcclxuXHRcdFx0dHlwZTogJ2lkJyxcclxuXHRcdFx0bGFiZWw6ICdJRCcsXHJcblx0XHRcdHBhdGg6ICdpZCcsXHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmV0dXJuIGNvbHM7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5leHBhbmRTb3J0ID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0Y29uc3Qgc29ydCA9IHtcclxuXHRcdHJhd0lucHV0OiBpbnB1dCB8fCB0aGlzLmRlZmF1bHRTb3J0LFxyXG5cdFx0aXNEZWZhdWx0U29ydDogZmFsc2UsXHJcblx0fTtcclxuXHRzb3J0LmlucHV0ID0gc29ydC5yYXdJbnB1dDtcclxuXHRpZiAoc29ydC5pbnB1dCA9PT0gJ19fZGVmYXVsdF9fJykge1xyXG5cdFx0c29ydC5pc0RlZmF1bHRTb3J0ID0gdHJ1ZTtcclxuXHRcdHNvcnQuaW5wdXQgPSB0aGlzLnNvcnRhYmxlID8gJ3NvcnRPcmRlcicgOiB0aGlzLm5hbWVQYXRoO1xyXG5cdH1cclxuXHRzb3J0LnBhdGhzID0gbGlzdFRvQXJyYXkoc29ydC5pbnB1dCkubWFwKHBhdGggPT4ge1xyXG5cdFx0bGV0IGludmVydCA9IGZhbHNlO1xyXG5cdFx0aWYgKHBhdGguY2hhckF0KDApID09PSAnLScpIHtcclxuXHRcdFx0aW52ZXJ0ID0gdHJ1ZTtcclxuXHRcdFx0cGF0aCA9IHBhdGguc3Vic3RyKDEpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcrJykge1xyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMSk7XHJcblx0XHR9XHJcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW3BhdGhdO1xyXG5cdFx0aWYgKCFmaWVsZCkge1xyXG5cdFx0XHQvLyBUT0RPOiBTdXBwb3J0IGFyYml0YXJ5IGRvY3VtZW50IHBhdGhzXHJcblx0XHRcdGNvbnNvbGUud2FybignSW52YWxpZCBTb3J0IHNwZWNpZmllZDonLCBwYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmllbGQ6IGZpZWxkLFxyXG5cdFx0XHR0eXBlOiBmaWVsZC50eXBlLFxyXG5cdFx0XHRsYWJlbDogZmllbGQubGFiZWwsXHJcblx0XHRcdHBhdGg6IGZpZWxkLnBhdGgsXHJcblx0XHRcdGludmVydDogaW52ZXJ0LFxyXG5cdFx0fTtcclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxuXHRyZXR1cm4gc29ydDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGEgc3BlY2lmaWMgaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaXRlbUlkICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gbG9hZFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb3B0aW9uc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmxvYWRJdGVtID0gZnVuY3Rpb24gKGl0ZW1JZCwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG5cdFx0b3B0aW9ucyA9IG51bGw7XHJcblx0fVxyXG5cdGxldCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgJy8nICsgaXRlbUlkO1xyXG5cdGNvbnN0IHF1ZXJ5ID0gcXMuc3RyaW5naWZ5KG9wdGlvbnMpO1xyXG5cdGlmIChxdWVyeS5sZW5ndGgpIHVybCArPSAnPycgKyBxdWVyeTtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGRhdGEgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWQgYWxsIGl0ZW1zIG9mIGEgbGlzdCwgb3B0aW9uYWxseSBwYXNzaW5nIG9iamVjdHMgdG8gYnVpbGQgYSBxdWVyeSBzdHJpbmdcclxuICogZm9yIHNvcnRpbmcgb3Igc2VhcmNoaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvcHRpb25zXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUubG9hZEl0ZW1zID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucyk7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGRhdGEgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBkb3dubG9hZCBVUkwgdG8gZG93bmxvYWQgYSBsaXN0IHdpdGggdGhlIGN1cnJlbnQgc29ydGluZywgZmlsdGVyaW5nLFxyXG4gKiBzZWxlY3Rpb24gYW5kIHNlYXJjaGluZyBvcHRpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgVGhlIGRvd25sb2FkIFVSTFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuZ2V0RG93bmxvYWRVUkwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGg7XHJcblx0Y29uc3QgcGFydHMgPSBbXTtcclxuXHRpZiAob3B0aW9ucy5mb3JtYXQgIT09ICdqc29uJykge1xyXG5cdFx0b3B0aW9ucy5mb3JtYXQgPSAnY3N2JztcclxuXHR9XHJcblx0cGFydHMucHVzaChvcHRpb25zLnNlYXJjaCA/ICdzZWFyY2g9JyArIG9wdGlvbnMuc2VhcmNoIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5maWx0ZXJzLmxlbmd0aCA/ICdmaWx0ZXJzPScgKyBKU09OLnN0cmluZ2lmeShnZXRGaWx0ZXJzKG9wdGlvbnMuZmlsdGVycykpIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5jb2x1bW5zID8gJ3NlbGVjdD0nICsgb3B0aW9ucy5jb2x1bW5zLm1hcChpID0+IGkucGF0aCkuam9pbignLCcpIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5zb3J0ID8gJ3NvcnQ9JyArIGdldFNvcnRTdHJpbmcob3B0aW9ucy5zb3J0KSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKCdleHBhbmRSZWxhdGlvbnNoaXBGaWVsZHM9dHJ1ZScpO1xyXG5cdHJldHVybiB1cmwgKyAnL2V4cG9ydC4nICsgb3B0aW9ucy5mb3JtYXQgKyAnPycgKyBwYXJ0cy5maWx0ZXIodHJ1dGh5KS5qb2luKCcmJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVsZXRlIGEgc3BlY2lmaWMgaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaXRlbUlkICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gZGVsZXRlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuZGVsZXRlSXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQsIGNhbGxiYWNrKSB7XHJcblx0dGhpcy5kZWxldGVJdGVtcyhbaXRlbUlkXSwgY2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBtdWx0aXBsZSBpdGVtcyBhdCBvbmNlIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSAgIGl0ZW1JZHMgIEFuIGFycmF5IG9mIGlkcyBvZiBpdGVtcyB3ZSB3YW50IHRvIGRlbGV0ZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmRlbGV0ZUl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1JZHMsIGNhbGxiYWNrKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArICcvZGVsZXRlJztcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdFx0anNvbjoge1xyXG5cdFx0XHRpZHM6IGl0ZW1JZHMsXHJcblx0XHR9LFxyXG5cdH0sIChlcnIsIHJlc3AsIGJvZHkpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0Ly8gUGFzcyB0aGUgYm9keSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGJvZHkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soYm9keSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5yZW9yZGVySXRlbXMgPSBmdW5jdGlvbiAoaXRlbSwgb2xkU29ydE9yZGVyLCBuZXdTb3J0T3JkZXIsIHBhZ2VPcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyAnLycgKyBpdGVtLmlkICsgJy9zb3J0T3JkZXIvJyArIG9sZFNvcnRPcmRlciArICcvJyArIG5ld1NvcnRPcmRlciArICcvJyArIGJ1aWxkUXVlcnlTdHJpbmcocGFnZU9wdGlvbnMpO1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0fSwgKGVyciwgcmVzcCwgYm9keSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yIHBhcnNpbmcgcmVzdWx0cyBqc29uOicsIGUsIGJvZHkpO1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soZSk7XHJcblx0XHR9XHJcblx0XHQvLyBQYXNzIHRoZSBib2R5IGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgYm9keSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhib2R5KTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7XHJcbiIsImltcG9ydCB1cmwgZnJvbSAnY2xvdWRpbmFyeS1taWNyb3VybCc7XHJcbmNvbnN0IENMT1VEX05BTUUgPSB3aW5kb3cuS2V5c3RvbmUuY2xvdWRpbmFyeS5jbG91ZF9uYW1lO1xyXG5cclxuLypcclxuXHRUYWtlIGEgY2xvdWRpbmFyeSBwdWJsaWMgaWQgKyBvcHRpb25zIG9iamVjdFxyXG5cdGFuZCByZXR1cm4gYSB1cmxcclxuKi9cclxuZnVuY3Rpb24gY2xvdWRpbmFyeVJlc2l6ZSAocHVibGljSWQsIG9wdGlvbnMgPSB7fSkge1xyXG5cdGlmICghcHVibGljSWQgfHwgIUNMT1VEX05BTUUpIHJldHVybiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIHVybChwdWJsaWNJZCwge1xyXG5cdFx0Y2xvdWRfbmFtZTogQ0xPVURfTkFNRSwgLy8gc2luZ2xlIGNsb3VkIGZvciB0aGUgYWRtaW4gVUlcclxuXHRcdHF1YWxpdHk6IDgwLCAvLyA4MCUgcXVhbGl0eSwgd2hpY2ggfmhhbHZlcyBpbWFnZSBkb3dubG9hZCBzaXplXHJcblx0XHQuLi5vcHRpb25zLFxyXG5cdH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbG91ZGluYXJ5UmVzaXplO1xyXG4iLCIvKipcclxuXHRWYWxpZGF0ZSBIZXhcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGhleFxyXG5cclxuXHQxLiByZW1vdmUgaGFzaCBpZiBwcmVzZW50XHJcblx0Mi4gY29udmVydCBmcm9tIDMgdG8gNiBkaWdpdCBjb2xvciBjb2RlICYgZW5zdXJlIHZhbGlkIGhleFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVIZXggKGNvbG9yKSB7XHJcblx0Y29uc3QgaGV4ID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHJcblx0aWYgKGhleC5sZW5ndGggPT09IDMpIHtcclxuXHRcdHJldHVybiBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XHJcblx0fVxyXG5cdGlmIChoZXgubGVuZ3RoICE9PSA2KSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29sb3IgdmFsdWUgcHJvdmlkZWQ6IFwiJHtjb2xvcn1cImApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGhleDtcclxufTtcclxuXHJcbi8qKlxyXG5cdEZhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBhcHBsaWVzIGFuIGFscGhhIHZhbHVlLlxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3JcclxuXHRAcGFyYW0ge051bWJlcn0gb3BhY2l0eSAoMC0xMDApXHJcblxyXG5cdDEuIGNvbnZlcnQgaGV4IHRvIFJHQlxyXG5cdDIuIGNvbWJpbmUgYW5kIGFkZCBhbHBoYSBjaGFubmVsXHJcbiovXHJcblxyXG5mdW5jdGlvbiBmYWRlIChjb2xvciwgb3BhY2l0eSA9IDEwMCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IG9wYWNpdHkgLyAxMDA7XHJcblx0Y29uc3QgaGV4ID0gdmFsaWRhdGVIZXgoY29sb3IpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XHJcblx0Y29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcclxuXHRjb25zdCBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xyXG5cclxuXHQvLyAyLlxyXG5cdGNvbnN0IHJlc3VsdCA9ICdyZ2JhKCdcclxuXHRcdCsgciArICcsJ1xyXG5cdFx0KyBnICsgJywnXHJcblx0XHQrIGIgKyAnLCdcclxuXHRcdCsgZGVjaW1hbEZyYWN0aW9uXHJcblx0XHQrICcpJztcclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblxyXG4vKipcclxuXHRTaGFkZSBDb2xvclxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRUYWtlcyBhIGhleGlkZWNpbWFsIGNvbG9yLCBjb252ZXJ0cyBpdCB0byBSR0IgYW5kIGxpZ2h0ZW5zIG9yIGRhcmtlbnNcclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBkbyBmYW5jeSBSR0IgYml0d2lzZSBvcGVyYXRpb25zXHJcblx0Mi4gY29tYmluZSBiYWNrIGludG8gYSBoZXggdmFsdWVcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHNoYWRlIChjb2xvciwgcGVyY2VudCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IHBlcmNlbnQgLyAxMDA7XHJcblx0Y29uc3QgaGV4ID0gdmFsaWRhdGVIZXgoY29sb3IpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGxldCBmID0gcGFyc2VJbnQoaGV4LCAxNik7XHJcblx0bGV0IHQgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gMCA6IDI1NTtcclxuXHRsZXQgcCA9IGRlY2ltYWxGcmFjdGlvbiA8IDAgPyBkZWNpbWFsRnJhY3Rpb24gKiAtMSA6IGRlY2ltYWxGcmFjdGlvbjtcclxuXHJcblx0Y29uc3QgUiA9IGYgPj4gMTY7XHJcblx0Y29uc3QgRyA9IGYgPj4gOCAmIDB4MDBGRjtcclxuXHRjb25zdCBCID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHQvLyAyLlxyXG5cdHJldHVybiAnIycgKyAoMHgxMDAwMDAwXHJcblx0XHQrIChNYXRoLnJvdW5kKCh0IC0gUikgKiBwKSArIFIpICogMHgxMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEcpICogcCkgKyBHKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKCh0IC0gQikgKiBwKSArIEIpKS50b1N0cmluZygxNikuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vLyBzaGFkZSBoZWxwZXJzXHJcbmNvbnN0IGxpZ2h0ZW4gPSBzaGFkZTtcclxuZnVuY3Rpb24gZGFya2VuIChjb2xvciwgcGVyY2VudCkge1xyXG5cdHJldHVybiBzaGFkZShjb2xvciwgcGVyY2VudCAqIC0xKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuXHRCbGVuZCBDb2xvclxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRUYWtlcyB0d28gaGV4aWRlY2ltYWwgY29sb3JzIGFuZCBibGVuZCB0aGVtIHRvZ2V0aGVyXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvcjFcclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IyXHJcblx0QHBhcmFtIHtOdW1iZXJ9IHBlcmNlbnQgKDAtMTAwKVxyXG5cclxuXHQxLiBkbyBmYW5jeSBSR0IgYml0d2lzZSBvcGVyYXRpb25zXHJcblx0Mi4gY29tYmluZSBiYWNrIGludG8gYSBoZXggdmFsdWVcclxuKi9cclxuXHJcbmZ1bmN0aW9uIGJsZW5kIChjb2xvcjEsIGNvbG9yMiwgcGVyY2VudCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IHBlcmNlbnQgLyAxMDA7XHJcblx0Y29uc3QgaGV4MSA9IHZhbGlkYXRlSGV4KGNvbG9yMSk7XHJcblx0Y29uc3QgaGV4MiA9IHZhbGlkYXRlSGV4KGNvbG9yMik7XHJcblxyXG5cdC8vIDEuXHJcblx0Y29uc3QgZiA9IHBhcnNlSW50KGhleDEsIDE2KTtcclxuXHRjb25zdCB0ID0gcGFyc2VJbnQoaGV4MiwgMTYpO1xyXG5cclxuXHRjb25zdCBSMSA9IGYgPj4gMTY7XHJcblx0Y29uc3QgRzEgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjEgPSBmICYgMHgwMDAwRkY7XHJcblxyXG5cdGNvbnN0IFIyID0gdCA+PiAxNjtcclxuXHRjb25zdCBHMiA9IHQgPj4gOCAmIDB4MDBGRjtcclxuXHRjb25zdCBCMiA9IHQgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgoUjIgLSBSMSkgKiBkZWNpbWFsRnJhY3Rpb24pICsgUjEpICogMHgxMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgoRzIgLSBHMSkgKiBkZWNpbWFsRnJhY3Rpb24pICsgRzEpICogMHgxMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEIyIC0gQjEpICogZGVjaW1hbEZyYWN0aW9uKSArIEIxKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRibGVuZCxcclxuXHRkYXJrZW4sXHJcblx0ZmFkZSxcclxuXHRsaWdodGVuLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbmNhdGVuYXRlIENsYXNzbmFtZXNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBTdXBwb3J0IGNsYXNzTmFtZSBhcyBhbiBhcnJheTpcclxuLy8gZm9yY2UgY2xhc3NuYW1lIHByb3AgaW50byBhbiBhcnJheSAocG9zc2libHkgb2YgYXJyYXlzKSB0aGVuIGZsYXR0ZW5cclxuXHJcbi8qXHJcblx0Ly8gVG8gdXNlIHNwcmVhZCB0aGUgbmV3IGFycmF5IGludG8gYXBocm9kaXRlJ3MgYGNzc2AgZnVuY3Rpb25cclxuXHJcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLmNvbXBvbmVudCxcclxuXHRcdFx0Li4uY29uY2F0Q2xhc3NuYW1lcyhjbGFzc05hbWUpXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcblx0fTtcclxuKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2F0Q2xhc3NuYW1lcyAoY2xhc3NOYW1lKSB7XHJcblx0cmV0dXJuIFtjbGFzc05hbWVdLnJlZHVjZSgoYSwgYikgPT4ge1xyXG5cdFx0cmV0dXJuIGEuY29uY2F0KGIpO1xyXG5cdH0sIFtdKTtcclxufTtcclxuIiwiLyoqXHJcblx0TGluZWFyIEdyYWRpZW50XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFNob3J0LWhhbmQgaGVscGVyIGZvciBhZGRpbmcgYSBsaW5lYXIgZ3JhZGllbnQgdG8geW91ciBjb21wb25lbnQuXHJcblxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IHNpZGVPckNvcm5lclxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IHRvcFxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IGJvdHRvbVxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IGJhc2UgKG9wdGlvbmFsKVxyXG5cdC0gQHJldHVybnMge09iamVjdH0gY3NzIGxpbmVhciBncmFkaWVudCBkZWNsYXJhdGlvblxyXG5cclxuXHRTcHJlYWQgdGhlIGRlY2xhcmF0aW9uIGludG8geW91ciBjb21wb25lbnQgY2xhc3M6XHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdG15Q29tcG9uZW50Q2xhc3M6IHtcclxuXHRcdC4uLmxpbmVhckdyYWRpZW50KHJlZCwgYmx1ZSksXHJcblx0fVxyXG4qL1xyXG5cclxuZnVuY3Rpb24gbGluZWFyR3JhZGllbnQgKGRpcmVjdGlvbiwgdG9wLCBib3R0b20sIGJhc2UgPSAnJykge1xyXG5cdHJldHVybiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KCR7ZGlyZWN0aW9ufSwgJHt0b3B9IDAlLCAke2JvdHRvbX0gMTAwJSkgJHtiYXNlfWAsXHJcblx0fTtcclxufVxyXG5cclxuLy8gVmVydGljYWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRWZXJ0aWNhbCAodG9wLCBib3R0b20sIGJhc2UpIHtcclxuXHRyZXR1cm4gbGluZWFyR3JhZGllbnQoJ3RvIGJvdHRvbScsIHRvcCwgYm90dG9tLCBiYXNlKTtcclxufVxyXG5cclxuLy8gSG9yaXpvbnRhbCBHcmFkaWVudFxyXG5mdW5jdGlvbiBncmFkaWVudEhvcml6b250YWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byByaWdodCcsIHRvcCwgYm90dG9tLCBiYXNlKTtcclxufVxyXG5cclxuLyoqXHJcblx0Qm9yZGVyIFJhZGl1c1xyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYm9yZGVyIHJhZGlpXHJcbiovXHJcblxyXG4vLyB0b3BcclxuZnVuY3Rpb24gYm9yZGVyVG9wUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyVG9wTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyByaWdodFxyXG5mdW5jdGlvbiBib3JkZXJSaWdodFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BSaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIGJvdHRvbVxyXG5mdW5jdGlvbiBib3JkZXJCb3R0b21SYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIGxlZnRcclxuZnVuY3Rpb24gYm9yZGVyTGVmdFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBSZXR1cm5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJvcmRlclRvcFJhZGl1cyxcclxuXHRib3JkZXJSaWdodFJhZGl1cyxcclxuXHRib3JkZXJCb3R0b21SYWRpdXMsXHJcblx0Ym9yZGVyTGVmdFJhZGl1cyxcclxuXHJcblx0Z3JhZGllbnRIb3Jpem9udGFsLFxyXG5cdGdyYWRpZW50VmVydGljYWwsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBFeHBvcnRzIGFuIG9iamVjdCBvZiBsaXN0cywga2V5ZWQgd2l0aCB0aGVpciBrZXkgaW5zdGVhZCBvZiB0aGVpciBuYW1lIGFuZFxyXG4gKiB3cmFwcGVkIHdpdGggdGhlIExpc3QgaGVscGVyICguL0xpc3QuanMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IExpc3QgZnJvbSAnLi9MaXN0JztcclxuXHJcbmV4cG9ydHMubGlzdHNCeUtleSA9IHt9O1xyXG5leHBvcnRzLmxpc3RzQnlQYXRoID0ge307XHJcblxyXG5mb3IgKGNvbnN0IGtleSBpbiBLZXlzdG9uZS5saXN0cykge1xyXG5cdC8vIEd1YXJkIGZvci1pbnNcclxuXHRpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChLZXlzdG9uZS5saXN0cywga2V5KSkge1xyXG5cdFx0dmFyIGxpc3QgPSBuZXcgTGlzdChLZXlzdG9uZS5saXN0c1trZXldKTtcclxuXHRcdGV4cG9ydHMubGlzdHNCeUtleVtrZXldID0gbGlzdDtcclxuXHRcdGV4cG9ydHMubGlzdHNCeVBhdGhbbGlzdC5wYXRoXSA9IGxpc3Q7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGZldyBoZWxwZXIgbWV0aG9kcyBmb3Igc3RyaW5nc1xyXG4gKi9cclxuXHJcbmltcG9ydCBpbmZsZWN0IGZyb20gJ2knO1xyXG5pbXBvcnQgeyBjb21wYWN0LCBzaXplIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUgc2luZ3VsYXIgb3IgcGx1cmFsIG9mIGEgc3RyaW5nIGJhc2VkIG9uIGEgbnVtYmVyXHJcbiAqIG9yIG51bWJlciBvZiBpdGVtcyBpbiBhbiBhcnJheS5cclxuICpcclxuICogSWYgYXJpdHkgaXMgMSwgcmV0dXJucyB0aGUgcGx1cmFsIGZvcm0gb2YgdGhlIHdvcmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb3VudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2luZ3VsYXIgc3RyaW5nXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbHVyYWwgc3RyaW5nXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc2luZ3VsYXIgb3IgcGx1cmFsLCAqIGlzIHJlcGxhY2VkIHdpdGggY291bnRcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnBsdXJhbCA9IGZ1bmN0aW9uIChjb3VudCwgc24sIHBsKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdHJldHVybiBpbmZsZWN0LnBsdXJhbGl6ZShjb3VudCk7XHJcblx0fVxyXG5cdGlmICh0eXBlb2Ygc24gIT09ICdzdHJpbmcnKSBzbiA9ICcnO1xyXG5cdGlmICghcGwpIHtcclxuXHRcdHBsID0gaW5mbGVjdC5wbHVyYWxpemUoc24pO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIGNvdW50ID09PSAnc3RyaW5nJykge1xyXG5cdFx0Y291bnQgPSBOdW1iZXIoY291bnQpO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGNvdW50ICE9PSAnbnVtYmVyJykge1xyXG5cdFx0Y291bnQgPSBzaXplKGNvdW50KTtcclxuXHR9XHJcblx0cmV0dXJuIChjb3VudCA9PT0gMSA/IHNuIDogcGwpLnJlcGxhY2UoJyonLCBjb3VudCk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBsZXR0ZXIgaW4gYSBzdHJpbmcgdG8gdXBwZXJjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBTdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnVwY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRpZiAoc3RyICYmIHN0ci50b1N0cmluZykgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8ICFzdHIubGVuZ3RoKSByZXR1cm4gJyc7XHJcblx0cmV0dXJuIChzdHIuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGxldHRlciBpbiBhIHN0cmluZyB0byBsb3dlcmNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IFN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMuZG93bmNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHJldHVybiAoc3RyLnN1YnN0cigwLCAxKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cigxKSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIHRpdGxlIGNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRpdGxlIENhc2UgZm9ybSBvZiBzdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnRpdGxlY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRpZiAoc3RyICYmIHN0ci50b1N0cmluZykgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8ICFzdHIubGVuZ3RoKSByZXR1cm4gJyc7XHJcblx0c3RyID0gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpO1xyXG5cdHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvXFxzfF98XFwtLyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKHBhcnRzW2ldICYmICEvXltBLVowLTldKyQvLnRlc3QocGFydHNbaV0pKSB7XHJcblx0XHRcdHBhcnRzW2ldID0gZXhwb3J0cy51cGNhc2UocGFydHNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gY29tcGFjdChwYXJ0cykuam9pbignICcpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtCb29sZWFufSBsb3dlcmNhc2VGaXJzdFdvcmRcclxuICogQHJldHVybiB7U3RyaW5nfSBjYW1lbC1jYXNlIGZvcm0gb2Ygc3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5jYW1lbGNhc2UgPSBmdW5jdGlvbiAoc3RyLCBsYykge1xyXG5cdHJldHVybiBpbmZsZWN0LmNhbWVsaXplKHN0ciwgIShsYykpO1xyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGZhZGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgRSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvY29uc3RhbnRzJztcclxuXHJcbnZhciBDaGVja2JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0NoZWNrYm94JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0Y29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHJlYWRvbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb21wb25lbnQ6ICdidXR0b24nLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhY3RpdmU6IG51bGwsXHJcblx0XHRcdGZvY3VzOiBudWxsLFxyXG5cdFx0XHRob3ZlcjogbnVsbCxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCwgZmFsc2UpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcclxuXHR9LFxyXG5cdGdldFN0eWxlcyAoKSB7XHJcblx0XHRjb25zdCB7IGNoZWNrZWQsIHJlYWRvbmx5IH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyBhY3RpdmUsIGZvY3VzLCBob3ZlciB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBjaGVja2VkQ29sb3IgPSAnIzM5OTlmYyc7XHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gY2hlY2tlZENvbG9yIDogJ3doaXRlJztcclxuXHRcdGxldCBib3JkZXJDb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAncmdiYSgwLDAsMCwwLjE1KSByZ2JhKDAsMCwwLDAuMSkgcmdiYSgwLDAsMCwwLjA1KScgOiAncmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4yKSByZ2JhKDAsMCwwLDAuMTUpJztcclxuXHRcdGxldCBib3hTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJzAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjMzKScgOiAnaW5zZXQgMCAxcHggMCByZ2JhKDAsMCwwLDAuMDYpJztcclxuXHRcdGxldCBjb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnd2hpdGUnIDogJyNiYmInO1xyXG5cdFx0Y29uc3QgdGV4dFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMiknIDogbnVsbDtcclxuXHJcblx0XHQvLyBwc2V1ZG8gc3RhdGVcclxuXHRcdGlmIChob3ZlciAmJiAhZm9jdXMgJiYgIXJlYWRvbmx5KSB7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gKGNoZWNrZWQpID8gJ3JnYmEoMCwwLDAsMC4xKSByZ2JhKDAsMCwwLDAuMTUpIHJnYmEoMCwwLDAsMC4yKScgOiAncmdiYSgwLDAsMCwwLjM1KSByZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjI1KSc7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlKSB7XHJcblx0XHRcdGJhY2tncm91bmQgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gZGFya2VuKGNoZWNrZWRDb2xvciwgMjApIDogJyNlZWUnO1xyXG5cdFx0XHRib3JkZXJDb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAncmdiYSgwLDAsMCwwLjI1KSByZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjM1KScgOiAncmdiYSgwLDAsMCwwLjQpIHJnYmEoMCwwLDAsMC4zNSkgcmdiYSgwLDAsMCwwLjMpJztcclxuXHRcdFx0Ym94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICcwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4zMyknIDogJ2luc2V0IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMiknO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGZvY3VzICYmICFhY3RpdmUpIHtcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4yNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4zNSknIDogY2hlY2tlZENvbG9yO1xyXG5cdFx0XHRib3hTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gYDAgMCAwIDNweCAke2ZhZGUoY2hlY2tlZENvbG9yLCAxNSl9YCA6IGBpbnNldCAwIDFweCAycHggcmdiYSgwLDAsMCwwLjE1KSwgMCAwIDAgM3B4ICR7ZmFkZShjaGVja2VkQ29sb3IsIDE1KX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG5vZWRpdFxyXG5cdFx0aWYgKHJlYWRvbmx5KSB7XHJcblx0XHRcdGJhY2tncm91bmQgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJztcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAncmdiYSgwLDAsMCwwLjEpJztcclxuXHRcdFx0Ym94U2hhZG93ID0gJ25vbmUnO1xyXG5cdFx0XHRjb2xvciA9IGNoZWNrZWQgPyBjaGVja2VkQ29sb3IgOiAnI2JiYic7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRcdGJhY2tncm91bmQ6IGJhY2tncm91bmQsXHJcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCcsXHJcblx0XHRcdGJvcmRlckNvbG9yOiBib3JkZXJDb2xvcixcclxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBFLmJvcmRlclJhZGl1cy5zbSxcclxuXHRcdFx0Ym94U2hhZG93OiBib3hTaGFkb3csXHJcblx0XHRcdGNvbG9yOiBjb2xvcixcclxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRcdGZvbnRTaXplOiAxNCxcclxuXHRcdFx0aGVpZ2h0OiAxNixcclxuXHRcdFx0bGluZUhlaWdodDogJzE1cHgnLFxyXG5cdFx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0XHRcdHBhZGRpbmc6IDAsXHJcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHRcdHRleHRTaGFkb3c6IHRleHRTaGFkb3csXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0XHR3aWR0aDogMTYsXHJcblxyXG5cdFx0XHRtc1RyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0XHRNb3pUcmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdFx0V2Via2l0VHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHRcdHRyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGhhbmRsZUtleURvd24gKGUpIHtcclxuXHRcdGlmIChlLmtleUNvZGUgIT09IDMyKSByZXR1cm47XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZSh0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZUtleVVwICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKGZhbHNlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlT3ZlciAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUhvdmVyKHRydWUpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VEb3duICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKHRydWUpO1xyXG5cdFx0dGhpcy50b2dnbGVGb2N1cyh0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlVXAgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUoZmFsc2UpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VPdXQgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVIb3ZlcihmYWxzZSk7XHJcblx0fSxcclxuXHR0b2dnbGVBY3RpdmUgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZTogcHNldWRvIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlSG92ZXIgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiBwc2V1ZG8gfSk7XHJcblx0fSxcclxuXHR0b2dnbGVGb2N1cyAocHNldWRvKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgZm9jdXM6IHBzZXVkbyB9KTtcclxuXHR9LFxyXG5cdGhhbmRsZUNoYW5nZSAoKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKCF0aGlzLnByb3BzLmNoZWNrZWQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hlY2tlZCwgcmVhZG9ubHkgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NoZWNrZWQnLCAnY29tcG9uZW50JywgJ29uQ2hhbmdlJywgJ3JlYWRvbmx5Jyk7XHJcblx0XHRwcm9wcy5zdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKCk7XHJcblx0XHRwcm9wcy5yZWYgPSAnY2hlY2tib3gnO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnb2N0aWNvbicsIHtcclxuXHRcdFx0J29jdGljb24tY2hlY2snOiBjaGVja2VkLFxyXG5cdFx0XHQnb2N0aWNvbi14JzogKHR5cGVvZiBjaGVja2VkID09PSAnYm9vbGVhbicpICYmICFjaGVja2VkICYmIHJlYWRvbmx5LFxyXG5cdFx0fSk7XHJcblx0XHRwcm9wcy50eXBlID0gcmVhZG9ubHkgPyBudWxsIDogJ2J1dHRvbic7XHJcblxyXG5cdFx0cHJvcHMub25LZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duO1xyXG5cdFx0cHJvcHMub25LZXlVcCA9IHRoaXMuaGFuZGxlS2V5VXA7XHJcblxyXG5cdFx0cHJvcHMub25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bjtcclxuXHRcdHByb3BzLm9uTW91c2VVcCA9IHRoaXMuaGFuZGxlTW91c2VVcDtcclxuXHRcdHByb3BzLm9uTW91c2VPdmVyID0gdGhpcy5oYW5kbGVNb3VzZU92ZXI7XHJcblx0XHRwcm9wcy5vbk1vdXNlT3V0ID0gdGhpcy5oYW5kbGVNb3VzZU91dDtcclxuXHJcblx0XHRwcm9wcy5vbkNsaWNrID0gcmVhZG9ubHkgPyBudWxsIDogdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5vbkZvY3VzID0gcmVhZG9ubHkgPyBudWxsIDogKCkgPT4gdGhpcy50b2dnbGVGb2N1cyh0cnVlKTtcclxuXHRcdHByb3BzLm9uQmx1ciA9IHJlYWRvbmx5ID8gbnVsbCA6ICgpID0+IHRoaXMudG9nZ2xlRm9jdXMoZmFsc2UpO1xyXG5cclxuXHRcdGNvbnN0IG5vZGUgPSByZWFkb25seSA/ICdzcGFuJyA6IHRoaXMucHJvcHMuY29tcG9uZW50O1xyXG5cclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGUsIHByb3BzKTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3g7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbi8vIE5PVEUgbWFyZ2luQm90dG9tIG9mIDFweCBzdG9wcyB0aGluZ3MganVtcGluZyBhcm91bmRcclxuLy8gVE9ETyBmaW5kIG91dCB3aHkgdGhpcyBpcyBuZWNlc3NhcnlcclxuXHJcbmZ1bmN0aW9uIENvbGxhcHNlZEZpZWxkTGFiZWwgKHsgc3R5bGUsIC4uLnByb3BzIH0pIHtcclxuXHRjb25zdCBfX3N0eWxlX18gPSB7XHJcblx0XHRtYXJnaW5Cb3R0b206IDEsXHJcblx0XHRwYWRkaW5nTGVmdDogMCxcclxuXHRcdHBhZGRpbmdSaWdodDogMCxcclxuXHRcdC4uLnN0eWxlLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgc3R5bGU9e19fc3R5bGVfX30gey4uLnByb3BzfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxhcHNlZEZpZWxkTGFiZWw7XHJcbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IERheVBpY2tlciBmcm9tICdyZWFjdC1kYXktcGlja2VyJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgUG9wb3V0IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL1BvcG91dCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmxldCBsYXN0SWQgPSAwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdEYXRlSW5wdXQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Zm9ybWF0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0bmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRjb25zdCBpZCA9ICsrbGFzdElkO1xyXG5cdFx0bGV0IG1vbnRoID0gbmV3IERhdGUoKTtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGlmIChtb21lbnQodmFsdWUsIGZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdG1vbnRoID0gbW9tZW50KHZhbHVlLCBmb3JtYXQpLnRvRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aWQ6IGBfRGF0ZUlucHV0XyR7aWR9YCxcclxuXHRcdFx0bW9udGg6IG1vbnRoLFxyXG5cdFx0XHRwaWNrZXJJc09wZW46IGZhbHNlLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiB2YWx1ZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLnNob3dDdXJyZW50TW9udGgoKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIChuZXdQcm9wcykge1xyXG5cdFx0aWYgKG5ld1Byb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlKSByZXR1cm47XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bW9udGg6IG1vbWVudChuZXdQcm9wcy52YWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQpLnRvRGF0ZSgpLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiBuZXdQcm9wcy52YWx1ZSxcclxuXHRcdH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRmb2N1cyAoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVmcy5pbnB1dCkgcmV0dXJuO1xyXG5cdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzLmlucHV0KS5mb2N1cygpO1xyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IHZhbHVlIH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRoYW5kbGVLZXlQcmVzcyAoZSkge1xyXG5cdFx0aWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Ly8gSWYgdGhlIGRhdGUgaXMgc3RyaWN0bHkgZXF1YWwgdG8gdGhlIGZvcm1hdCBzdHJpbmcsIGRpc3BhdGNoIG9uQ2hhbmdlXHJcblx0XHRcdGlmIChtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgfSk7XHJcblx0XHRcdC8vIElmIHRoZSBkYXRlIGlzIG5vdCBzdHJpY3RseSBlcXVhbCwgb25seSBjaGFuZ2UgdGhlIHRhYiB0aGF0IGlzIGRpc3BsYXllZFxyXG5cdFx0XHR9IGVsc2UgaWYgKG1vbWVudCh0aGlzLnN0YXRlLmlucHV0VmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0KS5pc1ZhbGlkKCkpIHtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdG1vbnRoOiBtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCkudG9EYXRlKCksXHJcblx0XHRcdFx0fSwgdGhpcy5zaG93Q3VycmVudE1vbnRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlRGF5U2VsZWN0IChlLCBkYXRlLCBtb2RpZmllcnMpIHtcclxuXHRcdGlmIChtb2RpZmllcnMgJiYgbW9kaWZpZXJzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIHZhbHVlID0gbW9tZW50KGRhdGUpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCk7XHJcblxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHBpY2tlcklzT3BlbjogZmFsc2UsXHJcblx0XHRcdG1vbnRoOiBkYXRlLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiB2YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvd1BpY2tlciAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgcGlja2VySXNPcGVuOiB0cnVlIH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRzaG93Q3VycmVudE1vbnRoICgpIHtcclxuXHRcdGlmICghdGhpcy5yZWZzLnBpY2tlcikgcmV0dXJuO1xyXG5cdFx0dGhpcy5yZWZzLnBpY2tlci5zaG93TW9udGgodGhpcy5zdGF0ZS5tb250aCk7XHJcblx0fSxcclxuXHRoYW5kbGVGb2N1cyAoZSkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUucGlja2VySXNPcGVuKSByZXR1cm47XHJcblx0XHR0aGlzLnNob3dQaWNrZXIoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUNhbmNlbCAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgcGlja2VySXNPcGVuOiBmYWxzZSB9KTtcclxuXHR9LFxyXG5cdGhhbmRsZUJsdXIgKGUpIHtcclxuXHRcdGxldCBydCA9IGUucmVsYXRlZFRhcmdldCB8fCBlLm5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ7XHJcblx0XHRjb25zdCBwb3BvdXQgPSB0aGlzLnJlZnMucG9wb3V0LmdldFBvcnRhbERPTU5vZGUoKTtcclxuXHRcdHdoaWxlIChydCkge1xyXG5cdFx0XHRpZiAocnQgPT09IHBvcG91dCkgcmV0dXJuO1xyXG5cdFx0XHRydCA9IHJ0LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0cGlja2VySXNPcGVuOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuXHRcdC8vIHJlYWN0LWRheS1waWNrZXIgYWRkcyBhIGNsYXNzIHRvIHRoZSBzZWxlY3RlZCBkYXkgYmFzZWQgb24gdGhpc1xyXG5cdFx0Y29uc3QgbW9kaWZpZXJzID0ge1xyXG5cdFx0XHRzZWxlY3RlZDogKGRheSkgPT4gbW9tZW50KGRheSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KSA9PT0gc2VsZWN0ZWREYXksXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdGlkPXt0aGlzLnN0YXRlLmlkfVxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG5cdFx0XHRcdFx0b25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XHJcblx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuZm9ybWF0fVxyXG5cdFx0XHRcdFx0cmVmPVwiaW5wdXRcIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuaW5wdXRWYWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxQb3BvdXRcclxuXHRcdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5waWNrZXJJc09wZW59XHJcblx0XHRcdFx0XHRvbkNhbmNlbD17dGhpcy5oYW5kbGVDYW5jZWx9XHJcblx0XHRcdFx0XHRyZWY9XCJwb3BvdXRcIlxyXG5cdFx0XHRcdFx0cmVsYXRpdmVUb0lEPXt0aGlzLnN0YXRlLmlkfVxyXG5cdFx0XHRcdFx0d2lkdGg9ezI2MH1cclxuXHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdDxEYXlQaWNrZXJcclxuXHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5U2VsZWN0fVxyXG5cdFx0XHRcdFx0XHRyZWY9XCJwaWNrZXJcIlxyXG5cdFx0XHRcdFx0XHR0YWJJbmRleD17LTF9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvUG9wb3V0PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9jb2xvcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gRmlsZUNoYW5nZU1lc3NhZ2UgKHsgc3R5bGUsIGNvbG9yLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3Qgc3R5bGVzID0ge1xyXG5cdFx0bWFyZ2luUmlnaHQ6IDEwLFxyXG5cdFx0bWluV2lkdGg6IDAsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRpZiAoY29sb3IgIT09ICdkZWZhdWx0Jykge1xyXG5cdFx0c3R5bGVzLmJhY2tncm91bmRDb2xvciA9IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxMCk7XHJcblx0XHRzdHlsZXMuYm9yZGVyQ29sb3IgPSBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMzApO1xyXG5cdFx0c3R5bGVzLmNvbG9yID0gdGhlbWUuY29sb3JbY29sb3JdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0bm9lZGl0XHJcblx0XHRcdHN0eWxlPXtzdHlsZXN9XHJcblx0XHRcdHsuLi5wcm9wc31cclxuXHRcdC8+XHJcblx0KTtcclxufTtcclxuXHJcbkZpbGVDaGFuZ2VNZXNzYWdlLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnc3VjY2VzcyddKSxcclxufTtcclxuRmlsZUNoYW5nZU1lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVDaGFuZ2VNZXNzYWdlO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vKlxyXG5cdEV4cG9zZSBpbnRlcm5hbCByZWYgdG8gcGFyZW50XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0RmllbGQuY3JlYXRlKHtcclxuXHRcdHRyaWdnZXJGaWxlQnJvd3NlciAoKSB7XHJcblx0XHRcdHRoaXMucmVmcy5maWxlSW5wdXQuY2xpY2tEb21Ob2RlKCk7XHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyICgpIHtcclxuXHRcdFx0PEhpZGRlbkZpbGVJbnB1dCByZWY9XCJmaWxlSW5wdXRcIiAvPlxyXG5cdFx0fVxyXG5cdH0pO1xyXG4qL1xyXG5cclxuY2xhc3MgSGlkZGVuRmlsZUlucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuY2xlYXJWYWx1ZSA9IHRoaXMuY2xlYXJWYWx1ZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jbGlja0RvbU5vZGUgPSB0aGlzLmNsaWNrRG9tTm9kZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYXNWYWx1ZSA9IHRoaXMuaGFzVmFsdWUuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0Y2xlYXJWYWx1ZSAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC52YWx1ZSA9ICcnO1xyXG5cdH1cclxuXHRjbGlja0RvbU5vZGUgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuY2xpY2soKTtcclxuXHR9XHJcblx0aGFzVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuICEhdGhpcy50YXJnZXQudmFsdWU7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IHN0eWxlLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHNldFJlZiA9IChuKSA9PiAodGhpcy50YXJnZXQgPSBuKTtcclxuXHRcdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdFx0bGVmdDogLTk5OTksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHQuLi5zdHlsZSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0XHRcdHN0eWxlPXtzdHlsZXN9XHJcblx0XHRcdFx0cmVmPXtzZXRSZWZ9XHJcblx0XHRcdFx0dGFiSW5kZXg9XCItMVwiXHJcblx0XHRcdFx0dHlwZT1cImZpbGVcIlxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5IaWRkZW5GaWxlSW5wdXQucHJvcFR5cGVzID0ge1xyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIaWRkZW5GaWxlSW5wdXQ7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdGhlbWUnO1xyXG5cclxuLy8gRklYTUUgc3RhdGljIG9jdGljb24gY2xhc3NlcyBsZWFuaW5nIG9uIEVsZW1lbnRhbCB0byBhdm9pZCBkdXBsaWNhdGVcclxuLy8gZm9udCBhbmQgQ1NTOyBpbmZsYXRpbmcgdGhlIHByb2plY3Qgc2l6ZVxyXG5cclxuY29uc3QgSUNPTl9NQVAgPSB7XHJcblx0bG9hZGluZzogJycsXHJcblx0cmVtb3ZlOiAnbWVnYS1vY3RpY29uIG9jdGljb24tdHJhc2hjYW4nLFxyXG5cdHVwbG9hZDogJ21lZ2Etb2N0aWNvbiBvY3RpY29uLWNsb3VkLXVwbG9hZCcsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBJbWFnZVRodW1ibmFpbCAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjb21wb25lbnQsIG1hc2ssIC4uLnByb3BzIH0pIHtcclxuXHRjb25zdCBtYXNrVUkgPSBtYXNrID8gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLm1hc2spICsgYCAke0lDT05fTUFQW21hc2tdfWB9PlxyXG5cdFx0XHR7bWFzayA9PT0gJ2xvYWRpbmcnXHJcblx0XHRcdFx0PyA8U3Bpbm5lciBjb2xvcj1cImludmVydGVkXCIgLz5cclxuXHRcdFx0XHQ6IG51bGx9XHJcblx0XHQ8L2Rpdj5cclxuXHQpIDogbnVsbDtcclxuXHJcblx0Ly8gYXBwbHkgaG92ZXIgYW5kIGZvY3VzIHN0eWxlcyBvbmx5IHdoZW4gdXNpbmcgYW4gYW5jaG9yXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5iYXNlLFxyXG5cdFx0Y29tcG9uZW50ID09PSAnYScgPyBjbGFzc2VzLmFuY2hvciA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHQvLyBhcHBlbmQgdGhlIG1hc2sgVUkgdG8gY2hpbGRyZW5cclxuXHRwcm9wcy5jaGlsZHJlbiA9IFtdLmNvbmNhdChjaGlsZHJlbiwgW21hc2tVSV0pO1xyXG5cclxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufTtcclxuXHJcbkltYWdlVGh1bWJuYWlsLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdG1hc2s6IFByb3BUeXBlcy5vbmVPZihbJ2xvYWRpbmcnLCAncmVtb3ZlJywgJ3VwbG9hZCddKSxcclxufTtcclxuSW1hZ2VUaHVtYm5haWwuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5jb25zdCBHVVRURVJfV0lEVEggPSA0O1xyXG5jb25zdCBob3ZlckFuZEZvY3VzU3R5bGVzID0ge1xyXG5cdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHRib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdH1gLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6ICdhdXRvJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxJyxcclxuXHRcdG1heFdpZHRoOiAnMTAwJScsXHJcblx0XHRwYWRkaW5nOiBHVVRURVJfV0lEVEgsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cdGFuY2hvcjoge1xyXG5cdFx0Jzpob3Zlcic6IGhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHQuLi5ob3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBtYXNrXHJcblx0bWFzazoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxyXG5cdFx0Ym90dG9tOiBHVVRURVJfV0lEVEgsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRcdGxlZnQ6IEdVVFRFUl9XSURUSCxcclxuXHRcdGxpbmVIZWlnaHQ6IDkwLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRyaWdodDogR1VUVEVSX1dJRFRILFxyXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHRcdHRvcDogR1VUVEVSX1dJRFRILFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlVGh1bWJuYWlsO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmZ1bmN0aW9uIEl0ZW1zVGFibGVDZWxsICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ0l0ZW1MaXN0X19jb2wnLCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHRkIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVGFibGVDZWxsO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcblxyXG5mdW5jdGlvbiBJdGVtc1RhYmxlVmFsdWUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50LFxyXG5cdGVtcHR5LFxyXG5cdGV4dGVyaW9yLFxyXG5cdGZpZWxkLFxyXG5cdGhyZWYsXHJcblx0aW50ZXJpb3IsXHJcblx0cGFkZGVkLFxyXG5cdHRvLFxyXG5cdHRydW5jYXRlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBUT0RPIHJlbW92ZSBpbiB0aGUgbmV4dCByZWxlYXNlXHJcblx0aWYgKGhyZWYpIHtcclxuXHRcdGNvbnNvbGUud2FybignSXRlbXNUYWJsZVZhbHVlOiBgaHJlZmAgd2lsbCBiZSBkZXByZWNhdGVkIGluIHRoZSBuZXh0IHJlbGVhc2UsIHVzZSBgdG9gLicpO1xyXG5cdH1cclxuXHRjb25zdCBsaW5rUmVmID0gdG8gfHwgaHJlZjtcclxuXHRjb25zdCBDb21wb25lbnQgPSBsaW5rUmVmID8gTGluayA6IGNvbXBvbmVudDtcclxuXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnSXRlbUxpc3RfX3ZhbHVlJywgKFxyXG5cdFx0ZmllbGQgPyBgSXRlbUxpc3RfX3ZhbHVlLS0ke2ZpZWxkfWAgOiBudWxsXHJcblx0KSwge1xyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1lbXB0eSc6IGVtcHR5LFxyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1leHRlcmlvcic6IGxpbmtSZWYgJiYgZXh0ZXJpb3IsXHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLWludGVyaW9yJzogbGlua1JlZiAmJiBpbnRlcmlvcixcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tcGFkZGVkJzogbGlua1JlZiAmJiBwYWRkZWQsXHJcblx0XHQnSXRlbUxpc3RfX3ZhbHVlLS10cnVuY2F0ZSc6IHRydW5jYXRlLFxyXG5cdH0sIGNsYXNzTmFtZSk7XHJcblx0cHJvcHMudG8gPSBsaW5rUmVmO1xyXG5cdHByb3BzLnRpdGxlID0gcHJvcHMuY2hpbGRyZW47XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5JdGVtc1RhYmxlVmFsdWUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0ZW1wdHk6IFByb3BUeXBlcy5ib29sLFxyXG5cdGV4dGVyaW9yOiBQcm9wVHlwZXMuYm9vbCwgLy8gRklYTUUgdGhpcyBzaG91bGQgYmUgXCJleHRlcm5hbFwiIGUuZy4gYW4gZXh0ZXJuYWwgbGlua1xyXG5cdGZpZWxkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsIC8vIFRPRE8gcmVtb3ZlIGluIG5leHQgcmVsZWFzZVxyXG5cdGludGVyaW9yOiBQcm9wVHlwZXMuYm9vbCwgLy8gRklYTUUgdGhpcyBzaG91bGQgYmUgXCJpbnRlcm5hbFwiIGUuZy4gYW4gaW50ZXJuYWwgbGlua1xyXG5cdHBhZGRlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0dG86IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHJ1bmNhdGU6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5JdGVtc1RhYmxlVmFsdWUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0dHJ1bmNhdGU6IHRydWUsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVGFibGVWYWx1ZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBBcnJheUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0FycmF5Q29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlIHx8ICF2YWx1ZS5sZW5ndGgpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZS5qb2luKCcsICcpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnJheUNvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IElNQUdFX1NJWkUgPSAxODtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZSA9IHtcclxuXHRtYXJnaW5SaWdodDogOCxcclxufTtcclxuY29uc3QgYm94U3R5bGUgPSB7XHJcblx0Ym9yZGVyUmFkaXVzOiAzLFxyXG5cdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdGhlaWdodDogSU1BR0VfU0laRSxcclxuXHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0d2lkdGg6IElNQUdFX1NJWkUsXHJcbn07XHJcbmNvbnN0IGltYWdlU3R5bGUgPSB7XHJcblx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRoZWlnaHQ6IElNQUdFX1NJWkUsXHJcblx0bGVmdDogJzUwJScsXHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblxyXG5cdFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdE1velRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdG1zVHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcbn07XHJcbmNvbnN0IHRleHRTdHlsZSA9IHtcclxuXHRjb2xvcjogJyM4ODgnLFxyXG5cdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdGZvbnRTaXplOiAnLjhyZW0nLFxyXG5cdG1hcmdpbkxlZnQ6IDgsXHJcblx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcbn07XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Nsb3VkaW5hcnlJbWFnZVN1bW1hcnknLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaW1lbnNpb25zJywgJ3B1YmxpY0lkJ10pLFxyXG5cdH0sXHJcblx0cmVuZGVyTGFiZWwgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmxhYmVsKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgeyBsYWJlbCwgaW1hZ2UgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0bGV0IHRleHQ7XHJcblx0XHRpZiAobGFiZWwgPT09ICdkaW1lbnNpb25zJykge1xyXG5cdFx0XHR0ZXh0ID0gYCR7aW1hZ2Uud2lkdGh9IMOXICR7aW1hZ2UuaGVpZ2h0fWA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gYCR7aW1hZ2UucHVibGljX2lkfS4ke2ltYWdlLmZvcm1hdH1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzcGFuIHN0eWxlPXt0ZXh0U3R5bGV9PlxyXG5cdFx0XHRcdHt0ZXh0fVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVySW1hZ2VUaHVtYm5haWwgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmltYWdlKSByZXR1cm47XHJcblx0XHRjb25zdCB1cmwgPSB0aGlzLnByb3BzLmltYWdlLnVybC5yZXBsYWNlKC9pbWFnZVxcL3VwbG9hZC8sIGBpbWFnZS91cGxvYWQvY190aHVtYixnX2ZhY2UsaF8ke0lNQUdFX1NJWkV9LHdfJHtJTUFHRV9TSVpFfWApO1xyXG5cdFx0cmV0dXJuIDxpbWcgc3JjPXt1cmx9IHN0eWxlPXtpbWFnZVN0eWxlfSBjbGFzc05hbWU9XCJpbWctbG9hZFwiIC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzcGFuIHN0eWxlPXtsaW5rU3R5bGV9PlxyXG5cdFx0XHRcdDxzcGFuIHN0eWxlPXtib3hTdHlsZX0+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJbWFnZVRodW1ibmFpbCgpfVxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJMYWJlbCgpfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIElkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5pZDtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgcGFkZGVkIGludGVyaW9yIHRpdGxlPXt2YWx1ZX0gdG89e0tleXN0b25lLmFkbWluUGF0aCArICcvJyArIHRoaXMucHJvcHMubGlzdC5wYXRoICsgJy8nICsgdmFsdWV9IGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElkQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEludmFsaWRDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdJbnZhbGlkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdChJbnZhbGlkIFR5cGU6IHt0aGlzLnByb3BzLmNvbC50eXBlfSlcclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRDb2x1bW47XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG52YXIgQnV0dG9uID0gcmVxdWlyZSgnZWxlbWVudGFsJykuQnV0dG9uO1xyXG52YXIgRm9ybUZpZWxkID0gcmVxdWlyZSgnZWxlbWVudGFsJykuRm9ybUZpZWxkO1xyXG52YXIgRm9ybUlucHV0ID0gcmVxdWlyZSgnZWxlbWVudGFsJykuRm9ybUlucHV0O1xyXG5cclxudmFyIGxhc3RJZCA9IDA7XHJcbnZhciBFTlRFUl9LRVlDT0RFID0gMTM7XHJcblxyXG5mdW5jdGlvbiBuZXdJdGVtICh2YWx1ZSkge1xyXG5cdGxhc3RJZCA9IGxhc3RJZCArIDE7XHJcblx0cmV0dXJuIHsga2V5OiAnaScgKyBsYXN0SWQsIHZhbHVlOiB2YWx1ZSB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRWYWx1ZUFzQXJyYXkodmFsdWVzKSB7XHJcblx0cmV0dXJuIHZhbHVlcyAmJiBfLmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWR1Y2VWYWx1ZXMgKHZhbHVlcykge1xyXG5cdHJldHVybiBnZXRWYWx1ZUFzQXJyYXkodmFsdWVzKS5tYXAoaSA9PiBpLnZhbHVlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR2YWx1ZXM6IEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy52YWx1ZSkgPyB0aGlzLnByb3BzLnZhbHVlLm1hcChuZXdJdGVtKSA6IFtdLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAoZ2V0VmFsdWVBc0FycmF5KG5leHRQcm9wcy52YWx1ZSkuam9pbignfCcpICE9PSByZWR1Y2VWYWx1ZXModGhpcy5zdGF0ZS52YWx1ZXMpLmpvaW4oJ3wnKSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHR2YWx1ZXM6IG5leHRQcm9wcy52YWx1ZS5tYXAobmV3SXRlbSksXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZEl0ZW06IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBuZXdWYWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlcy5jb25jYXQobmV3SXRlbSgnJykpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHZhbHVlczogbmV3VmFsdWVzLFxyXG5cdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuc3RhdGUudmFsdWVzLmxlbmd0aCkgcmV0dXJuO1xyXG5cdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ2l0ZW1fJyArIHRoaXMuc3RhdGUudmFsdWVzLmxlbmd0aF0pLmZvY3VzKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHJlZHVjZVZhbHVlcyhuZXdWYWx1ZXMpKTtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVJdGVtOiBmdW5jdGlvbiAoaSkge1xyXG5cdFx0dmFyIG5ld1ZhbHVlcyA9IF8ud2l0aG91dCh0aGlzLnN0YXRlLnZhbHVlcywgaSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dmFsdWVzOiBuZXdWYWx1ZXMsXHJcblx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5idXR0b24pLmZvY3VzKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHJlZHVjZVZhbHVlcyhuZXdWYWx1ZXMpKTtcclxuXHR9LFxyXG5cclxuXHR1cGRhdGVJdGVtOiBmdW5jdGlvbiAoaSwgZXZlbnQpIHtcclxuXHRcdHZhciB1cGRhdGVkVmFsdWVzID0gdGhpcy5zdGF0ZS52YWx1ZXM7XHJcblx0XHR2YXIgdXBkYXRlSW5kZXggPSB1cGRhdGVkVmFsdWVzLmluZGV4T2YoaSk7XHJcblx0XHR2YXIgbmV3VmFsdWUgPSBldmVudC52YWx1ZSB8fCBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHR1cGRhdGVkVmFsdWVzW3VwZGF0ZUluZGV4XS52YWx1ZSA9IHRoaXMuY2xlYW5JbnB1dCA/IHRoaXMuY2xlYW5JbnB1dChuZXdWYWx1ZSkgOiBuZXdWYWx1ZTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR2YWx1ZXM6IHVwZGF0ZWRWYWx1ZXMsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHJlZHVjZVZhbHVlcyh1cGRhdGVkVmFsdWVzKSk7XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkOiBmdW5jdGlvbiAodmFsdWVzKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWVzLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyRmllbGQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMuc3RhdGUudmFsdWVzLm1hcCh0aGlzLnJlbmRlckl0ZW0pfVxyXG5cdFx0XHRcdDxCdXR0b24gcmVmPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5hZGRJdGVtfT5BZGQgaXRlbTwvQnV0dG9uPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySXRlbTogZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcblx0XHRjb25zdCBJbnB1dCA9IHRoaXMuZ2V0SW5wdXRDb21wb25lbnQgPyB0aGlzLmdldElucHV0Q29tcG9uZW50KCkgOiBGb3JtSW5wdXQ7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvY2Vzc0lucHV0VmFsdWUgPyB0aGlzLnByb2Nlc3NJbnB1dFZhbHVlKGl0ZW0udmFsdWUpIDogaXRlbS52YWx1ZTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtRmllbGQga2V5PXtpdGVtLmtleX0+XHJcblx0XHRcdFx0PElucHV0IHJlZj17J2l0ZW1fJyArIChpbmRleCArIDEpfSBuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfSB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZUl0ZW0uYmluZCh0aGlzLCBpdGVtKX0gb25LZXlEb3duPXt0aGlzLmFkZEl0ZW1PbkVudGVyfSBhdXRvQ29tcGxldGU9XCJvZmZcIiAvPlxyXG5cdFx0XHRcdDxCdXR0b24gdHlwZT1cImxpbmstY2FuY2VsXCIgb25DbGljaz17dGhpcy5yZW1vdmVJdGVtLmJpbmQodGhpcywgaXRlbSl9IGNsYXNzTmFtZT1cImtleXN0b25lLXJlbGF0aW9uYWwtYnV0dG9uXCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJvY3RpY29uIG9jdGljb24teFwiIC8+XHJcblx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgSW5wdXQgPSB0aGlzLmdldElucHV0Q29tcG9uZW50ID8gdGhpcy5nZXRJbnB1dENvbXBvbmVudCgpIDogRm9ybUlucHV0O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5zdGF0ZS52YWx1ZXMubWFwKChpdGVtLCBpKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUgPyB0aGlzLmZvcm1hdFZhbHVlKGl0ZW0udmFsdWUpIDogaXRlbS52YWx1ZTtcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdDxkaXYga2V5PXtpfSBzdHlsZT17aSA/IHsgbWFyZ2luVG9wOiAnMWVtJyB9IDogbnVsbH0+XHJcblx0XHRcdFx0XHRcdFx0PElucHV0IG5vZWRpdCB2YWx1ZT17dmFsdWV9IC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdC8vIE92ZXJyaWRlIHNob3VsZENvbGxhcHNlIHRvIGNoZWNrIGZvciBhcnJheSBsZW5ndGhcclxuXHRzaG91bGRDb2xsYXBzZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoO1xyXG5cdH0sXHJcblxyXG5cdGFkZEl0ZW1PbkVudGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XHJcblx0XHRcdHRoaXMuYWRkSXRlbSgpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgZXZhbERlcGVuZHNPbiBmcm9tICcuLi91dGlscy9ldmFsRGVwZW5kc09uLmpzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtRmllbGQsIEZvcm1JbnB1dCwgRm9ybU5vdGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IENvbGxhcHNlZEZpZWxkTGFiZWwgZnJvbSAnLi4vY29tcG9uZW50cy9Db2xsYXBzZWRGaWVsZExhYmVsJztcclxuXHJcbmZ1bmN0aW9uIGlzT2JqZWN0IChhcmcpIHtcclxuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVNwZWMgKHNwZWMpIHtcclxuXHRpZiAoIXNwZWMpIHNwZWMgPSB7fTtcclxuXHRpZiAoIWlzT2JqZWN0KHNwZWMuc3VwcG9ydHMpKSB7XHJcblx0XHRzcGVjLnN1cHBvcnRzID0ge307XHJcblx0fVxyXG5cdGlmICghc3BlYy5mb2N1c1RhcmdldFJlZikge1xyXG5cdFx0c3BlYy5mb2N1c1RhcmdldFJlZiA9ICdmb2N1c1RhcmdldCc7XHJcblx0fVxyXG5cdHJldHVybiBzcGVjO1xyXG59XHJcblxyXG52YXIgQmFzZSA9IG1vZHVsZS5leHBvcnRzLkJhc2UgPSB7XHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhZG1pblBhdGg6IEtleXN0b25lLmFkbWluUGF0aCxcclxuXHRcdFx0aW5wdXRQcm9wczoge30sXHJcblx0XHRcdGxhYmVsUHJvcHM6IHt9LFxyXG5cdFx0XHR2YWx1ZVByb3BzOiB7fSxcclxuXHRcdFx0c2l6ZTogJ2Z1bGwnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldElucHV0TmFtZSAocGF0aCkge1xyXG5cdFx0Ly8gVGhpcyBjb3JyZWN0bHkgY3JlYXRlcyB0aGUgcGF0aCBmb3IgZmllbGQgaW5wdXRzLCBhbmQgc3VwcG9ydHMgdGhlXHJcblx0XHQvLyBpbnB1dE5hbWVQcmVmaXggcHJvcCB0aGF0IGlzIHJlcXVpcmVkIGZvciBuZXN0ZWQgZmllbGRzIHRvIHdvcmtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmlucHV0TmFtZVByZWZpeFxyXG5cdFx0XHQ/IGAke3RoaXMucHJvcHMuaW5wdXROYW1lUHJlZml4fVske3BhdGh9XWBcclxuXHRcdFx0OiBwYXRoO1xyXG5cdH0sXHJcblx0dmFsdWVDaGFuZ2VkIChldmVudCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvdWxkQ29sbGFwc2UgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWU7XHJcblx0fSxcclxuXHRzaG91bGRSZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5tb2RlID09PSAnY3JlYXRlJykgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gIXRoaXMucHJvcHMubm9lZGl0O1xyXG5cdH0sXHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlZnNbdGhpcy5zcGVjLmZvY3VzVGFyZ2V0UmVmXSkgcmV0dXJuO1xyXG5cdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzW3RoaXMuc3BlYy5mb2N1c1RhcmdldFJlZl0pLmZvY3VzKCk7XHJcblx0fSxcclxuXHRyZW5kZXJOb3RlICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5ub3RlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gPEZvcm1Ob3RlIGh0bWw9e3RoaXMucHJvcHMubm90ZX0gLz47XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRjb25zdCB7IGF1dG9Gb2N1cywgdmFsdWUsIGlucHV0UHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IHsuLi57XHJcblx0XHRcdFx0Li4uaW5wdXRQcm9wcyxcclxuXHRcdFx0XHRhdXRvRm9jdXMsXHJcblx0XHRcdFx0YXV0b0NvbXBsZXRlOiAnb2ZmJyxcclxuXHRcdFx0XHRuYW1lOiB0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpLFxyXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnZhbHVlQ2hhbmdlZCxcclxuXHRcdFx0XHRyZWY6ICdmb2N1c1RhcmdldCcsXHJcblx0XHRcdFx0dmFsdWUsXHJcblx0XHRcdH19IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIDxGb3JtSW5wdXQgbm9lZGl0Pnt0aGlzLnByb3BzLnZhbHVlfTwvRm9ybUlucHV0PjtcclxuXHR9LFxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdHZhciB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcclxuXHRcdFx0J2ZpZWxkLXR5cGUtJyArIHRoaXMucHJvcHMudHlwZSxcclxuXHRcdFx0dGhpcy5wcm9wcy5jbGFzc05hbWUsXHJcblx0XHRcdHsgJ2ZpZWxkLW1vbm9zcGFjZSc6IHRoaXMucHJvcHMubW9ub3NwYWNlIH1cclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGh0bWxGb3I9e3RoaXMucHJvcHMucGF0aH0gbGFiZWw9e3RoaXMucHJvcHMubGFiZWx9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzTmFtZX0gY3JvcExhYmVsPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnRm9ybUZpZWxkX19pbm5lciBmaWVsZC1zaXplLScgKyB0aGlzLnByb3BzLnNpemV9PlxyXG5cdFx0XHRcdFx0e3RoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSA/IHRoaXMucmVuZGVyRmllbGQoKSA6IHRoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJOb3RlKCl9XHJcblx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59O1xyXG5cclxudmFyIE1peGlucyA9IG1vZHVsZS5leHBvcnRzLk1peGlucyA9IHtcclxuXHRDb2xsYXBzZToge1xyXG5cdFx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0aXNDb2xsYXBzZWQ6IHRoaXMuc2hvdWxkQ29sbGFwc2UoKSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG5cdFx0XHRpZiAocHJldlN0YXRlLmlzQ29sbGFwc2VkICYmICF0aGlzLnN0YXRlLmlzQ29sbGFwc2VkKSB7XHJcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dW5jb2xsYXBzZSAoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGlzQ29sbGFwc2VkOiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyQ29sbGFwc2UgKCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxDb2xsYXBzZWRGaWVsZExhYmVsIG9uQ2xpY2s9e3RoaXMudW5jb2xsYXBzZX0+KyBBZGQge3RoaXMucHJvcHMubGFiZWwudG9Mb3dlckNhc2UoKX08L0NvbGxhcHNlZEZpZWxkTGFiZWw+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiAoc3BlYykge1xyXG5cclxuXHRzcGVjID0gdmFsaWRhdGVTcGVjKHNwZWMpO1xyXG5cclxuXHR2YXIgZmllbGQgPSB7XHJcblx0XHRzcGVjOiBzcGVjLFxyXG5cdFx0ZGlzcGxheU5hbWU6IHNwZWMuZGlzcGxheU5hbWUsXHJcblx0XHRtaXhpbnM6IFtNaXhpbnMuQ29sbGFwc2VdLFxyXG5cdFx0c3RhdGljczoge1xyXG5cdFx0XHRnZXREZWZhdWx0VmFsdWU6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cdFx0XHRcdHJldHVybiBmaWVsZC5kZWZhdWx0VmFsdWUgfHwgJyc7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyICgpIHtcclxuXHRcdFx0aWYgKHRoaXMucHJvcHMuaGlkZGVuKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFldmFsRGVwZW5kc09uKHRoaXMucHJvcHMuZGVwZW5kc09uLCB0aGlzLnByb3BzLnZhbHVlcykpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnJlbmRlckNvbGxhcHNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVUkoKTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0aWYgKHNwZWMuc3RhdGljcykge1xyXG5cdFx0T2JqZWN0LmFzc2lnbihmaWVsZC5zdGF0aWNzLCBzcGVjLnN0YXRpY3MpO1xyXG5cdH1cclxuXHJcblx0dmFyIGV4Y2x1ZGVCYXNlTWV0aG9kcyA9IHt9O1xyXG5cdGlmIChzcGVjLm1peGlucykge1xyXG5cdFx0c3BlYy5taXhpbnMuZm9yRWFjaChmdW5jdGlvbiAobWl4aW4pIHtcclxuXHRcdFx0T2JqZWN0LmtleXMobWl4aW4pLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdFx0XHRpZiAoQmFzZVtuYW1lXSkge1xyXG5cdFx0XHRcdFx0ZXhjbHVkZUJhc2VNZXRob2RzW25hbWVdID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRPYmplY3QuYXNzaWduKGZpZWxkLCBibGFja2xpc3QoQmFzZSwgZXhjbHVkZUJhc2VNZXRob2RzKSk7XHJcblx0T2JqZWN0LmFzc2lnbihmaWVsZCwgYmxhY2tsaXN0KHNwZWMsICdtaXhpbnMnLCAnc3RhdGljcycpKTtcclxuXHJcblx0aWYgKEFycmF5LmlzQXJyYXkoc3BlYy5taXhpbnMpKSB7XHJcblx0XHRmaWVsZC5taXhpbnMgPSBmaWVsZC5taXhpbnMuY29uY2F0KHNwZWMubWl4aW5zKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBSZWFjdC5jcmVhdGVDbGFzcyhmaWVsZCk7XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DaGVja2JveCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgQm9vbGVhbkNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Jvb2xlYW5Db2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgdHJ1bmNhdGU9e2ZhbHNlfSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0PENoZWNrYm94IHJlYWRvbmx5IGNoZWNrZWQ9e3RoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF19IC8+XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJvb2xlYW5Db2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NoZWNrYm94JztcclxuaW1wb3J0IHsgRm9ybUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgTk9PUCA9ICgpID0+IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnQm9vbGVhbkZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnQm9vbGVhbicsXHJcblx0fSxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGluZGVudDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdH0sXHJcblxyXG5cdHZhbHVlQ2hhbmdlZCAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB2YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyRm9ybUlucHV0ICgpIHtcclxuXHRcdGlmICghdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSByZXR1cm47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHR2YWx1ZT17ISF0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdGNvbnN0IHsgaW5kZW50LCB2YWx1ZSwgbGFiZWwsIHBhdGggfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBkYXRhLWZpZWxkLW5hbWU9e3BhdGh9IGRhdGEtZmllbGQtdHlwZT1cImJvb2xlYW5cIj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkIG9mZnNldEFic2VudExhYmVsPXtpbmRlbnR9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIHN0eWxlPXt7IGhlaWdodDogJzIuM2VtJyB9fT5cclxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyRm9ybUlucHV0KCl9XHJcblx0XHRcdFx0XHRcdDxDaGVja2JveFxyXG5cdFx0XHRcdFx0XHRcdGNoZWNrZWQ9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpICYmIHRoaXMudmFsdWVDaGFuZ2VkKSB8fCBOT09QfVxyXG5cdFx0XHRcdFx0XHRcdHJlYWRvbmx5PXshdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnLjc1ZW0nIH19PlxyXG5cdFx0XHRcdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgVkFMVUVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgQ2hlY2tlZCcsIHZhbHVlOiB0cnVlIH0sXHJcblx0eyBsYWJlbDogJ0lzIE5PVCBDaGVja2VkJywgdmFsdWU6IGZhbHNlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHR2YWx1ZTogdHJ1ZSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgQm9vbGVhbkZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiA8U2VnbWVudGVkQ29udHJvbCBlcXVhbFdpZHRoU2VnbWVudHMgb3B0aW9ucz17VkFMVUVfT1BUSU9OU30gdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLnZhbHVlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gLz47XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJvb2xlYW5GaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29sdW1ucy9DbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBDbG91ZGluYXJ5SW1hZ2VDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSB8fCAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdDxDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5IGxhYmVsPVwiZGltZW5zaW9uc1wiIGltYWdlPXt2YWx1ZX0gLz5cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENsb3VkaW5hcnlJbWFnZUNvbHVtbjtcclxuIiwiLypcclxuVE9ETzogQ2xvdWRpbmFyeUltYWdlVHlwZSBhY3RhbGx5IHN1cHBvcnRzICdyZW1vdmUnIGFuZCAncmVzZXQnIGFjdGlvbnMsIGJ1dFxyXG50aGlzIGZpZWxkIHdpbGwgb25seSBzdWJtaXQgYFwiXCJgIHdoZW4gJ3JlbW92ZScgaXMgY2xpY2tlZC4gQGpvc3NtYWMgd2UgbmVlZCB0b1xyXG53b3JrIG91dCB3aGV0aGVyIHdlJ3JlIGdvaW5nIHRvIHN1cHBvcnQgZGVsZXRpbmcgdGhyb3VnaCB0aGUgVUkuXHJcbiovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgY2xvdWRpbmFyeVJlc2l6ZSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY2xvdWRpbmFyeVJlc2l6ZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybUZpZWxkLCBGb3JtSW5wdXQsIEZvcm1Ob3RlIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IEltYWdlVGh1bWJuYWlsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSW1hZ2VUaHVtYm5haWwnO1xyXG5pbXBvcnQgRmlsZUNoYW5nZU1lc3NhZ2UgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9GaWxlQ2hhbmdlTWVzc2FnZSc7XHJcbmltcG9ydCBIaWRkZW5GaWxlSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IaWRkZW5GaWxlSW5wdXQnO1xyXG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcclxuXHJcbmNvbnN0IFNVUFBPUlRFRF9UWVBFUyA9IFsnaW1hZ2UvKicsICdhcHBsaWNhdGlvbi9wZGYnLCAnYXBwbGljYXRpb24vcG9zdHNjcmlwdCddO1xyXG5jb25zdCBTVVBQT1JURURfUkVHRVggPSBuZXcgUmVnRXhwKC9eaW1hZ2VcXC98YXBwbGljYXRpb25cXC9wZGZ8YXBwbGljYXRpb25cXC9wb3N0c2NyaXB0L2cpO1xyXG5cclxubGV0IHVwbG9hZEluYyA9IDEwMDA7XHJcblxyXG5jb25zdCBidWlsZEluaXRpYWxTdGF0ZSA9IChwcm9wcykgPT4gKHtcclxuXHRyZW1vdmVFeGlzdGluZzogZmFsc2UsXHJcblx0dXBsb2FkRmllbGRQYXRoOiBgQ2xvdWRpbmFyeUltYWdlLSR7cHJvcHMucGF0aH0tJHsrK3VwbG9hZEluY31gLFxyXG5cdHVzZXJTZWxlY3RlZEZpbGU6IG51bGwsXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sbGFwc2U6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRub3RlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRwdWJsaWNfaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHJlc291cmNlX3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHNlY3VyZV91cmw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHNpZ25hdHVyZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2ZXJzaW9uOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ0Nsb3VkaW5hcnlJbWFnZScsXHJcblx0XHRnZXREZWZhdWx0VmFsdWU6ICgpID0+ICh7fSksXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIGJ1aWxkSW5pdGlhbFN0YXRlKHRoaXMucHJvcHMpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnQ2xvdWRpbmFyeUltYWdlRmllbGQgbmV4dFByb3BzOicsIG5leHRQcm9wcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMpIHtcclxuXHRcdC8vIFJlc2V0IHRoZSBhY3Rpb24gc3RhdGUgd2hlbiB0aGUgdmFsdWUgY2hhbmdlc1xyXG5cdFx0Ly8gVE9ETzogV2Ugc2hvdWxkIGFkZCBhIGNoZWNrIGZvciBhIG5ldyBpdGVtIElEIGluIHRoZSBzdG9yZVxyXG5cdFx0aWYgKHRoaXMucHJvcHMudmFsdWUucHVibGljX2lkICE9PSBuZXh0UHJvcHMudmFsdWUucHVibGljX2lkKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHJlbW92ZUV4aXN0aW5nOiBmYWxzZSxcclxuXHRcdFx0XHR1c2VyU2VsZWN0ZWRGaWxlOiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBIRUxQRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGhhc0xvY2FsICgpIHtcclxuXHRcdHJldHVybiAhIXRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZTtcclxuXHR9LFxyXG5cdGhhc0V4aXN0aW5nICgpIHtcclxuXHRcdHJldHVybiAhISh0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMucHJvcHMudmFsdWUudXJsKTtcclxuXHR9LFxyXG5cdGhhc0ltYWdlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0V4aXN0aW5nKCkgfHwgdGhpcy5oYXNMb2NhbCgpO1xyXG5cdH0sXHJcblx0Z2V0RmlsZW5hbWUgKCkge1xyXG5cdFx0Y29uc3QgeyBmb3JtYXQsIGhlaWdodCwgcHVibGljX2lkLCB3aWR0aCB9ID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlXHJcblx0XHRcdD8gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlLm5hbWVcclxuXHRcdFx0OiBgJHtwdWJsaWNfaWR9LiR7Zm9ybWF0fSAoJHt3aWR0aH3DlyR7aGVpZ2h0fSlgO1xyXG5cdH0sXHJcblx0Z2V0SW1hZ2VTb3VyY2UgKGhlaWdodCA9IDkwKSB7XHJcblx0XHQvLyBUT0RPOiBUaGlzIGxldHMgcmVhbGx5IHdpZGUgaW1hZ2VzIGJyZWFrIHRoZSBsYXlvdXRcclxuXHRcdGxldCBzcmM7XHJcblx0XHRpZiAodGhpcy5oYXNMb2NhbCgpKSB7XHJcblx0XHRcdHNyYyA9IHRoaXMuc3RhdGUuZGF0YVVyaTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5oYXNFeGlzdGluZygpKSB7XHJcblx0XHRcdHNyYyA9IGNsb3VkaW5hcnlSZXNpemUodGhpcy5wcm9wcy52YWx1ZS5wdWJsaWNfaWQsIHtcclxuXHRcdFx0XHRjcm9wOiAnZml0JyxcclxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodCxcclxuXHRcdFx0XHRmb3JtYXQ6ICdqcGcnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3JjO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIE1FVEhPRFNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0dHJpZ2dlckZpbGVCcm93c2VyICgpIHtcclxuXHRcdHRoaXMucmVmcy5maWxlSW5wdXQuY2xpY2tEb21Ob2RlKCk7XHJcblx0fSxcclxuXHRoYW5kbGVGaWxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0Y29uc3QgdXNlclNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHsgdXNlclNlbGVjdGVkRmlsZSB9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBUb2dnbGUgdGhlIGxpZ2h0Ym94XHJcblx0b3BlbkxpZ2h0Ym94IChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRsaWdodGJveElzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2xvc2VMaWdodGJveCAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bGlnaHRib3hJc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Ly8gSGFuZGxlIGltYWdlIHNlbGVjdGlvbiBpbiBmaWxlIGJyb3dzZXJcclxuXHRoYW5kbGVJbWFnZUNoYW5nZSAoZSkge1xyXG5cdFx0aWYgKCF3aW5kb3cuRmlsZVJlYWRlcikge1xyXG5cdFx0XHRyZXR1cm4gYWxlcnQoJ0ZpbGUgcmVhZGVyIG5vdCBzdXBwb3J0ZWQgYnkgYnJvd3Nlci4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XHJcblx0XHRpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcblx0XHRpZiAoIWZpbGUudHlwZS5tYXRjaChTVVBQT1JURURfUkVHRVgpKSB7XHJcblx0XHRcdHJldHVybiBhbGVydCgnVW5zdXBwb3J0ZWQgZmlsZSB0eXBlLiBTdXBwb3J0ZWQgZm9ybWF0cyBhcmU6IEdJRiwgUE5HLCBKUEcsIEJNUCwgSUNPLCBQREYsIFRJRkYsIEVQUywgUFNELCBTVkcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuXHJcblx0XHRyZWFkZXIub25sb2Fkc3RhcnQgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IHRydWUsXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdHJlYWRlci5vbmxvYWRlbmQgPSAodXBsb2FkKSA9PiB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGRhdGFVcmk6IHVwbG9hZC50YXJnZXQucmVzdWx0LFxyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHVzZXJTZWxlY3RlZEZpbGU6IGZpbGUsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgZmlsZTogZmlsZSB9KTtcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Ly8gSWYgd2UgaGF2ZSBhIGxvY2FsIGZpbGUgYWRkZWQgdGhlbiByZW1vdmUgaXQgYW5kIHJlc2V0IHRoZSBmaWxlIGZpZWxkLlxyXG5cdGhhbmRsZVJlbW92ZSAoZSkge1xyXG5cdFx0dmFyIHN0YXRlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZSkge1xyXG5cdFx0XHRzdGF0ZS51c2VyU2VsZWN0ZWRGaWxlID0gbnVsbDtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5oYXNFeGlzdGluZygpKSB7XHJcblx0XHRcdHN0YXRlLnJlbW92ZUV4aXN0aW5nID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuXHR9LFxyXG5cdHVuZG9SZW1vdmUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShidWlsZEluaXRpYWxTdGF0ZSh0aGlzLnByb3BzKSk7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gUkVOREVSRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHJlbmRlckxpZ2h0Ym94ICgpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKCF2YWx1ZSB8fCAhdmFsdWUucHVibGljX2lkKSByZXR1cm47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpZ2h0Ym94XHJcblx0XHRcdFx0Y3VycmVudEltYWdlPXswfVxyXG5cdFx0XHRcdGltYWdlcz17W3sgc3JjOiB0aGlzLmdldEltYWdlU291cmNlKDYwMCkgfV19XHJcblx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNWaXNpYmxlfVxyXG5cdFx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cclxuXHRcdFx0XHRzaG93SW1hZ2VDb3VudD17ZmFsc2V9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVySW1hZ2VQcmV2aWV3ICgpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gcmVuZGVyIGljb24gZmVlZGJhY2sgZm9yIGludGVudFxyXG5cdFx0bGV0IG1hc2s7XHJcblx0XHRpZiAodGhpcy5oYXNMb2NhbCgpKSBtYXNrID0gJ3VwbG9hZCc7XHJcblx0XHRlbHNlIGlmICh0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSBtYXNrID0gJ3JlbW92ZSc7XHJcblx0XHRlbHNlIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIG1hc2sgPSAnbG9hZGluZyc7XHJcblxyXG5cdFx0Y29uc3Qgc2hvdWxkT3BlbkxpZ2h0Ym94ID0gdmFsdWUuZm9ybWF0ICE9PSAncGRmJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SW1hZ2VUaHVtYm5haWxcclxuXHRcdFx0XHRjb21wb25lbnQ9XCJhXCJcclxuXHRcdFx0XHRocmVmPXt0aGlzLmdldEltYWdlU291cmNlKDYwMCl9XHJcblx0XHRcdFx0b25DbGljaz17c2hvdWxkT3BlbkxpZ2h0Ym94ICYmIHRoaXMub3BlbkxpZ2h0Ym94fVxyXG5cdFx0XHRcdG1hc2s9e21hc2t9XHJcblx0XHRcdFx0dGFyZ2V0PVwiX19ibGFua1wiXHJcblx0XHRcdFx0c3R5bGU9e3sgZmxvYXQ6ICdsZWZ0JywgbWFyZ2luUmlnaHQ6ICcxZW0nIH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHQ8aW1nIHNyYz17dGhpcy5nZXRJbWFnZVNvdXJjZSgpfSBzdHlsZT17eyBoZWlnaHQ6IDkwIH19IC8+XHJcblx0XHRcdDwvSW1hZ2VUaHVtYm5haWw+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyRmlsZU5hbWVBbmRPcHRpb25hbE1lc3NhZ2UgKHNob3dDaGFuZ2VNZXNzYWdlID0gZmFsc2UpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/IChcclxuXHRcdFx0XHRcdDxGaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0XHRcdFx0e3RoaXMuZ2V0RmlsZW5hbWUoKX1cclxuXHRcdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdFx0KSA6IG51bGx9XHJcblx0XHRcdFx0e3Nob3dDaGFuZ2VNZXNzYWdlICYmIHRoaXMucmVuZGVyQ2hhbmdlTWVzc2FnZSgpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDaGFuZ2VNZXNzYWdlICgpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2UgY29sb3I9XCJzdWNjZXNzXCI+XHJcblx0XHRcdFx0XHRTYXZlIHRvIFVwbG9hZFxyXG5cdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUucmVtb3ZlRXhpc3RpbmcpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2UgY29sb3I9XCJkYW5nZXJcIj5cclxuXHRcdFx0XHRcdFNhdmUgdG8gUmVtb3ZlXHJcblx0XHRcdFx0PC9GaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIE91dHB1dCBbY2FuY2VsL3JlbW92ZS91bmRvXSBidXR0b25cclxuXHRyZW5kZXJDbGVhckJ1dHRvbiAoKSB7XHJcblx0XHRjb25zdCBjbGVhclRleHQgPSB0aGlzLmhhc0xvY2FsKCkgPyAnQ2FuY2VsJyA6ICdSZW1vdmUgSW1hZ2UnO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nID8gKFxyXG5cdFx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgb25DbGljaz17dGhpcy51bmRvUmVtb3ZlfT5cclxuXHRcdFx0XHRVbmRvIFJlbW92ZVxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdCkgOiAoXHJcblx0XHRcdDxCdXR0b24gdmFyaWFudD1cImxpbmtcIiBjb2xvcj1cImNhbmNlbFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmVtb3ZlfT5cclxuXHRcdFx0XHR7Y2xlYXJUZXh0fVxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySW1hZ2VUb29sYmFyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYga2V5PXt0aGlzLnByb3BzLnBhdGggKyAnX3Rvb2xiYXInfSBjbGFzc05hbWU9XCJpbWFnZS10b29sYmFyXCI+XHJcblx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRyaWdnZXJGaWxlQnJvd3Nlcn0+XHJcblx0XHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpID8gJ0NoYW5nZScgOiAnVXBsb2FkJ30gSW1hZ2VcclxuXHRcdFx0XHQ8L0J1dHRvbj5cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpID8gdGhpcy5yZW5kZXJDbGVhckJ1dHRvbigpIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpbGVJbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEhpZGRlbkZpbGVJbnB1dFxyXG5cdFx0XHRcdGFjY2VwdD17U1VQUE9SVEVEX1RZUEVTLmpvaW4oKX1cclxuXHRcdFx0XHRyZWY9XCJmaWxlSW5wdXRcIlxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuc3RhdGUudXBsb2FkRmllbGRQYXRofVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUltYWdlQ2hhbmdlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJBY3Rpb25JbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZSB8fCB0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlXHJcblx0XHRcdFx0PyBgdXBsb2FkOiR7dGhpcy5zdGF0ZS51cGxvYWRGaWVsZFBhdGh9YFxyXG5cdFx0XHRcdDogJyc7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGlucHV0XHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdFx0dHlwZT1cImhpZGRlblwiXHJcblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdGNvbnN0IHsgbGFiZWwsIG5vdGUsIHBhdGggfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgaW1hZ2VDb250YWluZXIgPSAoXHJcblx0XHRcdDxkaXYgc3R5bGU9e3RoaXMuaGFzSW1hZ2UoKSA/IHsgbWFyZ2luQm90dG9tOiAnMWVtJyB9IDogbnVsbH0+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSAmJiB0aGlzLnJlbmRlckltYWdlUHJldmlldygpfVxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgJiYgdGhpcy5yZW5kZXJGaWxlTmFtZUFuZE9wdGlvbmFsTWVzc2FnZSh0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblxyXG5cdFx0Y29uc3QgdG9vbGJhciA9IHRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKVxyXG5cdFx0XHQ/IHRoaXMucmVuZGVySW1hZ2VUb29sYmFyKClcclxuXHRcdFx0OiA8Rm9ybUlucHV0IG5vZWRpdCAvPjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGxhYmVsPXtsYWJlbH0gY2xhc3NOYW1lPVwiZmllbGQtdHlwZS1jbG91ZGluYXJ5aW1hZ2VcIiBodG1sRm9yPXtwYXRofT5cclxuXHRcdFx0XHR7aW1hZ2VDb250YWluZXJ9XHJcblx0XHRcdFx0e3Rvb2xiYXJ9XHJcblx0XHRcdFx0eyEhbm90ZSAmJiA8Rm9ybU5vdGUgbm90ZT17bm90ZX0gLz59XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTGlnaHRib3goKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJGaWxlSW5wdXQoKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBY3Rpb25JbnB1dCgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBTZWdtZW50ZWRDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgU2V0JywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIFNldCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZXhpc3RzOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBDbG91ZGluYXJ5SW1hZ2VGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGV4aXN0czogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHRvZ2dsZUV4aXN0cyAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBleGlzdHM6IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlRXhpc3RzfVxyXG5cdFx0XHRcdG9wdGlvbnM9e09QVElPTlN9XHJcblx0XHRcdFx0dmFsdWU9e2ZpbHRlci5leGlzdHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBEYXRlQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUNvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0bGlua1RvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0VmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgZm9ybWF0ID0gKHRoaXMucHJvcHMuY29sLnR5cGUgPT09ICdkYXRldGltZScpID8gJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyA6ICdNTU1NIERvIFlZWVknO1xyXG5cdFx0cmV0dXJuIG1vbWVudCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfSB0bz17dGhpcy5wcm9wcy5saW5rVG99IGVtcHR5PXtlbXB0eX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlQ29sdW1uO1xyXG4iLCJpbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGF0ZUlucHV0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuLypcclxuVE9ETzogSW1wbGVtZW50IHllYXJSYW5nZSBQcm9wLCBvciBkZXByZWNhdGUgZm9yIG1heCAvIG1pbiB2YWx1ZXMgKGJldHRlcilcclxuKi9cclxuXHJcbmNvbnN0IERFRkFVTFRfSU5QVVRfRk9STUFUID0gJ1lZWVktTU0tREQnO1xyXG5jb25zdCBERUZBVUxUX0ZPUk1BVF9TVFJJTkcgPSAnRG8gTU1NIFlZWVknO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRGF0ZScsXHJcblx0fSxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZvcm1hdFN0cmluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGlucHV0Rm9ybWF0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRub3RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmc6IERFRkFVTFRfRk9STUFUX1NUUklORyxcclxuXHRcdFx0aW5wdXRGb3JtYXQ6IERFRkFVTFRfSU5QVVRfRk9STUFULFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHZhbHVlQ2hhbmdlZCAoeyB2YWx1ZSB9KSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHRvTW9tZW50ICh2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuaXNVVEMpIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudC51dGModmFsdWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG1vbWVudCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc1ZhbGlkICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMudG9Nb21lbnQodmFsdWUsIHRoaXMuaW5wdXRGb3JtYXQpLmlzVmFsaWQoKTtcclxuXHR9LFxyXG5cdGZvcm1hdCAodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZSA/IHRoaXMudG9Nb21lbnQodmFsdWUpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdFN0cmluZykgOiAnJztcclxuXHR9LFxyXG5cdHNldFRvZGF5ICgpIHtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2VkKHtcclxuXHRcdFx0dmFsdWU6IHRoaXMudG9Nb21lbnQobmV3IERhdGUoKSkuZm9ybWF0KHRoaXMucHJvcHMuaW5wdXRGb3JtYXQpLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdD5cclxuXHRcdFx0XHR7dGhpcy5mb3JtYXQodGhpcy5wcm9wcy52YWx1ZSl9XHJcblx0XHRcdDwvRm9ybUlucHV0PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdHZhciBkYXRlQXNNb21lbnQgPSB0aGlzLnRvTW9tZW50KHRoaXMucHJvcHMudmFsdWUpO1xyXG5cdFx0dmFyIHZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZSAmJiBkYXRlQXNNb21lbnQuaXNWYWxpZCgpXHJcblx0XHRcdD8gZGF0ZUFzTW9tZW50LmZvcm1hdCh0aGlzLnByb3BzLmlucHV0Rm9ybWF0KVxyXG5cdFx0XHQ6IHRoaXMucHJvcHMudmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8RGF0ZUlucHV0XHJcblx0XHRcdFx0XHRcdGZvcm1hdD17dGhpcy5wcm9wcy5pbnB1dEZvcm1hdH1cclxuXHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdFx0XHRyZWY9XCJkYXRlSW5wdXRcIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5zZXRUb2RheX0+VG9kYXk8L0J1dHRvbj5cclxuXHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBEYXlQaWNrZXIgZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnB1dCxcclxuXHRGb3JtU2VsZWN0LFxyXG5cdEdyaWQsXHJcblx0U2VnbWVudGVkQ29udHJvbCxcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBJTlZFUlRFRF9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdNYXRjaGVzJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ0RvZXMgTk9UIE1hdGNoJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmNvbnN0IE1PREVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnT24nLCB2YWx1ZTogJ29uJyB9LFxyXG5cdHsgbGFiZWw6ICdBZnRlcicsIHZhbHVlOiAnYWZ0ZXInIH0sXHJcblx0eyBsYWJlbDogJ0JlZm9yZScsIHZhbHVlOiAnYmVmb3JlJyB9LFxyXG5cdHsgbGFiZWw6ICdCZXR3ZWVuJywgdmFsdWU6ICdiZXR3ZWVuJyB9LFxyXG5dO1xyXG5cclxuY29uc3QgRGF5UGlja2VySW5kaWNhdG9yID0gKHsgYWN0aXZlSW5wdXRGaWVsZCB9KSA9PiB7XHJcblx0Y29uc3Qgc3R5bGUgPSBhY3RpdmVJbnB1dEZpZWxkID09PSAnYmVmb3JlJyA/IHsgbGVmdDogJzExcmVtJyB9IDogbnVsbDtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JcIiBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19ib3JkZXJcIiAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19iZ1wiIC8+XHJcblx0XHQ8L3NwYW4+XHJcblx0KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1vZGU6IE1PREVfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHRcdGJlZm9yZTogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdFx0YWZ0ZXI6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgRGF0ZUZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVGaWx0ZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRtb2RlOiBQcm9wVHlwZXMub25lT2YoTU9ERV9PUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdFx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sZWFuLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXQ6ICdERC1NTS1ZWVlZJyxcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdFx0dmFsdWU6IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhY3RpdmVJbnB1dEZpZWxkOiAnYWZ0ZXInLFxyXG5cdFx0XHRtb250aDogbmV3IERhdGUoKSwgLy8gVGhlIG1vbnRoIHRvIGRpc3BsYXkgaW4gdGhlIGNhbGVuZGFyXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5fX2lzTW91bnRlZCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR0aGlzLl9faXNNb3VudGVkID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTUVUSE9EU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkOiB2YWx1ZSB9KTtcclxuXHRcdHRoaXMuc2V0Rm9jdXModGhpcy5wcm9wcy5maWx0ZXIubW9kZSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHR0aGlzLnNldEZvY3VzKG1vZGUpO1xyXG5cdH0sXHJcblx0c2V0Rm9jdXMgKG1vZGUpIHtcclxuXHRcdC8vIGdpdmUgdGhlIFVJIGEgbW9tZW50IHRvIHJlbmRlclxyXG5cdFx0aWYgKG1vZGUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbdGhpcy5zdGF0ZS5hY3RpdmVJbnB1dEZpZWxkXSkuZm9jdXMoKTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XHJcblx0XHRcdH0sIDUwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChlKSB7XHJcblx0XHQvLyBUT0RPIEBqZWR3YXRzb25cclxuXHRcdC8vIEVudGVyaW5nIHZpcnR1YWxseSBhbnkgdmFsdWUgd2lsbCByZXR1cm4gYW4gXCJJbnZhbGlkIGRhdGVcIiwgc28gSSdtXHJcblx0XHQvLyB0ZW1wb3JhcmlseSBkaXNhYmxpbmcgdXNlciBlbnRyeS4gVGhpcyBlbnRpcmUgY29tcG9uZW50IG5lZWRzIHJldmlldy5cclxuXHJcblx0XHQvLyBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuXHRcdC8vIGxldCB7IG1vbnRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Ly8gLy8gQ2hhbmdlIHRoZSBjdXJyZW50IG1vbnRoIG9ubHkgaWYgdGhlIHZhbHVlIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgYSB2YWxpZFxyXG5cdFx0Ly8gLy8gZGF0ZSwgYWNjb3JkaW5nIHRvIHRoZSBgTGAgZm9ybWF0XHJcblx0XHQvLyBpZiAobW9tZW50KHZhbHVlLCAnTCcsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0Ly8gXHRtb250aCA9IG1vbWVudCh2YWx1ZSwgJ0wnKS50b0RhdGUoKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0Ly8gdGhpcy5zZXRTdGF0ZSh7IG1vbnRoIH0sIHRoaXMuc2hvd0N1cnJlbnREYXRlKTtcclxuXHR9LFxyXG5cdHNldEFjdGl2ZUZpZWxkIChmaWVsZCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGFjdGl2ZUlucHV0RmllbGQ6IGZpZWxkLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzd2l0Y2hCZXR3ZWVuQWN0aXZlSW5wdXRGaWVsZHMgKGUsIGRheSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgYWN0aXZlSW5wdXRGaWVsZCB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IHNlbmQgPSB7fTtcclxuXHRcdGNvbnN0IG5ld0FjdGl2ZUZpZWxkID0gYWN0aXZlSW5wdXRGaWVsZCA9PT0gJ2JlZm9yZSdcclxuXHRcdFx0PyAnYWZ0ZXInXHJcblx0XHRcdDogJ2JlZm9yZSc7XHJcblx0XHRzZW5kW2FjdGl2ZUlucHV0RmllbGRdID0gZGF5O1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoc2VuZCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKFxyXG5cdFx0XHR7IGFjdGl2ZUlucHV0RmllbGQ6IG5ld0FjdGl2ZUZpZWxkIH0sXHJcblx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbbmV3QWN0aXZlRmllbGRdKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0c2VsZWN0RGF5IChlLCBkYXksIG1vZGlmaWVycykge1xyXG5cdFx0aWYgKG1vZGlmaWVycyAmJiBtb2RpZmllcnMuZGlzYWJsZWQpIHJldHVybjtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IGRheSB9KTtcclxuXHR9LFxyXG5cdHNob3dDdXJyZW50RGF0ZSAoKSB7XHJcblx0XHQvLyBnaXZlIHRoZSBVSSBhIG1vbWVudCB0byByZW5kZXJcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZnMuZGF5cGlja2VyLnNob3dNb250aCh0aGlzLnN0YXRlLm1vbnRoKTtcclxuXHRcdH0sIDUwKTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBSRU5ERVJFUlNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0cmVuZGVyVG9nZ2xlICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0b3B0aW9ucz17SU5WRVJURURfT1BUSU9OU31cclxuXHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQ29udHJvbHMgKCkge1xyXG5cdFx0bGV0IGNvbnRyb2xzO1xyXG5cdFx0Y29uc3QgeyBhY3RpdmVJbnB1dEZpZWxkIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyBpcyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0Ly8gRGF5UGlja2VyIE1vZGlmaWVycyAtIFNlbGVjdGVkIERheVxyXG5cdFx0bGV0IG1vZGlmaWVycyA9IGZpbHRlci5tb2RlID09PSAnYmV0d2VlbicgPyB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyW2FjdGl2ZUlucHV0RmllbGRdKS5pc1NhbWUoZGF5KSxcclxuXHRcdH0gOiB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyLnZhbHVlKS5pc1NhbWUoZGF5KSxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1vZGUudmFsdWUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8R3JpZC5Sb3cgeHNtYWxsPVwib25lLWhhbGZcIiBndXR0ZXI9ezEwfT5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZWY9XCJhZnRlclwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiRnJvbVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUZpZWxkKCdhZnRlcicpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci5hZnRlcikuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZj1cImJlZm9yZVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiVG9cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0b25Gb2N1cz17KCkgPT4gdGhpcy5zZXRBY3RpdmVGaWVsZCgnYmVmb3JlJyl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLmJlZm9yZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0PC9HcmlkLlJvdz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG1vZGlmaWVycz17bW9kaWZpZXJzfVxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIkRheVBpY2tlci0tY2hyb21lXCJcclxuXHRcdFx0XHRcdFx0XHRvbkRheUNsaWNrPXt0aGlzLnN3aXRjaEJldHdlZW5BY3RpdmVJbnB1dEZpZWxkc31cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlckluZGljYXRvciBhY3RpdmVJbnB1dEZpZWxkPXthY3RpdmVJbnB1dEZpZWxkfSAvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwiaW5wdXRcIlxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci52YWx1ZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLnNob3dDdXJyZW50RGF0ZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdHJlZj1cImRheXBpY2tlclwiXHJcblx0XHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiRGF5UGlja2VyLS1jaHJvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuc2VsZWN0RGF5fVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VySW5kaWNhdG9yIC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29udHJvbHM7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVG9nZ2xlKCl9XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQ29udHJvbHMoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlRmlsdGVyO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUNvbHVtbicpO1xyXG4iLCJpbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGF0ZUlucHV0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1Ob3RlLFxyXG5cdElubGluZUdyb3VwIGFzIEdyb3VwLFxyXG5cdElubGluZUdyb3VwU2VjdGlvbiBhcyBTZWN0aW9uLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdEYXRldGltZUZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRGF0ZXRpbWUnLFxyXG5cdH0sXHJcblxyXG5cdGZvY3VzVGFyZ2V0UmVmOiAnZGF0ZUlucHV0JyxcclxuXHJcblx0Ly8gZGVmYXVsdCBpbnB1dCBmb3JtYXRzXHJcblx0ZGF0ZUlucHV0Rm9ybWF0OiAnWVlZWS1NTS1ERCcsXHJcblx0dGltZUlucHV0Rm9ybWF0OiAnaDptbTpzcyBhJyxcclxuXHR0ek9mZnNldElucHV0Rm9ybWF0OiAnWicsXHJcblxyXG5cdC8vIHBhcnNlIGZvcm1hdHMgKGR1cGxpY2F0ZWQgZnJvbSBsaWIvZmllbGRUeXBlcy9kYXRldGltZS5qcylcclxuXHRwYXJzZUZvcm1hdHM6IFsnWVlZWS1NTS1ERCcsICdZWVlZLU1NLUREIGg6bTpzIGEnLCAnWVlZWS1NTS1ERCBoOm0gYScsICdZWVlZLU1NLUREIEg6bTpzJywgJ1lZWVktTU0tREQgSDptJ10sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkYXRlVmFsdWU6IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5tb21lbnQodGhpcy5wcm9wcy52YWx1ZSkuZm9ybWF0KHRoaXMuZGF0ZUlucHV0Rm9ybWF0KSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMubW9tZW50KHRoaXMucHJvcHMudmFsdWUpLmZvcm1hdCh0aGlzLnRpbWVJbnB1dEZvcm1hdCksXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUgPyB0aGlzLm1vbWVudCh0aGlzLnByb3BzLnZhbHVlKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KSA6IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmc6ICdEbyBNTU0gWVlZWSwgaDptbTpzcyBhJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0bW9tZW50ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmlzVVRDKSByZXR1cm4gbW9tZW50LnV0Yy5hcHBseShtb21lbnQsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlIHJldHVybiBtb21lbnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgaXNWYWxpZCgpIHNvIHdlIGNhbiBzaGFyZSB3aXRoIHNlcnZlci1zaWRlIGNvZGVcclxuXHRpc1ZhbGlkICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHZhbHVlLCB0aGlzLnBhcnNlRm9ybWF0cykuaXNWYWxpZCgpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgZm9ybWF0KCkgc28gd2UgY2FuIHNoYXJlIHdpdGggc2VydmVyLXNpZGUgY29kZVxyXG5cdGZvcm1hdCAodmFsdWUsIGZvcm1hdCkge1xyXG5cdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuZGF0ZUlucHV0Rm9ybWF0ICsgJyAnICsgdGhpcy50aW1lSW5wdXRGb3JtYXQ7XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB0aGlzLm1vbWVudCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCkgOiAnJztcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVDaGFuZ2UgKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKSB7XHJcblx0XHR2YXIgdmFsdWUgPSBkYXRlVmFsdWUgKyAnICcgKyB0aW1lVmFsdWU7XHJcblx0XHR2YXIgZGF0ZXRpbWVGb3JtYXQgPSB0aGlzLmRhdGVJbnB1dEZvcm1hdCArICcgJyArIHRoaXMudGltZUlucHV0Rm9ybWF0O1xyXG5cclxuXHRcdC8vIGlmIHRoZSBjaGFuZ2UgaW5jbHVkZWQgYSB0aW1lem9uZSBvZmZzZXQsIGluY2x1ZGUgdGhhdCBpbiB0aGUgY2FsY3VsYXRpb24gKHNvIE5PVyB3b3JrcyBjb3JyZWN0bHkgZHVyaW5nIERTVCBjaGFuZ2VzKVxyXG5cdFx0aWYgKHR5cGVvZiB0ek9mZnNldFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR2YWx1ZSArPSAnICcgKyB0ek9mZnNldFZhbHVlO1xyXG5cdFx0XHRkYXRldGltZUZvcm1hdCArPSAnICcgKyB0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHQvLyBpZiBub3QsIGNhbGN1bGF0ZSB0aGUgdGltZXpvbmUgb2Zmc2V0IGJhc2VkIG9uIHRoZSBkYXRlIChyZXNwZWN0IGRpZmZlcmVudCBEU1QgdmFsdWVzKVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyB0ek9mZnNldFZhbHVlOiB0aGlzLm1vbWVudCh2YWx1ZSwgZGF0ZXRpbWVGb3JtYXQpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmlzVmFsaWQodmFsdWUpID8gdGhpcy5tb21lbnQodmFsdWUsIGRhdGV0aW1lRm9ybWF0KS50b0lTT1N0cmluZygpIDogbnVsbCxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGRhdGVDaGFuZ2VkICh7IHZhbHVlIH0pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBkYXRlVmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIHRoaXMuc3RhdGUudGltZVZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHR0aW1lQ2hhbmdlZCAoZXZ0KSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgdGltZVZhbHVlOiBldnQudGFyZ2V0LnZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlVmFsdWUsIGV2dC50YXJnZXQudmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHNldE5vdyAoKSB7XHJcblx0XHR2YXIgZGF0ZVZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy5kYXRlSW5wdXRGb3JtYXQpO1xyXG5cdFx0dmFyIHRpbWVWYWx1ZSA9IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudGltZUlucHV0Rm9ybWF0KTtcclxuXHRcdHZhciB0ek9mZnNldFZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRkYXRlVmFsdWU6IGRhdGVWYWx1ZSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aW1lVmFsdWUsXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHR6T2Zmc2V0VmFsdWUsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJOb3RlICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5ub3RlKSByZXR1cm4gbnVsbDtcclxuXHRcdHJldHVybiA8Rm9ybU5vdGUgbm90ZT17dGhpcy5wcm9wcy5ub3RlfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHR2YXIgaW5wdXQ7XHJcblx0XHRpZiAodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSB7XHJcblx0XHRcdGlucHV0ID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHRcdFx0PERhdGVJbnB1dFxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0PXt0aGlzLmRhdGVJbnB1dEZvcm1hdH1cclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMuZGF0ZSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5kYXRlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlZj1cImRhdGVJbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5kYXRlVmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLnRpbWUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudGltZUNoYW5nZWR9XHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkhIOk1NOlNTIGFtL3BtXCJcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnRpbWVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5zZXROb3d9Pk5vdzwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdFx0PGlucHV0XHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMudHpPZmZzZXQpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudHpPZmZzZXRWYWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnB1dCA9IChcclxuXHRcdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdD5cclxuXHRcdFx0XHRcdHt0aGlzLmZvcm1hdCh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdFN0cmluZyl9XHJcblx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGxhYmVsPXt0aGlzLnByb3BzLmxhYmVsfSBjbGFzc05hbWU9XCJmaWVsZC10eXBlLWRhdGV0aW1lXCIgaHRtbEZvcj17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX0+XHJcblx0XHRcdFx0e2lucHV0fVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUZpbHRlcicpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEVtYWlsQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRW1haWxDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXsnbWFpbHRvOicgKyB2YWx1ZX0gcGFkZGVkIGV4dGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVtYWlsQ29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vKlxyXG5cdFRPRE86XHJcblx0LSBncmF2YXRhclxyXG5cdC0gdmFsaWRhdGUgZW1haWwgYWRkcmVzc1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ0VtYWlsRmllbGQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRW1haWwnLFxyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdHR5cGU9XCJlbWFpbFwiXHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMudmFsdWUgPyAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IGNvbXBvbmVudD1cImFcIiBocmVmPXsnbWFpbHRvOicgKyB0aGlzLnByb3BzLnZhbHVlfT5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHQpIDogKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdCAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgTnVtYmVyQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnTnVtYmVyQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRsZXQgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSB8fCBpc05hTih2YWx1ZSkpIHZhbHVlID0gMC4wMDtcclxuXHJcblx0XHRjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9ICh0aGlzLnByb3BzLmNvbC5wYXRoID09PSAnbW9uZXknKSA/IG51bWVyYWwodmFsdWUpLmZvcm1hdCgnJDAsMC4wMCcpIDogdmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXJDb2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ051bWJlckZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnTnVtYmVyJyxcclxuXHR9LFxyXG5cdHZhbHVlQ2hhbmdlZCAoZXZlbnQpIHtcclxuXHRcdHZhciBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuXHRcdGlmICgvXi0/XFxkKlxcLj9cXGQqJC8udGVzdChuZXdWYWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHRcdHZhbHVlOiBuZXdWYWx1ZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7XHJcblx0Rm9ybSxcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1TZWxlY3QsXHJcblx0R3JpZCxcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBNT0RFX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0V4YWN0bHknLCB2YWx1ZTogJ2VxdWFscycgfSxcclxuXHR7IGxhYmVsOiAnR3JlYXRlciBUaGFuJywgdmFsdWU6ICdndCcgfSxcclxuXHR7IGxhYmVsOiAnTGVzcyBUaGFuJywgdmFsdWU6ICdsdCcgfSxcclxuXHR7IGxhYmVsOiAnQmV0d2VlbicsIHZhbHVlOiAnYmV0d2VlbicgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1vZGU6IE1PREVfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdHZhbHVlOiAnJyxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgTnVtYmVyRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdC8vIGZvY3VzIHRoZSB0ZXh0IGlucHV0XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlQ2hhbmdlQnVpbGRlciAodHlwZSkge1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ2hhbmdlIChlKSB7XHJcblx0XHRcdGNvbnN0IHsgZmlsdGVyLCBvbkNoYW5nZSB9ID0gc2VsZi5wcm9wcztcclxuXHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ21pblZhbHVlJzpcclxuXHRcdFx0XHRcdG9uQ2hhbmdlKHtcclxuXHRcdFx0XHRcdFx0bW9kZTogZmlsdGVyLm1vZGUsXHJcblx0XHRcdFx0XHRcdHZhbHVlOiB7XHJcblx0XHRcdFx0XHRcdFx0bWluOiBlLnRhcmdldC52YWx1ZSxcclxuXHRcdFx0XHRcdFx0XHRtYXg6IGZpbHRlci52YWx1ZS5tYXgsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ21heFZhbHVlJzpcclxuXHRcdFx0XHRcdG9uQ2hhbmdlKHtcclxuXHRcdFx0XHRcdFx0bW9kZTogZmlsdGVyLm1vZGUsXHJcblx0XHRcdFx0XHRcdHZhbHVlOiB7XHJcblx0XHRcdFx0XHRcdFx0bWluOiBmaWx0ZXIudmFsdWUubWluLFxyXG5cdFx0XHRcdFx0XHRcdG1heDogZS50YXJnZXQudmFsdWUsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3ZhbHVlJzpcclxuXHRcdFx0XHRcdG9uQ2hhbmdlKHtcclxuXHRcdFx0XHRcdFx0bW9kZTogZmlsdGVyLm1vZGUsXHJcblx0XHRcdFx0XHRcdHZhbHVlOiBlLnRhcmdldC52YWx1ZSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Ly8gVXBkYXRlIHRoZSBwcm9wcyB3aXRoIHRoaXMucHJvcHMub25DaGFuZ2VcclxuXHR1cGRhdGVGaWx0ZXIgKGNoYW5nZWRQcm9wKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLmNoYW5nZWRQcm9wIH0pO1xyXG5cdH0sXHJcblx0Ly8gVXBkYXRlIHRoZSBmaWx0ZXIgbW9kZVxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZTogZS50YXJnZXQudmFsdWUgfSk7XHJcblxyXG5cdFx0Ly8gZm9jdXMgb24gbmV4dCB0aWNrXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzLmZvY3VzVGFyZ2V0KS5mb2N1cygpO1xyXG5cdFx0fSwgMCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQ29udHJvbHMgKG1vZGUpIHtcclxuXHRcdGxldCBjb250cm9scztcclxuXHRcdGNvbnN0IHsgZmllbGQgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyBpcyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0aWYgKG1vZGUudmFsdWUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8R3JpZC5Sb3cgeHNtYWxsPVwib25lLWhhbGZcIiBndXR0ZXI9ezEwfT5cclxuXHRcdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZUJ1aWxkZXIoJ21pblZhbHVlJyl9XHJcblx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJNaW4uXCJcclxuXHRcdFx0XHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdFx0PEdyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlQnVpbGRlcignbWF4VmFsdWUnKX1cclxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk1heC5cIlxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIlxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHQ8L0dyaWQuUm93PlxyXG5cdFx0XHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29udHJvbHMgPSAoXHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlQnVpbGRlcigndmFsdWUnKX1cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIlxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNvbnRyb2xzO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IG1vZGUgPSBNT0RFX09QVElPTlMuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gZmlsdGVyLm1vZGUpWzBdO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtIGNvbXBvbmVudD1cImRpdlwiPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8Rm9ybVNlbGVjdFxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtNT0RFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXttb2RlLnZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb250cm9scyhtb2RlKX1cclxuXHRcdFx0PC9Gb3JtPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlckZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBQYXNzd29yZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRyZXR1cm4gdmFsdWUgPyAnKioqKioqKionIDogJyc7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3N3b3JkQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdQYXNzd29yZCcsXHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHBhc3N3b3JkSXNTZXQ6IHRoaXMucHJvcHMudmFsdWUgPyB0cnVlIDogZmFsc2UsXHJcblx0XHRcdHNob3dDaGFuZ2VVSTogdGhpcy5wcm9wcy5tb2RlID09PSAnY3JlYXRlJyA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0cGFzc3dvcmQ6ICcnLFxyXG5cdFx0XHRjb25maXJtOiAnJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh3aGljaCwgZXZlbnQpIHtcclxuXHRcdHZhciBuZXdTdGF0ZSA9IHt9O1xyXG5cdFx0bmV3U3RhdGVbd2hpY2hdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0NoYW5nZVVJICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IHRydWUsXHJcblx0XHR9LCAoKSA9PiB0aGlzLmZvY3VzKCkpO1xyXG5cdH0sXHJcblxyXG5cdG9uQ2FuY2VsICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IGZhbHNlLFxyXG5cdFx0fSwgKCkgPT4gdGhpcy5mb2N1cygpKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gPEZvcm1JbnB1dCBub2VkaXQ+e3RoaXMucHJvcHMudmFsdWUgPyAnUGFzc3dvcmQgU2V0JyA6ICcnfTwvRm9ybUlucHV0PjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zaG93Q2hhbmdlVUkgPyB0aGlzLnJlbmRlckZpZWxkcygpIDogdGhpcy5yZW5kZXJDaGFuZ2VCdXR0b24oKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZHMgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIGJsb2NrPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMsICdwYXNzd29yZCcpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk5ldyBwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLmNvbmZpcm0pfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWQuYmluZCh0aGlzLCAnY29uZmlybScpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkNvbmZpcm0gbmV3IHBhc3N3b3JkXCIgdmFsdWU9e3RoaXMuc3RhdGUuY29uZmlybX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdHt0aGlzLnN0YXRlLnBhc3N3b3JkSXNTZXQgPyAoXHJcblx0XHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5DYW5jZWw8L0J1dHRvbj5cclxuXHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQ2hhbmdlQnV0dG9uICgpIHtcclxuXHRcdHZhciBsYWJlbCA9IHRoaXMuc3RhdGUucGFzc3dvcmRJc1NldFxyXG5cdFx0XHQ/ICdDaGFuZ2UgUGFzc3dvcmQnXHJcblx0XHRcdDogJ1NldCBQYXNzd29yZCc7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEJ1dHRvbiByZWY9XCJmb2N1c1RhcmdldFwiIG9uQ2xpY2s9e3RoaXMuc2hvd0NoYW5nZVVJfT57bGFiZWx9PC9CdXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IFNlZ21lbnRlZENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBFWElTVFNfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgU2V0JywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIFNldCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZXhpc3RzOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBQYXNzd29yZEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZXhpc3RzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoRVhJU1RTX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHRvZ2dsZUV4aXN0cyAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBleGlzdHM6IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlRXhpc3RzfVxyXG5cdFx0XHRcdG9wdGlvbnM9e0VYSVNUU19PUFRJT05TfVxyXG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXIuZXhpc3RzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG5jb25zdCBtb3JlSW5kaWNhdG9yU3R5bGUgPSB7XHJcblx0Y29sb3I6ICcjYmJiJyxcclxuXHRmb250U2l6ZTogJy44cmVtJyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0bWFyZ2luTGVmdDogOCxcclxufTtcclxuXHJcbnZhciBSZWxhdGlvbnNoaXBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdSZWxhdGlvbnNoaXBDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlck1hbnkgKHZhbHVlKSB7XHJcblx0XHRpZiAoIXZhbHVlIHx8ICF2YWx1ZS5sZW5ndGgpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0Y29uc3QgaXRlbXMgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblx0XHRcdGlmICghdmFsdWVbaV0pIGJyZWFrO1xyXG5cdFx0XHRpZiAoaSkge1xyXG5cdFx0XHRcdGl0ZW1zLnB1c2goPHNwYW4ga2V5PXsnY29tbWEnICsgaX0+LCA8L3NwYW4+KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgaW50ZXJpb3IgdHJ1bmNhdGU9e2ZhbHNlfSBrZXk9eydhbmNob3InICsgaX0gdG89e0tleXN0b25lLmFkbWluUGF0aCArICcvJyArIHJlZkxpc3QucGF0aCArICcvJyArIHZhbHVlW2ldLmlkfT5cclxuXHRcdFx0XHRcdHt2YWx1ZVtpXS5uYW1lfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlLmxlbmd0aCA+IDMpIHtcclxuXHRcdFx0aXRlbXMucHVzaCg8c3BhbiBrZXk9XCJtb3JlXCIgc3R5bGU9e21vcmVJbmRpY2F0b3JTdHlsZX0+Wy4uLnt2YWx1ZS5sZW5ndGggLSAzfSBtb3JlXTwvc3Bhbj4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e2l0ZW1zfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAodmFsdWUpIHtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgcmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUuaWR9IHBhZGRlZCBpbnRlcmlvciBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e3ZhbHVlLm5hbWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRjb25zdCBtYW55ID0gdGhpcy5wcm9wcy5jb2wuZmllbGQubWFueTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7bWFueSA/IHRoaXMucmVuZGVyTWFueSh2YWx1ZSkgOiB0aGlzLnJlbmRlclZhbHVlKHZhbHVlKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlbGF0aW9uc2hpcENvbHVtbjtcclxuIiwiaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IHsgbGlzdHNCeUtleSB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9saXN0cyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZVZhbHVlcyAoY3VycmVudCwgbmV4dCkge1xyXG5cdGNvbnN0IGN1cnJlbnRMZW5ndGggPSBjdXJyZW50ID8gY3VycmVudC5sZW5ndGggOiAwO1xyXG5cdGNvbnN0IG5leHRMZW5ndGggPSBuZXh0ID8gbmV4dC5sZW5ndGggOiAwO1xyXG5cdGlmIChjdXJyZW50TGVuZ3RoICE9PSBuZXh0TGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50TGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChjdXJyZW50W2ldICE9PSBuZXh0W2ldKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnUmVsYXRpb25zaGlwRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdSZWxhdGlvbnNoaXAnLFxyXG5cdH0sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZSA9IHt9O1xyXG5cdFx0dGhpcy5sb2FkVmFsdWUodGhpcy5wcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAobmV4dFByb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlIHx8IG5leHRQcm9wcy5tYW55ICYmIGNvbXBhcmVWYWx1ZXModGhpcy5wcm9wcy52YWx1ZSwgbmV4dFByb3BzLnZhbHVlKSkge1xyXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMudmFsdWVzW2tleV0gIT09IG5leHRQcm9wcy52YWx1ZXNba2V5XSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBjcmVhdGVJc09wZW46IGZhbHNlLCB2YWx1ZTogbnVsbCB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sIDEwKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZFZhbHVlKG5leHRQcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvdWxkQ29sbGFwc2UgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubWFueSkge1xyXG5cdFx0XHQvLyBtYW55OnRydWUgcmVsYXRpb25zaGlwcyBoYXZlIGFuIEFycmF5IGZvciBhIHZhbHVlXHJcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlO1xyXG5cdH0sXHJcblxyXG5cdGJ1aWxkRmlsdGVycyAoKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpbHRlcnMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlWzBdID09PSAnOicpIHtcclxuXHRcdFx0XHR2YXIgZmllbGROYW1lID0gdmFsdWUuc2xpY2UoMSk7XHJcblxyXG5cdFx0XHRcdHZhciB2YWwgPSB0aGlzLnByb3BzLnZhbHVlc1tmaWVsZE5hbWVdO1xyXG5cdFx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbDtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGZpbHRlcmluZyBieSBpZCBhbmQgaXRlbSB3YXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0XHRcdGlmIChmaWVsZE5hbWUgPT09ICc6X2lkJyAmJiBLZXlzdG9uZS5pdGVtKSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJzW2tleV0gPSBLZXlzdG9uZS5pdGVtLmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmaWx0ZXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblxyXG5cdFx0Xy5mb3JFYWNoKGZpbHRlcnMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG5cdFx0XHRwYXJ0cy5wdXNoKCdmaWx0ZXJzWycgKyBrZXkgKyAnXVt2YWx1ZV09JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcmJyk7XHJcblx0fSxcclxuXHJcblx0Y2FjaGVJdGVtIChpdGVtKSB7XHJcblx0XHRpdGVtLmhyZWYgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyB0aGlzLnByb3BzLnJlZkxpc3QucGF0aCArICcvJyArIGl0ZW0uaWQ7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9LFxyXG5cclxuXHRsb2FkVmFsdWUgKHZhbHVlcykge1xyXG5cdFx0aWYgKCF2YWx1ZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHR2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiB2YWx1ZXMuc3BsaXQoJywnKTtcclxuXHRcdGNvbnN0IGNhY2hlZFZhbHVlcyA9IHZhbHVlcy5tYXAoaSA9PiB0aGlzLl9pdGVtc0NhY2hlW2ldKS5maWx0ZXIoaSA9PiBpKTtcclxuXHRcdGlmIChjYWNoZWRWYWx1ZXMubGVuZ3RoID09PSB2YWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLm1hbnkgPyBjYWNoZWRWYWx1ZXMgOiBjYWNoZWRWYWx1ZXNbMF0sXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bG9hZGluZzogdHJ1ZSxcclxuXHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHR9KTtcclxuXHRcdGFzeW5jLm1hcCh2YWx1ZXMsICh2YWx1ZSwgZG9uZSkgPT4ge1xyXG5cdFx0XHR4aHIoe1xyXG5cdFx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUgKyAnP2Jhc2ljJyxcclxuXHRcdFx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmIChlcnIgfHwgIWRhdGEpIHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0dGhpcy5jYWNoZUl0ZW0oZGF0YSk7XHJcblx0XHRcdFx0ZG9uZShlcnIsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sIChlcnIsIGV4cGFuZGVkKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5wcm9wcy5tYW55ID8gZXhwYW5kZWQgOiBleHBhbmRlZFswXSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0bG9hZE9wdGlvbnNDYWxsYmFjazoge30sXHJcblx0bG9hZE9wdGlvbnMgKGlucHV0LCBjYWxsYmFjaykge1xyXG5cdFx0Ly8gTk9URTogdGhpcyBzZWVtcyBsaWtlIHRoZSB3cm9uZyB3YXkgdG8gYWRkIG9wdGlvbnMgdG8gdGhlIFNlbGVjdFxyXG5cdFx0dGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIGlucHV0ICsgJyYnICsgZmlsdGVycyxcclxuXHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIHtcclxuXHRcdFx0XHRvcHRpb25zOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdFx0Y29tcGxldGU6IGRhdGEucmVzdWx0cy5sZW5ndGggPT09IGRhdGEuY291bnQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0b3BlbkNyZWF0ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VDcmVhdGUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGNyZWF0ZUlzT3BlbjogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvbkNyZWF0ZSAoaXRlbSkge1xyXG5cdFx0dGhpcy5jYWNoZUl0ZW0oaXRlbSk7XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnZhbHVlKSkge1xyXG5cdFx0XHQvLyBGb3IgbWFueSByZWxhdGlvbnNoaXBzLCBhcHBlbmQgdGhlIG5ldyBpdGVtIHRvIHRoZSBlbmRcclxuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5zdGF0ZS52YWx1ZS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpO1xyXG5cdFx0XHR2YWx1ZXMucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy52YWx1ZUNoYW5nZWQodmFsdWVzLmpvaW4oJywnKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0XHR0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sobnVsbCwge1xyXG5cdFx0XHRjb21wbGV0ZTogdHJ1ZSxcclxuXHRcdFx0b3B0aW9uczogT2JqZWN0LmtleXModGhpcy5faXRlbXNDYWNoZSkubWFwKChrKSA9PiB0aGlzLl9pdGVtc0NhY2hlW2tdKSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jbG9zZUNyZWF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclNlbGVjdCAobm9lZGl0KSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHsvKiBUaGlzIGlucHV0IGVsZW1lbnQgZm9vbHMgU2FmYXJpJ3MgYXV0b2NvcnJlY3QgaW4gY2VydGFpbiBzaXR1YXRpb25zIHRoYXQgY29tcGxldGVseSBicmVhayByZWFjdC1zZWxlY3QgKi99XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHpJbmRleDogLTEsIG9wYWNpdHk6IDAgfX0gdGFiSW5kZXg9XCItMVwiLz5cclxuXHRcdFx0XHR7IXRoaXMuc3RhdGUuY3JlYXRlSXNPcGVuICYmIDxTZWxlY3QuQXN5bmNcclxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnByb3BzLm1hbnl9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17bm9lZGl0fVxyXG5cdFx0XHRcdFx0bG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnN9XHJcblx0XHRcdFx0XHRsYWJlbEtleT1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdGNhY2hlPXtmYWxzZX1cclxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXHJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuXHRcdFx0XHRcdHZhbHVlS2V5PVwiaWRcIlxyXG5cdFx0XHRcdC8+fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySW5wdXRHcm91cCAoKSB7XHJcblx0XHQvLyBUT0RPOiBmaW5kIGJldHRlciBzb2x1dGlvblxyXG5cdFx0Ly8gICB3aGVuIGltcG9ydGluZyB0aGUgQ3JlYXRlRm9ybSB1c2luZzogaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvQ3JlYXRlRm9ybSc7XHJcblx0XHQvLyAgIENyZWF0ZUZvcm0gd2FzIGltcG9ydGVkIGFzIGEgYmxhbmsgb2JqZWN0LiBUaGlzIHN0YWNrIG92ZXJmbG93IHBvc3Qgc3VnZ2VzdGVkIGxhemlsbHkgcmVxdWlyaW5nIGl0OlxyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTgwNzY2NC9jeWNsaWMtZGVwZW5kZW5jeS1yZXR1cm5zLWVtcHR5LW9iamVjdC1pbi1yZWFjdC1uYXRpdmVcclxuXHRcdC8vIFRPRE86IEltcGxlbWVudCB0aGlzIHNvbWV3aGVyZSBoaWdoZXIgaW4gdGhlIGFwcCwgaXQgYnJlYWtzIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSBSZWxhdGlvbnNoaXBGaWVsZCBjb21wb25lbnRcclxuXHRcdGNvbnN0IENyZWF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9DcmVhdGVGb3JtJyk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgYmxvY2s+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNlbGVjdCgpfVxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5vcGVuQ3JlYXRlfT4rPC9CdXR0b24+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxDcmVhdGVGb3JtXHJcblx0XHRcdFx0XHRsaXN0PXtsaXN0c0J5S2V5W3RoaXMucHJvcHMucmVmTGlzdC5rZXldfVxyXG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmNyZWF0ZUlzT3Blbn1cclxuXHRcdFx0XHRcdG9uQ3JlYXRlPXt0aGlzLm9uQ3JlYXRlfVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e3RoaXMuY2xvc2VDcmVhdGV9IC8+XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHsgbWFueSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRjb25zdCBwcm9wcyA9IHtcclxuXHRcdFx0Y2hpbGRyZW46IHZhbHVlID8gdmFsdWUubmFtZSA6IG51bGwsXHJcblx0XHRcdGNvbXBvbmVudDogdmFsdWUgPyAnYScgOiAnc3BhbicsXHJcblx0XHRcdGhyZWY6IHZhbHVlID8gdmFsdWUuaHJlZiA6IG51bGwsXHJcblx0XHRcdG5vZWRpdDogdHJ1ZSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1hbnkgPyB0aGlzLnJlbmRlclNlbGVjdCh0cnVlKSA6IDxGb3JtSW5wdXQgey4uLnByb3BzfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5jcmVhdGVJbmxpbmUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVySW5wdXRHcm91cCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyU2VsZWN0KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB4aHIgZnJvbSAneGhyJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCBQb3BvdXRMaXN0IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0JztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0xpbmtlZCBUbycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdOT1QgTGlua2VkIFRvJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IFtdLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBSZWxhdGlvbnNoaXBGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWVsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0aW52ZXJ0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0fSksXHJcblx0XHRvbkhlaWdodENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRzZWFyY2hSZXN1bHRzOiBbXSxcclxuXHRcdFx0c2VhcmNoU3RyaW5nOiAnJyxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczogW10sXHJcblx0XHRcdHZhbHVlSXNMb2FkaW5nOiB0cnVlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHRoaXMuX2l0ZW1zQ2FjaGUgPSB7fTtcclxuXHRcdHRoaXMubG9hZFNlYXJjaFJlc3VsdHModHJ1ZSk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmIChuZXh0UHJvcHMuZmlsdGVyLnZhbHVlICE9PSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBvcHVsYXRlVmFsdWUobmV4dFByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc0xvYWRpbmcgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc2VhcmNoSXNMb2FkaW5nIHx8IHRoaXMuc3RhdGUudmFsdWVJc0xvYWRpbmc7XHJcblx0fSxcclxuXHRwb3B1bGF0ZVZhbHVlICh2YWx1ZSkge1xyXG5cdFx0YXN5bmMubWFwKHZhbHVlLCAoaWQsIG5leHQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zQ2FjaGVbaWRdKSByZXR1cm4gbmV4dChudWxsLCB0aGlzLl9pdGVtc0NhY2hlW2lkXSk7XHJcblx0XHRcdHhocih7XHJcblx0XHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5maWVsZC5yZWZMaXN0LnBhdGggKyAnLycgKyBpZCArICc/YmFzaWMnLFxyXG5cdFx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGVyciB8fCAhZGF0YSkgcmV0dXJuIG5leHQoZXJyKTtcclxuXHRcdFx0XHR0aGlzLmNhY2hlSXRlbShkYXRhKTtcclxuXHRcdFx0XHRuZXh0KGVyciwgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgKGVyciwgaXRlbXMpID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdC8vIFRPRE86IEhhbmRsZSBlcnJvcnMgYmV0dGVyXHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtczonLCBlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHZhbHVlSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWxlY3RlZEl0ZW1zOiBpdGVtcyB8fCBbXSxcclxuXHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNhY2hlSXRlbSAoaXRlbSkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0fSxcclxuXHRidWlsZEZpbHRlcnMgKCkge1xyXG5cdFx0dmFyIGZpbHRlcnMgPSB7fTtcclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpZWxkLmZpbHRlcnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0XHRcdGlmICh2YWx1ZVswXSA9PT0gJzonKSByZXR1cm47XHJcblx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRfLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcblx0XHRcdHBhcnRzLnB1c2goJ2ZpbHRlcnNbJyArIGtleSArICddW3ZhbHVlXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyYnKTtcclxuXHR9LFxyXG5cdGxvYWRTZWFyY2hSZXN1bHRzICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0Y29uc3Qgc2VhcmNoU3RyaW5nID0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmc7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMuZmllbGQucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIHNlYXJjaFN0cmluZyArICcmJyArIGZpbHRlcnMsXHJcblx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGVycm9ycyBiZXR0ZXJcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGlmICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMucG9wdWxhdGVWYWx1ZSh0aGlzLnByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHNlYXJjaFN0cmluZyAhPT0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmcpIHJldHVybjtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0c2VhcmNoSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWFyY2hSZXN1bHRzOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdH0sIHRoaXMudXBkYXRlSGVpZ2h0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlSGVpZ2h0ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uSGVpZ2h0Q2hhbmdlKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25IZWlnaHRDaGFuZ2UodGhpcy5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKGludmVydGVkKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlU2VhcmNoIChlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgc2VhcmNoU3RyaW5nOiBlLnRhcmdldC52YWx1ZSB9LCB0aGlzLmxvYWRTZWFyY2hSZXN1bHRzKTtcclxuXHR9LFxyXG5cdHNlbGVjdEl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuY29uY2F0KGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbW92ZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuZmlsdGVyKGkgPT4geyByZXR1cm4gaSAhPT0gaXRlbS5pZDsgfSk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlckl0ZW1zIChpdGVtcywgc2VsZWN0ZWQpIHtcclxuXHRcdGNvbnN0IGl0ZW1JY29uSG92ZXIgPSBzZWxlY3RlZCA/ICd4JyA6ICdjaGVjayc7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxQb3BvdXRMaXN0Lkl0ZW1cclxuXHRcdFx0XHRcdGtleT17YGl0ZW0tJHtpfS0ke2l0ZW0uaWR9YH1cclxuXHRcdFx0XHRcdGljb249XCJkYXNoXCJcclxuXHRcdFx0XHRcdGljb25Ib3Zlcj17aXRlbUljb25Ib3Zlcn1cclxuXHRcdFx0XHRcdGxhYmVsPXtpdGVtLm5hbWV9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZCkgdGhpcy5yZW1vdmVJdGVtKGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHRlbHNlIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcclxuXHRcdFx0XHRcdH19XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkSXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSXRlbXM7XHJcblx0XHRjb25zdCBzZWFyY2hSZXN1bHRzID0gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmZpbHRlcihpID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmluZGV4T2YoaS5pZCkgPT09IC0xO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuaXNMb2FkaW5nKCkgPyAnTG9hZGluZy4uLicgOiAnRmluZCBhICcgKyB0aGlzLnByb3BzLmZpZWxkLmxhYmVsICsgJy4uLic7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHJlZj1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbCBlcXVhbFdpZHRoU2VnbWVudHMgb3B0aW9ucz17SU5WRVJURURfT1BUSU9OU30gdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLmludmVydGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVJbnZlcnRlZH0gLz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzFweCBkYXNoZWQgcmdiYSgwLDAsMCwwLjEpJywgcGFkZGluZ0JvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0IGF1dG9Gb2N1cyByZWY9XCJmb2N1c1RhcmdldFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFN0cmluZ30gb25DaGFuZ2U9e3RoaXMudXBkYXRlU2VhcmNofSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmc+U2VsZWN0ZWQ8L1BvcG91dExpc3QuSGVhZGluZz5cclxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySXRlbXMoc2VsZWN0ZWRJdGVtcywgdHJ1ZSl9XHJcblx0XHRcdFx0XHQ8L1BvcG91dExpc3Q+XHJcblx0XHRcdFx0KSA6IG51bGx9XHJcblx0XHRcdFx0e3NlYXJjaFJlc3VsdHMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmcgc3R5bGU9e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8geyBtYXJnaW5Ub3A6ICcyZW0nIH0gOiBudWxsfT5JdGVtczwvUG9wb3V0TGlzdC5IZWFkaW5nPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJdGVtcyhzZWFyY2hSZXN1bHRzKX1cclxuXHRcdFx0XHRcdDwvUG9wb3V0TGlzdD5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWxhdGlvbnNoaXBGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgU2VsZWN0Q29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnU2VsZWN0Q29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRsaW5rVG86IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRnZXRWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRjb25zdCBvcHRpb24gPSB0aGlzLnByb3BzLmNvbC5maWVsZC5vcHMuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gdmFsdWUpWzBdO1xyXG5cclxuXHRcdHJldHVybiBvcHRpb24gPyBvcHRpb24ubGFiZWwgOiBudWxsO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0gdG89e3RoaXMucHJvcHMubGlua1RvfSBlbXB0eT17ZW1wdHl9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0Q29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbi8qKlxyXG4gKiBUT0RPOlxyXG4gKiAtIEN1c3RvbSBwYXRoIHN1cHBvcnRcclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnU2VsZWN0RmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdTZWxlY3QnLFxyXG5cdH0sXHJcblxyXG5cdHZhbHVlQ2hhbmdlZCAobmV3VmFsdWUpIHtcclxuXHRcdC8vIFRPRE86IFRoaXMgc2hvdWxkIGJlIG5hdGl2ZWx5IGhhbmRsZWQgYnkgdGhlIFNlbGVjdCBjb21wb25lbnRcclxuXHRcdGlmICh0aGlzLnByb3BzLm51bWVyaWMgJiYgdHlwZW9mIG5ld1ZhbHVlID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRuZXdWYWx1ZSA9IG5ld1ZhbHVlID8gTnVtYmVyKG5ld1ZhbHVlKSA6IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiBuZXdWYWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHsgb3BzLCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHNlbGVjdGVkID0gb3BzLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gdmFsdWUpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0PlxyXG5cdFx0XHRcdHtzZWxlY3RlZCA/IHNlbGVjdGVkLmxhYmVsIDogbnVsbH1cclxuXHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdGNvbnN0IHsgbnVtZXJpYywgb3BzLCBwYXRoLCB2YWx1ZTogdmFsIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIFRPRE86IFRoaXMgc2hvdWxkIGJlIG5hdGl2ZWx5IGhhbmRsZWQgYnkgdGhlIFNlbGVjdCBjb21wb25lbnRcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSAobnVtZXJpYylcclxuXHRcdFx0PyBvcHMubWFwKGZ1bmN0aW9uIChpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHsgbGFiZWw6IGkubGFiZWwsIHZhbHVlOiBTdHJpbmcoaS52YWx1ZSkgfTtcclxuXHRcdFx0fSlcclxuXHRcdFx0OiBvcHM7XHJcblx0XHRjb25zdCB2YWx1ZSA9ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJylcclxuXHRcdFx0PyBTdHJpbmcodmFsKVxyXG5cdFx0XHQ6IHZhbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHsvKiBUaGlzIGlucHV0IGVsZW1lbnQgZm9vbHMgU2FmYXJpJ3MgYXV0b2NvcnJlY3QgaW4gY2VydGFpbiBzaXR1YXRpb25zIHRoYXQgY29tcGxldGVseSBicmVhayByZWFjdC1zZWxlY3QgKi99XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHpJbmRleDogLTEsIG9wYWNpdHk6IDAgfX0gdGFiSW5kZXg9XCItMVwiLz5cclxuXHRcdFx0XHQ8U2VsZWN0XHJcblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUocGF0aCl9XHJcblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHZrZXkgZnJvbSAndmtleSc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtTm90ZSxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuaW1wb3J0IFBvcG91dExpc3QgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QnO1xyXG5pbXBvcnQgS2JkIGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL0tiZCc7XHJcbmltcG9ydCBiaW5kRnVuY3Rpb25zIGZyb20gJy4uLy4uL3V0aWxzL2JpbmRGdW5jdGlvbnMnO1xyXG5cclxuY29uc3QgSU5WRVJURURfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnTWF0Y2hlcycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdEb2VzIE5PVCBNYXRjaCcsIHZhbHVlOiB0cnVlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRpbnZlcnRlZDogSU5WRVJURURfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdHZhbHVlOiBbXSxcclxuXHR9O1xyXG59XHJcblxyXG5jbGFzcyBGaWx0ZXJPcHRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFtcclxuXHRcdFx0J2hhbmRsZUNsaWNrJyxcclxuXHRcdF0pO1xyXG5cdH1cclxuXHRoYW5kbGVDbGljayAoKSB7XHJcblx0XHRjb25zdCB7IG9wdGlvbiwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2xpY2sob3B0aW9uLCBzZWxlY3RlZCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IG9wdGlvbiwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UG9wb3V0TGlzdC5JdGVtXHJcblx0XHRcdFx0aWNvbj17c2VsZWN0ZWQgPyAnY2hlY2snIDogJ2Rhc2gnfVxyXG5cdFx0XHRcdGlzU2VsZWN0ZWQ9e3NlbGVjdGVkfVxyXG5cdFx0XHRcdGxhYmVsPXtvcHRpb24ubGFiZWx9XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBTZWxlY3RGaWx0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFtcclxuXHRcdFx0J2RldGVjdE9TJyxcclxuXHRcdFx0J2hhbmRsZUNsaWNrJyxcclxuXHRcdFx0J2hhbmRsZUtleURvd24nLFxyXG5cdFx0XHQnaGFuZGxlS2V5VXAnLFxyXG5cdFx0XHQncmVtb3ZlT3B0aW9uJyxcclxuXHRcdFx0J3NlbGVjdE9wdGlvbicsXHJcblx0XHRcdCd0b2dnbGVBbGxPcHRpb25zJyxcclxuXHRcdFx0J3RvZ2dsZUludmVydGVkJyxcclxuXHRcdFx0J3VwZGF0ZUZpbHRlcicsXHJcblx0XHRdKTtcclxuXHJcblx0XHR0aGlzLnN0YXRlID0geyBtZXRhRG93bjogZmFsc2UgfTtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5kZXRlY3RPUygpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLCBmYWxzZSk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcCwgZmFsc2UpO1xyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXApO1xyXG5cdH1cclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTUVUSE9EU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHQvLyBUT0RPIHRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIG1vdmVkIHRvIHRoZSBtYWluIEFwcCBjb21wb25lbnQgYW5kIHN0b3JlZFxyXG5cdC8vIGluIGNvbnRleHQgZm9yIG90aGVyIGNvbXBvbmVudHMgdG8gc3Vic2NyaWJlIHRvIHdoZW4gcmVxdWlyZWRcclxuXHRkZXRlY3RPUyAoKSB7XHJcblx0XHRsZXQgb3NOYW1lID0gJ1Vua25vd24gT1MnO1xyXG5cclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnV2luJykpIG9zTmFtZSA9ICdXaW5kb3dzJztcclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnTWFjJykpIG9zTmFtZSA9ICdNYWNPUyc7XHJcblx0XHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5jbHVkZXMoJ1gxMScpKSBvc05hbWUgPSAnVU5JWCc7XHJcblx0XHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5jbHVkZXMoJ0xpbnV4JykpIG9zTmFtZSA9ICdMaW51eCc7XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG9zTmFtZSB9KTtcclxuXHR9XHJcblx0aGFuZGxlS2V5RG93biAoZSkge1xyXG5cdFx0aWYgKHZrZXlbZS5rZXlDb2RlXSAhPT0gJzxtZXRhPicpIHJldHVybjtcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHsgbWV0YURvd246IHRydWUgfSk7XHJcblx0fVxyXG5cdGhhbmRsZUtleVVwIChlKSB7XHJcblx0XHRpZiAodmtleVtlLmtleUNvZGVdICE9PSAnPG1ldGE+JykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBtZXRhRG93bjogZmFsc2UgfSk7XHJcblx0fVxyXG5cclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0fVxyXG5cdHRvZ2dsZUFsbE9wdGlvbnMgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmIChmaWx0ZXIudmFsdWUubGVuZ3RoIDwgZmllbGQub3BzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlOiBmaWVsZC5vcHMubWFwKGkgPT4gaS52YWx1ZSkgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlOiBbXSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0T3B0aW9uIChvcHRpb24pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZS5tZXRhRG93blxyXG5cdFx0XHQ/IHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmNvbmNhdChvcHRpb24udmFsdWUpXHJcblx0XHRcdDogW29wdGlvbi52YWx1ZV07XHJcblxyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZSB9KTtcclxuXHR9XHJcblx0cmVtb3ZlT3B0aW9uIChvcHRpb24pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZS5tZXRhRG93blxyXG5cdFx0XHQ/IHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmZpbHRlcihpID0+IGkgIT09IG9wdGlvbi52YWx1ZSlcclxuXHRcdFx0OiBbb3B0aW9uLnZhbHVlXTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH1cclxuXHRoYW5kbGVDbGljayAob3B0aW9uLCBzZWxlY3RlZCkge1xyXG5cdFx0c2VsZWN0ZWQgPyB0aGlzLnJlbW92ZU9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuXHR9XHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIFJFTkRFUkVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRyZW5kZXJPcHRpb25zICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmZpZWxkLm9wcy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xyXG5cdFx0XHRjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxGaWx0ZXJPcHRpb25cclxuXHRcdFx0XHRcdGtleT17YGl0ZW0tJHtpfS0ke29wdGlvbi52YWx1ZX1gfVxyXG5cdFx0XHRcdFx0b3B0aW9uPXtvcHRpb259XHJcblx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IGluZGV0ZXJtaW5hdGUgPSBmaWx0ZXIudmFsdWUubGVuZ3RoIDwgZmllbGQub3BzLmxlbmd0aDtcclxuXHJcblx0XHRjb25zdCBtZXRhS2V5TGFiZWwgPSB0aGlzLnN0YXRlLm9zTmFtZSA9PT0gJ01hY09TJ1xyXG5cdFx0XHQ/ICdjbWQnXHJcblx0XHRcdDogJ2N0cmwnO1xyXG5cclxuXHRcdGNvbnN0IGZpZWxkU3R5bGVzID0ge1xyXG5cdFx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdFx0Ym9yZGVyQm90dG9tOiAnMXB4IGRhc2hlZCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRcdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcblx0XHRcdG1hcmdpbkJvdHRvbTogJzFlbScsXHJcblx0XHRcdHBhZGRpbmdCb3R0b206ICcxZW0nLFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbFxyXG5cdFx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlSW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e0lOVkVSVEVEX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e2ZpZWxkU3R5bGVzfT5cclxuXHRcdFx0XHRcdDxCdXR0b24gc2l6ZT1cInhzbWFsbFwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQWxsT3B0aW9uc30gc3R5bGU9e3sgcGFkZGluZzogMCwgd2lkdGg6IDUwIH19PlxyXG5cdFx0XHRcdFx0XHR7aW5kZXRlcm1pbmF0ZSA/ICdBbGwnIDogJ05vbmUnfVxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0XHQ8Rm9ybU5vdGUgc3R5bGU9e3sgbWFyZ2luOiAwIH19PlxyXG5cdFx0XHRcdFx0XHRIb2xkIDxLYmQ+e21ldGFLZXlMYWJlbH08L0tiZD4gdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnNcclxuXHRcdFx0XHRcdDwvRm9ybU5vdGU+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyT3B0aW9ucygpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblNlbGVjdEZpbHRlci5wcm9wVHlwZXMgPSB7XHJcblx0ZmllbGQ6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0ZmlsdGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sZWFuLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5hcnJheSxcclxuXHR9KSxcclxufTtcclxuU2VsZWN0RmlsdGVyLmdldERlZmF1bHRWYWx1ZSA9IGdldERlZmF1bHRWYWx1ZTtcclxuU2VsZWN0RmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgVGV4dENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdC8vIGNyb3BwaW5nIHRleHQgaXMgaW1wb3J0YW50IGZvciB0ZXh0YXJlYSwgd2hpY2ggdXNlcyB0aGlzIGNvbHVtblxyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0cmV0dXJuIHZhbHVlID8gdmFsdWUuc3Vic3RyKDAsIDEwMCkgOiBudWxsO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5tb25vc3BhY2UgPyAnSXRlbUxpc3RfX3ZhbHVlLS1tb25vc3BhY2UnIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHRvPXt0aGlzLnByb3BzLmxpbmtUb30gZW1wdHk9e2VtcHR5fSBwYWRkZWQgaW50ZXJpb3IgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGV4dENvbHVtbjtcclxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1RleHQnLFxyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybVNlbGVjdCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ01hdGNoZXMnLCB2YWx1ZTogZmFsc2UgfSxcclxuXHR7IGxhYmVsOiAnRG9lcyBOT1QgTWF0Y2gnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdDb250YWlucycsIHZhbHVlOiAnY29udGFpbnMnIH0sXHJcblx0eyBsYWJlbDogJ0V4YWN0bHknLCB2YWx1ZTogJ2V4YWN0bHknIH0sXHJcblx0eyBsYWJlbDogJ0JlZ2lucyB3aXRoJywgdmFsdWU6ICdiZWdpbnNXaXRoJyB9LFxyXG5cdHsgbGFiZWw6ICdFbmRzIHdpdGgnLCB2YWx1ZTogJ2VuZHNXaXRoJyB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogJycsXHJcblx0fTtcclxufVxyXG5cclxudmFyIFRleHRGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdG1vZGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihNT0RFX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0XHRpbnZlcnRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHVwZGF0ZUZpbHRlciAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4udmFsdWUgfSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR1cGRhdGVWYWx1ZSAoZSkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17ZmlsdGVyLmludmVydGVkfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2VsZWN0TW9kZX1cclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX1cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlci52YWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRGaWx0ZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vdGV4dC9UZXh0Q29sdW1uJyk7XHJcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRhcmVhRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdUZXh0YXJlYScsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB7IGhlaWdodCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBzdHlsZXMgPSB7XHJcblx0XHRcdGhlaWdodDogaGVpZ2h0LFxyXG5cdFx0XHR3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxyXG5cdFx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IG11bHRpbGluZSBub2VkaXQgc3R5bGU9e3N0eWxlc30+e3RoaXMucHJvcHMudmFsdWV9PC9Gb3JtSW5wdXQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0Y29uc3QgeyBoZWlnaHQsIHBhdGgsIHN0eWxlLCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBzdHlsZXMgPSB7XHJcblx0XHRcdGhlaWdodDogaGVpZ2h0LFxyXG5cdFx0XHQuLi5zdHlsZSxcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRtdWx0aWxpbmVcclxuXHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZShwYXRoKX1cclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWR9XHJcblx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdHN0eWxlPXtzdHlsZXN9XHJcblx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbHVtbnMvQXJyYXlDb2x1bW4nKTtcclxuIiwiaW1wb3J0IEFycmF5RmllbGRNaXhpbiBmcm9tICcuLi8uLi9taXhpbnMvQXJyYXlGaWVsZCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblx0ZGlzcGxheU5hbWU6ICdUZXh0QXJyYXlGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1RleHRBcnJheScsXHJcblx0fSxcclxuXHRtaXhpbnM6IFtBcnJheUZpZWxkTWl4aW5dLFxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IHtcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1TZWxlY3QsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdDb250YWlucycsIHZhbHVlOiAnY29udGFpbnMnIH0sXHJcblx0eyBsYWJlbDogJ0V4YWN0bHknLCB2YWx1ZTogJ2V4YWN0bHknIH0sXHJcblx0eyBsYWJlbDogJ0JlZ2lucyB3aXRoJywgdmFsdWU6ICdiZWdpbnNXaXRoJyB9LFxyXG5cdHsgbGFiZWw6ICdFbmRzIHdpdGgnLCB2YWx1ZTogJ2VuZHNXaXRoJyB9LFxyXG5dO1xyXG5cclxuY29uc3QgUFJFU0VOQ0VfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnQXQgbGVhc3Qgb25lIGVsZW1lbnQnLCB2YWx1ZTogJ3NvbWUnIH0sXHJcblx0eyBsYWJlbDogJ05vIGVsZW1lbnQnLCB2YWx1ZTogJ25vbmUnIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRtb2RlOiBNT0RFX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHRwcmVzZW5jZTogUFJFU0VOQ0VfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdHZhbHVlOiAnJyxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgVGV4dEFycmF5RmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRtb2RlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoTU9ERV9PUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdFx0cHJlc2VuY2U6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihQUkVTRU5DRV9PUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZSB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHNlbGVjdFByZXNlbmNlIChlKSB7XHJcblx0XHRjb25zdCBwcmVzZW5jZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBwcmVzZW5jZSB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlIChlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IG1vZGUgPSBNT0RFX09QVElPTlMuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gZmlsdGVyLm1vZGUpWzBdO1xyXG5cdFx0Y29uc3QgcHJlc2VuY2UgPSBQUkVTRU5DRV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5wcmVzZW5jZSlbMF07XHJcblx0XHRjb25zdCBiZWluZ1ZlcmIgPSBtb2RlLnZhbHVlID09PSAnZXhhY3RseScgPyAnIGlzICcgOiAnICc7XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IHByZXNlbmNlLmxhYmVsICsgYmVpbmdWZXJiICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2VsZWN0UHJlc2VuY2V9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e1BSRVNFTkNFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtwcmVzZW5jZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxGb3JtU2VsZWN0XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNlbGVjdE1vZGV9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e01PREVfT1BUSU9OU31cclxuXHRcdFx0XHRcdFx0dmFsdWU9e21vZGUudmFsdWV9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9XHJcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcblx0XHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5maWx0ZXIudmFsdWV9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZXh0QXJyYXlGaWx0ZXI7XHJcbiIsIi8qXHJcblx0VGlkaWVyIGJpbmRpbmcgZm9yIGNvbXBvbmVudCBtZXRob2RzIHRvIENsYXNzZXNcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRiaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgWydoYW5kbGVDbGljaycsICdoYW5kbGVPdGhlciddKTtcclxuXHR9XHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEZ1bmN0aW9ucyAoZnVuY3Rpb25zKSB7XHJcblx0ZnVuY3Rpb25zLmZvckVhY2goZiA9PiAodGhpc1tmXSA9IHRoaXNbZl0uYmluZCh0aGlzKSkpO1xyXG59O1xyXG4iLCJ2YXIgRXhNYXRjaCA9IHJlcXVpcmUoJ2V4cHJlc3Npb24tbWF0Y2gnKTsgLy8gTWF0Y2hlcyBvYmplY3RzIHdpdGggZXhwcmVzc2lvbnNcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgc29tZXRoaW5nIGlzIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBbnl9IGFyZyAgIFRoZSBzb21ldGhpbmcgd2Ugd2FudCB0byBjaGVjayB0aGUgdHlwZSBvZlxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSBJZiBhcmcgaXMgYW4gb2JqZWN0IG9yIG5vdFxyXG4gKi9cclxuZnVuY3Rpb24gaXNPYmplY3QgKGFyZykge1xyXG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbn07XHJcblxyXG4vKipcclxuICogRXZhbHVhdGVzIHRoZSB2aXNpYmlsaXR5IG9mIGEgZmllbGQgYmFzZWQgb24gaXRzIGRlcGVuZGVuY2llcyBhbmQgdGhlaXIgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdHxBbnl9IGRlcGVuZHNPbiBUaGUgZGVwZW5kc09uIHZhcmlhYmxlIHdlIGdldCBmcm9tIHRoZSBmaWVsZFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9XHRcdHZhbHVlcyAgICBUaGUgdmFsdWVzIGN1cnJlbnRseSBpbiB0aGUgZmllbGRzXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHRcdFx0ICBJZiB0aGUgY3VycmVudCBmaWVsZCBzaG91bGQgYmUgZGlzcGxheWVkIGJhc2VkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBcdCAgb24gaXQncyBkZXBlbmRlbmNpZXMgYW5kIHRoZWlyIHZhbHVlc1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmFsRGVwZW5kc09uIChkZXBlbmRzT24sIHZhbHVlcykge1xyXG5cdGlmICghaXNPYmplY3QoZGVwZW5kc09uKSB8fCAhT2JqZWN0LmtleXMoZGVwZW5kc09uKS5sZW5ndGgpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGZpZWxkIHNob3VsZCBiZSBkaXNwbGF5ZWQsIGJhc2VkIG9uIHRoZSB2YWx1ZXMgb2ZcclxuXHQvLyBvdGhlciBmaWVsZHMgYW5kIHRoZSBkZXBlbmRzT24gY29uZmlndXJhdGlvbiBvZiB0aGlzIGZpZWxkXHJcblx0dmFyIE1hdGNoID0gbmV3IEV4TWF0Y2goZGVwZW5kc09uLCB2YWx1ZXMsIGZhbHNlKTtcclxuXHRyZXR1cm4gTWF0Y2gubWF0Y2goKTtcclxufTtcclxuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImV4cG9ydHMuQ29sdW1ucyA9IHtcbnRleHQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0Q29sdW1uXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVDb2x1bW5cIiksXG5yZWxhdGlvbnNoaXA6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcENvbHVtblwiKSxcbmVtYWlsOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsQ29sdW1uXCIpLFxuc2VsZWN0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3NlbGVjdC9TZWxlY3RDb2x1bW5cIiksXG5wYXNzd29yZDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZENvbHVtblwiKSxcbmNsb3VkaW5hcnlpbWFnZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9jbG91ZGluYXJ5aW1hZ2UvQ2xvdWRpbmFyeUltYWdlQ29sdW1uXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5Db2x1bW5cIiksXG5kYXRlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUNvbHVtblwiKSxcbm51bWJlcjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyQ29sdW1uXCIpLFxudGV4dGFyZWE6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFDb2x1bW5cIiksXG50ZXh0YXJyYXk6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFycmF5L1RleHRBcnJheUNvbHVtblwiKSxcbmlkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtblwiKSxcbl9fdW5yZWNvZ25pc2VkX186IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0ludmFsaWRDb2x1bW5cIiksXG59O1xuZXhwb3J0cy5GaWVsZHMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWVsZFwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmllbGRcIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbEZpZWxkXCIpLFxuc2VsZWN0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3NlbGVjdC9TZWxlY3RGaWVsZFwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmllbGRcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZFwiKSxcbmRhdGU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlRmllbGRcIiksXG5udW1iZXI6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvbnVtYmVyL051bWJlckZpZWxkXCIpLFxudGV4dGFyZWE6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFGaWVsZFwiKSxcbnRleHRhcnJheTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJyYXkvVGV4dEFycmF5RmllbGRcIiksXG59O1xuZXhwb3J0cy5GaWx0ZXJzID0ge1xudGV4dDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRGaWx0ZXJcIiksXG5kYXRldGltZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUZpbHRlclwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmlsdGVyXCIpLFxuZW1haWw6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWx0ZXJcIiksXG5zZWxlY3Q6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdEZpbHRlclwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmlsdGVyXCIpLFxuY2xvdWRpbmFyeWltYWdlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VGaWx0ZXJcIiksXG5ib29sZWFuOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkZpbHRlclwiKSxcbmRhdGU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlRmlsdGVyXCIpLFxubnVtYmVyOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL251bWJlci9OdW1iZXJGaWx0ZXJcIiksXG50ZXh0YXJlYTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJlYS9UZXh0YXJlYUZpbHRlclwiKSxcbnRleHRhcnJheTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJyYXkvVGV4dEFycmF5RmlsdGVyXCIpLFxufTtcbiJdfQ==
