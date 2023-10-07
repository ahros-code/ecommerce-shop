import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./assets/styles/globals.css"
import {SearchContextProvider} from "./context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <SearchContextProvider>
        <App/>
      </SearchContextProvider>
    </BrowserRouter>
)
