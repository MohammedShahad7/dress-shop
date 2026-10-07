import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function AdminLogin() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  function login(e) {

    e.preventDefault();

    /*
      CHANGE THESE
      TO YOUR OWN LOGIN
    */

    if (
      username === import.meta.env.VITE_ADMIN_EMAIL &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate(
        "/admin/dashboard"
      );

    } else {

      alert(
        "Invalid username or password"
      );

    }
  }

  return (
    <div className="login-page">

      <form
        onSubmit={login}
        className="login-box"
      >

        <div className="login-icon">
          🔐
        </div>

        <h1>
          Admin Login
        </h1>

        <p>
          Manage your dress collection
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;