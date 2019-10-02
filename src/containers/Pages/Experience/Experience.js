import React, { Component } from 'react';
import SubTitle from '../../../components/SubTitle'
import ItemExperience from './ItemExperience'
class Experience extends Component {
    render() {

        const { data = [] } = this.props

        const _experience = data.map((item, index) => {
            return <ItemExperience key={index} data={item}/>    
        })

        return (
            <section>
                <SubTitle texto={['Professional', 'Experience']}  size={0.6} />
                <div className='spacing-left-top list-type-2 container-fluid'>
                    {
                        _experience
                    }
                </div>
            </section>
        );
    }
}

export default Experience;