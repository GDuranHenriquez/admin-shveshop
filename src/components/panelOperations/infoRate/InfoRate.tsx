import React, { useState } from "react";
import styles from './infoRate.module.css'
import { TypeRate } from "../../../redux/slices/products/typesProducts";
import { EditOutlined } from '@ant-design/icons'
import { postRateBCVRedux } from "../../../redux/slices/products/actionsProducts";
import { useCustomDispatch } from "../../../hooks/redux";
import { useAuth } from "../../../auth/authPro";
import { regexNumberDecimal } from "../../../utils/validations";

interface Props {
  rate: TypeRate | null,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messageErrorProduct : (message: string) => void;
  messageSuccessProduct : (message: string) => void;
}

const InfoRateComponent : React.FC<Props> = ({ rate, setIsLoading, messageErrorProduct, messageSuccessProduct }) => {
  const auth = useAuth();
  const dispatch = useCustomDispatch()
  const [newRate, setNewRate] = useState<string | null>(null)
  const [showButons, setShowButons] = useState<boolean>(false)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if(regexNumberDecimal.test(value) || value === ''){
      setNewRate(value)
    }
  }
  

  const updateRate = async () => {
    try {
      setIsLoading(true)
      const tkn = auth.getAccessToken()
      if(newRate && parseFloat(newRate) > 0){
        const rateud = await postRateBCVRedux(tkn, dispatch, parseFloat(newRate))
        console.log(rateud)
        messageSuccessProduct('Tasa actualizada correctamente')
        funcShowbutons()       
      }else{
        messageErrorProduct('Debe ingresar un tasa mayor que cero')
      }

    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const funcShowbutons = () => {
    setNewRate(null)    
    setShowButons(!showButons)
  }


  return <div className={`div3d ${styles.containerInfoRate}`}>
    <h4>Tasa actual del dolar</h4>
    <div className={styles.containerValueRate}>
      <span>{rate ? '$' + (rate.tasa).toFixed(2) : '$' + 0}</span>
      <button id={styles.butonEditRate} onClick={funcShowbutons}>
        <EditOutlined />
      </button>
    </div>
    <hr style={{ border: '1px solid rgba(0, 0, 0, 0.275)', margin: '10px 0' }} className={`${showButons ? styles.showButons : styles.hideButons}`}></hr>
    <div className={`${styles.containerButons} ${showButons ? styles.showButons : styles.hideButons}`}>
      <div className={styles.conatinerImput}>
        <label htmlFor="inputRate">Introduzca la tasa a usar</label>
        <input type="text" placeholder="..." value={newRate ? newRate : ''} id="inputRate" className={`${styles.inputRate} inputGlobal`} onChange={handleChangeInput}/>
      </div>
      <div className={styles.containerButons}>
        <button className="btnCancel-gb" onClick={funcShowbutons}>Cancelar</button>
        <button className="btnRegister-gb" onClick={updateRate}>Actualizar</button>
      </div>
    </div>
  </div>

}

export default InfoRateComponent;