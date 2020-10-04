import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CreatePledgeForm from "../components/LoginForm/CreatePledgeForm";

function CreatePledgePage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  // console.log("pledgepage", id);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    //   <h1>This is the create pledge form.</h1>
    <div>
      {!LoggedIn ? (
        <>
          <p>You need to login to gift a pledge</p>
          <Link to="/login">Login</Link>
          <Link to="/CreateAccount">CreateAccount</Link>
        </>
      ) : (
        <>{/* <CreatePledgeForm id={id} /> */}</>
      )}
    </div>
  );
}

export default CreatePledgePage;
