import Layout from '../components/Layout';
import Section from '../components/Section';

function Achernar() {
  return <Layout>
    <Section id="motivation" name="Motivation">
      Todo...
    </Section>
  </Layout>
}



import React from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Achernar />
  </React.StrictMode>
);