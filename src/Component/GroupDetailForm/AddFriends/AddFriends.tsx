import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "./AddFriends.css";

interface Friend {
  id: number;
  task: string;
}

const AddFriends = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState<Friend[]>([]);

  const handleClick = () => {
    const id = list.length + 1;
    setList((prev: Friend[]) => [
      ...prev,
      {
        id: id,
        task: name,
      },
    ]);
    setName("");
  };

  const handleDelete = (id: number) => {
    setList((prev: Friend[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <p className="title">Add Friends</p>
      <TextField
        id="outlined-basic"
        label="Add"
        variant="outlined"
        className="addfriends"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <span>
        <Button
          variant="contained"
          className="add"
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
