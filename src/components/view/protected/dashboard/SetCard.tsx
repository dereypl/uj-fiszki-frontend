import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import {TSet} from "../../../../database/DataTypes";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublicIcon from '@mui/icons-material/Public';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../routes/index.js";
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SetService from '../../../../database/SetService';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Airplay from '@mui/icons-material/Airplay';
import Button from '../../../shared/Button';
import {useAuth} from "../../../../context/AuthContext";
import WordService from '../../../../database/WordService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {SetTypeContext} from "./DashboardPage";
import Loader from "../../../shared/Loader";

export const Container = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  padding: 3rem;
  width: 100%;
  height: 15rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  font-size: ${({theme}) => theme.fontSize.xl};
  transition: border .1s ease-in-out;
  
  h3 {
    margin-top: 0;
    margin-left: 1rem;
  }

  &:hover {
    color: ${({theme}) => theme.colors.main_dark};
    border: 0.17rem solid ${({theme}) => theme.colors.main_dark};
  }
`;

export const PublicIconWrapper = styled.div`
  position: absolute;
  right: 3rem;
  top: 3rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
`;

export const CustomLoader = styled(Loader)`
  min-height: 5rem;
  height: 5rem;
  max-height: 5rem;
  position: absolute;
  top:-10rem;
  right: 0;
`;

export const AddSetButtonWrapper = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 3rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
`;

export const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  right: 3rem;
  top: 3rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
  cursor: pointer;
  opacity: .3;

  &:hover {
    opacity: 1;
  }
`;

export const StyledAirPlayIcon = styled(Airplay)`
  position: absolute;
  right: 5rem;
  top: 3rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
  cursor: pointer;
  opacity: .3;

  &:hover {
    opacity: 1;
  }
`;

export const StyledGroupIcon = styled(GroupAddIcon)`
  position: absolute;
  right: 3rem;
  top: 10rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
  cursor: pointer;
  opacity: .3;

  &:hover {
    opacity: 1;
  }
`;

export const GroupRemoveGroupIcon = styled(GroupRemoveIcon)`
  position: absolute;
  right: 3rem;
  top: 10rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
  cursor: pointer;
  opacity: .3;

  &:hover {
    opacity: 1;
  }
`;

export const RemoveIcon = styled(DeleteForeverIcon)`
  position: absolute;
  right: 3rem;
  top: 12rem;
  font-size: ${({theme}) => theme.fontSize.xxl};
  cursor: pointer;
  opacity: .3;

  &:hover {
    opacity: 1;
  }
`;

const SetCard: FC<TSet> = ({name, userId, id, isPublic}) => {
    const {currentUser: {uid}} = useAuth()
    const {showPublic} = useContext(SetTypeContext)
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();
    const handleEditRedirect = (e: any) => {
        e.stopPropagation()
        navigate(`${ROUTES.PROTECTED.MANAGE_SET}/${id}`)
    }

    const handleGoToMiniGame = (e: any) => {
        e.stopPropagation()
        navigate(`${ROUTES.PROTECTED.MINIGAME}/${id}`)
    }

    const handleLearnRedirect = () => navigate(`${ROUTES.PROTECTED.LEARN_SET}/${id}`)

    const handleShare = async (e: any) => {
        e.stopPropagation()
        await SetService.update(name, userId, id, !isPublic)
        window.location.reload()
    }


    const handleAddingSet = async (e: any) => {
        e.stopPropagation()
        setLoading(true)
        const words = await WordService.getAllBySetId(id)
        let set = await SetService.create(name, uid);
        //@ts-ignore
        const promises = [];
        words.forEach(w => {
                promises.push(WordService.create(w.word, w.definition, set.id))
            }
        )
        //@ts-ignore
        await Promise.all(promises)
        setLoading(false)
        window.location.reload()
    }


    const handleRemove = async (e: any) => {
        e.stopPropagation()
        await SetService.delete(id)
        window.location.reload()
    }

    return (
        <Container onClick={handleLearnRedirect}>
            {loading ? <CustomLoader/> :
                <>
                    <ContentCopyIcon fontSize={"large"}/>
                    <h3>{name}</h3>
                    {isPublic && <PublicIconWrapper>
                        <PublicIcon fontSize={"inherit"}/>
                    </PublicIconWrapper>}
                    {!isPublic && <StyledEditIcon onClick={handleEditRedirect}/>}
                    {!isPublic && <StyledAirPlayIcon onClick={handleGoToMiniGame}/>}
                    {showPublic
                        ? null
                        : (!isPublic
                                ? <StyledGroupIcon onClick={handleShare}/>
                                : <GroupRemoveGroupIcon onClick={handleShare}/>
                        )}
                    {isPublic && uid !== userId &&
                        <AddSetButtonWrapper>
                            <Button onClick={handleAddingSet} outline logout>Dodaj to swoich setów</Button>
                        </AddSetButtonWrapper>
                    }
                    {!isPublic && <RemoveIcon onClick={handleRemove}/>}
                </>
            }
        </Container>
    );
};

export default SetCard;