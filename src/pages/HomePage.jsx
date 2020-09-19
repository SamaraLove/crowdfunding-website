import React from "react";
import { allProjects } from "../data";

function HomePage() {
  //   return <h1>This is the home page.</h1>;
  return (
    <div>
      {allProjects.map((projectData, key) => {
        return <div key={key}>{projectData.title}</div>;
      })}
    </div>
  );
}

export default HomePage;
