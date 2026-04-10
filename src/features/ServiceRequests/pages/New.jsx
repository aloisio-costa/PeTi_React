import { React, useState } from "react";
import { Form, Button, Image, Col, Row, Badge } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  createServiceRequest,
  saveServiceRequestPhoto,
} from "../api/serviceRequestsApi";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import defaultImage from "../../../assets/Images/defaultServiceRequest.jpg";
import ErrorAlert from "../../../shared/utils/errorAlert";
import LoadingSpinner from "../../../shared/utils/loadingSpinner";

const schema = yup.object().shape({
  petType: yup.string().required().min(3),
  breed: yup.string().required().min(2),
  service: yup.string().required(),
  location: yup.string().required(),
  note: yup.string(),
});

const ServiceRequestsNew = ({ currentUserId }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceRequest, setServiceRequest] = useState({
    petType: "",
    breed: "",
    service: "",
    location: "",
    note: "",
    photoFileName: "defaultServiceRequest.jpg",
    userId: "unknown",
  });
  const [file, setFile] = useState();

  const [selectedImage, setSelectedImage] = useState(defaultImage);

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

  const newServiceRequest = async () => {
    setLoading(true);
    const response = await createServiceRequest({
      ...serviceRequest,
      userId: currentUserId,
    });

    const photoResponse = await saveServiceRequestPhoto(file);

    if (response.error) {
      setError(response.error);

    } else {
      setError(null);
    }
    
    setLoading(false);
  };

  const onSubmitForm = async () => {
    setLoading(true);
    await newServiceRequest();
    history.push("/serviceRequests");
  };

  return (
    <div className="mt-3 col-md-6 offset-md-3">
      <h1 className="d-flex justify-content-center">
        <Badge bg="success">New Service Request</Badge>
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
      {!error && !loading && (
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
            dirty,
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
              submitDisabled={!(isValid && dirty)}
            />
          )}
        </Formik>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUserId: state.auth.userId };
};

export default connect(mapStateToProps)(ServiceRequestsNew);
