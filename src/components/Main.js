import styled from 'styled-components';
// import React from 'react';
import Timer from './Timer'

function Main() {

  return (
    <Container>
      <Timer />
    </Container>
  );
}

const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 300px;
    grid-auto-flow:column;
    align-items: center;
    justify-items:center;
    grid-template-areas: ". timer timer .";
`

export default Main
