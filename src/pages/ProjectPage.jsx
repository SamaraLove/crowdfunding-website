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

  const { id } = useParams();

  const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(yesterday.getDate() - 1);

  const [projectData, setProjectData] = useState({ pledges: [] });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, []);

  const newdeadline = new Date(projectData.deadline);
  const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) => {
    if (firstDate - secondDate >= 0) {
      //first date is in future, or it is today
      // return false;
      return (projectData.is_open = true);
    }
    // return true;
    return (projectData.is_open = false);
  };

  // console.log(firstDateIsPastDayComparedToSecond(yesterday, today));
  //true
  // console.log("today", firstDateIsPastDayComparedToSecond(today, yesterday));
  //false
  // console.log(
  //   "deadline",
  //   firstDateIsPastDayComparedToSecond(projectData.deadline, today)
  // );
  // console.log(
  //   "deadline",
  //   firstDateIsPastDayComparedToSecond(newdeadline, today)
  // );
  // console.log("today", today);
  // console.log("Deadline", projectData.deadline);
  // console.log("new", newdeadline);

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
            <Link to={`/projects/${id}/delete1`}>
              <p>Delete</p>
            </Link>
          </>
        )}
      </div>

      <div>
        <h2>{projectData.title}</h2>
        <ProgressBar value={projectData.pledge_total} max={projectData.goal} />
        <h3>Created at: {projectData.date_created}</h3>
        <img src={projectData.image} alt={projectData.title} />
        {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
        <h3>
          Status:
          {firstDateIsPastDayComparedToSecond(newdeadline, today)}
          <Status2 />
        </h3>
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
