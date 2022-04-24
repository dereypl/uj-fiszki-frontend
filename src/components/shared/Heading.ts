import styled from "styled-components";

export const Heading = styled.h1<{ fontSize?: string, margin?: string, color?: string }>`
  display: flex;
  color: ${({theme, color}) => color || theme.colors.main_dark};
  font-size: ${({theme, fontSize}) => fontSize || theme.fontSize.xxl};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  margin: ${({margin}) => margin || 0};
  padding: 0;
`;