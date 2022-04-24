import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../../context/AuthContext";
import Button from "../../../shared/Button";
import styled from "styled-components";
import SetCard from "./SetCard";
import {TSet} from "../../../../database/DataTypes";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SetService from "../../../../database/SetService";
import Loader from "../../../shared/Loader";

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 3.5rem !important;
  opacity: 0.8;
  margin-bottom: -1rem;
`
export const Grid = styled.div`
  display: grid;
  gap: 2rem;
  width: 80%;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  margin: 5rem auto 0;
`;


export const AddNewSetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
  border-radius: 0.8rem;
  border: 0.3rem dashed ${({theme}) => theme.colors.light_gray_border};
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  color: ${({theme}) => theme.colors.light_gray};
  cursor: pointer;
  transition: all .25s ease-in-out;

  &:hover {
    color: ${({theme}) => theme.colors.gray};
    border: 0.3rem dashed ${({theme}) => theme.colors.light_gray};
    box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  }
`;


const DashboardPage = () => {
    const [sets, setSets] = useState<TSet[]>([])
    const [loading, setLoading] = useState(false)
    const {currentUser: {email, uid}, logout} = useAuth()

    const loadTestData = async () => {
        // console.log(await WordService.getAll());
        // console.log(await WordService.getOne('QdpLQQsQN8649uuc2w16'))
    }

    const loadCurrentUserSets = async () => {
        setLoading(true)
        const sets = await SetService.getAllByUserId(uid);
        setSets(sets)
        setLoading(false)
    }


    useEffect(() => {
        // loadTestData()
        loadCurrentUserSets()

    }, [])

    return (
        <>
            {`Witaj ${email}.`}
            <Button onClick={logout}>Logout</Button>
            {loading ? <Loader/> :
                <Grid>
                    {sets.map(set => <SetCard key={set.id} {...set}/>)}
                    <AddNewSetCard>
                        <StyledAddCircleOutlineIcon fontSize={"inherit"}/>
                        <p>Dodaj zbiór</p>
                    </AddNewSetCard>
                </Grid>
            }
        </>
    );
};

export default DashboardPage;