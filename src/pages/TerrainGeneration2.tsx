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

import {createRoot} from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <TerrainGeneration/>
  </React.StrictMode>
);
