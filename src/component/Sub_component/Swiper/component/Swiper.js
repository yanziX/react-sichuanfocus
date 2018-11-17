import React, {Component} from 'react'
import ImgSlides from './ImgSlides'
import ControlItems from './ControlItems'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import '../style/Swiper.css'
import { setTimeout } from 'timers';

class Swiper extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            seconds: 5000,
            imgStyles: [
                {visibility: 'visible',
                opacity: '100'}
            ]
        }
    }

    componentDidMount() {
        this.timeInterval = setInterval(() => this.setTimeInterval(), this.state.seconds)
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }
    
    setImgStyles(current) {
        let imageStyles = []
        const {datas} = this.props
        for(let i = 0; i < datas.length; i ++) {
            if(i === current) {
                imageStyles[i] = {
                    visibility: 'visible',
                    opacity: '100'
                }
            }else {
                imageStyles[i] = {
                    visibility: 'hidden',
                    opacity: '0'
                }
            }
        }
        return imageStyles
    }

    handleChange(current) {
        if(this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        // this.state.current = current
        this.setState({
            current: current
        })
        this.timeInterval = setInterval(() => this.setTimeInterval(), this.state.seconds)
    }

    setTimeInterval() {
        let current = (this.state.current + 1) % this.props.datas.length;
        let imgArray = this.setImgStyles(current);
        this.setState({
            current: current,
            imageStyles: imgArray
        })
    }

    render() {
        const {datas} = this.props
        if(datas.length > 0) {
            this.state.imgStyles = this.setImgStyles(this.state.current)
        }
        let content;
        if(this.state.imgStyles.length > 0) {
            content = (
                <div className="swiper">
                    <ImgSlides key="img" imgDatas={datas} 
                                imgArrange={this.state.imgStyles} 
                                current={this.state.current}/>
                    <ControlItems key="contro" current={this.state.current} count={datas.length}
                                onChangeCurrent={(current) => this.handleChange(current)}/>
                 
                 </div>
            )

            
        }else {
            content = (<div></div>)
        }
        return (
            content
        )
    }
}


Swiper.propTypes = {
    onClick: PropTypes.func.isRequired,
    datas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }).isRequired).isRequired
}

const mapStateToProps = state => {
  const datas = state.homeDataList.length > 0 ? state.homeDataList.find(obj => obj.key === "1").value : []
    return {
        datas
    }
}

const mapDispatchToProps = dispatch => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Swiper)