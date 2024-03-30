import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authPro";
import SideBar from "../feacture/generals/navSideBar/SideBar";
import styled from "styled-components";
import React from "react";

interface Props{
  _sidebarOpen: boolean,
  setSidebaropen: React.Dispatch<React.SetStateAction<boolean>>;
}

const  ProtectedRoute: React.FC<Props> = ({ _sidebarOpen, setSidebaropen }) => {
  const auth = useAuth();
  const theme = import.meta.env.VITE_TEMA
  const user = auth.getUser()
  const typeUser = ['root', 'user']
  
  return (
  <Container className={`${theme+'App'} ${_sidebarOpen?'sidebarState active':''} containerApp`}>
    <SideBar _sidebarOpen = {_sidebarOpen} setSidebaropen={setSidebaropen}/>
    {/* <NavBarNavigation></NavBarNavigation> */}
    {(auth.isAuthenticated) && user && (typeUser.includes(user.level) ) ? <Outlet></Outlet> : <Navigate to="/"></Navigate>}
  </Container>
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

export default ProtectedRoute;