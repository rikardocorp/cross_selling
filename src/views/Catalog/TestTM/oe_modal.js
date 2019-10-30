import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import ListItemProduct from './ListItems'

class oe_modal extends Component {

    state = {
        sku: null,
        query: null,
        categories: [
            { key: 'cover', text: 'Covers' },
            { key: 'top', text: 'Tops' },
            { key: 'dress', text: 'Dresses' },
            { key: 'midle', text: 'Midles' },
            { key: 'bottom', text: 'Bottoms' }],
        relations: {},
        k_top: 10
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.updateData('1398632')
    }

    
    updateData = async (sku) => {
        // let query = this.props.database.filter((item) => item.sku == sku)
        // query = query.length > 0 ? query[0] : {}

        let data = await this.props.onDispatch('GET', 'sku/' + sku)
        let query = data.status ? data.content : {}

        let relationsData = await this.props.onDispatch('GET', 'sku_json/' + sku)

        let relations = {
            cover: null,
            dress: null,
            top: null,
            midle: null,
            bottom: null
        }

        if (relationsData.status) {
            relationsData.content[0].map(item => {
                let category = item.categoria
                let items = item.items
                relations[category] = items
                // console.log(item.categoria)
            })
        }

        this.setState({
            sku: sku,
            query: query,
            relations: relations
        })
    }

    
    render() {
        const relations = this.state.relations
        let allListProducts = []
        this.state.categories.map((cat, index) => {
            let key = cat['key']
            let text = cat['text']
            if (relations[key] != null) {
                allListProducts.push(
                    <ListItemProduct k_top={this.state.k_top} key={index} key_name={key} name={text} list_items={relations[key]} />
                )
            }
        })
        
        return (
            <div className='local-modal'>
                <div className="overlay pdp-overlay active d-flex justify-content-center align-items-center">
                    <section className="modal-content pdp-modal active" id="pdpModalAddToCart">
                        
                        <div className="header-modal">
                            <p><i className="icon-icon-product-added"></i>Producto agregado ;)</p>
                        </div>
                        
                        <div className="body-modal -header -footer">
                            <div className="container-fluid no-gutters mt-2" data-js="mcart-prods">
                                <div className="item row">
                                    <div className="col-5 mt-15">
                                        <div className="circle-count" data-js="mcart-quantity">1</div>
                                        <div className="pdp-images">
                                            <img className="pdp-image" src="http://oechsle.vteximg.com.br/arquivos/ids/1208811-106-106/1474125.jpg?v=637073800294000000" width="320" height="320" data-js="mcart-image"/>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="prod-cont py-10">
                                            <div className="mt-15">
                                                <div className="row no-gutters">
                                                    <div className="col-4">
                                                        <span className="text text-gray-light fz-11" data-js="mcart-brand">HYPNOTIC</span>
                                                    </div>
                                                    <div className="col-8 text-right">
                                                        <span className="text text-gray-light fz-11" data-js="mcart-sku">SKU: 1458431</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-10">
                                                <span className="text fz-13" data-js="mcart-name">Pantalón Jogger Open Verde1 M</span>
                                            </div>
                                            <div className="mt-15">
                                                <div className="row no-gutters mt-5" data-js="mcart-price-online">
                                                    <div className="col-4">
                                                        <span className="text text-brown fw-bold">Online</span>
                                                    </div>
                                                    <div className="col-8 d-flex align-items-center justify-content-end">
                                                        <span className="text text-brown fw-bold">S/ 59.95</span>
                                                    </div>
                                                </div>
                                                <div className="row no-gutters mt-5" data-js="mcart-price-oh">
                                                    <div className="col-4"><i className="icon-oh mr-5"></i></div>
                                                    <div className="col-8 d-flex align-items-center justify-content-end">
                                                        <span className="text text-secondary fz-15 fw-bold">S/ 39.95</span><span className="flag-oh ml-10">-33%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="footer-modal">
                            <div className="d-flex align-items-center">
                                <div className="col text-right px-0">
                                    <a className="btn-link fz-15" title="Más productos" modal-close="close">Ver más productos</a>
                                </div>
                                <div className="col-7 pr-0"><button className="btn w-100">Ir a Pagar</button></div>
                            </div>
                        </div>

                        {/* <div id='ContainerImage'>
                        {
                                allListProducts
                        }
                        </div>  */}
                    
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notify: state.general.notify,
        isLoading: state.general.isLoading,
        // isAuth: state.general.user.auth,
        // database: state.general.database
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (url) => dispatch(actions.fetchData(url)),
        // onInitData: (id) => dispatch(actions.fetchMethod(id)),
        // onAddData: (data) => dispatch(actions.addMethod(data)),
        // onDeleteData: (id) => dispatch(actions.deleteMethod(id)),
        // pushNotification: (config) => dispatch(actions.pushNotification(config)),
        onDispatch: (method, url, data, notify) => dispatch(actions.dispatchHTTP(method, url, data, notify))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(oe_modal);

