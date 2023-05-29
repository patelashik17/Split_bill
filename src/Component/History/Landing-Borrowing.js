import React, { useState, useEffect } from "react";
import "./Landing.css";

const Landing = () => {
  const [friendList, setFriendList] = useState([]);
  const [uniqueNames, setUniqueNames] = useState({});
  const [dividedAmount, setDividedAmount] = useState(0);

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
      const friendList = Object.values(data);
      console.log("Friend List:", friendList);
      setFriendList(friendList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (friendList.length === 0) {
      setUniqueNames({});
      setDividedAmount(0);
      return;
    }

    let sum = 0;
    const updatedUniqueNames = {};

    friendList.forEach((user) => {
      const inputAmount = parseInt(user.inputAmount);
      if (!isNaN(inputAmount)) {
        sum += inputAmount;
        const selectedOption = user.selectedOption;
        if (updatedUniqueNames.hasOwnProperty(selectedOption)) {
          updatedUniqueNames[selectedOption] += inputAmount;
        } else {
          updatedUniqueNames[selectedOption] = inputAmount;
        }
      }
    });

    const newDividedAmount = sum / friendList.length;

    setUniqueNames(updatedUniqueNames);
    setDividedAmount(newDividedAmount);
  }, [friendList]);

  const totalAmount = Object.values(uniqueNames).reduce(
    (acc, amount) => acc + amount,
    0
  );

  const getGiveOrTakeAmount = (name, amount) => {
    if (name === "Ashik") {
      const ashikTotal = uniqueNames["Ashik"] || 0;
      const ashikShare = dividedAmount * friendList.length;
      const ashikDiff = ashikTotal - ashikShare;
      if (ashikDiff < 0) {
        return `Took $${Math.abs(ashikDiff)}`;
      } else if (ashikDiff > 0) {
        return `Gave $${ashikDiff}`;
      } else {
        return "";
      }
    } else {
      const ashikTotal = uniqueNames["Ashik"] || 0;
      const ashikShare = dividedAmount * friendList.length;
      const userShare =
        dividedAmount + (ashikTotal - ashikShare) / friendList.length;
      const userDiff = amount - userShare;

      // Check if the user gave or took money from Ashik
      if (userDiff < 0) {
        return `Gave $${Math.abs(userDiff)}`;
      } else if (userDiff > 0) {
        return `Took $${userDiff}`;
      } else {
        return "";
      }
    }
  };

  return (
    <>
      <div className="box">
        <center>
          <h3 className="divided">Divided Expense</h3>
          <div>
            <h3>Total Amount: {totalAmount}</h3>
          </div>
        </center>
        <table className="table_class">
          <thead>
            <tr className="row">
              <td className="data">Name</td>
              <td className="data">Total (person)</td>
              <td className="data">Divided Amount</td>
              <td className="data">Amount Lent</td>
              <td className="data">Amount Borrowed</td>
              <td className="data">Give or Take</td> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(uniqueNames).map(([name, amount]) => (
              <tr key={name} className="row">
                <td className="cell">{name}</td>
                <td className="cell">{amount}</td>
                <td className="cell">{dividedAmount}</td>
                <td className="cell">{amount > 0 ? amount : 0}</td>
                <td className="cell">{amount < 0 ? Math.abs(amount) : 0}</td>
                <td className="cell">
                  {getGiveOrTakeAmount(name, amount)}
                </td>{" "}
                {/* Display give or take amount */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Landing;
