import React, { Component } from 'react';
import Main from './Index'
import ListProducts from './Products/ListProducts'
import Product from './Product/Index'

export const _base = { name: 'Catalogue', path: '/catalogo' }

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        // {
        //     path: _base.path + "/",
        //     component: ListProducts,
        //     name: 'Catalog',
        //     // rel: 'home',
        //     // icon: "icon-home",
        //     // visible: true,
        //     meta: { requiredNoAuth: true }
        // },
        {
            path: _base.path + "/",
            component: () => <ListProducts params={{ basepath: _base.path }} />, //() => <ListProductsDemo version={'ver1'}/>,
            name: 'ListProducts',
            meta: { requiredNoAuth: true }
        },

        {
            path: _base.path + "/sku/:id",
            component: () => <Product params={{basepath: _base.path}}/>,
            name: 'Product',
            meta: { requiredNoAuth: true }
        },
        // {
        //     path: _base.path + "/oe",
        //     component: OE_Modal,
        //     name: 'OE_Modal',
        //     meta: { requiredNoAuth: true }
        // },
        // {
        //     path: _base.path + "/upload",
        //     component: Upload,
        //     name: 'Upload',
        //     meta: { requiredNoAuth: true }
        // },
        // { redirect: true, path: _base.path, to: _base.path + "/ver1" }
    ]

}


