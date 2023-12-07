import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form } from 'antd';
import { Category, Product, RegisterProduct, EditProduct } from '../../redux/slices/products/typesProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCustomDispatch } from '../../hooks/redux';
import { postProduct, putUpdateProduct } from '../../redux/slices/products/actionsProducts';
import { AxiosError } from "axios";

type Props = { 
  form: FormInstance, 
  data: Product, 
  errors:{[key: string]: number}, 
  dataProducts: Product, 
  updateForm: (data : Product) => void;
  imgDefault: string;
  textButton : string
  action : string
  setDataProduct : React.Dispatch<React.SetStateAction<Product>>;
  setProductEdit: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const SubmitButton : React.FC<Props> = ({ form, data, errors, dataProducts, updateForm, imgDefault, textButton, action, setDataProduct, setProductEdit }) => {
  const [submittable, setSubmittable] = React.useState(false);
  const dispatch = useCustomDispatch();

  const clearDataProducts: Product  = {
    nombre:'', codigo:'', descripcion:'', 
    lote:'', categoria:[] , p_com_bulto: 0, unidad_p_bulto: 0,
    p_venta_bulto: 0, p_venta_unidad: 0, iva: 0, 
    total_bulto: 0, cantidad_unidad: 0, observacion:'', img: imgDefault, ProductoPresentacion: null
  };

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  const getCategori = (dataCategoria: [number] | [] | Category[]) : number[] | [] => {
    if (dataCategoria.length > 0 && dataCategoria[0]) {
      if (typeof dataCategoria[0] === 'object') {
        return [dataCategoria[0].id];
      } else if(dataCategoria[0] >= 0){
        return [dataCategoria[0]];
      }else {
        return []
      }
    } else {
      return [];
    }
  }
  
  const submit = () =>{
    let isError = false;
    for(const key in errors) {
      if (errors[key] === 1) {     
        isError = true         
      }      
    }
    if(isError){
      return messageErrorProduct('Faltan datos obligatorios');
    }
    if(action === 'createProduct'){          
      const newProduct : RegisterProduct = {
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        lote: data.lote === ''? null : data.lote,
        p_com_bulto: Number(data.p_com_bulto),
        unidad_p_bulto: Number(data.unidad_p_bulto),
        p_venta_bulto: Number(data.p_venta_bulto),
        p_venta_unidad: Number(data.p_venta_unidad),
        iva: Number(data.iva),
        total_bulto: Number(data.total_bulto),
        cantidad_unidad: Number(data.cantidad_unidad),
        observacion: data.observacion === "" ? null : data.observacion,
        categorias: getCategori(data.categoria),
        img: data.img === imgDefault ? null : data.img,
      }
      if(data.ProductoPresentacion){
        postProduct(dispatch, newProduct, data.ProductoPresentacion).then((res) =>{
          if(res instanceof AxiosError){
            if(res.response?.status === 404){
              const error = res.response?.data          
              messageErrorProduct(error.error)          
            }        
            }else if(res === 200){
              updateForm(dataProducts);
              form.setFieldsValue(dataProducts);
              messageSuccessProduct('Producto agregado exitosamente');
            }
          }
          ).catch((error)=>{
            console.log(error)
        });  
      }else{
        messageErrorProduct('La presentacion del producto es obligatoria');
      }       
    }else if(action === 'editProduct'){
      if(!data.ProductoPresentacion){
        messageErrorProduct('Debe cargar la presentación del producto');
        return
      }   
      const productEdit: EditProduct = {
        id: data.id,
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        lote: data.lote === ''? null : data.lote,
        p_com_bulto: Number(data.p_com_bulto),
        unidad_p_bulto: Number(data.unidad_p_bulto),
        p_venta_bulto: Number(data.p_venta_bulto),
        p_venta_unidad: Number(data.p_venta_unidad),
        iva: Number(data.iva),
        total_bulto: Number(data.total_bulto),
        cantidad_unidad: Number(data.cantidad_unidad),
        observacion: data.observacion === "" ? null : data.observacion,
        categorias: getCategori(data.categoria),
        img: data.img === imgDefault ? null : data.img,
        presentacion: data.ProductoPresentacion?.id
      }

      putUpdateProduct(dispatch, productEdit).then((res) =>{
        if(res instanceof AxiosError){
          if(res.response?.status === 404){
            const error = res.response?.data          
            messageErrorProduct(error.error)          
          }        
          }else if(res === 200){
            updateForm(dataProducts);
            form.setFieldsValue(dataProducts);
            messageSuccessProduct('Producto editado exitosamente');
            setDataProduct(clearDataProducts);
            setProductEdit(null);
          }
        }
        ).catch((error)=>{
          console.log(error)
      });  
      
      
    }
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

  return (<>
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={submit}>
      {textButton}
    </Button>
    <ToastContainer></ToastContainer>
  </>    
  );
}

export default SubmitButton;