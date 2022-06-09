export const getFormattedNumber = (
  value: string | number | undefined | null,
) => {
  let _output = value;

  if (_output === null || typeof _output === "undefined") {
    return "???";
  }

  if (typeof _output === "string") {
    _output = Number(value);
  }

  if (_output === NaN) {
    return value;
  }

  return _output.toFixed(2);
};
