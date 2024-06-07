import { calculateMoves } from './calculateMoves'

export function RenderPosibleMoves (coordsPiece, chessBoard, setChessBoard, pieceSelected, coordsPieceToMove, turn, historyMoves) {
  const newBoard = [...chessBoard]

  if (pieceSelected.current !== '') {
    deletePastPossiblesPieceMoves(newBoard, true)
    if (pieceSelected.current === newBoard[coordsPiece[0]][coordsPiece[1]][0] && compareCoords(coordsPiece, coordsPieceToMove.current)) {
      pieceSelected.current = ''
      setChessBoard(newBoard)
      return
    }
  }

  if (newBoard[coordsPiece[0]][coordsPiece[1]][0][0] !== turn.current) return

  pieceSelected.current = newBoard[coordsPiece[0]][coordsPiece[1]][0]
  updateBoardWithPossibleMoves(newBoard, coordsPiece)
  coordsPieceToMove.current = coordsPiece
  setChessBoard(newBoard)
}

function updateBoardWithPossibleMoves (chessBoard, coordsPieceToMove) {
  const posiblesMoves = calculateMoves(chessBoard, coordsPieceToMove)

  posiblesMoves.forEach(move => {
    const [row, column] = move
    chessBoard[row][column][1] = true
  })
}

function compareCoords (coords1, coords2) {
  return coords1[0] === coords2[0] && coords1[1] === coords2[1]
}

function deletePastPossiblesPieceMoves (chessBoard) {
  chessBoard.forEach(row => {
    row.forEach(cell => {
      cell[1] = false
    })
  })
}
