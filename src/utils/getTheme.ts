import logoMukafe from '../assets/logos/LogoMukafe.png';
import logoSH from '../assets/logos/sh.png';
import logoDavirton from '../assets/logos/logo64x64.png';
import logoFeredie from '../assets/logos/RFeredie2.png';

export const getLogo = (nameTheme: string) => {
  switch (nameTheme) {
    case 'mukafe':
      return logoMukafe;
    case 'sh':
      return logoSH;   
    case 'davirton':
      return logoDavirton;
    case 'feredie':
      return logoFeredie
    default:
      return logoMukafe;  
  }
} 

export const getTheme = (themeName: string) =>{
  const theme_mukafe = {
    backGroundBarSide: 'rgba(28, 19, 22, 1)',
    letraLogo: 'rgba(235, 143, 74, 1)',
    contornoLogo: 'rgba(239, 125, 0, 1)',
    texColor: 'rgba(255, 179, 123, 1)',
  }
  const theme_sh = {
    backGroundBarSide: 'rgba(254 , 208, 208, 1)',
    letraLogo: 'rgba(0, 0, 0, 1)',
    contornoLogo: 'rgba(196, 179, 153, 1)'
  }
  const theme_davirton = {
    backGroundBarSide: 'rgba(0, 0, 0, 1)',
    letraLogo: 'rgba(0, 0 ,0 ,1)',
    contornoLogo: 'rgba(196, 179, 153, 1)'    
  }
  const defaultTheme = {
    backGroundBarSide: 'rgba(62, 38, 20, 1)',
    letraLogo: 'rgba(235, 143, 74, 1)',
    contornoLogo: 'rgba(239, 125, 0, 1)'
  }
  const theme_feredie = {
    backGroundBarSide: 'rgba(0, 0, 0, 1)',
    letraLogo: 'rgba(0, 0 ,0 ,1)',
    contornoLogo: 'rgba(196, 179, 153, 1)'
  }
  switch (themeName) {
    case 'mukafe':
      return theme_mukafe;
    case 'sh':
      return theme_sh; 
    case 'davirton':
      return theme_davirton;  
    case 'feredie':
      return theme_feredie  
    default:
      return defaultTheme
  }
}