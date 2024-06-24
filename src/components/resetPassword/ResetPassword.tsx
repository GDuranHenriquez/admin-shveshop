import React, { useState, useEffect } from 'react'
import styles from './resetPassword.module.css'
import Loading from '../../Loading/Loading'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { postResetPassword } from '../../redux/slices/user/actionUser'
import { notification, NotificationArgsProps  } from 'antd'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {  useNavigate, useSearchParams } from 'react-router-dom'

import { regTestPassword } from '../../utils/validations';

type ErrorType = {
  password?: string,
  confirmPassword?: string,
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'; 
type NotificationPlacement = NotificationArgsProps['placement'];

const ResetPassword : React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams ()
  const token = searchParams.get('token')

  const [error, setError] = useState<ErrorType>({});

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(""); 
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false)

  const validationError = () : ErrorType =>{

    const newError = {...error}

    if(!regTestPassword.test(password)){
      newError.password = 'El password debe ser alfanumerico y tener al menos uno de estos caracteres especiales, @#$*_'
    }else{
      delete newError.password
    }

    if(confirmPassword !== password){
      newError.confirmPassword = 'El password y su confirmación no coinciden'
    }else{
      delete newError.confirmPassword
    }
    setError((_err) => newError)
    return newError
  }

  //notification
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, title: string, descriccion:string | null, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: descriccion? descriccion:null,
      placement,
      duration: 1
    });
  };

  const onClickPasswordVisible = () =>{
    setPasswordVisible(!passwordVisible)
  }
  const onClickConfirPasswordVisible = () =>{
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    const value = e.target.value
    
    if(nameInput === 'password'){
      if(value.length <= 32){
        setPassword(value)
      }
    }else if(nameInput === 'confirmPassword'){
      if(value.length <= 32){
        setConfirmPassword(value)
      }
    }
  }

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

  const clearInputs = () =>{
    setPassword('')
    setConfirmPassword('')
  }

  const handleCancel = () => {
    clearInputs()
  }

  const getComponentErrors = (text: string) => {
    return (<div className={styles.containerError}>
      <span>{text}</span>
    </div>)
  }

  useEffect(() => {
    const numError = Object.keys(error)
    if(numError.length){
      validationError()
    }
  }, [password, confirmPassword]) 

  const handleSubmit = async () => {
    /* e.preventDefault(); */
    setIsLoading(true);
    try {
      const errors = validationError()
      const keyError = Object.keys(errors)
      if(keyError.length){
        return 0
      }
      if(!token){
        openNotificationWithIcon('error', 'Token invalido o no provisto', null, 'bottomRight')
        return 0
      }

      const response = await postResetPassword(password, token);

      if ('code' in response) {
        if (response.code == 200) {
          openNotificationWithIcon('success', response.message, null, 'bottomRight')
          clearInputs();
          setTimeout(() => {
            navigate('/')
          }, 2000)
          
        }else{
          openNotificationWithIcon('error', response.message, null, 'bottomRight')
        }        
        
      } else{
        openNotificationWithIcon('error', response.message, null, 'bottomRight')
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

  const switchToLogin = () => {
    clearInputs()
    navigate('/')
  }


  return (
    <div className={styles.containerLogin}>
      <div className={styles.bodyLoginContainer}>
        <div className={styles.containerForm}>
          <h3 id='titleForm'>Cambiar su contraseña</h3>
          <div className={styles.containerFomRegister}> 

            <div className={styles.containerInputs}>
              <label htmlFor="password">Password:</label>
              <div className={`${styles.containerInputPassword} ${styles.inputPasswordContainer}` }>
                <input type={passwordVisible? 'text':'password'} id='password' name='password' value={password} onChange={handleChangeInputs}/>
                <div className={styles.containerEye} onClick={onClickPasswordVisible}>
                  {
                    passwordVisible? <EyeOutlined/>: <EyeInvisibleOutlined/>
                  }
                </div>
              </div>
              {error && error.password ? getComponentErrors(error.password) : null}
            </div>

            <div className={styles.containerInputs}>
              <label htmlFor="confirmPassword">Confirmar Password:</label>
              <div className={`${styles.containerInputPassword} ${styles.inputPasswordContainer}` }>
                <input type={confirmPasswordVisible? 'text':'password'} id='confirmPassword' 
                  name='confirmPassword' value={confirmPassword} onChange={handleChangeInputs}
                />
                <div className={styles.containerEye} onClick={onClickConfirPasswordVisible}>
                  {
                    confirmPasswordVisible? <EyeOutlined/>: <EyeInvisibleOutlined/>
                  }
                </div>
              </div>
              {error && error.confirmPassword ? getComponentErrors(error.confirmPassword) : null}
            </div>
          </div>
        </div>

        <div className={styles.conatinerButtons}>
          <button id={styles.btnCancel} onClick={handleCancel} >limpiar</button>
          <button id={styles.btnRegister} onClick={handleSubmit} 
            disabled = {Object.keys(error).length > 0 ? true : false}>
            Cambiar contraseña
          </button>
        </div>

        <div className={styles.changeCreateSesion}>
          <span>Para ir a inicio de session haga click </span>
          <button onClick={switchToLogin}>aquí</button>
        </div>
      </div>
      <ToastContainer></ToastContainer> 
      {isLoading && <Loading/>}
      {contextHolder}
    </div>
  )

}

export default ResetPassword