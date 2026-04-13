import { apiClient } from "../../../shared/api/apiClient";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export function fetchAllPetSitters() {
  return apiClient("/petSitters");
}

export function fetchPetSitter(id) {
  return apiClient(`/petSitters/${id}`);
}

export function createPetSitter(petSitter) {
  return apiClient("/petSitters", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(petSitter),
  });
}

export function updatePetSitter(petSitter, id) {
  return apiClient(`/petSitters/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(petSitter),
  });
}

export function savePetSitterPhoto(formData) {
  return apiClient("/petSitters/SaveFile", {
    method: "POST",
    body: formData,
  });
}