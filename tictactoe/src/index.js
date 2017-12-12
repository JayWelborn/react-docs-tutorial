import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  // Passes value from array 'squares' to Square
  // Passes function to handle click. See handleClick()
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    let board = [];
    for (let i = 0; i < 3; i++){
      let squares = [];
      for (let j = 0; j < 3; j++){
        squares.push(this.renderSquare(3 * i + j))
      }
      board.push(<div key={i} className="board-row">{squares}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  // Sets value of item at point i (defined in renderSquare) in array
  // squares to 'X' if state.xIsNext is true, else 'O'
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Don't let player click square with value,
    // or add value after victory
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    // https://en.wikipedia.org/wiki/%3F:
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step %2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);

    // Generate a list of previous moves
    const moves = history.map((step, move) => {
      const description = move ? 'Go to move #' + move : 'Go to game start';

      // Text of current move button will be bold
      let btnText;
      if (move === this.state.stepNumber){
        btnText = <strong>{description}</strong>
      } else {
        btnText = description
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {btnText}
          </button>
        </li>
      )
    })

    // Display victory message if there's a winner, otherwise
    // Say who's next.
    let status;
    if (winner) {
      status = 'The Winner Is: ' + winner + '!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    }

    // Render Markup
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// Check for victory and declare a winner
function calculateWinner(squares) {

  // Combinations of squares that mean victory
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Iterate through victory arrays checking for squares
  // value equality
  for (let i = 0; i < lines.length; i++){
    const[a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
