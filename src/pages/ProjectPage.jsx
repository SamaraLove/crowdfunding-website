import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import CreatePledgeForm from "../components/LoginForm/CreatePledgeForm";
// import CreatePledgeForm from "./CreatePledgePage";

function ProjectPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  // let token = localStorage.token;
  const [IsSuccess, setIsSuccess] = useState(false);

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
        console.log(results);
        if (results.ok) {
          setIsSuccess(true);
          return results.json();
        }
      })
      .then((data) => {
        setProjectData(data);
        console.log(data);
      });
  }, []);

  const firstDateIsPastDayComparedToSecond = (secondDate) => {
    const firstDate = new Date(projectData.deadline);

    if (firstDate - secondDate >= 0) {
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

    // if (username != null && projectData.owner != null) {
    if (username === projectData.owner) {
      return (
        <div>
          <p>username = owner</p>
          <Link to={`/projects/${id}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/projects/${id}/delete1`}>
            <p>Delete</p>
          </Link>
          {/* <DELETE projectID={id} /> */}
        </div>
      );
    } else {
      return <p>username != owner</p>;
    }
    // }
  }
  // console.log("storage", username);
  // console.log("projectdata", projectData.owner);

  // function formatDate(date) {
  //   var a = date.split(/[T]/);
  //   var d = a[0].split("-"); // date
  //   var t = a[1].split(":"); // time
  //   t[2] = t[2].split("-"); // Remove Time zone offset
  //   var formattedDate = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2][0]);
  //   //formattedDate.replace(/ *\([^()]*\) */g, "");
  //   // var str = formattedDate.toString();

  //   // // this should be safe since nothing else in the date string contains a opening paren
  //   // var index = str.indexOf(" (");

  //   // // if the index exists
  //   // if (~index) {
  //   //   str = str.substr(0, index);
  //   // }
  //   return formattedDate;
  // }
  // function DateFormat(date) {
  //   var str = date.toString();

  //   // this should be safe since nothing else in the date string contains a opening paren
  //   var index = str.indexOf(" (");

  //   // if the index exists
  //   if (~index) {
  //     str = str.substr(0, index);
  //   }
  // }
  // console.log(formatDate(projectData.date_created));

  // console.log(formatDate(Date(projectData.date_created)));

  // function IsSuccess() {}

  return (
    <div>
      {!IsSuccess ? (
        <>
          <p>Not here</p>
        </>
      ) : (
        <>
          <div>
            <div>
              {!LoggedIn ? (
                <>
                  <p>Not logged in</p>
                </>
              ) : (
                <>
                  <p>logged in</p>
                  <IsOwnerCanEdit />
                </>
              )}
            </div>

            <div>
              <h2>{projectData.title}</h2>
              <ProgressBar
                value={projectData.pledge_total}
                max={projectData.goal}
              />
              {/* <h3>Created at: {projectData.date_created}</h3> */}
              <h3>Created at: {Date(projectData.date_created)}</h3>
              <img src={projectData.image} alt={projectData.title} />
              {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
              <h3>
                Status:
                {firstDateIsPastDayComparedToSecond(today)}
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

            <p>Gift a Pledge</p>
            <div>
              {!LoggedIn ? (
                <>
                  <p>You have to be logged in to gift a pledge</p>
                </>
              ) : (
                <>
                  <CreatePledgeForm id={id} />
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
