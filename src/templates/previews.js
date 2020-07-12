import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import CategoryLink from '../components/CategoryLink';
import TagLink from '../components/TagLink';
import Pagination from '../components/Pagination';
import { colors } from '../tokens';
import useSiteMetadata from '../hooks/use-site-metadata';

const getHeading = ({
  isFirstPage,
  currentPage,
  totalPages,
  type,
  value,
  categories,
}) => {
  if (type === 'category' && value) {
    const category = categories.find((c) => c.slug === value);
    const displayName = category ? category.name : value;
    return `Posts in the category “${displayName}”`;
  }

  if (type === 'tag' && value) {
    return `Posts tagged with “${value}”`;
  }

  if (type === 'all' && isFirstPage) {
    return 'Latest Blog Posts';
  }

  return `Blog Posts, page ${currentPage} of ${totalPages}`;
};

const Heading = styled('h1')`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: normal;
`;

const Preview = styled('section')`
  border-bottom: 1px solid ${colors.grayAlpha};
  padding-bottom: 1.25rem;
`;

const PreviewHeading = styled('h2')`
  font-size: 1.25rem;
`;

const PreviewLink = styled(Link)`
  color: inherit;
  font-weight: 600;
  text-decoration: none;
`;

const CategoryList = styled('div')`
  font-size: 0.625rem;
  margin-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Excerpt = styled('p')`
  margin-top: 0.5rem;
`;

const ReadMoreLink = styled(Link)`
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`;

const Previews = ({
  pageContext: {
    postGroup,
    isFirstPage,
    isLastPage,
    currentPage,
    totalPages,
    linkBase,
    linkRoot,
    type,
    value,
  },
}) => {
  const { categories } = useSiteMetadata();
  const category = categories.find((cat) => cat.slug === value);
  const title = {
    all: 'All Posts',
    tag: `Posts Tagged with “${value}”`,
    category: `Posts About ${category ? category.name : value}`,
  };
  const page = !isFirstPage ? ` (page ${currentPage} of ${totalPages})` : '';

  return (
    <Layout title={`${title[type]}${page}`}>
      <Heading>
        {getHeading({
          isFirstPage,
          currentPage,
          totalPages,
          type,
          value,
          categories,
        })}
      </Heading>
      {postGroup.map(({ id, childMdx: post }) => (
        <Preview key={id}>
          <PreviewHeading>
            <PreviewLink
              to={`/${linkRoot === 'code' ? `${linkRoot}/` : ''}${
                post.frontmatter.slug
              }/`}
            >
              {post.frontmatter.title}
            </PreviewLink>
          </PreviewHeading>
          <CategoryList>
            {post.frontmatter.category.map((category) => (
              <CategoryLink
                key={`category-${category}`}
                category={category}
                linkRoot={linkRoot}
              />
            ))}
          </CategoryList>
          <Excerpt>{post.frontmatter.description}</Excerpt>
          {post.frontmatter.tag.map((tag) => (
            <TagLink key={`tag-${tag}`} tag={tag} linkRoot={linkRoot} />
          ))}
          <ReadMoreLink to={`/${post.frontmatter.slug}/`}>
            Read post ›
          </ReadMoreLink>
        </Preview>
      ))}

      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        currentPage={currentPage}
        totalPages={totalPages}
        linkBase={linkBase}
      />
    </Layout>
  );
};

Previews.propTypes = {
  pageContext: PropTypes.shape({
    postGroup: PropTypes.any,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
  }).isRequired,
};

export default Previews;
