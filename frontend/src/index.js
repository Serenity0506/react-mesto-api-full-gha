import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AppContextProvider } from "./context/CurrentUserContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
