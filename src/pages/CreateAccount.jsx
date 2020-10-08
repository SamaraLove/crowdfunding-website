import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateAccountForm from "../components/LoginForm/CreateAccountForm";

function CreateAccountPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    <div>
      {!LoggedIn ? (
        <CreateAccountForm />
      ) : (
        <>
          <p>Logged in as {username} </p>
        </>
      )}
    </div>
  );
}
export default CreateAccountPage;
