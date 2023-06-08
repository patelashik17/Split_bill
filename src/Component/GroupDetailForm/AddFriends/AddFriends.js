import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "./AddFriends.css";

const AddFriends = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const handleClick = () => {
    const id = list.length + 1;
    setList((prev) => [
      ...prev,
      {
        id: id,
        task: name,
      },
    ]);
    setName("");
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <p className={classes.title}>Add Friends</p>
      <TextField
        id="outlined-basic"
        label="Add"
        variant="outlined"
        className={classes.addfriends}
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <span>
        <Button
          variant="contained"
          className={classes.add}
          size="small"
          onClick={handleClick}
          sx={{ ml: 1, mt: 2 }}
        >
          Add
        </Button>
      </span>
      <div>
        {list.map((nameList) => (
          <Chip
            key={nameList.id}
            variant="outlined"
            label={nameList.task}
            onClick={() => handleDelete(nameList.id)}
            onDelete={() => handleDelete(nameList.id)}
            sx={{ mt: 1 }}
          />
        ))}
      </div>
    </>
  );
};

export default AddFriends;
