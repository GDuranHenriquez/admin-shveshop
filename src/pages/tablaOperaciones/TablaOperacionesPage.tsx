import styled from 'styled-components'
import Loading from '../../Loading/Loading'
import { useCustomSelector } from '../../hooks/redux'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import components
import InfoRateComponent from '../../components/panelOperations/infoRate/InfoRate'

const PageTablaOperaciones : React.FC = () => {

  //const configCoin = getConfigCoinIsMlcOrRef()
  const rate = useCustomSelector((select) => select.product.rate)
  const confiRate = import.meta.env.VITE_RATE_CONFIG

  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    console.log(rate)
  })


  const messageErrorProduct = (message: string)=>{
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })    
  };

  const messageSuccessProduct = (message: string)=>{
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })    
  }

  return <>
    <Container>
      {confiRate && confiRate === 'MANUAL' ? <InfoRateComponent rate={rate} setIsLoading = {setIsLoading} messageErrorProduct={messageErrorProduct} messageSuccessProduct={messageSuccessProduct}/> : null}
      {isLoading && <Loading/>}
    </Container>
    <ToastContainer></ToastContainer>
  </> 

}

export default PageTablaOperaciones;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
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