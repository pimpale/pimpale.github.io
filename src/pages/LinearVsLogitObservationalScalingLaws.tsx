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
        Observational Scaling Laws's uses PCA over the table of benchmark scores to find the vectors that explain as much of the variance of the benchmark scores as possible.
      </p>
      <p>
        However, this approach has a limitation: it doesn't work when some benchmarks are saturated, while others maintain predictive power. Note that saturation can be either at the ceiling, from the model being too good, or at the floor, from the model being too bad.
        Scenarios like this can occur when you test models that have a wide range of capabilities on both easy benchmarks (like SQUAD) and difficult benchmarks (like SWE-Bench Verified<Citation source="https://openai.com/index/introducing-swe-bench-verified/" />) at the same time.
      </p>
      <p>
        While writing a paper, I thought of two potential fixes for this problem:
      </p>
      <ol>
        <li>Measuring the model capability in logit space</li>
        <li>Normalizing the benchmarks before doing PCA</li>
      </ol>
      <p>
        These are probably not original ideas, but it still seems valuable to try them and publicly report whether they work.
      </p>
      <p>
        I first check that these approaches improve performance on a synthetic dataset (they do) and then check that they improve performance on a real world dataset (unclear).
      </p>
      <h4>TLDR</h4>
      <p>
        TODO
      </p>
    </Section>
    <Section id="introduction" name="Introduction">
      <p>
        Observational Scaling Laws and the Predictability of Language Model Performance<Citation source='https://arxiv.org/abs/2405.10938' /> (henceforth abbreviated as OSL) is a paper that attempts to condense a set of benchmarks into a few numbers that are very predictive of its score on the greater set of benchmarks. For example, these numbers might represent something like "general intelligence", "coding ability", and "math ability" respectively. So, a model with low general intelligence might still do well on coding and math benchmarks, if it had a high coding and math ability.
      </p>
      <p>
        However, there are diminishing returns to adding more numbers to describe the performance of the model. In this work, we focus on just the first number, which is the most predictive of the benchmark scores. OSL finds that just the first number predicts 80% of the variance in the benchmark scores.
      </p>
      <p>
        This is useful because it allows us to quantify model capabilities in a more accurate way. Prior to this, many people (Owen<Citation source='https://arxiv.org/abs/2401.04757' />, Finnveden<Citation source="https://www.alignmentforum.org/posts/k2SNji3jXaLGhBeYP/extrapolating-gpt-n-performance" />) used pretraining log-FLOP as a rough proxy of capability. This is somewhat well justified, since the Chinchilla scaling laws (Hoffman et al.)<Citation source="https://arxiv.org/abs/2203.15556" /> describe what the loss should be after a given pre-training budget. However, FLOP count is not the only thing that matters. Different model families have different levels of efficiency in converting FLOP to performance (i.e, different constants in the Hoffman loss equation). Additionally, how a model is post-trained also makes a huge difference when it comes to performance on benchmarks.
      </p>
      <p>
        On the other hand, using OSL's 
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
