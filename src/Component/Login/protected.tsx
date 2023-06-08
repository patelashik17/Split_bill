import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props:any) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (!login) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
