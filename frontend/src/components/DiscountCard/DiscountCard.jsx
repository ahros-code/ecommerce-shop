import css from "./DiscountCard.module.css";

const DiscountCard = () => {
  return (
      <div className={css.wrapper}>
        <div className={css.firstCard}>
            <h3 className={css.firstCardText}>Get US $10 off <br /> with a new <br /> supplier</h3>
        </div>
        <div className={css.secondCard}>
          <h3 className={css.secondCardText}>Send quotes with <br /> supplier <br /> preferences</h3>
        </div>
      </div>
  )
}

export default DiscountCard;