import React, { Component } from 'react'
import {Button} from 'reactstrap'
import axios from 'axios'
import {BASE_SERVER_API_2} from '../../../shared/axios'
import { categories } from '../../../shared/formsData'
import ListRetrieval from '../../NewCatalog/Product/ListRetrieval'

// const exampleRef = React.createRef()
class Index extends Component {

    state = {
        categories: categories,
        k_top: 4,
        retrieval: null,
        loading: false
    }

    set_loading = (state_loading) => {
        this.setState({
            loading: state_loading
        })
    }

    reset_retrieval = () => {
        this.setState({
            retrieval: null,
            loading: false
        })
    }

    submit_recommender = async () => {
        console.log('Submit_recommender')

        let dataForm = this.props.extraData ? this.props.extraData : {}
        console.log(dataForm)
        let keys = Object.keys(dataForm)
        const formData = new FormData();
        keys.map( x => {formData.append( x, dataForm[x]) })

        // this.props.onHandlerLoading(true)
        this.set_loading(true)
        console.log('INIT')
        // console.log(this.props.service_gpu)
        console.log('------------------')
        console.log(this.props)
        console.log('------------------')

        let aux_base = this.props.extraData.service_gpu || null
        if (aux_base == '' || aux_base == null) {
            aux_base = BASE_SERVER_API_2
        }
        let data = await axios.post(aux_base + 'recommender', formData).then(
            response => {
                console.log('PROCESS')
                this.set_loading(false)
                // this.props.onHandlerLoading(false)
                let aux_response = null
                if (200 <= response.status < 300) {
                    aux_response = response.data
                }
                return aux_response
            }
        ) 
        console.log(data)
        console.log('END')
        if (data.status) {
            this.setState({
                retrieval: data.data[0]['retrieval']
            })
        }
    }

    wrapper_data = (retrieval) => {
        console.log('wrapper_data')
        console.log(retrieval)

        if (retrieval == null) return null
        let response = this.state.categories.map((cat, index) => {
            let { key, text } = cat
            let products = retrieval[key]
            if (products) {
                console.log(text, retrieval[key])
                return (
                    <ListRetrieval 
                            k_top={this.state.k_top} 
                            key={index} key_name={key} name={text} 
                            list_items={products['items']}  
                            size_cols='col-xl-3 col-sm-6 col-md-3'
                    />
                )
            }
        })
        return response
    }

    render() {
        console.log('Recommender')
        console.log(this.state.retrieval)
        let { className = '' } = this.props
        let { retrieval = null } = this.state

        let retrieval_data = this.wrapper_data(retrieval)
        console.log('retrieval_data', retrieval_data)
        return (
            <div className={'row product-retrieval ' + className}>
                <div className='col-12 col-md-6 offset-md-3 text-center mt-2 mb-2'>
                    <Button onClick={this.submit_recommender} color="primary" size="lg" style={{ fontFamily:'monospace'}}>RECOMENDAR</Button>{' '}
                </div>
                {
                    retrieval_data != null && !this.state.loading ? (
                        <div className='col-12 col-md-10 offset-md-1 col-sm-10 offset-sm-1 text-center recommender mt-3'>
                            <div className={'product-type-b'}>
                                {
                                    retrieval_data
                                }
                            </div>
                        </div>
                    ) : (
                        <div className='col-12 text-center mt-3'>
                            <div className={'label-default d-flex align-items-center w-75'}>
                                {
                                    this.state.loading ? (
                                        <div className='w-100'>
                                                <i className="fa fa-spinner fa-pulse fa-2x fa-fw" style={{color:'#4194ff'}}></i>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        <div className='w-100'>
                                            <span>Te recomendamos!!!</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                

            </div>
        )
    }
}

export default Index
// export default connect(mapStateToProps, null)(Index);

