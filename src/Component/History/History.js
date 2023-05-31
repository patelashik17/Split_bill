import React, { useCallback, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./History.css";
import AccountMenu from "../Account_Menu/account_menu";

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

const url="https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json";

const History = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(url);
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
    if (setUsers === 0) {
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
      <AccountMenu />
      
      <div className="history">     
        {loading && (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <form>
          <div className="historytable">
            <h2 className="titlehistory">Transaction History</h2>
            <b>
              <h3 className="totalamount">Total Expense: {totalAmount()}</h3>
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
                      <tr key={index}>
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
