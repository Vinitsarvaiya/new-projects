import Layout from "../components/Layout";
import toast, { Toaster } from "react-hot-toast";

export const CopyableCode = ({
  code,
  block = false,
}: {
  code: string;
  block?: boolean;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="relative mt-3 w-full">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs hover:bg-gray-600 transition z-10"
      >
        Copy
      </button>

      <pre
        className={`w-full bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm ${
          block ? "" : "whitespace-nowrap"
        }`}
      >
        <code className="block w-full">{code}</code>
      </pre>
    </div>
  );
};

const ReactJS = () => {
  return (
    <Layout>
      <Toaster position="bottom-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        React.js Setup (CRA + Vite + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* CRA */}
        <li>
          Create React App (Latest)
          <CopyableCode code="npx create-react-app@latest client" />
        </li>

        {/* Vite */}
        <li>
          Vite (React + TypeScript – select defaults)
          <CopyableCode code="npm create vite@latest my-app" />
          <CopyableCode code="cd my-app" />
          <CopyableCode code="npm install" />
        </li>

        {/* Issues */}
        <li>
          If TypeScript / build issues
          <CopyableCode code="npx tsc --version" />
          <CopyableCode code="rm -rf node_modules" />
          <CopyableCode code="rm -rf package-lock.json" />
          <CopyableCode code="rm -rf node_modules/.tmp" />
          <CopyableCode code="npm install" />
          <CopyableCode code="rm -f node_modules/.tmp/tsconfig.app.tsbuildinfo" />
          <CopyableCode code="npx tsc --version" />
        </li>

        {/* tsconfig */}
        <li>
          <span className="font-semibold">tsconfig.app.json</span>
          <CopyableCode
            block
            code={`{
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
}`}
          />
        </li>

        {/* ESLint */}
        <li>
          ESLint – allow <code>any</code>
          <CopyableCode
            block
            code={`rules: {
  "@typescript-eslint/no-explicit-any": "off",
},`}
          />
        </li>

        {/* Redux */}
        <li>
          Redux Toolkit
          <CopyableCode code="npm install @reduxjs/toolkit react-redux" />
          <CopyableCode code="npm install -D @types/react-redux" />
        </li>

        {/* Axios */}
        <li>
          Axios
          <CopyableCode code="npm install axios" />
           <CopyableCode code="npm install -D @types/axios" />
        </li>

      </ol>


      <h1 className="text-3xl font-bold text-indigo-400 mb-6 mt-16">
        React.js Setup (CRA + Vite + TypeScript)
      </h1>

      <ol>

        <li>
  <span className="font-semibold">Redux Store Setup</span>

  <CopyableCode
    block
    code={`// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authantication.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`}
  />
</li>

<li>
  <span className="font-semibold">Wrap App with Redux Provider</span>

  <CopyableCode
    block
    code={`// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
`}
  />
</li>


<li>
  <span className="font-semibold">Auth Async Actions</span>

  <CopyableCode
    block
    code={`// src/store/actions/authantication.actions.ts
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
);
`}
  />
</li>


<li>
  <span className="font-semibold">Auth Slice</span>

  <CopyableCode
    block
    code={`// src/store/reducer/authantication.reducer.ts
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
export default authSlice.reducer;
`}
  />
</li>


<li>
  <span className="font-semibold">Auth Context</span>

  <CopyableCode
    block
    code={`// src/context/AuthContext.tsx
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

export const useAuth = () => useContext(AuthContext);
`}
  />
</li>


<li>
  <span className="font-semibold">Protected Routes</span>

  <CopyableCode
    block
    code={`// PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = () => {
  const { authUser, loading } = useAuth();
  if (loading) return null;
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
`}
  />
</li>
<li>
  <span className="font-semibold">Router Setup (Public & Private Routes)</span>

  <CopyableCode
    block
    code={`// src/router/index.tsx
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

export default router;
`}
  />
</li>


      </ol>


            <h1 className="text-3xl font-bold text-indigo-400 mb-6 mt-16">
       Axios
      </h1>

      <ol>
                <li>
          add .env if vite use vite at start
           <CopyableCode code="VITE_BACKEND_URL=http://localhost:5000" />
        </li>
<li>
  <span className="font-semibold">Axios Global Instance & Interceptors</span>

  <CopyableCode
    block
    code={`// src/api/axios.ts
import axios, { type AxiosResponse } from "axios";

/**
 * Common API success response type
 */
export type APISuccessResponse<T = undefined> = {
  error: boolean;
  message: string;
  data: T;
  response: AxiosResponse<T>;
};

/**
 * Backend base URL from environment variables
 * VITE_BACKEND_URL=http://localhost:5000
 */
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * - Attaches JWT token to Authorization header
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Handles unauthorized (401) responses
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
`}
  />
</li>


      </ol>

      <ol>
        {/* Step X */}
<li>
             <h1 className="text-3xl font-bold text-indigo-400 mb-6 mt-16">
       Manage profile image upload and removal:
      </h1>
  <CopyableCode
    block
    code={`// Reference for file input
const inputPhoto = useRef<HTMLInputElement | null>(null);

// State for selected image
const [selectedImage, setSelectedImage] = useState<File | string>(authUser?.avatar || "");

// Check valid image type
const isValidImageType = (file: File) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  return allowedImageTypes.includes(file.type);
};

// Check file size (up to 10MB)
const isFileSizeValid = (file: File, maxSizeMB: number) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// Upload handler
const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    if (!isValidImageType(file) || !isFileSizeValid(file, 10)) {
      Toast.error("Please use only jpg or png. Up to 10 MB");
      return;
    }
    setSelectedImage(file);
    setValue("avatar", file, { shouldDirty: true });
  }
};

// Remove handler
const removeImageHandler = () => {
  setSelectedImage("");
  setValue("avatar", "", { shouldDirty: true });
  if (inputPhoto.current) inputPhoto.current.value = "";
};

// File input element (hidden)
<input
  type="file"
  name="avatar"
  ref={inputPhoto}
  onChange={uploadImageHandler}
  style={{ display: "none" }}
  accept="image/png, image/jpeg, image/jpg"
/>

// Display selected image or initials
{selectedImage ? (
  <img src={typeof selectedImage === "string" ? selectedImage : URL.createObjectURL(selectedImage)} />
) : (
  <div>{authUser?.first_name?.charAt(0)}{authUser?.last_name?.charAt(0)}</div>
)}

// Upload and Remove buttons
<Button onClick={() => inputPhoto.current?.click()}>Upload</Button>
<Button onClick={removeImageHandler} disabled={!selectedImage}>Remove</Button>`}
  />
</li>

      </ol>
    </Layout>
  );
};

export default ReactJS;