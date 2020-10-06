import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteProject from "../components/LoginForm/DeleteProject";

function EditProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

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
    //   <h1>This is the create project form.</h1>
    <div>
      {!LoggedIn ? (
        <>
          <p>You not owner</p>
        </>
      ) : (
        <>
          <p>You owner</p>
          <DeleteProject projectData={projectData} />
        </>
      )}
    </div>
  );
}

export default EditProjectPage;
