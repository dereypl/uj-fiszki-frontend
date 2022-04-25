import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 3.5rem !important;
  opacity: 0.8;
  margin-bottom: -1rem;
`
export const Grid = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  margin: 4rem auto 0;
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
  transition: all .2s ease-in-out;

  &:hover {
    color: ${({theme}) => theme.colors.gray};
    border: 0.3rem dashed ${({theme}) => theme.colors.light_gray};
    box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  }
`;

export const InfoText = styled.div`
  background-color: rgba(52, 0, 106, 0.07);
  border-radius: 0.8rem;
  width: 100%;
  padding: 1rem 3rem;
  opacity: 0.6;

  h4 {
    margin-bottom: 0.1rem;
  }

  p {
    margin-top: 0.5rem;
    color: ${({theme}) => theme.colors.gray};
  }
`;