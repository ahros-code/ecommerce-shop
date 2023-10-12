import React, {useContext, useState} from 'react';
import { Modal, Button, TextField, TextareaAutosize, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext.jsx";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
`;

const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CustomModal = ({ onClose, shopId }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPrice: '',
    warranty: '',
    size: '',
    model: '',
    design: '',
    pcs: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const {token} = useContext(AuthContext);
  const handleSubmit = (e) => {

    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discountPrice', formData.discountPrice);
    formDataToSend.append('warranty', formData.warranty);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('model', formData.model);
    formDataToSend.append('design', formData.design);
    formDataToSend.append('pcs', formData.pcs);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('img', formData.image);
    formDataToSend.append('shopId', shopId);

    const config = {
      headers: {
        token: token,
      },
    };

    axios
        .post(`${import.meta.env.VITE_BACK_URL}/api/shop/new/product`, formDataToSend, config)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          // Close the modal or perform any other actions
          onClose();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
  };

  return (
      <StyledModal open={true} onClose={onClose}>
        <StyledForm onSubmit={handleSubmit}>
          <ModalContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Discount Price"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Warranty"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="Design"
                    name="design"
                    value={formData.design}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    label="PCS"
                    name="pcs"
                    value={formData.pcs}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    minRows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" onChange={handleImageChange} />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </ModalContent>
        </StyledForm>
      </StyledModal>
  );
};

export default CustomModal;