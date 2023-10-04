import css from "./SliderItem.module.css"
import {Link} from "react-router-dom";

const SliderItem = (props) => {
  const {image, link} = props;
  // console.log(link)
  return (
      <Link to={link} className={css.wrapper}>
        <img src={`${import.meta.env.VITE_BACK_URL}${image}`} alt="image" className={css.image}/>
      </Link>
  )
}

export default SliderItem