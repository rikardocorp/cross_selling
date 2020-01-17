import React from 'react'
import { PATH_IMAGE } from '../../../shared/utility'

export default Image = (props) => {

    let { path = null, filename = null, url = null } = props

    let sourceImage = null

    if (url !== null) {
        sourceImage = url
    } else if (path == null) {
        sourceImage = PATH_IMAGE + filename
    } else {
        sourceImage = path + filename
    }
    return (
        <img className='' src={sourceImage} />
    )
};
