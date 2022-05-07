import React, {FC} from 'react';
import styled from "styled-components";
import {TWord} from "../../../../database/DataTypes";
import DeleteIcon from '@mui/icons-material/Delete';
import WordService from "../../../../database/WordService";

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


const WordRow: FC<TWord & { setCurrentlyEditedWordId: Function, loadSetData: Function }> =
    ({
         word,
         definition,
         id,
         setCurrentlyEditedWordId,
         loadSetData
     }) => {

        const handleWordDelete = async (e: any) => {
            e.stopPropagation()
            try {
                await WordService.delete(id);
                loadSetData()
            } catch (e) {
                console.error(`cannot delete word id: ${id}`)
            }
        }

        return (
            <Container onClick={() => setCurrentlyEditedWordId(id)}>
                <div>{`Pojęcie: `}<b>{word}</b></div>
                <div>{`Definicja: `}<b>{definition}</b></div>
                <DeleteIcon onClick={(e) => handleWordDelete(e)}/>
            </Container>
        );
    };

export default WordRow;