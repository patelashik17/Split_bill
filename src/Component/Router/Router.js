import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupForm from "../GroupDetailForm/GroupForm";
import Login from "../Login/Login";
import Payment from "../Payment/payment";
import History from "../History/History";
import Protected from "../Login/protected";
import checkLanding from "../Landing_Borrowing/CheckLanding";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<Protected Component={GroupForm} />} />
        <Route path="/payment" element={<Protected Component={Payment} />} />
        <Route path="/history" element={<Protected Component={History} />} />
        <Route
          path="/check-landing"
          element={<Protected Component={checkLanding} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
