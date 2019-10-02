import React, { Component } from 'react'
import { CardColumns, CardGroup, CardDeck} from 'reactstrap';
import { withRouter } from 'react-router-dom'

// import PropTypes from 'prop-types'
import ItemProduct from './ItemProduct'

class ListItemProduct extends Component {

    goToDetail = (sku) => {
        let path = '/sku/' + sku;
        this.props.history.push(path);
    }


    render() {
        let {name='', list_items=[]} = this.props
        let list_products = []
        list_items.map((item, key) => {
            list_products.push(
                <ItemProduct key={key} item={item} redirect={this.goToDetail}></ItemProduct>
            )
        })

        return (
            <div id={name} className='item-card-columns'>
                <h2>{name}s</h2>
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