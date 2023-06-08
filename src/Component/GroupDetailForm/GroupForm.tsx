import React, { useState, FormEvent } from "react";
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

interface GroupData {
  id: string;
  groupName: string;
  friendsList: any[];
}

interface StateProps {
  group: {
    list: any[];
    error: boolean;
    loading: boolean;
    redirecting: boolean;
    errorMessage: string;
    groupNameError: boolean;
    groupNameErrorMessage: string;
  };
}

const GroupForm: React.FC = () => {
  const [group, setGroup] = useState<GroupData[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [groupCreated, setGroupCreated] = useState<boolean>(false);
  const {
    error,
    loading,
    redirecting,
    errorMessage,
    groupNameError,
    groupNameErrorMessage,
  } = useSelector((state: StateProps) => state.group);
  const list = useSelector((state: StateProps) => state.group.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (name.trim().length === 0) {
      return null;
    } else {
      const id = uuidv4();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      dispatch(addFriend({ friendId: id, task: capitalizedName }));
      setName("");
    }
  };

  const postData = async (groupName: string, friendsList: any[]) => {
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
      const newData: GroupData = { id: data.id, groupName, friendsList };
      setGroup((prevGroups) => [...prevGroups, newData]);
      setGroupCreated(true);
      setGroupName(""); 
      dispatch({ type: "RESET_ERROR" }); 
    }
  };

  const handleDelete = (friendId: number) => {
    dispatch(removeFriend(friendId));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const enteredGroupName = form.groupName.value;
    const friendsList = list?.map((item: any) => item.task);
    if (enteredGroupName.trim() === "") {
      dispatch({ type: "SET_GROUP_NAME_ERROR", payload: "Enter group name" });
  
    }
    if (friendsList.length <= 1 && groupName.length === 0) {
      dispatch({ type: "SET_ERROR", payload: "Enter two friend names" });
      return null;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await postData(enteredGroupName, friendsList);
      if (friendsList.length > 1 && groupName.length > 1) {
        dispatch({ type: "SET_REDIRECTING", payload: true });
        console.log('hii');
        navigate("/payment");
      }
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div>
      <AccountMenu src={""} />
      <div className="full_groupForm">
        <form className="groupForm" onSubmit={handleSubmit}>
          <h2 className="groupNameLabel">Group Name</h2>
          <TextField
            id="filled-required"
            label="Enter Your Group name"
            className="groupName"
            name="groupName"
            variant="outlined"
            value={groupName} // Set the value of the group name field
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setGroupName(e.target.value)}
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
            {list?.map((nameList: any) => (
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
