import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, CardImgOverlay, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { PATH_IMAGE, resize_bounding_box } from '../../../shared/utility'
import { BASE_OECHSLE } from '../../../shared/axios'
import Image from './Image'


import ModalImage from "react-modal-image";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


class RetrievalImage extends Component {

    state = {
        // item: null,
        box: null,
        styleBox: {},
        styleImage: {},
        widthImage: 100,
        modal: false,
    }

    get_width = (width, height) => {
        width = parseInt(width)
        height = parseInt(height)
        let _max, _min, percent, mleft, mtop = 0
        if (width > height) {
            _max = width
            _min = height
            percent = _min * 100 / _max
            mtop = (100 - percent) / 2
        } else {
            _max = height
            _min = width
            percent = _min * 100 / _max
            mleft = (100 - percent) / 2
        }

        return [percent, mleft, mtop]
    }

    updateData = (box, width, height) => {
        let [percent, marginLeft, marginTop] = this.get_width(width, height)
        console.log([percent, marginLeft, marginTop])
        // box = box
        box = resize_bounding_box(box, true, 0.0, [height, width])
        let points = box.map(x => parseInt(x))
        let left = (percent / 100) * points[0] * 100 / height + (marginLeft)
        let top = (percent / 100) * points[1] * 100 / width + (marginTop)

        let _max = Math.max(width, height)
        let w = (percent / 100) * (points[2] - points[0]) * 100 / _max
        let h = (percent / 100) * (points[3] - points[1]) * 100 / _max

        let divStyle = {
            top: top + '%',
            left: left + '%',
            height: h + '%',
            width: w + '%'
        };

        let imageStyle = {
            marginLeft: marginLeft + '%',
            marginTop: marginTop + '%'
        };

        this.setState({
            styleBox: divStyle,
            styleImage: imageStyle,
            widthImage: percent + '%'
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    componentDidMount() {
        if (this.props.item.new_category != 'bottom') {
            this.updateData(this.props.item.box, this.props.item.size_width, this.props.item.size_height)
        } else {
            this.setState({
                styleBox: { display: 'none' }
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate')
        if (this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
            if (this.props.item.new_category != 'bottom') {
                // console.log(this.props.item.new_category)
                this.updateData(this.props.item.box, this.props.item.size_width, this.props.item.size_height)
            } else {
                this.setState({
                    styleBox: { display: 'none' }
                })
            }
        }
    }

    render() {

        let { 
            productName = null, title = null, sku = null, 
            productId = null, imageId = null, linkText = null, 
            new_category = null, imageUrl = null, size_height = '1000', 
            size_width='1000' } = this.props.item ? this.props.item : {}


        title = sku
        linkText = BASE_OECHSLE + linkText 
        console.log('TEST IMAGE: ',this.props.item )
        let [percent, marginLeft, marginTop] = this.get_width(size_width, size_height)
        return (
            <div className='col-xl-3 col-sm-6 col-md-4 mb-3'>
                <Card className='hvr-float-shadow product product-type-b'>
                    {/* <CardImg top width="40%" src={filename} alt="Card image cap" /> */}
                    <Image className='' src={imageUrl} width={this.state.widthImage} style={this.state.styleImage}/>
                    <CardImgOverlay>
                        <CardTitle>{title}</CardTitle>
                        <CardText>
                            {/* <span className='hvr-pulse'><i className='fa fa-link'></i></span> */}
                            <a href={linkText} target='_BLANK'><span className='hvr-pulse'><i className='fa fa-link'></i></span></a>
                            <span className='hvr-pulse right-0' onClick={() => this.props.redirect(sku)}><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </CardText>
                        <div className='boxing' style={this.state.styleBox}></div>
                        <div onClick={this.toggle} className='modal-event'></div>
                    </CardImgOverlay>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName={'my-modal'} >
                    <ModalHeader toggle={this.toggle}>{productName}</ModalHeader>
                    <ModalBody>
                        <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

export default RetrievalImage;
