import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteProject from "../components/Forms/DeleteProject";

function EditProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const [projectData, setProjectData] = useState({ pledges: [] });
  const { id } = useParams();
  let username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, []);

  return (
    <div>
      {!LoggedIn ? (
        <>
          <p>Login to edit a project </p>
        </>
      ) : (
        <>
          <p>Logged in as {username} </p>
          <br></br>
          <DeleteProject />
        </>
      )}
    </div>
  );
}

export default EditProjectPage;
