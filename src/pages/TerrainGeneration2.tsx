import React from 'react';
import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/Section";

const TerrainGeneration = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Overview">
      <h4>Goals</h4>
      TBD
    </Section>
  </>
}</ArticleLayout>

import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import { colorScheme } from '../utils/colorscheme';
import chroma from 'chroma-js';

ReactDOM.render(
  <React.StrictMode>
    <TerrainGeneration />
  </React.StrictMode>,
  document.getElementById('root')
);
