// Pages
import Main from "./Pages";

import Home from './Home'
import About from './About'
import Skills from './Skills'
import Project from './Project'
import Contact from './Contact'


export const _base = {name: 'Authentication', path: '/auth'}

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        {
            path: _base.path +"/home",
            component: Home,
            name: 'Login',
            rel: 'index',
            icon: "icon-home",
            className: 'link-home',
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/about",
            component: About,
            name: 'About',
            rel: 'about',
            icon: "icon-prof",
            className: 'link-page',
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/skill",
            component: Skills,
            name: 'Skill',
            rel: 'skill',
            icon: "icon-gear",
            className: 'link-page',
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/project",
            component: Project,
            name: 'Project',
            rel: 'project',
            icon: "icon-eye",
            className: 'link-page',
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/contact",
            component: Contact,
            name: 'Contact',
            rel: 'contact',
            icon: "icon-mail",
            className: 'link-page',
            visible: true,
            meta: {requiredNoAuth:true}
        },

        {redirect: true, path: _base.path, to: _base.path + "/home"}
    ]

}
