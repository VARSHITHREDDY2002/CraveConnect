import React from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../templates/Navbar";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [batchName, setBatchName] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  // const onChangeEmail = (event) => {
  //   setEmail(event.target.value);
  //   if(!email.endsWith("@nitc.ac.in"))
  //   {
  //     alert("email should ends with @nitc.ac.in");
  //   }
  // };

  const onChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail); // Update the email state with the new value
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangecontactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangebatchaName = (event) => {
    setBatchName(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setContactNumber("");
    setAge("");
    setBatchName("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email.endsWith("@nitc.ac.in")) {
      alert("email should ends with @nitc.ac.in");
      setEmail("");
      return;
    }
    const newUser = {
      name: name,
      email: email,
      password: password,
      contactNumber: contactNumber,
      age: age,
      batchName: batchName,
    };

    axios.post("http://localhost:4000/user/ur", newUser).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("Created\t" + response.data.name);
      }
      console.log(response.data);
    });

    resetInputs();
  };

  return (
    <>
      <Navbar></Navbar>
      <br />
      <div className="container">
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              autoComplete="off"
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ContactNumber"
              variant="outlined"
              value={contactNumber}
              onChange={onChangecontactNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="BatchName"
              variant="outlined"
              value={batchName}
              onChange={onChangebatchaName}
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
              Register
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
