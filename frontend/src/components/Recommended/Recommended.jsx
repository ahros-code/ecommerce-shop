import css from "./Recommended.module.css"
import useFetch from "../../hooks/useFetch.jsx";

const Recommended = () => {
  const {data:products} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/products/all`)
  return (
      <div className={css.wrapper}>
        <h3>Recommended items</h3>
        <div className={css.items}>
          {products?.data?.map((product, index) => (
              <p key={index}>{product.id}-{product.name}</p>
          ))}
        </div>
      </div>
  )
}

export default Recommended;