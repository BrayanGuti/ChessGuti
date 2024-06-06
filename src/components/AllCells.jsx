import Cell from './Cell'
import { cellAtributtes } from '../hooks/cellAtributtes'
export default function AllCells ({ chessBoard, setCoordsPieceToMove, setDestinyCoords }) {
  return (
    <section className='board'>
      {chessBoard.map((row, rowNumber) => (
        row.map((cell, columnNumber) => {
          const { cellColor, cellCoords, cellName } = cellAtributtes(8 - rowNumber, columnNumber)
          return (
            <Cell
              setCoordsPieceToMove={setCoordsPieceToMove}
              setDestinyCoords={setDestinyCoords}
              hasPiece={cell[0]}
              youCanMoveHere={cell[1]}
              cellColor={cellColor}
              cellCoords={cellCoords}
              key={cellName}
            />
          )
        })
      ))}
    </section>
  )
}
