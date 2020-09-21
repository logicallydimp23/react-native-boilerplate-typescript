/* eslint-disable import/prefer-default-export */
const capitalize = (str: any) => {
  if (str) {
    const strArray = str.toString().split(" ");
    let updateStr = "";

    strArray.forEach((text: any) => {
      const k = `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`
      updateStr = `${updateStr} ${k}`;
    })

    return updateStr.trim();
  }

  return null
}

export { capitalize };
