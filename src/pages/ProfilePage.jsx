import React from "react";
import { oneUser } from "../data";

function ProfilePage() {
  //   return <h1>This is the profile page</h1>;
  return (
    <div>
      <h2>{oneUser.username}</h2>
      <h3>Email: {oneUser.email}</h3>
      <img src={oneUser.userprofile.profile_img} />
      {/* <p>password: {oneUser.password}</p> */}
      <p>rating: {oneUser.userprofile.rating}</p>
      <p>created: {oneUser.userprofile.created}</p>
      <p>updated: {oneUser.userprofile.updated}</p>
      <p>bio: {oneUser.userprofile.bio}</p>
      <p>location: {oneUser.userprofile.location}</p>
    </div>
  );
}

export default ProfilePage;
