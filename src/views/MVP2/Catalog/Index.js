import { withRouter } from "react-router-dom";
import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardColumns, CardBody,
        Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, InputGroup, Input, InputGroupAddon, Button, Badge } from 'reactstrap';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { PATH_IMAGE } from '../../../shared/utility'
import MyPagination from '../../../components/MyPagination'
import Select from 'react-select'
import axios from 'axios';

class Index extends Component {

    state = {
        modal:false,
        item: {},
        batch: 40,
        numPagination: 0,
        indexPagination: 0,
        message: null,
        options:[
            { value: 'Casual', label: 'Casual' },
            { value: 'Urbano', label: 'Urbano' },
            { value: 'Elegante', label: 'Elegante' },
            { value: 'Sport', label: 'Sport' }
        ],
        valueSelect: null
    }

    setPagination = (total, batch) => {
        this.setState({
            numPagination: Math.ceil(total / batch),
            indexPagination: 0
        })
    }

    updatePagination = (index) => {
        // console.log('updatePagination')
        // console.log(index)
        this.setState({
            indexPagination: index
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            message: null,
        }));
    }

    chooseItem = (index, item) =>{
        let labels = null
        if (item.label && item.label != '' && item.label != 'team_label') {
            labels = item.label.split(',')
            labels = labels.map( v => {
                return { value:v, label:v}
            })
        }

        this.setState(prevState => ({
            item: {
                index: index,
                ...item
            },
            valueSelect: labels,
            modal: !prevState.modal,
            message: null
        }));
    }

    componentDidMount() {
        // console.log('componentDidMount')
        localStorage.setItem('mvp_moda', '/');
        if (this.props.database == null) {
            this.updateData('MUJER')
        } else {
            this.setPagination(this.props.database.length, this.state.batch)
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

    updateData = async (type=null) => {
        // let query = this.props.database.filter((item) => item.sku == sku)
        // query = query.length > 0 ? query[0] : {}
        let url = null
        if (type==null){
            url = 'https://todo-6drzojst7q-uc.a.run.app/skus'
        } else {
            url ='https://todo-6drzojst7q-uc.a.run.app/skus_by_gender?gender='+type+'&limit=5000&offset=0' 
        }

        this.props.onHandlerLoading(true)
        let total = 0
        let data = await axios.get(url).then(
            response => {
                this.props.onHandlerLoading(false)
                let aux_response = []
                if (200 <= response.status < 300) {
                    aux_response = response.data
                }
                return aux_response
            }
        )
        this.props.setDatabase({data: data.data, type:'MVP'})
        this.setPagination(data.data.length, this.state.batch)

    }

    goToDetail = (item) => {
        // let version = this.props.location.pathname
        let pathname = this.props.params.basepath
        let path = pathname + '/sku/' + item.sku;
        this.props.history.push(path);
    }

    reloadData = () => {
        if (this.props.database && this.props.database.length > 0) {
            this.props.setSampleDatabase(this.shuffle(this.props.database, 50))
        }

    }

    setMessage = (msg) => {
        this.setState({
            message: msg
        })
    }

    changeSelect = (val) =>{
        this.setState({
            valueSelect: val
        })
    }

    submitTag = e => {
        e.preventDefault();
        this.props.onHandlerLoading(true)
        let multiselect = this.state.valueSelect
        if (multiselect) {
            let values = multiselect.map(v => { return v.value})
            values = values.join(',')
            let params = {
                sku: this.state.item.sku,
                label: values
            }
            let { indexPagination = 0, batch = 0 } = this.state
            let index = batch * indexPagination + this.state.item.index
            axios.post('https://todo-6drzojst7q-uc.a.run.app/tagging', params).then(
                response => {
                    this.props.onHandlerLoading(false)

                    if (200 <= response.status < 300 && response.data.success) {
                        this.setMessage(<Badge href="#" color="info" > Informacinn Registrada</Badge>)
                        this.props.updateDatabase({ index, data: values })
                    } else {
                        this.setMessage(<Badge href="#" color="danger" >Ocurrio un error, vuelve a intentar.</Badge>)
                    }
                    
                }
            ).catch( e => {
                this.props.onHandlerLoading(false)
                this.setMessage(<Badge href="#" color="danger" >Ocurrio un error, vuelve a intentar.</Badge>)

            })
        }
    }

    render() {
        let { numPagination = 0, indexPagination = 0, batch=0}  = this.state
        let indexInit = batch * indexPagination
        let indexFrom = indexInit + batch

        let products = this.props.database ? this.props.database.slice(indexInit, indexFrom) : []
        // console.log('RENDER::')
        // console.log(products)
        let list_products = []
        products.map((item, key) => {
            let { image = null, productName = null, sku = null, productId = null, imageId = null, link = null, imageUrl = null, label='team_label' } = item
            let title = productName
            let filename = PATH_IMAGE + productId + '_' + sku + '_' + imageId + '.jpg'
            let withTag = (label!='' && label != 'team_label') ? <Badge style={{ fontFamily: 'monospace',fontSize: '1em', fontWeight: 'lighter'}} color='danger'>Tag</Badge> : null
            list_products.push(
                <Card key={key} className='hvr-float-shadow product'>
                    <CardImg onClick={() => this.chooseItem(key, item)} top width="100%" src={imageUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{title} {withTag}</CardTitle>
                        <div className='options'>
                            <span onClick={() => this.chooseItem(key, item)} className='hvr-pulse right-0 do-btn-view'><i className="fa fa-tag" aria-hidden="true"></i></span>
                            <span onClick={() => this.goToDetail(item)}  className='hvr-pulse right-0 do-btn-view right'><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
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
                        <div className='text-center mt-2'>
                            <i title='Original'
                                onClick={() => this.props.history.push('/catalogo')}
                                className='fa fa-bullseye hvr-pulse'
                                style={{ padding: '8px', fontSize: '1em' }}
                            ></i>
                        </div>
                        <div className='text-center mt-2'>
                            <i title='Experimental'
                                onClick={() => this.props.history.push('mvp/')}
                                style={{ background: 'rgb(99, 99, 99)', padding: '8px', fontSize: '1em' }}
                                className='fa fa-rocket'
                            ></i>
                        </div>

                    </div>

                    <div className='division-options text-center py-2'>
                        <Button onClick={() => this.updateData('MUJER')} color="danger">DAMAS</Button>{' '}
                        <Button onClick={() => this.updateData('HOMBRE')} color="secondary">CABALLEROS</Button>{' '}
                    </div>
                    
                    <CardColumns>
                        {
                            list_products
                        }
                    </CardColumns>

                    <div className='footer-pagination'>
                        <MyPagination change={this.updatePagination} total={numPagination} choose={this.state.indexPagination}></MyPagination>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName={'my-modal-catalog'} >
                    <ModalHeader toggle={this.toggle}>
                        <p className='py-0 my-0 title'>{this.state.item.productName}</p>
                        <p className='py-0 my-0 subTitle pb-3 pt-1'>{this.state.item.brand} - {this.state.item.sku}</p>
                        
                        <p className='py-0 my-0 subTitle2'>
                            <span>Nombre Division:</span> {this.state.item.Nombre_Division}
                        </p>
                        <p className='py-0 my-0 subTitle2'>
                            <span>Nombre Linea:</span> {this.state.item.Nombre_Linea}
                        </p>
                        <p className='py-0 my-0 subTitle2'>
                            <span>Nombre Temporada:</span> {this.state.item.Nombre_Temporada}
                        </p>

                    </ModalHeader>
                    <ModalBody className='py-0'>
                        {
                            conteLoading
                        }
                        <div className='py-3'>
                            <Form onSubmit={this.submitTag}>
                                <InputGroup>
                                    <Select
                                        isMulti
                                        className={'multiSelect'}
                                        closeMenuOnSelect={false}
                                        onChange={(e) => this.changeSelect(e)} value={this.state.valueSelect}
                                        options={this.state.options}
                                        name='tag' />
                                    {/* <Input style={{ fontSize: '1em' }} name='tag' placeholder={this.state.item.label} /> */}
                                    <InputGroupAddon addonType="prepend">
                                        <Button
                                            type='submit' className='p-0 px-3'
                                            style={{ fontSize: '0.8em', background: '#007bff' }}>
                                            <i className={'fa fa-tag'}></i>
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </div>
                        <CardImg top width="100%" src={this.state.item.imageUrl} alt="Card image cap" />
                    </ModalBody>
                    <ModalFooter>
                        {this.state.message}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        notify: state.general.notify,
        isLoading: state.general.isLoading,
        // isAuth: state.general.user.auth,
        database: state.general.database2,
        // datasample: state.general.datasample,
        skusdemo: state.general.skusdemo

    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDatabase: (data) => dispatch(actions.updateDatabase(data)),
        onFetchData: (url) => dispatch(actions.fetchData(url)),
        onHandlerLoading: (state) => dispatch(actions.handlerLoading(state)),
        setDatabase: (data) => dispatch(actions.setDatabase(data)),
        setSampleDatabase: (data) => dispatch(actions.setSampleDatabase(data)),
        onDispatch: (method, url, data, notify) => dispatch(actions.dispatchHTTP(method, url, data, notify))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));