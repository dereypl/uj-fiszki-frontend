import React, {createContext, useEffect, useState} from 'react';
import {useAuth} from "../../../../context/AuthContext";
import SetCard from "./SetCard";
import {TSet} from "../../../../database/DataTypes";
import SetService from "../../../../database/SetService";
import Loader from "../../../shared/Loader";
import SetTypeSwitcher from "./SetTypeSwitcher";
import {AddNewSetCard, Grid, InfoText, StyledAddCircleOutlineIcon} from './DashboardPage.styles';
import {AppWrapper} from '../protected.styles';
import Header from "../../../shared/Header";

export const SetTypeContext = createContext<{ showPublic: boolean, setShowPublic: React.Dispatch<React.SetStateAction<boolean>> }>({
    showPublic: false,
    setShowPublic: () => false
});

const DashboardPage = () => {
    const {currentUser: {uid}} = useAuth()

    const [sets, setSets] = useState<TSet[]>([])
    const [loading, setLoading] = useState(false)
    const [showPublic, setShowPublic] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const sets = showPublic ? await SetService.getAllPublic() : await SetService.getAllByUserId(uid);
            setSets(sets)
            setLoading(false)
        })()
    }, [showPublic, uid])

    return (
        <SetTypeContext.Provider value={{showPublic, setShowPublic}}>
            <AppWrapper>
                <Header/>
                <InfoText>
                    <h4>Wybierz zbiór, aby rozpocząć naukę.</h4>
                    <p>Możesz przeglądać zbiory prywatne oraz publicze. Jeżeli chcesz utworzyć własny zbiór, możesz to
                        zrobić to klikając kafelek "Dodaj zbiór".</p>
                </InfoText>
                <SetTypeSwitcher/>
                {loading
                    ? <Loader/>
                    : <Grid>
                        {sets.map(set => <SetCard key={set.id} {...set}/>)}
                        {!showPublic && <AddNewSetCard>
                            <StyledAddCircleOutlineIcon fontSize={"inherit"}/>
                            <p>Dodaj zbiór</p>
                        </AddNewSetCard>}
                        {showPublic && !sets.length && <p>Brak publicznych zbiorów.</p>}
                    </Grid>
                }
            </AppWrapper>
        </SetTypeContext.Provider>
    );
};

export default DashboardPage;