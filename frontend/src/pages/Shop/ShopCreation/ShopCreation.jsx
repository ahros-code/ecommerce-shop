import React, { useContext } from "react";
import { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {SellerContext} from "../../../context/SellerContext.jsx";

const ShopCreationContainer = styled("div")({
  width: 500,
  marginRight: "200px",
  padding: 20,
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: 4,
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const StyledTextField = styled(TextField)({
  marginBottom: 16,
});

const StyledButton = styled(Button)({
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const ShopCreation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const { token } = useContext(AuthContext);
  const {isSeller, setIsSeller} = useContext(SellerContext)

  const config = {
    headers: {
      token: token,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("img", file);

    const res = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/shop/new`,
        formData,
        config
    )
    if(res.statusText === "Created" && res.status === 201){
      setIsSeller(true)
      localStorage.setItem("isSeller", "true")
    }
  };

  return (
      <ShopCreationContainer>
        <h1 style={{marginBottom: "20px"}}>Create Shop</h1>
        <FormContainer onSubmit={handleSubmit}>
          <StyledTextField
              label="Name"
              value={name}
              onChange={handleNameChange}
          />
          <StyledTextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
          />
          <StyledTextField
              label="Country"
              value={country}
              onChange={handleCountryChange}
          />
          <Button
              style={{
                marginBottom: "30px"
              }}
              variant="contained"
              component="label"
          >
            Upload File
            <input
                type="file"
                hidden
                onChange={handleFileChange}
            />
          </Button>
          <StyledButton type="submit" variant="contained" color="primary">
            Create
          </StyledButton>
        </FormContainer>
      </ShopCreationContainer>
  );
};

export default ShopCreation;