import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setChildList,
  setInputAmount,
  setInputTitle,
  setIsSuccess,
  setSelectedOption,
} from "./redux/action/action";
import { Button, Snackbar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AccountMenu from "../Account_Menu/account_menu";
import "./payment.css";

interface PaymentProps {
  payment: {
    error: boolean;
    childList: any;
    selectedOption: string;
    inputAmount: string;
    inputTitle: string;
    isSuccess: boolean;
  };
}

const url = "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json";

const Payment: React.FC<PaymentProps> = () => {
  const selectedOption = useSelector(
    (state: PaymentProps) => state.payment.selectedOption
  );
  const error = useSelector((state: PaymentProps) => state.payment.error);
  const childList = useSelector((state: PaymentProps) => state.payment.childList);
  const inputAmount = useSelector(
    (state: PaymentProps) => state.payment.inputAmount
  );
  const inputTitle = useSelector((state: PaymentProps) => state.payment.inputTitle);
  const isSuccess = useSelector((state: PaymentProps) => state.payment.isSuccess);

  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data) {
        const childValue = data[Object.keys(data)[0]];
        console.log("child", childValue);
        dispatch(setChildList(childValue.friendsList));
        console.log(childValue.friendsList);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDropdown = (event: any) => {
    dispatch(setSelectedOption(event.target.value));
  };

  const handleInputTitle = (event: any) => {
    dispatch(setInputTitle(event.target.value));
  };

  const handleInputAmount = (event: any) => {
    dispatch(setInputAmount(event.target.value));
  };

  const addPaymentValue = async (event: any) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (
      inputTitle.trim() === "" ||
      inputAmount.trim() === "" ||
      !selectedOption
    ) {
      setIsFieldEmpty(true);
      dispatch(setIsSuccess(false));
      return;
    }

    setIsFieldEmpty(false);

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
        dispatch(setInputTitle(""));
        dispatch(setInputAmount(""));
        dispatch(setSelectedOption(""));
        dispatch(setIsSuccess(true));
        dispatch(setError(false));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AccountMenu src=""/>
      <div className="alldisplay">
        <form className="paymentform" onSubmit={addPaymentValue}>
          <div>
            <p className="payer">Payer</p>
            <Box
              sx={{ minWidth: 120, backgroundColor: "white", ml: "-6rem" }}
              className="box-payment"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOption}
                  label="Name"
                  onChange={handleDropdown}
                >
                  {childList?.length > 0 &&
                    childList.map((friend:any) => (
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
          {isFormSubmitted && isFieldEmpty && (
              <p className="errormsg">Fill all fields</p>
            )}
            <Button variant="contained" type="submit" sx={{ mt: 5 }}>
              Payment
            </Button>
            {isSuccess && (
              <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                onClose={() => dispatch(setIsSuccess(false))}
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
