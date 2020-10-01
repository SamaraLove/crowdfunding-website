import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateAccountPage() {
  const history = useHistory();

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        console.log(response);
        window.localStorage.setItem("user", response);

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
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
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
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          min="0"
          id="rating"
          placeholder="rating"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="created">Created:</label>
        <input
          type="datetime-local"
          id="created"
          placeholder="created"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="updated">Updated:</label>
        <input
          type="datetime-local"
          id="updated"
          placeholder="updated"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="profile_img">Avatar:</label>
        <input
          type="url"
          id="profile_img"
          placeholder="profile_img"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <input type="text" id="bio" placeholder="bio" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder="location"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create Account
      </button>
    </form>
  );
}
export default CreateAccountPage;
