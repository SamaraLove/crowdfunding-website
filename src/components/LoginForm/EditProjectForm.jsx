import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../Components.css";

function EditProjectFrom(props) {
  const [categoryData, setcategoryData] = useState([]);
  const history = useHistory();
  const { projectData } = props;
  //   const { id } = props;

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

  useEffect(() => {
    setCredentials({
      title: projectData.title,
      description: projectData.description,
      goal: projectData.goal,
      image: projectData.image,
      company: projectData.company,
      deadline: projectData.deadline,
      category: projectData.category,
      date_created: projectData.date_created,
      last_update_at: projectData.last_update_at,
      // is_open: projectData.is_open,
    });
  }, [projectData]);

  console.log("proejctdata", projectData.is_open);
  //   console.log("proejctdata", projectData.pledge_total);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}projects/${projectData.id}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

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
      editData().then((response) => {
        window.localStorage.setItem("title", credentials.title);
        // console.log("set local storage");
        history.push(`/projects/${projectData.id}/`);
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
          value={credentials.title}
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
          value={credentials.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          min="0"
          id="goal"
          value={credentials.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          value={credentials.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={credentials.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={credentials.deadline}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="is_open">Open:</label>
        <input
          type="checkbox"
          id="is_open"
          value={credentials.is_open}
          onChange={handleChange}
        />
      </div> */}
      {/* <div>
        <label htmlFor="date_created">Date created:</label>
        <input
          type="datetime-local"
          id="date_created"
          value={credentials.date_created}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last_update_at">Last updated at:</label>
        <input
          type="datetime-local"
          id="last_update_at"
          value={credentials.last_update_at}
          onChange={handleChange}
        />
      </div> */}

      <div>
        <label htmlFor="category">Category:</label>
        <select
          type="select"
          id="category"
          value={credentials.category}
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
        Update Project
      </button>
    </form>
  );
}

export default EditProjectFrom;
