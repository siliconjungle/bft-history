import * as bftHistory from './bft-history.js'

const history = bftHistory.create()

let latestHash = null
let currentHash = null
let currentValue = 50
currentHash = bftHistory.getHash(currentValue)
bftHistory.insert(history, latestHash, currentHash)
latestHash = currentHash

const value2 = 25
currentHash = bftHistory.getHash(value2)
if (bftHistory.shouldInsert(history, latestHash, currentHash)) {
  bftHistory.insert(history, latestHash, currentHash)
  if (bftHistory.shouldReplace(history, latestHash, currentHash)) {
    currentValue = value2
    latestHash = currentHash
  }
}

console.log('_CURRENT_VALUE_', currentValue)
console.log('_HISTORY_', history)
