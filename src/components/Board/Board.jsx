import './Board.css'
import Cell from '../Cell/Cell'

import { useRef, useState } from 'react'
import { startGame } from '../../hooks/startingBoard/startGame'
import { RenderPosibleMoves } from '../../hooks/changeBoard/RenderPosibleMoves'
import { movePiece } from '../../hooks/changeBoard/movePiece'
import { cellAttributes } from '../../hooks/startingBoard/cellAttributes'

export default function Board () {
  const [chessBoard, setChessBoard] = useState(startGame())
  const historyMoves = useRef([])
  const coordsPieceToMove = useRef('')
  const pieceSelected = useRef('')
  const turn = useRef('W')

  // Shows the possible moves of the piece on the board

  function callRenderPosibleMoves (coordsPiece) {
    RenderPosibleMoves(coordsPiece, chessBoard, setChessBoard, pieceSelected, coordsPieceToMove, turn, historyMoves)
  }

  // Makes the move of the piece on the board
  function callMoveToDestinyCoords (destinyCoords) {
    movePiece(destinyCoords, chessBoard, setChessBoard, coordsPieceToMove, pieceSelected, turn)
  }

  return (
    <>
      <section className='Chess-Board'>
        {chessBoard.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const { cellColor, cellCoords, cellName } = cellAttributes(8 - rowIndex, colIndex)
            return (
              <Cell
                key={cellName}
                setCoordsPieceToMove={callRenderPosibleMoves}
                setDestinyCoords={callMoveToDestinyCoords}
                hasPiece={cell[0]}
                youCanMoveHere={cell[1]}
                cellColor={cellColor}
                cellCoords={cellCoords}
              />
            )
          })
        ))}
      </section>
    </>
  )
}
