import React, {useEffect, useState} from 'react'
import { styled } from "styled-components";
import { useCustomDispatch } from '../../hooks/redux';
import { getAllProducts, getAllCategori, getAllPresentacion } from '../../redux/slices/products/actionsProducts';
import Loading from '../../Loading/Loading';
import FormAddProducts from '../../components/addProduct/FormAddProduct';

const AddProductPage: React.FC = () => {
  const dispatch = useCustomDispatch();
  const [isLoadin, setIsLoadin] = useState(false);
  useEffect(() =>{
    setIsLoadin(true)
    getAllProducts(dispatch);
    getAllCategori(dispatch);
    getAllPresentacion(dispatch);
    setIsLoadin(false)
  }, [])
  
  return <Container>
    <FormAddProducts></FormAddProducts>
    {isLoadin && <Loading/>}
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

export default AddProductPage;