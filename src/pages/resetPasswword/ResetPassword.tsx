import React from 'react'
import styles from './resetPassword.module.css'
import ResetPassword from '../../components/resetPassword/ResetPassword'
import fontLogin from '../../assets/img/fonLoging.jpg'


const ResetPasswordPage : React.FC =  () => {


  return (
    <div className={styles.containerLoginPage}>
      <div className={styles.imgBackGround}>
        <img src={fontLogin} alt="Font Login" />
      </div>
      <ResetPassword/>
    </div>
  )
}

export default ResetPasswordPage