import css from "./Shop.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";

const Shop = () => {
  const {token} = useContext(AuthContext)

  const {data: ShopData} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/shop/get`, {headers: {token}});

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.imageWrapper}>
            <img src={`${import.meta.env.VITE_BACK_URL}${ShopData?.data?.ImageModel.link}`} alt={`shop's image`} className={css.image} />
          </div>
          <div className={css.shopNameWrapper}>
            <h4 className={css.shopName}>{ShopData?.data?.name}</h4>
          </div>
        </div>
        <div className={css.subHeader}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: "300px", height: "20px"}} />
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
      </div>
  )
}

export default Shop;