import hash from 'object-hash'

// Byzantine fault-tolerance is fixed if you store a history of hashes.
export const create = () => ({})

// Depth is not necessary to store here, it is calculated per client as the changes are merged in.
// It's just to avoid needing to go all the way up the tree until the root to count the depth for merging.
export const insert = (history, parentHash, hash) => {
  const depth = history[parentHash] ? history[parentHash][1] + 1 : 0
  history[hash] = [parentHash, depth]
}

export const shouldInsert = (history, parentHash, hash) =>
  parentHash === null ||
  (history[parentHash] !== undefined && history[hash] === undefined)

export const shouldReplace = (history, existingHash, hash) => {
  const [_, existingDepth] = history[existingHash]
  const [_1, depth] = history[hash]
  return (
    depth > existingDepth || (depth === existingDepth && hash > existingHash)
  )
}

export const getHash = (data) => hash(data)
