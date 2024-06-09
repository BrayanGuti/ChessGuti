// Array of columns
const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

/**
 * Returns the cell name based on the given coordinates.
 * @param {number} row - The row number.
 * @param {number} col - The column number.
 * @return {string} The cell name.
 */
export function getCellNameByCoords (row, col) {
  return `${columns[col]}${8 - row}`
}

/**
 * Returns the attributes of a cell based on its row and column.
 * @param {number} row - The row number.
 * @param {number} col - The column number.
 * @return {Object} The cell attributes.
 */
export function cellAttributes (row, col) {
  const color = (row + col) % 2 === 0 ? 'white' : 'black'

  const attributes = {
    cellName: getCellNameByCoords(8 - row, col),
    cellColor: color,
    cellCoords: [8 - row, col]
  }

  return attributes
}
