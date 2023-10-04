import css from "./CategoryProduct.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import Sections from "../Sections/Sections.jsx";

const CategoryProduct = () => {
  const {data: categoryAndProducts} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/category/all?pageSize=2`);
  return (
      <div className={css.wrapper}>
        {categoryAndProducts?.data?.map((category, index) => {
          return <Sections key={index} categoryName={category.name} categoryImage={category.ImageModel.link} products={category.ProductModels}/>
        })}
      </div>
  )
}

export default CategoryProduct;