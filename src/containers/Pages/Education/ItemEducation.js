import React from 'react';

const ItemEducation = (props) => {

    const {years='', title=null, where=null, thesis_title=null, advisor=null, detail=null} = props.data

    return (
        <div className='list-item row mt-4'>
            <div className="col col-md-12 col-xl-3">
                <span>{years}</span>
            </div>
            <div className="col col-md-12 col-xl-9">
                <p className='title'>{title}</p>
                <p className='location'><i>{where}</i></p>
                {
                    thesis_title && thesis_title!=='' ? (
                        <p className='title_thesis'><i>Thesis:</i> {thesis_title}</p>
                    ) : null
                }
                <p className='advisor'>{advisor}</p>
                <p className='advisor'>{detail}</p>
            </div>
        </div>
    );
};

export default ItemEducation;