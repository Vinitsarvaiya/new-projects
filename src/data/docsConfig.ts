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
  // {
  //   title: "Components",
  //   collapsible: true,
  //   items: [
  //     { id: "font", label: "Font" },
  //     { id: "image", label: "Image" },
  //     { id: "link", label: "Link" },
  //     { id: "script", label: "Script" },
  //   ],
  // },
  {
    title: "React.Js",
    collapsible: false,
    items: [
      { id: "setup", label: "setup" },
      { id: "axios", label: "axios-setup" },
      { id: "redux-setup", label: "redux-setup" },
      // { id: "compiler", label: "Next.js Compiler" },
      // { id: "browsers", label: "Supported Browsers" },
    ],
  },
  // {
  //   title: "Architecture",
  //   collapsible: false,
  //   items: [
  //     { id: "accessibility", label: "Accessibility" },
  //     { id: "fast-refresh", label: "Fast Refresh" },
  //     { id: "compiler", label: "Next.js Compiler" },
  //     { id: "browsers", label: "Supported Browsers" },
  //   ],
  // }
];


export const versions = [
  { label: "Latest", version: "16.1.4", active: true },
  { label: "Version 15", version: "15.5.9" },
  { label: "Version 14", version: "14.2.35" },
  { label: "Version 13", version: "13.5.11" },
];


  