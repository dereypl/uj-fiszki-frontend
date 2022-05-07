import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../../shared/Header";
import {AppWrapper} from '../protected.styles';
import SetService from "../../../../database/SetService";
import {TSet, TWord} from "../../../../database/DataTypes";
import Loader from "../../../shared/Loader";
import WordService from "../../../../database/WordService";
import styled, {css} from "styled-components";
import {ROUTES} from "../../../../routes/index.js";
import SetModeSwitcher from "./SetModeSwitcher";
import Button from "../../../shared/Button";

export const GoBackButton = styled.p`
  cursor: pointer;
  font-size: ${({theme}) => theme.fontSize.s};
  width: 20rem;
`;


export const ButtonsWrapper = styled.div`
  display: flex;
  width: 45rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;


export const Container = styled.div<{ isDefinition?: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 45rem;
  height: 45rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  font-size: ${({theme}) => theme.fontSize.xl};
  transition: all .2s ease-in-out;
  margin-bottom: 5rem;

  ${({isDefinition}) => isDefinition && css`
    color: white;
    background-color: ${({theme}) => theme.colors.main_dark};
  `}
`;


const LearnSetPage = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [set, setSet] = useState<TSet | null>(null)
    const [words, setWords] = useState<TWord[]>([])
    const [loading, setLoading] = useState(false)
    const [restWords, setRestWords] = useState<TWord[]>([])
    const [isDefinitionMode, setIsDefinitionMode] = useState(false)
    const [isCurrentInverted, setIsCurrentInverted] = useState(false)
    const [currentWord, setCurrentWord] = useState<null | TWord>(null)

    const loadData = async () => {
        setLoading(true)
        const data = await SetService.getOne(id) as TSet;
        const words = await WordService.getAllBySetId(id as string);
        setSet(data)
        setWords(words)
        setRestWords(words)
        setLoading(false)
    }


    useEffect(() => {
        loadData()
    }, [id])

    const handleReturnToDashboard = () => navigate(ROUTES.PROTECTED.DASHBOARD)
    const handleInvertDefinitionMode = () => setIsCurrentInverted(!isCurrentInverted)

    const isDefinitionVisible = isCurrentInverted ? !isDefinitionMode : isDefinitionMode


    useEffect(() => {
        setCurrentWord(restWords[0])
    }, [restWords, restWords.length])

    const handleShiftElement = () => {
        const w = [...restWords];
        w.shift()
        setRestWords(w)
    }

    const handlePushElement = () => {
        const w = [...restWords];
        const shifted = w.shift() as TWord;
        w.push(shifted)
        setRestWords(w)
    }

    return (
        <AppWrapper>
            <Header/>
            {loading
                ? <Loader/>
                : <>
                    <GoBackButton onClick={handleReturnToDashboard}>{'< powrót do strony głównej'}</GoBackButton>
                    <SetModeSwitcher checked={isDefinitionMode} setChecked={setIsDefinitionMode}/>
                    <Wrapper>
                        {`${words.length - restWords.length} / ${words.length}`}
                        <Container onMouseEnter={handleInvertDefinitionMode}
                                   onMouseLeave={handleInvertDefinitionMode}
                                   isDefinition={isDefinitionVisible}>{isDefinitionVisible ? currentWord?.definition : currentWord?.word}</Container>
                        <ButtonsWrapper>
                            <Button marginRight={'1.5rem'} onClick={handleShiftElement}>Wiem</Button>
                            <Button onClick={handlePushElement} outline>Nie wiem</Button>
                        </ButtonsWrapper>
                    </Wrapper>

                </>
            }
        </AppWrapper>
    );
};

export default LearnSetPage;