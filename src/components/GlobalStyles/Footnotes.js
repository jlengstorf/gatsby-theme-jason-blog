import React from 'react';
import { Global, css } from '@emotion/core';
import { animation, colors, media } from '../../tokens';

export default () => (
  <Global
    styles={css`
      .footnote-ref {
        display: inline-block;
        height: 1em;
        width: 1em;
        background-color: ${colors.gray};
        border: 0;
        border-radius: 50%;
        box-sizing: content-box;
        color: ${colors.lightest};
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        padding: 0.25em;
        position: relative;
        text-align: center;
        text-decoration: none;
        top: -0.125em;
        transition: background-color ${animation.transitionTime} linear;

        @media ${media.medium} {
          top: -0.2em;
        }

        &:hover,
        &:active,
        &:focus {
          background-color: ${colors.primary};
          border-radius: 50%;
          color: ${colors.lightest};
          border: 0;
          outline: none;
        }
      }

      .footnotes {
        display: none;
      }

      .footnote-image {
        display: block;
        max-width: 100%;

        img {
          max-width: 100%;
        }
      }

      .footnote-backref {
        display: none;
      }

      @media ${media.medium} {
        .footnote-image--right {
          float: right;
          max-width: 45%;
          margin: 1rem 0 1rem 2rem;
        }
      }
    `}
  />
);
