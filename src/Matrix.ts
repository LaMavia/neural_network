import { sigmoid } from "./Neuron";

export const initEmpty2D = (dms: number[]) => {
  const [rows, cols] = dms
  return (new Array<number>(rows)
    .fill(0)
    .map(_ => new Array(cols).fill(0)) as any) as Array2D<number>
}

export const initEmptyMatrix = (dms: number[], mapper?: Mapper) => {
  const m = new Matrix(dms, initEmpty2D(dms))
  if(mapper) return m.map(mapper)
  return m
}

export class Matrix {
  rows: number
  cols: number
  data: Array2D<number>
  constructor(dimensions: number[], data: number[] | Array2D<number>) {
    const [rows, cols] = dimensions
    this.rows = rows
    this.cols = cols
    if (data[0] && Array.isArray(data[0])) {
      this.data = data as any // this._initMatrix(rows, cols, data.flat(2) as number[])
    } else {
      this.data = this._initMatrix(rows, cols, data as number[])
    }
  }

  private _initMatrix(
    rows: number,
    cols: number,
    data: number[]
  ): Array2D<number> {
    const out: Array2D<number> = initEmpty2D([rows, cols])
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) out[r][c] = data[rows * r + c]

    return out
  }

  get(row: number, column: number) {
    return this.data[row][column]
  }

  get dimensions() {
    return [this.rows, this.cols]
  }

  get length() {
    return this.rows * this.cols
  }

  * [Symbol.iterator]() {
    for(const x of this.data) {
      yield x
    }
  }

  add(matrix: Matrix) {
    const arr = initEmpty2D([this.rows, this.cols])
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++)
        arr[r][c] = this.get(r, c) + matrix.get(r, c)
    return new Matrix(this.dimensions, arr)
  }

  sub(matrix: Matrix) {
    const arr = initEmpty2D([this.rows, this.cols])
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++)
        arr[r][c] = this.get(r, c) - matrix.get(r, c)
    return new Matrix(this.dimensions, arr)
  }

  mult(matrix: Matrix | number): Matrix {
    if (typeof matrix === "number") {
      const data = initEmpty2D(this.dimensions)
      for (let r = 0; r < this.rows; r++)
        for (let c = 0; c < this.cols; c++)
          data[r][c] = this.get(r, c) * matrix
      return new Matrix(this.dimensions, data)
    }
    else if (matrix instanceof Matrix) {
      const [rows1, cols1] = this.dimensions
      const [rows2, cols2] = matrix.dimensions
      if (rows1 !== cols2)
        throw new Error(
          `[Matrix:mult]> Invalid matrices: Rows and Columns don't match (${rows1}!=${cols2})`
        )

      const data = initEmpty2D([rows1, cols2])
      for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
          let s = 0
          for (let k = 0; k < cols1; k++) {
            s += this.get(i, k) * matrix.get(k, j)
          }
          data[i][j] = s
        }
      }

      return new Matrix([rows1, cols2], data)
    }
  }

  reverse() {
    return new Matrix(this.dimensions.reverse(), this.data.flat(2))
  }

  sigmoid() {
    const a = this.data.map(r => [sigmoid(r.reduce((acc, x) => acc += x, 0))])
    return a
  }

  sum_up() {
    return this.data.reduce((sum, r) => sum += r.reduce((r_sum, cell) => r_sum += cell, 0), 0)
  }

  map(mapper: Mapper) {
    const arr = initEmpty2D(this.dimensions)
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++)
        arr[r][c] = mapper(this.get(r, c), r, c)
    return new Matrix(this.dimensions, arr)
  }
}
