import styles from './cardProductGetTag.module.css'
import { ProductSearch } from '../../../redux/slices/products/typesProducts'
import imgProductDefault from '../../../assets/productDefault.jpeg'
import React, {useState} from 'react'
import getConfigCoinIsMlcOrRef from '../../../utils/getConfigCoin'

type TypeTag = {
  id: number,
  name: string,
  price: string,
}

interface Props{
  product: ProductSearch,
  updateListTag: (tag: TypeTag, acction: number) => void
}

const CardProductGetTag: React.FC<Props> = ({product, updateListTag}) => {
  const configCoin = getConfigCoinIsMlcOrRef()
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    const chk = !isChecked;
    setIsChecked(!isChecked);
    addTag(chk)
  };

  const addTag = (value: boolean) =>{
    const tag : TypeTag = {
      id: product.id,
      name: product.nombre,
      price: (product.p_v_total_unidad).toFixed(2)
    }
    if(value){
      updateListTag(tag,  1)
    }else if(!value){
      updateListTag(tag, 0)
    }
  }

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerCheck}>
        <input type="checkbox" name="selectCard" checked={isChecked} id={(product.id).toString()} onChange={handleChange}/>
      </div>
      <div className={styles.conatinerImg}>
        <img src={product.img ? product.img: imgProductDefault} alt="" />
      </div>
      <div className={styles.containerInfoProduc}>
        <p><b>Nombre:</b> {product.nombre}</p>
        { configCoin === 'mlc' ? <>
            <p><b>Precio Unit:</b> {(product.p_v_total_unidad).toFixed(2)} bs.</p>
            <p><b>Precio: Mayor:</b> {(product.total_v_mayor).toFixed(2)} bs.</p>
          </>
          :
          <>
            <p><b>Precio Unit:</b> {(product.p_v_total_unidad).toFixed(2)} REF.</p>
            <p><b>Precio: Mayor:</b> {(product.total_v_mayor).toFixed(2)} REF.</p>
          </>
        }
        
      </div>
    </div>
  )

}

export default CardProductGetTag;