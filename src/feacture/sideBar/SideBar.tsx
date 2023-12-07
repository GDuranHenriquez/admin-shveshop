import React, { useState } from 'react'
import { ContainerSidebar } from './sideBarStyled'
import { useNavigate } from 'react-router-dom'
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface Props{
  sidebarOpen: boolean,
  setSidebaropen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<Props> = ({ sidebarOpen, setSidebaropen } ) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setSidebaropen(!sidebarOpen);
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (key: React.Key) => {
    switch (key) {
      case '1':
        navigate('/panel')
        break;
      case '2':
        navigate('/addProduct')
        break;
      default:
        break;
    }
  };
  
 
  const items: MenuItem[] = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Panel',
      onClick: () => handleMenuItemClick('1'),
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Agregar Productos Nuevos',
      onClick: () => handleMenuItemClick('2'),
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: 'Editar Productos',
      onClick: () => handleMenuItemClick('3'),
    },
    {
      key: '4',
      icon: <ContainerOutlined />,
      label: 'Configuración',
      onClick: () => handleMenuItemClick('4'),
    },
    {
      key: '5',
      icon: <ContainerOutlined />,
      label: 'Salir',
      onClick: () => handleMenuItemClick('5'),
    },
  ];
  return (
    <ContainerSidebar>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }} className='hideShow'>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        title='Gestion Almacen'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className={`menu ${collapsed? ' menuHide':' menuShow'}`}
      />
    </ContainerSidebar>
  );
}

export default SideBar;