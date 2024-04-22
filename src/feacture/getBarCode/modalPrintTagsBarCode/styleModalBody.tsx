import styled from "styled-components"

export const ContainerBody = styled.div`
  display: grid ;
  min-width: 100%;
  grid-template-columns: auto 300px;
  grid-template-rows: auto;
  gap: 10px;
  margin-top: 15px;
  align-items: start;
  justify-content: center;
  min-height: 75vh;
  max-height: 75vh;
  overflow-y: auto;
  .containerOptionsPDF{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    overflow-x: auto;
    border: 1px solid rgba(0, 0 , 0 , 0.3);
    border-radius: 8px;
    padding: 5px;
    min-height: max-content;
    max-height: 75vh;
    margin-right: 10px;    
    h3{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      font-weight: 700;
      font-family: 'Roboto', sans-serif;
    }      
    .containerOptions{
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 15px;
      justify-content: center;
      align-items: start;
      width: 100%;
      
      label{
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
      }
      p{
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        line-height: 1.2;
      }
      select{
        width: 180px;
        padding: 2px;
        height: 25px;
        border-radius: 8px;
        font-family: 'Roboto', sans-serif;
      }
      .containerInputsCards{
        display: flex;
        flex-direction: row;
        gap: 5px;
        width: 100%;
        input{
          width: 45%;
          height: 25px;
          padding: 2px;
          border-radius: 8px;
          font-family: 'Roboto', sans-serif;
        }
      }
    }
    .containerActionPdf{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      button{
        width: 70%;
        min-width: 100px;
        border-radius: 8px;
        height: 40px;
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-weight: 700;
        font-family: 'Roboto', sans-serif;
        color: white;
        background: #0f970f;
        &:hover{
          cursor: pointer;
        }
        &:disabled{
          background: gray;
        }
      }
    }
  }
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
    font-weight: bold;
    font-size: 14px;
  }
  .headerCell{
    background: #dfdbdb;
    font-size: 16px;
    padding: 3px;
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
    font-weight: bold;
    font-size: 12px;
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
  .okdavirton{
    background: rgba(0 , 0, 0, 1) !important;
    color: white !important;
  }
  .okferedie{
    background: rgba(0 , 0, 0, 1) !important;
    color: white !important;
  }
  .okmukafe{
    background: rgba(28, 19, 22, 1) !important;
    color: rgba(255, 179, 123, 1) !important;
  }
  .oksh:hover{
    border-color: white !important;
    background: rgba(254 , 208, 208, 0.8) !important;
  }
  .okdavirton:hover{
    border-color: white !important;
    background: rgba(0 , 0, 0, 0.8) !important;
  }
  .okferedie:hover{
    border-color: white !important;
    background: rgba(0 , 0, 0, 0.8) !important;
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
