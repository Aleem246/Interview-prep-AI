import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import store from './store/index.js'
import { BrowserRouter as Router } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store = {store}>
        <ChakraProvider>
           <App />
        </ChakraProvider>
      </Provider>
    </Router>
  </StrictMode>,
)
