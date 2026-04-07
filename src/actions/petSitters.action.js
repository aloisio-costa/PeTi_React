import { handleRequests } from "../shared/utils/errorHandlers";

export function fetchAllPetSitters() {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/petSitters`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}

export function fetchPetSitter(id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/petSitters/${id}`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}

export function createPetSitter(petSitter) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/petSitters`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(petSitter),
  };

  return handleRequests(apiUrl, requestOptions);
}

export function updatePetSitter(petSitter, id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/petSitters/${id}`;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(petSitter),
  };

  return handleRequests(apiUrl, requestOptions);
}

export function savePetSitterPhoto(formData) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/petSitters/SaveFile`;
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return handleRequests(apiUrl, requestOptions);
}
