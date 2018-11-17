import React, { Component } from 'react';
import PCApp from './component/Page/pc_app'
import PC_Mine from './component/Page/pc_mine'
import MediaQuery from 'react-responsive'
import {Switch, Route, BrowserRouter as Router, Link} from 'react-router-dom';

import './style/pc_style.css'

class App extends Component {

  constructor(props) {
      super(props)
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

    let arr = ['精选', '我的']
    let pathArr = ['/', '/mine']
    let itemArr = []
    for (let i = 0; i < arr.length; i ++) {
        itemArr.push(
            <li>
                <Link to={pathArr[i]} index={i}
                    className={this.state.currentIndex === i ? "tabbarlinkActive" : "tabbarlink"}
                    onClick={this.setCurrentIndex}
                >{arr[i]}</Link>
            </li>
        )
    }

    return (
      <Router>
        <div>
            {/* 打开注释，就是区分屏幕大小，选择电脑端还是手机端 */}
        
          {/* <MediaQuery query='(min-device-width:1224px)'> */}
            <ul className="tabbar">
            {itemArr}
                {/* <li><Link to='/' className="tabbarlink">精选</Link></li>
                <li><Link to='/mine' className="tabbarlink">我的</Link></li> */}
            </ul>
            <Route exact path='/' component={PCApp} />
            <Route path='/mine' component={PC_Mine}/>
          {/* </MediaQuery> */}

          {/* <MediaQuery query='(max-device-width:1224px)'>
              <Route path="/" component={MobileApp}></Route>
          </MediaQuery> */}
        </div>
      </Router>
    );
  }
}

export default App;
