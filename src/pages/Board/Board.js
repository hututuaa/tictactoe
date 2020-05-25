
import React from 'react'
import Square from '../Square/Square'


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} highlight={this.props.line.includes(i)} key={i} />  /* 将value和事件以props形式传入子组件 */
    )
  }

  render() {

    return (
      <div className="borard">
        {
          Array(3).fill(null).map((itemx, x) => (
            <div className="board-row" key={x + itemx}>
              {
                Array(3).fill(null).map((itemy, y) => (
                  this.renderSquare(3 * x + y)
                  
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}



export default Board