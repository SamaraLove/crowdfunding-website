import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { oneUser } from "../data";
// function ProfileExist() {
//   const [userData, setUserData] = useState({ userprofile: {} });
//   console.log(userData.userprofile);

//   if (userData.userprofile) {
//     return <p>not empty</p>;
//     // <p>rating: {userData.userprofile.rating}</p>;
//   } else {
//     return <p>empty</p>;
//   }
// }

var userprofileData;
function ProfilePage() {
  const [userData, setUserData] = useState({ userprofile: {} });
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${id}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);
  console.log(userData.userprofile);

  function ProfileExist() {
    console.log(userData.userprofile);

    if (userData.userprofile) {
      return (
        <div>
          <img src={userData.userprofile.profile_img} />
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
  // userprofileData = (
  //   <div>
  //     <img src={userData.userprofile.profile_img} />
  //     <p>rating: {userData.userprofile.rating}</p>
  //     <p>created: {userData.userprofile.created}</p>
  //     <p>updated: {userData.userprofile.updated}</p>
  //     <p>bio: {userData.userprofile.bio}</p>
  //     <p>location: {userData.userprofile.location}</p>
  //   </div>
  // if (userData.userprofile) {
  // return <p>not empty</p>;

  // } else {
  // return <p>empty</p>;
  // }
  return (
    <div>
      <h2>{userData.username}</h2>
      <h3>Email: {userData.email}</h3>
      {/* <p>password: {userData.password}</p> */}
      <ProfileExist />
    </div>
  );
}

export default ProfilePage;
