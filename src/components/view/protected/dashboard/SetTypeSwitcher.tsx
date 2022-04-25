import React, {useContext} from 'react';
import styled, {css} from "styled-components";
import {SetTypeContext} from "./DashboardPage";

export const Switch = styled.div<{ checked: boolean }>`
  width: 100%;
  background-color: white;
  border-radius: 0.8rem;
  overflow: hidden;
  text-align: center;
  font-size: ${({theme}) => theme.fontSize.xl};
  position: relative;
  padding-right: 50%;
  color: ${({theme, checked}) => checked ? theme.colors.gray_lightest : theme.colors.main_dark};
  transition: all 0.3s ease-in-out;
  margin-top: 3rem;

  &:before {
    content: "Publiczne";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }
`;


export const CheckBoxInput = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
`;


export const StyledLabel = styled.label<{ checked: boolean }>`
  position: relative;
  padding: 15px 0;
  display: block;
  user-select: none;
  pointer-events: none;
  color: ${({theme, checked}) => checked ? theme.colors.main_dark : theme.colors.gray_lightest};
  transition: all 0.3s ease-in-out;

  &:before {
    content: "";
    background-color: ${({theme}) => theme.colors.main_dark};
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0.8rem;
    transform: translateX(0);
    transition: transform 0.3s;
  }

  ${({checked}) => checked && css`
    &:before {
      transform: translateX(100%);
    }
  `}
`;

export const StyledSpan = styled.span`
  position: relative;
`;


const SetTypeSwitcher = () => {
    const {showPublic: checked, setShowPublic: setChecked} = useContext(SetTypeContext)

    return (
        <Switch checked={checked}>
            <CheckBoxInput type="checkbox" checked={checked} onChange={() => setChecked(!checked)}></CheckBoxInput>
            <StyledLabel htmlFor="" checked={checked}>
                <StyledSpan>Prywatne</StyledSpan>
            </StyledLabel>
        </Switch>
    );
};

export default SetTypeSwitcher;