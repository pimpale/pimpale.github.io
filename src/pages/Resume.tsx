import Layout from '../components/Layout';
import Section from '../components/Section';

import ResumePath from '../assets/govind_pimpale_resume.pdf?url';

const Resume = () =>
  <Layout>
    <div className="container mt-5">
      <Section id="resume" name="Resume">
        <iframe title="resume" src={ResumePath} style={{ width: "100%", aspectRatio: "0.9" }} />
      </Section>
    </div>
  </Layout>


import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Resume/>
  </React.StrictMode>,
  document.getElementById('root')
);
