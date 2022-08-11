export const omit = (obj: any, ...keys: string[]) => {
  const newObj = { ...obj };

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
};
