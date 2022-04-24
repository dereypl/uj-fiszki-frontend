import styled, {css} from 'styled-components';

const Button = styled.button<{ width?: string, marginTop?: string, height?: string, outline?: boolean }>`
  display: flex;
  padding: 0;
  margin-top: ${({marginTop}) => marginTop || '0'};
  background-color: ${({theme}) => theme.colors.main_dark};
  width: ${({width}) => width || '30rem'};
  height: ${({height}) => height || '4.5rem'};
  border: none;
  border-radius: 0.8rem;
  font-weight: ${({theme}) => theme.fontWeight.regular};
  font-size: ${({theme}) => theme.fontSize.m};
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-position .3s;
  background-color: ${({theme}) => theme.colors.main_dark};
  color: ${({theme}) => theme.colors.light_gray_border};
  background-position: 0;
  background-size: 220%;

  &:hover {
    background-position: 100%;
    background-image: linear-gradient(120deg, transparent 0%, transparent 50%, #6200c5 50%, #2d005b);
    color: ${({theme}) => theme.colors.light_gray_border};
  }

  &:disabled {
    cursor: default;
    background-size: 0;
    background-color: ${({theme}) => theme.colors.gray_lightest};


    &:hover {
      color: ${({theme}) => theme.colors.light_gray_border};
    }
  }

  &:focus {
    outline: none;
  }

  ${({outline}) => outline && css`
    color: ${({theme}) => theme.colors.gray};
    background-color: transparent;
    border: 0.1rem solid ${({theme}) => theme.colors.gray};
    margin-top: 1rem;

    &:hover {
      background-image: linear-gradient(120deg, transparent 0%, transparent 50%, #777777 50%, #606060);
      color: white;
    }
  `}
`;

export default Button;