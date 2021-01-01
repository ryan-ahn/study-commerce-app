import { css } from 'styled-components';

export const Mixin = {
  flexSet: (
    justifyContent = 'center',
    alignItems = 'center',
    flexDirection = 'column'
  ) => css`
    display: flex;
    flex-direction: ${flexDirection};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `,
};
