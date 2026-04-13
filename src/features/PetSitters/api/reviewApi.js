import { apiClient } from "../../../shared/api/apiClient";

const reviewsEndpoint = "/reviews";

export function createReview(reviewBody) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewBody),
  };

  return apiClient(reviewsEndpoint, requestOptions);
}

export function deleteReview(id) {
  return apiClient(reviewsEndpoint, {
    method: "DELETE",
  });
}

export function fetchPetSitterReviews(id) {
  const apiUrl = `${reviewsEndpoint}/${id}`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}
