import React from 'react';
import { createRoot } from 'react-dom/client';
import type { MDXComponents, MDXContent } from 'mdx/types';

import Tex from '@matejmazur/react-katex';

import ArticleLayout from './ArticleLayout';
import Section from './Section';
import Figure from './Figure';
import AsideCard from './AsideCard';
import { Citation, CitationBank } from './CitationManager';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

/**
 * Components available to every .mdx article. The capitalized ones can be used
 * in markdown without importing them; the lowercase ones override the plain
 * HTML that markdown produces.
 */
export const articleComponents: MDXComponents = {
  // `Section` is injected by the remark-sectionize plugin, the rest are for
  // authors to use directly.
  Section,
  Figure,
  AsideCard,
  Citation,
  CitationBank,
  Tex,
  table: props => <div className="table-responsive"><table className="table" {...props} /></div>,
  img: props => <img className="img-fluid" {...props} />,
};

export interface MdxArticleProps {
  content: MDXContent,
  style?: React.CSSProperties,
}

export const MdxArticle = (props: MdxArticleProps) => {
  const Content = props.content;
  return <ArticleLayout style={props.style}>
    <Content components={articleComponents} />
  </ArticleLayout>
}

/** Mounts an .mdx article as a standalone page. */
export function mountMdxArticle(content: MDXContent, style?: React.CSSProperties) {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <MdxArticle content={content} style={style} />
    </React.StrictMode>,
  );
}

export default MdxArticle;
