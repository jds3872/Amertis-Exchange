// // import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { Config } from "wagmi";

// import { cookieStorage, createStorage, http } from "wagmi";
// import { sepolia } from "wagmi/chains";

// // Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// const metadata = {
//   name: "Amertis",
//   description: "The extravegant aggregator for monad",
//   url: "https://web3modal.com", // origin must match your domain & subdomain
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// // Create wagmiConfig
// const chains = [sepolia] as const;
// export const config = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   ssr: true,
//   transports: {
//     [sepolia.id]: http("https://sepolia.gateway.tenderly.co"),
//   },
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   enableWalletConnect: false,
//   enableInjected: true,
//   enableEIP6963: true,
//   enableCoinbase: true,
// });

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, base, blast } from "wagmi/chains";

export const config = createConfig({
  chains: [base, blast, sepolia],
  transports: {
    [base.id]: http(),
    [blast.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
