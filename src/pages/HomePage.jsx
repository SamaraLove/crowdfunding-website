import React from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { allProjects } from "../data";

function HomePage() {
  //   return <h1>This is the home page.</h1>;
  return (
    <div id="project-list">
      {allProjects.map((projectData, key) => {
        return <ProjectCard key={key} projectData={projectData} />;
        // <div key={key}>{projectData.title}</div>;
      })}
    </div>
  );
}

export default HomePage;
