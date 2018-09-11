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

},{"../elemental":65,"./AlertMessages":66,"./IframeContent":68,"./InvalidFieldType":69,"FieldTypes":"FieldTypes","object-assign":129,"react":undefined,"vkey":undefined}],68:[function(require,module,exports){
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

},{"list-to-array":undefined,"object-assign":129,"qs":undefined,"xhr":undefined}],83:[function(require,module,exports){
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

},{"../../admin/client/App/elemental":65,"../components/CollapsedFieldLabel":90,"../utils/evalDependsOn.js":128,"blacklist":undefined,"classnames":undefined,"react":undefined,"react-dom":undefined}],101:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"moment":undefined,"react":undefined,"react-day-picker":undefined,"react-dom":undefined}],109:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateColumn');

},{"../date/DateColumn":107}],110:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../components/DateInput":91,"../Field":100,"moment":undefined,"react":undefined}],111:[function(require,module,exports){
'use strict';

module.exports = require('../date/DateFilter');

},{"../date/DateFilter":108}],112:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],113:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],114:[function(require,module,exports){
'use strict';

module.exports = require('../text/TextFilter');

},{"../text/TextFilter":126}],115:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],116:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined}],117:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined}],118:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],119:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/CreateForm":67,"../../../admin/client/utils/lists":87,"../Field":100,"async":undefined,"lodash":undefined,"react":undefined,"react-select":undefined,"xhr":undefined}],120:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Popout/PopoutList":74,"async":undefined,"lodash":undefined,"react":undefined,"react-dom":undefined,"xhr":undefined}],121:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],122:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../Field":100,"react":undefined,"react-select":undefined}],123:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"../../../admin/client/App/shared/Kbd":70,"../../../admin/client/App/shared/Popout/PopoutList":74,"../../utils/bindFunctions":127,"react":undefined,"vkey":undefined}],124:[function(require,module,exports){
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

},{"../../components/ItemsTableCell":95,"../../components/ItemsTableValue":96,"react":undefined}],125:[function(require,module,exports){
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

},{"../Field":100}],126:[function(require,module,exports){
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

},{"../../../admin/client/App/elemental":65,"react":undefined,"react-dom":undefined}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{"expression-match":undefined}],129:[function(require,module,exports){
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
  boolean: require("../../fields/types/boolean/BooleanField")
};
exports.Filters = {
  text: require("../../fields/types/text/TextFilter"),
  datetime: require("../../fields/types/datetime/DatetimeFilter"),
  relationship: require("../../fields/types/relationship/RelationshipFilter"),
  email: require("../../fields/types/email/EmailFilter"),
  select: require("../../fields/types/select/SelectFilter"),
  password: require("../../fields/types/password/PasswordFilter"),
  cloudinaryimage: require("../../fields/types/cloudinaryimage/CloudinaryImageFilter"),
  boolean: require("../../fields/types/boolean/BooleanFilter")
};

},{"../../fields/components/columns/IdColumn":98,"../../fields/components/columns/InvalidColumn":99,"../../fields/types/boolean/BooleanColumn":101,"../../fields/types/boolean/BooleanField":102,"../../fields/types/boolean/BooleanFilter":103,"../../fields/types/cloudinaryimage/CloudinaryImageColumn":104,"../../fields/types/cloudinaryimage/CloudinaryImageField":105,"../../fields/types/cloudinaryimage/CloudinaryImageFilter":106,"../../fields/types/datetime/DatetimeColumn":109,"../../fields/types/datetime/DatetimeField":110,"../../fields/types/datetime/DatetimeFilter":111,"../../fields/types/email/EmailColumn":112,"../../fields/types/email/EmailField":113,"../../fields/types/email/EmailFilter":114,"../../fields/types/password/PasswordColumn":115,"../../fields/types/password/PasswordField":116,"../../fields/types/password/PasswordFilter":117,"../../fields/types/relationship/RelationshipColumn":118,"../../fields/types/relationship/RelationshipField":119,"../../fields/types/relationship/RelationshipFilter":120,"../../fields/types/select/SelectColumn":121,"../../fields/types/select/SelectField":122,"../../fields/types/select/SelectFilter":123,"../../fields/types/text/TextColumn":124,"../../fields/types/text/TextField":125,"../../fields/types/text/TextFilter":126}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL2Nsb3VkaW5hcnktbWljcm91cmwvdXJsLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0FsZXJ0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0JsYW5rU3RhdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQnV0dG9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9DZW50ZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9DaGlwL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Ecm9wZG93bkJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtRmllbGQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9ub2VkaXQuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUxhYmVsL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybU5vdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaEJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhGaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvb2N0aWNvbnMuanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0dyaWRDb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWRSb3cvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXBTZWN0aW9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTGFiZWxsZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvTG9hZGluZ0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvYm9keS5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZGlhbG9nLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9mb290ZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2hlYWRlci5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vcGFnZS5qcyIsIkFwcC9lbGVtZW50YWwvUGFzc0NvbnRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BvcnRhbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvUmVzcG9uc2l2ZVRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NjcmVlblJlYWRlck9ubHkvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Njcm9sbExvY2svaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NlZ21lbnRlZENvbnRyb2wvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvU3Bpbm5lci9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc2l6ZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvQWxlcnRNZXNzYWdlcy5qcyIsIkFwcC9zaGFyZWQvQ3JlYXRlRm9ybS5qcyIsIkFwcC9zaGFyZWQvSWZyYW1lQ29udGVudC5qcyIsIkFwcC9zaGFyZWQvSW52YWxpZEZpZWxkVHlwZS5qcyIsIkFwcC9zaGFyZWQvS2JkLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0Qm9keS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEZvb3Rlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEhlYWRlci5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0SGVhZGluZy5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3RJdGVtLmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0UGFuZS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L2luZGV4LmpzIiwiQXBwL3NoYXJlZC9Qb3J0YWwuanMiLCJjb25zdGFudHMuanMiLCJ0aGVtZS5qcyIsInV0aWxzL0xpc3QuanMiLCJ1dGlscy9jbG91ZGluYXJ5UmVzaXplLmpzIiwidXRpbHMvY29sb3IuanMiLCJ1dGlscy9jb25jYXRDbGFzc25hbWVzLmpzIiwidXRpbHMvY3NzLmpzIiwidXRpbHMvbGlzdHMuanMiLCJ1dGlscy9zdHJpbmcuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9DaGVja2JveC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0NvbGxhcHNlZEZpZWxkTGFiZWwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9EYXRlSW5wdXQuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9GaWxlQ2hhbmdlTWVzc2FnZS5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0hpZGRlbkZpbGVJbnB1dC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0ltYWdlVGh1bWJuYWlsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0Nsb3VkaW5hcnlJbWFnZVN1bW1hcnkuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0lkQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JbnZhbGlkQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL0ZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9jbG91ZGluYXJ5aW1hZ2UvQ2xvdWRpbmFyeUltYWdlRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRlL0RhdGVDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0RmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0RmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3V0aWxzL2JpbmRGdW5jdGlvbnMuanMiLCIuLi8uLi9maWVsZHMvdXRpbHMvZXZhbERlcGVuZHNPbi5qcyIsIi4uLy4uLy4uL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJfc3RyZWFtXzAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxRQUFRLENBQ1YsRUFBQyxNQUFNLE1BQVAsRUFBZSxRQUFPLEdBQXRCLEVBRFUsRUFFVixFQUFDLE1BQU0sUUFBUCxFQUFpQixRQUFPLEdBQXhCLEVBRlUsRUFHVixFQUFDLE1BQU0sY0FBUCxFQUF1QixRQUFPLEdBQTlCLEVBSFUsRUFJVixFQUFDLE1BQU0sT0FBUCxFQUFnQixRQUFPLElBQXZCLEVBSlUsRUFLVixFQUFDLE1BQU0sU0FBUCxFQUFrQixRQUFPLEdBQXpCLEVBTFUsRUFNVixFQUFDLE1BQU0sUUFBUCxFQUFpQixRQUFPLEdBQXhCLEVBTlUsRUFPVixFQUFDLE1BQU0sUUFBUCxFQUFpQixRQUFPLEdBQXhCLEVBUFUsRUFRVixFQUFDLE1BQU0sU0FBUCxFQUFrQixRQUFPLEdBQXpCLEVBUlUsRUFTVixFQUFDLE1BQU0sT0FBUCxFQUFnQixRQUFPLEdBQXZCLEVBVFUsQ0FBWjs7QUFZQSxPQUFPLE9BQVAsR0FBaUIsVUFBUyxFQUFULEVBQWEsT0FBYixFQUFzQjtBQUNyQyxNQUFJLENBQUMsT0FBTCxFQUFjLFVBQVUsRUFBVjs7QUFFZCxN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UixDQUpVO0FBS2pCLFVBQVEsUUFBUSx1Q0FBUixDQUxTO0FBTWpCLFlBQVUsUUFBUSwyQ0FBUixDQU5PO0FBT2pCLG1CQUFpQixRQUFRLHlEQUFSLENBUEE7QUFRakIsV0FBUyxRQUFRLHlDQUFSO0FBUlEsQ0FBakI7QUFVQSxRQUFRLE9BQVIsR0FBa0I7QUFDbEIsUUFBTSxRQUFRLG9DQUFSLENBRFk7QUFFbEIsWUFBVSxRQUFRLDRDQUFSLENBRlE7QUFHbEIsZ0JBQWMsUUFBUSxvREFBUixDQUhJO0FBSWxCLFNBQU8sUUFBUSxzQ0FBUixDQUpXO0FBS2xCLFVBQVEsUUFBUSx3Q0FBUixDQUxVO0FBTWxCLFlBQVUsUUFBUSw0Q0FBUixDQU5RO0FBT2xCLG1CQUFpQixRQUFRLDBEQUFSLENBUEM7QUFRbEIsV0FBUyxRQUFRLDBDQUFSO0FBUlMsQ0FBbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBFeGFtcGxlIG9wdGlvbnM6XG5cbi8vIGZsYWdzOiAncHJvZ3Jlc3NpdmUnXG4vLyBmbGFnczogWydwcm9ncmVzc2l2ZSddXG4vLyBxdWFsaXR5OiA4MFxuLy8gY3JvcDogJ2ZpdCcsICdmaWxsJ1xuLy8gZ3Jhdml0eTogJ2ZhY2UnXG4vLyBmZXRjaF9mb3JtYXQ6ICdhdXRvJ1xuLy8gd2lkdGg6IDMwMFxuLy8gaGVpZ2h0OiAzMDBcbi8vIGVmZmVjdDogYmx1cjoyMDBcblxudmFyIFRZUEVTID0gW1xuICB7bmFtZTogJ2Nyb3AnLCBwcmVmaXg6J2MnfSxcbiAge25hbWU6ICdlZmZlY3QnLCBwcmVmaXg6J2UnfSxcbiAge25hbWU6ICdmZXRjaF9mb3JtYXQnLCBwcmVmaXg6J2YnfSxcbiAge25hbWU6ICdmbGFncycsIHByZWZpeDonZmwnfSxcbiAge25hbWU6ICdncmF2aXR5JywgcHJlZml4OidnJ30sXG4gIHtuYW1lOiAnaGVpZ2h0JywgcHJlZml4OidoJ30sXG4gIHtuYW1lOiAncmFkaXVzJywgcHJlZml4OidyJ30sXG4gIHtuYW1lOiAncXVhbGl0eScsIHByZWZpeDoncSd9LFxuICB7bmFtZTogJ3dpZHRoJywgcHJlZml4Oid3J30sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gIHZhciBzY2hlbWUgPSBvcHRpb25zLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIHZhciBjbG91ZF9uYW1lID0gb3B0aW9ucy5jbG91ZF9uYW1lO1xuICBpZiAoIWNsb3VkX25hbWUpIHRocm93IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIG9wdGlvbnMuY2xvdWRfbmFtZScpO1xuICBcbiAgdmFyIHBhcmFtcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgVFlQRVMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmFtZSA9IFRZUEVTW2ldLm5hbWU7XG4gICAgdmFyIHByZWZpeCA9IFRZUEVTW2ldLnByZWZpeDtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnNbbmFtZV0pKSB7XG4gICAgICBvcHRpb25zW25hbWVdLmZvckVhY2goZnVuY3Rpb24ob3B0KSB7cGFyYW1zLnB1c2gocHJlZml4ICsgJ18nICsgb3B0KX0pO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMucHVzaChwcmVmaXggKyAnXycgKyBvcHRpb25zW25hbWVdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdXJsUGFyYW1zID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtcy5qb2luKCcsJykgKyAnLycgOiAnJztcbiAgcmV0dXJuIHNjaGVtZSArICc6Ly9yZXMuY2xvdWRpbmFyeS5jb20vJ1xuICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuY2xvdWRfbmFtZSlcbiAgICArICcvaW1hZ2UvdXBsb2FkLycgKyB1cmxQYXJhbXNcbiAgICArIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG59O1xuXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5hbGVydC5jb2xvci5kYW5nZXIsXHJcblx0ZXJyb3I6IHRoZW1lLmFsZXJ0LmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5hbGVydC5jb2xvci5pbmZvLFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmFsZXJ0LmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuYWxlcnQuY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4sIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbi8vIGNsb25lIGNoaWxkcmVuIGlmIGEgY2xhc3MgZXhpc3RzIGZvciB0aGUgdGFnbmFtZVxyXG5jb25zdCBjbG9uZVdpdGhDbGFzc25hbWVzID0gKGMpID0+IHtcclxuXHRjb25zdCB0eXBlID0gYy50eXBlICYmIGMudHlwZS5kaXNwbGF5TmFtZVxyXG5cdFx0PyBjLnR5cGUuZGlzcGxheU5hbWVcclxuXHRcdDogYy50eXBlIHx8IG51bGw7XHJcblxyXG5cdGlmICghdHlwZSB8fCAhY2xhc3Nlc1t0eXBlXSkgcmV0dXJuIGM7XHJcblxyXG5cdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0Y2xhc3NOYW1lOiBjc3MoY2xhc3Nlc1t0eXBlXSksXHJcblx0fSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBBbGVydCAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5hbGVydCxcclxuXHRcdGNsYXNzZXNbY29sb3JdLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHRwcm9wcy5jaGlsZHJlbiA9IENoaWxkcmVuLm1hcChjaGlsZHJlbiwgY2xvbmVXaXRoQ2xhc3NuYW1lcyk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gZGF0YS1hbGVydC10eXBlPXtjb2xvcn0gLz47XHJcbn07XHJcblxyXG5BbGVydC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKS5pc1JlcXVpcmVkLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkFsZXJ0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbGVydDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGNvbG9yc1tjb2xvcl0uYm9yZGVyLFxyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0udGV4dCxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgaGVhZGluZ3NcclxuY29uc3QgaGVhZGluZ1RhZ25hbWVzID0ge307XHJcblsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXS5mb3JFYWNoKHRhZyA9PiB7XHJcblx0aGVhZGluZ1RhZ25hbWVzW3RhZ10gPSB7IGNvbG9yOiAnaW5oZXJpdCcgfTtcclxufSk7XHJcblxyXG5jb25zdCBsaW5rU3R5bGVzID0ge1xyXG5cdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG5cclxuXHQnOmhvdmVyJzogeyBjb2xvcjogJ2luaGVyaXQnIH0sXHJcblx0Jzpmb2N1cyc6IHsgY29sb3I6ICdpbmhlcml0JyB9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWxlcnQ6IHtcclxuXHRcdGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5hbGVydC5ib3JkZXJSYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5hbGVydC5ib3JkZXJXaWR0aCxcclxuXHRcdG1hcmdpbjogdGhlbWUuYWxlcnQubWFyZ2luLFxyXG5cdFx0cGFkZGluZzogdGhlbWUuYWxlcnQucGFkZGluZyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGE6IGxpbmtTdHlsZXMsXHJcblx0TGluazogbGlua1N0eWxlcyxcclxuXHRzdHJvbmc6IHtcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHR9LFxyXG5cclxuXHQvLyBoZWFkaW5nc1xyXG5cdC4uLmhlYWRpbmdUYWduYW1lcyxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIEJsYW5rU3RhdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0aGVhZGluZyxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7ISFoZWFkaW5nICYmIDxoMiBkYXRhLWUyZS1ibGFuay1zdGF0ZS1oZWFkaW5nIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuaGVhZGluZyl9PntoZWFkaW5nfTwvaDI+fVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5cclxuQmxhbmtTdGF0ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKS5pc1JlcXVpcmVkLFxyXG5cdGhlYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkJsYW5rU3RhdGUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5ibGFua3N0YXRlLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJsYW5rc3RhdGUuYm9yZGVyUmFkaXVzLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmJsYW5rc3RhdGUuY29sb3IsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdWZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdIb3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nVmVydGljYWwsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdH0sXHJcblxyXG5cdGhlYWRpbmc6IHtcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsXHJcblxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5Cb3R0b206IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJsYW5rU3RhdGU7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jb25zdCBjb21tb25DbGFzc2VzID0gc3R5bGVzLmNvbW1vbjtcclxuY29uc3Qgc3R5bGVzaGVldENhY2hlID0ge307XHJcbmZ1bmN0aW9uIGdldFN0eWxlU2hlZXQgKHZhcmlhbnQsIGNvbG9yKSB7XHJcblx0Y29uc3QgY2FjaGVLZXkgPSBgJHt2YXJpYW50fS0ke2NvbG9yfWA7XHJcblx0aWYgKCFzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldKSB7XHJcblx0XHRjb25zdCB2YXJpYW50U3R5bGVzID0gc3R5bGVzW3ZhcmlhbnRdKGNvbG9yKTtcclxuXHRcdHN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV0gPSB2YXJpYW50U3R5bGVzO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XTtcclxufVxyXG5cclxuY29uc3QgQlVUVE9OX1NJWkVTID0gWydsYXJnZScsICdtZWRpdW0nLCAnc21hbGwnLCAneHNtYWxsJ107XHJcbmNvbnN0IEJVVFRPTl9WQVJJQU5UUyA9IFsnZmlsbCcsICdob2xsb3cnLCAnbGluayddO1xyXG5jb25zdCBCVVRUT05fQ09MT1JTID0gWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlcicsICdjYW5jZWwnLCAnZGVsZXRlJ107XHJcblxyXG4vLyBOT1RFIG11c3QgTk9UIGJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRvIGFsbG93IGByZWZzYFxyXG5cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0dmFyIHtcclxuXHRcdFx0YWN0aXZlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGJsb2NrLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbG9yLFxyXG5cdFx0XHRjb21wb25lbnQ6IFRhZyxcclxuXHRcdFx0ZGlzYWJsZWQsXHJcblx0XHRcdHNpemUsXHJcblx0XHRcdHZhcmlhbnQsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBnZXQgdGhlIHN0eWxlc1xyXG5cdFx0Y29uc3QgdmFyaWFudENsYXNzZXMgPSBnZXRTdHlsZVNoZWV0KHZhcmlhbnQsIGNvbG9yKTtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y29tbW9uQ2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRjb21tb25DbGFzc2VzW3NpemVdLFxyXG5cdFx0XHR2YXJpYW50Q2xhc3Nlcy5iYXNlLFxyXG5cdFx0XHRibG9jayA/IGNvbW1vbkNsYXNzZXMuYmxvY2sgOiBudWxsLFxyXG5cdFx0XHRkaXNhYmxlZCA/IGNvbW1vbkNsYXNzZXMuZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRhY3RpdmUgPyB2YXJpYW50Q2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHQuLi5hcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyByZXR1cm4gYW4gYW5jaG9yIG9yIGJ1dHRvblxyXG5cdFx0aWYgKCFUYWcpIHtcclxuXHRcdFx0VGFnID0gcHJvcHMuaHJlZiA/ICdhJyA6ICdidXR0b24nO1xyXG5cdFx0fVxyXG5cdFx0Ly8gRW5zdXJlIGJ1dHRvbnMgZG9uJ3Qgc3VibWl0IGJ5IGRlZmF1bHRcclxuXHRcdGlmIChUYWcgPT09ICdidXR0b24nICYmICFwcm9wcy50eXBlKSB7XHJcblx0XHRcdHByb3BzLnR5cGUgPSAnYnV0dG9uJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPFRhZyB7Li4ucHJvcHN9IC8+O1xyXG5cdH1cclxufTtcclxuXHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pKSxcclxuXHRibG9jazogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fQ09MT1JTKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fU0laRVMpLFxyXG5cdHZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihCVVRUT05fVkFSSUFOVFMpLFxyXG59O1xyXG5CdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogW10sXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxuXHR2YXJpYW50OiAnZmlsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEJ1dHRvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGdyYWRpZW50VmVydGljYWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jc3MnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5cclxuLy8gQ29tbW9uIFN0eWxlc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5leHBvcnRzLmNvbW1vbiA9IHtcclxuXHQvLyBCYXNlIEJ1dHRvblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRiYXNlOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlcldpZHRoJzogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoLFxyXG5cdFx0J2JvcmRlclN0eWxlJzogJ3NvbGlkJyxcclxuXHRcdCdib3JkZXJDb2xvcic6ICd0cmFuc3BhcmVudCcsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuYnV0dG9uLmJvcmRlclJhZGl1cyxcclxuXHRcdCdjdXJzb3InOiAncG9pbnRlcicsXHJcblx0XHQnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0J2ZvbnRXZWlnaHQnOiB0aGVtZS5idXR0b24uZm9udC53ZWlnaHQsXHJcblx0XHQnaGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsXHJcblx0XHQnbWFyZ2luQm90dG9tJzogMCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5idXR0b24ucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdCdvdXRsaW5lJzogMCxcclxuXHRcdCd0ZXh0QWxpZ24nOiAnY2VudGVyJyxcclxuXHRcdCd0b3VjaEFjdGlvbic6ICdtYW5pcHVsYXRpb24nLFxyXG5cdFx0J3VzZXJTZWxlY3QnOiAnbm9uZScsXHJcblx0XHQndmVydGljYWxBbGlnbic6ICdtaWRkbGUnLFxyXG5cdFx0J3doaXRlU3BhY2UnOiAnbm93cmFwJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uLmRlZmF1bHQudGV4dENvbG9yLFxyXG5cdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b24uZGVmYXVsdC50ZXh0Q29sb3IsXHJcblx0XHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0Ly8gQmxvY2sgRGlzcGxheVxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRibG9jazoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblx0fSxcclxuXHQvLyBEaXNhYmxlZFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0b3BhY2l0eTogMC40LFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblx0Ly8gU2l6ZXNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0bGFyZ2U6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmRlZmF1bHQsXHJcblx0fSxcclxuXHRzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHR9LFxyXG5cdHhzbWFsbDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS54c21hbGwsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS45JyxcclxuXHRcdHBhZGRpbmdMZWZ0OiAnLjY2ZW0nLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAnLjY2ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG5cclxuLy8gRmlsbCBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uRmlsbFZhcmlhbnQgKHRleHRDb2xvciwgYmdDb2xvcikge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDEwKSwgZGFya2VuKGJnQ29sb3IsIDUpKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgMTApLCBkYXJrZW4oYmdDb2xvciwgNSkpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCA1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9YCxcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUoYmdDb2xvciwgMjUpfWAsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBkYXJrZW4oYmdDb2xvciwgMTApLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDI1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9YCxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDUpLCBkYXJrZW4oYmdDb2xvciwgMTApLCBiZ0NvbG9yKSxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYCR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMjApfSAke2RhcmtlbihiZ0NvbG9yLCAyNSl9YCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHRcdFx0J2ZvbnRXZWlnaHQnOiA0MDAsXHJcblx0XHRcdCd0ZXh0U2hhZG93JzogJzAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4yNSknLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogZm9jdXNTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn1cclxuLy8gVE9ETzogVGhpcyBpcyBwcmV0dHkgaGFja3ksIG5lZWRzIHRvIGJlIGNvbnNvbGlkYXRlZCB3aXRoIHRoZSBWYXJpYW50KCkgbWV0aG9kXHJcbi8vIGFib3ZlIChuZWVkcyBtb3JlIHRoZW1lIHZhcmlhYmxlcyB0byBiZSBpbXBsZW1lbnRlZCB0aG91Z2gpXHJcbmZ1bmN0aW9uIGJ1dHRvbkZpbGxEZWZhdWx0ICgpIHtcclxuXHRjb25zdCBib3JkZXJDb2xvciA9IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0O1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZmZicsICcjZWVlJyksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJvcmRlckNvbG9yLCA1KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDUpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgMTApfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzU3R5bGVzID0ge1xyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX1gLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiAnI2U2ZTZlNicsXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxMCksXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbCgnI2ZhZmFmYScsICcjZWFlYWVhJyksXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGAke2JvcmRlckNvbG9yfSAke2Rhcmtlbihib3JkZXJDb2xvciwgNil9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCAxMil9YCxcclxuXHRcdFx0J2NvbG9yJzogdGhlbWUuY29sb3IudGV4dCxcclxuXHRcdFx0J3RleHRTaGFkb3cnOiAnMCAxcHggMCB3aGl0ZScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBmb2N1c1N0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGdyb3NzIGhhY2tcclxuXHRcdGFjdGl2ZToge1xyXG5cdFx0XHQuLi5hY3RpdmVTdHlsZXMsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRcdC4uLmFjdGl2ZVN0eWxlcyxcclxuXHRcdFx0XHQuLi5mb2N1c1N0eWxlcyxcclxuXHRcdFx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKX0sIGluc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSlgLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0fTtcclxufVxyXG5leHBvcnRzLmZpbGwgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxEZWZhdWx0KCk7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxWYXJpYW50KCd3aGl0ZScsIHRoZW1lLmJ1dHRvbi5kYW5nZXIuYmdDb2xvcik7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbFZhcmlhbnQoJ3doaXRlJywgdGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gSG9sbG93IFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25Ib2xsb3dWYXJpYW50ICh0ZXh0Q29sb3IsIGJvcmRlckNvbG9yKSB7XHJcblx0Y29uc3QgZm9jdXNBbmRIb3ZlclN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAxNSksXHJcblx0XHRib3hTaGFkb3c6ICdub25lJyxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c09ubHlTdHlsZXMgPSB7XHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKGJvcmRlckNvbG9yLCAxMCl9YCxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZShib3JkZXJDb2xvciwgMzUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMjUpLFxyXG5cdFx0Ym94U2hhZG93OiAnbm9uZScsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGJvcmRlckNvbG9yLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogZm9jdXNBbmRIb3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyAnOiBPYmplY3QuYXNzaWduKHt9LCBmb2N1c0FuZEhvdmVyU3R5bGVzLCBmb2N1c09ubHlTdHlsZXMpLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59O1xyXG5leHBvcnRzLmhvbGxvdyA9IChjb2xvcikgPT4ge1xyXG5cdC8vIFRPRE86IGJldHRlciBoYW5kbGluZyBvZiBjYW5jZWwgYW5kIGRlbGV0ZSBjb2xvcnNcclxuXHRpZiAoY29sb3IgPT09ICdjYW5jZWwnIHx8IGNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0cmV0dXJuIGJ1dHRvbkhvbGxvd1ZhcmlhbnQodGhlbWUuYnV0dG9uW2NvbG9yXS5iZ0NvbG9yLCB0aGVtZS5idXR0b25bY29sb3JdLmJvcmRlckNvbG9yKTtcclxufTtcclxuXHJcblxyXG4vLyBMaW5rIFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25MaW5rVmFyaWFudCAodGV4dENvbG9yLCBob3ZlckNvbG9yKSB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHRjb2xvcjogaG92ZXJDb2xvcixcclxuXHRcdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0XHQnYm9yZGVyJzogMCxcclxuXHRcdFx0J2JveFNoYWRvdyc6ICdub25lJyxcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cdFx0XHQnZm9udFdlaWdodCc6ICdub3JtYWwnLFxyXG5cdFx0XHQnb3V0bGluZSc6ICdub25lJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogaG92ZXJTdHlsZXMsXHJcblx0fTtcclxufTtcclxuZnVuY3Rpb24gYnV0dG9uTGlua0RlbGV0ZSAoKSB7XHJcblx0Y29uc3Qgc3R5bGVzID0gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLCBkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMCkpLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgNCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfWAsXHJcblx0XHRib3hTaGFkb3c6ICcwIDFweCAwIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDQpLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTIpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfWAsXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0Li4uc3R5bGVzLmJhc2UsXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnRzLmxpbmsgPSAoY29sb3IpID0+IHtcclxuXHRzd2l0Y2ggKGNvbG9yKSB7XHJcblx0XHRjYXNlICdkZWZhdWx0JzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmxpbmssIHRoZW1lLmNvbG9yLmxpbmtIb3Zlcik7XHJcblx0XHRjYXNlICdjYW5jZWwnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IuZ3JheTQwLCB0aGVtZS5jb2xvci5kYW5nZXIpO1xyXG5cdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtEZWxldGUoKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvcltjb2xvcl0sIHRoZW1lLmNvbG9yW2NvbG9yXSk7XHJcblx0fVxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBDZW50ZXIgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aGVpZ2h0LFxyXG5cdHN0eWxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jZW50ZXIsIGNsYXNzTmFtZSk7XHJcblx0cHJvcHMuc3R5bGUgPSB7IGhlaWdodCwgLi4uc3R5bGUgfTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuQ2VudGVyLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGhlaWdodDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuQ2VudGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdGhlaWdodDogJ2F1dG8nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDZW50ZXI7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDZW50ZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjZW50ZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGZhZGUsIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5jb25zdCBiYXNlQ29sb3JzID0ge307XHJcblsnZGFuZ2VyJywgJ2luZm8nLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRiYXNlQ29sb3JzW2NvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxMCksXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMjApLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5jb25zdCBpbnZlcnRlZENvbG9ycyA9IHt9O1xyXG5bJ2RhbmdlcicsICdpbmZvJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ10uZm9yRWFjaChjb2xvciA9PiB7XHJcblx0aW52ZXJ0ZWRDb2xvcnNbY29sb3IgKyAnX19pbnZlcnRlZCddID0ge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3JbY29sb3JdLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvcltjb2xvcl0sIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yLmdyYXkxMCxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IHRoZW1lLmNvbG9yLmdyYXkyMCxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogdGhlbWUuY29sb3IuZ3JheTE1LFxyXG5cdFx0dGV4dDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0Li4uYmFzZUNvbG9ycyxcclxuXHJcblx0Ly8gaW52ZXJ0ZWRcclxuXHRkZWZhdWx0X19pbnZlcnRlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogbGlnaHRlbih0aGVtZS5jb2xvci5ncmF5NjAsIDUpLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiBsaWdodGVuKHRoZW1lLmNvbG9yLmdyYXk2MCwgMTUpLFxyXG5cdFx0dGV4dDogJ3doaXRlJyxcclxuXHR9LFxyXG5cdC4uLmludmVydGVkQ29sb3JzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gQ2hpcCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRjb2xvcixcclxuXHRpbnZlcnRlZCxcclxuXHRsYWJlbCxcclxuXHRvbkNsZWFyLFxyXG5cdG9uQ2xpY2ssXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY2hpcCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblx0Y29uc3QgbGFiZWxDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdGNsYXNzZXMubGFiZWwsXHJcblx0XHRjbGFzc2VzWydidXR0b25fXycgKyBjb2xvciArIChpbnZlcnRlZCA/ICdfX2ludmVydGVkJyA6ICcnKV1cclxuXHQpO1xyXG5cdGNvbnN0IGNsZWFyQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRjbGFzc2VzLmNsZWFyLFxyXG5cdFx0Y2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3IgKyAoaW52ZXJ0ZWQgPyAnX19pbnZlcnRlZCcgOiAnJyldXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPXtsYWJlbENsYXNzTmFtZX0+XHJcblx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHRcdHshIW9uQ2xlYXIgJiYgKFxyXG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xlYXJ9IGNsYXNzTmFtZT17Y2xlYXJDbGFzc05hbWV9PlxyXG5cdFx0XHRcdFx0JnRpbWVzO1xyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQpfVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkNoaXAucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSkuaXNSZXF1aXJlZCxcclxuXHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRvbkNsZWFyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxufTtcclxuQ2hpcC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hpcDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGJvcmRlckxlZnRSYWRpdXMsIGJvcmRlclJpZ2h0UmFkaXVzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3NzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmRIb3ZlcixcclxuXHR9O1xyXG5cclxuXHRjb2xvclZhcmlhbnRzWydidXR0b25fXycgKyBjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZCxcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLnRleHQsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IGhvdmVyU3R5bGVzLFxyXG5cdFx0JzphY3RpdmUnOiB7XHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kQWN0aXZlLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNoaXA6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0bGluZUhlaWdodDogJzIuMmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyB0YWduYW1lc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAnbm9uZScsXHJcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRmbG9hdDogJ2xlZnQnLFxyXG5cdFx0cGFkZGluZzogJzAgLjllbScsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblxyXG5cdFx0Ly8gbWFrZSBwaWxscyAtIGV4YWdnZXJhdGUgdGhlIHBhZGRpbmcgdG93YXJkIHRoZSByYWRpaSBzbyBpdCBsb29rcyBldmVuXHJcblx0XHQnOmZpcnN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJMZWZ0UmFkaXVzKCczZW0nKSxcclxuXHRcdFx0cGFkZGluZ0xlZnQ6ICcxLjFlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHQuLi5ib3JkZXJSaWdodFJhZGl1cygnM2VtJyksXHJcblx0XHRcdHBhZGRpbmdSaWdodDogJzEuMWVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHByb3ZpZGUgc2VwYXJhdGlvbiBiZXR3ZWVuIHRoZSBsYWJlbCBhbmQgY2xlYXIgYnV0dG9uc1xyXG5cdC8vIGZsb2F0aW5nIHN0b3BzIHRoZSBtYXJnaW5zIGZyb20gY29sbGFwc2luZyBpbnRvIGVhY2hpbmdcclxuXHJcblx0bGFiZWw6IHsgbWFyZ2luUmlnaHQ6IDEgfSxcclxuXHRjbGVhcjogeyBtYXJnaW5MZWZ0OiAxIH0sXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuZnVuY3Rpb24gQ29udGFpbmVyICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNsZWFyRmxvYXRpbmdDaGlsZHJlbixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHR3aWR0aCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jb250YWluZXIsXHJcblx0XHRjbGFzc2VzW3dpZHRoXSxcclxuXHRcdGNsZWFyRmxvYXRpbmdDaGlsZHJlbiA/IGNsYXNzZXMuY2xlYXJmaXggOiBudWxsXHJcblx0KTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XHJcblx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLmlzUmVxdWlyZWQsXHJcblx0d2lkdGg6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhzaXplcykpLmlzUmVxdWlyZWQsXHJcbn07XHJcbkNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHR3aWR0aDogJ2xhcmdlJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmNvbnRhaW5lci5zaXplLnNtYWxsLFxyXG5cdG1lZGl1bTogdGhlbWUuY29udGFpbmVyLnNpemUubWVkaXVtLFxyXG5cdGxhcmdlOiB0aGVtZS5jb250YWluZXIuc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRhaW5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKHNpemVzKS5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tzaXplXSA9IHtcclxuXHRcdG1heFdpZHRoOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8qXHJcblx0TWljcm8gY2xlYXJmaXggaGFja1xyXG5cdDEuXHRUaGUgc3BhY2UgY29udGVudCBpcyBvbmUgd2F5IHRvIGF2b2lkIGFuIE9wZXJhIGJ1ZyB3aGVuIHRoZVxyXG5cdFx0XHRjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlIGlzIGluY2x1ZGVkIGFueXdoZXJlIGVsc2UgaW4gdGhlIGRvY3VtZW50LlxyXG5cdFx0XHRPdGhlcndpc2UgaXQgY2F1c2VzIHNwYWNlIHRvIGFwcGVhciBhdCB0aGUgdG9wIGFuZCBib3R0b20gb2YgZWxlbWVudHNcclxuXHRcdFx0dGhhdCBhcmUgY2xlYXJmaXhlZC5cclxuXHQyLlx0VGhlIHVzZSBvZiBgdGFibGVgIHJhdGhlciB0aGFuIGBibG9ja2AgaXMgb25seSBuZWNlc3NhcnkgaWYgdXNpbmdcclxuXHRcdFx0YDpiZWZvcmVgIHRvIGNvbnRhaW4gdGhlIHRvcC1tYXJnaW5zIG9mIGNoaWxkIGVsZW1lbnRzLlxyXG4qL1xyXG5jb25zdCBjbGVhcmZpeFN0eWxlcyA9IHtcclxuXHRjbGVhcjogJ2JvdGgnLFxyXG5cdGNvbnRlbnQ6ICdcIiBcIicsIC8vIDFcclxuXHRkaXNwbGF5OiAndGFibGUnLCAvLyAyXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdG1hcmdpbkxlZnQ6ICdhdXRvJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnYXV0bycsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUuY29udGFpbmVyLmd1dHRlcixcclxuXHR9LFxyXG5cclxuXHQvLyBjbGVhciBmbG9hdGluZyBjaGlsZHJlblxyXG5cdGNsZWFyZml4OiB7XHJcblx0XHQnOmJlZm9yZSc6IGNsZWFyZml4U3R5bGVzLFxyXG5cdFx0JzphZnRlcic6IGNsZWFyZml4U3R5bGVzLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcblxyXG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbiAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdyl9IC8+XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gTk9URVxyXG4vLyAxOiB0YWtlIGFkdmFudGFnZSBvZiBgY3VycmVudENvbG9yYCBieSBsZWF2aW5nIGJvcmRlciB0b3AgY29sb3IgdW5kZWZpbmVkXHJcbi8vIDI6IGV2ZW4gdGhvdWdoIHRoZSBhcnJvdyBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkLCB2aXN1YWxseSBpdCBhcHBlYXJzIHRvbyBsb3dcclxuLy8gICAgYmVjYXVzZSBvZiBsb3dlcmNhc2UgY2hhcmFjdGVycyBiZXNpZGUgaXRcclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyVG9wOiAnMC4zZW0gc29saWQnLCAvLyAxXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogMCxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gMlxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogMCxcclxuXHJcblx0XHQvLyBhZGQgc3BhY2luZ1xyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0XHR9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5MZWZ0OiAnMC41ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bkJ1dHRvbjtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgRm9ybUxhYmVsIGZyb20gJy4uL0Zvcm1MYWJlbCc7XHJcblxyXG5jbGFzcyBGb3JtRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmZvcm1GaWVsZElkID0gZ2VuZXJhdGVJZCgpO1xyXG5cdH1cclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUZpZWxkSWQ6IHRoaXMuZm9ybUZpZWxkSWQsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmb3JtTGF5b3V0ID0gJ2Jhc2ljJywgbGFiZWxXaWR0aCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGNoaWxkcmVuLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNyb3BMYWJlbCxcclxuXHRcdFx0aHRtbEZvcixcclxuXHRcdFx0bGFiZWwsXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm1GaWVsZCxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybUZpZWxkLS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0sXHJcblx0XHRcdG9mZnNldEFic2VudExhYmVsID8gY2xhc3Nlc1snRm9ybUZpZWxkLS1vZmZzZXQtYWJzZW50LWxhYmVsJ10gOiBudWxsLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdGlmIChvZmZzZXRBYnNlbnRMYWJlbCAmJiBsYWJlbFdpZHRoKSB7XHJcblx0XHRcdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0XHRcdHBhZGRpbmdMZWZ0OiBsYWJlbFdpZHRoLFxyXG5cdFx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGVsZW1lbnRzXHJcblx0XHRjb25zdCBjb21wb25lbnRMYWJlbCA9IGxhYmVsID8gKFxyXG5cdFx0XHQ8Rm9ybUxhYmVsIGh0bWxGb3I9e2h0bWxGb3J9IGNyb3BUZXh0PXtjcm9wTGFiZWx9PlxyXG5cdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0PC9Gb3JtTGFiZWw+XHJcblx0XHQpIDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHsuLi5wcm9wc30gaHRtbEZvcj17aHRtbEZvcn0+XHJcblx0XHRcdFx0e2NvbXBvbmVudExhYmVsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUZpZWxkLmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtRmllbGQuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1GaWVsZC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcblx0Y3JvcExhYmVsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRodG1sRm9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG9mZnNldEFic2VudExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlSWQgKCkge1xyXG5cdHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1GaWVsZDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gRmllbGRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1GaWVsZCc6IHtcclxuXHRcdG1hcmdpbkJvdHRvbTogJzFlbScsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhIGhvcml6b250YWwgZm9ybVxyXG5cclxuXHQnRm9ybUZpZWxkLS1mb3JtLWxheW91dC1ob3Jpem9udGFsJzoge1xyXG5cdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0ZGlzcGxheTogJ3RhYmxlJyxcclxuXHRcdFx0dGFibGVMYXlvdXQ6ICdmaXhlZCcsXHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIGluc2lkZSBob3Jpem9udGFsIGZvcm1cclxuXHQvLyB0eXBpY2FsbHkgZm9yIHVzZSB3aXRoIHN1Ym1pdCBidXR0b24gaW5zaWRlXHJcblx0J0Zvcm1GaWVsZC0tb2Zmc2V0LWFic2VudC1sYWJlbCc6IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5mb3JtLmxhYmVsLndpZHRoLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGFuIGlubGluZSBmb3JtXHJcblxyXG5cdCdGb3JtRmllbGQtLWZvcm0tbGF5b3V0LWlubGluZSc6IHtcclxuXHRcdCdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcblx0XHQncGFkZGluZ0xlZnQnOiAnMC4yNWVtJyxcclxuXHRcdCdwYWRkaW5nUmlnaHQnOiAnMC4yNWVtJyxcclxuXHRcdCd2ZXJ0aWNhbEFsaWduJzogJ3RvcCcsXHJcblxyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHsgcGFkZGluZ0xlZnQ6IDAgfSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHsgcGFkZGluZ1JpZ2h0OiAwIH0sXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb25jYXRDbGFzc25hbWVzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmNhdENsYXNzbmFtZXMnO1xyXG5pbXBvcnQgSW5wdXROb2VkaXQgZnJvbSAnLi9ub2VkaXQnO1xyXG5cclxuLy8gTk9URSBtdXN0IE5PVCBiZSBmdW5jdGlvbmFsIGNvbXBvbmVudCB0byBhbGxvdyBgcmVmc2BcclxuXHJcbmNsYXNzIEZvcm1JbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Ymx1ciAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5ibHVyKCk7XHJcblx0fVxyXG5cdGZvY3VzICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmZvY3VzKCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRkaXNhYmxlZCxcclxuXHRcdFx0aWQsXHJcblx0XHRcdG11bHRpbGluZSxcclxuXHRcdFx0bm9lZGl0LFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gTk9URSByZXR1cm4gYSBkaWZmZXJlbnQgY29tcG9uZW50IGZvciBgbm9lZGl0YFxyXG5cdFx0aWYgKG5vZWRpdCkgcmV0dXJuIDxJbnB1dE5vZWRpdCB7Li4udGhpcy5wcm9wc30gLz47XHJcblxyXG5cdFx0Y29uc3QgeyBmb3JtRmllbGRJZCwgZm9ybUxheW91dCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdHByb3BzLmlkID0gaWQgfHwgZm9ybUZpZWxkSWQ7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybUlucHV0LFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtSW5wdXRfX3NpemUtLScgKyBzaXplXSxcclxuXHRcdFx0ZGlzYWJsZWQgPyBjbGFzc2VzWydGb3JtSW5wdXQtLWRpc2FibGVkJ10gOiBudWxsLFxyXG5cdFx0XHRmb3JtTGF5b3V0ID8gY2xhc3Nlc1snRm9ybUlucHV0LS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0gOiBudWxsLFxyXG5cdFx0XHQuLi5jb25jYXRDbGFzc25hbWVzKGFwaHJvZGl0ZVN0eWxlcylcclxuXHRcdCk7XHJcblx0XHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzZXRSZWYgPSAobikgPT4gKHRoaXMudGFyZ2V0ID0gbik7XHJcblx0XHRjb25zdCBUYWcgPSBtdWx0aWxpbmUgPyAndGV4dGFyZWEnIDogJ2lucHV0JztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8VGFnXHJcblx0XHRcdFx0cmVmPXtzZXRSZWZ9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtSW5wdXQucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0bXVsdGlsaW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ3NtYWxsJywgJ2xhcmdlJ10pLFxyXG5cdHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ2RlZmF1bHQnLFxyXG5cdHR5cGU6ICd0ZXh0JyxcclxufTtcclxuRm9ybUlucHV0LmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUlucHV0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmZ1bmN0aW9uIEZvcm1JbnB1dE5vZWRpdCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRtdWx0aWxpbmUsXHJcblx0bm9lZGl0LCAvLyBOT1RFIG5vdCB1c2VkLCBqdXN0IHJlbW92ZWQgZnJvbSBwcm9wc1xyXG5cdHR5cGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMubm9lZGl0LFxyXG5cdFx0Y3JvcFRleHQgPyBjbGFzc2VzLmNyb3BUZXh0IDogbnVsbCxcclxuXHRcdG11bHRpbGluZSA/IGNsYXNzZXMubXVsdGlsaW5lIDogbnVsbCxcclxuXHRcdChwcm9wcy5ocmVmIHx8IHByb3BzLm9uQ2xpY2spID8gY2xhc3Nlcy5hbmNob3IgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkZvcm1JbnB1dE5vZWRpdC5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkZvcm1JbnB1dE5vZWRpdC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnc3BhbicsXHJcbn07XHJcblxyXG5jb25zdCBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzID0ge1xyXG5cdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0Ym9yZGVyQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxuXHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdG5vZWRpdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLm5vZWRpdCxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ub2VkaXQsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTgwLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cclxuXHRcdC8vIHByZXZlbnQgZW1wdHkgaW5wdXRzIGZyb20gY29sbGFwc2luZyBieSBhZGRpbmcgY29udGVudFxyXG5cdFx0JzplbXB0eTpiZWZvcmUnOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRcdGNvbnRlbnQ6ICdcIihubyB2YWx1ZSlcIicsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdG11bHRpbGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0bGluZUhlaWdodDogJzEuNCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiAnMC42ZW0nLFxyXG5cdFx0cGFkZGluZ1RvcDogJzAuNmVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBpbmRpY2F0ZSBjbGlja2FiaWxpdHkgd2hlbiB1c2luZyBhbiBhbmNob3JcclxuXHRhbmNob3I6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCA1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5saW5rLFxyXG5cdFx0bWFyZ2luUmlnaHQ6IDUsXHJcblx0XHRtaW5XaWR0aDogMCxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtSW5wdXROb2VkaXQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIElucHV0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtSW5wdXQnOiB7XHJcblx0XHQnYXBwZWFyYW5jZSc6ICdub25lJyxcclxuXHRcdCdiYWNrZ3JvdW5kQ29sb3InOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHQnYmFja2dyb3VuZEltYWdlJzogJ25vbmUnLFxyXG5cdFx0J2JvcmRlckNvbG9yJzogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHQnYm9yZGVyUmFkaXVzJzogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdCdib3JkZXJTdHlsZSc6ICdzb2xpZCcsXHJcblx0XHQnYm9yZGVyV2lkdGgnOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHQnYm94U2hhZG93JzogdGhlbWUuaW5wdXQuYm94U2hhZG93LFxyXG5cdFx0J2NvbG9yJzogJ2luaGVyaXQnLCAvLyBGSVhNRVxyXG5cdFx0J2Rpc3BsYXknOiAnYmxvY2snLFxyXG5cdFx0J2hlaWdodCc6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdCdsaW5lSGVpZ2h0JzogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdCdwYWRkaW5nJzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0J3RyYW5zaXRpb24nOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdCd3aWR0aCc6ICcxMDAlJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmhvdmVyLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0J0Zvcm1JbnB1dC0tZGlzYWJsZWQnOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGlzYWJsZWQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc2l6ZXNcclxuXHQnRm9ybUlucHV0X19zaXplLS1zbWFsbCc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0fSxcclxuXHQnRm9ybUlucHV0X19zaXplLS1sYXJnZSc6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUubGFyZ2UsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybUxhYmVsICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjcm9wVGV4dCxcclxuXHRodG1sRm9yLFxyXG5cdC4uLnByb3BzXHJcbn0sXHJcbntcclxuXHRmb3JtRmllbGRJZCxcclxuXHRmb3JtTGF5b3V0LFxyXG5cdGxhYmVsV2lkdGgsXHJcbn0pIHtcclxuXHRwcm9wcy5odG1sRm9yID0gaHRtbEZvciB8fCBmb3JtRmllbGRJZDtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLkZvcm1MYWJlbCxcclxuXHRcdGZvcm1MYXlvdXQgPyBjbGFzc2VzWydGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSA6IG51bGwsXHJcblx0XHRjcm9wVGV4dCA/IGNsYXNzZXNbJ0Zvcm1MYWJlbC0tY3JvcC10ZXh0J10gOiBudWxsLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cdGlmIChsYWJlbFdpZHRoKSB7XHJcblx0XHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdFx0d2lkdGg6IGxhYmVsV2lkdGgsXHJcblx0XHRcdC4uLnByb3BzLnN0eWxlLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1MYWJlbC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuRm9ybUxhYmVsLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdsYWJlbCcsXHJcbn07XHJcbkZvcm1MYWJlbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUxhYmVsO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBMYWJlbFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUxhYmVsJzoge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubGFiZWwuY29sb3IsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9ybS5sYWJlbC5mb250U2l6ZSxcclxuXHRcdGZvbnRXZWlnaHQ6IHRoZW1lLmZvcm0ubGFiZWwuZm9udFdlaWdodCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMC41ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGEgaG9yaXpvbnRhbCBmb3JtXHJcblxyXG5cdCdGb3JtTGFiZWwtLWZvcm0tbGF5b3V0LWhvcml6b250YWwnOiB7XHJcblx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRkaXNwbGF5OiAndGFibGUtY2VsbCcsXHJcblx0XHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LCAvLyBmaXhcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAwLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IDUsXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICd0b3AnLFxyXG5cdFx0XHR3aWR0aDogdGhlbWUuZm9ybS5sYWJlbC53aWR0aCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gY3JvcCBsb25nIHRleHRcclxuXHJcblx0J0Zvcm1MYWJlbC0tY3JvcC10ZXh0Jzoge1xyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gRm9ybU5vdGUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0aHRtbCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMubm90ZSwgY2xhc3NOYW1lKTtcclxuXHJcblx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0aWYgKGNoaWxkcmVuICYmIGh0bWwpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IEZvcm1Ob3RlIGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYGh0bWxgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gaHRtbCA/IChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGh0bWwgfX0gLz5cclxuXHQpIDogKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L0NvbXBvbmVudD5cclxuXHQpO1xyXG59O1xyXG5Gb3JtTm90ZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRodG1sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtTm90ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybU5vdGU7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIE5vdGVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmZvcm0ubm90ZS5jb2xvcixcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb3JtLm5vdGUuZm9udFNpemUsXHJcblx0XHRtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcuc21hbGwsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY2xhc3MgRm9ybVNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGlkLCBvcHRpb25zLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgZm9ybUZpZWxkSWQgfSA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuc2VsZWN0LFxyXG5cdFx0XHRwcm9wcy5kaXNhYmxlZCA/IGNsYXNzZXNbJ3NlbGVjdC0tZGlzYWJsZWQnXSA6IG51bGxcclxuXHRcdCk7XHJcblx0XHRwcm9wcy5pZCA9IGlkIHx8IGZvcm1GaWVsZElkO1xyXG5cclxuXHRcdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdFx0aWYgKG9wdGlvbnMgJiYgY2hpbGRyZW4pIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogRm9ybVNlbGVjdCBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGBvcHRpb25zYC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfT5cclxuXHRcdFx0XHR7b3B0aW9ucyA/IChcclxuXHRcdFx0XHRcdDxzZWxlY3Qgey4uLnByb3BzfT57b3B0aW9ucy5tYXAob3B0ID0+IChcclxuXHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e29wdC52YWx1ZX0gdmFsdWU9e29wdC52YWx1ZX0+XHJcblx0XHRcdFx0XHRcdFx0e29wdC5sYWJlbH1cclxuXHRcdFx0XHRcdFx0PC9vcHRpb24+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdCkgOiA8c2VsZWN0IHsuLi5wcm9wc30+e2NoaWxkcmVufTwvc2VsZWN0Pn1cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93cywgcHJvcHMuZGlzYWJsZWQgPyBjbGFzc2VzWydhcnJvd3MtLWRpc2FibGVkJ10gOiBudWxsKX0+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93LCBjbGFzc2VzLmFycm93VG9wKX0gLz5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3csIGNsYXNzZXMuYXJyb3dCb3R0b20pfSAvPlxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkZvcm1TZWxlY3QuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtU2VsZWN0LnByb3BUeXBlcyA9IHtcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdH0pXHJcblx0KSxcclxuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVNlbGVjdDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gU2VsZWN0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZGFya2VuLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzZWxlY3Qgbm9kZVxyXG5cdHNlbGVjdDoge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRlZmF1bHQsXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdGJvcmRlckJvdHRvbUNvbG9yOiBkYXJrZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyVG9wQ29sb3I6IGxpZ2h0ZW4odGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsIDQpLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0Ym94U2hhZG93OiB0aGVtZS5zZWxlY3QuYm94U2hhZG93LFxyXG5cdFx0Y29sb3I6ICdpbmhlcml0JywgLy8gRklYTUVcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHRwYWRkaW5nOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHR0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IDAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IDAuMTVzJyxcclxuXHRcdHdpZHRoOiAnMTAwJScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ob3ZlcixcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCdzZWxlY3QtLWRpc2FibGVkJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRpc2FibGVkLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGFycm93c1xyXG5cdGFycm93czoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRyaWdodDogMCxcclxuXHRcdHRvcDogMCxcclxuXHRcdHdpZHRoOiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0fSxcclxuXHRhcnJvdzoge1xyXG5cdFx0Ym9yZGVyTGVmdDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJpZ2h0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IDAsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0ekluZGV4OiAxLFxyXG5cdH0sXHJcblx0YXJyb3dUb3A6IHtcclxuXHRcdGJvcmRlckJvdHRvbTogJzAuM2VtIHNvbGlkJyxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzAuMWVtJyxcclxuXHR9LFxyXG5cdGFycm93Qm90dG9tOiB7XHJcblx0XHRib3JkZXJUb3A6ICcwLjNlbSBzb2xpZCcsXHJcblx0XHRtYXJnaW5Ub3A6ICcwLjFlbScsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Zm9ybUxheW91dDogdGhpcy5wcm9wcy5sYXlvdXQsXHJcblx0XHRcdGxhYmVsV2lkdGg6IHRoaXMucHJvcHMubGFiZWxXaWR0aCxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHQvLyBOT1RFIGBsYWJlbFdpZHRoYCBpcyBkZWNsYXJlZCB0byByZW1vdmUgaXQgZnJvbSBgcHJvcHNgLCB0aG91Z2ggbmV2ZXIgdXNlZFxyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRsYWJlbFdpZHRoLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcblx0XHRcdGxheW91dCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtLFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtX18nICsgbGF5b3V0XSxcclxuXHRcdFx0Y2xhc3NOYW1lXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcblx0fVxyXG59O1xyXG5cclxuRm9ybS5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5Gb3JtLnByb3BUeXBlcyA9IHtcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcbn07XHJcbkZvcm0uZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2Zvcm0nLFxyXG5cdGxheW91dDogJ2Jhc2ljJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm1cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRGb3JtOiB7fSxcclxufTtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgR2x5cGggZnJvbSAnLi4vR2x5cGgnO1xyXG5cclxuZnVuY3Rpb24gR2x5cGhCdXR0b24gKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRnbHlwaFN0eWxlLFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBpc0RlZmF1bHQgPSBwb3NpdGlvbiA9PT0gJ2RlZmF1bHQnO1xyXG5cdGNvbnN0IGlzTGVmdCA9IHBvc2l0aW9uID09PSAnbGVmdCc7XHJcblx0Y29uc3QgaXNSaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnO1xyXG5cclxuXHRjb25zdCBvZmZzZXQgPSB7fTtcclxuXHRpZiAoaXNMZWZ0KSBvZmZzZXQubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBvZmZzZXQubWFyZ2luTGVmdCA9ICcwLjVlbSc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge1xyXG5cdFx0Li4ub2Zmc2V0LFxyXG5cdFx0Li4uZ2x5cGhTdHlsZSxcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpY29uID0gKFxyXG5cdFx0PEdseXBoXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5nbHlwaH1cclxuXHRcdFx0Y29sb3I9e2dseXBoQ29sb3J9XHJcblx0XHRcdG5hbWU9e2dseXBofVxyXG5cdFx0XHRzaXplPXtnbHlwaFNpemV9XHJcblx0XHRcdHN0eWxlPXtnbHlwaFN0eWxlc31cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0eyhpc0RlZmF1bHQgfHwgaXNMZWZ0KSAmJiBpY29ufVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdHtpc1JpZ2h0ICYmIGljb259XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRnbHlwaDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ2xlZnQnLCAncmlnaHQnXSksXHJcbn07XHJcbkdseXBoQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRnbHlwaFN0eWxlOiB7fSxcclxuXHRwb3NpdGlvbjogJ2RlZmF1bHQnLCAvLyBubyBtYXJnaW4sIGFzc3VtZXMgbm8gY2hpbGRyZW5cclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z2x5cGg6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyBmaXggaWNvbiBhbGlnbm1lbnRcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoQnV0dG9uO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRm9ybUZpZWxkJztcclxuaW1wb3J0IEdseXBoIGZyb20gJy4uL0dseXBoJztcclxuXHJcbmZ1bmN0aW9uIEdseXBoRmllbGQgKHtcclxuXHRjaGlsZHJlbixcclxuXHRnbHlwaCxcclxuXHRnbHlwaENvbG9yLFxyXG5cdGdseXBoU2l6ZSxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgaXNMZWZ0ID0gcG9zaXRpb24gPT09ICdsZWZ0JztcclxuXHRjb25zdCBpc1JpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCc7XHJcblxyXG5cdGNvbnN0IGdseXBoU3R5bGVzID0ge307XHJcblx0aWYgKGlzTGVmdCkgZ2x5cGhTdHlsZXMubWFyZ2luUmlnaHQgPSAnMC41ZW0nO1xyXG5cdGlmIChpc1JpZ2h0KSBnbHlwaFN0eWxlcy5tYXJnaW5MZWZ0ID0gJzAuNWVtJztcclxuXHJcblx0Y29uc3QgaWNvbiA9IChcclxuXHRcdDxHbHlwaFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuZ2x5cGh9XHJcblx0XHRcdGNvbG9yPXtnbHlwaENvbG9yfVxyXG5cdFx0XHRuYW1lPXtnbHlwaH1cclxuXHRcdFx0c2l6ZT17Z2x5cGhTaXplfVxyXG5cdFx0XHRzdHlsZT17Z2x5cGhTdHlsZXN9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8RmllbGQgYXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLndyYXBwZXJ9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtpc0xlZnQgJiYgaWNvbn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHR7aXNSaWdodCAmJiBpY29ufVxyXG5cdFx0PC9GaWVsZD5cclxuXHQpO1xyXG59O1xyXG5cclxuLy8gRm9yIHByb3BzIFwiZ2x5cGhcIiwgXCJnbHlwaENvbG9yXCIsIGFuZCBcImdseXBoU2l6ZVwiOlxyXG4vLyBwcm9wIHR5cGUgdmFsaWRhdGlvbiB3aWxsIG9jY3VyIHdpdGhpbiB0aGUgR2x5cGggY29tcG9uZW50LCBubyBuZWVkIHRvXHJcbi8vIGR1cGxpY2F0ZSwganVzdCBwYXNzIGl0IHRocm91Z2guXHJcbkdseXBoRmllbGQucHJvcFR5cGVzID0ge1xyXG5cdGdseXBoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxyXG59O1xyXG5HbHlwaEZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRwb3NpdGlvbjogJ2xlZnQnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHR9LFxyXG5cdGdseXBoOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gZml4IGljb24gYWxpZ25tZW50XHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaEZpZWxkO1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5nbHlwaC5jb2xvci5kYW5nZXIsXHJcblx0aW5oZXJpdDogdGhlbWUuZ2x5cGguY29sb3IuaW5oZXJpdCxcclxuXHRpbnZlcnRlZDogdGhlbWUuZ2x5cGguY29sb3IuaW52ZXJ0ZWQsXHJcblx0cHJpbWFyeTogdGhlbWUuZ2x5cGguY29sb3IucHJpbWFyeSxcclxuXHRzdWNjZXNzOiB0aGVtZS5nbHlwaC5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmdseXBoLmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgb2N0aWNvbnMgZnJvbSAnLi9vY3RpY29ucyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbi8vIEZJWE1FIHN0YXRpYyBvY3RpY29uIGNsYXNzZXMgbGVhbmluZyBvbiBFbGVtZW50YWwgdG8gYXZvaWQgZHVwbGljYXRlXHJcbi8vIGZvbnQgYW5kIENTUzsgaW5mbGF0aW5nIHRoZSBwcm9qZWN0IHNpemVcclxuXHJcbmZ1bmN0aW9uIEdseXBoICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRuYW1lLFxyXG5cdHNpemUsXHJcblx0c3R5bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGNvbG9ySXNWYWxpZFR5cGUgPSBPYmplY3Qua2V5cyhjb2xvcnMpLmluY2x1ZGVzKGNvbG9yKTtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdseXBoLFxyXG5cdFx0Y29sb3JJc1ZhbGlkVHlwZSAmJiBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSxcclxuXHRcdGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCkgKyBgICR7b2N0aWNvbnNbbmFtZV19YDtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBzdXBwb3J0IHJhbmRvbSBjb2xvciBzdHJpbmdzXHJcblx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRjb2xvcjogIWNvbG9ySXNWYWxpZFR5cGUgPyBjb2xvciA6IG51bGwsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuR2x5cGgucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZywgLy8gc3VwcG9ydCByYW5kb20gY29sb3Igc3RyaW5nc1xyXG5cdF0pLFxyXG5cdG5hbWU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhvY3RpY29ucykpLmlzUmVxdWlyZWQsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKHNpemVzKSksXHJcbn07XHJcbkdseXBoLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdpJyxcclxuXHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdHNpemU6ICdzbWFsbCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoO1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhbGVydDogJ29jdGljb24gb2N0aWNvbi1hbGVydCcsXHJcblx0J2Fycm93LWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LWRvd24nLFxyXG5cdCdhcnJvdy1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1sZWZ0JyxcclxuXHQnYXJyb3ctcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXJpZ2h0JyxcclxuXHQnYXJyb3ctc21hbGwtZG93bic6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtZG93bicsXHJcblx0J2Fycm93LXNtYWxsLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLWxlZnQnLFxyXG5cdCdhcnJvdy1zbWFsbC1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtcmlnaHQnLFxyXG5cdCdhcnJvdy1zbWFsbC11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtdXAnLFxyXG5cdCdhcnJvdy11cCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctdXAnLFxyXG5cdG1pY3Jvc2NvcGU6ICdvY3RpY29uIG9jdGljb24tbWljcm9zY29wZScsXHJcblx0YmVha2VyOiAnb2N0aWNvbiBvY3RpY29uLWJlYWtlcicsXHJcblx0YmVsbDogJ29jdGljb24gb2N0aWNvbi1iZWxsJyxcclxuXHRib29rOiAnb2N0aWNvbiBvY3RpY29uLWJvb2snLFxyXG5cdGJvb2ttYXJrOiAnb2N0aWNvbiBvY3RpY29uLWJvb2ttYXJrJyxcclxuXHRicmllZmNhc2U6ICdvY3RpY29uIG9jdGljb24tYnJpZWZjYXNlJyxcclxuXHRicm9hZGNhc3Q6ICdvY3RpY29uIG9jdGljb24tYnJvYWRjYXN0JyxcclxuXHRicm93c2VyOiAnb2N0aWNvbiBvY3RpY29uLWJyb3dzZXInLFxyXG5cdGJ1ZzogJ29jdGljb24gb2N0aWNvbi1idWcnLFxyXG5cdGNhbGVuZGFyOiAnb2N0aWNvbiBvY3RpY29uLWNhbGVuZGFyJyxcclxuXHRjaGVjazogJ29jdGljb24gb2N0aWNvbi1jaGVjaycsXHJcblx0Y2hlY2tsaXN0OiAnb2N0aWNvbiBvY3RpY29uLWNoZWNrbGlzdCcsXHJcblx0J2NoZXZyb24tZG93bic6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1kb3duJyxcclxuXHQnY2hldnJvbi1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLWxlZnQnLFxyXG5cdCdjaGV2cm9uLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLXJpZ2h0JyxcclxuXHQnY2hldnJvbi11cCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi11cCcsXHJcblx0J2NpcmNsZS1zbGFzaCc6ICdvY3RpY29uIG9jdGljb24tY2lyY2xlLXNsYXNoJyxcclxuXHQnY2lyY3VpdC1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tY2lyY3VpdC1ib2FyZCcsXHJcblx0Y2xpcHB5OiAnb2N0aWNvbiBvY3RpY29uLWNsaXBweScsXHJcblx0Y2xvY2s6ICdvY3RpY29uIG9jdGljb24tY2xvY2snLFxyXG5cdCdjbG91ZC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tY2xvdWQtZG93bmxvYWQnLFxyXG5cdCdjbG91ZC11cGxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWNsb3VkLXVwbG9hZCcsXHJcblx0Y29kZTogJ29jdGljb24gb2N0aWNvbi1jb2RlJyxcclxuXHQnY29sb3ItbW9kZSc6ICdvY3RpY29uIG9jdGljb24tY29sb3ItbW9kZScsXHJcblx0J2NvbW1lbnQtYWRkJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWFkZCcsXHJcblx0Y29tbWVudDogJ29jdGljb24gb2N0aWNvbi1jb21tZW50JyxcclxuXHQnY29tbWVudC1kaXNjdXNzaW9uJzogJ29jdGljb24gb2N0aWNvbi1jb21tZW50LWRpc2N1c3Npb24nLFxyXG5cdCdjcmVkaXQtY2FyZCc6ICdvY3RpY29uIG9jdGljb24tY3JlZGl0LWNhcmQnLFxyXG5cdGRhc2g6ICdvY3RpY29uIG9jdGljb24tZGFzaCcsXHJcblx0ZGFzaGJvYXJkOiAnb2N0aWNvbiBvY3RpY29uLWRhc2hib2FyZCcsXHJcblx0ZGF0YWJhc2U6ICdvY3RpY29uIG9jdGljb24tZGF0YWJhc2UnLFxyXG5cdGNsb25lOiAnb2N0aWNvbiBvY3RpY29uLWNsb25lJyxcclxuXHQnZGVza3RvcC1kb3dubG9hZCc6ICdvY3RpY29uIG9jdGljb24tZGVza3RvcC1kb3dubG9hZCcsXHJcblx0J2RldmljZS1jYW1lcmEnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1jYW1lcmEnLFxyXG5cdCdkZXZpY2UtY2FtZXJhLXZpZGVvJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtY2FtZXJhLXZpZGVvJyxcclxuXHQnZGV2aWNlLWRlc2t0b3AnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1kZXNrdG9wJyxcclxuXHQnZGV2aWNlLW1vYmlsZSc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLW1vYmlsZScsXHJcblx0ZGlmZjogJ29jdGljb24gb2N0aWNvbi1kaWZmJyxcclxuXHQnZGlmZi1hZGRlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1hZGRlZCcsXHJcblx0J2RpZmYtaWdub3JlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1pZ25vcmVkJyxcclxuXHQnZGlmZi1tb2RpZmllZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1tb2RpZmllZCcsXHJcblx0J2RpZmYtcmVtb3ZlZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1yZW1vdmVkJyxcclxuXHQnZGlmZi1yZW5hbWVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLXJlbmFtZWQnLFxyXG5cdGVsbGlwc2lzOiAnb2N0aWNvbiBvY3RpY29uLWVsbGlwc2lzJyxcclxuXHQnZXllLXVud2F0Y2gnOiAnb2N0aWNvbiBvY3RpY29uLWV5ZS11bndhdGNoJyxcclxuXHQnZXllLXdhdGNoJzogJ29jdGljb24gb2N0aWNvbi1leWUtd2F0Y2gnLFxyXG5cdGV5ZTogJ29jdGljb24gb2N0aWNvbi1leWUnLFxyXG5cdCdmaWxlLWJpbmFyeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1iaW5hcnknLFxyXG5cdCdmaWxlLWNvZGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtY29kZScsXHJcblx0J2ZpbGUtZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLWRpcmVjdG9yeScsXHJcblx0J2ZpbGUtbWVkaWEnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtbWVkaWEnLFxyXG5cdCdmaWxlLXBkZic6ICdvY3RpY29uIG9jdGljb24tZmlsZS1wZGYnLFxyXG5cdCdmaWxlLXN1Ym1vZHVsZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zdWJtb2R1bGUnLFxyXG5cdCdmaWxlLXN5bWxpbmstZGlyZWN0b3J5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN5bWxpbmstZGlyZWN0b3J5JyxcclxuXHQnZmlsZS1zeW1saW5rLWZpbGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3ltbGluay1maWxlJyxcclxuXHQnZmlsZS10ZXh0JzogJ29jdGljb24gb2N0aWNvbi1maWxlLXRleHQnLFxyXG5cdCdmaWxlLXppcCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS16aXAnLFxyXG5cdGZsYW1lOiAnb2N0aWNvbiBvY3RpY29uLWZsYW1lJyxcclxuXHRmb2xkOiAnb2N0aWNvbiBvY3RpY29uLWZvbGQnLFxyXG5cdGdlYXI6ICdvY3RpY29uIG9jdGljb24tZ2VhcicsXHJcblx0Z2lmdDogJ29jdGljb24gb2N0aWNvbi1naWZ0JyxcclxuXHRnaXN0OiAnb2N0aWNvbiBvY3RpY29uLWdpc3QnLFxyXG5cdCdnaXN0LXNlY3JldCc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1zZWNyZXQnLFxyXG5cdCdnaXQtYnJhbmNoLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1jcmVhdGUnLFxyXG5cdCdnaXQtYnJhbmNoLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaC1kZWxldGUnLFxyXG5cdCdnaXQtYnJhbmNoJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoJyxcclxuXHQnZ2l0LWNvbW1pdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWNvbW1pdCcsXHJcblx0J2dpdC1jb21wYXJlJzogJ29jdGljb24gb2N0aWNvbi1naXQtY29tcGFyZScsXHJcblx0J2dpdC1tZXJnZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LW1lcmdlJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdC1hYmFuZG9uZWQnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1wdWxsLXJlcXVlc3QtYWJhbmRvbmVkJyxcclxuXHQnZ2l0LXB1bGwtcmVxdWVzdCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LXB1bGwtcmVxdWVzdCcsXHJcblx0Z2xvYmU6ICdvY3RpY29uIG9jdGljb24tZ2xvYmUnLFxyXG5cdGdyYXBoOiAnb2N0aWNvbiBvY3RpY29uLWdyYXBoJyxcclxuXHRoZWFydDogJ29jdGljb24gb2N0aWNvbi1oZWFydCcsXHJcblx0aGlzdG9yeTogJ29jdGljb24gb2N0aWNvbi1oaXN0b3J5JyxcclxuXHRob21lOiAnb2N0aWNvbiBvY3RpY29uLWhvbWUnLFxyXG5cdCdob3Jpem9udGFsLXJ1bGUnOiAnb2N0aWNvbiBvY3RpY29uLWhvcml6b250YWwtcnVsZScsXHJcblx0aHVib3Q6ICdvY3RpY29uIG9jdGljb24taHVib3QnLFxyXG5cdGluYm94OiAnb2N0aWNvbiBvY3RpY29uLWluYm94JyxcclxuXHRpbmZvOiAnb2N0aWNvbiBvY3RpY29uLWluZm8nLFxyXG5cdCdpc3N1ZS1jbG9zZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLWNsb3NlZCcsXHJcblx0J2lzc3VlLW9wZW5lZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtb3BlbmVkJyxcclxuXHQnaXNzdWUtcmVvcGVuZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLXJlb3BlbmVkJyxcclxuXHRqZXJzZXk6ICdvY3RpY29uIG9jdGljb24tamVyc2V5JyxcclxuXHRrZXk6ICdvY3RpY29uIG9jdGljb24ta2V5JyxcclxuXHRrZXlib2FyZDogJ29jdGljb24gb2N0aWNvbi1rZXlib2FyZCcsXHJcblx0bGF3OiAnb2N0aWNvbiBvY3RpY29uLWxhdycsXHJcblx0J2xpZ2h0LWJ1bGInOiAnb2N0aWNvbiBvY3RpY29uLWxpZ2h0LWJ1bGInLFxyXG5cdGxpbms6ICdvY3RpY29uIG9jdGljb24tbGluaycsXHJcblx0J2xpbmstZXh0ZXJuYWwnOiAnb2N0aWNvbiBvY3RpY29uLWxpbmstZXh0ZXJuYWwnLFxyXG5cdCdsaXN0LW9yZGVyZWQnOiAnb2N0aWNvbiBvY3RpY29uLWxpc3Qtb3JkZXJlZCcsXHJcblx0J2xpc3QtdW5vcmRlcmVkJzogJ29jdGljb24gb2N0aWNvbi1saXN0LXVub3JkZXJlZCcsXHJcblx0bG9jYXRpb246ICdvY3RpY29uIG9jdGljb24tbG9jYXRpb24nLFxyXG5cdCdnaXN0LXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtcHJpdmF0ZScsXHJcblx0J21pcnJvci1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1taXJyb3ItcHJpdmF0ZScsXHJcblx0J2dpdC1mb3JrLXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1mb3JrLXByaXZhdGUnLFxyXG5cdGxvY2s6ICdvY3RpY29uIG9jdGljb24tbG9jaycsXHJcblx0J2xvZ28tZ2l0aHViJzogJ29jdGljb24gb2N0aWNvbi1sb2dvLWdpdGh1YicsXHJcblx0bWFpbDogJ29jdGljb24gb2N0aWNvbi1tYWlsJyxcclxuXHQnbWFpbC1yZWFkJzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlYWQnLFxyXG5cdCdtYWlsLXJlcGx5JzogJ29jdGljb24gb2N0aWNvbi1tYWlsLXJlcGx5JyxcclxuXHQnbWFyay1naXRodWInOiAnb2N0aWNvbiBvY3RpY29uLW1hcmstZ2l0aHViJyxcclxuXHRtYXJrZG93bjogJ29jdGljb24gb2N0aWNvbi1tYXJrZG93bicsXHJcblx0bWVnYXBob25lOiAnb2N0aWNvbiBvY3RpY29uLW1lZ2FwaG9uZScsXHJcblx0bWVudGlvbjogJ29jdGljb24gb2N0aWNvbi1tZW50aW9uJyxcclxuXHRtaWxlc3RvbmU6ICdvY3RpY29uIG9jdGljb24tbWlsZXN0b25lJyxcclxuXHQnbWlycm9yLXB1YmxpYyc6ICdvY3RpY29uIG9jdGljb24tbWlycm9yLXB1YmxpYycsXHJcblx0bWlycm9yOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvcicsXHJcblx0J21vcnRhci1ib2FyZCc6ICdvY3RpY29uIG9jdGljb24tbW9ydGFyLWJvYXJkJyxcclxuXHRtdXRlOiAnb2N0aWNvbiBvY3RpY29uLW11dGUnLFxyXG5cdCduby1uZXdsaW5lJzogJ29jdGljb24gb2N0aWNvbi1uby1uZXdsaW5lJyxcclxuXHRvY3RvZmFjZTogJ29jdGljb24gb2N0aWNvbi1vY3RvZmFjZScsXHJcblx0b3JnYW5pemF0aW9uOiAnb2N0aWNvbiBvY3RpY29uLW9yZ2FuaXphdGlvbicsXHJcblx0cGFja2FnZTogJ29jdGljb24gb2N0aWNvbi1wYWNrYWdlJyxcclxuXHRwYWludGNhbjogJ29jdGljb24gb2N0aWNvbi1wYWludGNhbicsXHJcblx0cGVuY2lsOiAnb2N0aWNvbiBvY3RpY29uLXBlbmNpbCcsXHJcblx0J3BlcnNvbi1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbi1hZGQnLFxyXG5cdCdwZXJzb24tZm9sbG93JzogJ29jdGljb24gb2N0aWNvbi1wZXJzb24tZm9sbG93JyxcclxuXHRwZXJzb246ICdvY3RpY29uIG9jdGljb24tcGVyc29uJyxcclxuXHRwaW46ICdvY3RpY29uIG9jdGljb24tcGluJyxcclxuXHRwbHVnOiAnb2N0aWNvbiBvY3RpY29uLXBsdWcnLFxyXG5cdCdyZXBvLWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1jcmVhdGUnLFxyXG5cdCdnaXN0LW5ldyc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1uZXcnLFxyXG5cdCdmaWxlLWRpcmVjdG9yeS1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtZGlyZWN0b3J5LWNyZWF0ZScsXHJcblx0J2ZpbGUtYWRkJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWFkZCcsXHJcblx0cGx1czogJ29jdGljb24gb2N0aWNvbi1wbHVzJyxcclxuXHQncHJpbWl0aXZlLWRvdCc6ICdvY3RpY29uIG9jdGljb24tcHJpbWl0aXZlLWRvdCcsXHJcblx0J3ByaW1pdGl2ZS1zcXVhcmUnOiAnb2N0aWNvbiBvY3RpY29uLXByaW1pdGl2ZS1zcXVhcmUnLFxyXG5cdHB1bHNlOiAnb2N0aWNvbiBvY3RpY29uLXB1bHNlJyxcclxuXHRxdWVzdGlvbjogJ29jdGljb24gb2N0aWNvbi1xdWVzdGlvbicsXHJcblx0cXVvdGU6ICdvY3RpY29uIG9jdGljb24tcXVvdGUnLFxyXG5cdCdyYWRpby10b3dlcic6ICdvY3RpY29uIG9jdGljb24tcmFkaW8tdG93ZXInLFxyXG5cdCdyZXBvLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1kZWxldGUnLFxyXG5cdHJlcG86ICdvY3RpY29uIG9jdGljb24tcmVwbycsXHJcblx0J3JlcG8tY2xvbmUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tY2xvbmUnLFxyXG5cdCdyZXBvLWZvcmNlLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9yY2UtcHVzaCcsXHJcblx0J2dpc3QtZm9yayc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1mb3JrJyxcclxuXHQncmVwby1mb3JrZWQnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZm9ya2VkJyxcclxuXHQncmVwby1wdWxsJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXB1bGwnLFxyXG5cdCdyZXBvLXB1c2gnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tcHVzaCcsXHJcblx0cm9ja2V0OiAnb2N0aWNvbiBvY3RpY29uLXJvY2tldCcsXHJcblx0cnNzOiAnb2N0aWNvbiBvY3RpY29uLXJzcycsXHJcblx0cnVieTogJ29jdGljb24gb2N0aWNvbi1ydWJ5JyxcclxuXHQnc2NyZWVuLWZ1bGwnOiAnb2N0aWNvbiBvY3RpY29uLXNjcmVlbi1mdWxsJyxcclxuXHQnc2NyZWVuLW5vcm1hbCc6ICdvY3RpY29uIG9jdGljb24tc2NyZWVuLW5vcm1hbCcsXHJcblx0J3NlYXJjaC1zYXZlJzogJ29jdGljb24gb2N0aWNvbi1zZWFyY2gtc2F2ZScsXHJcblx0c2VhcmNoOiAnb2N0aWNvbiBvY3RpY29uLXNlYXJjaCcsXHJcblx0c2VydmVyOiAnb2N0aWNvbiBvY3RpY29uLXNlcnZlcicsXHJcblx0c2V0dGluZ3M6ICdvY3RpY29uIG9jdGljb24tc2V0dGluZ3MnLFxyXG5cdHNoaWVsZDogJ29jdGljb24gb2N0aWNvbi1zaGllbGQnLFxyXG5cdCdsb2ctaW4nOiAnb2N0aWNvbiBvY3RpY29uLWxvZy1pbicsXHJcblx0J3NpZ24taW4nOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24taW4nLFxyXG5cdCdsb2ctb3V0JzogJ29jdGljb24gb2N0aWNvbi1sb2ctb3V0JyxcclxuXHQnc2lnbi1vdXQnOiAnb2N0aWNvbiBvY3RpY29uLXNpZ24tb3V0JyxcclxuXHRzcXVpcnJlbDogJ29jdGljb24gb2N0aWNvbi1zcXVpcnJlbCcsXHJcblx0J3N0YXItYWRkJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWFkZCcsXHJcblx0J3N0YXItZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1zdGFyLWRlbGV0ZScsXHJcblx0c3RhcjogJ29jdGljb24gb2N0aWNvbi1zdGFyJyxcclxuXHRzdG9wOiAnb2N0aWNvbiBvY3RpY29uLXN0b3AnLFxyXG5cdCdyZXBvLXN5bmMnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tc3luYycsXHJcblx0c3luYzogJ29jdGljb24gb2N0aWNvbi1zeW5jJyxcclxuXHQndGFnLXJlbW92ZSc6ICdvY3RpY29uIG9jdGljb24tdGFnLXJlbW92ZScsXHJcblx0J3RhZy1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXRhZy1hZGQnLFxyXG5cdHRhZzogJ29jdGljb24gb2N0aWNvbi10YWcnLFxyXG5cdHRlbGVzY29wZTogJ29jdGljb24gb2N0aWNvbi10ZWxlc2NvcGUnLFxyXG5cdHRlcm1pbmFsOiAnb2N0aWNvbiBvY3RpY29uLXRlcm1pbmFsJyxcclxuXHQndGhyZWUtYmFycyc6ICdvY3RpY29uIG9jdGljb24tdGhyZWUtYmFycycsXHJcblx0dGh1bWJzZG93bjogJ29jdGljb24gb2N0aWNvbi10aHVtYnNkb3duJyxcclxuXHR0aHVtYnN1cDogJ29jdGljb24gb2N0aWNvbi10aHVtYnN1cCcsXHJcblx0dG9vbHM6ICdvY3RpY29uIG9jdGljb24tdG9vbHMnLFxyXG5cdHRyYXNoY2FuOiAnb2N0aWNvbiBvY3RpY29uLXRyYXNoY2FuJyxcclxuXHQndHJpYW5nbGUtZG93bic6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtZG93bicsXHJcblx0J3RyaWFuZ2xlLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLWxlZnQnLFxyXG5cdCd0cmlhbmdsZS1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtcmlnaHQnLFxyXG5cdCd0cmlhbmdsZS11cCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtdXAnLFxyXG5cdHVuZm9sZDogJ29jdGljb24gb2N0aWNvbi11bmZvbGQnLFxyXG5cdHVubXV0ZTogJ29jdGljb24gb2N0aWNvbi11bm11dGUnLFxyXG5cdHZlcnNpb25zOiAnb2N0aWNvbiBvY3RpY29uLXZlcnNpb25zJyxcclxuXHR3YXRjaDogJ29jdGljb24gb2N0aWNvbi13YXRjaCcsXHJcblx0J3JlbW92ZS1jbG9zZSc6ICdvY3RpY29uIG9jdGljb24tcmVtb3ZlLWNsb3NlJyxcclxuXHR4OiAnb2N0aWNvbiBvY3RpY29uLXgnLFxyXG5cdHphcDogJ29jdGljb24gb2N0aWNvbi16YXAnLFxyXG59O1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c21hbGw6IHRoZW1lLmdseXBoLnNpemUuc21hbGwsXHJcblx0bWVkaXVtOiB0aGVtZS5nbHlwaC5zaXplLm1lZGl1bSxcclxuXHRsYXJnZTogdGhlbWUuZ2x5cGguc2l6ZS5sYXJnZSxcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEdseXBoXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbYGNvbG9yX18ke2NvbG9yfWBdID0ge1xyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhzaXplcykuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbYHNpemVfXyR7c2l6ZX1gXSA9IHtcclxuXHRcdGZvbnRTaXplOiBzaXplc1tzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGdseXBoOiB7fSxcclxuXHJcblx0Ly8gQ29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxuXHJcblx0Ly8gU2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNvbnN0IFdJRFRIUyA9IHtcclxuXHQnb25lLXdob2xlJzogJzEwMCUnLFxyXG5cdCdvbmUtaGFsZic6ICc1MCUnLFxyXG5cdCdvbmUtdGhpcmQnOiAnMzMuMzMlJyxcclxuXHQndHdvLXRoaXJkcyc6ICc2Ni42NiUnLFxyXG5cdCdvbmUtcXVhcnRlcic6ICcyNSUnLFxyXG5cdCd0aHJlZS1xdWFydGVycyc6ICc3NSUnLFxyXG5cclxuXHQnb25lLWZpZnRoJzogJzIwJScsXHJcblx0J3R3by1maWZ0aHMnOiAnNDAlJyxcclxuXHQndGhyZWUtZmlmdGhzJzogJzYwJScsXHJcblx0J2ZvdXItZmlmdGhzJzogJzgwJScsXHJcblxyXG5cdCdvbmUtc2l4dGgnOiAnMTYuNjYlJyxcclxuXHQnZml2ZS1zaXh0aHMnOiAnODMuMzMlJyxcclxufTtcclxuXHJcbmNvbnN0IEdyaWRDb2wgPSAocHJvcHMsIGNvbnRleHQpID0+IHtcclxuXHRjb25zdCBndXR0ZXIgPSBwcm9wcy5ndXR0ZXIgfHwgY29udGV4dC5ndXR0ZXI7XHJcblx0Y29uc3QgeHNtYWxsID0gcHJvcHMueHNtYWxsIHx8IGNvbnRleHQueHNtYWxsO1xyXG5cdGNvbnN0IHNtYWxsID0gcHJvcHMuc21hbGwgfHwgY29udGV4dC5zbWFsbDtcclxuXHRjb25zdCBtZWRpdW0gPSBwcm9wcy5tZWRpdW0gfHwgY29udGV4dC5tZWRpdW07XHJcblx0Y29uc3QgbGFyZ2UgPSBwcm9wcy5sYXJnZSB8fCBjb250ZXh0LmxhcmdlO1xyXG5cclxuXHRjb25zdCBjbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzWyd4c21hbGwtJyArIHhzbWFsbF0sXHJcblx0XHRjbGFzc2VzWydzbWFsbC0nICsgc21hbGxdLFxyXG5cdFx0Y2xhc3Nlc1snbWVkaXVtLScgKyBtZWRpdW1dLFxyXG5cdFx0Y2xhc3Nlc1snbGFyZ2UtJyArIGxhcmdlXVxyXG5cdCk7XHJcblxyXG5cdGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0ke3Byb3BzLmNsYXNzTmFtZSA/ICgnICcgKyBwcm9wcy5jbGFzc05hbWUpIDogJyd9YDtcclxuXHRjb25zdCBjb21wb25lbnRTdHlsZXMgPSBndXR0ZXIgPyB7XHJcblx0XHRwYWRkaW5nTGVmdDogZ3V0dGVyIC8gMixcclxuXHRcdHBhZGRpbmdSaWdodDogZ3V0dGVyIC8gMixcclxuXHR9IDoge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0e3Byb3BzLmNoaWxkcmVufVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkdyaWRDb2wuY29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZENvbC5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ3hzbWFsbCcsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnc21hbGwnLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ21lZGl1bScsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnbGFyZ2UnLCBXSURUSFMpLFxyXG59O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbmZ1bmN0aW9uIHByZXBhcmVXaWR0aHMgKHByZWZpeCwgb2JqKSB7XHJcblx0bGV0IGNsYXNzZXMgPSB7fTtcclxuXHRzd2l0Y2ggKHByZWZpeCkge1xyXG5cdFx0Y2FzZSAnc21hbGwnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0UG9ydHJhaXRNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdtZWRpdW0nOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbGFyZ2UnOlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQuZGVza3RvcE1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiBjbGFzc2VzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkQ29sO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5jbGFzcyBHcmlkUm93IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z3V0dGVyOiB0aGlzLnByb3BzLmd1dHRlcixcclxuXHRcdFx0eHNtYWxsOiB0aGlzLnByb3BzLnhzbWFsbCxcclxuXHRcdFx0c21hbGw6IHRoaXMucHJvcHMuc21hbGwsXHJcblx0XHRcdG1lZGl1bTogdGhpcy5wcm9wcy5tZWRpdW0sXHJcblx0XHRcdGxhcmdlOiB0aGlzLnByb3BzLmxhcmdlLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgZ3V0dGVyLCBzdHlsZXMgPSB7fSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBgJHtjc3MoY2xhc3Nlcy5ncmlkKX0ke2NsYXNzTmFtZSA/ICgnICcgKyBjbGFzc05hbWUpIDogJyd9YDtcclxuXHRcdGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IE9iamVjdC5hc3NpZ24oc3R5bGVzLCB7XHJcblx0XHRcdG1hcmdpbkxlZnQ6IGd1dHRlciAvIC0yLFxyXG5cdFx0XHRtYXJnaW5SaWdodDogZ3V0dGVyIC8gLTIsXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y29tcG9uZW50Q2xhc3NOYW1lfSBzdHlsZT17Y29tcG9uZW50U3R5bGVzfT5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5HcmlkUm93LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZFJvdy5wcm9wVHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkUm93LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRndXR0ZXI6IDAsXHJcblx0eHNtYWxsOiAnb25lLXdob2xlJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z3JpZDoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleFdyYXA6ICd3cmFwJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkUm93O1xyXG4iLCJpbXBvcnQgQ29sIGZyb20gJy4uL0dyaWRDb2wnO1xyXG5pbXBvcnQgUm93IGZyb20gJy4uL0dyaWRSb3cnO1xyXG5cclxuZXhwb3J0IHsgQ29sLCBSb3cgfTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG4vLyBOT1RFOiBJbmxpbmUgR3JvdXAgU2VjdGlvbiBhY2NlcHRzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cFNlY3Rpb24gKHtcclxuXHRhY3RpdmUsXHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb250aWd1b3VzLFxyXG5cdGdyb3csXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIGV2YWx1YXRlIHBvc2l0aW9uXHJcblx0Y29uc3Qgc2VwYXJhdGUgPSBwb3NpdGlvbiA9PT0gJ2xhc3QnIHx8IHBvc2l0aW9uID09PSAnbWlkZGxlJztcclxuXHJcblx0Ly8gQSBgY29udGlndW91c2Agc2VjdGlvbiBtdXN0IG1hbmlwdWxhdGUgaXQncyBjaGlsZCBkaXJlY3RseVxyXG5cdC8vIEEgc2VwYXJhdGUgKGRlZmF1bHQpIHNlY3Rpb24ganVzdCB3cmFwcyB0aGUgY2hpbGRcclxuXHRyZXR1cm4gY29udGlndW91cyA/IGNsb25lRWxlbWVudChjaGlsZHJlbiwge1xyXG5cdFx0YXBocm9kaXRlU3R5bGVzOiBbXHJcblx0XHRcdGNsYXNzZXMuY29udGlndW91cyxcclxuXHRcdFx0Y2xhc3Nlc1snY29udGlndW91c19fJyArIHBvc2l0aW9uXSxcclxuXHRcdFx0YWN0aXZlID8gY2xhc3Nlcy5hY3RpdmUgOiBudWxsLFxyXG5cdFx0XHRncm93ID8gY2xhc3Nlcy5ncm93IDogbnVsbCxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XSxcclxuXHRcdC4uLnByb3BzLFxyXG5cdH0pIDogKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhcclxuXHRcdFx0ISFncm93ICYmIGNsYXNzZXMuZ3JvdyxcclxuXHRcdFx0ISFzZXBhcmF0ZSAmJiBjbGFzc2VzLnNlcGFyYXRlLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHRcdCl9IHsuLi5wcm9wc30+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5JbmxpbmVHcm91cFNlY3Rpb24ucHJvcFR5cGVzID0ge1xyXG5cdGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsIC8vIGJ1dHRvbnMgb25seVxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxyXG5cdGNvbnRpZ3VvdXM6IFByb3BUeXBlcy5ib29sLFxyXG5cdGdyb3c6IFByb3BUeXBlcy5ib29sLFxyXG5cdHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydmaXJzdCcsICdsYXN0JywgJ21pZGRsZScsICdvbmx5J10pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVHcm91cFNlY3Rpb247XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBJbmxpbmUgR3JvdXA6IFNlY3Rpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBUYWtlcyBvbmx5IEZvcm1JbnB1dCBhbmQgQnV0dG9uIGFzIGNoaWxkcmVuLCByZW5kZXJpbmcgdGhlbSBhcyBhXHJcbi8vIHRpZHkgaW5saW5lIGFycmF5XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Ly8gcHVsbCBhY3RpdmUgZWxlbWVudHMgdXBcclxuXHRhY3RpdmU6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHN0cmV0Y2ggdG8gZmlsbCBhdmFpbGFibGUgd2lkdGhcclxuXHRncm93OiB7XHJcblx0XHRmbGV4OiAnMSAxIDAnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlcGFyYXRlIGFwcGxpY2FibGUgbm9uLWNvbnRpZ3VvdXMgZWxlbWVudHNcclxuXHRzZXBhcmF0ZToge1xyXG5cdFx0cGFkZGluZ0xlZnQ6ICcwLjc1ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnRpZ3VvdXM6IG1hbmlwdWxhdGUgY2hpbGRyZW4gZGlyZWN0bHlcclxuXHJcblx0Ly8gcHVsbCBmb2N1c2VkIGNvbnRpZ3VvdXMgZWxlbWVudHMgdXBcclxuXHRjb250aWd1b3VzOiB7XHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdFx0ekluZGV4OiAxLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBwb3NpdGlvblxyXG5cdGNvbnRpZ3VvdXNfX21pZGRsZToge1xyXG5cdFx0Ym9yZGVyUmFkaXVzOiAwLFxyXG5cdFx0bWFyZ2luTGVmdDogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoICogLTEsXHJcblx0fSxcclxuXHRjb250aWd1b3VzX19maXJzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdH0sXHJcblx0Y29udGlndW91c19fbGFzdDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdG1hcmdpbkxlZnQ6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCAqIC0xLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuLCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyBOT1RFOiBvbmx5IGFjY2VwdHMgSW5saW5lR3JvdXBTZWN0aW9uIGFzIGEgc2luZ2xlIGNoaWxkXHJcblxyXG5mdW5jdGlvbiBJbmxpbmVHcm91cCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRibG9jayxcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y29udGlndW91cyxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gcHJlcGFyZSBncm91cCBjbGFzc05hbWVcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmdyb3VwLFxyXG5cdFx0ISFibG9jayAmJiBjbGFzc2VzLmJsb2NrLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KTtcclxuXHRpZiAoY2xhc3NOYW1lKSB7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvLyBjb252ZXJ0IGNoaWxkcmVuIHRvIGFuIGFycmF5IGFuZCBmaWx0ZXIgb3V0IGZhbHNleSB2YWx1ZXNcclxuXHRjb25zdCBidXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikuZmlsdGVyKGkgPT4gaSk7XHJcblxyXG5cdC8vIG5vcm1hbGl6ZSB0aGUgY291bnRcclxuXHRjb25zdCBjb3VudCA9IGJ1dHRvbnMubGVuZ3RoIC0gMTtcclxuXHJcblx0Ly8gY2xvbmUgY2hpbGRyZW4gYW5kIGFwcGx5IGNsYXNzTmFtZXMgdGhhdCBhcGhyb2RpdGUgY2FuIHRhcmdldFxyXG5cdHByb3BzLmNoaWxkcmVuID0gYnV0dG9ucy5tYXAoKGMsIGlkeCkgPT4ge1xyXG5cdFx0aWYgKCFjKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpc09ubHlDaGlsZCA9ICFjb3VudDtcclxuXHRcdGNvbnN0IGlzRmlyc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IDA7XHJcblx0XHRjb25zdCBpc0xhc3RDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiBpZHggPT09IGNvdW50O1xyXG5cdFx0Y29uc3QgaXNNaWRkbGVDaGlsZCA9ICFpc09ubHlDaGlsZCAmJiAhaXNGaXJzdENoaWxkICYmICFpc0xhc3RDaGlsZDtcclxuXHJcblx0XHRsZXQgcG9zaXRpb247XHJcblx0XHRpZiAoaXNPbmx5Q2hpbGQpIHBvc2l0aW9uID0gJ29ubHknO1xyXG5cdFx0aWYgKGlzRmlyc3RDaGlsZCkgcG9zaXRpb24gPSAnZmlyc3QnO1xyXG5cdFx0aWYgKGlzTGFzdENoaWxkKSBwb3NpdGlvbiA9ICdsYXN0JztcclxuXHRcdGlmIChpc01pZGRsZUNoaWxkKSBwb3NpdGlvbiA9ICdtaWRkbGUnO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZUVsZW1lbnQoYywge1xyXG5cdFx0XHRjb250aWd1b3VzOiBjb250aWd1b3VzLFxyXG5cdFx0XHRwb3NpdGlvbixcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuSW5saW5lR3JvdXAucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSksXHJcblx0YmxvY2s6IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0Y29udGlndW91czogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbklubGluZUdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRncm91cDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1mbGV4JyxcclxuXHR9LFxyXG5cdGJsb2NrOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5saW5lR3JvdXA7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIExhYmVsbGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRpbmxpbmUsXHJcblx0bGFiZWwsXHJcblx0dGl0bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGxhYmVsQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy53cmFwcGVyLFxyXG5cdFx0aW5saW5lICYmIGNsYXNzZXMud3JhcHBlcl9faW5saW5lLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxsYWJlbCB0aXRsZT17dGl0bGV9IGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9PlxyXG5cdFx0XHQ8aW5wdXQgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRyb2wpfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmxhYmVsKX0+e2xhYmVsfTwvc3Bhbj5cclxuXHRcdDwvbGFiZWw+XHJcblx0KTtcclxufTtcclxuXHJcbkxhYmVsbGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0aW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR0eXBlOiBQcm9wVHlwZXMub25lT2YoWydjaGVja2JveCcsICdyYWRpbyddKS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbGxlZENvbnRyb2w7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHR3cmFwcGVyOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdH0sXHJcblx0d3JhcHBlcl9faW5saW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjaGVja2JveCBvciByYWRpb1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vU3Bpbm5lcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBMb2FkaW5nQnV0dG9uICh7IGNoaWxkcmVuLCBsb2FkaW5nLCAuLi5wcm9wcyB9KSB7XHJcblx0Ly8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHZhcmlhbnQgZm9yIHRoZSBzcGlubmVyLFxyXG5cdC8vIGZpbGwgaXMgdGhlIGRlZmF1bHQgdmFyaWFudCBvbiBCdXR0b25cclxuXHRjb25zdCB2YXJpYW50ID0gcHJvcHMudmFyaWFudCB8fCAnZmlsbCc7XHJcblxyXG5cdC8vIGRldGVybWluZSB0aGUgY29ycmVjdCBjb2xvciBmb3IgdGhlIHNwaW5uZXIsXHJcblx0Ly8gY2FuY2VsIGFuZCBkZWxldGUgYWxpYXMgdG8gXCJkYW5nZXJcIlxyXG5cdGxldCBjb2xvcjtcclxuXHRpZiAocHJvcHMuY29sb3IgPT09ICdjYW5jZWwnIHx8IHByb3BzLmNvbG9yID09PSAnZGVsZXRlJykgY29sb3IgPSAnZGFuZ2VyJztcclxuXHJcblx0Ly8gbWVyZ2UgYWxsIHRoZSB2YXJpYW50L2NvbG9yIHRvZ2V0aGVyXHJcblx0Y29uc3QgZm9ybWF0dGVkQ29sb3IgPSB2YXJpYW50ID09PSAnZmlsbCcgJiYgcHJvcHMuY29sb3IgIT09ICdkZWZhdWx0J1xyXG5cdFx0PyAnaW52ZXJ0ZWQnXHJcblx0XHQ6IGNvbG9yO1xyXG5cclxuXHQvLyByZW5kZXIgdGhlIHNwaW5uZXIgaWYgcmVxdWlyZWRcclxuXHRjb25zdCBzcGlubmVyID0gbG9hZGluZyAmJiAoXHJcblx0XHQ8U3Bpbm5lclxyXG5cdFx0XHRzaXplPVwic21hbGxcIlxyXG5cdFx0XHRjb2xvcj17Zm9ybWF0dGVkQ29sb3J9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdC8vIHNsaWRlIHRoZSBzcGlubmVyIGluIGFuZCBvdXQgb2Ygdmlld1xyXG5cdGNvbnN0IHNwaW5uZXJTdHlsZXMgPSB7XHJcblx0XHR3aWR0aDogbG9hZGluZ1xyXG5cdFx0XHQ/ICh0aGVtZS5zcGlubmVyLnNpemUuc21hbGwgKiA1ICsgdGhlbWUuc3BhY2luZy5zbWFsbClcclxuXHRcdFx0OiAwLFxyXG5cdH07XHJcblxyXG5cdC8vIHJlbmRlciBhbGwgdGhhdCBzaGl0XHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5zcGlubmVyKX0gc3R5bGU9e3NwaW5uZXJTdHlsZXN9PlxyXG5cdFx0XHRcdHtzcGlubmVyfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG5Mb2FkaW5nQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuTG9hZGluZ0J1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0bG9hZGluZzogZmFsc2UsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHNwaW5uZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dEFsaWduOiAnbGVmdCcsXHJcblx0XHR0cmFuc2l0aW9uOiAnd2lkdGggMjAwbXMgZWFzZS1vdXQnLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9hZGluZ0J1dHRvbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsQm9keSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXZcclxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5ib2R5LCBjbGFzc05hbWUpfVxyXG5cdFx0XHR7Li4ucHJvcHN9XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGJvZHk6IHtcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5Lmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkudmVydGljYWwsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxCb2R5O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xuaW1wb3J0IFNjcm9sbExvY2sgZnJvbSAnLi4vU2Nyb2xsTG9jayc7XG5pbXBvcnQgUG9ydGFsIGZyb20gJy4uL1BvcnRhbCc7XG5cbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XG5cbmNvbnN0IGNhblVzZURvbSA9ICEhKFxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuXHQmJiB3aW5kb3cuZG9jdW1lbnRcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2sgPSB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQuYmluZCh0aGlzKTtcblx0fVxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvbkNsb3NlOiB0aGlzLnByb3BzLm9uQ2xvc2UsXG5cdFx0fTtcblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRpZiAoIWNhblVzZURvbSkgcmV0dXJuO1xuXG5cdFx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHRcdGlmICghbmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNZXRob2RzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRoYW5kbGVCYWNrZHJvcENsaWNrIChlKSB7XG5cdFx0aWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuY29udGFpbmVyKSByZXR1cm47XG5cblx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJlcnNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRiYWNrZHJvcENsb3Nlc01vZGFsLFxuXHRcdFx0Y2hpbGRyZW4sXG5cdFx0XHRpc09wZW4sXG5cdFx0XHR3aWR0aCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghaXNPcGVuKSByZXR1cm4gPHNwYW4ga2V5PVwiY2xvc2VkXCIgLz47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdlxuXHRcdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9XG5cdFx0XHRcdGtleT1cIm9wZW5cIlxuXHRcdFx0XHRyZWY9XCJjb250YWluZXJcIlxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0XHRvblRvdWNoRW5kPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxuXHRcdFx0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZGlhbG9nKX0gc3R5bGU9e3sgd2lkdGggfX0gZGF0YS1zY3JlZW4taWQ9XCJtb2RhbC1kaWFsb2dcIj5cblx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8U2Nyb2xsTG9jayAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8UG9ydGFsPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn07XG5cbk1vZGFsRGlhbG9nLnByb3BUeXBlcyA9IHtcblx0YmFja2Ryb3BDbG9zZXNNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpc09wZW46IFByb3BUeXBlcy5ib29sLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5Nb2RhbERpYWxvZy5kZWZhdWx0UHJvcHMgPSB7XG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXG5cdHdpZHRoOiA3NjgsXG59O1xuTW9kYWxEaWFsb2cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBjbGFzc2VzID0ge1xuXHRjb250YWluZXI6IHtcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1vZGFsLmJhY2tncm91bmQsXG5cdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHRvcDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdHpJbmRleDogdGhlbWUubW9kYWwuekluZGV4LFxuXHR9LFxuXHRkaWFsb2c6IHtcblx0XHRtYXhIZWlnaHQ6ICc5MCUnLFxuXHRcdG92ZXJmbG93OiAnc2Nyb2xsJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy52ZXJ0aWNhbCxcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1RvcDogJzVweCcsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbERpYWxvZztcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEZvb3RlciAoe1xyXG5cdGFsaWduLFxyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmZvb3RlciwgY2xhc3Nlc1snYWxpZ25fXycgKyBhbGlnbl0sIGNsYXNzTmFtZSl9IC8+XHJcblx0KTtcclxufTtcclxuXHJcbk1vZGFsRm9vdGVyLnByb3BUeXBlcyA9IHtcclxuXHRhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxGb290ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGFsaWduOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGZvb3Rlcjoge1xyXG5cdFx0Ym9yZGVyVG9wOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gYWxpZ25tZW50XHJcblx0YWxpZ25fX2xlZnQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXHJcblx0fSxcclxuXHRhbGlnbl9fY2VudGVyOiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxuXHRhbGlnbl9fcmlnaHQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsRm9vdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgR2x5cGhCdXR0b24gZnJvbSAnLi4vR2x5cGhCdXR0b24nO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxIZWFkZXIgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0c2hvd0Nsb3NlQnV0dG9uLFxyXG5cdHRleHQsXHJcblx0Li4ucHJvcHNcclxufSwge1xyXG5cdG9uQ2xvc2UsXHJcbn0pIHtcclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgdGV4dCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogTW9kYWxIZWFkZXIgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgdGV4dGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkZXIsIGNsYXNzTmFtZSl9PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZ3Jvdyl9PlxyXG5cdFx0XHRcdHt0ZXh0ID8gKFxyXG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMudGV4dCl9PlxyXG5cdFx0XHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0XHRcdDwvaDQ+XHJcblx0XHRcdFx0KSA6IGNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0eyEhb25DbG9zZSAmJiBzaG93Q2xvc2VCdXR0b24gJiYgKFxyXG5cdFx0XHRcdDxHbHlwaEJ1dHRvblxyXG5cdFx0XHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmNsb3NlfVxyXG5cdFx0XHRcdFx0Y29sb3I9XCJjYW5jZWxcIlxyXG5cdFx0XHRcdFx0Z2x5cGg9XCJ4XCJcclxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XHJcblx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEhlYWRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxIZWFkZXIuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGhlYWRlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRib3JkZXJCb3R0b206IGAycHggc29saWQgJHt0aGVtZS5jb2xvci5ncmF5MTB9YCxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHR9LFxyXG5cclxuXHQvLyBmaWxsIHNwYWNlIHRvIHB1c2ggdGhlIGNsb3NlIGJ1dHRvbiByaWdodFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRpdGxlIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdFx0Zm9udFNpemU6IDE4LFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogMCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEhlYWRlcjtcclxuIiwiaW1wb3J0IEJvZHkgZnJvbSAnLi9ib2R5JztcclxuaW1wb3J0IERpYWxvZyBmcm9tICcuL2RpYWxvZyc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJztcclxuXHJcbmV4cG9ydCB7XHJcblx0Qm9keSxcclxuXHREaWFsb2csXHJcblx0Rm9vdGVyLFxyXG5cdEhlYWRlcixcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyQ291bnQgKCkge1xyXG5cdFx0bGV0IGNvdW50ID0gJyc7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBwYWdlU2l6ZSwgcGx1cmFsLCBzaW5ndWxhciwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAoIXRvdGFsKSB7XHJcblx0XHRcdGNvdW50ID0gJ05vICcgKyAocGx1cmFsIHx8ICdyZWNvcmRzJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRvdGFsID4gcGFnZVNpemUpIHtcclxuXHRcdFx0bGV0IHN0YXJ0ID0gKHBhZ2VTaXplICogKGN1cnJlbnRQYWdlIC0gMSkpICsgMTtcclxuXHRcdFx0bGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgcGFnZVNpemUgLSAxLCB0b3RhbCk7XHJcblx0XHRcdGNvdW50ID0gYFNob3dpbmcgJHtzdGFydH0gdG8gJHtlbmR9IG9mICR7dG90YWx9YDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvdW50ID0gJ1Nob3dpbmcgJyArIHRvdGFsO1xyXG5cdFx0XHRpZiAodG90YWwgPiAxICYmIHBsdXJhbCkge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHBsdXJhbDtcclxuXHRcdFx0fSBlbHNlIGlmICh0b3RhbCA9PT0gMSAmJiBzaW5ndWxhcikge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHNpbmd1bGFyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY291bnQpfSBkYXRhLWUyZS1wYWdpbmF0aW9uLWNvdW50Pntjb3VudH08L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlclBhZ2VzICgpIHtcclxuXHRcdGNvbnN0IHsgY3VycmVudFBhZ2UsIGxpbWl0LCBvblBhZ2VTZWxlY3QsIHBhZ2VTaXplLCB0b3RhbCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAodG90YWwgPD0gcGFnZVNpemUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGxldCBwYWdlcyA9IFtdO1xyXG5cdFx0bGV0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XHJcblx0XHRsZXQgbWluUGFnZSA9IDE7XHJcblx0XHRsZXQgbWF4UGFnZSA9IHRvdGFsUGFnZXM7XHJcblxyXG5cdFx0aWYgKGxpbWl0ICYmIChsaW1pdCA8IHRvdGFsUGFnZXMpKSB7XHJcblx0XHRcdGxldCByaWdodExpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCAvIDIpO1xyXG5cdFx0XHRsZXQgbGVmdExpbWl0ID0gcmlnaHRMaW1pdCArIChsaW1pdCAlIDIpIC0gMTtcclxuXHRcdFx0bWluUGFnZSA9IGN1cnJlbnRQYWdlIC0gbGVmdExpbWl0O1xyXG5cdFx0XHRtYXhQYWdlID0gY3VycmVudFBhZ2UgKyByaWdodExpbWl0O1xyXG5cclxuXHRcdFx0aWYgKG1pblBhZ2UgPCAxKSB7XHJcblx0XHRcdFx0bWF4UGFnZSA9IGxpbWl0O1xyXG5cdFx0XHRcdG1pblBhZ2UgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtYXhQYWdlID4gdG90YWxQYWdlcykge1xyXG5cdFx0XHRcdG1pblBhZ2UgPSB0b3RhbFBhZ2VzIC0gbGltaXQgKyAxO1xyXG5cdFx0XHRcdG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAobWluUGFnZSA+IDEpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX3N0YXJ0XCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KDEpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHBhZ2UgPSBtaW5QYWdlOyBwYWdlIDw9IG1heFBhZ2U7IHBhZ2UrKykge1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWQgPSAocGFnZSA9PT0gY3VycmVudFBhZ2UpO1xyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9eydwYWdlXycgKyBwYWdlfSBzZWxlY3RlZD17c2VsZWN0ZWR9IG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdChwYWdlKX0+e3BhZ2V9PC9QYWdlPik7XHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgKi9cclxuXHRcdH1cclxuXHRcdGlmIChtYXhQYWdlIDwgdG90YWxQYWdlcykge1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT1cInBhZ2VfZW5kXCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KHRvdGFsUGFnZXMpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5saXN0KX0+XHJcblx0XHRcdFx0e3BhZ2VzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jb250YWluZXIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb3VudCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclBhZ2VzKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMmVtJyxcclxuXHR9LFxyXG5cdGNvdW50OiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMWVtJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcblx0bGlzdDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxuUGFnaW5hdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGN1cnJlbnRQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0b25QYWdlU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdHBsdXJhbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaW5ndWxhcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHR0b3RhbDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdpbmF0aW9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gUGFnZSAoe1xyXG5cdGRpc2FibGVkLFxyXG5cdHNlbGVjdGVkLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLnBhZ2UsXHJcblx0XHQhIWRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsXHJcblx0XHQhIXNlbGVjdGVkICYmIGNsYXNzZXMuc2VsZWN0ZWRcclxuXHQpO1xyXG5cdHJldHVybiAoXHJcblx0XHQ8YnV0dG9uIHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxuUGFnZS5wcm9wVHlwZXMgPSB7XHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0c2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuY29sb3IsXHJcblx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0ekluZGV4OiAyLFxyXG59O1xyXG5jb25zdCBwc2V1ZG9TdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuY29sb3IsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRwYWdlOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsIC8vIENvbGxhcHNlIHdoaXRlLXNwYWNlXHJcblx0XHRtYXJnaW5SaWdodDogJzAuMjVlbScsXHJcblx0XHRwYWRkaW5nOiAnMCAuN2VtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQvLyBoYW5kbGUgaG92ZXIgYW5kIGZvY3VzXHJcblx0XHQnOmhvdmVyJzogcHNldWRvU3R5bGUsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0ZWQgcGFnZVxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHQuLi5zZWxlY3RlZFN0eWxlLFxyXG5cclxuXHRcdCc6aG92ZXInOiBzZWxlY3RlZFN0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHNlbGVjdGVkU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gZGlzYWJsZWQgcGFnZVxyXG5cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuY29sb3IsXHJcblx0XHRjdXJzb3I6ICdkZWZhdWx0JyxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcclxuIiwiaW1wb3J0IHsgQ2hpbGRyZW4sIENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gUGFzcyB0aGUgTGlnaHRib3ggY29udGV4dCB0aHJvdWdoIHRvIHRoZSBQb3J0YWwncyBkZXNjZW5kZW50c1xyXG4vLyBTdGFja092ZXJmbG93IGRpc2N1c3Npb24gaHR0cDovL2dvby5nbC9vY2xySjlcclxuXHJcbmNsYXNzIFBhc3NDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29udGV4dDtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xyXG5cdH1cclxufTtcclxuXHJcblBhc3NDb250ZXh0LnByb3BUeXBlcyA9IHtcclxuXHRjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbn07XHJcblBhc3NDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFzc0NvbnRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBhc3NDb250ZXh0IGZyb20gJy4uL1Bhc3NDb250ZXh0JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBudWxsO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHQvLyBBbmltYXRlIGZhZGUgb24gbW91bnQvdW5tb3VudFxyXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAyMDA7XHJcblx0XHRjb25zdCBzdHlsZXMgPSBgXHJcblx0XHRcdFx0LmZhZGUtZW50ZXIgeyBvcGFjaXR5OiAwLjAxOyB9XHJcblx0XHRcdFx0LmZhZGUtZW50ZXIuZmFkZS1lbnRlci1hY3RpdmUgeyBvcGFjaXR5OiAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZSB7IG9wYWNpdHk6IDE7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZS5mYWRlLWxlYXZlLWFjdGl2ZSB7IG9wYWNpdHk6IDAuMDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxyXG5cdFx0YDtcclxuXHRcdHJlbmRlcihcclxuXHRcdFx0PFBhc3NDb250ZXh0IGNvbnRleHQ9e3RoaXMuY29udGV4dH0+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxzdHlsZT57c3R5bGVzfTwvc3R5bGU+XHJcblx0XHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0XHRjb21wb25lbnQ9XCJkaXZcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtkdXJhdGlvbn1cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHsuLi50aGlzLnByb3BzfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9QYXNzQ29udGV4dD4sXHJcblx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxyXG5cdFx0KTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5Qb3J0YWwuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBVc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBhbmQgc3RhdGUgaW5zdGVhZCBvZiBDU1MgbWVkaWEgYnJlYWtwb2ludHNcclxuLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHJlbmRlciBudWxsIHJhdGhlciB0aGFuIGFuIGVtcHR5IHNwYW4uIEFsbG93aW5nIGZvclxyXG4vLyBDU1MgcHNldWRvIGNsYXNzZXMgbGlrZSA6b25seS1jaGlsZCB0byBiZWhhdmUgYXMgZXhwZWN0ZWQuXHJcblxyXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3aW5kb3cgKyBkb2N1bWVudFxyXG5jb25zdCBjYW5Vc2VET00gPSAhIShcclxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxyXG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XHJcbik7XHJcblxyXG5jbGFzcyBSZXNwb25zaXZlVGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuc3RhdGUgPSB7XHJcblx0XHRcdHdpbmRvd1dpZHRoOiBjYW5Vc2VET00gPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDAsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmIChjYW5Vc2VET00pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuXHRcdH1cclxuXHR9XHJcblx0aGFuZGxlUmVzaXplICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRoaWRkZW5MRyxcclxuXHRcdFx0aGlkZGVuTUQsXHJcblx0XHRcdGhpZGRlblNNLFxyXG5cdFx0XHRoaWRkZW5YUyxcclxuXHRcdFx0dmlzaWJsZUxHLFxyXG5cdFx0XHR2aXNpYmxlTUQsXHJcblx0XHRcdHZpc2libGVTTSxcclxuXHRcdFx0dmlzaWJsZVhTLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IHdpbmRvd1dpZHRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cclxuXHRcdC8vIHNldCB0ZXh0IHZhbHVlIGZyb20gYnJlYWtwb2ludDsgYXR0ZW1wdCBYUyAtLT4gTEdcclxuXHRcdGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSkge1xyXG5cdFx0XHR0ZXh0ID0gdmlzaWJsZVhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0KSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCB2aXNpYmxlU00gfHwgaGlkZGVuTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlKSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCBoaWRkZW5TTSB8fCB2aXNpYmxlTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgaGlkZGVuTUQgfHwgdmlzaWJsZUxHO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0ZXh0ID8gPENvbXBvbmVudCB7Li4ucHJvcHN9Pnt0ZXh0fTwvQ29tcG9uZW50PiA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxuUmVzcG9uc2l2ZVRleHQucHJvcFR5cGVzID0ge1xyXG5cdGhpZGRlbkxHOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlbk1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblhTOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVMRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTUQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZVNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVYUzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuUmVzcG9uc2l2ZVRleHQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zaXZlVGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmZ1bmN0aW9uIFNjcmVlblJlYWRlck9ubHkgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuc3JPbmx5LCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHNwYW4gey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3JPbmx5OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUmVhZGVyT25seTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsTG9jayBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9ja0NvdW50ID0gMDtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubG9ja0NvdW50Kys7XHJcblx0XHRpZiAodGhpcy5sb2NrQ291bnQgPiAxKSByZXR1cm47XHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5sb2NrQ291bnQgPT09IDApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudC0tO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMCkgcmV0dXJuOyAvLyBTdGlsbCBsb2NrZWRcclxuXHJcblx0XHQvL1x0RklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICcnO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRkZWZhdWx0OiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0ZXJyb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gU2VnbWVudGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjcm9wVGV4dCxcclxuXHRlcXVhbFdpZHRoU2VnbWVudHMsXHJcblx0aW5saW5lLFxyXG5cdG9uQ2hhbmdlLFxyXG5cdG9wdGlvbnMsXHJcblx0dmFsdWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udHJvbCxcclxuXHRcdGlubGluZSA/IGNsYXNzZXMuY29udHJvbF9faW5saW5lIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdHtvcHRpb25zLm1hcCgob3B0KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYnV0dG9uQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRcdFx0XHRvcHQuZGlzYWJsZWQgPyBjbGFzc2VzLmJ1dHRvbl9fZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRcdFx0b3B0LnZhbHVlID09PSB2YWx1ZSA/IGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yXSA6IG51bGwsXHJcblx0XHRcdFx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuYnV0dG9uX19jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHMgPyBjbGFzc2VzLmJ1dHRvbl9fZXF1YWxXaWR0aCA6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2J1dHRvbkNsYXNzTmFtZX1cclxuXHRcdFx0XHRcdFx0a2V5PXtvcHQudmFsdWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eyFvcHQuZGlzYWJsZWQgJiYgKCgpID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRcdFx0dGl0bGU9e2Nyb3BUZXh0ID8gb3B0LmxhYmVsIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9e29wdC5kaXNhYmxlZCA/ICctMScgOiAnJ31cclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSl9XHJcblx0XHQ8L2Rpdj4pO1xyXG59O1xyXG5cclxuY29uc3QgdmFsdWVQcm9wU2hhcGUgPSBbXHJcblx0UHJvcFR5cGVzLmJvb2wsXHJcblx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5dO1xyXG5cclxuU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZW4gYGlubGluZSAmJiBlcXVhbFdpZHRoU2VnbWVudHNgIGNyb3BzIHRvIHRoZSBuZXh0IGxhcmdlc3Qgb3B0aW9uIGxlbmd0aFxyXG5cdGVxdWFsV2lkdGhTZWdtZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIG9ubHkgcmVsZXZhbnQgd2hlbiBgaW5saW5lID09PSBmYWxzZWBcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG5cdFx0fSlcclxuXHQpLmlzUmVxdWlyZWQsXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG59O1xyXG5TZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50ZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2VnbWVudGVkIENvbnRyb2xcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IHBzZXVkb1N0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHBzZXVkb1N0eWxlcyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdGJvcmRlcldpZHRoOiAxLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcwLjRlbScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDEsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDEsXHJcblx0fSxcclxuXHRjb250cm9sX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHJcblx0Ly8gYnV0dG9uc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC4yNWVtJyxcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdFx0bWFyZ2luOiAnMnB4IDFweCcsXHJcblx0XHRwYWRkaW5nOiAnMC4zZW0gMC45ZW0nLFxyXG5cdFx0b3V0bGluZTogMCxcclxuXHJcblx0XHQnOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyB9LFxyXG5cdFx0Jzpmb2N1cyc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6YWN0aXZlJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMSknIH0sXHJcblx0fSxcclxuXHRidXR0b25fX2VxdWFsV2lkdGg6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Nyb3BUZXh0OiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNixcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnaW52ZXJ0ZWQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgU2NyZWVuUmVhZGVyT25seSBmcm9tICcuLi9TY3JlZW5SZWFkZXJPbmx5JztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIFNwaW5uZXIgKHsgY2xhc3NOYW1lLCBzaXplLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNsYXNzZXNbc2l6ZV0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX2ZpcnN0KX1gfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX3NlY29uZCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X190aGlyZCl9YH0gLz5cclxuXHRcdFx0PFNjcmVlblJlYWRlck9ubHk+TG9hZGluZy4uLjwvU2NyZWVuUmVhZGVyT25seT5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5TcGlubmVyLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKGNvbG9ycyksXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKHNpemVzKSxcclxufTtcclxuU3Bpbm5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ21lZGl1bScsXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZSddO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3Bpbm5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbmNvbG9ycy5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3Bpbm5lci5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLnNwaW5uZXIuc2l6ZVtzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIERlY2xhcmUgYW5pbWF0aW9uIGtleWZyYW1lc1xyXG5cclxuY29uc3Qga2V5ZnJhbWVzID0gY29tcG9zZS5rZXlmcmFtZXMoJ3B1bHNlJywge1xyXG5cdCcwJSwgODAlLCAxMDAlJzogeyBvcGFjaXR5OiAwIH0sXHJcblx0JzQwJSc6IHsgb3BhY2l0eTogMSB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAnNWVtJyxcclxuXHR9LFxyXG5cdHNtYWxsOlx0eyBmb250U2l6ZTogNCB9LFxyXG5cdG1lZGl1bTpcdHsgZm9udFNpemU6IDggfSxcclxuXHRsYXJnZTpcdHsgZm9udFNpemU6IDE2IH0sXHJcblxyXG5cdC8vIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHJcblx0Ly8gZG90c1xyXG5cdGRvdDoge1xyXG5cdFx0YW5pbWF0aW9uTmFtZToga2V5ZnJhbWVzLFxyXG5cdFx0YW5pbWF0aW9uRHVyYXRpb246ICcxcycsXHJcblx0XHRhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogJzFlbScsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdHdpZHRoOiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fc2Vjb25kOiB7XHJcblx0XHRhbmltYXRpb25EZWxheTogJzE2MG1zJyxcclxuXHRcdG1hcmdpbkxlZnQ6ICcxZW0nLFxyXG5cdH0sXHJcblx0ZG90X190aGlyZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICczMjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QWxlcnQ6IHJlcXVpcmUoJy4vQWxlcnQnKSxcclxuXHRCbGFua1N0YXRlOiByZXF1aXJlKCcuL0JsYW5rU3RhdGUnKSxcclxuXHRCdXR0b246IHJlcXVpcmUoJy4vQnV0dG9uJyksXHJcblx0Q2VudGVyOiByZXF1aXJlKCcuL0NlbnRlcicpLFxyXG5cdENoaXA6IHJlcXVpcmUoJy4vQ2hpcCcpLFxyXG5cdENvbnRhaW5lcjogcmVxdWlyZSgnLi9Db250YWluZXInKSxcclxuXHREcm9wZG93bkJ1dHRvbjogcmVxdWlyZSgnLi9Ecm9wZG93bkJ1dHRvbicpLFxyXG5cdEZvcm06IHJlcXVpcmUoJy4vRm9ybScpLFxyXG5cdEZvcm1GaWVsZDogcmVxdWlyZSgnLi9Gb3JtRmllbGQnKSxcclxuXHRGb3JtSW5wdXQ6IHJlcXVpcmUoJy4vRm9ybUlucHV0JyksXHJcblx0Rm9ybUxhYmVsOiByZXF1aXJlKCcuL0Zvcm1MYWJlbCcpLFxyXG5cdEZvcm1Ob3RlOiByZXF1aXJlKCcuL0Zvcm1Ob3RlJyksXHJcblx0Rm9ybVNlbGVjdDogcmVxdWlyZSgnLi9Gb3JtU2VsZWN0JyksXHJcblx0R2x5cGg6IHJlcXVpcmUoJy4vR2x5cGgnKSxcclxuXHRHbHlwaEJ1dHRvbjogcmVxdWlyZSgnLi9HbHlwaEJ1dHRvbicpLFxyXG5cdEdseXBoRmllbGQ6IHJlcXVpcmUoJy4vR2x5cGhGaWVsZCcpLFxyXG5cdEdyaWQ6IHJlcXVpcmUoJy4vR3JpZCcpLFxyXG5cdElubGluZUdyb3VwOiByZXF1aXJlKCcuL0lubGluZUdyb3VwJyksXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uOiByZXF1aXJlKCcuL0lubGluZUdyb3VwU2VjdGlvbicpLFxyXG5cdExhYmVsbGVkQ29udHJvbDogcmVxdWlyZSgnLi9MYWJlbGxlZENvbnRyb2wnKSxcclxuXHRMb2FkaW5nQnV0dG9uOiByZXF1aXJlKCcuL0xvYWRpbmdCdXR0b24nKSxcclxuXHRNb2RhbDogcmVxdWlyZSgnLi9Nb2RhbCcpLFxyXG5cdFBhZ2luYXRpb246IHJlcXVpcmUoJy4vUGFnaW5hdGlvbicpLFxyXG5cdFJlc3BvbnNpdmVUZXh0OiByZXF1aXJlKCcuL1Jlc3BvbnNpdmVUZXh0JyksXHJcblx0U2NyZWVuUmVhZGVyT25seTogcmVxdWlyZSgnLi9TY3JlZW5SZWFkZXJPbmx5JyksXHJcblx0U2VnbWVudGVkQ29udHJvbDogcmVxdWlyZSgnLi9TZWdtZW50ZWRDb250cm9sJyksXHJcblx0U3Bpbm5lcjogcmVxdWlyZSgnLi9TcGlubmVyJyksXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCB7IHVwY2FzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogVGhpcyByZW5kZXJzIGFsZXJ0cyBmb3IgQVBJIHN1Y2Nlc3MgYW5kIGVycm9yIHJlc3BvbnNlcy5cclxuICogICBFcnJvciBmb3JtYXQ6IHtcclxuICogICAgIGVycm9yOiAndmFsaWRhdGlvbiBlcnJvcnMnIC8vIFRoZSB1bmlxdWUgZXJyb3IgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWw6IHsgLi4uIH0gLy8gT3B0aW9uYWwgZGV0YWlscyBzcGVjaWZpYyB0byB0aGF0IGVycm9yIHR5cGVcclxuICogICB9XHJcbiAqICAgU3VjY2VzcyBmb3JtYXQ6IHtcclxuICogICAgIHN1Y2Nlc3M6ICdpdGVtIHVwZGF0ZWQnLCAvLyBUaGUgdW5pcXVlIHN1Y2Nlc3MgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWxzOiB7IC4uLiB9IC8vIE9wdGlvbmFsIGRldGFpbHMgc3BlY2lmaWMgdG8gdGhhdCBzdWNjZXNzIHR5cGVcclxuICogICB9XHJcbiAqICAgRXZlbnR1YWxseSBzdWNjZXNzIGFuZCBlcnJvciByZXNwb25zZXMgc2hvdWxkIGJlIGhhbmRsZWQgaW5kaXZpZHVhbGx5XHJcbiAqICAgYmFzZWQgb24gdGhlaXIgdHlwZS4gRm9yIGV4YW1wbGU6IHZhbGlkYXRpb24gZXJyb3JzIHNob3VsZCBiZSBkaXNwbGF5ZWQgbmV4dFxyXG4gKiAgIHRvIGVhY2ggaW52YWxpZCBmaWVsZCBhbmQgc2lnbmluIGVycm9ycyBzaG91bGQgcHJvbXQgdGhlIHVzZXIgdG8gc2lnbiBpbi5cclxuICovXHJcbnZhciBBbGVydE1lc3NhZ2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQWxlcnRNZXNzYWdlcycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRhbGVydHM6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGVycm9yOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0XHRzdWNjZXNzOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxlcnRzOiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRyZW5kZXJWYWxpZGF0aW9uRXJyb3JzICgpIHtcclxuXHRcdGxldCBlcnJvcnMgPSB0aGlzLnByb3BzLmFsZXJ0cy5lcnJvci5kZXRhaWw7XHJcblx0XHRpZiAoZXJyb3JzLm5hbWUgPT09ICdWYWxpZGF0aW9uRXJyb3InKSB7XHJcblx0XHRcdGVycm9ycyA9IGVycm9ycy5lcnJvcnM7XHJcblx0XHR9XHJcblx0XHRsZXQgZXJyb3JDb3VudCA9IE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoO1xyXG5cdFx0bGV0IGFsZXJ0Q29udGVudDtcclxuXHRcdGxldCBtZXNzYWdlcyA9IE9iamVjdC5rZXlzKGVycm9ycykubWFwKChwYXRoKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8bGkga2V5PXtwYXRofT5cclxuXHRcdFx0XHRcdFx0e3VwY2FzZShlcnJvcnNbcGF0aF0uZXJyb3IgfHwgZXJyb3JzW3BhdGhdLm1lc3NhZ2UpfVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IGtleT17cGF0aH0+XHJcblx0XHRcdFx0XHRcdHt1cGNhc2UoZXJyb3JzW3BhdGhdLmVycm9yIHx8IGVycm9yc1twYXRoXS5tZXNzYWdlKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoND5UaGVyZSB3ZXJlIHtlcnJvckNvdW50fSBlcnJvcnMgY3JlYXRpbmcgdGhlIG5ldyBpdGVtOjwvaDQ+XHJcblx0XHRcdFx0XHQ8dWw+e21lc3NhZ2VzfTwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSBtZXNzYWdlcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e2FsZXJ0Q29udGVudH08L0FsZXJ0PjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRsZXQgeyBlcnJvciwgc3VjY2VzcyB9ID0gdGhpcy5wcm9wcy5hbGVydHM7XHJcblx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0Ly8gUmVuZGVyIGVycm9yIGFsZXJ0c1xyXG5cdFx0XHRzd2l0Y2ggKGVycm9yLmVycm9yKSB7XHJcblx0XHRcdFx0Y2FzZSAndmFsaWRhdGlvbiBlcnJvcnMnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdGNhc2UgJ2Vycm9yJzpcclxuXHRcdFx0XHRcdGlmIChlcnJvci5kZXRhaWwubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cImRhbmdlclwiPnt1cGNhc2UoZXJyb3IuZXJyb3IpfTwvQWxlcnQ+O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e3VwY2FzZShlcnJvci5lcnJvcil9PC9BbGVydD47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHQvLyBSZW5kZXIgc3VjY2VzcyBhbGVydHNcclxuXHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cInN1Y2Nlc3NcIj57dXBjYXNlKHN1Y2Nlc3Muc3VjY2Vzcyl9PC9BbGVydD47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7IC8vIE5vIGFsZXJ0cywgcmVuZGVyIG5vdGhpbmdcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRNZXNzYWdlcztcclxuIiwiLyoqXHJcbiAqIFRoZSBmb3JtIHRoYXQncyB2aXNpYmxlIHdoZW4gXCJDcmVhdGUgPEl0ZW1OYW1lPlwiIGlzIGNsaWNrZWQgb24gZWl0aGVyIHRoZVxyXG4gKiBMaXN0IHNjcmVlbiBvciB0aGUgSXRlbSBzY3JlZW5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IEFsZXJ0TWVzc2FnZXMgZnJvbSAnLi9BbGVydE1lc3NhZ2VzJztcclxuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnRmllbGRUeXBlcyc7XHJcbmltcG9ydCBJbnZhbGlkRmllbGRUeXBlIGZyb20gJy4vSW52YWxpZEZpZWxkVHlwZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSwgTW9kYWwgfSBmcm9tICcuLi9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IElmcmFtZUNvbnRlbnQgZnJvbSAnLi9JZnJhbWVDb250ZW50JztcclxuXHJcbmNvbnN0IENyZWF0ZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGVGb3JtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGVycjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25DcmVhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycjogbnVsbCxcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Ly8gU2V0IHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMgd2hlbiBmaXJzdCByZW5kZXJpbmcgdGhlXHJcblx0XHQvLyBmb3JtLiAoSWYgdGhleSBoYXZlIGEgZGVmYXVsdCB2YWx1ZSwgdGhhdCBpcylcclxuXHRcdHZhciB2YWx1ZXMgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMucHJvcHMubGlzdC5maWVsZHMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dmFyIGZpZWxkID0gdGhpcy5wcm9wcy5saXN0LmZpZWxkc1trZXldO1xyXG5cdFx0XHR2YXIgRmllbGRDb21wb25lbnQgPSBGaWVsZHNbZmllbGQudHlwZV07XHJcblx0XHRcdHZhbHVlc1tmaWVsZC5wYXRoXSA9IEZpZWxkQ29tcG9uZW50LmdldERlZmF1bHRWYWx1ZShmaWVsZCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlczogdmFsdWVzLFxyXG5cdFx0XHRhbGVydHM6IHt9LFxyXG5cdFx0XHRzaG93SWZyYW1lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGlmKHRoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzaG93SWZyYW1lOiB0cnVlXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYoIXRoaXMuc3RhdGUuc2hvd0lmcmFtZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGV2dCkge1xyXG5cdFx0aWYgKHZrZXlbZXZ0LmtleUNvZGVdID09PSAnPGVzY2FwZT4nKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdC8vIEhhbmRsZSBpbnB1dCBjaGFuZ2UgZXZlbnRzXHJcblx0aGFuZGxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0dmFyIHZhbHVlcyA9IGFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xyXG5cdFx0dmFsdWVzW2V2ZW50LnBhdGhdID0gZXZlbnQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFNldCB0aGUgcHJvcHMgb2YgYSBmaWVsZFxyXG5cdGdldEZpZWxkUHJvcHMgKGZpZWxkKSB7XHJcblx0XHR2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGZpZWxkKTtcclxuXHRcdHByb3BzLnZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZXNbZmllbGQucGF0aF07XHJcblx0XHRwcm9wcy52YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlcztcclxuXHRcdHByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5tb2RlID0gJ2NyZWF0ZSc7XHJcblx0XHRwcm9wcy5rZXkgPSBmaWVsZC5wYXRoO1xyXG5cdFx0cmV0dXJuIHByb3BzO1xyXG5cdH0sXHJcblx0Ly8gQ3JlYXRlIGEgbmV3IGl0ZW0gd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcclxuXHRzdWJtaXRGb3JtIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGNyZWF0ZUZvcm0gPSBldmVudC50YXJnZXQ7XHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjcmVhdGVGb3JtKTtcclxuXHRcdHRoaXMucHJvcHMubGlzdC5jcmVhdGVJdGVtKGZvcm1EYXRhLCAoZXJyLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMub25DcmVhdGUpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJvcHMub25DcmVhdGUoZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIENsZWFyIGZvcm1cclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHR2YWx1ZXM6IHt9LFxyXG5cdFx0XHRcdFx0XHRhbGVydHM6IHtcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiAnSXRlbSBjcmVhdGVkJyxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghZXJyKSB7XHJcblx0XHRcdFx0XHRlcnIgPSB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiAnY29ubmVjdGlvbiBlcnJvcicsXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJZiB3ZSBnZXQgYSBkYXRhYmFzZSBlcnJvciwgc2hvdyB0aGUgZGF0YWJhc2UgZXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRcdC8vIGluc3RlYWQgb2Ygb25seSBzYXlpbmcgXCJEYXRhYmFzZSBlcnJvclwiXHJcblx0XHRcdFx0aWYgKGVyci5lcnJvciA9PT0gJ2RhdGFiYXNlIGVycm9yJykge1xyXG5cdFx0XHRcdFx0ZXJyLmVycm9yID0gZXJyLmRldGFpbC5lcnJtc2c7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0YWxlcnRzOiB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBlcnIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciB0aGUgZm9ybSBpdHNlbGZcclxuXHRyZW5kZXJGb3JtICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHJcblx0XHR2YXIgZm9ybSA9IFtdO1xyXG5cdFx0dmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3Q7XHJcblx0XHR2YXIgbmFtZUZpZWxkID0gdGhpcy5wcm9wcy5saXN0Lm5hbWVGaWVsZDtcclxuXHRcdHZhciBmb2N1c1dhc1NldDtcclxuXHJcblx0XHQvLyBJZiB0aGUgbmFtZSBmaWVsZCBpcyBhbiBpbml0aWFsIG9uZSwgd2UgbmVlZCB0byByZW5kZXIgYSBwcm9wZXJcclxuXHRcdC8vIGlucHV0IGZvciBpdFxyXG5cdFx0aWYgKGxpc3QubmFtZUlzSW5pdGlhbCkge1xyXG5cdFx0XHR2YXIgbmFtZUZpZWxkUHJvcHMgPSB0aGlzLmdldEZpZWxkUHJvcHMobmFtZUZpZWxkKTtcclxuXHRcdFx0bmFtZUZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHRpZiAobmFtZUZpZWxkLnR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmNsYXNzTmFtZSA9ICdpdGVtLW5hbWUtZmllbGQnO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLnBsYWNlaG9sZGVyID0gbmFtZUZpZWxkLmxhYmVsO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmxhYmVsID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9ybS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGRzW25hbWVGaWVsZC50eXBlXSwgbmFtZUZpZWxkUHJvcHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW5kZXIgaW5wdXRzIGZvciBhbGwgaW5pdGlhbCBmaWVsZHNcclxuXHRcdE9iamVjdC5rZXlzKGxpc3QuaW5pdGlhbEZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgZmllbGQgPSBsaXN0LmZpZWxkc1tsaXN0LmluaXRpYWxGaWVsZHNba2V5XV07XHJcblx0XHRcdC8vIElmIHRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkIHBhc3NlZCBpbiBhcyBmaWVsZCB0eXBlLCByZW5kZXIgdGhlXHJcblx0XHRcdC8vIGludmFsaWQgZmllbGQgdHlwZSBjb21wb25lbnRcclxuXHRcdFx0aWYgKHR5cGVvZiBGaWVsZHNbZmllbGQudHlwZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRmb3JtLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChJbnZhbGlkRmllbGRUeXBlLCB7IHR5cGU6IGZpZWxkLnR5cGUsIHBhdGg6IGZpZWxkLnBhdGgsIGtleTogZmllbGQucGF0aCB9KSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEdldCB0aGUgcHJvcHMgZm9yIHRoZSBpbnB1dCBmaWVsZFxyXG5cdFx0XHR2YXIgZmllbGRQcm9wcyA9IHRoaXMuZ2V0RmllbGRQcm9wcyhmaWVsZCk7XHJcblx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBmb2N1c1JlZiBzZXQgcHJldmlvdXNseSwgc2V0IHRoZSBjdXJyZW50IGZpZWxkIHRvXHJcblx0XHRcdC8vIGJlIHRoZSBvbmUgdG8gYmUgZm9jdXNzZWQuIEdlbmVyYWxseSB0aGUgZmlyc3QgaW5wdXQgZmllbGQsIGlmXHJcblx0XHRcdC8vIHRoZXJlJ3MgYW4gaW5pdGlhbCBuYW1lIGZpZWxkIHRoYXQgdGFrZXMgcHJlY2VkZW5jZS5cclxuXHRcdFx0aWYgKCFmb2N1c1dhc1NldCkge1xyXG5cdFx0XHRcdGZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcm0ucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEZpZWxkc1tmaWVsZC50eXBlXSwgZmllbGRQcm9wcykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm0gbGF5b3V0PVwiaG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19PlxyXG5cdFx0XHRcdDxNb2RhbC5IZWFkZXJcclxuXHRcdFx0XHRcdHRleHQ9eydDcmVhdGUgYSBuZXcgJyArIGxpc3Quc2luZ3VsYXJ9XHJcblx0XHRcdFx0XHRzaG93Q2xvc2VCdXR0b25cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxNb2RhbC5Cb2R5PlxyXG5cdFx0XHRcdFx0PEFsZXJ0TWVzc2FnZXMgYWxlcnRzPXt0aGlzLnN0YXRlLmFsZXJ0c30gLz5cclxuXHRcdFx0XHRcdHtmb3JtfVxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuXHRcdFx0XHQ8TW9kYWwuRm9vdGVyPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBjb2xvcj1cInN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCIgZGF0YS1idXR0b24tdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0XHRDcmVhdGVcclxuXHRcdFx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdFx0ZGF0YS1idXR0b24tdHlwZT1cImNhbmNlbFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdENhbmNlbFxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0PC9Nb2RhbC5Gb290ZXI+XHJcblx0XHRcdDwvRm9ybT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250ZW50KCkge1xyXG5cdFx0Y29uc3Qge3Nob3dJZnJhbWV9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IGlmcmFtZVVSTCA9IGAke0tleXN0b25lLmV4dGVybmFsSG9zdH0ke3RoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZX1gO1xyXG5cclxuXHRcdHJldHVybiAoc2hvd0lmcmFtZSAmJiB0aGlzLnByb3BzLmlzT3BlbikgP1xyXG5cdFx0XHQ8SWZyYW1lQ29udGVudCBzcmM9e2lmcmFtZVVSTH0gc2hvdz17dGhpcy5wcm9wcy5pc09wZW59IG9uQ2FuY2VsPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBvblNhdmU9e3RoaXMucHJvcHMub25DcmVhdGV9IGNsYXNzTmFtZT17XCJmdWxsLXNjcmVlblwifS8+IDpcclxuXHRcdFx0PE1vZGFsLkRpYWxvZyBpc09wZW49e3RoaXMucHJvcHMuaXNPcGVufSBvbkNsb3NlPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBiYWNrZHJvcENsb3Nlc01vZGFsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckZvcm0oKX1cclxuXHRcdFx0PC9Nb2RhbC5EaWFsb2c+XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVGb3JtO1xyXG4iLCIvKipcclxuICogVGhlIGZvcm0gdGhhdCdzIHZpc2libGUgd2hlbiBcIkNyZWF0ZSA8SXRlbU5hbWU+XCIgaXMgY2xpY2tlZCBvbiBlaXRoZXIgdGhlXHJcbiAqIExpc3Qgc2NyZWVuIG9yIHRoZSBJdGVtIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJZnJhbWVDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWZyYW1lQ29udGVudCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvdzogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuaGFuZGxlRnJhbWVUYXNrcywgdGhpcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVGcmFtZVRhc2tzLCB0aGlzKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZyYW1lVGFza3MoZSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcblx0XHRcdHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdjb250ZW50VXBkYXRlJzogXHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhlaWdodDogbWVzc2FnZS5kYXRhXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25TYXZlJzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2F2ZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2F2ZShtZXNzYWdlLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25DYW5jZWwnOlxyXG5cdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlckNvbnRlbnQoKSB7XHJcblx0XHRjb25zdCB7c3JjLCBzaG93LCBjbGFzc05hbWUgPSAnJ30gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaWZyYW1lVVJMID0gYCR7c3JjfT90b2tlbj0ke0tleXN0b25lLnVzZXIudG9rZW59YFxyXG5cdFx0cmV0dXJuIHNob3cgP1xyXG5cdFx0XHQ8aWZyYW1lIGNsYXNzTmFtZT17J2NvbnRlbnQtZnJhbWUgJyArIGNsYXNzTmFtZX0gc3R5bGU9e3toZWlnaHQ6IHRoaXMuc3RhdGUuY29udGVudEhlaWdodH19IHJlZj17KGYpID0+IHRoaXMuaWZyID0gZiB9IHNyYz17aWZyYW1lVVJMfSAvPiA6IDxkaXYgLz5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElmcmFtZUNvbnRlbnQ7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXJzIGFuIFwiSW52YWxpZCBGaWVsZCBUeXBlXCIgZXJyb3JcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgSW52YWxpZEZpZWxkVHlwZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPlxyXG5cdFx0XHRJbnZhbGlkIGZpZWxkIHR5cGUgPHN0cm9uZz57cHJvcHMudHlwZX08L3N0cm9uZz4gYXQgcGF0aCA8c3Ryb25nPntwcm9wcy5wYXRofTwvc3Ryb25nPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkludmFsaWRGaWVsZFR5cGUucHJvcFR5cGVzID0ge1xyXG5cdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZEZpZWxkVHlwZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZGFya2VuLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuZnVuY3Rpb24gS2JkICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLmtiZCk7XHJcblxyXG5cdHJldHVybiA8a2JkIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGtiZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvci5ib2R5LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAzLFxyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICNjY2NgLFxyXG5cdFx0Ym9yZGVyQm90dG9tQ29sb3I6IGRhcmtlbignI2NjYycsIDQpLFxyXG5cdFx0Ym9yZGVyVG9wQ29sb3I6IGxpZ2h0ZW4oJyNjY2MnLCA0KSxcclxuXHRcdGJveFNoYWRvdzogYDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDJweCAwIDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpIGluc2V0YCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0Zm9udEZhbWlseTogJ0NvbnNvbGFzLCBcIkxpYmVyYXRpb24gTW9ub1wiLCBDb3VyaWVyLCBtb25vc3BhY2UnLFxyXG5cdFx0Zm9udFNpemU6ICcwLjg1ZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogNzAwLFxyXG5cdFx0bGluZUhlaWdodDogJ2luaGVyaXQnLFxyXG5cdFx0cGFkZGluZzogJzFweCA0cHgnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblxyXG5cdFx0Ly8gbGl0dGxlIGhhY2sgdG8gdHdlYWsgXCJ2aXN1YWwtbWlkZGxlXCIgYWxpZ25tZW50XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdHRvcDogLTEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gS2JkO1xyXG4iLCIvKipcclxuICogUmVuZGVyIHRoZSBib2R5IG9mIGEgcG9wb3V0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRCb2R5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0Qm9keScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHNjcm9sbGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dF9fYm9keScsIHtcclxuXHRcdFx0J1BvcG91dF9fc2Nyb2xsYWJsZS1hcmVhJzogdGhpcy5wcm9wcy5zY3JvbGxhYmxlLFxyXG5cdFx0fSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScsICdzY3JvbGxhYmxlJyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0Qm9keTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIGZvb3RlciBmb3IgYSBwb3BvdXRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgQlVUVE9OX0JBU0VfQ0xBU1NOQU1FID0gJ1BvcG91dF9fZm9vdGVyX19idXR0b24gUG9wb3V0X19mb290ZXJfX2J1dHRvbi0tJztcclxuXHJcbmNvbnN0IFBvcG91dEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dEZvb3RlcicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXHJcblx0XHRwcmltYXJ5QnV0dG9uQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHByaW1hcnlCdXR0b25Jc1N1Ym1pdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRwcmltYXJ5QnV0dG9uTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRzZWNvbmRhcnlCdXR0b25BY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0c2Vjb25kYXJ5QnV0dG9uTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHQvLyBSZW5kZXIgYSBwcmltYXJ5IGJ1dHRvblxyXG5cdHJlbmRlclByaW1hcnlCdXR0b24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLnByaW1hcnlCdXR0b25MYWJlbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9e3RoaXMucHJvcHMucHJpbWFyeUJ1dHRvbklzU3VibWl0ID8gJ3N1Ym1pdCcgOiAnYnV0dG9uJ31cclxuXHRcdFx0XHRjbGFzc05hbWU9e0JVVFRPTl9CQVNFX0NMQVNTTkFNRSArICdwcmltYXJ5J31cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLnByaW1hcnlCdXR0b25BY3Rpb259XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uTGFiZWx9XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciBhIHNlY29uZGFyeSBidXR0b25cclxuXHRyZW5kZXJTZWNvbmRhcnlCdXR0b24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLnNlY29uZGFyeUJ1dHRvbkFjdGlvbiB8fCAhdGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25MYWJlbCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdGNsYXNzTmFtZT17QlVUVE9OX0JBU0VfQ0xBU1NOQU1FICsgJ3NlY29uZGFyeSd9XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25BY3Rpb259XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25MYWJlbH1cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0X19mb290ZXJcIj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJQcmltYXJ5QnV0dG9uKCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyU2Vjb25kYXJ5QnV0dG9uKCl9XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0Rm9vdGVyO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgaGVhZGVyIGZvciBhIHBvcG91dFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBQb3BvdXRIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRIZWFkZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0bGVmdEFjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRsZWZ0SWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR0cmFuc2l0aW9uRGlyZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWyduZXh0JywgJ3ByZXYnXSksXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhIGxlZnQgYWN0aW9uIGFuZCBhIGxlZnQgaWNvbiwgcmVuZGVyIGEgaGVhZGVyIGJ1dHRvblxyXG5cdFx0dmFyIGhlYWRlckJ1dHRvbiA9ICh0aGlzLnByb3BzLmxlZnRBY3Rpb24gJiYgdGhpcy5wcm9wcy5sZWZ0SWNvbikgPyAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHRrZXk9eydidXR0b25fJyArIHRoaXMucHJvcHMudHJhbnNpdGlvbkRpcmVjdGlvbn1cclxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRjbGFzc05hbWU9eydQb3BvdXRfX2hlYWRlcl9fYnV0dG9uIG9jdGljb24gb2N0aWNvbi0nICsgdGhpcy5wcm9wcy5sZWZ0SWNvbn1cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLmxlZnRBY3Rpb259XHJcblx0XHRcdC8+XHJcblx0XHQpIDogbnVsbDtcclxuXHRcdC8vIElmIHdlIGhhdmUgYSB0aXRsZSwgcmVuZGVyIGl0XHJcblx0XHR2YXIgaGVhZGVyVGl0bGUgPSB0aGlzLnByb3BzLnRpdGxlID8gKFxyXG5cdFx0XHQ8c3BhblxyXG5cdFx0XHRcdGtleT17J3RpdGxlXycgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiUG9wb3V0X19oZWFkZXJfX2xhYmVsXCJcclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpIDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9faGVhZGVyXCI+XHJcblx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPVwiUG9wb3V0X19oZWFkZXJfX2J1dHRvblwiXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e2hlYWRlckJ1dHRvbn1cclxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XHJcblx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPXsnUG9wb3V0X19wYW5lLScgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXszNjB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXszNjB9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e2hlYWRlclRpdGxlfVxyXG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRIZWFkZXI7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdC4gQ2FuIGFsc28gdXNlIFBvcG91dExpc3RJdGVtIGFuZCBQb3BvdXRMaXN0SGVhZGluZ1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5jb25zdCBQb3BvdXRMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0TGlzdCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3Q7XHJcblxyXG4vLyBleHBvc2UgdGhlIGNoaWxkIHRvIHRoZSB0b3AgbGV2ZWwgZXhwb3J0XHJcbm1vZHVsZS5leHBvcnRzLkl0ZW0gPSByZXF1aXJlKCcuL1BvcG91dExpc3RJdGVtJyk7XHJcbm1vZHVsZS5leHBvcnRzLkhlYWRpbmcgPSByZXF1aXJlKCcuL1BvcG91dExpc3RIZWFkaW5nJyk7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdCBoZWFkaW5nXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRMaXN0SGVhZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3RIZWFkaW5nJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2hlYWRpbmcnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnByb3BzfSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0TGlzdEhlYWRpbmc7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBwb3BvdXQgbGlzdCBpdGVtXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRMaXN0SXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3RJdGVtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRpY29uSG92ZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRob3ZlcjogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aG92ZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiB0cnVlIH0pO1xyXG5cdH0sXHJcblx0dW5ob3ZlciAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgaG92ZXI6IGZhbHNlIH0pO1xyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIGFuIGljb25cclxuXHRyZW5kZXJJY29uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pY29uKSByZXR1cm4gbnVsbDtcclxuXHRcdGNvbnN0IGljb24gPSB0aGlzLnN0YXRlLmhvdmVyICYmIHRoaXMucHJvcHMuaWNvbkhvdmVyID8gdGhpcy5wcm9wcy5pY29uSG92ZXIgOiB0aGlzLnByb3BzLmljb247XHJcblx0XHRjb25zdCBpY29uQ2xhc3NuYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdF9faXRlbV9faWNvbiBvY3RpY29uJywgKCdvY3RpY29uLScgKyBpY29uKSk7XHJcblxyXG5cdFx0cmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzbmFtZX0gLz47XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgaXRlbUNsYXNzbmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2l0ZW0nLCB7XHJcblx0XHRcdCdpcy1zZWxlY3RlZCc6IHRoaXMucHJvcHMuaXNTZWxlY3RlZCxcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScsICdpY29uJywgJ2ljb25Ib3ZlcicsICdpc1NlbGVjdGVkJywgJ2xhYmVsJyk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMubGFiZWx9XHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtpdGVtQ2xhc3NuYW1lfVxyXG5cdFx0XHRcdG9uRm9jdXM9e3RoaXMuaG92ZXJ9XHJcblx0XHRcdFx0b25CbHVyPXt0aGlzLnVuaG92ZXJ9XHJcblx0XHRcdFx0b25Nb3VzZU92ZXI9e3RoaXMuaG92ZXJ9XHJcblx0XHRcdFx0b25Nb3VzZU91dD17dGhpcy51bmhvdmVyfVxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckljb24oKX1cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJQb3BvdXRMaXN0X19pdGVtX19sYWJlbFwiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFiZWx9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3RJdGVtO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IHBhbmUsIGNhbGxzIHByb3BzLm9uTGF5b3V0IHdoZW4gdGhlIGNvbXBvbmVudCBtb3VudHNcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxudmFyIFBvcG91dFBhbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRQYW5lJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b25MYXlvdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG9uTGF5b3V0OiAoKSA9PiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uTGF5b3V0KHRoaXMucmVmcy5lbC5vZmZzZXRIZWlnaHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dF9fcGFuZScsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnb25MYXlvdXQnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHJlZj1cImVsXCIgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dFBhbmU7XHJcbiIsIi8qKlxyXG4gKiBBIFBvcG91dCBjb21wb25lbnQuXHJcbiAqIE9uZSBjYW4gYWxzbyBhZGQgYSBIZWFkZXIgKFBvcG91dC9IZWFkZXIpLCBhIEZvb3RlclxyXG4gKiAoUG9wb3V0L0Zvb3RlciksIGEgQm9keSAoUG9wb3V0L0JvZHkpIGFuZCBhIFBhbiAoUG9wb3V0L1BhbmUpLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi4vUG9ydGFsJztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuXHJcbmNvbnN0IFNJWkVTID0ge1xyXG5cdGFycm93SGVpZ2h0OiAxMixcclxuXHRhcnJvd1dpZHRoOiAxNixcclxuXHRob3Jpem9udGFsTWFyZ2luOiAyMCxcclxufTtcclxuXHJcbnZhciBQb3BvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aXNPcGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU3VibWl0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHJlbGF0aXZlVG9JRDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6IDMyMCxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5pc09wZW4pIHtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24pO1xyXG5cdFx0XHR0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKG5leHRQcm9wcy5pc09wZW4pO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmlzT3BlbiAmJiAhbmV4dFByb3BzLmlzT3Blbikge1xyXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbik7XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRQb3J0YWxET01Ob2RlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlZnMucG9ydGFsLmdldFBvcnRhbERPTU5vZGUoKTtcclxuXHR9LFxyXG5cdGNhbGN1bGF0ZVBvc2l0aW9uIChpc09wZW4pIHtcclxuXHRcdGlmICghaXNPcGVuKSByZXR1cm47XHJcblx0XHRsZXQgcG9zTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucHJvcHMucmVsYXRpdmVUb0lEKTtcclxuXHJcblx0XHRjb25zdCBwb3MgPSB7XHJcblx0XHRcdHRvcDogMCxcclxuXHRcdFx0bGVmdDogMCxcclxuXHRcdFx0d2lkdGg6IHBvc05vZGUub2Zmc2V0V2lkdGgsXHJcblx0XHRcdGhlaWdodDogcG9zTm9kZS5vZmZzZXRIZWlnaHQsXHJcblx0XHR9O1xyXG5cdFx0d2hpbGUgKHBvc05vZGUub2Zmc2V0UGFyZW50KSB7XHJcblx0XHRcdHBvcy50b3AgKz0gcG9zTm9kZS5vZmZzZXRUb3A7XHJcblx0XHRcdHBvcy5sZWZ0ICs9IHBvc05vZGUub2Zmc2V0TGVmdDtcclxuXHRcdFx0cG9zTm9kZSA9IHBvc05vZGUub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5tYXgocG9zLmxlZnQgKyAocG9zLndpZHRoIC8gMikgLSAodGhpcy5wcm9wcy53aWR0aCAvIDIpLCBTSVpFUy5ob3Jpem9udGFsTWFyZ2luKTtcclxuXHRcdGxldCB0b3BPZmZzZXQgPSBwb3MudG9wICsgcG9zLmhlaWdodCArIFNJWkVTLmFycm93SGVpZ2h0O1xyXG5cclxuXHRcdHZhciBzcGFjZU9uUmlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIChsZWZ0T2Zmc2V0ICsgdGhpcy5wcm9wcy53aWR0aCArIFNJWkVTLmhvcml6b250YWxNYXJnaW4pO1xyXG5cdFx0aWYgKHNwYWNlT25SaWdodCA8IDApIHtcclxuXHRcdFx0bGVmdE9mZnNldCA9IGxlZnRPZmZzZXQgKyBzcGFjZU9uUmlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgYXJyb3dMZWZ0T2Zmc2V0ID0gbGVmdE9mZnNldCA9PT0gU0laRVMuaG9yaXpvbnRhbE1hcmdpblxyXG5cdFx0XHQ/IHBvcy5sZWZ0ICsgKHBvcy53aWR0aCAvIDIpIC0gKFNJWkVTLmFycm93V2lkdGggLyAyKSAtIFNJWkVTLmhvcml6b250YWxNYXJnaW5cclxuXHRcdFx0OiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IG5ld1N0YXRlQXZhbGlhYmxlID0gdGhpcy5zdGF0ZS5sZWZ0T2Zmc2V0ICE9PSBsZWZ0T2Zmc2V0XHJcblx0XHRcdHx8IHRoaXMuc3RhdGUudG9wT2Zmc2V0ICE9PSB0b3BPZmZzZXRcclxuXHRcdFx0fHwgdGhpcy5zdGF0ZS5hcnJvd0xlZnRPZmZzZXQgIT09IGFycm93TGVmdE9mZnNldDtcclxuXHJcblx0XHRpZiAobmV3U3RhdGVBdmFsaWFibGUpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bGVmdE9mZnNldDogbGVmdE9mZnNldCxcclxuXHRcdFx0XHR0b3BPZmZzZXQ6IHRvcE9mZnNldCxcclxuXHRcdFx0XHRhcnJvd0xlZnRPZmZzZXQ6IGFycm93TGVmdE9mZnNldCxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXJQb3BvdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgeyB3aWR0aCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgYXJyb3dMZWZ0T2Zmc2V0LCBsZWZ0T2Zmc2V0OiBsZWZ0LCB0b3BPZmZzZXQ6IHRvcCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBhcnJvd1N0eWxlcyA9IGFycm93TGVmdE9mZnNldFxyXG5cdFx0XHQ/IHsgbGVmdDogMCwgbWFyZ2luTGVmdDogYXJyb3dMZWZ0T2Zmc2V0IH1cclxuXHRcdFx0OiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0XCIgc3R5bGU9e3sgbGVmdCwgdG9wLCB3aWR0aCB9fT5cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJQb3BvdXRfX2Fycm93XCIgc3R5bGU9e2Fycm93U3R5bGVzfSAvPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiUG9wb3V0X19pbm5lclwiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckJsb2Nrb3V0ICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJsb2Nrb3V0XCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz47XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFBvcnRhbCBjbGFzc05hbWU9XCJQb3BvdXQtd3JhcHBlclwiIHJlZj1cInBvcnRhbFwiPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXsyMDB9XHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cIlBvcG91dFwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyUG9wb3V0KCl9XHJcblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckJsb2Nrb3V0KCl9XHJcblx0XHRcdDwvUG9ydGFsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0O1xyXG5cclxuLy8gZXhwb3NlIHRoZSBjaGlsZCB0byB0aGUgdG9wIGxldmVsIGV4cG9ydFxyXG5tb2R1bGUuZXhwb3J0cy5IZWFkZXIgPSByZXF1aXJlKCcuL1BvcG91dEhlYWRlcicpO1xyXG5tb2R1bGUuZXhwb3J0cy5Cb2R5ID0gcmVxdWlyZSgnLi9Qb3BvdXRCb2R5Jyk7XHJcbm1vZHVsZS5leHBvcnRzLkZvb3RlciA9IHJlcXVpcmUoJy4vUG9wb3V0Rm9vdGVyJyk7XHJcbm1vZHVsZS5leHBvcnRzLlBhbmUgPSByZXF1aXJlKCcuL1BvcG91dFBhbmUnKTtcclxuIiwiLyoqXHJcbiAqIFVzZWQgYnkgdGhlIFBvcG91dCBjb21wb25lbnQgYW5kIHRoZSBMaWdodGJveCBjb21wb25lbnQgb2YgdGhlIGZpZWxkcyBmb3JcclxuICogcG9wb3V0cy4gUmVuZGVycyBhIG5vbi1yZWFjdCBET00gbm9kZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9ydGFsJyxcclxuXHRwb3J0YWxFbGVtZW50OiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcclxuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IGVsO1xyXG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHRSZWFjdERPTS5yZW5kZXIoPGRpdiB7Li4udGhpcy5wcm9wc30gLz4sIHRoaXMucG9ydGFsRWxlbWVudCk7XHJcblx0fSxcclxuXHRnZXRQb3J0YWxET01Ob2RlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnBvcnRhbEVsZW1lbnQ7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxufSk7XHJcbiIsIi8qKlxyXG4gKiBDb25zdGFudHNcclxuICovXHJcblxyXG4vLyBicmVha3BvaW50c1xyXG5leHBvcnRzLmJyZWFrcG9pbnQgPSB7XHJcblx0eHM6IDQ4MCxcclxuXHRzbTogNzY4LFxyXG5cdG1kOiA5OTIsXHJcblx0bGc6IDEyMDAsXHJcbn07XHJcblxyXG4vLyBib3JkZXIgcmFkaWlcclxuZXhwb3J0cy5ib3JkZXJSYWRpdXMgPSB7XHJcblx0eHM6IDIsXHJcblx0c206IDQsXHJcblx0bWQ6IDgsXHJcblx0bGc6IDE2LFxyXG5cdHhsOiAzMixcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcbmV4cG9ydHMuY29sb3IgPSB7XHJcblx0YXBwRGFuZ2VyOiAnI2Q2NDI0MicsXHJcblx0YXBwSW5mbzogJyM1NmNkZmMnLFxyXG5cdGFwcFByaW1hcnk6ICcjMTM4NWU1JyxcclxuXHRhcHBTdWNjZXNzOiAnIzM0YzI0MCcsXHJcblx0YXBwV2FybmluZzogJyNmYTlmNDcnLFxyXG59O1xyXG5cclxuLy8gc3BhY2luZ1xyXG5leHBvcnRzLnNwYWNpbmcgPSB7XHJcblx0eHM6IDUsXHJcblx0c206IDEwLFxyXG5cdG1kOiAyMCxcclxuXHRsZzogNDAsXHJcblx0eGw6IDgwLFxyXG59O1xyXG5cclxuLy8gdGFibGUgY29uc3RhbnRzXHJcblxyXG5leHBvcnRzLlRBQkxFX0NPTlRST0xfQ09MVU1OX1dJRFRIID0gMjY7ICAvLyBpY29uICsgcGFkZGluZ1xyXG5leHBvcnRzLk5FVFdPUktfRVJST1JfUkVUUllfREVMQVkgPSA1MDA7IC8vIGluIG1zXHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGtleS1zcGFjaW5nICovXHJcbmNvbnN0IHRoZW1lID0ge307XHJcbmNvbnN0IHsgYmxlbmQsIGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9ID0gcmVxdWlyZSgnLi91dGlscy9jb2xvcicpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENPTU1PTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIGJyZWFrcG9pbnRcclxuXHJcbnRoZW1lLmJyZWFrcG9pbnROdW1lcmljID0ge1xyXG5cdG1vYmlsZTogICAgICAgICAgIDQ4MCxcclxuXHR0YWJsZXRQb3J0cmFpdDogICA3NjgsXHJcblx0dGFibGV0TGFuZHNjYXBlOiAgOTkyLFxyXG5cdGRlc2t0b3A6ICAgICAgICAgIDEyMDAsXHJcbn07XHJcbnRoZW1lLmJyZWFrcG9pbnQgPSB7XHJcblx0dGFibGV0UG9ydHJhaXRNaW46ICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgMSkgKyAncHgnLFxyXG5cdHRhYmxldExhbmRzY2FwZU1pbjogKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgMSkgKyAncHgnLFxyXG5cdGRlc2t0b3BNaW46ICAgICAgICAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTGFyZ2VNaW46ICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgMSkgKyAncHgnLFxyXG5cclxuXHRtb2JpbGVNYXg6ICAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUgKyAncHgnLFxyXG5cdHRhYmxldFBvcnRyYWl0TWF4OiAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNYXg6ICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAncHgnLFxyXG5cdGRlc2t0b3BNYXg6ICAgICAgICAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLmRlc2t0b3AgKyAncHgnLFxyXG59O1xyXG5cclxuLy8gY29udGFpbmVyXHJcblxyXG50aGVtZS5jb250YWluZXIgPSB7XHJcblx0Z3V0dGVyOiAyMCxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogIDc1MCxcclxuXHRcdG1lZGl1bTogOTcwLFxyXG5cdFx0bGFyZ2U6IDExNzAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcblxyXG50aGVtZS5jb2xvciA9IHtcclxuXHRib2R5OiAgICAgICAgICAgICAgICAnI2ZhZmFmYScsXHJcblx0bGluazogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGxpbmtIb3ZlcjogICAgICAgICAgIGxpZ2h0ZW4oJyMxMzg1ZTUnLCAxMCksXHJcblx0dGV4dDogICAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cclxuXHQvLyBjb250ZXh0dWFsXHJcblx0c3VjY2VzczogICAgICAgICAgICAgJyMzNGMyNDAnLFxyXG5cdGNyZWF0ZTogICAgICAgICAgICAgICcjMzRjMjQwJywgLy8gYWxpYXMgZm9yIHN1Y2Nlc3NcclxuXHRwcmltYXJ5OiAgICAgICAgICAgICAnIzEzODVlNScsXHJcblx0aW5mbzogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLCAvLyBhbGlhcyBmb3IgcHJpbWFyeVxyXG5cdHdhcm5pbmc6ICAgICAgICAgICAgICcjRkEzJyxcclxuXHRkYW5nZXI6ICAgICAgICAgICAgICAnI2Q2NDI0MicsXHJcblx0ZXJyb3I6ICAgICAgICAgICAgICAgJyNkNjQyNDInLCAvLyBhbGlhcyBmb3IgZGFuZ2VyXHJcblxyXG5cdC8vIG5ldXRyYWxzXHJcblx0Z3JheTkwOiAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cdGdyYXk4MDogICAgICAgICAgICAgICcjMzMzJyxcclxuXHRncmF5NzA6ICAgICAgICAgICAgICAnIzRENEQ0RCcsXHJcblx0Z3JheTYwOiAgICAgICAgICAgICAgJyM2NjYnLFxyXG5cdGdyYXk1MDogICAgICAgICAgICAgICcjN0Y3RjdGJyxcclxuXHRncmF5NDA6ICAgICAgICAgICAgICAnIzk5OScsXHJcblx0Z3JheTMwOiAgICAgICAgICAgICAgJyNCM0IzQjMnLFxyXG5cdGdyYXkyMDogICAgICAgICAgICAgICcjQ0NDJyxcclxuXHRncmF5MTU6ICAgICAgICAgICAgICAnI0Q5RDlEOScsXHJcblx0Z3JheTEwOiAgICAgICAgICAgICAgJyNFNUU1RTUnLFxyXG5cdGdyYXkwNTogICAgICAgICAgICAgICcjRjJGMkYyJyxcclxuXHJcblx0Ly8gc29jaWFsXHJcblx0ZmFjZWJvb2s6ICAgICAgICAgICAgJyMzQjU5OTgnLFxyXG5cdGdvb2dsZTogICAgICAgICAgICAgICcjREM0RTQxJyxcclxuXHRpbnN0YWdyYW06ICAgICAgICAgICAnIzNmNzI5YicsXHJcblx0cGludGVyZXN0OiAgICAgICAgICAgJyNiZDA4MWMnLFxyXG5cdHR1bWJscjogICAgICAgICAgICAgICcjMzU0NjVjJyxcclxuXHR0d2l0dGVyOiAgICAgICAgICAgICAnIzU1QUNFRScsXHJcblx0eW91dHViZTogICAgICAgICAgICAgJyNjZDIwMWYnLFxyXG5cdHZpbWVvOiAgICAgICAgICAgICAgICcjMWFiN2VhJyxcclxufTtcclxuXHJcbi8vIGJvcmRlciByYWRpaVxyXG5cclxudGhlbWUuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHNtYWxsOiAnMC4xMjVyZW0nLFxyXG5cdGRlZmF1bHQ6ICcwLjNyZW0nLFxyXG5cdGxhcmdlOiAnMC41cmVtJyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuXHJcbnRoZW1lLnNwYWNpbmcgPSB7XHJcblx0eHNtYWxsOiAgICAgIDUsXHJcblx0c21hbGw6ICAgICAgIDEwLFxyXG5cdGRlZmF1bHQ6ICAgICAyMCxcclxuXHRsYXJnZTogICAgICAgMzAsXHJcblx0eGxhcmdlOiAgICAgIDQwLFxyXG5cdHh4bGFyZ2U6ICAgICA2MCxcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBFTEVNRU5UQUwgU1BFQ0lGSUNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBidXR0b25cclxuXHJcbnRoZW1lLmJ1dHRvbiA9IHtcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGZvbnQ6IHtcclxuXHRcdHdlaWdodDogNTAwLFxyXG5cdH0sXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcxZW0nLFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0cHJpbWFyeToge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5wcmltYXJ5LCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0fSxcclxuXHRzdWNjZXNzOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR9LFxyXG5cdHdhcm5pbmc6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3Iud2FybmluZywgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0ZGFuZ2VyOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IuZGFuZ2VyLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gYmxhbmsgc3RhdGVcclxuXHJcbnRoZW1lLmJsYW5rc3RhdGUgPSB7XHJcblx0YmFja2dyb3VuZDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDQpLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJzJlbScsXHJcblx0cGFkZGluZ1ZlcnRpY2FsOiAnNGVtJyxcclxufTtcclxuXHJcbi8vIGZvbnRcclxuXHJcbnRoZW1lLmZvbnQgPSB7XHJcblx0ZmFtaWx5OiB7XHJcblx0XHRtb25vOiAnTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlJyxcclxuXHRcdHNhbnNTZXJpZjogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXHJcblx0XHRzZXJpZjogJ0dlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmJyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHh4c21hbGw6ICcwLjY1cmVtJyxcclxuXHRcdHhzbWFsbDogJzAuNzVyZW0nLFxyXG5cdFx0c21hbGw6ICcwLjg1cmVtJyxcclxuXHRcdGRlZmF1bHQ6ICcxcmVtJyxcclxuXHRcdG1lZGl1bTogJzEuMnJlbScsXHJcblx0XHRsYXJnZTogJzEuNnJlbScsXHJcblx0XHR4bGFyZ2U6ICcyLjRyZW0nLFxyXG5cdFx0eHhsYXJnZTogJzMuMnJlbScsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGZvcm1cclxuXHJcbnRoZW1lLmZvcm0gPSB7XHJcblx0bGFiZWw6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NTAsXHJcblx0XHRmb250U2l6ZTogJzFyZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogJ25vcm1hbCcsXHJcblx0XHR3aWR0aDogMTgwLFxyXG5cdH0sXHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGZvbnRTaXplOiAnMC45ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnRcclxuXHJcbnRoZW1lLmNvbXBvbmVudCA9IHtcclxuXHRsaW5lSGVpZ2h0OiAnMi4zZW0nLFxyXG5cdGhlaWdodDogJzIuNGVtJyxcclxuXHRwYWRkaW5nOiAnMWVtJyxcclxufTtcclxuXHJcbi8vIGlucHV0XHJcblxyXG50aGVtZS5pbnB1dCA9IHtcclxuXHRiYWNrZ3JvdW5kOiB7XHJcblx0XHRkZWZhdWx0OiAnd2hpdGUnLFxyXG5cdFx0ZGlzYWJsZWQ6ICcjZmFmYWZhJyxcclxuXHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDIpLFxyXG5cdH0sXHJcblx0cGxhY2Vob2xkZXJDb2xvcjogJyNhYWEnLFxyXG5cdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdGhlaWdodDogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRib3JkZXI6IHtcclxuXHRcdGNvbG9yOiB7XHJcblx0XHRcdGRlZmF1bHQ6ICcjY2NjJyxcclxuXHRcdFx0Zm9jdXM6IHRoZW1lLmNvbG9yLmluZm8sXHJcblx0XHRcdGhvdmVyOiAnI2JiYicsXHJcblx0XHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDgpLFxyXG5cdFx0fSxcclxuXHRcdHJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG5cdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScsXHJcblx0Ym94U2hhZG93Rm9jdXM6IGBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IuaW5mbywgMTApfWAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcuNzVlbScsXHJcbn07XHJcblxyXG4vLyBzZWxlY3RcclxuXHJcbnRoZW1lLnNlbGVjdCA9IHtcclxuXHRib3hTaGFkb3c6ICcwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG59O1xyXG5cclxuLy8gYWxlcnRcclxuXHJcbnRoZW1lLmFsZXJ0ID0ge1xyXG5cdHBhZGRpbmc6ICcwLjc1ZW0gIDFlbScsXHJcblx0bWFyZ2luOiAnMCAwIDFlbScsXHJcblx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdH0sXHJcblx0XHRpbmZvOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR9LFxyXG5cdFx0d2FybmluZzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGdseXBoXHJcblxyXG50aGVtZS5nbHlwaCA9IHtcclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRpbmhlcml0OiAnaW5oZXJpdCcsXHJcblx0XHRpbnZlcnRlZDogJ3doaXRlJyxcclxuXHRcdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOiAxNixcclxuXHRcdG1lZGl1bTogMzIsXHJcblx0XHRsYXJnZTogNjQsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIG1vZGFsXHJcblxyXG50aGVtZS5tb2RhbCA9IHtcclxuXHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjgpJyxcclxuXHR6SW5kZXg6IDEwMCxcclxuXHRwYWRkaW5nOiB7XHJcblx0XHRkaWFsb2c6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogJzFlbScsXHJcblx0XHRcdHZlcnRpY2FsOiAwLFxyXG5cdFx0fSxcclxuXHRcdGJvZHk6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzFlbScsXHJcblx0XHR9LFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMC42ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gcGFnaW5hdGlvblxyXG5cclxudGhlbWUucGFnaW5hdGlvbiA9IHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cclxuXHRob3Zlcjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3doaXRlJyxcclxuXHRcdGJvcmRlcjogJ3JnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0c2VsZWN0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyxcclxuXHRcdGJvcmRlcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHNwaW5uZXJcclxuXHJcbnRoZW1lLnNwaW5uZXIgPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDpcdDQsXHJcblx0XHRtZWRpdW06XHQ4LFxyXG5cdFx0bGFyZ2U6XHQxNixcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcclxuIiwiLyoqXHJcbiAqIEhlbHBlciBtZXRob2QgdG8gaGFuZGxlIExpc3Qgb3BlcmF0aW9ucywgZS5nLiBjcmVhdGluZyBpdGVtcywgZGVsZXRpbmcgaXRlbXMsXHJcbiAqIGdldHRpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhvc2UgbGlzdHMsIGV0Yy5cclxuICovXHJcblxyXG5jb25zdCBsaXN0VG9BcnJheSA9IHJlcXVpcmUoJ2xpc3QtdG8tYXJyYXknKTtcclxuY29uc3QgcXMgPSByZXF1aXJlKCdxcycpO1xyXG5jb25zdCB4aHIgPSByZXF1aXJlKCd4aHInKTtcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG4vLyBGaWx0ZXJzIGZvciB0cnV0aHkgZWxlbWVudHMgaW4gYW4gYXJyYXlcclxuY29uc3QgdHJ1dGh5ID0gKGkpID0+IGk7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb2x1bW5zIG9mIGEgbGlzdCwgc3RydWN0dXJlZCBieSBmaWVsZHMgYW5kIGhlYWRpbmdzXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gbGlzdCBUaGUgbGlzdCB3ZSB3YW50IHRoZSBjb2x1bW5zIG9mXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICBUaGUgY29sdW1uc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29sdW1ucyhsaXN0KSB7XHJcblx0cmV0dXJuIGxpc3QudWlFbGVtZW50cy5tYXAoKGNvbCkgPT4ge1xyXG5cdFx0aWYgKGNvbC50eXBlID09PSAnaGVhZGluZycpIHtcclxuXHRcdFx0cmV0dXJuIHsgdHlwZTogJ2hlYWRpbmcnLCBjb250ZW50OiBjb2wuY29udGVudCB9O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGZpZWxkID0gbGlzdC5maWVsZHNbY29sLmZpZWxkXTtcclxuXHRcdFx0cmV0dXJuIGZpZWxkID8geyB0eXBlOiAnZmllbGQnLCBmaWVsZDogZmllbGQsIHRpdGxlOiBmaWVsZC5sYWJlbCwgcGF0aDogZmllbGQucGF0aCB9IDogbnVsbDtcclxuXHRcdH1cclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1ha2UgYW4gYXJyYXkgb2YgZmlsdGVycyBhbiBvYmplY3Qga2V5ZWQgYnkgdGhlIGZpbHRlcmluZyBwYXRoXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSBmaWx0ZXJBcnJheSBUaGUgYXJyYXkgb2YgZmlsdGVyc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgVGhlIGNvcnJlY3RlZCBmaWx0ZXJzLCBrZXllZCBieSBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlckFycmF5KSB7XHJcblx0dmFyIGZpbHRlcnMgPSB7fTtcclxuXHRmaWx0ZXJBcnJheS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcclxuXHRcdGZpbHRlcnNbZmlsdGVyLmZpZWxkLnBhdGhdID0gZmlsdGVyLnZhbHVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBmaWx0ZXJzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc29ydGluZyBzdHJpbmcgZm9yIHRoZSBVUklcclxuICpcclxuICogQHBhcmFtICB7QXJyYXl9IHNvcnQucGF0aHMgVGhlIHBhdGhzIHdlIHdhbnQgdG8gc29ydFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICBBbGwgdGhlIHNvcnRpbmcgcXVlcmllcyB3ZSB3YW50IGFzIGEgc3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTb3J0U3RyaW5nKHNvcnQpIHtcclxuXHRyZXR1cm4gc29ydC5wYXRocy5tYXAoaSA9PiB7XHJcblx0XHQvLyBJZiB3ZSB3YW50IHRvIHNvcnQgaW52ZXJ0ZWQsIHdlIHByZWZpeCBhIFwiLVwiIGJlZm9yZSB0aGUgc29ydCBwYXRoXHJcblx0XHRyZXR1cm4gaS5pbnZlcnQgPyAnLScgKyBpLnBhdGggOiBpLnBhdGg7XHJcblx0fSkuZmlsdGVyKHRydXRoeSkuam9pbignLCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIGEgcXVlcnkgc3RyaW5nIGZyb20gYSBidW5jaCBvZiBvcHRpb25zXHJcbiAqL1xyXG5mdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9wdGlvbnMpIHtcclxuXHRjb25zdCBxdWVyeSA9IHt9O1xyXG5cdGlmIChvcHRpb25zLnNlYXJjaCkgcXVlcnkuc2VhcmNoID0gb3B0aW9ucy5zZWFyY2g7XHJcblx0aWYgKG9wdGlvbnMuZmlsdGVycy5sZW5ndGgpIHF1ZXJ5LmZpbHRlcnMgPSBKU09OLnN0cmluZ2lmeShnZXRGaWx0ZXJzKG9wdGlvbnMuZmlsdGVycykpO1xyXG5cdGlmIChvcHRpb25zLmNvbHVtbnMpIHF1ZXJ5LmZpZWxkcyA9IG9wdGlvbnMuY29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKTtcclxuXHRpZiAob3B0aW9ucy5wYWdlICYmIG9wdGlvbnMucGFnZS5zaXplKSBxdWVyeS5saW1pdCA9IG9wdGlvbnMucGFnZS5zaXplO1xyXG5cdGlmIChvcHRpb25zLnBhZ2UgJiYgb3B0aW9ucy5wYWdlLmluZGV4ID4gMSkgcXVlcnkuc2tpcCA9IChvcHRpb25zLnBhZ2UuaW5kZXggLSAxKSAqIG9wdGlvbnMucGFnZS5zaXplO1xyXG5cdGlmIChvcHRpb25zLnNvcnQpIHF1ZXJ5LnNvcnQgPSBnZXRTb3J0U3RyaW5nKG9wdGlvbnMuc29ydCk7XHJcblx0cXVlcnkuZXhwYW5kUmVsYXRpb25zaGlwRmllbGRzID0gdHJ1ZTtcclxuXHJcblx0Ly8gQ3VzdG9tIEZpbHRlciB0byBGZXRjaCBhbGwgUmVjb3JkcyBXaGlsZSBTZWxlY3RpbmcgTWFuYWdlIEFsbFxyXG5cclxuXHRpZiAob3B0aW9ucy5maWx0ZXJzLmZldGNoX2FsbF9kYXRhKSB7XHJcblx0XHRxdWVyeS5saW1pdCA9IG9wdGlvbnMuZmlsdGVycy5pdGVtX2NvdW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICc/JyArIHFzLnN0cmluZ2lmeShxdWVyeSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIG1haW4gbGlzdCBoZWxwZXIgY2xhc3NcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICovXHJcbmNvbnN0IExpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdC8vIFRPRE8gdGhlc2Ugb3B0aW9ucyBhcmUgcG9zc2libHkgdW51c2VkXHJcblx0YXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cdHRoaXMuY29sdW1ucyA9IGdldENvbHVtbnModGhpcyk7XHJcblx0dGhpcy5leHBhbmRlZERlZmF1bHRDb2x1bW5zID0gdGhpcy5leHBhbmRDb2x1bW5zKHRoaXMuZGVmYXVsdENvbHVtbnMpO1xyXG5cdHRoaXMuZGVmYXVsdENvbHVtblBhdGhzID0gdGhpcy5leHBhbmRlZERlZmF1bHRDb2x1bW5zLm1hcChpID0+IGkucGF0aCkuam9pbignLCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpdGVtIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0Zvcm1EYXRhfSBmb3JtRGF0YSBUaGUgc3VibWl0dGVkIGZvcm0gZGF0YVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHRoZSBBUEkgY2FsbFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuY3JlYXRlSXRlbSA9IGZ1bmN0aW9uIChmb3JtRGF0YSwgY2FsbGJhY2spIHtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiBgJHtLZXlzdG9uZS5hZG1pblBhdGh9L2FwaS8ke3RoaXMucGF0aH0vY3JlYXRlYCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGJvZHk6IGZvcm1EYXRhLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIGNhbGxiYWNrKGVycik7XHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBOT1RFOiB4aHIgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBFcnJvciBpZlxyXG5cdFx0XHQvLyAgdGhlcmUgaXMgYW4gZXJyb3IgaW4gdGhlIGJyb3dzZXIgdGhhdCBwcmV2ZW50c1xyXG5cdFx0XHQvLyAgc2VuZGluZyB0aGUgcmVxdWVzdC4gQSBIVFRQIDUwMCByZXNwb25zZSBpcyBub3RcclxuXHRcdFx0Ly8gIGdvaW5nIHRvIGNhdXNlIGFuIGVycm9yIHRvIGJlIHJldHVybmVkLlxyXG5cdFx0XHRjYWxsYmFjayhkYXRhLCBudWxsKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgYSBzcGVjaWZpYyBpdGVtXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICBUaGUgaWQgb2YgdGhlIGl0ZW0gd2Ugd2FudCB0byB1cGRhdGVcclxuICogQHBhcmFtICB7Rm9ybURhdGF9IGZvcm1EYXRhIFRoZSBzdWJtaXR0ZWQgZm9ybSBkYXRhXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdGhlIEFQSSBjYWxsXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24gKGlkLCBmb3JtRGF0YSwgY2FsbGJhY2spIHtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiBgJHtLZXlzdG9uZS5hZG1pblBhdGh9L2FwaS8ke3RoaXMucGF0aH0vJHtpZH1gLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdFx0Ym9keTogZm9ybURhdGEsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbkxpc3QucHJvdG90eXBlLmV4cGFuZENvbHVtbnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRsZXQgbmFtZUluY2x1ZGVkID0gZmFsc2U7XHJcblx0Y29uc3QgY29scyA9IGxpc3RUb0FycmF5KGlucHV0KS5tYXAoaSA9PiB7XHJcblx0XHRjb25zdCBzcGxpdCA9IGkuc3BsaXQoJ3wnKTtcclxuXHRcdGxldCBwYXRoID0gc3BsaXRbMF07XHJcblx0XHRsZXQgd2lkdGggPSBzcGxpdFsxXTtcclxuXHRcdGlmIChwYXRoID09PSAnX19uYW1lX18nKSB7XHJcblx0XHRcdHBhdGggPSB0aGlzLm5hbWVQYXRoO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1twYXRoXTtcclxuXHRcdGlmICghZmllbGQpIHtcclxuXHRcdFx0Ly8gVE9ETzogU3VwcG9ydCBhcmJpdGFyeSBkb2N1bWVudCBwYXRoc1xyXG5cdFx0XHRpZiAoIXRoaXMuaGlkZGVuKSB7XHJcblx0XHRcdFx0aWYgKHBhdGggPT09IHRoaXMubmFtZVBhdGgpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTGlzdCAke3RoaXMua2V5fSBkaWQgbm90IHNwZWNpZnkgYW55IGRlZmF1bHQgY29sdW1ucyBvciBhIG5hbWUgZmllbGRgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBMaXN0ICR7dGhpcy5rZXl9IHNwZWNpZmllZCBhbiBpbnZhbGlkIGRlZmF1bHQgY29sdW1uOiAke3BhdGh9YCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmIChwYXRoID09PSB0aGlzLm5hbWVQYXRoKSB7XHJcblx0XHRcdG5hbWVJbmNsdWRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWVsZDogZmllbGQsXHJcblx0XHRcdGxhYmVsOiBmaWVsZC5sYWJlbCxcclxuXHRcdFx0cGF0aDogZmllbGQucGF0aCxcclxuXHRcdFx0dHlwZTogZmllbGQudHlwZSxcclxuXHRcdFx0d2lkdGg6IHdpZHRoLFxyXG5cdFx0fTtcclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxuXHRpZiAoIW5hbWVJbmNsdWRlZCkge1xyXG5cdFx0Y29scy51bnNoaWZ0KHtcclxuXHRcdFx0dHlwZTogJ2lkJyxcclxuXHRcdFx0bGFiZWw6ICdJRCcsXHJcblx0XHRcdHBhdGg6ICdpZCcsXHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmV0dXJuIGNvbHM7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5leHBhbmRTb3J0ID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0Y29uc3Qgc29ydCA9IHtcclxuXHRcdHJhd0lucHV0OiBpbnB1dCB8fCB0aGlzLmRlZmF1bHRTb3J0LFxyXG5cdFx0aXNEZWZhdWx0U29ydDogZmFsc2UsXHJcblx0fTtcclxuXHRzb3J0LmlucHV0ID0gc29ydC5yYXdJbnB1dDtcclxuXHRpZiAoc29ydC5pbnB1dCA9PT0gJ19fZGVmYXVsdF9fJykge1xyXG5cdFx0c29ydC5pc0RlZmF1bHRTb3J0ID0gdHJ1ZTtcclxuXHRcdHNvcnQuaW5wdXQgPSB0aGlzLnNvcnRhYmxlID8gJ3NvcnRPcmRlcicgOiB0aGlzLm5hbWVQYXRoO1xyXG5cdH1cclxuXHRzb3J0LnBhdGhzID0gbGlzdFRvQXJyYXkoc29ydC5pbnB1dCkubWFwKHBhdGggPT4ge1xyXG5cdFx0bGV0IGludmVydCA9IGZhbHNlO1xyXG5cdFx0aWYgKHBhdGguY2hhckF0KDApID09PSAnLScpIHtcclxuXHRcdFx0aW52ZXJ0ID0gdHJ1ZTtcclxuXHRcdFx0cGF0aCA9IHBhdGguc3Vic3RyKDEpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcrJykge1xyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMSk7XHJcblx0XHR9XHJcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW3BhdGhdO1xyXG5cdFx0aWYgKCFmaWVsZCkge1xyXG5cdFx0XHQvLyBUT0RPOiBTdXBwb3J0IGFyYml0YXJ5IGRvY3VtZW50IHBhdGhzXHJcblx0XHRcdGNvbnNvbGUud2FybignSW52YWxpZCBTb3J0IHNwZWNpZmllZDonLCBwYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmllbGQ6IGZpZWxkLFxyXG5cdFx0XHR0eXBlOiBmaWVsZC50eXBlLFxyXG5cdFx0XHRsYWJlbDogZmllbGQubGFiZWwsXHJcblx0XHRcdHBhdGg6IGZpZWxkLnBhdGgsXHJcblx0XHRcdGludmVydDogaW52ZXJ0LFxyXG5cdFx0fTtcclxuXHR9KS5maWx0ZXIodHJ1dGh5KTtcclxuXHRyZXR1cm4gc29ydDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGEgc3BlY2lmaWMgaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaXRlbUlkICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gbG9hZFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb3B0aW9uc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmxvYWRJdGVtID0gZnVuY3Rpb24gKGl0ZW1JZCwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG5cdFx0b3B0aW9ucyA9IG51bGw7XHJcblx0fVxyXG5cdGxldCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgJy8nICsgaXRlbUlkO1xyXG5cdGNvbnN0IHF1ZXJ5ID0gcXMuc3RyaW5naWZ5KG9wdGlvbnMpO1xyXG5cdGlmIChxdWVyeS5sZW5ndGgpIHVybCArPSAnPycgKyBxdWVyeTtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGRhdGEgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWQgYWxsIGl0ZW1zIG9mIGEgbGlzdCwgb3B0aW9uYWxseSBwYXNzaW5nIG9iamVjdHMgdG8gYnVpbGQgYSBxdWVyeSBzdHJpbmdcclxuICogZm9yIHNvcnRpbmcgb3Igc2VhcmNoaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvcHRpb25zXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUubG9hZEl0ZW1zID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucyk7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGRhdGEgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBkb3dubG9hZCBVUkwgdG8gZG93bmxvYWQgYSBsaXN0IHdpdGggdGhlIGN1cnJlbnQgc29ydGluZywgZmlsdGVyaW5nLFxyXG4gKiBzZWxlY3Rpb24gYW5kIHNlYXJjaGluZyBvcHRpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgVGhlIGRvd25sb2FkIFVSTFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuZ2V0RG93bmxvYWRVUkwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGg7XHJcblx0Y29uc3QgcGFydHMgPSBbXTtcclxuXHRpZiAob3B0aW9ucy5mb3JtYXQgIT09ICdqc29uJykge1xyXG5cdFx0b3B0aW9ucy5mb3JtYXQgPSAnY3N2JztcclxuXHR9XHJcblx0cGFydHMucHVzaChvcHRpb25zLnNlYXJjaCA/ICdzZWFyY2g9JyArIG9wdGlvbnMuc2VhcmNoIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5maWx0ZXJzLmxlbmd0aCA/ICdmaWx0ZXJzPScgKyBKU09OLnN0cmluZ2lmeShnZXRGaWx0ZXJzKG9wdGlvbnMuZmlsdGVycykpIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5jb2x1bW5zID8gJ3NlbGVjdD0nICsgb3B0aW9ucy5jb2x1bW5zLm1hcChpID0+IGkucGF0aCkuam9pbignLCcpIDogJycpO1xyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5zb3J0ID8gJ3NvcnQ9JyArIGdldFNvcnRTdHJpbmcob3B0aW9ucy5zb3J0KSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKCdleHBhbmRSZWxhdGlvbnNoaXBGaWVsZHM9dHJ1ZScpO1xyXG5cdHJldHVybiB1cmwgKyAnL2V4cG9ydC4nICsgb3B0aW9ucy5mb3JtYXQgKyAnPycgKyBwYXJ0cy5maWx0ZXIodHJ1dGh5KS5qb2luKCcmJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVsZXRlIGEgc3BlY2lmaWMgaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaXRlbUlkICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gZGVsZXRlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUuZGVsZXRlSXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQsIGNhbGxiYWNrKSB7XHJcblx0dGhpcy5kZWxldGVJdGVtcyhbaXRlbUlkXSwgY2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBtdWx0aXBsZSBpdGVtcyBhdCBvbmNlIHZpYSB0aGUgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSAgIGl0ZW1JZHMgIEFuIGFycmF5IG9mIGlkcyBvZiBpdGVtcyB3ZSB3YW50IHRvIGRlbGV0ZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmRlbGV0ZUl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1JZHMsIGNhbGxiYWNrKSB7XHJcblx0Y29uc3QgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArICcvZGVsZXRlJztcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdFx0anNvbjoge1xyXG5cdFx0XHRpZHM6IGl0ZW1JZHMsXHJcblx0XHR9LFxyXG5cdH0sIChlcnIsIHJlc3AsIGJvZHkpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0Ly8gUGFzcyB0aGUgYm9keSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGJvZHkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soYm9keSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5yZW9yZGVySXRlbXMgPSBmdW5jdGlvbiAoaXRlbSwgb2xkU29ydE9yZGVyLCBuZXdTb3J0T3JkZXIsIHBhZ2VPcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyAnLycgKyBpdGVtLmlkICsgJy9zb3J0T3JkZXIvJyArIG9sZFNvcnRPcmRlciArICcvJyArIG5ld1NvcnRPcmRlciArICcvJyArIGJ1aWxkUXVlcnlTdHJpbmcocGFnZU9wdGlvbnMpO1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0fSwgKGVyciwgcmVzcCwgYm9keSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yIHBhcnNpbmcgcmVzdWx0cyBqc29uOicsIGUsIGJvZHkpO1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soZSk7XHJcblx0XHR9XHJcblx0XHQvLyBQYXNzIHRoZSBib2R5IGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgYm9keSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhib2R5KTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7XHJcbiIsImltcG9ydCB1cmwgZnJvbSAnY2xvdWRpbmFyeS1taWNyb3VybCc7XHJcbmNvbnN0IENMT1VEX05BTUUgPSB3aW5kb3cuS2V5c3RvbmUuY2xvdWRpbmFyeS5jbG91ZF9uYW1lO1xyXG5cclxuLypcclxuXHRUYWtlIGEgY2xvdWRpbmFyeSBwdWJsaWMgaWQgKyBvcHRpb25zIG9iamVjdFxyXG5cdGFuZCByZXR1cm4gYSB1cmxcclxuKi9cclxuZnVuY3Rpb24gY2xvdWRpbmFyeVJlc2l6ZSAocHVibGljSWQsIG9wdGlvbnMgPSB7fSkge1xyXG5cdGlmICghcHVibGljSWQgfHwgIUNMT1VEX05BTUUpIHJldHVybiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIHVybChwdWJsaWNJZCwge1xyXG5cdFx0Y2xvdWRfbmFtZTogQ0xPVURfTkFNRSwgLy8gc2luZ2xlIGNsb3VkIGZvciB0aGUgYWRtaW4gVUlcclxuXHRcdHF1YWxpdHk6IDgwLCAvLyA4MCUgcXVhbGl0eSwgd2hpY2ggfmhhbHZlcyBpbWFnZSBkb3dubG9hZCBzaXplXHJcblx0XHQuLi5vcHRpb25zLFxyXG5cdH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbG91ZGluYXJ5UmVzaXplO1xyXG4iLCIvKipcclxuXHRWYWxpZGF0ZSBIZXhcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGhleFxyXG5cclxuXHQxLiByZW1vdmUgaGFzaCBpZiBwcmVzZW50XHJcblx0Mi4gY29udmVydCBmcm9tIDMgdG8gNiBkaWdpdCBjb2xvciBjb2RlICYgZW5zdXJlIHZhbGlkIGhleFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVIZXggKGNvbG9yKSB7XHJcblx0Y29uc3QgaGV4ID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHJcblx0aWYgKGhleC5sZW5ndGggPT09IDMpIHtcclxuXHRcdHJldHVybiBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XHJcblx0fVxyXG5cdGlmIChoZXgubGVuZ3RoICE9PSA2KSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29sb3IgdmFsdWUgcHJvdmlkZWQ6IFwiJHtjb2xvcn1cImApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGhleDtcclxufTtcclxuXHJcbi8qKlxyXG5cdEZhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBhcHBsaWVzIGFuIGFscGhhIHZhbHVlLlxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3JcclxuXHRAcGFyYW0ge051bWJlcn0gb3BhY2l0eSAoMC0xMDApXHJcblxyXG5cdDEuIGNvbnZlcnQgaGV4IHRvIFJHQlxyXG5cdDIuIGNvbWJpbmUgYW5kIGFkZCBhbHBoYSBjaGFubmVsXHJcbiovXHJcblxyXG5mdW5jdGlvbiBmYWRlIChjb2xvciwgb3BhY2l0eSA9IDEwMCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IG9wYWNpdHkgLyAxMDA7XHJcblx0Y29uc3QgaGV4ID0gdmFsaWRhdGVIZXgoY29sb3IpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XHJcblx0Y29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcclxuXHRjb25zdCBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xyXG5cclxuXHQvLyAyLlxyXG5cdGNvbnN0IHJlc3VsdCA9ICdyZ2JhKCdcclxuXHRcdCsgciArICcsJ1xyXG5cdFx0KyBnICsgJywnXHJcblx0XHQrIGIgKyAnLCdcclxuXHRcdCsgZGVjaW1hbEZyYWN0aW9uXHJcblx0XHQrICcpJztcclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblxyXG4vKipcclxuXHRTaGFkZSBDb2xvclxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRUYWtlcyBhIGhleGlkZWNpbWFsIGNvbG9yLCBjb252ZXJ0cyBpdCB0byBSR0IgYW5kIGxpZ2h0ZW5zIG9yIGRhcmtlbnNcclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBkbyBmYW5jeSBSR0IgYml0d2lzZSBvcGVyYXRpb25zXHJcblx0Mi4gY29tYmluZSBiYWNrIGludG8gYSBoZXggdmFsdWVcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHNoYWRlIChjb2xvciwgcGVyY2VudCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IHBlcmNlbnQgLyAxMDA7XHJcblx0Y29uc3QgaGV4ID0gdmFsaWRhdGVIZXgoY29sb3IpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGxldCBmID0gcGFyc2VJbnQoaGV4LCAxNik7XHJcblx0bGV0IHQgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gMCA6IDI1NTtcclxuXHRsZXQgcCA9IGRlY2ltYWxGcmFjdGlvbiA8IDAgPyBkZWNpbWFsRnJhY3Rpb24gKiAtMSA6IGRlY2ltYWxGcmFjdGlvbjtcclxuXHJcblx0Y29uc3QgUiA9IGYgPj4gMTY7XHJcblx0Y29uc3QgRyA9IGYgPj4gOCAmIDB4MDBGRjtcclxuXHRjb25zdCBCID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHQvLyAyLlxyXG5cdHJldHVybiAnIycgKyAoMHgxMDAwMDAwXHJcblx0XHQrIChNYXRoLnJvdW5kKCh0IC0gUikgKiBwKSArIFIpICogMHgxMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEcpICogcCkgKyBHKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKCh0IC0gQikgKiBwKSArIEIpKS50b1N0cmluZygxNikuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vLyBzaGFkZSBoZWxwZXJzXHJcbmNvbnN0IGxpZ2h0ZW4gPSBzaGFkZTtcclxuZnVuY3Rpb24gZGFya2VuIChjb2xvciwgcGVyY2VudCkge1xyXG5cdHJldHVybiBzaGFkZShjb2xvciwgcGVyY2VudCAqIC0xKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuXHRCbGVuZCBDb2xvclxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRUYWtlcyB0d28gaGV4aWRlY2ltYWwgY29sb3JzIGFuZCBibGVuZCB0aGVtIHRvZ2V0aGVyXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvcjFcclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IyXHJcblx0QHBhcmFtIHtOdW1iZXJ9IHBlcmNlbnQgKDAtMTAwKVxyXG5cclxuXHQxLiBkbyBmYW5jeSBSR0IgYml0d2lzZSBvcGVyYXRpb25zXHJcblx0Mi4gY29tYmluZSBiYWNrIGludG8gYSBoZXggdmFsdWVcclxuKi9cclxuXHJcbmZ1bmN0aW9uIGJsZW5kIChjb2xvcjEsIGNvbG9yMiwgcGVyY2VudCkge1xyXG5cdGNvbnN0IGRlY2ltYWxGcmFjdGlvbiA9IHBlcmNlbnQgLyAxMDA7XHJcblx0Y29uc3QgaGV4MSA9IHZhbGlkYXRlSGV4KGNvbG9yMSk7XHJcblx0Y29uc3QgaGV4MiA9IHZhbGlkYXRlSGV4KGNvbG9yMik7XHJcblxyXG5cdC8vIDEuXHJcblx0Y29uc3QgZiA9IHBhcnNlSW50KGhleDEsIDE2KTtcclxuXHRjb25zdCB0ID0gcGFyc2VJbnQoaGV4MiwgMTYpO1xyXG5cclxuXHRjb25zdCBSMSA9IGYgPj4gMTY7XHJcblx0Y29uc3QgRzEgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjEgPSBmICYgMHgwMDAwRkY7XHJcblxyXG5cdGNvbnN0IFIyID0gdCA+PiAxNjtcclxuXHRjb25zdCBHMiA9IHQgPj4gOCAmIDB4MDBGRjtcclxuXHRjb25zdCBCMiA9IHQgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgoUjIgLSBSMSkgKiBkZWNpbWFsRnJhY3Rpb24pICsgUjEpICogMHgxMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgoRzIgLSBHMSkgKiBkZWNpbWFsRnJhY3Rpb24pICsgRzEpICogMHgxMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEIyIC0gQjEpICogZGVjaW1hbEZyYWN0aW9uKSArIEIxKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRibGVuZCxcclxuXHRkYXJrZW4sXHJcblx0ZmFkZSxcclxuXHRsaWdodGVuLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbmNhdGVuYXRlIENsYXNzbmFtZXNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBTdXBwb3J0IGNsYXNzTmFtZSBhcyBhbiBhcnJheTpcclxuLy8gZm9yY2UgY2xhc3NuYW1lIHByb3AgaW50byBhbiBhcnJheSAocG9zc2libHkgb2YgYXJyYXlzKSB0aGVuIGZsYXR0ZW5cclxuXHJcbi8qXHJcblx0Ly8gVG8gdXNlIHNwcmVhZCB0aGUgbmV3IGFycmF5IGludG8gYXBocm9kaXRlJ3MgYGNzc2AgZnVuY3Rpb25cclxuXHJcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLmNvbXBvbmVudCxcclxuXHRcdFx0Li4uY29uY2F0Q2xhc3NuYW1lcyhjbGFzc05hbWUpXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcblx0fTtcclxuKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2F0Q2xhc3NuYW1lcyAoY2xhc3NOYW1lKSB7XHJcblx0cmV0dXJuIFtjbGFzc05hbWVdLnJlZHVjZSgoYSwgYikgPT4ge1xyXG5cdFx0cmV0dXJuIGEuY29uY2F0KGIpO1xyXG5cdH0sIFtdKTtcclxufTtcclxuIiwiLyoqXHJcblx0TGluZWFyIEdyYWRpZW50XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFNob3J0LWhhbmQgaGVscGVyIGZvciBhZGRpbmcgYSBsaW5lYXIgZ3JhZGllbnQgdG8geW91ciBjb21wb25lbnQuXHJcblxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IHNpZGVPckNvcm5lclxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IHRvcFxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IGJvdHRvbVxyXG5cdC0gQHBhcmFtIHtTdHJpbmd9IGJhc2UgKG9wdGlvbmFsKVxyXG5cdC0gQHJldHVybnMge09iamVjdH0gY3NzIGxpbmVhciBncmFkaWVudCBkZWNsYXJhdGlvblxyXG5cclxuXHRTcHJlYWQgdGhlIGRlY2xhcmF0aW9uIGludG8geW91ciBjb21wb25lbnQgY2xhc3M6XHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdG15Q29tcG9uZW50Q2xhc3M6IHtcclxuXHRcdC4uLmxpbmVhckdyYWRpZW50KHJlZCwgYmx1ZSksXHJcblx0fVxyXG4qL1xyXG5cclxuZnVuY3Rpb24gbGluZWFyR3JhZGllbnQgKGRpcmVjdGlvbiwgdG9wLCBib3R0b20sIGJhc2UgPSAnJykge1xyXG5cdHJldHVybiB7XHJcblx0XHRiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KCR7ZGlyZWN0aW9ufSwgJHt0b3B9IDAlLCAke2JvdHRvbX0gMTAwJSkgJHtiYXNlfWAsXHJcblx0fTtcclxufVxyXG5cclxuLy8gVmVydGljYWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRWZXJ0aWNhbCAodG9wLCBib3R0b20sIGJhc2UpIHtcclxuXHRyZXR1cm4gbGluZWFyR3JhZGllbnQoJ3RvIGJvdHRvbScsIHRvcCwgYm90dG9tLCBiYXNlKTtcclxufVxyXG5cclxuLy8gSG9yaXpvbnRhbCBHcmFkaWVudFxyXG5mdW5jdGlvbiBncmFkaWVudEhvcml6b250YWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byByaWdodCcsIHRvcCwgYm90dG9tLCBiYXNlKTtcclxufVxyXG5cclxuLyoqXHJcblx0Qm9yZGVyIFJhZGl1c1xyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYm9yZGVyIHJhZGlpXHJcbiovXHJcblxyXG4vLyB0b3BcclxuZnVuY3Rpb24gYm9yZGVyVG9wUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyVG9wTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyByaWdodFxyXG5mdW5jdGlvbiBib3JkZXJSaWdodFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BSaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIGJvdHRvbVxyXG5mdW5jdGlvbiBib3JkZXJCb3R0b21SYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIGxlZnRcclxuZnVuY3Rpb24gYm9yZGVyTGVmdFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBSZXR1cm5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJvcmRlclRvcFJhZGl1cyxcclxuXHRib3JkZXJSaWdodFJhZGl1cyxcclxuXHRib3JkZXJCb3R0b21SYWRpdXMsXHJcblx0Ym9yZGVyTGVmdFJhZGl1cyxcclxuXHJcblx0Z3JhZGllbnRIb3Jpem9udGFsLFxyXG5cdGdyYWRpZW50VmVydGljYWwsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBFeHBvcnRzIGFuIG9iamVjdCBvZiBsaXN0cywga2V5ZWQgd2l0aCB0aGVpciBrZXkgaW5zdGVhZCBvZiB0aGVpciBuYW1lIGFuZFxyXG4gKiB3cmFwcGVkIHdpdGggdGhlIExpc3QgaGVscGVyICguL0xpc3QuanMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IExpc3QgZnJvbSAnLi9MaXN0JztcclxuXHJcbmV4cG9ydHMubGlzdHNCeUtleSA9IHt9O1xyXG5leHBvcnRzLmxpc3RzQnlQYXRoID0ge307XHJcblxyXG5mb3IgKGNvbnN0IGtleSBpbiBLZXlzdG9uZS5saXN0cykge1xyXG5cdC8vIEd1YXJkIGZvci1pbnNcclxuXHRpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChLZXlzdG9uZS5saXN0cywga2V5KSkge1xyXG5cdFx0dmFyIGxpc3QgPSBuZXcgTGlzdChLZXlzdG9uZS5saXN0c1trZXldKTtcclxuXHRcdGV4cG9ydHMubGlzdHNCeUtleVtrZXldID0gbGlzdDtcclxuXHRcdGV4cG9ydHMubGlzdHNCeVBhdGhbbGlzdC5wYXRoXSA9IGxpc3Q7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGZldyBoZWxwZXIgbWV0aG9kcyBmb3Igc3RyaW5nc1xyXG4gKi9cclxuXHJcbmltcG9ydCBpbmZsZWN0IGZyb20gJ2knO1xyXG5pbXBvcnQgeyBjb21wYWN0LCBzaXplIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUgc2luZ3VsYXIgb3IgcGx1cmFsIG9mIGEgc3RyaW5nIGJhc2VkIG9uIGEgbnVtYmVyXHJcbiAqIG9yIG51bWJlciBvZiBpdGVtcyBpbiBhbiBhcnJheS5cclxuICpcclxuICogSWYgYXJpdHkgaXMgMSwgcmV0dXJucyB0aGUgcGx1cmFsIGZvcm0gb2YgdGhlIHdvcmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb3VudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2luZ3VsYXIgc3RyaW5nXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbHVyYWwgc3RyaW5nXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc2luZ3VsYXIgb3IgcGx1cmFsLCAqIGlzIHJlcGxhY2VkIHdpdGggY291bnRcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnBsdXJhbCA9IGZ1bmN0aW9uIChjb3VudCwgc24sIHBsKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdHJldHVybiBpbmZsZWN0LnBsdXJhbGl6ZShjb3VudCk7XHJcblx0fVxyXG5cdGlmICh0eXBlb2Ygc24gIT09ICdzdHJpbmcnKSBzbiA9ICcnO1xyXG5cdGlmICghcGwpIHtcclxuXHRcdHBsID0gaW5mbGVjdC5wbHVyYWxpemUoc24pO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIGNvdW50ID09PSAnc3RyaW5nJykge1xyXG5cdFx0Y291bnQgPSBOdW1iZXIoY291bnQpO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGNvdW50ICE9PSAnbnVtYmVyJykge1xyXG5cdFx0Y291bnQgPSBzaXplKGNvdW50KTtcclxuXHR9XHJcblx0cmV0dXJuIChjb3VudCA9PT0gMSA/IHNuIDogcGwpLnJlcGxhY2UoJyonLCBjb3VudCk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBsZXR0ZXIgaW4gYSBzdHJpbmcgdG8gdXBwZXJjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBTdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnVwY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRpZiAoc3RyICYmIHN0ci50b1N0cmluZykgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8ICFzdHIubGVuZ3RoKSByZXR1cm4gJyc7XHJcblx0cmV0dXJuIChzdHIuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGxldHRlciBpbiBhIHN0cmluZyB0byBsb3dlcmNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IFN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMuZG93bmNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHJldHVybiAoc3RyLnN1YnN0cigwLCAxKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cigxKSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIHRpdGxlIGNhc2VcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRpdGxlIENhc2UgZm9ybSBvZiBzdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnRpdGxlY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRpZiAoc3RyICYmIHN0ci50b1N0cmluZykgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8ICFzdHIubGVuZ3RoKSByZXR1cm4gJyc7XHJcblx0c3RyID0gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpO1xyXG5cdHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvXFxzfF98XFwtLyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKHBhcnRzW2ldICYmICEvXltBLVowLTldKyQvLnRlc3QocGFydHNbaV0pKSB7XHJcblx0XHRcdHBhcnRzW2ldID0gZXhwb3J0cy51cGNhc2UocGFydHNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gY29tcGFjdChwYXJ0cykuam9pbignICcpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtCb29sZWFufSBsb3dlcmNhc2VGaXJzdFdvcmRcclxuICogQHJldHVybiB7U3RyaW5nfSBjYW1lbC1jYXNlIGZvcm0gb2Ygc3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5jYW1lbGNhc2UgPSBmdW5jdGlvbiAoc3RyLCBsYykge1xyXG5cdHJldHVybiBpbmZsZWN0LmNhbWVsaXplKHN0ciwgIShsYykpO1xyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGZhZGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgRSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvY29uc3RhbnRzJztcclxuXHJcbnZhciBDaGVja2JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0NoZWNrYm94JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0Y29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHJlYWRvbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb21wb25lbnQ6ICdidXR0b24nLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhY3RpdmU6IG51bGwsXHJcblx0XHRcdGZvY3VzOiBudWxsLFxyXG5cdFx0XHRob3ZlcjogbnVsbCxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCwgZmFsc2UpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcclxuXHR9LFxyXG5cdGdldFN0eWxlcyAoKSB7XHJcblx0XHRjb25zdCB7IGNoZWNrZWQsIHJlYWRvbmx5IH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyBhY3RpdmUsIGZvY3VzLCBob3ZlciB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBjaGVja2VkQ29sb3IgPSAnIzM5OTlmYyc7XHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gY2hlY2tlZENvbG9yIDogJ3doaXRlJztcclxuXHRcdGxldCBib3JkZXJDb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAncmdiYSgwLDAsMCwwLjE1KSByZ2JhKDAsMCwwLDAuMSkgcmdiYSgwLDAsMCwwLjA1KScgOiAncmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4yKSByZ2JhKDAsMCwwLDAuMTUpJztcclxuXHRcdGxldCBib3hTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJzAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjMzKScgOiAnaW5zZXQgMCAxcHggMCByZ2JhKDAsMCwwLDAuMDYpJztcclxuXHRcdGxldCBjb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnd2hpdGUnIDogJyNiYmInO1xyXG5cdFx0Y29uc3QgdGV4dFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMiknIDogbnVsbDtcclxuXHJcblx0XHQvLyBwc2V1ZG8gc3RhdGVcclxuXHRcdGlmIChob3ZlciAmJiAhZm9jdXMgJiYgIXJlYWRvbmx5KSB7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gKGNoZWNrZWQpID8gJ3JnYmEoMCwwLDAsMC4xKSByZ2JhKDAsMCwwLDAuMTUpIHJnYmEoMCwwLDAsMC4yKScgOiAncmdiYSgwLDAsMCwwLjM1KSByZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjI1KSc7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlKSB7XHJcblx0XHRcdGJhY2tncm91bmQgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gZGFya2VuKGNoZWNrZWRDb2xvciwgMjApIDogJyNlZWUnO1xyXG5cdFx0XHRib3JkZXJDb2xvciA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAncmdiYSgwLDAsMCwwLjI1KSByZ2JhKDAsMCwwLDAuMykgcmdiYSgwLDAsMCwwLjM1KScgOiAncmdiYSgwLDAsMCwwLjQpIHJnYmEoMCwwLDAsMC4zNSkgcmdiYSgwLDAsMCwwLjMpJztcclxuXHRcdFx0Ym94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICcwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4zMyknIDogJ2luc2V0IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMiknO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGZvY3VzICYmICFhY3RpdmUpIHtcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4yNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4zNSknIDogY2hlY2tlZENvbG9yO1xyXG5cdFx0XHRib3hTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gYDAgMCAwIDNweCAke2ZhZGUoY2hlY2tlZENvbG9yLCAxNSl9YCA6IGBpbnNldCAwIDFweCAycHggcmdiYSgwLDAsMCwwLjE1KSwgMCAwIDAgM3B4ICR7ZmFkZShjaGVja2VkQ29sb3IsIDE1KX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG5vZWRpdFxyXG5cdFx0aWYgKHJlYWRvbmx5KSB7XHJcblx0XHRcdGJhY2tncm91bmQgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJztcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAncmdiYSgwLDAsMCwwLjEpJztcclxuXHRcdFx0Ym94U2hhZG93ID0gJ25vbmUnO1xyXG5cdFx0XHRjb2xvciA9IGNoZWNrZWQgPyBjaGVja2VkQ29sb3IgOiAnI2JiYic7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRcdGJhY2tncm91bmQ6IGJhY2tncm91bmQsXHJcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCcsXHJcblx0XHRcdGJvcmRlckNvbG9yOiBib3JkZXJDb2xvcixcclxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBFLmJvcmRlclJhZGl1cy5zbSxcclxuXHRcdFx0Ym94U2hhZG93OiBib3hTaGFkb3csXHJcblx0XHRcdGNvbG9yOiBjb2xvcixcclxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRcdGZvbnRTaXplOiAxNCxcclxuXHRcdFx0aGVpZ2h0OiAxNixcclxuXHRcdFx0bGluZUhlaWdodDogJzE1cHgnLFxyXG5cdFx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0XHRcdHBhZGRpbmc6IDAsXHJcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHRcdHRleHRTaGFkb3c6IHRleHRTaGFkb3csXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0XHR3aWR0aDogMTYsXHJcblxyXG5cdFx0XHRtc1RyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0XHRNb3pUcmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdFx0V2Via2l0VHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHRcdHRyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGhhbmRsZUtleURvd24gKGUpIHtcclxuXHRcdGlmIChlLmtleUNvZGUgIT09IDMyKSByZXR1cm47XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZSh0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZUtleVVwICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKGZhbHNlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlT3ZlciAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUhvdmVyKHRydWUpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VEb3duICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKHRydWUpO1xyXG5cdFx0dGhpcy50b2dnbGVGb2N1cyh0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlVXAgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUoZmFsc2UpO1xyXG5cdH0sXHJcblx0aGFuZGxlTW91c2VPdXQgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVIb3ZlcihmYWxzZSk7XHJcblx0fSxcclxuXHR0b2dnbGVBY3RpdmUgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZTogcHNldWRvIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlSG92ZXIgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiBwc2V1ZG8gfSk7XHJcblx0fSxcclxuXHR0b2dnbGVGb2N1cyAocHNldWRvKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgZm9jdXM6IHBzZXVkbyB9KTtcclxuXHR9LFxyXG5cdGhhbmRsZUNoYW5nZSAoKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKCF0aGlzLnByb3BzLmNoZWNrZWQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgY2hlY2tlZCwgcmVhZG9ubHkgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NoZWNrZWQnLCAnY29tcG9uZW50JywgJ29uQ2hhbmdlJywgJ3JlYWRvbmx5Jyk7XHJcblx0XHRwcm9wcy5zdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKCk7XHJcblx0XHRwcm9wcy5yZWYgPSAnY2hlY2tib3gnO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnb2N0aWNvbicsIHtcclxuXHRcdFx0J29jdGljb24tY2hlY2snOiBjaGVja2VkLFxyXG5cdFx0XHQnb2N0aWNvbi14JzogKHR5cGVvZiBjaGVja2VkID09PSAnYm9vbGVhbicpICYmICFjaGVja2VkICYmIHJlYWRvbmx5LFxyXG5cdFx0fSk7XHJcblx0XHRwcm9wcy50eXBlID0gcmVhZG9ubHkgPyBudWxsIDogJ2J1dHRvbic7XHJcblxyXG5cdFx0cHJvcHMub25LZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duO1xyXG5cdFx0cHJvcHMub25LZXlVcCA9IHRoaXMuaGFuZGxlS2V5VXA7XHJcblxyXG5cdFx0cHJvcHMub25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bjtcclxuXHRcdHByb3BzLm9uTW91c2VVcCA9IHRoaXMuaGFuZGxlTW91c2VVcDtcclxuXHRcdHByb3BzLm9uTW91c2VPdmVyID0gdGhpcy5oYW5kbGVNb3VzZU92ZXI7XHJcblx0XHRwcm9wcy5vbk1vdXNlT3V0ID0gdGhpcy5oYW5kbGVNb3VzZU91dDtcclxuXHJcblx0XHRwcm9wcy5vbkNsaWNrID0gcmVhZG9ubHkgPyBudWxsIDogdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5vbkZvY3VzID0gcmVhZG9ubHkgPyBudWxsIDogKCkgPT4gdGhpcy50b2dnbGVGb2N1cyh0cnVlKTtcclxuXHRcdHByb3BzLm9uQmx1ciA9IHJlYWRvbmx5ID8gbnVsbCA6ICgpID0+IHRoaXMudG9nZ2xlRm9jdXMoZmFsc2UpO1xyXG5cclxuXHRcdGNvbnN0IG5vZGUgPSByZWFkb25seSA/ICdzcGFuJyA6IHRoaXMucHJvcHMuY29tcG9uZW50O1xyXG5cclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGUsIHByb3BzKTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3g7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbi8vIE5PVEUgbWFyZ2luQm90dG9tIG9mIDFweCBzdG9wcyB0aGluZ3MganVtcGluZyBhcm91bmRcclxuLy8gVE9ETyBmaW5kIG91dCB3aHkgdGhpcyBpcyBuZWNlc3NhcnlcclxuXHJcbmZ1bmN0aW9uIENvbGxhcHNlZEZpZWxkTGFiZWwgKHsgc3R5bGUsIC4uLnByb3BzIH0pIHtcclxuXHRjb25zdCBfX3N0eWxlX18gPSB7XHJcblx0XHRtYXJnaW5Cb3R0b206IDEsXHJcblx0XHRwYWRkaW5nTGVmdDogMCxcclxuXHRcdHBhZGRpbmdSaWdodDogMCxcclxuXHRcdC4uLnN0eWxlLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgc3R5bGU9e19fc3R5bGVfX30gey4uLnByb3BzfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxhcHNlZEZpZWxkTGFiZWw7XHJcbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IERheVBpY2tlciBmcm9tICdyZWFjdC1kYXktcGlja2VyJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgUG9wb3V0IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL1BvcG91dCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmxldCBsYXN0SWQgPSAwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdEYXRlSW5wdXQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Zm9ybWF0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0bmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdDogJ1lZWVktTU0tREQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRjb25zdCBpZCA9ICsrbGFzdElkO1xyXG5cdFx0bGV0IG1vbnRoID0gbmV3IERhdGUoKTtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGlmIChtb21lbnQodmFsdWUsIGZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdG1vbnRoID0gbW9tZW50KHZhbHVlLCBmb3JtYXQpLnRvRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aWQ6IGBfRGF0ZUlucHV0XyR7aWR9YCxcclxuXHRcdFx0bW9udGg6IG1vbnRoLFxyXG5cdFx0XHRwaWNrZXJJc09wZW46IGZhbHNlLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiB2YWx1ZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLnNob3dDdXJyZW50TW9udGgoKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIChuZXdQcm9wcykge1xyXG5cdFx0aWYgKG5ld1Byb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlKSByZXR1cm47XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bW9udGg6IG1vbWVudChuZXdQcm9wcy52YWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQpLnRvRGF0ZSgpLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiBuZXdQcm9wcy52YWx1ZSxcclxuXHRcdH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRmb2N1cyAoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVmcy5pbnB1dCkgcmV0dXJuO1xyXG5cdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzLmlucHV0KS5mb2N1cygpO1xyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IHZhbHVlIH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRoYW5kbGVLZXlQcmVzcyAoZSkge1xyXG5cdFx0aWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Ly8gSWYgdGhlIGRhdGUgaXMgc3RyaWN0bHkgZXF1YWwgdG8gdGhlIGZvcm1hdCBzdHJpbmcsIGRpc3BhdGNoIG9uQ2hhbmdlXHJcblx0XHRcdGlmIChtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgfSk7XHJcblx0XHRcdC8vIElmIHRoZSBkYXRlIGlzIG5vdCBzdHJpY3RseSBlcXVhbCwgb25seSBjaGFuZ2UgdGhlIHRhYiB0aGF0IGlzIGRpc3BsYXllZFxyXG5cdFx0XHR9IGVsc2UgaWYgKG1vbWVudCh0aGlzLnN0YXRlLmlucHV0VmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0KS5pc1ZhbGlkKCkpIHtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdG1vbnRoOiBtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCkudG9EYXRlKCksXHJcblx0XHRcdFx0fSwgdGhpcy5zaG93Q3VycmVudE1vbnRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlRGF5U2VsZWN0IChlLCBkYXRlLCBtb2RpZmllcnMpIHtcclxuXHRcdGlmIChtb2RpZmllcnMgJiYgbW9kaWZpZXJzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIHZhbHVlID0gbW9tZW50KGRhdGUpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCk7XHJcblxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHBpY2tlcklzT3BlbjogZmFsc2UsXHJcblx0XHRcdG1vbnRoOiBkYXRlLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiB2YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvd1BpY2tlciAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgcGlja2VySXNPcGVuOiB0cnVlIH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0fSxcclxuXHRzaG93Q3VycmVudE1vbnRoICgpIHtcclxuXHRcdGlmICghdGhpcy5yZWZzLnBpY2tlcikgcmV0dXJuO1xyXG5cdFx0dGhpcy5yZWZzLnBpY2tlci5zaG93TW9udGgodGhpcy5zdGF0ZS5tb250aCk7XHJcblx0fSxcclxuXHRoYW5kbGVGb2N1cyAoZSkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUucGlja2VySXNPcGVuKSByZXR1cm47XHJcblx0XHR0aGlzLnNob3dQaWNrZXIoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUNhbmNlbCAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgcGlja2VySXNPcGVuOiBmYWxzZSB9KTtcclxuXHR9LFxyXG5cdGhhbmRsZUJsdXIgKGUpIHtcclxuXHRcdGxldCBydCA9IGUucmVsYXRlZFRhcmdldCB8fCBlLm5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ7XHJcblx0XHRjb25zdCBwb3BvdXQgPSB0aGlzLnJlZnMucG9wb3V0LmdldFBvcnRhbERPTU5vZGUoKTtcclxuXHRcdHdoaWxlIChydCkge1xyXG5cdFx0XHRpZiAocnQgPT09IHBvcG91dCkgcmV0dXJuO1xyXG5cdFx0XHRydCA9IHJ0LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0cGlja2VySXNPcGVuOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuXHRcdC8vIHJlYWN0LWRheS1waWNrZXIgYWRkcyBhIGNsYXNzIHRvIHRoZSBzZWxlY3RlZCBkYXkgYmFzZWQgb24gdGhpc1xyXG5cdFx0Y29uc3QgbW9kaWZpZXJzID0ge1xyXG5cdFx0XHRzZWxlY3RlZDogKGRheSkgPT4gbW9tZW50KGRheSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KSA9PT0gc2VsZWN0ZWREYXksXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdGlkPXt0aGlzLnN0YXRlLmlkfVxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG5cdFx0XHRcdFx0b25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XHJcblx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuZm9ybWF0fVxyXG5cdFx0XHRcdFx0cmVmPVwiaW5wdXRcIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuaW5wdXRWYWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxQb3BvdXRcclxuXHRcdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5waWNrZXJJc09wZW59XHJcblx0XHRcdFx0XHRvbkNhbmNlbD17dGhpcy5oYW5kbGVDYW5jZWx9XHJcblx0XHRcdFx0XHRyZWY9XCJwb3BvdXRcIlxyXG5cdFx0XHRcdFx0cmVsYXRpdmVUb0lEPXt0aGlzLnN0YXRlLmlkfVxyXG5cdFx0XHRcdFx0d2lkdGg9ezI2MH1cclxuXHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdDxEYXlQaWNrZXJcclxuXHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5U2VsZWN0fVxyXG5cdFx0XHRcdFx0XHRyZWY9XCJwaWNrZXJcIlxyXG5cdFx0XHRcdFx0XHR0YWJJbmRleD17LTF9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvUG9wb3V0PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9jb2xvcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gRmlsZUNoYW5nZU1lc3NhZ2UgKHsgc3R5bGUsIGNvbG9yLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3Qgc3R5bGVzID0ge1xyXG5cdFx0bWFyZ2luUmlnaHQ6IDEwLFxyXG5cdFx0bWluV2lkdGg6IDAsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRpZiAoY29sb3IgIT09ICdkZWZhdWx0Jykge1xyXG5cdFx0c3R5bGVzLmJhY2tncm91bmRDb2xvciA9IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxMCk7XHJcblx0XHRzdHlsZXMuYm9yZGVyQ29sb3IgPSBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMzApO1xyXG5cdFx0c3R5bGVzLmNvbG9yID0gdGhlbWUuY29sb3JbY29sb3JdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0bm9lZGl0XHJcblx0XHRcdHN0eWxlPXtzdHlsZXN9XHJcblx0XHRcdHsuLi5wcm9wc31cclxuXHRcdC8+XHJcblx0KTtcclxufTtcclxuXHJcbkZpbGVDaGFuZ2VNZXNzYWdlLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnc3VjY2VzcyddKSxcclxufTtcclxuRmlsZUNoYW5nZU1lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVDaGFuZ2VNZXNzYWdlO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vKlxyXG5cdEV4cG9zZSBpbnRlcm5hbCByZWYgdG8gcGFyZW50XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0RmllbGQuY3JlYXRlKHtcclxuXHRcdHRyaWdnZXJGaWxlQnJvd3NlciAoKSB7XHJcblx0XHRcdHRoaXMucmVmcy5maWxlSW5wdXQuY2xpY2tEb21Ob2RlKCk7XHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyICgpIHtcclxuXHRcdFx0PEhpZGRlbkZpbGVJbnB1dCByZWY9XCJmaWxlSW5wdXRcIiAvPlxyXG5cdFx0fVxyXG5cdH0pO1xyXG4qL1xyXG5cclxuY2xhc3MgSGlkZGVuRmlsZUlucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuY2xlYXJWYWx1ZSA9IHRoaXMuY2xlYXJWYWx1ZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jbGlja0RvbU5vZGUgPSB0aGlzLmNsaWNrRG9tTm9kZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYXNWYWx1ZSA9IHRoaXMuaGFzVmFsdWUuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0Y2xlYXJWYWx1ZSAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC52YWx1ZSA9ICcnO1xyXG5cdH1cclxuXHRjbGlja0RvbU5vZGUgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuY2xpY2soKTtcclxuXHR9XHJcblx0aGFzVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuICEhdGhpcy50YXJnZXQudmFsdWU7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IHN0eWxlLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHNldFJlZiA9IChuKSA9PiAodGhpcy50YXJnZXQgPSBuKTtcclxuXHRcdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdFx0bGVmdDogLTk5OTksXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHQuLi5zdHlsZSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0XHRcdHN0eWxlPXtzdHlsZXN9XHJcblx0XHRcdFx0cmVmPXtzZXRSZWZ9XHJcblx0XHRcdFx0dGFiSW5kZXg9XCItMVwiXHJcblx0XHRcdFx0dHlwZT1cImZpbGVcIlxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5IaWRkZW5GaWxlSW5wdXQucHJvcFR5cGVzID0ge1xyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIaWRkZW5GaWxlSW5wdXQ7XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdGhlbWUnO1xyXG5cclxuLy8gRklYTUUgc3RhdGljIG9jdGljb24gY2xhc3NlcyBsZWFuaW5nIG9uIEVsZW1lbnRhbCB0byBhdm9pZCBkdXBsaWNhdGVcclxuLy8gZm9udCBhbmQgQ1NTOyBpbmZsYXRpbmcgdGhlIHByb2plY3Qgc2l6ZVxyXG5cclxuY29uc3QgSUNPTl9NQVAgPSB7XHJcblx0bG9hZGluZzogJycsXHJcblx0cmVtb3ZlOiAnbWVnYS1vY3RpY29uIG9jdGljb24tdHJhc2hjYW4nLFxyXG5cdHVwbG9hZDogJ21lZ2Etb2N0aWNvbiBvY3RpY29uLWNsb3VkLXVwbG9hZCcsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBJbWFnZVRodW1ibmFpbCAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjb21wb25lbnQsIG1hc2ssIC4uLnByb3BzIH0pIHtcclxuXHRjb25zdCBtYXNrVUkgPSBtYXNrID8gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLm1hc2spICsgYCAke0lDT05fTUFQW21hc2tdfWB9PlxyXG5cdFx0XHR7bWFzayA9PT0gJ2xvYWRpbmcnXHJcblx0XHRcdFx0PyA8U3Bpbm5lciBjb2xvcj1cImludmVydGVkXCIgLz5cclxuXHRcdFx0XHQ6IG51bGx9XHJcblx0XHQ8L2Rpdj5cclxuXHQpIDogbnVsbDtcclxuXHJcblx0Ly8gYXBwbHkgaG92ZXIgYW5kIGZvY3VzIHN0eWxlcyBvbmx5IHdoZW4gdXNpbmcgYW4gYW5jaG9yXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5iYXNlLFxyXG5cdFx0Y29tcG9uZW50ID09PSAnYScgPyBjbGFzc2VzLmFuY2hvciA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHQvLyBhcHBlbmQgdGhlIG1hc2sgVUkgdG8gY2hpbGRyZW5cclxuXHRwcm9wcy5jaGlsZHJlbiA9IFtdLmNvbmNhdChjaGlsZHJlbiwgW21hc2tVSV0pO1xyXG5cclxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufTtcclxuXHJcbkltYWdlVGh1bWJuYWlsLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdG1hc2s6IFByb3BUeXBlcy5vbmVPZihbJ2xvYWRpbmcnLCAncmVtb3ZlJywgJ3VwbG9hZCddKSxcclxufTtcclxuSW1hZ2VUaHVtYm5haWwuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5jb25zdCBHVVRURVJfV0lEVEggPSA0O1xyXG5jb25zdCBob3ZlckFuZEZvY3VzU3R5bGVzID0ge1xyXG5cdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHRib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdH1gLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6ICdhdXRvJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxJyxcclxuXHRcdG1heFdpZHRoOiAnMTAwJScsXHJcblx0XHRwYWRkaW5nOiBHVVRURVJfV0lEVEgsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cdGFuY2hvcjoge1xyXG5cdFx0Jzpob3Zlcic6IGhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHQuLi5ob3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBtYXNrXHJcblx0bWFzazoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxyXG5cdFx0Ym90dG9tOiBHVVRURVJfV0lEVEgsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRcdGxlZnQ6IEdVVFRFUl9XSURUSCxcclxuXHRcdGxpbmVIZWlnaHQ6IDkwLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXHJcblx0XHRyaWdodDogR1VUVEVSX1dJRFRILFxyXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHRcdHRvcDogR1VUVEVSX1dJRFRILFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlVGh1bWJuYWlsO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmZ1bmN0aW9uIEl0ZW1zVGFibGVDZWxsICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ0l0ZW1MaXN0X19jb2wnLCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHRkIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVGFibGVDZWxsO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcblxyXG5mdW5jdGlvbiBJdGVtc1RhYmxlVmFsdWUgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50LFxyXG5cdGVtcHR5LFxyXG5cdGV4dGVyaW9yLFxyXG5cdGZpZWxkLFxyXG5cdGhyZWYsXHJcblx0aW50ZXJpb3IsXHJcblx0cGFkZGVkLFxyXG5cdHRvLFxyXG5cdHRydW5jYXRlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBUT0RPIHJlbW92ZSBpbiB0aGUgbmV4dCByZWxlYXNlXHJcblx0aWYgKGhyZWYpIHtcclxuXHRcdGNvbnNvbGUud2FybignSXRlbXNUYWJsZVZhbHVlOiBgaHJlZmAgd2lsbCBiZSBkZXByZWNhdGVkIGluIHRoZSBuZXh0IHJlbGVhc2UsIHVzZSBgdG9gLicpO1xyXG5cdH1cclxuXHRjb25zdCBsaW5rUmVmID0gdG8gfHwgaHJlZjtcclxuXHRjb25zdCBDb21wb25lbnQgPSBsaW5rUmVmID8gTGluayA6IGNvbXBvbmVudDtcclxuXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnSXRlbUxpc3RfX3ZhbHVlJywgKFxyXG5cdFx0ZmllbGQgPyBgSXRlbUxpc3RfX3ZhbHVlLS0ke2ZpZWxkfWAgOiBudWxsXHJcblx0KSwge1xyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1lbXB0eSc6IGVtcHR5LFxyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1leHRlcmlvcic6IGxpbmtSZWYgJiYgZXh0ZXJpb3IsXHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLWludGVyaW9yJzogbGlua1JlZiAmJiBpbnRlcmlvcixcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tcGFkZGVkJzogbGlua1JlZiAmJiBwYWRkZWQsXHJcblx0XHQnSXRlbUxpc3RfX3ZhbHVlLS10cnVuY2F0ZSc6IHRydW5jYXRlLFxyXG5cdH0sIGNsYXNzTmFtZSk7XHJcblx0cHJvcHMudG8gPSBsaW5rUmVmO1xyXG5cdHByb3BzLnRpdGxlID0gcHJvcHMuY2hpbGRyZW47XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5JdGVtc1RhYmxlVmFsdWUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0ZW1wdHk6IFByb3BUeXBlcy5ib29sLFxyXG5cdGV4dGVyaW9yOiBQcm9wVHlwZXMuYm9vbCwgLy8gRklYTUUgdGhpcyBzaG91bGQgYmUgXCJleHRlcm5hbFwiIGUuZy4gYW4gZXh0ZXJuYWwgbGlua1xyXG5cdGZpZWxkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsIC8vIFRPRE8gcmVtb3ZlIGluIG5leHQgcmVsZWFzZVxyXG5cdGludGVyaW9yOiBQcm9wVHlwZXMuYm9vbCwgLy8gRklYTUUgdGhpcyBzaG91bGQgYmUgXCJpbnRlcm5hbFwiIGUuZy4gYW4gaW50ZXJuYWwgbGlua1xyXG5cdHBhZGRlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0dG86IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHJ1bmNhdGU6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5JdGVtc1RhYmxlVmFsdWUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0dHJ1bmNhdGU6IHRydWUsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVGFibGVWYWx1ZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IElNQUdFX1NJWkUgPSAxODtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZSA9IHtcclxuXHRtYXJnaW5SaWdodDogOCxcclxufTtcclxuY29uc3QgYm94U3R5bGUgPSB7XHJcblx0Ym9yZGVyUmFkaXVzOiAzLFxyXG5cdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdGhlaWdodDogSU1BR0VfU0laRSxcclxuXHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0d2lkdGg6IElNQUdFX1NJWkUsXHJcbn07XHJcbmNvbnN0IGltYWdlU3R5bGUgPSB7XHJcblx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRoZWlnaHQ6IElNQUdFX1NJWkUsXHJcblx0bGVmdDogJzUwJScsXHJcblx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblxyXG5cdFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdE1velRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdG1zVHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcblx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXHJcbn07XHJcbmNvbnN0IHRleHRTdHlsZSA9IHtcclxuXHRjb2xvcjogJyM4ODgnLFxyXG5cdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdGZvbnRTaXplOiAnLjhyZW0nLFxyXG5cdG1hcmdpbkxlZnQ6IDgsXHJcblx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcbn07XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Nsb3VkaW5hcnlJbWFnZVN1bW1hcnknLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaW1lbnNpb25zJywgJ3B1YmxpY0lkJ10pLFxyXG5cdH0sXHJcblx0cmVuZGVyTGFiZWwgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmxhYmVsKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgeyBsYWJlbCwgaW1hZ2UgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0bGV0IHRleHQ7XHJcblx0XHRpZiAobGFiZWwgPT09ICdkaW1lbnNpb25zJykge1xyXG5cdFx0XHR0ZXh0ID0gYCR7aW1hZ2Uud2lkdGh9IMOXICR7aW1hZ2UuaGVpZ2h0fWA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gYCR7aW1hZ2UucHVibGljX2lkfS4ke2ltYWdlLmZvcm1hdH1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzcGFuIHN0eWxlPXt0ZXh0U3R5bGV9PlxyXG5cdFx0XHRcdHt0ZXh0fVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVySW1hZ2VUaHVtYm5haWwgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmltYWdlKSByZXR1cm47XHJcblx0XHRjb25zdCB1cmwgPSB0aGlzLnByb3BzLmltYWdlLnVybC5yZXBsYWNlKC9pbWFnZVxcL3VwbG9hZC8sIGBpbWFnZS91cGxvYWQvY190aHVtYixnX2ZhY2UsaF8ke0lNQUdFX1NJWkV9LHdfJHtJTUFHRV9TSVpFfWApO1xyXG5cdFx0cmV0dXJuIDxpbWcgc3JjPXt1cmx9IHN0eWxlPXtpbWFnZVN0eWxlfSBjbGFzc05hbWU9XCJpbWctbG9hZFwiIC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzcGFuIHN0eWxlPXtsaW5rU3R5bGV9PlxyXG5cdFx0XHRcdDxzcGFuIHN0eWxlPXtib3hTdHlsZX0+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJbWFnZVRodW1ibmFpbCgpfVxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJMYWJlbCgpfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIElkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpc3Q6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5pZDtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgcGFkZGVkIGludGVyaW9yIHRpdGxlPXt2YWx1ZX0gdG89e0tleXN0b25lLmFkbWluUGF0aCArICcvJyArIHRoaXMucHJvcHMubGlzdC5wYXRoICsgJy8nICsgdmFsdWV9IGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElkQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEludmFsaWRDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdJbnZhbGlkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdChJbnZhbGlkIFR5cGU6IHt0aGlzLnByb3BzLmNvbC50eXBlfSlcclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRDb2x1bW47XHJcbiIsImltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgZXZhbERlcGVuZHNPbiBmcm9tICcuLi91dGlscy9ldmFsRGVwZW5kc09uLmpzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtRmllbGQsIEZvcm1JbnB1dCwgRm9ybU5vdGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IENvbGxhcHNlZEZpZWxkTGFiZWwgZnJvbSAnLi4vY29tcG9uZW50cy9Db2xsYXBzZWRGaWVsZExhYmVsJztcclxuXHJcbmZ1bmN0aW9uIGlzT2JqZWN0IChhcmcpIHtcclxuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVNwZWMgKHNwZWMpIHtcclxuXHRpZiAoIXNwZWMpIHNwZWMgPSB7fTtcclxuXHRpZiAoIWlzT2JqZWN0KHNwZWMuc3VwcG9ydHMpKSB7XHJcblx0XHRzcGVjLnN1cHBvcnRzID0ge307XHJcblx0fVxyXG5cdGlmICghc3BlYy5mb2N1c1RhcmdldFJlZikge1xyXG5cdFx0c3BlYy5mb2N1c1RhcmdldFJlZiA9ICdmb2N1c1RhcmdldCc7XHJcblx0fVxyXG5cdHJldHVybiBzcGVjO1xyXG59XHJcblxyXG52YXIgQmFzZSA9IG1vZHVsZS5leHBvcnRzLkJhc2UgPSB7XHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhZG1pblBhdGg6IEtleXN0b25lLmFkbWluUGF0aCxcclxuXHRcdFx0aW5wdXRQcm9wczoge30sXHJcblx0XHRcdGxhYmVsUHJvcHM6IHt9LFxyXG5cdFx0XHR2YWx1ZVByb3BzOiB7fSxcclxuXHRcdFx0c2l6ZTogJ2Z1bGwnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldElucHV0TmFtZSAocGF0aCkge1xyXG5cdFx0Ly8gVGhpcyBjb3JyZWN0bHkgY3JlYXRlcyB0aGUgcGF0aCBmb3IgZmllbGQgaW5wdXRzLCBhbmQgc3VwcG9ydHMgdGhlXHJcblx0XHQvLyBpbnB1dE5hbWVQcmVmaXggcHJvcCB0aGF0IGlzIHJlcXVpcmVkIGZvciBuZXN0ZWQgZmllbGRzIHRvIHdvcmtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmlucHV0TmFtZVByZWZpeFxyXG5cdFx0XHQ/IGAke3RoaXMucHJvcHMuaW5wdXROYW1lUHJlZml4fVske3BhdGh9XWBcclxuXHRcdFx0OiBwYXRoO1xyXG5cdH0sXHJcblx0dmFsdWVDaGFuZ2VkIChldmVudCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvdWxkQ29sbGFwc2UgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWU7XHJcblx0fSxcclxuXHRzaG91bGRSZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5tb2RlID09PSAnY3JlYXRlJykgcmV0dXJuIHRydWU7XHJcblx0XHRyZXR1cm4gIXRoaXMucHJvcHMubm9lZGl0O1xyXG5cdH0sXHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlZnNbdGhpcy5zcGVjLmZvY3VzVGFyZ2V0UmVmXSkgcmV0dXJuO1xyXG5cdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzW3RoaXMuc3BlYy5mb2N1c1RhcmdldFJlZl0pLmZvY3VzKCk7XHJcblx0fSxcclxuXHRyZW5kZXJOb3RlICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5ub3RlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gPEZvcm1Ob3RlIGh0bWw9e3RoaXMucHJvcHMubm90ZX0gLz47XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRjb25zdCB7IGF1dG9Gb2N1cywgdmFsdWUsIGlucHV0UHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IHsuLi57XHJcblx0XHRcdFx0Li4uaW5wdXRQcm9wcyxcclxuXHRcdFx0XHRhdXRvRm9jdXMsXHJcblx0XHRcdFx0YXV0b0NvbXBsZXRlOiAnb2ZmJyxcclxuXHRcdFx0XHRuYW1lOiB0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpLFxyXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnZhbHVlQ2hhbmdlZCxcclxuXHRcdFx0XHRyZWY6ICdmb2N1c1RhcmdldCcsXHJcblx0XHRcdFx0dmFsdWUsXHJcblx0XHRcdH19IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIDxGb3JtSW5wdXQgbm9lZGl0Pnt0aGlzLnByb3BzLnZhbHVlfTwvRm9ybUlucHV0PjtcclxuXHR9LFxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdHZhciB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcclxuXHRcdFx0J2ZpZWxkLXR5cGUtJyArIHRoaXMucHJvcHMudHlwZSxcclxuXHRcdFx0dGhpcy5wcm9wcy5jbGFzc05hbWUsXHJcblx0XHRcdHsgJ2ZpZWxkLW1vbm9zcGFjZSc6IHRoaXMucHJvcHMubW9ub3NwYWNlIH1cclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGh0bWxGb3I9e3RoaXMucHJvcHMucGF0aH0gbGFiZWw9e3RoaXMucHJvcHMubGFiZWx9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzTmFtZX0gY3JvcExhYmVsPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnRm9ybUZpZWxkX19pbm5lciBmaWVsZC1zaXplLScgKyB0aGlzLnByb3BzLnNpemV9PlxyXG5cdFx0XHRcdFx0e3RoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSA/IHRoaXMucmVuZGVyRmllbGQoKSA6IHRoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJOb3RlKCl9XHJcblx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59O1xyXG5cclxudmFyIE1peGlucyA9IG1vZHVsZS5leHBvcnRzLk1peGlucyA9IHtcclxuXHRDb2xsYXBzZToge1xyXG5cdFx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0aXNDb2xsYXBzZWQ6IHRoaXMuc2hvdWxkQ29sbGFwc2UoKSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG5cdFx0XHRpZiAocHJldlN0YXRlLmlzQ29sbGFwc2VkICYmICF0aGlzLnN0YXRlLmlzQ29sbGFwc2VkKSB7XHJcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dW5jb2xsYXBzZSAoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGlzQ29sbGFwc2VkOiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyQ29sbGFwc2UgKCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxDb2xsYXBzZWRGaWVsZExhYmVsIG9uQ2xpY2s9e3RoaXMudW5jb2xsYXBzZX0+KyBBZGQge3RoaXMucHJvcHMubGFiZWwudG9Mb3dlckNhc2UoKX08L0NvbGxhcHNlZEZpZWxkTGFiZWw+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiAoc3BlYykge1xyXG5cclxuXHRzcGVjID0gdmFsaWRhdGVTcGVjKHNwZWMpO1xyXG5cclxuXHR2YXIgZmllbGQgPSB7XHJcblx0XHRzcGVjOiBzcGVjLFxyXG5cdFx0ZGlzcGxheU5hbWU6IHNwZWMuZGlzcGxheU5hbWUsXHJcblx0XHRtaXhpbnM6IFtNaXhpbnMuQ29sbGFwc2VdLFxyXG5cdFx0c3RhdGljczoge1xyXG5cdFx0XHRnZXREZWZhdWx0VmFsdWU6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cdFx0XHRcdHJldHVybiBmaWVsZC5kZWZhdWx0VmFsdWUgfHwgJyc7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyICgpIHtcclxuXHRcdFx0aWYgKHRoaXMucHJvcHMuaGlkZGVuKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFldmFsRGVwZW5kc09uKHRoaXMucHJvcHMuZGVwZW5kc09uLCB0aGlzLnByb3BzLnZhbHVlcykpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnJlbmRlckNvbGxhcHNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVUkoKTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0aWYgKHNwZWMuc3RhdGljcykge1xyXG5cdFx0T2JqZWN0LmFzc2lnbihmaWVsZC5zdGF0aWNzLCBzcGVjLnN0YXRpY3MpO1xyXG5cdH1cclxuXHJcblx0dmFyIGV4Y2x1ZGVCYXNlTWV0aG9kcyA9IHt9O1xyXG5cdGlmIChzcGVjLm1peGlucykge1xyXG5cdFx0c3BlYy5taXhpbnMuZm9yRWFjaChmdW5jdGlvbiAobWl4aW4pIHtcclxuXHRcdFx0T2JqZWN0LmtleXMobWl4aW4pLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdFx0XHRpZiAoQmFzZVtuYW1lXSkge1xyXG5cdFx0XHRcdFx0ZXhjbHVkZUJhc2VNZXRob2RzW25hbWVdID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRPYmplY3QuYXNzaWduKGZpZWxkLCBibGFja2xpc3QoQmFzZSwgZXhjbHVkZUJhc2VNZXRob2RzKSk7XHJcblx0T2JqZWN0LmFzc2lnbihmaWVsZCwgYmxhY2tsaXN0KHNwZWMsICdtaXhpbnMnLCAnc3RhdGljcycpKTtcclxuXHJcblx0aWYgKEFycmF5LmlzQXJyYXkoc3BlYy5taXhpbnMpKSB7XHJcblx0XHRmaWVsZC5taXhpbnMgPSBmaWVsZC5taXhpbnMuY29uY2F0KHNwZWMubWl4aW5zKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBSZWFjdC5jcmVhdGVDbGFzcyhmaWVsZCk7XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DaGVja2JveCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgQm9vbGVhbkNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Jvb2xlYW5Db2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgdHJ1bmNhdGU9e2ZhbHNlfSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0PENoZWNrYm94IHJlYWRvbmx5IGNoZWNrZWQ9e3RoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF19IC8+XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJvb2xlYW5Db2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NoZWNrYm94JztcclxuaW1wb3J0IHsgRm9ybUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgTk9PUCA9ICgpID0+IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnQm9vbGVhbkZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnQm9vbGVhbicsXHJcblx0fSxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGluZGVudDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdH0sXHJcblxyXG5cdHZhbHVlQ2hhbmdlZCAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB2YWx1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyRm9ybUlucHV0ICgpIHtcclxuXHRcdGlmICghdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSByZXR1cm47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHR2YWx1ZT17ISF0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdGNvbnN0IHsgaW5kZW50LCB2YWx1ZSwgbGFiZWwsIHBhdGggfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBkYXRhLWZpZWxkLW5hbWU9e3BhdGh9IGRhdGEtZmllbGQtdHlwZT1cImJvb2xlYW5cIj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkIG9mZnNldEFic2VudExhYmVsPXtpbmRlbnR9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIHN0eWxlPXt7IGhlaWdodDogJzIuM2VtJyB9fT5cclxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyRm9ybUlucHV0KCl9XHJcblx0XHRcdFx0XHRcdDxDaGVja2JveFxyXG5cdFx0XHRcdFx0XHRcdGNoZWNrZWQ9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpICYmIHRoaXMudmFsdWVDaGFuZ2VkKSB8fCBOT09QfVxyXG5cdFx0XHRcdFx0XHRcdHJlYWRvbmx5PXshdGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnLjc1ZW0nIH19PlxyXG5cdFx0XHRcdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgVkFMVUVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgQ2hlY2tlZCcsIHZhbHVlOiB0cnVlIH0sXHJcblx0eyBsYWJlbDogJ0lzIE5PVCBDaGVja2VkJywgdmFsdWU6IGZhbHNlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHR2YWx1ZTogdHJ1ZSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgQm9vbGVhbkZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiA8U2VnbWVudGVkQ29udHJvbCBlcXVhbFdpZHRoU2VnbWVudHMgb3B0aW9ucz17VkFMVUVfT1BUSU9OU30gdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLnZhbHVlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gLz47XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJvb2xlYW5GaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29sdW1ucy9DbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBDbG91ZGluYXJ5SW1hZ2VDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSB8fCAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdDxDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5IGxhYmVsPVwiZGltZW5zaW9uc1wiIGltYWdlPXt2YWx1ZX0gLz5cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENsb3VkaW5hcnlJbWFnZUNvbHVtbjtcclxuIiwiLypcclxuVE9ETzogQ2xvdWRpbmFyeUltYWdlVHlwZSBhY3RhbGx5IHN1cHBvcnRzICdyZW1vdmUnIGFuZCAncmVzZXQnIGFjdGlvbnMsIGJ1dFxyXG50aGlzIGZpZWxkIHdpbGwgb25seSBzdWJtaXQgYFwiXCJgIHdoZW4gJ3JlbW92ZScgaXMgY2xpY2tlZC4gQGpvc3NtYWMgd2UgbmVlZCB0b1xyXG53b3JrIG91dCB3aGV0aGVyIHdlJ3JlIGdvaW5nIHRvIHN1cHBvcnQgZGVsZXRpbmcgdGhyb3VnaCB0aGUgVUkuXHJcbiovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgY2xvdWRpbmFyeVJlc2l6ZSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY2xvdWRpbmFyeVJlc2l6ZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybUZpZWxkLCBGb3JtSW5wdXQsIEZvcm1Ob3RlIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IEltYWdlVGh1bWJuYWlsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSW1hZ2VUaHVtYm5haWwnO1xyXG5pbXBvcnQgRmlsZUNoYW5nZU1lc3NhZ2UgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9GaWxlQ2hhbmdlTWVzc2FnZSc7XHJcbmltcG9ydCBIaWRkZW5GaWxlSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IaWRkZW5GaWxlSW5wdXQnO1xyXG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcclxuXHJcbmNvbnN0IFNVUFBPUlRFRF9UWVBFUyA9IFsnaW1hZ2UvKicsICdhcHBsaWNhdGlvbi9wZGYnLCAnYXBwbGljYXRpb24vcG9zdHNjcmlwdCddO1xyXG5jb25zdCBTVVBQT1JURURfUkVHRVggPSBuZXcgUmVnRXhwKC9eaW1hZ2VcXC98YXBwbGljYXRpb25cXC9wZGZ8YXBwbGljYXRpb25cXC9wb3N0c2NyaXB0L2cpO1xyXG5cclxubGV0IHVwbG9hZEluYyA9IDEwMDA7XHJcblxyXG5jb25zdCBidWlsZEluaXRpYWxTdGF0ZSA9IChwcm9wcykgPT4gKHtcclxuXHRyZW1vdmVFeGlzdGluZzogZmFsc2UsXHJcblx0dXBsb2FkRmllbGRQYXRoOiBgQ2xvdWRpbmFyeUltYWdlLSR7cHJvcHMucGF0aH0tJHsrK3VwbG9hZEluY31gLFxyXG5cdHVzZXJTZWxlY3RlZEZpbGU6IG51bGwsXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sbGFwc2U6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRub3RlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRwdWJsaWNfaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHJlc291cmNlX3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHNlY3VyZV91cmw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHNpZ25hdHVyZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHR2ZXJzaW9uOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ0Nsb3VkaW5hcnlJbWFnZScsXHJcblx0XHRnZXREZWZhdWx0VmFsdWU6ICgpID0+ICh7fSksXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIGJ1aWxkSW5pdGlhbFN0YXRlKHRoaXMucHJvcHMpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnQ2xvdWRpbmFyeUltYWdlRmllbGQgbmV4dFByb3BzOicsIG5leHRQcm9wcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMpIHtcclxuXHRcdC8vIFJlc2V0IHRoZSBhY3Rpb24gc3RhdGUgd2hlbiB0aGUgdmFsdWUgY2hhbmdlc1xyXG5cdFx0Ly8gVE9ETzogV2Ugc2hvdWxkIGFkZCBhIGNoZWNrIGZvciBhIG5ldyBpdGVtIElEIGluIHRoZSBzdG9yZVxyXG5cdFx0aWYgKHRoaXMucHJvcHMudmFsdWUucHVibGljX2lkICE9PSBuZXh0UHJvcHMudmFsdWUucHVibGljX2lkKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHJlbW92ZUV4aXN0aW5nOiBmYWxzZSxcclxuXHRcdFx0XHR1c2VyU2VsZWN0ZWRGaWxlOiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBIRUxQRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGhhc0xvY2FsICgpIHtcclxuXHRcdHJldHVybiAhIXRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZTtcclxuXHR9LFxyXG5cdGhhc0V4aXN0aW5nICgpIHtcclxuXHRcdHJldHVybiAhISh0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMucHJvcHMudmFsdWUudXJsKTtcclxuXHR9LFxyXG5cdGhhc0ltYWdlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0V4aXN0aW5nKCkgfHwgdGhpcy5oYXNMb2NhbCgpO1xyXG5cdH0sXHJcblx0Z2V0RmlsZW5hbWUgKCkge1xyXG5cdFx0Y29uc3QgeyBmb3JtYXQsIGhlaWdodCwgcHVibGljX2lkLCB3aWR0aCB9ID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlXHJcblx0XHRcdD8gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlLm5hbWVcclxuXHRcdFx0OiBgJHtwdWJsaWNfaWR9LiR7Zm9ybWF0fSAoJHt3aWR0aH3DlyR7aGVpZ2h0fSlgO1xyXG5cdH0sXHJcblx0Z2V0SW1hZ2VTb3VyY2UgKGhlaWdodCA9IDkwKSB7XHJcblx0XHQvLyBUT0RPOiBUaGlzIGxldHMgcmVhbGx5IHdpZGUgaW1hZ2VzIGJyZWFrIHRoZSBsYXlvdXRcclxuXHRcdGxldCBzcmM7XHJcblx0XHRpZiAodGhpcy5oYXNMb2NhbCgpKSB7XHJcblx0XHRcdHNyYyA9IHRoaXMuc3RhdGUuZGF0YVVyaTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5oYXNFeGlzdGluZygpKSB7XHJcblx0XHRcdHNyYyA9IGNsb3VkaW5hcnlSZXNpemUodGhpcy5wcm9wcy52YWx1ZS5wdWJsaWNfaWQsIHtcclxuXHRcdFx0XHRjcm9wOiAnZml0JyxcclxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodCxcclxuXHRcdFx0XHRmb3JtYXQ6ICdqcGcnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3JjO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIE1FVEhPRFNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0dHJpZ2dlckZpbGVCcm93c2VyICgpIHtcclxuXHRcdHRoaXMucmVmcy5maWxlSW5wdXQuY2xpY2tEb21Ob2RlKCk7XHJcblx0fSxcclxuXHRoYW5kbGVGaWxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0Y29uc3QgdXNlclNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHsgdXNlclNlbGVjdGVkRmlsZSB9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBUb2dnbGUgdGhlIGxpZ2h0Ym94XHJcblx0b3BlbkxpZ2h0Ym94IChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRsaWdodGJveElzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2xvc2VMaWdodGJveCAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bGlnaHRib3hJc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Ly8gSGFuZGxlIGltYWdlIHNlbGVjdGlvbiBpbiBmaWxlIGJyb3dzZXJcclxuXHRoYW5kbGVJbWFnZUNoYW5nZSAoZSkge1xyXG5cdFx0aWYgKCF3aW5kb3cuRmlsZVJlYWRlcikge1xyXG5cdFx0XHRyZXR1cm4gYWxlcnQoJ0ZpbGUgcmVhZGVyIG5vdCBzdXBwb3J0ZWQgYnkgYnJvd3Nlci4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XHJcblx0XHRpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcblx0XHRpZiAoIWZpbGUudHlwZS5tYXRjaChTVVBQT1JURURfUkVHRVgpKSB7XHJcblx0XHRcdHJldHVybiBhbGVydCgnVW5zdXBwb3J0ZWQgZmlsZSB0eXBlLiBTdXBwb3J0ZWQgZm9ybWF0cyBhcmU6IEdJRiwgUE5HLCBKUEcsIEJNUCwgSUNPLCBQREYsIFRJRkYsIEVQUywgUFNELCBTVkcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuXHJcblx0XHRyZWFkZXIub25sb2Fkc3RhcnQgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IHRydWUsXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdHJlYWRlci5vbmxvYWRlbmQgPSAodXBsb2FkKSA9PiB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGRhdGFVcmk6IHVwbG9hZC50YXJnZXQucmVzdWx0LFxyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHVzZXJTZWxlY3RlZEZpbGU6IGZpbGUsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgZmlsZTogZmlsZSB9KTtcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Ly8gSWYgd2UgaGF2ZSBhIGxvY2FsIGZpbGUgYWRkZWQgdGhlbiByZW1vdmUgaXQgYW5kIHJlc2V0IHRoZSBmaWxlIGZpZWxkLlxyXG5cdGhhbmRsZVJlbW92ZSAoZSkge1xyXG5cdFx0dmFyIHN0YXRlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZSkge1xyXG5cdFx0XHRzdGF0ZS51c2VyU2VsZWN0ZWRGaWxlID0gbnVsbDtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5oYXNFeGlzdGluZygpKSB7XHJcblx0XHRcdHN0YXRlLnJlbW92ZUV4aXN0aW5nID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuXHR9LFxyXG5cdHVuZG9SZW1vdmUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShidWlsZEluaXRpYWxTdGF0ZSh0aGlzLnByb3BzKSk7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gUkVOREVSRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHJlbmRlckxpZ2h0Ym94ICgpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKCF2YWx1ZSB8fCAhdmFsdWUucHVibGljX2lkKSByZXR1cm47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpZ2h0Ym94XHJcblx0XHRcdFx0Y3VycmVudEltYWdlPXswfVxyXG5cdFx0XHRcdGltYWdlcz17W3sgc3JjOiB0aGlzLmdldEltYWdlU291cmNlKDYwMCkgfV19XHJcblx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNWaXNpYmxlfVxyXG5cdFx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cclxuXHRcdFx0XHRzaG93SW1hZ2VDb3VudD17ZmFsc2V9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVySW1hZ2VQcmV2aWV3ICgpIHtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gcmVuZGVyIGljb24gZmVlZGJhY2sgZm9yIGludGVudFxyXG5cdFx0bGV0IG1hc2s7XHJcblx0XHRpZiAodGhpcy5oYXNMb2NhbCgpKSBtYXNrID0gJ3VwbG9hZCc7XHJcblx0XHRlbHNlIGlmICh0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSBtYXNrID0gJ3JlbW92ZSc7XHJcblx0XHRlbHNlIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIG1hc2sgPSAnbG9hZGluZyc7XHJcblxyXG5cdFx0Y29uc3Qgc2hvdWxkT3BlbkxpZ2h0Ym94ID0gdmFsdWUuZm9ybWF0ICE9PSAncGRmJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SW1hZ2VUaHVtYm5haWxcclxuXHRcdFx0XHRjb21wb25lbnQ9XCJhXCJcclxuXHRcdFx0XHRocmVmPXt0aGlzLmdldEltYWdlU291cmNlKDYwMCl9XHJcblx0XHRcdFx0b25DbGljaz17c2hvdWxkT3BlbkxpZ2h0Ym94ICYmIHRoaXMub3BlbkxpZ2h0Ym94fVxyXG5cdFx0XHRcdG1hc2s9e21hc2t9XHJcblx0XHRcdFx0dGFyZ2V0PVwiX19ibGFua1wiXHJcblx0XHRcdFx0c3R5bGU9e3sgZmxvYXQ6ICdsZWZ0JywgbWFyZ2luUmlnaHQ6ICcxZW0nIH19XHJcblx0XHRcdD5cclxuXHRcdFx0XHQ8aW1nIHNyYz17dGhpcy5nZXRJbWFnZVNvdXJjZSgpfSBzdHlsZT17eyBoZWlnaHQ6IDkwIH19IC8+XHJcblx0XHRcdDwvSW1hZ2VUaHVtYm5haWw+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyRmlsZU5hbWVBbmRPcHRpb25hbE1lc3NhZ2UgKHNob3dDaGFuZ2VNZXNzYWdlID0gZmFsc2UpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/IChcclxuXHRcdFx0XHRcdDxGaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0XHRcdFx0e3RoaXMuZ2V0RmlsZW5hbWUoKX1cclxuXHRcdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdFx0KSA6IG51bGx9XHJcblx0XHRcdFx0e3Nob3dDaGFuZ2VNZXNzYWdlICYmIHRoaXMucmVuZGVyQ2hhbmdlTWVzc2FnZSgpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDaGFuZ2VNZXNzYWdlICgpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2UgY29sb3I9XCJzdWNjZXNzXCI+XHJcblx0XHRcdFx0XHRTYXZlIHRvIFVwbG9hZFxyXG5cdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUucmVtb3ZlRXhpc3RpbmcpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2UgY29sb3I9XCJkYW5nZXJcIj5cclxuXHRcdFx0XHRcdFNhdmUgdG8gUmVtb3ZlXHJcblx0XHRcdFx0PC9GaWxlQ2hhbmdlTWVzc2FnZT5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIE91dHB1dCBbY2FuY2VsL3JlbW92ZS91bmRvXSBidXR0b25cclxuXHRyZW5kZXJDbGVhckJ1dHRvbiAoKSB7XHJcblx0XHRjb25zdCBjbGVhclRleHQgPSB0aGlzLmhhc0xvY2FsKCkgPyAnQ2FuY2VsJyA6ICdSZW1vdmUgSW1hZ2UnO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nID8gKFxyXG5cdFx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgb25DbGljaz17dGhpcy51bmRvUmVtb3ZlfT5cclxuXHRcdFx0XHRVbmRvIFJlbW92ZVxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdCkgOiAoXHJcblx0XHRcdDxCdXR0b24gdmFyaWFudD1cImxpbmtcIiBjb2xvcj1cImNhbmNlbFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmVtb3ZlfT5cclxuXHRcdFx0XHR7Y2xlYXJUZXh0fVxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySW1hZ2VUb29sYmFyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYga2V5PXt0aGlzLnByb3BzLnBhdGggKyAnX3Rvb2xiYXInfSBjbGFzc05hbWU9XCJpbWFnZS10b29sYmFyXCI+XHJcblx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRyaWdnZXJGaWxlQnJvd3Nlcn0+XHJcblx0XHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpID8gJ0NoYW5nZScgOiAnVXBsb2FkJ30gSW1hZ2VcclxuXHRcdFx0XHQ8L0J1dHRvbj5cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpID8gdGhpcy5yZW5kZXJDbGVhckJ1dHRvbigpIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpbGVJbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEhpZGRlbkZpbGVJbnB1dFxyXG5cdFx0XHRcdGFjY2VwdD17U1VQUE9SVEVEX1RZUEVTLmpvaW4oKX1cclxuXHRcdFx0XHRyZWY9XCJmaWxlSW5wdXRcIlxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuc3RhdGUudXBsb2FkRmllbGRQYXRofVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUltYWdlQ2hhbmdlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJBY3Rpb25JbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZSB8fCB0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlXHJcblx0XHRcdFx0PyBgdXBsb2FkOiR7dGhpcy5zdGF0ZS51cGxvYWRGaWVsZFBhdGh9YFxyXG5cdFx0XHRcdDogJyc7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGlucHV0XHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdFx0dHlwZT1cImhpZGRlblwiXHJcblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdGNvbnN0IHsgbGFiZWwsIG5vdGUsIHBhdGggfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgaW1hZ2VDb250YWluZXIgPSAoXHJcblx0XHRcdDxkaXYgc3R5bGU9e3RoaXMuaGFzSW1hZ2UoKSA/IHsgbWFyZ2luQm90dG9tOiAnMWVtJyB9IDogbnVsbH0+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSAmJiB0aGlzLnJlbmRlckltYWdlUHJldmlldygpfVxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgJiYgdGhpcy5yZW5kZXJGaWxlTmFtZUFuZE9wdGlvbmFsTWVzc2FnZSh0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblxyXG5cdFx0Y29uc3QgdG9vbGJhciA9IHRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKVxyXG5cdFx0XHQ/IHRoaXMucmVuZGVySW1hZ2VUb29sYmFyKClcclxuXHRcdFx0OiA8Rm9ybUlucHV0IG5vZWRpdCAvPjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGxhYmVsPXtsYWJlbH0gY2xhc3NOYW1lPVwiZmllbGQtdHlwZS1jbG91ZGluYXJ5aW1hZ2VcIiBodG1sRm9yPXtwYXRofT5cclxuXHRcdFx0XHR7aW1hZ2VDb250YWluZXJ9XHJcblx0XHRcdFx0e3Rvb2xiYXJ9XHJcblx0XHRcdFx0eyEhbm90ZSAmJiA8Rm9ybU5vdGUgbm90ZT17bm90ZX0gLz59XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTGlnaHRib3goKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJGaWxlSW5wdXQoKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBY3Rpb25JbnB1dCgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBTZWdtZW50ZWRDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgU2V0JywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIFNldCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZXhpc3RzOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBDbG91ZGluYXJ5SW1hZ2VGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGV4aXN0czogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHRvZ2dsZUV4aXN0cyAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBleGlzdHM6IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlRXhpc3RzfVxyXG5cdFx0XHRcdG9wdGlvbnM9e09QVElPTlN9XHJcblx0XHRcdFx0dmFsdWU9e2ZpbHRlci5leGlzdHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBEYXRlQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUNvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0bGlua1RvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0VmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgZm9ybWF0ID0gKHRoaXMucHJvcHMuY29sLnR5cGUgPT09ICdkYXRldGltZScpID8gJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyA6ICdNTU1NIERvIFlZWVknO1xyXG5cdFx0cmV0dXJuIG1vbWVudCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfSB0bz17dGhpcy5wcm9wcy5saW5rVG99IGVtcHR5PXtlbXB0eX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IERheVBpY2tlciBmcm9tICdyZWFjdC1kYXktcGlja2VyJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1TZWxlY3QsXHJcblx0R3JpZCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ01hdGNoZXMnLCB2YWx1ZTogZmFsc2UgfSxcclxuXHR7IGxhYmVsOiAnRG9lcyBOT1QgTWF0Y2gnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdPbicsIHZhbHVlOiAnb24nIH0sXHJcblx0eyBsYWJlbDogJ0FmdGVyJywgdmFsdWU6ICdhZnRlcicgfSxcclxuXHR7IGxhYmVsOiAnQmVmb3JlJywgdmFsdWU6ICdiZWZvcmUnIH0sXHJcblx0eyBsYWJlbDogJ0JldHdlZW4nLCB2YWx1ZTogJ2JldHdlZW4nIH0sXHJcbl07XHJcblxyXG5jb25zdCBEYXlQaWNrZXJJbmRpY2F0b3IgPSAoeyBhY3RpdmVJbnB1dEZpZWxkIH0pID0+IHtcclxuXHRjb25zdCBzdHlsZSA9IGFjdGl2ZUlucHV0RmllbGQgPT09ICdiZWZvcmUnID8geyBsZWZ0OiAnMTFyZW0nIH0gOiBudWxsO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwiRGF5UGlja2VyLUluZGljYXRvclwiIHN0eWxlPXtzdHlsZX0+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JfX2JvcmRlclwiIC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JfX2JnXCIgLz5cclxuXHRcdDwvc3Bhbj5cclxuXHQpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdFx0YmVmb3JlOiBtb21lbnQoMCwgJ0hIJykuZm9ybWF0KCksXHJcblx0XHRhZnRlcjogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBEYXRlRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUZpbHRlcicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdG1vZGU6IFByb3BUeXBlcy5vbmVPZihNT0RFX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0XHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdDogJ0RELU1NLVlZWVknLFxyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0XHR2YWx1ZTogbW9tZW50KCkuc3RhcnRPZignZGF5JykudG9EYXRlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFjdGl2ZUlucHV0RmllbGQ6ICdhZnRlcicsXHJcblx0XHRcdG1vbnRoOiBuZXcgRGF0ZSgpLCAvLyBUaGUgbW9udGggdG8gZGlzcGxheSBpbiB0aGUgY2FsZW5kYXJcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLl9faXNNb3VudGVkID0gdHJ1ZTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdHRoaXMuX19pc01vdW50ZWQgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHVwZGF0ZUZpbHRlciAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4udmFsdWUgfSk7XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAodmFsdWUpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQ6IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5zZXRGb2N1cyh0aGlzLnByb3BzLmZpbHRlci5tb2RlKTtcclxuXHR9LFxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZSB9KTtcclxuXHRcdHRoaXMuc2V0Rm9jdXMobW9kZSk7XHJcblx0fSxcclxuXHRzZXRGb2N1cyAobW9kZSkge1xyXG5cdFx0Ly8gZ2l2ZSB0aGUgVUkgYSBtb21lbnQgdG8gcmVuZGVyXHJcblx0XHRpZiAobW9kZSA9PT0gJ2JldHdlZW4nKSB7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1t0aGlzLnN0YXRlLmFjdGl2ZUlucHV0RmllbGRdKS5mb2N1cygpO1xyXG5cdFx0XHR9LCA1MCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdC8vIFRPRE8gQGplZHdhdHNvblxyXG5cdFx0Ly8gRW50ZXJpbmcgdmlydHVhbGx5IGFueSB2YWx1ZSB3aWxsIHJldHVybiBhbiBcIkludmFsaWQgZGF0ZVwiLCBzbyBJJ21cclxuXHRcdC8vIHRlbXBvcmFyaWx5IGRpc2FibGluZyB1c2VyIGVudHJ5LiBUaGlzIGVudGlyZSBjb21wb25lbnQgbmVlZHMgcmV2aWV3LlxyXG5cclxuXHRcdC8vIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG5cdFx0Ly8gbGV0IHsgbW9udGggfSA9IHRoaXMuc3RhdGU7XHJcblx0XHQvLyAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbW9udGggb25seSBpZiB0aGUgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlciBpcyBhIHZhbGlkXHJcblx0XHQvLyAvLyBkYXRlLCBhY2NvcmRpbmcgdG8gdGhlIGBMYCBmb3JtYXRcclxuXHRcdC8vIGlmIChtb21lbnQodmFsdWUsICdMJywgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHQvLyBcdG1vbnRoID0gbW9tZW50KHZhbHVlLCAnTCcpLnRvRGF0ZSgpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gdGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogdmFsdWUgfSk7XHJcblx0XHQvLyB0aGlzLnNldFN0YXRlKHsgbW9udGggfSwgdGhpcy5zaG93Q3VycmVudERhdGUpO1xyXG5cdH0sXHJcblx0c2V0QWN0aXZlRmllbGQgKGZpZWxkKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0YWN0aXZlSW5wdXRGaWVsZDogZmllbGQsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHN3aXRjaEJldHdlZW5BY3RpdmVJbnB1dEZpZWxkcyAoZSwgZGF5LCBtb2RpZmllcnMpIHtcclxuXHRcdGlmIChtb2RpZmllcnMgJiYgbW9kaWZpZXJzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgeyBhY3RpdmVJbnB1dEZpZWxkIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3Qgc2VuZCA9IHt9O1xyXG5cdFx0Y29uc3QgbmV3QWN0aXZlRmllbGQgPSBhY3RpdmVJbnB1dEZpZWxkID09PSAnYmVmb3JlJ1xyXG5cdFx0XHQ/ICdhZnRlcidcclxuXHRcdFx0OiAnYmVmb3JlJztcclxuXHRcdHNlbmRbYWN0aXZlSW5wdXRGaWVsZF0gPSBkYXk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcihzZW5kKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoXHJcblx0XHRcdHsgYWN0aXZlSW5wdXRGaWVsZDogbmV3QWN0aXZlRmllbGQgfSxcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1tuZXdBY3RpdmVGaWVsZF0pLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fSxcclxuXHRzZWxlY3REYXkgKGUsIGRheSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogZGF5IH0pO1xyXG5cdH0sXHJcblx0c2hvd0N1cnJlbnREYXRlICgpIHtcclxuXHRcdC8vIGdpdmUgdGhlIFVJIGEgbW9tZW50IHRvIHJlbmRlclxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVmcy5kYXlwaWNrZXIuc2hvd01vbnRoKHRoaXMuc3RhdGUubW9udGgpO1xyXG5cdFx0fSwgNTApO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIFJFTkRFUkVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRyZW5kZXJUb2dnbGUgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlSW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHRvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfVxyXG5cdFx0XHRcdFx0dmFsdWU9e2ZpbHRlci5pbnZlcnRlZH1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250cm9scyAoKSB7XHJcblx0XHRsZXQgY29udHJvbHM7XHJcblx0XHRjb25zdCB7IGFjdGl2ZUlucHV0RmllbGQgfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gZmllbGQubGFiZWwgKyAnIGlzICcgKyBtb2RlLmxhYmVsLnRvTG93ZXJDYXNlKCkgKyAnLi4uJztcclxuXHJcblx0XHQvLyBEYXlQaWNrZXIgTW9kaWZpZXJzIC0gU2VsZWN0ZWQgRGF5XHJcblx0XHRsZXQgbW9kaWZpZXJzID0gZmlsdGVyLm1vZGUgPT09ICdiZXR3ZWVuJyA/IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChmaWx0ZXJbYWN0aXZlSW5wdXRGaWVsZF0pLmlzU2FtZShkYXkpLFxyXG5cdFx0fSA6IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChmaWx0ZXIudmFsdWUpLmlzU2FtZShkYXkpLFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAobW9kZS52YWx1ZSA9PT0gJ2JldHdlZW4nKSB7XHJcblx0XHRcdGNvbnRyb2xzID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHRcdDxHcmlkLlJvdyB4c21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZj1cImFmdGVyXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJGcm9tXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uRm9jdXM9eygpID0+IHRoaXMuc2V0QWN0aXZlRmllbGQoJ2FmdGVyJyl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLmFmdGVyKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVmPVwiYmVmb3JlXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJUb1wiXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUZpZWxkKCdiZWZvcmUnKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e21vbWVudChmaWx0ZXIuYmVmb3JlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHRcdFx0XHQ8L0dyaWQuUm93PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiRGF5UGlja2VyLS1jaHJvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuc3dpdGNoQmV0d2VlbkFjdGl2ZUlucHV0RmllbGRzfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VySW5kaWNhdG9yIGFjdGl2ZUlucHV0RmllbGQ9e2FjdGl2ZUlucHV0RmllbGR9IC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnRyb2xzID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRhdXRvRm9jdXNcclxuXHRcdFx0XHRcdFx0XHRyZWY9XCJpbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLnZhbHVlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuc2hvd0N1cnJlbnREYXRlfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwiZGF5cGlja2VyXCJcclxuXHRcdFx0XHRcdFx0XHRtb2RpZmllcnM9e21vZGlmaWVyc31cclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJEYXlQaWNrZXItLWNocm9tZVwiXHJcblx0XHRcdFx0XHRcdFx0b25EYXlDbGljaz17dGhpcy5zZWxlY3REYXl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDxEYXlQaWNrZXJJbmRpY2F0b3IgLz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjb250cm9scztcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IG1vZGUgPSBNT0RFX09QVElPTlMuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gZmlsdGVyLm1vZGUpWzBdO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJUb2dnbGUoKX1cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHQ8Rm9ybVNlbGVjdFxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtNT0RFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNlbGVjdE1vZGV9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXttb2RlLnZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb250cm9scygpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVGaWx0ZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vZGF0ZS9EYXRlQ29sdW1uJyk7XHJcbiIsImltcG9ydCBEYXRlSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EYXRlSW5wdXQnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybU5vdGUsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ0RhdGV0aW1lRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdEYXRldGltZScsXHJcblx0fSxcclxuXHJcblx0Zm9jdXNUYXJnZXRSZWY6ICdkYXRlSW5wdXQnLFxyXG5cclxuXHQvLyBkZWZhdWx0IGlucHV0IGZvcm1hdHNcclxuXHRkYXRlSW5wdXRGb3JtYXQ6ICdZWVlZLU1NLUREJyxcclxuXHR0aW1lSW5wdXRGb3JtYXQ6ICdoOm1tOnNzIGEnLFxyXG5cdHR6T2Zmc2V0SW5wdXRGb3JtYXQ6ICdaJyxcclxuXHJcblx0Ly8gcGFyc2UgZm9ybWF0cyAoZHVwbGljYXRlZCBmcm9tIGxpYi9maWVsZFR5cGVzL2RhdGV0aW1lLmpzKVxyXG5cdHBhcnNlRm9ybWF0czogWydZWVlZLU1NLUREJywgJ1lZWVktTU0tREQgaDptOnMgYScsICdZWVlZLU1NLUREIGg6bSBhJywgJ1lZWVktTU0tREQgSDptOnMnLCAnWVlZWS1NTS1ERCBIOm0nXSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRhdGVWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLm1vbWVudCh0aGlzLnByb3BzLnZhbHVlKS5mb3JtYXQodGhpcy5kYXRlSW5wdXRGb3JtYXQpLFxyXG5cdFx0XHR0aW1lVmFsdWU6IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5tb21lbnQodGhpcy5wcm9wcy52YWx1ZSkuZm9ybWF0KHRoaXMudGltZUlucHV0Rm9ybWF0KSxcclxuXHRcdFx0dHpPZmZzZXRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSA/IHRoaXMubW9tZW50KHRoaXMucHJvcHMudmFsdWUpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpIDogdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1hdFN0cmluZzogJ0RvIE1NTSBZWVlZLCBoOm1tOnNzIGEnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRtb21lbnQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuaXNVVEMpIHJldHVybiBtb21lbnQudXRjLmFwcGx5KG1vbWVudCwgYXJndW1lbnRzKTtcclxuXHRcdGVsc2UgcmV0dXJuIG1vbWVudC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETzogTW92ZSBpc1ZhbGlkKCkgc28gd2UgY2FuIHNoYXJlIHdpdGggc2VydmVyLXNpZGUgY29kZVxyXG5cdGlzVmFsaWQgKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tb21lbnQodmFsdWUsIHRoaXMucGFyc2VGb3JtYXRzKS5pc1ZhbGlkKCk7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETzogTW92ZSBmb3JtYXQoKSBzbyB3ZSBjYW4gc2hhcmUgd2l0aCBzZXJ2ZXItc2lkZSBjb2RlXHJcblx0Zm9ybWF0ICh2YWx1ZSwgZm9ybWF0KSB7XHJcblx0XHRmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5kYXRlSW5wdXRGb3JtYXQgKyAnICcgKyB0aGlzLnRpbWVJbnB1dEZvcm1hdDtcclxuXHRcdHJldHVybiB2YWx1ZSA/IHRoaXMubW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KSA6ICcnO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZUNoYW5nZSAoZGF0ZVZhbHVlLCB0aW1lVmFsdWUsIHR6T2Zmc2V0VmFsdWUpIHtcclxuXHRcdHZhciB2YWx1ZSA9IGRhdGVWYWx1ZSArICcgJyArIHRpbWVWYWx1ZTtcclxuXHRcdHZhciBkYXRldGltZUZvcm1hdCA9IHRoaXMuZGF0ZUlucHV0Rm9ybWF0ICsgJyAnICsgdGhpcy50aW1lSW5wdXRGb3JtYXQ7XHJcblxyXG5cdFx0Ly8gaWYgdGhlIGNoYW5nZSBpbmNsdWRlZCBhIHRpbWV6b25lIG9mZnNldCwgaW5jbHVkZSB0aGF0IGluIHRoZSBjYWxjdWxhdGlvbiAoc28gTk9XIHdvcmtzIGNvcnJlY3RseSBkdXJpbmcgRFNUIGNoYW5nZXMpXHJcblx0XHRpZiAodHlwZW9mIHR6T2Zmc2V0VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHZhbHVlICs9ICcgJyArIHR6T2Zmc2V0VmFsdWU7XHJcblx0XHRcdGRhdGV0aW1lRm9ybWF0ICs9ICcgJyArIHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdDtcclxuXHRcdH1cclxuXHRcdC8vIGlmIG5vdCwgY2FsY3VsYXRlIHRoZSB0aW1lem9uZSBvZmZzZXQgYmFzZWQgb24gdGhlIGRhdGUgKHJlc3BlY3QgZGlmZmVyZW50IERTVCB2YWx1ZXMpXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHR6T2Zmc2V0VmFsdWU6IHRoaXMubW9tZW50KHZhbHVlLCBkYXRldGltZUZvcm1hdCkuZm9ybWF0KHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdCkgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHRoaXMuaXNWYWxpZCh2YWx1ZSkgPyB0aGlzLm1vbWVudCh2YWx1ZSwgZGF0ZXRpbWVGb3JtYXQpLnRvSVNPU3RyaW5nKCkgOiBudWxsLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0ZGF0ZUNoYW5nZWQgKHsgdmFsdWUgfSkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRhdGVWYWx1ZTogdmFsdWUgfSk7XHJcblx0XHR0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSwgdGhpcy5zdGF0ZS50aW1lVmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHRpbWVDaGFuZ2VkIChldnQpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyB0aW1lVmFsdWU6IGV2dC50YXJnZXQudmFsdWUgfSk7XHJcblx0XHR0aGlzLmhhbmRsZUNoYW5nZSh0aGlzLnN0YXRlLmRhdGVWYWx1ZSwgZXZ0LnRhcmdldC52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2V0Tm93ICgpIHtcclxuXHRcdHZhciBkYXRlVmFsdWUgPSB0aGlzLm1vbWVudCgpLmZvcm1hdCh0aGlzLmRhdGVJbnB1dEZvcm1hdCk7XHJcblx0XHR2YXIgdGltZVZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50aW1lSW5wdXRGb3JtYXQpO1xyXG5cdFx0dmFyIHR6T2Zmc2V0VmFsdWUgPSB0aGlzLm1vbWVudCgpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGRhdGVWYWx1ZTogZGF0ZVZhbHVlLFxyXG5cdFx0XHR0aW1lVmFsdWU6IHRpbWVWYWx1ZSxcclxuXHRcdFx0dHpPZmZzZXRWYWx1ZTogdHpPZmZzZXRWYWx1ZSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UoZGF0ZVZhbHVlLCB0aW1lVmFsdWUsIHR6T2Zmc2V0VmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlck5vdGUgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLm5vdGUpIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIDxGb3JtTm90ZSBub3RlPXt0aGlzLnByb3BzLm5vdGV9IC8+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclVJICgpIHtcclxuXHRcdHZhciBpbnB1dDtcclxuXHRcdGlmICh0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHtcclxuXHRcdFx0aW5wdXQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxHcm91cD5cclxuXHRcdFx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdFx0XHQ8RGF0ZUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtYXQ9e3RoaXMuZGF0ZUlucHV0Rm9ybWF0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRocy5kYXRlKX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmRhdGVDaGFuZ2VkfVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVmPVwiZGF0ZUlucHV0XCJcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLmRhdGVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMudGltZSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50aW1lQ2hhbmdlZH1cclxuXHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSEg6TU06U1MgYW0vcG1cIlxyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudGltZVZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PFNlY3Rpb24+XHJcblx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNldE5vd30+Tm93PC9CdXR0b24+XHJcblx0XHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRocy50ek9mZnNldCl9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS50ek9mZnNldFZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlucHV0ID0gKFxyXG5cdFx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0PlxyXG5cdFx0XHRcdFx0e3RoaXMuZm9ybWF0KHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0U3RyaW5nKX1cclxuXHRcdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGb3JtRmllbGQgbGFiZWw9e3RoaXMucHJvcHMubGFiZWx9IGNsYXNzTmFtZT1cImZpZWxkLXR5cGUtZGF0ZXRpbWVcIiBodG1sRm9yPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfT5cclxuXHRcdFx0XHR7aW5wdXR9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTm90ZSgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vZGF0ZS9EYXRlRmlsdGVyJyk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgRW1haWxDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdFbWFpbENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgdG89eydtYWlsdG86JyArIHZhbHVlfSBwYWRkZWQgZXh0ZXJpb3IgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdHt2YWx1ZX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW1haWxDb2x1bW47XHJcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbi8qXHJcblx0VE9ETzpcclxuXHQtIGdyYXZhdGFyXHJcblx0LSB2YWxpZGF0ZSBlbWFpbCBhZGRyZXNzXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnRW1haWxGaWVsZCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdFbWFpbCcsXHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRyZWY9XCJmb2N1c1RhcmdldFwiXHJcblx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0dHlwZT1cImVtYWlsXCJcclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy52YWx1ZSA/IChcclxuXHRcdFx0PEZvcm1JbnB1dCBub2VkaXQgY29tcG9uZW50PVwiYVwiIGhyZWY9eydtYWlsdG86JyArIHRoaXMucHJvcHMudmFsdWV9PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdCkgOiAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3RleHQvVGV4dEZpbHRlcicpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIFBhc3N3b3JkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUGFzc3dvcmRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdHJldHVybiB2YWx1ZSA/ICcqKioqKioqKicgOiAnJztcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSgpfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRDb2x1bW47XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRJbmxpbmVHcm91cCBhcyBHcm91cCxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb24gYXMgU2VjdGlvbixcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnUGFzc3dvcmRGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1Bhc3N3b3JkJyxcclxuXHR9LFxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cGFzc3dvcmRJc1NldDogdGhpcy5wcm9wcy52YWx1ZSA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0c2hvd0NoYW5nZVVJOiB0aGlzLnByb3BzLm1vZGUgPT09ICdjcmVhdGUnID8gdHJ1ZSA6IGZhbHNlLFxyXG5cdFx0XHRwYXNzd29yZDogJycsXHJcblx0XHRcdGNvbmZpcm06ICcnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHdoaWNoLCBldmVudCkge1xyXG5cdFx0dmFyIG5ld1N0YXRlID0ge307XHJcblx0XHRuZXdTdGF0ZVt3aGljaF0gPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcclxuXHR9LFxyXG5cclxuXHRzaG93Q2hhbmdlVUkgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHNob3dDaGFuZ2VVSTogdHJ1ZSxcclxuXHRcdH0sICgpID0+IHRoaXMuZm9jdXMoKSk7XHJcblx0fSxcclxuXHJcblx0b25DYW5jZWwgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHNob3dDaGFuZ2VVSTogZmFsc2UsXHJcblx0XHR9LCAoKSA9PiB0aGlzLmZvY3VzKCkpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiA8Rm9ybUlucHV0IG5vZWRpdD57dGhpcy5wcm9wcy52YWx1ZSA/ICdQYXNzd29yZCBTZXQnIDogJyd9PC9Gb3JtSW5wdXQ+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLnNob3dDaGFuZ2VVSSA/IHRoaXMucmVuZGVyRmllbGRzKCkgOiB0aGlzLnJlbmRlckNoYW5nZUJ1dHRvbigpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkcyAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgYmxvY2s+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0YXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuXHRcdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkLmJpbmQodGhpcywgJ3Bhc3N3b3JkJyl9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IHBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMuY29uZmlybSl9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMsICdjb25maXJtJyl9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5jb25maXJtfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0e3RoaXMuc3RhdGUucGFzc3dvcmRJc1NldCA/IChcclxuXHRcdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25DYW5jZWx9PkNhbmNlbDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJDaGFuZ2VCdXR0b24gKCkge1xyXG5cdFx0dmFyIGxhYmVsID0gdGhpcy5zdGF0ZS5wYXNzd29yZElzU2V0XHJcblx0XHRcdD8gJ0NoYW5nZSBQYXNzd29yZCdcclxuXHRcdFx0OiAnU2V0IFBhc3N3b3JkJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8QnV0dG9uIHJlZj1cImZvY3VzVGFyZ2V0XCIgb25DbGljaz17dGhpcy5zaG93Q2hhbmdlVUl9PntsYWJlbH08L0J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IEVYSVNUU19PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdJcyBTZXQnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5cdHsgbGFiZWw6ICdJcyBOT1QgU2V0JywgdmFsdWU6IGZhbHNlIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRleGlzdHM6IHRydWUsXHJcblx0fTtcclxufVxyXG5cclxudmFyIFBhc3N3b3JkRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRleGlzdHM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihFWElTVFNfT1BUSU9OUy5tYXAoaSA9PiBpLnZhbHVlKSksXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dG9nZ2xlRXhpc3RzICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IGV4aXN0czogdmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVFeGlzdHN9XHJcblx0XHRcdFx0b3B0aW9ucz17RVhJU1RTX09QVElPTlN9XHJcblx0XHRcdFx0dmFsdWU9e2ZpbHRlci5leGlzdHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXNzd29yZEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbmNvbnN0IG1vcmVJbmRpY2F0b3JTdHlsZSA9IHtcclxuXHRjb2xvcjogJyNiYmInLFxyXG5cdGZvbnRTaXplOiAnLjhyZW0nLFxyXG5cdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRtYXJnaW5MZWZ0OiA4LFxyXG59O1xyXG5cclxudmFyIFJlbGF0aW9uc2hpcENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1JlbGF0aW9uc2hpcENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyTWFueSAodmFsdWUpIHtcclxuXHRcdGlmICghdmFsdWUgfHwgIXZhbHVlLmxlbmd0aCkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgcmVmTGlzdCA9IHRoaXMucHJvcHMuY29sLmZpZWxkLnJlZkxpc3Q7XHJcblx0XHRjb25zdCBpdGVtcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuXHRcdFx0aWYgKCF2YWx1ZVtpXSkgYnJlYWs7XHJcblx0XHRcdGlmIChpKSB7XHJcblx0XHRcdFx0aXRlbXMucHVzaCg8c3BhbiBrZXk9eydjb21tYScgKyBpfT4sIDwvc3Bhbj4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1zLnB1c2goXHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBpbnRlcmlvciB0cnVuY2F0ZT17ZmFsc2V9IGtleT17J2FuY2hvcicgKyBpfSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgcmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWVbaV0uaWR9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlW2ldLm5hbWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRpZiAodmFsdWUubGVuZ3RoID4gMykge1xyXG5cdFx0XHRpdGVtcy5wdXNoKDxzcGFuIGtleT1cIm1vcmVcIiBzdHlsZT17bW9yZUluZGljYXRvclN0eWxlfT5bLi4ue3ZhbHVlLmxlbmd0aCAtIDN9IG1vcmVdPC9zcGFuPik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7aXRlbXN9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICh2YWx1ZSkge1xyXG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgcmVmTGlzdCA9IHRoaXMucHJvcHMuY29sLmZpZWxkLnJlZkxpc3Q7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXtLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyByZWZMaXN0LnBhdGggKyAnLycgKyB2YWx1ZS5pZH0gcGFkZGVkIGludGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWUubmFtZX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGNvbnN0IG1hbnkgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5tYW55O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHttYW55ID8gdGhpcy5yZW5kZXJNYW55KHZhbHVlKSA6IHRoaXMucmVuZGVyVmFsdWUodmFsdWUpfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVsYXRpb25zaGlwQ29sdW1uO1xyXG4iLCJpbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgeyBsaXN0c0J5S2V5IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2xpc3RzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xyXG5pbXBvcnQgeGhyIGZyb20gJ3hocic7XHJcbmltcG9ydCB7XHJcblx0QnV0dG9uLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRJbmxpbmVHcm91cCBhcyBHcm91cCxcclxuXHRJbmxpbmVHcm91cFNlY3Rpb24gYXMgU2VjdGlvbixcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlVmFsdWVzIChjdXJyZW50LCBuZXh0KSB7XHJcblx0Y29uc3QgY3VycmVudExlbmd0aCA9IGN1cnJlbnQgPyBjdXJyZW50Lmxlbmd0aCA6IDA7XHJcblx0Y29uc3QgbmV4dExlbmd0aCA9IG5leHQgPyBuZXh0Lmxlbmd0aCA6IDA7XHJcblx0aWYgKGN1cnJlbnRMZW5ndGggIT09IG5leHRMZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRMZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKGN1cnJlbnRbaV0gIT09IG5leHRbaV0pIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdSZWxhdGlvbnNoaXBGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1JlbGF0aW9uc2hpcCcsXHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHRjcmVhdGVJc09wZW46IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlID0ge307XHJcblx0XHR0aGlzLmxvYWRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmIChuZXh0UHJvcHMudmFsdWUgPT09IHRoaXMucHJvcHMudmFsdWUgfHwgbmV4dFByb3BzLm1hbnkgJiYgY29tcGFyZVZhbHVlcyh0aGlzLnByb3BzLnZhbHVlLCBuZXh0UHJvcHMudmFsdWUpKSB7XHJcblx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcnMpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnByb3BzLmZpbHRlcnMpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZXNba2V5XSAhPT0gbmV4dFByb3BzLnZhbHVlc1trZXldKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRjcmVhdGVJc09wZW46IHRydWVcclxuXHRcdFx0XHRcdFx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGNyZWF0ZUlzT3BlbjogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSwgMTApO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sb2FkVmFsdWUobmV4dFByb3BzLnZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRzaG91bGRDb2xsYXBzZSAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5tYW55KSB7XHJcblx0XHRcdC8vIG1hbnk6dHJ1ZSByZWxhdGlvbnNoaXBzIGhhdmUgYW4gQXJyYXkgZm9yIGEgdmFsdWVcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sbGFwc2UgJiYgIXRoaXMucHJvcHMudmFsdWU7XHJcblx0fSxcclxuXHJcblx0YnVpbGRGaWx0ZXJzICgpIHtcclxuXHRcdHZhciBmaWx0ZXJzID0ge307XHJcblxyXG5cdFx0Xy5mb3JFYWNoKHRoaXMucHJvcHMuZmlsdGVycywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWVbMF0gPT09ICc6Jykge1xyXG5cdFx0XHRcdHZhciBmaWVsZE5hbWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuXHJcblx0XHRcdFx0dmFyIHZhbCA9IHRoaXMucHJvcHMudmFsdWVzW2ZpZWxkTmFtZV07XHJcblx0XHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdFx0ZmlsdGVyc1trZXldID0gdmFsO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgZmlsdGVyaW5nIGJ5IGlkIGFuZCBpdGVtIHdhcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PT0gJzpfaWQnICYmIEtleXN0b25lLml0ZW0pIHtcclxuXHRcdFx0XHRcdGZpbHRlcnNba2V5XSA9IEtleXN0b25lLml0ZW0uaWQ7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHJcblx0XHRfLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcblx0XHRcdHBhcnRzLnB1c2goJ2ZpbHRlcnNbJyArIGtleSArICddW3ZhbHVlXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyYnKTtcclxuXHR9LFxyXG5cclxuXHRjYWNoZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdGl0ZW0uaHJlZiA9IEtleXN0b25lLmFkbWluUGF0aCArICcvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJy8nICsgaXRlbS5pZDtcclxuXHRcdHRoaXMuX2l0ZW1zQ2FjaGVbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRWYWx1ZSAodmFsdWVzKSB7XHJcblx0XHRpZiAoIXZhbHVlcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IHZhbHVlcy5zcGxpdCgnLCcpO1xyXG5cdFx0Y29uc3QgY2FjaGVkVmFsdWVzID0gdmFsdWVzLm1hcChpID0+IHRoaXMuX2l0ZW1zQ2FjaGVbaV0pLmZpbHRlcihpID0+IGkpO1xyXG5cdFx0aWYgKGNhY2hlZFZhbHVlcy5sZW5ndGggPT09IHZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0bG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsdWU6IHRoaXMucHJvcHMubWFueSA/IGNhY2hlZFZhbHVlcyA6IGNhY2hlZFZhbHVlc1swXSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRsb2FkaW5nOiB0cnVlLFxyXG5cdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdH0pO1xyXG5cdFx0YXN5bmMubWFwKHZhbHVlcywgKHZhbHVlLCBkb25lKSA9PiB7XHJcblx0XHRcdHhocih7XHJcblx0XHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5yZWZMaXN0LnBhdGggKyAnLycgKyB2YWx1ZSArICc/YmFzaWMnLFxyXG5cdFx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGVyciB8fCAhZGF0YSkgcmV0dXJuIGRvbmUoZXJyKTtcclxuXHRcdFx0XHR0aGlzLmNhY2hlSXRlbShkYXRhKTtcclxuXHRcdFx0XHRkb25lKGVyciwgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgKGVyciwgZXhwYW5kZWQpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLmlzTW91bnRlZCgpKSByZXR1cm47XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLm1hbnkgPyBleHBhbmRlZCA6IGV4cGFuZGVkWzBdLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIE5PVEU6IHRoaXMgc2VlbXMgbGlrZSB0aGUgd3Jvbmcgd2F5IHRvIGFkZCBvcHRpb25zIHRvIHRoZSBTZWxlY3RcclxuXHRsb2FkT3B0aW9uc0NhbGxiYWNrOiB7fSxcclxuXHRsb2FkT3B0aW9ucyAoaW5wdXQsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0XHR0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdGNvbnN0IGZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVycygpO1xyXG5cdFx0eGhyKHtcclxuXHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5yZWZMaXN0LnBhdGggKyAnP2Jhc2ljJnNlYXJjaD0nICsgaW5wdXQgKyAnJicgKyBmaWx0ZXJzLFxyXG5cdFx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgaXRlbXM6JywgZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobnVsbCwgW10pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRhdGEucmVzdWx0cy5mb3JFYWNoKHRoaXMuY2FjaGVJdGVtKTtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwge1xyXG5cdFx0XHRcdG9wdGlvbnM6IGRhdGEucmVzdWx0cyxcclxuXHRcdFx0XHRjb21wbGV0ZTogZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gZGF0YS5jb3VudCxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvcGVuQ3JlYXRlICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRjcmVhdGVJc09wZW46IHRydWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRjbG9zZUNyZWF0ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdG9uQ3JlYXRlIChpdGVtKSB7XHJcblx0XHR0aGlzLmNhY2hlSXRlbShpdGVtKTtcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUudmFsdWUpKSB7XHJcblx0XHRcdC8vIEZvciBtYW55IHJlbGF0aW9uc2hpcHMsIGFwcGVuZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGVuZFxyXG5cdFx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlLm1hcCgoaXRlbSkgPT4gaXRlbS5pZCk7XHJcblx0XHRcdHZhbHVlcy5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZCh2YWx1ZXMuam9pbignLCcpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudmFsdWVDaGFuZ2VkKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5PVEU6IHRoaXMgc2VlbXMgbGlrZSB0aGUgd3Jvbmcgd2F5IHRvIGFkZCBvcHRpb25zIHRvIHRoZSBTZWxlY3RcclxuXHRcdHRoaXMubG9hZE9wdGlvbnNDYWxsYmFjayhudWxsLCB7XHJcblx0XHRcdGNvbXBsZXRlOiB0cnVlLFxyXG5cdFx0XHRvcHRpb25zOiBPYmplY3Qua2V5cyh0aGlzLl9pdGVtc0NhY2hlKS5tYXAoKGspID0+IHRoaXMuX2l0ZW1zQ2FjaGVba10pLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNsb3NlQ3JlYXRlKCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyU2VsZWN0IChub2VkaXQpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0ey8qIFRoaXMgaW5wdXQgZWxlbWVudCBmb29scyBTYWZhcmkncyBhdXRvY29ycmVjdCBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgdGhhdCBjb21wbGV0ZWx5IGJyZWFrIHJlYWN0LXNlbGVjdCAqL31cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgd2lkdGg6IDEsIGhlaWdodDogMSwgekluZGV4OiAtMSwgb3BhY2l0eTogMCB9fSB0YWJJbmRleD1cIi0xXCIvPlxyXG5cdFx0XHRcdHshdGhpcy5zdGF0ZS5jcmVhdGVJc09wZW4gJiYgPFNlbGVjdC5Bc3luY1xyXG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMucHJvcHMubWFueX1cclxuXHRcdFx0XHRcdGRpc2FibGVkPXtub2VkaXR9XHJcblx0XHRcdFx0XHRsb2FkT3B0aW9ucz17dGhpcy5sb2FkT3B0aW9uc31cclxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGgpfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudmFsdWVDaGFuZ2VkfVxyXG5cdFx0XHRcdFx0Y2FjaGU9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0c2ltcGxlVmFsdWVcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxyXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJpZFwiXHJcblx0XHRcdFx0Lz59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJJbnB1dEdyb3VwICgpIHtcclxuXHRcdC8vIFRPRE86IGZpbmQgYmV0dGVyIHNvbHV0aW9uXHJcblx0XHQvLyAgIHdoZW4gaW1wb3J0aW5nIHRoZSBDcmVhdGVGb3JtIHVzaW5nOiBpbXBvcnQgQ3JlYXRlRm9ybSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9DcmVhdGVGb3JtJztcclxuXHRcdC8vICAgQ3JlYXRlRm9ybSB3YXMgaW1wb3J0ZWQgYXMgYSBibGFuayBvYmplY3QuIFRoaXMgc3RhY2sgb3ZlcmZsb3cgcG9zdCBzdWdnZXN0ZWQgbGF6aWxseSByZXF1aXJpbmcgaXQ6XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODA3NjY0L2N5Y2xpYy1kZXBlbmRlbmN5LXJldHVybnMtZW1wdHktb2JqZWN0LWluLXJlYWN0LW5hdGl2ZVxyXG5cdFx0Ly8gVE9ETzogSW1wbGVtZW50IHRoaXMgc29tZXdoZXJlIGhpZ2hlciBpbiB0aGUgYXBwLCBpdCBicmVha3MgdGhlIGVuY2Fwc3VsYXRpb24gb2YgdGhlIFJlbGF0aW9uc2hpcEZpZWxkIGNvbXBvbmVudFxyXG5cdFx0Y29uc3QgQ3JlYXRlRm9ybSA9IHJlcXVpcmUoJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL0NyZWF0ZUZvcm0nKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCBibG9jaz5cclxuXHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU2VsZWN0KCl9XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5DcmVhdGV9Pis8L0J1dHRvbj5cclxuXHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0PENyZWF0ZUZvcm1cclxuXHRcdFx0XHRcdGxpc3Q9e2xpc3RzQnlLZXlbdGhpcy5wcm9wcy5yZWZMaXN0LmtleV19XHJcblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUuY3JlYXRlSXNPcGVufVxyXG5cdFx0XHRcdFx0b25DcmVhdGU9e3RoaXMub25DcmVhdGV9XHJcblx0XHRcdFx0XHRvbkNhbmNlbD17dGhpcy5jbG9zZUNyZWF0ZX0gLz5cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgeyBtYW55IH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IHByb3BzID0ge1xyXG5cdFx0XHRjaGlsZHJlbjogdmFsdWUgPyB2YWx1ZS5uYW1lIDogbnVsbCxcclxuXHRcdFx0Y29tcG9uZW50OiB2YWx1ZSA/ICdhJyA6ICdzcGFuJyxcclxuXHRcdFx0aHJlZjogdmFsdWUgPyB2YWx1ZS5ocmVmIDogbnVsbCxcclxuXHRcdFx0bm9lZGl0OiB0cnVlLFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbWFueSA/IHRoaXMucmVuZGVyU2VsZWN0KHRydWUpIDogPEZvcm1JbnB1dCB7Li4ucHJvcHN9IC8+O1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckZpZWxkICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmNyZWF0ZUlubGluZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJJbnB1dEdyb3VwKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJTZWxlY3QoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxufSk7XHJcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5cclxuaW1wb3J0IHtcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IFBvcG91dExpc3QgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvUG9wb3V0L1BvcG91dExpc3QnO1xyXG5cclxuY29uc3QgSU5WRVJURURfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnTGlua2VkIFRvJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ05PVCBMaW5rZWQgVG8nLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogW10sXHJcblx0fTtcclxufVxyXG5cclxudmFyIFJlbGF0aW9uc2hpcEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRpbnZlcnRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcblx0XHR9KSxcclxuXHRcdG9uSGVpZ2h0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNlYXJjaElzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdHNlYXJjaFJlc3VsdHM6IFtdLFxyXG5cdFx0XHRzZWFyY2hTdHJpbmc6ICcnLFxyXG5cdFx0XHRzZWxlY3RlZEl0ZW1zOiBbXSxcclxuXHRcdFx0dmFsdWVJc0xvYWRpbmc6IHRydWUsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZSA9IHt9O1xyXG5cdFx0dGhpcy5sb2FkU2VhcmNoUmVzdWx0cyh0cnVlKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0aWYgKG5leHRQcm9wcy5maWx0ZXIudmFsdWUgIT09IHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlKSB7XHJcblx0XHRcdHRoaXMucG9wdWxhdGVWYWx1ZShuZXh0UHJvcHMuZmlsdGVyLnZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGlzTG9hZGluZyAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zZWFyY2hJc0xvYWRpbmcgfHwgdGhpcy5zdGF0ZS52YWx1ZUlzTG9hZGluZztcclxuXHR9LFxyXG5cdHBvcHVsYXRlVmFsdWUgKHZhbHVlKSB7XHJcblx0XHRhc3luYy5tYXAodmFsdWUsIChpZCwgbmV4dCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5faXRlbXNDYWNoZVtpZF0pIHJldHVybiBuZXh0KG51bGwsIHRoaXMuX2l0ZW1zQ2FjaGVbaWRdKTtcclxuXHRcdFx0eGhyKHtcclxuXHRcdFx0XHR1cmw6IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnByb3BzLmZpZWxkLnJlZkxpc3QucGF0aCArICcvJyArIGlkICsgJz9iYXNpYycsXHJcblx0XHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHRcdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdFx0XHRpZiAoZXJyIHx8ICFkYXRhKSByZXR1cm4gbmV4dChlcnIpO1xyXG5cdFx0XHRcdHRoaXMuY2FjaGVJdGVtKGRhdGEpO1xyXG5cdFx0XHRcdG5leHQoZXJyLCBkYXRhKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LCAoZXJyLCBpdGVtcykgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGVycm9ycyBiZXR0ZXJcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0dmFsdWVJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHNlbGVjdGVkSXRlbXM6IGl0ZW1zIHx8IFtdLFxyXG5cdFx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdFx0ZmluZERPTU5vZGUodGhpcy5yZWZzLmZvY3VzVGFyZ2V0KS5mb2N1cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2FjaGVJdGVtIChpdGVtKSB7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9LFxyXG5cdGJ1aWxkRmlsdGVycyAoKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cdFx0Xy5mb3JFYWNoKHRoaXMucHJvcHMuZmllbGQuZmlsdGVycywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHRcdFx0aWYgKHZhbHVlWzBdID09PSAnOicpIHJldHVybjtcclxuXHRcdFx0ZmlsdGVyc1trZXldID0gdmFsdWU7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdF8uZm9yRWFjaChmaWx0ZXJzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcclxuXHRcdFx0cGFydHMucHVzaCgnZmlsdGVyc1snICsga2V5ICsgJ11bdmFsdWVdPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcGFydHMuam9pbignJicpO1xyXG5cdH0sXHJcblx0bG9hZFNlYXJjaFJlc3VsdHMgKHRoZW5Qb3B1bGF0ZVZhbHVlKSB7XHJcblx0XHRjb25zdCBzZWFyY2hTdHJpbmcgPSB0aGlzLnN0YXRlLnNlYXJjaFN0cmluZztcclxuXHRcdGNvbnN0IGZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVycygpO1xyXG5cdFx0eGhyKHtcclxuXHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5maWVsZC5yZWZMaXN0LnBhdGggKyAnP2Jhc2ljJnNlYXJjaD0nICsgc2VhcmNoU3RyaW5nICsgJyYnICsgZmlsdGVycyxcclxuXHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHQvLyBUT0RPOiBIYW5kbGUgZXJyb3JzIGJldHRlclxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgaXRlbXM6JywgZXJyKTtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdHNlYXJjaElzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRhdGEucmVzdWx0cy5mb3JFYWNoKHRoaXMuY2FjaGVJdGVtKTtcclxuXHRcdFx0aWYgKHRoZW5Qb3B1bGF0ZVZhbHVlKSB7XHJcblx0XHRcdFx0dGhpcy5wb3B1bGF0ZVZhbHVlKHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoc2VhcmNoU3RyaW5nICE9PSB0aGlzLnN0YXRlLnNlYXJjaFN0cmluZykgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHNlYXJjaFJlc3VsdHM6IGRhdGEucmVzdWx0cyxcclxuXHRcdFx0fSwgdGhpcy51cGRhdGVIZWlnaHQpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHR1cGRhdGVIZWlnaHQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMub25IZWlnaHRDaGFuZ2UpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkhlaWdodENoYW5nZSh0aGlzLnJlZnMuY29udGFpbmVyLm9mZnNldEhlaWdodCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0fSxcclxuXHR1cGRhdGVTZWFyY2ggKGUpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hTdHJpbmc6IGUudGFyZ2V0LnZhbHVlIH0sIHRoaXMubG9hZFNlYXJjaFJlc3VsdHMpO1xyXG5cdH0sXHJcblx0c2VsZWN0SXRlbSAoaXRlbSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZS5jb25jYXQoaXRlbS5pZCk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVtb3ZlSXRlbSAoaXRlbSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZS5maWx0ZXIoaSA9PiB7IHJldHVybiBpICE9PSBpdGVtLmlkOyB9KTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWUgfSk7XHJcblx0fSxcclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVySXRlbXMgKGl0ZW1zLCBzZWxlY3RlZCkge1xyXG5cdFx0Y29uc3QgaXRlbUljb25Ib3ZlciA9IHNlbGVjdGVkID8gJ3gnIDogJ2NoZWNrJztcclxuXHJcblx0XHRyZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFBvcG91dExpc3QuSXRlbVxyXG5cdFx0XHRcdFx0a2V5PXtgaXRlbS0ke2l9LSR7aXRlbS5pZH1gfVxyXG5cdFx0XHRcdFx0aWNvbj1cImRhc2hcIlxyXG5cdFx0XHRcdFx0aWNvbkhvdmVyPXtpdGVtSWNvbkhvdmVyfVxyXG5cdFx0XHRcdFx0bGFiZWw9e2l0ZW0ubmFtZX1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdGVkKSB0aGlzLnJlbW92ZUl0ZW0oaXRlbSk7XHJcblx0XHRcdFx0XHRcdGVsc2UgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xyXG5cdFx0XHRcdFx0fX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtcztcclxuXHRcdGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuZmlsdGVyKGkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuaW5kZXhPZihpLmlkKSA9PT0gLTE7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5pc0xvYWRpbmcoKSA/ICdMb2FkaW5nLi4uJyA6ICdGaW5kIGEgJyArIHRoaXMucHJvcHMuZmllbGQubGFiZWwgKyAnLi4uJztcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgcmVmPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sIGVxdWFsV2lkdGhTZWdtZW50cyBvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfSB2YWx1ZT17dGhpcy5wcm9wcy5maWx0ZXIuaW52ZXJ0ZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfSAvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMXB4IGRhc2hlZCByZ2JhKDAsMCwwLDAuMSknLCBwYWRkaW5nQm90dG9tOiAnMWVtJyB9fT5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXQgYXV0b0ZvY3VzIHJlZj1cImZvY3VzVGFyZ2V0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoU3RyaW5nfSBvbkNoYW5nZT17dGhpcy51cGRhdGVTZWFyY2h9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gLz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHR7c2VsZWN0ZWRJdGVtcy5sZW5ndGggPyAoXHJcblx0XHRcdFx0XHQ8UG9wb3V0TGlzdD5cclxuXHRcdFx0XHRcdFx0PFBvcG91dExpc3QuSGVhZGluZz5TZWxlY3RlZDwvUG9wb3V0TGlzdC5IZWFkaW5nPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJdGVtcyhzZWxlY3RlZEl0ZW1zLCB0cnVlKX1cclxuXHRcdFx0XHRcdDwvUG9wb3V0TGlzdD5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0XHR7c2VhcmNoUmVzdWx0cy5sZW5ndGggPyAoXHJcblx0XHRcdFx0XHQ8UG9wb3V0TGlzdD5cclxuXHRcdFx0XHRcdFx0PFBvcG91dExpc3QuSGVhZGluZyBzdHlsZT17c2VsZWN0ZWRJdGVtcy5sZW5ndGggPyB7IG1hcmdpblRvcDogJzJlbScgfSA6IG51bGx9Pkl0ZW1zPC9Qb3BvdXRMaXN0LkhlYWRpbmc+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckl0ZW1zKHNlYXJjaFJlc3VsdHMpfVxyXG5cdFx0XHRcdFx0PC9Qb3BvdXRMaXN0PlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlbGF0aW9uc2hpcEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBTZWxlY3RDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdTZWxlY3RDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGNvbnN0IG9wdGlvbiA9IHRoaXMucHJvcHMuY29sLmZpZWxkLm9wcy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSB2YWx1ZSlbMF07XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfSB0bz17dGhpcy5wcm9wcy5saW5rVG99IGVtcHR5PXtlbXB0eX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RDb2x1bW47XHJcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuLyoqXHJcbiAqIFRPRE86XHJcbiAqIC0gQ3VzdG9tIHBhdGggc3VwcG9ydFxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdTZWxlY3RGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1NlbGVjdCcsXHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkIChuZXdWYWx1ZSkge1xyXG5cdFx0Ly8gVE9ETzogVGhpcyBzaG91bGQgYmUgbmF0aXZlbHkgaGFuZGxlZCBieSB0aGUgU2VsZWN0IGNvbXBvbmVudFxyXG5cdFx0aWYgKHRoaXMucHJvcHMubnVtZXJpYyAmJiB0eXBlb2YgbmV3VmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBOdW1iZXIobmV3VmFsdWUpIDogdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IG5ld1ZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgeyBvcHMsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWQgPSBvcHMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSB2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dCBub2VkaXQ+XHJcblx0XHRcdFx0e3NlbGVjdGVkID8gc2VsZWN0ZWQubGFiZWwgOiBudWxsfVxyXG5cdFx0XHQ8L0Zvcm1JbnB1dD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0Y29uc3QgeyBudW1lcmljLCBvcHMsIHBhdGgsIHZhbHVlOiB2YWwgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBzaG91bGQgYmUgbmF0aXZlbHkgaGFuZGxlZCBieSB0aGUgU2VsZWN0IGNvbXBvbmVudFxyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IChudW1lcmljKVxyXG5cdFx0XHQ/IG9wcy5tYXAoZnVuY3Rpb24gKGkpIHtcclxuXHRcdFx0XHRyZXR1cm4geyBsYWJlbDogaS5sYWJlbCwgdmFsdWU6IFN0cmluZyhpLnZhbHVlKSB9O1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQ6IG9wcztcclxuXHRcdGNvbnN0IHZhbHVlID0gKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxyXG5cdFx0XHQ/IFN0cmluZyh2YWwpXHJcblx0XHRcdDogdmFsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0ey8qIFRoaXMgaW5wdXQgZWxlbWVudCBmb29scyBTYWZhcmkncyBhdXRvY29ycmVjdCBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgdGhhdCBjb21wbGV0ZWx5IGJyZWFrIHJlYWN0LXNlbGVjdCAqL31cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgd2lkdGg6IDEsIGhlaWdodDogMSwgekluZGV4OiAtMSwgb3BhY2l0eTogMCB9fSB0YWJJbmRleD1cIi0xXCIvPlxyXG5cdFx0XHRcdDxTZWxlY3RcclxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXHJcblx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZShwYXRoKX1cclxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHRcdG9wdGlvbnM9e29wdGlvbnN9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IHtcclxuXHRCdXR0b24sXHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1Ob3RlLFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgUG9wb3V0TGlzdCBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0TGlzdCc7XHJcbmltcG9ydCBLYmQgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvS2JkJztcclxuaW1wb3J0IGJpbmRGdW5jdGlvbnMgZnJvbSAnLi4vLi4vdXRpbHMvYmluZEZ1bmN0aW9ucyc7XHJcblxyXG5jb25zdCBJTlZFUlRFRF9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdNYXRjaGVzJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ0RvZXMgTk9UIE1hdGNoJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IFtdLFxyXG5cdH07XHJcbn1cclxuXHJcbmNsYXNzIEZpbHRlck9wdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRiaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgW1xyXG5cdFx0XHQnaGFuZGxlQ2xpY2snLFxyXG5cdFx0XSk7XHJcblx0fVxyXG5cdGhhbmRsZUNsaWNrICgpIHtcclxuXHRcdGNvbnN0IHsgb3B0aW9uLCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdHRoaXMucHJvcHMub25DbGljayhvcHRpb24sIHNlbGVjdGVkKTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgb3B0aW9uLCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQb3BvdXRMaXN0Lkl0ZW1cclxuXHRcdFx0XHRpY29uPXtzZWxlY3RlZCA/ICdjaGVjaycgOiAnZGFzaCd9XHJcblx0XHRcdFx0aXNTZWxlY3RlZD17c2VsZWN0ZWR9XHJcblx0XHRcdFx0bGFiZWw9e29wdGlvbi5sYWJlbH1cclxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNlbGVjdEZpbHRlciBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRiaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgW1xyXG5cdFx0XHQnZGV0ZWN0T1MnLFxyXG5cdFx0XHQnaGFuZGxlQ2xpY2snLFxyXG5cdFx0XHQnaGFuZGxlS2V5RG93bicsXHJcblx0XHRcdCdoYW5kbGVLZXlVcCcsXHJcblx0XHRcdCdyZW1vdmVPcHRpb24nLFxyXG5cdFx0XHQnc2VsZWN0T3B0aW9uJyxcclxuXHRcdFx0J3RvZ2dsZUFsbE9wdGlvbnMnLFxyXG5cdFx0XHQndG9nZ2xlSW52ZXJ0ZWQnLFxyXG5cdFx0XHQndXBkYXRlRmlsdGVyJyxcclxuXHRcdF0pO1xyXG5cclxuXHRcdHRoaXMuc3RhdGUgPSB7IG1ldGFEb3duOiBmYWxzZSB9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHR0aGlzLmRldGVjdE9TKCk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24sIGZhbHNlKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVVwLCBmYWxzZSk7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcCk7XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdC8vIFRPRE8gdGhpcyBzaG91bGQgcHJvYmFibHkgYmUgbW92ZWQgdG8gdGhlIG1haW4gQXBwIGNvbXBvbmVudCBhbmQgc3RvcmVkXHJcblx0Ly8gaW4gY29udGV4dCBmb3Igb3RoZXIgY29tcG9uZW50cyB0byBzdWJzY3JpYmUgdG8gd2hlbiByZXF1aXJlZFxyXG5cdGRldGVjdE9TICgpIHtcclxuXHRcdGxldCBvc05hbWUgPSAnVW5rbm93biBPUyc7XHJcblxyXG5cdFx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluY2x1ZGVzKCdXaW4nKSkgb3NOYW1lID0gJ1dpbmRvd3MnO1xyXG5cdFx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluY2x1ZGVzKCdNYWMnKSkgb3NOYW1lID0gJ01hY09TJztcclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnWDExJykpIG9zTmFtZSA9ICdVTklYJztcclxuXHRcdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmNsdWRlcygnTGludXgnKSkgb3NOYW1lID0gJ0xpbnV4JztcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHsgb3NOYW1lIH0pO1xyXG5cdH1cclxuXHRoYW5kbGVLZXlEb3duIChlKSB7XHJcblx0XHRpZiAodmtleVtlLmtleUNvZGVdICE9PSAnPG1ldGE+JykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBtZXRhRG93bjogdHJ1ZSB9KTtcclxuXHR9XHJcblx0aGFuZGxlS2V5VXAgKGUpIHtcclxuXHRcdGlmICh2a2V5W2Uua2V5Q29kZV0gIT09ICc8bWV0YT4nKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG1ldGFEb3duOiBmYWxzZSB9KTtcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUludmVydGVkIChpbnZlcnRlZCkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBpbnZlcnRlZCB9KTtcclxuXHR9XHJcblx0dG9nZ2xlQWxsT3B0aW9ucyAoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKGZpbHRlci52YWx1ZS5sZW5ndGggPCBmaWVsZC5vcHMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IGZpZWxkLm9wcy5tYXAoaSA9PiBpLnZhbHVlKSB9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IFtdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLm1ldGFEb3duXHJcblx0XHRcdD8gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuY29uY2F0KG9wdGlvbi52YWx1ZSlcclxuXHRcdFx0OiBbb3B0aW9uLnZhbHVlXTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH1cclxuXHRyZW1vdmVPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLm1ldGFEb3duXHJcblx0XHRcdD8gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuZmlsdGVyKGkgPT4gaSAhPT0gb3B0aW9uLnZhbHVlKVxyXG5cdFx0XHQ6IFtvcHRpb24udmFsdWVdO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWUgfSk7XHJcblx0fVxyXG5cdGhhbmRsZUNsaWNrIChvcHRpb24sIHNlbGVjdGVkKSB7XHJcblx0XHRzZWxlY3RlZCA/IHRoaXMucmVtb3ZlT3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG5cdH1cclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gUkVOREVSRVJTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHJlbmRlck9wdGlvbnMgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuZmllbGQub3BzLm1hcCgob3B0aW9uLCBpKSA9PiB7XHJcblx0XHRcdGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbHRlck9wdGlvblxyXG5cdFx0XHRcdFx0a2V5PXtgaXRlbS0ke2l9LSR7b3B0aW9uLnZhbHVlfWB9XHJcblx0XHRcdFx0XHRvcHRpb249e29wdGlvbn1cclxuXHRcdFx0XHRcdHNlbGVjdGVkPXtzZWxlY3RlZH1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaW5kZXRlcm1pbmF0ZSA9IGZpbHRlci52YWx1ZS5sZW5ndGggPCBmaWVsZC5vcHMubGVuZ3RoO1xyXG5cclxuXHRcdGNvbnN0IG1ldGFLZXlMYWJlbCA9IHRoaXMuc3RhdGUub3NOYW1lID09PSAnTWFjT1MnXHJcblx0XHRcdD8gJ2NtZCdcclxuXHRcdFx0OiAnY3RybCc7XHJcblxyXG5cdFx0Y29uc3QgZmllbGRTdHlsZXMgPSB7XHJcblx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0XHRib3JkZXJCb3R0b206ICcxcHggZGFzaGVkIHJnYmEoMCwwLDAsMC4xKScsXHJcblx0XHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAnMWVtJyxcclxuXHRcdFx0cGFkZGluZ0JvdHRvbTogJzFlbScsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZvcm1GaWVsZD5cclxuXHRcdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVJbnZlcnRlZH1cclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17SU5WRVJURURfT1BUSU9OU31cclxuXHRcdFx0XHRcdFx0dmFsdWU9e2ZpbHRlci5pbnZlcnRlZH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17ZmllbGRTdHlsZXN9PlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBzaXplPVwieHNtYWxsXCIgb25DbGljaz17dGhpcy50b2dnbGVBbGxPcHRpb25zfSBzdHlsZT17eyBwYWRkaW5nOiAwLCB3aWR0aDogNTAgfX0+XHJcblx0XHRcdFx0XHRcdHtpbmRldGVybWluYXRlID8gJ0FsbCcgOiAnTm9uZSd9XHJcblx0XHRcdFx0XHQ8L0J1dHRvbj5cclxuXHRcdFx0XHRcdDxGb3JtTm90ZSBzdHlsZT17eyBtYXJnaW46IDAgfX0+XHJcblx0XHRcdFx0XHRcdEhvbGQgPEtiZD57bWV0YUtleUxhYmVsfTwvS2JkPiB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9uc1xyXG5cdFx0XHRcdFx0PC9Gb3JtTm90ZT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJPcHRpb25zKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuU2VsZWN0RmlsdGVyLnByb3BUeXBlcyA9IHtcclxuXHRmaWVsZDogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRmaWx0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRpbnZlcnRlZDogUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHR2YWx1ZTogUHJvcFR5cGVzLmFycmF5LFxyXG5cdH0pLFxyXG59O1xyXG5TZWxlY3RGaWx0ZXIuZ2V0RGVmYXVsdFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlO1xyXG5TZWxlY3RGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEZpbHRlcjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBUZXh0Q29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnVGV4dENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0bGlua1RvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Z2V0VmFsdWUgKCkge1xyXG5cdFx0Ly8gY3JvcHBpbmcgdGV4dCBpcyBpbXBvcnRhbnQgZm9yIHRleHRhcmVhLCB3aGljaCB1c2VzIHRoaXMgY29sdW1uXHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5zdWJzdHIoMCwgMTAwKSA6IG51bGw7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcblx0XHRjb25zdCBlbXB0eSA9ICF2YWx1ZSAmJiB0aGlzLnByb3BzLmxpbmtUbyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY29sLmZpZWxkLm1vbm9zcGFjZSA/ICdJdGVtTGlzdF9fdmFsdWUtLW1vbm9zcGFjZScgOiB1bmRlZmluZWQ7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdG89e3RoaXMucHJvcHMubGlua1RvfSBlbXB0eT17ZW1wdHl9IHBhZGRlZCBpbnRlcmlvciBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZXh0Q29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cdGRpc3BsYXlOYW1lOiAnVGV4dEZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnVGV4dCcsXHJcblx0fSxcclxufSk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRGb3JtU2VsZWN0LFxyXG5cdFNlZ21lbnRlZENvbnRyb2wsXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgSU5WRVJURURfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnTWF0Y2hlcycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdEb2VzIE5PVCBNYXRjaCcsIHZhbHVlOiB0cnVlIH0sXHJcbl07XHJcblxyXG5jb25zdCBNT0RFX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0NvbnRhaW5zJywgdmFsdWU6ICdjb250YWlucycgfSxcclxuXHR7IGxhYmVsOiAnRXhhY3RseScsIHZhbHVlOiAnZXhhY3RseScgfSxcclxuXHR7IGxhYmVsOiAnQmVnaW5zIHdpdGgnLCB2YWx1ZTogJ2JlZ2luc1dpdGgnIH0sXHJcblx0eyBsYWJlbDogJ0VuZHMgd2l0aCcsIHZhbHVlOiAnZW5kc1dpdGgnIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUgKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRtb2RlOiBNT0RFX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHRpbnZlcnRlZDogSU5WRVJURURfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdHZhbHVlOiAnJyxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgVGV4dEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0bW9kZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE1PREVfT1BUSU9OUy5tYXAoaSA9PiBpLnZhbHVlKSksXHJcblx0XHRcdGludmVydGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbGVhbixcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGdldERlZmF1bHRWYWx1ZTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpbHRlcjogZ2V0RGVmYXVsdFZhbHVlKCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHNlbGVjdE1vZGUgKGUpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgbW9kZSB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHRvZ2dsZUludmVydGVkIChpbnZlcnRlZCkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyBpbnZlcnRlZCB9KTtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlIChlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdGNvbnN0IHBsYWNlaG9sZGVyID0gZmllbGQubGFiZWwgKyAnICcgKyBtb2RlLmxhYmVsLnRvTG93ZXJDYXNlKCkgKyAnLi4uJztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbFxyXG5cdFx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlSW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHRcdG9wdGlvbnM9e0lOVkVSVEVEX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8Rm9ybVNlbGVjdFxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtNT0RFX09QVElPTlN9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXttb2RlLnZhbHVlfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRhdXRvRm9jdXNcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG5cdFx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLnZhbHVlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGV4dEZpbHRlcjtcclxuIiwiLypcclxuXHRUaWRpZXIgYmluZGluZyBmb3IgY29tcG9uZW50IG1ldGhvZHMgdG8gQ2xhc3Nlc1xyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGJpbmRGdW5jdGlvbnMuY2FsbCh0aGlzLCBbJ2hhbmRsZUNsaWNrJywgJ2hhbmRsZU90aGVyJ10pO1xyXG5cdH1cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kRnVuY3Rpb25zIChmdW5jdGlvbnMpIHtcclxuXHRmdW5jdGlvbnMuZm9yRWFjaChmID0+ICh0aGlzW2ZdID0gdGhpc1tmXS5iaW5kKHRoaXMpKSk7XHJcbn07XHJcbiIsInZhciBFeE1hdGNoID0gcmVxdWlyZSgnZXhwcmVzc2lvbi1tYXRjaCcpOyAvLyBNYXRjaGVzIG9iamVjdHMgd2l0aCBleHByZXNzaW9uc1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBzb21ldGhpbmcgaXMgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSAge0FueX0gYXJnICAgVGhlIHNvbWV0aGluZyB3ZSB3YW50IHRvIGNoZWNrIHRoZSB0eXBlIG9mXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IElmIGFyZyBpcyBhbiBvYmplY3Qgb3Igbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdCAoYXJnKSB7XHJcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFdmFsdWF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgYSBmaWVsZCBiYXNlZCBvbiBpdHMgZGVwZW5kZW5jaWVzIGFuZCB0aGVpciB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fEFueX0gZGVwZW5kc09uIFRoZSBkZXBlbmRzT24gdmFyaWFibGUgd2UgZ2V0IGZyb20gdGhlIGZpZWxkXHJcbiAqIEBwYXJhbSAge09iamVjdH1cdFx0dmFsdWVzICAgIFRoZSB2YWx1ZXMgY3VycmVudGx5IGluIHRoZSBmaWVsZHNcclxuICogQHJldHVybiB7Qm9vbGVhbn1cdFx0XHQgIElmIHRoZSBjdXJyZW50IGZpZWxkIHNob3VsZCBiZSBkaXNwbGF5ZWQgYmFzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIFx0ICBvbiBpdCdzIGRlcGVuZGVuY2llcyBhbmQgdGhlaXIgdmFsdWVzXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2YWxEZXBlbmRzT24gKGRlcGVuZHNPbiwgdmFsdWVzKSB7XHJcblx0aWYgKCFpc09iamVjdChkZXBlbmRzT24pIHx8ICFPYmplY3Qua2V5cyhkZXBlbmRzT24pLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZmllbGQgc2hvdWxkIGJlIGRpc3BsYXllZCwgYmFzZWQgb24gdGhlIHZhbHVlcyBvZlxyXG5cdC8vIG90aGVyIGZpZWxkcyBhbmQgdGhlIGRlcGVuZHNPbiBjb25maWd1cmF0aW9uIG9mIHRoaXMgZmllbGRcclxuXHR2YXIgTWF0Y2ggPSBuZXcgRXhNYXRjaChkZXBlbmRzT24sIHZhbHVlcywgZmFsc2UpO1xyXG5cdHJldHVybiBNYXRjaC5tYXRjaCgpO1xyXG59O1xyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiZXhwb3J0cy5Db2x1bW5zID0ge1xudGV4dDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRDb2x1bW5cIiksXG5kYXRldGltZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtblwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwQ29sdW1uXCIpLFxuZW1haWw6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxDb2x1bW5cIiksXG5zZWxlY3Q6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvc2VsZWN0L1NlbGVjdENvbHVtblwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkQ29sdW1uXCIpLFxuY2xvdWRpbmFyeWltYWdlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW5cIiksXG5ib29sZWFuOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkNvbHVtblwiKSxcbmlkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtblwiKSxcbl9fdW5yZWNvZ25pc2VkX186IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0ludmFsaWRDb2x1bW5cIiksXG59O1xuZXhwb3J0cy5GaWVsZHMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWVsZFwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmllbGRcIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbEZpZWxkXCIpLFxuc2VsZWN0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3NlbGVjdC9TZWxlY3RGaWVsZFwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmllbGRcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZFwiKSxcbn07XG5leHBvcnRzLkZpbHRlcnMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpbHRlclwiKSxcbmRhdGV0aW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyXCIpLFxucmVsYXRpb25zaGlwOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXJcIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbEZpbHRlclwiKSxcbnNlbGVjdDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9zZWxlY3QvU2VsZWN0RmlsdGVyXCIpLFxucGFzc3dvcmQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRGaWx0ZXJcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpbHRlclwiKSxcbmJvb2xlYW46IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyXCIpLFxufTtcbiJdfQ==
