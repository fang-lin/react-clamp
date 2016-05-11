'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clamp = function (_React$Component) {
  _inherits(Clamp, _React$Component);

  function Clamp(props) {
    _classCallCheck(this, Clamp);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Clamp).call(this, props));

    _this.adjustIntervalHandler = null;


    _this.state = {
      context: _this.props.children,
      ellipsis: _this.props.ellipsis
    };

    _this.option = (0, _merge2.default)({
      autoAdjustInterval: 200
    }, _this.props.option);
    return _this;
  }

  _createClass(Clamp, [{
    key: '_getWrapRect_',
    value: function _getWrapRect_() {
      return this.refs.wrap.getBoundingClientRect();
    }
  }, {
    key: '_getContextRect_',
    value: function _getContextRect_() {
      return this.refs.context.getBoundingClientRect();
    }
  }, {
    key: 'adjustContext',
    value: function adjustContext() {
      var _this2 = this;

      this.refs.context.innerHTML = this.refs.raw.innerHTML;

      var heightOfWrap = this._getWrapRect_().height;
      var heightOfContext = this._getContextRect_().height;

      var ellipsis = this.refs.ellipsis.innerHTML;
      var text = this.refs.raw.innerText;

      var low = 0,
          high = text.length,
          mid = high;

      // First time, check the context height if it higher than wrap, enter adjusting
      if (heightOfContext > heightOfWrap) {
        (function () {
          // Get line-height
          _this2.refs.context.innerHTML = 'A';
          var lineHeight = _this2.refs.context.getBoundingClientRect().height;

          mid = high * heightOfWrap / heightOfContext | 0;
          var _text = text.slice(0, mid);

          var upper = 100;
          var count = 0;

          var clamp = function clamp() {
            if (count > upper) return;
            count++;

            _text = text.slice(0, mid);
            _this2.refs.context.innerHTML = _text + ellipsis;

            var testHeight = _this2._getContextRect_().height;
            var wrapHeight = _this2._getWrapRect_().height;

            if (testHeight > wrapHeight) {
              high = mid - 1;
            } else {
              low = mid + 1;
            }

            if (low <= high) {
              mid = (low + high) / 2 | 0;
              clamp();
            }
          };

          clamp();
          _this2.refs.context.innerHTML = _text.slice(0, mid - 1) + ellipsis;
        })();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.adjustContext();

      if (this.option.autoAdjustInterval > 0) {
        (function () {
          var prevWidthOfWrap = null;
          _this3.adjustIntervalHandler = setInterval(function () {
            var widthOfWrap = _this3._getWrapRect_().width;

            if (prevWidthOfWrap !== widthOfWrap) {
              _this3.adjustContext();
              prevWidthOfWrap = widthOfWrap;
            }
          }, _this3.option.autoAdjustInterval);
        })();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.adjustIntervalHandler);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, ref: 'wrap' },
        _react2.default.createElement('div', { ref: 'context' }),
        _react2.default.createElement(
          'div',
          { ref: 'raw', style: { opacity: 0 } },
          _react2.default.createElement(
            'span',
            { ref: 'text' },
            this.props.children
          ),
          _react2.default.createElement(
            'span',
            { ref: 'ellipsis' },
            this.props.ellipsis
          )
        )
      );
    }
  }]);

  return Clamp;
}(_react2.default.Component);

exports.default = Clamp;