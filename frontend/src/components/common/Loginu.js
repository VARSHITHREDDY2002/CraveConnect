import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../templates/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    emailjs
      .send(
        "service_kco8l4i",
        "template_tddvb9i",
        {
          to_mail: email,
          message: "123456",
        },
        "YBRAgph4SiNcQNH2y"
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert("A mail has been sent to you!!!");
        resetInputs();
      })
      .catch((error) => {
        console.error("Email not sent:", error);
      });
    navigate("/login");
    resetInputs();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <br />

        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              autoComplete="off"
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: "#bd7454",
              }}
              variant="contained"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
