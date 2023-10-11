import {useOutletContext} from "react-router-dom";
import css from "./Description.module.css"

const Description = () => {
  const description = useOutletContext()
  return (
      <div className={css.wrapper}>
        <div className={css.mainText}>
          {description}
        </div>
      </div>
  )
}

export default Description;