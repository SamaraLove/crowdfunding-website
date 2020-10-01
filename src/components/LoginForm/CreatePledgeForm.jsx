import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function CreatePledgeForm() {
  //   const [LoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  //   const location = useLocation();

  const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project_id: "",
    // supporter
  });

  //   useEffect(() => {
  //     const token = window.localStorage.getItem("token");
  //     token != null ? setLoggedIn(true) : setLoggedIn(false);
  //   }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
      method: "post",
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
      postData().then((response) => {
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
      <div>
        <label htmlFor="project_id">Project_id:</label>
        <input
          type="number"
          min="1"
          id="project_id"
          placeholder="project id"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
    // <div>
    /* {!LoggedIn ? (
        <>
          <p>You need to login to gift a pledge</p>
          <Link to="/login">Login</Link>
          <Link to="/CreateAccount">CreateAccount</Link>
        </>
      ) : (
        <>
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
            <div>
              <label htmlFor="project_id">Project_id:</label>
              <input
                type="number"
                min="1"
                id="project_id"
                placeholder="project id"
                onChange={handleChange}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </>
      )}
    </div> */
  );
}

export default CreatePledgeForm;
