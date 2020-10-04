import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditProfileForm from "../components/LoginForm/EditProfileForm";

function EditProfilePage() {
  const [userData, setUserData] = useState({ userprofile: {} });
  const { username } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return <EditProfileForm userData={userData} />;
}

export default EditProfilePage;
