import React from 'react';
import {useAuth} from "../../context/AuthContext";
import Button from "./Button";
import styled from "styled-components";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  font-size: 3rem !important;
  margin-bottom: -.9rem !important;
  margin-right: 1rem !important;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 2rem 0 5rem 0;

  p b {
    margin-left: 0.5rem;
  }
`;


const Header = () => {
    const {currentUser: {email}, logout} = useAuth()

    return (
        <HeaderContainer>
            <p><StyledPersonOutlineIcon/>Witaj,<b>{email}</b></p>
            <Button onClick={logout} outline logout>Wyloguj się</Button>
        </HeaderContainer>
    );
};

export default Header;