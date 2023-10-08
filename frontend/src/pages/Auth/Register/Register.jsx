import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext.jsx";

const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const {setToken} = useContext(AuthContext)

  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", file);


    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/auth/register`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.data[1].token;
        if (token) {
          localStorage.setItem("token", token);
          setToken(token)
          navigate("/");
        }
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                  variant="contained"
                  component="label"
                  style={{
                    marginTop: 20
                  }}
              >
                Upload Avatar
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileUpload(e.target.files)}
                />
              </Button>

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}