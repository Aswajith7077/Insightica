# React + Vite Project Structure

```plaintext
root
│── node_modules/        # Dependencies
│── public/             # Static assets
│── src/                # Source code
│   │── api/            # API service handlers
│   │── assets/         # Static images, icons, and resources
│   │── auth/           # Authentication-related components
│   │── components/     # Reusable UI components
│   │   │── charts/     # Chart components for data visualization
│   │   │── dashboard/  # Dashboard components
│   │   │── leaderboard/# Leaderboard UI elements
│   │   │── tools/      # Trading tools and utilities
│   │   │── tradingessentials/ # Core trading essentials
│   │   │── ui/         # General UI components (modals, forms, etc.)
│   │       │── AboutUs.jsx         # About Us page
│   │       │── ComingSoon.jsx      # Placeholder page
│   │       │── Login.jsx           # Login page
│   │       │── PieChartComponent.jsx # Pie chart component
│   │       │── ResetPassword.jsx   # Reset password page
│   │       │── SignUp.jsx          # Sign-up page
│   │── constants/      # Global constants
│   │── hooks/          # Custom React hooks
│   │── lib/            # Library utilities
│   │── App.css         # Global styles
│   │── App.jsx         # Main application file
│   │── index.css       # Base CSS styles
│   │── main.jsx        # Root React entry point
```

## Tools Component (`Tools.jsx`)

- The main page that consists of all the tools.
- Has three components:
    1. **Greetings**
    2. **Static Input (`StaticInput.jsx`)** - Handles all requests to the backend.
    3. **Tools** - Dynamic for different pages (available in `/tools` folder).
- **State Management:** States are defined in `Tools.jsx` (Can be optimized using Context API).
- **StockSelect.jsx:** Manually written component for multi-select.
- **Tutorials.jsx:** Contains static content for tutorials as an app drawer.

## `/src/constants`

- Contains all the constant files for each use case.

## `/src/components/charts`

- Contains all types of charts for visualization.
- The following components are used in the `/tools` section:
    - `HeatMap.jsx` -> Performance Matrix
    - `RadarChart.jsx` -> Metric Wheel
    - `TrendChartStockFixed.jsx` -> Trend Chart (Stock Fixed)
    - `BarChartTime.jsx` -> Trend Chart (Time Fixed)
    - `CorrelationArc.jsx` -> Representation for correlations between fixed conditions
- `PieChart.jsx` -> Displays leaderboard data.
- Dummy widgets assuming future data integration:
    - `AreaChart.jsx` -> Area Chart Widget
    - `BarChart.jsx` -> Bar Chart Widget

## `/src/auth`

- Contains context for managing JWT and accessing user credentials from local storage.
- Includes `RESET_CONTEXT` for handling password reset.

## `/src/components/leaderBoard`

- Widgets for the dashboard (`dashboard.jsx`).
- Includes `BackTest` and `SinglePredictor` components for the dashboard.
- Similar to components in the tools page but with minimal inputs.
- Handles API requests and chart rendering.
- Uses buttons to trigger GET requests.

## `/src/components/tools`

- Contains evaluation and prediction components:
    - `SingleEvaluator`
    - `DoubleEvaluator`
    - `TripleEvaluator`
    - `SinglePredictor`
    - `BackTest`
- Each component has its own visualization (Performance Matrix, Metric Wheel, etc.) from the `/charts` directory.
- `CryptoGraphy.js` -> Implements AES-256 encryption and decryption.

## `/config`

- Stores sensitive information from `.env` files, exported as JSON objects.

## `/src/api`

- Contains Axios interceptors definitions and export statements.