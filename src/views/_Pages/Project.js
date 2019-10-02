import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextZone from '../../components/TextZone'
import GridItems from '../../components/GridItems'
import { Redirect, Switch, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import {_base} from './route'
import imgProject from '../../assets/img/project1.png'

const GridData = ({data}) => {
    return (   
        <GridItems data={data}></GridItems>    
    )
}

class Project extends Component {

    state = {
        projects1: [
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            }
        ],
        projects2: [
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject
            },
            {
                title: 'Trello',
                content: 'Plataforma para gestión de proyectos con react.js y sass.',
                github: 'https://github.com/AydeeQM/Trello-firebase',
                website: 'https://trello-fire.firebaseapp.com/',
                image: imgProject                
            }
        ]
    }

    render() {
        const localBaseUrl = _base.path + '/project'
        const projects1 = this.state.projects1 ? this.state.projects1 : []
        const projects2 = this.state.projects2 ? this.state.projects2 : []

        const component1 =  <GridData data={projects1}></GridData>
        const component2 =  <GridData data={projects2}></GridData>

        return (
            <div id="page" className="en">
                <div className="gallery" style={{ opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                    <span className="tags top-tags"> &nbsp;&nbsp;&nbsp;&lt;body&gt;</span>
                    <div className="portafolio">
                        <div className="portafolio-content">
                            <div className="project_container">
                                <div id="mySidenav" className="sidenav">
                                    <div className="select-project" id="projects" >
                                        <NavLink to={localBaseUrl +"/mypro"} className="filter" >Mis Proyectos</NavLink>
                                    </div>
                                    <div className="select-project" id="blog">
                                        <NavLink to={localBaseUrl +"/procolab"} className="filter" >Proyectos Colaborativos</NavLink>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <Switch>
                                        <Route exact path={localBaseUrl} render={() => <Redirect to={localBaseUrl +"/mypro"} />} />
                                        <Route path={localBaseUrl + "/mypro"} render={()=>component1} />
                                        <Route path={localBaseUrl + "/procolab"} component={()=>component2} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="tags bottom-tags"> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br></br> &lt;/html&gt;</span>
                </div>
            </div>
        );
    }
}

export default Project;