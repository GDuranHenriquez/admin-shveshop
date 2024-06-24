import React, { useState, useEffect } from 'react';
import styles from './forgotPassword.module.css'
import Loading from '../../Loading/Loading';
import { getLinkForgotPassword } from '../../redux/slices/user/actionUser';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regTestEmail } from '../../utils/validations';

interface Props {
  setChangeView : React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPassword : React.FC<Props> = ({ setChangeView }) => {

  const [error, setError] = useState<{ email?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  //notification
  

  
  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    const value = e.target.value
    if(nameInput === 'email'){
      setEmail(value)
    }
    handleError(value)
  }

  const clearImp = () => {
    setEmail('');
  };

  const messageError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const messageSuccess = (message: string) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleError = (changeEmail : string | null): { email?: string} => {
    const errors = {...error}
    const valueEmail = changeEmail ? changeEmail : email
    if(valueEmail === ''){
      errors.email = 'Este campo es obligatorio'
      setError(errors)
      return errors
    }else if(!regTestEmail.test(valueEmail)){
      errors.email = 'Formato de email es incorrecto'
      setError(errors)
      return errors
    }else{
      delete error.email
      return errors
    }
    
  }

  const getComponentErrors = (text: string) => {
    return (<div className={styles.containerError}>
      <span>{text}</span>
    </div>)
  }

  const handleSubmit = async () => {
    /* e.preventDefault(); */
    try {
      setIsLoading(true);
      const errors = handleError(null)
      if(Object.keys(errors).length){
        //messageError('Campos imcorrectos')
        return null
      }

      const loginResponse = await getLinkForgotPassword(email);

      if ('code' in loginResponse) {
        if (loginResponse.code == 200) {
          messageSuccess(loginResponse.message)
          clearImp();
          setTimeout(() => {
            changeToForgotLogin()
          }, 3000);
        }else{
          messageError(loginResponse.message)
        }        
        
      } else{
        messageError(loginResponse.message)
      } 
    } catch (error: unknown) {      
      if(typeof error === 'string'){
        messageError(error)
      }else if(error instanceof Error){
        const message = error.message
        messageError(message)
      } else {
        console.log(error)
      }         
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInputs = () =>{
    setEmail('')
  }

  const handleCancel = () => {
    clearInputs()
  }

  const changeToForgotLogin = () : void => {
    setChangeView('toLogin')
  }

  useEffect(() =>{
    if(Object.keys(error).length){
      handleError(null)
    }    
  }, [email])

  return (
    <div className={styles.containerLogin}>
      <div className={styles.bodyLoginContainer}>
        <div className={styles.containerForm}>
          <h3 id='titleForm'>Recuperación de contraseña</h3>
          <div className={styles.containerFomRegister}>
            <div className={styles.containerInputs}>
              <label htmlFor="email">Usuario / Email:</label>
              <input type="email" id='email' name='email' value={email} onChange={handleChangeInputs}/>
            </div>
            {error && error.email ? getComponentErrors(error.email) : null}
          </div>
        </div>

        <div className={styles.conatinerButtons}>
          <button id={styles.btnCancel} onClick={handleCancel} >Cancelar</button>
          <button id={styles.btnRegister} onClick={handleSubmit} disabled = {Object.keys(error).length > 0 ? true : false}>
            Enviar
          </button>
        </div>
      </div>
      <div className={styles.containerSwichView}>
        <span>Volver al inicio de session <button onClick={changeToForgotLogin}>aquí</button></span>
      </div>
      <ToastContainer></ToastContainer> 
      {isLoading && <Loading/>}
    </div>
  )

}

export default ForgotPassword;