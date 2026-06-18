import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Typography from "./Typography";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import useAuthStore from "../../store/zustand/useAuthStore";

function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
  logout();

  setTimeout(() => {
    navigate("/login");
  }, 100);
  };

  return (
    <header
      style={{
        width: "100%",
      }}
    >
      <Typography variant="h1">
        Message Board App
      </Typography>

      <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={8}
          sx={{
            mt: 3,
          }}
        >
          <nav
            className="nav-links"
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <Link to="/">Home</Link>

            <Link to="/messages/create">
              Create Messages
            </Link>

            <Link to="/messages">
              View Messages
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/company">
              Company
            </Link>
          </nav>

          {user && (
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "#4CAF50",
                width: 52,
            height: 52,
            fontSize: "1.4rem",
            fontWeight: 700, // change to your page green
    color: "white",
              }}
              onClick={() => setOpen(true)}
            >
              {user.username?.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Stack>

      {/* Logout Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          Logout of {user?.username}?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default Header;