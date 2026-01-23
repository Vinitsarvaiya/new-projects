import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface CodeBlockProps {
  code: string;
  type?: "terminal" | "box"; // type of block
}

const CodeBlock = ({ code, type = "terminal" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative mb-6 rounded-md border border-[#2E2E2E] w-full max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#000000] px-3 py-2 rounded-t-lg border-b border-[#2E2E2E] flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {type === "terminal" ? (
            <>
              <span className="text-green-400">{">_"}</span>
              <span className="font-mono text-xs text-zinc-200 hidden sm:inline">
                Terminal
              </span>
            </>
          ) : (
            <>
              <span className="text-blue-400">
                <ArticleIcon fontSize="small" />
              </span>
              <span className="font-mono text-xs text-zinc-200 hidden sm:inline">
                Code
              </span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="
            inline-flex items-center justify-center
            p-1 sm:p-2
            rounded
            text-zinc-400
            hover:text-white
            hover:bg-zinc-700/40
            transition-colors duration-150
            active:scale-95
            cursor-pointer
          "
          aria-label="Copy code"
        >
          {copied ? (
            <DoneAllIcon className="!text-[12px] text-green-400" />
          ) : (
            <ContentCopyIcon className="!text-[12px]" />
          )}
        </button>
      </div>

      {/* Code block */}
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
    </div>
  );
};

export default CodeBlock;
