import Cell from './Cell'
import { cellAttributes } from '../hooks/cellAttributes'

export default function AllCells ({ chessBoard, setCoordsPieceToMove, setDestinyCoords }) {
  return (
    <section className='board'>
      {chessBoard.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          const { cellColor, cellCoords, cellName } = cellAttributes(8 - rowIndex, colIndex)
          return (
            <Cell
              key={cellName}
              setCoordsPieceToMove={setCoordsPieceToMove}
              setDestinyCoords={setDestinyCoords}
              hasPiece={cell[0]}
              youCanMoveHere={cell[1]}
              cellColor={cellColor}
              cellCoords={cellCoords}
            />
          )
        })
      ))}
    </section>
  )
}
