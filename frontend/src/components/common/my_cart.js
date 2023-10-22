import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Navbar from "../templates/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Navbarer from "../templates/nav1";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const FoodLista = (props) => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState("carter");
  const navigate = useNavigate();

  useEffect(() => {
    const mi = {
      email: localStorage.getItem("uemail"),
    };
    axios
      .post("http://localhost:4000/user/jm", mi)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (event) => {};

  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const [showButtons, setShowButtons] = useState(true); // State to manage button visibility
  const [isRatingVisible, setIsRatingVisible] = useState(false); // State for rating visibility
  const [userRating, setUserRating] = useState(0); // State to store the user's rating

  const handleRateButtonClick = (user) => {
    setIsRatingVisible(true);
    setSelectedUser(user); // Store the selected user data
  };

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value, 10);
    setUserRating(newRating);
  };

  const handleSubmitRating = () => {
    // Check if a user is selected
    if (selectedUser) {
      // Prepare the data to send to the backend
      const ratingData = {
        id: selectedUser._id,
        email: selectedUser.vemail,
        name: selectedUser.name,
        rating: userRating, // The rating value selected by the user
      };
      console.log(ratingData);
      //setIsRatingVisible(false);
      //setShowButtons(false);
      // Make an axios request to send the rating data to the backend
      //    axios.post("http://localhost:4000/user/ratstatus",ratingData).then((response)=>{
      //     console.log(response.data);
      //    });
      axios
        .post("http://localhost:4000/user/rating", ratingData)
        .then((response) => {
          console.log("Rating submitted successfully:", response.data);
          setIsRatingVisible(false);
          setSelectedUser(null); // Clear the selected user data
          setShowButtons(true); // Hide all the buttons
          window.location.reload(false);
        })
        .catch((error) => {
          console.error("Error submitting rating:", error);
        });
      //console.log(userRating);
    }
  };

  return (
    <>
      <Navbarer activePage={activePage}/>
      <br />
      <div className="container">
        <h1 style={{ textAlign: "center" }}>My Cart</h1>
        <br />
        <Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> Sr No.</TableCell>

                    <TableCell>Name</TableCell>
                    <TableCell>vendor</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Shopname</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ordertime</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{ind + 1}</TableCell>

                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.vemail}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.quantity}</TableCell>
                      <TableCell>{user.shopname}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>{user.ordertime}</TableCell>
                      <TableCell>
                        {(() => {
                          if (user.status === "ReadyforPickup") {
                            return (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  const nth = {
                                    id: user._id,
                                  };

                                  axios
                                    .post(
                                      "http://localhost:4000/user/emphasis",
                                      nth
                                    )
                                    .then((response) => {
                                      alert(response.data);
                                      window.location.reload(false);
                                      console.log(response.data);
                                    });
                                }}
                              >
                                PickUp
                              </Button>
                            );
                          }
                        })()}
                      </TableCell>
                      <TableCell>
                        {user.status === "completed" &&
                        user.ratstatus === "false" ? (
                          isRatingVisible && selectedUser === user ? (
                            <div>
                              <input
                                type="number"
                                min="0"
                                max="5"
                                value={userRating}
                                onChange={handleRatingChange}
                              />
                              <Button
                                variant="contained"
                                onClick={handleSubmitRating}
                              >
                                Submit Rating
                              </Button>
                            </div>
                          ) : showButtons ? (
                            <Button
                              variant="contained"
                              onClick={() => handleRateButtonClick(user)}
                            >
                              Rate Item
                            </Button>
                          ) : null
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FoodLista;
