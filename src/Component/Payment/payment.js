import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import "./payment.css";

import { useSnackbar } from "notistack";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const url = "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [childList, setChildList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [inputTitle, setInputTitle] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [user, setUser] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [paymentCount, setPaymentCount] = useState(0);

  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHistoryButtonClick = () => {
    navigate("/history");
  };
  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);
      if (data) {
        const childValue = data[Object.keys(data)[0]];
        console.log(childValue);
        setChildList(childValue.friendsList);
        const childArray = Object.entries(childValue).map(([key, value]) => {});
        setFriendList(childArray);

        // Update the paymentCount state
        const count = Object.entries(childValue).filter(
          ([key, value]) => key !== "friendsList"
        ).length;
        setPaymentCount(count);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdown = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleInputAmount = (event) => {
    setInputAmount(event.target.value);
  };

  const addPaymentValue = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (
      inputTitle.trim() === "" ||
      inputAmount.trim() === "" ||
      !selectedOption
    ) {
      // If any of the required fields are empty, display an error message
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ inputTitle, inputAmount, selectedOption }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        const newUser = {
          id: data.id,
          inputTitle,
          inputAmount,
          selectedOption,
        };
        setUser((prevUser) => [...prevUser, newUser]);
        setInputTitle("");
        setInputAmount("");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="allDisplay">
        <form className="paymentForm" onSubmit={addPaymentValue}>
          <div>
            <p className="payer">Payer</p>
            <select
              className="dropdown"
              name="option"
              id="option"
              onChange={handleDropdown}
              required
            >
              <option value="">select one</option>
              {childList.length > 0 &&
                childList.map((friend) => (
                  <option key={friend} value={friend}>
                    {friend}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <p className="paymentTitle">Payment Title</p>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={inputTitle}
              onChange={handleInputTitle}
              sx={{ mt: 2 }}
              required
            />
          </div>
          <div>
            <p className="paymentPrice">Price</p>
            <FormControl
              fullWidth
              sx={{ m: 1, ml: 3 }}
              variant="filled"
              required
            >
              <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={inputAmount}
                onChange={handleInputAmount}
                startAdornment={
                  <InputAdornment position="start">(₹)</InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={() => {
                if (
                  inputTitle.trim() === "" ||
                  inputAmount.trim() === "" ||
                  !selectedOption
                ) {
                  setErrorMessage("Please fill in all the fields.");
                } else {
                  handleClick({
                    vertical: "top",
                    horizontal: "center",
                  })();
                }
              }}
              sx={{ mt: 5, ml: "3rem" }}
            >
              Payment
            </Button>
            <Button
              variant="contained"
              className="History_btn"
              onClick={handleHistoryButtonClick}
              sx={{ mt: 5, ml: "2rem" }}
            >
              Show History
            </Button>
            {isSuccess && (
              <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                onClose={() => setIsSuccess(false)}
                message="Data is added"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
