/**
 * 新闻列表项
 */

import React from 'react'
import "../../style/pc_home.css";
import api from '../../config/api'


const imgName = (newsObject, pageType) => {
    switch (pageType) {
        case 'HOME':
        case 'EVENTS':
            return newsObject.newsImage
        case 'LIVE':
            return newsObject.liveImage
        default:
            return ''
    }
}

const newsTitle = (newsObject, pageType) => {
    switch (pageType) {
        case 'HOME':
        case 'EVENTS':
            return newsObject.newsTitle
        case 'LIVE':
            return newsObject.liveTitle
        default:
            return ''
    }
}

const newsTime = (newsObject, pageType) => {
    switch (pageType) {
        case 'HOME':
        case 'EVENTS':
            return newsObject.pubTime
        case 'LIVE':
            return newsObject.liveTime
        default:
            return ''
    }
}


const NewsItem = ({newsObject, pageType}) => (


    <li className="newsListItem">
    
        <div className="newsContent">
            <div className="newsLeft">
                <img className="newsImage" src={api.StaticApi+imgName(newsObject, pageType)}></img>
            </div>
            <div className="newsRight">
                
                <h2 className="right_top">{newsTitle(newsObject, pageType)}</h2>

                 <div className="right_bottom">
                <p className="newsOrigin">来源：四川观察</p>
                <p className="newsTime">{newsTime(newsObject, pageType)}</p>
                </div>
            </div>
        </div>
        
    </li>

)

export default NewsItem