// import React from 'react';

export const configNotification = {
    title: 'Mensaje Importante',
    message: "Awesome Notifications!",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "flipInY"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 5000 },
    dismissable: { click: true },
    // content: (
    //     <div className='notification-custom-success'>
    //         <div className='notification-custom-icon'>
    //             <i className='fa fa-check'/>
    //         </div>
    //         <div className='notification-custom-content'>
    //             <p className='notification-message'>
    //                 Github is Awesome!!
    //             </p>
    //         </div>
    //     </div>
    // )
}

class MessageNotification  {

    static successInvitation = {
        message: 'Se envió la invitación exitosamente',
        type: 'success',
    }

    static errorLogin= {
        title: 'Error Login',
        message: 'El usario o la contraseña no coinciden.',
        type: 'danger',
        animationIn: ["animated", "bounceIn"],
    }

    static sessionExpired= {
        title: 'Sesion Expirada',
        message: 'Para ingresar al sistema vuelva a ingresar su usuario y contraseña.',
        type: 'danger',
        animationIn: ["animated", "bounceIn"],
    }
}

export default MessageNotification
