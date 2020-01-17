import React, { Component } from 'react';
import Main from './Index'
import Segmentation from './Segmentation/Index'

export const _base = { name: 'mvp', path: '/mvp' }

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        {
            path: _base.path + "/",
            component: Segmentation, //() => <ListProductsDemo version={'ver1'}/>,
            name: 'Segmentation',
            meta: { requiredNoAuth: true }
        },

        // {
        //     path: _base.path + "/sku/:id",
        //     component: Product, //() => <Product typeVersion='ver1' version='v11'/>,
        //     name: 'Product',
        //     meta: { requiredNoAuth: true }
        // },
        // { redirect: true, path: _base.path, to: _base.path + "/ver1" }
    ]

}


