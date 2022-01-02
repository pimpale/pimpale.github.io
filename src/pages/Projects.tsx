import React from 'react';
import ReactDOM from 'react-dom';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import AsideCard from '../components/AsideCard';

import CompugenesisScreenshot from "../assets/projects/compugenesis_screenshot.png";
import CompugenesisFlowchart from "../assets/projects/compugenesis_flowchart.png";
import VulkanTriangleV2Screenshot from "../assets/projects/vulkan-triangle-v2_screenshot.png";

import COpenCLRaymarcherSierpinskiScreenshot from "../assets/projects/c-opencl-raymarcher_sierpinski.png";
import COpenCLRaymarcherWarp from "../assets/projects/c-opencl-raymarcher_warp.gif";

const ProjectsPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section name="Compugenesis" id="compugenesis">
      <p>
        Compugenesis is a Rust simulation that uses L-Systems to model plants efficiently and accurately.
      </p>
      <figure className="text-center my-3">
        <img src={CompugenesisScreenshot} className="border border-dark mx-auto d-block" alt="Demo of the Compugenesis system" />
      </figure>
      <h4>Goals:</h4>
      <ul>
        <li>Create a flexible plant simulation and paired microclimate implementation that uses the parallelization capabilities of a GPU.</li>
        <li>Use the L-System implementation to simulate plant topology within a 95% confidence interval (CI) for actual plant dimensions.</li>
        <li>Simulate plant topology in response to temperature, soil moisture, and sunlight.</li>
      </ul>
      <figure className="text-center my-3">
        <img src={CompugenesisFlowchart} className="border border-dark mx-auto d-block bg-dark" alt="Flowchart of Compugenesis" />
      </figure>
      <p className="mt-4">
        Link: <HrefLink href="https://github.com/pimpale/compugenesis" />
      </p>
    </Section>
    <Section name="Vulkan Voxel Renderer" id="vulkan-voxel-renderer">
      <p>
        This project is a simple voxel renderer made using Vulkan and C.
        It's a small demo example and not a full game,
        but it successfully demonstrates the basic principles of building texture atlases, chunk generation, and dynamic chunk loading without a game engine
      </p>
      <p>
        This project's code and assets are 100% public domain, and you can do whatever you like with them.
      </p>
      <figure className="text-center my-3">
        <img src={VulkanTriangleV2Screenshot} className="border border-dark mx-auto d-block w-75" alt="Demo of the game" />
      </figure>
      <h4>Features</h4>
      <ul>
        <li>Internal face culling</li>
        <li>Cubical chunks</li>
        <li>Chunks are dynamically loaded and unloaded</li>
        <li>Infinite terrain generation</li>
        <li>Textured blocks (using texture atlas)</li>
        <li>Proper camera movement</li>
      </ul>
      <h4>Goals</h4>
      <p>
        We will add these later at some point, but they're not present right now:
      </p>
      <ul>
        <li>Destroying blocks</li>
        <li>Adding blocks</li>
        <li>Being able to walk around without flying</li>
        <li>Entities</li>
        <li>Block picker</li>
        <li>Lighting</li>
      </ul>
      <p className="mt-4">
        Link: <HrefLink href="https://github.com/pimpale/vulkan-triangle-v2" />
      </p>
    </Section>
    <Section name="C OpenCL Raymarcher" id="c-opencl-raymarcher">
      <figure className="text-center my-3">
        <img src={COpenCLRaymarcherSierpinskiScreenshot} className="border border-dark mx-auto d-block" alt="3D Sierpinski triangle produced by raymarcher" />
      </figure>
      <figure className="text-center my-3">
        <img src={COpenCLRaymarcherWarp} className="border border-dark mx-auto d-block" alt="Black hole rendered by raymarcher" />
      </figure>

    </Section>
  </>
}</ArticleLayout>

ReactDOM.render(
  <React.StrictMode>
    <ProjectsPage />
  </React.StrictMode>,
  document.getElementById('root')
);
