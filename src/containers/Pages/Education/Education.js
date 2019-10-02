import React, { Component } from 'react';
import SubTitle from '../../../components/SubTitle'
import ItemEducation from './ItemEducation'

class Education extends Component {
    render() {
        const { data = [] } = this.props

        const _educations = data.map((item, index) => {
            return <ItemEducation key={index} data={item}/>    
        })

        return (
            <section>
                <SubTitle texto={['Education']}  size={0.6} />
                <div className='spacing-left-top list-type-2 container-fluid'>
                    {
                        _educations
                    }
                </div>
            </section>
        );
    }
}

export default Education;