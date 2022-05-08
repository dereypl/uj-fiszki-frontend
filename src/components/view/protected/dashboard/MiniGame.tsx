import React, {createContext, useEffect, useState} from 'react';
import {useAuth} from "../../../../context/AuthContext";
import SetCard from "./SetCard";
import SetService from "../../../../database/SetService";
import Loader from "../../../shared/Loader";
import SetTypeSwitcher from "./SetTypeSwitcher";
import {AddNewSetCard, Grid, InfoText, StyledAddCircleOutlineIcon} from './DashboardPage.styles';
import {AppWrapper} from '../protected.styles';
import Header from "../../../shared/Header";
import AddSetModal from "./AddSetModal";
import WordService from "../../../../database/WordService";
import {TSet, TWord} from "../../../../database/DataTypes";
import styled, {css} from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "../../../../routes/index.js";
import BeenhereIcon from '@mui/icons-material/Beenhere';

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
export const StyledBeenhereIcon = styled(BeenhereIcon)`
  font-size: 15rem !important;
  color: ${({theme}) => theme.colors.main_dark} !important;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 25rem;
  height: 25rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  font-size: ${({theme}) => theme.fontSize.xl};
  transition: all .2s ease-in-out;
  margin-bottom: 5rem;
  margin-top: 2rem;
`;


const MiniGamePage = () => {
    const {id} = useParams()
    const [originalWords, setOriginalWordsords] = useState<TWord[]>([])
    const [words, setWords] = useState<TWord[]>([])
    const [currentWordToQuess, setCurrentWordToQuess] = useState<TWord>()
    const [definitions, setDefinitions] = useState<string[]>([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    function shuffleArray(array: String[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const loadData = async () => {
        const words = await WordService.getAllBySetId(id as string)
        setWords(words)
        setOriginalWordsords(words)
        var current = words[Math.floor(Math.random()*words.length)];
        setCurrentWordToQuess(current)

        var newWords = words
        .filter(function(word) {
            return word.id != current.id
        })
        .map(function(x) {
            return x.word
        })

        shuffleArray(newWords)
        const defs = newWords.slice(0,3)
        defs.push(current.word)
        shuffleArray(defs)
        setDefinitions(defs)
    }

    function selectWord(clicked: string) {
        if (clicked == currentWordToQuess?.word) {
            console.log("Dobrze")
            var newWords = words
            .filter(function(word) {
                return word.id != currentWordToQuess.id
            })

            if(newWords.length == 0) {
                setWords([])
                setIsCompleted(true)
            } else {
                var current = newWords[Math.floor(Math.random()*newWords.length)];

                setWords(newWords)
                setCurrentWordToQuess(current)
    
                var toShuffle = originalWords
                .filter(function(word) {
                    return word.id != current.id
                })
                .map(function(x) {
                    return x.word
                })
        
                shuffleArray(toShuffle)
                const defs = toShuffle.slice(0,3)
                defs.push(current.word)
                shuffleArray(defs)
                setDefinitions(defs)    
            }

        } else {
            var newWords = words
            var current = newWords[Math.floor(Math.random()*newWords.length)];

            setWords(newWords)
            setCurrentWordToQuess(current)

            var toShuffle = originalWords
            .filter(function(word) {
                return word.id != current.id
            })
            .map(function(x) {
                return x.word
            })
    
            shuffleArray(toShuffle)
            const defs = toShuffle.slice(0,3)
            defs.push(current.word)
            shuffleArray(defs)
            setDefinitions(defs)    
        }
    }
    
    const handleReturnToDashboard = () => navigate(ROUTES.PROTECTED.DASHBOARD)

    useEffect(() => {
        loadData()
    }, []);    

    return (
        <AppWrapper>
        <Header/>
        {loading
            ? <Loader/>
            : <>
                <GoBackButton onClick={handleReturnToDashboard}>{'< powrót do strony głównej'}</GoBackButton>
                {isCompleted
                    ? <Wrapper>
                        <StyledBeenhereIcon/>
                        <h2>Ukończono naukę!</h2>
                    </Wrapper> :
                    <>
                        <Wrapper>
                        <h4> {`${originalWords.length - words.length} / ${originalWords.length}`}</h4>

                    <p>{`${currentWordToQuess?.definition}`}</p>

                       
                        <Grid>
                        {definitions.map(txt => 
                            <Container data-value={txt} onClick={ e =>
                                selectWord(e.currentTarget.getAttribute("data-value")!)
                            }>{txt}</Container>
                        )}
                        </Grid>


                        </Wrapper>
                    </>
                }
            </>
        }
    </AppWrapper>

    );
};

export default MiniGamePage;