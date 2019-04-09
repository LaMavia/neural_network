import { Network } from "../src/Network";
import { initEmpty2D, initEmptyMatrix } from "../src/Matrix";
import { Neuron } from "../src/Neuron";
import { initNeurons } from "../src/helpers/initNeurons";
import { do_log } from "../src/helpers/log";

describe("Constructor", () => {
  it("works", () => {
    const N_INS = 4
    const neurons = initNeurons([N_INS, 3, 2, 1])
    /*const neurons = new Array(3)
    neurons[0] = new Array(4).fill(0).map(_ => new Neuron(N_INS))
    neurons[1] = new Array(2).fill(0).map(_ => new Neuron(4))
    neurons[2] = new Array(1).fill(0).map(_ => new Neuron(2))*/
    const n = new Network(neurons, N_INS)
    const o = n.feed_forward(initEmptyMatrix([N_INS, 1], Math.random))
    do_log(neurons, o)
  })
}) 