import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx'

import './styles/variables.css'
import './index.css'
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";

//import Providers
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </Provider>,
)

postMessage({ payload: 'removeLoading' }, '*')
