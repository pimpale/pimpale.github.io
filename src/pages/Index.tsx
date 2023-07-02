import TerrainGenIntro from '../components/TerrainGenIntro';
import HomepageDemo from '../components/HomepageDemo';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Articles from '../components/Articles';
import { useMediaQuery } from 'react-responsive'
import MnistOnnxDemo from '../components/MnistOnnxDemo';
import AsideCard from '../components/AsideCard';

import ResumePdfUrl from '../assets/govind_pimpale_resume.pdf?url';

const ResumeUrl = '/resume.html';
const AchernarUrl = '/achernar.html';
const TerrainGenerationUrl = '/terraingeneration1.html';

import { Arrow90degDown, CaretDownFill } from 'react-bootstrap-icons';

type RotatedProps = {
  rotation: number,
  distance: number,
  // when collapsed should this be its own row
  ownRow?: boolean
  children: React.ReactChild
}

function Rotated(props: RotatedProps) {
  if (!useMediaQuery({ minWidth: 992 })) {
    const mx = `${props.ownRow ? 20 : 1}em`;
    return <div style={{ marginLeft: mx, marginRight: mx }}>
      {props.children}
    </div>
  } else {
    const xDisplacement = Math.cos(props.rotation * (Math.PI / 180));
    let transformCss;

    if (xDisplacement < -0.1) {
      // Left
      transformCss = {
        transformOrigin: "right",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-100%, -50%)`,
      }
    } else if (xDisplacement > 0.1) {
      // Right
      transformCss = {
        transformOrigin: "left",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(0%, -50%)`,
      };
    } else {
      // Center
      transformCss = {
        transformOrigin: "center",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-50%, -50%)`,
      };
    }

    const blockCss = {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
    };

    return <div style={{ ...transformCss, ...blockCss }}>
      {props.children}
    </div>
  }
}

type IntroCardProps = {
  title: string,
  children: React.ReactChild
}

const IntroCard: React.FunctionComponent<IntroCardProps> = props =>
  <div className="card my-3" style={{ width: "15rem" }}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <div className="card-text">{props.children}</div>
    </div>
  </div>


const Home = () =>
  <Layout>
    <div className="min-vh-100 d-flex justify-content-center flex-wrap mt-5">
      {/* Interactive Label */}
      <Rotated distance={12} rotation={-85} >
        <span data-nosnippet>
          <Arrow90degDown className='fs-1' style={{ transform: "translateY(0.5rem)" }} /><span className='fs-3' style={{ fontFamily: "Permanent Marker" }}> Spin Me!</span>
        </span>
      </Rotated>

      {/* The Demo itself  */}
      <Rotated distance={0} rotation={90} ownRow>
        <HomepageDemo width={400} height={400} style={{ width: "20em", height: "20em" }} />
      </Rotated>


      {/* Data */}
      <Rotated distance={15} rotation={-45} >
        <IntroCard title="About">
          <a href="#about">About me, my projects, and this site</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={0} >
        <IntroCard title="Demo of the Day">
          <a href="#dotd">Randomly Selected Javascript Widget</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={45} >
        <IntroCard title="Source">
          <a href="https://github.com/pimpale/pimpale.github.io">View source code for this site</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={-45 + 180} >
        <IntroCard title="Achernar">
          <a href="#achernar">A minimalistic, secure, and low level language</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={0 + 180} >
        <IntroCard title="Articles">
          <a href="#articles">Articles about projects</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={45 + 180} >
        <IntroCard title="Resume" >
          <a href={ResumeUrl}>View Resume</a>
        </IntroCard>
      </Rotated>
      {/* Down button */}
      <Rotated distance={20} rotation={90} ownRow>
        <a href="#about" className="btn btn-secondary border-dark" aria-label="About"><CaretDownFill /></a>
      </Rotated>
    </div>
    <div id="content" className="container">
      <Section id="about" name="About">
        <h5>Me</h5>
        <p>
          I'm a student at UCLA, studying Computer Science and Engineering.
          I believe in <a
            href="https://globalprioritiesinstitute.org/summary-the-case-for-strong-longtermism/">
            Strong Longtermism
          </a> and the <a href="https://suckless.org/philosophy/">Suckless philosophy</a>.
          In my free time, I enjoy recreational programming (especially in C).
        </p>
        <ul>
          <li><a href="https://github.com/pimpale/">Github</a></li>
          <li><a href="https://www.linkedin.com/in/govind-pimpale/">LinkedIn</a></li>
          <li><a href={ResumePdfUrl}>Resume</a></li>
        </ul>
        <h5>Projects</h5>
        <p>
          Most of my projects are licensed permissively, usually under MIT or the Unlicense. If they're not on the site,
          you can find them <a href="https://github.com/pimpale/">here</a>. You can also follow me on github to keep up to date on their development.
        </p>
        <h5>Site</h5>
        <p>
          This site was made
          using <a href="https://reactjs.org/">ReactJS</a> and <a href="https://www.typescriptlang.org/">Typescript</a>,
          with the animations in <a href="https://threejs.org/">three.js</a>.
          All content on this site is licensed under the MIT license unless otherwise specified.
          The source of this website can be found <a href="https://github.com/pimpale/pimpale.github.io">here</a>.
        </p>
      </Section>
      <Section id="achernar" name="Achernar">
        <h5>Goals</h5>
        Achernar is a <b><i>Work In Progress</i></b> programming language focusing on:
        <ul>
          <li>
            <b>Minimalism</b>: Achernar strives to be <i>orthogonal</i>.
            Language features are simple to understand, independent, and highly composable.
            As such, minimalism is both possible and ergonomic.
          </li>
          <li><b>Versatility</b>: Achernar does not lock the user into any particular framework and is highly unopinionated.
            Use Achernar compiled or interpreted. It can be easily dropped into any existing project without dragging in any dependencies.
          </li>
          <li><b>Safe</b>: Achernar is designed with type safety in mind. It is strongly typed and offers additional Ada
            style contract programming.
          </li>
        </ul>
        <h5>Current Status</h5>
        <p>
          I am currently about 50% through writing the first compiler in C that will compile Achernar code.
          The compiler uses its own custom standard library called <code>comlib</code> that will evolve into Achernar's standard library.
        </p>
        <h5>Additional Information</h5>
        <p>
          <a href="https://github.com/pimpale/achernar">Achernar Source Code</a>
          <br />
          <a href={AchernarUrl}>More Info</a>
        </p>
      </Section>
      <Section id="dotd" name="Demo of the Day">
        <AsideCard title="Classify Numbers Client Side!">
          <p className='card-text'>
            This is a demo of running an MNIST model entirely client side with onnxruntime-web.
          </p>
          <MnistOnnxDemo />
        </AsideCard>
      </Section>
      <Articles />
    </div>
  </Layout>


import React from 'react';
import { createRoot } from 'react-dom/client';

import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
