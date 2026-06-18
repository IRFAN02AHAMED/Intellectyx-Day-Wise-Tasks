import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/zustand/useAuthStore";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Login() {
  const [username, setUsername] = useState("");

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    login({
      username,
    });

    navigate("/messages/create");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3 }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            sx={{ mb: 3 }}
          />

          <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                    bgcolor: "#4CAF50",
                    "&:hover": {
                    bgcolor: "#43A047",
                    },
                }}
                >
                Login
                </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;