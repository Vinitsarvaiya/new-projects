export interface DocItem {
    id: string;
    label: string;
  }
  
  export interface DocSectionConfig {
    title: string;
    items: DocItem[];
  }

// data/docsConfig.ts
export interface DocItem {
  id: string;
  label: string;
  children?: DocItem[];
}

export interface DocSection {
  title: string;
  collapsible?: boolean;
  items: DocItem[];
}

export const docsConfig: DocSection[] = [
  // {
  //   title: "API Reference",
  //   collapsible: true,
  //   items: [
  //     {
  //       id: "directives",
  //       label: "Directives",
  //       children: [
  //         { id: "use-cache", label: "use cache" },
  //         { id: "use-cache-private", label: "use cache: private" },
  //         { id: "use-cache-remote", label: "use cache: remote" },
  //         { id: "use-client", label: "use client" },
  //         { id: "use-server", label: "use server" },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "React.Js",
    collapsible: false,
    items: [
      { id: "setup", label: "setup" },
      { id: "axios", label: "axios-setup" },
      { id: "redux-setup", label: "redux-setup" },
      { id: "router-setup", label: "router-setup" },
    ],
  },
   {
    title: "Node + Express",
    collapsible: false,
    items: [
      { id: "nodejs", label: "Node-setup" },
      { id: "middleware", label: "middleware-setup" },
      { id: "fileupload", label: "fileupload-impleament" },
    ],
  },
   {
    title: "Database",
    collapsible: false,
    items: [
      { id: "mongodb", label: "MongoDb" },
      { id: "postgress", label: "postgress" },
      { id: "mongodb-command", label: "mongodb-command" },
    ],
  },
];


export const versions = [
  { label: "Latest", version: "16.1.4", active: true },
  { label: "Version 15", version: "15.5.9" },
  { label: "Version 14", version: "14.2.35" },
  { label: "Version 13", version: "13.5.11" },
];


  