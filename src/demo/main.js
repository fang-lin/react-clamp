import React from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import debounce from 'lodash/debounce';
import Clamp from '../lib/Clamp';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window && window.addEventListener('resize', debounce(event => {
      this.refs.aCard.adjustContext();
    }, 300));
  }

  render() {
    return <div className="container">
      <div className="grid" id="demo">
        <div className="column">
          <Clamp className="card" ellipsis="..." option={{autoAdjustInterval: 0}} ref="aCard">
            Some of Australia’s largest waterfront office buildings are changing hands, with Melbourne’s South Wharf Tower up for sale and a Brisbane building fetching one of the highest prices for an office complex in the past
          </Clamp>
        </div>
        <div className="column">
          <Clamp className="card" ellipsis={<span>&nbsp;<a href="#">Read More</a></span>} option={{}} ref="bCard">
            Brisbane’s Waterfront Place and the Eagle Street Pier retail complex were snapped up by property giant Dexus Property Group and Dexus Wholesale Property Fund for a staggering $635 million.
          </Clamp>
        </div>
        <div className="column">
          <Clamp className="card" ellipsis="..." option={{}} ref="cCard">
            “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
          </Clamp>
        </div>
      </div>
    </div>
  }
}

const target = document.createElement('div');
target.id = 'app';
document.body.appendChild(target);

render(<App id="root"/>, target);