
---

# Insightica: AI-Powered Trading Decision Optimization

**Insightica** is an innovative AI-based solution for optimizing trade decisions. It provides actionable insights through intuitive visualizations and analytical tools, helping users make informed trading decisions.

---

## Features

### Core Functionalities
- **Stock Analysis Tools**: Analyze and evaluate stocks with data-driven insights.
- **Trading Decision Scores**: Provides scores for each stock/ticker based on specific user inputs.
- **Visualization**:
  - Interactive pie charts for portfolio distribution.
  - Summary of top trading decisions.

### Frontend
- Built with **ReactJS** for a seamless and responsive user experience.
- Includes:
  - A dynamic landing page.
  - Login and sign-in forms for user authentication.
  - Tools page with advanced analytics features.

### ⚙️ Backend
- Developed with **Django** and **SwaggerUI** to handle data processing and AI-driven insights.
- Integrates predictive models to recommend optimal trading actions.

### Deployment
- The application is deployed on **Vercel**, ensuring high availability and quick load times.

---

## Installation and Setup

Follow the steps below to set up and run Insightica on your local machine:

### Prerequisites
- **Node.js**: For the React frontend.
- **Python 3.8+**: For the Django and FastAPI backend.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/insightica.git
   cd insightica
   ```

2. **Install Frontend Dependencies**:
   Navigate to the `frontend/` directory and install the dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   Navigate to the `backend/` directory and create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   Create `.env` files for both the frontend and backend:
   - **Frontend**:
     - `frontend/.env.local`:
       ```
       REACT_APP_BACKEND_URL=http://localhost:8000
       ```
   - **Backend**:
     - `backend/.env`:
       ```
       SECRET_KEY=your_secret_key
       ```

5. **Run the Backend**:
   Start the Django server:
   ```bash
   python manage.py runserver
   ```

6. **Run the Frontend**:
   Start the React development server:
   ```bash
   npm start
   ```

7. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

### Frontend
- Deployed on **Vercel**. Push updates to the Vercel-connected branch for automatic deployment.
