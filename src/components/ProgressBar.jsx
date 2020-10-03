import React from "react";
import "./ProjectCard/ProjectCard.css";

const ProgressBar = (props) => {
  const { value, max } = props;

  if (value >= max) {
    return (
      <div className="progress-container">
        {/* <p>Goal met! </p> */}
        <progress className="progress-filler" value={value} max={max} />
        <span>{(value / max) * 100} %</span>
      </div>
    );
  } else {
    return (
      <div className="progress-container">
        {/* <p>goal not</p> */}
        <progress className="progress-filler" value={value} max={max} />
        <span className="progress-value" decimalscale={0}>
          {(value / max) * 100} %
        </span>
      </div>
    );
  }
  // return (

  // );
};

export default ProgressBar;
