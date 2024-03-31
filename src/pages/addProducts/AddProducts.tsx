import React, {useEffect, useState} from 'react'
import { styled } from "styled-components";
import { useCustomDispatch } from '../../hooks/redux';
import { getAllProducts, getAllCategori, getAllPresentacion } from '../../redux/slices/products/actionsProducts';
import Loading from '../../Loading/Loading';
import FormAddProducts from '../../components/addProduct/FormAddProduct';
import { useAuth } from '../../auth/authPro';

const AddProductPage: React.FC = () => {
  const auth = useAuth()
  const dispatch = useCustomDispatch();
  const [isLoadin, setIsLoadin] = useState(false);

  useEffect(() =>{
    const fetchData = async () => {
      try {
        setIsLoadin(true);
        const tkn = auth.getAccessToken()
        await Promise.all([
          getAllProducts(tkn, dispatch),
          getAllCategori(dispatch),
          getAllPresentacion(dispatch),
        ]);

        // Una vez que todas las funciones se resuelven, cambiar el estado a false
        setIsLoadin(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoadin(false); // Asegúrate de cambiar el estado en caso de error
      }finally{
        setIsLoadin(false)
      }
    }
    fetchData()   
  }, [])
  
  return <Container>
    <FormAddProducts setIsLoadin={setIsLoadin}></FormAddProducts>
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