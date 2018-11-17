import React from 'react'
import '../../style/pc_home.css'
import {fetchAction, fetchChangePageType} from '../../actions'
import {connect} from 'react-redux'
import {HOME} from '../../constants/ActionTypes'
import NewsList from '../View/NewsList';
import Swiper from '../Sub_component/Swiper/component/Swiper'

var isFirstLoad = false

class pc_home extends React.Component {

 
    componentDidMount() {
        const {dispatch} = this.props
            dispatch(fetchChangePageType(HOME))
        if(!isFirstLoad) {
            isFirstLoad = true 
            dispatch(fetchAction('http://kscgc.sctv.com/sctv/jingxuan/index/jingxuan.json', HOME))
        }
        
    }

    componentWillReceiveProps(nextProps) {
        // const {lists} = this.props
    }

    render() {
        const {homeDataList, homeDateNewsList} = this.props
        return (
            <div className="content">
                <div className="leftContent">
                    <Swiper />
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
    const {homeDataList, homeDateNewsList} = state
    return {
        homeDataList, homeDateNewsList
    }
}

//有这个以后，const {dispatch} = this.props中dispatch才有值
export default connect(mapStateToProps)(pc_home)