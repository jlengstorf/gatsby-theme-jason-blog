import React from 'react';
import { Global, css } from '@emotion/core';
import { colors, media } from '../../tokens';

export default () => (
  <Global
    styles={css`
      .gatsby-image-outer-wrapper {
        width: 100%;
      }
      .gatsby-image-wrapper img {
        margin-top: 0;
      }

      .figure {
        width: 100%;

        &--left,
        &--right {
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        & img {
          border: 1px solid ${colors.grayAlpha};
          height: auto;
          width: 100%;
        }

        &--no-border img {
          border: none;
        }

        @media ${media.medium} {
          &--center,
          &--left,
          &--right {
            margin-left: -20px;
            margin-right: -20px;
          }

          &--center {
            max-width: calc(100% + 40px);
            width: auto;
          }

          &--left,
          &--right {
            margin-bottom: 20px;
          }

          &--left {
            float: left;
            margin-right: 30px;
          }

          &--right {
            float: right;
            margin-left: 30px;
          }

          &--right &__caption {
            text-align: right;
          }
        }

        &__image-wrap {
          border: 1px solid ${colors.grayAlpha};
          margin-bottom: 0;
        }

        &__image-link {
          border: 0;
        }

        &__caption {
          margin-top: 0.5rem;
          padding: 0 0 0.5rem;
          border-bottom: 1px solid ${colors.grayAlpha};
          color: ${colors.gray};
          font-size: 0.875rem;
          line-height: 1rem;

          @media ${media.medium} {
            padding-left: 20px;
            padding-right: 20px;
          }

          blockquote & {
            border-bottom: none;
          }
          &:empty {
            display: none;
          }
        }

        &__attribution {
          display: block;
          margin-top: 0.25rem;
          color: ${colors.gray};
          font-size: 9px;
          font-weight: bold;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        &__attribution-link {
          display: inline-block;
          color: inherit;
          font-size: 11px;
          font-weight: normal;
          padding: 0.125rem 0.25rem;
          text-decoration: none;

          &:active,
          &:hover,
          &:focus {
            background-color: ${colors.primary};
            border-radius: 0.25rem;
            color: ${colors.lightest};
            outline: 0;
          }
        }
      }
    `}
  />
);
