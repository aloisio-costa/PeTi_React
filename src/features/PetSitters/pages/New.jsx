import React, { useState } from "react";
import { Form, Button, Image, Col, Row, Badge } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  createPetSitter,
  savePetSitterPhoto,
} from "../api/petSittersApi";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import defaultImage from "../../../assets/Images/defaultPetSitter.jpg";
import ErrorAlert from "../../../shared/utils/errorAlert";
import LoadingSpinner from "../../../shared/utils/loadingSpinner";

const schema = yup.object().shape({
  title: yup.string().required().max(75),
  description: yup.string().required(),
  location: yup.string().required(),
  price: yup.number().required().min(1),
});

const PetSitterNew = ({ currentUserId }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [petSitter, setPetSitter] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    photoFileName: "defaultPetSitter.png",
    userId: "unknow",
  });
  const [file, setFile] = useState();

  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const onFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setPetSitter({ ...petSitter, [name]: value });
  };

  const imageHandleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = URL.createObjectURL(file);
      setPetSitter({ ...petSitter, photoFileName: file.name });
      setSelectedImage(image);
      URL.revokeObjectURL(file);

      var formData = new FormData();
      formData.append("myFile", file, file.name);

      setFile(formData);
    }
  };

  const newPetSitter = async () => {
    const createResponse = await createPetSitter({
      ...petSitter,
      userId: currentUserId,
    });
    const photoResponse = await savePetSitterPhoto(file);

    if(createResponse.error || photoResponse.error){
      setError(response.error ??  photoResponse.error);
    } else {
      setError(null);
    }

    setLoading(false);
  };

  const onSubmitForm = async () => {
    setLoading(true);
    await newPetSitter();
    history.push(`/petSitters`);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="d-flex justify-content-center">
        <Badge bg="success">Become a Pet Sitter</Badge>
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
          initialValues={petSitter}
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
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    name="description"
                    value={values.description}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    onBlur={handleBlur}
                    isValid={touched.price && !errors.price}
                    isInvalid={touched.price && !!errors.price}
                  />
                  <Form.Control.Feedback tooltip>
                    looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-4">
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
                    isValid={touched.location && !errors.location}
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

              <Row className="mb-3">
                <div>
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
              </Row>
              <Button
                className="mt-2"
                disabled={!(isValid && dirty)}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUserId: state.auth.userId };
};

export default connect(mapStateToProps)(PetSitterNew);
