import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import CelshadingDemo from '../components/CelshadingDemo';

const CelShading = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Overview">
      <p>
        In this article, we're going to demo the differences between several different cel-shading and edge coloring algorithms.
      </p>
      <p>
        Cel shading (also known as toon shading) is a non-photorealistic rendering technique 
        that makes 3D graphics appear flat and cartoon-like. Combined with edge detection and 
        outline rendering, it can create striking visual styles reminiscent of hand-drawn animation 
        or comic books.
      </p>
      <p>
        We'll explore various approaches including:
      </p>
      <ul>
        <li>Classic quantized diffuse shading</li>
        <li>Sobel-based edge detection</li>
        <li>Normal-based edge detection</li>
        <li>Depth-based edge detection</li>
        <li>Fresnel rim lighting effects</li>
      </ul>
    </Section>
    <Section id="demo" name="Demo">
      <CelshadingDemo width={400} height={400} />
    </Section>
    <Section id="sources" name="Sources">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>;


// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <CelShading />
  </React.StrictMode>,
);

