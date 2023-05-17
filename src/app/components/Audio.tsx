import { MediaRenderer, useAddress, Web3Button } from "@thirdweb-dev/react";
import {
  CreateCollectTypedDataDocument,
  FeeCollectModuleSettings,
  useCreateCollectTypedDataMutation,
  usePublicationQuery,
} from "../graphql/generated";
import styled from "styled-components";
// import { useCollect } from "../lib/useCollect";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useMirror } from "../lib/useMirror";
import React from "react";
import { Alert } from "./Alert";

type AudioProps = {
  publicationId: string;
};

const MediaRendererStyled = styled(MediaRenderer)`
  && button {
    bottom: 25% !important;
    right: 25% !important;
    max-width: 100% !important;
    width: 25% !important;
  }
`;

type AlertInfo = {
  show: boolean;
  type: string;
  result: Error | void;
};
export const Audio = ({ publicationId }: AudioProps) => {
  const [alertInfo, setAlertInfo] = React.useState<AlertInfo>({
    show: false,
    type: "info",
    result: undefined,
  });
  const address = useAddress();
  const { data, isLoading, error } = usePublicationQuery(
    {
      request: {
        publicationId: publicationId,
      },
    },
    {
      enabled: !!publicationId,
    }
  );

  // const { mutateAsync: collectSong } = useCollect(publicationId);
  const { mutateAsync: mirrorPost } = useMirror(publicationId);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  console.log("data from publication is", data);

  const showAlert = (type: string, result: Error | void) => {
    if (type === "success") {
      setAlertInfo({ show: true, type: "success", result });
    } else {
      setAlertInfo({ show: true, type: "error", result });
    }
  };

  return (
    <>
      <div className='card bg-neutral text-neutral-content'>
        <MediaRendererStyled
          controls={true}
          requireInteraction={false}
          className='block'
          width='100%'
          height='100%'
          src={data?.publication?.metadata.media[0].original.url}
          poster='ipfs://bafkreib3xehykqnvu7g6b5zxrw4hx54zwxxxgfix2ovauugxmn5fyeyg6m'
        />
        <div className='card-body items-center text-center'>
          <p className='text-center p-2 mb-4'>
            {data?.publication?.metadata.name}
          </p>
          <div className='card-actions justify-end'>
            {/* <Web3Button
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_CONTRACT_ABI}
              className='btn btn-primary min-w-min px-2 py-2 text-sm'
              action={async () => await collectSong(data?.publication?.id)}
              onSuccess={(result) => showAlert("success", result)}
              onError={(result) => showAlert("error", result)}
              // onClick={() => useCollect(data?.publication?.id)}
            >
              Collect for{" "}
              {
                (data?.publication?.collectModule as FeeCollectModuleSettings)
                  ?.amount.value
              }{" "}
              Matic
            </Web3Button> */}
            <Web3Button
              className='btn btn-ghost min-w-min px-2 py-2 text-sm bg-black text-white uppercase'
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_CONTRACT_ABI}
              action={async () => await mirrorPost(data?.publication?.id)}
              onSuccess={(result) => showAlert("success", result)}
              onError={(result) => showAlert("error", result)}>
              Mirror!
            </Web3Button>
          </div>
        </div>
        {alertInfo.show && (
          <Alert alertType={alertInfo.type} result={alertInfo.result} />
        )}
      </div>
    </>
  );
};
