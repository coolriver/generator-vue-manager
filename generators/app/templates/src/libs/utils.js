export const compareObjects = (o1, o2) => {
  return Object.keys(o1).every((key) => {
    return o1[key] === o2[key];
  }) && Object.keys(o2).every((key) => {
    return o1[key] === o2[key];
  });
};

export const formatObjectPropsToString = (obj = {}) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = `${obj[key]}`;
    return result;
  }, {});
};
