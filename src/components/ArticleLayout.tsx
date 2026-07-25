import Layout from '../components/Layout';
import CitationManager from '../components/CitationManager';

// Tex
import 'katex/dist/katex.min.css';

export interface ArticleLayoutProps {
  style?: React.CSSProperties;
  children: React.ReactNode
}

const ArticleLayout = (props: ArticleLayoutProps) => <Layout>
  <div className="container-xxl mt-5" style={props.style}>
    <CitationManager prefix="source-">{props.children}</CitationManager>
  </div>
</Layout>

export default ArticleLayout
