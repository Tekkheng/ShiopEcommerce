import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bulma/css/bulma.css"

import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'

// Mengatur opsi withCredentials untuk seluruh permintaan Axios
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
