import React, { useState, useEffect } from "react";
import "./CheckLanding.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Landing = () => {
  const [friendList, setFriendList] = useState([]);
  const [userBalances, setUserBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFriendList();
  }, []);

  const fetchFriendList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const friendList = Object.values(data);
      console.log("Friend List:", friendList);
      setFriendList(friendList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (friendList.length === 0) {
      setUserBalances([]);
      return;
    }

    const userBalances = [];

    friendList.forEach((friend) => {
      const inputAmount = parseInt(friend.inputAmount);
      if (!isNaN(inputAmount)) {
        const selectedOption = friend.selectedOption;
        const givenAmount = userBalances.find(
          (balance) => balance.name === selectedOption
        );
        if (givenAmount) {
          givenAmount.amount += inputAmount;
        } else {
          userBalances.push({ name: selectedOption, amount: inputAmount });
        }
      }
    });

    const totalAmount = userBalances.reduce(
      (total, balance) => total + balance.amount,
      0
    );
    const averageAmount = totalAmount / userBalances.length;

    userBalances.forEach((balance) => {
      balance.receivedAmount = balance.amount - averageAmount;
    });

    setUserBalances(userBalances);
  }, [friendList]);

  return (
    <>
      <div className="box">
        <center>
          <h3 className="divided">Divided Expense</h3>
        </center>
        <table className="class_table">
          <thead>
            <tr>
              <td>Friend Name</td>
              <td>Amount Given</td>
              <td>Amount Received</td>
            </tr>
          </thead>
          <tbody>
            {userBalances.map((balance) => (
              <tr key={balance.name} className="row">
                <td>{balance.name}</td>
                <td>{balance.amount > 0 ? balance.amount : 0}</td>
                <td>
                  {balance.receivedAmount > 0 ? balance.receivedAmount : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Landing;
