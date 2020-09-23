import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  //variables
  const [projectList, setProjectList] = useState([]);

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  //template
  return (
    <div id="project-list">
      {projectList.map((projectData, key) => {
        return <ProjectCard key={key} projectData={projectData} />;
        // <div key={key}>{projectData.title}</div>;
      })}
    </div>
  );
}

export default HomePage;
