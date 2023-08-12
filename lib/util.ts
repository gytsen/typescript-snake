export const CLICK = "click";
export const BROWN = "#B62";
const PROTOTYPE = "prototype";
const $reflect = Reflect;
const $reflectGet = $reflect.get;

export const $global = globalThis;
export const $document = $global.document;

const documentPrototype = $reflectGet(Document, PROTOTYPE);
const htmlElementPrototype = $reflectGet(HTMLElement, PROTOTYPE);
const eventTargetPrototype = $reflectGet(EventTarget, PROTOTYPE);

const { bind, call } = $reflectGet(Function, PROTOTYPE);

export const uncurryThis = bind.bind(call);
// save some bytes by storing namespace objects
const $math = Math;
const $array = Array;
const $object = Object;

export const $max = $math.max;
export const $floor = $math.floor;
export const $random = $math.random;
export const $hasOwn = $object.hasOwn;
export const $keys = $object.keys;
export const $isArray = $array.isArray;
export const $arrayFrom = $array.from;

export const wrappingClamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return max;
  } else if (value > max) {
    return min;
  } else {
    return value;
  }
};

export const $querySelector = uncurryThis(documentPrototype.querySelector);
export const $querySelectorAll = uncurryThis(
  documentPrototype.querySelectorAll,
);
export const $getElementById = uncurryThis(documentPrototype.getElementById);
export const $createElement = uncurryThis(documentPrototype.createElement);

export const $setAttribute = uncurryThis(htmlElementPrototype.setAttribute);

export const $addEventListener = uncurryThis(
  eventTargetPrototype.addEventListener,
);
