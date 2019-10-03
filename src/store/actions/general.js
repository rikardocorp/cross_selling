import * as at from './actionTypes'
import axios from '../../shared/axios'
import { mapErrorToNotification } from '../../shared/utility'
import MessageNotification from '../../shared/MessageNotification'
import {} from "./index"
let IsStatus401 = false

export const isHidden = () => {
    return { type: at.IS_HIDDEN }
}

export const clickit = () => {
    return { type: at.CLICK_IT }
}

export const handlerLoading = (value) => {
    return { type: at.HANDLER_LOADING, value: value }
}

export const setIsLoading = (value) => {
    return { type: at.IS_LOADING, value }
}

export const pushNotification = (config) => {
    return { type: at.PUSH_NOTIFICATION, config }
}

export const setDatabase = (value) => {
    return { type: at.SET_DATABASE, value }
}
export const setSampleDatabase = (value) => {
    return { type: at.SET_SAMPLE_DATABASE, value }
}

export const dispatchHTTP = (method, url, data = null, notify = { success: true, error: true }, authorized_persistent = false) => {
    return async (dispatch, getState) => {
        let response = null
        const unauthorized = getState().general.unauthorized
        if (unauthorized && !authorized_persistent) {
            return { status: false, content: 'Unauthorized' }
        }
        dispatch(handlerLoading(true))
        const promise = new Promise((resolve, reject) => {

            const result = {
                status: false,
                content: null
            }

            switch (method) {
                case 'GET':
                    response = axios.get(url, { params: data })
                    notify.success = false
                    break
                case 'POST':
                    response = axios.post(url, data)
                    break
                case 'PATCH':
                    response = axios.patch(url, data)
                    break
                case 'DELETE':
                    url = url.slice(-1) === '/' ? url : url + '/'
                    response = axios.delete(url, { data: data })
                    break
                case 'GET_BLOB':
                    response = axios.get(url, { responseType: 'blob' })
                    break
                default:
                    response = null
                    result['status'] = null
                    result['content'] = 'ONLY [GET, POST, PATCH. DELETE]'
                    resolve(result)
            }
            response.then(resp => {
                // console.log('[THEN RESPONSE]')
                // console.log(resp)
                // console.log('[------ ------ ------]')

                // let statusMsg
                // let contentMsg = {}
                if (resp.status >= 200 && resp.status < 300) {
                    // statusMsg = 'success'
                    result['status'] = true
                    result['content'] = resp.data
                //     contentMsg = { title: 'Notificación', message: 'La petición se realizó con exito!', type: 'success' }
                } else {
                    // statusMsg = 'error'
                    result['status'] = false
                    result['content'] = null
                //     contentMsg = { title: 'Notificación', message: 'Ocurrio un error', type: 'danger' }
                }

                // if (notify[statusMsg]) dispatch(pushNotification(contentMsg))
                resolve(result)
            }).catch(async error => {
                // console.log('[CATCH ERROR]')
                // console.log(error)
                // console.log(error.response)
                // if (!error.response) return
                // const status = error.response ? error.response.status : null
                // const data = error.response ? error.response.data : []
                // result['status'] = false
                // result['content'] = data
                // if (status === 401) {
                //     // console.log('       ----- Start expiredOnlyOnce: ', IsStatus401)
                //     if (!IsStatus401) {
                //         IsStatus401 = true
                //         // console.log('[Unauthorized]')
                //         dispatch(setUnauthorized(true))
                //         const status = await dispatch(authUserStatus())
                //         if (!status) {
                //             dispatch(pushNotification(MessageNotification.sessionExpired))
                //         } else {
                //             IsStatus401 = false
                //         }
                //     }
                //     // console.log('       ----- End expiredOnlyOnce: ', IsStatus401)
                // } else {
                //     if (notify['error']) {
                //         const msg = mapErrorToNotification(error.response)
                //         const contentMsg = { title: 'Notificación', message: msg, type: 'danger' }
                //         dispatch(pushNotification(contentMsg))
                //     }
                // }
                resolve(error)
            })
        })

        promise.then(() => {
            dispatch(handlerLoading(false))
        }).catch(() => {
            dispatch(handlerLoading(false))
        })
        return promise
    }
}

export const fetchData = (url, params = null, data = null) => {
    return async dispatch => {
        let state
        if (data === null) {
            state = await dispatch(dispatchHTTP('GET', url, params))
        } else {
            state = await dispatch(dispatchHTTP('POST', url, data))
        }
        if (state.status) {
            return state.content
        } else {
            return null
        }
    }
}
