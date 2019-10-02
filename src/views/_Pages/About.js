import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextZone from '../../components/TextZone'

import top from '../../assets/img/5mejores.png'
import best from '../../assets/img/best_squada.png';
import rock from '../../assets/img/ROCKING.png';

class About extends Component {

    state = {
        bio: [
            'Soy front-end devepoloper y bachiller de Ciencias Administrativas. Me apasiona el mundo digital, el diseño y particularmente amo programar. Disfruto crear sitios web interactivos y fáciles de usar, estoy aprendiendo constantemente sobre nuevas tecnologias.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Me encantan los retos, tengo la plena capacidad de dirigir y realizar proyectos en equipo, de colaborar continuamente para crear soluciones y hacer de este mundo un lugar mejor.',
            'Mi deseo en el futuro es seguir desarrollandome hasta llegar a ser full stack developer, porque eso me hace feliz.'
        ],

    }

    render() {
        const _background = this.props.background ? {background: this.props.background} : null
        const _textColor = this.props.textColor ? {color: this.props.textColor} : null
        const _titleTextColor = this.props.titleTextColor ? this.props._titleTextColor : null

        const listBio = this.state.bio.map((b,index) => {
            return (
                <p key={index} aria-label="Hola." className="blast-root" style={_textColor}>
                    <span className="blast" aria-hidden="true" style={{ opacity: "1" }}>{b}</span>
                </p>
            )
        })

        return (
            <div id="page" className="en" style={_background}>
                <div className="container about" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                    <span className="tags top-tags"> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>
                    <TextZone texto={['Acerca de mí']} color={_titleTextColor}>
                        {
                            listBio
                        }
                    </TextZone>

                    <div className="sound-cloud">
                        <h2 className="section-title">{'_Distinción de Laboratoria.'}</h2>
                        <div className="distinciones">
                            <div className="reconocimiento text-center">
                                <h2>Excelencia</h2>
                                <div className="top">
                                    <img src={top} style={{ width: "80px", height: "75px" }} alt="top" />&nbsp;
                            </div>
                            </div>
                            <div className="reconocimiento text-center">
                                <h2>Sobresaliente</h2>
                                <div className="rock">
                                    <img src={rock} alt="rock" />&nbsp;
                            </div>
                            </div>
                            <div className="reconocimiento text-center">
                                <h2>Trabajo en equipo</h2>
                                <div className="best">}
                                <img src={best} alt="best squad" />&nbsp;
                            </div>
                            </div>
                        </div>
                    </div>
                    <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt;</span>
                </div>
                {/* <div className="photoportada"></div> */}
            </div>
        );
    }
}

export default About;