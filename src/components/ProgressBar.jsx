import React from "react";
import "./ProjectCard/ProjectCard.css";

const ProgressBar = (props) => {
  const { value, max } = props;

  function GoalMet() {
    if (value >= max) {
      return <p>goal met</p>;
    } else {
      return <p>goal not</p>;
    }
  }
  return (
    <div className="progress-container">
      <GoalMet />
      <progress className="progress-filler" value={value} max={max} />
      <span>{Math.round((value / max) * 100)} %</span>
    </div>
  );
};

export default ProgressBar;
// {
//   /* (value / max) * 100 */
// }
