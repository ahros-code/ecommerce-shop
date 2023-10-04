import css from "./ProductCard.module.css"
import {Link} from "react-router-dom";

const ProductCard = (props) => {
  const {image, name, price, id} = props;
  return (
      <div className={css.wrapper}>
        <Link to={`/products/${id}`}>
          <div className={css.sections}>
            <div className={css.textSection}>
              <h4 className={css.name}>{name}</h4>
              <p className={css.price}>From <br /> {price} USD</p>
            </div>
            <div className={css.imageSection}>
              <img src={`${import.meta.env.VITE_BACK_URL}${image}`} alt={name} className={css.image}/>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default ProductCard