export async function handleRequests(apiUrl, requestOptions = {}) {
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        data: [],
        error: `Could not fetch data, error ${response.status}`,
      };
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return {
        data,
        error: "",
      };
    }

    return {
      data: null,
      error: "",
    };
  } catch (error) {
    return {
      data: [],
      error: error.message || "Unexpected error while fetching data.",
    };
  }
}