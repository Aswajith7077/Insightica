import React, { useState } from "react";
import { Slider } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const SIPCalculator = () => {
	const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
	const [rateOfReturn, setRateOfReturn] = useState(12);
	const [years, setYears] = useState(10);

	const calculateFutureValue = () => {
		const monthlyRate = rateOfReturn / 100 / 12;
		const totalMonths = years * 12;
		const futureValue =
			monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
		return Math.round(futureValue);
	};

	const investedAmount = monthlyInvestment * years * 12;
	const futureValue = calculateFutureValue();
	const estimatedReturns = futureValue - investedAmount;

	const data = [
		{ name: "Invested Amount", value: investedAmount, color: "#8884d8" },
		{ name: "Estimated Returns", value: estimatedReturns, color: "#82ca9d" }
	];

	return (
		<div className="p-4 border rounded shadow-lg">
			<h2 className="text-xl font-semibold mb-4">SIP Calculator</h2>
			<div className="mb-4">
				<label>Monthly Investment</label>
				<Slider value={monthlyInvestment} onChange={(e, val) => setMonthlyInvestment(val)} min={1000} max={100000} step={500} />
				<input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full p-2 border rounded" />
			</div>
			<div className="mb-4">
				<label>Expected Return Rate (p.a)</label>
				<Slider value={rateOfReturn} onChange={(e, val) => setRateOfReturn(val)} min={1} max={20} step={0.5} />
				<input type="number" value={rateOfReturn} onChange={(e) => setRateOfReturn(Number(e.target.value))} className="w-full p-2 border rounded" />
			</div>
			<div className="mb-4">
				<label>Time Period (Years)</label>
				<Slider value={years} onChange={(e, val) => setYears(val)} min={1} max={30} step={1} />
				<input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded" />
			</div>
			<div className="mb-4">
				<h3>Total Value: ₹{futureValue.toLocaleString()}</h3>
			</div>
			<PieChart width={300} height={300}>
				<Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</div>
	);
};

export default SIPCalculator;
