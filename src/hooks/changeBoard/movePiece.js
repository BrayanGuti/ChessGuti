import { calulateFutureMoves } from '../calculateMoves'

export function movePiece (destinyCoords, chessBoard, setChessBoard, coordsPieceToMove, pieceSelected, turn) {
  const newBoard = [...chessBoard]
  const [castling, rookColumn] = isCastling(coordsPieceToMove.current, destinyCoords, chessBoard)

  if (castling) {
    moveCastleRook(rookColumn, destinyCoords, newBoard, turn.current)
  }

  coronation(newBoard, destinyCoords, turn, pieceSelected)

  const sourceCoords = coordsPieceToMove.current
  const pieceToMove = chessBoard[sourceCoords[0]][sourceCoords[1]][0]

  newBoard[destinyCoords[0]][destinyCoords[1]][0] = pieceToMove

  newBoard[sourceCoords[0]][sourceCoords[1]][0] = ''

  pieceSelected.current = ''
  deletePastPossiblesMoves(newBoard)
  updateCellsUnderAttack(newBoard)
  eliminateFirstMove(newBoard, sourceCoords)
  turn.current = turn.current === 'W' ? 'B' : 'W'
  setChessBoard(newBoard)
}

function deletePastPossiblesMoves (chessBoard) {
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
      if (newBoard[row][col][0][1] === 'K' && newBoard[row][col][0][0] !== piece[0]) {
        console.log('CHECK') // CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
      }
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

function isCastling (KingCoords, destinyCoords, chessBoard) {
  if (chessBoard[KingCoords[0]][KingCoords[1]][0][1] === 'K' && (KingCoords[0] === 0 || KingCoords[0] === 7) && KingCoords[1] === 4) {
    if (destinyCoords[0] === KingCoords[0]) {
      if (destinyCoords[1] === 2) {
        return [true, 0]
      } else if (destinyCoords[1] === 6) {
        return [true, 7]
      }
    }
  }
  return [false, null]
}

function moveCastleRook (rookColumn, destinyCoords, chessBoard, turn) {
  const row = destinyCoords[0]
  const column = rookColumn

  const direction = destinyCoords[1] === 2 ? 1 : -1

  console.log('direction', direction)
  const newColumn = destinyCoords[1] + direction

  chessBoard[row][column][0] = ''
  chessBoard[row][column][3] = true
  chessBoard[row][newColumn][0] = `${turn}R`
}

function coronation (chessBoard, destinyCoords, turn, pieceSelected) {
  const coronationRow = turn.current === 'W' ? 0 : 7

  if (pieceSelected.current[1] === 'P' && destinyCoords[0] === coronationRow) {
    console.log('CORONATION')
  }
}
