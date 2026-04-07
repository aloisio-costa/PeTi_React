import { React, useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { fetchAllPetSitters } from "../../actions/petSitters.action";
import LoadingSpinner from "../utils/loadingSpinner";
import ErrorAlert from "../utils/errorAlert";
import { StarRatingResult } from "components/utils/starRating";
import "../../assets/css/stars.css";
import "../../assets/css/indexCard.css";
import defaultPetSitterImage from "../../assets/Images/defaultPetSitter.jpg";
import DisplayData from "../../assets/Display/petSitters";

const PetSitters = () => {
  const history = useHistory();
  const [petSitters, setPetSitters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviewAverage = (petSitter) => {
    let reviewsSum = 0;
    for (let i = 0; i < petSitter.reviews.length; i++) {
      reviewsSum += petSitter.reviews[i].rating;
    }

    return Math.ceil(reviewsSum / petSitter.reviews.length);
  };
  
  const isDisplayMode = process.env.REACT_APP_DISPLAY_MODE === "true"

  const fetchPetSitters = async () => {
    if (isDisplayMode) {
      setPetSitters(DisplayData.PetSitters);
      setLoading(false);
      setError(null);
    } else {
      const response = await fetchAllPetSitters().catch((e) => {
        setError(e.error);
        setLoading(false);
      });

      if (response.data && !response.error) {
        setPetSitters([...DisplayData.PetSitters, ...response.data]);
        setLoading(false);
        setError(null);
      }
    }
  };

  useEffect(() => {
    fetchPetSitters();
  }, []);

  return (
    <div>
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
      {!error && !loading && petSitters && (
        <div>
          <Col md={9} lg={9}>
            {petSitters.map((petSitter) => {
              return (
                <Card
                  key={petSitter.id}
                  className="cardEffect mb-4 rounded"
                  style={{ width: "100%" }}
                >
                  <Row>
                    <Col md={5} lg={5}>
                      <Card.Img
                        style={({ width: "100%" }, { height: "355px" })}
                        className="rounded"
                        fluid
                        variant="top"
                        src={
                          process.env.REACT_APP_DISPLAY_MODE
                            ? defaultPetSitterImage
                            : process.env.REACT_APP_PETI_CORE_PHOTOS_URL +
                              petSitter.photoFileName
                        }
                      />
                    </Col>
                    <Col md={7} lg={7}>
                      <Card.Body>
                        <Card.Title>{petSitter.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {/* by: {petSitter.user} */}
                        </Card.Subtitle>
                        <Card.Text>
                          {petSitter.description.substring(0, 60)}...
                        </Card.Text>
                        <Card.Text>{petSitter.location}</Card.Text>
                        <Card.Text>From €{petSitter.price}/day</Card.Text>
                        {petSitter.reviews?.length > 0 && (
                          <Row>
                            <Col md={4} lg={4}>
                              <StarRatingResult
                                ratingResult={reviewAverage(petSitter)}
                              />
                            </Col>
                            <Col>
                              <p className="justify-content-start text-muted">
                                {petSitter.reviews.length} Reviews{" "}
                              </p>
                            </Col>
                          </Row>
                        )}
                      </Card.Body>
                      <Card.Body>
                        <Button
                          onClick={() =>
                            history.push(`/petSitters/${petSitter.id}`)
                          }
                          variant="info"
                        >
                          View Profile
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
        </div>
      )}
    </div>
  );
};

export default PetSitters;
