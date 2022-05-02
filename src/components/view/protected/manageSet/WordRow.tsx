import React, {FC} from 'react';
import styled from "styled-components";
import {TWord} from "../../../../database/DataTypes";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 5rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  font-size: ${({theme}) => theme.fontSize.xl};
  transition: border .1s ease-in-out;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;

  &:hover {
    color: ${({theme}) => theme.colors.main_dark};
    border: 0.17rem solid ${({theme}) => theme.colors.main_dark};
  }
`;


const WordRow: FC<TWord & {setCurrentlyEditedWordId: Function}> = ({word, definition, id, setCurrentlyEditedWordId}) => {

    return (
        <Container onClick={() => setCurrentlyEditedWordId(id)}>
            <div>{word}</div>
            <div>{definition}</div>
        </Container>
    );
};

export default WordRow;