import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

// import TextZone from '../../components/TextZone'
import Divisor from '../../components/Divisor'
import Profile from '../../containers/Profile/Profile'
import Summary from '../../containers/Pages/Summary'
import Education from '../../containers/Pages/Education/Education'
import Expertise from '../../containers/Pages/Expertise'
import Experience from '../../containers/Pages/Experience/Experience'
import { StickyContainer, Sticky } from 'react-sticky'
import { connect } from 'react-redux'


class About extends Component {

    state = {}

    render() {
        const _background = this.props.background ? { background: this.props.background } : null
        const _textColor = this.props.textColor ? { color: this.props.textColor } : null
        const _titleTextColor = this.props.titleTextColor ? this.props.titleTextColor : null

        const about_me = this.props.about_me
        const education = this.props.education
        const expertise = this.props.expertise
        const experience = this.props.professional_experience
        const _summary = about_me.summary
        const _keywords = about_me.keywords

        delete about_me['summary']
        delete about_me['keywords']

        return (
            <StickyContainer>
                <div className='container-page container-fluid' style={_background}>
                    {/* <span className="tags top-tags">&lt;html&gt; <br /> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span> */}
                    <div className="row">
                        <div className="col-5 col-md-5 col-xl-4">
                            <Sticky bottomOffset={80}>
                                {({ style, isSticky }) => (
                                    <div style={style} >
                                        <Profile dataProfile={about_me} isSticky={isSticky} />
                                    </div>
                                )}
                            </Sticky>
                        </div>

                        <div className="col-7 col-md-7 col-xl-8">
                            <Element name="summary">
                                <Summary summary={_summary} keywords={_keywords} />
                            </Element>
                            <Divisor count={2}></Divisor>
                            <Expertise data={expertise}></Expertise>
                            <br /><br /><br />
                            <Element name="education">
                                <Education data={education}></Education>
                            </Element>
                            <Divisor count={3}></Divisor>
                            <Element name="experience">
                                <Experience data={experience}></Experience>
                            </Element>
                        </div>
                    </div>
                    {/* <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt; </span> */}
                </div>
            </StickyContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        about_me: state.general.about_me,
        education: state.general.education,
        expertise: state.general.expertise,
        professional_experience: state.general.professional_experience
    }
}

export default connect(mapStateToProps)(About);
