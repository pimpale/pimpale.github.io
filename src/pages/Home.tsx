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
    width: "25vw",
    transformOrigin: "right",
    transform: `rotate(${props.rotation}deg) translate(20vw) rotate(${-props.rotation}deg) translate(-100%, -50%)`,
    borderRight: "6px solid black",
  } : {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      width: "25vw",
      transformOrigin: "left",
      transform: `rotate(${props.rotation}deg) translate(20vw) rotate(${-props.rotation}deg) translate(0%, -50%)`,
      borderLeft: "6px solid black",
    }
    ;
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
  alignItems: "center",
  backgroundAttachment: "fixed",
  backgroundPosition: "center center",
  backgroundRepeat: "noRepeat",
  backgroundSize: "cover",
  display: "flex",
  minHeight: "100vh",
  width: "90vw",
  paddingTop: "5vh",
  paddingBottom: "5vh",
}


const circleCenter = {
  transformOrigin: "center",
  display: "block",
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

function Home() {
  return (
    <Layout>
      <section id="intro">
        <div style={introStyle}>
          <div>
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
              <a href="achernar">A minimalistic, secure, and low level language</a>
            </IntroCard>
            <IntroCard rotation={0 + 180} title="Terrain Generation">
              <a href="#terraingeneration">Generate Alien Landforms with Perlin Noise</a>
            </IntroCard>
            <IntroCard rotation={45 + 180} title="Compugenesis" >
              <a href="#compugenesis">Plant growth simulation</a>
            </IntroCard>
          </div>
        </div>
      </section>
      <div id="content" className="container">
        <section id="about">
        </section>
      </div>
    </Layout>
  )
}

export default Home;
