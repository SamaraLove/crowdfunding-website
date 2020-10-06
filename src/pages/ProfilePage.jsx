import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { isAuthenticated } from "../helpers/localStorage";
import DELETEUSER from "./DELETEUSER";
import ProjectCard from "../components/ProjectCard/ProjectCard";

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

  const [projectList, setProjectList] = useState([]);

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
        data.map((projectList) => console.log(projectList.owner));
      });
  }, []);

  function ProfileExist() {
    if (userData.userprofile) {
      return (
        <div>
          <img src={userData.userprofile.profile_img} alt="Avatar" />
          {/* <p>rating: {userData.userprofile.rating}</p> */}
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
        <Link to={`/profile/${username}/delete`}>
          <p>Delete</p>
        </Link>
        <DELETEUSER />
        <h2>{userData.username}</h2>
        {/* <h2>ID: {userData.id}</h2> */}
        <h3>Email: {userData.email}</h3>
        {/* <p>password: {userData.password}</p> */}
        <ProfileExist />
      </div>
      <h2> Activity </h2>
      <p> Projects {userData.username} has created </p>
      <div id="project-list">
        {projectList.map((projectData, key) => {
          return (
            <ProjectCard key={userData.username} projectData={projectData} />
          );
          // <div key={key}>{projectData.title}</div>;
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
