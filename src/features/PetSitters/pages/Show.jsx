import { React, useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import { fetchPetSitter } from "../api/petSittersApi";
import {
  fetchPetSitterReviews,
  createReview,
  deleteReview,
} from "../api/reviewApi";
import LoadingSpinner from "../../../shared/utils/loadingSpinner";
import { Formik } from "formik";
import * as yup from "yup";
import { StarRating, StarRatingResult } from "shared/utils/starRating";
import "../../../assets/css/stars.css";
import ErrorAlert from "../../../shared/utils/errorAlert";
import defaultPetSitterImage from "../../../assets/Images/defaultPetSitter.jpg";
import DisplayData from "../data/petSitters.json";

const schema = yup.object().shape({
  rating: yup.number().required("Don't forget to rate it").min(1).max(5),
  title: yup.string().required().max(75),
  body: yup.string().required().max(2000),
});

const PetSitterProfile = ({ match }) => {
  const history = useHistory();
  const [petSitter, setPetSitter] = useState();
  const [review, setReview] = useState({
    rating: "",
    title: "",
    body: "",
    petSitterId: "",
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayAdmin, setDisplayAdmin] = useState(null);
  const id = match.params.id;

  const CreateReview = async () => {
    await createReview({ ...review, petSitterId: petSitter.id });
    fetchReviews();
  };

  const fetchReviews = async () => {
    if (DisplayData.PetSitters[id]) {
      setReviews(DisplayData.PetSitters[id].reviews);
      setLoading(false);
      setError(null);
      setDisplayAdmin(false);
    } else {
      const response = await fetchPetSitterReviews(id).catch((e) => {
        setError(e.error);
        setLoading(false);
      });

      if (response) {
        if (response.data && !response.error) {
          setReviews(response.data);
          setLoading(false);
          setError(null);
        }
      }
    }
  };

  const onFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setReview({ ...review, [name]: value });
  };
  const initialState = {
    rating: 0,
    title: "",
    body: "",
  };

  const onSubmitReview = (values, { resetForm }) => {
    CreateReview();
    resetForm({});
    setReview({ ...initialState });
  };

  const handleDeleteReview = async (id) => {
    await deleteReview(id);
    fetchReviews();
  };

  const fetchPettSitter = async () => {
    if (DisplayData.PetSitters[id]) {
      
      setPetSitter(DisplayData.PetSitters[id]);
      setLoading(false);
      setError(null);
    } else {
      const response = await fetchPetSitter(id).catch((e) => {
        setError(e.error);
        setLoading(false);
      });

      if (response) {
        if (response.data && !response.error) {
          setPetSitter(response.data);
          setLoading(false);
          setError(null);
        }
      }
    }
  };

  useEffect(() => {
    fetchPettSitter();
    fetchReviews();
  }, []);

  const RenderPetSitterProfile = () => {
    return (
      <div>
        <Card>
          <Card.Img
            variant="top"
            src={
              process.env.REACT_APP_DISPLAY_MODE
                ? defaultPetSitterImage
                : process.env.REACT_APP_PETI_CORE_PHOTOS_URL +
                  petSitter.photoFileName
            }
            style={{ height: "495px" }}
          />
          <Card.Body>
            <Card.Title>{petSitter.title}</Card.Title>
            <Card.Text>{petSitter.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="text-muted">
              {petSitter.location}
            </ListGroupItem>
            <ListGroupItem>From {petSitter.price}/day</ListGroupItem>
          </ListGroup>
          <Card.Body>
            {/* {displayAdmin && ( */}
            <Button
              onClick={() => history.push(`/petSitters/${petSitter.id}/edit`)}
              variant="info"
            >
              Edit
            </Button>
            {/* )} */}
            <Button className="ms-3" variant="success">
              Contact
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };
  const RenderPetSitterReviewInput = () => {
    return (
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitReview}
          initialValues={review}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <div>
                <h2>Leave a Review</h2>
              </div>
              <Row className="mt-3">
                <StarRating
                  starRating={values.rating}
                  onChange={(e) => {
                    setFieldValue("rating", e.target.value);
                    onFieldChange(e);
                  }}
                />
                {touched.rating && errors.rating && (
                  <div id="feedback">
                    <span style={{ color: "red" }}>{errors.rating}</span>
                  </div>
                )}
              </Row>

              <Row>
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
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && !!errors.title}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    name="body"
                    value={values.body}
                    placeholder="What's your feedback..."
                    onChange={(e) => {
                      handleChange(e);
                      onFieldChange(e);
                    }}
                    isValid={touched.body && !errors.body}
                    isInvalid={touched.body && !!errors.body}
                  />
                </Form.Group>
              </Row>

              <Button variant="success" className="mt-2" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const reviewsList = reviews
    .slice(0)
    .reverse()
    .map((review, index) => {
      return (
        <div key={index} className="mt-3">
          <Card>
            <Card.Body>
              <h1 className="d-inline">
                <IoPersonCircleOutline size={50} />
              </h1>
              <h5 className="d-inline"> Author</h5>
              <p></p>
              <div className="mb-2">
                <StarRatingResult ratingResult={review.rating} />
              </div>
              <Card.Title>{review.title}</Card.Title>
              <Card.Text>{review.body}</Card.Text>
              <Button
                onClick={() => handleDeleteReview(review.id)}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });

  return (
    <div className="mt-1">
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
      {!error && !loading && petSitter && reviews && (
        <Row className="no-gutters">
          <Col md={5} className="mr-3">
            {RenderPetSitterProfile()}
          </Col>
          <Col>
            {RenderPetSitterReviewInput()}
            <div className="mt-5">{reviewsList}</div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PetSitterProfile;
