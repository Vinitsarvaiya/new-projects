import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { CopyableCode } from "./ReactJS";

const TokenCreation = () => {
  return (
    <Layout>
      <Toaster position="bottom-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        JWT Token Creation (Node + TypeScript)
      </h1>

      <ol className="list-decimal ml-6 space-y-4">

        {/* Step 1 */}
        <li>
          <p className="mb-2">Install JWT dependency</p>
          <CopyableCode code="npm install jsonwebtoken" />
          <CopyableCode code="npm install -D @types/jsonwebtoken" />
        </li>

        {/* Step 2 */}
        <li>
          <p className="mb-2">
            Add secrets in <code className="bg-gray-800 px-1 rounded">.env</code>
          </p>
          <CopyableCode
            block
            code={`ATSECRETKEY=your_access_token_secret
RTSECRETKEY=your_refresh_token_secret`}
          />
        </li>

        {/* Step 3 */}
        <li>
          <p className="mb-2">
            Create token utility file{" "}
            <code className="bg-gray-800 px-1 rounded">utils/token.ts</code>
          </p>
        </li>

        {/* Step 4 */}
        <li>
          <p className="mb-2">Create Access & Refresh Token pair</p>
          <CopyableCode
            block
            code={`import JWT from "jsonwebtoken";

function createTokenPair(payload: any) {
    return {
        accessToken: JWT.sign(
            payload,
            process.env.ATSECRETKEY as string,
            { expiresIn: "1w" }
        ),
        refreshToken: JWT.sign(
            payload,
            process.env.RTSECRETKEY as string,
            { expiresIn: "4w" }
        ),
    };
}

export default createTokenPair;`}
          />
        </li>

        {/* Step 5 */}
        <li>
          <p className="mb-2">Create short-lived user token</p>
          <CopyableCode
            block
            code={`import JWT from "jsonwebtoken";

function createTokenUser(payload: any) {
    return {
        token: JWT.sign(
            payload,
            process.env.ATSECRETKEY as string,
            { expiresIn: "10m" }
        ),
    };
}

export default createTokenUser;`}
          />
        </li>

        {/* Step 6 */}
        <li>
          <p className="mb-2">Verify Access Token</p>
          <CopyableCode
            block
            code={`import JWT from "jsonwebtoken";

function verifyTokenPair(token: string) {
    return JWT.verify(
        token,
        process.env.ATSECRETKEY as string
    );
}

export default verifyTokenPair;`}
          />
        </li>

        {/* Step 7 */}
        <li>
          <p className="mb-2">Export all token helpers</p>
          <CopyableCode
            block
            code={`export { 
  createTokenPair, 
  createTokenUser, 
  verifyTokenPair 
};`}
          />
        </li>

        {/* Step 8 */}
        <li>
          <p className="mb-2">Usage example during login</p>
          <CopyableCode
            block
            code={`const tokens = createTokenPair({
  id: requestedUser._id.toString(),
  email: requestedUser.email,
  role: (requestedUser.role_id as IRole)?.name,
});

return res.json({
  success: true,
  accessToken: tokens.accessToken,
  refreshToken: tokens.refreshToken,
});`}
          />
        </li>

        {/* Step 9 */}
        <li>
          <p className="mb-2">
            When to use which token
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-300">
            <li><b>Access Token</b> → API authentication</li>
            <li><b>Refresh Token</b> → Generate new access token</li>
            <li><b>User Token</b> → Email verify / password reset</li>
          </ul>
        </li>

      </ol>
    </Layout>
  );
};

export default TokenCreation;
