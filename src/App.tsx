import {useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { styled } from "styled-components";
import { useState } from 'react'
import './App.css'



//ImportFeactures and pages
//import SideBar from './feacture/sideBar/SideBar'
import SideBar from './feacture/generals/navSideBar/SideBar.tsx';
import PanelPage from './pages/panel/Panel'
import AddProductPage from './pages/addProducts/AddProducts'

function App() {
  const [sidebarOpen, setSidebaropen] = useState(true);
  const theme = import.meta.env.VITE_TEMA

  useEffect(() => {
    document.body.classList.add(theme+'AppBody'); 

    return () => {
      document.body.classList.remove(theme+'AppBody'); 
    };
  }, []);

  return (<>
      <BrowserRouter>
        <div>
          <Container className={`${theme+'App'} ${sidebarOpen?'sidebarState active':''} containerApp`}>
            {/* <SideBar sidebarOpen = {sidebarOpen} setSidebaropen = {setSidebaropen} /> */}
            <SideBar _sidebarOpen = {sidebarOpen} setSidebaropen = {setSidebaropen}/>
            <Routes>
              <Route path='/panel' element={<PanelPage></PanelPage>} ></Route>
              <Route path='/addProduct' element={<AddProductPage></AddProductPage>}></Route>
              <Route path="/" element={<Navigate to="/panel"/>} />
            </Routes>  
          </Container> 
        </div>        
      </BrowserRouter>
    </>
  )
}

const Container = styled.div`
  display: grid;
  min-height: 100%;
  width: 100%;
  max-width: 100vw;
  grid-template-columns: 80px calc(100vw - 120px);
  grid-template-rows: auto;
  background: white;
  color: black;
  transition: all 0.2s;
  /* overflow-x: auto; */
  //overflow-y: auto;
  &.active{
    grid-template-columns: 220px calc(100vw - 250px);
  }
  @media (max-width: 768px) {  
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    background: white;
    color: black;
    transition: all 0.2s;
    justify-content: center;
    align-content: center;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    background: white;
    color: black;
    transition: all 0.2s;
    justify-content: center;
    align-content: center;
  }
`;

export default App
