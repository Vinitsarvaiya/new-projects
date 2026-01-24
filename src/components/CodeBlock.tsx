import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import ArticleIcon from "@mui/icons-material/Article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface CodeBlockProps {
  code: string;
  language?: string; // js, ts, bash, json, etc
  type?: "terminal" | "box";
}

const CodeBlock = ({
  code,
  language = "typescript",
  type = "terminal",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative mb-6 rounded-md border border-[#2E2E2E] w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-black px-3 py-2 border-b border-[#2E2E2E]">
        <div className="flex items-center gap-2">
          {type === "terminal" ? (
            <>
              <span className="text-green-400">{">_"}</span>
              <span className="text-xs text-zinc-200 hidden sm:inline">
                Terminal
              </span>
            </>
          ) : (
            <>
              <ArticleIcon fontSize="small" className="text-blue-400" />
              <span className="text-xs text-zinc-200 hidden sm:inline">
                Code
              </span>
            </>
          )}
        </div>

        <button onClick={handleCopy}>
          {copied ? (
            <DoneAllIcon className="text-green-400 !text-[14px]" />
          ) : (
            <ContentCopyIcon className="!text-[14px]" />
          )}
        </button>
      </div>

      {type === "terminal" ? (
        <>
          <pre className="
        bg-[#0A0A0A]
        text-zinc-200
        p-3 sm:p-4
        rounded-b-lg
        overflow-x-auto
        font-mono
        text-xs sm:text-sm
        whitespace-pre-wrap
        break-words
        max-w-full
      ">
            <code>{code}</code>
          </pre>
        </>
      ) : (
        <>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              background: "#0A0A0A",
              fontSize: "0.85rem",
            }}
            showLineNumbers
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </>
      )}

    </div>
  );
};

export default CodeBlock;
