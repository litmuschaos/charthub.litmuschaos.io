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

export const getVersion = function(versions) {
  const setVersion = localStorage.getItem('version');
  if (setVersion !== "" && setVersion !== null) {
    return setVersion
  }
  // returning the latest released version
  return versions[0]
}

export const helpers = {};

export default helpers;
