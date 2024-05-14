"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";

const TransactionModal = ({
	setTxModal,
	baseToken,
	quoteToken,
	txState,
}: any) => {
	const baseTokenVar = baseToken;
	const quoteTokenVar = quoteToken;

	console.log("THIS IS THE TX STATE --------- ", txState);

	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			exit={fadeIn.initial}
			className=" w-dvw h-dvh bg-black bg-opacity-90 md:p-6 fixed top-0 z-50 flex items-center px-4 "
		>
			<section className="  w-full  md:w-[500px] border-[0.5px] border-mainFG bg-mainDark rounded-[15px] md:rounded-[30px] flex flex-col mx-auto p-4 ">
				<div className=" flex items-center justify-between border-mainFG ">
					<h2 className=""></h2>
					<button
						onClick={() => setTxModal(false)}
						className=" bg-mainLight py-2 px-4 rounded-md lg:hover:bg-mainFG ease-linear duration-200 transition-colors "
					>
						<IoClose />
					</button>
				</div>

				{!txState && (
					<section className=" my-2 flex flex-col items-center gap-4 mb-[32px]">
						<AiOutlineLoading3Quarters className="text-4xl animate-spin duration-50 ease-linear" />
						<h2 className=" text-[20px] font-semibold ">
							{txState == "pending" ? "Transaction pending" : "Confirm Swap"}
						</h2>

						<div className=" flex items-center gap-2 ">
							<span className=" flex items-center gap-1">
								<div
									style={{
										backgroundImage: `url('${baseTokenVar?.icon.src}')`,
									}}
									className=" h-5 w-5 rounded-full bg-contain bg-center "
								></div>
								<p>{baseTokenVar?.inputValue + " " + baseTokenVar?.ticker}</p>
							</span>
							<FaArrowRightLong className="" />
							<span className=" flex items-center gap-1">
								<div
									style={{
										backgroundImage: `url('${quoteTokenVar?.icon.src}')`,
									}}
									className=" h-5 w-5 rounded-full bg-contain bg-center "
								></div>
								<p>{quoteTokenVar?.inputValue + " " + quoteTokenVar?.ticker}</p>
							</span>
						</div>

						{txState !== "pending" && (
							<p className=" font-extralight ">Approve wallet ransaction...</p>
						)}
					</section>
				)}

				{txState == "success" && (
					<section className=" my-[32px] mx-auto w-fit ">
						<GiCheckMark className=" text-[50px] " />
						<p>Successfully swapped </p>
						<p>{`${baseTokenVar?.inputValue} ${baseTokenVar?.ticker} for ${quoteTokenVar?.inputValue} ${quoteTokenVar?.ticker} `}</p>
					</section>
				)}
			</section>
		</motion.main>
	);
};

export default TransactionModal;
