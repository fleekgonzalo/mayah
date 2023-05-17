import React from "react";
import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
  ChainId,
} from "@thirdweb-dev/react";
import useLensUser from "../lib/auth/useLensUser";
import useLogin from "../lib/auth/useLogin";
import { deleteAccessToken } from "../lib/auth/helpers";
import { useQueryClient } from "@tanstack/react-query";

export default function SignInButton() {
  // states
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();
  const client = useQueryClient();

  async function logout() {
    deleteAccessToken();
    client.invalidateQueries(["lens-user", address]);
  }
  // 1. user needs to connect the wallet
  if (!address) {
    return <ConnectWallet />;
  }
  console.log("isOnWrongNetwork", isOnWrongNetwork);

  // 2. needs to switch network to polygon
  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
        Switch network
      </button>
    );
  }

  if (isSignedInQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (!isSignedInQuery.data) {
    return (
      <button className='btn m-1' onClick={() => requestLogin()}>
        sign in with lens
      </button>
    );
  }

  if (profileQuery.isLoading) {
    return <div>loading profile...</div>;
  }

  if (!profileQuery.data) {
    return <div>no profile found</div>;
  }

  if (profileQuery.data.defaultProfile) {
    return (
      <div>
        {/* dropdown on hover */}
        <div className='dropdown dropdown-hover'>
          <label tabIndex={0} className='btn m-1'>
            Hey! {profileQuery.data.defaultProfile.name}
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content p-2 shadow bg-base-100 rounded-box w-32'>
            <li>
              <a href='#' className='text-center' onClick={() => logout()}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return <div>something went wrong</div>;
}
