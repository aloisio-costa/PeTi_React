import React from "react";
import Home from "./features/Home/Home";

import PetSittersList from "./features/PetSitters/pages/List";
import PetSitterShow from "./features/PetSitters/pages/Show";
import PetSitterEdit from "./features/PetSitters/pages/Edit";
import PetSitterNew from "./features/PetSitters/pages/New";

import ServiceRequests from "./features/ServiceRequests/pages/List";
import ServiceRequestsNew from "./features/ServiceRequests/pages/New";
import ServiceRequestsEdit from "./features/ServiceRequests/pages/Edit";

import AboutUs from "./features/AboutUs/AboutUs";
import Register from "./features/Users/register";
import Login from "./features/Users/login";

import NotFound from "features/NotFound/NotFound";

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

          <Route path="/petSitters" component={PetSittersList} exact />
          <Route path="/petSitters/new" component={PetSitterNew} exact />
          <Route path="/petSitters/:id" component={PetSitterShow} exact />
          <Route
            path="/petSitters/:id/edit"
            component={PetSitterEdit}
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
