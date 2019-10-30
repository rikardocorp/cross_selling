import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, CardImgOverlay, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { PATH_IMAGE, resize_bounding_box } from '../../../shared/utility'
import ModalImage from "react-modal-image";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


class Item extends Component {

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
        console.log('componentDidUpdate')
        if (this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
            if (this.props.item.new_category != 'bottom') {
                console.log(this.props.item.new_category)
                this.updateData(this.props.item.box, this.props.item.size_width, this.props.item.size_height)
            } else {
                this.setState({
                    styleBox: { display: 'none' }
                })
            }
        }
    }

    render() {

        let { productName = null, title = null, sku = null, productId = null, imageId = null, link = null, new_category = null, brand = '', imageUrl = null  } = this.props.item ? this.props.item : {}
        title = sku
        // const filename = PATH_IMAGE + productId + '_' + sku + '_' + imageId + '.jpg'
        const filename = imageUrl

        return (
            <div className='product-image'>
                <div className='image'>
                    <a href={link} target='_BLANK'>
                        <img src={filename}/>
                    </a>
                </div>
                <div className='content'>
                    <p className='brand'>{brand}</p>
                    <p className='productName'>{productName}</p>

                </div>
            </div>

        )
    }
}

export default Item;