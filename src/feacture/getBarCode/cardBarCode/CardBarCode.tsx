import React, { useRef, useEffect, useState } from 'react'
import styles from './cardBarCode.module.css'
import JsBarcode from 'jsbarcode'
import Loading from '../../../Loading/Loading'

type TypeBarCode = {
  id: number,
  code: string,
  name: string,
}

interface Props {
  barCode: TypeBarCode;
  stylesProps?: Styles;
}

interface Styles {
  containerCard?: React.CSSProperties;
  containerPrice?: React.CSSProperties;
  barcodeImage?: React.CSSProperties;
  spanComp?: React.CSSProperties;
}

const CardBarCode: React.FC<Props> = ({ barCode, stylesProps }) => {

  const barcodeRef = useRef<HTMLImageElement>(null);
    
  useEffect( () => {
    if (barcodeRef.current && barCode.code) {
      JsBarcode(barcodeRef.current, barCode.code, {
        format: 'CODE128',
        displayValue: true,
      });
    }
  }, [barCode.code]);

  return (
    <div  className={styles.containerCard} style={stylesProps?.containerCard}>
      <div className={styles.conatainerPrice} style={stylesProps?.containerPrice}>
        <img ref={barcodeRef} className={styles.barcodeImage} alt="Barcode" style={stylesProps?.barcodeImage}/>        
      </div>
      <span style={stylesProps?.spanComp}>{barCode.name}.</span>
    </div>
  )
}

export default CardBarCode;