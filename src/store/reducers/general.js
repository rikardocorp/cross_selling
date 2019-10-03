import * as at from '../actions/actionTypes'
// import {data as myData} from '../../config/data'

const initialState = {
    countLoading: 0,
    isLoading: false,
    sendNotification: null,
    unauthorized: false,
    notify: {
        listener: 0,
        config: {}
    },
    user: {
        auth: false,
        token: '',
        profile: {}
    },
    showing: false,
    isHide: false,
    database: null,
    datasample: null,
    skudemo: [1345541, 1355672]
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case at.HANDLER_LOADING:
            const countLoading = state.countLoading
            const number = action.value ? 1 : -1
            const newCountLoading = (countLoading + number) < 0 ? 0 : (countLoading + number)
            const isLoading = !(newCountLoading === 0)
            return {
                ...state,
                isLoading: isLoading,
                countLoading: newCountLoading
            }
        case at.IS_LOADING:
            return {
                ...state,
                isLoading: action.value
            }
        case at.PUSH_NOTIFICATION:
            const counter = state.notify.listener + 1
            return {
                ...state,
                notify: {
                    listener: counter,
                    config: action.config
                }
            }
        case at.DISPATCH_HTTP:
            return {
                ...state
            }

        case at.SET_DATABASE:
            return {
                ...state,
                database: action.value
            }
        case at.SET_SAMPLE_DATABASE:
            return {
                ...state,
                datasample: action.value
            }
        default: return state
    }
}

export default reducer