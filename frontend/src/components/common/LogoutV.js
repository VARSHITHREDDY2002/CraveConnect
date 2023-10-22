import React from "react";
import { useState, useEffect } from "react";
import Navbarers from "../templates/nav2";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Homers = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activePage, setActivePage] = useState("vlogout");
  const navigate = useNavigate();

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return (
    <>
      <Navbarers activePage={activePage} />
      <br />
      <div className="container">
        <div style={{ textAlign: "center" }}>
          Click Yes if you want to Log out...!
          <Button
            variant="contained"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </>
  );
};

export default Homers;
