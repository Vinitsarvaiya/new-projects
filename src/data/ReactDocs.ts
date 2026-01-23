export const reactDocs = [
    {
        slug: "react-setup",
        title: "React.js Setup (CRA + Vite + TypeScript)",
        description:
            "Step-by-step setup for creating a React app using CRA or Vite with TypeScript support.",
        sections: [
            {
                heading: "Create React App (Latest)",
                description:
                    "Use CRA when you want a quick, zero-config React setup.",
                codes: ["npx create-react-app@latest client"],
            },
            {
                heading: "Vite (React + TypeScript)",
                important: true,
                description:
                    "Vite is faster and lighter than CRA. Recommended for modern projects.",
                codes: [
                    "npm create vite@latest my-app",
                    "cd my-app",
                    "npm install",
                ],
            },
            {
                heading: "Fix TypeScript / build issues",
                description:
                    "If your project breaks due to TypeScript cache or dependency issues, run these commands.",
                codes: [
                    "npx tsc --version",
                    "rm -rf node_modules",
                    "rm -rf package-lock.json",
                    "rm -rf node_modules/.tmp",
                    "npm install",
                ],
            },
            {
                heading: "tsconfig.app.json",
                description:
                    "Recommended TypeScript configuration for strict and optimized builds.",
                block: true,
                code: `{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "target": "ES2022",
        "useDefineForClassFields": true,
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "types": ["vite/client"],
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true
    },
    "include": ["src"]
}`,
            },
            {
                heading: "eslint.config.js",
                description:
                    "Add this rules to your eslint.config.js to allow any in TypeScript.",
                block: true,
                code: `rules: {
    "@typescript-eslint/no-explicit-any": "off",
},`,
            },
        ],
    },
];

export const reactAxios = [
    {
      title: "Axios Setup",
      description:
        "Global Axios configuration with environment-based base URL and request/response interceptors.",
      sections: [
        {
          heading: "Install dependencies",
          description: "Axios HTTP client with TypeScript support.",
          codes: [
            "npm install axios",
            "npm install -D @types/axios",
          ],
        },
        {
          heading: "Environment Variables (Vite)",
          description:
            "Vite requires environment variables to start with VITE_. Restart dev server after adding.",
          codes: [
            "VITE_BACKEND_URL=http://localhost:5000",
          ],
        },
        {
          heading: "Create Axios Instance",
          description:
            "Centralized Axios instance with base URL and JSON headers.",
          block: true,
          code: `// src/api/axios.ts
  import axios, { type AxiosResponse } from "axios";
  
  /** Common API success response type */
  export type APISuccessResponse<T = undefined> = {
    error: boolean;
    message: string;
    data: T;
    response: AxiosResponse<T>;
  };
  
  /** Backend base URL */
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  
  if (!API_BASE_URL) {
    console.error("VITE_BACKEND_URL is missing");
  }
  
  /** Axios instance */
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });


   /**
   * All belowe code will be added here
   */

  
  export default api;`,
        },
        {
          heading: "Request Interceptor",
          description:
            "Automatically attach JWT token to every request.",
          block: true,
          code: `// Attach token to requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = \`Bearer \${token}\`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );`,
        },
        {
          heading: "Response Interceptor",
          description:
            "Handle unauthorized responses globally.",
          block: true,
          code: `// Handle 401 responses
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        // optional: window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );`,
        },
      ],
    },
  ];
  

export const reactRedux = [
    {
        title: "Redux Toolkit Setup",
        description:
            "Modern Redux setup using Redux Toolkit with async actions and slices.",
        sections: [
            {
                heading: "Install dependencies",
                description:
                    "Redux Toolkit simplifies Redux boilerplate and async logic.",
                codes: [
                    "npm install @reduxjs/toolkit react-redux",
                    "npm install -D @types/react-redux",
                ],
            },
            {
                heading: "Create Redux Store",
                description:
                    "Central store configuration using configureStore.",
                block: true,
                code: `import { configureStore } from "@reduxjs/toolkit";
    import authReducer from "./auth.reducer";
    
    export const store = configureStore({
        reducer: {
        auth: authReducer,
        },
    });`,
            },
        ],
    }
]