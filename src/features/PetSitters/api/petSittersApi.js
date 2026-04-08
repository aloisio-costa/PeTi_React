import { API_BASE_URL } from "../../../shared/api/apiConfig";
import { handleRequests } from "../../../shared/api/apiClient";

const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function fetchAllPetSitters() {
  return handleRequests(`${API_BASE_URL}/petSitters`, {
    headers: jsonHeaders,
  });
}

export function fetchPetSitter(id) {
  return handleRequests(`${API_BASE_URL}/petSitters/${id}`, {
    headers: jsonHeaders,
  });
}

export function createPetSitter(petSitter) {
  return handleRequests(`${API_BASE_URL}/petSitters`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(petSitter),
  });
}

export function updatePetSitter(petSitter, id) {
  return handleRequests(`${API_BASE_URL}/petSitters/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(petSitter),
  });
}

export function savePetSitterPhoto(formData) {
  return handleRequests(`${API_BASE_URL}/petSitters/SaveFile`, {
    method: "POST",
    body: formData,
  });
}