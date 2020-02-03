import styled from 'styled-components';
import React from 'react';

const Division1 = styled.div`
  border-top: 1px solid #DFDFDF;
  position: absolute;
  top: 170px;
  width: 34%;
`;

const Division2 = styled.div`
  border-top: 1px solid #DFDFDF;
  position: absolute;
  top: 170px;
  right: 20px;
  width: 34%;
`;

const Span = styled.div`

  margin-right: auto;
  margin-left: auto;
`;

const OrContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Or() {
  return (
    <OrContainer>
      <Division1 /> 
      <Span>Or</Span>
      <Division2 />
    </OrContainer>
  )
}

export default Or;