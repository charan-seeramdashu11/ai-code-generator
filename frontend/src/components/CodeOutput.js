import React from 'react';

export default function CodeOutput({ code, language, error }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  if (error) {
    return <div className="output error">{error}</div>;
  }

  if (!code) {
    return <div className="output placeholder">Your generated code will appear here.</div>;
  }

  return (
    <div className="output">
      <div className="output-header">
        <span>{language}</span>
        <button onClick={handleCopy}>Copy</button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
