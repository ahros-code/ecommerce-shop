import css from "./OrderCard.module.css"

const OrderCard = ({orders}) => {
  return (
      <div className={css.wrapper}>
        {orders.map((order, index) => (
            <div className={css.card}>

            </div>
        ))}
      </div>
  )
}

export default OrderCard;