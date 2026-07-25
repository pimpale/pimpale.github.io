import React from 'react';

type FigureProps = {
  src: string,
  alt: string,
  caption?: React.ReactNode,
  source?: React.ReactNode,
  maxWidth?: string,
}

const Figure: React.FunctionComponent<FigureProps> = props =>
  <figure className="d-block text-center my-4">
    <img
      src={props.src}
      alt={props.alt}
      className="img-fluid"
      style={{ maxWidth: props.maxWidth ?? "min(100%, 45rem)" }}
    />
    {props.source
      ? <figcaption className="figure-caption mt-2"><i>Source: {props.source}</i></figcaption>
      : null}
    {props.caption
      ? <figcaption className="figure-caption"><i>{props.caption}</i></figcaption>
      : null}
  </figure>

export default Figure;
