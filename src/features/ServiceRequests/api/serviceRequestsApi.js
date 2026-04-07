import { handleRequests } from "../../../shared/utils/errorHandlers";

export function createServiceRequest(serviceRequest) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceRequest),
  };

  return handleRequests(apiUrl, requestOptions);
}

export function fetchServiceRequests(userId) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests?userId=${userId}`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}

export function fetchServiceRequest(id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests/${id}`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return handleRequests(apiUrl, requestOptions);
}

export function updateServiceRequest(serviceRequest, id) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests/${id}`;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceRequest),
  };

  return handleRequests(apiUrl, requestOptions);
}

export function deleteServiceRequest(id) {

  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests/${id}`;
  const requestOptions = {
    method: "DELETE",
  };

  return handleRequests(apiUrl, requestOptions);
}

export function saveServiceRequestPhoto(formData) {
  const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL}/serviceRequests/SaveFile`;
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return handleRequests(apiUrl, requestOptions);
}
