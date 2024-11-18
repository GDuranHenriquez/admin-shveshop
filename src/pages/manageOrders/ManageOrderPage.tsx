import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import '@mantine/core/styles.css';
import styled from "styled-components";
import { getAllOrders } from "../../redux/slices/orders/actionOrders";
import { useAuth } from "../../auth/authPro";

//import components
import ListOrders from "../../components/orders/ListOrders";
import Loading from "../../Loading/Loading";
import ModalCreateOrder from "../../components/orders/modal/ModalCreateOrder";

const ManageOrdersPage : React.FC = ({}) => {

  const dispatch = useDispatch();
  const auth = useAuth()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModalCreateOrder, setOpenModalCreateOrder] = useState<boolean>(false);

  const getDataState = async () => {
    try {
      setIsLoading(true)
      const tkn = auth.getAccessToken();
      await getAllOrders(tkn,dispatch, 1, 1000);
      
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  };

  const handleOpenModalCreateOrder = () => {
    setOpenModalCreateOrder(true)
  }

  useEffect(() => {
    getDataState();
  }, [])
  
  return <Container>
    <div>
      <button className="button-send" onClick={handleOpenModalCreateOrder}>Crear pedido</button>
    </div>
    <ListOrders setIsLoading={setIsLoading}/>
    <ModalCreateOrder isOpen={openModalCreateOrder} setIsOpen={setOpenModalCreateOrder}/>
    {isLoading && <Loading/>}
  </Container>

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 25px);
  height: 100%;
  min-height: 100vh;
  margin-left: 25px;
  @media (max-width: 768px){
    width: 100%;
    margin: 0px;
  }
  @media screen and (max-width: 768px){
    width: 100%;
    margin: 0px;
  }
`

export default ManageOrdersPage;