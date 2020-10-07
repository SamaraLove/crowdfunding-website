import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateAccountPage() {
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    // password: "",
    userprofile: {},
  });
  //   rating: "",
  //   created: "",
  //   updated: "",
  //   profileImg: "",
  //   bio: "",
  //   location: "",

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    // let token = window.localStorage.setItem("token");
    // let username = window.localStorage.setItem("username");

    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      //   body: JSON.stringify({
      //     ...credentials.userprofile,
      //     created: new Date().toISOString(),
      //     updated: new Date().toISOString(),
      //   }),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (credentials.title != null) {
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        console.log(response);
        // window.localStorage.setItem("user", credentials.username);
        history.push("/login");
      });
    }
    // }
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
      {/* <div>
        <p>userprofile: </p>
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
          <input
            type="text"
            id="bio"
            placeholder="bio"
            onChange={handleChange}
          />
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
      </div> */}

      <button type="submit" onClick={handleSubmit}>
        Create Account
      </button>
    </form>
  );
}
export default CreateAccountPage;
