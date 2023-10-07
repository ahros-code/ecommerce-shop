import {createContext, useState} from "react";

export const SearchContext = createContext();

export const SearchContextProvider = props => {
  const [searchData, setSearchData] = useState('');

  return (
      <SearchContext.Provider value={{searchData, setSearchData}}>
        {props.children}
      </SearchContext.Provider>
  )
}