export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmptyObject = (obj: object | null | undefined) => {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === '{}';
};
