interface userData {
  email: string,
  password: string,
}

interface userDataRegisterError {
  email?: string,
  password?: string,
  name?: string,
  last_name?: string
}


export type ValidationErrorRegister = {
  email?: string; 
  password?: string, 
  name?: string, 
  last_name?: string
}

export const regTestEmail = /\S+@\S+\.\S+/;
export const regTestPassword = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$*_])/;
export const regTestNumInteger = /^\d*$/;
export const regexNumberDecimal = /^([0-9]+\.?[0-9]{0,3})$/;

export const validation = (userData: userData) => {
  const error: { email?: string; password?: string, name?: string, last_name?: string } = {};
  //Email validation
  if (!/\S+@\S+\.\S+/.test(userData.email)) {
    error.email = "Este correo no es válido";
  }
  if (!userData.email) {
    error.email = "Ingrese un correo electrónico";
  }
  /* if (userData.email.length > 35) {
    error.email =
      "The email address should not contain more than 35 characters";
  } */
  //Password validation
  const regest = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\\-/])/
  if (
    !regest.test(
      userData.password
    )
  ) {
    error.password = "La contraseña debe contener al menos un número, una letra y un caracter especial";
  }
  if (!(userData.password.length >= 8 && userData.password.length <= 32)) {
    error.password = "La contraseña debe contener entre 8 y 32 caracteres";
  }

  return error;
};

export const validatePassword = (password: string): boolean =>{
  const regest = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\\-/])/
  if (regest.test(password)){
    return true
  }else{
    return false;
  }
}
export const validateEmail = (email: string): boolean =>{
  const regest = /\S+@\S+\.\S+/
  if (regest.test(email)){
    return true
  }else{
    return false;
  }
}

export const validationErrorRegister = (userData: userDataRegisterError): ValidationErrorRegister | null => {
  const error: { email?: string; password?: string, name?: string, last_name?: string } = {};
  const regest = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\\-/])/
  //Validate Email
  if(userData.email){
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      error.email = "Este correo no es válido";
    }
  }if(!userData.email || userData.email === '') {
    error.email = "Ingrese un correo electrónico";
  }
  
  //Password validation

  if(userData.password){
    if (!regest.test(userData.password)) {
      error.password = "La contraseña debe contener al menos un número, una letra y un caracter especial";
    }
    if (!(userData.password.length >= 8 && userData.password.length <= 32)) {
      error.password = "La contraseña debe contener entre 8 y 32 caracteres";
    }
  }else if(!userData.password || userData.password === '') {
    error.password = "Ingrese un password";
  }

  if(!userData.name || userData.name === ''){
    error.name = 'Este campo es obligatorio'
  }
  if(!userData.last_name || userData.last_name === ''){
    error.last_name = 'Este campo es obligatorio'
  }
  const num_erros: number = Object.keys(error).length;

  if(num_erros === 0){
    return null;
  }else{
    return error
  }

  
};