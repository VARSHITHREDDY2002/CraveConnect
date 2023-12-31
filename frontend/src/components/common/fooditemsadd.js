import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../templates/Navbar";
import Navbarers from "../templates/nav2";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setrating] = useState("");
  const [type, settype] = useState("");
  const [shopname, setshopname] = useState("");
  const [opentime, setopentime] = useState("");
  const [closetime, setClosetime] = useState("");
  const [vendorname, setvendorname] = useState("");
  const [activePage, setActivePage] = useState("addfood");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeprice = (event) => {
    setPrice(event.target.value);
  };

  const onChangerating = (event) => {
    setrating(event.target.value);
  };

  const onChangetype = (event) => {
    settype(event.target.value);
  };

  const newUsed = {
    email: localStorage.getItem("uemail"),
  };
  console.log(newUsed);

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/getshop", newUsed)
      .then((response) => {
        console.log(response.data);
        setshopname(response.data.shopname);
        setopentime(response.data.opentime);
        setClosetime(response.data.closetime);
        setvendorname(response.data.name);
      });
  }, []);

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPrice("");
    settype("");
    setrating("");
  };

  let fg = 0;

  var nmv = 0;

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: localStorage.getItem("uemail"),
      price: price,
      type: type,
      rating: nmv,
      shopname: shopname,
      opentime: opentime,
      closetime: closetime,
      vendorname: vendorname,
      soldcount: fg,
    };

    axios
      .post("http://localhost:4000/user/addfood", newUser)
      .then((response) => {
        alert("Successfully added");
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <>
      <Navbarers activePage={activePage} />

      <br />
      <div className="container">
        <h1 style={{ textAlign: "center", color: "#bd7454" }}>Enter details of food item </h1>
        <br />
        <Grid
          container
          align={"center"}
          spacing={4}
          style={{ justifyContent: "center", flexDirection: "column" }}
        >
          <Grid>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <br />
          <Grid>
            <TextField
              label="price"
              variant="outlined"
              value={price}
              onChange={onChangeprice}
            />
          </Grid>
          <br />
          <Grid>
            <TextField
              label="type"
              variant="outlined"
              value={type}
              onChange={onChangetype}
            />
          </Grid>
          <br />
          <Grid>
            <Button
              style={{
                backgroundColor: "#ff8521",
              }}
              variant="contained"
              onClick={onSubmit}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
