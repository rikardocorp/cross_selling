import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, CardImgOverlay, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { PATH_IMAGE, resize_bounding_box } from '../../../shared/utility'
import ModalImage from "react-modal-image";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


class ItemProduct extends Component {

    state = {
        // item: null,
        box: null,
        styleBox: {},
        modal: false,
    }

    updateData = (box, width, height) => {
        box = box.split('-')
        box = resize_bounding_box(box, true, 0.0, [height, width])
        let points = box.map(x => parseInt(x))
        let left = points[0] * 100 / height
        let top = points[1] * 100 / width
        let w = (points[2] - points[0]) * 100 / height
        let h = (points[3] - points[1]) * 100 / width
        var divStyle = {
            top: top + '%',
            left: left + '%',
            height: h + '%',
            width: w + '%'
        };
        this.setState({
            styleBox: divStyle
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    componentDidMount(){
        if (this.props.item.new_category != 'bottom') {
            this.updateData(this.props.item.box, this.props.item.size_width, this.props.item.size_height)
        } else{
            this.setState({
                styleBox: {display: 'none'}
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
        if (this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
            if (this.props.item.new_category != 'bottom'){
                console.log(this.props.item.new_category)
                this.updateData(this.props.item.box, this.props.item.size_width, this.props.item.size_height)
            } else{
                this.setState({
                    styleBox: { display: 'none' }
                })
            }
        }
    }

    render() {

        let { productName = null, title = null, sku = null, productId = null, imageId = null, link = null, new_category=null} = this.props.item ? this.props.item : {} 
        title = sku
        const filename = PATH_IMAGE + productId + '_' + sku + '_' + imageId + '.jpg'

        return (
            <div className='col-xl-3 col-sm-6 col-md-4 mb-3'>
                <Card className='hvr-float-shadow product product-type-b'>
                    <CardImg  top width="100%" src={filename} alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>{title}</CardTitle>
                        <CardText>
                            {/* <span className='hvr-pulse'><i className='fa fa-link'></i></span> */}
                            <a href={link} target='_BLANK'><span className='hvr-pulse'><i className='fa fa-link'></i></span></a>
                            <span className='hvr-pulse right-0' onClick={() => this.props.redirect(sku)}><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </CardText>
                        <div className='boxing' style={this.state.styleBox}></div>
                        <div onClick={this.toggle} className='modal-event'></div>
                    </CardImgOverlay>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName={'my-modal'} >
                    <ModalHeader toggle={this.toggle}>{productName}</ModalHeader>
                    <ModalBody>
                        <CardImg top width="100%" src={filename} alt="Card image cap" />
                    </ModalBody>
                </Modal>
            </div>
            
        )
    }
}

export default ItemProduct;