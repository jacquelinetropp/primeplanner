import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Category = styled(Link)`
    min-height: 30px;
    height: max-content;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding-left: .8rem;
    font-weight: 600;    
    color: var(--color-mainDark);
`;

const JournalCategory = ({children, link}) => {
    return (
        <Category to={link}>
            {children}
        </Category>
    )
}

export default JournalCategory
