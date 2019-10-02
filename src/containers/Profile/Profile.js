import React, { Component } from 'react';
import {ImageProfile} from '../../config/data'

class Profile extends Component {

    render() {
        const {dataProfile={}, isSticky=false} = this.props
        const about_me = dataProfile
        return (
            <div className="profile m-auto" style={{ width: '85%', paddingTop: isSticky ? '60px' : '0px' }}>
                <div className="image">
                    <img src={ImageProfile} alt={about_me.fullname} />
                </div>

                <div className="mt-3 data-profile text-center">
                    <h2 className='p-0 m-0'><strong>{about_me.fullname}</strong></h2>
                    <p className='title'>{about_me.title}</p>
                    <p>{about_me.email}</p>
                    <p>{about_me.address}</p>
                </div>

                <div className="socials">
                    <a className="flat-button" target="_blank" rel='noopener noreferrer' href={about_me.cv_url}>DOWNLOAD CSV <i className='fa fa-download' /></a>
                </div>
            </div>
        );
    }
}

export default Profile;