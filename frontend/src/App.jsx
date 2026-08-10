import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import History from "./pages/History";
import AnalysisDetails from "./pages/AnalysisDetails";
import { ToastContainer } from "react-toastify";

let App =()=>{
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" 
                    element={<PublicRoute>
                        <Login />
                    </PublicRoute>} />
                <Route path="/signup" 
                    element={<PublicRoute>
                        <Signup />
                    </PublicRoute>} />
                <Route path="/dashboard" 
                    element={<ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>} 
                />
                <Route path="/history" 
                    element={<ProtectedRoute>
                        <History />
                    </ProtectedRoute>} 
                />
                <Route path="/history/:id"
                    element={<ProtectedRoute>
                        <AnalysisDetails/>
                    </ProtectedRoute>}
                />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default App;