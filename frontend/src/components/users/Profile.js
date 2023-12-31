import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";

const Profile = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile") // unimplemented
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <br />
    </>
  );
};

export default Profile;
