import {createContext, useState} from 'react';

export const ProductContext = createContext();

export const ProductContextProvider = ({children}) => {
  const [data, setData] = useState(
      []
  );

  return (
      <ProductContext.Provider
          value={{
            data, setData
          }}
      >
        {children}
      </ProductContext.Provider>
  );
};
