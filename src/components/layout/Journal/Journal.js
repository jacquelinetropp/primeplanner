import React from 'react';
import styled from 'styled-components';
import JournalSidebar from './JournalSidebar/JournalSidebar';

const JournalWrapper = styled.div`
    grid-column: 1/-1;
    background-color: var(--color-white);
    border-radius: 5px;
    box-shadow: 0 0 2rem rgba(0,0,0, 0.3);

    display: grid;
    grid-template-columns: 400px 1fr;
`;


const Journal = () => {
    return (
        <JournalWrapper>
            <JournalSidebar />
        </JournalWrapper>
    )
}

export default Journal
