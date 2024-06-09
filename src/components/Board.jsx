import '../App.css'
import AllCells from './AllCells'
import { useRef, useState } from 'react'
import { startGame } from '../hooks/startGame'
import { RenderPosibleMoves } from '../hooks/RenderPosibleMoves'
import { movePiece } from '../hooks/movePiece'

export default function Board () {
  const [chessBoard, setChessBoard] = useState(startGame())
  const historyMoves = useRef([])
  const coordsPieceToMove = useRef('')
  const pieceSelected = useRef('')
  const turn = useRef('W')

  // Shows the possible moves of the piece on the board

  function callRenderPosibleMoves (coordsPiece) {
    RenderPosibleMoves(
      coordsPiece,
      chessBoard,
      setChessBoard,
      pieceSelected,
      coordsPieceToMove,
      turn,
      historyMoves
    )
  }

  // Makes the move of the piece on the board
  function callMoveToDestinyCoords (destinyCoords) {
    movePiece(
      destinyCoords,
      chessBoard,
      setChessBoard,
      coordsPieceToMove,
      pieceSelected,
      turn
    )
  }

  return (
    <>
      <main>
        <AllCells
          chessBoard={chessBoard}
          setCoordsPieceToMove={callRenderPosibleMoves}
          setDestinyCoords={callMoveToDestinyCoords}
        />
        <section>
          <h2>Posiciones Jugadas</h2>
          <ul>
            {historyMoves.current.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
