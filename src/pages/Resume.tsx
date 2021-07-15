import Layout from '../components/Layout';
import Section from '../components/Section';

import ResumePath from '../assets/govind_pimpale_resume.pdf';

const Resume = () =>
  <Layout>
    <div className="container mt-5">
      <Section id="resume" name="Resume">
        <iframe title="resume" src={ResumePath} style={{ width: "100%", aspectRatio: "0.9" }} />
      </Section>
    </div>
  </Layout>


export default Resume;
