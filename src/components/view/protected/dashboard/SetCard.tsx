import React, {FC} from 'react';
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
import Button from '../../../shared/Button';
import {useAuth} from "../../../../context/AuthContext";
import WordService from '../../../../database/WordService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  right: 6rem;
  top: 3rem;
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

    const navigate = useNavigate();
    const handleEditRedirect = (e: any) => {
        e.stopPropagation()
        navigate(`${ROUTES.PROTECTED.MANAGE_SET}/${id}`)
    }
    const handleLearnRedirect = () => navigate(`${ROUTES.PROTECTED.LEARN_SET}/${id}`)

    const handleShare = async (e: any) => {
      e.stopPropagation()
      await SetService.update(name, userId, id, !isPublic)
    }

    const handleAddingSet = async (e: any) => {
      e.stopPropagation()
      let words = WordService.getAllBySetId(id)
      let set = await SetService.create(name, uid)
      
      ;(await words).map((w => {
         WordService.create(w.word, w.definition, set.id)
      }))
    }

    const handleRemove = async(e: any) => {
      e.stopPropagation()
      await SetService.delete(id)
    }

    let shareButton;
    if (!isPublic) {
      shareButton = <StyledGroupIcon onClick={handleShare} />;
    } else {
      shareButton = <GroupRemoveGroupIcon onClick={handleShare} />;
    }
    return (
        <Container onClick={handleLearnRedirect}>
            <ContentCopyIcon fontSize={"large"}/>
            <h3>{name}</h3>
            {isPublic && <PublicIconWrapper>
                <PublicIcon fontSize={"inherit"}/>
            </PublicIconWrapper>}
            <StyledEditIcon onClick={handleEditRedirect}/>
            {shareButton}
            {isPublic && uid != userId &&
              <Button onClick={handleAddingSet} outline logout>Dodaj to swoich setów</Button>
            }
            <RemoveIcon onClick={handleRemove} />
        </Container>
    );
};

export default SetCard;