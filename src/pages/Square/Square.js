
import React from 'react'
import './Square.css'

class Square extends React.Component {

  render() {
    return (
      <button className="square" type="button" onClick={()=>this.props.onClick()} style={{color:this.props.highlight?'#ffbf00':''}}>
        {this.props.value}
      </button>
    )
  }
}
export default Square