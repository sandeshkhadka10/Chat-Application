import LandingPage from "./pages/Landing";
import Authentication from "./pages/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path='/resetPassword' element={<ResetPassword/>}></Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  )
}

export default App;