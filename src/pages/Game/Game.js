import React from 'react'
import Board from '../Board/Board'
import './Game.css'


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return squares[a];
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  // return null;
  return { winner: null, line: [] };
}




class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      position: [{
        row: null,
        column: null,
      }],
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const position = this.state.position.slice(0, this.state.stepNumber + 1);
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const row = parseInt(i % 3 + 1, 10);
    const column = parseInt(i / 3 + 1, 10);
    this.setState(prev => ({
      history: history.concat([
        {
          squares
        }
      ]),
      position: position.concat([{
        row,
        column,
      }]),
      stepNumber: history.length,
      xIsNext: !prev.xIsNext
    }))
  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,

    });
    if (step === 0) {
      this.setState({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      });
    }

  }

  changeSquence() {
    this.setState(prev => ({ sort: !prev.sort }))
  }

  render() {
    const { history, position } = this.state;
    const current = history[this.state.stepNumber];
    const { winner, line } = calculateWinner(current.squares);
    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} - 落棋点：(${position[move].row},${position[move].column})` :
        'go to start';
      const font = (move === this.state.stepNumber) ?
        { fontWeight: 'bold' } :
        { fontWeight: 'normal' };
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} type="button" style={font}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Game Over -- Winner: ${winner}`;
    } else if (this.state.stepNumber === 9) {
      status = 'Game Over -- NO Winner'
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (


      <div className="game">
        <h1 style={{ textAlign: 'center',display:'inline-block',width:'100%',height:'80px',lineHeight:'80px' }}>井字棋游戏</h1>
        <div className="game-content">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              line={line}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.changeSquence()} type='button' style={{ width: '80px', outline: 'none', border: 'none', background: '#5a5a5a', color: 'white', cursor: 'pointer' }}>{this.state.sort ? "倒序" : "正序"}</button>
            <ol>{this.state.sort ? moves : moves.reverse()}</ol>
          </div>
        </div>
      </div>

    );
  }
}

export default Game