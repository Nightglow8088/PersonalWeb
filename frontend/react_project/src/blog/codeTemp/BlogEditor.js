import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import copy from 'copy-to-clipboard';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-java'; // 支持 Java
import 'prismjs/themes/prism-okaidia.css'; // 使用 PrismJS 的 okaidia 主题，或者你可以自定义样式
import styled from 'styled-components';

const StyledContainer = styled.div`
  textarea {
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
  }

  pre {
    background: #282c34; /* 深色背景 */
    color: #abb2bf; /* 浅灰字体颜色 */
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto; /* 添加滚动条 */
  }

  code {
    font-family: 'Fira Code', 'Monaco', monospace; /* 使用等宽字体 */
    font-size: 0.9em;
  }
`;

const CodeBlock = ({ language, value }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  return (
    <pre>
      <code className={`language-${language}`}>
        {value}
      </code>
    </pre>
  );
};

const MarkdownEditor = () => {
  const [input, setInput] = useState('```java\npublic class Hello { public static void main(String[] args) { System.out.println("Hello, world!"); } }\n```');

  const handleCopyCode = () => {
    const code = input.match(/```(.|\s)*?```/)[0];
    copy(code);
    alert('Code copied to clipboard!');
  };

  return (
    <StyledContainer>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ReactMarkdown
        children={input}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
      <button onClick={handleCopyCode}>Copy Code</button>
    </StyledContainer>
  );
};

export default MarkdownEditor;
