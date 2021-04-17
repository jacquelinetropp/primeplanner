import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    border:none;
    color: var(--color-text);
    font-weight: 700;
    font-size: 15px;
    outline: none;
    border-radius: 50%;
    background-color: var(--color-main);
    width: min-content;
    height: 30px;
    width: 30px;
    position: absolute;
    top: 0;
    right: 0;


    &:hover {
      background-color: #DEDEDE;
  }
    
`

const CloseButton = ({children, ...rest}) => {
    return (
        <Wrapper {...rest}>
            {children}
        </Wrapper>
    )
}

export default CloseButton;
