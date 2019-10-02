import React, { Component } from 'react';

class Divisor extends Component {

    render() {
        const {count=3} = this.props
        
        const divisors = []
        for (let i=0; i<count; i++) {
            divisors.push(
                <div key={i} className="divisor hvr-wobble-horizontal">
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>
            )
        }

        return (
            <div className="content-divisor">
                {
                    divisors
                }
            </div>
        );
    }
}

export default Divisor;