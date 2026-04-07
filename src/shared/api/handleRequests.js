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