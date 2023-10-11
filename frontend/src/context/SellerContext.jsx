import {createContext, useState} from "react";

export const SellerContext = createContext();

export const SellerContextProvider = props => {
  const [isSeller, setIsSeller] = useState(false);

  return (
      <SellerContext.Provider value={{isSeller, setIsSeller}}>
        {props.children}
      </SellerContext.Provider>
  )
}