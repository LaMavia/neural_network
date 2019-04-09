import { Neuron } from "./Neuron";
import { Matrix, initEmpty2D } from "./Matrix";
import { getDimensions } from "./helpers/getDimensions";

export class Network {
  layers: Array2D<Neuron>
  inputs_len: number

  constructor(neurons: Array2D<Neuron>, number_of_inputs: number) {
    this.layers = neurons
    this.inputs_len = number_of_inputs
  }

  feed_forward(input: Matrix) {
    return this.layers.reduce((input, layer) => {
      const d = layer.map(x => [x.activate(input)])
      return new Matrix(getDimensions(layer), d)
    }, input)  
    
  }
}
