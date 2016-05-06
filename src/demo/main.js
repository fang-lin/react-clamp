import React from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import LineClamp from '../lib/LineClamp';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window && window.addEventListener('resize', event => {
      this.refs.aCard.adjustContext();
      this.refs.bCard.adjustContext();
      this.refs.cCard.adjustContext();
    });
  }

  render() {
    return <div className="container">
      <div className="grid" id="demo">
        <div className="column">
          <LineClamp className="card" ellipsis="..." ref="aCard">
            Some of Australia’s largest waterfront office buildings are changing hands, with Melbourne’s South Wharf Tower up for sale and a Brisbane building fetching one of the highest prices for an office complex in the past
          </LineClamp>
        </div>
        <div className="column">
          <LineClamp className="card" ellipsis={<span>&nbsp;<a href="#">Read More</a></span>} ref="bCard">
            Brisbane’s Waterfront Place and the Eagle Street Pier retail complex were snapped up by property giant Dexus Property Group and Dexus Wholesale Property Fund for a staggering $635 million.
          </LineClamp>
        </div>
        <div className="column">
          <LineClamp className="card" ellipsis=">" ref="cCard">
            “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
          </LineClamp>
        </div>
      </div>
    </div>
  }
}

const target = document.createElement('div');
target.id = 'app';
document.body.appendChild(target);

render(<App id="root"/>, target);