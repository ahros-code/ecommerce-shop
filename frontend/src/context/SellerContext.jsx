import {createContext, useState} from "react";

export const SellerContext = createContext();

export const SellerContextProvider = props => {
  const [isSeller, setIsSeller] = useState(
      localStorage.getItem("isSeller") ? localStorage.getItem("isSeller") : false
  );

  return (
      <SellerContext.Provider value={{isSeller, setIsSeller}}>
        {props.children}
      </SellerContext.Provider>
  )
}