import {useContext, useEffect, useState} from 'react';
import {ProductContext} from "../context/ProductContext.jsx";

const useCartFetch = (url, options) => {
  const {data, setData} = useContext(ProductContext)

  async function getData() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return {data};
}

export default useCartFetch