import React from 'react';
import { Global, css } from '@emotion/core';

export default () => (
  <Global
    styles={css`
      .screen-reader-text {
        clip: rect(0 0 0 0);
        overflow: hidden;
        position: absolute;
        height: 1px;
        width: 1px;
      }

      .text-sharp {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}
  />
);
