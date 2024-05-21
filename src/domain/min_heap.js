/**
 * Modified minheap dependency
 * Not actuall a minheap anymore...
 */
export default class MinHeap {
  constructor (noOfElements) {
    this.noOfElements = noOfElements
    this.heap = []
    this.highscore = 0
    this.bestContract = null
  }

  getHeap () {
    return [{score: this.highscore,
      contract: this.bestContract,}]
  }

  add ({ score, contract }) {
    if(score > this.highscore){
      this.highscore = score
      this.bestContract = contract
    }
  }
}
