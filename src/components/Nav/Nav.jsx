import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      {/* <Link to="/createProject">CreateProject</Link> */}
      {/* <Link to="/Login">Login</Link> */}
      {/* <Link to="/CreateAccount">CreateAccount</Link> */}
    </nav>
  );
}

export default Nav;
