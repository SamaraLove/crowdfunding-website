import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function PledgeCard(props) {
  //variables
  const { pledgeData } = props;

  //template

  return (
    <div className="project-card">
      <Link to={`/pledges/${pledgeData.id}/`}>
        <h3>Pledge {pledgeData.id}</h3>
        <p>
          Supporter: {pledgeData.supporter} <br></br>${pledgeData.amount} to
          Project {pledgeData.project_id}
          {/* {pledgeData.comment} */}
        </p>
      </Link>
    </div>
  );
}

export default PledgeCard;
