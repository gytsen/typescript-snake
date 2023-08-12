export const CLICK = "click";
export const BROWN = "#B62";

export const global = globalThis;
export const documentAlias = global.document;

const documentPrototype = Document.prototype;
const htmlElementPrototype = HTMLElement.prototype;
const eventTargetPrototype = EventTarget.prototype;

const { bind, call } = Function.prototype;

export const uncurryThis = bind.bind(call);
// save some bytes by storing namespace objects
const math = Math;
const object = Object;

export const max = math.max;
export const floor = math.floor;
export const random = math.random;
export const hasOwn = object.hasOwn;
export const getOwnPropertyNames = object.getOwnPropertyNames;

export const querySelector = uncurryThis(documentPrototype.querySelector);
export const querySelectorAll = uncurryThis(documentPrototype.querySelectorAll);
export const getElementById = uncurryThis(documentPrototype.getElementById);
export const createElement = uncurryThis(documentPrototype.createElement);

export const setAttribute = uncurryThis(htmlElementPrototype.setAttribute);

export const addEventListener = uncurryThis(
  eventTargetPrototype.addEventListener,
);
