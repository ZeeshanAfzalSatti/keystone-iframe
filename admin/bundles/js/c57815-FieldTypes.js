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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL2Nsb3VkaW5hcnktbWljcm91cmwvdXJsLmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL0FsZXJ0L2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9BbGVydC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0JsYW5rU3RhdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQnV0dG9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvQ2VudGVyL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9DZW50ZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9DaGlwL2NvbG9ycy5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ2hpcC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0NvbnRhaW5lci9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvQ29udGFpbmVyL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Db250YWluZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Ecm9wZG93bkJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUZpZWxkL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtRmllbGQvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9Gb3JtSW5wdXQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9ub2VkaXQuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1JbnB1dC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1MYWJlbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybUxhYmVsL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybU5vdGUvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm1Ob3RlL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvRm9ybVNlbGVjdC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0Zvcm0vc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaEJ1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGhGaWVsZC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvR2x5cGgvb2N0aWNvbnMuanMiLCJBcHAvZWxlbWVudGFsL0dseXBoL3NpemVzLmpzIiwiQXBwL2VsZW1lbnRhbC9HbHlwaC9zdHlsZXMuanMiLCJBcHAvZWxlbWVudGFsL0dyaWRDb2wvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWRSb3cvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0dyaWQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0lubGluZUdyb3VwU2VjdGlvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXBTZWN0aW9uL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvSW5saW5lR3JvdXAvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL0xhYmVsbGVkQ29udHJvbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTGFiZWxsZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvTG9hZGluZ0J1dHRvbi9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvYm9keS5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvZGlhbG9nLmpzIiwiQXBwL2VsZW1lbnRhbC9Nb2RhbC9mb290ZXIuanMiLCJBcHAvZWxlbWVudGFsL01vZGFsL2hlYWRlci5qcyIsIkFwcC9lbGVtZW50YWwvTW9kYWwvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BhZ2luYXRpb24vcGFnZS5qcyIsIkFwcC9lbGVtZW50YWwvUGFzc0NvbnRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1BvcnRhbC9pbmRleC5qcyIsIkFwcC9lbGVtZW50YWwvUmVzcG9uc2l2ZVRleHQvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NjcmVlblJlYWRlck9ubHkvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1Njcm9sbExvY2svaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NlZ21lbnRlZENvbnRyb2wvY29sb3JzLmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiQXBwL2VsZW1lbnRhbC9TZWdtZW50ZWRDb250cm9sL3N0eWxlcy5qcyIsIkFwcC9lbGVtZW50YWwvU3Bpbm5lci9jb2xvcnMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvaW5kZXguanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc2l6ZXMuanMiLCJBcHAvZWxlbWVudGFsL1NwaW5uZXIvc3R5bGVzLmpzIiwiQXBwL2VsZW1lbnRhbC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvQWxlcnRNZXNzYWdlcy5qcyIsIkFwcC9zaGFyZWQvQ3JlYXRlRm9ybS5qcyIsIkFwcC9zaGFyZWQvSWZyYW1lQ29udGVudC5qcyIsIkFwcC9zaGFyZWQvSW52YWxpZEZpZWxkVHlwZS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dEJvZHkuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRGb290ZXIuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRIZWFkZXIuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0LmpzIiwiQXBwL3NoYXJlZC9Qb3BvdXQvUG9wb3V0TGlzdEhlYWRpbmcuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0SXRlbS5qcyIsIkFwcC9zaGFyZWQvUG9wb3V0L1BvcG91dFBhbmUuanMiLCJBcHAvc2hhcmVkL1BvcG91dC9pbmRleC5qcyIsIkFwcC9zaGFyZWQvUG9ydGFsLmpzIiwiY29uc3RhbnRzLmpzIiwidGhlbWUuanMiLCJ1dGlscy9MaXN0LmpzIiwidXRpbHMvY2xvdWRpbmFyeVJlc2l6ZS5qcyIsInV0aWxzL2NvbG9yLmpzIiwidXRpbHMvY29uY2F0Q2xhc3NuYW1lcy5qcyIsInV0aWxzL2Nzcy5qcyIsInV0aWxzL2xpc3RzLmpzIiwidXRpbHMvc3RyaW5nLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvQ2hlY2tib3guanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9Db2xsYXBzZWRGaWVsZExhYmVsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvRGF0ZUlucHV0LmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvRmlsZUNoYW5nZU1lc3NhZ2UuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9IaWRkZW5GaWxlSW5wdXQuanMiLCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9JbWFnZVRodW1ibmFpbC5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlLmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9DbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5LmpzIiwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy9jb21wb25lbnRzL2NvbHVtbnMvSW52YWxpZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9GaWVsZC5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5Db2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZS9EYXRlQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGUvRGF0ZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmllbGQuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvbmFtZS9OYW1lQ29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZENvbHVtbi5qcyIsIi4uLy4uL2ZpZWxkcy90eXBlcy9wYXNzd29yZC9QYXNzd29yZEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmlsdGVyLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBDb2x1bW4uanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvcmVsYXRpb25zaGlwL1JlbGF0aW9uc2hpcEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXIuanMiLCIuLi8uLi9maWVsZHMvdHlwZXMvdGV4dC9UZXh0Q29sdW1uLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkLmpzIiwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpbHRlci5qcyIsIi4uLy4uL2ZpZWxkcy91dGlscy9ldmFsRGVwZW5kc09uLmpzIiwiLi4vLi4vLi4vb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIl9zdHJlYW1fMC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLFFBQVEsQ0FDVixFQUFDLE1BQU0sTUFBUCxFQUFlLFFBQU8sR0FBdEIsRUFEVSxFQUVWLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFGVSxFQUdWLEVBQUMsTUFBTSxjQUFQLEVBQXVCLFFBQU8sR0FBOUIsRUFIVSxFQUlWLEVBQUMsTUFBTSxPQUFQLEVBQWdCLFFBQU8sSUFBdkIsRUFKVSxFQUtWLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sR0FBekIsRUFMVSxFQU1WLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFOVSxFQU9WLEVBQUMsTUFBTSxRQUFQLEVBQWlCLFFBQU8sR0FBeEIsRUFQVSxFQVFWLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sR0FBekIsRUFSVSxFQVNWLEVBQUMsTUFBTSxPQUFQLEVBQWdCLFFBQU8sR0FBdkIsRUFUVSxDQUFaOztBQVlBLE9BQU8sT0FBUCxHQUFpQixVQUFTLEVBQVQsRUFBYSxPQUFiLEVBQXNCO0FBQ3JDLE1BQUksQ0FBQyxPQUFMLEVBQWMsVUFBVSxFQUFWOztBQUVkLE1BQUksU0FBUyxRQUFRLE1BQVIsR0FBaUIsT0FBakIsR0FBMkIsTUFBeEM7QUFDQSxNQUFJLGFBQWEsUUFBUSxVQUF6QjtB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QUZPO0FBR2pCLGdCQUFjLFFBQVEsbURBQVIsQ0FIRztBQUlqQixRQUFNLFFBQVEsbUNBQVIsQ0FKVztBQUtqQixTQUFPLFFBQVEscUNBQVIsQ0FMVTtBQU1qQixZQUFVLFFBQVEsMkNBQVIsQ0FOTztBQU9qQixtQkFBaUIsUUFBUSx5REFBUixDQVBBO0FBUWpCLFdBQVMsUUFBUSx5Q0FBUjtBQVJRLENBQWpCO0FBVUEsUUFBUSxPQUFSLEdBQWtCO0FBQ2xCLFFBQU0sUUFBUSxvQ0FBUixDQURZO0FBRWxCLFlBQVUsUUFBUSw0Q0FBUixDQUZRO0FBR2xCLGdCQUFjLFFBQVEsb0RBQVIsQ0FISTtBQUlsQixRQUFNLFFBQVEsb0NBQVIsQ0FKWTtBQUtsQixTQUFPLFFBQVEsc0NBQVIsQ0FMVztBQU1sQixZQUFVLFFBQVEsNENBQVIsQ0FOUTtBQU9sQixtQkFBaUIsUUFBUSwwREFBUixDQVBDO0FBUWxCLFdBQVMsUUFBUSwwQ0FBUjtBQVJTLENBQWxCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gRXhhbXBsZSBvcHRpb25zOlxuXG4vLyBmbGFnczogJ3Byb2dyZXNzaXZlJ1xuLy8gZmxhZ3M6IFsncHJvZ3Jlc3NpdmUnXVxuLy8gcXVhbGl0eTogODBcbi8vIGNyb3A6ICdmaXQnLCAnZmlsbCdcbi8vIGdyYXZpdHk6ICdmYWNlJ1xuLy8gZmV0Y2hfZm9ybWF0OiAnYXV0bydcbi8vIHdpZHRoOiAzMDBcbi8vIGhlaWdodDogMzAwXG4vLyBlZmZlY3Q6IGJsdXI6MjAwXG5cbnZhciBUWVBFUyA9IFtcbiAge25hbWU6ICdjcm9wJywgcHJlZml4OidjJ30sXG4gIHtuYW1lOiAnZWZmZWN0JywgcHJlZml4OidlJ30sXG4gIHtuYW1lOiAnZmV0Y2hfZm9ybWF0JywgcHJlZml4OidmJ30sXG4gIHtuYW1lOiAnZmxhZ3MnLCBwcmVmaXg6J2ZsJ30sXG4gIHtuYW1lOiAnZ3Jhdml0eScsIHByZWZpeDonZyd9LFxuICB7bmFtZTogJ2hlaWdodCcsIHByZWZpeDonaCd9LFxuICB7bmFtZTogJ3JhZGl1cycsIHByZWZpeDoncid9LFxuICB7bmFtZTogJ3F1YWxpdHknLCBwcmVmaXg6J3EnfSxcbiAge25hbWU6ICd3aWR0aCcsIHByZWZpeDondyd9LFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICB2YXIgc2NoZW1lID0gb3B0aW9ucy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB2YXIgY2xvdWRfbmFtZSA9IG9wdGlvbnMuY2xvdWRfbmFtZTtcbiAgaWYgKCFjbG91ZF9uYW1lKSB0aHJvdyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBvcHRpb25zLmNsb3VkX25hbWUnKTtcbiAgXG4gIHZhciBwYXJhbXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IFRZUEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5hbWUgPSBUWVBFU1tpXS5uYW1lO1xuICAgIHZhciBwcmVmaXggPSBUWVBFU1tpXS5wcmVmaXg7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zW25hbWVdKSkge1xuICAgICAgb3B0aW9uc1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKG9wdCkge3BhcmFtcy5wdXNoKHByZWZpeCArICdfJyArIG9wdCl9KTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgcGFyYW1zLnB1c2gocHJlZml4ICsgJ18nICsgb3B0aW9uc1tuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHVybFBhcmFtcyA9IHBhcmFtcy5sZW5ndGggPyBwYXJhbXMuam9pbignLCcpICsgJy8nIDogJyc7XG4gIHJldHVybiBzY2hlbWUgKyAnOi8vcmVzLmNsb3VkaW5hcnkuY29tLydcbiAgICArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmNsb3VkX25hbWUpXG4gICAgKyAnL2ltYWdlL3VwbG9hZC8nICsgdXJsUGFyYW1zXG4gICAgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpO1xufTtcblxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRhbmdlcjogdGhlbWUuYWxlcnQuY29sb3IuZGFuZ2VyLFxyXG5cdGVycm9yOiB0aGVtZS5hbGVydC5jb2xvci5kYW5nZXIsXHJcblx0aW5mbzogdGhlbWUuYWxlcnQuY29sb3IuaW5mbyxcclxuXHRzdWNjZXNzOiB0aGVtZS5hbGVydC5jb2xvci5zdWNjZXNzLFxyXG5cdHdhcm5pbmc6IHRoZW1lLmFsZXJ0LmNvbG9yLndhcm5pbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuLCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG4vLyBjbG9uZSBjaGlsZHJlbiBpZiBhIGNsYXNzIGV4aXN0cyBmb3IgdGhlIHRhZ25hbWVcclxuY29uc3QgY2xvbmVXaXRoQ2xhc3NuYW1lcyA9IChjKSA9PiB7XHJcblx0Y29uc3QgdHlwZSA9IGMudHlwZSAmJiBjLnR5cGUuZGlzcGxheU5hbWVcclxuXHRcdD8gYy50eXBlLmRpc3BsYXlOYW1lXHJcblx0XHQ6IGMudHlwZSB8fCBudWxsO1xyXG5cclxuXHRpZiAoIXR5cGUgfHwgIWNsYXNzZXNbdHlwZV0pIHJldHVybiBjO1xyXG5cclxuXHRyZXR1cm4gY2xvbmVFbGVtZW50KGMsIHtcclxuXHRcdGNsYXNzTmFtZTogY3NzKGNsYXNzZXNbdHlwZV0pLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQWxlcnQgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYWxlcnQsXHJcblx0XHRjbGFzc2VzW2NvbG9yXSxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblx0cHJvcHMuY2hpbGRyZW4gPSBDaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGNsb25lV2l0aENsYXNzbmFtZXMpO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IGRhdGEtYWxlcnQtdHlwZT17Y29sb3J9IC8+O1xyXG59O1xyXG5cclxuQWxlcnQucHJvcFR5cGVzID0ge1xyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoY29sb3JzKSkuaXNSZXF1aXJlZCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG59O1xyXG5BbGVydC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbk9iamVjdC5rZXlzKGNvbG9ycykuZm9yRWFjaChjb2xvciA9PiB7XHJcblx0Y29sb3JWYXJpYW50c1tjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZCxcclxuXHRcdGJvcmRlckNvbG9yOiBjb2xvcnNbY29sb3JdLmJvcmRlcixcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLnRleHQsXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIGhlYWRpbmdzXHJcbmNvbnN0IGhlYWRpbmdUYWduYW1lcyA9IHt9O1xyXG5bJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10uZm9yRWFjaCh0YWcgPT4ge1xyXG5cdGhlYWRpbmdUYWduYW1lc1t0YWddID0geyBjb2xvcjogJ2luaGVyaXQnIH07XHJcbn0pO1xyXG5cclxuY29uc3QgbGlua1N0eWxlcyA9IHtcclxuXHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcclxuXHJcblx0Jzpob3Zlcic6IHsgY29sb3I6ICdpbmhlcml0JyB9LFxyXG5cdCc6Zm9jdXMnOiB7IGNvbG9yOiAnaW5oZXJpdCcgfSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFsZXJ0OiB7XHJcblx0XHRib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYWxlcnQuYm9yZGVyUmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuYWxlcnQuYm9yZGVyV2lkdGgsXHJcblx0XHRtYXJnaW46IHRoZW1lLmFsZXJ0Lm1hcmdpbixcclxuXHRcdHBhZGRpbmc6IHRoZW1lLmFsZXJ0LnBhZGRpbmcsXHJcblx0fSxcclxuXHJcblx0Ly8gdGFnbmFtZXNcclxuXHRhOiBsaW5rU3R5bGVzLFxyXG5cdExpbms6IGxpbmtTdHlsZXMsXHJcblx0c3Ryb25nOiB7XHJcblx0XHRmb250V2VpZ2h0OiA1MDAsXHJcblx0fSxcclxuXHJcblx0Ly8gaGVhZGluZ3NcclxuXHQuLi5oZWFkaW5nVGFnbmFtZXMsXHJcblxyXG5cdC8vIGNvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBCbGFua1N0YXRlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGhlYWRpbmcsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udGFpbmVyLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfT5cclxuXHRcdFx0eyEhaGVhZGluZyAmJiA8aDIgZGF0YS1lMmUtYmxhbmstc3RhdGUtaGVhZGluZyBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmhlYWRpbmcpfT57aGVhZGluZ308L2gyPn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0PC9Db21wb25lbnQ+XHJcblx0KTtcclxufTtcclxuXHJcbkJsYW5rU3RhdGUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSkuaXNSZXF1aXJlZCxcclxuXHRoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5CbGFua1N0YXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRjb250YWluZXI6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmxhbmtzdGF0ZS5iYWNrZ3JvdW5kLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ibGFua3N0YXRlLmJvcmRlclJhZGl1cyxcclxuXHRcdGNvbG9yOiB0aGVtZS5ibGFua3N0YXRlLmNvbG9yLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nVmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nSG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdSaWdodDogdGhlbWUuYmxhbmtzdGF0ZS5wYWRkaW5nSG9yaXpvbnRhbCxcclxuXHRcdHBhZGRpbmdUb3A6IHRoZW1lLmJsYW5rc3RhdGUucGFkZGluZ1ZlcnRpY2FsLFxyXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcclxuXHR9LFxyXG5cclxuXHRoZWFkaW5nOiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luQm90dG9tOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbGFua1N0YXRlO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY29uc3QgY29tbW9uQ2xhc3NlcyA9IHN0eWxlcy5jb21tb247XHJcbmNvbnN0IHN0eWxlc2hlZXRDYWNoZSA9IHt9O1xyXG5mdW5jdGlvbiBnZXRTdHlsZVNoZWV0ICh2YXJpYW50LCBjb2xvcikge1xyXG5cdGNvbnN0IGNhY2hlS2V5ID0gYCR7dmFyaWFudH0tJHtjb2xvcn1gO1xyXG5cdGlmICghc3R5bGVzaGVldENhY2hlW2NhY2hlS2V5XSkge1xyXG5cdFx0Y29uc3QgdmFyaWFudFN0eWxlcyA9IHN0eWxlc1t2YXJpYW50XShjb2xvcik7XHJcblx0XHRzdHlsZXNoZWV0Q2FjaGVbY2FjaGVLZXldID0gdmFyaWFudFN0eWxlcztcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlc2hlZXRDYWNoZVtjYWNoZUtleV07XHJcbn1cclxuXHJcbmNvbnN0IEJVVFRPTl9TSVpFUyA9IFsnbGFyZ2UnLCAnbWVkaXVtJywgJ3NtYWxsJywgJ3hzbWFsbCddO1xyXG5jb25zdCBCVVRUT05fVkFSSUFOVFMgPSBbJ2ZpbGwnLCAnaG9sbG93JywgJ2xpbmsnXTtcclxuY29uc3QgQlVUVE9OX0NPTE9SUyA9IFsnZGVmYXVsdCcsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInLCAnY2FuY2VsJywgJ2RlbGV0ZSddO1xyXG5cclxuLy8gTk9URSBtdXN0IE5PVCBiZSBmdW5jdGlvbmFsIGNvbXBvbmVudCB0byBhbGxvdyBgcmVmc2BcclxuXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHZhciB7XHJcblx0XHRcdGFjdGl2ZSxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRibG9jayxcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjb2xvcixcclxuXHRcdFx0Y29tcG9uZW50OiBUYWcsXHJcblx0XHRcdGRpc2FibGVkLFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHR2YXJpYW50LFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Ly8gZ2V0IHRoZSBzdHlsZXNcclxuXHRcdGNvbnN0IHZhcmlhbnRDbGFzc2VzID0gZ2V0U3R5bGVTaGVldCh2YXJpYW50LCBjb2xvcik7XHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNvbW1vbkNsYXNzZXMuYmFzZSxcclxuXHRcdFx0Y29tbW9uQ2xhc3Nlc1tzaXplXSxcclxuXHRcdFx0dmFyaWFudENsYXNzZXMuYmFzZSxcclxuXHRcdFx0YmxvY2sgPyBjb21tb25DbGFzc2VzLmJsb2NrIDogbnVsbCxcclxuXHRcdFx0ZGlzYWJsZWQgPyBjb21tb25DbGFzc2VzLmRpc2FibGVkIDogbnVsbCxcclxuXHRcdFx0YWN0aXZlID8gdmFyaWFudENsYXNzZXMuYWN0aXZlIDogbnVsbCxcclxuXHRcdFx0Li4uYXBocm9kaXRlU3R5bGVzXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcmV0dXJuIGFuIGFuY2hvciBvciBidXR0b25cclxuXHRcdGlmICghVGFnKSB7XHJcblx0XHRcdFRhZyA9IHByb3BzLmhyZWYgPyAnYScgOiAnYnV0dG9uJztcclxuXHRcdH1cclxuXHRcdC8vIEVuc3VyZSBidXR0b25zIGRvbid0IHN1Ym1pdCBieSBkZWZhdWx0XHJcblx0XHRpZiAoVGFnID09PSAnYnV0dG9uJyAmJiAhcHJvcHMudHlwZSkge1xyXG5cdFx0XHRwcm9wcy50eXBlID0gJ2J1dHRvbic7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDxUYWcgey4uLnByb3BzfSAvPjtcclxuXHR9XHJcbn07XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG5cdGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0YXBocm9kaXRlU3R5bGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9KSksXHJcblx0YmxvY2s6IFByb3BUeXBlcy5ib29sLFxyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX0NPTE9SUyksXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcblx0aHJlZjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX1NJWkVTKSxcclxuXHR2YXJpYW50OiBQcm9wVHlwZXMub25lT2YoQlVUVE9OX1ZBUklBTlRTKSxcclxufTtcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFtdLFxyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcblx0dmFyaWFudDogJ2ZpbGwnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b247XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBCdXR0b25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgeyBncmFkaWVudFZlcnRpY2FsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3NzJztcclxuaW1wb3J0IHsgZGFya2VuLCBmYWRlLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuXHJcbi8vIENvbW1vbiBTdHlsZXNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZXhwb3J0cy5jb21tb24gPSB7XHJcblx0Ly8gQmFzZSBCdXR0b25cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0YmFzZToge1xyXG5cdFx0J2FwcGVhcmFuY2UnOiAnbm9uZScsXHJcblx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdCdib3JkZXJXaWR0aCc6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCxcclxuXHRcdCdib3JkZXJTdHlsZSc6ICdzb2xpZCcsXHJcblx0XHQnYm9yZGVyQ29sb3InOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0J2JvcmRlclJhZGl1cyc6IHRoZW1lLmJ1dHRvbi5ib3JkZXJSYWRpdXMsXHJcblx0XHQnY3Vyc29yJzogJ3BvaW50ZXInLFxyXG5cdFx0J2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdCdmb250V2VpZ2h0JzogdGhlbWUuYnV0dG9uLmZvbnQud2VpZ2h0LFxyXG5cdFx0J2hlaWdodCc6IHRoZW1lLmNvbXBvbmVudC5oZWlnaHQsXHJcblx0XHQnbGluZUhlaWdodCc6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0J21hcmdpbkJvdHRvbSc6IDAsXHJcblx0XHQncGFkZGluZyc6IGAwICR7dGhlbWUuYnV0dG9uLnBhZGRpbmdIb3Jpem9udGFsfWAsXHJcblx0XHQnb3V0bGluZSc6IDAsXHJcblx0XHQndGV4dEFsaWduJzogJ2NlbnRlcicsXHJcblx0XHQndG91Y2hBY3Rpb24nOiAnbWFuaXB1bGF0aW9uJyxcclxuXHRcdCd1c2VyU2VsZWN0JzogJ25vbmUnLFxyXG5cdFx0J3ZlcnRpY2FsQWxpZ24nOiAnbWlkZGxlJyxcclxuXHRcdCd3aGl0ZVNwYWNlJzogJ25vd3JhcCcsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbi5kZWZhdWx0LnRleHRDb2xvcixcclxuXHRcdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uLmRlZmF1bHQudGV4dENvbG9yLFxyXG5cdFx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdC8vIEJsb2NrIERpc3BsYXlcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0YmxvY2s6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdH0sXHJcblx0Ly8gRGlzYWJsZWRcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cdC8vIFNpemVzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGxhcmdlOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmxhcmdlLFxyXG5cdH0sXHJcblx0ZGVmYXVsdDoge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvbnQuc2l6ZS5kZWZhdWx0LFxyXG5cdH0sXHJcblx0c21hbGw6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0fSxcclxuXHR4c21hbGw6IHtcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUueHNtYWxsLFxyXG5cdFx0bGluZUhlaWdodDogJzEuOScsXHJcblx0XHRwYWRkaW5nTGVmdDogJy42NmVtJyxcclxuXHRcdHBhZGRpbmdSaWdodDogJy42NmVtJyxcclxuXHR9LFxyXG59O1xyXG5cclxuXHJcbi8vIEZpbGwgVmFyaWFudFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGJ1dHRvbkZpbGxWYXJpYW50ICh0ZXh0Q29sb3IsIGJnQ29sb3IpIHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCAxMCksIGRhcmtlbihiZ0NvbG9yLCA1KSksXHJcblx0XHRib3JkZXJDb2xvcjogYCR7ZGFya2VuKGJnQ29sb3IsIDUpfSAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGZvY3VzU3R5bGVzID0ge1xyXG5cdFx0Li4uZ3JhZGllbnRWZXJ0aWNhbChsaWdodGVuKGJnQ29sb3IsIDEwKSwgZGFya2VuKGJnQ29sb3IsIDUpKSxcclxuXHRcdGJvcmRlckNvbG9yOiBgJHtkYXJrZW4oYmdDb2xvciwgNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDEwKX0gJHtkYXJrZW4oYmdDb2xvciwgMTUpfWAsXHJcblx0XHRib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmYWRlKGJnQ29sb3IsIDI1KX1gLFxyXG5cdFx0Y29sb3I6IHRleHRDb2xvcixcclxuXHRcdG91dGxpbmU6ICdub25lJyxcclxuXHR9O1xyXG5cdGNvbnN0IGFjdGl2ZVN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZGFya2VuKGJnQ29sb3IsIDEwKSxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2RhcmtlbihiZ0NvbG9yLCAyNSl9ICR7ZGFya2VuKGJnQ29sb3IsIDE1KX0gJHtkYXJrZW4oYmdDb2xvciwgMTApfWAsXHJcblx0XHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbihiZ0NvbG9yLCA1KSwgZGFya2VuKGJnQ29sb3IsIDEwKSwgYmdDb2xvciksXHJcblx0XHRcdCdib3JkZXJDb2xvcic6IGAke2RhcmtlbihiZ0NvbG9yLCAxMCl9ICR7ZGFya2VuKGJnQ29sb3IsIDIwKX0gJHtkYXJrZW4oYmdDb2xvciwgMjUpfWAsXHJcblx0XHRcdCdib3hTaGFkb3cnOiAnaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknLFxyXG5cdFx0XHQnY29sb3InOiB0ZXh0Q29sb3IsXHJcblx0XHRcdCdmb250V2VpZ2h0JzogNDAwLFxyXG5cdFx0XHQndGV4dFNoYWRvdyc6ICcwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMjUpJyxcclxuXHJcblx0XHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IGZvY3VzU3R5bGVzLFxyXG5cdFx0XHQnOmFjdGl2ZSc6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGFjdGl2ZVN0eWxlcyxcclxuXHR9O1xyXG59XHJcbi8vIFRPRE86IFRoaXMgaXMgcHJldHR5IGhhY2t5LCBuZWVkcyB0byBiZSBjb25zb2xpZGF0ZWQgd2l0aCB0aGUgVmFyaWFudCgpIG1ldGhvZFxyXG4vLyBhYm92ZSAobmVlZHMgbW9yZSB0aGVtZSB2YXJpYWJsZXMgdG8gYmUgaW1wbGVtZW50ZWQgdGhvdWdoKVxyXG5mdW5jdGlvbiBidXR0b25GaWxsRGVmYXVsdCAoKSB7XHJcblx0Y29uc3QgYm9yZGVyQ29sb3IgPSB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuZGVmYXVsdDtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwoJyNmZmYnLCAnI2VlZScpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbihib3JkZXJDb2xvciwgNSl9ICR7ZGFya2VuKGJvcmRlckNvbG9yLCA1KX0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDEwKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0fTtcclxuXHRjb25zdCBmb2N1c1N0eWxlcyA9IHtcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCl9YCxcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci50ZXh0LFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZDogJyNlNmU2ZTYnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMTApLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IudGV4dCxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLmdyYWRpZW50VmVydGljYWwoJyNmYWZhZmEnLCAnI2VhZWFlYScpLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBgJHtib3JkZXJDb2xvcn0gJHtkYXJrZW4oYm9yZGVyQ29sb3IsIDYpfSAke2Rhcmtlbihib3JkZXJDb2xvciwgMTIpfWAsXHJcblx0XHRcdCdjb2xvcic6IHRoZW1lLmNvbG9yLnRleHQsXHJcblx0XHRcdCd0ZXh0U2hhZG93JzogJzAgMXB4IDAgd2hpdGUnLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGhvdmVyU3R5bGVzLFxyXG5cdFx0XHQnOmZvY3VzJzogZm9jdXNTdHlsZXMsXHJcblx0XHRcdCc6YWN0aXZlJzogYWN0aXZlU3R5bGVzLFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBncm9zcyBoYWNrXHJcblx0XHRhY3RpdmU6IHtcclxuXHRcdFx0Li4uYWN0aXZlU3R5bGVzLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGFjdGl2ZVN0eWxlcyxcclxuXHRcdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0XHQuLi5hY3RpdmVTdHlsZXMsXHJcblx0XHRcdFx0Li4uZm9jdXNTdHlsZXMsXHJcblx0XHRcdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZSh0aGVtZS5jb2xvci5wcmltYXJ5LCAxMCl9LCBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpYCxcclxuXHRcdFx0fSxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuZXhwb3J0cy5maWxsID0gKGNvbG9yKSA9PiB7XHJcblx0c3dpdGNoIChjb2xvcikge1xyXG5cdFx0Y2FzZSAnZGVmYXVsdCc6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsRGVmYXVsdCgpO1xyXG5cdFx0Y2FzZSAnY2FuY2VsJzpcclxuXHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdHJldHVybiBidXR0b25GaWxsVmFyaWFudCgnd2hpdGUnLCB0aGVtZS5idXR0b24uZGFuZ2VyLmJnQ29sb3IpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkZpbGxWYXJpYW50KCd3aGl0ZScsIHRoZW1lLmJ1dHRvbltjb2xvcl0uYmdDb2xvcik7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8vIEhvbGxvdyBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uSG9sbG93VmFyaWFudCAodGV4dENvbG9yLCBib3JkZXJDb2xvcikge1xyXG5cdGNvbnN0IGZvY3VzQW5kSG92ZXJTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogZmFkZShib3JkZXJDb2xvciwgMTUpLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGRhcmtlbihib3JkZXJDb2xvciwgMTUpLFxyXG5cdFx0Ym94U2hhZG93OiAnbm9uZScsXHJcblx0XHRjb2xvcjogdGV4dENvbG9yLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgZm9jdXNPbmx5U3R5bGVzID0ge1xyXG5cdFx0Ym94U2hhZG93OiBgMCAwIDAgM3B4ICR7ZmFkZShib3JkZXJDb2xvciwgMTApfWAsXHJcblx0fTtcclxuXHRjb25zdCBhY3RpdmVTdHlsZXMgPSB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUoYm9yZGVyQ29sb3IsIDM1KSxcclxuXHRcdGJvcmRlckNvbG9yOiBkYXJrZW4oYm9yZGVyQ29sb3IsIDI1KSxcclxuXHRcdGJveFNoYWRvdzogJ25vbmUnLFxyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdCdiYWNrZ3JvdW5kJzogJ25vbmUnLFxyXG5cdFx0XHQnYm9yZGVyQ29sb3InOiBib3JkZXJDb2xvcixcclxuXHRcdFx0J2NvbG9yJzogdGV4dENvbG9yLFxyXG5cclxuXHRcdFx0Jzpob3Zlcic6IGZvY3VzQW5kSG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMgJzogT2JqZWN0LmFzc2lnbih7fSwgZm9jdXNBbmRIb3ZlclN0eWxlcywgZm9jdXNPbmx5U3R5bGVzKSxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufTtcclxuZXhwb3J0cy5ob2xsb3cgPSAoY29sb3IpID0+IHtcclxuXHQvLyBUT0RPOiBiZXR0ZXIgaGFuZGxpbmcgb2YgY2FuY2VsIGFuZCBkZWxldGUgY29sb3JzXHJcblx0aWYgKGNvbG9yID09PSAnY2FuY2VsJyB8fCBjb2xvciA9PT0gJ2RlbGV0ZScpIGNvbG9yID0gJ2Rhbmdlcic7XHJcblxyXG5cdHJldHVybiBidXR0b25Ib2xsb3dWYXJpYW50KHRoZW1lLmJ1dHRvbltjb2xvcl0uYmdDb2xvciwgdGhlbWUuYnV0dG9uW2NvbG9yXS5ib3JkZXJDb2xvcik7XHJcbn07XHJcblxyXG5cclxuLy8gTGluayBWYXJpYW50XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gYnV0dG9uTGlua1ZhcmlhbnQgKHRleHRDb2xvciwgaG92ZXJDb2xvcikge1xyXG5cdGNvbnN0IGhvdmVyU3R5bGVzID0ge1xyXG5cdFx0Y29sb3I6IGhvdmVyQ29sb3IsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXHJcblx0fTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZToge1xyXG5cdFx0XHQnYmFja2dyb3VuZCc6ICdub25lJyxcclxuXHRcdFx0J2JvcmRlcic6IDAsXHJcblx0XHRcdCdib3hTaGFkb3cnOiAnbm9uZScsXHJcblx0XHRcdCdjb2xvcic6IHRleHRDb2xvcixcclxuXHRcdFx0J2ZvbnRXZWlnaHQnOiAnbm9ybWFsJyxcclxuXHRcdFx0J291dGxpbmUnOiAnbm9uZScsXHJcblxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBob3ZlclN0eWxlcyxcclxuXHRcdH0sXHJcblx0XHRhY3RpdmU6IGhvdmVyU3R5bGVzLFxyXG5cdH07XHJcbn07XHJcbmZ1bmN0aW9uIGJ1dHRvbkxpbmtEZWxldGUgKCkge1xyXG5cdGNvbnN0IHN0eWxlcyA9IGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmdyYXk0MCwgdGhlbWUuY29sb3IuZGFuZ2VyKTtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdC4uLmdyYWRpZW50VmVydGljYWwobGlnaHRlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSwgZGFya2VuKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApKSxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDQpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDgpfSAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEyKX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnMCAxcHggMCByZ2JhKDAsMCwwLDAuMSknLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cdH07XHJcblx0Y29uc3QgYWN0aXZlU3R5bGVzID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA0KSxcclxuXHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGAke2Rhcmtlbih0aGVtZS5jb2xvci5kYW5nZXIsIDEyKX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX0gJHtkYXJrZW4odGhlbWUuY29sb3IuZGFuZ2VyLCA4KX1gLFxyXG5cdFx0Ym94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcblx0XHRjb2xvcjogJ3doaXRlJyxcclxuXHR9O1xyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiB7XHJcblx0XHRcdC4uLnN0eWxlcy5iYXNlLFxyXG5cdFx0XHQnOmhvdmVyJzogaG92ZXJTdHlsZXMsXHJcblx0XHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdFx0JzphY3RpdmUnOiBhY3RpdmVTdHlsZXMsXHJcblx0XHR9LFxyXG5cdFx0YWN0aXZlOiBhY3RpdmVTdHlsZXMsXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0cy5saW5rID0gKGNvbG9yKSA9PiB7XHJcblx0c3dpdGNoIChjb2xvcikge1xyXG5cdFx0Y2FzZSAnZGVmYXVsdCc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rVmFyaWFudCh0aGVtZS5jb2xvci5saW5rLCB0aGVtZS5jb2xvci5saW5rSG92ZXIpO1xyXG5cdFx0Y2FzZSAnY2FuY2VsJzpcclxuXHRcdFx0cmV0dXJuIGJ1dHRvbkxpbmtWYXJpYW50KHRoZW1lLmNvbG9yLmdyYXk0MCwgdGhlbWUuY29sb3IuZGFuZ2VyKTtcclxuXHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdHJldHVybiBidXR0b25MaW5rRGVsZXRlKCk7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gYnV0dG9uTGlua1ZhcmlhbnQodGhlbWUuY29sb3JbY29sb3JdLCB0aGVtZS5jb2xvcltjb2xvcl0pO1xyXG5cdH1cclxufTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuZnVuY3Rpb24gQ2VudGVyICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGhlaWdodCxcclxuXHRzdHlsZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuY2VudGVyLCBjbGFzc05hbWUpO1xyXG5cdHByb3BzLnN0eWxlID0geyBoZWlnaHQsIC4uLnN0eWxlIH07XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcbkNlbnRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxuXHRoZWlnaHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcbkNlbnRlci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxuXHRoZWlnaHQ6ICdhdXRvJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2VudGVyO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ2VudGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y2VudGVyOiB7XHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBmYWRlLCBsaWdodGVuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29sb3InO1xyXG5cclxuY29uc3QgYmFzZUNvbG9ycyA9IHt9O1xyXG5bJ2RhbmdlcicsICdpbmZvJywgJ3ByaW1hcnknLCAnc3VjY2VzcycsICd3YXJuaW5nJ10uZm9yRWFjaChjb2xvciA9PiB7XHJcblx0YmFzZUNvbG9yc1tjb2xvcl0gPSB7XHJcblx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTApLFxyXG5cdFx0YmFja2dyb3VuZEFjdGl2ZTogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDIwKSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDE1KSxcclxuXHRcdHRleHQ6IHRoZW1lLmNvbG9yW2NvbG9yXSxcclxuXHR9O1xyXG59KTtcclxuY29uc3QgaW52ZXJ0ZWRDb2xvcnMgPSB7fTtcclxuWydkYW5nZXInLCAnaW5mbycsICdwcmltYXJ5JywgJ3N1Y2Nlc3MnLCAnd2FybmluZyddLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGludmVydGVkQ29sb3JzW2NvbG9yICsgJ19faW52ZXJ0ZWQnXSA9IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yW2NvbG9yXSxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGxpZ2h0ZW4odGhlbWUuY29sb3JbY29sb3JdLCA1KSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogbGlnaHRlbih0aGVtZS5jb2xvcltjb2xvcl0sIDE1KSxcclxuXHRcdHRleHQ6ICd3aGl0ZScsXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0aGVtZS5jb2xvci5ncmF5MTAsXHJcblx0XHRiYWNrZ3JvdW5kQWN0aXZlOiB0aGVtZS5jb2xvci5ncmF5MjAsXHJcblx0XHRiYWNrZ3JvdW5kSG92ZXI6IHRoZW1lLmNvbG9yLmdyYXkxNSxcclxuXHRcdHRleHQ6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHR9LFxyXG5cdC4uLmJhc2VDb2xvcnMsXHJcblxyXG5cdC8vIGludmVydGVkXHJcblx0ZGVmYXVsdF9faW52ZXJ0ZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHRcdGJhY2tncm91bmRBY3RpdmU6IGxpZ2h0ZW4odGhlbWUuY29sb3IuZ3JheTYwLCA1KSxcclxuXHRcdGJhY2tncm91bmRIb3ZlcjogbGlnaHRlbih0aGVtZS5jb2xvci5ncmF5NjAsIDE1KSxcclxuXHRcdHRleHQ6ICd3aGl0ZScsXHJcblx0fSxcclxuXHQuLi5pbnZlcnRlZENvbG9ycyxcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbmZ1bmN0aW9uIENoaXAgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y2hpbGRyZW4sXHJcblx0Y29sb3IsXHJcblx0aW52ZXJ0ZWQsXHJcblx0bGFiZWwsXHJcblx0b25DbGVhcixcclxuXHRvbkNsaWNrLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLmNoaXAsXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cdGNvbnN0IGxhYmVsQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRjbGFzc2VzLmxhYmVsLFxyXG5cdFx0Y2xhc3Nlc1snYnV0dG9uX18nICsgY29sb3IgKyAoaW52ZXJ0ZWQgPyAnX19pbnZlcnRlZCcgOiAnJyldXHJcblx0KTtcclxuXHRjb25zdCBjbGVhckNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYnV0dG9uLFxyXG5cdFx0Y2xhc3Nlcy5jbGVhcixcclxuXHRcdGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yICsgKGludmVydGVkID8gJ19faW52ZXJ0ZWQnIDogJycpXVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9PlxyXG5cdFx0XHRcdHtsYWJlbH1cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHR7ISFvbkNsZWFyICYmIChcclxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkNsZWFyfSBjbGFzc05hbWU9e2NsZWFyQ2xhc3NOYW1lfT5cclxuXHRcdFx0XHRcdCZ0aW1lcztcclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5DaGlwLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGNvbG9ycykpLmlzUmVxdWlyZWQsXHJcblx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0b25DbGVhcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0b25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcbkNoaXAuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbG9yOiAnZGVmYXVsdCcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENoaXA7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGVydFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgeyBib3JkZXJMZWZ0UmFkaXVzLCBib3JkZXJSaWdodFJhZGl1cyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nzcyc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb25zdCBob3ZlclN0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXS5iYWNrZ3JvdW5kSG92ZXIsXHJcblx0fTtcclxuXHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLmJhY2tncm91bmQsXHJcblx0XHRjb2xvcjogY29sb3JzW2NvbG9yXS50ZXh0LFxyXG5cclxuXHRcdCc6aG92ZXInOiBob3ZlclN0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBob3ZlclN0eWxlcyxcclxuXHRcdCc6YWN0aXZlJzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc1tjb2xvcl0uYmFja2dyb3VuZEFjdGl2ZSxcclxuXHRcdH0sXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjaGlwOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb250LnNpemUuc21hbGwsXHJcblx0XHRmb250V2VpZ2h0OiA1MDAsXHJcblx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcyLjJlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gdGFnbmFtZXNcclxuXHRidXR0b246IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcclxuXHRcdGJvcmRlcjogJ25vbmUnLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0ZmxvYXQ6ICdsZWZ0JyxcclxuXHRcdHBhZGRpbmc6ICcwIC45ZW0nLFxyXG5cdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cclxuXHRcdC8vIG1ha2UgcGlsbHMgLSBleGFnZ2VyYXRlIHRoZSBwYWRkaW5nIHRvd2FyZCB0aGUgcmFkaWkgc28gaXQgbG9va3MgZXZlblxyXG5cdFx0JzpmaXJzdC1jaGlsZCc6IHtcclxuXHRcdFx0Li4uYm9yZGVyTGVmdFJhZGl1cygnM2VtJyksXHJcblx0XHRcdHBhZGRpbmdMZWZ0OiAnMS4xZW0nLFxyXG5cdFx0fSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0Li4uYm9yZGVyUmlnaHRSYWRpdXMoJzNlbScpLFxyXG5cdFx0XHRwYWRkaW5nUmlnaHQ6ICcxLjFlbScsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwcm92aWRlIHNlcGFyYXRpb24gYmV0d2VlbiB0aGUgbGFiZWwgYW5kIGNsZWFyIGJ1dHRvbnNcclxuXHQvLyBmbG9hdGluZyBzdG9wcyB0aGUgbWFyZ2lucyBmcm9tIGNvbGxhcHNpbmcgaW50byBlYWNoaW5nXHJcblxyXG5cdGxhYmVsOiB7IG1hcmdpblJpZ2h0OiAxIH0sXHJcblx0Y2xlYXI6IHsgbWFyZ2luTGVmdDogMSB9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIENvbnRhaW5lciAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjbGVhckZsb2F0aW5nQ2hpbGRyZW4sXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0d2lkdGgsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udGFpbmVyLFxyXG5cdFx0Y2xhc3Nlc1t3aWR0aF0sXHJcblx0XHRjbGVhckZsb2F0aW5nQ2hpbGRyZW4gPyBjbGFzc2VzLmNsZWFyZml4IDogbnVsbFxyXG5cdCk7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5Db250YWluZXIucHJvcFR5cGVzID0ge1xyXG5cdGNsZWFyRmxvYXRpbmdDaGlsZHJlbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKS5pc1JlcXVpcmVkLFxyXG5cdHdpZHRoOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoc2l6ZXMpKS5pc1JlcXVpcmVkLFxyXG59O1xyXG5Db250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcblx0d2lkdGg6ICdsYXJnZScsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNtYWxsOiB0aGVtZS5jb250YWluZXIuc2l6ZS5zbWFsbCxcclxuXHRtZWRpdW06IHRoZW1lLmNvbnRhaW5lci5zaXplLm1lZGl1bSxcclxuXHRsYXJnZTogdGhlbWUuY29udGFpbmVyLnNpemUubGFyZ2UsXHJcbn07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb250YWluZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhzaXplcykuZm9yRWFjaChzaXplID0+IHtcclxuXHRzaXplVmFyaWFudHNbc2l6ZV0gPSB7XHJcblx0XHRtYXhXaWR0aDogc2l6ZXNbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vKlxyXG5cdE1pY3JvIGNsZWFyZml4IGhhY2tcclxuXHQxLlx0VGhlIHNwYWNlIGNvbnRlbnQgaXMgb25lIHdheSB0byBhdm9pZCBhbiBPcGVyYSBidWcgd2hlbiB0aGVcclxuXHRcdFx0Y29udGVudGVkaXRhYmxlIGF0dHJpYnV0ZSBpcyBpbmNsdWRlZCBhbnl3aGVyZSBlbHNlIGluIHRoZSBkb2N1bWVudC5cclxuXHRcdFx0T3RoZXJ3aXNlIGl0IGNhdXNlcyBzcGFjZSB0byBhcHBlYXIgYXQgdGhlIHRvcCBhbmQgYm90dG9tIG9mIGVsZW1lbnRzXHJcblx0XHRcdHRoYXQgYXJlIGNsZWFyZml4ZWQuXHJcblx0Mi5cdFRoZSB1c2Ugb2YgYHRhYmxlYCByYXRoZXIgdGhhbiBgYmxvY2tgIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIHVzaW5nXHJcblx0XHRcdGA6YmVmb3JlYCB0byBjb250YWluIHRoZSB0b3AtbWFyZ2lucyBvZiBjaGlsZCBlbGVtZW50cy5cclxuKi9cclxuY29uc3QgY2xlYXJmaXhTdHlsZXMgPSB7XHJcblx0Y2xlYXI6ICdib3RoJyxcclxuXHRjb250ZW50OiAnXCIgXCInLCAvLyAxXHJcblx0ZGlzcGxheTogJ3RhYmxlJywgLy8gMlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRtYXJnaW5MZWZ0OiAnYXV0bycsXHJcblx0XHRtYXJnaW5SaWdodDogJ2F1dG8nLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIsXHJcblx0fSxcclxuXHJcblx0Ly8gY2xlYXIgZmxvYXRpbmcgY2hpbGRyZW5cclxuXHRjbGVhcmZpeDoge1xyXG5cdFx0JzpiZWZvcmUnOiBjbGVhcmZpeFN0eWxlcyxcclxuXHRcdCc6YWZ0ZXInOiBjbGVhcmZpeFN0eWxlcyxcclxuXHR9LFxyXG5cclxuXHQvLyBzaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24nO1xyXG5cclxuZnVuY3Rpb24gRHJvcGRvd25CdXR0b24gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYXJyb3cpfSAvPlxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIE5PVEVcclxuLy8gMTogdGFrZSBhZHZhbnRhZ2Ugb2YgYGN1cnJlbnRDb2xvcmAgYnkgbGVhdmluZyBib3JkZXIgdG9wIGNvbG9yIHVuZGVmaW5lZFxyXG4vLyAyOiBldmVuIHRob3VnaCB0aGUgYXJyb3cgaXMgdmVydGljYWxseSBjZW50ZXJlZCwgdmlzdWFsbHkgaXQgYXBwZWFycyB0b28gbG93XHJcbi8vICAgIGJlY2F1c2Ugb2YgbG93ZXJjYXNlIGNoYXJhY3RlcnMgYmVzaWRlIGl0XHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0YXJyb3c6IHtcclxuXHRcdGJvcmRlckxlZnQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSaWdodDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGJvcmRlclRvcDogJzAuM2VtIHNvbGlkJywgLy8gMVxyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRoZWlnaHQ6IDAsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIDJcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblxyXG5cdFx0Ly8gYWRkIHNwYWNpbmdcclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7XHJcblx0XHRcdG1hcmdpblJpZ2h0OiAnMC41ZW0nLFxyXG5cdFx0fSxcclxuXHRcdCc6bGFzdC1jaGlsZCc6IHtcclxuXHRcdFx0bWFyZ2luTGVmdDogJzAuNWVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRHJvcGRvd25CdXR0b247XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xyXG5cclxuY2xhc3MgRm9ybUZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5mb3JtRmllbGRJZCA9IGdlbmVyYXRlSWQoKTtcclxuXHR9XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1GaWVsZElkOiB0aGlzLmZvcm1GaWVsZElkLFxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZm9ybUxheW91dCA9ICdiYXNpYycsIGxhYmVsV2lkdGggfSA9IHRoaXMuY29udGV4dDtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzLFxyXG5cdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjcm9wTGFiZWwsXHJcblx0XHRcdGh0bWxGb3IsXHJcblx0XHRcdGxhYmVsLFxyXG5cdFx0XHRvZmZzZXRBYnNlbnRMYWJlbCxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5Gb3JtRmllbGQsXHJcblx0XHRcdGNsYXNzZXNbJ0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdLFxyXG5cdFx0XHRvZmZzZXRBYnNlbnRMYWJlbCA/IGNsYXNzZXNbJ0Zvcm1GaWVsZC0tb2Zmc2V0LWFic2VudC1sYWJlbCddIDogbnVsbCxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHRpZiAob2Zmc2V0QWJzZW50TGFiZWwgJiYgbGFiZWxXaWR0aCkge1xyXG5cdFx0XHRwcm9wcy5zdHlsZSA9IHtcclxuXHRcdFx0XHRwYWRkaW5nTGVmdDogbGFiZWxXaWR0aCxcclxuXHRcdFx0XHQuLi5wcm9wcy5zdHlsZSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBlbGVtZW50c1xyXG5cdFx0Y29uc3QgY29tcG9uZW50TGFiZWwgPSBsYWJlbCA/IChcclxuXHRcdFx0PEZvcm1MYWJlbCBodG1sRm9yPXtodG1sRm9yfSBjcm9wVGV4dD17Y3JvcExhYmVsfT5cclxuXHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdDwvRm9ybUxhYmVsPlxyXG5cdFx0KSA6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiB7Li4ucHJvcHN9IGh0bWxGb3I9e2h0bWxGb3J9PlxyXG5cdFx0XHRcdHtjb21wb25lbnRMYWJlbH1cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXNTaGFwZSA9IHtcclxuXHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRfbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkZvcm1GaWVsZC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuRm9ybUZpZWxkLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtRmllbGQucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdGNyb3BMYWJlbDogUHJvcFR5cGVzLmJvb2wsXHJcblx0aHRtbEZvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRvZmZzZXRBYnNlbnRMYWJlbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUlkICgpIHtcclxuXHRyZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtRmllbGQ7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIEZpZWxkXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdGb3JtRmllbGQnOiB7XHJcblx0XHRtYXJnaW5Cb3R0b206ICcxZW0nLFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gd2hlbiBpbnNpZGUgYSBob3Jpem9udGFsIGZvcm1cclxuXHJcblx0J0Zvcm1GaWVsZC0tZm9ybS1sYXlvdXQtaG9yaXpvbnRhbCc6IHtcclxuXHRcdFtgQG1lZGlhIChtaW4td2lkdGg6ICR7dGhlbWUuYnJlYWtwb2ludC50YWJsZXRMYW5kc2NhcGVNaW59KWBdOiB7XHJcblx0XHRcdGRpc3BsYXk6ICd0YWJsZScsXHJcblx0XHRcdHRhYmxlTGF5b3V0OiAnZml4ZWQnLFxyXG5cdFx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBpbnNpZGUgaG9yaXpvbnRhbCBmb3JtXHJcblx0Ly8gdHlwaWNhbGx5IGZvciB1c2Ugd2l0aCBzdWJtaXQgYnV0dG9uIGluc2lkZVxyXG5cdCdGb3JtRmllbGQtLW9mZnNldC1hYnNlbnQtbGFiZWwnOiB7XHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUuZm9ybS5sYWJlbC53aWR0aCxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhbiBpbmxpbmUgZm9ybVxyXG5cclxuXHQnRm9ybUZpZWxkLS1mb3JtLWxheW91dC1pbmxpbmUnOiB7XHJcblx0XHQnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0J3BhZGRpbmdMZWZ0JzogJzAuMjVlbScsXHJcblx0XHQncGFkZGluZ1JpZ2h0JzogJzAuMjVlbScsXHJcblx0XHQndmVydGljYWxBbGlnbic6ICd0b3AnLFxyXG5cclxuXHRcdCc6Zmlyc3QtY2hpbGQnOiB7IHBhZGRpbmdMZWZ0OiAwIH0sXHJcblx0XHQnOmxhc3QtY2hpbGQnOiB7IHBhZGRpbmdSaWdodDogMCB9LFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgY29uY2F0Q2xhc3NuYW1lcyBmcm9tICcuLi8uLi8uLi91dGlscy9jb25jYXRDbGFzc25hbWVzJztcclxuaW1wb3J0IElucHV0Tm9lZGl0IGZyb20gJy4vbm9lZGl0JztcclxuXHJcbi8vIE5PVEUgbXVzdCBOT1QgYmUgZnVuY3Rpb25hbCBjb21wb25lbnQgdG8gYWxsb3cgYHJlZnNgXHJcblxyXG5jbGFzcyBGb3JtSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGJsdXIgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQuYmx1cigpO1xyXG5cdH1cclxuXHRmb2N1cyAoKSB7XHJcblx0XHR0aGlzLnRhcmdldC5mb2N1cygpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0XHRcdGNsYXNzTmFtZSxcclxuXHRcdFx0ZGlzYWJsZWQsXHJcblx0XHRcdGlkLFxyXG5cdFx0XHRtdWx0aWxpbmUsXHJcblx0XHRcdG5vZWRpdCxcclxuXHRcdFx0c2l6ZSxcclxuXHRcdFx0Li4ucHJvcHNcclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIE5PVEUgcmV0dXJuIGEgZGlmZmVyZW50IGNvbXBvbmVudCBmb3IgYG5vZWRpdGBcclxuXHRcdGlmIChub2VkaXQpIHJldHVybiA8SW5wdXROb2VkaXQgey4uLnRoaXMucHJvcHN9IC8+O1xyXG5cclxuXHRcdGNvbnN0IHsgZm9ybUZpZWxkSWQsIGZvcm1MYXlvdXQgfSA9IHRoaXMuY29udGV4dDtcclxuXHJcblx0XHRwcm9wcy5pZCA9IGlkIHx8IGZvcm1GaWVsZElkO1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLkZvcm1JbnB1dCxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybUlucHV0X19zaXplLS0nICsgc2l6ZV0sXHJcblx0XHRcdGRpc2FibGVkID8gY2xhc3Nlc1snRm9ybUlucHV0LS1kaXNhYmxlZCddIDogbnVsbCxcclxuXHRcdFx0Zm9ybUxheW91dCA/IGNsYXNzZXNbJ0Zvcm1JbnB1dC0tZm9ybS1sYXlvdXQtJyArIGZvcm1MYXlvdXRdIDogbnVsbCxcclxuXHRcdFx0Li4uY29uY2F0Q2xhc3NuYW1lcyhhcGhyb2RpdGVTdHlsZXMpXHJcblx0XHQpO1xyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRwcm9wcy5jbGFzc05hbWUgKz0gKCcgJyArIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc2V0UmVmID0gKG4pID0+ICh0aGlzLnRhcmdldCA9IG4pO1xyXG5cdFx0Y29uc3QgVGFnID0gbXVsdGlsaW5lID8gJ3RleHRhcmVhJyA6ICdpbnB1dCc7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFRhZ1xyXG5cdFx0XHRcdHJlZj17c2V0UmVmfVxyXG5cdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cclxuXHRcdFx0XHR7Li4ucHJvcHN9XHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHN0eWxlc1NoYXBlID0ge1xyXG5cdF9kZWZpbml0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuRm9ybUlucHV0LnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHN0eWxlc1NoYXBlKSksXHJcblx0XHRQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpLFxyXG5cdF0pLFxyXG5cdG11bHRpbGluZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKFsnZGVmYXVsdCcsICdzbWFsbCcsICdsYXJnZSddKSxcclxuXHR0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5Gb3JtSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG5cdHNpemU6ICdkZWZhdWx0JyxcclxuXHR0eXBlOiAndGV4dCcsXHJcbn07XHJcbkZvcm1JbnB1dC5jb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0Zm9ybUZpZWxkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1JbnB1dDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGZhZGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb2xvcic7XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5mdW5jdGlvbiBGb3JtSW5wdXROb2VkaXQgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y3JvcFRleHQsXHJcblx0bXVsdGlsaW5lLFxyXG5cdG5vZWRpdCwgLy8gTk9URSBub3QgdXNlZCwganVzdCByZW1vdmVkIGZyb20gcHJvcHNcclxuXHR0eXBlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLm5vZWRpdCxcclxuXHRcdGNyb3BUZXh0ID8gY2xhc3Nlcy5jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRtdWx0aWxpbmUgPyBjbGFzc2VzLm11bHRpbGluZSA6IG51bGwsXHJcblx0XHQocHJvcHMuaHJlZiB8fCBwcm9wcy5vbkNsaWNrKSA/IGNsYXNzZXMuYW5jaG9yIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XHJcbn07XHJcblxyXG5Gb3JtSW5wdXROb2VkaXQucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XSksXHJcblx0Y3JvcFRleHQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5Gb3JtSW5wdXROb2VkaXQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxuY29uc3QgYW5jaG9ySG92ZXJBbmRGb2N1c1N0eWxlcyA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgMTApLFxyXG5cdGJvcmRlckNvbG9yOiBmYWRlKHRoZW1lLmNvbG9yLmxpbmssIDEwKSxcclxuXHRjb2xvcjogdGhlbWUuY29sb3IubGluayxcclxuXHRvdXRsaW5lOiAnbm9uZScsXHJcblx0dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRub2VkaXQ6IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5ub2VkaXQsXHJcblx0XHRiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuXHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3Iubm9lZGl0LFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5pbnB1dC5ib3JkZXIucmFkaXVzLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJXaWR0aDogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk4MCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0cGFkZGluZzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0dHJhbnNpdGlvbjogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHJcblx0XHQvLyBwcmV2ZW50IGVtcHR5IGlucHV0cyBmcm9tIGNvbGxhcHNpbmcgYnkgYWRkaW5nIGNvbnRlbnRcclxuXHRcdCc6ZW1wdHk6YmVmb3JlJzoge1xyXG5cdFx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdFx0XHRjb250ZW50OiAnXCIobm8gdmFsdWUpXCInLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHRtdWx0aWxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdibG9jaycsXHJcblx0XHRoZWlnaHQ6ICdhdXRvJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICcxLjQnLFxyXG5cdFx0cGFkZGluZ0JvdHRvbTogJzAuNmVtJyxcclxuXHRcdHBhZGRpbmdUb3A6ICcwLjZlbScsXHJcblx0fSxcclxuXHJcblx0Ly8gaW5kaWNhdGUgY2xpY2thYmlsaXR5IHdoZW4gdXNpbmcgYW4gYW5jaG9yXHJcblx0YW5jaG9yOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGZhZGUodGhlbWUuY29sb3IubGluaywgNSksXHJcblx0XHRib3JkZXJDb2xvcjogZmFkZSh0aGVtZS5jb2xvci5saW5rLCAxMCksXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IubGluayxcclxuXHRcdG1hcmdpblJpZ2h0OiA1LFxyXG5cdFx0bWluV2lkdGg6IDAsXHJcblx0XHR0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiBhbmNob3JIb3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IGFuY2hvckhvdmVyQW5kRm9jdXNTdHlsZXMsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybUlucHV0Tm9lZGl0O1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBJbnB1dFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHQnRm9ybUlucHV0Jzoge1xyXG5cdFx0J2FwcGVhcmFuY2UnOiAnbm9uZScsXHJcblx0XHQnYmFja2dyb3VuZENvbG9yJzogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kZWZhdWx0LFxyXG5cdFx0J2JhY2tncm91bmRJbWFnZSc6ICdub25lJyxcclxuXHRcdCdib3JkZXJDb2xvcic6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LFxyXG5cdFx0J2JvcmRlclJhZGl1cyc6IHRoZW1lLmlucHV0LmJvcmRlci5yYWRpdXMsXHJcblx0XHQnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxyXG5cdFx0J2JvcmRlcldpZHRoJzogdGhlbWUuaW5wdXQuYm9yZGVyLndpZHRoLFxyXG5cdFx0J2JveFNoYWRvdyc6IHRoZW1lLmlucHV0LmJveFNoYWRvdyxcclxuXHRcdCdjb2xvcic6ICdpbmhlcml0JywgLy8gRklYTUVcclxuXHRcdCdkaXNwbGF5JzogJ2Jsb2NrJyxcclxuXHRcdCdoZWlnaHQnOiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHQnbGluZUhlaWdodCc6IHRoZW1lLmlucHV0LmxpbmVIZWlnaHQsXHJcblx0XHQncGFkZGluZyc6IGAwICR7dGhlbWUuaW5wdXQucGFkZGluZ0hvcml6b250YWx9YCxcclxuXHRcdCd0cmFuc2l0aW9uJzogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHQnd2lkdGgnOiAnMTAwJScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5ob3ZlcixcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0XHQnOmZvY3VzJzoge1xyXG5cdFx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdFx0XHRib3hTaGFkb3c6IHRoZW1lLmlucHV0LmJveFNoYWRvd0ZvY3VzLFxyXG5cdFx0XHRvdXRsaW5lOiAwLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCdGb3JtSW5wdXQtLWRpc2FibGVkJzoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5pbnB1dC5iYWNrZ3JvdW5kLmRpc2FibGVkLFxyXG5cdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG5cdH0sXHJcblxyXG5cdC8vIHNpemVzXHJcblx0J0Zvcm1JbnB1dF9fc2l6ZS0tc21hbGwnOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdH0sXHJcblx0J0Zvcm1JbnB1dF9fc2l6ZS0tbGFyZ2UnOiB7XHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLmxhcmdlLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIEZvcm1MYWJlbCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjbGFzc05hbWUsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0Y3JvcFRleHQsXHJcblx0aHRtbEZvcixcclxuXHQuLi5wcm9wc1xyXG59LFxyXG57XHJcblx0Zm9ybUZpZWxkSWQsXHJcblx0Zm9ybUxheW91dCxcclxuXHRsYWJlbFdpZHRoLFxyXG59KSB7XHJcblx0cHJvcHMuaHRtbEZvciA9IGh0bWxGb3IgfHwgZm9ybUZpZWxkSWQ7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5Gb3JtTGFiZWwsXHJcblx0XHRmb3JtTGF5b3V0ID8gY2xhc3Nlc1snRm9ybUxhYmVsLS1mb3JtLWxheW91dC0nICsgZm9ybUxheW91dF0gOiBudWxsLFxyXG5cdFx0Y3JvcFRleHQgPyBjbGFzc2VzWydGb3JtTGFiZWwtLWNyb3AtdGV4dCddIDogbnVsbCxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCk7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHRpZiAobGFiZWxXaWR0aCkge1xyXG5cdFx0cHJvcHMuc3R5bGUgPSB7XHJcblx0XHRcdHdpZHRoOiBsYWJlbFdpZHRoLFxyXG5cdFx0XHQuLi5wcm9wcy5zdHlsZSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzU2hhcGUgPSB7XHJcblx0X2RlZmluaXRpb246IFByb3BUeXBlcy5vYmplY3QsXHJcblx0X25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Gb3JtTGFiZWwucHJvcFR5cGVzID0ge1xyXG5cdGFwaHJvZGl0ZVN0eWxlczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoc3R5bGVzU2hhcGUpKSxcclxuXHRcdFByb3BUeXBlcy5zaGFwZShzdHlsZXNTaGFwZSksXHJcblx0XSksXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkZvcm1MYWJlbC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnbGFiZWwnLFxyXG59O1xyXG5Gb3JtTGFiZWwuY29udGV4dFR5cGVzID0ge1xyXG5cdGZvcm1MYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG5cdGZvcm1GaWVsZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGxhYmVsV2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1MYWJlbDtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZvcm0gTGFiZWxcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0J0Zvcm1MYWJlbCc6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5mb3JtLmxhYmVsLmNvbG9yLFxyXG5cdFx0Zm9udFNpemU6IHRoZW1lLmZvcm0ubGFiZWwuZm9udFNpemUsXHJcblx0XHRmb250V2VpZ2h0OiB0aGVtZS5mb3JtLmxhYmVsLmZvbnRXZWlnaHQsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpbkJvdHRvbTogJzAuNWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyB3aGVuIGluc2lkZSBhIGhvcml6b250YWwgZm9ybVxyXG5cclxuXHQnRm9ybUxhYmVsLS1mb3JtLWxheW91dC1ob3Jpem9udGFsJzoge1xyXG5cdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0ZGlzcGxheTogJ3RhYmxlLWNlbGwnLFxyXG5cdFx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCwgLy8gZml4XHJcblx0XHRcdG1hcmdpbkJvdHRvbTogMCxcclxuXHRcdFx0cGFkZGluZ1JpZ2h0OiA1LFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdFx0d2lkdGg6IHRoZW1lLmZvcm0ubGFiZWwud2lkdGgsXHJcblx0XHR9LFxyXG5cdH0sXHJcblxyXG5cdC8vIGNyb3AgbG9uZyB0ZXh0XHJcblxyXG5cdCdGb3JtTGFiZWwtLWNyb3AtdGV4dCc6IHtcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcclxuXHRcdHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmZ1bmN0aW9uIEZvcm1Ob3RlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNoaWxkcmVuLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGh0bWwsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhjbGFzc2VzLm5vdGUsIGNsYXNzTmFtZSk7XHJcblxyXG5cdC8vIFByb3BlcnR5IFZpb2xhdGlvblxyXG5cdGlmIChjaGlsZHJlbiAmJiBodG1sKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBGb3JtTm90ZSBjYW5ub3QgcmVuZGVyIGBjaGlsZHJlbmAgYW5kIGBodG1sYC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb3IgdGhlIG90aGVyLicpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGh0bWwgPyAoXHJcblx0XHQ8Q29tcG9uZW50IHsuLi5wcm9wc30gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBodG1sIH19IC8+XHJcblx0KSA6IChcclxuXHRcdDxDb21wb25lbnQgey4uLnByb3BzfT57Y2hpbGRyZW59PC9Db21wb25lbnQ+XHJcblx0KTtcclxufTtcclxuRm9ybU5vdGUucHJvcFR5cGVzID0ge1xyXG5cdGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcblx0aHRtbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybU5vdGUuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ2RpdicsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1Ob3RlO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRm9ybSBOb3RlXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdG5vdGU6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5mb3JtLm5vdGUuY29sb3IsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9ybS5ub3RlLmZvbnRTaXplLFxyXG5cdFx0bWFyZ2luVG9wOiB0aGVtZS5zcGFjaW5nLnNtYWxsLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vc3R5bGVzJztcclxuXHJcbmNsYXNzIEZvcm1TZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBpZCwgb3B0aW9ucywgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IGZvcm1GaWVsZElkIH0gPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cdFx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRjbGFzc2VzLnNlbGVjdCxcclxuXHRcdFx0cHJvcHMuZGlzYWJsZWQgPyBjbGFzc2VzWydzZWxlY3QtLWRpc2FibGVkJ10gOiBudWxsXHJcblx0XHQpO1xyXG5cdFx0cHJvcHMuaWQgPSBpZCB8fCBmb3JtRmllbGRJZDtcclxuXHJcblx0XHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRcdGlmIChvcHRpb25zICYmIGNoaWxkcmVuKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IEZvcm1TZWxlY3QgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgb3B0aW9uc2AuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udGFpbmVyKX0+XHJcblx0XHRcdFx0e29wdGlvbnMgPyAoXHJcblx0XHRcdFx0XHQ8c2VsZWN0IHsuLi5wcm9wc30+e29wdGlvbnMubWFwKG9wdCA9PiAoXHJcblx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXtvcHQudmFsdWV9IHZhbHVlPXtvcHQudmFsdWV9PlxyXG5cdFx0XHRcdFx0XHRcdHtvcHQubGFiZWx9XHJcblx0XHRcdFx0XHRcdDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0XHQ8L3NlbGVjdD5cclxuXHRcdFx0XHQpIDogPHNlbGVjdCB7Li4ucHJvcHN9PntjaGlsZHJlbn08L3NlbGVjdD59XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvd3MsIHByb3BzLmRpc2FibGVkID8gY2xhc3Nlc1snYXJyb3dzLS1kaXNhYmxlZCddIDogbnVsbCl9PlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlcy5hcnJvd1RvcCl9IC8+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmFycm93LCBjbGFzc2VzLmFycm93Qm90dG9tKX0gLz5cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5Gb3JtU2VsZWN0LmNvbnRleHRUeXBlcyA9IHtcclxuXHRmb3JtRmllbGRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuRm9ybVNlbGVjdC5wcm9wVHlwZXMgPSB7XHJcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXHJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR9KVxyXG5cdCksXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XSksXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1TZWxlY3Q7XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtIFNlbGVjdFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcbmltcG9ydCB7IGRhcmtlbiwgbGlnaHRlbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbG9yJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0IG5vZGVcclxuXHRzZWxlY3Q6IHtcclxuXHRcdGFwcGVhcmFuY2U6ICdub25lJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kZWZhdWx0LFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiAnbm9uZScsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJCb3R0b21Db2xvcjogZGFya2VuKHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LCA0KSxcclxuXHRcdGJvcmRlclRvcENvbG9yOiBsaWdodGVuKHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5kZWZhdWx0LCA0KSxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuaW5wdXQuYm9yZGVyLnJhZGl1cyxcclxuXHRcdGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG5cdFx0Ym9yZGVyV2lkdGg6IHRoZW1lLmlucHV0LmJvcmRlci53aWR0aCxcclxuXHRcdGJveFNoYWRvdzogdGhlbWUuc2VsZWN0LmJveFNoYWRvdyxcclxuXHRcdGNvbG9yOiAnaW5oZXJpdCcsIC8vIEZJWE1FXHJcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiB0aGVtZS5pbnB1dC5oZWlnaHQsXHJcblx0XHRsaW5lSGVpZ2h0OiB0aGVtZS5pbnB1dC5saW5lSGVpZ2h0LFxyXG5cdFx0cGFkZGluZzogYDAgJHt0aGVtZS5pbnB1dC5wYWRkaW5nSG9yaXpvbnRhbH1gLFxyXG5cdFx0dHJhbnNpdGlvbjogJ2JvcmRlci1jb2xvciBlYXNlLWluLW91dCAwLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjE1cycsXHJcblx0XHR3aWR0aDogJzEwMCUnLFxyXG5cclxuXHRcdCc6aG92ZXInOiB7XHJcblx0XHRcdGJvcmRlckNvbG9yOiB0aGVtZS5pbnB1dC5ib3JkZXIuY29sb3IuaG92ZXIsXHJcblx0XHRcdG91dGxpbmU6IDAsXHJcblx0XHR9LFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Ym9yZGVyQ29sb3I6IHRoZW1lLmlucHV0LmJvcmRlci5jb2xvci5mb2N1cyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdFx0b3V0bGluZTogMCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHQnc2VsZWN0LS1kaXNhYmxlZCc6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaW5wdXQuYmFja2dyb3VuZC5kaXNhYmxlZCxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBhcnJvd3NcclxuXHRhcnJvd3M6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0ZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRoZWlnaHQ6IHRoZW1lLmlucHV0LmhlaWdodCxcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0cmlnaHQ6IDAsXHJcblx0XHR0b3A6IDAsXHJcblx0XHR3aWR0aDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdH0sXHJcblx0YXJyb3c6IHtcclxuXHRcdGJvcmRlckxlZnQ6ICcwLjNlbSBzb2xpZCB0cmFuc3BhcmVudCcsXHJcblx0XHRib3JkZXJSaWdodDogJzAuM2VtIHNvbGlkIHRyYW5zcGFyZW50JyxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAwLFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHR3aWR0aDogMCxcclxuXHRcdHpJbmRleDogMSxcclxuXHR9LFxyXG5cdGFycm93VG9wOiB7XHJcblx0XHRib3JkZXJCb3R0b206ICcwLjNlbSBzb2xpZCcsXHJcblx0XHRtYXJnaW5Cb3R0b206ICcwLjFlbScsXHJcblx0fSxcclxuXHRhcnJvd0JvdHRvbToge1xyXG5cdFx0Ym9yZGVyVG9wOiAnMC4zZW0gc29saWQnLFxyXG5cdFx0bWFyZ2luVG9wOiAnMC4xZW0nLFxyXG5cdH0sXHJcbn07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZvcm1MYXlvdXQ6IHRoaXMucHJvcHMubGF5b3V0LFxyXG5cdFx0XHRsYWJlbFdpZHRoOiB0aGlzLnByb3BzLmxhYmVsV2lkdGgsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Ly8gTk9URSBgbGFiZWxXaWR0aGAgaXMgZGVjbGFyZWQgdG8gcmVtb3ZlIGl0IGZyb20gYHByb3BzYCwgdGhvdWdoIG5ldmVyIHVzZWRcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0Y2xhc3NOYW1lLFxyXG5cdFx0XHRjb21wb25lbnQ6IENvbXBvbmVudCxcclxuXHRcdFx0bGFiZWxXaWR0aCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG5cdFx0XHRsYXlvdXQsXHJcblx0XHRcdC4uLnByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRcdGNsYXNzZXMuRm9ybSxcclxuXHRcdFx0Y2xhc3Nlc1snRm9ybV9fJyArIGxheW91dF0sXHJcblx0XHRcdGNsYXNzTmFtZVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH1cclxufTtcclxuXHJcbkZvcm0uY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0Zm9ybUxheW91dDogUHJvcFR5cGVzLm9uZU9mKFsnYmFzaWMnLCAnaG9yaXpvbnRhbCcsICdpbmxpbmUnXSksXHJcblx0bGFiZWxXaWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcclxuXHRdKSxcclxufTtcclxuRm9ybS5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRsYXlvdXQ6IFByb3BUeXBlcy5vbmVPZihbJ2Jhc2ljJywgJ2hvcml6b250YWwnLCAnaW5saW5lJ10pLFxyXG59O1xyXG5Gb3JtLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdmb3JtJyxcclxuXHRsYXlvdXQ6ICdiYXNpYycsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGb3JtXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Rm9ybToge30sXHJcbn07XHJcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IEdseXBoIGZyb20gJy4uL0dseXBoJztcclxuXHJcbmZ1bmN0aW9uIEdseXBoQnV0dG9uICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Z2x5cGgsXHJcblx0Z2x5cGhDb2xvcixcclxuXHRnbHlwaFNpemUsXHJcblx0Z2x5cGhTdHlsZSxcclxuXHRwb3NpdGlvbixcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Y29uc3QgaXNEZWZhdWx0ID0gcG9zaXRpb24gPT09ICdkZWZhdWx0JztcclxuXHRjb25zdCBpc0xlZnQgPSBwb3NpdGlvbiA9PT0gJ2xlZnQnO1xyXG5cdGNvbnN0IGlzUmlnaHQgPSBwb3NpdGlvbiA9PT0gJ3JpZ2h0JztcclxuXHJcblx0Y29uc3Qgb2Zmc2V0ID0ge307XHJcblx0aWYgKGlzTGVmdCkgb2Zmc2V0Lm1hcmdpblJpZ2h0ID0gJzAuNWVtJztcclxuXHRpZiAoaXNSaWdodCkgb2Zmc2V0Lm1hcmdpbkxlZnQgPSAnMC41ZW0nO1xyXG5cclxuXHRjb25zdCBnbHlwaFN0eWxlcyA9IHtcclxuXHRcdC4uLm9mZnNldCxcclxuXHRcdC4uLmdseXBoU3R5bGUsXHJcblx0fTtcclxuXHJcblx0Y29uc3QgaWNvbiA9IChcclxuXHRcdDxHbHlwaFxyXG5cdFx0XHRhcGhyb2RpdGVTdHlsZXM9e2NsYXNzZXMuZ2x5cGh9XHJcblx0XHRcdGNvbG9yPXtnbHlwaENvbG9yfVxyXG5cdFx0XHRuYW1lPXtnbHlwaH1cclxuXHRcdFx0c2l6ZT17Z2x5cGhTaXplfVxyXG5cdFx0XHRzdHlsZT17Z2x5cGhTdHlsZXN9XHJcblx0XHQvPlxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdHsoaXNEZWZhdWx0IHx8IGlzTGVmdCkgJiYgaWNvbn1cclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHR7aXNSaWdodCAmJiBpY29ufVxyXG5cdFx0PC9CdXR0b24+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIEZvciBwcm9wcyBcImdseXBoXCIsIFwiZ2x5cGhDb2xvclwiLCBhbmQgXCJnbHlwaFNpemVcIjpcclxuLy8gcHJvcCB0eXBlIHZhbGlkYXRpb24gd2lsbCBvY2N1ciB3aXRoaW4gdGhlIEdseXBoIGNvbXBvbmVudCwgbm8gbmVlZCB0b1xyXG4vLyBkdXBsaWNhdGUsIGp1c3QgcGFzcyBpdCB0aHJvdWdoLlxyXG5HbHlwaEJ1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0Z2x5cGg6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0Z2x5cGhTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnZGVmYXVsdCcsICdsZWZ0JywgJ3JpZ2h0J10pLFxyXG59O1xyXG5HbHlwaEJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Z2x5cGhTdHlsZToge30sXHJcblx0cG9zaXRpb246ICdkZWZhdWx0JywgLy8gbm8gbWFyZ2luLCBhc3N1bWVzIG5vIGNoaWxkcmVuXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdseXBoOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblRvcDogJy0wLjEyNWVtJywgLy8gZml4IGljb24gYWxpZ25tZW50XHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaEJ1dHRvbjtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0Zvcm1GaWVsZCc7XHJcbmltcG9ydCBHbHlwaCBmcm9tICcuLi9HbHlwaCc7XHJcblxyXG5mdW5jdGlvbiBHbHlwaEZpZWxkICh7XHJcblx0Y2hpbGRyZW4sXHJcblx0Z2x5cGgsXHJcblx0Z2x5cGhDb2xvcixcclxuXHRnbHlwaFNpemUsXHJcblx0cG9zaXRpb24sXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdGNvbnN0IGlzTGVmdCA9IHBvc2l0aW9uID09PSAnbGVmdCc7XHJcblx0Y29uc3QgaXNSaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnO1xyXG5cclxuXHRjb25zdCBnbHlwaFN0eWxlcyA9IHt9O1xyXG5cdGlmIChpc0xlZnQpIGdseXBoU3R5bGVzLm1hcmdpblJpZ2h0ID0gJzAuNWVtJztcclxuXHRpZiAoaXNSaWdodCkgZ2x5cGhTdHlsZXMubWFyZ2luTGVmdCA9ICcwLjVlbSc7XHJcblxyXG5cdGNvbnN0IGljb24gPSAoXHJcblx0XHQ8R2x5cGhcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmdseXBofVxyXG5cdFx0XHRjb2xvcj17Z2x5cGhDb2xvcn1cclxuXHRcdFx0bmFtZT17Z2x5cGh9XHJcblx0XHRcdHNpemU9e2dseXBoU2l6ZX1cclxuXHRcdFx0c3R5bGU9e2dseXBoU3R5bGVzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEZpZWxkIGFwaHJvZGl0ZVN0eWxlcz17Y2xhc3Nlcy53cmFwcGVyfSB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7aXNMZWZ0ICYmIGljb259XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0e2lzUmlnaHQgJiYgaWNvbn1cclxuXHRcdDwvRmllbGQ+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIEZvciBwcm9wcyBcImdseXBoXCIsIFwiZ2x5cGhDb2xvclwiLCBhbmQgXCJnbHlwaFNpemVcIjpcclxuLy8gcHJvcCB0eXBlIHZhbGlkYXRpb24gd2lsbCBvY2N1ciB3aXRoaW4gdGhlIEdseXBoIGNvbXBvbmVudCwgbm8gbmVlZCB0b1xyXG4vLyBkdXBsaWNhdGUsIGp1c3QgcGFzcyBpdCB0aHJvdWdoLlxyXG5HbHlwaEZpZWxkLnByb3BUeXBlcyA9IHtcclxuXHRnbHlwaDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRnbHlwaENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGdseXBoU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcclxufTtcclxuR2x5cGhGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0cG9zaXRpb246ICdsZWZ0JyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0d3JhcHBlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0fSxcclxuXHRnbHlwaDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHRtYXJnaW5Ub3A6ICctMC4xMjVlbScsIC8vIGZpeCBpY29uIGFsaWdubWVudFxyXG5cdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2x5cGhGaWVsZDtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGRhbmdlcjogdGhlbWUuZ2x5cGguY29sb3IuZGFuZ2VyLFxyXG5cdGluaGVyaXQ6IHRoZW1lLmdseXBoLmNvbG9yLmluaGVyaXQsXHJcblx0aW52ZXJ0ZWQ6IHRoZW1lLmdseXBoLmNvbG9yLmludmVydGVkLFxyXG5cdHByaW1hcnk6IHRoZW1lLmdseXBoLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuZ2x5cGguY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5nbHlwaC5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IG9jdGljb25zIGZyb20gJy4vb2N0aWNvbnMnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG4vLyBGSVhNRSBzdGF0aWMgb2N0aWNvbiBjbGFzc2VzIGxlYW5pbmcgb24gRWxlbWVudGFsIHRvIGF2b2lkIGR1cGxpY2F0ZVxyXG4vLyBmb250IGFuZCBDU1M7IGluZmxhdGluZyB0aGUgcHJvamVjdCBzaXplXHJcblxyXG5mdW5jdGlvbiBHbHlwaCAoe1xyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjbGFzc05hbWUsXHJcblx0Y29sb3IsXHJcblx0Y29tcG9uZW50OiBDb21wb25lbnQsXHJcblx0bmFtZSxcclxuXHRzaXplLFxyXG5cdHN0eWxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBjb2xvcklzVmFsaWRUeXBlID0gT2JqZWN0LmtleXMoY29sb3JzKS5pbmNsdWRlcyhjb2xvcik7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5nbHlwaCxcclxuXHRcdGNvbG9ySXNWYWxpZFR5cGUgJiYgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sXHJcblx0XHRjbGFzc2VzWydzaXplX18nICsgc2l6ZV0sXHJcblx0XHRhcGhyb2RpdGVTdHlsZXNcclxuXHQpICsgYCAke29jdGljb25zW25hbWVdfWA7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gc3VwcG9ydCByYW5kb20gY29sb3Igc3RyaW5nc1xyXG5cdHByb3BzLnN0eWxlID0ge1xyXG5cdFx0Y29sb3I6ICFjb2xvcklzVmFsaWRUeXBlID8gY29sb3IgOiBudWxsLFxyXG5cdFx0Li4uc3R5bGUsXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbkdseXBoLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pLFxyXG5cdGNvbG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsIC8vIHN1cHBvcnQgcmFuZG9tIGNvbG9yIHN0cmluZ3NcclxuXHRdKSxcclxuXHRuYW1lOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMob2N0aWNvbnMpKS5pc1JlcXVpcmVkLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhzaXplcykpLFxyXG59O1xyXG5HbHlwaC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnaScsXHJcblx0Y29sb3I6ICdpbmhlcml0JyxcclxuXHRzaXplOiAnc21hbGwnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHbHlwaDtcclxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWxlcnQ6ICdvY3RpY29uIG9jdGljb24tYWxlcnQnLFxyXG5cdCdhcnJvdy1kb3duJzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1kb3duJyxcclxuXHQnYXJyb3ctbGVmdCc6ICdvY3RpY29uIG9jdGljb24tYXJyb3ctbGVmdCcsXHJcblx0J2Fycm93LXJpZ2h0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1yaWdodCcsXHJcblx0J2Fycm93LXNtYWxsLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLWRvd24nLFxyXG5cdCdhcnJvdy1zbWFsbC1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi1hcnJvdy1zbWFsbC1sZWZ0JyxcclxuXHQnYXJyb3ctc21hbGwtcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLXJpZ2h0JyxcclxuXHQnYXJyb3ctc21hbGwtdXAnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXNtYWxsLXVwJyxcclxuXHQnYXJyb3ctdXAnOiAnb2N0aWNvbiBvY3RpY29uLWFycm93LXVwJyxcclxuXHRtaWNyb3Njb3BlOiAnb2N0aWNvbiBvY3RpY29uLW1pY3Jvc2NvcGUnLFxyXG5cdGJlYWtlcjogJ29jdGljb24gb2N0aWNvbi1iZWFrZXInLFxyXG5cdGJlbGw6ICdvY3RpY29uIG9jdGljb24tYmVsbCcsXHJcblx0Ym9vazogJ29jdGljb24gb2N0aWNvbi1ib29rJyxcclxuXHRib29rbWFyazogJ29jdGljb24gb2N0aWNvbi1ib29rbWFyaycsXHJcblx0YnJpZWZjYXNlOiAnb2N0aWNvbiBvY3RpY29uLWJyaWVmY2FzZScsXHJcblx0YnJvYWRjYXN0OiAnb2N0aWNvbiBvY3RpY29uLWJyb2FkY2FzdCcsXHJcblx0YnJvd3NlcjogJ29jdGljb24gb2N0aWNvbi1icm93c2VyJyxcclxuXHRidWc6ICdvY3RpY29uIG9jdGljb24tYnVnJyxcclxuXHRjYWxlbmRhcjogJ29jdGljb24gb2N0aWNvbi1jYWxlbmRhcicsXHJcblx0Y2hlY2s6ICdvY3RpY29uIG9jdGljb24tY2hlY2snLFxyXG5cdGNoZWNrbGlzdDogJ29jdGljb24gb2N0aWNvbi1jaGVja2xpc3QnLFxyXG5cdCdjaGV2cm9uLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tZG93bicsXHJcblx0J2NoZXZyb24tbGVmdCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1sZWZ0JyxcclxuXHQnY2hldnJvbi1yaWdodCc6ICdvY3RpY29uIG9jdGljb24tY2hldnJvbi1yaWdodCcsXHJcblx0J2NoZXZyb24tdXAnOiAnb2N0aWNvbiBvY3RpY29uLWNoZXZyb24tdXAnLFxyXG5cdCdjaXJjbGUtc2xhc2gnOiAnb2N0aWNvbiBvY3RpY29uLWNpcmNsZS1zbGFzaCcsXHJcblx0J2NpcmN1aXQtYm9hcmQnOiAnb2N0aWNvbiBvY3RpY29uLWNpcmN1aXQtYm9hcmQnLFxyXG5cdGNsaXBweTogJ29jdGljb24gb2N0aWNvbi1jbGlwcHknLFxyXG5cdGNsb2NrOiAnb2N0aWNvbiBvY3RpY29uLWNsb2NrJyxcclxuXHQnY2xvdWQtZG93bmxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWNsb3VkLWRvd25sb2FkJyxcclxuXHQnY2xvdWQtdXBsb2FkJzogJ29jdGljb24gb2N0aWNvbi1jbG91ZC11cGxvYWQnLFxyXG5cdGNvZGU6ICdvY3RpY29uIG9jdGljb24tY29kZScsXHJcblx0J2NvbG9yLW1vZGUnOiAnb2N0aWNvbiBvY3RpY29uLWNvbG9yLW1vZGUnLFxyXG5cdCdjb21tZW50LWFkZCc6ICdvY3RpY29uIG9jdGljb24tY29tbWVudC1hZGQnLFxyXG5cdGNvbW1lbnQ6ICdvY3RpY29uIG9jdGljb24tY29tbWVudCcsXHJcblx0J2NvbW1lbnQtZGlzY3Vzc2lvbic6ICdvY3RpY29uIG9jdGljb24tY29tbWVudC1kaXNjdXNzaW9uJyxcclxuXHQnY3JlZGl0LWNhcmQnOiAnb2N0aWNvbiBvY3RpY29uLWNyZWRpdC1jYXJkJyxcclxuXHRkYXNoOiAnb2N0aWNvbiBvY3RpY29uLWRhc2gnLFxyXG5cdGRhc2hib2FyZDogJ29jdGljb24gb2N0aWNvbi1kYXNoYm9hcmQnLFxyXG5cdGRhdGFiYXNlOiAnb2N0aWNvbiBvY3RpY29uLWRhdGFiYXNlJyxcclxuXHRjbG9uZTogJ29jdGljb24gb2N0aWNvbi1jbG9uZScsXHJcblx0J2Rlc2t0b3AtZG93bmxvYWQnOiAnb2N0aWNvbiBvY3RpY29uLWRlc2t0b3AtZG93bmxvYWQnLFxyXG5cdCdkZXZpY2UtY2FtZXJhJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtY2FtZXJhJyxcclxuXHQnZGV2aWNlLWNhbWVyYS12aWRlbyc6ICdvY3RpY29uIG9jdGljb24tZGV2aWNlLWNhbWVyYS12aWRlbycsXHJcblx0J2RldmljZS1kZXNrdG9wJzogJ29jdGljb24gb2N0aWNvbi1kZXZpY2UtZGVza3RvcCcsXHJcblx0J2RldmljZS1tb2JpbGUnOiAnb2N0aWNvbiBvY3RpY29uLWRldmljZS1tb2JpbGUnLFxyXG5cdGRpZmY6ICdvY3RpY29uIG9jdGljb24tZGlmZicsXHJcblx0J2RpZmYtYWRkZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtYWRkZWQnLFxyXG5cdCdkaWZmLWlnbm9yZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtaWdub3JlZCcsXHJcblx0J2RpZmYtbW9kaWZpZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtbW9kaWZpZWQnLFxyXG5cdCdkaWZmLXJlbW92ZWQnOiAnb2N0aWNvbiBvY3RpY29uLWRpZmYtcmVtb3ZlZCcsXHJcblx0J2RpZmYtcmVuYW1lZCc6ICdvY3RpY29uIG9jdGljb24tZGlmZi1yZW5hbWVkJyxcclxuXHRlbGxpcHNpczogJ29jdGljb24gb2N0aWNvbi1lbGxpcHNpcycsXHJcblx0J2V5ZS11bndhdGNoJzogJ29jdGljb24gb2N0aWNvbi1leWUtdW53YXRjaCcsXHJcblx0J2V5ZS13YXRjaCc6ICdvY3RpY29uIG9jdGljb24tZXllLXdhdGNoJyxcclxuXHRleWU6ICdvY3RpY29uIG9jdGljb24tZXllJyxcclxuXHQnZmlsZS1iaW5hcnknOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtYmluYXJ5JyxcclxuXHQnZmlsZS1jb2RlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWNvZGUnLFxyXG5cdCdmaWxlLWRpcmVjdG9yeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1kaXJlY3RvcnknLFxyXG5cdCdmaWxlLW1lZGlhJzogJ29jdGljb24gb2N0aWNvbi1maWxlLW1lZGlhJyxcclxuXHQnZmlsZS1wZGYnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtcGRmJyxcclxuXHQnZmlsZS1zdWJtb2R1bGUnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtc3VibW9kdWxlJyxcclxuXHQnZmlsZS1zeW1saW5rLWRpcmVjdG9yeSc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1zeW1saW5rLWRpcmVjdG9yeScsXHJcblx0J2ZpbGUtc3ltbGluay1maWxlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLXN5bWxpbmstZmlsZScsXHJcblx0J2ZpbGUtdGV4dCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS10ZXh0JyxcclxuXHQnZmlsZS16aXAnOiAnb2N0aWNvbiBvY3RpY29uLWZpbGUtemlwJyxcclxuXHRmbGFtZTogJ29jdGljb24gb2N0aWNvbi1mbGFtZScsXHJcblx0Zm9sZDogJ29jdGljb24gb2N0aWNvbi1mb2xkJyxcclxuXHRnZWFyOiAnb2N0aWNvbiBvY3RpY29uLWdlYXInLFxyXG5cdGdpZnQ6ICdvY3RpY29uIG9jdGljb24tZ2lmdCcsXHJcblx0Z2lzdDogJ29jdGljb24gb2N0aWNvbi1naXN0JyxcclxuXHQnZ2lzdC1zZWNyZXQnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3Qtc2VjcmV0JyxcclxuXHQnZ2l0LWJyYW5jaC1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gtY3JlYXRlJyxcclxuXHQnZ2l0LWJyYW5jaC1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2gtZGVsZXRlJyxcclxuXHQnZ2l0LWJyYW5jaCc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWJyYW5jaCcsXHJcblx0J2dpdC1jb21taXQnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1jb21taXQnLFxyXG5cdCdnaXQtY29tcGFyZSc6ICdvY3RpY29uIG9jdGljb24tZ2l0LWNvbXBhcmUnLFxyXG5cdCdnaXQtbWVyZ2UnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1tZXJnZScsXHJcblx0J2dpdC1wdWxsLXJlcXVlc3QtYWJhbmRvbmVkJzogJ29jdGljb24gb2N0aWNvbi1naXQtcHVsbC1yZXF1ZXN0LWFiYW5kb25lZCcsXHJcblx0J2dpdC1wdWxsLXJlcXVlc3QnOiAnb2N0aWNvbiBvY3RpY29uLWdpdC1wdWxsLXJlcXVlc3QnLFxyXG5cdGdsb2JlOiAnb2N0aWNvbiBvY3RpY29uLWdsb2JlJyxcclxuXHRncmFwaDogJ29jdGljb24gb2N0aWNvbi1ncmFwaCcsXHJcblx0aGVhcnQ6ICdvY3RpY29uIG9jdGljb24taGVhcnQnLFxyXG5cdGhpc3Rvcnk6ICdvY3RpY29uIG9jdGljb24taGlzdG9yeScsXHJcblx0aG9tZTogJ29jdGljb24gb2N0aWNvbi1ob21lJyxcclxuXHQnaG9yaXpvbnRhbC1ydWxlJzogJ29jdGljb24gb2N0aWNvbi1ob3Jpem9udGFsLXJ1bGUnLFxyXG5cdGh1Ym90OiAnb2N0aWNvbiBvY3RpY29uLWh1Ym90JyxcclxuXHRpbmJveDogJ29jdGljb24gb2N0aWNvbi1pbmJveCcsXHJcblx0aW5mbzogJ29jdGljb24gb2N0aWNvbi1pbmZvJyxcclxuXHQnaXNzdWUtY2xvc2VkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1jbG9zZWQnLFxyXG5cdCdpc3N1ZS1vcGVuZWQnOiAnb2N0aWNvbiBvY3RpY29uLWlzc3VlLW9wZW5lZCcsXHJcblx0J2lzc3VlLXJlb3BlbmVkJzogJ29jdGljb24gb2N0aWNvbi1pc3N1ZS1yZW9wZW5lZCcsXHJcblx0amVyc2V5OiAnb2N0aWNvbiBvY3RpY29uLWplcnNleScsXHJcblx0a2V5OiAnb2N0aWNvbiBvY3RpY29uLWtleScsXHJcblx0a2V5Ym9hcmQ6ICdvY3RpY29uIG9jdGljb24ta2V5Ym9hcmQnLFxyXG5cdGxhdzogJ29jdGljb24gb2N0aWNvbi1sYXcnLFxyXG5cdCdsaWdodC1idWxiJzogJ29jdGljb24gb2N0aWNvbi1saWdodC1idWxiJyxcclxuXHRsaW5rOiAnb2N0aWNvbiBvY3RpY29uLWxpbmsnLFxyXG5cdCdsaW5rLWV4dGVybmFsJzogJ29jdGljb24gb2N0aWNvbi1saW5rLWV4dGVybmFsJyxcclxuXHQnbGlzdC1vcmRlcmVkJzogJ29jdGljb24gb2N0aWNvbi1saXN0LW9yZGVyZWQnLFxyXG5cdCdsaXN0LXVub3JkZXJlZCc6ICdvY3RpY29uIG9jdGljb24tbGlzdC11bm9yZGVyZWQnLFxyXG5cdGxvY2F0aW9uOiAnb2N0aWNvbiBvY3RpY29uLWxvY2F0aW9uJyxcclxuXHQnZ2lzdC1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1naXN0LXByaXZhdGUnLFxyXG5cdCdtaXJyb3ItcHJpdmF0ZSc6ICdvY3RpY29uIG9jdGljb24tbWlycm9yLXByaXZhdGUnLFxyXG5cdCdnaXQtZm9yay1wcml2YXRlJzogJ29jdGljb24gb2N0aWNvbi1naXQtZm9yay1wcml2YXRlJyxcclxuXHRsb2NrOiAnb2N0aWNvbiBvY3RpY29uLWxvY2snLFxyXG5cdCdsb2dvLWdpdGh1Yic6ICdvY3RpY29uIG9jdGljb24tbG9nby1naXRodWInLFxyXG5cdG1haWw6ICdvY3RpY29uIG9jdGljb24tbWFpbCcsXHJcblx0J21haWwtcmVhZCc6ICdvY3RpY29uIG9jdGljb24tbWFpbC1yZWFkJyxcclxuXHQnbWFpbC1yZXBseSc6ICdvY3RpY29uIG9jdGljb24tbWFpbC1yZXBseScsXHJcblx0J21hcmstZ2l0aHViJzogJ29jdGljb24gb2N0aWNvbi1tYXJrLWdpdGh1YicsXHJcblx0bWFya2Rvd246ICdvY3RpY29uIG9jdGljb24tbWFya2Rvd24nLFxyXG5cdG1lZ2FwaG9uZTogJ29jdGljb24gb2N0aWNvbi1tZWdhcGhvbmUnLFxyXG5cdG1lbnRpb246ICdvY3RpY29uIG9jdGljb24tbWVudGlvbicsXHJcblx0bWlsZXN0b25lOiAnb2N0aWNvbiBvY3RpY29uLW1pbGVzdG9uZScsXHJcblx0J21pcnJvci1wdWJsaWMnOiAnb2N0aWNvbiBvY3RpY29uLW1pcnJvci1wdWJsaWMnLFxyXG5cdG1pcnJvcjogJ29jdGljb24gb2N0aWNvbi1taXJyb3InLFxyXG5cdCdtb3J0YXItYm9hcmQnOiAnb2N0aWNvbiBvY3RpY29uLW1vcnRhci1ib2FyZCcsXHJcblx0bXV0ZTogJ29jdGljb24gb2N0aWNvbi1tdXRlJyxcclxuXHQnbm8tbmV3bGluZSc6ICdvY3RpY29uIG9jdGljb24tbm8tbmV3bGluZScsXHJcblx0b2N0b2ZhY2U6ICdvY3RpY29uIG9jdGljb24tb2N0b2ZhY2UnLFxyXG5cdG9yZ2FuaXphdGlvbjogJ29jdGljb24gb2N0aWNvbi1vcmdhbml6YXRpb24nLFxyXG5cdHBhY2thZ2U6ICdvY3RpY29uIG9jdGljb24tcGFja2FnZScsXHJcblx0cGFpbnRjYW46ICdvY3RpY29uIG9jdGljb24tcGFpbnRjYW4nLFxyXG5cdHBlbmNpbDogJ29jdGljb24gb2N0aWNvbi1wZW5jaWwnLFxyXG5cdCdwZXJzb24tYWRkJzogJ29jdGljb24gb2N0aWNvbi1wZXJzb24tYWRkJyxcclxuXHQncGVyc29uLWZvbGxvdyc6ICdvY3RpY29uIG9jdGljb24tcGVyc29uLWZvbGxvdycsXHJcblx0cGVyc29uOiAnb2N0aWNvbiBvY3RpY29uLXBlcnNvbicsXHJcblx0cGluOiAnb2N0aWNvbiBvY3RpY29uLXBpbicsXHJcblx0cGx1ZzogJ29jdGljb24gb2N0aWNvbi1wbHVnJyxcclxuXHQncmVwby1jcmVhdGUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tY3JlYXRlJyxcclxuXHQnZ2lzdC1uZXcnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtbmV3JyxcclxuXHQnZmlsZS1kaXJlY3RvcnktY3JlYXRlJzogJ29jdGljb24gb2N0aWNvbi1maWxlLWRpcmVjdG9yeS1jcmVhdGUnLFxyXG5cdCdmaWxlLWFkZCc6ICdvY3RpY29uIG9jdGljb24tZmlsZS1hZGQnLFxyXG5cdHBsdXM6ICdvY3RpY29uIG9jdGljb24tcGx1cycsXHJcblx0J3ByaW1pdGl2ZS1kb3QnOiAnb2N0aWNvbiBvY3RpY29uLXByaW1pdGl2ZS1kb3QnLFxyXG5cdCdwcmltaXRpdmUtc3F1YXJlJzogJ29jdGljb24gb2N0aWNvbi1wcmltaXRpdmUtc3F1YXJlJyxcclxuXHRwdWxzZTogJ29jdGljb24gb2N0aWNvbi1wdWxzZScsXHJcblx0cXVlc3Rpb246ICdvY3RpY29uIG9jdGljb24tcXVlc3Rpb24nLFxyXG5cdHF1b3RlOiAnb2N0aWNvbiBvY3RpY29uLXF1b3RlJyxcclxuXHQncmFkaW8tdG93ZXInOiAnb2N0aWNvbiBvY3RpY29uLXJhZGlvLXRvd2VyJyxcclxuXHQncmVwby1kZWxldGUnOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8tZGVsZXRlJyxcclxuXHRyZXBvOiAnb2N0aWNvbiBvY3RpY29uLXJlcG8nLFxyXG5cdCdyZXBvLWNsb25lJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWNsb25lJyxcclxuXHQncmVwby1mb3JjZS1wdXNoJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWZvcmNlLXB1c2gnLFxyXG5cdCdnaXN0LWZvcmsnOiAnb2N0aWNvbiBvY3RpY29uLWdpc3QtZm9yaycsXHJcblx0J3JlcG8tZm9ya2VkJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLWZvcmtlZCcsXHJcblx0J3JlcG8tcHVsbCc6ICdvY3RpY29uIG9jdGljb24tcmVwby1wdWxsJyxcclxuXHQncmVwby1wdXNoJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXB1c2gnLFxyXG5cdHJvY2tldDogJ29jdGljb24gb2N0aWNvbi1yb2NrZXQnLFxyXG5cdHJzczogJ29jdGljb24gb2N0aWNvbi1yc3MnLFxyXG5cdHJ1Ynk6ICdvY3RpY29uIG9jdGljb24tcnVieScsXHJcblx0J3NjcmVlbi1mdWxsJzogJ29jdGljb24gb2N0aWNvbi1zY3JlZW4tZnVsbCcsXHJcblx0J3NjcmVlbi1ub3JtYWwnOiAnb2N0aWNvbiBvY3RpY29uLXNjcmVlbi1ub3JtYWwnLFxyXG5cdCdzZWFyY2gtc2F2ZSc6ICdvY3RpY29uIG9jdGljb24tc2VhcmNoLXNhdmUnLFxyXG5cdHNlYXJjaDogJ29jdGljb24gb2N0aWNvbi1zZWFyY2gnLFxyXG5cdHNlcnZlcjogJ29jdGljb24gb2N0aWNvbi1zZXJ2ZXInLFxyXG5cdHNldHRpbmdzOiAnb2N0aWNvbiBvY3RpY29uLXNldHRpbmdzJyxcclxuXHRzaGllbGQ6ICdvY3RpY29uIG9jdGljb24tc2hpZWxkJyxcclxuXHQnbG9nLWluJzogJ29jdGljb24gb2N0aWNvbi1sb2ctaW4nLFxyXG5cdCdzaWduLWluJzogJ29jdGljb24gb2N0aWNvbi1zaWduLWluJyxcclxuXHQnbG9nLW91dCc6ICdvY3RpY29uIG9jdGljb24tbG9nLW91dCcsXHJcblx0J3NpZ24tb3V0JzogJ29jdGljb24gb2N0aWNvbi1zaWduLW91dCcsXHJcblx0c3F1aXJyZWw6ICdvY3RpY29uIG9jdGljb24tc3F1aXJyZWwnLFxyXG5cdCdzdGFyLWFkZCc6ICdvY3RpY29uIG9jdGljb24tc3Rhci1hZGQnLFxyXG5cdCdzdGFyLWRlbGV0ZSc6ICdvY3RpY29uIG9jdGljb24tc3Rhci1kZWxldGUnLFxyXG5cdHN0YXI6ICdvY3RpY29uIG9jdGljb24tc3RhcicsXHJcblx0c3RvcDogJ29jdGljb24gb2N0aWNvbi1zdG9wJyxcclxuXHQncmVwby1zeW5jJzogJ29jdGljb24gb2N0aWNvbi1yZXBvLXN5bmMnLFxyXG5cdHN5bmM6ICdvY3RpY29uIG9jdGljb24tc3luYycsXHJcblx0J3RhZy1yZW1vdmUnOiAnb2N0aWNvbiBvY3RpY29uLXRhZy1yZW1vdmUnLFxyXG5cdCd0YWctYWRkJzogJ29jdGljb24gb2N0aWNvbi10YWctYWRkJyxcclxuXHR0YWc6ICdvY3RpY29uIG9jdGljb24tdGFnJyxcclxuXHR0ZWxlc2NvcGU6ICdvY3RpY29uIG9jdGljb24tdGVsZXNjb3BlJyxcclxuXHR0ZXJtaW5hbDogJ29jdGljb24gb2N0aWNvbi10ZXJtaW5hbCcsXHJcblx0J3RocmVlLWJhcnMnOiAnb2N0aWNvbiBvY3RpY29uLXRocmVlLWJhcnMnLFxyXG5cdHRodW1ic2Rvd246ICdvY3RpY29uIG9jdGljb24tdGh1bWJzZG93bicsXHJcblx0dGh1bWJzdXA6ICdvY3RpY29uIG9jdGljb24tdGh1bWJzdXAnLFxyXG5cdHRvb2xzOiAnb2N0aWNvbiBvY3RpY29uLXRvb2xzJyxcclxuXHR0cmFzaGNhbjogJ29jdGljb24gb2N0aWNvbi10cmFzaGNhbicsXHJcblx0J3RyaWFuZ2xlLWRvd24nOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLWRvd24nLFxyXG5cdCd0cmlhbmdsZS1sZWZ0JzogJ29jdGljb24gb2N0aWNvbi10cmlhbmdsZS1sZWZ0JyxcclxuXHQndHJpYW5nbGUtcmlnaHQnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLXJpZ2h0JyxcclxuXHQndHJpYW5nbGUtdXAnOiAnb2N0aWNvbiBvY3RpY29uLXRyaWFuZ2xlLXVwJyxcclxuXHR1bmZvbGQ6ICdvY3RpY29uIG9jdGljb24tdW5mb2xkJyxcclxuXHR1bm11dGU6ICdvY3RpY29uIG9jdGljb24tdW5tdXRlJyxcclxuXHR2ZXJzaW9uczogJ29jdGljb24gb2N0aWNvbi12ZXJzaW9ucycsXHJcblx0d2F0Y2g6ICdvY3RpY29uIG9jdGljb24td2F0Y2gnLFxyXG5cdCdyZW1vdmUtY2xvc2UnOiAnb2N0aWNvbiBvY3RpY29uLXJlbW92ZS1jbG9zZScsXHJcblx0eDogJ29jdGljb24gb2N0aWNvbi14JyxcclxuXHR6YXA6ICdvY3RpY29uIG9jdGljb24temFwJyxcclxufTtcclxuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNtYWxsOiB0aGVtZS5nbHlwaC5zaXplLnNtYWxsLFxyXG5cdG1lZGl1bTogdGhlbWUuZ2x5cGguc2l6ZS5tZWRpdW0sXHJcblx0bGFyZ2U6IHRoZW1lLmdseXBoLnNpemUubGFyZ2UsXHJcbn07XHJcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBHbHlwaFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgc2l6ZXMgZnJvbSAnLi9zaXplcyc7XHJcblxyXG4vLyBQcmVwYXJlIHZhcmlhbnRzXHJcbmNvbnN0IGNvbG9yVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGNvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdH07XHJcbn0pO1xyXG5cclxuLy8gUHJlcGFyZSBzaXplc1xyXG5jb25zdCBzaXplVmFyaWFudHMgPSB7fTtcclxuT2JqZWN0LmtleXMoc2l6ZXMpLmZvckVhY2goc2l6ZSA9PiB7XHJcblx0c2l6ZVZhcmlhbnRzW2BzaXplX18ke3NpemV9YF0gPSB7XHJcblx0XHRmb250U2l6ZTogc2l6ZXNbc2l6ZV0sXHJcblx0fTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRnbHlwaDoge30sXHJcblxyXG5cdC8vIENvbG9yc1xyXG5cdC4uLmNvbG9yVmFyaWFudHMsXHJcblxyXG5cdC8vIFNpemVzXHJcblx0Li4uc2l6ZVZhcmlhbnRzLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5jb25zdCBXSURUSFMgPSB7XHJcblx0J29uZS13aG9sZSc6ICcxMDAlJyxcclxuXHQnb25lLWhhbGYnOiAnNTAlJyxcclxuXHQnb25lLXRoaXJkJzogJzMzLjMzJScsXHJcblx0J3R3by10aGlyZHMnOiAnNjYuNjYlJyxcclxuXHQnb25lLXF1YXJ0ZXInOiAnMjUlJyxcclxuXHQndGhyZWUtcXVhcnRlcnMnOiAnNzUlJyxcclxuXHJcblx0J29uZS1maWZ0aCc6ICcyMCUnLFxyXG5cdCd0d28tZmlmdGhzJzogJzQwJScsXHJcblx0J3RocmVlLWZpZnRocyc6ICc2MCUnLFxyXG5cdCdmb3VyLWZpZnRocyc6ICc4MCUnLFxyXG5cclxuXHQnb25lLXNpeHRoJzogJzE2LjY2JScsXHJcblx0J2ZpdmUtc2l4dGhzJzogJzgzLjMzJScsXHJcbn07XHJcblxyXG5jb25zdCBHcmlkQ29sID0gKHByb3BzLCBjb250ZXh0KSA9PiB7XHJcblx0Y29uc3QgZ3V0dGVyID0gcHJvcHMuZ3V0dGVyIHx8IGNvbnRleHQuZ3V0dGVyO1xyXG5cdGNvbnN0IHhzbWFsbCA9IHByb3BzLnhzbWFsbCB8fCBjb250ZXh0LnhzbWFsbDtcclxuXHRjb25zdCBzbWFsbCA9IHByb3BzLnNtYWxsIHx8IGNvbnRleHQuc21hbGw7XHJcblx0Y29uc3QgbWVkaXVtID0gcHJvcHMubWVkaXVtIHx8IGNvbnRleHQubWVkaXVtO1xyXG5cdGNvbnN0IGxhcmdlID0gcHJvcHMubGFyZ2UgfHwgY29udGV4dC5sYXJnZTtcclxuXHJcblx0Y29uc3QgY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlc1sneHNtYWxsLScgKyB4c21hbGxdLFxyXG5cdFx0Y2xhc3Nlc1snc21hbGwtJyArIHNtYWxsXSxcclxuXHRcdGNsYXNzZXNbJ21lZGl1bS0nICsgbWVkaXVtXSxcclxuXHRcdGNsYXNzZXNbJ2xhcmdlLScgKyBsYXJnZV1cclxuXHQpO1xyXG5cclxuXHRjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtwcm9wcy5jbGFzc05hbWUgPyAoJyAnICsgcHJvcHMuY2xhc3NOYW1lKSA6ICcnfWA7XHJcblx0Y29uc3QgY29tcG9uZW50U3R5bGVzID0gZ3V0dGVyID8ge1xyXG5cdFx0cGFkZGluZ0xlZnQ6IGd1dHRlciAvIDIsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IGd1dHRlciAvIDIsXHJcblx0fSA6IHt9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NvbXBvbmVudENsYXNzTmFtZX0gc3R5bGU9e2NvbXBvbmVudFN0eWxlc30+XHJcblx0XHRcdHtwcm9wcy5jaGlsZHJlbn1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5HcmlkQ29sLmNvbnRleHRUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0bGFyZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bWVkaXVtOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHhzbWFsbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRDb2wucHJvcFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCd4c21hbGwnLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ3NtYWxsJywgV0lEVEhTKSxcclxuXHQuLi5wcmVwYXJlV2lkdGhzKCdtZWRpdW0nLCBXSURUSFMpLFxyXG5cdC4uLnByZXBhcmVXaWR0aHMoJ2xhcmdlJywgV0lEVEhTKSxcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xyXG5mdW5jdGlvbiBwcmVwYXJlV2lkdGhzIChwcmVmaXgsIG9iaikge1xyXG5cdGxldCBjbGFzc2VzID0ge307XHJcblx0c3dpdGNoIChwcmVmaXgpIHtcclxuXHRcdGNhc2UgJ3NtYWxsJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldFBvcnRyYWl0TWlufSlgXToge1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbWVkaXVtJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LnRhYmxldExhbmRzY2FwZU1pbn0pYF06IHtcclxuXHRcdFx0XHRcdFx0d2lkdGg6IG9ialtwcm9wXSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ2xhcmdlJzpcclxuXHRcdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdFx0XHRjbGFzc2VzW3ByZWZpeCArICctJyArIHByb3BdID0ge1xyXG5cdFx0XHRcdFx0W2BAbWVkaWEgKG1pbi13aWR0aDogJHt0aGVtZS5icmVha3BvaW50LmRlc2t0b3BNaW59KWBdOiB7XHJcblx0XHRcdFx0XHRcdHdpZHRoOiBvYmpbcHJvcF0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGNsYXNzZXNbcHJlZml4ICsgJy0nICsgcHJvcF0gPSB7XHJcblx0XHRcdFx0XHR3aWR0aDogb2JqW3Byb3BdLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2xhc3NlcztcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZENvbDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5cclxuY2xhc3MgR3JpZFJvdyBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGd1dHRlcjogdGhpcy5wcm9wcy5ndXR0ZXIsXHJcblx0XHRcdHhzbWFsbDogdGhpcy5wcm9wcy54c21hbGwsXHJcblx0XHRcdHNtYWxsOiB0aGlzLnByb3BzLnNtYWxsLFxyXG5cdFx0XHRtZWRpdW06IHRoaXMucHJvcHMubWVkaXVtLFxyXG5cdFx0XHRsYXJnZTogdGhpcy5wcm9wcy5sYXJnZSxcclxuXHRcdH07XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGd1dHRlciwgc3R5bGVzID0ge30gfSA9IHRoaXMucHJvcHM7XHJcblxyXG5cdFx0Y29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gYCR7Y3NzKGNsYXNzZXMuZ3JpZCl9JHtjbGFzc05hbWUgPyAoJyAnICsgY2xhc3NOYW1lKSA6ICcnfWA7XHJcblx0XHRjb25zdCBjb21wb25lbnRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHN0eWxlcywge1xyXG5cdFx0XHRtYXJnaW5MZWZ0OiBndXR0ZXIgLyAtMixcclxuXHRcdFx0bWFyZ2luUmlnaHQ6IGd1dHRlciAvIC0yLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NvbXBvbmVudENsYXNzTmFtZX0gc3R5bGU9e2NvbXBvbmVudFN0eWxlc30+XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuR3JpZFJvdy5jaGlsZENvbnRleHRUeXBlcyA9IHtcclxuXHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdG1lZGl1bTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkdyaWRSb3cucHJvcFR5cGVzID0ge1xyXG5cdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRsYXJnZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRtZWRpdW06IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0c21hbGw6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0eHNtYWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuR3JpZFJvdy5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Z3V0dGVyOiAwLFxyXG5cdHhzbWFsbDogJ29uZS13aG9sZScsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGdyaWQ6IHtcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdGZsZXhXcmFwOiAnd3JhcCcsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZFJvdztcclxuIiwiaW1wb3J0IENvbCBmcm9tICcuLi9HcmlkQ29sJztcclxuaW1wb3J0IFJvdyBmcm9tICcuLi9HcmlkUm93JztcclxuXHJcbmV4cG9ydCB7IENvbCwgUm93IH07XHJcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5cclxuLy8gTk9URTogSW5saW5lIEdyb3VwIFNlY3Rpb24gYWNjZXB0cyBhIHNpbmdsZSBjaGlsZFxyXG5cclxuZnVuY3Rpb24gSW5saW5lR3JvdXBTZWN0aW9uICh7XHJcblx0YWN0aXZlLFxyXG5cdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0Y29udGlndW91cyxcclxuXHRncm93LFxyXG5cdHBvc2l0aW9uLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHQvLyBldmFsdWF0ZSBwb3NpdGlvblxyXG5cdGNvbnN0IHNlcGFyYXRlID0gcG9zaXRpb24gPT09ICdsYXN0JyB8fCBwb3NpdGlvbiA9PT0gJ21pZGRsZSc7XHJcblxyXG5cdC8vIEEgYGNvbnRpZ3VvdXNgIHNlY3Rpb24gbXVzdCBtYW5pcHVsYXRlIGl0J3MgY2hpbGQgZGlyZWN0bHlcclxuXHQvLyBBIHNlcGFyYXRlIChkZWZhdWx0KSBzZWN0aW9uIGp1c3Qgd3JhcHMgdGhlIGNoaWxkXHJcblx0cmV0dXJuIGNvbnRpZ3VvdXMgPyBjbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHtcclxuXHRcdGFwaHJvZGl0ZVN0eWxlczogW1xyXG5cdFx0XHRjbGFzc2VzLmNvbnRpZ3VvdXMsXHJcblx0XHRcdGNsYXNzZXNbJ2NvbnRpZ3VvdXNfXycgKyBwb3NpdGlvbl0sXHJcblx0XHRcdGFjdGl2ZSA/IGNsYXNzZXMuYWN0aXZlIDogbnVsbCxcclxuXHRcdFx0Z3JvdyA/IGNsYXNzZXMuZ3JvdyA6IG51bGwsXHJcblx0XHRcdGFwaHJvZGl0ZVN0eWxlcyxcclxuXHRcdF0sXHJcblx0XHQuLi5wcm9wcyxcclxuXHR9KSA6IChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoXHJcblx0XHRcdCEhZ3JvdyAmJiBjbGFzc2VzLmdyb3csXHJcblx0XHRcdCEhc2VwYXJhdGUgJiYgY2xhc3Nlcy5zZXBhcmF0ZSxcclxuXHRcdFx0YXBocm9kaXRlU3R5bGVzXHJcblx0XHQpfSB7Li4ucHJvcHN9PlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L2Rpdj5cclxuXHQpO1xyXG59O1xyXG5cclxuSW5saW5lR3JvdXBTZWN0aW9uLnByb3BUeXBlcyA9IHtcclxuXHRhY3RpdmU6IFByb3BUeXBlcy5ib29sLCAvLyBidXR0b25zIG9ubHlcclxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZCxcclxuXHRjb250aWd1b3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRncm93OiBQcm9wVHlwZXMuYm9vbCxcclxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnZmlyc3QnLCAnbGFzdCcsICdtaWRkbGUnLCAnb25seSddKSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5saW5lR3JvdXBTZWN0aW9uO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gSW5saW5lIEdyb3VwOiBTZWN0aW9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gVGFrZXMgb25seSBGb3JtSW5wdXQgYW5kIEJ1dHRvbiBhcyBjaGlsZHJlbiwgcmVuZGVyaW5nIHRoZW0gYXMgYVxyXG4vLyB0aWR5IGlubGluZSBhcnJheVxyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdC8vIHB1bGwgYWN0aXZlIGVsZW1lbnRzIHVwXHJcblx0YWN0aXZlOiB7XHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzdHJldGNoIHRvIGZpbGwgYXZhaWxhYmxlIHdpZHRoXHJcblx0Z3Jvdzoge1xyXG5cdFx0ZmxleDogJzEgMSAwJyxcclxuXHR9LFxyXG5cclxuXHQvLyBzZXBhcmF0ZSBhcHBsaWNhYmxlIG5vbi1jb250aWd1b3VzIGVsZW1lbnRzXHJcblx0c2VwYXJhdGU6IHtcclxuXHRcdHBhZGRpbmdMZWZ0OiAnMC43NWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb250aWd1b3VzOiBtYW5pcHVsYXRlIGNoaWxkcmVuIGRpcmVjdGx5XHJcblxyXG5cdC8vIHB1bGwgZm9jdXNlZCBjb250aWd1b3VzIGVsZW1lbnRzIHVwXHJcblx0Y29udGlndW91czoge1xyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0XHRcdHpJbmRleDogMSxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gcG9zaXRpb25cclxuXHRjb250aWd1b3VzX19taWRkbGU6IHtcclxuXHRcdGJvcmRlclJhZGl1czogMCxcclxuXHRcdG1hcmdpbkxlZnQ6IHRoZW1lLmJ1dHRvbi5ib3JkZXJXaWR0aCAqIC0xLFxyXG5cdH0sXHJcblx0Y29udGlndW91c19fZmlyc3Q6IHtcclxuXHRcdGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiAnMCAhaW1wb3J0YW50JyxcclxuXHR9LFxyXG5cdGNvbnRpZ3VvdXNfX2xhc3Q6IHtcclxuXHRcdGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICcwICFpbXBvcnRhbnQnLFxyXG5cdFx0Ym9yZGVyVG9wTGVmdFJhZGl1czogJzAgIWltcG9ydGFudCcsXHJcblx0XHRtYXJnaW5MZWZ0OiB0aGVtZS5idXR0b24uYm9yZGVyV2lkdGggKiAtMSxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50LCBDaGlsZHJlbiwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gTk9URTogb25seSBhY2NlcHRzIElubGluZUdyb3VwU2VjdGlvbiBhcyBhIHNpbmdsZSBjaGlsZFxyXG5cclxuZnVuY3Rpb24gSW5saW5lR3JvdXAgKHtcclxuXHRhcGhyb2RpdGVTdHlsZXMsXHJcblx0YmxvY2ssXHJcblx0Y2hpbGRyZW4sXHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdGNvbnRpZ3VvdXMsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdC8vIHByZXBhcmUgZ3JvdXAgY2xhc3NOYW1lXHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0Y2xhc3Nlcy5ncm91cCxcclxuXHRcdCEhYmxvY2sgJiYgY2xhc3Nlcy5ibG9jayxcclxuXHRcdGFwaHJvZGl0ZVN0eWxlc1xyXG5cdCk7XHJcblx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0cHJvcHMuY2xhc3NOYW1lICs9ICgnICcgKyBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gY29udmVydCBjaGlsZHJlbiB0byBhbiBhcnJheSBhbmQgZmlsdGVyIG91dCBmYWxzZXkgdmFsdWVzXHJcblx0Y29uc3QgYnV0dG9ucyA9IENoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pLmZpbHRlcihpID0+IGkpO1xyXG5cclxuXHQvLyBub3JtYWxpemUgdGhlIGNvdW50XHJcblx0Y29uc3QgY291bnQgPSBidXR0b25zLmxlbmd0aCAtIDE7XHJcblxyXG5cdC8vIGNsb25lIGNoaWxkcmVuIGFuZCBhcHBseSBjbGFzc05hbWVzIHRoYXQgYXBocm9kaXRlIGNhbiB0YXJnZXRcclxuXHRwcm9wcy5jaGlsZHJlbiA9IGJ1dHRvbnMubWFwKChjLCBpZHgpID0+IHtcclxuXHRcdGlmICghYykgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgaXNPbmx5Q2hpbGQgPSAhY291bnQ7XHJcblx0XHRjb25zdCBpc0ZpcnN0Q2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgaWR4ID09PSAwO1xyXG5cdFx0Y29uc3QgaXNMYXN0Q2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgaWR4ID09PSBjb3VudDtcclxuXHRcdGNvbnN0IGlzTWlkZGxlQ2hpbGQgPSAhaXNPbmx5Q2hpbGQgJiYgIWlzRmlyc3RDaGlsZCAmJiAhaXNMYXN0Q2hpbGQ7XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uO1xyXG5cdFx0aWYgKGlzT25seUNoaWxkKSBwb3NpdGlvbiA9ICdvbmx5JztcclxuXHRcdGlmIChpc0ZpcnN0Q2hpbGQpIHBvc2l0aW9uID0gJ2ZpcnN0JztcclxuXHRcdGlmIChpc0xhc3RDaGlsZCkgcG9zaXRpb24gPSAnbGFzdCc7XHJcblx0XHRpZiAoaXNNaWRkbGVDaGlsZCkgcG9zaXRpb24gPSAnbWlkZGxlJztcclxuXHJcblx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KGMsIHtcclxuXHRcdFx0Y29udGlndW91czogY29udGlndW91cyxcclxuXHRcdFx0cG9zaXRpb24sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbklubGluZUdyb3VwLnByb3BUeXBlcyA9IHtcclxuXHRhcGhyb2RpdGVTdHlsZXM6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRfZGVmaW5pdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdF9uYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0pLFxyXG5cdGJsb2NrOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdF0pLFxyXG5cdGNvbnRpZ3VvdXM6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5JbmxpbmVHcm91cC5kZWZhdWx0UHJvcHMgPSB7XHJcblx0Y29tcG9uZW50OiAnZGl2JyxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Z3JvdXA6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHRibG9jazoge1xyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZUdyb3VwO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcblxyXG5mdW5jdGlvbiBMYWJlbGxlZENvbnRyb2wgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0aW5saW5lLFxyXG5cdGxhYmVsLFxyXG5cdHRpdGxlLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRjb25zdCBsYWJlbENsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMud3JhcHBlcixcclxuXHRcdGlubGluZSAmJiBjbGFzc2VzLndyYXBwZXJfX2lubGluZSxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8bGFiZWwgdGl0bGU9e3RpdGxlfSBjbGFzc05hbWU9e2xhYmVsQ2xhc3NOYW1lfT5cclxuXHRcdFx0PGlucHV0IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250cm9sKX0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5sYWJlbCl9PntsYWJlbH08L3NwYW4+XHJcblx0XHQ8L2xhYmVsPlxyXG5cdCk7XHJcbn07XHJcblxyXG5MYWJlbGxlZENvbnRyb2wucHJvcFR5cGVzID0ge1xyXG5cdGlubGluZTogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUHJvcFR5cGVzLm9uZU9mKFsnY2hlY2tib3gnLCAncmFkaW8nXSkuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWxsZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxlcnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0d3JhcHBlcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGhlaWdodDogdGhlbWUuaW5wdXQuaGVpZ2h0LFxyXG5cdFx0bGluZUhlaWdodDogdGhlbWUuaW5wdXQubGluZUhlaWdodCxcclxuXHR9LFxyXG5cdHdyYXBwZXJfX2lubGluZToge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZScsXHJcblx0fSxcclxuXHJcblx0Ly8gY2hlY2tib3ggb3IgcmFkaW9cclxuXHRjb250cm9sOiB7XHJcblx0XHRtYXJnaW5SaWdodDogJzAuNWVtJyxcclxuXHR9LFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL1NwaW5uZXInO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTG9hZGluZ0J1dHRvbiAoeyBjaGlsZHJlbiwgbG9hZGluZywgLi4ucHJvcHMgfSkge1xyXG5cdC8vIGRldGVybWluZSB0aGUgY29ycmVjdCB2YXJpYW50IGZvciB0aGUgc3Bpbm5lcixcclxuXHQvLyBmaWxsIGlzIHRoZSBkZWZhdWx0IHZhcmlhbnQgb24gQnV0dG9uXHJcblx0Y29uc3QgdmFyaWFudCA9IHByb3BzLnZhcmlhbnQgfHwgJ2ZpbGwnO1xyXG5cclxuXHQvLyBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgY29sb3IgZm9yIHRoZSBzcGlubmVyLFxyXG5cdC8vIGNhbmNlbCBhbmQgZGVsZXRlIGFsaWFzIHRvIFwiZGFuZ2VyXCJcclxuXHRsZXQgY29sb3I7XHJcblx0aWYgKHByb3BzLmNvbG9yID09PSAnY2FuY2VsJyB8fCBwcm9wcy5jb2xvciA9PT0gJ2RlbGV0ZScpIGNvbG9yID0gJ2Rhbmdlcic7XHJcblxyXG5cdC8vIG1lcmdlIGFsbCB0aGUgdmFyaWFudC9jb2xvciB0b2dldGhlclxyXG5cdGNvbnN0IGZvcm1hdHRlZENvbG9yID0gdmFyaWFudCA9PT0gJ2ZpbGwnICYmIHByb3BzLmNvbG9yICE9PSAnZGVmYXVsdCdcclxuXHRcdD8gJ2ludmVydGVkJ1xyXG5cdFx0OiBjb2xvcjtcclxuXHJcblx0Ly8gcmVuZGVyIHRoZSBzcGlubmVyIGlmIHJlcXVpcmVkXHJcblx0Y29uc3Qgc3Bpbm5lciA9IGxvYWRpbmcgJiYgKFxyXG5cdFx0PFNwaW5uZXJcclxuXHRcdFx0c2l6ZT1cInNtYWxsXCJcclxuXHRcdFx0Y29sb3I9e2Zvcm1hdHRlZENvbG9yfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG5cclxuXHQvLyBzbGlkZSB0aGUgc3Bpbm5lciBpbiBhbmQgb3V0IG9mIHZpZXdcclxuXHRjb25zdCBzcGlubmVyU3R5bGVzID0ge1xyXG5cdFx0d2lkdGg6IGxvYWRpbmdcclxuXHRcdFx0PyAodGhlbWUuc3Bpbm5lci5zaXplLnNtYWxsICogNSArIHRoZW1lLnNwYWNpbmcuc21hbGwpXHJcblx0XHRcdDogMCxcclxuXHR9O1xyXG5cclxuXHQvLyByZW5kZXIgYWxsIHRoYXQgc2hpdFxyXG5cdHJldHVybiAoXHJcblx0XHQ8QnV0dG9uIHsuLi5wcm9wc30+XHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuc3Bpbm5lcil9IHN0eWxlPXtzcGlubmVyU3R5bGVzfT5cclxuXHRcdFx0XHR7c3Bpbm5lcn1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHQ8L0J1dHRvbj5cclxuXHQpO1xyXG59O1xyXG5cclxuTG9hZGluZ0J1dHRvbi5wcm9wVHlwZXMgPSB7XHJcblx0bG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcbkxvYWRpbmdCdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG5cdGxvYWRpbmc6IGZhbHNlLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRzcGlubmVyOiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHRleHRBbGlnbjogJ2xlZnQnLFxyXG5cdFx0dHJhbnNpdGlvbjogJ3dpZHRoIDIwMG1zIGVhc2Utb3V0JyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRpbmdCdXR0b247XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEJvZHkgKHtcclxuXHRjbGFzc05hbWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2XHJcblx0XHRcdGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuYm9keSwgY2xhc3NOYW1lKX1cclxuXHRcdFx0ey4uLnByb3BzfVxyXG5cdFx0Lz5cclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRib2R5OiB7XHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmJvZHkudmVydGljYWwsXHJcblx0XHRwYWRkaW5nTGVmdDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5Lmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuYm9keS5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5ib2R5LnZlcnRpY2FsLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQm9keTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgU2Nyb2xsTG9jayBmcm9tICcuLi9TY3JvbGxMb2NrJztcclxuaW1wb3J0IFBvcnRhbCBmcm9tICcuLi9Qb3J0YWwnO1xyXG5cclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbmNvbnN0IGNhblVzZURvbSA9ICEhKFxyXG5cdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXHJcblx0JiYgd2luZG93LmRvY3VtZW50XHJcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcclxuKTtcclxuXHJcbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlQmFja2Ryb3BDbGljayA9IHRoaXMuaGFuZGxlQmFja2Ryb3BDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVLZXlib2FyZElucHV0ID0gdGhpcy5oYW5kbGVLZXlib2FyZElucHV0LmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdGdldENoaWxkQ29udGV4dCAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRvbkNsb3NlOiB0aGlzLnByb3BzLm9uQ2xvc2UsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmICghY2FuVXNlRG9tKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyc1xyXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xyXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNZXRob2RzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHRoaXMucHJvcHMub25DbG9zZSgpO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0aGFuZGxlQmFja2Ryb3BDbGljayAoZSkge1xyXG5cdFx0aWYgKGUudGFyZ2V0ICE9PSB0aGlzLnJlZnMuY29udGFpbmVyKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5wcm9wcy5vbkNsb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBSZW5kZXJlcnNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0cmVuZGVyRGlhbG9nICgpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0YmFja2Ryb3BDbG9zZXNNb2RhbCxcclxuXHRcdFx0Y2hpbGRyZW4sXHJcblx0XHRcdGlzT3BlbixcclxuXHRcdFx0d2lkdGgsXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAoIWlzT3BlbikgcmV0dXJuIDxzcGFuIGtleT1cImNsb3NlZFwiIC8+O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXZcclxuXHRcdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRhaW5lcil9XHJcblx0XHRcdFx0a2V5PVwib3BlblwiXHJcblx0XHRcdFx0cmVmPVwiY29udGFpbmVyXCJcclxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrfVxyXG5cdFx0XHRcdG9uVG91Y2hFbmQ9eyEhYmFja2Ryb3BDbG9zZXNNb2RhbCAmJiB0aGlzLmhhbmRsZUJhY2tkcm9wQ2xpY2t9XHJcblx0XHRcdD5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZGlhbG9nKX0gc3R5bGU9e3sgd2lkdGggfX0gZGF0YS1zY3JlZW4taWQ9XCJtb2RhbC1kaWFsb2dcIj5cclxuXHRcdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8U2Nyb2xsTG9jayAvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UG9ydGFsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckRpYWxvZygpfVxyXG5cdFx0XHQ8L1BvcnRhbD5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuTW9kYWxEaWFsb2cucHJvcFR5cGVzID0ge1xyXG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxyXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcclxufTtcclxuTW9kYWxEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xyXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXHJcblx0d2lkdGg6IDc2OCxcclxufTtcclxuTW9kYWxEaWFsb2cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0Y29udGFpbmVyOiB7XHJcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubW9kYWwuYmFja2dyb3VuZCxcclxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0aGVpZ2h0OiAnMTAwJScsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0XHRsZWZ0OiAwLFxyXG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXHJcblx0XHR0b3A6IDAsXHJcblx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0ekluZGV4OiB0aGVtZS5tb2RhbC56SW5kZXgsXHJcblx0fSxcclxuXHRkaWFsb2c6IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmRpYWxvZy5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5kaWFsb2cudmVydGljYWwsXHJcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWxEaWFsb2c7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5mdW5jdGlvbiBNb2RhbEZvb3RlciAoe1xyXG5cdGFsaWduLFxyXG5cdGNsYXNzTmFtZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgey4uLnByb3BzfSBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmZvb3RlciwgY2xhc3Nlc1snYWxpZ25fXycgKyBhbGlnbl0sIGNsYXNzTmFtZSl9IC8+XHJcblx0KTtcclxufTtcclxuXHJcbk1vZGFsRm9vdGVyLnByb3BUeXBlcyA9IHtcclxuXHRhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXSksXHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxGb290ZXIuZGVmYXVsdFByb3BzID0ge1xyXG5cdGFsaWduOiAnbGVmdCcsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGZvb3Rlcjoge1xyXG5cdFx0Ym9yZGVyVG9wOiBgMnB4IHNvbGlkICR7dGhlbWUuY29sb3IuZ3JheTEwfWAsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci52ZXJ0aWNhbCxcclxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5tb2RhbC5wYWRkaW5nLmZvb3Rlci5ob3Jpem9udGFsLFxyXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUubW9kYWwucGFkZGluZy5mb290ZXIudmVydGljYWwsXHJcblx0fSxcclxuXHJcblx0Ly8gYWxpZ25tZW50XHJcblx0YWxpZ25fX2xlZnQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXHJcblx0fSxcclxuXHRhbGlnbl9fY2VudGVyOiB7XHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0fSxcclxuXHRhbGlnbl9fcmlnaHQ6IHtcclxuXHRcdGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG5cdH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsRm9vdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgR2x5cGhCdXR0b24gZnJvbSAnLi4vR2x5cGhCdXR0b24nO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gTW9kYWxIZWFkZXIgKHtcclxuXHRjaGlsZHJlbixcclxuXHRjbGFzc05hbWUsXHJcblx0c2hvd0Nsb3NlQnV0dG9uLFxyXG5cdHRleHQsXHJcblx0Li4ucHJvcHNcclxufSwge1xyXG5cdG9uQ2xvc2UsXHJcbn0pIHtcclxuXHQvLyBQcm9wZXJ0eSBWaW9sYXRpb25cclxuXHRpZiAoY2hpbGRyZW4gJiYgdGV4dCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignV2FybmluZzogTW9kYWxIZWFkZXIgY2Fubm90IHJlbmRlciBgY2hpbGRyZW5gIGFuZCBgdGV4dGAuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9yIHRoZSBvdGhlci4nKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5oZWFkZXIsIGNsYXNzTmFtZSl9PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZ3Jvdyl9PlxyXG5cdFx0XHRcdHt0ZXh0ID8gKFxyXG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMudGV4dCl9PlxyXG5cdFx0XHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0XHRcdDwvaDQ+XHJcblx0XHRcdFx0KSA6IGNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0eyEhb25DbG9zZSAmJiBzaG93Q2xvc2VCdXR0b24gJiYgKFxyXG5cdFx0XHRcdDxHbHlwaEJ1dHRvblxyXG5cdFx0XHRcdFx0YXBocm9kaXRlU3R5bGVzPXtjbGFzc2VzLmNsb3NlfVxyXG5cdFx0XHRcdFx0Y29sb3I9XCJjYW5jZWxcIlxyXG5cdFx0XHRcdFx0Z2x5cGg9XCJ4XCJcclxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XHJcblx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KX1cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5Nb2RhbEhlYWRlci5wcm9wVHlwZXMgPSB7XHJcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXHJcblx0dGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuTW9kYWxIZWFkZXIuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGhlYWRlcjoge1xyXG5cdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXHJcblx0XHRib3JkZXJCb3R0b206IGAycHggc29saWQgJHt0aGVtZS5jb2xvci5ncmF5MTB9YCxcclxuXHRcdGRpc3BsYXk6ICdmbGV4JyxcclxuXHRcdHBhZGRpbmdCb3R0b206IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLnZlcnRpY2FsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IHRoZW1lLm1vZGFsLnBhZGRpbmcuaGVhZGVyLmhvcml6b250YWwsXHJcblx0XHRwYWRkaW5nVG9wOiB0aGVtZS5tb2RhbC5wYWRkaW5nLmhlYWRlci52ZXJ0aWNhbCxcclxuXHR9LFxyXG5cclxuXHQvLyBmaWxsIHNwYWNlIHRvIHB1c2ggdGhlIGNsb3NlIGJ1dHRvbiByaWdodFxyXG5cdGdyb3c6IHtcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdH0sXHJcblxyXG5cdC8vIHRpdGxlIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRjb2xvcjogJ2luaGVyaXQnLFxyXG5cdFx0Zm9udFNpemU6IDE4LFxyXG5cdFx0Zm9udFdlaWdodDogNTAwLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdG1hcmdpbjogMCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEhlYWRlcjtcclxuIiwiaW1wb3J0IEJvZHkgZnJvbSAnLi9ib2R5JztcclxuaW1wb3J0IERpYWxvZyBmcm9tICcuL2RpYWxvZyc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJztcclxuXHJcbmV4cG9ydCB7XHJcblx0Qm9keSxcclxuXHREaWFsb2csXHJcblx0Rm9vdGVyLFxyXG5cdEhlYWRlcixcclxufTtcclxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cmVuZGVyQ291bnQgKCkge1xyXG5cdFx0bGV0IGNvdW50ID0gJyc7XHJcblx0XHRjb25zdCB7IGN1cnJlbnRQYWdlLCBwYWdlU2l6ZSwgcGx1cmFsLCBzaW5ndWxhciwgdG90YWwgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAoIXRvdGFsKSB7XHJcblx0XHRcdGNvdW50ID0gJ05vICcgKyAocGx1cmFsIHx8ICdyZWNvcmRzJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRvdGFsID4gcGFnZVNpemUpIHtcclxuXHRcdFx0bGV0IHN0YXJ0ID0gKHBhZ2VTaXplICogKGN1cnJlbnRQYWdlIC0gMSkpICsgMTtcclxuXHRcdFx0bGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgcGFnZVNpemUgLSAxLCB0b3RhbCk7XHJcblx0XHRcdGNvdW50ID0gYFNob3dpbmcgJHtzdGFydH0gdG8gJHtlbmR9IG9mICR7dG90YWx9YDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvdW50ID0gJ1Nob3dpbmcgJyArIHRvdGFsO1xyXG5cdFx0XHRpZiAodG90YWwgPiAxICYmIHBsdXJhbCkge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHBsdXJhbDtcclxuXHRcdFx0fSBlbHNlIGlmICh0b3RhbCA9PT0gMSAmJiBzaW5ndWxhcikge1xyXG5cdFx0XHRcdGNvdW50ICs9ICcgJyArIHNpbmd1bGFyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY291bnQpfSBkYXRhLWUyZS1wYWdpbmF0aW9uLWNvdW50Pntjb3VudH08L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlclBhZ2VzICgpIHtcclxuXHRcdGNvbnN0IHsgY3VycmVudFBhZ2UsIGxpbWl0LCBvblBhZ2VTZWxlY3QsIHBhZ2VTaXplLCB0b3RhbCB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAodG90YWwgPD0gcGFnZVNpemUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGxldCBwYWdlcyA9IFtdO1xyXG5cdFx0bGV0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XHJcblx0XHRsZXQgbWluUGFnZSA9IDE7XHJcblx0XHRsZXQgbWF4UGFnZSA9IHRvdGFsUGFnZXM7XHJcblxyXG5cdFx0aWYgKGxpbWl0ICYmIChsaW1pdCA8IHRvdGFsUGFnZXMpKSB7XHJcblx0XHRcdGxldCByaWdodExpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCAvIDIpO1xyXG5cdFx0XHRsZXQgbGVmdExpbWl0ID0gcmlnaHRMaW1pdCArIChsaW1pdCAlIDIpIC0gMTtcclxuXHRcdFx0bWluUGFnZSA9IGN1cnJlbnRQYWdlIC0gbGVmdExpbWl0O1xyXG5cdFx0XHRtYXhQYWdlID0gY3VycmVudFBhZ2UgKyByaWdodExpbWl0O1xyXG5cclxuXHRcdFx0aWYgKG1pblBhZ2UgPCAxKSB7XHJcblx0XHRcdFx0bWF4UGFnZSA9IGxpbWl0O1xyXG5cdFx0XHRcdG1pblBhZ2UgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtYXhQYWdlID4gdG90YWxQYWdlcykge1xyXG5cdFx0XHRcdG1pblBhZ2UgPSB0b3RhbFBhZ2VzIC0gbGltaXQgKyAxO1xyXG5cdFx0XHRcdG1heFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAobWluUGFnZSA+IDEpIHtcclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9XCJwYWdlX3N0YXJ0XCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KDEpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHBhZ2UgPSBtaW5QYWdlOyBwYWdlIDw9IG1heFBhZ2U7IHBhZ2UrKykge1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWQgPSAocGFnZSA9PT0gY3VycmVudFBhZ2UpO1xyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0cGFnZXMucHVzaCg8UGFnZSBrZXk9eydwYWdlXycgKyBwYWdlfSBzZWxlY3RlZD17c2VsZWN0ZWR9IG9uQ2xpY2s9eygpID0+IG9uUGFnZVNlbGVjdChwYWdlKX0+e3BhZ2V9PC9QYWdlPik7XHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgKi9cclxuXHRcdH1cclxuXHRcdGlmIChtYXhQYWdlIDwgdG90YWxQYWdlcykge1xyXG5cdFx0XHRwYWdlcy5wdXNoKDxQYWdlIGtleT1cInBhZ2VfZW5kXCIgb25DbGljaz17KCkgPT4gb25QYWdlU2VsZWN0KHRvdGFsUGFnZXMpfT4uLi48L1BhZ2U+KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5saXN0KX0+XHJcblx0XHRcdFx0e3BhZ2VzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjc3MoY2xhc3Nlcy5jb250YWluZXIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDb3VudCgpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclBhZ2VzKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBjbGFzc2VzID0ge1xyXG5cdGNvbnRhaW5lcjoge1xyXG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcclxuXHRcdGxpbmVIZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5saW5lSGVpZ2h0LFxyXG5cdFx0bWFyZ2luQm90dG9tOiAnMmVtJyxcclxuXHR9LFxyXG5cdGNvdW50OiB7XHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdG1hcmdpblJpZ2h0OiAnMWVtJyxcclxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdH0sXHJcblx0bGlzdDoge1xyXG5cdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHR9LFxyXG59O1xyXG5cclxuUGFnaW5hdGlvbi5wcm9wVHlwZXMgPSB7XHJcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGN1cnJlbnRQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0b25QYWdlU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG5cdHBsdXJhbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzaW5ndWxhcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHR0b3RhbDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdpbmF0aW9uO1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5cclxuZnVuY3Rpb24gUGFnZSAoe1xyXG5cdGRpc2FibGVkLFxyXG5cdHNlbGVjdGVkLFxyXG5cdC4uLnByb3BzXHJcbn0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjc3MoXHJcblx0XHRjbGFzc2VzLnBhZ2UsXHJcblx0XHQhIWRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsXHJcblx0XHQhIXNlbGVjdGVkICYmIGNsYXNzZXMuc2VsZWN0ZWRcclxuXHQpO1xyXG5cdHJldHVybiAoXHJcblx0XHQ8YnV0dG9uIHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxuUGFnZS5wcm9wVHlwZXMgPSB7XHJcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0c2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImFzLW5lZWRlZFwiXSAqL1xyXG5cclxuY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5zZWxlY3RlZC5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uc2VsZWN0ZWQuY29sb3IsXHJcblx0Y3Vyc29yOiAnZGVmYXVsdCcsXHJcblx0ekluZGV4OiAyLFxyXG59O1xyXG5jb25zdCBwc2V1ZG9TdHlsZSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuYmFja2dyb3VuZCxcclxuXHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5ob3Zlci5ib3JkZXIsXHJcblx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uaG92ZXIuY29sb3IsXHJcblx0b3V0bGluZTogJ25vbmUnLFxyXG59O1xyXG5cclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRwYWdlOiB7XHJcblx0XHRhcHBlYXJhbmNlOiAnbm9uZScsXHJcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXHJcblx0XHRib3JkZXI6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRcdGNvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmNvbG9yLFxyXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGZsb2F0OiAnbGVmdCcsIC8vIENvbGxhcHNlIHdoaXRlLXNwYWNlXHJcblx0XHRtYXJnaW5SaWdodDogJzAuMjVlbScsXHJcblx0XHRwYWRkaW5nOiAnMCAuN2VtJyxcclxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cdFx0dGV4dERlY29yYXRpb246ICdub25lJyxcclxuXHJcblx0XHQvLyBoYW5kbGUgaG92ZXIgYW5kIGZvY3VzXHJcblx0XHQnOmhvdmVyJzogcHNldWRvU3R5bGUsXHJcblx0XHQnOmZvY3VzJzogcHNldWRvU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gc2VsZWN0ZWQgcGFnZVxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHQuLi5zZWxlY3RlZFN0eWxlLFxyXG5cclxuXHRcdCc6aG92ZXInOiBzZWxlY3RlZFN0eWxlLFxyXG5cdFx0Jzpmb2N1cyc6IHNlbGVjdGVkU3R5bGUsXHJcblx0fSxcclxuXHJcblx0Ly8gZGlzYWJsZWQgcGFnZVxyXG5cclxuXHRkaXNhYmxlZDoge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdpbmF0aW9uLmRpc2FibGVkLmJhY2tncm91bmQsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUucGFnaW5hdGlvbi5kaXNhYmxlZC5iYWNrZ3JvdW5kLFxyXG5cdFx0Y29sb3I6IHRoZW1lLnBhZ2luYXRpb24uZGlzYWJsZWQuY29sb3IsXHJcblx0XHRjdXJzb3I6ICdkZWZhdWx0JyxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcclxuIiwiaW1wb3J0IHsgQ2hpbGRyZW4sIENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gUGFzcyB0aGUgTGlnaHRib3ggY29udGV4dCB0aHJvdWdoIHRvIHRoZSBQb3J0YWwncyBkZXNjZW5kZW50c1xyXG4vLyBTdGFja092ZXJmbG93IGRpc2N1c3Npb24gaHR0cDovL2dvby5nbC9vY2xySjlcclxuXHJcbmNsYXNzIFBhc3NDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRnZXRDaGlsZENvbnRleHQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29udGV4dDtcclxuXHR9XHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xyXG5cdH1cclxufTtcclxuXHJcblBhc3NDb250ZXh0LnByb3BUeXBlcyA9IHtcclxuXHRjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbn07XHJcblBhc3NDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFzc0NvbnRleHQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBhc3NDb250ZXh0IGZyb20gJy4uL1Bhc3NDb250ZXh0JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBudWxsO1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xyXG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XHJcblx0XHQvLyBBbmltYXRlIGZhZGUgb24gbW91bnQvdW5tb3VudFxyXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAyMDA7XHJcblx0XHRjb25zdCBzdHlsZXMgPSBgXHJcblx0XHRcdFx0LmZhZGUtZW50ZXIgeyBvcGFjaXR5OiAwLjAxOyB9XHJcblx0XHRcdFx0LmZhZGUtZW50ZXIuZmFkZS1lbnRlci1hY3RpdmUgeyBvcGFjaXR5OiAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZSB7IG9wYWNpdHk6IDE7IH1cclxuXHRcdFx0XHQuZmFkZS1sZWF2ZS5mYWRlLWxlYXZlLWFjdGl2ZSB7IG9wYWNpdHk6IDAuMDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxyXG5cdFx0YDtcclxuXHRcdHJlbmRlcihcclxuXHRcdFx0PFBhc3NDb250ZXh0IGNvbnRleHQ9e3RoaXMuY29udGV4dH0+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxzdHlsZT57c3R5bGVzfTwvc3R5bGU+XHJcblx0XHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0XHRjb21wb25lbnQ9XCJkaXZcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtkdXJhdGlvbn1cclxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17ZHVyYXRpb259XHJcblx0XHRcdFx0XHRcdHsuLi50aGlzLnByb3BzfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9QYXNzQ29udGV4dD4sXHJcblx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxyXG5cdFx0KTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5Qb3J0YWwuY29udGV4dFR5cGVzID0ge1xyXG5cdG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG4vLyBVc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBhbmQgc3RhdGUgaW5zdGVhZCBvZiBDU1MgbWVkaWEgYnJlYWtwb2ludHNcclxuLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHJlbmRlciBudWxsIHJhdGhlciB0aGFuIGFuIGVtcHR5IHNwYW4uIEFsbG93aW5nIGZvclxyXG4vLyBDU1MgcHNldWRvIGNsYXNzZXMgbGlrZSA6b25seS1jaGlsZCB0byBiZWhhdmUgYXMgZXhwZWN0ZWQuXHJcblxyXG4vLyBSZXR1cm4gdHJ1ZSBpZiB3aW5kb3cgKyBkb2N1bWVudFxyXG5jb25zdCBjYW5Vc2VET00gPSAhIShcclxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG5cdCYmIHdpbmRvdy5kb2N1bWVudFxyXG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XHJcbik7XHJcblxyXG5jbGFzcyBSZXNwb25zaXZlVGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuc3RhdGUgPSB7XHJcblx0XHRcdHdpbmRvd1dpZHRoOiBjYW5Vc2VET00gPyB3aW5kb3cuaW5uZXJXaWR0aCA6IDAsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRpZiAoY2FuVXNlRE9NKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcblx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdGlmIChjYW5Vc2VET00pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuXHRcdH1cclxuXHR9XHJcblx0aGFuZGxlUmVzaXplICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHR3aW5kb3dXaWR0aDogY2FuVXNlRE9NID8gd2luZG93LmlubmVyV2lkdGggOiAwLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdGNvbXBvbmVudDogQ29tcG9uZW50LFxyXG5cdFx0XHRoaWRkZW5MRyxcclxuXHRcdFx0aGlkZGVuTUQsXHJcblx0XHRcdGhpZGRlblNNLFxyXG5cdFx0XHRoaWRkZW5YUyxcclxuXHRcdFx0dmlzaWJsZUxHLFxyXG5cdFx0XHR2aXNpYmxlTUQsXHJcblx0XHRcdHZpc2libGVTTSxcclxuXHRcdFx0dmlzaWJsZVhTLFxyXG5cdFx0XHQuLi5wcm9wc1xyXG5cdFx0fSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IHdpbmRvd1dpZHRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cclxuXHRcdC8vIHNldCB0ZXh0IHZhbHVlIGZyb20gYnJlYWtwb2ludDsgYXR0ZW1wdCBYUyAtLT4gTEdcclxuXHRcdGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSkge1xyXG5cdFx0XHR0ZXh0ID0gdmlzaWJsZVhTIHx8IGhpZGRlblNNIHx8IGhpZGRlbk1EIHx8IGhpZGRlbkxHO1xyXG5cdFx0fSBlbHNlIGlmICh3aW5kb3dXaWR0aCA8IHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLnRhYmxldFBvcnRyYWl0KSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCB2aXNpYmxlU00gfHwgaGlkZGVuTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2UgaWYgKHdpbmRvd1dpZHRoIDwgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlKSB7XHJcblx0XHRcdHRleHQgPSBoaWRkZW5YUyB8fCBoaWRkZW5TTSB8fCB2aXNpYmxlTUQgfHwgaGlkZGVuTEc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ID0gaGlkZGVuWFMgfHwgaGlkZGVuU00gfHwgaGlkZGVuTUQgfHwgdmlzaWJsZUxHO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0ZXh0ID8gPENvbXBvbmVudCB7Li4ucHJvcHN9Pnt0ZXh0fTwvQ29tcG9uZW50PiA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxuUmVzcG9uc2l2ZVRleHQucHJvcFR5cGVzID0ge1xyXG5cdGhpZGRlbkxHOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlbk1EOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdGhpZGRlblhTOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVMRzogUHJvcFR5cGVzLnN0cmluZyxcclxuXHR2aXNpYmxlTUQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0dmlzaWJsZVNNOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHZpc2libGVYUzogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuUmVzcG9uc2l2ZVRleHQuZGVmYXVsdFByb3BzID0ge1xyXG5cdGNvbXBvbmVudDogJ3NwYW4nLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zaXZlVGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuXHJcbmZ1bmN0aW9uIFNjcmVlblJlYWRlck9ubHkgKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XHJcblx0cHJvcHMuY2xhc3NOYW1lID0gY3NzKGNsYXNzZXMuc3JPbmx5LCBjbGFzc05hbWUpO1xyXG5cclxuXHRyZXR1cm4gPHNwYW4gey4uLnByb3BzfSAvPjtcclxufTtcclxuXHJcbmNvbnN0IGNsYXNzZXMgPSB7XHJcblx0c3JPbmx5OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUmVhZGVyT25seTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsTG9jayBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubG9ja0NvdW50ID0gMDtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubG9ja0NvdW50Kys7XHJcblx0XHRpZiAodGhpcy5sb2NrQ291bnQgPiAxKSByZXR1cm47XHJcblxyXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XHJcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5sb2NrQ291bnQgPT09IDApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmxvY2tDb3VudC0tO1xyXG5cdFx0aWYgKHRoaXMubG9ja0NvdW50ID4gMCkgcmV0dXJuOyAvLyBTdGlsbCBsb2NrZWRcclxuXHJcblx0XHQvL1x0RklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHRcdFx0dGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICcnO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi8uLi90aGVtZSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRkZWZhdWx0OiB0aGVtZS5jb2xvci5ncmF5ODAsXHJcblx0ZXJyb3I6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRpbmZvOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdHByaW1hcnk6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5cclxuZnVuY3Rpb24gU2VnbWVudGVkQ29udHJvbCAoe1xyXG5cdGNsYXNzTmFtZSxcclxuXHRjb2xvcixcclxuXHRjcm9wVGV4dCxcclxuXHRlcXVhbFdpZHRoU2VnbWVudHMsXHJcblx0aW5saW5lLFxyXG5cdG9uQ2hhbmdlLFxyXG5cdG9wdGlvbnMsXHJcblx0dmFsdWUsXHJcblx0Li4ucHJvcHNcclxufSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuY29udHJvbCxcclxuXHRcdGlubGluZSA/IGNsYXNzZXMuY29udHJvbF9faW5saW5lIDogbnVsbCxcclxuXHRcdGNsYXNzTmFtZVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdHtvcHRpb25zLm1hcCgob3B0KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYnV0dG9uQ2xhc3NOYW1lID0gY3NzKFxyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5idXR0b24sXHJcblx0XHRcdFx0XHRvcHQuZGlzYWJsZWQgPyBjbGFzc2VzLmJ1dHRvbl9fZGlzYWJsZWQgOiBudWxsLFxyXG5cdFx0XHRcdFx0b3B0LnZhbHVlID09PSB2YWx1ZSA/IGNsYXNzZXNbJ2J1dHRvbl9fJyArIGNvbG9yXSA6IG51bGwsXHJcblx0XHRcdFx0XHRjcm9wVGV4dCA/IGNsYXNzZXMuYnV0dG9uX19jcm9wVGV4dCA6IG51bGwsXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHMgPyBjbGFzc2VzLmJ1dHRvbl9fZXF1YWxXaWR0aCA6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2J1dHRvbkNsYXNzTmFtZX1cclxuXHRcdFx0XHRcdFx0a2V5PXtvcHQudmFsdWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eyFvcHQuZGlzYWJsZWQgJiYgKCgpID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRcdFx0dGl0bGU9e2Nyb3BUZXh0ID8gb3B0LmxhYmVsIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9e29wdC5kaXNhYmxlZCA/ICctMScgOiAnJ31cclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHR7b3B0LmxhYmVsfVxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSl9XHJcblx0XHQ8L2Rpdj4pO1xyXG59O1xyXG5cclxuY29uc3QgdmFsdWVQcm9wU2hhcGUgPSBbXHJcblx0UHJvcFR5cGVzLmJvb2wsXHJcblx0UHJvcFR5cGVzLm51bWJlcixcclxuXHRQcm9wVHlwZXMuc3RyaW5nLFxyXG5dO1xyXG5cclxuU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhjb2xvcnMpKSxcclxuXHRjcm9wVGV4dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZW4gYGlubGluZSAmJiBlcXVhbFdpZHRoU2VnbWVudHNgIGNyb3BzIHRvIHRoZSBuZXh0IGxhcmdlc3Qgb3B0aW9uIGxlbmd0aFxyXG5cdGVxdWFsV2lkdGhTZWdtZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIG9ubHkgcmVsZXZhbnQgd2hlbiBgaW5saW5lID09PSBmYWxzZWBcclxuXHRpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG5cdFx0UHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG5cdFx0fSlcclxuXHQpLmlzUmVxdWlyZWQsXHJcblx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUodmFsdWVQcm9wU2hhcGUpLFxyXG59O1xyXG5TZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50ZWRDb250cm9sO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2VnbWVudGVkIENvbnRyb2xcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiYXMtbmVlZGVkXCJdICovXHJcblxyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uLy4uL3RoZW1lJztcclxuXHJcbi8vIFByZXBhcmUgdmFyaWFudHNcclxuY29uc3QgY29sb3JWYXJpYW50cyA9IHt9O1xyXG5PYmplY3Qua2V5cyhjb2xvcnMpLmZvckVhY2goY29sb3IgPT4ge1xyXG5cdGNvbnN0IHBzZXVkb1N0eWxlcyA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzW2NvbG9yXSxcclxuXHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdH07XHJcblx0Y29sb3JWYXJpYW50c1snYnV0dG9uX18nICsgY29sb3JdID0ge1xyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNbY29sb3JdLFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblxyXG5cdFx0Jzpob3Zlcic6IHBzZXVkb1N0eWxlcyxcclxuXHRcdCc6Zm9jdXMnOiBwc2V1ZG9TdHlsZXMsXHJcblx0XHQnOmFjdGl2ZSc6IHBzZXVkb1N0eWxlcyxcclxuXHR9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbnRyb2w6IHtcclxuXHRcdGJvcmRlcldpZHRoOiAxLFxyXG5cdFx0Ym9yZGVyU3R5bGU6ICdzb2xpZCcsXHJcblx0XHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHQsXHJcblx0XHRib3JkZXJSYWRpdXM6ICcwLjRlbScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRmb250U2l6ZTogdGhlbWUuZm9udC5zaXplLnNtYWxsLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDEsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDEsXHJcblx0fSxcclxuXHRjb250cm9sX19pbmxpbmU6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXHJcblx0fSxcclxuXHJcblx0Ly8gYnV0dG9uc1xyXG5cdGJ1dHRvbjoge1xyXG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxyXG5cdFx0Ym9yZGVyOiAwLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOiAnMC4yNWVtJyxcclxuXHRcdGZsZXhHcm93OiAxLFxyXG5cdFx0bWFyZ2luOiAnMnB4IDFweCcsXHJcblx0XHRwYWRkaW5nOiAnMC4zZW0gMC45ZW0nLFxyXG5cdFx0b3V0bGluZTogMCxcclxuXHJcblx0XHQnOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMDUpJyB9LFxyXG5cdFx0Jzpmb2N1cyc6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjA1KScgfSxcclxuXHRcdCc6YWN0aXZlJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMSknIH0sXHJcblx0fSxcclxuXHRidXR0b25fX2VxdWFsV2lkdGg6IHtcclxuXHRcdGZsZXg6ICcxIDEgMCcsXHJcblx0fSxcclxuXHRidXR0b25fX2Nyb3BUZXh0OiB7XHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXHJcblx0XHR0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuXHR9LFxyXG5cdGJ1dHRvbl9fZGlzYWJsZWQ6IHtcclxuXHRcdG9wYWNpdHk6IDAuNixcclxuXHRcdHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuXHR9LFxyXG5cclxuXHQvLyBjb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFsnZGFuZ2VyJywgJ2RlZmF1bHQnLCAnaW52ZXJ0ZWQnLCAncHJpbWFyeScsICdzdWNjZXNzJywgJ3dhcm5pbmcnXTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcclxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgU2NyZWVuUmVhZGVyT25seSBmcm9tICcuLi9TY3JlZW5SZWFkZXJPbmx5JztcclxuaW1wb3J0IGNvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCBzaXplcyBmcm9tICcuL3NpemVzJztcclxuXHJcbmZ1bmN0aW9uIFNwaW5uZXIgKHsgY2xhc3NOYW1lLCBzaXplLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNsYXNzZXNbc2l6ZV0sXHJcblx0XHRjbGFzc05hbWVcclxuXHQpO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiB7Li4ucHJvcHN9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX2ZpcnN0KX1gfSAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2Ake2NzcyhjbGFzc2VzLmRvdCwgY2xhc3Nlc1snc2l6ZV9fJyArIHNpemVdLCBjbGFzc2VzWydjb2xvcl9fJyArIGNvbG9yXSwgY2xhc3Nlcy5kb3RfX3NlY29uZCl9YH0gLz5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgJHtjc3MoY2xhc3Nlcy5kb3QsIGNsYXNzZXNbJ3NpemVfXycgKyBzaXplXSwgY2xhc3Nlc1snY29sb3JfXycgKyBjb2xvcl0sIGNsYXNzZXMuZG90X190aGlyZCl9YH0gLz5cclxuXHRcdFx0PFNjcmVlblJlYWRlck9ubHk+TG9hZGluZy4uLjwvU2NyZWVuUmVhZGVyT25seT5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5TcGlubmVyLnByb3BUeXBlcyA9IHtcclxuXHRjb2xvcjogUHJvcFR5cGVzLm9uZU9mKGNvbG9ycyksXHJcblx0c2l6ZTogUHJvcFR5cGVzLm9uZU9mKHNpemVzKSxcclxufTtcclxuU3Bpbm5lci5kZWZhdWx0UHJvcHMgPSB7XHJcblx0c2l6ZTogJ21lZGl1bScsXHJcblx0Y29sb3I6ICdkZWZhdWx0JyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZSddO1xyXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3Bpbm5lclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vLi4vdGhlbWUnO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0IHNpemVzIGZyb20gJy4vc2l6ZXMnO1xyXG5cclxuLy8gUHJlcGFyZSB2YXJpYW50c1xyXG5jb25zdCBjb2xvclZhcmlhbnRzID0ge307XHJcbmNvbG9ycy5mb3JFYWNoKGNvbG9yID0+IHtcclxuXHRjb2xvclZhcmlhbnRzW2Bjb2xvcl9fJHtjb2xvcn1gXSA9IHtcclxuXHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3Bpbm5lci5jb2xvcltjb2xvcl0sXHJcblx0fTtcclxufSk7XHJcblxyXG4vLyBQcmVwYXJlIHNpemVzXHJcbmNvbnN0IHNpemVWYXJpYW50cyA9IHt9O1xyXG5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xyXG5cdHNpemVWYXJpYW50c1tgc2l6ZV9fJHtzaXplfWBdID0ge1xyXG5cdFx0Zm9udFNpemU6IHRoZW1lLnNwaW5uZXIuc2l6ZVtzaXplXSxcclxuXHR9O1xyXG59KTtcclxuXHJcbi8vIERlY2xhcmUgYW5pbWF0aW9uIGtleWZyYW1lc1xyXG5cclxuY29uc3Qga2V5ZnJhbWVzID0gY29tcG9zZS5rZXlmcmFtZXMoJ3B1bHNlJywge1xyXG5cdCcwJSwgODAlLCAxMDAlJzogeyBvcGFjaXR5OiAwIH0sXHJcblx0JzQwJSc6IHsgb3BhY2l0eTogMSB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGJhc2U6IHtcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0bGluZUhlaWdodDogMSxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdHdpZHRoOiAnNWVtJyxcclxuXHR9LFxyXG5cdHNtYWxsOlx0eyBmb250U2l6ZTogNCB9LFxyXG5cdG1lZGl1bTpcdHsgZm9udFNpemU6IDggfSxcclxuXHRsYXJnZTpcdHsgZm9udFNpemU6IDE2IH0sXHJcblxyXG5cdC8vIHRleHRcclxuXHR0ZXh0OiB7XHJcblx0XHRib3JkZXI6IDAsXHJcblx0XHRjbGlwOiAncmVjdCgwLDAsMCwwKScsXHJcblx0XHRoZWlnaHQ6IDEsXHJcblx0XHRtYXJnaW46IC0xLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdFx0cGFkZGluZzogMCxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHJcblx0Ly8gZG90c1xyXG5cdGRvdDoge1xyXG5cdFx0YW5pbWF0aW9uTmFtZToga2V5ZnJhbWVzLFxyXG5cdFx0YW5pbWF0aW9uRHVyYXRpb246ICcxcycsXHJcblx0XHRhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcclxuXHRcdGJvcmRlclJhZGl1czogJzFlbScsXHJcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdGhlaWdodDogJzFlbScsXHJcblx0XHR2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuXHRcdHdpZHRoOiAnMWVtJyxcclxuXHR9LFxyXG5cdGRvdF9fc2Vjb25kOiB7XHJcblx0XHRhbmltYXRpb25EZWxheTogJzE2MG1zJyxcclxuXHRcdG1hcmdpbkxlZnQ6ICcxZW0nLFxyXG5cdH0sXHJcblx0ZG90X190aGlyZDoge1xyXG5cdFx0YW5pbWF0aW9uRGVsYXk6ICczMjBtcycsXHJcblx0XHRtYXJnaW5MZWZ0OiAnMWVtJyxcclxuXHR9LFxyXG5cclxuXHQvLyBDb2xvcnNcclxuXHQuLi5jb2xvclZhcmlhbnRzLFxyXG5cclxuXHQvLyBTaXplc1xyXG5cdC4uLnNpemVWYXJpYW50cyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QWxlcnQ6IHJlcXVpcmUoJy4vQWxlcnQnKSxcclxuXHRCbGFua1N0YXRlOiByZXF1aXJlKCcuL0JsYW5rU3RhdGUnKSxcclxuXHRCdXR0b246IHJlcXVpcmUoJy4vQnV0dG9uJyksXHJcblx0Q2VudGVyOiByZXF1aXJlKCcuL0NlbnRlcicpLFxyXG5cdENoaXA6IHJlcXVpcmUoJy4vQ2hpcCcpLFxyXG5cdENvbnRhaW5lcjogcmVxdWlyZSgnLi9Db250YWluZXInKSxcclxuXHREcm9wZG93bkJ1dHRvbjogcmVxdWlyZSgnLi9Ecm9wZG93bkJ1dHRvbicpLFxyXG5cdEZvcm06IHJlcXVpcmUoJy4vRm9ybScpLFxyXG5cdEZvcm1GaWVsZDogcmVxdWlyZSgnLi9Gb3JtRmllbGQnKSxcclxuXHRGb3JtSW5wdXQ6IHJlcXVpcmUoJy4vRm9ybUlucHV0JyksXHJcblx0Rm9ybUxhYmVsOiByZXF1aXJlKCcuL0Zvcm1MYWJlbCcpLFxyXG5cdEZvcm1Ob3RlOiByZXF1aXJlKCcuL0Zvcm1Ob3RlJyksXHJcblx0Rm9ybVNlbGVjdDogcmVxdWlyZSgnLi9Gb3JtU2VsZWN0JyksXHJcblx0R2x5cGg6IHJlcXVpcmUoJy4vR2x5cGgnKSxcclxuXHRHbHlwaEJ1dHRvbjogcmVxdWlyZSgnLi9HbHlwaEJ1dHRvbicpLFxyXG5cdEdseXBoRmllbGQ6IHJlcXVpcmUoJy4vR2x5cGhGaWVsZCcpLFxyXG5cdEdyaWQ6IHJlcXVpcmUoJy4vR3JpZCcpLFxyXG5cdElubGluZUdyb3VwOiByZXF1aXJlKCcuL0lubGluZUdyb3VwJyksXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uOiByZXF1aXJlKCcuL0lubGluZUdyb3VwU2VjdGlvbicpLFxyXG5cdExhYmVsbGVkQ29udHJvbDogcmVxdWlyZSgnLi9MYWJlbGxlZENvbnRyb2wnKSxcclxuXHRMb2FkaW5nQnV0dG9uOiByZXF1aXJlKCcuL0xvYWRpbmdCdXR0b24nKSxcclxuXHRNb2RhbDogcmVxdWlyZSgnLi9Nb2RhbCcpLFxyXG5cdFBhZ2luYXRpb246IHJlcXVpcmUoJy4vUGFnaW5hdGlvbicpLFxyXG5cdFJlc3BvbnNpdmVUZXh0OiByZXF1aXJlKCcuL1Jlc3BvbnNpdmVUZXh0JyksXHJcblx0U2NyZWVuUmVhZGVyT25seTogcmVxdWlyZSgnLi9TY3JlZW5SZWFkZXJPbmx5JyksXHJcblx0U2VnbWVudGVkQ29udHJvbDogcmVxdWlyZSgnLi9TZWdtZW50ZWRDb250cm9sJyksXHJcblx0U3Bpbm5lcjogcmVxdWlyZSgnLi9TcGlubmVyJyksXHJcbn07XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCB7IHVwY2FzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogVGhpcyByZW5kZXJzIGFsZXJ0cyBmb3IgQVBJIHN1Y2Nlc3MgYW5kIGVycm9yIHJlc3BvbnNlcy5cclxuICogICBFcnJvciBmb3JtYXQ6IHtcclxuICogICAgIGVycm9yOiAndmFsaWRhdGlvbiBlcnJvcnMnIC8vIFRoZSB1bmlxdWUgZXJyb3IgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWw6IHsgLi4uIH0gLy8gT3B0aW9uYWwgZGV0YWlscyBzcGVjaWZpYyB0byB0aGF0IGVycm9yIHR5cGVcclxuICogICB9XHJcbiAqICAgU3VjY2VzcyBmb3JtYXQ6IHtcclxuICogICAgIHN1Y2Nlc3M6ICdpdGVtIHVwZGF0ZWQnLCAvLyBUaGUgdW5pcXVlIHN1Y2Nlc3MgdHlwZSBpZGVudGlmaWVyXHJcbiAqICAgICBkZXRhaWxzOiB7IC4uLiB9IC8vIE9wdGlvbmFsIGRldGFpbHMgc3BlY2lmaWMgdG8gdGhhdCBzdWNjZXNzIHR5cGVcclxuICogICB9XHJcbiAqICAgRXZlbnR1YWxseSBzdWNjZXNzIGFuZCBlcnJvciByZXNwb25zZXMgc2hvdWxkIGJlIGhhbmRsZWQgaW5kaXZpZHVhbGx5XHJcbiAqICAgYmFzZWQgb24gdGhlaXIgdHlwZS4gRm9yIGV4YW1wbGU6IHZhbGlkYXRpb24gZXJyb3JzIHNob3VsZCBiZSBkaXNwbGF5ZWQgbmV4dFxyXG4gKiAgIHRvIGVhY2ggaW52YWxpZCBmaWVsZCBhbmQgc2lnbmluIGVycm9ycyBzaG91bGQgcHJvbXQgdGhlIHVzZXIgdG8gc2lnbiBpbi5cclxuICovXHJcbnZhciBBbGVydE1lc3NhZ2VzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQWxlcnRNZXNzYWdlcycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRhbGVydHM6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGVycm9yOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0XHRzdWNjZXNzOiBSZWFjdC5Qcm9wVHlwZXMuT2JqZWN0LFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxlcnRzOiB7fSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRyZW5kZXJWYWxpZGF0aW9uRXJyb3JzICgpIHtcclxuXHRcdGxldCBlcnJvcnMgPSB0aGlzLnByb3BzLmFsZXJ0cy5lcnJvci5kZXRhaWw7XHJcblx0XHRpZiAoZXJyb3JzLm5hbWUgPT09ICdWYWxpZGF0aW9uRXJyb3InKSB7XHJcblx0XHRcdGVycm9ycyA9IGVycm9ycy5lcnJvcnM7XHJcblx0XHR9XHJcblx0XHRsZXQgZXJyb3JDb3VudCA9IE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoO1xyXG5cdFx0bGV0IGFsZXJ0Q29udGVudDtcclxuXHRcdGxldCBtZXNzYWdlcyA9IE9iamVjdC5rZXlzKGVycm9ycykubWFwKChwYXRoKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8bGkga2V5PXtwYXRofT5cclxuXHRcdFx0XHRcdFx0e3VwY2FzZShlcnJvcnNbcGF0aF0uZXJyb3IgfHwgZXJyb3JzW3BhdGhdLm1lc3NhZ2UpfVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IGtleT17cGF0aH0+XHJcblx0XHRcdFx0XHRcdHt1cGNhc2UoZXJyb3JzW3BhdGhdLmVycm9yIHx8IGVycm9yc1twYXRoXS5tZXNzYWdlKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChlcnJvckNvdW50ID4gMSkge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoND5UaGVyZSB3ZXJlIHtlcnJvckNvdW50fSBlcnJvcnMgY3JlYXRpbmcgdGhlIG5ldyBpdGVtOjwvaDQ+XHJcblx0XHRcdFx0XHQ8dWw+e21lc3NhZ2VzfTwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbGVydENvbnRlbnQgPSBtZXNzYWdlcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e2FsZXJ0Q29udGVudH08L0FsZXJ0PjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRsZXQgeyBlcnJvciwgc3VjY2VzcyB9ID0gdGhpcy5wcm9wcy5hbGVydHM7XHJcblx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0Ly8gUmVuZGVyIGVycm9yIGFsZXJ0c1xyXG5cdFx0XHRzd2l0Y2ggKGVycm9yLmVycm9yKSB7XHJcblx0XHRcdFx0Y2FzZSAndmFsaWRhdGlvbiBlcnJvcnMnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdGNhc2UgJ2Vycm9yJzpcclxuXHRcdFx0XHRcdGlmIChlcnJvci5kZXRhaWwubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyVmFsaWRhdGlvbkVycm9ycygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cImRhbmdlclwiPnt1cGNhc2UoZXJyb3IuZXJyb3IpfTwvQWxlcnQ+O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gPEFsZXJ0IGNvbG9yPVwiZGFuZ2VyXCI+e3VwY2FzZShlcnJvci5lcnJvcil9PC9BbGVydD47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHQvLyBSZW5kZXIgc3VjY2VzcyBhbGVydHNcclxuXHRcdFx0cmV0dXJuIDxBbGVydCBjb2xvcj1cInN1Y2Nlc3NcIj57dXBjYXNlKHN1Y2Nlc3Muc3VjY2Vzcyl9PC9BbGVydD47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7IC8vIE5vIGFsZXJ0cywgcmVuZGVyIG5vdGhpbmdcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWxlcnRNZXNzYWdlcztcclxuIiwiLyoqXHJcbiAqIFRoZSBmb3JtIHRoYXQncyB2aXNpYmxlIHdoZW4gXCJDcmVhdGUgPEl0ZW1OYW1lPlwiIGlzIGNsaWNrZWQgb24gZWl0aGVyIHRoZVxyXG4gKiBMaXN0IHNjcmVlbiBvciB0aGUgSXRlbSBzY3JlZW5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgdmtleSBmcm9tICd2a2V5JztcclxuaW1wb3J0IEFsZXJ0TWVzc2FnZXMgZnJvbSAnLi9BbGVydE1lc3NhZ2VzJztcclxuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnRmllbGRUeXBlcyc7XHJcbmltcG9ydCBJbnZhbGlkRmllbGRUeXBlIGZyb20gJy4vSW52YWxpZEZpZWxkVHlwZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSwgTW9kYWwgfSBmcm9tICcuLi9lbGVtZW50YWwnO1xyXG5cclxuaW1wb3J0IElmcmFtZUNvbnRlbnQgZnJvbSAnLi9JZnJhbWVDb250ZW50JztcclxuXHJcbmNvbnN0IENyZWF0ZUZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGVGb3JtJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGVycjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0b25DcmVhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycjogbnVsbCxcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Ly8gU2V0IHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMgd2hlbiBmaXJzdCByZW5kZXJpbmcgdGhlXHJcblx0XHQvLyBmb3JtLiAoSWYgdGhleSBoYXZlIGEgZGVmYXVsdCB2YWx1ZSwgdGhhdCBpcylcclxuXHRcdHZhciB2YWx1ZXMgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMucHJvcHMubGlzdC5maWVsZHMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dmFyIGZpZWxkID0gdGhpcy5wcm9wcy5saXN0LmZpZWxkc1trZXldO1xyXG5cdFx0XHR2YXIgRmllbGRDb21wb25lbnQgPSBGaWVsZHNbZmllbGQudHlwZV07XHJcblx0XHRcdHZhbHVlc1tmaWVsZC5wYXRoXSA9IEZpZWxkQ29tcG9uZW50LmdldERlZmF1bHRWYWx1ZShmaWVsZCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlczogdmFsdWVzLFxyXG5cdFx0XHRhbGVydHM6IHt9LFxyXG5cdFx0XHRzaG93SWZyYW1lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdGlmKHRoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRzaG93SWZyYW1lOiB0cnVlXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xyXG5cdFx0aWYoIXRoaXMuc3RhdGUuc2hvd0lmcmFtZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlQcmVzcywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGV2dCkge1xyXG5cdFx0aWYgKHZrZXlbZXZ0LmtleUNvZGVdID09PSAnPGVzY2FwZT4nKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdC8vIEhhbmRsZSBpbnB1dCBjaGFuZ2UgZXZlbnRzXHJcblx0aGFuZGxlQ2hhbmdlIChldmVudCkge1xyXG5cdFx0dmFyIHZhbHVlcyA9IGFzc2lnbih7fSwgdGhpcy5zdGF0ZS52YWx1ZXMpO1xyXG5cdFx0dmFsdWVzW2V2ZW50LnBhdGhdID0gZXZlbnQudmFsdWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFNldCB0aGUgcHJvcHMgb2YgYSBmaWVsZFxyXG5cdGdldEZpZWxkUHJvcHMgKGZpZWxkKSB7XHJcblx0XHR2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGZpZWxkKTtcclxuXHRcdHByb3BzLnZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZXNbZmllbGQucGF0aF07XHJcblx0XHRwcm9wcy52YWx1ZXMgPSB0aGlzLnN0YXRlLnZhbHVlcztcclxuXHRcdHByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2U7XHJcblx0XHRwcm9wcy5tb2RlID0gJ2NyZWF0ZSc7XHJcblx0XHRwcm9wcy5rZXkgPSBmaWVsZC5wYXRoO1xyXG5cdFx0cmV0dXJuIHByb3BzO1xyXG5cdH0sXHJcblx0Ly8gQ3JlYXRlIGEgbmV3IGl0ZW0gd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcclxuXHRzdWJtaXRGb3JtIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGNyZWF0ZUZvcm0gPSBldmVudC50YXJnZXQ7XHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjcmVhdGVGb3JtKTtcclxuXHRcdHRoaXMucHJvcHMubGlzdC5jcmVhdGVJdGVtKGZvcm1EYXRhLCAoZXJyLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMub25DcmVhdGUpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJvcHMub25DcmVhdGUoZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIENsZWFyIGZvcm1cclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHR2YWx1ZXM6IHt9LFxyXG5cdFx0XHRcdFx0XHRhbGVydHM6IHtcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiAnSXRlbSBjcmVhdGVkJyxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghZXJyKSB7XHJcblx0XHRcdFx0XHRlcnIgPSB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiAnY29ubmVjdGlvbiBlcnJvcicsXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJZiB3ZSBnZXQgYSBkYXRhYmFzZSBlcnJvciwgc2hvdyB0aGUgZGF0YWJhc2UgZXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRcdC8vIGluc3RlYWQgb2Ygb25seSBzYXlpbmcgXCJEYXRhYmFzZSBlcnJvclwiXHJcblx0XHRcdFx0aWYgKGVyci5lcnJvciA9PT0gJ2RhdGFiYXNlIGVycm9yJykge1xyXG5cdFx0XHRcdFx0ZXJyLmVycm9yID0gZXJyLmRldGFpbC5lcnJtc2c7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0YWxlcnRzOiB7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBlcnIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciB0aGUgZm9ybSBpdHNlbGZcclxuXHRyZW5kZXJGb3JtICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcclxuXHJcblx0XHR2YXIgZm9ybSA9IFtdO1xyXG5cdFx0dmFyIGxpc3QgPSB0aGlzLnByb3BzLmxpc3Q7XHJcblx0XHR2YXIgbmFtZUZpZWxkID0gdGhpcy5wcm9wcy5saXN0Lm5hbWVGaWVsZDtcclxuXHRcdHZhciBmb2N1c1dhc1NldDtcclxuXHJcblx0XHQvLyBJZiB0aGUgbmFtZSBmaWVsZCBpcyBhbiBpbml0aWFsIG9uZSwgd2UgbmVlZCB0byByZW5kZXIgYSBwcm9wZXJcclxuXHRcdC8vIGlucHV0IGZvciBpdFxyXG5cdFx0aWYgKGxpc3QubmFtZUlzSW5pdGlhbCkge1xyXG5cdFx0XHR2YXIgbmFtZUZpZWxkUHJvcHMgPSB0aGlzLmdldEZpZWxkUHJvcHMobmFtZUZpZWxkKTtcclxuXHRcdFx0bmFtZUZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHRpZiAobmFtZUZpZWxkLnR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmNsYXNzTmFtZSA9ICdpdGVtLW5hbWUtZmllbGQnO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLnBsYWNlaG9sZGVyID0gbmFtZUZpZWxkLmxhYmVsO1xyXG5cdFx0XHRcdG5hbWVGaWVsZFByb3BzLmxhYmVsID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9ybS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmllbGRzW25hbWVGaWVsZC50eXBlXSwgbmFtZUZpZWxkUHJvcHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW5kZXIgaW5wdXRzIGZvciBhbGwgaW5pdGlhbCBmaWVsZHNcclxuXHRcdE9iamVjdC5rZXlzKGxpc3QuaW5pdGlhbEZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR2YXIgZmllbGQgPSBsaXN0LmZpZWxkc1tsaXN0LmluaXRpYWxGaWVsZHNba2V5XV07XHJcblx0XHRcdC8vIElmIHRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkIHBhc3NlZCBpbiBhcyBmaWVsZCB0eXBlLCByZW5kZXIgdGhlXHJcblx0XHRcdC8vIGludmFsaWQgZmllbGQgdHlwZSBjb21wb25lbnRcclxuXHRcdFx0aWYgKHR5cGVvZiBGaWVsZHNbZmllbGQudHlwZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRmb3JtLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChJbnZhbGlkRmllbGRUeXBlLCB7IHR5cGU6IGZpZWxkLnR5cGUsIHBhdGg6IGZpZWxkLnBhdGgsIGtleTogZmllbGQucGF0aCB9KSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEdldCB0aGUgcHJvcHMgZm9yIHRoZSBpbnB1dCBmaWVsZFxyXG5cdFx0XHR2YXIgZmllbGRQcm9wcyA9IHRoaXMuZ2V0RmllbGRQcm9wcyhmaWVsZCk7XHJcblx0XHRcdC8vIElmIHRoZXJlIHdhcyBubyBmb2N1c1JlZiBzZXQgcHJldmlvdXNseSwgc2V0IHRoZSBjdXJyZW50IGZpZWxkIHRvXHJcblx0XHRcdC8vIGJlIHRoZSBvbmUgdG8gYmUgZm9jdXNzZWQuIEdlbmVyYWxseSB0aGUgZmlyc3QgaW5wdXQgZmllbGQsIGlmXHJcblx0XHRcdC8vIHRoZXJlJ3MgYW4gaW5pdGlhbCBuYW1lIGZpZWxkIHRoYXQgdGFrZXMgcHJlY2VkZW5jZS5cclxuXHRcdFx0aWYgKCFmb2N1c1dhc1NldCkge1xyXG5cdFx0XHRcdGZpZWxkUHJvcHMuYXV0b0ZvY3VzID0gZm9jdXNXYXNTZXQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcm0ucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEZpZWxkc1tmaWVsZC50eXBlXSwgZmllbGRQcm9wcykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm0gbGF5b3V0PVwiaG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19PlxyXG5cdFx0XHRcdDxNb2RhbC5IZWFkZXJcclxuXHRcdFx0XHRcdHRleHQ9eydDcmVhdGUgYSBuZXcgJyArIGxpc3Quc2luZ3VsYXJ9XHJcblx0XHRcdFx0XHRzaG93Q2xvc2VCdXR0b25cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcdDxNb2RhbC5Cb2R5PlxyXG5cdFx0XHRcdFx0PEFsZXJ0TWVzc2FnZXMgYWxlcnRzPXt0aGlzLnN0YXRlLmFsZXJ0c30gLz5cclxuXHRcdFx0XHRcdHtmb3JtfVxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuXHRcdFx0XHQ8TW9kYWwuRm9vdGVyPlxyXG5cdFx0XHRcdFx0PEJ1dHRvbiBjb2xvcj1cInN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCIgZGF0YS1idXR0b24tdHlwZT1cInN1Ym1pdFwiPlxyXG5cdFx0XHRcdFx0XHRDcmVhdGVcclxuXHRcdFx0XHRcdDwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0PEJ1dHRvblxyXG5cdFx0XHRcdFx0XHR2YXJpYW50PVwibGlua1wiXHJcblx0XHRcdFx0XHRcdGNvbG9yPVwiY2FuY2VsXCJcclxuXHRcdFx0XHRcdFx0ZGF0YS1idXR0b24tdHlwZT1cImNhbmNlbFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdENhbmNlbFxyXG5cdFx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0PC9Nb2RhbC5Gb290ZXI+XHJcblx0XHRcdDwvRm9ybT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJDb250ZW50KCkge1xyXG5cdFx0Y29uc3Qge3Nob3dJZnJhbWV9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IGlmcmFtZVVSTCA9IGAke0tleXN0b25lLmV4dGVybmFsSG9zdH0ke3RoaXMucHJvcHMubGlzdC5saW5rLmNyZWF0ZX1gO1xyXG5cclxuXHRcdHJldHVybiAoc2hvd0lmcmFtZSAmJiB0aGlzLnByb3BzLmlzT3BlbikgP1xyXG5cdFx0XHQ8SWZyYW1lQ29udGVudCBzcmM9e2lmcmFtZVVSTH0gc2hvdz17dGhpcy5wcm9wcy5pc09wZW59IG9uQ2FuY2VsPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBvblNhdmU9e3RoaXMucHJvcHMub25DcmVhdGV9IGNsYXNzTmFtZT17XCJmdWxsLXNjcmVlblwifS8+IDpcclxuXHRcdFx0PE1vZGFsLkRpYWxvZyBpc09wZW49e3RoaXMucHJvcHMuaXNPcGVufSBvbkNsb3NlPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSBiYWNrZHJvcENsb3Nlc01vZGFsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckZvcm0oKX1cclxuXHRcdFx0PC9Nb2RhbC5EaWFsb2c+XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVGb3JtO1xyXG4iLCIvKipcclxuICogVGhlIGZvcm0gdGhhdCdzIHZpc2libGUgd2hlbiBcIkNyZWF0ZSA8SXRlbU5hbWU+XCIgaXMgY2xpY2tlZCBvbiBlaXRoZXIgdGhlXHJcbiAqIExpc3Qgc2NyZWVuIG9yIHRoZSBJdGVtIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJZnJhbWVDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSWZyYW1lQ29udGVudCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdG9uU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvdzogZmFsc2UsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuaGFuZGxlRnJhbWVUYXNrcywgdGhpcyk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVGcmFtZVRhc2tzLCB0aGlzKTtcclxuXHR9LFxyXG5cdGhhbmRsZUZyYW1lVGFza3MoZSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcblx0XHRcdHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdjb250ZW50VXBkYXRlJzogXHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhlaWdodDogbWVzc2FnZS5kYXRhXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25TYXZlJzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2F2ZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2F2ZShtZXNzYWdlLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnb25DYW5jZWwnOlxyXG5cdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlckNvbnRlbnQoKSB7XHJcblx0XHRjb25zdCB7c3JjLCBzaG93LCBjbGFzc05hbWUgPSAnJ30gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgaWZyYW1lVVJMID0gYCR7c3JjfT90b2tlbj0ke0tleXN0b25lLnVzZXIudG9rZW59YFxyXG5cdFx0cmV0dXJuIHNob3cgP1xyXG5cdFx0XHQ8aWZyYW1lIGNsYXNzTmFtZT17J2NvbnRlbnQtZnJhbWUgJyArIGNsYXNzTmFtZX0gc3R5bGU9e3toZWlnaHQ6IHRoaXMuc3RhdGUuY29udGVudEhlaWdodH19IHJlZj17KGYpID0+IHRoaXMuaWZyID0gZiB9IHNyYz17aWZyYW1lVVJMfSAvPiA6IDxkaXYgLz5cclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElmcmFtZUNvbnRlbnQ7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXJzIGFuIFwiSW52YWxpZCBGaWVsZCBUeXBlXCIgZXJyb3JcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgSW52YWxpZEZpZWxkVHlwZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPlxyXG5cdFx0XHRJbnZhbGlkIGZpZWxkIHR5cGUgPHN0cm9uZz57cHJvcHMudHlwZX08L3N0cm9uZz4gYXQgcGF0aCA8c3Ryb25nPntwcm9wcy5wYXRofTwvc3Ryb25nPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxufTtcclxuXHJcbkludmFsaWRGaWVsZFR5cGUucHJvcFR5cGVzID0ge1xyXG5cdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZEZpZWxkVHlwZTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciB0aGUgYm9keSBvZiBhIHBvcG91dFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0Qm9keSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dEJvZHknLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRzY3JvbGxhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRfX2JvZHknLCB7XHJcblx0XHRcdCdQb3BvdXRfX3Njcm9sbGFibGUtYXJlYSc6IHRoaXMucHJvcHMuc2Nyb2xsYWJsZSxcclxuXHRcdH0sIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnc2Nyb2xsYWJsZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dEJvZHk7XHJcbiIsIi8qKlxyXG4gKiBSZW5kZXIgYSBmb290ZXIgZm9yIGEgcG9wb3V0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IEJVVFRPTl9CQVNFX0NMQVNTTkFNRSA9ICdQb3BvdXRfX2Zvb3Rlcl9fYnV0dG9uIFBvcG91dF9fZm9vdGVyX19idXR0b24tLSc7XHJcblxyXG5jb25zdCBQb3BvdXRGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRGb290ZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxyXG5cdFx0cHJpbWFyeUJ1dHRvbkFjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRwcmltYXJ5QnV0dG9uSXNTdWJtaXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0cHJpbWFyeUJ1dHRvbkxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0c2Vjb25kYXJ5QnV0dG9uQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHRcdHNlY29uZGFyeUJ1dHRvbkxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdH0sXHJcblx0Ly8gUmVuZGVyIGEgcHJpbWFyeSBidXR0b25cclxuXHRyZW5kZXJQcmltYXJ5QnV0dG9uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uTGFiZWwpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHR0eXBlPXt0aGlzLnByb3BzLnByaW1hcnlCdXR0b25Jc1N1Ym1pdCA/ICdzdWJtaXQnIDogJ2J1dHRvbid9XHJcblx0XHRcdFx0Y2xhc3NOYW1lPXtCVVRUT05fQkFTRV9DTEFTU05BTUUgKyAncHJpbWFyeSd9XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5wcmltYXJ5QnV0dG9uQWN0aW9ufVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMucHJpbWFyeUJ1dHRvbkxhYmVsfVxyXG5cdFx0XHQ8L2J1dHRvbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHQvLyBSZW5kZXIgYSBzZWNvbmRhcnkgYnV0dG9uXHJcblx0cmVuZGVyU2Vjb25kYXJ5QnV0dG9uICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5zZWNvbmRhcnlCdXR0b25BY3Rpb24gfHwgIXRoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uTGFiZWwpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxidXR0b25cclxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcclxuXHRcdFx0XHRjbGFzc05hbWU9e0JVVFRPTl9CQVNFX0NMQVNTTkFNRSArICdzZWNvbmRhcnknfVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uQWN0aW9ufVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuc2Vjb25kYXJ5QnV0dG9uTGFiZWx9XHJcblx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9fZm9vdGVyXCI+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyUHJpbWFyeUJ1dHRvbigpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclNlY29uZGFyeUJ1dHRvbigpfVxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dEZvb3RlcjtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIGhlYWRlciBmb3IgYSBwb3BvdXRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuY29uc3QgUG9wb3V0SGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0SGVhZGVyJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGxlZnRBY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0bGVmdEljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dHJhbnNpdGlvbkRpcmVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnbmV4dCcsICdwcmV2J10pLFxyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdC8vIElmIHdlIGhhdmUgYSBsZWZ0IGFjdGlvbiBhbmQgYSBsZWZ0IGljb24sIHJlbmRlciBhIGhlYWRlciBidXR0b25cclxuXHRcdHZhciBoZWFkZXJCdXR0b24gPSAodGhpcy5wcm9wcy5sZWZ0QWN0aW9uICYmIHRoaXMucHJvcHMubGVmdEljb24pID8gKFxyXG5cdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0a2V5PXsnYnV0dG9uXycgKyB0aGlzLnByb3BzLnRyYW5zaXRpb25EaXJlY3Rpb259XHJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXHJcblx0XHRcdFx0Y2xhc3NOYW1lPXsnUG9wb3V0X19oZWFkZXJfX2J1dHRvbiBvY3RpY29uIG9jdGljb24tJyArIHRoaXMucHJvcHMubGVmdEljb259XHJcblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5sZWZ0QWN0aW9ufVxyXG5cdFx0XHQvPlxyXG5cdFx0KSA6IG51bGw7XHJcblx0XHQvLyBJZiB3ZSBoYXZlIGEgdGl0bGUsIHJlbmRlciBpdFxyXG5cdFx0dmFyIGhlYWRlclRpdGxlID0gdGhpcy5wcm9wcy50aXRsZSA/IChcclxuXHRcdFx0PHNwYW5cclxuXHRcdFx0XHRrZXk9eyd0aXRsZV8nICsgdGhpcy5wcm9wcy50cmFuc2l0aW9uRGlyZWN0aW9ufVxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cIlBvcG91dF9faGVhZGVyX19sYWJlbFwiXHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KSA6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJQb3BvdXRfX2hlYWRlclwiPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cIlBvcG91dF9faGVhZGVyX19idXR0b25cIlxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHtoZWFkZXJCdXR0b259XHJcblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxyXG5cdFx0XHRcdDxUcmFuc2l0aW9uXHJcblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT17J1BvcG91dF9fcGFuZS0nICsgdGhpcy5wcm9wcy50cmFuc2l0aW9uRGlyZWN0aW9ufVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MzYwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MzYwfVxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHtoZWFkZXJUaXRsZX1cclxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9wb3V0SGVhZGVyO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QuIENhbiBhbHNvIHVzZSBQb3BvdXRMaXN0SXRlbSBhbmQgUG9wb3V0TGlzdEhlYWRpbmdcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuY29uc3QgUG9wb3V0TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcG91dExpc3QnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NuYW1lcygnUG9wb3V0TGlzdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRMaXN0O1xyXG5cclxuLy8gZXhwb3NlIHRoZSBjaGlsZCB0byB0aGUgdG9wIGxldmVsIGV4cG9ydFxyXG5tb2R1bGUuZXhwb3J0cy5JdGVtID0gcmVxdWlyZSgnLi9Qb3BvdXRMaXN0SXRlbScpO1xyXG5tb2R1bGUuZXhwb3J0cy5IZWFkaW5nID0gcmVxdWlyZSgnLi9Qb3BvdXRMaXN0SGVhZGluZycpO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QgaGVhZGluZ1xyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0TGlzdEhlYWRpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRMaXN0SGVhZGluZycsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0X19oZWFkaW5nJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpO1xyXG5cdFx0Y29uc3QgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2NsYXNzTmFtZScpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5wcm9wc30gLz5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dExpc3RIZWFkaW5nO1xyXG4iLCIvKipcclxuICogUmVuZGVyIGEgcG9wb3V0IGxpc3QgaXRlbVxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG52YXIgUG9wb3V0TGlzdEl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdQb3BvdXRMaXN0SXRlbScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0aWNvbkhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0aXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0b25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aG92ZXI6IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGhvdmVyICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBob3ZlcjogdHJ1ZSB9KTtcclxuXHR9LFxyXG5cdHVuaG92ZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyOiBmYWxzZSB9KTtcclxuXHR9LFxyXG5cdC8vIFJlbmRlciBhbiBpY29uXHJcblx0cmVuZGVySWNvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaWNvbikgcmV0dXJuIG51bGw7XHJcblx0XHRjb25zdCBpY29uID0gdGhpcy5zdGF0ZS5ob3ZlciAmJiB0aGlzLnByb3BzLmljb25Ib3ZlciA/IHRoaXMucHJvcHMuaWNvbkhvdmVyIDogdGhpcy5wcm9wcy5pY29uO1xyXG5cdFx0Y29uc3QgaWNvbkNsYXNzbmFtZSA9IGNsYXNzbmFtZXMoJ1BvcG91dExpc3RfX2l0ZW1fX2ljb24gb2N0aWNvbicsICgnb2N0aWNvbi0nICsgaWNvbikpO1xyXG5cclxuXHRcdHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc25hbWV9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IGl0ZW1DbGFzc25hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRMaXN0X19pdGVtJywge1xyXG5cdFx0XHQnaXMtc2VsZWN0ZWQnOiB0aGlzLnByb3BzLmlzU2VsZWN0ZWQsXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjbGFzc05hbWUnLCAnaWNvbicsICdpY29uSG92ZXInLCAnaXNTZWxlY3RlZCcsICdsYWJlbCcpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGJ1dHRvblxyXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxyXG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLmxhYmVsfVxyXG5cdFx0XHRcdGNsYXNzTmFtZT17aXRlbUNsYXNzbmFtZX1cclxuXHRcdFx0XHRvbkZvY3VzPXt0aGlzLmhvdmVyfVxyXG5cdFx0XHRcdG9uQmx1cj17dGhpcy51bmhvdmVyfVxyXG5cdFx0XHRcdG9uTW91c2VPdmVyPXt0aGlzLmhvdmVyfVxyXG5cdFx0XHRcdG9uTW91c2VPdXQ9e3RoaXMudW5ob3Zlcn1cclxuXHRcdFx0XHR7Li4ucHJvcHN9XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJJY29uKCl9XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiUG9wb3V0TGlzdF9faXRlbV9fbGFiZWxcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmVsfVxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PC9idXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRMaXN0SXRlbTtcclxuIiwiLyoqXHJcbiAqIFJlbmRlciBhIHBvcG91dCBwYW5lLCBjYWxscyBwcm9wcy5vbkxheW91dCB3aGVuIHRoZSBjb21wb25lbnQgbW91bnRzXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbnZhciBQb3BvdXRQYW5lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0UGFuZScsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG9uTGF5b3V0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRvbkxheW91dDogKCkgPT4ge30sXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkxheW91dCh0aGlzLnJlZnMuZWwub2Zmc2V0SGVpZ2h0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKCdQb3BvdXRfX3BhbmUnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnY2xhc3NOYW1lJywgJ29uTGF5b3V0Jyk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiByZWY9XCJlbFwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucHJvcHN9IC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3BvdXRQYW5lO1xyXG4iLCIvKipcclxuICogQSBQb3BvdXQgY29tcG9uZW50LlxyXG4gKiBPbmUgY2FuIGFsc28gYWRkIGEgSGVhZGVyIChQb3BvdXQvSGVhZGVyKSwgYSBGb290ZXJcclxuICogKFBvcG91dC9Gb290ZXIpLCBhIEJvZHkgKFBvcG91dC9Cb2R5KSBhbmQgYSBQYW4gKFBvcG91dC9QYW5lKS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUG9ydGFsIGZyb20gJy4uL1BvcnRhbCc7XHJcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBTSVpFUyA9IHtcclxuXHRhcnJvd0hlaWdodDogMTIsXHJcblx0YXJyb3dXaWR0aDogMTYsXHJcblx0aG9yaXpvbnRhbE1hcmdpbjogMjAsXHJcbn07XHJcblxyXG52YXIgUG9wb3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnUG9wb3V0JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRvblN1Ym1pdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRyZWxhdGl2ZVRvSUQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG5cdH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoOiAzMjAsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuaXNPcGVuKSB7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKTtcclxuXHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbihuZXh0UHJvcHMuaXNPcGVuKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc09wZW4gJiYgIW5leHRQcm9wcy5pc09wZW4pIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Z2V0UG9ydGFsRE9NTm9kZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWZzLnBvcnRhbC5nZXRQb3J0YWxET01Ob2RlKCk7XHJcblx0fSxcclxuXHRjYWxjdWxhdGVQb3NpdGlvbiAoaXNPcGVuKSB7XHJcblx0XHRpZiAoIWlzT3BlbikgcmV0dXJuO1xyXG5cdFx0bGV0IHBvc05vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnByb3BzLnJlbGF0aXZlVG9JRCk7XHJcblxyXG5cdFx0Y29uc3QgcG9zID0ge1xyXG5cdFx0XHR0b3A6IDAsXHJcblx0XHRcdGxlZnQ6IDAsXHJcblx0XHRcdHdpZHRoOiBwb3NOb2RlLm9mZnNldFdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHBvc05vZGUub2Zmc2V0SGVpZ2h0LFxyXG5cdFx0fTtcclxuXHRcdHdoaWxlIChwb3NOb2RlLm9mZnNldFBhcmVudCkge1xyXG5cdFx0XHRwb3MudG9wICs9IHBvc05vZGUub2Zmc2V0VG9wO1xyXG5cdFx0XHRwb3MubGVmdCArPSBwb3NOb2RlLm9mZnNldExlZnQ7XHJcblx0XHRcdHBvc05vZGUgPSBwb3NOb2RlLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbGVmdE9mZnNldCA9IE1hdGgubWF4KHBvcy5sZWZ0ICsgKHBvcy53aWR0aCAvIDIpIC0gKHRoaXMucHJvcHMud2lkdGggLyAyKSwgU0laRVMuaG9yaXpvbnRhbE1hcmdpbik7XHJcblx0XHRsZXQgdG9wT2Zmc2V0ID0gcG9zLnRvcCArIHBvcy5oZWlnaHQgKyBTSVpFUy5hcnJvd0hlaWdodDtcclxuXHJcblx0XHR2YXIgc3BhY2VPblJpZ2h0ID0gd2luZG93LmlubmVyV2lkdGggLSAobGVmdE9mZnNldCArIHRoaXMucHJvcHMud2lkdGggKyBTSVpFUy5ob3Jpem9udGFsTWFyZ2luKTtcclxuXHRcdGlmIChzcGFjZU9uUmlnaHQgPCAwKSB7XHJcblx0XHRcdGxlZnRPZmZzZXQgPSBsZWZ0T2Zmc2V0ICsgc3BhY2VPblJpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGFycm93TGVmdE9mZnNldCA9IGxlZnRPZmZzZXQgPT09IFNJWkVTLmhvcml6b250YWxNYXJnaW5cclxuXHRcdFx0PyBwb3MubGVmdCArIChwb3Mud2lkdGggLyAyKSAtIChTSVpFUy5hcnJvd1dpZHRoIC8gMikgLSBTSVpFUy5ob3Jpem9udGFsTWFyZ2luXHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRjb25zdCBuZXdTdGF0ZUF2YWxpYWJsZSA9IHRoaXMuc3RhdGUubGVmdE9mZnNldCAhPT0gbGVmdE9mZnNldFxyXG5cdFx0XHR8fCB0aGlzLnN0YXRlLnRvcE9mZnNldCAhPT0gdG9wT2Zmc2V0XHJcblx0XHRcdHx8IHRoaXMuc3RhdGUuYXJyb3dMZWZ0T2Zmc2V0ICE9PSBhcnJvd0xlZnRPZmZzZXQ7XHJcblxyXG5cdFx0aWYgKG5ld1N0YXRlQXZhbGlhYmxlKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxlZnRPZmZzZXQ6IGxlZnRPZmZzZXQsXHJcblx0XHRcdFx0dG9wT2Zmc2V0OiB0b3BPZmZzZXQsXHJcblx0XHRcdFx0YXJyb3dMZWZ0T2Zmc2V0OiBhcnJvd0xlZnRPZmZzZXQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyUG9wb3V0ICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHsgd2lkdGggfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCB7IGFycm93TGVmdE9mZnNldCwgbGVmdE9mZnNldDogbGVmdCwgdG9wT2Zmc2V0OiB0b3AgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3QgYXJyb3dTdHlsZXMgPSBhcnJvd0xlZnRPZmZzZXRcclxuXHRcdFx0PyB7IGxlZnQ6IDAsIG1hcmdpbkxlZnQ6IGFycm93TGVmdE9mZnNldCB9XHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dFwiIHN0eWxlPXt7IGxlZnQsIHRvcCwgd2lkdGggfX0+XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiUG9wb3V0X19hcnJvd1wiIHN0eWxlPXthcnJvd1N0eWxlc30gLz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlBvcG91dF9faW5uZXJcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJCbG9ja291dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm47XHJcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJibG9ja291dFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQb3J0YWwgY2xhc3NOYW1lPVwiUG9wb3V0LXdyYXBwZXJcIiByZWY9XCJwb3J0YWxcIj5cclxuXHRcdFx0XHQ8VHJhbnNpdGlvblxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkVudGVyVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dD17MjAwfVxyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbk5hbWU9XCJQb3BvdXRcIlxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclBvcG91dCgpfVxyXG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJCbG9ja291dCgpfVxyXG5cdFx0XHQ8L1BvcnRhbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG91dDtcclxuXHJcbi8vIGV4cG9zZSB0aGUgY2hpbGQgdG8gdGhlIHRvcCBsZXZlbCBleHBvcnRcclxubW9kdWxlLmV4cG9ydHMuSGVhZGVyID0gcmVxdWlyZSgnLi9Qb3BvdXRIZWFkZXInKTtcclxubW9kdWxlLmV4cG9ydHMuQm9keSA9IHJlcXVpcmUoJy4vUG9wb3V0Qm9keScpO1xyXG5tb2R1bGUuZXhwb3J0cy5Gb290ZXIgPSByZXF1aXJlKCcuL1BvcG91dEZvb3RlcicpO1xyXG5tb2R1bGUuZXhwb3J0cy5QYW5lID0gcmVxdWlyZSgnLi9Qb3BvdXRQYW5lJyk7XHJcbiIsIi8qKlxyXG4gKiBVc2VkIGJ5IHRoZSBQb3BvdXQgY29tcG9uZW50IGFuZCB0aGUgTGlnaHRib3ggY29tcG9uZW50IG9mIHRoZSBmaWVsZHMgZm9yXHJcbiAqIHBvcG91dHMuIFJlbmRlcnMgYSBub24tcmVhY3QgRE9NIG5vZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1BvcnRhbCcsXHJcblx0cG9ydGFsRWxlbWVudDogbnVsbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBlbDtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xyXG5cdFx0UmVhY3RET00ucmVuZGVyKDxkaXYgey4uLnRoaXMucHJvcHN9IC8+LCB0aGlzLnBvcnRhbEVsZW1lbnQpO1xyXG5cdH0sXHJcblx0Z2V0UG9ydGFsRE9NTm9kZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3J0YWxFbGVtZW50O1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCIvKipcclxuICogQ29uc3RhbnRzXHJcbiAqL1xyXG5cclxuLy8gYnJlYWtwb2ludHNcclxuZXhwb3J0cy5icmVha3BvaW50ID0ge1xyXG5cdHhzOiA0ODAsXHJcblx0c206IDc2OCxcclxuXHRtZDogOTkyLFxyXG5cdGxnOiAxMjAwLFxyXG59O1xyXG5cclxuLy8gYm9yZGVyIHJhZGlpXHJcbmV4cG9ydHMuYm9yZGVyUmFkaXVzID0ge1xyXG5cdHhzOiAyLFxyXG5cdHNtOiA0LFxyXG5cdG1kOiA4LFxyXG5cdGxnOiAxNixcclxuXHR4bDogMzIsXHJcbn07XHJcblxyXG4vLyBjb2xvclxyXG5leHBvcnRzLmNvbG9yID0ge1xyXG5cdGFwcERhbmdlcjogJyNkNjQyNDInLFxyXG5cdGFwcEluZm86ICcjNTZjZGZjJyxcclxuXHRhcHBQcmltYXJ5OiAnIzEzODVlNScsXHJcblx0YXBwU3VjY2VzczogJyMzNGMyNDAnLFxyXG5cdGFwcFdhcm5pbmc6ICcjZmE5ZjQ3JyxcclxufTtcclxuXHJcbi8vIHNwYWNpbmdcclxuZXhwb3J0cy5zcGFjaW5nID0ge1xyXG5cdHhzOiA1LFxyXG5cdHNtOiAxMCxcclxuXHRtZDogMjAsXHJcblx0bGc6IDQwLFxyXG5cdHhsOiA4MCxcclxufTtcclxuXHJcbi8vIHRhYmxlIGNvbnN0YW50c1xyXG5cclxuZXhwb3J0cy5UQUJMRV9DT05UUk9MX0NPTFVNTl9XSURUSCA9IDI2OyAgLy8gaWNvbiArIHBhZGRpbmdcclxuZXhwb3J0cy5ORVRXT1JLX0VSUk9SX1JFVFJZX0RFTEFZID0gNTAwOyAvLyBpbiBtc1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBrZXktc3BhY2luZyAqL1xyXG5jb25zdCB0aGVtZSA9IHt9O1xyXG5jb25zdCB7IGJsZW5kLCBkYXJrZW4sIGZhZGUsIGxpZ2h0ZW4gfSA9IHJlcXVpcmUoJy4vdXRpbHMvY29sb3InKTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDT01NT05cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyBicmVha3BvaW50XHJcblxyXG50aGVtZS5icmVha3BvaW50TnVtZXJpYyA9IHtcclxuXHRtb2JpbGU6ICAgICAgICAgICA0ODAsXHJcblx0dGFibGV0UG9ydHJhaXQ6ICAgNzY4LFxyXG5cdHRhYmxldExhbmRzY2FwZTogIDk5MixcclxuXHRkZXNrdG9wOiAgICAgICAgICAxMjAwLFxyXG59O1xyXG50aGVtZS5icmVha3BvaW50ID0ge1xyXG5cdHRhYmxldFBvcnRyYWl0TWluOiAgKHRoZW1lLmJyZWFrcG9pbnROdW1lcmljLm1vYmlsZSArIDEpICsgJ3B4JyxcclxuXHR0YWJsZXRMYW5kc2NhcGVNaW46ICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCArIDEpICsgJ3B4JyxcclxuXHRkZXNrdG9wTWluOiAgICAgICAgICh0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRMYW5kc2NhcGUgKyAxKSArICdweCcsXHJcblx0ZGVza3RvcExhcmdlTWluOiAgICAodGhlbWUuYnJlYWtwb2ludE51bWVyaWMuZGVza3RvcCArIDEpICsgJ3B4JyxcclxuXHJcblx0bW9iaWxlTWF4OiAgICAgICAgICAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMubW9iaWxlICsgJ3B4JyxcclxuXHR0YWJsZXRQb3J0cmFpdE1heDogICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy50YWJsZXRQb3J0cmFpdCArICdweCcsXHJcblx0dGFibGV0TGFuZHNjYXBlTWF4OiAgdGhlbWUuYnJlYWtwb2ludE51bWVyaWMudGFibGV0TGFuZHNjYXBlICsgJ3B4JyxcclxuXHRkZXNrdG9wTWF4OiAgICAgICAgICB0aGVtZS5icmVha3BvaW50TnVtZXJpYy5kZXNrdG9wICsgJ3B4JyxcclxufTtcclxuXHJcbi8vIGNvbnRhaW5lclxyXG5cclxudGhlbWUuY29udGFpbmVyID0ge1xyXG5cdGd1dHRlcjogMjAsXHJcblx0c2l6ZToge1xyXG5cdFx0c21hbGw6ICA3NTAsXHJcblx0XHRtZWRpdW06IDk3MCxcclxuXHRcdGxhcmdlOiAxMTcwLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBjb2xvclxyXG5cclxudGhlbWUuY29sb3IgPSB7XHJcblx0Ym9keTogICAgICAgICAgICAgICAgJyNmYWZhZmEnLFxyXG5cdGxpbms6ICAgICAgICAgICAgICAgICcjMTM4NWU1JyxcclxuXHRsaW5rSG92ZXI6ICAgICAgICAgICBsaWdodGVuKCcjMTM4NWU1JywgMTApLFxyXG5cdHRleHQ6ICAgICAgICAgICAgICAgICcjMUExQTFBJyxcclxuXHJcblx0Ly8gY29udGV4dHVhbFxyXG5cdHN1Y2Nlc3M6ICAgICAgICAgICAgICcjMzRjMjQwJyxcclxuXHRjcmVhdGU6ICAgICAgICAgICAgICAnIzM0YzI0MCcsIC8vIGFsaWFzIGZvciBzdWNjZXNzXHJcblx0cHJpbWFyeTogICAgICAgICAgICAgJyMxMzg1ZTUnLFxyXG5cdGluZm86ICAgICAgICAgICAgICAgICcjMTM4NWU1JywgLy8gYWxpYXMgZm9yIHByaW1hcnlcclxuXHR3YXJuaW5nOiAgICAgICAgICAgICAnI0ZBMycsXHJcblx0ZGFuZ2VyOiAgICAgICAgICAgICAgJyNkNjQyNDInLFxyXG5cdGVycm9yOiAgICAgICAgICAgICAgICcjZDY0MjQyJywgLy8gYWxpYXMgZm9yIGRhbmdlclxyXG5cclxuXHQvLyBuZXV0cmFsc1xyXG5cdGdyYXk5MDogICAgICAgICAgICAgICcjMUExQTFBJyxcclxuXHRncmF5ODA6ICAgICAgICAgICAgICAnIzMzMycsXHJcblx0Z3JheTcwOiAgICAgICAgICAgICAgJyM0RDRENEQnLFxyXG5cdGdyYXk2MDogICAgICAgICAgICAgICcjNjY2JyxcclxuXHRncmF5NTA6ICAgICAgICAgICAgICAnIzdGN0Y3RicsXHJcblx0Z3JheTQwOiAgICAgICAgICAgICAgJyM5OTknLFxyXG5cdGdyYXkzMDogICAgICAgICAgICAgICcjQjNCM0IzJyxcclxuXHRncmF5MjA6ICAgICAgICAgICAgICAnI0NDQycsXHJcblx0Z3JheTE1OiAgICAgICAgICAgICAgJyNEOUQ5RDknLFxyXG5cdGdyYXkxMDogICAgICAgICAgICAgICcjRTVFNUU1JyxcclxuXHRncmF5MDU6ICAgICAgICAgICAgICAnI0YyRjJGMicsXHJcblxyXG5cdC8vIHNvY2lhbFxyXG5cdGZhY2Vib29rOiAgICAgICAgICAgICcjM0I1OTk4JyxcclxuXHRnb29nbGU6ICAgICAgICAgICAgICAnI0RDNEU0MScsXHJcblx0aW5zdGFncmFtOiAgICAgICAgICAgJyMzZjcyOWInLFxyXG5cdHBpbnRlcmVzdDogICAgICAgICAgICcjYmQwODFjJyxcclxuXHR0dW1ibHI6ICAgICAgICAgICAgICAnIzM1NDY1YycsXHJcblx0dHdpdHRlcjogICAgICAgICAgICAgJyM1NUFDRUUnLFxyXG5cdHlvdXR1YmU6ICAgICAgICAgICAgICcjY2QyMDFmJyxcclxuXHR2aW1lbzogICAgICAgICAgICAgICAnIzFhYjdlYScsXHJcbn07XHJcblxyXG4vLyBib3JkZXIgcmFkaWlcclxuXHJcbnRoZW1lLmJvcmRlclJhZGl1cyA9IHtcclxuXHRzbWFsbDogJzAuMTI1cmVtJyxcclxuXHRkZWZhdWx0OiAnMC4zcmVtJyxcclxuXHRsYXJnZTogJzAuNXJlbScsXHJcbn07XHJcblxyXG4vLyBzcGFjaW5nXHJcblxyXG50aGVtZS5zcGFjaW5nID0ge1xyXG5cdHhzbWFsbDogICAgICA1LFxyXG5cdHNtYWxsOiAgICAgICAxMCxcclxuXHRkZWZhdWx0OiAgICAgMjAsXHJcblx0bGFyZ2U6ICAgICAgIDMwLFxyXG5cdHhsYXJnZTogICAgICA0MCxcclxuXHR4eGxhcmdlOiAgICAgNjAsXHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRUxFTUVOVEFMIFNQRUNJRklDXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gYnV0dG9uXHJcblxyXG50aGVtZS5idXR0b24gPSB7XHJcblx0Ym9yZGVyUmFkaXVzOiB0aGVtZS5ib3JkZXJSYWRpdXMuZGVmYXVsdCxcclxuXHRib3JkZXJXaWR0aDogMSxcclxuXHRmb250OiB7XHJcblx0XHR3ZWlnaHQ6IDUwMCxcclxuXHR9LFxyXG5cdHBhZGRpbmdIb3Jpem9udGFsOiAnMWVtJyxcclxuXHRkZWZhdWx0OiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLnByaW1hcnksIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHR9LFxyXG5cdHByaW1hcnk6IHtcclxuXHRcdGJnQ29sb3I6IHRoZW1lLmNvbG9yLnByaW1hcnksXHJcblx0XHRib3JkZXJDb2xvcjogYmxlbmQodGhlbWUuY29sb3IucHJpbWFyeSwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdH0sXHJcblx0c3VjY2Vzczoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdGJvcmRlckNvbG9yOiBibGVuZCh0aGVtZS5jb2xvci5zdWNjZXNzLCB0aGVtZS5jb2xvci5ib2R5LCA2MCksXHJcblx0XHR0ZXh0Q29sb3I6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0fSxcclxuXHR3YXJuaW5nOiB7XHJcblx0XHRiZ0NvbG9yOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLndhcm5pbmcsIHRoZW1lLmNvbG9yLmJvZHksIDYwKSxcclxuXHRcdHRleHRDb2xvcjogdGhlbWUuY29sb3Iud2FybmluZyxcclxuXHR9LFxyXG5cdGRhbmdlcjoge1xyXG5cdFx0YmdDb2xvcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0Ym9yZGVyQ29sb3I6IGJsZW5kKHRoZW1lLmNvbG9yLmRhbmdlciwgdGhlbWUuY29sb3IuYm9keSwgNjApLFxyXG5cdFx0dGV4dENvbG9yOiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0fSxcclxufTtcclxuXHJcbi8vIGJsYW5rIHN0YXRlXHJcblxyXG50aGVtZS5ibGFua3N0YXRlID0ge1xyXG5cdGJhY2tncm91bmQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCA0KSxcclxuXHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0cGFkZGluZ0hvcml6b250YWw6ICcyZW0nLFxyXG5cdHBhZGRpbmdWZXJ0aWNhbDogJzRlbScsXHJcbn07XHJcblxyXG4vLyBmb250XHJcblxyXG50aGVtZS5mb250ID0ge1xyXG5cdGZhbWlseToge1xyXG5cdFx0bW9ubzogJ01lbmxvLCBNb25hY28sIENvbnNvbGFzLCBcIkNvdXJpZXIgTmV3XCIsIG1vbm9zcGFjZScsXHJcblx0XHRzYW5zU2VyaWY6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxyXG5cdFx0c2VyaWY6ICdHZW9yZ2lhLCBUaW1lcyBOZXcgUm9tYW4sIFRpbWVzLCBzZXJpZicsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHR4eHNtYWxsOiAnMC42NXJlbScsXHJcblx0XHR4c21hbGw6ICcwLjc1cmVtJyxcclxuXHRcdHNtYWxsOiAnMC44NXJlbScsXHJcblx0XHRkZWZhdWx0OiAnMXJlbScsXHJcblx0XHRtZWRpdW06ICcxLjJyZW0nLFxyXG5cdFx0bGFyZ2U6ICcxLjZyZW0nLFxyXG5cdFx0eGxhcmdlOiAnMi40cmVtJyxcclxuXHRcdHh4bGFyZ2U6ICczLjJyZW0nLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBmb3JtXHJcblxyXG50aGVtZS5mb3JtID0ge1xyXG5cdGxhYmVsOiB7XHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTUwLFxyXG5cdFx0Zm9udFNpemU6ICcxcmVtJyxcclxuXHRcdGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG5cdFx0d2lkdGg6IDE4MCxcclxuXHR9LFxyXG5cdG5vdGU6IHtcclxuXHRcdGNvbG9yOiB0aGVtZS5jb2xvci5ncmF5NDAsXHJcblx0XHRmb250U2l6ZTogJzAuOWVtJyxcclxuXHR9LFxyXG59O1xyXG5cclxuLy8gY29tcG9uZW50XHJcblxyXG50aGVtZS5jb21wb25lbnQgPSB7XHJcblx0bGluZUhlaWdodDogJzIuM2VtJyxcclxuXHRoZWlnaHQ6ICcyLjRlbScsXHJcblx0cGFkZGluZzogJzFlbScsXHJcbn07XHJcblxyXG4vLyBpbnB1dFxyXG5cclxudGhlbWUuaW5wdXQgPSB7XHJcblx0YmFja2dyb3VuZDoge1xyXG5cdFx0ZGVmYXVsdDogJ3doaXRlJyxcclxuXHRcdGRpc2FibGVkOiAnI2ZhZmFmYScsXHJcblx0XHRub2VkaXQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCAyKSxcclxuXHR9LFxyXG5cdHBsYWNlaG9sZGVyQ29sb3I6ICcjYWFhJyxcclxuXHRsaW5lSGVpZ2h0OiB0aGVtZS5jb21wb25lbnQubGluZUhlaWdodCxcclxuXHRoZWlnaHQ6IHRoZW1lLmNvbXBvbmVudC5oZWlnaHQsXHJcblx0Ym9yZGVyOiB7XHJcblx0XHRjb2xvcjoge1xyXG5cdFx0XHRkZWZhdWx0OiAnI2NjYycsXHJcblx0XHRcdGZvY3VzOiB0aGVtZS5jb2xvci5pbmZvLFxyXG5cdFx0XHRob3ZlcjogJyNiYmInLFxyXG5cdFx0XHRub2VkaXQ6IGRhcmtlbih0aGVtZS5jb2xvci5ib2R5LCA4KSxcclxuXHRcdH0sXHJcblx0XHRyYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0fSxcclxuXHRib3hTaGFkb3c6ICdpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSknLFxyXG5cdGJveFNoYWRvd0ZvY3VzOiBgaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgMCAzcHggJHtmYWRlKHRoZW1lLmNvbG9yLmluZm8sIDEwKX1gLFxyXG5cdHBhZGRpbmdIb3Jpem9udGFsOiAnLjc1ZW0nLFxyXG59O1xyXG5cclxuLy8gc2VsZWN0XHJcblxyXG50aGVtZS5zZWxlY3QgPSB7XHJcblx0Ym94U2hhZG93OiAnMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpJyxcclxufTtcclxuXHJcbi8vIGFsZXJ0XHJcblxyXG50aGVtZS5hbGVydCA9IHtcclxuXHRwYWRkaW5nOiAnMC43NWVtICAxZW0nLFxyXG5cdG1hcmdpbjogJzAgMCAxZW0nLFxyXG5cdGJvcmRlcldpZHRoOiAxLFxyXG5cdGJvcmRlclJhZGl1czogdGhlbWUuYm9yZGVyUmFkaXVzLmRlZmF1bHQsXHJcblxyXG5cdGNvbG9yOiB7XHJcblx0XHRkYW5nZXI6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci5kYW5nZXIsIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLmRhbmdlciwgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5kYW5nZXIsXHJcblx0XHR9LFxyXG5cdFx0aW5mbzoge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiBmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKSxcclxuXHRcdFx0Ym9yZGVyOiBmYWRlKHRoZW1lLmNvbG9yLnByaW1hcnksIDEwKSxcclxuXHRcdFx0dGV4dDogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6IGZhZGUodGhlbWUuY29sb3Iuc3VjY2VzcywgMTApLFxyXG5cdFx0XHRib3JkZXI6IGZhZGUodGhlbWUuY29sb3Iuc3VjY2VzcywgMTApLFxyXG5cdFx0XHR0ZXh0OiB0aGVtZS5jb2xvci5zdWNjZXNzLFxyXG5cdFx0fSxcclxuXHRcdHdhcm5pbmc6IHtcclxuXHRcdFx0YmFja2dyb3VuZDogZmFkZSh0aGVtZS5jb2xvci53YXJuaW5nLCAxMCksXHJcblx0XHRcdGJvcmRlcjogZmFkZSh0aGVtZS5jb2xvci53YXJuaW5nLCAxMCksXHJcblx0XHRcdHRleHQ6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBnbHlwaFxyXG5cclxudGhlbWUuZ2x5cGggPSB7XHJcblx0Y29sb3I6IHtcclxuXHRcdGRhbmdlcjogdGhlbWUuY29sb3IuZGFuZ2VyLFxyXG5cdFx0aW5oZXJpdDogJ2luaGVyaXQnLFxyXG5cdFx0aW52ZXJ0ZWQ6ICd3aGl0ZScsXHJcblx0XHRwcmltYXJ5OiB0aGVtZS5jb2xvci5wcmltYXJ5LFxyXG5cdFx0c3VjY2VzczogdGhlbWUuY29sb3Iuc3VjY2VzcyxcclxuXHRcdHdhcm5pbmc6IHRoZW1lLmNvbG9yLndhcm5pbmcsXHJcblx0fSxcclxuXHRzaXplOiB7XHJcblx0XHRzbWFsbDogMTYsXHJcblx0XHRtZWRpdW06IDMyLFxyXG5cdFx0bGFyZ2U6IDY0LFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBtb2RhbFxyXG5cclxudGhlbWUubW9kYWwgPSB7XHJcblx0YmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC44KScsXHJcblx0ekluZGV4OiAxMDAsXHJcblx0cGFkZGluZzoge1xyXG5cdFx0ZGlhbG9nOiB7XHJcblx0XHRcdGhvcml6b250YWw6ICcxZW0nLFxyXG5cdFx0XHR2ZXJ0aWNhbDogMCxcclxuXHRcdH0sXHJcblx0XHRib2R5OiB7XHJcblx0XHRcdGhvcml6b250YWw6IDAsXHJcblx0XHRcdHZlcnRpY2FsOiAnMWVtJyxcclxuXHRcdH0sXHJcblx0XHRmb290ZXI6IHtcclxuXHRcdFx0aG9yaXpvbnRhbDogMCxcclxuXHRcdFx0dmVydGljYWw6ICcxZW0nLFxyXG5cdFx0fSxcclxuXHRcdGhlYWRlcjoge1xyXG5cdFx0XHRob3Jpem9udGFsOiAwLFxyXG5cdFx0XHR2ZXJ0aWNhbDogJzAuNmVtJyxcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbi8vIHBhZ2luYXRpb25cclxuXHJcbnRoZW1lLnBhZ2luYXRpb24gPSB7XHJcblx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHJcblx0aG92ZXI6IHtcclxuXHRcdGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcblx0XHRib3JkZXI6ICdyZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG5cdFx0Y29sb3I6IHRoZW1lLmNvbG9yLmdyYXk2MCxcclxuXHR9LFxyXG5cdHNlbGVjdGVkOiB7XHJcblx0XHRiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjA1KScsXHJcblx0XHRib3JkZXI6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTYwLFxyXG5cdH0sXHJcblx0ZGlzYWJsZWQ6IHtcclxuXHRcdGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRjb2xvcjogdGhlbWUuY29sb3IuZ3JheTQwLFxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBzcGlubmVyXHJcblxyXG50aGVtZS5zcGlubmVyID0ge1xyXG5cdGNvbG9yOiB7XHJcblx0XHRkYW5nZXI6IHRoZW1lLmNvbG9yLmRhbmdlcixcclxuXHRcdGRlZmF1bHQ6IHRoZW1lLmNvbG9yLmdyYXk0MCxcclxuXHRcdGludmVydGVkOiAnd2hpdGUnLFxyXG5cdFx0cHJpbWFyeTogdGhlbWUuY29sb3IucHJpbWFyeSxcclxuXHRcdHN1Y2Nlc3M6IHRoZW1lLmNvbG9yLnN1Y2Nlc3MsXHJcblx0XHR3YXJuaW5nOiB0aGVtZS5jb2xvci53YXJuaW5nLFxyXG5cdH0sXHJcblx0c2l6ZToge1xyXG5cdFx0c21hbGw6XHQ0LFxyXG5cdFx0bWVkaXVtOlx0OCxcclxuXHRcdGxhcmdlOlx0MTYsXHJcblx0fSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGhlbWU7XHJcbiIsIi8qKlxyXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGhhbmRsZSBMaXN0IG9wZXJhdGlvbnMsIGUuZy4gY3JlYXRpbmcgaXRlbXMsIGRlbGV0aW5nIGl0ZW1zLFxyXG4gKiBnZXR0aW5nIGluZm9ybWF0aW9uIGFib3V0IHRob3NlIGxpc3RzLCBldGMuXHJcbiAqL1xyXG5cclxuY29uc3QgbGlzdFRvQXJyYXkgPSByZXF1aXJlKCdsaXN0LXRvLWFycmF5Jyk7XHJcbmNvbnN0IHFzID0gcmVxdWlyZSgncXMnKTtcclxuY29uc3QgeGhyID0gcmVxdWlyZSgneGhyJyk7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuLy8gRmlsdGVycyBmb3IgdHJ1dGh5IGVsZW1lbnRzIGluIGFuIGFycmF5XHJcbmNvbnN0IHRydXRoeSA9IChpKSA9PiBpO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29sdW1ucyBvZiBhIGxpc3QsIHN0cnVjdHVyZWQgYnkgZmllbGRzIGFuZCBoZWFkaW5nc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGxpc3QgVGhlIGxpc3Qgd2Ugd2FudCB0aGUgY29sdW1ucyBvZlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICAgVGhlIGNvbHVtbnNcclxuICovXHJcbmZ1bmN0aW9uIGdldENvbHVtbnMobGlzdCkge1xyXG5cdHJldHVybiBsaXN0LnVpRWxlbWVudHMubWFwKChjb2wpID0+IHtcclxuXHRcdGlmIChjb2wudHlwZSA9PT0gJ2hlYWRpbmcnKSB7XHJcblx0XHRcdHJldHVybiB7IHR5cGU6ICdoZWFkaW5nJywgY29udGVudDogY29sLmNvbnRlbnQgfTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBmaWVsZCA9IGxpc3QuZmllbGRzW2NvbC5maWVsZF07XHJcblx0XHRcdHJldHVybiBmaWVsZCA/IHsgdHlwZTogJ2ZpZWxkJywgZmllbGQ6IGZpZWxkLCB0aXRsZTogZmllbGQubGFiZWwsIHBhdGg6IGZpZWxkLnBhdGggfSA6IG51bGw7XHJcblx0XHR9XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYWtlIGFuIGFycmF5IG9mIGZpbHRlcnMgYW4gb2JqZWN0IGtleWVkIGJ5IHRoZSBmaWx0ZXJpbmcgcGF0aFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gZmlsdGVyQXJyYXkgVGhlIGFycmF5IG9mIGZpbHRlcnNcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIFRoZSBjb3JyZWN0ZWQgZmlsdGVycywga2V5ZWQgYnkgcGF0aFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RmlsdGVycyhmaWx0ZXJBcnJheSkge1xyXG5cdHZhciBmaWx0ZXJzID0ge307XHJcblx0ZmlsdGVyQXJyYXkuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XHJcblx0XHRmaWx0ZXJzW2ZpbHRlci5maWVsZC5wYXRoXSA9IGZpbHRlci52YWx1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZmlsdGVycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNvcnRpbmcgc3RyaW5nIGZvciB0aGUgVVJJXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSBzb3J0LnBhdGhzIFRoZSBwYXRocyB3ZSB3YW50IHRvIHNvcnRcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgQWxsIHRoZSBzb3J0aW5nIHF1ZXJpZXMgd2Ugd2FudCBhcyBhIHN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U29ydFN0cmluZyhzb3J0KSB7XHJcblx0cmV0dXJuIHNvcnQucGF0aHMubWFwKGkgPT4ge1xyXG5cdFx0Ly8gSWYgd2Ugd2FudCB0byBzb3J0IGludmVydGVkLCB3ZSBwcmVmaXggYSBcIi1cIiBiZWZvcmUgdGhlIHNvcnQgcGF0aFxyXG5cdFx0cmV0dXJuIGkuaW52ZXJ0ID8gJy0nICsgaS5wYXRoIDogaS5wYXRoO1xyXG5cdH0pLmZpbHRlcih0cnV0aHkpLmpvaW4oJywnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBhIHF1ZXJ5IHN0cmluZyBmcm9tIGEgYnVuY2ggb2Ygb3B0aW9uc1xyXG4gKi9cclxuZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvcHRpb25zKSB7XHJcblx0Y29uc3QgcXVlcnkgPSB7fTtcclxuXHRpZiAob3B0aW9ucy5zZWFyY2gpIHF1ZXJ5LnNlYXJjaCA9IG9wdGlvbnMuc2VhcmNoO1xyXG5cdGlmIChvcHRpb25zLmZpbHRlcnMubGVuZ3RoKSBxdWVyeS5maWx0ZXJzID0gSlNPTi5zdHJpbmdpZnkoZ2V0RmlsdGVycyhvcHRpb25zLmZpbHRlcnMpKTtcclxuXHRpZiAob3B0aW9ucy5jb2x1bW5zKSBxdWVyeS5maWVsZHMgPSBvcHRpb25zLmNvbHVtbnMubWFwKGkgPT4gaS5wYXRoKS5qb2luKCcsJyk7XHJcblx0aWYgKG9wdGlvbnMucGFnZSAmJiBvcHRpb25zLnBhZ2Uuc2l6ZSkgcXVlcnkubGltaXQgPSBvcHRpb25zLnBhZ2Uuc2l6ZTtcclxuXHRpZiAob3B0aW9ucy5wYWdlICYmIG9wdGlvbnMucGFnZS5pbmRleCA+IDEpIHF1ZXJ5LnNraXAgPSAob3B0aW9ucy5wYWdlLmluZGV4IC0gMSkgKiBvcHRpb25zLnBhZ2Uuc2l6ZTtcclxuXHRpZiAob3B0aW9ucy5zb3J0KSBxdWVyeS5zb3J0ID0gZ2V0U29ydFN0cmluZyhvcHRpb25zLnNvcnQpO1xyXG5cdHF1ZXJ5LmV4cGFuZFJlbGF0aW9uc2hpcEZpZWxkcyA9IHRydWU7XHJcblxyXG5cdC8vIEN1c3RvbSBGaWx0ZXIgdG8gRmV0Y2ggYWxsIFJlY29yZHMgV2hpbGUgU2VsZWN0aW5nIE1hbmFnZSBBbGxcclxuXHJcblx0aWYgKG9wdGlvbnMuZmlsdGVycy5mZXRjaF9hbGxfZGF0YSkge1xyXG5cdFx0cXVlcnkubGltaXQgPSBvcHRpb25zLmZpbHRlcnMuaXRlbV9jb3VudDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAnPycgKyBxcy5zdHJpbmdpZnkocXVlcnkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIGxpc3QgaGVscGVyIGNsYXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqL1xyXG5jb25zdCBMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHQvLyBUT0RPIHRoZXNlIG9wdGlvbnMgYXJlIHBvc3NpYmx5IHVudXNlZFxyXG5cdGFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuXHR0aGlzLmNvbHVtbnMgPSBnZXRDb2x1bW5zKHRoaXMpO1xyXG5cdHRoaXMuZXhwYW5kZWREZWZhdWx0Q29sdW1ucyA9IHRoaXMuZXhwYW5kQ29sdW1ucyh0aGlzLmRlZmF1bHRDb2x1bW5zKTtcclxuXHR0aGlzLmRlZmF1bHRDb2x1bW5QYXRocyA9IHRoaXMuZXhwYW5kZWREZWZhdWx0Q29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaXRlbSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtGb3JtRGF0YX0gZm9ybURhdGEgVGhlIHN1Ym1pdHRlZCBmb3JtIGRhdGFcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB0aGUgQVBJIGNhbGxcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiAoZm9ybURhdGEsIGNhbGxiYWNrKSB7XHJcblx0eGhyKHtcclxuXHRcdHVybDogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9hcGkvJHt0aGlzLnBhdGh9L2NyZWF0ZWAsXHJcblx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0aGVhZGVyczogYXNzaWduKHt9LCBLZXlzdG9uZS5jc3JmLmhlYWRlciksXHJcblx0XHRib2R5OiBmb3JtRGF0YSxcclxuXHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRpZiAoZXJyKSBjYWxsYmFjayhlcnIpO1xyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gTk9URTogeGhyIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHdpdGggYW4gRXJyb3IgaWZcclxuXHRcdFx0Ly8gIHRoZXJlIGlzIGFuIGVycm9yIGluIHRoZSBicm93c2VyIHRoYXQgcHJldmVudHNcclxuXHRcdFx0Ly8gIHNlbmRpbmcgdGhlIHJlcXVlc3QuIEEgSFRUUCA1MDAgcmVzcG9uc2UgaXMgbm90XHJcblx0XHRcdC8vICBnb2luZyB0byBjYXVzZSBhbiBlcnJvciB0byBiZSByZXR1cm5lZC5cclxuXHRcdFx0Y2FsbGJhY2soZGF0YSwgbnVsbCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlIGEgc3BlY2lmaWMgaXRlbVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgVGhlIGlkIG9mIHRoZSBpdGVtIHdlIHdhbnQgdG8gdXBkYXRlXHJcbiAqIEBwYXJhbSAge0Zvcm1EYXRhfSBmb3JtRGF0YSBUaGUgc3VibWl0dGVkIGZvcm0gZGF0YVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHRoZSBBUEkgY2FsbFxyXG4gKi9cclxuTGlzdC5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uIChpZCwgZm9ybURhdGEsIGNhbGxiYWNrKSB7XHJcblx0eGhyKHtcclxuXHRcdHVybDogYCR7S2V5c3RvbmUuYWRtaW5QYXRofS9hcGkvJHt0aGlzLnBhdGh9LyR7aWR9YCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGJvZHk6IGZvcm1EYXRhLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soZGF0YSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5MaXN0LnByb3RvdHlwZS5leHBhbmRDb2x1bW5zID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0bGV0IG5hbWVJbmNsdWRlZCA9IGZhbHNlO1xyXG5cdGNvbnN0IGNvbHMgPSBsaXN0VG9BcnJheShpbnB1dCkubWFwKGkgPT4ge1xyXG5cdFx0Y29uc3Qgc3BsaXQgPSBpLnNwbGl0KCd8Jyk7XHJcblx0XHRsZXQgcGF0aCA9IHNwbGl0WzBdO1xyXG5cdFx0bGV0IHdpZHRoID0gc3BsaXRbMV07XHJcblx0XHRpZiAocGF0aCA9PT0gJ19fbmFtZV9fJykge1xyXG5cdFx0XHRwYXRoID0gdGhpcy5uYW1lUGF0aDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbcGF0aF07XHJcblx0XHRpZiAoIWZpZWxkKSB7XHJcblx0XHRcdC8vIFRPRE86IFN1cHBvcnQgYXJiaXRhcnkgZG9jdW1lbnQgcGF0aHNcclxuXHRcdFx0aWYgKCF0aGlzLmhpZGRlbikge1xyXG5cdFx0XHRcdGlmIChwYXRoID09PSB0aGlzLm5hbWVQYXRoKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYExpc3QgJHt0aGlzLmtleX0gZGlkIG5vdCBzcGVjaWZ5IGFueSBkZWZhdWx0IGNvbHVtbnMgb3IgYSBuYW1lIGZpZWxkYCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTGlzdCAke3RoaXMua2V5fSBzcGVjaWZpZWQgYW4gaW52YWxpZCBkZWZhdWx0IGNvbHVtbjogJHtwYXRofWApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAocGF0aCA9PT0gdGhpcy5uYW1lUGF0aCkge1xyXG5cdFx0XHRuYW1lSW5jbHVkZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmllbGQ6IGZpZWxkLFxyXG5cdFx0XHRsYWJlbDogZmllbGQubGFiZWwsXHJcblx0XHRcdHBhdGg6IGZpZWxkLnBhdGgsXHJcblx0XHRcdHR5cGU6IGZpZWxkLnR5cGUsXHJcblx0XHRcdHdpZHRoOiB3aWR0aCxcclxuXHRcdH07XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcblx0aWYgKCFuYW1lSW5jbHVkZWQpIHtcclxuXHRcdGNvbHMudW5zaGlmdCh7XHJcblx0XHRcdHR5cGU6ICdpZCcsXHJcblx0XHRcdGxhYmVsOiAnSUQnLFxyXG5cdFx0XHRwYXRoOiAnaWQnLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJldHVybiBjb2xzO1xyXG59O1xyXG5cclxuTGlzdC5wcm90b3R5cGUuZXhwYW5kU29ydCA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cdGNvbnN0IHNvcnQgPSB7XHJcblx0XHRyYXdJbnB1dDogaW5wdXQgfHwgdGhpcy5kZWZhdWx0U29ydCxcclxuXHRcdGlzRGVmYXVsdFNvcnQ6IGZhbHNlLFxyXG5cdH07XHJcblx0c29ydC5pbnB1dCA9IHNvcnQucmF3SW5wdXQ7XHJcblx0aWYgKHNvcnQuaW5wdXQgPT09ICdfX2RlZmF1bHRfXycpIHtcclxuXHRcdHNvcnQuaXNEZWZhdWx0U29ydCA9IHRydWU7XHJcblx0XHRzb3J0LmlucHV0ID0gdGhpcy5zb3J0YWJsZSA/ICdzb3J0T3JkZXInIDogdGhpcy5uYW1lUGF0aDtcclxuXHR9XHJcblx0c29ydC5wYXRocyA9IGxpc3RUb0FycmF5KHNvcnQuaW5wdXQpLm1hcChwYXRoID0+IHtcclxuXHRcdGxldCBpbnZlcnQgPSBmYWxzZTtcclxuXHRcdGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJy0nKSB7XHJcblx0XHRcdGludmVydCA9IHRydWU7XHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cigxKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhdGguY2hhckF0KDApID09PSAnKycpIHtcclxuXHRcdFx0cGF0aCA9IHBhdGguc3Vic3RyKDEpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1twYXRoXTtcclxuXHRcdGlmICghZmllbGQpIHtcclxuXHRcdFx0Ly8gVE9ETzogU3VwcG9ydCBhcmJpdGFyeSBkb2N1bWVudCBwYXRoc1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ0ludmFsaWQgU29ydCBzcGVjaWZpZWQ6JywgcGF0aCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpZWxkOiBmaWVsZCxcclxuXHRcdFx0dHlwZTogZmllbGQudHlwZSxcclxuXHRcdFx0bGFiZWw6IGZpZWxkLmxhYmVsLFxyXG5cdFx0XHRwYXRoOiBmaWVsZC5wYXRoLFxyXG5cdFx0XHRpbnZlcnQ6IGludmVydCxcclxuXHRcdH07XHJcblx0fSkuZmlsdGVyKHRydXRoeSk7XHJcblx0cmV0dXJuIHNvcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9hZCBhIHNwZWNpZmljIGl0ZW0gdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIGl0ZW1JZCAgIFRoZSBpZCBvZiB0aGUgaXRlbSB3ZSB3YW50IHRvIGxvYWRcclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9wdGlvbnNcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5sb2FkSXRlbSA9IGZ1bmN0aW9uIChpdGVtSWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdGNhbGxiYWNrID0gb3B0aW9ucztcclxuXHRcdG9wdGlvbnMgPSBudWxsO1xyXG5cdH1cclxuXHRsZXQgdXJsID0gS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucGF0aCArICcvJyArIGl0ZW1JZDtcclxuXHRjb25zdCBxdWVyeSA9IHFzLnN0cmluZ2lmeShvcHRpb25zKTtcclxuXHRpZiAocXVlcnkubGVuZ3RoKSB1cmwgKz0gJz8nICsgcXVlcnk7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcblx0XHQvLyBQYXNzIHRoZSBkYXRhIGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGFsbCBpdGVtcyBvZiBhIGxpc3QsIG9wdGlvbmFsbHkgcGFzc2luZyBvYmplY3RzIHRvIGJ1aWxkIGEgcXVlcnkgc3RyaW5nXHJcbiAqIGZvciBzb3J0aW5nIG9yIHNlYXJjaGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb3B0aW9uc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmxvYWRJdGVtcyA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyBidWlsZFF1ZXJ5U3RyaW5nKG9wdGlvbnMpO1xyXG5cdHhocih7XHJcblx0XHR1cmw6IHVybCxcclxuXHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdH0sIChlcnIsIHJlc3AsIGRhdGEpID0+IHtcclxuXHRcdGlmIChlcnIpIGNhbGxiYWNrKGVycik7XHJcblx0XHQvLyBQYXNzIHRoZSBkYXRhIGFzIHJlc3VsdCBvciBlcnJvciwgZGVwZW5kaW5nIG9uIHRoZSBzdGF0dXNDb2RlXHJcblx0XHRpZiAocmVzcC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWxsYmFjayhkYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgZG93bmxvYWQgVVJMIHRvIGRvd25sb2FkIGEgbGlzdCB3aXRoIHRoZSBjdXJyZW50IHNvcnRpbmcsIGZpbHRlcmluZyxcclxuICogc2VsZWN0aW9uIGFuZCBzZWFyY2hpbmcgb3B0aW9uc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgIFRoZSBkb3dubG9hZCBVUkxcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmdldERvd25sb2FkVVJMID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoO1xyXG5cdGNvbnN0IHBhcnRzID0gW107XHJcblx0aWYgKG9wdGlvbnMuZm9ybWF0ICE9PSAnanNvbicpIHtcclxuXHRcdG9wdGlvbnMuZm9ybWF0ID0gJ2Nzdic7XHJcblx0fVxyXG5cdHBhcnRzLnB1c2gob3B0aW9ucy5zZWFyY2ggPyAnc2VhcmNoPScgKyBvcHRpb25zLnNlYXJjaCA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuZmlsdGVycy5sZW5ndGggPyAnZmlsdGVycz0nICsgSlNPTi5zdHJpbmdpZnkoZ2V0RmlsdGVycyhvcHRpb25zLmZpbHRlcnMpKSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuY29sdW1ucyA/ICdzZWxlY3Q9JyArIG9wdGlvbnMuY29sdW1ucy5tYXAoaSA9PiBpLnBhdGgpLmpvaW4oJywnKSA6ICcnKTtcclxuXHRwYXJ0cy5wdXNoKG9wdGlvbnMuc29ydCA/ICdzb3J0PScgKyBnZXRTb3J0U3RyaW5nKG9wdGlvbnMuc29ydCkgOiAnJyk7XHJcblx0cGFydHMucHVzaCgnZXhwYW5kUmVsYXRpb25zaGlwRmllbGRzPXRydWUnKTtcclxuXHRyZXR1cm4gdXJsICsgJy9leHBvcnQuJyArIG9wdGlvbnMuZm9ybWF0ICsgJz8nICsgcGFydHMuZmlsdGVyKHRydXRoeSkuam9pbignJicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBhIHNwZWNpZmljIGl0ZW0gdmlhIHRoZSBBUElcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIGl0ZW1JZCAgIFRoZSBpZCBvZiB0aGUgaXRlbSB3ZSB3YW50IHRvIGRlbGV0ZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkxpc3QucHJvdG90eXBlLmRlbGV0ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbUlkLCBjYWxsYmFjaykge1xyXG5cdHRoaXMuZGVsZXRlSXRlbXMoW2l0ZW1JZF0sIGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYXQgb25jZSB2aWEgdGhlIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gICBpdGVtSWRzICBBbiBhcnJheSBvZiBpZHMgb2YgaXRlbXMgd2Ugd2FudCB0byBkZWxldGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5MaXN0LnByb3RvdHlwZS5kZWxldGVJdGVtcyA9IGZ1bmN0aW9uIChpdGVtSWRzLCBjYWxsYmFjaykge1xyXG5cdGNvbnN0IHVybCA9IEtleXN0b25lLmFkbWluUGF0aCArICcvYXBpLycgKyB0aGlzLnBhdGggKyAnL2RlbGV0ZSc7XHJcblx0eGhyKHtcclxuXHRcdHVybDogdXJsLFxyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRoZWFkZXJzOiBhc3NpZ24oe30sIEtleXN0b25lLmNzcmYuaGVhZGVyKSxcclxuXHRcdGpzb246IHtcclxuXHRcdFx0aWRzOiBpdGVtSWRzLFxyXG5cdFx0fSxcclxuXHR9LCAoZXJyLCByZXNwLCBib2R5KSA9PiB7XHJcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuXHRcdC8vIFBhc3MgdGhlIGJvZHkgYXMgcmVzdWx0IG9yIGVycm9yLCBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c0NvZGVcclxuXHRcdGlmIChyZXNwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRjYWxsYmFjayhudWxsLCBib2R5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhbGxiYWNrKGJvZHkpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuTGlzdC5wcm90b3R5cGUucmVvcmRlckl0ZW1zID0gZnVuY3Rpb24gKGl0ZW0sIG9sZFNvcnRPcmRlciwgbmV3U29ydE9yZGVyLCBwYWdlT3B0aW9ucywgY2FsbGJhY2spIHtcclxuXHRjb25zdCB1cmwgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wYXRoICsgJy8nICsgaXRlbS5pZCArICcvc29ydE9yZGVyLycgKyBvbGRTb3J0T3JkZXIgKyAnLycgKyBuZXdTb3J0T3JkZXIgKyAnLycgKyBidWlsZFF1ZXJ5U3RyaW5nKHBhZ2VPcHRpb25zKTtcclxuXHR4aHIoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGhlYWRlcnM6IGFzc2lnbih7fSwgS2V5c3RvbmUuY3NyZi5oZWFkZXIpLFxyXG5cdH0sIChlcnIsIHJlc3AsIGJvZHkpID0+IHtcclxuXHRcdGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ym9keSA9IEpTT04ucGFyc2UoYm9keSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFcnJvciBwYXJzaW5nIHJlc3VsdHMganNvbjonLCBlLCBib2R5KTtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gUGFzcyB0aGUgYm9keSBhcyByZXN1bHQgb3IgZXJyb3IsIGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzQ29kZVxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIGJvZHkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FsbGJhY2soYm9keSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMaXN0O1xyXG4iLCJpbXBvcnQgdXJsIGZyb20gJ2Nsb3VkaW5hcnktbWljcm91cmwnO1xyXG5jb25zdCBDTE9VRF9OQU1FID0gd2luZG93LktleXN0b25lLmNsb3VkaW5hcnkuY2xvdWRfbmFtZTtcclxuXHJcbi8qXHJcblx0VGFrZSBhIGNsb3VkaW5hcnkgcHVibGljIGlkICsgb3B0aW9ucyBvYmplY3RcclxuXHRhbmQgcmV0dXJuIGEgdXJsXHJcbiovXHJcbmZ1bmN0aW9uIGNsb3VkaW5hcnlSZXNpemUgKHB1YmxpY0lkLCBvcHRpb25zID0ge30pIHtcclxuXHRpZiAoIXB1YmxpY0lkIHx8ICFDTE9VRF9OQU1FKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB1cmwocHVibGljSWQsIHtcclxuXHRcdGNsb3VkX25hbWU6IENMT1VEX05BTUUsIC8vIHNpbmdsZSBjbG91ZCBmb3IgdGhlIGFkbWluIFVJXHJcblx0XHRxdWFsaXR5OiA4MCwgLy8gODAlIHF1YWxpdHksIHdoaWNoIH5oYWx2ZXMgaW1hZ2UgZG93bmxvYWQgc2l6ZVxyXG5cdFx0Li4ub3B0aW9ucyxcclxuXHR9KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xvdWRpbmFyeVJlc2l6ZTtcclxuIiwiLyoqXHJcblx0VmFsaWRhdGUgSGV4XHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBoZXhcclxuXHJcblx0MS4gcmVtb3ZlIGhhc2ggaWYgcHJlc2VudFxyXG5cdDIuIGNvbnZlcnQgZnJvbSAzIHRvIDYgZGlnaXQgY29sb3IgY29kZSAmIGVuc3VyZSB2YWxpZCBoZXhcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSGV4IChjb2xvcikge1xyXG5cdGNvbnN0IGhleCA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblxyXG5cdGlmIChoZXgubGVuZ3RoID09PSAzKSB7XHJcblx0XHRyZXR1cm4gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xyXG5cdH1cclxuXHRpZiAoaGV4Lmxlbmd0aCAhPT0gNikge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbG9yIHZhbHVlIHByb3ZpZGVkOiBcIiR7Y29sb3J9XCJgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBoZXg7XHJcbn07XHJcblxyXG4vKipcclxuXHRGYWRlIENvbG9yXHJcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFRha2VzIGEgaGV4aWRlY2ltYWwgY29sb3IsIGNvbnZlcnRzIGl0IHRvIFJHQiBhbmQgYXBwbGllcyBhbiBhbHBoYSB2YWx1ZS5cclxuXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yXHJcblx0QHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgKDAtMTAwKVxyXG5cclxuXHQxLiBjb252ZXJ0IGhleCB0byBSR0JcclxuXHQyLiBjb21iaW5lIGFuZCBhZGQgYWxwaGEgY2hhbm5lbFxyXG4qL1xyXG5cclxuZnVuY3Rpb24gZmFkZSAoY29sb3IsIG9wYWNpdHkgPSAxMDApIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBvcGFjaXR5IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpO1xyXG5cdGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XHJcblx0Y29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcclxuXHJcblx0Ly8gMi5cclxuXHRjb25zdCByZXN1bHQgPSAncmdiYSgnXHJcblx0XHQrIHIgKyAnLCdcclxuXHRcdCsgZyArICcsJ1xyXG5cdFx0KyBiICsgJywnXHJcblx0XHQrIGRlY2ltYWxGcmFjdGlvblxyXG5cdFx0KyAnKSc7XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0U2hhZGUgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgYSBoZXhpZGVjaW1hbCBjb2xvciwgY29udmVydHMgaXQgdG8gUkdCIGFuZCBsaWdodGVucyBvciBkYXJrZW5zXHJcblxyXG5cdEBwYXJhbSB7U3RyaW5nfSBjb2xvclxyXG5cdEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBzaGFkZSAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleCA9IHZhbGlkYXRlSGV4KGNvbG9yKTtcclxuXHJcblx0Ly8gMS5cclxuXHRsZXQgZiA9IHBhcnNlSW50KGhleCwgMTYpO1xyXG5cdGxldCB0ID0gZGVjaW1hbEZyYWN0aW9uIDwgMCA/IDAgOiAyNTU7XHJcblx0bGV0IHAgPSBkZWNpbWFsRnJhY3Rpb24gPCAwID8gZGVjaW1hbEZyYWN0aW9uICogLTEgOiBkZWNpbWFsRnJhY3Rpb247XHJcblxyXG5cdGNvbnN0IFIgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcgPSBmID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQiA9IGYgJiAweDAwMDBGRjtcclxuXHJcblx0Ly8gMi5cclxuXHRyZXR1cm4gJyMnICsgKDB4MTAwMDAwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIFIpICogcCkgKyBSKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKHQgLSBHKSAqIHApICsgRykgKiAweDEwMFxyXG5cdFx0KyAoTWF0aC5yb3VuZCgodCAtIEIpICogcCkgKyBCKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLy8gc2hhZGUgaGVscGVyc1xyXG5jb25zdCBsaWdodGVuID0gc2hhZGU7XHJcbmZ1bmN0aW9uIGRhcmtlbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRyZXR1cm4gc2hhZGUoY29sb3IsIHBlcmNlbnQgKiAtMSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcblx0QmxlbmQgQ29sb3JcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0VGFrZXMgdHdvIGhleGlkZWNpbWFsIGNvbG9ycyBhbmQgYmxlbmQgdGhlbSB0b2dldGhlclxyXG5cclxuXHRAcGFyYW0ge1N0cmluZ30gY29sb3IxXHJcblx0QHBhcmFtIHtTdHJpbmd9IGNvbG9yMlxyXG5cdEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50ICgwLTEwMClcclxuXHJcblx0MS4gZG8gZmFuY3kgUkdCIGJpdHdpc2Ugb3BlcmF0aW9uc1xyXG5cdDIuIGNvbWJpbmUgYmFjayBpbnRvIGEgaGV4IHZhbHVlXHJcbiovXHJcblxyXG5mdW5jdGlvbiBibGVuZCAoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuXHRjb25zdCBkZWNpbWFsRnJhY3Rpb24gPSBwZXJjZW50IC8gMTAwO1xyXG5cdGNvbnN0IGhleDEgPSB2YWxpZGF0ZUhleChjb2xvcjEpO1xyXG5cdGNvbnN0IGhleDIgPSB2YWxpZGF0ZUhleChjb2xvcjIpO1xyXG5cclxuXHQvLyAxLlxyXG5cdGNvbnN0IGYgPSBwYXJzZUludChoZXgxLCAxNik7XHJcblx0Y29uc3QgdCA9IHBhcnNlSW50KGhleDIsIDE2KTtcclxuXHJcblx0Y29uc3QgUjEgPSBmID4+IDE2O1xyXG5cdGNvbnN0IEcxID0gZiA+PiA4ICYgMHgwMEZGO1xyXG5cdGNvbnN0IEIxID0gZiAmIDB4MDAwMEZGO1xyXG5cclxuXHRjb25zdCBSMiA9IHQgPj4gMTY7XHJcblx0Y29uc3QgRzIgPSB0ID4+IDggJiAweDAwRkY7XHJcblx0Y29uc3QgQjIgPSB0ICYgMHgwMDAwRkY7XHJcblxyXG5cdC8vIDIuXHJcblx0cmV0dXJuICcjJyArICgweDEwMDAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKFIyIC0gUjEpICogZGVjaW1hbEZyYWN0aW9uKSArIFIxKSAqIDB4MTAwMDBcclxuXHRcdCsgKE1hdGgucm91bmQoKEcyIC0gRzEpICogZGVjaW1hbEZyYWN0aW9uKSArIEcxKSAqIDB4MTAwXHJcblx0XHQrIChNYXRoLnJvdW5kKChCMiAtIEIxKSAqIGRlY2ltYWxGcmFjdGlvbikgKyBCMSkpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YmxlbmQsXHJcblx0ZGFya2VuLFxyXG5cdGZhZGUsXHJcblx0bGlnaHRlbixcclxufTtcclxuIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb25jYXRlbmF0ZSBDbGFzc25hbWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gU3VwcG9ydCBjbGFzc05hbWUgYXMgYW4gYXJyYXk6XHJcbi8vIGZvcmNlIGNsYXNzbmFtZSBwcm9wIGludG8gYW4gYXJyYXkgKHBvc3NpYmx5IG9mIGFycmF5cykgdGhlbiBmbGF0dGVuXHJcblxyXG4vKlxyXG5cdC8vIFRvIHVzZSBzcHJlYWQgdGhlIG5ldyBhcnJheSBpbnRvIGFwaHJvZGl0ZSdzIGBjc3NgIGZ1bmN0aW9uXHJcblxyXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdFx0Y2xhc3Nlcy5jb21wb25lbnQsXHJcblx0XHRcdC4uLmNvbmNhdENsYXNzbmFtZXMoY2xhc3NOYW1lKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG5cdH07XHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNhdENsYXNzbmFtZXMgKGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBbY2xhc3NOYW1lXS5yZWR1Y2UoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhLmNvbmNhdChiKTtcclxuXHR9LCBbXSk7XHJcbn07XHJcbiIsIi8qKlxyXG5cdExpbmVhciBHcmFkaWVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRTaG9ydC1oYW5kIGhlbHBlciBmb3IgYWRkaW5nIGEgbGluZWFyIGdyYWRpZW50IHRvIHlvdXIgY29tcG9uZW50LlxyXG5cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBzaWRlT3JDb3JuZXJcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSB0b3BcclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBib3R0b21cclxuXHQtIEBwYXJhbSB7U3RyaW5nfSBiYXNlIChvcHRpb25hbClcclxuXHQtIEByZXR1cm5zIHtPYmplY3R9IGNzcyBsaW5lYXIgZ3JhZGllbnQgZGVjbGFyYXRpb25cclxuXHJcblx0U3ByZWFkIHRoZSBkZWNsYXJhdGlvbiBpbnRvIHlvdXIgY29tcG9uZW50IGNsYXNzOlxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRteUNvbXBvbmVudENsYXNzOiB7XHJcblx0XHQuLi5saW5lYXJHcmFkaWVudChyZWQsIGJsdWUpLFxyXG5cdH1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGxpbmVhckdyYWRpZW50IChkaXJlY3Rpb24sIHRvcCwgYm90dG9tLCBiYXNlID0gJycpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2RpcmVjdGlvbn0sICR7dG9wfSAwJSwgJHtib3R0b219IDEwMCUpICR7YmFzZX1gLFxyXG5cdH07XHJcbn1cclxuXHJcbi8vIFZlcnRpY2FsIEdyYWRpZW50XHJcbmZ1bmN0aW9uIGdyYWRpZW50VmVydGljYWwgKHRvcCwgYm90dG9tLCBiYXNlKSB7XHJcblx0cmV0dXJuIGxpbmVhckdyYWRpZW50KCd0byBib3R0b20nLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8vIEhvcml6b250YWwgR3JhZGllbnRcclxuZnVuY3Rpb24gZ3JhZGllbnRIb3Jpem9udGFsICh0b3AsIGJvdHRvbSwgYmFzZSkge1xyXG5cdHJldHVybiBsaW5lYXJHcmFkaWVudCgndG8gcmlnaHQnLCB0b3AsIGJvdHRvbSwgYmFzZSk7XHJcbn1cclxuXHJcbi8qKlxyXG5cdEJvcmRlciBSYWRpdXNcclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0U2hvcnQtaGFuZCBoZWxwZXIgZm9yIGJvcmRlciByYWRpaVxyXG4qL1xyXG5cclxuLy8gdG9wXHJcbmZ1bmN0aW9uIGJvcmRlclRvcFJhZGl1cyAocmFkaXVzKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJvcmRlclRvcExlZnRSYWRpdXM6IHJhZGl1cyxcclxuXHRcdGJvcmRlclRvcFJpZ2h0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gcmlnaHRcclxuZnVuY3Rpb24gYm9yZGVyUmlnaHRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21SaWdodFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyVG9wUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBib3R0b21cclxuZnVuY3Rpb24gYm9yZGVyQm90dG9tUmFkaXVzIChyYWRpdXMpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ym9yZGVyQm90dG9tTGVmdFJhZGl1czogcmFkaXVzLFxyXG5cdFx0Ym9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHJhZGl1cyxcclxuXHR9O1xyXG59XHJcblxyXG4vLyBsZWZ0XHJcbmZ1bmN0aW9uIGJvcmRlckxlZnRSYWRpdXMgKHJhZGl1cykge1xyXG5cdHJldHVybiB7XHJcblx0XHRib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0XHRib3JkZXJUb3BMZWZ0UmFkaXVzOiByYWRpdXMsXHJcblx0fTtcclxufVxyXG5cclxuLy8gUmV0dXJuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRib3JkZXJUb3BSYWRpdXMsXHJcblx0Ym9yZGVyUmlnaHRSYWRpdXMsXHJcblx0Ym9yZGVyQm90dG9tUmFkaXVzLFxyXG5cdGJvcmRlckxlZnRSYWRpdXMsXHJcblxyXG5cdGdyYWRpZW50SG9yaXpvbnRhbCxcclxuXHRncmFkaWVudFZlcnRpY2FsLFxyXG59O1xyXG4iLCIvKipcclxuICogRXhwb3J0cyBhbiBvYmplY3Qgb2YgbGlzdHMsIGtleWVkIHdpdGggdGhlaXIga2V5IGluc3RlYWQgb2YgdGhlaXIgbmFtZSBhbmRcclxuICogd3JhcHBlZCB3aXRoIHRoZSBMaXN0IGhlbHBlciAoLi9MaXN0LmpzKVxyXG4gKi9cclxuXHJcbmltcG9ydCBMaXN0IGZyb20gJy4vTGlzdCc7XHJcblxyXG5leHBvcnRzLmxpc3RzQnlLZXkgPSB7fTtcclxuZXhwb3J0cy5saXN0c0J5UGF0aCA9IHt9O1xyXG5cclxuZm9yIChjb25zdCBrZXkgaW4gS2V5c3RvbmUubGlzdHMpIHtcclxuXHQvLyBHdWFyZCBmb3ItaW5zXHJcblx0aWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoS2V5c3RvbmUubGlzdHMsIGtleSkpIHtcclxuXHRcdHZhciBsaXN0ID0gbmV3IExpc3QoS2V5c3RvbmUubGlzdHNba2V5XSk7XHJcblx0XHRleHBvcnRzLmxpc3RzQnlLZXlba2V5XSA9IGxpc3Q7XHJcblx0XHRleHBvcnRzLmxpc3RzQnlQYXRoW2xpc3QucGF0aF0gPSBsaXN0O1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQSBmZXcgaGVscGVyIG1ldGhvZHMgZm9yIHN0cmluZ3NcclxuICovXHJcblxyXG5pbXBvcnQgaW5mbGVjdCBmcm9tICdpJztcclxuaW1wb3J0IHsgY29tcGFjdCwgc2l6ZSB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBvZiBhIHN0cmluZyBiYXNlZCBvbiBhIG51bWJlclxyXG4gKiBvciBudW1iZXIgb2YgaXRlbXMgaW4gYW4gYXJyYXkuXHJcbiAqXHJcbiAqIElmIGFyaXR5IGlzIDEsIHJldHVybnMgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSB3b3JkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY291bnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNpbmd1bGFyIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGx1cmFsIHN0cmluZ1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHNpbmd1bGFyIG9yIHBsdXJhbCwgKiBpcyByZXBsYWNlZCB3aXRoIGNvdW50XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5wbHVyYWwgPSBmdW5jdGlvbiAoY291bnQsIHNuLCBwbCkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRyZXR1cm4gaW5mbGVjdC5wbHVyYWxpemUoY291bnQpO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIHNuICE9PSAnc3RyaW5nJykgc24gPSAnJztcclxuXHRpZiAoIXBsKSB7XHJcblx0XHRwbCA9IGluZmxlY3QucGx1cmFsaXplKHNuKTtcclxuXHR9XHJcblx0aWYgKHR5cGVvZiBjb3VudCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdGNvdW50ID0gTnVtYmVyKGNvdW50KTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBjb3VudCAhPT0gJ251bWJlcicpIHtcclxuXHRcdGNvdW50ID0gc2l6ZShjb3VudCk7XHJcblx0fVxyXG5cdHJldHVybiAoY291bnQgPT09IDEgPyBzbiA6IHBsKS5yZXBsYWNlKCcqJywgY291bnQpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgbGV0dGVyIGluIGEgc3RyaW5nIHRvIHVwcGVyY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gU3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy51cGNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHJldHVybiAoc3RyLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBsZXR0ZXIgaW4gYSBzdHJpbmcgdG8gbG93ZXJjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBTdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBzdHJcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLmRvd25jYXNlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdGlmIChzdHIgJiYgc3RyLnRvU3RyaW5nKSBzdHIgPSBzdHIudG9TdHJpbmcoKTtcclxuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycgfHwgIXN0ci5sZW5ndGgpIHJldHVybiAnJztcclxuXHRyZXR1cm4gKHN0ci5zdWJzdHIoMCwgMSkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHIoMSkpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byB0aXRsZSBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7U3RyaW5nfSBUaXRsZSBDYXNlIGZvcm0gb2Ygc3RyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZXhwb3J0cy50aXRsZWNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0aWYgKHN0ciAmJiBzdHIudG9TdHJpbmcpIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuICcnO1xyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEgJDInKTtcclxuXHR2YXIgcGFydHMgPSBzdHIuc3BsaXQoL1xcc3xffFxcLS8pO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChwYXJ0c1tpXSAmJiAhL15bQS1aMC05XSskLy50ZXN0KHBhcnRzW2ldKSkge1xyXG5cdFx0XHRwYXJ0c1tpXSA9IGV4cG9ydHMudXBjYXNlKHBhcnRzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGNvbXBhY3QocGFydHMpLmpvaW4oJyAnKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gY2FtZWwgY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbG93ZXJjYXNlRmlyc3RXb3JkXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gY2FtZWwtY2FzZSBmb3JtIG9mIHN0clxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmV4cG9ydHMuY2FtZWxjYXNlID0gZnVuY3Rpb24gKHN0ciwgbGMpIHtcclxuXHRyZXR1cm4gaW5mbGVjdC5jYW1lbGl6ZShzdHIsICEobGMpKTtcclxufTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJsYWNrbGlzdCBmcm9tICdibGFja2xpc3QnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgZGFya2VuLCBmYWRlIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2NvbG9yJztcclxuaW1wb3J0IEUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L2NvbnN0YW50cyc7XHJcblxyXG52YXIgQ2hlY2tib3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDaGVja2JveCcsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRyZWFkb25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29tcG9uZW50OiAnYnV0dG9uJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWN0aXZlOiBudWxsLFxyXG5cdFx0XHRmb2N1czogbnVsbCxcclxuXHRcdFx0aG92ZXI6IG51bGwsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLCBmYWxzZSk7XHJcblx0fSxcclxuXHRnZXRTdHlsZXMgKCkge1xyXG5cdFx0Y29uc3QgeyBjaGVja2VkLCByZWFkb25seSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgYWN0aXZlLCBmb2N1cywgaG92ZXIgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3QgY2hlY2tlZENvbG9yID0gJyMzOTk5ZmMnO1xyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGNoZWNrZWRDb2xvciA6ICd3aGl0ZSc7XHJcblx0XHRsZXQgYm9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4xNSkgcmdiYSgwLDAsMCwwLjEpIHJnYmEoMCwwLDAsMC4wNSknIDogJ3JnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMikgcmdiYSgwLDAsMCwwLjE1KSc7XHJcblx0XHRsZXQgYm94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICcwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4zMyknIDogJ2luc2V0IDAgMXB4IDAgcmdiYSgwLDAsMCwwLjA2KSc7XHJcblx0XHRsZXQgY29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3doaXRlJyA6ICcjYmJiJztcclxuXHRcdGNvbnN0IHRleHRTaGFkb3cgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJzAgMXB4IDAgcmdiYSgwLDAsMCwwLjIpJyA6IG51bGw7XHJcblxyXG5cdFx0Ly8gcHNldWRvIHN0YXRlXHJcblx0XHRpZiAoaG92ZXIgJiYgIWZvY3VzICYmICFyZWFkb25seSkge1xyXG5cdFx0XHRib3JkZXJDb2xvciA9IChjaGVja2VkKSA/ICdyZ2JhKDAsMCwwLDAuMSkgcmdiYSgwLDAsMCwwLjE1KSByZ2JhKDAsMCwwLDAuMiknIDogJ3JnYmEoMCwwLDAsMC4zNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4yNSknO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZSkge1xyXG5cdFx0XHRiYWNrZ3JvdW5kID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGRhcmtlbihjaGVja2VkQ29sb3IsIDIwKSA6ICcjZWVlJztcclxuXHRcdFx0Ym9yZGVyQ29sb3IgPSAoY2hlY2tlZCAmJiAhcmVhZG9ubHkpID8gJ3JnYmEoMCwwLDAsMC4yNSkgcmdiYSgwLDAsMCwwLjMpIHJnYmEoMCwwLDAsMC4zNSknIDogJ3JnYmEoMCwwLDAsMC40KSByZ2JhKDAsMCwwLDAuMzUpIHJnYmEoMCwwLDAsMC4zKSc7XHJcblx0XHRcdGJveFNoYWRvdyA9IChjaGVja2VkICYmICFyZWFkb25seSkgPyAnMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuMzMpJyA6ICdpbnNldCAwIDFweCAzcHggcmdiYSgwLDAsMCwwLjIpJztcclxuXHRcdH1cclxuXHRcdGlmIChmb2N1cyAmJiAhYWN0aXZlKSB7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/ICdyZ2JhKDAsMCwwLDAuMjUpIHJnYmEoMCwwLDAsMC4zKSByZ2JhKDAsMCwwLDAuMzUpJyA6IGNoZWNrZWRDb2xvcjtcclxuXHRcdFx0Ym94U2hhZG93ID0gKGNoZWNrZWQgJiYgIXJlYWRvbmx5KSA/IGAwIDAgMCAzcHggJHtmYWRlKGNoZWNrZWRDb2xvciwgMTUpfWAgOiBgaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4xNSksIDAgMCAwIDNweCAke2ZhZGUoY2hlY2tlZENvbG9yLCAxNSl9YDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBub2VkaXRcclxuXHRcdGlmIChyZWFkb25seSkge1xyXG5cdFx0XHRiYWNrZ3JvdW5kID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC41KSc7XHJcblx0XHRcdGJvcmRlckNvbG9yID0gJ3JnYmEoMCwwLDAsMC4xKSc7XHJcblx0XHRcdGJveFNoYWRvdyA9ICdub25lJztcclxuXHRcdFx0Y29sb3IgPSBjaGVja2VkID8gY2hlY2tlZENvbG9yIDogJyNiYmInO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0XHRiYWNrZ3JvdW5kOiBiYWNrZ3JvdW5kLFxyXG5cdFx0XHRib3JkZXI6ICcxcHggc29saWQnLFxyXG5cdFx0XHRib3JkZXJDb2xvcjogYm9yZGVyQ29sb3IsXHJcblx0XHRcdGJvcmRlclJhZGl1czogRS5ib3JkZXJSYWRpdXMuc20sXHJcblx0XHRcdGJveFNoYWRvdzogYm94U2hhZG93LFxyXG5cdFx0XHRjb2xvcjogY29sb3IsXHJcblx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRmb250U2l6ZTogMTQsXHJcblx0XHRcdGhlaWdodDogMTYsXHJcblx0XHRcdGxpbmVIZWlnaHQ6ICcxNXB4JyxcclxuXHRcdFx0b3V0bGluZTogJ25vbmUnLFxyXG5cdFx0XHRwYWRkaW5nOiAwLFxyXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG5cdFx0XHR0ZXh0U2hhZG93OiB0ZXh0U2hhZG93LFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdFx0d2lkdGg6IDE2LFxyXG5cclxuXHRcdFx0bXNUcmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdFx0TW96VHJhbnNpdGlvbjogJ2FsbCAxMjBtcyBlYXNlLW91dCcsXHJcblx0XHRcdFdlYmtpdFRyYW5zaXRpb246ICdhbGwgMTIwbXMgZWFzZS1vdXQnLFxyXG5cdFx0XHR0cmFuc2l0aW9uOiAnYWxsIDEyMG1zIGVhc2Utb3V0JyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRoYW5kbGVLZXlEb3duIChlKSB7XHJcblx0XHRpZiAoZS5rZXlDb2RlICE9PSAzMikgcmV0dXJuO1xyXG5cdFx0dGhpcy50b2dnbGVBY3RpdmUodHJ1ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVLZXlVcCAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZShmYWxzZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZU92ZXIgKCkge1xyXG5cdFx0dGhpcy50b2dnbGVIb3Zlcih0cnVlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlRG93biAoKSB7XHJcblx0XHR0aGlzLnRvZ2dsZUFjdGl2ZSh0cnVlKTtcclxuXHRcdHRoaXMudG9nZ2xlRm9jdXModHJ1ZSk7XHJcblx0fSxcclxuXHRoYW5kbGVNb3VzZVVwICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlQWN0aXZlKGZhbHNlKTtcclxuXHR9LFxyXG5cdGhhbmRsZU1vdXNlT3V0ICgpIHtcclxuXHRcdHRoaXMudG9nZ2xlSG92ZXIoZmFsc2UpO1xyXG5cdH0sXHJcblx0dG9nZ2xlQWN0aXZlIChwc2V1ZG8pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBhY3RpdmU6IHBzZXVkbyB9KTtcclxuXHR9LFxyXG5cdHRvZ2dsZUhvdmVyIChwc2V1ZG8pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBob3ZlcjogcHNldWRvIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlRm9jdXMgKHBzZXVkbykge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGZvY3VzOiBwc2V1ZG8gfSk7XHJcblx0fSxcclxuXHRoYW5kbGVDaGFuZ2UgKCkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSghdGhpcy5wcm9wcy5jaGVja2VkKTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGNoZWNrZWQsIHJlYWRvbmx5IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IHByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMsICdjaGVja2VkJywgJ2NvbXBvbmVudCcsICdvbkNoYW5nZScsICdyZWFkb25seScpO1xyXG5cdFx0cHJvcHMuc3R5bGUgPSB0aGlzLmdldFN0eWxlcygpO1xyXG5cdFx0cHJvcHMucmVmID0gJ2NoZWNrYm94JztcclxuXHRcdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ29jdGljb24nLCB7XHJcblx0XHRcdCdvY3RpY29uLWNoZWNrJzogY2hlY2tlZCxcclxuXHRcdFx0J29jdGljb24teCc6ICh0eXBlb2YgY2hlY2tlZCA9PT0gJ2Jvb2xlYW4nKSAmJiAhY2hlY2tlZCAmJiByZWFkb25seSxcclxuXHRcdH0pO1xyXG5cdFx0cHJvcHMudHlwZSA9IHJlYWRvbmx5ID8gbnVsbCA6ICdidXR0b24nO1xyXG5cclxuXHRcdHByb3BzLm9uS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bjtcclxuXHRcdHByb3BzLm9uS2V5VXAgPSB0aGlzLmhhbmRsZUtleVVwO1xyXG5cclxuXHRcdHByb3BzLm9uTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd247XHJcblx0XHRwcm9wcy5vbk1vdXNlVXAgPSB0aGlzLmhhbmRsZU1vdXNlVXA7XHJcblx0XHRwcm9wcy5vbk1vdXNlT3ZlciA9IHRoaXMuaGFuZGxlTW91c2VPdmVyO1xyXG5cdFx0cHJvcHMub25Nb3VzZU91dCA9IHRoaXMuaGFuZGxlTW91c2VPdXQ7XHJcblxyXG5cdFx0cHJvcHMub25DbGljayA9IHJlYWRvbmx5ID8gbnVsbCA6IHRoaXMuaGFuZGxlQ2hhbmdlO1xyXG5cdFx0cHJvcHMub25Gb2N1cyA9IHJlYWRvbmx5ID8gbnVsbCA6ICgpID0+IHRoaXMudG9nZ2xlRm9jdXModHJ1ZSk7XHJcblx0XHRwcm9wcy5vbkJsdXIgPSByZWFkb25seSA/IG51bGwgOiAoKSA9PiB0aGlzLnRvZ2dsZUZvY3VzKGZhbHNlKTtcclxuXHJcblx0XHRjb25zdCBub2RlID0gcmVhZG9ubHkgPyAnc3BhbicgOiB0aGlzLnByb3BzLmNvbXBvbmVudDtcclxuXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChub2RlLCBwcm9wcyk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vLyBOT1RFIG1hcmdpbkJvdHRvbSBvZiAxcHggc3RvcHMgdGhpbmdzIGp1bXBpbmcgYXJvdW5kXHJcbi8vIFRPRE8gZmluZCBvdXQgd2h5IHRoaXMgaXMgbmVjZXNzYXJ5XHJcblxyXG5mdW5jdGlvbiBDb2xsYXBzZWRGaWVsZExhYmVsICh7IHN0eWxlLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3QgX19zdHlsZV9fID0ge1xyXG5cdFx0bWFyZ2luQm90dG9tOiAxLFxyXG5cdFx0cGFkZGluZ0xlZnQ6IDAsXHJcblx0XHRwYWRkaW5nUmlnaHQ6IDAsXHJcblx0XHQuLi5zdHlsZSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PEJ1dHRvbiB2YXJpYW50PVwibGlua1wiIHN0eWxlPXtfX3N0eWxlX199IHsuLi5wcm9wc30gLz5cclxuXHQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb2xsYXBzZWRGaWVsZExhYmVsO1xyXG4iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBEYXlQaWNrZXIgZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFBvcG91dCBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9Qb3BvdXQnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5sZXQgbGFzdElkID0gMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRGF0ZUlucHV0JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZvcm1hdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRcdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXQ6ICdZWVlZLU1NLUREJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xyXG5cdFx0Y29uc3QgaWQgPSArK2xhc3RJZDtcclxuXHRcdGxldCBtb250aCA9IG5ldyBEYXRlKCk7XHJcblx0XHRjb25zdCB7IGZvcm1hdCwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZiAobW9tZW50KHZhbHVlLCBmb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRtb250aCA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGlkOiBgX0RhdGVJbnB1dF8ke2lkfWAsXHJcblx0XHRcdG1vbnRoOiBtb250aCxcclxuXHRcdFx0cGlja2VySXNPcGVuOiBmYWxzZSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogdmFsdWUsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5zaG93Q3VycmVudE1vbnRoKCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV3UHJvcHMpIHtcclxuXHRcdGlmIChuZXdQcm9wcy52YWx1ZSA9PT0gdGhpcy5wcm9wcy52YWx1ZSkgcmV0dXJuO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdG1vbnRoOiBtb21lbnQobmV3UHJvcHMudmFsdWUsIHRoaXMucHJvcHMuZm9ybWF0KS50b0RhdGUoKSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogbmV3UHJvcHMudmFsdWUsXHJcblx0XHR9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0Zm9jdXMgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlZnMuaW5wdXQpIHJldHVybjtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5pbnB1dCkuZm9jdXMoKTtcclxuXHR9LFxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChlKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiB2YWx1ZSB9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0aGFuZGxlS2V5UHJlc3MgKGUpIHtcclxuXHRcdGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdC8vIElmIHRoZSBkYXRlIGlzIHN0cmljdGx5IGVxdWFsIHRvIHRoZSBmb3JtYXQgc3RyaW5nLCBkaXNwYXRjaCBvbkNoYW5nZVxyXG5cdFx0XHRpZiAobW9tZW50KHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlIH0pO1xyXG5cdFx0XHQvLyBJZiB0aGUgZGF0ZSBpcyBub3Qgc3RyaWN0bHkgZXF1YWwsIG9ubHkgY2hhbmdlIHRoZSB0YWIgdGhhdCBpcyBkaXNwbGF5ZWRcclxuXHRcdFx0fSBlbHNlIGlmIChtb21lbnQodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdCkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRtb250aDogbW9tZW50KHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgdGhpcy5wcm9wcy5mb3JtYXQpLnRvRGF0ZSgpLFxyXG5cdFx0XHRcdH0sIHRoaXMuc2hvd0N1cnJlbnRNb250aCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZURheVNlbGVjdCAoZSwgZGF0ZSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdHZhciB2YWx1ZSA9IG1vbWVudChkYXRlKS5mb3JtYXQodGhpcy5wcm9wcy5mb3JtYXQpO1xyXG5cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZSB9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRwaWNrZXJJc09wZW46IGZhbHNlLFxyXG5cdFx0XHRtb250aDogZGF0ZSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3dQaWNrZXIgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBpY2tlcklzT3BlbjogdHJ1ZSB9LCB0aGlzLnNob3dDdXJyZW50TW9udGgpO1xyXG5cdH0sXHJcblx0c2hvd0N1cnJlbnRNb250aCAoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVmcy5waWNrZXIpIHJldHVybjtcclxuXHRcdHRoaXMucmVmcy5waWNrZXIuc2hvd01vbnRoKHRoaXMuc3RhdGUubW9udGgpO1xyXG5cdH0sXHJcblx0aGFuZGxlRm9jdXMgKGUpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlLnBpY2tlcklzT3BlbikgcmV0dXJuO1xyXG5cdFx0dGhpcy5zaG93UGlja2VyKCk7XHJcblx0fSxcclxuXHRoYW5kbGVDYW5jZWwgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBpY2tlcklzT3BlbjogZmFsc2UgfSk7XHJcblx0fSxcclxuXHRoYW5kbGVCbHVyIChlKSB7XHJcblx0XHRsZXQgcnQgPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS5uYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0O1xyXG5cdFx0Y29uc3QgcG9wb3V0ID0gdGhpcy5yZWZzLnBvcG91dC5nZXRQb3J0YWxET01Ob2RlKCk7XHJcblx0XHR3aGlsZSAocnQpIHtcclxuXHRcdFx0aWYgKHJ0ID09PSBwb3BvdXQpIHJldHVybjtcclxuXHRcdFx0cnQgPSBydC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdHBpY2tlcklzT3BlbjogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCBzZWxlY3RlZERheSA9IHRoaXMucHJvcHMudmFsdWU7XHJcblx0XHQvLyByZWFjdC1kYXktcGlja2VyIGFkZHMgYSBjbGFzcyB0byB0aGUgc2VsZWN0ZWQgZGF5IGJhc2VkIG9uIHRoaXNcclxuXHRcdGNvbnN0IG1vZGlmaWVycyA9IHtcclxuXHRcdFx0c2VsZWN0ZWQ6IChkYXkpID0+IG1vbWVudChkYXkpLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCkgPT09IHNlbGVjdGVkRGF5LFxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRpZD17dGhpcy5zdGF0ZS5pZH1cclxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cclxuXHRcdFx0XHRcdG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcblx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxyXG5cdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5oYW5kbGVLZXlQcmVzc31cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLmZvcm1hdH1cclxuXHRcdFx0XHRcdHJlZj1cImlucHV0XCJcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLmlucHV0VmFsdWV9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8UG9wb3V0XHJcblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUucGlja2VySXNPcGVufVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e3RoaXMuaGFuZGxlQ2FuY2VsfVxyXG5cdFx0XHRcdFx0cmVmPVwicG9wb3V0XCJcclxuXHRcdFx0XHRcdHJlbGF0aXZlVG9JRD17dGhpcy5zdGF0ZS5pZH1cclxuXHRcdFx0XHRcdHdpZHRoPXsyNjB9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8RGF5UGlja2VyXHJcblx0XHRcdFx0XHRcdG1vZGlmaWVycz17bW9kaWZpZXJzfVxyXG5cdFx0XHRcdFx0XHRvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheVNlbGVjdH1cclxuXHRcdFx0XHRcdFx0cmVmPVwicGlja2VyXCJcclxuXHRcdFx0XHRcdFx0dGFiSW5kZXg9ey0xfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L1BvcG91dD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcbmltcG9ydCB7IGZhZGUgfSBmcm9tICcuLi8uLi9hZG1pbi9jbGllbnQvdXRpbHMvY29sb3InO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3RoZW1lJztcclxuXHJcbmZ1bmN0aW9uIEZpbGVDaGFuZ2VNZXNzYWdlICh7IHN0eWxlLCBjb2xvciwgLi4ucHJvcHMgfSkge1xyXG5cdGNvbnN0IHN0eWxlcyA9IHtcclxuXHRcdG1hcmdpblJpZ2h0OiAxMCxcclxuXHRcdG1pbldpZHRoOiAwLFxyXG5cdFx0Li4uc3R5bGUsXHJcblx0fTtcclxuXHJcblx0aWYgKGNvbG9yICE9PSAnZGVmYXVsdCcpIHtcclxuXHRcdHN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IgPSBmYWRlKHRoZW1lLmNvbG9yW2NvbG9yXSwgMTApO1xyXG5cdFx0c3R5bGVzLmJvcmRlckNvbG9yID0gZmFkZSh0aGVtZS5jb2xvcltjb2xvcl0sIDMwKTtcclxuXHRcdHN0eWxlcy5jb2xvciA9IHRoZW1lLmNvbG9yW2NvbG9yXTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdG5vZWRpdFxyXG5cdFx0XHRzdHlsZT17c3R5bGVzfVxyXG5cdFx0XHR7Li4ucHJvcHN9XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5GaWxlQ2hhbmdlTWVzc2FnZS5wcm9wVHlwZXMgPSB7XHJcblx0Y29sb3I6IFByb3BUeXBlcy5vbmVPZihbJ2RhbmdlcicsICdkZWZhdWx0JywgJ3N1Y2Nlc3MnXSksXHJcbn07XHJcbkZpbGVDaGFuZ2VNZXNzYWdlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb2xvcjogJ2RlZmF1bHQnLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWxlQ2hhbmdlTWVzc2FnZTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLypcclxuXHRFeHBvc2UgaW50ZXJuYWwgcmVmIHRvIHBhcmVudFxyXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdEZpZWxkLmNyZWF0ZSh7XHJcblx0XHR0cmlnZ2VyRmlsZUJyb3dzZXIgKCkge1xyXG5cdFx0XHR0aGlzLnJlZnMuZmlsZUlucHV0LmNsaWNrRG9tTm9kZSgpO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlciAoKSB7XHJcblx0XHRcdDxIaWRkZW5GaWxlSW5wdXQgcmVmPVwiZmlsZUlucHV0XCIgLz5cclxuXHRcdH1cclxuXHR9KTtcclxuKi9cclxuXHJcbmNsYXNzIEhpZGRlbkZpbGVJbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmNsZWFyVmFsdWUgPSB0aGlzLmNsZWFyVmFsdWUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2xpY2tEb21Ob2RlID0gdGhpcy5jbGlja0RvbU5vZGUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFzVmFsdWUgPSB0aGlzLmhhc1ZhbHVlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdGNsZWFyVmFsdWUgKCkge1xyXG5cdFx0dGhpcy50YXJnZXQudmFsdWUgPSAnJztcclxuXHR9XHJcblx0Y2xpY2tEb21Ob2RlICgpIHtcclxuXHRcdHRoaXMudGFyZ2V0LmNsaWNrKCk7XHJcblx0fVxyXG5cdGhhc1ZhbHVlICgpIHtcclxuXHRcdHJldHVybiAhIXRoaXMudGFyZ2V0LnZhbHVlO1xyXG5cdH1cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBzdHlsZSwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBzZXRSZWYgPSAobikgPT4gKHRoaXMudGFyZ2V0ID0gbik7XHJcblx0XHRjb25zdCBzdHlsZXMgPSB7XHJcblx0XHRcdGxlZnQ6IC05OTk5LFxyXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuXHRcdFx0Li4uc3R5bGUsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdHsuLi5wcm9wc31cclxuXHRcdFx0XHRzdHlsZT17c3R5bGVzfVxyXG5cdFx0XHRcdHJlZj17c2V0UmVmfVxyXG5cdFx0XHRcdHRhYkluZGV4PVwiLTFcIlxyXG5cdFx0XHRcdHR5cGU9XCJmaWxlXCJcclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG5cclxuSGlkZGVuRmlsZUlucHV0LnByb3BUeXBlcyA9IHtcclxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGlkZGVuRmlsZUlucHV0O1xyXG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdnbGFtb3InO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L3RoZW1lJztcclxuXHJcbi8vIEZJWE1FIHN0YXRpYyBvY3RpY29uIGNsYXNzZXMgbGVhbmluZyBvbiBFbGVtZW50YWwgdG8gYXZvaWQgZHVwbGljYXRlXHJcbi8vIGZvbnQgYW5kIENTUzsgaW5mbGF0aW5nIHRoZSBwcm9qZWN0IHNpemVcclxuXHJcbmNvbnN0IElDT05fTUFQID0ge1xyXG5cdGxvYWRpbmc6ICcnLFxyXG5cdHJlbW92ZTogJ21lZ2Etb2N0aWNvbiBvY3RpY29uLXRyYXNoY2FuJyxcclxuXHR1cGxvYWQ6ICdtZWdhLW9jdGljb24gb2N0aWNvbi1jbG91ZC11cGxvYWQnLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gSW1hZ2VUaHVtYm5haWwgKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgY29tcG9uZW50LCBtYXNrLCAuLi5wcm9wcyB9KSB7XHJcblx0Y29uc3QgbWFza1VJID0gbWFzayA/IChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5tYXNrKSArIGAgJHtJQ09OX01BUFttYXNrXX1gfT5cclxuXHRcdFx0e21hc2sgPT09ICdsb2FkaW5nJ1xyXG5cdFx0XHRcdD8gPFNwaW5uZXIgY29sb3I9XCJpbnZlcnRlZFwiIC8+XHJcblx0XHRcdFx0OiBudWxsfVxyXG5cdFx0PC9kaXY+XHJcblx0KSA6IG51bGw7XHJcblxyXG5cdC8vIGFwcGx5IGhvdmVyIGFuZCBmb2N1cyBzdHlsZXMgb25seSB3aGVuIHVzaW5nIGFuIGFuY2hvclxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNzcyhcclxuXHRcdGNsYXNzZXMuYmFzZSxcclxuXHRcdGNvbXBvbmVudCA9PT0gJ2EnID8gY2xhc3Nlcy5hbmNob3IgOiBudWxsLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0Ly8gYXBwZW5kIHRoZSBtYXNrIFVJIHRvIGNoaWxkcmVuXHJcblx0cHJvcHMuY2hpbGRyZW4gPSBbXS5jb25jYXQoY2hpbGRyZW4sIFttYXNrVUldKTtcclxuXHJcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn07XHJcblxyXG5JbWFnZVRodW1ibmFpbC5wcm9wVHlwZXMgPSB7XHJcblx0Y29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRQcm9wVHlwZXMuZnVuYyxcclxuXHRdKSxcclxuXHRtYXNrOiBQcm9wVHlwZXMub25lT2YoWydsb2FkaW5nJywgJ3JlbW92ZScsICd1cGxvYWQnXSksXHJcbn07XHJcbkltYWdlVGh1bWJuYWlsLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdzcGFuJyxcclxufTtcclxuXHJcbi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJhcy1uZWVkZWRcIl0gKi9cclxuY29uc3QgR1VUVEVSX1dJRFRIID0gNDtcclxuY29uc3QgaG92ZXJBbmRGb2N1c1N0eWxlcyA9IHtcclxuXHRib3JkZXJDb2xvcjogdGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmZvY3VzLFxyXG5cdG91dGxpbmU6ICdub25lJyxcclxufTtcclxuY29uc3QgY2xhc3NlcyA9IHtcclxuXHRiYXNlOiB7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXHJcblx0XHRib3JkZXJSYWRpdXM6IHRoZW1lLmJvcmRlclJhZGl1cy5kZWZhdWx0LFxyXG5cdFx0Ym9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuaW5wdXQuYm9yZGVyLmNvbG9yLmRlZmF1bHR9YCxcclxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRsaW5lSGVpZ2h0OiAnMScsXHJcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxyXG5cdFx0cGFkZGluZzogR1VUVEVSX1dJRFRILFxyXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXHJcblx0fSxcclxuXHRhbmNob3I6IHtcclxuXHRcdCc6aG92ZXInOiBob3ZlckFuZEZvY3VzU3R5bGVzLFxyXG5cdFx0Jzpmb2N1cyc6IHtcclxuXHRcdFx0Li4uaG92ZXJBbmRGb2N1c1N0eWxlcyxcclxuXHRcdFx0Ym94U2hhZG93OiB0aGVtZS5pbnB1dC5ib3hTaGFkb3dGb2N1cyxcclxuXHRcdH0sXHJcblx0fSxcclxuXHJcblx0Ly8gbWFza1xyXG5cdG1hc2s6IHtcclxuXHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcclxuXHRcdGJvdHRvbTogR1VUVEVSX1dJRFRILFxyXG5cdFx0Y29sb3I6ICd3aGl0ZScsXHJcblx0XHRkaXNwbGF5OiAnZmxleCcsXHJcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcblx0XHRsZWZ0OiBHVVRURVJfV0lEVEgsXHJcblx0XHRsaW5lSGVpZ2h0OiA5MCxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcclxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0cmlnaHQ6IEdVVFRFUl9XSURUSCxcclxuXHRcdHRleHRBbGlnbjogJ2NlbnRlcicsXHJcblx0XHR0b3A6IEdVVFRFUl9XSURUSCxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbWFnZVRodW1ibmFpbDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5mdW5jdGlvbiBJdGVtc1RhYmxlQ2VsbCAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pIHtcclxuXHRwcm9wcy5jbGFzc05hbWUgPSBjbGFzc25hbWVzKCdJdGVtTGlzdF9fY29sJywgY2xhc3NOYW1lKTtcclxuXHJcblx0cmV0dXJuIDx0ZCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1RhYmxlQ2VsbDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5cclxuZnVuY3Rpb24gSXRlbXNUYWJsZVZhbHVlICh7XHJcblx0Y2xhc3NOYW1lLFxyXG5cdGNvbXBvbmVudCxcclxuXHRlbXB0eSxcclxuXHRleHRlcmlvcixcclxuXHRmaWVsZCxcclxuXHRocmVmLFxyXG5cdGludGVyaW9yLFxyXG5cdHBhZGRlZCxcclxuXHR0byxcclxuXHR0cnVuY2F0ZSxcclxuXHQuLi5wcm9wc1xyXG59KSB7XHJcblx0Ly8gVE9ETyByZW1vdmUgaW4gdGhlIG5leHQgcmVsZWFzZVxyXG5cdGlmIChocmVmKSB7XHJcblx0XHRjb25zb2xlLndhcm4oJ0l0ZW1zVGFibGVWYWx1ZTogYGhyZWZgIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiB0aGUgbmV4dCByZWxlYXNlLCB1c2UgYHRvYC4nKTtcclxuXHR9XHJcblx0Y29uc3QgbGlua1JlZiA9IHRvIHx8IGhyZWY7XHJcblx0Y29uc3QgQ29tcG9uZW50ID0gbGlua1JlZiA/IExpbmsgOiBjb21wb25lbnQ7XHJcblxyXG5cdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoJ0l0ZW1MaXN0X192YWx1ZScsIChcclxuXHRcdGZpZWxkID8gYEl0ZW1MaXN0X192YWx1ZS0tJHtmaWVsZH1gIDogbnVsbFxyXG5cdCksIHtcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tZW1wdHknOiBlbXB0eSxcclxuXHRcdCdJdGVtTGlzdF9fbGluay0tZXh0ZXJpb3InOiBsaW5rUmVmICYmIGV4dGVyaW9yLFxyXG5cdFx0J0l0ZW1MaXN0X19saW5rLS1pbnRlcmlvcic6IGxpbmtSZWYgJiYgaW50ZXJpb3IsXHJcblx0XHQnSXRlbUxpc3RfX2xpbmstLXBhZGRlZCc6IGxpbmtSZWYgJiYgcGFkZGVkLFxyXG5cdFx0J0l0ZW1MaXN0X192YWx1ZS0tdHJ1bmNhdGUnOiB0cnVuY2F0ZSxcclxuXHR9LCBjbGFzc05hbWUpO1xyXG5cdHByb3BzLnRvID0gbGlua1JlZjtcclxuXHRwcm9wcy50aXRsZSA9IHByb3BzLmNoaWxkcmVuO1xyXG5cclxuXHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xyXG59O1xyXG5cclxuSXRlbXNUYWJsZVZhbHVlLnByb3BUeXBlcyA9IHtcclxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cdF0pLFxyXG5cdGVtcHR5OiBQcm9wVHlwZXMuYm9vbCxcclxuXHRleHRlcmlvcjogUHJvcFR5cGVzLmJvb2wsIC8vIEZJWE1FIHRoaXMgc2hvdWxkIGJlIFwiZXh0ZXJuYWxcIiBlLmcuIGFuIGV4dGVybmFsIGxpbmtcclxuXHRmaWVsZDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBUT0RPIHJlbW92ZSBpbiBuZXh0IHJlbGVhc2VcclxuXHRpbnRlcmlvcjogUHJvcFR5cGVzLmJvb2wsIC8vIEZJWE1FIHRoaXMgc2hvdWxkIGJlIFwiaW50ZXJuYWxcIiBlLmcuIGFuIGludGVybmFsIGxpbmtcclxuXHRwYWRkZWQ6IFByb3BUeXBlcy5ib29sLFxyXG5cdHRvOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdHRydW5jYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuSXRlbXNUYWJsZVZhbHVlLmRlZmF1bHRQcm9wcyA9IHtcclxuXHRjb21wb25lbnQ6ICdkaXYnLFxyXG5cdHRydW5jYXRlOiB0cnVlLFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1RhYmxlVmFsdWU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBJTUFHRV9TSVpFID0gMTg7XHJcblxyXG5jb25zdCBsaW5rU3R5bGUgPSB7XHJcblx0bWFyZ2luUmlnaHQ6IDgsXHJcbn07XHJcbmNvbnN0IGJveFN0eWxlID0ge1xyXG5cdGJvcmRlclJhZGl1czogMyxcclxuXHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRoZWlnaHQ6IElNQUdFX1NJWkUsXHJcblx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG5cdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdHdpZHRoOiBJTUFHRV9TSVpFLFxyXG59O1xyXG5jb25zdCBpbWFnZVN0eWxlID0ge1xyXG5cdGRpc3BsYXk6ICdibG9jaycsXHJcblx0aGVpZ2h0OiBJTUFHRV9TSVpFLFxyXG5cdGxlZnQ6ICc1MCUnLFxyXG5cdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG5cclxuXHRXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRNb3pUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcclxuXHRtc1RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG5cdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxyXG59O1xyXG5jb25zdCB0ZXh0U3R5bGUgPSB7XHJcblx0Y29sb3I6ICcjODg4JyxcclxuXHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRmb250U2l6ZTogJy44cmVtJyxcclxuXHRtYXJnaW5MZWZ0OiA4LFxyXG5cdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG59O1xyXG5cclxudmFyIENsb3VkaW5hcnlJbWFnZVN1bW1hcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDbG91ZGluYXJ5SW1hZ2VTdW1tYXJ5JyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGltYWdlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnZGltZW5zaW9ucycsICdwdWJsaWNJZCddKSxcclxuXHR9LFxyXG5cdHJlbmRlckxhYmVsICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5sYWJlbCkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgbGFiZWwsIGltYWdlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGxldCB0ZXh0O1xyXG5cdFx0aWYgKGxhYmVsID09PSAnZGltZW5zaW9ucycpIHtcclxuXHRcdFx0dGV4dCA9IGAke2ltYWdlLndpZHRofSDDlyAke2ltYWdlLmhlaWdodH1gO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCA9IGAke2ltYWdlLnB1YmxpY19pZH0uJHtpbWFnZS5mb3JtYXR9YDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBzdHlsZT17dGV4dFN0eWxlfT5cclxuXHRcdFx0XHR7dGV4dH1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckltYWdlVGh1bWJuYWlsICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pbWFnZSkgcmV0dXJuO1xyXG5cdFx0Y29uc3QgdXJsID0gdGhpcy5wcm9wcy5pbWFnZS51cmwucmVwbGFjZSgvaW1hZ2VcXC91cGxvYWQvLCBgaW1hZ2UvdXBsb2FkL2NfdGh1bWIsZ19mYWNlLGhfJHtJTUFHRV9TSVpFfSx3XyR7SU1BR0VfU0laRX1gKTtcclxuXHRcdHJldHVybiA8aW1nIHNyYz17dXJsfSBzdHlsZT17aW1hZ2VTdHlsZX0gY2xhc3NOYW1lPVwiaW1nLWxvYWRcIiAvPjtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBzdHlsZT17bGlua1N0eWxlfT5cclxuXHRcdFx0XHQ8c3BhbiBzdHlsZT17Ym94U3R5bGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVySW1hZ2VUaHVtYm5haWwoKX1cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTGFiZWwoKX1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2xvdWRpbmFyeUltYWdlU3VtbWFyeTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBJZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0lkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRsaXN0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuaWQ7XHJcblx0XHRpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHBhZGRlZCBpbnRlcmlvciB0aXRsZT17dmFsdWV9IHRvPXtLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyB0aGlzLnByb3BzLmxpc3QucGF0aCArICcvJyArIHZhbHVlfSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJZENvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBJbnZhbGlkQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnSW52YWxpZENvbHVtbicsXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjb2w6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHQoSW52YWxpZCBUeXBlOiB7dGhpcy5wcm9wcy5jb2wudHlwZX0pXHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkQ29sdW1uO1xyXG4iLCJpbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IGV2YWxEZXBlbmRzT24gZnJvbSAnLi4vdXRpbHMvZXZhbERlcGVuZHNPbi5qcyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUZpZWxkLCBGb3JtSW5wdXQsIEZvcm1Ob3RlIH0gZnJvbSAnLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XHJcbmltcG9ydCBDb2xsYXBzZWRGaWVsZExhYmVsIGZyb20gJy4uL2NvbXBvbmVudHMvQ29sbGFwc2VkRmllbGRMYWJlbCc7XHJcblxyXG5mdW5jdGlvbiBpc09iamVjdCAoYXJnKSB7XHJcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVTcGVjIChzcGVjKSB7XHJcblx0aWYgKCFzcGVjKSBzcGVjID0ge307XHJcblx0aWYgKCFpc09iamVjdChzcGVjLnN1cHBvcnRzKSkge1xyXG5cdFx0c3BlYy5zdXBwb3J0cyA9IHt9O1xyXG5cdH1cclxuXHRpZiAoIXNwZWMuZm9jdXNUYXJnZXRSZWYpIHtcclxuXHRcdHNwZWMuZm9jdXNUYXJnZXRSZWYgPSAnZm9jdXNUYXJnZXQnO1xyXG5cdH1cclxuXHRyZXR1cm4gc3BlYztcclxufVxyXG5cclxudmFyIEJhc2UgPSBtb2R1bGUuZXhwb3J0cy5CYXNlID0ge1xyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWRtaW5QYXRoOiBLZXlzdG9uZS5hZG1pblBhdGgsXHJcblx0XHRcdGlucHV0UHJvcHM6IHt9LFxyXG5cdFx0XHRsYWJlbFByb3BzOiB7fSxcclxuXHRcdFx0dmFsdWVQcm9wczoge30sXHJcblx0XHRcdHNpemU6ICdmdWxsJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHRnZXRJbnB1dE5hbWUgKHBhdGgpIHtcclxuXHRcdC8vIFRoaXMgY29ycmVjdGx5IGNyZWF0ZXMgdGhlIHBhdGggZm9yIGZpZWxkIGlucHV0cywgYW5kIHN1cHBvcnRzIHRoZVxyXG5cdFx0Ly8gaW5wdXROYW1lUHJlZml4IHByb3AgdGhhdCBpcyByZXF1aXJlZCBmb3IgbmVzdGVkIGZpZWxkcyB0byB3b3JrXHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dE5hbWVQcmVmaXhcclxuXHRcdFx0PyBgJHt0aGlzLnByb3BzLmlucHV0TmFtZVByZWZpeH1bJHtwYXRofV1gXHJcblx0XHRcdDogcGF0aDtcclxuXHR9LFxyXG5cdHZhbHVlQ2hhbmdlZCAoZXZlbnQpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3VsZENvbGxhcHNlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlO1xyXG5cdH0sXHJcblx0c2hvdWxkUmVuZGVyRmllbGQgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubW9kZSA9PT0gJ2NyZWF0ZScpIHJldHVybiB0cnVlO1xyXG5cdFx0cmV0dXJuICF0aGlzLnByb3BzLm5vZWRpdDtcclxuXHR9LFxyXG5cdGZvY3VzICgpIHtcclxuXHRcdGlmICghdGhpcy5yZWZzW3RoaXMuc3BlYy5mb2N1c1RhcmdldFJlZl0pIHJldHVybjtcclxuXHRcdGZpbmRET01Ob2RlKHRoaXMucmVmc1t0aGlzLnNwZWMuZm9jdXNUYXJnZXRSZWZdKS5mb2N1cygpO1xyXG5cdH0sXHJcblx0cmVuZGVyTm90ZSAoKSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMubm90ZSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIDxGb3JtTm90ZSBodG1sPXt0aGlzLnByb3BzLm5vdGV9IC8+O1xyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0Y29uc3QgeyBhdXRvRm9jdXMsIHZhbHVlLCBpbnB1dFByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dCB7Li4ue1xyXG5cdFx0XHRcdC4uLmlucHV0UHJvcHMsXHJcblx0XHRcdFx0YXV0b0ZvY3VzLFxyXG5cdFx0XHRcdGF1dG9Db21wbGV0ZTogJ29mZicsXHJcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKSxcclxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy52YWx1ZUNoYW5nZWQsXHJcblx0XHRcdFx0cmVmOiAnZm9jdXNUYXJnZXQnLFxyXG5cdFx0XHRcdHZhbHVlLFxyXG5cdFx0XHR9fSAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHJldHVybiA8Rm9ybUlucHV0IG5vZWRpdD57dGhpcy5wcm9wcy52YWx1ZX08L0Zvcm1JbnB1dD47XHJcblx0fSxcclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHR2YXIgd3JhcHBlckNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXHJcblx0XHRcdCdmaWVsZC10eXBlLScgKyB0aGlzLnByb3BzLnR5cGUsXHJcblx0XHRcdHRoaXMucHJvcHMuY2xhc3NOYW1lLFxyXG5cdFx0XHR7ICdmaWVsZC1tb25vc3BhY2UnOiB0aGlzLnByb3BzLm1vbm9zcGFjZSB9XHJcblx0XHQpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1GaWVsZCBodG1sRm9yPXt0aGlzLnByb3BzLnBhdGh9IGxhYmVsPXt0aGlzLnByb3BzLmxhYmVsfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9IGNyb3BMYWJlbD5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J0Zvcm1GaWVsZF9faW5uZXIgZmllbGQtc2l6ZS0nICsgdGhpcy5wcm9wcy5zaXplfT5cclxuXHRcdFx0XHRcdHt0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkgPyB0aGlzLnJlbmRlckZpZWxkKCkgOiB0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyTm90ZSgpfVxyXG5cdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdCk7XHJcblx0fSxcclxufTtcclxuXHJcbnZhciBNaXhpbnMgPSBtb2R1bGUuZXhwb3J0cy5NaXhpbnMgPSB7XHJcblx0Q29sbGFwc2U6IHtcclxuXHRcdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGlzQ29sbGFwc2VkOiB0aGlzLnNob3VsZENvbGxhcHNlKCksXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbXBvbmVudERpZFVwZGF0ZSAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuXHRcdFx0aWYgKHByZXZTdGF0ZS5pc0NvbGxhcHNlZCAmJiAhdGhpcy5zdGF0ZS5pc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVuY29sbGFwc2UgKCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc0NvbGxhcHNlZDogZmFsc2UsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlckNvbGxhcHNlICgpIHtcclxuXHRcdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8Q29sbGFwc2VkRmllbGRMYWJlbCBvbkNsaWNrPXt0aGlzLnVuY29sbGFwc2V9PisgQWRkIHt0aGlzLnByb3BzLmxhYmVsLnRvTG93ZXJDYXNlKCl9PC9Db2xsYXBzZWRGaWVsZExhYmVsPlxyXG5cdFx0XHRcdDwvRm9ybUZpZWxkPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gKHNwZWMpIHtcclxuXHJcblx0c3BlYyA9IHZhbGlkYXRlU3BlYyhzcGVjKTtcclxuXHJcblx0dmFyIGZpZWxkID0ge1xyXG5cdFx0c3BlYzogc3BlYyxcclxuXHRcdGRpc3BsYXlOYW1lOiBzcGVjLmRpc3BsYXlOYW1lLFxyXG5cdFx0bWl4aW5zOiBbTWl4aW5zLkNvbGxhcHNlXSxcclxuXHRcdHN0YXRpY3M6IHtcclxuXHRcdFx0Z2V0RGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmllbGQuZGVmYXVsdFZhbHVlIHx8ICcnO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHJlbmRlciAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnByb3BzLmhpZGRlbikge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghZXZhbERlcGVuZHNPbih0aGlzLnByb3BzLmRlcGVuZHNPbiwgdGhpcy5wcm9wcy52YWx1ZXMpKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNDb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJDb2xsYXBzZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzLnJlbmRlclVJKCk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdGlmIChzcGVjLnN0YXRpY3MpIHtcclxuXHRcdE9iamVjdC5hc3NpZ24oZmllbGQuc3RhdGljcywgc3BlYy5zdGF0aWNzKTtcclxuXHR9XHJcblxyXG5cdHZhciBleGNsdWRlQmFzZU1ldGhvZHMgPSB7fTtcclxuXHRpZiAoc3BlYy5taXhpbnMpIHtcclxuXHRcdHNwZWMubWl4aW5zLmZvckVhY2goZnVuY3Rpb24gKG1peGluKSB7XHJcblx0XHRcdE9iamVjdC5rZXlzKG1peGluKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRcdFx0aWYgKEJhc2VbbmFtZV0pIHtcclxuXHRcdFx0XHRcdGV4Y2x1ZGVCYXNlTWV0aG9kc1tuYW1lXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0T2JqZWN0LmFzc2lnbihmaWVsZCwgYmxhY2tsaXN0KEJhc2UsIGV4Y2x1ZGVCYXNlTWV0aG9kcykpO1xyXG5cdE9iamVjdC5hc3NpZ24oZmllbGQsIGJsYWNrbGlzdChzcGVjLCAnbWl4aW5zJywgJ3N0YXRpY3MnKSk7XHJcblxyXG5cdGlmIChBcnJheS5pc0FycmF5KHNwZWMubWl4aW5zKSkge1xyXG5cdFx0ZmllbGQubWl4aW5zID0gZmllbGQubWl4aW5zLmNvbmNhdChzcGVjLm1peGlucyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlQ2xhc3MoZmllbGQpO1xyXG5cclxufTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2hlY2tib3gnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEJvb2xlYW5Db2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdCb29sZWFuQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRydW5jYXRlPXtmYWxzZX0gZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdDxDaGVja2JveCByZWFkb25seSBjaGVja2VkPXt0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdfSAvPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb29sZWFuQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DaGVja2JveCc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE5PT1AgPSAoKSA9PiB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ0Jvb2xlYW5GaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ0Jvb2xlYW4nLFxyXG5cdH0sXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRpbmRlbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHRcdHBhdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHR9LFxyXG5cclxuXHR2YWx1ZUNoYW5nZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aDogdGhpcy5wcm9wcy5wYXRoLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHJlbmRlckZvcm1JbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0dHlwZT1cImhpZGRlblwiXHJcblx0XHRcdFx0dmFsdWU9eyEhdGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHRjb25zdCB7IGluZGVudCwgdmFsdWUsIGxhYmVsLCBwYXRoIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgZGF0YS1maWVsZC1uYW1lPXtwYXRofSBkYXRhLWZpZWxkLXR5cGU9XCJib29sZWFuXCI+XHJcblx0XHRcdFx0PEZvcm1GaWVsZCBvZmZzZXRBYnNlbnRMYWJlbD17aW5kZW50fT5cclxuXHRcdFx0XHRcdDxsYWJlbCBzdHlsZT17eyBoZWlnaHQ6ICcyLjNlbScgfX0+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckZvcm1JbnB1dCgpfVxyXG5cdFx0XHRcdFx0XHQ8Q2hlY2tib3hcclxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXt2YWx1ZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKSAmJiB0aGlzLnZhbHVlQ2hhbmdlZCkgfHwgTk9PUH1cclxuXHRcdFx0XHRcdFx0XHRyZWFkb25seT17IXRoaXMuc2hvdWxkUmVuZGVyRmllbGQoKX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJy43NWVtJyB9fT5cclxuXHRcdFx0XHRcdFx0XHR7bGFiZWx9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJOb3RlKCl9XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IFZBTFVFX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0lzIENoZWNrZWQnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5cdHsgbGFiZWw6ICdJcyBOT1QgQ2hlY2tlZCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0dmFsdWU6IHRydWUsXHJcblx0fTtcclxufVxyXG5cclxudmFyIEJvb2xlYW5GaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0c3RhdGljczoge1xyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdH07XHJcblx0fSxcclxuXHR1cGRhdGVWYWx1ZSAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gPFNlZ21lbnRlZENvbnRyb2wgZXF1YWxXaWR0aFNlZ21lbnRzIG9wdGlvbnM9e1ZBTFVFX09QVElPTlN9IHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlci52YWx1ZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9IC8+O1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb29sZWFuRmlsdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbHVtbnMvQ2xvdWRpbmFyeUltYWdlU3VtbWFyeSc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnQ2xvdWRpbmFyeUltYWdlQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUgfHwgIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHQ8Q2xvdWRpbmFyeUltYWdlU3VtbWFyeSBsYWJlbD1cImRpbWVuc2lvbnNcIiBpbWFnZT17dmFsdWV9IC8+XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDbG91ZGluYXJ5SW1hZ2VDb2x1bW47XHJcbiIsIi8qXHJcblRPRE86IENsb3VkaW5hcnlJbWFnZVR5cGUgYWN0YWxseSBzdXBwb3J0cyAncmVtb3ZlJyBhbmQgJ3Jlc2V0JyBhY3Rpb25zLCBidXRcclxudGhpcyBmaWVsZCB3aWxsIG9ubHkgc3VibWl0IGBcIlwiYCB3aGVuICdyZW1vdmUnIGlzIGNsaWNrZWQuIEBqb3NzbWFjIHdlIG5lZWQgdG9cclxud29yayBvdXQgd2hldGhlciB3ZSdyZSBnb2luZyB0byBzdXBwb3J0IGRlbGV0aW5nIHRocm91Z2ggdGhlIFVJLlxyXG4qL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IGNsb3VkaW5hcnlSZXNpemUgZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L3V0aWxzL2Nsb3VkaW5hcnlSZXNpemUnO1xyXG5pbXBvcnQgeyBCdXR0b24sIEZvcm1GaWVsZCwgRm9ybUlucHV0LCBGb3JtTm90ZSB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCBJbWFnZVRodW1ibmFpbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ltYWdlVGh1bWJuYWlsJztcclxuaW1wb3J0IEZpbGVDaGFuZ2VNZXNzYWdlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRmlsZUNoYW5nZU1lc3NhZ2UnO1xyXG5pbXBvcnQgSGlkZGVuRmlsZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGlkZGVuRmlsZUlucHV0JztcclxuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XHJcblxyXG5jb25zdCBTVVBQT1JURURfVFlQRVMgPSBbJ2ltYWdlLyonLCAnYXBwbGljYXRpb24vcGRmJywgJ2FwcGxpY2F0aW9uL3Bvc3RzY3JpcHQnXTtcclxuY29uc3QgU1VQUE9SVEVEX1JFR0VYID0gbmV3IFJlZ0V4cCgvXmltYWdlXFwvfGFwcGxpY2F0aW9uXFwvcGRmfGFwcGxpY2F0aW9uXFwvcG9zdHNjcmlwdC9nKTtcclxuXHJcbmxldCB1cGxvYWRJbmMgPSAxMDAwO1xyXG5cclxuY29uc3QgYnVpbGRJbml0aWFsU3RhdGUgPSAocHJvcHMpID0+ICh7XHJcblx0cmVtb3ZlRXhpc3Rpbmc6IGZhbHNlLFxyXG5cdHVwbG9hZEZpZWxkUGF0aDogYENsb3VkaW5hcnlJbWFnZS0ke3Byb3BzLnBhdGh9LSR7Kyt1cGxvYWRJbmN9YCxcclxuXHR1c2VyU2VsZWN0ZWRGaWxlOiBudWxsLFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbGxhcHNlOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRcdGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0bm90ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHZhbHVlOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0cHVibGljX2lkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRyZXNvdXJjZV90eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRzZWN1cmVfdXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0XHRzaWduYXR1cmU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRcdHVybDogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0dmVyc2lvbjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHR9KSxcclxuXHR9LFxyXG5cdGRpc3BsYXlOYW1lOiAnQ2xvdWRpbmFyeUltYWdlRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdDbG91ZGluYXJ5SW1hZ2UnLFxyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiAoKSA9PiAoe30pLFxyXG5cdH0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiBidWlsZEluaXRpYWxTdGF0ZSh0aGlzLnByb3BzKTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ0Nsb3VkaW5hcnlJbWFnZUZpZWxkIG5leHRQcm9wczonLCBuZXh0UHJvcHMpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzKSB7XHJcblx0XHQvLyBSZXNldCB0aGUgYWN0aW9uIHN0YXRlIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXNcclxuXHRcdC8vIFRPRE86IFdlIHNob3VsZCBhZGQgYSBjaGVjayBmb3IgYSBuZXcgaXRlbSBJRCBpbiB0aGUgc3RvcmVcclxuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLnB1YmxpY19pZCAhPT0gbmV4dFByb3BzLnZhbHVlLnB1YmxpY19pZCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRyZW1vdmVFeGlzdGluZzogZmFsc2UsXHJcblx0XHRcdFx0dXNlclNlbGVjdGVkRmlsZTogbnVsbCxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gSEVMUEVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRoYXNMb2NhbCAoKSB7XHJcblx0XHRyZXR1cm4gISF0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGU7XHJcblx0fSxcclxuXHRoYXNFeGlzdGluZyAoKSB7XHJcblx0XHRyZXR1cm4gISEodGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLnByb3BzLnZhbHVlLnVybCk7XHJcblx0fSxcclxuXHRoYXNJbWFnZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNFeGlzdGluZygpIHx8IHRoaXMuaGFzTG9jYWwoKTtcclxuXHR9LFxyXG5cdGdldEZpbGVuYW1lICgpIHtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCBoZWlnaHQsIHB1YmxpY19pZCwgd2lkdGggfSA9IHRoaXMucHJvcHMudmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZVxyXG5cdFx0XHQ/IHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZS5uYW1lXHJcblx0XHRcdDogYCR7cHVibGljX2lkfS4ke2Zvcm1hdH0gKCR7d2lkdGh9w5cke2hlaWdodH0pYDtcclxuXHR9LFxyXG5cdGdldEltYWdlU291cmNlIChoZWlnaHQgPSA5MCkge1xyXG5cdFx0Ly8gVE9ETzogVGhpcyBsZXRzIHJlYWxseSB3aWRlIGltYWdlcyBicmVhayB0aGUgbGF5b3V0XHJcblx0XHRsZXQgc3JjO1xyXG5cdFx0aWYgKHRoaXMuaGFzTG9jYWwoKSkge1xyXG5cdFx0XHRzcmMgPSB0aGlzLnN0YXRlLmRhdGFVcmk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaGFzRXhpc3RpbmcoKSkge1xyXG5cdFx0XHRzcmMgPSBjbG91ZGluYXJ5UmVzaXplKHRoaXMucHJvcHMudmFsdWUucHVibGljX2lkLCB7XHJcblx0XHRcdFx0Y3JvcDogJ2ZpdCcsXHJcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHQsXHJcblx0XHRcdFx0Zm9ybWF0OiAnanBnJyxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNyYztcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBNRVRIT0RTXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdHRyaWdnZXJGaWxlQnJvd3NlciAoKSB7XHJcblx0XHR0aGlzLnJlZnMuZmlsZUlucHV0LmNsaWNrRG9tTm9kZSgpO1xyXG5cdH0sXHJcblx0aGFuZGxlRmlsZUNoYW5nZSAoZXZlbnQpIHtcclxuXHRcdGNvbnN0IHVzZXJTZWxlY3RlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHVzZXJTZWxlY3RlZEZpbGUgfSk7XHJcblx0fSxcclxuXHJcblx0Ly8gVG9nZ2xlIHRoZSBsaWdodGJveFxyXG5cdG9wZW5MaWdodGJveCAoZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bGlnaHRib3hJc1Zpc2libGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNsb3NlTGlnaHRib3ggKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGxpZ2h0Ym94SXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIEhhbmRsZSBpbWFnZSBzZWxlY3Rpb24gaW4gZmlsZSBicm93c2VyXHJcblx0aGFuZGxlSW1hZ2VDaGFuZ2UgKGUpIHtcclxuXHRcdGlmICghd2luZG93LkZpbGVSZWFkZXIpIHtcclxuXHRcdFx0cmV0dXJuIGFsZXJ0KCdGaWxlIHJlYWRlciBub3Qgc3VwcG9ydGVkIGJ5IGJyb3dzZXIuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHR2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG5cdFx0aWYgKCFmaWxlKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCFmaWxlLnR5cGUubWF0Y2goU1VQUE9SVEVEX1JFR0VYKSkge1xyXG5cdFx0XHRyZXR1cm4gYWxlcnQoJ1Vuc3VwcG9ydGVkIGZpbGUgdHlwZS4gU3VwcG9ydGVkIGZvcm1hdHMgYXJlOiBHSUYsIFBORywgSlBHLCBCTVAsIElDTywgUERGLCBUSUZGLCBFUFMsIFBTRCwgU1ZHJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblxyXG5cdFx0cmVhZGVyLm9ubG9hZHN0YXJ0ID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsb2FkaW5nOiB0cnVlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHRyZWFkZXIub25sb2FkZW5kID0gKHVwbG9hZCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRkYXRhVXJpOiB1cGxvYWQudGFyZ2V0LnJlc3VsdCxcclxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR1c2VyU2VsZWN0ZWRGaWxlOiBmaWxlLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IGZpbGU6IGZpbGUgfSk7XHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdC8vIElmIHdlIGhhdmUgYSBsb2NhbCBmaWxlIGFkZGVkIHRoZW4gcmVtb3ZlIGl0IGFuZCByZXNldCB0aGUgZmlsZSBmaWVsZC5cclxuXHRoYW5kbGVSZW1vdmUgKGUpIHtcclxuXHRcdHZhciBzdGF0ZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUpIHtcclxuXHRcdFx0c3RhdGUudXNlclNlbGVjdGVkRmlsZSA9IG51bGw7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuaGFzRXhpc3RpbmcoKSkge1xyXG5cdFx0XHRzdGF0ZS5yZW1vdmVFeGlzdGluZyA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcblx0fSxcclxuXHR1bmRvUmVtb3ZlICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoYnVpbGRJbml0aWFsU3RhdGUodGhpcy5wcm9wcykpO1xyXG5cdH0sXHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIFJFTkRFUkVSU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRyZW5kZXJMaWdodGJveCAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmICghdmFsdWUgfHwgIXZhbHVlLnB1YmxpY19pZCkgcmV0dXJuO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaWdodGJveFxyXG5cdFx0XHRcdGN1cnJlbnRJbWFnZT17MH1cclxuXHRcdFx0XHRpbWFnZXM9e1t7IHNyYzogdGhpcy5nZXRJbWFnZVNvdXJjZSg2MDApIH1dfVxyXG5cdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzVmlzaWJsZX1cclxuXHRcdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XHJcblx0XHRcdFx0c2hvd0ltYWdlQ291bnQ9e2ZhbHNlfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckltYWdlUHJldmlldyAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdC8vIHJlbmRlciBpY29uIGZlZWRiYWNrIGZvciBpbnRlbnRcclxuXHRcdGxldCBtYXNrO1xyXG5cdFx0aWYgKHRoaXMuaGFzTG9jYWwoKSkgbWFzayA9ICd1cGxvYWQnO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZykgbWFzayA9ICdyZW1vdmUnO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5zdGF0ZS5sb2FkaW5nKSBtYXNrID0gJ2xvYWRpbmcnO1xyXG5cclxuXHRcdGNvbnN0IHNob3VsZE9wZW5MaWdodGJveCA9IHZhbHVlLmZvcm1hdCAhPT0gJ3BkZic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEltYWdlVGh1bWJuYWlsXHJcblx0XHRcdFx0Y29tcG9uZW50PVwiYVwiXHJcblx0XHRcdFx0aHJlZj17dGhpcy5nZXRJbWFnZVNvdXJjZSg2MDApfVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3Nob3VsZE9wZW5MaWdodGJveCAmJiB0aGlzLm9wZW5MaWdodGJveH1cclxuXHRcdFx0XHRtYXNrPXttYXNrfVxyXG5cdFx0XHRcdHRhcmdldD1cIl9fYmxhbmtcIlxyXG5cdFx0XHRcdHN0eWxlPXt7IGZsb2F0OiAnbGVmdCcsIG1hcmdpblJpZ2h0OiAnMWVtJyB9fVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0PGltZyBzcmM9e3RoaXMuZ2V0SW1hZ2VTb3VyY2UoKX0gc3R5bGU9e3sgaGVpZ2h0OiA5MCB9fSAvPlxyXG5cdFx0XHQ8L0ltYWdlVGh1bWJuYWlsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlckZpbGVOYW1lQW5kT3B0aW9uYWxNZXNzYWdlIChzaG93Q2hhbmdlTWVzc2FnZSA9IGZhbHNlKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgPyAoXHJcblx0XHRcdFx0XHQ8RmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdFx0XHRcdHt0aGlzLmdldEZpbGVuYW1lKCl9XHJcblx0XHRcdFx0XHQ8L0ZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHRcdCkgOiBudWxsfVxyXG5cdFx0XHRcdHtzaG93Q2hhbmdlTWVzc2FnZSAmJiB0aGlzLnJlbmRlckNoYW5nZU1lc3NhZ2UoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQ2hhbmdlTWVzc2FnZSAoKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS51c2VyU2VsZWN0ZWRGaWxlKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbGVDaGFuZ2VNZXNzYWdlIGNvbG9yPVwic3VjY2Vzc1wiPlxyXG5cdFx0XHRcdFx0U2F2ZSB0byBVcGxvYWRcclxuXHRcdFx0XHQ8L0ZpbGVDaGFuZ2VNZXNzYWdlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnN0YXRlLnJlbW92ZUV4aXN0aW5nKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEZpbGVDaGFuZ2VNZXNzYWdlIGNvbG9yPVwiZGFuZ2VyXCI+XHJcblx0XHRcdFx0XHRTYXZlIHRvIFJlbW92ZVxyXG5cdFx0XHRcdDwvRmlsZUNoYW5nZU1lc3NhZ2U+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBPdXRwdXQgW2NhbmNlbC9yZW1vdmUvdW5kb10gYnV0dG9uXHJcblx0cmVuZGVyQ2xlYXJCdXR0b24gKCkge1xyXG5cdFx0Y29uc3QgY2xlYXJUZXh0ID0gdGhpcy5oYXNMb2NhbCgpID8gJ0NhbmNlbCcgOiAnUmVtb3ZlIEltYWdlJztcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZyA/IChcclxuXHRcdFx0PEJ1dHRvbiB2YXJpYW50PVwibGlua1wiIG9uQ2xpY2s9e3RoaXMudW5kb1JlbW92ZX0+XHJcblx0XHRcdFx0VW5kbyBSZW1vdmVcclxuXHRcdFx0PC9CdXR0b24+XHJcblx0XHQpIDogKFxyXG5cdFx0XHQ8QnV0dG9uIHZhcmlhbnQ9XCJsaW5rXCIgY29sb3I9XCJjYW5jZWxcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZX0+XHJcblx0XHRcdFx0e2NsZWFyVGV4dH1cclxuXHRcdFx0PC9CdXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckltYWdlVG9vbGJhciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGtleT17dGhpcy5wcm9wcy5wYXRoICsgJ190b29sYmFyJ30gY2xhc3NOYW1lPVwiaW1hZ2UtdG9vbGJhclwiPlxyXG5cdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy50cmlnZ2VyRmlsZUJyb3dzZXJ9PlxyXG5cdFx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/ICdDaGFuZ2UnIDogJ1VwbG9hZCd9IEltYWdlXHJcblx0XHRcdFx0PC9CdXR0b24+XHJcblx0XHRcdFx0e3RoaXMuaGFzSW1hZ2UoKSA/IHRoaXMucmVuZGVyQ2xlYXJCdXR0b24oKSA6IG51bGx9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWxlSW5wdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxIaWRkZW5GaWxlSW5wdXRcclxuXHRcdFx0XHRhY2NlcHQ9e1NVUFBPUlRFRF9UWVBFUy5qb2luKCl9XHJcblx0XHRcdFx0cmVmPVwiZmlsZUlucHV0XCJcclxuXHRcdFx0XHRuYW1lPXt0aGlzLnN0YXRlLnVwbG9hZEZpZWxkUGF0aH1cclxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbWFnZUNoYW5nZX1cclxuXHRcdFx0Lz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQWN0aW9uSW5wdXQgKCkge1xyXG5cdFx0aWYgKCF0aGlzLnNob3VsZFJlbmRlckZpZWxkKCkpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY3RlZEZpbGUgfHwgdGhpcy5zdGF0ZS5yZW1vdmVFeGlzdGluZykge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdGUudXNlclNlbGVjdGVkRmlsZVxyXG5cdFx0XHRcdD8gYHVwbG9hZDoke3RoaXMuc3RhdGUudXBsb2FkRmllbGRQYXRofWBcclxuXHRcdFx0XHQ6ICcnO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxpbnB1dFxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHRjb25zdCB7IGxhYmVsLCBub3RlLCBwYXRoIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGNvbnN0IGltYWdlQ29udGFpbmVyID0gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt0aGlzLmhhc0ltYWdlKCkgPyB7IG1hcmdpbkJvdHRvbTogJzFlbScgfSA6IG51bGx9PlxyXG5cdFx0XHRcdHt0aGlzLmhhc0ltYWdlKCkgJiYgdGhpcy5yZW5kZXJJbWFnZVByZXZpZXcoKX1cclxuXHRcdFx0XHR7dGhpcy5oYXNJbWFnZSgpICYmIHRoaXMucmVuZGVyRmlsZU5hbWVBbmRPcHRpb25hbE1lc3NhZ2UodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cclxuXHRcdGNvbnN0IHRvb2xiYXIgPSB0aGlzLnNob3VsZFJlbmRlckZpZWxkKClcclxuXHRcdFx0PyB0aGlzLnJlbmRlckltYWdlVG9vbGJhcigpXHJcblx0XHRcdDogPEZvcm1JbnB1dCBub2VkaXQgLz47XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1GaWVsZCBsYWJlbD17bGFiZWx9IGNsYXNzTmFtZT1cImZpZWxkLXR5cGUtY2xvdWRpbmFyeWltYWdlXCIgaHRtbEZvcj17cGF0aH0+XHJcblx0XHRcdFx0e2ltYWdlQ29udGFpbmVyfVxyXG5cdFx0XHRcdHt0b29sYmFyfVxyXG5cdFx0XHRcdHshIW5vdGUgJiYgPEZvcm1Ob3RlIG5vdGU9e25vdGV9IC8+fVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckxpZ2h0Ym94KCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyRmlsZUlucHV0KCl9XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQWN0aW9uSW5wdXQoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VnbWVudGVkQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE9QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0lzIFNldCcsIHZhbHVlOiB0cnVlIH0sXHJcblx0eyBsYWJlbDogJ0lzIE5PVCBTZXQnLCB2YWx1ZTogZmFsc2UgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGV4aXN0czogdHJ1ZSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgQ2xvdWRpbmFyeUltYWdlRmlsdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRleGlzdHM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdH0pLFxyXG5cdH0sXHJcblx0c3RhdGljczoge1xyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0fSxcclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdH07XHJcblx0fSxcclxuXHR0b2dnbGVFeGlzdHMgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgZXhpc3RzOiB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U2VnbWVudGVkQ29udHJvbFxyXG5cdFx0XHRcdGVxdWFsV2lkdGhTZWdtZW50c1xyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUV4aXN0c31cclxuXHRcdFx0XHRvcHRpb25zPXtPUFRJT05TfVxyXG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXIuZXhpc3RzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2xvdWRpbmFyeUltYWdlRmlsdGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgRGF0ZUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1hdCA9ICh0aGlzLnByb3BzLmNvbC50eXBlID09PSAnZGF0ZXRpbWUnKSA/ICdNTU1NIERvIFlZWVksIGg6bW06c3MgYScgOiAnTU1NTSBEbyBZWVlZJztcclxuXHRcdHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0gdG89e3RoaXMucHJvcHMubGlua1RvfSBlbXB0eT17ZW1wdHl9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0ZUNvbHVtbjtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBEYXlQaWNrZXIgZnJvbSAncmVhY3QtZGF5LXBpY2tlcic7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnB1dCxcclxuXHRGb3JtU2VsZWN0LFxyXG5cdEdyaWQsXHJcblx0U2VnbWVudGVkQ29udHJvbCxcclxufSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBJTlZFUlRFRF9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdNYXRjaGVzJywgdmFsdWU6IGZhbHNlIH0sXHJcblx0eyBsYWJlbDogJ0RvZXMgTk9UIE1hdGNoJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmNvbnN0IE1PREVfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnT24nLCB2YWx1ZTogJ29uJyB9LFxyXG5cdHsgbGFiZWw6ICdBZnRlcicsIHZhbHVlOiAnYWZ0ZXInIH0sXHJcblx0eyBsYWJlbDogJ0JlZm9yZScsIHZhbHVlOiAnYmVmb3JlJyB9LFxyXG5cdHsgbGFiZWw6ICdCZXR3ZWVuJywgdmFsdWU6ICdiZXR3ZWVuJyB9LFxyXG5dO1xyXG5cclxuY29uc3QgRGF5UGlja2VySW5kaWNhdG9yID0gKHsgYWN0aXZlSW5wdXRGaWVsZCB9KSA9PiB7XHJcblx0Y29uc3Qgc3R5bGUgPSBhY3RpdmVJbnB1dEZpZWxkID09PSAnYmVmb3JlJyA/IHsgbGVmdDogJzExcmVtJyB9IDogbnVsbDtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cIkRheVBpY2tlci1JbmRpY2F0b3JcIiBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19ib3JkZXJcIiAvPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJEYXlQaWNrZXItSW5kaWNhdG9yX19iZ1wiIC8+XHJcblx0XHQ8L3NwYW4+XHJcblx0KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1vZGU6IE1PREVfT1BUSU9OU1swXS52YWx1ZSxcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHRcdGJlZm9yZTogbW9tZW50KDAsICdISCcpLmZvcm1hdCgpLFxyXG5cdFx0YWZ0ZXI6IG1vbWVudCgwLCAnSEgnKS5mb3JtYXQoKSxcclxuXHR9O1xyXG59XHJcblxyXG52YXIgRGF0ZUZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0RhdGVGaWx0ZXInLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0ZmlsdGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRtb2RlOiBQcm9wVHlwZXMub25lT2YoTU9ERV9PUFRJT05TLm1hcChpID0+IGkudmFsdWUpKSxcclxuXHRcdFx0aW52ZXJ0ZWQ6IFByb3BUeXBlcy5ib29sZWFuLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXQ6ICdERC1NTS1ZWVlZJyxcclxuXHRcdFx0ZmlsdGVyOiBnZXREZWZhdWx0VmFsdWUoKSxcclxuXHRcdFx0dmFsdWU6IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhY3RpdmVJbnB1dEZpZWxkOiAnYWZ0ZXInLFxyXG5cdFx0XHRtb250aDogbmV3IERhdGUoKSwgLy8gVGhlIG1vbnRoIHRvIGRpc3BsYXkgaW4gdGhlIGNhbGVuZGFyXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5fX2lzTW91bnRlZCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHR0aGlzLl9faXNNb3VudGVkID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTUVUSE9EU1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHR1cGRhdGVGaWx0ZXIgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHsgLi4udGhpcy5wcm9wcy5maWx0ZXIsIC4uLnZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKHZhbHVlKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkOiB2YWx1ZSB9KTtcclxuXHRcdHRoaXMuc2V0Rm9jdXModGhpcy5wcm9wcy5maWx0ZXIubW9kZSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHR0aGlzLnNldEZvY3VzKG1vZGUpO1xyXG5cdH0sXHJcblx0c2V0Rm9jdXMgKG1vZGUpIHtcclxuXHRcdC8vIGdpdmUgdGhlIFVJIGEgbW9tZW50IHRvIHJlbmRlclxyXG5cdFx0aWYgKG1vZGUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbdGhpcy5zdGF0ZS5hY3RpdmVJbnB1dEZpZWxkXSkuZm9jdXMoKTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XHJcblx0XHRcdH0sIDUwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChlKSB7XHJcblx0XHQvLyBUT0RPIEBqZWR3YXRzb25cclxuXHRcdC8vIEVudGVyaW5nIHZpcnR1YWxseSBhbnkgdmFsdWUgd2lsbCByZXR1cm4gYW4gXCJJbnZhbGlkIGRhdGVcIiwgc28gSSdtXHJcblx0XHQvLyB0ZW1wb3JhcmlseSBkaXNhYmxpbmcgdXNlciBlbnRyeS4gVGhpcyBlbnRpcmUgY29tcG9uZW50IG5lZWRzIHJldmlldy5cclxuXHJcblx0XHQvLyBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuXHRcdC8vIGxldCB7IG1vbnRoIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Ly8gLy8gQ2hhbmdlIHRoZSBjdXJyZW50IG1vbnRoIG9ubHkgaWYgdGhlIHZhbHVlIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgYSB2YWxpZFxyXG5cdFx0Ly8gLy8gZGF0ZSwgYWNjb3JkaW5nIHRvIHRoZSBgTGAgZm9ybWF0XHJcblx0XHQvLyBpZiAobW9tZW50KHZhbHVlLCAnTCcsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0Ly8gXHRtb250aCA9IG1vbWVudCh2YWx1ZSwgJ0wnKS50b0RhdGUoKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0Ly8gdGhpcy5zZXRTdGF0ZSh7IG1vbnRoIH0sIHRoaXMuc2hvd0N1cnJlbnREYXRlKTtcclxuXHR9LFxyXG5cdHNldEFjdGl2ZUZpZWxkIChmaWVsZCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGFjdGl2ZUlucHV0RmllbGQ6IGZpZWxkLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzd2l0Y2hCZXR3ZWVuQWN0aXZlSW5wdXRGaWVsZHMgKGUsIGRheSwgbW9kaWZpZXJzKSB7XHJcblx0XHRpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgYWN0aXZlSW5wdXRGaWVsZCB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGNvbnN0IHNlbmQgPSB7fTtcclxuXHRcdGNvbnN0IG5ld0FjdGl2ZUZpZWxkID0gYWN0aXZlSW5wdXRGaWVsZCA9PT0gJ2JlZm9yZSdcclxuXHRcdFx0PyAnYWZ0ZXInXHJcblx0XHRcdDogJ2JlZm9yZSc7XHJcblx0XHRzZW5kW2FjdGl2ZUlucHV0RmllbGRdID0gZGF5O1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoc2VuZCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKFxyXG5cdFx0XHR7IGFjdGl2ZUlucHV0RmllbGQ6IG5ld0FjdGl2ZUZpZWxkIH0sXHJcblx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnNbbmV3QWN0aXZlRmllbGRdKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0c2VsZWN0RGF5IChlLCBkYXksIG1vZGlmaWVycykge1xyXG5cdFx0aWYgKG1vZGlmaWVycyAmJiBtb2RpZmllcnMuZGlzYWJsZWQpIHJldHVybjtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgdmFsdWU6IGRheSB9KTtcclxuXHR9LFxyXG5cdHNob3dDdXJyZW50RGF0ZSAoKSB7XHJcblx0XHQvLyBnaXZlIHRoZSBVSSBhIG1vbWVudCB0byByZW5kZXJcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZnMuZGF5cGlja2VyLnNob3dNb250aCh0aGlzLnN0YXRlLm1vbnRoKTtcclxuXHRcdH0sIDUwKTtcclxuXHR9LFxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBSRU5ERVJFUlNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0cmVuZGVyVG9nZ2xlICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0XHRlcXVhbFdpZHRoU2VnbWVudHNcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0b3B0aW9ucz17SU5WRVJURURfT1BUSU9OU31cclxuXHRcdFx0XHRcdHZhbHVlPXtmaWx0ZXIuaW52ZXJ0ZWR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyQ29udHJvbHMgKCkge1xyXG5cdFx0bGV0IGNvbnRyb2xzO1xyXG5cdFx0Y29uc3QgeyBhY3RpdmVJbnB1dEZpZWxkIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyBpcyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0Ly8gRGF5UGlja2VyIE1vZGlmaWVycyAtIFNlbGVjdGVkIERheVxyXG5cdFx0bGV0IG1vZGlmaWVycyA9IGZpbHRlci5tb2RlID09PSAnYmV0d2VlbicgPyB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyW2FjdGl2ZUlucHV0RmllbGRdKS5pc1NhbWUoZGF5KSxcclxuXHRcdH0gOiB7XHJcblx0XHRcdHNlbGVjdGVkOiAoZGF5KSA9PiBtb21lbnQoZmlsdGVyLnZhbHVlKS5pc1NhbWUoZGF5KSxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1vZGUudmFsdWUgPT09ICdiZXR3ZWVuJykge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8R3JpZC5Sb3cgeHNtYWxsPVwib25lLWhhbGZcIiBndXR0ZXI9ezEwfT5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGF1dG9Gb2N1c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZWY9XCJhZnRlclwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiRnJvbVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUZpZWxkKCdhZnRlcicpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci5hZnRlcikuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZj1cImJlZm9yZVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiVG9cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0b25Gb2N1cz17KCkgPT4gdGhpcy5zZXRBY3RpdmVGaWVsZCgnYmVmb3JlJyl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb21lbnQoZmlsdGVyLmJlZm9yZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHRcdFx0PC9HcmlkLlJvdz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdG1vZGlmaWVycz17bW9kaWZpZXJzfVxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIkRheVBpY2tlci0tY2hyb21lXCJcclxuXHRcdFx0XHRcdFx0XHRvbkRheUNsaWNrPXt0aGlzLnN3aXRjaEJldHdlZW5BY3RpdmVJbnB1dEZpZWxkc31cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlckluZGljYXRvciBhY3RpdmVJbnB1dEZpZWxkPXthY3RpdmVJbnB1dEZpZWxkfSAvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb250cm9scyA9IChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwiaW5wdXRcIlxyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9tZW50KGZpbHRlci52YWx1ZSkuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KX1cclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuXHRcdFx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLnNob3dDdXJyZW50RGF0ZX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuXHRcdFx0XHRcdFx0PERheVBpY2tlclxyXG5cdFx0XHRcdFx0XHRcdHJlZj1cImRheXBpY2tlclwiXHJcblx0XHRcdFx0XHRcdFx0bW9kaWZpZXJzPXttb2RpZmllcnN9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiRGF5UGlja2VyLS1jaHJvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRGF5Q2xpY2s9e3RoaXMuc2VsZWN0RGF5fVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8RGF5UGlja2VySW5kaWNhdG9yIC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29udHJvbHM7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXIgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRjb25zdCBtb2RlID0gTU9ERV9PUFRJT05TLmZpbHRlcihpID0+IGkudmFsdWUgPT09IGZpbHRlci5tb2RlKVswXTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVG9nZ2xlKCl9XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxZW0nIH19PlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZWxlY3RNb2RlfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyQ29udHJvbHMoKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlRmlsdGVyO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUNvbHVtbicpO1xyXG4iLCJpbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGF0ZUlucHV0JztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtRmllbGQsXHJcblx0Rm9ybUlucHV0LFxyXG5cdEZvcm1Ob3RlLFxyXG5cdElubGluZUdyb3VwIGFzIEdyb3VwLFxyXG5cdElubGluZUdyb3VwU2VjdGlvbiBhcyBTZWN0aW9uLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdEYXRldGltZUZpZWxkJyxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRGF0ZXRpbWUnLFxyXG5cdH0sXHJcblxyXG5cdGZvY3VzVGFyZ2V0UmVmOiAnZGF0ZUlucHV0JyxcclxuXHJcblx0Ly8gZGVmYXVsdCBpbnB1dCBmb3JtYXRzXHJcblx0ZGF0ZUlucHV0Rm9ybWF0OiAnWVlZWS1NTS1ERCcsXHJcblx0dGltZUlucHV0Rm9ybWF0OiAnaDptbTpzcyBhJyxcclxuXHR0ek9mZnNldElucHV0Rm9ybWF0OiAnWicsXHJcblxyXG5cdC8vIHBhcnNlIGZvcm1hdHMgKGR1cGxpY2F0ZWQgZnJvbSBsaWIvZmllbGRUeXBlcy9kYXRldGltZS5qcylcclxuXHRwYXJzZUZvcm1hdHM6IFsnWVlZWS1NTS1ERCcsICdZWVlZLU1NLUREIGg6bTpzIGEnLCAnWVlZWS1NTS1ERCBoOm0gYScsICdZWVlZLU1NLUREIEg6bTpzJywgJ1lZWVktTU0tREQgSDptJ10sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkYXRlVmFsdWU6IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5tb21lbnQodGhpcy5wcm9wcy52YWx1ZSkuZm9ybWF0KHRoaXMuZGF0ZUlucHV0Rm9ybWF0KSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMubW9tZW50KHRoaXMucHJvcHMudmFsdWUpLmZvcm1hdCh0aGlzLnRpbWVJbnB1dEZvcm1hdCksXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUgPyB0aGlzLm1vbWVudCh0aGlzLnByb3BzLnZhbHVlKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KSA6IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudHpPZmZzZXRJbnB1dEZvcm1hdCksXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmb3JtYXRTdHJpbmc6ICdEbyBNTU0gWVlZWSwgaDptbTpzcyBhJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0bW9tZW50ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmlzVVRDKSByZXR1cm4gbW9tZW50LnV0Yy5hcHBseShtb21lbnQsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlIHJldHVybiBtb21lbnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgaXNWYWxpZCgpIHNvIHdlIGNhbiBzaGFyZSB3aXRoIHNlcnZlci1zaWRlIGNvZGVcclxuXHRpc1ZhbGlkICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMubW9tZW50KHZhbHVlLCB0aGlzLnBhcnNlRm9ybWF0cykuaXNWYWxpZCgpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE86IE1vdmUgZm9ybWF0KCkgc28gd2UgY2FuIHNoYXJlIHdpdGggc2VydmVyLXNpZGUgY29kZVxyXG5cdGZvcm1hdCAodmFsdWUsIGZvcm1hdCkge1xyXG5cdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuZGF0ZUlucHV0Rm9ybWF0ICsgJyAnICsgdGhpcy50aW1lSW5wdXRGb3JtYXQ7XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB0aGlzLm1vbWVudCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCkgOiAnJztcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVDaGFuZ2UgKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKSB7XHJcblx0XHR2YXIgdmFsdWUgPSBkYXRlVmFsdWUgKyAnICcgKyB0aW1lVmFsdWU7XHJcblx0XHR2YXIgZGF0ZXRpbWVGb3JtYXQgPSB0aGlzLmRhdGVJbnB1dEZvcm1hdCArICcgJyArIHRoaXMudGltZUlucHV0Rm9ybWF0O1xyXG5cclxuXHRcdC8vIGlmIHRoZSBjaGFuZ2UgaW5jbHVkZWQgYSB0aW1lem9uZSBvZmZzZXQsIGluY2x1ZGUgdGhhdCBpbiB0aGUgY2FsY3VsYXRpb24gKHNvIE5PVyB3b3JrcyBjb3JyZWN0bHkgZHVyaW5nIERTVCBjaGFuZ2VzKVxyXG5cdFx0aWYgKHR5cGVvZiB0ek9mZnNldFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR2YWx1ZSArPSAnICcgKyB0ek9mZnNldFZhbHVlO1xyXG5cdFx0XHRkYXRldGltZUZvcm1hdCArPSAnICcgKyB0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQ7XHJcblx0XHR9XHJcblx0XHQvLyBpZiBub3QsIGNhbGN1bGF0ZSB0aGUgdGltZXpvbmUgb2Zmc2V0IGJhc2VkIG9uIHRoZSBkYXRlIChyZXNwZWN0IGRpZmZlcmVudCBEU1QgdmFsdWVzKVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyB0ek9mZnNldFZhbHVlOiB0aGlzLm1vbWVudCh2YWx1ZSwgZGF0ZXRpbWVGb3JtYXQpLmZvcm1hdCh0aGlzLnR6T2Zmc2V0SW5wdXRGb3JtYXQpIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2Uoe1xyXG5cdFx0XHRwYXRoOiB0aGlzLnByb3BzLnBhdGgsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmlzVmFsaWQodmFsdWUpID8gdGhpcy5tb21lbnQodmFsdWUsIGRhdGV0aW1lRm9ybWF0KS50b0lTT1N0cmluZygpIDogbnVsbCxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGRhdGVDaGFuZ2VkICh7IHZhbHVlIH0pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBkYXRlVmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIHRoaXMuc3RhdGUudGltZVZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHR0aW1lQ2hhbmdlZCAoZXZ0KSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgdGltZVZhbHVlOiBldnQudGFyZ2V0LnZhbHVlIH0pO1xyXG5cdFx0dGhpcy5oYW5kbGVDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlVmFsdWUsIGV2dC50YXJnZXQudmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHNldE5vdyAoKSB7XHJcblx0XHR2YXIgZGF0ZVZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy5kYXRlSW5wdXRGb3JtYXQpO1xyXG5cdFx0dmFyIHRpbWVWYWx1ZSA9IHRoaXMubW9tZW50KCkuZm9ybWF0KHRoaXMudGltZUlucHV0Rm9ybWF0KTtcclxuXHRcdHZhciB0ek9mZnNldFZhbHVlID0gdGhpcy5tb21lbnQoKS5mb3JtYXQodGhpcy50ek9mZnNldElucHV0Rm9ybWF0KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRkYXRlVmFsdWU6IGRhdGVWYWx1ZSxcclxuXHRcdFx0dGltZVZhbHVlOiB0aW1lVmFsdWUsXHJcblx0XHRcdHR6T2Zmc2V0VmFsdWU6IHR6T2Zmc2V0VmFsdWUsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlKGRhdGVWYWx1ZSwgdGltZVZhbHVlLCB0ek9mZnNldFZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJOb3RlICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5ub3RlKSByZXR1cm4gbnVsbDtcclxuXHRcdHJldHVybiA8Rm9ybU5vdGUgbm90ZT17dGhpcy5wcm9wcy5ub3RlfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJVSSAoKSB7XHJcblx0XHR2YXIgaW5wdXQ7XHJcblx0XHRpZiAodGhpcy5zaG91bGRSZW5kZXJGaWVsZCgpKSB7XHJcblx0XHRcdGlucHV0ID0gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHRcdFx0PERhdGVJbnB1dFxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0PXt0aGlzLmRhdGVJbnB1dEZvcm1hdH1cclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMuZGF0ZSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5kYXRlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlZj1cImRhdGVJbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5kYXRlVmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLnRpbWUpfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudGltZUNoYW5nZWR9XHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkhIOk1NOlNTIGFtL3BtXCJcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnRpbWVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHRcdDxTZWN0aW9uPlxyXG5cdFx0XHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5zZXROb3d9Pk5vdzwvQnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L1NlY3Rpb24+XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdFx0PGlucHV0XHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aHMudHpPZmZzZXQpfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudHpPZmZzZXRWYWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnB1dCA9IChcclxuXHRcdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdD5cclxuXHRcdFx0XHRcdHt0aGlzLmZvcm1hdCh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLmZvcm1hdFN0cmluZyl9XHJcblx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Rm9ybUZpZWxkIGxhYmVsPXt0aGlzLnByb3BzLmxhYmVsfSBjbGFzc05hbWU9XCJmaWVsZC10eXBlLWRhdGV0aW1lXCIgaHRtbEZvcj17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX0+XHJcblx0XHRcdFx0e2lucHV0fVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlck5vdGUoKX1cclxuXHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2RhdGUvRGF0ZUZpbHRlcicpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZUNlbGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlQ2VsbCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlVmFsdWUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JdGVtc1RhYmxlVmFsdWUnO1xyXG5cclxudmFyIEVtYWlsQ29sdW1uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGRpc3BsYXlOYW1lOiAnRW1haWxDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmZpZWxkc1t0aGlzLnByb3BzLmNvbC5wYXRoXTtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXsnbWFpbHRvOicgKyB2YWx1ZX0gcGFkZGVkIGV4dGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHR7dmFsdWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8SXRlbXNUYWJsZUNlbGw+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVtYWlsQ29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtSW5wdXQgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG4vKlxyXG5cdFRPRE86XHJcblx0LSBncmF2YXRhclxyXG5cdC0gdmFsaWRhdGUgZW1haWwgYWRkcmVzc1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ0VtYWlsRmllbGQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHR0eXBlOiAnRW1haWwnLFxyXG5cdH0sXHJcblx0cmVuZGVyRmllbGQgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0cmVmPVwiZm9jdXNUYXJnZXRcIlxyXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdHR5cGU9XCJlbWFpbFwiXHJcblx0XHRcdC8+XHJcblx0XHQpO1xyXG5cdH0sXHJcblx0cmVuZGVyVmFsdWUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMudmFsdWUgPyAoXHJcblx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IGNvbXBvbmVudD1cImFcIiBocmVmPXsnbWFpbHRvOicgKyB0aGlzLnByb3BzLnZhbHVlfT5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy52YWx1ZX1cclxuXHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHQpIDogKFxyXG5cdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdCAvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuaW1wb3J0IGRpc3BsYXlOYW1lIGZyb20gJ2Rpc3BsYXktbmFtZSc7XHJcblxyXG52YXIgTmFtZUNvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ05hbWVDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdHZhciB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRpZiAoIXZhbHVlIHx8ICghdmFsdWUuZmlyc3QgJiYgIXZhbHVlLmxhc3QpKSByZXR1cm4gJyhubyBuYW1lKSc7XHJcblx0XHRyZXR1cm4gZGlzcGxheU5hbWUodmFsdWUuZmlyc3QsIHZhbHVlLmxhc3QpO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHQ8SXRlbXNUYWJsZVZhbHVlIHRvPXt0aGlzLnByb3BzLmxpbmtUb30gcGFkZGVkIGludGVyaW9yIGZpZWxkPXt0aGlzLnByb3BzLmNvbC50eXBlfT5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKCl9XHJcblx0XHRcdFx0PC9JdGVtc1RhYmxlVmFsdWU+XHJcblx0XHRcdDwvSXRlbXNUYWJsZUNlbGw+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQ29sdW1uO1xyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1JbnB1dCxcclxuXHRHcmlkLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IE5BTUVfU0hBUEUgPSB7XHJcblx0Zmlyc3Q6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0bGFzdDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ05hbWVGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ05hbWUnLFxyXG5cdFx0Z2V0RGVmYXVsdFZhbHVlOiAoKSA9PiAoe1xyXG5cdFx0XHRmaXJzdDogJycsXHJcblx0XHRcdGxhc3Q6ICcnLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0cGF0aHM6IFByb3BUeXBlcy5zaGFwZShOQU1FX1NIQVBFKS5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5zaGFwZShOQU1FX1NIQVBFKS5pc1JlcXVpcmVkLFxyXG5cdH0sXHJcblxyXG5cdHZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKHdoaWNoLCBldmVudCkge1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSA9IHt9LCBwYXRoLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdG9uQ2hhbmdlKHtcclxuXHRcdFx0cGF0aCxcclxuXHRcdFx0dmFsdWU6IHtcclxuXHRcdFx0XHQuLi52YWx1ZSxcclxuXHRcdFx0XHRbd2hpY2hdOiBldmVudC50YXJnZXQudmFsdWUsXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNoYW5nZUZpcnN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlZCgnZmlyc3QnLCBldmVudCk7XHJcblx0fSxcclxuXHRjaGFuZ2VMYXN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlZCgnbGFzdCcsIGV2ZW50KTtcclxuXHR9LFxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IGlucHV0U3R5bGUgPSB7IHdpZHRoOiAnMTAwJScgfTtcclxuXHRcdGNvbnN0IHsgdmFsdWUgPSB7fSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZC5Sb3cgc21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXQgbm9lZGl0IHN0eWxlPXtpbnB1dFN0eWxlfT5cclxuXHRcdFx0XHRcdFx0e3ZhbHVlLmZpcnN0fVxyXG5cdFx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0IG5vZWRpdCBzdHlsZT17aW5wdXRTdHlsZX0+XHJcblx0XHRcdFx0XHRcdHt2YWx1ZS5sYXN0fVxyXG5cdFx0XHRcdFx0PC9Gb3JtSW5wdXQ+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0PC9HcmlkLlJvdz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRjb25zdCB7IHZhbHVlID0ge30sIHBhdGhzLCBhdXRvRm9jdXMgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZC5Sb3cgc21hbGw9XCJvbmUtaGFsZlwiIGd1dHRlcj17MTB9PlxyXG5cdFx0XHRcdDxHcmlkLkNvbD5cclxuXHRcdFx0XHRcdDxGb3JtSW5wdXRcclxuXHRcdFx0XHRcdFx0YXV0b0ZvY3VzPXthdXRvRm9jdXN9XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHBhdGhzLmZpcnN0KX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlRmlyc3R9XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZS5maXJzdH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9HcmlkLkNvbD5cclxuXHRcdFx0XHQ8R3JpZC5Db2w+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHBhdGhzLmxhc3QpfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VMYXN0fVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkxhc3QgbmFtZVwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZS5sYXN0fVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0dyaWQuQ29sPlxyXG5cdFx0XHQ8L0dyaWQuUm93PlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi90ZXh0L1RleHRGaWx0ZXInKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1zVGFibGVDZWxsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZUNlbGwnO1xyXG5pbXBvcnQgSXRlbXNUYWJsZVZhbHVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSXRlbXNUYWJsZVZhbHVlJztcclxuXHJcbnZhciBQYXNzd29yZENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkQ29sdW1uJyxcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNvbDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRyZXR1cm4gdmFsdWUgPyAnKioqKioqKionIDogJyc7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUoKX1cclxuXHRcdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3N3b3JkQ29sdW1uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmllbGQgZnJvbSAnLi4vRmllbGQnO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZC5jcmVhdGUoe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ1Bhc3N3b3JkRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdQYXNzd29yZCcsXHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHBhc3N3b3JkSXNTZXQ6IHRoaXMucHJvcHMudmFsdWUgPyB0cnVlIDogZmFsc2UsXHJcblx0XHRcdHNob3dDaGFuZ2VVSTogdGhpcy5wcm9wcy5tb2RlID09PSAnY3JlYXRlJyA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0cGFzc3dvcmQ6ICcnLFxyXG5cdFx0XHRjb25maXJtOiAnJyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh3aGljaCwgZXZlbnQpIHtcclxuXHRcdHZhciBuZXdTdGF0ZSA9IHt9O1xyXG5cdFx0bmV3U3RhdGVbd2hpY2hdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvd0NoYW5nZVVJICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IHRydWUsXHJcblx0XHR9LCAoKSA9PiB0aGlzLmZvY3VzKCkpO1xyXG5cdH0sXHJcblxyXG5cdG9uQ2FuY2VsICgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRzaG93Q2hhbmdlVUk6IGZhbHNlLFxyXG5cdFx0fSwgKCkgPT4gdGhpcy5mb2N1cygpKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJWYWx1ZSAoKSB7XHJcblx0XHRyZXR1cm4gPEZvcm1JbnB1dCBub2VkaXQ+e3RoaXMucHJvcHMudmFsdWUgPyAnUGFzc3dvcmQgU2V0JyA6ICcnfTwvRm9ybUlucHV0PjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zaG93Q2hhbmdlVUkgPyB0aGlzLnJlbmRlckZpZWxkcygpIDogdGhpcy5yZW5kZXJDaGFuZ2VCdXR0b24oKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZHMgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIGJsb2NrPlxyXG5cdFx0XHRcdDxTZWN0aW9uIGdyb3c+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0XHJcblx0XHRcdFx0XHRcdGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcblx0XHRcdFx0XHRcdG5hbWU9e3RoaXMuZ2V0SW5wdXROYW1lKHRoaXMucHJvcHMucGF0aCl9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMsICdwYXNzd29yZCcpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk5ldyBwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbiBncm93PlxyXG5cdFx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0XHRhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG5cdFx0XHRcdFx0XHRuYW1lPXt0aGlzLmdldElucHV0TmFtZSh0aGlzLnByb3BzLnBhdGhzLmNvbmZpcm0pfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy52YWx1ZUNoYW5nZWQuYmluZCh0aGlzLCAnY29uZmlybScpfVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIkNvbmZpcm0gbmV3IHBhc3N3b3JkXCIgdmFsdWU9e3RoaXMuc3RhdGUuY29uZmlybX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdHt0aGlzLnN0YXRlLnBhc3N3b3JkSXNTZXQgPyAoXHJcblx0XHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsfT5DYW5jZWw8L0J1dHRvbj5cclxuXHRcdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQ2hhbmdlQnV0dG9uICgpIHtcclxuXHRcdHZhciBsYWJlbCA9IHRoaXMuc3RhdGUucGFzc3dvcmRJc1NldFxyXG5cdFx0XHQ/ICdDaGFuZ2UgUGFzc3dvcmQnXHJcblx0XHRcdDogJ1NldCBQYXNzd29yZCc7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEJ1dHRvbiByZWY9XCJmb2N1c1RhcmdldFwiIG9uQ2xpY2s9e3RoaXMuc2hvd0NoYW5nZVVJfT57bGFiZWx9PC9CdXR0b24+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG59KTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IFNlZ21lbnRlZENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL2VsZW1lbnRhbCc7XHJcblxyXG5jb25zdCBFWElTVFNfT1BUSU9OUyA9IFtcclxuXHR7IGxhYmVsOiAnSXMgU2V0JywgdmFsdWU6IHRydWUgfSxcclxuXHR7IGxhYmVsOiAnSXMgTk9UIFNldCcsIHZhbHVlOiBmYWxzZSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZXhpc3RzOiB0cnVlLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBQYXNzd29yZEZpbHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0ZXhpc3RzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoRVhJU1RTX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHRvZ2dsZUV4aXN0cyAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyBleGlzdHM6IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWdtZW50ZWRDb250cm9sXHJcblx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudG9nZ2xlRXhpc3RzfVxyXG5cdFx0XHRcdG9wdGlvbnM9e0VYSVNUU19PUFRJT05TfVxyXG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXIuZXhpc3RzfVxyXG5cdFx0XHQvPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFzc3dvcmRGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG5jb25zdCBtb3JlSW5kaWNhdG9yU3R5bGUgPSB7XHJcblx0Y29sb3I6ICcjYmJiJyxcclxuXHRmb250U2l6ZTogJy44cmVtJyxcclxuXHRmb250V2VpZ2h0OiA1MDAsXHJcblx0bWFyZ2luTGVmdDogOCxcclxufTtcclxuXHJcbnZhciBSZWxhdGlvbnNoaXBDb2x1bW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdSZWxhdGlvbnNoaXBDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHR9LFxyXG5cdHJlbmRlck1hbnkgKHZhbHVlKSB7XHJcblx0XHRpZiAoIXZhbHVlIHx8ICF2YWx1ZS5sZW5ndGgpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0Y29uc3QgaXRlbXMgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblx0XHRcdGlmICghdmFsdWVbaV0pIGJyZWFrO1xyXG5cdFx0XHRpZiAoaSkge1xyXG5cdFx0XHRcdGl0ZW1zLnB1c2goPHNwYW4ga2V5PXsnY29tbWEnICsgaX0+LCA8L3NwYW4+KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgaW50ZXJpb3IgdHJ1bmNhdGU9e2ZhbHNlfSBrZXk9eydhbmNob3InICsgaX0gdG89e0tleXN0b25lLmFkbWluUGF0aCArICcvJyArIHJlZkxpc3QucGF0aCArICcvJyArIHZhbHVlW2ldLmlkfT5cclxuXHRcdFx0XHRcdHt2YWx1ZVtpXS5uYW1lfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlLmxlbmd0aCA+IDMpIHtcclxuXHRcdFx0aXRlbXMucHVzaCg8c3BhbiBrZXk9XCJtb3JlXCIgc3R5bGU9e21vcmVJbmRpY2F0b3JTdHlsZX0+Wy4uLnt2YWx1ZS5sZW5ndGggLSAzfSBtb3JlXTwvc3Bhbj4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e2l0ZW1zfVxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVWYWx1ZT5cclxuXHRcdCk7XHJcblx0fSxcclxuXHRyZW5kZXJWYWx1ZSAodmFsdWUpIHtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybjtcclxuXHRcdGNvbnN0IHJlZkxpc3QgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5yZWZMaXN0O1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVWYWx1ZSB0bz17S2V5c3RvbmUuYWRtaW5QYXRoICsgJy8nICsgcmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUuaWR9IHBhZGRlZCBpbnRlcmlvciBmaWVsZD17dGhpcy5wcm9wcy5jb2wudHlwZX0+XHJcblx0XHRcdFx0e3ZhbHVlLm5hbWV9XHJcblx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5maWVsZHNbdGhpcy5wcm9wcy5jb2wucGF0aF07XHJcblx0XHRjb25zdCBtYW55ID0gdGhpcy5wcm9wcy5jb2wuZmllbGQubWFueTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxJdGVtc1RhYmxlQ2VsbD5cclxuXHRcdFx0XHR7bWFueSA/IHRoaXMucmVuZGVyTWFueSh2YWx1ZSkgOiB0aGlzLnJlbmRlclZhbHVlKHZhbHVlKX1cclxuXHRcdFx0PC9JdGVtc1RhYmxlQ2VsbD5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlbGF0aW9uc2hpcENvbHVtbjtcclxuIiwiaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuaW1wb3J0IHsgbGlzdHNCeUtleSB9IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC91dGlscy9saXN0cyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHhociBmcm9tICd4aHInO1xyXG5pbXBvcnQge1xyXG5cdEJ1dHRvbixcclxuXHRGb3JtSW5wdXQsXHJcblx0SW5saW5lR3JvdXAgYXMgR3JvdXAsXHJcblx0SW5saW5lR3JvdXBTZWN0aW9uIGFzIFNlY3Rpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9lbGVtZW50YWwnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZVZhbHVlcyAoY3VycmVudCwgbmV4dCkge1xyXG5cdGNvbnN0IGN1cnJlbnRMZW5ndGggPSBjdXJyZW50ID8gY3VycmVudC5sZW5ndGggOiAwO1xyXG5cdGNvbnN0IG5leHRMZW5ndGggPSBuZXh0ID8gbmV4dC5sZW5ndGggOiAwO1xyXG5cdGlmIChjdXJyZW50TGVuZ3RoICE9PSBuZXh0TGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50TGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChjdXJyZW50W2ldICE9PSBuZXh0W2ldKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkLmNyZWF0ZSh7XHJcblxyXG5cdGRpc3BsYXlOYW1lOiAnUmVsYXRpb25zaGlwRmllbGQnLFxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdHR5cGU6ICdSZWxhdGlvbnNoaXAnLFxyXG5cdH0sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiBmYWxzZSxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZSA9IHt9O1xyXG5cdFx0dGhpcy5sb2FkVmFsdWUodGhpcy5wcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XHJcblx0XHRpZiAobmV4dFByb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnZhbHVlIHx8IG5leHRQcm9wcy5tYW55ICYmIGNvbXBhcmVWYWx1ZXModGhpcy5wcm9wcy52YWx1ZSwgbmV4dFByb3BzLnZhbHVlKSkge1xyXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wcy5maWx0ZXJzKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMudmFsdWVzW2tleV0gIT09IG5leHRQcm9wcy52YWx1ZXNba2V5XSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBjcmVhdGVJc09wZW46IGZhbHNlLCB2YWx1ZTogbnVsbCB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sIDEwKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZFZhbHVlKG5leHRQcm9wcy52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2hvdWxkQ29sbGFwc2UgKCkge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubWFueSkge1xyXG5cdFx0XHQvLyBtYW55OnRydWUgcmVsYXRpb25zaGlwcyBoYXZlIGFuIEFycmF5IGZvciBhIHZhbHVlXHJcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNvbGxhcHNlICYmICF0aGlzLnByb3BzLnZhbHVlO1xyXG5cdH0sXHJcblxyXG5cdGJ1aWxkRmlsdGVycyAoKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IHt9O1xyXG5cclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpbHRlcnMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlWzBdID09PSAnOicpIHtcclxuXHRcdFx0XHR2YXIgZmllbGROYW1lID0gdmFsdWUuc2xpY2UoMSk7XHJcblxyXG5cdFx0XHRcdHZhciB2YWwgPSB0aGlzLnByb3BzLnZhbHVlc1tmaWVsZE5hbWVdO1xyXG5cdFx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbDtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGZpbHRlcmluZyBieSBpZCBhbmQgaXRlbSB3YXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0XHRcdGlmIChmaWVsZE5hbWUgPT09ICc6X2lkJyAmJiBLZXlzdG9uZS5pdGVtKSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJzW2tleV0gPSBLZXlzdG9uZS5pdGVtLmlkO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmaWx0ZXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblxyXG5cdFx0Xy5mb3JFYWNoKGZpbHRlcnMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xyXG5cdFx0XHRwYXJ0cy5wdXNoKCdmaWx0ZXJzWycgKyBrZXkgKyAnXVt2YWx1ZV09JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcmJyk7XHJcblx0fSxcclxuXHJcblx0Y2FjaGVJdGVtIChpdGVtKSB7XHJcblx0XHRpdGVtLmhyZWYgPSBLZXlzdG9uZS5hZG1pblBhdGggKyAnLycgKyB0aGlzLnByb3BzLnJlZkxpc3QucGF0aCArICcvJyArIGl0ZW0uaWQ7XHJcblx0XHR0aGlzLl9pdGVtc0NhY2hlW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9LFxyXG5cclxuXHRsb2FkVmFsdWUgKHZhbHVlcykge1xyXG5cdFx0aWYgKCF2YWx1ZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHR2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiB2YWx1ZXMuc3BsaXQoJywnKTtcclxuXHRcdGNvbnN0IGNhY2hlZFZhbHVlcyA9IHZhbHVlcy5tYXAoaSA9PiB0aGlzLl9pdGVtc0NhY2hlW2ldKS5maWx0ZXIoaSA9PiBpKTtcclxuXHRcdGlmIChjYWNoZWRWYWx1ZXMubGVuZ3RoID09PSB2YWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLm1hbnkgPyBjYWNoZWRWYWx1ZXMgOiBjYWNoZWRWYWx1ZXNbMF0sXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0bG9hZGluZzogdHJ1ZSxcclxuXHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHR9KTtcclxuXHRcdGFzeW5jLm1hcCh2YWx1ZXMsICh2YWx1ZSwgZG9uZSkgPT4ge1xyXG5cdFx0XHR4aHIoe1xyXG5cdFx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJy8nICsgdmFsdWUgKyAnP2Jhc2ljJyxcclxuXHRcdFx0XHRyZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHRcdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmIChlcnIgfHwgIWRhdGEpIHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0dGhpcy5jYWNoZUl0ZW0oZGF0YSk7XHJcblx0XHRcdFx0ZG9uZShlcnIsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sIChlcnIsIGV4cGFuZGVkKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5wcm9wcy5tYW55ID8gZXhwYW5kZWQgOiBleHBhbmRlZFswXSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0bG9hZE9wdGlvbnNDYWxsYmFjazoge30sXHJcblx0bG9hZE9wdGlvbnMgKGlucHV0LCBjYWxsYmFjaykge1xyXG5cdFx0Ly8gTk9URTogdGhpcyBzZWVtcyBsaWtlIHRoZSB3cm9uZyB3YXkgdG8gYWRkIG9wdGlvbnMgdG8gdGhlIFNlbGVjdFxyXG5cdFx0dGhpcy5sb2FkT3B0aW9uc0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIGlucHV0ICsgJyYnICsgZmlsdGVycyxcclxuXHRcdFx0cmVzcG9uc2VUeXBlOiAnanNvbicsXHJcblx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG51bGwsIFtdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGNhbGxiYWNrKG51bGwsIHtcclxuXHRcdFx0XHRvcHRpb25zOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdFx0Y29tcGxldGU6IGRhdGEucmVzdWx0cy5sZW5ndGggPT09IGRhdGEuY291bnQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dmFsdWVDaGFuZ2VkICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7XHJcblx0XHRcdHBhdGg6IHRoaXMucHJvcHMucGF0aCxcclxuXHRcdFx0dmFsdWU6IHZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0b3BlbkNyZWF0ZSAoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0Y3JlYXRlSXNPcGVuOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VDcmVhdGUgKCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGNyZWF0ZUlzT3BlbjogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvbkNyZWF0ZSAoaXRlbSkge1xyXG5cdFx0dGhpcy5jYWNoZUl0ZW0oaXRlbSk7XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnZhbHVlKSkge1xyXG5cdFx0XHQvLyBGb3IgbWFueSByZWxhdGlvbnNoaXBzLCBhcHBlbmQgdGhlIG5ldyBpdGVtIHRvIHRoZSBlbmRcclxuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5zdGF0ZS52YWx1ZS5tYXAoKGl0ZW0pID0+IGl0ZW0uaWQpO1xyXG5cdFx0XHR2YWx1ZXMucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy52YWx1ZUNoYW5nZWQodmFsdWVzLmpvaW4oJywnKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOT1RFOiB0aGlzIHNlZW1zIGxpa2UgdGhlIHdyb25nIHdheSB0byBhZGQgb3B0aW9ucyB0byB0aGUgU2VsZWN0XHJcblx0XHR0aGlzLmxvYWRPcHRpb25zQ2FsbGJhY2sobnVsbCwge1xyXG5cdFx0XHRjb21wbGV0ZTogdHJ1ZSxcclxuXHRcdFx0b3B0aW9uczogT2JqZWN0LmtleXModGhpcy5faXRlbXNDYWNoZSkubWFwKChrKSA9PiB0aGlzLl9pdGVtc0NhY2hlW2tdKSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jbG9zZUNyZWF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclNlbGVjdCAobm9lZGl0KSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHsvKiBUaGlzIGlucHV0IGVsZW1lbnQgZm9vbHMgU2FmYXJpJ3MgYXV0b2NvcnJlY3QgaW4gY2VydGFpbiBzaXR1YXRpb25zIHRoYXQgY29tcGxldGVseSBicmVhayByZWFjdC1zZWxlY3QgKi99XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHpJbmRleDogLTEsIG9wYWNpdHk6IDAgfX0gdGFiSW5kZXg9XCItMVwiLz5cclxuXHRcdFx0XHR7IXRoaXMuc3RhdGUuY3JlYXRlSXNPcGVuICYmIDxTZWxlY3QuQXN5bmNcclxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnByb3BzLm1hbnl9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17bm9lZGl0fVxyXG5cdFx0XHRcdFx0bG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnN9XHJcblx0XHRcdFx0XHRsYWJlbEtleT1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0bmFtZT17dGhpcy5nZXRJbnB1dE5hbWUodGhpcy5wcm9wcy5wYXRoKX1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnZhbHVlQ2hhbmdlZH1cclxuXHRcdFx0XHRcdGNhY2hlPXtmYWxzZX1cclxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXHJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuXHRcdFx0XHRcdHZhbHVlS2V5PVwiaWRcIlxyXG5cdFx0XHRcdC8+fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVySW5wdXRHcm91cCAoKSB7XHJcblx0XHQvLyBUT0RPOiBmaW5kIGJldHRlciBzb2x1dGlvblxyXG5cdFx0Ly8gICB3aGVuIGltcG9ydGluZyB0aGUgQ3JlYXRlRm9ybSB1c2luZzogaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSAnLi4vLi4vLi4vYWRtaW4vY2xpZW50L0FwcC9zaGFyZWQvQ3JlYXRlRm9ybSc7XHJcblx0XHQvLyAgIENyZWF0ZUZvcm0gd2FzIGltcG9ydGVkIGFzIGEgYmxhbmsgb2JqZWN0LiBUaGlzIHN0YWNrIG92ZXJmbG93IHBvc3Qgc3VnZ2VzdGVkIGxhemlsbHkgcmVxdWlyaW5nIGl0OlxyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTgwNzY2NC9jeWNsaWMtZGVwZW5kZW5jeS1yZXR1cm5zLWVtcHR5LW9iamVjdC1pbi1yZWFjdC1uYXRpdmVcclxuXHRcdC8vIFRPRE86IEltcGxlbWVudCB0aGlzIHNvbWV3aGVyZSBoaWdoZXIgaW4gdGhlIGFwcCwgaXQgYnJlYWtzIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSBSZWxhdGlvbnNoaXBGaWVsZCBjb21wb25lbnRcclxuXHRcdGNvbnN0IENyZWF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi8uLi9hZG1pbi9jbGllbnQvQXBwL3NoYXJlZC9DcmVhdGVGb3JtJyk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgYmxvY2s+XHJcblx0XHRcdFx0PFNlY3Rpb24gZ3Jvdz5cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNlbGVjdCgpfVxyXG5cdFx0XHRcdDwvU2VjdGlvbj5cclxuXHRcdFx0XHQ8U2VjdGlvbj5cclxuXHRcdFx0XHRcdDxCdXR0b24gb25DbGljaz17dGhpcy5vcGVuQ3JlYXRlfT4rPC9CdXR0b24+XHJcblx0XHRcdFx0PC9TZWN0aW9uPlxyXG5cdFx0XHRcdDxDcmVhdGVGb3JtXHJcblx0XHRcdFx0XHRsaXN0PXtsaXN0c0J5S2V5W3RoaXMucHJvcHMucmVmTGlzdC5rZXldfVxyXG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmNyZWF0ZUlzT3Blbn1cclxuXHRcdFx0XHRcdG9uQ3JlYXRlPXt0aGlzLm9uQ3JlYXRlfVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e3RoaXMuY2xvc2VDcmVhdGV9IC8+XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlclZhbHVlICgpIHtcclxuXHRcdGNvbnN0IHsgbWFueSB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XHJcblx0XHRjb25zdCBwcm9wcyA9IHtcclxuXHRcdFx0Y2hpbGRyZW46IHZhbHVlID8gdmFsdWUubmFtZSA6IG51bGwsXHJcblx0XHRcdGNvbXBvbmVudDogdmFsdWUgPyAnYScgOiAnc3BhbicsXHJcblx0XHRcdGhyZWY6IHZhbHVlID8gdmFsdWUuaHJlZiA6IG51bGwsXHJcblx0XHRcdG5vZWRpdDogdHJ1ZSxcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1hbnkgPyB0aGlzLnJlbmRlclNlbGVjdCh0cnVlKSA6IDxGb3JtSW5wdXQgey4uLnByb3BzfSAvPjtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJGaWVsZCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5jcmVhdGVJbmxpbmUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVySW5wdXRHcm91cCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyU2VsZWN0KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB4aHIgZnJvbSAneGhyJztcclxuXHJcbmltcG9ydCB7XHJcblx0Rm9ybUZpZWxkLFxyXG5cdEZvcm1JbnB1dCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmltcG9ydCBQb3BvdXRMaXN0IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvc2hhcmVkL1BvcG91dC9Qb3BvdXRMaXN0JztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ0xpbmtlZCBUbycsIHZhbHVlOiBmYWxzZSB9LFxyXG5cdHsgbGFiZWw6ICdOT1QgTGlua2VkIFRvJywgdmFsdWU6IHRydWUgfSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSAoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGludmVydGVkOiBJTlZFUlRFRF9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0dmFsdWU6IFtdLFxyXG5cdH07XHJcbn1cclxuXHJcbnZhciBSZWxhdGlvbnNoaXBGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWVsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0aW52ZXJ0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cdFx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0fSksXHJcblx0XHRvbkhlaWdodENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRzZWFyY2hSZXN1bHRzOiBbXSxcclxuXHRcdFx0c2VhcmNoU3RyaW5nOiAnJyxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczogW10sXHJcblx0XHRcdHZhbHVlSXNMb2FkaW5nOiB0cnVlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuXHRcdHRoaXMuX2l0ZW1zQ2FjaGUgPSB7fTtcclxuXHRcdHRoaXMubG9hZFNlYXJjaFJlc3VsdHModHJ1ZSk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcclxuXHRcdGlmIChuZXh0UHJvcHMuZmlsdGVyLnZhbHVlICE9PSB0aGlzLnByb3BzLmZpbHRlci52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBvcHVsYXRlVmFsdWUobmV4dFByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc0xvYWRpbmcgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc2VhcmNoSXNMb2FkaW5nIHx8IHRoaXMuc3RhdGUudmFsdWVJc0xvYWRpbmc7XHJcblx0fSxcclxuXHRwb3B1bGF0ZVZhbHVlICh2YWx1ZSkge1xyXG5cdFx0YXN5bmMubWFwKHZhbHVlLCAoaWQsIG5leHQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zQ2FjaGVbaWRdKSByZXR1cm4gbmV4dChudWxsLCB0aGlzLl9pdGVtc0NhY2hlW2lkXSk7XHJcblx0XHRcdHhocih7XHJcblx0XHRcdFx0dXJsOiBLZXlzdG9uZS5hZG1pblBhdGggKyAnL2FwaS8nICsgdGhpcy5wcm9wcy5maWVsZC5yZWZMaXN0LnBhdGggKyAnLycgKyBpZCArICc/YmFzaWMnLFxyXG5cdFx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0XHR9LCAoZXJyLCByZXNwLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKGVyciB8fCAhZGF0YSkgcmV0dXJuIG5leHQoZXJyKTtcclxuXHRcdFx0XHR0aGlzLmNhY2hlSXRlbShkYXRhKTtcclxuXHRcdFx0XHRuZXh0KGVyciwgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgKGVyciwgaXRlbXMpID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdC8vIFRPRE86IEhhbmRsZSBlcnJvcnMgYmV0dGVyXHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtczonLCBlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHZhbHVlSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWxlY3RlZEl0ZW1zOiBpdGVtcyB8fCBbXSxcclxuXHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdGZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c1RhcmdldCkuZm9jdXMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNhY2hlSXRlbSAoaXRlbSkge1xyXG5cdFx0dGhpcy5faXRlbXNDYWNoZVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0fSxcclxuXHRidWlsZEZpbHRlcnMgKCkge1xyXG5cdFx0dmFyIGZpbHRlcnMgPSB7fTtcclxuXHRcdF8uZm9yRWFjaCh0aGlzLnByb3BzLmZpZWxkLmZpbHRlcnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0XHRcdGlmICh2YWx1ZVswXSA9PT0gJzonKSByZXR1cm47XHJcblx0XHRcdGZpbHRlcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRfLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XHJcblx0XHRcdHBhcnRzLnB1c2goJ2ZpbHRlcnNbJyArIGtleSArICddW3ZhbHVlXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyYnKTtcclxuXHR9LFxyXG5cdGxvYWRTZWFyY2hSZXN1bHRzICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0Y29uc3Qgc2VhcmNoU3RyaW5nID0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmc7XHJcblx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlcnMoKTtcclxuXHRcdHhocih7XHJcblx0XHRcdHVybDogS2V5c3RvbmUuYWRtaW5QYXRoICsgJy9hcGkvJyArIHRoaXMucHJvcHMuZmllbGQucmVmTGlzdC5wYXRoICsgJz9iYXNpYyZzZWFyY2g9JyArIHNlYXJjaFN0cmluZyArICcmJyArIGZpbHRlcnMsXHJcblx0XHRcdHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG5cdFx0fSwgKGVyciwgcmVzcCwgZGF0YSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGVycm9ycyBiZXR0ZXJcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zOicsIGVycik7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRzZWFyY2hJc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCh0aGlzLmNhY2hlSXRlbSk7XHJcblx0XHRcdGlmICh0aGVuUG9wdWxhdGVWYWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMucG9wdWxhdGVWYWx1ZSh0aGlzLnByb3BzLmZpbHRlci52YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHNlYXJjaFN0cmluZyAhPT0gdGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmcpIHJldHVybjtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0c2VhcmNoSXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzZWFyY2hSZXN1bHRzOiBkYXRhLnJlc3VsdHMsXHJcblx0XHRcdH0sIHRoaXMudXBkYXRlSGVpZ2h0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlSGVpZ2h0ICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uSGVpZ2h0Q2hhbmdlKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25IZWlnaHRDaGFuZ2UodGhpcy5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dG9nZ2xlSW52ZXJ0ZWQgKGludmVydGVkKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IGludmVydGVkIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlU2VhcmNoIChlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgc2VhcmNoU3RyaW5nOiBlLnRhcmdldC52YWx1ZSB9LCB0aGlzLmxvYWRTZWFyY2hSZXN1bHRzKTtcclxuXHR9LFxyXG5cdHNlbGVjdEl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuY29uY2F0KGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbW92ZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy5maWx0ZXIudmFsdWUuZmlsdGVyKGkgPT4geyByZXR1cm4gaSAhPT0gaXRlbS5pZDsgfSk7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IHZhbHVlIH0pO1xyXG5cdH0sXHJcblx0dXBkYXRlRmlsdGVyICh2YWx1ZSkge1xyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh7IC4uLnRoaXMucHJvcHMuZmlsdGVyLCAuLi52YWx1ZSB9KTtcclxuXHR9LFxyXG5cdHJlbmRlckl0ZW1zIChpdGVtcywgc2VsZWN0ZWQpIHtcclxuXHRcdGNvbnN0IGl0ZW1JY29uSG92ZXIgPSBzZWxlY3RlZCA/ICd4JyA6ICdjaGVjayc7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxQb3BvdXRMaXN0Lkl0ZW1cclxuXHRcdFx0XHRcdGtleT17YGl0ZW0tJHtpfS0ke2l0ZW0uaWR9YH1cclxuXHRcdFx0XHRcdGljb249XCJkYXNoXCJcclxuXHRcdFx0XHRcdGljb25Ib3Zlcj17aXRlbUljb25Ib3Zlcn1cclxuXHRcdFx0XHRcdGxhYmVsPXtpdGVtLm5hbWV9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZCkgdGhpcy5yZW1vdmVJdGVtKGl0ZW0pO1xyXG5cdFx0XHRcdFx0XHRlbHNlIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcclxuXHRcdFx0XHRcdH19XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkSXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSXRlbXM7XHJcblx0XHRjb25zdCBzZWFyY2hSZXN1bHRzID0gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmZpbHRlcihpID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuZmlsdGVyLnZhbHVlLmluZGV4T2YoaS5pZCkgPT09IC0xO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuaXNMb2FkaW5nKCkgPyAnTG9hZGluZy4uLicgOiAnRmluZCBhICcgKyB0aGlzLnByb3BzLmZpZWxkLmxhYmVsICsgJy4uLic7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHJlZj1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxGb3JtRmllbGQ+XHJcblx0XHRcdFx0XHQ8U2VnbWVudGVkQ29udHJvbCBlcXVhbFdpZHRoU2VnbWVudHMgb3B0aW9ucz17SU5WRVJURURfT1BUSU9OU30gdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyLmludmVydGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVJbnZlcnRlZH0gLz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzFweCBkYXNoZWQgcmdiYSgwLDAsMCwwLjEpJywgcGFkZGluZ0JvdHRvbTogJzFlbScgfX0+XHJcblx0XHRcdFx0XHQ8Rm9ybUlucHV0IGF1dG9Gb2N1cyByZWY9XCJmb2N1c1RhcmdldFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFN0cmluZ30gb25DaGFuZ2U9e3RoaXMudXBkYXRlU2VhcmNofSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmc+U2VsZWN0ZWQ8L1BvcG91dExpc3QuSGVhZGluZz5cclxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySXRlbXMoc2VsZWN0ZWRJdGVtcywgdHJ1ZSl9XHJcblx0XHRcdFx0XHQ8L1BvcG91dExpc3Q+XHJcblx0XHRcdFx0KSA6IG51bGx9XHJcblx0XHRcdFx0e3NlYXJjaFJlc3VsdHMubGVuZ3RoID8gKFxyXG5cdFx0XHRcdFx0PFBvcG91dExpc3Q+XHJcblx0XHRcdFx0XHRcdDxQb3BvdXRMaXN0LkhlYWRpbmcgc3R5bGU9e3NlbGVjdGVkSXRlbXMubGVuZ3RoID8geyBtYXJnaW5Ub3A6ICcyZW0nIH0gOiBudWxsfT5JdGVtczwvUG9wb3V0TGlzdC5IZWFkaW5nPlxyXG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJdGVtcyhzZWFyY2hSZXN1bHRzKX1cclxuXHRcdFx0XHRcdDwvUG9wb3V0TGlzdD5cclxuXHRcdFx0XHQpIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWxhdGlvbnNoaXBGaWx0ZXI7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtc1RhYmxlQ2VsbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVDZWxsJztcclxuaW1wb3J0IEl0ZW1zVGFibGVWYWx1ZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0l0ZW1zVGFibGVWYWx1ZSc7XHJcblxyXG52YXIgVGV4dENvbHVtbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRDb2x1bW4nLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0Y29sOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0ZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGxpbmtUbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHR9LFxyXG5cdGdldFZhbHVlICgpIHtcclxuXHRcdC8vIGNyb3BwaW5nIHRleHQgaXMgaW1wb3J0YW50IGZvciB0ZXh0YXJlYSwgd2hpY2ggdXNlcyB0aGlzIGNvbHVtblxyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZmllbGRzW3RoaXMucHJvcHMuY29sLnBhdGhdO1xyXG5cdFx0cmV0dXJuIHZhbHVlID8gdmFsdWUuc3Vic3RyKDAsIDEwMCkgOiBudWxsO1xyXG5cdH0sXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG5cdFx0Y29uc3QgZW1wdHkgPSAhdmFsdWUgJiYgdGhpcy5wcm9wcy5saW5rVG8gPyB0cnVlIDogZmFsc2U7XHJcblx0XHRjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNvbC5maWVsZC5tb25vc3BhY2UgPyAnSXRlbUxpc3RfX3ZhbHVlLS1tb25vc3BhY2UnIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEl0ZW1zVGFibGVDZWxsPlxyXG5cdFx0XHRcdDxJdGVtc1RhYmxlVmFsdWUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHRvPXt0aGlzLnByb3BzLmxpbmtUb30gZW1wdHk9e2VtcHR5fSBwYWRkZWQgaW50ZXJpb3IgZmllbGQ9e3RoaXMucHJvcHMuY29sLnR5cGV9PlxyXG5cdFx0XHRcdFx0e3ZhbHVlfVxyXG5cdFx0XHRcdDwvSXRlbXNUYWJsZVZhbHVlPlxyXG5cdFx0XHQ8L0l0ZW1zVGFibGVDZWxsPlxyXG5cdFx0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGV4dENvbHVtbjtcclxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uL0ZpZWxkJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQuY3JlYXRlKHtcclxuXHRkaXNwbGF5TmFtZTogJ1RleHRGaWVsZCcsXHJcblx0c3RhdGljczoge1xyXG5cdFx0dHlwZTogJ1RleHQnLFxyXG5cdH0sXHJcbn0pO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQge1xyXG5cdEZvcm1GaWVsZCxcclxuXHRGb3JtSW5wdXQsXHJcblx0Rm9ybVNlbGVjdCxcclxuXHRTZWdtZW50ZWRDb250cm9sLFxyXG59IGZyb20gJy4uLy4uLy4uL2FkbWluL2NsaWVudC9BcHAvZWxlbWVudGFsJztcclxuXHJcbmNvbnN0IElOVkVSVEVEX09QVElPTlMgPSBbXHJcblx0eyBsYWJlbDogJ01hdGNoZXMnLCB2YWx1ZTogZmFsc2UgfSxcclxuXHR7IGxhYmVsOiAnRG9lcyBOT1QgTWF0Y2gnLCB2YWx1ZTogdHJ1ZSB9LFxyXG5dO1xyXG5cclxuY29uc3QgTU9ERV9PUFRJT05TID0gW1xyXG5cdHsgbGFiZWw6ICdDb250YWlucycsIHZhbHVlOiAnY29udGFpbnMnIH0sXHJcblx0eyBsYWJlbDogJ0V4YWN0bHknLCB2YWx1ZTogJ2V4YWN0bHknIH0sXHJcblx0eyBsYWJlbDogJ0JlZ2lucyB3aXRoJywgdmFsdWU6ICdiZWdpbnNXaXRoJyB9LFxyXG5cdHsgbGFiZWw6ICdFbmRzIHdpdGgnLCB2YWx1ZTogJ2VuZHNXaXRoJyB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlICgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bW9kZTogTU9ERV9PUFRJT05TWzBdLnZhbHVlLFxyXG5cdFx0aW52ZXJ0ZWQ6IElOVkVSVEVEX09QVElPTlNbMF0udmFsdWUsXHJcblx0XHR2YWx1ZTogJycsXHJcblx0fTtcclxufVxyXG5cclxudmFyIFRleHRGaWx0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdG1vZGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihNT0RFX09QVElPTlMubWFwKGkgPT4gaS52YWx1ZSkpLFxyXG5cdFx0XHRpbnZlcnRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xlYW4sXHJcblx0XHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0fSksXHJcblx0fSxcclxuXHRzdGF0aWNzOiB7XHJcblx0XHRnZXREZWZhdWx0VmFsdWU6IGdldERlZmF1bHRWYWx1ZSxcclxuXHR9LFxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXI6IGdldERlZmF1bHRWYWx1ZSgpLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHVwZGF0ZUZpbHRlciAodmFsdWUpIHtcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoeyAuLi50aGlzLnByb3BzLmZpbHRlciwgLi4udmFsdWUgfSk7XHJcblx0fSxcclxuXHRzZWxlY3RNb2RlIChlKSB7XHJcblx0XHRjb25zdCBtb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZUZpbHRlcih7IG1vZGUgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR0b2dnbGVJbnZlcnRlZCAoaW52ZXJ0ZWQpIHtcclxuXHRcdHRoaXMudXBkYXRlRmlsdGVyKHsgaW52ZXJ0ZWQgfSk7XHJcblx0XHRmaW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNUYXJnZXQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR1cGRhdGVWYWx1ZSAoZSkge1xyXG5cdFx0dGhpcy51cGRhdGVGaWx0ZXIoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSk7XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cdFx0Y29uc3QgbW9kZSA9IE1PREVfT1BUSU9OUy5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSBmaWx0ZXIubW9kZSlbMF07XHJcblx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGZpZWxkLmxhYmVsICsgJyAnICsgbW9kZS5sYWJlbC50b0xvd2VyQ2FzZSgpICsgJy4uLic7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PFNlZ21lbnRlZENvbnRyb2xcclxuXHRcdFx0XHRcdFx0ZXF1YWxXaWR0aFNlZ21lbnRzXHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUludmVydGVkfVxyXG5cdFx0XHRcdFx0XHRvcHRpb25zPXtJTlZFUlRFRF9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17ZmlsdGVyLmludmVydGVkfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8L0Zvcm1GaWVsZD5cclxuXHRcdFx0XHQ8Rm9ybUZpZWxkPlxyXG5cdFx0XHRcdFx0PEZvcm1TZWxlY3RcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2VsZWN0TW9kZX1cclxuXHRcdFx0XHRcdFx0b3B0aW9ucz17TU9ERV9PUFRJT05TfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17bW9kZS52YWx1ZX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0PC9Gb3JtRmllbGQ+XHJcblx0XHRcdFx0PEZvcm1JbnB1dFxyXG5cdFx0XHRcdFx0YXV0b0ZvY3VzXHJcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX1cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuXHRcdFx0XHRcdHJlZj1cImZvY3VzVGFyZ2V0XCJcclxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlci52YWx1ZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRGaWx0ZXI7XHJcbiIsInZhciBFeE1hdGNoID0gcmVxdWlyZSgnZXhwcmVzc2lvbi1tYXRjaCcpOyAvLyBNYXRjaGVzIG9iamVjdHMgd2l0aCBleHByZXNzaW9uc1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBzb21ldGhpbmcgaXMgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSAge0FueX0gYXJnICAgVGhlIHNvbWV0aGluZyB3ZSB3YW50IHRvIGNoZWNrIHRoZSB0eXBlIG9mXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IElmIGFyZyBpcyBhbiBvYmplY3Qgb3Igbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdCAoYXJnKSB7XHJcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFdmFsdWF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgYSBmaWVsZCBiYXNlZCBvbiBpdHMgZGVwZW5kZW5jaWVzIGFuZCB0aGVpciB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fEFueX0gZGVwZW5kc09uIFRoZSBkZXBlbmRzT24gdmFyaWFibGUgd2UgZ2V0IGZyb20gdGhlIGZpZWxkXHJcbiAqIEBwYXJhbSAge09iamVjdH1cdFx0dmFsdWVzICAgIFRoZSB2YWx1ZXMgY3VycmVudGx5IGluIHRoZSBmaWVsZHNcclxuICogQHJldHVybiB7Qm9vbGVhbn1cdFx0XHQgIElmIHRoZSBjdXJyZW50IGZpZWxkIHNob3VsZCBiZSBkaXNwbGF5ZWQgYmFzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIFx0ICBvbiBpdCdzIGRlcGVuZGVuY2llcyBhbmQgdGhlaXIgdmFsdWVzXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2YWxEZXBlbmRzT24gKGRlcGVuZHNPbiwgdmFsdWVzKSB7XHJcblx0aWYgKCFpc09iamVjdChkZXBlbmRzT24pIHx8ICFPYmplY3Qua2V5cyhkZXBlbmRzT24pLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZmllbGQgc2hvdWxkIGJlIGRpc3BsYXllZCwgYmFzZWQgb24gdGhlIHZhbHVlcyBvZlxyXG5cdC8vIG90aGVyIGZpZWxkcyBhbmQgdGhlIGRlcGVuZHNPbiBjb25maWd1cmF0aW9uIG9mIHRoaXMgZmllbGRcclxuXHR2YXIgTWF0Y2ggPSBuZXcgRXhNYXRjaChkZXBlbmRzT24sIHZhbHVlcywgZmFsc2UpO1xyXG5cdHJldHVybiBNYXRjaC5tYXRjaCgpO1xyXG59O1xyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiZXhwb3J0cy5Db2x1bW5zID0ge1xudGV4dDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy90ZXh0L1RleHRDb2x1bW5cIiksXG5kYXRldGltZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9kYXRldGltZS9EYXRldGltZUNvbHVtblwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwQ29sdW1uXCIpLFxubmFtZTogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9uYW1lL05hbWVDb2x1bW5cIiksXG5lbWFpbDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9lbWFpbC9FbWFpbENvbHVtblwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkQ29sdW1uXCIpLFxuY2xvdWRpbmFyeWltYWdlOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Nsb3VkaW5hcnlpbWFnZS9DbG91ZGluYXJ5SW1hZ2VDb2x1bW5cIiksXG5ib29sZWFuOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2Jvb2xlYW4vQm9vbGVhbkNvbHVtblwiKSxcbmlkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL2NvbXBvbmVudHMvY29sdW1ucy9JZENvbHVtblwiKSxcbl9fdW5yZWNvZ25pc2VkX186IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvY29tcG9uZW50cy9jb2x1bW5zL0ludmFsaWRDb2x1bW5cIiksXG59O1xuZXhwb3J0cy5GaWVsZHMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpZWxkXCIpLFxuZGF0ZXRpbWU6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZGF0ZXRpbWUvRGF0ZXRpbWVGaWVsZFwiKSxcbnJlbGF0aW9uc2hpcDogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9yZWxhdGlvbnNoaXAvUmVsYXRpb25zaGlwRmllbGRcIiksXG5uYW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpZWxkXCIpLFxuZW1haWw6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvZW1haWwvRW1haWxGaWVsZFwiKSxcbnBhc3N3b3JkOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3Bhc3N3b3JkL1Bhc3N3b3JkRmllbGRcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpZWxkXCIpLFxuYm9vbGVhbjogcmVxdWlyZShcIi4uLy4uL2ZpZWxkcy90eXBlcy9ib29sZWFuL0Jvb2xlYW5GaWVsZFwiKSxcbn07XG5leHBvcnRzLkZpbHRlcnMgPSB7XG50ZXh0OiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3RleHQvVGV4dEZpbHRlclwiKSxcbmRhdGV0aW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2RhdGV0aW1lL0RhdGV0aW1lRmlsdGVyXCIpLFxucmVsYXRpb25zaGlwOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL3JlbGF0aW9uc2hpcC9SZWxhdGlvbnNoaXBGaWx0ZXJcIiksXG5uYW1lOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL25hbWUvTmFtZUZpbHRlclwiKSxcbmVtYWlsOiByZXF1aXJlKFwiLi4vLi4vZmllbGRzL3R5cGVzL2VtYWlsL0VtYWlsRmlsdGVyXCIpLFxucGFzc3dvcmQ6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvcGFzc3dvcmQvUGFzc3dvcmRGaWx0ZXJcIiksXG5jbG91ZGluYXJ5aW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvY2xvdWRpbmFyeWltYWdlL0Nsb3VkaW5hcnlJbWFnZUZpbHRlclwiKSxcbmJvb2xlYW46IHJlcXVpcmUoXCIuLi8uLi9maWVsZHMvdHlwZXMvYm9vbGVhbi9Cb29sZWFuRmlsdGVyXCIpLFxufTtcbiJdfQ==
