import React from 'react';
import styled from 'styled-components';
import JournalTag from '../../../JournalTags/JournalTag';

const SidebarWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const JournalSidebar = () => {
    return (
        <SidebarWrapper>
            <JournalTag name="Testing" />
        </SidebarWrapper>
    )
}

export default JournalSidebar;
