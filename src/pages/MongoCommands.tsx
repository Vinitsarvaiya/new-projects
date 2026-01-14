
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const MongoCommands = () => {
    return (
        <Layout>
            <Toaster position="bottom-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold text-indigo-400 mb-8" >
                MongoDB Commands & Aggregations
            </h1>

            < ol className="list-decimal ml-6 space-y-6" >

< li >
                    <h2 className="font-semibold text-lg mb-2" > Populate all relations for a single user </h2>
                    < CopyableCode block code={`import User from "./models/User";

const user = await User.findById(userId)
  .populate("profile")   // One-to-One
  .populate("roles")     // Many-to-Many
  .populate("posts");    // One-to-Many

console.log(user);
`} />
                </li>

                < li >
                    <h2 className="font-semibold text-lg mb-2" > Populate specific fields in relations </h2>
                    < CopyableCode block code={`const user = await User.findById(userId)
  .populate({
    path: "profile",
    select: "firstName lastName avatar" // only these fields
  })
  .populate({
    path: "roles",
    select: "name permissions"
  })
  .populate({
    path: "posts",
    select: "title content createdAt"
  });

console.log(user);
`} />
                </li>

                < li >
                    <h2 className="font-semibold text-lg mb-2" > Populate multiple users at once </h2>
                    < CopyableCode block code={`const users = await User.find({ emailVerified: true })
  .populate("profile")
  .populate("roles")
  .populate("posts");

console.log(users);
`} />
                </li>


                < li >
                    <h2 className="font-semibold text-lg mb-2" >Nested populate example (populate relation inside a relation) </h2>
                    < CopyableCode block code={`const user = await User.findById(userId)
  .populate({
    path: "posts",
    populate: { path: "comments" } // populate comments inside posts
  });

console.log(user);

`} />
                </li>


                {/* 1. Insert */}
                < li >
                    <h2 className="font-semibold text-lg mb-2" > Create(Insert) </h2>
                    < CopyableCode block code={`db.users.insertOne({
  name: "Vinit",
  email: "vinit@gmail.com",
  age: 23,
  createdAt: new Date(),
  deletedAt: null
});`} />
                </li>

                {/* 2. Find */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Read(Find) </h2>
                    < CopyableCode code="db.users.find({ deletedAt: null })" />
                    <CopyableCode code="db.users.findOne({ email: 'vinit@gmail.com' })" />
                </li>

                {/* 3. Projection */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Select Fields </h2>
                    < CopyableCode code="db.users.find({}, { name: 1, email: 1, _id: 0 })" />
                </li>

                {/* 4. Update */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Update </h2>
                    < CopyableCode block code={`db.users.updateOne(
  { _id: ObjectId("123") },
  { $set: { name: "Updated Name" } }
);`} />
                </li>

                {/* 5. Increment */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Increment Value </h2>
                    < CopyableCode code={`db.users.updateOne({ _id: ObjectId("123") }, { $inc: { points: 10 } })`} />
                </li>

                {/* 6. Delete */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Delete(Soft Delete) </h2>
                    < CopyableCode code={`db.users.updateOne({ _id: ObjectId("123") }, { $set: { deletedAt: new Date() } })`} />
                </li>

                {/* 7. Pagination */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Pagination </h2>
                    < CopyableCode code="db.users.find().sort({ createdAt: -1 }).skip(10).limit(10)" />
                </li>

                {/* 8. Count */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Count Documents </h2>
                    < CopyableCode code={`db.users.aggregate([{ $count: "totalUsers" }])`} />
                </li>

                {/* 9. Group */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Group By </h2>
                    < CopyableCode block code={`db.users.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: { $sum: 1 }
    }
  }
]);`} />
                </li>

                {/* 10. Lookup */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Lookup(Join) </h2>
                    < CopyableCode block code={`db.apps.aggregate([
  {
    $lookup: {
      from: "keywords",
      localField: "_id",
      foreignField: "app_project_id",
      as: "keywords"
    }
  }
]);`} />
                </li>

                {/* 11. Advanced Lookup */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Advanced Lookup(Pipeline) </h2>
                    < CopyableCode block code={`db.apps.aggregate([
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
]);`} />
                </li>

                {/* 12. Facet */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Pagination + Count(Facet) </h2>
                    < CopyableCode block code={`db.apps.aggregate([
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
]);`} />
                </li>

                {/* 13. Index */}
                <li>
                    <h2 className="font-semibold text-lg mb-2" > Indexes(Performance) </h2>
                    < CopyableCode code="db.users.createIndex({ email: 1 })" />
                    <CopyableCode code="db.apps.createIndex({ user_id: 1, deletedAt: 1 })" />
                </li>

                <li>
                    <p className="mb-2">
                        This example shows how to fetch data from <b>3 related collections</b>
                    </p>
                    <CopyableCode
                        block
                        code={`users._id        → apps.user_id
apps._id         → keywords.app_project_id`}
                    />
                </li>

                {/* Basic 3-table join */}
                <li>
                    <h2 className="font-semibold text-lg mb-2">
                        Fetch Users → Apps → Keywords
                    </h2>

                    <CopyableCode
                        block
                        code={`db.users.aggregate([
  {
    $match: { deletedAt: null }
  },

  {
    $lookup: {
      from: "apps",
      localField: "_id",
      foreignField: "user_id",
      as: "apps"
    }
  },

  {
    $lookup: {
      from: "keywords",
      localField: "apps._id",
      foreignField: "app_project_id",
      as: "keywords"
    }
  }
]);`}
                    />
                </li>

                {/* Advanced nested lookup */}
                <li>
                    <h2 className="font-semibold text-lg mb-2">
                        Optimized Nested Lookup (Recommended)
                    </h2>

                    <CopyableCode
                        block
                        code={`db.users.aggregate([
  {
    $match: { deletedAt: null }
  },

  {
    $lookup: {
      from: "apps",
      let: { userId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$user_id", "$$userId"]
            }
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
]);`}
                    />
                </li>

                {/* Pagination version */}
                <li>
                    <h2 className="font-semibold text-lg mb-2">
                        With Pagination + Total Count
                    </h2>

                    <CopyableCode
                        block
                        code={`db.users.aggregate([
  { $match: { deletedAt: null } },

  {
    $facet: {
      data: [
        {
          $lookup: {
            from: "apps",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$user_id", "$$userId"]
                  }
                }
              }
            ],
            as: "apps"
          }
        },
        { $skip: 0 },
        { $limit: 10 }
      ],
      totalCount: [
        { $count: "count" }
      ]
    }
  }
]);`}
                    />
                </li>

                {/* Result shape */}
                <li>
                    <h2 className="font-semibold text-lg mb-2">
                        Result Structure
                    </h2>

                    <CopyableCode
                        block
                        code={`{
  "_id": "userId",
  "name": "Vinit",
  "apps": [
    {
      "_id": "appId",
      "name": "My App",
      "keywordCount": 12
    }
  ]
}`}
                    />
                </li>

                {/* Notes */}
                <li>
                    <h2 className="font-semibold text-lg mb-2">
                        Best Practices
                    </h2>

                    <CopyableCode
                        block
                        code={`✔ Use pipeline-based $lookup for filtering
✔ Avoid $unwind unless required
✔ Use $size for counts
✔ Use $facet for pagination + count
✔ Always index foreign keys`}
                    />
                </li>

            </ol>
        </Layout>
    );
};

export default MongoCommands