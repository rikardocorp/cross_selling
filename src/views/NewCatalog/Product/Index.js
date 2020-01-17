import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { animateScroll as scroll } from 'react-scroll'
import CmpTab from '../../../components/Tabs/CmpTab'
import ListRetrieval from './ListRetrieval'
import ItemSpecial from './ItemSpecial'
import * as actions from '../../../store/actions/index'

class Index extends Component {

    state = {
        sku: null,
        query: null,
        categories: [
            { key: 'cover', text: 'Covers' },
            { key: 'top', text: 'Tops' },
            { key: 'dress', text: 'Dresses' },
            { key: 'middle', text: 'Middles' },
            { key: 'bottom', text: 'Bottoms' }],
        relations: [],
        services: ['ver1', 'ver2'],
        k_top: 4,
        version: 'ver1'
    }

    componentDidMount() {
        console.log('this.props:', this.props)
        this.updateData(this.props.match.params.id)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // if (nextProps.notify.listener !== this.props.notify.listener && nextProps.notify.listener > 0) {
    //     //     const config = nextProps.notify.config
    //     //     this.addNotification(config)
    //     //     return false
    //     // }
    //     return false
    // }


    change_tops = (value) => {
        if (value != this.state.k_top) {
            this.setState({
                k_top: value
            })
        }
    }

    updateData = async (sku) => {

        let data = await this.props.onDispatch('GET', 'ver1/sku/' + sku)
        let query = data.status ? data.content : {}

        let results = []
        for (let i=0; i < this.state.services.length; i++) {
            let serv = this.state.services[i] 
            let relationsData = await this.props.onDispatch('GET', serv + '/v11/sku_json_fast/' + sku)
            let relations = {
                cover: null,
                dress: null,
                top: null,
                middle: null,
                bottom: null
            }

            if (relationsData.status) {
                let relationsContent = relationsData.content['data']
                if (relationsContent.length > 0) {
                    relationsContent.map(_item => {
                        let item = _item
                        if (item) {
                            let category = item.category
                            let items = item.items
                            relations[category] = {
                                id: serv + '_' + category,
                                data: items
                            }
                        }

                    })
                }
                results.push(relations)
            }
        }
        this.setState( state => {
            return {
                sku: sku,
                query: query,
                relations: results
            }
        })
        this.scrollToTop()
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== null && this.props.match.params.id !== prevProps.match.params.id) {
            this.updateData(this.props.match.params.id)
        }
    }

    goToDetail = (sku) => {
        let pathname = this.props.params.basepath
        let path = pathname + '/sku/' + sku;
        this.props.history.push(path);
    }

    callbackTab = (id) => {
        console.log('Callback:', id)
        this.setState({
            version: 'ver' + id
        })
    }

    render() {
        console.log('Product: ',this.props)
        let product = this.props.database
        const query = this.state.query ? this.state.query : {}
        const categories = this.state.categories
        const relations = this.state.relations

        let hidden = ''
        let conteLoading = null
        if (this.props.isLoading) {
            hidden = 'hidden'
            conteLoading = (
                <div className='loading-container animated fadeIn d-flex align-items-center justify-content-center'>
                    <div className=''>
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                    </div>
                </div>
            )
        }

        let contentTabs = []
        relations.map( rel => {
            console.log('relations#: ', rel)
            let allListProducts = []
            this.state.categories.map((cat, index) => {
                let key = cat['key']
                let text = cat['text']

                console.log('quest!!!: ', rel[key])
                if (rel[key] != null) {
                    let data = rel[key].data
                    let key_name = rel[key].id
                    allListProducts.push(
                        <ListRetrieval k_top={this.state.k_top} key={index} key_name={key_name} name={text} list_items={data} params={this.props.params}/>
                    )
                }
            })
            contentTabs.push(allListProducts)
        } )
        
        const tabs = [
            { id: 1, name: 'Tradicional', url: '', content: contentTabs[0], version:'ver1'},
            { id: 2, name: 'Invertida', url: '', content: contentTabs[1], version:'ver2'}
        ]

        let aux_relations = {
            cover: null,
            top: null,
            dress: null,
            middle: null,
            bottom: null
        }

        if (relations){
            aux_relations = relations[0]
        }

        return (
            <div className={'container-fluid ' + hidden}>
                {
                    conteLoading
                }
                <div className='product-detail row'>
                    <div className='col-12 col-md-5 first-column d-flex align-items-center fixed-top'>
                        <ItemSpecial 
                            event_tops={this.change_tops} 
                            item={query} categories={categories}
                            relations={aux_relations} version={this.state.version}
                            params={this.props.params}/>
                    </div>

                    <div className='col-12 col-md-7 second-column offset-md-5'>
                        <CmpTab list_tabs={tabs} callback={this.callbackTab}></CmpTab>  
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));