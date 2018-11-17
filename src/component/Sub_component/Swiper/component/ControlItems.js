import React, {Component} from 'react'

class ControlItems extends Component {

    constructor(props) {
        super(props);
        // this.changeCurrent = this.changeCurrent.bind(this)
    }

    changeCurrent(index) {

    }

    render() {
        const {current, count} = this.props
        let itemsArr = [];
        for(let i = 0; i < count; i ++) {
            let btn = null
            if(i === current) {
                btn =
                    <span key={i.toString()} 
                           style={{background: 'white'}}
                           onClick={()=>alert(i.toString())}></span>
            }else {
                btn =
                    <span key={i.toString()}
                            style={{background: 'rgb(176, 176, 176)'}}
                            onClick={()=>this.props.onChangeCurrent(i)}
                    ></span>
            }
            itemsArr.push(btn)
        }

        return (
            <div className="controls">{itemsArr}</div>
        )
    }
}

export default ControlItems