import React, { useState, useEffect } from 'react'
import styles from './login.module.css'
import Loading from '../../Loading/Loading';
import { useAuth } from '../../auth/authPro';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { AuthResponse } from '../../auth/typesProtecterRoute'
import { notification, NotificationArgsProps  } from 'antd'
import { loginUser } from '../../redux/slices/user/actionUser';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Navigate } from 'react-router-dom'
import { getRateBCVRedux } from '../../redux/slices/products/actionsProducts'
import { useCustomDispatch } from '../../hooks/redux'

type NotificationType = 'success' | 'info' | 'warning' | 'error'; 
type NotificationPlacement = NotificationArgsProps['placement'];

interface Props {
  setSwithLoginRegister: React.Dispatch<React.SetStateAction<string>>
}

const Login : React.FC<Props> = ({setSwithLoginRegister}) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const dispatch = useCustomDispatch()
  const [error, setError] = useState<{ email?: string; password?: string ; 
    name?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

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

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    const value = e.target.value
    if(nameInput === 'email'){
      setEmail(value)
    }else if(nameInput === 'password'){
      setPassword(value)
    }
  }

  const clearImp = () => {
    setEmail('');
    setPassword(''); 
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

  const handleSubmit = async () => {
    /* e.preventDefault(); */
    setIsLoading(true);
    try {
      if(password === ''){
        messageError('Debe rellenar los campos obligatorios')
        setError({email: error.email, password: 'Este campo es obligatorio'})
        return null
      }else if(email === ''){
        messageError('Debe rellenar los campos obligatorios')
        setError({password: error.password, email: 'Este campo es obligatorio'})
        return null
      }
      if(Object.keys(error).length){
        messageError('Campos imcorrectos')
        return null
      }

      const data = {
        correo: email,
        password: password
      }
      
      const loginResponse = await loginUser(data);
      
      if (loginResponse.pass) {
        
        if (loginResponse.accessToken && loginResponse.refreshToken) {
          const authResponse: AuthResponse = {
            pass: loginResponse.pass,
            user: loginResponse.user,
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.refreshToken,
            message: loginResponse.message
          }
          const tkn = loginResponse.accessToken;
          await getRateBCVRedux(tkn, dispatch);
          clearImp();
          auth.saveUser(authResponse);
        }
        
        openNotificationWithIcon('success', 'Inicio de sesión correctamente', null, 'bottomRight')
        auth.getAccess();
        setTimeout(() => {
          navigate('/panel')
        }, 500);
        
      } else if (loginResponse.response.status === 403) {
        if (loginResponse.response.data.message) {
          messageError(loginResponse.response.data.message);
          
        } else {
          const message = loginResponse.response.data.error
          messageError(message);
          
        }
      } else {
        messageError(loginResponse.response.data.error);
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
      clearImp();
      setIsLoading(false);
    }
  };

  const clearInputs = () =>{
    setEmail('')
    setPassword('')
  }

  const handleCancel = () => {
    clearInputs()
  }

  const switchToRegister = () => {
    setSwithLoginRegister('toRegister')
  }

  useEffect(() =>{
    if(email === '' && password ===''){
      setError({email: '', password: ''});
    }else if(email === '' && password !==''){
      setError({email: ''});
    }else if(email !== '' && password ===''){
      setError({password: ''});
    }else{
      setError({})
    }
  }, [email, password])

  if (auth.isAuthenticated) {

    return <Navigate to="/panel"></Navigate>;
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.bodyLoginContainer}>
        <div className={styles.containerForm}>
          <h3 id='titleForm'>Inicio de sesión</h3>
          <div className={styles.containerFomRegister}>
            <div className={styles.containerInputs}>
              <label htmlFor="email">Usuario / Email:</label>
              <input type="email" id='email' name='email' value={email} onChange={handleChangeInputs}/>
            </div>
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
            </div>
          </div>
        </div>

        <div className={styles.conatinerButtons}>
          <button id={styles.btnCancel} onClick={handleCancel} >Cancelar</button>
          <button id={styles.btnRegister} onClick={handleSubmit} disabled = {Object.keys(error).length > 0 ? true : false}>
            Iniciar sesión
          </button>
        </div>

        <div className={styles.changeCreateSesion}>
          <span>Para crear una cuenta has click </span>
          <button onClick={switchToRegister}>aquí</button>
        </div>
      </div>
      <ToastContainer></ToastContainer> 
      {isLoading && <Loading/>}
      {contextHolder}
    </div>
  )

}

export default Login;