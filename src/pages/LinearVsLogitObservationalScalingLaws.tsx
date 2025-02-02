import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import LasagnaLogo from "../assets/projects/lasagna.png";
import LasagnaFizzbuzzTxtUrl from "../assets/projects/lasagna_fizzbuzz.txt?url";

import outdent from 'outdent';

import { ArticleLink } from '../components/Articles';
import { articleData } from '../components/ArticleData';

const LinearVsLogitPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
   <Section id="overview" name="Overview">
      <p>
        Observational Scaling Laws <Citation source='https://arxiv.org/abs/2405.10938' />
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
    <LinearVsLogitPage />
  </React.StrictMode>,
);
