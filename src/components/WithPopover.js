import React, { useState } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Popover from './Popover';

const getPopoverImage = (group, images) =>
  images.find(({ node }) => node.name.match(group.toLowerCase())).node;

const WithPopover = ({ render, heading, benefits, button, group, source }) => {
  const [showPopover, setShowPopover] = useState(false);

  const openPopover = () => setShowPopover(true);
  const closePopover = () => setShowPopover(false);

  const handleClick = (event) => {
    if (event.target.classList.contains('js--open-popover')) {
      event.preventDefault();
      setShowPopover(true);
    }
  };

  return [
    <div key="popover-content" onClick={handleClick}>
      {render(openPopover, closePopover)}
    </div>,
    <StaticQuery
      key="withpopover-popover"
      query={graphql`
        {
          allFile(filter: { relativePath: { regex: "/images/popover/" } }) {
            edges {
              node {
                name
                childImageSharp {
                  fluid(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <Popover
          visible={showPopover}
          closeFn={closePopover}
          heading={heading}
          image={getPopoverImage(group, data.allFile.edges)}
          benefits={benefits}
          button={button}
          group={group}
          source={source}
        />
      )}
    />,
  ];
};

export default WithPopover;
