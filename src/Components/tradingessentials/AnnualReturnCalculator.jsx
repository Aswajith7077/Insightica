import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@mui/material";

const AnnualizedReturnCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(3);
  const [result, setResult] = useState(null);

  const calculateAnnualizedReturn = () => {
    if (initialInvestment <= 0 || finalValue < 0 || years <= 0) {
      setResult({
        error: "Initial investment, final value, and years must be positive.",
      });
      return;
    }

    const annualizedReturn =
      ((finalValue / initialInvestment) ** (1 / years) - 1) * 100;
    setResult({ annualizedReturn: annualizedReturn.toFixed(2) });
  };

  return (
    <Card className="p-6 shadow-lg max-w-md mx-auto">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">
          Annualized Return Calculator
        </h2>

        {/* Initial Investment */}
        <Label className="font-medium">
          Initial Investment: ${initialInvestment}
        </Label>
        <Slider
          value={initialInvestment}
          min={1000}
          max={100000}
          step={100}
          onChange={(_, value) => setInitialInvestment(value)}
        />

        {/* Final Value */}
        <Label className="font-medium mt-4">Final Value: ₹{finalValue}</Label>
        <Slider
          value={finalValue}
          min={1000}
          max={200000}
          step={100}
          onChange={(_, value) => setFinalValue(value)}
        />

        {/* Years */}
        <Label className="font-medium mt-4">Years: {years}</Label>
        <Slider
          value={years}
          min={1}
          max={50}
          step={1}
          onChange={(_, value) => setYears(value)}
        />

        {/* Calculate Button */}
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
          onClick={calculateAnnualizedReturn}
        >
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
