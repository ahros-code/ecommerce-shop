import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./assets/styles/globals.css"
import {SearchContextProvider} from "./context/SearchContext.jsx";
import {AuthContextProvider} from "./context/AuthContext.jsx";
import {ProductContextProvider} from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ProductContextProvider>
      <SearchContextProvider>
        <AuthContextProvider>
          <App/>
        </AuthContextProvider>
      </SearchContextProvider>
      </ProductContextProvider>
    </BrowserRouter>
)
