    export const reactDocs = [
        {
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
        "target": "ES2022",
        "strict": true,
        "noEmit": true,
        "jsx": "react-jsx"
        },
        "include": ["src"]
    }`,
                },
            ],
        },

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
        },
    ];
