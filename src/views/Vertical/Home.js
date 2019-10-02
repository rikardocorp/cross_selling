import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import TextZone from '../../components/TextZone'
import { _base } from './route'
import { connect } from 'react-redux'


class Home extends Component {

    state = {}

    render() {
        const localBaseUrl = _base.path
        const _keywords = this.props.keywords.join(' / ')
        return (
            <div id='page'>
                <div className="photohome position-absolute"></div>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col col-12 col-sm-10 col-md-7 col-lg-7 col-xl-5">
                            <div className="container-vertical home-page" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                                <span className="tags top-tags">&lt;html&gt; <br /> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>
                                <div className="content-text-zone d-flex align-items-center justify-content-end" style={{ minHeight: '100vh' }}>
                                    <TextZone className='pl-5' texto={this.props.title}>
                                        <h2>{_keywords}</h2>
                                        <NavLink className="flat-button" to={localBaseUrl + "/contact"}>CONTÁCTAME</NavLink>
                                    </TextZone>
                                </div>

                                <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt; </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.general.portada.title,
        keywords: state.general.portada.keywords,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         isHidden: () => dispatch(actions.isHidden()),
//         clickit: () => dispatch(actions.clickit()),
//     }
// }

export default connect(mapStateToProps)(Home);