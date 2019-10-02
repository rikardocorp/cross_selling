import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ListItemProduct from './ListItemProduct'
import ItemSpecial from './ItemSpecial'
import * as actions from '../../../store/actions/index'

class Product extends Component {

    state = {
        sku: null,
        query: null,
        categories: [
            { key: 'cover', text:'Covers'},
            { key: 'top', text: 'Upper' },
            { key: 'dress', text: 'Dresses' },
            { key: 'midle', text: 'Legs' },
            { key: 'bottom', text: 'Feet' }],
        relations:{},
        k_top: 4
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.updateData(this.props.match.params.id)
    }

    change_tops = (value) => {
        if (value != this.state.k_top){
            this.setState({
                k_top: value
            })
        }
    }
    

    updateData = async (sku) => {
        // let query = this.props.database.filter((item) => item.sku == sku)
        // query = query.length > 0 ? query[0] : {}

        let data = await this.props.onDispatch('GET','sku/' + sku)
        let query = data.status ? data.content : {}

        let relationsData = await this.props.onDispatch('GET', 'sku_json/' + sku)

        let relations = {
            cover: null,
            dress: null,
            top: null,
            midle: null,
            bottom: null
        }

        if (relationsData.status){
            relationsData.content[0].map(item => {
                let category = item.categoria 
                let items = item.items 
                relations[category] = items
                console.log(item.categoria)
            })
        }

        this.setState({
            sku: sku,
            query: query,
            relations: relations
        })
        this.scrollToTop()
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.match.params.id !== null && this.props.match.params.id !== prevProps.match.params.id){
            this.updateData(this.props.match.params.id)
        }
    }

    goToDetail = (sku) => {
        let path = '/sku/' + sku;
        this.props.history.push(path);
    }

    render() {
        let product = this.props.database
        const query = this.state.query ? this.state.query : {}
        const categories = this.state.categories
        const relations = this.state.relations

        let hidden = ''
        let conteLoading = null
        if (this.props.isLoading){
            hidden = 'hidden' 
            conteLoading = (
                <div className='loading-container animated fadeIn d-flex align-items-center justify-content-center'>
                    <div className=''>
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                    </div>
                </div>
            )
        }

        let allListProducts = []
        this.state.categories.map( (cat, index) => {
            let key = cat['key']
            let text = cat['text']
            if (relations[key] != null) {
                allListProducts.push(
                    <ListItemProduct k_top={this.state.k_top} key={index} key_name={key} name={text} list_items={relations[key]} />
                )
            }
        })

        return (
            <div className={'container-fluid ' + hidden}>
                {
                    conteLoading
                }
                <div className='product-detail row'>
                    <div className='col-12 col-md-5 first-column d-flex align-items-center fixed-top'>
                        <ItemSpecial event_tops={this.change_tops} item={query} categories={categories} relations={relations}></ItemSpecial>
                    </div>

                    <div className='col-12 col-md-7 second-column offset-md-5'>
                        {
                            allListProducts
                        }
                    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Product);