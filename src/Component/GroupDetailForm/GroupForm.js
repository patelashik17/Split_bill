import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "./GroupForm.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AccountMenu from "../Account_Menu/account_menu";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const GroupForm = () => {
  const [group, setGroup] = useState([]);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); 

  const navigate = useNavigate();

  const handleClick = () => {
    if (name.trim() === "") {
      setError(true);
    } else {
      const id = list.length + 1;
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setList((prev) => [
        ...prev,
        {
          id: id,
          task: capitalizedName,
        },
      ]);
      setName("");
    }
  };

  const postData = async (groupName, friendsList) => {
    const response = await fetch(
      "https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json",
      {
        method: "POST",
        body: JSON.stringify({ groupName, friendsList }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data) {
      const newData = { id: data.id, groupName, friendsList };
      setGroup((prevGroups) => [...prevGroups, newData]);
    }
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const groupName = form.groupName.value;
    const friendsList = list.map((item) => item.task);
    if (friendsList.length <= 1 && group.length === 0) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      await postData(groupName, friendsList);
      setRedirecting(true);
      setTimeout(() => {
        navigate('/payment');
      }, 1000); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AccountMenu />
      <div className="full_groupForm">
        <form className="groupForm" onSubmit={handleSubmit}>
          <h2 className="groupNameLabel">Group Name</h2>
          <TextField
            id="filled-required"
            label="Enter Your Group name"
            className="groupName"
            name="groupName"
            variant="filled"
          />
          {error && (
            <p className="error">Please enter group name.</p>
          )}
          <h2 className="title">Add Friends</h2>
          <div className="inputContainer">
            <TextField
              id="outlined-basic"
              label="Add"
              variant="outlined"
              className="AddFriends"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="plus_icon">
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleClick}
                size="small"
              >
                <AddIcon />
              </Fab>
            </span>
          </div>
          {error && (
            <p className="error">Please enter at least one friend's name.</p>
          )}
          <div className="chipContainer">
            {list.map((nameList) => (
              <Chip
                className="chipName"
                key={nameList.id}
                label={nameList.task}
                onDelete={() => handleDelete(nameList.id)}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="submit-btn"
            variant="contained"
            sx={{ mt: "3rem" }}
          >
            Create Group
          </Button>
          
          {loading && redirecting && (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
