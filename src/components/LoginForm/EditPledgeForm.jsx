import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CreateProjectFrom(props) {
  const history = useHistory();
  const { pledgeData } = props;

  const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    // project_id: projectData.id,
    // supporter
  });

  useEffect(() => {
    setCredentials({
      amount: projectData.amount,
      comment: projectData.comment,
      anonymous: projectData.anonymous,
    });
  }, [pledgeData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.amount && credentials.project_id) {
      editData().then((response) => {
        console.log(response);
        window.localStorage.setItem("pledge", response);
        history.push("/");
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
          value={credentials.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          value={credentials.comment}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="anonymous">Anonymous:</label>
        <input
          type="checkbox"
          id="anonymous"
          value={credentials.anonymous}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="project_id">Project_id:</label>
        <input
          type="number"
          min="1"
          id="project_id"
          value={credentials.Project_id}
          onChange={handleChange}
        />
      </div> */}
      <button type="submit" onClick={handleSubmit}>
        Update
      </button>
    </form>
  );
}

export default CreateProjectFrom;
