import React, { Component } from 'react';
import SubTitle from '../../components/SubTitle'

class Summary extends Component {
    render() {
        const { summary = null, keywords = null } = this.props

        let _summary = null
        if (summary) {
            _summary = (
                <React.Fragment>
                    <SubTitle texto={['Summary']}></SubTitle>
                    <div className="text pl-5 ml-5">
                        {
                            summary.map((item, index) => <p key={index}>{item}</p>)
                        }
                    </div>
                </React.Fragment>

            )
        }

        let _keywords = null
        if (keywords) {
            _keywords = (
                <React.Fragment>
                    <br/><br/>
                    <SubTitle texto={['Keywords']} titleTextColor={'gray'} size={0.35}></SubTitle>
                    <div className="text text-small pl-5 ml-5">
                        <p>
                            {
                                keywords.map((item, index) => <span key={index} className="badge badge-principal">{item}</span>)
                            }
                        </p>
                    </div>
                </React.Fragment>
            )
        }

        return (
            <section>
                {_summary}
                {_keywords}
            </section>
        );
    }
}

export default Summary;