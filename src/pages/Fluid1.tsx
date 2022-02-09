import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import AsideCard from '../components/AsideCard';

import WebGL2SetupDemo from '../components/WebGL2SetupDemo';
import WebGL2HeatEqnDemo from '../components/WebGL2HeatEqnDemo';
import WebGL2FluidAdvectionDemo from '../components/WebGL2FluidAdvectionDemo';
import WebGL2IncompressibleFluidDemo from '../components/WebGL2IncompressibleFluidDemo';

const Fluid1 = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Overview">
      <p>
        Our goals are to:
      </p>
      <ul>
        <li>demonstrate how use WebGL2 to accelerate computations.</li>
        <li>learn how to use the Navier-Stokes equations to simulate fluids.</li>
        <li>provide working code to simulate 2D incompressible flow.</li>
      </ul>
    </Section>
    <Section id="webgl-intro" name="WebGL Intro">
      <h4>What is WebGL2?</h4>
      <p>
        WebGL is a GPU accelerated graphics API for the web.
        It's more or less based on OpenGL, so if you're familiar with that, you should find it pretty similar.
        For now, it's the only way to interface with the GPU on the web.
        Sometime in the relatively near future we'll hopefully be seeing <a href="https://webgpu.rocks/">WebGPU</a> as well.
      </p>
      <p>
        WebGL2 is the newer version of WebGL.
        The original WebGL was based on OpenGL ES 2.0, but WebGL2 is based on OpenGL ES 3.0.
        WebGL2 adds a ton of new features, and it's now supported by nearly all modern devices, so there's really no reason not to use it.
      </p>
      <p>
        In this article, we'll be assuming at least a passing familiarity with WebGL.
        You should be familiar with:
      </p>
      <ul>
       <li></li>
       <li></li>
       <li></li>
      </ul>
    </Section>
    <Section id="webgl2-setup" name="Setting up WebGL2">
      <p>
        First, we'll need to set up WebGL2.
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2SetupDemo
          className="mx-auto"
          style={{display: "block"}}
          width={400}
          height={400}
        />
      </AsideCard>
    </Section>
    <Section id="webgl2-heat" name="Heat Equation with WebGL2">
      <p>
        Now, we'll approach the heat equation
      </p>
      <AsideCard title="Heat Equation" id="heat-equation-demo">
        <WebGL2HeatEqnDemo 
          className="mx-auto"
          style={{maxWidth: "40em"}}
          size={400}
        />
      </AsideCard>
    </Section>

    <Section id="webgl2-advection" name="Fluid Advection with WebGL2">
      <p>
        Now, we'll approach the heat equation
      </p>
      <AsideCard title="Fluid Advection" id="fluid-advection-demo">
        <WebGL2FluidAdvectionDemo
          className="mx-auto"
          style={{maxWidth: "40em"}}
          size={400}
        />
      </AsideCard>
    </Section>

    <Section id="webgl2-incompressible" name="Incompressible Fluid with WebGL2">
      <p>
        Now, we'll approach the heat equation
      </p>
      <AsideCard title="Fluid Advection" id="fluid-advection-demo">
        <WebGL2IncompressibleFluidDemo 
          className="mx-auto"
          style={{maxWidth: "40em"}}
          size={400}
        />
      </AsideCard>
    </Section>


    <Section id="sources" name="Sources">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>

import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Fluid1 />
  </React.StrictMode>,
  document.getElementById('root')
);
