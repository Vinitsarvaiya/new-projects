import DocsLayout from "../components/layout/DocsLayout";
import { Toaster } from "react-hot-toast";
import DocsRenderer from "../components/DocsRenderer";
import { reactDocs } from "../data/ReactDocs";

const Docs = () => {
  return (
    <DocsLayout>
        <Toaster position="bottom-right" />
        <DocsRenderer data={reactDocs} />
    </DocsLayout>
  );
};

export default Docs;
