import React, { useState, useEffect } from "react";
import PledgeCard from "../components/ProjectCard/PledgeCard";

function AllPledgesPage() {
  //   return <h1>This is the AllUsers Page .</h1>;
  //variables
  const [pledgeList, setPledgeList] = useState([]);

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}pledges/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setPledgeList(data);
      });
  }, []);

  //template
  return (
    <div id="project-list">
      {pledgeList.map((pledgeData, key) => {
        return <PledgeCard key={key} pledgeData={pledgeData} />;
      })}
    </div>
  );
}

export default AllPledgesPage;
