import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateProjectForm from "../components/LoginForm/CreateProjectForm";

function CreateProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    //   <h1>This is the create project form.</h1>
    <div>
      {!LoggedIn ? (
        <>
          <p>You need to login to create projects</p>
          <Link to="/login">Login</Link>
          <Link to="/CreateAccount">CreateAccount</Link>
        </>
      ) : (
        <>
          <p>Logged in as {username} </p>
          <CreateProjectForm />
        </>
      )}
    </div>
  );
}

export default CreateProjectPage;
