import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import { Async } from 'react-async';
import { fetchText } from '../utils/load';

import Tex from '@matejmazur/react-katex';

import AsideCard from '../components/AsideCard';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


import WebGL2SetupDemo from '../components/WebGL2SetupDemo';
import WebGL2HeatEqnDemo from '../components/WebGL2HeatEqnDemo';
import WebGL2FluidAdvectionDemo from '../components/WebGL2FluidAdvectionDemo';
import WebGL2IncompressibleFluidDemo from '../components/WebGL2IncompressibleFluidDemo';

import WebGL2SetupDemoTsxUrl from "../assets/fluid1/WebGL2SetupDemo_tsx.txt?url";

import WebGL2HeatEqnDemo_BufferVars_TsxUrl from "../assets/fluid1/WebGL2HeatEqnDemo_BufferVars_tsx.txt?url";
import WebGL2HeatEqnDemo_BufferSetup_TsxUrl from "../assets/fluid1/WebGL2HeatEqnDemo_BufferSetup_tsx.txt?url";
import WebGL2HeatEqnDemo_Simulate_TsxUrl from "../assets/fluid1/WebGL2HeatEqnDemo_Simulate_tsx.txt?url";
import WebGL2HeatEqnDemo_FragmentShader_TsxUrl from "../assets/fluid1/WebGL2HeatEqnDemo_FragmentShader_tsx.txt?url";
import WebGL2HeatEqnDemo_RenderFragmentShader_TsxUrl from "../assets/fluid1/WebGL2HeatEqnDemo_RenderFragmentShader_tsx.txt?url";

type CodeBlockProps = {
  url: string,
  lang: string
}

function CodeBlock(props: CodeBlockProps) {
  return <Async promise={fetchText(props.url)}>
    <Async.Pending>
      <div className="spinner-border" role="status" />
    </Async.Pending>
    <Async.Fulfilled<string>>{code =>
      <SyntaxHighligher
        className="mx-5 mb-5"
        language={props.lang}
        showLineNumbers
        style={a11yDark}
        children={code}
      />
    }</Async.Fulfilled>
    <Async.Rejected>
      {/* TODO: put error here */}
      <div className="spinner-border" role="status" />
    </Async.Rejected>
  </Async>
}

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
    <Section id="webgl2-setup" name="Working with WebGL2">
      <h4>Why GPU?</h4>
      <p>
        Fluid simulations can be parallelized, which means that the work can be split up into chunks that run independently.
        Your CPU (if you're running on a reasonably normal computer) probably has 4-32 threads.
        So, we could theoretically speed up the simulation 32x by taking advantage of multi-threading (although in practice it might not be so high).
        However, your GPU has the capability to run far more threads simultaneously.
        Depending on exactly which card you have, you can have a couple thousand threads concurrently running.
        <Citation source="https://stackoverflow.com/questions/6490572/cuda-how-many-concurrent-threads-in-total" />.
      </p>
      <p>
        There are downsides to running on the GPU however.
        First of all, the GPU is limited in what it can do.
        Secondly, GPU code is deployed in a batch manner, where the same code is given to all cores of the GPU.
        And finally, you can't use system calls in GPU code.
        So things like reading from a file or making a network request are not allowed.
      </p>
      <p>
        Although there are caveats, the GPU is still the best choice for simple fluid simulations like this one.
        So, let's get started.
      </p>
      <h4>WebGL Setup</h4>
      <p>
        WebGL2 was primary designed as a graphics api, and not really so much as a general purpose GPU compute API.
        As such, we will have to make use of a few workarounds in order to be able to do what we want.
      </p>
      <p>
        Let's first look at setting up a canvas:
      </p>

      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <p>
          Code:
        </p>
        <CodeBlock lang="tsx" url={WebGL2SetupDemoTsxUrl} />
        <p>
          Result:
        </p>
        <WebGL2SetupDemo
          className="mx-auto mb-5"
          style={{ display: "block" }}
          size={400}
        />
      </AsideCard>
      <p>
        The code is mostly boilerplate associated with setting up WebGL.
        It draws two triangles, forming a suqare covering the entire clip space.
        If any of it is confusing, I reccomend reading some of the WebGL resources linked above.
      </p>
    </Section>
    <Section id="webgl2-heat" name="Heat Equation with WebGL2">
      <p>
        Now, we'll approach the heat equation, since it's a good starting point for dealing with interactive simulations.
      </p>
      <p>
        Here's the scenario:
        Imagine you have a uniform square metal plate.
        You're able to focus a hot blowtorch on some parts of the plate, and chill other parts with liquid nitrogen.
        What is the temperature of a given point on the plate?
      </p>
      <p>
        It turns out that it's pretty easy to simulate.
        We'll split our metal plate into a <Tex math="N" /> by <Tex math="N" /> square grid.
        At each timestep, for each cell, we set it to the average of its neighbors.
        If you want to know why this works,
        you can check out this link: <HrefLink href="https://mattferraro.dev/posts/poissons-equation" />.
      </p>
      <h4>Implementation</h4>
      <p>
        To implement it, we'll have to make several changes to our old boilerplate code.
      </p>
      <ul>
        <li>Adding a mutable heat buffer on the GPU.</li>
        <li>Adding a program that computes the next state of the heat.</li>
        <li>Adding a way to render the heat data.</li>
        <li>Adding a way to edit the control buffer that determines which parts are being pinned.</li>
      </ul>
      <h5>Adding a mutable heat buffer on the GPU.</h5>
      <p>
        Adding mutable data on the GPU is quite tricky.
        Since WebGL was primarily defined as a graphics rendering API,
        not a general purpose compute system,
        we'll have to abuse some rendering features to get what we want.
      </p>
      <p>
        The basic plan is to store our heat data in a texture.
        Since textures are more or less 2D arrays, this works great for our purposes.
        However, WebGL doesn't let us mutate a texture during shader execution.
      </p>
      <p>
        So, in order to simulate one timestep
        we can render a <Tex math="N" /> by <Tex math="N" /> image,
        which will run a fragment shader for each pixel in the output.
        In the fragment shader, we'll do the work of computing the average of the neighboring pixels.
        We can take the output of that rendering, and stick it into a framebuffer.
      </p>
      <p>
        In the next timestep, we'll use the texture data stored in the framebuffer as the heat data.
        We'll render to the framebuffer linked to the original place we stored our heat data.
      </p>
      <p>
        In this way, we'll "ping-pong" between the two textures.
      </p>
      <AsideCard title="HeatEqn Texture/Framebuffer Setup">
        <p>
          Defining Texture/Framebuffer pair:
        </p>
        <CodeBlock lang="tsx" url={WebGL2HeatEqnDemo_BufferVars_TsxUrl} />
        <p>
          Initializing Texture/Framebuffer pair:
        </p>
        <CodeBlock lang="tsx" url={WebGL2HeatEqnDemo_BufferSetup_TsxUrl} />
        <p>
          Running the simulation:
        </p>
        <CodeBlock lang="tsx" url={WebGL2HeatEqnDemo_Simulate_TsxUrl} />
      </AsideCard>
      <h5>Adding a program that computes the next state of the heat</h5>
      <p>
        Now that we've set up our two framebuffer-texture pairs,
        we can write the code to read from one and write to the other.
      </p>
      <p>
        The vertex shader can be reused as is from the WebGL setup code.
        All the actual work of simulation happens in the fragment shader.
      </p>
      <AsideCard title="HeatEqn Heat Fragment Shader">
        <CodeBlock lang="tsx" url={WebGL2HeatEqnDemo_FragmentShader_TsxUrl} />
      </AsideCard>
      <h5>Adding a way to render the heat data</h5>
      <p>
        We can write another fragment shader to handle rendering the heat data to the canvas.
      </p>
      <p>
        In order to make it look good, we use the inferno colorscheme,
        using code from here: <HrefLink href="https://www.shadertoy.com/view/WlfXRN" />.
      </p>
      <AsideCard title="HeatEqn Render Fragment Shader">
        <CodeBlock lang="tsx" url={WebGL2HeatEqnDemo_RenderFragmentShader_TsxUrl} />
      </AsideCard>
      <AsideCard title="Heat Equation" id="heat-equation-demo">
        <WebGL2HeatEqnDemo
          className="mx-auto"
          style={{ maxWidth: "40em" }}
          size={400}
        />
      </AsideCard>
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
      </p>
      <ul>
        <li>
          Lowercase letters and greek letters for scalars.
          <br />
          Examples:
          <ul>
            <li><Tex math="a = 5" /></li>
            <li><Tex math="y = x^2 + 1" /></li>
          </ul>
        </li>
        <li>
          Lowercase letters and greek letters with an arrow on top for vectors.
          <br />
          Examples:
          <ul>
            <li><Tex math="\vec v = \begin{bmatrix} 1 \\ -2 \end{bmatrix}" /></li>
            <li><Tex math="\vec f = \nabla (x^2 + y^2)" /></li>
          </ul>
        </li>
      </ul>
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
          -\frac {1} {\rho} \nabla{p} \\
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
          xsize={400}
          ysize={800}
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
