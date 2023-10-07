import css from "./Service.module.css";
import firstImage from "../../assets/images/first.png"
import secondImage from "../../assets/images/second.png"
import thirdImage from "../../assets/images/third.png"
import fourthImage from "../../assets/images/fourth.png"

const Services = () => {
  return (
      <>
        <h3 className={css.title}>Our extra services</h3>
        <div className={css.wrapper}>
          <div className={css.classicCard}>
            <img src={firstImage} alt=""/>
            <h4>Source from <br/> Industry Hubs</h4>
          </div>
          <div className={css.classicCard}>
            <img src={secondImage} alt=""/>
            <h4>Customize Your <br /> Products</h4>
          </div>
          <div className={css.classicCard}>
            <img src={thirdImage} alt=""/>
            <h4>Fast, reliable shipping <br /> by ocean or air</h4>
          </div>
          <div className={css.classicCard}>
            <img src={fourthImage} alt=""/>
            <h4>Product monitoring <br /> and inspection</h4>
          </div>
        </div>
      </>
  )
}

export default Services;