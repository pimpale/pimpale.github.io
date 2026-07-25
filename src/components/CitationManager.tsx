import React from 'react'

export interface CitationProps {
  source: string,
  commentary?: string
}

export interface CitationBankProps {

}

interface CitationContextValue {
  prefix: string,
  // maps source -> index, in order of first citation
  map: Map<string, number>,
}

const CitationContext = React.createContext<CitationContextValue | null>(null);

function useCitationContext(): CitationContextValue {
  const ctx = React.useContext(CitationContext);
  if (ctx === null) {
    throw new Error("Citation components must be rendered inside a <CitationManager> (normally provided by <ArticleLayout>)");
  }
  return ctx;
}

export const Citation: React.FunctionComponent<CitationProps> = props => {
  const { prefix, map } = useCitationContext();

  let index = map.get(props.source);
  if (index === undefined) {
    index = map.size + 1;
    map.set(props.source, index);
  }

  return <a href={'#' + prefix + index} style={{ textDecoration: "none" }} className="me-1">
    <sup>[{index}]</sup>
  </a>
}

export const CitationBank: React.FunctionComponent<CitationBankProps> = _props => {
  const { prefix, map } = useCitationContext();

  return <ol>{
    Array.from(
      map,
      ([source, index]) =>
        <li key={index} id={prefix + index}>
          <a href={source}>{source}</a>
        </li>
    )
  }</ol>
}

export interface CitationManagerProps {
  prefix: string,
  children: React.ReactNode,
}

const CitationManager: React.FunctionComponent<CitationManagerProps> = props => {
  // The map is mutated by <Citation> during render and read by <CitationBank>,
  // which relies on the bank being rendered after the citations it lists.
  const mapRef = React.useRef<Map<string, number> | undefined>(undefined);
  if (mapRef.current === undefined) {
    mapRef.current = new Map();
  }
  const map = mapRef.current;

  const value = React.useMemo(
    () => ({ prefix: props.prefix, map }),
    [props.prefix, map]
  );

  return <CitationContext.Provider value={value}>
    {props.children}
  </CitationContext.Provider>
}

export default CitationManager;
