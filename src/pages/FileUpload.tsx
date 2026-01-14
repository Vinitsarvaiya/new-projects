import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const FileUpload = () => {
    return (
        <Layout>
            <Toaster position="bottom-right" reverseOrder={false} />

            <h1 className="text-3xl font-bold text-indigo-400 mb-6">
                File Upload Setup (Cloudinary + Multer + TypeScript)
            </h1>

            <ol className="list-decimal ml-6 space-y-4">

                {/* Step 1 */}
                <li>
                    <p className="mb-2">Install required packages</p>
                    <CopyableCode code="npm install cloudinary multer" />
                    <CopyableCode code="npm install -D @types/multer" />
                </li>

                {/* Step 2 */}
                <li>
                    <p className="mb-2">
                        Add Cloudinary credentials to{" "}
                        <code className="bg-gray-800 px-1 rounded">.env</code>
                    </p>
                    <CopyableCode
                        block
                        code={`CLOUD_NAMNE=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret`}
                    />
                </li>

                {/* Step 3 */}
                <li>
                    <p className="mb-2">
                        Configure Cloudinary{" "}
                        <code className="bg-gray-800 px-1 rounded">utils/cloudinary.ts</code>
                    </p>
                    <CopyableCode
                        block
                        code={`import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAMNE as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

export default cloudinary;`}
                    />
                </li>

                {/* Step 4 */}
                <li>
                    <p className="mb-2">Setup Multer local storage</p>
                    <CopyableCode
                        block
                        code={`import multer from "multer";
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
});`}
                    />
                </li>

                {/* Step 5 */}
                <li>
                    <p className="mb-2">Add file filter & size limit</p>
                    <CopyableCode
                        block
                        code={`const fileFilter = (
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
});`}
                    />
                </li>

                {/* Step 6 */}
                <li>
                    <p className="mb-2">Upload file to Cloudinary</p>
                    <CopyableCode
                        block
                        code={`import cloudinary from "./cloudinary";

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
};`}
                    />
                </li>

                {/* Step 7 */}
                <li>
                    <p className="mb-2">Delete image from Cloudinary</p>
                    <CopyableCode
                        block
                        code={`export const deleteImageFromCloudinary = async (
  imageUrl: string
) => {
  const publicId =
    imageUrl?.split("/").pop()?.split(".")[0] ?? "";

  if (!publicId) throw new Error("Invalid image URL");

  return cloudinary.uploader.destroy(publicId);
};`}
                    />
                </li>

                {/* Step 8 */}
                <li>
                    <p className="mb-2">Convert file or URL to Base64</p>
                    <CopyableCode
                        block
                        code={`import fs from "fs";

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
}`}
                    />
                </li>

                {/* Step 9 */}
                <li>
                    <p className="mb-2">Use upload middleware in route</p>
                    <CopyableCode
                        block
                        code={`import { upload } from "../utils/upload";
import { authMiddleware } from "../middleware/auth";

userRouter.put(
  "/",
  authMiddleware,
  upload.single("avatar"),
  updateUserHandler
);`}
                    />
                </li>


                <li>
                    <p className="mb-2">full pages</p>
                    <CopyableCode
                        block
                        code={`import { v2 as cloudinary } from "cloudinary";
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
}`}
                    />

                </li>

                <li>
                    <p className="mb-2">used on apis</p>
                    <CopyableCode
                        block
                        code={`userRouter.put("/", authMiddleware,upload.single("avatar"),updateUserHandler);`}
                    />
                </li>

                <li>
                    <p className="mb-2">used on apis</p>
                    <CopyableCode
                        block
                        code={`export const updateUserHandler: RequestHandler = Handler(
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

                const { res: uploadedUrl } = await cloudinaryImageUploadMethod(avatarFile.path);
                unlinkSync(avatarFile.path);
                updates.avatar = uploadedUrl;
            } else if (!avatarFile && !("avatar" in updates) && user.avatar) {
                await deleteImageFromCloudinary(user.avatar);
                updates.avatar = "";
            }

            const updatedUser = await userService.updateUser(userId.toString(), updates);

            return res.status(200).json({
                data: updatedUser,
                message: "Profile updated successfully",
            });
        } catch (error: any) {
            console.error("Update Error:", error.message);
            return res.status(500).json({ error: error.message || "Something went wrong" });
        }
    }
);`}
                    />

                </li>

            </ol>
        </Layout>
    );
};

export default FileUpload;
