import { Input, Modal, Button } from "antd";
import React, { useState } from 'react';
import {ContainerBody, FooterContainer} from "./styleModalBody";
import { postCategori, putUpdateCategory } from "../../../redux/slices/products/actionsProducts";
import { useCustomDispatch, useCustomSelector } from "../../../hooks/redux";
import { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable, { MUIDataTableColumn, MUIDataTableState } from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {EditOutlined} from '@ant-design/icons';


type Props = {
  openModalCategori : boolean;
  setOpenModalCategori : React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomTableMeta {
  rowIndex: number;
  columnData: MUIDataTableColumn;
  rowData: any[]; // Ajusta el tipo de datos según tus necesidades
  tableData: any[]; // Ajusta el tipo de datos según tus necesidades
  tableState: MUIDataTableState;
}

const ModalCategori : React.FC<Props> = ({openModalCategori, setOpenModalCategori}) =>{
  const dispatch = useCustomDispatch();
  const allCategori = useCustomSelector((state) => state.product.allCategori);

  const [categori, setCategori] = useState<string>('')
  const [editCategory, setEditCategory] = useState<Array<number | boolean | string> | null>(null);

  const handleOk = () => {
    postCategori(dispatch, {nombre: categori}).then((res) =>{
      if(res instanceof AxiosError){
        if(res.response?.status === 404){
          const error = res.response?.data
          if(error.error === 'Validation error'){
            messageErrorProduct('Nombre de categoría ya existe')
          }
        }        
      }else if(res === 200){
        setCategori('')
        setEditCategory(null);
        messageSuccessProduct('Categoría agregada exitosamente');
      }
    }).catch((error)=>{
      console.log(error)
    });
  };
    
  const clearInput = () => {
    setCategori('');
    setEditCategory(null);
  };
  const handleCancel = () => {
    clearInput();
    setOpenModalCategori(false)
  };
  const handleEditCategory = () => {
    if(editCategory){
      putUpdateCategory(dispatch, {id: Number(editCategory[0]), nombre: editCategory[1].toString()}).then((res) =>{
        if(res instanceof AxiosError){
          if(res.response?.status === 404){
            const error = res.response?.data
            if(error.error){
              messageErrorProduct(error.error)
            }
          }        
        }else if(res === 200){
          setCategori('')
          setEditCategory(null);
          messageSuccessProduct('Categoría actualizada exitosamente');
        }
      }).catch((error)=>{
        console.log(error)
      });

    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEditCategory(null);
    setCategori(e.target.value)  ;
  }
  const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setCategori('');
    setEditCategory((prev) => prev? [prev[0], e.target.value] : []);  
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
  

  const stylesModal = {    
    body: { 
      display: 'flex',       
      justifyItems: 'center',
      alignItems: 'center',
      minWidth: 'calc(100% * 1)',
      width: 'calc(100% * 1)'
    },
    footer:{
      display: 'flex', 
      justifyContent: 'center'
    }
  }

  //table
  const handleEditRow = (rowData: [number, string]) => {
    setCategori(rowData[1]);
    setEditCategory(rowData);    
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
        customHeadRender: (columnMeta : any) => {
          return (
            <th key={columnMeta.name} className="headerCell">
              {columnMeta.label}
            </th>
          );
        },
      }
    },
    {
      name: "editar",
      label: "Editar", // Nombre de la columna de acción
      key: 'editar',
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta : any) => {
          return (
            <th key={columnMeta.name} className="headerCell">
              {columnMeta.label}
            </th>
          );
        },
        customBodyRender: (_value: any, tableMeta: CustomTableMeta) => {
          // Renderiza un botón o un componente de acción personalizado
          return (
            <button key={'btnEdit' + tableMeta.rowIndex} id="btnEdit" onClick={() => handleEditRow([tableMeta.rowData[0], tableMeta.rowData[1]])} style={{border: 'none', cursor: 'pointer', width: '36px', height: '24px', background:'transparent'}}>
              <EditOutlined />
            </button>
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
    <Modal width={'50%'} styles={ {body: {...stylesModal.body, flexDirection: 'column'}, footer: {...stylesModal.footer}} } title="Categorías" open={openModalCategori} onCancel={handleCancel} okText='Agregar categoria' cancelText='Limpliar campo' footer = {null}
    > 
      <ContainerBody>
        <div className="colOne">
          {editCategory? <div className="editCategory">
            <label htmlFor=""><span id="strict">*</span> Editando la categoría: <span>{categori}</span></label>            
            <Input value={editCategory[1].toString()} placeholder="Escribe una categoria" onChange={handleInputEdit}></Input>
          </div> : 
          <div className="createCategory">
            <label><span>*</span> Creando Categoría</label>
            <Input value={categori} placeholder="Escribe una categoria" onChange={handleInput}></Input>
          </div>
          }
          
        </div>
        <div className="colTwo">
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title = {"Lista de Categorias"}
              data={allCategori.map((categori) => ({
                ...categori,
                key: categori.id,
                editar: `editar${categori.id}`
              }))}
              columns={columnsTable}
              options={options}
            ></MUIDataTable>
          </ThemeProvider> 
        </div>
      </ContainerBody>
      <FooterContainer>
      {editCategory? <Button id="clear" onClick={clearInput}>Cancelar edición</Button> : <Button id="clear" onClick={clearInput}>Limpiar Campo</Button>}

        {editCategory? <Button id="ok" onClick={handleEditCategory}>Editar categoría</Button> : <Button id="ok" onClick={handleOk}>Agregar categoría</Button>}
      </FooterContainer>
    </Modal>
    <ToastContainer></ToastContainer>
  </>
}
export default ModalCategori;