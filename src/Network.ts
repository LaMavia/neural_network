import { Neuron } from "./Neuron";
import { Matrix, initEmpty2D } from "./Matrix";
import { getDimensions } from "./helpers/getDimensions";

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

  train(training_data: TariningData[]) {
    for(const set of training_data) {
      const { input, correct } = set

      const output = this.feed_forward(input)
      const cost_not_summed = output.sub(correct).map(x => x**2)
      const avg_cost = cost_not_summed.sum_up()/cost_not_summed.length

    }
  }

  cost(output: Matrix, correct_data: Matrix) {
    const cost_not_summed = output.sub(correct_data).map(x => x**2)
    return cost_not_summed.sum_up()/cost_not_summed.length
  }
}
