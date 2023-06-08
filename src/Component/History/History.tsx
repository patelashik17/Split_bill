import AccountMenu from "../Account_Menu/account_menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/action/action";
import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./History.css";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import { AnyAction } from "redux";

interface HistoryProps {
  history: {
    users: {};
    error: boolean;
    loading: boolean;
    user: {};
  };
}

const History: React.FC = () => {
  const users = useSelector((state: HistoryProps) => state.history.users);
  const loading = useSelector((state: HistoryProps) => state.history.loading);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>(); // Add ThunkDispatch type

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

 

  const totalAmount = () => {
    if (Object.keys(users).length === 0) {
      return 0;
    }
    let sum = 0;
    Object.values(users).forEach((user: any) => {
      const inputAmount = parseInt(user.inputAmount);
      if (!isNaN(inputAmount)) {
        sum += inputAmount;
      }
    });
    return sum;
  };

  return (
    <div>
      <AccountMenu src="" />

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
                {Object.values(users).map((curUser: any, index) => {
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
