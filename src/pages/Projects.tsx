import React from 'react';
import ReactDOM from 'react-dom';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import { Async } from 'react-async';
import { fetchText } from '../utils/load';
import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import format from 'date-fns/format'
import parse from 'date-fns/parse'

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

type ToggleableImageListProps = {
  children: React.ReactNode[],
}

const ToggleableImageList = (props: ToggleableImageListProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const expandedStyle = {
  }

  const opacity = 0.0;

  const compressedStyle = {
    overflow: "hidden" as const,
    height: "20rem",
    mask: `linear-gradient(180deg, black, rgba(255, 255, 255, ${opacity})) center bottom/100% 5rem no-repeat, linear-gradient(180deg, black, black) center top/100% calc(100% - 5rem) no-repeat`
  }

  return <div
    className="row g-3"
    style={expanded ? expandedStyle : compressedStyle}
    onClick={() => setExpanded(true)}
  >
    {props.children.map((c, i) => <div key={i} className="col d-flex justify-content-center">{c}</div>)}
  </div>
}


type ProjectProps = {
  id: string,
  title: string,
  blurb: string,
  explanation?: React.ReactNode,
  begindate: Date,
  enddate?: Date,
  links: { key: string, url: string }[],
  images: React.ReactNode[],
}

const Project = (props: ProjectProps) =>
  <Section id={props.id} name={props.title}>
    <p>{props.blurb}</p>
    {props.enddate !== undefined
      ? <p><strong>Date: </strong>{format(props.begindate, "MMM y")} to {format(props.enddate, "MMM y")}</p>
      : <p><strong>Date: </strong>{format(props.begindate, "MMM y")} to present</p>
    }
    {props.explanation}
    <h5>Links</h5>
    <ul>
      {props.links.map(({ key, url }, i) => <li key={i}>{key}: <HrefLink href={url} /></li>)}
    </ul>
    <h5>Screenshots</h5>
    <ToggleableImageList children={props.images} />
  </Section>

const ProjectsPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>

    <Project
      id="torus-weather-sim"
      title="Torus Weather Simulation"
      blurb="A naive simulation of weather on a torus shaped planet."
      begindate={parse("Jan 2022", "MMM y", new Date())}
      enddate={parse("Mar 2022", "MMM y", new Date())}
      links={[
        { key: "Demo 1", url: TorusWeatherDemo1Url },
        { key: "Demo 2", url: TorusWeatherDemo2Url },
        { key: "Article", url: TorusWeatherArticleUrl },
      ]}
      images={[
        <img src={TorusWeatherScreenshot} className="border border-dark" alt="Demo of the Torus Weather System" />
      ]}
    />

    <Project
      id="compugenesis"
      title="Compugenesis"
      blurb="Compugenesis is a Rust simulation that uses L-Systems to model plants efficiently and accurately."
      begindate={parse("Jan 2022", "MMM y", new Date())}
      enddate={parse("Mar 2022", "MMM y", new Date())}
      links={[
        { key: "Source code", url: "https://github.com/pimpale/compugenesis" },
      ]}
      images={[
        <img src={CompugenesisFlowchart} className="border border-dark bg-dark" alt="Flowchart of compugenesis" />,
        <img src={CompugenesisScreenshot} className="border border-dark" alt="Demo of the Compugenesis system" />
      ]}
      explanation={<>
        <h5>Goals:</h5>
        <ul>
          <li>Create a flexible plant simulation and paired microclimate implementation that uses the parallelization capabilities of a GPU.</li>
          <li>Use the L-System implementation to simulate plant topology within a 95% confidence interval (CI) for actual plant dimensions.</li>
          <li>Simulate plant topology in response to temperature, soil moisture, and sunlight.</li>
        </ul>
      </>
      }
    />


    <Project
      id="vulkan-voxel-renderer"
      title="Vulkan Voxel Renderer"
      blurb="Simple Voxel Renderer made with vulkan and C"
      begindate={parse("Mar 2022", "MMM y", new Date())}
      explanation={<>
        <p>
          This project is a simple voxel renderer made using Vulkan and C.
          It's a small demo example and not a full game,
          but it successfully demonstrates the basic principles of building texture atlases, chunk generation, and dynamic chunk loading without a game engine
        </p>
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
        <p>
          This project's code and assets are 100% public domain, and you can do whatever you like with them.
        </p>
      </>}
      images={[
        <img src={VulkanTriangleV2Screenshot} className="border border-dark w-100" alt="Demo of the game" />
      ]}
      links={[
        { key: "Source code", url: "https://github.com/pimpale/vulkan-triangle-v2" },
      ]}
    />

    <Project
      id="c-opencl-raymarcher"
      title="C OpenCL Raymarcher"
      blurb="A simple raymarcher written in C with OpenCL acceleration."
      begindate={parse("Nov 2020", "MMM y", new Date())}
      enddate={parse("Mar 2021", "MMM y", new Date())}
      links={[
        { key: "Source code", url: "https://github.com/pimpale/c-opencl-raymarcher" },
      ]}
      images={[
        <img src={COpenCLRaymarcherSierpinskiScreenshot} className="border border-dark w-100" alt="3D Sierpinski triangle produced by raymarcher" />,
        <img src={COpenCLRaymarcherWarp} className="border border-dark w-100" alt="Black hole rendered by raymarcher" />
      ]}
      explanation={<> </>}
    />

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

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ProjectsPage />
  </React.StrictMode>,
);
