import type { APIRoute } from "astro";

import { jsonHeaders } from "../../lib/oauth-discovery";

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const redirectUri = url.searchParams.has("redirect_uri");

  // This service does not register redirect URIs or issue authorization codes.
  // Redirecting to an unverified caller-provided URI would make this endpoint an
  // open redirect and could lend the ui-skills.com origin to phishing links.
  return new Response(
    JSON.stringify({
      error: redirectUri ? "unauthorized_client" : "invalid_request",
      error_description:
        "Interactive authorization is not supported. Use client_credentials for public catalog reads.",
    }),
    { status: 400, headers: jsonHeaders },
  );
};
