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

function App() {
  const [sidebarOpen, setSidebaropen] = useState(true);
  const theme = import.meta.env.VITE_TEMA

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
        }
      ]
    }
  ])

  return (<>
      {/* {<BrowserRouter>
        <div>
          <Container className={`${theme+'App'} ${sidebarOpen?'sidebarState active':''} containerApp`}>
            <SideBar _sidebarOpen = {sidebarOpen} setSidebaropen = {setSidebaropen}/>
            <Routes>
              <Route path='/panel' element={<PanelPage></PanelPage>} ></Route>
              <Route path='/addProduct' element={<AddProductPage></AddProductPage>}></Route>
              <Route path="/" element={<Navigate to="/panel"/>} />
            </Routes>  
          </Container> 
        </div>        
      </BrowserRouter>} */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}



export default App
