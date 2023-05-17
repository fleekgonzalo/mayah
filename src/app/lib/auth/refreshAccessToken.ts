import { fetcher } from "../../graphql/auth-fetcher";
import { readAccessToken, setAccessToken } from "./helpers";
import {
  RefreshMutation,
  RefreshMutationVariables,
  RefreshDocument,
} from "../../graphql/generated";
async function fetchData<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): Promise<TData> {
  const res = await fetch("https://api.lens.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0] || {};
    throw new Error(message || "Error…");
  }

  return json.data;
}
export default async function refreshAccessToken() {
  const currentRefreshToken = readAccessToken()?.refreshToken;

  if (!currentRefreshToken) return null;

  // 3. set the new access token in local storage
  const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      },
    }
  );

  const { accessToken, refreshToken } = result.refresh;

  setAccessToken(accessToken, refreshToken);

  return accessToken as string;
}
