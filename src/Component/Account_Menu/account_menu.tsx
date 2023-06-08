import * as React from "react";
import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

type AccountMenuProps = {
  src: string;
};

const AccountMenu: React.FC<AccountMenuProps> = (props: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const src = "/broken-image.jpg";
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Link
          to="/payment"
          style={{ textDecoration: "none", color: "inherit", minWidth: '13rem', marginLeft: '21px', marginTop:'15px' }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }}>Transaction</Typography>
        </Link>
        <Link
          to="/history"
          style={{ textDecoration: "none", color: "inherit", minWidth: '13rem', marginTop:'15px' }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }}>History</Typography>
        </Link>
        <Link
          to="/check-landing"
          style={{ textDecoration: "none", color: "inherit", minWidth: '13rem', marginTop:'15px' }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }}>Landing-Borrowing</Typography>
        </Link>
        <div className="avatar" style={{ marginLeft: "auto" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AvatarGroup>
              <Avatar src={props.src} />
            </AvatarGroup>
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
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default React.memo(AccountMenu);
