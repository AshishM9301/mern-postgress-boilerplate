const modelString = (obj: any) => {
  let result = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += `${key} ${obj[key]}, `;
    }
  }
  // Remove the last comma and space
  result = result.slice(0, -2);

  //   console.log("res", result);

  return result;
};

export default modelString;
