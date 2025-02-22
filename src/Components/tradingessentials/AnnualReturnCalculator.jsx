import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Slider} from "@mui/material";

const AnnualizedReturnCalculator = () => {
	const [inputs, setInputs] = useState({
		initialInvestment: 10000,
		finalValue: 15000,
		years: 3,
	});

	const [result, setResult] = useState(null);

	const calculateAnnualizedReturn = () => {
		const { initialInvestment, finalValue, years } = inputs;

		if (initialInvestment <= 0 || finalValue < 0 || years <= 0) {
			setResult({ error: "Initial investment, final value, and years must be positive." });
			return;
		}

		const annualizedReturn = ((finalValue / initialInvestment) ** (1 / years) - 1) * 100;
		setResult({ annualizedReturn: annualizedReturn.toFixed(2) });
	};

	const handleChange = (key, value) => {
		setInputs((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<Card className="p-6 shadow-lg max-w-md mx-auto">
			<CardContent>
				<h2 className="text-xl font-semibold mb-4">Annualized Return Calculator</h2>

				{/* Initial Investment */}
				<Label className="font-medium">Initial Investment: ${inputs.initialInvestment}</Label>
				<Slider
					defaultValue={[10000]}
					min={1000}
					max={100000}
					step={100}
					onValueChange={(value) => handleChange("initialInvestment", value[0])}
				/>

				{/* Final Value */}
				<Label className="font-medium mt-4">Final Value: ${inputs.finalValue}</Label>
				<Slider
					defaultValue={[15000]}
					min={1000}
					max={200000}
					step={100}
					onValueChange={(value) => handleChange("finalValue", value[0])}
				/>

				{/* Years */}
				<Label className="font-medium mt-4">Years: {inputs.years}</Label>
				<Slider
					defaultValue={[3]}
					min={1}
					max={50}
					step={1}
					onValueChange={(value) => handleChange("years", value[0])}
				/>

				{/* Calculate Button */}
				<button className="mt-4 w-full" onClick={calculateAnnualizedReturn}>
					Calculate
				</button>

				{/* Result Display */}
				{result && (
					<div className="mt-4 text-center">
						{result.error ? (
							<p className="text-red-500">{result.error}</p>
						) : (
							<p className="text-green-600 font-semibold text-lg">
								Annualized Return: {result.annualizedReturn}%
							</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default AnnualizedReturnCalculator;
