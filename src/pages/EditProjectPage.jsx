import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EditProjectForm from "../components/LoginForm/EditProjectForm";

function EditProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const [projectData, setProjectData] = useState({ pledges: [] });
  const { id } = useParams();

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
      {LoggedIn && username == projectData.owner ? (
        <>
          <p>Logged in</p>
          <EditProjectForm projectData={projectData} />
        </>
      ) : (
        <>
          <p>Login to create or edit a project </p>
          {/* <EditProjectForm projectData={projectData} /> */}
        </>
      )}
    </div>
  );
}

export default EditProjectPage;
