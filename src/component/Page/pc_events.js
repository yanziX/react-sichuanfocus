import React from 'react'
import '../../style/pc_home.css'
import {fetchAction, fetchChangePageType} from '../../actions'
import {connect} from 'react-redux'
import pc_newslist from '../../container/pc_newslist'
import NewsList from '../View/NewsList'
import {EVENTS} from '../../constants/ActionTypes'
import api from '../../config/api';

var isFirstLoad = false

class PC_Events extends React.Component {
    
    componentWillMount() {
        const {dispatch} = this.props
        dispatch(fetchChangePageType(EVENTS))
        if(!isFirstLoad) {
            isFirstLoad = true
            dispatch(fetchAction(api.events, EVENTS))
        }
        
    }

    componentDidMount() {
        const {dispatch} = this.props
        // dispatch(fetchChangePageType(EVENTS))
        
    }

    render() {
        const {eventsDataList} = this.props

        return (
            <div className="content">
                <div className="leftContent">
                    <NewsList />
                </div>
                <div className="rightContent">
                    <img src="http://webpagescgc.sctv.com/image/pic1.jpg" />
                    <img src="http://webpagescgc.sctv.com/image/pic2.jpg"/>
                    <img src="http://webpagescgc.sctv.com/image/pic3.jpg"/>
                    <img src="http://webpagescgc.sctv.com/image/pic4.jpg"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {eventsDataList} = state
    return {
       lists: eventsDataList
    }
}

//有这个以后，const {dispatch} = this.props中dispatch才有值
export default connect(mapStateToProps)(PC_Events)