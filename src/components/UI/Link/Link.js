import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LinkWrapper = styled(Link)`
padding: 1.2rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  color: var(--color-text);
  font-weight: 700;
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-right: 2rem;
  background-color: var(--color-main);
`;

const StyledLink = ({children, to}) => {
    return (
        <LinkWrapper to={to}>
            {children}
        </LinkWrapper>
    )
}

export default StyledLink;
