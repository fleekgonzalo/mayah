import { LENS_CONTRACT_ADDRESS, LENS_CONTRACT_ABI } from "./../const/contracts";
// 1. use the autogenerated mutation hook from graphql codegen called "useCreateCollectTypedDataMutation"
// 2. ask the user to sign the typed data
// 3. send the signed typed data to the lens API to perform the collect write operation on the blockchain

import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useCreateCollectTypedDataMutation } from "../graphql/generated";
import { signTypedDataWithOmittedTypename, splitSignature } from "./helpers";

export const useCollect = (publicationId: String) => {
  // const { mutateAsync: requestTypedData } = useCreateCollectTypedDataMutation();
  // const { address } = useAddress();
  // const sdk = useSDK();
  // const collect = async (collect: any) => {
  //   // 1. generate the typed data
  //   const { createCollectTypedData } = await requestTypedData({
  //     request: {
  //       publicationId,
  //     },
  //   });
  //   if (!sdk) {
  //     return;
  //   }
  //   const { domain, types, value } = createCollectTypedData.typedData;
  //   // 2. sign the typed datas
  //   const signature = await signTypedDataWithOmittedTypename(
  //     sdk,
  //     domain,
  //     types,
  //     value
  //   );
  //   const { v, r, s } = splitSignature(signature.signature);
  //   // 3. send the signed typed data to the lens API to perform the collect write operation on the blockchain
  //   const lensHubContract = await sdk.getContractFromAbi(
  //     LENS_CONTRACT_ADDRESS,
  //     LENS_CONTRACT_ABI
  //   );
  //   const result = await lensHubContract.call(
  //     "collectWithSig",
  //     {
  //       collector: address,
  //       profileId: value.profileId,
  //       pubId: value.pubId,
  //       data: value.data,
  //       sig: {
  //         v,
  //         r,
  //         s,
  //         deadline: value.deadline,
  //       },
  //     },
  //     { gasLimit: 1000000 }
  //   );
  //   console.log("result", result);
  // };
  // return useMutation(collect);
};