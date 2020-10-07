import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  // Variables
  const [projectList, setProjectList] = useState([]);
  const [filter, setFilter] = useState();
  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);
  //templates
  const changeFilter = (event) => {
    if (event.target.name === "All") {
      setFilter();
    } else {
      setFilter(event.target.name);
    }
  };
  return (
    <div>
      <div id="category_buttons">
        <button type="button" id="Race" name="Race" onClick={changeFilter}>
          Race
        </button>
        <button type="button" id="Body" name="Body" onClick={changeFilter}>
          Body
        </button>
        <button
          type="button"
          id="Accessories"
          name="Accessories"
          onClick={changeFilter}
        >
          Accessories
        </button>
        <button
          type="button"
          id="Driveline"
          name="Driveline"
          onClick={changeFilter}
        >
          Driveline
        </button>
        <button
          type="button"
          id="Suspension"
          name="Suspension"
          onClick={changeFilter}
        >
          Suspension
        </button>
        <button type="button" id="all" name="All" onClick={changeFilter}>
          All
        </button>
      </div>
      <p>Don't know who to donate to? See our trending projects below.</p>

      <div id="project-list">
        {projectList.reduce((total, projectData, key) => {
          if (filter != null && projectData.category !== filter) return total;
          total.push(<ProjectCard key={key} projectData={projectData} />);
          return total;
        }, [])}
      </div>
    </div>
  );
}
export default HomePage;
