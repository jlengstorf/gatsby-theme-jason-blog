/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Iframe = ({ width, height, src, title, ...props }) => (
  <div
    className="gatsby-resp-iframe-wrapper"
    css={css`
      height: 0;
      overflow: hidden;
      padding-bottom: ${(height / width) * 100}%;
      position: relative;
      width: 100%;
    `}
  >
    <iframe
      css={css`
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      `}
      src={src}
      title={title}
      {...props}
    />
  </div>
);

export default Iframe;
