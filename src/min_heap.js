export default class MinHeap {
  constructor (noOfElements) {
    this.noOfElements = noOfElements
    this.heap = []
    this.highscore2C = 0
    this.highscore3C = 0
    this.bestContract2C = null
    this.bestContract3C = null
  }

  getHeap () {
    return [
      this.highscore2C,
      this.bestContract2C,
      this.highscore3C,
      this.bestContract3C
    ]
  }

  add ({ score, contract }) {
    console.log(contract.cost)
    if (contract.cost == 0 && score > this.highscore2C) {
      this.highscore2C = score
      this.bestContract2C = contract
    } else if (contract.cost > 0 && score > this.highscore3C) {
      this.highscore3C = score
      this.bestContract3C = contract
    }
  }
}
