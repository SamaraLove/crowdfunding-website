import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CreateProjectFrom(props) {
  const history = useHistory();
  const { userData } = props;

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

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
      userprofile: {
        //   created: userData.created,
        //   updated: userData.updated,
        profile_img: userData.userprofile.profile_img,
        bio: userData.userprofile.bio,
        location: userData.userprofile.location,
      },
    });
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      userprofile: { ...prevCredentials.userprofile, [id]: value },
      //   [id]: value,
    }));
  };
  console.log(credentials.userprofile.bio);

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    let username = localStorage.username;
    console.log(username);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${userData.username}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    if (credentials.username) {
      editData().then((response) => {
        console.log(response);
        window.localStorage.setItem("username", credentials.username);
        history.push(`/profile/${userData.username}`);
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <p>User Profile: </p>

      <div>
        <label htmlFor="profile_img">Avatar:</label>
        <input
          type="url"
          id="profile_img"
          value={credentials.userprofile.profile_img}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <input
          type="text"
          id="bio"
          value={credentials.userprofile.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          //   placeholder="enter location"
          value={credentials.userprofile.location}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Update Account
      </button>
    </form>
  );
}

export default CreateProjectFrom;
