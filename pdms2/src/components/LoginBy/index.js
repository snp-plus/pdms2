import styled from 'styled-components';

const LoginBy = styled.div`
  background: ${props => 
    props.type === 'facebook' ? 'blue' :
    props.type === 'google' ? 'red' : 'black'
  };
  color: white;
  border-radius: 50px;
  margin: 0 17px;
  padding: 15px;
  width: 50px;
  height: 50px;
  font-size: 0.8m;
`;

export default LoginBy;