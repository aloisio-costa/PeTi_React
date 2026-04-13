import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchServiceRequest,
  updateServiceRequest,
  saveServiceRequestPhoto,
} from "../api/serviceRequestsApi";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingSpinner from "../../../shared/utils/loadingSpinner";
import ErrorAlert from "../../../shared/utils/errorAlert";
import defaultServiceRequestImage from "../../../assets/Images/defaultServiceRequest.jpg";
import DisplayData from "../../../assets/Display/serviceRequests";
import ServiceRequestForm from "../components/Form";
import { isDisplayMode, PHOTO_API_BASE_URL } from "../../../shared/config/env";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  petType: yup.string().required().min(3),
  breed: yup.string().required().min(2),
  service: yup.string().required(),
  location: yup.string().required(),
  note: yup.string(),
});

const ServiceRequestsEdit = () => {
  const navigate = useNavigate();
  const [serviceRequest, setServiceRequest] = useState({
    petType: "",
    breed: "",
    service: "",
    location: "",
    note: "",
    photoFileName: "",
  });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState();

  const onFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setServiceRequest({ ...serviceRequest, [name]: value });
  };

  const imageHandleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = URL.createObjectURL(file);
      setServiceRequest({ ...serviceRequest, photoFileName: file.name });
      setSelectedImage(image);
      URL.revokeObjectURL(file);

      var formData = new FormData();
      formData.append("myFile", file, file.name);

      setFile(formData);
    }
  };

  const getServiceRequest = async () => {
    if (isDisplayMode) {
      setServiceRequest(DisplayData.ServiceRequests[id]);
      setSelectedImage(defaultServiceRequestImage);
      
      setLoading(false);
      setError(null);

    } else {
      setLoading(true);
      const response = await fetchServiceRequest(id);

      if (response.error) {
        setError(response.error);
        setServiceRequest([]);
        
      } else {
        setServiceRequest(response.data);
        setSelectedImage(
          PHOTO_API_BASE_URL + response.data.photoFileName
        );
        
        setError(null);
      }
      setLoading(false);
    }
  };

  const editServiceRequest = async () => {
    await updateServiceRequest(serviceRequest, id);
    await saveServiceRequestPhoto(file);
  };

  const onSubmitForm = () => {
    editServiceRequest();
    navigate(`/serviceRequests`);
  };

  useEffect(() => {
    getServiceRequest();
  }, []);

  return (
    <div className="mt-3 col-md-6 offset-md-3">
      <h1 className="d-flex justify-content-center">
        <Badge bg="success">Edit Service Request</Badge>
      </h1>
      {error && !loading && (
        <div>
          <ErrorAlert error={error} />
        </div>
      )}
      {!error && loading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!error && !loading && serviceRequest && (
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitForm}
          initialValues={serviceRequest}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <ServiceRequestForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              onFieldChange={onFieldChange}
              imageHandleChange={imageHandleChange}
              selectedImage={selectedImage}
              submitDisabled={!isValid}
            />
          )}
        </Formik>
      )}
    </div>
  );
};

export default ServiceRequestsEdit;
