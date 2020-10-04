import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { isAuthenticated } from "../helpers/localStorage";

function ProfilePage() {
  const [userData, setUserData] = useState({ userprofile: {} });
  const { username } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  function ProfileExist() {
    if (userData.userprofile) {
      return (
        <div>
          <img src={userData.userprofile.profile_img} alt="Avatar" />
          <p>rating: {userData.userprofile.rating}</p>
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

  // if (isAuthenticated()) {
  //   return (
  //     <Link to={`/profile/${username}/edit`}>
  //       <p>Edit</p>
  //     </Link>
  //   );
  // }
  return (
    <div>
      <div>
        <Link to={`/profile/${username}/edit`}>
          <p>Edit</p>
        </Link>
        <h2>{userData.username}</h2>
        <h2>ID: {userData.id}</h2>

        <h3>Email: {userData.email}</h3>
        {/* <p>password: {userData.password}</p> */}
        <ProfileExist />
      </div>
      <p> Projects {userData.username} has created </p>
    </div>
  );
}

export default ProfilePage;
