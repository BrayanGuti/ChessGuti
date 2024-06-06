import { calculateMoves } from './calculateMoves'
import { deletePastPossiblesMoves } from './movePiece'

export function RenderPosibleMoves (coordsPiece, chessBoard, setChessBoard, pieceSelected, coordsPieceToMove, turn, historyMoves) {
  const newBoard = [...chessBoard]

  if (pieceSelected.current !== '') {
    deletePastPossiblesMoves(newBoard)
    console.log([1, 1] === [1, 1
    ])
    if (pieceSelected.current === newBoard[coordsPiece[0]][coordsPiece[1]][0] && coordsPiece === coordsPieceToMove.current) {
      console.log('unselect')
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
