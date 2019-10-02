// Pages
import React, { Component } from 'react';
import Main from "./Principal";


export const _base = { name: 'Principal', path: '/' }

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    // meta: { requiredNoAuth: true }
    // routes:[]
}
