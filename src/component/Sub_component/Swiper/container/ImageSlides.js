import {connect} from 'react-dedux'
import Swiper from '../component/Swiper'

const getSlidersData = () => {

    let imageData = []

    fetch('../data/data.json')
    .then((res) => res.json())
    .then((jsonData) => {
        imageData = jsonData
    })
    return imageData
}

const mapStateToProps = state => ({
    datas: getSlidersData()
})

const mapDispatchToProps = dispatch => ({
    // onClick: id => dispatch()
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Swiper)