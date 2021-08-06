import Layout from '../components/Layout';
import CitationManager, { CitationComponents } from '../components/CitationManager';
import MathJax from 'react-mathjax';

export interface ArticleLayoutProps {
  children: (c: CitationComponents) => React.ReactChild
}

const ArticleLayout = (props:ArticleLayoutProps) => <Layout>
  <div className="container mt-5">
    <CitationManager prefix="source-">{
      c => <MathJax.Provider>{props.children(c)}</MathJax.Provider>
    }</CitationManager>
  </div>
</Layout>

export default ArticleLayout
