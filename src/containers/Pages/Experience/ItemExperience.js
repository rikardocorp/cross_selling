import React from 'react';

const ItemExperience = (props) => {

    const { from_to = '', position = null, job_description = null, where = null, technologies = [], url = null } = props.data

    return (
        <div className='list-item row mt-4'>
            <div className="col col-md-12 col-xl-3">
                <span>{from_to}</span>
            </div>
            <div className="col col-md-12 col-xl-9">
                <p className='title'>{position}</p>
                <p className='pt-2'>{job_description}</p>
                <p className='location pt-2'><i>{where}</i></p>
                <p className='advisor'><a href={url} target="_blank" rel='noopener noreferrer'>{url}</a></p>                
                <div className="text text-small pt-3 list-badges">
                    <p> Technologies: 
                        {
                            technologies.map((item, index) => <span key={index} className="badge badge-principal">{item}</span>)
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ItemExperience;