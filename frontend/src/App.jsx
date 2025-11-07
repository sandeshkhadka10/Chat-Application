import LandingPage from "./pages/Landing";
import Authentication from "./pages/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />

        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  )
}

export default App;