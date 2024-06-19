const modelKeys = (obj: any) => {
  let result = "";

  let isFirstKey = true;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key !== "id") {
      if (!isFirstKey) {
        result += "";
      }
      isFirstKey = false;
      result += `${key}, `;
    }
  }

  // Remove the last comma and space
  result = result.slice(0, -2);

  //   console.log("res", result);

  return result;
};

export default modelKeys;
