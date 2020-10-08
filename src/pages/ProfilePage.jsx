import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import "../App.css";

function ProfilePage() {
  const [userData, setUserData] = useState({ userprofile: {} });
  const { username } = useParams();
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let user = localStorage.username;
  const [IsSuccess, setIsSuccess] = useState(false);
  const [Error, setError] = useState();
  const [projectList, setProjectList] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`
    );

    if (!response.ok) {
      const data = await response.json();
      console.error({ response, data });
      return;
    }

    const data = await response.json();

    if (data.error) {
      console.error({ data });
      return;
    }

    setUserData(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function ProfileExist() {
    if (userData.userprofile != null) {
      return (
        <div>
          <img
            id="profileimg"
            src={userData.userprofile.profile_img}
            alt="Avatar"
          />
          <p>created:{Date(userData.userprofile.created)}</p>
          <p>updated: {Date(userData.userprofile.updated)}</p>
          <p>bio: {userData.userprofile.bio}</p>
          <p>location: {userData.userprofile.location}</p>
        </div>
      );
    } else {
      return <p>empty</p>;
    }
  }

  function IsOwnerCanEdit() {
    user = window.localStorage.getItem("username");
    // if (username != null && projectData.owner != null) {
    if (user === username) {
      return (
        <div id="owner-links">
          {/* <p>username = owner</p> */}
          <Link to={`/profile/${username}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/profile/${username}/delete`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p></p>;
      // return <p>username != owner</p>;
    }
    // }
  }

  function UserDetail() {
    return (
      <div>
        <h2>{userData.username}</h2>
        {/* <h2>ID: {userData.id}</h2> */}
        <h3>Email: {userData.email}</h3>
        {/* <p>password: {userData.password}</p> */}
        <ProfileExist />
      </div>
    );
  }

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

  function UserActivity() {
    return (
      <div id="Activity">
        <br></br>
        <h3>Activity</h3>
        <div id="category_buttons">
          <button
            type="button"
            id={username}
            name={username}
            onClick={changeFilter}
          >
            <p>Click here to see the projects by</p>
            {username}
          </button>
        </div>

        <div id="project-list">
          {projectList.reduce((total, projectData, key) => {
            if (filter != null && projectData.owner !== filter) return total;
            total.push(<ProjectCard key={key} projectData={projectData} />);
            return total;
          }, [])}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {!LoggedIn ? (
          <>{/* <p>You are not logged in. Create an account now!</p> */}</>
        ) : (
          <>
            {/* <p>Logged in as {username} </p> */}
            <IsOwnerCanEdit />
          </>
        )}
      </div>
      <UserDetail />
      <UserActivity />
    </div>
  );
}

export default ProfilePage;
