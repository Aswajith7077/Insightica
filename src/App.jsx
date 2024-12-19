import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/Components/Login";
import SignIn from "@/Components/SignUp";
import ComingSoon from "@/Components/ComingSoon";
import Dashboard from "@/Components/DashBoard/DashBoard.jsx";
import Documentation from "@/Components/DashBoard/Documentation";
import SingleEvaluator from "@/Components/DashBoard/SingleEvaluator";
import DoubleEvaluator from "@/Components/DashBoard/DoubleEvaluator";
import TripleEvaluator from "@/Components/DashBoard/TripleEvaluator";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/docs" element={<Documentation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<ComingSoon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/singleeval" element={<SingleEvaluator />} />
        <Route path="/doubleeval" element={<DoubleEvaluator />} />
        <Route path="/tripleeval" element={<TripleEvaluator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
