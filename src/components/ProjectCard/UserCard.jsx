import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function UserCard(props) {
  //variables
  const { userData } = props;

  //template
  return (
    <div className="project-card">
      <Link to={`/profile/${userData.username}/`}>
        <img src={userData.profile_img} alt={userData.username} />
        <h3>{userData.username}</h3>
        <h3>{userData.id}</h3>
      </Link>
      <p>{userData.username}</p>
    </div>
  );
}

export default UserCard;
