// trim leading slash, remove trailing schema
// used by core to generate the eventual type names
module.exports = (schema) => schema.title || schema.id.slice(1, -6);
