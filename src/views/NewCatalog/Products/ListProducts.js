import { withRouter } from "react-router-dom";
import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardColumns, CardBody } from 'reactstrap';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { PATH_IMAGE } from '../../../shared/utility'


class ListProducts extends Component {
    componentDidMount() {
        console.log('componentDidMount')
        localStorage.setItem('catalogo', '/');
        if (this.props.database == null) {
            this.updateData()
        }
    }

    shuffle = (array, num) => {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array.slice(0, num);
    }

    updateData = async () => {
        // let query = this.props.database.filter((item) => item.sku == sku)
        // query = query.length > 0 ? query[0] : {}
        console.log('UPDATE DATABASE')
        let dataset = []
        // let version = this.props.location.pathname
        await this.props.skusdemo.map(async sku => {
            let data = await this.props.onDispatch('GET', '/ver1/sku/' + sku)
            if (data.status && data.content != null) {
                dataset.push(data.content)
            }
        })
        // let data = await this.props.onDispatch('GET', 'sku/')
        // let database = data.status ? data.content : []
        this.props.setDatabase(dataset)
        // console.log(database.slice(0, 10) )
        // this.reloadData()
    }

    goToDetail = (item) => {
        // let version = this.props.location.pathname
        console.log('rikardocorp:', this.props)
        let pathname = this.props.params.basepath
        let path = pathname + '/sku/' + item.sku;
        console.log(path)
        this.props.history.push(path);
    }

    reloadData = () => {
        console.log('reloadData')
        if (this.props.database && this.props.database.length > 0) {
            this.props.setSampleDatabase(this.shuffle(this.props.database, 50))
        }

    }

    render() {
        console.log('rikardocorp:', this.props)

        let products = this.props.database ? this.props.database : []
        let list_products = []
        products.map((item, key) => {
            let { image = null, productName = null, sku = null, productId = null, imageId = null, link = null, imageUrl = null } = item
            let title = productName
            const filename = PATH_IMAGE + productId + '_' + sku + '_' + imageId + '.jpg'
            list_products.push(
                <Card key={key} className='hvr-float-shadow product'>
                    <CardImg onClick={() => this.goToDetail(item)} top width="100%" src={imageUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{title}</CardTitle>
                        {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    </CardBody>
                </Card>
            )
        })

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

        return (
            <div id='catalogo' className='m-4'>
                {
                    conteLoading
                }
                <div className='col-12 col-md-10 col-lg-8 m-auto'>
                    <div className='content-button-simple'>
                        <div className='text-center' onClick={() => this.reloadData()}><i className='fa fa-bullseye hvr-pulse animated pulse infinite'></i></div>
                        <div className='text-center mt-2' onClick={() => this.reloadData()}>
                            <i title='Experimental'
                                onClick={()=>this.props.history.push('mvp/')}
                                style={{ background: 'rgb(0, 123, 255)', padding: '8px', fontSize: '1em' }}
                                className='fa fa-rocket'
                            ></i>
                        </div>
                        
                    </div>
                    <CardColumns>
                        {
                            list_products
                        }
                    </CardColumns>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        notify: state.general.notify,
        isLoading: state.general.isLoading,
        // isAuth: state.general.user.auth,
        database: state.general.database,
        // datasample: state.general.datasample,
        skusdemo: state.general.skusdemo

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (url) => dispatch(actions.fetchData(url)),
        setDatabase: (data) => dispatch(actions.setDatabase(data)),
        setSampleDatabase: (data) => dispatch(actions.setSampleDatabase(data)),
        onDispatch: (method, url, data, notify) => dispatch(actions.dispatchHTTP(method, url, data, notify))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListProducts));