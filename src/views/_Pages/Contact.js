import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextZone from '../../components/TextZone'

class Contact extends Component {

    onSubmit = (e, a) => {
        e.preventDefault();
        const data = {
            name: e.target[0].value,
            email: e.target[1].value,
            subject: e.target[2].value,
            message: e.target[3].value
        }
        console.log(data)
        this.reset()
    }

    reset = () => {
        document.getElementById('contact').reset();
    }

    render() {
        return (
            <div id="page" className="en">
                <div className="container contact" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                    <span className="tags top-tags"> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>

                    <TextZone texto={['Contáctame']}>
                        <p>Si tiene alguna pregunta, no dude en ponerse en contacto...</p>
                        <div className="contact-form">
                            <form id="contact" onSubmit={this.onSubmit}>
                                <ul>
                                    <li className="half animated fadeInUp">
                                        <input className="input__field input__field--hoshi" placeholder="Nombre" type="text" name="name"  />
                                        <label className="input__label input__label--hoshi input__label--hoshi-color-2"></label></li>
                                    <li className="half animated fadeInUp">
                                        <input className="input__field input__field--hoshi" placeholder="Correo" type="email" name="email"  />
                                        <label className="input__label input__label--hoshi input__label--hoshi-color-2"></label></li>
                                    <li className="animated fadeInUp">
                                        <input className="input__field input__field--hoshi" placeholder="Asunto" type="text" name="subject" />
                                        <label className="input__label input__label--hoshi input__label--hoshi-color-2"></label></li>
                                    <li className="animated fadeInUp">
                                        <textarea className="input__field input__field--hoshi" placeholder="Message" name="msg" ></textarea>
                                        <label className="input__label input__label--hoshi input__label--hoshi-color-2"></label></li>
                                    <li className="submit animated fadeInUp">
                                        <input id="submit" type="submit" className="flat-button" value="ENVIAR" />
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="contactos">
                            <a target="_blank" title="Mi repositorio" href="https://github.com/AydeeQM" rel='noopener noreferrer'><span className="icon-github"></span></a>
                            <a target="_blank" title="Mi linkendin" href="https://www.linkedin.com/in/aydeequispe" rel='noopener noreferrer'><span className="icon-linkedin"></span></a>
                            <a title="aydee.qm@gmail.com" href="mailto:aydee.qm@gmail.com" rel='noopener noreferrer'><span className="icon-contact_mail"></span></a>
                            <a target="_blank" title="Contáctame (+51) 979039472" href="https://api.whatsapp.com/send?phone=51979039472&" rel='noopener noreferrer' ><span className="icon-whatsapp"></span></a>
                            <a target="_blank" href="cv-aydee.pdf" title="Descarga mi CV" download="cv-aydee.pdf" rel='noopener noreferrer'><span className="icon-cloud-download"></span></a>
                        </div>
                    </TextZone>

                    <div className="map-wrap">
                        <div id="map">
                            <div className="frase">
                                <p>“Vivo cada día de mi vida </p><p>
                                </p><p>como si fuera el último, </p>
                                <p> y aprendo </p><p>
                                </p><p>como si fuese a vivir</p>
                                <p>para siempre”.</p><p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt;</span>
                </div>
            </div>
        );
    }
}

export default Contact;