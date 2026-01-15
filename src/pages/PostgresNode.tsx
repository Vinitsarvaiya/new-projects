// src/pages/PostgresPrismaWorkflow.tsx
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const PostgresPrismaWorkflow = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">
        PostgreSQL + Prisma Workflow
      </h1>

      <ol className="list-decimal ml-6 space-y-4">
  <li>
    Open <b>pgAdmin</b> and connect to your PostgreSQL server.
  </li>

  <li>
    In the left panel go to:
    <br />
    <b>Servers → Your Server → Login/Group Roles</b>
    <br />
    Your username will usually be <b>postgres</b>.
  </li>

  <li>
    If you don’t know the password:
    <ul className="list-disc ml-6 mt-2">
      <li>Right-click <b>postgres</b></li>
      <li>Click <b>Properties</b></li>
      <li>Go to <b>Definition</b></li>
      <li>Set password: <b>123</b></li>
      <li>Click <b>Save</b></li>
    </ul>
  </li>

  <li>
    Find your database name under:
    <br />
    <b>Servers → Your Server → Databases</b>
    <br />
    Example: <b>mydb</b>
  </li>

  <li>
    Use this final DATABASE_URL in your <b>.env</b> file:
    <pre className="bg-gray-800 text-white p-2 rounded mt-2">
DATABASE_URL="postgresql://postgres:123@localhost:5432/mydb?schema=public"
    </pre>
  </li>

  <li>
    To verify, run in terminal:
    <pre className="bg-gray-800 text-white p-2 rounded mt-2">
psql "postgresql://postgres:123@localhost:5432/mydb"
    </pre>
  </li>
</ol>


      <ol className="list-decimal ml-6 space-y-4">
        {/* Step 1 */}
        <li>
          <p>Install Prisma and client:</p>
          <CopyableCode code="npm install prisma @prisma/client" />
        </li>

        {/* Step 2 */}
        <li>
          <p>Initialize Prisma:</p>
          <CopyableCode code="npx prisma init" />
        </li>

        {/* Step 3 */}
        <li>
          <p>Update <code className="bg-gray-800 px-1 rounded">.env</code> with PostgreSQL URL:</p>
          <CopyableCode
            block
            code={`DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/mydb?schema=public"`}
          />
        </li>

        {/* Step 4 */}
        <li>
          <p>Define initial schema (<code className="bg-gray-800 px-1 rounded">prisma/schema.prisma</code>):</p>
          <CopyableCode
            block
            code={`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  createdAt DateTime @default(now())
}`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p>Run migration to create table:</p>
          <CopyableCode code="npm prisma migrate dev --name init" />
        </li>

        {/* Step 6 */}
        <li>
          <p>Generate Prisma client (after any schema change):</p>
          <CopyableCode code="npm prisma generate" />
        </li>

        {/* Step 7 */}
        <li>
          <p>Insert a new user:</p>
          <CopyableCode
            block
            code={`import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { firstName: "Vinit", lastName: "Sarvaiya", email: "vinit@example.com" },
  });
  console.log(user);
}

main().finally(() => prisma.$disconnect());`}
          />
        </li>

        {/* Step 8 */}
        <li>
          <p>Query all users:</p>
          <CopyableCode
            block
            code={`const users = await prisma.user.findMany();
console.log(users);`}
          />
        </li>

        {/* Step 9 */}
        <li>
          <p>Update schema (for example, add <code className="bg-gray-800 px-1 rounded">age</code> field):</p>
          <CopyableCode
            block
            code={`model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  age       Int?     // new optional field
  createdAt DateTime @default(now())
}`}
          />
        </li>

        {/* Step 10 */}
        <li>
          <p>Generate client after schema update:</p>
          <CopyableCode code="npm prisma generate" />
        </li>

        {/* Step 11 */}
        <li>
          <p>Run migration to apply schema changes to DB:</p>
          <CopyableCode code="npm prisma migrate dev --name add-age-field" />
        </li>

        {/* Step 12 */}
        <li>
          <p>Now you can use the new field in queries:</p>
          <CopyableCode
            block
            code={`const user = await prisma.user.create({
  data: { firstName: "Vinit", lastName: "Sarvaiya", email: "vinit2@example.com", age: 28 },
});
console.log(user);`}
          />
        </li>
         <li>
          <p>Insert a user:</p>
          <CopyableCode
            block
            code={`const user = await prisma.user.create({
  data: { firstName: "Vinit", lastName: "Sarvaiya", email: "vinit@example.com", age: 28 },
});
console.log(user);`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p>Insert a post for a user:</p>
          <CopyableCode
            block
            code={`const post = await prisma.post.create({
  data: { title: "Hello World", content: "First post", authorId: 1 },
});
console.log(post);`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p>Query all users:</p>
          <CopyableCode
            block
            code={`const users = await prisma.user.findMany();
console.log(users);`}
          />
        </li>

        {/* Step 7 */}
        <li>
          <p>Query user with selected fields:</p>
          <CopyableCode
            block
            code={`const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: { firstName: true, email: true, age: true },
});
console.log(user);`}
          />
        </li>

        {/* Step 8 */}
        <li>
          <p>Query user including related posts:</p>
          <CopyableCode
            block
            code={`const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
});
console.log(userWithPosts);`}
          />
        </li>

        {/* Step 9 */}
        <li>
          <p>Update a user:</p>
          <CopyableCode
            block
            code={`const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { age: 29 },
});
console.log(updatedUser);`}
          />
        </li>

        {/* Step 10 */}
        <li>
          <p>Upsert (update if exists, insert if not):</p>
          <CopyableCode
            block
            code={`const upsertUser = await prisma.user.upsert({
  where: { email: "vinit@example.com" },
  update: { age: 30 },
  create: { firstName: "Vinit", lastName: "Sarvaiya", email: "vinit@example.com", age: 30 },
});
console.log(upsertUser);`}
          />
        </li>

        {/* Step 11 */}
        <li>
          <p>Delete a user:</p>
          <CopyableCode
            block
            code={`const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});
console.log(deletedUser);`}
          />
        </li>

        {/* Step 12 */}
        <li>
          <p>Delete many users (filter example):</p>
          <CopyableCode
            block
            code={`const deletedUsers = await prisma.user.deleteMany({
  where: { age: { lt: 18 } },
});
console.log(deletedUsers);`}
          />
        </li>

        {/* Step 13 */}
        <li>
          <p>Disconnect Prisma client after operations:</p>
          <CopyableCode
            block
            code={`import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ... your queries

await prisma.$disconnect();`}
          />
        </li>
      </ol>
    </Layout>
  );
};

export default PostgresPrismaWorkflow;
