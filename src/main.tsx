import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";

//import Providers
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)

postMessage({ payload: 'removeLoading' }, '*')
