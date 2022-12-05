const global = globalThis;
const documentAlias = global.document;

const { bind, call } = Function.prototype;

const uncurryThis = bind.bind(call);
const math = Math;

const max = math.max;
const floor = math.floor;
const random = math.random;

const querySelector = uncurryThis(documentAlias.querySelector);
const querySelectorAll = uncurryThis(documentAlias.querySelectorAll);
const getElementById = uncurryThis(documentAlias.getElementById);
const addEventListener = uncurryThis(global.addEventListener);

export {
  max,
  floor,
  random,
  querySelector,
  querySelectorAll,
  getElementById,
  addEventListener,
  documentAlias,
  global,
};
