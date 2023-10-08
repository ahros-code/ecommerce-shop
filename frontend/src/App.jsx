import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/Main/Layout/Layout.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Search from "./pages/Search/Search.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";

function App() {
  return (
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={"/"} element={<Home />}/>
          <Route path={"/profile"} element={<Profile />}/>
          <Route path={"/search"} element={<Search />}/>
          <Route path={"/products/:id"} element={<SingleProduct />}/>
        </Route>
      </Routes>
  )
}

export default App
