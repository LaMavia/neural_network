import { Neuron, randomData } from "../src/Neuron";
import { initEmptyMatrix } from "../src/Matrix";
import { do_log } from "../src/helpers/log";

describe("Activation", () => {
  it("Works", () => {
    const n = new Neuron(5)
    const i = initEmptyMatrix([5, 1], Math.random)
    const out = n.activate(i)
    expect(out).toBeLessThan(1)
  })
})