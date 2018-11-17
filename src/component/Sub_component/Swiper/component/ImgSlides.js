import React, { Component } from 'react'
import SwiperItem from './SwiperItem'
import PropTypes from 'prop-types'
import "../style/Swiper.css";
import api from '../../../../config/api';

export default class ImgSlides extends Component {

    static propTypes = {
        imgArrange: PropTypes.array
    }

    render() {

        const {imgDatas, imgArrange, onClick} = this.props

        let imageArr = []
        for(let i = 0; i < imgDatas.length; i++) {
            let imgObj = imgDatas[i];
            let imgContent = (
                <div className="swiperItem">
                    <img className="swiperimg" key={i.toString()} 
                        src={api.StaticApi + imgObj.newsImage} 
                        alt={imgObj.newsTitle} 
                        style={imgArrange[i]}/>
                    <p className="swiperTitle" style={imgArrange[i]}>{imgObj.newsTitle}</p>
                </div>
            )
                
            imageArr.push(imgContent)
        }
        return (
            <div className="imgs">
                {imageArr}
            </div>
        )
    }
    
}
