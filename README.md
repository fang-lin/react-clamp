# [react-clamp](https://github.com/oglen/react-clamp)

A React Component which can help you clamp Multi-line text.

## Getting Started

* Install with [npm](https://npmjs.org): `npm install react-clamp`
* Clone the repo: `https://github.com/oglen/react-clamp`

## Usage

1. require react-clamp to your react component:

        import Clamp from 'react-clamp';

2. Use react-clamp in your component:

        class Component extends React.Component {

            componentDidMount() {
                window && window.addEventListener('resize', event => {
                    this.refs.aCard.adjustContext();
                });
            }

            render() {
                return <div className="container">
                    <div className="grid" id="demo">
                        <div className="column">
                            <Clamp className="card" ellipsis="..." ref="aCard" option={{autoAdjustInterval: 0}} >
                            Brisbane’s Waterfront Place and the Eagle Street Pier retail complex were snapped up by property giant Dexus Property Group and Dexus Wholesale Property Fund for a staggering $635 million.
                            </Clamp>
                        </div>
                        <div className="column">
                            <Clamp className="card" ellipsis={<span>&nbsp;<a href="#">Read More</a></span>} ref="bCard">
                            Brisbane’s Waterfront Place and the Eagle Street Pier retail complex were snapped up by property giant Dexus Property Group and Dexus Wholesale Property Fund for a staggering $635 million.
                            </Clamp>
                        </div>
                    </div>
                </div>
            }

            ...
        }
    In default, the option is {autoAdjustInterval: 200}, it will ensure adjusting is automatic.

3. And set the card style:

        .card {
          height: 60px;
          overflow: hidden;
          line-height: 20px;
        }

## Run Demo

There is a clear and concise example in the repo, preview it in following steps:

Enter this project fold and execute:

    npm instasll
    gulp

And visit link:

    /demo/index.html
