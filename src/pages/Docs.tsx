import DocsLayout from "../components/layout/DocsLayout";
import { Toaster } from "react-hot-toast";
import DocsRenderer from "../components/DocsRenderer";

const Docs = ({ src }: any) => {
  return (
    <DocsLayout>
        <Toaster position="bottom-right" />
        <DocsRenderer data={src} />
    </DocsLayout>
  );
};

export default Docs;
