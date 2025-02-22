import React, { useState } from "react";

const InvestmentCalculator = () => {
	const [inputData, setInputData] = useState({
		calculationType: "Total Return",
		initialInvestment: "",
		finalValue: "",
		annualRateOfReturn: "",
		investmentDuration: "",
		monthlyContribution: "",
		annualInflationRate: "",
		useInflationAdjustment: false,
	});
	const [result, setResult] = useState(null);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setInputData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const calculateInvestment = () => {
		const data = { ...inputData };
		data.initialInvestment = parseFloat(data.initialInvestment) || 0;
		data.finalValue = parseFloat(data.finalValue) || 0;
		data.annualRateOfReturn = parseFloat(data.annualRateOfReturn) || 0;
		data.investmentDuration = parseInt(data.investmentDuration) || 0;
		data.monthlyContribution = parseFloat(data.monthlyContribution) || 0;
		data.annualInflationRate = parseFloat(data.annualInflationRate) || 0;

		let result = {};

		if (data.calculationType === "ROI" || data.calculationType === "Total Return" || data.calculationType === "Inflation-Adjusted") {
			if (data.finalValue && data.initialInvestment > 0) {
				let roi = ((data.finalValue - data.initialInvestment) / data.initialInvestment) * 100;
				result["ROI (%)"] = roi.toFixed(2);
				if (data.useInflationAdjustment) {
					let inflationAdjustedROI = ((data.finalValue / Math.pow(1 + data.annualInflationRate / 100, data.investmentDuration)) - data.initialInvestment) / data.initialInvestment * 100;
					result["Inflation-Adjusted ROI (%)"] = inflationAdjustedROI.toFixed(2);
				}
			}
		}

		if (data.calculationType === "SIP" || data.calculationType === "Total Return" || data.calculationType === "Inflation-Adjusted") {
			if (data.monthlyContribution > 0) {
				let totalContributions = data.monthlyContribution * 12 * data.investmentDuration;
				let futureValueSIP = data.monthlyContribution * ((Math.pow(1 + (data.annualRateOfReturn / 100) / 12, 12 * data.investmentDuration) - 1) / (data.annualRateOfReturn / 100 / 12)) * (1 + (data.annualRateOfReturn / 100 / 12));
				result["SIP Total Contribution"] = totalContributions.toFixed(2);
				result["SIP Future Value"] = futureValueSIP.toFixed(2);
				if (data.useInflationAdjustment) {
					let inflationAdjustedSIP = futureValueSIP / Math.pow(1 + data.annualInflationRate / 100, data.investmentDuration);
					result["Inflation-Adjusted SIP Value"] = inflationAdjustedSIP.toFixed(2);
				}
			}
		}

		if (data.calculationType === "Total Return" || data.calculationType === "Inflation-Adjusted") {
			let futureValueLumpSum = data.initialInvestment * Math.pow(1 + data.annualRateOfReturn / 100, data.investmentDuration);
			let totalFutureValue = futureValueLumpSum + (result["SIP Future Value"] ? parseFloat(result["SIP Future Value"]) : 0);
			result["Future Value Lump Sum"] = futureValueLumpSum.toFixed(2);
			result["Total Investment Future Value"] = totalFutureValue.toFixed(2);
			if (data.useInflationAdjustment) {
				let inflationAdjustedTotal = totalFutureValue / Math.pow(1 + data.annualInflationRate / 100, data.investmentDuration);
				result["Inflation-Adjusted Total Value"] = inflationAdjustedTotal.toFixed(2);
			}
		}

		setResult(result);
	};

	return (
		<div className="p-6 border rounded-lg shadow-md w-full max-w-lg mx-auto">
			<h2 className="text-xl font-semibold mb-4">Investment Calculator</h2>
			<div className="grid grid-cols-1 gap-3">
				<select name="calculationType" value={inputData.calculationType} onChange={handleChange} className="border p-2 rounded">
					<option value="ROI">ROI</option>
					<option value="SIP">SIP</option>
					<option value="Total Return">Total Return</option>
					<option value="Inflation-Adjusted">Inflation-Adjusted</option>
				</select>
				<input type="number" name="initialInvestment" placeholder="Initial Investment" value={inputData.initialInvestment} onChange={handleChange} className="border p-2 rounded" />
				<input type="number" name="finalValue" placeholder="Final Value (for ROI)" value={inputData.finalValue} onChange={handleChange} className="border p-2 rounded" />
				<input type="number" name="annualRateOfReturn" placeholder="Annual Rate of Return (%)" value={inputData.annualRateOfReturn} onChange={handleChange} className="border p-2 rounded" />
				<input type="number" name="investmentDuration" placeholder="Investment Duration (years)" value={inputData.investmentDuration} onChange={handleChange} className="border p-2 rounded" />
				<input type="number" name="monthlyContribution" placeholder="Monthly Contribution (SIP)" value={inputData.monthlyContribution} onChange={handleChange} className="border p-2 rounded" />
				<label className="flex items-center space-x-2">
					<input type="checkbox" name="useInflationAdjustment" checked={inputData.useInflationAdjustment} onChange={handleChange} className="w-4 h-4" />
					<span>Use Inflation Adjustment</span>
				</label>
				{inputData.useInflationAdjustment && (
					<input type="number" name="annualInflationRate" placeholder="Annual Inflation Rate (%)" value={inputData.annualInflationRate} onChange={handleChange} className="border p-2 rounded" />
				)}
				<button onClick={calculateInvestment} className="bg-blue-500 text-white p-2 rounded">Calculate</button>
			</div>
			{result && (
				<div className="mt-4 p-4 border rounded bg-gray-100">
					<h3 className="text-lg font-semibold">Results:</h3>
					<ul>
						{Object.entries(result).map(([key, value]) => (
							<li key={key} className="mt-1">{key}: {value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default InvestmentCalculator;