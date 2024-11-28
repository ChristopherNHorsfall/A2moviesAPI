function renameKeys(obj, keyMap) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        keyMap[key] || key,
        value
      ])
    );
  }
  
  module.exports = { renameKeys };