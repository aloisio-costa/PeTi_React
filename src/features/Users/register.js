import { useState } from "react";
import { Redirect } from "react-router";
import "../../assets/css/user.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    await fetch("https://localhost:44396/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    setRedirect(true);

    if (redirect) {
      return <Redirect to="/login" />;
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUser({ ...user, [name]: value });
  };

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
          />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Register;
