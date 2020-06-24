import React from 'react';

import Layout from '../components/Layout';

type IntroCardProps = {
  title: string,
  rotation: number,
  link: string,
}

const IntroCard: React.FunctionComponent<IntroCardProps> = props => {
  const circleEdge = {
    transform: `rotate(${props.rotation}deg) translate(20vw) rotate(${-props.rotation}deg) translate(-50%, -50%)`,
    transformOrigin: "top left",
    display: "block",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
  };
  return (
    <div className="card text-light bg-dark" style={circleEdge}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className="card-text">{props.children}</div>
        <a href={props.link} className="stretched-link d-inline" />
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
}

function Home() {
  return (
    <Layout>
      <section id="intro">
        <div style={introStyle}>
          <div>
            <IntroCard rotation={-30} title="About" link="#about">
              About this site
            </IntroCard>
            <IntroCard rotation={0} title="About" link="#about">
              About this site
            </IntroCard>
            <IntroCard rotation={30} title="About" link="#about">
              About this site
            </IntroCard>
            <IntroCard rotation={-30 + 180} title="About" link="#about">
              About this site
            </IntroCard>
            <IntroCard rotation={0 + 180} title="About" link="#about">
              About this site
            </IntroCard>
            <IntroCard rotation={30 + 180} title="Source" link="https://github.com/pimpale/pimpale.github.io">
              View source code for this website (Public Domain)
            </IntroCard>
          </div>
        </div>
      </section>
      <section id="content" className="container">
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
        <p>Home</p>
      </section>
    </Layout>
  )
}

export default Home;
