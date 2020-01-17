import React, { Component } from 'react';
import axios from 'axios';

class ImageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: null
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
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.file)
        this.props.onHandlerLoading(true)
        axios.post('http://8ea1b21d.ngrok.io/foo', formData).then(
            response => { 
                console.log(response)
                this.props.onHandlerLoading(false)
                if (200 <= response.status < 300) {
                    this.props.catch_response(response.data)
                } 
            }
        ) 
        // TODO: do something with -> this.state.file
    }

    // handleSubmit = e => { 
    //     const formData = new FormData(); 
    //     formData.append('image', this.state.file) 
    //     axios.post('http://9f9e14ae.ngrok.io/foo', formData).then(response => { console.log(response) }) 
    // }

    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.log('onloadend 1')
            this.setState({ file: file, imagePreviewUrl: reader.result });
        }

        console.log('HandleImage')
        console.log(file)
        if (file) {
            console.log('onloadend 2')
            reader.readAsDataURL(file)
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;

        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <input type="file" onChange={this._handleImageChange} />
                    <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
            </div>
        )
    }

}


export default ImageUpload;