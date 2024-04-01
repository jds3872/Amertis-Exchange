import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { ConnectButton } from "@/components/reusableComp";

const Portfolio = () => {
	const connected = true;

	return (
		<main
			// initial={fadeIn.initial}
			// animate={fadeIn.animate}
			// transition={fadeIn.transition}
			className="px-6 min-h-[calc(100dvh-70px)] "
		>
			{connected && <Welcome />}
		</main>
	);
};

export default Portfolio;

const Welcome = () => {
	return (
		<section className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto ">
			<h1 className=" font-semibold text-2xl">Portfolio</h1>
			<div className=" mt-5 bg-mainLight rounded-[30px] h-[400px] grid place-content-center text-center px-4 ">
				<h1 className=" font-semibold text-[25px] md:text-[30px]">Welcome</h1>
				<p className=" font-light text-[14px] mb-5 my-2">
					Connect your wallet for a deep dive into your ecosystem activities
				</p>

				<ConnectButton />
			</div>
		</section>
	);
};
