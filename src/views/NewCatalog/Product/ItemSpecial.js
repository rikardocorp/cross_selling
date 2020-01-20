import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-scroll'
import Image from './Image'
import { resize_bounding_box } from '../../../shared/utility'

// const catalogoReturn = 
class ItemSpecial extends Component {

    state = {
        isOn: true,
        styleBox: {},
        styleImage: {},
        widthImage: '100%',
        catalogoReturn: localStorage.getItem('catalogo')
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

    updateBox = () => {
        const { box = null, size_width = null, size_height = null } = this.props.item
        
        let divStyle, imageStyle, widthImage = null
        if (box){
            [divStyle, imageStyle, widthImage] = this.getBox(box, size_width, size_height)
        } else {
            [divStyle, imageStyle, widthImage] = [{},{}, '100%']
        }

        this.setState({
            styleBox: divStyle,
            styleImage: imageStyle,
            widthImage: widthImage,
            isOn: true
        })
    }

    componentDidMount() {
        this.updateBox()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate')
        if (this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
            this.updateBox()
        }
    }

    getBox = (box, width, height) => {
        let [percent, marginLeft, marginTop] = this.get_width(width, height)
        box = box.split('-')
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

        return [divStyle, imageStyle, percent + '%']
    }


    changeState = () => {
        this.setState(state => {
            return {
                isOn: !state.isOn
            }
        })
    }

    render() {
        console.log('ItemSpecial:')
        console.log(this.props)
        let classOn = 'off'
        if (this.state.isOn) {
            classOn = 'on'
        }

        const { sku = null, productName = null, image = null, productId = null, imageId = null, link = null, imageUrl = null } = this.props.item ? this.props.item : {}
        const title = productName
        const filename = productId + '_' + sku + '_' + imageId + '.jpg'
        const categories = this.props.categories
        const version = this.props.version

        let list_tags = null
        if (this.props.relations != undefined) {
            list_tags = categories.map((cat, index) => {
                let key = cat['key']
                let text = cat['text']
                let obj = this.props.relations[key]
                let classname = 'tag' + (index + 1)
                if (obj != null) {
                    classname = classname + ' activated'
                }
                return (
                    <Link key={index} activeClass="active" to={version + '_' + key} smooth={true} spy={true} offset={-50} duration={1000}>
                        <span className={classname}>{text}</span>
                    </Link >
                )
            })
        }

        let imagePrincipal = null
        if (sku !== null) {
            imagePrincipal = <Image url={imageUrl} width={this.state.widthImage} style={this.state.styleImage}></Image>
        }

        return (
            <div className='special-product p-5'>
                {/* <div onClick={() => this.props.history.goBack()} className='button-simple hvr-backward'><i className='fa fa-angle-left'></i></div> */}
                <div onClick={() => this.props.history.push(this.props.params.basepath)} className='button-simple hvr-backward'><i className='fa fa-angle-left'></i></div>
                <h4 className='text-center mb-3 text-uppercase'>{title}</h4>
                <div className='content-img'>
                    {
                        this.state.isOn ? <div className='boxing' style={this.state.styleBox}></div> : null
                    }

                    {
                        imagePrincipal
                    }
                    <div className='tags-list'>
                        {
                            list_tags
                        }
                    </div>
                </div>
                <div className='content-footer mt-4'>
                    <h4 className='text-center mb-3'>SKU: {sku}</h4>
                    <a href={link} target='_BLANK'><span className='hvr-pulse'><i className='fa fa-link'></i></span></a>
                    <span className='hvr-pulse right-0' onClick={() => this.changeState()}><i className={"fa fa-toggle-" + classOn} aria-hidden="true"></i></span>
                    <div className='buttons-list'>
                        <span className='hvr-pulse right-0' onClick={() => this.props.event_tops(4)}>X 4</span>
                        <span className='hvr-pulse right-0' onClick={() => this.props.event_tops(8)}>X 8</span>
                        <span className='hvr-pulse right-0' onClick={() => this.props.event_tops(20)}>X X</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(ItemSpecial);