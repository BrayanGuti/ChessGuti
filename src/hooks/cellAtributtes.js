export function cellAtributtes (row, col) {
  const color = (row + col) % 2 === 0 ? 'white' : 'black'

  const attributes = {
    cellName: getCellNameByCoords(8 - row, col),
    cellColor: color,
    cellCoords: [8 - row, col]
  }
  return attributes
}

export function getCellNameByCoords (row, col) {
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  return `${columns[col]}${8 - row}`
}
