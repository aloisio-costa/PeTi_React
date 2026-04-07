function getError(data, response) {
  var errorObject = data[Object.keys(data)[0]];

  if (!errorObject) {
    return null;
  }

  return (
    errorObject.message ||
    (Array.isArray(errorObject) && errorObject[0]) ||
    (errorObject instanceof Object &&
      errorObject[Object.keys(errorObject)[0]][0]) ||
    (data[0] && data[0].message) ||
    response.statusText ||
    errorObject
  );
}

export async function handleErrors(response) {
  if (!response.ok) {
    let responseText = await response.text();
    const data = responseText && JSON.parse(responseText);

    return Promise.reject(getError(data, response));
  }

  return Promise.resolve(response);
}

export function getErrorMessage(error) {
  if (!error) {
    return null;
  }

  return Array.isArray(error)
    ? error[0] || error[0][0]
    : error.message || error;
}

export function handleRequests(apiUrl, requestOptions) {
  return new Promise(async (myResolve, myReject) => {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      return myReject({
        data: [],
        error: "Could not fetch data, error" + response.status,
      });
    }
    myResolve({
      data: await response.json(),
      error: "",
    });
  });
}
