import React, { Component } from 'react'
import ImageUpload from '../../../components/ImageUpload'
import { connect } from 'react-redux'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import * as actions from '../../../store/actions/index'

class Upload extends Component {

    state = {
        sku: null,
        query: null,
        categories: [
            { key: 'cover', text: 'Covers' },
            { key: 'top', text: 'Tops' },
            { key: 'dress', text: 'Dresses' },
            { key: 'middle', text: 'Middles' },
            { key: 'bottom', text: 'Bottoms' }],
        relations: {},
        k_top: 10,
        imagePreviewUrl: null,
        imageResultUrl: null

    }

    render_preview = (image) => {
        console.log('render_preview')
        this.setState({ imagePreviewUrl: image })
    }

    catch_response = (data) => {
        console.log('catch_response')
        console.log(data)

        let filename = data.cloudStorage + data.data[0].output
        console.log(filename)
        this.setState({ imageResultUrl: filename })
    }

    render() {

        let { imagePreviewUrl, imageResultUrl=null} = this.state

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
            <div className={'container-fluid process_1'}>
                {
                    conteLoading
                }

                <div className='row process_form'>
                    <div className='col-12 text-center'>
                        <h2 className='pt-4 pb-2'> Recomendador de Estilos </h2>
                        <ImageUpload 
                            onHandlerLoading={this.props.onHandlerLoading}
                            render_preview={this.render_preview} 
                            catch_response={this.catch_response}></ImageUpload>
                    </div>
                </div>


                <div className='row process_result mt-2'>
                    <div className='col-12 col-md-6'>
                        <div className='content d-flex justify-content-center'>
                            {imagePreviewUrl ? <img src={imagePreviewUrl} /> : <div className='square-box'></div> }
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='content d-flex justify-content-center'>
                            {imageResultUrl ? <img src={imageResultUrl} /> : <div className='square-box'></div>}
                        </div>
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
        onHandlerLoading: (state) => dispatch(actions.handlerLoading(state)),
        // onInitData: (id) => dispatch(actions.fetchMethod(id)),
        // onAddData: (data) => dispatch(actions.addMethod(data)),
        // onDeleteData: (id) => dispatch(actions.deleteMethod(id)),
        // pushNotification: (config) => dispatch(actions.pushNotification(config)),
        onDispatch: (method, url, data, notify) => dispatch(actions.dispatchHTTP(method, url, data, notify))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Upload);