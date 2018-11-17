import React from 'react'
import api from '../../config/api'
import { fetchAction, fetchChangePageType } from '../../actions';
import {LIVE} from '../../constants/ActionTypes'
import '../../style/pc_home.css'
import NewsList from '../View/NewsList'
import {connect} from 'react-redux'

var isFirstLoad = true

class PC_Live extends React.Component {

    //切换页面时，先更新页面类型，选择对应的数据
    componentWillMount() {
        const {dispatch} = this.props
        dispatch(fetchChangePageType(LIVE))

        //如果不是第一次加载，就不再获取数据，在点击更多时才会获取
        if(isFirstLoad) {
            isFirstLoad = false
            dispatch(fetchAction(api.live, LIVE))
        }
    }

    componentDidMount() {
        // const {dispatch} = this.props
        // dispatch(fetchAction(api.live, LIVE))
    }

    render() {
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

export default connect()(PC_Live)