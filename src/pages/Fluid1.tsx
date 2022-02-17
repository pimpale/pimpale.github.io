import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import Tex from '@matejmazur/react-katex';

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
        <li>how the graphics pipeline works</li>
        <li>what vertex shaders do</li>
        <li>what fragment shaders do</li>
        <li>what a uniform is</li>
      </ul>
      <p>
        If you need a refresher, the following articles are a pretty good source:
      </p>
      <ul>
        <li><HrefLink href="https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html" /></li>
        <li><HrefLink href="https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html" /></li>
      </ul>
      <p>
        And here's a link to a WebGL API reference.
      </p>
      <ul>
        <li><HrefLink href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" /></li>
      </ul>
    </Section>
    <Section id="math-fluid-simulation" name="Math of Fluid Simulation">
      <h4>Prerequisites</h4>
      <p>
        This section makes heavy use of multivariable calculus, matrix multiplication, and systems of equations.
        so if you're not familiar or need a refresher, I recommend checking out these topics:
      </p>
      <ul>
        <li>
          Vector Multiplication and Matrix Multiplication
          <ul>
            <li><HrefLink href="https://www.mathsisfun.com/algebra/matrix-multiplying.html" /></li>
            <li><HrefLink href="https://mathinsight.org/matrix_vector_multiplication" /></li>
          </ul>
        </li>
        <li>
          Vector and Scalar Fields
          <ul>
            <li><HrefLink href="https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/multivariable-functions" /></li>
            <li><HrefLink href="https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/vector-fields" /></li>
          </ul>
        </li>
        <li>
          Partial Derivatives
          <ul>
            <li><HrefLink href="https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives" /></li>
          </ul>
        </li>
        <li>
          The Gradient of Scalar Fields
          <ul>
            <li><HrefLink href="https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives" /></li>
          </ul>
        </li>
        <li>
          Divergence of a Vector Field
          <ul>
            <li><HrefLink href="https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/divergence-and-curl-articles/a/divergence" /></li>
          </ul>
        </li>
      </ul>
      <h4>Notation</h4>
      <p>
        In this article, we'll use the following notation, which is consistent with that used by Khan Academy:
        <ul>
          <li>
            Lowercase letters and greek letters for scalars.
            <br />
            Examples:
            <ul>
              <li><Tex math="a = 5"/></li>
              <li><Tex math="y = x^2 + 1"/></li>
            </ul>
          </li>
          <li>
            Lowercase letters and greek letters with an arrow on top for vectors.
            <br />
            Examples:
            <ul>
              <li><Tex math="\vec v = \begin{bmatrix} 1 \\ -2 \end{bmatrix}"/></li>
              <li><Tex math="\vec f = \nabla (x^2 + y^2)"/></li>
            </ul>
          </li>
        </ul>
      </p>
      <h4>Navier Stokes</h4>
      <p>
        Fluids are complicated.
        If we wanted to make our simulation perfectly accurate, we would have to simulate at the molecular level,
        directly handling the elastic collisions of molecules against each other.
      </p>
      <p>
        Indeed, this intricate level of simulation is often done when dealing with high temperature plasmas.
        However, there are quite a few downsides to this.
        First of all, it's really slow.
        You'd never be able to do this on real time on consumer hardware.
        And second of all, it's very complicated.
        We want code that's easy to write and understand, even if you've never had experience in fluid simulation.
      </p>
      <p>
        The good news is that it's not necessary to go to such lengths to have a fairly realistic fluid simulation.
        Doing so would be complete overkill for most cases, which never see such extreme conditions.
        So, we'll make a few choice simplifications to make our simulation both fast and easy to understand:
      </p>
      <ol>
        <li>
          We'll assume our fluid is a continuuum
          <Citation source="https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations#Basic_assumptions" />
          .
          <ul>
            <li>
              This means that the fluid is a continous substance,
              and that we can find the derivatives of fluid properties like pressure and velocity.
            </li>
            <li>
              Since all matter is made out of atoms, this isn't actually true,
              but the effects of this are negligible on the macroscopic scale.
            </li>
          </ul>
        </li>
        <li>
          We'll assume our fluid is incompressible.
          <ul>
            <li>
              In reality of course, no fluid is perfectly incompressible, but it's a close enough approximation.
              For example, water is nearly aways incompressible.
              Even for air, we only really need to start worrying about compressibility when the flow approaches Mach 0.3
              <Citation source="https://en.wikipedia.org/wiki/Compressible_flow" />
              .
            </li>
          </ul>
        </li>
        <li>
          We'll assume our fluid has no friction.
          <ul>
            <li>
              This one is probably the most egregious simplification,
              but as we'll see, inaccuracies in our simulation give us friction "for free" anyway.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        When we take these assumptions and combine them with the rules of conservation of mass, and the conservation of momentum,
        we get the incompressible Navier Stokes equations:
      </p>
      <Tex block >{String.raw`
        \begin{gather}
          \frac {\partial \vec{u}} {\partial t} =
          -(\vec{u} \cdot \nabla)\vec{u}
          -\frac {1} {\rho} \nabla{p}

          \\

          \nabla \cdot \vec{u} = 0
        \end{gather}
      `}</Tex>
      Where:
      <ul>
        <li><Tex math="\vec u" /> is the velocity vector field</li>
        <li><Tex math="p" /> is the pressure scalar field</li>
        <li><Tex math="\rho" /> is the density of the fluid</li>
        <li><Tex math="t" /> is time</li>
      </ul>

    </Section>

    <Section id="webgl2-setup" name="Working with WebGL2">
      <p>
        Simulating fluids is what's known as an embarrassingly parallel problem
        <Citation source="https://en.wikipedia.org/wiki/Embarrassingly_parallel" />.
        This means that each part of the pro
      </p>
      <p>
        WebGL2 was primary designed as a graphics api, and not really so much as a general purpose GPU compute API.
        As such, we will have to work
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2SetupDemo
          className="mx-auto"
          style={{ display: "block" }}
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
          style={{ maxWidth: "40em" }}
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
          style={{ maxWidth: "40em" }}
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
          style={{ maxWidth: "40em" }}
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
