// src/pages/UserHook.tsx
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const UserHookDoc = () => {
  return (
    <Layout>
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        useUser Hook Documentation (React + Redux + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">
            Import required modules and types:
          </p>
          <CopyableCode
            block
            code={`import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import type { IUser } from "@/types/user";
import { deleteUserAccountAction, updateUserAction, updateUserPasswordAction } from "@/store/actions/user.action";
import { clearMessage, errorMessage } from "@/store/reducers/user.reducer";
import { SettingContext } from "@/context/SettingContext";
import { useContext } from "react";`}
          />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">
            Create the hook function and access Redux state and dispatch:
          </p>
          <CopyableCode
            block
            code={`const useUser = () => {
  const { loading, message, error, apiName, alertType } = useSelector<RootState, any>((state) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const context = useContext(SettingContext);

  if (!context) throw new Error("useUser must be used within an SettingProvider");

  const { activeTab, setactiveTab } = context;`}
          />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">
            Define <code className="bg-gray-800 px-1 rounded">updateUser</code> function using FormData:
          </p>
          <CopyableCode
            block
            code={`const updateUser = async (body: IUser) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (key === "avatar" && value instanceof File) formData.append("avatar", value);
    else if (key === "avatar" && typeof value === "string") formData.append(key, String(value));
    else if (key !== "avatar" && value) formData.append(key, String(value));
  }
  return await dispatch(updateUserAction(formData));
};`}
          />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">
            Define <code className="bg-gray-800 px-1 rounded">changePassword</code> function:
          </p>
          <CopyableCode
            block
            code={`const changePassword = async (body: { password: string }) => {
  return await dispatch(updateUserPasswordAction(body));
};`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">
            Define <code className="bg-gray-800 px-1 rounded">deleteAccount</code> function:
          </p>
          <CopyableCode
            block
            code={`const deleteAccount = async (body: { password: string }) => {
  return await dispatch(deleteUserAccountAction(body));
};`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p className="mb-2">
            Define alert management functions:
          </p>
          <CopyableCode
            block
            code={`const closeAlert = () => dispatch(clearMessage());
const errorAlert = (body: any) => dispatch(errorMessage(body));`}
          />
        </li>

        {/* Step 7 */}
        <li>
          <p className="mb-2">
            Return all functions, state, and context from the hook:
          </p>
          <CopyableCode
            block
            code={`return {
  updateUser,
  closeAlert,
  errorAlert,
  changePassword,
  deleteAccount,
  setactiveTab,
  loading,
  message,
  error,
  apiName,
  alertType,
  activeTab
};
};

export default useUser;`}
          />
        </li>

         <li>
          <p className="mb-2">
            full page code
          </p>
          <CopyableCode
            block
            code={`import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

import type { IUser } from "@/types/user";
import { deleteUserAccountAction, updateUserAction, updateUserPasswordAction } from "@/store/actions/user.action";
import { clearMessage, errorMessage } from "@/store/reducers/user.reducer";
import { SettingContext } from "@/context/SettingContext";
import { useContext } from "react";

const useUser = () => {

    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector<RootState, any>((state) => state.user);

    const dispatch: AppDispatch = useDispatch();
    const context = useContext(SettingContext);

    if (!context) {
        throw new Error("useUser must be used within an SettingProvider");
    }

    const {
        activeTab,
        setactiveTab
    } = context;

    const updateUser = async (body: IUser) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(body)) {
            if (key === "avatar" && value instanceof File) {
                formData.append("avatar", value);
            } else if (key === "avatar" && typeof value === "string") {
                formData.append(key, String(value));
            } else if (key !== "avatar" && value) {
                formData.append(key, String(value));
            }
        }

        return await dispatch(updateUserAction(formData));
    };

    const changePassword = async (body: { password: string }) => {
        return await dispatch(updateUserPasswordAction(body));
    };

    const deleteAccount = async (body: { password: string }) => {
        return await dispatch(deleteUserAccountAction(body));
    };

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    const errorAlert = (body: any) => {
        dispatch(errorMessage(body));
    };

    return {
        updateUser,
        closeAlert,
        errorAlert,
        changePassword,
        deleteAccount,
        setactiveTab,
        loading,
        message,
        error,
        apiName,
        alertType,
        activeTab
    };
};

export default useUser;`}
          />
        </li>

      </ol>
    </Layout>
  );
};

export default UserHookDoc;
