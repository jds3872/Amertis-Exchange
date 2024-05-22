export function calculateSlippageAdjustedOutput(
	expectedOutput: bigint,
	slippagePercentage: number = 5
) {
	const slippageAmount = BigInt(
		Math.round((slippagePercentage / 100) * Number(expectedOutput))
	);
	const adjustedOutput = expectedOutput - slippageAmount;
	// console.log(
	//   expectedOutput,
	//   slippageAmount,
	//   "expectedOutput -> slippageAmount"
	// );
	// console.log(adjustedOutput, "adjustedOutput ");
	return adjustedOutput;
}
