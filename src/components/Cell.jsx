import '../App.css'

export default function Cell ({ setDestinyCoords, setCoordsPieceToMove, youCanMoveHere, hasPiece, cellColor, cellCoords }) {
  const handleClick = () => {
    if (youCanMoveHere) {
      setDestinyCoords(cellCoords)
    } else if (hasPiece) {
      setCoordsPieceToMove(cellCoords)
    }
  }

  let cellClass = ''

  if (youCanMoveHere === true) {
    cellClass = hasPiece === '' ? 'youCanMoveHere' : 'youCanMoveHereAttack'
  }

  return (
    <div onClick={handleClick} className={`cell ${cellColor} ${cellClass}`}>
      {
        hasPiece !== '' && <img src={`./Pieces/${hasPiece}.svg`} alt={hasPiece} />
      }
    </div>
  )
}
