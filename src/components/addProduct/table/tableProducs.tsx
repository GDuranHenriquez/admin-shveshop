import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import { DataType } from '../FormAddProduct';
import productDefault  from '../../../assets/productDefault.jpeg';
import {EditOutlined} from '@ant-design/icons';
import { Category, Departamento, Presentacion, Product } from '../../../redux/slices/products/typesProducts';
import './table.css'

const themeSelect = import.meta.env.VITE_TEMA;

interface Props {
  data : DataType[] | undefined;  
  setDataProduct : React.Dispatch<React.SetStateAction<Product>>;
  setProductEdit: React.Dispatch<React.SetStateAction<string | number | null>>;
}

type DataIndex = keyof DataType;

const TableProducts: React.FC<Props> = ( {data , setDataProduct, setProductEdit} ) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<number | string>('');
  const searchInput = useRef<InputRef>(null)
  
 
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>      
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch([] as string[], confirm, dataIndex);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>      
        </Space>
      </div>
      
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => (record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase())) ?? false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
    />
    ) : (
      text
    ),
  });
  
  const handleEditar = (productEdit : Product) => {
    /* setDataProduct(clearDataProducts); */
    setProductEdit(prevProductEdit => prevProductEdit? null: null);
    const idEdit = productEdit.id === undefined? null : productEdit.id;
    const categoria = productEdit.categoria;
    const dataEdit = productEdit;
    const img = productEdit.img;
    if(typeof categoria[0] === "object"){
      dataEdit.categoria = [categoria[0]];
      dataEdit.img = img? img: productDefault;
    }else{
      dataEdit.categoria = categoria
      dataEdit.img = img? img: productDefault;
    }
    
    setDataProduct(productEdit);
    setProductEdit(idEdit);
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',      
      responsive:[],
      className:'columnData'
    },
    {
      title: 'Nombre',
      width: '120px',
      dataIndex: 'nombre',
      key: 'nombre',
      fixed: 'left',
      className:'columnData',
      ...getColumnSearchProps('nombre'),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      responsive:['md', 'sm', 'xs'],      
    },
    {
      title: 'Imagen',
      dataIndex: 'img',
      key: 'img',
      width: 100,
      render: (imagen, record) => (
        <img src={imagen? imagen : productDefault} alt={`Imagen de ${record.nombre}`} style={{ width: '64px', height: '64px' }} />
      ),
      className:'columnData'
    },
    {
      title: 'Codigo',
      width: 200,
      dataIndex: 'codigo',
      key: 'codigo',
      className:'columnData'
    },
    {
      title: 'Descripcion',
      width: 250,
      dataIndex: 'descripcion',
      key: 'descripcion',
      className:'columnData'
    },
    {
      title: 'Lote',
      width: 100,
      dataIndex: 'lote',
      key: 'lote',
      className:'columnData'
    },
    {
      title: 'Pr. Compra por Bulto',
      width: 150,
      dataIndex: 'p_com_bulto',
      key: 'p_com_bulto',
      className:'columnData'
    },
    {
      title: 'Unidades por Bulto',
      width: 150,
      dataIndex: 'unidad_p_bulto',
      key: 'unidad_p_bulto',
      className:'columnData'
    },
    {
      title: 'Pr. Venta por Bulto',
      width: 150,
      dataIndex: 'p_venta_bulto',
      key: 'p_venta_bulto',
      className:'columnData'
    },
    {
      title: 'Pr. Venta por unid.',
      width: 150,
      dataIndex: 'p_venta_unidad',
      key: 'p_venta_unidad',
      className:'columnData'
    },
    {
      title: 'Bultos en stock',
      width: 100,
      dataIndex: 'total_bulto',
      key: 'total_bulto',
      className:'columnData'
    },
    {
      title: 'Presentacion',
      width: 100,
      dataIndex: 'ProductoPresentacion',
      key: 'presentacion',
      render : (presentacion : Presentacion) => presentacion.nombre,
      className:'columnData'
    },
    {
      title: 'Departamento',
      width: 100,
      dataIndex: 'ProductoDepartamento',
      key: 'departamento',
      render : (departamento : Departamento) => departamento.nombre,
      className:'columnData'
    },
    {
      title: 'Categoria',
      width: 100,
      dataIndex: 'categoria',
      key: 'categoria',
      render : (categoria : Category[]) => categoria[0].nombre,
      className:'columnData'
    },
    {
      title: 'Cant. unid.',
      width: 100,
      dataIndex: 'cantidad_unidad',
      key: 'cantidad_unidad',
      className:'columnData'
    },
    {
      title: 'IVA',
      width: 100,
      dataIndex: 'iva',
      key: 'iva',
      className:'columnData'
    },
    {
      title: 'Pr. Venta Bulto con IVA',
      width: 150,
      dataIndex: 'p_v_total_bulto',
      key: 'p_v_total_bulto',
      className:'columnData'
    },
    {
      title: 'Unidades en stock',
      width: 150,
      dataIndex: 'total_unidades',
      key: 'total_unidades',
      sorter: true,
      className:'columnData'
    },
    {
      title: 'Pr. Venta unid. con IVA',
      width: 150,
      dataIndex: 'p_v_total_unidad',
      key: 'p_v_total_unidad',
      className:'columnData'
    },
    {
      title: 'Cant. Min. Mayoreo.',
      width: 150,
      dataIndex: 'cant_min_mayoreo',
      key: 'cant_min_mayoreo',
      className:'columnData'
    },
    {
      title: 'Pr. Venta Mayor.',
      width: 150,
      dataIndex: 'p_venta_mayor',
      key: 'p_venta_mayor',
      className:'columnData'
    },
    {
      title: 'Tipo de Venta.',
      width: 150,
      dataIndex: 'venta_por',
      key: 'venta_por',
      className:'columnData'
    },
    {
      title: 'Observación',
      width: 250,
      dataIndex: 'observacion',
      key: 'observacion',
      className:'columnData'
    },    
    {
      title: 'Editar',
      dataIndex: '',
      key: 'x',
      width: 80,
      fixed: 'right',
      render: (_name, record) => {
        // Renderiza un botón o un componente de acción personalizado
        return (
          <button key={'btnEdit' + record.id} id="btnEdit" onClick={() => handleEditar(record)} style={{border: 'none', cursor: 'pointer', width: '36px', height: '24px', background:'transparent'}}>
            <EditOutlined />
          </button>
        );
      },
      className:'columnData'
    },
  ];
  /* const visibleColumns = columns.filter((column) => column.key !== 'id'); */
  return <Table className={themeSelect} columns={columns} dataSource={data? data:[]} scroll={{ x: 300, y: 300 }} pagination= {{position:['bottomCenter']}} />;
}

export default TableProducts;