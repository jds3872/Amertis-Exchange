"use client";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { ConnectButton } from "@/components/reusableComp";
import PortfolioData from "@/components/porfolio/PortfolioData";
import { useAccount, useConnections } from "wagmi";
import { IoWalletOutline } from "react-icons/io5";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";

const Portfolio = () => {
	const _connect = useAccount();

	return (
		<main
			// initial={fadeIn.initial}
			// animate={fadeIn.animate}
			// transition={fadeIn.transition}
			className="px-6 min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] "
		>
			{_connect.isConnected ? <PortfolioData /> : <Welcome />}
		</main>
	);
};

export default Portfolio;

const Welcome = () => {
	const { open, close } = useWeb3Modal();

	return (
		<>
			{}
			<section className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto ">
				<h1 className=" font-semibold text-2xl">Portfolio</h1>
				<div className=" mt-5 bg-mainLight rounded-[30px] h-[400px] grid place-content-center text-center px-4 ">
					<h1 className=" font-semibold text-[25px] md:text-[30px]">Welcome</h1>
					<p className=" font-light text-[14px] mb-5 my-2">
						Connect your wallet for a deep dive into your ecosystem activities
					</p>

					<button
						onClick={() => open({ view: "Connect" })}
						className="rounded-xl bg-mainFG py-2 px-4 flex items-center gap-2 justify-center mx-auto lg:hover:bg-secFG"
					>
						<>
							<IoWalletOutline className=" text-2xl" />
							Connect Wallet
						</>
					</button>
				</div>
			</section>
		</>
	);
};
