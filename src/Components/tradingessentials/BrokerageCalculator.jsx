import React, { useState } from "react";

const BrokerageCalculator = () => {
	const [inputData, setInputData] = useState({
		broker: "Zerodha",
		transaction_type: "equity_intraday",
		trade_value: "",
		entry_price: "",
		exit_price: "",
		dividend_per_share: "",
		shares_held: "",
		leverage_ratio: "",
		calculations: ["brokerage", "total_cost", "margin", "break_even", "profit_loss", "dividend_yield"],
	});

	const [results, setResults] = useState(null);

	const BROKERAGE_RULES = {
		Zerodha: {
			equity_delivery: { fixed: 0, percent: 0 },
			equity_intraday: { fixed: 20, percent: 0.03 },
			futures: { fixed: 20, percent: 0.03 },
			options: { fixed: 20, percent: 0.03 },
			margin_ratio: { equity_intraday: 10, futures: 5 },
		},
		Upstox: {
			equity_delivery: { fixed: 0, percent: 0 },
			equity_intraday: { fixed: 20, percent: 0.05 },
			futures: { fixed: 20, percent: 0.05 },
			options: { fixed: 20, percent: 0.05 },
			margin_ratio: { equity_intraday: 10, futures: 5 },
		},
		"Angel Broking": {
			equity_delivery: { fixed: 0, percent: 0 },
			equity_intraday: { fixed: 20, percent: 0.03 },
			futures: { fixed: 20, percent: 0.03 },
			options: { fixed: 20, percent: 0.03 },
			margin_ratio: { equity_intraday: 10, futures: 5 },
		},
		"Template Broker": {
			equity_delivery: {fixed: 0, percent: 0},
			equity_intraday: {fixed: 20, percent: 0.05},
			futures: {fixed: 20, percent: 0.05},
			options: {fixed: 20, percent: 0.05},
			margin_ratio: {equity_intraday: 5, 'futures': 3}
		}
	};

	const calculateBrokerage = () => {
		const { broker, transaction_type, trade_value, entry_price, exit_price, dividend_per_share, shares_held, leverage_ratio } = inputData;
		if (!broker || !transaction_type || !trade_value) {
			return setResults({ error: "Please enter valid inputs." });
		}

		let tradeValue = parseFloat(trade_value) || 0;
		let brokerageData = BROKERAGE_RULES[broker][transaction_type];
		let percentBrokerage = tradeValue * (brokerageData.percent / 100);
		let brokerage = brokerageData.fixed > 0 ? Math.min(brokerageData.fixed, percentBrokerage) : percentBrokerage;

		let stt = tradeValue * 0.001;
		let gst = (brokerage + stt) * 0.18;
		let exchange_fees = tradeValue * 0.0001;
		let stamp_duty = tradeValue * 0.00015;
		let totalTransactionCost = brokerage + stt + gst + exchange_fees + stamp_duty;

		let margin = leverage_ratio ? tradeValue / parseFloat(leverage_ratio) : tradeValue / BROKERAGE_RULES[broker].margin_ratio[transaction_type];
		let breakEven = shares_held ? (tradeValue + totalTransactionCost) / parseInt(shares_held) : 0;
		let profitLoss = shares_held && entry_price && exit_price ? (parseFloat(exit_price) - parseFloat(entry_price)) * parseInt(shares_held) - totalTransactionCost : 0;
		let dividendYield = shares_held && dividend_per_share ? (parseFloat(dividend_per_share) * parseInt(shares_held)) / tradeValue * 100 : 0;

		setResults({
			brokerage: brokerage.toFixed(2),
			totalTransactionCost: totalTransactionCost.toFixed(2),
			marginRequired: margin.toFixed(2),
			breakEvenPrice: breakEven.toFixed(2),
			profitLoss: profitLoss.toFixed(2),
			dividendYield: dividendYield.toFixed(2),
		});
	};

	return (
		<div className="p-4 bg-gray-100 rounded-lg shadow-md">
			<h2 className="text-lg font-semibold mb-4">Comprehensive Brokerage Calculator</h2>
			<div className="grid grid-cols-2 gap-4">
				<select value={inputData.broker} onChange={e => setInputData({ ...inputData, broker: e.target.value })} className="p-2 border">
					{Object.keys(BROKERAGE_RULES).map(broker => (
						<option key={broker} value={broker}>{broker}</option>
					))}
				</select>
				<input type="text" placeholder="Trade Value" className="p-2 border" value={inputData.trade_value} onChange={e => setInputData({ ...inputData, trade_value: e.target.value })} />
				<input type="text" placeholder="Entry Price" className="p-2 border" value={inputData.entry_price} onChange={e => setInputData({ ...inputData, entry_price: e.target.value })} />
				<input type="text" placeholder="Exit Price" className="p-2 border" value={inputData.exit_price} onChange={e => setInputData({ ...inputData, exit_price: e.target.value })} />
				<input type="text" placeholder="Shares Held" className="p-2 border" value={inputData.shares_held} onChange={e => setInputData({ ...inputData, shares_held: e.target.value })} />
				<input type="text" placeholder="Dividend Per Share" className="p-2 border" value={inputData.dividend_per_share} onChange={e => setInputData({ ...inputData, dividend_per_share: e.target.value })} />
				<input type="text" placeholder="Leverage Ratio" className="p-2 border" value={inputData.leverage_ratio} onChange={e => setInputData({ ...inputData, leverage_ratio: e.target.value })} />
			</div>
			<button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={calculateBrokerage}>Calculate</button>
			{results && (
				<div className="mt-4 p-4 bg-white shadow">
					<h3 className="font-semibold">Results:</h3>
					<p>Brokerage: ₹{results.brokerage}</p>
					<p>Total Transaction Cost: ₹{results.totalTransactionCost}</p>
					<p>Margin Required: ₹{results.marginRequired}</p>
					<p>Break-even Price: ₹{results.breakEvenPrice}</p>
					<p>Profit/Loss: ₹{results.profitLoss}</p>
					<p>Dividend Yield: {results.dividendYield}%</p>
				</div>
			)}
		</div>
	);
};

export default BrokerageCalculator;
