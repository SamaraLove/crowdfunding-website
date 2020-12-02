import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../Components.css";

function DeleteUserFrom(props) {
  const history = useHistory();
  //   const { projectData } = props;

  const { username } = useParams();

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`,
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
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      history.push("/");
      window.location.reload();
    });
  };
  return (
    //   <h1>This is the create project form.</h1>
    <form>
      <p>Are you sure you want to delete? </p>
      <button type="submit" onClick={handleSubmit}>
        Delete User
      </button>
    </form>
  );
}

export default DeleteUserFrom;
