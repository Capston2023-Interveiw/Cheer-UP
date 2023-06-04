import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    width: 60vw;
    height:60vh;
    border: 1px solid;
    background-color: #FFFF;
    display: flex;
    flex-direction: row;
`;

export default function Face(){

    return(
        <Main>
            Face
        </Main>
    );
}