import css from "./Sidebar.module.css";
import {Link} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";

const Sidebar = ({categories, brand}) => {
  const categoryNames = categories?.map(category => category.CategoryModel.name)
  const brandNames = brand?.map(brand => brand.BrandModel.name)

const uniqueCategories = [...new Set(categoryNames)]
const unuqueBrands = [...new Set(brandNames)]
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      console.log('Checkbox is checked'); // make it as navigation request to /search?brand=Asus
    }
  };
  return (
      <div className={css.wrapper}>
        <div className={css.category}>
          <h6 className={css.title}>Category</h6>
          {
            uniqueCategories.map((name, i) => (
              <Link to={"/search"}>
                <p key={i} className={css.item}>{name}</p>
              </Link>
            ))
          }
        </div>
        <div className={css.brands}>
          <h6 className={css.title}>Brands</h6>
          {
            unuqueBrands.map((name, i) => (
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label={name}
                />
            ))
          }
        </div>
      </div>
  );
};

export default Sidebar;