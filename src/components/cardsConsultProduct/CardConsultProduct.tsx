import styles from './cards.module.css'
import React from 'react'
import { ProductSearch } from '../../redux/slices/products/typesProducts'
import imgProductDefault from '../../assets/productDefault.jpeg'
import { useCustomSelector } from '../../hooks/redux'

interface Props {
  product: ProductSearch;
  handleSelectProduct: (product: ProductSearch) => void
}

const CardConsultProduct : React.FC<Props> = ({ product, handleSelectProduct }) => {

  const rate = useCustomSelector((state) => state.product.rate);

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.containerImgCard}>
        <img src={product.img ? product.img: imgProductDefault} alt={product.nombre} />
      </div>

      <div className={styles.infoProduct}>
        <p><b>Nombre:</b> {capitalizeFirstLetter(product.nombre)}.</p>
        <p><b>Precio: </b>{product.p_v_total_unidad} bs. <b>/</b> {rate? (product.p_v_total_unidad / rate.tasa).toFixed(2) : '??'} Ref.</p>
        <p><b>Disponible:</b> {`${product.cantidad_unidad} ${product.venta_por}`}. / {`${product.total_bulto} Bultos`}.</p>
      </div>
      <div className={styles.containerButton}>
        <button onClick={() => handleSelectProduct(product)}>Mostrar detalle</button>
      </div>
    </div>
  )
}

export default CardConsultProduct;