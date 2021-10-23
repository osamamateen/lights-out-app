import React, { Component } from "react"
import Cell from "./Cell"
import "./Board.css"

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightsOn: 0.25,
  }
  constructor(props) {
    super(props)
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = []

    for (let y = 0; y < this.props.nRows; y++) {
      const row = []
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(Math.random() < this.props.chanceLightsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLIPPING", coord)
    let { nCols, nRows } = this.props
    let board = this.state.board
    let hasWon = false
    let [y, x] = coord.split("-").map(Number)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x]
      }
    }

    flipCell(y, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)
    flipCell(y - 1, x)
    flipCell(y + 1, x)

    // win when every cell is turned off
    hasWon = board.every((row) => row.every((cell) => !cell))
    this.setState({ board, hasWon })
  }

  /** Render game board or winning message. */

  render() {
    let tblBoard = []
    for (let y = 0; y < this.props.nRows; y++) {
      const row = []
      for (let x = 0; x < this.props.nCols; x++) {
        let coord = `${y}-${x}`
        row.push(
          <Cell
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
            key={coord}
            isLit={this.state.board[y][x]}
          />
        )
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
      <>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <span className="neon-orange">Lights</span>
              <span className="neon-blue">Out</span>
            </div>
            <table className="Board">
              <tbody>{tblBoard}</tbody>
            </table>
          </div>
        )}
      </>
    )
  }
}

export default Board
