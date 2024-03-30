import React, { useState, useEffect } from 'react'
import styles from './register.module.css'
import Loading from '../../Loading/Loading';
import { useAuth } from '../../auth/authPro';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { registerUser } from '../../redux/slices/user/actionUser'
import { notification, NotificationArgsProps  } from 'antd'
/* import { loginUser } from '../../redux/slices/user/actionUser'; */
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {  Navigate } from 'react-router-dom'
import { useCustomSelector } from '../../hooks/redux';
import { TypeUserRootRegister } from '../../redux/slices/user/typeUser';

//expresiones regulares
import { regTestEmail, regTestPassword, regTestNumInteger } from '../../utils/validations'

type NotificationType = 'success' | 'info' | 'warning' | 'error'; 
type NotificationPlacement = NotificationArgsProps['placement'];

interface Props {
  setSwithLoginRegister: React.Dispatch<React.SetStateAction<string>>
}

type Option = {
  value: string;
  label: string;
}

type ErrorType = {
    nombre?: string, 
    direccion?: string,
    dni?: string,
    numDni?: string
    email?: string,
    password?: string,
    confirmPassword?: string,
    passwordAccess?: string,
    telefono?: string,
    operador?: string
  }

const Register : React.FC<Props> = ({ setSwithLoginRegister }) => {
  const auth = useAuth()
  const allTipoDni = useCustomSelector((state) => state.user.allTipoDni)

  const [error, setError] = useState<ErrorType>({});

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ passwordAccess, setPasswordAccess ] = useState<string>('');
  const [ nombre, setNombre ] = useState<string>('');
  const [ direccion, setDireccion ] = useState<string>('');
  const [ telefono, setTelefono ] = useState<string>('');
  const [ dni, setDni ] = useState<string>('');
  const [ numDni, setNumDni ] = useState<string>('');
  const [numOperatorSelect, setNumOperatorSelect] = useState<string>('');
  const [selectedOptionDni, setSelectedOptionDni] = useState('0');
  const [selectedOptionTelefono, setSelectedOptionTelefono] = useState('0');
  const [ selectedOption, setSelectedOption ] = useState<string>('0');

  /* const [selectedOption, setSelectedOption] = useState('1'); */
  
  //visible pass
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false)
  const [passwordAccessVisible, setPasswordAccessVisible] = useState<boolean>(false)
  const [optionsTipoDni, setOptionsTipoDni] = useState<Option[]>([{ value: '0', label: '' }])
  const optionsTelefono = [ 
    {value: '0', label: ''},
    {value: '2', label: '0414'},
    {value: '3', label: '0424'},
    {value: '4', label: '0412'},
    {value: '5', label: '0416'},
    {value: '6', label: '0426'}, 
  ] 
  const options = [
    {value: '0', label: ''},
    {value: 'user', label: 'Admin'},
    {value: 'root', label: 'Super usuario'},
    {value: 'caja', label: 'Cajero'},
  ]

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name = event.target.name
    if(name === 'selectTypeDni'){
      setSelectedOptionDni(value);
      setDni(value)
    }else if(name === 'selectTypeOperator'){
      const operator = optionsTelefono.filter((operator) => operator.value === value)
      if(operator.length){
        const labelOperator = operator[0].label
        setNumOperatorSelect(labelOperator)
      }
      setSelectedOptionTelefono(value)
    }else if(name === 'selectTypeUser'){
      const typeUser = value;
      setSelectedOption(typeUser);
    }
  }

  const validationError = () : ErrorType =>{

    const newError = {...error}
    if(!nombre || nombre === ''){
      newError.nombre = 'Debe introducir un nombre'
    }else{
      delete newError.nombre
    }

    if(!direccion || direccion === ''){
      newError.direccion = 'Debe introducir una dirección corta'
    }else{
      delete newError.direccion
    }

    if(!telefono || telefono === ''){
      newError.telefono = 'Debe introducir un número telefonico'
    }else{
      delete newError.telefono
    }

    if(selectedOptionDni === '0'){
      newError.dni = 'Debe seleccionar el tipo de dni'
    }else{
      delete newError.dni
    }
    if(numDni === ''){
      newError.numDni = 'Debe escribir su numero de identificación'
    }else{
      delete newError.numDni
    }

    if(selectedOptionTelefono === '0'){
      newError.operador = 'Debe seleccionar una operadora'
    }else{
      delete newError.operador
    }


    if(!regTestEmail.test(email)){
      newError.email = 'Debe introducir un formato de email correcto'
    }else{
      delete newError.email
    }

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

    if(passwordAccess === ''){
      newError.passwordAccess = 'Debe indicar su password de super usuario'
    }else{
      delete newError.passwordAccess
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
  const onClickAccesPasswordVisible = () =>{
    setPasswordAccessVisible(!passwordAccessVisible)
  }
  const onClickConfirPasswordVisible = () =>{
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    const value = e.target.value
    /* nombre
    direccion
    numDni */

    if(nameInput === 'email'){
      setEmail(value)
    }else if(nameInput === 'password'){
      if(value.length <= 32){
        setPassword(value)
      }
    }else if(nameInput === 'confirmPassword'){
      if(value.length <= 32){
        setConfirmPassword(value)
      }
    }else if(nameInput === 'passwordAccess'){
      setPasswordAccess(value)
    }else if(nameInput === 'nombre' && nameInput.length <= 64){
      setNombre(value)
    }else if(nameInput === 'direccion' && nameInput.length <= 64){
      setDireccion(value)
    }else if(nameInput === 'numDni' && value.length <= 64 && regTestNumInteger.test(value)){
      setNumDni(value)
    }else if(nameInput === 'telefono' && value.length <= 64 && regTestNumInteger.test(value)){
      setTelefono(value)
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

  const handleSubmit = async () => {
    /* e.preventDefault(); */
    setIsLoading(true);
    try {
      const errors = validationError()
      const keyError = Object.keys(errors)
      if(keyError.length){
        return 0
      }

      const data: TypeUserRootRegister = {
        correo: email,
        password: password,
        passwordAccess: passwordAccess,
        nombre: nombre,
        direccion: direccion,
        telefono: numOperatorSelect + telefono,
        dni: numDni,
        tipoDni: parseInt(dni),
        level: selectedOption
      }

      const response = await registerUser(data);
      if('message' in response){
        openNotificationWithIcon('success', response.message , null, 'bottomRight')
        clearInputs()
      }else{
        openNotificationWithIcon('error', response.error , null, 'bottomRight')
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
    setPassword('')
    setConfirmPassword('')
    setPasswordAccess('')
    setNombre('')
    setDireccion('')
    setTelefono('')
    setDni('0')
    setNumDni('')
    setNumOperatorSelect('')
    setSelectedOptionDni('0')
    setSelectedOptionTelefono('0')
    setSelectedOption('0')
    /* setSelectedOption('1') */
  }

  const handleCancel = () => {
    clearInputs()
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/panel"></Navigate>;
  }

  const switchToLogin = () => {
    setSwithLoginRegister('toLogin')
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
  }, [email, password, confirmPassword, passwordAccess]) 

  useEffect(() => {
    if(allTipoDni.length){
      const newOptionsTipoDni: Option[] = [{ value: '0', label: '' }]
      for (let i = 0; i < allTipoDni.length; i++) {
        const element = allTipoDni[i];
        const opt = { value: `${element.id}`, label: element.tipo }
        newOptionsTipoDni.push(opt)
      }
      setOptionsTipoDni(newOptionsTipoDni)
    }
  }, [allTipoDni])

  return (
    <div className={styles.containerLogin}>
      <div className={styles.bodyLoginContainer}>
        <div className={styles.containerForm}>
          <h3 id='titleForm'>Registro de usuario</h3>
          <div className={styles.containerFomRegister}>
            
            <div className={styles.containerInputs}>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id='nombre' name='nombre' value={nombre} onChange={handleChangeInputs}/>
              {error && error.nombre ? getComponentErrors(error.nombre) : null}
            </div>

            <div className={styles.containerInputs}>
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id='direccion' name='direccion' value={direccion} onChange={handleChangeInputs}/>
              {error && error.direccion ? getComponentErrors(error.direccion) : null}
            </div>

            <div className={styles.containerInputs}>
              <label htmlFor="numDni">Identificador DNI / CI:</label>
              <div className={styles.containerSeletTipeDni}>
                <select id="selectTypeDni" name='selectTypeDni' value={selectedOptionDni} onChange={handleSelectChange}>
                    {optionsTipoDni.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>                    
                    ))}
                </select>
                <input type="text" id='numDni' name='numDni' value={numDni} onChange={handleChangeInputs}/>
              </div>              
              {error && error.numDni ? getComponentErrors(error.numDni) : null}
              {error && error.dni ? getComponentErrors(error.dni) : null}
            </div>

            <div className={styles.containerInputs}>
              <label htmlFor="telefono">Telefono de contacto:</label>
              <div className={styles.containerSeletTipeDni}>
                <select id="selectTypeOperator" name='selectTypeOperator' value={selectedOptionTelefono} 
                  onChange={handleSelectChange}>
                    {optionsTelefono.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>                    
                    ))}
                </select>
                <input type="text" id='telefono' name='telefono' value={telefono} onChange={handleChangeInputs}/>
              </div>              
              {error && error.telefono ? getComponentErrors(error.telefono) : null}
              {error && error.operador ? getComponentErrors(error.operador) : null}
            </div>

            <div className={styles.containerInputs}>
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' name='email' value={email} onChange={handleChangeInputs}/>
              {error && error.email ? getComponentErrors(error.email) : null}
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

            <div className={styles.containerInputs}>
              <label htmlFor="passwordAccess">Password de super usuario:</label>
              <div className={`${styles.containerInputPassword} ${styles.inputPasswordContainer}` }>
                <input type={passwordAccessVisible? 'text':'password'} id='passwordAccess' 
                  name='passwordAccess' value={passwordAccess} onChange={handleChangeInputs}
                />
                <div className={styles.containerEye} onClick={onClickAccesPasswordVisible}>
                  {
                    passwordAccessVisible? <EyeOutlined/>: <EyeInvisibleOutlined/>
                  }
                </div>
              </div>
              {error && error.passwordAccess ? getComponentErrors(error.passwordAccess) : null}
            </div>
            
            <div className={styles.containerInputs}>
              <label htmlFor="selectTypeUser">Seleccionar tipo de usuario:</label>
              {/* <div className={`${styles.containerInputPassword} ${styles.inputPasswordContainer}` }> */}                         

                <select id="selectTypeUser" name='selectTypeUser' value={selectedOption} onChange={handleSelectChange}>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
              {/* </div> */}
            </div>

          </div>
        </div>
        <div className={styles.conatinerButtons}>
          <button id={styles.btnCancel} onClick={handleCancel} >Cancelar</button>
          <button id={styles.btnRegister} onClick={handleSubmit} 
            disabled = {Object.keys(error).length > 0 ? true : false}>
            Registrarse
          </button>
        </div>

        <div className={styles.changeCreateSesion}>
          <span>Para iniciar sesión click </span>
          <button onClick={switchToLogin}>aquí</button>
        </div>
      </div>
      <ToastContainer></ToastContainer> 
      {isLoading && <Loading/>}
      {contextHolder}
    </div>
  )

}

export default Register;