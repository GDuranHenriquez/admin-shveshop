import React from 'react'
import styles from './cardTag.module.css'


type TypeTag = {
  id: number,
  name: string,
  price: string,
}

interface Props {
  tag: TypeTag
}

const CardTag: React.FC<Props> = ({tag}) => {

  return (
    <div className={styles.containerCard}>
      <div className={styles.conatainerPrice}>
        <span id={styles.price}>{tag.price}</span>
        <span>Bs.</span>
      </div>
      <p>{tag.name}.</p>
    </div>
  )
}

export default CardTag;