import React from 'react';
import merge from 'lodash/merge';

const _requestAnimationFrame_ = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : cb => cb();
const _cancelAnimationFrame_ = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : cb => cb();

class Clamp extends React.Component {

    adjustIntervalHandler = null;
    requestAnimationFrameHandler = null;

    constructor(props) {
        super(props);

        this.option = merge({
            autoAdjustInterval: 300
        }, this.props.option);
    }

    _getWrapRect_() {
        return this.refs.wrap.getBoundingClientRect();
    }

    _getContextRect_() {
        return this.refs.context.getBoundingClientRect();
    }

    adjustContext() {
        this.refs.context.innerHTML = this.refs.text.innerText;

        const heightOfWrap = this._getWrapRect_().height;
        const heightOfContext = this._getContextRect_().height;

        if (heightOfContext > heightOfWrap) {
            const text = this.refs.text.innerText;
            const ellipsis = this.refs.ellipsis.innerHTML;

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
        _cancelAnimationFrame_(this.requestAnimationFrameHandler);
    }

    render() {
        return <div className={this.props.className} ref="wrap" style={this.props.style}>
            <div ref="context"></div>
            <div ref="raw" style={{opacity: 0}}>
                <span ref="text"
                      dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>{this.props.children}</span>
                <span ref="ellipsis">{this.props.ellipsis}</span>
            </div>
        </div>
    }
}

export default Clamp;
