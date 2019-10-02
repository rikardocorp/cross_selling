import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import photo from '../../assets/img/logo.png';
import * as actions from "../../store/actions"

class HeaderScroll extends Component {
    render() {
        console.log('ROUTES')
        const routes = this.props.routes ? this.props.routes : null 
        const socials = this.props.socials ? this.props.socials : null 
        routes.pop()
        console.log(routes)

        const links = routes.map((li, index) => {
            return (
                <Link 
                    key={index} 
                    activeClass="active" 
                    to={li.rel}
                    // className={li.className}
                    smooth={true}
                    spy={true}
                    offset={-50}
                    duration={1000}
                >
                    <i className={li.icon}></i>
                </Link>
            )
        })

        const links_socials = socials.map((li, index)=> {
            return (
                <li key={index}>
                    <a href={li.url} target="_blank" rel='noopener noreferrer' ><i className={"fa fa-" + li.icon}></i></a>
                </li>
            )
        })

        return (
            <div id="nav_bar">
                <NavLink className="logo" to={"/home"}>
                    <span>{this.props.initials}</span>
                    {/* <img src={photo} alt="Front-end Developer Logo, Web Developer Logo , Front End Developer Logo" /> */}
                </NavLink>
                <nav className="en">
                {
                    links
                }
                </nav>
                <ul className='socials'>
                {
                    links_socials
                }
                </ul>
                <a id="mobile-link" onClick={() => this.props.isHidden()}><i className="fa fa-bars"></i></a>
                {this.props.showing &&
                    <nav className={"en show"}>
                        <NavLink rel="index" onClick={() => this.props.clickit()} className="link-home" exact path="/" to={"/home"}><i className="icon-home"></i></NavLink>
                        <NavLink rel="about" onClick={() => this.props.clickit()} className="link-page" to={"/about"}><i className="icon-prof"></i></NavLink>
                        <NavLink rel="skills" onClick={() => this.props.clickit()} className="link-page" to={"/skill"}><i className="icon-gear"></i></NavLink>
                        <NavLink rel="gallery" onClick={() => this.props.clickit()} className="link-page" to={"/project"}><i className="icon-eye"></i></NavLink>
                        <NavLink rel="contact" onClick={() => this.props.clickit()} className="link-page" to={"/contact"}><i className="icon-mail"></i></NavLink>
                    </nav>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showing: state.general.showing,
        isHide: state.general.isHide,
        // initials: state.general.portada.initials,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isHidden: () => dispatch(actions.isHidden()),
        clickit: () => dispatch(actions.clickit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderScroll);