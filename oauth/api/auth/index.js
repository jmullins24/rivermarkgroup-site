import crypto from "node:crypto";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default async function handler(req, res) {
  try {
    const clientId = required("GITHUB_CLIENT_ID");
    const origin = required("ORIGIN");

    const state = crypto.randomBytes(16).toString("hex");
    const proto = req.headers["x-forwarded-proto"] || "https";
    const callbackUrl = new URL("/auth/callback", `${proto}://${req.headers.host}`);

    res.setHeader(
      "Set-Cookie",
      `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
    );

    const redirect = new URL("https://github.com/login/oauth/authorize");
    redirect.searchParams.set("client_id", clientId);
    redirect.searchParams.set("redirect_uri", callbackUrl.toString());
    redirect.searchParams.set("scope", "repo");
    redirect.searchParams.set("state", state);
    redirect.searchParams.set("origin", origin);

    res.status(302).setHeader("Location", redirect.toString());
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
