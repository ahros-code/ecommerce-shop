import css from "./OfferCard.module.css"
import {Link} from "react-router-dom";

const OfferCard = props => {
  const {image, name, discountPrice, price, id} = props;
  const percentageDecrease = Math.round(((price - discountPrice) / price) * 100)
  return (
      <Link to={`products/${id}`} className={css.linkWrapper}>
        <div className={css.wrapper}>
          <img src={`${import.meta.env.VITE_BACK_URL}${image}`} alt={`${name}'s image`} className={css.image}/>
          <h4 className={css.name}>{name}</h4>
          <p className={css.discount}>-{percentageDecrease}%</p>
        </div>
      </Link>
  )
}

export default OfferCard;