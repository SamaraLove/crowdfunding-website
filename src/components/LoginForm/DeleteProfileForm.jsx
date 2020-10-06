import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CreateProjectFrom(props) {
  const history = useHistory();
  const { userData } = props;

  //   const handleChange = (e) => {
  //     const { id, value } = e.target;
  //     setCredentials((prevCredentials) => ({
  //       ...prevCredentials,
  //       [id]: value,
  //     }));
  //   };
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    // password: "",
    userprofile: {
      //   rating: "",
      //   created: "",
      //   updated: "",
      profile_img: "",
      bio: "",
      location: "",
    },
  });
  const deleteData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${userData.username}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    // .then(() =>
    //   credentials.filter((credentials) => credentials.id === response.target.id)
    // );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");

    if (credentials.username) {
      deleteData().then((response) => {
        console.log(response);
        // window.localStorage.setItem("user", credentials.username);
        history.push("/");
      });
    }
  };

  return (
    <button type="submit" onClick={handleSubmit}>
      Delete Account
    </button>
  );
}

export default CreateProjectFrom;
