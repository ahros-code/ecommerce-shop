import css from "./Offers.module.css";
import useFetch from "../../hooks/useFetch.jsx";
import OfferCard from "../OfferCard/OfferCard.jsx";
import {Link} from "react-router-dom";

const Offers = () => {
  const {data: offers} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/discount/products?pageSize=5`)
  return (
      <div className={css.wrapper}>
        <div className={css.sections}>
          <div className={css.leftSection}>
            <h3 className={css.leftSectionText}>Deals and offers</h3>
            <Link to={"/category/all"} className={css.link}>
              <div className={css.btn}>View more</div>
            </Link>
          </div>
          <div className={css.rightSection}>
            {offers?.data?.map((offer, index) => (
                <OfferCard key={index} image={offer.ImageModel.link} name={offer.name} discountPrice={offer.discountPrice} price={offer.price} id={offer.id}/>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Offers;