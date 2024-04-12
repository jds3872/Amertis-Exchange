"use client";
import {
	useState,
	useEffect,
	useCallback,
	useReducer,
	useMemo,
	useRef,
} from "react";
import { simulateContract } from "@wagmi/core";
import { motion, AnimatePresence } from "framer-motion";
import {
	TopSwap,
	BottomSwap,
	TokensModal,
	SettingModal,
	Info,
	TransactionModal,
} from "../components/trade";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { fadeIn } from "@/utils/anim";

// REACT ICONS
import { FiSettings } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { GrFormNext } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { RiArrowUpDownFill } from "react-icons/ri";

import UseSwap from "@/hooks/useSwap";
import useFetchBalance from "@/hooks/useFetchBalance";
import { useAccount, useReadContract } from "wagmi";
import { TokenList } from "@/assets/TokenList";
import { formatEther, parseEther } from "viem";
import { StaticImageData } from "next/image";
import { config } from "@/config";
import { abi } from "@/config/abi";

export default function Home() {
	const { open } = useWeb3Modal();
	const [ToggleModal, setToggleModal] = useState<any>({
		mainToggle: false,
		forBase: true,
	});
	const { address, isConnected, isDisconnected } = useAccount();
	const [settingToggle, setSettingToggle] = useState<boolean>(false);
	const [txModalToggle, setTxModalToggle] = useState<boolean>(false);
	const [baseToken, setBaseToken] = useState({
		...TokenList[0],
		tokenBalance: 0,
		inputValue: "",
	});

	const baseInputRef = useRef<HTMLInputElement>(null);

	console.log(baseToken);
	const [quoteToken, setQuoteToken] = useState({
		...TokenList[1],
		tokenBalance: 0,
		inputValue: "",
	});

	// Fetch the best price
	// const {
	//   data: swapInfo,
	//   isLoading,
	//   isError,
	//   refetch,
	// } = useReadContract({
	//   abi,
	//   address: quoteToken.ca
	//     ? ("0x2c4e238e822eb8769b99fd54accb4c5392ba1b49" as `0x${string}`)
	//     : undefined,
	//   functionName: "findBestPathWithGas",
	//   args: [
	//     parseEther(baseToken.inputValue),
	//     baseToken.ca,
	//     quoteToken.ca,
	//     3,
	//     120000,
	//   ],
	// });

	// // Fetch monagRouter allowance
	// const {} = useReadContract({
	//   [],
	//   address: quoteToken.ca
	//     ? ("0x2c4e238e822eb8769b99fd54accb4c5392ba1b49" as `0x${string}`)
	//     : undefined,
	// })

	const { data: baseTokenBalance, isLoading: baseIsLoading } = useFetchBalance(
		address!,
		baseToken.ca + baseToken.name,
		baseToken.ca
	);

	const {
		data: quoteTokenBalance,
		isLoading: quoteIsLoading,
	} = useFetchBalance(address!, quoteToken.ca + quoteToken.name, quoteToken.ca);

	useEffect(() => {
		if (baseTokenBalance !== undefined) {
			setBaseToken((prevBaseToken) => ({
				...prevBaseToken,
				tokenBalance: Number(baseTokenBalance.value), // Convert bigint to number
			}));
		}
	}, [baseTokenBalance]);

	useEffect(() => {
		if (quoteTokenBalance !== undefined) {
			setQuoteToken((prevQuoteToken) => ({
				...prevQuoteToken,
				tokenBalance: Number(quoteTokenBalance.value), // Convert bigint to number
			}));
		}
	}, [quoteTokenBalance]);

	const { approvalRequired, checkAllowanceAndSwap, swapData } = UseSwap(
		baseToken,
		quoteToken
	);

	const ReverseTrade = useCallback(() => {
		setBaseToken((prevBaseToken) => ({
			...quoteToken,
			inputValue: prevBaseToken.inputValue,
		}));
		setQuoteToken((prevQuoteToken) => ({
			...baseToken,
			inputValue: prevQuoteToken.inputValue,
		}));
	}, [baseToken, quoteToken]);

	useEffect(() => {
		document.body.style.overflow = ToggleModal.mainToggle ? "hidden" : "auto";
	}, [ToggleModal.mainToggle]);

	const isInsufficient = useMemo(() => {
		return (
			Number(baseToken.inputValue) >
			Number(formatEther(BigInt(baseToken.tokenBalance)))
		);
	}, [baseToken.inputValue]);

	// swap button click function
	const handleSwap = () => {
		if (!baseToken.inputValue) {
			baseInputRef.current?.focus();
		} else {
			setTxModalToggle(true);
			checkAllowanceAndSwap();
		}
	};

	return (
		<>
			<motion.main className="min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] mb-80px px-4 py-4 pt-[70px] mt-5 md:w-[462.41px] md:pt-[136px] md:m-auto md:px-0">
				<TopIconSection setSettingToggle={setSettingToggle} />
				<TopSwap
					setToggleModal={setToggleModal}
					ToggleModal={ToggleModal}
					baseToken={baseToken}
					setBaseToken={setBaseToken}
					isLoading={baseIsLoading}
					baseInputRef={baseInputRef}
				/>
				<RotateTokens ReverseTrade={ReverseTrade} />
				<BottomSwap
					setToggleModal={setToggleModal}
					ToggleModal={ToggleModal}
					quoteToken={quoteToken}
					setQuoteToken={setQuoteToken}
					isLoading={quoteIsLoading}
				/>
				<Info baseToken={baseToken} quoteToken={quoteToken} />
				{isConnected && (
					<button
						disabled={isInsufficient}
						onClick={handleSwap}
						className=" flex items-center justify-center w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate disabled:bg-mainDark "
					>
						{isInsufficient ? "Insufficient ETH balance" : "Swap"}
					</button>
				)}
				{isDisconnected && (
					<button
						onClick={() => open({ view: "Connect" })}
						className=" flex items-center justify-between gap-4 h-[100px] md:h-[79px] w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate"
					>
						<div className=" flex items-center gap-4 text-left">
							<IoWalletOutline className=" text-2xl" />
							<div>
								<h1 className=" font-medium mb-1">Getting Started</h1>
								<p className=" text-sm font-normal">
									Connect wallet to trade and explore more
								</p>
							</div>
						</div>
						<GrFormNext className=" text-lg justify-items-end " />
					</button>
				)}
			</motion.main>
			<AnimatePresence>
				{ToggleModal.mainToggle && (
					<TokensModal
						setToggleModal={setToggleModal}
						ToggleModal={ToggleModal}
						ReverseTrade={ReverseTrade}
						baseToken={baseToken}
						quoteToken={quoteToken}
						setBaseToken={setBaseToken}
						setQuoteToken={setQuoteToken}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{settingToggle && <SettingModal setSettingToggle={setSettingToggle} />}
			</AnimatePresence>

			<AnimatePresence>
				{txModalToggle && (
					<TransactionModal
						setTxModalToggle={setTxModalToggle}
						txModalToggle={txModalToggle}
						baseToken={baseToken}
						quoteToken={quoteToken}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

// -------------------------------------------JUST ICONS SECTION----------
const TopIconSection = ({ setSettingToggle }: any) => {
	return (
		<div className=" flex items-center justify-between text-xl text-darkBG h-[34px] pr-1 pl-2 mb-2 ">
			<div className="font-light cursor-default ">Swap</div>
			<div className=" flex items-center gap-4 W-[72px] mr-2 ">
				<RxReload className=" hover:rotate-180 transition-all duration-300 cursor-pointer " />

				<FiSettings
					onClick={() => setSettingToggle((prev: boolean) => !prev)}
					className=" hover:rotate-180 transition-all duration-300 cursor-pointer "
				/>
			</div>
		</div>
	);
};

// ------------------------------THIS IS TO ROTATE THE TOKENS -------------
const RotateTokens = ({ ReverseTrade }: any) => {
	return (
		<section className=" h-[10px] grid place-content-center">
			<div
				onClick={ReverseTrade}
				className=" border border-[#8F199B] bg-[#140123] w-fit p-1 rounded-full m-auto z-10 relative group cursor-pointer "
			>
				<div className=" bg-[#8F199B] text-white rounded-full h-full w-full p-1 group-active:bg-secFG lg:group-hover:rotate-180 ease-in-out transition-all duration-200 ">
					<RiArrowUpDownFill />
				</div>
			</div>
		</section>
	);
};
