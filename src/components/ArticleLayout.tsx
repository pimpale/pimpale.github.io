import Layout from '../components/Layout';
import CitationManager, { CitationComponents } from '../components/CitationManager';

// Tex
import 'katex/dist/katex.min.css';

export interface ArticleLayoutProps {
  style?: React.CSSProperties;
  children: (c: CitationComponents) => React.ReactElement
}

const ArticleLayout = (props: ArticleLayoutProps) => <Layout>
  <div className="container-xxl mt-5" style={props.style}>
    <CitationManager prefix="source-">{
      c => props.children(c)
    }</CitationManager>
  </div>
</Layout>

export default ArticleLayout
