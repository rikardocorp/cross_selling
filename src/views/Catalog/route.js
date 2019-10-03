// Pages
import React, { Component } from 'react';
import Main from "./Catalog";
// import Home from './Home'
import ListProducts from './ListProducts'
import ListProductsDemo from './ListProductsDemo'

import Product from './Product/Product'


export const _base = { name: 'Catalog', path: '' }

export const route = {
    path: _base.path,
    name: _base.name,
    component: Main,
    routes: [
        {
            path: _base.path + "/",
            component: ListProducts,
            name: 'Catalog',
            // rel: 'home',
            // icon: "icon-home",
            // visible: true,
            meta: { requiredNoAuth: true }
        },
        {
            path: _base.path + "/demo",
            component: ListProductsDemo,
            name: 'Catalog',
            // rel: 'home',
            // icon: "icon-home",
            // visible: true,
            meta: { requiredNoAuth: true }
        },
        {
            path: _base.path + "/sku/:id",
            component: Product,
            name: 'Product',
            meta: { requiredNoAuth: true }
        },
        { redirect: true, path: _base.path, to: _base.path + "/catalogo" }
    ]

}
