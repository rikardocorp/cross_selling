import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Home from './Home'
import About from './About'
import Page from './Page'

class VerticalPages extends Component {
    render() {
        return (
            <div className='vertical-page'>
                <section className='background-principal'>
                    <Element name="home" style={{ height: '100vh' }}>
                        <Home></Home>
                    </Element>
                </section>
                <section className='section'>
                    <About background={'white'}></About>
                </section>
                <Element>
                    <section className='section'><Page ></Page></section>
                </Element>

                {/* <section className='background-principal'><Home></Home></section> */}
                {/* <section><About background={'white'} textColor={'black'}></About></section> */}
                {/* <section><About background={'red'} textColor={'black'}></About></section> */}
            </div>
        );
    }
}

export default VerticalPages;