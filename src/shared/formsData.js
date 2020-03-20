// import React from 'react'
// import { required, email, maxLength, minLength } from '../../../shared/validity/validators/index'
import { required, email, maxLength, minLength } from '../../node_modules/react-form-total/dist/assets/validity/validators/index'

export const dataSearch = {
    name: 'login',
    // url: 'auth/login/',
    post: {
        username: '',
        password: '',
        subscribe: true
    },
    inputs: {
        username: {
            label: {
                labelText: 'Username'
            },
            input: {
                type: 'text',
                placeholder: 'Nombre de usuario o email',
            },
            rules: {
                required
            }
        },
        password: {
            label: {
                labelText: 'Password'
            },
            input: {
                type: 'range',
                placeholder: 'Password de la cuenta',
                // onKeyDown: (event) => {
                //     if(event.keyCode === 13) alert('Adding....')
                // }
            },
            rules: {
                required
            }
        },
        subscribe: {
            input: {
                className: 'ml-3',
                type: 'checkbox',
                label: 'Usuario modo administrador',
                value: true
            },
            rules: {
                required
            }
        },
    }
}

export const categories= [
    { key: 'cover', text: 'Covers' },
    { key: 'top', text: 'Tops' },
    { key: 'dress', text: 'Dresses' },
    { key: 'middle', text: 'Middles' },
    { key: 'bottom', text: 'Bottoms' }
]