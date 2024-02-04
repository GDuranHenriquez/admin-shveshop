import { Input, Modal, Button } from "antd";
import React, { useState } from 'react';
import {ContainerBody, FooterContainer} from "./styleModalPresentacion";
import { postPresentacion, putUpdatePresentacion } from "../../../redux/slices/products/actionsProducts";
import { useCustomDispatch, useCustomSelector } from "../../../hooks/redux";
import { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable, { MUIDataTableColumn, MUIDataTableState, Responsive } from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {EditOutlined} from '@ant-design/icons';
import './modalPresentacion.css'

type Props = {
  openModalPresentacion: boolean;
  setOpenModalPresentacion : React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomTableMeta {
  rowIndex: number;
  columnData: MUIDataTableColumn;
  rowData: any[]; // Ajusta el tipo de datos según tus necesidades
  tableData: any[]; // Ajusta el tipo de datos según tus necesidades
  tableState: MUIDataTableState;
}

const ModalPresentacion: React.FC<Props> = ({openModalPresentacion, setOpenModalPresentacion}) =>{
  const dispatch = useCustomDispatch();
  const allPresentacion = useCustomSelector((state) => state.product.allPresentacion);
  const themeSelect = import.meta.env.VITE_TEMA;

  const [presentacion, setPresentacion] = useState<string>('')
  const [editPresentacion, setEditPresentacion] = useState<Array<number | boolean | string> | null>(null);

  const handleOk = () => {
    postPresentacion(dispatch, {nombre: presentacion}).then((res) =>{
      if(res instanceof AxiosError){
        if(res.response?.status === 404){
          const error = res.response?.data
          if(error.error === 'Validation error'){
            messageErrorProduct('Nombre de la presentacion ya existe')
          }
        }        
      }else if(res === 200){
        setPresentacion('')
        setEditPresentacion(null);
        messageSuccessProduct('Presentacion agregada exitosamente');
      }
    }).catch((error)=>{
      console.log(error)
    });
  };
    
  const clearInput = () => {
    setPresentacion('');
    setEditPresentacion(null);
  };
  const handleCancel = () => {
    clearInput();
    setOpenModalPresentacion(false)
  };
  const handleEditPresentacion = () => {
    if(editPresentacion){
      putUpdatePresentacion(dispatch, {id: Number(editPresentacion[0]), nombre: editPresentacion[1].toString()}).then((res) =>{
        if(res instanceof AxiosError){
          if(res.response?.status === 404){
            const error = res.response?.data
            if(error.error){
              messageErrorProduct(error.error)
            }
          }        
        }else if(res === 200){
          setPresentacion('')
          setEditPresentacion(null);
          messageSuccessProduct('Presentacion actualizada exitosamente');
        }
      }).catch((error)=>{
        console.log(error)
      });

    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEditPresentacion(null);
    setPresentacion(e.target.value)  ;
  }
  const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setPresentacion('');
    setEditPresentacion((prev) => prev? [prev[0], e.target.value] : []);  
  }

  const messageErrorProduct = (message: string)=>{
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })    
  };

  const messageSuccessProduct = (message: string)=>{
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })    
  }
  
  //table
  const handleEditRow = (rowData: [number, string]) => {
    setPresentacion(rowData[1]);
    setEditPresentacion(rowData);    
  };
  const options = {
    SelectableRows: "none",
    print: false, // Evita problemas con la exportación a PDF
    download: false, // Evita problemas con la exportación a CSV y Excel
    viewColumns: false, // Deshabilita la opción de ver columnas
    filter: false, // Deshabilita la opción de filtrar
    search: true, // Deshabilita la barra de búsqueda
    selectableRowsHideCheckboxes: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [],
    rowHover: true,
    responsive: "standard" as Responsive,
    //pagination: false, // Deshabilita la paginación
    //customFooter: () => null, // Elimina el pie de página
    customHeadRender: (columnMeta: any) => (
      <th style={{ textAlign: "center" }}>
        {columnMeta.label}
      </th>
    ),
  };
  const columnsTable = [
    {
      name: "id", // Nombre de la columna en tus datos
      label: "ID", // Nombre que se mostrará en la cabecera de la columna
      key: 'id',
      options: {
        display: undefined, // Oculta la columna en la visualización
      }
    },
    {
      name: 'nombre',
      label: 'Nombre',
      key: 'nombre',
      options: {
        filter: true,
        sort: false,
        /* customHeadRender: (columnMeta : any) => {
          return (
            <th key={columnMeta.name} className="headerCell">
              {columnMeta.label}
            </th>
          );
        }, */
      }
    },
    {
      name: "editar",
      label: "Editar", // Nombre de la columna de acción
      key: 'editar',
      options: {
        filter: false,
        sort: false,
        /* customHeadRender: (columnMeta : any) => {
          return (
            <th key={columnMeta.name} className="headerCell">
              {columnMeta.label}
            </th>
          );
        }, */
        customBodyRender: (_value: any, tableMeta: CustomTableMeta) => {
          // Renderiza un botón o un componente de acción personalizado
          return ( <div className="customCell">
            <button className="btnTableEdtPres" key={'btnEdit' + tableMeta.rowIndex} id="btnEdit" onClick={() => handleEditRow([tableMeta.rowData[0], tableMeta.rowData[1]])} style={{border: 'none', cursor: 'pointer', width: '36px', height: '24px', background:'transparent'}}>
              <EditOutlined />
            </button>
          </div>
            
          );
        },
      }
    }
  ];
  const getMuiTheme = () => createTheme({
    palette:{
      mode: "light",      
    },      
    components: {      
      MuiTableCell:{
        styleOverrides:{
          root: {
            fontSize: `12px`,
            fontWeight: 'bold',
            lineHeight: '16px',
            padding: '8px',
            textAlign: 'center',
          },
          footer:{
            padding: '0px',
          }
        }
      }
    }    
  })  

  return <>
    <Modal className="modalPresentacion"  title="Tipos de presentación de los productos" open={openModalPresentacion} onCancel={handleCancel} okText='Agregar presentación' cancelText='Limpliar campo' footer = {null}
    > 
      <div className="bodyContainer">
        <ContainerBody>
          <div className="colOne">
            {editPresentacion? <div className="editPresentacion">
              <label htmlFor=""><span id="strict">*</span> Editando la Presentación: <span>{presentacion}</span></label>            
              <Input value={editPresentacion[1].toString()} placeholder="Escribe un tipo de presentación" onChange={handleInputEdit}></Input>
            </div> : 
            <div className="createPresentacion">
              <label><span>*</span> Creando Presentacion</label>
              <Input value={presentacion} placeholder="Escribe un tipo de presentacion" onChange={handleInput}></Input>
            </div>
            }          
          </div>
          <div className="colTwo">
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title = {"Lista de Presentaciones"}
                data={allPresentacion.map((present) => ({
                  ...present,
                  key: present.id,
                  editar: `editar${present.id}`
                }))}
                columns={columnsTable}
                options={options}
              ></MUIDataTable>
            </ThemeProvider> 
          </div>
        </ContainerBody>
      </div>
      
      <FooterContainer>
      {editPresentacion? <Button className={`${'clear'+themeSelect}`} id="clear" onClick={clearInput}>Cancelar edición</Button> : <Button className={`${'clear'+themeSelect}`} id="clear" onClick={clearInput}>Limpiar Campo</Button>}

        {editPresentacion? <Button className={`${'ok'+themeSelect}`} id="ok" onClick={handleEditPresentacion}>Editar presentación</Button> : <Button className={`${'ok'+themeSelect}`} id="ok" onClick={handleOk}>Agregar presentación</Button>}
      </FooterContainer>
    </Modal>
    <ToastContainer></ToastContainer>
  </>
}
export default ModalPresentacion;