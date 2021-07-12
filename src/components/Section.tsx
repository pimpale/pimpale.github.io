import React from 'react';
import { Link } from 'react-router-dom';

type SectionProps = {
  id: string
  name: string
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
    <div>
      <Link to={`#${props.id}`} className="float-end text-muted"><h3>#</h3></Link>
      <h2>{props.name}</h2>
    </div>
    {props.children}
  </section>
}

export default Section;
