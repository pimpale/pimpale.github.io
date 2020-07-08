import React from 'react';
import Centerpiece from '../components/Centerpiece';

import TerrainGenIntro from '../components/TerrainGenIntro';

import Layout from '../components/Layout';

type IntroCardProps = {
  title: string,
  rotation: number,
}

const IntroCard: React.FunctionComponent<IntroCardProps> = props => {
  const isLeft = Math.cos(props.rotation * (Math.PI / 180)) < 0;
  const circleEdge = isLeft ? {
    display: "block",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    width: "15em",
    transformOrigin: "right",
    transform: `rotate(${props.rotation}deg) translate(15em) rotate(${-props.rotation}deg) translate(-100%, -50%)`,
    borderRight: "6px solid black",
  } : {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      width: "15em",
      transformOrigin: "left",
      transform: `rotate(${props.rotation}deg) translate(15em) rotate(${-props.rotation}deg) translate(0%, -50%)`,
      borderLeft: "6px solid black",
    };

  return (
    <div className="card text-light bg-dark" style={circleEdge}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className="card-text">{props.children}</div>
      </div>
    </div>
  );
}

type SectionProps = {
  id: string
}

const Section: React.FunctionComponent<SectionProps> = props => {
  return <section style={{
    overflow: "hidden",
    position: "relative",
  }}>
    <span
      id={props.id}
      style={{
        position: "absolute",
        top: "-100px",
        visibility: "hidden",
      }}></span>
    {props.children}
  </section>
}


const introStyle = {
  position: "relative" as const,
  alignItems: "center",
  backgroundAttachment: "fixed",
  backgroundPosition: "center center",
  backgroundRepeat: "noRepeat",
  backgroundSize: "cover",
  display: "flex",
  height: "100vh",
  width: "100%",
  minWidth: "50em"
}


const circleCenter = {
  transformOrigin: "center",
  display: "block",
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  width: "50em",
  height: "50em",
  transform: "translate(-50%, -50%)",
}

function Home() {
  return (
    <Layout>
      <section>
        <div style={introStyle}>
          <Centerpiece style={circleCenter} />
          <IntroCard rotation={-45} title="About">
            <a href="#about">About me, my projects, and this site</a>
          </IntroCard>
          <IntroCard rotation={0} title="Innexgo">
            <a href="#innexgo">Open source education systems</a>
          </IntroCard>
          <IntroCard rotation={45} title="Source">
            <a href="https://github.com/pimpale/pimpale.github.io">View source code for this site</a>
          </IntroCard>
          <IntroCard rotation={-45 + 180} title="Achernar">
            <a href="#achernar">A minimalistic, secure, and low level language</a>
          </IntroCard>
          <IntroCard rotation={0 + 180} title="Terrain Generation">
            <a href="#terraingeneration">Generate Alien Landforms with Perlin Noise</a>
          </IntroCard>
          <IntroCard rotation={45 + 180} title="Compugenesis" >
            <a href="#compugenesis">Plant growth simulation</a>
          </IntroCard>
        </div>
      </section>
      <div id="content" className="container">
        <Section id="achernar">
          <h2>Achernar</h2>
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
            <a href="https://github.com/pimpale/achernar">Achernar Source Code</a>
            <br />
            <a href="/achernar">Live Demo</a>
          </p>
        </Section>
        <br />
        <Section id="terraingeneration">
          <h2>Terrain Generation</h2>
          <div>
            <TerrainGenIntro width={800} height={800} />
            <br />
            <a href="/terraingeneration">More Terrain Generation</a>
          </div>
        </Section>
        <br />
        <Section id="innexgo">
          <h2>Innexgo</h2>
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
        <br />
        <Section id="about">
          <h2>About</h2>
          <h5>Me</h5>
          <p>
            I enjoy recreational coding, especially in C.
            I currently work at <a href="https://innexgo.com">Innexgo</a>, making educational software.
            I believe in <a
              href="https://globalprioritiesinstitute.org/wp-content/uploads/2019/Greaves_MacAskill_The_Case_for_Strong_Longtermism.pdf">
              Strong Longtermism
            </a> and <a href="https://suckless.org/philosophy/">the Suckless philosophy</a>.
          </p>
          <h5>Projects</h5>
          <p>
            Most of my personal "for fun" projects are licensed permissively, usually under MIT or the Unlicense. If they're not on the site,
            you can find them <a href="https://github.com/pimpale/">here</a>. You can also follow me on github to keep up to date on their development.
          </p>
          <h5>Site</h5>
          <p>
            This site was made using <a href="https://reactjs.org/">ReactJS</a> and <a href="https://www.typescriptlang.org/">Typescript</a>,
            with the animations in <a href="https://threejs.org/">three.js</a>.
            All content on this site is licensed under the MIT license unless otherwise specified.
            The source of this website can be found <a href="https://github.com/pimpale/pimpale.github.io">here</a>.
          </p>
        </Section>
      </div>
    </Layout>
  )
}

export default Home;
