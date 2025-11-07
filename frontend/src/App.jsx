import LandingPage from "./pages/Landing";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App;