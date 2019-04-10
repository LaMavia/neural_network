import { Neuron } from "../Neuron";
import { Matrix } from "../Matrix";

export const getErrors = (layer: Neuron[]) => new Matrix([layer.length, 1], layer.map(n => n.last_error))