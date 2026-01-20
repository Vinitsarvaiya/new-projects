// import { docsConfig } from "../../data/docsConfig";

const RightSidebar = () => {
  // const items = docsConfig[0].items;

  return (
    <aside className="w-56 border-l border-zinc-800 p-4 text-sm">
      {/* <h4 className="text-zinc-400 mb-3">On this page</h4> */}

      {/* <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="hover:text-blue-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul> */}
    </aside>
  );
};

export default RightSidebar;
