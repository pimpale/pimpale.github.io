
import { Async } from 'react-async';
import { fetchText } from '../utils/load';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type CodeBlockProps = {
  url: string,
  lang: string
}

export function CodeBlock(props: CodeBlockProps) {
  return <Async promise={fetchText(props.url)}>
    <Async.Pending>
      <div className="spinner-border" role="status" />
    </Async.Pending>
    <Async.Fulfilled<string>>{code =>
      <SyntaxHighligher
        className="mx-5 mb-5"
        language={props.lang}
        showLineNumbers
        style={a11yDark}
        children={code}
      />
    }</Async.Fulfilled>
    <Async.Rejected>
      {/* TODO: put error here */}
      <div className="spinner-border" role="status" />
    </Async.Rejected>
  </Async>
}