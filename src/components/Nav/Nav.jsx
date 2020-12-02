import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const logout = () => {
    window.localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <h3 id="maintitle">CollabCar</h3>
      <div id="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!LoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/CreateAccount">CreateAccount</Link>
          </>
        ) : (
          <>
            <Link to="/createProject">CreateProject</Link>
            <Link to={`/profile/${username}`}>Profile</Link>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
