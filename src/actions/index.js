
import {FETCH_STARTED, FETCH_HOME_SUCCESS, FETCH_EVENTS_SUCCESS, FETCH_ERROR,
         HOME, EVENTS, FETCH_EVENTS_DATENEWS, FETCH_HOME_DATENEWS, LIVE,
         FETCH_LIVE_INDEX
        } from '../constants/ActionTypes'

let liveUrl = ""

export const fetchStarted = () => ({
    type: FETCH_STARTED
})

/**
 * 请求精选页面数据
 * @param {*} result 请求结果，是分组的结果
 * @param {*} pageType 
 */
export const fetchHomeDataSuccess = (result, pageType) => ({
    type: FETCH_HOME_SUCCESS,
    result,
    pageType
})

/**
 * 请求时讯的所有天数数据，还需请求当天的详细数据显示
 * @param {*} result 
 */
export const fetchEventsDataSuccess = (result, pageType) => ({
    type: FETCH_EVENTS_SUCCESS,
    result,
    pageType
})

/**
 * 请求时讯界面的某一天新闻数据
 * @param {*} result 新闻列表数据
 */
let date = 1
export const fetchEventDateLists = (result) => ({
    type: FETCH_EVENTS_DATENEWS,
    index: date ++,
    result
})


/**
 * 请求精选界面时讯部分某一天数据
 */
let homeDate = 1
export const fetchHomeDateLists = (result) => ({
    type: FETCH_HOME_DATENEWS,
    index: homeDate ++,
    result
})

let liveIndex = 0
export const fetchLiveDataSuccess = (result, pageType) => ({
    type: FETCH_LIVE_INDEX,
    index: liveIndex ++,
    pageType: pageType,
    result

})

/**
 * 数据请求失败
 * @param {*} error 
 */
export const fetchError = (error) => ({
    type: FETCH_ERROR,
    error
})

export const fetchChangePageType = (pageType) => ({
    type: 'CHANGE_PAGE_TYPE',
    pageType: pageType
})

/**
 * 发起请求数据操作
 * @param {*} url 界面url
 * @param {*} pageType 界面类型，精选，时讯，直播。。。
 */
export const fetchAction = (url, pageType) => {
    return (dispatch) => {
        dispatch(fetchStarted());
        fetch(url).then((resp) => {
            if(resp.status !== 200) throw new Error('there is an error,resp status is :'+ resp.status)
            resp.json().then((respJson) => {
                switch (pageType) {
                    case HOME: {
                        dispatch(fetchHomeSection(respJson.data.channel, pageType));
                        break;
                    }
                    case EVENTS: {
                        dispatch(fetchEventsDataSuccess(respJson.data.newsArray, pageType));
                        dispatch(fetchEventsDateNews(respJson.data.newsArray[0].newsListUrl, pageType))
                        break;
                    }
                    case LIVE: {
                        liveUrl = respJson.data.channel[2].channelUrl
                        dispatch(fetchLiveData(respJson.data.channel[2].channelUrl, pageType))
                        break;
                    }
                    default:
                        return

                }
            })
        }).catch((error) => {
            dispatch(fetchError(error))
        })
    }
}

/**
 * 请求首页的分组数据
 * @param {*} urlArray 首页的模块数组（轮播图，热门视频，直播。。）
 */
export const fetchHomeSection = (urlArray, pageType) => {

    var arr = []
    return (dispatch) => {
        urlArray.map(urlObj => 
            fetch('http://kscgc.sctv.com'+urlObj.channelUrl)
            .then(response => response.json())
            .then((json) => {
                switch (urlObj.subChannelType) {
                    case "1":
                    case "4":
                        arr.push({key:urlObj.subChannelType, value:json.data.newsList})
                        break;
                    case "5":
                        arr.push({key:urlObj.subChannelType,value:json.data.newsArray})
                        dispatch(fetchEventsDateNews(json.data.newsArray[0].newsListUrl, pageType))
                        break;
                    default:
                        break
                }
                if(arr.length === 3) {
                    dispatch(fetchHomeDataSuccess(arr, pageType))
                }
            })
            .catch((error) => {
                alert(error)
            })
        )
    }
}

/**
 * 请求时讯界面某一天数据
 * @param {*} url 某一天数据的url
 */
export const fetchEventsDateNews = (url, pageType) => {
    if (pageType === LIVE) {
        return (dispatch) => {
            dispatch(fetchLiveData(url, pageType))
        }    
    }else {
        if (url) {
            return (dispatch) => {
                fetch('http://kscgc.sctv.com'+url)
                .then(response => response.json())
                .then((json) => {
                    if (pageType === EVENTS) {
                        dispatch(fetchEventDateLists(json.data.newsList))
                    }else {
                        dispatch(fetchHomeDateLists(json.data.newsList))
                    }
                    
                })
                .catch((error) => {
                    alert(error)
                })
            }
        }
    }   
}

export const fetchLiveData = (url, pageType) => {
    // if (url) {
        let indexUrl
        if (liveIndex === 0) {
            indexUrl = 'http://kscgc.sctv.com'+liveUrl
        }else {
            indexUrl = ('http://kscgc.sctv.com'+liveUrl).replace('.json','_'+liveIndex+'.json')
        }

        return (dispatch) => {
            fetch(indexUrl)
            .then(response => response.json())
            .then((json) => {
                dispatch(fetchLiveDataSuccess(json.data.liveList, pageType))
            })
            .catch((error) => {
                alert(error)
            })
        }
    }
// }