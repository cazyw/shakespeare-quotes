const parseErrors = (accumulator, currentValue) => accumulator + `${currentValue.msg}\n`;

export const errorMsg = errors => {
  return errors.reduce(parseErrors, '');
};
