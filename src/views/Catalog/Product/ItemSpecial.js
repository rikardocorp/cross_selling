import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-scroll'
import Image from './Image'

class ItemSpecial extends Component {

    state = {
        isOn: false,
        styleBox: {}
    }

    updateBox = ()=>{
        const { box = null, size_width = null, size_height = null } = this.props.item
        this.setState({
            styleBox: box ? this.getBox(box, size_width, size_height) : {},
            isOn: false
        })
    }

    componentDidMount(){
        this.updateBox()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
        if (this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
            this.updateBox()
        }
    }

    getBox = (box, width, height) => {
        let points = box.split('-').map(x => parseInt(x))
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
        console.log('BOXESS')
        console.log(divStyle)
        return divStyle
    }


    changeState = () => {
        this.setState(state => {
            return {
                isOn: !state.isOn
            }
        })
    }

    render() {

        let classOn = 'off'
        if (this.state.isOn) {
            classOn = 'on'
        }

        const { sku = null, productName = null, image = null, productId = null, imageId=null, link=null } = this.props.item ? this.props.item : {}
        const title = productName
        const filename = productId + '_' + sku + '_' + imageId + '.jpg'
        const categories = this.props.categories
        let list_tags = categories.map((cat, index) => {
            let obj = this.props.relations[cat]
            let classname = 'tag' + (index + 1) 
            if (obj != null) {
                classname = classname + ' activated'
            }
            return (
                <Link key={index} activeClass="active" to={cat} smooth={true} spy={true} offset={0} duration={1000}>
                    <span className={classname}>{cat}s</span>
                </Link >
            )
        })

        let imagePrincipal = null
        if (sku !== null){
            imagePrincipal = <Image filename={filename}></Image>
        }

        return (
            <div className='special-product p-5'>
                <div onClick={() => this.props.history.push('/catalogo')} className='button-simple hvr-backward'><i className='fa fa-angle-left'></i></div>
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
                    <span className='hvr-pulse right-0' onClick={()=>this.changeState()}><i className={"fa fa-toggle-" + classOn} aria-hidden="true"></i></span>
                </div>
            </div>
        )
    }
}


export default withRouter(ItemSpecial);