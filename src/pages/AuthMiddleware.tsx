// src/pages/AuthMiddleware.tsx
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const AuthMiddlewarePage = () => {
  return (
    <Layout>
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        Auth Middleware Setup (Node + Express + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Create middleware directory</p>
          <CopyableCode code="mkdir src/middleware" />
          <CopyableCode code="cd src/middleware" />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">Create auth.middleware.ts file</p>
          <CopyableCode code="touch auth.middleware.ts" />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">Install JWT dependency</p>
          <CopyableCode code="npm install jsonwebtoken" />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Create the middleware code</p>
          <CopyableCode
            block
            code={`import Jsonwebtoken from "jsonwebtoken";
import authService from "../services/auth.service"; // <-- Your auth service
import Handler from "../utils/handler"; // <-- Async handler utility

const authMiddleware = Handler(async (req, res, next) => {
  try {
    const authorization = req.header("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];

    const decodedToken: any = await Jsonwebtoken.verify(token, process.env.ATSECRETKEY);

    if (!decodedToken) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    // Replace this with your user validation function
    const isValidUser = await authService.isValidUser({ _id: decodedToken?.id });

    if (!isValidUser) {
      return res.status(404).json({ error: "Forbidden: Invalid token" });
    }

    const { role_id, ...rest }: any = isValidUser;
    delete decodedToken.iat;
    delete decodedToken.exp;

    req.user = {
      ...rest,
      role: role_id?.name, // <-- Customize based on your DB
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
});

export default authMiddleware;`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">Use middleware in your Express routes</p>
          <CopyableCode
            block
            code={`import express from "express";
import authMiddleware from "./middleware/auth.middleware";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

export default router;`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p className="mb-2">Start your server</p>
          <CopyableCode code="npm run dev" />
        </li>

      </ol>



       <h1 className="text-3xl font-bold text-indigo-400 mb-6 mt-16">
        User Routes Setup with Auth Middleware
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Create user router file</p>
          <CopyableCode code="touch src/routes/user.route.ts" />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">Add routes with Auth middleware</p>
          <CopyableCode
            block
            code={`import { Router } from "express";
import { changePasswordHandler, deleteUserHandler, getUserMeController, updateUserHandler } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import { upload } from "../utils/uploadImages";

const userRouter = Router();

// Get current user
userRouter.get("/me", authMiddleware, getUserMeController);

// Update user profile with optional avatar upload
userRouter.put("/", authMiddleware, upload.single("avatar"), updateUserHandler);

// Delete user
userRouter.post("/delete", authMiddleware, deleteUserHandler);

// Change password
userRouter.put("/change-password", authMiddleware, changePasswordHandler);

export default userRouter;`}
          />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">Combine all routes in a central route index</p>
          <CopyableCode
            block
            code={`import authtRouter from "../routes/auth.route";
import usertRouter from "../routes/user.route";
import appsProjectsRouter from "./apps.projects.route";
import channelRouter from "./channel.route";
import friendRequestRouter from "./friend-request.route";
import keywordRouter from "./keyword.route";
import messageRouter from "./message.router";
import webhookRouter from "./stripe-webhook.route";
import stripeRoutes from "./stripe.route";

export default {
  authtRouter,
  usertRouter,
  appsProjectsRouter,
  stripeRoutes,
  webhookRouter,
  keywordRouter,
  friendRequestRouter,
  messageRouter,
  channelRouter
};`}
          />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Use routes in your Express app</p>
          <CopyableCode
            block
            code={`import express from "express";
import routes from "./routes";

const app = express();

app.use("/auth", routes.authtRouter);
app.use("/user", routes.usertRouter);

// Add other routes similarly
app.use("/projects", routes.appsProjectsRouter);
app.use("/channel", routes.channelRouter);
// ... other routers

export default app;`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">Start your server</p>
          <CopyableCode code="npm run dev" />
        </li>

      </ol>
    </Layout>
  );
};

export default AuthMiddlewarePage;
