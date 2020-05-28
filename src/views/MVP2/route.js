import React, { Component } from 'react';
import Main from './Index'
import Catalog from './Catalog/Index'
import Product from '../NewCatalog/Product/Index'


export const _base = { name: 'mvp_moda', path: '/mvp_moda' }

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        {
            path: _base.path + "/",
            component: () => <Catalog params={{ basepath: _base.path }} />, //() => <ListProductsDemo version={'ver1'}/>,
            name: 'CatalogModa',
            meta: { requiredNoAuth: true }
        },
        {
            path: _base.path + "/sku/:id",
            component: () => <Product params={{ basepath: _base.path }} />,
            name: 'Product',
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


