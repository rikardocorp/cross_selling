import React, { Component } from 'react';
import TextZone from '../../components/TextZone'
import SubTitle from '../../components/SubTitle'
import Image from '../../assets/img/profile.jpeg'

class Page extends Component {

    state = {
        education: [
            {
                years: '2013 -- 2017',
                title: 'phd',
                thesis_title: 'On semantic solutions for efficient  approximate similarity search on large-scale datasets',
                where: 'UNSA',
                advisor: 'Cristian Lopez del ALamo'
            }
        ]
    }

    render() {
        const _background = this.props.background ? { background: this.props.background } : null
        const _textColor = this.props.textColor ? { color: this.props.textColor } : null
        const _titleTextColor = this.props.titleTextColor ? this.props.titleTextColor : null

        const education = this.state.education

        const _education = education.map((item, index)=> {
            return (
                <div key={index}>

                </div> 
            )
        })


        return (
            <div className='container-page' style={_background}>
                <div className="row">
                    <div className="col-5 col-md-5 col-xl-4"></div>

                    <div className="col-7 col-md-7 col-xl-8">
                        <section>
                            <SubTitle texto={['Education']} titleTextColor={_titleTextColor}></SubTitle>
                            <div className="text pl-5 ml-5">
                                {
                                    _education
                                }
                            </div>


                        </section>
                    </div>
                </div>
                {/* <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt; </span> */}
            </div>
        );
    }
}

export default Page;