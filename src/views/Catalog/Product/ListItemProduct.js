import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ItemProduct from './ItemProduct'

class ListItemProduct extends Component {

    goToDetail = (sku) => {
        let path = '/sku/' + sku;
        this.props.history.push(path);
    }


    render() {
        let { name = '', list_items = [], key_name = '', k_top=4} = this.props
        let list_products = []
        list_items.slice(0,k_top).map((item, key) => {
            list_products.push(
                <ItemProduct key={key} item={item} redirect={this.goToDetail}></ItemProduct>
            )
        })

        return (
            <div id={key_name} className='item-card-columns'>
                <h3>{name}</h3>
                {/* <div className='d-flex align-content-stretch flex-wrap'> */}
                <div className='row'>
                    {
                        list_products
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ListItemProduct);