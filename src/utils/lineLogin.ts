export function getLineLoginUrl() {
  const clientId = import.meta.env.VITE_LINE_LOGIN_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_API_URL + "/auth/callback";
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=12345&scope=openid%20profile&prompt=none`;
}
