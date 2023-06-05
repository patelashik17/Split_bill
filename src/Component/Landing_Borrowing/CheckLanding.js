import React, { useState, useEffect } from "react";
import "./CheckLanding.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AccountMenu from "../Account_Menu/account_menu";

const Landing = () => {
  const [friendList, setFriendList] = useState([]);
  const [userBalances, setUserBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [whoPaidWho, setWhoPaidWho] = useState([]);

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

    const updatedUserBalances = [];

    friendList.forEach((friend) => {
      const inputAmount = parseInt(friend.inputAmount);
      if (!isNaN(inputAmount)) {
        const selectedOption = friend.selectedOption;
        const givenAmount = updatedUserBalances.find(
          (balance) => balance.name === selectedOption
        );
        if (givenAmount) {
          givenAmount.amount += inputAmount;
        } else {
          updatedUserBalances.push({
            name: selectedOption,
            amount: inputAmount,
          });
        }
      }
    });

    const totalAmount = updatedUserBalances.reduce(
      (total, balance) => total + balance.amount,
      0
    );
    const averageAmount = totalAmount / updatedUserBalances.length;

    updatedUserBalances.forEach((balance) => {
      balance.receivedAmount = balance.amount - averageAmount;
    });

    setUserBalances(updatedUserBalances);
    console.log("console", updatedUserBalances);
    let updatedWhoPaidWho = [];

    let remainingAmount;
    let loopCount = 0;
    const maxLoopCount = 100;

    do {
      remainingAmount = Math.abs(
        Math.max(...updatedUserBalances.map((item) => item.receivedAmount))
      );

      if (remainingAmount !== 0 && loopCount < maxLoopCount) {
        let sorted = [...updatedUserBalances].sort(
          (a, b) => a.receivedAmount - b.receivedAmount
        );
        let debtor = sorted[0];
        let creditor = sorted[sorted.length - 1];
        if (debtor && creditor) {
          let amountToSettle = Math.min(
            Math.abs(debtor.receivedAmount),
            Math.abs(creditor.receivedAmount)
          );

          updatedWhoPaidWho.push(
            debtor.name +
              " should give to " +
              creditor.name +
              " this much: " +
              Math.floor(amountToSettle)
          );

          debtor.receivedAmount += amountToSettle;
          creditor.receivedAmount -= amountToSettle;

          loopCount++;
        }
      }
    } while (remainingAmount !== 0 && loopCount < maxLoopCount);

    if (loopCount >= maxLoopCount) {
      console.log(
        "Loop limit reached. Balances could not be settled completely."
      );
    }
    console.log("Who Paid Who:", updatedWhoPaidWho);
    setWhoPaidWho(updatedWhoPaidWho);
  }, [friendList]);

  return (
    <>
      <AccountMenu />
      <div className="box">
        <center>
          <h3 className="divided">Divided Expense</h3>
        </center>
        <table className="class_table">
          <thead>
            <tr>
              <td>Friend Name</td>
              <td>Amount Given</td>
            </tr>
          </thead>
          <tbody>
            {userBalances?.map((balance) => (
              <tr key={balance.name} className="row">
                <td>{balance.name}</td>
                <td>{balance.amount > 0 ? balance.amount : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mini_box">
        {whoPaidWho?.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Landing;
