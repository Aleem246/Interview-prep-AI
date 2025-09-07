import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        // ✅ Prevent <p> wrapping around block elements
        p: ({ node, children }) => {
          const hasBlock = React.Children.toArray(children).some(
            (child) =>
              child?.type === "ol" ||
              child?.type === "ul" ||
              child?.type === "pre" ||
              child?.type === "table" ||
              child?.type === "blockquote"
          );

          if (hasBlock) {
            return <div>{children}</div>; // render inside <div> instead of <p>
          }
          return <p>{children}</p>;
        },

        // ✅ Code block with syntax highlighting
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default AIResponsePreview;
