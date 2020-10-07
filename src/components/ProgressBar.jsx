import React from "react";
import "./ProjectCard/ProjectCard.css";

const ProgressBar = (props) => {
  const { value, max } = props;

  function GoalMet() {
    if (value >= max) {
      return <p>Goal met!</p>;
    } else {
      return <p>Goal not yet met</p>;
    }
  }

  return (
    <div className="progress-container">
      <GoalMet />
      <progress
        className="progress-filler"
        value={value != null ? value : 0}
        max={max}
      />
      <span>{value != null ? Math.round((value / max) * 100) : 0} %</span>
    </div>
  );
};

export default ProgressBar;
// {
//   /* (value / max) * 100 */
// }
