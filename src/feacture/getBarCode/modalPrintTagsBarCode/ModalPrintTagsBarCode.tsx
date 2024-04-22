import { Modal } from "antd";
import React, { useState } from 'react';
import {ContainerBody, FooterContainer} from "./styleModalBody"
import './modalPrintTags.css'
import PdfCards from "../pdfCards/PdfCards";
import { regTestNumInteger } from "../../../utils/validations"

type TypeBarCode = {
  id: number,
  code: string,
  name: string,
}

type Option = {
  value: string;
  label: string;
}

type Props = {
  openModalPrintTags : boolean;
  setOpenModalPrintTags : React.Dispatch<React.SetStateAction<boolean>>;
  listTags : TypeBarCode[]
}

type DataPrint = {
  selectOptionsSheetsData: Option,
  selectOptionLeterData: Option,
  sizeTagData: string[]
}


const ModalPrintTagsBarCode : React.FC<Props> = ({openModalPrintTags, setOpenModalPrintTags, listTags}) =>{

  const [print, setPrint] = useState<boolean>(false)

  const [selectOptionsSheets, setSelectOptionsSheets] = useState<Option>({ value: '0', label: 'carta' })
  const [selectOptionLeter, setSelectOptionLeter] = useState<Option>({ value: '0', label: '6' })
  const [sizeTag, setSizeTag] = useState<string[]>(['5','3']) /* Ancho x Alto */

  const [dataPrint, setDataPrint] = useState<DataPrint>({
    selectOptionsSheetsData: { value: '0', label: 'carta' },
    selectOptionLeterData: { value: '0', label: '6' },
    sizeTagData: ['5', '3']
  })


  const optionsSheets: Option[] = [
    {value: '0', label: 'carta'},
    /* {value: '1', label: 'A4'},
    {value: '2', label: 'oficio'},
    {value: '3', label: 'tikect 58mm'},
    {value: '4', label: 'tikect 80mm'}, */
  ] 
  const optionsLeter: Option[] = [
    {value: '0', label: '6'},
    {value: '1', label: '8'},
    {value: '2', label: '10'},
    {value: '3', label: '12'},
    {value: '4', label: '16'},
    {value: '5', label: '24'},
    {value: '6', label: '28'},
    {value: '7', label: '36'},
  ]
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    if(name === 'sheeType'){
      const valueSelect = optionsSheets.filter((opt) => opt.value === value)      
      setSelectOptionsSheets(valueSelect[0]);

    }else if(name === 'numberLeter'){
      const valueSelect = optionsLeter.filter((opt) => opt.value === value)      
      setSelectOptionLeter(valueSelect[0]);
    }
  }

  const handleCancel = () => {
    setDataPrint({
      selectOptionsSheetsData: { value: '0', label: 'carta' },
      selectOptionLeterData: { value: '4', label: '6' },
      sizeTagData: ['5', '3']
    })
    setSelectOptionsSheets({ value: '0', label: 'carta' })
    setSelectOptionLeter({ value: '0', label: '6' })
    setOpenModalPrintTags(false)
  };
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'widthTag'){
      if(regTestNumInteger.test(value)){
        const newSizeTag = [...sizeTag]
        newSizeTag[0] = value
        setSizeTag(newSizeTag)
      }

    }else if(name === 'heigthTag'){
      if(regTestNumInteger.test(value)){
        const newSizeTag = [...sizeTag]
        newSizeTag[1] = value
        setSizeTag(newSizeTag)
      }
    }
  }

  const handleDataPrint = () => {
    if(sizeTag.length === 2 && sizeTag[0] !== "" && sizeTag[1] !== ""){
      const newDataPrint: DataPrint = {
        selectOptionLeterData: selectOptionLeter,
        selectOptionsSheetsData: selectOptionsSheets,
        sizeTagData: sizeTag
      }
      setDataPrint(newDataPrint);
    }
  }
  
    
  const printTags = () => {
    setPrint(true)
  }
  
  return <>
    <Modal 
      className="modalPrintTags" 
      title="Etiquetas de precios" 
      open={openModalPrintTags}
       onCancel={handleCancel} 
       okText='Agregar categoria' 
       cancelText='Limpliar campo' footer = {null}
    > 
      <div className="bodyContainerModalPrint">
          <div className="btnPrintTagContainer">
            <button onClick={printTags}>Imprimir</button>
          </div>
          <ContainerBody>
            {listTags.length ?
              <div style={{overflowX: 'auto'}}>
                <PdfCards listTags={listTags} print={print} setPrint={setPrint} openModal={openModalPrintTags} dataPrint={dataPrint}/> 
              </div>             
            : null}
            <div className='containerOptionsPDF'>
              <h3>Opciones de impresión.</h3>

              <div className="containerOptions">
                <label htmlFor="sheeType">Seleccionar tipo hoja:</label>
                <select name="sheeType" id="sheeType" value={selectOptionsSheets.value} onChange={handleSelectChange}>
                  {optionsSheets.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="containerOptions">
                <p>Escriba el Ancho x Alto en centimetros de las etiquetas. </p>
                <div className="containerInputsCards">
                  <input type="text" name="widthTag" id="widthTag"  placeholder="Ancho" value={sizeTag[0]} onChange={handleInput}/>
                  <input type="text" name="heigthTag" id="heigthTag" placeholder="Alto" value={sizeTag[1]} onChange={handleInput}/>
                </div>
              </div>

              <div className="containerOptions">
                <label htmlFor="numberLeter">Numero de letra para el nombre</label>
                <select name="numberLeter" id="numberLeter" value={selectOptionLeter.value} onChange={handleSelectChange}>
                  {optionsLeter.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="containerActionPdf">
                <button onClick={handleDataPrint} disabled={sizeTag[0] !== "" && sizeTag[1] !== "" ? false: true}>Aplicar</button>
              </div>
            </div>          
        </ContainerBody>
      </div>
      
      <FooterContainer>

      </FooterContainer>
    </Modal>
  </>
}
export default ModalPrintTagsBarCode;