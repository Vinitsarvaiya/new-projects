import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface CodeBlockProps {
    code: string;
    language?: string;
    type?: "terminal" | "box"; // type of block
}

const CodeBlock = ({ code, language, type = "terminal" }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    console.log(language);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="relative mb-6 sidebar-scroll rounded-md border border-[#2E2E2E]">
            {/* Terminal header with copy button */}
            <div className="flex justify-between items-center bg-[#000000] px-3 py-[6px] rounded-t-lg min-h-[10px] border-b border-[#2E2E2E]">
                <div className="flex space-x-2">
                    {type === "terminal" ? (
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-200">
                            <span className="text-green-400">{">_"}</span>
                            <span>Terminal</span>
                        </div>) : (
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-200">
                            <span className="text-blue-400"><ArticleIcon fontSize="small" /></span>
                            <span>Code</span>
                        </div>
                    )}

                    {/* <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span> */}
                </div>
                <button
                    onClick={handleCopy}
                    className="
    inline-flex items-center justify-center
    p-1
    rounded
    text-zinc-400
    hover:text-white
    hover:bg-zinc-700/40
    transition-colors duration-150
    active:scale-95 cursor-pointer
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

            {/* Terminal code area */}
            <pre className="bg-[#0A0A0A] text-zinc-200 p-4 rounded-b-lg overflow-x-auto font-mono text-sm ">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
