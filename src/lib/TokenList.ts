import bsh from "../assets/theIcons/bsh.png";
import btc from "../assets/theIcons/btc.png";
import usdc from "../assets/theIcons/usdc.png";
import curv from "../assets/theIcons/curv.png";
import eth from "../assets/theIcons/eth.png";
import usdt from "../assets/theIcons/usdt.png";
import matic from "../assets/theIcons/matic.png";
import obo from "../assets/theIcons/obo.png";
import shiba from "../assets/theIcons/shiba.png";
import sync from "../assets/theIcons/sync.png";
import ton from "../assets/theIcons/ton.png";
import uni from "../assets/theIcons/uni.png";
import weth from "../assets/theIcons/weth.png";
import link from "../assets/theIcons/link.png";
import { StaticImageData } from "next/image";
import { ITokenList, IToken } from "./interface";

export const TokenList: ITokenList = {
	8453: [
		{
			ca: "0x4200000000000000000000000000000000000006",
			name: "Ethereum",
			ticker: "ETH",
			icon: eth,
			decimals: 18,
		},
		{
			ca: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
			name: "USD Coin",
			ticker: "USDC",
			icon: usdc,
			decimals: 6,
		},
		{
			ca: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
			name: "Dai Stablecoin",
			ticker: "DAI",
			icon: usdt,
			decimals: 18,
		},
		{
			ca: "0x4200000000000000000000000000000000000006",
			name: "Wrapped ETH",
			ticker: "WETH",
			icon: weth,
			decimals: 18,
		},
		{
			ca: "0x22e6966B799c4D5B13BE962E1D117b56327FDa66",
			name: "Synthetix Network Token",
			ticker: "SNX",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
			name: "Degen",
			ticker: "DEGEN",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0xA7d68d155d17cB30e311367c2Ef1E82aB6022b67",
			name: "BTRST",
			ticker: "BTRST",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0x24fcFC492C1393274B6bcd568ac9e225BEc93584",
			name: "Heros of Mavia",
			ticker: "MAVIA",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
			name: "Baseswap Token",
			ticker: "BSWAP",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0xFF0C532FDB8Cd566Ae169C1CB157ff2Bdc83E105",
			name: "Fren Pet",
			ticker: "FrenPet",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0xb8D98a102b0079B69FFbc760C8d857A31653e56e",
			name: "Token Toby",
			ticker: "Toby",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},

		{
			ca: "0x60Cbb875D3c6314280Dd90a4Fe6cAFC1d7Ce5DfD",
			name: "EBase",
			ticker: "EBASE",
			icon: ("" as unknown) as StaticImageData,
			decimals: 9,
		},

		// Add more tokens for chain ID 1 (Ethereum) if needed
	],

	11155111: [
		{
			ca: "0x4200000000000000000000000000000000000006",
			name: "Ethereum",
			ticker: "ETH",
			icon: eth,
			decimals: 18,
		},
		{
			ca: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
			name: "USD Coin",
			ticker: "USDC",
			icon: usdc,
			decimals: 6,
		},
		{
			ca: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
			name: "Dai Stablecoin",
			ticker: "DAI",
			icon: usdt,
			decimals: 18,
		},
		{
			ca: "0x4200000000000000000000000000000000000006",
			name: "Wrapped ETH",
			ticker: "WETH",
			icon: weth,
			decimals: 18,
		},
		{
			ca: "0x01fa8dEEdDEA8E4e465f158d93e162438d61c9eB",
			name: "Dop Ape",
			ticker: "DOP_Ape",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
		{
			ca: "0x4873528341D33Ec918c7465F244491aCB75Bc95F",
			name: "DOP",
			ticker: "DOP",
			icon: ("" as unknown) as StaticImageData,
			decimals: 18,
		},
	],
	// Add tokens for other chain IDs as needed
};
