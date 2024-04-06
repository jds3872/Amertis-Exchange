"use client";
import { useState } from "react";
import { fadeIn } from "@/utils/anim";
import Image from "../../../node_modules/next/image";
import uniswap from "../../../public/Images/bridges/uniswap.svg";

// icons
import { FaGasPump } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { MdRoute } from "react-icons/md";

const Info = ({ baseToken, quoteToken }: any) => {
	const [showRoutes, setShowRoutes] = useState<boolean>(false);

	const price = 3400;

	return (
		<>
			<section
				onClick={() => setShowRoutes(!showRoutes)}
				className=" h-[50px] rounded-xl border border-mainFG my-4 flex justify-between items-center px-2 cursor-pointer lg:hover:border-secFG text-[14px]"
			>
				<div className=" flex items-center gap-2 ">
					<span className=" flex items-center gap-1">
						<div
							style={{
								backgroundImage: `url('${baseToken.icon.src}')`,
							}}
							className=" h-5 w-5 rounded-full bg-contain bg-center "
						></div>
						<p>{"1 " + baseToken.ticker}</p>
					</span>
					<span>=</span>
					<span className=" flex items-center gap-1">
						<div
							style={{
								backgroundImage: `url('${quoteToken.icon.src}')`,
							}}
							className=" h-5 w-5 rounded-full bg-contain bg-center "
						></div>
						<p>{price.toLocaleString() + " " + quoteToken.ticker}</p>
					</span>
				</div>
				<div className=" flex items-center gap-1 font-light ">
					<FaGasPump />
					<p>$0.06</p>
					<FaChevronDown className={` ${showRoutes ? "" : ""}  ml-2`} />
				</div>
			</section>
			{showRoutes && (
				<SwapRoutes baseToken={baseToken} quoteToken={quoteToken} />
			)}
		</>
	);
};

export default Info;

const SwapRoutes = ({ baseToken, quoteToken }: any) => {
	return (
		<div className=" border border-mainFG rounded-xl p-2 md:p-4 text-[14px] ">
			<span className="flex items-center ease-linear gap-2 ">
				<div className=" p-2 bg-mainFG rounded-full text-center w-fit gap-2 animate-spin duration-1000 ">
					<MdRoute />
				</div>{" "}
				<p>Best Route</p>
			</span>

			<section className=" flex items-center justify-between my-2 ">
				<div
					style={{
						backgroundImage: `url('${baseToken.icon.src}')`,
					}}
					className=" h-6 w-6 rounded-full bg-contain bg-center "
				></div>
				<main className=" flex-1 flex items-center ">
					<hr className=" border border-dashed self-center flex-1 mx-1 md:mx-2 " />
					<div className=" flex items-center gap-2 bg-mainFG rounded-xl py-1 px-2 w-fit ">
						<span
							style={{
								backgroundImage: `url('${uniswap.src}')`,
							}}
							className=" h-5 w-5 rounded-full bg-contain bg-center "
						></span>
						<p>Uniswap</p>
					</div>
					<hr className=" border border-dashed self-center flex-1 mx-1 md:mx-2 " />
				</main>

				<div
					style={{
						backgroundImage: `url('${quoteToken.icon.src}')`,
					}}
					className=" h-6 w-6 rounded-full bg-contain bg-center "
				></div>
			</section>
		</div>
	);
};
