import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "./GroupForm.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AccountMenu from "../Account_Menu/account_menu";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, removeFriend } from "./redux/action/action";
import { v4 as uuidv4 } from "uuid";

const GroupForm = () => {
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const {
    error,
    loading,
    redirecting,
    errorMessage,
    groupNameError,
    groupNameErrorMessage,
  } = useSelector((state) => state.group);
  const list = useSelector((state) => state.group.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (name.trim().length === 0) {
      return null;
    } else {
      const id = uuidv4();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      dispatch(addFriend({ friendId: id, task: capitalizedName }));
      console.log(addFriend);
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

  const handleDelete = (friendId) => {
    dispatch(removeFriend(friendId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const groupName = form.groupName.value;
    const friendsList = list?.map((item) => item.task);
    if (name.trim() === "") {
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Enter group name" });
    }
    if (friendsList.length <= 1 && group.length === 0) {
      dispatch({ type: "SET_ERROR", payload: "Enter two Friend Name" });
      return null;
    }
    dispatch({ type: "SET_LOADING", payload: "true" });
    try {
      await postData(groupName, friendsList);
      if (friendsList.length > 1 && group.trim().length > 1) {
        // Only redirect if the friend list is valid
        dispatch({ type: "SET_REDIRECTING", payload: "true" });
        setTimeout(() => {
          navigate("/payment");
        }, 1000);
      }
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
            variant="outlined"
            onChange={(e) => setGroup(e.target.value)}
          />
          {groupNameError ? (
            <p className="error">{groupNameErrorMessage}</p>
          ) : null}
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
          {error ? <p className="error">{errorMessage}</p> : null}
          <div className="chipContainer">
            {list?.map((nameList) => (
              <Chip
                className="chipName"
                key={nameList.friendId}
                label={nameList.task}
                onDelete={() => handleDelete(nameList.friendId)}
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
