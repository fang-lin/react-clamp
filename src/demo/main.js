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
          <Clamp className="card" ellipsis="..." autoAdjustInterval={0} ref="aCard" dangerouslySetInnerHTML={{__html: 'Brisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and the'}}>
          </Clamp>
        </div>
        <div className="column">
          <Clamp className="card" ref="bCard">
            Brisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and the
          </Clamp>
        </div>
        <div className="column">
          <Clamp className="card" innerClassName="inner-card" style={{height: "150px"}} innerStyle={{color: "#399"}} ellipsis={'<span>&nbsp;<a href="#">Read More</a></span>'} ref="cCard">
            <div>
              <span>Brisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and theBrisbane’s Waterfront Place and the</span>
              <div>
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
                “Waterfront Place complements our ownership of 480 Queen Street in Brisbane and reinforces our role as a workspace partner for our customers.”
              </div>
            </div>
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