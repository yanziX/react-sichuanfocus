import { combineReducers } from 'redux'
// import homeDataList from './homeDataList'
// import eventsDataList from './eventsDataList'
import {FETCH_HOME_SUCCESS} from '../constants/ActionTypes'


const lists = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_STARTED':
            return state
        case 'FETCH_SUCCESS':
        let key = action.pageType
            return Object.assign({}, state, {[key]:action.result})
            // return [...initialArr(action), ...action.result] 
            //    return [...action.result]
            
        case 'FETCH_ERROR':
            return action.error
        default :
            return state
    }
}

// //界面类型，精选，时讯，直播。。
// const pageType = (type = '',action) => {
//     switch (action.pageType) {
//         case 'HOME':
//             return 'HOME'
//         case 'EVENTS':
//             return 'EVENTS'
//         case 'LIVE':
//             return 'LIVE'
//         default:
//             return type
//     }
// }

//界面类型，精选，时讯，直播。。
const pageType = (type = '',action) => {
    switch (action.type) {
        case 'CHANGE_PAGE_TYPE':
            return action.pageType
        
        default:
            return type
    }
}
//时讯界面天数数据
const eventsDataList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_EVENTS_SUCCESS':
            return action.result
        default:
            return state
    }
}

//时讯某一天数据
const eventsDateNewsList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_EVENTS_DATENEWS':
            return [...state, ...action.result]
        // case 'FETCH_HOME_DATENEWS':
        //     return [...state, ...action.result]
        default:
            return state
    }
}

//精选界面某一天时讯数据
const homeDateNewsList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_HOME_DATENEWS':
            return [...state, ...action.result]
        default:
            return state
    }
}

//精选界面时讯和时讯界面的天数索引
const eventsDateIndex = (index = 0, action) => {
    switch (action.type) {
        case 'FETCH_HOME_DATENEWS':
            return action.index
        case 'FETCH_EVENTS_DATENEWS':
            return action.index
        default:
            return index
    }
}

//精选界面的所有模块数据
const homeDataList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_HOME_SUCCESS':
            return action.result
        default:
            return state
    }
}

//直播界面新闻列表数据
const liveDatas = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LIVE_INDEX':
            return [...state, ...action.result]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    pageType,
    homeDataList,
    eventsDataList,
    eventsDateNewsList,
    homeDateNewsList,
    eventsDateIndex,
    liveDatas,
})

export default rootReducer