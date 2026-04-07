import React from "react";
import Home from "./components/Home";

import PetSitters from "./features/PetSitters/index";
import PetSitterProfile from "./features/PetSitters/show";
import PetSitterProfileEdit from "./features/PetSitters/edit";
import PetSitterProfileNew from "./features/PetSitters/new";

import ServiceRequests from "./features/ServiceRequests/index";
import ServiceRequestsNew from "./features/ServiceRequests/new";
import ServiceRequestsEdit from "./features/ServiceRequests/edit";

import AboutUs from "./components/aboutUs";
import Register from "./features/Users/register";
import Login from "./features/Users/login";

import NotFound from "components/notFound";

import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div
        className="container d-flex flex-column min-vh-100"
        style={{ marginTop: "100px" }}
      >
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/aboutUs" component={AboutUs} exact />

          <Route path="/petSitters" component={PetSitters} exact />
          <Route path="/petSitters/new" component={PetSitterProfileNew} exact />
          <Route path="/petSitters/:id" component={PetSitterProfile} exact />
          <Route
            path="/petSitters/:id/edit"
            component={PetSitterProfileEdit}
            exact
          />

          <Route path="/serviceRequests" component={ServiceRequests} exact />
          <Route
            path="/serviceRequests/new"
            component={ServiceRequestsNew}
            exact
          />
          <Route
            path="/serviceRequests/:id/edit"
            component={ServiceRequestsEdit}
            exact
          />

          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />

          <Route path="*" component={NotFound} />
        </Switch>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
