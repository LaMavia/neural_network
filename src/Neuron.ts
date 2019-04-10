import { Matrix, initEmpty2D, initEmptyMatrix } from "./Matrix";
import { getDimensions } from "./helpers/getDimensions";
import { sum } from "./helpers/sum";

export class Neuron {
  bias: number
  inputs_len: number
  weights: Matrix
  last_output: number = null
  last_error: number = null

  constructor(inputs: number) {
    this.bias = Math.random()
    this.inputs_len = inputs
    this.weights = initEmptyMatrix([1, inputs], Math.random)
  }

  activate(_inputs: Matrix | Array2D<number> | number[]) {
    const inputs = _inputs instanceof Matrix 
      ? _inputs
      : new Matrix(getDimensions(_inputs), _inputs)
    const o = this.weights
      .mult(inputs)
      .data
      .flat(2)
      .reduce((acc, x, i) => acc += x, this.bias)
    const out = sigmoid(o)
    this.last_output = out
    return out
  }

  adjust(weights_error: Matrix, bias_error: number) {
    this.weights = this.weights.map((x, r, c) => ((x - weights_error.get(r, c)) ** 2) / 2)
    this.bias -= bias_error
  }

  train(error: Matrix) {
    
  }
}


export function sigmoid(x: number) {
  return 1/(1+Math.E**(-1*x))
}

export function randomData(n: number): Matrix[] {
  const weights = initEmpty2D([1, n])
  weights[0] = weights[0].map(_ => Math.random())

  const inputs = initEmpty2D([n, 1]).map(x => {
    x[0] = Math.random()
    return x
  })

  return [
    new Matrix([1, n], weights),
    new Matrix([n, 1], inputs)
  ]
}