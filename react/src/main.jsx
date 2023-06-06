import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import router from "../router.jsx";
import {RouterProvider} from "react-router-dom";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
      </ChakraProvider>
  </React.StrictMode>,
)
