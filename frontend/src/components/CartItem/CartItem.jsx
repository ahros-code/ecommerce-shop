import css from "./CartItem.module.css"

const CartItem = ({productName, productImage, shopName}) => {
  return (
      <div className={css.wrapper}>
        <div className={css.image}>
          <img src={`${import.meta.env.VITE_BACK_URL}${productImage}`} alt={`${productName}'s image`} />
        </div>
        <div className={css.information}>
          <h4 className={css.productTitle}>{productName}</h4>
          <p className={css.shopTitle}>Shop: {shopName}</p>
        </div>
      </div>
  )
}

export default CartItem;