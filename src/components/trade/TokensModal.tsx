import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { TokenList } from "@/assets/TokenList";
import { fadeIn } from "@/utils/anim";

const HistoryList = TokenList.slice(0, 4);

type tokenData = {
	icon: StaticImageData;
	name: string;
	ticker: string;
	ca: string;
	tokenBalance: number | undefined;
	inputValue: string;
};
interface IProps {
	setToggleModal: (val: any) => void;
	ToggleModal: any;
	baseToken?: tokenData;
	ReverseTrade: any;
	quoteToken?: tokenData;
	setBaseToken?: any;
	setQuoteToken?: any;
}
const TokensModal = ({
	baseToken,
	quoteToken,
	setToggleModal,
	ReverseTrade,
	ToggleModal,
	setBaseToken,
	setQuoteToken,
}: IProps) => {
	// states for searching tokenlist
	const [searchText, setSearchText] = useState<string>("");

	// Memoize filtered token list to avoid re-computation on each render
	const newTokenList = useMemo(() => {
		if (searchText === "") return TokenList;
		return TokenList.filter(
			(_tokens) =>
				_tokens.name.toLowerCase().includes(searchText.toLowerCase()) ||
				_tokens.ticker.toLowerCase().includes(searchText.toLowerCase())
		);
	}, [searchText]);

	// close the modal
	const closeModal = () => {
		setToggleModal({ ...ToggleModal, mainToggle: false });
	};

	// handle selection of tokens, makes sure that the user does not click the same token that has been selected already either as base or quote tokens.
	const handleTokenSelect = (selectedToken: tokenData) => {
		if (
			selectedToken.ticker === quoteToken?.ticker ||
			selectedToken.ticker === baseToken?.ticker
		) {
			ReverseTrade();
		} else {
			const tokenToUpdate = ToggleModal.forBase ? setBaseToken : setQuoteToken;
			tokenToUpdate({
				name: selectedToken.name,
				ticker: selectedToken.ticker,
				icon: selectedToken.icon,
				inputValue: "",
				tokenBalance: 0,
				ca: selectedToken.ca,
			});
		}
		closeModal();
	};

	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			exit={fadeIn.initial}
			className=" w-dvw h-dvh bg-black bg-opacity-50 md:p-6 fixed top-0 z-50 "
		>
			<section className=" w-dvw h-dvh  md:mt-[75px] md:h-[500px] md:w-[500px] border-[0.5px] md:border-mainFG bg-mainDark md:rounded-[30px] flex flex-col mx-auto">
				<TopSearchSection
					closeModal={closeModal}
					setSearchText={setSearchText}
					baseToken={baseToken}
					handleTokenSelect={handleTokenSelect}
				/>
				<BottomSearchSection
					handleTokenSelect={handleTokenSelect}
					baseToken={baseToken}
					quoteToken={quoteToken}
					newTokenList={newTokenList}
				/>
			</section>
		</motion.main>
	);
};

export default TokensModal;

// ------------------------------------------------------------------THE TOP SEARCH SECTION -----------------------------
const TopSearchSection = ({
	closeModal,
	baseToken,
	handleTokenSelect,
	setSearchList,
}: any) => {
	return (
		<div className=" border-b-[0.5px] border-mainFG p-5">
			<div className=" flex items-center justify-between gap-2 ">
				<div className=" flex items-center gap-4 bg-mainLight h-[40px] rounded-md flex-1 px-4">
					<BiSearch className=" shrink-0" />
					<input
						onChange={(e: any) => setSearchList(e.target.value)}
						type={"text"}
						className="focus:outline-none bg-transparent flex-1 placeholder:text-slate-300 placeholder:text-sm"
						placeholder="Search by name or Contract address"
					/>
				</div>
				<button
					onClick={closeModal}
					className=" bg-mainLight w-[40px] hover:bg-mainFG transition-colors duration-200 ease-linear h-[40px] rounded-md "
				>
					<IoClose className=" mx-auto" />
				</button>
			</div>
			<div className=" mt-4 flex flex-wrap gap-2">
				{HistoryList.map((_tokens) => (
					<button
						key={_tokens.ticker}
						onClick={(e: any) => handleTokenSelect(_tokens)}
						className={` ${
							_tokens.ticker === baseToken.tokenName
								? "bg-mainFG"
								: "lg:hover:bg-mainLight"
						} flex items-center justify-center gap-1  transition-colors ease-linear duration-200 w-fit px-2 py-1 shadow-lg h-full rounded-3xl `}
					>
						<Image src={_tokens.icon} alt="" className=" h-5 w-5 " />
						<div className=" flex items-center gap-2 ">
							<h2 className=" ">{_tokens.ticker}</h2>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

// -----------------------------------------------------------THE BOTTOM SECTION -----------------------------

const BottomSearchSection = ({
	handleTokenSelect,
	quoteToken,
	baseToken,
	newTokenList,
}: any) => {
	return (
		<ul className="flex-1 overflow-auto rounded-b-[30px] py-4 ">
			{newTokenList.map((_tokens: any, index: any) => (
				<li
					key={index}
					onClick={() => handleTokenSelect(_tokens)}
					className={` ${
						baseToken.ticker === _tokens.ticker ||
						quoteToken.ticker === _tokens.ticker
							? "opacity-40"
							: "lg:hover:bg-mainLight"
					} h-[60px] px-6 cursor-pointer  grid grid-cols-[10%_60%_30%] items-center overflow-hidden`}
				>
					<Image src={_tokens.icon} alt="" className=" h-8 w-8" />
					<div className="ml-2 md:ml-0">
						<h1 className="">{_tokens.ticker}</h1>
						<p className=" text-[12px] text-slate-400 font-semibold">
							{_tokens.name}
						</p>
					</div>
					{/* <div className="text-right truncate">0.0008403434343434</div> */}
				</li>
			))}
		</ul>
	);
};
