import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function CreatePledgeForm(props) {
  const { id } = props;

  const history = useHistory();
  const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project_id: id,
    // supporter
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    // credentials.project_id = projectData.id;
    // debugger;
    const response = await fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
      //     body: JSON.stringify({
      //       ...credentials,
      //       project_id: {projectData.id}
      //     }),
      //   });
    });
    return response.json();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.amount) {
      postData().then((response) => {
        console.log(response);
        // console.lo;
        window.localStorage.setItem("pledge", response);
        history.push(`/projects/${id}`);
      });
    }
  };
  return (
    //   <h1>This is the create pledge form.</h1>
    <form>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          min="0"
          id="amount"
          placeholder="Enter amount in $AUD"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          placeholder="Enter a comment"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="anonymous">Anonymous:</label>
        <input
          type="checkbox"
          id="anonymous"
          placeholder="anonymous"
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="project_id">Project_id:</label>
        <input
          type="number"
          min="1"
          id="project_id"
          placeholder="project id"
          onChange={handleChange}
        />
      </div> */}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default CreatePledgeForm;
