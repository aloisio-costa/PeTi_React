import { React, useEffect, useState } from "react";
import { Form, Button, Image, Col, Row, Badge } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  fetchServiceRequest,
  updateServiceRequest,
  saveServiceRequestPhoto,
} from "../../actions/serviceRequests.action";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingSpinner from "../utils/loadingSpinner";
import ErrorAlert from "../utils/errorAlert";
import defaultServiceRequestImage from "../../assets/Images/defaultServiceRequest.jpg";
import DisplayData from "../../assets/Display/serviceRequests";

const schema = yup.object().shape({
  petType: yup.string().required().min(3),
  breed: yup.string().required().min(2),
  service: yup.string().required(),
  location: yup.string().required(),
  note: yup.string(),
});

const ServiceRequestsEdit = ({ match }) => {
  const history = useHistory();
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
  const id = match.params.id;

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
    if (process.env.REACT_APP_DISPLAY_MODE) {

      setServiceRequest(DisplayData.ServiceRequests[id]);
      setSelectedImage(defaultServiceRequestImage);
      
      setLoading(false);
      setError(null);
    } else {
      const response = await fetchServiceRequest(id).catch((e) => {
        setError(e.error);
        setLoading(false);
      });

      if (response.data && !response.error) {
        setServiceRequest(response.data);
        setSelectedImage(
          process.env.REACT_APP_PETI_CORE_PHOTOS_URL +
            response.data.photoFileName
        );
        setLoading(false);
        setError(null);
      }
    }
  };

  const editServiceRequest = async () => {
    await updateServiceRequest(serviceRequest, id);
    await saveServiceRequestPhoto(file);
  };

  const onSubmitForm = () => {
    editServiceRequest();
    history.push(`/serviceRequests`);
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
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Pet Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="petType"
                    value={values.petType}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={!errors.petType}
                    isInvalid={touched.petType && !!errors.petType}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.petType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    type="text"
                    name="breed"
                    value={values.breed}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={!errors.breed}
                    isInvalid={touched.breed && !!errors.breed}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.breed}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Service</Form.Label>
                  <Form.Control
                    as="select"
                    name="service"
                    value={values.service}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={!errors.service}
                    isInvalid={touched.service && !!errors.service}
                  >
                    <option value="House Sitting">House Sitting</option>
                    <option value="Dog Walk">Dog Walk</option>
                    <option value="Pet Day Care">Pet Day Care</option>
                    <option value="Pet Boarding">Pet Boarding</option>
                  </Form.Control>
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.service}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={!errors.location}
                    isInvalid={touched.location && !!errors.location}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group as={Col} md="12">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  name="note"
                  value={values.note}
                  onChange={(e) => {
                    handleChange(e);
                    onFieldChange(e);
                  }}
                />
              </Form.Group>

              <div className="mb-3">
                <Image
                  width="200px"
                  height="200px"
                  id="preview"
                  src={selectedImage}
                />
                <input
                  className="form-control"
                  type="file"
                  name="photoFileName"
                  id="formFile"
                  onChange={(e) => {
                    handleChange(e);
                    imageHandleChange(e);
                  }}
                />
              </div>
              <Button disabled={!isValid} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ServiceRequestsEdit;
