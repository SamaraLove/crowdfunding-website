import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../Components.css";

function DeleteProjectFrom(props) {
  const history = useHistory();
  //   const { projectData } = props;

  const { id } = useParams();

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}projects/${id}/`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    // return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    editData().then((response) => {
      //   window.localStorage.removeItem("title", credentials.title);
      // console.log("set local storage");
      history.push("/");
      //   window.location.reload();
    });
  };
  return (
    //   <h1>This is the create project form.</h1>
    <div>
      <p>Are you sure you want to delete Project {id}? </p>
      <button type="submit" onClick={handleSubmit}>
        Delete Project
      </button>
    </div>
  );
}

export default DeleteProjectFrom;
