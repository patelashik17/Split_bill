import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import "./account_menu.css";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <Box className="navbar_nav">
          <Link
            to="/payment"
            style={{ textDecoration: "none", color: "black", minWidth: 100 }}
          >
            <Typography
              sx={{
                minWidth: 100,
                fontWeight: "bold",
                marginLeft: "1rem",
                fontSize: "1.2rem",
              }}
            >
              Transaction
            </Typography>
          </Link>
          <Link
            to="/history"
            style={{ textDecoration: "none", color: "inherit", minWidth: 100 }}
          >
            <Typography
              sx={{
                minWidth: 100,
                fontWeight: "bold",
                marginLeft: "1.4rem",
                fontSize: "1.2rem",
              }}
            >
              History
            </Typography>
          </Link>
          <Link
            to="/check-landing"
            style={{ textDecoration: "none", color: "inherit", minWidth: 100 }}
          >
            <Typography
              sx={{ minWidth: 100, fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Landing-Borrowing
            </Typography>
          </Link>
          <div className="avatar">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src="/broken-image.jpg"
                ></Avatar>
              </IconButton>
            </Tooltip>
          </div>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );
}

export default React.memo(AccountMenu);
