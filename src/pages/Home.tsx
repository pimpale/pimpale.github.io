import React from 'react';
import Centerpiece from '../components/Centerpiece';

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
  width:"50em",
  height:"50em",
  transform: "translate(-50%, -50%)",
}

function Home() {
  return (
    <Layout>
      <section id="intro"> 
        <div style={introStyle}>
          <Centerpiece style={circleCenter} />
          <IntroCard rotation={-45} title="About">
            <a href="#about">About me, my projects, and this site</a>
          </IntroCard>
          <IntroCard rotation={0} title="Innexgo">
            <a href="#innexgo">Open source student management system</a>
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
        <section id="achernar">
          <h2>Achernar</h2>
          <br />
          <p>
            Achernar is a programming language focusing on:
            <ul>
              <li>
                <b>Minimalism</b>: Achernar strives to be <i>orthogonal</i>.
                 Language features are simple to understand, independent, and highly composable.
              </li>
              <li></li>
              <li>Foo</li>
            </ul>
          </p>
        </section>
        <section id="about">
          <h2>About</h2>
          <br />
          <h5> Me </h5>
          <p>
            I enjoy recreational coding, especially in C.
            I am a I currently work at <a href="https://innexgo.com">Innexgo</a>, making educational software.
            I believe in <a
              href="https://globalprioritiesinstitute.org/wp-content/uploads/2019/Greaves_MacAskill_The_Case_for_Strong_Longtermism.pdf">
              Strong Longtermism
            </a> and <a
          </p>
          <br />
          <h5> Site </h5>
          <p>
            This site was made using <a href="https://reactjs.org/">ReactJS</a> and <a href="https://www.typescriptlang.org/">Typescript</a>,
            with the animations in <a href="https://threejs.org/">three.js</a>.
            All content on this site is licensed under the MIT license unless otherwise specified.
            Source can be found <a href="https://github.com/pimpale/pimpale.github.io">here</a>.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default Home;
