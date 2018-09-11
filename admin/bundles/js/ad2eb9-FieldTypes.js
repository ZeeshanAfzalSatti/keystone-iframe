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

},{"../elemental":65,"./AlertMessages":66,"./IframeContent":68,"./InvalidFieldType":69,"FieldTypes":"FieldTypes","object-assign":136,"react":undefined,"vkey":undefined}],68:[function(require,module,exports){
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

},{"list-to-array":undefined,"object-assign":136,"qs":undefined,"xhr":undefined}],83:[function(require,module,exports){
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

},{"react":undefined}],98:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],99:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],100:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../components/CollapsedFieldLabel":90,"../utils/evalDependsOn.js":135,"blacklist":undefined,"classnames":undefined,"react":undefined,"react-dom":undefined}],101:[function(require,module,exports){
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

},{"../../components/Checkbox":89,"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],102:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/Checkbox":89,"../Field":100,"react":undefined}],103:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],104:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"../../components/columns/CloudinaryImageSummary":97,"react":undefined}],105:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/utils/cloudinaryResize":83,"../../components/FileChangeMessage":92,"../../components/HiddenFileInput":93,"../../components/ImageThumbnail":94,"../Field":100,"react":undefined,"react-images":undefined}],106:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],107:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"moment":undefined,"react":undefined}],108:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":91,"../Field":100,"moment":undefined,"react":undefined}],109:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],110:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateColumn');

},{"../date/DateColumn":107}],111:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":91,"../Field":100,"moment":undefined,"react":undefined}],112:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateFilter');

},{"../date/DateFilter":109}],113:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],114:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],115:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":130}],116:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"numeral":undefined,"react":undefined}],117:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],118:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],119:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],120:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],121:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],122:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],123:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/CreateForm":67,"../../../admin/client/utils/lists":87,"../Field":100,"async":undefined,"lodash":undefined,"react":undefined,"react-select":undefined,"xhr":undefined}],124:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Popout/PopoutList":74,"async":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined,"xhr":undefined}],125:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],126:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined,"react-select":undefined}],127:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Kbd":70,"../../../admin/client/App/shared/Popout/PopoutList":74,"../../utils/bindFunctions":134,"react":undefined,"vkey":undefined}],128:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],129:[function(require,module,exports){
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

},{"../Field":100}],130:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],131:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextColumn');

},{"../text/TextColumn":128}],132:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],133:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":130}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{"expression-match":undefined}],136:[function(require,module,exports){
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
  textarea: require("../../fields/types/textarea/TextareaField")
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
  textarea: require("../../fields/types/textarea/TextareaFilter")
};

},{"../../fields/components/columns/IdColumn":98,"../../fields/components/columns/InvalidColumn":99,"../../fields/types/boolean/BooleanColumn":101,"../../fields/types/boolean/BooleanField":102,"../../fields/types/boolean/BooleanFilter":103,"../../fields/types/cloudinaryimage/CloudinaryImageColumn":104,"../../fields/types/cloudinaryimage/CloudinaryImageField":105,"../../fields/types/cloudinaryimage/CloudinaryImageFilter":106,"../../fields/types/date/DateColumn":107,"../../fields/types/date/DateField":108,"../../fields/types/date/DateFilter":109,"../../fields/types/datetime/DatetimeColumn":110,"../../fields/types/datetime/DatetimeField":111,"../../fields/types/datetime/DatetimeFilter":112,"../../fields/types/email/EmailColumn":113,"../../fields/types/email/EmailField":114,"../../fields/types/email/EmailFilter":115,"../../fields/types/number/NumberColumn":116,"../../fields/types/number/NumberField":117,"../../fields/types/number/NumberFilter":118,"../../fields/types/password/PasswordColumn":119,"../../fields/types/password/PasswordField":120,"../../fields/types/password/PasswordFilter":121,"../../fields/types/relationship/RelationshipColumn":122,"../../fields/types/relationship/RelationshipField":123,"../../fields/types/relationship/RelationshipFilter":124,"../../fields/types/select/SelectColumn":125,"../../fields/types/select/SelectField":126,"../../fields/types/select/SelectFilter":127,"../../fields/types/text/TextColumn":128,"../../fields/types/text/TextField":129,"../../fields/types/text/TextFilter":130,"../../fields/types/textarea/TextareaColumn":131,"../../fields/types/textarea/TextareaField":132,"../../fields/types/textarea/TextareaFilter":133}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL2Nsb3VkaW5hcnktbWljcm91cmwvdXJsLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0FsZXJ0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0JsYW5rU3RhdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQnV0dG9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9DZW50ZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9DaGlwL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Ecm9wZG93bkJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtRmllbGQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9ub2VkaXQuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUxhYmVsL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybU5vdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaEJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhGaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvb2N0aWNvbnMuanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0dyaWRDb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWRSb3cvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXBTZWN0aW9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTGFiZWxsZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvTG9hZGluZ0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvYm9keS5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZGlhbG9nLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9mb290ZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2hlYWRlci5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vcGFnZS5qcyIsIkFwcC9lbGVtZW50YWwvUGFzc0NvbnRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BvcnRhbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvUmVzcG9uc2l2ZVRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NjcmVlblJlYWRlck9ubHkvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Njcm9sbExvY2svaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NlZ21lbnRlZENvbnRyb2wvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvU3Bpbm5lci9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc2l6ZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvQWxlcnRNZXNzYWdlcy5qcyIsIkFwcC9zaGFyZWQvQ3JlYXRlRm9ybS5qcyIsIkFwcC9zaGFyZWQvSWZyYW1lQ29udGVudC5qcyIsIkFwcC9zaGFyZWQvSW52YWxpZEZpZWxkVHlwZS5qcyIsIkFwcC9zaGFyZWQvS2JkLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0Qm9keS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEZvb3Rlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEhlYWRlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0SGVhZGluZy5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3RJdGVtLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0UGFuZS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L2luZGV4LmpzIiwiQXBwL3NoYXJlZC9Qb3J0YWwuanMiLCJjb25zdGFudHMuanMiLCJ0aGVtZS5qcyIsInV0aWxzL0xpc3QuanMiLCJ1dGlscy9jbG91ZGluYXJ5UmVzaXplLmpzIiwidXRpbHMvY29sb3IuanMiLCJ1dGlscy9jb25jYXRDbGFzc25hbWVzLmpzIiwidXRpbHMvY3NzLmpzIiwidXRpbHMvbGlzdHMuanMiLCJ1dGlscy9zdHJpbmcuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9DaGVja2JveC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0NvbGxhcHNlZEZpZWxkTGFiZWwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9EYXRlSW5wdXQuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9GaWxlQ2hhbmdlTWVzc2FnZS5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0hpZGRlbkZpbGVJbnB1dC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0ltYWdlVGh1bWJuYWlsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0Nsb3VkaW5hcnlJbWFnZVN1bW1hcnkuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0lkQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JbnZhbGlkQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL0ZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9jbG91ZGluYXJ5aW1hZ2UvQ2xvdWRpbmFyeUltYWdlRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRlL0RhdGVDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL251bWJlci9OdW1iZXJGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0Q29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3NlbGVjdC9TZWxlY3RGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0RmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJlYS9UZXh0YXJlYUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiLi4vLi4vZmllbGRzL3V0aWxzL2V2YWxEZXBlbmRzT24uanMiLCIuLi8uLi8uLi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiX3N0cmVhbV8wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksUUFBUSxDQUNWLEVBQUMsTUFBTSxNQUFQLEVBQWUsUUFBTyxHQUF0QixFQURVLEVBRVYsRUFBQyxNQUFNLFFBQVAsRUFBaUIsUUFBTyxHQUF4QixFQUZVLEVBR1YsRUFBQyxNQUFNLGNBQVAsRUFBdUIsUUFBTyxHQUE5QixFQUhVLEVBSVYsRUFBQyxNQUFNLE9BQVAsRUFBZ0IsUUFBTyxJQUF2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QVIsQ0FQQztBQVFsQixXQUFTLFFBQVEsMENBQVIsQ0FSUztBQVNsQixRQUFNLFFBQVEsb0NBQVIsQ0FUWTtBQVVsQixVQUFRLFFBQVEsd0NBQVIsQ0FWVTtBQVdsQixZQUFVLFFBQVEsNENBQVI7QUFYUSxDQUFsQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIEV4YW1wbGUgb3B0aW9uczpcblxuLy8gZmxhZ3M6ICdwcm9ncmVzc2l2ZSdcbi8vIGZsYWdzOiBbJ3Byb2dyZXNzaXZlJ11cbi8vIHF1YWxpdHk6IDgwXG4vLyBjcm9wOiAnZml0JywgJ2ZpbGwnXG4vLyBncmF2aXR5OiAnZmFjZSdcbi8vIGZldGNoX2Zvcm1hdDogJ2F1dG8nXG4vLyB3aWR0aDogMzAwXG4vLyBoZWlnaHQ6IDMwMFxuLy8gZWZmZWN0OiBibHVyOjIwMFxuXG52YXIgVFlQRVMgPSBbXG4gIHtuYW1lOiAnY3JvcCcsIHByZWZpeDonYyd9LFxuICB7bmFtZTogJ2VmZmVjdCcsIHByZWZpeDonZSd9LFxuICB7bmFtZTogJ2ZldGNoX2Zvcm1hdCcsIHByZWZpeDonZid9LFxuICB7bmFtZTogJ2ZsYWdzJywgcHJlZml4OidmbCd9LFxuICB7bmFtZTogJ2dyYXZpdHknLCBwcmVmaXg6J2cnfSxcbiAge25hbWU6ICdoZWlnaHQnLCBwcmVmaXg6J2gnfSxcbiAge25hbWU6ICdyYWRpdXMnLCBwcmVmaXg6J3InfSxcbiAge25hbWU6ICdxdWFsaXR5JywgcHJlZml4OidxJ30sXG4gIHtuYW1lOiAnd2lkdGgnLCBwcmVmaXg6J3cnfSxcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaWQsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgdmFyIHNjaGVtZSA9IG9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgdmFyIGNsb3VkX25hbWUgPSBvcHRpb25zLmNsb3VkX25hbWU7XG4gIGlmICghY2xvdWRfbmFtZSkgdGhyb3cgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgb3B0aW9ucy5jbG91ZF9uYW1lJyk7XG4gIFxuICB2YXIgcGFyYW1zID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBUWVBFUy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuYW1lID0gVFlQRVNbaV0ubmFtZTtcbiAgICB2YXIgcHJlZml4ID0gVFlQRVNbaV0ucHJlZml4O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc1tuYW1lXSkpIHtcbiAgICAgIG9wdGlvbnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihvcHQpIHtwYXJhbXMucHVzaChwcmVmaXggKyAnXycgKyBvcHQpfSk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zW25hbWVdICE9IG51bGwpIHtcbiAgICAgIHBhcmFtcy5wdXNoKHByZWZpeCArICdfJyArIG9wdGlvbnNbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciB1cmxQYXJhbXMgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zLmpvaW4oJywnKSArICcvJyA6ICcnO1xuICByZXR1cm4gc2NoZW1lICsgJzovL3Jlcy5jbG91ZGluYXJ5LmNvbS8nXG4gICAgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5jbG91ZF9uYW1lKVxuICAgICsgJy9pbWFnZS91cGxvYWQvJyArIHVybFBhcmFtc1xuICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKTtcbn07XG5cbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmFsZXJ0LmNvbG9yLmRhbmdlcixcclxuXHRlcnJvcjogdGhlbWUuYWxlcnQuY29sb3IuZGFuZ2VyLFxyXG5cdGluZm86IHRoZW1lLmFsZXJ0LmNvbG9yLmluZm8sXHJcblx0c3VjY2VzczogdGhlbWUuYWxlcnQuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5hbGVydC5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuLy8gY2xvbmUgY2hpbGRyZW4gaWYgYSBjbGFzcyBleGlzdHMgZm9yIHRoZSB0YWduYW1lXHJcbmNvbnN0IGNsb25lV2l0aENsYXNzbmFtZXMgPSAoYykgPT4ge1xyXG5cdGNvbnN0IHR5cGUgPSBjLnR5cGUgJiYgYy50eXBlLmRpc3BsYXlOYW1lXHJcblx0XHQ/IGMudHlwZS5kaXNwbGF5TmFtZVxyXG5cdFx0OiBjLnR5cGUgfHwgbnVsbDtcclxuXHJcblx0aWYgKCF0eXBlIHx8ICFjbGFzc2VzW3R5cGVdKSByZXR1cm4gYztcclxuXHJcblx0cmV0dXJuIGNsb25lRWxlbWVudChjLCB7XHJcblx0XHRjbGFzc05hbWU6IGNzcyhjbGFzc2VzW3R5cGVdKSxcclxuXHR9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEFsZXJ0ICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbG9yLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmFsZXJ0LFxyXG5cdFx0Y2xhc3Nlc1tjb2xvcl0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cdHByb3BzLmNoaWxkcmVuID0gQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBjbG9uZVdpdGhDbGFzc25hbWVzKTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSBkYXRhLWFsZXJ0LXR5cGU9e2NvbG9yfSAvPjtcclxufTtcclxuXHJcbkFsZXJ0LnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLmlzUmVxdWlyZWQsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuQWxlcnQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFsZXJ0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogY29sb3JzW2NvbG9yXS5ib3JkZXIsXHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXS50ZXh0LFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBoZWFkaW5nc1xyXG5jb25zdCBoZWFkaW5nVGFnbmFtZXMgPSB7fTtcclxuWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNiddLmZvckVhY2godGFnID0+IHtcclxuXHRoZWFkaW5nVGFnbmFtZXNbdGFnXSA9IHsgY29sb3I6ICdpbmhlcml0JyB9O1xyXG59KTtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSB7XHJcblx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblxyXG5cdCc6aG92ZXInOiB7IGNvbG9yOiAnaW5oZXJpdCcgfSxcclxuXHQnOmZvY3VzJzogeyBjb2xvcjogJ2luaGVyaXQnIH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhbGVydDoge1xyXG5cdFx0Ym9yZGVyQ29sb3I6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmFsZXJ0LmJvcmRlclJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmFsZXJ0LmJvcmRlcldpZHRoLFxyXG5cdFx0bWFyZ2luOiB0aGVtZS5hbGVydC5tYXJnaW4sXHJcblx0XHRwYWRkaW5nOiB0aGVtZS5hbGVydC5wYWRkaW5nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRhZ25hbWVzXHJcblx0YTogbGlua1N0eWxlcyxcclxuXHRMaW5rOiBsaW5rU3R5bGVzLFxyXG5cdHN0cm9uZzoge1xyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdH0sXHJcblxyXG5cdC8vIGhlYWRpbmdzXHJcblx0Li4uaGVhZGluZ1RhZ25hbWVzLFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gQmxhbmtTdGF0ZSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRoZWFkaW5nLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRhaW5lcixcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30+XHJcblx0XHRcdHshIWhlYWRpbmcgJiYgPGgyIGRhdGEtZTJlLWJsYW5rLXN0YXRlLWhlYWRpbmcgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkaW5nKX0+e2hlYWRpbmd9PC9oMj59XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvQ29tcG9uZW50PlxyXG5cdCk7XHJcbn07XHJcblxyXG5CbGFua1N0YXRlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLmlzUmVxdWlyZWQsXHJcblx0aGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuQmxhbmtTdGF0ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJsYW5rc3RhdGUuYmFja2dyb3VuZCxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYmxhbmtzdGF0ZS5ib3JkZXJSYWRpdXMsXHJcblx0XHRjb2xvcjogdGhlbWUuYmxhbmtzdGF0ZS5jb2xvcixcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ1ZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ0hvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ0hvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdWZXJ0aWNhbCxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0aGVhZGluZzoge1xyXG5cdFx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpbkJvdHRvbTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmxhbmtTdGF0ZTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNvbnN0IGNvbW1vbkNsYXNzZXMgPSBzdHlsZXMuY29tbW9uO1xyXG5jb25zdCBzdHlsZXNoZWV0Q2FjaGUgPSB7fTtcclxuZnVuY3Rpb24gZ2V0U3R5bGVTaGVldCAodmFyaWFudCwgY29sb3IpIHtcclxuXHRjb25zdCBjYWNoZUtleSA9IGAke3ZhcmlhbnR9LSR7Y29sb3J9YDtcclxuXHRpZiAoIXN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV0pIHtcclxuXHRcdGNvbnN0IHZhcmlhbnRTdHlsZXMgPSBzdHlsZXNbdmFyaWFudF0oY29sb3IpO1xyXG5cdFx0c3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XSA9IHZhcmlhbnRTdHlsZXM7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldO1xyXG59XHJcblxyXG5jb25zdCBCVVRUT05fU0laRVMgPSBbJ2xhcmdlJywgJ21lZGl1bScsICdzbWFsbCcsICd4c21hbGwnXTtcclxuY29uc3QgQlVUVE9OX1ZBUklBTlRTID0gWydmaWxsJywgJ2hvbGxvdycsICdsaW5rJ107XHJcbmNvbnN0IEJVVFRPTl9DT0xPUlMgPSBbJ2RlZmF1bHQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2NhbmNlbCcsICdkZWxldGUnXTtcclxuXHJcbi8vIE5PVEUgbXVzdCBOT1QgYmUgZnVuY3Rpb25hbCBjb21wb25lbnQgdG8gYWxsb3cgYHJlZnNgXHJcblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlciAoKSB7XHJcblx0XHR2YXIge1xyXG5cdFx0XHRhY3RpdmUsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0YmxvY2ssXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y29sb3IsXHJcblx0XHRcdGNvbXBvbmVudDogVGFnLFxyXG5cdFx0XHRkaXNhYmxlZCxcclxuXHRcdFx0c2l6ZSxcclxuXHRcdFx0dmFyaWFudCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgc3R5bGVzXHJcblx0XHRjb25zdCB2YXJpYW50Q2xhc3NlcyA9IGdldFN0eWxlU2hlZXQodmFyaWFudCwgY29sb3IpO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjb21tb25DbGFzc2VzLmJhc2UsXHJcblx0XHRcdGNvbW1vbkNsYXNzZXNbc2l6ZV0sXHJcblx0XHRcdHZhcmlhbnRDbGFzc2VzLmJhc2UsXHJcblx0XHRcdGJsb2NrID8gY29tbW9uQ2xhc3Nlcy5ibG9jayA6IG51bGwsXHJcblx0XHRcdGRpc2FibGVkID8gY29tbW9uQ2xhc3Nlcy5kaXNhYmxlZCA6IG51bGwsXHJcblx0XHRcdGFjdGl2ZSA/IHZhcmlhbnRDbGFzc2VzLmFjdGl2ZSA6IG51bGwsXHJcblx0XHRcdC4uLmFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHJldHVybiBhbiBhbmNob3Igb3IgYnV0dG9uXHJcblx0XHRpZiAoIVRhZykge1xyXG5cdFx0XHRUYWcgPSBwcm9wcy5ocmVmID8gJ2EnIDogJ2J1dHRvbic7XHJcblx0XHR9XHJcblx0XHQvLyBFbnN1cmUgYnV0dG9ucyBkb24ndCBzdWJtaXQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKFRhZyA9PT0gJ2J1dHRvbicgJiYgIXByb3BzLnR5cGUpIHtcclxuXHRcdFx0cHJvcHMudHlwZSA9ICdidXR0b24nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiA8VGFnIHsuLi5wcm9wc30gLz47XHJcblx0fVxyXG59O1xyXG5cclxuQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSkpLFxyXG5cdGJsb2NrOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9DT0xPUlMpLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9TSVpFUyksXHJcblx0dmFyaWFudDogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9WQVJJQU5UUyksXHJcbn07XHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBbXSxcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG5cdHZhcmlhbnQ6ICdmaWxsJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQnV0dG9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHsgZ3JhZGllbnRWZXJ0aWNhbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nzcyc7XHJcbmltcG9ydCB7IGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcblxyXG4vLyBDb21tb24gU3R5bGVzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmV4cG9ydHMuY29tbW9uID0ge1xyXG5cdC8vIEJhc2UgQnV0dG9uXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGJhc2U6IHtcclxuXHRcdCdhcHBlYXJhbmNlJzogJ25vbmUnLFxyXG5cdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHQnYm9yZGVyV2lkdGgnOiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGgsXHJcblx0XHQnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxyXG5cdFx0J2JvcmRlckNvbG9yJzogJ3RyYW5zcGFyZW50JyxcclxuXHRcdCdib3JkZXJSYWRpdXMnOiB0aGVtZS5idXR0b24uYm9yZGVyUmFkaXVzLFxyXG5cdFx0J2N1cnNvcic6ICdwb2ludGVyJyxcclxuXHRcdCdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcblx0XHQnZm9udFdlaWdodCc6IHRoZW1lLmJ1dHRvbi5mb250LndlaWdodCxcclxuXHRcdCdoZWlnaHQnOiB0aGVtZS5jb21wb25lbnQuaGVpZ2h0LFxyXG5cdFx0J2xpbmVIZWlnaHQnOiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRcdCdtYXJnaW5Cb3R0b20nOiAwLFxyXG5cdFx0J3BhZGRpbmcnOiBgMCAke3RoZW1lLmJ1dHRvbi5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0J291dGxpbmUnOiAwLFxyXG5cdFx0J3RleHRBbGlnbic6ICdjZW50ZXInLFxyXG5cdFx0J3RvdWNoQWN0aW9uJzogJ21hbmlwdWxhdGlvbicsXHJcblx0XHQndXNlclNlbGVjdCc6ICdub25lJyxcclxuXHRcdCd2ZXJ0aWNhbEFsaWduJzogJ21pZGRsZScsXHJcblx0XHQnd2hpdGVTcGFjZSc6ICdub3dyYXAnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b24uZGVmYXVsdC50ZXh0Q29sb3IsXHJcblx0XHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbi5kZWZhdWx0LnRleHRDb2xvcixcclxuXHRcdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQvLyBCbG9jayBEaXNwbGF5XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGJsb2NrOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0d2lkdGg6ICcxMDAlJyxcclxuXHR9LFxyXG5cdC8vIERpc2FibGVkXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGRpc2FibGVkOiB7XHJcblx0XHRvcGFjaXR5OiAwLjQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHQvLyBTaXplc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRsYXJnZToge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5sYXJnZSxcclxuXHR9LFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuZGVmYXVsdCxcclxuXHR9LFxyXG5cdHNtYWxsOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdH0sXHJcblx0eHNtYWxsOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnhzbWFsbCxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjknLFxyXG5cdFx0cGFkZGluZ0xlZnQ6ICcuNjZlbScsXHJcblx0XHRwYWRkaW5nUmlnaHQ6ICcuNjZlbScsXHJcblx0fSxcclxufTtcclxuXHJcblxyXG4vLyBGaWxsIFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25GaWxsVmFyaWFudCAodGV4dENvbG9yLCBiZ0NvbG9yKSB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgMTApLCBkYXJrZW4oYmdDb2xvciwgNSkpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCA1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c1N0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCAxMCksIGRhcmtlbihiZ0NvbG9yLCA1KSksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX1gLFxyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZShiZ0NvbG9yLCAyNSl9YCxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRhcmtlbihiZ0NvbG9yLCAxMCksXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgMjUpfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgNSksIGRhcmtlbihiZ0NvbG9yLCAxMCksIGJnQ29sb3IpLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBgJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAyMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDI1KX1gLFxyXG5cdFx0XHQnYm94U2hhZG93JzogJ2luc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJyxcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cdFx0XHQnZm9udFdlaWdodCc6IDQwMCxcclxuXHRcdFx0J3RleHRTaGFkb3cnOiAnMCAtMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBmb2N1c1N0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufVxyXG4vLyBUT0RPOiBUaGlzIGlzIHByZXR0eSBoYWNreSwgbmVlZHMgdG8gYmUgY29uc29saWRhdGVkIHdpdGggdGhlIFZhcmlhbnQoKSBtZXRob2RcclxuLy8gYWJvdmUgKG5lZWRzIG1vcmUgdGhlbWUgdmFyaWFibGVzIHRvIGJlIGltcGxlbWVudGVkIHRob3VnaClcclxuZnVuY3Rpb24gYnV0dG9uRmlsbERlZmF1bHQgKCkge1xyXG5cdGNvbnN0IGJvcmRlckNvbG9yID0gdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQ7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKCcjZmZmJywgJyNlZWUnKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDUpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgNSl9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCAxMCl9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNTdHlsZXMgPSB7XHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApfWAsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmQ6ICcjZTZlNmU2JyxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDEwKSxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKCcjZmFmYWZhJywgJyNlYWVhZWEnKSxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYCR7Ym9yZGVyQ29sb3J9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCA2KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDEyKX1gLFxyXG5cdFx0XHQnY29sb3InOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdFx0XHQndGV4dFNoYWRvdyc6ICcwIDFweCAwIHdoaXRlJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGZvY3VzU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gZ3Jvc3MgaGFja1xyXG5cdFx0YWN0aXZlOiB7XHJcblx0XHRcdC4uLmFjdGl2ZVN0eWxlcyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBhY3RpdmVTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdFx0Li4uYWN0aXZlU3R5bGVzLFxyXG5cdFx0XHRcdC4uLmZvY3VzU3R5bGVzLFxyXG5cdFx0XHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApfSwgaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKWAsXHJcblx0XHRcdH0sXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcbmV4cG9ydHMuZmlsbCA9IChjb2xvcikgPT4ge1xyXG5cdHN3aXRjaCAoY29sb3IpIHtcclxuXHRcdGNhc2UgJ2RlZmF1bHQnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbERlZmF1bHQoKTtcclxuXHRcdGNhc2UgJ2NhbmNlbCc6XHJcblx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbFZhcmlhbnQoJ3doaXRlJywgdGhlbWUuYnV0dG9uLmRhbmdlci5iZ0NvbG9yKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsVmFyaWFudCgnd2hpdGUnLCB0aGVtZS5idXR0b25bY29sb3JdLmJnQ29sb3IpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBIb2xsb3cgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkhvbGxvd1ZhcmlhbnQgKHRleHRDb2xvciwgYm9yZGVyQ29sb3IpIHtcclxuXHRjb25zdCBmb2N1c0FuZEhvdmVyU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUoYm9yZGVyQ29sb3IsIDE1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDE1KSxcclxuXHRcdGJveFNoYWRvdzogJ25vbmUnLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzT25seVN0eWxlcyA9IHtcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUoYm9yZGVyQ29sb3IsIDEwKX1gLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKGJvcmRlckNvbG9yLCAzNSksXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAyNSksXHJcblx0XHRib3hTaGFkb3c6ICdub25lJyxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYm9yZGVyQ29sb3IsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHJcblx0XHRcdCc6aG92ZXInOiBmb2N1c0FuZEhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzICc6IE9iamVjdC5hc3NpZ24oe30sIGZvY3VzQW5kSG92ZXJTdHlsZXMsIGZvY3VzT25seVN0eWxlcyksXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn07XHJcbmV4cG9ydHMuaG9sbG93ID0gKGNvbG9yKSA9PiB7XHJcblx0Ly8gVE9ETzogYmV0dGVyIGhhbmRsaW5nIG9mIGNhbmNlbCBhbmQgZGVsZXRlIGNvbG9yc1xyXG5cdGlmIChjb2xvciA9PT0gJ2NhbmNlbCcgfHwgY29sb3IgPT09ICdkZWxldGUnKSBjb2xvciA9ICdkYW5nZXInO1xyXG5cclxuXHRyZXR1cm4gYnV0dG9uSG9sbG93VmFyaWFudCh0aGVtZS5idXR0b25bY29sb3JdLmJnQ29sb3IsIHRoZW1lLmJ1dHRvbltjb2xvcl0uYm9yZGVyQ29sb3IpO1xyXG59O1xyXG5cclxuXHJcbi8vIExpbmsgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkxpbmtWYXJpYW50ICh0ZXh0Q29sb3IsIGhvdmVyQ29sb3IpIHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdGNvbG9yOiBob3ZlckNvbG9yLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHRcdCdib3JkZXInOiAwLFxyXG5cdFx0XHQnYm94U2hhZG93JzogJ25vbmUnLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblx0XHRcdCdmb250V2VpZ2h0JzogJ25vcm1hbCcsXHJcblx0XHRcdCdvdXRsaW5lJzogJ25vbmUnLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogaG92ZXJTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBob3ZlclN0eWxlcyxcclxuXHR9O1xyXG59O1xyXG5mdW5jdGlvbiBidXR0b25MaW5rRGVsZXRlICgpIHtcclxuXHRjb25zdCBzdHlsZXMgPSBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5ncmF5NDAsIHRoZW1lLmNvbG9yLmRhbmdlcik7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksIGRhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSksXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA0KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMil9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgNCksXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMil9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9YCxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5zdHlsZXMuYmFzZSxcclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydHMubGluayA9IChjb2xvcikgPT4ge1xyXG5cdHN3aXRjaCAoY29sb3IpIHtcclxuXHRcdGNhc2UgJ2RlZmF1bHQnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IubGluaywgdGhlbWUuY29sb3IubGlua0hvdmVyKTtcclxuXHRcdGNhc2UgJ2NhbmNlbCc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5ncmF5NDAsIHRoZW1lLmNvbG9yLmRhbmdlcik7XHJcblx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua0RlbGV0ZSgpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yW2NvbG9yXSwgdGhlbWUuY29sb3JbY29sb3JdKTtcclxuXHR9XHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIENlbnRlciAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRoZWlnaHQsXHJcblx0c3R5bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLmNlbnRlciwgY2xhc3NOYW1lKTtcclxuXHRwcm9wcy5zdHlsZSA9IHsgaGVpZ2h0LCAuLi5zdHlsZSB9O1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5DZW50ZXIucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0aGVpZ2h0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5DZW50ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0aGVpZ2h0OiAnYXV0bycsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENlbnRlcjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENlbnRlclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNlbnRlcjoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZmFkZSwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbmNvbnN0IGJhc2VDb2xvcnMgPSB7fTtcclxuWydkYW5nZXInLCAnaW5mbycsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZyddLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGJhc2VDb2xvcnNbY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDEwKSxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAyMCksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxNSksXHJcblx0XHR0ZXh0OiB0aGVtZS5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcbmNvbnN0IGludmVydGVkQ29sb3JzID0ge307XHJcblsnZGFuZ2VyJywgJ2luZm8nLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRpbnZlcnRlZENvbG9yc1tjb2xvciArICdfX2ludmVydGVkJ10gPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvcltjb2xvcl0sXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBsaWdodGVuKHRoZW1lLmNvbG9yW2NvbG9yXSwgNSksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGxpZ2h0ZW4odGhlbWUuY29sb3JbY29sb3JdLCAxNSksXHJcblx0XHR0ZXh0OiAnd2hpdGUnLFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGVmYXVsdDoge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3IuZ3JheTEwLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogdGhlbWUuY29sb3IuZ3JheTIwLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiB0aGVtZS5jb2xvci5ncmF5MTUsXHJcblx0XHR0ZXh0OiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHQuLi5iYXNlQ29sb3JzLFxyXG5cclxuXHQvLyBpbnZlcnRlZFxyXG5cdGRlZmF1bHRfX2ludmVydGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBsaWdodGVuKHRoZW1lLmNvbG9yLmdyYXk2MCwgNSksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGxpZ2h0ZW4odGhlbWUuY29sb3IuZ3JheTYwLCAxNSksXHJcblx0XHR0ZXh0OiAnd2hpdGUnLFxyXG5cdH0sXHJcblx0Li4uaW52ZXJ0ZWRDb2xvcnMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG5mdW5jdGlvbiBDaGlwICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNvbG9yLFxyXG5cdGludmVydGVkLFxyXG5cdGxhYmVsLFxyXG5cdG9uQ2xlYXIsXHJcblx0b25DbGljayxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jaGlwLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHRjb25zdCBsYWJlbENsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0Y2xhc3Nlcy5sYWJlbCxcclxuXHRcdGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yICsgKGludmVydGVkID8gJ19faW52ZXJ0ZWQnIDogJycpXVxyXG5cdCk7XHJcblx0Y29uc3QgY2xlYXJDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdGNsYXNzZXMuY2xlYXIsXHJcblx0XHRjbGFzc2VzWydidXR0b25fXycgKyBjb2xvciArIChpbnZlcnRlZCA/ICdfX2ludmVydGVkJyA6ICcnKV1cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9e2xhYmVsQ2xhc3NOYW1lfT5cclxuXHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0eyEhb25DbGVhciAmJiAoXHJcblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGVhcn0gY2xhc3NOYW1lPXtjbGVhckNsYXNzTmFtZX0+XHJcblx0XHRcdFx0XHQmdGltZXM7XHJcblx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdCl9XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuQ2hpcC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKS5pc1JlcXVpcmVkLFxyXG5cdGludmVydGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdG9uQ2xlYXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5DaGlwLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGlwO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgYm9yZGVyTGVmdFJhZGl1cywgYm9yZGVyUmlnaHRSYWRpdXMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jc3MnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZEhvdmVyLFxyXG5cdH07XHJcblxyXG5cdGNvbG9yVmFyaWFudHNbJ2J1dHRvbl9fJyArIGNvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0udGV4dCxcclxuXHJcblx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHtcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmRBY3RpdmUsXHJcblx0XHR9LFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y2hpcDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMi4yZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRhZ25hbWVzXHJcblx0YnV0dG9uOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICdub25lJyxcclxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsXHJcblx0XHRwYWRkaW5nOiAnMCAuOWVtJyxcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHJcblx0XHQvLyBtYWtlIHBpbGxzIC0gZXhhZ2dlcmF0ZSB0aGUgcGFkZGluZyB0b3dhcmQgdGhlIHJhZGlpIHNvIGl0IGxvb2tzIGV2ZW5cclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7XHJcblx0XHRcdC4uLmJvcmRlckxlZnRSYWRpdXMoJzNlbScpLFxyXG5cdFx0XHRwYWRkaW5nTGVmdDogJzEuMWVtJyxcclxuXHRcdH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdC4uLmJvcmRlclJpZ2h0UmFkaXVzKCczZW0nKSxcclxuXHRcdFx0cGFkZGluZ1JpZ2h0OiAnMS4xZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHJvdmlkZSBzZXBhcmF0aW9uIGJldHdlZW4gdGhlIGxhYmVsIGFuZCBjbGVhciBidXR0b25zXHJcblx0Ly8gZmxvYXRpbmcgc3RvcHMgdGhlIG1hcmdpbnMgZnJvbSBjb2xsYXBzaW5nIGludG8gZWFjaGluZ1xyXG5cclxuXHRsYWJlbDogeyBtYXJnaW5SaWdodDogMSB9LFxyXG5cdGNsZWFyOiB7IG1hcmdpbkxlZnQ6IDEgfSxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG5mdW5jdGlvbiBDb250YWluZXIgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdHdpZHRoLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRhaW5lcixcclxuXHRcdGNsYXNzZXNbd2lkdGhdLFxyXG5cdFx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuID8gY2xhc3Nlcy5jbGVhcmZpeCA6IG51bGxcclxuXHQpO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtcclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuXHRjbGVhckZsb2F0aW5nQ2hpbGRyZW46IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSkuaXNSZXF1aXJlZCxcclxuXHR3aWR0aDogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKHNpemVzKSkuaXNSZXF1aXJlZCxcclxufTtcclxuQ29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdHdpZHRoOiAnbGFyZ2UnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzbWFsbDogdGhlbWUuY29udGFpbmVyLnNpemUuc21hbGwsXHJcblx0bWVkaXVtOiB0aGVtZS5jb250YWluZXIuc2l6ZS5tZWRpdW0sXHJcblx0bGFyZ2U6IHRoZW1lLmNvbnRhaW5lci5zaXplLmxhcmdlLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ29udGFpbmVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoc2l6ZXMpLmZvckVhY2goc2l6ZSA9PiB7XHJcblx0c2l6ZVZhcmlhbnRzW3NpemVdID0ge1xyXG5cdFx0bWF4V2lkdGg6IHNpemVzW3NpemVdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLypcclxuXHRNaWNybyBjbGVhcmZpeCBoYWNrXHJcblx0MS5cdFRoZSBzcGFjZSBjb250ZW50IGlzIG9uZSB3YXkgdG8gYXZvaWQgYW4gT3BlcmEgYnVnIHdoZW4gdGhlXHJcblx0XHRcdGNvbnRlbnRlZGl0YWJsZSBhdHRyaWJ1dGUgaXMgaW5jbHVkZWQgYW55d2hlcmUgZWxzZSBpbiB0aGUgZG9jdW1lbnQuXHJcblx0XHRcdE90aGVyd2lzZSBpdCBjYXVzZXMgc3BhY2UgdG8gYXBwZWFyIGF0IHRoZSB0b3AgYW5kIGJvdHRvbSBvZiBlbGVtZW50c1xyXG5cdFx0XHR0aGF0IGFyZSBjbGVhcmZpeGVkLlxyXG5cdDIuXHRUaGUgdXNlIG9mIGB0YWJsZWAgcmF0aGVyIHRoYW4gYGJsb2NrYCBpcyBvbmx5IG5lY2Vzc2FyeSBpZiB1c2luZ1xyXG5cdFx0XHRgOmJlZm9yZWAgdG8gY29udGFpbiB0aGUgdG9wLW1hcmdpbnMgb2YgY2hpbGQgZWxlbWVudHMuXHJcbiovXHJcbmNvbnN0IGNsZWFyZml4U3R5bGVzID0ge1xyXG5cdGNsZWFyOiAnYm90aCcsXHJcblx0Y29udGVudDogJ1wiIFwiJywgLy8gMVxyXG5cdGRpc3BsYXk6ICd0YWJsZScsIC8vIDJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0bWFyZ2luTGVmdDogJ2F1dG8nLFxyXG5cdFx0bWFyZ2luUmlnaHQ6ICdhdXRvJyxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLFxyXG5cdH0sXHJcblxyXG5cdC8vIGNsZWFyIGZsb2F0aW5nIGNoaWxkcmVuXHJcblx0Y2xlYXJmaXg6IHtcclxuXHRcdCc6YmVmb3JlJzogY2xlYXJmaXhTdHlsZXMsXHJcblx0XHQnOmFmdGVyJzogY2xlYXJmaXhTdHlsZXMsXHJcblx0fSxcclxuXHJcblx0Ly8gc2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuXHJcbmZ1bmN0aW9uIERyb3Bkb3duQnV0dG9uICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93KX0gLz5cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBOT1RFXHJcbi8vIDE6IHRha2UgYWR2YW50YWdlIG9mIGBjdXJyZW50Q29sb3JgIGJ5IGxlYXZpbmcgYm9yZGVyIHRvcCBjb2xvciB1bmRlZmluZWRcclxuLy8gMjogZXZlbiB0aG91Z2ggdGhlIGFycm93IGlzIHZlcnRpY2FsbHkgY2VudGVyZWQsIHZpc3VhbGx5IGl0IGFwcGVhcnMgdG9vIGxvd1xyXG4vLyAgICBiZWNhdXNlIG9mIGxvd2VyY2FzZSBjaGFyYWN0ZXJzIGJlc2lkZSBpdFxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGFycm93OiB7XHJcblx0XHRib3JkZXJMZWZ0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmlnaHQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJUb3A6ICcwLjNlbSBzb2xpZCcsIC8vIDFcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAwLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyAyXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cclxuXHRcdC8vIGFkZCBzcGFjaW5nXHJcblx0XHQnOmZpcnN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHRcdH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpbkxlZnQ6ICcwLjVlbScsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duQnV0dG9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBGb3JtTGFiZWwgZnJvbSAnLi4vRm9ybUxhYmVsJztcclxuXHJcbmNsYXNzIEZvcm1GaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuZm9ybUZpZWxkSWQgPSBnZW5lcmF0ZUlkKCk7XHJcblx0fVxyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtRmllbGRJZDogdGhpcy5mb3JtRmllbGRJZCxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZvcm1MYXlvdXQgPSAnYmFzaWMnLCBsYWJlbFdpZHRoIH0gPSB0aGlzLmNvbnRleHQ7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0Y2hpbGRyZW4sXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y3JvcExhYmVsLFxyXG5cdFx0XHRodG1sRm9yLFxyXG5cdFx0XHRsYWJlbCxcclxuXHRcdFx0b2Zmc2V0QWJzZW50TGFiZWwsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybUZpZWxkLFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtRmllbGQtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSxcclxuXHRcdFx0b2Zmc2V0QWJzZW50TGFiZWwgPyBjbGFzc2VzWydGb3JtRmllbGQtLW9mZnNldC1hYnNlbnQtbGFiZWwnXSA6IG51bGwsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG9mZnNldEFic2VudExhYmVsICYmIGxhYmVsV2lkdGgpIHtcclxuXHRcdFx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRcdFx0cGFkZGluZ0xlZnQ6IGxhYmVsV2lkdGgsXHJcblx0XHRcdFx0Li4ucHJvcHMuc3R5bGUsXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZWxlbWVudHNcclxuXHRcdGNvbnN0IGNvbXBvbmVudExhYmVsID0gbGFiZWwgPyAoXHJcblx0XHRcdDxGb3JtTGFiZWwgaHRtbEZvcj17aHRtbEZvcn0gY3JvcFRleHQ9e2Nyb3BMYWJlbH0+XHJcblx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHQ8L0Zvcm1MYWJlbD5cclxuXHRcdCkgOiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgey4uLnByb3BzfSBodG1sRm9yPXtodG1sRm9yfT5cclxuXHRcdFx0XHR7Y29tcG9uZW50TGFiZWx9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtRmllbGQuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkZvcm1GaWVsZC5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybUZpZWxkLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRjcm9wTGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG5cdGh0bWxGb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0b2Zmc2V0QWJzZW50TGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVJZCAoKSB7XHJcblx0cmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUZpZWxkO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBGaWVsZFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUZpZWxkJzoge1xyXG5cdFx0bWFyZ2luQm90dG9tOiAnMWVtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGEgaG9yaXpvbnRhbCBmb3JtXHJcblxyXG5cdCdGb3JtRmllbGQtLWZvcm0tbGF5b3V0LWhvcml6b250YWwnOiB7XHJcblx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRkaXNwbGF5OiAndGFibGUnLFxyXG5cdFx0XHR0YWJsZUxheW91dDogJ2ZpeGVkJyxcclxuXHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gaW5zaWRlIGhvcml6b250YWwgZm9ybVxyXG5cdC8vIHR5cGljYWxseSBmb3IgdXNlIHdpdGggc3VibWl0IGJ1dHRvbiBpbnNpZGVcclxuXHQnRm9ybUZpZWxkLS1vZmZzZXQtYWJzZW50LWxhYmVsJzoge1xyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmZvcm0ubGFiZWwud2lkdGgsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYW4gaW5saW5lIGZvcm1cclxuXHJcblx0J0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtaW5saW5lJzoge1xyXG5cdFx0J2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdCdwYWRkaW5nTGVmdCc6ICcwLjI1ZW0nLFxyXG5cdFx0J3BhZGRpbmdSaWdodCc6ICcwLjI1ZW0nLFxyXG5cdFx0J3ZlcnRpY2FsQWxpZ24nOiAndG9wJyxcclxuXHJcblx0XHQnOmZpcnN0LWNoaWxkJzogeyBwYWRkaW5nTGVmdDogMCB9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzogeyBwYWRkaW5nUmlnaHQ6IDAgfSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbmNhdENsYXNzbmFtZXMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29uY2F0Q2xhc3NuYW1lcyc7XHJcbmltcG9ydCBJbnB1dE5vZWRpdCBmcm9tICcuL25vZWRpdCc7XHJcblxyXG4vLyBOT1RFIG11c3QgTk9UIGJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRvIGFsbG93IGByZWZzYFxyXG5cclxuY2xhc3MgRm9ybUlucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRibHVyICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmJsdXIoKTtcclxuXHR9XHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuZm9jdXMoKTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGRpc2FibGVkLFxyXG5cdFx0XHRpZCxcclxuXHRcdFx0bXVsdGlsaW5lLFxyXG5cdFx0XHRub2VkaXQsXHJcblx0XHRcdHNpemUsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBOT1RFIHJldHVybiBhIGRpZmZlcmVudCBjb21wb25lbnQgZm9yIGBub2VkaXRgXHJcblx0XHRpZiAobm9lZGl0KSByZXR1cm4gPElucHV0Tm9lZGl0IHsuLi50aGlzLnByb3BzfSAvPjtcclxuXHJcblx0XHRjb25zdCB7IGZvcm1GaWVsZElkLCBmb3JtTGF5b3V0IH0gPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cdFx0cHJvcHMuaWQgPSBpZCB8fCBmb3JtRmllbGRJZDtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtSW5wdXQsXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1JbnB1dF9fc2l6ZS0tJyArIHNpemVdLFxyXG5cdFx0XHRkaXNhYmxlZCA/IGNsYXNzZXNbJ0Zvcm1JbnB1dC0tZGlzYWJsZWQnXSA6IG51bGwsXHJcblx0XHRcdGZvcm1MYXlvdXQgPyBjbGFzc2VzWydGb3JtSW5wdXQtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSA6IG51bGwsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoYXBocm9kaXRlU3R5bGVzKVxyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHNldFJlZiA9IChuKSA9PiAodGhpcy50YXJnZXQgPSBuKTtcclxuXHRcdGNvbnN0IFRhZyA9IG11bHRpbGluZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxUYWdcclxuXHRcdFx0XHRyZWY9e3NldFJlZn1cclxuXHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XHJcblx0XHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1JbnB1dC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRtdWx0aWxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihbJ2RlZmF1bHQnLCAnc21hbGwnLCAnbGFyZ2UnXSksXHJcblx0dHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybUlucHV0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRzaXplOiAnZGVmYXVsdCcsXHJcblx0dHlwZTogJ3RleHQnLFxyXG59O1xyXG5Gb3JtSW5wdXQuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtSW5wdXQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBmYWRlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuZnVuY3Rpb24gRm9ybUlucHV0Tm9lZGl0ICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNyb3BUZXh0LFxyXG5cdG11bHRpbGluZSxcclxuXHRub2VkaXQsIC8vIE5PVEUgbm90IHVzZWQsIGp1c3QgcmVtb3ZlZCBmcm9tIHByb3BzXHJcblx0dHlwZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5ub2VkaXQsXHJcblx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuY3JvcFRleHQgOiBudWxsLFxyXG5cdFx0bXVsdGlsaW5lID8gY2xhc3Nlcy5tdWx0aWxpbmUgOiBudWxsLFxyXG5cdFx0KHByb3BzLmhyZWYgfHwgcHJvcHMub25DbGljaykgPyBjbGFzc2VzLmFuY2hvciA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuRm9ybUlucHV0Tm9lZGl0LnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuRm9ybUlucHV0Tm9lZGl0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbmNvbnN0IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRib3JkZXJDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmxpbmssXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG5cdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0bm9lZGl0OiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQubm9lZGl0LFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLm5vZWRpdCxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdHBhZGRpbmc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdHRyYW5zaXRpb246ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblxyXG5cdFx0Ly8gcHJldmVudCBlbXB0eSBpbnB1dHMgZnJvbSBjb2xsYXBzaW5nIGJ5IGFkZGluZyBjb250ZW50XHJcblx0XHQnOmVtcHR5OmJlZm9yZSc6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdFx0Y29udGVudDogJ1wiKG5vIHZhbHVlKVwiJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0bXVsdGlsaW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS40JyxcclxuXHRcdHBhZGRpbmdCb3R0b206ICcwLjZlbScsXHJcblx0XHRwYWRkaW5nVG9wOiAnMC42ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIGluZGljYXRlIGNsaWNrYWJpbGl0eSB3aGVuIHVzaW5nIGFuIGFuY2hvclxyXG5cdGFuY2hvcjoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmxpbmssXHJcblx0XHRtYXJnaW5SaWdodDogNSxcclxuXHRcdG1pbldpZHRoOiAwLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQnOmhvdmVyJzogYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1JbnB1dE5vZWRpdDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gSW5wdXRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1JbnB1dCc6IHtcclxuXHRcdCdhcHBlYXJhbmNlJzogJ25vbmUnLFxyXG5cdFx0J2JhY2tncm91bmRDb2xvcic6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGVmYXVsdCxcclxuXHRcdCdiYWNrZ3JvdW5kSW1hZ2UnOiAnbm9uZScsXHJcblx0XHQnYm9yZGVyQ29sb3InOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdCdib3JkZXJSYWRpdXMnOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0J2JvcmRlclN0eWxlJzogJ3NvbGlkJyxcclxuXHRcdCdib3JkZXJXaWR0aCc6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdCdib3hTaGFkb3cnOiB0aGVtZS5pbnB1dC5ib3hTaGFkb3csXHJcblx0XHQnY29sb3InOiAnaW5oZXJpdCcsIC8vIEZJWE1FXHJcblx0XHQnZGlzcGxheSc6ICdibG9jaycsXHJcblx0XHQnaGVpZ2h0JzogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0J2xpbmVIZWlnaHQnOiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0J3BhZGRpbmcnOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHQndHJhbnNpdGlvbic6ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0J3dpZHRoJzogJzEwMCUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuaG92ZXIsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5mb2N1cyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQnRm9ybUlucHV0LS1kaXNhYmxlZCc6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kaXNhYmxlZCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzaXplc1xyXG5cdCdGb3JtSW5wdXRfX3NpemUtLXNtYWxsJzoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHR9LFxyXG5cdCdGb3JtSW5wdXRfX3NpemUtLWxhcmdlJzoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5sYXJnZSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBGb3JtTGFiZWwgKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNyb3BUZXh0LFxyXG5cdGh0bWxGb3IsXHJcblx0Li4ucHJvcHNcclxufSxcclxue1xyXG5cdGZvcm1GaWVsZElkLFxyXG5cdGZvcm1MYXlvdXQsXHJcblx0bGFiZWxXaWR0aCxcclxufSkge1xyXG5cdHByb3BzLmh0bWxGb3IgPSBodG1sRm9yIHx8IGZvcm1GaWVsZElkO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuRm9ybUxhYmVsLFxyXG5cdFx0Zm9ybUxheW91dCA/IGNsYXNzZXNbJ0Zvcm1MYWJlbC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdIDogbnVsbCxcclxuXHRcdGNyb3BUZXh0ID8gY2xhc3Nlc1snRm9ybUxhYmVsLS1jcm9wLXRleHQnXSA6IG51bGwsXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblx0aWYgKGxhYmVsV2lkdGgpIHtcclxuXHRcdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0XHR3aWR0aDogbGFiZWxXaWR0aCxcclxuXHRcdFx0Li4ucHJvcHMuc3R5bGUsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUxhYmVsLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Gb3JtTGFiZWwuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2xhYmVsJyxcclxufTtcclxuRm9ybUxhYmVsLmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTGFiZWw7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIExhYmVsXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtTGFiZWwnOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuZm9ybS5sYWJlbC5jb2xvcixcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb3JtLmxhYmVsLmZvbnRTaXplLFxyXG5cdFx0Zm9udFdlaWdodDogdGhlbWUuZm9ybS5sYWJlbC5mb250V2VpZ2h0LFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Cb3R0b206ICcwLjVlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYSBob3Jpem9udGFsIGZvcm1cclxuXHJcblx0J0Zvcm1MYWJlbC0tZm9ybS1sYXlvdXQtaG9yaXpvbnRhbCc6IHtcclxuXHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdGRpc3BsYXk6ICd0YWJsZS1jZWxsJyxcclxuXHRcdFx0bGluZUhlaWdodDogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsIC8vIGZpeFxyXG5cdFx0XHRtYXJnaW5Cb3R0b206IDAsXHJcblx0XHRcdHBhZGRpbmdSaWdodDogNSxcclxuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCcsXHJcblx0XHRcdHdpZHRoOiB0aGVtZS5mb3JtLmxhYmVsLndpZHRoLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBjcm9wIGxvbmcgdGV4dFxyXG5cclxuXHQnRm9ybUxhYmVsLS1jcm9wLXRleHQnOiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBGb3JtTm90ZSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRodG1sLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5ub3RlLCBjbGFzc05hbWUpO1xyXG5cclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgaHRtbCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogRm9ybU5vdGUgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgaHRtbGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBodG1sID8gKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogaHRtbCB9fSAvPlxyXG5cdCkgOiAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30+e2NoaWxkcmVufTwvQ29tcG9uZW50PlxyXG5cdCk7XHJcbn07XHJcbkZvcm1Ob3RlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGh0bWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1Ob3RlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTm90ZTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gTm90ZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRub3RlOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuZm9ybS5ub3RlLmNvbG9yLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvcm0ubm90ZS5mb250U2l6ZSxcclxuXHRcdG1hcmdpblRvcDogdGhlbWUuc3BhY2luZy5zbWFsbCxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jbGFzcyBGb3JtU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgaWQsIG9wdGlvbnMsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyBmb3JtRmllbGRJZCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5zZWxlY3QsXHJcblx0XHRcdHByb3BzLmRpc2FibGVkID8gY2xhc3Nlc1snc2VsZWN0LS1kaXNhYmxlZCddIDogbnVsbFxyXG5cdFx0KTtcclxuXHRcdHByb3BzLmlkID0gaWQgfHwgZm9ybUZpZWxkSWQ7XHJcblxyXG5cdFx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0XHRpZiAob3B0aW9ucyAmJiBjaGlsZHJlbikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBGb3JtU2VsZWN0IGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYG9wdGlvbnNgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9PlxyXG5cdFx0XHRcdHtvcHRpb25zID8gKFxyXG5cdFx0XHRcdFx0PHNlbGVjdCB7Li4ucHJvcHN9PntvcHRpb25zLm1hcChvcHQgPT4gKFxyXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17b3B0LnZhbHVlfSB2YWx1ZT17b3B0LnZhbHVlfT5cclxuXHRcdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0XHQ8L29wdGlvbj5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9zZWxlY3Q+XHJcblx0XHRcdFx0KSA6IDxzZWxlY3Qgey4uLnByb3BzfT57Y2hpbGRyZW59PC9zZWxlY3Q+fVxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3dzLCBwcm9wcy5kaXNhYmxlZCA/IGNsYXNzZXNbJ2Fycm93cy0tZGlzYWJsZWQnXSA6IG51bGwpfT5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3csIGNsYXNzZXMuYXJyb3dUb3ApfSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlcy5hcnJvd0JvdHRvbSl9IC8+XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuRm9ybVNlbGVjdC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1TZWxlY3QucHJvcFR5cGVzID0ge1xyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0fSlcclxuXHQpLFxyXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtU2VsZWN0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBTZWxlY3RcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlbGVjdCBub2RlXHJcblx0c2VsZWN0OiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGVmYXVsdCxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyQm90dG9tQ29sb3I6IGRhcmtlbih0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCwgNCksXHJcblx0XHRib3JkZXJUb3BDb2xvcjogbGlnaHRlbih0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCwgNCksXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHRib3hTaGFkb3c6IHRoZW1lLnNlbGVjdC5ib3hTaGFkb3csXHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLCAvLyBGSVhNRVxyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdHBhZGRpbmc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdHRyYW5zaXRpb246ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0d2lkdGg6ICcxMDAlJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmhvdmVyLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0J3NlbGVjdC0tZGlzYWJsZWQnOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGlzYWJsZWQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gYXJyb3dzXHJcblx0YXJyb3dzOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHJpZ2h0OiAwLFxyXG5cdFx0dG9wOiAwLFxyXG5cdFx0d2lkdGg6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHR9LFxyXG5cdGFycm93OiB7XHJcblx0XHRib3JkZXJMZWZ0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmlnaHQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogMCxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHR6SW5kZXg6IDEsXHJcblx0fSxcclxuXHRhcnJvd1RvcDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tOiAnMC4zZW0gc29saWQnLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMC4xZW0nLFxyXG5cdH0sXHJcblx0YXJyb3dCb3R0b206IHtcclxuXHRcdGJvcmRlclRvcDogJzAuM2VtIHNvbGlkJyxcclxuXHRcdG1hcmdpblRvcDogJzAuMWVtJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtTGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCxcclxuXHRcdFx0bGFiZWxXaWR0aDogdGhpcy5wcm9wcy5sYWJlbFdpZHRoLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdC8vIE5PVEUgYGxhYmVsV2lkdGhgIGlzIGRlY2xhcmVkIHRvIHJlbW92ZSBpdCBmcm9tIGBwcm9wc2AsIHRob3VnaCBuZXZlciB1c2VkXHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0XHRcdGxhYmVsV2lkdGgsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuXHRcdFx0bGF5b3V0LFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm0sXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1fXycgKyBsYXlvdXRdLFxyXG5cdFx0XHRjbGFzc05hbWVcclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5Gb3JtLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkZvcm0ucHJvcFR5cGVzID0ge1xyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0bGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxufTtcclxuRm9ybS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZm9ybScsXHJcblx0bGF5b3V0OiAnYmFzaWMnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdEZvcm06IHt9LFxyXG59O1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBHbHlwaCBmcm9tICcuLi9HbHlwaCc7XHJcblxyXG5mdW5jdGlvbiBHbHlwaEJ1dHRvbiAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGdseXBoLFxyXG5cdGdseXBoQ29sb3IsXHJcblx0Z2x5cGhTaXplLFxyXG5cdGdseXBoU3R5bGUsXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGlzRGVmYXVsdCA9IHBvc2l0aW9uID09PSAnZGVmYXVsdCc7XHJcblx0Y29uc3QgaXNMZWZ0ID0gcG9zaXRpb24gPT09ICdsZWZ0JztcclxuXHRjb25zdCBpc1JpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCc7XHJcblxyXG5cdGNvbnN0IG9mZnNldCA9IHt9O1xyXG5cdGlmIChpc0xlZnQpIG9mZnNldC5tYXJnaW5SaWdodCA9ICcwLjVlbSc7XHJcblx0aWYgKGlzUmlnaHQpIG9mZnNldC5tYXJnaW5MZWZ0ID0gJzAuNWVtJztcclxuXHJcblx0Y29uc3QgZ2x5cGhTdHlsZXMgPSB7XHJcblx0XHQuLi5vZmZzZXQsXHJcblx0XHQuLi5nbHlwaFN0eWxlLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGljb24gPSAoXHJcblx0XHQ8R2x5cGhcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmdseXBofVxyXG5cdFx0XHRjb2xvcj17Z2x5cGhDb2xvcn1cclxuXHRcdFx0bmFtZT17Z2x5cGh9XHJcblx0XHRcdHNpemU9e2dseXBoU2l6ZX1cclxuXHRcdFx0c3R5bGU9e2dseXBoU3R5bGVzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7KGlzRGVmYXVsdCB8fCBpc0xlZnQpICYmIGljb259XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0e2lzUmlnaHQgJiYgaWNvbn1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBGb3IgcHJvcHMgXCJnbHlwaFwiLCBcImdseXBoQ29sb3JcIiwgYW5kIFwiZ2x5cGhTaXplXCI6XHJcbi8vIHByb3AgdHlwZSB2YWxpZGF0aW9uIHdpbGwgb2NjdXIgd2l0aGluIHRoZSBHbHlwaCBjb21wb25lbnQsIG5vIG5lZWQgdG9cclxuLy8gZHVwbGljYXRlLCBqdXN0IHBhc3MgaXQgdGhyb3VnaC5cclxuR2x5cGhCdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGdseXBoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2RlZmF1bHQnLCAnbGVmdCcsICdyaWdodCddKSxcclxufTtcclxuR2x5cGhCdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGdseXBoU3R5bGU6IHt9LFxyXG5cdHBvc2l0aW9uOiAnZGVmYXVsdCcsIC8vIG5vIG1hcmdpbiwgYXNzdW1lcyBubyBjaGlsZHJlblxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRnbHlwaDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIGZpeCBpY29uIGFsaWdubWVudFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGhCdXR0b247XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9Gb3JtRmllbGQnO1xyXG5pbXBvcnQgR2x5cGggZnJvbSAnLi4vR2x5cGgnO1xyXG5cclxuZnVuY3Rpb24gR2x5cGhGaWVsZCAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGdseXBoLFxyXG5cdGdseXBoQ29sb3IsXHJcblx0Z2x5cGhTaXplLFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBpc0xlZnQgPSBwb3NpdGlvbiA9PT0gJ2xlZnQnO1xyXG5cdGNvbnN0IGlzUmlnaHQgPSBwb3NpdGlvbiA9PT0gJ3JpZ2h0JztcclxuXHJcblx0Y29uc3QgZ2x5cGhTdHlsZXMgPSB7fTtcclxuXHRpZiAoaXNMZWZ0KSBnbHlwaFN0eWxlcy5tYXJnaW5SaWdodCA9ICcwLjVlbSc7XHJcblx0aWYgKGlzUmlnaHQpIGdseXBoU3R5bGVzLm1hcmdpbkxlZnQgPSAnMC41ZW0nO1xyXG5cclxuXHRjb25zdCBpY29uID0gKFxyXG5cdFx0PEdseXBoXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5nbHlwaH1cclxuXHRcdFx0Y29sb3I9e2dseXBoQ29sb3J9XHJcblx0XHRcdG5hbWU9e2dseXBofVxyXG5cdFx0XHRzaXplPXtnbHlwaFNpemV9XHJcblx0XHRcdHN0eWxlPXtnbHlwaFN0eWxlc31cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxGaWVsZCBhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMud3JhcHBlcn0gey4uLnByb3BzfT5cclxuXHRcdFx0e2lzTGVmdCAmJiBpY29ufVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdHtpc1JpZ2h0ICYmIGljb259XHJcblx0XHQ8L0ZpZWxkPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBGb3IgcHJvcHMgXCJnbHlwaFwiLCBcImdseXBoQ29sb3JcIiwgYW5kIFwiZ2x5cGhTaXplXCI6XHJcbi8vIHByb3AgdHlwZSB2YWxpZGF0aW9uIHdpbGwgb2NjdXIgd2l0aGluIHRoZSBHbHlwaCBjb21wb25lbnQsIG5vIG5lZWQgdG9cclxuLy8gZHVwbGljYXRlLCBqdXN0IHBhc3MgaXQgdGhyb3VnaC5cclxuR2x5cGhGaWVsZC5wcm9wVHlwZXMgPSB7XHJcblx0Z2x5cGg6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXHJcbn07XHJcbkdseXBoRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG5cdHBvc2l0aW9uOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHdyYXBwZXI6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdH0sXHJcblx0Z2x5cGg6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyBmaXggaWNvbiBhbGlnbm1lbnRcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoRmllbGQ7XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmdseXBoLmNvbG9yLmRhbmdlcixcclxuXHRpbmhlcml0OiB0aGVtZS5nbHlwaC5jb2xvci5pbmhlcml0LFxyXG5cdGludmVydGVkOiB0aGVtZS5nbHlwaC5jb2xvci5pbnZlcnRlZCxcclxuXHRwcmltYXJ5OiB0aGVtZS5nbHlwaC5jb2xvci5wcmltYXJ5LFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmdseXBoLmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuZ2x5cGguY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBvY3RpY29ucyBmcm9tICcuL29jdGljb25zJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuLy8gRklYTUUgc3RhdGljIG9jdGljb24gY2xhc3NlcyBsZWFuaW5nIG9uIEVsZW1lbnRhbCB0byBhdm9pZCBkdXBsaWNhdGVcclxuLy8gZm9udCBhbmQgQ1NTOyBpbmZsYXRpbmcgdGhlIHByb2plY3Qgc2l6ZVxyXG5cclxuZnVuY3Rpb24gR2x5cGggKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbG9yLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdG5hbWUsXHJcblx0c2l6ZSxcclxuXHRzdHlsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgY29sb3JJc1ZhbGlkVHlwZSA9IE9iamVjdC5rZXlzKGNvbG9ycykuaW5jbHVkZXMoY29sb3IpO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuZ2x5cGgsXHJcblx0XHRjb2xvcklzVmFsaWRUeXBlICYmIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLFxyXG5cdFx0Y2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KSArIGAgJHtvY3RpY29uc1tuYW1lXX1gO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8vIHN1cHBvcnQgcmFuZG9tIGNvbG9yIHN0cmluZ3NcclxuXHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdGNvbG9yOiAhY29sb3JJc1ZhbGlkVHlwZSA/IGNvbG9yIDogbnVsbCxcclxuXHRcdC4uLnN0eWxlLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5HbHlwaC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSxcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSksXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLCAvLyBzdXBwb3J0IHJhbmRvbSBjb2xvciBzdHJpbmdzXHJcblx0XSksXHJcblx0bmFtZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKG9jdGljb25zKSkuaXNSZXF1aXJlZCxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoc2l6ZXMpKSxcclxufTtcclxuR2x5cGguZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2knLFxyXG5cdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0c2l6ZTogJ3NtYWxsJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGg7XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFsZXJ0OiAnb2N0aWNvbiBvY3RpY29uLWFsZXJ0JyxcclxuXHQnYXJyb3ctZG93bic6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctZG93bicsXHJcblx0J2Fycm93LWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LWxlZnQnLFxyXG5cdCdhcnJvdy1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctcmlnaHQnLFxyXG5cdCdhcnJvdy1zbWFsbC1kb3duJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1kb3duJyxcclxuXHQnYXJyb3ctc21hbGwtbGVmdCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtbGVmdCcsXHJcblx0J2Fycm93LXNtYWxsLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1yaWdodCcsXHJcblx0J2Fycm93LXNtYWxsLXVwJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC11cCcsXHJcblx0J2Fycm93LXVwJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy11cCcsXHJcblx0bWljcm9zY29wZTogJ29jdGljb24gb2N0aWNvbi1taWNyb3Njb3BlJyxcclxuXHRiZWFrZXI6ICdvY3RpY29uIG9jdGljb24tYmVha2VyJyxcclxuXHRiZWxsOiAnb2N0aWNvbiBvY3RpY29uLWJlbGwnLFxyXG5cdGJvb2s6ICdvY3RpY29uIG9jdGljb24tYm9vaycsXHJcblx0Ym9va21hcms6ICdvY3RpY29uIG9jdGljb24tYm9va21hcmsnLFxyXG5cdGJyaWVmY2FzZTogJ29jdGljb24gb2N0aWNvbi1icmllZmNhc2UnLFxyXG5cdGJyb2FkY2FzdDogJ29jdGljb24gb2N0aWNvbi1icm9hZGNhc3QnLFxyXG5cdGJyb3dzZXI6ICdvY3RpY29uIG9jdGljb24tYnJvd3NlcicsXHJcblx0YnVnOiAnb2N0aWNvbiBvY3RpY29uLWJ1ZycsXHJcblx0Y2FsZW5kYXI6ICdvY3RpY29uIG9jdGljb24tY2FsZW5kYXInLFxyXG5cdGNoZWNrOiAnb2N0aWNvbiBvY3RpY29uLWNoZWNrJyxcclxuXHRjaGVja2xpc3Q6ICdvY3RpY29uIG9jdGljb24tY2hlY2tsaXN0JyxcclxuXHQnY2hldnJvbi1kb3duJzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLWRvd24nLFxyXG5cdCdjaGV2cm9uLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tbGVmdCcsXHJcblx0J2NoZXZyb24tcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tcmlnaHQnLFxyXG5cdCdjaGV2cm9uLXVwJzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLXVwJyxcclxuXHQnY2lyY2xlLXNsYXNoJzogJ29jdGljb24gb2N0aWNvbi1jaXJjbGUtc2xhc2gnLFxyXG5cdCdjaXJjdWl0LWJvYXJkJzogJ29jdGljb24gb2N0aWNvbi1jaXJjdWl0LWJvYXJkJyxcclxuXHRjbGlwcHk6ICdvY3RpY29uIG9jdGljb24tY2xpcHB5JyxcclxuXHRjbG9jazogJ29jdGljb24gb2N0aWNvbi1jbG9jaycsXHJcblx0J2Nsb3VkLWRvd25sb2FkJzogJ29jdGljb24gb2N0aWNvbi1jbG91ZC1kb3dubG9hZCcsXHJcblx0J2Nsb3VkLXVwbG9hZCc6ICdvY3RpY29uIG9jdGljb24tY2xvdWQtdXBsb2FkJyxcclxuXHRjb2RlOiAnb2N0aWNvbiBvY3RpY29uLWNvZGUnLFxyXG5cdCdjb2xvci1tb2RlJzogJ29jdGljb24gb2N0aWNvbi1jb2xvci1tb2RlJyxcclxuXHQnY29tbWVudC1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQtYWRkJyxcclxuXHRjb21tZW50OiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQnLFxyXG5cdCdjb21tZW50LWRpc2N1c3Npb24nOiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQtZGlzY3Vzc2lvbicsXHJcblx0J2NyZWRpdC1jYXJkJzogJ29jdGljb24gb2N0aWNvbi1jcmVkaXQtY2FyZCcsXHJcblx0ZGFzaDogJ29jdGljb24gb2N0aWNvbi1kYXNoJyxcclxuXHRkYXNoYm9hcmQ6ICdvY3RpY29uIG9jdGljb24tZGFzaGJvYXJkJyxcclxuXHRkYXRhYmFzZTogJ29jdGljb24gb2N0aWNvbi1kYXRhYmFzZScsXHJcblx0Y2xvbmU6ICdvY3RpY29uIG9jdGljb24tY2xvbmUnLFxyXG5cdCdkZXNrdG9wLWRvd25sb2FkJzogJ29jdGljb24gb2N0aWNvbi1kZXNrdG9wLWRvd25sb2FkJyxcclxuXHQnZGV2aWNlLWNhbWVyYSc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWNhbWVyYScsXHJcblx0J2RldmljZS1jYW1lcmEtdmlkZW8nOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1jYW1lcmEtdmlkZW8nLFxyXG5cdCdkZXZpY2UtZGVza3RvcCc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWRlc2t0b3AnLFxyXG5cdCdkZXZpY2UtbW9iaWxlJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtbW9iaWxlJyxcclxuXHRkaWZmOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYnLFxyXG5cdCdkaWZmLWFkZGVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLWFkZGVkJyxcclxuXHQnZGlmZi1pZ25vcmVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLWlnbm9yZWQnLFxyXG5cdCdkaWZmLW1vZGlmaWVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLW1vZGlmaWVkJyxcclxuXHQnZGlmZi1yZW1vdmVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLXJlbW92ZWQnLFxyXG5cdCdkaWZmLXJlbmFtZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtcmVuYW1lZCcsXHJcblx0ZWxsaXBzaXM6ICdvY3RpY29uIG9jdGljb24tZWxsaXBzaXMnLFxyXG5cdCdleWUtdW53YXRjaCc6ICdvY3RpY29uIG9jdGljb24tZXllLXVud2F0Y2gnLFxyXG5cdCdleWUtd2F0Y2gnOiAnb2N0aWNvbiBvY3RpY29uLWV5ZS13YXRjaCcsXHJcblx0ZXllOiAnb2N0aWNvbiBvY3RpY29uLWV5ZScsXHJcblx0J2ZpbGUtYmluYXJ5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLWJpbmFyeScsXHJcblx0J2ZpbGUtY29kZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1jb2RlJyxcclxuXHQnZmlsZS1kaXJlY3RvcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtZGlyZWN0b3J5JyxcclxuXHQnZmlsZS1tZWRpYSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1tZWRpYScsXHJcblx0J2ZpbGUtcGRmJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXBkZicsXHJcblx0J2ZpbGUtc3VibW9kdWxlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN1Ym1vZHVsZScsXHJcblx0J2ZpbGUtc3ltbGluay1kaXJlY3RvcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3ltbGluay1kaXJlY3RvcnknLFxyXG5cdCdmaWxlLXN5bWxpbmstZmlsZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zeW1saW5rLWZpbGUnLFxyXG5cdCdmaWxlLXRleHQnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtdGV4dCcsXHJcblx0J2ZpbGUtemlwJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXppcCcsXHJcblx0ZmxhbWU6ICdvY3RpY29uIG9jdGljb24tZmxhbWUnLFxyXG5cdGZvbGQ6ICdvY3RpY29uIG9jdGljb24tZm9sZCcsXHJcblx0Z2VhcjogJ29jdGljb24gb2N0aWNvbi1nZWFyJyxcclxuXHRnaWZ0OiAnb2N0aWNvbiBvY3RpY29uLWdpZnQnLFxyXG5cdGdpc3Q6ICdvY3RpY29uIG9jdGljb24tZ2lzdCcsXHJcblx0J2dpc3Qtc2VjcmV0JzogJ29jdGljb24gb2N0aWNvbi1naXN0LXNlY3JldCcsXHJcblx0J2dpdC1icmFuY2gtY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoLWNyZWF0ZScsXHJcblx0J2dpdC1icmFuY2gtZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoLWRlbGV0ZScsXHJcblx0J2dpdC1icmFuY2gnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gnLFxyXG5cdCdnaXQtY29tbWl0JzogJ29jdGljb24gb2N0aWNvbi1naXQtY29tbWl0JyxcclxuXHQnZ2l0LWNvbXBhcmUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1jb21wYXJlJyxcclxuXHQnZ2l0LW1lcmdlJzogJ29jdGljb24gb2N0aWNvbi1naXQtbWVyZ2UnLFxyXG5cdCdnaXQtcHVsbC1yZXF1ZXN0LWFiYW5kb25lZCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LXB1bGwtcmVxdWVzdC1hYmFuZG9uZWQnLFxyXG5cdCdnaXQtcHVsbC1yZXF1ZXN0JzogJ29jdGljb24gb2N0aWNvbi1naXQtcHVsbC1yZXF1ZXN0JyxcclxuXHRnbG9iZTogJ29jdGljb24gb2N0aWNvbi1nbG9iZScsXHJcblx0Z3JhcGg6ICdvY3RpY29uIG9jdGljb24tZ3JhcGgnLFxyXG5cdGhlYXJ0OiAnb2N0aWNvbiBvY3RpY29uLWhlYXJ0JyxcclxuXHRoaXN0b3J5OiAnb2N0aWNvbiBvY3RpY29uLWhpc3RvcnknLFxyXG5cdGhvbWU6ICdvY3RpY29uIG9jdGljb24taG9tZScsXHJcblx0J2hvcml6b250YWwtcnVsZSc6ICdvY3RpY29uIG9jdGljb24taG9yaXpvbnRhbC1ydWxlJyxcclxuXHRodWJvdDogJ29jdGljb24gb2N0aWNvbi1odWJvdCcsXHJcblx0aW5ib3g6ICdvY3RpY29uIG9jdGljb24taW5ib3gnLFxyXG5cdGluZm86ICdvY3RpY29uIG9jdGljb24taW5mbycsXHJcblx0J2lzc3VlLWNsb3NlZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtY2xvc2VkJyxcclxuXHQnaXNzdWUtb3BlbmVkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1vcGVuZWQnLFxyXG5cdCdpc3N1ZS1yZW9wZW5lZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtcmVvcGVuZWQnLFxyXG5cdGplcnNleTogJ29jdGljb24gb2N0aWNvbi1qZXJzZXknLFxyXG5cdGtleTogJ29jdGljb24gb2N0aWNvbi1rZXknLFxyXG5cdGtleWJvYXJkOiAnb2N0aWNvbiBvY3RpY29uLWtleWJvYXJkJyxcclxuXHRsYXc6ICdvY3RpY29uIG9jdGljb24tbGF3JyxcclxuXHQnbGlnaHQtYnVsYic6ICdvY3RpY29uIG9jdGljb24tbGlnaHQtYnVsYicsXHJcblx0bGluazogJ29jdGljb24gb2N0aWNvbi1saW5rJyxcclxuXHQnbGluay1leHRlcm5hbCc6ICdvY3RpY29uIG9jdGljb24tbGluay1leHRlcm5hbCcsXHJcblx0J2xpc3Qtb3JkZXJlZCc6ICdvY3RpY29uIG9jdGljb24tbGlzdC1vcmRlcmVkJyxcclxuXHQnbGlzdC11bm9yZGVyZWQnOiAnb2N0aWNvbiBvY3RpY29uLWxpc3QtdW5vcmRlcmVkJyxcclxuXHRsb2NhdGlvbjogJ29jdGljb24gb2N0aWNvbi1sb2NhdGlvbicsXHJcblx0J2dpc3QtcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1wcml2YXRlJyxcclxuXHQnbWlycm9yLXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvci1wcml2YXRlJyxcclxuXHQnZ2l0LWZvcmstcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWZvcmstcHJpdmF0ZScsXHJcblx0bG9jazogJ29jdGljb24gb2N0aWNvbi1sb2NrJyxcclxuXHQnbG9nby1naXRodWInOiAnb2N0aWNvbiBvY3RpY29uLWxvZ28tZ2l0aHViJyxcclxuXHRtYWlsOiAnb2N0aWNvbiBvY3RpY29uLW1haWwnLFxyXG5cdCdtYWlsLXJlYWQnOiAnb2N0aWNvbiBvY3RpY29uLW1haWwtcmVhZCcsXHJcblx0J21haWwtcmVwbHknOiAnb2N0aWNvbiBvY3RpY29uLW1haWwtcmVwbHknLFxyXG5cdCdtYXJrLWdpdGh1Yic6ICdvY3RpY29uIG9jdGljb24tbWFyay1naXRodWInLFxyXG5cdG1hcmtkb3duOiAnb2N0aWNvbiBvY3RpY29uLW1hcmtkb3duJyxcclxuXHRtZWdhcGhvbmU6ICdvY3RpY29uIG9jdGljb24tbWVnYXBob25lJyxcclxuXHRtZW50aW9uOiAnb2N0aWNvbiBvY3RpY29uLW1lbnRpb24nLFxyXG5cdG1pbGVzdG9uZTogJ29jdGljb24gb2N0aWNvbi1taWxlc3RvbmUnLFxyXG5cdCdtaXJyb3ItcHVibGljJzogJ29jdGljb24gb2N0aWNvbi1taXJyb3ItcHVibGljJyxcclxuXHRtaXJyb3I6ICdvY3RpY29uIG9jdGljb24tbWlycm9yJyxcclxuXHQnbW9ydGFyLWJvYXJkJzogJ29jdGljb24gb2N0aWNvbi1tb3J0YXItYm9hcmQnLFxyXG5cdG11dGU6ICdvY3RpY29uIG9jdGljb24tbXV0ZScsXHJcblx0J25vLW5ld2xpbmUnOiAnb2N0aWNvbiBvY3RpY29uLW5vLW5ld2xpbmUnLFxyXG5cdG9jdG9mYWNlOiAnb2N0aWNvbiBvY3RpY29uLW9jdG9mYWNlJyxcclxuXHRvcmdhbml6YXRpb246ICdvY3RpY29uIG9jdGljb24tb3JnYW5pemF0aW9uJyxcclxuXHRwYWNrYWdlOiAnb2N0aWNvbiBvY3RpY29uLXBhY2thZ2UnLFxyXG5cdHBhaW50Y2FuOiAnb2N0aWNvbiBvY3RpY29uLXBhaW50Y2FuJyxcclxuXHRwZW5jaWw6ICdvY3RpY29uIG9jdGljb24tcGVuY2lsJyxcclxuXHQncGVyc29uLWFkZCc6ICdvY3RpY29uIG9jdGljb24tcGVyc29uLWFkZCcsXHJcblx0J3BlcnNvbi1mb2xsb3cnOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbi1mb2xsb3cnLFxyXG5cdHBlcnNvbjogJ29jdGljb24gb2N0aWNvbi1wZXJzb24nLFxyXG5cdHBpbjogJ29jdGljb24gb2N0aWNvbi1waW4nLFxyXG5cdHBsdWc6ICdvY3RpY29uIG9jdGljb24tcGx1ZycsXHJcblx0J3JlcG8tY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWNyZWF0ZScsXHJcblx0J2dpc3QtbmV3JzogJ29jdGljb24gb2N0aWNvbi1naXN0LW5ldycsXHJcblx0J2ZpbGUtZGlyZWN0b3J5LWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1kaXJlY3RvcnktY3JlYXRlJyxcclxuXHQnZmlsZS1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtYWRkJyxcclxuXHRwbHVzOiAnb2N0aWNvbiBvY3RpY29uLXBsdXMnLFxyXG5cdCdwcmltaXRpdmUtZG90JzogJ29jdGljb24gb2N0aWNvbi1wcmltaXRpdmUtZG90JyxcclxuXHQncHJpbWl0aXZlLXNxdWFyZSc6ICdvY3RpY29uIG9jdGljb24tcHJpbWl0aXZlLXNxdWFyZScsXHJcblx0cHVsc2U6ICdvY3RpY29uIG9jdGljb24tcHVsc2UnLFxyXG5cdHF1ZXN0aW9uOiAnb2N0aWNvbiBvY3RpY29uLXF1ZXN0aW9uJyxcclxuXHRxdW90ZTogJ29jdGljb24gb2N0aWNvbi1xdW90ZScsXHJcblx0J3JhZGlvLXRvd2VyJzogJ29jdGljb24gb2N0aWNvbi1yYWRpby10b3dlcicsXHJcblx0J3JlcG8tZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWRlbGV0ZScsXHJcblx0cmVwbzogJ29jdGljb24gb2N0aWNvbi1yZXBvJyxcclxuXHQncmVwby1jbG9uZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1jbG9uZScsXHJcblx0J3JlcG8tZm9yY2UtcHVzaCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1mb3JjZS1wdXNoJyxcclxuXHQnZ2lzdC1mb3JrJzogJ29jdGljb24gb2N0aWNvbi1naXN0LWZvcmsnLFxyXG5cdCdyZXBvLWZvcmtlZCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1mb3JrZWQnLFxyXG5cdCdyZXBvLXB1bGwnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tcHVsbCcsXHJcblx0J3JlcG8tcHVzaCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1wdXNoJyxcclxuXHRyb2NrZXQ6ICdvY3RpY29uIG9jdGljb24tcm9ja2V0JyxcclxuXHRyc3M6ICdvY3RpY29uIG9jdGljb24tcnNzJyxcclxuXHRydWJ5OiAnb2N0aWNvbiBvY3RpY29uLXJ1YnknLFxyXG5cdCdzY3JlZW4tZnVsbCc6ICdvY3RpY29uIG9jdGljb24tc2NyZWVuLWZ1bGwnLFxyXG5cdCdzY3JlZW4tbm9ybWFsJzogJ29jdGljb24gb2N0aWNvbi1zY3JlZW4tbm9ybWFsJyxcclxuXHQnc2VhcmNoLXNhdmUnOiAnb2N0aWNvbiBvY3RpY29uLXNlYXJjaC1zYXZlJyxcclxuXHRzZWFyY2g6ICdvY3RpY29uIG9jdGljb24tc2VhcmNoJyxcclxuXHRzZXJ2ZXI6ICdvY3RpY29uIG9jdGljb24tc2VydmVyJyxcclxuXHRzZXR0aW5nczogJ29jdGljb24gb2N0aWNvbi1zZXR0aW5ncycsXHJcblx0c2hpZWxkOiAnb2N0aWNvbiBvY3RpY29uLXNoaWVsZCcsXHJcblx0J2xvZy1pbic6ICdvY3RpY29uIG9jdGljb24tbG9nLWluJyxcclxuXHQnc2lnbi1pbic6ICdvY3RpY29uIG9jdGljb24tc2lnbi1pbicsXHJcblx0J2xvZy1vdXQnOiAnb2N0aWNvbiBvY3RpY29uLWxvZy1vdXQnLFxyXG5cdCdzaWduLW91dCc6ICdvY3RpY29uIG9jdGljb24tc2lnbi1vdXQnLFxyXG5cdHNxdWlycmVsOiAnb2N0aWNvbiBvY3RpY29uLXNxdWlycmVsJyxcclxuXHQnc3Rhci1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXN0YXItYWRkJyxcclxuXHQnc3Rhci1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLXN0YXItZGVsZXRlJyxcclxuXHRzdGFyOiAnb2N0aWNvbiBvY3RpY29uLXN0YXInLFxyXG5cdHN0b3A6ICdvY3RpY29uIG9jdGljb24tc3RvcCcsXHJcblx0J3JlcG8tc3luYyc6ICdvY3RpY29uIG9jdGljb24tcmVwby1zeW5jJyxcclxuXHRzeW5jOiAnb2N0aWNvbiBvY3RpY29uLXN5bmMnLFxyXG5cdCd0YWctcmVtb3ZlJzogJ29jdGljb24gb2N0aWNvbi10YWctcmVtb3ZlJyxcclxuXHQndGFnLWFkZCc6ICdvY3RpY29uIG9jdGljb24tdGFnLWFkZCcsXHJcblx0dGFnOiAnb2N0aWNvbiBvY3RpY29uLXRhZycsXHJcblx0dGVsZXNjb3BlOiAnb2N0aWNvbiBvY3RpY29uLXRlbGVzY29wZScsXHJcblx0dGVybWluYWw6ICdvY3RpY29uIG9jdGljb24tdGVybWluYWwnLFxyXG5cdCd0aHJlZS1iYXJzJzogJ29jdGljb24gb2N0aWNvbi10aHJlZS1iYXJzJyxcclxuXHR0aHVtYnNkb3duOiAnb2N0aWNvbiBvY3RpY29uLXRodW1ic2Rvd24nLFxyXG5cdHRodW1ic3VwOiAnb2N0aWNvbiBvY3RpY29uLXRodW1ic3VwJyxcclxuXHR0b29sczogJ29jdGljb24gb2N0aWNvbi10b29scycsXHJcblx0dHJhc2hjYW46ICdvY3RpY29uIG9jdGljb24tdHJhc2hjYW4nLFxyXG5cdCd0cmlhbmdsZS1kb3duJzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1kb3duJyxcclxuXHQndHJpYW5nbGUtbGVmdCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtbGVmdCcsXHJcblx0J3RyaWFuZ2xlLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1yaWdodCcsXHJcblx0J3RyaWFuZ2xlLXVwJzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS11cCcsXHJcblx0dW5mb2xkOiAnb2N0aWNvbiBvY3RpY29uLXVuZm9sZCcsXHJcblx0dW5tdXRlOiAnb2N0aWNvbiBvY3RpY29uLXVubXV0ZScsXHJcblx0dmVyc2lvbnM6ICdvY3RpY29uIG9jdGljb24tdmVyc2lvbnMnLFxyXG5cdHdhdGNoOiAnb2N0aWNvbiBvY3RpY29uLXdhdGNoJyxcclxuXHQncmVtb3ZlLWNsb3NlJzogJ29jdGljb24gb2N0aWNvbi1yZW1vdmUtY2xvc2UnLFxyXG5cdHg6ICdvY3RpY29uIG9jdGljb24teCcsXHJcblx0emFwOiAnb2N0aWNvbiBvY3RpY29uLXphcCcsXHJcbn07XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzbWFsbDogdGhlbWUuZ2x5cGguc2l6ZS5zbWFsbCxcclxuXHRtZWRpdW06IHRoZW1lLmdseXBoLnNpemUubWVkaXVtLFxyXG5cdGxhcmdlOiB0aGVtZS5nbHlwaC5zaXplLmxhcmdlLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gR2x5cGhcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tgY29sb3JfXyR7Y29sb3J9YF0gPSB7XHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKHNpemVzKS5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHNpemVzW3NpemVdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Z2x5cGg6IHt9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY29uc3QgV0lEVEhTID0ge1xyXG5cdCdvbmUtd2hvbGUnOiAnMTAwJScsXHJcblx0J29uZS1oYWxmJzogJzUwJScsXHJcblx0J29uZS10aGlyZCc6ICczMy4zMyUnLFxyXG5cdCd0d28tdGhpcmRzJzogJzY2LjY2JScsXHJcblx0J29uZS1xdWFydGVyJzogJzI1JScsXHJcblx0J3RocmVlLXF1YXJ0ZXJzJzogJzc1JScsXHJcblxyXG5cdCdvbmUtZmlmdGgnOiAnMjAlJyxcclxuXHQndHdvLWZpZnRocyc6ICc0MCUnLFxyXG5cdCd0aHJlZS1maWZ0aHMnOiAnNjAlJyxcclxuXHQnZm91ci1maWZ0aHMnOiAnODAlJyxcclxuXHJcblx0J29uZS1zaXh0aCc6ICcxNi42NiUnLFxyXG5cdCdmaXZlLXNpeHRocyc6ICc4My4zMyUnLFxyXG59O1xyXG5cclxuY29uc3QgR3JpZENvbCA9IChwcm9wcywgY29udGV4dCkgPT4ge1xyXG5cdGNvbnN0IGd1dHRlciA9IHByb3BzLmd1dHRlciB8fCBjb250ZXh0Lmd1dHRlcjtcclxuXHRjb25zdCB4c21hbGwgPSBwcm9wcy54c21hbGwgfHwgY29udGV4dC54c21hbGw7XHJcblx0Y29uc3Qgc21hbGwgPSBwcm9wcy5zbWFsbCB8fCBjb250ZXh0LnNtYWxsO1xyXG5cdGNvbnN0IG1lZGl1bSA9IHByb3BzLm1lZGl1bSB8fCBjb250ZXh0Lm1lZGl1bTtcclxuXHRjb25zdCBsYXJnZSA9IHByb3BzLmxhcmdlIHx8IGNvbnRleHQubGFyZ2U7XHJcblxyXG5cdGNvbnN0IGNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXNbJ3hzbWFsbC0nICsgeHNtYWxsXSxcclxuXHRcdGNsYXNzZXNbJ3NtYWxsLScgKyBzbWFsbF0sXHJcblx0XHRjbGFzc2VzWydtZWRpdW0tJyArIG1lZGl1bV0sXHJcblx0XHRjbGFzc2VzWydsYXJnZS0nICsgbGFyZ2VdXHJcblx0KTtcclxuXHJcblx0Y29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSR7cHJvcHMuY2xhc3NOYW1lID8gKCcgJyArIHByb3BzLmNsYXNzTmFtZSkgOiAnJ31gO1xyXG5cdGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGd1dHRlciA/IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiBndXR0ZXIgLyAyLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiBndXR0ZXIgLyAyLFxyXG5cdH0gOiB7fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjb21wb25lbnRDbGFzc05hbWV9IHN0eWxlPXtjb21wb25lbnRTdHlsZXN9PlxyXG5cdFx0XHR7cHJvcHMuY2hpbGRyZW59XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuR3JpZENvbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkQ29sLnByb3BUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Li4ucHJlcGFyZVdpZHRocygneHNtYWxsJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdzbWFsbCcsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnbWVkaXVtJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdsYXJnZScsIFdJRFRIUyksXHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZVdpZHRocyAocHJlZml4LCBvYmopIHtcclxuXHRsZXQgY2xhc3NlcyA9IHt9O1xyXG5cdHN3aXRjaCAocHJlZml4KSB7XHJcblx0XHRjYXNlICdzbWFsbCc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRQb3J0cmFpdE1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ21lZGl1bSc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdsYXJnZSc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC5kZXNrdG9wTWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNsYXNzZXM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRDb2w7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmNsYXNzIEdyaWRSb3cgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRndXR0ZXI6IHRoaXMucHJvcHMuZ3V0dGVyLFxyXG5cdFx0XHR4c21hbGw6IHRoaXMucHJvcHMueHNtYWxsLFxyXG5cdFx0XHRzbWFsbDogdGhpcy5wcm9wcy5zbWFsbCxcclxuXHRcdFx0bWVkaXVtOiB0aGlzLnByb3BzLm1lZGl1bSxcclxuXHRcdFx0bGFyZ2U6IHRoaXMucHJvcHMubGFyZ2UsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBndXR0ZXIsIHN0eWxlcyA9IHt9IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGAke2NzcyhjbGFzc2VzLmdyaWQpfSR7Y2xhc3NOYW1lID8gKCcgJyArIGNsYXNzTmFtZSkgOiAnJ31gO1xyXG5cdFx0Y29uc3QgY29tcG9uZW50U3R5bGVzID0gT2JqZWN0LmFzc2lnbihzdHlsZXMsIHtcclxuXHRcdFx0bWFyZ2luTGVmdDogZ3V0dGVyIC8gLTIsXHJcblx0XHRcdG1hcmdpblJpZ2h0OiBndXR0ZXIgLyAtMixcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjb21wb25lbnRDbGFzc05hbWV9IHN0eWxlPXtjb21wb25lbnRTdHlsZXN9PlxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkdyaWRSb3cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkUm93LnByb3BUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRSb3cuZGVmYXVsdFByb3BzID0ge1xyXG5cdGd1dHRlcjogMCxcclxuXHR4c21hbGw6ICdvbmUtd2hvbGUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRncmlkOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4V3JhcDogJ3dyYXAnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRSb3c7XHJcbiIsImltcG9ydCBDb2wgZnJvbSAnLi4vR3JpZENvbCc7XHJcbmltcG9ydCBSb3cgZnJvbSAnLi4vR3JpZFJvdyc7XHJcblxyXG5leHBvcnQgeyBDb2wsIFJvdyB9O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbi8vIE5PVEU6IElubGluZSBHcm91cCBTZWN0aW9uIGFjY2VwdHMgYSBzaW5nbGUgY2hpbGRcclxuXHJcbmZ1bmN0aW9uIElubGluZUdyb3VwU2VjdGlvbiAoe1xyXG5cdGFjdGl2ZSxcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbnRpZ3VvdXMsXHJcblx0Z3JvdyxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gZXZhbHVhdGUgcG9zaXRpb25cclxuXHRjb25zdCBzZXBhcmF0ZSA9IHBvc2l0aW9uID09PSAnbGFzdCcgfHwgcG9zaXRpb24gPT09ICdtaWRkbGUnO1xyXG5cclxuXHQvLyBBIGBjb250aWd1b3VzYCBzZWN0aW9uIG11c3QgbWFuaXB1bGF0ZSBpdCdzIGNoaWxkIGRpcmVjdGx5XHJcblx0Ly8gQSBzZXBhcmF0ZSAoZGVmYXVsdCkgc2VjdGlvbiBqdXN0IHdyYXBzIHRoZSBjaGlsZFxyXG5cdHJldHVybiBjb250aWd1b3VzID8gY2xvbmVFbGVtZW50KGNoaWxkcmVuLCB7XHJcblx0XHRhcGhyb2RpdGVTdHlsZXM6IFtcclxuXHRcdFx0Y2xhc3Nlcy5jb250aWd1b3VzLFxyXG5cdFx0XHRjbGFzc2VzWydjb250aWd1b3VzX18nICsgcG9zaXRpb25dLFxyXG5cdFx0XHRhY3RpdmUgPyBjbGFzc2VzLmFjdGl2ZSA6IG51bGwsXHJcblx0XHRcdGdyb3cgPyBjbGFzc2VzLmdyb3cgOiBudWxsLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRdLFxyXG5cdFx0Li4ucHJvcHMsXHJcblx0fSkgOiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKFxyXG5cdFx0XHQhIWdyb3cgJiYgY2xhc3Nlcy5ncm93LFxyXG5cdFx0XHQhIXNlcGFyYXRlICYmIGNsYXNzZXMuc2VwYXJhdGUsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KX0gey4uLnByb3BzfT5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbklubGluZUdyb3VwU2VjdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCwgLy8gYnV0dG9ucyBvbmx5XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXHJcblx0Y29udGlndW91czogUHJvcFR5cGVzLmJvb2wsXHJcblx0Z3JvdzogUHJvcFR5cGVzLmJvb2wsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2ZpcnN0JywgJ2xhc3QnLCAnbWlkZGxlJywgJ29ubHknXSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZUdyb3VwU2VjdGlvbjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIElubGluZSBHcm91cDogU2VjdGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIFRha2VzIG9ubHkgRm9ybUlucHV0IGFuZCBCdXR0b24gYXMgY2hpbGRyZW4sIHJlbmRlcmluZyB0aGVtIGFzIGFcclxuLy8gdGlkeSBpbmxpbmUgYXJyYXlcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQvLyBwdWxsIGFjdGl2ZSBlbGVtZW50cyB1cFxyXG5cdGFjdGl2ZToge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc3RyZXRjaCB0byBmaWxsIGF2YWlsYWJsZSB3aWR0aFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VwYXJhdGUgYXBwbGljYWJsZSBub24tY29udGlndW91cyBlbGVtZW50c1xyXG5cdHNlcGFyYXRlOiB7XHJcblx0XHRwYWRkaW5nTGVmdDogJzAuNzVlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gQ29udGlndW91czogbWFuaXB1bGF0ZSBjaGlsZHJlbiBkaXJlY3RseVxyXG5cclxuXHQvLyBwdWxsIGZvY3VzZWQgY29udGlndW91cyBlbGVtZW50cyB1cFxyXG5cdGNvbnRpZ3VvdXM6IHtcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0XHR6SW5kZXg6IDEsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIHBvc2l0aW9uXHJcblx0Y29udGlndW91c19fbWlkZGxlOiB7XHJcblx0XHRib3JkZXJSYWRpdXM6IDAsXHJcblx0XHRtYXJnaW5MZWZ0OiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGggKiAtMSxcclxuXHR9LFxyXG5cdGNvbnRpZ3VvdXNfX2ZpcnN0OiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRib3JkZXJUb3BSaWdodFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0fSxcclxuXHRjb250aWd1b3VzX19sYXN0OiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0bWFyZ2luTGVmdDogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoICogLTEsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4sIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIE5PVEU6IG9ubHkgYWNjZXB0cyBJbmxpbmVHcm91cFNlY3Rpb24gYXMgYSBzaW5nbGUgY2hpbGRcclxuXHJcbmZ1bmN0aW9uIElubGluZUdyb3VwICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGJsb2NrLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjb250aWd1b3VzLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBwcmVwYXJlIGdyb3VwIGNsYXNzTmFtZVxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuZ3JvdXAsXHJcblx0XHQhIWJsb2NrICYmIGNsYXNzZXMuYmxvY2ssXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnZlcnQgY2hpbGRyZW4gdG8gYW4gYXJyYXkgYW5kIGZpbHRlciBvdXQgZmFsc2V5IHZhbHVlc1xyXG5cdGNvbnN0IGJ1dHRvbnMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5maWx0ZXIoaSA9PiBpKTtcclxuXHJcblx0Ly8gbm9ybWFsaXplIHRoZSBjb3VudFxyXG5cdGNvbnN0IGNvdW50ID0gYnV0dG9ucy5sZW5ndGggLSAxO1xyXG5cclxuXHQvLyBjbG9uZSBjaGlsZHJlbiBhbmQgYXBwbHkgY2xhc3NOYW1lcyB0aGF0IGFwaHJvZGl0ZSBjYW4gdGFyZ2V0XHJcblx0cHJvcHMuY2hpbGRyZW4gPSBidXR0b25zLm1hcCgoYywgaWR4KSA9PiB7XHJcblx0XHRpZiAoIWMpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IGlzT25seUNoaWxkID0gIWNvdW50O1xyXG5cdFx0Y29uc3QgaXNGaXJzdENoaWxkID0gIWlzT25seUNoaWxkICYmIGlkeCA9PT0gMDtcclxuXHRcdGNvbnN0IGlzTGFzdENoaWxkID0gIWlzT25seUNoaWxkICYmIGlkeCA9PT0gY291bnQ7XHJcblx0XHRjb25zdCBpc01pZGRsZUNoaWxkID0gIWlzT25seUNoaWxkICYmICFpc0ZpcnN0Q2hpbGQgJiYgIWlzTGFzdENoaWxkO1xyXG5cclxuXHRcdGxldCBwb3NpdGlvbjtcclxuXHRcdGlmIChpc09ubHlDaGlsZCkgcG9zaXRpb24gPSAnb25seSc7XHJcblx0XHRpZiAoaXNGaXJzdENoaWxkKSBwb3NpdGlvbiA9ICdmaXJzdCc7XHJcblx0XHRpZiAoaXNMYXN0Q2hpbGQpIHBvc2l0aW9uID0gJ2xhc3QnO1xyXG5cdFx0aWYgKGlzTWlkZGxlQ2hpbGQpIHBvc2l0aW9uID0gJ21pZGRsZSc7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lRWxlbWVudChjLCB7XHJcblx0XHRcdGNvbnRpZ3VvdXM6IGNvbnRpZ3VvdXMsXHJcblx0XHRcdHBvc2l0aW9uLFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5JbmxpbmVHcm91cC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSxcclxuXHRibG9jazogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRjb250aWd1b3VzOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuSW5saW5lR3JvdXAuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdyb3VwOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG5cdH0sXHJcblx0YmxvY2s6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVHcm91cDtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gTGFiZWxsZWRDb250cm9sICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGlubGluZSxcclxuXHRsYWJlbCxcclxuXHR0aXRsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgbGFiZWxDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLndyYXBwZXIsXHJcblx0XHRpbmxpbmUgJiYgY2xhc3Nlcy53cmFwcGVyX19pbmxpbmUsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGxhYmVsIHRpdGxlPXt0aXRsZX0gY2xhc3NOYW1lPXtsYWJlbENsYXNzTmFtZX0+XHJcblx0XHRcdDxpbnB1dCB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udHJvbCl9IC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMubGFiZWwpfT57bGFiZWx9PC9zcGFuPlxyXG5cdFx0PC9sYWJlbD5cclxuXHQpO1xyXG59O1xyXG5cclxuTGFiZWxsZWRDb250cm9sLnByb3BUeXBlcyA9IHtcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ2NoZWNrYm94JywgJ3JhZGlvJ10pLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsbGVkQ29udHJvbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHdyYXBwZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0fSxcclxuXHR3cmFwcGVyX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGNoZWNrYm94IG9yIHJhZGlvXHJcblx0Y29udHJvbDoge1xyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9TcGlubmVyJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24gKHsgY2hpbGRyZW4sIGxvYWRpbmcsIC4uLnByb3BzIH0pIHtcclxuXHQvLyBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgdmFyaWFudCBmb3IgdGhlIHNwaW5uZXIsXHJcblx0Ly8gZmlsbCBpcyB0aGUgZGVmYXVsdCB2YXJpYW50IG9uIEJ1dHRvblxyXG5cdGNvbnN0IHZhcmlhbnQgPSBwcm9wcy52YXJpYW50IHx8ICdmaWxsJztcclxuXHJcblx0Ly8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGNvbG9yIGZvciB0aGUgc3Bpbm5lcixcclxuXHQvLyBjYW5jZWwgYW5kIGRlbGV0ZSBhbGlhcyB0byBcImRhbmdlclwiXHJcblx0bGV0IGNvbG9yO1xyXG5cdGlmIChwcm9wcy5jb2xvciA9PT0gJ2NhbmNlbCcgfHwgcHJvcHMuY29sb3IgPT09ICdkZWxldGUnKSBjb2xvciA9ICdkYW5nZXInO1xyXG5cclxuXHQvLyBtZXJnZSBhbGwgdGhlIHZhcmlhbnQvY29sb3IgdG9nZXRoZXJcclxuXHRjb25zdCBmb3JtYXR0ZWRDb2xvciA9IHZhcmlhbnQgPT09ICdmaWxsJyAmJiBwcm9wcy5jb2xvciAhPT0gJ2RlZmF1bHQnXHJcblx0XHQ/ICdpbnZlcnRlZCdcclxuXHRcdDogY29sb3I7XHJcblxyXG5cdC8vIHJlbmRlciB0aGUgc3Bpbm5lciBpZiByZXF1aXJlZFxyXG5cdGNvbnN0IHNwaW5uZXIgPSBsb2FkaW5nICYmIChcclxuXHRcdDxTcGlubmVyXHJcblx0XHRcdHNpemU9XCJzbWFsbFwiXHJcblx0XHRcdGNvbG9yPXtmb3JtYXR0ZWRDb2xvcn1cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0Ly8gc2xpZGUgdGhlIHNwaW5uZXIgaW4gYW5kIG91dCBvZiB2aWV3XHJcblx0Y29uc3Qgc3Bpbm5lclN0eWxlcyA9IHtcclxuXHRcdHdpZHRoOiBsb2FkaW5nXHJcblx0XHRcdD8gKHRoZW1lLnNwaW5uZXIuc2l6ZS5zbWFsbCAqIDUgKyB0aGVtZS5zcGFjaW5nLnNtYWxsKVxyXG5cdFx0XHQ6IDAsXHJcblx0fTtcclxuXHJcblx0Ly8gcmVuZGVyIGFsbCB0aGF0IHNoaXRcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnNwaW5uZXIpfSBzdHlsZT17c3Bpbm5lclN0eWxlc30+XHJcblx0XHRcdFx0e3NwaW5uZXJ9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbkxvYWRpbmdCdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGxvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Mb2FkaW5nQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRsb2FkaW5nOiBmYWxzZSxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3Bpbm5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0QWxpZ246ICdsZWZ0JyxcclxuXHRcdHRyYW5zaXRpb246ICd3aWR0aCAyMDBtcyBlYXNlLW91dCcsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMb2FkaW5nQnV0dG9uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxCb2R5ICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdlxyXG5cdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmJvZHksIGNsYXNzTmFtZSl9XHJcblx0XHRcdHsuLi5wcm9wc31cclxuXHRcdC8+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Ym9keToge1xyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5LnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS52ZXJ0aWNhbCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEJvZHk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XG5pbXBvcnQgU2Nyb2xsTG9jayBmcm9tICcuLi9TY3JvbGxMb2NrJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi4vUG9ydGFsJztcblxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcblxuY29uc3QgY2FuVXNlRG9tID0gISEoXG5cdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxuXHQmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxuY2xhc3MgTW9kYWxEaWFsb2cgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuaGFuZGxlQmFja2Ryb3BDbGljayA9IHRoaXMuaGFuZGxlQmFja2Ryb3BDbGljay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCA9IHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dC5iaW5kKHRoaXMpO1xuXHR9XG5cdGdldENoaWxkQ29udGV4dCAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9uQ2xvc2U6IHRoaXMucHJvcHMub25DbG9zZSxcblx0XHR9O1xuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuXHRcdGlmICghY2FuVXNlRG9tKSByZXR1cm47XG5cblx0XHQvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9XG5cdFx0aWYgKCFuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1ldGhvZHNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0aGFuZGxlS2V5Ym9hcmRJbnB1dCAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHRoaXMucHJvcHMub25DbG9zZSgpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGhhbmRsZUJhY2tkcm9wQ2xpY2sgKGUpIHtcblx0XHRpZiAoZS50YXJnZXQgIT09IHRoaXMucmVmcy5jb250YWluZXIpIHJldHVybjtcblxuXHRcdHRoaXMucHJvcHMub25DbG9zZSgpO1xuXHR9XG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlcmVyc1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXJEaWFsb2cgKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWwsXG5cdFx0XHRjaGlsZHJlbixcblx0XHRcdGlzT3Blbixcblx0XHRcdHdpZHRoLFxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKCFpc09wZW4pIHJldHVybiA8c3BhbiBrZXk9XCJjbG9zZWRcIiAvPjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udGFpbmVyKX1cblx0XHRcdFx0a2V5PVwib3BlblwiXG5cdFx0XHRcdHJlZj1cImNvbnRhaW5lclwiXG5cdFx0XHRcdG9uQ2xpY2s9eyEhYmFja2Ryb3BDbG9zZXNNb2RhbCAmJiB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2t9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9eyEhYmFja2Ryb3BDbG9zZXNNb2RhbCAmJiB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2t9XG5cdFx0XHQ+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5kaWFsb2cpfSBzdHlsZT17eyB3aWR0aCB9fSBkYXRhLXNjcmVlbi1pZD1cIm1vZGFsLWRpYWxvZ1wiPlxuXHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxTY3JvbGxMb2NrIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxQb3J0YWw+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckRpYWxvZygpfVxuXHRcdFx0PC9Qb3J0YWw+XG5cdFx0KTtcblx0fVxufTtcblxuTW9kYWxEaWFsb2cucHJvcFR5cGVzID0ge1xuXHRiYWNrZHJvcENsb3Nlc01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcblx0ZW5hYmxlS2V5Ym9hcmRJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxufTtcbk1vZGFsRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcblx0ZW5hYmxlS2V5Ym9hcmRJbnB1dDogdHJ1ZSxcblx0d2lkdGg6IDc2OCxcbn07XG5Nb2RhbERpYWxvZy5jaGlsZENvbnRleHRUeXBlcyA9IHtcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IGNsYXNzZXMgPSB7XG5cdGNvbnRhaW5lcjoge1xuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubW9kYWwuYmFja2dyb3VuZCxcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94Jyxcblx0XHRkaXNwbGF5OiAnZmxleCcsXG5cdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0dG9wOiAwLFxuXHRcdHdpZHRoOiAnMTAwJScsXG5cdFx0ekluZGV4OiB0aGVtZS5tb2RhbC56SW5kZXgsXG5cdH0sXG5cdGRpYWxvZzoge1xuXHRcdG1heEhlaWdodDogJzkwJScsXG5cdFx0b3ZlcmZsb3c6ICdzY3JvbGwnLFxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLnZlcnRpY2FsLFxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcblx0XHRwYWRkaW5nVG9wOiAnNXB4Jyxcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsRGlhbG9nO1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsRm9vdGVyICh7XHJcblx0YWxpZ24sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZm9vdGVyLCBjbGFzc2VzWydhbGlnbl9fJyArIGFsaWduXSwgY2xhc3NOYW1lKX0gLz5cclxuXHQpO1xyXG59O1xyXG5cclxuTW9kYWxGb290ZXIucHJvcFR5cGVzID0ge1xyXG5cdGFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAnbGVmdCcsICdyaWdodCddKSxcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Nb2RhbEZvb3Rlci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0YWxpZ246ICdsZWZ0JyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Zm9vdGVyOiB7XHJcblx0XHRib3JkZXJUb3A6IGAycHggc29saWQgJHt0aGVtZS5jb2xvci5ncmF5MTB9YCxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuZm9vdGVyLnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZm9vdGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZm9vdGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci52ZXJ0aWNhbCxcclxuXHR9LFxyXG5cclxuXHQvLyBhbGlnbm1lbnRcclxuXHRhbGlnbl9fbGVmdDoge1xyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcclxuXHR9LFxyXG5cdGFsaWduX19jZW50ZXI6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHR9LFxyXG5cdGFsaWduX19yaWdodDoge1xyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxGb290ZXI7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBHbHlwaEJ1dHRvbiBmcm9tICcuLi9HbHlwaEJ1dHRvbic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEhlYWRlciAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRzaG93Q2xvc2VCdXR0b24sXHJcblx0dGV4dCxcclxuXHQuLi5wcm9wc1xyXG59LCB7XHJcblx0b25DbG9zZSxcclxufSkge1xyXG5cdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdGlmIChjaGlsZHJlbiAmJiB0ZXh0KSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBNb2RhbEhlYWRlciBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGB0ZXh0YC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmhlYWRlciwgY2xhc3NOYW1lKX0+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5ncm93KX0+XHJcblx0XHRcdFx0e3RleHQgPyAoXHJcblx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy50ZXh0KX0+XHJcblx0XHRcdFx0XHRcdHt0ZXh0fVxyXG5cdFx0XHRcdFx0PC9oND5cclxuXHRcdFx0XHQpIDogY2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHR7ISFvbkNsb3NlICYmIHNob3dDbG9zZUJ1dHRvbiAmJiAoXHJcblx0XHRcdFx0PEdseXBoQnV0dG9uXHJcblx0XHRcdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuY2xvc2V9XHJcblx0XHRcdFx0XHRjb2xvcj1cImNhbmNlbFwiXHJcblx0XHRcdFx0XHRnbHlwaD1cInhcIlxyXG5cdFx0XHRcdFx0b25DbGljaz17b25DbG9zZX1cclxuXHRcdFx0XHRcdHZhcmlhbnQ9XCJsaW5rXCJcclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQpfVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbk1vZGFsSGVhZGVyLnByb3BUeXBlcyA9IHtcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Nb2RhbEhlYWRlci5jb250ZXh0VHlwZXMgPSB7XHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0aGVhZGVyOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGJvcmRlckJvdHRvbTogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9yLmdyYXkxMH1gLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5oZWFkZXIudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5oZWFkZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5oZWFkZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLnZlcnRpY2FsLFxyXG5cdH0sXHJcblxyXG5cdC8vIGZpbGwgc3BhY2UgdG8gcHVzaCB0aGUgY2xvc2UgYnV0dG9uIHJpZ2h0XHJcblx0Z3Jvdzoge1xyXG5cdFx0ZmxleEdyb3c6IDEsXHJcblx0fSxcclxuXHJcblx0Ly8gdGl0bGUgdGV4dFxyXG5cdHRleHQ6IHtcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0XHRmb250U2l6ZTogMTgsXHJcblx0XHRmb250V2VpZ2h0OiA1MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAxLFxyXG5cdFx0bWFyZ2luOiAwLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsSGVhZGVyO1xyXG4iLCJpbXBvcnQgQm9keSBmcm9tICcuL2JvZHknO1xyXG5pbXBvcnQgRGlhbG9nIGZyb20gJy4vZGlhbG9nJztcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL2Zvb3Rlcic7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9oZWFkZXInO1xyXG5cclxuZXhwb3J0IHtcclxuXHRCb2R5LFxyXG5cdERpYWxvZyxcclxuXHRGb290ZXIsXHJcblx0SGVhZGVyLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQYWdlIGZyb20gJy4vcGFnZSc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXJDb3VudCAoKSB7XHJcblx0XHRsZXQgY291bnQgPSAnJztcclxuXHRcdGNvbnN0IHsgY3VycmVudFBhZ2UsIHBhZ2VTaXplLCBwbHVyYWwsIHNpbmd1bGFyLCB0b3RhbCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGlmICghdG90YWwpIHtcclxuXHRcdFx0Y291bnQgPSAnTm8gJyArIChwbHVyYWwgfHwgJ3JlY29yZHMnKTtcclxuXHRcdH0gZWxzZSBpZiAodG90YWwgPiBwYWdlU2l6ZSkge1xyXG5cdFx0XHRsZXQgc3RhcnQgPSAocGFnZVNpemUgKiAoY3VycmVudFBhZ2UgLSAxKSkgKyAxO1xyXG5cdFx0XHRsZXQgZW5kID0gTWF0aC5taW4oc3RhcnQgKyBwYWdlU2l6ZSAtIDEsIHRvdGFsKTtcclxuXHRcdFx0Y291bnQgPSBgU2hvd2luZyAke3N0YXJ0fSB0byAke2VuZH0gb2YgJHt0b3RhbH1gO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y291bnQgPSAnU2hvd2luZyAnICsgdG90YWw7XHJcblx0XHRcdGlmICh0b3RhbCA+IDEgJiYgcGx1cmFsKSB7XHJcblx0XHRcdFx0Y291bnQgKz0gJyAnICsgcGx1cmFsO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRvdGFsID09PSAxICYmIHNpbmd1bGFyKSB7XHJcblx0XHRcdFx0Y291bnQgKz0gJyAnICsgc2luZ3VsYXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb3VudCl9IGRhdGEtZTJlLXBhZ2luYXRpb24tY291bnQ+e2NvdW50fTwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcblx0cmVuZGVyUGFnZXMgKCkge1xyXG5cdFx0Y29uc3QgeyBjdXJyZW50UGFnZSwgbGltaXQsIG9uUGFnZVNlbGVjdCwgcGFnZVNpemUsIHRvdGFsIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmICh0b3RhbCA8PSBwYWdlU2l6ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0bGV0IHBhZ2VzID0gW107XHJcblx0XHRsZXQgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbCAvIHBhZ2VTaXplKTtcclxuXHRcdGxldCBtaW5QYWdlID0gMTtcclxuXHRcdGxldCBtYXhQYWdlID0gdG90YWxQYWdlcztcclxuXHJcblx0XHRpZiAobGltaXQgJiYgKGxpbWl0IDwgdG90YWxQYWdlcykpIHtcclxuXHRcdFx0bGV0IHJpZ2h0TGltaXQgPSBNYXRoLmZsb29yKGxpbWl0IC8gMik7XHJcblx0XHRcdGxldCBsZWZ0TGltaXQgPSByaWdodExpbWl0ICsgKGxpbWl0ICUgMikgLSAxO1xyXG5cdFx0XHRtaW5QYWdlID0gY3VycmVudFBhZ2UgLSBsZWZ0TGltaXQ7XHJcblx0XHRcdG1heFBhZ2UgPSBjdXJyZW50UGFnZSArIHJpZ2h0TGltaXQ7XHJcblxyXG5cdFx0XHRpZiAobWluUGFnZSA8IDEpIHtcclxuXHRcdFx0XHRtYXhQYWdlID0gbGltaXQ7XHJcblx0XHRcdFx0bWluUGFnZSA9IDE7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG1heFBhZ2UgPiB0b3RhbFBhZ2VzKSB7XHJcblx0XHRcdFx0bWluUGFnZSA9IHRvdGFsUGFnZXMgLSBsaW1pdCArIDE7XHJcblx0XHRcdFx0bWF4UGFnZSA9IHRvdGFsUGFnZXM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChtaW5QYWdlID4gMSkge1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT1cInBhZ2Vfc3RhcnRcIiBvbkNsaWNrPXsoKSA9PiBvblBhZ2VTZWxlY3QoMSl9Pi4uLjwvUGFnZT4pO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgcGFnZSA9IG1pblBhZ2U7IHBhZ2UgPD0gbWF4UGFnZTsgcGFnZSsrKSB7XHJcblx0XHRcdGxldCBzZWxlY3RlZCA9IChwYWdlID09PSBjdXJyZW50UGFnZSk7XHJcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT17J3BhZ2VfJyArIHBhZ2V9IHNlbGVjdGVkPXtzZWxlY3RlZH0gb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KHBhZ2UpfT57cGFnZX08L1BhZ2U+KTtcclxuXHRcdFx0LyogZXNsaW50LWVuYWJsZSAqL1xyXG5cdFx0fVxyXG5cdFx0aWYgKG1heFBhZ2UgPCB0b3RhbFBhZ2VzKSB7XHJcblx0XHRcdHBhZ2VzLnB1c2goPFBhZ2Uga2V5PVwicGFnZV9lbmRcIiBvbkNsaWNrPXsoKSA9PiBvblBhZ2VTZWxlY3QodG90YWxQYWdlcyl9Pi4uLjwvUGFnZT4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmxpc3QpfT5cclxuXHRcdFx0XHR7cGFnZXN9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLmNvbnRhaW5lciwgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckNvdW50KCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyUGFnZXMoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsXHJcblx0XHRtYXJnaW5Cb3R0b206ICcyZW0nLFxyXG5cdH0sXHJcblx0Y291bnQ6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luUmlnaHQ6ICcxZW0nLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxuXHRsaXN0OiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5QYWdpbmF0aW9uLnByb3BUeXBlcyA9IHtcclxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Y3VycmVudFBhZ2U6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRvblBhZ2VTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0cGx1cmFsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNpbmd1bGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdHRvdGFsOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2luYXRpb247XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBQYWdlICh7XHJcblx0ZGlzYWJsZWQsXHJcblx0c2VsZWN0ZWQsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMucGFnZSxcclxuXHRcdCEhZGlzYWJsZWQgJiYgY2xhc3Nlcy5kaXNhYmxlZCxcclxuXHRcdCEhc2VsZWN0ZWQgJiYgY2xhc3Nlcy5zZWxlY3RlZFxyXG5cdCk7XHJcblx0cmV0dXJuIChcclxuXHRcdDxidXR0b24gey4uLnByb3BzfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5QYWdlLnByb3BUeXBlcyA9IHtcclxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0b25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5jb25zdCBzZWxlY3RlZFN0eWxlID0ge1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5iYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLnNlbGVjdGVkLmJvcmRlcixcclxuXHRjb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5jb2xvcixcclxuXHRjdXJzb3I6ICdkZWZhdWx0JyxcclxuXHR6SW5kZXg6IDIsXHJcbn07XHJcbmNvbnN0IHBzZXVkb1N0eWxlID0ge1xyXG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5iYWNrZ3JvdW5kLFxyXG5cdGJvcmRlckNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmhvdmVyLmJvcmRlcixcclxuXHRjb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5jb2xvcixcclxuXHRvdXRsaW5lOiAnbm9uZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHBhZ2U6IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcclxuXHRcdGJvcmRlcjogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uY29sb3IsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0ZmxvYXQ6ICdsZWZ0JywgLy8gQ29sbGFwc2Ugd2hpdGUtc3BhY2VcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC4yNWVtJyxcclxuXHRcdHBhZGRpbmc6ICcwIC43ZW0nLFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cclxuXHRcdC8vIGhhbmRsZSBob3ZlciBhbmQgZm9jdXNcclxuXHRcdCc6aG92ZXInOiBwc2V1ZG9TdHlsZSxcclxuXHRcdCc6Zm9jdXMnOiBwc2V1ZG9TdHlsZSxcclxuXHR9LFxyXG5cclxuXHQvLyBzZWxlY3RlZCBwYWdlXHJcblx0c2VsZWN0ZWQ6IHtcclxuXHRcdC4uLnNlbGVjdGVkU3R5bGUsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHNlbGVjdGVkU3R5bGUsXHJcblx0XHQnOmZvY3VzJzogc2VsZWN0ZWRTdHlsZSxcclxuXHR9LFxyXG5cclxuXHQvLyBkaXNhYmxlZCBwYWdlXHJcblxyXG5cdGRpc2FibGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuYmFja2dyb3VuZCxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmJhY2tncm91bmQsXHJcblx0XHRjb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5jb2xvcixcclxuXHRcdGN1cnNvcjogJ2RlZmF1bHQnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlO1xyXG4iLCJpbXBvcnQgeyBDaGlsZHJlbiwgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyBQYXNzIHRoZSBMaWdodGJveCBjb250ZXh0IHRocm91Z2ggdG8gdGhlIFBvcnRhbCdzIGRlc2NlbmRlbnRzXHJcbi8vIFN0YWNrT3ZlcmZsb3cgZGlzY3Vzc2lvbiBodHRwOi8vZ29vLmdsL29jbHJKOVxyXG5cclxuY2xhc3MgUGFzc0NvbnRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XHJcblx0fVxyXG59O1xyXG5cclxuUGFzc0NvbnRleHQucHJvcFR5cGVzID0ge1xyXG5cdGNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxufTtcclxuUGFzc0NvbnRleHQuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXNzQ29udGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgUGFzc0NvbnRleHQgZnJvbSAnLi4vUGFzc0NvbnRleHQnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IG51bGw7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBwO1xyXG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkVXBkYXRlICgpIHtcclxuXHRcdC8vIEFuaW1hdGUgZmFkZSBvbiBtb3VudC91bm1vdW50XHJcblx0XHRjb25zdCBkdXJhdGlvbiA9IDIwMDtcclxuXHRcdGNvbnN0IHN0eWxlcyA9IGBcclxuXHRcdFx0XHQuZmFkZS1lbnRlciB7IG9wYWNpdHk6IDAuMDE7IH1cclxuXHRcdFx0XHQuZmFkZS1lbnRlci5mYWRlLWVudGVyLWFjdGl2ZSB7IG9wYWNpdHk6IDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxyXG5cdFx0XHRcdC5mYWRlLWxlYXZlIHsgb3BhY2l0eTogMTsgfVxyXG5cdFx0XHRcdC5mYWRlLWxlYXZlLmZhZGUtbGVhdmUtYWN0aXZlIHsgb3BhY2l0eTogMC4wMTsgdHJhbnNpdGlvbjogb3BhY2l0eSAke2R1cmF0aW9ufW1zOyB9XHJcblx0XHRgO1xyXG5cdFx0cmVuZGVyKFxyXG5cdFx0XHQ8UGFzc0NvbnRleHQgY29udGV4dD17dGhpcy5jb250ZXh0fT5cclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PHN0eWxlPntzdHlsZXN9PC9zdHlsZT5cclxuXHRcdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHRcdGNvbXBvbmVudD1cImRpdlwiXHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPVwiZmFkZVwiXHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9e2R1cmF0aW9ufVxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXtkdXJhdGlvbn1cclxuXHRcdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L1Bhc3NDb250ZXh0PixcclxuXHRcdFx0dGhpcy5wb3J0YWxFbGVtZW50XHJcblx0XHQpO1xyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcblBvcnRhbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFVzaW5nIHdpbmRvdy5pbm5lcldpZHRoIGFuZCBzdGF0ZSBpbnN0ZWFkIG9mIENTUyBtZWRpYSBicmVha3BvaW50c1xyXG4vLyBiZWNhdXNlIHdlIHdhbnQgdG8gcmVuZGVyIG51bGwgcmF0aGVyIHRoYW4gYW4gZW1wdHkgc3Bhbi4gQWxsb3dpbmcgZm9yXHJcbi8vIENTUyBwc2V1ZG8gY2xhc3NlcyBsaWtlIDpvbmx5LWNoaWxkIHRvIGJlaGF2ZSBhcyBleHBlY3RlZC5cclxuXHJcbi8vIFJldHVybiB0cnVlIGlmIHdpbmRvdyArIGRvY3VtZW50XHJcbmNvbnN0IGNhblVzZURPTSA9ICEhKFxyXG5cdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXHJcblx0JiYgd2luZG93LmRvY3VtZW50XHJcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcclxuKTtcclxuXHJcbmNsYXNzIFJlc3BvbnNpdmVUZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUgPSB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0d2luZG93V2lkdGg6IGNhblVzZURPTSA/IHdpbmRvdy5pbm5lcldpZHRoIDogMCxcclxuXHRcdH07XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGlmIChjYW5Vc2VET00pIHtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuXHRcdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYgKGNhblVzZURPTSkge1xyXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRoYW5kbGVSZXNpemUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHdpbmRvd1dpZHRoOiBjYW5Vc2VET00gPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDAsXHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0XHRcdGhpZGRlbkxHLFxyXG5cdFx0XHRoaWRkZW5NRCxcclxuXHRcdFx0aGlkZGVuU00sXHJcblx0XHRcdGhpZGRlblhTLFxyXG5cdFx0XHR2aXNpYmxlTEcsXHJcblx0XHRcdHZpc2libGVNRCxcclxuXHRcdFx0dmlzaWJsZVNNLFxyXG5cdFx0XHR2aXNpYmxlWFMsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgd2luZG93V2lkdGggfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0bGV0IHRleHQ7XHJcblxyXG5cdFx0Ly8gc2V0IHRleHQgdmFsdWUgZnJvbSBicmVha3BvaW50OyBhdHRlbXB0IFhTIC0tPiBMR1xyXG5cdFx0aWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlKSB7XHJcblx0XHRcdHRleHQgPSB2aXNpYmxlWFMgfHwgaGlkZGVuU00gfHwgaGlkZGVuTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0UG9ydHJhaXQpIHtcclxuXHRcdFx0dGV4dCA9IGhpZGRlblhTIHx8IHZpc2libGVTTSB8fCBoaWRkZW5NRCB8fCBoaWRkZW5MRztcclxuXHRcdH0gZWxzZSBpZiAod2luZG93V2lkdGggPCB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUpIHtcclxuXHRcdFx0dGV4dCA9IGhpZGRlblhTIHx8IGhpZGRlblNNIHx8IHZpc2libGVNRCB8fCBoaWRkZW5MRztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCBoaWRkZW5TTSB8fCBoaWRkZW5NRCB8fCB2aXNpYmxlTEc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRleHQgPyA8Q29tcG9uZW50IHsuLi5wcm9wc30+e3RleHR9PC9Db21wb25lbnQ+IDogbnVsbDtcclxuXHR9XHJcbn07XHJcblxyXG5SZXNwb25zaXZlVGV4dC5wcm9wVHlwZXMgPSB7XHJcblx0aGlkZGVuTEc6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aGlkZGVuTUQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aGlkZGVuU006IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aGlkZGVuWFM6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZUxHOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVNRDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlU006IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZVhTOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5SZXNwb25zaXZlVGV4dC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnc3BhbicsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNpdmVUZXh0O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuZnVuY3Rpb24gU2NyZWVuUmVhZGVyT25seSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5zck9ubHksIGNsYXNzTmFtZSk7XHJcblxyXG5cdHJldHVybiA8c3BhbiB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRzck9ubHk6IHtcclxuXHRcdGJvcmRlcjogMCxcclxuXHRcdGNsaXA6ICdyZWN0KDAsMCwwLDApJyxcclxuXHRcdGhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogLTEsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHRwYWRkaW5nOiAwLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5SZWFkZXJPbmx5O1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxMb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5sb2NrQ291bnQgPSAwO1xyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsTW91bnQgKCkge1xyXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5sb2NrQ291bnQrKztcclxuXHRcdGlmICh0aGlzLmxvY2tDb3VudCA+IDEpIHJldHVybjtcclxuXHJcblx0XHQvL1x0RklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3Qgc2Nyb2xsQmFyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblxyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9IHNjcm9sbEJhcldpZHRoICsgJ3B4JztcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmxvY2tDb3VudCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubG9ja0NvdW50LS07XHJcblx0XHRpZiAodGhpcy5sb2NrQ291bnQgPiAwKSByZXR1cm47IC8vIFN0aWxsIGxvY2tlZFxyXG5cclxuXHRcdC8vXHRGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuXHRcdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJyc7XHJcblxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdGRlZmF1bHQ6IHRoZW1lLmNvbG9yLmdyYXk4MCxcclxuXHRlcnJvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdGluZm86IHRoZW1lLmNvbG9yLmluZm8sXHJcblx0cHJpbWFyeTogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG5mdW5jdGlvbiBTZWdtZW50ZWRDb250cm9sICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbG9yLFxyXG5cdGNyb3BUZXh0LFxyXG5cdGVxdWFsV2lkdGhTZWdtZW50cyxcclxuXHRpbmxpbmUsXHJcblx0b25DaGFuZ2UsXHJcblx0b3B0aW9ucyxcclxuXHR2YWx1ZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250cm9sLFxyXG5cdFx0aW5saW5lID8gY2xhc3Nlcy5jb250cm9sX19pbmxpbmUgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0e29wdGlvbnMubWFwKChvcHQpID0+IHtcclxuXHRcdFx0XHRjb25zdCBidXR0b25DbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdFx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdFx0XHRcdG9wdC5kaXNhYmxlZCA/IGNsYXNzZXMuYnV0dG9uX19kaXNhYmxlZCA6IG51bGwsXHJcblx0XHRcdFx0XHRvcHQudmFsdWUgPT09IHZhbHVlID8gY2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3JdIDogbnVsbCxcclxuXHRcdFx0XHRcdGNyb3BUZXh0ID8gY2xhc3Nlcy5idXR0b25fX2Nyb3BUZXh0IDogbnVsbCxcclxuXHRcdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50cyA/IGNsYXNzZXMuYnV0dG9uX19lcXVhbFdpZHRoIDogbnVsbFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17YnV0dG9uQ2xhc3NOYW1lfVxyXG5cdFx0XHRcdFx0XHRrZXk9e29wdC52YWx1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17IW9wdC5kaXNhYmxlZCAmJiAoKCkgPT4gb25DaGFuZ2Uob3B0LnZhbHVlKSl9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdFx0XHR0aXRsZT17Y3JvcFRleHQgPyBvcHQubGFiZWwgOiBudWxsfVxyXG5cdFx0XHRcdFx0XHR0YWJJbmRleD17b3B0LmRpc2FibGVkID8gJy0xJyA6ICcnfVxyXG5cdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdHtvcHQubGFiZWx9XHJcblx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KX1cclxuXHRcdDwvZGl2Pik7XHJcbn07XHJcblxyXG5jb25zdCB2YWx1ZVByb3BTaGFwZSA9IFtcclxuXHRQcm9wVHlwZXMuYm9vbCxcclxuXHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFByb3BUeXBlcy5zdHJpbmcsXHJcbl07XHJcblxyXG5TZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hlbiBgaW5saW5lICYmIGVxdWFsV2lkdGhTZWdtZW50c2AgY3JvcHMgdG8gdGhlIG5leHQgbGFyZ2VzdCBvcHRpb24gbGVuZ3RoXHJcblx0ZXF1YWxXaWR0aFNlZ21lbnRzOiBQcm9wVHlwZXMuYm9vbCwgLy8gb25seSByZWxldmFudCB3aGVuIGBpbmxpbmUgPT09IGZhbHNlYFxyXG5cdGlubGluZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRcdGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZSh2YWx1ZVByb3BTaGFwZSksXHJcblx0XHR9KVxyXG5cdCkuaXNSZXF1aXJlZCxcclxuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZSh2YWx1ZVByb3BTaGFwZSksXHJcbn07XHJcblNlZ21lbnRlZENvbnRyb2wuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlZ21lbnRlZENvbnRyb2w7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTZWdtZW50ZWQgQ29udHJvbFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29uc3QgcHNldWRvU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0fTtcclxuXHRjb2xvclZhcmlhbnRzWydidXR0b25fXycgKyBjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHJcblx0XHQnOmhvdmVyJzogcHNldWRvU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IHBzZXVkb1N0eWxlcyxcclxuXHRcdCc6YWN0aXZlJzogcHNldWRvU3R5bGVzLFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udHJvbDoge1xyXG5cdFx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdGJvcmRlclJhZGl1czogJzAuNGVtJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0XHRwYWRkaW5nTGVmdDogMSxcclxuXHRcdHBhZGRpbmdSaWdodDogMSxcclxuXHR9LFxyXG5cdGNvbnRyb2xfX2lubGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1mbGV4JyxcclxuXHR9LFxyXG5cclxuXHQvLyBidXR0b25zXHJcblx0YnV0dG9uOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcwLjI1ZW0nLFxyXG5cdFx0ZmxleEdyb3c6IDEsXHJcblx0XHRtYXJnaW46ICcycHggMXB4JyxcclxuXHRcdHBhZGRpbmc6ICcwLjNlbSAwLjllbScsXHJcblx0XHRvdXRsaW5lOiAwLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4wNSknIH0sXHJcblx0XHQnOmZvY3VzJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyB9LFxyXG5cdFx0JzphY3RpdmUnOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4xKScgfSxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fZXF1YWxXaWR0aDoge1xyXG5cdFx0ZmxleDogJzEgMSAwJyxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fY3JvcFRleHQ6IHtcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcclxuXHRcdHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG5cdH0sXHJcblx0YnV0dG9uX19kaXNhYmxlZDoge1xyXG5cdFx0b3BhY2l0eTogMC42LFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gWydkYW5nZXInLCAnZGVmYXVsdCcsICdpbnZlcnRlZCcsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZyddO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBTY3JlZW5SZWFkZXJPbmx5IGZyb20gJy4uL1NjcmVlblJlYWRlck9ubHknO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuZnVuY3Rpb24gU3Bpbm5lciAoeyBjbGFzc05hbWUsIHNpemUsIGNvbG9yLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5iYXNlLFxyXG5cdFx0Y2xhc3Nlc1tzaXplXSxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YCR7Y3NzKGNsYXNzZXMuZG90LCBjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLCBjbGFzc2VzLmRvdF9fZmlyc3QpfWB9IC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YCR7Y3NzKGNsYXNzZXMuZG90LCBjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLCBjbGFzc2VzLmRvdF9fc2Vjb25kKX1gfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX3RoaXJkKX1gfSAvPlxyXG5cdFx0XHQ8U2NyZWVuUmVhZGVyT25seT5Mb2FkaW5nLi4uPC9TY3JlZW5SZWFkZXJPbmx5PlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcblNwaW5uZXIucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoY29sb3JzKSxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2Yoc2l6ZXMpLFxyXG59O1xyXG5TcGlubmVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRzaXplOiAnbWVkaXVtJyxcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcGlubmVyO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFsnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ107XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTcGlubmVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuY29sb3JzLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbYGNvbG9yX18ke2NvbG9yfWBdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5zcGlubmVyLmNvbG9yW2NvbG9yXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbnNpemVzLmZvckVhY2goc2l6ZSA9PiB7XHJcblx0c2l6ZVZhcmlhbnRzW2BzaXplX18ke3NpemV9YF0gPSB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuc3Bpbm5lci5zaXplW3NpemVdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gRGVjbGFyZSBhbmltYXRpb24ga2V5ZnJhbWVzXHJcblxyXG5jb25zdCBrZXlmcmFtZXMgPSBjb21wb3NlLmtleWZyYW1lcygncHVsc2UnLCB7XHJcblx0JzAlLCA4MCUsIDEwMCUnOiB7IG9wYWNpdHk6IDAgfSxcclxuXHQnNDAlJzogeyBvcGFjaXR5OiAxIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YmFzZToge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRsaW5lSGVpZ2h0OiAxLFxyXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0d2lkdGg6ICc1ZW0nLFxyXG5cdH0sXHJcblx0c21hbGw6XHR7IGZvbnRTaXplOiA0IH0sXHJcblx0bWVkaXVtOlx0eyBmb250U2l6ZTogOCB9LFxyXG5cdGxhcmdlOlx0eyBmb250U2l6ZTogMTYgfSxcclxuXHJcblx0Ly8gdGV4dFxyXG5cdHRleHQ6IHtcclxuXHRcdGJvcmRlcjogMCxcclxuXHRcdGNsaXA6ICdyZWN0KDAsMCwwLDApJyxcclxuXHRcdGhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogLTEsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHRwYWRkaW5nOiAwLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG5cclxuXHQvLyBkb3RzXHJcblx0ZG90OiB7XHJcblx0XHRhbmltYXRpb25OYW1lOiBrZXlmcmFtZXMsXHJcblx0XHRhbmltYXRpb25EdXJhdGlvbjogJzFzJyxcclxuXHRcdGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiAnaW5maW5pdGUnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMWVtJyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAnMWVtJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnLFxyXG5cdFx0d2lkdGg6ICcxZW0nLFxyXG5cdH0sXHJcblx0ZG90X19zZWNvbmQ6IHtcclxuXHRcdGFuaW1hdGlvbkRlbGF5OiAnMTYwbXMnLFxyXG5cdFx0bWFyZ2luTGVmdDogJzFlbScsXHJcblx0fSxcclxuXHRkb3RfX3RoaXJkOiB7XHJcblx0XHRhbmltYXRpb25EZWxheTogJzMyMG1zJyxcclxuXHRcdG1hcmdpbkxlZnQ6ICcxZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIENvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcblxyXG5cdC8vIFNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRBbGVydDogcmVxdWlyZSgnLi9BbGVydCcpLFxyXG5cdEJsYW5rU3RhdGU6IHJlcXVpcmUoJy4vQmxhbmtTdGF0ZScpLFxyXG5cdEJ1dHRvbjogcmVxdWlyZSgnLi9CdXR0b24nKSxcclxuXHRDZW50ZXI6IHJlcXVpcmUoJy4vQ2VudGVyJyksXHJcblx0Q2hpcDogcmVxdWlyZSgnLi9DaGlwJyksXHJcblx0Q29udGFpbmVyOiByZXF1aXJlKCcuL0NvbnRhaW5lcicpLFxyXG5cdERyb3Bkb3duQnV0dG9uOiByZXF1aXJlKCcuL0Ryb3Bkb3duQnV0dG9uJyksXHJcblx0Rm9ybTogcmVxdWlyZSgnLi9Gb3JtJyksXHJcblx0Rm9ybUZpZWxkOiByZXF1aXJlKCcuL0Zvcm1GaWVsZCcpLFxyXG5cdEZvcm1JbnB1dDogcmVxdWlyZSgnLi9Gb3JtSW5wdXQnKSxcclxuXHRGb3JtTGFiZWw6IHJlcXVpcmUoJy4vRm9ybUxhYmVsJyksXHJcblx0Rm9ybU5vdGU6IHJlcXVpcmUoJy4vRm9ybU5vdGUnKSxcclxuXHRGb3JtU2VsZWN0OiByZXF1aXJlKCcuL0Zvcm1TZWxlY3QnKSxcclxuXHRHbHlwaDogcmVxdWlyZSgnLi9HbHlwaCcpLFxyXG5cdEdseXBoQnV0dG9uOiByZXF1aXJlKCcuL0dseXBoQnV0dG9uJyksXHJcblx0R2x5cGhGaWVsZDogcmVxdWlyZSgnLi9HbHlwaEZpZWxkJyksXHJcblx0R3JpZDogcmVxdWlyZSgnLi9HcmlkJyksXHJcblx0SW5saW5lR3JvdXA6IHJlcXVpcmUoJy4vSW5saW5lR3JvdXAnKSxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb246IHJlcXVpcmUoJy4vSW5saW5lR3JvdXBTZWN0aW9uJyksXHJcblx0TGFiZWxsZWRDb250cm9sOiByZXF1aXJlKCcuL0xhYmVsbGVkQ29udHJvbCcpLFxyXG5cdExvYWRpbmdCdXR0b246IHJlcXVpcmUoJy4vTG9hZGluZ0J1dHRvbicpLFxyXG5cdE1vZGFsOiByZXF1aXJlKCcuL01vZGFsJyksXHJcblx0UGFnaW5hdGlvbjogcmVxdWlyZSgnLi9QYWdpbmF0aW9uJyksXHJcblx0UmVzcG9uc2l2ZVRleHQ6IHJlcXVpcmUoJy4vUmVzcG9uc2l2ZVRleHQnKSxcclxuXHRTY3JlZW5SZWFkZXJPbmx5OiByZXF1aXJlKCcuL1NjcmVlblJlYWRlck9ubHknKSxcclxuXHRTZWdtZW50ZWRDb250cm9sOiByZXF1aXJlKCcuL1NlZ21lbnRlZENvbnRyb2wnKSxcclxuXHRTcGlubmVyOiByZXF1aXJlKCcuL1NwaW5uZXInKSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IHsgdXBjYXNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RyaW5nJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHJlbmRlcnMgYWxlcnRzIGZvciBBUEkgc3VjY2VzcyBhbmQgZXJyb3IgcmVzcG9uc2VzLlxyXG4gKiAgIEVycm9yIGZvcm1hdDoge1xyXG4gKiAgICAgZXJyb3I6ICd2YWxpZGF0aW9uIGVycm9ycycgLy8gVGhlIHVuaXF1ZSBlcnJvciB0eXBlIGlkZW50aWZpZXJcclxuICogICAgIGRldGFpbDogeyAuLi4gfSAvLyBPcHRpb25hbCBkZXRhaWxzIHNwZWNpZmljIHRvIHRoYXQgZXJyb3IgdHlwZVxyXG4gKiAgIH1cclxuICogICBTdWNjZXNzIGZvcm1hdDoge1xyXG4gKiAgICAgc3VjY2VzczogJ2l0ZW0gdXBkYXRlZCcsIC8vIFRoZSB1bmlxdWUgc3VjY2VzcyB0eXBlIGlkZW50aWZpZXJcclxuICogICAgIGRldGFpbHM6IHsgLi4uIH0gLy8gT3B0aW9uYWwgZGV0YWlscyBzcGVjaWZpYyB0byB0aGF0IHN1Y2Nlc3MgdHlwZVxyXG4gKiAgIH1cclxuICogICBFdmVudHVhbGx5IHN1Y2Nlc3MgYW5kIGVycm9yIHJlc3BvbnNlcyBzaG91bGQgYmUgaGFuZGxlZCBpbmRpdmlkdWFsbHlcclxuICogICBiYXNlZCBvbiB0aGVpciB0eXBlLiBGb3IgZXhhbXBsZTogdmFsaWRhdGlvbiBlcnJvcnMgc2hvdWxkIGJlIGRpc3BsYXllZCBuZXh0XHJcbiAqICAgdG8gZWFjaCBpbnZhbGlkIGZpZWxkIGFuZCBzaWduaW4gZXJyb3JzIHNob3VsZCBwcm9tdCB0aGUgdXNlciB0byBzaWduIGluLlxyXG4gKi9cclxudmFyIEFsZXJ0TWVzc2FnZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdBbGVydE1lc3NhZ2VzJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGFsZXJ0czogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZXJyb3I6IFJlYWN0LlByb3BUeXBlcy5PYmplY3QsXHJcblx0XHRcdHN1Y2Nlc3M6IFJlYWN0LlByb3BUeXBlcy5PYmplY3QsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhbGVydHM6IHt9LFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbGlkYXRpb25FcnJvcnMgKCkge1xyXG5cdFx0bGV0IGVycm9ycyA9IHRoaXMucHJvcHMuYWxlcnRzLmVycm9yLmRldGFpbDtcclxuXHRcdGlmIChlcnJvcnMubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuXHRcdFx0ZXJyb3JzID0gZXJyb3JzLmVycm9ycztcclxuXHRcdH1cclxuXHRcdGxldCBlcnJvckNvdW50ID0gT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGg7XHJcblx0XHRsZXQgYWxlcnRDb250ZW50O1xyXG5cdFx0bGV0IG1lc3NhZ2VzID0gT2JqZWN0LmtleXMoZXJyb3JzKS5tYXAoKHBhdGgpID0+IHtcclxuXHRcdFx0aWYgKGVycm9yQ291bnQgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxsaSBrZXk9e3BhdGh9PlxyXG5cdFx0XHRcdFx0XHR7dXBjYXNlKGVycm9yc1twYXRoXS5lcnJvciB8fCBlcnJvcnNbcGF0aF0ubWVzc2FnZSl9XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxkaXYga2V5PXtwYXRofT5cclxuXHRcdFx0XHRcdFx0e3VwY2FzZShlcnJvcnNbcGF0aF0uZXJyb3IgfHwgZXJyb3JzW3BhdGhdLm1lc3NhZ2UpfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGVycm9yQ291bnQgPiAxKSB7XHJcblx0XHRcdGFsZXJ0Q29udGVudCA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGg0PlRoZXJlIHdlcmUge2Vycm9yQ291bnR9IGVycm9ycyBjcmVhdGluZyB0aGUgbmV3IGl0ZW06PC9oND5cclxuXHRcdFx0XHRcdDx1bD57bWVzc2FnZXN9PC91bD5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFsZXJ0Q29udGVudCA9IG1lc3NhZ2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiA8QWxlcnQgY29sb3I9XCJkYW5nZXJcIj57YWxlcnRDb250ZW50fTwvQWxlcnQ+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGxldCB7IGVycm9yLCBzdWNjZXNzIH0gPSB0aGlzLnByb3BzLmFsZXJ0cztcclxuXHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHQvLyBSZW5kZXIgZXJyb3IgYWxlcnRzXHJcblx0XHRcdHN3aXRjaCAoZXJyb3IuZXJyb3IpIHtcclxuXHRcdFx0XHRjYXNlICd2YWxpZGF0aW9uIGVycm9ycyc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJWYWxpZGF0aW9uRXJyb3JzKCk7XHJcblx0XHRcdFx0Y2FzZSAnZXJyb3InOlxyXG5cdFx0XHRcdFx0aWYgKGVycm9yLmRldGFpbC5uYW1lID09PSAnVmFsaWRhdGlvbkVycm9yJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJWYWxpZGF0aW9uRXJyb3JzKCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e3VwY2FzZShlcnJvci5lcnJvcil9PC9BbGVydD47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiA8QWxlcnQgY29sb3I9XCJkYW5nZXJcIj57dXBjYXNlKGVycm9yLmVycm9yKX08L0FsZXJ0PjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdC8vIFJlbmRlciBzdWNjZXNzIGFsZXJ0c1xyXG5cdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwic3VjY2Vzc1wiPnt1cGNhc2Uoc3VjY2Vzcy5zdWNjZXNzKX08L0FsZXJ0PjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDsgLy8gTm8gYWxlcnRzLCByZW5kZXIgbm90aGluZ1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbGVydE1lc3NhZ2VzO1xyXG4iLCIvKipcclxuICogVGhlIGZvcm0gdGhhdCdzIHZpc2libGUgd2hlbiBcIkNyZWF0ZSA8SXRlbU5hbWU+XCIgaXMgY2xpY2tlZCBvbiBlaXRoZXIgdGhlXHJcbiAqIExpc3Qgc2NyZWVuIG9yIHRoZSBJdGVtIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCB2a2V5IGZyb20gJ3ZrZXknO1xyXG5pbXBvcnQgQWxlcnRNZXNzYWdlcyBmcm9tICcuL0FsZXJ0TWVzc2FnZXMnO1xyXG5pbXBvcnQgeyBGaWVsZHMgfSBmcm9tICdGaWVsZFR5cGVzJztcclxuaW1wb3J0IEludmFsaWRGaWVsZFR5cGUgZnJvbSAnLi9JbnZhbGlkRmllbGRUeXBlJztcclxuaW1wb3J0IHsgQnV0dG9uLCBGb3JtLCBNb2RhbCB9IGZyb20gJy4uL2VsZW1lbnRhbCc7XHJcblxyXG5pbXBvcnQgSWZyYW1lQ29udGVudCBmcm9tICcuL0lmcmFtZUNvbnRlbnQnO1xyXG5cclxuY29uc3QgQ3JlYXRlRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0NyZWF0ZUZvcm0nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZXJyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNPcGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxpc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRvbkNyZWF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZXJyOiBudWxsLFxyXG5cdFx0XHRpc09wZW46IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHQvLyBTZXQgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVpciBkZWZhdWx0IHZhbHVlcyB3aGVuIGZpcnN0IHJlbmRlcmluZyB0aGVcclxuXHRcdC8vIGZvcm0uIChJZiB0aGV5IGhhdmUgYSBkZWZhdWx0IHZhbHVlLCB0aGF0IGlzKVxyXG5cdFx0dmFyIHZhbHVlcyA9IHt9O1xyXG5cdFx0T2JqZWN0LmtleXModGhpcy5wcm9wcy5saXN0LmZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgZmllbGQgPSB0aGlzLnByb3BzLmxpc3QuZmllbGRzW2tleV07XHJcblx0XHRcdHZhciBGaWVsZENvbXBvbmVudCA9IEZpZWxkc1tmaWVsZC50eXBlXTtcclxuXHRcdFx0dmFsdWVzW2ZpZWxkLnBhdGhdID0gRmllbGRDb21wb25lbnQuZ2V0RGVmYXVsdFZhbHVlKGZpZWxkKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXHJcblx0XHRcdGFsZXJ0czoge30sXHJcblx0XHRcdHNob3dJZnJhbWU6IGZhbHNlXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0aWYodGhpcy5wcm9wcy5saXN0LmxpbmsuY3JlYXRlKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHNob3dJZnJhbWU6IHRydWVcclxuXHRcdFx0fSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVByZXNzLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93SWZyYW1lKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVByZXNzLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRoYW5kbGVLZXlQcmVzcyAoZXZ0KSB7XHJcblx0XHRpZiAodmtleVtldnQua2V5Q29kZV0gPT09ICc8ZXNjYXBlPicpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Ly8gSGFuZGxlIGlucHV0IGNoYW5nZSBldmVudHNcclxuXHRoYW5kbGVDaGFuZ2UgKGV2ZW50KSB7XHJcblx0XHR2YXIgdmFsdWVzID0gYXNzaWduKHt9LCB0aGlzLnN0YXRlLnZhbHVlcyk7XHJcblx0XHR2YWx1ZXNbZXZlbnQucGF0aF0gPSBldmVudC52YWx1ZTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR2YWx1ZXM6IHZhbHVlcyxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Ly8gU2V0IHRoZSBwcm9wcyBvZiBhIGZpZWxkXHJcblx0Z2V0RmllbGRQcm9wcyAoZmllbGQpIHtcclxuXHRcdHZhciBwcm9wcyA9IGFzc2lnbih7fSwgZmllbGQpO1xyXG5cdFx0cHJvcHMudmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlc1tmaWVsZC5wYXRoXTtcclxuXHRcdHByb3BzLnZhbHVlcyA9IHRoaXMuc3RhdGUudmFsdWVzO1xyXG5cdFx0cHJvcHMub25DaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZTtcclxuXHRcdHByb3BzLm1vZGUgPSAnY3JlYXRlJztcclxuXHRcdHByb3BzLmtleSA9IGZpZWxkLnBhdGg7XHJcblx0XHRyZXR1cm4gcHJvcHM7XHJcblx0fSxcclxuXHQvLyBDcmVhdGUgYSBuZXcgaXRlbSB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZFxyXG5cdHN1Ym1pdEZvcm0gKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0Y29uc3QgY3JlYXRlRm9ybSA9IGV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGNyZWF0ZUZvcm0pO1xyXG5cdFx0dGhpcy5wcm9wcy5saXN0LmNyZWF0ZUl0ZW0oZm9ybURhdGEsIChlcnIsIGRhdGEpID0+IHtcclxuXHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5vbkNyZWF0ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbkNyZWF0ZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gQ2xlYXIgZm9ybVxyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRcdHZhbHVlczoge30sXHJcblx0XHRcdFx0XHRcdGFsZXJ0czoge1xyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ICdJdGVtIGNyZWF0ZWQnLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKCFlcnIpIHtcclxuXHRcdFx0XHRcdGVyciA9IHtcclxuXHRcdFx0XHRcdFx0ZXJyb3I6ICdjb25uZWN0aW9uIGVycm9yJyxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIElmIHdlIGdldCBhIGRhdGFiYXNlIGVycm9yLCBzaG93IHRoZSBkYXRhYmFzZSBlcnJvciBtZXNzYWdlXHJcblx0XHRcdFx0Ly8gaW5zdGVhZCBvZiBvbmx5IHNheWluZyBcIkRhdGFiYXNlIGVycm9yXCJcclxuXHRcdFx0XHRpZiAoZXJyLmVycm9yID09PSAnZGF0YWJhc2UgZXJyb3InKSB7XHJcblx0XHRcdFx0XHRlcnIuZXJyb3IgPSBlcnIuZGV0YWlsLmVycm1zZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRhbGVydHM6IHtcclxuXHRcdFx0XHRcdFx0ZXJyb3I6IGVycixcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIHRoZSBmb3JtIGl0c2VsZlxyXG5cdHJlbmRlckZvcm0gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbikgcmV0dXJuO1xyXG5cclxuXHRcdHZhciBmb3JtID0gW107XHJcblx0XHR2YXIgbGlzdCA9IHRoaXMucHJvcHMubGlzdDtcclxuXHRcdHZhciBuYW1lRmllbGQgPSB0aGlzLnByb3BzLmxpc3QubmFtZUZpZWxkO1xyXG5cdFx0dmFyIGZvY3VzV2FzU2V0O1xyXG5cclxuXHRcdC8vIElmIHRoZSBuYW1lIGZpZWxkIGlzIGFuIGluaXRpYWwgb25lLCB3ZSBuZWVkIHRvIHJlbmRlciBhIHByb3BlclxyXG5cdFx0Ly8gaW5wdXQgZm9yIGl0XHJcblx0XHRpZiAobGlzdC5uYW1lSXNJbml0aWFsKSB7XHJcblx0XHRcdHZhciBuYW1lRmllbGRQcm9wcyA9IHRoaXMuZ2V0RmllbGRQcm9wcyhuYW1lRmllbGQpO1xyXG5cdFx0XHRuYW1lRmllbGRQcm9wcy5hdXRvRm9jdXMgPSBmb2N1c1dhc1NldCA9IHRydWU7XHJcblx0XHRcdGlmIChuYW1lRmllbGQudHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0bmFtZUZpZWxkUHJvcHMuY2xhc3NOYW1lID0gJ2l0ZW0tbmFtZS1maWVsZCc7XHJcblx0XHRcdFx0bmFtZUZpZWxkUHJvcHMucGxhY2Vob2xkZXIgPSBuYW1lRmllbGQubGFiZWw7XHJcblx0XHRcdFx0bmFtZUZpZWxkUHJvcHMubGFiZWwgPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3JtLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChGaWVsZHNbbmFtZUZpZWxkLnR5cGVdLCBuYW1lRmllbGRQcm9wcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlbmRlciBpbnB1dHMgZm9yIGFsbCBpbml0aWFsIGZpZWxkc1xyXG5cdFx0T2JqZWN0LmtleXMobGlzdC5pbml0aWFsRmllbGRzKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdHZhciBmaWVsZCA9IGxpc3QuZmllbGRzW2xpc3QuaW5pdGlhbEZpZWxkc1trZXldXTtcclxuXHRcdFx0Ly8gSWYgdGhlcmUncyBzb21ldGhpbmcgd2VpcmQgcGFzc2VkIGluIGFzIGZpZWxkIHR5cGUsIHJlbmRlciB0aGVcclxuXHRcdFx0Ly8gaW52YWxpZCBmaWVsZCB0eXBlIGNvbXBvbmVudFxyXG5cdFx0XHRpZiAodHlwZW9mIEZpZWxkc1tmaWVsZC50eXBlXSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdGZvcm0ucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEludmFsaWRGaWVsZFR5cGUsIHsgdHlwZTogZmllbGQudHlwZSwgcGF0aDogZmllbGQucGF0aCwga2V5OiBmaWVsZC5wYXRoIH0pKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gR2V0IHRoZSBwcm9wcyBmb3IgdGhlIGlucHV0IGZpZWxkXHJcblx0XHRcdHZhciBmaWVsZFByb3BzID0gdGhpcy5nZXRGaWVsZFByb3BzKGZpZWxkKTtcclxuXHRcdFx0Ly8gSWYgdGhlcmUgd2FzIG5vIGZvY3VzUmVmIHNldCBwcmV2aW91c2x5LCBzZXQgdGhlIGN1cnJlbnQgZmllbGQgdG9cclxuXHRcdFx0Ly8gYmUgdGhlIG9uZSB0byBiZSBmb2N1c3NlZC4gR2VuZXJhbGx5IHRoZSBmaXJzdCBpbnB1dCBmaWVsZCwgaWZcclxuXHRcdFx0Ly8gdGhlcmUncyBhbiBpbml0aWFsIG5hbWUgZmllbGQgdGhhdCB0YWtlcyBwcmVjZWRlbmNlLlxyXG5cdFx0XHRpZiAoIWZvY3VzV2FzU2V0KSB7XHJcblx0XHRcdFx0ZmllbGRQcm9wcy5hdXRvRm9jdXMgPSBmb2N1c1dhc1NldCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9ybS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGRzW2ZpZWxkLnR5cGVdLCBmaWVsZFByb3BzKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybSBsYXlvdXQ9XCJob3Jpem9udGFsXCIgb25TdWJtaXQ9e3RoaXMuc3VibWl0Rm9ybX0+XHJcblx0XHRcdFx0PE1vZGFsLkhlYWRlclxyXG5cdFx0XHRcdFx0dGV4dD17J0NyZWF0ZSBhIG5ldyAnICsgbGlzdC5zaW5ndWxhcn1cclxuXHRcdFx0XHRcdHNob3dDbG9zZUJ1dHRvblxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PE1vZGFsLkJvZHk+XHJcblx0XHRcdFx0XHQ8QWxlcnRNZXNzYWdlcyBhbGVydHM9e3RoaXMuc3RhdGUuYWxlcnRzfSAvPlxyXG5cdFx0XHRcdFx0e2Zvcm19XHJcblx0XHRcdFx0PC9Nb2RhbC5Cb2R5PlxyXG5cdFx0XHRcdDxNb2RhbC5Gb290ZXI+XHJcblx0XHRcdFx0XHQ8QnV0dG9uIGNvbG9yPVwic3VjY2Vzc1wiIHR5cGU9XCJzdWJtaXRcIiBkYXRhLWJ1dHRvbi10eXBlPVwic3VibWl0XCI+XHJcblx0XHRcdFx0XHRcdENyZWF0ZVxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0XHQ8QnV0dG9uXHJcblx0XHRcdFx0XHRcdHZhcmlhbnQ9XCJsaW5rXCJcclxuXHRcdFx0XHRcdFx0Y29sb3I9XCJjYW5jZWxcIlxyXG5cdFx0XHRcdFx0XHRkYXRhLWJ1dHRvbi10eXBlPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH1cclxuXHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0Q2FuY2VsXHJcblx0XHRcdFx0XHQ8L0J1dHRvbj5cclxuXHRcdFx0XHQ8L01vZGFsLkZvb3Rlcj5cclxuXHRcdFx0PC9Gb3JtPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckNvbnRlbnQoKSB7XHJcblx0XHRjb25zdCB7c2hvd0lmcmFtZX0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3QgaWZyYW1lVVJMID0gYCR7S2V5c3RvbmUuZXh0ZXJuYWxIb3N0fSR7dGhpcy5wcm9wcy5saXN0LmxpbmsuY3JlYXRlfWA7XHJcblxyXG5cdFx0cmV0dXJuIChzaG93SWZyYW1lICYmIHRoaXMucHJvcHMuaXNPcGVuKSA/XHJcblx0XHRcdDxJZnJhbWVDb250ZW50IHNyYz17aWZyYW1lVVJMfSBzaG93PXt0aGlzLnByb3BzLmlzT3Blbn0gb25DYW5jZWw9e3RoaXMucHJvcHMub25DYW5jZWx9IG9uU2F2ZT17dGhpcy5wcm9wcy5vbkNyZWF0ZX0gY2xhc3NOYW1lPXtcImZ1bGwtc2NyZWVuXCJ9Lz4gOlxyXG5cdFx0XHQ8TW9kYWwuRGlhbG9nIGlzT3Blbj17dGhpcy5wcm9wcy5pc09wZW59IG9uQ2xvc2U9e3RoaXMucHJvcHMub25DYW5jZWx9IGJhY2tkcm9wQ2xvc2VzTW9kYWw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyRm9ybSgpfVxyXG5cdFx0XHQ8L01vZGFsLkRpYWxvZz5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENyZWF0ZUZvcm07XHJcbiIsIi8qKlxyXG4gKiBUaGUgZm9ybSB0aGF0J3MgdmlzaWJsZSB3aGVuIFwiQ3JlYXRlIDxJdGVtTmFtZT5cIiBpcyBjbGlja2VkIG9uIGVpdGhlciB0aGVcclxuICogTGlzdCBzY3JlZW4gb3IgdGhlIEl0ZW0gc2NyZWVuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IElmcmFtZUNvbnRlbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdJZnJhbWVDb250ZW50JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdHNob3c6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0c3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25TYXZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93OiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVGcmFtZVRhc2tzLCB0aGlzKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLmhhbmRsZUZyYW1lVGFza3MsIHRoaXMpO1xyXG5cdH0sXHJcblx0aGFuZGxlRnJhbWVUYXNrcyhlKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0Y29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuXHRcdFx0c3dpdGNoKG1lc3NhZ2UudHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2NvbnRlbnRVcGRhdGUnOiBcclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRjb250ZW50SGVpZ2h0OiBtZXNzYWdlLmRhdGFcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdvblNhdmUnOlxyXG5cdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMub25TYXZlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TYXZlKG1lc3NhZ2UuZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdvbkNhbmNlbCc6XHJcblx0XHRcdFx0XHRpZih0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyQ29udGVudCgpIHtcclxuXHRcdGNvbnN0IHtzcmMsIHNob3csIGNsYXNzTmFtZSA9ICcnfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBpZnJhbWVVUkwgPSBgJHtzcmN9P3Rva2VuPSR7S2V5c3RvbmUudXNlci50b2tlbn1gXHJcblx0XHRyZXR1cm4gc2hvdyA/XHJcblx0XHRcdDxpZnJhbWUgY2xhc3NOYW1lPXsnY29udGVudC1mcmFtZSAnICsgY2xhc3NOYW1lfSBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS5jb250ZW50SGVpZ2h0fX0gcmVmPXsoZikgPT4gdGhpcy5pZnIgPSBmIH0gc3JjPXtpZnJhbWVVUkx9IC8+IDogPGRpdiAvPlxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSWZyYW1lQ29udGVudDtcclxuIiwiLyoqXHJcbiAqIFJlbmRlcnMgYW4gXCJJbnZhbGlkIEZpZWxkIFR5cGVcIiBlcnJvclxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJbnZhbGlkRmllbGRUeXBlID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+XHJcblx0XHRcdEludmFsaWQgZmllbGQgdHlwZSA8c3Ryb25nPntwcm9wcy50eXBlfTwvc3Ryb25nPiBhdCBwYXRoIDxzdHJvbmc+e3Byb3BzLnBhdGh9PC9zdHJvbmc+XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuSW52YWxpZEZpZWxkVHlwZS5wcm9wVHlwZXMgPSB7XHJcblx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkRmllbGRUeXBlO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5mdW5jdGlvbiBLYmQgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMua2JkKTtcclxuXHJcblx0cmV0dXJuIDxrYmQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0a2JkOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9yLmJvZHksXHJcblx0XHRib3JkZXJSYWRpdXM6IDMsXHJcblx0XHRib3JkZXI6IGAxcHggc29saWQgI2NjY2AsXHJcblx0XHRib3JkZXJCb3R0b21Db2xvcjogZGFya2VuKCcjY2NjJywgNCksXHJcblx0XHRib3JkZXJUb3BDb2xvcjogbGlnaHRlbignI2NjYycsIDQpLFxyXG5cdFx0Ym94U2hhZG93OiBgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMnB4IDAgMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNykgaW5zZXRgLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRmb250RmFtaWx5OiAnQ29uc29sYXMsIFwiTGliZXJhdGlvbiBNb25vXCIsIENvdXJpZXIsIG1vbm9zcGFjZScsXHJcblx0XHRmb250U2l6ZTogJzAuODVlbScsXHJcblx0XHRmb250V2VpZ2h0OiA3MDAsXHJcblx0XHRsaW5lSGVpZ2h0OiAnaW5oZXJpdCcsXHJcblx0XHRwYWRkaW5nOiAnMXB4IDRweCcsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHJcblx0XHQvLyBsaXR0bGUgaGFjayB0byB0d2VhayBcInZpc3VhbC1taWRkbGVcIiBhbGlnbm1lbnRcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0dG9wOiAtMSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBLYmQ7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgdGhlIGJvZHkgb2YgYSBwb3BvdXRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxudmFyIFBvcG91dEJvZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRCb2R5JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0c2Nyb2xsYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0X19ib2R5Jywge1xyXG5cdFx0XHQnUG9wb3V0X19zY3JvbGxhYmxlLWFyZWEnOiB0aGlzLnByb3BzLnNjcm9sbGFibGUsXHJcblx0XHR9LCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJywgJ3Njcm9sbGFibGUnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRCb2R5O1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgZm9vdGVyIGZvciBhIHBvcG91dFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBCVVRUT05fQkFTRV9DTEFTU05BTUUgPSAnUG9wb3V0X19mb290ZXJfX2J1dHRvbiBQb3BvdXRfX2Zvb3Rlcl9fYnV0dG9uLS0nO1xyXG5cclxuY29uc3QgUG9wb3V0Rm9vdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0Rm9vdGVyJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcclxuXHRcdHByaW1hcnlCdXR0b25BY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0cHJpbWFyeUJ1dHRvbklzU3VibWl0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdHByaW1hcnlCdXR0b25MYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHNlY29uZGFyeUJ1dHRvbkFjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRzZWNvbmRhcnlCdXR0b25MYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdC8vIFJlbmRlciBhIHByaW1hcnkgYnV0dG9uXHJcblx0cmVuZGVyUHJpbWFyeUJ1dHRvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMucHJpbWFyeUJ1dHRvbkxhYmVsKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0dHlwZT17dGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uSXNTdWJtaXQgPyAnc3VibWl0JyA6ICdidXR0b24nfVxyXG5cdFx0XHRcdGNsYXNzTmFtZT17QlVUVE9OX0JBU0VfQ0xBU1NOQU1FICsgJ3ByaW1hcnknfVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMucHJpbWFyeUJ1dHRvbkFjdGlvbn1cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnByaW1hcnlCdXR0b25MYWJlbH1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIGEgc2Vjb25kYXJ5IGJ1dHRvblxyXG5cdHJlbmRlclNlY29uZGFyeUJ1dHRvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uQWN0aW9uIHx8ICF0aGlzLnByb3BzLnNlY29uZGFyeUJ1dHRvbkxhYmVsKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtCVVRUT05fQkFTRV9DTEFTU05BTUUgKyAnc2Vjb25kYXJ5J31cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLnNlY29uZGFyeUJ1dHRvbkFjdGlvbn1cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnNlY29uZGFyeUJ1dHRvbkxhYmVsfVxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJQb3BvdXRfX2Zvb3RlclwiPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclByaW1hcnlCdXR0b24oKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJTZWNvbmRhcnlCdXR0b24oKX1cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRGb290ZXI7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBoZWFkZXIgZm9yIGEgcG9wb3V0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuXHJcbmNvbnN0IFBvcG91dEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dEhlYWRlcicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRsZWZ0QWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdGxlZnRJY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHRyYW5zaXRpb25EaXJlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ25leHQnLCAncHJldiddKSxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHQvLyBJZiB3ZSBoYXZlIGEgbGVmdCBhY3Rpb24gYW5kIGEgbGVmdCBpY29uLCByZW5kZXIgYSBoZWFkZXIgYnV0dG9uXHJcblx0XHR2YXIgaGVhZGVyQnV0dG9uID0gKHRoaXMucHJvcHMubGVmdEFjdGlvbiAmJiB0aGlzLnByb3BzLmxlZnRJY29uKSA/IChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdGtleT17J2J1dHRvbl8nICsgdGhpcy5wcm9wcy50cmFuc2l0aW9uRGlyZWN0aW9ufVxyXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdGNsYXNzTmFtZT17J1BvcG91dF9faGVhZGVyX19idXR0b24gb2N0aWNvbiBvY3RpY29uLScgKyB0aGlzLnByb3BzLmxlZnRJY29ufVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMubGVmdEFjdGlvbn1cclxuXHRcdFx0Lz5cclxuXHRcdCkgOiBudWxsO1xyXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhIHRpdGxlLCByZW5kZXIgaXRcclxuXHRcdHZhciBoZWFkZXJUaXRsZSA9IHRoaXMucHJvcHMudGl0bGUgPyAoXHJcblx0XHRcdDxzcGFuXHJcblx0XHRcdFx0a2V5PXsndGl0bGVfJyArIHRoaXMucHJvcHMudHJhbnNpdGlvbkRpcmVjdGlvbn1cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJQb3BvdXRfX2hlYWRlcl9fbGFiZWxcIlxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMudGl0bGV9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCkgOiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0X19oZWFkZXJcIj5cclxuXHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9XCJQb3BvdXRfX2hlYWRlcl9fYnV0dG9uXCJcclxuXHRcdFx0XHRcdHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezIwMH1cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9ezIwMH1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHR7aGVhZGVyQnV0dG9ufVxyXG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cclxuXHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9eydQb3BvdXRfX3BhbmUtJyArIHRoaXMucHJvcHMudHJhbnNpdGlvbkRpcmVjdGlvbn1cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezM2MH1cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9ezM2MH1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHR7aGVhZGVyVGl0bGV9XHJcblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dEhlYWRlcjtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIHBvcG91dCBsaXN0LiBDYW4gYWxzbyB1c2UgUG9wb3V0TGlzdEl0ZW0gYW5kIFBvcG91dExpc3RIZWFkaW5nXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmNvbnN0IFBvcG91dExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRMaXN0JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3QnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0TGlzdDtcclxuXHJcbi8vIGV4cG9zZSB0aGUgY2hpbGQgdG8gdGhlIHRvcCBsZXZlbCBleHBvcnRcclxubW9kdWxlLmV4cG9ydHMuSXRlbSA9IHJlcXVpcmUoJy4vUG9wb3V0TGlzdEl0ZW0nKTtcclxubW9kdWxlLmV4cG9ydHMuSGVhZGluZyA9IHJlcXVpcmUoJy4vUG9wb3V0TGlzdEhlYWRpbmcnKTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIHBvcG91dCBsaXN0IGhlYWRpbmdcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxudmFyIFBvcG91dExpc3RIZWFkaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0TGlzdEhlYWRpbmcnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdF9faGVhZGluZycsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRMaXN0SGVhZGluZztcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIHBvcG91dCBsaXN0IGl0ZW1cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxudmFyIFBvcG91dExpc3RJdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0TGlzdEl0ZW0nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGljb25Ib3ZlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGlzU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGhvdmVyOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRob3ZlciAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgaG92ZXI6IHRydWUgfSk7XHJcblx0fSxcclxuXHR1bmhvdmVyICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBob3ZlcjogZmFsc2UgfSk7XHJcblx0fSxcclxuXHQvLyBSZW5kZXIgYW4gaWNvblxyXG5cdHJlbmRlckljb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmljb24pIHJldHVybiBudWxsO1xyXG5cdFx0Y29uc3QgaWNvbiA9IHRoaXMuc3RhdGUuaG92ZXIgJiYgdGhpcy5wcm9wcy5pY29uSG92ZXIgPyB0aGlzLnByb3BzLmljb25Ib3ZlciA6IHRoaXMucHJvcHMuaWNvbjtcclxuXHRcdGNvbnN0IGljb25DbGFzc25hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0X19pdGVtX19pY29uIG9jdGljb24nLCAoJ29jdGljb24tJyArIGljb24pKTtcclxuXHJcblx0XHRyZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3NuYW1lfSAvPjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBpdGVtQ2xhc3NuYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdF9faXRlbScsIHtcclxuXHRcdFx0J2lzLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5pc1NlbGVjdGVkLFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJywgJ2ljb24nLCAnaWNvbkhvdmVyJywgJ2lzU2VsZWN0ZWQnLCAnbGFiZWwnKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy5sYWJlbH1cclxuXHRcdFx0XHRjbGFzc05hbWU9e2l0ZW1DbGFzc25hbWV9XHJcblx0XHRcdFx0b25Gb2N1cz17dGhpcy5ob3Zlcn1cclxuXHRcdFx0XHRvbkJsdXI9e3RoaXMudW5ob3Zlcn1cclxuXHRcdFx0XHRvbk1vdXNlT3Zlcj17dGhpcy5ob3Zlcn1cclxuXHRcdFx0XHRvbk1vdXNlT3V0PXt0aGlzLnVuaG92ZXJ9XHJcblx0XHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVySWNvbigpfVxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlBvcG91dExpc3RfX2l0ZW1fX2xhYmVsXCI+XHJcblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5sYWJlbH1cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0TGlzdEl0ZW07XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgcGFuZSwgY2FsbHMgcHJvcHMub25MYXlvdXQgd2hlbiB0aGUgY29tcG9uZW50IG1vdW50c1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0UGFuZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dFBhbmUnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkxheW91dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0b25MYXlvdXQ6ICgpID0+IHt9LFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHRoaXMucHJvcHMub25MYXlvdXQodGhpcy5yZWZzLmVsLm9mZnNldEhlaWdodCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0X19wYW5lJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScsICdvbkxheW91dCcpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgcmVmPVwiZWxcIiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0UGFuZTtcclxuIiwiLyoqXHJcbiAqIEEgUG9wb3V0IGNvbXBvbmVudC5cclxuICogT25lIGNhbiBhbHNvIGFkZCBhIEhlYWRlciAoUG9wb3V0L0hlYWRlciksIGEgRm9vdGVyXHJcbiAqIChQb3BvdXQvRm9vdGVyKSwgYSBCb2R5IChQb3BvdXQvQm9keSkgYW5kIGEgUGFuIChQb3BvdXQvUGFuZSkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFBvcnRhbCBmcm9tICcuLi9Qb3J0YWwnO1xyXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuY29uc3QgU0laRVMgPSB7XHJcblx0YXJyb3dIZWlnaHQ6IDEyLFxyXG5cdGFycm93V2lkdGg6IDE2LFxyXG5cdGhvcml6b250YWxNYXJnaW46IDIwLFxyXG59O1xyXG5cclxudmFyIFBvcG91dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpc09wZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25TdWJtaXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0cmVsYXRpdmVUb0lEOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR3aWR0aDogMzIwLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmlzT3Blbikge1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbik7XHJcblx0XHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24obmV4dFByb3BzLmlzT3Blbik7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMuaXNPcGVuICYmICFuZXh0UHJvcHMuaXNPcGVuKSB7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGdldFBvcnRhbERPTU5vZGUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVmcy5wb3J0YWwuZ2V0UG9ydGFsRE9NTm9kZSgpO1xyXG5cdH0sXHJcblx0Y2FsY3VsYXRlUG9zaXRpb24gKGlzT3Blbikge1xyXG5cdFx0aWYgKCFpc09wZW4pIHJldHVybjtcclxuXHRcdGxldCBwb3NOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcm9wcy5yZWxhdGl2ZVRvSUQpO1xyXG5cclxuXHRcdGNvbnN0IHBvcyA9IHtcclxuXHRcdFx0dG9wOiAwLFxyXG5cdFx0XHRsZWZ0OiAwLFxyXG5cdFx0XHR3aWR0aDogcG9zTm9kZS5vZmZzZXRXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBwb3NOb2RlLm9mZnNldEhlaWdodCxcclxuXHRcdH07XHJcblx0XHR3aGlsZSAocG9zTm9kZS5vZmZzZXRQYXJlbnQpIHtcclxuXHRcdFx0cG9zLnRvcCArPSBwb3NOb2RlLm9mZnNldFRvcDtcclxuXHRcdFx0cG9zLmxlZnQgKz0gcG9zTm9kZS5vZmZzZXRMZWZ0O1xyXG5cdFx0XHRwb3NOb2RlID0gcG9zTm9kZS5vZmZzZXRQYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxlZnRPZmZzZXQgPSBNYXRoLm1heChwb3MubGVmdCArIChwb3Mud2lkdGggLyAyKSAtICh0aGlzLnByb3BzLndpZHRoIC8gMiksIFNJWkVTLmhvcml6b250YWxNYXJnaW4pO1xyXG5cdFx0bGV0IHRvcE9mZnNldCA9IHBvcy50b3AgKyBwb3MuaGVpZ2h0ICsgU0laRVMuYXJyb3dIZWlnaHQ7XHJcblxyXG5cdFx0dmFyIHNwYWNlT25SaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gKGxlZnRPZmZzZXQgKyB0aGlzLnByb3BzLndpZHRoICsgU0laRVMuaG9yaXpvbnRhbE1hcmdpbik7XHJcblx0XHRpZiAoc3BhY2VPblJpZ2h0IDwgMCkge1xyXG5cdFx0XHRsZWZ0T2Zmc2V0ID0gbGVmdE9mZnNldCArIHNwYWNlT25SaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBhcnJvd0xlZnRPZmZzZXQgPSBsZWZ0T2Zmc2V0ID09PSBTSVpFUy5ob3Jpem9udGFsTWFyZ2luXHJcblx0XHRcdD8gcG9zLmxlZnQgKyAocG9zLndpZHRoIC8gMikgLSAoU0laRVMuYXJyb3dXaWR0aCAvIDIpIC0gU0laRVMuaG9yaXpvbnRhbE1hcmdpblxyXG5cdFx0XHQ6IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgbmV3U3RhdGVBdmFsaWFibGUgPSB0aGlzLnN0YXRlLmxlZnRPZmZzZXQgIT09IGxlZnRPZmZzZXRcclxuXHRcdFx0fHwgdGhpcy5zdGF0ZS50b3BPZmZzZXQgIT09IHRvcE9mZnNldFxyXG5cdFx0XHR8fCB0aGlzLnN0YXRlLmFycm93TGVmdE9mZnNldCAhPT0gYXJyb3dMZWZ0T2Zmc2V0O1xyXG5cclxuXHRcdGlmIChuZXdTdGF0ZUF2YWxpYWJsZSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0LFxyXG5cdFx0XHRcdHRvcE9mZnNldDogdG9wT2Zmc2V0LFxyXG5cdFx0XHRcdGFycm93TGVmdE9mZnNldDogYXJyb3dMZWZ0T2Zmc2V0LFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlclBvcG91dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCB7IHdpZHRoIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyBhcnJvd0xlZnRPZmZzZXQsIGxlZnRPZmZzZXQ6IGxlZnQsIHRvcE9mZnNldDogdG9wIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGNvbnN0IGFycm93U3R5bGVzID0gYXJyb3dMZWZ0T2Zmc2V0XHJcblx0XHRcdD8geyBsZWZ0OiAwLCBtYXJnaW5MZWZ0OiBhcnJvd0xlZnRPZmZzZXQgfVxyXG5cdFx0XHQ6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJQb3BvdXRcIiBzdHlsZT17eyBsZWZ0LCB0b3AsIHdpZHRoIH19PlxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlBvcG91dF9fYXJyb3dcIiBzdHlsZT17YXJyb3dTdHlsZXN9IC8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJQb3BvdXRfX2lubmVyXCI+XHJcblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQmxvY2tvdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbikgcmV0dXJuO1xyXG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2tvdXRcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UG9ydGFsIGNsYXNzTmFtZT1cIlBvcG91dC13cmFwcGVyXCIgcmVmPVwicG9ydGFsXCI+XHJcblx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezIwMH1cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9ezIwMH1cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPVwiUG9wb3V0XCJcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJQb3BvdXQoKX1cclxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQmxvY2tvdXQoKX1cclxuXHRcdFx0PC9Qb3J0YWw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXQ7XHJcblxyXG4vLyBleHBvc2UgdGhlIGNoaWxkIHRvIHRoZSB0b3AgbGV2ZWwgZXhwb3J0XHJcbm1vZHVsZS5leHBvcnRzLkhlYWRlciA9IHJlcXVpcmUoJy4vUG9wb3V0SGVhZGVyJyk7XHJcbm1vZHVsZS5leHBvcnRzLkJvZHkgPSByZXF1aXJlKCcuL1BvcG91dEJvZHknKTtcclxubW9kdWxlLmV4cG9ydHMuRm9vdGVyID0gcmVxdWlyZSgnLi9Qb3BvdXRGb290ZXInKTtcclxubW9kdWxlLmV4cG9ydHMuUGFuZSA9IHJlcXVpcmUoJy4vUG9wb3V0UGFuZScpO1xyXG4iLCIvKipcclxuICogVXNlZCBieSB0aGUgUG9wb3V0IGNvbXBvbmVudCBhbmQgdGhlIExpZ2h0Ym94IGNvbXBvbmVudCBvZiB0aGUgZmllbGRzIGZvclxyXG4gKiBwb3BvdXRzLiBSZW5kZXJzIGEgbm9uLXJlYWN0IERPTSBub2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3J0YWwnLFxyXG5cdHBvcnRhbEVsZW1lbnQ6IG51bGwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gZWw7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlICgpIHtcclxuXHRcdFJlYWN0RE9NLnJlbmRlcig8ZGl2IHsuLi50aGlzLnByb3BzfSAvPiwgdGhpcy5wb3J0YWxFbGVtZW50KTtcclxuXHR9LFxyXG5cdGdldFBvcnRhbERPTU5vZGUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucG9ydGFsRWxlbWVudDtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9LFxyXG59KTtcclxuIiwiLyoqXHJcbiAqIENvbnN0YW50c1xyXG4gKi9cclxuXHJcbi8vIGJyZWFrcG9pbnRzXHJcbmV4cG9ydHMuYnJlYWtwb2ludCA9IHtcclxuXHR4czogNDgwLFxyXG5cdHNtOiA3NjgsXHJcblx0bWQ6IDk5MixcclxuXHRsZzogMTIwMCxcclxufTtcclxuXHJcbi8vIGJvcmRlciByYWRpaVxyXG5leHBvcnRzLmJvcmRlclJhZGl1cyA9IHtcclxuXHR4czogMixcclxuXHRzbTogNCxcclxuXHRtZDogOCxcclxuXHRsZzogMTYsXHJcblx0eGw6IDMyLFxyXG59O1xyXG5cclxuLy8gY29sb3JcclxuZXhwb3J0cy5jb2xvciA9IHtcclxuXHRhcHBEYW5nZXI6ICcjZDY0MjQyJyxcclxuXHRhcHBJbmZvOiAnIzU2Y2RmYycsXHJcblx0YXBwUHJpbWFyeTogJyMxMzg1ZTUnLFxyXG5cdGFwcFN1Y2Nlc3M6ICcjMzRjMjQwJyxcclxuXHRhcHBXYXJuaW5nOiAnI2ZhOWY0NycsXHJcbn07XHJcblxyXG4vLyBzcGFjaW5nXHJcbmV4cG9ydHMuc3BhY2luZyA9IHtcclxuXHR4czogNSxcclxuXHRzbTogMTAsXHJcblx0bWQ6IDIwLFxyXG5cdGxnOiA0MCxcclxuXHR4bDogODAsXHJcbn07XHJcblxyXG4vLyB0YWJsZSBjb25zdGFudHNcclxuXHJcbmV4cG9ydHMuVEFCTEVfQ09OVFJPTF9DT0xVTU5fV0lEVEggPSAyNjsgIC8vIGljb24gKyBwYWRkaW5nXHJcbmV4cG9ydHMuTkVUV09SS19FUlJPUl9SRVRSWV9ERUxBWSA9IDUwMDsgLy8gaW4gbXNcclxuIiwiLyogZXNsaW50LWRpc2FibGUga2V5LXNwYWNpbmcgKi9cclxuY29uc3QgdGhlbWUgPSB7fTtcclxuY29uc3QgeyBibGVuZCwgZGFya2VuLCBmYWRlLCBsaWdodGVuIH0gPSByZXF1aXJlKCcuL3V0aWxzL2NvbG9yJyk7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ09NTU9OXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gYnJlYWtwb2ludFxyXG5cclxudGhlbWUuYnJlYWtwb2ludE51bWVyaWMgPSB7XHJcblx0bW9iaWxlOiAgICAgICAgICAgNDgwLFxyXG5cdHRhYmxldFBvcnRyYWl0OiAgIDc2OCxcclxuXHR0YWJsZXRMYW5kc2NhcGU6ICA5OTIsXHJcblx0ZGVza3RvcDogICAgICAgICAgMTIwMCxcclxufTtcclxudGhlbWUuYnJlYWtwb2ludCA9IHtcclxuXHR0YWJsZXRQb3J0cmFpdE1pbjogICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUgKyAxKSArICdweCcsXHJcblx0dGFibGV0TGFuZHNjYXBlTWluOiAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0UG9ydHJhaXQgKyAxKSArICdweCcsXHJcblx0ZGVza3RvcE1pbjogICAgICAgICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlICsgMSkgKyAncHgnLFxyXG5cdGRlc2t0b3BMYXJnZU1pbjogICAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLmRlc2t0b3AgKyAxKSArICdweCcsXHJcblxyXG5cdG1vYmlsZU1heDogICAgICAgICAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSArICdweCcsXHJcblx0dGFibGV0UG9ydHJhaXRNYXg6ICAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0UG9ydHJhaXQgKyAncHgnLFxyXG5cdHRhYmxldExhbmRzY2FwZU1heDogIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSArICdweCcsXHJcblx0ZGVza3RvcE1heDogICAgICAgICAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMuZGVza3RvcCArICdweCcsXHJcbn07XHJcblxyXG4vLyBjb250YWluZXJcclxuXHJcbnRoZW1lLmNvbnRhaW5lciA9IHtcclxuXHRndXR0ZXI6IDIwLFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOiAgNzUwLFxyXG5cdFx0bWVkaXVtOiA5NzAsXHJcblx0XHRsYXJnZTogMTE3MCxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gY29sb3JcclxuXHJcbnRoZW1lLmNvbG9yID0ge1xyXG5cdGJvZHk6ICAgICAgICAgICAgICAgICcjZmFmYWZhJyxcclxuXHRsaW5rOiAgICAgICAgICAgICAgICAnIzEzODVlNScsXHJcblx0bGlua0hvdmVyOiAgICAgICAgICAgbGlnaHRlbignIzEzODVlNScsIDEwKSxcclxuXHR0ZXh0OiAgICAgICAgICAgICAgICAnIzFBMUExQScsXHJcblxyXG5cdC8vIGNvbnRleHR1YWxcclxuXHRzdWNjZXNzOiAgICAgICAgICAgICAnIzM0YzI0MCcsXHJcblx0Y3JlYXRlOiAgICAgICAgICAgICAgJyMzNGMyNDAnLCAvLyBhbGlhcyBmb3Igc3VjY2Vzc1xyXG5cdHByaW1hcnk6ICAgICAgICAgICAgICcjMTM4NWU1JyxcclxuXHRpbmZvOiAgICAgICAgICAgICAgICAnIzEzODVlNScsIC8vIGFsaWFzIGZvciBwcmltYXJ5XHJcblx0d2FybmluZzogICAgICAgICAgICAgJyNGQTMnLFxyXG5cdGRhbmdlcjogICAgICAgICAgICAgICcjZDY0MjQyJyxcclxuXHRlcnJvcjogICAgICAgICAgICAgICAnI2Q2NDI0MicsIC8vIGFsaWFzIGZvciBkYW5nZXJcclxuXHJcblx0Ly8gbmV1dHJhbHNcclxuXHRncmF5OTA6ICAgICAgICAgICAgICAnIzFBMUExQScsXHJcblx0Z3JheTgwOiAgICAgICAgICAgICAgJyMzMzMnLFxyXG5cdGdyYXk3MDogICAgICAgICAgICAgICcjNEQ0RDREJyxcclxuXHRncmF5NjA6ICAgICAgICAgICAgICAnIzY2NicsXHJcblx0Z3JheTUwOiAgICAgICAgICAgICAgJyM3RjdGN0YnLFxyXG5cdGdyYXk0MDogICAgICAgICAgICAgICcjOTk5JyxcclxuXHRncmF5MzA6ICAgICAgICAgICAgICAnI0IzQjNCMycsXHJcblx0Z3JheTIwOiAgICAgICAgICAgICAgJyNDQ0MnLFxyXG5cdGdyYXkxNTogICAgICAgICAgICAgICcjRDlEOUQ5JyxcclxuXHRncmF5MTA6ICAgICAgICAgICAgICAnI0U1RTVFNScsXHJcblx0Z3JheTA1OiAgICAgICAgICAgICAgJyNGMkYyRjInLFxyXG5cclxuXHQvLyBzb2NpYWxcclxuXHRmYWNlYm9vazogICAgICAgICAgICAnIzNCNTk5OCcsXHJcblx0Z29vZ2xlOiAgICAgICAgICAgICAgJyNEQzRFNDEnLFxyXG5cdGluc3RhZ3JhbTogICAgICAgICAgICcjM2Y3MjliJyxcclxuXHRwaW50ZXJlc3Q6ICAgICAgICAgICAnI2JkMDgxYycsXHJcblx0dHVtYmxyOiAgICAgICAgICAgICAgJyMzNTQ2NWMnLFxyXG5cdHR3aXR0ZXI6ICAgICAgICAgICAgICcjNTVBQ0VFJyxcclxuXHR5b3V0dWJlOiAgICAgICAgICAgICAnI2NkMjAxZicsXHJcblx0dmltZW86ICAgICAgICAgICAgICAgJyMxYWI3ZWEnLFxyXG59O1xyXG5cclxuLy8gYm9yZGVyIHJhZGlpXHJcblxyXG50aGVtZS5ib3JkZXJSYWRpdXMgPSB7XHJcblx0c21hbGw6ICcwLjEyNXJlbScsXHJcblx0ZGVmYXVsdDogJzAuM3JlbScsXHJcblx0bGFyZ2U6ICcwLjVyZW0nLFxyXG59O1xyXG5cclxuLy8gc3BhY2luZ1xyXG5cclxudGhlbWUuc3BhY2luZyA9IHtcclxuXHR4c21hbGw6ICAgICAgNSxcclxuXHRzbWFsbDogICAgICAgMTAsXHJcblx0ZGVmYXVsdDogICAgIDIwLFxyXG5cdGxhcmdlOiAgICAgICAzMCxcclxuXHR4bGFyZ2U6ICAgICAgNDAsXHJcblx0eHhsYXJnZTogICAgIDYwLFxyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEVMRU1FTlRBTCBTUEVDSUZJQ1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIGJ1dHRvblxyXG5cclxudGhlbWUuYnV0dG9uID0ge1xyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0Zm9udDoge1xyXG5cdFx0d2VpZ2h0OiA1MDAsXHJcblx0fSxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJzFlbScsXHJcblx0ZGVmYXVsdDoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5wcmltYXJ5LCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0fSxcclxuXHRwcmltYXJ5OiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnByaW1hcnksIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHR9LFxyXG5cdHN1Y2Nlc3M6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3Iuc3VjY2VzcywgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdH0sXHJcblx0d2FybmluZzoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci53YXJuaW5nLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRkYW5nZXI6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5kYW5nZXIsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBibGFuayBzdGF0ZVxyXG5cclxudGhlbWUuYmxhbmtzdGF0ZSA9IHtcclxuXHRiYWNrZ3JvdW5kOiBkYXJrZW4odGhlbWUuY29sb3IuYm9keSwgNCksXHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdHBhZGRpbmdIb3Jpem9udGFsOiAnMmVtJyxcclxuXHRwYWRkaW5nVmVydGljYWw6ICc0ZW0nLFxyXG59O1xyXG5cclxuLy8gZm9udFxyXG5cclxudGhlbWUuZm9udCA9IHtcclxuXHRmYW1pbHk6IHtcclxuXHRcdG1vbm86ICdNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgXCJDb3VyaWVyIE5ld1wiLCBtb25vc3BhY2UnLFxyXG5cdFx0c2Fuc1NlcmlmOiAnXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcclxuXHRcdHNlcmlmOiAnR2VvcmdpYSwgVGltZXMgTmV3IFJvbWFuLCBUaW1lcywgc2VyaWYnLFxyXG5cdH0sXHJcblx0c2l6ZToge1xyXG5cdFx0eHhzbWFsbDogJzAuNjVyZW0nLFxyXG5cdFx0eHNtYWxsOiAnMC43NXJlbScsXHJcblx0XHRzbWFsbDogJzAuODVyZW0nLFxyXG5cdFx0ZGVmYXVsdDogJzFyZW0nLFxyXG5cdFx0bWVkaXVtOiAnMS4ycmVtJyxcclxuXHRcdGxhcmdlOiAnMS42cmVtJyxcclxuXHRcdHhsYXJnZTogJzIuNHJlbScsXHJcblx0XHR4eGxhcmdlOiAnMy4ycmVtJyxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gZm9ybVxyXG5cclxudGhlbWUuZm9ybSA9IHtcclxuXHRsYWJlbDoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk1MCxcclxuXHRcdGZvbnRTaXplOiAnMXJlbScsXHJcblx0XHRmb250V2VpZ2h0OiAnbm9ybWFsJyxcclxuXHRcdHdpZHRoOiAxODAsXHJcblx0fSxcclxuXHRub3RlOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0Zm9udFNpemU6ICcwLjllbScsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGNvbXBvbmVudFxyXG5cclxudGhlbWUuY29tcG9uZW50ID0ge1xyXG5cdGxpbmVIZWlnaHQ6ICcyLjNlbScsXHJcblx0aGVpZ2h0OiAnMi40ZW0nLFxyXG5cdHBhZGRpbmc6ICcxZW0nLFxyXG59O1xyXG5cclxuLy8gaW5wdXRcclxuXHJcbnRoZW1lLmlucHV0ID0ge1xyXG5cdGJhY2tncm91bmQ6IHtcclxuXHRcdGRlZmF1bHQ6ICd3aGl0ZScsXHJcblx0XHRkaXNhYmxlZDogJyNmYWZhZmEnLFxyXG5cdFx0bm9lZGl0OiBkYXJrZW4odGhlbWUuY29sb3IuYm9keSwgMiksXHJcblx0fSxcclxuXHRwbGFjZWhvbGRlckNvbG9yOiAnI2FhYScsXHJcblx0bGluZUhlaWdodDogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsXHJcblx0aGVpZ2h0OiB0aGVtZS5jb21wb25lbnQuaGVpZ2h0LFxyXG5cdGJvcmRlcjoge1xyXG5cdFx0Y29sb3I6IHtcclxuXHRcdFx0ZGVmYXVsdDogJyNjY2MnLFxyXG5cdFx0XHRmb2N1czogdGhlbWUuY29sb3IuaW5mbyxcclxuXHRcdFx0aG92ZXI6ICcjYmJiJyxcclxuXHRcdFx0bm9lZGl0OiBkYXJrZW4odGhlbWUuY29sb3IuYm9keSwgOCksXHJcblx0XHR9LFxyXG5cdFx0cmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdH0sXHJcblx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpJyxcclxuXHRib3hTaGFkb3dGb2N1czogYGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDAgM3B4ICR7ZmFkZSh0aGVtZS5jb2xvci5pbmZvLCAxMCl9YCxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJy43NWVtJyxcclxufTtcclxuXHJcbi8vIHNlbGVjdFxyXG5cclxudGhlbWUuc2VsZWN0ID0ge1xyXG5cdGJveFNoYWRvdzogJzAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScsXHJcbn07XHJcblxyXG4vLyBhbGVydFxyXG5cclxudGhlbWUuYWxlcnQgPSB7XHJcblx0cGFkZGluZzogJzAuNzVlbSAgMWVtJyxcclxuXHRtYXJnaW46ICcwIDAgMWVtJyxcclxuXHRib3JkZXJXaWR0aDogMSxcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0fSxcclxuXHRcdGluZm86IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHR9LFxyXG5cdFx0c3VjY2Vzczoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdH0sXHJcblx0XHR3YXJuaW5nOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3Iud2FybmluZywgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3Iud2FybmluZywgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gZ2x5cGhcclxuXHJcbnRoZW1lLmdseXBoID0ge1xyXG5cdGNvbG9yOiB7XHJcblx0XHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGluaGVyaXQ6ICdpbmhlcml0JyxcclxuXHRcdGludmVydGVkOiAnd2hpdGUnLFxyXG5cdFx0cHJpbWFyeTogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdHN1Y2Nlc3M6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0c2l6ZToge1xyXG5cdFx0c21hbGw6IDE2LFxyXG5cdFx0bWVkaXVtOiAzMixcclxuXHRcdGxhcmdlOiA2NCxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gbW9kYWxcclxuXHJcbnRoZW1lLm1vZGFsID0ge1xyXG5cdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuOCknLFxyXG5cdHpJbmRleDogMTAwLFxyXG5cdHBhZGRpbmc6IHtcclxuXHRcdGRpYWxvZzoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAnMWVtJyxcclxuXHRcdFx0dmVydGljYWw6IDAsXHJcblx0XHR9LFxyXG5cdFx0Ym9keToge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzFlbScsXHJcblx0XHR9LFxyXG5cdFx0Zm9vdGVyOiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMWVtJyxcclxuXHRcdH0sXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcwLjZlbScsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBwYWdpbmF0aW9uXHJcblxyXG50aGVtZS5wYWdpbmF0aW9uID0ge1xyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblxyXG5cdGhvdmVyOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG5cdFx0Ym9yZGVyOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHRzZWxlY3RlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC4wNSknLFxyXG5cdFx0Ym9yZGVyOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHR9LFxyXG5cdGRpc2FibGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gc3Bpbm5lclxyXG5cclxudGhlbWUuc3Bpbm5lciA9IHtcclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRkZWZhdWx0OiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRpbnZlcnRlZDogJ3doaXRlJyxcclxuXHRcdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOlx0NCxcclxuXHRcdG1lZGl1bTpcdDgsXHJcblx0XHRsYXJnZTpcdDE2LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHRoZW1lO1xyXG4iLCIvKipcclxuICogSGVscGVyIG1ldGhvZCB0byBoYW5kbGUgTGlzdCBvcGVyYXRpb25zLCBlLmcuIGNyZWF0aW5nIGl0ZW1zLCBkZWxldGluZyBpdGVtcyxcclxuICogZ2V0dGluZyBpbmZvcm1hdGlvbiBhYm91dCB0aG9zZSBsaXN0cywgZXRjLlxyXG4gKi9cclxuXHJcbmNvbnN0IGxpc3RUb0FycmF5ID0gcmVxdWlyZSgnbGlzdC10by1hcnJheScpO1xyXG5jb25zdCBxcyA9IHJlcXVpcmUoJ3FzJyk7XHJcbmNvbnN0IHhociA9IHJlcXVpcmUoJ3hocicpO1xyXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbi8vIEZpbHRlcnMgZm9yIHRydXRoeSBlbGVtZW50cyBpbiBhbiBhcnJheVxyXG5jb25zdCB0cnV0aHkgPSAoaSkgPT4gaTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvbHVtbnMgb2YgYSBsaXN0LCBzdHJ1Y3R1cmVkIGJ5IGZpZWxkcyBhbmQgaGVhZGluZ3NcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fSBsaXN0IFRoZSBsaXN0IHdlIHdhbnQgdGhlIGNvbHVtbnMgb2ZcclxuICpcclxuICogQHJldHVybiB7QXJyYXl9ICAgICAgIFRoZSBjb2x1bW5zXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb2x1bW5zKGxpc3QpIHtcclxuXHRyZXR1cm4gbGlzdC51aUVsZW1lbnRzLm1hcCgoY29sKSA9PiB7XHJcblx0XHRpZiAoY29sLnR5cGUgPT09ICdoZWFkaW5nJykge1xyXG5cdFx0XHRyZXR1cm4geyB0eXBlOiAnaGVhZGluZycsIGNvbnRlbnQ6IGNvbC5jb250ZW50IH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgZmllbGQgPSBsaXN0LmZpZWxkc1tjb2wuZmllbGRdO1xyXG5cdFx0XHRyZXR1cm4gZmllbGQgPyB7IHR5cGU6ICdmaWVsZCcsIGZpZWxkOiBmaWVsZCwgdGl0bGU6IGZpZWxkLmxhYmVsLCBwYXRoOiBmaWVsZC5wYXRoIH0gOiBudWxsO1xyXG5cdFx0fVxyXG5cdH0pLmZpbHRlcih0cnV0aHkpO1xyXG59XHJcblxyXG4vKipcclxuICogTWFrZSBhbiBhcnJheSBvZiBmaWx0ZXJzIGFuIG9iamVjdCBrZXllZCBieSB0aGUgZmlsdGVyaW5nIHBhdGhcclxuICpcclxuICogQHBhcmFtICB7QXJyYXl9IGZpbHRlckFycmF5IFRoZSBhcnJheSBvZiBmaWx0ZXJzXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICBUaGUgY29ycmVjdGVkIGZpbHRlcnMsIGtleWVkIGJ5IHBhdGhcclxuICovXHJcbmZ1bmN0aW9uIGdldEZpbHRlcnMoZmlsdGVyQXJyYXkpIHtcclxuXHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cdGZpbHRlckFycmF5LmZvckVhY2goKGZpbHRlcikgPT4ge1xyXG5cdFx0ZmlsdGVyc1tmaWx0ZXIuZmllbGQucGF0aF0gPSBmaWx0ZXIudmFsdWU7XHJcblx0fSk7XHJcblx0cmV0dXJuIGZpbHRlcnM7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBzb3J0aW5nIHN0cmluZyBmb3IgdGhlIFVSSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gc29ydC5wYXRocyBUaGUgcGF0aHMgd2Ugd2FudCB0byBzb3J0XHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgIEFsbCB0aGUgc29ydGluZyBxdWVyaWVzIHdlIHdhbnQgYXMgYSBzdHJpbmdcclxuICovXHJcbmZ1bmN0aW9uIGdldFNvcnRTdHJpbmcoc29ydCkge1xyXG5cdHJldHVybiBzb3J0LnBhdGhzLm1hcChpID0+IHtcclxuXHRcdC8vIElmIHdlIHdhbnQgdG8gc29ydCBpbnZlcnRlZCwgd2UgcHJlZml4IGEgXCItXCIgYmVmb3JlIHRoZSBzb3J0IHBhdGhcclxuXHRcdHJldHVybiBpLmludmVydCA/ICctJyArIGkucGF0aCA6IGkucGF0aDtcclxuXHR9KS5maWx0ZXIodHJ1dGh5KS5qb2luKCcsJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQnVpbGQgYSBxdWVyeSBzdHJpbmcgZnJvbSBhIGJ1bmNoIG9mIG9wdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucykge1xyXG5cdGNvbnN0IHF1ZXJ5ID0ge307XHJcblx0aWYgKG9wdGlvbnMuc2VhcmNoKSBxdWVyeS5zZWFyY2ggPSBvcHRpb25zLnNlYXJjaDtcclxuXHRpZiAob3B0aW9ucy5maWx0ZXJzLmxlbmd0aCkgcXVlcnkuZmlsdGVycyA9IEpTT04uc3RyaW5naWZ5KGdldEZpbHRlcnMob3B0aW9ucy5maWx0ZXJzKSk7XHJcblx0aWYgKG9wdGlvbnMuY29sdW1ucykgcXVlcnkuZmllbGRzID0gb3B0aW9ucy5jb2x1bW5zLm1hcChpID0+IGkucGF0aCkuam9pbignLCcpO1xyXG5cdGlmIChvcHRpb25zLnBhZ2UgJiYgb3B0aW9ucy5wYWdlLnNpemUpIHF1ZXJ5LmxpbWl0ID0gb3B0aW9ucy5wYWdlLnNpemU7XHJcblx0aWYgKG9wdGlvbnMucGFnZSAmJiBvcHRpb25zLnBhZ2UuaW5kZXggPiAxKSBxdWVyeS5za2lwID0gKG9wdGlvbnMucGFnZS5pbmRleCAtIDEpICogb3B0aW9ucy5wYWdlLnNpemU7XHJcblx0aWYgKG9wdGlvbnMuc29ydCkgcXVlcnkuc29ydCA9IGdldFNvcnRTdHJpbmcob3B0aW9ucy5zb3J0KTtcclxuXHRxdWVyeS5leHBhbmRSZWxhdGlvbnNoaXBGaWVsZHMgPSB0cnVlO1xyXG5cclxuXHQvLyBDdXN0b20gRmlsdGVyIHRvIEZldGNoIGFsbCBSZWNvcmRzIFdoaWxlIFNlbGVjdGluZyBNYW5hZ2UgQWxsXHJcblxyXG5cdGlmIChvcHRpb25zLmZpbHRlcnMuZmV0Y2hfYWxsX2RhdGEpIHtcclxuXHRcdHF1ZXJ5LmxpbWl0ID0gb3B0aW9ucy5maWx0ZXJzLml0ZW1fY291bnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gJz8nICsgcXMuc3RyaW5naWZ5KHF1ZXJ5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgbWFpbiBsaXN0IGhlbHBlciBjbGFzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKi9cclxuY29uc3QgTGlzdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0Ly8gVE9ETyB0aGVzZSBvcHRpb25zIGFyZSBwb3NzaWJseSB1bnVzZWRcclxuXHRhc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcblx0dGhpcy5jb2x1bW5zID0gZ2V0Q29sdW1ucyh0aGlzKTtcclxuXHR0aGlzLmV4cGFuZGVkRGVmYXVsdENvbHVtbnMgPSB0aGlzLmV4cGFuZENvbHVtbnModGhpcy5kZWZhdWx0Q29sdW1ucyk7XHJcblx0dGhpcy5kZWZhdWx0Q29sdW1uUGF0aHMgPSB0aGlzLmV4cGFuZGVkRGVmYXVsdENvbHVtbnMubWFwKGkgPT4gaS5wYXRoKS5qb2luKCcsJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGl0ZW0gdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7Rm9ybURhdGF9IGZvcm1EYXRhIFRoZSBzdWJtaXR0ZWQgZm9ybSBkYXRhXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdGhlIEFQSSBjYWxsXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5jcmVhdGVJdGVtID0gZnVuY3Rpb24gKGZvcm1EYXRhLCBjYWxsYmFjaykge1xyXG5cdHhocih7XHJcblx0XHR1cmw6IGAke0tleXN0b25lLmFkbWluUGF0aH0vYXBpLyR7dGhpcy5wYXRofS9jcmVhdGVgLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdFx0Ym9keTogZm9ybURhdGEsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgY2FsbGJhY2soZXJyKTtcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIE5PVEU6IHhociBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIEVycm9yIGlmXHJcblx0XHRcdC8vICB0aGVyZSBpcyBhbiBlcnJvciBpbiB0aGUgYnJvd3NlciB0aGF0IHByZXZlbnRzXHJcblx0XHRcdC8vICBzZW5kaW5nIHRoZSByZXF1ZXN0LiBBIEhUVFAgNTAwIHJlc3BvbnNlIGlzIG5vdFxyXG5cdFx0XHQvLyAgZ29pbmcgdG8gY2F1c2UgYW4gZXJyb3IgdG8gYmUgcmV0dXJuZWQuXHJcblx0XHRcdGNhbGxiYWNrKGRhdGEsIG51bGwpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBhIHNwZWNpZmljIGl0ZW1cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIGlkICAgICAgIFRoZSBpZCBvZiB0aGUgaXRlbSB3ZSB3YW50IHRvIHVwZGF0ZVxyXG4gKiBAcGFyYW0gIHtGb3JtRGF0YX0gZm9ybURhdGEgVGhlIHN1Ym1pdHRlZCBmb3JtIGRhdGFcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB0aGUgQVBJIGNhbGxcclxuICovXHJcbkxpc3QucHJvdG90eXBlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbiAoaWQsIGZvcm1EYXRhLCBjYWxsYmFjaykge1xyXG5cdHhocih7XHJcblx0XHR1cmw6IGAke0tleXN0b25lLmFkbWluUGF0aH0vYXBpLyR7dGhpcy5wYXRofS8ke2lkfWAsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHRib2R5OiBmb3JtRGF0YSxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuTGlzdC5wcm90b3R5cGUuZXhwYW5kQ29sdW1ucyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cdGxldCBuYW1lSW5jbHVkZWQgPSBmYWxzZTtcclxuXHRjb25zdCBjb2xzID0gbGlzdFRvQXJyYXkoaW5wdXQpLm1hcChpID0+IHtcclxuXHRcdGNvbnN0IHNwbGl0ID0gaS5zcGxpdCgnfCcpO1xyXG5cdFx0bGV0IHBhdGggPSBzcGxpdFswXTtcclxuXHRcdGxldCB3aWR0aCA9IHNwbGl0WzFdO1xyXG5cdFx0aWYgKHBhdGggPT09ICdfX25hbWVfXycpIHtcclxuXHRcdFx0cGF0aCA9IHRoaXMubmFtZVBhdGg7XHJcblx0XHR9XHJcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW3BhdGhdO1xyXG5cdFx0aWYgKCFmaWVsZCkge1xyXG5cdFx0XHQvLyBUT0RPOiBTdXBwb3J0IGFyYml0YXJ5IGRvY3VtZW50IHBhdGhzXHJcblx0XHRcdGlmICghdGhpcy5oaWRkZW4pIHtcclxuXHRcdFx0XHRpZiAocGF0aCA9PT0gdGhpcy5uYW1lUGF0aCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBMaXN0ICR7dGhpcy5rZXl9IGRpZCBub3Qgc3BlY2lmeSBhbnkgZGVmYXVsdCBjb2x1bW5zIG9yIGEgbmFtZSBmaWVsZGApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYExpc3QgJHt0aGlzLmtleX0gc3BlY2lmaWVkIGFuIGludmFsaWQgZGVmYXVsdCBjb2x1bW46ICR7cGF0aH1gKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHBhdGggPT09IHRoaXMubmFtZVBhdGgpIHtcclxuXHRcdFx0bmFtZUluY2x1ZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpZWxkOiBmaWVsZCxcclxuXHRcdFx0bGFiZWw6IGZpZWxkLmxhYmVsLFxyXG5cdFx0XHRwYXRoOiBmaWVsZC5wYXRoLFxyXG5cdFx0XHR0eXBlOiBmaWVsZC50eXBlLFxyXG5cdFx0XHR3aWR0aDogd2lkdGgsXHJcblx0XHR9O1xyXG5cdH0pLmZpbHRlcih0cnV0aHkpO1xyXG5cdGlmICghbmFtZUluY2x1ZGVkKSB7XHJcblx0XHRjb2xzLnVuc2hpZnQoe1xyXG5cdFx0XHR0eXBlOiAnaWQnLFxyXG5cdFx0XHRsYWJlbDogJ0lEJyxcclxuXHRcdFx0cGF0aDogJ2lkJyxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZXR1cm4gY29scztcclxufTtcclxuXHJcbkxpc3QucHJvdG90eXBlLmV4cGFuZFNvcnQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRjb25zdCBzb3J0ID0ge1xyXG5cdFx0cmF3SW5wdXQ6IGlucHV0IHx8IHRoaXMuZGVmYXVsdFNvcnQsXHJcblx0XHRpc0RlZmF1bHRTb3J0OiBmYWxzZSxcclxuXHR9O1xyXG5cdHNvcnQuaW5wdXQgPSBzb3J0LnJhd0lucHV0O1xyXG5cdGlmIChzb3J0LmlucHV0ID09PSAnX19kZWZhdWx0X18nKSB7XHJcblx0XHRzb3J0LmlzRGVmYXVsdFNvcnQgPSB0cnVlO1xyXG5cdFx0c29ydC5pbnB1dCA9IHRoaXMuc29ydGFibGUgPyAnc29ydE9yZGVyJyA6IHRoaXMubmFtZVBhdGg7XHJcblx0fVxyXG5cdHNvcnQucGF0aHMgPSBsaXN0VG9BcnJheShzb3J0LmlucHV0KS5tYXAocGF0aCA9PiB7XHJcblx0XHRsZXQgaW52ZXJ0ID0gZmFsc2U7XHJcblx0XHRpZiAocGF0aC5jaGFyQXQoMCkgPT09ICctJykge1xyXG5cdFx0XHRpbnZlcnQgPSB0cnVlO1xyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJysnKSB7XHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cigxKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbcGF0aF07XHJcblx0XHRpZiAoIWZpZWxkKSB7XHJcblx0XHRcdC8vIFRPRE86IFN1cHBvcnQgYXJiaXRhcnkgZG9jdW1lbnQgcGF0aHNcclxuXHRcdFx0Y29uc29sZS53YXJuKCdJbnZhbGlkIFNvcnQgc3BlY2lmaWVkOicsIHBhdGgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWVsZDogZmllbGQsXHJcblx0XHRcdHR5cGU6IGZpZWxkLnR5cGUsXHJcblx0XHRcdGxhYmVsOiBmaWVsZC5sYWJlbCxcclxuXHRcdFx0cGF0aDogZmllbGQucGF0aCxcclxuXHRcdFx0aW52ZXJ0OiBpbnZlcnQsXHJcblx0XHR9O1xyXG5cdH0pLmZpbHRlcih0cnV0aHkpO1xyXG5cdHJldHVybiBzb3J0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWQgYSBzcGVjaWZpYyBpdGVtIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICBpdGVtSWQgICBUaGUgaWQgb2YgdGhlIGl0ZW0gd2Ugd2FudCB0byBsb2FkXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvcHRpb25zXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUubG9hZEl0ZW0gPSBmdW5jdGlvbiAoaXRlbUlkLCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRjYWxsYmFjayA9IG9wdGlvbnM7XHJcblx0XHRvcHRpb25zID0gbnVsbDtcclxuXHR9XHJcblx0bGV0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyAnLycgKyBpdGVtSWQ7XHJcblx0Y29uc3QgcXVlcnkgPSBxcy5zdHJpbmdpZnkob3B0aW9ucyk7XHJcblx0aWYgKHF1ZXJ5Lmxlbmd0aCkgdXJsICs9ICc/JyArIHF1ZXJ5O1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0Ly8gUGFzcyB0aGUgZGF0YSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soZGF0YSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9hZCBhbGwgaXRlbXMgb2YgYSBsaXN0LCBvcHRpb25hbGx5IHBhc3Npbmcgb2JqZWN0cyB0byBidWlsZCBhIHF1ZXJ5IHN0cmluZ1xyXG4gKiBmb3Igc29ydGluZyBvciBzZWFyY2hpbmdcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9wdGlvbnNcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5sb2FkSXRlbXMgPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgYnVpbGRRdWVyeVN0cmluZyhvcHRpb25zKTtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSBjYWxsYmFjayhlcnIpO1xyXG5cdFx0Ly8gUGFzcyB0aGUgZGF0YSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soZGF0YSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIGRvd25sb2FkIFVSTCB0byBkb3dubG9hZCBhIGxpc3Qgd2l0aCB0aGUgY3VycmVudCBzb3J0aW5nLCBmaWx0ZXJpbmcsXHJcbiAqIHNlbGVjdGlvbiBhbmQgc2VhcmNoaW5nIG9wdGlvbnNcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICBUaGUgZG93bmxvYWQgVVJMXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5nZXREb3dubG9hZFVSTCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aDtcclxuXHRjb25zdCBwYXJ0cyA9IFtdO1xyXG5cdGlmIChvcHRpb25zLmZvcm1hdCAhPT0gJ2pzb24nKSB7XHJcblx0XHRvcHRpb25zLmZvcm1hdCA9ICdjc3YnO1xyXG5cdH1cclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuc2VhcmNoID8gJ3NlYXJjaD0nICsgb3B0aW9ucy5zZWFyY2ggOiAnJyk7XHJcblx0cGFydHMucHVzaChvcHRpb25zLmZpbHRlcnMubGVuZ3RoID8gJ2ZpbHRlcnM9JyArIEpTT04uc3RyaW5naWZ5KGdldEZpbHRlcnMob3B0aW9ucy5maWx0ZXJzKSkgOiAnJyk7XHJcblx0cGFydHMucHVzaChvcHRpb25zLmNvbHVtbnMgPyAnc2VsZWN0PScgKyBvcHRpb25zLmNvbHVtbnMubWFwKGkgPT4gaS5wYXRoKS5qb2luKCcsJykgOiAnJyk7XHJcblx0cGFydHMucHVzaChvcHRpb25zLnNvcnQgPyAnc29ydD0nICsgZ2V0U29ydFN0cmluZyhvcHRpb25zLnNvcnQpIDogJycpO1xyXG5cdHBhcnRzLnB1c2goJ2V4cGFuZFJlbGF0aW9uc2hpcEZpZWxkcz10cnVlJyk7XHJcblx0cmV0dXJuIHVybCArICcvZXhwb3J0LicgKyBvcHRpb25zLmZvcm1hdCArICc/JyArIHBhcnRzLmZpbHRlcih0cnV0aHkpLmpvaW4oJyYnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWxldGUgYSBzcGVjaWZpYyBpdGVtIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICBpdGVtSWQgICBUaGUgaWQgb2YgdGhlIGl0ZW0gd2Ugd2FudCB0byBkZWxldGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5kZWxldGVJdGVtID0gZnVuY3Rpb24gKGl0ZW1JZCwgY2FsbGJhY2spIHtcclxuXHR0aGlzLmRlbGV0ZUl0ZW1zKFtpdGVtSWRdLCBjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVsZXRlIG11bHRpcGxlIGl0ZW1zIGF0IG9uY2UgdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7QXJyYXl9ICAgaXRlbUlkcyAgQW4gYXJyYXkgb2YgaWRzIG9mIGl0ZW1zIHdlIHdhbnQgdG8gZGVsZXRlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuZGVsZXRlSXRlbXMgPSBmdW5jdGlvbiAoaXRlbUlkcywgY2FsbGJhY2spIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgJy9kZWxldGUnO1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHRqc29uOiB7XHJcblx0XHRcdGlkczogaXRlbUlkcyxcclxuXHRcdH0sXHJcblx0fSwgKGVyciwgcmVzcCwgYm9keSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHQvLyBQYXNzIHRoZSBib2R5IGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgYm9keSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhib2R5KTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbkxpc3QucHJvdG90eXBlLnJlb3JkZXJJdGVtcyA9IGZ1bmN0aW9uIChpdGVtLCBvbGRTb3J0T3JkZXIsIG5ld1NvcnRPcmRlciwgcGFnZU9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArICcvJyArIGl0ZW0uaWQgKyAnL3NvcnRPcmRlci8nICsgb2xkU29ydE9yZGVyICsgJy8nICsgbmV3U29ydE9yZGVyICsgJy8nICsgYnVpbGRRdWVyeVN0cmluZyhwYWdlT3B0aW9ucyk7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHR9LCAoZXJyLCByZXNwLCBib2R5KSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgcGFyc2luZyByZXN1bHRzIGpzb246JywgZSwgYm9keSk7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayhlKTtcclxuXHRcdH1cclxuXHRcdC8vIFBhc3MgdGhlIGJvZHkgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBib2R5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGJvZHkpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdDtcclxuIiwiaW1wb3J0IHVybCBmcm9tICdjbG91ZGluYXJ5LW1pY3JvdXJsJztcclxuY29uc3QgQ0xPVURfTkFNRSA9IHdpbmRvdy5LZXlzdG9uZS5jbG91ZGluYXJ5LmNsb3VkX25hbWU7XHJcblxyXG4vKlxyXG5cdFRha2UgYSBjbG91ZGluYXJ5IHB1YmxpYyBpZCArIG9wdGlvbnMgb2JqZWN0XHJcblx0YW5kIHJldHVybiBhIHVybFxyXG4qL1xyXG5mdW5jdGlvbiBjbG91ZGluYXJ5UmVzaXplIChwdWJsaWNJZCwgb3B0aW9ucyA9IHt9KSB7XHJcblx0aWYgKCFwdWJsaWNJZCB8fCAhQ0xPVURfTkFNRSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gdXJsKHB1YmxpY0lkLCB7XHJcblx0XHRjbG91ZF9uYW1lOiBDTE9VRF9OQU1FLCAvLyBzaW5nbGUgY2xvdWQgZm9yIHRoZSBhZG1pbiBVSVxyXG5cdFx0cXVhbGl0eTogODAsIC8vIDgwJSBxdWFsaXR5LCB3aGljaCB+aGFsdmVzIGltYWdlIGRvd25sb2FkIHNpemVcclxuXHRcdC4uLm9wdGlvbnMsXHJcblx0fSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3VkaW5hcnlSZXNpemU7XHJcbiIsIi8qKlxyXG5cdFZhbGlkYXRlIEhleFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gaGV4XHJcblxyXG5cdDEuIHJlbW92ZSBoYXNoIGlmIHByZXNlbnRcclxuXHQyLiBjb252ZXJ0IGZyb20gMyB0byA2IGRpZ2l0IGNvbG9yIGNvZGUgJiBlbnN1cmUgdmFsaWQgaGV4XHJcbiovXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUhleCAoY29sb3IpIHtcclxuXHRjb25zdCBoZXggPSBjb2xvci5yZXBsYWNlKCcjJywgJycpO1xyXG5cclxuXHRpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xyXG5cdFx0cmV0dXJuIGhleFswXSArIGhleFswXSArIGhleFsxXSArIGhleFsxXSArIGhleFsyXSArIGhleFsyXTtcclxuXHR9XHJcblx0aWYgKGhleC5sZW5ndGggIT09IDYpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjb2xvciB2YWx1ZSBwcm92aWRlZDogXCIke2NvbG9yfVwiYCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gaGV4O1xyXG59O1xyXG5cclxuLyoqXHJcblx0RmFkZSBDb2xvclxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRUYWtlcyBhIGhleGlkZWNpbWFsIGNvbG9yLCBjb252ZXJ0cyBpdCB0byBSR0IgYW5kIGFwcGxpZXMgYW4gYWxwaGEgdmFsdWUuXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvclxyXG5cdEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5ICgwLTEwMClcclxuXHJcblx0MS4gY29udmVydCBoZXggdG8gUkdCXHJcblx0Mi4gY29tYmluZSBhbmQgYWRkIGFscGhhIGNoYW5uZWxcclxuKi9cclxuXHJcbmZ1bmN0aW9uIGZhZGUgKGNvbG9yLCBvcGFjaXR5ID0gMTAwKSB7XHJcblx0Y29uc3QgZGVjaW1hbEZyYWN0aW9uID0gb3BhY2l0eSAvIDEwMDtcclxuXHRjb25zdCBoZXggPSB2YWxpZGF0ZUhleChjb2xvcik7XHJcblxyXG5cdC8vIDEuXHJcblx0Y29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcclxuXHRjb25zdCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpO1xyXG5cdGNvbnN0IGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNik7XHJcblxyXG5cdC8vIDIuXHJcblx0Y29uc3QgcmVzdWx0ID0gJ3JnYmEoJ1xyXG5cdFx0KyByICsgJywnXHJcblx0XHQrIGcgKyAnLCdcclxuXHRcdCsgYiArICcsJ1xyXG5cdFx0KyBkZWNpbWFsRnJhY3Rpb25cclxuXHRcdCsgJyknO1xyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG5cdFNoYWRlIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIGEgaGV4aWRlY2ltYWwgY29sb3IsIGNvbnZlcnRzIGl0IHRvIFJHQiBhbmQgbGlnaHRlbnMgb3IgZGFya2Vuc1xyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3JcclxuXHRAcGFyYW0ge051bWJlcn0gb3BhY2l0eSAoMC0xMDApXHJcblxyXG5cdDEuIGRvIGZhbmN5IFJHQiBiaXR3aXNlIG9wZXJhdGlvbnNcclxuXHQyLiBjb21iaW5lIGJhY2sgaW50byBhIGhleCB2YWx1ZVxyXG4qL1xyXG5cclxuZnVuY3Rpb24gc2hhZGUgKGNvbG9yLCBwZXJjZW50KSB7XHJcblx0Y29uc3QgZGVjaW1hbEZyYWN0aW9uID0gcGVyY2VudCAvIDEwMDtcclxuXHRjb25zdCBoZXggPSB2YWxpZGF0ZUhleChjb2xvcik7XHJcblxyXG5cdC8vIDEuXHJcblx0bGV0IGYgPSBwYXJzZUludChoZXgsIDE2KTtcclxuXHRsZXQgdCA9IGRlY2ltYWxGcmFjdGlvbiA8IDAgPyAwIDogMjU1O1xyXG5cdGxldCBwID0gZGVjaW1hbEZyYWN0aW9uIDwgMCA/IGRlY2ltYWxGcmFjdGlvbiAqIC0xIDogZGVjaW1hbEZyYWN0aW9uO1xyXG5cclxuXHRjb25zdCBSID0gZiA+PiAxNjtcclxuXHRjb25zdCBHID0gZiA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIgPSBmICYgMHgwMDAwRkY7XHJcblxyXG5cdC8vIDIuXHJcblx0cmV0dXJuICcjJyArICgweDEwMDAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBSKSAqIHApICsgUikgKiAweDEwMDAwXHJcblx0XHQrIChNYXRoLnJvdW5kKCh0IC0gRykgKiBwKSArIEcpICogMHgxMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBCKSAqIHApICsgQikpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufTtcclxuXHJcbi8vIHNoYWRlIGhlbHBlcnNcclxuY29uc3QgbGlnaHRlbiA9IHNoYWRlO1xyXG5mdW5jdGlvbiBkYXJrZW4gKGNvbG9yLCBwZXJjZW50KSB7XHJcblx0cmV0dXJuIHNoYWRlKGNvbG9yLCBwZXJjZW50ICogLTEpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG5cdEJsZW5kIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIHR3byBoZXhpZGVjaW1hbCBjb2xvcnMgYW5kIGJsZW5kIHRoZW0gdG9nZXRoZXJcclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yMVxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvcjJcclxuXHRAcGFyYW0ge051bWJlcn0gcGVyY2VudCAoMC0xMDApXHJcblxyXG5cdDEuIGRvIGZhbmN5IFJHQiBiaXR3aXNlIG9wZXJhdGlvbnNcclxuXHQyLiBjb21iaW5lIGJhY2sgaW50byBhIGhleCB2YWx1ZVxyXG4qL1xyXG5cclxuZnVuY3Rpb24gYmxlbmQgKGNvbG9yMSwgY29sb3IyLCBwZXJjZW50KSB7XHJcblx0Y29uc3QgZGVjaW1hbEZyYWN0aW9uID0gcGVyY2VudCAvIDEwMDtcclxuXHRjb25zdCBoZXgxID0gdmFsaWRhdGVIZXgoY29sb3IxKTtcclxuXHRjb25zdCBoZXgyID0gdmFsaWRhdGVIZXgoY29sb3IyKTtcclxuXHJcblx0Ly8gMS5cclxuXHRjb25zdCBmID0gcGFyc2VJbnQoaGV4MSwgMTYpO1xyXG5cdGNvbnN0IHQgPSBwYXJzZUludChoZXgyLCAxNik7XHJcblxyXG5cdGNvbnN0IFIxID0gZiA+PiAxNjtcclxuXHRjb25zdCBHMSA9IGYgPj4gOCAmIDB4MDBGRjtcclxuXHRjb25zdCBCMSA9IGYgJiAweDAwMDBGRjtcclxuXHJcblx0Y29uc3QgUjIgPSB0ID4+IDE2O1xyXG5cdGNvbnN0IEcyID0gdCA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIyID0gdCAmIDB4MDAwMEZGO1xyXG5cclxuXHQvLyAyLlxyXG5cdHJldHVybiAnIycgKyAoMHgxMDAwMDAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChSMiAtIFIxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBSMSkgKiAweDEwMDAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChHMiAtIEcxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBHMSkgKiAweDEwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgoQjIgLSBCMSkgKiBkZWNpbWFsRnJhY3Rpb24pICsgQjEpKS50b1N0cmluZygxNikuc2xpY2UoMSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJsZW5kLFxyXG5cdGRhcmtlbixcclxuXHRmYWRlLFxyXG5cdGxpZ2h0ZW4sXHJcbn07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ29uY2F0ZW5hdGUgQ2xhc3NuYW1lc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIFN1cHBvcnQgY2xhc3NOYW1lIGFzIGFuIGFycmF5OlxyXG4vLyBmb3JjZSBjbGFzc25hbWUgcHJvcCBpbnRvIGFuIGFycmF5IChwb3NzaWJseSBvZiBhcnJheXMpIHRoZW4gZmxhdHRlblxyXG5cclxuLypcclxuXHQvLyBUbyB1c2Ugc3ByZWFkIHRoZSBuZXcgYXJyYXkgaW50byBhcGhyb2RpdGUncyBgY3NzYCBmdW5jdGlvblxyXG5cclxuXHRmdW5jdGlvbiBDb21wb25lbnQgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuY29tcG9uZW50LFxyXG5cdFx0XHQuLi5jb25jYXRDbGFzc25hbWVzKGNsYXNzTmFtZSlcclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxuXHR9O1xyXG4qL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jYXRDbGFzc25hbWVzIChjbGFzc05hbWUpIHtcclxuXHRyZXR1cm4gW2NsYXNzTmFtZV0ucmVkdWNlKChhLCBiKSA9PiB7XHJcblx0XHRyZXR1cm4gYS5jb25jYXQoYik7XHJcblx0fSwgW10pO1xyXG59O1xyXG4iLCIvKipcclxuXHRMaW5lYXIgR3JhZGllbnRcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0U2hvcnQtaGFuZCBoZWxwZXIgZm9yIGFkZGluZyBhIGxpbmVhciBncmFkaWVudCB0byB5b3VyIGNvbXBvbmVudC5cclxuXHJcblx0LSBAcGFyYW0ge1N0cmluZ30gc2lkZU9yQ29ybmVyXHJcblx0LSBAcGFyYW0ge1N0cmluZ30gdG9wXHJcblx0LSBAcGFyYW0ge1N0cmluZ30gYm90dG9tXHJcblx0LSBAcGFyYW0ge1N0cmluZ30gYmFzZSAob3B0aW9uYWwpXHJcblx0LSBAcmV0dXJucyB7T2JqZWN0fSBjc3MgbGluZWFyIGdyYWRpZW50IGRlY2xhcmF0aW9uXHJcblxyXG5cdFNwcmVhZCB0aGUgZGVjbGFyYXRpb24gaW50byB5b3VyIGNvbXBvbmVudCBjbGFzczpcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0bXlDb21wb25lbnRDbGFzczoge1xyXG5cdFx0Li4ubGluZWFyR3JhZGllbnQocmVkLCBibHVlKSxcclxuXHR9XHJcbiovXHJcblxyXG5mdW5jdGlvbiBsaW5lYXJHcmFkaWVudCAoZGlyZWN0aW9uLCB0b3AsIGJvdHRvbSwgYmFzZSA9ICcnKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoJHtkaXJlY3Rpb259LCAke3RvcH0gMCUsICR7Ym90dG9tfSAxMDAlKSAke2Jhc2V9YCxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBWZXJ0aWNhbCBHcmFkaWVudFxyXG5mdW5jdGlvbiBncmFkaWVudFZlcnRpY2FsICh0b3AsIGJvdHRvbSwgYmFzZSkge1xyXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudCgndG8gYm90dG9tJywgdG9wLCBib3R0b20sIGJhc2UpO1xyXG59XHJcblxyXG4vLyBIb3Jpem9udGFsIEdyYWRpZW50XHJcbmZ1bmN0aW9uIGdyYWRpZW50SG9yaXpvbnRhbCAodG9wLCBib3R0b20sIGJhc2UpIHtcclxuXHRyZXR1cm4gbGluZWFyR3JhZGllbnQoJ3RvIHJpZ2h0JywgdG9wLCBib3R0b20sIGJhc2UpO1xyXG59XHJcblxyXG4vKipcclxuXHRCb3JkZXIgUmFkaXVzXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFNob3J0LWhhbmQgaGVscGVyIGZvciBib3JkZXIgcmFkaWlcclxuKi9cclxuXHJcbi8vIHRvcFxyXG5mdW5jdGlvbiBib3JkZXJUb3BSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BSaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIHJpZ2h0XHJcbmZ1bmN0aW9uIGJvcmRlclJpZ2h0UmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gYm90dG9tXHJcbmZ1bmN0aW9uIGJvcmRlckJvdHRvbVJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gbGVmdFxyXG5mdW5jdGlvbiBib3JkZXJMZWZ0UmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIFJldHVyblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Ym9yZGVyVG9wUmFkaXVzLFxyXG5cdGJvcmRlclJpZ2h0UmFkaXVzLFxyXG5cdGJvcmRlckJvdHRvbVJhZGl1cyxcclxuXHRib3JkZXJMZWZ0UmFkaXVzLFxyXG5cclxuXHRncmFkaWVudEhvcml6b250YWwsXHJcblx0Z3JhZGllbnRWZXJ0aWNhbCxcclxufTtcclxuIiwiLyoqXHJcbiAqIEV4cG9ydHMgYW4gb2JqZWN0IG9mIGxpc3RzLCBrZXllZCB3aXRoIHRoZWlyIGtleSBpbnN0ZWFkIG9mIHRoZWlyIG5hbWUgYW5kXHJcbiAqIHdyYXBwZWQgd2l0aCB0aGUgTGlzdCBoZWxwZXIgKC4vTGlzdC5qcylcclxuICovXHJcblxyXG5pbXBvcnQgTGlzdCBmcm9tICcuL0xpc3QnO1xyXG5cclxuZXhwb3J0cy5saXN0c0J5S2V5ID0ge307XHJcbmV4cG9ydHMubGlzdHNCeVBhdGggPSB7fTtcclxuXHJcbmZvciAoY29uc3Qga2V5IGluIEtleXN0b25lLmxpc3RzKSB7XHJcblx0Ly8gR3VhcmQgZm9yLWluc1xyXG5cdGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKEtleXN0b25lLmxpc3RzLCBrZXkpKSB7XHJcblx0XHR2YXIgbGlzdCA9IG5ldyBMaXN0KEtleXN0b25lLmxpc3RzW2tleV0pO1xyXG5cdFx0ZXhwb3J0cy5saXN0c0J5S2V5W2tleV0gPSBsaXN0O1xyXG5cdFx0ZXhwb3J0cy5saXN0c0J5UGF0aFtsaXN0LnBhdGhdID0gbGlzdDtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgZmV3IGhlbHBlciBtZXRob2RzIGZvciBzdHJpbmdzXHJcbiAqL1xyXG5cclxuaW1wb3J0IGluZmxlY3QgZnJvbSAnaSc7XHJcbmltcG9ydCB7IGNvbXBhY3QsIHNpemUgfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgb2YgYSBzdHJpbmcgYmFzZWQgb24gYSBudW1iZXJcclxuICogb3IgbnVtYmVyIG9mIGl0ZW1zIGluIGFuIGFycmF5LlxyXG4gKlxyXG4gKiBJZiBhcml0eSBpcyAxLCByZXR1cm5zIHRoZSBwbHVyYWwgZm9ybSBvZiB0aGUgd29yZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGNvdW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzaW5ndWxhciBzdHJpbmdcclxuICogQHBhcmFtIHtTdHJpbmd9IHBsdXJhbCBzdHJpbmdcclxuICogQHJldHVybiB7U3RyaW5nfSBzaW5ndWxhciBvciBwbHVyYWwsICogaXMgcmVwbGFjZWQgd2l0aCBjb3VudFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMucGx1cmFsID0gZnVuY3Rpb24gKGNvdW50LCBzbiwgcGwpIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0cmV0dXJuIGluZmxlY3QucGx1cmFsaXplKGNvdW50KTtcclxuXHR9XHJcblx0aWYgKHR5cGVvZiBzbiAhPT0gJ3N0cmluZycpIHNuID0gJyc7XHJcblx0aWYgKCFwbCkge1xyXG5cdFx0cGwgPSBpbmZsZWN0LnBsdXJhbGl6ZShzbik7XHJcblx0fVxyXG5cdGlmICh0eXBlb2YgY291bnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRjb3VudCA9IE51bWJlcihjb3VudCk7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgY291bnQgIT09ICdudW1iZXInKSB7XHJcblx0XHRjb3VudCA9IHNpemUoY291bnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gKGNvdW50ID09PSAxID8gc24gOiBwbCkucmVwbGFjZSgnKicsIGNvdW50KTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGxldHRlciBpbiBhIHN0cmluZyB0byB1cHBlcmNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMudXBjYXNlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdGlmIChzdHIgJiYgc3RyLnRvU3RyaW5nKSBzdHIgPSBzdHIudG9TdHJpbmcoKTtcclxuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycgfHwgIXN0ci5sZW5ndGgpIHJldHVybiAnJztcclxuXHRyZXR1cm4gKHN0ci5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSkpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgbGV0dGVyIGluIGEgc3RyaW5nIHRvIGxvd2VyY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gU3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5kb3duY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRpZiAoc3RyICYmIHN0ci50b1N0cmluZykgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8ICFzdHIubGVuZ3RoKSByZXR1cm4gJyc7XHJcblx0cmV0dXJuIChzdHIuc3Vic3RyKDAsIDEpLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gdGl0bGUgY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gVGl0bGUgQ2FzZSBmb3JtIG9mIHN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMudGl0bGVjYXNlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdGlmIChzdHIgJiYgc3RyLnRvU3RyaW5nKSBzdHIgPSBzdHIudG9TdHJpbmcoKTtcclxuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycgfHwgIXN0ci5sZW5ndGgpIHJldHVybiAnJztcclxuXHRzdHIgPSBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJyk7XHJcblx0dmFyIHBhcnRzID0gc3RyLnNwbGl0KC9cXHN8X3xcXC0vKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAocGFydHNbaV0gJiYgIS9eW0EtWjAtOV0rJC8udGVzdChwYXJ0c1tpXSkpIHtcclxuXHRcdFx0cGFydHNbaV0gPSBleHBvcnRzLnVwY2FzZShwYXJ0c1tpXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBjb21wYWN0KHBhcnRzKS5qb2luKCcgJyk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGNhbWVsIGNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGxvd2VyY2FzZUZpcnN0V29yZFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGNhbWVsLWNhc2UgZm9ybSBvZiBzdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLmNhbWVsY2FzZSA9IGZ1bmN0aW9uIChzdHIsIGxjKSB7XHJcblx0cmV0dXJuIGluZmxlY3QuY2FtZWxpemUoc3RyLCAhKGxjKSk7XHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IGRhcmtlbiwgZmFkZSB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9jb2xvcic7XHJcbmltcG9ydCBFIGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9jb25zdGFudHMnO1xyXG5cclxudmFyIENoZWNrYm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQ2hlY2tib3gnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxyXG5cdFx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0cmVhZG9ubHk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbXBvbmVudDogJ2J1dHRvbicsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFjdGl2ZTogbnVsbCxcclxuXHRcdFx0Zm9jdXM6IG51bGwsXHJcblx0XHRcdGhvdmVyOiBudWxsLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLCBmYWxzZSk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCwgZmFsc2UpO1xyXG5cdH0sXHJcblx0Z2V0U3R5bGVzICgpIHtcclxuXHRcdGNvbnN0IHsgY2hlY2tlZCwgcmVhZG9ubHkgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IGFjdGl2ZSwgZm9jdXMsIGhvdmVyIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGNvbnN0IGNoZWNrZWRDb2xvciA9ICcjMzk5OWZjJztcclxuXHJcblx0XHRsZXQgYmFja2dyb3VuZCA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyBjaGVja2VkQ29sb3IgOiAnd2hpdGUnO1xyXG5cdFx0bGV0IGJvcmRlckNvbG9yID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICdyZ2JhKDAsMCwwLDAuMTUpIHJnYmEoMCwwLDAsMC4xKSByZ2JhKDAsMCwwLDAuMDUpJyA6ICdyZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjIpIHJnYmEoMCwwLDAsMC4xNSknO1xyXG5cdFx0bGV0IGJveFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuMzMpJyA6ICdpbnNldCAwIDFweCAwIHJnYmEoMCwwLDAsMC4wNiknO1xyXG5cdFx0bGV0IGNvbG9yID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICd3aGl0ZScgOiAnI2JiYic7XHJcblx0XHRjb25zdCB0ZXh0U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4yKScgOiBudWxsO1xyXG5cclxuXHRcdC8vIHBzZXVkbyBzdGF0ZVxyXG5cdFx0aWYgKGhvdmVyICYmICFmb2N1cyAmJiAhcmVhZG9ubHkpIHtcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAoY2hlY2tlZCkgPyAncmdiYSgwLDAsMCwwLjEpIHJnYmEoMCwwLDAsMC4xNSkgcmdiYSgwLDAsMCwwLjIpJyA6ICdyZ2JhKDAsMCwwLDAuMzUpIHJnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMjUpJztcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmUpIHtcclxuXHRcdFx0YmFja2dyb3VuZCA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyBkYXJrZW4oY2hlY2tlZENvbG9yLCAyMCkgOiAnI2VlZSc7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICdyZ2JhKDAsMCwwLDAuMjUpIHJnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMzUpJyA6ICdyZ2JhKDAsMCwwLDAuNCkgcmdiYSgwLDAsMCwwLjM1KSByZ2JhKDAsMCwwLDAuMyknO1xyXG5cdFx0XHRib3hTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJzAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjMzKScgOiAnaW5zZXQgMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4yKSc7XHJcblx0XHR9XHJcblx0XHRpZiAoZm9jdXMgJiYgIWFjdGl2ZSkge1xyXG5cdFx0XHRib3JkZXJDb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAncmdiYSgwLDAsMCwwLjI1KSByZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjM1KScgOiBjaGVja2VkQ29sb3I7XHJcblx0XHRcdGJveFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyBgMCAwIDAgM3B4ICR7ZmFkZShjaGVja2VkQ29sb3IsIDE1KX1gIDogYGluc2V0IDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMTUpLCAwIDAgMCAzcHggJHtmYWRlKGNoZWNrZWRDb2xvciwgMTUpfWA7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbm9lZGl0XHJcblx0XHRpZiAocmVhZG9ubHkpIHtcclxuXHRcdFx0YmFja2dyb3VuZCA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknO1xyXG5cdFx0XHRib3JkZXJDb2xvciA9ICdyZ2JhKDAsMCwwLDAuMSknO1xyXG5cdFx0XHRib3hTaGFkb3cgPSAnbm9uZSc7XHJcblx0XHRcdGNvbG9yID0gY2hlY2tlZCA/IGNoZWNrZWRDb2xvciA6ICcjYmJiJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdFx0YmFja2dyb3VuZDogYmFja2dyb3VuZCxcclxuXHRcdFx0Ym9yZGVyOiAnMXB4IHNvbGlkJyxcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IGJvcmRlckNvbG9yLFxyXG5cdFx0XHRib3JkZXJSYWRpdXM6IEUuYm9yZGVyUmFkaXVzLnNtLFxyXG5cdFx0XHRib3hTaGFkb3c6IGJveFNoYWRvdyxcclxuXHRcdFx0Y29sb3I6IGNvbG9yLFxyXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdFx0Zm9udFNpemU6IDE0LFxyXG5cdFx0XHRoZWlnaHQ6IDE2LFxyXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMTVweCcsXHJcblx0XHRcdG91dGxpbmU6ICdub25lJyxcclxuXHRcdFx0cGFkZGluZzogMCxcclxuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHRcdFx0dGV4dFNoYWRvdzogdGV4dFNoYWRvdyxcclxuXHRcdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHRcdHdpZHRoOiAxNixcclxuXHJcblx0XHRcdG1zVHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHRcdE1velRyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0XHRXZWJraXRUcmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdFx0dHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aGFuZGxlS2V5RG93biAoZSkge1xyXG5cdFx0aWYgKGUua2V5Q29kZSAhPT0gMzIpIHJldHVybjtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKHRydWUpO1xyXG5cdH0sXHJcblx0aGFuZGxlS2V5VXAgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUoZmFsc2UpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VPdmVyICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlSG92ZXIodHJ1ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZURvd24gKCkge1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUodHJ1ZSk7XHJcblx0XHR0aGlzLnRvZ2dsZUZvY3VzKHRydWUpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VVcCAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZShmYWxzZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZU91dCAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUhvdmVyKGZhbHNlKTtcclxuXHR9LFxyXG5cdHRvZ2dsZUFjdGl2ZSAocHNldWRvKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgYWN0aXZlOiBwc2V1ZG8gfSk7XHJcblx0fSxcclxuXHR0b2dnbGVIb3ZlciAocHNldWRvKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgaG92ZXI6IHBzZXVkbyB9KTtcclxuXHR9LFxyXG5cdHRvZ2dsZUZvY3VzIChwc2V1ZG8pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBmb2N1czogcHNldWRvIH0pO1xyXG5cdH0sXHJcblx0aGFuZGxlQ2hhbmdlICgpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoIXRoaXMucHJvcHMuY2hlY2tlZCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGVja2VkLCByZWFkb25seSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2hlY2tlZCcsICdjb21wb25lbnQnLCAnb25DaGFuZ2UnLCAncmVhZG9ubHknKTtcclxuXHRcdHByb3BzLnN0eWxlID0gdGhpcy5nZXRTdHlsZXMoKTtcclxuXHRcdHByb3BzLnJlZiA9ICdjaGVja2JveCc7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjbGFzc25hbWVzKCdvY3RpY29uJywge1xyXG5cdFx0XHQnb2N0aWNvbi1jaGVjayc6IGNoZWNrZWQsXHJcblx0XHRcdCdvY3RpY29uLXgnOiAodHlwZW9mIGNoZWNrZWQgPT09ICdib29sZWFuJykgJiYgIWNoZWNrZWQgJiYgcmVhZG9ubHksXHJcblx0XHR9KTtcclxuXHRcdHByb3BzLnR5cGUgPSByZWFkb25seSA/IG51bGwgOiAnYnV0dG9uJztcclxuXHJcblx0XHRwcm9wcy5vbktleURvd24gPSB0aGlzLmhhbmRsZUtleURvd247XHJcblx0XHRwcm9wcy5vbktleVVwID0gdGhpcy5oYW5kbGVLZXlVcDtcclxuXHJcblx0XHRwcm9wcy5vbk1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duO1xyXG5cdFx0cHJvcHMub25Nb3VzZVVwID0gdGhpcy5oYW5kbGVNb3VzZVVwO1xyXG5cdFx0cHJvcHMub25Nb3VzZU92ZXIgPSB0aGlzLmhhbmRsZU1vdXNlT3ZlcjtcclxuXHRcdHByb3BzLm9uTW91c2VPdXQgPSB0aGlzLmhhbmRsZU1vdXNlT3V0O1xyXG5cclxuXHRcdHByb3BzLm9uQ2xpY2sgPSByZWFkb25seSA/IG51bGwgOiB0aGlzLmhhbmRsZUNoYW5nZTtcclxuXHRcdHByb3BzLm9uRm9jdXMgPSByZWFkb25seSA/IG51bGwgOiAoKSA9PiB0aGlzLnRvZ2dsZUZvY3VzKHRydWUpO1xyXG5cdFx0cHJvcHMub25CbHVyID0gcmVhZG9ubHkgPyBudWxsIDogKCkgPT4gdGhpcy50b2dnbGVGb2N1cyhmYWxzZSk7XHJcblxyXG5cdFx0Y29uc3Qgbm9kZSA9IHJlYWRvbmx5ID8gJ3NwYW4nIDogdGhpcy5wcm9wcy5jb21wb25lbnQ7XHJcblxyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZSwgcHJvcHMpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuLy8gTk9URSBtYXJnaW5Cb3R0b20gb2YgMXB4IHN0b3BzIHRoaW5ncyBqdW1waW5nIGFyb3VuZFxyXG4vLyBUT0RPIGZpbmQgb3V0IHdoeSB0aGlzIGlzIG5lY2Vzc2FyeVxyXG5cclxuZnVuY3Rpb24gQ29sbGFwc2VkRmllbGRMYWJlbCAoeyBzdHlsZSwgLi4ucHJvcHMgfSkge1xyXG5cdGNvbnN0IF9fc3R5bGVfXyA9IHtcclxuXHRcdG1hcmdpbkJvdHRvbTogMSxcclxuXHRcdHBhZGRpbmdMZWZ0OiAwLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAwLFxyXG5cdFx0Li4uc3R5bGUsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gdmFyaWFudD1cImxpbmtcIiBzdHlsZT17X19zdHlsZV9ffSB7Li4ucHJvcHN9IC8+XHJcblx0KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29sbGFwc2VkRmllbGRMYWJlbDtcclxuIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgRGF5UGlja2VyIGZyb20gJ3JlYWN0LWRheS1waWNrZXInO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBQb3BvdXQgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvUG9wb3V0JztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubGV0IGxhc3RJZCA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVJbnB1dCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0XHRwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCcsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdGNvbnN0IGlkID0gKytsYXN0SWQ7XHJcblx0XHRsZXQgbW9udGggPSBuZXcgRGF0ZSgpO1xyXG5cdFx0Y29uc3QgeyBmb3JtYXQsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0aWYgKG1vbWVudCh2YWx1ZSwgZm9ybWF0LCB0cnVlKS5pc1ZhbGlkKCkpIHtcclxuXHRcdFx0bW9udGggPSBtb21lbnQodmFsdWUsIGZvcm1hdCkudG9EYXRlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRpZDogYF9EYXRlSW5wdXRfJHtpZH1gLFxyXG5cdFx0XHRtb250aDogbW9udGgsXHJcblx0XHRcdHBpY2tlcklzT3BlbjogZmFsc2UsXHJcblx0XHRcdGlucHV0VmFsdWU6IHZhbHVlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHRoaXMuc2hvd0N1cnJlbnRNb250aCgpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5ld1Byb3BzKSB7XHJcblx0XHRpZiAobmV3UHJvcHMudmFsdWUgPT09IHRoaXMucHJvcHMudmFsdWUpIHJldHVybjtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRtb250aDogbW9tZW50KG5ld1Byb3BzLnZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCkudG9EYXRlKCksXHJcblx0XHRcdGlucHV0VmFsdWU6IG5ld1Byb3BzLnZhbHVlLFxyXG5cdFx0fSwgdGhpcy5zaG93Q3VycmVudE1vbnRoKTtcclxuXHR9LFxyXG5cdGZvY3VzICgpIHtcclxuXHRcdGlmICghdGhpcy5yZWZzLmlucHV0KSByZXR1cm47XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaW5wdXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHRoYW5kbGVJbnB1dENoYW5nZSAoZSkge1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gZS50YXJnZXQ7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogdmFsdWUgfSwgdGhpcy5zaG93Q3VycmVudE1vbnRoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUtleVByZXNzIChlKSB7XHJcblx0XHRpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQvLyBJZiB0aGUgZGF0ZSBpcyBzdHJpY3RseSBlcXVhbCB0byB0aGUgZm9ybWF0IHN0cmluZywgZGlzcGF0Y2ggb25DaGFuZ2VcclxuXHRcdFx0aWYgKG1vbWVudCh0aGlzLnN0YXRlLmlucHV0VmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0LCB0cnVlKS5pc1ZhbGlkKCkpIHtcclxuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgdmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSB9KTtcclxuXHRcdFx0Ly8gSWYgdGhlIGRhdGUgaXMgbm90IHN0cmljdGx5IGVxdWFsLCBvbmx5IGNoYW5nZSB0aGUgdGFiIHRoYXQgaXMgZGlzcGxheWVkXHJcblx0XHRcdH0gZWxzZSBpZiAobW9tZW50KHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0bW9udGg6IG1vbWVudCh0aGlzLnN0YXRlLmlucHV0VmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0KS50b0RhdGUoKSxcclxuXHRcdFx0XHR9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRoYW5kbGVEYXlTZWxlY3QgKGUsIGRhdGUsIG1vZGlmaWVycykge1xyXG5cdFx0aWYgKG1vZGlmaWVycyAmJiBtb2RpZmllcnMuZGlzYWJsZWQpIHJldHVybjtcclxuXHJcblx0XHR2YXIgdmFsdWUgPSBtb21lbnQoZGF0ZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KTtcclxuXHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgdmFsdWUgfSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0cGlja2VySXNPcGVuOiBmYWxzZSxcclxuXHRcdFx0bW9udGg6IGRhdGUsXHJcblx0XHRcdGlucHV0VmFsdWU6IHZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzaG93UGlja2VyICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBwaWNrZXJJc09wZW46IHRydWUgfSwgdGhpcy5zaG93Q3VycmVudE1vbnRoKTtcclxuXHR9LFxyXG5cdHNob3dDdXJyZW50TW9udGggKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlZnMucGlja2VyKSByZXR1cm47XHJcblx0XHR0aGlzLnJlZnMucGlja2VyLnNob3dNb250aCh0aGlzLnN0YXRlLm1vbnRoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZvY3VzIChlKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS5waWNrZXJJc09wZW4pIHJldHVybjtcclxuXHRcdHRoaXMuc2hvd1BpY2tlcigpO1xyXG5cdH0sXHJcblx0aGFuZGxlQ2FuY2VsICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBwaWNrZXJJc09wZW46IGZhbHNlIH0pO1xyXG5cdH0sXHJcblx0aGFuZGxlQmx1ciAoZSkge1xyXG5cdFx0bGV0IHJ0ID0gZS5yZWxhdGVkVGFyZ2V0IHx8IGUubmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldDtcclxuXHRcdGNvbnN0IHBvcG91dCA9IHRoaXMucmVmcy5wb3BvdXQuZ2V0UG9ydGFsRE9NTm9kZSgpO1xyXG5cdFx0d2hpbGUgKHJ0KSB7XHJcblx0XHRcdGlmIChydCA9PT0gcG9wb3V0KSByZXR1cm47XHJcblx0XHRcdHJ0ID0gcnQucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRwaWNrZXJJc09wZW46IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLnByb3BzLnZhbHVlO1xyXG5cdFx0Ly8gcmVhY3QtZGF5LXBpY2tlciBhZGRzIGEgY2xhc3MgdG8gdGhlIHNlbGVjdGVkIGRheSBiYXNlZCBvbiB0aGlzXHJcblx0XHRjb25zdCBtb2RpZmllcnMgPSB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZGF5KS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpID09PSBzZWxlY3RlZERheSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdFx0aWQ9e3RoaXMuc3RhdGUuaWR9XHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLnByb3BzLm5hbWV9XHJcblx0XHRcdFx0XHRvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0b25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cclxuXHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9XHJcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5mb3JtYXR9XHJcblx0XHRcdFx0XHRyZWY9XCJpbnB1dFwiXHJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5pbnB1dFZhbHVlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PFBvcG91dFxyXG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLnBpY2tlcklzT3Blbn1cclxuXHRcdFx0XHRcdG9uQ2FuY2VsPXt0aGlzLmhhbmRsZUNhbmNlbH1cclxuXHRcdFx0XHRcdHJlZj1cInBvcG91dFwiXHJcblx0XHRcdFx0XHRyZWxhdGl2ZVRvSUQ9e3RoaXMuc3RhdGUuaWR9XHJcblx0XHRcdFx0XHR3aWR0aD17MjYwfVxyXG5cdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRtb2RpZmllcnM9e21vZGlmaWVyc31cclxuXHRcdFx0XHRcdFx0b25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlTZWxlY3R9XHJcblx0XHRcdFx0XHRcdHJlZj1cInBpY2tlclwiXHJcblx0XHRcdFx0XHRcdHRhYkluZGV4PXstMX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Qb3BvdXQ+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgeyBmYWRlIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2NvbG9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBGaWxlQ2hhbmdlTWVzc2FnZSAoeyBzdHlsZSwgY29sb3IsIC4uLnByb3BzIH0pIHtcclxuXHRjb25zdCBzdHlsZXMgPSB7XHJcblx0XHRtYXJnaW5SaWdodDogMTAsXHJcblx0XHRtaW5XaWR0aDogMCxcclxuXHRcdC4uLnN0eWxlLFxyXG5cdH07XHJcblxyXG5cdGlmIChjb2xvciAhPT0gJ2RlZmF1bHQnKSB7XHJcblx0XHRzdHlsZXMuYmFja2dyb3VuZENvbG9yID0gZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDEwKTtcclxuXHRcdHN0eWxlcy5ib3JkZXJDb2xvciA9IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAzMCk7XHJcblx0XHRzdHlsZXMuY29sb3IgPSB0aGVtZS5jb2xvcltjb2xvcl07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRub2VkaXRcclxuXHRcdFx0c3R5bGU9e3N0eWxlc31cclxuXHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG59O1xyXG5cclxuRmlsZUNoYW5nZU1lc3NhZ2UucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoWydkYW5nZXInLCAnZGVmYXVsdCcsICdzdWNjZXNzJ10pLFxyXG59O1xyXG5GaWxlQ2hhbmdlTWVzc2FnZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmlsZUNoYW5nZU1lc3NhZ2U7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8qXHJcblx0RXhwb3NlIGludGVybmFsIHJlZiB0byBwYXJlbnRcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRGaWVsZC5jcmVhdGUoe1xyXG5cdFx0dHJpZ2dlckZpbGVCcm93c2VyICgpIHtcclxuXHRcdFx0dGhpcy5yZWZzLmZpbGVJbnB1dC5jbGlja0RvbU5vZGUoKTtcclxuXHRcdH0sXHJcblx0XHRyZW5kZXIgKCkge1xyXG5cdFx0XHQ8SGlkZGVuRmlsZUlucHV0IHJlZj1cImZpbGVJbnB1dFwiIC8+XHJcblx0XHR9XHJcblx0fSk7XHJcbiovXHJcblxyXG5jbGFzcyBIaWRkZW5GaWxlSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5jbGVhclZhbHVlID0gdGhpcy5jbGVhclZhbHVlLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmNsaWNrRG9tTm9kZSA9IHRoaXMuY2xpY2tEb21Ob2RlLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmhhc1ZhbHVlID0gdGhpcy5oYXNWYWx1ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRjbGVhclZhbHVlICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LnZhbHVlID0gJyc7XHJcblx0fVxyXG5cdGNsaWNrRG9tTm9kZSAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5jbGljaygpO1xyXG5cdH1cclxuXHRoYXNWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gISF0aGlzLnRhcmdldC52YWx1ZTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgc3R5bGUsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3Qgc2V0UmVmID0gKG4pID0+ICh0aGlzLnRhcmdldCA9IG4pO1xyXG5cdFx0Y29uc3Qgc3R5bGVzID0ge1xyXG5cdFx0XHRsZWZ0OiAtOTk5OSxcclxuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRcdC4uLnN0eWxlLFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHR7Li4ucHJvcHN9XHJcblx0XHRcdFx0c3R5bGU9e3N0eWxlc31cclxuXHRcdFx0XHRyZWY9e3NldFJlZn1cclxuXHRcdFx0XHR0YWJJbmRleD1cIi0xXCJcclxuXHRcdFx0XHR0eXBlPVwiZmlsZVwiXHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkhpZGRlbkZpbGVJbnB1dC5wcm9wVHlwZXMgPSB7XHJcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhpZGRlbkZpbGVJbnB1dDtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC90aGVtZSc7XHJcblxyXG4vLyBGSVhNRSBzdGF0aWMgb2N0aWNvbiBjbGFzc2VzIGxlYW5pbmcgb24gRWxlbWVudGFsIHRvIGF2b2lkIGR1cGxpY2F0ZVxyXG4vLyBmb250IGFuZCBDU1M7IGluZmxhdGluZyB0aGUgcHJvamVjdCBzaXplXHJcblxyXG5jb25zdCBJQ09OX01BUCA9IHtcclxuXHRsb2FkaW5nOiAnJyxcclxuXHRyZW1vdmU6ICdtZWdhLW9jdGljb24gb2N0aWNvbi10cmFzaGNhbicsXHJcblx0dXBsb2FkOiAnbWVnYS1vY3RpY29uIG9jdGljb24tY2xvdWQtdXBsb2FkJyxcclxufTtcclxuXHJcbmZ1bmN0aW9uIEltYWdlVGh1bWJuYWlsICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGNvbXBvbmVudCwgbWFzaywgLi4ucHJvcHMgfSkge1xyXG5cdGNvbnN0IG1hc2tVSSA9IG1hc2sgPyAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMubWFzaykgKyBgICR7SUNPTl9NQVBbbWFza119YH0+XHJcblx0XHRcdHttYXNrID09PSAnbG9hZGluZydcclxuXHRcdFx0XHQ/IDxTcGlubmVyIGNvbG9yPVwiaW52ZXJ0ZWRcIiAvPlxyXG5cdFx0XHRcdDogbnVsbH1cclxuXHRcdDwvZGl2PlxyXG5cdCkgOiBudWxsO1xyXG5cclxuXHQvLyBhcHBseSBob3ZlciBhbmQgZm9jdXMgc3R5bGVzIG9ubHkgd2hlbiB1c2luZyBhbiBhbmNob3JcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJhc2UsXHJcblx0XHRjb21wb25lbnQgPT09ICdhJyA/IGNsYXNzZXMuYW5jaG9yIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdC8vIGFwcGVuZCB0aGUgbWFzayBVSSB0byBjaGlsZHJlblxyXG5cdHByb3BzLmNoaWxkcmVuID0gW10uY29uY2F0KGNoaWxkcmVuLCBbbWFza1VJXSk7XHJcblxyXG5cdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xyXG59O1xyXG5cclxuSW1hZ2VUaHVtYm5haWwucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0bWFzazogUHJvcFR5cGVzLm9uZU9mKFsnbG9hZGluZycsICdyZW1vdmUnLCAndXBsb2FkJ10pLFxyXG59O1xyXG5JbWFnZVRodW1ibmFpbC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnc3BhbicsXHJcbn07XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcbmNvbnN0IEdVVFRFUl9XSURUSCA9IDQ7XHJcbmNvbnN0IGhvdmVyQW5kRm9jdXNTdHlsZXMgPSB7XHJcblx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5mb2N1cyxcclxuXHRvdXRsaW5lOiAnbm9uZScsXHJcbn07XHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0YmFzZToge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0fWAsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0bGluZUhlaWdodDogJzEnLFxyXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcclxuXHRcdHBhZGRpbmc6IEdVVFRFUl9XSURUSCxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblx0YW5jaG9yOiB7XHJcblx0XHQnOmhvdmVyJzogaG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdC4uLmhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIG1hc2tcclxuXHRtYXNrOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXHJcblx0XHRib3R0b206IEdVVFRFUl9XSURUSCxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdFx0bGVmdDogR1VUVEVSX1dJRFRILFxyXG5cdFx0bGluZUhlaWdodDogOTAsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHJpZ2h0OiBHVVRURVJfV0lEVEgsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdFx0dG9wOiBHVVRURVJfV0lEVEgsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VUaHVtYm5haWw7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuZnVuY3Rpb24gSXRlbXNUYWJsZUNlbGwgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnSXRlbUxpc3RfX2NvbCcsIGNsYXNzTmFtZSk7XHJcblxyXG5cdHJldHVybiA8dGQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbXNUYWJsZUNlbGw7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcclxuXHJcbmZ1bmN0aW9uIEl0ZW1zVGFibGVWYWx1ZSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQsXHJcblx0ZW1wdHksXHJcblx0ZXh0ZXJpb3IsXHJcblx0ZmllbGQsXHJcblx0aHJlZixcclxuXHRpbnRlcmlvcixcclxuXHRwYWRkZWQsXHJcblx0dG8sXHJcblx0dHJ1bmNhdGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIFRPRE8gcmVtb3ZlIGluIHRoZSBuZXh0IHJlbGVhc2VcclxuXHRpZiAoaHJlZikge1xyXG5cdFx0Y29uc29sZS53YXJuKCdJdGVtc1RhYmxlVmFsdWU6IGBocmVmYCB3aWxsIGJlIGRlcHJlY2F0ZWQgaW4gdGhlIG5leHQgcmVsZWFzZSwgdXNlIGB0b2AuJyk7XHJcblx0fVxyXG5cdGNvbnN0IGxpbmtSZWYgPSB0byB8fCBocmVmO1xyXG5cdGNvbnN0IENvbXBvbmVudCA9IGxpbmtSZWYgPyBMaW5rIDogY29tcG9uZW50O1xyXG5cclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjbGFzc25hbWVzKCdJdGVtTGlzdF9fdmFsdWUnLCAoXHJcblx0XHRmaWVsZCA/IGBJdGVtTGlzdF9fdmFsdWUtLSR7ZmllbGR9YCA6IG51bGxcclxuXHQpLCB7XHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLWVtcHR5JzogZW1wdHksXHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLWV4dGVyaW9yJzogbGlua1JlZiAmJiBleHRlcmlvcixcclxuXHRcdCdJdGVtTGlzdF9fbGluay0taW50ZXJpb3InOiBsaW5rUmVmICYmIGludGVyaW9yLFxyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1wYWRkZWQnOiBsaW5rUmVmICYmIHBhZGRlZCxcclxuXHRcdCdJdGVtTGlzdF9fdmFsdWUtLXRydW5jYXRlJzogdHJ1bmNhdGUsXHJcblx0fSwgY2xhc3NOYW1lKTtcclxuXHRwcm9wcy50byA9IGxpbmtSZWY7XHJcblx0cHJvcHMudGl0bGUgPSBwcm9wcy5jaGlsZHJlbjtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkl0ZW1zVGFibGVWYWx1ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRlbXB0eTogUHJvcFR5cGVzLmJvb2wsXHJcblx0ZXh0ZXJpb3I6IFByb3BUeXBlcy5ib29sLCAvLyBGSVhNRSB0aGlzIHNob3VsZCBiZSBcImV4dGVybmFsXCIgZS5nLiBhbiBleHRlcm5hbCBsaW5rXHJcblx0ZmllbGQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aHJlZjogUHJvcFR5cGVzLnN0cmluZywgLy8gVE9ETyByZW1vdmUgaW4gbmV4dCByZWxlYXNlXHJcblx0aW50ZXJpb3I6IFByb3BUeXBlcy5ib29sLCAvLyBGSVhNRSB0aGlzIHNob3VsZCBiZSBcImludGVybmFsXCIgZS5nLiBhbiBpbnRlcm5hbCBsaW5rXHJcblx0cGFkZGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0bzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR0cnVuY2F0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkl0ZW1zVGFibGVWYWx1ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHR0cnVuY2F0ZTogdHJ1ZSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbXNUYWJsZVZhbHVlO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgSU1BR0VfU0laRSA9IDE4O1xyXG5cclxuY29uc3QgbGlua1N0eWxlID0ge1xyXG5cdG1hcmdpblJpZ2h0OiA4LFxyXG59O1xyXG5jb25zdCBib3hTdHlsZSA9IHtcclxuXHRib3JkZXJSYWRpdXM6IDMsXHJcblx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0aGVpZ2h0OiBJTUFHRV9TSVpFLFxyXG5cdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR3aWR0aDogSU1BR0VfU0laRSxcclxufTtcclxuY29uc3QgaW1hZ2VTdHlsZSA9IHtcclxuXHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdGhlaWdodDogSU1BR0VfU0laRSxcclxuXHRsZWZ0OiAnNTAlJyxcclxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHJcblx0V2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0TW96VHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0bXNUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxufTtcclxuY29uc3QgdGV4dFN0eWxlID0ge1xyXG5cdGNvbG9yOiAnIzg4OCcsXHJcblx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0Zm9udFNpemU6ICcuOHJlbScsXHJcblx0bWFyZ2luTGVmdDogOCxcclxuXHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxufTtcclxuXHJcbnZhciBDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQ2xvdWRpbmFyeUltYWdlU3VtbWFyeScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpbWFnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2RpbWVuc2lvbnMnLCAncHVibGljSWQnXSksXHJcblx0fSxcclxuXHRyZW5kZXJMYWJlbCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMubGFiZWwpIHJldHVybjtcclxuXHJcblx0XHRjb25zdCB7IGxhYmVsLCBpbWFnZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRsZXQgdGV4dDtcclxuXHRcdGlmIChsYWJlbCA9PT0gJ2RpbWVuc2lvbnMnKSB7XHJcblx0XHRcdHRleHQgPSBgJHtpbWFnZS53aWR0aH0gw5cgJHtpbWFnZS5oZWlnaHR9YDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRleHQgPSBgJHtpbWFnZS5wdWJsaWNfaWR9LiR7aW1hZ2UuZm9ybWF0fWA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PHNwYW4gc3R5bGU9e3RleHRTdHlsZX0+XHJcblx0XHRcdFx0e3RleHR9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJJbWFnZVRodW1ibmFpbCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaW1hZ2UpIHJldHVybjtcclxuXHRcdGNvbnN0IHVybCA9IHRoaXMucHJvcHMuaW1hZ2UudXJsLnJlcGxhY2UoL2ltYWdlXFwvdXBsb2FkLywgYGltYWdlL3VwbG9hZC9jX3RodW1iLGdfZmFjZSxoXyR7SU1BR0VfU0laRX0sd18ke0lNQUdFX1NJWkV9YCk7XHJcblx0XHRyZXR1cm4gPGltZyBzcmM9e3VybH0gc3R5bGU9e2ltYWdlU3R5bGV9IGNsYXNzTmFtZT1cImltZy1sb2FkXCIgLz47XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PHNwYW4gc3R5bGU9e2xpbmtTdHlsZX0+XHJcblx0XHRcdFx0PHNwYW4gc3R5bGU9e2JveFN0eWxlfT5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckltYWdlVGh1bWJuYWlsKCl9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckxhYmVsKCl9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENsb3VkaW5hcnlJbWFnZVN1bW1hcnk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgSWRDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdJZENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0bGlzdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmlkO1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBwYWRkZWQgaW50ZXJpb3IgdGl0bGU9e3ZhbHVlfSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgdGhpcy5wcm9wcy5saXN0LnBhdGggKyAnLycgKyB2YWx1ZX0gZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdHt2YWx1ZX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSWRDb2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgSW52YWxpZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0ludmFsaWRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0KEludmFsaWQgVHlwZToge3RoaXMucHJvcHMuY29sLnR5cGV9KVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZENvbHVtbjtcclxuIiwiaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCBldmFsRGVwZW5kc09uIGZyb20gJy4uL3V0aWxzL2V2YWxEZXBlbmRzT24uanMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZCwgRm9ybUlucHV0LCBGb3JtTm90ZSB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgQ29sbGFwc2VkRmllbGRMYWJlbCBmcm9tICcuLi9jb21wb25lbnRzL0NvbGxhcHNlZEZpZWxkTGFiZWwnO1xyXG5cclxuZnVuY3Rpb24gaXNPYmplY3QgKGFyZykge1xyXG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlU3BlYyAoc3BlYykge1xyXG5cdGlmICghc3BlYykgc3BlYyA9IHt9O1xyXG5cdGlmICghaXNPYmplY3Qoc3BlYy5zdXBwb3J0cykpIHtcclxuXHRcdHNwZWMuc3VwcG9ydHMgPSB7fTtcclxuXHR9XHJcblx0aWYgKCFzcGVjLmZvY3VzVGFyZ2V0UmVmKSB7XHJcblx0XHRzcGVjLmZvY3VzVGFyZ2V0UmVmID0gJ2ZvY3VzVGFyZ2V0JztcclxuXHR9XHJcblx0cmV0dXJuIHNwZWM7XHJcbn1cclxuXHJcbnZhciBCYXNlID0gbW9kdWxlLmV4cG9ydHMuQmFzZSA9IHtcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFkbWluUGF0aDogS2V5c3RvbmUuYWRtaW5QYXRoLFxyXG5cdFx0XHRpbnB1dFByb3BzOiB7fSxcclxuXHRcdFx0bGFiZWxQcm9wczoge30sXHJcblx0XHRcdHZhbHVlUHJvcHM6IHt9LFxyXG5cdFx0XHRzaXplOiAnZnVsbCcsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5wdXROYW1lIChwYXRoKSB7XHJcblx0XHQvLyBUaGlzIGNvcnJlY3RseSBjcmVhdGVzIHRoZSBwYXRoIGZvciBmaWVsZCBpbnB1dHMsIGFuZCBzdXBwb3J0cyB0aGVcclxuXHRcdC8vIGlucHV0TmFtZVByZWZpeCBwcm9wIHRoYXQgaXMgcmVxdWlyZWQgZm9yIG5lc3RlZCBmaWVsZHMgdG8gd29ya1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuaW5wdXROYW1lUHJlZml4XHJcblx0XHRcdD8gYCR7dGhpcy5wcm9wcy5pbnB1dE5hbWVQcmVmaXh9WyR7cGF0aH1dYFxyXG5cdFx0XHQ6IHBhdGg7XHJcblx0fSxcclxuXHR2YWx1ZUNoYW5nZWQgKGV2ZW50KSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzaG91bGRDb2xsYXBzZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jb2xsYXBzZSAmJiAhdGhpcy5wcm9wcy52YWx1ZTtcclxuXHR9LFxyXG5cdHNob3VsZFJlbmRlckZpZWxkICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLm1vZGUgPT09ICdjcmVhdGUnKSByZXR1cm4gdHJ1ZTtcclxuXHRcdHJldHVybiAhdGhpcy5wcm9wcy5ub2VkaXQ7XHJcblx0fSxcclxuXHRmb2N1cyAoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVmc1t0aGlzLnNwZWMuZm9jdXNUYXJnZXRSZWZdKSByZXR1cm47XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbdGhpcy5zcGVjLmZvY3VzVGFyZ2V0UmVmXSkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHJlbmRlck5vdGUgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLm5vdGUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiA8Rm9ybU5vdGUgaHRtbD17dGhpcy5wcm9wcy5ub3RlfSAvPjtcclxuXHR9LFxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdGNvbnN0IHsgYXV0b0ZvY3VzLCB2YWx1ZSwgaW5wdXRQcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgey4uLntcclxuXHRcdFx0XHQuLi5pbnB1dFByb3BzLFxyXG5cdFx0XHRcdGF1dG9Gb2N1cyxcclxuXHRcdFx0XHRhdXRvQ29tcGxldGU6ICdvZmYnLFxyXG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCksXHJcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMudmFsdWVDaGFuZ2VkLFxyXG5cdFx0XHRcdHJlZjogJ2ZvY3VzVGFyZ2V0JyxcclxuXHRcdFx0XHR2YWx1ZSxcclxuXHRcdFx0fX0gLz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gPEZvcm1JbnB1dCBub2VkaXQ+e3RoaXMucHJvcHMudmFsdWV9PC9Gb3JtSW5wdXQ+O1xyXG5cdH0sXHJcblx0cmVuZGVyVUkgKCkge1xyXG5cdFx0dmFyIHdyYXBwZXJDbGFzc05hbWUgPSBjbGFzc25hbWVzKFxyXG5cdFx0XHQnZmllbGQtdHlwZS0nICsgdGhpcy5wcm9wcy50eXBlLFxyXG5cdFx0XHR0aGlzLnByb3BzLmNsYXNzTmFtZSxcclxuXHRcdFx0eyAnZmllbGQtbW9ub3NwYWNlJzogdGhpcy5wcm9wcy5tb25vc3BhY2UgfVxyXG5cdFx0KTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtRmllbGQgaHRtbEZvcj17dGhpcy5wcm9wcy5wYXRofSBsYWJlbD17dGhpcy5wcm9wcy5sYWJlbH0gY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3NOYW1lfSBjcm9wTGFiZWw+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9eydGb3JtRmllbGRfX2lubmVyIGZpZWxkLXNpemUtJyArIHRoaXMucHJvcHMuc2l6ZX0+XHJcblx0XHRcdFx0XHR7dGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpID8gdGhpcy5yZW5kZXJGaWVsZCgpIDogdGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn07XHJcblxyXG52YXIgTWl4aW5zID0gbW9kdWxlLmV4cG9ydHMuTWl4aW5zID0ge1xyXG5cdENvbGxhcHNlOiB7XHJcblx0XHRjb21wb25lbnRXaWxsTW91bnQgKCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc0NvbGxhcHNlZDogdGhpcy5zaG91bGRDb2xsYXBzZSgpLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcblx0XHRcdGlmIChwcmV2U3RhdGUuaXNDb2xsYXBzZWQgJiYgIXRoaXMuc3RhdGUuaXNDb2xsYXBzZWQpIHtcclxuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR1bmNvbGxhcHNlICgpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0aXNDb2xsYXBzZWQ6IGZhbHNlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRyZW5kZXJDb2xsYXBzZSAoKSB7XHJcblx0XHRcdGlmICghdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSByZXR1cm4gbnVsbDtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PENvbGxhcHNlZEZpZWxkTGFiZWwgb25DbGljaz17dGhpcy51bmNvbGxhcHNlfT4rIEFkZCB7dGhpcy5wcm9wcy5sYWJlbC50b0xvd2VyQ2FzZSgpfTwvQ29sbGFwc2VkRmllbGRMYWJlbD5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uIChzcGVjKSB7XHJcblxyXG5cdHNwZWMgPSB2YWxpZGF0ZVNwZWMoc3BlYyk7XHJcblxyXG5cdHZhciBmaWVsZCA9IHtcclxuXHRcdHNwZWM6IHNwZWMsXHJcblx0XHRkaXNwbGF5TmFtZTogc3BlYy5kaXNwbGF5TmFtZSxcclxuXHRcdG1peGluczogW01peGlucy5Db2xsYXBzZV0sXHJcblx0XHRzdGF0aWNzOiB7XHJcblx0XHRcdGdldERlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKGZpZWxkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZpZWxkLmRlZmF1bHRWYWx1ZSB8fCAnJztcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRyZW5kZXIgKCkge1xyXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5oaWRkZW4pIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIWV2YWxEZXBlbmRzT24odGhpcy5wcm9wcy5kZXBlbmRzT24sIHRoaXMucHJvcHMudmFsdWVzKSkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlLmlzQ29sbGFwc2VkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyQ29sbGFwc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJVSSgpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRpZiAoc3BlYy5zdGF0aWNzKSB7XHJcblx0XHRPYmplY3QuYXNzaWduKGZpZWxkLnN0YXRpY3MsIHNwZWMuc3RhdGljcyk7XHJcblx0fVxyXG5cclxuXHR2YXIgZXhjbHVkZUJhc2VNZXRob2RzID0ge307XHJcblx0aWYgKHNwZWMubWl4aW5zKSB7XHJcblx0XHRzcGVjLm1peGlucy5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xyXG5cdFx0XHRPYmplY3Qua2V5cyhtaXhpbikuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0XHRcdGlmIChCYXNlW25hbWVdKSB7XHJcblx0XHRcdFx0XHRleGNsdWRlQmFzZU1ldGhvZHNbbmFtZV0gPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdE9iamVjdC5hc3NpZ24oZmllbGQsIGJsYWNrbGlzdChCYXNlLCBleGNsdWRlQmFzZU1ldGhvZHMpKTtcclxuXHRPYmplY3QuYXNzaWduKGZpZWxkLCBibGFja2xpc3Qoc3BlYywgJ21peGlucycsICdzdGF0aWNzJykpO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheShzcGVjLm1peGlucykpIHtcclxuXHRcdGZpZWxkLm1peGlucyA9IGZpZWxkLm1peGlucy5jb25jYXQoc3BlYy5taXhpbnMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUNsYXNzKGZpZWxkKTtcclxuXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NoZWNrYm94JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBCb29sZWFuQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQm9vbGVhbkNvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSB0cnVuY2F0ZT17ZmFsc2V9IGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHQ8Q2hlY2tib3ggcmVhZG9ubHkgY2hlY2tlZD17dGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXX0gLz5cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9vbGVhbkNvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2hlY2tib3gnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGQgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBOT09QID0gKCkgPT4ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblx0ZGlzcGxheU5hbWU6ICdCb29sZWFuRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdCb29sZWFuJyxcclxuXHR9LFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aW5kZW50OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0XHRwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXJGb3JtSW5wdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdHZhbHVlPXshIXRoaXMucHJvcHMudmFsdWV9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVUkgKCkge1xyXG5cdFx0Y29uc3QgeyBpbmRlbnQsIHZhbHVlLCBsYWJlbCwgcGF0aCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGRhdGEtZmllbGQtbmFtZT17cGF0aH0gZGF0YS1maWVsZC10eXBlPVwiYm9vbGVhblwiPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQgb2Zmc2V0QWJzZW50TGFiZWw9e2luZGVudH0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgc3R5bGU9e3sgaGVpZ2h0OiAnMi4zZW0nIH19PlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJGb3JtSW5wdXQoKX1cclxuXHRcdFx0XHRcdFx0PENoZWNrYm94XHJcblx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17dmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkgJiYgdGhpcy52YWx1ZUNoYW5nZWQpIHx8IE5PT1B9XHJcblx0XHRcdFx0XHRcdFx0cmVhZG9ubHk9eyF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICcuNzVlbScgfX0+XHJcblx0XHRcdFx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyTm90ZSgpfVxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFNlZ21lbnRlZENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBWQUxVRV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdJcyBDaGVja2VkJywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIENoZWNrZWQnLCB2YWx1ZTogZmFsc2UgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHZhbHVlOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBCb29sZWFuRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dXBkYXRlVmFsdWUgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgdmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIDxTZWdtZW50ZWRDb250cm9sIGVxdWFsV2lkdGhTZWdtZW50cyBvcHRpb25zPXtWQUxVRV9PUFRJT05TfSB2YWx1ZT17dGhpcy5wcm9wcy5maWx0ZXIudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfSAvPjtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9vbGVhbkZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENsb3VkaW5hcnlJbWFnZVN1bW1hcnkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb2x1bW5zL0Nsb3VkaW5hcnlJbWFnZVN1bW1hcnknO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIENsb3VkaW5hcnlJbWFnZUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Nsb3VkaW5hcnlJbWFnZUNvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlIHx8ICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0PENsb3VkaW5hcnlJbWFnZVN1bW1hcnkgbGFiZWw9XCJkaW1lbnNpb25zXCIgaW1hZ2U9e3ZhbHVlfSAvPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2xvdWRpbmFyeUltYWdlQ29sdW1uO1xyXG4iLCIvKlxyXG5UT0RPOiBDbG91ZGluYXJ5SW1hZ2VUeXBlIGFjdGFsbHkgc3VwcG9ydHMgJ3JlbW92ZScgYW5kICdyZXNldCcgYWN0aW9ucywgYnV0XHJcbnRoaXMgZmllbGQgd2lsbCBvbmx5IHN1Ym1pdCBgXCJcImAgd2hlbiAncmVtb3ZlJyBpcyBjbGlja2VkLiBAam9zc21hYyB3ZSBuZWVkIHRvXHJcbndvcmsgb3V0IHdoZXRoZXIgd2UncmUgZ29pbmcgdG8gc3VwcG9ydCBkZWxldGluZyB0aHJvdWdoIHRoZSBVSS5cclxuKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBjbG91ZGluYXJ5UmVzaXplIGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9jbG91ZGluYXJ5UmVzaXplJztcclxuaW1wb3J0IHsgQnV0dG9uLCBGb3JtRmllbGQsIEZvcm1JbnB1dCwgRm9ybU5vdGUgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5pbXBvcnQgSW1hZ2VUaHVtYm5haWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JbWFnZVRodW1ibmFpbCc7XHJcbmltcG9ydCBGaWxlQ2hhbmdlTWVzc2FnZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ZpbGVDaGFuZ2VNZXNzYWdlJztcclxuaW1wb3J0IEhpZGRlbkZpbGVJbnB1dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0hpZGRlbkZpbGVJbnB1dCc7XHJcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xyXG5cclxuY29uc3QgU1VQUE9SVEVEX1RZUEVTID0gWydpbWFnZS8qJywgJ2FwcGxpY2F0aW9uL3BkZicsICdhcHBsaWNhdGlvbi9wb3N0c2NyaXB0J107XHJcbmNvbnN0IFNVUFBPUlRFRF9SRUdFWCA9IG5ldyBSZWdFeHAoL15pbWFnZVxcL3xhcHBsaWNhdGlvblxcL3BkZnxhcHBsaWNhdGlvblxcL3Bvc3RzY3JpcHQvZyk7XHJcblxyXG5sZXQgdXBsb2FkSW5jID0gMTAwMDtcclxuXHJcbmNvbnN0IGJ1aWxkSW5pdGlhbFN0YXRlID0gKHByb3BzKSA9PiAoe1xyXG5cdHJlbW92ZUV4aXN0aW5nOiBmYWxzZSxcclxuXHR1cGxvYWRGaWVsZFBhdGg6IGBDbG91ZGluYXJ5SW1hZ2UtJHtwcm9wcy5wYXRofS0keysrdXBsb2FkSW5jfWAsXHJcblx0dXNlclNlbGVjdGVkRmlsZTogbnVsbCxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2xsYXBzZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG5vdGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0Zm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRcdHB1YmxpY19pZDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0cmVzb3VyY2VfdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0c2VjdXJlX3VybDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0c2lnbmF0dXJlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR1cmw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHZlcnNpb246IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRkaXNwbGF5TmFtZTogJ0Nsb3VkaW5hcnlJbWFnZUZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnQ2xvdWRpbmFyeUltYWdlJyxcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogKCkgPT4gKHt9KSxcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4gYnVpbGRJbml0aWFsU3RhdGUodGhpcy5wcm9wcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdDbG91ZGluYXJ5SW1hZ2VGaWVsZCBuZXh0UHJvcHM6JywgbmV4dFByb3BzKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVcGRhdGUgKG5leHRQcm9wcykge1xyXG5cdFx0Ly8gUmVzZXQgdGhlIGFjdGlvbiBzdGF0ZSB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzXHJcblx0XHQvLyBUT0RPOiBXZSBzaG91bGQgYWRkIGEgY2hlY2sgZm9yIGEgbmV3IGl0ZW0gSUQgaW4gdGhlIHN0b3JlXHJcblx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5wdWJsaWNfaWQgIT09IG5leHRQcm9wcy52YWx1ZS5wdWJsaWNfaWQpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0cmVtb3ZlRXhpc3Rpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHVzZXJTZWxlY3RlZEZpbGU6IG51bGwsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIEhFTFBFUlNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0aGFzTG9jYWwgKCkge1xyXG5cdFx0cmV0dXJuICEhdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlO1xyXG5cdH0sXHJcblx0aGFzRXhpc3RpbmcgKCkge1xyXG5cdFx0cmV0dXJuICEhKHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5wcm9wcy52YWx1ZS51cmwpO1xyXG5cdH0sXHJcblx0aGFzSW1hZ2UgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzRXhpc3RpbmcoKSB8fCB0aGlzLmhhc0xvY2FsKCk7XHJcblx0fSxcclxuXHRnZXRGaWxlbmFtZSAoKSB7XHJcblx0XHRjb25zdCB7IGZvcm1hdCwgaGVpZ2h0LCBwdWJsaWNfaWQsIHdpZHRoIH0gPSB0aGlzLnByb3BzLnZhbHVlO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGVcclxuXHRcdFx0PyB0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUubmFtZVxyXG5cdFx0XHQ6IGAke3B1YmxpY19pZH0uJHtmb3JtYXR9ICgke3dpZHRofcOXJHtoZWlnaHR9KWA7XHJcblx0fSxcclxuXHRnZXRJbWFnZVNvdXJjZSAoaGVpZ2h0ID0gOTApIHtcclxuXHRcdC8vIFRPRE86IFRoaXMgbGV0cyByZWFsbHkgd2lkZSBpbWFnZXMgYnJlYWsgdGhlIGxheW91dFxyXG5cdFx0bGV0IHNyYztcclxuXHRcdGlmICh0aGlzLmhhc0xvY2FsKCkpIHtcclxuXHRcdFx0c3JjID0gdGhpcy5zdGF0ZS5kYXRhVXJpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmhhc0V4aXN0aW5nKCkpIHtcclxuXHRcdFx0c3JjID0gY2xvdWRpbmFyeVJlc2l6ZSh0aGlzLnByb3BzLnZhbHVlLnB1YmxpY19pZCwge1xyXG5cdFx0XHRcdGNyb3A6ICdmaXQnLFxyXG5cdFx0XHRcdGhlaWdodDogaGVpZ2h0LFxyXG5cdFx0XHRcdGZvcm1hdDogJ2pwZycsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzcmM7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTUVUSE9EU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHR0cmlnZ2VyRmlsZUJyb3dzZXIgKCkge1xyXG5cdFx0dGhpcy5yZWZzLmZpbGVJbnB1dC5jbGlja0RvbU5vZGUoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZpbGVDaGFuZ2UgKGV2ZW50KSB7XHJcblx0XHRjb25zdCB1c2VyU2VsZWN0ZWRGaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoeyB1c2VyU2VsZWN0ZWRGaWxlIH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRvZ2dsZSB0aGUgbGlnaHRib3hcclxuXHRvcGVuTGlnaHRib3ggKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGxpZ2h0Ym94SXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRjbG9zZUxpZ2h0Ym94ICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRsaWdodGJveElzVmlzaWJsZTogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBIYW5kbGUgaW1hZ2Ugc2VsZWN0aW9uIGluIGZpbGUgYnJvd3NlclxyXG5cdGhhbmRsZUltYWdlQ2hhbmdlIChlKSB7XHJcblx0XHRpZiAoIXdpbmRvdy5GaWxlUmVhZGVyKSB7XHJcblx0XHRcdHJldHVybiBhbGVydCgnRmlsZSByZWFkZXIgbm90IHN1cHBvcnRlZCBieSBicm93c2VyLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0dmFyIGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcclxuXHRcdGlmICghZmlsZSkgcmV0dXJuO1xyXG5cclxuXHRcdGlmICghZmlsZS50eXBlLm1hdGNoKFNVUFBPUlRFRF9SRUdFWCkpIHtcclxuXHRcdFx0cmV0dXJuIGFsZXJ0KCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUuIFN1cHBvcnRlZCBmb3JtYXRzIGFyZTogR0lGLCBQTkcsIEpQRywgQk1QLCBJQ08sIFBERiwgVElGRiwgRVBTLCBQU0QsIFNWRycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cclxuXHRcdHJlYWRlci5vbmxvYWRzdGFydCA9ICgpID0+IHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bG9hZGluZzogdHJ1ZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdFx0cmVhZGVyLm9ubG9hZGVuZCA9ICh1cGxvYWQpID0+IHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0ZGF0YVVyaTogdXBsb2FkLnRhcmdldC5yZXN1bHQsXHJcblx0XHRcdFx0bG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dXNlclNlbGVjdGVkRmlsZTogZmlsZSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBmaWxlOiBmaWxlIH0pO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHQvLyBJZiB3ZSBoYXZlIGEgbG9jYWwgZmlsZSBhZGRlZCB0aGVuIHJlbW92ZSBpdCBhbmQgcmVzZXQgdGhlIGZpbGUgZmllbGQuXHJcblx0aGFuZGxlUmVtb3ZlIChlKSB7XHJcblx0XHR2YXIgc3RhdGUgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlKSB7XHJcblx0XHRcdHN0YXRlLnVzZXJTZWxlY3RlZEZpbGUgPSBudWxsO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmhhc0V4aXN0aW5nKCkpIHtcclxuXHRcdFx0c3RhdGUucmVtb3ZlRXhpc3RpbmcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG5cdH0sXHJcblx0dW5kb1JlbW92ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKGJ1aWxkSW5pdGlhbFN0YXRlKHRoaXMucHJvcHMpKTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBSRU5ERVJFUlNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0cmVuZGVyTGlnaHRib3ggKCkge1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAoIXZhbHVlIHx8ICF2YWx1ZS5wdWJsaWNfaWQpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TGlnaHRib3hcclxuXHRcdFx0XHRjdXJyZW50SW1hZ2U9ezB9XHJcblx0XHRcdFx0aW1hZ2VzPXtbeyBzcmM6IHRoaXMuZ2V0SW1hZ2VTb3VyY2UoNjAwKSB9XX1cclxuXHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc1Zpc2libGV9XHJcblx0XHRcdFx0b25DbG9zZT17dGhpcy5jbG9zZUxpZ2h0Ym94fVxyXG5cdFx0XHRcdHNob3dJbWFnZUNvdW50PXtmYWxzZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJJbWFnZVByZXZpZXcgKCkge1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyByZW5kZXIgaWNvbiBmZWVkYmFjayBmb3IgaW50ZW50XHJcblx0XHRsZXQgbWFzaztcclxuXHRcdGlmICh0aGlzLmhhc0xvY2FsKCkpIG1hc2sgPSAndXBsb2FkJztcclxuXHRcdGVsc2UgaWYgKHRoaXMuc3RhdGUucmVtb3ZlRXhpc3RpbmcpIG1hc2sgPSAncmVtb3ZlJztcclxuXHRcdGVsc2UgaWYgKHRoaXMuc3RhdGUubG9hZGluZykgbWFzayA9ICdsb2FkaW5nJztcclxuXHJcblx0XHRjb25zdCBzaG91bGRPcGVuTGlnaHRib3ggPSB2YWx1ZS5mb3JtYXQgIT09ICdwZGYnO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJbWFnZVRodW1ibmFpbFxyXG5cdFx0XHRcdGNvbXBvbmVudD1cImFcIlxyXG5cdFx0XHRcdGhyZWY9e3RoaXMuZ2V0SW1hZ2VTb3VyY2UoNjAwKX1cclxuXHRcdFx0XHRvbkNsaWNrPXtzaG91bGRPcGVuTGlnaHRib3ggJiYgdGhpcy5vcGVuTGlnaHRib3h9XHJcblx0XHRcdFx0bWFzaz17bWFza31cclxuXHRcdFx0XHR0YXJnZXQ9XCJfX2JsYW5rXCJcclxuXHRcdFx0XHRzdHlsZT17eyBmbG9hdDogJ2xlZnQnLCBtYXJnaW5SaWdodDogJzFlbScgfX1cclxuXHRcdFx0PlxyXG5cdFx0XHRcdDxpbWcgc3JjPXt0aGlzLmdldEltYWdlU291cmNlKCl9IHN0eWxlPXt7IGhlaWdodDogOTAgfX0gLz5cclxuXHRcdFx0PC9JbWFnZVRodW1ibmFpbD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJGaWxlTmFtZUFuZE9wdGlvbmFsTWVzc2FnZSAoc2hvd0NoYW5nZU1lc3NhZ2UgPSBmYWxzZSkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpID8gKFxyXG5cdFx0XHRcdFx0PEZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5nZXRGaWxlbmFtZSgpfVxyXG5cdFx0XHRcdFx0PC9GaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0XHR7c2hvd0NoYW5nZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJDaGFuZ2VNZXNzYWdlKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckNoYW5nZU1lc3NhZ2UgKCkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZSkge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxGaWxlQ2hhbmdlTWVzc2FnZSBjb2xvcj1cInN1Y2Nlc3NcIj5cclxuXHRcdFx0XHRcdFNhdmUgdG8gVXBsb2FkXHJcblx0XHRcdFx0PC9GaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZykge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxGaWxlQ2hhbmdlTWVzc2FnZSBjb2xvcj1cImRhbmdlclwiPlxyXG5cdFx0XHRcdFx0U2F2ZSB0byBSZW1vdmVcclxuXHRcdFx0XHQ8L0ZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gT3V0cHV0IFtjYW5jZWwvcmVtb3ZlL3VuZG9dIGJ1dHRvblxyXG5cdHJlbmRlckNsZWFyQnV0dG9uICgpIHtcclxuXHRcdGNvbnN0IGNsZWFyVGV4dCA9IHRoaXMuaGFzTG9jYWwoKSA/ICdDYW5jZWwnIDogJ1JlbW92ZSBJbWFnZSc7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucmVtb3ZlRXhpc3RpbmcgPyAoXHJcblx0XHRcdDxCdXR0b24gdmFyaWFudD1cImxpbmtcIiBvbkNsaWNrPXt0aGlzLnVuZG9SZW1vdmV9PlxyXG5cdFx0XHRcdFVuZG8gUmVtb3ZlXHJcblx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0KSA6IChcclxuXHRcdFx0PEJ1dHRvbiB2YXJpYW50PVwibGlua1wiIGNvbG9yPVwiY2FuY2VsXCIgb25DbGljaz17dGhpcy5oYW5kbGVSZW1vdmV9PlxyXG5cdFx0XHRcdHtjbGVhclRleHR9XHJcblx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJJbWFnZVRvb2xiYXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBrZXk9e3RoaXMucHJvcHMucGF0aCArICdfdG9vbGJhcid9IGNsYXNzTmFtZT1cImltYWdlLXRvb2xiYXJcIj5cclxuXHRcdFx0XHQ8QnV0dG9uIG9uQ2xpY2s9e3RoaXMudHJpZ2dlckZpbGVCcm93c2VyfT5cclxuXHRcdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgPyAnQ2hhbmdlJyA6ICdVcGxvYWQnfSBJbWFnZVxyXG5cdFx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgPyB0aGlzLnJlbmRlckNsZWFyQnV0dG9uKCkgOiBudWxsfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyRmlsZUlucHV0ICgpIHtcclxuXHRcdGlmICghdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SGlkZGVuRmlsZUlucHV0XHJcblx0XHRcdFx0YWNjZXB0PXtTVVBQT1JURURfVFlQRVMuam9pbigpfVxyXG5cdFx0XHRcdHJlZj1cImZpbGVJbnB1dFwiXHJcblx0XHRcdFx0bmFtZT17dGhpcy5zdGF0ZS51cGxvYWRGaWVsZFBhdGh9XHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlSW1hZ2VDaGFuZ2V9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckFjdGlvbklucHV0ICgpIHtcclxuXHRcdGlmICghdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlIHx8IHRoaXMuc3RhdGUucmVtb3ZlRXhpc3RpbmcpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGVcclxuXHRcdFx0XHQ/IGB1cGxvYWQ6JHt0aGlzLnN0YXRlLnVwbG9hZEZpZWxkUGF0aH1gXHJcblx0XHRcdFx0OiAnJztcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVUkgKCkge1xyXG5cdFx0Y29uc3QgeyBsYWJlbCwgbm90ZSwgcGF0aCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBpbWFnZUNvbnRhaW5lciA9IChcclxuXHRcdFx0PGRpdiBzdHlsZT17dGhpcy5oYXNJbWFnZSgpID8geyBtYXJnaW5Cb3R0b206ICcxZW0nIH0gOiBudWxsfT5cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpICYmIHRoaXMucmVuZGVySW1hZ2VQcmV2aWV3KCl9XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSAmJiB0aGlzLnJlbmRlckZpbGVOYW1lQW5kT3B0aW9uYWxNZXNzYWdlKHRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHJcblx0XHRjb25zdCB0b29sYmFyID0gdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpXHJcblx0XHRcdD8gdGhpcy5yZW5kZXJJbWFnZVRvb2xiYXIoKVxyXG5cdFx0XHQ6IDxGb3JtSW5wdXQgbm9lZGl0IC8+O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtRmllbGQgbGFiZWw9e2xhYmVsfSBjbGFzc05hbWU9XCJmaWVsZC10eXBlLWNsb3VkaW5hcnlpbWFnZVwiIGh0bWxGb3I9e3BhdGh9PlxyXG5cdFx0XHRcdHtpbWFnZUNvbnRhaW5lcn1cclxuXHRcdFx0XHR7dG9vbGJhcn1cclxuXHRcdFx0XHR7ISFub3RlICYmIDxGb3JtTm90ZSBub3RlPXtub3RlfSAvPn1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJMaWdodGJveCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckZpbGVJbnB1dCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckFjdGlvbklucHV0KCl9XHJcblx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IFNlZ21lbnRlZENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBPUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdJcyBTZXQnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5cdHsgbGFiZWw6ICdJcyBOT1QgU2V0JywgdmFsdWU6IGZhbHNlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRleGlzdHM6IHRydWUsXHJcblx0fTtcclxufVxyXG5cclxudmFyIENsb3VkaW5hcnlJbWFnZUZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZXhpc3RzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT1BUSU9OUy5tYXAoaSA9PiBpLnZhbHVlKSksXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dG9nZ2xlRXhpc3RzICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IGV4aXN0czogdmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVFeGlzdHN9XHJcblx0XHRcdFx0b3B0aW9ucz17T1BUSU9OU31cclxuXHRcdFx0XHR2YWx1ZT17ZmlsdGVyLmV4aXN0c31cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENsb3VkaW5hcnlJbWFnZUZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIERhdGVDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdEYXRlQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRsaW5rVG86IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRnZXRWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCBmb3JtYXQgPSAodGhpcy5wcm9wcy5jb2wudHlwZSA9PT0gJ2RhdGV0aW1lJykgPyAnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnIDogJ01NTU0gRG8gWVlZWSc7XHJcblx0XHRyZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuXHRcdGNvbnN0IGVtcHR5ID0gIXZhbHVlICYmIHRoaXMucHJvcHMubGlua1RvID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9IHRvPXt0aGlzLnByb3BzLmxpbmtUb30gZW1wdHk9e2VtcHR5fT5cclxuXHRcdFx0XHRcdHt2YWx1ZX1cclxuXHRcdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVDb2x1bW47XHJcbiIsImltcG9ydCBEYXRlSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EYXRlSW5wdXQnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRJbmxpbmVHcm91cCBhcyBHcm91cCxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb24gYXMgU2VjdGlvbixcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vKlxyXG5UT0RPOiBJbXBsZW1lbnQgeWVhclJhbmdlIFByb3AsIG9yIGRlcHJlY2F0ZSBmb3IgbWF4IC8gbWluIHZhbHVlcyAoYmV0dGVyKVxyXG4qL1xyXG5cclxuY29uc3QgREVGQVVMVF9JTlBVVF9GT1JNQVQgPSAnWVlZWS1NTS1ERCc7XHJcbmNvbnN0IERFRkFVTFRfRk9STUFUX1NUUklORyA9ICdEbyBNTU0gWVlZWSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblx0ZGlzcGxheU5hbWU6ICdEYXRlRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdEYXRlJyxcclxuXHR9LFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Zm9ybWF0U3RyaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0aW5wdXRGb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG5vdGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZzogREVGQVVMVF9GT1JNQVRfU1RSSU5HLFxyXG5cdFx0XHRpbnB1dEZvcm1hdDogREVGQVVMVF9JTlBVVF9GT1JNQVQsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dmFsdWVDaGFuZ2VkICh7IHZhbHVlIH0pIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB2YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dG9Nb21lbnQgKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5pc1VUQykge1xyXG5cdFx0XHRyZXR1cm4gbW9tZW50LnV0Yyh2YWx1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbW9tZW50KHZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGlzVmFsaWQgKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy50b01vbWVudCh2YWx1ZSwgdGhpcy5pbnB1dEZvcm1hdCkuaXNWYWxpZCgpO1xyXG5cdH0sXHJcblx0Zm9ybWF0ICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlID8gdGhpcy50b01vbWVudCh2YWx1ZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0U3RyaW5nKSA6ICcnO1xyXG5cdH0sXHJcblx0c2V0VG9kYXkgKCkge1xyXG5cdFx0dGhpcy52YWx1ZUNoYW5nZWQoe1xyXG5cdFx0XHR2YWx1ZTogdGhpcy50b01vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQodGhpcy5wcm9wcy5pbnB1dEZvcm1hdCksXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0PlxyXG5cdFx0XHRcdHt0aGlzLmZvcm1hdCh0aGlzLnByb3BzLnZhbHVlKX1cclxuXHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0dmFyIGRhdGVBc01vbWVudCA9IHRoaXMudG9Nb21lbnQodGhpcy5wcm9wcy52YWx1ZSk7XHJcblx0XHR2YXIgdmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlICYmIGRhdGVBc01vbWVudC5pc1ZhbGlkKClcclxuXHRcdFx0PyBkYXRlQXNNb21lbnQuZm9ybWF0KHRoaXMucHJvcHMuaW5wdXRGb3JtYXQpXHJcblx0XHRcdDogdGhpcy5wcm9wcy52YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcclxuXHRcdFx0XHRcdFx0Zm9ybWF0PXt0aGlzLnByb3BzLmlucHV0Rm9ybWF0fVxyXG5cdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWR9XHJcblx0XHRcdFx0XHRcdHJlZj1cImRhdGVJbnB1dFwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNldFRvZGF5fT5Ub2RheTwvQnV0dG9uPlxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IERheVBpY2tlciBmcm9tICdyZWFjdC1kYXktcGlja2VyJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1TZWxlY3QsXHJcblx0R3JpZCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ01hdGNoZXMnLCB2YWx1ZTogZmFsc2UgfSxcclxuXHR7IGxhYmVsOiAnRG9lcyBOT1QgTWF0Y2gnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdPbicsIHZhbHVlOiAnb24nIH0sXHJcblx0eyBsYWJlbDogJ0FmdGVyJywgdmFsdWU6ICdhZnRlcicgfSxcclxuXHR7IGxhYmVsOiAnQmVmb3JlJywgdmFsdWU6ICdiZWZvcmUnIH0sXHJcblx0eyBsYWJlbDogJ0JldHdlZW4nLCB2YWx1ZTogJ2JldHdlZW4nIH0sXHJcbl07XHJcblxyXG5jb25zdCBEYXlQaWNrZXJJbmRpY2F0b3IgPSAoeyBhY3RpdmVJbnB1dEZpZWxkIH0pID0+IHtcclxuXHRjb25zdCBzdHlsZSA9IGFjdGl2ZUlucHV0RmllbGQgPT09ICdiZWZvcmUnID8geyBsZWZ0OiAnMTFyZW0nIH0gOiBudWxsO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwiRGF5UGlja2VyLUluZGljYXRvclwiIHN0eWxlPXtzdHlsZX0+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JfX2JvcmRlclwiIC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JfX2JnXCIgLz5cclxuXHRcdDwvc3Bhbj5cclxuXHQpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdFx0YmVmb3JlOiBtb21lbnQoMCwgJ0hIJykuZm9ybWF0KCksXHJcblx0XHRhZnRlcjogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBEYXRlRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUZpbHRlcicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdG1vZGU6IFByb3BUeXBlcy5vbmVPZihNT0RFX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0XHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdDogJ0RELU1NLVlZWVknLFxyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0XHR2YWx1ZTogbW9tZW50KCkuc3RhcnRPZignZGF5JykudG9EYXRlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFjdGl2ZUlucHV0RmllbGQ6ICdhZnRlcicsXHJcblx0XHRcdG1vbnRoOiBuZXcgRGF0ZSgpLCAvLyBUaGUgbW9udGggdG8gZGlzcGxheSBpbiB0aGUgY2FsZW5kYXJcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLl9faXNNb3VudGVkID0gdHJ1ZTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdHRoaXMuX19pc01vdW50ZWQgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHVwZGF0ZUZpbHRlciAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4udmFsdWUgfSk7XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAodmFsdWUpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQ6IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5zZXRGb2N1cyh0aGlzLnByb3BzLmZpbHRlci5tb2RlKTtcclxuXHR9LFxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZSB9KTtcclxuXHRcdHRoaXMuc2V0Rm9jdXMobW9kZSk7XHJcblx0fSxcclxuXHRzZXRGb2N1cyAobW9kZSkge1xyXG5cdFx0Ly8gZ2l2ZSB0aGUgVUkgYSBtb21lbnQgdG8gcmVuZGVyXHJcblx0XHRpZiAobW9kZSA9PT0gJ2JldHdlZW4nKSB7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1t0aGlzLnN0YXRlLmFjdGl2ZUlucHV0RmllbGRdKS5mb2N1cygpO1xyXG5cdFx0XHR9LCA1MCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdC8vIFRPRE8gQGplZHdhdHNvblxyXG5cdFx0Ly8gRW50ZXJpbmcgdmlydHVhbGx5IGFueSB2YWx1ZSB3aWxsIHJldHVybiBhbiBcIkludmFsaWQgZGF0ZVwiLCBzbyBJJ21cclxuXHRcdC8vIHRlbXBvcmFyaWx5IGRpc2FibGluZyB1c2VyIGVudHJ5LiBUaGlzIGVudGlyZSBjb21wb25lbnQgbmVlZHMgcmV2aWV3LlxyXG5cclxuXHRcdC8vIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG5cdFx0Ly8gbGV0IHsgbW9udGggfSA9IHRoaXMuc3RhdGU7XHJcblx0XHQvLyAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbW9udGggb25seSBpZiB0aGUgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlciBpcyBhIHZhbGlkXHJcblx0XHQvLyAvLyBkYXRlLCBhY2NvcmRpbmcgdG8gdGhlIGBMYCBmb3JtYXRcclxuXHRcdC8vIGlmIChtb21lbnQodmFsdWUsICdMJywgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHQvLyBcdG1vbnRoID0gbW9tZW50KHZhbHVlLCAnTCcpLnRvRGF0ZSgpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gdGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogdmFsdWUgfSk7XHJcblx0XHQvLyB0aGlzLnNldFN0YXRlKHsgbW9udGggfSwgdGhpcy5zaG93Q3VycmVudERhdGUpO1xyXG5cdH0sXHJcblx0c2V0QWN0aXZlRmllbGQgKGZpZWxkKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0YWN0aXZlSW5wdXRGaWVsZDogZmllbGQsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHN3aXRjaEJldHdlZW5BY3RpdmVJbnB1dEZpZWxkcyAoZSwgZGF5LCBtb2RpZmllcnMpIHtcclxuXHRcdGlmIChtb2RpZmllcnMgJiYgbW9kaWZpZXJzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgeyBhY3RpdmVJbnB1dEZpZWxkIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3Qgc2VuZCA9IHt9O1xyXG5cdFx0Y29uc3QgbmV3QWN0aXZlRmllbGQgPSBhY3RpdmVJbnB1dEZpZWxkID09PSAnYmVmb3JlJ1xyXG5cdFx0XHQ/ICdhZnRlcidcclxuXHRcdFx0OiAnYmVmb3JlJztcclxuXHRcdHNlbmRbYWN0aXZlSW5wdXRGaWVsZF0gPSBkYXk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcihzZW5kKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoXHJcblx0XHRcdHsgYWN0aXZlSW5wdXRGaWVsZDogbmV3QWN0aXZlRmllbGQgfSxcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1tuZXdBY3RpdmVGaWVsZF0pLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fSxcclxuXHRzZWxlY3REYXkgKGUsIGRheSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogZGF5IH0pO1xyXG5cdH0sXHJcblx0c2hvd0N1cnJlbnREYXRlICgpIHtcclxuXHRcdC8vIGdpdmUgdGhlIFVJIGEgbW9tZW50IHRvIHJlbmRlclxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVmcy5kYXlwaWNrZXIuc2hvd01vbnRoKHRoaXMuc3RhdGUubW9udGgpO1xyXG5cdFx0fSwgNTApO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIFJFTkRFUkVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRyZW5kZXJUb2dnbGUgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlSW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHRvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfVxyXG5cdFx0XHRcdFx0dmFsdWU9e2ZpbHRlci5pbnZlcnRlZH1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250cm9scyAoKSB7XHJcblx0XHRsZXQgY29udHJvbHM7XHJcblx0XHRjb25zdCB7IGFjdGl2ZUlucHV0RmllbGQgfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gZmllbGQubGFiZWwgKyAnIGlzICcgKyBtb2RlLmxhYmVsLnRvTG93ZXJDYXNlKCkgKyAnLi4uJztcclxuXHJcblx0XHQvLyBEYXlQaWNrZXIgTW9kaWZpZXJzIC0gU2VsZWN0ZWQgRGF5XHJcblx0XHRsZXQgbW9kaWZpZXJzID0gZmlsdGVyLm1vZGUgPT09ICdiZXR3ZWVuJyA/IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChmaWx0ZXJbYWN0aXZlSW5wdXRGaWVsZF0pLmlzU2FtZShkYXkpLFxyXG5cdFx0fSA6IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChmaWx0ZXIudmFsdWUpLmlzU2FtZShkYXkpLFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAobW9kZS52YWx1ZSA9PT0gJ2JldHdlZW4nKSB7XHJcblx0XHRcdGNvbnRyb2xzID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHRcdDxHcmlkLlJvdyB4c21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZj1cImFmdGVyXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJGcm9tXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uRm9jdXM9eygpID0+IHRoaXMuc2V0QWN0aXZlRmllbGQoJ2FmdGVyJyl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLmFmdGVyKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVmPVwiYmVmb3JlXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJUb1wiXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUZpZWxkKCdiZWZvcmUnKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e21vbWVudChmaWx0ZXIuYmVmb3JlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHQ8L0dyaWQuUm93PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiRGF5UGlja2VyLS1jaHJvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuc3dpdGNoQmV0d2VlbkFjdGl2ZUlucHV0RmllbGRzfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VySW5kaWNhdG9yIGFjdGl2ZUlucHV0RmllbGQ9e2FjdGl2ZUlucHV0RmllbGR9IC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnRyb2xzID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRhdXRvRm9jdXNcclxuXHRcdFx0XHRcdFx0XHRyZWY9XCJpbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLnZhbHVlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuc2hvd0N1cnJlbnREYXRlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwiZGF5cGlja2VyXCJcclxuXHRcdFx0XHRcdFx0XHRtb2RpZmllcnM9e21vZGlmaWVyc31cclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJEYXlQaWNrZXItLWNocm9tZVwiXHJcblx0XHRcdFx0XHRcdFx0b25EYXlDbGljaz17dGhpcy5zZWxlY3REYXl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxEYXlQaWNrZXJJbmRpY2F0b3IgLz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjb250cm9scztcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IG1vZGUgPSBNT0RFX09QVElPTlMuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gZmlsdGVyLm1vZGUpWzBdO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJUb2dnbGUoKX1cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHQ8Rm9ybVNlbGVjdFxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtNT0RFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNlbGVjdE1vZGV9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXttb2RlLnZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb250cm9scygpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVGaWx0ZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vZGF0ZS9EYXRlQ29sdW1uJyk7XHJcbiIsImltcG9ydCBEYXRlSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EYXRlSW5wdXQnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybU5vdGUsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ0RhdGV0aW1lRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdEYXRldGltZScsXHJcblx0fSxcclxuXHJcblx0Zm9jdXNUYXJnZXRSZWY6ICdkYXRlSW5wdXQnLFxyXG5cclxuXHQvLyBkZWZhdWx0IGlucHV0IGZvcm1hdHNcclxuXHRkYXRlSW5wdXRGb3JtYXQ6ICdZWVlZLU1NLUREJyxcclxuXHR0aW1lSW5wdXRGb3JtYXQ6ICdoOm1tOnNzIGEnLFxyXG5cdHR6T2Zmc2V0SW5wdXRGb3JtYXQ6ICdaJyxcclxuXHJcblx0Ly8gcGFyc2UgZm9ybWF0cyAoZHVwbGljYXRlZCBmcm9tIGxpYi9maWVsZFR5cGVzL2RhdGV0aW1lLmpzKVxyXG5cdHBhcnNlRm9ybWF0czogWydZWVlZLU1NLUREJywgJ1lZWVktTU0tREQgaDptOnMgYScsICdZWVlZLU1NLUREIGg6bSBhJywgJ1lZWVktTU0tREQgSDptOnMnLCAnWVlZWS1NTS1ERCBIOm0nXSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRhdGVWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLm1vbWVudCh0aGlzLnByb3BzLnZhbHVlKS5mb3JtYXQodGhpcy5kYXRlSW5wdXRGb3JtYXQpLFxyXG5cdFx0XHR0aW1lVmFsdWU6IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5tb21lbnQodGhpcy5wcm9wcy52YWx1ZSkuZm9ybWF0KHRoaXMudGltZUlucHV0Rm9ybWF0KSxcclxuXHRcdFx0dHpPZmZzZXRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSA/IHRoaXMubW9tZW50KHRoaXMucHJvcHMudmFsdWUpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpIDogdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZzogJ0RvIE1NTSBZWVlZLCBoOm1tOnNzIGEnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRtb21lbnQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuaXNVVEMpIHJldHVybiBtb21lbnQudXRjLmFwcGx5KG1vbWVudCwgYXJndW1lbnRzKTtcclxuXHRcdGVsc2UgcmV0dXJuIG1vbWVudC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETzogTW92ZSBpc1ZhbGlkKCkgc28gd2UgY2FuIHNoYXJlIHdpdGggc2VydmVyLXNpZGUgY29kZVxyXG5cdGlzVmFsaWQgKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQodmFsdWUsIHRoaXMucGFyc2VGb3JtYXRzKS5pc1ZhbGlkKCk7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETzogTW92ZSBmb3JtYXQoKSBzbyB3ZSBjYW4gc2hhcmUgd2l0aCBzZXJ2ZXItc2lkZSBjb2RlXHJcblx0Zm9ybWF0ICh2YWx1ZSwgZm9ybWF0KSB7XHJcblx0XHRmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5kYXRlSW5wdXRGb3JtYXQgKyAnICcgKyB0aGlzLnRpbWVJbnB1dEZvcm1hdDtcclxuXHRcdHJldHVybiB2YWx1ZSA/IHRoaXMubW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KSA6ICcnO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZUNoYW5nZSAoZGF0ZVZhbHVlLCB0aW1lVmFsdWUsIHR6T2Zmc2V0VmFsdWUpIHtcclxuXHRcdHZhciB2YWx1ZSA9IGRhdGVWYWx1ZSArICcgJyArIHRpbWVWYWx1ZTtcclxuXHRcdHZhciBkYXRldGltZUZvcm1hdCA9IHRoaXMuZGF0ZUlucHV0Rm9ybWF0ICsgJyAnICsgdGhpcy50aW1lSW5wdXRGb3JtYXQ7XHJcblxyXG5cdFx0Ly8gaWYgdGhlIGNoYW5nZSBpbmNsdWRlZCBhIHRpbWV6b25lIG9mZnNldCwgaW5jbHVkZSB0aGF0IGluIHRoZSBjYWxjdWxhdGlvbiAoc28gTk9XIHdvcmtzIGNvcnJlY3RseSBkdXJpbmcgRFNUIGNoYW5nZXMpXHJcblx0XHRpZiAodHlwZW9mIHR6T2Zmc2V0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHZhbHVlICs9ICcgJyArIHR6T2Zmc2V0VmFsdWU7XHJcblx0XHRcdGRhdGV0aW1lRm9ybWF0ICs9ICcgJyArIHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdDtcclxuXHRcdH1cclxuXHRcdC8vIGlmIG5vdCwgY2FsY3VsYXRlIHRoZSB0aW1lem9uZSBvZmZzZXQgYmFzZWQgb24gdGhlIGRhdGUgKHJlc3BlY3QgZGlmZmVyZW50IERTVCB2YWx1ZXMpXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHR6T2Zmc2V0VmFsdWU6IHRoaXMubW9tZW50KHZhbHVlLCBkYXRldGltZUZvcm1hdCkuZm9ybWF0KHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdCkgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHRoaXMuaXNWYWxpZCh2YWx1ZSkgPyB0aGlzLm1vbWVudCh2YWx1ZSwgZGF0ZXRpbWVGb3JtYXQpLnRvSVNPU3RyaW5nKCkgOiBudWxsLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0ZGF0ZUNoYW5nZWQgKHsgdmFsdWUgfSkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRhdGVWYWx1ZTogdmFsdWUgfSk7XHJcblx0XHR0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSwgdGhpcy5zdGF0ZS50aW1lVmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHRpbWVDaGFuZ2VkIChldnQpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyB0aW1lVmFsdWU6IGV2dC50YXJnZXQudmFsdWUgfSk7XHJcblx0XHR0aGlzLmhhbmRsZUNoYW5nZSh0aGlzLnN0YXRlLmRhdGVWYWx1ZSwgZXZ0LnRhcmdldC52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2V0Tm93ICgpIHtcclxuXHRcdHZhciBkYXRlVmFsdWUgPSB0aGlzLm1vbWVudCgpLmZvcm1hdCh0aGlzLmRhdGVJbnB1dEZvcm1hdCk7XHJcblx0XHR2YXIgdGltZVZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50aW1lSW5wdXRGb3JtYXQpO1xyXG5cdFx0dmFyIHR6T2Zmc2V0VmFsdWUgPSB0aGlzLm1vbWVudCgpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGRhdGVWYWx1ZTogZGF0ZVZhbHVlLFxyXG5cdFx0XHR0aW1lVmFsdWU6IHRpbWVWYWx1ZSxcclxuXHRcdFx0dHpPZmZzZXRWYWx1ZTogdHpPZmZzZXRWYWx1ZSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UoZGF0ZVZhbHVlLCB0aW1lVmFsdWUsIHR6T2Zmc2V0VmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlck5vdGUgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLm5vdGUpIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIDxGb3JtTm90ZSBub3RlPXt0aGlzLnByb3BzLm5vdGV9IC8+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdHZhciBpbnB1dDtcclxuXHRcdGlmICh0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHtcclxuXHRcdFx0aW5wdXQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxHcm91cD5cclxuXHRcdFx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdFx0XHQ8RGF0ZUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtYXQ9e3RoaXMuZGF0ZUlucHV0Rm9ybWF0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRocy5kYXRlKX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmRhdGVDaGFuZ2VkfVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVmPVwiZGF0ZUlucHV0XCJcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLmRhdGVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMudGltZSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50aW1lQ2hhbmdlZH1cclxuXHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSEg6TU06U1MgYW0vcG1cIlxyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudGltZVZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PFNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNldE5vd30+Tm93PC9CdXR0b24+XHJcblx0XHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRocy50ek9mZnNldCl9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS50ek9mZnNldFZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlucHV0ID0gKFxyXG5cdFx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0PlxyXG5cdFx0XHRcdFx0e3RoaXMuZm9ybWF0KHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0U3RyaW5nKX1cclxuXHRcdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtRmllbGQgbGFiZWw9e3RoaXMucHJvcHMubGFiZWx9IGNsYXNzTmFtZT1cImZpZWxkLXR5cGUtZGF0ZXRpbWVcIiBodG1sRm9yPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfT5cclxuXHRcdFx0XHR7aW5wdXR9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTm90ZSgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vZGF0ZS9EYXRlRmlsdGVyJyk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgRW1haWxDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdFbWFpbENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgdG89eydtYWlsdG86JyArIHZhbHVlfSBwYWRkZWQgZXh0ZXJpb3IgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdHt2YWx1ZX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW1haWxDb2x1bW47XHJcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbi8qXHJcblx0VE9ETzpcclxuXHQtIGdyYXZhdGFyXHJcblx0LSB2YWxpZGF0ZSBlbWFpbCBhZGRyZXNzXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnRW1haWxGaWVsZCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdFbWFpbCcsXHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0dHlwZT1cImVtYWlsXCJcclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy52YWx1ZSA/IChcclxuXHRcdFx0PEZvcm1JbnB1dCBub2VkaXQgY29tcG9uZW50PVwiYVwiIGhyZWY9eydtYWlsdG86JyArIHRoaXMucHJvcHMudmFsdWV9PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdCkgOiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3RleHQvVGV4dEZpbHRlcicpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBOdW1iZXJDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdOdW1iZXJDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGxldCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlIHx8IGlzTmFOKHZhbHVlKSkgdmFsdWUgPSAwLjAwO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gKHRoaXMucHJvcHMuY29sLnBhdGggPT09ICdtb25leScpID8gbnVtZXJhbCh2YWx1ZSkuZm9ybWF0KCckMCwwLjAwJykgOiB2YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gZm9ybWF0dGVkVmFsdWU7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlckNvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnTnVtYmVyRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdOdW1iZXInLFxyXG5cdH0sXHJcblx0dmFsdWVDaGFuZ2VkIChldmVudCkge1xyXG5cdFx0dmFyIG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0aWYgKC9eLT9cXGQqXFwuP1xcZCokLy50ZXN0KG5ld1ZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdFx0dmFsdWU6IG5ld1ZhbHVlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHtcclxuXHRGb3JtLFxyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybVNlbGVjdCxcclxuXHRHcmlkLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE1PREVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnRXhhY3RseScsIHZhbHVlOiAnZXF1YWxzJyB9LFxyXG5cdHsgbGFiZWw6ICdHcmVhdGVyIFRoYW4nLCB2YWx1ZTogJ2d0JyB9LFxyXG5cdHsgbGFiZWw6ICdMZXNzIFRoYW4nLCB2YWx1ZTogJ2x0JyB9LFxyXG5cdHsgbGFiZWw6ICdCZXR3ZWVuJywgdmFsdWU6ICdiZXR3ZWVuJyB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6ICcnLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBOdW1iZXJGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0c3RhdGljczoge1xyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0Ly8gZm9jdXMgdGhlIHRleHQgaW5wdXRcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVDaGFuZ2VCdWlsZGVyICh0eXBlKSB7XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdHJldHVybiBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UgKGUpIHtcclxuXHRcdFx0Y29uc3QgeyBmaWx0ZXIsIG9uQ2hhbmdlIH0gPSBzZWxmLnByb3BzO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnbWluVmFsdWUnOlxyXG5cdFx0XHRcdFx0b25DaGFuZ2Uoe1xyXG5cdFx0XHRcdFx0XHRtb2RlOiBmaWx0ZXIubW9kZSxcclxuXHRcdFx0XHRcdFx0dmFsdWU6IHtcclxuXHRcdFx0XHRcdFx0XHRtaW46IGUudGFyZ2V0LnZhbHVlLFxyXG5cdFx0XHRcdFx0XHRcdG1heDogZmlsdGVyLnZhbHVlLm1heCxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnbWF4VmFsdWUnOlxyXG5cdFx0XHRcdFx0b25DaGFuZ2Uoe1xyXG5cdFx0XHRcdFx0XHRtb2RlOiBmaWx0ZXIubW9kZSxcclxuXHRcdFx0XHRcdFx0dmFsdWU6IHtcclxuXHRcdFx0XHRcdFx0XHRtaW46IGZpbHRlci52YWx1ZS5taW4sXHJcblx0XHRcdFx0XHRcdFx0bWF4OiBlLnRhcmdldC52YWx1ZSxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAndmFsdWUnOlxyXG5cdFx0XHRcdFx0b25DaGFuZ2Uoe1xyXG5cdFx0XHRcdFx0XHRtb2RlOiBmaWx0ZXIubW9kZSxcclxuXHRcdFx0XHRcdFx0dmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSxcclxuXHQvLyBVcGRhdGUgdGhlIHByb3BzIHdpdGggdGhpcy5wcm9wcy5vbkNoYW5nZVxyXG5cdHVwZGF0ZUZpbHRlciAoY2hhbmdlZFByb3ApIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4uY2hhbmdlZFByb3AgfSk7XHJcblx0fSxcclxuXHQvLyBVcGRhdGUgdGhlIGZpbHRlciBtb2RlXHJcblx0c2VsZWN0TW9kZSAoZSkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBtb2RlOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuXHJcblx0XHQvLyBmb2N1cyBvbiBuZXh0IHRpY2tcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0XHR9LCAwKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJDb250cm9scyAobW9kZSkge1xyXG5cdFx0bGV0IGNvbnRyb2xzO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gZmllbGQubGFiZWwgKyAnIGlzICcgKyBtb2RlLmxhYmVsLnRvTG93ZXJDYXNlKCkgKyAnLi4uJztcclxuXHJcblx0XHRpZiAobW9kZS52YWx1ZSA9PT0gJ2JldHdlZW4nKSB7XHJcblx0XHRcdGNvbnRyb2xzID0gKFxyXG5cdFx0XHRcdDxHcmlkLlJvdyB4c21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdFx0PEdyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlQnVpbGRlcignbWluVmFsdWUnKX1cclxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk1pbi5cIlxyXG5cdFx0XHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdDwvR3JpZC5Db2w+XHJcblx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VCdWlsZGVyKCdtYXhWYWx1ZScpfVxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTWF4LlwiXHJcblx0XHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiXHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdDwvR3JpZC5Sb3c+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VCdWlsZGVyKCd2YWx1ZScpfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG5cdFx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiXHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29udHJvbHM7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm0gY29tcG9uZW50PVwiZGl2XCI+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxGb3JtU2VsZWN0XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNlbGVjdE1vZGV9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e01PREVfT1BUSU9OU31cclxuXHRcdFx0XHRcdFx0dmFsdWU9e21vZGUudmFsdWV9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckNvbnRyb2xzKG1vZGUpfVxyXG5cdFx0XHQ8L0Zvcm0+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyRmlsdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIFBhc3N3b3JkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUGFzc3dvcmRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdHJldHVybiB2YWx1ZSA/ICcqKioqKioqKicgOiAnJztcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRDb2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRJbmxpbmVHcm91cCBhcyBHcm91cCxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb24gYXMgU2VjdGlvbixcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnUGFzc3dvcmRGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1Bhc3N3b3JkJyxcclxuXHR9LFxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cGFzc3dvcmRJc1NldDogdGhpcy5wcm9wcy52YWx1ZSA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0c2hvd0NoYW5nZVVJOiB0aGlzLnByb3BzLm1vZGUgPT09ICdjcmVhdGUnID8gdHJ1ZSA6IGZhbHNlLFxyXG5cdFx0XHRwYXNzd29yZDogJycsXHJcblx0XHRcdGNvbmZpcm06ICcnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHdoaWNoLCBldmVudCkge1xyXG5cdFx0dmFyIG5ld1N0YXRlID0ge307XHJcblx0XHRuZXdTdGF0ZVt3aGljaF0gPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcclxuXHR9LFxyXG5cclxuXHRzaG93Q2hhbmdlVUkgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHNob3dDaGFuZ2VVSTogdHJ1ZSxcclxuXHRcdH0sICgpID0+IHRoaXMuZm9jdXMoKSk7XHJcblx0fSxcclxuXHJcblx0b25DYW5jZWwgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHNob3dDaGFuZ2VVSTogZmFsc2UsXHJcblx0XHR9LCAoKSA9PiB0aGlzLmZvY3VzKCkpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiA8Rm9ybUlucHV0IG5vZWRpdD57dGhpcy5wcm9wcy52YWx1ZSA/ICdQYXNzd29yZCBTZXQnIDogJyd9PC9Gb3JtSW5wdXQ+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLnNob3dDaGFuZ2VVSSA/IHRoaXMucmVuZGVyRmllbGRzKCkgOiB0aGlzLnJlbmRlckNoYW5nZUJ1dHRvbigpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkcyAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgYmxvY2s+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkLmJpbmQodGhpcywgJ3Bhc3N3b3JkJyl9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IHBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMuY29uZmlybSl9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMsICdjb25maXJtJyl9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5jb25maXJtfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0e3RoaXMuc3RhdGUucGFzc3dvcmRJc1NldCA/IChcclxuXHRcdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25DYW5jZWx9PkNhbmNlbDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJDaGFuZ2VCdXR0b24gKCkge1xyXG5cdFx0dmFyIGxhYmVsID0gdGhpcy5zdGF0ZS5wYXNzd29yZElzU2V0XHJcblx0XHRcdD8gJ0NoYW5nZSBQYXNzd29yZCdcclxuXHRcdFx0OiAnU2V0IFBhc3N3b3JkJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8QnV0dG9uIHJlZj1cImZvY3VzVGFyZ2V0XCIgb25DbGljaz17dGhpcy5zaG93Q2hhbmdlVUl9PntsYWJlbH08L0J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IEVYSVNUU19PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdJcyBTZXQnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5cdHsgbGFiZWw6ICdJcyBOT1QgU2V0JywgdmFsdWU6IGZhbHNlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRleGlzdHM6IHRydWUsXHJcblx0fTtcclxufVxyXG5cclxudmFyIFBhc3N3b3JkRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRleGlzdHM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihFWElTVFNfT1BUSU9OUy5tYXAoaSA9PiBpLnZhbHVlKSksXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dG9nZ2xlRXhpc3RzICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IGV4aXN0czogdmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVFeGlzdHN9XHJcblx0XHRcdFx0b3B0aW9ucz17RVhJU1RTX09QVElPTlN9XHJcblx0XHRcdFx0dmFsdWU9e2ZpbHRlci5leGlzdHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXNzd29yZEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbmNvbnN0IG1vcmVJbmRpY2F0b3JTdHlsZSA9IHtcclxuXHRjb2xvcjogJyNiYmInLFxyXG5cdGZvbnRTaXplOiAnLjhyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRtYXJnaW5MZWZ0OiA4LFxyXG59O1xyXG5cclxudmFyIFJlbGF0aW9uc2hpcENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1JlbGF0aW9uc2hpcENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyTWFueSAodmFsdWUpIHtcclxuXHRcdGlmICghdmFsdWUgfHwgIXZhbHVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgcmVmTGlzdCA9IHRoaXMucHJvcHMuY29sLmZpZWxkLnJlZkxpc3Q7XHJcblx0XHRjb25zdCBpdGVtcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuXHRcdFx0aWYgKCF2YWx1ZVtpXSkgYnJlYWs7XHJcblx0XHRcdGlmIChpKSB7XHJcblx0XHRcdFx0aXRlbXMucHVzaCg8c3BhbiBrZXk9eydjb21tYScgKyBpfT4sIDwvc3Bhbj4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1zLnB1c2goXHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBpbnRlcmlvciB0cnVuY2F0ZT17ZmFsc2V9IGtleT17J2FuY2hvcicgKyBpfSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgcmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWVbaV0uaWR9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlW2ldLm5hbWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRpZiAodmFsdWUubGVuZ3RoID4gMykge1xyXG5cdFx0XHRpdGVtcy5wdXNoKDxzcGFuIGtleT1cIm1vcmVcIiBzdHlsZT17bW9yZUluZGljYXRvclN0eWxlfT5bLi4ue3ZhbHVlLmxlbmd0aCAtIDN9IG1vcmVdPC9zcGFuPik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7aXRlbXN9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICh2YWx1ZSkge1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgcmVmTGlzdCA9IHRoaXMucHJvcHMuY29sLmZpZWxkLnJlZkxpc3Q7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXtLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyByZWZMaXN0LnBhdGggKyAnLycgKyB2YWx1ZS5pZH0gcGFkZGVkIGludGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWUubmFtZX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGNvbnN0IG1hbnkgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5tYW55O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHttYW55ID8gdGhpcy5yZW5kZXJNYW55KHZhbHVlKSA6IHRoaXMucmVuZGVyVmFsdWUodmFsdWUpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVsYXRpb25zaGlwQ29sdW1uO1xyXG4iLCJpbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgeyBsaXN0c0J5S2V5IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2xpc3RzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xyXG5pbXBvcnQgeGhyIGZyb20gJ3hocic7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRJbmxpbmVHcm91cCBhcyBHcm91cCxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb24gYXMgU2VjdGlvbixcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlVmFsdWVzIChjdXJyZW50LCBuZXh0KSB7XHJcblx0Y29uc3QgY3VycmVudExlbmd0aCA9IGN1cnJlbnQgPyBjdXJyZW50Lmxlbmd0aCA6IDA7XHJcblx0Y29uc3QgbmV4dExlbmd0aCA9IG5leHQgPyBuZXh0Lmxlbmd0aCA6IDA7XHJcblx0aWYgKGN1cnJlbnRMZW5ndGggIT09IG5leHRMZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRMZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKGN1cnJlbnRbaV0gIT09IG5leHRbaV0pIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdSZWxhdGlvbnNoaXBGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1JlbGF0aW9uc2hpcCcsXHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHRjcmVhdGVJc09wZW46IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlID0ge307XHJcblx0XHR0aGlzLmxvYWRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmIChuZXh0UHJvcHMudmFsdWUgPT09IHRoaXMucHJvcHMudmFsdWUgfHwgbmV4dFByb3BzLm1hbnkgJiYgY29tcGFyZVZhbHVlcyh0aGlzLnByb3BzLnZhbHVlLCBuZXh0UHJvcHMudmFsdWUpKSB7XHJcblx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcnMpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnByb3BzLmZpbHRlcnMpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZXNba2V5XSAhPT0gbmV4dFByb3BzLnZhbHVlc1trZXldKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRjcmVhdGVJc09wZW46IHRydWVcclxuXHRcdFx0XHRcdFx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGNyZWF0ZUlzT3BlbjogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSwgMTApO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sb2FkVmFsdWUobmV4dFByb3BzLnZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRzaG91bGRDb2xsYXBzZSAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5tYW55KSB7XHJcblx0XHRcdC8vIG1hbnk6dHJ1ZSByZWxhdGlvbnNoaXBzIGhhdmUgYW4gQXJyYXkgZm9yIGEgdmFsdWVcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWU7XHJcblx0fSxcclxuXHJcblx0YnVpbGRGaWx0ZXJzICgpIHtcclxuXHRcdHZhciBmaWx0ZXJzID0ge307XHJcblxyXG5cdFx0Xy5mb3JFYWNoKHRoaXMucHJvcHMuZmlsdGVycywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWVbMF0gPT09ICc6Jykge1xyXG5cdFx0XHRcdHZhciBmaWVsZE5hbWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuXHJcblx0XHRcdFx0dmFyIHZhbCA9IHRoaXMucHJvcHMudmFsdWVzW2ZpZWxkTmFtZV07XHJcblx0XHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdFx0ZmlsdGVyc1trZXldID0gdmFsO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgZmlsdGVyaW5nIGJ5IGlkIGFuZCBpdGVtIHdhcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PT0gJzpfaWQnICYmIEtleXN0b25lLml0ZW0pIHtcclxuXHRcdFx0XHRcdGZpbHRlcnNba2V5XSA9IEtleXN0b25lLml0ZW0uaWQ7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHJcblx0XHRfLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcblx0XHRcdHBhcnRzLnB1c2goJ2ZpbHRlcnNbJyArIGtleSArICddW3ZhbHVlXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyYnKTtcclxuXHR9LFxyXG5cclxuXHRjYWNoZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdGl0ZW0uaHJlZiA9IEtleXN0b25lLmFkbWluUGF0aCArICcvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJy8nICsgaXRlbS5pZDtcclxuXHRcdHRoaXMuX2l0ZW1zQ2FjaGVbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRWYWx1ZSAodmFsdWVzKSB7XHJcblx0XHRpZiAoIXZhbHVlcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IHZhbHVlcy5zcGxpdCgnLCcpO1xyXG5cdFx0Y29uc3QgY2FjaGVkVmFsdWVzID0gdmFsdWVzLm1hcChpID0+IHRoaXMuX2l0ZW1zQ2FjaGVbaV0pLmZpbHRlcihpID0+IGkpO1xyXG5cdFx0aWYgKGNhY2hlZFZhbHVlcy5sZW5ndGggPT09IHZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsdWU6IHRoaXMucHJvcHMubWFueSA/IGNhY2hlZFZhbHVlcyA6IGNhY2hlZFZhbHVlc1swXSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRsb2FkaW5nOiB0cnVlLFxyXG5cdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdH0pO1xyXG5cdFx0YXN5bmMubWFwKHZhbHVlcywgKHZhbHVlLCBkb25lKSA9PiB7XHJcblx0XHRcdHhocih7XHJcblx0XHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5yZWZMaXN0LnBhdGggKyAnLycgKyB2YWx1ZSArICc/YmFzaWMnLFxyXG5cdFx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGVyciB8fCAhZGF0YSkgcmV0dXJuIGRvbmUoZXJyKTtcclxuXHRcdFx0XHR0aGlzLmNhY2hlSXRlbShkYXRhKTtcclxuXHRcdFx0XHRkb25lKGVyciwgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgKGVyciwgZXhwYW5kZWQpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLmlzTW91bnRlZCgpKSByZXR1cm47XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLm1hbnkgPyBleHBhbmRlZCA6IGV4cGFuZGVkWzBdLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIE5PVEU6IHRoaXMgc2VlbXMgbGlrZSB0aGUgd3Jvbmcgd2F5IHRvIGFkZCBvcHRpb25zIHRvIHRoZSBTZWxlY3RcclxuXHRsb2FkT3B0aW9uc0NhbGxiYWNrOiB7fSxcclxuXHRsb2FkT3B0aW9ucyAoaW5wdXQsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0XHR0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGNvbnN0IGZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVycygpO1xyXG5cdFx0eGhyKHtcclxuXHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5yZWZMaXN0LnBhdGggKyAnP2Jhc2ljJnNlYXJjaD0nICsgaW5wdXQgKyAnJicgKyBmaWx0ZXJzLFxyXG5cdFx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgaXRlbXM6JywgZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobnVsbCwgW10pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRhdGEucmVzdWx0cy5mb3JFYWNoKHRoaXMuY2FjaGVJdGVtKTtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwge1xyXG5cdFx0XHRcdG9wdGlvbnM6IGRhdGEucmVzdWx0cyxcclxuXHRcdFx0XHRjb21wbGV0ZTogZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gZGF0YS5jb3VudCxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvcGVuQ3JlYXRlICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRjcmVhdGVJc09wZW46IHRydWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbG9zZUNyZWF0ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdG9uQ3JlYXRlIChpdGVtKSB7XHJcblx0XHR0aGlzLmNhY2hlSXRlbShpdGVtKTtcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUudmFsdWUpKSB7XHJcblx0XHRcdC8vIEZvciBtYW55IHJlbGF0aW9uc2hpcHMsIGFwcGVuZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGVuZFxyXG5cdFx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCk7XHJcblx0XHRcdHZhbHVlcy5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZCh2YWx1ZXMuam9pbignLCcpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudmFsdWVDaGFuZ2VkKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5PVEU6IHRoaXMgc2VlbXMgbGlrZSB0aGUgd3Jvbmcgd2F5IHRvIGFkZCBvcHRpb25zIHRvIHRoZSBTZWxlY3RcclxuXHRcdHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayhudWxsLCB7XHJcblx0XHRcdGNvbXBsZXRlOiB0cnVlLFxyXG5cdFx0XHRvcHRpb25zOiBPYmplY3Qua2V5cyh0aGlzLl9pdGVtc0NhY2hlKS5tYXAoKGspID0+IHRoaXMuX2l0ZW1zQ2FjaGVba10pLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNsb3NlQ3JlYXRlKCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyU2VsZWN0IChub2VkaXQpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0ey8qIFRoaXMgaW5wdXQgZWxlbWVudCBmb29scyBTYWZhcmkncyBhdXRvY29ycmVjdCBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgdGhhdCBjb21wbGV0ZWx5IGJyZWFrIHJlYWN0LXNlbGVjdCAqL31cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgd2lkdGg6IDEsIGhlaWdodDogMSwgekluZGV4OiAtMSwgb3BhY2l0eTogMCB9fSB0YWJJbmRleD1cIi0xXCIvPlxyXG5cdFx0XHRcdHshdGhpcy5zdGF0ZS5jcmVhdGVJc09wZW4gJiYgPFNlbGVjdC5Bc3luY1xyXG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMucHJvcHMubWFueX1cclxuXHRcdFx0XHRcdGRpc2FibGVkPXtub2VkaXR9XHJcblx0XHRcdFx0XHRsb2FkT3B0aW9ucz17dGhpcy5sb2FkT3B0aW9uc31cclxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdFx0Y2FjaGU9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0c2ltcGxlVmFsdWVcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxyXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJpZFwiXHJcblx0XHRcdFx0Lz59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJJbnB1dEdyb3VwICgpIHtcclxuXHRcdC8vIFRPRE86IGZpbmQgYmV0dGVyIHNvbHV0aW9uXHJcblx0XHQvLyAgIHdoZW4gaW1wb3J0aW5nIHRoZSBDcmVhdGVGb3JtIHVzaW5nOiBpbXBvcnQgQ3JlYXRlRm9ybSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9DcmVhdGVGb3JtJztcclxuXHRcdC8vICAgQ3JlYXRlRm9ybSB3YXMgaW1wb3J0ZWQgYXMgYSBibGFuayBvYmplY3QuIFRoaXMgc3RhY2sgb3ZlcmZsb3cgcG9zdCBzdWdnZXN0ZWQgbGF6aWxseSByZXF1aXJpbmcgaXQ6XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODA3NjY0L2N5Y2xpYy1kZXBlbmRlbmN5LXJldHVybnMtZW1wdHktb2JqZWN0LWluLXJlYWN0LW5hdGl2ZVxyXG5cdFx0Ly8gVE9ETzogSW1wbGVtZW50IHRoaXMgc29tZXdoZXJlIGhpZ2hlciBpbiB0aGUgYXBwLCBpdCBicmVha3MgdGhlIGVuY2Fwc3VsYXRpb24gb2YgdGhlIFJlbGF0aW9uc2hpcEZpZWxkIGNvbXBvbmVudFxyXG5cdFx0Y29uc3QgQ3JlYXRlRm9ybSA9IHJlcXVpcmUoJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL0NyZWF0ZUZvcm0nKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCBibG9jaz5cclxuXHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU2VsZWN0KCl9XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5DcmVhdGV9Pis8L0J1dHRvbj5cclxuXHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0PENyZWF0ZUZvcm1cclxuXHRcdFx0XHRcdGxpc3Q9e2xpc3RzQnlLZXlbdGhpcy5wcm9wcy5yZWZMaXN0LmtleV19XHJcblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUuY3JlYXRlSXNPcGVufVxyXG5cdFx0XHRcdFx0b25DcmVhdGU9e3RoaXMub25DcmVhdGV9XHJcblx0XHRcdFx0XHRvbkNhbmNlbD17dGhpcy5jbG9zZUNyZWF0ZX0gLz5cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgeyBtYW55IH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IHByb3BzID0ge1xyXG5cdFx0XHRjaGlsZHJlbjogdmFsdWUgPyB2YWx1ZS5uYW1lIDogbnVsbCxcclxuXHRcdFx0Y29tcG9uZW50OiB2YWx1ZSA/ICdhJyA6ICdzcGFuJyxcclxuXHRcdFx0aHJlZjogdmFsdWUgPyB2YWx1ZS5ocmVmIDogbnVsbCxcclxuXHRcdFx0bm9lZGl0OiB0cnVlLFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbWFueSA/IHRoaXMucmVuZGVyU2VsZWN0KHRydWUpIDogPEZvcm1JbnB1dCB7Li4ucHJvcHN9IC8+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmNyZWF0ZUlubGluZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJJbnB1dEdyb3VwKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJTZWxlY3QoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxufSk7XHJcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5cclxuaW1wb3J0IHtcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IFBvcG91dExpc3QgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QnO1xyXG5cclxuY29uc3QgSU5WRVJURURfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnTGlua2VkIFRvJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ05PVCBMaW5rZWQgVG8nLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogW10sXHJcblx0fTtcclxufVxyXG5cclxudmFyIFJlbGF0aW9uc2hpcEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRpbnZlcnRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcblx0XHR9KSxcclxuXHRcdG9uSGVpZ2h0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNlYXJjaElzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdHNlYXJjaFJlc3VsdHM6IFtdLFxyXG5cdFx0XHRzZWFyY2hTdHJpbmc6ICcnLFxyXG5cdFx0XHRzZWxlY3RlZEl0ZW1zOiBbXSxcclxuXHRcdFx0dmFsdWVJc0xvYWRpbmc6IHRydWUsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZSA9IHt9O1xyXG5cdFx0dGhpcy5sb2FkU2VhcmNoUmVzdWx0cyh0cnVlKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0aWYgKG5leHRQcm9wcy5maWx0ZXIudmFsdWUgIT09IHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlKSB7XHJcblx0XHRcdHRoaXMucG9wdWxhdGVWYWx1ZShuZXh0UHJvcHMuZmlsdGVyLnZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGlzTG9hZGluZyAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zZWFyY2hJc0xvYWRpbmcgfHwgdGhpcy5zdGF0ZS52YWx1ZUlzTG9hZGluZztcclxuXHR9LFxyXG5cdHBvcHVsYXRlVmFsdWUgKHZhbHVlKSB7XHJcblx0XHRhc3luYy5tYXAodmFsdWUsIChpZCwgbmV4dCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5faXRlbXNDYWNoZVtpZF0pIHJldHVybiBuZXh0KG51bGwsIHRoaXMuX2l0ZW1zQ2FjaGVbaWRdKTtcclxuXHRcdFx0eGhyKHtcclxuXHRcdFx0XHR1cmw6IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnByb3BzLmZpZWxkLnJlZkxpc3QucGF0aCArICcvJyArIGlkICsgJz9iYXNpYycsXHJcblx0XHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHRcdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdFx0XHRpZiAoZXJyIHx8ICFkYXRhKSByZXR1cm4gbmV4dChlcnIpO1xyXG5cdFx0XHRcdHRoaXMuY2FjaGVJdGVtKGRhdGEpO1xyXG5cdFx0XHRcdG5leHQoZXJyLCBkYXRhKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LCAoZXJyLCBpdGVtcykgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGVycm9ycyBiZXR0ZXJcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0dmFsdWVJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHNlbGVjdGVkSXRlbXM6IGl0ZW1zIHx8IFtdLFxyXG5cdFx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzLmZvY3VzVGFyZ2V0KS5mb2N1cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2FjaGVJdGVtIChpdGVtKSB7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9LFxyXG5cdGJ1aWxkRmlsdGVycyAoKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cdFx0Xy5mb3JFYWNoKHRoaXMucHJvcHMuZmllbGQuZmlsdGVycywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHRcdFx0aWYgKHZhbHVlWzBdID09PSAnOicpIHJldHVybjtcclxuXHRcdFx0ZmlsdGVyc1trZXldID0gdmFsdWU7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdF8uZm9yRWFjaChmaWx0ZXJzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuXHRcdFx0cGFydHMucHVzaCgnZmlsdGVyc1snICsga2V5ICsgJ11bdmFsdWVdPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcGFydHMuam9pbignJicpO1xyXG5cdH0sXHJcblx0bG9hZFNlYXJjaFJlc3VsdHMgKHRoZW5Qb3B1bGF0ZVZhbHVlKSB7XHJcblx0XHRjb25zdCBzZWFyY2hTdHJpbmcgPSB0aGlzLnN0YXRlLnNlYXJjaFN0cmluZztcclxuXHRcdGNvbnN0IGZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVycygpO1xyXG5cdFx0eGhyKHtcclxuXHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5maWVsZC5yZWZMaXN0LnBhdGggKyAnP2Jhc2ljJnNlYXJjaD0nICsgc2VhcmNoU3RyaW5nICsgJyYnICsgZmlsdGVycyxcclxuXHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHQvLyBUT0RPOiBIYW5kbGUgZXJyb3JzIGJldHRlclxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgaXRlbXM6JywgZXJyKTtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdHNlYXJjaElzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRhdGEucmVzdWx0cy5mb3JFYWNoKHRoaXMuY2FjaGVJdGVtKTtcclxuXHRcdFx0aWYgKHRoZW5Qb3B1bGF0ZVZhbHVlKSB7XHJcblx0XHRcdFx0dGhpcy5wb3B1bGF0ZVZhbHVlKHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoc2VhcmNoU3RyaW5nICE9PSB0aGlzLnN0YXRlLnNlYXJjaFN0cmluZykgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHNlYXJjaFJlc3VsdHM6IGRhdGEucmVzdWx0cyxcclxuXHRcdFx0fSwgdGhpcy51cGRhdGVIZWlnaHQpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHR1cGRhdGVIZWlnaHQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMub25IZWlnaHRDaGFuZ2UpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkhlaWdodENoYW5nZSh0aGlzLnJlZnMuY29udGFpbmVyLm9mZnNldEhlaWdodCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0fSxcclxuXHR1cGRhdGVTZWFyY2ggKGUpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hTdHJpbmc6IGUudGFyZ2V0LnZhbHVlIH0sIHRoaXMubG9hZFNlYXJjaFJlc3VsdHMpO1xyXG5cdH0sXHJcblx0c2VsZWN0SXRlbSAoaXRlbSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZS5jb25jYXQoaXRlbS5pZCk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVtb3ZlSXRlbSAoaXRlbSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZS5maWx0ZXIoaSA9PiB7IHJldHVybiBpICE9PSBpdGVtLmlkOyB9KTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWUgfSk7XHJcblx0fSxcclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVySXRlbXMgKGl0ZW1zLCBzZWxlY3RlZCkge1xyXG5cdFx0Y29uc3QgaXRlbUljb25Ib3ZlciA9IHNlbGVjdGVkID8gJ3gnIDogJ2NoZWNrJztcclxuXHJcblx0XHRyZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFBvcG91dExpc3QuSXRlbVxyXG5cdFx0XHRcdFx0a2V5PXtgaXRlbS0ke2l9LSR7aXRlbS5pZH1gfVxyXG5cdFx0XHRcdFx0aWNvbj1cImRhc2hcIlxyXG5cdFx0XHRcdFx0aWNvbkhvdmVyPXtpdGVtSWNvbkhvdmVyfVxyXG5cdFx0XHRcdFx0bGFiZWw9e2l0ZW0ubmFtZX1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdGVkKSB0aGlzLnJlbW92ZUl0ZW0oaXRlbSk7XHJcblx0XHRcdFx0XHRcdGVsc2UgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xyXG5cdFx0XHRcdFx0fX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtcztcclxuXHRcdGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuZmlsdGVyKGkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuaW5kZXhPZihpLmlkKSA9PT0gLTE7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5pc0xvYWRpbmcoKSA/ICdMb2FkaW5nLi4uJyA6ICdGaW5kIGEgJyArIHRoaXMucHJvcHMuZmllbGQubGFiZWwgKyAnLi4uJztcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgcmVmPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sIGVxdWFsV2lkdGhTZWdtZW50cyBvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfSB2YWx1ZT17dGhpcy5wcm9wcy5maWx0ZXIuaW52ZXJ0ZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfSAvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMXB4IGRhc2hlZCByZ2JhKDAsMCwwLDAuMSknLCBwYWRkaW5nQm90dG9tOiAnMWVtJyB9fT5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXQgYXV0b0ZvY3VzIHJlZj1cImZvY3VzVGFyZ2V0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoU3RyaW5nfSBvbkNoYW5nZT17dGhpcy51cGRhdGVTZWFyY2h9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gLz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHR7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPyAoXHJcblx0XHRcdFx0XHQ8UG9wb3V0TGlzdD5cclxuXHRcdFx0XHRcdFx0PFBvcG91dExpc3QuSGVhZGluZz5TZWxlY3RlZDwvUG9wb3V0TGlzdC5IZWFkaW5nPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJdGVtcyhzZWxlY3RlZEl0ZW1zLCB0cnVlKX1cclxuXHRcdFx0XHRcdDwvUG9wb3V0TGlzdD5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0XHR7c2VhcmNoUmVzdWx0cy5sZW5ndGggPyAoXHJcblx0XHRcdFx0XHQ8UG9wb3V0TGlzdD5cclxuXHRcdFx0XHRcdFx0PFBvcG91dExpc3QuSGVhZGluZyBzdHlsZT17c2VsZWN0ZWRJdGVtcy5sZW5ndGggPyB7IG1hcmdpblRvcDogJzJlbScgfSA6IG51bGx9Pkl0ZW1zPC9Qb3BvdXRMaXN0LkhlYWRpbmc+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckl0ZW1zKHNlYXJjaFJlc3VsdHMpfVxyXG5cdFx0XHRcdFx0PC9Qb3BvdXRMaXN0PlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlbGF0aW9uc2hpcEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBTZWxlY3RDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdTZWxlY3RDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGNvbnN0IG9wdGlvbiA9IHRoaXMucHJvcHMuY29sLmZpZWxkLm9wcy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSB2YWx1ZSlbMF07XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfSB0bz17dGhpcy5wcm9wcy5saW5rVG99IGVtcHR5PXtlbXB0eX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RDb2x1bW47XHJcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuLyoqXHJcbiAqIFRPRE86XHJcbiAqIC0gQ3VzdG9tIHBhdGggc3VwcG9ydFxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdTZWxlY3RGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1NlbGVjdCcsXHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkIChuZXdWYWx1ZSkge1xyXG5cdFx0Ly8gVE9ETzogVGhpcyBzaG91bGQgYmUgbmF0aXZlbHkgaGFuZGxlZCBieSB0aGUgU2VsZWN0IGNvbXBvbmVudFxyXG5cdFx0aWYgKHRoaXMucHJvcHMubnVtZXJpYyAmJiB0eXBlb2YgbmV3VmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBOdW1iZXIobmV3VmFsdWUpIDogdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IG5ld1ZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgeyBvcHMsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWQgPSBvcHMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSB2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dCBub2VkaXQ+XHJcblx0XHRcdFx0e3NlbGVjdGVkID8gc2VsZWN0ZWQubGFiZWwgOiBudWxsfVxyXG5cdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0Y29uc3QgeyBudW1lcmljLCBvcHMsIHBhdGgsIHZhbHVlOiB2YWwgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBzaG91bGQgYmUgbmF0aXZlbHkgaGFuZGxlZCBieSB0aGUgU2VsZWN0IGNvbXBvbmVudFxyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IChudW1lcmljKVxyXG5cdFx0XHQ/IG9wcy5tYXAoZnVuY3Rpb24gKGkpIHtcclxuXHRcdFx0XHRyZXR1cm4geyBsYWJlbDogaS5sYWJlbCwgdmFsdWU6IFN0cmluZyhpLnZhbHVlKSB9O1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQ6IG9wcztcclxuXHRcdGNvbnN0IHZhbHVlID0gKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxyXG5cdFx0XHQ/IFN0cmluZyh2YWwpXHJcblx0XHRcdDogdmFsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0ey8qIFRoaXMgaW5wdXQgZWxlbWVudCBmb29scyBTYWZhcmkncyBhdXRvY29ycmVjdCBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgdGhhdCBjb21wbGV0ZWx5IGJyZWFrIHJlYWN0LXNlbGVjdCAqL31cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgd2lkdGg6IDEsIGhlaWdodDogMSwgekluZGV4OiAtMSwgb3BhY2l0eTogMCB9fSB0YWJJbmRleD1cIi0xXCIvPlxyXG5cdFx0XHRcdDxTZWxlY3RcclxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZShwYXRoKX1cclxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHRcdG9wdGlvbnM9e29wdGlvbnN9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IHtcclxuXHRCdXR0b24sXHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1Ob3RlLFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgUG9wb3V0TGlzdCBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0TGlzdCc7XHJcbmltcG9ydCBLYmQgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvS2JkJztcclxuaW1wb3J0IGJpbmRGdW5jdGlvbnMgZnJvbSAnLi4vLi4vdXRpbHMvYmluZEZ1bmN0aW9ucyc7XHJcblxyXG5jb25zdCBJTlZFUlRFRF9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdNYXRjaGVzJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ0RvZXMgTk9UIE1hdGNoJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IFtdLFxyXG5cdH07XHJcbn1cclxuXHJcbmNsYXNzIEZpbHRlck9wdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRiaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgW1xyXG5cdFx0XHQnaGFuZGxlQ2xpY2snLFxyXG5cdFx0XSk7XHJcblx0fVxyXG5cdGhhbmRsZUNsaWNrICgpIHtcclxuXHRcdGNvbnN0IHsgb3B0aW9uLCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdHRoaXMucHJvcHMub25DbGljayhvcHRpb24sIHNlbGVjdGVkKTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgb3B0aW9uLCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQb3BvdXRMaXN0Lkl0ZW1cclxuXHRcdFx0XHRpY29uPXtzZWxlY3RlZCA/ICdjaGVjaycgOiAnZGFzaCd9XHJcblx0XHRcdFx0aXNTZWxlY3RlZD17c2VsZWN0ZWR9XHJcblx0XHRcdFx0bGFiZWw9e29wdGlvbi5sYWJlbH1cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNlbGVjdEZpbHRlciBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRiaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgW1xyXG5cdFx0XHQnZGV0ZWN0T1MnLFxyXG5cdFx0XHQnaGFuZGxlQ2xpY2snLFxyXG5cdFx0XHQnaGFuZGxlS2V5RG93bicsXHJcblx0XHRcdCdoYW5kbGVLZXlVcCcsXHJcblx0XHRcdCdyZW1vdmVPcHRpb24nLFxyXG5cdFx0XHQnc2VsZWN0T3B0aW9uJyxcclxuXHRcdFx0J3RvZ2dsZUFsbE9wdGlvbnMnLFxyXG5cdFx0XHQndG9nZ2xlSW52ZXJ0ZWQnLFxyXG5cdFx0XHQndXBkYXRlRmlsdGVyJyxcclxuXHRcdF0pO1xyXG5cclxuXHRcdHRoaXMuc3RhdGUgPSB7IG1ldGFEb3duOiBmYWxzZSB9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLmRldGVjdE9TKCk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24sIGZhbHNlKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVVwLCBmYWxzZSk7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcCk7XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdC8vIFRPRE8gdGhpcyBzaG91bGQgcHJvYmFibHkgYmUgbW92ZWQgdG8gdGhlIG1haW4gQXBwIGNvbXBvbmVudCBhbmQgc3RvcmVkXHJcblx0Ly8gaW4gY29udGV4dCBmb3Igb3RoZXIgY29tcG9uZW50cyB0byBzdWJzY3JpYmUgdG8gd2hlbiByZXF1aXJlZFxyXG5cdGRldGVjdE9TICgpIHtcclxuXHRcdGxldCBvc05hbWUgPSAnVW5rbm93biBPUyc7XHJcblxyXG5cdFx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluY2x1ZGVzKCdXaW4nKSkgb3NOYW1lID0gJ1dpbmRvd3MnO1xyXG5cdFx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluY2x1ZGVzKCdNYWMnKSkgb3NOYW1lID0gJ01hY09TJztcclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnWDExJykpIG9zTmFtZSA9ICdVTklYJztcclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnTGludXgnKSkgb3NOYW1lID0gJ0xpbnV4JztcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHsgb3NOYW1lIH0pO1xyXG5cdH1cclxuXHRoYW5kbGVLZXlEb3duIChlKSB7XHJcblx0XHRpZiAodmtleVtlLmtleUNvZGVdICE9PSAnPG1ldGE+JykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBtZXRhRG93bjogdHJ1ZSB9KTtcclxuXHR9XHJcblx0aGFuZGxlS2V5VXAgKGUpIHtcclxuXHRcdGlmICh2a2V5W2Uua2V5Q29kZV0gIT09ICc8bWV0YT4nKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG1ldGFEb3duOiBmYWxzZSB9KTtcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUludmVydGVkIChpbnZlcnRlZCkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBpbnZlcnRlZCB9KTtcclxuXHR9XHJcblx0dG9nZ2xlQWxsT3B0aW9ucyAoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKGZpbHRlci52YWx1ZS5sZW5ndGggPCBmaWVsZC5vcHMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IGZpZWxkLm9wcy5tYXAoaSA9PiBpLnZhbHVlKSB9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IFtdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLm1ldGFEb3duXHJcblx0XHRcdD8gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuY29uY2F0KG9wdGlvbi52YWx1ZSlcclxuXHRcdFx0OiBbb3B0aW9uLnZhbHVlXTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH1cclxuXHRyZW1vdmVPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLm1ldGFEb3duXHJcblx0XHRcdD8gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuZmlsdGVyKGkgPT4gaSAhPT0gb3B0aW9uLnZhbHVlKVxyXG5cdFx0XHQ6IFtvcHRpb24udmFsdWVdO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWUgfSk7XHJcblx0fVxyXG5cdGhhbmRsZUNsaWNrIChvcHRpb24sIHNlbGVjdGVkKSB7XHJcblx0XHRzZWxlY3RlZCA/IHRoaXMucmVtb3ZlT3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG5cdH1cclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gUkVOREVSRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHJlbmRlck9wdGlvbnMgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuZmllbGQub3BzLm1hcCgob3B0aW9uLCBpKSA9PiB7XHJcblx0XHRcdGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbHRlck9wdGlvblxyXG5cdFx0XHRcdFx0a2V5PXtgaXRlbS0ke2l9LSR7b3B0aW9uLnZhbHVlfWB9XHJcblx0XHRcdFx0XHRvcHRpb249e29wdGlvbn1cclxuXHRcdFx0XHRcdHNlbGVjdGVkPXtzZWxlY3RlZH1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaW5kZXRlcm1pbmF0ZSA9IGZpbHRlci52YWx1ZS5sZW5ndGggPCBmaWVsZC5vcHMubGVuZ3RoO1xyXG5cclxuXHRcdGNvbnN0IG1ldGFLZXlMYWJlbCA9IHRoaXMuc3RhdGUub3NOYW1lID09PSAnTWFjT1MnXHJcblx0XHRcdD8gJ2NtZCdcclxuXHRcdFx0OiAnY3RybCc7XHJcblxyXG5cdFx0Y29uc3QgZmllbGRTdHlsZXMgPSB7XHJcblx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0XHRib3JkZXJCb3R0b206ICcxcHggZGFzaGVkIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAnMWVtJyxcclxuXHRcdFx0cGFkZGluZ0JvdHRvbTogJzFlbScsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVJbnZlcnRlZH1cclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17SU5WRVJURURfT1BUSU9OU31cclxuXHRcdFx0XHRcdFx0dmFsdWU9e2ZpbHRlci5pbnZlcnRlZH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17ZmllbGRTdHlsZXN9PlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBzaXplPVwieHNtYWxsXCIgb25DbGljaz17dGhpcy50b2dnbGVBbGxPcHRpb25zfSBzdHlsZT17eyBwYWRkaW5nOiAwLCB3aWR0aDogNTAgfX0+XHJcblx0XHRcdFx0XHRcdHtpbmRldGVybWluYXRlID8gJ0FsbCcgOiAnTm9uZSd9XHJcblx0XHRcdFx0XHQ8L0J1dHRvbj5cclxuXHRcdFx0XHRcdDxGb3JtTm90ZSBzdHlsZT17eyBtYXJnaW46IDAgfX0+XHJcblx0XHRcdFx0XHRcdEhvbGQgPEtiZD57bWV0YUtleUxhYmVsfTwvS2JkPiB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9uc1xyXG5cdFx0XHRcdFx0PC9Gb3JtTm90ZT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJPcHRpb25zKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuU2VsZWN0RmlsdGVyLnByb3BUeXBlcyA9IHtcclxuXHRmaWVsZDogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRmaWx0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHR2YWx1ZTogUHJvcFR5cGVzLmFycmF5LFxyXG5cdH0pLFxyXG59O1xyXG5TZWxlY3RGaWx0ZXIuZ2V0RGVmYXVsdFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlO1xyXG5TZWxlY3RGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBUZXh0Q29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnVGV4dENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0bGlua1RvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0VmFsdWUgKCkge1xyXG5cdFx0Ly8gY3JvcHBpbmcgdGV4dCBpcyBpbXBvcnRhbnQgZm9yIHRleHRhcmVhLCB3aGljaCB1c2VzIHRoaXMgY29sdW1uXHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5zdWJzdHIoMCwgMTAwKSA6IG51bGw7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY29sLmZpZWxkLm1vbm9zcGFjZSA/ICdJdGVtTGlzdF9fdmFsdWUtLW1vbm9zcGFjZScgOiB1bmRlZmluZWQ7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdG89e3RoaXMucHJvcHMubGlua1RvfSBlbXB0eT17ZW1wdHl9IHBhZGRlZCBpbnRlcmlvciBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZXh0Q29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnVGV4dEZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnVGV4dCcsXHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRGb3JtU2VsZWN0LFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgSU5WRVJURURfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnTWF0Y2hlcycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdEb2VzIE5PVCBNYXRjaCcsIHZhbHVlOiB0cnVlIH0sXHJcbl07XHJcblxyXG5jb25zdCBNT0RFX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0NvbnRhaW5zJywgdmFsdWU6ICdjb250YWlucycgfSxcclxuXHR7IGxhYmVsOiAnRXhhY3RseScsIHZhbHVlOiAnZXhhY3RseScgfSxcclxuXHR7IGxhYmVsOiAnQmVnaW5zIHdpdGgnLCB2YWx1ZTogJ2JlZ2luc1dpdGgnIH0sXHJcblx0eyBsYWJlbDogJ0VuZHMgd2l0aCcsIHZhbHVlOiAnZW5kc1dpdGgnIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRtb2RlOiBNT0RFX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHRpbnZlcnRlZDogSU5WRVJURURfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdHZhbHVlOiAnJyxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgVGV4dEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0bW9kZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE1PREVfT1BUSU9OUy5tYXAoaSA9PiBpLnZhbHVlKSksXHJcblx0XHRcdGludmVydGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbGVhbixcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZSB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHRvZ2dsZUludmVydGVkIChpbnZlcnRlZCkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBpbnZlcnRlZCB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlIChlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gZmllbGQubGFiZWwgKyAnICcgKyBtb2RlLmxhYmVsLnRvTG93ZXJDYXNlKCkgKyAnLi4uJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbFxyXG5cdFx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlSW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e0lOVkVSVEVEX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8Rm9ybVNlbGVjdFxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtNT0RFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXttb2RlLnZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRhdXRvRm9jdXNcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG5cdFx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLnZhbHVlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGV4dEZpbHRlcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRDb2x1bW4nKTtcclxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnVGV4dGFyZWFGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1RleHRhcmVhJyxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdFx0aGVpZ2h0OiBoZWlnaHQsXHJcblx0XHRcdHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsXHJcblx0XHRcdG92ZXJmbG93WTogJ2F1dG8nLFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbXVsdGlsaW5lIG5vZWRpdCBzdHlsZT17c3R5bGVzfT57dGhpcy5wcm9wcy52YWx1ZX08L0Zvcm1JbnB1dD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRjb25zdCB7IGhlaWdodCwgcGF0aCwgc3R5bGUsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdFx0aGVpZ2h0OiBoZWlnaHQsXHJcblx0XHRcdC4uLnN0eWxlLFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdG11bHRpbGluZVxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHBhdGgpfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0c3R5bGU9e3N0eWxlc31cclxuXHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3RleHQvVGV4dEZpbHRlcicpO1xyXG4iLCIvKlxyXG5cdFRpZGllciBiaW5kaW5nIGZvciBjb21wb25lbnQgbWV0aG9kcyB0byBDbGFzc2VzXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFsnaGFuZGxlQ2xpY2snLCAnaGFuZGxlT3RoZXInXSk7XHJcblx0fVxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmRGdW5jdGlvbnMgKGZ1bmN0aW9ucykge1xyXG5cdGZ1bmN0aW9ucy5mb3JFYWNoKGYgPT4gKHRoaXNbZl0gPSB0aGlzW2ZdLmJpbmQodGhpcykpKTtcclxufTtcclxuIiwidmFyIEV4TWF0Y2ggPSByZXF1aXJlKCdleHByZXNzaW9uLW1hdGNoJyk7IC8vIE1hdGNoZXMgb2JqZWN0cyB3aXRoIGV4cHJlc3Npb25zXHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHNvbWV0aGluZyBpcyBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtICB7QW55fSBhcmcgICBUaGUgc29tZXRoaW5nIHdlIHdhbnQgdG8gY2hlY2sgdGhlIHR5cGUgb2ZcclxuICogQHJldHVybiB7Qm9vbGVhbn0gSWYgYXJnIGlzIGFuIG9iamVjdCBvciBub3RcclxuICovXHJcbmZ1bmN0aW9uIGlzT2JqZWN0IChhcmcpIHtcclxuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV2YWx1YXRlcyB0aGUgdmlzaWJpbGl0eSBvZiBhIGZpZWxkIGJhc2VkIG9uIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHRoZWlyIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R8QW55fSBkZXBlbmRzT24gVGhlIGRlcGVuZHNPbiB2YXJpYWJsZSB3ZSBnZXQgZnJvbSB0aGUgZmllbGRcclxuICogQHBhcmFtICB7T2JqZWN0fVx0XHR2YWx1ZXMgICAgVGhlIHZhbHVlcyBjdXJyZW50bHkgaW4gdGhlIGZpZWxkc1xyXG4gKiBAcmV0dXJuIHtCb29sZWFufVx0XHRcdCAgSWYgdGhlIGN1cnJlbnQgZmllbGQgc2hvdWxkIGJlIGRpc3BsYXllZCBiYXNlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgXHQgIG9uIGl0J3MgZGVwZW5kZW5jaWVzIGFuZCB0aGVpciB2YWx1ZXNcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZhbERlcGVuZHNPbiAoZGVwZW5kc09uLCB2YWx1ZXMpIHtcclxuXHRpZiAoIWlzT2JqZWN0KGRlcGVuZHNPbikgfHwgIU9iamVjdC5rZXlzKGRlcGVuZHNPbikubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8vIENoZWNrcyBpZiB0aGUgY3VycmVudCBmaWVsZCBzaG91bGQgYmUgZGlzcGxheWVkLCBiYXNlZCBvbiB0aGUgdmFsdWVzIG9mXHJcblx0Ly8gb3RoZXIgZmllbGRzIGFuZCB0aGUgZGVwZW5kc09uIGNvbmZpZ3VyYXRpb24gb2YgdGhpcyBmaWVsZFxyXG5cdHZhciBNYXRjaCA9IG5ldyBFeE1hdGNoKGRlcGVuZHNPbiwgdmFsdWVzLCBmYWxzZSk7XHJcblx0cmV0dXJuIE1hdGNoLm1hdGNoKCk7XHJcbn07XHJcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJleHBvcnRzLkNvbHVtbnMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dENvbHVtblwiKSxcbmRhdGV0aW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lQ29sdW1uXCIpLFxucmVsYXRpb25zaGlwOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBDb2x1bW5cIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbENvbHVtblwiKSxcbnNlbGVjdDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0Q29sdW1uXCIpLFxucGFzc3dvcmQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRDb2x1bW5cIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUNvbHVtblwiKSxcbmJvb2xlYW46IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuQ29sdW1uXCIpLFxuZGF0ZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRlL0RhdGVDb2x1bW5cIiksXG5udW1iZXI6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvbnVtYmVyL051bWJlckNvbHVtblwiKSxcbnRleHRhcmVhOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHRhcmVhL1RleHRhcmVhQ29sdW1uXCIpLFxuaWQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0lkQ29sdW1uXCIpLFxuX191bnJlY29nbmlzZWRfXzogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL2NvbHVtbnMvSW52YWxpZENvbHVtblwiKSxcbn07XG5leHBvcnRzLkZpZWxkcyA9IHtcbnRleHQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmllbGRcIiksXG5kYXRldGltZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUZpZWxkXCIpLFxucmVsYXRpb25zaGlwOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWVsZFwiKSxcbmVtYWlsOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmllbGRcIiksXG5zZWxlY3Q6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdEZpZWxkXCIpLFxucGFzc3dvcmQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRGaWVsZFwiKSxcbmNsb3VkaW5hcnlpbWFnZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9jbG91ZGluYXJ5aW1hZ2UvQ2xvdWRpbmFyeUltYWdlRmllbGRcIiksXG5ib29sZWFuOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkZpZWxkXCIpLFxuZGF0ZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRlL0RhdGVGaWVsZFwiKSxcbm51bWJlcjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyRmllbGRcIiksXG50ZXh0YXJlYTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0YXJlYS9UZXh0YXJlYUZpZWxkXCIpLFxufTtcbmV4cG9ydHMuRmlsdGVycyA9IHtcbnRleHQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmlsdGVyXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWx0ZXJcIiksXG5yZWxhdGlvbnNoaXA6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpbHRlclwiKSxcbmVtYWlsOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmlsdGVyXCIpLFxuc2VsZWN0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3NlbGVjdC9TZWxlY3RGaWx0ZXJcIiksXG5wYXNzd29yZDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZEZpbHRlclwiKSxcbmNsb3VkaW5hcnlpbWFnZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9jbG91ZGluYXJ5aW1hZ2UvQ2xvdWRpbmFyeUltYWdlRmlsdGVyXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWx0ZXJcIiksXG5kYXRlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUZpbHRlclwiKSxcbm51bWJlcjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9udW1iZXIvTnVtYmVyRmlsdGVyXCIpLFxudGV4dGFyZWE6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dGFyZWEvVGV4dGFyZWFGaWx0ZXJcIiksXG59O1xuIl19
