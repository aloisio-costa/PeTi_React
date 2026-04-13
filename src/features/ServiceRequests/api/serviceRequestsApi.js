import { apiClient } from "../../../shared/api/apiClient";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export function createServiceRequest(serviceRequest) {
  return apiClient("/serviceRequests", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(serviceRequest),
  });
}

export function fetchServiceRequests(userId) {
  return apiClient(`/serviceRequests?userId=${userId}`);
}

export function fetchServiceRequest(id) {
  return apiClient(`/serviceRequests/${id}`);
}

export function updateServiceRequest(serviceRequest, id) {
  return apiClient(`/serviceRequests/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(serviceRequest),
  });
}

export function deleteServiceRequest(id) {
  return apiClient(`/serviceRequests/${id}`, {
    method: "DELETE",
  });
}

export function saveServiceRequestPhoto(formData) {
  return apiClient("/serviceRequests/SaveFile", {
    method: "POST",
    body: formData,
  });
}