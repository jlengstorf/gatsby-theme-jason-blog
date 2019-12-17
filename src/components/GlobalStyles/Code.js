import React from 'react';
import { Global, css } from '@emotion/core';
import { colors, fonts } from '../../tokens';

const Code = () => (
  <Global
    styles={css`
      .gatsby-highlight {
        font-size: 16px;

        .gatsby-code-title + & {
          margin-top: 0;
        }

        code[class*='language-'],
        pre[class*='language-'] {
          font-family: ${fonts.mono};

          &::selection,
          span.token::selection,
          .gatsby-highlight-code-line::selection,
          ::selection {
            background: ${colors.primary};
            color: ${colors.lightest};
          }
        }

        pre[class*='language-'] {
          border-radius: 0.25rem;

          .gatsby-code-title + & {
            border-radius: 0 0 0.25rem 0.25rem;
            border-top: 2px solid ${colors.primary};
            margin-top: 0;
          }
        }
      }

      p code[class*='language-'] {
        font-size: 16px;
        padding: 0 0.25rem;
        white-space: pre-line;
        word-break: break-word;
      }

      .gatsby-highlight-code-line {
        background-color: ${colors.grayAlphaExtra};
        display: block;
        margin-left: -1em;
        margin-right: -1em;
        margin-top: 0;
        padding-right: 1em;
        padding-left: 0.75em;
        border-left: 4px solid ${colors.primary};
      }

      .gatsby-code-title {
        background: ${colors.lightest};
        box-shadow: inset 0 2px 0.25rem ${colors.primary}40;
        border: 1px solid ${colors.textLight};
        border-bottom: 0;
        border-radius: 0.25rem 0.25rem 0 0;
        color: ${colors.text};
        font-family: ${fonts.mono};
        font-size: 0.75rem;
        margin-bottom: 0;
        padding: 0.5em 1em;
        z-index: 0;

        ::before {
          content: 'file: ';
          font-family: ${fonts.default};
          font-size: 75%;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      }

      @media (min-width: calc(647px + 2rem)) {
        .gatsby-code-title,
        .gatsby-highlight {
          margin-left: -1rem;
          margin-right: -1rem;
        }
      }
    `}
  />
);

export default Code;
