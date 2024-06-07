export function startGame () {
  const Position = [
    ['BR', '', '', '', 'BK', '', '', 'BR'],
    ['', '', '', 'BP', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'WQ', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['WR', '', '', '', 'WK', '', '', 'WR']
  ]

  const initialPosition = Position.map(row => {
    const boardRow = row.map((piece, i) => {
      /**
     * Each cell has four different values:
     * -First Parameter -> piece: The piece occupying the cell.
     * -Second Parameter -> isUnderAttack/YouCanMoveHere: Indicates if the cell is under attack or available to move.
     * -Third Parameter -> isUnderAttackBy: Indicate which pieces are attacking the cell.
     * -Four Parameter -> Represent if the piece that is in there has make its first move or no.
     *
     * The difference between isUnderAttack and isUnderAttackBy is that isUnderAttackBy
     * is for the next move, while isUnderAttack is for the current move this is important to
     * check to make sure if a king can move to that cell.
     *
     * The second parameter is consider as YouCanMoveHere when the first parameter is empty,
     * indicating that the cell is empty and can be moved to.
     * The same second parameter is considered as isUnderAttack when the first parameter has a piece.
     */

      if (piece === '') return [piece, false, [], true]

      return [piece, false, [], false]
    })
    return boardRow
  })

  return initialPosition
}
