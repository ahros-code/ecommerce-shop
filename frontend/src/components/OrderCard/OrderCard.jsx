import css from "./OrderCard.module.css"

const OrderCard = ({orders}) => {
  return (
      <div className={css.wrapper}>
        {orders.map((order, index) => (
            <div key={index} className={css.cardWrapper}>
              <div className={css.card}>
                <img src={`${import.meta.env.VITE_BACK_URL}${order.ProductModel.ImageModel.link}`} alt="salom"/>
              </div>
              <div className={css.sec}>

                <div className={css.secWrapper}>
                  <div className={css.name}>
                    Name
                  </div>
                  <div className={css.value}>
                    {order.ProductModel.name}
                  </div>
                </div>
                <div className={css.secWrapper}>
                  <div className={css.name}>
                    Price
                  </div>
                  <div className={css.value}>
                    ${order.ProductModel.discountPrice}
                  </div>
                </div>
              </div>
              <div className={css.review}>
                Give feedback
              </div>
            </div>
        ))}
      </div>
  )
}

export default OrderCard;