import styled, {css} from "styled-components";
import device from "../../../ui-config/MobileQueries";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0 0.5rem 0;
  width: 100%;
`;

export const Paragraph = styled.p<{ fontSize?: string }>`
  display: flex;
  margin: 2rem 0;
  width: 100%;
  font-size: ${({theme, fontSize}) => fontSize || theme.fontSize.m};
  color: ${({theme}) => theme.colors.gray};
  justify-content: center;

  span {
    margin-left: 0.5rem;
    color: ${({theme}) => theme.colors.main_dark};
    text-decoration: underline;
  }
`;

export const RequiredErrorLabel = styled.p`
  display: flex;
  justify-content: flex-end;
  color: ${({theme}) => theme.colors.error};
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  margin: -0.5rem 0 0.5rem 0;
  padding: 0;
`;

export const AuthFailedError = styled.div<{ visible?: boolean, success?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme, success}) => success? theme.colors.gray : theme.colors.error };
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  background-color: ${({theme, success}) => success? theme.colors.green_light : `rgba(226, 101, 101, 0.2)` };

  height: 3rem;
  border-radius: 0.8rem;
  opacity: 0;
  transition: opacity .3s;
  margin-bottom: 1rem;


  ${({visible}) => visible && css`
    opacity: 1;
  `}
`;


export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 60rem;
  min-width: 46rem;
  height: 55rem;
  border-radius: 1.5rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(0, 0, 0, 0.01), 0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.01);
  margin: calc(50vh - 27rem) auto 0 auto;

  @media ${device.laptop} {
    width: 40%;
  };
`;