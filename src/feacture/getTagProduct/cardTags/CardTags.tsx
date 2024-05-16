import React from 'react'
import styles from './cardTag.module.css'
import getConfigCoinIsMlcOrRef from '../../../utils/getConfigCoin'

type TypeTag = {
  id: number,
  name: string,
  price: string,
}

interface Props {
  tag: TypeTag
}

const CardTag: React.FC<Props> = ({ tag }) => {
  const configCoin = getConfigCoinIsMlcOrRef()

  return (
    <div className={styles.containerCard}>
      <div className={styles.conatainerPrice}>
        <span id={styles.price}>{tag.price}</span>
        <span id={styles.siglasCoin}>{configCoin == 'mlc' ? ' Bs.' : ' REF'}</span>
      </div>
      <p>{tag.name}.</p>
    </div>
  )
}

export default CardTag;