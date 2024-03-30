import React, {useState} from 'react'
import styles from './loginPage.module.css'
import Login from '../../components/login/Login'
import fontLogin from '../../assets/img/fonLoging.jpg'
import Register from '../../components/register/Register'

const LoginPage : React.FC =  () => {

  const [ swithLoginRegister , setSwithLoginRegister] = useState<string>('toLogin')

  return (
    <div className={styles.containerLoginPage}>
      <div className={styles.imgBackGround}>
        <img src={fontLogin} alt="Font Login" />
      </div>
      {swithLoginRegister === 'toLogin' ? <Login setSwithLoginRegister={setSwithLoginRegister}/> 
        : 
        <Register setSwithLoginRegister={setSwithLoginRegister}/>
      }
      
    </div>
  )
}

export default LoginPage