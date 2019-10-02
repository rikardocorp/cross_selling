import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import TextZone from '../../components/TextZone'
import {_base} from './route'

class Home extends Component {

    state = {
        title: ['Hola,', 'Soy Ricardo,', 'Data Scientist.']
    }

    render() {
        const localBaseUrl = _base.path
        return (
            <div id="page" className="en">
                <div className="container home-page" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                    <span className="tags top-tags"> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>
                    <TextZone texto={this.state.title}>
                        <h2>Front End Developer / Javascript / React / Redux</h2>
                        <NavLink className="flat-button" to={localBaseUrl +"/contact"}>CONTÁCTAME</NavLink>
                    </TextZone>
                    <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt; </span>
                </div>
                <div className="photohome"></div>
            </div>
        );
    }
}

export default Home;