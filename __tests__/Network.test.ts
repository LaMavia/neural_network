import { Network } from "../src/Network";
import { initEmptyMatrix } from "../src/Matrix";
import { initNeurons } from "../src/helpers/initNeurons";
import { do_log } from "../src/helpers/log";

describe("Constructor", () => {
  it("works", () => {
    const N_INS = 4
    const neurons = initNeurons([N_INS, 3, 2, 1])
    const n = new Network(neurons, N_INS)
    const o = n.feed_forward(initEmptyMatrix([N_INS, 1], Math.random))
    do_log(o)
  })

  it("Weights", () => {
    const n = new Network(initNeurons([2, 4, 2]), 2)
    do_log(n.weights)
    expect(n.weights).toBeInstanceOf(Array)
  }) 

  it("Biases", () => {
    const n = new Network(initNeurons([2, 4, 2]), 2)
    do_log(n.biases)
    expect(n.biases).toBeInstanceOf(Array)
  })

  it("Cost", () => {
    const n = new Network(initNeurons([2, 4, 2]), 2)
    const out = n.feed_forward(initEmptyMatrix([2, 1], Math.random))
    const cost = n.cost(out, initEmptyMatrix([2, 1], Math.random))
    do_log(cost)
    expect(cost).toBeLessThan(1)
  })

  it("Backpropagation", () => { 
    const n = new Network(initNeurons([2, 4, 2]), 2)
    n.train([
      {
        correct: initEmptyMatrix([2, 1], Math.random),
        input: initEmptyMatrix([2, 1], Math.random)
      }
    ], 20000)
  })
}) 