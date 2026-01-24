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
        important: true,
        description:
          "Central store configuration using configureStore.",
        block: true,
        code: `import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authantication.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
      },
      {
        heading: "Create Auth Async Actions( Action paege for redux)",
        description:
          "here is paths --> src/store/actions/authantication.actions.ts",
        block: true,
        code: `// src/store/actions/authantication.actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import Toast from "../../components/toast";
import { ToastMessages } from "../../constants/toasts";

export const SignUpAction = createAsyncThunk(
  "/api/authentication/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await API.post("/api/authentication/signup", userData);
      Toast.success(ToastMessages.SUCCESS.AUTH.ACTION.SIGNUP_SUCCESS);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Signup failed"
      );
    }
  }
);`,
      },
      {
        heading: "Create Auth Slice Reducers( Reducers paege for redux)",
        description:
          "here is paths --> src/store/reducer/authantication.reducer.ts",
        block: true,
        code: `// src/store/reducer/authantication.reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { SignUpAction } from "../actions/authantication.actions";

const initialState = {
  loading: {
    signUp: false,
  },
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignUpAction.pending, (state) => {
      state.loading.signUp = true;
    });
    builder.addCase(SignUpAction.fulfilled, (state, action) => {
      state.loading.signUp = false;
      state.message = action.payload.message;
    });
    builder.addCase(SignUpAction.rejected, (state, action) => {
      state.loading.signUp = false;
      state.error = action.error.message;
    });
  },
});

export const { clearMessage, clearError } = authSlice.actions;
export default authSlice.reducer;`,
      },
    ],
  },
  {
    title: "Redux Auth Context",
    description:
      "Setip of Context API for authentication state management.",
    sections: [
      {
        heading: "Install dependencies",
        description:
          "here is paths --> src/context/AuthContext.tsx",
        block: true,
        code: `// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import API from "@/libs/axios";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/user/me")
      .then(res => setAuthUser(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, loading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`
      },
    ],
  }
]

export const reactRouter = [
  {
    title: "Router Setup (Public & Private Routes)",
    description:
      "Controls public and private routes, allowing access only to authenticated users while keeping navigation clean and secure.",
    sections: [
      {
        heading: "Create Route handler page",
        description:
          "src/router/index.tsx",
        block: true,
        code: `// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";

// Layouts
import PublicRoute from "@/layout/PublicLayout";
import PrivateRoute from "@/layout/PrivateLayout";

// Public Pages
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import VerifyEmail from "@/pages/auth/verify-mail";

// Private Pages
import Dashboard from "@/pages/dashboard";
import Project from "@/pages/project/project";
import CreateProject from "@/pages/project/createProject";
import Overview from "@/views/overview/Overview";
import Keywords from "@/pages/keywords/keywords";
import Settings from "@/pages/settings/settings";
import Billings from "@/pages/settings/billings/billings";

// Common
import NotFoundPage from "@/pages/notFound";

const router = createBrowserRouter([
  {
    // Public routes (no authentication required)
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/account/reset/password/:token", element: <ResetPassword /> },
      { path: "/verify/:token", element: <VerifyEmail /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    // Private routes (authentication required)
    element: <PrivateRoute />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/app-project", element: <Project /> },
      { path: "/app-project/create", element: <CreateProject /> },
      { path: "/app-project/view/:projectId", element: <Overview /> },
      { path: "/keywords", element: <Keywords /> },
      { path: "/settings", element: <Settings /> },
      { path: "/settings/billing", element: <Billings /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;`,
      },
    ],
  },
];