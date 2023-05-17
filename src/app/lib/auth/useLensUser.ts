import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "../../graphql/generated";

export default function useLensUser() {
  //1. make a react query for the local storage key
  const address = useAddress();
  const localStorageQuery = useQuery(["lens-user", address], () =>
    readAccessToken()
  );

  // if there is a connected wallet address
  // then we can ask for the default profile from lens

  const profileQuery = useDefaultProfileQuery(
    {
      request: { ethereumAddress: address },
    },
    { enabled: !!address }
  );

  return {
    isSignedInQuery: localStorageQuery,
    profileQuery,
  };
}
