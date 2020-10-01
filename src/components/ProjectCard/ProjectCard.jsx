import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  //variables
  const { projectData } = props;

  //template
  return (
    <div className="project-card">
      <Link to={`/projects/${projectData.id}/`}>
        <img src={projectData.image} alt={projectData.title} />
        <h3>{projectData.title}</h3>
      </Link>
      <p>{projectData.category}</p>
    </div>
  );
}

export default ProjectCard;
