import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  const [projectData, setProjectData] = useState({ pledges: [] });
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`)
      .then((results) => {
        console.log("woohoo");
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, []);

  return (
    <div>
      <h2>{projectData.title}</h2>
      <h3>Created at: {projectData.date_created}</h3>
      <img src={projectData.image} />
      <h3>{`Status: ${projectData.is_open}`}</h3>
      <p>Description: {projectData.description}</p>
      <p>Goal: {projectData.goal}</p>
      <p>Deadline: {projectData.deadline}</p>
      <p>Total Contributed: ${projectData.pledge_total}</p>
      <p>Company: {projectData.company}</p>
      <p>Category: {projectData.category}</p>
      {/* <p>biggest_contribution: {oneProject.biggest_contribution}</p>
      <p>no_of_pledges: {oneProject.no_of_pledges}</p>
      <p>last_update_at: {oneProject.last_update_at}</p> */}

      <h3>Recent Pledges: </h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li>
              ${pledgeData.amount} from {pledgeData.supporter} "
              {pledgeData.comment}"
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;
