import React from 'react';
import styled from 'styled-components';

const PostWrapper = styled.div`
    background-color: #87C8D6;
    border-radius: 5px;
    grid-column: 1/3;
    box-shadow: 0 1rem 2rem rgba(0,0,0, 0.3);
`;

const PostContent = styled.div`
    background-color: var(--color-main);
    margin-top: 3rem;
    height: calc(100% - 3rem);
`

const TaskPostit = () => {
    return (
        <PostWrapper>
            <PostContent>
                <h2 className="center">Today's Tasks</h2>
            </PostContent>
        </PostWrapper>
    )
}

export default TaskPostit;
