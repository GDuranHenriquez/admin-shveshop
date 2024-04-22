import styled from 'styled-components';
import styles from './getTagPrice.module.css'
import React, { useEffect, useState } from 'react'
import { ProductSearch } from '../../redux/slices/products/typesProducts'
import { PrinterOutlined } from '@ant-design/icons'
import ModalPrintTagsBarCode from '../../feacture/getBarCode/modalPrintTagsBarCode/ModalPrintTagsBarCode';
import Loading from '../../Loading/Loading';
import { useAuth } from '../../auth/authPro';
import axios from 'axios';
import { useCustomSelector } from '../../hooks/redux';

//Components
import TagSearchProduct from '../../feacture/getTagProduct/tagSearchProduct/TagSearchProduct'
import CardProductGetBarCode from '../../feacture/getBarCode/cardProductGetBarCode/CardProductGetBarCode';
import CardBarCode from '../../feacture/getBarCode/cardBarCode/CardBarCode';

type OptionSelect = {
  value: string,
  label: string
}

type TypeBarCode = {
  id: number,
  code: string,
  name: string,
}

type TypeLisCheckOption = {
  searchForNameCod: boolean,
  searchAll: boolean
}

const GetBarCodePage: React.FC = () =>{

  const auth = useAuth()
  const allDepartamento = useCustomSelector((state) => state.product.allDepartamentos);

  const [loading, setLoading] = useState<boolean>(false)
  const [ listProductSearch , setListProductSearch ] = useState<ProductSearch[] | null>(null)
  const [lisCheckOption, setLisCheckOption] = useState<TypeLisCheckOption>({searchAll: false, searchForNameCod: true})
  const [listBarCode, setListBarCode] = useState<TypeBarCode[]>([])

  const [openModalPrintTags,setOpenModalPrintTags] = useState<boolean>(false)
  const [optionDepartamentos, setOptionDepartamentos] = useState<OptionSelect[]>([{value: '0', label: 'Todos'}])
  const [selectedDepartamento, setSelectedDepartamento] = useState<number>(0)

  const selectChectBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const newLisCheckOption : TypeLisCheckOption = {...lisCheckOption}
    if(name === 'searchForNameCod'){
      newLisCheckOption.searchForNameCod = !newLisCheckOption.searchForNameCod
      newLisCheckOption.searchAll = false
      setLisCheckOption(newLisCheckOption)
    }else if(name === 'searchAll'){
      newLisCheckOption.searchAll = !newLisCheckOption.searchAll
      newLisCheckOption.searchForNameCod = false
      setLisCheckOption(newLisCheckOption)
    }
  }

  const updateListBarCode = (tag: TypeBarCode, acction: number) => {
    let newList: TypeBarCode[] = []
    if(acction === 1){
      newList = [...listBarCode]
      newList.push(tag)
      setListBarCode(newList)
    }else if(acction === 0){
      const listTagsFilter = listBarCode.filter((barCode) => barCode.id !== tag.id)
      newList = [...listTagsFilter]
      setListBarCode(newList)
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDepartamento(parseInt(value))
  }

  const cleanData = () => {
    setListProductSearch(null)
    setListBarCode([])
  } 

  const openModalPrint = () => {
    setOpenModalPrintTags(true)
  }

  
  const getAllProducts = async (refreshToken : string, departamento: number) => {
    try {
      setLoading(true)
      cleanData()
      const basePoint = import.meta.env.VITE_BASENDPOINT_BACK;
      const endpoint = basePoint + `/productos/id_departamento/${departamento}`;
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        data: null
      };
      const response = await axios.get(endpoint, config);
      if (response.data) {
        const data = response.data;
        if(data.length){
          setListProductSearch(data);
          const alltags: TypeBarCode[] = []
          for(let i = 0 ; i < data.length; i++){
            const product = data[i]
            const addTag : TypeBarCode = {
              id: product.id,
              name: product.nombre,
              code: product.codigo
            }
            alltags.push(addTag)
          }
          setListBarCode(alltags)
        }else{
          setListProductSearch(null)
        }
      } else {
        console.log(response);
      }
      
    } catch (error) {
      if (typeof error === "string") {
        console.log(error);
      } else if (error instanceof Error) {
        const message = error.message;
        console.log(message);
      } else {
        console.log(error);
      }
    }finally{
      setLoading(false)
    }
    
  };

  useEffect(() => {
    if(lisCheckOption.searchAll){
      cleanData()
      const tkn = auth.getAccessToken()
      if(selectedDepartamento <= 0){
        getAllProducts(tkn, -1)
      }else{
        getAllProducts(tkn, selectedDepartamento)
      }
    }else{
      cleanData()
    }
  }, [lisCheckOption])

  useEffect(() => {
    if(lisCheckOption.searchAll){
      cleanData()
      const tkn = auth.getAccessToken()
      if(selectedDepartamento <= 0){
        getAllProducts(tkn, -1)
      }else{
        getAllProducts(tkn, selectedDepartamento)
      }
    }
  }, [selectedDepartamento])

  useEffect(() => {
    
    if(allDepartamento.length){
      const optionsDep: OptionSelect[] = allDepartamento.map((dep) => {
        return {value: (dep.id).toString(), label: (dep.nombre).toUpperCase()}
      })
      optionsDep.unshift({value: '0', label: 'Todos'})
      setOptionDepartamentos(optionsDep)
    }
  }, [allDepartamento])
  
  return <Container>
    <div className={styles.containerCheckBoxes}>
      <h5>Seleccione el metodo de busqueda para obtener los Códigos de barras</h5>
      <div className={styles.listCheckBoxes}>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="searchForDepart">Departamento a buscar</label> 
          <select name="searchForDepart" id="searchForDepart" value={selectedDepartamento} onChange={handleSelectChange}>
            {optionDepartamentos.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>                    
            ))}
          </select>          
        </div>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="searchForNameCod">Buscar por nombre o código</label> 
          <input type="checkbox" name="searchForNameCod" id="searchForNameCod" 
            checked={lisCheckOption.searchForNameCod} onChange={selectChectBox}/>
        </div>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="searchAll">Obtener todos los códigos de barra</label> 
          <input type="checkbox" name="searchAll" id="searchAll" 
            checked={lisCheckOption.searchAll} onChange={selectChectBox}/>
        </div>
      </div>
      
    </div>
    {lisCheckOption.searchForNameCod ?
      <div className={styles.conatinerSearchsProduct}>
        <div className={styles.barAction}>
          <div className={styles.containerSearchIno}>
            <TagSearchProduct setLoading={setLoading} setListProductSearch={setListProductSearch} id_departemento={selectedDepartamento}/>
          </div>
          <div className={styles.containerBntPrint}>
            <p>Imprimir códigos seleccionados</p>
            <button disabled = {listBarCode.length ? false : true}  onClick={openModalPrint}> <PrinterOutlined/> Imprimir</button>
          </div>
        </div>
        <h5>Seleccionas los productos de los cuales deseas los códigos de barra.</h5>
        <div className={styles.conatinerInfoCardTag}>
          <div className={styles.conatinerCards}>
            {listProductSearch ? listProductSearch.map((prod, index) => <CardProductGetBarCode updateListBarCode={updateListBarCode} key={index} product={prod}/>)
            :null}
          </div>
          <div className={styles.conatinerTags}>
            <h6>Códigos de barra a imprimir</h6>
            <div className={styles.containerListTags}>
              {listBarCode.length > 0 ? listBarCode.map((tg, index) => <CardBarCode key={index} barCode={tg} />) : null}
            </div>
          </div>
        </div>        
      </div>
    : 
      lisCheckOption.searchAll ?
      <div className={styles.conatinerSearchsProduct}>
        <div className={styles.barAction} style={{marginTop: '15px'}}>
          <div className={styles.containerBntPrint}>
            <p>Imprimir códigos de barra</p>
            <button disabled = {listBarCode.length ? false : true}  onClick={openModalPrint}> <PrinterOutlined/> Imprimir</button>
          </div>
        </div>
        <h5>Códigos de barra a imprimir</h5>
        <div className={styles.conatinerAllTags}>
          {listBarCode.length > 0 ? listBarCode.map((tg, index) => <CardBarCode key={index} barCode={tg} />) : null}   
        </div>        
      </div>
      : 
      null
    }
    <ModalPrintTagsBarCode listTags={listBarCode} openModalPrintTags={openModalPrintTags} setOpenModalPrintTags={setOpenModalPrintTags}/>
    {loading? <Loading/> : null}
  </Container>
};

const Container = styled.div`
  height: 100vh;
  margin-left: 25px;
  padding-right: 20px;
`

export default GetBarCodePage;