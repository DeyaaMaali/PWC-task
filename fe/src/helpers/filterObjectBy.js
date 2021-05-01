export const filterObjectBy = (object, fields) => {
  return Object.keys(object)
    .filter((key) => fields.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};
