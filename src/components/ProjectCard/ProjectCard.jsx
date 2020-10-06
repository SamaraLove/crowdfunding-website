import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import ProgressBar from "../ProgressBar";

function ProjectCard(props) {
  //variables
  const { projectData } = props;

  //template
  // console.log(projectData.pledge_total);
  // console.log(projectData.goal);

  function OpenProject() {
    if (projectData.is_open) {
      return (
        <div>
          <Link to={`/projects/${projectData.id}/`}>
            <img src={projectData.image} alt={projectData.title} />
            <h3>{projectData.title}</h3>
          </Link>
          <ProgressBar
            value={projectData.pledge_total}
            max={projectData.goal}
          />
          <p>{projectData.category}</p>
        </div>
      );
    } else {
      return <p>empty</p>;
    }
  }

  return (
    <div className="project-card">
      <OpenProject />
      {/* <Link to={`/projects/${projectData.id}/`}>
        <img src={projectData.image} alt={projectData.title} />
        <h3>{projectData.title}</h3>
      </Link>
      <ProgressBar value={projectData.pledge_total} max={projectData.goal} />
      <p>{projectData.category}</p> */}
    </div>
  );
}

export default ProjectCard;
