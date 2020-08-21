module.exports = (
  zFuncName,
  { includeRequestObj = true, includeSerializable = true } = {}
) => {
  // can use ZFunctions.NoStrings<this> to "fix" serializablefunc, but using it everywhere might make them unreachable
  return [
    `ZFunctions.${zFuncName}`,
    includeRequestObj && 'RequestObj',
    includeSerializable && 'SerializableFunction',
  ]
    .filter(Boolean)
    .join(' | ');
};
