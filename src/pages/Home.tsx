import React from 'react';
import { Link } from 'react-router-dom';

import Centerpiece from '../components/Centerpiece';
import TerrainGenIntro from '../components/TerrainGenIntro';
import Layout from '../components/Layout';
import Section from '../components/Section';

import Resume from '../assets/govind_pimpale_resume.pdf';

import { CaretDownFill } from 'react-bootstrap-icons';

type RotatedProps = {
  rotation: number,
  distance: number,
}

const Rotated: React.FunctionComponent<RotatedProps> = props => {
  const xDisplacement = Math.cos(props.rotation * (Math.PI / 180));
  let circleEdge;
  if (xDisplacement < -0.1) {
    // Left
    circleEdge = {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transformOrigin: "right",
      transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-100%, -50%)`,
    }
  } else if (xDisplacement > 0.1) {
    // Right
    circleEdge = {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transformOrigin: "left",
      transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(0%, -50%)`,
    };
  } else {
    // Center
    circleEdge = {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transformOrigin: "center",
      transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-50%, -50%)`,
    };
  }

  return (
    <div style={circleEdge}>
      {props.children}
    </div>
  );
}

type IntroCardProps = {
  title: string,
}

const IntroCard: React.FunctionComponent<IntroCardProps> = props =>
  <div className="card" style={{ width: "15rem" }}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <div className="card-text">{props.children}</div>
    </div>
  </div>

const introStyle = {
  height: "100vh",
  minHeight: "50em",
  width: "100%",
  minWidth: "100em"
}


const circleCenter = {
  transformOrigin: "center",
  display: "block",
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  width: "50rem",
  height: "50rem",
  transform: "translate(-50%, -50%)",
}


function Home() {
  return <Layout>
    <div style={introStyle}>
      <Centerpiece style={circleCenter} />

      {/* Down button */}
      <Rotated distance={20} rotation={90} >
        <a href="#about" className="btn btn-secondary border-dark"><CaretDownFill /></a>
      </Rotated>
      {/* Data */}
      <div className="navbarSupportedContent">
        <Rotated distance={15} rotation={-45} >
          <IntroCard title="About">
            <a href="#about">About me, my projects, and this site</a>
          </IntroCard>
        </Rotated>
        <Rotated distance={15} rotation={0} >
          <IntroCard title="Innexgo">
            <a href="#innexgo">Open source education systems</a>
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
          <IntroCard title="Terrain Generation">
            <a href="#terraingeneration">Demo Procedural Generation System</a>
          </IntroCard>
        </Rotated>
        <Rotated distance={15} rotation={45 + 180} >
          <IntroCard title="Resume" >
            <Link to="/resume">View Resume</Link>
          </IntroCard>
        </Rotated>
      </div>
    </div>
    <div id="content" className="container">
      <Section id="about" name="About">
        <h5>Me</h5>
        <p>
          I'm a student at UCLA, studying Computer Science and Engineering.
          I believe in <a
            href="https://globalprioritiesinstitute.org/wp-content/uploads/2019/Greaves_MacAskill_The_Case_for_Strong_Longtermism.pdf">
            Strong Longtermism
          </a> and the <a href="https://suckless.org/philosophy/">Suckless philosophy</a>.
          In my free time, I enjoy recreational programming (especially in C).
          I currently work at <a href="https://innexgo.com">Innexgo</a>, making educational software.
        </p>
        <ul>
          <li><a href="https://github.com/pimpale/">Github</a></li>
          <li><a href="https://www.linkedin.com/in/govind-pimpale/">LinkedIn</a></li>
          <li><a href={Resume}>Resume</a></li>
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
      <Section id="innexgo" name="Innexgo">
        <p>
          In 2018 I helped create Innexgo, an open source student attendance system. Innexgo uses RFID stickers to automatically take
          attendance without wasting student or teacher time and provides data analysis tools for converting raw attendance data to useful
          graphs and statistics.
        </p>
        <p>
          <a href="https://innexgo.com">Company Website</a>
          <br />
          <a href="https://github.com/innexgo">Source Code</a>
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
          I am currently about 50% through writing the first compiler in C that will compiler Achernar code.
          The compiler uses its own custom standard library called  <code>comlib</code> that will evolve into Achernar's standard library.
        </p>
        <h5>Additional Information</h5>
        <p>
          <Link to="https://github.com/pimpale/achernar">Achernar Source Code</Link>
          <br />
          <Link to="/achernar">More Info</Link>
        </p>
      </Section>
      <br />
      <Section id="terraingeneration" name="TerrainGeneration">
        <div>
          <TerrainGenIntro width={800} height={800} />
          <br />
          <Link to="/terraingeneration">More Terrain Generation</Link>
        </div>
      </Section>
      <br />
    </div>
  </Layout>
}

export default Home;
