import React from 'react';
import ReactDOM from 'react-dom';

import ArticleLayout from '../components/ArticleLayout';
import Articles from '../components/Articles';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const ArticlesPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <Articles/>
}</ArticleLayout>

ReactDOM.render(
  <React.StrictMode>
    <ArticlesPage />
  </React.StrictMode>,
  document.getElementById('root')
);
