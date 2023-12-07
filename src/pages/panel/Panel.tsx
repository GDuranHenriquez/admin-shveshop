import styled from 'styled-components';

const PanelPage: React.FC = () =>{
  return <Container>
    <h1>panel</h1>
  </Container>
};

const Container = styled.div`
  height: 100vh;
  margin-left: 25px;
  padding-right: 20px;
`

export default PanelPage;