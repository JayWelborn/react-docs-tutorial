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

  // Fills an array with null values to represent the squares
  constructor(props){
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // Sets value of item at point i (defined in renderSquare) in array
  // squares to 'X' if state.xIsNext is true, else 'O'
  handleClick(i){
    const squares = this.state.squares.slice();

    if (!squares[i]){
      // https://en.wikipedia.org/wiki/%3F:
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  // Passes value from array 'squares' to Square
  // Passes function to handle click. See handleClick()
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    // Display victory message if there's a winner, otherwise
    // Say who's next.
    if (winner) {
      status = 'The Winner Is: ' + winner + '!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Check for victory and declare a winner
function calculateWinner(squares) {

  console.log('Checking for Victory')

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
