import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextZone from '../../components/TextZone'

class Skills extends Component {

    state = {
        content: 'El área principal de mi experiencia es el desarrollo de front-end y todo lo relacionado con este lado de la web. HTML, CSS, JS (ES5, ES6), creación de aplicaciones Web pequeñas y medianas, React.js, Angular.Js, Vue.js, creación de complementos personalizados, características, animaciones y diseños de codificación simple.',
        skills: [
            {
                title: 'Habilidades Técnicas',
                data: [
                    'devicon-html5-plain-wordmark',
                    'devicon-javascript-plain',
                    'devicon-css3-plain-wordmark',
                    'devicon-react-original-wordmar',
                    'devicon-jquery-plain-wordmark',
                    'devicon-bootstrap-plain-wordmark',
                    'devicon-sass-original',
                    'devicon-git-plain-wordmark'
                ]
            },
            {
                title: 'Desing Skills',
                data: [
                    'devicon-photoshop-plain',
                    'devicon-illustrator-plain'
                ]
            }
        ]
    }

    render() {
        return (
            <div id="page" className="en">
                <div className="container skills" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                    <span className="tags top-tags"> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>
                    <TextZone texto={['Habilidades &', 'Experiencia']}>
                        <p className="blast-root">
                            <span className="blast" aria-hidden="true" style={{ opacity: "1" }}>{this.state.content}</span>
                        </p>
                    </TextZone>

                    <div className="skills-charts">
                        <div className="section-skills">
                        {
                            this.state.skills.map((skill, idx) => {

                                const data = skill.data.map((d, index) => {
                                    return (
                                        <div key={index} className="progress-radial progress-85">
                                            <div className="overlay"><i className={d + ' colored'}></i></div>
                                        </div>
                                    )
                                })

                                return (
                                    <div key={idx}>
                                        <div>
                                            <h3 className="section-item-title-2"><i className="fa fa-code"></i>&nbsp;&nbsp; {skill.title}</h3>
                                        </div>
                                        <div className="container-fluid wrap">
                                            <div className="hability ">
                                            {
                                                data
                                            }
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }
                        </div>
                    </div>
                    <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt; </span>
                </div>
            </div>
        );
    }
}

export default Skills;