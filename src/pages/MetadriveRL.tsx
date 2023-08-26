import Layout from '../components/Layout';
import Section from '../components/Section';

const PolicyGradientDerivationUrl = "./assets/metadrive_rl/policygradient.html";
const PolicyGradientDiscreteSolutionUrl = "./assets/metadrive_rl/policygradient_discrete_solution.html";
const PolicyGradientContinuousSolutionUrl = "./assets/metadrive_rl/policygradient_continuous_solution.html";

const DQNDerivationUrl = "./assets/metadrive_rl/policygradient.html";
const DQNSolutionUrl = "./assets/metadrive_rl/policygradient_discrete_solution.html";

const PPODerivationUrl = "./assets/metadrive_rl/ppo.html";
const PPOSolutionUrl = "./assets/metadrive_rl/ppo_solution.html";

const MetadriveRL = () =>
  <ArticleLayout>{({ Citation, CitationBank }) =>
    <>
      <Section id="tutorials" name="Tutorials">
        These tutorials attempt to explain Source: <a href="https://github.com/wz-ml/metadrive-tutorial"></a>
        <ol>
          <li>
            <a href={PolicyGradientDerivationUrl}>Policy Gradient Derivation</a>
            <ul>
              <li><a href={PolicyGradientDiscreteSolutionUrl}>Discrete Policy Gradient Solution</a></li>
              <li><a href={PolicyGradientContinuousSolutionUrl}>Continuous Policy Gradient Solution</a></li>
            </ul>
          </li>
          <li>
            <a href={DQNDerivationUrl}>DQN Derivation</a>
            <ul>
              <li><a href={DQNSolutionUrl}>DQN Solution</a></li>
            </ul>
          </li>
          <li>
            <a href={PPODerivationUrl}>PPO Derivation</a>
            <ul>
              <li><a href={PPOSolutionUrl}> Solution</a></li>
            </ul>
          </li>
        </ol>
      </Section>
    </>
  }</ArticleLayout>


import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import ArticleLayout from '../components/ArticleLayout';

ReactDOM.render(
  <React.StrictMode>
    <MetadriveRL />
  </React.StrictMode>,
  document.getElementById('root')
);
