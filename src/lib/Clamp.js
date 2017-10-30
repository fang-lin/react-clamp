import React from 'react';
import merge from 'lodash/merge';

const _requestAnimationFrame_ = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : cb => cb();
const _cancelAnimationFrame_ = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : cb => cb();

class Clamp extends React.Component {

    adjustIntervalHandler = null;
    requestAnimationFrameHandler = null;
    rawContextText = null;
    autoAdjustInterval = 300;

    constructor(props) {
        super(props);
        if (Number.isInteger(this.props.autoAdjustInterval))
            this.autoAdjustInterval = Math.abs(this.props.autoAdjustInterval);
    }

    _getWrapRect_() {
        return this.refs.wrap.getBoundingClientRect();
    }

    _getContextRect_() {
        return this.refs.context.getBoundingClientRect();
    }

    adjustContext() {

        const heightOfWrap = this._getWrapRect_().height;
        const heightOfContext = this._getContextRect_().height;

        if (heightOfContext > heightOfWrap) {
            const text = this.rawContextText;
            const ellipsis = this.props.ellipsis || '';

            let low = 0, high = text.length, mid;
            let count = 0;

            const clamp = () => {
                if (count > 100) return;
                count++;

                mid = (low + high) / 2 | 0;
                const _text = text.slice(0, mid);
                this.refs.context.innerHTML = _text + ellipsis;

                const contextHeight = this._getContextRect_().height;
                const wrapHeight = this._getWrapRect_().height;

                if (contextHeight > wrapHeight) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }

                if (low <= high) {
                    this.requestAnimationFrameHandler = _requestAnimationFrame_(clamp);
                } else {
                    this.refs.context.innerHTML = _text.slice(0, mid - 1) + ellipsis;
                }
            };

            clamp();
        }
    }

    componentDidMount() {
        this.rawContextText = this.refs.context.innerText;
        this.adjustContext();

        if (this.autoAdjustInterval > 0) {
            let prevWidthOfWrap = null;
            this.adjustIntervalHandler = setInterval(() => {
                const widthOfWrap = this._getWrapRect_().width;

                if (prevWidthOfWrap !== widthOfWrap) {
                    this.adjustContext();
                    prevWidthOfWrap = widthOfWrap;
                }

            }, this.autoAdjustInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.adjustIntervalHandler);
        _cancelAnimationFrame_(this.requestAnimationFrameHandler);
    }

    render() {
        return <div className={this.props.className} ref="wrap" style={this.props.style}>
            <div ref="context" className={this.props.innerClassName} style={this.props.innerStyle} dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>{this.props.children}</div>
        </div>
    }
}

export default Clamp;
