import React from "react";
import "../../assets/css/home.css";

const Home = () => {
  return (
    <div>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-left mb-0 h1 display-1 fw-bold">
              Welcome to PeTi's
            </h3>
          </div>
        </header>
        <main className="px-3 mt-3">
          <h5>
            When you need to hire someone – a pet sitter, a groomer, a dog
            walker, anyone – PeTi's finds them for you for free.
          </h5>
          <img
            src="https://assets.website-files.com/5f7289d0a4144d58133e8a21/600920e90f232fa851feaaba_petplan-branding_optimized.jpg"
            className="container"
          />
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; 2021 </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
