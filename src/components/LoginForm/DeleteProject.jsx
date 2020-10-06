import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function DeleteProjectFrom(props) {
  const history = useHistory();
  const { projectData } = props;
  //   const { id } = props;

  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    company: "",
    deadline: "",
    category: "",
    // is_open: "",
    // date_created: "2020-09-05T11:01:29.014038+08:00",
    // owner: "maintest",
    // last_update_at: "2020-09-05T11:01:29.014077+08:00",
  });

  useEffect(() => {
    setCredentials({
      title: projectData.title,
      description: projectData.description,
      goal: projectData.goal,
      image: projectData.image,
      company: projectData.company,
      deadline: projectData.deadline,
      category: projectData.category,
      date_created: projectData.date_created,
      last_update_at: projectData.last_update_at,
    });
  }, [projectData]);

  //   console.log("proejctdata", projectData);
  //   console.log("pledge total", projectData.pledge_total);

  const handleSubmit = (e) => {
    let token = localStorage.getItem("token");
    console.log("Submit pressed");

    console.log(projectData);
    fetch(`${process.env.REACT_APP_API_URL}projects/${projectData.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    history.push("/");
    window.location.reload();
  };

  return (
    //   <h1>This is the create project form.</h1>
    <form>
      <p>Are you sure you want to delete? </p>
      <button type="submit" onClick={handleSubmit}>
        Delete Project
      </button>
    </form>
  );
}

export default DeleteProjectFrom;
