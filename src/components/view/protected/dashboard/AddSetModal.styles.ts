import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

export const ModalBackground = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #282c34;
  opacity: 0.4;
  z-index: 9999;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const ModalBox = styled.div<{ height?: string }>`
  display: flex;
  width: 60rem;
  max-width: 60rem;
  height: ${({height}) => height || '30rem'};
  position: absolute;
  top: 15rem;
  left: calc(50% - 30rem);
  background-color: white;
  z-index: 99999;
  border-radius: 0.8rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  justify-content: space-between;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 3rem;
  align-items: center;

  h3 {
    font-size: ${({theme}) => theme.fontSize.xxl};
    margin: 0;
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;
