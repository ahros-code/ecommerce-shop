import css from "./SubHeader.module.css"

const SubHeaderComponent = () => {
  return (
      <div className={css.wrapper}>
        <div className={css.left}>
          <ul className={css.items}>
            <li>All categories</li>
            <li>Hot offers</li>
            <li>Gift boxes</li>
            <li>Projects</li>
            <li>Help</li>
          </ul>
        </div>
        <div className={css.right}>
          <ul>
            <li>developing...</li>
          </ul>
        </div>
      </div>
  )
}

export default SubHeaderComponent