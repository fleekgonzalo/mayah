import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallange";
import { useAuthenticateMutation } from "../../graphql/generated";
import { setAccessToken } from "./helpers";
// 0. make sure the user has a connected wallet.

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();
  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();
  const client = useQueryClient();

  async function login() {
    if (!address) return;

    // 1. generate challenge wich comens from the lens api
    const { challenge } = await generateChallenge(address);
    // 2. sign the challenge with the user'S wallet
    const signature = await sdk?.wallet.sign(challenge.text);
    // 3. send the signed challenge to the lens API
    const { authenticate } = await sendSignedMessage({
      request: { address, signature },
    });
    console.log("authenticated");
    // 4. Receive a acess token from the lens API if we succeed
    // 5. store the access token inside local storage so we can use it.
    const { accessToken, refreshToken } = authenticate;
    setAccessToken(accessToken, refreshToken);

    // ask react query to refetch the cache key
    // refetch this cache key ["lens-user", address]
    client.invalidateQueries(["lens-user", address]);
  }

  // return the useMutation hook wrapping the async function
  return useMutation(login);
}
