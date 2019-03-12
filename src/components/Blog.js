import styled from '@emotion/styled';
import MainLayout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import FloatingHead from '../components/FloatingHead';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import CTA from '../components/CTA';
import { media } from '../tokens';

export const Layout = styled(MainLayout)`
  margin: 5rem auto 6rem;

  @media ${media.medium} {
    max-width: 100%;
    width: 57ch;
  }

  @media ${media.large} {
    @supports (display: grid) {
      width: calc(160px + 2rem + 57ch);
    }
  }
`;

export const Body = styled('article')`
  margin-bottom: 5rem;

  @media ${media.large} {
    @supports (display: grid) {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: 2rem;
      grid-template: repeat(2, auto) / 170px 1fr;
    }
  }
`;

export const Header = styled('header')`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

export const Content = styled(ContentWithFootnotes)`
  max-width: 90vw;
  width: 56ch;

  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

export const CallToAction = styled(CTA)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

export const Meta = styled(PostMeta)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 1;
      grid-row-start: 2;
    }
  }
`;

export const Author = styled(FloatingHead)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 1;
      grid-row-start: 3;
      margin-top: 2rem;
    }
  }
`;

export const Heading = styled('h1')`
  font-size: 1.6rem;

  @media ${media.medium} {
    font-size: 1.875rem;
  }
`;

export default {
  Layout,
  Body,
  Header,
  Content,
  CallToAction,
  Meta,
  Author,
  Heading,
};
