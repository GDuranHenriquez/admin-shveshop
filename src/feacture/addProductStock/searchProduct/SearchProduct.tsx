import styles from './searchProduct.module.css'
import React, { useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { getProductIdName } from '../../../utils/functionsUtils'
import { ProductSearch } from '../../../redux/slices/products/typesProducts'
import { useAuth } from '../../../auth/authPro'

interface Props {
  setListProductSearch: React.Dispatch<React.SetStateAction<ProductSearch[] | null>>;
  setDetailProduct: React.Dispatch<React.SetStateAction<ProductSearch | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchProduct: React.FC<Props> = ({ setListProductSearch, setDetailProduct, setLoading }) => {
  const auth = useAuth();
  const inpSearchProduct = useRef<HTMLInputElement>(null);
  const [textInpSearch, setTextImputSearch] = useState<string>('');
  
  /* const handleCancel = () =>{
    cleanData();
  } */

  const handleOk = async () => {
    await searchProduct()
  }

  const cleanData = () => {
    setTextImputSearch('')
    setListProductSearch(null)
    setDetailProduct(null)
  }
  
  const handleChangue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    setTextImputSearch(textValue);
  }

  const isInputFocused = (element:React.RefObject<HTMLInputElement>) => {
    return document.activeElement === element.current;
  };

  const searchProduct = async () => {
    try {
      setLoading(true)
      const textInput = textInpSearch;
      cleanData()
      if (textInput) {
        setListProductSearch(null);
        const tkn = auth.getAccessToken()
        const response = await getProductIdName(tkn, textInput);
        if (response.data) {
          const data = response.data;
          if(data.length){
            setListProductSearch(data);
          }else{
            setListProductSearch(null)
          }
        } else {
          console.log(response.error);
        }
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleSearchProductOnKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const focus = isInputFocused(inpSearchProduct);
    if (event.key === 'Enter' && focus) {
      await searchProduct()
    }
  }

  return (
    <div className={styles.containerSearchProduct}>
      <div className={styles.containerImputSearch}>
          <div className={styles.componentSearch}>
            <label htmlFor="inptSeachr"><span>Introduzca el nombre o codigo del producto</span></label>
            <div className={styles.containerIconSearch}>
              <input type='text' name='inptSeachr' id={styles.inpSearchProduct} value={textInpSearch}
              onChange={handleChangue} pattern="[A-Za-z0-9]{1,20}" ref={inpSearchProduct}
              onKeyDown={handleSearchProductOnKey}
              />
              <div className={styles.iconSearch}>
                <button id={styles.btnSearch} onClick={handleOk}><SearchOutlined/></button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SearchProduct;