import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import CreatePledgeForm from "../components/LoginForm/CreatePledgeForm";
// import CreatePledgeForm from "./CreatePledgePage";
import DeleteProject from "../components/LoginForm/DeleteProject";
import Error404 from "../components/Error404";
import "../App.css";

function ProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  // let token = localStorage.token;
  const [IsSuccess, setIsSuccess] = useState(false);
  const [Error, setError] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const { id } = useParams();

  const [projectData, setProjectData] = useState({ pledges: [] });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`)
      .then((results) => {
        console.log(results);
        if (results.ok) {
          setIsSuccess(true);
          return results.json();
        } else {
          setError("This is error message");
        }
      })
      .then((data) => {
        setProjectData(data);
        console.log(data);
      });
  }, []);

  const firstDateIsPastDayComparedToSecond = () => {
    const today = new Date();
    const deadline = new Date(projectData.deadline);

    if (deadline - today >= 0) {
      //first date is in future, or it is today
      // return false;
      return (projectData.is_open = true);
    }
    // return true;
    return (projectData.is_open = false);
  };

  function Status2() {
    // <Status />;
    if (projectData.is_open) {
      return <p>Open</p>;
    } else {
      return <p>Closed</p>;
    }
    // elif {
    //   console.error("No is_open defined");
    // }
  }

  //not rendering fast enough
  function IsOwnerCanEdit() {
    username = window.localStorage.getItem("username");

    if (username === projectData.owner) {
      return (
        <div id="owner-links">
          {/* <p>username = owner</p> */}
          <Link to={`/projects/${id}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/projects/${id}/delete1`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p> </p>;
      // <p>username != owner</p>;
    }
  }
  return (
    <div>
      {!IsSuccess ? (
        <>
          {/* <Error404 /> */}
          {Error}
        </>
      ) : (
        <>
          {/* <p>Success</p> */}

          <div>
            <div>
              {!LoggedIn ? (
                <>{/* <p>You are not logged in</p> */}</>
              ) : (
                <>
                  {/* <p>Logged in as {username} </p> */}
                  <IsOwnerCanEdit />
                </>
              )}
            </div>

            <div>
              <h2>{projectData.title}</h2>
              <img
                id="projectpageimg"
                src={projectData.image}
                alt={projectData.title}
              />
              <ProgressBar
                value={projectData.pledge_total}
                max={projectData.goal}
              />
              {/* <h3>Created at: {projectData.date_created}</h3> */}
              <p>Created at: {Date(projectData.date_created)}</p>
              {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
              <div id="status">
                <h3>Status: </h3>
                <h3>
                  {firstDateIsPastDayComparedToSecond()}
                  <Status2 />
                </h3>
              </div>

              <p>Description: {projectData.description}</p>
              <Link to={`/profile/${projectData.owner}/`}>
                <p>Owner: {projectData.owner}</p>
              </Link>
              <p>Goal: ${projectData.goal}</p>
              <p>Deadline: {projectData.deadline}</p>
              <p>Total Contributed: ${projectData.pledge_total}</p>
              <p>Company: {projectData.company}</p>
              <p>Category: {projectData.category}</p>
              {/* If you're the project lead, see more stats below? */}
              {/* <p>biggest_contribution: {oneProject.biggest_contribution}</p>
  <p>no_of_pledges: {oneProject.no_of_pledges}</p>
  <p>last_update_at: {oneProject.last_update_at}</p> */}
              <br></br>
              {projectData.pledges && (
                <div>
                  <h3>Recent Pledges: </h3>
                  <ul>
                    {projectData.pledges.map((pledgeData, key) => {
                      return (
                        <li key={pledgeData.id}>
                          ${pledgeData.amount} from {pledgeData.supporter} "
                          {pledgeData.comment}"
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div>
              {!LoggedIn ? (
                <>
                  <p>You have to be logged in to gift a pledge</p>
                </>
              ) : (
                <>
                  {!firstDateIsPastDayComparedToSecond() ? (
                    <>
                      <p>Pledges are closed for this project</p>
                    </>
                  ) : (
                    <>
                      {/* <p>Gift a Pledge</p> */}
                      <CreatePledgeForm id={id} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectPage;
