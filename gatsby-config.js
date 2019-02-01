require('dotenv').config();

const theme = require('./src/theme');

console.log(theme);

const buildAlgoliaSearchIndex =
  process.env.BUILD_ALGOLIA_INDEX && process.env.BRANCH === 'master'
    ? [
        {
          resolve: 'gatsby-plugin-algolia',
          options: {
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_API_KEY,
            indexName: process.env.ALGOLIA_INDEX_NAME,
            queries: [
              {
                query: `
              {
                allMdx(filter: {
                  frontmatter: {
                    slug: {ne: null},
                    publish: {ne: false}
                  }
                }) {
                  edges {
                    node {
                      frontmatter {
                        slug
                        title
                        seo_title
                        description
                        images
                      }
                      rawBody
                    }
                  }
                }
              }
            `,
                transformer: ({ data }) =>
                  data.allMdx.edges.reduce((records, { node }) => {
                    const {
                      slug,
                      title,
                      seo_title: alt,
                      description,
                    } = node.frontmatter;

                    const base = { slug, title, alt, description };
                    const chunks = node.rawBody.split('\n\n');

                    return [
                      ...records,
                      ...chunks.map((text, index) => ({
                        ...base,
                        objectID: `${slug}-${index}`,
                        text,
                      })),
                    ];
                  }, []),
              },
            ],
          },
        },
      ]
    : [];

module.exports = {
  siteMetadata: theme,
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        globalScope: `
          import { Figure, Tweetable } from '$components';

          export default { Figure, Tweetable };
        `,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-numbered-footnotes' },
          { resolve: 'gatsby-remark-smartypants' },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content',
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-numbered-footnotes',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-instagram',
    {
      resolve: 'gatsby-plugin-amplitude-analytics',
      options: {
        apiKey: 'f8d938da6faf54d25ee934390af70e01',
        head: false,
        respectDNT: true,
        amplitudeConfig: {
          includeUtm: true,
          includeReferrer: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jason Lengstorf',
        short_name: '@jlengstorf',
        start_url: '.',
        theme_color: '#c800ec',
        background_color: '#ffffff',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png?v=6946GROn29',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png?v=6946GROn29',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    // Service Workers are disabled for now.
    'gatsby-plugin-remove-serviceworker',
    // 'gatsby-plugin-offline',

    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            // Base: https://airtable.com/shragvnFckZYeUhvm
            baseId: 'appWQnWirwnRTSkHa',
            tableName: 'Events',
            tableView: 'Accepted',
            tableLinks: ['Accepted Talk(s)'],
          },
          {
            // Base: https://airtable.com/shr5IvPfIuL0PpKZo
            baseId: 'appWQnWirwnRTSkHa',
            tableName: 'Talks',
            tableView: 'Grid view',
          },
        ],
      },
    },
    ...buildAlgoliaSearchIndex,
  ],
};
