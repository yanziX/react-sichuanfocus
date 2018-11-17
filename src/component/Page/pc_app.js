import React, {Component} from 'react'
import '../../style/pc_style.css'
import pc_home from './pc_home'
import pc_live from './pc_live'
import pc_events from './pc_events'
import pc_special from './pc_special'
import pc_hotNews from './pc_hotNews'
import pc_lianzhengTianfu from './pc_lianzhengTianfu'
import pc_sichuanAnjian from './pc_sichuanAnjian'
import pc_tianyuanSichuan from './pc_tianyuanSichuan'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'

export default class PCApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        }
        this.setCurrentIndex = this.setCurrentIndex.bind(this)
    }

    setCurrentIndex(event) {
        this.setState({
            currentIndex: parseInt(event.currentTarget.getAttribute('index'), 10)
        })
        
    }

    render() {
        let arr = ['精选', '时讯', '直播', '热点', '四川安监', '廉政天府', '田园四川'];
        let pathArr = ['/', '/events', '/live', '/hotNews', '/anjian', '/lianzhengTianfu', '/tianyuanSichuan']
        let itemList = [];
        for (let i = 0; i < arr.length; i++) {
            itemList.push(<li>
                <Link to={pathArr[i]} 
                      className={this.state.currentIndex === i ? "navbarlinkActive" : "navbarlink"}
                      index={i}
                      onClick={this.setCurrentIndex}>
                          {arr[i]}
                </Link>
            </li>)
        }
        return (
            <div>
                <Router>
                    <div>
                        <ul className="navigationbar">
                            {itemList}
                         </ul>
                        <Route  exact path='/' component={pc_home} />
                        <Route path='/events' component={pc_events} />
                        <Route path='/live' component={pc_live} />
                        <Route path='/special' component={pc_special} />
                        <Route path='/hotNews' component={pc_hotNews} />
                        <Route path='/anjian' component={pc_sichuanAnjian}/>
                        <Route path='/lianzhengTianfu' component={pc_lianzhengTianfu} />
                        <Route path='/tianyuanSichuan' component={pc_tianyuanSichuan} />
                    </div>
                </Router>    
            </div>
        )
    }
}