import {useEffect} from 'react';
/* import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' */
import { useState } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from './auth/authPro.tsx';
import ProtectedRoute from './auth/ProtectedRoute.tsx';
import './App.css'

//ImportFeactures and pages
//import SideBar from './feacture/sideBar/SideBar'
/* import SideBar from './feacture/generals/navSideBar/SideBar.tsx'; */
import PanelPage from './pages/panel/Panel'
import AddProductPage from './pages/addProducts/AddProducts'
import LoginPage from './pages/loginPage/LoginPage.tsx';
import AddSubStockPage from './pages/addSubStock/AddSubStock.tsx';
import GetTagPricePage from './pages/printPrice/GetTagPrice.tsx';
import GetBarCodePage from './pages/printBarCode/GetBarCode.tsx';
import ResetPasswordPage from './pages/resetPasswword/ResetPassword.tsx';
import PageTablaOperaciones from './pages/tablaOperaciones/TablaOperacionesPage.tsx';

function App() {
  const [sidebarOpen, setSidebaropen] = useState(true);
  const theme = import.meta.env.VITE_TEMA === 'generico' ? 'davirton' : import.meta.env.VITE_TEMA

  useEffect(() => {
    document.body.classList.add(theme+'AppBody'); 
    
    return () => {
      document.body.classList.remove(theme+'AppBody'); 
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: '/auth/reset-password',
      element: <ResetPasswordPage/>
    },
    {
      path: "/",
      element: <ProtectedRoute _sidebarOpen={sidebarOpen} setSidebaropen={setSidebaropen}/>,
      children: [
        {
          path: '/panel',
          element: <PanelPage/>
        },
        {
          path: '/addProduct',
          element: <AddProductPage/>
        },
        {
          path: '/addSubStock',
          element: <AddSubStockPage/>
        },
        {
          path: '/get-tag-price',
          element: <GetTagPricePage/>
        },
        {
          path: '/get-barcode',
          element: <GetBarCodePage/>
        },
        {
          path: '/panel-operaciones',
          element: <PageTablaOperaciones/>
        }
      ]
    }
  ])

  return (<>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}



export default App
