import React from 'react';
import { Global, css } from '@emotion/core';

export default () => (
  <Global
    styles={css`
      body {
        margin: 0 auto;
        max-width: 90%;

        @supports (display: flex) {
          align-items: center;
          display: flex;
          justify-content: center;
          min-height: 100vh;
        }
      }

      * {
        box-sizing: border-box;
        margin: 0;
      }

      * + * {
        margin-top: 1rem;
      }
    `}
  />
);
