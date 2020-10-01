import React, { useState, useEffect } from "react";

function CreateProjectPage() {
  const [categoryData, setcategoryData] = useState([]);
  //   const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setcategoryData(data);
        console.log(data);

        // data.map((category) => console.log(category.category));
      });
  }, []);

  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    goal: 150,
    image: "",
    company: "",
    deadline: "",
    category: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
      //   `${process.env.REACT_APP_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.title && credentials.description) {
      postData().then((response) => {
        console.log(response);
        // window.localStorage.setItem("token", response.token);
      });
    }
  };
  //   console.log(data);
  //   console.log(categoryData.category);
  //   console.log(categoryData);
  //   console.log(category);

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
          id="goal"
          placeholder="goal"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          placeholder="image"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          placeholder="company"
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
        <label htmlFor="category">category:</label>
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
        Submit
      </button>
    </form>
  );
}

export default CreateProjectPage;
