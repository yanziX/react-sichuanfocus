/**
 * 新闻列表
 */

import React from 'react'
import PropTypes from 'prop-types'
import NewsListItem from './NewsListItem'
import {connect} from 'react-redux'
import {fetchEventsDateNews, fetchLiveData} from '../../actions'
import { HOME } from '../../constants/ActionTypes';
import '../../style/pc_home.css'

const NewsList = ({header ,fetchMoreUrl, lists, pageType, fetchMoreTodo}) => (
    <div>
        <h3>{header}</h3>
        <ul>
        {lists.map(newsObject => 
            <NewsListItem 
                newsObject = {newsObject}
                pageType={pageType}
            />
        )}    
        </ul>
        <button onClick={() => fetchMoreTodo(fetchMoreUrl, pageType)}>点击加载更多...</button>
    </div>
    
)

//应该显示的新闻列表
const getNewsList = (pageType, state) => {
    switch (pageType) {
        case 'HOME': 
            return state.homeDateNewsList
        case 'EVENTS':
            return state.eventsDateNewsList
        case 'LIVE':
            return state.liveDatas
        default:
            return []
    }
}

//每个栏目对应的第一层数据，精选界面和时讯是所有天数，
const getDatesData = (pageType, state) => {
    switch (pageType) {
        case 'HOME': 
            return state.homeDataList.find(obj => obj.key === "5").value
        case 'EVENTS':
            return state.eventsDataList
        default:
            return []
    }
}

//点击获取更多时对应的url
const getFetchMoreUrl = (pageType, state) => {
    switch (pageType) {
        case 'HOME': 
            return state.homeDataList.find(obj => obj.key === "5").value[state.eventsDateIndex].newsListUrl
        case 'EVENTS':
            return state.eventsDataList.length > 0 ? state.eventsDataList[state.eventsDateIndex].newsListUrl : ""
        // case 'LIVE':
        //     return state.liveDatas[]
        default:
            return ""
    }
}

const getHeader = (pageType) => {
    switch(pageType) {
        case 'HOME':
            return '24小时';
        default:
            return ''
    }
}
const mapStateToProps = state => ({
    // dates: state.pageType === HOME ? state.homeDataList.find(obj => obj.key === "5").value : state.eventsDataList,
    // lists: state.pageType === HOME ? state.homeDateNewsList : state.eventsDateNewsList,
    // dates: getDatesData(state.pageType, state),
    lists: getNewsList(state.pageType, state),
    fetchMoreUrl: getFetchMoreUrl(state.pageType, state),
    index: state.eventsDateIndex,
    pageType: state.pageType,
    header: getHeader(state.pageType)
})

const mapDispatchToProps = dispatch => ({
    fetchMoreTodo: (url, pageType) => dispatch(fetchEventsDateNews(url, pageType))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)