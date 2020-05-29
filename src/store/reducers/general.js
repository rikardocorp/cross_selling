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
    database1: null,
    database2: null,
    datasample: null,
    // skusdemo: [1215651, 1397826, 1384134, 1402241]
    skusdemo: [ 1215651, 1397826, 1384134, 1402241, 1475572, 1348723, 1475559, 1393526, 1348723, 1283341, 1390071, 1283418, 1474373,
        1393514, 1398672, 1394007, 1291663, 1436767, 1283387, 1469031, 1393388, 1454833, 1399076, 1399106, 1460134, 1394878,
        1458851, 1459036, 1468642, 1427068, 1207968, 1314916, 1501611, 1429933, 1456273, 1431565, 1459064, 1430914, 1316359,
        1460138, 1458291, 1482313, 1436767, 1398666, 1480613, 1398603, 1458227, 1398606, 1399791, 1397261, 1480643, 1355712,
        1454501, 1398961, 1480631, 1454591, 1494074, 1480230, 1475861, 1458014, 1399754, 1397628, 1397285, 1454816, 1474352 ]
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
            if (action.value.type == 'ORIGINAL') {
                return {
                    ...state,
                    database1: action.value.data
                }
            } else {
                return {
                    ...state,
                    database2: action.value.data
                }
            }
        
        case at.UPDATE_DATABASE:
            // 1. Make a shallow copy of the items
            let index = action.value.index
            let items = [...state.database2];
            // 2. Make a shallow copy of the item you want to mutate
            let item = { ...items[index] };
            // 3. Replace the property you're intested in
            item.label = action.value.data;
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            items[index] = item;
            // 5. Set the state to our new copy
            return {
                ...state,
                database2: items
            }
            
        case at.SET_SAMPLE_DATABASE:
            return {
                ...state,
                datasample: action.value
            }
        case at.SET_DATA_BY_KEY_VALUE:
            let keyValue = action.value
            let _data = {...state}
            console.log('STORAGE')
            console.log(_data)
            console.log(keyValue)
            _data[keyValue.key] = keyValue.value
            return _data
        default: return state
    }
}

export default reducer