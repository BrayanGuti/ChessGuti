import { calulateFutureMoves } from './calculateMoves'

export function movePiece (destinyCoords, chessBoard, setChessBoard, coordsPieceToMove, pieceSelected, turn) {
  const sourceCoords = coordsPieceToMove.current
  const pieceToMove = chessBoard[sourceCoords[0]][sourceCoords[1]][0]

  const newBoard = [...chessBoard]

  newBoard[destinyCoords[0]][destinyCoords[1]][0] = pieceToMove

  newBoard[sourceCoords[0]][sourceCoords[1]][0] = ''

  pieceSelected.current = ''
  deletePastPossiblesMoves(newBoard)
  updateCellsUnderAttack(newBoard)
  eliminateFirstMove(newBoard, sourceCoords)
  turn.current = turn.current === 'W' ? 'B' : 'W'
  setChessBoard(newBoard)
}

export function deletePastPossiblesMoves (chessBoard) {
  chessBoard.forEach(row => {
    row.forEach(cell => {
      cell[1] = false
      cell[2] = []
    })
  })
}

function updateCellsUnderAttack (newBoard) {
  const cellsUnderAttack = watchCellsUnderAttack(newBoard)

  cellsUnderAttack.forEach(([piece, ...cells]) => {
    cells.forEach(([row, col]) => {
      newBoard[row][col][2].push(piece)
    })
  })
}

function watchCellsUnderAttack (newBoard) {
  const cellsUnderAttack = []

  newBoard.forEach((row, rowNumber) => {
    row.forEach((cell, columnNumber) => {
      if (cell === '') return

      const piece = cell[0]
      const moves = calulateFutureMoves(newBoard, [rowNumber, columnNumber])
      if (moves.length > 0) {
        cellsUnderAttack.push([piece, ...moves])
      }
    })
  })

  return cellsUnderAttack
}

function eliminateFirstMove (chessBoard, sourceCoords) {
  if (chessBoard[sourceCoords[0]][sourceCoords[1]][3] === false) {
    chessBoard[sourceCoords[0]][sourceCoords[1]][3] = true
  }
}
