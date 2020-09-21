/* eslint-disable import/prefer-default-export */
const intFormatter = (num: any) => {
  const numberToFormat = num.toFixed(2);
  const parts = numberToFormat.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₱ ${parts.join(".")}`;
}

export { intFormatter };
