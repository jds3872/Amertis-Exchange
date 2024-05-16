export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

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

export const configObj = {
	chains: [base, blast, sepolia],
	transports: {
		[base.id]: http(),
		[blast.id]: http(),
		[sepolia.id]: http(),
	},
};
