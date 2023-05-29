import React, { useState, useEffect } from "react"; // Importing necessary dependencies
import TextField from "@mui/material/TextField"; // Importing TextField component from Material-UI
import Button from "@mui/material/Button"; // Importing Button component from Material-UI
import Chip from "@mui/material/Chip"; // Importing Chip component from Material-UI
import classes from './AddFriends.classes.css'; // Importing CSS styles

const AddFriends = () => {
  const [name, setName] = useState(""); // Creating state variable 'name' and its setter function 'setName'
  const [list, setList] = useState([]); // Creating state variable 'list' and its setter function 'setList'

  const handleClick = () => {
    const id = list.length + 1; // Generate a unique ID based on the length of the current list
    setList((prev) => [
      ...prev,
      {
        id: id,
        task: name,
      },
    ]); // Add a new friend object to the list using the previous state and the entered name
    setName(""); // Reset the 'name' state variable to an empty string
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id)); // Remove a friend from the list based on the provided ID
  };

  return (
    <>
      <p className={classes.title}>Add Friends</p> {/* Displaying a title "Add Friends" using CSS class 'title' */}
      <TextField
        id="outlined-basic"
        label="Add"
        variant="outlined"
        className={classes.AddFriends} // Applying CSS class 'AddFriends' to the TextField component
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }} // Applying additional styling using the Material-UI sx prop
      />
      <span>
        <Button
          variant="contained"
          className={classes.Add} // Applying CSS class 'Add' to the Button component
          size="small"
          onClick={handleClick} // Trigger the 'handleClick' function when the button is clicked
          sx={{ ml: 1, mt: 2 }} // Applying additional styling using the Material-UI sx prop
        >
          Add
        </Button>
      </span>
      <div>
        {list.map((nameList) => (
          <Chip
            key={nameList.id}
            label={nameList.task}
            onClick={() => handleDelete(nameList.id)} // Trigger the 'handleDelete' function when the chip is clicked
            onDelete={() => handleDelete(nameList.id)} // Trigger the 'handleDelete' function when the delete icon on the chip is clicked
            sx={{ mt: 1 }} // Applying additional styling using the Material-UI sx prop
          />
        ))}
      </div>
    </>
  );
};

export default AddFriends;
