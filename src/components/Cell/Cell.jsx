import React, { useCallback } from 'react'
import classNames from 'classnames'
import './Cell.css'

export default function Cell (props) {
  const {
    setDestinyCoords,
    setCoordsPieceToMove,
    youCanMoveHere,
    hasPiece,
    cellColor,
    cellCoords
  } = props

  const handleClick = useCallback(() => {
    if (youCanMoveHere) {
      setDestinyCoords(cellCoords)
    } else if (hasPiece) {
      setCoordsPieceToMove(cellCoords)
    }
  }, [youCanMoveHere, hasPiece, setDestinyCoords, setCoordsPieceToMove, cellCoords])

  const cellClass = classNames({
    youCanMoveHere: youCanMoveHere && !hasPiece,
    youCanMoveHereAttack: youCanMoveHere && hasPiece
  })

  return (
    <div onClick={handleClick} className={`cell ${cellColor} ${cellClass}`}>
      {hasPiece && <img src={`./Pieces/${hasPiece}.svg`} alt={hasPiece} />}
    </div>
  )
}
