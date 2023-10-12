import css from "./Shop.module.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ShopProductCard from "../../components/ShopProductCard/ShopProductCard.jsx";

const Shop = () => {
  const {token} = useContext(AuthContext);
  const [age, setAge] = useState("");
  const [shopData, setShopData] = useState(null);
  const [shopProducts, setShopProducts] = useState(null);

  const config = {
    headers: {
      token: token,
    },
  };

  useEffect(() => {

    // Send the GET request
    axios
        .get(`${import.meta.env.VITE_BACK_URL}/api/shop/get`, config)
        .then((response) => {
          setShopData(response.data); // Save the response to state
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
  }, []);

  useEffect(() => {
    if (shopData) {
      const id = shopData?.data?.id;
      axios
          .get(`${import.meta.env.VITE_BACK_URL}/api/products/shop/${id}`, config)
          .then((response) => {
            setShopProducts(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }, [shopData]);

  const handleRefetch = async (deletedProductId) => {
    try {
      // Make an HTTP request or perform any data fetching operation
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/products/shop/${shopData?.data?.id}`);

      // Update the products state with the updated data
      setShopProducts(response.data)

      // Optionally perform any additional logic based on the deletedProductId
      // For example, show a success message or update the UI in a specific way
    } catch (error) {
      console.error("Error refetching products:", error);
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.imageWrapper}>
            <img
                src={`${import.meta.env.VITE_BACK_URL}${shopData?.data?.ImageModel.link}`}
                alt={`shop's image`}
                className={css.image}
            />
          </div>
          <div className={css.shopNameWrapper}>
            <h4 className={css.shopName}>{shopData?.data?.name}</h4>
          </div>
        </div>
        <div className={css.subHeader}>
          <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              style={{width: "300px", height: "20px"}}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                style={{width: "120px"}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={css.main}>
          {shopProducts?.map((product, index) => (
              <ShopProductCard key={index} productName={product.name} productImage={product.ImageModel.link}  price={product.price} id={product.id} refetch={handleRefetch} />
          ))}
        </div>
      </div>
  );
};

export default Shop;