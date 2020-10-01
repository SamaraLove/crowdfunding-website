import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import CreateProjectForm from "../components/LoginForm/CreateProjectForm";

function CreateProjectPage() {
  const [categoryData, setcategoryData] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setcategoryData(data);
        // console.log(data);
        // data.map((category) => console.log(category.category));
      });
    // cleanup()
  }, []);

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
          <CreateProjectForm />
        </>
      )}
    </div>
  );
}

export default CreateProjectPage;
