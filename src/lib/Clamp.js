import React from 'react';
import merge from 'lodash/merge';

export default class Clamp extends React.Component {

  adjustIntervalHandler = null;

  constructor(props) {
    super(props);

    this.state = {
      context: this.props.children,
      ellipsis: this.props.ellipsis
    };

    this.option = merge({
      autoAdjustInterval: 200
    }, this.props.option);
  }

  _getWrapRect_() {
    return this.refs.wrap.getBoundingClientRect();
  }

  _getContextRect_() {
    return this.refs.context.getBoundingClientRect();
  }

  adjustContext() {

    this.refs.context.innerHTML = this.refs.raw.innerHTML;

    const heightOfWrap = this._getWrapRect_().height;
    const heightOfContext = this._getContextRect_().height;

    const ellipsis = this.refs.ellipsis.innerHTML;
    const text = this.refs.raw.innerText;

    let low = 0, high = text.length, mid = high;

    // First time, check the context height if it higher than wrap, enter adjusting
    if (heightOfContext > heightOfWrap) {
      // Get line-height
      this.refs.context.innerHTML = 'A';
      const lineHeight = this.refs.context.getBoundingClientRect().height;

      mid = high * heightOfWrap / heightOfContext | 0;
      let _text = text.slice(0, mid);

      const upper = 100;
      let count = 0;

      const clamp = () => {
        if (count > upper) return;
        count++;

        _text = text.slice(0, mid);
        this.refs.context.innerHTML = _text + ellipsis;

        const testHeight = this._getContextRect_().height;
        const wrapHeight = this._getWrapRect_().height;

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
      this.refs.context.innerHTML = _text.slice(0, mid - 1) + ellipsis;
    }
  }

  componentDidMount() {
    this.adjustContext();

    if (this.option.autoAdjustInterval > 0) {
      let prevWidthOfWrap = null;
      this.adjustIntervalHandler = setInterval(() => {
        const widthOfWrap = this._getWrapRect_().width;

        if (prevWidthOfWrap !== widthOfWrap) {
          this.adjustContext();
          prevWidthOfWrap = widthOfWrap;
        }

      }, this.option.autoAdjustInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.adjustIntervalHandler);
  }

  render() {
    return <div className={this.props.className} ref="wrap">
      <div ref="context"></div>
      <div ref="raw" style={{opacity: 0}}>
        <span ref="text">{this.props.children}</span>
        <span ref="ellipsis">{this.props.ellipsis}</span>
      </div>
    </div>
  }
}