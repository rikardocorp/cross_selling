import React, { Component } from 'react';


class GridItems extends Component {
    render() {
        const projects = this.props.data ? this.props.data : []

        return (
            <section className="main">
                <ul className="ch-grid">
                {
                    projects.map((pro, index) => {
                        console.log(pro.image)
                        return (
                            <li key={index}>
                                <div 
                                    className="ch-item onlyimg" 
                                    style={{backgroundImage: "url('" + pro.image + "')"}}>
                                    <div className="ch-info">
                                        <h3>{pro.title}</h3>
                                        <p>{pro.content}</p>
                                        <figcaption >
                                            <div className="classless">
                                                <div className="icon"><a href={pro.github} target="_blank" rel='noopener noreferrer' ><i className="fa fa-github" aria-hidden="true"></i></a></div>
                                                <a className="icon venobox vbox-item" href={pro.website} target="_blank" rel='noopener noreferrer'><i className="fa fa-laptop" aria-hidden="true"></i></a>
                                            </div>
                                        </figcaption>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
            </section>
        );
    }
}

export default GridItems;