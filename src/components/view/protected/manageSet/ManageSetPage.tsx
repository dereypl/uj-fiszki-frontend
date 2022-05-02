import React, {useEffect, useReducer, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../../shared/Header";
import {AppWrapper} from '../protected.styles';
import SetService from "../../../../database/SetService";
import {TSet, TWord} from "../../../../database/DataTypes";
import Loader from "../../../shared/Loader";
import AddWordModal from "./AddWordModal";
import WordService from "../../../../database/WordService";
import WordRow from "./WordRow";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//
// const initialState: { words: TWord[] } = {
//     words: []
// };
//
// enum WORD_ACTIONS {
//     ADD = 'ADD',
//     DELETE = 'DELETE',
//     UPDATE = 'UPDATE'
// }
//
// function reducer(state: typeof initialState, action: any) {
//     switch (action.type) {
//         case WORD_ACTIONS.ADD:
//             return {
//                 words: [...state.words, action.data]
//             };
//         case WORD_ACTIONS.DELETE:
//             return {
//                 words: state.words.filter(word => word.id !== action.id)
//             };
//         default:
//             throw new Error();
//     }
// }

export const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 2.2rem !important;
  opacity: 0.8;
  margin-right: 1rem !important;
`

export const AddNewWordRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  border-radius: 0.8rem;
  padding: 2rem;
  border: 0.3rem dashed ${({theme}) => theme.colors.light_gray_border};
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  color: ${({theme}) => theme.colors.light_gray};
  cursor: pointer;
  transition: all .2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    color: ${({theme}) => theme.colors.gray};
    border: 0.3rem dashed ${({theme}) => theme.colors.light_gray};
    box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  }
`;


const ManageSetPage = () => {
    const {id} = useParams()
    const [set, setSet] = useState<TSet | null>(null)
    const [words, setWords] = useState<TWord[]>([])
    const [loading, setLoading] = useState(false)
    const [currentlyEditedWordId, setCurrentlyEditedWordId] = useState<string | null>(null)

    // const [state, dispatch] = useReducer(reducer, initialState);

    // const handleAddNewWord = ({word, definition}) => {
    //     // dispatch({
    //     //     type: WORD_ACTIONS.ADD,
    //     //     data: {, definition: 'test', word: 'test', setId: set?.id}
    //     // })
    // }

    const loadData = async () => {
        setLoading(true)
        const data = await SetService.getOne(id) as TSet;
        const words = await WordService.getAllBySetId(id as string);
        setSet(data)
        setWords(words)
        setLoading(false)
    }


    useEffect(() => {
        loadData()
    }, [id])

    return (
        <AppWrapper>
            <Header/>
            {loading
                ? <Loader/>
                : <>
                    <h2>Edycja zbioru</h2>
                    <h3>{set?.name}</h3>
                    {words.map(word => <WordRow setCurrentlyEditedWordId={setCurrentlyEditedWordId}
                                                key={word.id} {...word} />)}
                    <AddNewWordRow onClick={() => setCurrentlyEditedWordId('new')}>
                        <StyledAddCircleOutlineIcon fontSize={'medium'}/>
                        <p>Dodaj pojęcie</p>
                    </AddNewWordRow>
                </>
            }
            {currentlyEditedWordId && <AddWordModal
                currentlyEditedWordId={currentlyEditedWordId}
                hideModal={() => setCurrentlyEditedWordId(null)}
                onSuccess={loadData}
            />}
        </AppWrapper>
    );
};

export default ManageSetPage;