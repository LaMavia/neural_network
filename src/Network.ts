import { Neuron } from "./Neuron";
import { Matrix, initEmpty2D } from "./Matrix";
import { getDimensions } from "./helpers/getDimensions";
import { sum as sum_up, sum } from "./helpers/sum";
import { do_log } from "./helpers/log";
import { getErrors } from "./helpers/getErrors";

export interface TariningData {
  input: Matrix
  correct: Matrix
}

export class Network {
  layers: Array2D<Neuron>
  inputs_len: number

  constructor(neurons: Array2D<Neuron>, number_of_inputs: number) {
    this.layers = neurons
    this.inputs_len = number_of_inputs
  }

  get weights() {
    return this.layers.reduce((weights, layer) => {
      weights.push(layer.reduce((ws, neuron) => 
        ws.concat(neuron.weights.data)
      , [] as number[][]))
      return weights
    }, [] as number[][][])
  }

  get biases() {
    return this.layers.reduce((biases, layer) => {
      biases.push(layer.reduce((bs, neuron) => 
        bs.concat(neuron.bias)
      , [] as number[]))
      return biases
    }, [] as number[][])
  }

  feed_forward(input: Matrix) {
    return this.layers.reduce((input, layer) => {
      const d = layer.map(neuron => [neuron.activate(input)])
      return new Matrix(getDimensions(layer), d)
    }, input)
  }

  back_propagation(_error: Matrix) {
    let error = _error
    for(let i = this.layers.length - 2; i > -1; i--) {

      const layer = this.layers[i]
      const next_layer = this.layers[i+1]
      const m = next_layer.length
      for(let j = 0; j < layer.length; j++) {
        const neuron = layer[j]
        let { weights, sum } = next_layer.reduce((acc, n, k) => {
          const w = n.weights.get(0, j)
          acc.weights.push(w * error.get(k, 0))
          acc.sum += w 
          return acc
        }, {weights: [] as number[], sum: 0})

        const weights_error = weights.map(w => w/sum)
        neuron.adjust(new Matrix([1, weights_error.length], weights_error), 0)
        const my_error = sum_up(weights_error) / m
        neuron.last_error = my_error
      }
      error = getErrors(layer)
    }
    // for(let i = this.layers.length-1; i > 0; i--) {
    //   // Apply the error
    //   
    //   // Calculate the next error
    // }
  }

  train(training_data: TariningData[], epochs: number) {
    for(let n = 0; n < epochs; n++) {
      let error = null
      for(const set of training_data) {
        const { input, correct } = set
  
        const output = this.feed_forward(input)
        error = output.sub(correct).map(x => (x**2) / 2)
        this.back_propagation(error)
        // const avg_cost = cost_not_summed.sum_up()/cost_not_summed.length
      }
      console.log(`Current cost: ${sum(error.data.flat(2))/error.length}`)
    }
  }

  cost(output: Matrix, correct_data: Matrix) {
    const cost_not_summed = output.sub(correct_data).map(x => x**2)
    return cost_not_summed.sum_up()/cost_not_summed.length
  }
}
