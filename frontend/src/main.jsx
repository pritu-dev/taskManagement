import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from './context/AppContextProvider.jsx';

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>
);
