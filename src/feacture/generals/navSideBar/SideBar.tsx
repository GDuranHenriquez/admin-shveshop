import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTheme } from '../../../utils/getTheme';
import { getLogo } from '../../../utils/getTheme';
import styles from './sideBar.module.css'
import './SideBar.css'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

interface Props{
  _sidebarOpen: boolean,
  setSidebaropen: React.Dispatch<React.SetStateAction<boolean>>;
}

const  theme  = import.meta.env.VITE_TEMA;

const { Sider, Header } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const  getClasseIcon = (item:string)=> {
  switch (item) {
    case 'mukafe':
      return 'mukafeIconBar'
    case 'sh':
      return 'shIconBar'
    default:
      return ''
  }
}

const items: MenuItem[] = [
  getItem('Historico', 'panel', <PieChartOutlined className={getClasseIcon(theme)}/>),
  getItem('Add/Edit Productos', 'addProduct', <DesktopOutlined className={getClasseIcon(theme)}/>),
  getItem('Edit Precios', 'editPrecios', <FileOutlined className={getClasseIcon(theme)}/>),
  /* getItem('Team', 'sub2', <TeamOutlined className={getClasseIcon(theme)}/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]), */
  /* getItem('Administar usuarios', 'sub1', <UserOutlined className={getClasseIcon(theme)}/>, [
    getItem('Tom', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6'),
  ]), */
];

const theme_select = getTheme(theme)
const layoutTheme = {
  backgroundColor: theme_select.backGroundBarSide,
  fontWeight: 'bold',
}

const SideBar: React.FC<Props> = ({setSidebaropen }) => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); 

  const getLocation = () =>{
    switch (location.pathname) {
      case '/addProduct':
        return 'Add/Edit Productos';  
      case '/panel':
        return 'Historico';   
      default:
        return '' ;
    }
  }
  const [openMenu, setOpenMenu] = useState<string>(getLocation());

  const onClick: MenuProps['onClick'] = (e) =>{
    setOpenMenu(e.key);
    navigate('/' + e.key);
  }

  useEffect(()=>{
    if(collapsed){
      setSidebaropen(false)
    }else{
      setSidebaropen(true)
    }
  }, [collapsed])


  useEffect(()=>{
    setOpenMenu(getLocation());
  },[location])

  
  return (
    <Layout className='layout' >
      <Sider className={`${theme} ${collapsed? '' : 'unCollapsed'} noResponse`} style={{...layoutTheme,}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={`${styles.logo} ${collapsed? styles.collapsed :''} ${theme+'Logo'}`}>
          <img src={getLogo(theme)} alt="Logo Mukafe" />
        </div>
        <div className="demo-logo-vertical" />
        <Menu className={theme+'Menu'} defaultSelectedKeys={['panel']} mode="inline" items={items} onClick={onClick}/>
      </Sider>
      <Header className={`responseBar ${'responseHeaderVar' + theme}`} style={{...layoutTheme}}>
        <div className={`${styles.logo} ${theme+'Logo'}`}>
          <img src={getLogo(theme)} alt="Logo Mukafe" />
        </div>
        <div className={`${styles.titleSidebar} ${theme+'TitleSidebar'}`}>
          <span>{openMenu}</span>
        </div>
        <div className="demo-logo" />
        <Menu className={theme+'Menu'} defaultSelectedKeys={['panel']} mode="horizontal" items={items} onClick={onClick}/>
      </Header>
    </Layout>
  );
};

export default SideBar;