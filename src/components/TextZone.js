import React, { Component } from 'react';

class TextZone extends Component {

    render() {
        const {texto=[], children=null, color=null, className=null, size=null} = this.props
        let _textStyle = color ? {color: color} : {}
        const _className = className ? 'text-zone ' + className : 'text-zone'


        
        if (size !== null) {
            _textStyle = {
                ..._textStyle,
                fontSize: size + 'em'
            }
        }
        
        // const listText = [(<span>&nbsp;</span>)]
        const listText = []
        texto.map((word, idx) => {
            word.split('').map((letter, index) => {
                const _letter = letter === ' ' ? 
                    (<span key={idx+'_'+index} className="blast" aria-hidden="true" style={{opacity: "1"}}>&nbsp;</span>) :
                    (<span key={idx+'_'+index} className="blast" aria-hidden="true" style={{opacity: "1"}}>{letter}</span>)
                listText.push(_letter)
            })
            listText.push(<br key={'br_'+idx}/>)
        })
        listText.pop()
        const textComplete = texto.join(' ')

        return (
            <div className={_className}>
                <h1 aria-label={textComplete} className="blast-root" style={_textStyle}>
                {
                    listText
                }
                </h1>
                {
                    children
                }
                
            </div>
        );
    }
}

export default TextZone;