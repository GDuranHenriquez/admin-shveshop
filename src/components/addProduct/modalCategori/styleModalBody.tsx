import styled from "styled-components";

export const ContainerBody = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 40% auto;
  grid-template-rows: auto;
  gap: 30px;
  margin-bottom: 50px;
  > div:nth-child(1) {
    display: flex;
    flex-wrap: nowrap;    
    align-items: center;    
  }
  .headerCell{
    background: #dfdbdb;
    font-size: 16px;
    padding: 3px;
  }
  .createCategory{
    display: flex;
    flex-wrap: wrap;    
    align-items: center;
    width: 100%;
    label{
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      margin-bottom: 5px;
      span{
        color: red;
      }
    }   
    
  }
  .editCategory{
    display: flex;
    flex-wrap: wrap;    
    align-items: center;
    width: 100%;
    label{
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      margin-bottom: 5px;
      span{
        font-size: 16px;
        font-weight: bold;
        color: #cf7c39;
      }
      #strict{
        color: red;
      }
    }
  }
`

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  button{
    width: 30%;
  }
  #ok{
    color: white;
    font-weight: bold;
    background: blue;
  }
  #clear{
    color: blue;
    font-weight: bold;
    background: white;
  }
`
