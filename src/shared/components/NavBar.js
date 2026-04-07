import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import GoogleAuth from "components/GoogleAuth";
import { useHistory } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

const Navigation = ({ isSignedIn }) => {
  const history = useHistory();

  return (
    <div>
      <Navbar bg="info" variant="light" expand="lg" fixed="top">
        <div className="container">
          <Navbar.Brand className="ms-3" onClick={() => history.push("/")}>
            <h2>
              P<FaPaw size={20} />
              Ti
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <Nav.Link onClick={() => history.push("/aboutUs")}>
                  ABOUT US
                </Nav.Link>
                <Nav.Link onClick={() => history.push("/petSitters")}>
                  FIND PET SITTERS
                </Nav.Link>
                {isSignedIn && (
                  <Nav.Link onClick={() => history.push("/serviceRequests")}>
                    MY REQUESTS
                  </Nav.Link>
                )}
              </div>
              <div className="d-flex justify-content-end">
                {isSignedIn && (
                  <Nav.Link onClick={() => history.push("/petSitters/new")}>
                    MY PET SITTING
                  </Nav.Link>
                )}
                <div className="mx-3">
                  <GoogleAuth />
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Navigation);
