import React from 'react';
import calendar from './Calendar.png';
import styled from 'styled-components';

const BrandingDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 2/-1;
`;

const Image = styled.img`
    height: 35px;
`

const Branding = () => {
  return (
    <BrandingDiv>
        <Image src={calendar} alt="logo" />
        <h1>Prime Planner</h1>
    </BrandingDiv>
  )
}

export default Branding;