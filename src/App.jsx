import React from "react";
import Home from "./features/Home/pages/Home";

import PetSittersList from "./features/PetSitters/pages/List";
import PetSitterShow from "./features/PetSitters/pages/Show";
import PetSitterEdit from "./features/PetSitters/pages/Edit";
import PetSitterNew from "./features/PetSitters/pages/New";

import ServiceRequests from "./features/ServiceRequests/pages/List";
import ServiceRequestsNew from "./features/ServiceRequests/pages/New";
import ServiceRequestsEdit from "./features/ServiceRequests/pages/Edit";

import AboutUs from "./features/AboutUs/pages/AboutUs";
import Register from "./features/Users/register";
import Login from "./features/Users/login";

import NotFound from "./features/NotFound/pages/NotFound";

import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/footer";

import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div
        className="container d-flex flex-column min-vh-100"
        style={{ marginTop: "100px" }}
      >
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />

            <Route path="/petSitters" element={<PetSittersList />} />
            <Route path="/petSitters/new" element={<PetSitterNew />} />
            <Route path="/petSitters/:id" element={<PetSitterShow />} />
            <Route path="/petSitters/:id/edit" element={<PetSitterEdit />} />

            <Route path="/serviceRequests" element={<ServiceRequests />} />
            <Route path="/serviceRequests/new" element={<ServiceRequestsNew />} />
            <Route path="/serviceRequests/:id/edit" element={<ServiceRequestsEdit />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
