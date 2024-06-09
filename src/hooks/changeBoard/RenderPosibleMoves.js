import { calculateMoves } from '../calculateMoves'

const PIECE = 0
const IS_UNDER_ATTACK_OR_YOU_CAN_MOVE_HERE = 1

export function RenderPosibleMoves (coordsPiece, chessBoard, setChessBoard, pieceSelected, coordsPieceToMove, turn, historyMoves) {
  const newBoard = [...chessBoard]

  if (pieceSelected.current !== '') {
    deletePastPossiblesPieceMoves(newBoard)
    if (pieceSelected.current === newBoard[coordsPiece[0]][coordsPiece[1]][PIECE] && compareCoords(coordsPiece, coordsPieceToMove.current)) {
      pieceSelected.current = ''
      setChessBoard(newBoard)
      return
    }
  }

  if (newBoard[coordsPiece[0]][coordsPiece[1]][PIECE][0] !== turn.current) return

  pieceSelected.current = newBoard[coordsPiece[0]][coordsPiece[1]][PIECE]
  updateBoardWithPossibleMoves(newBoard, coordsPiece)
  coordsPieceToMove.current = coordsPiece
  setChessBoard(newBoard)
}

function updateBoardWithPossibleMoves (chessBoard, coordsPieceToMove) {
  const posiblesMoves = calculateMoves(chessBoard, coordsPieceToMove)

  posiblesMoves.forEach(move => {
    const [row, column] = move
    chessBoard[row][column][IS_UNDER_ATTACK_OR_YOU_CAN_MOVE_HERE] = true
  })
}

function compareCoords (coords1, coords2) {
  return coords1[0] === coords2[0] && coords1[1] === coords2[1]
}

function deletePastPossiblesPieceMoves (chessBoard) {
  chessBoard.forEach(row => {
    row.forEach(cell => {
      cell[IS_UNDER_ATTACK_OR_YOU_CAN_MOVE_HERE] = false
    })
  })
}
