import styled from "styled-components";

export const ContainerBody = styled.div`
  display: grid ;
  min-width: 100%;
  grid-template-columns: 40% auto;
  grid-template-rows: auto;
  gap: 20px;
  margin-bottom: 50px;
  gap: 10px;
  align-items: center;
  button{
    width: 15%;
  }
  #ok{
    color: white;
    font-weight: bold;
    font-size: 14px;
    background: blue;
  }
  #clear{
    color: blue;
    font-weight: bold;
    font-size: 14px;
    background: white;
  }
  .headerCell{
    background: #dfdbdb;
    font-size: 16px;
    padding: 3px;
  }
  .createPresentacion{
    display: flex;
    flex-wrap: wrap;    
    
    label{
      font-size: 14px;
      font-weight: 500;
      margin-left: 0px;
      margin-bottom: 5px;
      span{
        color: red;
      }
    }   
    
  }
  .editPresentacion{
    display: flex;
    flex-wrap: wrap;    
    align-items: center;
    label{
      font-size: 14px;
      font-weight: 500;
      margin-left: 0px;
      margin-bottom: 5px;
      span{
        font-size: 14px;
        font-weight: bold;
        color: #cf7c39;
      }
      #strict{
        color: red;
      }
    }
  }

  
  @media (max-width: 950px){
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    font-weight: 12px;
    gap: 20px;
    margin-bottom: 30px;
    .headerCell{
      background: #dfdbdb;
      font-size: 12px;
      padding: 2px;
    }
    .createPresentacion{
    display: flex;
    flex-wrap: wrap;    
    align-items: center;
    width: 100%;
    label{
      font-size: 12px;
      font-weight: bold;
      margin-left: 5px;
      margin-bottom: 5px;
      span{
        font-size: 12px;
        padding: 0;
        margin: 0;
        color: red;
      }
    }   
    
  
    }
    .editPresentacion{
      display: flex;
      flex-wrap: wrap;    
      align-items: center;
      width: 100%;
      label{
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 5px;
        span{
          font-size: 13px;
          font-weight: bold;
          color: #cf7c39;
        }
        #strict{
          color: red;
        }
      }
    }
    #ok{
      color: white;
      font-weight: bold;
      font-size: 8px;
      background: blue;
    }
    #clear{
      color: blue;
      font-weight: bold;
      font-size: 8px;
      background: white;
    }
    
  }
  @media screen and (max-width: 950px){
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    font-weight: 12px;
    gap: 20px;
    margin-bottom: 30px;
    .headerCell{
      background: #dfdbdb;
      font-size: 12px;
      padding: 2px;
    }
    .createPresentacion{
    display: flex;
    flex-wrap: wrap;    
    align-items: center;
    width: 100%;
    label{
      font-size: 12px;
      font-weight: bold;
      margin-left: 5px;
      margin-bottom: 5px;
      span{
        font-size: 12px;
        padding: 0;
        margin: 0;
        color: red;
      }
    }   
    
  
    }
    .editPresentacion{
      display: flex;
      flex-wrap: wrap;    
      align-items: center;
      width: 100%;
      label{
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 5px;
        span{
          font-size: 13px;
          font-weight: bold;
          color: #cf7c39;
        }
        #strict{
          color: red;
        }
      }
    }
    #ok{
      color: white;
      font-weight: bold;
      font-size: 8px;
      background: blue;
    }
    #clear{
      color: blue;
      font-weight: bold;
      font-size: 8px;
      background: white;
    }
  }
`

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  button{
    width: 40%;
  }
  #ok{
    color: white;
    font-weight: bold;
    font-size: 12px;
    background: blue;
  }
  #clear{
    color: blue;
    font-weight: bold;
    font-size: 12px;
    background: white;
  }
  .clearsh{
    background: white !important;
    color: black !important;
  }
  .cleardavirton{
    background: white !important;
    color: black !important;
  }
  .clearferedie{
    background: white !important;
    color: black !important;
  }
  .clearmukafe{
    background: white !important;
    color: black !important;
  }
  .oksh{
    background: rgba(254 , 208, 208, 1) !important;
    color: black !important;
  }
  .oksh:hover{
    border-color: white !important;
    background: rgba(254 , 208, 208, 0.8) !important;
  }
  .okdavirton{
    background: rgba(0 , 0, 0, 0.9) !important;
    color: white !important;
  }
  .okferedie{
    background: rgba(0 , 0, 0, 0.9) !important;
    color: white !important;
  }
  .okdavirton:hover{
    border-color: white !important;
    background: rgba(0 , 0, 0, 0.8) !important;
  }
  .okferedie:hover{
    border-color: white !important;
    background: rgba(0 , 0, 0, 0.8) !important;
  }
  .okmukafe{
    background: rgba(28, 19, 22, 1) !important;
    color: rgba(255, 179, 123, 1) !important;
  }
  .okmukafe:hover{
    border-color: white !important;
    background: rgba(28, 19, 22, 0.9) !important;
  }
  @media (max-width: 950px){
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
    padding: 5px;

    button{
      padding: 5px;
      width: 45%;
    }

    #ok{
      color: white;
      font-weight: bold;
      background: blue;
      font-size: 11px;
    }
    
    #clear{
      color: blue;
      font-weight: bold;
      background: white;
      font-size: 11px;
    }
  }
  @media screen and (max-width: 950px){
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
    padding: 5px;
    button{
      padding: 5px;
      width: 45%;
    }
    #ok{
      color: white;
      font-weight: bold;
      background: blue;
      font-size: 11px;
    }
    #clear{
      color: blue;
      font-weight: bold;
      background: white;
      font-size: 11px;
    }
  }
  @media (max-width: 420px){
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 5px;
    button{
      padding: 5px;
      width: 49%;
    }
    #ok{
      color: white;
      font-weight: bold;
      background: blue;
      font-size: 8px;
    }
    #clear{
      color: blue;
      font-weight: bold;
      background: white;
      font-size: 8px;
    }
  }
  @media screen and (max-width: 420px){
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 5px;
    padding: 5px;
    button{
      padding: 5px;
      width: 49%;
    }
    #ok{
      color: white;
      font-weight: bold;
      background: blue;
      font-size: 8px;
    }
    #clear{
      color: blue;
      font-weight: bold;
      background: white;
      font-size: 8px;
    }
  }
`
