import React, { Component } from 'react';
import axios from 'axios';
import { CustomInput, Form, FormGroup, Button, 
        InputGroupAddon, InputGroup, Input, Row, Col} from 'reactstrap'


class ImageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: null,
        isFile: true
    }


    render_preview = () => {
        this.props.render_preview(this.state.imagePreviewUrl)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.imagePreviewUrl !== null || this.state.imagePreviewUrl != prevState.imagePreviewUrl) {
            this.render_preview(this.state.imagePreviewUrl)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.imagePreviewUrl != nextState.imagePreviewUrl || this.state.imagePreviewUrl == null) {
            return true
        }
        return false;
    }

    _handleSubmit = e => {
        console.log('HandleSubmit:')
        e.preventDefault();
        
        let typeFile = 'link'
        if (this.state.isFile) {
            typeFile = 'file'
        }
        this.props.catch_response(this.state.file, this.state.isFile)
    }
    
    change_type = (value) => {
        console.log('change_type')
        this.setState({
            file: '',
            imagePreviewUrl: null,
            isFile: !value
        })
    }

    _handleImageChange = e => {
        console.log('_handleImageChange:')
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.log('onloadend 1')
            this.setState({ file: file, imagePreviewUrl: reader.result, isFile: true });
        }
        console.log('HandleImage')
        console.log(file)
        if (file) {
            console.log('onloadend 2')
            reader.readAsDataURL(file)
        }
    }

    _handleInputChange = (e) => {
        console.log(e.target.value)
        this.setState({ file: e.target.value, imagePreviewUrl: e.target.value });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;

        return (
            <div style={{fontFamily: 'monospace'}}>

                {/* <Form className='d-flex justify-content-center' inline onSubmit={this._handleSubmit}>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Button onClick={() => this.change_type(this.state.isFile)}
                                            type='button' className='p-0 px-2'
                                            style={{ fontSize: '0.8em', background: this.state.isFile ? '#007bff' : 'rgb(225, 225, 225)' }}>
                                            <i className='fa fa-camera'></i>
                                        </Button>
                                    </InputGroupAddon>
                                    {
                                        this.state.isFile ? (
                                            <CustomInput id='file' type="file" onChange={this._handleImageChange} label="Yo, pick a file!" />
                                        ) : (
                                                <Input onChange={this._handleInputChange} placeholder="Ingresa la url de una imagen..." />
                                            )
                                    }
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Button color='primary' className='ml-3' type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form> */}



                <Form className='d-flex justify-content-center' inline onSubmit={this._handleSubmit}>
                    <FormGroup style={{ width: '40%'}}>
                        <InputGroup style={{ width: '100%' }}>
                            <InputGroupAddon addonType="prepend">
                                <Button onClick={() => this.change_type(this.state.isFile)} 
                                        type='button' className='p-0 px-2' 
                                        style={{ fontSize: '0.8em', background: this.state.isFile ? '#007bff' : 'rgb(225, 225, 225)'}}>
                                    <i className={'fa ' + (this.state.isFile ? 'fa-camera' : 'fa-link')}></i>
                                </Button>
                            </InputGroupAddon>
                            {
                                this.state.isFile ? (
                                    <CustomInput id='file' type="file" onChange={this._handleImageChange} label="Yo, pick a file!" />
                                ) : (
                                    <Input style={{ fontSize: '1em'}} onChange={this._handleInputChange} placeholder="Ingresa la url de una imagen..." />
                                )
                            }
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button color='primary' className='ml-3' type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }

}


export default ImageUpload;