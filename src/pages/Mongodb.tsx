import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const MongoDB = () => {
  return (
    <Layout>
        <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        MongoDB Setup (Mongoose + Node.js)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Install Mongoose</p>
          <CopyableCode code="npm install mongoose" />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">Create <code className="bg-gray-800 px-1 rounded">.env</code> file and add MongoDB URL</p>
          <CopyableCode
            block
            code={`MONGODB_DATABASE_URL=mongodb://localhost:27017/wiuu`}
          />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">
            Create MongoDB connection file
            <code className="bg-gray-800 px-1 rounded mx-1">/config/db.ts</code>
          </p>

          <CopyableCode
            block
            code={`import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  const dbUrl = process.env.MONGODB_DATABASE_URL;

  if (!dbUrl) {
    throw new Error("❌ MONGODB_DATABASE_URL is missing in .env file");
  }

  try {
    await mongoose.connect(dbUrl);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;`}
          />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Call database connection in <code className="bg-gray-800 px-1 rounded">index.ts</code></p>

          <CopyableCode
            block
            code={`import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB connected 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});`}
          />
        </li>

      </ol>


            <h1 className="text-3xl font-bold text-indigo-400 mb-6 mt-10">
        MongoDB User Schema (Mongoose + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Import required Mongoose types</p>
          <CopyableCode
            block
            code={`import mongoose, { Schema, Document, Types } from "mongoose";`}
          />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">Create TypeScript interface</p>
          <CopyableCode
            block
            code={`export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified?: boolean;
  deletedAt?: Date | null;

  // relations
  posts?: Types.ObjectId[];
  roles?: Types.ObjectId[];
  profile?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}`}
          />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">Define User schema fields</p>
          <CopyableCode
            block
            code={`const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    emailVerified: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);`}
          />
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Add ObjectId relations</p>
          <CopyableCode
            block
            code={`// One-to-Many
UserSchema.add({
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

// Many-to-Many
UserSchema.add({
  roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
});

// One-to-One
UserSchema.add({
  profile: { type: Schema.Types.ObjectId, ref: "profile" },
});`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">Create unique email index with soft delete support</p>
          <CopyableCode
            block
            code={`UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { deletedAt: null }
  }
);`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p className="mb-2">Create and export User model</p>
          <CopyableCode
            block
            code={`const User = mongoose.model<IUser>("user", UserSchema);

export default User;`}
          />
        </li>

        {/* Step 7 */}
        <li>
          <p className="mb-2">Populate relations example</p>
          <CopyableCode
            block
            code={`User.findById(userId)
  .populate("posts")
  .populate("roles")
  .populate("profile");`}
          />
        </li>

        {/* Step 8 */}
        <li>
          <p className="mb-2">Soft delete user example</p>
          <CopyableCode
            block
            code={`await User.findByIdAndUpdate(userId, {
  deletedAt: new Date()
});`}
          />
        </li>

         <li>
          <p className="mb-2">full page code</p>
          <CopyableCode
            block
            code={`// src/models/User.ts
import mongoose, { Schema, Document, Types } from "mongoose";

// TypeScript interface for User
export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified?: boolean;
  deletedAt?: Date | null;

  // ObjectId relations
  profile?: Types.ObjectId;        // One-to-One
  roles?: Types.ObjectId[];        // Many-to-Many
  posts?: Types.ObjectId[];        // One-to-Many

  createdAt: Date;
  updatedAt: Date;
}

// User schema definition
const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },

    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },

    emailVerified: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    // Relations
    profile: { type: Schema.Types.ObjectId, ref: "profile" }, // One-to-One
    roles: [{ type: Schema.Types.ObjectId, ref: "role" }],    // Many-to-Many
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],    // One-to-Many
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Unique email index (only for non-deleted users)
UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { deletedAt: null },
  }
);

// User model
const User = mongoose.model<IUser>("user", UserSchema);

export default User;

// Example populate usage:
// User.findById(userId)
//   .populate("profile")
//   .populate("roles")
//   .populate("posts");

// Example soft delete:
// await User.findByIdAndUpdate(userId, { deletedAt: new Date() });

// Restore soft deleted user:
// await User.findByIdAndUpdate(userId, { deletedAt: null });
`}
          />
        </li>

      </ol>
    </Layout>
  );
};

export default MongoDB;
