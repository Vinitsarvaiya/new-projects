import { docsConfig } from "../../data/docsConfig";

const LeftSidebar = () => {
  return (
    <aside className="w-64 border-r border-zinc-800 p-4 overflow-y-auto">
      {docsConfig.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-xs text-zinc-400 uppercase mb-3">
            {section.title}
          </h3>

          <ul className="space-y-2 text-sm">
            {section.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-blue-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default LeftSidebar;
