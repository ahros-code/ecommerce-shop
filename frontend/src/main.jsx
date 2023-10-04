import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./assets/styles/globals.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
)
