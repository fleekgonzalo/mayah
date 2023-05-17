"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  const desiredChainId = ChainId.Polygon;
  return (
    <ThirdwebProvider activeChain='polygon'>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThirdwebProvider>
  );
}
