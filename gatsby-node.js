const path = require('path');
const { template, chunk } = require('lodash');

const getUnique = (field, posts) =>
  posts.reduce((uniques, post) => {
    const values = post.childMdx.frontmatter[field];

    return uniques.concat(values.filter((val) => !uniques.includes(val)));
  }, []);

const groupPostsByUnique = (field, posts) => {
  const uniqueValues = getUnique(field, posts);

  return uniqueValues.reduce(
    (grouped, unique) => ({
      ...grouped,
      [unique]: posts.filter((post) =>
        post.childMdx.frontmatter[field].includes(unique),
      ),
    }),
    {},
  );
};

// Add paginated blog preview pages. Here’s how it works:
//
// 1.  Use lodash-chunk to create posts in groups.
// 2.  Finally, we create a new page for each post group.
//
// Adapted from https://github.com/pixelstew/gatsby-paginate
const paginate = (
  { pathTemplate, createPage, component, type, value, linkRoot = 'blog' },
  posts,
) =>
  chunk(posts, 10).forEach((postGroup, index, allGroups) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;
    const totalPages = allGroups.length;
    const getPath = template(pathTemplate);
    const pagePath = getPath({ pageNumber: isFirstPage ? '' : currentPage });

    createPage({
      path: pagePath.replace('//', '/'),
      component,
      context: {
        postGroup,
        type,
        value,
        currentPage,
        totalPages,
        isFirstPage,
        isLastPage: currentPage === totalPages,
        linkBase: getPath({ pageNumber: '' }),
        linkRoot,
      },
    });
  });

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.{md,mdx}" } }
        sort: { fields: childMdx___frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          childMdx {
            frontmatter {
              publish
              title
              description
              slug
              images
              cta
              category
              tag
            }
          }
        }
      }
    }
  `);

  const posts = result.data.posts.nodes.filter(
    (post) => post.childMdx.frontmatter.publish !== false,
  );

  posts.forEach((post) => {
    if (
      !post.childMdx ||
      !post.childMdx.frontmatter ||
      !post.childMdx.frontmatter.slug
    ) {
      console.log(post); // eslint-disable-line no-console
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug, images, cta = 'default' } = post.childMdx.frontmatter;

    const image = images && images[0];

    createPage({
      path: `/${slug}/`,
      component: require.resolve('./src/templates/post.js'),
      context: {
        imageRegex: `/${image}/`,
        offer: `/offers/${cta}/`,
        slug,
      },
    });
  });

  const paginationDefaults = {
    createPage,
    component: require.resolve('./src/templates/previews.js'),
  };

  const allPosts = posts.filter(
    (post) => post.childMdx.frontmatter.publish !== false,
  );

  const createPages = (type, postArray, parent = 'blog') => {
    const groupedPosts = groupPostsByUnique(type, postArray);

    Object.entries(groupedPosts).forEach(([typeValue, postGroup]) => {
      paginate(
        {
          ...paginationDefaults,
          pathTemplate: `/${parent}/${type}/${typeValue}/<%= pageNumber %>/`,
          type,
          value: typeValue,
          linkRoot: parent,
        },
        postGroup,
      );
    });
  };

  createPages('tag', allPosts);
  createPages('category', allPosts);

  paginate(
    {
      ...paginationDefaults,
      pathTemplate: '/blog/<%= pageNumber %>/',
      type: 'all',
      value: null,
    },
    allPosts,
  );

  // CODE BLOG
  const codeResult = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "code/**/*.mdx" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              description
              slug
              images
              category
              tag
            }
          }
        }
      }
    }
  `);

  if (codeResult.error) {
    reporter.panic('There was a problem loading code posts!');
    return;
  }

  const codePosts = codeResult.data.posts.nodes;

  codePosts.forEach((postNode) => {
    const post = postNode.childMdx.frontmatter;
    const image = post.images && post.images[0];

    createRedirect({
      fromPath: `/code/${post.slug}/`,
      toPath: `/${post.slug}/`,
      isPermanent: true,
      redirectInBrowser: true,
    });

    createPage({
      path: `/${post.slug}/`,
      component: require.resolve('./src/templates/code-post.js'),
      context: {
        slug: post.slug,
        imageRegex: `/${image}/`,
        offer: `/offers/code/`,
      },
    });
  });

  createPages('tag', codePosts, 'code');
  createPages('category', codePosts, 'code');
  paginate(
    {
      ...paginationDefaults,
      pathTemplate: '/code/<%= pageNumber %>/',
      type: 'all',
      value: null,
      linkRoot: 'code',
    },
    codePosts,
  );
  // END CODE BLOG

  // The /hire-me page no longer exists, so send to contact instead.
  createRedirect({
    fromPath: '/hire-me',
    toPath: '/contact/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // The /cost-of-living page no longer exists, so send to the blog instead.
  createRedirect({
    fromPath: '/cost-of-living',
    toPath: '/cost-of-living-remotely/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
