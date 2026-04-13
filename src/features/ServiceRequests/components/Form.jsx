import React from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";

const ServiceRequestForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  onFieldChange,
  imageHandleChange,
  selectedImage,
  submitDisabled,
}) => {
  return (
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
            isValid={touched.petType && !errors.petType}
            isInvalid={touched.petType && !!errors.petType}
          />
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
            isValid={touched.breed && !errors.breed}
            isInvalid={touched.breed && !!errors.breed}
          />
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
            isValid={touched.service && !errors.service}
            isInvalid={touched.service && !!errors.service}
          >
            <option value="">Select a Service...</option>
            <option value="House Sitting">House Sitting</option>
            <option value="Dog Walk">Dog Walk</option>
            <option value="Pet Day Care">Pet Day Care</option>
            <option value="Pet Boarding">Pet Boarding</option>
          </Form.Control>
          <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
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
            onBlur={handleBlur}
          />
        </Form.Group>
      </Row>

      <div className="mb-3">
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

      <Button disabled={submitDisabled} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ServiceRequestForm;