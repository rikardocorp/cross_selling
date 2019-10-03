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
    skusdemo: [1290577, 1301632, 1301766, 1272902, 1285227, 1348337, 1345541, 1355672,
         1393823, 1393241, 1390001, 1275983, 1309592, 1291411, 1362844, 1340199, 1405420, 
         1383120, 1398964, 1398955, 1309677, 1309519, 1283143, 1458413, 1389164, 1309478, 
         1390080, 1405985, 1278536, 1368644, 1397559, 1398632, 1397369, 1397431, 1435848,
         1283391, 1398794, 1397751, 1309586, 1384138, 1398050, 1426080, 1398200, 1399242, 
         1278587, 1415993, 1383183, 1395703, 1399809, 1390049]
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