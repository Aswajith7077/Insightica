const SingleEvalHelp = {
  whatItDoes: [
    "Analyzes the performance of a single condition (indicator) across multiple stocks.",
    "Provides insights into how one condition impacts stock performance over time or at specific intervals."
  ],

  howToUse: [
    "Select a condition (e.g., RSI, Moving Average) from the dropdown menu.",
    'Choose stocks to evaluate (or leave as "all stocks" for a comprehensive view).',
    "Visualize results using tools like Performance Matrices, Metric Wheels, and Trend Charts."
  ],

  keyVisualizations: [
    {
      title: "Performance Matrix",
      points: [
        "Rows = conditions, columns = stocks",
        "Darker colors = stronger performance for the condition."
      ]
    },
    {
      title: "Metric Wheel",
      points: [
        "Spokes represent metrics like Profitability or Volatility.",
        "Wider spreads = higher variability in performance"
      ]
    },
    {
      title: "Trend Chart",
      points: [
        "Displays condition performance over time",
        "Taller bars = improving trends in the selected metric"
      ]
    }
  ],

  example: {
    condition: "RSI",
    Metric: "Profitability",
    Stock:
      "ABC Ltd The Performance Matrix shows a dark green cell for ABC Ltd, indicating RSI’s strong profitability. The Metric Wheel confirms this with a high peak for the profitability metric."
  }
};

const DoubleEvalHelp = {
  whatItDoes: [
    "Evaluates how two conditions (e.g., RSI + Bollinger Bands) work together to influence performance.",
    "Helps identify synergies between indicators for refined strategies."
  ],

  howToUse: [
    "Fix one condition (e.g., Moving Average).",
    "Test another condition (e.g., RSI, Bollinger Bands) against it.",
    "Use tools like <br>Performance Matrices</br>, <br>Correlation Arcs</br>, and <br>Trend Charts</br> to visualize pair performance."
  ],

  keyVisualizations: [
    {
      title: "Performance Matrix",
      points: [
        "Rows = condition pairs, columns = stocks.",
        "Darker cells = stronger pair performance."
      ]
    },
    {
      title: "Metric Wheel",
      points: [
        "Spokes represent metrics like Profitability or Volatility.",
        "Wider spreads = higher variability in performance"
      ]
    },
    {
      title: "Correlation Arc",
      points: [
        "Bands connect conditions, with thickness indicating synergy strength."
      ]
    },
    {
      title: "Trend Chart",
      points: ["Tracks pair performance over time"]
    }
  ],

  example: {
    condition: "RSI",
    Metric: "Profitability",
    Stock:
      "ABC Ltd The Performance Matrix shows a dark green cell for ABC Ltd, indicating RSI’s strong profitability. The Metric Wheel confirms this with a high peak for the profitability metric."
  }
};





// Example:
// Conditions: Moving Average + RSI + Bollinger Bands
// The Performance Matrix shows a dark cell for DEF Ltd, indicating strong triplet performance. The Correlation Arc displays a thick band connecting the three conditions, confirming their synergy.


const TripleEvalHelp = {
  whatItDoes: [
    "Combines three conditions (e.g., Moving Average, RSI, Bollinger Bands) to deliver advanced multi-variable insights.",
    "Ideal for large-scale institutional strategies."
  ],

  howToUse: [
    "Fix two conditions (e.g., Moving Average + RSI).",
    "Test a third condition (e.g., Bollinger Bands).",
    "Visualize triplet performance using Performance Matrices, Correlation Arcs, and Metric Wheels."
  ],

  keyVisualizations: [
    {
      title: "Performance Matrix",
      points: [
        "Cells = triplet performance for specific stocks.",
        "Darker cells = stronger performance."
      ]
    },
    {
      title: "Metric Wheel",
      points: [
        "Spokes represent metrics like Profitability or Volatility.",
        "Wide spreads = high-performing triplets. Peaks = strong metric-specific performance."
      ]
    },
    {
      title: "Correlation Arc",
      points: [
        "Bands connect three conditions. Thicker bands = better synergy."
      ]
    },
    {
      title: "Trend Chart",
      points: ["Tracks pair performance over time"]
    }
  ],

  example: {
    condition: "RSI",
    Metric: "Profitability",
    Stock:
      "ABC Ltd The Performance Matrix shows a dark green cell for ABC Ltd, indicating RSI’s strong profitability. The Metric Wheel confirms this with a high peak for the profitability metric."
  }
};




export { SingleEvalHelp, DoubleEvalHelp,TripleEvalHelp };
