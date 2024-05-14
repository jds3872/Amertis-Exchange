"use client";
import { TbCopy } from "react-icons/tb";
import { useAccount, useChainId } from "wagmi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { TokenList } from "@/lib/TokenList";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import useFetchBalance from "@/hooks/useFetchBalance";
import { formatUnits } from "viem";

const PortfolioData = () => {
	const { address } = useAccount();

	const [toggleHistory, setToggleHistory] = useState<boolean>(false);

	const copyAddr = () => {
		navigator.clipboard.writeText(address as string);
		console.log(typeof address, address);
	};

	const { open } = useWeb3Modal();

	return (
		<motion.section
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto mb-[50px] "
		>
			<div className=" flex items-center justify-between">
				<div className=" flex items-center gap-2 ">
					<div className=" h-10 w-10 rounded-full border "></div>
					<div className=" ">
						<h3 className=" font-light ">My Account</h3>
						<div className=" flex items-center gap-2">
							<p className=" font-bold text-xl ">
								{address?.slice(0, 4) + "..." + address?.slice(-6)}
							</p>
							<TbCopy
								onClick={copyAddr}
								className=" active:text-mainFG text-xl cursor-pointer"
							/>
						</div>
					</div>
				</div>

				<div>
					<FiLogOut
						onClick={() => open()}
						className="text-2xl cursor-pointer lg:hover:text-mainFG "
					/>
				</div>
			</div>

			<main className=" mt-4 md:mt-6 mb-4 ">
				<div className=" flex items-center ">
					<button
						onClick={() => setToggleHistory(false)}
						className={` ${
							!toggleHistory ? "border-white " : "border-transparent"
						} px-4 py-1 border-b-2`}
					>
						Porfolio
					</button>
					<button
						onClick={() => setToggleHistory(true)}
						className={` px-4 py-1  border-b-2 ${
							toggleHistory ? "border-white" : "border-transparent"
						} `}
					>
						History
					</button>
				</div>
			</main>
			{toggleHistory ? <History /> : <WalletTokens />}
		</motion.section>
	);
};

export default PortfolioData;

const WalletTokens = () => {
	const chainId = useChainId();

	const { address } = useAccount();

	const AvailableTokens = TokenList[chainId].map((_tokens) => {
		const { data: balance, isLoading: balanceLoading } = useFetchBalance(
			address!,
			`${_tokens?.ca}-${_tokens?.name}`,
			_tokens?.ca
		);

		if (balance) return { ..._tokens, bal: balance };
	});

	return (
		<main className=" bg-mainLight h-[600px] rounded-[16px] md:rounded-[20px] p-4 md:p-8 ">
			<header className="flex items-center justify-between border-b pb-3 mb-3 md:mb-5 ">
				<p>Assets</p>
				<p className=" hidden md:block ">Price</p>
				<p>Balance</p>
			</header>

			<ul className="flex-1 overflow-auto rounded-b-[30px] ">
				{AvailableTokens.map((_tokens: any, index: any) => {
					return (
						_tokens && (
							<li
								key={index}
								className={`h-[60px] cursor-default items-center grid grid-cols-2 md:grid-cols-3 overflow-hidden`}
							>
								<span className="flex items-center md:gap-2 ">
									{_tokens.icon ? (
										<Image src={_tokens.icon} alt="" className=" h-8 w-8" />
									) : (
										<div className=" h-8 w-8 rounded-full border-[0.5px] border-mainFG"></div>
									)}
									<div className="ml-2 md:ml-0">
										<h1 className="">{_tokens.ticker}</h1>
										<p className=" text-[12px] text-slate-400 font-semibold">
											{_tokens.name}
										</p>
									</div>
								</span>
								<p className="hidden md:block text-center ">
									{_tokens.price ? _tokens.price : "-"}
								</p>
								<p className="text-right truncate">
									{`
								${
									_tokens.bal
										? Number(
												formatUnits(BigInt(_tokens.bal), _tokens?.decimals)
										  )?.toFixed(3)
										: ""
								} ${_tokens.ticker}`}{" "}
								</p>
							</li>
						)
					);
				})}
			</ul>
		</main>
	);
};

const History = () => {
	return <main className="  ">HISTORY SECTION</main>;
};
