import React from 'react';

import Section from '../components/Section';
import ArticleLayout from '../components/ArticleLayout';

const NeutrinoSubmarinesPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Can Neutrinos Reveal The Positions of Nuclear Submarines?">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Section>
    <Section id="references" name="References">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <NeutrinoSubmarinesPage />
  </React.StrictMode>,
);
