import styled from 'styled-components';
import styles from './getTagPrice.module.css'
import React, { useEffect, useState } from 'react'
import { ProductSearch } from '../../redux/slices/products/typesProducts'
import CardTag from '../../feacture/getTagProduct/cardTags/CardTags';
import { PrinterOutlined } from '@ant-design/icons'
import ModalPrintTags from '../../feacture/getTagProduct/modalPrintTags/ModalPrintTags';
import Loading from '../../Loading/Loading';
import { useAuth } from '../../auth/authPro';
import axios from 'axios';

//Components
import TagSearchProduct from '../../feacture/getTagProduct/tagSearchProduct/TagSearchProduct'
import CardProductGetTag from '../../feacture/getTagProduct/cardProdustGetTag/CardProductGetTag'


type TypeTag = {
  id: number,
  name: string,
  price: string,
}

type TypeLisCheckOption = {
  searchForNameCod: boolean,
  searchAll: boolean
}

const GetTagPricePage: React.FC = () =>{

  const auth = useAuth()

  const [loading, setLoading] = useState<boolean>(false)
  const [ listProductSearch , setListProductSearch ] = useState<ProductSearch[] | null>(null)
  const [lisCheckOption, setLisCheckOption] = useState<TypeLisCheckOption>({searchAll: false, searchForNameCod: true})
  const [listTags, setListTag] = useState<TypeTag[]>([])

  const [openModalPrintTags,setOpenModalPrintTags] = useState<boolean>(false)

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

  const updateListTag = (tag: TypeTag, acction: number) => {
    let newList: TypeTag[] = []
    if(acction === 1){
      newList = [...listTags]
      newList.push(tag)
      setListTag(newList)
    }else if(acction === 0){
      const listTagsFilter = listTags.filter((tagLis) => tagLis.id !== tag.id)
      newList = [...listTagsFilter]
      setListTag(newList)
    }
  }

  const cleanData = () => {
    setListProductSearch(null)
    setListTag([])
  } 

  const openModalPrint = () => {
    setOpenModalPrintTags(true)
  }

  const getAllProducts = async (refreshToken : string) => {
    try {
      setLoading(true)
      cleanData()
      const basePoint = import.meta.env.VITE_BASENDPOINT_BACK;
      const endpoint = basePoint + `/productos`;
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
          const alltags: TypeTag[] = []
          for(let i = 0 ; i < data.length; i++){
            const product = data[i]
            const addTag = {
              id: product.id,
              name: product.nombre,
              price: (product.p_v_total_unidad).toFixed(2)
            }
            alltags.push(addTag)
          }
          setListTag(alltags)
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
      getAllProducts(tkn)
    }else{
      cleanData()
    }
  }, [lisCheckOption])
  
  return <Container>
    <div className={styles.containerCheckBoxes}>
      <h5>Seleccione el metodo de busqueda para obtener las etiquetas</h5>
      <div className={styles.listCheckBoxes}>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="searchForNameCod">Buscar por nombre o código</label> 
          <input type="checkbox" name="searchForNameCod" id="searchForNameCod" 
            checked={lisCheckOption.searchForNameCod} onChange={selectChectBox}/>
        </div>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="searchAll">Obtener todas las etiquetas</label> 
          <input type="checkbox" name="searchAll" id="searchAll" 
            checked={lisCheckOption.searchAll} onChange={selectChectBox}/>
        </div>
      </div>
      
    </div>
    {lisCheckOption.searchForNameCod ?
      <div className={styles.conatinerSearchsProduct}>
        <div className={styles.barAction}>
          <div className={styles.containerSearchIno}>
            <TagSearchProduct setLoading={setLoading} setListProductSearch={setListProductSearch}/>
          </div>
          <div className={styles.containerBntPrint}>
            <p>Imprimir etiquetas seleccionadas</p>
            <button disabled = {listTags.length ? false : true}  onClick={openModalPrint}> <PrinterOutlined/> Imprimir</button>
          </div>
        </div>
        <h5>Seleccionas los productos de los cuales deseas las etiquetas</h5>
        <div className={styles.conatinerInfoCardTag}>
          <div className={styles.conatinerCards}>
            {listProductSearch ? listProductSearch.map((prod, index) => <CardProductGetTag updateListTag={updateListTag} key={index} product={prod}/>)
            :null}
          </div>
          <div className={styles.conatinerTags}>
            <h6>Etiquetas a imprimir</h6>
            <div className={styles.containerListTags}>
              {listTags.length > 0 ? listTags.map((tg, index) => <CardTag key={index} tag={tg} />) : null}
            </div>
          </div>
        </div>        
      </div>
    : 
      lisCheckOption.searchAll ?
      <div className={styles.conatinerSearchsProduct}>
        <div className={styles.barAction} style={{marginTop: '15px'}}>
          <div className={styles.containerBntPrint}>
            <p>Imprimir etiquetas</p>
            <button disabled = {listTags.length ? false : true}  onClick={openModalPrint}> <PrinterOutlined/> Imprimir</button>
          </div>
        </div>
        <h5>Etiquetas a imprimir</h5>
        <div className={styles.conatinerAllTags}>
          {listTags.length > 0 ? listTags.map((tg, index) => <CardTag key={index} tag={tg} />) : null}   
        </div>        
      </div>
      : 
      null
    }
    <ModalPrintTags listTags={listTags} openModalPrintTags={openModalPrintTags} setOpenModalPrintTags={setOpenModalPrintTags}/>
    {loading? <Loading/> : null}
  </Container>
};

const Container = styled.div`
  height: 100vh;
  margin-left: 25px;
  padding-right: 20px;
`

export default GetTagPricePage;