import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RetrievalImage from './RetrievalImage'

class ListRetrieval extends Component {

    goToDetail = (sku) => {
        let path = '/sku/' + sku;
        this.props.history.push(path);
    }


    render() {
        let { name = '', list_items = [], key_name = '', k_top = 4 } = this.props
        let list_products = []
        list_items.slice(0, k_top).map((item, key) => {
            list_products.push(
                <RetrievalImage key={key} item={item} redirect={this.goToDetail}></RetrievalImage>
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

export default withRouter(ListRetrieval);
