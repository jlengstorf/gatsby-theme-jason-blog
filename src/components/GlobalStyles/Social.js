import React from 'react';
import { Global, css } from '@emotion/core';

export default () => (
  <Global
    styles={css`
      /* Override element inline styles 😭 */
      .twitter-tweet-rendered,
      .instagram-media-rendered {
        margin: 1.25rem auto !important;
      }

      @media (max-width: 550px) {
        .twitter-tweet-rendered {
          width: 100% !important;
        }
      }
    `}
  />
);
