import React, { useState, useEffect } from "react";
import UserCard from "../components/ProjectCard/UserCard";

function AllUsersPage() {
  //variables
  const [userList, setUserList] = useState([]);

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserList(data);
      });
  }, []);

  //template
  return (
    <div id="project-list">
      {/* <div key={key}>{userData.username}</div>; */}
      {userList.map((userData, key) => {
        return <UserCard key={key} userData={userData} />;
      })}
    </div>
  );
}

export default AllUsersPage;
