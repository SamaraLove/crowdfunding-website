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
      rating: "",
      created: "",
      updated: "",
      profileImg: "",
      bio: "",
      location: "",
    },
  });

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
      rating: userData.rating,
      created: userData.created,
      updated: userData.updated,
      profileImg: userData.profileImg,
      bio: userData.bio,
      location: userData.location,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      editData().then((response) => {
        console.log(response);
        window.localStorage.setItem("user", credentials.username);
        history.push("/");
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
      {/* <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div> */}
      <div>
        <p>userprofile: </p>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            min="0"
            id="rating"
            value={credentials.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="profile_img">Avatar:</label>
          <input
            type="url"
            id="profile_img"
            value={credentials.profile_img}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            value={credentials.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={credentials.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create Account
      </button>
    </form>
  );
}

export default CreateProjectFrom;
