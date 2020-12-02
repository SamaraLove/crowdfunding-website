import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EditProjectForm from "../components/Forms/EditProjectForm";

function EditProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = window.localStorage.getItem("username");
  const [projectData, setProjectData] = useState({ pledges: [] });
  const { id } = useParams();

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
      {LoggedIn && username == projectData.owner ? (
        <>
          <p>Logged in as {username} </p>
          <EditProjectForm projectData={projectData} />
        </>
      ) : (
        <>
          <p>Login to create or edit a project </p>
        </>
      )}
    </div>
  );
}

export default EditProjectPage;
