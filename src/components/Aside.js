import React from 'react';
import { colors } from '../tokens';
import styled from '@emotion/styled';

const Aside = styled('aside')`
  ${({ warning }) =>
    warning
      ? `
      background: ${colors.warningBackground};
      border-left: 2px solid ${colors.warning};
      color: ${colors.textWarning};
    `
      : `
      background: ${colors.lightest};
      border-left: 2px solid ${colors.primaryDark};
      color: ${colors.textLight};
    `};
  border-radius: 0 0.25rem 0.25rem 0;
  box-shadow: 1px 1px 5px ${colors.grayAlphaExtra};
  font-style: italic;
  margin-left: -0.625rem;
  margin-right: -0.625rem;
  padding: 1rem 0.625rem;

  em,
  strong {
    color: inherit;
  }

  @media (min-width: calc(646px + 2rem)) {
    margin-left: -1rem;
    margin-right: -1rem;
    padding: 1rem;
  }
`;

export default ({ children, ...props }) => <Aside {...props}>{children}</Aside>;
