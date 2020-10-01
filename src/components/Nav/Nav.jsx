import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Nav() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const location = useLocation();

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
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
}

export default Nav;
