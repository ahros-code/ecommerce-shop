import css from "./Sections.module.css"
import ProductCard from "../ProductCard/ProductCard.jsx";
import {Link} from "react-router-dom";

const Sections = props => {
  const {categoryName, categoryImage, products} = props;
  return (
      <div className={css.wrapper}>
        <div className={css.categorySections}>
          <div className={css.mainSection} style={{
            backgroundImage: `url("${import.meta.env.VITE_BACK_URL}${categoryImage}")`,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6
          }}>
            <h3 className={css.mainSectionText}>{categoryName}</h3>
            <Link to={`/products?category=${categoryName}`}>
              <p className={css.categoryBtn}>Source now</p>
            </Link>
          </div>
          <div className={css.productsSection}>
            {products?.map((product, index) => (
                <div key={index} className={css.a}>
                  <ProductCard key={index} name={product.name} image={product.ImageModel.link} price={product.price}
                               id={product.id}/>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Sections;