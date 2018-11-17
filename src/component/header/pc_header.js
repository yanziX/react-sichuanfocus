import React from 'react'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import pc_events from '../Page/pc_events'
import pc_live from '../Page/pc_live'
import pc_special from '../Page/pc_special'


export default class PC_Header extends React.Component {
    render() {
        return (
            <Router>
                <div>
                     <ul>
                        <li><Link to="/">精选</Link></li>
                        <li><Link to='/events'>时讯</Link></li>
                        <li><Link to='/live'>直播</Link></li>
                        <li><Link to='/special'>专题</Link></li>
                    </ul>
                    {/* <Route path='/events' component={pc_events} />
                    <Route path='/live' component={pc_live} />
                    <Route path='/special' component={pc_special}></Route> */}
                </div>
            </Router>    
        )
    }
}