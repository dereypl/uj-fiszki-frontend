import React, {FC} from 'react';
import styled from "styled-components";
import {TSet} from "../../../../database/DataTypes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 100%;
  height: 15rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  border-bottom: 0.5rem solid ${({theme}) => theme.colors.gray_lightest};
  font-size: ${({theme}) => theme.fontSize.xl};
`;


const SetCard: FC<TSet> = ({name, userId, id, isPublic}) => {
    return (
        <Container>
            {name}
        </Container>
    );
};

export default SetCard;