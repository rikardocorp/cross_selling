// Pages
import React, { Component } from 'react';
import Main from "./Vertical";
import Home from './Home'
import VerticalPages from './VerticalPages'


export const _base = {name: 'Vertical', path: ''}

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        {
            path: _base.path +"/",
            component: VerticalPages,
            name: 'Vertical',
            rel: 'home',
            icon: "icon-home",
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/",
            component: null,
            name: 'Summary',
            rel: 'summary',
            icon: "fa fa-user-circle-o",
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/",
            component: null,
            name: 'Education',
            rel: 'education',
            icon: "fa fa-university",
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {
            path: _base.path +"/",
            component: null,
            name: 'Experience',
            rel: 'experience',
            icon: "fa fa-suitcase",
            visible: true,
            meta: {requiredNoAuth:true}
        },
        {redirect: true, path: _base.path, to: _base.path + "/"}
    ]

}
