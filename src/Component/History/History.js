import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckLanding from "./CheckLanding";
import "./History.css";
import Navbar from "../Navbar/Navbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48rem",
  bgcolor: "#d0bdf4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "30px",
};

const History = () => {
  const [users, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      if (data && Object.keys(data).length > 0) {
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = () => {
    if (Object.keys(users).length === 0) {
      return 0;
    }
    let sum = 0;
    Object.values(users).forEach((user) => {
      const inputAmount = parseInt(user.inputAmount);
      if (!isNaN(inputAmount)) {
        sum += inputAmount;
      }
    });
    return sum;
  };

  return (
    <div>
      <Navbar />
      <div>
        <Button onClick={handleOpen} className="check" variant="contained">
          Calculate All Total
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <CheckLanding />
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="history">
        {loading && (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <form>
          <div className="historyTable">
            <h2 className="title_history">Transaction History</h2>
            <b>
              <h3 className="totalAmount">Total Expense: {totalAmount()}</h3>
            </b>
            <table>
              <thead>
                <tr>
                  <th>Payer Name</th>
                  <th>Transaction Title</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(users).map((curUser, index) => {
                  if (index > 0) {
                    return (
                      <tr key={index} className="row">
                        <td>{curUser.selectedOption}</td>
                        <td>{curUser.inputTitle}</td>
                        <td>{curUser.inputAmount}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default History;
