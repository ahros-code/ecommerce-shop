import css from "./RecommendCard.module.css"
import {Link} from "react-router-dom";

const RecommendCard = (props) => {
  const {discountPrice, name, id, image} = props;
  return (
      <div className={css.wrapper}>
        <Link to={`/products/${id}`}>
          <img src={`${import.meta.env.VITE_BACK_URL}${image}`} alt={`${name}'s image`}/>
          <div className={css.textWrapper}>
            <h4 className={css.price}>${discountPrice}</h4>
            <p className={css.name}>{name}</p>
          </div>
        </Link>
      </div>
  )
}

export default RecommendCard;