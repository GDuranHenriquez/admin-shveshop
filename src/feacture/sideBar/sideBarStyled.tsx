import styled from 'styled-components'

export const ContainerSidebar = styled.div`
  position: sticky;
  height: 100%;
  width: max-content;
  .menu{
    height: 100%;
    .ant-menu-item{
      margin-bottom: 30px;
    }
    .ant-menu-submenu{
      margin-bottom: 30px;
    }
  }
  .ant-btn{
    position: absolute;
    right: -24px;
    top: 10px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    
  }
  .menuShow{
    width: 256px;
  }
  
`