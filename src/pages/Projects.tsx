import React from 'react';
import ReactDOM from 'react-dom';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import AsideCard from '../components/AsideCard';

import { Async } from 'react-async';
import { fetchText } from '../utils/load';
import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import TorusWeatherScreenshot from "../assets/projects/torus_weather_screenshot.png";

const TorusWeatherDemo1Url = "../demo_fluid_torus_1.html";
const TorusWeatherDemo2Url = "../demo_fluid_torus_2.html";
const TorusWeatherArticleUrl = '../terraingeneration2.html';

import CompugenesisScreenshot from "../assets/projects/compugenesis_screenshot.png";
import CompugenesisFlowchart from "../assets/projects/compugenesis_flowchart.png";
import VulkanTriangleV2Screenshot from "../assets/projects/vulkan-triangle-v2_screenshot.png";

import COpenCLRaymarcherSierpinskiScreenshot from "../assets/projects/c-opencl-raymarcher_sierpinski.png";
import COpenCLRaymarcherWarp from "../assets/projects/c-opencl-raymarcher_warp.gif";
import LasagnaLogo from "../assets/projects/lasagna.png";
import LasagnaFizzbuzzTxtUrl from "../assets/projects/lasagna_fizzbuzz.txt?url";


type ProjectProps = {
  id: string,
  title: string,
  blurb: string,
  begindate: string,
  enddate?: string,
  links: { key: string, url: string }[],
  images: { src: string, alt: string }[],
}

const Project = (props: ProjectProps) => <>
  {
    props.images === undefined ? false :
      <Carousel images={props.images} />
  }
  <Section id={props.id} name={props.title}>
    <p>{props.blurb}</p>
    <p>{props.begindate}</p>


    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {props.images.map(({ src, alt }) =>
          <div className="carousel-item active">
            <img src={src} className="d-block w-100" alt={alt} />
          </div>
        )}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>


  </Section>
</>

const ProjectsPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>

    <Section name="Torus Weather Simulation" id="torus-weather-sim">
      <p>
        A naive simulation of weather on a torus shaped planet.
      </p>
      <p className="mt-4">
        Demo 1: <HrefLink href={TorusWeatherDemo1Url} />
        <br />
        Demo 2: <HrefLink href={TorusWeatherDemo2Url} />
        <br />
        Article: <HrefLink href={TorusWeatherArticleUrl} />
      </p>
      <p>Screenshot:</p>
      <figure className="text-center my-3">
        <img src={TorusWeatherScreenshot} style={{ height: "30em" }} className="border border-dark mx-auto d-block" alt="Demo of the Torus Weather System" />
      </figure>
    </Section>


    <Section name="Torus Weather Simulation" id="torus-weather-sim">
      <p>
        A naive simulation of weather on a torus shaped planet.
      </p>
      <p className="mt-4">
        Demo 1: <HrefLink href={TorusWeatherDemo1Url} />
        <br />
        Demo 2: <HrefLink href={TorusWeatherDemo2Url} />
        <br />
        Article: <HrefLink href={TorusWeatherArticleUrl} />
      </p>
      <p>Screenshot:</p>
      <figure className="text-center my-3">
        <img src={TorusWeatherScreenshot} style={{ height: "30em" }} className="border border-dark mx-auto d-block" alt="Demo of the Torus Weather System" />
      </figure>
    </Section>
    <Section name="Compugenesis" id="compugenesis">
      <p>
        Compugenesis is a Rust simulation that uses L-Systems to model plants efficiently and accurately.
      </p>
      <h5>Goals:</h5>
      <ul>
        <li>Create a flexible plant simulation and paired microclimate implementation that uses the parallelization capabilities of a GPU.</li>
        <li>Use the L-System implementation to simulate plant topology within a 95% confidence interval (CI) for actual plant dimensions.</li>
        <li>Simulate plant topology in response to temperature, soil moisture, and sunlight.</li>
      </ul>
    </Section>
    <p className="mt-4">
      Source code: <HrefLink href="https://github.com/pimpale/compugenesis" />
    </p>
    <p>Screenshot:</p>
    <figure className="text-center my-3">
      <img src={CompugenesisScreenshot} className="border border-dark mx-auto d-block" alt="Demo of the Compugenesis system" />
    </figure>
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
      <p>
        A simple raymarcher written in C with OpenCL acceleration.
      </p>
      <p>
        Below are some screenshots:
      </p>
      <figure className="text-center my-3">
        <img src={COpenCLRaymarcherSierpinskiScreenshot} className="border border-dark mx-auto d-block w-50" alt="3D Sierpinski triangle produced by raymarcher" />
        <figcaption>3D Sierpinski Triangle</figcaption>
      </figure>
      <figure className="text-center my-3">
        <img src={COpenCLRaymarcherWarp} className="border border-dark mx-auto d-block w-50" alt="Black hole rendered by raymarcher" />
        <figcaption>Black hole rendered by raymarcher</figcaption>
      </figure>
      <p className="mt-4">
        Link: <HrefLink href="https://github.com/pimpale/c-opencl-raymarcher" />
      </p>
    </Section>
    <Section name="Lasagna" id="lasagna">
      <figure className="text-center my-3">
        <img src={LasagnaLogo} className="border border-dark mx-auto d-block w-25" alt="Lasagna Logo" />
      </figure>
      <p>
        Very small stack based language. Influenced by Lisp and Forth.
      </p>
      <h4 className="mb-3">Hello World</h4>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>
        (hello world) print
      </SyntaxHighligher>
      <h4 className="mb-3">Fizzbuzz</h4>
      <Async promise={fetchText(LasagnaFizzbuzzTxtUrl)}>
        <Async.Pending>
          <div className="spinner-border" role="status" />
        </Async.Pending>
        <Async.Fulfilled<string>>{code =>
          <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{code}</SyntaxHighligher>
        }</Async.Fulfilled>
        <Async.Rejected>
          {/* TODO: put error here */}
          <div className="spinner-border" role="status" />
        </Async.Rejected>
      </Async>
      <p className="mt-4">
        Link: <HrefLink href="https://github.com/pimpale/lasagna" />
      </p>
    </Section>
  </>
}</ArticleLayout >

ReactDOM.render(
  <React.StrictMode>
    <ProjectsPage />
  </React.StrictMode>,
  document.getElementById('root')
);
