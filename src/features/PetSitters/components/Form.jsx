import React from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";

const PetSitterForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  dirty,
  onFieldChange,
  imageHandleChange,
  selectedImage,
  submitDisabled,
}) => {
  return (
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
            isValid={touched.fieldName && !errors.fieldName}
            isInvalid={touched.title && !!errors.title}
          />
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
          <Form.Control.Feedback tooltip type="invalid">
            {errors.location}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <div>
          <Image width="200px" height="200px" id="preview" src={selectedImage} />
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
        disabled={submitDisabled}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default PetSitterForm;