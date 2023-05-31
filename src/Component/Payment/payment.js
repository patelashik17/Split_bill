import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import "./payment.css";   
import AccountMenu from "../Account_Menu/account_menu";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const url = "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json";

const Payment = () => {
  const [childList, setChildList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback (async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data) {
        const childValue = data[Object.keys(data)[0]];
        console.log(childValue);
        setChildList(childValue.friendsList);
      } else {
        console.log("No data found");
      }
    } catch (error) {     
      console.log("Error fetching data:", error);
    }
  },[childList]);

  const memoizeFetchData=useMemo(()=>fetchData,[fetchData]);

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
    event.preventDefault();

    if (
      inputTitle.trim() === "" ||
      inputAmount.trim() === "" ||
      !selectedOption
    ) {
      setErrorMessage(true);
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          inputTitle,
          inputAmount,
          selectedOption,
        }),
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
        setInputTitle("");
        setInputAmount("");    
        setSelectedOption("");
        setIsSuccess(true);  
        setErrorMessage(false);
      }
    } catch (error) {  
      console.error(error);
    }
  };

  return (
    <div>
      <AccountMenu />
      <div className="alldisplay">
        <form className="paymentform" onSubmit={addPaymentValue}>
          <div>
            <p className="payer">Payer</p>
            <Box sx={{ minWidth: 120, backgroundColor: "white", ml: "-6rem" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={selectedOption}
                  label="Name"
                  name="option"
                  id="option"
                  onChange={handleDropdown}
                >
                  {childList.length > 0 &&
                    childList.map((friend) => (
                      <MenuItem key={friend} value={friend}>
                        {friend}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <p className="paymenttitle">Payment Title</p>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={inputTitle}
              onChange={handleInputTitle}
              sx={{ mt: 2 }}
            />
          </div>
          <div>
            <p className="paymentprice">Price</p>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              label="Amount"
              onChange={handleInputAmount}
              value={inputAmount}
              variant="outlined"
            />
          </div>
          <div>
            {errorMessage && <p className="errormsg">Fills are fields</p>}
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 5 }}
            >
              Payment
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
