import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: var(--color-white);
    padding: 1rem;
`

const JournalMain = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default JournalMain;
