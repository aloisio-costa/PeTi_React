import { handleRequests } from "../../../shared/api/apiClient";

export function createReview(reviewBody) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/reviews`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewBody),
  };

  return handleRequests(apiUrl, requestOptions);
}

export function deleteReview(id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/reviews/${id}`;
  const requestOptions = {
    method: "DELETE",
  };

  return handleRequests(apiUrl, requestOptions);
}

export function fetchPetSitterReviews(id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/reviews/${id}`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}
