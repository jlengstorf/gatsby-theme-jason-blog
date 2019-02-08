import React from 'react';
import { Global, css } from '@emotion/core';
import { animation, colors, fonts, media } from '../../tokens';

export default () => (
  <Global
    styles={css`
      html,
      body {
        color: ${colors.text};
        font-family: ${fonts.default};
        font-size: ${fonts.sizeSm};
        line-height: 1.45;
        text-decoration-skip: ink;

        @media ${media.medium} {
          font-size: ${fonts.sizeMd};
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: ${colors.heading};
        font-family: ${fonts.heading};
        font-weight: 900;
        line-height: 1.1;
        margin-top: 1.5rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        &:first-child {
          margin-top: 0;
        }

        & + p {
          margin-top: 0.5rem;
        }
      }

      h2 {
        font-size: 1.5625rem;
      }
      h3 {
        font-size: 1.25rem;
      }
      h4 {
        font-size: 1.125rem;
      }
      h5 {
        font-size: 1rem;
      }
      h6 {
        font-size: 0.875rem;
      }

      h4,
      h5,
      h6 {
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      h3,
      h4,
      h5,
      h6 {
        font-weight: 700;
      }

      ol,
      ul {
        padding-left: 1.25rem;
      }

      li {
        margin-top: 0.5rem;
      }

      strong {
        color: ${colors.textDark};
      }

      a strong {
        color: inherit;
      }

      a {
        background-color: transparent;
        color: ${colors.primaryDark};
        padding: 0 0.125rem;
        transition: all ${animation.transitionTime} linear;

        &:focus,
        &:active,
        &:hover {
          background-color: ${colors.primary};
          border-radius: 0.25rem;
          color: ${colors.lightest};
          outline: 0;
          text-decoration: none;
        }
      }

      /* Footnotes are auto-generated, so a little bit of nonsense is required. */
      sup {
        margin: 0 0.25em;
        line-height: 1;
        vertical-align: baseline;
      }

      blockquote {
        border-bottom: 1px solid ${colors.primary};
        border-top: 1px solid ${colors.primary};
        clear: both;
        color: ${colors.textLight};
        font-size: 1.125rem;
        font-style: italic;
        overflow: hidden;
        padding: 1rem 10px;

        @media ${media.medium} {
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
      }

      blockquote > p:last-child strong:only-child:not(.no-attribution) {
        display: block;
        color: ${colors.gray};
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 600;
        text-align: right;

        &::before {
          content: '– ';
        }
      }

      blockquote > p:last-child strong:only-child a {
        border-color: ${colors.gray};
        color: inherit;

        :hover,
        :active,
        :focus {
          border-color: ${colors.primary};
          color: ${colors.primaryDark};
        }
      }

      abbr {
        border-bottom: 1px dotted ${colors.gray};
        cursor: help;
        text-decoration: none;
      }
    `}
  />
);
