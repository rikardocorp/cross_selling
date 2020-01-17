import React, { Component } from 'react';
import Main from './Index'
import ListProducts from './Products/ListProducts'
import Product from './Product/Index'

export const _base = { name: 'Main', path: '' }

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
            component: ListProducts, //() => <ListProductsDemo version={'ver1'}/>,
            name: 'Catalog',
            meta: { requiredNoAuth: true }
        },

        {
            path: _base.path + "/sku/:id",
            component: Product, //() => <Product typeVersion='ver1' version='v11'/>,
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


