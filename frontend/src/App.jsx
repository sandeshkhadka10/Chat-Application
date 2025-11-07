import LandingPage from "./pages/Landing";
import Authentication from "./pages/Authentication";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App;