import React from 'react'
const Boxing = (props) => {

    let { title=null, type=null, box = null, score=0.0, width=null, height=null} = props.data
    
    if (box==null) return null
    let points = box.map(x => parseInt(parseFloat(x)))
    width = parseInt(width)
    height = parseInt(height)
    score = parseFloat(score).toFixed(2)

    let _max = Math.max(width, height)

    let top = points[1] * 100 / _max 
    let left = points[0] * 100 / _max
    
    let w = (points[2] - points[0]) * 100 / _max
    let h = (points[3] - points[1]) * 100 / _max


    let styleBox = {
        top: top + '%',
        left: left + '%',
        height: h + '%',
        width: w + '%'
    };

    return (  
        <div className={'boxing ' + type} style={styleBox}>
            <span>{title}</span>
            <span className={'score'}>{score + '%'}</span>
        </div>
    );

}
 
export default Boxing;