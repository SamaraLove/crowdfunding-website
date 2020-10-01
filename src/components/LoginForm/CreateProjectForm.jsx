import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function CreateProjectFrom() {
  const [categoryData, setcategoryData] = useState([]);
  //   const [LoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  //   const location = useLocation();

  //   useEffect(() => {
  //     const token = window.localStorage.getItem("token");
  //     token != null ? setLoggedIn(true) : setLoggedIn(false);
  //   }, [location]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setcategoryData(data);
        // console.log(data);
        // data.map((category) => console.log(category.category));
      });
    // cleanup()
  }, []);

  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    company: "",
    deadline: "",
    category: "",
    // is_open: "",
    // date_created: "2020-09-05T11:01:29.014038+08:00",
    // owner: "maintest",
    // last_update_at: "2020-09-05T11:01:29.014077+08:00",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  //   const postData = async () => {
  //     let token = window.localStorage.getItem("token");
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(credentials),
  //     });
  //     return response.json();
  //   };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (credentials.title != null) {
  //       console.log(credentials);
  //       postData().then((response) => {
  //         console.log(response);
  //         history.push("/");
  //       });
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    //Have to select the first category again or it's null
    if (
      credentials.title &&
      credentials.description &&
      credentials.goal
      //   credentials.image &&
      //   credentials.is_open &&
      //   credentials.date_created &&
      //   credentials.last_update_at &&
      //   credentials.company &&
      //   credentials.deadline &&
      //   credentials.category
    ) {
      //   console.log("All data is there");
      postData().then((response) => {
        window.localStorage.setItem("title", credentials.title);
        // console.log("set local storage");
        history.push("/");
      });
    }
  };

  return (
    //   <h1>This is the create project form.</h1>
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
        />
        {/* {errors.title && errors.title.type === "required" && (
        <span>This is required</span>
      )} */}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          min="0"
          id="goal"
          placeholder="goal in $AUD"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          placeholder="image url"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          placeholder="company name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          placeholder="deadline"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="is_open">Open:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
        />
      </div>
      {/* this doesn't set it as a boolean for true and false  */}
      {/* <div>
      <label htmlFor="is_open">Open:</label>
      <select type="select" id="is_open" onChange={handleChange}>
        <option value="true">Yes</option>
        <option value="alse">No</option>
      </select>
    </div> */}

      <div>
        <label htmlFor="date_created">Date created:</label>
        <input
          type="datetime-local"
          id="date_created"
          placeholder="date created"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last_update_at">Last updated at:</label>
        <input
          type="datetime-local"
          id="last_update_at"
          placeholder="last update at"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          type="select"
          id="category"
          placeholder="category"
          onChange={handleChange}
        >
          {categoryData.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create Project
      </button>
    </form>
  );
}

export default CreateProjectFrom;
