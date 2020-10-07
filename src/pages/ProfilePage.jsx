import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { isAuthenticated } from "../helpers/localStorage";

function ProfilePage() {
  const [userData, setUserData] = useState({ userprofile: {} });
  const { username } = useParams();
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let user = localStorage.username;
  const [IsSuccess, setIsSuccess] = useState(false);
  const [Error, setError] = useState();

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
          <img src={userData.userprofile.profile_img} alt="Avatar" />
          <p>created: {userData.userprofile.created}</p>
          <p>updated: {userData.userprofile.updated}</p>
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
        <div>
          <p>username = owner</p>
          <Link to={`/profile/${username}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/profile/${username}/delete`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p>username != owner</p>;
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

  return (
    <div>
      <div>
        {!LoggedIn ? (
          <>
            <p>Not logged in</p>
          </>
        ) : (
          <>
            <p>logged in</p>
            <IsOwnerCanEdit />
          </>
        )}
      </div>
      <UserDetail />
    </div>
  );
}

export default ProfilePage;
