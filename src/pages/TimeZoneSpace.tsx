import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import WebGL2GravityDemo from '../components/WebGL2GravityDemo';
import LennardJonesDemo from '../components/LennardJonesDemo';

const TimeZoneSpacePage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section name="Overview" id="overview">
      <p>
        <HrefLink href="https://github.com/pimpale/spacewar" />
      </p>
      <p>
        <HrefLink href="https://github.com/pimpale/GravitySimulator" />
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2GravityDemo
          className="mx-auto"
          style={{ maxWidth: "50em" }}
          size={512}
        />
      </AsideCard>
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
    <TimeZoneSpacePage />
  </React.StrictMode>,
);
