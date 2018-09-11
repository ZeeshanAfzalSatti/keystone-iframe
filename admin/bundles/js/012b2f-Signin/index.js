(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../../../theme":71}],2:[function(require,module,exports){
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

},{"./colors":1,"./styles":3,"glamor":undefined,"react":undefined}],3:[function(require,module,exports){
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

},{"../../../theme":71,"./colors":1}],4:[function(require,module,exports){
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

},{"../../../theme":71,"glamor":undefined,"react":undefined}],5:[function(require,module,exports){
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

},{"./styles":6,"glamor":undefined,"react":undefined}],6:[function(require,module,exports){
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

},{"../../../theme":71,"../../../utils/color":72,"../../../utils/css":74}],7:[function(require,module,exports){
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

},{"./styles":8,"glamor":undefined,"react":undefined}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../../../theme":71,"../../../utils/color":72}],10:[function(require,module,exports){
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

},{"./colors":9,"./styles":11,"glamor":undefined,"react":undefined}],11:[function(require,module,exports){
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

},{"../../../theme":71,"../../../utils/css":74,"./colors":9}],12:[function(require,module,exports){
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

},{"./sizes":13,"./styles":14,"glamor":undefined,"react":undefined}],13:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.container.size.small,
	medium: _theme2.default.container.size.medium,
	large: _theme2.default.container.size.large
};

},{"../../../theme":71}],14:[function(require,module,exports){
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

},{"../../../theme":71,"./sizes":13}],15:[function(require,module,exports){
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

},{"../Button":5,"glamor":undefined,"react":undefined}],16:[function(require,module,exports){
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

},{"../FormLabel":21,"./styles":17,"glamor":undefined,"react":undefined}],17:[function(require,module,exports){
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

},{"../../../theme":71}],18:[function(require,module,exports){
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

},{"../../../utils/concatClassnames":73,"./noedit":19,"./styles":20,"glamor":undefined,"react":undefined}],19:[function(require,module,exports){
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

},{"../../../theme":71,"../../../utils/color":72,"glamor":undefined,"react":undefined}],20:[function(require,module,exports){
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

},{"../../../theme":71}],21:[function(require,module,exports){
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

},{"./styles":22,"glamor":undefined,"react":undefined}],22:[function(require,module,exports){
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

},{"../../../theme":71}],23:[function(require,module,exports){
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

},{"./styles":24,"glamor":undefined,"react":undefined}],24:[function(require,module,exports){
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

},{"../../../theme":71}],25:[function(require,module,exports){
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

},{"./styles":26,"glamor":undefined,"react":undefined}],26:[function(require,module,exports){
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

},{"../../../theme":71,"../../../utils/color":72}],27:[function(require,module,exports){
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

},{"./styles":28,"glamor":undefined,"react":undefined}],28:[function(require,module,exports){
"use strict";

// ==============================
// Form
// ==============================

module.exports = {
	Form: {}
};

},{}],29:[function(require,module,exports){
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

},{"../Button":5,"../Glyph":32,"react":undefined}],30:[function(require,module,exports){
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

},{"../FormField":16,"../Glyph":32,"react":undefined}],31:[function(require,module,exports){
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

},{"../../../theme":71}],32:[function(require,module,exports){
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

},{"./colors":31,"./octicons":33,"./sizes":34,"./styles":35,"glamor":undefined,"react":undefined}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	small: _theme2.default.glyph.size.small,
	medium: _theme2.default.glyph.size.medium,
	large: _theme2.default.glyph.size.large
};

},{"../../../theme":71}],35:[function(require,module,exports){
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

},{"./colors":31,"./sizes":34}],36:[function(require,module,exports){
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

},{"../../../theme":71,"glamor":undefined,"react":undefined}],37:[function(require,module,exports){
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

},{"glamor":undefined,"react":undefined}],38:[function(require,module,exports){
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

},{"../GridCol":36,"../GridRow":37}],39:[function(require,module,exports){
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

},{"./styles":40,"glamor":undefined,"react":undefined}],40:[function(require,module,exports){
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

},{"../../../theme":71}],41:[function(require,module,exports){
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

},{"glamor":undefined,"react":undefined}],42:[function(require,module,exports){
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

},{"./styles":43,"glamor":undefined,"react":undefined}],43:[function(require,module,exports){
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

},{"../../../theme":71}],44:[function(require,module,exports){
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

},{"../../../theme":71,"../Button":5,"../Spinner":61,"glamor":undefined,"react":undefined}],45:[function(require,module,exports){
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

},{"../../../theme":71,"glamor":undefined,"react":undefined}],46:[function(require,module,exports){
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
		backgroundColor: 'white',
		borderRadius: _theme2.default.borderRadius.default,
		paddingBottom: _theme2.default.modal.padding.dialog.vertical,
		paddingLeft: _theme2.default.modal.padding.dialog.horizontal,
		paddingRight: _theme2.default.modal.padding.dialog.horizontal,
		paddingTop: _theme2.default.modal.padding.dialog.vertical,
		position: 'relative'
	}
};

exports.default = ModalDialog;

},{"../../../theme":71,"../Portal":53,"../ScrollLock":56,"glamor":undefined,"react":undefined}],47:[function(require,module,exports){
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

},{"../../../theme":71,"glamor":undefined,"react":undefined}],48:[function(require,module,exports){
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

},{"../../../theme":71,"../GlyphButton":29,"glamor":undefined,"react":undefined}],49:[function(require,module,exports){
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

},{"./body":45,"./dialog":46,"./footer":47,"./header":48}],50:[function(require,module,exports){
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

},{"../../../theme":71,"./page":51,"glamor":undefined,"react":undefined}],51:[function(require,module,exports){
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

},{"../../../theme":71,"glamor":undefined,"react":undefined}],52:[function(require,module,exports){
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

},{"react":undefined}],53:[function(require,module,exports){
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

},{"../PassContext":52,"react":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],54:[function(require,module,exports){
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

},{"../../../theme":71,"react":undefined}],55:[function(require,module,exports){
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

},{"glamor":undefined,"react":undefined}],56:[function(require,module,exports){
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

},{"react":undefined}],57:[function(require,module,exports){
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

},{"../../../theme":71}],58:[function(require,module,exports){
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

},{"./colors":57,"./styles":59,"glamor":undefined,"react":undefined}],59:[function(require,module,exports){
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

},{"../../../theme":71,"./colors":57}],60:[function(require,module,exports){
'use strict';

module.exports = ['danger', 'default', 'inverted', 'primary', 'success', 'warning'];

},{}],61:[function(require,module,exports){
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

},{"../ScreenReaderOnly":55,"./colors":60,"./sizes":62,"./styles":63,"glamor":undefined,"react":undefined}],62:[function(require,module,exports){
'use strict';

module.exports = ['small', 'medium', 'large'];

},{}],63:[function(require,module,exports){
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

},{"../../../theme":71,"./colors":60,"./sizes":62,"glamor":undefined}],64:[function(require,module,exports){
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

},{"./Alert":2,"./BlankState":4,"./Button":5,"./Center":7,"./Chip":10,"./Container":12,"./DropdownButton":15,"./Form":27,"./FormField":16,"./FormInput":18,"./FormLabel":21,"./FormNote":23,"./FormSelect":25,"./Glyph":32,"./GlyphButton":29,"./GlyphField":30,"./Grid":38,"./InlineGroup":41,"./InlineGroupSection":39,"./LabelledControl":42,"./LoadingButton":44,"./Modal":49,"./Pagination":50,"./ResponsiveText":54,"./ScreenReaderOnly":55,"./SegmentedControl":58,"./Spinner":61}],65:[function(require,module,exports){
'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _Alert = require('./components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Brand = require('./components/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _UserInfo = require('./components/UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _LoginForm = require('./components/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The actual Sign In view, with the login form
 */

var SigninView = _react2.default.createClass({
	displayName: 'SigninView',
	getInitialState: function getInitialState() {
		return {
			email: '',
			password: '',
			isAnimating: false,
			isInvalid: false,
			invalidMessage: '',
			signedOut: window.location.search === '?signedout'
		};
	},
	componentDidMount: function componentDidMount() {
		// Focus the email field when we're mounted
		if (this.refs.email) {
			this.refs.email.select();
		}
	},
	handleInputChange: function handleInputChange(e) {
		// Set the new state when the input changes
		var newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	},
	handleSubmit: function handleSubmit(e) {
		var _this = this;

		e.preventDefault();
		// If either password or mail are missing, show an error
		if (!this.state.email || !this.state.password) {
			return this.displayError('Please enter an email address and password to sign in.');
		}

		(0, _xhr2.default)({
			url: Keystone.adminPath + '/api/session/signin',
			method: 'post',
			json: {
				email: this.state.email,
				password: this.state.password
			},
			headers: (0, _objectAssign2.default)({}, Keystone.csrf.header)
		}, function (err, resp, body) {
			if (err || body && body.error) {
				return body.error === 'invalid csrf' ? _this.displayError('Something went wrong; please refresh your browser and try again.') : _this.displayError('The email and password you entered are not valid.');
			} else {
				// Redirect to where we came from or to the default admin path
				if (Keystone.redirect) {
					top.location.href = Keystone.redirect;
				} else {
					top.location.href = _this.props.from ? _this.props.from : Keystone.adminPath;
				}
			}
		});
	},

	/**
  * Display an error message
  *
  * @param  {String} message The message you want to show
  */
	displayError: function displayError(message) {
		this.setState({
			isAnimating: true,
			isInvalid: true,
			invalidMessage: message
		});
		setTimeout(this.finishAnimation, 750);
	},

	// Finish the animation and select the email field
	finishAnimation: function finishAnimation() {
		// TODO isMounted was deprecated, find out if we need this guard
		if (!this.isMounted()) return;
		if (this.refs.email) {
			this.refs.email.select();
		}
		this.setState({
			isAnimating: false
		});
	},
	render: function render() {
		var boxClassname = (0, _classnames2.default)('auth-box', {
			'auth-box--has-errors': this.state.isAnimating
		});
		return _react2.default.createElement(
			'div',
			{ className: 'auth-wrapper' },
			_react2.default.createElement(_Alert2.default, {
				isInvalid: this.state.isInvalid,
				signedOut: this.state.signedOut,
				invalidMessage: this.state.invalidMessage
			}),
			_react2.default.createElement(
				'div',
				{ className: boxClassname },
				_react2.default.createElement(
					'h1',
					{ className: 'u-hidden-visually' },
					this.props.brand ? this.props.brand : 'Keystone',
					' Sign In '
				),
				_react2.default.createElement(
					'div',
					{ className: 'auth-box__inner' },
					_react2.default.createElement(_Brand2.default, {
						logo: this.props.logo,
						brand: this.props.brand
					}),
					this.props.user ? _react2.default.createElement(_UserInfo2.default, {
						adminPath: this.props.from ? this.props.from : Keystone.adminPath,
						signoutPath: Keystone.adminPath + '/signout',
						userCanAccessKeystone: this.props.userCanAccessKeystone,
						userName: this.props.user.name
					}) : _react2.default.createElement(_LoginForm2.default, {
						email: this.state.email,
						handleInputChange: this.handleInputChange,
						handleSubmit: this.handleSubmit,
						isAnimating: this.state.isAnimating,
						password: this.state.password
					})
				)
			),
			_react2.default.createElement('div', { className: 'auth-footer' })
		);
	}
});

module.exports = SigninView;

},{"./components/Alert":66,"./components/Brand":67,"./components/LoginForm":68,"./components/UserInfo":69,"classnames":undefined,"object-assign":75,"react":undefined,"xhr":undefined}],66:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders an Alert. Pass either an isInvalid and invalidMessage prop, or set
 * the signedOut prop to true to show the standard signed out message
 */

var AlertView = function AlertView(props) {
	if (props.isInvalid) {
		return _react2.default.createElement(
			_elemental.Alert,
			{ key: 'error', color: 'danger', style: { textAlign: 'center' } },
			props.invalidMessage
		);
	} else if (props.signedOut) {
		return _react2.default.createElement(
			_elemental.Alert,
			{ key: 'signed-out', color: 'info', style: { textAlign: 'center' } },
			'You have been signed out.'
		);
	} else {
		// Can't return "null" from stateless components
		return _react2.default.createElement('span', null);
	}
};

AlertView.propTypes = {
	invalidMessage: _react2.default.PropTypes.string,
	isInvalid: _react2.default.PropTypes.bool,
	signedOut: _react2.default.PropTypes.bool
};

module.exports = AlertView;

},{"../../App/elemental":64,"react":undefined}],67:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Brand = function Brand(props) {
	// Default to the KeystoneJS logo
	var logo = { src: Keystone.adminPath + '/images/logo.png', width: 205, height: 68 };
	if (props.logo) {
		// If the logo is set to a string, it's a direct link
		logo = typeof props.logo === 'string' ? { src: props.logo } : props.logo;
		// Optionally one can specify the logo as an array, also stating the
		// wanted width and height of the logo
		// TODO: Deprecate this
		if (Array.isArray(logo)) {
			logo = { src: logo[0], width: logo[1], height: logo[2] };
		}
	}
	return _react2.default.createElement(
		'div',
		{ className: 'auth-box__col' },
		_react2.default.createElement(
			'div',
			{ className: 'auth-box__brand' },
			_react2.default.createElement(
				'a',
				{ href: '/', className: 'auth-box__brand__logo' },
				_react2.default.createElement('img', {
					src: logo.src,
					width: logo.width ? logo.width : null,
					height: logo.height ? logo.height : null,
					alt: props.brand
				})
			)
		)
	);
}; /**
    * Renders a logo, defaulting to the Keystone logo if no brand is specified in
    * the configuration
    */

module.exports = Brand;

},{"react":undefined}],68:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The login form of the signin screen
 */

var LoginForm = function LoginForm(_ref) {
	var email = _ref.email,
	    handleInputChange = _ref.handleInputChange,
	    handleSubmit = _ref.handleSubmit,
	    isAnimating = _ref.isAnimating,
	    password = _ref.password;

	return _react2.default.createElement(
		'div',
		{ className: 'auth-box__col' },
		_react2.default.createElement(
			_elemental.Form,
			{ onSubmit: handleSubmit, noValidate: true },
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Email', htmlFor: 'email' },
				_react2.default.createElement(_elemental.FormInput, {
					autoFocus: true,
					type: 'email',
					name: 'email',
					onChange: handleInputChange,
					value: email
				})
			),
			_react2.default.createElement(
				_elemental.FormField,
				{ label: 'Password', htmlFor: 'password' },
				_react2.default.createElement(_elemental.FormInput, {
					type: 'password',
					name: 'password',
					onChange: handleInputChange,
					value: password
				})
			),
			_react2.default.createElement(
				_elemental.Button,
				{ disabled: isAnimating, color: 'primary', type: 'submit' },
				'Sign In'
			),
			_react2.default.createElement('br', null),
			_react2.default.createElement('br', null),
			_react2.default.createElement(
				'a',
				{ href: '/forgot_password', title: 'Forgot Password' },
				'Forgot Password?'
			)
		)
	);
};

LoginForm.propTypes = {
	email: _react.PropTypes.string,
	handleInputChange: _react.PropTypes.func.isRequired,
	handleSubmit: _react.PropTypes.func.isRequired,
	isAnimating: _react.PropTypes.bool,
	password: _react.PropTypes.string
};

module.exports = LoginForm;

},{"../../App/elemental":64,"react":undefined}],69:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO Figure out if we should change "Keystone" to "Admin area"

var UserInfo = function UserInfo(_ref) {
	var adminPath = _ref.adminPath,
	    signoutPath = _ref.signoutPath,
	    userCanAccessKeystone = _ref.userCanAccessKeystone,
	    userName = _ref.userName;

	var adminButton = userCanAccessKeystone ? _react2.default.createElement(
		_elemental.Button,
		{ href: adminPath, color: 'primary' },
		'Open Keystone'
	) : null;

	return _react2.default.createElement(
		'div',
		{ className: 'auth-box__col' },
		_react2.default.createElement(
			'p',
			null,
			'Hi ',
			userName,
			','
		),
		_react2.default.createElement(
			'p',
			null,
			'You\'re already signed in.'
		),
		adminButton,
		_react2.default.createElement(
			_elemental.Button,
			{ href: signoutPath, variant: 'link', color: 'cancel' },
			'Sign Out'
		)
	);
};

UserInfo.propTypes = {
	adminPath: _react.PropTypes.string.isRequired,
	signoutPath: _react.PropTypes.string.isRequired,
	userCanAccessKeystone: _react.PropTypes.bool,
	userName: _react.PropTypes.string.isRequired
};

module.exports = UserInfo;

},{"../../App/elemental":64,"react":undefined}],70:[function(require,module,exports){
'use strict';

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Signin = require('./Signin');

var _Signin2 = _interopRequireDefault(_Signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The signin page, it renders a page with a username and password input form.
 *
 * This is decoupled from the main app (in the "App/" folder) because we inject
 * lots of data into the other screens (like the lists that exist) that we don't
 * want to have injected here, so this is a completely separate route and template.
 */
var params = _qs2.default.parse(window.location.search.replace(/^\?/, ''));
var from = typeof params.from === 'string' && params.from.charAt(0) === '/' ? params.from : undefined;

_reactDom2.default.render(_react2.default.createElement(_Signin2.default, {
	brand: Keystone.brand,
	from: from,
	logo: Keystone.logo,
	user: Keystone.user,
	userCanAccessKeystone: Keystone.userCanAccessKeystone
}), document.getElementById('signin-view'));

},{"./Signin":65,"qs":undefined,"react":undefined,"react-dom":undefined}],71:[function(require,module,exports){
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

},{"./utils/color":72}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}]},{},[70])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkFwcC9lbGVtZW50YWwvQWxlcnQvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQWxlcnQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9CbGFua1N0YXRlL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9CdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NlbnRlci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0NoaXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0NoaXAvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9zaXplcy5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRHJvcGRvd25CdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1GaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUlucHV0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvbm9lZGl0LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtTGFiZWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtTm90ZS9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1TZWxlY3QvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1TZWxlY3Qvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhCdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoRmllbGQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL29jdGljb25zLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zaXplcy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkQ29sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkUm93L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9JbmxpbmVHcm91cFNlY3Rpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9MYWJlbGxlZENvbnRyb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0xvYWRpbmdCdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2JvZHkuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2RpYWxvZy5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZm9vdGVyLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9oZWFkZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9QYWdpbmF0aW9uL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9QYWdpbmF0aW9uL3BhZ2UuanMiLCJBcHAvZWxlbWVudGFsL1Bhc3NDb250ZXh0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Qb3J0YWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Jlc3BvbnNpdmVUZXh0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TY3JlZW5SZWFkZXJPbmx5L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TY3JvbGxMb2NrL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvU2VnbWVudGVkQ29udHJvbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvaW5kZXguanMiLCJTaWduaW4vU2lnbmluLmpzIiwiU2lnbmluL2NvbXBvbmVudHMvQWxlcnQuanMiLCJTaWduaW4vY29tcG9uZW50cy9CcmFuZC5qcyIsIlNpZ25pbi9jb21wb25lbnRzL0xvZ2luRm9ybS5qcyIsIlNpZ25pbi9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwiU2lnbmluL2luZGV4LmpzIiwidGhlbWUuanMiLCJ1dGlscy9jb2xvci5qcyIsInV0aWxzL2NvbmNhdENsYXNzbmFtZXMuanMiLCJ1dGlscy9jc3MuanMiLCIuLi8uLi8uLi9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2hCLFNBQVEsZ0JBQU0sS0FBTixDQUFZLEtBQVosQ0FBa0IsTUFEVjtBQUVoQixRQUFPLGdCQUFNLEtBQU4sQ0FBWSxLQUFaLENBQWtCLE1B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cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmFsZXJ0LmNvbG9yLmRhbmdlcixcclxuXHRlcnJvcjogdGhlbWUuYWxlcnQuY29sb3IuZGFuZ2VyLFxyXG5cdGluZm86IHRoZW1lLmFsZXJ0LmNvbG9yLmluZm8sXHJcblx0c3VjY2VzczogdGhlbWUuYWxlcnQuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5hbGVydC5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuLy8gY2xvbmUgY2hpbGRyZW4gaWYgYSBjbGFzcyBleGlzdHMgZm9yIHRoZSB0YWduYW1lXHJcbmNvbnN0IGNsb25lV2l0aENsYXNzbmFtZXMgPSAoYykgPT4ge1xyXG5cdGNvbnN0IHR5cGUgPSBjLnR5cGUgJiYgYy50eXBlLmRpc3BsYXlOYW1lXHJcblx0XHQ/IGMudHlwZS5kaXNwbGF5TmFtZVxyXG5cdFx0OiBjLnR5cGUgfHwgbnVsbDtcclxuXHJcblx0aWYgKCF0eXBlIHx8ICFjbGFzc2VzW3R5cGVdKSByZXR1cm4gYztcclxuXHJcblx0cmV0dXJuIGNsb25lRWxlbWVudChjLCB7XHJcblx0XHRjbGFzc05hbWU6IGNzcyhjbGFzc2VzW3R5cGVdKSxcclxuXHR9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEFsZXJ0ICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbG9yLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmFsZXJ0LFxyXG5cdFx0Y2xhc3Nlc1tjb2xvcl0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cdHByb3BzLmNoaWxkcmVuID0gQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBjbG9uZVdpdGhDbGFzc25hbWVzKTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSBkYXRhLWFsZXJ0LXR5cGU9e2NvbG9yfSAvPjtcclxufTtcclxuXHJcbkFsZXJ0LnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLmlzUmVxdWlyZWQsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuQWxlcnQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFsZXJ0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbG9yVmFyaWFudHNbY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogY29sb3JzW2NvbG9yXS5ib3JkZXIsXHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXS50ZXh0LFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBoZWFkaW5nc1xyXG5jb25zdCBoZWFkaW5nVGFnbmFtZXMgPSB7fTtcclxuWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNiddLmZvckVhY2godGFnID0+IHtcclxuXHRoZWFkaW5nVGFnbmFtZXNbdGFnXSA9IHsgY29sb3I6ICdpbmhlcml0JyB9O1xyXG59KTtcclxuXHJcbmNvbnN0IGxpbmtTdHlsZXMgPSB7XHJcblx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblxyXG5cdCc6aG92ZXInOiB7IGNvbG9yOiAnaW5oZXJpdCcgfSxcclxuXHQnOmZvY3VzJzogeyBjb2xvcjogJ2luaGVyaXQnIH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhbGVydDoge1xyXG5cdFx0Ym9yZGVyQ29sb3I6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmFsZXJ0LmJvcmRlclJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmFsZXJ0LmJvcmRlcldpZHRoLFxyXG5cdFx0bWFyZ2luOiB0aGVtZS5hbGVydC5tYXJnaW4sXHJcblx0XHRwYWRkaW5nOiB0aGVtZS5hbGVydC5wYWRkaW5nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRhZ25hbWVzXHJcblx0YTogbGlua1N0eWxlcyxcclxuXHRMaW5rOiBsaW5rU3R5bGVzLFxyXG5cdHN0cm9uZzoge1xyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdH0sXHJcblxyXG5cdC8vIGhlYWRpbmdzXHJcblx0Li4uaGVhZGluZ1RhZ25hbWVzLFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gQmxhbmtTdGF0ZSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRoZWFkaW5nLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRhaW5lcixcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30+XHJcblx0XHRcdHshIWhlYWRpbmcgJiYgPGgyIGRhdGEtZTJlLWJsYW5rLXN0YXRlLWhlYWRpbmcgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkaW5nKX0+e2hlYWRpbmd9PC9oMj59XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdDwvQ29tcG9uZW50PlxyXG5cdCk7XHJcbn07XHJcblxyXG5CbGFua1N0YXRlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLmlzUmVxdWlyZWQsXHJcblx0aGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuQmxhbmtTdGF0ZS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJsYW5rc3RhdGUuYmFja2dyb3VuZCxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYmxhbmtzdGF0ZS5ib3JkZXJSYWRpdXMsXHJcblx0XHRjb2xvcjogdGhlbWUuYmxhbmtzdGF0ZS5jb2xvcixcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ1ZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ0hvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ0hvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5ibGFua3N0YXRlLnBhZGRpbmdWZXJ0aWNhbCxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0fSxcclxuXHJcblx0aGVhZGluZzoge1xyXG5cdFx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpbkJvdHRvbTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmxhbmtTdGF0ZTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNvbnN0IGNvbW1vbkNsYXNzZXMgPSBzdHlsZXMuY29tbW9uO1xyXG5jb25zdCBzdHlsZXNoZWV0Q2FjaGUgPSB7fTtcclxuZnVuY3Rpb24gZ2V0U3R5bGVTaGVldCAodmFyaWFudCwgY29sb3IpIHtcclxuXHRjb25zdCBjYWNoZUtleSA9IGAke3ZhcmlhbnR9LSR7Y29sb3J9YDtcclxuXHRpZiAoIXN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV0pIHtcclxuXHRcdGNvbnN0IHZhcmlhbnRTdHlsZXMgPSBzdHlsZXNbdmFyaWFudF0oY29sb3IpO1xyXG5cdFx0c3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XSA9IHZhcmlhbnRTdHlsZXM7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldO1xyXG59XHJcblxyXG5jb25zdCBCVVRUT05fU0laRVMgPSBbJ2xhcmdlJywgJ21lZGl1bScsICdzbWFsbCcsICd4c21hbGwnXTtcclxuY29uc3QgQlVUVE9OX1ZBUklBTlRTID0gWydmaWxsJywgJ2hvbGxvdycsICdsaW5rJ107XHJcbmNvbnN0IEJVVFRPTl9DT0xPUlMgPSBbJ2RlZmF1bHQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2NhbmNlbCcsICdkZWxldGUnXTtcclxuXHJcbi8vIE5PVEUgbXVzdCBOT1QgYmUgZnVuY3Rpb25hbCBjb21wb25lbnQgdG8gYWxsb3cgYHJlZnNgXHJcblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlciAoKSB7XHJcblx0XHR2YXIge1xyXG5cdFx0XHRhY3RpdmUsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0YmxvY2ssXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y29sb3IsXHJcblx0XHRcdGNvbXBvbmVudDogVGFnLFxyXG5cdFx0XHRkaXNhYmxlZCxcclxuXHRcdFx0c2l6ZSxcclxuXHRcdFx0dmFyaWFudCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgc3R5bGVzXHJcblx0XHRjb25zdCB2YXJpYW50Q2xhc3NlcyA9IGdldFN0eWxlU2hlZXQodmFyaWFudCwgY29sb3IpO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjb21tb25DbGFzc2VzLmJhc2UsXHJcblx0XHRcdGNvbW1vbkNsYXNzZXNbc2l6ZV0sXHJcblx0XHRcdHZhcmlhbnRDbGFzc2VzLmJhc2UsXHJcblx0XHRcdGJsb2NrID8gY29tbW9uQ2xhc3Nlcy5ibG9jayA6IG51bGwsXHJcblx0XHRcdGRpc2FibGVkID8gY29tbW9uQ2xhc3Nlcy5kaXNhYmxlZCA6IG51bGwsXHJcblx0XHRcdGFjdGl2ZSA/IHZhcmlhbnRDbGFzc2VzLmFjdGl2ZSA6IG51bGwsXHJcblx0XHRcdC4uLmFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHJldHVybiBhbiBhbmNob3Igb3IgYnV0dG9uXHJcblx0XHRpZiAoIVRhZykge1xyXG5cdFx0XHRUYWcgPSBwcm9wcy5ocmVmID8gJ2EnIDogJ2J1dHRvbic7XHJcblx0XHR9XHJcblx0XHQvLyBFbnN1cmUgYnV0dG9ucyBkb24ndCBzdWJtaXQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKFRhZyA9PT0gJ2J1dHRvbicgJiYgIXByb3BzLnR5cGUpIHtcclxuXHRcdFx0cHJvcHMudHlwZSA9ICdidXR0b24nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiA8VGFnIHsuLi5wcm9wc30gLz47XHJcblx0fVxyXG59O1xyXG5cclxuQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuXHRhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSkpLFxyXG5cdGJsb2NrOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9DT0xPUlMpLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9TSVpFUyksXHJcblx0dmFyaWFudDogUHJvcFR5cGVzLm9uZU9mKEJVVFRPTl9WQVJJQU5UUyksXHJcbn07XHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBbXSxcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG5cdHZhcmlhbnQ6ICdmaWxsJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQnV0dG9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHsgZ3JhZGllbnRWZXJ0aWNhbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nzcyc7XHJcbmltcG9ydCB7IGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcblxyXG4vLyBDb21tb24gU3R5bGVzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmV4cG9ydHMuY29tbW9uID0ge1xyXG5cdC8vIEJhc2UgQnV0dG9uXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGJhc2U6IHtcclxuXHRcdCdhcHBlYXJhbmNlJzogJ25vbmUnLFxyXG5cdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHQnYm9yZGVyV2lkdGgnOiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGgsXHJcblx0XHQnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxyXG5cdFx0J2JvcmRlckNvbG9yJzogJ3RyYW5zcGFyZW50JyxcclxuXHRcdCdib3JkZXJSYWRpdXMnOiB0aGVtZS5idXR0b24uYm9yZGVyUmFkaXVzLFxyXG5cdFx0J2N1cnNvcic6ICdwb2ludGVyJyxcclxuXHRcdCdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcblx0XHQnZm9udFdlaWdodCc6IHRoZW1lLmJ1dHRvbi5mb250LndlaWdodCxcclxuXHRcdCdoZWlnaHQnOiB0aGVtZS5jb21wb25lbnQuaGVpZ2h0LFxyXG5cdFx0J2xpbmVIZWlnaHQnOiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRcdCdtYXJnaW5Cb3R0b20nOiAwLFxyXG5cdFx0J3BhZGRpbmcnOiBgMCAke3RoZW1lLmJ1dHRvbi5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0J291dGxpbmUnOiAwLFxyXG5cdFx0J3RleHRBbGlnbic6ICdjZW50ZXInLFxyXG5cdFx0J3RvdWNoQWN0aW9uJzogJ21hbmlwdWxhdGlvbicsXHJcblx0XHQndXNlclNlbGVjdCc6ICdub25lJyxcclxuXHRcdCd2ZXJ0aWNhbEFsaWduJzogJ21pZGRsZScsXHJcblx0XHQnd2hpdGVTcGFjZSc6ICdub3dyYXAnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b24uZGVmYXVsdC50ZXh0Q29sb3IsXHJcblx0XHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbi5kZWZhdWx0LnRleHRDb2xvcixcclxuXHRcdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQvLyBCbG9jayBEaXNwbGF5XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGJsb2NrOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0d2lkdGg6ICcxMDAlJyxcclxuXHR9LFxyXG5cdC8vIERpc2FibGVkXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGRpc2FibGVkOiB7XHJcblx0XHRvcGFjaXR5OiAwLjQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHQvLyBTaXplc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRsYXJnZToge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5sYXJnZSxcclxuXHR9LFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuZGVmYXVsdCxcclxuXHR9LFxyXG5cdHNtYWxsOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdH0sXHJcblx0eHNtYWxsOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnhzbWFsbCxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjknLFxyXG5cdFx0cGFkZGluZ0xlZnQ6ICcuNjZlbScsXHJcblx0XHRwYWRkaW5nUmlnaHQ6ICcuNjZlbScsXHJcblx0fSxcclxufTtcclxuXHJcblxyXG4vLyBGaWxsIFZhcmlhbnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBidXR0b25GaWxsVmFyaWFudCAodGV4dENvbG9yLCBiZ0NvbG9yKSB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgMTApLCBkYXJrZW4oYmdDb2xvciwgNSkpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCA1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c1N0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCAxMCksIGRhcmtlbihiZ0NvbG9yLCA1KSksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX1gLFxyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZShiZ0NvbG9yLCAyNSl9YCxcclxuXHRcdGNvbG9yOiB0ZXh0Q29sb3IsXHJcblx0XHRvdXRsaW5lOiAnbm9uZScsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRhcmtlbihiZ0NvbG9yLCAxMCksXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgMjUpfSAke2RhcmtlbihiZ0NvbG9yLCAxNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4oYmdDb2xvciwgNSksIGRhcmtlbihiZ0NvbG9yLCAxMCksIGJnQ29sb3IpLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBgJHtkYXJrZW4oYmdDb2xvciwgMTApfSAke2RhcmtlbihiZ0NvbG9yLCAyMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDI1KX1gLFxyXG5cdFx0XHQnYm94U2hhZG93JzogJ2luc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJyxcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cdFx0XHQnZm9udFdlaWdodCc6IDQwMCxcclxuXHRcdFx0J3RleHRTaGFkb3cnOiAnMCAtMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBmb2N1c1N0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufVxyXG4vLyBUT0RPOiBUaGlzIGlzIHByZXR0eSBoYWNreSwgbmVlZHMgdG8gYmUgY29uc29saWRhdGVkIHdpdGggdGhlIFZhcmlhbnQoKSBtZXRob2RcclxuLy8gYWJvdmUgKG5lZWRzIG1vcmUgdGhlbWUgdmFyaWFibGVzIHRvIGJlIGltcGxlbWVudGVkIHRob3VnaClcclxuZnVuY3Rpb24gYnV0dG9uRmlsbERlZmF1bHQgKCkge1xyXG5cdGNvbnN0IGJvcmRlckNvbG9yID0gdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQ7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKCcjZmZmJywgJyNlZWUnKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDUpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgNSl9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCAxMCl9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNTdHlsZXMgPSB7XHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApfWAsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmQ6ICcjZTZlNmU2JyxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDEwKSxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKCcjZmFmYWZhJywgJyNlYWVhZWEnKSxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYCR7Ym9yZGVyQ29sb3J9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCA2KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDEyKX1gLFxyXG5cdFx0XHQnY29sb3InOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdFx0XHQndGV4dFNoYWRvdyc6ICcwIDFweCAwIHdoaXRlJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGZvY3VzU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gZ3Jvc3MgaGFja1xyXG5cdFx0YWN0aXZlOiB7XHJcblx0XHRcdC4uLmFjdGl2ZVN0eWxlcyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBhY3RpdmVTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdFx0Li4uYWN0aXZlU3R5bGVzLFxyXG5cdFx0XHRcdC4uLmZvY3VzU3R5bGVzLFxyXG5cdFx0XHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApfSwgaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKWAsXHJcblx0XHRcdH0sXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcbmV4cG9ydHMuZmlsbCA9IChjb2xvcikgPT4ge1xyXG5cdHN3aXRjaCAoY29sb3IpIHtcclxuXHRcdGNhc2UgJ2RlZmF1bHQnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbERlZmF1bHQoKTtcclxuXHRcdGNhc2UgJ2NhbmNlbCc6XHJcblx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uRmlsbFZhcmlhbnQoJ3doaXRlJywgdGhlbWUuYnV0dG9uLmRhbmdlci5iZ0NvbG9yKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsVmFyaWFudCgnd2hpdGUnLCB0aGVtZS5idXR0b25bY29sb3JdLmJnQ29sb3IpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBIb2xsb3cgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkhvbGxvd1ZhcmlhbnQgKHRleHRDb2xvciwgYm9yZGVyQ29sb3IpIHtcclxuXHRjb25zdCBmb2N1c0FuZEhvdmVyU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUoYm9yZGVyQ29sb3IsIDE1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDE1KSxcclxuXHRcdGJveFNoYWRvdzogJ25vbmUnLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzT25seVN0eWxlcyA9IHtcclxuXHRcdGJveFNoYWRvdzogYDAgMCAwIDNweCAke2ZhZGUoYm9yZGVyQ29sb3IsIDEwKX1gLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKGJvcmRlckNvbG9yLCAzNSksXHJcblx0XHRib3JkZXJDb2xvcjogZGFya2VuKGJvcmRlckNvbG9yLCAyNSksXHJcblx0XHRib3hTaGFkb3c6ICdub25lJyxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdFx0J2JvcmRlckNvbG9yJzogYm9yZGVyQ29sb3IsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHJcblx0XHRcdCc6aG92ZXInOiBmb2N1c0FuZEhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzICc6IE9iamVjdC5hc3NpZ24oe30sIGZvY3VzQW5kSG92ZXJTdHlsZXMsIGZvY3VzT25seVN0eWxlcyksXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn07XHJcbmV4cG9ydHMuaG9sbG93ID0gKGNvbG9yKSA9PiB7XHJcblx0Ly8gVE9ETzogYmV0dGVyIGhhbmRsaW5nIG9mIGNhbmNlbCBhbmQgZGVsZXRlIGNvbG9yc1xyXG5cdGlmIChjb2xvciA9PT0gJ2NhbmNlbCcgfHwgY29sb3IgPT09ICdkZWxldGUnKSBjb2xvciA9ICdkYW5nZXInO1xyXG5cclxuXHRyZXR1cm4gYnV0dG9uSG9sbG93VmFyaWFudCh0aGVtZS5idXR0b25bY29sb3JdLmJnQ29sb3IsIHRoZW1lLmJ1dHRvbltjb2xvcl0uYm9yZGVyQ29sb3IpO1xyXG59O1xyXG5cclxuXHJcbi8vIExpbmsgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkxpbmtWYXJpYW50ICh0ZXh0Q29sb3IsIGhvdmVyQ29sb3IpIHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdGNvbG9yOiBob3ZlckNvbG9yLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6IHtcclxuXHRcdFx0J2JhY2tncm91bmQnOiAnbm9uZScsXHJcblx0XHRcdCdib3JkZXInOiAwLFxyXG5cdFx0XHQnYm94U2hhZG93JzogJ25vbmUnLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblx0XHRcdCdmb250V2VpZ2h0JzogJ25vcm1hbCcsXHJcblx0XHRcdCdvdXRsaW5lJzogJ25vbmUnLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogaG92ZXJTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBob3ZlclN0eWxlcyxcclxuXHR9O1xyXG59O1xyXG5mdW5jdGlvbiBidXR0b25MaW5rRGVsZXRlICgpIHtcclxuXHRjb25zdCBzdHlsZXMgPSBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5ncmF5NDAsIHRoZW1lLmNvbG9yLmRhbmdlcik7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHQuLi5ncmFkaWVudFZlcnRpY2FsKGxpZ2h0ZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksIGRhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSksXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA0KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMil9YCxcclxuXHRcdGJveFNoYWRvdzogJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjEpJyxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgNCksXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCAxMil9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9ICR7ZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgOCl9YCxcclxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQuLi5zdHlsZXMuYmFzZSxcclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHRcdGFjdGl2ZTogYWN0aXZlU3R5bGVzLFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydHMubGluayA9IChjb2xvcikgPT4ge1xyXG5cdHN3aXRjaCAoY29sb3IpIHtcclxuXHRcdGNhc2UgJ2RlZmF1bHQnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3IubGluaywgdGhlbWUuY29sb3IubGlua0hvdmVyKTtcclxuXHRcdGNhc2UgJ2NhbmNlbCc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5ncmF5NDAsIHRoZW1lLmNvbG9yLmRhbmdlcik7XHJcblx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua0RlbGV0ZSgpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yW2NvbG9yXSwgdGhlbWUuY29sb3JbY29sb3JdKTtcclxuXHR9XHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIENlbnRlciAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRoZWlnaHQsXHJcblx0c3R5bGUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLmNlbnRlciwgY2xhc3NOYW1lKTtcclxuXHRwcm9wcy5zdHlsZSA9IHsgaGVpZ2h0LCAuLi5zdHlsZSB9O1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5DZW50ZXIucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0aGVpZ2h0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5DZW50ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0aGVpZ2h0OiAnYXV0bycsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENlbnRlcjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENlbnRlclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNlbnRlcjoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgZmFkZSwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbmNvbnN0IGJhc2VDb2xvcnMgPSB7fTtcclxuWydkYW5nZXInLCAnaW5mbycsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZyddLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGJhc2VDb2xvcnNbY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDEwKSxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAyMCksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGZhZGUodGhlbWUuY29sb3JbY29sb3JdLCAxNSksXHJcblx0XHR0ZXh0OiB0aGVtZS5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcbmNvbnN0IGludmVydGVkQ29sb3JzID0ge307XHJcblsnZGFuZ2VyJywgJ2luZm8nLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRpbnZlcnRlZENvbG9yc1tjb2xvciArICdfX2ludmVydGVkJ10gPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvcltjb2xvcl0sXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBsaWdodGVuKHRoZW1lLmNvbG9yW2NvbG9yXSwgNSksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGxpZ2h0ZW4odGhlbWUuY29sb3JbY29sb3JdLCAxNSksXHJcblx0XHR0ZXh0OiAnd2hpdGUnLFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGVmYXVsdDoge1xyXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuY29sb3IuZ3JheTEwLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogdGhlbWUuY29sb3IuZ3JheTIwLFxyXG5cdFx0YmFja2dyb3VuZEhvdmVyOiB0aGVtZS5jb2xvci5ncmF5MTUsXHJcblx0XHR0ZXh0OiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHQuLi5iYXNlQ29sb3JzLFxyXG5cclxuXHQvLyBpbnZlcnRlZFxyXG5cdGRlZmF1bHRfX2ludmVydGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiBsaWdodGVuKHRoZW1lLmNvbG9yLmdyYXk2MCwgNSksXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IGxpZ2h0ZW4odGhlbWUuY29sb3IuZ3JheTYwLCAxNSksXHJcblx0XHR0ZXh0OiAnd2hpdGUnLFxyXG5cdH0sXHJcblx0Li4uaW52ZXJ0ZWRDb2xvcnMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG5mdW5jdGlvbiBDaGlwICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNvbG9yLFxyXG5cdGludmVydGVkLFxyXG5cdGxhYmVsLFxyXG5cdG9uQ2xlYXIsXHJcblx0b25DbGljayxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5jaGlwLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHRjb25zdCBsYWJlbENsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0Y2xhc3Nlcy5sYWJlbCxcclxuXHRcdGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yICsgKGludmVydGVkID8gJ19faW52ZXJ0ZWQnIDogJycpXVxyXG5cdCk7XHJcblx0Y29uc3QgY2xlYXJDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJ1dHRvbixcclxuXHRcdGNsYXNzZXMuY2xlYXIsXHJcblx0XHRjbGFzc2VzWydidXR0b25fXycgKyBjb2xvciArIChpbnZlcnRlZCA/ICdfX2ludmVydGVkJyA6ICcnKV1cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9e2xhYmVsQ2xhc3NOYW1lfT5cclxuXHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0eyEhb25DbGVhciAmJiAoXHJcblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGVhcn0gY2xhc3NOYW1lPXtjbGVhckNsYXNzTmFtZX0+XHJcblx0XHRcdFx0XHQmdGltZXM7XHJcblx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdCl9XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuQ2hpcC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKS5pc1JlcXVpcmVkLFxyXG5cdGludmVydGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdG9uQ2xlYXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5DaGlwLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGlwO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IHsgYm9yZGVyTGVmdFJhZGl1cywgYm9yZGVyUmlnaHRSYWRpdXMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jc3MnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29uc3QgaG92ZXJTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZEhvdmVyLFxyXG5cdH07XHJcblxyXG5cdGNvbG9yVmFyaWFudHNbJ2J1dHRvbl9fJyArIGNvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IGNvbG9yc1tjb2xvcl0udGV4dCxcclxuXHJcblx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogaG92ZXJTdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHtcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmRBY3RpdmUsXHJcblx0XHR9LFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y2hpcDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMi4yZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRhZ25hbWVzXHJcblx0YnV0dG9uOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICdub25lJyxcclxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsXHJcblx0XHRwYWRkaW5nOiAnMCAuOWVtJyxcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHJcblx0XHQvLyBtYWtlIHBpbGxzIC0gZXhhZ2dlcmF0ZSB0aGUgcGFkZGluZyB0b3dhcmQgdGhlIHJhZGlpIHNvIGl0IGxvb2tzIGV2ZW5cclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7XHJcblx0XHRcdC4uLmJvcmRlckxlZnRSYWRpdXMoJzNlbScpLFxyXG5cdFx0XHRwYWRkaW5nTGVmdDogJzEuMWVtJyxcclxuXHRcdH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdC4uLmJvcmRlclJpZ2h0UmFkaXVzKCczZW0nKSxcclxuXHRcdFx0cGFkZGluZ1JpZ2h0OiAnMS4xZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHJvdmlkZSBzZXBhcmF0aW9uIGJldHdlZW4gdGhlIGxhYmVsIGFuZCBjbGVhciBidXR0b25zXHJcblx0Ly8gZmxvYXRpbmcgc3RvcHMgdGhlIG1hcmdpbnMgZnJvbSBjb2xsYXBzaW5nIGludG8gZWFjaGluZ1xyXG5cclxuXHRsYWJlbDogeyBtYXJnaW5SaWdodDogMSB9LFxyXG5cdGNsZWFyOiB7IG1hcmdpbkxlZnQ6IDEgfSxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG5mdW5jdGlvbiBDb250YWluZXIgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdHdpZHRoLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRhaW5lcixcclxuXHRcdGNsYXNzZXNbd2lkdGhdLFxyXG5cdFx0Y2xlYXJGbG9hdGluZ0NoaWxkcmVuID8gY2xhc3Nlcy5jbGVhcmZpeCA6IG51bGxcclxuXHQpO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtcclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuXHRjbGVhckZsb2F0aW5nQ2hpbGRyZW46IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSkuaXNSZXF1aXJlZCxcclxuXHR3aWR0aDogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKHNpemVzKSkuaXNSZXF1aXJlZCxcclxufTtcclxuQ29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdHdpZHRoOiAnbGFyZ2UnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzbWFsbDogdGhlbWUuY29udGFpbmVyLnNpemUuc21hbGwsXHJcblx0bWVkaXVtOiB0aGVtZS5jb250YWluZXIuc2l6ZS5tZWRpdW0sXHJcblx0bGFyZ2U6IHRoZW1lLmNvbnRhaW5lci5zaXplLmxhcmdlLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ29udGFpbmVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoc2l6ZXMpLmZvckVhY2goc2l6ZSA9PiB7XHJcblx0c2l6ZVZhcmlhbnRzW3NpemVdID0ge1xyXG5cdFx0bWF4V2lkdGg6IHNpemVzW3NpemVdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLypcclxuXHRNaWNybyBjbGVhcmZpeCBoYWNrXHJcblx0MS5cdFRoZSBzcGFjZSBjb250ZW50IGlzIG9uZSB3YXkgdG8gYXZvaWQgYW4gT3BlcmEgYnVnIHdoZW4gdGhlXHJcblx0XHRcdGNvbnRlbnRlZGl0YWJsZSBhdHRyaWJ1dGUgaXMgaW5jbHVkZWQgYW55d2hlcmUgZWxzZSBpbiB0aGUgZG9jdW1lbnQuXHJcblx0XHRcdE90aGVyd2lzZSBpdCBjYXVzZXMgc3BhY2UgdG8gYXBwZWFyIGF0IHRoZSB0b3AgYW5kIGJvdHRvbSBvZiBlbGVtZW50c1xyXG5cdFx0XHR0aGF0IGFyZSBjbGVhcmZpeGVkLlxyXG5cdDIuXHRUaGUgdXNlIG9mIGB0YWJsZWAgcmF0aGVyIHRoYW4gYGJsb2NrYCBpcyBvbmx5IG5lY2Vzc2FyeSBpZiB1c2luZ1xyXG5cdFx0XHRgOmJlZm9yZWAgdG8gY29udGFpbiB0aGUgdG9wLW1hcmdpbnMgb2YgY2hpbGQgZWxlbWVudHMuXHJcbiovXHJcbmNvbnN0IGNsZWFyZml4U3R5bGVzID0ge1xyXG5cdGNsZWFyOiAnYm90aCcsXHJcblx0Y29udGVudDogJ1wiIFwiJywgLy8gMVxyXG5cdGRpc3BsYXk6ICd0YWJsZScsIC8vIDJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0bWFyZ2luTGVmdDogJ2F1dG8nLFxyXG5cdFx0bWFyZ2luUmlnaHQ6ICdhdXRvJyxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLFxyXG5cdH0sXHJcblxyXG5cdC8vIGNsZWFyIGZsb2F0aW5nIGNoaWxkcmVuXHJcblx0Y2xlYXJmaXg6IHtcclxuXHRcdCc6YmVmb3JlJzogY2xlYXJmaXhTdHlsZXMsXHJcblx0XHQnOmFmdGVyJzogY2xlYXJmaXhTdHlsZXMsXHJcblx0fSxcclxuXHJcblx0Ly8gc2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuXHJcbmZ1bmN0aW9uIERyb3Bkb3duQnV0dG9uICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxCdXR0b24gey4uLnByb3BzfT5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93KX0gLz5cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBOT1RFXHJcbi8vIDE6IHRha2UgYWR2YW50YWdlIG9mIGBjdXJyZW50Q29sb3JgIGJ5IGxlYXZpbmcgYm9yZGVyIHRvcCBjb2xvciB1bmRlZmluZWRcclxuLy8gMjogZXZlbiB0aG91Z2ggdGhlIGFycm93IGlzIHZlcnRpY2FsbHkgY2VudGVyZWQsIHZpc3VhbGx5IGl0IGFwcGVhcnMgdG9vIGxvd1xyXG4vLyAgICBiZWNhdXNlIG9mIGxvd2VyY2FzZSBjaGFyYWN0ZXJzIGJlc2lkZSBpdFxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGFycm93OiB7XHJcblx0XHRib3JkZXJMZWZ0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmlnaHQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJUb3A6ICcwLjNlbSBzb2xpZCcsIC8vIDFcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAwLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyAyXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cclxuXHRcdC8vIGFkZCBzcGFjaW5nXHJcblx0XHQnOmZpcnN0LWNoaWxkJzoge1xyXG5cdFx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHRcdH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpbkxlZnQ6ICcwLjVlbScsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duQnV0dG9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBGb3JtTGFiZWwgZnJvbSAnLi4vRm9ybUxhYmVsJztcclxuXHJcbmNsYXNzIEZvcm1GaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuZm9ybUZpZWxkSWQgPSBnZW5lcmF0ZUlkKCk7XHJcblx0fVxyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtRmllbGRJZDogdGhpcy5mb3JtRmllbGRJZCxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZvcm1MYXlvdXQgPSAnYmFzaWMnLCBsYWJlbFdpZHRoIH0gPSB0aGlzLmNvbnRleHQ7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdFx0Y2hpbGRyZW4sXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y3JvcExhYmVsLFxyXG5cdFx0XHRodG1sRm9yLFxyXG5cdFx0XHRsYWJlbCxcclxuXHRcdFx0b2Zmc2V0QWJzZW50TGFiZWwsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybUZpZWxkLFxyXG5cdFx0XHRjbGFzc2VzWydGb3JtRmllbGQtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSxcclxuXHRcdFx0b2Zmc2V0QWJzZW50TGFiZWwgPyBjbGFzc2VzWydGb3JtRmllbGQtLW9mZnNldC1hYnNlbnQtbGFiZWwnXSA6IG51bGwsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG9mZnNldEFic2VudExhYmVsICYmIGxhYmVsV2lkdGgpIHtcclxuXHRcdFx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRcdFx0cGFkZGluZ0xlZnQ6IGxhYmVsV2lkdGgsXHJcblx0XHRcdFx0Li4ucHJvcHMuc3R5bGUsXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZWxlbWVudHNcclxuXHRcdGNvbnN0IGNvbXBvbmVudExhYmVsID0gbGFiZWwgPyAoXHJcblx0XHRcdDxGb3JtTGFiZWwgaHRtbEZvcj17aHRtbEZvcn0gY3JvcFRleHQ9e2Nyb3BMYWJlbH0+XHJcblx0XHRcdFx0e2xhYmVsfVxyXG5cdFx0XHQ8L0Zvcm1MYWJlbD5cclxuXHRcdCkgOiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgey4uLnByb3BzfSBodG1sRm9yPXtodG1sRm9yfT5cclxuXHRcdFx0XHR7Y29tcG9uZW50TGFiZWx9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtRmllbGQuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkZvcm1GaWVsZC5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybUZpZWxkLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRjcm9wTGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG5cdGh0bWxGb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0b2Zmc2V0QWJzZW50TGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVJZCAoKSB7XHJcblx0cmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUZpZWxkO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBGaWVsZFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUZpZWxkJzoge1xyXG5cdFx0bWFyZ2luQm90dG9tOiAnMWVtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHdoZW4gaW5zaWRlIGEgaG9yaXpvbnRhbCBmb3JtXHJcblxyXG5cdCdGb3JtRmllbGQtLWZvcm0tbGF5b3V0LWhvcml6b250YWwnOiB7XHJcblx0XHRbYEBtZWRpYSAobWluLXdpZHRoOiAke3RoZW1lLmJyZWFrcG9pbnQudGFibGV0TGFuZHNjYXBlTWlufSlgXToge1xyXG5cdFx0XHRkaXNwbGF5OiAndGFibGUnLFxyXG5cdFx0XHR0YWJsZUxheW91dDogJ2ZpeGVkJyxcclxuXHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gaW5zaWRlIGhvcml6b250YWwgZm9ybVxyXG5cdC8vIHR5cGljYWxseSBmb3IgdXNlIHdpdGggc3VibWl0IGJ1dHRvbiBpbnNpZGVcclxuXHQnRm9ybUZpZWxkLS1vZmZzZXQtYWJzZW50LWxhYmVsJzoge1xyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmZvcm0ubGFiZWwud2lkdGgsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYW4gaW5saW5lIGZvcm1cclxuXHJcblx0J0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtaW5saW5lJzoge1xyXG5cdFx0J2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdCdwYWRkaW5nTGVmdCc6ICcwLjI1ZW0nLFxyXG5cdFx0J3BhZGRpbmdSaWdodCc6ICcwLjI1ZW0nLFxyXG5cdFx0J3ZlcnRpY2FsQWxpZ24nOiAndG9wJyxcclxuXHJcblx0XHQnOmZpcnN0LWNoaWxkJzogeyBwYWRkaW5nTGVmdDogMCB9LFxyXG5cdFx0JzpsYXN0LWNoaWxkJzogeyBwYWRkaW5nUmlnaHQ6IDAgfSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbmNhdENsYXNzbmFtZXMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29uY2F0Q2xhc3NuYW1lcyc7XHJcbmltcG9ydCBJbnB1dE5vZWRpdCBmcm9tICcuL25vZWRpdCc7XHJcblxyXG4vLyBOT1RFIG11c3QgTk9UIGJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRvIGFsbG93IGByZWZzYFxyXG5cclxuY2xhc3MgRm9ybUlucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRibHVyICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmJsdXIoKTtcclxuXHR9XHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuZm9jdXMoKTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRjbGFzc05hbWUsXHJcblx0XHRcdGRpc2FibGVkLFxyXG5cdFx0XHRpZCxcclxuXHRcdFx0bXVsdGlsaW5lLFxyXG5cdFx0XHRub2VkaXQsXHJcblx0XHRcdHNpemUsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBOT1RFIHJldHVybiBhIGRpZmZlcmVudCBjb21wb25lbnQgZm9yIGBub2VkaXRgXHJcblx0XHRpZiAobm9lZGl0KSByZXR1cm4gPElucHV0Tm9lZGl0IHsuLi50aGlzLnByb3BzfSAvPjtcclxuXHJcblx0XHRjb25zdCB7IGZvcm1GaWVsZElkLCBmb3JtTGF5b3V0IH0gPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cdFx0cHJvcHMuaWQgPSBpZCB8fCBmb3JtRmllbGRJZDtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtSW5wdXQsXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1JbnB1dF9fc2l6ZS0tJyArIHNpemVdLFxyXG5cdFx0XHRkaXNhYmxlZCA/IGNsYXNzZXNbJ0Zvcm1JbnB1dC0tZGlzYWJsZWQnXSA6IG51bGwsXHJcblx0XHRcdGZvcm1MYXlvdXQgPyBjbGFzc2VzWydGb3JtSW5wdXQtLWZvcm0tbGF5b3V0LScgKyBmb3JtTGF5b3V0XSA6IG51bGwsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoYXBocm9kaXRlU3R5bGVzKVxyXG5cdFx0KTtcclxuXHRcdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHNldFJlZiA9IChuKSA9PiAodGhpcy50YXJnZXQgPSBuKTtcclxuXHRcdGNvbnN0IFRhZyA9IG11bHRpbGluZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxUYWdcclxuXHRcdFx0XHRyZWY9e3NldFJlZn1cclxuXHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XHJcblx0XHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1JbnB1dC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSkpLFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSxcclxuXHRdKSxcclxuXHRtdWx0aWxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihbJ2RlZmF1bHQnLCAnc21hbGwnLCAnbGFyZ2UnXSksXHJcblx0dHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybUlucHV0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRzaXplOiAnZGVmYXVsdCcsXHJcblx0dHlwZTogJ3RleHQnLFxyXG59O1xyXG5Gb3JtSW5wdXQuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtSW5wdXQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBmYWRlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuZnVuY3Rpb24gRm9ybUlucHV0Tm9lZGl0ICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNyb3BUZXh0LFxyXG5cdG11bHRpbGluZSxcclxuXHRub2VkaXQsIC8vIE5PVEUgbm90IHVzZWQsIGp1c3QgcmVtb3ZlZCBmcm9tIHByb3BzXHJcblx0dHlwZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5ub2VkaXQsXHJcblx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuY3JvcFRleHQgOiBudWxsLFxyXG5cdFx0bXVsdGlsaW5lID8gY2xhc3Nlcy5tdWx0aWxpbmUgOiBudWxsLFxyXG5cdFx0KHByb3BzLmhyZWYgfHwgcHJvcHMub25DbGljaykgPyBjbGFzc2VzLmFuY2hvciA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuRm9ybUlucHV0Tm9lZGl0LnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGNyb3BUZXh0OiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuRm9ybUlucHV0Tm9lZGl0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbmNvbnN0IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRib3JkZXJDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmxpbmssXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG5cdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0bm9lZGl0OiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQubm9lZGl0LFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLm5vZWRpdCxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdHBhZGRpbmc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdHRyYW5zaXRpb246ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblxyXG5cdFx0Ly8gcHJldmVudCBlbXB0eSBpbnB1dHMgZnJvbSBjb2xsYXBzaW5nIGJ5IGFkZGluZyBjb250ZW50XHJcblx0XHQnOmVtcHR5OmJlZm9yZSc6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdFx0Y29udGVudDogJ1wiKG5vIHZhbHVlKVwiJyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0bXVsdGlsaW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMS40JyxcclxuXHRcdHBhZGRpbmdCb3R0b206ICcwLjZlbScsXHJcblx0XHRwYWRkaW5nVG9wOiAnMC42ZW0nLFxyXG5cdH0sXHJcblxyXG5cdC8vIGluZGljYXRlIGNsaWNrYWJpbGl0eSB3aGVuIHVzaW5nIGFuIGFuY2hvclxyXG5cdGFuY2hvcjoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmxpbmssXHJcblx0XHRtYXJnaW5SaWdodDogNSxcclxuXHRcdG1pbldpZHRoOiAwLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQnOmhvdmVyJzogYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1JbnB1dE5vZWRpdDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gSW5wdXRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1JbnB1dCc6IHtcclxuXHRcdCdhcHBlYXJhbmNlJzogJ25vbmUnLFxyXG5cdFx0J2JhY2tncm91bmRDb2xvcic6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGVmYXVsdCxcclxuXHRcdCdiYWNrZ3JvdW5kSW1hZ2UnOiAnbm9uZScsXHJcblx0XHQnYm9yZGVyQ29sb3InOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCxcclxuXHRcdCdib3JkZXJSYWRpdXMnOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0J2JvcmRlclN0eWxlJzogJ3NvbGlkJyxcclxuXHRcdCdib3JkZXJXaWR0aCc6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdCdib3hTaGFkb3cnOiB0aGVtZS5pbnB1dC5ib3hTaGFkb3csXHJcblx0XHQnY29sb3InOiAnaW5oZXJpdCcsIC8vIEZJWE1FXHJcblx0XHQnZGlzcGxheSc6ICdibG9jaycsXHJcblx0XHQnaGVpZ2h0JzogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0J2xpbmVIZWlnaHQnOiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0J3BhZGRpbmcnOiBgMCAke3RoZW1lLmlucHV0LnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHQndHJhbnNpdGlvbic6ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0J3dpZHRoJzogJzEwMCUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuaG92ZXIsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5mb2N1cyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQnRm9ybUlucHV0LS1kaXNhYmxlZCc6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kaXNhYmxlZCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzaXplc1xyXG5cdCdGb3JtSW5wdXRfX3NpemUtLXNtYWxsJzoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHR9LFxyXG5cdCdGb3JtSW5wdXRfX3NpemUtLWxhcmdlJzoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5sYXJnZSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBGb3JtTGFiZWwgKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNyb3BUZXh0LFxyXG5cdGh0bWxGb3IsXHJcblx0Li4ucHJvcHNcclxufSxcclxue1xyXG5cdGZvcm1GaWVsZElkLFxyXG5cdGZvcm1MYXlvdXQsXHJcblx0bGFiZWxXaWR0aCxcclxufSkge1xyXG5cdHByb3BzLmh0bWxGb3IgPSBodG1sRm9yIHx8IGZvcm1GaWVsZElkO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuRm9ybUxhYmVsLFxyXG5cdFx0Zm9ybUxheW91dCA/IGNsYXNzZXNbJ0Zvcm1MYWJlbC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdIDogbnVsbCxcclxuXHRcdGNyb3BUZXh0ID8gY2xhc3Nlc1snRm9ybUxhYmVsLS1jcm9wLXRleHQnXSA6IG51bGwsXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblx0aWYgKGxhYmVsV2lkdGgpIHtcclxuXHRcdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0XHR3aWR0aDogbGFiZWxXaWR0aCxcclxuXHRcdFx0Li4ucHJvcHMuc3R5bGUsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUxhYmVsLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Gb3JtTGFiZWwuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2xhYmVsJyxcclxufTtcclxuRm9ybUxhYmVsLmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtTGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYWJlbFdpZHRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTGFiZWw7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIExhYmVsXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtTGFiZWwnOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuZm9ybS5sYWJlbC5jb2xvcixcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb3JtLmxhYmVsLmZvbnRTaXplLFxyXG5cdFx0Zm9udFdlaWdodDogdGhlbWUuZm9ybS5sYWJlbC5mb250V2VpZ2h0LFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Cb3R0b206ICcwLjVlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYSBob3Jpem9udGFsIGZvcm1cclxuXHJcblx0J0Zvcm1MYWJlbC0tZm9ybS1sYXlvdXQtaG9yaXpvbnRhbCc6IHtcclxuXHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdGRpc3BsYXk6ICd0YWJsZS1jZWxsJyxcclxuXHRcdFx0bGluZUhlaWdodDogdGhlbWUuY29tcG9uZW50LmxpbmVIZWlnaHQsIC8vIGZpeFxyXG5cdFx0XHRtYXJnaW5Cb3R0b206IDAsXHJcblx0XHRcdHBhZGRpbmdSaWdodDogNSxcclxuXHRcdFx0dmVydGljYWxBbGlnbjogJ3RvcCcsXHJcblx0XHRcdHdpZHRoOiB0aGVtZS5mb3JtLmxhYmVsLndpZHRoLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBjcm9wIGxvbmcgdGV4dFxyXG5cclxuXHQnRm9ybUxhYmVsLS1jcm9wLXRleHQnOiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBGb3JtTm90ZSAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjaGlsZHJlbixcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRodG1sLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5ub3RlLCBjbGFzc05hbWUpO1xyXG5cclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgaHRtbCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogRm9ybU5vdGUgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgaHRtbGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBodG1sID8gKFxyXG5cdFx0PENvbXBvbmVudCB7Li4ucHJvcHN9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogaHRtbCB9fSAvPlxyXG5cdCkgOiAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30+e2NoaWxkcmVufTwvQ29tcG9uZW50PlxyXG5cdCk7XHJcbn07XHJcbkZvcm1Ob3RlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGh0bWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1Ob3RlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTm90ZTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gTm90ZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRub3RlOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuZm9ybS5ub3RlLmNvbG9yLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvcm0ubm90ZS5mb250U2l6ZSxcclxuXHRcdG1hcmdpblRvcDogdGhlbWUuc3BhY2luZy5zbWFsbCxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5jbGFzcyBGb3JtU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgaWQsIG9wdGlvbnMsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyBmb3JtRmllbGRJZCB9ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5zZWxlY3QsXHJcblx0XHRcdHByb3BzLmRpc2FibGVkID8gY2xhc3Nlc1snc2VsZWN0LS1kaXNhYmxlZCddIDogbnVsbFxyXG5cdFx0KTtcclxuXHRcdHByb3BzLmlkID0gaWQgfHwgZm9ybUZpZWxkSWQ7XHJcblxyXG5cdFx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0XHRpZiAob3B0aW9ucyAmJiBjaGlsZHJlbikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBGb3JtU2VsZWN0IGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYG9wdGlvbnNgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9PlxyXG5cdFx0XHRcdHtvcHRpb25zID8gKFxyXG5cdFx0XHRcdFx0PHNlbGVjdCB7Li4ucHJvcHN9PntvcHRpb25zLm1hcChvcHQgPT4gKFxyXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17b3B0LnZhbHVlfSB2YWx1ZT17b3B0LnZhbHVlfT5cclxuXHRcdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0XHQ8L29wdGlvbj5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9zZWxlY3Q+XHJcblx0XHRcdFx0KSA6IDxzZWxlY3Qgey4uLnByb3BzfT57Y2hpbGRyZW59PC9zZWxlY3Q+fVxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3dzLCBwcm9wcy5kaXNhYmxlZCA/IGNsYXNzZXNbJ2Fycm93cy0tZGlzYWJsZWQnXSA6IG51bGwpfT5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3csIGNsYXNzZXMuYXJyb3dUb3ApfSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlcy5hcnJvd0JvdHRvbSl9IC8+XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuRm9ybVNlbGVjdC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbkZvcm1TZWxlY3QucHJvcFR5cGVzID0ge1xyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0fSlcclxuXHQpLFxyXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtU2VsZWN0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBTZWxlY3RcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBkYXJrZW4sIGxpZ2h0ZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlbGVjdCBub2RlXHJcblx0c2VsZWN0OiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGVmYXVsdCxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyQm90dG9tQ29sb3I6IGRhcmtlbih0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCwgNCksXHJcblx0XHRib3JkZXJUb3BDb2xvcjogbGlnaHRlbih0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdCwgNCksXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHRib3JkZXJTdHlsZTogJ3NvbGlkJyxcclxuXHRcdGJvcmRlcldpZHRoOiB0aGVtZS5pbnB1dC5ib3JkZXIud2lkdGgsXHJcblx0XHRib3hTaGFkb3c6IHRoZW1lLnNlbGVjdC5ib3hTaGFkb3csXHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLCAvLyBGSVhNRVxyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHRcdHBhZGRpbmc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdHRyYW5zaXRpb246ICdib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgMC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgMC4xNXMnLFxyXG5cdFx0d2lkdGg6ICcxMDAlJyxcclxuXHJcblx0XHQnOmhvdmVyJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmhvdmVyLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZm9jdXMsXHJcblx0XHRcdGJveFNoYWRvdzogdGhlbWUuaW5wdXQuYm94U2hhZG93Rm9jdXMsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0J3NlbGVjdC0tZGlzYWJsZWQnOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmlucHV0LmJhY2tncm91bmQuZGlzYWJsZWQsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gYXJyb3dzXHJcblx0YXJyb3dzOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHJpZ2h0OiAwLFxyXG5cdFx0dG9wOiAwLFxyXG5cdFx0d2lkdGg6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHR9LFxyXG5cdGFycm93OiB7XHJcblx0XHRib3JkZXJMZWZ0OiAnMC4zZW0gc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmlnaHQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogMCxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHR6SW5kZXg6IDEsXHJcblx0fSxcclxuXHRhcnJvd1RvcDoge1xyXG5cdFx0Ym9yZGVyQm90dG9tOiAnMC4zZW0gc29saWQnLFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMC4xZW0nLFxyXG5cdH0sXHJcblx0YXJyb3dCb3R0b206IHtcclxuXHRcdGJvcmRlclRvcDogJzAuM2VtIHNvbGlkJyxcclxuXHRcdG1hcmdpblRvcDogJzAuMWVtJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtTGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCxcclxuXHRcdFx0bGFiZWxXaWR0aDogdGhpcy5wcm9wcy5sYWJlbFdpZHRoLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdC8vIE5PVEUgYGxhYmVsV2lkdGhgIGlzIGRlY2xhcmVkIHRvIHJlbW92ZSBpdCBmcm9tIGBwcm9wc2AsIHRob3VnaCBuZXZlciB1c2VkXHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0XHRcdGxhYmVsV2lkdGgsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuXHRcdFx0bGF5b3V0LFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm0sXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1fXycgKyBsYXlvdXRdLFxyXG5cdFx0XHRjbGFzc05hbWVcclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5Gb3JtLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkZvcm0ucHJvcFR5cGVzID0ge1xyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0bGF5b3V0OiBQcm9wVHlwZXMub25lT2YoWydiYXNpYycsICdob3Jpem9udGFsJywgJ2lubGluZSddKSxcclxufTtcclxuRm9ybS5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZm9ybScsXHJcblx0bGF5b3V0OiAnYmFzaWMnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdEZvcm06IHt9LFxyXG59O1xyXG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBHbHlwaCBmcm9tICcuLi9HbHlwaCc7XHJcblxyXG5mdW5jdGlvbiBHbHlwaEJ1dHRvbiAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGdseXBoLFxyXG5cdGdseXBoQ29sb3IsXHJcblx0Z2x5cGhTaXplLFxyXG5cdGdseXBoU3R5bGUsXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGlzRGVmYXVsdCA9IHBvc2l0aW9uID09PSAnZGVmYXVsdCc7XHJcblx0Y29uc3QgaXNMZWZ0ID0gcG9zaXRpb24gPT09ICdsZWZ0JztcclxuXHRjb25zdCBpc1JpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCc7XHJcblxyXG5cdGNvbnN0IG9mZnNldCA9IHt9O1xyXG5cdGlmIChpc0xlZnQpIG9mZnNldC5tYXJnaW5SaWdodCA9ICcwLjVlbSc7XHJcblx0aWYgKGlzUmlnaHQpIG9mZnNldC5tYXJnaW5MZWZ0ID0gJzAuNWVtJztcclxuXHJcblx0Y29uc3QgZ2x5cGhTdHlsZXMgPSB7XHJcblx0XHQuLi5vZmZzZXQsXHJcblx0XHQuLi5nbHlwaFN0eWxlLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGljb24gPSAoXHJcblx0XHQ8R2x5cGhcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmdseXBofVxyXG5cdFx0XHRjb2xvcj17Z2x5cGhDb2xvcn1cclxuXHRcdFx0bmFtZT17Z2x5cGh9XHJcblx0XHRcdHNpemU9e2dseXBoU2l6ZX1cclxuXHRcdFx0c3R5bGU9e2dseXBoU3R5bGVzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7KGlzRGVmYXVsdCB8fCBpc0xlZnQpICYmIGljb259XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0e2lzUmlnaHQgJiYgaWNvbn1cclxuXHRcdDwvQnV0dG9uPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBGb3IgcHJvcHMgXCJnbHlwaFwiLCBcImdseXBoQ29sb3JcIiwgYW5kIFwiZ2x5cGhTaXplXCI6XHJcbi8vIHByb3AgdHlwZSB2YWxpZGF0aW9uIHdpbGwgb2NjdXIgd2l0aGluIHRoZSBHbHlwaCBjb21wb25lbnQsIG5vIG5lZWQgdG9cclxuLy8gZHVwbGljYXRlLCBqdXN0IHBhc3MgaXQgdGhyb3VnaC5cclxuR2x5cGhCdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGdseXBoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2RlZmF1bHQnLCAnbGVmdCcsICdyaWdodCddKSxcclxufTtcclxuR2x5cGhCdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGdseXBoU3R5bGU6IHt9LFxyXG5cdHBvc2l0aW9uOiAnZGVmYXVsdCcsIC8vIG5vIG1hcmdpbiwgYXNzdW1lcyBubyBjaGlsZHJlblxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRnbHlwaDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIGZpeCBpY29uIGFsaWdubWVudFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGhCdXR0b247XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuLi9Gb3JtRmllbGQnO1xyXG5pbXBvcnQgR2x5cGggZnJvbSAnLi4vR2x5cGgnO1xyXG5cclxuZnVuY3Rpb24gR2x5cGhGaWVsZCAoe1xyXG5cdGNoaWxkcmVuLFxyXG5cdGdseXBoLFxyXG5cdGdseXBoQ29sb3IsXHJcblx0Z2x5cGhTaXplLFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBpc0xlZnQgPSBwb3NpdGlvbiA9PT0gJ2xlZnQnO1xyXG5cdGNvbnN0IGlzUmlnaHQgPSBwb3NpdGlvbiA9PT0gJ3JpZ2h0JztcclxuXHJcblx0Y29uc3QgZ2x5cGhTdHlsZXMgPSB7fTtcclxuXHRpZiAoaXNMZWZ0KSBnbHlwaFN0eWxlcy5tYXJnaW5SaWdodCA9ICcwLjVlbSc7XHJcblx0aWYgKGlzUmlnaHQpIGdseXBoU3R5bGVzLm1hcmdpbkxlZnQgPSAnMC41ZW0nO1xyXG5cclxuXHRjb25zdCBpY29uID0gKFxyXG5cdFx0PEdseXBoXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5nbHlwaH1cclxuXHRcdFx0Y29sb3I9e2dseXBoQ29sb3J9XHJcblx0XHRcdG5hbWU9e2dseXBofVxyXG5cdFx0XHRzaXplPXtnbHlwaFNpemV9XHJcblx0XHRcdHN0eWxlPXtnbHlwaFN0eWxlc31cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxGaWVsZCBhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMud3JhcHBlcn0gey4uLnByb3BzfT5cclxuXHRcdFx0e2lzTGVmdCAmJiBpY29ufVxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdHtpc1JpZ2h0ICYmIGljb259XHJcblx0XHQ8L0ZpZWxkPlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBGb3IgcHJvcHMgXCJnbHlwaFwiLCBcImdseXBoQ29sb3JcIiwgYW5kIFwiZ2x5cGhTaXplXCI6XHJcbi8vIHByb3AgdHlwZSB2YWxpZGF0aW9uIHdpbGwgb2NjdXIgd2l0aGluIHRoZSBHbHlwaCBjb21wb25lbnQsIG5vIG5lZWQgdG9cclxuLy8gZHVwbGljYXRlLCBqdXN0IHBhc3MgaXQgdGhyb3VnaC5cclxuR2x5cGhGaWVsZC5wcm9wVHlwZXMgPSB7XHJcblx0Z2x5cGg6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXHJcbn07XHJcbkdseXBoRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG5cdHBvc2l0aW9uOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHdyYXBwZXI6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdH0sXHJcblx0Z2x5cGg6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bWFyZ2luVG9wOiAnLTAuMTI1ZW0nLCAvLyBmaXggaWNvbiBhbGlnbm1lbnRcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdseXBoRmllbGQ7XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmdseXBoLmNvbG9yLmRhbmdlcixcclxuXHRpbmhlcml0OiB0aGVtZS5nbHlwaC5jb2xvci5pbmhlcml0LFxyXG5cdGludmVydGVkOiB0aGVtZS5nbHlwaC5jb2xvci5pbnZlcnRlZCxcclxuXHRwcmltYXJ5OiB0aGVtZS5nbHlwaC5jb2xvci5wcmltYXJ5LFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmdseXBoLmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuZ2x5cGguY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBvY3RpY29ucyBmcm9tICcuL29jdGljb25zJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuLy8gRklYTUUgc3RhdGljIG9jdGljb24gY2xhc3NlcyBsZWFuaW5nIG9uIEVsZW1lbnRhbCB0byBhdm9pZCBkdXBsaWNhdGVcclxuLy8gZm9udCBhbmQgQ1NTOyBpbmZsYXRpbmcgdGhlIHByb2plY3Qgc2l6ZVxyXG5cclxuZnVuY3Rpb24gR2x5cGggKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbG9yLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdG5hbWUsXHJcblx0c2l6ZSxcclxuXHRzdHlsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgY29sb3JJc1ZhbGlkVHlwZSA9IE9iamVjdC5rZXlzKGNvbG9ycykuaW5jbHVkZXMoY29sb3IpO1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuZ2x5cGgsXHJcblx0XHRjb2xvcklzVmFsaWRUeXBlICYmIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLFxyXG5cdFx0Y2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLFxyXG5cdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0KSArIGAgJHtvY3RpY29uc1tuYW1lXX1gO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8vIHN1cHBvcnQgcmFuZG9tIGNvbG9yIHN0cmluZ3NcclxuXHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdGNvbG9yOiAhY29sb3JJc1ZhbGlkVHlwZSA/IGNvbG9yIDogbnVsbCxcclxuXHRcdC4uLnN0eWxlLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5HbHlwaC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSxcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSksXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLCAvLyBzdXBwb3J0IHJhbmRvbSBjb2xvciBzdHJpbmdzXHJcblx0XSksXHJcblx0bmFtZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKG9jdGljb25zKSkuaXNSZXF1aXJlZCxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoc2l6ZXMpKSxcclxufTtcclxuR2x5cGguZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2knLFxyXG5cdGNvbG9yOiAnaW5oZXJpdCcsXHJcblx0c2l6ZTogJ3NtYWxsJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGg7XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFsZXJ0OiAnb2N0aWNvbiBvY3RpY29uLWFsZXJ0JyxcclxuXHQnYXJyb3ctZG93bic6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctZG93bicsXHJcblx0J2Fycm93LWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LWxlZnQnLFxyXG5cdCdhcnJvdy1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctcmlnaHQnLFxyXG5cdCdhcnJvdy1zbWFsbC1kb3duJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1kb3duJyxcclxuXHQnYXJyb3ctc21hbGwtbGVmdCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctc21hbGwtbGVmdCcsXHJcblx0J2Fycm93LXNtYWxsLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1yaWdodCcsXHJcblx0J2Fycm93LXNtYWxsLXVwJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC11cCcsXHJcblx0J2Fycm93LXVwJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy11cCcsXHJcblx0bWljcm9zY29wZTogJ29jdGljb24gb2N0aWNvbi1taWNyb3Njb3BlJyxcclxuXHRiZWFrZXI6ICdvY3RpY29uIG9jdGljb24tYmVha2VyJyxcclxuXHRiZWxsOiAnb2N0aWNvbiBvY3RpY29uLWJlbGwnLFxyXG5cdGJvb2s6ICdvY3RpY29uIG9jdGljb24tYm9vaycsXHJcblx0Ym9va21hcms6ICdvY3RpY29uIG9jdGljb24tYm9va21hcmsnLFxyXG5cdGJyaWVmY2FzZTogJ29jdGljb24gb2N0aWNvbi1icmllZmNhc2UnLFxyXG5cdGJyb2FkY2FzdDogJ29jdGljb24gb2N0aWNvbi1icm9hZGNhc3QnLFxyXG5cdGJyb3dzZXI6ICdvY3RpY29uIG9jdGljb24tYnJvd3NlcicsXHJcblx0YnVnOiAnb2N0aWNvbiBvY3RpY29uLWJ1ZycsXHJcblx0Y2FsZW5kYXI6ICdvY3RpY29uIG9jdGljb24tY2FsZW5kYXInLFxyXG5cdGNoZWNrOiAnb2N0aWNvbiBvY3RpY29uLWNoZWNrJyxcclxuXHRjaGVja2xpc3Q6ICdvY3RpY29uIG9jdGljb24tY2hlY2tsaXN0JyxcclxuXHQnY2hldnJvbi1kb3duJzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLWRvd24nLFxyXG5cdCdjaGV2cm9uLWxlZnQnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tbGVmdCcsXHJcblx0J2NoZXZyb24tcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tcmlnaHQnLFxyXG5cdCdjaGV2cm9uLXVwJzogJ29jdGljb24gb2N0aWNvbi1jaGV2cm9uLXVwJyxcclxuXHQnY2lyY2xlLXNsYXNoJzogJ29jdGljb24gb2N0aWNvbi1jaXJjbGUtc2xhc2gnLFxyXG5cdCdjaXJjdWl0LWJvYXJkJzogJ29jdGljb24gb2N0aWNvbi1jaXJjdWl0LWJvYXJkJyxcclxuXHRjbGlwcHk6ICdvY3RpY29uIG9jdGljb24tY2xpcHB5JyxcclxuXHRjbG9jazogJ29jdGljb24gb2N0aWNvbi1jbG9jaycsXHJcblx0J2Nsb3VkLWRvd25sb2FkJzogJ29jdGljb24gb2N0aWNvbi1jbG91ZC1kb3dubG9hZCcsXHJcblx0J2Nsb3VkLXVwbG9hZCc6ICdvY3RpY29uIG9jdGljb24tY2xvdWQtdXBsb2FkJyxcclxuXHRjb2RlOiAnb2N0aWNvbiBvY3RpY29uLWNvZGUnLFxyXG5cdCdjb2xvci1tb2RlJzogJ29jdGljb24gb2N0aWNvbi1jb2xvci1tb2RlJyxcclxuXHQnY29tbWVudC1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQtYWRkJyxcclxuXHRjb21tZW50OiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQnLFxyXG5cdCdjb21tZW50LWRpc2N1c3Npb24nOiAnb2N0aWNvbiBvY3RpY29uLWNvbW1lbnQtZGlzY3Vzc2lvbicsXHJcblx0J2NyZWRpdC1jYXJkJzogJ29jdGljb24gb2N0aWNvbi1jcmVkaXQtY2FyZCcsXHJcblx0ZGFzaDogJ29jdGljb24gb2N0aWNvbi1kYXNoJyxcclxuXHRkYXNoYm9hcmQ6ICdvY3RpY29uIG9jdGljb24tZGFzaGJvYXJkJyxcclxuXHRkYXRhYmFzZTogJ29jdGljb24gb2N0aWNvbi1kYXRhYmFzZScsXHJcblx0Y2xvbmU6ICdvY3RpY29uIG9jdGljb24tY2xvbmUnLFxyXG5cdCdkZXNrdG9wLWRvd25sb2FkJzogJ29jdGljb24gb2N0aWNvbi1kZXNrdG9wLWRvd25sb2FkJyxcclxuXHQnZGV2aWNlLWNhbWVyYSc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWNhbWVyYScsXHJcblx0J2RldmljZS1jYW1lcmEtdmlkZW8nOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1jYW1lcmEtdmlkZW8nLFxyXG5cdCdkZXZpY2UtZGVza3RvcCc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWRlc2t0b3AnLFxyXG5cdCdkZXZpY2UtbW9iaWxlJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtbW9iaWxlJyxcclxuXHRkaWZmOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYnLFxyXG5cdCdkaWZmLWFkZGVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLWFkZGVkJyxcclxuXHQnZGlmZi1pZ25vcmVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLWlnbm9yZWQnLFxyXG5cdCdkaWZmLW1vZGlmaWVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLW1vZGlmaWVkJyxcclxuXHQnZGlmZi1yZW1vdmVkJzogJ29jdGljb24gb2N0aWNvbi1kaWZmLXJlbW92ZWQnLFxyXG5cdCdkaWZmLXJlbmFtZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtcmVuYW1lZCcsXHJcblx0ZWxsaXBzaXM6ICdvY3RpY29uIG9jdGljb24tZWxsaXBzaXMnLFxyXG5cdCdleWUtdW53YXRjaCc6ICdvY3RpY29uIG9jdGljb24tZXllLXVud2F0Y2gnLFxyXG5cdCdleWUtd2F0Y2gnOiAnb2N0aWNvbiBvY3RpY29uLWV5ZS13YXRjaCcsXHJcblx0ZXllOiAnb2N0aWNvbiBvY3RpY29uLWV5ZScsXHJcblx0J2ZpbGUtYmluYXJ5JzogJ29jdGljb24gb2N0aWNvbi1maWxlLWJpbmFyeScsXHJcblx0J2ZpbGUtY29kZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1jb2RlJyxcclxuXHQnZmlsZS1kaXJlY3RvcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtZGlyZWN0b3J5JyxcclxuXHQnZmlsZS1tZWRpYSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1tZWRpYScsXHJcblx0J2ZpbGUtcGRmJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXBkZicsXHJcblx0J2ZpbGUtc3VibW9kdWxlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN1Ym1vZHVsZScsXHJcblx0J2ZpbGUtc3ltbGluay1kaXJlY3RvcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3ltbGluay1kaXJlY3RvcnknLFxyXG5cdCdmaWxlLXN5bWxpbmstZmlsZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zeW1saW5rLWZpbGUnLFxyXG5cdCdmaWxlLXRleHQnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtdGV4dCcsXHJcblx0J2ZpbGUtemlwJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXppcCcsXHJcblx0ZmxhbWU6ICdvY3RpY29uIG9jdGljb24tZmxhbWUnLFxyXG5cdGZvbGQ6ICdvY3RpY29uIG9jdGljb24tZm9sZCcsXHJcblx0Z2VhcjogJ29jdGljb24gb2N0aWNvbi1nZWFyJyxcclxuXHRnaWZ0OiAnb2N0aWNvbiBvY3RpY29uLWdpZnQnLFxyXG5cdGdpc3Q6ICdvY3RpY29uIG9jdGljb24tZ2lzdCcsXHJcblx0J2dpc3Qtc2VjcmV0JzogJ29jdGljb24gb2N0aWNvbi1naXN0LXNlY3JldCcsXHJcblx0J2dpdC1icmFuY2gtY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoLWNyZWF0ZScsXHJcblx0J2dpdC1icmFuY2gtZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoLWRlbGV0ZScsXHJcblx0J2dpdC1icmFuY2gnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gnLFxyXG5cdCdnaXQtY29tbWl0JzogJ29jdGljb24gb2N0aWNvbi1naXQtY29tbWl0JyxcclxuXHQnZ2l0LWNvbXBhcmUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1jb21wYXJlJyxcclxuXHQnZ2l0LW1lcmdlJzogJ29jdGljb24gb2N0aWNvbi1naXQtbWVyZ2UnLFxyXG5cdCdnaXQtcHVsbC1yZXF1ZXN0LWFiYW5kb25lZCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LXB1bGwtcmVxdWVzdC1hYmFuZG9uZWQnLFxyXG5cdCdnaXQtcHVsbC1yZXF1ZXN0JzogJ29jdGljb24gb2N0aWNvbi1naXQtcHVsbC1yZXF1ZXN0JyxcclxuXHRnbG9iZTogJ29jdGljb24gb2N0aWNvbi1nbG9iZScsXHJcblx0Z3JhcGg6ICdvY3RpY29uIG9jdGljb24tZ3JhcGgnLFxyXG5cdGhlYXJ0OiAnb2N0aWNvbiBvY3RpY29uLWhlYXJ0JyxcclxuXHRoaXN0b3J5OiAnb2N0aWNvbiBvY3RpY29uLWhpc3RvcnknLFxyXG5cdGhvbWU6ICdvY3RpY29uIG9jdGljb24taG9tZScsXHJcblx0J2hvcml6b250YWwtcnVsZSc6ICdvY3RpY29uIG9jdGljb24taG9yaXpvbnRhbC1ydWxlJyxcclxuXHRodWJvdDogJ29jdGljb24gb2N0aWNvbi1odWJvdCcsXHJcblx0aW5ib3g6ICdvY3RpY29uIG9jdGljb24taW5ib3gnLFxyXG5cdGluZm86ICdvY3RpY29uIG9jdGljb24taW5mbycsXHJcblx0J2lzc3VlLWNsb3NlZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtY2xvc2VkJyxcclxuXHQnaXNzdWUtb3BlbmVkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1vcGVuZWQnLFxyXG5cdCdpc3N1ZS1yZW9wZW5lZCc6ICdvY3RpY29uIG9jdGljb24taXNzdWUtcmVvcGVuZWQnLFxyXG5cdGplcnNleTogJ29jdGljb24gb2N0aWNvbi1qZXJzZXknLFxyXG5cdGtleTogJ29jdGljb24gb2N0aWNvbi1rZXknLFxyXG5cdGtleWJvYXJkOiAnb2N0aWNvbiBvY3RpY29uLWtleWJvYXJkJyxcclxuXHRsYXc6ICdvY3RpY29uIG9jdGljb24tbGF3JyxcclxuXHQnbGlnaHQtYnVsYic6ICdvY3RpY29uIG9jdGljb24tbGlnaHQtYnVsYicsXHJcblx0bGluazogJ29jdGljb24gb2N0aWNvbi1saW5rJyxcclxuXHQnbGluay1leHRlcm5hbCc6ICdvY3RpY29uIG9jdGljb24tbGluay1leHRlcm5hbCcsXHJcblx0J2xpc3Qtb3JkZXJlZCc6ICdvY3RpY29uIG9jdGljb24tbGlzdC1vcmRlcmVkJyxcclxuXHQnbGlzdC11bm9yZGVyZWQnOiAnb2N0aWNvbiBvY3RpY29uLWxpc3QtdW5vcmRlcmVkJyxcclxuXHRsb2NhdGlvbjogJ29jdGljb24gb2N0aWNvbi1sb2NhdGlvbicsXHJcblx0J2dpc3QtcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2lzdC1wcml2YXRlJyxcclxuXHQnbWlycm9yLXByaXZhdGUnOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvci1wcml2YXRlJyxcclxuXHQnZ2l0LWZvcmstcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWZvcmstcHJpdmF0ZScsXHJcblx0bG9jazogJ29jdGljb24gb2N0aWNvbi1sb2NrJyxcclxuXHQnbG9nby1naXRodWInOiAnb2N0aWNvbiBvY3RpY29uLWxvZ28tZ2l0aHViJyxcclxuXHRtYWlsOiAnb2N0aWNvbiBvY3RpY29uLW1haWwnLFxyXG5cdCdtYWlsLXJlYWQnOiAnb2N0aWNvbiBvY3RpY29uLW1haWwtcmVhZCcsXHJcblx0J21haWwtcmVwbHknOiAnb2N0aWNvbiBvY3RpY29uLW1haWwtcmVwbHknLFxyXG5cdCdtYXJrLWdpdGh1Yic6ICdvY3RpY29uIG9jdGljb24tbWFyay1naXRodWInLFxyXG5cdG1hcmtkb3duOiAnb2N0aWNvbiBvY3RpY29uLW1hcmtkb3duJyxcclxuXHRtZWdhcGhvbmU6ICdvY3RpY29uIG9jdGljb24tbWVnYXBob25lJyxcclxuXHRtZW50aW9uOiAnb2N0aWNvbiBvY3RpY29uLW1lbnRpb24nLFxyXG5cdG1pbGVzdG9uZTogJ29jdGljb24gb2N0aWNvbi1taWxlc3RvbmUnLFxyXG5cdCdtaXJyb3ItcHVibGljJzogJ29jdGljb24gb2N0aWNvbi1taXJyb3ItcHVibGljJyxcclxuXHRtaXJyb3I6ICdvY3RpY29uIG9jdGljb24tbWlycm9yJyxcclxuXHQnbW9ydGFyLWJvYXJkJzogJ29jdGljb24gb2N0aWNvbi1tb3J0YXItYm9hcmQnLFxyXG5cdG11dGU6ICdvY3RpY29uIG9jdGljb24tbXV0ZScsXHJcblx0J25vLW5ld2xpbmUnOiAnb2N0aWNvbiBvY3RpY29uLW5vLW5ld2xpbmUnLFxyXG5cdG9jdG9mYWNlOiAnb2N0aWNvbiBvY3RpY29uLW9jdG9mYWNlJyxcclxuXHRvcmdhbml6YXRpb246ICdvY3RpY29uIG9jdGljb24tb3JnYW5pemF0aW9uJyxcclxuXHRwYWNrYWdlOiAnb2N0aWNvbiBvY3RpY29uLXBhY2thZ2UnLFxyXG5cdHBhaW50Y2FuOiAnb2N0aWNvbiBvY3RpY29uLXBhaW50Y2FuJyxcclxuXHRwZW5jaWw6ICdvY3RpY29uIG9jdGljb24tcGVuY2lsJyxcclxuXHQncGVyc29uLWFkZCc6ICdvY3RpY29uIG9jdGljb24tcGVyc29uLWFkZCcsXHJcblx0J3BlcnNvbi1mb2xsb3cnOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbi1mb2xsb3cnLFxyXG5cdHBlcnNvbjogJ29jdGljb24gb2N0aWNvbi1wZXJzb24nLFxyXG5cdHBpbjogJ29jdGljb24gb2N0aWNvbi1waW4nLFxyXG5cdHBsdWc6ICdvY3RpY29uIG9jdGljb24tcGx1ZycsXHJcblx0J3JlcG8tY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWNyZWF0ZScsXHJcblx0J2dpc3QtbmV3JzogJ29jdGljb24gb2N0aWNvbi1naXN0LW5ldycsXHJcblx0J2ZpbGUtZGlyZWN0b3J5LWNyZWF0ZSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1kaXJlY3RvcnktY3JlYXRlJyxcclxuXHQnZmlsZS1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtYWRkJyxcclxuXHRwbHVzOiAnb2N0aWNvbiBvY3RpY29uLXBsdXMnLFxyXG5cdCdwcmltaXRpdmUtZG90JzogJ29jdGljb24gb2N0aWNvbi1wcmltaXRpdmUtZG90JyxcclxuXHQncHJpbWl0aXZlLXNxdWFyZSc6ICdvY3RpY29uIG9jdGljb24tcHJpbWl0aXZlLXNxdWFyZScsXHJcblx0cHVsc2U6ICdvY3RpY29uIG9jdGljb24tcHVsc2UnLFxyXG5cdHF1ZXN0aW9uOiAnb2N0aWNvbiBvY3RpY29uLXF1ZXN0aW9uJyxcclxuXHRxdW90ZTogJ29jdGljb24gb2N0aWNvbi1xdW90ZScsXHJcblx0J3JhZGlvLXRvd2VyJzogJ29jdGljb24gb2N0aWNvbi1yYWRpby10b3dlcicsXHJcblx0J3JlcG8tZGVsZXRlJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWRlbGV0ZScsXHJcblx0cmVwbzogJ29jdGljb24gb2N0aWNvbi1yZXBvJyxcclxuXHQncmVwby1jbG9uZSc6ICdvY3RpY29uIG9jdGljb24tcmVwby1jbG9uZScsXHJcblx0J3JlcG8tZm9yY2UtcHVzaCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1mb3JjZS1wdXNoJyxcclxuXHQnZ2lzdC1mb3JrJzogJ29jdGljb24gb2N0aWNvbi1naXN0LWZvcmsnLFxyXG5cdCdyZXBvLWZvcmtlZCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1mb3JrZWQnLFxyXG5cdCdyZXBvLXB1bGwnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tcHVsbCcsXHJcblx0J3JlcG8tcHVzaCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1wdXNoJyxcclxuXHRyb2NrZXQ6ICdvY3RpY29uIG9jdGljb24tcm9ja2V0JyxcclxuXHRyc3M6ICdvY3RpY29uIG9jdGljb24tcnNzJyxcclxuXHRydWJ5OiAnb2N0aWNvbiBvY3RpY29uLXJ1YnknLFxyXG5cdCdzY3JlZW4tZnVsbCc6ICdvY3RpY29uIG9jdGljb24tc2NyZWVuLWZ1bGwnLFxyXG5cdCdzY3JlZW4tbm9ybWFsJzogJ29jdGljb24gb2N0aWNvbi1zY3JlZW4tbm9ybWFsJyxcclxuXHQnc2VhcmNoLXNhdmUnOiAnb2N0aWNvbiBvY3RpY29uLXNlYXJjaC1zYXZlJyxcclxuXHRzZWFyY2g6ICdvY3RpY29uIG9jdGljb24tc2VhcmNoJyxcclxuXHRzZXJ2ZXI6ICdvY3RpY29uIG9jdGljb24tc2VydmVyJyxcclxuXHRzZXR0aW5nczogJ29jdGljb24gb2N0aWNvbi1zZXR0aW5ncycsXHJcblx0c2hpZWxkOiAnb2N0aWNvbiBvY3RpY29uLXNoaWVsZCcsXHJcblx0J2xvZy1pbic6ICdvY3RpY29uIG9jdGljb24tbG9nLWluJyxcclxuXHQnc2lnbi1pbic6ICdvY3RpY29uIG9jdGljb24tc2lnbi1pbicsXHJcblx0J2xvZy1vdXQnOiAnb2N0aWNvbiBvY3RpY29uLWxvZy1vdXQnLFxyXG5cdCdzaWduLW91dCc6ICdvY3RpY29uIG9jdGljb24tc2lnbi1vdXQnLFxyXG5cdHNxdWlycmVsOiAnb2N0aWNvbiBvY3RpY29uLXNxdWlycmVsJyxcclxuXHQnc3Rhci1hZGQnOiAnb2N0aWNvbiBvY3RpY29uLXN0YXItYWRkJyxcclxuXHQnc3Rhci1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLXN0YXItZGVsZXRlJyxcclxuXHRzdGFyOiAnb2N0aWNvbiBvY3RpY29uLXN0YXInLFxyXG5cdHN0b3A6ICdvY3RpY29uIG9jdGljb24tc3RvcCcsXHJcblx0J3JlcG8tc3luYyc6ICdvY3RpY29uIG9jdGljb24tcmVwby1zeW5jJyxcclxuXHRzeW5jOiAnb2N0aWNvbiBvY3RpY29uLXN5bmMnLFxyXG5cdCd0YWctcmVtb3ZlJzogJ29jdGljb24gb2N0aWNvbi10YWctcmVtb3ZlJyxcclxuXHQndGFnLWFkZCc6ICdvY3RpY29uIG9jdGljb24tdGFnLWFkZCcsXHJcblx0dGFnOiAnb2N0aWNvbiBvY3RpY29uLXRhZycsXHJcblx0dGVsZXNjb3BlOiAnb2N0aWNvbiBvY3RpY29uLXRlbGVzY29wZScsXHJcblx0dGVybWluYWw6ICdvY3RpY29uIG9jdGljb24tdGVybWluYWwnLFxyXG5cdCd0aHJlZS1iYXJzJzogJ29jdGljb24gb2N0aWNvbi10aHJlZS1iYXJzJyxcclxuXHR0aHVtYnNkb3duOiAnb2N0aWNvbiBvY3RpY29uLXRodW1ic2Rvd24nLFxyXG5cdHRodW1ic3VwOiAnb2N0aWNvbiBvY3RpY29uLXRodW1ic3VwJyxcclxuXHR0b29sczogJ29jdGljb24gb2N0aWNvbi10b29scycsXHJcblx0dHJhc2hjYW46ICdvY3RpY29uIG9jdGljb24tdHJhc2hjYW4nLFxyXG5cdCd0cmlhbmdsZS1kb3duJzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1kb3duJyxcclxuXHQndHJpYW5nbGUtbGVmdCc6ICdvY3RpY29uIG9jdGljb24tdHJpYW5nbGUtbGVmdCcsXHJcblx0J3RyaWFuZ2xlLXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1yaWdodCcsXHJcblx0J3RyaWFuZ2xlLXVwJzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS11cCcsXHJcblx0dW5mb2xkOiAnb2N0aWNvbiBvY3RpY29uLXVuZm9sZCcsXHJcblx0dW5tdXRlOiAnb2N0aWNvbiBvY3RpY29uLXVubXV0ZScsXHJcblx0dmVyc2lvbnM6ICdvY3RpY29uIG9jdGljb24tdmVyc2lvbnMnLFxyXG5cdHdhdGNoOiAnb2N0aWNvbiBvY3RpY29uLXdhdGNoJyxcclxuXHQncmVtb3ZlLWNsb3NlJzogJ29jdGljb24gb2N0aWNvbi1yZW1vdmUtY2xvc2UnLFxyXG5cdHg6ICdvY3RpY29uIG9jdGljb24teCcsXHJcblx0emFwOiAnb2N0aWNvbiBvY3RpY29uLXphcCcsXHJcbn07XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzbWFsbDogdGhlbWUuZ2x5cGguc2l6ZS5zbWFsbCxcclxuXHRtZWRpdW06IHRoZW1lLmdseXBoLnNpemUubWVkaXVtLFxyXG5cdGxhcmdlOiB0aGVtZS5nbHlwaC5zaXplLmxhcmdlLFxyXG59O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gR2x5cGhcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tgY29sb3JfXyR7Y29sb3J9YF0gPSB7XHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIFByZXBhcmUgc2l6ZXNcclxuY29uc3Qgc2l6ZVZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKHNpemVzKS5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHNpemVzW3NpemVdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Z2x5cGg6IHt9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY29uc3QgV0lEVEhTID0ge1xyXG5cdCdvbmUtd2hvbGUnOiAnMTAwJScsXHJcblx0J29uZS1oYWxmJzogJzUwJScsXHJcblx0J29uZS10aGlyZCc6ICczMy4zMyUnLFxyXG5cdCd0d28tdGhpcmRzJzogJzY2LjY2JScsXHJcblx0J29uZS1xdWFydGVyJzogJzI1JScsXHJcblx0J3RocmVlLXF1YXJ0ZXJzJzogJzc1JScsXHJcblxyXG5cdCdvbmUtZmlmdGgnOiAnMjAlJyxcclxuXHQndHdvLWZpZnRocyc6ICc0MCUnLFxyXG5cdCd0aHJlZS1maWZ0aHMnOiAnNjAlJyxcclxuXHQnZm91ci1maWZ0aHMnOiAnODAlJyxcclxuXHJcblx0J29uZS1zaXh0aCc6ICcxNi42NiUnLFxyXG5cdCdmaXZlLXNpeHRocyc6ICc4My4zMyUnLFxyXG59O1xyXG5cclxuY29uc3QgR3JpZENvbCA9IChwcm9wcywgY29udGV4dCkgPT4ge1xyXG5cdGNvbnN0IGd1dHRlciA9IHByb3BzLmd1dHRlciB8fCBjb250ZXh0Lmd1dHRlcjtcclxuXHRjb25zdCB4c21hbGwgPSBwcm9wcy54c21hbGwgfHwgY29udGV4dC54c21hbGw7XHJcblx0Y29uc3Qgc21hbGwgPSBwcm9wcy5zbWFsbCB8fCBjb250ZXh0LnNtYWxsO1xyXG5cdGNvbnN0IG1lZGl1bSA9IHByb3BzLm1lZGl1bSB8fCBjb250ZXh0Lm1lZGl1bTtcclxuXHRjb25zdCBsYXJnZSA9IHByb3BzLmxhcmdlIHx8IGNvbnRleHQubGFyZ2U7XHJcblxyXG5cdGNvbnN0IGNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXNbJ3hzbWFsbC0nICsgeHNtYWxsXSxcclxuXHRcdGNsYXNzZXNbJ3NtYWxsLScgKyBzbWFsbF0sXHJcblx0XHRjbGFzc2VzWydtZWRpdW0tJyArIG1lZGl1bV0sXHJcblx0XHRjbGFzc2VzWydsYXJnZS0nICsgbGFyZ2VdXHJcblx0KTtcclxuXHJcblx0Y29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSR7cHJvcHMuY2xhc3NOYW1lID8gKCcgJyArIHByb3BzLmNsYXNzTmFtZSkgOiAnJ31gO1xyXG5cdGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGd1dHRlciA/IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiBndXR0ZXIgLyAyLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiBndXR0ZXIgLyAyLFxyXG5cdH0gOiB7fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjb21wb25lbnRDbGFzc05hbWV9IHN0eWxlPXtjb21wb25lbnRTdHlsZXN9PlxyXG5cdFx0XHR7cHJvcHMuY2hpbGRyZW59XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuR3JpZENvbC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdGxhcmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR4c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkQ29sLnByb3BUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Li4ucHJlcGFyZVdpZHRocygneHNtYWxsJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdzbWFsbCcsIFdJRFRIUyksXHJcblx0Li4ucHJlcGFyZVdpZHRocygnbWVkaXVtJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdsYXJnZScsIFdJRFRIUyksXHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZVdpZHRocyAocHJlZml4LCBvYmopIHtcclxuXHRsZXQgY2xhc3NlcyA9IHt9O1xyXG5cdHN3aXRjaCAocHJlZml4KSB7XHJcblx0XHRjYXNlICdzbWFsbCc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRQb3J0cmFpdE1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ21lZGl1bSc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdsYXJnZSc6XHJcblx0XHRcdGZvciAobGV0IHByb3AgaW4gb2JqKSB7XHJcblx0XHRcdFx0Y2xhc3Nlc1twcmVmaXggKyAnLScgKyBwcm9wXSA9IHtcclxuXHRcdFx0XHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC5kZXNrdG9wTWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNsYXNzZXM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRDb2w7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmNsYXNzIEdyaWRSb3cgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRndXR0ZXI6IHRoaXMucHJvcHMuZ3V0dGVyLFxyXG5cdFx0XHR4c21hbGw6IHRoaXMucHJvcHMueHNtYWxsLFxyXG5cdFx0XHRzbWFsbDogdGhpcy5wcm9wcy5zbWFsbCxcclxuXHRcdFx0bWVkaXVtOiB0aGlzLnByb3BzLm1lZGl1bSxcclxuXHRcdFx0bGFyZ2U6IHRoaXMucHJvcHMubGFyZ2UsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBndXR0ZXIsIHN0eWxlcyA9IHt9IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGAke2NzcyhjbGFzc2VzLmdyaWQpfSR7Y2xhc3NOYW1lID8gKCcgJyArIGNsYXNzTmFtZSkgOiAnJ31gO1xyXG5cdFx0Y29uc3QgY29tcG9uZW50U3R5bGVzID0gT2JqZWN0LmFzc2lnbihzdHlsZXMsIHtcclxuXHRcdFx0bWFyZ2luTGVmdDogZ3V0dGVyIC8gLTIsXHJcblx0XHRcdG1hcmdpblJpZ2h0OiBndXR0ZXIgLyAtMixcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjb21wb25lbnRDbGFzc05hbWV9IHN0eWxlPXtjb21wb25lbnRTdHlsZXN9PlxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkdyaWRSb3cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5HcmlkUm93LnByb3BUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRSb3cuZGVmYXVsdFByb3BzID0ge1xyXG5cdGd1dHRlcjogMCxcclxuXHR4c21hbGw6ICdvbmUtd2hvbGUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRncmlkOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmbGV4V3JhcDogJ3dyYXAnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRSb3c7XHJcbiIsImltcG9ydCBDb2wgZnJvbSAnLi4vR3JpZENvbCc7XHJcbmltcG9ydCBSb3cgZnJvbSAnLi4vR3JpZFJvdyc7XHJcblxyXG5leHBvcnQgeyBDb2wsIFJvdyB9O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbi8vIE5PVEU6IElubGluZSBHcm91cCBTZWN0aW9uIGFjY2VwdHMgYSBzaW5nbGUgY2hpbGRcclxuXHJcbmZ1bmN0aW9uIElubGluZUdyb3VwU2VjdGlvbiAoe1xyXG5cdGFjdGl2ZSxcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbnRpZ3VvdXMsXHJcblx0Z3JvdyxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gZXZhbHVhdGUgcG9zaXRpb25cclxuXHRjb25zdCBzZXBhcmF0ZSA9IHBvc2l0aW9uID09PSAnbGFzdCcgfHwgcG9zaXRpb24gPT09ICdtaWRkbGUnO1xyXG5cclxuXHQvLyBBIGBjb250aWd1b3VzYCBzZWN0aW9uIG11c3QgbWFuaXB1bGF0ZSBpdCdzIGNoaWxkIGRpcmVjdGx5XHJcblx0Ly8gQSBzZXBhcmF0ZSAoZGVmYXVsdCkgc2VjdGlvbiBqdXN0IHdyYXBzIHRoZSBjaGlsZFxyXG5cdHJldHVybiBjb250aWd1b3VzID8gY2xvbmVFbGVtZW50KGNoaWxkcmVuLCB7XHJcblx0XHRhcGhyb2RpdGVTdHlsZXM6IFtcclxuXHRcdFx0Y2xhc3Nlcy5jb250aWd1b3VzLFxyXG5cdFx0XHRjbGFzc2VzWydjb250aWd1b3VzX18nICsgcG9zaXRpb25dLFxyXG5cdFx0XHRhY3RpdmUgPyBjbGFzc2VzLmFjdGl2ZSA6IG51bGwsXHJcblx0XHRcdGdyb3cgPyBjbGFzc2VzLmdyb3cgOiBudWxsLFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRdLFxyXG5cdFx0Li4ucHJvcHMsXHJcblx0fSkgOiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKFxyXG5cdFx0XHQhIWdyb3cgJiYgY2xhc3Nlcy5ncm93LFxyXG5cdFx0XHQhIXNlcGFyYXRlICYmIGNsYXNzZXMuc2VwYXJhdGUsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdFx0KX0gey4uLnByb3BzfT5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbklubGluZUdyb3VwU2VjdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCwgLy8gYnV0dG9ucyBvbmx5XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXHJcblx0Y29udGlndW91czogUHJvcFR5cGVzLmJvb2wsXHJcblx0Z3JvdzogUHJvcFR5cGVzLmJvb2wsXHJcblx0cG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2ZpcnN0JywgJ2xhc3QnLCAnbWlkZGxlJywgJ29ubHknXSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZUdyb3VwU2VjdGlvbjtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIElubGluZSBHcm91cDogU2VjdGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIFRha2VzIG9ubHkgRm9ybUlucHV0IGFuZCBCdXR0b24gYXMgY2hpbGRyZW4sIHJlbmRlcmluZyB0aGVtIGFzIGFcclxuLy8gdGlkeSBpbmxpbmUgYXJyYXlcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQvLyBwdWxsIGFjdGl2ZSBlbGVtZW50cyB1cFxyXG5cdGFjdGl2ZToge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc3RyZXRjaCB0byBmaWxsIGF2YWlsYWJsZSB3aWR0aFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VwYXJhdGUgYXBwbGljYWJsZSBub24tY29udGlndW91cyBlbGVtZW50c1xyXG5cdHNlcGFyYXRlOiB7XHJcblx0XHRwYWRkaW5nTGVmdDogJzAuNzVlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gQ29udGlndW91czogbWFuaXB1bGF0ZSBjaGlsZHJlbiBkaXJlY3RseVxyXG5cclxuXHQvLyBwdWxsIGZvY3VzZWQgY29udGlndW91cyBlbGVtZW50cyB1cFxyXG5cdGNvbnRpZ3VvdXM6IHtcclxuXHRcdCc6Zm9jdXMnOiB7XHJcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0XHR6SW5kZXg6IDEsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIHBvc2l0aW9uXHJcblx0Y29udGlndW91c19fbWlkZGxlOiB7XHJcblx0XHRib3JkZXJSYWRpdXM6IDAsXHJcblx0XHRtYXJnaW5MZWZ0OiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGggKiAtMSxcclxuXHR9LFxyXG5cdGNvbnRpZ3VvdXNfX2ZpcnN0OiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRib3JkZXJUb3BSaWdodFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0fSxcclxuXHRjb250aWd1b3VzX19sYXN0OiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0bWFyZ2luTGVmdDogdGhlbWUuYnV0dG9uLmJvcmRlcldpZHRoICogLTEsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4sIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIE5PVEU6IG9ubHkgYWNjZXB0cyBJbmxpbmVHcm91cFNlY3Rpb24gYXMgYSBzaW5nbGUgY2hpbGRcclxuXHJcbmZ1bmN0aW9uIElubGluZUdyb3VwICh7XHJcblx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdGJsb2NrLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNsYXNzTmFtZSxcclxuXHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRjb250aWd1b3VzLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBwcmVwYXJlIGdyb3VwIGNsYXNzTmFtZVxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuZ3JvdXAsXHJcblx0XHQhIWJsb2NrICYmIGNsYXNzZXMuYmxvY2ssXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSArPSAoJyAnICsgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnZlcnQgY2hpbGRyZW4gdG8gYW4gYXJyYXkgYW5kIGZpbHRlciBvdXQgZmFsc2V5IHZhbHVlc1xyXG5cdGNvbnN0IGJ1dHRvbnMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5maWx0ZXIoaSA9PiBpKTtcclxuXHJcblx0Ly8gbm9ybWFsaXplIHRoZSBjb3VudFxyXG5cdGNvbnN0IGNvdW50ID0gYnV0dG9ucy5sZW5ndGggLSAxO1xyXG5cclxuXHQvLyBjbG9uZSBjaGlsZHJlbiBhbmQgYXBwbHkgY2xhc3NOYW1lcyB0aGF0IGFwaHJvZGl0ZSBjYW4gdGFyZ2V0XHJcblx0cHJvcHMuY2hpbGRyZW4gPSBidXR0b25zLm1hcCgoYywgaWR4KSA9PiB7XHJcblx0XHRpZiAoIWMpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IGlzT25seUNoaWxkID0gIWNvdW50O1xyXG5cdFx0Y29uc3QgaXNGaXJzdENoaWxkID0gIWlzT25seUNoaWxkICYmIGlkeCA9PT0gMDtcclxuXHRcdGNvbnN0IGlzTGFzdENoaWxkID0gIWlzT25seUNoaWxkICYmIGlkeCA9PT0gY291bnQ7XHJcblx0XHRjb25zdCBpc01pZGRsZUNoaWxkID0gIWlzT25seUNoaWxkICYmICFpc0ZpcnN0Q2hpbGQgJiYgIWlzTGFzdENoaWxkO1xyXG5cclxuXHRcdGxldCBwb3NpdGlvbjtcclxuXHRcdGlmIChpc09ubHlDaGlsZCkgcG9zaXRpb24gPSAnb25seSc7XHJcblx0XHRpZiAoaXNGaXJzdENoaWxkKSBwb3NpdGlvbiA9ICdmaXJzdCc7XHJcblx0XHRpZiAoaXNMYXN0Q2hpbGQpIHBvc2l0aW9uID0gJ2xhc3QnO1xyXG5cdFx0aWYgKGlzTWlkZGxlQ2hpbGQpIHBvc2l0aW9uID0gJ21pZGRsZSc7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lRWxlbWVudChjLCB7XHJcblx0XHRcdGNvbnRpZ3VvdXM6IGNvbnRpZ3VvdXMsXHJcblx0XHRcdHBvc2l0aW9uLFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5JbmxpbmVHcm91cC5wcm9wVHlwZXMgPSB7XHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSxcclxuXHRibG9jazogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRjb250aWd1b3VzOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuSW5saW5lR3JvdXAuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdyb3VwOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG5cdH0sXHJcblx0YmxvY2s6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVHcm91cDtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gTGFiZWxsZWRDb250cm9sICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGlubGluZSxcclxuXHRsYWJlbCxcclxuXHR0aXRsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgbGFiZWxDbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLndyYXBwZXIsXHJcblx0XHRpbmxpbmUgJiYgY2xhc3Nlcy53cmFwcGVyX19pbmxpbmUsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGxhYmVsIHRpdGxlPXt0aXRsZX0gY2xhc3NOYW1lPXtsYWJlbENsYXNzTmFtZX0+XHJcblx0XHRcdDxpbnB1dCB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udHJvbCl9IC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMubGFiZWwpfT57bGFiZWx9PC9zcGFuPlxyXG5cdFx0PC9sYWJlbD5cclxuXHQpO1xyXG59O1xyXG5cclxuTGFiZWxsZWRDb250cm9sLnByb3BUeXBlcyA9IHtcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ2NoZWNrYm94JywgJ3JhZGlvJ10pLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsbGVkQ29udHJvbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsZXJ0XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHdyYXBwZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0fSxcclxuXHR3cmFwcGVyX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGNoZWNrYm94IG9yIHJhZGlvXHJcblx0Y29udHJvbDoge1xyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjVlbScsXHJcblx0fSxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9TcGlubmVyJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIExvYWRpbmdCdXR0b24gKHsgY2hpbGRyZW4sIGxvYWRpbmcsIC4uLnByb3BzIH0pIHtcclxuXHQvLyBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgdmFyaWFudCBmb3IgdGhlIHNwaW5uZXIsXHJcblx0Ly8gZmlsbCBpcyB0aGUgZGVmYXVsdCB2YXJpYW50IG9uIEJ1dHRvblxyXG5cdGNvbnN0IHZhcmlhbnQgPSBwcm9wcy52YXJpYW50IHx8ICdmaWxsJztcclxuXHJcblx0Ly8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGNvbG9yIGZvciB0aGUgc3Bpbm5lcixcclxuXHQvLyBjYW5jZWwgYW5kIGRlbGV0ZSBhbGlhcyB0byBcImRhbmdlclwiXHJcblx0bGV0IGNvbG9yO1xyXG5cdGlmIChwcm9wcy5jb2xvciA9PT0gJ2NhbmNlbCcgfHwgcHJvcHMuY29sb3IgPT09ICdkZWxldGUnKSBjb2xvciA9ICdkYW5nZXInO1xyXG5cclxuXHQvLyBtZXJnZSBhbGwgdGhlIHZhcmlhbnQvY29sb3IgdG9nZXRoZXJcclxuXHRjb25zdCBmb3JtYXR0ZWRDb2xvciA9IHZhcmlhbnQgPT09ICdmaWxsJyAmJiBwcm9wcy5jb2xvciAhPT0gJ2RlZmF1bHQnXHJcblx0XHQ/ICdpbnZlcnRlZCdcclxuXHRcdDogY29sb3I7XHJcblxyXG5cdC8vIHJlbmRlciB0aGUgc3Bpbm5lciBpZiByZXF1aXJlZFxyXG5cdGNvbnN0IHNwaW5uZXIgPSBsb2FkaW5nICYmIChcclxuXHRcdDxTcGlubmVyXHJcblx0XHRcdHNpemU9XCJzbWFsbFwiXHJcblx0XHRcdGNvbG9yPXtmb3JtYXR0ZWRDb2xvcn1cclxuXHRcdC8+XHJcblx0KTtcclxuXHJcblx0Ly8gc2xpZGUgdGhlIHNwaW5uZXIgaW4gYW5kIG91dCBvZiB2aWV3XHJcblx0Y29uc3Qgc3Bpbm5lclN0eWxlcyA9IHtcclxuXHRcdHdpZHRoOiBsb2FkaW5nXHJcblx0XHRcdD8gKHRoZW1lLnNwaW5uZXIuc2l6ZS5zbWFsbCAqIDUgKyB0aGVtZS5zcGFjaW5nLnNtYWxsKVxyXG5cdFx0XHQ6IDAsXHJcblx0fTtcclxuXHJcblx0Ly8gcmVuZGVyIGFsbCB0aGF0IHNoaXRcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnNwaW5uZXIpfSBzdHlsZT17c3Bpbm5lclN0eWxlc30+XHJcblx0XHRcdFx0e3NwaW5uZXJ9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbkxvYWRpbmdCdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGxvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Mb2FkaW5nQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRsb2FkaW5nOiBmYWxzZSxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3Bpbm5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0QWxpZ246ICdsZWZ0JyxcclxuXHRcdHRyYW5zaXRpb246ICd3aWR0aCAyMDBtcyBlYXNlLW91dCcsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMb2FkaW5nQnV0dG9uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxCb2R5ICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdlxyXG5cdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmJvZHksIGNsYXNzTmFtZSl9XHJcblx0XHRcdHsuLi5wcm9wc31cclxuXHRcdC8+XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Ym9keToge1xyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5LnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS52ZXJ0aWNhbCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEJvZHk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFNjcm9sbExvY2sgZnJvbSAnLi4vU2Nyb2xsTG9jayc7XHJcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi4vUG9ydGFsJztcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5jb25zdCBjYW5Vc2VEb20gPSAhIShcclxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxyXG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XHJcbik7XHJcblxyXG5jbGFzcyBNb2RhbERpYWxvZyBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2sgPSB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2suYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCA9IHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dC5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0b25DbG9zZTogdGhpcy5wcm9wcy5vbkNsb3NlLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAoIWNhblVzZURvbSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcclxuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcclxuXHRcdH1cclxuXHRcdGlmICghbmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xyXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTWV0aG9kc1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRoYW5kbGVLZXlib2FyZElucHV0IChldmVudCkge1xyXG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGhhbmRsZUJhY2tkcm9wQ2xpY2sgKGUpIHtcclxuXHRcdGlmIChlLnRhcmdldCAhPT0gdGhpcy5yZWZzLmNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMucHJvcHMub25DbG9zZSgpO1xyXG5cdH1cclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gUmVuZGVyZXJzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHJlbmRlckRpYWxvZyAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWwsXHJcblx0XHRcdGNoaWxkcmVuLFxyXG5cdFx0XHRpc09wZW4sXHJcblx0XHRcdHdpZHRoLFxyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKCFpc09wZW4pIHJldHVybiA8c3BhbiBrZXk9XCJjbG9zZWRcIiAvPjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2XHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfVxyXG5cdFx0XHRcdGtleT1cIm9wZW5cIlxyXG5cdFx0XHRcdHJlZj1cImNvbnRhaW5lclwiXHJcblx0XHRcdFx0b25DbGljaz17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMuaGFuZGxlQmFja2Ryb3BDbGlja31cclxuXHRcdFx0XHRvblRvdWNoRW5kPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmRpYWxvZyl9IHN0eWxlPXt7IHdpZHRoIH19IGRhdGEtc2NyZWVuLWlkPVwibW9kYWwtZGlhbG9nXCI+XHJcblx0XHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PFNjcm9sbExvY2sgLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFBvcnRhbD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cclxuXHRcdFx0PC9Qb3J0YWw+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vZGFsRGlhbG9nLnByb3BUeXBlcyA9IHtcclxuXHRiYWNrZHJvcENsb3Nlc01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRlbmFibGVLZXlib2FyZElucHV0OiBQcm9wVHlwZXMuYm9vbCxcclxuXHRpc09wZW46IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXHJcbn07XHJcbk1vZGFsRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRlbmFibGVLZXlib2FyZElucHV0OiB0cnVlLFxyXG5cdHdpZHRoOiA3NjgsXHJcbn07XHJcbk1vZGFsRGlhbG9nLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1vZGFsLmJhY2tncm91bmQsXHJcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGhlaWdodDogJzEwMCUnLFxyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdFx0bGVmdDogMCxcclxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cdFx0dG9wOiAwLFxyXG5cdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdHpJbmRleDogdGhlbWUubW9kYWwuekluZGV4LFxyXG5cdH0sXHJcblx0ZGlhbG9nOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLnZlcnRpY2FsLFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsRGlhbG9nO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxGb290ZXIgKHtcclxuXHRhbGlnbixcclxuXHRjbGFzc05hbWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5mb290ZXIsIGNsYXNzZXNbJ2FsaWduX18nICsgYWxpZ25dLCBjbGFzc05hbWUpfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEZvb3Rlci5wcm9wVHlwZXMgPSB7XHJcblx0YWxpZ246IFByb3BUeXBlcy5vbmVPZihbJ2NlbnRlcicsICdsZWZ0JywgJ3JpZ2h0J10pLFxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG5cdHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbk1vZGFsRm9vdGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRhbGlnbjogJ2xlZnQnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRmb290ZXI6IHtcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9yLmdyYXkxMH1gLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZm9vdGVyLnZlcnRpY2FsLFxyXG5cdH0sXHJcblxyXG5cdC8vIGFsaWdubWVudFxyXG5cdGFsaWduX19sZWZ0OiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0YWxpZ25fX2NlbnRlcjoge1xyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdH0sXHJcblx0YWxpZ25fX3JpZ2h0OiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEZvb3RlcjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEdseXBoQnV0dG9uIGZyb20gJy4uL0dseXBoQnV0dG9uJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsSGVhZGVyICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdHNob3dDbG9zZUJ1dHRvbixcclxuXHR0ZXh0LFxyXG5cdC4uLnByb3BzXHJcbn0sIHtcclxuXHRvbkNsb3NlLFxyXG59KSB7XHJcblx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0aWYgKGNoaWxkcmVuICYmIHRleHQpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IE1vZGFsSGVhZGVyIGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYHRleHRgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuaGVhZGVyLCBjbGFzc05hbWUpfT5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmdyb3cpfT5cclxuXHRcdFx0XHR7dGV4dCA/IChcclxuXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnRleHQpfT5cclxuXHRcdFx0XHRcdFx0e3RleHR9XHJcblx0XHRcdFx0XHQ8L2g0PlxyXG5cdFx0XHRcdCkgOiBjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdHshIW9uQ2xvc2UgJiYgc2hvd0Nsb3NlQnV0dG9uICYmIChcclxuXHRcdFx0XHQ8R2x5cGhCdXR0b25cclxuXHRcdFx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5jbG9zZX1cclxuXHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdGdseXBoPVwieFwiXHJcblx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsb3NlfVxyXG5cdFx0XHRcdFx0dmFyaWFudD1cImxpbmtcIlxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCl9XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuTW9kYWxIZWFkZXIucHJvcFR5cGVzID0ge1xyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG5cdHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbk1vZGFsSGVhZGVyLmNvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRoZWFkZXI6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0Ym9yZGVyQm90dG9tOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5oZWFkZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gZmlsbCBzcGFjZSB0byBwdXNoIHRoZSBjbG9zZSBidXR0b24gcmlnaHRcclxuXHRncm93OiB7XHJcblx0XHRmbGV4R3JvdzogMSxcclxuXHR9LFxyXG5cclxuXHQvLyB0aXRsZSB0ZXh0XHJcblx0dGV4dDoge1xyXG5cdFx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHRcdGZvbnRTaXplOiAxOCxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdGxpbmVIZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IDAsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxIZWFkZXI7XHJcbiIsImltcG9ydCBCb2R5IGZyb20gJy4vYm9keSc7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSAnLi9kaWFsb2cnO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vZm9vdGVyJztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlcic7XHJcblxyXG5leHBvcnQge1xyXG5cdEJvZHksXHJcblx0RGlhbG9nLFxyXG5cdEZvb3RlcixcclxuXHRIZWFkZXIsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlckNvdW50ICgpIHtcclxuXHRcdGxldCBjb3VudCA9ICcnO1xyXG5cdFx0Y29uc3QgeyBjdXJyZW50UGFnZSwgcGFnZVNpemUsIHBsdXJhbCwgc2luZ3VsYXIsIHRvdGFsIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0aWYgKCF0b3RhbCkge1xyXG5cdFx0XHRjb3VudCA9ICdObyAnICsgKHBsdXJhbCB8fCAncmVjb3JkcycpO1xyXG5cdFx0fSBlbHNlIGlmICh0b3RhbCA+IHBhZ2VTaXplKSB7XHJcblx0XHRcdGxldCBzdGFydCA9IChwYWdlU2l6ZSAqIChjdXJyZW50UGFnZSAtIDEpKSArIDE7XHJcblx0XHRcdGxldCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHBhZ2VTaXplIC0gMSwgdG90YWwpO1xyXG5cdFx0XHRjb3VudCA9IGBTaG93aW5nICR7c3RhcnR9IHRvICR7ZW5kfSBvZiAke3RvdGFsfWA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb3VudCA9ICdTaG93aW5nICcgKyB0b3RhbDtcclxuXHRcdFx0aWYgKHRvdGFsID4gMSAmJiBwbHVyYWwpIHtcclxuXHRcdFx0XHRjb3VudCArPSAnICcgKyBwbHVyYWw7XHJcblx0XHRcdH0gZWxzZSBpZiAodG90YWwgPT09IDEgJiYgc2luZ3VsYXIpIHtcclxuXHRcdFx0XHRjb3VudCArPSAnICcgKyBzaW5ndWxhcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvdW50KX0gZGF0YS1lMmUtcGFnaW5hdGlvbi1jb3VudD57Y291bnR9PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZW5kZXJQYWdlcyAoKSB7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBsaW1pdCwgb25QYWdlU2VsZWN0LCBwYWdlU2l6ZSwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKHRvdGFsIDw9IHBhZ2VTaXplKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRsZXQgcGFnZXMgPSBbXTtcclxuXHRcdGxldCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsIC8gcGFnZVNpemUpO1xyXG5cdFx0bGV0IG1pblBhZ2UgPSAxO1xyXG5cdFx0bGV0IG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cclxuXHRcdGlmIChsaW1pdCAmJiAobGltaXQgPCB0b3RhbFBhZ2VzKSkge1xyXG5cdFx0XHRsZXQgcmlnaHRMaW1pdCA9IE1hdGguZmxvb3IobGltaXQgLyAyKTtcclxuXHRcdFx0bGV0IGxlZnRMaW1pdCA9IHJpZ2h0TGltaXQgKyAobGltaXQgJSAyKSAtIDE7XHJcblx0XHRcdG1pblBhZ2UgPSBjdXJyZW50UGFnZSAtIGxlZnRMaW1pdDtcclxuXHRcdFx0bWF4UGFnZSA9IGN1cnJlbnRQYWdlICsgcmlnaHRMaW1pdDtcclxuXHJcblx0XHRcdGlmIChtaW5QYWdlIDwgMSkge1xyXG5cdFx0XHRcdG1heFBhZ2UgPSBsaW1pdDtcclxuXHRcdFx0XHRtaW5QYWdlID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWF4UGFnZSA+IHRvdGFsUGFnZXMpIHtcclxuXHRcdFx0XHRtaW5QYWdlID0gdG90YWxQYWdlcyAtIGxpbWl0ICsgMTtcclxuXHRcdFx0XHRtYXhQYWdlID0gdG90YWxQYWdlcztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKG1pblBhZ2UgPiAxKSB7XHJcblx0XHRcdHBhZ2VzLnB1c2goPFBhZ2Uga2V5PVwicGFnZV9zdGFydFwiIG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdCgxKX0+Li4uPC9QYWdlPik7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBwYWdlID0gbWluUGFnZTsgcGFnZSA8PSBtYXhQYWdlOyBwYWdlKyspIHtcclxuXHRcdFx0bGV0IHNlbGVjdGVkID0gKHBhZ2UgPT09IGN1cnJlbnRQYWdlKTtcclxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdHBhZ2VzLnB1c2goPFBhZ2Uga2V5PXsncGFnZV8nICsgcGFnZX0gc2VsZWN0ZWQ9e3NlbGVjdGVkfSBvbkNsaWNrPXsoKSA9PiBvblBhZ2VTZWxlY3QocGFnZSl9PntwYWdlfTwvUGFnZT4pO1xyXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlICovXHJcblx0XHR9XHJcblx0XHRpZiAobWF4UGFnZSA8IHRvdGFsUGFnZXMpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX2VuZFwiIG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdCh0b3RhbFBhZ2VzKX0+Li4uPC9QYWdlPik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMubGlzdCl9PlxyXG5cdFx0XHRcdHtwYWdlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuY29udGFpbmVyLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQ291bnQoKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJQYWdlcygpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzJlbScsXHJcblx0fSxcclxuXHRjb3VudDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5SaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG5cdGxpc3Q6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcblBhZ2luYXRpb24ucHJvcFR5cGVzID0ge1xyXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRjdXJyZW50UGFnZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdG9uUGFnZVNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0cGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRwbHVyYWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c2luZ3VsYXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0dG90YWw6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFnaW5hdGlvbjtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIFBhZ2UgKHtcclxuXHRkaXNhYmxlZCxcclxuXHRzZWxlY3RlZCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5wYWdlLFxyXG5cdFx0ISFkaXNhYmxlZCAmJiBjbGFzc2VzLmRpc2FibGVkLFxyXG5cdFx0ISFzZWxlY3RlZCAmJiBjbGFzc2VzLnNlbGVjdGVkXHJcblx0KTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGJ1dHRvbiB7Li4ucHJvcHN9IC8+XHJcblx0KTtcclxufTtcclxuXHJcblBhZ2UucHJvcFR5cGVzID0ge1xyXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmNvbnN0IHNlbGVjdGVkU3R5bGUgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLnNlbGVjdGVkLmJhY2tncm91bmQsXHJcblx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYm9yZGVyLFxyXG5cdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLnNlbGVjdGVkLmNvbG9yLFxyXG5cdGN1cnNvcjogJ2RlZmF1bHQnLFxyXG5cdHpJbmRleDogMixcclxufTtcclxuY29uc3QgcHNldWRvU3R5bGUgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmhvdmVyLmJhY2tncm91bmQsXHJcblx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYm9yZGVyLFxyXG5cdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmhvdmVyLmNvbG9yLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0cGFnZToge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHRjb2xvcjogdGhlbWUucGFnaW5hdGlvbi5jb2xvcixcclxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRmbG9hdDogJ2xlZnQnLCAvLyBDb2xsYXBzZSB3aGl0ZS1zcGFjZVxyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjI1ZW0nLFxyXG5cdFx0cGFkZGluZzogJzAgLjdlbScsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblxyXG5cdFx0Ly8gaGFuZGxlIGhvdmVyIGFuZCBmb2N1c1xyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHBzZXVkb1N0eWxlLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlbGVjdGVkIHBhZ2VcclxuXHRzZWxlY3RlZDoge1xyXG5cdFx0Li4uc2VsZWN0ZWRTdHlsZSxcclxuXHJcblx0XHQnOmhvdmVyJzogc2VsZWN0ZWRTdHlsZSxcclxuXHRcdCc6Zm9jdXMnOiBzZWxlY3RlZFN0eWxlLFxyXG5cdH0sXHJcblxyXG5cdC8vIGRpc2FibGVkIHBhZ2VcclxuXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuYmFja2dyb3VuZCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0fSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XHJcbiIsImltcG9ydCB7IENoaWxkcmVuLCBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIFBhc3MgdGhlIExpZ2h0Ym94IGNvbnRleHQgdGhyb3VnaCB0byB0aGUgUG9ydGFsJ3MgZGVzY2VuZGVudHNcclxuLy8gU3RhY2tPdmVyZmxvdyBkaXNjdXNzaW9uIGh0dHA6Ly9nb28uZ2wvb2Nscko5XHJcblxyXG5jbGFzcyBQYXNzQ29udGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbnRleHQ7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuXHR9XHJcbn07XHJcblxyXG5QYXNzQ29udGV4dC5wcm9wVHlwZXMgPSB7XHJcblx0Y29udGV4dDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG59O1xyXG5QYXNzQ29udGV4dC5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhc3NDb250ZXh0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBQYXNzQ29udGV4dCBmcm9tICcuLi9QYXNzQ29udGV4dCc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gbnVsbDtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcclxuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IHA7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xyXG5cdFx0Ly8gQW5pbWF0ZSBmYWRlIG9uIG1vdW50L3VubW91bnRcclxuXHRcdGNvbnN0IGR1cmF0aW9uID0gMjAwO1xyXG5cdFx0Y29uc3Qgc3R5bGVzID0gYFxyXG5cdFx0XHRcdC5mYWRlLWVudGVyIHsgb3BhY2l0eTogMC4wMTsgfVxyXG5cdFx0XHRcdC5mYWRlLWVudGVyLmZhZGUtZW50ZXItYWN0aXZlIHsgb3BhY2l0eTogMTsgdHJhbnNpdGlvbjogb3BhY2l0eSAke2R1cmF0aW9ufW1zOyB9XHJcblx0XHRcdFx0LmZhZGUtbGVhdmUgeyBvcGFjaXR5OiAxOyB9XHJcblx0XHRcdFx0LmZhZGUtbGVhdmUuZmFkZS1sZWF2ZS1hY3RpdmUgeyBvcGFjaXR5OiAwLjAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdGA7XHJcblx0XHRyZW5kZXIoXHJcblx0XHRcdDxQYXNzQ29udGV4dCBjb250ZXh0PXt0aGlzLmNvbnRleHR9PlxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8c3R5bGU+e3N0eWxlc308L3N0eWxlPlxyXG5cdFx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdFx0Y29tcG9uZW50PVwiZGl2XCJcclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9XCJmYWRlXCJcclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e2R1cmF0aW9ufVxyXG5cdFx0XHRcdFx0XHR7Li4udGhpcy5wcm9wc31cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvUGFzc0NvbnRleHQ+LFxyXG5cdFx0XHR0aGlzLnBvcnRhbEVsZW1lbnRcclxuXHRcdCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuUG9ydGFsLmNvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gVXNpbmcgd2luZG93LmlubmVyV2lkdGggYW5kIHN0YXRlIGluc3RlYWQgb2YgQ1NTIG1lZGlhIGJyZWFrcG9pbnRzXHJcbi8vIGJlY2F1c2Ugd2Ugd2FudCB0byByZW5kZXIgbnVsbCByYXRoZXIgdGhhbiBhbiBlbXB0eSBzcGFuLiBBbGxvd2luZyBmb3JcclxuLy8gQ1NTIHBzZXVkbyBjbGFzc2VzIGxpa2UgOm9ubHktY2hpbGQgdG8gYmVoYXZlIGFzIGV4cGVjdGVkLlxyXG5cclxuLy8gUmV0dXJuIHRydWUgaWYgd2luZG93ICsgZG9jdW1lbnRcclxuY29uc3QgY2FuVXNlRE9NID0gISEoXHJcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuXHQmJiB3aW5kb3cuZG9jdW1lbnRcclxuXHQmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxyXG4pO1xyXG5cclxuY2xhc3MgUmVzcG9uc2l2ZVRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnN0YXRlID0ge1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0aWYgKGNhblVzZURPTSkge1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xyXG5cdFx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhhbmRsZVJlc2l6ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0d2luZG93V2lkdGg6IGNhblVzZURPTSA/IHdpbmRvdy5pbm5lcldpZHRoIDogMCxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRcdFx0aGlkZGVuTEcsXHJcblx0XHRcdGhpZGRlbk1ELFxyXG5cdFx0XHRoaWRkZW5TTSxcclxuXHRcdFx0aGlkZGVuWFMsXHJcblx0XHRcdHZpc2libGVMRyxcclxuXHRcdFx0dmlzaWJsZU1ELFxyXG5cdFx0XHR2aXNpYmxlU00sXHJcblx0XHRcdHZpc2libGVYUyxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyB3aW5kb3dXaWR0aCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRsZXQgdGV4dDtcclxuXHJcblx0XHQvLyBzZXQgdGV4dCB2YWx1ZSBmcm9tIGJyZWFrcG9pbnQ7IGF0dGVtcHQgWFMgLS0+IExHXHJcblx0XHRpZiAod2luZG93V2lkdGggPCB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUpIHtcclxuXHRcdFx0dGV4dCA9IHZpc2libGVYUyB8fCBoaWRkZW5TTSB8fCBoaWRkZW5NRCB8fCBoaWRkZW5MRztcclxuXHRcdH0gZWxzZSBpZiAod2luZG93V2lkdGggPCB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCkge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgdmlzaWJsZVNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSkge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgdmlzaWJsZU1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCA9IGhpZGRlblhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IHZpc2libGVMRztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGV4dCA/IDxDb21wb25lbnQgey4uLnByb3BzfT57dGV4dH08L0NvbXBvbmVudD4gOiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcblJlc3BvbnNpdmVUZXh0LnByb3BUeXBlcyA9IHtcclxuXHRoaWRkZW5MRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5NRDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5TTTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5YUzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTEc6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZU1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVTTTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlWFM6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblJlc3BvbnNpdmVUZXh0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2l2ZVRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5mdW5jdGlvbiBTY3JlZW5SZWFkZXJPbmx5ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLnNyT25seSwgY2xhc3NOYW1lKTtcclxuXHJcblx0cmV0dXJuIDxzcGFuIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHNyT25seToge1xyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Y2xpcDogJ3JlY3QoMCwwLDAsMCknLFxyXG5cdFx0aGVpZ2h0OiAxLFxyXG5cdFx0bWFyZ2luOiAtMSxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBhZGRpbmc6IDAsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNjcmVlblJlYWRlck9ubHk7XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbExvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmxvY2tDb3VudCA9IDA7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudCsrO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vXHRGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBzY3JvbGxCYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5cdFx0XHR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmQgYm9keSBlbGVtZW50LiBFcnI6JywgZXJyKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMubG9ja0NvdW50ID09PSAwKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5sb2NrQ291bnQtLTtcclxuXHRcdGlmICh0aGlzLmxvY2tDb3VudCA+IDApIHJldHVybjsgLy8gU3RpbGwgbG9ja2VkXHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5cdFx0XHR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnJztcclxuXHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmQgYm9keSBlbGVtZW50LiBFcnI6JywgZXJyKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTgwLFxyXG5cdGVycm9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0aW5mbzogdGhlbWUuY29sb3IuaW5mbyxcclxuXHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbmZ1bmN0aW9uIFNlZ21lbnRlZENvbnRyb2wgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y3JvcFRleHQsXHJcblx0ZXF1YWxXaWR0aFNlZ21lbnRzLFxyXG5cdGlubGluZSxcclxuXHRvbkNoYW5nZSxcclxuXHRvcHRpb25zLFxyXG5cdHZhbHVlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRyb2wsXHJcblx0XHRpbmxpbmUgPyBjbGFzc2VzLmNvbnRyb2xfX2lubGluZSA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7b3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGJ1dHRvbkNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0XHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0XHRcdFx0b3B0LmRpc2FibGVkID8gY2xhc3Nlcy5idXR0b25fX2Rpc2FibGVkIDogbnVsbCxcclxuXHRcdFx0XHRcdG9wdC52YWx1ZSA9PT0gdmFsdWUgPyBjbGFzc2VzWydidXR0b25fXycgKyBjb2xvcl0gOiBudWxsLFxyXG5cdFx0XHRcdFx0Y3JvcFRleHQgPyBjbGFzc2VzLmJ1dHRvbl9fY3JvcFRleHQgOiBudWxsLFxyXG5cdFx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzID8gY2xhc3Nlcy5idXR0b25fX2VxdWFsV2lkdGggOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxidXR0b25cclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtidXR0b25DbGFzc05hbWV9XHJcblx0XHRcdFx0XHRcdGtleT17b3B0LnZhbHVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXshb3B0LmRpc2FibGVkICYmICgoKSA9PiBvbkNoYW5nZShvcHQudmFsdWUpKX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0XHRcdHRpdGxlPXtjcm9wVGV4dCA/IG9wdC5sYWJlbCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdHRhYkluZGV4PXtvcHQuZGlzYWJsZWQgPyAnLTEnIDogJyd9XHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0e29wdC5sYWJlbH1cclxuXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0pfVxyXG5cdFx0PC9kaXY+KTtcclxufTtcclxuXHJcbmNvbnN0IHZhbHVlUHJvcFNoYXBlID0gW1xyXG5cdFByb3BUeXBlcy5ib29sLFxyXG5cdFByb3BUeXBlcy5udW1iZXIsXHJcblx0UHJvcFR5cGVzLnN0cmluZyxcclxuXTtcclxuXHJcblNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLCAvLyB3aGVuIGBpbmxpbmUgJiYgZXF1YWxXaWR0aFNlZ21lbnRzYCBjcm9wcyB0byB0aGUgbmV4dCBsYXJnZXN0IG9wdGlvbiBsZW5ndGhcclxuXHRlcXVhbFdpZHRoU2VnbWVudHM6IFByb3BUeXBlcy5ib29sLCAvLyBvbmx5IHJlbGV2YW50IHdoZW4gYGlubGluZSA9PT0gZmFsc2VgXHJcblx0aW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRcdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKHZhbHVlUHJvcFNoYXBlKSxcclxuXHRcdH0pXHJcblx0KS5pc1JlcXVpcmVkLFxyXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKHZhbHVlUHJvcFNoYXBlKSxcclxufTtcclxuU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VnbWVudGVkQ29udHJvbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNlZ21lbnRlZCBDb250cm9sXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb25zdCBwc2V1ZG9TdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHR9O1xyXG5cdGNvbG9yVmFyaWFudHNbJ2J1dHRvbl9fJyArIGNvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGVzLFxyXG5cdFx0JzphY3RpdmUnOiBwc2V1ZG9TdHlsZXMsXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250cm9sOiB7XHJcblx0XHRib3JkZXJXaWR0aDogMSxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC40ZW0nLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiAxLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAxLFxyXG5cdH0sXHJcblx0Y29udHJvbF9faW5saW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGJ1dHRvbnNcclxuXHRidXR0b246IHtcclxuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcclxuXHRcdGJvcmRlcjogMCxcclxuXHRcdGJvcmRlclJhZGl1czogJzAuMjVlbScsXHJcblx0XHRmbGV4R3JvdzogMSxcclxuXHRcdG1hcmdpbjogJzJweCAxcHgnLFxyXG5cdFx0cGFkZGluZzogJzAuM2VtIDAuOWVtJyxcclxuXHRcdG91dGxpbmU6IDAsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6Zm9jdXMnOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4wNSknIH0sXHJcblx0XHQnOmFjdGl2ZSc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjEpJyB9LFxyXG5cdH0sXHJcblx0YnV0dG9uX19lcXVhbFdpZHRoOiB7XHJcblx0XHRmbGV4OiAnMSAxIDAnLFxyXG5cdH0sXHJcblx0YnV0dG9uX19jcm9wVGV4dDoge1xyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Rpc2FibGVkOiB7XHJcblx0XHRvcGFjaXR5OiAwLjYsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ2RhbmdlcicsICdkZWZhdWx0JywgJ2ludmVydGVkJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ107XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IFNjcmVlblJlYWRlck9ubHkgZnJvbSAnLi4vU2NyZWVuUmVhZGVyT25seSc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG5mdW5jdGlvbiBTcGlubmVyICh7IGNsYXNzTmFtZSwgc2l6ZSwgY29sb3IsIC4uLnByb3BzIH0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJhc2UsXHJcblx0XHRjbGFzc2VzW3NpemVdLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X19maXJzdCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X19zZWNvbmQpfWB9IC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YCR7Y3NzKGNsYXNzZXMuZG90LCBjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLCBjbGFzc2VzLmRvdF9fdGhpcmQpfWB9IC8+XHJcblx0XHRcdDxTY3JlZW5SZWFkZXJPbmx5PkxvYWRpbmcuLi48L1NjcmVlblJlYWRlck9ubHk+XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuU3Bpbm5lci5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihjb2xvcnMpLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihzaXplcyksXHJcbn07XHJcblNwaW5uZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdHNpemU6ICdtZWRpdW0nLFxyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5uZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gWydzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnXTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNwaW5uZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5jb2xvcnMuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tgY29sb3JfXyR7Y29sb3J9YF0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnNwaW5uZXIuY29sb3JbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbYHNpemVfXyR7c2l6ZX1gXSA9IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5zcGlubmVyLnNpemVbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBEZWNsYXJlIGFuaW1hdGlvbiBrZXlmcmFtZXNcclxuXHJcbmNvbnN0IGtleWZyYW1lcyA9IGNvbXBvc2Uua2V5ZnJhbWVzKCdwdWxzZScsIHtcclxuXHQnMCUsIDgwJSwgMTAwJSc6IHsgb3BhY2l0eTogMCB9LFxyXG5cdCc0MCUnOiB7IG9wYWNpdHk6IDEgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRiYXNlOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IDEsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogJzVlbScsXHJcblx0fSxcclxuXHRzbWFsbDpcdHsgZm9udFNpemU6IDQgfSxcclxuXHRtZWRpdW06XHR7IGZvbnRTaXplOiA4IH0sXHJcblx0bGFyZ2U6XHR7IGZvbnRTaXplOiAxNiB9LFxyXG5cclxuXHQvLyB0ZXh0XHJcblx0dGV4dDoge1xyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Y2xpcDogJ3JlY3QoMCwwLDAsMCknLFxyXG5cdFx0aGVpZ2h0OiAxLFxyXG5cdFx0bWFyZ2luOiAtMSxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBhZGRpbmc6IDAsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIGRvdHNcclxuXHRkb3Q6IHtcclxuXHRcdGFuaW1hdGlvbk5hbWU6IGtleWZyYW1lcyxcclxuXHRcdGFuaW1hdGlvbkR1cmF0aW9uOiAnMXMnLFxyXG5cdFx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdpbmZpbml0ZScsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcxZW0nLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6ICcxZW0nLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ3RvcCcsXHJcblx0XHR3aWR0aDogJzFlbScsXHJcblx0fSxcclxuXHRkb3RfX3NlY29uZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICcxNjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fdGhpcmQ6IHtcclxuXHRcdGFuaW1hdGlvbkRlbGF5OiAnMzIwbXMnLFxyXG5cdFx0bWFyZ2luTGVmdDogJzFlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gQ29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxuXHJcblx0Ly8gU2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdEFsZXJ0OiByZXF1aXJlKCcuL0FsZXJ0JyksXHJcblx0QmxhbmtTdGF0ZTogcmVxdWlyZSgnLi9CbGFua1N0YXRlJyksXHJcblx0QnV0dG9uOiByZXF1aXJlKCcuL0J1dHRvbicpLFxyXG5cdENlbnRlcjogcmVxdWlyZSgnLi9DZW50ZXInKSxcclxuXHRDaGlwOiByZXF1aXJlKCcuL0NoaXAnKSxcclxuXHRDb250YWluZXI6IHJlcXVpcmUoJy4vQ29udGFpbmVyJyksXHJcblx0RHJvcGRvd25CdXR0b246IHJlcXVpcmUoJy4vRHJvcGRvd25CdXR0b24nKSxcclxuXHRGb3JtOiByZXF1aXJlKCcuL0Zvcm0nKSxcclxuXHRGb3JtRmllbGQ6IHJlcXVpcmUoJy4vRm9ybUZpZWxkJyksXHJcblx0Rm9ybUlucHV0OiByZXF1aXJlKCcuL0Zvcm1JbnB1dCcpLFxyXG5cdEZvcm1MYWJlbDogcmVxdWlyZSgnLi9Gb3JtTGFiZWwnKSxcclxuXHRGb3JtTm90ZTogcmVxdWlyZSgnLi9Gb3JtTm90ZScpLFxyXG5cdEZvcm1TZWxlY3Q6IHJlcXVpcmUoJy4vRm9ybVNlbGVjdCcpLFxyXG5cdEdseXBoOiByZXF1aXJlKCcuL0dseXBoJyksXHJcblx0R2x5cGhCdXR0b246IHJlcXVpcmUoJy4vR2x5cGhCdXR0b24nKSxcclxuXHRHbHlwaEZpZWxkOiByZXF1aXJlKCcuL0dseXBoRmllbGQnKSxcclxuXHRHcmlkOiByZXF1aXJlKCcuL0dyaWQnKSxcclxuXHRJbmxpbmVHcm91cDogcmVxdWlyZSgnLi9JbmxpbmVHcm91cCcpLFxyXG5cdElubGluZUdyb3VwU2VjdGlvbjogcmVxdWlyZSgnLi9JbmxpbmVHcm91cFNlY3Rpb24nKSxcclxuXHRMYWJlbGxlZENvbnRyb2w6IHJlcXVpcmUoJy4vTGFiZWxsZWRDb250cm9sJyksXHJcblx0TG9hZGluZ0J1dHRvbjogcmVxdWlyZSgnLi9Mb2FkaW5nQnV0dG9uJyksXHJcblx0TW9kYWw6IHJlcXVpcmUoJy4vTW9kYWwnKSxcclxuXHRQYWdpbmF0aW9uOiByZXF1aXJlKCcuL1BhZ2luYXRpb24nKSxcclxuXHRSZXNwb25zaXZlVGV4dDogcmVxdWlyZSgnLi9SZXNwb25zaXZlVGV4dCcpLFxyXG5cdFNjcmVlblJlYWRlck9ubHk6IHJlcXVpcmUoJy4vU2NyZWVuUmVhZGVyT25seScpLFxyXG5cdFNlZ21lbnRlZENvbnRyb2w6IHJlcXVpcmUoJy4vU2VnbWVudGVkQ29udHJvbCcpLFxyXG5cdFNwaW5uZXI6IHJlcXVpcmUoJy4vU3Bpbm5lcicpLFxyXG59O1xyXG4iLCIvKipcclxuICogVGhlIGFjdHVhbCBTaWduIEluIHZpZXcsIHdpdGggdGhlIGxvZ2luIGZvcm1cclxuICovXHJcblxyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5cclxuaW1wb3J0IEFsZXJ0IGZyb20gJy4vY29tcG9uZW50cy9BbGVydCc7XHJcbmltcG9ydCBCcmFuZCBmcm9tICcuL2NvbXBvbmVudHMvQnJhbmQnO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSAnLi9jb21wb25lbnRzL1VzZXJJbmZvJztcclxuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvTG9naW5Gb3JtJztcclxuXHJcbnZhciBTaWduaW5WaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlbWFpbDogJycsXHJcblx0XHRcdHBhc3N3b3JkOiAnJyxcclxuXHRcdFx0aXNBbmltYXRpbmc6IGZhbHNlLFxyXG5cdFx0XHRpc0ludmFsaWQ6IGZhbHNlLFxyXG5cdFx0XHRpbnZhbGlkTWVzc2FnZTogJycsXHJcblx0XHRcdHNpZ25lZE91dDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCA9PT0gJz9zaWduZWRvdXQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdC8vIEZvY3VzIHRoZSBlbWFpbCBmaWVsZCB3aGVuIHdlJ3JlIG1vdW50ZWRcclxuXHRcdGlmICh0aGlzLnJlZnMuZW1haWwpIHtcclxuXHRcdFx0dGhpcy5yZWZzLmVtYWlsLnNlbGVjdCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdC8vIFNldCB0aGUgbmV3IHN0YXRlIHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcclxuXHRcdGNvbnN0IG5ld1N0YXRlID0ge307XHJcblx0XHRuZXdTdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVTdWJtaXQgKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdC8vIElmIGVpdGhlciBwYXNzd29yZCBvciBtYWlsIGFyZSBtaXNzaW5nLCBzaG93IGFuIGVycm9yXHJcblx0XHRpZiAoIXRoaXMuc3RhdGUuZW1haWwgfHwgIXRoaXMuc3RhdGUucGFzc3dvcmQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlzcGxheUVycm9yKCdQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcyBhbmQgcGFzc3dvcmQgdG8gc2lnbiBpbi4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR4aHIoe1xyXG5cdFx0XHR1cmw6IGAke0tleXN0b25lLmFkbWluUGF0aH0vYXBpL3Nlc3Npb24vc2lnbmluYCxcclxuXHRcdFx0bWV0aG9kOiAncG9zdCcsXHJcblx0XHRcdGpzb246IHtcclxuXHRcdFx0XHRlbWFpbDogdGhpcy5zdGF0ZS5lbWFpbCxcclxuXHRcdFx0XHRwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZCxcclxuXHRcdFx0fSxcclxuXHRcdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHR9LCAoZXJyLCByZXNwLCBib2R5KSA9PiB7XHJcblx0XHRcdGlmIChlcnIgfHwgYm9keSAmJiBib2R5LmVycm9yKSB7XHJcblx0XHRcdFx0cmV0dXJuIGJvZHkuZXJyb3IgPT09ICdpbnZhbGlkIGNzcmYnXHJcblx0XHRcdFx0XHQ/IHRoaXMuZGlzcGxheUVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZzsgcGxlYXNlIHJlZnJlc2ggeW91ciBicm93c2VyIGFuZCB0cnkgYWdhaW4uJylcclxuXHRcdFx0XHRcdDogdGhpcy5kaXNwbGF5RXJyb3IoJ1RoZSBlbWFpbCBhbmQgcGFzc3dvcmQgeW91IGVudGVyZWQgYXJlIG5vdCB2YWxpZC4nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBSZWRpcmVjdCB0byB3aGVyZSB3ZSBjYW1lIGZyb20gb3IgdG8gdGhlIGRlZmF1bHQgYWRtaW4gcGF0aFxyXG5cdFx0XHRcdGlmIChLZXlzdG9uZS5yZWRpcmVjdCkge1xyXG5cdFx0XHRcdFx0dG9wLmxvY2F0aW9uLmhyZWYgPSBLZXlzdG9uZS5yZWRpcmVjdDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dG9wLmxvY2F0aW9uLmhyZWYgPSB0aGlzLnByb3BzLmZyb20gPyB0aGlzLnByb3BzLmZyb20gOiBLZXlzdG9uZS5hZG1pblBhdGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHlvdSB3YW50IHRvIHNob3dcclxuXHQgKi9cclxuXHRkaXNwbGF5RXJyb3IgKG1lc3NhZ2UpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRpc0FuaW1hdGluZzogdHJ1ZSxcclxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxyXG5cdFx0XHRpbnZhbGlkTWVzc2FnZTogbWVzc2FnZSxcclxuXHRcdH0pO1xyXG5cdFx0c2V0VGltZW91dCh0aGlzLmZpbmlzaEFuaW1hdGlvbiwgNzUwKTtcclxuXHR9LFxyXG5cdC8vIEZpbmlzaCB0aGUgYW5pbWF0aW9uIGFuZCBzZWxlY3QgdGhlIGVtYWlsIGZpZWxkXHJcblx0ZmluaXNoQW5pbWF0aW9uICgpIHtcclxuXHRcdC8vIFRPRE8gaXNNb3VudGVkIHdhcyBkZXByZWNhdGVkLCBmaW5kIG91dCBpZiB3ZSBuZWVkIHRoaXMgZ3VhcmRcclxuXHRcdGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMucmVmcy5lbWFpbCkge1xyXG5cdFx0XHR0aGlzLnJlZnMuZW1haWwuc2VsZWN0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0aXNBbmltYXRpbmc6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgYm94Q2xhc3NuYW1lID0gY2xhc3NuYW1lcygnYXV0aC1ib3gnLCB7XHJcblx0XHRcdCdhdXRoLWJveC0taGFzLWVycm9ycyc6IHRoaXMuc3RhdGUuaXNBbmltYXRpbmcsXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXV0aC13cmFwcGVyXCI+XHJcblx0XHRcdFx0PEFsZXJ0XHJcblx0XHRcdFx0XHRpc0ludmFsaWQ9e3RoaXMuc3RhdGUuaXNJbnZhbGlkfVxyXG5cdFx0XHRcdFx0c2lnbmVkT3V0PXt0aGlzLnN0YXRlLnNpZ25lZE91dH1cclxuXHRcdFx0XHRcdGludmFsaWRNZXNzYWdlPXt0aGlzLnN0YXRlLmludmFsaWRNZXNzYWdlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2JveENsYXNzbmFtZX0+XHJcblx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwidS1oaWRkZW4tdmlzdWFsbHlcIj57dGhpcy5wcm9wcy5icmFuZCA/IHRoaXMucHJvcHMuYnJhbmQgOiAnS2V5c3RvbmUnfSBTaWduIEluIDwvaDE+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImF1dGgtYm94X19pbm5lclwiPlxyXG5cdFx0XHRcdFx0XHQ8QnJhbmRcclxuXHRcdFx0XHRcdFx0XHRsb2dvPXt0aGlzLnByb3BzLmxvZ299XHJcblx0XHRcdFx0XHRcdFx0YnJhbmQ9e3RoaXMucHJvcHMuYnJhbmR9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnVzZXIgPyAoXHJcblx0XHRcdFx0XHRcdFx0PFVzZXJJbmZvXHJcblx0XHRcdFx0XHRcdFx0XHRhZG1pblBhdGg9e3RoaXMucHJvcHMuZnJvbSA/IHRoaXMucHJvcHMuZnJvbSA6IEtleXN0b25lLmFkbWluUGF0aH1cclxuXHRcdFx0XHRcdFx0XHRcdHNpZ25vdXRQYXRoPXtgJHtLZXlzdG9uZS5hZG1pblBhdGh9L3NpZ25vdXRgfVxyXG5cdFx0XHRcdFx0XHRcdFx0dXNlckNhbkFjY2Vzc0tleXN0b25lPXt0aGlzLnByb3BzLnVzZXJDYW5BY2Nlc3NLZXlzdG9uZX1cclxuXHRcdFx0XHRcdFx0XHRcdHVzZXJOYW1lPXt0aGlzLnByb3BzLnVzZXIubmFtZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XHRcdDxMb2dpbkZvcm1cclxuXHRcdFx0XHRcdFx0XHRcdGVtYWlsPXt0aGlzLnN0YXRlLmVtYWlsfVxyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlSW5wdXRDaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxyXG5cdFx0XHRcdFx0XHRcdFx0aXNBbmltYXRpbmc9e3RoaXMuc3RhdGUuaXNBbmltYXRpbmd9XHJcblx0XHRcdFx0XHRcdFx0XHRwYXNzd29yZD17dGhpcy5zdGF0ZS5wYXNzd29yZH1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWZvb3RlclwiPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaWduaW5WaWV3O1xyXG4iLCIvKipcclxuICogUmVuZGVycyBhbiBBbGVydC4gUGFzcyBlaXRoZXIgYW4gaXNJbnZhbGlkIGFuZCBpbnZhbGlkTWVzc2FnZSBwcm9wLCBvciBzZXRcclxuICogdGhlIHNpZ25lZE91dCBwcm9wIHRvIHRydWUgdG8gc2hvdyB0aGUgc3RhbmRhcmQgc2lnbmVkIG91dCBtZXNzYWdlXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi8uLi9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IEFsZXJ0VmlldyA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdGlmIChwcm9wcy5pc0ludmFsaWQpIHtcclxuXHRcdHJldHVybiA8QWxlcnQga2V5PVwiZXJyb3JcIiBjb2xvcj1cImRhbmdlclwiIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+e3Byb3BzLmludmFsaWRNZXNzYWdlfTwvQWxlcnQ+O1xyXG5cdH0gZWxzZSBpZiAocHJvcHMuc2lnbmVkT3V0KSB7XHJcblx0XHRyZXR1cm4gPEFsZXJ0IGtleT1cInNpZ25lZC1vdXRcIiBjb2xvcj1cImluZm9cIiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PllvdSBoYXZlIGJlZW4gc2lnbmVkIG91dC48L0FsZXJ0PjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gQ2FuJ3QgcmV0dXJuIFwibnVsbFwiIGZyb20gc3RhdGVsZXNzIGNvbXBvbmVudHNcclxuXHRcdHJldHVybiA8c3BhbiAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5BbGVydFZpZXcucHJvcFR5cGVzID0ge1xyXG5cdGludmFsaWRNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGlzSW52YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0c2lnbmVkT3V0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRWaWV3O1xyXG4iLCIvKipcclxuICogUmVuZGVycyBhIGxvZ28sIGRlZmF1bHRpbmcgdG8gdGhlIEtleXN0b25lIGxvZ28gaWYgbm8gYnJhbmQgaXMgc3BlY2lmaWVkIGluXHJcbiAqIHRoZSBjb25maWd1cmF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IEJyYW5kID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblx0Ly8gRGVmYXVsdCB0byB0aGUgS2V5c3RvbmVKUyBsb2dvXHJcblx0bGV0IGxvZ28gPSB7IHNyYzogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9pbWFnZXMvbG9nby5wbmdgLCB3aWR0aDogMjA1LCBoZWlnaHQ6IDY4IH07XHJcblx0aWYgKHByb3BzLmxvZ28pIHtcclxuXHRcdC8vIElmIHRoZSBsb2dvIGlzIHNldCB0byBhIHN0cmluZywgaXQncyBhIGRpcmVjdCBsaW5rXHJcblx0XHRsb2dvID0gdHlwZW9mIHByb3BzLmxvZ28gPT09ICdzdHJpbmcnID8geyBzcmM6IHByb3BzLmxvZ28gfSA6IHByb3BzLmxvZ287XHJcblx0XHQvLyBPcHRpb25hbGx5IG9uZSBjYW4gc3BlY2lmeSB0aGUgbG9nbyBhcyBhbiBhcnJheSwgYWxzbyBzdGF0aW5nIHRoZVxyXG5cdFx0Ly8gd2FudGVkIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGxvZ29cclxuXHRcdC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShsb2dvKSkge1xyXG5cdFx0XHRsb2dvID0geyBzcmM6IGxvZ29bMF0sIHdpZHRoOiBsb2dvWzFdLCBoZWlnaHQ6IGxvZ29bMl0gfTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiYXV0aC1ib3hfX2NvbFwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImF1dGgtYm94X19icmFuZFwiPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIvXCIgY2xhc3NOYW1lPVwiYXV0aC1ib3hfX2JyYW5kX19sb2dvXCI+XHJcblx0XHRcdFx0XHQ8aW1nXHJcblx0XHRcdFx0XHRcdHNyYz17bG9nby5zcmN9XHJcblx0XHRcdFx0XHRcdHdpZHRoPXtsb2dvLndpZHRoID8gbG9nby53aWR0aCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdGhlaWdodD17bG9nby5oZWlnaHQgPyBsb2dvLmhlaWdodCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdGFsdD17cHJvcHMuYnJhbmR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCcmFuZDtcclxuIiwiLyoqXHJcbiAqIFRoZSBsb2dpbiBmb3JtIG9mIHRoZSBzaWduaW4gc2NyZWVuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uLCBGb3JtLCBGb3JtRmllbGQsIEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgTG9naW5Gb3JtID0gKHtcclxuXHRlbWFpbCxcclxuXHRoYW5kbGVJbnB1dENoYW5nZSxcclxuXHRoYW5kbGVTdWJtaXQsXHJcblx0aXNBbmltYXRpbmcsXHJcblx0cGFzc3dvcmQsXHJcbn0pID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWJveF9fY29sXCI+XHJcblx0XHRcdDxGb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IG5vVmFsaWRhdGU+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBsYWJlbD1cIkVtYWlsXCIgaHRtbEZvcj1cImVtYWlsXCI+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0XHR0eXBlPVwiZW1haWxcIlxyXG5cdFx0XHRcdFx0XHRuYW1lPVwiZW1haWxcIlxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtlbWFpbH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBsYWJlbD1cIlBhc3N3b3JkXCIgaHRtbEZvcj1cInBhc3N3b3JkXCI+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdG5hbWU9XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e3Bhc3N3b3JkfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8QnV0dG9uIGRpc2FibGVkPXtpc0FuaW1hdGluZ30gY29sb3I9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0U2lnbiBJblxyXG5cdFx0XHRcdDwvQnV0dG9uPjxici8+PGJyLz5cclxuXHRcdFx0XHQ8YSBocmVmPVwiL2ZvcmdvdF9wYXNzd29yZFwiIHRpdGxlPVwiRm9yZ290IFBhc3N3b3JkXCI+Rm9yZ290IFBhc3N3b3JkPzwvYT5cclxuXHRcdFx0PC9Gb3JtPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkxvZ2luRm9ybS5wcm9wVHlwZXMgPSB7XHJcblx0ZW1haWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0aGFuZGxlU3VibWl0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdGlzQW5pbWF0aW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRwYXNzd29yZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luRm9ybTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vLi4vQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vLyBUT0RPIEZpZ3VyZSBvdXQgaWYgd2Ugc2hvdWxkIGNoYW5nZSBcIktleXN0b25lXCIgdG8gXCJBZG1pbiBhcmVhXCJcclxuXHJcbmNvbnN0IFVzZXJJbmZvID0gKHtcclxuXHRhZG1pblBhdGgsXHJcblx0c2lnbm91dFBhdGgsXHJcblx0dXNlckNhbkFjY2Vzc0tleXN0b25lLFxyXG5cdHVzZXJOYW1lLFxyXG59KSA9PiB7XHJcblx0Y29uc3QgYWRtaW5CdXR0b24gPSB1c2VyQ2FuQWNjZXNzS2V5c3RvbmUgPyAoXHJcblx0XHQ8QnV0dG9uIGhyZWY9e2FkbWluUGF0aH0gY29sb3I9XCJwcmltYXJ5XCI+XHJcblx0XHRcdE9wZW4gS2V5c3RvbmVcclxuXHRcdDwvQnV0dG9uPlxyXG5cdCkgOiBudWxsO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWJveF9fY29sXCI+XHJcblx0XHRcdDxwPkhpIHt1c2VyTmFtZX0sPC9wPlxyXG5cdFx0XHQ8cD5Zb3UncmUgYWxyZWFkeSBzaWduZWQgaW4uPC9wPlxyXG5cdFx0XHR7YWRtaW5CdXR0b259XHJcblx0XHRcdDxCdXR0b24gaHJlZj17c2lnbm91dFBhdGh9IHZhcmlhbnQ9XCJsaW5rXCIgY29sb3I9XCJjYW5jZWxcIj5cclxuXHRcdFx0XHRTaWduIE91dFxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Vc2VySW5mby5wcm9wVHlwZXMgPSB7XHJcblx0YWRtaW5QYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0c2lnbm91dFBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHR1c2VyQ2FuQWNjZXNzS2V5c3RvbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHVzZXJOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJJbmZvO1xyXG4iLCIvKipcclxuICogVGhlIHNpZ25pbiBwYWdlLCBpdCByZW5kZXJzIGEgcGFnZSB3aXRoIGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGlucHV0IGZvcm0uXHJcbiAqXHJcbiAqIFRoaXMgaXMgZGVjb3VwbGVkIGZyb20gdGhlIG1haW4gYXBwIChpbiB0aGUgXCJBcHAvXCIgZm9sZGVyKSBiZWNhdXNlIHdlIGluamVjdFxyXG4gKiBsb3RzIG9mIGRhdGEgaW50byB0aGUgb3RoZXIgc2NyZWVucyAobGlrZSB0aGUgbGlzdHMgdGhhdCBleGlzdCkgdGhhdCB3ZSBkb24ndFxyXG4gKiB3YW50IHRvIGhhdmUgaW5qZWN0ZWQgaGVyZSwgc28gdGhpcyBpcyBhIGNvbXBsZXRlbHkgc2VwYXJhdGUgcm91dGUgYW5kIHRlbXBsYXRlLlxyXG4gKi9cclxuaW1wb3J0IHFzIGZyb20gJ3FzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBTaWduaW4gZnJvbSAnLi9TaWduaW4nO1xyXG5cclxuY29uc3QgcGFyYW1zID0gcXMucGFyc2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpKTtcclxuY29uc3QgZnJvbSA9IHR5cGVvZiBwYXJhbXMuZnJvbSA9PT0gJ3N0cmluZycgJiYgcGFyYW1zLmZyb20uY2hhckF0KDApID09PSAnLydcclxuXHQ/IHBhcmFtcy5mcm9tIDogdW5kZWZpbmVkO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG5cdDxTaWduaW5cclxuXHRcdGJyYW5kPXtLZXlzdG9uZS5icmFuZH1cclxuXHRcdGZyb209e2Zyb219XHJcblx0XHRsb2dvPXtLZXlzdG9uZS5sb2dvfVxyXG5cdFx0dXNlcj17S2V5c3RvbmUudXNlcn1cclxuXHRcdHVzZXJDYW5BY2Nlc3NLZXlzdG9uZT17S2V5c3RvbmUudXNlckNhbkFjY2Vzc0tleXN0b25lfVxyXG5cdC8+LFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduaW4tdmlldycpXHJcbik7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGtleS1zcGFjaW5nICovXHJcbmNvbnN0IHRoZW1lID0ge307XHJcbmNvbnN0IHsgYmxlbmQsIGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9ID0gcmVxdWlyZSgnLi91dGlscy9jb2xvcicpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENPTU1PTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIGJyZWFrcG9pbnRcclxuXHJcbnRoZW1lLmJyZWFrcG9pbnROdW1lcmljID0ge1xyXG5cdG1vYmlsZTogICAgICAgICAgIDQ4MCxcclxuXHR0YWJsZXRQb3J0cmFpdDogICA3NjgsXHJcblx0dGFibGV0TGFuZHNjYXBlOiAgOTkyLFxyXG5cdGRlc2t0b3A6ICAgICAgICAgIDEyMDAsXHJcbn07XHJcbnRoZW1lLmJyZWFrcG9pbnQgPSB7XHJcblx0dGFibGV0UG9ydHJhaXRNaW46ICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgMSkgKyAncHgnLFxyXG5cdHRhYmxldExhbmRzY2FwZU1pbjogKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgMSkgKyAncHgnLFxyXG5cdGRlc2t0b3BNaW46ICAgICAgICAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTGFyZ2VNaW46ICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgMSkgKyAncHgnLFxyXG5cclxuXHRtb2JpbGVNYXg6ICAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUgKyAncHgnLFxyXG5cdHRhYmxldFBvcnRyYWl0TWF4OiAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNYXg6ICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAncHgnLFxyXG5cdGRlc2t0b3BNYXg6ICAgICAgICAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLmRlc2t0b3AgKyAncHgnLFxyXG59O1xyXG5cclxuLy8gY29udGFpbmVyXHJcblxyXG50aGVtZS5jb250YWluZXIgPSB7XHJcblx0Z3V0dGVyOiAyMCxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogIDc1MCxcclxuXHRcdG1lZGl1bTogOTcwLFxyXG5cdFx0bGFyZ2U6IDExNzAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcblxyXG50aGVtZS5jb2xvciA9IHtcclxuXHRib2R5OiAgICAgICAgICAgICAgICAnI2ZhZmFmYScsXHJcblx0bGluazogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGxpbmtIb3ZlcjogICAgICAgICAgIGxpZ2h0ZW4oJyMxMzg1ZTUnLCAxMCksXHJcblx0dGV4dDogICAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cclxuXHQvLyBjb250ZXh0dWFsXHJcblx0c3VjY2VzczogICAgICAgICAgICAgJyMzNGMyNDAnLFxyXG5cdGNyZWF0ZTogICAgICAgICAgICAgICcjMzRjMjQwJywgLy8gYWxpYXMgZm9yIHN1Y2Nlc3NcclxuXHRwcmltYXJ5OiAgICAgICAgICAgICAnIzEzODVlNScsXHJcblx0aW5mbzogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLCAvLyBhbGlhcyBmb3IgcHJpbWFyeVxyXG5cdHdhcm5pbmc6ICAgICAgICAgICAgICcjRkEzJyxcclxuXHRkYW5nZXI6ICAgICAgICAgICAgICAnI2Q2NDI0MicsXHJcblx0ZXJyb3I6ICAgICAgICAgICAgICAgJyNkNjQyNDInLCAvLyBhbGlhcyBmb3IgZGFuZ2VyXHJcblxyXG5cdC8vIG5ldXRyYWxzXHJcblx0Z3JheTkwOiAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cdGdyYXk4MDogICAgICAgICAgICAgICcjMzMzJyxcclxuXHRncmF5NzA6ICAgICAgICAgICAgICAnIzRENEQ0RCcsXHJcblx0Z3JheTYwOiAgICAgICAgICAgICAgJyM2NjYnLFxyXG5cdGdyYXk1MDogICAgICAgICAgICAgICcjN0Y3RjdGJyxcclxuXHRncmF5NDA6ICAgICAgICAgICAgICAnIzk5OScsXHJcblx0Z3JheTMwOiAgICAgICAgICAgICAgJyNCM0IzQjMnLFxyXG5cdGdyYXkyMDogICAgICAgICAgICAgICcjQ0NDJyxcclxuXHRncmF5MTU6ICAgICAgICAgICAgICAnI0Q5RDlEOScsXHJcblx0Z3JheTEwOiAgICAgICAgICAgICAgJyNFNUU1RTUnLFxyXG5cdGdyYXkwNTogICAgICAgICAgICAgICcjRjJGMkYyJyxcclxuXHJcblx0Ly8gc29jaWFsXHJcblx0ZmFjZWJvb2s6ICAgICAgICAgICAgJyMzQjU5OTgnLFxyXG5cdGdvb2dsZTogICAgICAgICAgICAgICcjREM0RTQxJyxcclxuXHRpbnN0YWdyYW06ICAgICAgICAgICAnIzNmNzI5YicsXHJcblx0cGludGVyZXN0OiAgICAgICAgICAgJyNiZDA4MWMnLFxyXG5cdHR1bWJscjogICAgICAgICAgICAgICcjMzU0NjVjJyxcclxuXHR0d2l0dGVyOiAgICAgICAgICAgICAnIzU1QUNFRScsXHJcblx0eW91dHViZTogICAgICAgICAgICAgJyNjZDIwMWYnLFxyXG5cdHZpbWVvOiAgICAgICAgICAgICAgICcjMWFiN2VhJyxcclxufTtcclxuXHJcbi8vIGJvcmRlciByYWRpaVxyXG5cclxudGhlbWUuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHNtYWxsOiAnMC4xMjVyZW0nLFxyXG5cdGRlZmF1bHQ6ICcwLjNyZW0nLFxyXG5cdGxhcmdlOiAnMC41cmVtJyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuXHJcbnRoZW1lLnNwYWNpbmcgPSB7XHJcblx0eHNtYWxsOiAgICAgIDUsXHJcblx0c21hbGw6ICAgICAgIDEwLFxyXG5cdGRlZmF1bHQ6ICAgICAyMCxcclxuXHRsYXJnZTogICAgICAgMzAsXHJcblx0eGxhcmdlOiAgICAgIDQwLFxyXG5cdHh4bGFyZ2U6ICAgICA2MCxcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBFTEVNRU5UQUwgU1BFQ0lGSUNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBidXR0b25cclxuXHJcbnRoZW1lLmJ1dHRvbiA9IHtcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGZvbnQ6IHtcclxuXHRcdHdlaWdodDogNTAwLFxyXG5cdH0sXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcxZW0nLFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0cHJpbWFyeToge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5wcmltYXJ5LCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0fSxcclxuXHRzdWNjZXNzOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR9LFxyXG5cdHdhcm5pbmc6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3Iud2FybmluZywgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0ZGFuZ2VyOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IuZGFuZ2VyLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gYmxhbmsgc3RhdGVcclxuXHJcbnRoZW1lLmJsYW5rc3RhdGUgPSB7XHJcblx0YmFja2dyb3VuZDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDQpLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJzJlbScsXHJcblx0cGFkZGluZ1ZlcnRpY2FsOiAnNGVtJyxcclxufTtcclxuXHJcbi8vIGZvbnRcclxuXHJcbnRoZW1lLmZvbnQgPSB7XHJcblx0ZmFtaWx5OiB7XHJcblx0XHRtb25vOiAnTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlJyxcclxuXHRcdHNhbnNTZXJpZjogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXHJcblx0XHRzZXJpZjogJ0dlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmJyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHh4c21hbGw6ICcwLjY1cmVtJyxcclxuXHRcdHhzbWFsbDogJzAuNzVyZW0nLFxyXG5cdFx0c21hbGw6ICcwLjg1cmVtJyxcclxuXHRcdGRlZmF1bHQ6ICcxcmVtJyxcclxuXHRcdG1lZGl1bTogJzEuMnJlbScsXHJcblx0XHRsYXJnZTogJzEuNnJlbScsXHJcblx0XHR4bGFyZ2U6ICcyLjRyZW0nLFxyXG5cdFx0eHhsYXJnZTogJzMuMnJlbScsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGZvcm1cclxuXHJcbnRoZW1lLmZvcm0gPSB7XHJcblx0bGFiZWw6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NTAsXHJcblx0XHRmb250U2l6ZTogJzFyZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogJ25vcm1hbCcsXHJcblx0XHR3aWR0aDogMTgwLFxyXG5cdH0sXHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGZvbnRTaXplOiAnMC45ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnRcclxuXHJcbnRoZW1lLmNvbXBvbmVudCA9IHtcclxuXHRsaW5lSGVpZ2h0OiAnMi4zZW0nLFxyXG5cdGhlaWdodDogJzIuNGVtJyxcclxuXHRwYWRkaW5nOiAnMWVtJyxcclxufTtcclxuXHJcbi8vIGlucHV0XHJcblxyXG50aGVtZS5pbnB1dCA9IHtcclxuXHRiYWNrZ3JvdW5kOiB7XHJcblx0XHRkZWZhdWx0OiAnd2hpdGUnLFxyXG5cdFx0ZGlzYWJsZWQ6ICcjZmFmYWZhJyxcclxuXHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDIpLFxyXG5cdH0sXHJcblx0cGxhY2Vob2xkZXJDb2xvcjogJyNhYWEnLFxyXG5cdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdGhlaWdodDogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRib3JkZXI6IHtcclxuXHRcdGNvbG9yOiB7XHJcblx0XHRcdGRlZmF1bHQ6ICcjY2NjJyxcclxuXHRcdFx0Zm9jdXM6IHRoZW1lLmNvbG9yLmluZm8sXHJcblx0XHRcdGhvdmVyOiAnI2JiYicsXHJcblx0XHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDgpLFxyXG5cdFx0fSxcclxuXHRcdHJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG5cdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScsXHJcblx0Ym94U2hhZG93Rm9jdXM6IGBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IuaW5mbywgMTApfWAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcuNzVlbScsXHJcbn07XHJcblxyXG4vLyBzZWxlY3RcclxuXHJcbnRoZW1lLnNlbGVjdCA9IHtcclxuXHRib3hTaGFkb3c6ICcwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG59O1xyXG5cclxuLy8gYWxlcnRcclxuXHJcbnRoZW1lLmFsZXJ0ID0ge1xyXG5cdHBhZGRpbmc6ICcwLjc1ZW0gIDFlbScsXHJcblx0bWFyZ2luOiAnMCAwIDFlbScsXHJcblx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdH0sXHJcblx0XHRpbmZvOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR9LFxyXG5cdFx0d2FybmluZzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGdseXBoXHJcblxyXG50aGVtZS5nbHlwaCA9IHtcclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRpbmhlcml0OiAnaW5oZXJpdCcsXHJcblx0XHRpbnZlcnRlZDogJ3doaXRlJyxcclxuXHRcdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOiAxNixcclxuXHRcdG1lZGl1bTogMzIsXHJcblx0XHRsYXJnZTogNjQsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIG1vZGFsXHJcblxyXG50aGVtZS5tb2RhbCA9IHtcclxuXHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjgpJyxcclxuXHR6SW5kZXg6IDEwMCxcclxuXHRwYWRkaW5nOiB7XHJcblx0XHRkaWFsb2c6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogJzFlbScsXHJcblx0XHRcdHZlcnRpY2FsOiAwLFxyXG5cdFx0fSxcclxuXHRcdGJvZHk6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzFlbScsXHJcblx0XHR9LFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMC42ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gcGFnaW5hdGlvblxyXG5cclxudGhlbWUucGFnaW5hdGlvbiA9IHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cclxuXHRob3Zlcjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3doaXRlJyxcclxuXHRcdGJvcmRlcjogJ3JnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0c2VsZWN0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyxcclxuXHRcdGJvcmRlcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHNwaW5uZXJcclxuXHJcbnRoZW1lLnNwaW5uZXIgPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDpcdDQsXHJcblx0XHRtZWRpdW06XHQ4LFxyXG5cdFx0bGFyZ2U6XHQxNixcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcclxuIiwiLyoqXHJcblx0VmFsaWRhdGUgSGV4XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBoZXhcclxuXHJcblx0MS4gcmVtb3ZlIGhhc2ggaWYgcHJlc2VudFxyXG5cdDIuIGNvbnZlcnQgZnJvbSAzIHRvIDYgZGlnaXQgY29sb3IgY29kZSAmIGVuc3VyZSB2YWxpZCBoZXhcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSGV4IChjb2xvcikge1xyXG5cdGNvbnN0IGhleCA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblxyXG5cdGlmIChoZXgubGVuZ3RoID09PSAzKSB7XHJcblx0XHRyZXR1cm4gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xyXG5cdH1cclxuXHRpZiAoaGV4Lmxlbmd0aCAhPT0gNikge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbG9yIHZhbHVlIHByb3ZpZGVkOiBcIiR7Y29sb3J9XCJgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBoZXg7XHJcbn07XHJcblxyXG4vKipcclxuXHRGYWRlIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIGEgaGV4aWRlY2ltYWwgY29sb3IsIGNvbnZlcnRzIGl0IHRvIFJHQiBhbmQgYXBwbGllcyBhbiBhbHBoYSB2YWx1ZS5cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBjb252ZXJ0IGhleCB0byBSR0JcclxuXHQyLiBjb21iaW5lIGFuZCBhZGQgYWxwaGEgY2hhbm5lbFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gZmFkZSAoY29sb3IsIG9wYWNpdHkgPSAxMDApIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBvcGFjaXR5IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpO1xyXG5cdGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XHJcblx0Y29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcclxuXHJcblx0Ly8gMi5cclxuXHRjb25zdCByZXN1bHQgPSAncmdiYSgnXHJcblx0XHQrIHIgKyAnLCdcclxuXHRcdCsgZyArICcsJ1xyXG5cdFx0KyBiICsgJywnXHJcblx0XHQrIGRlY2ltYWxGcmFjdGlvblxyXG5cdFx0KyAnKSc7XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0U2hhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBsaWdodGVucyBvciBkYXJrZW5zXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvclxyXG5cdEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBzaGFkZSAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRsZXQgZiA9IHBhcnNlSW50KGhleCwgMTYpO1xyXG5cdGxldCB0ID0gZGVjaW1hbEZyYWN0aW9uIDwgMCA/IDAgOiAyNTU7XHJcblx0bGV0IHAgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gZGVjaW1hbEZyYWN0aW9uICogLTEgOiBkZWNpbWFsRnJhY3Rpb247XHJcblxyXG5cdGNvbnN0IFIgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQiA9IGYgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIFIpICogcCkgKyBSKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBHKSAqIHApICsgRykgKiAweDEwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEIpICogcCkgKyBCKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLy8gc2hhZGUgaGVscGVyc1xyXG5jb25zdCBsaWdodGVuID0gc2hhZGU7XHJcbmZ1bmN0aW9uIGRhcmtlbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRyZXR1cm4gc2hhZGUoY29sb3IsIHBlcmNlbnQgKiAtMSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0QmxlbmQgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgdHdvIGhleGlkZWNpbWFsIGNvbG9ycyBhbmQgYmxlbmQgdGhlbSB0b2dldGhlclxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IxXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yMlxyXG5cdEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBibGVuZCAoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleDEgPSB2YWxpZGF0ZUhleChjb2xvcjEpO1xyXG5cdGNvbnN0IGhleDIgPSB2YWxpZGF0ZUhleChjb2xvcjIpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IGYgPSBwYXJzZUludChoZXgxLCAxNik7XHJcblx0Y29uc3QgdCA9IHBhcnNlSW50KGhleDIsIDE2KTtcclxuXHJcblx0Y29uc3QgUjEgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcxID0gZiA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIxID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHRjb25zdCBSMiA9IHQgPj4gMTY7XHJcblx0Y29uc3QgRzIgPSB0ID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjIgPSB0ICYgMHgwMDAwRkY7XHJcblxyXG5cdC8vIDIuXHJcblx0cmV0dXJuICcjJyArICgweDEwMDAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKFIyIC0gUjEpICogZGVjaW1hbEZyYWN0aW9uKSArIFIxKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEcyIC0gRzEpICogZGVjaW1hbEZyYWN0aW9uKSArIEcxKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChCMiAtIEIxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBCMSkpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YmxlbmQsXHJcblx0ZGFya2VuLFxyXG5cdGZhZGUsXHJcblx0bGlnaHRlbixcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb25jYXRlbmF0ZSBDbGFzc25hbWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gU3VwcG9ydCBjbGFzc05hbWUgYXMgYW4gYXJyYXk6XHJcbi8vIGZvcmNlIGNsYXNzbmFtZSBwcm9wIGludG8gYW4gYXJyYXkgKHBvc3NpYmx5IG9mIGFycmF5cykgdGhlbiBmbGF0dGVuXHJcblxyXG4vKlxyXG5cdC8vIFRvIHVzZSBzcHJlYWQgdGhlIG5ldyBhcnJheSBpbnRvIGFwaHJvZGl0ZSdzIGBjc3NgIGZ1bmN0aW9uXHJcblxyXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5jb21wb25lbnQsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoY2xhc3NOYW1lKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH07XHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNhdENsYXNzbmFtZXMgKGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBbY2xhc3NOYW1lXS5yZWR1Y2UoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhLmNvbmNhdChiKTtcclxuXHR9LCBbXSk7XHJcbn07XHJcbiIsIi8qKlxyXG5cdExpbmVhciBHcmFkaWVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYWRkaW5nIGEgbGluZWFyIGdyYWRpZW50IHRvIHlvdXIgY29tcG9uZW50LlxyXG5cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBzaWRlT3JDb3JuZXJcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSB0b3BcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBib3R0b21cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBiYXNlIChvcHRpb25hbClcclxuXHQtIEByZXR1cm5zIHtPYmplY3R9IGNzcyBsaW5lYXIgZ3JhZGllbnQgZGVjbGFyYXRpb25cclxuXHJcblx0U3ByZWFkIHRoZSBkZWNsYXJhdGlvbiBpbnRvIHlvdXIgY29tcG9uZW50IGNsYXNzOlxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRteUNvbXBvbmVudENsYXNzOiB7XHJcblx0XHQuLi5saW5lYXJHcmFkaWVudChyZWQsIGJsdWUpLFxyXG5cdH1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGxpbmVhckdyYWRpZW50IChkaXJlY3Rpb24sIHRvcCwgYm90dG9tLCBiYXNlID0gJycpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2RpcmVjdGlvbn0sICR7dG9wfSAwJSwgJHtib3R0b219IDEwMCUpICR7YmFzZX1gLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIFZlcnRpY2FsIEdyYWRpZW50XHJcbmZ1bmN0aW9uIGdyYWRpZW50VmVydGljYWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byBib3R0b20nLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8vIEhvcml6b250YWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRIb3Jpem9udGFsICh0b3AsIGJvdHRvbSwgYmFzZSkge1xyXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudCgndG8gcmlnaHQnLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8qKlxyXG5cdEJvcmRlciBSYWRpdXNcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0U2hvcnQtaGFuZCBoZWxwZXIgZm9yIGJvcmRlciByYWRpaVxyXG4qL1xyXG5cclxuLy8gdG9wXHJcbmZ1bmN0aW9uIGJvcmRlclRvcFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gcmlnaHRcclxuZnVuY3Rpb24gYm9yZGVyUmlnaHRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBib3R0b21cclxuZnVuY3Rpb24gYm9yZGVyQm90dG9tUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBsZWZ0XHJcbmZ1bmN0aW9uIGJvcmRlckxlZnRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gUmV0dXJuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRib3JkZXJUb3BSYWRpdXMsXHJcblx0Ym9yZGVyUmlnaHRSYWRpdXMsXHJcblx0Ym9yZGVyQm90dG9tUmFkaXVzLFxyXG5cdGJvcmRlckxlZnRSYWRpdXMsXHJcblxyXG5cdGdyYWRpZW50SG9yaXpvbnRhbCxcclxuXHRncmFkaWVudFZlcnRpY2FsLFxyXG59O1xyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIl19
