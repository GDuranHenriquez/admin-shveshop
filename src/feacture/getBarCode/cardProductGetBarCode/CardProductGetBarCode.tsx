import styles from './cardProductGetTag.module.css'
import { ProductSearch } from '../../../redux/slices/products/typesProducts'
import imgProductDefault from '../../../assets/productDefault.jpeg'
import React, {useState} from 'react'

type TypeBarCode = {
  id: number,
  code: string,
  name: string,
}

interface Props{
  product: ProductSearch,
  updateListBarCode: (tag: TypeBarCode, acction: number) => void
}

const CardProductGetBarCode: React.FC<Props> = ({product, updateListBarCode}) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    const chk = !isChecked;
    setIsChecked(!isChecked);
    addTag(chk)
  };

  const addTag = (value: boolean) =>{
    const tag : TypeBarCode = {
      id: product.id,
      name: product.nombre,
      code: product.codigo
    }
    
    if(value){
      updateListBarCode(tag,  1)
    }else if(!value){
      updateListBarCode(tag, 0)
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
        <p><b>Precio Unit:</b> {(product.p_v_total_unidad).toFixed(2)} bs.</p>
        <p><b>Precio: Mayor:</b> {(product.total_v_mayor).toFixed(2)} bs.</p>
      </div>
    </div>
  )

}

export default CardProductGetBarCode;