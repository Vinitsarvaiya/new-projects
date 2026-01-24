export const nodeDocs = [
  {
    slug: "node-setup",
    title: "Node.js Setup (NODE + EXPRESS + TypeScript)",
    description:
      "Step-by-step setup for creating a Node app using Express with TypeScript support.",
    sections: [
      {
        heading: "Create Node App (Latest)",
        description:
          "Create backend directory and move into it.",
        codes: ["mkdir server",
            "cd server"],
      },
      {
        heading: "Initialize Node.js project",
        important: true,
        codes: ["npm init -y"]
      },
      {
        heading: "Install runtime dependencies with typescript",
        description:
          "Install required runtime dependencies in a TypeScript project with correct typing and configuration.",
        codes: [
          "npm install express cors dotenv",
          "npm install -D typescript ts-node-dev @types/node @types/express @types/cors",
        ],
      },
      {
        heading: "Initialize TypeScript and install TSX",
        description:
          "Initialize TypeScript and install TSX for fast, hassle-free TypeScript execution.",
        block: true,
        codes: [
          "npx tsc --init",
          "npm install --save-dev tsx",
        ],
      },
      {
        heading: "Update scripts in package.json",
        description:
          "Configure and update package.json scripts to run, build, and manage your application efficiently.",
        block: true,
        code: `{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "tsx watch index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^25.0.1",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  }
}
`,
      },
            {
        heading: "update tsconfig.json",
        description:
          "Update tsconfig.json to fine-tune TypeScript compiler settings.",
        block: true,
        code: `{
  "compilerOptions": {
    "module": "NodeNext",
    "target": "ES2020",
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true
  }
}`,
      },
      {
        heading: "Install Dependency",
        description:
          "Install the required dependency for the project.",
        block: true,
        codes: [
          "npm i",
        ],
      },
                  {
        heading: "Create Express server in index.ts",
        description:
          "Initialize an Express server in index.ts as the main application entry point.",
        block: true,
        code: `import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port", process.env.PORT || 5000);
});`,
      },
      {
        heading: "start the server",
        description:
          "Launch the server and begin handling requests.",
        block: true,
        codes: [
          "npm run dev",
        ],
      },
    ],
  },
];



export const authMiddlewareDocs = [
  {
    slug: "auth-middleware",
    title: "Auth Middleware Setup (Node + Express + TypeScript)",
    description:
      "Step-by-step guide to creating JWT-based authentication middleware and protecting routes in a Node.js application using Express and TypeScript.",
    sections: [
      {
        heading: "Create middleware directory",
        description:
          "Create a dedicated middleware folder to organize authentication logic.",
          block: true,
        codes: [
          "mkdir src/middleware",
          "cd src/middleware",
        ],
      },
      {
        heading: "Create auth middleware file",
        description:
          "Create a TypeScript file for handling authentication logic.",
          block: true,
        codes: ["touch auth.middleware.ts"],
      },
      {
        heading: "Install JWT dependency",
        description:
          "Install JSON Web Token library along with TypeScript type definitions.",
          block: true,
        codes: [
          "npm install jsonwebtoken",
          "npm i -D @types/jsonwebtoken",
        ],
      },
      {
        heading: "Add environment variables",
        description:
          "Add access token and refresh token secret keys to your environment configuration.",
        block: true,
        codes: [
          "ATSECRETKEY=70ddb3fae600f0dfbd4a3448d9827c933d3f740c60af104417a41b5fa7c47b46",
          "RTSECRETKEY=73066c3ec12279165da01d6fc1215ee011f4df2108f6005b2a92e4d3b796a330",
        ],
      },
      {
        heading: "Create authentication middleware",
        description:
          "Verify JWT tokens, validate users, and attach user data to the request object.",
        block: true,
        code: `import Jsonwebtoken from "jsonwebtoken";
import authService from "../services/auth.service";
import Handler from "../utils/handler";

const authMiddleware = Handler(async (req, res, next) => {
  try {
    const authorization = req.header("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];
    const ATSECRETKEY = process.env.ATSECRETKEY;

    if (!ATSECRETKEY) {
      return res.status(500).json({ error: "Server issue" });
    }

    const decodedToken: any = Jsonwebtoken.verify(token, ATSECRETKEY);

    if (!decodedToken) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    const isValidUser = await authService.isValidUser({ _id: decodedToken.id });

    if (!isValidUser) {
      return res.status(404).json({ error: "Forbidden: Invalid token" });
    }

    const { role_id, ...rest }: any = isValidUser;
    delete decodedToken.iat;
    delete decodedToken.exp;

    req.user = {
      ...rest,
      role: role_id?.name,
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
});

export default authMiddleware;`,
      },
      {
        heading: "Use middleware in Express routes",
        description:
          "Protect routes by applying the authentication middleware.",
        block: true,
        code: `import express from "express";
import authMiddleware from "./middleware/auth.middleware";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

export default router;`,
      },
      {
        heading: "User routes setup with auth middleware",
        description:
          "Apply authentication middleware to user-related routes.",
        block: true,
        code: `import { Router } from "express";
import {
  changePasswordHandler,
  deleteUserHandler,
  getUserMeController,
  updateUserHandler,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import { upload } from "../utils/uploadImages";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getUserMeController);
userRouter.put("/", authMiddleware, upload.single("avatar"), updateUserHandler);
userRouter.post("/delete", authMiddleware, deleteUserHandler);
userRouter.put("/change-password", authMiddleware, changePasswordHandler);

export default userRouter;`,
      },
      {
        heading: "Combine routes in a central index",
        description:
          "Export and manage all application routes from a single place.",
        block: true,
        code: `import authtRouter from "../routes/auth.route";
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
  channelRouter,
};`,
      },
      {
        heading: "Use routes in Express app",
        description:
          "Register all routes in your main Express application.",
        block: true,
        code: `import express from "express";
import routes from "./routes";

const app = express();

app.use("/auth", routes.authtRouter);
app.use("/user", routes.usertRouter);
app.use("/projects", routes.appsProjectsRouter);
app.use("/channel", routes.channelRouter);

export default app;`,
      },
      {
        heading: "Async handler utility",
        description:
          "Create a reusable utility to handle async errors in controllers and middleware.",
        block: true,
        code: `import type { NextFunction, Request, Response } from "express";

export default function (fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}`,
      },
      {
        heading: "Start the server",
        description:
          "Run the development server and test protected routes.",
        codes: ["npm run dev"],
      },
    ],
  },
];


export const fileUploadDocs = [
  {
    slug: "file-upload",
    title: "File Upload Setup (Cloudinary + Multer + TypeScript)",
    description:
      "Step-by-step guide to handling file uploads using Multer and Cloudinary in a Node.js application with TypeScript support.",
    sections: [
      {
        heading: "Install required packages",
        description:
          "Install Cloudinary and Multer along with TypeScript type definitions.",
        codes: [
          "npm install cloudinary multer",
          "npm install -D @types/multer",
        ],
      },
      {
        heading: "Add Cloudinary environment variables",
        description:
          "Configure Cloudinary credentials in your environment file.",
        block: true,
        codes: [
          "CLOUD_NAMNE=your_cloud_name",
          "CLOUD_API_KEY=your_api_key",
          "CLOUD_API_SECRET=your_api_secret",
        ],
      },
      {
        heading: "Configure Cloudinary",
        description:
          "Initialize and configure Cloudinary using environment variables.",
        block: true,
        code: `import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAMNE as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

export default cloudinary;`,
      },
      {
        heading: "Setup Multer local storage",
        description:
          "Configure Multer to store uploaded files locally before processing.",
        block: true,
        code: `import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, \`\${file.fieldname}_\${Date.now()}_\${file.originalname}\`);
  },
});`,
      },
      {
        heading: "Add file filter and size limit",
        description:
          "Restrict file types and limit upload size for security and performance.",
        block: true,
        code: `const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});`,
      },
      {
        heading: "Upload file to Cloudinary",
        description:
          "Upload files from local storage to Cloudinary and return secure URLs.",
        block: true,
        code: `import cloudinary from "./cloudinary";

export const cloudinaryImageUploadMethod = async (
  file: string
): Promise<{ res: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto" },
      (err, result) => {
        if (err) return reject(err);
        resolve({ res: result?.secure_url });
      }
    );
  });
};`,
      },
      {
        heading: "Delete image from Cloudinary",
        description:
          "Remove uploaded images from Cloudinary using the public ID.",
        block: true,
        code: `export const deleteImageFromCloudinary = async (
  imageUrl: string
) => {
  const publicId =
    imageUrl?.split("/").pop()?.split(".")[0] ?? "";

  if (!publicId) throw new Error("Invalid image URL");

  return cloudinary.uploader.destroy(publicId);
};`,
      },
      {
        heading: "Convert file or URL to Base64",
        description:
          "Convert local files or remote URLs into Base64 format.",
        block: true,
        code: `import fs from "fs";

export async function convertToBase64(
  input: string
): Promise<string> {
  if (fs.existsSync(input)) {
    const buffer = fs.readFileSync(input);
    return buffer.toString("base64");
  }

  if (!input.startsWith("http")) {
    throw new Error("Invalid path or URL");
  }

  const response = await fetch(input);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}`,
      },
      {
        heading: "Use upload middleware in route",
        description:
          "Apply Multer upload middleware to protected routes.",
        block: true,
        code: `import { upload } from "../utils/upload";
import { authMiddleware } from "../middleware/auth";

userRouter.put(
  "/",
  authMiddleware,
  upload.single("avatar"),
  updateUserHandler
);`,
      },
      {
        heading: "Complete upload utility file",
        description:
          "Full implementation including Cloudinary config, Multer setup, upload, delete, and conversion utilities.",
        block: true,
        code: `import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAMNE as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

export async function cloudinaryUpload(image: string): Promise<any> {
  return cloudinary.uploader.upload(image);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, \`\${file.fieldname}_\${Date.now()}_\${file.originalname}\`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});

export const cloudinaryImageUploadMethod = async (
  file: string
): Promise<{ res: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto" },
      (err, result) => {
        if (err) return reject(err);
        resolve({ res: result?.secure_url });
      }
    );
  });
};

export const deleteImageFromCloudinary = async (
  imageUrl: string
): Promise<void> => {
  const publicId = imageUrl.split("/").pop()?.split(".")[0];

  if (!publicId) throw new Error("Invalid image URL");

  await cloudinary.uploader.destroy(publicId);
};

export const deleteFileFromCloudinary = async (
  fileUrl: string
): Promise<void> => {
  const publicId = fileUrl.split("/").pop()?.split(".")[0];

  if (!publicId) throw new Error("Invalid file URL");

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
};

export async function convertToBase64(
  input: string
): Promise<string> {
  if (fs.existsSync(input)) {
    const buffer = fs.readFileSync(input);
    return buffer.toString("base64");
  }

  if (!input.startsWith("http")) {
    throw new Error("Invalid file path or URL");
  }

  const response = await fetch(input);
  if (!response.ok) {
    throw new Error("Failed to fetch file");
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}`,
      },
      {
        heading: "Use upload in controller",
        description:
          "Handle file upload, Cloudinary replacement, and cleanup inside controller logic.",
        block: true,
        code: `userRouter.put("/", authMiddleware,upload.single("avatar"),updateUserHandler);`,
      },
      {
        heading: "Update user controller example",
        description:
          "Complete example showing avatar upload, replacement, and deletion.",
        block: true,
        code: `export const updateUserHandler: RequestHandler = Handler(
  async (req: any, res: Response) => {
    try {
      const userId = req?.user?._id;
      const avatarFile = req?.file;
      const updates = req.body;

      if (!userId) {
        throw new Error("User ID is missing.");
      }

      const user: any = await userService.findUser({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }

      if (avatarFile) {
        if (user.avatar) {
          await deleteImageFromCloudinary(user.avatar);
        }

        const { res: uploadedUrl } =
          await cloudinaryImageUploadMethod(avatarFile.path);
        unlinkSync(avatarFile.path);
        updates.avatar = uploadedUrl;
      } else if (!avatarFile && !("avatar" in updates) && user.avatar) {
        await deleteImageFromCloudinary(user.avatar);
        updates.avatar = "";
      }

      const updatedUser = await userService.updateUser(
        userId.toString(),
        updates
      );

      return res.status(200).json({
        data: updatedUser,
        message: "Profile updated successfully",
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Something went wrong" });
    }
  }
);`,
      },
    ],
  },
];

