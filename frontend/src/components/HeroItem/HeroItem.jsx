import css from "./heroItem.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";

const HeroItem = props => {
  const [activeItem, setActiveItem] = useState(null);
  const {name, id} = props;
  return (
    <Link to={"/"}>
      <div className={css.wrapper}>
        <li className={css.item}>{name}</li>
      </div>
    </Link>
  )
}

export default HeroItem