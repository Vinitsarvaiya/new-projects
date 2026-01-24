export const mongoDBDocs = [
  {
    slug: "mongodb-setup",
    title: "MongoDB Setup (Mongoose + Node.js + TypeScript)",
    description:
      "Complete guide to setting up MongoDB with Mongoose in a Node.js application, including database connection, environment configuration, and user schema design with TypeScript.",
    sections: [
      {
        heading: "Install Mongoose",
        description:
          "Install Mongoose to interact with MongoDB using an elegant schema-based solution.",
        codes: ["npm install mongoose"],
      },
      {
        heading: "Create environment variables",
        description:
          "Create a .env file and add your MongoDB connection URL.",
        block: true,
        codes: [
          "MONGODB_DATABASE_URL=mongodb://localhost:27017/wiuu",
        ],
      },
      {
        heading: "Create MongoDB connection file",
        description:
          "Create a reusable MongoDB connection utility using Mongoose.",
        block: true,
        code: `import mongoose from "mongoose";

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

export default connectDB;`,
      },
      {
        heading: "Connect MongoDB in index.ts",
        description:
          "Initialize MongoDB connection when the server starts.",
        block: true,
        code: `import express from "express";
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
});`,
      },
    ],
  },
  {
    slug: "mongodb-user-schema",
    title: "MongoDB User Schema (Mongoose + TypeScript)",
    description:
      "Learn how to design a scalable User schema using Mongoose with TypeScript, including relations, indexes, and soft delete support.",
    sections: [
      {
        heading: "Import Mongoose types",
        description:
          "Import required Mongoose and TypeScript types.",
        block: true,
        code: `import mongoose, { Schema, Document, Types } from "mongoose";`,
      },
      {
        heading: "Create User interface",
        description:
          "Define a TypeScript interface for strong typing and better developer experience.",
        block: true,
        code: `export interface IUser extends Document {
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
}`,
      },
      {
        heading: "Define User schema",
        description:
          "Create the User schema with timestamps and soft delete support.",
        block: true,
        code: `const UserSchema = new Schema(
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
);`,
      },
      {
        heading: "Add ObjectId relationships",
        description:
          "Define one-to-one, one-to-many, and many-to-many relationships.",
        block: true,
        code: `// One-to-Many
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
});`,
      },
      {
        heading: "Create unique email index",
        description:
          "Ensure unique email addresses while supporting soft deletes.",
        block: true,
        code: `UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { deletedAt: null },
  }
);`,
      },
      {
        heading: "Create and export User model",
        description:
          "Compile and export the User model.",
        block: true,
        code: `const User = mongoose.model<IUser>("user", UserSchema);

export default User;`,
      },
      {
        heading: "Populate relations example",
        description:
          "Fetch related documents using populate.",
        block: true,
        code: `User.findById(userId)
  .populate("posts")
  .populate("roles")
  .populate("profile");`,
      },
      {
        heading: "Soft delete user",
        description:
          "Soft delete a user by setting the deletedAt field.",
        block: true,
        code: `await User.findByIdAndUpdate(userId, {
  deletedAt: new Date(),
});`,
      },
      {
        heading: "Full User model example",
        description:
          "Complete User schema with relations, indexes, and examples.",
        block: true,
        code: `// src/models/User.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified?: boolean;
  deletedAt?: Date | null;

  profile?: Types.ObjectId;
  roles?: Types.ObjectId[];
  posts?: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },

    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },

    emailVerified: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    profile: { type: Schema.Types.ObjectId, ref: "profile" },
    roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
);

const User = mongoose.model<IUser>("user", UserSchema);

export default User;`,
      },
    ],
  },
];


export const postgresPrismaDocs = [
  {
    slug: "postgres-prisma-workflow",
    title: "PostgreSQL + Prisma Workflow",
    description:
      "End-to-end workflow for setting up PostgreSQL with Prisma, configuring database access, managing migrations, and performing CRUD operations using Prisma Client.",
    sections: [
      {
        heading: "Open pgAdmin and connect to PostgreSQL",
        description:
          "Open pgAdmin and connect to your PostgreSQL server.",
      },
      {
        heading: "Find PostgreSQL username",
        description:
          "Navigate to Servers → Your Server → Login/Group Roles. The default username is usually postgres.",
      },
      {
        heading: "Reset PostgreSQL password (if unknown)",
        description:
          "Update the postgres user password using pgAdmin.",
        block: true,
        codes: [
          "Right-click postgres",
          "Click Properties",
          "Go to Definition",
          "Set password: 123",
          "Click Save",
        ],
      },
      {
        heading: "Find database name",
        description:
          "Locate your database under Servers → Your Server → Databases.",
        block: true,
        codes: ["Example: mydb"],
      },
      {
        heading: "Configure DATABASE_URL",
        description:
          "Add the PostgreSQL connection string to your .env file.",
        block: true,
        code: `DATABASE_URL="postgresql://postgres:123@localhost:5432/mydb?schema=public"`,
      },
      {
        heading: "Verify database connection",
        description:
          "Test the PostgreSQL connection using the psql CLI.",
        block: true,
        code: `psql "postgresql://postgres:123@localhost:5432/mydb"`,
      },
      {
        heading: "Install Prisma",
        description:
          "Install Prisma ORM and Prisma Client.",
        codes: ["npm install prisma @prisma/client"],
      },
      {
        heading: "Initialize Prisma",
        description:
          "Create Prisma configuration and schema files.",
        codes: ["npx prisma init"],
      },
      {
        heading: "Update Prisma datasource",
        description:
          "Configure PostgreSQL as the datasource in Prisma schema.",
        block: true,
        code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`,
      },
      {
        heading: "Create User model",
        description:
          "Define the initial User model in Prisma schema.",
        block: true,
        code: `model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  createdAt DateTime @default(now())
}`,
      },
      {
        heading: "Run initial migration",
        description:
          "Create database tables from Prisma schema.",
        codes: ["npx prisma migrate dev --name init"],
      },
      {
        heading: "Generate Prisma client",
        description:
          "Generate Prisma Client after schema changes.",
        codes: ["npx prisma generate"],
      },
      {
        heading: "Insert a user",
        description:
          "Create a new user using Prisma Client.",
        block: true,
        code: `import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    firstName: "Vinit",
    lastName: "Sarvaiya",
    email: "vinit@example.com",
  },
});

console.log(user);`,
      },
      {
        heading: "Query all users",
        description:
          "Fetch all users from the database.",
        block: true,
        code: `const users = await prisma.user.findMany();
console.log(users);`,
      },
      {
        heading: "Update Prisma schema",
        description:
          "Add a new optional field to the User model.",
        block: true,
        code: `model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  age       Int?
  createdAt DateTime @default(now())
}`,
      },
      {
        heading: "Apply schema changes",
        description:
          "Run migration after updating Prisma schema.",
        codes: ["npx prisma migrate dev --name add-age-field"],
      },
      {
        heading: "Create user with new field",
        description:
          "Insert a user including the new age field.",
        block: true,
        code: `const user = await prisma.user.create({
  data: {
    firstName: "Vinit",
    lastName: "Sarvaiya",
    email: "vinit2@example.com",
    age: 28,
  },
});

console.log(user);`,
      },
      {
        heading: "Select specific fields",
        description:
          "Query a user with selected fields only.",
        block: true,
        code: `const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: { firstName: true, email: true, age: true },
});

console.log(user);`,
      },
      {
        heading: "Include related records",
        description:
          "Fetch a user along with related posts.",
        block: true,
        code: `const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
});

console.log(userWithPosts);`,
      },
      {
        heading: "Update a user",
        description:
          "Update an existing user record.",
        block: true,
        code: `const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { age: 29 },
});

console.log(updatedUser);`,
      },
      {
        heading: "Upsert user",
        description:
          "Update if user exists, otherwise create a new one.",
        block: true,
        code: `const upsertUser = await prisma.user.upsert({
  where: { email: "vinit@example.com" },
  update: { age: 30 },
  create: {
    firstName: "Vinit",
    lastName: "Sarvaiya",
    email: "vinit@example.com",
    age: 30,
  },
});

console.log(upsertUser);`,
      },
      {
        heading: "Delete records",
        description:
          "Delete single or multiple users.",
        block: true,
        code: `await prisma.user.delete({ where: { id: 1 } });

await prisma.user.deleteMany({
  where: { age: { lt: 18 } },
});`,
      },
      {
        heading: "Disconnect Prisma client",
        description:
          "Always disconnect Prisma Client after operations.",
        block: true,
        code: `await prisma.$disconnect();`,
      },
    ],
  },
];

export const mongoCommandsDocs = [
  {
    slug: "mongodb-commands-aggregations",
    title: "MongoDB Commands & Aggregations",
    description:
      "A complete reference for MongoDB CRUD operations, population, indexing, and advanced aggregation pipelines including lookups, pagination, and performance best practices.",
    sections: [
      {
        heading: "Populate all relations for a single user",
        description:
          "Populate one-to-one, many-to-many, and one-to-many relations for a single user document.",
        block: true,
        code: `import User from "./models/User";

const user = await User.findById(userId)
  .populate("profile")
  .populate("roles")
  .populate("posts");

console.log(user);`,
      },
      {
        heading: "Populate specific fields in relations",
        description:
          "Select specific fields while populating related documents.",
        block: true,
        code: `const user = await User.findById(userId)
  .populate({
    path: "profile",
    select: "firstName lastName avatar"
  })
  .populate({
    path: "roles",
    select: "name permissions"
  })
  .populate({
    path: "posts",
    select: "title content createdAt"
  });

console.log(user);`,
      },
      {
        heading: "Populate multiple users",
        description:
          "Populate relations for multiple user documents at once.",
        block: true,
        code: `const users = await User.find({ emailVerified: true })
  .populate("profile")
  .populate("roles")
  .populate("posts");

console.log(users);`,
      },
      {
        heading: "Nested populate",
        description:
          "Populate relations inside another populated relation.",
        block: true,
        code: `const user = await User.findById(userId)
  .populate({
    path: "posts",
    populate: { path: "comments" }
  });

console.log(user);`,
      },
      {
        heading: "Create document",
        description:
          "Insert a new document into a collection.",
        block: true,
        code: `db.users.insertOne({
  name: "Vinit",
  email: "vinit@gmail.com",
  age: 23,
  createdAt: new Date(),
  deletedAt: null
});`,
      },
      {
        heading: "Read documents",
        description:
          "Fetch documents using filters.",
        codes: [
          "db.users.find({ deletedAt: null })",
          "db.users.findOne({ email: 'vinit@gmail.com' })",
        ],
      },
      {
        heading: "Select specific fields",
        description:
          "Project only required fields in query results.",
        codes: [
          "db.users.find({}, { name: 1, email: 1, _id: 0 })",
        ],
      },
      {
        heading: "Update document",
        description:
          "Update fields in an existing document.",
        block: true,
        code: `db.users.updateOne(
  { _id: ObjectId("123") },
  { $set: { name: "Updated Name" } }
);`,
      },
      {
        heading: "Increment field value",
        description:
          "Increase numeric field values atomically.",
        codes: [
          `db.users.updateOne({ _id: ObjectId("123") }, { $inc: { points: 10 } })`,
        ],
      },
      {
        heading: "Soft delete document",
        description:
          "Mark a document as deleted without removing it.",
        codes: [
          `db.users.updateOne({ _id: ObjectId("123") }, { $set: { deletedAt: new Date() } })`,
        ],
      },
      {
        heading: "Pagination",
        description:
          "Paginate query results using skip and limit.",
        codes: [
          "db.users.find().sort({ createdAt: -1 }).skip(10).limit(10)",
        ],
      },
      {
        heading: "Count documents",
        description:
          "Count total documents using aggregation.",
        block: true,
        code: `db.users.aggregate([{ $count: "totalUsers" }]);`,
      },
      {
        heading: "Group by field",
        description:
          "Group documents and calculate aggregates.",
        block: true,
        code: `db.users.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: { $sum: 1 }
    }
  }
]);`,
      },
      {
        heading: "Lookup (Join)",
        description:
          "Join two collections using $lookup.",
        block: true,
        code: `db.apps.aggregate([
  {
    $lookup: {
      from: "keywords",
      localField: "_id",
      foreignField: "app_project_id",
      as: "keywords"
    }
  }
]);`,
      },
      {
        heading: "Advanced lookup with pipeline",
        description:
          "Use pipeline-based lookup for filtered joins.",
        block: true,
        code: `db.apps.aggregate([
  {
    $lookup: {
      from: "keywords",
      let: { appId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$app_project_id", "$$appId"] },
                { $eq: ["$deleted_at", null] }
              ]
            }
          }
        }
      ],
      as: "keywords"
    }
  }
]);`,
      },
      {
        heading: "Pagination with total count",
        description:
          "Fetch paginated data along with total count using $facet.",
        block: true,
        code: `db.apps.aggregate([
  { $match: { deletedAt: null } },
  {
    $facet: {
      data: [
        { $sort: { createdAt: 1 } },
        { $skip: 0 },
        { $limit: 10 }
      ],
      totalCount: [
        { $count: "count" }
      ]
    }
  }
]);`,
      },
      {
        heading: "Indexes",
        description:
          "Improve query performance with indexes.",
        codes: [
          "db.users.createIndex({ email: 1 })",
          "db.apps.createIndex({ user_id: 1, deletedAt: 1 })",
        ],
      },
      {
        heading: "Three-collection relationship",
        description:
          "Relationship mapping across users, apps, and keywords.",
        block: true,
        code: `users._id        → apps.user_id
apps._id         → keywords.app_project_id`,
      },
      {
        heading: "Optimized nested aggregation",
        description:
          "Efficient multi-level lookup with counts.",
        block: true,
        code: `db.users.aggregate([
  { $match: { deletedAt: null } },
  {
    $lookup: {
      from: "apps",
      let: { userId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$user_id", "$$userId"] }
          }
        },
        {
          $lookup: {
            from: "keywords",
            let: { appId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$app_project_id", "$$appId"] },
                      { $eq: ["$deleted_at", null] }
                    ]
                  }
                }
              }
            ],
            as: "keywords"
          }
        },
        {
          $addFields: {
            keywordCount: { $size: "$keywords" }
          }
        },
        {
          $project: {
            keywords: 0
          }
        }
      ],
      as: "apps"
    }
  }
]);`,
      },
      {
        heading: "Best practices",
        description:
          "Recommended aggregation and performance practices.",
        block: true,
        code: `✔ Use pipeline-based $lookup
✔ Avoid $unwind unless required
✔ Use $size for counts
✔ Use $facet for pagination + count
✔ Always index foreign keys`,
      },
    ],
  },
];
