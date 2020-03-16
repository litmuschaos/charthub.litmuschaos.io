export const keysToCamel = function(o) {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n = {};

    Object.keys(o).forEach(k => {
      n[k.charAt(0).toLowerCase() + k.slice(1)] = keysToCamel(o[k]);
    });

    return n;
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const helpers = {};

export default helpers;
