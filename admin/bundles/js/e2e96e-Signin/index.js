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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkFwcC9lbGVtZW50YWwvQWxlcnQvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQWxlcnQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9CbGFua1N0YXRlL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9CdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NlbnRlci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0NoaXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0NoaXAvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9zaXplcy5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRHJvcGRvd25CdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1GaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUlucHV0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvbm9lZGl0LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtTGFiZWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtTm90ZS9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1TZWxlY3QvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1TZWxlY3Qvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhCdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoRmllbGQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL29jdGljb25zLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zaXplcy5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkQ29sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkUm93L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9HcmlkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9JbmxpbmVHcm91cFNlY3Rpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9MYWJlbGxlZENvbnRyb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0xvYWRpbmdCdXR0b24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2JvZHkuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2RpYWxvZy5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZm9vdGVyLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9oZWFkZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9QYWdpbmF0aW9uL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9QYWdpbmF0aW9uL3BhZ2UuanMiLCJBcHAvZWxlbWVudGFsL1Bhc3NDb250ZXh0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Qb3J0YWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Jlc3BvbnNpdmVUZXh0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TY3JlZW5SZWFkZXJPbmx5L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TY3JvbGxMb2NrL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvU2VnbWVudGVkQ29udHJvbC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9TcGlubmVyL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvaW5kZXguanMiLCJTaWduaW4vU2lnbmluLmpzIiwiU2lnbmluL2NvbXBvbmVudHMvQWxlcnQuanMiLCJTaWduaW4vY29tcG9uZW50cy9CcmFuZC5qcyIsIlNpZ25pbi9jb21wb25lbnRzL0xvZ2luRm9ybS5qcyIsIlNpZ25pbi9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwiU2lnbmluL2luZGV4LmpzIiwidGhlbWUuanMiLCJ1dGlscy9jb2xvci5qcyIsInV0aWxzL2NvbmNhdENsYXNzbmFtZXMuanMiLCJ1dGlscy9jc3MuanMiLCIuLi8uLi8uLi9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2hCLFNBQVEsZ0JBQU0sS0FBTixDQUFZLEtBQVosQ0FBa0IsTUFEVjtBQUVoQixRQUFPLGdCQUFNLEtBQU4sQ0FBWSxLQUFaLENBQWtCLE1B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dCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRhbmdlcjogdGhlbWUuYWxlcnQuY29sb3IuZGFuZ2VyLFxyXG5cdGVycm9yOiB0aGVtZS5hbGVydC5jb2xvci5kYW5nZXIsXHJcblx0aW5mbzogdGhlbWUuYWxlcnQuY29sb3IuaW5mbyxcclxuXHRzdWNjZXNzOiB0aGVtZS5hbGVydC5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmFsZXJ0LmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuLCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG4vLyBjbG9uZSBjaGlsZHJlbiBpZiBhIGNsYXNzIGV4aXN0cyBmb3IgdGhlIHRhZ25hbWVcclxuY29uc3QgY2xvbmVXaXRoQ2xhc3NuYW1lcyA9IChjKSA9PiB7XHJcblx0Y29uc3QgdHlwZSA9IGMudHlwZSAmJiBjLnR5cGUuZGlzcGxheU5hbWVcclxuXHRcdD8gYy50eXBlLmRpc3BsYXlOYW1lXHJcblx0XHQ6IGMudHlwZSB8fCBudWxsO1xyXG5cclxuXHRpZiAoIXR5cGUgfHwgIWNsYXNzZXNbdHlwZV0pIHJldHVybiBjO1xyXG5cclxuXHRyZXR1cm4gY2xvbmVFbGVtZW50KGMsIHtcclxuXHRcdGNsYXNzTmFtZTogY3NzKGNsYXNzZXNbdHlwZV0pLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQWxlcnQgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYWxlcnQsXHJcblx0XHRjbGFzc2VzW2NvbG9yXSxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblx0cHJvcHMuY2hpbGRyZW4gPSBDaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGNsb25lV2l0aENsYXNzbmFtZXMpO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IGRhdGEtYWxlcnQtdHlwZT17Y29sb3J9IC8+O1xyXG59O1xyXG5cclxuQWxlcnQucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSkuaXNSZXF1aXJlZCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5BbGVydC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZCxcclxuXHRcdGJvcmRlckNvbG9yOiBjb2xvcnNbY29sb3JdLmJvcmRlcixcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLnRleHQsXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIGhlYWRpbmdzXHJcbmNvbnN0IGhlYWRpbmdUYWduYW1lcyA9IHt9O1xyXG5bJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10uZm9yRWFjaCh0YWcgPT4ge1xyXG5cdGhlYWRpbmdUYWduYW1lc1t0YWddID0geyBjb2xvcjogJ2luaGVyaXQnIH07XHJcbn0pO1xyXG5cclxuY29uc3QgbGlua1N0eWxlcyA9IHtcclxuXHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxuXHJcblx0Jzpob3Zlcic6IHsgY29sb3I6ICdpbmhlcml0JyB9LFxyXG5cdCc6Zm9jdXMnOiB7IGNvbG9yOiAnaW5oZXJpdCcgfSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFsZXJ0OiB7XHJcblx0XHRib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYWxlcnQuYm9yZGVyUmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuYWxlcnQuYm9yZGVyV2lkdGgsXHJcblx0XHRtYXJnaW46IHRoZW1lLmFsZXJ0Lm1hcmdpbixcclxuXHRcdHBhZGRpbmc6IHRoZW1lLmFsZXJ0LnBhZGRpbmcsXHJcblx0fSxcclxuXHJcblx0Ly8gdGFnbmFtZXNcclxuXHRhOiBsaW5rU3R5bGVzLFxyXG5cdExpbms6IGxpbmtTdHlsZXMsXHJcblx0c3Ryb25nOiB7XHJcblx0XHRmb250V2VpZ2h0OiA1MDAsXHJcblx0fSxcclxuXHJcblx0Ly8gaGVhZGluZ3NcclxuXHQuLi5oZWFkaW5nVGFnbmFtZXMsXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBCbGFua1N0YXRlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGhlYWRpbmcsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udGFpbmVyLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfT5cclxuXHRcdFx0eyEhaGVhZGluZyAmJiA8aDIgZGF0YS1lMmUtYmxhbmstc3RhdGUtaGVhZGluZyBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmhlYWRpbmcpfT57aGVhZGluZ308L2gyPn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9Db21wb25lbnQ+XHJcblx0KTtcclxufTtcclxuXHJcbkJsYW5rU3RhdGUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSkuaXNSZXF1aXJlZCxcclxuXHRoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5CbGFua1N0YXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmxhbmtzdGF0ZS5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ibGFua3N0YXRlLmJvcmRlclJhZGl1cyxcclxuXHRcdGNvbG9yOiB0aGVtZS5ibGFua3N0YXRlLmNvbG9yLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nVmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nSG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nSG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ1ZlcnRpY2FsLFxyXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHR9LFxyXG5cclxuXHRoZWFkaW5nOiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbGFua1N0YXRlO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY29uc3QgY29tbW9uQ2xhc3NlcyA9IHN0eWxlcy5jb21tb247XHJcbmNvbnN0IHN0eWxlc2hlZXRDYWNoZSA9IHt9O1xyXG5mdW5jdGlvbiBnZXRTdHlsZVNoZWV0ICh2YXJpYW50LCBjb2xvcikge1xyXG5cdGNvbnN0IGNhY2hlS2V5ID0gYCR7dmFyaWFudH0tJHtjb2xvcn1gO1xyXG5cdGlmICghc3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XSkge1xyXG5cdFx0Y29uc3QgdmFyaWFudFN0eWxlcyA9IHN0eWxlc1t2YXJpYW50XShjb2xvcik7XHJcblx0XHRzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldID0gdmFyaWFudFN0eWxlcztcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV07XHJcbn1cclxuXHJcbmNvbnN0IEJVVFRPTl9TSVpFUyA9IFsnbGFyZ2UnLCAnbWVkaXVtJywgJ3NtYWxsJywgJ3hzbWFsbCddO1xyXG5jb25zdCBCVVRUT05fVkFSSUFOVFMgPSBbJ2ZpbGwnLCAnaG9sbG93JywgJ2xpbmsnXTtcclxuY29uc3QgQlVUVE9OX0NPTE9SUyA9IFsnZGVmYXVsdCcsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInLCAnY2FuY2VsJywgJ2RlbGV0ZSddO1xyXG5cclxuLy8gTk9URSBtdXN0IE5PVCBiZSBmdW5jdGlvbmFsIGNvbXBvbmVudCB0byBhbGxvdyBgcmVmc2BcclxuXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHZhciB7XHJcblx0XHRcdGFjdGl2ZSxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRibG9jayxcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjb2xvcixcclxuXHRcdFx0Y29tcG9uZW50OiBUYWcsXHJcblx0XHRcdGRpc2FibGVkLFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHR2YXJpYW50LFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gZ2V0IHRoZSBzdHlsZXNcclxuXHRcdGNvbnN0IHZhcmlhbnRDbGFzc2VzID0gZ2V0U3R5bGVTaGVldCh2YXJpYW50LCBjb2xvcik7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNvbW1vbkNsYXNzZXMuYmFzZSxcclxuXHRcdFx0Y29tbW9uQ2xhc3Nlc1tzaXplXSxcclxuXHRcdFx0dmFyaWFudENsYXNzZXMuYmFzZSxcclxuXHRcdFx0YmxvY2sgPyBjb21tb25DbGFzc2VzLmJsb2NrIDogbnVsbCxcclxuXHRcdFx0ZGlzYWJsZWQgPyBjb21tb25DbGFzc2VzLmRpc2FibGVkIDogbnVsbCxcclxuXHRcdFx0YWN0aXZlID8gdmFyaWFudENsYXNzZXMuYWN0aXZlIDogbnVsbCxcclxuXHRcdFx0Li4uYXBocm9kaXRlU3R5bGVzXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcmV0dXJuIGFuIGFuY2hvciBvciBidXR0b25cclxuXHRcdGlmICghVGFnKSB7XHJcblx0XHRcdFRhZyA9IHByb3BzLmhyZWYgPyAnYScgOiAnYnV0dG9uJztcclxuXHRcdH1cclxuXHRcdC8vIEVuc3VyZSBidXR0b25zIGRvbid0IHN1Ym1pdCBieSBkZWZhdWx0XHJcblx0XHRpZiAoVGFnID09PSAnYnV0dG9uJyAmJiAhcHJvcHMudHlwZSkge1xyXG5cdFx0XHRwcm9wcy50eXBlID0gJ2J1dHRvbic7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDxUYWcgey4uLnByb3BzfSAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSksXHJcblx0YmxvY2s6IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX0NPTE9SUyksXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0aHJlZjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX1NJWkVTKSxcclxuXHR2YXJpYW50OiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX1ZBUklBTlRTKSxcclxufTtcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFtdLFxyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcblx0dmFyaWFudDogJ2ZpbGwnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b247XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBCdXR0b25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgeyBncmFkaWVudFZlcnRpY2FsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3NzJztcclxuaW1wb3J0IHsgZGFya2VuLCBmYWRlLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuXHJcbi8vIENvbW1vbiBTdHlsZXNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZXhwb3J0cy5jb21tb24gPSB7XHJcblx0Ly8gQmFzZSBCdXR0b25cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0YmFzZToge1xyXG5cdFx0J2FwcGVhcmFuY2UnOiAnbm9uZScsXHJcblx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdCdib3JkZXJXaWR0aCc6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCxcclxuXHRcdCdib3JkZXJTdHlsZSc6ICdzb2xpZCcsXHJcblx0XHQnYm9yZGVyQ29sb3InOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0J2JvcmRlclJhZGl1cyc6IHRoZW1lLmJ1dHRvbi5ib3JkZXJSYWRpdXMsXHJcblx0XHQnY3Vyc29yJzogJ3BvaW50ZXInLFxyXG5cdFx0J2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdCdmb250V2VpZ2h0JzogdGhlbWUuYnV0dG9uLmZvbnQud2VpZ2h0LFxyXG5cdFx0J2hlaWdodCc6IHRoZW1lLmNvbXBvbmVudC5oZWlnaHQsXHJcblx0XHQnbGluZUhlaWdodCc6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0J21hcmdpbkJvdHRvbSc6IDAsXHJcblx0XHQncGFkZGluZyc6IGAwICR7dGhlbWUuYnV0dG9uLnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHQnb3V0bGluZSc6IDAsXHJcblx0XHQndGV4dEFsaWduJzogJ2NlbnRlcicsXHJcblx0XHQndG91Y2hBY3Rpb24nOiAnbWFuaXB1bGF0aW9uJyxcclxuXHRcdCd1c2VyU2VsZWN0JzogJ25vbmUnLFxyXG5cdFx0J3ZlcnRpY2FsQWxpZ24nOiAnbWlkZGxlJyxcclxuXHRcdCd3aGl0ZVNwYWNlJzogJ25vd3JhcCcsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbi5kZWZhdWx0LnRleHRDb2xvcixcclxuXHRcdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uLmRlZmF1bHQudGV4dENvbG9yLFxyXG5cdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdC8vIEJsb2NrIERpc3BsYXlcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0YmxvY2s6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdH0sXHJcblx0Ly8gRGlzYWJsZWRcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cdC8vIFNpemVzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGxhcmdlOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmxhcmdlLFxyXG5cdH0sXHJcblx0ZGVmYXVsdDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5kZWZhdWx0LFxyXG5cdH0sXHJcblx0c21hbGw6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0fSxcclxuXHR4c21hbGw6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUueHNtYWxsLFxyXG5cdFx0bGluZUhlaWdodDogJzEuOScsXHJcblx0XHRwYWRkaW5nTGVmdDogJy42NmVtJyxcclxuXHRcdHBhZGRpbmdSaWdodDogJy42NmVtJyxcclxuXHR9LFxyXG59O1xyXG5cclxuXHJcbi8vIEZpbGwgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkZpbGxWYXJpYW50ICh0ZXh0Q29sb3IsIGJnQ29sb3IpIHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCAxMCksIGRhcmtlbihiZ0NvbG9yLCA1KSksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDEwKSwgZGFya2VuKGJnQ29sb3IsIDUpKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfWAsXHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKGJnQ29sb3IsIDI1KX1gLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZGFya2VuKGJnQ29sb3IsIDEwKSxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCAyNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfWAsXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCA1KSwgZGFya2VuKGJnQ29sb3IsIDEwKSwgYmdDb2xvciksXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDIwKX0gJHtkYXJrZW4oYmdDb2xvciwgMjUpfWAsXHJcblx0XHRcdCdib3hTaGFkb3cnOiAnaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblx0XHRcdCdmb250V2VpZ2h0JzogNDAwLFxyXG5cdFx0XHQndGV4dFNoYWRvdyc6ICcwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMjUpJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGZvY3VzU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59XHJcbi8vIFRPRE86IFRoaXMgaXMgcHJldHR5IGhhY2t5LCBuZWVkcyB0byBiZSBjb25zb2xpZGF0ZWQgd2l0aCB0aGUgVmFyaWFudCgpIG1ldGhvZFxyXG4vLyBhYm92ZSAobmVlZHMgbW9yZSB0aGVtZSB2YXJpYWJsZXMgdG8gYmUgaW1wbGVtZW50ZWQgdGhvdWdoKVxyXG5mdW5jdGlvbiBidXR0b25GaWxsRGVmYXVsdCAoKSB7XHJcblx0Y29uc3QgYm9yZGVyQ29sb3IgPSB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdDtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwoJyNmZmYnLCAnI2VlZScpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbihib3JkZXJDb2xvciwgNSl9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCA1KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDEwKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c1N0eWxlcyA9IHtcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCl9YCxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZDogJyNlNmU2ZTYnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMTApLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLmdyYWRpZW50VmVydGljYWwoJyNmYWZhZmEnLCAnI2VhZWFlYScpLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBgJHtib3JkZXJDb2xvcn0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDYpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgMTIpfWAsXHJcblx0XHRcdCdjb2xvcic6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0XHRcdCd0ZXh0U2hhZG93JzogJzAgMXB4IDAgd2hpdGUnLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogZm9jdXNTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBncm9zcyBoYWNrXHJcblx0XHRhY3RpdmU6IHtcclxuXHRcdFx0Li4uYWN0aXZlU3R5bGVzLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0XHQuLi5hY3RpdmVTdHlsZXMsXHJcblx0XHRcdFx0Li4uZm9jdXNTdHlsZXMsXHJcblx0XHRcdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCl9LCBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpYCxcclxuXHRcdFx0fSxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuZXhwb3J0cy5maWxsID0gKGNvbG9yKSA9PiB7XHJcblx0c3dpdGNoIChjb2xvcikge1xyXG5cdFx0Y2FzZSAnZGVmYXVsdCc6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsRGVmYXVsdCgpO1xyXG5cdFx0Y2FzZSAnY2FuY2VsJzpcclxuXHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsVmFyaWFudCgnd2hpdGUnLCB0aGVtZS5idXR0b24uZGFuZ2VyLmJnQ29sb3IpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxWYXJpYW50KCd3aGl0ZScsIHRoZW1lLmJ1dHRvbltjb2xvcl0uYmdDb2xvcik7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8vIEhvbGxvdyBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uSG9sbG93VmFyaWFudCAodGV4dENvbG9yLCBib3JkZXJDb2xvcikge1xyXG5cdGNvbnN0IGZvY3VzQW5kSG92ZXJTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZShib3JkZXJDb2xvciwgMTUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMTUpLFxyXG5cdFx0Ym94U2hhZG93OiAnbm9uZScsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNPbmx5U3R5bGVzID0ge1xyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZShib3JkZXJDb2xvciwgMTApfWAsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUoYm9yZGVyQ29sb3IsIDM1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDI1KSxcclxuXHRcdGJveFNoYWRvdzogJ25vbmUnLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBib3JkZXJDb2xvcixcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGZvY3VzQW5kSG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMgJzogT2JqZWN0LmFzc2lnbih7fSwgZm9jdXNBbmRIb3ZlclN0eWxlcywgZm9jdXNPbmx5U3R5bGVzKSxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufTtcclxuZXhwb3J0cy5ob2xsb3cgPSAoY29sb3IpID0+IHtcclxuXHQvLyBUT0RPOiBiZXR0ZXIgaGFuZGxpbmcgb2YgY2FuY2VsIGFuZCBkZWxldGUgY29sb3JzXHJcblx0aWYgKGNvbG9yID09PSAnY2FuY2VsJyB8fCBjb2xvciA9PT0gJ2RlbGV0ZScpIGNvbG9yID0gJ2Rhbmdlcic7XHJcblxyXG5cdHJldHVybiBidXR0b25Ib2xsb3dWYXJpYW50KHRoZW1lLmJ1dHRvbltjb2xvcl0uYmdDb2xvciwgdGhlbWUuYnV0dG9uW2NvbG9yXS5ib3JkZXJDb2xvcik7XHJcbn07XHJcblxyXG5cclxuLy8gTGluayBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uTGlua1ZhcmlhbnQgKHRleHRDb2xvciwgaG92ZXJDb2xvcikge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Y29sb3I6IGhvdmVyQ29sb3IsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdFx0J2JvcmRlcic6IDAsXHJcblx0XHRcdCdib3hTaGFkb3cnOiAnbm9uZScsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHRcdFx0J2ZvbnRXZWlnaHQnOiAnbm9ybWFsJyxcclxuXHRcdFx0J291dGxpbmUnOiAnbm9uZScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBob3ZlclN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGhvdmVyU3R5bGVzLFxyXG5cdH07XHJcbn07XHJcbmZ1bmN0aW9uIGJ1dHRvbkxpbmtEZWxldGUgKCkge1xyXG5cdGNvbnN0IHN0eWxlcyA9IGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmdyYXk0MCwgdGhlbWUuY29sb3IuZGFuZ2VyKTtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSwgZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApKSxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDQpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEyKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA0KSxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEyKX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLnN0eWxlcy5iYXNlLFxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0cy5saW5rID0gKGNvbG9yKSA9PiB7XHJcblx0c3dpdGNoIChjb2xvcikge1xyXG5cdFx0Y2FzZSAnZGVmYXVsdCc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5saW5rLCB0aGVtZS5jb2xvci5saW5rSG92ZXIpO1xyXG5cdFx0Y2FzZSAnY2FuY2VsJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmdyYXk0MCwgdGhlbWUuY29sb3IuZGFuZ2VyKTtcclxuXHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rRGVsZXRlKCk7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3JbY29sb3JdLCB0aGVtZS5jb2xvcltjb2xvcl0pO1xyXG5cdH1cclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gQ2VudGVyICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGhlaWdodCxcclxuXHRzdHlsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuY2VudGVyLCBjbGFzc05hbWUpO1xyXG5cdHByb3BzLnN0eWxlID0geyBoZWlnaHQsIC4uLnN0eWxlIH07XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcbkNlbnRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRoZWlnaHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkNlbnRlci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHRoZWlnaHQ6ICdhdXRvJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2VudGVyO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ2VudGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y2VudGVyOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBmYWRlLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuY29uc3QgYmFzZUNvbG9ycyA9IHt9O1xyXG5bJ2RhbmdlcicsICdpbmZvJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ10uZm9yRWFjaChjb2xvciA9PiB7XHJcblx0YmFzZUNvbG9yc1tjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTApLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDIwKSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDE1KSxcclxuXHRcdHRleHQ6IHRoZW1lLmNvbG9yW2NvbG9yXSxcclxuXHR9O1xyXG59KTtcclxuY29uc3QgaW52ZXJ0ZWRDb2xvcnMgPSB7fTtcclxuWydkYW5nZXInLCAnaW5mbycsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZyddLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGludmVydGVkQ29sb3JzW2NvbG9yICsgJ19faW52ZXJ0ZWQnXSA9IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yW2NvbG9yXSxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGxpZ2h0ZW4odGhlbWUuY29sb3JbY29sb3JdLCA1KSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogbGlnaHRlbih0aGVtZS5jb2xvcltjb2xvcl0sIDE1KSxcclxuXHRcdHRleHQ6ICd3aGl0ZScsXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvci5ncmF5MTAsXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiB0aGVtZS5jb2xvci5ncmF5MjAsXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IHRoZW1lLmNvbG9yLmdyYXkxNSxcclxuXHRcdHRleHQ6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHR9LFxyXG5cdC4uLmJhc2VDb2xvcnMsXHJcblxyXG5cdC8vIGludmVydGVkXHJcblx0ZGVmYXVsdF9faW52ZXJ0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGxpZ2h0ZW4odGhlbWUuY29sb3IuZ3JheTYwLCA1KSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogbGlnaHRlbih0aGVtZS5jb2xvci5ncmF5NjAsIDE1KSxcclxuXHRcdHRleHQ6ICd3aGl0ZScsXHJcblx0fSxcclxuXHQuLi5pbnZlcnRlZENvbG9ycyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbmZ1bmN0aW9uIENoaXAgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y29sb3IsXHJcblx0aW52ZXJ0ZWQsXHJcblx0bGFiZWwsXHJcblx0b25DbGVhcixcclxuXHRvbkNsaWNrLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNoaXAsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cdGNvbnN0IGxhYmVsQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRjbGFzc2VzLmxhYmVsLFxyXG5cdFx0Y2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3IgKyAoaW52ZXJ0ZWQgPyAnX19pbnZlcnRlZCcgOiAnJyldXHJcblx0KTtcclxuXHRjb25zdCBjbGVhckNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0Y2xhc3Nlcy5jbGVhcixcclxuXHRcdGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yICsgKGludmVydGVkID8gJ19faW52ZXJ0ZWQnIDogJycpXVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9PlxyXG5cdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHR7ISFvbkNsZWFyICYmIChcclxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkNsZWFyfSBjbGFzc05hbWU9e2NsZWFyQ2xhc3NOYW1lfT5cclxuXHRcdFx0XHRcdCZ0aW1lcztcclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5DaGlwLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLmlzUmVxdWlyZWQsXHJcblx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0b25DbGVhcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0b25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcbkNoaXAuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENoaXA7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBib3JkZXJMZWZ0UmFkaXVzLCBib3JkZXJSaWdodFJhZGl1cyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nzcyc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kSG92ZXIsXHJcblx0fTtcclxuXHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmQsXHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXS50ZXh0LFxyXG5cclxuXHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdCc6YWN0aXZlJzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZEFjdGl2ZSxcclxuXHRcdH0sXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjaGlwOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0XHRmb250V2VpZ2h0OiA1MDAsXHJcblx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcyLjJlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gdGFnbmFtZXNcclxuXHRidXR0b246IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcclxuXHRcdGJvcmRlcjogJ25vbmUnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0ZmxvYXQ6ICdsZWZ0JyxcclxuXHRcdHBhZGRpbmc6ICcwIC45ZW0nLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cclxuXHRcdC8vIG1ha2UgcGlsbHMgLSBleGFnZ2VyYXRlIHRoZSBwYWRkaW5nIHRvd2FyZCB0aGUgcmFkaWkgc28gaXQgbG9va3MgZXZlblxyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHtcclxuXHRcdFx0Li4uYm9yZGVyTGVmdFJhZGl1cygnM2VtJyksXHJcblx0XHRcdHBhZGRpbmdMZWZ0OiAnMS4xZW0nLFxyXG5cdFx0fSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0Li4uYm9yZGVyUmlnaHRSYWRpdXMoJzNlbScpLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6ICcxLjFlbScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwcm92aWRlIHNlcGFyYXRpb24gYmV0d2VlbiB0aGUgbGFiZWwgYW5kIGNsZWFyIGJ1dHRvbnNcclxuXHQvLyBmbG9hdGluZyBzdG9wcyB0aGUgbWFyZ2lucyBmcm9tIGNvbGxhcHNpbmcgaW50byBlYWNoaW5nXHJcblxyXG5cdGxhYmVsOiB7IG1hcmdpblJpZ2h0OiAxIH0sXHJcblx0Y2xlYXI6IHsgbWFyZ2luTGVmdDogMSB9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIENvbnRhaW5lciAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjbGVhckZsb2F0aW5nQ2hpbGRyZW4sXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0d2lkdGgsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udGFpbmVyLFxyXG5cdFx0Y2xhc3Nlc1t3aWR0aF0sXHJcblx0XHRjbGVhckZsb2F0aW5nQ2hpbGRyZW4gPyBjbGFzc2VzLmNsZWFyZml4IDogbnVsbFxyXG5cdCk7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5Db250YWluZXIucHJvcFR5cGVzID0ge1xyXG5cdGNsZWFyRmxvYXRpbmdDaGlsZHJlbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKS5pc1JlcXVpcmVkLFxyXG5cdHdpZHRoOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoc2l6ZXMpKS5pc1JlcXVpcmVkLFxyXG59O1xyXG5Db250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0d2lkdGg6ICdsYXJnZScsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNtYWxsOiB0aGVtZS5jb250YWluZXIuc2l6ZS5zbWFsbCxcclxuXHRtZWRpdW06IHRoZW1lLmNvbnRhaW5lci5zaXplLm1lZGl1bSxcclxuXHRsYXJnZTogdGhlbWUuY29udGFpbmVyLnNpemUubGFyZ2UsXHJcbn07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb250YWluZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhzaXplcykuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbc2l6ZV0gPSB7XHJcblx0XHRtYXhXaWR0aDogc2l6ZXNbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vKlxyXG5cdE1pY3JvIGNsZWFyZml4IGhhY2tcclxuXHQxLlx0VGhlIHNwYWNlIGNvbnRlbnQgaXMgb25lIHdheSB0byBhdm9pZCBhbiBPcGVyYSBidWcgd2hlbiB0aGVcclxuXHRcdFx0Y29udGVudGVkaXRhYmxlIGF0dHJpYnV0ZSBpcyBpbmNsdWRlZCBhbnl3aGVyZSBlbHNlIGluIHRoZSBkb2N1bWVudC5cclxuXHRcdFx0T3RoZXJ3aXNlIGl0IGNhdXNlcyBzcGFjZSB0byBhcHBlYXIgYXQgdGhlIHRvcCBhbmQgYm90dG9tIG9mIGVsZW1lbnRzXHJcblx0XHRcdHRoYXQgYXJlIGNsZWFyZml4ZWQuXHJcblx0Mi5cdFRoZSB1c2Ugb2YgYHRhYmxlYCByYXRoZXIgdGhhbiBgYmxvY2tgIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIHVzaW5nXHJcblx0XHRcdGA6YmVmb3JlYCB0byBjb250YWluIHRoZSB0b3AtbWFyZ2lucyBvZiBjaGlsZCBlbGVtZW50cy5cclxuKi9cclxuY29uc3QgY2xlYXJmaXhTdHlsZXMgPSB7XHJcblx0Y2xlYXI6ICdib3RoJyxcclxuXHRjb250ZW50OiAnXCIgXCInLCAvLyAxXHJcblx0ZGlzcGxheTogJ3RhYmxlJywgLy8gMlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRtYXJnaW5MZWZ0OiAnYXV0bycsXHJcblx0XHRtYXJnaW5SaWdodDogJ2F1dG8nLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIsXHJcblx0fSxcclxuXHJcblx0Ly8gY2xlYXIgZmxvYXRpbmcgY2hpbGRyZW5cclxuXHRjbGVhcmZpeDoge1xyXG5cdFx0JzpiZWZvcmUnOiBjbGVhcmZpeFN0eWxlcyxcclxuXHRcdCc6YWZ0ZXInOiBjbGVhcmZpeFN0eWxlcyxcclxuXHR9LFxyXG5cclxuXHQvLyBzaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5cclxuZnVuY3Rpb24gRHJvcGRvd25CdXR0b24gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3cpfSAvPlxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIE5PVEVcclxuLy8gMTogdGFrZSBhZHZhbnRhZ2Ugb2YgYGN1cnJlbnRDb2xvcmAgYnkgbGVhdmluZyBib3JkZXIgdG9wIGNvbG9yIHVuZGVmaW5lZFxyXG4vLyAyOiBldmVuIHRob3VnaCB0aGUgYXJyb3cgaXMgdmVydGljYWxseSBjZW50ZXJlZCwgdmlzdWFsbHkgaXQgYXBwZWFycyB0b28gbG93XHJcbi8vICAgIGJlY2F1c2Ugb2YgbG93ZXJjYXNlIGNoYXJhY3RlcnMgYmVzaWRlIGl0XHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0YXJyb3c6IHtcclxuXHRcdGJvcmRlckxlZnQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSaWdodDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclRvcDogJzAuM2VtIHNvbGlkJywgLy8gMVxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IDAsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIDJcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblxyXG5cdFx0Ly8gYWRkIHNwYWNpbmdcclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdFx0fSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luTGVmdDogJzAuNWVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRHJvcGRvd25CdXR0b247XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xyXG5cclxuY2xhc3MgRm9ybUZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5mb3JtRmllbGRJZCA9IGdlbmVyYXRlSWQoKTtcclxuXHR9XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1GaWVsZElkOiB0aGlzLmZvcm1GaWVsZElkLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZm9ybUxheW91dCA9ICdiYXNpYycsIGxhYmVsV2lkdGggfSA9IHRoaXMuY29udGV4dDtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjcm9wTGFiZWwsXHJcblx0XHRcdGh0bWxGb3IsXHJcblx0XHRcdGxhYmVsLFxyXG5cdFx0XHRvZmZzZXRBYnNlbnRMYWJlbCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtRmllbGQsXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdLFxyXG5cdFx0XHRvZmZzZXRBYnNlbnRMYWJlbCA/IGNsYXNzZXNbJ0Zvcm1GaWVsZC0tb2Zmc2V0LWFic2VudC1sYWJlbCddIDogbnVsbCxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHRpZiAob2Zmc2V0QWJzZW50TGFiZWwgJiYgbGFiZWxXaWR0aCkge1xyXG5cdFx0XHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdFx0XHRwYWRkaW5nTGVmdDogbGFiZWxXaWR0aCxcclxuXHRcdFx0XHQuLi5wcm9wcy5zdHlsZSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBlbGVtZW50c1xyXG5cdFx0Y29uc3QgY29tcG9uZW50TGFiZWwgPSBsYWJlbCA/IChcclxuXHRcdFx0PEZvcm1MYWJlbCBodG1sRm9yPXtodG1sRm9yfSBjcm9wVGV4dD17Y3JvcExhYmVsfT5cclxuXHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdDwvRm9ybUxhYmVsPlxyXG5cdFx0KSA6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiB7Li4ucHJvcHN9IGh0bWxGb3I9e2h0bWxGb3J9PlxyXG5cdFx0XHRcdHtjb21wb25lbnRMYWJlbH1cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1GaWVsZC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuRm9ybUZpZWxkLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtRmllbGQucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdGNyb3BMYWJlbDogUHJvcFR5cGVzLmJvb2wsXHJcblx0aHRtbEZvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRvZmZzZXRBYnNlbnRMYWJlbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUlkICgpIHtcclxuXHRyZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtRmllbGQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIEZpZWxkXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtRmllbGQnOiB7XHJcblx0XHRtYXJnaW5Cb3R0b206ICcxZW0nLFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYSBob3Jpem9udGFsIGZvcm1cclxuXHJcblx0J0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtaG9yaXpvbnRhbCc6IHtcclxuXHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdGRpc3BsYXk6ICd0YWJsZScsXHJcblx0XHRcdHRhYmxlTGF5b3V0OiAnZml4ZWQnLFxyXG5cdFx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBpbnNpZGUgaG9yaXpvbnRhbCBmb3JtXHJcblx0Ly8gdHlwaWNhbGx5IGZvciB1c2Ugd2l0aCBzdWJtaXQgYnV0dG9uIGluc2lkZVxyXG5cdCdGb3JtRmllbGQtLW9mZnNldC1hYnNlbnQtbGFiZWwnOiB7XHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuZm9ybS5sYWJlbC53aWR0aCxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhbiBpbmxpbmUgZm9ybVxyXG5cclxuXHQnRm9ybUZpZWxkLS1mb3JtLWxheW91dC1pbmxpbmUnOiB7XHJcblx0XHQnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0J3BhZGRpbmdMZWZ0JzogJzAuMjVlbScsXHJcblx0XHQncGFkZGluZ1JpZ2h0JzogJzAuMjVlbScsXHJcblx0XHQndmVydGljYWxBbGlnbic6ICd0b3AnLFxyXG5cclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7IHBhZGRpbmdMZWZ0OiAwIH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7IHBhZGRpbmdSaWdodDogMCB9LFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29uY2F0Q2xhc3NuYW1lcyBmcm9tICcuLi8uLi8uLi91dGlscy9jb25jYXRDbGFzc25hbWVzJztcclxuaW1wb3J0IElucHV0Tm9lZGl0IGZyb20gJy4vbm9lZGl0JztcclxuXHJcbi8vIE5PVEUgbXVzdCBOT1QgYmUgZnVuY3Rpb25hbCBjb21wb25lbnQgdG8gYWxsb3cgYHJlZnNgXHJcblxyXG5jbGFzcyBGb3JtSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGJsdXIgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuYmx1cigpO1xyXG5cdH1cclxuXHRmb2N1cyAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5mb2N1cygpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0ZGlzYWJsZWQsXHJcblx0XHRcdGlkLFxyXG5cdFx0XHRtdWx0aWxpbmUsXHJcblx0XHRcdG5vZWRpdCxcclxuXHRcdFx0c2l6ZSxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIE5PVEUgcmV0dXJuIGEgZGlmZmVyZW50IGNvbXBvbmVudCBmb3IgYG5vZWRpdGBcclxuXHRcdGlmIChub2VkaXQpIHJldHVybiA8SW5wdXROb2VkaXQgey4uLnRoaXMucHJvcHN9IC8+O1xyXG5cclxuXHRcdGNvbnN0IHsgZm9ybUZpZWxkSWQsIGZvcm1MYXlvdXQgfSA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRwcm9wcy5pZCA9IGlkIHx8IGZvcm1GaWVsZElkO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm1JbnB1dCxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybUlucHV0X19zaXplLS0nICsgc2l6ZV0sXHJcblx0XHRcdGRpc2FibGVkID8gY2xhc3Nlc1snRm9ybUlucHV0LS1kaXNhYmxlZCddIDogbnVsbCxcclxuXHRcdFx0Zm9ybUxheW91dCA/IGNsYXNzZXNbJ0Zvcm1JbnB1dC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdIDogbnVsbCxcclxuXHRcdFx0Li4uY29uY2F0Q2xhc3NuYW1lcyhhcGhyb2RpdGVTdHlsZXMpXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc2V0UmVmID0gKG4pID0+ICh0aGlzLnRhcmdldCA9IG4pO1xyXG5cdFx0Y29uc3QgVGFnID0gbXVsdGlsaW5lID8gJ3RleHRhcmVhJyA6ICdpbnB1dCc7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFRhZ1xyXG5cdFx0XHRcdHJlZj17c2V0UmVmfVxyXG5cdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cclxuXHRcdFx0XHR7Li4ucHJvcHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUlucHV0LnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdG11bHRpbGluZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKFsnZGVmYXVsdCcsICdzbWFsbCcsICdsYXJnZSddKSxcclxuXHR0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG5cdHNpemU6ICdkZWZhdWx0JyxcclxuXHR0eXBlOiAndGV4dCcsXHJcbn07XHJcbkZvcm1JbnB1dC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1JbnB1dDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGZhZGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5mdW5jdGlvbiBGb3JtSW5wdXROb2VkaXQgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y3JvcFRleHQsXHJcblx0bXVsdGlsaW5lLFxyXG5cdG5vZWRpdCwgLy8gTk9URSBub3QgdXNlZCwganVzdCByZW1vdmVkIGZyb20gcHJvcHNcclxuXHR0eXBlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLm5vZWRpdCxcclxuXHRcdGNyb3BUZXh0ID8gY2xhc3Nlcy5jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRtdWx0aWxpbmUgPyBjbGFzc2VzLm11bHRpbGluZSA6IG51bGwsXHJcblx0XHQocHJvcHMuaHJlZiB8fCBwcm9wcy5vbkNsaWNrKSA/IGNsYXNzZXMuYW5jaG9yIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5Gb3JtSW5wdXROb2VkaXQucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Gb3JtSW5wdXROb2VkaXQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxuY29uc3QgYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdGJvcmRlckNvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRjb2xvcjogdGhlbWUuY29sb3IubGluayxcclxuXHRvdXRsaW5lOiAnbm9uZScsXHJcblx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRub2VkaXQ6IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5ub2VkaXQsXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3Iubm9lZGl0LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk4MCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0cGFkZGluZzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0dHJhbnNpdGlvbjogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHJcblx0XHQvLyBwcmV2ZW50IGVtcHR5IGlucHV0cyBmcm9tIGNvbGxhcHNpbmcgYnkgYWRkaW5nIGNvbnRlbnRcclxuXHRcdCc6ZW1wdHk6YmVmb3JlJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0XHRjb250ZW50OiAnXCIobm8gdmFsdWUpXCInLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHRtdWx0aWxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6ICdhdXRvJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjQnLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogJzAuNmVtJyxcclxuXHRcdHBhZGRpbmdUb3A6ICcwLjZlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gaW5kaWNhdGUgY2xpY2thYmlsaXR5IHdoZW4gdXNpbmcgYW4gYW5jaG9yXHJcblx0YW5jaG9yOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgNSksXHJcblx0XHRib3JkZXJDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IubGluayxcclxuXHRcdG1hcmdpblJpZ2h0OiA1LFxyXG5cdFx0bWluV2lkdGg6IDAsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUlucHV0Tm9lZGl0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBJbnB1dFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUlucHV0Jzoge1xyXG5cdFx0J2FwcGVhcmFuY2UnOiAnbm9uZScsXHJcblx0XHQnYmFja2dyb3VuZENvbG9yJzogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kZWZhdWx0LFxyXG5cdFx0J2JhY2tncm91bmRJbWFnZSc6ICdub25lJyxcclxuXHRcdCdib3JkZXJDb2xvcic6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0J2JvcmRlclJhZGl1cyc6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHQnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxyXG5cdFx0J2JvcmRlcldpZHRoJzogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0J2JveFNoYWRvdyc6IHRoZW1lLmlucHV0LmJveFNoYWRvdyxcclxuXHRcdCdjb2xvcic6ICdpbmhlcml0JywgLy8gRklYTUVcclxuXHRcdCdkaXNwbGF5JzogJ2Jsb2NrJyxcclxuXHRcdCdoZWlnaHQnOiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHQnbGluZUhlaWdodCc6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHQncGFkZGluZyc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdCd0cmFuc2l0aW9uJzogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHQnd2lkdGgnOiAnMTAwJScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ob3ZlcixcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCdGb3JtSW5wdXQtLWRpc2FibGVkJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRpc2FibGVkLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNpemVzXHJcblx0J0Zvcm1JbnB1dF9fc2l6ZS0tc21hbGwnOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdH0sXHJcblx0J0Zvcm1JbnB1dF9fc2l6ZS0tbGFyZ2UnOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmxhcmdlLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIEZvcm1MYWJlbCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y3JvcFRleHQsXHJcblx0aHRtbEZvcixcclxuXHQuLi5wcm9wc1xyXG59LFxyXG57XHJcblx0Zm9ybUZpZWxkSWQsXHJcblx0Zm9ybUxheW91dCxcclxuXHRsYWJlbFdpZHRoLFxyXG59KSB7XHJcblx0cHJvcHMuaHRtbEZvciA9IGh0bWxGb3IgfHwgZm9ybUZpZWxkSWQ7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5Gb3JtTGFiZWwsXHJcblx0XHRmb3JtTGF5b3V0ID8gY2xhc3Nlc1snRm9ybUxhYmVsLS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0gOiBudWxsLFxyXG5cdFx0Y3JvcFRleHQgPyBjbGFzc2VzWydGb3JtTGFiZWwtLWNyb3AtdGV4dCddIDogbnVsbCxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCk7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHRpZiAobGFiZWxXaWR0aCkge1xyXG5cdFx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRcdHdpZHRoOiBsYWJlbFdpZHRoLFxyXG5cdFx0XHQuLi5wcm9wcy5zdHlsZSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtTGFiZWwucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkZvcm1MYWJlbC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnbGFiZWwnLFxyXG59O1xyXG5Gb3JtTGFiZWwuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1MYWJlbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gTGFiZWxcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1MYWJlbCc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5mb3JtLmxhYmVsLmNvbG9yLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvcm0ubGFiZWwuZm9udFNpemUsXHJcblx0XHRmb250V2VpZ2h0OiB0aGVtZS5mb3JtLmxhYmVsLmZvbnRXZWlnaHQsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzAuNWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhIGhvcml6b250YWwgZm9ybVxyXG5cclxuXHQnRm9ybUxhYmVsLS1mb3JtLWxheW91dC1ob3Jpem9udGFsJzoge1xyXG5cdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0ZGlzcGxheTogJ3RhYmxlLWNlbGwnLFxyXG5cdFx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCwgLy8gZml4XHJcblx0XHRcdG1hcmdpbkJvdHRvbTogMCxcclxuXHRcdFx0cGFkZGluZ1JpZ2h0OiA1LFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdFx0d2lkdGg6IHRoZW1lLmZvcm0ubGFiZWwud2lkdGgsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIGNyb3AgbG9uZyB0ZXh0XHJcblxyXG5cdCdGb3JtTGFiZWwtLWNyb3AtdGV4dCc6IHtcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcclxuXHRcdHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIEZvcm1Ob3RlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGh0bWwsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLm5vdGUsIGNsYXNzTmFtZSk7XHJcblxyXG5cdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdGlmIChjaGlsZHJlbiAmJiBodG1sKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBGb3JtTm90ZSBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGBodG1sYC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGh0bWwgPyAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBodG1sIH19IC8+XHJcblx0KSA6IChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfT57Y2hpbGRyZW59PC9Db21wb25lbnQ+XHJcblx0KTtcclxufTtcclxuRm9ybU5vdGUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0aHRtbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybU5vdGUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1Ob3RlO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBOb3RlXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdG5vdGU6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5mb3JtLm5vdGUuY29sb3IsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9ybS5ub3RlLmZvbnRTaXplLFxyXG5cdFx0bWFyZ2luVG9wOiB0aGVtZS5zcGFjaW5nLnNtYWxsLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNsYXNzIEZvcm1TZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBpZCwgb3B0aW9ucywgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IGZvcm1GaWVsZElkIH0gPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLnNlbGVjdCxcclxuXHRcdFx0cHJvcHMuZGlzYWJsZWQgPyBjbGFzc2VzWydzZWxlY3QtLWRpc2FibGVkJ10gOiBudWxsXHJcblx0XHQpO1xyXG5cdFx0cHJvcHMuaWQgPSBpZCB8fCBmb3JtRmllbGRJZDtcclxuXHJcblx0XHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRcdGlmIChvcHRpb25zICYmIGNoaWxkcmVuKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IEZvcm1TZWxlY3QgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgb3B0aW9uc2AuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udGFpbmVyKX0+XHJcblx0XHRcdFx0e29wdGlvbnMgPyAoXHJcblx0XHRcdFx0XHQ8c2VsZWN0IHsuLi5wcm9wc30+e29wdGlvbnMubWFwKG9wdCA9PiAoXHJcblx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXtvcHQudmFsdWV9IHZhbHVlPXtvcHQudmFsdWV9PlxyXG5cdFx0XHRcdFx0XHRcdHtvcHQubGFiZWx9XHJcblx0XHRcdFx0XHRcdDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0XHQ8L3NlbGVjdD5cclxuXHRcdFx0XHQpIDogPHNlbGVjdCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L3NlbGVjdD59XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvd3MsIHByb3BzLmRpc2FibGVkID8gY2xhc3Nlc1snYXJyb3dzLS1kaXNhYmxlZCddIDogbnVsbCl9PlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlcy5hcnJvd1RvcCl9IC8+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93LCBjbGFzc2VzLmFycm93Qm90dG9tKX0gLz5cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5Gb3JtU2VsZWN0LmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybVNlbGVjdC5wcm9wVHlwZXMgPSB7XHJcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXHJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR9KVxyXG5cdCksXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1TZWxlY3Q7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIFNlbGVjdFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGRhcmtlbiwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0IG5vZGVcclxuXHRzZWxlY3Q6IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kZWZhdWx0LFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJCb3R0b21Db2xvcjogZGFya2VuKHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LCA0KSxcclxuXHRcdGJvcmRlclRvcENvbG9yOiBsaWdodGVuKHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LCA0KSxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdGJveFNoYWRvdzogdGhlbWUuc2VsZWN0LmJveFNoYWRvdyxcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsIC8vIEZJWE1FXHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0cGFkZGluZzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0dHJhbnNpdGlvbjogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHR3aWR0aDogJzEwMCUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuaG92ZXIsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5mb2N1cyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQnc2VsZWN0LS1kaXNhYmxlZCc6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kaXNhYmxlZCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBhcnJvd3NcclxuXHRhcnJvd3M6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0cmlnaHQ6IDAsXHJcblx0XHR0b3A6IDAsXHJcblx0XHR3aWR0aDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdH0sXHJcblx0YXJyb3c6IHtcclxuXHRcdGJvcmRlckxlZnQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSaWdodDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAwLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogMCxcclxuXHRcdHpJbmRleDogMSxcclxuXHR9LFxyXG5cdGFycm93VG9wOiB7XHJcblx0XHRib3JkZXJCb3R0b206ICcwLjNlbSBzb2xpZCcsXHJcblx0XHRtYXJnaW5Cb3R0b206ICcwLjFlbScsXHJcblx0fSxcclxuXHRhcnJvd0JvdHRvbToge1xyXG5cdFx0Ym9yZGVyVG9wOiAnMC4zZW0gc29saWQnLFxyXG5cdFx0bWFyZ2luVG9wOiAnMC4xZW0nLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1MYXlvdXQ6IHRoaXMucHJvcHMubGF5b3V0LFxyXG5cdFx0XHRsYWJlbFdpZHRoOiB0aGlzLnByb3BzLmxhYmVsV2lkdGgsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Ly8gTk9URSBgbGFiZWxXaWR0aGAgaXMgZGVjbGFyZWQgdG8gcmVtb3ZlIGl0IGZyb20gYHByb3BzYCwgdGhvdWdoIG5ldmVyIHVzZWRcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRcdFx0bGFiZWxXaWR0aCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG5cdFx0XHRsYXlvdXQsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybSxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybV9fJyArIGxheW91dF0sXHJcblx0XHRcdGNsYXNzTmFtZVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH1cclxufTtcclxuXHJcbkZvcm0uY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuRm9ybS5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRsYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG59O1xyXG5Gb3JtLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdmb3JtJyxcclxuXHRsYXlvdXQ6ICdiYXNpYycsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Rm9ybToge30sXHJcbn07XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IEdseXBoIGZyb20gJy4uL0dseXBoJztcclxuXHJcbmZ1bmN0aW9uIEdseXBoQnV0dG9uICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Z2x5cGgsXHJcblx0Z2x5cGhDb2xvcixcclxuXHRnbHlwaFNpemUsXHJcblx0Z2x5cGhTdHlsZSxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgaXNEZWZhdWx0ID0gcG9zaXRpb24gPT09ICdkZWZhdWx0JztcclxuXHRjb25zdCBpc0xlZnQgPSBwb3NpdGlvbiA9PT0gJ2xlZnQnO1xyXG5cdGNvbnN0IGlzUmlnaHQgPSBwb3NpdGlvbiA9PT0gJ3JpZ2h0JztcclxuXHJcblx0Y29uc3Qgb2Zmc2V0ID0ge307XHJcblx0aWYgKGlzTGVmdCkgb2Zmc2V0Lm1hcmdpblJpZ2h0ID0gJzAuNWVtJztcclxuXHRpZiAoaXNSaWdodCkgb2Zmc2V0Lm1hcmdpbkxlZnQgPSAnMC41ZW0nO1xyXG5cclxuXHRjb25zdCBnbHlwaFN0eWxlcyA9IHtcclxuXHRcdC4uLm9mZnNldCxcclxuXHRcdC4uLmdseXBoU3R5bGUsXHJcblx0fTtcclxuXHJcblx0Y29uc3QgaWNvbiA9IChcclxuXHRcdDxHbHlwaFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuZ2x5cGh9XHJcblx0XHRcdGNvbG9yPXtnbHlwaENvbG9yfVxyXG5cdFx0XHRuYW1lPXtnbHlwaH1cclxuXHRcdFx0c2l6ZT17Z2x5cGhTaXplfVxyXG5cdFx0XHRzdHlsZT17Z2x5cGhTdHlsZXN9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdHsoaXNEZWZhdWx0IHx8IGlzTGVmdCkgJiYgaWNvbn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHR7aXNSaWdodCAmJiBpY29ufVxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIEZvciBwcm9wcyBcImdseXBoXCIsIFwiZ2x5cGhDb2xvclwiLCBhbmQgXCJnbHlwaFNpemVcIjpcclxuLy8gcHJvcCB0eXBlIHZhbGlkYXRpb24gd2lsbCBvY2N1ciB3aXRoaW4gdGhlIEdseXBoIGNvbXBvbmVudCwgbm8gbmVlZCB0b1xyXG4vLyBkdXBsaWNhdGUsIGp1c3QgcGFzcyBpdCB0aHJvdWdoLlxyXG5HbHlwaEJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0Z2x5cGg6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnZGVmYXVsdCcsICdsZWZ0JywgJ3JpZ2h0J10pLFxyXG59O1xyXG5HbHlwaEJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Z2x5cGhTdHlsZToge30sXHJcblx0cG9zaXRpb246ICdkZWZhdWx0JywgLy8gbm8gbWFyZ2luLCBhc3N1bWVzIG5vIGNoaWxkcmVuXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdseXBoOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gZml4IGljb24gYWxpZ25tZW50XHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaEJ1dHRvbjtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0Zvcm1GaWVsZCc7XHJcbmltcG9ydCBHbHlwaCBmcm9tICcuLi9HbHlwaCc7XHJcblxyXG5mdW5jdGlvbiBHbHlwaEZpZWxkICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Z2x5cGgsXHJcblx0Z2x5cGhDb2xvcixcclxuXHRnbHlwaFNpemUsXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGlzTGVmdCA9IHBvc2l0aW9uID09PSAnbGVmdCc7XHJcblx0Y29uc3QgaXNSaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnO1xyXG5cclxuXHRjb25zdCBnbHlwaFN0eWxlcyA9IHt9O1xyXG5cdGlmIChpc0xlZnQpIGdseXBoU3R5bGVzLm1hcmdpblJpZ2h0ID0gJzAuNWVtJztcclxuXHRpZiAoaXNSaWdodCkgZ2x5cGhTdHlsZXMubWFyZ2luTGVmdCA9ICcwLjVlbSc7XHJcblxyXG5cdGNvbnN0IGljb24gPSAoXHJcblx0XHQ8R2x5cGhcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmdseXBofVxyXG5cdFx0XHRjb2xvcj17Z2x5cGhDb2xvcn1cclxuXHRcdFx0bmFtZT17Z2x5cGh9XHJcblx0XHRcdHNpemU9e2dseXBoU2l6ZX1cclxuXHRcdFx0c3R5bGU9e2dseXBoU3R5bGVzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEZpZWxkIGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy53cmFwcGVyfSB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7aXNMZWZ0ICYmIGljb259XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0e2lzUmlnaHQgJiYgaWNvbn1cclxuXHRcdDwvRmllbGQ+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIEZvciBwcm9wcyBcImdseXBoXCIsIFwiZ2x5cGhDb2xvclwiLCBhbmQgXCJnbHlwaFNpemVcIjpcclxuLy8gcHJvcCB0eXBlIHZhbGlkYXRpb24gd2lsbCBvY2N1ciB3aXRoaW4gdGhlIEdseXBoIGNvbXBvbmVudCwgbm8gbmVlZCB0b1xyXG4vLyBkdXBsaWNhdGUsIGp1c3QgcGFzcyBpdCB0aHJvdWdoLlxyXG5HbHlwaEZpZWxkLnByb3BUeXBlcyA9IHtcclxuXHRnbHlwaDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcclxufTtcclxuR2x5cGhGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0cG9zaXRpb246ICdsZWZ0JyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0d3JhcHBlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0fSxcclxuXHRnbHlwaDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIGZpeCBpY29uIGFsaWdubWVudFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGhGaWVsZDtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRhbmdlcjogdGhlbWUuZ2x5cGguY29sb3IuZGFuZ2VyLFxyXG5cdGluaGVyaXQ6IHRoZW1lLmdseXBoLmNvbG9yLmluaGVyaXQsXHJcblx0aW52ZXJ0ZWQ6IHRoZW1lLmdseXBoLmNvbG9yLmludmVydGVkLFxyXG5cdHByaW1hcnk6IHRoZW1lLmdseXBoLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuZ2x5cGguY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5nbHlwaC5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IG9jdGljb25zIGZyb20gJy4vb2N0aWNvbnMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG4vLyBGSVhNRSBzdGF0aWMgb2N0aWNvbiBjbGFzc2VzIGxlYW5pbmcgb24gRWxlbWVudGFsIHRvIGF2b2lkIGR1cGxpY2F0ZVxyXG4vLyBmb250IGFuZCBDU1M7IGluZmxhdGluZyB0aGUgcHJvamVjdCBzaXplXHJcblxyXG5mdW5jdGlvbiBHbHlwaCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0bmFtZSxcclxuXHRzaXplLFxyXG5cdHN0eWxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBjb2xvcklzVmFsaWRUeXBlID0gT2JqZWN0LmtleXMoY29sb3JzKS5pbmNsdWRlcyhjb2xvcik7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5nbHlwaCxcclxuXHRcdGNvbG9ySXNWYWxpZFR5cGUgJiYgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sXHJcblx0XHRjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpICsgYCAke29jdGljb25zW25hbWVdfWA7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gc3VwcG9ydCByYW5kb20gY29sb3Igc3RyaW5nc1xyXG5cdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0Y29sb3I6ICFjb2xvcklzVmFsaWRUeXBlID8gY29sb3IgOiBudWxsLFxyXG5cdFx0Li4uc3R5bGUsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkdseXBoLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pLFxyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsIC8vIHN1cHBvcnQgcmFuZG9tIGNvbG9yIHN0cmluZ3NcclxuXHRdKSxcclxuXHRuYW1lOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMob2N0aWNvbnMpKS5pc1JlcXVpcmVkLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhzaXplcykpLFxyXG59O1xyXG5HbHlwaC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnaScsXHJcblx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHRzaXplOiAnc21hbGwnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaDtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWxlcnQ6ICdvY3RpY29uIG9jdGljb24tYWxlcnQnLFxyXG5cdCdhcnJvdy1kb3duJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1kb3duJyxcclxuXHQnYXJyb3ctbGVmdCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctbGVmdCcsXHJcblx0J2Fycm93LXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1yaWdodCcsXHJcblx0J2Fycm93LXNtYWxsLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLWRvd24nLFxyXG5cdCdhcnJvdy1zbWFsbC1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1sZWZ0JyxcclxuXHQnYXJyb3ctc21hbGwtcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLXJpZ2h0JyxcclxuXHQnYXJyb3ctc21hbGwtdXAnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLXVwJyxcclxuXHQnYXJyb3ctdXAnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXVwJyxcclxuXHRtaWNyb3Njb3BlOiAnb2N0aWNvbiBvY3RpY29uLW1pY3Jvc2NvcGUnLFxyXG5cdGJlYWtlcjogJ29jdGljb24gb2N0aWNvbi1iZWFrZXInLFxyXG5cdGJlbGw6ICdvY3RpY29uIG9jdGljb24tYmVsbCcsXHJcblx0Ym9vazogJ29jdGljb24gb2N0aWNvbi1ib29rJyxcclxuXHRib29rbWFyazogJ29jdGljb24gb2N0aWNvbi1ib29rbWFyaycsXHJcblx0YnJpZWZjYXNlOiAnb2N0aWNvbiBvY3RpY29uLWJyaWVmY2FzZScsXHJcblx0YnJvYWRjYXN0OiAnb2N0aWNvbiBvY3RpY29uLWJyb2FkY2FzdCcsXHJcblx0YnJvd3NlcjogJ29jdGljb24gb2N0aWNvbi1icm93c2VyJyxcclxuXHRidWc6ICdvY3RpY29uIG9jdGljb24tYnVnJyxcclxuXHRjYWxlbmRhcjogJ29jdGljb24gb2N0aWNvbi1jYWxlbmRhcicsXHJcblx0Y2hlY2s6ICdvY3RpY29uIG9jdGljb24tY2hlY2snLFxyXG5cdGNoZWNrbGlzdDogJ29jdGljb24gb2N0aWNvbi1jaGVja2xpc3QnLFxyXG5cdCdjaGV2cm9uLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tZG93bicsXHJcblx0J2NoZXZyb24tbGVmdCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1sZWZ0JyxcclxuXHQnY2hldnJvbi1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1yaWdodCcsXHJcblx0J2NoZXZyb24tdXAnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tdXAnLFxyXG5cdCdjaXJjbGUtc2xhc2gnOiAnb2N0aWNvbiBvY3RpY29uLWNpcmNsZS1zbGFzaCcsXHJcblx0J2NpcmN1aXQtYm9hcmQnOiAnb2N0aWNvbiBvY3RpY29uLWNpcmN1aXQtYm9hcmQnLFxyXG5cdGNsaXBweTogJ29jdGljb24gb2N0aWNvbi1jbGlwcHknLFxyXG5cdGNsb2NrOiAnb2N0aWNvbiBvY3RpY29uLWNsb2NrJyxcclxuXHQnY2xvdWQtZG93bmxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWNsb3VkLWRvd25sb2FkJyxcclxuXHQnY2xvdWQtdXBsb2FkJzogJ29jdGljb24gb2N0aWNvbi1jbG91ZC11cGxvYWQnLFxyXG5cdGNvZGU6ICdvY3RpY29uIG9jdGljb24tY29kZScsXHJcblx0J2NvbG9yLW1vZGUnOiAnb2N0aWNvbiBvY3RpY29uLWNvbG9yLW1vZGUnLFxyXG5cdCdjb21tZW50LWFkZCc6ICdvY3RpY29uIG9jdGljb24tY29tbWVudC1hZGQnLFxyXG5cdGNvbW1lbnQ6ICdvY3RpY29uIG9jdGljb24tY29tbWVudCcsXHJcblx0J2NvbW1lbnQtZGlzY3Vzc2lvbic6ICdvY3RpY29uIG9jdGljb24tY29tbWVudC1kaXNjdXNzaW9uJyxcclxuXHQnY3JlZGl0LWNhcmQnOiAnb2N0aWNvbiBvY3RpY29uLWNyZWRpdC1jYXJkJyxcclxuXHRkYXNoOiAnb2N0aWNvbiBvY3RpY29uLWRhc2gnLFxyXG5cdGRhc2hib2FyZDogJ29jdGljb24gb2N0aWNvbi1kYXNoYm9hcmQnLFxyXG5cdGRhdGFiYXNlOiAnb2N0aWNvbiBvY3RpY29uLWRhdGFiYXNlJyxcclxuXHRjbG9uZTogJ29jdGljb24gb2N0aWNvbi1jbG9uZScsXHJcblx0J2Rlc2t0b3AtZG93bmxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWRlc2t0b3AtZG93bmxvYWQnLFxyXG5cdCdkZXZpY2UtY2FtZXJhJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtY2FtZXJhJyxcclxuXHQnZGV2aWNlLWNhbWVyYS12aWRlbyc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWNhbWVyYS12aWRlbycsXHJcblx0J2RldmljZS1kZXNrdG9wJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtZGVza3RvcCcsXHJcblx0J2RldmljZS1tb2JpbGUnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1tb2JpbGUnLFxyXG5cdGRpZmY6ICdvY3RpY29uIG9jdGljb24tZGlmZicsXHJcblx0J2RpZmYtYWRkZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtYWRkZWQnLFxyXG5cdCdkaWZmLWlnbm9yZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtaWdub3JlZCcsXHJcblx0J2RpZmYtbW9kaWZpZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtbW9kaWZpZWQnLFxyXG5cdCdkaWZmLXJlbW92ZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtcmVtb3ZlZCcsXHJcblx0J2RpZmYtcmVuYW1lZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1yZW5hbWVkJyxcclxuXHRlbGxpcHNpczogJ29jdGljb24gb2N0aWNvbi1lbGxpcHNpcycsXHJcblx0J2V5ZS11bndhdGNoJzogJ29jdGljb24gb2N0aWNvbi1leWUtdW53YXRjaCcsXHJcblx0J2V5ZS13YXRjaCc6ICdvY3RpY29uIG9jdGljb24tZXllLXdhdGNoJyxcclxuXHRleWU6ICdvY3RpY29uIG9jdGljb24tZXllJyxcclxuXHQnZmlsZS1iaW5hcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtYmluYXJ5JyxcclxuXHQnZmlsZS1jb2RlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWNvZGUnLFxyXG5cdCdmaWxlLWRpcmVjdG9yeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1kaXJlY3RvcnknLFxyXG5cdCdmaWxlLW1lZGlhJzogJ29jdGljb24gb2N0aWNvbi1maWxlLW1lZGlhJyxcclxuXHQnZmlsZS1wZGYnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtcGRmJyxcclxuXHQnZmlsZS1zdWJtb2R1bGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3VibW9kdWxlJyxcclxuXHQnZmlsZS1zeW1saW5rLWRpcmVjdG9yeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zeW1saW5rLWRpcmVjdG9yeScsXHJcblx0J2ZpbGUtc3ltbGluay1maWxlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN5bWxpbmstZmlsZScsXHJcblx0J2ZpbGUtdGV4dCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS10ZXh0JyxcclxuXHQnZmlsZS16aXAnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtemlwJyxcclxuXHRmbGFtZTogJ29jdGljb24gb2N0aWNvbi1mbGFtZScsXHJcblx0Zm9sZDogJ29jdGljb24gb2N0aWNvbi1mb2xkJyxcclxuXHRnZWFyOiAnb2N0aWNvbiBvY3RpY29uLWdlYXInLFxyXG5cdGdpZnQ6ICdvY3RpY29uIG9jdGljb24tZ2lmdCcsXHJcblx0Z2lzdDogJ29jdGljb24gb2N0aWNvbi1naXN0JyxcclxuXHQnZ2lzdC1zZWNyZXQnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3Qtc2VjcmV0JyxcclxuXHQnZ2l0LWJyYW5jaC1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gtY3JlYXRlJyxcclxuXHQnZ2l0LWJyYW5jaC1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gtZGVsZXRlJyxcclxuXHQnZ2l0LWJyYW5jaCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaCcsXHJcblx0J2dpdC1jb21taXQnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1jb21taXQnLFxyXG5cdCdnaXQtY29tcGFyZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWNvbXBhcmUnLFxyXG5cdCdnaXQtbWVyZ2UnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1tZXJnZScsXHJcblx0J2dpdC1wdWxsLXJlcXVlc3QtYWJhbmRvbmVkJzogJ29jdGljb24gb2N0aWNvbi1naXQtcHVsbC1yZXF1ZXN0LWFiYW5kb25lZCcsXHJcblx0J2dpdC1wdWxsLXJlcXVlc3QnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1wdWxsLXJlcXVlc3QnLFxyXG5cdGdsb2JlOiAnb2N0aWNvbiBvY3RpY29uLWdsb2JlJyxcclxuXHRncmFwaDogJ29jdGljb24gb2N0aWNvbi1ncmFwaCcsXHJcblx0aGVhcnQ6ICdvY3RpY29uIG9jdGljb24taGVhcnQnLFxyXG5cdGhpc3Rvcnk6ICdvY3RpY29uIG9jdGljb24taGlzdG9yeScsXHJcblx0aG9tZTogJ29jdGljb24gb2N0aWNvbi1ob21lJyxcclxuXHQnaG9yaXpvbnRhbC1ydWxlJzogJ29jdGljb24gb2N0aWNvbi1ob3Jpem9udGFsLXJ1bGUnLFxyXG5cdGh1Ym90OiAnb2N0aWNvbiBvY3RpY29uLWh1Ym90JyxcclxuXHRpbmJveDogJ29jdGljb24gb2N0aWNvbi1pbmJveCcsXHJcblx0aW5mbzogJ29jdGljb24gb2N0aWNvbi1pbmZvJyxcclxuXHQnaXNzdWUtY2xvc2VkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1jbG9zZWQnLFxyXG5cdCdpc3N1ZS1vcGVuZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLW9wZW5lZCcsXHJcblx0J2lzc3VlLXJlb3BlbmVkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1yZW9wZW5lZCcsXHJcblx0amVyc2V5OiAnb2N0aWNvbiBvY3RpY29uLWplcnNleScsXHJcblx0a2V5OiAnb2N0aWNvbiBvY3RpY29uLWtleScsXHJcblx0a2V5Ym9hcmQ6ICdvY3RpY29uIG9jdGljb24ta2V5Ym9hcmQnLFxyXG5cdGxhdzogJ29jdGljb24gb2N0aWNvbi1sYXcnLFxyXG5cdCdsaWdodC1idWxiJzogJ29jdGljb24gb2N0aWNvbi1saWdodC1idWxiJyxcclxuXHRsaW5rOiAnb2N0aWNvbiBvY3RpY29uLWxpbmsnLFxyXG5cdCdsaW5rLWV4dGVybmFsJzogJ29jdGljb24gb2N0aWNvbi1saW5rLWV4dGVybmFsJyxcclxuXHQnbGlzdC1vcmRlcmVkJzogJ29jdGljb24gb2N0aWNvbi1saXN0LW9yZGVyZWQnLFxyXG5cdCdsaXN0LXVub3JkZXJlZCc6ICdvY3RpY29uIG9jdGljb24tbGlzdC11bm9yZGVyZWQnLFxyXG5cdGxvY2F0aW9uOiAnb2N0aWNvbiBvY3RpY29uLWxvY2F0aW9uJyxcclxuXHQnZ2lzdC1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1naXN0LXByaXZhdGUnLFxyXG5cdCdtaXJyb3ItcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tbWlycm9yLXByaXZhdGUnLFxyXG5cdCdnaXQtZm9yay1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtZm9yay1wcml2YXRlJyxcclxuXHRsb2NrOiAnb2N0aWNvbiBvY3RpY29uLWxvY2snLFxyXG5cdCdsb2dvLWdpdGh1Yic6ICdvY3RpY29uIG9jdGljb24tbG9nby1naXRodWInLFxyXG5cdG1haWw6ICdvY3RpY29uIG9jdGljb24tbWFpbCcsXHJcblx0J21haWwtcmVhZCc6ICdvY3RpY29uIG9jdGljb24tbWFpbC1yZWFkJyxcclxuXHQnbWFpbC1yZXBseSc6ICdvY3RpY29uIG9jdGljb24tbWFpbC1yZXBseScsXHJcblx0J21hcmstZ2l0aHViJzogJ29jdGljb24gb2N0aWNvbi1tYXJrLWdpdGh1YicsXHJcblx0bWFya2Rvd246ICdvY3RpY29uIG9jdGljb24tbWFya2Rvd24nLFxyXG5cdG1lZ2FwaG9uZTogJ29jdGljb24gb2N0aWNvbi1tZWdhcGhvbmUnLFxyXG5cdG1lbnRpb246ICdvY3RpY29uIG9jdGljb24tbWVudGlvbicsXHJcblx0bWlsZXN0b25lOiAnb2N0aWNvbiBvY3RpY29uLW1pbGVzdG9uZScsXHJcblx0J21pcnJvci1wdWJsaWMnOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvci1wdWJsaWMnLFxyXG5cdG1pcnJvcjogJ29jdGljb24gb2N0aWNvbi1taXJyb3InLFxyXG5cdCdtb3J0YXItYm9hcmQnOiAnb2N0aWNvbiBvY3RpY29uLW1vcnRhci1ib2FyZCcsXHJcblx0bXV0ZTogJ29jdGljb24gb2N0aWNvbi1tdXRlJyxcclxuXHQnbm8tbmV3bGluZSc6ICdvY3RpY29uIG9jdGljb24tbm8tbmV3bGluZScsXHJcblx0b2N0b2ZhY2U6ICdvY3RpY29uIG9jdGljb24tb2N0b2ZhY2UnLFxyXG5cdG9yZ2FuaXphdGlvbjogJ29jdGljb24gb2N0aWNvbi1vcmdhbml6YXRpb24nLFxyXG5cdHBhY2thZ2U6ICdvY3RpY29uIG9jdGljb24tcGFja2FnZScsXHJcblx0cGFpbnRjYW46ICdvY3RpY29uIG9jdGljb24tcGFpbnRjYW4nLFxyXG5cdHBlbmNpbDogJ29jdGljb24gb2N0aWNvbi1wZW5jaWwnLFxyXG5cdCdwZXJzb24tYWRkJzogJ29jdGljb24gb2N0aWNvbi1wZXJzb24tYWRkJyxcclxuXHQncGVyc29uLWZvbGxvdyc6ICdvY3RpY29uIG9jdGljb24tcGVyc29uLWZvbGxvdycsXHJcblx0cGVyc29uOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbicsXHJcblx0cGluOiAnb2N0aWNvbiBvY3RpY29uLXBpbicsXHJcblx0cGx1ZzogJ29jdGljb24gb2N0aWNvbi1wbHVnJyxcclxuXHQncmVwby1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tY3JlYXRlJyxcclxuXHQnZ2lzdC1uZXcnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtbmV3JyxcclxuXHQnZmlsZS1kaXJlY3RvcnktY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWRpcmVjdG9yeS1jcmVhdGUnLFxyXG5cdCdmaWxlLWFkZCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1hZGQnLFxyXG5cdHBsdXM6ICdvY3RpY29uIG9jdGljb24tcGx1cycsXHJcblx0J3ByaW1pdGl2ZS1kb3QnOiAnb2N0aWNvbiBvY3RpY29uLXByaW1pdGl2ZS1kb3QnLFxyXG5cdCdwcmltaXRpdmUtc3F1YXJlJzogJ29jdGljb24gb2N0aWNvbi1wcmltaXRpdmUtc3F1YXJlJyxcclxuXHRwdWxzZTogJ29jdGljb24gb2N0aWNvbi1wdWxzZScsXHJcblx0cXVlc3Rpb246ICdvY3RpY29uIG9jdGljb24tcXVlc3Rpb24nLFxyXG5cdHF1b3RlOiAnb2N0aWNvbiBvY3RpY29uLXF1b3RlJyxcclxuXHQncmFkaW8tdG93ZXInOiAnb2N0aWNvbiBvY3RpY29uLXJhZGlvLXRvd2VyJyxcclxuXHQncmVwby1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZGVsZXRlJyxcclxuXHRyZXBvOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8nLFxyXG5cdCdyZXBvLWNsb25lJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWNsb25lJyxcclxuXHQncmVwby1mb3JjZS1wdXNoJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWZvcmNlLXB1c2gnLFxyXG5cdCdnaXN0LWZvcmsnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtZm9yaycsXHJcblx0J3JlcG8tZm9ya2VkJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWZvcmtlZCcsXHJcblx0J3JlcG8tcHVsbCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1wdWxsJyxcclxuXHQncmVwby1wdXNoJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXB1c2gnLFxyXG5cdHJvY2tldDogJ29jdGljb24gb2N0aWNvbi1yb2NrZXQnLFxyXG5cdHJzczogJ29jdGljb24gb2N0aWNvbi1yc3MnLFxyXG5cdHJ1Ynk6ICdvY3RpY29uIG9jdGljb24tcnVieScsXHJcblx0J3NjcmVlbi1mdWxsJzogJ29jdGljb24gb2N0aWNvbi1zY3JlZW4tZnVsbCcsXHJcblx0J3NjcmVlbi1ub3JtYWwnOiAnb2N0aWNvbiBvY3RpY29uLXNjcmVlbi1ub3JtYWwnLFxyXG5cdCdzZWFyY2gtc2F2ZSc6ICdvY3RpY29uIG9jdGljb24tc2VhcmNoLXNhdmUnLFxyXG5cdHNlYXJjaDogJ29jdGljb24gb2N0aWNvbi1zZWFyY2gnLFxyXG5cdHNlcnZlcjogJ29jdGljb24gb2N0aWNvbi1zZXJ2ZXInLFxyXG5cdHNldHRpbmdzOiAnb2N0aWNvbiBvY3RpY29uLXNldHRpbmdzJyxcclxuXHRzaGllbGQ6ICdvY3RpY29uIG9jdGljb24tc2hpZWxkJyxcclxuXHQnbG9nLWluJzogJ29jdGljb24gb2N0aWNvbi1sb2ctaW4nLFxyXG5cdCdzaWduLWluJzogJ29jdGljb24gb2N0aWNvbi1zaWduLWluJyxcclxuXHQnbG9nLW91dCc6ICdvY3RpY29uIG9jdGljb24tbG9nLW91dCcsXHJcblx0J3NpZ24tb3V0JzogJ29jdGljb24gb2N0aWNvbi1zaWduLW91dCcsXHJcblx0c3F1aXJyZWw6ICdvY3RpY29uIG9jdGljb24tc3F1aXJyZWwnLFxyXG5cdCdzdGFyLWFkZCc6ICdvY3RpY29uIG9jdGljb24tc3Rhci1hZGQnLFxyXG5cdCdzdGFyLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tc3Rhci1kZWxldGUnLFxyXG5cdHN0YXI6ICdvY3RpY29uIG9jdGljb24tc3RhcicsXHJcblx0c3RvcDogJ29jdGljb24gb2N0aWNvbi1zdG9wJyxcclxuXHQncmVwby1zeW5jJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXN5bmMnLFxyXG5cdHN5bmM6ICdvY3RpY29uIG9jdGljb24tc3luYycsXHJcblx0J3RhZy1yZW1vdmUnOiAnb2N0aWNvbiBvY3RpY29uLXRhZy1yZW1vdmUnLFxyXG5cdCd0YWctYWRkJzogJ29jdGljb24gb2N0aWNvbi10YWctYWRkJyxcclxuXHR0YWc6ICdvY3RpY29uIG9jdGljb24tdGFnJyxcclxuXHR0ZWxlc2NvcGU6ICdvY3RpY29uIG9jdGljb24tdGVsZXNjb3BlJyxcclxuXHR0ZXJtaW5hbDogJ29jdGljb24gb2N0aWNvbi10ZXJtaW5hbCcsXHJcblx0J3RocmVlLWJhcnMnOiAnb2N0aWNvbiBvY3RpY29uLXRocmVlLWJhcnMnLFxyXG5cdHRodW1ic2Rvd246ICdvY3RpY29uIG9jdGljb24tdGh1bWJzZG93bicsXHJcblx0dGh1bWJzdXA6ICdvY3RpY29uIG9jdGljb24tdGh1bWJzdXAnLFxyXG5cdHRvb2xzOiAnb2N0aWNvbiBvY3RpY29uLXRvb2xzJyxcclxuXHR0cmFzaGNhbjogJ29jdGljb24gb2N0aWNvbi10cmFzaGNhbicsXHJcblx0J3RyaWFuZ2xlLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLWRvd24nLFxyXG5cdCd0cmlhbmdsZS1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1sZWZ0JyxcclxuXHQndHJpYW5nbGUtcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLXJpZ2h0JyxcclxuXHQndHJpYW5nbGUtdXAnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLXVwJyxcclxuXHR1bmZvbGQ6ICdvY3RpY29uIG9jdGljb24tdW5mb2xkJyxcclxuXHR1bm11dGU6ICdvY3RpY29uIG9jdGljb24tdW5tdXRlJyxcclxuXHR2ZXJzaW9uczogJ29jdGljb24gb2N0aWNvbi12ZXJzaW9ucycsXHJcblx0d2F0Y2g6ICdvY3RpY29uIG9jdGljb24td2F0Y2gnLFxyXG5cdCdyZW1vdmUtY2xvc2UnOiAnb2N0aWNvbiBvY3RpY29uLXJlbW92ZS1jbG9zZScsXHJcblx0eDogJ29jdGljb24gb2N0aWNvbi14JyxcclxuXHR6YXA6ICdvY3RpY29uIG9jdGljb24temFwJyxcclxufTtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNtYWxsOiB0aGVtZS5nbHlwaC5zaXplLnNtYWxsLFxyXG5cdG1lZGl1bTogdGhlbWUuZ2x5cGguc2l6ZS5tZWRpdW0sXHJcblx0bGFyZ2U6IHRoZW1lLmdseXBoLnNpemUubGFyZ2UsXHJcbn07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBHbHlwaFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoc2l6ZXMpLmZvckVhY2goc2l6ZSA9PiB7XHJcblx0c2l6ZVZhcmlhbnRzW2BzaXplX18ke3NpemV9YF0gPSB7XHJcblx0XHRmb250U2l6ZTogc2l6ZXNbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRnbHlwaDoge30sXHJcblxyXG5cdC8vIENvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcblxyXG5cdC8vIFNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5jb25zdCBXSURUSFMgPSB7XHJcblx0J29uZS13aG9sZSc6ICcxMDAlJyxcclxuXHQnb25lLWhhbGYnOiAnNTAlJyxcclxuXHQnb25lLXRoaXJkJzogJzMzLjMzJScsXHJcblx0J3R3by10aGlyZHMnOiAnNjYuNjYlJyxcclxuXHQnb25lLXF1YXJ0ZXInOiAnMjUlJyxcclxuXHQndGhyZWUtcXVhcnRlcnMnOiAnNzUlJyxcclxuXHJcblx0J29uZS1maWZ0aCc6ICcyMCUnLFxyXG5cdCd0d28tZmlmdGhzJzogJzQwJScsXHJcblx0J3RocmVlLWZpZnRocyc6ICc2MCUnLFxyXG5cdCdmb3VyLWZpZnRocyc6ICc4MCUnLFxyXG5cclxuXHQnb25lLXNpeHRoJzogJzE2LjY2JScsXHJcblx0J2ZpdmUtc2l4dGhzJzogJzgzLjMzJScsXHJcbn07XHJcblxyXG5jb25zdCBHcmlkQ29sID0gKHByb3BzLCBjb250ZXh0KSA9PiB7XHJcblx0Y29uc3QgZ3V0dGVyID0gcHJvcHMuZ3V0dGVyIHx8IGNvbnRleHQuZ3V0dGVyO1xyXG5cdGNvbnN0IHhzbWFsbCA9IHByb3BzLnhzbWFsbCB8fCBjb250ZXh0LnhzbWFsbDtcclxuXHRjb25zdCBzbWFsbCA9IHByb3BzLnNtYWxsIHx8IGNvbnRleHQuc21hbGw7XHJcblx0Y29uc3QgbWVkaXVtID0gcHJvcHMubWVkaXVtIHx8IGNvbnRleHQubWVkaXVtO1xyXG5cdGNvbnN0IGxhcmdlID0gcHJvcHMubGFyZ2UgfHwgY29udGV4dC5sYXJnZTtcclxuXHJcblx0Y29uc3QgY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlc1sneHNtYWxsLScgKyB4c21hbGxdLFxyXG5cdFx0Y2xhc3Nlc1snc21hbGwtJyArIHNtYWxsXSxcclxuXHRcdGNsYXNzZXNbJ21lZGl1bS0nICsgbWVkaXVtXSxcclxuXHRcdGNsYXNzZXNbJ2xhcmdlLScgKyBsYXJnZV1cclxuXHQpO1xyXG5cclxuXHRjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtwcm9wcy5jbGFzc05hbWUgPyAoJyAnICsgcHJvcHMuY2xhc3NOYW1lKSA6ICcnfWA7XHJcblx0Y29uc3QgY29tcG9uZW50U3R5bGVzID0gZ3V0dGVyID8ge1xyXG5cdFx0cGFkZGluZ0xlZnQ6IGd1dHRlciAvIDIsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IGd1dHRlciAvIDIsXHJcblx0fSA6IHt9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NvbXBvbmVudENsYXNzTmFtZX0gc3R5bGU9e2NvbXBvbmVudFN0eWxlc30+XHJcblx0XHRcdHtwcm9wcy5jaGlsZHJlbn1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5HcmlkQ29sLmNvbnRleHRUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRDb2wucHJvcFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCd4c21hbGwnLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ3NtYWxsJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdtZWRpdW0nLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ2xhcmdlJywgV0lEVEhTKSxcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xyXG5mdW5jdGlvbiBwcmVwYXJlV2lkdGhzIChwcmVmaXgsIG9iaikge1xyXG5cdGxldCBjbGFzc2VzID0ge307XHJcblx0c3dpdGNoIChwcmVmaXgpIHtcclxuXHRcdGNhc2UgJ3NtYWxsJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldFBvcnRyYWl0TWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbWVkaXVtJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ2xhcmdlJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LmRlc2t0b3BNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2xhc3NlcztcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZENvbDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuY2xhc3MgR3JpZFJvdyBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGd1dHRlcjogdGhpcy5wcm9wcy5ndXR0ZXIsXHJcblx0XHRcdHhzbWFsbDogdGhpcy5wcm9wcy54c21hbGwsXHJcblx0XHRcdHNtYWxsOiB0aGlzLnByb3BzLnNtYWxsLFxyXG5cdFx0XHRtZWRpdW06IHRoaXMucHJvcHMubWVkaXVtLFxyXG5cdFx0XHRsYXJnZTogdGhpcy5wcm9wcy5sYXJnZSxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGd1dHRlciwgc3R5bGVzID0ge30gfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gYCR7Y3NzKGNsYXNzZXMuZ3JpZCl9JHtjbGFzc05hbWUgPyAoJyAnICsgY2xhc3NOYW1lKSA6ICcnfWA7XHJcblx0XHRjb25zdCBjb21wb25lbnRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHN0eWxlcywge1xyXG5cdFx0XHRtYXJnaW5MZWZ0OiBndXR0ZXIgLyAtMixcclxuXHRcdFx0bWFyZ2luUmlnaHQ6IGd1dHRlciAvIC0yLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NvbXBvbmVudENsYXNzTmFtZX0gc3R5bGU9e2NvbXBvbmVudFN0eWxlc30+XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuR3JpZFJvdy5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRSb3cucHJvcFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZFJvdy5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Z3V0dGVyOiAwLFxyXG5cdHhzbWFsbDogJ29uZS13aG9sZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdyaWQ6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGZsZXhXcmFwOiAnd3JhcCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZFJvdztcclxuIiwiaW1wb3J0IENvbCBmcm9tICcuLi9HcmlkQ29sJztcclxuaW1wb3J0IFJvdyBmcm9tICcuLi9HcmlkUm93JztcclxuXHJcbmV4cG9ydCB7IENvbCwgUm93IH07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuLy8gTk9URTogSW5saW5lIEdyb3VwIFNlY3Rpb24gYWNjZXB0cyBhIHNpbmdsZSBjaGlsZFxyXG5cclxuZnVuY3Rpb24gSW5saW5lR3JvdXBTZWN0aW9uICh7XHJcblx0YWN0aXZlLFxyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29udGlndW91cyxcclxuXHRncm93LFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBldmFsdWF0ZSBwb3NpdGlvblxyXG5cdGNvbnN0IHNlcGFyYXRlID0gcG9zaXRpb24gPT09ICdsYXN0JyB8fCBwb3NpdGlvbiA9PT0gJ21pZGRsZSc7XHJcblxyXG5cdC8vIEEgYGNvbnRpZ3VvdXNgIHNlY3Rpb24gbXVzdCBtYW5pcHVsYXRlIGl0J3MgY2hpbGQgZGlyZWN0bHlcclxuXHQvLyBBIHNlcGFyYXRlIChkZWZhdWx0KSBzZWN0aW9uIGp1c3Qgd3JhcHMgdGhlIGNoaWxkXHJcblx0cmV0dXJuIGNvbnRpZ3VvdXMgPyBjbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHtcclxuXHRcdGFwaHJvZGl0ZVN0eWxlczogW1xyXG5cdFx0XHRjbGFzc2VzLmNvbnRpZ3VvdXMsXHJcblx0XHRcdGNsYXNzZXNbJ2NvbnRpZ3VvdXNfXycgKyBwb3NpdGlvbl0sXHJcblx0XHRcdGFjdGl2ZSA/IGNsYXNzZXMuYWN0aXZlIDogbnVsbCxcclxuXHRcdFx0Z3JvdyA/IGNsYXNzZXMuZ3JvdyA6IG51bGwsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdF0sXHJcblx0XHQuLi5wcm9wcyxcclxuXHR9KSA6IChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoXHJcblx0XHRcdCEhZ3JvdyAmJiBjbGFzc2VzLmdyb3csXHJcblx0XHRcdCEhc2VwYXJhdGUgJiYgY2xhc3Nlcy5zZXBhcmF0ZSxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0XHQpfSB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuSW5saW5lR3JvdXBTZWN0aW9uLnByb3BUeXBlcyA9IHtcclxuXHRhY3RpdmU6IFByb3BUeXBlcy5ib29sLCAvLyBidXR0b25zIG9ubHlcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZCxcclxuXHRjb250aWd1b3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRncm93OiBQcm9wVHlwZXMuYm9vbCxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnZmlyc3QnLCAnbGFzdCcsICdtaWRkbGUnLCAnb25seSddKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5saW5lR3JvdXBTZWN0aW9uO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gSW5saW5lIEdyb3VwOiBTZWN0aW9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gVGFrZXMgb25seSBGb3JtSW5wdXQgYW5kIEJ1dHRvbiBhcyBjaGlsZHJlbiwgcmVuZGVyaW5nIHRoZW0gYXMgYVxyXG4vLyB0aWR5IGlubGluZSBhcnJheVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdC8vIHB1bGwgYWN0aXZlIGVsZW1lbnRzIHVwXHJcblx0YWN0aXZlOiB7XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzdHJldGNoIHRvIGZpbGwgYXZhaWxhYmxlIHdpZHRoXHJcblx0Z3Jvdzoge1xyXG5cdFx0ZmxleDogJzEgMSAwJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzZXBhcmF0ZSBhcHBsaWNhYmxlIG5vbi1jb250aWd1b3VzIGVsZW1lbnRzXHJcblx0c2VwYXJhdGU6IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiAnMC43NWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb250aWd1b3VzOiBtYW5pcHVsYXRlIGNoaWxkcmVuIGRpcmVjdGx5XHJcblxyXG5cdC8vIHB1bGwgZm9jdXNlZCBjb250aWd1b3VzIGVsZW1lbnRzIHVwXHJcblx0Y29udGlndW91czoge1xyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gcG9zaXRpb25cclxuXHRjb250aWd1b3VzX19taWRkbGU6IHtcclxuXHRcdGJvcmRlclJhZGl1czogMCxcclxuXHRcdG1hcmdpbkxlZnQ6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCAqIC0xLFxyXG5cdH0sXHJcblx0Y29udGlndW91c19fZmlyc3Q6IHtcclxuXHRcdGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHR9LFxyXG5cdGNvbnRpZ3VvdXNfX2xhc3Q6IHtcclxuXHRcdGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0Ym9yZGVyVG9wTGVmdFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRtYXJnaW5MZWZ0OiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGggKiAtMSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gTk9URTogb25seSBhY2NlcHRzIElubGluZUdyb3VwU2VjdGlvbiBhcyBhIHNpbmdsZSBjaGlsZFxyXG5cclxuZnVuY3Rpb24gSW5saW5lR3JvdXAgKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0YmxvY2ssXHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNvbnRpZ3VvdXMsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIHByZXBhcmUgZ3JvdXAgY2xhc3NOYW1lXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5ncm91cCxcclxuXHRcdCEhYmxvY2sgJiYgY2xhc3Nlcy5ibG9jayxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCk7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gY29udmVydCBjaGlsZHJlbiB0byBhbiBhcnJheSBhbmQgZmlsdGVyIG91dCBmYWxzZXkgdmFsdWVzXHJcblx0Y29uc3QgYnV0dG9ucyA9IENoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pLmZpbHRlcihpID0+IGkpO1xyXG5cclxuXHQvLyBub3JtYWxpemUgdGhlIGNvdW50XHJcblx0Y29uc3QgY291bnQgPSBidXR0b25zLmxlbmd0aCAtIDE7XHJcblxyXG5cdC8vIGNsb25lIGNoaWxkcmVuIGFuZCBhcHBseSBjbGFzc05hbWVzIHRoYXQgYXBocm9kaXRlIGNhbiB0YXJnZXRcclxuXHRwcm9wcy5jaGlsZHJlbiA9IGJ1dHRvbnMubWFwKChjLCBpZHgpID0+IHtcclxuXHRcdGlmICghYykgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgaXNPbmx5Q2hpbGQgPSAhY291bnQ7XHJcblx0XHRjb25zdCBpc0ZpcnN0Q2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgaWR4ID09PSAwO1xyXG5cdFx0Y29uc3QgaXNMYXN0Q2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgaWR4ID09PSBjb3VudDtcclxuXHRcdGNvbnN0IGlzTWlkZGxlQ2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgIWlzRmlyc3RDaGlsZCAmJiAhaXNMYXN0Q2hpbGQ7XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uO1xyXG5cdFx0aWYgKGlzT25seUNoaWxkKSBwb3NpdGlvbiA9ICdvbmx5JztcclxuXHRcdGlmIChpc0ZpcnN0Q2hpbGQpIHBvc2l0aW9uID0gJ2ZpcnN0JztcclxuXHRcdGlmIChpc0xhc3RDaGlsZCkgcG9zaXRpb24gPSAnbGFzdCc7XHJcblx0XHRpZiAoaXNNaWRkbGVDaGlsZCkgcG9zaXRpb24gPSAnbWlkZGxlJztcclxuXHJcblx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KGMsIHtcclxuXHRcdFx0Y29udGlndW91czogY29udGlndW91cyxcclxuXHRcdFx0cG9zaXRpb24sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbklubGluZUdyb3VwLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pLFxyXG5cdGJsb2NrOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGNvbnRpZ3VvdXM6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5JbmxpbmVHcm91cC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z3JvdXA6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHRibG9jazoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZUdyb3VwO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBMYWJlbGxlZENvbnRyb2wgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0aW5saW5lLFxyXG5cdGxhYmVsLFxyXG5cdHRpdGxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBsYWJlbENsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMud3JhcHBlcixcclxuXHRcdGlubGluZSAmJiBjbGFzc2VzLndyYXBwZXJfX2lubGluZSxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8bGFiZWwgdGl0bGU9e3RpdGxlfSBjbGFzc05hbWU9e2xhYmVsQ2xhc3NOYW1lfT5cclxuXHRcdFx0PGlucHV0IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250cm9sKX0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5sYWJlbCl9PntsYWJlbH08L3NwYW4+XHJcblx0XHQ8L2xhYmVsPlxyXG5cdCk7XHJcbn07XHJcblxyXG5MYWJlbGxlZENvbnRyb2wucHJvcFR5cGVzID0ge1xyXG5cdGlubGluZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUHJvcFR5cGVzLm9uZU9mKFsnY2hlY2tib3gnLCAncmFkaW8nXSkuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWxsZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0d3JhcHBlcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHR9LFxyXG5cdHdyYXBwZXJfX2lubGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZScsXHJcblx0fSxcclxuXHJcblx0Ly8gY2hlY2tib3ggb3IgcmFkaW9cclxuXHRjb250cm9sOiB7XHJcblx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL1NwaW5uZXInO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTG9hZGluZ0J1dHRvbiAoeyBjaGlsZHJlbiwgbG9hZGluZywgLi4ucHJvcHMgfSkge1xyXG5cdC8vIGRldGVybWluZSB0aGUgY29ycmVjdCB2YXJpYW50IGZvciB0aGUgc3Bpbm5lcixcclxuXHQvLyBmaWxsIGlzIHRoZSBkZWZhdWx0IHZhcmlhbnQgb24gQnV0dG9uXHJcblx0Y29uc3QgdmFyaWFudCA9IHByb3BzLnZhcmlhbnQgfHwgJ2ZpbGwnO1xyXG5cclxuXHQvLyBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgY29sb3IgZm9yIHRoZSBzcGlubmVyLFxyXG5cdC8vIGNhbmNlbCBhbmQgZGVsZXRlIGFsaWFzIHRvIFwiZGFuZ2VyXCJcclxuXHRsZXQgY29sb3I7XHJcblx0aWYgKHByb3BzLmNvbG9yID09PSAnY2FuY2VsJyB8fCBwcm9wcy5jb2xvciA9PT0gJ2RlbGV0ZScpIGNvbG9yID0gJ2Rhbmdlcic7XHJcblxyXG5cdC8vIG1lcmdlIGFsbCB0aGUgdmFyaWFudC9jb2xvciB0b2dldGhlclxyXG5cdGNvbnN0IGZvcm1hdHRlZENvbG9yID0gdmFyaWFudCA9PT0gJ2ZpbGwnICYmIHByb3BzLmNvbG9yICE9PSAnZGVmYXVsdCdcclxuXHRcdD8gJ2ludmVydGVkJ1xyXG5cdFx0OiBjb2xvcjtcclxuXHJcblx0Ly8gcmVuZGVyIHRoZSBzcGlubmVyIGlmIHJlcXVpcmVkXHJcblx0Y29uc3Qgc3Bpbm5lciA9IGxvYWRpbmcgJiYgKFxyXG5cdFx0PFNwaW5uZXJcclxuXHRcdFx0c2l6ZT1cInNtYWxsXCJcclxuXHRcdFx0Y29sb3I9e2Zvcm1hdHRlZENvbG9yfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHQvLyBzbGlkZSB0aGUgc3Bpbm5lciBpbiBhbmQgb3V0IG9mIHZpZXdcclxuXHRjb25zdCBzcGlubmVyU3R5bGVzID0ge1xyXG5cdFx0d2lkdGg6IGxvYWRpbmdcclxuXHRcdFx0PyAodGhlbWUuc3Bpbm5lci5zaXplLnNtYWxsICogNSArIHRoZW1lLnNwYWNpbmcuc21hbGwpXHJcblx0XHRcdDogMCxcclxuXHR9O1xyXG5cclxuXHQvLyByZW5kZXIgYWxsIHRoYXQgc2hpdFxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuc3Bpbm5lcil9IHN0eWxlPXtzcGlubmVyU3R5bGVzfT5cclxuXHRcdFx0XHR7c3Bpbm5lcn1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuTG9hZGluZ0J1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0bG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkxvYWRpbmdCdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGxvYWRpbmc6IGZhbHNlLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRzcGlubmVyOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHRleHRBbGlnbjogJ2xlZnQnLFxyXG5cdFx0dHJhbnNpdGlvbjogJ3dpZHRoIDIwMG1zIGVhc2Utb3V0JyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRpbmdCdXR0b247XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEJvZHkgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2XHJcblx0XHRcdGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYm9keSwgY2xhc3NOYW1lKX1cclxuXHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRib2R5OiB7XHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5Lmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5LnZlcnRpY2FsLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQm9keTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcbmltcG9ydCBTY3JvbGxMb2NrIGZyb20gJy4uL1Njcm9sbExvY2snO1xuaW1wb3J0IFBvcnRhbCBmcm9tICcuLi9Qb3J0YWwnO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xuXG5jb25zdCBjYW5Vc2VEb20gPSAhIShcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0JiYgd2luZG93LmRvY3VtZW50XG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuXG5jbGFzcyBNb2RhbERpYWxvZyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrID0gdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVLZXlib2FyZElucHV0ID0gdGhpcy5oYW5kbGVLZXlib2FyZElucHV0LmJpbmQodGhpcyk7XG5cdH1cblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b25DbG9zZTogdGhpcy5wcm9wcy5vbkNsb3NlLFxuXHRcdH07XG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG5cdFx0aWYgKCFjYW5Vc2VEb20pIHJldHVybjtcblxuXHRcdC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcblx0XHRpZiAobmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0XHRpZiAoIW5leHRQcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9XG5cdH1cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWV0aG9kc1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRoYW5kbGVLZXlib2FyZElucHV0IChldmVudCkge1xuXHRcdGlmIChldmVudC5rZXlDb2RlID09PSAyNykgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aGFuZGxlQmFja2Ryb3BDbGljayAoZSkge1xuXHRcdGlmIChlLnRhcmdldCAhPT0gdGhpcy5yZWZzLmNvbnRhaW5lcikgcmV0dXJuO1xuXG5cdFx0dGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cdH1cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gUmVuZGVyZXJzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHJlbmRlckRpYWxvZyAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0YmFja2Ryb3BDbG9zZXNNb2RhbCxcblx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0aXNPcGVuLFxuXHRcdFx0d2lkdGgsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoIWlzT3BlbikgcmV0dXJuIDxzcGFuIGtleT1cImNsb3NlZFwiIC8+O1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXZcblx0XHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfVxuXHRcdFx0XHRrZXk9XCJvcGVuXCJcblx0XHRcdFx0cmVmPVwiY29udGFpbmVyXCJcblx0XHRcdFx0b25DbGljaz17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMuaGFuZGxlQmFja2Ryb3BDbGlja31cblx0XHRcdFx0b25Ub3VjaEVuZD17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMuaGFuZGxlQmFja2Ryb3BDbGlja31cblx0XHRcdD5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmRpYWxvZyl9IHN0eWxlPXt7IHdpZHRoIH19IGRhdGEtc2NyZWVuLWlkPVwibW9kYWwtZGlhbG9nXCI+XG5cdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PFNjcm9sbExvY2sgLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFBvcnRhbD5cblx0XHRcdFx0e3RoaXMucmVuZGVyRGlhbG9nKCl9XG5cdFx0XHQ8L1BvcnRhbD5cblx0XHQpO1xuXHR9XG59O1xuXG5Nb2RhbERpYWxvZy5wcm9wVHlwZXMgPSB7XG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuXHRlbmFibGVLZXlib2FyZElucHV0OiBQcm9wVHlwZXMuYm9vbCxcblx0aXNPcGVuOiBQcm9wVHlwZXMuYm9vbCxcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG59O1xuTW9kYWxEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuXHRlbmFibGVLZXlib2FyZElucHV0OiB0cnVlLFxuXHR3aWR0aDogNzY4LFxufTtcbk1vZGFsRGlhbG9nLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgY2xhc3NlcyA9IHtcblx0Y29udGFpbmVyOiB7XG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tb2RhbC5iYWNrZ3JvdW5kLFxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGRpc3BsYXk6ICdmbGV4Jyxcblx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG5cdFx0bGVmdDogMCxcblx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHR0b3A6IDAsXG5cdFx0d2lkdGg6ICcxMDAlJyxcblx0XHR6SW5kZXg6IHRoZW1lLm1vZGFsLnpJbmRleCxcblx0fSxcblx0ZGlhbG9nOiB7XG5cdFx0bWF4SGVpZ2h0OiAnOTAlJyxcblx0XHRvdmVyZmxvdzogJ3Njcm9sbCcsXG5cdFx0YmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cudmVydGljYWwsXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZGlhbG9nLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdUb3A6ICc1cHgnLFxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxEaWFsb2c7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxGb290ZXIgKHtcclxuXHRhbGlnbixcclxuXHRjbGFzc05hbWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5mb290ZXIsIGNsYXNzZXNbJ2FsaWduX18nICsgYWxpZ25dLCBjbGFzc05hbWUpfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEZvb3Rlci5wcm9wVHlwZXMgPSB7XHJcblx0YWxpZ246IFByb3BUeXBlcy5vbmVPZihbJ2NlbnRlcicsICdsZWZ0JywgJ3JpZ2h0J10pLFxyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG5cdHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbk1vZGFsRm9vdGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRhbGlnbjogJ2xlZnQnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRmb290ZXI6IHtcclxuXHRcdGJvcmRlclRvcDogYDJweCBzb2xpZCAke3RoZW1lLmNvbG9yLmdyYXkxMH1gLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIuaG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLm1vZGFsLnBhZGRpbmcuZm9vdGVyLnZlcnRpY2FsLFxyXG5cdH0sXHJcblxyXG5cdC8vIGFsaWdubWVudFxyXG5cdGFsaWduX19sZWZ0OiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxyXG5cdH0sXHJcblx0YWxpZ25fX2NlbnRlcjoge1xyXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG5cdH0sXHJcblx0YWxpZ25fX3JpZ2h0OiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEZvb3RlcjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEdseXBoQnV0dG9uIGZyb20gJy4uL0dseXBoQnV0dG9uJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsSGVhZGVyICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdHNob3dDbG9zZUJ1dHRvbixcclxuXHR0ZXh0LFxyXG5cdC4uLnByb3BzXHJcbn0sIHtcclxuXHRvbkNsb3NlLFxyXG59KSB7XHJcblx0Ly8gUHJvcGVydHkgVmlvbGF0aW9uXHJcblx0aWYgKGNoaWxkcmVuICYmIHRleHQpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IE1vZGFsSGVhZGVyIGNhbm5vdCByZW5kZXIgYGNoaWxkcmVuYCBhbmQgYHRleHRgLiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvciB0aGUgb3RoZXIuJyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuaGVhZGVyLCBjbGFzc05hbWUpfT5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmdyb3cpfT5cclxuXHRcdFx0XHR7dGV4dCA/IChcclxuXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnRleHQpfT5cclxuXHRcdFx0XHRcdFx0e3RleHR9XHJcblx0XHRcdFx0XHQ8L2g0PlxyXG5cdFx0XHRcdCkgOiBjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdHshIW9uQ2xvc2UgJiYgc2hvd0Nsb3NlQnV0dG9uICYmIChcclxuXHRcdFx0XHQ8R2x5cGhCdXR0b25cclxuXHRcdFx0XHRcdGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy5jbG9zZX1cclxuXHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdGdseXBoPVwieFwiXHJcblx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsb3NlfVxyXG5cdFx0XHRcdFx0dmFyaWFudD1cImxpbmtcIlxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCl9XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuTW9kYWxIZWFkZXIucHJvcFR5cGVzID0ge1xyXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxyXG5cdHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbk1vZGFsSGVhZGVyLmNvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRoZWFkZXI6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0Ym9yZGVyQm90dG9tOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5oZWFkZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gZmlsbCBzcGFjZSB0byBwdXNoIHRoZSBjbG9zZSBidXR0b24gcmlnaHRcclxuXHRncm93OiB7XHJcblx0XHRmbGV4R3JvdzogMSxcclxuXHR9LFxyXG5cclxuXHQvLyB0aXRsZSB0ZXh0XHJcblx0dGV4dDoge1xyXG5cdFx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHRcdGZvbnRTaXplOiAxOCxcclxuXHRcdGZvbnRXZWlnaHQ6IDUwMCxcclxuXHRcdGxpbmVIZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IDAsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxIZWFkZXI7XHJcbiIsImltcG9ydCBCb2R5IGZyb20gJy4vYm9keSc7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSAnLi9kaWFsb2cnO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vZm9vdGVyJztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlcic7XHJcblxyXG5leHBvcnQge1xyXG5cdEJvZHksXHJcblx0RGlhbG9nLFxyXG5cdEZvb3RlcixcclxuXHRIZWFkZXIsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlckNvdW50ICgpIHtcclxuXHRcdGxldCBjb3VudCA9ICcnO1xyXG5cdFx0Y29uc3QgeyBjdXJyZW50UGFnZSwgcGFnZVNpemUsIHBsdXJhbCwgc2luZ3VsYXIsIHRvdGFsIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0aWYgKCF0b3RhbCkge1xyXG5cdFx0XHRjb3VudCA9ICdObyAnICsgKHBsdXJhbCB8fCAncmVjb3JkcycpO1xyXG5cdFx0fSBlbHNlIGlmICh0b3RhbCA+IHBhZ2VTaXplKSB7XHJcblx0XHRcdGxldCBzdGFydCA9IChwYWdlU2l6ZSAqIChjdXJyZW50UGFnZSAtIDEpKSArIDE7XHJcblx0XHRcdGxldCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHBhZ2VTaXplIC0gMSwgdG90YWwpO1xyXG5cdFx0XHRjb3VudCA9IGBTaG93aW5nICR7c3RhcnR9IHRvICR7ZW5kfSBvZiAke3RvdGFsfWA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb3VudCA9ICdTaG93aW5nICcgKyB0b3RhbDtcclxuXHRcdFx0aWYgKHRvdGFsID4gMSAmJiBwbHVyYWwpIHtcclxuXHRcdFx0XHRjb3VudCArPSAnICcgKyBwbHVyYWw7XHJcblx0XHRcdH0gZWxzZSBpZiAodG90YWwgPT09IDEgJiYgc2luZ3VsYXIpIHtcclxuXHRcdFx0XHRjb3VudCArPSAnICcgKyBzaW5ndWxhcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvdW50KX0gZGF0YS1lMmUtcGFnaW5hdGlvbi1jb3VudD57Y291bnR9PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZW5kZXJQYWdlcyAoKSB7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBsaW1pdCwgb25QYWdlU2VsZWN0LCBwYWdlU2l6ZSwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0aWYgKHRvdGFsIDw9IHBhZ2VTaXplKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRsZXQgcGFnZXMgPSBbXTtcclxuXHRcdGxldCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsIC8gcGFnZVNpemUpO1xyXG5cdFx0bGV0IG1pblBhZ2UgPSAxO1xyXG5cdFx0bGV0IG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cclxuXHRcdGlmIChsaW1pdCAmJiAobGltaXQgPCB0b3RhbFBhZ2VzKSkge1xyXG5cdFx0XHRsZXQgcmlnaHRMaW1pdCA9IE1hdGguZmxvb3IobGltaXQgLyAyKTtcclxuXHRcdFx0bGV0IGxlZnRMaW1pdCA9IHJpZ2h0TGltaXQgKyAobGltaXQgJSAyKSAtIDE7XHJcblx0XHRcdG1pblBhZ2UgPSBjdXJyZW50UGFnZSAtIGxlZnRMaW1pdDtcclxuXHRcdFx0bWF4UGFnZSA9IGN1cnJlbnRQYWdlICsgcmlnaHRMaW1pdDtcclxuXHJcblx0XHRcdGlmIChtaW5QYWdlIDwgMSkge1xyXG5cdFx0XHRcdG1heFBhZ2UgPSBsaW1pdDtcclxuXHRcdFx0XHRtaW5QYWdlID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWF4UGFnZSA+IHRvdGFsUGFnZXMpIHtcclxuXHRcdFx0XHRtaW5QYWdlID0gdG90YWxQYWdlcyAtIGxpbWl0ICsgMTtcclxuXHRcdFx0XHRtYXhQYWdlID0gdG90YWxQYWdlcztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKG1pblBhZ2UgPiAxKSB7XHJcblx0XHRcdHBhZ2VzLnB1c2goPFBhZ2Uga2V5PVwicGFnZV9zdGFydFwiIG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdCgxKX0+Li4uPC9QYWdlPik7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBwYWdlID0gbWluUGFnZTsgcGFnZSA8PSBtYXhQYWdlOyBwYWdlKyspIHtcclxuXHRcdFx0bGV0IHNlbGVjdGVkID0gKHBhZ2UgPT09IGN1cnJlbnRQYWdlKTtcclxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdHBhZ2VzLnB1c2goPFBhZ2Uga2V5PXsncGFnZV8nICsgcGFnZX0gc2VsZWN0ZWQ9e3NlbGVjdGVkfSBvbkNsaWNrPXsoKSA9PiBvblBhZ2VTZWxlY3QocGFnZSl9PntwYWdlfTwvUGFnZT4pO1xyXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlICovXHJcblx0XHR9XHJcblx0XHRpZiAobWF4UGFnZSA8IHRvdGFsUGFnZXMpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX2VuZFwiIG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdCh0b3RhbFBhZ2VzKX0+Li4uPC9QYWdlPik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMubGlzdCl9PlxyXG5cdFx0XHRcdHtwYWdlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuY29udGFpbmVyLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQ291bnQoKX1cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJQYWdlcygpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzJlbScsXHJcblx0fSxcclxuXHRjb3VudDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5SaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG5cdGxpc3Q6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcblBhZ2luYXRpb24ucHJvcFR5cGVzID0ge1xyXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRjdXJyZW50UGFnZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdG9uUGFnZVNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0cGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRwbHVyYWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c2luZ3VsYXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0dG90YWw6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFnaW5hdGlvbjtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIFBhZ2UgKHtcclxuXHRkaXNhYmxlZCxcclxuXHRzZWxlY3RlZCxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5wYWdlLFxyXG5cdFx0ISFkaXNhYmxlZCAmJiBjbGFzc2VzLmRpc2FibGVkLFxyXG5cdFx0ISFzZWxlY3RlZCAmJiBjbGFzc2VzLnNlbGVjdGVkXHJcblx0KTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGJ1dHRvbiB7Li4ucHJvcHN9IC8+XHJcblx0KTtcclxufTtcclxuXHJcblBhZ2UucHJvcFR5cGVzID0ge1xyXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmNvbnN0IHNlbGVjdGVkU3R5bGUgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLnNlbGVjdGVkLmJhY2tncm91bmQsXHJcblx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYm9yZGVyLFxyXG5cdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLnNlbGVjdGVkLmNvbG9yLFxyXG5cdGN1cnNvcjogJ2RlZmF1bHQnLFxyXG5cdHpJbmRleDogMixcclxufTtcclxuY29uc3QgcHNldWRvU3R5bGUgPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmhvdmVyLmJhY2tncm91bmQsXHJcblx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYm9yZGVyLFxyXG5cdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmhvdmVyLmNvbG9yLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0cGFnZToge1xyXG5cdFx0YXBwZWFyYW5jZTogJ25vbmUnLFxyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHRjb2xvcjogdGhlbWUucGFnaW5hdGlvbi5jb2xvcixcclxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRmbG9hdDogJ2xlZnQnLCAvLyBDb2xsYXBzZSB3aGl0ZS1zcGFjZVxyXG5cdFx0bWFyZ2luUmlnaHQ6ICcwLjI1ZW0nLFxyXG5cdFx0cGFkZGluZzogJzAgLjdlbScsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHRcdHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcblxyXG5cdFx0Ly8gaGFuZGxlIGhvdmVyIGFuZCBmb2N1c1xyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHBzZXVkb1N0eWxlLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNlbGVjdGVkIHBhZ2VcclxuXHRzZWxlY3RlZDoge1xyXG5cdFx0Li4uc2VsZWN0ZWRTdHlsZSxcclxuXHJcblx0XHQnOmhvdmVyJzogc2VsZWN0ZWRTdHlsZSxcclxuXHRcdCc6Zm9jdXMnOiBzZWxlY3RlZFN0eWxlLFxyXG5cdH0sXHJcblxyXG5cdC8vIGRpc2FibGVkIHBhZ2VcclxuXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuYmFja2dyb3VuZCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0fSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XHJcbiIsImltcG9ydCB7IENoaWxkcmVuLCBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIFBhc3MgdGhlIExpZ2h0Ym94IGNvbnRleHQgdGhyb3VnaCB0byB0aGUgUG9ydGFsJ3MgZGVzY2VuZGVudHNcclxuLy8gU3RhY2tPdmVyZmxvdyBkaXNjdXNzaW9uIGh0dHA6Ly9nb28uZ2wvb2Nscko5XHJcblxyXG5jbGFzcyBQYXNzQ29udGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbnRleHQ7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuXHR9XHJcbn07XHJcblxyXG5QYXNzQ29udGV4dC5wcm9wVHlwZXMgPSB7XHJcblx0Y29udGV4dDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG59O1xyXG5QYXNzQ29udGV4dC5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhc3NDb250ZXh0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBQYXNzQ29udGV4dCBmcm9tICcuLi9QYXNzQ29udGV4dCc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gbnVsbDtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcclxuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IHA7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xyXG5cdFx0Ly8gQW5pbWF0ZSBmYWRlIG9uIG1vdW50L3VubW91bnRcclxuXHRcdGNvbnN0IGR1cmF0aW9uID0gMjAwO1xyXG5cdFx0Y29uc3Qgc3R5bGVzID0gYFxyXG5cdFx0XHRcdC5mYWRlLWVudGVyIHsgb3BhY2l0eTogMC4wMTsgfVxyXG5cdFx0XHRcdC5mYWRlLWVudGVyLmZhZGUtZW50ZXItYWN0aXZlIHsgb3BhY2l0eTogMTsgdHJhbnNpdGlvbjogb3BhY2l0eSAke2R1cmF0aW9ufW1zOyB9XHJcblx0XHRcdFx0LmZhZGUtbGVhdmUgeyBvcGFjaXR5OiAxOyB9XHJcblx0XHRcdFx0LmZhZGUtbGVhdmUuZmFkZS1sZWF2ZS1hY3RpdmUgeyBvcGFjaXR5OiAwLjAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdGA7XHJcblx0XHRyZW5kZXIoXHJcblx0XHRcdDxQYXNzQ29udGV4dCBjb250ZXh0PXt0aGlzLmNvbnRleHR9PlxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8c3R5bGU+e3N0eWxlc308L3N0eWxlPlxyXG5cdFx0XHRcdFx0PFRyYW5zaXRpb25cclxuXHRcdFx0XHRcdFx0Y29tcG9uZW50PVwiZGl2XCJcclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9XCJmYWRlXCJcclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e2R1cmF0aW9ufVxyXG5cdFx0XHRcdFx0XHR7Li4udGhpcy5wcm9wc31cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvUGFzc0NvbnRleHQ+LFxyXG5cdFx0XHR0aGlzLnBvcnRhbEVsZW1lbnRcclxuXHRcdCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuUG9ydGFsLmNvbnRleHRUeXBlcyA9IHtcclxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gVXNpbmcgd2luZG93LmlubmVyV2lkdGggYW5kIHN0YXRlIGluc3RlYWQgb2YgQ1NTIG1lZGlhIGJyZWFrcG9pbnRzXHJcbi8vIGJlY2F1c2Ugd2Ugd2FudCB0byByZW5kZXIgbnVsbCByYXRoZXIgdGhhbiBhbiBlbXB0eSBzcGFuLiBBbGxvd2luZyBmb3JcclxuLy8gQ1NTIHBzZXVkbyBjbGFzc2VzIGxpa2UgOm9ubHktY2hpbGQgdG8gYmVoYXZlIGFzIGV4cGVjdGVkLlxyXG5cclxuLy8gUmV0dXJuIHRydWUgaWYgd2luZG93ICsgZG9jdW1lbnRcclxuY29uc3QgY2FuVXNlRE9NID0gISEoXHJcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuXHQmJiB3aW5kb3cuZG9jdW1lbnRcclxuXHQmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxyXG4pO1xyXG5cclxuY2xhc3MgUmVzcG9uc2l2ZVRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnN0YXRlID0ge1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0aWYgKGNhblVzZURPTSkge1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xyXG5cdFx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhhbmRsZVJlc2l6ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0d2luZG93V2lkdGg6IGNhblVzZURPTSA/IHdpbmRvdy5pbm5lcldpZHRoIDogMCxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRcdFx0aGlkZGVuTEcsXHJcblx0XHRcdGhpZGRlbk1ELFxyXG5cdFx0XHRoaWRkZW5TTSxcclxuXHRcdFx0aGlkZGVuWFMsXHJcblx0XHRcdHZpc2libGVMRyxcclxuXHRcdFx0dmlzaWJsZU1ELFxyXG5cdFx0XHR2aXNpYmxlU00sXHJcblx0XHRcdHZpc2libGVYUyxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgeyB3aW5kb3dXaWR0aCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcblx0XHRsZXQgdGV4dDtcclxuXHJcblx0XHQvLyBzZXQgdGV4dCB2YWx1ZSBmcm9tIGJyZWFrcG9pbnQ7IGF0dGVtcHQgWFMgLS0+IExHXHJcblx0XHRpZiAod2luZG93V2lkdGggPCB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUpIHtcclxuXHRcdFx0dGV4dCA9IHZpc2libGVYUyB8fCBoaWRkZW5TTSB8fCBoaWRkZW5NRCB8fCBoaWRkZW5MRztcclxuXHRcdH0gZWxzZSBpZiAod2luZG93V2lkdGggPCB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCkge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgdmlzaWJsZVNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSkge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgdmlzaWJsZU1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCA9IGhpZGRlblhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IHZpc2libGVMRztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGV4dCA/IDxDb21wb25lbnQgey4uLnByb3BzfT57dGV4dH08L0NvbXBvbmVudD4gOiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcblJlc3BvbnNpdmVUZXh0LnByb3BUeXBlcyA9IHtcclxuXHRoaWRkZW5MRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5NRDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5TTTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRoaWRkZW5YUzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTEc6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZU1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVTTTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlWFM6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblJlc3BvbnNpdmVUZXh0LmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2l2ZVRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcblxyXG5mdW5jdGlvbiBTY3JlZW5SZWFkZXJPbmx5ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLnNyT25seSwgY2xhc3NOYW1lKTtcclxuXHJcblx0cmV0dXJuIDxzcGFuIHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdHNyT25seToge1xyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Y2xpcDogJ3JlY3QoMCwwLDAsMCknLFxyXG5cdFx0aGVpZ2h0OiAxLFxyXG5cdFx0bWFyZ2luOiAtMSxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBhZGRpbmc6IDAsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNjcmVlblJlYWRlck9ubHk7XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbExvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmxvY2tDb3VudCA9IDA7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudCsrO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vXHRGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBzY3JvbGxCYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5cdFx0XHR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xyXG5cdFx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmQgYm9keSBlbGVtZW50LiBFcnI6JywgZXJyKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMubG9ja0NvdW50ID09PSAwKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5sb2NrQ291bnQtLTtcclxuXHRcdGlmICh0aGlzLmxvY2tDb3VudCA+IDApIHJldHVybjsgLy8gU3RpbGwgbG9ja2VkXHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5cdFx0XHR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnJztcclxuXHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmQgYm9keSBlbGVtZW50LiBFcnI6JywgZXJyKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTgwLFxyXG5cdGVycm9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0aW5mbzogdGhlbWUuY29sb3IuaW5mbyxcclxuXHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdHN1Y2Nlc3M6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbmZ1bmN0aW9uIFNlZ21lbnRlZENvbnRyb2wgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y3JvcFRleHQsXHJcblx0ZXF1YWxXaWR0aFNlZ21lbnRzLFxyXG5cdGlubGluZSxcclxuXHRvbkNoYW5nZSxcclxuXHRvcHRpb25zLFxyXG5cdHZhbHVlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNvbnRyb2wsXHJcblx0XHRpbmxpbmUgPyBjbGFzc2VzLmNvbnRyb2xfX2lubGluZSA6IG51bGwsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7b3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGJ1dHRvbkNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0XHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0XHRcdFx0b3B0LmRpc2FibGVkID8gY2xhc3Nlcy5idXR0b25fX2Rpc2FibGVkIDogbnVsbCxcclxuXHRcdFx0XHRcdG9wdC52YWx1ZSA9PT0gdmFsdWUgPyBjbGFzc2VzWydidXR0b25fXycgKyBjb2xvcl0gOiBudWxsLFxyXG5cdFx0XHRcdFx0Y3JvcFRleHQgPyBjbGFzc2VzLmJ1dHRvbl9fY3JvcFRleHQgOiBudWxsLFxyXG5cdFx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzID8gY2xhc3Nlcy5idXR0b25fX2VxdWFsV2lkdGggOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxidXR0b25cclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtidXR0b25DbGFzc05hbWV9XHJcblx0XHRcdFx0XHRcdGtleT17b3B0LnZhbHVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXshb3B0LmRpc2FibGVkICYmICgoKSA9PiBvbkNoYW5nZShvcHQudmFsdWUpKX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0XHRcdHRpdGxlPXtjcm9wVGV4dCA/IG9wdC5sYWJlbCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdHRhYkluZGV4PXtvcHQuZGlzYWJsZWQgPyAnLTEnIDogJyd9XHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0e29wdC5sYWJlbH1cclxuXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0pfVxyXG5cdFx0PC9kaXY+KTtcclxufTtcclxuXHJcbmNvbnN0IHZhbHVlUHJvcFNoYXBlID0gW1xyXG5cdFByb3BUeXBlcy5ib29sLFxyXG5cdFByb3BUeXBlcy5udW1iZXIsXHJcblx0UHJvcFR5cGVzLnN0cmluZyxcclxuXTtcclxuXHJcblNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLCAvLyB3aGVuIGBpbmxpbmUgJiYgZXF1YWxXaWR0aFNlZ21lbnRzYCBjcm9wcyB0byB0aGUgbmV4dCBsYXJnZXN0IG9wdGlvbiBsZW5ndGhcclxuXHRlcXVhbFdpZHRoU2VnbWVudHM6IFByb3BUeXBlcy5ib29sLCAvLyBvbmx5IHJlbGV2YW50IHdoZW4gYGlubGluZSA9PT0gZmFsc2VgXHJcblx0aW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRcdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKHZhbHVlUHJvcFNoYXBlKSxcclxuXHRcdH0pXHJcblx0KS5pc1JlcXVpcmVkLFxyXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKHZhbHVlUHJvcFNoYXBlKSxcclxufTtcclxuU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VnbWVudGVkQ29udHJvbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNlZ21lbnRlZCBDb250cm9sXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb25zdCBwc2V1ZG9TdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0sXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHR9O1xyXG5cdGNvbG9yVmFyaWFudHNbJ2J1dHRvbl9fJyArIGNvbG9yXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGVzLFxyXG5cdFx0JzphY3RpdmUnOiBwc2V1ZG9TdHlsZXMsXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb250cm9sOiB7XHJcblx0XHRib3JkZXJXaWR0aDogMSxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC40ZW0nLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5zbWFsbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiAxLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiAxLFxyXG5cdH0sXHJcblx0Y29udHJvbF9faW5saW5lOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxyXG5cdH0sXHJcblxyXG5cdC8vIGJ1dHRvbnNcclxuXHRidXR0b246IHtcclxuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcclxuXHRcdGJvcmRlcjogMCxcclxuXHRcdGJvcmRlclJhZGl1czogJzAuMjVlbScsXHJcblx0XHRmbGV4R3JvdzogMSxcclxuXHRcdG1hcmdpbjogJzJweCAxcHgnLFxyXG5cdFx0cGFkZGluZzogJzAuM2VtIDAuOWVtJyxcclxuXHRcdG91dGxpbmU6IDAsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6Zm9jdXMnOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4wNSknIH0sXHJcblx0XHQnOmFjdGl2ZSc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjEpJyB9LFxyXG5cdH0sXHJcblx0YnV0dG9uX19lcXVhbFdpZHRoOiB7XHJcblx0XHRmbGV4OiAnMSAxIDAnLFxyXG5cdH0sXHJcblx0YnV0dG9uX19jcm9wVGV4dDoge1xyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0dGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG5cdFx0d2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Rpc2FibGVkOiB7XHJcblx0XHRvcGFjaXR5OiAwLjYsXHJcblx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcblx0fSxcclxuXHJcblx0Ly8gY29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ2RhbmdlcicsICdkZWZhdWx0JywgJ2ludmVydGVkJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ107XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IFNjcmVlblJlYWRlck9ubHkgZnJvbSAnLi4vU2NyZWVuUmVhZGVyT25seSc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG5mdW5jdGlvbiBTcGlubmVyICh7IGNsYXNzTmFtZSwgc2l6ZSwgY29sb3IsIC4uLnByb3BzIH0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmJhc2UsXHJcblx0XHRjbGFzc2VzW3NpemVdLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X19maXJzdCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X19zZWNvbmQpfWB9IC8+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YCR7Y3NzKGNsYXNzZXMuZG90LCBjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sIGNsYXNzZXNbJ2NvbG9yX18nICsgY29sb3JdLCBjbGFzc2VzLmRvdF9fdGhpcmQpfWB9IC8+XHJcblx0XHRcdDxTY3JlZW5SZWFkZXJPbmx5PkxvYWRpbmcuLi48L1NjcmVlblJlYWRlck9ubHk+XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuU3Bpbm5lci5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihjb2xvcnMpLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihzaXplcyksXHJcbn07XHJcblNwaW5uZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdHNpemU6ICdtZWRpdW0nLFxyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5uZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gWydzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnXTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNwaW5uZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5jb2xvcnMuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tgY29sb3JfXyR7Y29sb3J9YF0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnNwaW5uZXIuY29sb3JbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbYHNpemVfXyR7c2l6ZX1gXSA9IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5zcGlubmVyLnNpemVbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBEZWNsYXJlIGFuaW1hdGlvbiBrZXlmcmFtZXNcclxuXHJcbmNvbnN0IGtleWZyYW1lcyA9IGNvbXBvc2Uua2V5ZnJhbWVzKCdwdWxzZScsIHtcclxuXHQnMCUsIDgwJSwgMTAwJSc6IHsgb3BhY2l0eTogMCB9LFxyXG5cdCc0MCUnOiB7IG9wYWNpdHk6IDEgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRiYXNlOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IDEsXHJcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogJzVlbScsXHJcblx0fSxcclxuXHRzbWFsbDpcdHsgZm9udFNpemU6IDQgfSxcclxuXHRtZWRpdW06XHR7IGZvbnRTaXplOiA4IH0sXHJcblx0bGFyZ2U6XHR7IGZvbnRTaXplOiAxNiB9LFxyXG5cclxuXHQvLyB0ZXh0XHJcblx0dGV4dDoge1xyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Y2xpcDogJ3JlY3QoMCwwLDAsMCknLFxyXG5cdFx0aGVpZ2h0OiAxLFxyXG5cdFx0bWFyZ2luOiAtMSxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBhZGRpbmc6IDAsXHJcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIGRvdHNcclxuXHRkb3Q6IHtcclxuXHRcdGFuaW1hdGlvbk5hbWU6IGtleWZyYW1lcyxcclxuXHRcdGFuaW1hdGlvbkR1cmF0aW9uOiAnMXMnLFxyXG5cdFx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdpbmZpbml0ZScsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcxZW0nLFxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6ICcxZW0nLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ3RvcCcsXHJcblx0XHR3aWR0aDogJzFlbScsXHJcblx0fSxcclxuXHRkb3RfX3NlY29uZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICcxNjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fdGhpcmQ6IHtcclxuXHRcdGFuaW1hdGlvbkRlbGF5OiAnMzIwbXMnLFxyXG5cdFx0bWFyZ2luTGVmdDogJzFlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gQ29sb3JzXHJcblx0Li4uY29sb3JWYXJpYW50cyxcclxuXHJcblx0Ly8gU2l6ZXNcclxuXHQuLi5zaXplVmFyaWFudHMsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdEFsZXJ0OiByZXF1aXJlKCcuL0FsZXJ0JyksXHJcblx0QmxhbmtTdGF0ZTogcmVxdWlyZSgnLi9CbGFua1N0YXRlJyksXHJcblx0QnV0dG9uOiByZXF1aXJlKCcuL0J1dHRvbicpLFxyXG5cdENlbnRlcjogcmVxdWlyZSgnLi9DZW50ZXInKSxcclxuXHRDaGlwOiByZXF1aXJlKCcuL0NoaXAnKSxcclxuXHRDb250YWluZXI6IHJlcXVpcmUoJy4vQ29udGFpbmVyJyksXHJcblx0RHJvcGRvd25CdXR0b246IHJlcXVpcmUoJy4vRHJvcGRvd25CdXR0b24nKSxcclxuXHRGb3JtOiByZXF1aXJlKCcuL0Zvcm0nKSxcclxuXHRGb3JtRmllbGQ6IHJlcXVpcmUoJy4vRm9ybUZpZWxkJyksXHJcblx0Rm9ybUlucHV0OiByZXF1aXJlKCcuL0Zvcm1JbnB1dCcpLFxyXG5cdEZvcm1MYWJlbDogcmVxdWlyZSgnLi9Gb3JtTGFiZWwnKSxcclxuXHRGb3JtTm90ZTogcmVxdWlyZSgnLi9Gb3JtTm90ZScpLFxyXG5cdEZvcm1TZWxlY3Q6IHJlcXVpcmUoJy4vRm9ybVNlbGVjdCcpLFxyXG5cdEdseXBoOiByZXF1aXJlKCcuL0dseXBoJyksXHJcblx0R2x5cGhCdXR0b246IHJlcXVpcmUoJy4vR2x5cGhCdXR0b24nKSxcclxuXHRHbHlwaEZpZWxkOiByZXF1aXJlKCcuL0dseXBoRmllbGQnKSxcclxuXHRHcmlkOiByZXF1aXJlKCcuL0dyaWQnKSxcclxuXHRJbmxpbmVHcm91cDogcmVxdWlyZSgnLi9JbmxpbmVHcm91cCcpLFxyXG5cdElubGluZUdyb3VwU2VjdGlvbjogcmVxdWlyZSgnLi9JbmxpbmVHcm91cFNlY3Rpb24nKSxcclxuXHRMYWJlbGxlZENvbnRyb2w6IHJlcXVpcmUoJy4vTGFiZWxsZWRDb250cm9sJyksXHJcblx0TG9hZGluZ0J1dHRvbjogcmVxdWlyZSgnLi9Mb2FkaW5nQnV0dG9uJyksXHJcblx0TW9kYWw6IHJlcXVpcmUoJy4vTW9kYWwnKSxcclxuXHRQYWdpbmF0aW9uOiByZXF1aXJlKCcuL1BhZ2luYXRpb24nKSxcclxuXHRSZXNwb25zaXZlVGV4dDogcmVxdWlyZSgnLi9SZXNwb25zaXZlVGV4dCcpLFxyXG5cdFNjcmVlblJlYWRlck9ubHk6IHJlcXVpcmUoJy4vU2NyZWVuUmVhZGVyT25seScpLFxyXG5cdFNlZ21lbnRlZENvbnRyb2w6IHJlcXVpcmUoJy4vU2VnbWVudGVkQ29udHJvbCcpLFxyXG5cdFNwaW5uZXI6IHJlcXVpcmUoJy4vU3Bpbm5lcicpLFxyXG59O1xyXG4iLCIvKipcclxuICogVGhlIGFjdHVhbCBTaWduIEluIHZpZXcsIHdpdGggdGhlIGxvZ2luIGZvcm1cclxuICovXHJcblxyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5cclxuaW1wb3J0IEFsZXJ0IGZyb20gJy4vY29tcG9uZW50cy9BbGVydCc7XHJcbmltcG9ydCBCcmFuZCBmcm9tICcuL2NvbXBvbmVudHMvQnJhbmQnO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSAnLi9jb21wb25lbnRzL1VzZXJJbmZvJztcclxuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvTG9naW5Gb3JtJztcclxuXHJcbnZhciBTaWduaW5WaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlbWFpbDogJycsXHJcblx0XHRcdHBhc3N3b3JkOiAnJyxcclxuXHRcdFx0aXNBbmltYXRpbmc6IGZhbHNlLFxyXG5cdFx0XHRpc0ludmFsaWQ6IGZhbHNlLFxyXG5cdFx0XHRpbnZhbGlkTWVzc2FnZTogJycsXHJcblx0XHRcdHNpZ25lZE91dDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCA9PT0gJz9zaWduZWRvdXQnLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdC8vIEZvY3VzIHRoZSBlbWFpbCBmaWVsZCB3aGVuIHdlJ3JlIG1vdW50ZWRcclxuXHRcdGlmICh0aGlzLnJlZnMuZW1haWwpIHtcclxuXHRcdFx0dGhpcy5yZWZzLmVtYWlsLnNlbGVjdCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGUpIHtcclxuXHRcdC8vIFNldCB0aGUgbmV3IHN0YXRlIHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcclxuXHRcdGNvbnN0IG5ld1N0YXRlID0ge307XHJcblx0XHRuZXdTdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVTdWJtaXQgKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdC8vIElmIGVpdGhlciBwYXNzd29yZCBvciBtYWlsIGFyZSBtaXNzaW5nLCBzaG93IGFuIGVycm9yXHJcblx0XHRpZiAoIXRoaXMuc3RhdGUuZW1haWwgfHwgIXRoaXMuc3RhdGUucGFzc3dvcmQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlzcGxheUVycm9yKCdQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcyBhbmQgcGFzc3dvcmQgdG8gc2lnbiBpbi4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR4aHIoe1xyXG5cdFx0XHR1cmw6IGAke0tleXN0b25lLmFkbWluUGF0aH0vYXBpL3Nlc3Npb24vc2lnbmluYCxcclxuXHRcdFx0bWV0aG9kOiAncG9zdCcsXHJcblx0XHRcdGpzb246IHtcclxuXHRcdFx0XHRlbWFpbDogdGhpcy5zdGF0ZS5lbWFpbCxcclxuXHRcdFx0XHRwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZCxcclxuXHRcdFx0fSxcclxuXHRcdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHR9LCAoZXJyLCByZXNwLCBib2R5KSA9PiB7XHJcblx0XHRcdGlmIChlcnIgfHwgYm9keSAmJiBib2R5LmVycm9yKSB7XHJcblx0XHRcdFx0cmV0dXJuIGJvZHkuZXJyb3IgPT09ICdpbnZhbGlkIGNzcmYnXHJcblx0XHRcdFx0XHQ/IHRoaXMuZGlzcGxheUVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZzsgcGxlYXNlIHJlZnJlc2ggeW91ciBicm93c2VyIGFuZCB0cnkgYWdhaW4uJylcclxuXHRcdFx0XHRcdDogdGhpcy5kaXNwbGF5RXJyb3IoJ1RoZSBlbWFpbCBhbmQgcGFzc3dvcmQgeW91IGVudGVyZWQgYXJlIG5vdCB2YWxpZC4nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBSZWRpcmVjdCB0byB3aGVyZSB3ZSBjYW1lIGZyb20gb3IgdG8gdGhlIGRlZmF1bHQgYWRtaW4gcGF0aFxyXG5cdFx0XHRcdGlmIChLZXlzdG9uZS5yZWRpcmVjdCkge1xyXG5cdFx0XHRcdFx0dG9wLmxvY2F0aW9uLmhyZWYgPSBLZXlzdG9uZS5yZWRpcmVjdDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dG9wLmxvY2F0aW9uLmhyZWYgPSB0aGlzLnByb3BzLmZyb20gPyB0aGlzLnByb3BzLmZyb20gOiBLZXlzdG9uZS5hZG1pblBhdGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHlvdSB3YW50IHRvIHNob3dcclxuXHQgKi9cclxuXHRkaXNwbGF5RXJyb3IgKG1lc3NhZ2UpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRpc0FuaW1hdGluZzogdHJ1ZSxcclxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxyXG5cdFx0XHRpbnZhbGlkTWVzc2FnZTogbWVzc2FnZSxcclxuXHRcdH0pO1xyXG5cdFx0c2V0VGltZW91dCh0aGlzLmZpbmlzaEFuaW1hdGlvbiwgNzUwKTtcclxuXHR9LFxyXG5cdC8vIEZpbmlzaCB0aGUgYW5pbWF0aW9uIGFuZCBzZWxlY3QgdGhlIGVtYWlsIGZpZWxkXHJcblx0ZmluaXNoQW5pbWF0aW9uICgpIHtcclxuXHRcdC8vIFRPRE8gaXNNb3VudGVkIHdhcyBkZXByZWNhdGVkLCBmaW5kIG91dCBpZiB3ZSBuZWVkIHRoaXMgZ3VhcmRcclxuXHRcdGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMucmVmcy5lbWFpbCkge1xyXG5cdFx0XHR0aGlzLnJlZnMuZW1haWwuc2VsZWN0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0aXNBbmltYXRpbmc6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgYm94Q2xhc3NuYW1lID0gY2xhc3NuYW1lcygnYXV0aC1ib3gnLCB7XHJcblx0XHRcdCdhdXRoLWJveC0taGFzLWVycm9ycyc6IHRoaXMuc3RhdGUuaXNBbmltYXRpbmcsXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXV0aC13cmFwcGVyXCI+XHJcblx0XHRcdFx0PEFsZXJ0XHJcblx0XHRcdFx0XHRpc0ludmFsaWQ9e3RoaXMuc3RhdGUuaXNJbnZhbGlkfVxyXG5cdFx0XHRcdFx0c2lnbmVkT3V0PXt0aGlzLnN0YXRlLnNpZ25lZE91dH1cclxuXHRcdFx0XHRcdGludmFsaWRNZXNzYWdlPXt0aGlzLnN0YXRlLmludmFsaWRNZXNzYWdlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2JveENsYXNzbmFtZX0+XHJcblx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwidS1oaWRkZW4tdmlzdWFsbHlcIj57dGhpcy5wcm9wcy5icmFuZCA/IHRoaXMucHJvcHMuYnJhbmQgOiAnS2V5c3RvbmUnfSBTaWduIEluIDwvaDE+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImF1dGgtYm94X19pbm5lclwiPlxyXG5cdFx0XHRcdFx0XHQ8QnJhbmRcclxuXHRcdFx0XHRcdFx0XHRsb2dvPXt0aGlzLnByb3BzLmxvZ299XHJcblx0XHRcdFx0XHRcdFx0YnJhbmQ9e3RoaXMucHJvcHMuYnJhbmR9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnVzZXIgPyAoXHJcblx0XHRcdFx0XHRcdFx0PFVzZXJJbmZvXHJcblx0XHRcdFx0XHRcdFx0XHRhZG1pblBhdGg9e3RoaXMucHJvcHMuZnJvbSA/IHRoaXMucHJvcHMuZnJvbSA6IEtleXN0b25lLmFkbWluUGF0aH1cclxuXHRcdFx0XHRcdFx0XHRcdHNpZ25vdXRQYXRoPXtgJHtLZXlzdG9uZS5hZG1pblBhdGh9L3NpZ25vdXRgfVxyXG5cdFx0XHRcdFx0XHRcdFx0dXNlckNhbkFjY2Vzc0tleXN0b25lPXt0aGlzLnByb3BzLnVzZXJDYW5BY2Nlc3NLZXlzdG9uZX1cclxuXHRcdFx0XHRcdFx0XHRcdHVzZXJOYW1lPXt0aGlzLnByb3BzLnVzZXIubmFtZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XHRcdDxMb2dpbkZvcm1cclxuXHRcdFx0XHRcdFx0XHRcdGVtYWlsPXt0aGlzLnN0YXRlLmVtYWlsfVxyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlSW5wdXRDaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxyXG5cdFx0XHRcdFx0XHRcdFx0aXNBbmltYXRpbmc9e3RoaXMuc3RhdGUuaXNBbmltYXRpbmd9XHJcblx0XHRcdFx0XHRcdFx0XHRwYXNzd29yZD17dGhpcy5zdGF0ZS5wYXNzd29yZH1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWZvb3RlclwiPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaWduaW5WaWV3O1xyXG4iLCIvKipcclxuICogUmVuZGVycyBhbiBBbGVydC4gUGFzcyBlaXRoZXIgYW4gaXNJbnZhbGlkIGFuZCBpbnZhbGlkTWVzc2FnZSBwcm9wLCBvciBzZXRcclxuICogdGhlIHNpZ25lZE91dCBwcm9wIHRvIHRydWUgdG8gc2hvdyB0aGUgc3RhbmRhcmQgc2lnbmVkIG91dCBtZXNzYWdlXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi8uLi9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IEFsZXJ0VmlldyA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdGlmIChwcm9wcy5pc0ludmFsaWQpIHtcclxuXHRcdHJldHVybiA8QWxlcnQga2V5PVwiZXJyb3JcIiBjb2xvcj1cImRhbmdlclwiIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+e3Byb3BzLmludmFsaWRNZXNzYWdlfTwvQWxlcnQ+O1xyXG5cdH0gZWxzZSBpZiAocHJvcHMuc2lnbmVkT3V0KSB7XHJcblx0XHRyZXR1cm4gPEFsZXJ0IGtleT1cInNpZ25lZC1vdXRcIiBjb2xvcj1cImluZm9cIiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PllvdSBoYXZlIGJlZW4gc2lnbmVkIG91dC48L0FsZXJ0PjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gQ2FuJ3QgcmV0dXJuIFwibnVsbFwiIGZyb20gc3RhdGVsZXNzIGNvbXBvbmVudHNcclxuXHRcdHJldHVybiA8c3BhbiAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5BbGVydFZpZXcucHJvcFR5cGVzID0ge1xyXG5cdGludmFsaWRNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGlzSW52YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0c2lnbmVkT3V0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRWaWV3O1xyXG4iLCIvKipcclxuICogUmVuZGVycyBhIGxvZ28sIGRlZmF1bHRpbmcgdG8gdGhlIEtleXN0b25lIGxvZ28gaWYgbm8gYnJhbmQgaXMgc3BlY2lmaWVkIGluXHJcbiAqIHRoZSBjb25maWd1cmF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IEJyYW5kID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblx0Ly8gRGVmYXVsdCB0byB0aGUgS2V5c3RvbmVKUyBsb2dvXHJcblx0bGV0IGxvZ28gPSB7IHNyYzogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9pbWFnZXMvbG9nby5wbmdgLCB3aWR0aDogMjA1LCBoZWlnaHQ6IDY4IH07XHJcblx0aWYgKHByb3BzLmxvZ28pIHtcclxuXHRcdC8vIElmIHRoZSBsb2dvIGlzIHNldCB0byBhIHN0cmluZywgaXQncyBhIGRpcmVjdCBsaW5rXHJcblx0XHRsb2dvID0gdHlwZW9mIHByb3BzLmxvZ28gPT09ICdzdHJpbmcnID8geyBzcmM6IHByb3BzLmxvZ28gfSA6IHByb3BzLmxvZ287XHJcblx0XHQvLyBPcHRpb25hbGx5IG9uZSBjYW4gc3BlY2lmeSB0aGUgbG9nbyBhcyBhbiBhcnJheSwgYWxzbyBzdGF0aW5nIHRoZVxyXG5cdFx0Ly8gd2FudGVkIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGxvZ29cclxuXHRcdC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShsb2dvKSkge1xyXG5cdFx0XHRsb2dvID0geyBzcmM6IGxvZ29bMF0sIHdpZHRoOiBsb2dvWzFdLCBoZWlnaHQ6IGxvZ29bMl0gfTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiYXV0aC1ib3hfX2NvbFwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImF1dGgtYm94X19icmFuZFwiPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIvXCIgY2xhc3NOYW1lPVwiYXV0aC1ib3hfX2JyYW5kX19sb2dvXCI+XHJcblx0XHRcdFx0XHQ8aW1nXHJcblx0XHRcdFx0XHRcdHNyYz17bG9nby5zcmN9XHJcblx0XHRcdFx0XHRcdHdpZHRoPXtsb2dvLndpZHRoID8gbG9nby53aWR0aCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdGhlaWdodD17bG9nby5oZWlnaHQgPyBsb2dvLmhlaWdodCA6IG51bGx9XHJcblx0XHRcdFx0XHRcdGFsdD17cHJvcHMuYnJhbmR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCcmFuZDtcclxuIiwiLyoqXHJcbiAqIFRoZSBsb2dpbiBmb3JtIG9mIHRoZSBzaWduaW4gc2NyZWVuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uLCBGb3JtLCBGb3JtRmllbGQsIEZvcm1JbnB1dCB9IGZyb20gJy4uLy4uL0FwcC9lbGVtZW50YWwnO1xyXG5cclxuY29uc3QgTG9naW5Gb3JtID0gKHtcclxuXHRlbWFpbCxcclxuXHRoYW5kbGVJbnB1dENoYW5nZSxcclxuXHRoYW5kbGVTdWJtaXQsXHJcblx0aXNBbmltYXRpbmcsXHJcblx0cGFzc3dvcmQsXHJcbn0pID0+IHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWJveF9fY29sXCI+XHJcblx0XHRcdDxGb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IG5vVmFsaWRhdGU+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBsYWJlbD1cIkVtYWlsXCIgaHRtbEZvcj1cImVtYWlsXCI+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0XHR0eXBlPVwiZW1haWxcIlxyXG5cdFx0XHRcdFx0XHRuYW1lPVwiZW1haWxcIlxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtlbWFpbH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBsYWJlbD1cIlBhc3N3b3JkXCIgaHRtbEZvcj1cInBhc3N3b3JkXCI+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdG5hbWU9XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e3Bhc3N3b3JkfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8QnV0dG9uIGRpc2FibGVkPXtpc0FuaW1hdGluZ30gY29sb3I9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0U2lnbiBJblxyXG5cdFx0XHRcdDwvQnV0dG9uPjxici8+PGJyLz5cclxuXHRcdFx0XHQ8YSBocmVmPVwiL2ZvcmdvdF9wYXNzd29yZFwiIHRpdGxlPVwiRm9yZ290IFBhc3N3b3JkXCI+Rm9yZ290IFBhc3N3b3JkPzwvYT5cclxuXHRcdFx0PC9Gb3JtPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkxvZ2luRm9ybS5wcm9wVHlwZXMgPSB7XHJcblx0ZW1haWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0aGFuZGxlSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0aGFuZGxlU3VibWl0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdGlzQW5pbWF0aW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRwYXNzd29yZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luRm9ybTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vLi4vQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vLyBUT0RPIEZpZ3VyZSBvdXQgaWYgd2Ugc2hvdWxkIGNoYW5nZSBcIktleXN0b25lXCIgdG8gXCJBZG1pbiBhcmVhXCJcclxuXHJcbmNvbnN0IFVzZXJJbmZvID0gKHtcclxuXHRhZG1pblBhdGgsXHJcblx0c2lnbm91dFBhdGgsXHJcblx0dXNlckNhbkFjY2Vzc0tleXN0b25lLFxyXG5cdHVzZXJOYW1lLFxyXG59KSA9PiB7XHJcblx0Y29uc3QgYWRtaW5CdXR0b24gPSB1c2VyQ2FuQWNjZXNzS2V5c3RvbmUgPyAoXHJcblx0XHQ8QnV0dG9uIGhyZWY9e2FkbWluUGF0aH0gY29sb3I9XCJwcmltYXJ5XCI+XHJcblx0XHRcdE9wZW4gS2V5c3RvbmVcclxuXHRcdDwvQnV0dG9uPlxyXG5cdCkgOiBudWxsO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJhdXRoLWJveF9fY29sXCI+XHJcblx0XHRcdDxwPkhpIHt1c2VyTmFtZX0sPC9wPlxyXG5cdFx0XHQ8cD5Zb3UncmUgYWxyZWFkeSBzaWduZWQgaW4uPC9wPlxyXG5cdFx0XHR7YWRtaW5CdXR0b259XHJcblx0XHRcdDxCdXR0b24gaHJlZj17c2lnbm91dFBhdGh9IHZhcmlhbnQ9XCJsaW5rXCIgY29sb3I9XCJjYW5jZWxcIj5cclxuXHRcdFx0XHRTaWduIE91dFxyXG5cdFx0XHQ8L0J1dHRvbj5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Vc2VySW5mby5wcm9wVHlwZXMgPSB7XHJcblx0YWRtaW5QYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0c2lnbm91dFBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHR1c2VyQ2FuQWNjZXNzS2V5c3RvbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdHVzZXJOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJJbmZvO1xyXG4iLCIvKipcclxuICogVGhlIHNpZ25pbiBwYWdlLCBpdCByZW5kZXJzIGEgcGFnZSB3aXRoIGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGlucHV0IGZvcm0uXHJcbiAqXHJcbiAqIFRoaXMgaXMgZGVjb3VwbGVkIGZyb20gdGhlIG1haW4gYXBwIChpbiB0aGUgXCJBcHAvXCIgZm9sZGVyKSBiZWNhdXNlIHdlIGluamVjdFxyXG4gKiBsb3RzIG9mIGRhdGEgaW50byB0aGUgb3RoZXIgc2NyZWVucyAobGlrZSB0aGUgbGlzdHMgdGhhdCBleGlzdCkgdGhhdCB3ZSBkb24ndFxyXG4gKiB3YW50IHRvIGhhdmUgaW5qZWN0ZWQgaGVyZSwgc28gdGhpcyBpcyBhIGNvbXBsZXRlbHkgc2VwYXJhdGUgcm91dGUgYW5kIHRlbXBsYXRlLlxyXG4gKi9cclxuaW1wb3J0IHFzIGZyb20gJ3FzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBTaWduaW4gZnJvbSAnLi9TaWduaW4nO1xyXG5cclxuY29uc3QgcGFyYW1zID0gcXMucGFyc2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpKTtcclxuY29uc3QgZnJvbSA9IHR5cGVvZiBwYXJhbXMuZnJvbSA9PT0gJ3N0cmluZycgJiYgcGFyYW1zLmZyb20uY2hhckF0KDApID09PSAnLydcclxuXHQ/IHBhcmFtcy5mcm9tIDogdW5kZWZpbmVkO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG5cdDxTaWduaW5cclxuXHRcdGJyYW5kPXtLZXlzdG9uZS5icmFuZH1cclxuXHRcdGZyb209e2Zyb219XHJcblx0XHRsb2dvPXtLZXlzdG9uZS5sb2dvfVxyXG5cdFx0dXNlcj17S2V5c3RvbmUudXNlcn1cclxuXHRcdHVzZXJDYW5BY2Nlc3NLZXlzdG9uZT17S2V5c3RvbmUudXNlckNhbkFjY2Vzc0tleXN0b25lfVxyXG5cdC8+LFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduaW4tdmlldycpXHJcbik7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGtleS1zcGFjaW5nICovXHJcbmNvbnN0IHRoZW1lID0ge307XHJcbmNvbnN0IHsgYmxlbmQsIGRhcmtlbiwgZmFkZSwgbGlnaHRlbiB9ID0gcmVxdWlyZSgnLi91dGlscy9jb2xvcicpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENPTU1PTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIGJyZWFrcG9pbnRcclxuXHJcbnRoZW1lLmJyZWFrcG9pbnROdW1lcmljID0ge1xyXG5cdG1vYmlsZTogICAgICAgICAgIDQ4MCxcclxuXHR0YWJsZXRQb3J0cmFpdDogICA3NjgsXHJcblx0dGFibGV0TGFuZHNjYXBlOiAgOTkyLFxyXG5cdGRlc2t0b3A6ICAgICAgICAgIDEyMDAsXHJcbn07XHJcbnRoZW1lLmJyZWFrcG9pbnQgPSB7XHJcblx0dGFibGV0UG9ydHJhaXRNaW46ICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgMSkgKyAncHgnLFxyXG5cdHRhYmxldExhbmRzY2FwZU1pbjogKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgMSkgKyAncHgnLFxyXG5cdGRlc2t0b3BNaW46ICAgICAgICAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldExhbmRzY2FwZSArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTGFyZ2VNaW46ICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgMSkgKyAncHgnLFxyXG5cclxuXHRtb2JpbGVNYXg6ICAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5tb2JpbGUgKyAncHgnLFxyXG5cdHRhYmxldFBvcnRyYWl0TWF4OiAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0ICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNYXg6ICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAncHgnLFxyXG5cdGRlc2t0b3BNYXg6ICAgICAgICAgIHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLmRlc2t0b3AgKyAncHgnLFxyXG59O1xyXG5cclxuLy8gY29udGFpbmVyXHJcblxyXG50aGVtZS5jb250YWluZXIgPSB7XHJcblx0Z3V0dGVyOiAyMCxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogIDc1MCxcclxuXHRcdG1lZGl1bTogOTcwLFxyXG5cdFx0bGFyZ2U6IDExNzAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGNvbG9yXHJcblxyXG50aGVtZS5jb2xvciA9IHtcclxuXHRib2R5OiAgICAgICAgICAgICAgICAnI2ZhZmFmYScsXHJcblx0bGluazogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGxpbmtIb3ZlcjogICAgICAgICAgIGxpZ2h0ZW4oJyMxMzg1ZTUnLCAxMCksXHJcblx0dGV4dDogICAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cclxuXHQvLyBjb250ZXh0dWFsXHJcblx0c3VjY2VzczogICAgICAgICAgICAgJyMzNGMyNDAnLFxyXG5cdGNyZWF0ZTogICAgICAgICAgICAgICcjMzRjMjQwJywgLy8gYWxpYXMgZm9yIHN1Y2Nlc3NcclxuXHRwcmltYXJ5OiAgICAgICAgICAgICAnIzEzODVlNScsXHJcblx0aW5mbzogICAgICAgICAgICAgICAgJyMxMzg1ZTUnLCAvLyBhbGlhcyBmb3IgcHJpbWFyeVxyXG5cdHdhcm5pbmc6ICAgICAgICAgICAgICcjRkEzJyxcclxuXHRkYW5nZXI6ICAgICAgICAgICAgICAnI2Q2NDI0MicsXHJcblx0ZXJyb3I6ICAgICAgICAgICAgICAgJyNkNjQyNDInLCAvLyBhbGlhcyBmb3IgZGFuZ2VyXHJcblxyXG5cdC8vIG5ldXRyYWxzXHJcblx0Z3JheTkwOiAgICAgICAgICAgICAgJyMxQTFBMUEnLFxyXG5cdGdyYXk4MDogICAgICAgICAgICAgICcjMzMzJyxcclxuXHRncmF5NzA6ICAgICAgICAgICAgICAnIzRENEQ0RCcsXHJcblx0Z3JheTYwOiAgICAgICAgICAgICAgJyM2NjYnLFxyXG5cdGdyYXk1MDogICAgICAgICAgICAgICcjN0Y3RjdGJyxcclxuXHRncmF5NDA6ICAgICAgICAgICAgICAnIzk5OScsXHJcblx0Z3JheTMwOiAgICAgICAgICAgICAgJyNCM0IzQjMnLFxyXG5cdGdyYXkyMDogICAgICAgICAgICAgICcjQ0NDJyxcclxuXHRncmF5MTU6ICAgICAgICAgICAgICAnI0Q5RDlEOScsXHJcblx0Z3JheTEwOiAgICAgICAgICAgICAgJyNFNUU1RTUnLFxyXG5cdGdyYXkwNTogICAgICAgICAgICAgICcjRjJGMkYyJyxcclxuXHJcblx0Ly8gc29jaWFsXHJcblx0ZmFjZWJvb2s6ICAgICAgICAgICAgJyMzQjU5OTgnLFxyXG5cdGdvb2dsZTogICAgICAgICAgICAgICcjREM0RTQxJyxcclxuXHRpbnN0YWdyYW06ICAgICAgICAgICAnIzNmNzI5YicsXHJcblx0cGludGVyZXN0OiAgICAgICAgICAgJyNiZDA4MWMnLFxyXG5cdHR1bWJscjogICAgICAgICAgICAgICcjMzU0NjVjJyxcclxuXHR0d2l0dGVyOiAgICAgICAgICAgICAnIzU1QUNFRScsXHJcblx0eW91dHViZTogICAgICAgICAgICAgJyNjZDIwMWYnLFxyXG5cdHZpbWVvOiAgICAgICAgICAgICAgICcjMWFiN2VhJyxcclxufTtcclxuXHJcbi8vIGJvcmRlciByYWRpaVxyXG5cclxudGhlbWUuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHNtYWxsOiAnMC4xMjVyZW0nLFxyXG5cdGRlZmF1bHQ6ICcwLjNyZW0nLFxyXG5cdGxhcmdlOiAnMC41cmVtJyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuXHJcbnRoZW1lLnNwYWNpbmcgPSB7XHJcblx0eHNtYWxsOiAgICAgIDUsXHJcblx0c21hbGw6ICAgICAgIDEwLFxyXG5cdGRlZmF1bHQ6ICAgICAyMCxcclxuXHRsYXJnZTogICAgICAgMzAsXHJcblx0eGxhcmdlOiAgICAgIDQwLFxyXG5cdHh4bGFyZ2U6ICAgICA2MCxcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBFTEVNRU5UQUwgU1BFQ0lGSUNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBidXR0b25cclxuXHJcbnRoZW1lLmJ1dHRvbiA9IHtcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGZvbnQ6IHtcclxuXHRcdHdlaWdodDogNTAwLFxyXG5cdH0sXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcxZW0nLFxyXG5cdGRlZmF1bHQ6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0cHJpbWFyeToge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5wcmltYXJ5LCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0fSxcclxuXHRzdWNjZXNzOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnN1Y2Nlc3MsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR9LFxyXG5cdHdhcm5pbmc6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3Iud2FybmluZywgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0ZGFuZ2VyOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IuZGFuZ2VyLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gYmxhbmsgc3RhdGVcclxuXHJcbnRoZW1lLmJsYW5rc3RhdGUgPSB7XHJcblx0YmFja2dyb3VuZDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDQpLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRwYWRkaW5nSG9yaXpvbnRhbDogJzJlbScsXHJcblx0cGFkZGluZ1ZlcnRpY2FsOiAnNGVtJyxcclxufTtcclxuXHJcbi8vIGZvbnRcclxuXHJcbnRoZW1lLmZvbnQgPSB7XHJcblx0ZmFtaWx5OiB7XHJcblx0XHRtb25vOiAnTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlJyxcclxuXHRcdHNhbnNTZXJpZjogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXHJcblx0XHRzZXJpZjogJ0dlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmJyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHh4c21hbGw6ICcwLjY1cmVtJyxcclxuXHRcdHhzbWFsbDogJzAuNzVyZW0nLFxyXG5cdFx0c21hbGw6ICcwLjg1cmVtJyxcclxuXHRcdGRlZmF1bHQ6ICcxcmVtJyxcclxuXHRcdG1lZGl1bTogJzEuMnJlbScsXHJcblx0XHRsYXJnZTogJzEuNnJlbScsXHJcblx0XHR4bGFyZ2U6ICcyLjRyZW0nLFxyXG5cdFx0eHhsYXJnZTogJzMuMnJlbScsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGZvcm1cclxuXHJcbnRoZW1lLmZvcm0gPSB7XHJcblx0bGFiZWw6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NTAsXHJcblx0XHRmb250U2l6ZTogJzFyZW0nLFxyXG5cdFx0Zm9udFdlaWdodDogJ25vcm1hbCcsXHJcblx0XHR3aWR0aDogMTgwLFxyXG5cdH0sXHJcblx0bm90ZToge1xyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGZvbnRTaXplOiAnMC45ZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnRcclxuXHJcbnRoZW1lLmNvbXBvbmVudCA9IHtcclxuXHRsaW5lSGVpZ2h0OiAnMi4zZW0nLFxyXG5cdGhlaWdodDogJzIuNGVtJyxcclxuXHRwYWRkaW5nOiAnMWVtJyxcclxufTtcclxuXHJcbi8vIGlucHV0XHJcblxyXG50aGVtZS5pbnB1dCA9IHtcclxuXHRiYWNrZ3JvdW5kOiB7XHJcblx0XHRkZWZhdWx0OiAnd2hpdGUnLFxyXG5cdFx0ZGlzYWJsZWQ6ICcjZmFmYWZhJyxcclxuXHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDIpLFxyXG5cdH0sXHJcblx0cGxhY2Vob2xkZXJDb2xvcjogJyNhYWEnLFxyXG5cdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdGhlaWdodDogdGhlbWUuY29tcG9uZW50LmhlaWdodCxcclxuXHRib3JkZXI6IHtcclxuXHRcdGNvbG9yOiB7XHJcblx0XHRcdGRlZmF1bHQ6ICcjY2NjJyxcclxuXHRcdFx0Zm9jdXM6IHRoZW1lLmNvbG9yLmluZm8sXHJcblx0XHRcdGhvdmVyOiAnI2JiYicsXHJcblx0XHRcdG5vZWRpdDogZGFya2VuKHRoZW1lLmNvbG9yLmJvZHksIDgpLFxyXG5cdFx0fSxcclxuXHRcdHJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHR3aWR0aDogMSxcclxuXHR9LFxyXG5cdGJveFNoYWRvdzogJ2luc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScsXHJcblx0Ym94U2hhZG93Rm9jdXM6IGBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCAwIDNweCAke2ZhZGUodGhlbWUuY29sb3IuaW5mbywgMTApfWAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcuNzVlbScsXHJcbn07XHJcblxyXG4vLyBzZWxlY3RcclxuXHJcbnRoZW1lLnNlbGVjdCA9IHtcclxuXHRib3hTaGFkb3c6ICcwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG59O1xyXG5cclxuLy8gYWxlcnRcclxuXHJcbnRoZW1lLmFsZXJ0ID0ge1xyXG5cdHBhZGRpbmc6ICcwLjc1ZW0gIDFlbScsXHJcblx0bWFyZ2luOiAnMCAwIDFlbScsXHJcblx0Ym9yZGVyV2lkdGg6IDEsXHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IuZGFuZ2VyLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdH0sXHJcblx0XHRpbmZvOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3IucHJpbWFyeSwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci5zdWNjZXNzLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR9LFxyXG5cdFx0d2FybmluZzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLndhcm5pbmcsIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGdseXBoXHJcblxyXG50aGVtZS5nbHlwaCA9IHtcclxuXHRjb2xvcjoge1xyXG5cdFx0ZGFuZ2VyOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHRpbmhlcml0OiAnaW5oZXJpdCcsXHJcblx0XHRpbnZlcnRlZDogJ3doaXRlJyxcclxuXHRcdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRzdWNjZXNzOiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0d2FybmluZzogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdHNpemU6IHtcclxuXHRcdHNtYWxsOiAxNixcclxuXHRcdG1lZGl1bTogMzIsXHJcblx0XHRsYXJnZTogNjQsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIG1vZGFsXHJcblxyXG50aGVtZS5tb2RhbCA9IHtcclxuXHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjgpJyxcclxuXHR6SW5kZXg6IDEwMCxcclxuXHRwYWRkaW5nOiB7XHJcblx0XHRkaWFsb2c6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogJzFlbScsXHJcblx0XHRcdHZlcnRpY2FsOiAwLFxyXG5cdFx0fSxcclxuXHRcdGJvZHk6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzFlbScsXHJcblx0XHR9LFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMC42ZW0nLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gcGFnaW5hdGlvblxyXG5cclxudGhlbWUucGFnaW5hdGlvbiA9IHtcclxuXHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cclxuXHRob3Zlcjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3doaXRlJyxcclxuXHRcdGJvcmRlcjogJ3JnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0c2VsZWN0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyxcclxuXHRcdGJvcmRlcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NjAsXHJcblx0fSxcclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHNwaW5uZXJcclxuXHJcbnRoZW1lLnNwaW5uZXIgPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0ZGVmYXVsdDogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDpcdDQsXHJcblx0XHRtZWRpdW06XHQ4LFxyXG5cdFx0bGFyZ2U6XHQxNixcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcclxuIiwiLyoqXHJcblx0VmFsaWRhdGUgSGV4XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBoZXhcclxuXHJcblx0MS4gcmVtb3ZlIGhhc2ggaWYgcHJlc2VudFxyXG5cdDIuIGNvbnZlcnQgZnJvbSAzIHRvIDYgZGlnaXQgY29sb3IgY29kZSAmIGVuc3VyZSB2YWxpZCBoZXhcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSGV4IChjb2xvcikge1xyXG5cdGNvbnN0IGhleCA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblxyXG5cdGlmIChoZXgubGVuZ3RoID09PSAzKSB7XHJcblx0XHRyZXR1cm4gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xyXG5cdH1cclxuXHRpZiAoaGV4Lmxlbmd0aCAhPT0gNikge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbG9yIHZhbHVlIHByb3ZpZGVkOiBcIiR7Y29sb3J9XCJgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBoZXg7XHJcbn07XHJcblxyXG4vKipcclxuXHRGYWRlIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIGEgaGV4aWRlY2ltYWwgY29sb3IsIGNvbnZlcnRzIGl0IHRvIFJHQiBhbmQgYXBwbGllcyBhbiBhbHBoYSB2YWx1ZS5cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBjb252ZXJ0IGhleCB0byBSR0JcclxuXHQyLiBjb21iaW5lIGFuZCBhZGQgYWxwaGEgY2hhbm5lbFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gZmFkZSAoY29sb3IsIG9wYWNpdHkgPSAxMDApIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBvcGFjaXR5IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpO1xyXG5cdGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XHJcblx0Y29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcclxuXHJcblx0Ly8gMi5cclxuXHRjb25zdCByZXN1bHQgPSAncmdiYSgnXHJcblx0XHQrIHIgKyAnLCdcclxuXHRcdCsgZyArICcsJ1xyXG5cdFx0KyBiICsgJywnXHJcblx0XHQrIGRlY2ltYWxGcmFjdGlvblxyXG5cdFx0KyAnKSc7XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0U2hhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBsaWdodGVucyBvciBkYXJrZW5zXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvclxyXG5cdEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBzaGFkZSAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRsZXQgZiA9IHBhcnNlSW50KGhleCwgMTYpO1xyXG5cdGxldCB0ID0gZGVjaW1hbEZyYWN0aW9uIDwgMCA/IDAgOiAyNTU7XHJcblx0bGV0IHAgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gZGVjaW1hbEZyYWN0aW9uICogLTEgOiBkZWNpbWFsRnJhY3Rpb247XHJcblxyXG5cdGNvbnN0IFIgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQiA9IGYgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIFIpICogcCkgKyBSKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBHKSAqIHApICsgRykgKiAweDEwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEIpICogcCkgKyBCKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLy8gc2hhZGUgaGVscGVyc1xyXG5jb25zdCBsaWdodGVuID0gc2hhZGU7XHJcbmZ1bmN0aW9uIGRhcmtlbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRyZXR1cm4gc2hhZGUoY29sb3IsIHBlcmNlbnQgKiAtMSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0QmxlbmQgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgdHdvIGhleGlkZWNpbWFsIGNvbG9ycyBhbmQgYmxlbmQgdGhlbSB0b2dldGhlclxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IxXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yMlxyXG5cdEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBibGVuZCAoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleDEgPSB2YWxpZGF0ZUhleChjb2xvcjEpO1xyXG5cdGNvbnN0IGhleDIgPSB2YWxpZGF0ZUhleChjb2xvcjIpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IGYgPSBwYXJzZUludChoZXgxLCAxNik7XHJcblx0Y29uc3QgdCA9IHBhcnNlSW50KGhleDIsIDE2KTtcclxuXHJcblx0Y29uc3QgUjEgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcxID0gZiA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIxID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHRjb25zdCBSMiA9IHQgPj4gMTY7XHJcblx0Y29uc3QgRzIgPSB0ID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjIgPSB0ICYgMHgwMDAwRkY7XHJcblxyXG5cdC8vIDIuXHJcblx0cmV0dXJuICcjJyArICgweDEwMDAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKFIyIC0gUjEpICogZGVjaW1hbEZyYWN0aW9uKSArIFIxKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEcyIC0gRzEpICogZGVjaW1hbEZyYWN0aW9uKSArIEcxKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChCMiAtIEIxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBCMSkpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YmxlbmQsXHJcblx0ZGFya2VuLFxyXG5cdGZhZGUsXHJcblx0bGlnaHRlbixcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb25jYXRlbmF0ZSBDbGFzc25hbWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gU3VwcG9ydCBjbGFzc05hbWUgYXMgYW4gYXJyYXk6XHJcbi8vIGZvcmNlIGNsYXNzbmFtZSBwcm9wIGludG8gYW4gYXJyYXkgKHBvc3NpYmx5IG9mIGFycmF5cykgdGhlbiBmbGF0dGVuXHJcblxyXG4vKlxyXG5cdC8vIFRvIHVzZSBzcHJlYWQgdGhlIG5ldyBhcnJheSBpbnRvIGFwaHJvZGl0ZSdzIGBjc3NgIGZ1bmN0aW9uXHJcblxyXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5jb21wb25lbnQsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoY2xhc3NOYW1lKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH07XHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNhdENsYXNzbmFtZXMgKGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBbY2xhc3NOYW1lXS5yZWR1Y2UoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhLmNvbmNhdChiKTtcclxuXHR9LCBbXSk7XHJcbn07XHJcbiIsIi8qKlxyXG5cdExpbmVhciBHcmFkaWVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYWRkaW5nIGEgbGluZWFyIGdyYWRpZW50IHRvIHlvdXIgY29tcG9uZW50LlxyXG5cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBzaWRlT3JDb3JuZXJcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSB0b3BcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBib3R0b21cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBiYXNlIChvcHRpb25hbClcclxuXHQtIEByZXR1cm5zIHtPYmplY3R9IGNzcyBsaW5lYXIgZ3JhZGllbnQgZGVjbGFyYXRpb25cclxuXHJcblx0U3ByZWFkIHRoZSBkZWNsYXJhdGlvbiBpbnRvIHlvdXIgY29tcG9uZW50IGNsYXNzOlxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRteUNvbXBvbmVudENsYXNzOiB7XHJcblx0XHQuLi5saW5lYXJHcmFkaWVudChyZWQsIGJsdWUpLFxyXG5cdH1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGxpbmVhckdyYWRpZW50IChkaXJlY3Rpb24sIHRvcCwgYm90dG9tLCBiYXNlID0gJycpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2RpcmVjdGlvbn0sICR7dG9wfSAwJSwgJHtib3R0b219IDEwMCUpICR7YmFzZX1gLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIFZlcnRpY2FsIEdyYWRpZW50XHJcbmZ1bmN0aW9uIGdyYWRpZW50VmVydGljYWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byBib3R0b20nLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8vIEhvcml6b250YWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRIb3Jpem9udGFsICh0b3AsIGJvdHRvbSwgYmFzZSkge1xyXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudCgndG8gcmlnaHQnLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8qKlxyXG5cdEJvcmRlciBSYWRpdXNcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0U2hvcnQtaGFuZCBoZWxwZXIgZm9yIGJvcmRlciByYWRpaVxyXG4qL1xyXG5cclxuLy8gdG9wXHJcbmZ1bmN0aW9uIGJvcmRlclRvcFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gcmlnaHRcclxuZnVuY3Rpb24gYm9yZGVyUmlnaHRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBib3R0b21cclxuZnVuY3Rpb24gYm9yZGVyQm90dG9tUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBsZWZ0XHJcbmZ1bmN0aW9uIGJvcmRlckxlZnRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gUmV0dXJuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRib3JkZXJUb3BSYWRpdXMsXHJcblx0Ym9yZGVyUmlnaHRSYWRpdXMsXHJcblx0Ym9yZGVyQm90dG9tUmFkaXVzLFxyXG5cdGJvcmRlckxlZnRSYWRpdXMsXHJcblxyXG5cdGdyYWRpZW50SG9yaXpvbnRhbCxcclxuXHRncmFkaWVudFZlcnRpY2FsLFxyXG59O1xyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIl19
