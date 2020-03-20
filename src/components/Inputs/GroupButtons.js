import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const GroupButtons = (props) => {
    const [rSelected, setRSelected] = useState(null);

    const {data = null} = props
    if (data == null || data.length == 0) return null

    const onCheckboxBtnClick = (selected) => {
        setRSelected(selected)
        props.callback(selected)
    }
    return (
        <div>
            {/* <h5>Radio Buttons</h5> */}
            <ButtonGroup>
                {
                    data.map((btn, index) => {
                        const { key, text } = btn
                        return (
                            <Button 
                                outline
                                key={index} color="primary" 
                                onClick={() => onCheckboxBtnClick(key)} 
                                active={rSelected === key}>
                                {text}
                            </Button>
                        )
                    })
                }

            </ButtonGroup>
            {/* <p>Selected: {rSelected}</p> */}
        </div>
    );
}

export default GroupButtons;