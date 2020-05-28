import React, { Component, useState } from 'react'
import { withRouter } from "react-router-dom";
import ImageUpload from '../../../components/ImageUpload'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Boxing from './Boxing'
import FormTotal from 'react-form-total'
import { dataSearch as _data } from '../../../shared/formsData'
import InputRange from 'react-input-range';
import { Progress, Badge, Button, ButtonGroup, Input} from 'reactstrap'
import Recommender from '../Recommender/Index'
import axios from 'axios';
import {BASE_SERVER_API_2} from '../../../shared/axios'
import { categories } from '../../../shared/formsData'
import GroupButtons from '../../../components/Inputs/GroupButtons'

const childRef = React.createRef();
const exampleRef = React.createRef()
class Index extends Component {

    state = {
        sku: null,
        query: null,
        categories: categories,
        relations: {},
        k_top: 10,
        imagePreviewUrl: null,
        imageResultUrl: null,
        dataResult: null,
        styleImage: {},

        form: {
            name: _data.name,
            url: _data.url,
            item: { ..._data.post },
            inputs: { ..._data.inputs }
        },
        threshold: 24,
        maximize: false,
        genero: null,
        genero_list: [{key:'MUJER', text:'Mujer'}, {key:'HOMBRE', text:'Hombre'}]
    }

    /* ------       FUNCTIONS REQUIRED FORM     --------- */
    inputFormHandler = (formName, callbackFunctions) => {
        // console.log('[[[inputFormHandler]]]')
        this.setState(state => {
            return {
                [formName]: {
                    ...state[formName],
                    ...callbackFunctions
                }
            }
        })
    }
    /* -------------------------------------------------- */

    render_preview = (image) => {
        console.log('render_preview')

        if (childRef.current) {
            console.log('- reset click')
            childRef.current.reset_retrieval()
        }

        this.setState({ 
            imagePreviewUrl: image,
            imageResultUrl: null,
            dataResult: null
        })
    }

    catch_response = async (imageFile, isFile) => {
        console.log('catch_response')
        console.log(this.props.params)
        if (childRef.current) {
            console.log('- reset click')
            childRef.current.reset_retrieval()
        }

        let typeFile = 'link'
        if (isFile) {
            typeFile = 'file'
        }
        
        const formData = new FormData();
        formData.append('typeFile', typeFile)
        formData.append('image', imageFile)
        formData.append('threshold', this.state.threshold / 100)

        this.props.onHandlerLoading(true)
        
        let aux_base = exampleRef.current.value
        if (aux_base == '' || aux_base == null) {
            aux_base = BASE_SERVER_API_2
        }

        let service_gpu = { key: 'service_gpu', value: aux_base }
        console.log('--------------------')
        console.log(service_gpu)
        this.props.onSetData(service_gpu)
        console.log('--------------------')
        let data = await axios.post(aux_base + 'segmentation', formData).then(
            response => {
                console.log('RSPONSE')
                this.props.onHandlerLoading(false)
                let aux_response = null
                if (200 <= response.status < 300) {
                    aux_response = response.data
                }
                return aux_response
            }
        ).catch( error => {
            console.log('Catch Error Axios', error)
            this.props.onHandlerLoading(false)
            return {status: false}
        })

        this.setState({
            imageFile: imageFile,
            typeFile: typeFile,
            dataResult: data.status ? data.data : null
        })
    }

    process_boxes = (data) => {
        console.log('Process_boxes')
        console.log(data)
        if (data==null || data[0].length==0) return [null, null]

        let [images, paths] = data
        let [size, segments] = images[0]
        let [height, width] = size
        console.log(width, height)

        let obj_cat = {}
        let boxing = segments.map((seg, index) => {
            const [label, classname, category, score, box] = seg
            console.log(index, seg)
            obj_cat[category] = {score: score, classname: classname, label:label}
            return <Boxing key={index} data={{ title: classname, type: category, box: box, score: score, width: width, height: height }}></Boxing>
        })

        // let labeling = null
        let labeling = this.state.categories.map((cat, index) => {
            let {key, text} = cat
            let _classname, _score
            if (obj_cat[key]) {
                _classname = obj_cat[key].classname
                _score = parseFloat(obj_cat[key].score * 100).toFixed(2) 
            } else {
                _classname = '...'
                _score = 0.0
            }
            let active = obj_cat[key] ? 'active' : ''

            return (
                <div key={index} className={'labeling ' + key + ' ' + active}>
                    <h3><Badge>{text}</Badge></h3>
                    <div className='row'>
                        <div className='col-3 text-right'>{_classname}</div>
                        <div className='col-9'><Progress striped className={'mt-1'} value={_score}>{ _score + '%'}</Progress></div>
                    </div>
                </div>
            )
        })
        return [boxing, labeling]
    }

    loaded_image = ({ target: img }) =>{
        console.log('LOADED')
        let [nw, ml, mt] = this.resize_image(img.offsetWidth, img.offsetHeight)
        this.setState({
            styleImage: {
                percent: nw,
                // height: nh + '%',
                marginLeft: ml,
                marginTop: mt,
            }
        })
    }

    resize_image = (width, height) => {
        width = parseInt(width)
        height = parseInt(height)
        let _max, _min, percent, mleft, mtop, n_width, n_height = 0
        if (width > height) {
            _max = width
            _min = height
            percent = _min * 100 / _max
            mtop = (100 - percent) / 2
            n_width = 100
            // n_height = 100
        } else {
            _max = height
            _min = width
            percent = _min * 100 / _max
            mleft = (100 - percent) / 2
            n_width = percent
            // n_height = percent
        }

        return [n_width, mleft, mtop]
    }

    handlerSubmit = async () => {
        
        // console.log(exampleRef.current)
        let ref_value = exampleRef.current.value
        console.log('HANDLER SUBMIT')
        console.log(ref_value)
        if (ref_value == '' || ref_value == null){
            console.log(BASE_SERVER_API_2)
        }
        console.log('----------')
        // if (this.state.form.$isValid()) {
        //     const data = {
        //         ...this.state.form.$getValues(),
        //     }
        //     console.log(data)
            
        // } else {
        //     this.state.form.$touch()
        // }
    }

    maximize = () => {
        this.setState(state => {
            return {
                maximize: !state.maximize
            }
        })
    }

    render() {
        console.log('SEGMENTATION')
        let { imagePreviewUrl, imageResultUrl = null, dataResult = null, styleImage = {}, maximize=false} = this.state
        let conteLoading = null
        if (this.props.isLoading) {
            conteLoading = (
                <div className='loading-container animated fadeIn d-flex align-items-center justify-content-center'>
                    <div className=''>
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                    </div>
                </div>
            )
        }

        let {percent=100, marginLeft=0, marginTop=0 } = styleImage
        let styleLocalImage = {
            width: percent + '%',
            marginLeft: marginLeft + '%',
            marginTop: marginTop + '%',
            marginBottom: marginTop + '%',
        }


        let [boxing, labeling] = [null, null]
        let showButton = 'd-none'
        if (dataResult) {
            [boxing, labeling] = this.process_boxes(dataResult)
            showButton = ''
        } else {
            labeling = (
                <div className={'label-default d-flex align-items-center'}>
                    <span>Carga una imagen, para identificar tus prendas de vestir.</span>
                </div>
            )
        }

        const inputs = {
            input1: {
                label: {
                    labelText: "Input1"
                },
                input: {
                    type: "text",
                    placeholder: "Test Input1"
                }
            }
        }

        let colLeft = 'col-md-5 offset-md-1 col-lg-4 offset-lg-2'
        let colRight = 'offset-md-0 col-md-5 col-lg-4 d-flex align-items-center'
        if (maximize) {
            colLeft = 'col-md-8 offset-md-2'
            colRight = 'd-none'
        }


        return (
            <div className={'container-fluid process_1'}>
                {
                    conteLoading
                }
                <div className='row process_form'>
                    <div className='col-12 text-center'>
                        <h2 className='pt-4 pb-2'>
                            <i title='Catalogo'
                                onClick={() => this.props.history.push('/')}
                                style={{ 
                                    background: 'rgb(142, 142, 142)', fontSize: '0.7em', 
                                    color: 'white', borderRadius: '5em', padding: '4px 5px',
                                    background: '#007bff', cursor: 'pointer' }}
                                className='fa fa-bullseye animated pulse infinite'
                            ></i> Recomendador de Estilos</h2>

                        <div className='moda'>
                            <div className='my-3 w-75 mx-auto label-default' style={{height: 'auto', padding:'10px'}}> 
                                <label>Temporal Server:</label>
                                <input className='w-25 d-inline mx-2' type="text" ref={exampleRef} style={{ fontFamily: 'monospace',fontSize: '0.9em'}} />
                                {/* <button onClick={this.handlerSubmit}>button</button> */}
                            </div>
                        </div>

                        {/* FORM UPLOAD */}
                        <ImageUpload extra={{ threshold: this.state.threshold}}
                            onHandlerLoading={this.props.onHandlerLoading}
                            render_preview={this.render_preview}
                            catch_response={this.catch_response}></ImageUpload>
                        
                        {/* THRESHOLD */}
                        <div className='mt-5 row'>
                            <div className='col-md-2 offset-md-2 text-right col-4'>
                                <label>Threshold:</label>
                            </div>
                            <div className='col-md-5 col-7 mt-1'>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    formatLabel={threshold => `${threshold}%`}
                                    value={this.state.threshold}
                                    onChange={threshold => this.setState({ threshold })} />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className='row process_result mt-5 moda'>
                    <div className={'col-12 ' + colLeft}>
                        <div className='content position-relative'>
                            {imagePreviewUrl ? <img src={imagePreviewUrl} onLoad={this.loaded_image} style={styleLocalImage}/> : <div className='square-box'></div>}
                            {
                                boxing
                            }
                            <span className={'btn-maximize ' + showButton} onClick={this.maximize}>
                                <i className='fa fa-expand'></i>
                            </span>
                        </div>
                    </div>

                    <div className={'col-10 offset-1 mt-5 mt-md-0 ' + colRight }>
                        <div className='w-100'>
                            {
                                labeling
                            }
                        </div>
                    </div>
                </div>

                <div className='text-center mt-5'>
                    <GroupButtons data={this.state.genero_list} callback={(value)=> this.setState({genero: value})}></GroupButtons>
                </div>

                <Recommender ref={childRef} 
                    className='mt-0 mb-5 moda' 
                    onHandlerLoading={this.props.onHandlerLoading}
                    extraData={{ 
                        service_gpu: this.props.service_gpu,
                        threshold: this.state.threshold / 100, 
                        image: this.state.imageFile, 
                        genero: this.state.genero, 
                        typeFile:this.state.typeFile }}
                ></Recommender>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notify: state.general.notify,
        isLoading: state.general.isLoading,
        service_gpu: state.general.service_gpu 

        // isAuth: state.general.user.auth,
        // database: state.general.database
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (url) => dispatch(actions.fetchData(url)),
        onHandlerLoading: (state) => dispatch(actions.handlerLoading(state)),
        onSetData: (state) => dispatch(actions.setDatabyKeyValue(state)),
        // onInitData: (id) => dispatch(actions.fetchMethod(id)),
        // onAddData: (data) => dispatch(actions.addMethod(data)),
        // onDeleteData: (id) => dispatch(actions.deleteMethod(id)),
        // pushNotification: (config) => dispatch(actions.pushNotification(config)),
        onDispatch: (method, url, data, notify) => dispatch(actions.dispatchHTTP(method, url, data, notify))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));