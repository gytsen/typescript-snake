export const global = globalThis;
export const documentAlias = global.document;

const { bind, call } = Function.prototype;

export const uncurryThis = bind.bind(call);
export const math = Math;

export const max = math.max;
export const floor = math.floor;
export const random = math.random;

export const querySelector = uncurryThis(documentAlias.querySelector);
export const querySelectorAll = uncurryThis(documentAlias.querySelectorAll);
export const getElementById = uncurryThis(documentAlias.getElementById);
export const addEventListener = uncurryThis(global.addEventListener);
