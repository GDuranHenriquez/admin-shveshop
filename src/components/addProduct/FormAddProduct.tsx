import React, { useState, useRef, useEffect }  from "react";
import { styled } from "styled-components";
import productDefault  from '../../assets/productDefault.jpeg';
import { useCustomSelector } from "../../hooks/redux";
import appFirebase from "../../utils/credentialsFirebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ModalCategori from "./modalCategori/ModalCategori";
import ModalPresentacion from "./modalPresentacion/ModaPresentacion";
import SubmitButton from "./SubmitButton";
import { Button, Form, Input, Space, Col, Row, Select } from 'antd';
import { Product } from "../../redux/slices/products/typesProducts";
import TableProducts from "./table/tableProducs";
import './FormAddProduct.css'
//import { getBase64Image } from '../../assets/imagedefaultBS64'

export type DataType = Product & {
  key: React.Key;
}

const theme = import.meta.env.VITE_TEMA;


const FormAddProducts: React.FC = () => {
  type TablePaginationPosition = "bottomCenter";
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const imgRef = useRef(null);
  const regexNumberDecimal = /^([0-9]+\.?[0-9]{0,3})$/;
  const storage = getStorage(appFirebase);
  const allCategori = useCustomSelector((state) => state.product.allCategori);
  const allProduct = useCustomSelector((state) => state.product.allProducts);
  const allPresentacion = useCustomSelector((state) => state.product.allPresentacion);
  const dataProducts: Product  = {
    nombre:'', codigo:'', descripcion:'', 
    lote:'', categoria:[] , p_com_bulto: 0, unidad_p_bulto: 0,
    p_venta_bulto: 0, p_venta_unidad: 0, iva: 0, 
    total_bulto: 0, cantidad_unidad: 0, observacion:'', img: productDefault, ProductoPresentacion: null
  };
  const errorsData: {[key: string]: number} = {
    nombre:1, codigo:1, descripcion:1, lote:0, categoria:1 , p_com_bulto: 0,
    unidad_p_bulto: 1, p_venta_bulto: 0, p_venta_unidad: 1, iva:0, 
    total_bulto: 1, cantidad_unidad: 0, observacion:0, presentacion: 1};

  const [options, setOptions] =  useState<{label: string, value: string}[] | undefined>([]);
  const [optionsPresentacion, setOptionsPresentacion] = useState<{label: string, value: string}[] | undefined>([]);
  const [_bottom, _setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [dataTable, setDataTable] = useState<DataType[] | undefined>(undefined);
  const [productEdit, setProductEdit] = useState<number | string | null>(null);  
  const [errors, setErrors] = useState<{[key: string]: number}>(errorsData);
  const [openModalCategori, setOpenModalCategori] = useState(false);
  const [openModalPresentacion, setOpenModalPresentacion] = useState(false);
  const [dataProduct, setDataProduct] = useState(dataProducts);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1100)


  const inpNumericosObli = ['unidad_p_bulto', 'p_venta_bulto', 'p_venta_unidad',  
  'p_com_bulto', 'total_bulto', 'cantidad_unidad', 'iva'];
  const inpStringObli = ['nombre', 'codigo', 'descripcion'];
    
  function setImgDefault(e: React.MouseEvent<HTMLButtonElement>){
    setDataProduct({...dataProduct, [e.currentTarget.name] : productDefault});
  }

  async function fileSelectedHandler(event: React.ChangeEvent<HTMLInputElement>){
    if(event.target.files && event.target.files[0]){
      try {
        const fileImg = event.target.files[0];
        /* getBase64Image(fileImg); */
        const refArchivo = ref(storage, `${theme+'Images'}/${fileImg.name}`);
        await uploadBytes(refArchivo, fileImg);
        //obtener la url de la imagen
        const urlImDesc = await getDownloadURL(refArchivo);
        setDataProduct({...dataProduct, img : urlImDesc});
        event.target.value = '';
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  /* function getBase64Image(img: File){
    const reader = new FileReader();
    reader.onload = function(){
      const base64String = reader.result; // .split(',')  replace("data:", "").replace(/^.+,/, "") 
      setDataProduct({...dataProduct, img : base64String});      
    };
    reader.readAsDataURL(img);
  } */

  const getErrosFromForm = () => {
    const dataForm = form.getFieldsValue();
    inpNumericosObli.forEach((inp) => {
      if(typeof dataForm[inp] === 'number' && dataForm[inp] >= 0){
        setErrors((error) => {
          return {...error, [inp] : 0}
        })
      }else{
        setErrors((error) => {
          return {...error, [inp] : 1}
        })
      }
    });
    inpStringObli.forEach((inp) => {
      if(typeof dataForm[inp] === 'string' && dataForm[inp] != ''){
        setErrors((error) => {
          return {...error, [inp] : 0}
        })
      }else{
        setErrors((error) => {
          return {...error, [inp] : 1}
        })
      }
    });
    if(dataForm.ProductoPresentacion !== ''){
      setErrors((error) => {
        return {...error, presentacion : 0}
      })
    }else{
      setErrors((error) => {
        return {...error, presentacion : 1}
      })
    }
    if(dataForm.categoria !== ''){
      setErrors((error) => {
        return {...error, categoria : 0}
      })
    }else{
      setErrors((error) => {
        return {...error, categoria : 1}
      })
    }
  }
  
  //SelectCategoria
  const onChange = (value: string) => {
    setDataProduct({ ...dataProduct,  categoria: [Number(value)]});
    if(Number(value) >= 0){
      setErrors({...errors, categoria: 0})
    }else{
      setErrors({...errors, categoria: 1})
    }
  }
  //Presentación
  const onChangePresentacion = (value: string) => {
    if(Number(value) >= 0){
      const selecPresentacion = allPresentacion.filter((present) => present.id === Number(value));
      setDataProduct({ ...dataProduct,  ProductoPresentacion: selecPresentacion[0] });
      setErrors({...errors, presentacion: 0})
    }else{
      setDataProduct({ ...dataProduct,  ProductoPresentacion: null });
      setErrors({...errors, presentacion: 1})
    }
  }
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  //Modal
  const showModal = () => {
    setOpenModalCategori(true);
  };
  const showModalPresentacion = () => {
    setOpenModalPresentacion(true);
  };

  //Function Form  
  const handleShangeInputs = (e : { [key: string]: string }) =>{
    const nameInput : string = Object.keys(e)[0];
    const valueInput = e[nameInput];
    const regexNumberDecimal = /^([0-9]+\.?[0-9]{0,3})$/;

    if(inpNumericosObli.includes(nameInput)  ){
      if(valueInput === ''){        
        setDataProduct({...dataProduct, [nameInput]:valueInput});
        setErrors({...errors, [nameInput] : 1});
        form.setFieldValue(nameInput, valueInput);
      }else if(regexNumberDecimal.test(valueInput)){        
        setDataProduct({...dataProduct, [nameInput]: valueInput});
        setErrors({...errors, [nameInput] : 0});
        form.setFieldValue(nameInput, valueInput);
      }else{
        form.setFieldValue(nameInput, valueInput);
      }
         
    }else if(inpStringObli.includes(nameInput)){
      if(valueInput === ''){
        setDataProduct({...dataProduct, [nameInput]:valueInput});
        setErrors({...errors, [nameInput] : 1});
      }else{
        setDataProduct({...dataProduct, [nameInput]:valueInput});
        setErrors({...errors, [nameInput] : 0});
      }
      form.setFieldValue(nameInput, valueInput);      
    }else{
      setDataProduct({...dataProduct, [nameInput]:valueInput});
      form.setFieldValue(nameInput, valueInput);
    }
  }
  const clearDataProduct = () => {
    setDataProduct(dataProducts);
    setProductEdit(null);
  }  
  const updateForm = (data: Product) => {
    setDataProduct(data);
  }
    
  useEffect(() => {
    const optionsCategori: {label: string, value: string}[] = allCategori.map((op) => ({label: op.nombre, value: op.id.toString()}));
    optionsCategori.unshift({label: '', value:''});
    setOptions(optionsCategori);
  }, [allCategori]);

  useEffect(() => {
    const optionPresentacions: {label: string, value: string}[] = allPresentacion.map((op) => ({label: op.nombre, value: op.id.toString()}));
    optionPresentacions.unshift({label: '', value:''});
    setOptionsPresentacion(optionPresentacions);
  }, [allPresentacion]);

  useEffect(() => {    
    inpNumericosObli.forEach((element: string) => {
      const value = dataProduct[element];
      if(typeof value === 'number'){
        if(value >= 0){
          errors[element] = 0
        }
      }      
    });
  }, [dataProduct]);
  
  useEffect(() => {
    if(productEdit === null){
      form.setFieldsValue(null);
      form.setFieldValue('categoria', '');
      form.setFieldValue('ProductoPresentacion', '');
    }else{
      form.setFieldsValue(dataProduct);
      const categoria = dataProduct.categoria[0];
      const presentacion = dataProduct.ProductoPresentacion?.nombre;
      if(presentacion){
        form.setFieldValue('ProductoPresentacion', presentacion);
      }else{
        form.setFieldValue('ProductoPresentacion', '');
      }
      if(typeof categoria === "object"){
        form.setFieldValue('categoria', categoria.nombre.toString());
      }else{
        if(categoria){
          form.setFieldValue('categoria', categoria?.toString());
        }else{
          form.setFieldValue('categoria', '')
        }
      }
    }
    getErrosFromForm();
  }, [productEdit])


  const getForm = (typeForm:boolean) =>{
    if(!typeForm){
      return <Form 
      form={form} 
      name="validateOnly" 
      layout="vertical" 
      autoComplete="off"
      labelCol={{ span: 24}}
      wrapperCol={{ span: 24 }}
      onValuesChange={handleShangeInputs}
      className={`form ${theme} noResponseForProduct`}
      >
      {/*Fila 1 */}
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Este campo es obligatorio' }]} initialValue={dataProduct.nombre}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="codigo" label="Código" rules={[{ required: true, message: 'Este campo es obligatorio'}]} initialValue={dataProduct.codigo}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Descripcion" name="descripcion" rules={[{ required: true, message: 'Este campo es obligatorio' }]} initialValue={dataProduct.descripcion}>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
      {/*Fila 2*/}
      <Row gutter={24}>
        <Col span={12}>
          <Row gutter={24}>
            <Col span={20}>                
              <Form.Item name="ProductoPresentacion" label="Presentacion" rules={[{ required: true }]} tooltip="La presentación se refiere al tipo de medida en que se distribuira este producto, (kg, gr, slice, unidad, bulto,lr, oz, ml porción...)">            
                    <Select
                      showSearch
                      placeholder="Selecciona una presentación"
                      optionFilterProp="children"
                      onChange={onChangePresentacion}
                      filterOption={filterOption}
                      options={optionsPresentacion}                      
                    />                
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button className="buttonCategory" onClick={showModalPresentacion}>+</Button>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={24}>
            <Col span={20}>                
              <Form.Item name="categoria" label="Categoria" rules={[{ required: true }]} tooltip="La categoria es requerida">            
                    <Select
                      showSearch
                      placeholder="Selecciona una categoría"
                      optionFilterProp="children"
                      onChange={onChange}
                      filterOption={filterOption}
                      options={options}                      
                    />                
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button className="buttonCategory" onClick={showModal}>+</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/*Fila 3*/}
      <Row gutter={24}>
        <Col span={9}>
          <Form.Item name = "lote" label="Numero de lote" initialValue={dataProduct.lote} >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name='iva' label="IVA" rules={[
            { required: true, message: 'Este campo es obligatorio' },
            {
              pattern: regexNumberDecimal,
              message: 'Ingresa un numero valido',
            }
            ]} initialValue={dataProduct.iva} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item name = "p_com_bulto" label="Precio de compra por bulto" rules={[
            { required: true, message: 'Este campo es obligatorio' },
            {
              pattern: regexNumberDecimal,
              message: 'Ingresa un numero valido',
            }
          ]} initialValue={dataProduct.p_com_bulto} >
            <Input/>
          </Form.Item>
        </Col>

      </Row>

      {/*Fila 4*/}
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name='p_venta_bulto' label="Precio Venta por bulto" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.p_venta_bulto} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name='p_venta_unidad' label="Precio Venta por unidad" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.p_venta_unidad} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name='unidad_p_bulto' label="Unidades por bulto" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.unidad_p_bulto} >
              <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*Fila 5*/}
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name='total_bulto' label="Total bultos" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.total_bulto} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name='cantidad_unidad' label="Total unidades" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.cantidad_unidad} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name='observacion' label="Observacion"  initialValue={dataProduct.observacion}>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>      

      <Form.Item>
        <Space>
          <SubmitButton setDataProduct={setDataProduct} setProductEdit={setProductEdit} imgDefault={productDefault} form={form} data={dataProduct} errors={errors} dataProducts={dataProducts} updateForm={updateForm} textButton={productEdit? 'Editar Producto': 'Crear producto'} action={productEdit? 'editProduct': 'createProduct'} />
          <Button htmlType="reset" onClick={clearDataProduct}>{productEdit? 'Cancelar': 'Limpiar Campos'}</Button>
        </Space>
      </Form.Item>
    </Form> 
    }else{
      return <Form 
      form={form} 
      name="validateOnly" 
      layout="vertical" 
      autoComplete="off"
      labelCol={{ span: 24}}
      wrapperCol={{ span: 24 }}
      onValuesChange={handleShangeInputs}
      className={`form ${theme} responseForProduct`}
      >
      {/*Fila 1 */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Este campo es obligatorio' }]} initialValue={dataProduct.nombre}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="codigo" label="Código" rules={[{ required: true, message: 'Este campo es obligatorio'}]} initialValue={dataProduct.codigo}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {/*Fila 2 */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Descripcion" name="descripcion" rules={[{ required: true, message: 'Este campo es obligatorio' }]} initialValue={dataProduct.descripcion}>
            <TextArea rows={2} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='observacion' label="Observacion"  initialValue={dataProduct.observacion}>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>

      {/*Fila 3*/}
      <Row gutter={24}>
        <Col span={12}>
          <Row gutter={24}>
            <Col span={20}>                
              <Form.Item name="ProductoPresentacion" label="Presentacion" rules={[{ required: true }]} tooltip="La presentación se refiere al tipo de medida en que se distribuira este producto, (kg, gr, slice, unidad, bulto,lr, oz, ml porción...)">            
                    <Select
                      showSearch
                      placeholder="Selecciona una presentación"
                      optionFilterProp="children"
                      onChange={onChangePresentacion}
                      filterOption={filterOption}
                      options={optionsPresentacion}                      
                    />                
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button className="buttonCategory" onClick={showModalPresentacion}>+</Button>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={24}>
            <Col span={20}>                
              <Form.Item name="categoria" label="Categoria" rules={[{ required: true }]} tooltip="La categoria es requerida">            
                    <Select
                      showSearch
                      placeholder="Selecciona una categoría"
                      optionFilterProp="children"
                      onChange={onChange}
                      filterOption={filterOption}
                      options={options}                      
                    />                
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button className="buttonCategory" onClick={showModal}>+</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/*Fila 4*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name = "lote" label="Numero de lote" initialValue={dataProduct.lote} >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='iva' label="IVA" rules={[
            { required: true, message: 'Este campo es obligatorio' },
            {
              pattern: regexNumberDecimal,
              message: 'Ingresa un numero valido',
            }
            ]} initialValue={dataProduct.iva} >
              <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*Fila 5*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name = "p_com_bulto" label="Precio de compra por bulto" rules={[
            { required: true, message: 'Este campo es obligatorio' },
            {
              pattern: regexNumberDecimal,
              message: 'Ingresa un numero valido',
            }
          ]} initialValue={dataProduct.p_com_bulto} >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='p_venta_bulto' label="Precio Venta por bulto" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.p_venta_bulto} >
              <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*Fila 6*/}
      <Row gutter={24}>

        <Col span={12}>
          <Form.Item name='p_venta_unidad' label="Precio Venta por unidad" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.p_venta_unidad} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='unidad_p_bulto' label="Unidades por bulto" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.unidad_p_bulto} >
              <Input />
          </Form.Item>
        </Col>
      </Row>

      {/*Fila 5*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name='total_bulto' label="Total bultos" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.total_bulto} >
              <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='cantidad_unidad' label="Total unidades" rules={[
              { required: true, message: 'Este campo es obligatorio' },
              {
                pattern: regexNumberDecimal,
                message: 'Ingresa un numero valido',
              }
            ]} initialValue={dataProduct.cantidad_unidad} >
              <Input />
          </Form.Item>
        </Col>
      </Row>      

      <Form.Item>
        <Space>
          <SubmitButton setDataProduct={setDataProduct} setProductEdit={setProductEdit} imgDefault={productDefault} form={form} data={dataProduct} errors={errors} dataProducts={dataProducts} updateForm={updateForm} textButton={productEdit? 'Editar Producto': 'Crear producto'} action={productEdit? 'editProduct': 'createProduct'} />
          <Button htmlType="reset" onClick={clearDataProduct}>{productEdit? 'Cancelar': 'Limpiar Campos'}</Button>
        </Space>
      </Form.Item>
    </Form>
    }
         
  }
  
  //table
  

  const getDataTable = () =>{
    const dataTable = allProduct.map((element, index) => ({...element, key: index}))
    return dataTable;
  }

  useEffect(() => {
    const data = getDataTable();
    setDataTable(data);
  }, [allProduct])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>
    <Container>
      <div className='formProduct'>
        <div className="cargarimagen">
          {dataProduct.img === productDefault?  '':<button onClick={setImgDefault} className="btnImgDefault" name='img'>X</button>}
          {/* <button onClick={setImgDefault}>X</button> */}
          <div className="containerimg">
            <img ref={imgRef} src={dataProduct.img === productDefault?  `${productDefault}`:`${dataProduct.img}`} alt="imgProd" id = 'imgRegisterProd'/>
            <label htmlFor="imgFile">{dataProduct.img === productDefault?  `Agregar imagen`:`Cambiar imagen`}</label>
            <input type="file" id="imgFile" name="img"  accept="image/*" onChange={fileSelectedHandler}/>
          </div>
        </div>
        {getForm(isMobile)}  
      </div>
      <div className="containerTable">
        <TableProducts data={dataTable} setDataProduct={setDataProduct} setProductEdit={setProductEdit}/>      
      </div>
      
      <ModalCategori openModalCategori= {openModalCategori} setOpenModalCategori={setOpenModalCategori}/>
      <ModalPresentacion openModalPresentacion={openModalPresentacion} setOpenModalPresentacion={setOpenModalPresentacion}/>    
  </Container>
  </>
  
  
};

//#Styles Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100%;
  
  .formProduct{
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    margin: 20px;
    justify-content: center;
    align-items: center;
    width: calc(100% - 120px);
    .cargarimagen{
      display: flex;
      flex-direction: column;
      position: relative;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 5px;
      width: 250px;
      height: 280px;
      gap:10px;
      align-content: center;
      justify-content: center;
      button{
        width: 20px;
        height: 20px;
        padding: 2px;
        border-radius: 10px;
        border: 1px solid;
        position: absolute;
        top: 1px; 
        right: 1px;
      }
      .btnImgDefault{
        &:hover{
          cursor: pointer;
        }
      }
      .containerimg{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-content: center;
        justify-content: center;        
        input{
          display: none;
        }  
        img{
          border-radius: 4px;
          width: 180px;
          height: 180px;
          max-width: 180px;
          max-height: 180px;
        }
        label{
          font-size: 18px;
          font-weight: bold;
          &:hover{
            cursor: pointer;
          }

        }
      }
      
    }
    .form{
      color: black;
      padding: 15px;
      margin: 0;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      justify-content: center;
      align-items: center;
      .ant-form-item-control-input-content{
        display: flex;
        .ant-space{
          margin: 0 auto;
        }
      }
      .ant-form-item-label{
        label{
          font-size: 12px;
          font-weight: 500;
        }
      }
      .ant-col{
        margin: 0 !important;
        padding-left: 8px !important;
        padding-right: 0 !important;
      }
      .ant-col-4{
        display: flex;
        flex-wrap: nowrap;
        justify-content: start !important;
        align-items: center !important;
      }
      
    }
  }
  .containerTable{
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
    width: 98%;
  }
  @media (max-width: 950px){
    width: 100%;
    margin: 0px;
    .formProduct{
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px;
      justify-content: center;
      align-items: center;
      width: 95%;
      .cargarimagen{
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 5px;
        width: 122px;
        height: 122px;
        gap:5px;
        align-content: center;
        justify-content: center;
        button{
          width: 15px;
          height: 15px;
          padding: 0px;
          border-radius: 10px;
          border: 1px solid;
          position: absolute;
          top: 1px; 
          right: 1px;
          font-size: 10px;
        }
        .btnImgDefault{
          &:hover{
            cursor: pointer;
          }
        }
        .containerimg{
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          align-content: center;
          justify-content: center;        
          input{
            display: none;
          }  
          img{
            border-radius: 4px;
            width: 80%;
            height: 80%;
            max-width: 80%;
            max-height: 80%;
          }
          label{
            font-size: 12px;
            font-weight: bold;
            &:hover{
              cursor: pointer;
            }

          }
        }
        
      }
      .form{
        color: black;
        padding: 10px;
        margin: 0;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        justify-content: center;
        align-items: center;
        .ant-form-item-control-input-content{
          display: flex;
          .ant-space{
            margin: 0 auto;
          }
        }
        .ant-form-item-label{
          label{
            font-size: 10px;
            font-weight: 500;
          }
        }
        .ant-col{
          margin: 0 !important;
          padding-left: 4px !important;
          padding-right: 0 !important;
        }
        .ant-col-4{
          display: flex;
          flex-wrap: nowrap;
          justify-content: start !important;
          align-items: center !important;
        }
        
      }
    }
  }
  @media screen and (max-width: 950px){
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    .formProduct{
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px;
      justify-content: center;
      align-items: center;
      width: 95%;
      .cargarimagen{
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 5px;
        width: 122px;
        height: 122px;
        gap:5px;
        align-content: center;
        justify-content: center;
        button{
          width: 15px;
          height: 15px;
          padding: 0px;
          border-radius: 10px;
          border: 1px solid;
          position: absolute;
          top: 1px; 
          right: 1px;
          font-size: 10px;
        }
        .btnImgDefault{
          &:hover{
            cursor: pointer;
          }
        }
        .containerimg{
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          align-content: center;
          justify-content: center;        
          input{
            display: none;
          }  
          img{
            border-radius: 4px;
            width: 80%;
            height: 80%;
            max-width: 80%;
            max-height: 80%;
          }
          label{
            font-size: 12px;
            font-weight: bold;
            &:hover{
              cursor: pointer;
            }

          }
        }
        
      }
      .form{
        color: black;
        padding: 10px;
        margin: 0;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        justify-content: center;
        align-items: center;
        .ant-form-item-control-input-content{
          display: flex;
          .ant-space{
            margin: 0 auto;
          }
        }
        .ant-form-item-label{
          label{
            font-size: 10px;
            font-weight: 500;
          }
        }
        .ant-col{
          margin: 0 !important;
          padding-left: 4px !important;
          padding-right: 0 !important;
        }
        .ant-col-4{
          display: flex;
          flex-wrap: nowrap;
          justify-content: start !important;
          align-items: center !important;
        }
        
      }
    }
  }
  .containerTable{
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
    width: 95%;
  }
`

export default FormAddProducts;
//#endStyles

