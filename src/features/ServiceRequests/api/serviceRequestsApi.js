import { API_BASE_URL } from "../../../shared/api/apiConfig";
import { handleRequests } from "../../../shared/api/apiClient";

const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function createServiceRequest(serviceRequest) {
  return handleRequests(`${API_BASE_URL}/serviceRequests`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(serviceRequest),
  });
}

export function fetchServiceRequests(userId) {
  return handleRequests(
    `${API_BASE_URL}/serviceRequests?userId=${userId}`,
    {
      headers: jsonHeaders,
    }
  );
}

export function fetchServiceRequest(id) {
  return handleRequests(`${API_BASE_URL}/serviceRequests/${id}`, {
    headers: jsonHeaders,
  });
}

export function updateServiceRequest(serviceRequest, id) {
  return handleRequests(`${API_BASE_URL}/serviceRequests/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(serviceRequest),
  });
}

export function deleteServiceRequest(id) {
  return handleRequests(`${API_BASE_URL}/serviceRequests/${id}`, {
    method: "DELETE",
  });
}

export function saveServiceRequestPhoto(formData) {
  return handleRequests(`${API_BASE_URL}/serviceRequests/SaveFile`, {
    method: "POST",
    body: formData,
  });
}