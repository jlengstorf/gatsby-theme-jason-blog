import 'prism-theme-night-owl';
import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import SEO from '../components/SEO/SEO';
import ContentArea from '../components/ContentArea';
import Blog from '../components/Blog';
import WithPopover from '../components/WithPopover';
import GlobalCodeStyles from '../components/GlobalStyles/Code';

export const pageQuery = graphql`
  query($slug: String!, $imageRegex: String!, $offer: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        category
        tag
        datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        seo_title
        slug
      }
    }
    offer: file(relativePath: { regex: $offer }) {
      childMarkdownRemark {
        html
        frontmatter {
          button
          link
          popover {
            heading
            benefits
            button
            group
          }
        }
      }
    }
    image: file(relativePath: { regex: $imageRegex }) {
      seo: childImageSharp {
        fluid(maxWidth: 1380) {
          src
        }
      }
      thumb: childImageSharp {
        fluid(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;

const getTitle = (frontmatter) => frontmatter.seo_title || frontmatter.title;

export default ({ data: { post, offer, image } }) => {
  if (
    !offer ||
    !offer.childMarkdownRemark ||
    !offer.childMarkdownRemark.frontmatter
  ) {
    throw Error(`Missing offer details for ${post.frontmatter.slug}`);
  }

  const {
    childMarkdownRemark: {
      html,
      frontmatter: { popover, button, link },
    },
  } = offer;

  // Prevent rerenders when footnotes/popovers change.
  const content = useMemo(() => <MDXRenderer>{post.body}</MDXRenderer>);

  return (
    <React.Fragment>
      <SEO
        frontmatter={post.frontmatter}
        postImage={image.seo.fluid.src}
        isBlogPost
      />
      <GlobalCodeStyles />
      <WithPopover
        heading={popover.heading}
        benefits={popover.benefits}
        button={popover.button}
        group={popover.group}
        source={`/${post.frontmatter.slug}/`}
        render={() => (
          <Blog.Layout title={getTitle(post.frontmatter)}>
            <Blog.Body>
              <Blog.Header>
                <Blog.Heading>{post.frontmatter.title}</Blog.Heading>
              </Blog.Header>
              <Blog.Meta
                thumb={image.thumb}
                categories={post.frontmatter.category}
                tags={post.frontmatter.tag}
                linkRoot="code"
              />
              <Blog.Content
                render={() => <ContentArea>{content}</ContentArea>}
              />
              <Blog.CallToAction content={html} button={button} link={link} />
              <Blog.Author />
            </Blog.Body>
          </Blog.Layout>
        )}
      />
    </React.Fragment>
  );
};
