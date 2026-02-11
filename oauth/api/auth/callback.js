function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readCookie(req, name) {
  const cookie = req.headers.cookie || "";
  const items = cookie.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const match = items.find((part) => part.startsWith(prefix));
  return match ? match.slice(prefix.length) : "";
}

async function getAccessToken(code, clientId, clientSecret) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub token exchange failed with status ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error_description || data.error);
  }

  return data.access_token;
}

export default async function handler(req, res) {
  const origin = process.env.ORIGIN || "";

  try {
    const clientId = required("GITHUB_CLIENT_ID");
    const clientSecret = required("GITHUB_CLIENT_SECRET");
    const state = req.query.state || "";
    const code = req.query.code || "";
    const storedState = readCookie(req, "decap_oauth_state");

    if (!code || !state || state !== storedState) {
      throw new Error("Invalid OAuth state or missing code.");
    }

    const token = await getAccessToken(code, clientId, clientSecret);
    const payload = JSON.stringify({ token });

    res.setHeader(
      "Set-Cookie",
      "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
    );
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(event) {
          if (event.data === "authorizing:github") {
            window.opener.postMessage("authorization:github:success:${payload}", "${origin}");
            window.removeEventListener("message", receiveMessage, false);
            window.close();
          }
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "${origin}");
      })();
    </script>
  </body>
</html>`);
  } catch (error) {
    const safeError = String(error.message || error).replace(/"/g, "&quot;");
    res.setHeader("Content-Type", "text/html");
    res.status(400).send(`<!doctype html>
<html>
  <body>
    <script>
      window.opener.postMessage("authorization:github:error:${safeError}", "${origin}");
      window.close();
    </script>
  </body>
</html>`);
  }
}
