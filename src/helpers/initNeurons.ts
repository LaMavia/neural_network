import { Neuron } from "../Neuron";

/**
 * [Inputs_length, [, layer_length, ...]
 */
export const initNeurons = (schema: number[]) => {
  const o = [] as Array2D<Neuron>
  schema.forEach((n, i) => {
    if(i === 0) return;
    o.push(new Array(n).fill(0).map(_ => new Neuron(schema[i-1])))
  })
  return o
}