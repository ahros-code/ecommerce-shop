import Hero from "../../components/Hero/Hero.jsx";
import CategoryProduct from "../../components/CategoryProduct/CategoryProduct.jsx";
import Offers from "../../components/Offers/Offers.jsx";
import Inquiry from "../../components/Inquiry/Inquiry.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import Services from "../../components/Services/Services.jsx";
import Suppliers from "../../components/Suppliers/Suppliers.jsx";

const Home = () => {
  // tokenlarni qosh
  return (
      <>
        <Hero/>
        <Offers />
        <CategoryProduct/>
        <Inquiry />
        <Recommended />
        <Services />
        <Suppliers />
      </>
  )
}

export default Home;