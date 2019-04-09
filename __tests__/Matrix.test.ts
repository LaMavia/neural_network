import { Matrix } from "../src/Matrix";

describe("Constructor", () => {
  it("Accepts number[]", () => {
    const m = new Matrix([2, 2], [1,2,3,4])
    expect(m.data).toEqual([[1,2], [3,4]])
  })

  it("Accepts Array2D<number>", () => {
    const m = new Matrix([2, 2], [[1,2], [3,4]])
    expect(m.data).toEqual([[1,2], [3,4]])
  })
})

describe("Multiplication", () => {
  it("Works", () => {
    expect(
      new Matrix([2, 2], [[1,2], [3,4]])
      .mult(new Matrix([2, 2], [[5,6], [7,8]]))
      .data
    )
    .toEqual([[19, 22], [43, 50]])

    expect(
      new Matrix([2, 3], [[1,2,1], [3,4,1]])
      .mult(new Matrix([3, 2], [[5,6], [7,8], [1,1]]))
      .data
    )
    .toEqual([[20, 23], [44, 51]])
  })

  it("Doesn't mutate", () => {
    const m1 = new Matrix([2,2], [[1,2], [3,4]])
    const m2 = new Matrix([2,2], [[5,6], [7,8]])

    m1.mult(m2)
    expect(m1.data).toEqual([[1,2], [3,4]])
    expect(m2.data).toEqual([[5,6], [7,8]])
  })
})