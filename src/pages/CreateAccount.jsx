import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CreateAccountForm from "../components/LoginForm/CreateAccountForm";

function CreateAccountPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  //   const history = useHistory();
  const location = useLocation();

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
          <p>You are already logged in. </p>
        </>
      )}
    </div>
  );
}
export default CreateAccountPage;
