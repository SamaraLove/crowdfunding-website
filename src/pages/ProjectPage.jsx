import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import CreatePledgeForm from "../components/LoginForm/CreatePledgeForm";
// import CreatePledgeForm from "./CreatePledgePage";

function ProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  //functions to get the userid url
  //currently is project id..not userid

  const [userData, setUserData] = useState({ userprofile: {} });
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${id}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const [projectData, setProjectData] = useState({ pledges: [] });
  // const { id } = useParams();

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
      <div>
        {!LoggedIn ? (
          <>
            <p>You not owner</p>
          </>
        ) : (
          <>
            <p>You owner</p>
            <Link to={`/projects/${id}/edit`}>
              <p>Edit</p>
            </Link>
          </>
        )}
      </div>
      <div>
        <h2>{projectData.title}</h2>
        <ProgressBar value={projectData.pledge_total} max={projectData.goal} />
        <h3>Created at: {projectData.date_created}</h3>
        <img src={projectData.image} alt={projectData.title} />
        <h3>{`Status: ${projectData.is_open}`}</h3>
        <p>Description: {projectData.description}</p>
        <Link to={`/profile/${userData.id}/`}>
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
      <p>Gift a Pledge</p>
      <CreatePledgeForm id={id} />
    </div>
  );
}

export default ProjectPage;
