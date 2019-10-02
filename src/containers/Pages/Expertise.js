import React, { Component } from 'react';
import SubTitle from '../../components/SubTitle'

class Expertise extends Component {
    render() {

        const { data = [] } = this.props

        const _expertise = data.map((item, index) => {
            return (
                <div key={index} className="col-6 col-md-12 col-xl-6">
                    <div className="row">
                        <div className="col-8">
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                        <div className="col-4">
                            <img src={item.url} alt=""/>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <section>
                <SubTitle texto={['Expertise']} size={0.7} titleTextColor='gray' />
                <div className='spacing-left-top list-type-1 container-fluid'>
                    <div className="row">
                        {
                            _expertise
                        }
                    </div>

                </div>
            </section>
        );
    }
}

export default Expertise;