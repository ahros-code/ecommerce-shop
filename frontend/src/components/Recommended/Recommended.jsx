import css from "./Recommended.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import RecommendCard from "../RecommendCard/RecommendCard.jsx";

const Recommended = () => {
  const {data:products} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/products/recommended?pageSize=10`)
  return (
      <div className={css.wrapper}>
        <h3 className={css.title}>Recommended items</h3>
        <div className={css.items}>
          {products?.data?.map((product, index) => (
              <RecommendCard key={index} id={product.id} name={product.name} price={product.price} image={product.ImageModel.link}/>
          ))}
        </div>
      </div>
  )
}

export default Recommended;