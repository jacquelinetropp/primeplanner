import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-top:  1px solid #f0efef;
    color: #F299E3;
    font-weight: 700;
    font-size: 15px;
    padding: 1rem;
    outline: none;
    width: 100%;
    background-color: transparent;
    margin-top: auto;

    &:disabled {
        background-color: #CCCCCC;
        pointer-events: none;
    }

    &:hover {
      background-color: #DEDEDE;
  }
    
`

const AddButton = ({children, action, disabled}) => {
    return (
        <Wrapper disabled={disabled} onClick={action}>
            {children}
        </Wrapper>
    )
}

export default AddButton;
