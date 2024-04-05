import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTheme } from '../../../utils/getTheme';
import { getLogo } from '../../../utils/getTheme';
import styles from './sideBar.module.css'
import './SideBar.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  CalculatorOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  TagOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { singOut } from '../../../redux/slices/user/actionUser';
import Loading from '../../../Loading/Loading';
import { useAuth } from '../../../auth/authPro'

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
    case 'davirton':
      return 'davirtonIconBar'
    case 'feredie':
      return 'feredieIconBar'
    default:
      return ''
  }
}

const items: MenuItem[] = [
  getItem('Historico', 'panel', <PieChartOutlined className={getClasseIcon(theme)}/>),
  getItem('Add/Edit Productos', 'addProduct', <DesktopOutlined className={getClasseIcon(theme)}/>),
  getItem('Agregar / Restar Stock', 'addSubStock', <CalculatorOutlined className={getClasseIcon(theme)}/>),
  //getItem('Cerrar sesion', 'logout', <LogoutOutlined className = {`${getClasseIcon(theme)} 'containerLogout'`} />)
  /* getItem('Edit Precios', 'editPrecios', <FileOutlined className={getClasseIcon(theme)}/>), */
  /* getItem('Team', 'sub2', <TeamOutlined className={getClasseIcon(theme)}/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]), */
  getItem('Obtener Info.', 'sub1', <UnorderedListOutlined className={getClasseIcon(theme)}/>, [
    getItem('Obtener etiquetas de precios', 'get-tag-price', <TagOutlined className={getClasseIcon(theme)}/>)
  ]),
];

const theme_select = getTheme(theme)
const layoutTheme = {
  backgroundColor: theme_select.backGroundBarSide,
  fontWeight: 'bold',
}

const SideBar: React.FC<Props> = ({setSidebaropen }) => {

  const auth = useAuth()
  const location = useLocation(); 
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false) 

  const getLocation = () =>{
    switch (location.pathname) {
      case '/addProduct':
        return 'Add/Edit Productos';  
      case '/panel':
        return 'Historico';
      case '/addSubStock':
        return 'Atualizar stock';
      case '/get-tag-price':
        return 'Obtener Info.'
      default:
        return '' ;
    }
  }
  const getMenuDefaultSelect = () =>{
    switch (location.pathname) {
      case '/addProduct':
        return 'addProduct';  
      case '/panel':
        return 'panel';
      case '/addSubStock':
        return 'addSubStock'; 
      case '/get-tag-price':
        return 'get-tag-price';   
      default:
        return '' ;
    }
  }
  const [openMenu, setOpenMenu] = useState<string>(getLocation());

  const onClick: MenuProps['onClick'] = (e) =>{
    if(e.key === 'logout'){

    }else{
      setOpenMenu(e.key);
      navigate('/' + e.key);
    }
  }

  const handleSingOut = async () => {
    try {
      setLoading(true)
      const refressToken = auth.getRefreshToken();
      if(refressToken){
        const resp = await singOut(refressToken)
        if(resp){
          if('message' in resp){
            if(resp.message === 'Token deleted'){
              setLoading(false)
              auth.signOut()
            }else{
              console.log(resp.message )
            }
          }
        }
      }else{
        setLoading(false)
        auth.signOut()
      }     

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
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
      <Sider className={`${theme} ${collapsed? '' : 'unCollapsed'} noResponse`} 
        style={{...layoutTheme,}} collapsible collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        >
        <div className={`${styles.logo} ${collapsed? styles.collapsed :''} ${theme+'Logo'}`}>
          <img src={getLogo(theme)} alt="Logo Mukafe" />
        </div>
        <div className="demo-logo-vertical" />
          <Menu className={theme+'Menu'} defaultSelectedKeys={[getMenuDefaultSelect()]} 
            mode="inline" items={items} onClick={onClick}
          />

        <div className="logoutMenuContainer">
          <button className='btnLogout' onClick={handleSingOut}>
            <LogoutOutlined className = {getClasseIcon(theme)} />
            <span>Salir</span>
          </button>          
        </div>
        
      </Sider>
      <Header className={`responseBar ${'responseHeaderVar' + theme}`} style={{...layoutTheme}}>
        <div className={`${styles.logo} ${theme+'Logo'}`}>
          <img src={getLogo(theme)} alt="Logo" />
        </div>
        <div className={`${styles.titleSidebar} ${theme+'TitleSidebar'}`}>
          <span>{openMenu}</span>
        </div>
        <div className="demo-logo" />
        <div className='containerMenuBar'>
          <Menu className={`${theme+'Menu'} menuBar`} defaultSelectedKeys={[getMenuDefaultSelect()]} 
            mode="horizontal" items={items} onClick={onClick}
          />
        </div>
        
      </Header>
      {loading ? <Loading/> : null}
    </Layout>
  );
};

export default SideBar;