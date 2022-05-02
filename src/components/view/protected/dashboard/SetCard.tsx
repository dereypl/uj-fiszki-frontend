import React, {FC} from 'react';
import styled from "styled-components";
import {TSet} from "../../../../database/DataTypes";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublicIcon from '@mui/icons-material/Public';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../routes/index.js";
import EditIcon from '@mui/icons-material/Edit';

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


const SetCard: FC<TSet> = ({name, userId, id, isPublic}) => {
    const navigate = useNavigate();
    const handleRedirect = () => navigate(`${ROUTES.PROTECTED.MANAGE_SET}/${id}`)

    return (
        <Container>
            <ContentCopyIcon fontSize={"large"}/>
            <h3>{name}</h3>
            {isPublic && <PublicIconWrapper>
                <PublicIcon fontSize={"inherit"}/>
            </PublicIconWrapper>}
            <StyledEditIcon onClick={handleRedirect}/>
        </Container>
    );
};

export default SetCard;