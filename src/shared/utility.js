import React from 'react';
import axios from "./axios";
import { confirmAlert } from 'react-confirm-alert'

export const PATH_IMAGE = 'https://storage.googleapis.com/oechsle/img/images/'

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getDataAsync = async (url) => {
    const result = await axios.get(url)
    return result.status === 200 ? result.data : []
}

export const deleteDataAsync = async (url) => {
    const result = await axios.delete(url)
    return result.status === 204
}

export const addDataAsync = async (url, data) => {
    const result = await axios.post(url, data)
    return result.status === 201
}


export const mapErrorToNotification = error => {
    if (error === undefined) return 'No se ha establecido conexión con el servidor.'

    const status = error.status
    const data = error.data
    let mensaje = ''
    if (typeof data === 'object') {
        if (data.message) {
            mensaje = data.message
        } else {
            mensaje = Object.values(data)[0]
            console.log(Object.values(data))
            // console.log('rikardocorp 12')
            // console.log(mensaje)
            mensaje = Array.isArray(mensaje) ? mensaje[0] : mensaje
        }
    } else if (Array.isArray(data)) {
        mensaje = Object.values(data[0])
        mensaje = Array.isArray(mensaje) ? mensaje[0] : mensaje
    } else {
        mensaje = data.length > 255 ? data.substring(0, 255) + '...' : data
    }

    // console.log(mensaje)
    return mensaje
}

export const confirmDialog = (color = 'primary', f1, title = null) => {
    const className = 'custom-ui bg-' + color
    const titleFinal = title ? title : '¿Estas seguro en eliminar este registro?'
    // const titleFinal = '¿Estas seguro en eliminar este registro?'
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className={className}>
                    <h4>Mensaje de Seguridad</h4>
                    <p className='pt-2 pb-1'>{titleFinal}</p>
                    <div className='clearfix'>
                        <button className="btn btn-light float-left" onClick={onClose}>No</button>
                        <button className="btn btn-dark float-right" onClick={() => {
                            f1()
                            onClose()
                        }}>Si, Procesar!
                        </button>
                    </div>
                </div>
            )
        }
    })
}

export const mapOrder = (array, order, key) => {
    array.sort((a, b) => {
        let A = a[key], B = b[key]
        if (order.indexOf(A) > order.indexOf(B) || order.indexOf(A) === -1 || order.indexOf(B) === -1) {
            return 1
        } else {
            return -1
        }
    })
    return array
}

export const cleanString = cadena => {
    let _cadena = cadena.trim().toLowerCase()
    const chars = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
        "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
        "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
        "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N", " ": "_"
    }
    const expr = /[áàéèíìóòúùñ ]/ig
    const res = _cadena.replace(expr, function (e) { return chars[e] })
    return res
}

export const colorMethod = [
    { label: 'Default', color: 'none' },
    { label: 'Blue', color: 'rgba(71, 131, 228, 0.22)' },
    { label: 'Red', color: 'rgba(228, 71, 71, 0.27)' },
    { label: 'Green', color: 'rgba(77, 142, 2, 0.27)' },
    { label: 'Skyblue', color: 'rgba(57, 144, 179, 0.22)' },
    { label: 'Yellow', color: 'rgba(199, 199, 0, 0.15)' },
    { label: 'Orange', color: 'rgba(197, 113, 0, 0.22)' },
]

export const colorMethodObject = () => {
    const newObject = {}
    colorMethod.map(it => {
        newObject[it.label] = it.color
    })
    return newObject
}

export const iconMethod = [
    { label: 'Science', icon: 'pe-7s-science' },
    { label: 'Album', icon: 'pe-7s-album' },
    { label: 'Bandaid', icon: 'pe-7s-bandaid' },
    { label: 'Car', icon: 'pe-7s-car' },
    { label: 'Diamond', icon: 'pe-7s-diamond' },
    { label: 'Door-lock', icon: 'pe-7s-door-lock' },
    { label: 'Eyedropper', icon: 'pe-7s-eyedropper' },
    { label: 'Female', icon: 'pe-7s-female' },
    { label: 'Male', icon: 'pe-7s-male' },
    { label: 'Gym', icon: 'pe-7s-gym' },
    { label: 'Hammer', icon: 'pe-7s-hammer' },
    { label: 'Headphones', icon: 'pe-7s-headphones' },
    { label: 'Helm', icon: 'pe-7s-helm' },
    { label: 'Hourglass', icon: 'pe-7s-hourglass' },
    { label: 'Leaf', icon: 'pe-7s-leaf' },
    { label: 'Magic-Wand', icon: 'pe-7s-magic-wand' },
    { label: 'Map', icon: 'pe-7s-map-2' },
    { label: 'Arc', icon: 'pe-7s-arc' },
    { label: 'Back', icon: 'pe-7s-back-2' },
    { label: 'Next', icon: 'pe-7s-next-2' },
    { label: 'Bucket', icon: 'pe-7s-paint-bucket' },
    { label: 'Pendrive', icon: 'pe-7s-pendrive' },
    { label: 'Photo', icon: 'pe-7s-photo' },
    { label: 'Piggy', icon: 'pe-7s-piggy' },
    { label: 'Plugin', icon: 'pe-7s-plugin' },
    { label: 'Refresh', icon: 'pe-7s-refresh-2' },
    { label: 'Rocket', icon: 'pe-7s-rocket' },
    { label: 'Settings', icon: 'pe-7s-settings' },
    { label: 'Shield', icon: 'pe-7s-shield' },
    { label: 'Smile', icon: 'pe-7s-smile' },
    { label: 'Usb', icon: 'pe-7s-usb' },
    { label: 'Cash', icon: 'pe-7s-cash' },
    { label: 'Bluetooth', icon: 'pe-7s-bluetooth' },
    { label: 'Way', icon: 'pe-7s-way' },
    { label: 'Personal ID', icon: 'pe-7s-id' },
    { label: 'Wristwatch', icon: 'pe-7s-wristwatch' },
    { label: 'World', icon: 'pe-7s-world' },
    { label: 'Users', icon: 'pe-7s-users' },
    { label: 'User-Female', icon: 'pe-7s-user-female' },
    { label: 'Wallet', icon: 'pe-7s-wallet' },
    { label: 'Safe', icon: 'pe-7s-safe' },
    { label: 'Volume', icon: 'pe-7s-volume2' },
    { label: 'Umbrella', icon: 'pe-7s-umbrella' },
    { label: 'Trash', icon: 'pe-7s-trash' },
    { label: 'Tools', icon: 'pe-7s-tools' },
    { label: 'Timer', icon: 'pe-7s-timer' },
    { label: 'Ticket', icon: 'pe-7s-ticket' },
    { label: 'Target', icon: 'pe-7s-target' },
    { label: 'Study', icon: 'pe-7s-study' },
    { label: 'Star', icon: 'pe-7s-star' },
    { label: 'Speaker', icon: 'pe-7s-speaker' },
    { label: 'Signal', icon: 'pe-7s-signal' },
    { label: 'Server', icon: 'pe-7s-server' },
    { label: 'Disk', icon: 'pe-7s-disk' },
    { label: 'Ribbon', icon: 'pe-7s-ribbon' },
    { label: 'PaperClip', icon: 'pe-7s-paperclip' },
    { label: 'Note', icon: 'pe-7s-note2' },
    { label: 'Network', icon: 'pe-7s-network' },
    { label: 'Medal', icon: 'pe-7s-medal' },
    { label: 'Portfolio', icon: 'pe-7s-portfolio' },
    { label: 'Plane', icon: 'pe-7s-plane' },
    { label: 'Phone', icon: 'pe-7s-phone' },
    { label: 'Monitor', icon: 'pe-7s-monitor' },
    { label: 'Marker', icon: 'pe-7s-map-marker' },
    { label: 'Mail', icon: 'pe-7s-mail' },
    { label: 'Magnet', icon: 'pe-7s-magnet' },
    { label: 'Look', icon: 'pe-7s-look' },
    { label: 'Heart', icon: 'pe-7s-like' },
    { label: 'Light', icon: 'pe-7s-light' },
    { label: 'Info', icon: 'pe-7s-info' },
    { label: 'Home', icon: 'pe-7s-home' },
    { label: 'Graph', icon: 'pe-7s-graph1' },
    { label: 'Gleam', icon: 'pe-7s-gleam' },
    { label: 'Edit', icon: 'pe-7s-edit' },
    { label: 'Drop', icon: 'pe-7s-drop' },
    { label: 'Display', icon: 'pe-7s-display2' },
    { label: 'Compass', icon: 'pe-7s-compass' },
    { label: 'calculator', icon: 'pe-7s-calculator' },
]