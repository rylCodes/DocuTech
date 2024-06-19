// components/CodeSnippet.js
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeSnippet = ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
