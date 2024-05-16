import styled from 'styled-components'
import React, { useState } from 'react'
import SearchProduct from '../../feacture/addProductStock/searchProduct/SearchProduct'
import { ProductSearch } from '../../redux/slices/products/typesProducts'
import CardConsultProduct from '../../components/cardsConsultProduct/CardConsultProduct'
import imgProductDefault from '../../assets/productDefault.jpeg'
import Loading from '../../Loading/Loading'
import { putAddSubStock } from '../../redux/slices/products/actionsProducts'
import { useAuth } from '../../auth/authPro'

type Option = {
  value: string;
  label: string;
}

const AddSubStockPage: React.FC = () => {
  const expRegNumber: RegExp = /^[+-]?\d+(\.\d{0,3})?$/
  const auth = useAuth()

  const [loading, setLoading] = useState<boolean>(false)
  const [ listProductSearch , setListProductSearch ] = useState<ProductSearch[] | null>(null)
  const [detailProduct, setDetailProduct] = useState<ProductSearch | null>(null)
  const [numCant, setNumCant] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('1');

  const options: Option[] = [
    { value: '1', label: '' },
    { value: 'unit', label: 'Unidades' },
    { value: 'bulto', label: 'Bulto' },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectProduct = (product : ProductSearch) => {
    setDetailProduct(product)
  }

  const handleChangeInputCant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    if(expRegNumber.test(textValue) || textValue === '' || textValue === '-' || textValue === '+'){
      setNumCant(textValue)
    }
  }

  /* const cleanData = async () => {
    setListProductSearch(null)
    setDetailProduct(null)
  } */

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if(numCant !== '' && (['unit', 'bulto'].includes(selectedOption)) && detailProduct){
        const data = {
          cant: parseFloat(numCant),
          tipo: selectedOption,
          idProduct: detailProduct.id,
        }
        const tkn = auth.getAccessToken()
        const response = await putAddSubStock(tkn, data)
        if('id' in response && listProductSearch){
          const newList = listProductSearch.map((prod) => {
            return prod.id === response.id ? response : prod
          })
          setListProductSearch(newList)
          setDetailProduct(response)
        }        
      }else{
        console.log('Datos incompletos')
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleClean = () =>{
    setNumCant('');
    setSelectedOption('1')
  }

  return (
    <Container>
      <SearchProduct setLoading={setLoading} setListProductSearch={setListProductSearch} setDetailProduct={setDetailProduct}/>
      
      <div className={detailProduct? 'containerCarsConsultProduct': 'containerCarsConsultProductNoDetail'}>
        <div className='containerCards'>
          {
            listProductSearch && listProductSearch.length ? listProductSearch.map((prod, index) => (
              <CardConsultProduct key={index} product={prod} handleSelectProduct={handleSelectProduct}/>
            )):
            null
          }
        </div>
        {
          detailProduct? 
          <div className={'containerInfoCard'}>
            <h4>Detalle del producto</h4>
            <div className={'containerDetailProduct'}>
              <div className={'imgDetail'}>
                <img src={detailProduct.img? detailProduct.img : imgProductDefault} alt='Picture product' />
              </div>
              <div className={'detailInfo'}>
                <p><b>Nombre:</b> {detailProduct.nombre}</p>
                <p><b>Total bultos: </b> {(detailProduct.total_bulto).toFixed(2)}</p>
                <p><b>Total unidades: </b> {(detailProduct.cantidad_unidad).toFixed(2)}</p>
                <p><b>Unidades por bulto: </b> {(detailProduct.unidad_p_bulto).toFixed(2)}</p>                
              </div>
              <div className="containerInputadd">
                <div className='containerImputAddSubStock'>
                  <div className='containerSelect'>
                    <label htmlFor="mySelect">Cantidad en?:</label>
                    <select id="mySelect" value={selectedOption} onChange={handleSelectChange}>
                      {options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input type="text" placeholder='introdusca la cant.' onChange={handleChangeInputCant} value={numCant}/>
                  <span className="tooltip" data-text="Si el numero es positivo se sumara la cantidad al stock, 
                  si es negativo se restara la cantidad de stock" >?</span>
                </div>
                <div className='containerButons'>
                  <button id='idBtnClean' onClick={handleClean}>Limpiar</button>
                  <button id='idBtnAddSub' onClick={handleSubmit}>Agregar / Restar</button>
                </div>
              </div>
            </div>
          </div>: null
        }
      </div>
      {loading? <Loading/> : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  margin-left: 25px;
  padding-right: 20px;
  .containerCarsConsultProductNoDetail{
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 365px);
    height: calc(100% - 150px);
    max-height: calc(100% - 150px);
    min-height: calc(100% - 1500px);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    gap: 5px;
    justify-content: center;
    .containerCards{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: start;
      overflow-x: auto;
      width: 100%;
      gap: 10px;
      padding: 10px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      overflow-x: auto;
      max-height: 95%;
    }
    .containerCards{
      border: none;
      overflow-x: auto;
    }
  }

  .containerCarsConsultProduct{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: calc(100% - 150px);
    max-height: calc(100% - 150px);
    min-height: calc(100% - 150px);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    gap: 5px;
    .containerCards{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: start;
      overflow-x: auto;
      width: calc(100% - 365px);
      gap: 10px;
      padding: 10px;
      border-right: 1px solid rgba(0, 0, 0, 0.4);
      overflow-x: auto;
    }
    .containerInfoCard{
      width: 400px;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      h4{
        width: 100%;
        text-align: center;
        padding: 0;
        margin: 0;
        margin-bottom: 10px;
      }
      .containerDetailProduct{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        overflow-y: auto;
        .containerInputadd{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          margin-top: 20px;
          gap: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          .containerImputAddSubStock{
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
            input{
              height: 30px;
              width: 150px;
              text-align: center;
              padding: 0 10px;
              border-radius: 8px;
              font-size: 14px;
              font-family: 'Roboto', sans-serif;
              font-weight: 600;
            }
            .tooltip {
              position:relative; 
              border: 1px solid rgba(0, 0, 0, 1);
              border-radius: 50%;
              padding: 2px 2px;
              font-size: 11px;
              height: 14px;
              width: 14px;
              text-align: center;
              font-weight: 600;
              &:before {
                content: attr(data-text); /* here's the magic */
                position:absolute;
                
                /* vertically center */
                right: 0%;
                transform:translateY(-70%);
                
                /* move to right */
                top:-25px;
                margin-right:-75px; /* and add a small left margin */
                
                /* basic styles */
                width:150px;
                max-width: 150px;
                padding:8px;
                border-radius:8px;
                background: rgba(0, 0, 0, 0.9);
                color: #fff;
                text-align:center;

                display:none; /* hide by default */
              }
              &:hover:before {
                display:block;
              }
            }
            .containerSelect{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: start;
              width: 100px;
              label{
                text-align: start;
                font-size: 13px;
                font-weight: 600;
                font-family: 'Roboto', sans-serif;
              }
              select{
                width: 95%;
                border-radius: 8px;
                padding: 2px;
                text-align: start;
                font-size: 12px;
                font-weight: 600;
                font-family: 'Roboto', sans-serif;
                border: 1px solid rgba(0, 0, 0, 1);
              }
            }
          }
          .containerButons{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            align-items: center;
            height: 30px;
            gap: 20px;
            button{
              width: 130px;
              padding: 4px;
              border-radius: 8px;
              font-size: 14px;
              font-family: 'Roboto', sans-serif;
              font-weight: 600;
              height: 30px;
            }
            #idBtnClean{
              background: transparent;
              color: red;
              font-size: 13px;
              font-weight: 600;
              &:hover{
                cursor: pointer;
              }
            }
            #idBtnAddSub{
              color: white;
              background: rgba(0, 128, 0, 1);
              font-size: 13px;
              font-weight: 600;
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
      }
      .imgDetail{
        width: 180px;
        height: 180px;
        margin-bottom: 15px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
      .detailInfo{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        gap: 5px;
        overflow-x: auto;
        p{
          padding: 0;
          margin: 0;
          font-family: 'Roboto' sans-serif;
          font-weight: 500;
          font-size: 13px;
          pre{
            padding: 0;
            margin: 0;
            font-family: 'Roboto' sans-serif;
            font-weight: bold;
            font-size: 13px;
          }
        }
      }
    }
  }

`
export default AddSubStockPage;