import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { animation, colors } from '../tokens';

const TagLink = styled(Link)`
  color: ${colors.gray};
  display: inline-block;
  font-size: 0.625rem;
  line-height: 1.75;
  margin: 0 0.125rem;
  transition: color ${animation.transitionTime} linear;

  ::before {
    content: '#';
  }

  :hover,
  :active {
    background: transparent;
    color: ${colors.primary};
  }
`;

const Tag = ({ tag, linkRoot }) => (
  <TagLink to={`/${linkRoot}/tag/${tag}/`}>{tag}</TagLink>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
